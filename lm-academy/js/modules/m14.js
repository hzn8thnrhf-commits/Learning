/* The Slip — Portfolio management */
window.SLIP_DATA = window.SLIP_DATA || {};
(window.SLIP_DATA.modules = window.SLIP_DATA.modules || []).push({
  id: "m14",
  title: "Portfolio management",
  short: "Portfolio",
  blurb: "Managing the book as a whole: data, technical price, accumulation, diversification, steering the mix, reinsurance and governance.",
  outcomes: [
    "Explain how portfolio management differs from underwriting individual risks.",
    "Measure a book through exposure, rate indices, results by segment and technical price adequacy.",
    "Explain accumulation, catastrophe modelling and diversification.",
    "Describe how the mix is steered, how reinsurance shapes the net portfolio and how governance supports decisions."
  ],
  lessons: [
    {
      title: "From risks to portfolios",
      minutes: 6,
      keys: ["The book as a whole", "Profit and volatility", "Capital efficiency", "Concentration"],
      intro: "An underwriter’s training starts with single risks. But an insurer’s results depend on how all its risks behave together. Compare the two columns: what good underwriting of each risk gives you, and what only managing the whole book can give you.",
      diagram: {
        cols: 2,
        gapX: 66,
        nodes: [
          {
            id: "risk", at: [1, 1], tone: "ink", label: "Each risk", sub: "Selected and priced well",
            teach: "Underwriting is about the individual risk: reading the submission, assessing the hazard, setting terms and agreeing a price. Good risk selection is **necessary**, but as the rest of the diagram shows, it isn’t **sufficient**."
          },
          {
            id: "book", at: [1, 2], tone: "ink", label: "The book", sub: "How they behave together",
            teach: "**Portfolio management** is the discipline of managing the book as a whole: what mix to write, how much exposure to accept in each area, and how to balance profit against volatility and capital.\n\nFifty well-priced properties within a mile of the same coast are fifty good risks and one dangerous portfolio.",
            like: "Portfolio management is to underwriting what menu planning is to cooking. Each dish must be good, but the menu must also balance its costs, play to the kitchen’s strengths, avoid relying on one supplier and still make money on a quiet night."
          },
          {
            id: "profit", at: [2, 1], label: "Profitability", sub: "Price covers the full cost",
            teach: "**Profitability**: writing business whose price covers its expected cost, including the cost of the capital it ties up."
          },
          {
            id: "stable", at: [2, 2], label: "Stability", sub: "Volatility within appetite",
            teach: "**Stability**: keeping the volatility of results within the risk appetite. Volatility falls as a book grows, but only if its risks are genuinely independent. The model shows how."
          },
          {
            id: "capital", at: [3, 1], label: "Capital efficiency", sub: "The best return on capital",
            teach: "**Capital efficiency**: earning the best return on the capital held, which means knowing how much capital each part of the book consumes."
          },
          {
            id: "resilient", at: [3, 2], tone: "bad", label: "Resilience", sub: "No fatal concentrations",
            teach: "**Resilience**: avoiding concentrations that a single event, client, broker or legal change could damage. This is where a book of individually sound risks most often fails."
          },
          {
            id: "pm", at: [4, 1], span: 2, tone: "tint", label: "Portfolio management", sub: "Both views, together",
            teach: "The two views complement each other. A book of individually well-priced risks can still be dangerous if concentrated, or uneconomic if it needs heavy capital; and a well-balanced portfolio can’t compensate for consistently poor underwriting of individual risks."
          }
        ],
        edges: [
          { from: "risk", to: "book", label: "add up to", teach: "Individual risks combine into a book with properties of its own." },
          { from: "risk", to: "profit", label: "needs", teach: "Profitability starts with pricing each risk properly." },
          { from: "book", to: "stable", label: "needs", teach: "Stability is a property of the book, not of any one risk." },
          { from: "profit", to: "capital", label: "on capital", teach: "Profit only counts relative to the capital it needs." },
          { from: "stable", to: "resilient", label: "and", teach: "Stable in ordinary years isn’t enough; the book must survive the extraordinary one." },
          { from: "capital", to: "pm", teach: "Capital efficiency is one of the portfolio manager’s jobs..." },
          { from: "resilient", to: "pm", teach: "...and so is resilience against concentration." }
        ]
      },
      explore: "large-numbers",
      think: { q: "An underwriter has written fifty well-priced commercial property risks, all within a mile of the same stretch of coast. Why might the portfolio manager be concerned?", a: "Each risk may be sound on its own, but together they form an accumulation. A single hurricane or storm surge could damage many of them at once, producing a loss far larger than the premiums anticipate and possibly breaching the risk appetite." },
      takeaways: [
        "Portfolio management manages the book as a whole, alongside the underwriting of each risk.",
        "Its aims are profitability, stability, capital efficiency and resilience.",
        "Well-priced risks can still form a dangerous or inefficient portfolio."
      ]
    },
    {
      title: "Knowing the book",
      minutes: 6,
      keys: ["Exposure data", "Rate index", "Results by segment", "Data quality"],
      intro: "Portfolio management begins with measurement: what has been written, where, at what price and with what results. Follow the data down the page, and notice the trap waiting at the bottom right.",
      diagram: {
        cols: 2,
        gapX: 66,
        nodes: [
          {
            id: "data", at: [1, 1], span: 2, tone: "ink", label: "The data", sub: "What, where, at what price, with what result",
            teach: "Everything depends on data quality. Without accurate exposure data, neither catastrophe modelling nor pricing can be relied on, which is why the market cares so much about data standards."
          },
          {
            id: "exp", at: [2, 1], label: "Exposure", sub: "What could be lost",
            teach: "**Exposure** data describe what the business stands to lose: sums insured and limits, locations, construction and occupancy for property, vessels and voyages for marine, turnover and activities for liability. It can be summarised by territory, peril, industry, broker or coverholder."
          },
          {
            id: "prem", at: [2, 2], label: "Premium and rate", sub: "And a rate index",
            teach: "Premium is tracked by class, segment and channel, with the **rate change** on renewals and the share of new business. Because rate changes compound, the portfolio manager follows a cumulative **rate index**: +10%, +8% and −5% give 1.10 × 1.08 × 0.95 = +12.9%, not +13%. Over longer periods the difference grows, and the model sets the index against claims inflation."
          },
          {
            id: "results", at: [3, 1], span: 2, tone: "tint", label: "Results", sub: "By year, and by type of loss",
            teach: "Loss ratios are analysed by underwriting year, developed to ultimate, with attritional, large and catastrophe losses shown separately. That way a single large claim doesn’t hide a deteriorating attritional trend, and a benign year doesn’t hide an emerging problem."
          },
          {
            id: "seg", at: [4, 1], label: "By segment", sub: "Where the business can act",
            teach: "Results are also split by segment: territory, broker, industry, size band. Portfolio decisions should be made at the level of detail at which the business can actually act."
          },
          {
            id: "avg", at: [4, 2], tone: "bad", label: "Averages mislead", sub: "60% = 40% and 90%",
            teach: "Be aware: a class with an average loss ratio of 60% may contain one segment at 40% and another at 90%. An acceptable overall figure can conceal one excellent segment subsidising a poor one."
          }
        ],
        edges: [
          { from: "data", to: "exp", label: "measures", teach: "One half of the data: what could be lost." },
          { from: "data", to: "prem", label: "measures", teach: "The other: what is being charged for it." },
          { from: "exp", to: "results", label: "explains", teach: "Exposure explains where losses came from." },
          { from: "prem", to: "results", label: "÷ into", teach: "Premium is the denominator of every loss ratio." },
          { from: "results", to: "seg", label: "split", teach: "Totals are split into segments the business can act on." },
          { from: "seg", to: "avg", label: "reveals", teach: "Splitting reveals what the average hides." }
        ]
      },
      explore: "rate-index",
      takeaways: [
        "Portfolio management starts with accurate data on exposure, premium, rate and results.",
        "Rate changes compound, so a cumulative rate index beats a sum of changes, and must be set against claims inflation.",
        "Results should be split by underwriting year, type of loss and segment, because averages conceal subsidies."
      ]
    },
    {
      title: "Technical price and rate adequacy",
      minutes: 6,
      keys: ["Technical price", "Expected loss", "Cost of capital", "Actual-to-technical"],
      intro: "Rate change tells you how prices have moved; it doesn’t say whether they are adequate. A 10% increase on a risk that was 30% underpriced still leaves it underpriced. Build a technical price from the four blocks at the top, then compare it with what was actually charged.",
      diagram: {
        cols: 4,
        nodes: [
          {
            id: "el", at: [1, 1], label: "Loss", sub: "Expected claims",
            teach: "The **expected loss**: the expected cost of claims, from experience, exposure rating or catastrophe models."
          },
          {
            id: "ex", at: [1, 2], label: "Costs", sub: "Expenses",
            teach: "**Expenses**: acquisition costs and a share of operating expenses."
          },
          {
            id: "coc", at: [1, 3], label: "Capital", sub: "Its cost",
            teach: "The **cost of capital**: a charge for the capital the risk consumes, reflecting its volatility and its contribution to catastrophe exposure. Two risks with the same expected loss can need very different capital."
          },
          {
            id: "pm", at: [1, 4], label: "Margin", sub: "Extra profit",
            teach: "A **profit margin**: any further margin the business requires on top."
          },
          {
            id: "tp", at: [2, 1], span: 4, tone: "tint", label: "Technical price", sub: "What the risk should cost",
            teach: "Add them up and you have the **technical price**: the premium that would cover the risk’s expected cost and provide the required return.",
            like: "The technical price is like costing a dish in a restaurant. The menu price can sit above or below the cost of ingredients, labour and overheads for good reasons, but a restaurant selling most dishes below cost won’t last, however popular it is."
          },
          {
            id: "actual", at: [3, 1], span: 2, label: "Actual premium", sub: "What was charged",
            teach: "The premium actually agreed with the client, after negotiation, competition and the underwriter’s judgement."
          },
          {
            id: "at", at: [3, 3], span: 2, label: "Actual ÷ technical", sub: "e.g. 111% or 80%",
            teach: "The **actual-to-technical ratio**, often called price adequacy: 100% means priced exactly as the model requires; 90% means 10% below technical. Segment A writing £20m against a technical £18m is at 111%; Segment B writing £20m against £25m is at 80%. Both may have had a 5% rate increase this year, but only A is adequately priced."
          },
          {
            id: "pattern", at: [4, 1], span: 4, tone: "brass", label: "Read the pattern", sub: "Drifting below technical? Act before the losses arrive",
            teach: "Technical prices are only as good as their models and data, and an underwriter may have good reasons to depart from them on one risk. Their value is in the pattern. A segment whose ratio is drifting down, even while reported rate changes stay positive, is a signal to act before the losses arrive. How can both be true? Because technical prices can rise faster than actual ones, as inflation and model changes push up expected costs."
          }
        ],
        edges: [
          { from: "el", to: "tp", teach: "Expected claims are the biggest building block." },
          { from: "ex", to: "tp", teach: "Expenses are added." },
          { from: "coc", to: "tp", teach: "So is the cost of the capital the risk consumes." },
          { from: "pm", to: "tp", teach: "And any further margin." },
          { from: "tp", to: "at", label: "divides", teach: "The technical price is the denominator of price adequacy." },
          { from: "actual", to: "at", teach: "The actual premium is the numerator." },
          { from: "at", to: "pattern", label: "across the book", teach: "Aggregated across segments, the ratio shows where the book is adequately priced and where it isn’t." }
        ]
      },
      explore: "technical",
      takeaways: [
        "Rate change shows how prices move; the technical price shows whether they are adequate.",
        "A technical price covers expected loss, expenses, the cost of capital and a profit margin.",
        "The actual-to-technical ratio compares the premium charged with the technical price; the pattern matters most."
      ]
    },
    {
      title: "Accumulation and catastrophe",
      minutes: 7,
      keys: ["Accumulation", "EP curves", "Return periods", "Realistic Disaster Scenarios"],
      intro: "Some losses arrive one risk at a time; others strike many risks together. Controlling these accumulations is one of the most important jobs in portfolio management. Follow one event from the model down to the limits that keep it survivable.",
      diagram: {
        cols: 2,
        gapX: 60,
        nodes: [
          {
            id: "event", at: [1, 1], span: 2, tone: "bad", label: "One event, many risks", sub: "Hurricane, quake, cyber, a legal change",
            teach: "An **accumulation** is the total exposure that a single event could affect: a hurricane, an earthquake, a flood, a cyber attack on a widely used system, or a legal change hitting a whole industry.",
            like: "Managing accumulation is like a fruit grower spreading orchards across several valleys. A late frost in one valley is painful but survivable; if every orchard is in the same valley, one cold night can destroy the whole crop."
          },
          {
            id: "model", at: [2, 1], label: "Catastrophe model", sub: "Thousands of simulated years",
            teach: "**Catastrophe models** simulate many thousands of possible events and estimate the loss each would cause to the portfolio.\n\nBe aware: a model’s output is an estimate, not a fact. Different models can give very different figures for the same portfolio, and each new version can move the numbers."
          },
          {
            id: "ep", at: [2, 2], label: "EP curve", sub: "The chance of each loss",
            teach: "The output is an **exceedance probability (EP) curve**: the probability that losses exceed any given amount in a year. **OEP** looks at the largest single event in a year; **AEP** at the total of all events."
          },
          {
            id: "aal", at: [3, 1], label: "Average annual loss", sub: "For pricing and planning",
            teach: "The **average annual loss** (AAL) is the average catastrophe loss per year across all simulated years: the expected cost used in pricing and planning."
          },
          {
            id: "rp", at: [3, 2], label: "Return period losses", sub: "1-in-100 = 1% a year",
            teach: "Points on the curve are described by **return period**: a 1-in-100-year loss has a 1% chance of being exceeded in any one year; a 1-in-200 a 0.5% chance. A loss at a chosen return period, used to set limits, is often called a **probable maximum loss** (PML).\n\nCareful: return period losses don’t add up. Two accounts’ 1-in-200 losses may come from the same storms or different ones, so the combined portfolio must be modelled again."
          },
          {
            id: "limits", at: [4, 1], span: 2, tone: "tint", label: "Limits", sub: "Modelled losses and sums insured by zone",
            teach: "Risk appetite becomes limits on modelled losses, such as a maximum 1-in-200 loss for each peril and region, and on simpler measures such as the total sum insured in each zone. Managers monitor them as business is written, and stop writing in a zone close to its limit. The model shows a zone filling up."
          },
          {
            id: "rds", at: [5, 1], label: "Realistic Disaster Scenarios", sub: "Lloyd’s standard events",
            teach: "Lloyd’s requires syndicates to report their losses from a set of standard **Realistic Disaster Scenarios**, so that exposures can be compared across the market and the whole market’s exposure to one event can be seen."
          },
          {
            id: "beyond", at: [5, 2], tone: "brass", label: "Beyond the models", sub: "Judgement, and risks without a map",
            teach: "Models don’t cover everything. Some perils are poorly modelled, some territories have little data, and some accumulations, in cyber, casualty or political risk, don’t follow geography at all. Good practice combines models with scenarios, expert judgement and simple exposure limits."
          }
        ],
        edges: [
          { from: "event", to: "model", label: "simulated by", teach: "The model simulates the events that could hit the portfolio." },
          { from: "model", to: "ep", label: "produces", teach: "Its output is the EP curve." },
          { from: "model", to: "aal", label: "averages to", teach: "Averaging over all simulated years gives the AAL." },
          { from: "ep", to: "rp", label: "read off", teach: "Return period losses are read off the curve." },
          { from: "rp", to: "limits", label: "set", teach: "Return period losses are what the limits are set against." },
          { from: "limits", to: "rds", label: "checked with", teach: "Standard scenarios test the limits against specific disasters." },
          { from: "limits", to: "beyond", label: "plus", teach: "And judgement covers what the models miss." }
        ]
      },
      explore: "accumulation",
      takeaways: [
        "An accumulation is the total exposure that a single event could affect.",
        "Catastrophe models produce EP curves, average annual losses and return period losses, which don’t simply add up.",
        "Risk appetite becomes limits on modelled losses and on exposure in each zone; models are combined with scenarios and judgement."
      ]
    },
    {
      title: "Diversification",
      minutes: 6,
      keys: ["Diversification benefit", "Correlation", "Extreme events", "Capital"],
      intro: "Why can an insurer write many classes with less capital than they’d need as separate businesses? Because they don’t all go wrong at once. Follow two books down into one, and then see where the benefit disappears.",
      diagram: {
        cols: 2,
        gapX: 60,
        nodes: [
          {
            id: "a", at: [1, 1], label: "Marine cargo", sub: "Needs £50m alone",
            teach: "On its own, a marine cargo book would need £50m of capital to survive a 1-in-200-year year."
          },
          {
            id: "b", at: [1, 2], label: "Professional indemnity", sub: "Needs £50m alone",
            teach: "A professional indemnity book would also need £50m on its own."
          },
          {
            id: "sum", at: [2, 1], span: 2, tone: "q", label: "If they went wrong together", sub: "£100m",
            teach: "If the two books were perfectly correlated, so both suffered their worst year at the same time, the combined business would need the full £100m."
          },
          {
            id: "together", at: [3, 1], span: 2, tone: "tint", label: "Rarely bad together", sub: "Combined, about £75m",
            teach: "In practice a cargo book and a PI book rarely have their worst years together: a bad shipping year has little to do with a wave of negligence claims. So the combined requirement might be nearer £75m.",
            like: "Diversification is like a household with earners in different industries. If one employer closes, the household survives. But a deep recession can hit every employer at once, and a family that assumed its jobs were unrelated discovers they weren’t."
          },
          {
            id: "benefit", at: [4, 1], tone: "good", label: "Diversification benefit", sub: "£25m of capital saved",
            teach: "The **diversification benefit** is the capital saved against the sum of the standalone requirements: £100m − £75m = £25m. It is why a multi-line insurer can be capital-efficient, and why a reinsurer seeks business that doesn’t share its peak exposures."
          },
          {
            id: "fails", at: [4, 2], tone: "bad", label: "Fails in extremes", sub: "Hurricane, crisis, pandemic",
            teach: "Diversification is weakest when it’s needed most. A major hurricane damages property, energy, marine and motor together; a financial crisis hits credit insurance, D&O and investments at once; the pandemic produced claims in contingency, travel and business interruption simultaneously. Correlations that look low in ordinary years can rise sharply in extreme ones."
          }
        ],
        edges: [
          { from: "a", to: "sum", teach: "Add the standalone needs together..." },
          { from: "b", to: "sum", teach: "...as if the two books always failed together." },
          { from: "sum", to: "together", label: "but in practice", teach: "Because they rarely do, the combined need is lower." },
          { from: "together", to: "benefit", label: "saves", teach: "The gap is the diversification benefit." },
          { from: "together", to: "fails", label: "unless", teach: "In extreme events, the books start failing together again." }
        ]
      },
      explore: "diversification",
      think: { q: "Why might a reinsurer with a global property catastrophe portfolio still be very exposed to a single event?", a: "If its largest exposures are concentrated in one peril and region, such as US hurricane, that peril will dominate its tail risk however many other territories it writes. Diversification helps most when no single peril dominates." },
      takeaways: [
        "Diversification reduces total risk by combining exposures that don’t all go wrong together.",
        "The diversification benefit is the capital saved against the sum of standalone requirements.",
        "Correlations rise in extreme events, so diversification is weakest when it is most needed."
      ]
    },
    {
      title: "Steering the mix",
      minutes: 6,
      keys: ["Portfolio matrix", "Appetite guides", "Line size", "The cycle"],
      intro: "With measures of price adequacy, growth and capital in place, the portfolio manager decides where to grow, hold and shrink. The middle of the diagram is a 2 × 2 matrix. Notice the arrow that runs from the best quadrant to the most dangerous one.",
      diagram: {
        cols: 2,
        gapX: 60,
        nodes: [
          {
            id: "matrix", at: [1, 1], span: 2, tone: "ink", label: "The portfolio matrix", sub: "Price adequacy against growth",
            teach: "A common approach plots each segment by its price adequacy (actual-to-technical) and its recent growth. Each quadrant calls for a different response."
          },
          {
            id: "good", at: [2, 1], tone: "good", label: "Well priced, growing", sub: "Doing what we want",
            teach: "Well priced and growing: exactly what the business wants. Keep going, and keep checking that the growth isn’t being bought with price."
          },
          {
            id: "win", at: [2, 2], label: "Well priced, shrinking", sub: "Worth winning more",
            teach: "Well priced but shrinking: good business that is slipping away. It may deserve more effort to win: broker attention, larger lines, faster service."
          },
          {
            id: "danger", at: [3, 1], tone: "bad", label: "Poorly priced, growing", sub: "The most dangerous",
            teach: "Poorly priced and growing fast: the most dangerous quadrant, because its growth is probably coming from underpricing. A segment at 85% of technical that grew 25% last year needs higher rates or tighter terms, smaller lines, and a hard look at where the new business comes from, before results deteriorate."
          },
          {
            id: "fix", at: [3, 2], tone: "brass", label: "Poorly priced, shrinking", sub: "Remediate or exit",
            teach: "Poorly priced and shrinking: candidates for remediation or exit, as in Module 12."
          },
          {
            id: "levers", at: [4, 1], span: 2, tone: "tint", label: "The levers", sub: "Appetite, price, line size, lead or follow, distribution",
            teach: "The levers: **appetite guides** telling underwriters and brokers which risks are welcome, acceptable or unwanted; **pricing** loadings and minimum rates; **line size**, bigger where pricing is strong; **leading or following**; and **distribution**, investing in brokers, coverholders or MGAs that produce good business.",
            like: "Steering the mix is like managing a farm’s fields. Rich fields with good prices are planted more heavily; poor fields are rested or turned to something else; and the farmer adjusts each year to market prices rather than planting out of habit."
          },
          {
            id: "timing", at: [5, 1], span: 2, label: "Timing and the cycle", sub: "Shrinking in a soft market takes discipline",
            teach: "The right mix changes with the market. When rates are high, grow the classes with strong margins; when rates fall, hold back and accept a smaller share. Shrinking in a soft market is easy to describe and hard to do, because brokers, staff and the expense base all push for volume."
          }
        ],
        edges: [
          { from: "matrix", to: "good", teach: "Top left: the goal." },
          { from: "matrix", to: "win", teach: "Top right: good business to win back." },
          { from: "good", to: "danger", label: "if growth is bought", teach: "A good segment slides into the danger quadrant if its growth comes from cutting price." },
          { from: "win", to: "fix", label: "if neglected", teach: "Good business that drifts away and is repriced cheaply can end up needing remediation." },
          { from: "danger", to: "levers", label: "urgently", teach: "The danger quadrant needs the levers first." },
          { from: "fix", to: "levers", label: "or exit", teach: "The weak, shrinking quadrant needs remediation or a decision to leave." },
          { from: "levers", to: "timing", label: "through", teach: "How hard to pull each lever depends on where the market is in the cycle." }
        ]
      },
      explore: "matrix",
      takeaways: [
        "Plotting segments by price adequacy and growth shows where to grow, hold or shrink.",
        "Poorly priced segments that are growing fast are the most dangerous.",
        "The levers include appetite guides, pricing, line size, leading or following, and distribution; the right mix changes with the cycle."
      ]
    },
    {
      title: "Reinsurance as a portfolio tool",
      minutes: 6,
      keys: ["The net portfolio", "Value against capital", "Retention", "Credit risk"],
      intro: "Reinsurance changes the shape of the net portfolio, the part the business keeps, without changing what it offers clients. The question isn’t whether reinsurance is cheap, but whether it’s good value for the risk and capital it removes. Weigh the two boxes at the bottom against each other.",
      diagram: {
        cols: 2,
        gapX: 60,
        nodes: [
          {
            id: "gross", at: [1, 1], span: 2, tone: "ink", label: "The gross portfolio", sub: "What clients are offered",
            teach: "The gross portfolio is what the business writes for its clients. Reinsurance lets it keep offering the same cover while choosing how much of the risk to keep."
          },
          {
            id: "xl", at: [2, 1], label: "Excess of loss", sub: "Cuts the largest losses",
            teach: "Excess of loss cuts off the largest losses, reducing volatility and the capital needed for large and catastrophe risks. Catastrophe cover trims the tail of the EP curve, bringing the net 1-in-200 loss within appetite."
          },
          {
            id: "qs", at: [2, 2], label: "Quota share", sub: "Shrinks the whole account",
            teach: "Proportional reinsurance reduces the whole account. It can support growth, or cut capital in a class where the business wants to keep its client relationships but carry less risk. A 30% quota share gives away 30% of the expected profit, but may release capital that earns more elsewhere."
          },
          {
            id: "net", at: [3, 1], span: 2, tone: "tint", label: "The net portfolio", sub: "What the business keeps",
            teach: "Setting the retention is a balance. A low retention gives a stable net result but costs more, because the reinsurer pays more frequent losses; a high retention is cheaper but leaves more volatility with the business. The limit decides how far up the EP curve protection goes, guided by appetite and capital models."
          },
          {
            id: "cost", at: [4, 1], tone: "bad", label: "The reinsurer’s margin", sub: "e.g. £10m a year",
            teach: "Reinsurance costs money, because the reinsurer expects a margin over the losses it pays: say a catastrophe programme costs £10m a year more than its expected recoveries."
          },
          {
            id: "cap", at: [4, 2], tone: "good", label: "Capital released", sub: "£80m × 15% = £12m a year",
            teach: "But it cuts the capital requirement, say by £80m. If the business’s cost of capital is 15%, that capital is worth £12m a year."
          },
          {
            id: "value", at: [5, 1], span: 2, tone: "brass", label: "Good value?", sub: "£12m of capital value for £10m of margin: yes",
            teach: "Here the reinsurance is cheaper than holding the capital: £12m of value for £10m of cost. The model lets you test other cases.\n\nBe aware that reinsurance replaces insurance risk with **credit risk**: a recovery is only worth something if the reinsurer pays. So portfolio managers watch their reinsurers’ financial strength and limit any one reinsurer’s share."
          }
        ],
        edges: [
          { from: "gross", to: "xl", label: "trimmed by", teach: "Excess of loss trims the top off the gross losses." },
          { from: "gross", to: "qs", label: "shared by", teach: "A quota share shares the whole account." },
          { from: "xl", to: "net", teach: "What’s left after the excess of loss..." },
          { from: "qs", to: "net", teach: "...and the quota share is the net portfolio." },
          { from: "net", to: "cost", label: "costs", teach: "Shaping the net portfolio costs the reinsurer’s margin." },
          { from: "net", to: "cap", label: "frees", teach: "But a less risky net portfolio needs less capital." },
          { from: "cost", to: "value", teach: "Weigh the cost..." },
          { from: "cap", to: "value", teach: "...against the value of the capital released." }
        ]
      },
      explore: "reinsurance-value",
      takeaways: [
        "Reinsurance changes the net portfolio without changing what is offered to clients.",
        "Its value is judged against the capital and volatility it removes, not just its price.",
        "Retention and limit decisions balance cost against stability; recoveries depend on reinsurers paying."
      ]
    },
    {
      title: "Governance and information",
      minutes: 5,
      keys: ["Authorities", "Peer review", "Management information", "Fair value"],
      intro: "Portfolio management depends on people making good decisions with good information within clear rules. Follow the rules down the left and the evidence down the right, and see that both are needed.",
      diagram: {
        cols: 2,
        nodes: [
          {
            id: "gov", at: [1, 1], tone: "ink", label: "Governance", sub: "The rules",
            teach: "Governance provides the rules within which underwriters exercise judgement.",
            like: "Governance and information are a ship’s charts and instruments. A skilled captain can sail without them for a while, but no owner would trust a valuable cargo to a ship whose instruments are broken or whose charts are years out of date."
          },
          {
            id: "mi", at: [1, 2], tone: "ink", label: "Management information", sub: "The evidence",
            teach: "Management information provides the evidence on which decisions are made. Good MI is timely, accurate and focused on decisions."
          },
          {
            id: "auth", at: [2, 1], label: "Authorities", sub: "Limits and referral",
            teach: "Each underwriter has written **authorities**: limits on the classes, line sizes and risks they may accept, with referral to a more senior underwriter above them."
          },
          {
            id: "pack", at: [2, 2], label: "The portfolio pack", sub: "Premium, rate, adequacy, losses",
            teach: "A typical portfolio pack shows premium against plan, rate change and price adequacy by segment, retention and new business, loss ratios by underwriting year with attritional, large and catastrophe losses separated, exposure against limits, and the main movements since last time."
          },
          {
            id: "peer", at: [3, 1], label: "Peer review", sub: "A second pair of eyes",
            teach: "In **peer review**, a second underwriter reviews a sample of risks, or every risk above a threshold, before or shortly after binding."
          },
          {
            id: "q", at: [3, 2], label: "Leads to questions", sub: "Not buried in detail",
            teach: "Good MI should lead the reader to the questions that matter, not bury them in detail. A hundred pages of tables that nobody acts on is not information."
          },
          {
            id: "audit", at: [4, 1], label: "Audits and committees", sub: "Independent checks",
            teach: "**Underwriting audits** periodically test files for compliance with guidelines, pricing and documentation. An **underwriting committee** reviews performance, appetite and major decisions; a **reserving committee** reviews claims reserves."
          },
          {
            id: "conduct", at: [4, 2], label: "Customer outcomes", sub: "Fair value, Consumer Duty",
            teach: "Portfolio management isn’t only about financial results. Where products reach consumers or small businesses, insurers must show they offer **fair value** and meet customers’ needs, under the FCA’s product governance rules and the **Consumer Duty**. Reviews increasingly include claims acceptance rates, complaints and value delivered."
          },
          {
            id: "dec", at: [5, 1], span: 2, tone: "good", label: "Good decisions", sub: "Rules and evidence together",
            teach: "Rules without evidence are blind; evidence without rules is ignored. Portfolio management needs both, applied by people with the judgement to use them."
          }
        ],
        edges: [
          { from: "gov", to: "auth", label: "sets", teach: "Governance starts with clear authorities." },
          { from: "auth", to: "peer", label: "checked by", teach: "Peer review checks risks are written within authority and appetite." },
          { from: "peer", to: "audit", label: "and", teach: "Audits and committees provide independent oversight." },
          { from: "mi", to: "pack", label: "packaged as", teach: "Information reaches decision-makers as a regular pack." },
          { from: "pack", to: "q", label: "should raise", teach: "Its job is to raise the right questions." },
          { from: "q", to: "conduct", label: "including", teach: "Including whether customers are getting fair value." },
          { from: "audit", to: "dec", teach: "Rules feed good decisions..." },
          { from: "conduct", to: "dec", teach: "...and so does evidence." }
        ]
      },
      takeaways: [
        "Governance sets the rules: authorities, referrals, peer review, audits and committees.",
        "Management information should be timely, accurate and focused on decisions.",
        "Portfolio reviews include customer outcomes and fair value, not only financial results."
      ]
    }
  ],
  quiz: [
    {
      q: "What is the main difference between underwriting and portfolio management?",
      options: [
        "Portfolio management considers how all the risks behave together, not each risk alone",
        "Portfolio management is carried out only by actuaries",
        "Underwriting ignores price",
        "There is no real difference"
      ],
      answer: 0,
      why: "Underwriting assesses each risk; portfolio management manages the mix, the accumulations and the capital of the book as a whole."
    },
    {
      q: "Rates rise by 10%, then by 10% again, then fall by 10%. What is the cumulative change?",
      options: ["+8.9%", "+9.5%", "+10.0%", "+11.0%"],
      answer: 0,
      why: "1.10 × 1.10 × 0.90 = 1.089, an increase of 8.9%. Rate changes compound rather than add."
    },
    {
      q: "A segment has written £30m of premium against a technical price of £36m. What is its actual-to-technical ratio?",
      options: ["80%", "83%", "94%", "120%"],
      answer: 1,
      why: "£30m ÷ £36m = 83%, so the segment is about 17% below technical price."
    },
    {
      q: "What does a 1-in-200-year loss mean?",
      options: [
        "A loss with a 0.5% chance of being exceeded in any one year",
        "A loss that happens exactly once every 200 years",
        "The largest loss in recorded history",
        "The average annual loss"
      ],
      answer: 0,
      why: "Return periods express probabilities: 1 in 200 is a 0.5% annual chance of exceedance."
    },
    {
      q: "Two books each need £40m of capital on their own; together they need £60m. What is the diversification benefit?",
      options: ["£20m", "£40m", "£60m", "£80m"],
      answer: 0,
      why: "The standalone total is £80m. The combined requirement of £60m saves £20m."
    },
    {
      q: "Which kind of segment is the most dangerous?",
      options: ["Well priced and growing", "Well priced and shrinking", "Poorly priced and growing fast", "Poorly priced and shrinking"],
      answer: 2,
      why: "Fast growth in a poorly priced segment usually means the business is winning it by underpricing."
    },
    {
      q: "A catastrophe programme costs £8m a year more than its expected recoveries and reduces required capital by £60m. The cost of capital is 15%. Is it good value?",
      options: [
        "Yes: the capital released is worth £9m a year, more than the £8m cost",
        "No: reinsurance always costs more than it saves",
        "No: the capital released is worth only £6m a year",
        "It is impossible to tell"
      ],
      answer: 0,
      why: "15% of £60m is £9m a year, which exceeds the £8m expected cost of the reinsurance."
    },
    {
      q: "What does the actual-to-technical ratio show that rate change does not?",
      options: [
        "Whether prices are adequate, not merely how they have moved",
        "How many policies renewed",
        "The brokerage paid",
        "The rate of claims inflation"
      ],
      answer: 0,
      why: "A positive rate change can still leave business underpriced. The actual-to-technical ratio measures adequacy directly."
    }
  ]
});
