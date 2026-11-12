/* LM3 · 5 — Building the business plan */
(() => {
  const { bars, flow, stats, recap, wfall, money, pct, num } = window.SLIP.kit;
  const YEAR = [["A quiet year", 3, 0], ["An average year", 10, 8], ["A catastrophe year", 16, 40]];

  window.SLIP.chapters.push({
    id: "planning", part: "LM3",
    title: "Building the business plan",
    blurb: "The construction of a premium and loss ratio plan, the passage from gross to net, approval at Lloyd’s, and the monitoring and remediation that follow.",
    minutes: 12,
    lead: "A business plan states what an insurer intends to write, at what price and with what result. This chapter constructs one, component by component, and then follows it through the year.",
    aims: [
      "Construct a premium plan from retention, rate change, exposure change and new business.",
      "Explain on-levelling and the attritional, large and catastrophe components of a planned loss ratio.",
      "Explain the net cost of reinsurance and why reinsurance is bought although it reduces the expected result.",
      "Describe plan approval at Lloyd’s, the monitoring of variances and the consequences of remediation."
    ],
    init: { ret: 85, rate: 5, expo: 0, nb: 15, rc: 5, inf: 6, yr: 1, ri: 1, cat: 0, cut: 0 },
    steps: [
      {
        h: "The planning cycle",
        say: "A **business plan** sets out the business an insurer intends to write in the coming year: the classes, the premium, the expected claims, the reinsurance to be purchased, the expenses and the resulting profit and capital requirement. It is relied upon by the board, by capital providers, by regulators and rating agencies, and, in the case of a syndicate, by Lloyd’s.\n\nPlanning is not a single event. It is a recurring cycle in which each year’s experience informs the next year’s plan.",
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
        h: "The premium plan",
        say: "A credible premium plan is constructed **from the expiring book upwards** and not by selecting a target. Four factors determine it: **retention**, the proportion of expiring premium that renews; **rate change**, the change in price for an unchanged risk; **exposure change**, growth or contraction in the risks renewed; and **new business**.\n\nThe expiring book is £100m.",
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
        },
        goal: {
          say: "Rates are falling 10%. Build a plan that still reaches £100m. What did you have to assume?",
          test: (v) => v.rate === -10 && v.ret * (1 + v.rate / 100) * (1 + v.expo / 100) + v.nb >= 100,
          done: "You needed some mix of clients staying, clients growing and new clients arriving, all while charging them less. Every one of those is more risk for a lower price. This is the plan a reviewer at Lloyd’s reads most carefully."
        }
      },
      {
        h: "Growth distinguished from rate",
        say: "An increase in premium is not in itself evidence of improvement. Premium is the product of price and exposure, and the two have opposite implications: a higher price for the same risk improves the expected result, while more risk at the same price merely enlarges it.",
        scene: () => bars([
          { label: "Book A: +10% premium", right: "rate +10%, same risks", segs: [[100, "c1", "Exposure"], [10, "c3", "Rate"]] },
          { label: "Book B: +10% premium", right: "rate −5%, more risks", segs: [[116, "bad", "Exposure up 16%"]] }
        ], { max: 120, marks: [[100, "Last year’s exposure"]] }),
        ask: {
          q: "Two books each grew premium by 10%. In A, rates rose 10%. In B, rates fell 5%. Which is in better shape?",
          opts: [
          ["The same: +10% each.", "Same premium growth, very different amounts of risk taken on to get it."],
          "A. B is carrying about 16% more risk for 10% more money.",
          ["B. More clients means a better spread.", "A wider spread does not help if each risk is under-priced. It just loses money more smoothly."]
        ],
          a: 1,
          why: "A is paid 10% more for the same risk. B had to take on roughly 16% more exposure to grow at lower prices (1.10 ÷ 0.95). Rate change must also be measured **like for like**: a “flat” renewal with a halved deductible is a rate cut."
        }
      },
      {
        h: "Planning the loss ratio",
        say: "The planned loss ratio begins with past experience, restated to current conditions. Two things will have changed since the historical period: the **rate** charged for a given risk, and the **cost** of a given claim.\n\nThe adjustment of historical loss ratios for subsequent changes in rate and claims cost is called **on-levelling**. Last year’s claims ratio was 60%.",
        scene: (v) => {
          const lr = 60 * (1 + v.inf / 100) / (1 + v.rc / 100);
          return stats([["Last year", "60%"], ["On-levelled", pct(lr, 1), lr > 62 ? "bad" : lr < 58 ? "good" : ""]]) +
            bars([
              { label: "Last year, as it was", right: "60%", segs: [[60, "soft1", "Claims"]] },
              { label: "The same book next year", right: pct(lr, 1), segs: [[lr, lr > 62 ? "bad" : "c1", "Claims"]] }
            ], { max: 90 });
        },
        ctl: [{ k: "rc", label: "Rate change since", min: -10, max: 15, step: 1, fmt: (x) => `${x > 0 ? "+" : ""}${x}%` }, { k: "inf", label: "Claims inflation since", min: 0, max: 12, step: 1, fmt: pct }],
        live: (v) => (v.inf > v.rc ? `Claims costs are rising faster than rates. The plan loss ratio must be **worse** than last year’s even if nothing else changes. Planning “60% again” would be optimism.` : v.inf === v.rc ? "Rate is exactly keeping pace with claims inflation: running to stand still." : "Rate is outrunning claims inflation, so the same book should produce a better ratio. Reviewers will ask for the evidence on both numbers."),
        goal: {
          say: "Claims inflation is running at 8%. Find the rate change needed just to hold the claims ratio at 60%.",
          test: (v) => v.inf === 8 && v.rc === 8,
          done: "+8%, merely to stand still. A plan that assumes 60% again on rate increases of 3% is quietly assuming claims will get cheaper. Reviewers look for exactly that."
        }
      },
      {
        h: "The components of the loss ratio",
        say: "A planned loss ratio is normally built from three components, since each behaves differently and is estimated by a different method.\n\n**Attritional** losses are the regular flow of ordinary claims. **Large** losses are individual claims above a defined threshold. **Catastrophe** losses arise from events affecting many policies at once, and are planned at the long-run annual average indicated by a model.\n\nThe plan assumes 45% + 10% + 8% = 63%. Compare it with the years that might in fact occur.",
        scene: (v) => {
          const [, lg, ct] = YEAR[v.yr], tot = 45 + lg + ct;
          return stats([["Plan", "63%"], ["This year", pct(tot), tot > 70 ? "bad" : tot < 60 ? "good" : ""]]) +
            bars([
              { label: "Plan", right: "63%", segs: [[45, "c1", "Attritional"], [10, "c2", "Large"], [8, "c3", "Cat"]] },
              { label: YEAR[v.yr][0], right: pct(tot), segs: [[45, "c1", "Attritional"], [lg, "c2", "Large"], [ct, "bad", "Cat"]] }
            ], { max: 105, legend: [["c1", "Attritional"], ["c2", "Large"], ["c3", "Catastrophe"]] });
        },
        ctl: [{ k: "yr", label: "What actually happens", opts: ["Quiet", "Average", "Cat year"] }],
        live: (v) => ["Most years look like this: comfortably better than plan. It is tempting to call that skill and release the catastrophe load as profit. It is not skill; the bill simply has not arrived.", "The year the plan describes. It almost never happens: the “average” catastrophe year is a blend of many quiet years and a few terrible ones.", "The year that pays for all the quiet ones. A good plan shows this range of outcomes, not just the single expected number."][v.yr]
      },
      {
        h: "From gross to net",
        say: "The plan proceeds from gross premium to net result by deducting acquisition costs, claims and expenses, and by allowing for the **net cost of reinsurance**: the premium ceded, less the recoveries expected.\n\nHere the reinsurance programme costs £20m and is expected to return £12m in an average year. Examine its effect in each kind of year.",
        scene: (v) => {
          const claims = v.cat ? 170 : 126, rec = v.ri ? (v.cat ? 50 : 12) : 0, cost = v.ri ? 20 : 0;
          return (v.$done ? stats([["Ten years, unprotected", "£56m"], ["Ten years, reinsured", "£14m", "c2"]]) : "") + wfall([{ label: "Gross premium", v: 200 }, { label: "Brokerage", v: -40 }, { label: "Gross claims", v: -claims }, { label: "Expenses", v: -24 }, { label: "Reinsurance paid", v: -cost }, { label: "Recoveries", v: rec }, { label: "Net result", total: true }], { fmt: (x) => `£${num(x, 0)}m` });
        },
        ctl: [{ k: "ri", label: "Reinsurance", opts: ["None", "Bought"] }, { k: "cat", label: "The year", opts: ["Average", "Catastrophe"] }],
        live: (v) => {
          const res = 200 - 40 - (v.cat ? 170 : 126) - 24 - (v.ri ? 20 : 0) + (v.ri ? (v.cat ? 50 : 12) : 0);
          return v.cat ? (v.ri ? `With reinsurance the catastrophe year loses **${money(-res)}**. Without it, £34m. That £30m of protection is what the premium bought.` : `Unprotected, the catastrophe year loses **${money(-res)}**.`)
            : (v.ri ? `In an average year reinsurance **lowers** the result, to ${money(res)} from £10m. It normally costs more than it returns: you are paying to cut the bad years down, not to make money.` : `Without reinsurance the average year makes ${money(res)}. Better on paper. Switch to the catastrophe year.`);
        },
        ask: {
          q: "Take ten years: nine average, one catastrophe. Which choice earns more in total?",
          opts: [
          ["Buying reinsurance: it saves £30m in the bad year.", "It does. It also costs £8m net in each of the nine good ones."],
          "Not buying it.",
          ["They come out the same.", "Reinsurers have costs and want a profit too. On average the buyer pays for both."]
        ],
          a: 1,
          why: "Without reinsurance: nine years at +£10m and one at −£34m is **£56m**. With it: nine at +£2m and one at −£4m is **£14m**. Reinsurance is bought despite that, because the insurer may not survive a £34m loss to enjoy the other nine years. You pay to be certain of still being there."
        }
      },
      {
        h: "Approval at Lloyd’s",
        say: "A syndicate’s plan requires the approval of Lloyd’s. Each autumn the managing agent submits a **syndicate business forecast** and a **capital return** for the coming year of account. Lloyd’s reviews them in the light of the syndicate’s past performance, market conditions and the adequacy of rates, concentrating on the syndicates and classes that give most concern. The outcome determines the premium the syndicate may write and the capital its members must provide.\n\nA company insurer’s plan is subject to the scrutiny of its own board, through the ORSA, and of the PRA.",
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
          q: "A syndicate that has lost money in cyber for three years plans to grow cyber by 30%. What is the likely response?",
          opts: [
          ["Approval: growth is good for the market.", "Lloyd’s wants profitable premium, not premium."],
          "Challenge: show why the future differs from the past, or the growth is cut.",
          ["Automatic rejection of the whole plan.", "Review is risk-based and negotiated. One class rarely sinks an entire plan."],
          ["Approval, but with a higher Central Fund contribution.", "The lever Lloyd’s uses is the plan itself and the syndicate’s capital."]
        ],
          a: 1,
          why: "A plan is judged against the record of the people making it. Unexplained growth in a loss-making class is the classic sign of an unrealistic plan, and may also attract a capital loading."
        }
      },
      {
        h: "Monitoring against plan",
        say: "During the year, actual premium, rate change, retention, claims and exposure are compared with the plan. Each **variance** must be explained, since the same figure may indicate success or the beginning of a problem.",
        scene: () => bars([
          { label: "Property, to June", right: "on plan", segs: [[50, "c1", "Actual"]] },
          { label: "Cyber, to June", right: "90% of the year’s plan already", segs: [[90, "bad", "Actual"]] }
        ], { max: 100, marks: [[50, "Half-year plan"]] }),
        ask: {
          q: "By June the cyber team has written 90% of its annual planned premium. What should happen?",
          opts: [
          ["Celebrate: they are ahead.", "Ahead of plan on income means ahead of plan on exposure too."],
          "Ask why, then either stop or get a revised plan approved.",
          ["Nothing, as long as the loss ratio is fine.", "Six months into a cyber book, the loss ratio tells you almost nothing yet."],
          ["Cut the team’s line sizes for the rest of the year.", "That might be the answer. But the first step is finding out why it happened."]
        ],
          a: 1,
          why: "Writing far ahead of plan can mean prices are too cheap, and it means more exposure than the capital was set for. At Lloyd’s, exceeding an approved plan without agreement is a serious breach."
        }
      },
      {
        h: "Reforecasting",
        say: "Where circumstances change, the insurer prepares a **reforecast**: a revised expectation of the outcome for the year. A plan may, and where the change is material should, be formally amended during the year.\n\nThe original plan is nevertheless retained as the standard against which performance is reported, since otherwise every shortfall could be removed by revising the target.",
        scene: () => bars([
          { label: "Plan", right: "£200m", segs: [[200, "soft1", "Agreed in November"]] },
          { label: "Reforecast, June", right: "£170m", segs: [[170, "c1", "Now expected"], [30, "hole", "Shortfall to explain"]] }
        ], { max: 200 }),
        ask: {
          q: "Rates fall 15% in March. The class underwriter proposes simply lowering the plan to match. Reasonable?",
          opts: [
          ["Yes. The plan was wrong.", "Then every miss could be erased by rewriting the target."],
          "Reforecast, but keep reporting against the original plan.",
          ["No. The plan must be hit regardless.", "Chasing a premium target in a falling market means buying volume with price. That is how the worst years are written."]
        ],
          a: 1,
          why: "The reforecast tells the board where the year is heading. The original plan shows how far reality has moved from what was approved, and whether expenses and capital still fit. The worst response is the third: writing more at lower rates to hit the number."
        }
      },
      {
        h: "Remediation",
        say: "A class is producing a combined ratio of 100.5%. Analysis shows that 30% of the book runs at a claims ratio of 90% and the remainder at 55%. The evident remedy is **re-underwriting**: declining to renew the unprofitable part.\n\nThe remedy has a cost that is easily overlooked. Much of the class’s expense is fixed, and does not fall as the premium does.",
        scene: (v) => {
          const prem = 100 - v.cut, claims = 70 * 0.55 + (30 - v.cut) * 0.9, exp = 20 + 0.15 * prem, lr = (claims / prem) * 100, er = (exp / prem) * 100;
          return stats([["Premium", money(prem)], ["Claims ratio", pct(lr, 1), "c1"], ["Expense ratio", pct(er, 1), "c2"], ["Combined", pct(lr + er, 1), lr + er > 100 ? "bad" : "good"]]) +
            bars([{ label: "Per £100 of premium", segs: [[lr, "c1", "Claims"], [er, "c2", "Expenses"]] }], { max: 110, marks: [[100, "Break-even"]] });
        },
        ctl: [{ k: "cut", label: "Poor business not renewed", min: 0, max: 30, step: 5, fmt: money }],
        live: (v) => (v.cut === 0 ? "Before any action: the good business is subsidising the bad." : v.cut < 30 ? "The claims ratio improves, but the expense ratio **rises**: the same fixed costs are spread over less premium. Remediation shrinks the top line before it improves the bottom line." : "All the poor business has gone and the class is back in profit, by less than the claims ratio alone suggests. Unless costs come down too, most of the gain is given back. If no version of the class earns its cost of capital over the cycle, the right answer is **exit**."),
        goal: {
          say: "Find the least poor business that must go to bring the combined ratio below 100%.",
          test: (v) => v.cut === 15,
          done: "Half of it. And look at the price: premium down 15%, the expense ratio up over two points, and a class barely in profit. Unless costs come down as well, re-underwriting gives back most of what it gains."
        }
      },
      {
        h: "Summary",
        say: "The next chapter considers the accounts in which the outcome of the plan is recorded.",
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
