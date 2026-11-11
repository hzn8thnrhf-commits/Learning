/* The Slip — drawing kit. Small functions that turn numbers into pictures.
   Every scene in a chapter is built from these, so the whole course shares one visual language:
   blue (c1) is "ours / kept", amber (c2) is "theirs / ceded", teal (c3) a third party, red a loss. */
window.SLIP = window.SLIP || { chapters: [] };
(() => {
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  const num = (v, d = 1) => (+(+v).toFixed(d)).toLocaleString("en-GB");
  const money = (m) => {
    const a = Math.abs(m), s = m < -0.0005 ? "−" : "";
    if (a < 0.0005) return "£0";
    if (a >= 1000) return `${s}£${num(a / 1000, 2)}bn`;
    if (a < 1) return `${s}£${Math.round(a * 1000)}k`;
    return `${s}£${num(a, a >= 100 ? 0 : 1)}m`;
  };
  const pct = (v, d = 0) => `${num(v, d)}%`;
  const signed = (v, f = (x) => num(x)) => `${v > 0 ? "+" : v < 0 ? "−" : ""}${f(Math.abs(v))}`;
  const f1 = (v) => (+v).toFixed(1);

  /* headline numbers */
  const stats = (items) => `<dl class="k-stats n${items.length}">${items.map(([k, v, tone]) => `<div${tone ? ` class="t-${tone}"` : ""}><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>`;

  /* horizontal bars: rows of segments on a shared scale, with optional marker lines */
  function bars(rows, o = {}) {
    const sums = rows.map((r) => r.segs.reduce((a, s) => a + Math.max(0, s[0]), 0));
    const max = o.max || Math.max(...sums, ...(o.marks || []).map((m) => m[0]), 0.0001) * 1.02;
    const row = (r) => {
      const segs = r.segs.filter((s) => s[0] > max * 0.0005).map(([v, tone, text]) => {
        const w = (v / max) * 100;
        const fits = text && (w / 100) * 290 > String(text).length * 6.6 + 10;
        return `<span class="seg t-${tone}" style="width:${w.toFixed(2)}%">${fits ? `<em>${esc(text)}</em>` : ""}</span>`;
      }).join("");
      return `<div class="k-row"><div class="k-head"><b>${esc(r.label)}</b>${r.right !== undefined ? `<span>${esc(r.right)}</span>` : ""}</div><div class="k-track">${segs}</div></div>`;
    };
    const marks = (o.marks || []).map(([v, label]) => `<i class="k-mark" style="left:${((v / max) * 100).toFixed(2)}%"><em class="${v / max > 0.75 ? "r" : v / max < 0.25 ? "l" : ""}">${esc(label)}</em></i>`).join("");
    const legend = o.legend ? `<div class="k-legend">${o.legend.map(([tone, t]) => `<span><i class="t-${tone}"></i>${esc(t)}</span>`).join("")}</div>` : "";
    return `<div class="k-bars${marks ? " has-marks" : ""}"><div class="k-rows">${rows.map(row).join("")}${marks ? `<div class="k-marks">${marks}</div>` : ""}</div>${legend}</div>`;
  }

  /* waterfall: running total, steps up and down */
  function wfall(steps, o = {}) {
    let run = 0;
    const rows = steps.map((st) => {
      let a, b, v;
      if (st.total) { if (st.v !== undefined) run = st.v; v = run; a = Math.min(0, run); b = Math.max(0, run); }
      else { v = st.v; a = Math.min(run, run + v); b = Math.max(run, run + v); run += v; }
      return { st, a, b, v };
    });
    const lo = Math.min(0, ...rows.map((r) => r.a)), hi = Math.max(0, ...rows.map((r) => r.b));
    const span = (hi - lo) || 1, pad = span * 0.02;
    const pos = (x) => ((x - lo + pad) / (span + 2 * pad)) * 100;
    const fmt = o.fmt || ((x) => num(x));
    const body = rows.map(({ st, a, b, v }) => {
      const tone = st.total ? "total" : v < 0 ? "down" : "up";
      const txt = st.total ? fmt(v) : signed(v, fmt);
      const leftSide = pos(b) > 72;
      return `<div class="w-row${st.total ? " is-total" : ""}"><span class="w-label">${esc(st.label)}</span><div class="w-track"><i class="w-zero" style="left:${f1(pos(0))}%"></i><span class="w-bar w-${tone}" style="left:${f1(pos(a))}%;width:${f1(Math.max(0.8, pos(b) - pos(a)))}%"></span><em class="${leftSide ? "l" : ""}" style="left:${f1(leftSide ? pos(a) : pos(b))}%">${esc(txt)}</em></div></div>`;
    }).join("");
    return `<div class="k-wfall">${body}</div>`;
  }

  /* vertical columns (e.g. one per year), stacked, with horizontal reference lines */
  function cols(o) {
    const W = 340, H = o.h || 200, X0 = 6, X1 = W - 6, Y0 = H - 20, Y1 = 16;
    const n = o.bars.length, bw = (X1 - X0) / n;
    const y = (v) => Y0 - (v / o.max) * (Y0 - Y1);
    let g = `<line class="p-axis" x1="${X0}" x2="${X1}" y1="${Y0}" y2="${Y0}"/>`;
    o.bars.forEach((b, i) => {
      let run = 0;
      const x = X0 + i * bw + bw * 0.14, w = bw * 0.72;
      b.segs.forEach(([v, tone]) => {
        if (v <= 0) return;
        const top = Math.min(run + v, o.max), bot = Math.min(run, o.max);
        if (top > bot) g += `<rect class="f-${tone}" x="${f1(x)}" y="${f1(y(top))}" width="${f1(w)}" height="${f1(y(bot) - y(top))}" rx="2"/>`;
        run += v;
      });
      if (b.top) g += `<text class="p-lab" x="${f1(x + w / 2)}" y="${f1(y(Math.min(run, o.max)) - 4)}" text-anchor="middle">${esc(b.top)}</text>`;
      if (b.label !== undefined) g += `<text class="p-tick${b.hot ? " hot" : ""}" x="${f1(x + w / 2)}" y="${Y0 + 13}" text-anchor="middle">${esc(b.label)}</text>`;
    });
    (o.lines || []).forEach((l) => {
      g += `<line class="p-ref${l.tone ? ` s-${l.tone}` : ""}" x1="${X0}" x2="${X1}" y1="${f1(y(l.v))}" y2="${f1(y(l.v))}"/><text class="p-sub" x="${l.right ? X1 : X0 + 2}" y="${f1(y(l.v) - 4)}" text-anchor="${l.right ? "end" : "start"}">${esc(l.label)}</text>`;
    });
    const legend = o.legend ? `<div class="k-legend">${o.legend.map(([tone, t]) => `<span><i class="t-${tone}"></i>${esc(t)}</span>`).join("")}</div>` : "";
    return `<div class="k-svg"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(o.title || "Chart")}">${g}</svg></div>${legend}`;
  }

  /* line and dot chart on real axes (optional log x) */
  function plot(o) {
    const W = 340, H = o.h || 200, X0 = 38, X1 = W - 12, Y0 = H - 30, Y1 = 14;
    const lg = Math.log;
    const xs = o.x.log ? (v) => X0 + ((lg(v) - lg(o.x.min)) / (lg(o.x.max) - lg(o.x.min))) * (X1 - X0) : (v) => X0 + ((v - o.x.min) / (o.x.max - o.x.min)) * (X1 - X0);
    const ys = (v) => Y0 - ((Math.min(o.y.max, Math.max(o.y.min, v)) - o.y.min) / (o.y.max - o.y.min)) * (Y0 - Y1);
    const lab = (ax, v, i) => (ax.labels ? ax.labels[i] : (ax.fmt ? ax.fmt(v) : String(v)));
    let g = "";
    (o.bands || []).forEach((b) => {
      g += `<rect class="p-band f-${b.tone || "c2"}" x="${X0}" y="${f1(ys(b.to))}" width="${X1 - X0}" height="${f1(Math.max(0, ys(b.from) - ys(b.to)))}"/>`;
      if (b.label) g += `<text class="p-sub" x="${X0 + 5}" y="${f1(ys(b.to) + 12)}">${esc(b.label)}</text>`;
    });
    o.y.ticks.forEach((v, i) => { g += `<line class="p-grid" x1="${X0}" x2="${X1}" y1="${f1(ys(v))}" y2="${f1(ys(v))}"/><text class="p-tick" x="${X0 - 5}" y="${f1(ys(v) + 3.5)}" text-anchor="end">${esc(lab(o.y, v, i))}</text>`; });
    g += `<line class="p-axis" x1="${X0}" x2="${X1}" y1="${Y0}" y2="${Y0}"/>`;
    o.x.ticks.forEach((v, i) => { g += `<text class="p-tick" x="${f1(xs(v))}" y="${Y0 + 13}" text-anchor="middle">${esc(lab(o.x, v, i))}</text>`; });
    if (o.x.title) g += `<text class="p-title" x="${(X0 + X1) / 2}" y="${H - 3}" text-anchor="middle">${esc(o.x.title)}</text>`;
    (o.refs || []).forEach((r) => {
      if (r.y !== undefined) g += `<line class="p-ref" x1="${X0}" x2="${X1}" y1="${f1(ys(r.y))}" y2="${f1(ys(r.y))}"/><text class="p-sub" x="${r.left ? X0 + 4 : X1}" y="${f1(ys(r.y) - 4)}" text-anchor="${r.left ? "start" : "end"}">${esc(r.label || "")}</text>`;
      if (r.x !== undefined) g += `<line class="p-ref" x1="${f1(xs(r.x))}" x2="${f1(xs(r.x))}" y1="${Y1}" y2="${Y0}"/><text class="p-sub" x="${f1(xs(r.x) + (r.left ? -4 : 4))}" y="${Y1 + 8}" text-anchor="${r.left ? "end" : "start"}">${esc(r.label || "")}</text>`;
    });
    (o.series || []).forEach((sr) => {
      const d = sr.pts.map(([x, yv], i) => `${i ? "L" : "M"}${f1(xs(x))} ${f1(ys(yv))}`).join("");
      g += `<path class="p-line s-${sr.tone || "c1"}${sr.dash ? " dash" : ""}" d="${d}"/>`;
    });
    (o.dots || []).forEach((d) => { g += `<circle class="p-dot f-${d.tone || "c1"}" cx="${f1(xs(d.x))}" cy="${f1(ys(d.y))}" r="${d.r || 4.5}"/>`; if (d.label) g += `<text class="p-lab" x="${f1(xs(d.x) + (d.left ? -8 : 8))}" y="${f1(ys(d.y) + (d.dy === undefined ? -7 : d.dy))}" text-anchor="${d.left ? "end" : "start"}">${esc(d.label)}</text>`; });
    const legend = o.legend ? `<div class="k-legend">${o.legend.map(([tone, t]) => `<span><i class="t-${tone}"></i>${esc(t)}</span>`).join("")}</div>` : "";
    return `<div class="k-svg"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(o.title || "Chart")}">${g}</svg></div>${legend}`;
  }

  /* boxes and arrows on a fixed 340-wide canvas; `on` lights some boxes and fades the rest */
  function flow(o) {
    const W = 340, H = o.h;
    const N = {};
    o.nodes.forEach((n) => { N[n.id] = Object.assign({ w: 150, h: n.sub ? 44 : 34 }, n); });
    const lit = o.on ? new Set(o.on) : null;
    let g = `<defs><marker id="arr" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0.8L7 4L0 7.2z" class="p-arrow"/></marker></defs>`;
    (o.edges || []).forEach(([a, b, label, opt = {}]) => {
      const A = N[a], B = N[b];
      const dim = lit && !(lit.has(a) && lit.has(b));
      let d, lx, ly;
      const acx = A.x + A.w / 2, bcx = B.x + B.w / 2;
      if (B.y >= A.y + A.h) {
        const y0 = A.y + A.h, y1 = B.y - 2, mid = (y0 + y1) / 2;
        d = Math.abs(acx - bcx) < 2 ? `M${acx} ${y0}V${y1}` : `M${acx} ${y0}V${mid}H${bcx}V${y1}`;
        lx = Math.abs(acx - bcx) < 2 ? acx : (acx + bcx) / 2; ly = mid;
      } else if (B.y + B.h <= A.y) {
        const y0 = A.y, y1 = B.y + B.h + 2, mid = (y0 + y1) / 2;
        d = Math.abs(acx - bcx) < 2 ? `M${acx} ${y0}V${y1}` : `M${acx} ${y0}V${mid}H${bcx}V${y1}`;
        lx = Math.abs(acx - bcx) < 2 ? acx : (acx + bcx) / 2; ly = mid;
      } else {
        const right = B.x > A.x, y = A.y + A.h / 2 + (opt.dy || 0), y2 = B.y + B.h / 2 + (opt.dy || 0);
        const x0 = right ? A.x + A.w : A.x, x1 = right ? B.x - 2 : B.x + B.w + 2;
        d = `M${x0} ${y}L${x1} ${y2}`; lx = (x0 + x1) / 2; ly = (y + y2) / 2 - 7;
      }
      g += `<path class="p-edge${dim ? " dim" : ""}${opt.dash ? " dash" : ""}" d="${d}" marker-end="url(#arr)"/>`;
      if (label) g += `<text class="p-elab${dim ? " dim" : ""}" x="${lx}" y="${ly + 3.5}" text-anchor="middle">${esc(label)}</text>`;
    });
    o.nodes.forEach((raw) => {
      const n = N[raw.id];
      const dim = lit && !lit.has(n.id);
      g += `<g class="p-node n-${n.tone || "plain"}${dim ? " dim" : ""}"><rect x="${n.x}" y="${n.y}" width="${n.w}" height="${n.h}" rx="9"/><text class="nl" x="${n.x + n.w / 2}" y="${n.y + (n.sub ? 18 : n.h / 2 + 4.5)}" text-anchor="middle">${esc(n.label)}</text>${n.sub ? `<text class="ns" x="${n.x + n.w / 2}" y="${n.y + 33}" text-anchor="middle">${esc(n.sub)}</text>` : ""}</g>`;
    });
    return `<div class="k-svg k-flow"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(o.title || "Diagram")}">${g}</svg></div>`;
  }

  /* a short list drawn as a scene, for recap steps */
  const recap = (items) => `<ol class="k-recap">${items.map((t) => `<li>${esc(t)}</li>`).join("")}</ol>`;
  const big = (value, caption, tone) => `<div class="k-big${tone ? ` t-${tone}` : ""}"><b>${esc(value)}</b><span>${esc(caption)}</span></div>`;

  window.SLIP.kit = { esc, num, money, pct, signed, stats, bars, wfall, cols, plot, flow, recap, big };
})();
