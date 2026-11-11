/* The Slip — shell: contents, the step-by-step lesson player and the glossary. No framework, no build. */
(() => {
  "use strict";
  const { esc } = window.SLIP.kit;
  const CH = window.SLIP.chapters;
  const BY = Object.fromEntries(CH.map((c, i) => { c.n = i + 1; return [c.id, c]; }));
  const app = document.getElementById("app");
  const back = document.getElementById("backfab");

  /* ---- saved progress ---- */
  const KEY = "the-slip/v2";
  const blank = () => ({ at: {}, done: {}, ans: {} });
  let S = blank();
  try { const raw = localStorage.getItem(KEY); if (raw) S = Object.assign(blank(), JSON.parse(raw)); } catch (e) { /* private mode */ }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* ignore */ } };

  /* ---- text ---- */
  const fmt = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/(^|[^*\w])\*([^*\n]+?)\*(?![*\w])/g, "$1<em>$2</em>");
  const paras = (t) => String(t).split(/\n\n+/).map((p) => `<p>${fmt(p)}</p>`).join("");
  const call = (x, v) => (typeof x === "function" ? x(v) : x);
  const ICON = {
    back: '<path d="M15 5l-7 7 7 7"/>', next: '<path d="M9 5l7 7-7 7"/>', check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    search: '<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4 4"/>', book: '<path d="M5 4.5h10.5A2.5 2.5 0 0 1 18 7v13H7.5A2.5 2.5 0 0 1 5 17.5z"/><path d="M5 17.5A2.5 2.5 0 0 1 7.5 15H18"/>'
  };
  const icon = (n) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[n]}</svg>`;

  /* ---- chapter state: the numbers you set carry from step to step ---- */
  const VALS = {};
  const vals = (c) => VALS[c.id] || (VALS[c.id] = Object.assign({}, c.init || {}));
  const ansKey = (c, i) => `${c.id}:${i}`;
  const view = (c, i) => Object.assign({}, vals(c), { $ans: S.ans[ansKey(c, i)], $done: S.ans[ansKey(c, i)] !== undefined });

  /* ---- contents ---- */
  function nextUp() { return CH.find((c) => !S.done[c.id]) || CH[0]; }
  function viewHome() {
    const up = nextUp();
    const started = Object.keys(S.at).length > 0 || Object.keys(S.done).length > 0;
    const doneN = CH.filter((c) => S.done[c.id]).length;
    const PARTS = { LM1: "London Market insurance essentials", LM2: "Principles and practices", LM3: "Underwriting principles" };
    const row = (c) => {
      const at = S.at[c.id] || 0, done = !!S.done[c.id];
      const p = done ? 100 : Math.round((at / (c.steps.length - 1)) * 100);
      return `<a class="ch${done ? " is-done" : ""}${c === up ? " is-next" : ""}" href="#${c.id}">
        <span class="ch-n">${done ? icon("check") : c.n}</span>
        <span class="ch-main"><b>${esc(c.title)}</b><span>${esc(c.blurb)}</span>
          <span class="ch-meta">${c.minutes} min${!done && at > 0 ? ` · step ${at + 1} of ${c.steps.length}` : ""}${done ? " · done" : ""}</span>
          ${!done && at > 0 ? `<span class="ch-bar"><i style="width:${p}%"></i></span>` : ""}
        </span>
      </a>`;
    };
    const rows = Object.keys(PARTS).map((p) => {
      const cs = CH.filter((c) => c.part === p);
      if (!cs.length) return "";
      const d = cs.filter((c) => S.done[c.id]).length;
      return `<section class="part"><h3><b>${p}</b><span>${PARTS[p]}</span><em>${d}/${cs.length}</em></h3>${cs.map(row).join("")}</section>`;
    }).join("");
    return `<div class="spread home">
      <header class="page cover"><div class="cover-in">
        <p class="eyebrow">London Market insurance</p>
        <h1>The Slip</h1>
        <p class="lede">The LM1, LM2 and LM3 syllabuses, one idea per screen. You predict, then you see why.</p>
        <a class="btn" href="#${up.id}">${started ? `Continue: ${esc(up.title)}` : "Start with LM1"}${icon("next")}</a>
        <p class="cover-foot">${doneN} of ${CH.length} chapters done</p>
      </div></header>
      <main class="page list"><div class="list-in">
        <h2 class="eyebrow">Contents</h2>
        <nav class="chs">${rows}</nav>
        <a class="gloss-link" href="#glossary">${icon("book")}<span><b>Glossary</b><span>${window.SLIP_DATA.glossary.length} terms, searchable</span></span>${icon("next")}</a>
        <p class="fine">Figures in the models are invented to teach, not market data. <button type="button" class="linkish" data-act="reset">Reset progress</button></p>
      </div></main>
    </div>`;
  }

  /* ---- the lesson player ---- */
  let cur = null; // { c, i }
  function controlsHTML(c, st, v) {
    if (!st.ctl) return "";
    return `<div class="ctls">${st.ctl.map((k) => {
      if (k.opts) return `<div class="ctl"><span class="ctl-l">${esc(k.label)}</span><div class="seg-ctl" role="group">${k.opts.map((o, j) => `<button type="button" data-act="opt" data-k="${k.k}" data-v="${j}" aria-pressed="${v[k.k] === j}">${esc(o)}</button>`).join("")}</div></div>`;
      const show = k.fmt ? k.fmt(v[k.k]) : String(v[k.k]);
      return `<label class="ctl"><span class="ctl-l"><span>${esc(k.label)}</span><output data-out="${k.k}">${esc(show)}</output></span><input type="range" data-k="${k.k}" min="${k.min}" max="${k.max}" step="${k.step || 1}" value="${v[k.k]}"></label>`;
    }).join("")}</div>`;
  }
  function askHTML(c, i, st) {
    if (!st.ask) return "";
    const a = S.ans[ansKey(c, i)];
    const done = a !== undefined;
    return `<div class="ask${done ? " answered" : ""}"><p class="ask-q">${fmt(st.ask.q)}</p>
      <div class="ask-opts">${st.ask.opts.map((o, j) => `<button type="button" data-act="answer" data-j="${j}"${done ? " disabled" : ""} class="${done && j === st.ask.a ? "right" : ""}${done && j === a && j !== st.ask.a ? "wrong" : ""}">${fmt(o)}</button>`).join("")}</div>
      ${done ? `<div class="ask-why"><b>${a === st.ask.a ? "Yes." : "Not quite."}</b> ${fmt(st.ask.why)}</div>` : ""}</div>`;
  }
  const liveHTML = (st, v, where) => (st.live ? `<div class="live live-${where}" data-live>${paras(st.live(v))}</div>` : "");
  const stageHTML = (st, v) => (st.scene ? st.scene(v) : "");

  function viewChapter(c) {
    const i = Math.min(S.at[c.id] || 0, c.steps.length - 1);
    cur = { c, i };
    const st = c.steps[i];
    const v = view(c, i);
    const last = i === c.steps.length - 1;
    const waiting = st.ask && !v.$done;
    const hideSay = false;
    return `<div class="spread lesson">
      <section class="page stage-page"><div class="stage-top"><span class="eyebrow">${c.part} · ${esc(c.title)}</span></div>
        <div class="stage-wrap"><div class="stage" id="stage">${stageHTML(st, v)}</div>${liveHTML(st, v, "stage")}</div></section>
      <section class="page talk-page">
        <div class="prog" role="progressbar" aria-valuemin="1" aria-valuemax="${c.steps.length}" aria-valuenow="${i + 1}" aria-label="Step ${i + 1} of ${c.steps.length}">${c.steps.map((_, j) => `<i class="${j < i ? "past" : j === i ? "now" : ""}"></i>`).join("")}</div>
        <div class="talk" id="talk">
          ${st.h ? `<h2>${fmt(st.h)}</h2>` : ""}
          ${hideSay ? "" : `<div class="say">${paras(call(st.say, v))}</div>`}
          ${askHTML(c, i, st)}
          ${controlsHTML(c, st, v)}
          ${liveHTML(st, v, "talk")}
          ${st.after && v.$done ? `<div class="say">${paras(call(st.after, v))}</div>` : ""}
        </div>
        <div class="nav"><button type="button" class="nav-b" data-act="prev"${i === 0 ? " disabled" : ""} aria-label="Previous step">${icon("back")}</button>
          <button type="button" class="nav-n${waiting ? " quiet" : ""}" data-act="next">${last ? "Finish chapter" : waiting ? "Skip" : "Next"}${icon(last ? "check" : "next")}</button></div>
      </section>
    </div>`;
  }

  function refreshStage() {
    const { c, i } = cur, st = c.steps[i], v = view(c, i);
    const stage = document.getElementById("stage");
    if (stage) stage.innerHTML = stageHTML(st, v);
    if (st.live) document.querySelectorAll("[data-live]").forEach((el) => { el.innerHTML = paras(st.live(v)); });
    (st.ctl || []).forEach((k) => {
      const o = document.querySelector(`[data-out="${k.k}"]`);
      if (o) o.textContent = k.fmt ? k.fmt(v[k.k]) : String(v[k.k]);
      document.querySelectorAll(`[data-act="opt"][data-k="${k.k}"]`).forEach((b) => b.setAttribute("aria-pressed", String(+b.dataset.v === v[k.k])));
    });
  }

  function go(delta) {
    if (!cur) return;
    const { c, i } = cur;
    const j = i + delta;
    if (j < 0) return;
    if (j >= c.steps.length) { S.done[c.id] = Date.now(); S.at[c.id] = 0; save(); location.hash = "home"; return; }
    S.at[c.id] = j; save();
    if (delta > 0 && c.steps[j].set) Object.assign(vals(c), c.steps[j].set);
    render(delta > 0 ? "fwd" : "rev");
  }

  /* ---- glossary ---- */
  let gq = "";
  const GL = window.SLIP_DATA.glossary.map(([term, def]) => ({ term, def })).sort((a, b) => a.term.localeCompare(b.term, "en", { sensitivity: "base" }));
  const glossList = () => {
    const n = gq.trim().toLowerCase();
    const items = n ? GL.filter((g) => g.term.toLowerCase().includes(n) || g.def.toLowerCase().includes(n)) : GL;
    if (!items.length) return `<p class="fine">Nothing matches “${esc(gq.trim())}”.</p>`;
    return `<dl class="gl">${items.map((g) => `<div><dt>${esc(g.term)}</dt><dd>${esc(g.def)}</dd></div>`).join("")}</dl>`;
  };
  function viewGlossary() {
    return `<div class="spread gloss">
      <header class="page cover small"><div class="cover-in"><p class="eyebrow">The Slip</p><h1>Glossary</h1>
        <p class="lede">Market jargon in plain words.</p>
        <label class="search">${icon("search")}<input id="gq" type="search" placeholder="Search ${GL.length} terms" value="${esc(gq)}" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Search the glossary"></label>
      </div></header>
      <main class="page list"><div class="list-in" id="gl">${glossList()}</div></main>
    </div>`;
  }

  /* ---- routing ---- */
  function render(dir) {
    const h = location.hash.replace(/^#/, "") || "home";
    let html, isLesson = false;
    if (BY[h]) { html = viewChapter(BY[h]); isLesson = true; }
    else if (h === "glossary") { html = viewGlossary(); cur = null; }
    else { html = viewHome(); cur = null; }
    app.innerHTML = html;
    app.dataset.dir = dir || "";
    document.body.classList.toggle("in-lesson", isLesson);
    back.hidden = h === "home" || !h;
    back.setAttribute("href", "#home");
    window.scrollTo(0, 0);
    const talk = document.getElementById("talk");
    if (talk) talk.scrollTop = 0;
  }
  window.addEventListener("hashchange", () => render());

  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-act]");
    if (!t) return;
    const act = t.dataset.act;
    if (act === "next") go(1);
    else if (act === "prev") go(-1);
    else if (act === "answer" && cur) {
      const { c, i } = cur;
      S.ans[ansKey(c, i)] = +t.dataset.j; save();
      const y = document.getElementById("talk").scrollTop;
      render();
      const talk = document.getElementById("talk");
      talk.scrollTop = y;
      const why = talk.querySelector(".ask-why");
      if (why && why.scrollIntoView) why.scrollIntoView({ block: "nearest", behavior: "smooth" });
    } else if (act === "opt" && cur) {
      vals(cur.c)[t.dataset.k] = +t.dataset.v;
      refreshStage();
    } else if (act === "reset") {
      if (t.dataset.armed) { S = blank(); save(); Object.keys(VALS).forEach((k) => delete VALS[k]); render(); }
      else { t.dataset.armed = "1"; t.textContent = "Tap again to erase everything"; }
    }
  });
  document.addEventListener("input", (e) => {
    const t = e.target;
    if (t.id === "gq") { gq = t.value; document.getElementById("gl").innerHTML = glossList(); return; }
    if (t.type === "range" && cur && t.dataset.k) { vals(cur.c)[t.dataset.k] = +t.value; refreshStage(); }
  });
  document.addEventListener("keydown", (e) => {
    if (!cur || e.target.tagName === "INPUT") return;
    if (e.key === "ArrowRight") go(1);
    if (e.key === "ArrowLeft") go(-1);
  });
  /* swipe between steps, but never while dragging a slider */
  let sw = null;
  document.addEventListener("touchstart", (e) => {
    const t = e.touches[0];
    sw = cur && e.touches.length === 1 && !e.target.closest("input, .seg-ctl") ? { x: t.clientX, y: t.clientY } : null;
  }, { passive: true });
  document.addEventListener("touchend", (e) => {
    if (!sw) return;
    const t = e.changedTouches[0], dx = t.clientX - sw.x, dy = t.clientY - sw.y;
    sw = null;
    if (Math.abs(dx) > 70 && Math.abs(dy) < 50) go(dx < 0 ? 1 : -1);
  }, { passive: true });

  render();

  if (!window.SLIP_ARTIFACT && "serviceWorker" in navigator && /^https?:$/.test(location.protocol)) {
    window.addEventListener("load", () => { navigator.serviceWorker.register("sw.js").catch(() => {}); });
  }
})();
