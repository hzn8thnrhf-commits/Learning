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
    blurb: "How much to take, what to charge, how bad it could get, and the claims nobody has told you about yet.",
    minutes: 10,
    init: { wages: 10, pml: 30, line: 10, t: 1, tail: 1, err: 0 },
    steps: [
      {
        h: "How big a line?",
        say: "Having decided to write a risk, the underwriter must decide **how much**. Three things set the ceiling: the insurer’s **capacity** (how much its capital allows it to write), its **appetite** for this kind of risk, and its **aggregates**: how much it already has exposed to the same event or place.",
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
          q: "An underwriter loves a Florida hotel risk and has plenty of capacity. Why might she still write only 2%?",
          opts: ["The broker asked for 2%.", "Her book is already full of Florida windstorm exposure."],
          a: 1,
          why: "One hurricane would hit every Florida risk she holds at once. Aggregates are tracked by peril and region precisely so that a good individual risk doesn’t become a bad accumulation."
        }
      },
      {
        h: "Rate times base",
        say: "A premium is usually a **rate** applied to a **premium base**: a measure of how much risk there is. For property, the sum insured. For employers’ liability, the wage roll. For a haulier, the vehicles or the turnover.\n\nWhen the base can’t be known in advance, the insured pays a **deposit premium** on an estimate, and the premium is **adjusted** at the end of the year.",
        scene: (v) => {
          const dep = 8 * 0.5 * 10, fin = v.wages * 0.5 * 10, adj = fin - dep;
          return stats([["Deposit", `£${num(dep, 0)}k`], ["Final premium", `£${num(fin, 0)}k`], [adj >= 0 ? "Extra to pay" : "Refund", `£${num(Math.abs(adj), 0)}k`, adj > 0 ? "c2" : adj < 0 ? "good" : ""]]) +
            bars([
              { label: "Estimated wages £8m at 0.5%", right: `£${num(dep, 0)}k`, segs: [[dep, "c1", "Deposit"]] },
              { label: `Actual wages £${v.wages}m at 0.5%`, right: `£${num(fin, 0)}k`, segs: [[Math.min(dep, fin), "c1"], [Math.max(adj, 0), "c2", "Adjustment"]] }
            ], { max: 80 });
        },
        ctl: [{ k: "wages", label: "Actual wage roll at year end", min: 5, max: 16, step: 1, fmt: (x) => `£${x}m` }],
        live: (v) => (v.wages > 8 ? "The firm grew, so there was more risk than estimated and more premium is due. The insurer was on risk for the larger workforce all along." : v.wages < 8 ? "The firm shrank. Part of the deposit comes back, usually subject to a **minimum** premium the insurer keeps regardless." : "The estimate was exact: no adjustment.")
      },
      {
        h: "How bad could it get?",
        say: "The **sum insured** is the most the policy can pay. The **probable maximum loss** (PML) is the underwriter’s judgement of the worst loss that is realistically likely. A campus of separate buildings won’t all burn in one fire.\n\nThe site is insured for £200m. The underwriter can afford to lose £6m on any one risk.",
        scene: (v) => {
          const pmlAmt = 200 * v.pml / 100, lineMax = Math.min(100, (6 / pmlAmt) * 100), si = 200 * lineMax / 100;
          return stats([["PML", money(pmlAmt)], ["Line she can write", pct(lineMax, 1), "c1"], ["If it all burns", money(si), si > 6.01 ? "bad" : ""]]) +
            bars([
              { label: "The whole site", right: "£200m", segs: [[pmlAmt, "c2", "PML"], [200 - pmlAmt, "idle"]] },
              { label: "Her share of the sum insured", right: money(si), segs: [[Math.min(6, si), "c1", "£6m"], [Math.max(si - 6, 0), "hole", "Beyond PML"]] }
            ], { max: 200 });
        },
        ctl: [{ k: "pml", label: "PML as a share of sum insured", min: 10, max: 100, step: 10, fmt: pct }],
        live: (v) => (v.pml >= 100 ? "Treating the whole sum insured as at risk, she can write only 3%. Safe, but she earns little premium." : `Writing on a ${v.pml}% PML lets her take a bigger line. But PML is an opinion: if the “impossible” total loss happens, she pays **${money(200 * Math.min(100, 6 / (200 * v.pml / 100) * 100) / 100)}**, not £6m. PML errors are a classic source of nasty surprises.`)
      },
      {
        h: "Planning for the worst",
        say: "One risk at a time isn’t enough. Insurers test their whole book against **realistic disaster scenarios**: a set of specified catastrophes, such as a major Florida hurricane or a marine collision, to see what they would cost in total.\n\nLloyd’s prescribes a set of these that every syndicate must run, and there are limits on how much of its capital any one may consume.",
        scene: () => bars([
          { label: "Florida windstorm", right: "£140m gross", segs: [[60, "c1", "Net £60m"], [80, "c2", "Reinsurers"]] },
          { label: "Gulf of Mexico platform loss", right: "£70m gross", segs: [[35, "c1", "Net"], [35, "c2", ""]] },
          { label: "Two-aircraft collision", right: "£50m gross", segs: [[20, "c1", "Net"], [30, "c2", ""]] }
        ], { max: 150, marks: [[75, "Board’s net limit"]], legend: [["c1", "Kept"], ["c2", "Recovered from reinsurers"]] }),
        ask: {
          q: "The Florida scenario would cost this insurer £60m net against a limit of £75m. What should a new Florida risk prompt?",
          opts: ["Nothing: it is under the limit.", "A check on how much of the remaining £15m it uses up."],
          a: 1,
          why: "That is aggregate management in practice. The scenario numbers also depend on the reinsurers actually paying, which is why their security is monitored too."
        }
      },
      {
        h: "The number nobody knows",
        say: "An insurer must report its result long before its claims are all in. So it estimates. Claims **paid**, plus **outstanding** reserves on known claims, plus **IBNR**: claims *incurred but not reported*.\n\nThis book will eventually cost £60m. Move through time, and switch the kind of business.",
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
        }
      },
      {
        h: "Wrong in either direction",
        set: { tail: 1, t: 1 },
        say: "Reserves are a best estimate, and both kinds of error do harm.\n\n**Under-reserving** flatters today’s profit, hides bad underwriting, and ends in a shock. **Over-reserving** ties up capital that could support new business, understates profit, and may make the insurer overprice and lose good risks.",
        scene: () => bars([
          { label: "Reserved too little", right: "profit overstated", segs: [[40, "c1", "Reserve"], [20, "hole", "Shortfall later"]] },
          { label: "Reserved correctly", right: "", segs: [[60, "c1", "Reserve"]] },
          { label: "Reserved too much", right: "capital trapped", segs: [[60, "c1", "Reserve"], [20, "c2", "Idle"]] }
        ], { max: 90, marks: [[60, "True cost"]] }),
        ask: {
          q: "A new liability underwriter’s first-year reported claims are only 25% of premium. Is the account profitable?",
          opts: ["Yes. A 25% loss ratio is superb.", "Unknown. Most of the year’s claims haven’t been reported."],
          a: 1,
          why: "On long-tail business only about a quarter of claims have surfaced after one year. The honest figure is the **ultimate**: paid + outstanding + IBNR."
        }
      },
      {
        h: "Closing a Lloyd’s year",
        say: "A Lloyd’s syndicate is an annual venture, kept open for three years so claims can develop. At the end, unpaid claims remain. The year’s members pay the next year a premium to take those over: **reinsurance to close** (RITC).\n\nThe actuaries estimate £25m is left. See what happens if they are wrong.",
        scene: (v) => {
          const actual = 25 * (1 + v.err / 100);
          return stats([["2024 members keep", "£5m", "good"], ["2025 members gain", money(25 - actual), actual > 25.01 ? "bad" : actual < 24.99 ? "good" : ""]]) +
            wfall([{ label: "2024 premium", v: 100 }, { label: "Expenses", v: -25 }, { label: "Claims paid", v: -45 }, { label: "Paid to 2025 to close", v: -25 }, { label: "2024 result", total: true }], { fmt: (x) => `£${num(x, 0)}m` });
        },
        ctl: [{ k: "err", label: "The old claims turn out", min: -40, max: 40, step: 10, fmt: (x) => (x === 0 ? "as estimated" : `${Math.abs(x)}% ${x > 0 ? "worse" : "better"}`) }],
        live: (v) => (v.err === 0 ? "The estimate was right, so the handover is fair to both groups of members."
          : v.err > 0 ? `The 2025 members inherit **${money(25 * v.err / 100)}** of losses on business they never wrote. If the uncertainty is too great to price fairly, the year is left **open** instead, and its members stay on the hook.`
            : `The 2025 members pocket **${money(-25 * v.err / 100)}** at the expense of 2024’s. The price of closing is a judgement between two groups of people.`)
      },
      {
        h: "In five lines",
        say: "Next: the rules for how a risk is presented, recorded and bound.",
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
