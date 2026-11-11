/* LM1 · 4 — The insurance cycle */
(() => {
  const { bars, flow, stats, recap, plot, pct } = window.SLIP.kit;
  const run = (v) => {
    let K = 110, R = 100; const rate = [], cor = [];
    for (let t = 1; t <= 12; t++) {
      const lr = 6200 / R;
      rate.push([t, R]); cor.push([t, lr + 33]);
      const profit = R * (1 - lr / 100 - 0.33) - (t === 4 ? v.shock * 1.1 : 0) + 0.03 * K, roe = profit / K;
      K += profit + 0.6 * Math.max(0, roe - 0.08) * K - (roe < 0 ? -0.2 * profit : 0);
      let g = 0.45 * (100 - K) / 100; if (g < 0) g *= 1 - v.disc / 100;
      R *= 1 + Math.max(-0.1, Math.min(0.3, g));
    }
    return { rate, cor };
  };
  const loop = (on) => flow({
    h: 236, on,
    nodes: [
      { id: "p", x: 4, y: 4, w: 150, label: "Profits", tone: "good" }, { id: "c", x: 186, y: 4, w: 150, label: "New insurers arrive" },
      { id: "s", x: 186, y: 96, w: 150, label: "Prices are cut", sub: "A soft market" }, { id: "l", x: 186, y: 188, w: 150, label: "Losses", tone: "bad" },
      { id: "x", x: 4, y: 188, w: 150, label: "Insurers leave" }, { id: "h", x: 4, y: 96, w: 150, label: "Prices rise", sub: "A hard market" }
    ],
    edges: [["p", "c"], ["c", "s"], ["s", "l"], ["l", "x"], ["x", "h"], ["h", "p"]]
  });

  window.SLIP.chapters.push({
    id: "cycle", part: "LM1",
    title: "The insurance cycle",
    blurb: "Why prices swing between soft and hard, and what makes the swing faster.",
    minutes: 6,
    init: { shock: 40, disc: 0, up: 20 },
    steps: [
      {
        h: "Supply and demand",
        say: "Insurance obeys the same law as any product: more sellers push the price down; more buyers push it up.\n\nBut demand for insurance is stubborn. Raise the price of a luxury and people buy less. Raise the price of cover a business *must* have, and it mostly pays.",
        scene: (v) => {
          const lux = Math.max(0, 100 - v.up * 1.4), must = Math.max(0, 100 - v.up * 0.15);
          return bars([
            { label: "A luxury: buyers left", right: pct(lux), segs: [[lux, "c2"]] },
            { label: "Compulsory insurance: buyers left", right: pct(must), segs: [[must, "c1"]] }
          ], { max: 100 });
        },
        ctl: [{ k: "up", label: "Price increase", min: 0, max: 60, step: 5, fmt: (x) => `+${x}%` }],
        live: () => "A price rise doesn’t produce an equal fall in demand when the buyer has little choice. So insurance prices are driven mainly from the **supply** side: by how much capital is chasing the business."
      },
      {
        h: "The loop",
        say: "Follow it clockwise. Insurers make **profits**. Others notice and join. More sellers compete, so prices fall: a **soft market**. Eventually premiums no longer cover claims. Insurers lose money and withdraw. With fewer sellers, prices rise: a **hard market**. Profits return, and round it goes.",
        scene: () => loop(),
        ask: {
          q: "At which point is it most tempting, and most dangerous, to cut prices?",
          opts: ["In the soft market, to keep clients.", "In the hard market."],
          a: 0,
          why: "Each small cut looks harmless and holds on to a client. But the cuts compound across the market until premiums fall below the cost of claims. Holding your price when rivals don’t is called **underwriting discipline**."
        }
      },
      {
        h: "Run twelve years",
        say: "A simple market. Rates fall when capital is plentiful and rise when it is scarce. Add a catastrophe in year 4, and give underwriters some discipline.",
        scene: (v) => {
          const r = run(v), rs = r.rate.map((p) => p[1]), cs = r.cor.map((p) => p[1]);
          return stats([["Price swing", `${Math.round(Math.max(...rs) - Math.min(...rs))} pts`], ["Worst year", `${Math.round(Math.max(...cs))}%`, Math.max(...cs) > 105 ? "bad" : ""], ["Best year", `${Math.round(Math.min(...cs))}%`, "good"]]) +
            plot({ h: 180, x: { min: 1, max: 12, ticks: [1, 4, 8, 12], title: "Year" }, y: { min: 60, max: 160, ticks: [60, 100, 140] },
              refs: [{ y: 100, label: "Break-even", left: true }].concat(v.shock ? [{ x: 4, label: "Catastrophe" }] : []),
              series: [{ tone: "c1", pts: r.rate }, { tone: "bad", dash: true, pts: r.cor }], legend: [["c1", "Price level"], ["bad", "Claims + costs, % of premium"]] });
        },
        ctl: [{ k: "shock", label: "Catastrophe in year 4", min: 0, max: 70, step: 10, fmt: (x) => (x ? `${x}% of capital` : "none") }, { k: "disc", label: "Underwriting discipline", min: 0, max: 90, step: 10, fmt: pct }],
        live: (v) => (v.shock ? "The catastrophe destroys capital overnight. Capacity shrinks and prices jump: the soft market turns hard in a single season, instead of drifting there." : "Even with no catastrophe the market cycles by itself, slowly. The cycle is built into how capital comes and goes.") + (v.disc >= 50 ? " Discipline flattens the swings: less ground lost in the soft years, less to recover." : "")
      },
      {
        h: "What speeds it up",
        say: "A market can stay soft for years. Three things shorten the cycle: very large **natural catastrophes**, **changes in the law** that suddenly make old policies costlier, and **major events** that shake confidence.",
        scene: () => loop(["l", "x", "h"]),
        ask: {
          q: "A record hurricane season hits property insurers. Next year, property prices will most likely…",
          opts: ["Fall, as insurers compete to recover.", "Rise, as capacity shrinks."],
          a: 1,
          why: "Losses remove capital, and some insurers withdraw. Those who remain can charge more. Each class has its own cycle, though: a hard property market can sit beside a soft marine one."
        }
      },
      {
        h: "In four lines",
        say: "You will meet the cycle again in LM2, from the underwriter’s chair.",
        scene: () => recap([
          "Insurance prices follow supply: how much capital wants the business.",
          "Profits attract insurers, competition cuts prices, losses drive insurers out, prices recover.",
          "Soft market: cheap, broad cover. Hard market: dear, tight cover.",
          "Catastrophes, legal change and major events shorten the cycle."
        ])
      }
    ]
  });
})();
