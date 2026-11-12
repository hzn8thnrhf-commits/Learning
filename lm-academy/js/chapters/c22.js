/* LM3 · 6 — Reading the accounts */
(() => {
  const { bars, flow, stats, recap, wfall, money, pct, num } = window.SLIP.kit;
  const MON = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  window.SLIP.chapters.push({
    id: "accounts", part: "LM3",
    title: "Reading the accounts",
    blurb: "The primary financial statements, earned premium, reserve movements, and the ratios by which insurers are judged.",
    minutes: 9,
    lead: "An underwriter need not be an accountant, but must be able to read the statements in which an insurer’s performance and strength are reported.",
    aims: [
      "Distinguish financial from management accounts, and identify the three primary statements.",
      "Explain why profit differs from cash flow, and written premium from earned premium.",
      "Explain how movements in prior-year reserves affect the reported result.",
      "Calculate a combined ratio and a solvency ratio, and distinguish profitability, liquidity and solvency."
    ],
    init: { m: 6, pyd: 0, loss: 60, exp: 35, inv: 3, hit: 0 },
    steps: [
      {
        h: "Financial and management accounts",
        say: "**Financial accounts** are prepared for external users: investors, regulators, rating agencies, and brokers assessing security. They are drawn up in accordance with accounting standards and are audited.\n\n**Management accounts** are prepared for internal use. They are more detailed and more frequent, are analysed by class and by team, and take whatever form best serves the decisions to be made.",
        scene: () => flow({
          h: 150,
          nodes: [
            { id: "d", x: 95, y: 4, label: "The same transactions", tone: "ink" },
            { id: "f", x: 4, y: 100, w: 150, label: "Financial accounts", sub: "Outward, audited, annual" },
            { id: "m", x: 186, y: 100, w: 150, label: "Management accounts", sub: "Inward, monthly, by class", tone: "c1" }
          ],
          edges: [["d", "f"], ["d", "m"]]
        }),
        ask: {
          q: "A class underwriter wants her loss ratio by broker for the last three months. Where does she look?",
          opts: [
          ["The financial accounts.", "They show the whole company, once or twice a year."],
          "The management accounts.",
          ["The regulatory returns.", "Detailed, but built for the supervisor’s questions, and not by broker."]
        ],
          a: 1,
          why: "Running a class needs figures that are current and cut the way decisions are made. That is what management accounts are for."
        }
      },
      {
        h: "The balance sheet",
        say: "The **balance sheet** states the insurer’s position at a single date: its **assets**, its **liabilities**, and the difference between them, which is the **equity** attributable to its owners.\n\nBy construction, assets equal liabilities plus equity. An insurer’s largest liability is its **technical provisions**: the amounts it expects to pay on business already written.",
        scene: () => bars([
          { label: "Assets", right: "£500m", segs: [[380, "c1", "Investments and cash"], [120, "soft1", "Owed by others"]] },
          { label: "Liabilities and equity", right: "£500m", segs: [[300, "c2", "Claims reserves"], [80, "soft2", "Unearned"], [120, "c3", "Equity"]] }
        ], { max: 500 }),
        ask: {
          q: "“Owed by others” includes £60m due from reinsurers on claims already paid. Equity is £120m. Why would an analyst look hard at that £60m?",
          opts: [
          ["It is too small to matter.", "It is half the equity."],
          "It is only an asset if the reinsurers pay.",
          ["Because it should be shown as a liability.", "It is money owed *to* the insurer: an asset, if it is good."],
          ["Because it has already been counted in investments.", "It is a separate item. The worry is its quality."]
        ],
          a: 1,
          why: "Reinsurance recoverables are credit risk sitting on the balance sheet. If a reinsurer fails or disputes the claim, the asset shrinks and equity shrinks with it: here, by up to half."
        }
      },
      {
        h: "Profit and cash flow",
        say: "The **income statement** reports profit or loss for a period. The **cash flow statement** reports the cash actually received and paid. For an insurer the two can diverge widely, since premium is received at the outset and claims may not be paid for years.",
        scene: () => bars([
          { label: "Cash this year", right: "+£40m", segs: [[100, "c1", "Premium received"], [0.1, "none"]] },
          { label: "", right: "", segs: [[60, "c2", "Claims and costs paid so far"]] },
          { label: "Profit this year", right: "−£10m", segs: [[100, "c1", "Premium earned"]] },
          { label: "", right: "", segs: [[110, "bad", "Claims and costs incurred"]] }
        ], { max: 115 }),
        ask: {
          q: "A fast-growing liability insurer has cash pouring in. What does that tell you about its profitability?",
          opts: [
          ["It is profitable: cash is fact.", "The cash is real. Whose it will turn out to be is not yet known."],
          "Nothing. Its claims simply have not been paid yet.",
          ["It is unprofitable: growth always loses money.", "Growth is a warning sign, not a verdict."]
        ],
          a: 1,
          why: "Growth and a long tail make any insurer cash-rich for years, however badly it has priced. Insurers have collapsed with full bank accounts. Profit depends on what the claims will eventually cost."
        }
      },
      {
        h: "Written and earned premium",
        say: "Premium is recognised as income not when it is written but as it is **earned**, in proportion to the period of cover that has elapsed. At the accounting date, the part of the premium relating to the unexpired period is **unearned** and is carried as a liability.\n\nConsider an annual premium of £1.2m. (Insurers reporting under IFRS 17 present this differently, but the principle of recognising income as cover is provided is the same.)",
        scene: (v) => {
          const earned = (12 - v.m) / 12 * 1.2;
          return stats([["Written", "£1.2m"], ["Earned by 31 Dec", money(earned), "c1"], ["Unearned", money(1.2 - earned), "c2"]]) +
            bars([{ label: `Policy starting 1 ${MON[v.m]}`, segs: [[v.m, "none"], [12 - v.m, "c1", "Earned"], [v.m, "c2", "Unearned"]] }], { max: 24, marks: [[12, "Year end"]] });
        },
        ctl: [{ k: "m", label: "Policy starts", min: 0, max: 11, step: 1, fmt: (i) => `1 ${MON[i]}` }],
        live: (v) => (v.m === 0 ? "A January policy is fully earned by December." : `Only ${12 - v.m} of 12 months of cover have been given. The rest is a liability: if the policy were cancelled, that premium would go back. A fast-growing insurer always looks less profitable on an earned basis than on a written one.`),
        goal: {
          say: "Find the latest date this policy can start if £900k of its premium is to be earned by 31 December.",
          test: (v) => v.m === 3,
          done: "1 April: nine months of cover, nine twelfths of the premium. Business written late in the year barely touches this year’s income, which is why a strong fourth quarter shows up in next year’s results."
        }
      },
      {
        h: "Prior-year development",
        say: "The charge for claims **incurred** in a period is not the amount paid in it. It is the amount paid **plus the change in the provision for outstanding claims**, and that change includes any revision to the estimates for *earlier* years.\n\nSuppose the current year’s own business has produced a profit of £10m. Now revise the provisions held for prior years.",
        scene: (v) => {
          const res = 10 - v.pyd;
          return stats([["This year’s business", "£10m"], ["Prior years", money(-v.pyd), v.pyd > 0 ? "bad" : v.pyd < 0 ? "good" : ""], ["Reported profit", money(res), res < 0 ? "bad" : ""]]) +
            wfall([{ label: "This year", v: 10 }, { label: v.pyd > 0 ? "Strengthened" : "Released", v: -v.pyd }, { label: "Reported profit", total: true }], { fmt: (x) => `£${num(x, 0)}m` });
        },
        ctl: [{ k: "pyd", label: "Past years’ reserves", min: -20, max: 20, step: 5, fmt: (x) => (x === 0 ? "unchanged" : x > 0 ? `£${x}m short` : `£${-x}m too high`) }],
        live: (v) => (v.pyd < 0 ? "A **release**: past years were over-reserved, and the surplus flows into this year’s profit. Pleasant, but it says nothing about current underwriting. A company living on releases is spending its savings." : v.pyd > 0 ? "**Strengthening**: past years were under-reserved, and today’s shareholders pay for yesterday’s optimism. A reader should always separate the current year’s result from prior-year movement." : "No movement: the reported profit is the current year’s own."),
        goal: {
          say: "Find the size of reserve shortfall on past years that wipes out this year’s profit entirely.",
          test: (v) => v.pyd === 10,
          done: "£10m. A sound year’s underwriting reports no profit at all, because of estimates made years ago by people who may have moved on. Always split a result into the current year and prior-year movement."
        }
      },
      {
        h: "The combined ratio",
        say: "The principal measure of underwriting performance is the **combined ratio**: the sum of the **claims ratio** (claims incurred as a percentage of earned premium) and the **expense ratio** (expenses as a percentage of premium). A combined ratio below 100% represents an underwriting profit.\n\nInvestment income earned on premiums and reserves is additional to the underwriting result.",
        scene: (v) => {
          const cr = v.loss + v.exp, res = 100 - cr + v.inv;
          return stats([["Combined ratio", pct(cr), cr > 100 ? "bad" : "good"], ["Underwriting", `${100 - cr >= 0 ? "+" : "−"}£${Math.abs(100 - cr)}`, cr > 100 ? "bad" : ""], ["With investments", `${res >= 0 ? "+" : "−"}£${Math.abs(res)}`, res < 0 ? "bad" : "good"]]) +
            bars([{ label: "Per £100 of earned premium", segs: [[v.loss, "c1", "Claims"], [v.exp, "c2", "Expenses"]] }], { max: 125, marks: [[100, "Break-even"]] });
        },
        ctl: [{ k: "loss", label: "Claims ratio", min: 40, max: 85, step: 1, fmt: pct }, { k: "exp", label: "Expense ratio", min: 25, max: 45, step: 1, fmt: pct }, { k: "inv", label: "Investment return on premium", min: 0, max: 10, step: 1, fmt: pct }],
        live: (v) => {
          const cr = v.loss + v.exp;
          return cr <= 100 ? "An underwriting profit before any investment income. This is the discipline Lloyd’s asks for." : cr - v.inv <= 100 ? "An underwriting loss rescued by investment income. This is **cash-flow underwriting**: it works until interest rates fall or claims arrive early." : "A loss even after investment income. Capital is being consumed.";
        },
        goal: {
          say: "Claims are running at 70% and expenses at 35%. Find the investment return needed to break even.",
          test: (v) => v.loss === 70 && v.exp === 35 && v.inv === 5,
          done: "5% on the premium held. Possible when interest rates are high and claims take years to pay; impossible on short-tail business or when rates are near zero. An insurer in this position is really running an investment fund with an underwriting problem."
        }
      },
      {
        h: "Profitability, liquidity and solvency",
        say: "Accounts are read for three distinct purposes. **Profitability** concerns whether the insurer has earned a return. **Liquidity** concerns whether it can produce cash when its obligations fall due. **Solvency** concerns whether its assets exceed its liabilities by the margin required.\n\nSolvency is commonly expressed as the ratio of capital held to capital required. This insurer holds £150m against a requirement of £100m.",
        scene: (v) => {
          const own = 150 - v.hit, ratio = own;
          return stats([["Capital held", money(own)], ["Required", "£100m"], ["Solvency ratio", pct(ratio), ratio < 100 ? "bad" : ratio < 120 ? "c2" : "good"]]) +
            bars([{ label: "Capital held", right: pct(ratio), segs: [[Math.max(own, 0), ratio < 100 ? "bad" : "c1"]] }], { max: 160, marks: [[100, "Required"]] });
        },
        ctl: [{ k: "hit", label: "Loss for the year", min: 0, max: 80, step: 5, fmt: money }],
        live: (v) => (150 - v.hit < 100 ? "Below 100%: the insurer no longer meets its capital requirement. The regulator steps in, and the firm must raise capital or cut risk, usually on poor terms because everyone knows it has to." : 150 - v.hit < 120 ? "Still compliant, but the buffer is thin. Rating agencies and brokers’ security committees start asking questions well before 100%." : "A comfortable buffer. Boards usually set their own target well above the regulatory minimum for exactly this reason."),
        goal: {
          say: "The board’s own target is a solvency ratio of 120%. Find the largest loss it can take and stay there.",
          test: (v) => v.hit === 30,
          done: "£30m. The regulatory line is at £50m, but the questions from rating agencies and brokers start well before it. An insurer’s usable capital is the buffer above its own target, not the whole of what it holds."
        }
      },
      {
        h: "Summary",
        say: "The next chapter introduces the statistical ideas on which pricing depends.",
        scene: () => recap([
          "Financial accounts face outwards; management accounts run the business.",
          "An insurer can be full of cash and losing money.",
          "Premium counts only as it is earned.",
          "Reserve movements on old years flow through this year’s profit.",
          "Profitability, liquidity and solvency are three separate questions."
        ])
      }
    ]
  });
})();
