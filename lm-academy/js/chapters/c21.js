/* LM3 · 5 — Reading the accounts */
(() => {
  const { bars, flow, stats, recap, wfall, money, pct, num } = window.SLIP.kit;
  const MON = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  window.SLIP.chapters.push({
    id: "accounts", part: "LM3",
    title: "Reading the accounts",
    blurb: "Three statements, why written premium isn’t income, how old claims move this year’s profit, and the ratios that matter.",
    minutes: 9,
    init: { m: 6, pyd: 0, loss: 60, exp: 35, inv: 3, hit: 0 },
    steps: [
      {
        h: "Two sets of books",
        say: "**Financial accounts** face outwards: investors, regulators, rating agencies, brokers judging security. They follow accounting standards and are audited.\n\n**Management accounts** face inwards: more detailed, more frequent, cut by class and team, in whatever form helps the business decide.",
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
          opts: ["The financial accounts.", "The management accounts."],
          a: 1,
          why: "Published accounts show the whole company once or twice a year. Running a class needs figures that are current and cut the way decisions are made."
        }
      },
      {
        h: "The balance sheet",
        say: "A snapshot on one day: what the insurer **owns**, what it **owes**, and the difference, which belongs to its owners.\n\nAssets must at least equal liabilities plus equity. For an insurer the biggest liability by far is **claims reserves**: money it expects to pay on business already written.",
        scene: () => bars([
          { label: "Assets", right: "£500m", segs: [[380, "c1", "Investments and cash"], [120, "soft1", "Owed by others"]] },
          { label: "Liabilities and equity", right: "£500m", segs: [[300, "c2", "Claims reserves"], [80, "soft2", "Unearned"], [120, "c3", "Equity"]] }
        ], { max: 500 }),
        ask: {
          q: "“Owed by others” includes £60m due from reinsurers on claims already paid. Why would an analyst look hard at it?",
          opts: ["It is too small to matter.", "It is only an asset if the reinsurers pay."],
          a: 1,
          why: "Reinsurance recoverables are credit risk sitting on the balance sheet. If a reinsurer fails or disputes the claim, the asset shrinks and equity shrinks with it."
        }
      },
      {
        h: "Profit is not cash",
        say: "The **income statement** shows profit or loss over a period. The **cash flow statement** shows money actually arriving and leaving. In insurance they can tell opposite stories, because premium comes in at the start and claims go out years later.",
        scene: () => bars([
          { label: "Cash this year", right: "+£40m", segs: [[100, "c1", "Premium received"], [0.1, "none"]] },
          { label: "", right: "", segs: [[60, "c2", "Claims and costs paid so far"]] },
          { label: "Profit this year", right: "−£10m", segs: [[100, "c1", "Premium earned"]] },
          { label: "", right: "", segs: [[110, "bad", "Claims and costs incurred"]] }
        ], { max: 115 }),
        ask: {
          q: "A fast-growing liability insurer has cash pouring in. Is that evidence it is profitable?",
          opts: ["Yes. Cash is fact.", "No. Its claims simply haven’t been paid yet."],
          a: 1,
          why: "Growth and a long tail make any insurer cash-rich for years, however badly it has priced. Insurers have collapsed with full bank accounts. Profit depends on what the claims will eventually cost."
        }
      },
      {
        h: "Written is not earned",
        say: "A £1.2m annual premium isn’t income on day one. It is **earned** evenly as the cover is provided. At the year end, the part relating to cover still to come is **unearned** and sits on the balance sheet as a liability.",
        scene: (v) => {
          const earned = (12 - v.m) / 12 * 1.2;
          return stats([["Written", "£1.2m"], ["Earned by 31 Dec", money(earned), "c1"], ["Unearned", money(1.2 - earned), "c2"]]) +
            bars([{ label: `Policy starting 1 ${MON[v.m]}`, segs: [[v.m, "none"], [12 - v.m, "c1", "Earned"], [v.m, "c2", "Unearned"]] }], { max: 24, marks: [[12, "Year end"]] });
        },
        ctl: [{ k: "m", label: "Policy starts", min: 0, max: 11, step: 1, fmt: (i) => `1 ${MON[i]}` }],
        live: (v) => (v.m === 0 ? "A January policy is fully earned by December." : `Only ${12 - v.m} of 12 months of cover have been given. The rest is a liability: if the policy were cancelled, that premium would go back. A fast-growing insurer always looks less profitable on an earned basis than on a written one.`)
      },
      {
        h: "Old years in this year’s profit",
        say: "Claims **incurred** in a year aren’t the claims paid. They are claims paid **plus the change in reserves**. And that change includes revisions to *earlier* years.\n\nThis year’s own business made £10m. Now revise the reserves held for past years.",
        scene: (v) => {
          const res = 10 - v.pyd;
          return stats([["This year’s business", "£10m"], ["Prior years", money(-v.pyd), v.pyd > 0 ? "bad" : v.pyd < 0 ? "good" : ""], ["Reported profit", money(res), res < 0 ? "bad" : ""]]) +
            wfall([{ label: "This year", v: 10 }, { label: v.pyd > 0 ? "Strengthened" : "Released", v: -v.pyd }, { label: "Reported profit", total: true }], { fmt: (x) => `£${num(x, 0)}m` });
        },
        ctl: [{ k: "pyd", label: "Past years’ reserves", min: -20, max: 20, step: 5, fmt: (x) => (x === 0 ? "unchanged" : x > 0 ? `£${x}m short` : `£${-x}m too high`) }],
        live: (v) => (v.pyd < 0 ? "A **release**: past years were over-reserved, and the surplus flows into this year’s profit. Pleasant, but it says nothing about current underwriting. A company living on releases is spending its savings." : v.pyd > 0 ? "**Strengthening**: past years were under-reserved, and today’s shareholders pay for yesterday’s optimism. A reader should always separate the current year’s result from prior-year movement." : "No movement: the reported profit is the current year’s own.")
      },
      {
        h: "The combined ratio",
        say: "The headline measure of underwriting performance. **Claims ratio** (claims incurred ÷ earned premium) plus **expense ratio** (expenses ÷ premium). Under 100% is an underwriting profit.\n\nInvestment income on the premiums held comes on top.",
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
        h: "Three questions",
        say: "Accounts answer three different questions. **Profitability:** did it make money? **Liquidity:** can it find cash when claims fall due? **Solvency:** do its assets exceed its liabilities by enough?\n\nThe solvency measure is capital held ÷ capital required. This insurer holds £150m against a requirement of £100m. Give it a bad year.",
        scene: (v) => {
          const own = 150 - v.hit, ratio = own;
          return stats([["Capital held", money(own)], ["Required", "£100m"], ["Solvency ratio", pct(ratio), ratio < 100 ? "bad" : ratio < 120 ? "c2" : "good"]]) +
            bars([{ label: "Capital held", right: pct(ratio), segs: [[Math.max(own, 0), ratio < 100 ? "bad" : "c1"]] }], { max: 160, marks: [[100, "Required"]] });
        },
        ctl: [{ k: "hit", label: "Loss for the year", min: 0, max: 80, step: 5, fmt: money }],
        live: (v) => (150 - v.hit < 100 ? "Below 100%: the insurer no longer meets its capital requirement. The regulator steps in, and the firm must raise capital or cut risk, usually on poor terms because everyone knows it has to." : 150 - v.hit < 120 ? "Still compliant, but the buffer is thin. Rating agencies and brokers’ security committees start asking questions well before 100%." : "A comfortable buffer. Boards usually set their own target well above the regulatory minimum for exactly this reason.")
      },
      {
        h: "In five lines",
        say: "Next: the numbers behind the price.",
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
