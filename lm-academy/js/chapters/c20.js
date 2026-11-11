/* LM3 · 4 — Building the business plan */
(() => {
  const { bars, flow, stats, recap, wfall, money, pct, num } = window.SLIP.kit;
  const YEAR = [["A quiet year", 3, 0], ["An average year", 10, 8], ["A catastrophe year", 16, 40]];

  window.SLIP.chapters.push({
    id: "planning", part: "LM3",
    title: "Building the business plan",
    blurb: "Build a premium plan from last year’s book, plan the loss ratio, get from gross to net, then watch it meet reality.",
    minutes: 12,
    init: { ret: 85, rate: 5, expo: 0, nb: 15, rc: 5, inf: 6, yr: 1, ri: 1, cat: 0, cut: 0 },
    steps: [
      {
        h: "A plan is a cycle",
        say: "A business plan says what the insurer will write next year, at what price, with what reinsurance and capital, and with what expected result. Boards, capital providers, regulators, rating agencies and, for syndicates, Lloyd’s all rely on it.\n\nIt isn’t a document written once. It is a loop.",
        scene: () => flow({
          h: 190,
          nodes: [
            { id: "s", x: 4, y: 4, w: 104, label: "Strategy" }, { id: "p", x: 118, y: 4, w: 104, label: "Plan", tone: "c1" }, { id: "c", x: 232, y: 4, w: 104, label: "Capital" },
            { id: "m", x: 4, y: 130, w: 104, label: "Reforecast" }, { id: "w", x: 118, y: 130, w: 104, label: "Monitor" }, { id: "u", x: 232, y: 130, w: 104, label: "Underwrite" }
          ],
          edges: [["s", "p"], ["p", "c"], ["c", "u"], ["u", "w"], ["w", "m"], ["m", "s"]]
        })
      },
      {
        h: "Build the premium, don’t guess it",
        say: "A credible plan is built **bottom up** from last year’s £100m book. Four things move it: **retention** (how much renews), **rate change** (the price for the same risk), **exposure change** (clients growing or shrinking) and **new business**.",
        scene: (v) => {
          const kept = v.ret, afterRate = kept * (1 + v.rate / 100), afterExp = afterRate * (1 + v.expo / 100), total = afterExp + v.nb;
          return stats([["Plan premium", money(total), "c1"], ["Growth", `${total >= 100 ? "+" : "−"}${num(Math.abs(total - 100), 1)}%`], ["Of which rate", `${v.rate > 0 ? "+" : ""}${v.rate}%`]]) +
            wfall([{ label: "Expiring", v: 100 }, { label: "Not renewed", v: kept - 100 }, { label: "Rate change", v: afterRate - kept }, { label: "Exposure", v: afterExp - afterRate }, { label: "New business", v: v.nb }, { label: "Plan", total: true }], { fmt: (x) => `£${num(x, 0)}m` });
        },
        ctl: [
          { k: "ret", label: "Retention", min: 60, max: 95, step: 5, fmt: pct },
          { k: "rate", label: "Rate change", min: -15, max: 15, step: 5, fmt: (x) => `${x > 0 ? "+" : ""}${x}%` },
          { k: "expo", label: "Exposure change", min: -10, max: 20, step: 5, fmt: (x) => `${x > 0 ? "+" : ""}${x}%` },
          { k: "nb", label: "New business", min: 0, max: 40, step: 5, fmt: money }
        ],
        live: (v) => {
          const total = v.ret * (1 + v.rate / 100) * (1 + v.expo / 100) + v.nb;
          return v.rate < 0 && total > 100 ? "The book is **growing while rates fall**: more risk taken on at a lower price. This is the combination reviewers at Lloyd’s look for first." : v.nb >= 30 ? "A lot rests on new business, which is the least certain line in any plan and usually the worst-performing in its first year: you know least about it." : "Each bar is an assumption someone must be able to defend: with broker pipeline for new business, with market evidence for rate.";
        }
      },
      {
        h: "Growth is not rate",
        say: "Premium going up tells you nothing by itself. What matters is *why*.",
        scene: () => bars([
          { label: "Book A: +10% premium", right: "rate +10%, same risks", segs: [[100, "c1", "Exposure"], [10, "c3", "Rate"]] },
          { label: "Book B: +10% premium", right: "rate −5%, more risks", segs: [[116, "bad", "Exposure up 16%"]] }
        ], { max: 120, marks: [[100, "Last year’s exposure"]] }),
        ask: {
          q: "Two books each grew premium by 10%. In A, rates rose 10%. In B, rates fell 5%. Which is in better shape?",
          opts: ["They are the same: +10% each.", "A. B is carrying about 16% more risk for only 10% more money."],
          a: 1,
          why: "A is paid 10% more for the same risk. B had to take on roughly 16% more exposure to grow premium 10% at lower prices. Rate change must also be measured **like for like**: a “flat” renewal with a halved deductible is a rate cut."
        }
      },
      {
        h: "Planning the loss ratio",
        say: "Start from history, then bring it up to date. Last year’s claims ratio was 60%. Two things have changed since: the **price** charged for the same risk, and the **cost** of the same claim.\n\nRestating old years at today’s prices and costs is called **on-levelling**.",
        scene: (v) => {
          const lr = 60 * (1 + v.inf / 100) / (1 + v.rc / 100);
          return stats([["Last year", "60%"], ["On-levelled", pct(lr, 1), lr > 62 ? "bad" : lr < 58 ? "good" : ""]]) +
            bars([
              { label: "Last year, as it was", right: "60%", segs: [[60, "soft1", "Claims"]] },
              { label: "The same book next year", right: pct(lr, 1), segs: [[lr, lr > 62 ? "bad" : "c1", "Claims"]] }
            ], { max: 90 });
        },
        ctl: [{ k: "rc", label: "Rate change since", min: -10, max: 15, step: 1, fmt: (x) => `${x > 0 ? "+" : ""}${x}%` }, { k: "inf", label: "Claims inflation since", min: 0, max: 12, step: 1, fmt: pct }],
        live: (v) => (v.inf > v.rc ? `Claims costs are rising faster than rates. The plan loss ratio must be **worse** than last year’s even if nothing else changes. Planning “60% again” would be optimism.` : v.inf === v.rc ? "Rate is exactly keeping pace with claims inflation: running to stand still." : "Rate is outrunning claims inflation, so the same book should produce a better ratio. Reviewers will ask for the evidence on both numbers.")
      },
      {
        h: "Three kinds of loss",
        say: "The plan loss ratio is built from three parts that behave differently.\n\n**Attritional:** the steady flow of ordinary claims. **Large:** individual big losses, a few a year. **Catastrophe:** events hitting many policies at once, planned at the model’s long-run average.\n\nThe plan says 45% + 10% + 8% = 63%. Now see some actual years.",
        scene: (v) => {
          const [, lg, ct] = YEAR[v.yr], tot = 45 + lg + ct;
          return stats([["Plan", "63%"], ["This year", pct(tot), tot > 70 ? "bad" : tot < 60 ? "good" : ""]]) +
            bars([
              { label: "Plan", right: "63%", segs: [[45, "c1", "Attritional"], [10, "c2", "Large"], [8, "c3", "Cat"]] },
              { label: YEAR[v.yr][0], right: pct(tot), segs: [[45, "c1", "Attritional"], [lg, "c2", "Large"], [ct, "bad", "Cat"]] }
            ], { max: 105, legend: [["c1", "Attritional"], ["c2", "Large"], ["c3", "Catastrophe"]] });
        },
        ctl: [{ k: "yr", label: "What actually happens", opts: ["Quiet", "Average", "Cat year"] }],
        live: (v) => ["Most years look like this: comfortably better than plan. It is tempting to call that skill and release the catastrophe load as profit. It isn’t skill; the bill simply hasn’t arrived.", "The year the plan describes. It almost never happens: the “average” catastrophe year is a blend of many quiet years and a few terrible ones.", "The year that pays for all the quiet ones. A good plan shows this range of outcomes, not just the single expected number."][v.yr]
      },
      {
        h: "From gross to net",
        say: "The plan then moves from gross premium to net result: acquisition costs, claims, expenses, and the **net cost of reinsurance** (premium ceded, less the recoveries expected back).\n\nReinsurance costs £20m here and, in an average year, returns £12m. See what it does in each kind of year.",
        scene: (v) => {
          const claims = v.cat ? 170 : 126, rec = v.ri ? (v.cat ? 50 : 12) : 0, cost = v.ri ? 20 : 0;
          return wfall([{ label: "Gross premium", v: 200 }, { label: "Brokerage", v: -40 }, { label: "Gross claims", v: -claims }, { label: "Expenses", v: -24 }, { label: "Reinsurance paid", v: -cost }, { label: "Recoveries", v: rec }, { label: "Net result", total: true }], { fmt: (x) => `£${num(x, 0)}m` });
        },
        ctl: [{ k: "ri", label: "Reinsurance", opts: ["None", "Bought"] }, { k: "cat", label: "The year", opts: ["Average", "Catastrophe"] }],
        live: (v) => {
          const res = 200 - 40 - (v.cat ? 170 : 126) - 24 - (v.ri ? 20 : 0) + (v.ri ? (v.cat ? 50 : 12) : 0);
          return v.cat ? (v.ri ? `With reinsurance the catastrophe year loses **${money(-res)}**. Without it, £34m. That £30m of protection is what the premium bought.` : `Unprotected, the catastrophe year loses **${money(-res)}**.`)
            : (v.ri ? `In an average year reinsurance **lowers** the result, to ${money(res)} from £10m. It normally costs more than it returns: you are paying to cut the bad years down, not to make money.` : `Without reinsurance the average year makes ${money(res)}. Better on paper. Switch to the catastrophe year.`);
        }
      },
      {
        h: "Approval at Lloyd’s",
        say: "A syndicate can’t simply adopt its plan. Each autumn the managing agent submits a **business forecast** and a **capital return** for the coming year of account. Lloyd’s reviews them against the syndicate’s record, market conditions and rate adequacy, with most attention on the syndicates and classes that worry it. The outcome sets the syndicate’s permitted premium and its capital.\n\nCompany insurers test their plans through their own boards, the ORSA and the PRA.",
        scene: () => flow({
          h: 190,
          nodes: [
            { id: "m", x: 95, y: 4, label: "Managing agent", sub: "Forecast and capital return", tone: "ink" },
            { id: "l", x: 95, y: 74, label: "Lloyd’s reviews", sub: "Record, market, rate" },
            { id: "a", x: 4, y: 144, w: 150, label: "Approved", sub: "Premium limit, capital set", tone: "good" }, { id: "r", x: 186, y: 144, w: 150, label: "Challenged", sub: "Cut, or more capital", tone: "bad" }
          ],
          edges: [["m", "l"], ["l", "a"], ["l", "r"]]
        }),
        ask: {
          q: "A syndicate that lost money in cyber for three years plans to grow cyber by 30%. What is the likely response?",
          opts: ["Approval: growth is good for the market.", "Challenge: show why the future differs from the past, or the growth is cut."],
          a: 1,
          why: "A plan is judged against the record of the people making it. Unexplained growth in a loss-making class is the classic sign of an unrealistic plan, and may also attract a capital loading."
        }
      },
      {
        h: "Meeting reality",
        say: "Through the year, actual premium, rate, retention, claims and exposure are compared with plan. Every **variance** needs an explanation, because the same number can mean success or trouble.",
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
        h: "Reforecast, but keep the plan",
        say: "When the facts change, the insurer produces a **reforecast**: its updated expectation of how the year will end. Plans can and should be formally changed mid-year when the change is real.\n\nBut the original plan stays as the benchmark. Otherwise every miss is quietly erased.",
        scene: () => bars([
          { label: "Plan", right: "£200m", segs: [[200, "soft1", "Agreed in November"]] },
          { label: "Reforecast, June", right: "£170m", segs: [[170, "c1", "Now expected"], [30, "hole", "Shortfall to explain"]] }
        ], { max: 200 }),
        ask: {
          q: "Rates fall 15% in March. The class underwriter proposes simply lowering the plan to match. Reasonable?",
          opts: ["Yes. The plan was wrong.", "Reforecast, but report against the original plan as well."],
          a: 1,
          why: "The reforecast tells the board where the year is heading. The original plan tells it how far reality has moved from what was approved, and whether expenses and capital still fit."
        }
      },
      {
        h: "When results fall short",
        say: "A class is running at a 100.5% combined ratio. Diagnosis shows the worst 30% of the book runs at a 90% claims ratio; the rest at 55%. The obvious remedy is to **re-underwrite**: stop renewing the bad part.\n\nBut the team’s costs don’t leave with the premium.",
        scene: (v) => {
          const prem = 100 - v.cut, claims = 70 * 0.55 + (30 - v.cut) * 0.9, exp = 20 + 0.15 * prem, lr = (claims / prem) * 100, er = (exp / prem) * 100;
          return stats([["Premium", money(prem)], ["Claims ratio", pct(lr, 1), "c1"], ["Expense ratio", pct(er, 1), "c2"], ["Combined", pct(lr + er, 1), lr + er > 100 ? "bad" : "good"]]) +
            bars([{ label: "Per £100 of premium", segs: [[lr, "c1", "Claims"], [er, "c2", "Expenses"]] }], { max: 110, marks: [[100, "Break-even"]] });
        },
        ctl: [{ k: "cut", label: "Poor business not renewed", min: 0, max: 30, step: 5, fmt: money }],
        live: (v) => (v.cut === 0 ? "Before any action: the good business is subsidising the bad." : v.cut < 30 ? "The claims ratio improves, but the expense ratio **rises**: the same fixed costs are spread over less premium. Remediation shrinks the top line before it improves the bottom line." : "All the poor business has gone and the class is back in profit, by less than the claims ratio alone suggests. Unless costs come down too, most of the gain is given back. If no version of the class earns its cost of capital over the cycle, the right answer is **exit**.")
      },
      {
        h: "In five lines",
        say: "Next: the accounts that keep the score.",
        scene: () => recap([
          "Premium is built from retention, rate, exposure and new business.",
          "Growth with falling rates means more risk for less money.",
          "The loss ratio is on-levelled history, split into attritional, large and catastrophe.",
          "Reinsurance lowers the expected result to cut down the bad years.",
          "Monitor against the original plan; shrinking a class raises its expense ratio."
        ])
      }
    ]
  });
})();
