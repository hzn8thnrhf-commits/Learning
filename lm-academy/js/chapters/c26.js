/* MGA · 1 — The MGA and its carriers */
(() => {
  const { bars, flow, stats, recap, money, pct, num } = window.SLIP.kit;
  const SRC = [
    ["Lloyd’s syndicates", "Grant binding authorities to approved coverholders. The MGA gains Lloyd’s licences and rating, and must meet Lloyd’s standards for delegated authority."],
    ["Insurance companies", "Company market and overseas insurers provide their own policy paper, through a binding authority or agency agreement. Often a simpler structure."],
    ["Fronting carriers", "A licensed insurer issues the policies for a fee and passes most of the risk to reinsurers behind it. Common where the real risk-takers have no licence of their own."],
    ["Reinsurers and investors", "Increasingly supply the risk capital behind fronted programmes, sometimes on multi-year terms. They care about the numbers, not the paper."]
  ];
  const STRUCT = [
    ["Panel", "Every carrier takes a fixed percentage of **every** risk, with one leading. Nobody can be given a worse selection than anyone else. The simplest structure to run and to trust."],
    ["Horizontal split", "The book is divided by **segment**: Carrier A takes the property, Carrier B the liability. Each carrier gets the business it wants, but its result depends on its segment, and on the MGA allocating fairly."],
    ["Vertical split", "Each risk is divided by **layer**: one carrier takes the primary, another the excess above it. The MGA can offer bigger limits than any one carrier would give."],
    ["Fronting", "One licensed insurer issues every policy and keeps a little. The rest passes to reinsurers behind it. One name on the paper, several capital providers behind."]
  ];

  window.SLIP.chapters.push({
    id: "mga", part: "MGA",
    title: "The MGA and its carriers",
    blurb: "An underwriting business with no balance sheet: how it earns, why its interests differ from its carriers’, and how capacity is structured.",
    minutes: 11,
    init: { vol: 20, lr: 55, deal: 0, src: 0, st: 0, big: 60 },
    steps: [
      {
        h: "Underwriting without a balance sheet",
        say: "A **managing general agent** (MGA) underwrites and binds policies but carries no insurance risk itself. Its **carriers**, also called capacity providers, supply the capital and pay the claims. The MGA supplies expertise in a niche, broker relationships and administration.\n\nAt Lloyd’s an MGA holding a binding authority is a coverholder; the economics are the same whoever provides the paper.",
        scene: () => flow({
          h: 230,
          nodes: [
            { id: "c", x: 95, y: 4, label: "Carriers", sub: "Capital; pay the claims", tone: "ink" },
            { id: "m", x: 95, y: 84, label: "The MGA", sub: "Prices, selects, binds", tone: "c1" },
            { id: "b", x: 95, y: 164, label: "Brokers and clients" }
          ],
          edges: [["c", "m", "binding authority"], ["m", "b", "policies"]]
        }),
        ask: {
          q: "An MGA binds a policy that later produces a £2m claim. Whose money pays it?",
          opts: ["The MGA’s.", "The carriers’."],
          a: 1,
          why: "The MGA decided to write the risk; the carriers bear the result. Everything else in this part follows from that separation between the decision and its consequences."
        }
      },
      {
        h: "The MGA’s own economics",
        say: "The MGA’s income is **commission**: a percentage of premium, deducted before the rest goes to the carriers. Here 25%, of which 10 points go to the producing brokers, leaving 15%.\n\nIts costs are mostly **fixed**: underwriters, systems, compliance, premises. Here £2.2m a year.",
        scene: (v) => {
          const inc = v.vol * 0.15, profit = inc - 2.2;
          return stats([["Premium", money(v.vol)], ["Commission kept", money(inc), "c1"], ["MGA profit", money(profit), profit < 0 ? "bad" : "good"]]) +
            bars([{ label: "Income", right: money(inc), segs: [[inc, "c1", "15% of premium"]] }, { label: "Costs", right: "£2.2m", segs: [[2.2, "c2", "Fixed"]] }], { max: 6 });
        },
        ctl: [{ k: "vol", label: "Premium written", min: 6, max: 40, step: 1, fmt: money }],
        live: (v) => (v.vol * 0.15 < 2.2 ? "Below about £14.7m of premium the MGA loses money, however good its underwriting. Income moves with volume; costs don’t." : `Every extra £1m of premium now adds £150k straight to profit. Notice what this picture does **not** contain: the loss ratio. On commission alone, the MGA is paid for volume.`)
      },
      {
        h: "Two views of one book",
        say: "Now put the carrier beside it. The book is £20m. The carrier receives the premium, pays 25% commission, pays the claims, and has its own costs of 5%.\n\nMove the loss ratio and watch both profits.",
        scene: (v) => {
          const car = 20 * (1 - 0.25 - 0.05 - v.lr / 100), mga = 20 * 0.15 - 2.2;
          return stats([["Loss ratio", pct(v.lr)], ["Carrier’s profit", money(car), car < 0 ? "bad" : "good"], ["MGA’s profit", money(mga), "c1"]]) +
            bars([
              { label: "Carrier", right: money(car), segs: [[Math.max(car, 0), "c2"], [Math.max(-car, 0), "bad", "Loss"]] },
              { label: "MGA", right: money(mga), segs: [[mga, "c1"]] }
            ], { max: 6.5 });
        },
        ctl: [{ k: "lr", label: "Loss ratio on the book", min: 40, max: 85, step: 1, fmt: pct }],
        live: (v) => (v.lr > 70 ? "The carrier is losing money. The MGA’s profit **hasn’t moved**. This is the central problem of delegated underwriting: the party choosing the risks is insulated from how they turn out." : "The carrier’s profit swings with every point of loss ratio; the MGA’s is flat. An MGA paid only by commission has an incentive to grow premium even when prices are inadequate.")
      },
      {
        h: "Aligning the two",
        say: "The usual fix is **profit commission**: a lower flat commission, plus a share of the carrier’s profit once the year’s results are known.\n\nTwo offers on a £10m book. **Flat:** 28% commission. **With profit share:** 23% commission plus 25% of the carrier’s profit, after its 5% costs.",
        scene: (v) => {
          const flat = 2.8, prof = Math.max(0, 10 * (1 - 0.23 - 0.05 - v.lr / 100)), pc = 2.3 + 0.25 * prof, mine = v.deal ? pc : flat;
          return stats([["Flat deal pays", money(flat), v.deal ? "" : "c1"], ["Profit-share deal pays", money(pc), v.deal ? "c1" : ""], ["Difference", money(pc - flat), pc < flat ? "bad" : "good"]]) +
            bars([
              { label: "Flat 28%", right: money(flat), segs: [[2.8, v.deal ? "idle" : "c1", "Commission"]] },
              { label: "23% + profit share", right: money(pc), segs: [[2.3, v.deal ? "c1" : "idle", "Commission"], [0.25 * prof, "c3", "Profit share"]] }
            ], { max: 3.4 });
        },
        ctl: [{ k: "deal", label: "The MGA’s deal", opts: ["Flat", "Profit share"] }, { k: "lr", label: "Loss ratio", min: 40, max: 85, step: 1, fmt: pct }],
        live: (v) => {
          const be = 52;
          return v.lr < be ? "At this loss ratio the profit-share deal pays **more** than flat commission. Good underwriting is now worth money to the MGA." : v.lr >= 72 ? "The carrier has no profit to share, so the MGA earns only its 23%: £500k less than the flat deal. Poor results now cost the MGA too, which is the point." : "Around a 52% loss ratio the two deals pay the same. Above it, profit share pays less. The MGA has a reason to care which risks it binds.";
        }
      },
      {
        h: "Losses are remembered",
        say: "Profit commission is worked out year by year, usually after results have had time to mature. A **deficit carried forward** clause stops an MGA collecting on good years while the carrier absorbs the bad ones.",
        scene: () => bars([
          { label: "Year 1", right: "loss of £1.0m", segs: [[1, "bad", "Deficit"]] },
          { label: "Year 2", right: "profit of £1.5m", segs: [[1, "hole", "Repays year 1"], [0.5, "c3", "Counts"]] }
        ], { max: 1.6 }),
        ask: {
          q: "The profit share is 25% with deficit carried forward. Year 1 lost £1.0m; year 2 made £1.5m. What profit commission is due for year 2?",
          opts: ["£375,000: a quarter of £1.5m.", "£125,000: a quarter of £0.5m.", "Nothing."],
          a: 1,
          why: "Year 1’s loss must be recovered before any profit counts. £1.5m less £1.0m leaves £0.5m; a quarter is £125,000. Without the clause the MGA would share every profit and no loss."
        }
      },
      {
        h: "Where capacity comes from",
        say: "Capacity is an MGA’s lifeblood: with no carrier behind its policies it has nothing to sell. There are four broad sources.",
        scene: (v) => `<ol class="k-recap">${SRC.map((m, i) => `<li${i === v.src ? ' style="font-weight:600"' : ' style="opacity:.55"'}>${m[0]}</li>`).join("")}</ol>`,
        ctl: [{ k: "src", label: "Source", min: 0, max: 3, step: 1, fmt: (i) => `${i + 1} of 4` }],
        live: (v) => `**${SRC[v.src][0]}.** ${SRC[v.src][1]}`
      },
      {
        h: "What a carrier looks for",
        say: "A carrier treats capacity as an **investment** and expects a return on the capital it commits. Its due diligence covers the team’s track record, the business plan, the quality of data and systems, the controls, and how the MGA’s pay is tied to results.",
        scene: () => bars([
          { label: "MGA A: plans 35% growth", right: "no rate monitoring", segs: [[35, "bad", "Growth"]] },
          { label: "MGA B: plans 5% growth", right: "policy-level data, rate tracked", segs: [[5, "c1"]] }
        ], { max: 40 }),
        ask: {
          q: "Both MGAs ask the same carrier for capacity. Which is the easier yes?",
          opts: ["A. More premium for the carrier.", "B. The carrier can see what it is buying."],
          a: 1,
          why: "Premium is easy to find; evidence that it is adequately priced is not. Fast growth with no view of rate adequacy is the pattern carriers have learned to fear most."
        }
      },
      {
        h: "Structuring several carriers",
        say: "Most MGAs want more than one carrier. There are four ways to arrange them.",
        scene: (v) => [
          bars([{ label: "Every risk", segs: [[50, "c1", "Carrier A 50%"], [30, "c2", "B 30%"], [20, "c3", "C 20%"]] }], { max: 100 }),
          bars([{ label: "Property book", segs: [[100, "c1", "Carrier A 100%"]] }, { label: "Liability book", segs: [[100, "c2", "Carrier B 100%"]] }], { max: 100 }),
          bars([{ label: "Excess: £15m xs £5m", segs: [[100, "c2", "Carrier B"]] }, { label: "Primary: first £5m", segs: [[100, "c1", "Carrier A"]] }], { max: 100 }),
          bars([{ label: "On the policy", segs: [[100, "ink", "Fronting insurer"]] }, { label: "Behind it", segs: [[10, "ink", ""], [50, "c1", "Reinsurer A"], [40, "c2", "Reinsurer B"]] }], { max: 100 })
        ][v.st],
        ctl: [{ k: "st", label: "Structure", opts: ["Panel", "By segment", "By layer", "Fronting"] }],
        live: (v) => `**${STRUCT[v.st][0]}.** ${STRUCT[v.st][1]}`
      },
      {
        h: "Could you survive losing one?",
        say: "Carriers leave: a change of strategy, a bad year elsewhere, a new chief underwriter. A structure is only as strong as what remains afterwards.\n\nThe MGA writes £20m, keeps 15% and has £2.2m of costs. Its largest carrier withdraws and can’t be replaced this year.",
        scene: (v) => {
          const left = 20 * (1 - v.big / 100), profit = left * 0.15 - 2.2;
          return stats([["Premium left", money(left)], ["MGA result", money(profit), profit < 0 ? "bad" : "good"]]) +
            bars([{ label: "The book", segs: [[left, "c1", "Still supported"], [20 - left, "hole", "Capacity gone"]] }], { max: 20, marks: [[14.7, "Break-even"]] });
        },
        ctl: [{ k: "big", label: "Largest carrier’s share", min: 20, max: 100, step: 5, fmt: pct }],
        live: (v) => (v.big >= 100 ? "A single carrier: when it goes, the business stops. The MGA can’t renew a single policy." : 20 * (1 - v.big / 100) < 14.7 ? "The remaining book no longer covers the fixed costs. The MGA is loss-making until it finds new capacity, and it is negotiating from weakness." : "The MGA stays profitable without its largest carrier. That resilience is worth something to the carriers who remain, and to anyone valuing the business.")
      },
      {
        h: "In five lines",
        say: "Next: managing the book those carriers have entrusted to you.",
        scene: () => recap([
          "An MGA chooses the risks; its carriers bear the results.",
          "Commission pays for volume, and the MGA’s costs are fixed.",
          "Profit commission, with deficits carried forward, ties its pay to results.",
          "Carriers can be arranged as a panel, by segment, by layer, or behind a front.",
          "A good structure survives the loss of its largest carrier."
        ])
      }
    ]
  });
})();
