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
    blurb: "Why insurance prices rise and fall in cycles, what turns a soft market hard, and what underwriting discipline requires.",
    minutes: 6,
    lead: "Insurance prices do not move steadily. They rise and fall in a recurring pattern that every underwriter must learn to recognise.",
    aims: [
      "Explain why insurance prices are driven chiefly by the supply of capital.",
      "Describe the phases of the insurance cycle and what moves a market from one to the next.",
      "Explain underwriting discipline and why it is difficult to maintain.",
      "Identify the events that can turn a market abruptly."
    ],
    init: { shock: 40, disc: 0, up: 20 },
    steps: [
      {
        h: "Supply and demand",
        say: "The price of insurance responds, like any price, to supply and demand. What is distinctive is the behaviour of demand. Much insurance is bought because the law, a lender or a contract requires it, so demand is **inelastic**: it changes little when the price changes.\n\nIt follows that movements in price are driven mainly from the supply side, by the amount of capital that insurers are willing to commit.",
        scene: (v) => {
          const lux = Math.max(0, 100 - v.up * 1.4), must = Math.max(0, 100 - v.up * 0.15);
          return bars([
            { label: "A luxury: buyers left", right: pct(lux), segs: [[lux, "c2"]] },
            { label: "Compulsory insurance: buyers left", right: pct(must), segs: [[must, "c1"]] }
          ], { max: 100 });
        },
        ctl: [{ k: "up", label: "Price increase", min: 0, max: 60, step: 5, fmt: (x) => `+${x}%` }],
        live: () => "A price rise does not produce an equal fall in demand when the buyer has little choice. So insurance prices are driven mainly from the **supply** side: by how much capital is chasing the business.",
        goal: {
          say: "Raise the price until the luxury has lost more than half its buyers. How many has compulsory insurance lost?",
          test: (v) => v.up >= 40,
          done: "The luxury has lost most of its market; compulsory cover has lost about one buyer in sixteen. When buyers cannot walk away, price is set by how many sellers are competing."
        }
      },
      {
        h: "The phases of the cycle",
        say: "The **insurance cycle** is the recurring alternation between two market conditions. When insurers are profitable, capital is attracted into the market, competition intensifies and prices fall: a **soft market**. In time premiums become inadequate to meet claims; insurers make losses, capital is withdrawn, and with less capacity available prices rise: a **hard market**. Profitability returns and the sequence begins again.\n\nThe diagram should be read clockwise from the top left.",
        scene: () => loop(),
        ask: {
          q: "Premiums have fallen for five years and no longer cover claims. What comes next?",
          opts: [
          ["New insurers pile in, attracted by the growth.", "Capital chases profit, and there is none. Entrants arrive after prices rise."],
          "Insurers lose money, some withdraw, and prices rise.",
          ["Prices go on falling until cover is nearly free.", "Somebody has to pay the claims. When capital runs short, the selling stops."],
          ["Regulators set a minimum price.", "UK regulators do not fix commercial insurance prices. The correction comes from capital leaving."]
        ],
          a: 1,
          why: "Losses are what turn a soft market. Capital leaves, capacity shrinks, and those who remain can charge more. The discipline to hold your price *before* that point is what separates good underwriters from the cycle’s victims."
        }
      },
      {
        h: "A model of the cycle",
        say: "The model below is a deliberately simple market in which rates fall when capital is plentiful and rise when it is scarce. Two features can be varied: the size of a catastrophe in year 4, and the degree of **underwriting discipline**, meaning the willingness of underwriters to decline business that is inadequately priced instead of following the market down.",
        scene: (v) => {
          const r = run(v), rs = r.rate.map((p) => p[1]), cs = r.cor.map((p) => p[1]);
          return stats([["Price swing", `${Math.round(Math.max(...rs) - Math.min(...rs))} pts`], ["Worst year", `${Math.round(Math.max(...cs))}%`, Math.max(...cs) > 105 ? "bad" : ""], ["Best year", `${Math.round(Math.min(...cs))}%`, "good"]]) +
            plot({ h: 180, x: { min: 1, max: 12, ticks: [1, 4, 8, 12], title: "Year" }, y: { min: 60, max: 160, ticks: [60, 100, 140] },
              refs: [{ y: 100, label: "Break-even", left: true }].concat(v.shock ? [{ x: 4, label: "Catastrophe" }] : []),
              series: [{ tone: "c1", pts: r.rate }, { tone: "bad", dash: true, pts: r.cor }], legend: [["c1", "Price level"], ["bad", "Claims + costs, % of premium"]] });
        },
        ctl: [{ k: "shock", label: "Catastrophe in year 4", min: 0, max: 70, step: 10, fmt: (x) => (x ? `${x}% of capital` : "none") }, { k: "disc", label: "Underwriting discipline", min: 0, max: 90, step: 10, fmt: pct }],
        live: (v) => (v.shock ? "The catastrophe destroys capital overnight. Capacity shrinks and prices jump: the soft market turns hard in a single season, instead of drifting there." : "Even with no catastrophe the market cycles by itself, slowly. The cycle is built into how capital comes and goes.") + (v.disc >= 50 ? " Discipline flattens the swings: less ground lost in the soft years, less to recover." : ""),
        goal: {
          say: "Keep a catastrophe of at least 40% of capital. Find a level of discipline at which the market never has a loss-making year.",
          test: (v) => v.shock >= 40 && Math.max(...run(v).cor.map((p) => p[1])) <= 100,
          done: "It takes almost total discipline. Underwriters who refuse to chase rates down in the good years do not have to climb back out of a hole afterwards. Real markets never manage this, which is why the cycle exists."
        }
      },
      {
        h: "What turns a market",
        say: "A soft market may persist for many years, since reserves and investment income can conceal inadequate pricing for some time. Three kinds of event tend to end it abruptly: very large **natural catastrophes**, which destroy capital; **changes in the law** that increase the cost of policies already written; and other **major events** that undermine confidence in the adequacy of reserves.",
        scene: () => loop(["l", "x", "h"]),
        ask: {
          q: "A record hurricane season hits property insurers hard. What is the most likely result next year?",
          opts: [
          ["Rates rise in every class together.", "Each class has its own cycle. Marine hull did not lose money in the hurricanes."],
          "Property rates rise; other classes may hardly move.",
          ["Property rates fall as insurers compete to win back income.", "Losses remove capital. With less capacity chasing the business, prices go up, not down."],
          ["Nothing changes: the claims are already paid.", "The claims are paid out of capital, and less capital means less capacity."]
        ],
          a: 1,
          why: "Capital destroyed in one class tightens that class. A hard property market can sit beside a soft marine one, though a big enough loss can drain capital that supports several classes at once."
        }
      },
      {
        h: "Summary",
        say: "The cycle is examined again in LM2 and LM3, from the point of view of the underwriter who must price through it.",
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
