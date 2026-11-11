/* LM3 · 3 — Business planning */
(() => {
  const { bars, flow, stats, recap, wfall, plot, money, pct, num } = window.SLIP.kit;
  const RP = [10, 25, 50, 100, 200, 500];
  const MON = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  window.SLIP.chapters.push({
    id: "planning", part: "LM3",
    title: "Business planning",
    blurb: "Risk appetite, return periods, the business plan and how to read an insurer’s accounts.",
    minutes: 10,
    init: { rp: 4, yrs: 30, cat: 0, m: 6, loss: 60, exp: 35, inv: 3 },
    steps: [
      {
        h: "Appetite comes first",
        say: "Investors decide how much they are prepared to lose in pursuit of a return: their **risk appetite**. The plan must fit inside it.\n\nAnd the risks aren’t only insurance ones. **Enterprise risk management** looks at everything together: underwriting, reserving, investments, counterparties, operations, reputation.",
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
        h: "The plan and its stress test",
        say: "A business plan sets out what the insurer will write: classes, premium, expected claims, reinsurance, expenses. Lloyd’s must approve every syndicate’s plan, and its Principles expect plans to be realistic.\n\nA plan is a forecast, so it is **stress tested**: what if a catastrophe hits, or rates fall?",
        scene: (v) => wfall([{ label: "Premium", v: 200 }, { label: "Expected claims", v: -110 }, { label: v.cat ? "Catastrophe, net" : "Catastrophe", v: v.cat ? -40 : 0 }, { label: "Expenses", v: -70 }, { label: "Result", total: true }], { fmt: (x) => `£${num(x, 0)}m` }),
        ctl: [{ k: "cat", label: "Scenario", opts: ["As planned", "Major catastrophe"] }],
        live: (v) => (v.cat ? "One event turns a £20m profit into a £20m loss. The board’s question isn’t “will this happen?” but “**could we absorb it** and carry on?”" : "The plan as written: a 90% combined ratio and a £20m profit. Every number in it is an assumption.")
      },
      {
        h: "Monitor, and change course",
        say: "A plan isn’t filed and forgotten. Actual figures are compared with plan through the year and reported to the board, to regulators, and at Lloyd’s to the Corporation.\n\nPlans **can and should be changed mid-year** when the facts change.",
        scene: () => bars([
          { label: "Property, to June", right: "on plan", segs: [[50, "c1", "Actual"]] },
          { label: "Cyber, to June", right: "90% of the year’s plan already", segs: [[90, "bad", "Actual"]] }
        ], { max: 100, marks: [[50, "Half-year plan"]] }),
        ask: {
          q: "By June the cyber team has written 90% of its annual planned premium. What should happen?",
          opts: ["Celebrate: they are ahead.", "Ask why, and either stop or get a revised plan approved."],
          a: 1,
          why: "Writing far ahead of plan can mean prices are too cheap, and it means more exposure than the capital was set for. At Lloyd’s, exceeding an approved plan without agreement is a serious breach."
        }
      },
      {
        h: "Three statements",
        say: "**Financial accounts** face outwards: investors, regulators, rating agencies. **Management accounts** face inwards and are more detailed and frequent.\n\nThe financial accounts hold three statements. The **income statement**: profit or loss over a period. The **cash flow statement**: actual cash in and out. The **balance sheet**: what is owned and owed on one day.",
        scene: () => bars([
          { label: "Assets", right: "£500m", segs: [[500, "c1", "Investments, cash, amounts due"]] },
          { label: "Liabilities + equity", right: "£500m", segs: [[380, "c2", "Liabilities: mostly claims reserves"], [120, "c3", "Equity"]] }
        ], { max: 500 }),
        ask: {
          q: "An insurer made a large profit last year but can’t pay a big claim this month. Which measure failed?",
          opts: ["Profitability.", "Liquidity.", "Solvency."],
          a: 1,
          why: "**Profitability:** did it make money? **Solvency:** do assets exceed liabilities? **Liquidity:** can it find cash when needed? An insurer can be profitable and solvent, yet stuck if its assets are tied up in property."
        }
      },
      {
        h: "Written is not earned",
        say: "A £1.2m annual premium isn’t income on day one. It is **earned** evenly as the cover is provided. At the year end, the part relating to cover still to come is **unearned** and held back.",
        scene: (v) => {
          const earned = (12 - v.m) / 12 * 1.2;
          return stats([["Written", "£1.2m"], ["Earned by 31 Dec", money(earned), "c1"], ["Unearned", money(1.2 - earned), "c2"]]) +
            bars([{ label: `Policy starting 1 ${MON[v.m]}`, segs: [[v.m, "none"], [12 - v.m, "c1", "Earned"], [v.m, "c2", "Unearned"]] }], { max: 24, marks: [[12, "Year end"]] });
        },
        ctl: [{ k: "m", label: "Policy starts", min: 0, max: 11, step: 1, fmt: (i) => `1 ${MON[i]}` }],
        live: (v) => (v.m === 0 ? "A January policy is fully earned by December." : `Only ${12 - v.m} of 12 months of cover have been given. The rest is a liability: if the policy were cancelled, that premium would go back. A fast-growing insurer always looks less profitable on an earned basis than on a written one.`)
      },
      {
        h: "The combined ratio",
        say: "The headline measure of underwriting performance. **Claims ratio** (claims ÷ earned premium) plus **expense ratio** (expenses ÷ premium). Under 100% is an underwriting profit.\n\nInvestment income on the premiums held comes on top.",
        scene: (v) => {
          const cr = v.loss + v.exp, res = 100 - cr + v.inv;
          return stats([["Combined ratio", pct(cr), cr > 100 ? "bad" : "good"], ["Underwriting", `${100 - cr >= 0 ? "+" : "−"}£${Math.abs(100 - cr)}`, cr > 100 ? "bad" : ""], ["With investments", `${res >= 0 ? "+" : "−"}£${Math.abs(res)}`, res < 0 ? "bad" : "good"]]) +
            bars([{ label: "Per £100 of earned premium", segs: [[v.loss, "c1", "Claims"], [v.exp, "c2", "Expenses"]] }], { max: 125, marks: [[100, "Break-even"]] });
        },
        ctl: [{ k: "loss", label: "Claims ratio", min: 40, max: 85, step: 1, fmt: pct }, { k: "exp", label: "Expense ratio", min: 25, max: 45, step: 1, fmt: pct }, { k: "inv", label: "Investment return on premium", min: 0, max: 10, step: 1, fmt: pct }],
        live: (v) => {
          const cr = v.loss + v.exp;
          return cr <= 100 ? "An underwriting profit before any investment income. This is the discipline Lloyd’s asks for." : cr - v.inv <= 100 ? "An underwriting loss rescued by investment income. This is **cash-flow underwriting**: it works until interest rates fall or claims arrive early." : "A loss even after investment income. Capital is being consumed.";
        }
      },
      {
        h: "In five lines",
        say: "Next: where the plan’s numbers come from.",
        scene: () => recap([
          "The plan must sit inside the investors’ risk appetite.",
          "A 1-in-200 event has a 0.5% chance every year, and adds up over time.",
          "Plans are stress tested, monitored, and changed when the facts change.",
          "Profitability, liquidity and solvency are three different questions.",
          "Combined ratio = claims ratio + expense ratio; premium counts only as it is earned."
        ])
      }
    ]
  });
})();
