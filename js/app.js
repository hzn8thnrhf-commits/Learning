/* PDF Flow Reader — reflowable PDF reading for phones.
 * Text is extracted once with PDF.js, cached in IndexedDB, and rendered as a
 * single scrolling column of real HTML text (so font size, themes, selection,
 * highlighting and search all work natively).
 */
"use strict";

if (window.pdfjsLib) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = "js/vendor/pdf.worker.min.js";
}

const $ = (id) => document.getElementById(id);

const els = {
  topbar: $("topbar"),
  welcome: $("welcome"),
  reader: $("reader"),
  docTitle: $("doc-title"),
  fileInput: $("file-input"),
  fileInput2: $("file-input2"),
  recentDocs: $("recent-docs"),
  loading: $("loading"),
  loadingText: $("loading-text"),
  loadingBar: $("loading-bar"),
  progressPill: $("progress-pill"),
  selbar: $("selbar"),
  scrim: $("scrim"),
  searchPanel: $("search-panel"),
  searchInput: $("search-input"),
  searchResults: $("search-results"),
  searchCount: $("search-count"),
  notesPanel: $("notes-panel"),
  notesList: $("notes-list"),
  libraryPanel: $("library-panel"),
  libraryList: $("library-list"),
  settingsPanel: $("settings-panel"),
  noteEditor: $("note-editor"),
  noteQuote: $("note-quote"),
  noteText: $("note-text"),
};

/* ================= IndexedDB ================= */

const DB_NAME = "pdf-flow-reader";
const DB_VERSION = 1;
let dbPromise = null;

