/*
 * The Slip — illustrative figures used inside lessons ({ fig: "id" } blocks).
 *
 * type "graph":     boxes placed on a grid (at: [row, col], span) joined by drawn arrows.
 *                   Optional narrow layout: colsN + atN/spanN. Option gap: row gap in px.
 *                   Edge options: label, tone ("good" | "bad" | "tint"), dash, bend (px),
 *                   fromSide/toSide ("t" | "b" | "l" | "r"), fromAt/toAt (0–1 along the side).
 * type "bars":      stacked horizontal bars on one scale, with an optional mark and tick labels.
 * type "timeline":  bars on a time axis, optional markers and tick labels; bars can be joined by edges.
 * type "stack":     a tower of layers drawn to scale (max, ticks), or equal bands (equal: true).
 * type "waterfall": cumulative steps from a starting total, or diverging bars from zero (diverging: true).
 * type "line":      a line chart drawn to scale, with optional log x-axis, bands, reference lines and marks.
 * type "quadrant":  a 2 x 2 matrix with plotted, labelled points.
 *
 * Colours: chart series use the validated categorical tokens c1–c4 in fixed order (see css/app.css);
 * "neutral" and "cedant" are grey, "open" and "c1l"/"c1m" are lighter steps of c1, "total" is ink.
 * Node tones: ink (navy), tint (outlined accent), brass, good, bad, q (a question), plain (default).
 * Figures marked illustrative use invented numbers chosen to teach, not market data.
 */
