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
    blurb: "The MGA model, the divergence between its interests and its carriers’, the mechanisms that align them, and the structuring of capacity.",
    minutes: 11,
    lead: "A managing general agent underwrites with other people’s capital. This chapter examines the economics of that arrangement and the means by which the interests of the MGA and its carriers are aligned.",
    aims: [
      "Explain the MGA model and why its income depends on volume while its carriers’ results depend on the loss ratio.",
      "Calculate an MGA’s remuneration under flat commission, profit commission and a deficit carried forward.",
      "Compare panel, segment, layer and fronting structures for multiple carriers.",
      "Assess an MGA’s resilience to the withdrawal of a carrier."
    ],
    init: { vol: 20, lr: 55, deal: 0, src: 0, st: 0, big: 60 },
    steps: [
      {
        h: "The MGA model",
        say: "A **managing general agent** (MGA) underwrites and binds insurance without bearing the insurance risk. Its **carriers**, also called capacity providers, supply the capital and are liable for the claims. The MGA contributes specialist underwriting expertise, relationships with brokers, and administration.\n\nAt Lloyd’s an MGA holding a binding authority is a coverholder. The economic relationship is the same whether the capacity is provided by a syndicate or by a company.",
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
          opts: [
          ["The MGA’s.", "The MGA has no capital at risk on the policy. That is the definition of the model."],
          "The carriers’.",
          ["The broker’s.", "The broker arranged the cover. It does not fund it."],
          ["It is shared between the MGA and the carriers.", "Only if the MGA has agreed to take a share of risk, which is unusual and needs capital and licences of its own."]
        ],
          a: 1,
          why: "The MGA decided to write the risk; the carriers bear the result. Everything else in this part follows from that separation between the decision and its consequences."
        }
      },
      {
        h: "The economics of the MGA",
        say: "An MGA’s principal income is **commission**: a percentage of premium, deducted before the balance is remitted to the carriers. In this example the commission is 25%, of which ten points are paid on to the producing brokers, leaving the MGA 15%.\n\nIts costs, by contrast, are largely **fixed**: underwriting staff, systems, compliance and premises. Here they amount to £2.2m a year.",
        scene: (v) => {
          const inc = v.vol * 0.15, profit = inc - 2.2;
          return stats([["Premium", money(v.vol)], ["Commission kept", money(inc), "c1"], ["MGA profit", money(profit), profit < 0 ? "bad" : "good"]]) +
            bars([{ label: "Income", right: money(inc), segs: [[inc, "c1", "15% of premium"]] }, { label: "Costs", right: "£2.2m", segs: [[2.2, "c2", "Fixed"]] }], { max: 6 });
        },
        ctl: [{ k: "vol", label: "Premium written", min: 6, max: 40, step: 1, fmt: money }],
        live: (v) => (v.vol * 0.15 < 2.2 ? "Below about £14.7m of premium the MGA loses money, however good its underwriting. Income moves with volume; costs do not." : `Every extra £1m of premium now adds £150k straight to profit. Notice what this picture does **not** contain: the loss ratio. On commission alone, the MGA is paid for volume.`),
        goal: {
          say: "Find the smallest book on which this MGA makes any profit at all.",
          test: (v) => v.vol === 15,
          done: "£15m. Below about £14.7m the commission does not cover the fixed costs, whatever the quality of the underwriting. So a young MGA is under pressure to reach scale quickly, which is the moment its carriers should watch it most closely."
        }
      },
      {
        h: "The carrier’s position",
        say: "Now set the carrier’s position beside the MGA’s. The portfolio is £20m of premium. The carrier receives the premium, pays the 25% commission, pays the claims, and incurs expenses of its own equal to 5% of premium.\n\nVary the loss ratio and compare the effect on each party.",
        scene: (v) => {
          const car = 20 * (1 - 0.25 - 0.05 - v.lr / 100), mga = 20 * 0.15 - 2.2;
          return stats([["Loss ratio", pct(v.lr)], ["Carrier’s profit", money(car), car < 0 ? "bad" : "good"], ["MGA’s profit", money(mga), "c1"]]) +
            bars([
              { label: "Carrier", right: money(car), segs: [[Math.max(car, 0), "c2"], [Math.max(-car, 0), "bad", "Loss"]] },
              { label: "MGA", right: money(mga), segs: [[mga, "c1"]] }
            ], { max: 6.5 });
        },
        ctl: [{ k: "lr", label: "Loss ratio on the book", min: 40, max: 85, step: 1, fmt: pct }],
        live: (v) => (v.lr > 70 ? "The carrier is losing money. The MGA’s profit **has not moved**. This is the central problem of delegated underwriting: the party choosing the risks is insulated from how they turn out." : "The carrier’s profit swings with every point of loss ratio; the MGA’s is flat. An MGA paid only by commission has an incentive to grow premium even when prices are inadequate."),
        goal: {
          say: "Find the loss ratio at which the carrier makes nothing at all. What is the MGA making?",
          test: (v) => v.lr === 70,
          done: "At 70% the carrier breaks even, and the MGA still makes its £800k. Push on to 85%: the carrier has lost £3m and the MGA’s figure has not moved by a pound."
        }
      },
      {
        h: "Profit commission",
        say: "The usual remedy is **profit commission**: the MGA accepts a lower rate of ordinary commission in return for a share of the carrier’s profit, calculated when the results of the year are sufficiently developed.\n\nTwo proposals are made for a portfolio of £10m. The first is commission of 28%. The second is commission of 23% together with 25% of the carrier’s profit after its own expenses of 5%.",
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
        },
        goal: {
          say: "Take the profit-share deal. Find the loss ratio at which it pays exactly what the flat deal would.",
          test: (v) => v.deal === 1 && v.lr === 52,
          done: "52%. An MGA that believes it can beat that should want the profit share; one that prefers the flat 28% is telling its carrier something. Which deal an MGA asks for is itself a piece of underwriting information."
        }
      },
      {
        h: "Deficit carried forward",
        say: "Profit commission is calculated separately for each underwriting year. If each year stood alone, the MGA would share in the profit of good years while the carrier bore the whole loss of bad ones. A **deficit carried forward** clause prevents this, by requiring a loss in one year to be made good from the profits of later years before any further profit commission is earned.",
        scene: (v) => bars([
  { label: "Year 1", right: "loss of £1.0m", segs: [[1, "bad", "Deficit"]] },
  { label: "Year 2", right: "profit of £1.5m", segs: v.$done ? [[1, "hole", "Repays year 1"], [0.5, "c3", "Counts"]] : [[1.5, "c3", "Profit"]] }
], { max: 1.6 }),
        ask: {
          q: "The profit share is 25% with deficit carried forward. Year 1 lost £1.0m; year 2 made £1.5m. What profit commission is due for year 2?",
          fix: true,
          opts: [
          ["£375,000", "A quarter of £1.5m, ignoring the loss the carrier took the year before."],
          "£125,000",
          ["Nothing", "Year 1’s deficit is fully repaid by year 2’s profit, with £0.5m to spare."]
        ],
          a: 1,
          why: "Year 1’s loss must be recovered first. £1.5m less £1.0m leaves £0.5m; a quarter of that is £125,000. Without the clause the MGA would share every profit and no loss."
        }
      },
      {
        h: "Sources of capacity",
        say: "An MGA can transact no business without a carrier, and the securing and retention of capacity is accordingly its first commercial concern. Capacity is available from four principal sources.",
        scene: (v) => `<ol class="k-recap">${SRC.map((m, i) => `<li${i === v.src ? ' style="font-weight:600"' : ' style="opacity:.55"'}>${m[0]}</li>`).join("")}</ol>`,
        ctl: [{ k: "src", label: "Source", min: 0, max: 3, step: 1, fmt: (i) => `${i + 1} of 4` }],
        live: (v) => `**${SRC[v.src][0]}.** ${SRC[v.src][1]}`
      },
      {
        h: "The carrier’s due diligence",
        say: "A carrier regards the capacity it grants as an **investment** of capital, on which it expects a return. Its due diligence therefore extends to the record of the underwriting team, the business plan, the quality of the MGA’s data and systems, its controls, and the extent to which its remuneration depends on the result.",
        scene: () => bars([
          { label: "MGA A: plans 35% growth", right: "no rate monitoring", segs: [[35, "bad", "Growth"]] },
          { label: "MGA B: plans 5% growth", right: "policy-level data, rate tracked", segs: [[5, "c1"]] }
        ], { max: 40 }),
        ask: {
          q: "Two MGAs ask a carrier for capacity. A plans 35% growth and has no rate monitoring. B plans 5% and has policy-level data with rate tracked. Which is the easier yes?",
          opts: [
          ["A. More premium for the carrier.", "More premium of unknown adequacy is more risk of unknown price."],
          "B. The carrier can see what it is buying.",
          ["Neither: carriers avoid MGAs.", "Delegated business is a large and growing share of the market."]
        ],
          a: 1,
          why: "Premium is easy to find; evidence that it is adequately priced is not. Fast growth with no view of rate adequacy is the pattern carriers have learned to fear most."
        }
      },
      {
        h: "Capacity structures",
        say: "Most MGAs seek capacity from more than one carrier. The carriers may be combined in four ways, which differ in how risks and results are shared among them.",
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
        h: "Resilience to the loss of a carrier",
        say: "Carriers withdraw for reasons unconnected with the MGA’s performance: a change of strategy, losses elsewhere, a change of management. The strength of a capacity structure is therefore measured by what would remain if its largest member left.\n\nThe MGA writes £20m, retains 15% and has fixed costs of £2.2m. Suppose that its largest carrier withdraws and cannot be replaced within the year.",
        scene: (v) => {
          const left = 20 * (1 - v.big / 100), profit = left * 0.15 - 2.2;
          return stats([["Premium left", money(left)], ["MGA result", money(profit), profit < 0 ? "bad" : "good"]]) +
            bars([{ label: "The book", segs: [[left, "c1", "Still supported"], [20 - left, "hole", "Capacity gone"]] }], { max: 20, marks: [[14.7, "Break-even"]] });
        },
        ctl: [{ k: "big", label: "Largest carrier’s share", min: 20, max: 100, step: 5, fmt: pct }],
        live: (v) => (v.big >= 100 ? "A single carrier: when it goes, the business stops. The MGA cannot renew a single policy." : 20 * (1 - v.big / 100) < 14.7 ? "The remaining book no longer covers the fixed costs. The MGA is loss-making until it finds new capacity, and it is negotiating from weakness." : "The MGA stays profitable without its largest carrier. That resilience is worth something to the carriers who remain, and to anyone valuing the business."),
        goal: {
          say: "Find the largest share your biggest carrier can hold if the MGA is to stay profitable without it.",
          test: (v) => v.big === 25,
          done: "A quarter. That means at least four carriers of similar size, or a book well above break-even. Most MGAs start with one carrier at 100% and spend their first years trying to get to this picture."
        }
      },
      {
        h: "Summary",
        say: "The next chapter considers the management of the portfolio that the carriers have entrusted to the MGA.",
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