function openDB() {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains("docs")) {
        db.createObjectStore("docs", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("annots")) {
        const s = db.createObjectStore("annots", { keyPath: "id" });
        s.createIndex("byDoc", "docId", { unique: false });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
  return dbPromise;
}

function idb(storeName, mode, fn) {
  return openDB().then(
    (db) =>
      new Promise((resolve, reject) => {
        const tx = db.transaction(storeName, mode);
        const store = tx.objectStore(storeName);
        const out = fn(store);
        tx.oncomplete = () => resolve(out && out.result !== undefined ? out.result : undefined);
        tx.onerror = () => reject(tx.error);
      })
  );
}

const DocStore = {
  get: (id) => idb("docs", "readonly", (s) => s.get(id)),
  put: (doc) => idb("docs", "readwrite", (s) => s.put(doc)),
  delete: (id) => idb("docs", "readwrite", (s) => s.delete(id)),
  all: () => idb("docs", "readonly", (s) => s.getAll()),
};

const AnnotStore = {
  put: (a) => idb("annots", "readwrite", (s) => s.put(a)),
  delete: (id) => idb("annots", "readwrite", (s) => s.delete(id)),
  forDoc: (docId) =>
    idb("annots", "readonly", (s) => s.index("byDoc").getAll(docId)),
  deleteForDoc: (docId) =>
    openDB().then(
      (db) =>
        new Promise((resolve, reject) => {
          const tx = db.transaction("annots", "readwrite");
          const idx = tx.objectStore("annots").index("byDoc");
          const req = idx.openCursor(IDBKeyRange.only(docId));
          req.onsuccess = () => {
            const cur = req.result;
            if (cur) {
              cur.delete();
              cur.continue();
            }
          };
          tx.oncomplete = resolve;
          tx.onerror = () => reject(tx.error);
        })
    ),
};

/* ================= state ================= */

const state = {
  doc: null,        // {id, name, numPages, pages: string[][], lastPage, ...}
  annots: [],       // [{id, docId, color, note, text, segments:[{page,para,start,end}], created}]
  pendingRange: null,
  editingAnnotId: null,
  pendingColor: "yellow",
};

/* ================= preferences ================= */

const PREFS_KEY = "pfr-prefs";
const prefs = Object.assign(
  { fontSize: 18, lineHeight: 1.6, fontFamily: "system", theme: "light" },
  JSON.parse(localStorage.getItem(PREFS_KEY) || "{}")
);

const FONT_STACKS = {
  system: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  serif: 'Georgia, "Times New Roman", serif',
  sans: '"Helvetica Neue", Helvetica, Arial, sans-serif',
};

function applyPrefs() {
  document.documentElement.style.setProperty("--font-size", prefs.fontSize + "px");
  document.documentElement.style.setProperty("--line-height", prefs.lineHeight);
  document.documentElement.style.setProperty("--reader-font", FONT_STACKS[prefs.fontFamily]);
  document.body.className = "theme-" + prefs.theme;
  $("font-size-label").textContent = prefs.fontSize;
  $("lh-label").textContent = prefs.lineHeight.toFixed(1);
  document.querySelectorAll("#font-family-seg button").forEach((b) =>
    b.classList.toggle("active", b.dataset.font === prefs.fontFamily)
  );
  document.querySelectorAll("#theme-seg button").forEach((b) =>
    b.classList.toggle("active", b.dataset.theme === prefs.theme)
  );
  localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
}

/* ================= text extraction ================= */

/**
 * Convert one page's PDF.js textContent into an array of paragraph strings.
 * Heuristics: group items into lines by Y position, then merge lines into
 * paragraphs using vertical gaps, indentation and hyphenation.
 */
function extractParagraphs(textContent) {
  const lines = [];
  let cur = null;

  for (const item of textContent.items) {
    const str = item.str;
    if (str == null) continue;
    const x = item.transform[4];
    const y = item.transform[5];
    const h = item.height || Math.abs(item.transform[3]) || 10;

    if (cur && Math.abs(y - cur.y) < Math.max(2, cur.h * 0.45)) {
      // Same visual line: decide whether the gap implies a space.
      const gap = x - cur.xEnd;
      if (str.length) {
        if (gap > Math.max(1, cur.h * 0.15) && !cur.text.endsWith(" ") && !str.startsWith(" ")) {
          cur.text += " ";
        }
        cur.text += str;
        cur.xEnd = x + (item.width || 0);
      }
    } else {
      if (cur && cur.text.trim()) lines.push(cur);
      cur = { text: str, x, y, h, xEnd: x + (item.width || 0) };
    }
    if (item.hasEOL && cur) {
      if (cur.text.trim()) lines.push(cur);
      cur = null;
    }
  }
  if (cur && cur.text.trim()) lines.push(cur);

  const paragraphs = [];
  let para = "";
  let prev = null;

  for (const line of lines) {
    const text = line.text.replace(/\s+/g, " ").trim();
    if (!text) continue;

    let newPara = false;
    if (prev) {
      const vgap = prev.y - line.y; // PDF y grows upward
      const indent = line.x - prev.x;
      if (vgap < 0 || vgap > Math.max(prev.h, line.h) * 1.75) newPara = true;
      else if (indent > line.h * 1.2) newPara = true;
      else if (Math.abs(line.h - prev.h) > Math.max(line.h, prev.h) * 0.2) newPara = true; // font size change (e.g. heading → body)
    }

    if (newPara && para) {
      paragraphs.push(para);
      para = "";
    }
    if (para) {
      if (para.endsWith("-") && /^[a-z]/.test(text)) {
        para = para.slice(0, -1) + text; // de-hyphenate
      } else {
        para += " " + text;
      }
    } else {
      para = text;
    }
    prev = line;
  }
  if (para) paragraphs.push(para);
  return paragraphs;
}

/** A page counts as "scanned" when text extraction found (almost) nothing. */
function isScannedPage(paras) {
  return !paras || paras.join("").length < 30;
}

/** Page numbers that still need OCR. */
function scannedPages(doc) {
  const out = [];
  for (let p = 1; p <= doc.numPages; p++) {
    if (isScannedPage(doc.pages[p - 1]) && !(doc.ocrDone && doc.ocrDone[p])) out.push(p);
  }
  return out;
}

async function extractDocument(arrayBuffer, name, size, fileBlob) {
  showLoading("Opening PDF…", 0);
  const task = pdfjsLib.getDocument({ data: arrayBuffer });
  const pdf = await task.promise;
  const numPages = pdf.numPages;
  const id =
    (pdf.fingerprints ? pdf.fingerprints[0] : pdf.fingerprint) ||
    name + ":" + size;

  const existing = await DocStore.get(id);
  if (existing && existing.pages && existing.pages.length === numPages) {
    pdf.destroy();
    // Older records may lack the original bytes needed for OCR — attach them.
    if (!existing.pdfBlob && fileBlob && scannedPages(existing).length) {
      existing.pdfBlob = fileBlob;
    }
    existing.lastOpened = Date.now();
    await DocStore.put(existing);
    return existing;
  }

  const pages = new Array(numPages);
  const CHUNK = 10;
  for (let start = 1; start <= numPages; start += CHUNK) {
    const end = Math.min(start + CHUNK - 1, numPages);
    const jobs = [];
    for (let n = start; n <= end; n++) {
      jobs.push(
        pdf
          .getPage(n)
          .then((page) =>
            page.getTextContent().then((tc) => {
              pages[n - 1] = extractParagraphs(tc);
              page.cleanup();
            })
          )
      );
    }
    await Promise.all(jobs);
    showLoading(`Extracting text — page ${end} of ${numPages}`, end / numPages);
  }
  pdf.destroy();

  const doc = {
    id,
    name: name.replace(/\.pdf$/i, ""),
    size,
    numPages,
    pages,
    ocrDone: {},
    lastPage: 1,
    added: Date.now(),
    lastOpened: Date.now(),
  };
  // Keep the original PDF only when OCR might need to re-render its pages.
  if (fileBlob && scannedPages(doc).length) doc.pdfBlob = fileBlob;
  await DocStore.put(doc);
  return doc;
}

/* ================= rendering ================= */

function renderDocument() {
  const doc = state.doc;
  els.docTitle.textContent = doc.name;
  els.welcome.hidden = true;
  els.reader.hidden = false;
  els.reader.textContent = "";

  const frag = document.createDocumentFragment();
  for (let p = 1; p <= doc.numPages; p++) {
    const pageSection = document.createElement("section");
    pageSection.className = "page";
    pageSection.dataset.page = String(p);
    buildPageContent(pageSection);
    frag.appendChild(pageSection);
  }
  els.reader.appendChild(frag);
  applyAllHighlights();
  els.progressPill.hidden = false;
  updateProgressPill();
  updateOcrBanner();
}

/** (Re)build the inner content of one page section from state.doc. */
function buildPageContent(pageSection) {
  const doc = state.doc;
  const p = Number(pageSection.dataset.page);
  const paras = doc.pages[p - 1];
  const ocrDone = doc.ocrDone && doc.ocrDone[p];
  pageSection.textContent = "";

  const marker = document.createElement("div");
  marker.className = "page-marker";
  marker.textContent = "Page " + p + (ocrDone ? " · OCR" : "");
  pageSection.appendChild(marker);

  if (paras && paras.length) {
    for (let j = 0; j < paras.length; j++) {
      const el = document.createElement("p");
      el.dataset.para = String(j);
      el.textContent = paras[j];
      pageSection.appendChild(el);
    }
  }

  if (isScannedPage(paras) && !ocrDone) {
    const el = document.createElement("p");
    el.className = "no-text";
    el.textContent = "(No selectable text on this page — it looks like a scanned image.) ";
    const btn = document.createElement("button");
    btn.className = "selbtn ocr-page-btn";
    btn.dataset.ocrPage = String(p);
    btn.textContent = "Recognize text (OCR)";
    el.appendChild(btn);
    pageSection.appendChild(el);
  } else if (ocrDone && (!paras || !paras.length)) {
    const el = document.createElement("p");
    el.className = "no-text";
    el.textContent = "(OCR found no readable text on this page.)";
    pageSection.appendChild(el);
  }
}

/** Rebuild a page's DOM (after OCR) and restore its highlights. */
function rebuildPage(p) {
  const el = pageEl(p);
  if (!el) return;
  buildPageContent(el);
  for (const a of state.annots) {
    for (const s of a.segments) {
      if (s.page === p) renderParagraph(s.page, s.para);
    }
  }
}

function pageEl(page) {
  return els.reader.querySelector(`.page[data-page="${page}"]`);
}

function paraEl(page, para) {
  const pe = pageEl(page);
  return pe ? pe.querySelector(`p[data-para="${para}"]`) : null;
}

/** Rebuild one paragraph's DOM from plain text + highlight segments. */
function renderParagraph(page, para, extraSeg) {
  const el = paraEl(page, para);
  if (!el) return;
  const text = state.doc.pages[page - 1][para];

  let segs = [];
  for (const a of state.annots) {
    for (const s of a.segments) {
      if (s.page === page && s.para === para) {
        segs.push({ start: s.start, end: s.end, color: a.color, id: a.id, note: a.note });
      }
    }
  }
  if (extraSeg) segs.push(extraSeg);
  segs.sort((a, b) => a.start - b.start || a.end - b.end);

  el.textContent = "";
  let cur = 0;
  for (const s of segs) {
    const start = Math.max(s.start, cur);
    const end = Math.min(s.end, text.length);
    if (start >= end) continue;
    if (start > cur) el.appendChild(document.createTextNode(text.slice(cur, start)));
    const span = document.createElement("span");
    if (s.flash) {
      span.className = "flash";
    } else {
      span.className = "hl hl-" + s.color + (s.note ? " has-note" : "");
      span.dataset.annId = s.id;
    }
    span.textContent = text.slice(start, end);
    el.appendChild(span);
    cur = end;
  }
  if (cur < text.length) el.appendChild(document.createTextNode(text.slice(cur)));
}

function applyAllHighlights() {
  const touched = new Set();
  for (const a of state.annots) {
    for (const s of a.segments) touched.add(s.page + ":" + s.para);
  }
  for (const key of touched) {
    const [page, para] = key.split(":").map(Number);
    renderParagraph(page, para);
  }
}

function rerenderAnnotation(a) {
  for (const s of a.segments) renderParagraph(s.page, s.para);
}

/* ================= selection → highlight ================= */

/** Character offset of (container, offset) within paragraph element pEl. */
function offsetInParagraph(pEl, container, offset) {
  const r = document.createRange();
  r.selectNodeContents(pEl);
  try {
    r.setEnd(container, offset);
  } catch (e) {
    return 0;
  }
  return r.toString().length;
}

/** Convert the current selection into per-paragraph segments. */
function segmentsFromSelection() {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0 || sel.isCollapsed) return null;
  const range = sel.getRangeAt(0);

  const startP = closestPara(range.startContainer);
  const endP = closestPara(range.endContainer);
  if (!startP && !endP) return null;

  const allParas = els.reader.querySelectorAll("p[data-para]");
  const segments = [];
  let started = false;

  for (const p of allParas) {
    if (!started) {
      if (p === startP) started = true;
      else if (!startP && range.intersectsNode(p)) started = true;
      else continue;
    }
    if (!range.intersectsNode(p) && p !== startP && p !== endP) {
      if (segments.length) break;
      continue;
    }
    const page = Number(p.closest(".page").dataset.page);
    const para = Number(p.dataset.para);
    const text = state.doc.pages[page - 1][para] || "";
    const start = p === startP ? offsetInParagraph(p, range.startContainer, range.startOffset) : 0;
    const end = p === endP ? offsetInParagraph(p, range.endContainer, range.endOffset) : text.length;
    if (end > start) segments.push({ page, para, start, end });
    if (p === endP) break;
  }
  return segments.length ? segments : null;
}