window.SLIP_DATA = window.SLIP_DATA || {};
window.SLIP_DATA.figures = {
  /* ---------- Part 1: the market ---------- */
  market: {
    type: "graph",
    title: "Where London sits",
    caption: "A risk usually travels from the client through a local broker to a London broker, who places it with Lloyd’s syndicates, insurance companies or a P&I club. They in turn pass part of what they write to reinsurers.",
    cols: 3,
    nodes: [
      { id: "client", at: [1, 2], label: "Clients worldwide", sub: "Businesses, governments, insurers" },
      { id: "local", at: [2, 2], label: "Local broker", sub: "In Texas, Malaysia, Brazil…" },
      { id: "london", at: [3, 2], label: "London broker", sub: "Places the risk", tone: "tint" },
      { id: "lloyds", at: [4, 1], label: "Lloyd’s syndicates", tone: "ink" },
      { id: "company", at: [4, 2], label: "Company market", tone: "ink" },
      { id: "pi", at: [4, 3], label: "P&I clubs", tone: "ink" },
      { id: "reins", at: [5, 2], label: "Reinsurers", sub: "Insurance for insurers", tone: "brass" }
    ],
    edges: [
      { from: "client", to: "local", label: "instructs" },
      { from: "local", to: "london", label: "passes on" },
      { from: "london", to: "lloyds" },
      { from: "london", to: "company" },
      { from: "london", to: "pi" },
      { from: "lloyds", to: "reins", dash: true },
      { from: "company", to: "reins", dash: true },
      { from: "pi", to: "reins", dash: true }
    ]
  },

  "network-effect": {
    type: "graph",
    title: "London’s network effect",
    caption: "Each advantage feeds the next: expertise draws complex risks to London, complex risks build experience and data, and that experience attracts more talent and capital.",
    cols: 2,
    nodes: [
      { id: "exp", at: [1, 1], label: "Specialist expertise", tone: "tint" },
      { id: "risks", at: [1, 2], label: "Complex risks come to London" },
      { id: "data", at: [2, 2], label: "Experience and data build up" },
      { id: "talent", at: [2, 1], label: "Talent and capital follow", tone: "brass" }
    ],
    edges: [
      { from: "exp", to: "risks" },
      { from: "risks", to: "data", fromSide: "b", toSide: "t" },
      { from: "data", to: "talent" },
      { from: "talent", to: "exp", fromSide: "t", toSide: "b" }
    ]
  },

  lloyds: {
    type: "graph",
    title: "How Lloyd’s fits together",
    caption: "The Corporation oversees the market. Managing agents run syndicates, members provide the capital behind them, and brokers bring in risks on behalf of clients.",
    cols: 3,
    nodes: [
      { id: "corp", at: [1, 2], label: "Corporation of Lloyd’s", sub: "Rules, licences, Central Fund", tone: "ink" },
      { id: "ma", at: [2, 2], label: "Managing agent", sub: "Employs the underwriters" },
      { id: "broker", at: [3, 1], label: "Broker", sub: "Acts for the client" },
      { id: "syn", at: [3, 2], label: "Syndicate", sub: "Writes the risk", tone: "tint" },
      { id: "members", at: [3, 3], label: "Members", sub: "Provide the capital", tone: "brass" },
      { id: "client", at: [4, 1], label: "Client", sub: "Buys the cover" }
    ],
    edges: [
      { from: "corp", to: "ma", label: "oversees" },
      { from: "ma", to: "syn", label: "runs" },
      { from: "broker", to: "syn" },
      { from: "members", to: "syn" },
      { from: "client", to: "broker", label: "instructs" }
    ]
  },

  "pi-layers": {
    type: "stack",
    equal: true,
    title: "How large P&I claims are shared",
    caption: "Each club pays claims up to its own retention. Larger claims are shared among the clubs of the International Group through the pool, the largest are protected by a reinsurance programme bought jointly by the Group, and anything beyond that is shared among all the clubs.",
    layers: [
      { label: "Each club’s own retention", sub: "Paid by the member’s club", tone: "neutral" },
      { label: "The pool", sub: "Shared among the International Group clubs", tone: "c1" },
      { label: "Group reinsurance programme", sub: "Bought jointly by the clubs", tone: "c2" },
      { label: "Overspill", sub: "Shared among all the clubs", tone: "c3" }
    ]
  },

  yoa: {
    type: "timeline",
    title: "Three years of account",
    caption: "Each year of account writes new policies for twelve months, remains open for two more while claims develop, and then closes by reinsurance to close into the following year.",
    from: 2024,
    to: 2030,
    ticks: [2024, 2025, 2026, 2027, 2028, 2029, 2030],
    legend: [["write", "Writing new policies"], ["open", "Open for claims"]],
    rows: [
      { id: "y24", label: "2024 year", segs: [[2024, 2025, "write"], [2025, 2027, "open"]] },
      { id: "y25", label: "2025 year", segs: [[2025, 2026, "write"], [2026, 2028, "open"]] },
      { id: "y26", label: "2026 year", segs: [[2026, 2027, "write"], [2027, 2029, "open"]] }
    ],
    edges: [
      { from: "y24", fromSide: "r", to: "y25", toSide: "t", toAt: 0.667, label: "RITC", tone: "tint" },
      { from: "y25", fromSide: "r", to: "y26", toSide: "t", toAt: 0.667, label: "RITC", tone: "tint" }
    ]
  },

  spiral: {
    type: "graph",
    title: "The LMX spiral",
    caption: "Each syndicate reinsured its large losses with the next, and the same loss circled the market several times before settling on whichever syndicates were left holding it.",
    cols: 3,
    nodes: [
      { id: "a", at: [1, 2], label: "Syndicate A", sub: "reinsures with B" },
      { id: "b", at: [2, 3], label: "Syndicate B", sub: "reinsures with C" },
      { id: "c", at: [3, 2], label: "Syndicate C", sub: "reinsures with D" },
      { id: "d", at: [2, 1], label: "Syndicate D", sub: "reinsures with A" },
      { id: "loss", at: [2, 2], label: "One large loss", sub: "round and round", tone: "bad" }
    ],
    edges: [
      { from: "a", to: "b", fromSide: "r", toSide: "t", tone: "bad" },
      { from: "b", to: "c", fromSide: "b", toSide: "r", tone: "bad" },
      { from: "c", to: "d", fromSide: "l", toSide: "b", tone: "bad" },
      { from: "d", to: "a", fromSide: "t", toSide: "l", tone: "bad" }
    ]
  },

  /* ---------- Part 2: writing the business ---------- */
  journey: {
    type: "graph",
    title: "The journey of a risk",
    caption: "From the client’s instructions to a bound and processed contract. The lead underwriter sets the terms, and followers join on them until the lines reach 100%.",
    cols: 2,
    steps: true,
    nodes: [
      { id: "client", at: [1, 1], label: "Client", sub: "Needs cover" },
      { id: "local", at: [1, 2], label: "Local broker", sub: "Takes instructions" },
      { id: "london", at: [2, 2], label: "London broker", sub: "Builds the submission" },
      { id: "lead", at: [2, 1], label: "Lead underwriter", sub: "Sets terms, writes a line", tone: "tint" },
      { id: "follow", at: [3, 1], label: "Followers", sub: "Join on the same terms" },
      { id: "bind", at: [3, 2], label: "Bound at 100%", sub: "Signed down if over", tone: "good" },
      { id: "process", at: [4, 2], label: "Velonetic", sub: "Premium processed and settled" }
    ],
    edges: [
      { from: "client", to: "local" },
      { from: "local", to: "london" },
      { from: "london", to: "lead" },
      { from: "lead", to: "follow" },
      { from: "follow", to: "bind" },
      { from: "bind", to: "process" }
    ]
  },

  signing: {
    type: "bars",
    title: "Signing down an oversubscribed slip",
    caption: "Four underwriters write 125% between them. Every line is multiplied by 100 ÷ 125 = 0.8, so the signed lines add up to exactly 100%.",
    scale: 125,
    mark: [100, "100%"],
    legend: [["c1", "Underwriter A"], ["c2", "Underwriter B"], ["c3", "Underwriter C"], ["c4", "Underwriter D"]],
    rows: [
      { label: "Written", total: "125%", segs: [[40, "A 40%", "c1"], [30, "B 30%", "c2"], [30, "C 30%", "c3"], [25, "D 25%", "c4"]] },
      { label: "Signed", total: "100%", segs: [[32, "A 32%", "c1"], [24, "B 24%", "c2"], [24, "C 24%", "c3"], [20, "D 20%", "c4"]] }
    ]
  },

  remedies: {
    type: "graph",
    title: "Remedies for an unfair presentation",
    caption: "The Insurance Act 2015 asks two questions: was the breach deliberate or reckless, and what would the insurer have done if it had been told?",
    cols: 3,
    nodes: [
      { id: "q1", at: [1, 1], span: 3, label: "Was the breach deliberate or reckless?", tone: "q" },
      { id: "a1", at: [2, 1], label: "Avoid the policy and keep the premium", tone: "bad" },
      { id: "q2", at: [2, 2], span: 2, label: "What would the insurer have done if told?", tone: "q" },
      { id: "a2", at: [3, 1], label: "Declined it", sub: "Avoid, but return the premium" },
      { id: "a3", at: [3, 2], label: "Used other terms", sub: "Treat those terms as applying" },
      { id: "a4", at: [3, 3], label: "Charged more", sub: "Reduce claims in proportion" }
    ],
    edges: [
      { from: "q1", to: "a1", label: "Yes", tone: "bad", fromAt: 0.17 },
      { from: "q1", to: "q2", label: "No", fromAt: 0.67 },
      { from: "q2", to: "a2", fromAt: 0.2 },
      { from: "q2", to: "a3", fromAt: 0.25 },
      { from: "q2", to: "a4", fromAt: 0.75 }
    ]
  },

  triggers: {
    type: "timeline",
    title: "Which policy pays?",
    caption: "The same loss and the same claim under two triggers. A losses-occurring policy follows the date of the loss; a claims-made policy follows the date on which the claim is made.",
    from: 2025,
    to: 2027,
    ticks: [2025, 2026, 2027],
    markers: [[2025.45, "Loss happens"], [2026.3, "Claim made"]],
    legend: [["pays", "This policy pays"], ["idle", "Not triggered"]],
    rows: [
      { group: "Losses occurring" },
      { id: "lo25", label: "2025 policy", segs: [[2025, 2026, "pays", "Pays"]] },
      { id: "lo26", label: "2026 policy", segs: [[2026, 2027, "idle"]] },
      { group: "Claims made" },
      { id: "cm25", label: "2025 policy", segs: [[2025, 2026, "idle"]] },
      { id: "cm26", label: "2026 policy", segs: [[2026, 2027, "pays", "Pays"]] }
    ]
  },

  delegated: {
    type: "graph",
    title: "How delegated authority works",
    caption: "The syndicate grants a binding authority setting out what the coverholder may write. The coverholder binds policies locally and reports back every month in bordereaux.",
    cols: 4,
    nodes: [
      { id: "syn", at: [1, 2], span: 2, label: "Syndicate", sub: "Through its managing agent", tone: "ink" },
      { id: "cov", at: [2, 2], span: 2, label: "Coverholder or MGA", sub: "Approved by Lloyd’s", tone: "tint" },
      { id: "ph", at: [3, 2], span: 2, label: "Policyholders", sub: "Hundreds or thousands" }
    ],
    edges: [
      { from: "syn", to: "cov", label: "binder", bend: 70 },
      { from: "cov", to: "syn", label: "bordereaux", bend: 70, tone: "tint" },
      { from: "cov", to: "ph", label: "binds policies" }
    ]
  },

  "claim-life": {
    type: "graph",
    title: "The life of a claim",
    caption: "Most large claims follow these steps. Interim payments keep the insured going while the full amount is established.",
    cols: 2,
    steps: true,
    nodes: [
      { id: "n1", at: [1, 1], label: "Notification", sub: "Insured tells its broker" },
      { id: "n2", at: [1, 2], label: "Investigation", sub: "Loss adjuster appointed" },
      { id: "n3", at: [2, 2], label: "Coverage review", sub: "Does the policy respond?", tone: "q" },
      { id: "n4", at: [2, 1], label: "Reserve set", sub: "Estimate of the cost" },
      { id: "n5", at: [3, 1], label: "Interim payments", sub: "Money on account" },
      { id: "n6", at: [3, 2], label: "Settlement", sub: "Agreed and paid", tone: "good" }
    ],
    edges: [
      { from: "n1", to: "n2" },
      { from: "n2", to: "n3" },
      { from: "n3", to: "n4" },
      { from: "n4", to: "n5" },
      { from: "n5", to: "n6" }
    ]
  },

  "claims-development": {
    type: "line",
    title: "How claims develop",
    caption: "Illustrative development of one underwriting year. Incurred claims, which include case reserves, approach the ultimate loss faster than paid claims. The gap between incurred claims and the ultimate is the IBNR.",
    x: { min: 1, max: 8, ticks: [1, 2, 3, 4, 5, 6, 7, 8], title: "Years from the start of the underwriting year" },
    y: { min: 0, max: 100, ticks: [0, 25, 50, 75, 100], suffix: "%", title: "Share of ultimate loss" },
    refs: [{ y: 100, label: "Ultimate" }],
    series: [
      { name: "Incurred", tone: "c1", points: [[1, 45], [2, 70], [3, 84], [4, 92], [5, 96], [6, 98], [7, 99], [8, 100]] },
      { name: "Paid", tone: "c2", points: [[1, 15], [2, 38], [3, 58], [4, 73], [5, 84], [6, 91], [7, 96], [8, 99]] }
    ]
  },

  /* ---------- Part 3: reinsurance ---------- */
  "reins-chain": {
    type: "graph",
    title: "Passing risk along",
    caption: "Premium flows down the chain and claim payments flow back up. The policyholder deals only with its insurer, which remains liable even if a reinsurer fails.",
    cols: 4,
    gap: 62,
    nodes: [
      { id: "ph", at: [1, 2], span: 2, label: "Policyholders" },
      { id: "ins", at: [2, 2], span: 2, label: "Insurer", sub: "The cedant", tone: "tint" },
      { id: "re", at: [3, 2], span: 2, label: "Reinsurer", tone: "brass" },
      { id: "retro", at: [4, 2], span: 2, label: "Retrocessionaire", sub: "The reinsurer’s reinsurer" }
    ],
    edges: [
      { from: "ph", to: "ins", label: "premium", bend: 46 },
      { from: "ins", to: "ph", label: "claims", bend: 46, tone: "good" },
      { from: "ins", to: "re", label: "premium", bend: 46 },
      { from: "re", to: "ins", label: "recoveries", bend: 46, tone: "good" },
      { from: "re", to: "retro", label: "premium", bend: 46 },
      { from: "retro", to: "re", label: "recoveries", bend: 46, tone: "good" }
    ]
  },

  "surplus-split": {
    type: "bars",
    title: "A surplus treaty and risks of different sizes",
    caption: "With a £2m retention and nine lines, the cedant keeps small risks entirely and £2m of each larger one, ceding the rest up to £18m. A £25m risk exceeds the treaty’s £20m capacity, so £5m needs facultative cover.",
    scale: 25,
    ticks: [0, 10, 20, 25],
    prefix: "£",
    suffix: "m",
    legend: [["cedant", "Cedant keeps"], ["c1", "Surplus treaty"], ["c2", "Facultative or declined"]],
    rows: [
      { label: "£1m risk", total: "all kept", segs: [[1, "", "cedant"]] },
      { label: "£5m risk", total: "40% kept", segs: [[2, "", "cedant"], [3, "£3m", "c1"]] },
      { label: "£10m risk", total: "20% kept", segs: [[2, "", "cedant"], [8, "£8m", "c1"]] },
      { label: "£25m risk", total: "8% kept", segs: [[2, "", "cedant"], [18, "£18m", "c1"], [5, "£5m", "c2"]] }
    ]
  },

  "three-ways": {
    type: "bars",
    title: "The same £10m loss, three ways",
    caption: "Proportional covers share every loss, by a fixed percentage (quota share) or according to the size of the risk (surplus). Excess of loss pays only the part above the retention.",
    scale: 10,
    legend: [["cedant", "Cedant keeps"], ["c1", "Reinsurer pays"]],
    rows: [
      { label: "Quota share 40%", total: "£10m", segs: [[6, "£6m", "cedant"], [4, "£4m", "c1"]] },
      { label: "Surplus, £2m retention on a £10m risk", total: "£10m", segs: [[2, "£2m", "cedant"], [8, "£8m", "c1"]] },
      { label: "Excess of loss £10m xs £5m", total: "£10m", segs: [[5, "£5m", "cedant"], [5, "£5m", "c1"]] }
    ]
  },

  "xl-tower": {
    type: "stack",
    title: "A catastrophe programme",
    caption: "Three layers stacked above a £50m retention give £350m of protection. Each layer is placed with its own panel of reinsurers, and losses above £400m fall back on the cedant.",
    max: 400,
    ticks: [0, 50, 100, 200, 400],
    prefix: "£",
    suffix: "m",
    layers: [
      { from: 0, to: 50, label: "Retention", sub: "kept by the cedant", tone: "neutral" },
      { from: 50, to: 100, label: "Layer 1", sub: "£50m xs £50m", tone: "c1" },
      { from: 100, to: 200, label: "Layer 2", sub: "£100m xs £100m", tone: "c1m" },
      { from: 200, to: 400, label: "Layer 3", sub: "£200m xs £200m", tone: "c1l" }
    ]
  },

  "cat-bond": {
    type: "graph",
    title: "How a catastrophe bond works",
    caption: "Investors’ principal is held in a collateral trust, and the insurer’s premium funds their coupon. If the defined catastrophe occurs, the collateral pays the insurer’s claim instead of being returned to the investors.",
    cols: 4,
    nodes: [
      { id: "ins", at: [1, 1], span: 2, label: "Insurer", sub: "The sponsor", tone: "tint" },
      { id: "inv", at: [1, 3], span: 2, label: "Investors", sub: "Buy the bond", tone: "brass" },
      { id: "spv", at: [2, 2], span: 2, label: "Special purpose vehicle", sub: "Issues the bond", tone: "ink" },
      { id: "trust", at: [3, 2], span: 2, label: "Collateral trust", sub: "Holds the principal" }
    ],
    edges: [
      { from: "ins", to: "spv", toAt: 0.2, label: "premium" },
      { from: "inv", to: "spv", fromAt: 0.3, toAt: 0.7, label: "principal" },
      { from: "spv", to: "inv", fromSide: "r", toSide: "b", toAt: 0.85, label: "coupon", tone: "good" },
      { from: "spv", to: "trust", label: "invested", dash: true },
      { from: "trust", to: "ins", fromSide: "l", toSide: "b", toAt: 0.3, label: "if triggered", tone: "tint" }
    ]
  },

  programme: {
    type: "graph",
    title: "How a property programme responds",
    caption: "The covers respond in a stated order. The surplus treaty reduces each large risk to the cedant’s line, the per risk cover caps each retained loss, and the catastrophe programme caps the total retained from one event.",
    cols: 4,
    steps: true,
    nodes: [
      { id: "g", at: [1, 2], span: 2, label: "Gross losses", sub: "Before any reinsurance" },
      { id: "s", at: [2, 2], span: 2, label: "Surplus treaty", sub: "Cedes each risk above the cedant’s line", tone: "tint" },
      { id: "p", at: [3, 2], span: 2, label: "Per risk excess of loss", sub: "Caps the loss kept on any one risk", tone: "tint" },
      { id: "c", at: [4, 2], span: 2, label: "Catastrophe programme", sub: "Caps the total kept from one event", tone: "tint" },
      { id: "n", at: [5, 2], span: 2, label: "Net retained loss", sub: "What the cedant finally pays", tone: "ink" }
    ],
    edges: [
      { from: "g", to: "s" },
      { from: "s", to: "p" },
      { from: "p", to: "c" },
      { from: "c", to: "n" }
    ]
  },

  "sliding-scale": {
    type: "line",
    title: "A sliding scale commission",
    caption: "The provisional commission of 30% applies at a 60% loss ratio. Each point by which the loss ratio falls below 60% adds a point of commission, up to 35%; each point above takes one away, down to 25%.",
    x: { min: 50, max: 70, ticks: [50, 55, 60, 65, 70], suffix: "%", title: "Final loss ratio" },
    y: { min: 20, max: 40, ticks: [20, 25, 30, 35, 40], suffix: "%", title: "Commission" },
    series: [{ name: "Commission", tone: "c1", points: [[50, 35], [55, 35], [60, 30], [65, 25], [70, 25]] }],
    marks: [
      { x: 55, y: 35, label: "Maximum 35%", dx: 6, dy: -10 },
      { x: 60, y: 30, label: "Provisional 30%", dx: 9, dy: -6 },
      { x: 65, y: 25, label: "Minimum 25%", dx: 6, dy: 17 }
    ]
  },

  "loss-corridor": {
    type: "bars",
    title: "A loss corridor",
    caption: "Under a quota share with a corridor between 70% and 80%, losses up to a 70% loss ratio are shared, the cedant keeps all losses between 70% and 80%, and sharing resumes above 80%.",
    scale: 120,
    ticks: [0, 70, 80, 120],
    suffix: "%",
    legend: [["c1", "Shared with the reinsurer"], ["c2", "Kept by the cedant: the corridor"]],
    rows: [{ label: "Treaty loss ratio", total: "", segs: [[70, "Shared", "c1"], [10, "", "c2"], [40, "Shared", "c1"]] }]
  },

  "ep-layer": {
    type: "line",
    title: "Where a catastrophe layer sits",
    caption: "Illustrative modelled losses for a cedant, rising with the return period. A £100m xs £100m layer starts to pay in about a 1-in-25-year event and is exhausted at about 1-in-200.",
    x: { min: 2, max: 500, log: true, ticks: [2, 5, 10, 25, 50, 100, 200, 500], title: "Return period in years (log scale)" },
    y: { min: 0, max: 280, ticks: [0, 100, 200], prefix: "£", suffix: "m", title: "Modelled loss" },
    bands: [{ from: 100, to: 200, label: "Layer: £100m xs £100m", tone: "c2" }],
    series: [{ name: "Modelled loss", tone: "c1", points: [[2, 20], [5, 45], [10, 70], [25, 100], [50, 130], [100, 165], [200, 200], [500, 260]] }],
    marks: [
      { x: 25, y: 100, label: "Attaches: 1 in 25", dx: 8, dy: 16 },
      { x: 200, y: 200, label: "Exhausted: 1 in 200", dx: -8, dy: -9, anchor: "end" }
    ]
  },

  "renewal-season": {
    type: "timeline",
    title: "The road to 1 January",
    caption: "A typical timetable for the 1 January renewal. Exact dates vary by cedant and with market conditions.",
    from: 6,
    to: 13,
    ticks: [6, 7, 8, 9, 10, 11, 12, 13],
    tickLabels: ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan"],
    rows: [
      { id: "r1", label: "Review and plan", segs: [[6, 9, "c1m"]] },
      { id: "r2", label: "Monte Carlo and Baden-Baden", segs: [[9, 10.9, "c2"]] },
      { id: "r3", label: "Submissions issued", segs: [[9.8, 11.4, "c1m"]] },
      { id: "r4", label: "Quotes and firm orders", segs: [[11, 12.7, "c1"]] },
      { id: "r5", label: "Lines signed, cover incepts", segs: [[12.5, 13, "c4"]] }
    ]
  },

  /* ---------- Part 4: running an insurance business ---------- */
  "earned-premium": {
    type: "timeline",
    title: "Earned and unearned premium",
    caption: "A £120,000 annual policy incepts on 1 October. By 31 December a quarter of the cover has been provided, so a quarter of the premium has been earned.",
    from: 2025.75,
    to: 2026.75,
    ticks: [2025.75, 2026, 2026.25, 2026.5, 2026.75],
    tickLabels: ["1 Oct", "1 Jan", "1 Apr", "1 Jul", "1 Oct"],
    markers: [[2026, "31 December"]],
    legend: [["write", "Earned by 31 December"], ["open", "Unearned"]],
    rows: [{ id: "pol", label: "Annual policy", segs: [[2025.75, 2026, "write", "£30k"], [2026, 2026.75, "open", "£90k unearned"]] }]
  },

  ratio: {
    type: "bars",
    title: "Reading a combined ratio",
    caption: "The loss ratio plus the expense ratio. Below the 100% line underwriting makes money; above it, underwriting loses money.",
    scale: 120,
    mark: [100, "100%"],
    legend: [["c1", "Loss ratio"], ["c2", "Expense ratio"]],
    rows: [
      { label: "A good year", total: "93%", segs: [[60, "60%", "c1"], [33, "33%", "c2"]] },
      { label: "A catastrophe year", total: "111%", segs: [[78, "78%", "c1"], [33, "33%", "c2"]] }
    ]
  },

  cycle: {
    type: "graph",
    title: "The underwriting cycle",
    caption: "Profits draw in capital, competition softens prices until losses bite, capital leaves, and prices harden again.",
    cols: 3,
    nodes: [
      { id: "profit", at: [1, 1], label: "Profits", sub: "Results look good" },
      { id: "capital", at: [1, 2], label: "Capital arrives", sub: "More capacity" },
      { id: "soft", at: [1, 3], label: "Soft market", sub: "Prices fall, terms widen", tone: "tint" },
      { id: "losses", at: [2, 3], label: "Losses", sub: "Claims exceed premium", tone: "bad" },
      { id: "exit", at: [2, 2], label: "Capital leaves", sub: "Capacity shrinks" },
      { id: "hard", at: [2, 1], label: "Hard market", sub: "Prices rise, terms tighten", tone: "brass" }
    ],
    edges: [
      { from: "profit", to: "capital" },
      { from: "capital", to: "soft" },
      { from: "soft", to: "losses", fromSide: "b", toSide: "t" },
      { from: "losses", to: "exit" },
      { from: "exit", to: "hard" },
      { from: "hard", to: "profit", fromSide: "t", toSide: "b" }
    ]
  },

  "planning-cycle": {
    type: "graph",
    title: "The planning cycle",
    caption: "Strategy and risk appetite shape the plan, the plan drives the capital, approval allows underwriting to begin, and monitoring and reforecasting feed lessons into the next strategy.",
    cols: 3,
    nodes: [
      { id: "a", at: [1, 1], label: "Strategy and risk appetite", tone: "ink" },
      { id: "b", at: [1, 2], label: "Business plan", sub: "Class by class" },
      { id: "c", at: [1, 3], label: "Capital and approval", tone: "brass" },
      { id: "d", at: [2, 3], label: "Underwrite", tone: "tint" },
      { id: "e", at: [2, 2], label: "Monitor results" },
      { id: "f", at: [2, 1], label: "Reforecast and learn" }
    ],
    edges: [
      { from: "a", to: "b" },
      { from: "b", to: "c" },
      { from: "c", to: "d", fromSide: "b", toSide: "t" },
      { from: "d", to: "e" },
      { from: "e", to: "f" },
      { from: "f", to: "a", fromSide: "t", toSide: "b" }
    ]
  },

  "premium-waterfall": {
    type: "waterfall",
    title: "From expiring premium to plan",
    caption: "The plan starts from the premium due to renew, removes the business expected to be lost, adds rate, exposure and new business, and arrives at the plan premium.",
    prefix: "£",
    suffix: "m",
    steps: [
      { label: "Expiring premium", value: 100, total: true },
      { label: "Business not renewed", value: -12 },
      { label: "Rate change (+5%)", value: 4.4 },
      { label: "Exposure change (+3%)", value: 2.8 },
      { label: "New business", value: 15 },
      { label: "Plan premium", total: true }
    ]
  },

  "lr-build": {
    type: "bars",
    title: "Building a plan loss ratio",
    caption: "The plan loss ratio is the sum of attritional, large and catastrophe components, each estimated separately.",
    scale: 80,
    ticks: [0, 20, 40, 60, 80],
    suffix: "%",
    legend: [["c1", "Attritional"], ["c2", "Large losses"], ["c3", "Catastrophe"]],
    rows: [{ label: "Plan loss ratio", total: "63%", segs: [[48, "48%", "c1"], [9, "9%", "c2"], [6, "6%", "c3"]] }]
  },

  "pnl-waterfall": {
    type: "waterfall",
    title: "From gross premium to result",
    caption: "The example plan in this lesson: £200m of premium becomes an overall result of £8m after acquisition costs, claims, expenses, the net cost of reinsurance and investment income.",
    prefix: "£",
    suffix: "m",
    steps: [
      { label: "Gross premium", value: 200, total: true },
      { label: "Acquisition costs", value: -56 },
      { label: "Gross claims", value: -118 },
      { label: "Operating expenses", value: -16 },
      { label: "Net cost of reinsurance", value: -8 },
      { label: "Investment income", value: 6 },
      { label: "Overall result", total: true }
    ]
  },

  "lloyds-timeline": {
    type: "timeline",
    title: "A typical Lloyd’s planning year",
    caption: "An indicative timetable; Lloyd’s sets the exact dates each year. Plans for the coming year of account are prepared in the summer, submitted in the autumn and approved before 1 January.",
    from: 3,
    to: 13,
    ticks: [3, 5, 7, 9, 11, 13],
    tickLabels: ["Mar", "May", "Jul", "Sep", "Nov", "Jan"],
    rows: [
      { id: "l1", label: "Strategy and appetite", segs: [[3, 6, "c1m"]] },
      { id: "l2", label: "Plan and capital built", segs: [[5, 9, "c1"]] },
      { id: "l3", label: "Submitted to Lloyd’s", segs: [[9, 10, "c2"]] },
      { id: "l4", label: "Review and approval", segs: [[9.5, 12.5, "c1m"]] },
      { id: "l5", label: "Year of account begins", segs: [[12.7, 13, "c4"]] }
    ]
  },

  "plan-vs-actual": {
    type: "line",
    title: "Premium against plan",
    caption: "Illustrative cumulative written premium against the planned phasing. By the end of September the class is £15m behind plan, which needs an explanation: discipline in a softening market, or lost business?",
    x: { min: 1, max: 12, ticks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], labels: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"] },
    y: { min: 0, max: 160, ticks: [0, 40, 80, 120, 160], prefix: "£", suffix: "m", title: "Cumulative premium" },
    series: [
      { name: "Plan", tone: "neutral", dash: true, points: [[1, 35], [2, 42], [3, 50], [4, 75], [5, 82], [6, 90], [7, 112], [8, 118], [9, 124], [10, 132], [11, 140], [12, 150]] },
      { name: "Actual", tone: "c1", points: [[1, 33], [2, 39], [3, 46], [4, 68], [5, 74], [6, 81], [7, 99], [8, 104], [9, 109]] }
    ],
    marks: [{ x: 9, y: 109, label: "£109m vs £124m", dx: 6, dy: 18 }]
  },

  "rate-index": {
    type: "line",
    title: "A cumulative rate index",
    caption: "An illustrative index for one class, starting at 100. Prices fell in the soft market to 2017, rose sharply from 2019 and levelled off by 2024.",
    x: { min: 2015, max: 2025, ticks: [2015, 2017, 2019, 2021, 2023, 2025] },
    y: { min: 80, max: 160, ticks: [80, 100, 120, 140, 160], title: "Index" },
    refs: [{ y: 100, label: "Base: 2015", align: "start" }],
    series: [{ name: "Rate index", tone: "c1", points: [[2015, 100], [2016, 97], [2017, 95], [2018, 97], [2019, 103], [2020, 112], [2021, 124], [2022, 133], [2023, 141], [2024, 143], [2025, 140]] }],
    marks: [
      { x: 2017, y: 95, label: "Soft market", dx: 0, dy: 17, anchor: "middle" },
      { x: 2024, y: 143, label: "143", dx: 0, dy: -10, anchor: "middle" }
    ]
  },

  "technical-price": {
    type: "bars",
    title: "Technical price and actual price",
    caption: "The technical price adds expenses, a charge for capital and a profit margin to the expected loss. In this example the premium actually charged is 92% of technical.",
    scale: 110,
    mark: [100, "Technical"],
    legend: [["c1", "Expected loss"], ["c2", "Expenses"], ["c3", "Cost of capital"], ["c4", "Profit margin"], ["neutral", "Premium charged"]],
    rows: [
      { label: "Technical price", total: "£100", segs: [[60, "60", "c1"], [25, "25", "c2"], [8, "8", "c3"], [7, "7", "c4"]] },
      { label: "Actual price", total: "£92, 92% of technical", segs: [[92, "92", "neutral"]] }
    ]
  },

  "ep-curve": {
    type: "line",
    title: "An exceedance probability curve",
    caption: "Illustrative modelled hurricane losses for a portfolio, by return period. The 1-in-200-year loss of £180m is within the risk appetite limit of £200m.",
    x: { min: 5, max: 500, log: true, ticks: [5, 10, 25, 50, 100, 200, 500], title: "Return period in years (log scale)" },
    y: { min: 0, max: 250, ticks: [0, 50, 100, 150, 200, 250], prefix: "£", suffix: "m", title: "Modelled loss" },
    refs: [{ y: 200, label: "Appetite limit £200m", align: "start" }],
    series: [{ name: "Modelled loss", tone: "c1", points: [[5, 30], [10, 55], [25, 90], [50, 120], [100, 150], [200, 180], [500, 225]] }],
    marks: [{ x: 200, y: 180, label: "£180m", dx: 8, dy: 15 }]
  },

  diversification: {
    type: "bars",
    title: "The diversification benefit",
    caption: "Each book needs £50m of capital on its own. Because their worst years rarely coincide, the combined business needs £75m rather than £100m, a diversification benefit of £25m.",
    scale: 100,
    ticks: [0, 25, 50, 75, 100],
    prefix: "£",
    suffix: "m",
    legend: [["c1", "Marine cargo"], ["c2", "Professional indemnity"], ["neutral", "Combined business"]],
    rows: [
      { label: "Marine cargo alone", total: "£50m", segs: [[50, "", "c1"]] },
      { label: "Professional indemnity alone", total: "£50m", segs: [[50, "", "c2"]] },
      { label: "Simple total", total: "£100m", segs: [[50, "", "c1"], [50, "", "c2"]] },
      { label: "Combined requirement", total: "£75m", segs: [[75, "", "neutral"]] }
    ]
  },

  "portfolio-matrix": {
    type: "quadrant",
    title: "A portfolio matrix",
    caption: "Illustrative segments plotted by price adequacy and growth. Growth in underpriced segments, in the shaded top-left quadrant, is the warning sign.",
    x: { min: 75, max: 125, split: 100, ticks: [80, 90, 100, 110, 120], suffix: "%", title: "Actual-to-technical price" },
    y: { min: -20, max: 30, split: 0, ticks: [-20, -10, 0, 10, 20, 30], suffix: "%", title: "Premium growth" },
    quadrants: { tl: "Danger", tr: "Grow", bl: "Fix or exit", br: "Win more" },
    points: [
      { label: "Cyber", x: 86, y: 24 },
      { label: "US binder", x: 95, y: 9, dx: -9, anchor: "end" },
      { label: "Fine art", x: 112, y: 14 },
      { label: "Marine cargo", x: 106, y: 4, dy: -9 },
      { label: "Energy", x: 116, y: -8 },
      { label: "D&O", x: 84, y: -12 }
    ]
  },

  "gross-net": {
    type: "bars",
    title: "Gross and net catastrophe exposure",
    caption: "Catastrophe reinsurance reduces this portfolio’s modelled 1-in-200-year loss from £260m gross to £150m net, inside the £200m appetite limit.",
    scale: 300,
    mark: [200, "Appetite £200m"],
    legend: [["c1", "Kept by the business"], ["open", "Recovered from reinsurers"]],
    rows: [
      { label: "Gross 1-in-200 loss", total: "£260m", segs: [[260, "£260m", "c1"]] },
      { label: "Net 1-in-200 loss", total: "£150m", segs: [[150, "£150m", "c1"], [110, "", "open"]] }
    ]
  },

  "mga-model": {
    type: "graph",
    title: "Where an MGA sits",
    caption: "Carriers grant binding authorities and provide the capital; the MGA underwrites and administers; brokers bring the clients; and a claims administrator may handle claims. Premium and data flow back to the carriers.",
    cols: 3,
    nodes: [
      { id: "a", at: [1, 1], label: "Carrier A", tone: "brass" },
      { id: "b", at: [1, 2], label: "Carrier B", tone: "brass" },
      { id: "c", at: [1, 3], label: "Carrier C", tone: "brass" },
      { id: "mga", at: [2, 1], span: 3, label: "Managing general agent", sub: "Underwrites, binds and administers", tone: "tint" },
      { id: "br", at: [3, 1], span: 2, label: "Brokers", sub: "Bring the clients" },
      { id: "tpa", at: [3, 3], label: "Claims handler", sub: "Often a TPA" },
      { id: "ph", at: [4, 1], span: 2, label: "Policyholders" }
    ],
    edges: [
      { from: "a", to: "mga", toAt: 0.167 },
      { from: "b", to: "mga", label: "capacity" },
      { from: "c", to: "mga", toAt: 0.833 },
      { from: "mga", to: "br", fromAt: 0.333, label: "products" },
      { from: "mga", to: "tpa", fromAt: 0.833 },
      { from: "br", to: "ph" }
    ]
  },

  "mga-panel": {
    type: "bars",
    title: "A three-carrier panel",
    caption: "Every policy on the binder is shared in the same proportions, so a £10m claim is paid £4m by Carrier A, £3.5m by Carrier B and £2.5m by Carrier C.",
    scale: 100,
    legend: [["c1", "Carrier A (lead)"], ["c2", "Carrier B"], ["c3", "Carrier C"]],
    rows: [
      { label: "Share of every policy", total: "100%", segs: [[40, "40%", "c1"], [35, "35%", "c2"], [25, "25%", "c3"]] },
      { label: "A £10m claim", total: "£10m", segs: [[40, "£4m", "c1"], [35, "£3.5m", "c2"], [25, "£2.5m", "c3"]] }
    ]
  },

  fronting: {
    type: "graph",
    title: "A fronted programme",
    caption: "The MGA binds policies on the fronting insurer’s paper. The fronting insurer keeps a small share, charges a fee and cedes most of the risk to reinsurers, but remains liable to policyholders if a reinsurer fails.",
    cols: 4,
    nodes: [
      { id: "mga", at: [1, 1], span: 2, label: "MGA", sub: "Underwrites and binds", tone: "tint" },
      { id: "ph", at: [1, 3], span: 2, label: "Policyholders" },
      { id: "fr", at: [2, 2], span: 2, label: "Fronting insurer", sub: "Issues the policies, keeps a small share, charges a fee", tone: "ink" },
      { id: "re", at: [3, 2], span: 2, label: "Reinsurers", sub: "Take most of the risk, often with collateral", tone: "brass" }
    ],
    edges: [
      { from: "mga", to: "fr", label: "binds on its paper" },
      { from: "fr", to: "ph", label: "policies" },
      { from: "fr", to: "re", label: "quota share", bend: 50 },
      { from: "re", to: "fr", label: "claims", bend: 50, tone: "good" }
    ]
  },

  "mga-premium": {
    type: "waterfall",
    title: "Where £100 of premium goes",
    caption: "Using the example in this lesson: of every £100 of premium, £10 goes to the broker, £18 to the MGA, £55 to claims and £5 to the carrier’s expenses, leaving the carrier £12 of underwriting profit.",
    prefix: "£",
    legend: [["c2", "Paid out"], ["total", "Totals"]],
    steps: [
      { label: "Premium", value: 100, total: true },
      { label: "Broker commission", value: -10 },
      { label: "MGA commission", value: -18 },
      { label: "Claims", value: -55 },
      { label: "Carrier expenses", value: -5 },
      { label: "Carrier’s underwriting profit", total: true }
    ]
  },

  "mga-pc": {
    type: "waterfall",
    diverging: true,
    title: "Profit commission with a deficit carried forward",
    caption: "Profit commission of 20% over three underwriting years. The Year 2 loss must be recovered from Year 3’s profit before any further profit commission is paid.",
    prefix: "£",
    suffix: "m",
    dp: 1,
    legend: [["c1", "Underwriting profit"], ["c2", "Underwriting loss"]],
    steps: [
      { label: "Year 1", value: 1.0, note: "Profit commission 20% × £1.0m = £0.20m" },
      { label: "Year 2", value: -0.6, note: "No profit commission; £0.6m deficit carried forward" },
      { label: "Year 3", value: 1.5, note: "20% × (£1.5m − £0.6m) = £0.18m" }
    ]
  },

  "oversight-loop": {
    type: "graph",
    title: "The oversight cycle",
    caption: "Every binder year follows the same loop: authority granted, business bound and reported, results reviewed and audited, and terms renewed or changed.",
    cols: 3,
    nodes: [
      { id: "a", at: [1, 1], label: "Binder agreed", tone: "ink" },
      { id: "b", at: [1, 2], label: "Policies bound" },
      { id: "c", at: [1, 3], label: "Bordereaux sent", sub: "Usually monthly" },
      { id: "d", at: [2, 3], label: "Carrier review", sub: "Usually quarterly", tone: "tint" },
      { id: "e", at: [2, 2], label: "Audit" },
      { id: "f", at: [2, 1], label: "Renewal terms", tone: "brass" }
    ],
    edges: [
      { from: "a", to: "b" },
      { from: "b", to: "c" },
      { from: "c", to: "d", fromSide: "b", toSide: "t" },
      { from: "d", to: "e" },
      { from: "e", to: "f" },
      { from: "f", to: "a", fromSide: "t", toSide: "b" }
    ]
  },

  /* ---------- Part 5: the market today ---------- */
  regulators: {
    type: "graph",
    title: "Who regulates whom",
    caption: "Insurers and managing agents answer to both the PRA and the FCA, brokers answer to the FCA, and Lloyd’s adds its own oversight of its market.",
    cols: 3,
    nodes: [
      { id: "pra", at: [1, 1], label: "PRA", sub: "Financial soundness", tone: "ink" },
      { id: "fca", at: [1, 3], label: "FCA", sub: "Conduct", tone: "ink" },
      { id: "lloyds", at: [2, 2], label: "Lloyd’s", sub: "Oversees its market", tone: "tint" },
      { id: "ins", at: [3, 1], label: "Insurers and managing agents", sub: "PRA and FCA" },
      { id: "cov", at: [3, 2], label: "Cover­holders", sub: "Approved by Lloyd’s" },
      { id: "brokers", at: [3, 3], label: "Brokers", sub: "FCA only" }
    ],
    edges: [
      { from: "pra", to: "lloyds" },
      { from: "fca", to: "lloyds" },
      { from: "pra", to: "ins" },
      { from: "fca", to: "brokers" },
      { from: "lloyds", to: "ins", dash: true },
      { from: "lloyds", to: "cov", dash: true }
    ]
  }
};
