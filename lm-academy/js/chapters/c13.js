/* LM2 · 5 — Underwriting */
(() => {
  const { bars, flow, stats, recap, plot, wfall, money, pct, num } = window.SLIP.kit;
  const dev = (v) => {
    const tr = v.tail ? 3.5 : 0.5, tp = v.tail ? 6 : 1;
    const rep = (t) => 1 - Math.exp(-t / tr), pay = (t) => 1 - Math.exp(-t / tp);
    return { rep, pay, paid: 60 * pay(v.t), inc: 60 * rep(v.t) };
  };

  window.SLIP.chapters.push({
    id: "underwriting", part: "LM2",
    title: "Underwriting",
    blurb: "Line size, premium calculation, probable maximum loss, the estimation of unpaid claims, and the closing of a Lloyd’s year of account.",
    minutes: 10,
    lead: "Underwriting is the exercise of judgement about which risks to accept, in what amount and at what price, and about what those risks will ultimately cost.",
    aims: [
      "Identify the constraints on the size of line an underwriter may write.",
      "Calculate an adjustable premium, and explain the use and the danger of a probable maximum loss.",
      "Explain how unpaid claims are estimated, and why both under- and over-reserving are harmful.",
      "Explain reinsurance to close and its effect on successive years’ members."
    ],
    init: { wages: 10, pml: 30, line: 10, t: 1, tail: 1, err: 0 },
    steps: [
      {
        h: "The size of the line",
        say: "Once an underwriter has decided that a risk is acceptable, the next decision is what share of it to write. Three constraints apply. **Capacity** is the amount the insurer’s capital permits it to write in total. **Appetite** is the amount it wishes to write of risks of this kind. **Aggregate exposure** is the amount it already has at risk to the same event or in the same location.\n\nThe line written must satisfy all three.",
        scene: () => flow({
          h: 150,
          nodes: [
            { id: "c", x: 4, y: 4, w: 104, label: "Capacity", sub: "Capital allows" },
            { id: "a", x: 118, y: 4, w: 104, label: "Appetite", sub: "Plan allows" },
            { id: "g", x: 232, y: 4, w: 104, label: "Aggregates", sub: "Room left" },
            { id: "l", x: 95, y: 100, label: "The line written", tone: "c1" }
          ],
          edges: [["c", "l"], ["a", "l"], ["g", "l"]]
        }),
        ask: {
          q: "An underwriter loves a Florida hotel risk, has plenty of capacity, and it fits the plan. Why might she still write only 2%?",
          opts: [
          ["The broker only offered 2%.", "Possible, but that is not one of her own three ceilings."],
          "Her book is already full of Florida windstorm.",
          ["Good risks should be shared round the market.", "Underwriters are not that generous. She would take more if she could."],
          ["Small lines sign down less.", "Signing down is proportional. Line size does not change the proportion."]
        ],
          a: 1,
          why: "One hurricane would hit every Florida risk she holds at once. **Aggregates** are tracked by peril and region precisely so that a good individual risk does not become part of a bad accumulation."
        }
      },
      {
        h: "Rate and premium base",
        say: "A premium is ordinarily calculated by applying a **rate** to a **premium base**, a measure of the exposure insured. For property the base is the sum insured; for employers’ liability, the wage roll; for a haulier, the number of vehicles or the turnover.\n\nWhere the base cannot be known until the period has ended, the insured pays a **deposit premium** on an estimate. The premium is then **adjusted** when the actual figure is declared, usually subject to a minimum.",
        scene: (v) => {
          const dep = 8 * 0.5 * 10, fin = v.wages * 0.5 * 10, adj = fin - dep;
          return stats([["Deposit", `£${num(dep, 0)}k`], ["Final premium", `£${num(fin, 0)}k`], [adj >= 0 ? "Extra to pay" : "Refund", `£${num(Math.abs(adj), 0)}k`, adj > 0 ? "c2" : adj < 0 ? "good" : ""]]) +
            bars([
              { label: "Estimated wages £8m at 0.5%", right: `£${num(dep, 0)}k`, segs: [[dep, "c1", "Deposit"]] },
              { label: `Actual wages £${v.wages}m at 0.5%`, right: `£${num(fin, 0)}k`, segs: [[Math.min(dep, fin), "c1"], [Math.max(adj, 0), "c2", "Adjustment"]] }
            ], { max: 80 });
        },
        ctl: [{ k: "wages", label: "Actual wage roll at year end", min: 5, max: 16, step: 1, fmt: (x) => `£${x}m` }],
        live: (v) => (v.wages > 8 ? "The firm grew, so there was more risk than estimated and more premium is due. The insurer was on risk for the larger workforce all along." : v.wages < 8 ? "The firm shrank. Part of the deposit comes back, usually subject to a **minimum** premium the insurer keeps regardless." : "The estimate was exact: no adjustment."),
        goal: {
          say: "The firm’s wage roll turned out to be £13m. Find the extra premium it owes.",
          test: (v) => v.wages === 13,
          done: "£25,000. The deposit was priced on £8m of wages; the insurer was actually on risk for £13m all year. The adjustment is not a penalty, it is the price of the cover the firm really had."
        }
      },
      {
        h: "Probable maximum loss",
        say: "The **sum insured** is the maximum for which the insurer can be liable. The **probable maximum loss** (PML) is the underwriter’s estimate of the largest loss that is reasonably likely to arise from a single event, having regard to the physical characteristics of the risk. A site of several separated buildings, for example, is unlikely to be destroyed by one fire.\n\nThe site below is insured for £200m. The underwriter’s authority permits her to expose £6m to any one loss.",
        scene: (v) => {
          const pmlAmt = 200 * v.pml / 100, lineMax = Math.min(100, (6 / pmlAmt) * 100), si = 200 * lineMax / 100;
          return stats([["PML", money(pmlAmt)], ["Line she can write", pct(lineMax, 1), "c1"], ["If it all burns", money(si), si > 6.01 ? "bad" : ""]]) +
            bars([
              { label: "The whole site", right: "£200m", segs: [[pmlAmt, "c2", "PML"], [200 - pmlAmt, "idle"]] },
              { label: "Her share of the sum insured", right: money(si), segs: [[Math.min(6, si), "c1", "£6m"], [Math.max(si - 6, 0), "hole", "Beyond PML"]] }
            ], { max: 200 });
        },
        ctl: [{ k: "pml", label: "PML as a share of sum insured", min: 10, max: 100, step: 10, fmt: pct }],
        live: (v) => (v.pml >= 100 ? "Treating the whole sum insured as at risk, she can write only 3%. Safe, but she earns little premium." : `Writing on a ${v.pml}% PML lets her take a bigger line. But PML is an opinion: if the “impossible” total loss happens, she pays **${money(200 * Math.min(100, 6 / (200 * v.pml / 100) * 100) / 100)}**, not £6m. PML errors are a classic source of nasty surprises.`),
        goal: {
          say: "She wants a 15% line. Find the PML assumption that allows it, and see what she loses if the whole site burns.",
          test: (v) => v.pml === 20,
          done: "A 20% PML. She now holds £30m of the sum insured against the £6m she can afford: if the PML is wrong, she is wrong five times over. The more optimistic the PML, the bigger the line and the bigger the bet on being right."
        }
      },
      {
        h: "Realistic disaster scenarios",
        say: "The assessment of individual risks must be supplemented by an assessment of the portfolio. Insurers test their books against **realistic disaster scenarios**: specified catastrophes, such as a major Florida windstorm or a collision between two vessels, for which the total cost to the insurer is calculated.\n\nLloyd’s prescribes a set of scenarios that every syndicate must run, and limits the proportion of capital that any scenario may consume.",
        scene: () => bars([
          { label: "Florida windstorm", right: "£140m gross", segs: [[60, "c1", "Net £60m"], [80, "c2", "Reinsurers"]] },
          { label: "Gulf of Mexico platform loss", right: "£70m gross", segs: [[35, "c1", "Net"], [35, "c2", ""]] },
          { label: "Two-aircraft collision", right: "£50m gross", segs: [[20, "c1", "Net"], [30, "c2", ""]] }
        ], { max: 150, marks: [[75, "Board’s net limit"]], legend: [["c1", "Kept"], ["c2", "Recovered from reinsurers"]] }),
        ask: {
          q: "The Florida scenario would cost this insurer £60m net against a board limit of £75m. A good new Florida risk is offered. What should happen?",
          opts: [
          ["Write it freely: there is £15m of room.", "There is room, but nobody yet knows how much of it this one risk uses."],
          "Work out how much of the remaining £15m it would use, then decide the line.",
          ["Decline: the scenario is nearly full.", "£15m of headroom is real capacity. Declining wastes it."],
          ["Write it and buy more reinsurance afterwards.", "Cover bought after the commitment may not be available, or affordable."]
        ],
          a: 1,
          why: "That is aggregate management in practice: the scenario is a budget. The net figure also depends on reinsurers actually paying, which is why their security is monitored too."
        }
      },
      {
        h: "Estimating unpaid claims",
        say: "An insurer must report its results long before the claims on its policies are known. It therefore estimates their eventual cost. The estimate has three components: claims **paid**; **outstanding** claims, being reserves for claims notified but not yet settled; and **IBNR**, a provision for claims *incurred but not reported*.\n\nThe book illustrated will ultimately cost £60m. Vary the time elapsed and the class of business.",
        scene: (v) => {
          const d = dev(v);
          const pts = (f) => Array.from({ length: 21 }, (_, i) => [i / 2, f(i / 2) * 100]);
          return stats([["Paid", money(d.paid), "c1"], ["Known, unpaid", money(d.inc - d.paid), "c2"], ["IBNR", money(60 - d.inc), 60 - d.inc > 30 ? "bad" : ""]]) +
            plot({ h: 180, x: { min: 0, max: 10, ticks: [0, 2, 4, 6, 8, 10], title: "Years since the policies began" }, y: { min: 0, max: 100, ticks: [0, 50, 100], fmt: (x) => `${x}%` },
              refs: [{ x: v.t, label: "Now", left: v.t > 7 }], series: [{ tone: "c2", pts: pts(d.rep) }, { tone: "c1", pts: pts(d.pay) }],
              dots: [{ x: v.t, y: d.rep(v.t) * 100, tone: "c2" }, { x: v.t, y: d.pay(v.t) * 100, tone: "c1" }], legend: [["c2", "Reported"], ["c1", "Paid"]] });
        },
        ctl: [{ k: "tail", label: "Kind of business", opts: ["Property", "Liability"] }, { k: "t", label: "Years since the policies began", min: 0.5, max: 10, step: 0.5, fmt: (x) => `${x}` }],
        live: (v) => {
          const d = dev(v), ib = 60 - d.inc;
          return v.tail
            ? `**${pct((ib / 60) * 100)} of the final bill is still unreported.** Liability claims, like an illness diagnosed years after exposure, arrive slowly. This is **long-tail** business.`
            : `Property claims are obvious and fast: only ${pct((ib / 60) * 100)} is unreported. **Short-tail** business tells you the truth quickly.`;
        },
        goal: {
          say: "On the liability book, find how long it takes for half of the final bill even to be **reported**.",
          test: (v) => v.tail === 1 && v.t === 2.5,
          done: "About two and a half years, and at that point only a third has been *paid*. Now switch to property at the same date: it is almost all in. That difference is what “long tail” means."
        }
      },
      {
        h: "The consequences of error",
        set: { tail: 1, t: 1 },
        say: "A reserve is a best estimate, and an error in either direction has consequences.\n\n**Under-reserving** overstates current profit, conceals inadequate pricing and eventually requires a strengthening that falls on a later year. **Over-reserving** understates profit, immobilises capital that could support new business, and may lead the insurer to price uncompetitively and lose good risks.",
        scene: () => bars([
          { label: "Reserved too little", right: "profit overstated", segs: [[40, "c1", "Reserve"], [20, "hole", "Shortfall later"]] },
          { label: "Reserved correctly", right: "", segs: [[60, "c1", "Reserve"]] },
          { label: "Reserved too much", right: "capital trapped", segs: [[60, "c1", "Reserve"], [20, "c2", "Idle"]] }
        ], { max: 90, marks: [[60, "True cost"]] }),
        ask: {
          q: "A new liability account has reported claims of 25% of premium after its first year. On this kind of business about a quarter of claims are reported by then. What is the best estimate of its final claims ratio?",
          fix: true,
          opts: [
          ["25%", "That is only what has been reported so far."],
          ["50%", "If a quarter is reported, the whole is four times it, not twice."],
          "About 100%"
        ],
          a: 2,
          why: "25% ÷ ¼ = 100%. An account that looks superb at twelve months is on course to lose money once expenses are added. The honest figure is always the **ultimate**: paid + outstanding + IBNR."
        }
      },
      {
        h: "Reinsurance to close",
        say: "A Lloyd’s year of account is normally closed at the end of its third year, when some claims will remain unpaid. The members of that year pay a premium to the members of the following year, who assume the outstanding liabilities. This is **reinsurance to close** (RITC).\n\nThe premium is the estimated cost of those liabilities, here £25m. Consider what follows if the estimate proves wrong.",
        scene: (v) => {
          const actual = 25 * (1 + v.err / 100);
          return stats([["2024 members keep", "£5m", "good"], ["2025 members gain", money(25 - actual), actual > 25.01 ? "bad" : actual < 24.99 ? "good" : ""]]) +
            wfall([{ label: "2024 premium", v: 100 }, { label: "Expenses", v: -25 }, { label: "Claims paid", v: -45 }, { label: "Paid to 2025 to close", v: -25 }, { label: "2024 result", total: true }], { fmt: (x) => `£${num(x, 0)}m` });
        },
        ctl: [{ k: "err", label: "The old claims turn out", min: -40, max: 40, step: 10, fmt: (x) => (x === 0 ? "as estimated" : `${Math.abs(x)}% ${x > 0 ? "worse" : "better"}`) }],
        live: (v) => (v.err === 0 ? "The estimate was right, so the handover is fair to both groups of members."
          : v.err > 0 ? `The 2025 members inherit **${money(25 * v.err / 100)}** of losses on business they never wrote. If the uncertainty is too great to price fairly, the year is left **open** instead, and its members stay on the hook.`
            : `The 2025 members pocket **${money(-25 * v.err / 100)}** at the expense of 2024’s. The price of closing is a judgement between two groups of people.`),
        goal: {
          say: "The 2024 members walked away with £5m. Find how wrong the estimate must be for the 2025 members to lose the same amount on claims they never underwrote.",
          test: (v) => v.err === 20,
          done: "A 20% error on £25m. One group’s whole profit turns out to have been another group’s loss. This is why RITC is priced with such care, and why a year is left open when the uncertainty is too great."
        }
      },
      {
        h: "Summary",
        say: "The next chapter considers how a risk is presented to underwriters, recorded and bound.",
        scene: () => recap([
          "Line size is capped by capacity, appetite and aggregates.",
          "Premium = rate × base; adjustable premiums start with a deposit.",
          "PML is a judgement of likely worst loss, and it can be wrong.",
          "Reserves = paid + outstanding + IBNR; too low and too high both hurt.",
          "RITC closes a Lloyd’s year by passing its unpaid claims to the next."
        ])
      }
    ]
  });
})();