function closestPara(node) {
  let el = node.nodeType === 1 ? node : node.parentElement;
  return el ? el.closest("p[data-para]") : null;
}

function selectedText(segments) {
  return segments
    .map((s) => (state.doc.pages[s.page - 1][s.para] || "").slice(s.start, s.end))
    .join(" ");
}

async function createAnnotation(color, note) {
  const segments = state.pendingRange;
  if (!segments) return null;
  const a = {
    id: "a" + Date.now() + Math.random().toString(36).slice(2, 7),
    docId: state.doc.id,
    color,
    note: note || "",
    text: selectedText(segments).slice(0, 500),
    segments,
    created: Date.now(),
  };
  state.annots.push(a);
  await AnnotStore.put(a);
  rerenderAnnotation(a);
  clearSelection();
  return a;
}

function clearSelection() {
  state.pendingRange = null;
  const sel = window.getSelection();
  if (sel) sel.removeAllRanges();
  els.selbar.hidden = true;
}

/* selection bar */
let selTimer = null;
document.addEventListener("selectionchange", () => {
  clearTimeout(selTimer);
  selTimer = setTimeout(() => {
    if (!state.doc || els.reader.hidden) return;
    if (!els.noteEditor.hidden) return;
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed || sel.rangeCount === 0) {
      if (!state.pendingRange) els.selbar.hidden = true;
      return;
    }
    const range = sel.getRangeAt(0);
    if (!els.reader.contains(range.commonAncestorContainer)) return;
    els.selbar.hidden = false;
  }, 250);
});

