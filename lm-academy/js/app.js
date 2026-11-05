/* The Slip — app shell, views and interactive tools. No framework, no build step. */
(() => {
  "use strict";

  const DATA = window.SLIP_DATA;
  const BY_ID = {};
  (DATA.modules || []).forEach((m) => { BY_ID[m.id] = m; });
  const PARTS = ((DATA.course && DATA.course.parts) || [{ title: "Course", modules: (DATA.modules || []).map((m) => m.id) }])
    .map((p, pi) => ({ title: p.title, num: pi + 1, modules: p.modules.map((id) => BY_ID[id]).filter(Boolean) }));
  const MODULES = [];
  PARTS.forEach((p) => p.modules.forEach((m) => {
    m.part = p;
    m.code = String(MODULES.length + 1).padStart(2, "0");
    MODULES.push(m);
  }));
  const MOD = {};
  const LESSONS = [];
  const LESSON = {};

  MODULES.forEach((m) => {
    MOD[m.id] = m;
    m.lessons.forEach((l, li) => {
      l.id = `${m.id}-l${li + 1}`;
      l.num = li + 1;
      l.module = m;
      l.order = LESSONS.length;
      LESSONS.push(l);
      LESSON[l.id] = l;
    });
  });

  const plainBlock = (b) => {
    if (typeof b === "string") return b;
    if (b.h) return b.h;
    if (b.ul || b.ol) return (b.ul || b.ol).join(" ");
    if (b.terms) return b.terms.map((t) => t.join(" ")).join(" ");
    if (b.example) return `${b.example.title || ""} ${b.example.text}`;
    if (b.think) return `${b.think.q} ${b.think.a}`;
    if (b.table) return b.table.rows.map((r) => r.join(" ")).join(" ");
    if (b.timeline || b.chain) return (b.timeline || b.chain).map((t) => t.join(" ")).join(" ");
    return b.analogy || b.note || b.aware || b.text || "";
  };
  LESSONS.forEach((l) => {
    l.text = `${l.title}. ${l.body.map(plainBlock).join(" ")} ${l.takeaways.join(" ")}`.replace(/\*\*/g, "").replace(/\s+/g, " ");
  });

  const slug = (s) => s.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const GLOSSARY = DATA.glossary
    .map(([term, def, mod]) => ({ id: slug(term), term, def, mod }))
    .sort((a, b) => a.term.localeCompare(b.term, "en", { sensitivity: "base" }));

  /* ---------------------------------------------------------------- utils */
  const esc = (s) =>
    String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  const fmt = (s) => esc(s)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|[^*\w])\*([^*\n]+?)\*(?![*\w])/g, "$1<em>$2</em>");
  const $ = (sel) => document.querySelector(sel);
  const shuffle = (arr) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  const pct = (v, d = 1) => `${v.toFixed(d)}%`;
  const fmtLine = (v) => `${Number.isInteger(v) ? v : v.toFixed(1)}%`;
  const fmtM = (v) => {
    const a = Math.abs(v);
    const s = Number.isInteger(Math.round(a * 10) / 10) ? Math.round(a).toString() : a.toFixed(1);
    return `${v < -0.0001 ? "−" : ""}£${s}m`;
  };
  const fmtK = (v) => (v >= 1e6 ? `£${(v / 1e6).toFixed(2)}m` : `£${(Math.round(v / 100) / 10).toFixed(1).replace(/\.0$/, "")}k`);
  const dayKey = (d = new Date()) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  const fmtDate = (t) =>
    new Date(t).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

  /* ---------------------------------------------------------------- icons */
  const ICONS = {
    slip: '<path d="M7 3h7.5L19 7.5V21H7z"/><path d="M14.5 3v4.5H19"/><path d="M10 12h6M10 15.5h6M10 19h3"/>',
    learn: '<path d="M3 5.5c2.7-1 5.7-.9 9 1 3.3-1.9 6.3-2 9-1V19c-2.7-1-5.7-.9-9 1-3.3-1.9-6.3-2-9-1z"/><path d="M12 6.5V20"/>',
    practice: '<circle cx="12" cy="12" r="8.5"/><path d="M8.3 12.4l2.6 2.6 4.8-5.2"/>',
    glossary: '<path d="M5 4.5h10.5A2.5 2.5 0 0 1 18 7v13H7.5A2.5 2.5 0 0 1 5 17.5z"/><path d="M5 17.5A2.5 2.5 0 0 1 7.5 15H18"/><path d="M9 8.5h5"/>',
    lab: '<path d="M6 4v16M12 4v16M18 4v16"/><circle cx="6" cy="14.5" r="2.2" fill="currentColor"/><circle cx="12" cy="8.5" r="2.2" fill="currentColor"/><circle cx="18" cy="12.5" r="2.2" fill="currentColor"/>',
    chevL: '<path d="M15 5l-7 7 7 7"/>',
    chevR: '<path d="M9 5l7 7-7 7"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    search: '<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4 4"/>',
    tower: '<rect x="6" y="3" width="12" height="5" rx="1"/><rect x="6" y="9.5" width="12" height="5" rx="1"/><rect x="6" y="16" width="12" height="5" rx="1"/>',
    ratio: '<path d="M4 20h16"/><path d="M7 20v-8M12 20V6M17 20v-5"/>',
    cards: '<rect x="4" y="7" width="12.5" height="14" rx="2"/><path d="M8 3.5h10a2 2 0 0 1 2 2V17"/>',
    bolt: '<path d="M13 3L5 13.5h6L10 21l8-10.5h-6z"/>',
    map: '<circle cx="12" cy="12" r="2.6"/><circle cx="4.8" cy="6" r="2"/><circle cx="19.2" cy="6" r="2"/><circle cx="4.8" cy="18" r="2"/><circle cx="19.2" cy="18" r="2"/><path d="M9.8 10.6 6.5 7.4M14.2 10.6l3.3-3.2M9.8 13.4l-3.3 3.2M14.2 13.4l3.3 3.2"/>'
  };
  const icon = (name, cls = "") =>
    `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]}</svg>`;
  const chev = icon("chevR", "chev");

  /* ---------------------------------------------------------------- state */
  const KEY = "the-slip/v1";
  const blank = () => ({ done: {}, quiz: {}, cards: {}, days: [], qa: { n: 0, c: 0 }, final: null, missed: {}, text: "m" });
  const load = () => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const s = JSON.parse(raw);
        if (s && typeof s === "object") return Object.assign(blank(), s);
      }
    } catch (e) { /* storage unavailable: start fresh */ }
    return blank();
  };
  let S = load();
  const applyTextSize = () => { document.documentElement.dataset.text = S.text || "m"; };
  applyTextSize();
  const save = () => {
    try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* ignore */ }
  };
  const touch = () => {
    const k = dayKey();
    if (!S.days.includes(k)) {
      S.days.push(k);
      if (S.days.length > 400) S.days = S.days.slice(-400);
    }
  };
  const streak = () => {
    const set = new Set(S.days);
    const d = new Date();
    if (!set.has(dayKey(d))) d.setDate(d.getDate() - 1);
    let n = 0;
    while (set.has(dayKey(d))) { n++; d.setDate(d.getDate() - 1); }
    return n;
  };
  const modDone = (m) => m.lessons.filter((l) => S.done[l.id]).length;
  const nextLesson = () => LESSONS.find((l) => !S.done[l.id]) || null;
  const cardBox = (id) => (S.cards[id] === undefined ? null : S.cards[id]);

  /* ---------------------------------------------------------------- shell */
  const app = document.getElementById("app");
  const TABS = ["home", "learn", "practice", "glossary", "lab"];

  function mast({ back, backLabel, kicker, title, sub, tall, extra }) {
    return `<header class="mast${tall ? " tall" : ""}"><div class="wrap">
      <div class="mast-top">${back ? `<a class="mast-back" href="#${back}">${icon("chevL")}<span>${esc(backLabel)}</span></a>` : ""}</div>
      ${kicker ? `<p class="kicker">${kicker}</p>` : ""}
      <h1 class="mast-title">${title}</h1>
      ${sub ? `<p class="mast-sub">${sub}</p>` : ""}
      ${extra || ""}
    </div></header>`;
  }

  const spread = (left, right, cls = false) =>
    `<div class="spread"><div class="page page-l${cls === true ? " cover" : cls ? ` ${cls}` : ""}">${left}</div><div class="page page-r">${right}</div></div>`;
  const mapBtn = (href, label) => `<a class="mast-btn" href="#${href}">${icon("map")}<span>${label}</span></a>`;
  const LETTERS = [...new Set(GLOSSARY.map((g) => g.term[0].toUpperCase()))];

  function resolve(h) {
    let m;
    if (h === "learn") return { tab: "learn", html: viewLearn };
    if (h === "map") return { tab: "learn", html: () => viewMap(null), top: true };
    if ((m = h.match(/^map-(m\d\d)$/)) && MOD[m[1]]) return { tab: "learn", html: () => viewMap(MOD[m[1]]), top: true };
    if ((m = h.match(/^(m\d\d)$/)) && MOD[m[1]]) return { tab: "learn", html: () => viewModule(MOD[m[1]]) };
    if ((m = h.match(/^(m\d\d-l\d+)$/)) && LESSON[m[1]]) return { tab: "learn", html: () => viewLesson(LESSON[m[1]]), lesson: true };
    if (h === "practice") return { tab: "practice", html: viewPractice };
    if ((m = h.match(/^quiz-(quick|review|m\d\d)$/)) && (m[1] === "quick" || m[1] === "review" || MOD[m[1]])) return { tab: "practice", html: () => viewQuiz(m[1]), top: true };
    if (h === "cards") return { tab: "practice", html: viewCards, top: true };
    if (h === "glossary") return { tab: "glossary", html: viewGlossary };
    if (h === "lab") return { tab: "lab", html: viewLab };
    if (h === "lab-slip") return { tab: "lab", html: viewSlipTool };
    if (h === "lab-tower") return { tab: "lab", html: viewTowerTool };
    if (h === "lab-ratio") return { tab: "lab", html: viewRatioTool };
    return { tab: "home", html: viewHome };
  }

  let current = null;
  const scrollMem = {};

  function route() {
    const h = location.hash.replace(/^#/, "") || "home";
    if (current !== null) {
      scrollMem[current] = window.scrollY;
      if (current.startsWith("quiz-") && quizRun && quizRun.done) quizRun = null;
      if (current === "cards" && cardRun && cardRun.done) cardRun = null;
    }
    current = h;
    const v = resolve(h);
    app.innerHTML = v.html();
    document.querySelectorAll(".tab").forEach((t) => {
      if (t.dataset.tab === v.tab) t.setAttribute("aria-current", "page");
      else t.removeAttribute("aria-current");
    });
    const y = !v.lesson && !v.top && scrollMem[h] ? scrollMem[h] : 0;
    window.scrollTo(0, y);
    updateReadbar();
    drawFigures();
  }

  function rerender(keepScroll = true) {
    const y = window.scrollY;
    app.innerHTML = resolve(current).html();
    window.scrollTo(0, keepScroll ? y : 0);
    updateReadbar();
    drawFigures();
  }

  /* ---------------------------------------------------------------- home */
  function slotHTML(m) {
    const d = modDone(m);
    const n = m.lessons.length;
    const full = d === n;
    return `<a class="slot${full ? " is-done" : ""}" href="#${m.id}" aria-label="Module ${m.code}, ${esc(m.short)}: ${d} of ${n} lessons learned">
      <span class="slot-code">${m.code}</span>
      <span class="slot-name">${esc(m.short)}</span>
      ${full ? '<span class="stamp">Written</span>' : `<span class="slot-prog">${d}/${n}</span>`}
    </a>`;
  }
  function finalSlotHTML() {
    const best = S.final;
    const signed = best !== null && best >= 8;
    return `<a class="slot${signed ? " is-done" : ""}" href="#quiz-quick" aria-label="Final: quick-fire quiz${best !== null ? `, best ${best} of 10` : ""}">
      <span class="slot-code">Final</span>
      <span class="slot-name">Quick-fire</span>
      ${signed ? '<span class="stamp">Signed</span>' : `<span class="slot-prog">${best !== null ? `Best ${best}/10` : "8/10 signs"}</span>`}
    </a>`;
  }

  function viewHome() {
    const total = LESSONS.length;
    const done = LESSONS.filter((l) => S.done[l.id]).length;
    const line = total ? (done / total) * 100 : 0;
    const next = nextLesson();
    const acc = S.qa.n ? `${Math.round((S.qa.c / S.qa.n) * 100)}%` : "–";
    const dayNum = Math.floor((Date.now() - new Date().getTimezoneOffset() * 60000) / 86400000);
    const term = GLOSSARY[dayNum % GLOSSARY.length];
    const termMod = MOD[term.mod];

    let nextHTML;
    if (next) {
      const m = next.module;
      nextHTML = `<div class="panel">
        <p class="row-meta">Module ${m.code} · ${esc(m.title)} · Lesson ${next.num} of ${m.lessons.length}</p>
        <h3>${esc(next.title)}</h3>
        <p>${next.minutes} minute read${done === 0 ? ". Start here: the course runs in order, but you can jump to any module." : "."}</p>
        <a class="btn block" href="#${next.id}">${done === 0 ? "Start the first lesson" : "Continue"}</a>
      </div>`;
    } else {
      nextHTML = `<div class="panel">
        <p class="row-meta">All ${total} lessons learned</p>
        <h3>Your slip is fully written.</h3>
        <p>Keep it fresh with flashcards, or go for 8 out of 10 on the quick-fire quiz to sign the final box.</p>
        <div class="btn-row"><a class="btn" href="#quiz-quick">Quick-fire</a><a class="btn quiet" href="#cards">Flashcards</a></div>
      </div>`;
    }

    return spread(`${mast({
      kicker: "London Market insurance",
      title: "The Slip",
      sub: "A pocket course in how the world’s specialist insurance market works.",
      tall: true
    })}
    <div class="wrap stack pull">
      <section class="slip" aria-label="Your progress">
        <div class="slip-head"><span>UMR B0000LMI${new Date().getFullYear()}</span><span>Study slip</span></div>
        <dl class="slip-meta">
          <div><dt>Insured</dt><dd>You</dd></div>
          <div><dt>Interest</dt><dd>Knowledge of the London Market</dd></div>
          <div><dt>Line written</dt><dd class="mono">${pct(line)}</dd></div>
        </dl>
        <div class="slots">${MODULES.map(slotHTML).join("")}${finalSlotHTML()}</div>
        <div class="linebar"><div class="track"><span style="width:${line}%"></span></div><b>${done}/${total}</b></div>
        <p class="slip-caption">In London, a risk is written on a slip and each underwriter stamps their share. This slip is your course: learn every lesson in a module and its box gets stamped.</p>
      </section>
    </div>`, `<div class="wrap stack">
      <section class="section"><h2 class="section-title">Up next</h2>${nextHTML}</section>

      <section class="section"><h2 class="section-title">Your record</h2>
        <div class="group stats">
          <div class="stat"><b>${done}</b><span>lessons learned</span></div>
          <div class="stat"><b>${acc}</b><span>quiz answers right</span></div>
          <div class="stat"><b>${streak()}</b><span>day streak</span></div>
        </div>
      </section>

      <section class="section"><h2 class="section-title">Term of the day</h2>
        <div class="term-card">
          <h3>${esc(term.term)}</h3>
          <p>${esc(term.def)}</p>
          <div><a class="textlink" href="#${termMod.id}">Module ${termMod.code}: ${esc(termMod.title)}</a></div>
        </div>
      </section>

      <section class="section"><h2 class="section-title">Practice</h2>
        <div class="group">
          <a class="row" href="#quiz-quick" style="--sep:70px"><span class="code-badge">${icon("bolt")}</span><span class="row-main"><span class="row-title">Quick-fire quiz</span><span class="row-sub">10 random questions from every module</span></span>${chev}</a>
          <a class="row" href="#cards" style="--sep:70px"><span class="code-badge">${icon("cards")}</span><span class="row-main"><span class="row-title">Flashcards</span><span class="row-sub">${GLOSSARY.length} terms, spaced for review</span></span>${chev}</a>
        </div>
      </section>

      <section class="section"><h2 class="section-title">Reading</h2>
        <div class="group textsize" role="group" aria-label="Lesson text size">
          ${[["s", "Smaller"], ["m", "Standard"], ["l", "Larger"], ["xl", "Largest"]].map(([k, t]) => `<button type="button" data-act="textsize" data-size="${k}" aria-pressed="${(S.text || "m") === k}"><span class="ts-${k}">Aa</span><small>${t}</small></button>`).join("")}
        </div>
        <p class="section-foot">Changes the size of lesson text. The app also uses your iPhone’s own font, San Francisco.</p>
      </section>

      <section class="section about">
        <p>Your progress is saved on this device only.</p>
        <p>The Slip is a learning aid, not legal or professional advice. Market practice and rules change, so check current sources before relying on a detail at work.</p>
        <button class="btn danger block" type="button" data-act="reset">Reset progress</button>
      </section>
    </div>`);
  }

  /* ---------------------------------------------------------------- learn */
  function viewLearn() {
    const rowOf = (m) => {
      const d = modDone(m);
      const n = m.lessons.length;
      const q = S.quiz[m.id];
      return `<a class="row" href="#${m.id}" style="--sep:70px">
        <span class="code-badge${d === n ? " done" : ""}">${m.code}</span>
        <span class="row-main">
          <span class="row-title">${esc(m.title)}</span>
          <span class="row-sub">${esc(m.blurb)}</span>
          <span class="row-meta">${d} of ${n} lessons${q ? ` · Quiz best ${q.best}/${q.total}` : ""}</span>
          <span class="minibar"><span style="width:${(d / n) * 100}%"></span></span>
        </span>${chev}
      </a>`;
    };
    const parts = PARTS.filter((p) => p.modules.length).map((p) => `<section class="section">
        <h2 class="section-title">Part ${p.num} · ${esc(p.title)}</h2>
        <div class="group">${p.modules.map(rowOf).join("")}</div>
      </section>`).join("");
    const mins = LESSONS.reduce((a, l) => a + l.minutes, 0);
    return spread(`${mast({
      kicker: `${MODULES.length} modules · ${LESSONS.length} lessons · about ${Math.round(mins / 60)} hours`,
      title: "Learn",
      sub: "The course is arranged in parts, from how the market works to running an insurance business. Work through it in order, or go straight to what you need.",
      extra: mapBtn("map", "Course map")
    })}`, `<div class="wrap stack">${parts}</div>`, true);
  }

  function viewModule(m) {
    const mins = m.lessons.reduce((a, l) => a + l.minutes, 0);
    const q = S.quiz[m.id];
    const nextMod = MODULES[MODULES.indexOf(m) + 1];
    const rows = m.lessons.map((l) => {
      const done = !!S.done[l.id];
      return `<a class="row" href="#${l.id}" style="--sep:56px">
        <span class="check${done ? " done" : ""}">${done ? icon("check") : l.num}</span>
        <span class="row-main"><span class="row-title">${esc(l.title)}</span><span class="row-meta">${l.minutes} min read${done ? " · learned" : ""}</span></span>${chev}
      </a>`;
    }).join("");
    return spread(`${mast({
      back: "learn",
      backLabel: "Learn",
      kicker: `Part ${m.part.num} · Module ${m.code} · ${m.lessons.length} lessons · ${mins} min`,
      title: esc(m.title),
      sub: esc(m.blurb),
      extra: `<span class="cover-mark spread-only" aria-hidden="true">${m.code}</span>${mapBtn(`map-${m.id}`, "Mind map")}`
    })}`, `<div class="wrap stack">
      ${m.outcomes ? `<section class="section"><h2 class="section-title">Learning outcomes</h2><div class="outcomes"><p>By the end of this module you should be able to:</p><ul>${m.outcomes.map((o) => `<li>${fmt(o)}</li>`).join("")}</ul></div></section>` : ""}
      <section class="section"><h2 class="section-title">Lessons</h2><div class="group">${rows}</div></section>
      <section class="section"><h2 class="section-title">Check yourself</h2>
        <div class="group"><a class="row" href="#quiz-${m.id}" style="--sep:70px">
          <span class="code-badge">${icon("practice")}</span>
          <span class="row-main"><span class="row-title">Module quiz</span><span class="row-sub">${m.quiz.length} questions${q ? ` · best ${q.best}/${q.total}` : " · pass mark 80%"}</span></span>
          ${q && q.best / q.total >= 0.8 ? '<span class="chip good">Passed</span>' : ""}${chev}
        </a></div>
      </section>
      ${nextMod ? `<section class="section"><h2 class="section-title">Next module</h2><div class="group"><a class="row" href="#${nextMod.id}" style="--sep:70px"><span class="code-badge">${nextMod.code}</span><span class="row-main"><span class="row-title">${esc(nextMod.title)}</span><span class="row-sub">${esc(nextMod.blurb)}</span></span>${chev}</a></div></section>` : ""}
    </div>`, true);
  }

  /* ---------------------------------------------------------------- lesson */
  function block(b) {
    if (typeof b === "string") return `<p>${fmt(b)}</p>`;
    if (b.fig) return `<div class="fig-inline">${figureHTML(b.fig)}</div>`;
    if (b.h) return `<h2>${fmt(b.h)}</h2>`;
    if (b.ul) return `<ul>${b.ul.map((x) => `<li>${fmt(x)}</li>`).join("")}</ul>`;
    if (b.ol) return `<ol>${b.ol.map((x) => `<li><span>${fmt(x)}</span></li>`).join("")}</ol>`;
    if (b.terms) return `<dl class="terms">${b.terms.map(([t, d]) => `<div><dt>${fmt(t)}</dt><dd>${fmt(d)}</dd></div>`).join("")}</dl>`;
    if (b.analogy) return `<aside class="callout analogy"><div class="callout-label"><span class="glyph" aria-hidden="true">≈</span>Think of it like this</div><p>${fmt(b.analogy)}</p></aside>`;
    if (b.example) return `<aside class="callout example"><div class="callout-label">${esc(b.example.title || "Worked example")}</div><p>${fmt(b.example.text)}</p></aside>`;
    if (b.note) return `<aside class="callout note"><div class="callout-label">In practice</div><p>${fmt(b.note)}</p></aside>`;
    if (b.aware) return `<aside class="callout aware"><div class="callout-label">Be aware</div><p>${fmt(b.aware)}</p></aside>`;
    if (b.think) {
      return `<details class="callout think"><summary><span class="callout-label">Consider this</span><span class="think-q">${fmt(b.think.q)}</span><span class="think-cta">Show the answer</span></summary><p>${fmt(b.think.a)}</p></details>`;
    }
    if (b.table) {
      const { head, rows } = b.table;
      return `<div class="table-wrap"><table><thead><tr>${head.map((h) => `<th scope="col">${fmt(h)}</th>`).join("")}</tr></thead><tbody>${rows
        .map((r) => `<tr>${r.map((c) => `<td>${fmt(c)}</td>`).join("")}</tr>`)
        .join("")}</tbody></table></div>`;
    }
    if (b.timeline) return `<ul class="timeline">${b.timeline.map(([y, t]) => `<li><b>${esc(y)}</b><span>${fmt(t)}</span></li>`).join("")}</ul>`;
    if (b.chain) {
      return `<div class="chain" role="list">${b.chain
        .map(([t, d], i) => `${i ? '<span class="chain-joint" aria-hidden="true"></span>' : ""}<div class="chain-link" role="listitem"><span class="n">${i + 1}</span><div><h4>${fmt(t)}</h4><p>${fmt(d)}</p></div></div>`)
        .join("")}</div>`;
    }
    if (b.lab) {
      const ico = { slip: "slip", tower: "tower", ratio: "ratio" }[b.lab];
      return `<a class="lab-link" href="#lab-${b.lab}"><span class="ico">${icon(ico)}</span><span>${fmt(b.text)}</span>${chev}</a>`;
    }
    return "";
  }


  /* ---------------------------------------------------------------- figures */
  const FIGS = DATA.figures || {};
  const FIGNUM = {};
  MODULES.forEach((m) => {
    let n = 0;
    m.lessons.forEach((l) => l.body.forEach((b) => {
      if (b && b.fig && FIGS[b.fig]) FIGNUM[b.fig] = `${parseInt(m.code, 10)}.${++n}`;
    }));
  });

  const legendHTML = (items) =>
    items ? `<div class="fig-legend">${items.map(([tone, t]) => `<span><i class="sw s-${tone}"></i>${esc(t)}</span>`).join("")}</div>` : "";

  function nodeHTML(n, i, spec) {
    const [r, c] = n.at;
    const s = n.span || 1;
    const [rn, cn] = n.atN || n.at;
    const sn = n.spanN || s;
    return `<div class="node tone-${n.tone || "plain"}" data-id="${n.id}" style="--r:${r};--c:${c};--s:${s};--rn:${rn};--cn:${cn};--sn:${sn}">${spec.steps ? `<span class="step">${i + 1}</span>` : ""}<b>${esc(n.label)}</b>${n.sub ? `<span>${esc(n.sub)}</span>` : ""}</div>`;
  }

  function figBody(id, spec) {
    if (spec.type === "graph") {
      return `<div class="fig" data-fig="${id}"><svg class="edges" aria-hidden="true"></svg><div class="graph" style="--cols:${spec.cols};--cols-n:${spec.colsN || spec.cols}${spec.gap ? `;--gy:${spec.gap}px` : ""}">${spec.nodes.map((n, i) => nodeHTML(n, i, spec)).join("")}</div><div class="edge-labels" aria-hidden="true"></div></div>`;
    }
    if (spec.type === "bars") {
      const last = spec.rows.length - 1;
      const rows = spec.rows.map((r, ri) => `<div class="bars-row">
        <div class="bars-head"><b>${esc(r.label)}</b><span>${esc(r.total)}</span></div>
        <div class="bars-track"><div class="bars-fill">${r.segs.map(([v, t, tone]) => `<span class="seg s-${tone}" style="width:${(v / spec.scale) * 100}%"><em>${esc(t)}</em></span>`).join("")}</div>${spec.mark ? `<i class="bars-mark" style="left:${(spec.mark[0] / spec.scale) * 100}%">${ri === last ? `<em>${esc(spec.mark[1])}</em>` : ""}</i>` : ""}</div>
      </div>`).join("");
      const ticks = spec.ticks ? `<div class="bars-ticks" aria-hidden="true">${spec.ticks.map((t) => `<span style="left:${(t / spec.scale) * 100}%">${esc(`${spec.prefix || ""}${t}${spec.suffix || ""}`)}</span>`).join("")}</div>` : "";
      return `<div class="fig bars${spec.mark ? " has-mark" : ""}">${rows}${ticks}</div>${legendHTML(spec.legend)}`;
    }
    if (spec.type === "stack") return stackBody(spec);
    if (spec.type === "waterfall") return waterfallBody(spec);
    if (spec.type === "line") return lineBody(spec);
    if (spec.type === "quadrant") return quadrantBody(spec);
    if (spec.type === "timeline") {
      const x = (v) => ((v - spec.from) / (spec.to - spec.from)) * 100;
      const rows = spec.rows.map((r) => {
        if (r.group) return `<div class="tl-group">${esc(r.group)}</div>`;
        const start = Math.min(...r.segs.map((g) => g[0]));
        const end = Math.max(...r.segs.map((g) => g[1]));
        return `<div class="tl-row"><span class="tl-label">${esc(r.label)}</span><div class="tl-track"><div class="tl-bar" data-id="${r.id}" style="left:${x(start)}%;width:${x(end) - x(start)}%">${r.segs
          .map(([a, b, tone, t]) => `<span class="seg s-${tone}" style="flex:${b - a}">${t ? `<em>${esc(t)}</em>` : ""}</span>`)
          .join("")}</div></div></div>`;
      }).join("");
      const ticks = spec.ticks.map((t, i) => `<span style="left:${x(t)}%">${esc(spec.tickLabels ? spec.tickLabels[i] : t)}</span>`).join("");
      const markers = (spec.markers || []).map(([at, t]) => `<i class="tl-marker" style="left:${x(at)}%"><em>${esc(t)}</em></i>`).join("");
      return `<div class="fig tl${markers ? " has-markers" : ""}" data-fig="${id}"><svg class="edges" aria-hidden="true"></svg>
        <div class="tl-body">${markers ? `<div class="tl-markers" aria-hidden="true">${markers}</div>` : ""}${rows}<div class="tl-row tl-axis"><span class="tl-label"></span><div class="tl-track">${ticks}</div></div></div>
        <div class="edge-labels" aria-hidden="true"></div></div>${legendHTML(spec.legend)}`;
    }
    return "";
  }

  const SERIES = { c1: "var(--c1)", c2: "var(--c2)", c3: "var(--c3)", c4: "var(--c4)", neutral: "var(--ink-3)", ink: "var(--ink-2)" };

  /* a tower of layers, drawn to scale (or as equal bands) */
  function stackBody(spec) {
    if (spec.equal) {
      return `<div class="fig stk-eq">${spec.layers.slice().reverse().map((L) => `<div class="stk-band s-${L.tone || "c1"}"><b>${esc(L.label)}</b>${L.sub ? `<span>${esc(L.sub)}</span>` : ""}</div>`).join("")}</div>`;
    }
    const y = (v) => (v / spec.max) * 100;
    const tick = (t) => `${spec.prefix || ""}${t}${spec.suffix || ""}`;
    return `<div class="fig stk">
      <div class="stk-axis" aria-hidden="true">${spec.ticks.map((t) => `<span style="bottom:${y(t)}%">${esc(tick(t))}</span>`).join("")}</div>
      <div class="stk-bar" aria-hidden="true">${spec.layers.map((L) => `<div class="stk-layer s-${L.tone || "c1"}" style="bottom:${y(L.from)}%;height:${y(L.to - L.from)}%"></div>`).join("")}</div>
      <div class="stk-labels">${spec.layers.map((L) => `<div class="stk-label" style="bottom:${y((L.from + L.to) / 2)}%"><b>${esc(L.label)}</b>${L.sub ? `<span>${esc(L.sub)}</span>` : ""}</div>`).join("")}</div>
    </div>`;
  }

  /* horizontal waterfall: cumulative steps, or diverging bars from zero */
  function waterfallBody(spec) {
    let run = 0;
    const rows = spec.steps.map((st) => {
      let a, b, v;
      if (spec.diverging) { v = st.value; a = Math.min(0, v); b = Math.max(0, v); }
      else if (st.total) { if (st.value !== undefined) run = st.value; v = run; a = Math.min(0, run); b = Math.max(0, run); }
      else { v = st.value; a = Math.min(run, run + v); b = Math.max(run, run + v); run += v; }
      return { st, a, b, v };
    });
    const lo = Math.min(0, ...rows.map((r) => r.a)) * 1.35;
    const hi = Math.max(0, ...rows.map((r) => r.b)) * 1.24;
    const span = hi - lo || 1;
    const pos = (v) => ((v - lo) / span) * 100;
    const show = (v, total) => {
      const a = Math.abs(v);
      const n = spec.dp !== undefined ? a.toFixed(spec.dp) : Number.isInteger(a) ? String(a) : a.toFixed(1);
      const sign = v < 0 ? "−" : total ? "" : "+";
      return `${sign}${spec.prefix || ""}${n}${spec.suffix || ""}`;
    };
    const body = rows.map(({ st, a, b, v }) => {
      const tone = st.total ? "total" : v < 0 ? "down" : "up";
      const neg = spec.diverging && v < 0;
      const inside = !neg && pos(b) > 70 && pos(b) - pos(a) > 24;
      return `<div class="wf-row"><span class="wf-label">${esc(st.label)}</span><div class="wf-track">${spec.diverging ? `<i class="wf-zero" style="left:${f1(pos(0))}%"></i>` : ""}<span class="wf-bar wf-${tone}" style="left:${f1(pos(a))}%;width:${f1(Math.max(0.8, pos(b) - pos(a)))}%" title="${esc(st.label)}: ${show(v, st.total)}"></span><em class="wf-val${neg ? " neg" : ""}${inside ? ` in on-${tone}` : ""}" style="left:${f1(neg ? pos(a) : pos(b))}%">${show(v, st.total)}</em></div>${st.note ? `<span class="wf-note">${esc(st.note)}</span>` : ""}</div>`;
    }).join("");
    const legend = spec.legend === false ? "" : legendHTML(spec.legend || (spec.diverging ? [["c1", "Profit"], ["c2", "Loss"]] : [["c1", "Adds"], ["c2", "Takes away"], ["total", "Total"]]));
    return `<div class="fig wf">${body}</div>${legend}`;
  }

  /* line chart drawn to scale in SVG, with optional log x-axis, bands, reference lines and marked points */
  function lineBody(spec) {
    const W = 360, H = spec.height || 220;
    const X0 = 42, X1 = W - (spec.padRight || 18), Y0 = H - 34, Y1 = 18;
    const lg = Math.log;
    const xs = spec.x.log
      ? (v) => X0 + ((lg(v) - lg(spec.x.min)) / (lg(spec.x.max) - lg(spec.x.min))) * (X1 - X0)
      : (v) => X0 + ((v - spec.x.min) / (spec.x.max - spec.x.min)) * (X1 - X0);
    const ys = (v) => Y0 - ((v - spec.y.min) / (spec.y.max - spec.y.min)) * (Y0 - Y1);
    const lab = (ax, v, i) => (ax.labels && i >= 0 ? ax.labels[i] : `${ax.prefix || ""}${v}${ax.suffix || ""}`);
    let g = "";
    (spec.bands || []).forEach((b) => {
      g += `<rect class="ch-band" x="${X0}" y="${f1(ys(b.to))}" width="${X1 - X0}" height="${f1(ys(b.from) - ys(b.to))}" style="fill:${SERIES[b.tone || "c1"]}"/>`;
      if (b.label) g += `<text class="ch-sub" x="${X0 + 6}" y="${f1(ys(b.to) + 13)}">${esc(b.label)}</text>`;
    });
    spec.y.ticks.forEach((v, i) => {
      g += `<line class="ch-grid" x1="${X0}" x2="${X1}" y1="${f1(ys(v))}" y2="${f1(ys(v))}"/><text class="ch-tick" x="${X0 - 6}" y="${f1(ys(v) + 3.5)}" text-anchor="end">${esc(lab(spec.y, v, i))}</text>`;
    });
    g += `<line class="ch-axis" x1="${X0}" x2="${X1}" y1="${Y0}" y2="${Y0}"/>`;
    spec.x.ticks.forEach((v, i) => {
      g += `<text class="ch-tick" x="${f1(xs(v))}" y="${Y0 + 15}" text-anchor="middle">${esc(lab(spec.x, v, i))}</text>`;
    });
    if (spec.x.title) g += `<text class="ch-title" x="${(X0 + X1) / 2}" y="${H - 4}" text-anchor="middle">${esc(spec.x.title)}</text>`;
    if (spec.y.title) g += `<text class="ch-title" x="4" y="${Y1 - 7}">${esc(spec.y.title)}</text>`;
    (spec.refs || []).forEach((r) => {
      if (r.y !== undefined) g += `<line class="ch-ref" x1="${X0}" x2="${X1}" y1="${f1(ys(r.y))}" y2="${f1(ys(r.y))}"/><text class="ch-sub" x="${r.align === "start" ? X0 + 6 : X1}" y="${f1(ys(r.y) - 5)}" text-anchor="${r.align === "start" ? "start" : "end"}">${esc(r.label)}</text>`;
      if (r.x !== undefined) g += `<line class="ch-ref" x1="${f1(xs(r.x))}" x2="${f1(xs(r.x))}" y1="${Y1}" y2="${Y0}"/><text class="ch-sub" x="${f1(xs(r.x) + 4)}" y="${Y1 + 9}">${esc(r.label)}</text>`;
    });
    spec.series.forEach((sr) => {
      const col = SERIES[sr.tone || "c1"];
      const d = sr.points.map(([x, y], i) => `${i ? "L" : "M"}${f1(xs(x))} ${f1(ys(y))}`).join("");
      g += `<path class="ch-line" d="${d}" style="stroke:${col}${sr.dash ? ";stroke-dasharray:5 4" : ""}"/>`;
      sr.points.forEach(([x, y]) => {
        g += `<circle cx="${f1(xs(x))}" cy="${f1(ys(y))}" r="9" fill="transparent"><title>${esc(sr.name)} · ${esc(lab(spec.x, x, spec.x.ticks.indexOf(x)))}: ${esc(`${spec.y.prefix || ""}${y}${spec.y.suffix || ""}`)}</title></circle>`;
      });
      if (sr.endLabel) {
        const [x, y] = sr.points[sr.points.length - 1];
        g += `<text class="ch-lab" x="${f1(xs(x) + 6)}" y="${f1(ys(y) + (sr.endDy || 4))}">${esc(sr.endLabel)}</text>`;
      }
    });
    (spec.marks || []).forEach((mk) => {
      const cx = xs(mk.x), cy = ys(mk.y);
      g += `<circle class="ch-dot" cx="${f1(cx)}" cy="${f1(cy)}" r="4.5" style="fill:${SERIES[mk.tone || "c1"]}"/>`;
      if (mk.label) g += `<text class="ch-lab" x="${f1(cx + (mk.dx === undefined ? 8 : mk.dx))}" y="${f1(cy + (mk.dy === undefined ? -8 : mk.dy))}" text-anchor="${mk.anchor || "start"}">${esc(mk.label)}</text>`;
    });
    const legend = spec.series.length > 1 ? legendHTML(spec.series.map((sr) => [sr.tone || "c1", sr.name])) : "";
    return `<div class="fig chart"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(spec.title)}">${g}</svg></div>${legend}`;
  }

  /* 2 x 2 matrix with plotted segments */
  function quadrantBody(spec) {
    const W = 360, H = 276;
    const X0 = 42, X1 = W - 14, Y0 = H - 34, Y1 = 22;
    const xs = (v) => X0 + ((v - spec.x.min) / (spec.x.max - spec.x.min)) * (X1 - X0);
    const ys = (v) => Y0 - ((v - spec.y.min) / (spec.y.max - spec.y.min)) * (Y0 - Y1);
    const cx = xs(spec.x.split), cy = ys(spec.y.split);
    let g = `<rect class="ch-quad" x="${X0}" y="${Y1}" width="${f1(cx - X0)}" height="${f1(cy - Y1)}"/>`;
    g += `<rect x="${X0}" y="${Y1}" width="${X1 - X0}" height="${Y0 - Y1}" fill="none" class="ch-axis"/>`;
    g += `<line class="ch-ref" x1="${f1(cx)}" x2="${f1(cx)}" y1="${Y1}" y2="${Y0}"/><line class="ch-ref" x1="${X0}" x2="${X1}" y1="${f1(cy)}" y2="${f1(cy)}"/>`;
    spec.x.ticks.forEach((v) => { g += `<text class="ch-tick" x="${f1(xs(v))}" y="${Y0 + 15}" text-anchor="middle">${v}${spec.x.suffix || ""}</text>`; });
    spec.y.ticks.forEach((v) => { g += `<text class="ch-tick" x="${X0 - 6}" y="${f1(ys(v) + 3.5)}" text-anchor="end">${v > 0 ? "+" : v < 0 ? "−" : ""}${Math.abs(v)}${spec.y.suffix || ""}</text>`; });
    g += `<text class="ch-title" x="${(X0 + X1) / 2}" y="${H - 4}" text-anchor="middle">${esc(spec.x.title)}</text><text class="ch-title" x="4" y="${Y1 - 4}" dy="-2">${esc(spec.y.title)}</text>`;
    const q = spec.quadrants;
    g += `<text class="ch-qlab" x="${X0 + 6}" y="${Y1 + 13}">${esc(q.tl)}</text><text class="ch-qlab" x="${X1 - 6}" y="${Y1 + 13}" text-anchor="end">${esc(q.tr)}</text><text class="ch-qlab" x="${X0 + 6}" y="${Y0 - 7}">${esc(q.bl)}</text><text class="ch-qlab" x="${X1 - 6}" y="${Y0 - 7}" text-anchor="end">${esc(q.br)}</text>`;
    spec.points.forEach((p) => {
      const px = xs(p.x), py = ys(p.y);
      g += `<circle class="ch-dot" cx="${f1(px)}" cy="${f1(py)}" r="5.5" style="fill:${SERIES[p.tone || "c1"]}"><title>${esc(p.label)}: ${p.x}${spec.x.suffix || ""} price adequacy, ${p.y > 0 ? "+" : ""}${p.y}${spec.y.suffix || ""} growth</title></circle>`;
      g += `<text class="ch-lab" x="${f1(px + (p.dx === undefined ? 9 : p.dx))}" y="${f1(py + (p.dy === undefined ? 4 : p.dy))}" text-anchor="${p.anchor || "start"}">${esc(p.label)}</text>`;
    });
    return `<div class="fig chart"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(spec.title)}">${g}</svg></div>`;
  }

  function figureHTML(id) {
    const spec = FIGS[id];
    if (!spec) return "";
    return `<figure class="figure"><div class="fig-head"><span>Figure ${FIGNUM[id] || ""}</span>${esc(spec.title)}</div>${figBody(id, spec)}<figcaption class="fig-caption">${esc(spec.caption)}</figcaption></figure>`;
  }

  /* arrows between boxes, measured after layout */
  const NORM = { t: [0, -1], b: [0, 1], l: [-1, 0], r: [1, 0] };
  const f1 = (v) => v.toFixed(1);
  function anchor(r, side, at) {
    const f = at === undefined ? 0.5 : at;
    if (side === "t") return [r.x + r.w * f, r.y];
    if (side === "b") return [r.x + r.w * f, r.y + r.h];
    if (side === "l") return [r.x, r.y + r.h * f];
    return [r.x + r.w, r.y + r.h * f];
  }
  function autoSides(a, b) {
    const hOver = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
    const vOver = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
    if (vOver > 0 && hOver <= 0) return b.x > a.x ? ["r", "l"] : ["l", "r"];
    return b.y > a.y ? ["b", "t"] : ["t", "b"];
  }
  function bezPoint(p0, c1, c2, p3, t) {
    const u = 1 - t;
    return [0, 1].map((i) => u * u * u * p0[i] + 3 * u * u * t * c1[i] + 3 * u * t * t * c2[i] + t * t * t * p3[i]);
  }
  function relBox(base, el) {
    const r = el.getBoundingClientRect();
    return { x: r.left - base.left, y: r.top - base.top, w: r.width, h: r.height };
  }

  function drawEdges(fig, spec) {
    const svg = fig.querySelector(":scope > svg.edges");
    const labels = fig.querySelector(":scope > .edge-labels");
    const W = fig.clientWidth;
    const H = fig.clientHeight;
    if (!svg || !W) return;
    const base = fig.getBoundingClientRect();
    const box = (id) => {
      const el = fig.querySelector(`[data-id="${id}"]`);
      return el ? relBox(base, el) : null;
    };
    let lines = "", heads = "", labs = "";
    (spec.edges || []).forEach((e) => {
      const a = box(e.from), b = box(e.to);
      if (!a || !b) return;
      const auto = autoSides(a, b);
      const fs = e.fromSide || auto[0];
      const ts = e.toSide || auto[1];
      const p0 = anchor(a, fs, e.fromAt);
      const p3 = anchor(b, ts, e.toAt);
      const ca = [a.x + a.w / 2, a.y + a.h / 2], cb = [b.x + b.w / 2, b.y + b.h / 2];
      const dd = Math.hypot(cb[0] - ca[0], cb[1] - ca[1]) || 1;
      const perp = [-(cb[1] - ca[1]) / dd, (cb[0] - ca[0]) / dd];
      if (e.bend) {
        const sg = Math.sign(e.bend);
        const shift = (side, r, p) => {
          if (side === "t" || side === "b") p[0] += Math.sign(perp[0] * sg) * Math.min(22, r.w * 0.18);
          else p[1] += Math.sign(perp[1] * sg) * Math.min(22, r.h * 0.18);
        };
        if (e.fromAt === undefined) shift(fs, a, p0);
        if (e.toAt === undefined) shift(ts, b, p3);
      }
      const dist = Math.hypot(p3[0] - p0[0], p3[1] - p0[1]) || 1;
      const k = Math.max(12, Math.min(46, dist * 0.42));
      const c1 = [p0[0] + NORM[fs][0] * k, p0[1] + NORM[fs][1] * k];
      const c2 = [p3[0] + NORM[ts][0] * k, p3[1] + NORM[ts][1] * k];
      if (e.bend) {
        c1[0] += perp[0] * e.bend; c1[1] += perp[1] * e.bend;
        c2[0] += perp[0] * e.bend; c2[1] += perp[1] * e.bend;
      }
      const tx = p3[0] - c2[0], ty = p3[1] - c2[1];
      const tl = Math.hypot(tx, ty) || 1;
      const ux = tx / tl, uy = ty / tl;
      const end = [p3[0] - ux * 7, p3[1] - uy * 7];
      const cls = `${e.tone ? `t-${e.tone}` : ""}${e.dash ? " dash" : ""}`;
      lines += `<path class="${cls}" d="M${f1(p0[0])} ${f1(p0[1])}C${f1(c1[0])} ${f1(c1[1])} ${f1(c2[0])} ${f1(c2[1])} ${f1(end[0])} ${f1(end[1])}"/>`;
      heads += `<polygon class="${e.tone ? `t-${e.tone}` : ""}" points="${f1(p3[0])},${f1(p3[1])} ${f1(end[0] - uy * 4.5)},${f1(end[1] + ux * 4.5)} ${f1(end[0] + uy * 4.5)},${f1(end[1] - ux * 4.5)}"/>`;
      if (e.label) {
        const m = bezPoint(p0, c1, c2, p3, 0.5);
        labs += `<span class="edge-label${e.tone ? ` t-${e.tone}` : ""}" style="left:${f1(m[0])}px;top:${f1(m[1])}px">${esc(e.label)}</span>`;
      }
    });
    svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
    svg.setAttribute("width", W);
    svg.setAttribute("height", H);
    svg.innerHTML = lines + heads;
    if (labels) labels.innerHTML = labs;
  }

  /* ---------------------------------------------------------------- mind maps */
  const HUES = ["var(--tint)", "var(--brass)", "var(--stamp)", "var(--good)"];

  function keyTerms(l) {
    if (l.keys) return l.keys;
    const out = [];
    const add = (raw) => {
      const t = raw.replace(/[.:,]$/, "").trim();
      if (t.length > 2 && t.length <= 30 && !out.some((o) => o.toLowerCase() === t.toLowerCase())) out.push(t);
    };
    const scan = (str) => (str.match(/\*\*(.+?)\*\*/g) || []).forEach((m) => add(m.slice(2, -2)));
    l.body.forEach((b) => {
      if (typeof b === "string") scan(b);
      else if (b.terms) b.terms.forEach(([t]) => add(t));
      else if (b.ul) b.ul.forEach(scan);
    });
    return out.slice(0, 4);
  }

  function mindmapHTML(root, items) {
    return `<div class="fig mm" data-kind="mm">
      <svg class="edges" aria-hidden="true"></svg>
      <div class="mm-grid">
        <div class="mm-root"><span>${root.kicker}</span><b>${root.title}</b></div>
        ${items.map((it, k) => `<a class="mm-node ${k % 2 === 0 ? "mm-r" : "mm-l"}${it.done ? " done" : ""}" href="#${it.href}" style="--kr:${k + 1};--kc:${k % 2 === 0 ? 2 : 1};--hue:${HUES[k % HUES.length]}">
          <span class="mm-top"><span class="mm-num">${it.num}</span><span class="mm-meta">${it.meta}</span></span>
          <b>${esc(it.title)}</b>
          ${it.chips.length ? `<span class="mm-chips">${it.chips.map((c) => `<i>${esc(c)}</i>`).join("")}</span>` : ""}
        </a>`).join("")}
      </div>
    </div>`;
  }

  function drawMindmap(fig) {
    const svg = fig.querySelector(":scope > svg.edges");
    const W = fig.clientWidth;
    const H = fig.clientHeight;
    const grid = fig.querySelector(".mm-grid");
    if (!svg || !W || !grid) return;
    const base = fig.getBoundingClientRect();
    const wide = getComputedStyle(grid).gridTemplateColumns.trim().split(/\s+/).length > 1;
    const root = relBox(base, fig.querySelector(".mm-root"));
    const nodes = [...fig.querySelectorAll(".mm-node")].map((el) => ({ r: relBox(base, el), hue: el.style.getPropertyValue("--hue") }));
    if (!nodes.length) return;
    const tx = wide ? W / 2 : 14;
    const rootY = root.y + root.h / 2;
    const top = wide ? rootY : root.y + root.h;
    let branches = "";
    let yLast = top;
    nodes.forEach((n) => {
      const yc = n.r.y + 24;
      const onLeft = n.r.x + n.r.w / 2 < tx;
      const ex = wide && onLeft ? n.r.x + n.r.w : n.r.x;
      const ys = yc - (wide ? 20 : 12);
      const dx = ex - tx;
      branches += `<path class="mm-branch" style="stroke:${n.hue}" d="M${f1(tx)} ${f1(ys)}C${f1(tx + dx * 0.55)} ${f1(ys)} ${f1(ex - dx * 0.45)} ${f1(yc)} ${f1(ex)} ${f1(yc)}"/><circle class="mm-tip" style="fill:${n.hue}" cx="${f1(ex)}" cy="${f1(yc)}" r="3.5"/>`;
      yLast = Math.max(yLast, ys);
    });
    let trunk = `<path class="mm-trunk" d="M${f1(tx)} ${f1(top)}L${f1(tx)} ${f1(yLast)}"/>`;
    if (wide) trunk += `<path class="mm-trunk" d="M${f1(root.x + root.w)} ${f1(rootY)}L${f1(tx)} ${f1(rootY)}"/>`;
    svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
    svg.setAttribute("width", W);
    svg.setAttribute("height", H);
    svg.innerHTML = `${trunk}${branches}<circle class="mm-dot" cx="${f1(tx)}" cy="${f1(top)}" r="5"/>`;
  }

  function viewMap(m) {
    let items, root, back, backLabel, kicker, title, sub, pager = "";
    if (m) {
      items = m.lessons.map((l) => ({
        href: l.id,
        num: l.num,
        title: l.title,
        meta: `${l.minutes} min${S.done[l.id] ? " · learned" : ""}`,
        chips: keyTerms(l),
        done: !!S.done[l.id]
      }));
      root = { kicker: `Module ${m.code}`, title: esc(m.title) };
      back = m.id;
      backLabel = `Module ${m.code}`;
      kicker = `Mind map · Module ${m.code}`;
      title = esc(m.title);
      sub = "Each branch is a lesson, with its key ideas. Tap a branch to open the lesson.";
      const i = MODULES.indexOf(m);
      const prev = MODULES[i - 1], next = MODULES[i + 1];
      pager = `<nav class="pager map-pager" aria-label="Other mind maps">
        ${prev ? `<a href="#map-${prev.id}"><small>Previous map</small><span>${esc(prev.title)}</span></a>` : ""}
        ${next ? `<a class="next-link" href="#map-${next.id}"><small>Next map</small><span>${esc(next.title)}</span></a>` : ""}
      </nav>`;
    } else {
      items = MODULES.map((mod) => ({
        href: `map-${mod.id}`,
        num: mod.code,
        title: mod.title,
        meta: `${modDone(mod)} of ${mod.lessons.length} lessons`,
        chips: mod.lessons.map((l) => keyTerms(l)[0]).filter(Boolean).slice(0, 5),
        done: modDone(mod) === mod.lessons.length
      }));
      root = { kicker: `${MODULES.length} modules`, title: "The London Market" };
      back = "learn";
      backLabel = "Learn";
      kicker = `Course map · ${MODULES.length} modules`;
      title = "Course map";
      sub = "The whole course on one page. Tap a module to open its mind map.";
    }
    return `<div class="mapview">${mast({ back, backLabel, kicker, title, sub })}
      <div class="wrap map-wrap">${mindmapHTML(root, items)}${pager}</div>
    </div>`;
  }

  /* draw (and redraw on fold, rotation or resize) every figure on screen */
  function drawFig(fig) {
    if (fig.dataset.kind === "mm") drawMindmap(fig);
    else if (FIGS[fig.dataset.fig]) drawEdges(fig, FIGS[fig.dataset.fig]);
  }
  const figObserver = "ResizeObserver" in window
    ? new ResizeObserver((entries) => entries.forEach((en) => drawFig(en.target)))
    : null;
  function drawFigures() {
    if (figObserver) figObserver.disconnect();
    document.querySelectorAll(".fig[data-fig], .fig[data-kind='mm']").forEach((f) => {
      drawFig(f);
      if (figObserver) figObserver.observe(f);
    });
  }
  if (!figObserver) window.addEventListener("resize", () => drawFigures());

  function completeHTML(l, animate) {
    const t = S.done[l.id];
    const m = l.module;
    if (!t) {
      return `<p>Finished reading? Mark it learned to stamp it on your slip.</p>
        <button class="btn block" type="button" data-act="complete" data-id="${l.id}">Mark as learned</button>`;
    }
    const nextInMod = m.lessons[l.num];
    const modComplete = modDone(m) === m.lessons.length;
    let action;
    if (nextInMod) action = `<a class="btn block" href="#${nextInMod.id}">Next: ${esc(nextInMod.title)}</a>`;
    else if (modComplete) action = `<a class="btn block" href="#quiz-${m.id}">Take the module ${m.code} quiz</a>`;
    else action = `<a class="btn block quiet" href="#${m.id}">Back to module ${m.code}</a>`;
    return `<div class="stamp-slot"><span class="stamp big${animate ? " animate" : ""}"><strong>Learned</strong><span>${m.code}.${l.num} · ${fmtDate(t)}</span></span></div>${action}`;
  }

  function viewLesson(l) {
    const m = l.module;
    const prev = LESSONS[l.order - 1];
    const next = LESSONS[l.order + 1];
    const figIds = l.body.filter((b) => b && b.fig && FIGS[b.fig]).map((b) => b.fig);
    const sideFigs = figIds.length ? `<div class="wrap side-figs spread-only">${figIds.map(figureHTML).join("")}</div>` : "";
    const outline = `<nav class="wrap outline spread-only" aria-label="Lessons in this module">
      <h2 class="section-title">In this module</h2>
      <div class="group">${m.lessons.map((x) => `<a class="row" href="#${x.id}" style="--sep:56px"${x === l ? ' aria-current="page"' : ""}><span class="check${S.done[x.id] ? " done" : ""}">${S.done[x.id] ? icon("check") : x.num}</span><span class="row-main"><span class="row-title">${esc(x.title)}</span><span class="row-meta">${x.minutes} min</span></span></a>`).join("")}<a class="row" href="#quiz-${m.id}" style="--sep:56px"><span class="check">Q</span><span class="row-main"><span class="row-title">Module quiz</span><span class="row-meta">${m.quiz.length} questions</span></span></a></div>
    </nav>`;
    return `<div class="readbar" id="readbar" aria-hidden="true"></div>
    ${spread(`${mast({
      back: m.id,
      backLabel: `Module ${m.code}`,
      kicker: `${esc(m.title)} · Lesson ${l.num} of ${m.lessons.length}`,
      title: esc(l.title),
      sub: `${l.minutes} minute read`,
      extra: `<div class="mast-progress"><span style="width:${(l.num / m.lessons.length) * 100}%"></span></div>`
    })}${sideFigs}${outline}`, `<article class="wrap">
      <div class="prose">${l.body.map(block).join("")}</div>
      <div class="stack">
        <section class="takeaways"><h3>Key points</h3><ul>${l.takeaways.map((t) => `<li>${icon("check")}<span>${fmt(t)}</span></li>`).join("")}</ul></section>
        <div class="complete" id="complete">${completeHTML(l, false)}</div>
        <nav class="pager" aria-label="Lessons">
          ${prev ? `<a href="#${prev.id}"><small>Previous</small><span>${esc(prev.title)}</span></a>` : ""}
          ${next ? `<a class="next-link" href="#${next.id}"><small>Next lesson</small><span>${esc(next.title)}</span></a>` : ""}
        </nav>
      </div>
    </article>`, sideFigs ? "has-figs" : false)}`;
  }

  let readTick = false;
  function updateReadbar() {
    const bar = document.getElementById("readbar");
    if (!bar) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 1;
    bar.style.transform = `scaleX(${p})`;
  }
  window.addEventListener("scroll", () => {
    if (readTick) return;
    readTick = true;
    requestAnimationFrame(() => { readTick = false; updateReadbar(); });
  }, { passive: true });

  /* ---------------------------------------------------------------- quizzes */
  let quizRun = null;
  MODULES.forEach((m) => m.quiz.forEach((q, i) => { q.qid = `${m.id}-q${i + 1}`; }));
  const ALL_Q = MODULES.flatMap((m) => m.quiz.map((q) => Object.assign({ m }, q)));

  function startQuiz(id) {
    let pool;
    if (id === "quick") pool = shuffle(ALL_Q).slice(0, 10);
    else if (id === "review") pool = shuffle(ALL_Q.filter((q) => S.missed[q.qid])).slice(0, 10);
    else pool = MOD[id].quiz.map((q) => Object.assign({ m: MOD[id] }, q));
    quizRun = {
      id,
      done: false,
      i: 0,
      items: pool.map((q) => ({ q, pick: null, opts: shuffle(q.options.map((t, i) => ({ t, ok: i === q.answer }))) }))
    };
  }

  function viewQuiz(id) {
    if (!quizRun || quizRun.id !== id) startQuiz(id);
    const r = quizRun;
    const quick = id === "quick" || id === "review";
    const m = quick ? null : MOD[id];
    const back = quick ? "practice" : m.id;
    const backLabel = quick ? "Practice" : `Module ${m.code}`;
    const title = id === "review" ? "Revise your mistakes" : quick ? "Quick-fire" : `${esc(m.title)} quiz`;
    if (!r.items.length) {
      return spread(`${mast({ back, backLabel, kicker: "Nothing to revise", title })}`, `<div class="wrap stack"><div class="panel"><h3>No mistakes to revise.</h3><p>Questions you answer wrongly in any quiz are collected here, and drop out once you answer them correctly.</p><a class="btn block" href="#quiz-quick">Try a quick-fire quiz</a></div></div>`, true);
    }
    const pips = `<div class="pips" aria-hidden="true">${r.items
      .map((it, i) => `<span class="pip${it.pick !== null ? (it.opts[it.pick].ok ? " ok" : " no") : i === r.i && !r.done ? " now" : ""}"></span>`)
      .join("")}</div>`;

    if (r.done) {
      const score = r.items.filter((it) => it.opts[it.pick].ok).length;
      const n = r.items.length;
      const passed = score / n >= 0.8;
      const review = r.items.map((it, i) => {
        const picked = it.opts[it.pick];
        const right = it.opts.find((o) => o.ok);
        return `<div class="review">
          <p class="rq">${i + 1}. ${esc(it.q.q)}</p>
          <p class="ra">${picked.ok ? `<b class="good">Right:</b> ${esc(right.t)}` : `<b class="bad">You said:</b> ${esc(picked.t)}<br><b class="good">Answer:</b> ${esc(right.t)}`}</p>
          <p class="ra">${esc(it.q.why)}</p>
        </div>`;
      }).join("");
      return spread(`${mast({ back, backLabel, kicker: "Result", title, extra: pips })}
      <div class="wrap stack">
        <div class="score">
          <div><b>${score}/${n}</b><small>${id === "review" ? (score === n ? "All corrected. These questions have left your revision list." : "Correct answers leave your revision list; the rest stay for next time.") : passed ? (quick ? "Passed. Your slip’s final box is signed." : "Passed. The pass mark is 80%.") : "The pass mark is 80%. Read the explanations below, then try again."}</small></div>
          ${passed && id !== "review" ? `<span class="stamp big animate"><strong>Passed</strong><span>${fmtDate(Date.now())}</span></span>` : ""}
        </div>
        <div class="btn-row"><button class="btn" type="button" data-act="retry">${quick ? "New questions" : "Try again"}</button><a class="btn quiet" href="#${back}">Done</a></div>
      </div>`, `<div class="wrap stack">
        <section class="section"><h2 class="section-title">Review your answers</h2><div class="group">${review}</div></section>
      </div>`);
    }

    const it = r.items[r.i];
    const answered = it.pick !== null;
    const opts = it.opts.map((o, i) => {
      let cls = "opt";
      if (answered) {
        if (o.ok) cls += " correct";
        else if (i === it.pick) cls += " wrong";
        else cls += " dim";
      }
      return `<button class="${cls}" type="button" data-act="answer" data-i="${i}"${answered ? " disabled" : ""}><span class="letter">${"ABCD"[i]}</span><span>${esc(o.t)}</span></button>`;
    }).join("");
    const fb = answered
      ? `<div class="feedback" id="fb">${it.opts[it.pick].ok ? '<b class="good">Correct</b>' : '<b class="bad">Not quite</b>'}<p>${esc(it.q.why)}</p></div>
         <button class="btn block" type="button" data-act="nextq">${r.i + 1 < r.items.length ? "Next question" : "See your result"}</button>`
      : "";
    return spread(`${mast({ back, backLabel, kicker: `Question ${r.i + 1} of ${r.items.length}`, title, extra: pips })}
    <div class="wrap stack">
      ${quick ? `<p class="q-from">Module ${it.q.m.code} · ${esc(it.q.m.title)}</p>` : ""}
      <h2 class="q-text">${esc(it.q.q)}</h2>
    </div>`, `<div class="wrap stack">
      <div class="opts">${opts}</div>
      ${fb}
    </div>`);
  }

  function finishQuiz() {
    const r = quizRun;
    r.done = true;
    const score = r.items.filter((it) => it.opts[it.pick].ok).length;
    if (r.id === "quick") {
      S.final = Math.max(S.final === null ? 0 : S.final, score);
    } else if (r.id === "review") {
      /* mistakes are updated answer by answer */
    } else {
      const prev = S.quiz[r.id];
      S.quiz[r.id] = { best: Math.max(prev ? prev.best : 0, score), total: r.items.length, last: score, at: Date.now() };
    }
    touch();
    save();
  }

  /* ---------------------------------------------------------------- practice */
  function deckCounts() {
    let fresh = 0, learning = 0, mastered = 0;
    GLOSSARY.forEach((g) => {
      const b = cardBox(g.id);
      if (b === null) fresh++;
      else if (b >= 3) mastered++;
      else learning++;
    });
    return { fresh, learning, mastered };
  }

  const missedCount = () => Object.keys(S.missed || {}).filter((k) => ALL_Q.some((q) => q.qid === k)).length;

  function viewPractice() {
    const dc = deckCounts();
    const rows = MODULES.map((m) => {
      const q = S.quiz[m.id];
      const passed = q && q.best / q.total >= 0.8;
      return `<a class="row" href="#quiz-${m.id}" style="--sep:70px">
        <span class="code-badge">${m.code}</span>
        <span class="row-main"><span class="row-title">${esc(m.title)}</span><span class="row-meta">${m.quiz.length} questions</span></span>
        ${q ? `<span class="chip${passed ? " good" : ""}">${q.best}/${q.total}</span>` : ""}${chev}
      </a>`;
    }).join("");
    return spread(`${mast({ kicker: "Quizzes and flashcards", title: "Practice", sub: "Test what you’ve read, then keep it fresh." })}
    <div class="wrap stack">
      <section class="section"><h2 class="section-title">Quick-fire</h2>
        <div class="panel">
          <p class="row-meta">10 random questions · ${ALL_Q.length} in the bank${S.final !== null ? ` · best ${S.final}/10` : ""}</p>
          <h3>Quick-fire quiz</h3>
          <p>Questions from every module, in a new order each time. Score 8 or more to sign the final box on your slip.</p>
          <a class="btn block" href="#quiz-quick">Start quick-fire</a>
        </div>
      </section>
      ${missedCount() ? `<section class="section"><h2 class="section-title">Revise your mistakes</h2>
        <div class="panel">
          <p class="row-meta">${missedCount()} question${missedCount() === 1 ? "" : "s"} to revise</p>
          <h3>Questions you got wrong</h3>
          <p>Up to ten of them at a time. Each one leaves the list once you answer it correctly.</p>
          <a class="btn block" href="#quiz-review">Revise now</a>
        </div>
      </section>` : ""}
      <section class="section"><h2 class="section-title">Flashcards</h2>
        <div class="group deck-stats stats">
          <div class="stat"><b>${dc.fresh}</b><span>new</span></div>
          <div class="stat"><b>${dc.learning}</b><span>learning</span></div>
          <div class="stat"><b>${dc.mastered}</b><span>mastered</span></div>
        </div>
        <a class="btn block" href="#cards">Study 12 cards</a>
        <p class="section-foot">Cards you miss come back sooner. A card is mastered after three correct answers in a row.</p>
      </section>
    </div>`, `<div class="wrap stack">
      <section class="section"><h2 class="section-title">Module quizzes</h2><div class="group">${rows}</div></section>
    </div>`);
  }

  /* ---------------------------------------------------------------- flashcards */
  let cardRun = null;
  const priority = (id) => {
    const b = cardBox(id);
    if (b === 0) return 0;
    if (b === null) return 1;
    return 1 + b;
  };
  function startCards() {
    const pool = shuffle(GLOSSARY).sort((a, b) => priority(a.id) - priority(b.id));
    cardRun = { items: pool.slice(0, 12).map((g) => ({ g, requeued: false })), i: 0, flipped: false, got: 0, again: 0, done: false };
  }

  function viewCards() {
    if (!cardRun) startCards();
    const r = cardRun;
    if (r.done) {
      return spread(`${mast({ back: "practice", backLabel: "Practice", kicker: "Session complete", title: "Flashcards" })}
      <div class="wrap stack">
        <div class="score"><div><b>${r.got}/${r.got + r.again}</b><small>${r.again ? `${r.again} to see again soon.` : "Every card right first time."}</small></div></div>
      </div>`, `<div class="wrap stack">
        <div class="btn-row"><button class="btn" type="button" data-act="cards-again">Another 12</button><a class="btn quiet" href="#practice">Done</a></div>
      </div>`);
    }
    const it = r.items[r.i];
    const mod = MOD[it.g.mod];
    const b = cardBox(it.g.id);
    const status = b === null ? "New card" : b >= 3 ? "Mastered" : `Learning · ${b} in a row`;
    return spread(`${mast({
      back: "practice",
      backLabel: "Practice",
      kicker: `Card ${r.i + 1} of ${r.items.length} · ${status}`,
      title: "Flashcards",
      extra: `<div class="mast-progress"><span style="width:${(r.i / r.items.length) * 100}%"></span></div>`
    })}`, `<div class="wrap stack">
      <div class="flash${r.flipped ? " flipped" : ""}" data-act="flip" role="button" tabindex="0" aria-label="Flip card">
        <div class="flash-inner">
          <div class="face front"><span class="kick">Term</span><h2>${esc(it.g.term)}</h2><span class="hint">Say the definition to yourself, then tap to check.</span></div>
          <div class="face back"><span class="kick">${esc(it.g.term)}</span><p>${esc(it.g.def)}</p><span class="from">Module ${mod.code} · ${esc(mod.title)}</span></div>
        </div>
      </div>
      <div class="flash-actions" id="flash-actions"${r.flipped ? "" : " hidden"}>
        <button class="btn quiet" type="button" data-act="card-again">Again</button>
        <button class="btn" type="button" data-act="card-got">Got it</button>
      </div>
    </div>`, true);
  }

  function flipCard() {
    const el = $(".flash");
    if (!el || !cardRun) return;
    cardRun.flipped = !cardRun.flipped;
    el.classList.toggle("flipped", cardRun.flipped);
    const acts = document.getElementById("flash-actions");
    if (acts && cardRun.flipped) acts.hidden = false;
  }

  function answerCard(got) {
    const r = cardRun;
    const it = r.items[r.i];
    const b = cardBox(it.g.id);
    if (got) {
      S.cards[it.g.id] = b === null ? 2 : Math.min(b + 1, 5);
      r.got++;
    } else {
      S.cards[it.g.id] = 0;
      r.again++;
      if (!it.requeued) r.items.push({ g: it.g, requeued: true });
    }
    touch();
    save();
    r.i++;
    r.flipped = false;
    if (r.i >= r.items.length) r.done = true;
    rerender(false);
  }

  /* ---------------------------------------------------------------- glossary */
  let glossQ = "";
  function snippet(text, needle) {
    const i = text.toLowerCase().indexOf(needle);
    if (i < 0) return esc(text.slice(0, 110)) + "…";
    let a = Math.max(0, i - 50);
    if (a > 0) { const sp = text.indexOf(" ", a); if (sp > -1 && sp < i) a = sp + 1; }
    let b = Math.min(text.length, i + needle.length + 70);
    if (b < text.length) { const sp = text.lastIndexOf(" ", b); if (sp > i + needle.length) b = sp; }
    return `${a > 0 ? "…" : ""}${esc(text.slice(a, i))}<mark>${esc(text.slice(i, i + needle.length))}</mark>${esc(text.slice(i + needle.length, b))}${b < text.length ? "…" : ""}`;
  }
  function lessonHits(needle) {
    if (needle.length < 2) return "";
    const hits = LESSONS.filter((l) => l.text.toLowerCase().includes(needle))
      .sort((x, y) => (y.title.toLowerCase().includes(needle) ? 1 : 0) - (x.title.toLowerCase().includes(needle) ? 1 : 0));
    if (!hits.length) return "";
    const shown = hits.slice(0, 8);
    return `<p class="g-letter">In lessons · ${hits.length}</p><div class="group">${shown.map((l) => `<a class="row" href="#${l.id}">
      <span class="row-main"><span class="row-title">${esc(l.title)}</span><span class="row-sub search-snip">${snippet(l.text, needle)}</span><span class="row-meta">Module ${l.module.code} · ${esc(l.module.title)}</span></span>${chev}</a>`).join("")}</div>${hits.length > shown.length ? `<p class="section-foot">Showing the first ${shown.length}. Add another word to narrow the search.</p>` : ""}`;
  }
  function glossList(q) {
    const needle = q.trim().toLowerCase();
    const items = needle
      ? GLOSSARY.filter((g) => g.term.toLowerCase().includes(needle) || g.def.toLowerCase().includes(needle))
      : GLOSSARY;
    const lessonsHTML = lessonHits(needle);
    if (!items.length && !lessonsHTML) return `<p class="empty">Nothing matches “${esc(q.trim())}”. Try a shorter or different word.</p>`;
    const groups = {};
    items.forEach((g) => {
      const L = g.term[0].toUpperCase();
      (groups[L] = groups[L] || []).push(g);
    });
    return lessonsHTML + (needle && items.length ? `<p class="g-letter">Glossary terms · ${items.length}</p>` : "") + Object.keys(groups).map((L) => `<p class="g-letter" id="g-${L}">${L}</p><dl class="group g-list">${groups[L]
      .map((g) => {
        const m = MOD[g.mod];
        return `<div class="g-item"><dt>${esc(g.term)}</dt><dd>${esc(g.def)}</dd><dd><a href="#${m.id}">Module ${m.code} · ${esc(m.title)}</a></dd></div>`;
      })
      .join("")}</dl>`).join("");
  }
  function viewGlossary() {
    return spread(`${mast({ kicker: `${GLOSSARY.length} terms`, title: "Glossary", sub: "Market jargon, defined plainly. Search also finds the lessons that explain each idea." })}
    <nav class="wrap letters spread-only" aria-label="Jump to a letter">${LETTERS.map((L) => `<button type="button" data-act="jump" data-l="${L}">${L}</button>`).join("")}</nav>`, `<div class="wrap">
      <div class="search"><div class="search-box">${icon("search")}<input id="gloss-q" type="search" data-in="gloss" placeholder="Search terms and lessons" value="${esc(glossQ)}" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" enterkeyhint="search" aria-label="Search the glossary"></div></div>
      <div id="gloss-list">${glossList(glossQ)}</div>
    </div>`, true);
  }

  /* ---------------------------------------------------------------- lab */
  function viewLab() {
    return spread(`${mast({ kicker: "Interactive tools", title: "The Lab", sub: "Three of the market’s core calculations, to play with." })}`, `<div class="wrap stack"><div class="group">
      <a class="row" href="#lab-slip" style="--sep:70px"><span class="code-badge">${icon("slip")}</span><span class="row-main"><span class="row-title">Slip builder</span><span class="row-sub">Collect written lines, then watch them sign down to 100%.</span></span>${chev}</a>
      <a class="row" href="#lab-tower" style="--sep:70px"><span class="code-badge">${icon("tower")}</span><span class="row-main"><span class="row-title">Layer tower</span><span class="row-sub">Send a catastrophe loss up an excess of loss programme.</span></span>${chev}</a>
      <a class="row" href="#lab-ratio" style="--sep:70px"><span class="code-badge">${icon("ratio")}</span><span class="row-main"><span class="row-title">Combined ratio</span><span class="row-sub">See whether an underwriting year made money.</span></span>${chev}</a>
    </div></div>`, true);
  }

  /* --- slip builder --- */
  const UW = ["Lead syndicate", "Syndicate B", "Company C", "Syndicate D", "Company E"];
  const UW_OPACITY = [1, 0.78, 0.6, 0.44, 0.3];
  const SLIP_LIMIT = 200; // £m
  const SLIP_PREMIUM = 1500000; // £
  const SLIP_PRESETS = {
    under: [20, 15, 20, 10, 0],
    exact: [25, 20, 25, 15, 15],
    over: [25, 20, 30, 25, 20]
  };
  let slip = { lines: SLIP_PRESETS.over.slice(), stand: false };

  function signedLines() {
    const W = slip.lines.reduce((a, b) => a + b, 0);
    if (W <= 100) return { W, signed: slip.lines.slice(), factor: 1 };
    if (slip.stand) {
      const lead = slip.lines[0];
      const rest = W - lead;
      const room = Math.max(0, 100 - lead);
      const factor = rest > 0 ? Math.min(1, room / rest) : 1;
      return { W, signed: slip.lines.map((l, i) => (i === 0 ? lead : l * factor)), factor };
    }
    const factor = 100 / W;
    return { W, signed: slip.lines.map((l) => l * factor), factor };
  }

  const segs = (arr, scale) =>
    arr.map((v, i) => `<span style="width:${(v / scale) * 100}%;background:var(--tint);opacity:${UW_OPACITY[i]}"></span>`).join("");

  function slipOut() {
    const { W, signed, factor } = signedLines();
    const S100 = signed.reduce((a, b) => a + b, 0);
    const scale = Math.max(W, 100);
    let status;
    if (W === 0) status = `<div class="status bad"><b>No lines yet</b>Add lines with the + buttons. The leader usually writes first.</div>`;
    else if (W < 100) status = `<div class="status bad"><b>Undersubscribed: ${fmtLine(100 - W)} unplaced</b>The broker can’t complete the placement yet. They need more lines, or the client must agree to go ahead with less than 100% covered.</div>`;
    else if (W === 100) status = `<div class="status good"><b>Fully placed at exactly 100%</b>No signing down needed. Every written line is also the signed line, but there’s no buffer if anyone drops out.</div>`;
    else if (slip.stand) status = `<div class="status good"><b>Oversubscribed by ${fmtLine(W - 100)}</b>The lead’s ${fmtLine(slip.lines[0])} stands. The other lines share the remaining ${fmtLine(Math.max(0, 100 - slip.lines[0]))}, so each is multiplied by ${factor.toFixed(4)}.</div>`;
    else status = `<div class="status good"><b>Oversubscribed by ${fmtLine(W - 100)}</b>Every line is signed down by the same factor: 100 ÷ ${fmtLine(W).replace("%", "")} = ${factor.toFixed(4)}.</div>`;

    const rows = UW.map((n, i) => `<tr><td>${n}</td><td>${signed[i].toFixed(2)}%</td><td>${fmtK((signed[i] / 100) * SLIP_PREMIUM)}</td><td>${fmtM((signed[i] / 100) * SLIP_LIMIT)}</td></tr>`).join("");
    return `<div class="stack" style="padding-top:0">
      ${status}
      <div class="barchart" aria-hidden="true">
        <div class="bar-label"><span>Written</span><span>${fmtLine(W)}</span></div>
        <div class="bar"><div class="bar-fill">${segs(slip.lines, scale)}</div><span class="mark" style="left:calc(${(100 / scale) * 100}% - 1px)"></span></div>
        <div class="bar-label" style="margin-top:8px"><span>Signed</span><span>${S100.toFixed(2)}%</span></div>
        <div class="bar"><div class="bar-fill">${segs(signed, scale)}</div><span class="mark" style="left:calc(${(100 / scale) * 100}% - 1px)"></span></div>
        <p class="section-foot">The dark line marks 100% of the risk.</p>
      </div>
      <div class="table-wrap"><table class="num-table">
        <thead><tr><th scope="col">Insurer</th><th scope="col">Signed</th><th scope="col">Premium</th><th scope="col">Exposure</th></tr></thead>
        <tbody>${rows}</tbody>
        <tfoot><tr><td>Total</td><td>${S100.toFixed(2)}%</td><td>${fmtK((S100 / 100) * SLIP_PREMIUM)}</td><td>${fmtM((S100 / 100) * SLIP_LIMIT)}</td></tr></tfoot>
      </table></div>
      <p class="section-foot">Premium and exposure follow the signed line: each insurer receives its share of the premium and pays the same share of every claim.</p>
    </div>`;
  }

  function viewSlipTool() {
    const rows = UW.map((n, i) => `<div class="uw">
      <span class="uw-name"><span class="swatch" style="background:var(--tint);opacity:${UW_OPACITY[i]}"></span>${n}</span>
      <div class="stepper"><button type="button" data-act="line" data-u="${i}" data-d="-1" aria-label="Decrease ${n}’s line">−</button><output id="uw-${i}">${fmtLine(slip.lines[i])}</output><button type="button" data-act="line" data-u="${i}" data-d="1" aria-label="Increase ${n}’s line">+</button></div>
    </div>`).join("");
    return spread(`${mast({ back: "lab", backLabel: "The Lab", kicker: "The Lab · placing", title: "Slip builder", sub: "You’re the broker. Collect lines until the risk is placed, then see how they sign down." })}
    <div class="wrap stack">
      <dl class="slipcard">
        <div><dt>UMR</dt><dd>B0000NBF2027 (example)</dd></div>
        <div><dt>Insured</dt><dd>Northbank Freight Ltd, a fictional client</dd></div>
        <div><dt>Interest</dt><dd>Warehouse portfolio: property damage and business interruption</dd></div>
        <div><dt>Limit</dt><dd>£200,000,000 any one occurrence</dd></div>
        <div><dt>Premium</dt><dd>£1,500,000 for 100%</dd></div>
      </dl>
      <section class="section"><h2 class="section-title">Written lines</h2>
        <div class="group">${rows}
          <label class="toggle" for="slip-stand"><span>Lead’s line is “to stand”</span><input type="checkbox" id="slip-stand" data-in="stand"${slip.stand ? " checked" : ""}></label>
        </div>
        <div class="presets" role="group" aria-label="Examples">
          <button type="button" data-act="slip-preset" data-p="under">Undersubscribed</button>
          <button type="button" data-act="slip-preset" data-p="exact">Exactly 100%</button>
          <button type="button" data-act="slip-preset" data-p="over">Oversubscribed</button>
        </div>
      </section>
    </div>`, `<div class="wrap stack"><div id="slip-out">${slipOut()}</div></div>`);
  }

  function refreshSlip() {
    slip.lines.forEach((v, i) => {
      const o = document.getElementById(`uw-${i}`);
      if (o) o.textContent = fmtLine(v);
    });
    const st = document.getElementById("slip-stand");
    if (st) st.checked = slip.stand;
    const out = document.getElementById("slip-out");
    if (out) out.innerHTML = slipOut();
  }

  /* --- layer tower --- */
  const TOWER_MAX = 300;
  const RETENTION = 20;
  const LAYERS = [
    { name: "Layer 1", att: 20, limit: 30, rol: 0.25, op: 1 },
    { name: "Layer 2", att: 50, limit: 50, rol: 0.12, op: 0.72 },
    { name: "Layer 3", att: 100, limit: 100, rol: 0.05, op: 0.48 }
  ];
  const PROGRAMME_TOP = 200;
  let towerLoss = 120;

  function towerCalc(loss) {
    const retained = Math.min(loss, RETENTION);
    const layers = LAYERS.map((L) => {
      const pays = Math.min(Math.max(loss - L.att, 0), L.limit);
      const premium = L.rol * L.limit;
      return Object.assign({}, L, { pays, premium, reinstatement: premium * (pays / L.limit) });
    });
    const above = Math.max(loss - PROGRAMME_TOP, 0);
    const recovered = layers.reduce((a, L) => a + L.pays, 0);
    const reinst = layers.reduce((a, L) => a + L.reinstatement, 0);
    return { retained, layers, above, recovered, reinst, cedant: retained + above };
  }

  function towerVisual(c, loss) {
    const y = (v) => (v / TOWER_MAX) * 100;
    const blocks = [
      `<div class="tlayer" style="bottom:0;height:${y(RETENTION)}%"><div class="fill" style="height:${(c.retained / RETENTION) * 100}%;background:var(--ink-3)"></div></div>`,
      ...c.layers.map((L) => `<div class="tlayer" style="bottom:${y(L.att)}%;height:${y(L.limit)}%"><div class="fill" style="height:${(L.pays / L.limit) * 100}%;background:var(--tint);opacity:${L.op}"></div></div>`),
      `<div class="tlayer uninsured" style="bottom:${y(PROGRAMME_TOP)}%;height:${y(TOWER_MAX - PROGRAMME_TOP)}%"><div class="base"></div><div class="fill" style="height:${(c.above / (TOWER_MAX - PROGRAMME_TOP)) * 100}%;background:var(--bad);opacity:.7"></div></div>`
    ].join("");
    const ticks = [0, 20, 50, 100, 200, 300].map((v) => `<span style="bottom:${y(v)}%">£${v}m</span>`).join("");
    const labels = [
      `<div class="tl" style="bottom:${y(RETENTION / 2)}%"><b>Retention · £20m</b></div>`,
      ...c.layers.map((L) => `<div class="tl" style="bottom:${y(L.att + L.limit / 2)}%"><b>${L.name}</b><span>£${L.limit}m xs £${L.att}m</span></div>`),
      `<div class="tl" style="bottom:${y((PROGRAMME_TOP + TOWER_MAX) / 2)}%"><b>Not reinsured</b><span>above £200m</span></div>`
    ].join("");
    return `<div class="tower" style="padding-block:8px" aria-hidden="true">
      <div class="axis">${ticks}</div>
      <div class="tower-stack">${blocks}<div class="lossline" style="bottom:${y(Math.min(loss, TOWER_MAX))}%"></div></div>
      <div class="tower-labels">${labels}</div>
    </div>`;
  }

  function towerOut() {
    const c = towerCalc(towerLoss);
    const rows = [
      `<tr><td>Cedant retention</td><td>${fmtM(c.retained)}</td><td>–</td></tr>`,
      ...c.layers.map((L) => `<tr><td>${L.name} reinsurers</td><td>${fmtM(L.pays)}</td><td>${L.pays ? fmtM(L.reinstatement) : "–"}</td></tr>`),
      `<tr><td>Cedant, above programme</td><td>${fmtM(c.above)}</td><td>–</td></tr>`
    ].join("");
    let summary;
    if (towerLoss <= RETENTION) summary = `The loss sits inside the £20m retention, so the cedant pays it all and the reinsurance isn’t touched.`;
    else if (c.above > 0) summary = `The loss exhausts the whole programme. Reinsurers pay ${fmtM(c.recovered)}; the cedant keeps ${fmtM(c.cedant)}, including ${fmtM(c.above)} above the top layer.`;
    else summary = `Reinsurers pay ${fmtM(c.recovered)} of the ${fmtM(towerLoss)} loss. The cedant keeps its ${fmtM(c.retained)} retention.`;
    if (c.reinst > 0) summary += ` To restore the layers used, it owes ${fmtM(c.reinst)} in reinstatement premiums.`;
    return `<div class="stack" style="padding-top:0">
      ${towerVisual(c, towerLoss)}
      <div class="status"><b>What happens</b>${summary}</div>
      <div class="table-wrap"><table class="num-table">
        <thead><tr><th scope="col">Who pays</th><th scope="col">Amount</th><th scope="col">Reinstatement</th></tr></thead>
        <tbody>${rows}</tbody>
        <tfoot><tr><td>Total loss</td><td>${fmtM(towerLoss)}</td><td>${c.reinst ? fmtM(c.reinst) : "–"}</td></tr></tfoot>
      </table></div>
      <div class="table-wrap"><table class="num-table">
        <thead><tr><th scope="col">Layer</th><th scope="col">Premium</th><th scope="col">Rate on line</th><th scope="col">Payback</th></tr></thead>
        <tbody>${LAYERS.map((L) => `<tr><td>${L.name} · £${L.limit}m xs £${L.att}m</td><td>${fmtM(L.rol * L.limit)}</td><td>${(L.rol * 100).toFixed(0)}%</td><td>${(1 / L.rol).toFixed(0)} yrs</td></tr>`).join("")}</tbody>
      </table></div>
      <p class="section-foot">Payback is 1 ÷ rate on line: how many loss-free years of premium it takes to pay for one full loss to the layer. High layers are cheap because they are rarely hit.</p>
    </div>`;
  }

  function viewTowerTool() {
    return spread(`${mast({ back: "lab", backLabel: "The Lab", kicker: "The Lab · reinsurance", title: "Layer tower", sub: "A catastrophe loss climbs an excess of loss programme. Drag the loss and watch who pays." })}
    <div class="wrap stack">
      <dl class="slipcard">
        <div><dt>Cedant</dt><dd>A regional property insurer (example)</dd></div>
        <div><dt>Programme</dt><dd>£180m xs £20m in three layers</dd></div>
        <div><dt>Event</dt><dd>One windstorm, under a 72-hour hours clause</dd></div>
        <div><dt>Reinstate</dt><dd>One reinstatement at 100%, pro rata as to amount</dd></div>
      </dl>
      <div class="group">
        <div class="slider">
          <div class="loss-readout"><b id="tower-val">${fmtM(towerLoss)}</b><span>event loss</span></div>
          <input type="range" id="tower-loss" data-in="tower" min="0" max="${TOWER_MAX}" step="5" value="${towerLoss}" aria-label="Event loss in millions of pounds">
        </div>
      </div>
      <div class="presets" role="group" aria-label="Example events">
        <button type="button" data-act="tower-preset" data-v="15">Small storm £15m</button>
        <button type="button" data-act="tower-preset" data-v="70">Bad storm £70m</button>
        <button type="button" data-act="tower-preset" data-v="160">Major hurricane £160m</button>
        <button type="button" data-act="tower-preset" data-v="260">Extreme £260m</button>
      </div>
    </div>`, `<div class="wrap stack"><div id="tower-out">${towerOut()}</div></div>`);
  }

  function refreshTower() {
    const v = document.getElementById("tower-val");
    if (v) v.textContent = fmtM(towerLoss);
    const r = document.getElementById("tower-loss");
    if (r && +r.value !== towerLoss) r.value = towerLoss;
    const out = document.getElementById("tower-out");
    if (out) out.innerHTML = towerOut();
  }

  /* --- combined ratio --- */
  const RATIO_FIELDS = [
    { k: "p", label: "Earned premium", min: 50, max: 400, step: 5 },
    { k: "c", label: "Claims incurred", min: 0, max: 400, step: 1 },
    { k: "e", label: "Expenses", min: 0, max: 160, step: 1 },
    { k: "i", label: "Investment income", min: 0, max: 40, step: 1 }
  ];
  const RATIO_PRESETS = {
    benign: { p: 200, c: 110, e: 64, i: 8 },
    cat: { p: 200, c: 172, e: 64, i: 8 },
    soft: { p: 200, c: 134, e: 72, i: 10 }
  };
  let ratio = { p: 200, c: 120, e: 66, i: 8 };

  function ratioOut() {
    const { p, c, e, i } = ratio;
    const lr = (c / p) * 100;
    const er = (e / p) * 100;
    const cor = lr + er;
    const uw = p - c - e;
    const total = uw + i;
    const SCALE = 150;
    const lrW = Math.min(lr, SCALE);
    const erW = Math.min(er, SCALE - lrW);
    let note = "";
    if (uw < 0 && total >= 0) note = `<div class="status"><b>Saved by investment income</b>Underwriting lost money, but investment income on the float turned the year into a profit. That only works while claims are paid slowly and interest rates hold up.</div>`;
    else if (total < 0) note = `<div class="status bad"><b>A losing year</b>Claims and expenses cost more than the premium, and investment income didn’t cover the gap. In a hard market that follows, rates would rise.</div>`;
    else note = `<div class="status good"><b>A profitable year</b>For every £1 of premium, underwriting kept ${Math.max(0, 100 - cor).toFixed(1)}p before investment income.</div>`;
    return `<div class="stack" style="padding-top:0">
      <div class="panel">
        <div class="cor"><div><b>${pct(cor)}</b><small>Combined ratio</small></div><span class="verdict ${uw >= 0 ? "good" : "bad"}">${uw >= 0 ? "Underwriting profit" : "Underwriting loss"} ${fmtM(Math.abs(uw))}</span></div>
        <div class="barchart" aria-hidden="true">
          <div class="bar"><div class="bar-fill"><span style="width:${(lrW / SCALE) * 100}%;background:var(--c1)"></span><span style="width:${(erW / SCALE) * 100}%;background:var(--c2)"></span></div><span class="mark" style="left:calc(${(100 / SCALE) * 100}% - 1px)"></span></div>
          <div class="bar-label"><span>0%</span><span>100%</span><span>150%</span></div>
        </div>
        <div class="legend"><span><i class="swatch" style="background:var(--c1)"></i>Loss ratio ${pct(lr)}</span><span><i class="swatch" style="background:var(--c2)"></i>Expense ratio ${pct(er)}</span></div>
      </div>
      ${note}
      <div class="table-wrap"><table class="num-table">
        <tbody>
          <tr><td>Loss ratio</td><td>${pct(lr)}</td></tr>
          <tr><td>Expense ratio</td><td>${pct(er)}</td></tr>
          <tr><td>Underwriting result</td><td>${fmtM(uw)}</td></tr>
          <tr><td>Investment income</td><td>${fmtM(i)}</td></tr>
        </tbody>
        <tfoot><tr><td>Overall result</td><td>${fmtM(total)}</td></tr></tfoot>
      </table></div>
    </div>`;
  }

  function viewRatioTool() {
    const sliders = RATIO_FIELDS.map((f) => `<div class="slider">
      <label for="ratio-${f.k}"><span>${f.label}</span><output id="ratio-${f.k}-val">${fmtM(ratio[f.k])}</output></label>
      <input type="range" id="ratio-${f.k}" data-in="ratio" data-k="${f.k}" min="${f.min}" max="${f.max}" step="${f.step}" value="${ratio[f.k]}">
    </div>`).join("");
    return spread(`${mast({ back: "lab", backLabel: "The Lab", kicker: "The Lab · the numbers", title: "Combined ratio", sub: "Claims plus expenses, as a share of earned premium. Under 100% means underwriting made money." })}
    <div class="wrap stack">
      <section class="section"><h2 class="section-title">Your year, in £m</h2><div class="group">${sliders}</div>
        <div class="presets" role="group" aria-label="Example years">
          <button type="button" data-act="ratio-preset" data-p="benign">Quiet year</button>
          <button type="button" data-act="ratio-preset" data-p="cat">Catastrophe year</button>
          <button type="button" data-act="ratio-preset" data-p="soft">Soft market</button>
        </div>
      </section>
    </div>`, `<div class="wrap stack"><div id="ratio-out">${ratioOut()}</div></div>`);
  }

  function refreshRatio() {
    RATIO_FIELDS.forEach((f) => {
      const o = document.getElementById(`ratio-${f.k}-val`);
      if (o) o.textContent = fmtM(ratio[f.k]);
      const r = document.getElementById(`ratio-${f.k}`);
      if (r && +r.value !== ratio[f.k]) r.value = ratio[f.k];
    });
    const out = document.getElementById("ratio-out");
    if (out) out.innerHTML = ratioOut();
  }

  /* ---------------------------------------------------------------- events */
  const ACTIONS = {
    complete(el) {
      const l = LESSON[el.dataset.id];
      if (!l) return;
      if (!S.done[l.id]) {
        S.done[l.id] = Date.now();
        touch();
        save();
      }
      const box = document.getElementById("complete");
      if (box) box.innerHTML = completeHTML(l, true);
      const tick = document.querySelector('.outline [aria-current="page"] .check');
      if (tick) { tick.classList.add("done"); tick.innerHTML = icon("check"); }
    },
    answer(el) {
      const r = quizRun;
      if (!r || r.done) return;
      const it = r.items[r.i];
      if (it.pick !== null) return;
      it.pick = +el.dataset.i;
      S.qa.n++;
      if (it.opts[it.pick].ok) {
        S.qa.c++;
        delete S.missed[it.q.qid];
      } else {
        S.missed[it.q.qid] = 1;
      }
      touch();
      save();
      rerender(true);
      const fb = document.getElementById("fb");
      if (fb) fb.scrollIntoView({ block: "nearest", behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    },
    nextq() {
      const r = quizRun;
      if (!r) return;
      r.i++;
      if (r.i >= r.items.length) {
        r.i = r.items.length - 1;
        finishQuiz();
      }
      rerender(false);
    },
    retry() {
      if (!quizRun) return;
      startQuiz(quizRun.id);
      rerender(false);
    },
    flip: flipCard,
    "card-got": () => answerCard(true),
    "card-again": () => answerCard(false),
    "cards-again"() {
      startCards();
      rerender(false);
    },
    line(el) {
      const u = +el.dataset.u;
      const d = +el.dataset.d;
      slip.lines[u] = Math.min(100, Math.max(0, slip.lines[u] + d * 2.5));
      refreshSlip();
    },
    "slip-preset"(el) {
      slip.lines = SLIP_PRESETS[el.dataset.p].slice();
      refreshSlip();
    },
    "tower-preset"(el) {
      towerLoss = +el.dataset.v;
      refreshTower();
    },
    "ratio-preset"(el) {
      ratio = Object.assign({}, RATIO_PRESETS[el.dataset.p]);
      refreshRatio();
    },
    jump(el) {
      const target = document.getElementById(`g-${el.dataset.l}`);
      if (!target) return;
      const bar = document.querySelector(".search");
      const inset = parseFloat(getComputedStyle(document.documentElement).paddingTop) || 0;
      const y = target.getBoundingClientRect().top + window.scrollY - (bar ? bar.offsetHeight : 0) - inset;
      window.scrollTo({ top: Math.max(0, y), behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    },
    textsize(el) {
      S.text = el.dataset.size;
      save();
      applyTextSize();
      document.querySelectorAll('[data-act="textsize"]').forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.size === S.text)));
    },
    reset(el) {
      if (el.dataset.armed) {
        S = blank();
        save();
        applyTextSize();
        quizRun = null;
        cardRun = null;
        rerender(false);
        return;
      }
      el.dataset.armed = "1";
      el.textContent = "Tap again to erase all progress";
      setTimeout(() => {
        if (el.isConnected) {
          delete el.dataset.armed;
          el.textContent = "Reset progress";
        }
      }, 4000);
    }
  };

  const INPUTS = {
    gloss(el) {
      glossQ = el.value;
      const list = document.getElementById("gloss-list");
      if (list) list.innerHTML = glossList(glossQ);
    },
    stand(el) {
      slip.stand = el.checked;
      refreshSlip();
    },
    tower(el) {
      towerLoss = +el.value;
      refreshTower();
    },
    ratio(el) {
      ratio[el.dataset.k] = +el.value;
      refreshRatio();
    }
  };

  document.addEventListener("click", (e) => {
    const tab = e.target.closest(".tab");
    if (tab && tab.getAttribute("href") === `#${current}`) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const t = e.target.closest("[data-act]");
    if (!t || !ACTIONS[t.dataset.act]) return;
    ACTIONS[t.dataset.act](t, e);
  });
  document.addEventListener("input", (e) => {
    const t = e.target;
    if (t.dataset && INPUTS[t.dataset.in]) INPUTS[t.dataset.in](t);
  });
  document.addEventListener("change", (e) => {
    const t = e.target;
    if (t.type === "checkbox" && t.dataset && INPUTS[t.dataset.in]) INPUTS[t.dataset.in](t);
  });
  document.addEventListener("keydown", (e) => {
    if ((e.key === "Enter" || e.key === " ") && e.target.classList && e.target.classList.contains("flash")) {
      e.preventDefault();
      flipCard();
    }
  });
  window.addEventListener("hashchange", route);

  route();

  /* ---------------------------------------------------------------- offline */
  if (!window.SLIP_ARTIFACT && "serviceWorker" in navigator && /^https?:$/.test(location.protocol)) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js").catch(() => { /* offline support unavailable */ });
    });
  }
})();
