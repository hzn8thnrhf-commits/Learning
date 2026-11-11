/* LM3 · 3 — Risk appetite and capital */
(() => {
  const { bars, flow, stats, recap, plot, money, pct, num } = window.SLIP.kit;
  const RP = [10, 25, 50, 100, 200, 500];
  const KIND = [
    ["Motor", 30, "Many small, predictable claims. Little capital is needed for each £1 of premium, so a thin margin still pays."],
    ["Commercial property", 60, "Mostly steady, with the occasional large fire or storm. A middling amount of capital."],
    ["Catastrophe reinsurance", 120, "Quiet for years, then a loss many times the premium. The capital needed can exceed the premium itself, so only a wide margin justifies it."]
  ];

  window.SLIP.chapters.push({
    id: "appetite", part: "LM3",
    title: "Risk appetite and capital",
    blurb: "How much an insurer is prepared to lose, how that becomes limits on an underwriter’s desk, and what capital costs.",
    minutes: 10,
    init: { rp: 4, yrs: 30, rho: 20, cr: 92, kind: 1 },
    steps: [
      {
        h: "Appetite comes first",
        say: "Investors decide how much they are prepared to lose in pursuit of a return: their **risk appetite**. The board writes it down and approves it. Everything else, the strategy, the business plan and the capital, must fit inside it.",
        scene: () => flow({
          h: 170,
          nodes: [
            { id: "a", x: 95, y: 4, label: "Risk appetite", sub: "Set by the board", tone: "ink" },
            { id: "s", x: 4, y: 100, w: 104, label: "Strategy" }, { id: "p", x: 118, y: 100, w: 104, label: "Business plan", tone: "c1" }, { id: "c", x: 232, y: 100, w: 104, label: "Capital" }
          ],
          edges: [["a", "s"], ["a", "p"], ["a", "c"]]
        }),
        ask: {
          q: "A cautious pension fund backs a syndicate whose plan is 80% US hurricane reinsurance. What is wrong?",
          opts: ["Nothing, if the rates are good.", "The strategy doesn’t match the investor’s appetite."],
          a: 1,
          why: "Catastrophe business pays well in quiet years and can lose much of the capital in one. A plan can be perfectly sound and still be the wrong plan for its backers."
        }
      },
      {
        h: "Every kind of risk",
        say: "The risks aren’t only the ones underwriters take. **Enterprise risk management** looks at all of them together, because they interact.\n\n**Insurance risk** has two halves: *underwriting* (this year’s business costs more than priced) and *reserving* (past years cost more than set aside). Then **market**, **credit**, **liquidity** and **operational** risk, and around them all, **strategic** and **reputational** risk.",
        scene: () => flow({
          h: 190,
          nodes: [
            { id: "u", x: 4, y: 4, w: 150, label: "Underwriting", sub: "This year’s business", tone: "c1" }, { id: "r", x: 186, y: 4, w: 150, label: "Reserving", sub: "Past years’ claims", tone: "c1" },
            { id: "m", x: 4, y: 72, w: 104, label: "Market" }, { id: "cr", x: 118, y: 72, w: 104, label: "Credit" }, { id: "l", x: 232, y: 72, w: 104, label: "Liquidity" },
            { id: "o", x: 4, y: 130, w: 150, label: "Operational", sub: "People, systems, fraud" }, { id: "s", x: 186, y: 130, w: 150, label: "Strategic", sub: "Wrong plan, lost trust" }
          ]
        }),
        ask: {
          q: "A syndicate discovers its 2019 liability claims will cost £30m more than it set aside. Nothing new was written. Which risk is this?",
          opts: ["Underwriting risk.", "Reserving risk.", "Market risk."],
          a: 1,
          why: "The business was written years ago; what has moved is the estimate of its cost. For long-tail insurers, reserving risk can be larger than the risk in the current year’s underwriting."
        }
      },
      {
        h: "From a sentence to a desk",
        say: "An appetite statement is useless until it reaches the person holding the pen. It is translated in three stages.\n\n**Appetite:** “We will not lose more than 15% of capital in a 1-in-200 year.”\n\n**Tolerance:** “So our net loss from a Florida windstorm at 1-in-200 must stay under £60m.”\n\n**Limit:** “So no line above £5m on any Florida risk, and no more than £150m of Florida limits in total.”",
        scene: () => flow({
          h: 230,
          nodes: [
            { id: "a", x: 95, y: 4, label: "Appetite", sub: "The board’s sentence", tone: "ink" },
            { id: "t", x: 95, y: 74, label: "Tolerance", sub: "A number per risk type" },
            { id: "l", x: 95, y: 144, label: "Limit", sub: "On the underwriter’s desk", tone: "c1" }
          ],
          edges: [["a", "t"], ["t", "l"]]
        }),
        ask: {
          q: "Every Florida risk written is within the £5m line limit. Yet the £150m total is breached. Who slipped?",
          opts: ["Nobody: each risk was within authority.", "Whoever should have been watching the total."],
          a: 1,
          why: "A line limit controls one risk; only an **aggregate** limit, monitored across the book, controls a portfolio. Forty perfectly authorised £5m lines make a £200m accumulation."
        }
      },
      {
        h: "Return periods",
        say: "Appetite is often stated as a **return period**: “we can survive a 1-in-200-year event”. That means a **0.5% chance in any one year**, not that it happens once every 200 years on schedule.\n\nPeople hear “1 in 200” and think “never”. Try it over a working lifetime.",
        scene: (v) => {
          const T = RP[v.rp], p = 1 - Math.pow(1 - 1 / T, v.yrs);
          const pts = Array.from({ length: 41 }, (_, i) => [i, (1 - Math.pow(1 - 1 / T, i)) * 100]);
          return stats([["Chance in one year", pct(100 / T, T > 100 ? 1 : 0)], [`Chance within ${v.yrs} years`, pct(p * 100), p > 0.25 ? "bad" : ""]]) +
            plot({ h: 170, x: { min: 0, max: 40, ticks: [0, 10, 20, 30, 40], title: "Years" }, y: { min: 0, max: 100, ticks: [0, 50, 100], fmt: (x) => `${x}%` },
              series: [{ tone: "c1", pts }], dots: [{ x: v.yrs, y: p * 100, tone: "bad" }], refs: [{ x: v.yrs, label: `${v.yrs} years`, left: v.yrs > 28 }] });
        },
        ctl: [{ k: "rp", label: "Event", min: 0, max: RP.length - 1, step: 1, fmt: (i) => `1 in ${RP[i]} years` }, { k: "yrs", label: "Period you care about", min: 1, max: 40, step: 1, fmt: (x) => `${x} years` }],
        live: (v) => {
          const T = RP[v.rp], p = (1 - Math.pow(1 - 1 / T, v.yrs)) * 100;
          return `A 1-in-${T} event has a **${pct(p)}** chance of happening at least once in ${v.yrs} years. It can also happen two years running: each year is a fresh draw.`;
        }
      },
      {
        h: "How much capital?",
        say: "Regulatory capital is set at about a 1-in-200 standard: enough to survive the worst year in two hundred.\n\nAn insurer writes two classes. Alone, property needs £80m of capital and casualty £60m. Together they need less than £140m, because their bad years rarely coincide. That saving is the **diversification benefit**, and it depends on how closely the two move together.",
        scene: (v) => {
          const r = v.rho / 100, tot = Math.sqrt(80 * 80 + 60 * 60 + 2 * r * 80 * 60), ben = 140 - tot;
          return stats([["Standalone", "£140m"], ["Together", money(tot), "c1"], ["Benefit", money(ben), ben < 8 ? "bad" : "good"]]) +
            bars([
              { label: "Each class alone", right: "£140m", segs: [[80, "c1", "Property"], [60, "c2", "Casualty"]] },
              { label: "Combined", right: money(tot), segs: [[tot, "c3", "Capital needed"], [ben, "idle", "Saved"]] }
            ], { max: 140 });
        },
        ctl: [{ k: "rho", label: "How closely the classes move together", min: 0, max: 100, step: 10, fmt: (x) => (x === 0 ? "independent" : x === 100 ? "in lockstep" : `${x}%`) }],
        live: (v) => (v.rho >= 70 ? "When the classes move together there is almost nothing to save. And correlations **rise in a crisis**: a hurricane hits property, then liability, then investments. Diversification is weakest exactly when it is needed." : v.rho <= 20 ? "Nearly independent classes save a great deal of capital. This is the financial argument for a mixed book, and why a plan’s capital changes when its mix changes." : "A partial benefit. Capital models spend much of their effort on this one assumption.")
      },
      {
        h: "What capital costs",
        say: "Capital isn’t free: investors want a return on it, the **hurdle rate**, here 10%. Classes need very different amounts of capital for the same premium, so the same combined ratio can be excellent in one class and inadequate in another.\n\n£100m of premium. Choose the class and the result.",
        scene: (v) => {
          const cap = KIND[v.kind][1], profit = 100 - v.cr + 3, roc = (profit / cap) * 100;
          return stats([["Profit", money(profit), profit < 0 ? "bad" : ""], ["Capital needed", money(cap)], ["Return on capital", pct(roc, 1), roc < 10 ? "bad" : "good"]]) +
            bars([{ label: "Return on capital", right: pct(roc, 1), segs: [[Math.max(roc, 0), roc < 10 ? "bad" : "c1"]] }], { max: 40, marks: [[10, "Hurdle 10%"]] });
        },
        ctl: [{ k: "kind", label: "Class", opts: ["Motor", "Property", "Cat"] }, { k: "cr", label: "Combined ratio", min: 80, max: 104, step: 1, fmt: pct }],
        live: (v) => `**${KIND[v.kind][0]}.** ${KIND[v.kind][2]} Profit here includes £3m of investment income.`
      },
      {
        h: "The firm’s own assessment",
        say: "Regulators don’t want capital to be a number the actuaries produce and nobody else reads. The **Own Risk and Solvency Assessment** (ORSA) is the firm’s own, forward-looking view of its risks and the capital it needs over the plan period, owned by the board.\n\nIt came from Solvency II; the UK regulators now set their own requirements, on the same idea.",
        scene: () => flow({
          h: 150,
          nodes: [
            { id: "r", x: 4, y: 4, w: 104, label: "Risks" }, { id: "p", x: 118, y: 4, w: 104, label: "The plan" }, { id: "c", x: 232, y: 4, w: 104, label: "Capital" },
            { id: "o", x: 95, y: 100, label: "ORSA", sub: "The board’s own view", tone: "c1" }
          ],
          edges: [["r", "o"], ["p", "o"], ["c", "o"]]
        }),
        ask: {
          q: "A board approves a plan to double premium. Its ORSA still shows last year’s capital need. What has gone wrong?",
          opts: ["Nothing. The ORSA is an annual document.", "The ORSA should move whenever the plan or the risks do."],
          a: 1,
          why: "The point of the ORSA is to connect decisions to capital. A plan that doubles exposure without revisiting capital is precisely the failure it exists to prevent."
        }
      },
      {
        h: "In five lines",
        say: "Next: turning the appetite into a plan.",
        scene: () => recap([
          "Risk appetite is set by the board; strategy, plan and capital must fit inside it.",
          "Appetite becomes tolerances, and tolerances become limits on line size and aggregates.",
          "A 1-in-200 event has a 0.5% chance every year, and adds up over time.",
          "Mixing classes saves capital, but less in a crisis.",
          "A class is good only if its profit beats the cost of the capital it uses."
        ])
      }
    ]
  });
})();