els.selbar.addEventListener("click", async (e) => {
  const dot = e.target.closest(".hl-dot");
  if (dot) {
    state.pendingRange = segmentsFromSelection();
    await createAnnotation(dot.dataset.color, "");
    return;
  }
  if (e.target.id === "sel-note") {
    state.pendingRange = segmentsFromSelection();
    if (!state.pendingRange) return clearSelection();
    state.editingAnnotId = null;
    state.pendingColor = "yellow";
    openNoteEditor(selectedText(state.pendingRange), "", "yellow");
    return;
  }
  if (e.target.id === "sel-cancel") clearSelection();
});

/* tapping an existing highlight opens the editor */
els.reader.addEventListener("click", (e) => {
  const span = e.target.closest(".hl");
  if (!span) return;
  const a = state.annots.find((x) => x.id === span.dataset.annId);
  if (!a) return;
  state.editingAnnotId = a.id;
  state.pendingRange = null;
  state.pendingColor = a.color;
  openNoteEditor(a.text, a.note, a.color);
});

/* ================= note editor ================= */

function openNoteEditor(quote, note, color) {
  els.noteQuote.textContent = quote;
  els.noteText.value = note || "";
  state.pendingColor = color;
  document.querySelectorAll("#note-colors .hl-dot").forEach((b) =>
    b.classList.toggle("selected", b.dataset.color === color)
  );
  $("note-delete").hidden = !state.editingAnnotId;
  els.noteEditor.hidden = false;
}

$("note-colors").addEventListener("click", (e) => {
  const dot = e.target.closest(".hl-dot");
  if (!dot) return;
  state.pendingColor = dot.dataset.color;
  document.querySelectorAll("#note-colors .hl-dot").forEach((b) =>
    b.classList.toggle("selected", b === dot)
  );
});

$("note-save").addEventListener("click", async () => {
  const note = els.noteText.value.trim();
  if (state.editingAnnotId) {
    const a = state.annots.find((x) => x.id === state.editingAnnotId);
    if (a) {
      a.note = note;
      a.color = state.pendingColor;
      await AnnotStore.put(a);
      rerenderAnnotation(a);
    }
  } else {
    await createAnnotation(state.pendingColor, note);
  }
  state.editingAnnotId = null;
  els.noteEditor.hidden = true;
});

$("note-delete").addEventListener("click", async () => {
  const a = state.annots.find((x) => x.id === state.editingAnnotId);
  if (a) {
    state.annots = state.annots.filter((x) => x.id !== a.id);
    await AnnotStore.delete(a.id);
    rerenderAnnotation(a);
  }
  state.editingAnnotId = null;
  els.noteEditor.hidden = true;
});

/* ================= search ================= */

let searchTimer = null;
els.searchInput.addEventListener("input", () => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(runSearch, 220);
});

function runSearch() {
  const q = els.searchInput.value.trim();
  els.searchResults.textContent = "";
  els.searchCount.textContent = "";
  if (!state.doc || q.length < 2) return;

  const needle = q.toLowerCase();
  const results = [];
  const MAX = 300;

  outer: for (let p = 0; p < state.doc.numPages; p++) {
    const paras = state.doc.pages[p] || [];
    for (let j = 0; j < paras.length; j++) {
      const hay = paras[j].toLowerCase();
      let idx = hay.indexOf(needle);
      while (idx !== -1) {
        results.push({ page: p + 1, para: j, start: idx, end: idx + q.length });
        if (results.length >= MAX) break outer;
        idx = hay.indexOf(needle, idx + Math.max(q.length, 1));
      }
    }
  }

  els.searchCount.textContent = results.length
    ? `${results.length}${results.length >= MAX ? "+" : ""} match${results.length === 1 ? "" : "es"}`
    : "No matches";

  const frag = document.createDocumentFragment();
  for (const r of results) {
    const text = state.doc.pages[r.page - 1][r.para];
    const ctxStart = Math.max(0, r.start - 45);
    const ctxEnd = Math.min(text.length, r.end + 60);

    const item = document.createElement("div");
    item.className = "result-item";
    const pageLabel = document.createElement("div");
    pageLabel.className = "result-page";
    pageLabel.textContent = "Page " + r.page;
    const body = document.createElement("div");
    if (ctxStart > 0) body.appendChild(document.createTextNode("…"));
    body.appendChild(document.createTextNode(text.slice(ctxStart, r.start)));
    const mark = document.createElement("mark");
    mark.textContent = text.slice(r.start, r.end);
    body.appendChild(mark);
    body.appendChild(document.createTextNode(text.slice(r.end, ctxEnd)));
    if (ctxEnd < text.length) body.appendChild(document.createTextNode("…"));
    item.appendChild(pageLabel);
    item.appendChild(body);
    item.addEventListener("click", () => {
      closePanels();
      jumpTo(r.page, r.para, r.start, r.end);
    });
    frag.appendChild(item);
  }
  els.searchResults.appendChild(frag);
}

function jumpTo(page, para, start, end) {
  const el = para != null ? paraEl(page, para) : pageEl(page);
  if (!el) return;
  el.scrollIntoView({ block: "center" });
  if (para != null && start != null) {
    renderParagraph(page, para, { start, end, flash: true });
    setTimeout(() => renderParagraph(page, para), 2500);
  }
}

/* ================= notes panel ================= */

function renderNotesList() {
  els.notesList.textContent = "";
  const list = state.annots
    .slice()
    .sort((a, b) => {
      const sa = a.segments[0], sb = b.segments[0];
      return sa.page - sb.page || sa.para - sb.para || sa.start - sb.start;
    });

  if (!list.length) {
    const empty = document.createElement("div");
    empty.className = "empty-list";
    empty.textContent = "No highlights yet. Select some text in the document to highlight it or add a note.";
    els.notesList.appendChild(empty);
    return;
  }

  for (const a of list) {
    const item = document.createElement("div");
    item.className = "note-item";
    const pg = document.createElement("div");
    pg.className = "note-page";
    pg.textContent = "Page " + a.segments[0].page;
    const snip = document.createElement("span");
    snip.className = "snippet " + a.color;
    snip.textContent = a.text.length > 180 ? a.text.slice(0, 180) + "…" : a.text;
    item.appendChild(pg);
    item.appendChild(snip);
    if (a.note) {
      const body = document.createElement("div");
      body.className = "note-body";
      body.textContent = a.note;
      item.appendChild(body);
    }
    item.addEventListener("click", () => {
      closePanels();
      const s = a.segments[0];
      jumpTo(s.page, s.para, s.start, s.end);
    });
    els.notesList.appendChild(item);
  }
}

$("notes-export").addEventListener("click", () => {
  if (!state.doc) return;
  const list = state.annots
    .slice()
    .sort((a, b) => a.segments[0].page - b.segments[0].page || a.segments[0].start - b.segments[0].start);
  let md = `# Highlights — ${state.doc.name}\n\n`;
  for (const a of list) {
    md += `> ${a.text}\n>\n> — p. ${a.segments[0].page}\n\n`;
    if (a.note) md += `${a.note}\n\n`;
  }
  const blob = new Blob([md], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = state.doc.name + " - highlights.md";
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
});

/* ================= library ================= */

async function renderLibrary(target) {
  const docs = (await DocStore.all()).sort((a, b) => b.lastOpened - a.lastOpened);
  target.textContent = "";
  if (!docs.length) {
    if (target === els.libraryList) {
      const empty = document.createElement("div");
      empty.className = "empty-list";
      empty.textContent = "No documents yet.";
      target.appendChild(empty);
    }
    return;
  }
  for (const d of docs.slice(0, target === els.recentDocs ? 5 : docs.length)) {
    const item = document.createElement("div");
    item.className = "doc-item";
    const info = document.createElement("div");
    info.className = "doc-info";
    const name = document.createElement("div");
    name.className = "doc-name";
    name.textContent = d.name;
    const meta = document.createElement("div");
    meta.className = "doc-meta";
    meta.textContent = `${d.numPages} pages · last read p. ${d.lastPage || 1}`;
    info.appendChild(name);
    info.appendChild(meta);
    item.appendChild(info);

    const del = document.createElement("button");
    del.className = "doc-del";
    del.textContent = "🗑";
    del.setAttribute("aria-label", "Delete document");
    del.addEventListener("click", async (e) => {
      e.stopPropagation();
      if (!confirm(`Remove “${d.name}” and its highlights from this device?`)) return;
      await DocStore.delete(d.id);
      await AnnotStore.deleteForDoc(d.id);
      if (state.doc && state.doc.id === d.id) location.reload();
      else renderLibrary(target);
    });
    item.appendChild(del);

    item.addEventListener("click", async () => {
      closePanels();
      const full = await DocStore.get(d.id);
      if (full) openDocument(full);
    });
    target.appendChild(item);
  }
}

/* ================= reading position ================= */

let currentPage = 1;
let saveTimer = null;

function updateProgressPill() {
  if (!state.doc) return;
  const pct = Math.round((currentPage / state.doc.numPages) * 100);
  els.progressPill.textContent = `p. ${currentPage} / ${state.doc.numPages} · ${pct}%`;
}

function findVisiblePage() {
  const pages = els.reader.querySelectorAll(".page");
  const target = window.scrollY + window.innerHeight * 0.35;
  let lo = 0, hi = pages.length - 1, best = 0;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (pages[mid].offsetTop <= target) {
      best = mid;
      lo = mid + 1;
    } else hi = mid - 1;
  }
  return best + 1;
}

let scrollTicking = false;
window.addEventListener("scroll", () => {
  if (!state.doc || els.reader.hidden || scrollTicking) return;
  scrollTicking = true;
  requestAnimationFrame(() => {
    scrollTicking = false;
    const p = findVisiblePage();
    if (p !== currentPage) {
      currentPage = p;
      updateProgressPill();
      clearTimeout(saveTimer);
      saveTimer = setTimeout(async () => {
        if (!state.doc) return;
        state.doc.lastPage = currentPage;
        state.doc.lastOpened = Date.now();
        try { await DocStore.put(state.doc); } catch (e) {}
      }, 1200);
    }
  });
}, { passive: true });

/* ================= panels / chrome ================= */

function closePanels() {
  for (const p of [els.searchPanel, els.notesPanel, els.libraryPanel, els.settingsPanel]) {
    p.hidden = true;
  }
  els.scrim.hidden = true;
}

function openPanel(panel) {
  closePanels();
  panel.hidden = false;
  els.scrim.hidden = false;
}

$("btn-search").addEventListener("click", () => {
  if (!state.doc) return;
  openPanel(els.searchPanel);
  els.searchInput.focus();
});
$("btn-notes").addEventListener("click", () => {
  if (!state.doc) return;
  renderNotesList();
  openPanel(els.notesPanel);
});
$("btn-library").addEventListener("click", () => {
  renderLibrary(els.libraryList);
  openPanel(els.libraryPanel);
});
$("btn-settings").addEventListener("click", () => openPanel(els.settingsPanel));

els.scrim.addEventListener("click", closePanels);
document.querySelectorAll(".close").forEach((btn) =>
  btn.addEventListener("click", () => {
    const target = $(btn.dataset.close);
    if (target) target.hidden = true;
    if (btn.dataset.close !== "note-editor") els.scrim.hidden = true;
    if (btn.dataset.close === "note-editor") {
      state.editingAnnotId = null;
      clearSelection();
    }
  })
);

/* settings controls */
$("font-dec").addEventListener("click", () => { prefs.fontSize = Math.max(13, prefs.fontSize - 1); applyPrefs(); });
$("font-inc").addEventListener("click", () => { prefs.fontSize = Math.min(30, prefs.fontSize + 1); applyPrefs(); });
$("lh-dec").addEventListener("click", () => { prefs.lineHeight = Math.max(1.2, +(prefs.lineHeight - 0.1).toFixed(1)); applyPrefs(); });
$("lh-inc").addEventListener("click", () => { prefs.lineHeight = Math.min(2.2, +(prefs.lineHeight + 0.1).toFixed(1)); applyPrefs(); });
$("font-family-seg").addEventListener("click", (e) => {
  if (e.target.dataset.font) { prefs.fontFamily = e.target.dataset.font; applyPrefs(); }
});
$("theme-seg").addEventListener("click", (e) => {
  if (e.target.dataset.theme) { prefs.theme = e.target.dataset.theme; applyPrefs(); }
});

/* ================= OCR (Tesseract.js, fully on-device) ================= */

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = src;
    s.onload = resolve;
    s.onerror = () => reject(new Error("Failed to load " + src));
    document.head.appendChild(s);
  });
}

/** Turn Tesseract's plain-text output into paragraph strings. */
function ocrTextToParagraphs(text) {
  const paras = [];
  for (const block of text.split(/\n\s*\n/)) {
    let para = "";
    for (const rawLine of block.split("\n")) {
      const line = rawLine.replace(/\s+/g, " ").trim();
      if (!line) continue;
      if (para.endsWith("-") && /^[a-z]/.test(line)) para = para.slice(0, -1) + line;
      else para += (para ? " " : "") + line;
    }
    if (para) paras.push(para);
  }
  return paras;
}

const OCR = {
  worker: null,
  pdf: null,
  running: false,
  cancelRequested: false,

  async ensureWorker() {
    if (this.worker) return this.worker;
    if (!window.Tesseract) await loadScript("js/vendor/tesseract/tesseract.min.js");
    this.worker = await Tesseract.createWorker("eng", 1, {
      workerPath: "js/vendor/tesseract/worker.min.js",
      corePath: "js/vendor/tesseract/",
      langPath: "js/vendor/tesseract/",
    });
    return this.worker;
  },

  async ensurePdf() {
    if (this.pdf) return this.pdf;
    if (!state.doc || !state.doc.pdfBlob) {
      throw new Error(
        "The original PDF file isn't stored for this document. " +
          "Open the PDF file once more (Library → Open PDF) to enable OCR."
      );
    }
    const buf = await state.doc.pdfBlob.arrayBuffer();
    this.pdf = await pdfjsLib.getDocument({ data: buf }).promise;
    return this.pdf;
  },

  /** Render page n to a canvas and recognize it. Returns paragraph strings. */
  async recognizePage(n) {
    const worker = await this.ensureWorker();
    const pdf = await this.ensurePdf();
    const page = await pdf.getPage(n);
    const base = page.getViewport({ scale: 1 });
    const scale = Math.min(3, Math.max(1.5, 1600 / base.width));
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement("canvas");
    canvas.width = Math.floor(viewport.width);
    canvas.height = Math.floor(viewport.height);
    await page.render({ canvasContext: canvas.getContext("2d"), viewport }).promise;
    page.cleanup();
    const { data } = await worker.recognize(canvas);
    canvas.width = canvas.height = 0; // release bitmap memory eagerly
    return ocrTextToParagraphs(data.text || "");
  },

  release() {
    if (this.pdf) {
      this.pdf.destroy();
      this.pdf = null;
    }
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
  },
};

let ocrBannerDismissed = false;

function showOcrBanner(text, running) {
  $("ocr-banner").hidden = false;
  $("ocr-banner-text").textContent = text;
  $("ocr-run").hidden = running;
  $("ocr-cancel").hidden = !running;
  $("ocr-dismiss").hidden = running;
}

function updateOcrBanner() {
  if (OCR.running) return;
  const banner = $("ocr-banner");
  if (!state.doc || ocrBannerDismissed) {
    banner.hidden = true;
    return;
  }
  const remaining = scannedPages(state.doc).length;
  if (!remaining) {
    banner.hidden = true;
    return;
  }
  showOcrBanner(
    remaining === 1
      ? "1 page looks scanned and has no text."
      : `${remaining} pages look scanned and have no text.`,
    false
  );
}

async function runOcrBatch(pages) {
  if (OCR.running || !pages.length) return;
  OCR.running = true;
  OCR.cancelRequested = false;
  showOcrBanner("Loading OCR engine…", true);

  let done = 0;
  let unsaved = 0;
  try {
    for (const n of pages) {
      if (OCR.cancelRequested) break;
      showOcrBanner(`Recognizing page ${n}… (${done} of ${pages.length} done)`, true);
      const paras = await OCR.recognizePage(n);
      state.doc.pages[n - 1] = paras;
      if (!state.doc.ocrDone) state.doc.ocrDone = {};
      state.doc.ocrDone[n] = true;
      rebuildPage(n);
      done++;
      if (++unsaved >= 5) {
        unsaved = 0;
        await DocStore.put(state.doc);
      }
    }
    await DocStore.put(state.doc);
  } catch (err) {
    console.error(err);
    alert("OCR failed: " + (err && err.message ? err.message : err));
  } finally {
    OCR.running = false;
    OCR.release();
    updateOcrBanner();
  }
}

$("ocr-run").addEventListener("click", () => {
  if (!state.doc) return;
  runOcrBatch(scannedPages(state.doc));
});
$("ocr-cancel").addEventListener("click", () => {
  OCR.cancelRequested = true;
  $("ocr-banner-text").textContent = "Finishing current page…";
});
$("ocr-dismiss").addEventListener("click", () => {
  ocrBannerDismissed = true;
  $("ocr-banner").hidden = true;
});

/* per-page OCR buttons inside the reader */
els.reader.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-ocr-page]");
  if (!btn) return;
  e.stopPropagation();
  runOcrBatch([Number(btn.dataset.ocrPage)]);
});

/* ================= loading / open flow ================= */

function showLoading(text, frac) {
  els.loading.hidden = false;
  els.loadingText.textContent = text;
  els.loadingBar.style.width = Math.round((frac || 0) * 100) + "%";
}

function hideLoading() {
  els.loading.hidden = true;
}

async function handleFile(file) {
  if (!file) return;
  try {
    showLoading("Reading file…", 0);
    const buf = await file.arrayBuffer();
    const doc = await extractDocument(buf, file.name, file.size, file);
    await openDocument(doc);
  } catch (err) {
    hideLoading();
    alert("Sorry, that PDF could not be opened.\n\n" + (err && err.message ? err.message : err));
    console.error(err);
  }
}

async function openDocument(doc) {
  showLoading("Preparing document…", 1);
  state.doc = doc;
  state.annots = await AnnotStore.forDoc(doc.id);
  currentPage = doc.lastPage || 1;
  ocrBannerDismissed = false;

  // Let the loading overlay paint before the (potentially large) DOM build.
  await new Promise((r) => setTimeout(r, 30));
  renderDocument();
  hideLoading();
  closePanels();

  if (doc.lastPage && doc.lastPage > 1) {
    const el = pageEl(doc.lastPage);
    if (el) el.scrollIntoView();
  } else {
    window.scrollTo(0, 0);
  }
  updateProgressPill();

  doc.lastOpened = Date.now();
  try { await DocStore.put(doc); } catch (e) {}
}

els.fileInput.addEventListener("change", (e) => handleFile(e.target.files[0]));
els.fileInput2.addEventListener("change", (e) => handleFile(e.target.files[0]));

/* ================= init ================= */

applyPrefs();
renderLibrary(els.recentDocs);

if ("serviceWorker" in navigator && location.protocol === "https:") {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}
