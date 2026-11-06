/* The Slip — Reinsurance */
window.SLIP_DATA = window.SLIP_DATA || {};
(window.SLIP_DATA.modules = window.SLIP_DATA.modules || []).push({
  id: "m07",
  title: "Reinsurance",
  short: "Re­insurance",
  blurb: "Insurance for insurers: why it is bought, treaty and facultative, proportional and excess of loss, programmes, alternative capital and programme design.",
  outcomes: [
    "Explain why insurers buy reinsurance and who bears a reinsurer’s credit risk.",
    "Distinguish treaty from facultative reinsurance.",
    "Calculate cessions under quota share and surplus treaties, and recoveries under excess of loss.",
    "Explain reinstatements, hours clauses, insurance-linked securities and the logic of programme design."
  ],
  lessons: [
    {
      title: "Why insurers buy reinsurance",
      minutes: 7,
      keys: ["Cedant", "Retrocession", "Capital relief", "Credit risk"],
      intro: "Reinsurance is insurance for insurance companies. The first diagram shows who is connected to whom, and notice in particular who is not connected. The second shows why an insurer would give away part of its premium in the first place.",
      diagram: [
        {
          name: "The chain",
          cols: 2,
          gapX: 64,
          nodes: [
            {
              id: "ph", at: [1, 1], span: 2, label: "Policyholders", sub: "Deal only with their insurer",
              teach: "The original policyholders bought cover from their insurer. They are not party to the reinsurance contract and have **no direct rights against the reinsurer**. Most don’t know it exists."
            },
            {
              id: "cedant", at: [2, 1], span: 2, tone: "ink", label: "The cedant", sub: "The insurer buying reinsurance",
              teach: "An insurer that has accepted more risk than it wants to keep passes part of it to a reinsurer, in return for a share of the premium. That insurer is the **cedant**, or ceding company, and the risk it passes on is **ceded**.",
              like: "A bakery gets an order for a 2,000-slice wedding cake. If anything goes wrong the loss would be ruinous, so it subcontracts part of the order to a larger bakery. The couple deal only with the first bakery; the risk is shared behind the scenes."
            },
            {
              id: "reins", at: [3, 1], tone: "tint", label: "The reinsurer", sub: "Takes part of the risk",
              teach: "The **reinsurer** accepts part of the cedant’s risk for part of the premium. London is one of the world’s principal reinsurance centres, alongside Bermuda, Zurich and Munich, and Lloyd’s as a whole is one of the largest reinsurers in the world."
            },
            {
              id: "credit", at: [3, 2], tone: "bad", label: "Credit risk", sub: "If the reinsurer fails…",
              teach: "If a reinsurer fails, the cedant must still pay its policyholders **in full**. Reinsurance is a contract between insurers, so the cedant bears the credit risk of its reinsurers. That’s why cedants care so much about the security of their reinsurance panel."
            },
            {
              id: "retro", at: [4, 1], span: 2, label: "Retrocession", sub: "Reinsurance for reinsurers",
              teach: "Reinsurers protect themselves in the same way, buying reinsurance of their own called **retrocession** from **retrocessionaires**. Risk can travel several steps from the original policyholder, which is exactly what went wrong in the LMX spiral of Module 03."
            }
          ],
          edges: [
            { from: "ph", to: "cedant", label: "insured by", teach: "Policyholders’ contracts are with the cedant alone." },
            { from: "cedant", to: "reins", label: "cedes", fromSide: "b", fromAt: 0.25, teach: "The cedant passes part of its risk, and part of its premium, to the reinsurer." },
            { from: "cedant", to: "credit", label: "bears", fromSide: "b", fromAt: 0.75, teach: "The cedant remains liable to its policyholders even if a reinsurer can’t pay." },
            { from: "reins", to: "retro", label: "retrocedes", fromSide: "b", toSide: "t", toAt: 0.25, teach: "The reinsurer passes part of what it has taken on to its own reinsurers." }
          ]
        },
        {
          name: "Why buy it",
          intro: "Why give away premium? Because reinsurance solves several problems at once, and they are connected.",
          cols: 2,
          nodes: [
            {
              id: "problem", at: [1, 1], span: 2, tone: "ink", label: "More risk than it wants to keep", sub: "The cedant’s problem",
              teach: "Every insurer faces the same tension: writing more business earns more premium, but the more risk it keeps, the more capital it needs and the more one bad event could hurt."
            },
            {
              id: "capacity", at: [2, 1], label: "Capacity", sub: "Room for bigger risks",
              teach: "Reinsurance lets an insurer accept larger risks than its own capital could support, by ceding the part it doesn’t want to keep."
            },
            {
              id: "cat", at: [2, 2], label: "Catastrophe protection", sub: "One event, many claims",
              teach: "Reinsurance protects against the accumulation of many losses from a single event, such as a hurricane or an earthquake, the risk that can sink an insurer in one night."
            },
            {
              id: "lines", at: [3, 1], label: "Bigger lines", sub: "Compete for large risks",
              teach: "With capacity behind it, a small insurer can write meaningful lines on large risks and compete with much bigger rivals."
            },
            {
              id: "stable", at: [3, 2], label: "Stable results", sub: "Smoother year to year",
              teach: "By taking the top off the worst losses, reinsurance smooths results, so one large loss or a bad year doesn’t wipe out the insurer’s profits. Investors and rating agencies value that stability."
            },
            {
              id: "expert", at: [4, 1], label: "Expertise", sub: "Help with new classes",
              teach: "Reinsurers see many cedants’ portfolios and bring knowledge of pricing, wordings and new classes, which helps cedants enter new markets."
            },
            {
              id: "capital", at: [4, 2], tone: "good", label: "Capital relief", sub: "Less capital to hold",
              teach: "Less risk on the balance sheet means less capital required. For many insurers, **renting** capital through reinsurance, bought for the risks that need it and adjusted every year, is cheaper than **owning** more capital, which is slow, expensive and permanent to raise."
            }
          ],
          edges: [
            { from: "problem", to: "capacity", teach: "One answer: borrow someone else’s capacity." },
            { from: "problem", to: "cat", teach: "Another: protect against the single catastrophic event." },
            { from: "capacity", to: "lines", label: "lets it write", teach: "More capacity means bigger lines on bigger risks." },
            { from: "cat", to: "stable", label: "smooths", teach: "Cutting off the worst events makes results steadier." },
            { from: "lines", to: "expert", label: "new classes need", teach: "Writing new kinds of business is easier with a reinsurer’s experience behind you." },
            { from: "stable", to: "capital", label: "frees", teach: "Lower volatility means less capital is needed for the same business." }
          ]
        }
      ],
      think: { q: "A small insurer could raise more capital instead of buying reinsurance. Why might reinsurance be the better choice?", a: "Raising capital is slow, expensive and permanent, whereas reinsurance can be bought for the particular risks that need it, adjusted every year and spread across many reinsurers. For many insurers, renting capital through reinsurance is cheaper than owning it." },
      takeaways: [
        "Reinsurance transfers part of a cedant’s risk to a reinsurer in return for part of the premium.",
        "Policyholders have no direct rights against the reinsurer, and the cedant bears its reinsurers’ credit risk.",
        "Insurers buy reinsurance for capacity, catastrophe protection, stability, capital relief and expertise.",
        "Reinsurers protect themselves through retrocession."
      ]
    },
    {
      title: "Treaty and facultative",
      minutes: 6,
      keys: ["Facultative", "Treaty", "Obligatory", "Facultative obligatory"],
      intro: "Reinsurance can be arranged one risk at a time, or for a whole portfolio at once. Most insurers use both. Follow the cedant’s book down the two routes, and notice what each reinsurer is really relying on.",
      diagram: {
        cols: 2,
        gapX: 66,
        nodes: [
          {
            id: "book", at: [1, 1], span: 2, tone: "ink", label: "The cedant’s book", sub: "Thousands of risks",
            teach: "Picture all of an insurer’s German property business for a year: thousands of risks, most ordinary, a few unusual. How should it reinsure them?"
          },
          {
            id: "treaty", at: [2, 1], tone: "tint", label: "Treaty", sub: "The whole portfolio",
            teach: "A **treaty** covers a defined portfolio, such as all that German property business for a year. Every risk within its scope is ceded automatically, and the reinsurer can’t decline individual risks.",
            like: "Treaty reinsurance is a season ticket: you commit at the start, and every match in the season is included without a separate decision."
          },
          {
            id: "fac", at: [2, 2], label: "Facultative", sub: "One risk at a time",
            teach: "**Facultative** reinsurance covers a single risk, negotiated individually. Each party has the “faculty” to choose: the cedant needn’t offer the risk and the reinsurer needn’t accept it. A facultative reinsurer examines the survey, the loss history and the terms, much as a direct underwriter would.",
            like: "Facultative reinsurance is buying a ticket for a single match."
          },
          {
            id: "trust", at: [3, 1], label: "Trust in the cedant", sub: "No picking and choosing",
            teach: "Because a treaty is automatic and obligatory on both sides, the reinsurer depends entirely on the cedant’s underwriting. It is backing a portfolio and the people who build it, which is why treaty underwriting puts so much weight on assessing the cedant, as Module 10 shows."
          },
          {
            id: "odd", at: [3, 2], label: "Unusual risks", sub: "Too big, hazardous or excluded",
            teach: "Facultative cover is used for risks that fall outside the treaties because they are too large, too hazardous, or of a kind the treaties exclude."
          },
          {
            id: "facob", at: [4, 1], span: 2, tone: "brass", label: "Facultative obligatory", sub: "Cedant chooses, reinsurer must accept",
            teach: "Between the two lies the **facultative obligatory** treaty: the cedant may choose which risks to cede, but the reinsurer must accept them. It gives the cedant flexibility, but exposes the reinsurer to **selection against it**: the cedant may cede only its worst risks. Reinsurers write it with care."
          }
        ],
        edges: [
          { from: "book", to: "treaty", label: "most risks", teach: "The bulk of the portfolio is protected automatically by treaty." },
          { from: "book", to: "fac", label: "a few", teach: "Individual risks that don’t fit are reinsured one by one." },
          { from: "treaty", to: "trust", label: "requires", teach: "A reinsurer that can’t choose risks must trust the cedant’s underwriting." },
          { from: "fac", to: "odd", label: "used for", teach: "Facultative is the tool for the large, the hazardous and the excluded." },
          { from: "fac", to: "treaty", label: "protects", dash: true, teach: "By removing an unusual risk, facultative cover also protects the treaty from a risk that would distort it." },
          { from: "trust", to: "facob", label: "tested by", teach: "Letting the cedant choose puts that trust under even more strain." },
          { from: "odd", to: "facob", label: "flexible for", teach: "The hybrid gives the cedant a quick home for awkward risks." }
        ]
      },
      takeaways: [
        "Facultative reinsurance covers one risk at a time, and either party may decline.",
        "Treaty reinsurance covers a whole portfolio automatically, so the reinsurer relies on the cedant’s underwriting.",
        "Facultative cover is used for large, unusual or excluded risks, and to protect treaties.",
        "Facultative obligatory treaties let the cedant choose, but oblige the reinsurer to accept."
      ]
    },
    {
      title: "Proportional treaties",
      minutes: 8,
      keys: ["Quota share", "Surplus", "Lines", "Ceding commission"],
      intro: "Under proportional reinsurance, the reinsurer takes an agreed share of each risk, receives the same share of its premium and pays the same share of every claim. There are two ways of choosing the share, and they lead to very different net books. Compare the two diagrams, then try both models.",
      diagram: [
        {
          name: "Quota share",
          cols: 2,
          gapX: 84,
          nodes: [
            {
              id: "book", at: [1, 1], span: 2, tone: "ink", label: "£50m premium, £30m claims", sub: "The cedant’s gross book",
              teach: "Our insurer writes £50m of premium and incurs £30m of claims. It buys a **40% quota share**: a fixed percentage of every policy in the treaty is ceded, large or small."
            },
            {
              id: "keep", at: [2, 1], label: "Cedant keeps 60%", sub: "£30m premium, £18m claims",
              teach: "The cedant keeps 60% of everything: £30m of premium and £18m of claims.",
              like: "A quota share is like a business partner who invests 40% and takes 40% of every sale and 40% of every bill. However big or small the order, the split is the same."
            },
            {
              id: "cede", at: [2, 2], tone: "tint", label: "Reinsurer takes 40%", sub: "£20m premium, £12m claims",
              teach: "The reinsurer receives £20m of premium and pays £12m of claims: 40% of each, exactly."
            },
            {
              id: "shape", at: [3, 1], tone: "bad", label: "Same shape, smaller", sub: "Every catastrophe kept in part",
              teach: "A quota share leaves the **shape** of the net book unchanged: the cedant keeps a smaller copy of the same portfolio, including its share of every catastrophe, and gives away part of the profit on its best business.\n\nSo most quota shares carry an **event limit** and sit alongside excess of loss protection."
            },
            {
              id: "relief", at: [3, 2], tone: "good", label: "Simple capital relief", sub: "Popular with growing insurers",
              teach: "Quota shares are simple to administer and provide substantial capital relief, which makes them popular with growing insurers, new ventures and the carriers behind MGAs."
            }
          ],
          edges: [
            { from: "book", to: "keep", label: "60%", teach: "The cedant keeps the same 60% of every policy." },
            { from: "book", to: "cede", label: "40%", teach: "And cedes the same 40% of every policy." },
            { from: "cede", to: "keep", label: "commission", teach: "Because the cedant has already paid the costs of acquiring the business, the reinsurer returns part of the ceded premium as a **ceding commission**: at 30%, that’s £6m back to the cedant." },
            { from: "keep", to: "shape", label: "a copy", teach: "What the cedant keeps is a scaled-down copy of the original book." },
            { from: "cede", to: "relief", label: "frees", teach: "Ceding 40% of the risk frees a large share of the capital the book would need." }
          ]
        },
        {
          name: "Surplus",
          intro: "A surplus treaty works differently: the cedant keeps a fixed amount of each risk, not a fixed share.",
          cols: 2,
          gapX: 70,
          nodes: [
            {
              id: "risk", at: [1, 1], span: 2, tone: "ink", label: "A £10m risk", sub: "Retention £2m, nine lines",
              teach: "Under a **surplus** treaty the cedant keeps a fixed amount on each risk, its **retention** or **line**, and cedes the surplus above it, up to a stated number of lines. Here the retention is £2m and the treaty has nine lines."
            },
            {
              id: "ret", at: [2, 1], label: "Cedant keeps £2m", sub: "20% of this risk",
              teach: "On a £10m risk, the cedant keeps £2m, which is 20%. So it receives 20% of the premium and pays 20% of any claim on this risk. On a £1m risk, it would keep everything.\n\nMany cedants vary the retention by type of risk through a **table of limits**, keeping more on good risks and less on hazardous ones."
            },
            {
              id: "sur", at: [2, 2], tone: "tint", label: "Surplus £8m ceded", sub: "80% of this risk",
              teach: "The surplus above the retention, £8m, is ceded: 80% of this risk, with 80% of its premium and 80% of every claim on it. Notice that the share ceded varies from risk to risk; only the amount kept is fixed."
            },
            {
              id: "even", at: [3, 1], tone: "good", label: "An even net book", sub: "No more than £2m on any risk",
              teach: "The result is a much more even net portfolio: the cedant keeps no more than its line on any risk, while keeping small risks entirely. That is why surplus treaties are used mainly for property, where sums insured vary widely."
            },
            {
              id: "cap", at: [3, 2], label: "Treaty capacity", sub: "9 lines × £2m = £18m",
              teach: "The treaty’s capacity is the number of lines times the retention: 9 × £2m = £18m above the retention, so the cedant can write risks up to £20m in total."
            },
            {
              id: "fac", at: [4, 2], tone: "bad", label: "Beyond capacity", sub: "A £25m risk needs fac",
              teach: "A £25m risk exceeds the £20m total. The cedant must arrange **facultative** cover for the remaining £5m, or decline the risk. Here you can see facultative and treaty working together."
            }
          ],
          edges: [
            { from: "risk", to: "ret", label: "keeps", teach: "The cedant keeps its fixed retention." },
            { from: "risk", to: "sur", label: "cedes", teach: "Everything above the retention is ceded, up to the treaty’s capacity." },
            { from: "ret", to: "even", label: "caps", teach: "Because no more than £2m is kept on any one risk, the net book is evened out." },
            { from: "sur", to: "cap", label: "limited by", teach: "The amount ceded can’t exceed the treaty’s lines." },
            { from: "cap", to: "fac", label: "beyond that", teach: "Anything above the treaty’s capacity needs facultative cover." }
          ]
        }
      ],
      explore: ["quota-share", "surplus"],
      think: { q: "Under a surplus treaty with a £3m retention and ten lines, how is a £15m risk shared, and what share of a £6m claim does the reinsurer pay?", a: "The cedant keeps £3m, which is 20% of the risk, and cedes £12m, which is 80%, within the treaty’s £30m capacity. The reinsurer pays 80% of the £6m claim: £4.8m." },
      takeaways: [
        "Proportional reinsurance shares premium and claims in the same proportion, with a ceding commission returned to the cedant.",
        "A quota share cedes a fixed percentage of every policy and provides simple capital relief, but leaves the book’s shape unchanged.",
        "A surplus treaty cedes the part of each risk above the cedant’s retention, up to a number of lines, and evens out the net book."
      ]
    },
    {
      title: "Excess of loss",
      minutes: 7,
      keys: ["Excess of loss", "Retention", "Per risk and catastrophe", "Rate on line"],
      intro: "Excess of loss works on losses, not on shares of risks. The reinsurer pays only when a loss goes above a threshold, so it changes the shape of the net book by cutting off the largest losses. The first diagram follows one loss through a layer; the second shows the three ways of measuring “the loss”.",
      diagram: [
        {
          name: "How a layer pays",
          cols: 2,
          gapX: 70,
          nodes: [
            {
              id: "loss", at: [1, 1], span: 2, tone: "ink", label: "A £12m loss", sub: "On a £10m xs £5m layer",
              teach: "An excess of loss layer is described as its limit **in excess of** (xs) its retention. A layer of £10m xs £5m pays losses between £5m and £15m. Let’s send a £12m loss through it."
            },
            {
              id: "ret", at: [2, 1], label: "Retention £5m", sub: "The cedant pays first",
              teach: "The cedant pays the first £5m of each loss itself: its **retention**. A £3m loss would sit entirely here, and the reinsurer would pay nothing.",
              like: "It works like the excess on a car policy turned inside out. You pay the first slice of any claim; the reinsurer pays the middle slice, up to a cap; and if the claim is bigger still, the top slice is yours again."
            },
            {
              id: "layer", at: [2, 2], tone: "tint", label: "The layer pays £7m", sub: "£12m − £5m",
              teach: "The reinsurer pays the part above the retention, up to the limit: £12m − £5m = **£7m**. Unlike proportional cover, the reinsurer’s share depends on the size of the loss, not on a fixed percentage."
            },
            {
              id: "above", at: [3, 1], tone: "bad", label: "Above £15m", sub: "Back to the cedant",
              teach: "A £20m loss would exhaust the layer: the reinsurer pays its full £10m limit, and the cedant bears its £5m retention plus the £5m above the layer, unless it has bought another layer on top. That is why insurers build towers of layers, as the next lesson shows."
            },
            {
              id: "rol", at: [3, 2], label: "Rate on line", sub: "Premium ÷ limit",
              teach: "XL premium is usually a rate applied to the cedant’s premium income on the protected business, the **subject premium**, paid as a **minimum and deposit premium** and adjusted when the actual income is known.\n\nPrices are compared using **rate on line**: premium divided by limit. A £10m layer costing £1.5m has a rate on line of 15%. Low layers, hit often, carry high rates on line; high layers, rarely hit, carry low ones."
            }
          ],
          edges: [
            { from: "loss", to: "ret", label: "first £5m", teach: "The first £5m of the loss stays with the cedant." },
            { from: "loss", to: "layer", label: "next £10m", teach: "The layer covers the next £10m of the loss." },
            { from: "layer", to: "above", label: "if exhausted", teach: "Any part of a loss above £15m falls back on the cedant." },
            { from: "layer", to: "rol", label: "priced by", teach: "The layer’s price reflects how often, and how heavily, losses reach it." }
          ]
        },
        {
          name: "Three forms",
          intro: "What counts as “a loss” for the retention? It depends on the form of excess of loss.",
          cols: 3,
          nodes: [
            {
              id: "xl", at: [1, 1], span: 3, tone: "ink", label: "Excess of loss", sub: "Three ways to measure the loss",
              teach: "All three forms pay above a retention up to a limit. They differ in what is added up before the retention is applied: one risk, one event, or one year."
            },
            {
              id: "pr", at: [2, 1], label: "Per risk", sub: "One risk’s loss",
              teach: "**Per risk** excess of loss responds when the loss on a single risk exceeds the retention."
            },
            {
              id: "cx", at: [2, 2], label: "Catastrophe", sub: "One event’s total",
              teach: "**Catastrophe** excess of loss responds when the total of losses from one event, across many risks, exceeds the retention."
            },
            {
              id: "sl", at: [2, 3], label: "Stop loss", sub: "A year’s total",
              teach: "**Aggregate excess of loss**, or **stop loss**, responds when the total of losses over a year exceeds a threshold, often expressed as a loss ratio."
            },
            {
              id: "fire", at: [3, 1], tone: "q", label: "A factory fire",
              teach: "A fire destroys one factory: a classic per risk loss."
            },
            {
              id: "storm", at: [3, 2], tone: "q", label: "A hurricane",
              teach: "A hurricane damages 20,000 homes, none of them very badly. No single risk would trouble a per risk cover, but together they are a catastrophe."
            },
            {
              id: "year", at: [3, 3], tone: "q", label: "A bad year",
              teach: "Lots of medium-sized losses, none an event in itself, push the year’s loss ratio from 60% to 95%. Only a stop loss responds."
            }
          ],
          edges: [
            { from: "xl", to: "pr", teach: "Measure the loss risk by risk..." },
            { from: "xl", to: "cx", teach: "...event by event..." },
            { from: "xl", to: "sl", teach: "...or year by year." },
            { from: "pr", to: "fire", label: "e.g.", teach: "One large risk loss." },
            { from: "cx", to: "storm", label: "e.g.", teach: "Many risks hit by one event." },
            { from: "sl", to: "year", label: "e.g.", teach: "An accumulation of ordinary losses over a year." }
          ]
        }
      ],
      explore: "xl-layer",
      takeaways: [
        "Excess of loss pays the part of a loss above the retention, up to the limit, and cuts off the largest losses.",
        "Per risk covers respond to single risks, catastrophe covers to events, and stop loss covers to annual totals.",
        "Premium is usually a rate on the subject premium; rate on line is premium divided by limit."
      ]
    },
    {
      title: "Programmes, reinstatements and renewals",
      minutes: 7,
      keys: ["Layers and towers", "Reinstatements", "Hours clause", "Renewal dates"],
      intro: "Insurers rarely buy a single catastrophe layer. Follow a hurricane into a whole programme: how the treaty decides what one event is, how the tower responds, and how a used-up layer is brought back to life for the rest of the year.",
      diagram: {
        cols: 2,
        gapX: 74,
        nodes: [
          {
            id: "storm", at: [1, 1], span: 2, tone: "ink", label: "A hurricane", sub: "Days of wind and rain",
            teach: "A hurricane can rage for days and cause tens of thousands of claims. Before the reinsurance can respond, someone has to decide: is this one event or several?"
          },
          {
            id: "hours", at: [2, 1], label: "Hours clause", sub: "72 hours = one event",
            teach: "An **hours clause** groups all losses from a given peril within a set period, typically 72 consecutive hours for windstorm and longer for flood, with the cedant usually allowed to choose when the period begins.",
            like: "An hours clause is like a single call-out charge at a garage: everything fixed within the agreed window counts as one job with one fee, however many faults are mentioned."
          },
          {
            id: "ret", at: [2, 2], label: "A retention per event", sub: "So the definition matters",
            teach: "Each event bears its own retention, so the definition can make a large difference to recoveries. A storm split into two events means two retentions for the cedant to pay, but also two chances to recover. Module 10 lets you test this."
          },
          {
            id: "tower", at: [3, 1], span: 2, tone: "tint", label: "The tower responds", sub: "Layer by layer, each with its own panel",
            teach: "A catastrophe **programme**, or tower, stacks layers, such as £50m xs £50m, £100m xs £100m and £200m xs £200m. Each layer is placed separately, often with a different panel of reinsurers sharing it just as underwriters share a risk on a London slip.\n\nProgrammes renew on fixed dates: **1 January** for Europe and many global programmes, **1 April** for Japan, **1 June** for Florida before the hurricane season, and **1 July** for Australia, New Zealand and parts of the US."
          },
          {
            id: "used", at: [4, 1], tone: "bad", label: "Limit used up", sub: "£8m of a £20m layer",
            teach: "A layer’s limit is used up by the losses it pays. If a hurricane takes £8m from a £20m xs £20m layer, only £12m is left for any further event that year, and the cedant is exposed if a second storm follows."
          },
          {
            id: "reinst", at: [4, 2], tone: "good", label: "Reinstatement", sub: "Restored, for a premium",
            teach: "**Reinstatement** restores the limit so the layer can respond to a further event in the same year. A layer with one reinstatement at 100% can pay its full limit twice.\n\nThe cedant pays an additional premium, usually **pro rata as to amount**: if the layer cost £2m and £8m of its £20m was used, the reinstatement premium is £2m × 8 ÷ 20 = £0.8m."
          }
        ],
        edges: [
          { from: "storm", to: "hours", label: "grouped by", teach: "The hours clause decides how the storm’s losses are grouped into events." },
          { from: "hours", to: "ret", label: "each bears", teach: "Every separate event bears its own retention." },
          { from: "ret", to: "tower", label: "above it", teach: "Losses above the retention climb into the tower’s layers." },
          { from: "tower", to: "used", label: "consumes", teach: "Each layer’s limit is reduced by what it pays." },
          { from: "used", to: "reinst", label: "restored by", teach: "A reinstatement brings the used limit back for the next event, for an extra premium." }
        ]
      },
      explore: "reinstatement",
      think: { q: "A cedant’s £100m xs £100m layer has one reinstatement at 100%. Two hurricanes in the same year each cause £150m of losses. How much does the layer pay in total?", a: "Each event exceeds the £100m retention by £50m, so each produces a £50m recovery. After the first, the cedant reinstates the £50m of limit used, so the layer pays £100m across the two events, and the cedant pays a reinstatement premium for the limit restored." },
      takeaways: [
        "Catastrophe programmes stack layers into a tower, each placed with its own panel of reinsurers.",
        "Reinstatements restore a layer’s limit after a loss, in return for an additional premium.",
        "An hours clause defines a single event, and each event bears its own retention.",
        "The main renewal dates are 1 January, 1 April, 1 June and 1 July."
      ]
    },
    {
      title: "Alternative capital and insurance-linked securities",
      minutes: 6,
      keys: ["Catastrophe bonds", "Collateralised reinsurance", "Sidecars", "Parametric triggers"],
      intro: "Not all reinsurance capital comes from insurers. Since the 1990s, investors have taken on insurance risk directly. Follow their money into the three main structures, then down to the question every one of them must answer: what exactly triggers a payment?",
      diagram: {
        cols: 3,
        nodes: [
          {
            id: "inv", at: [1, 1], span: 3, tone: "ink", label: "Investors", sub: "Pension funds, specialist ILS funds",
            teach: "Investors such as pension funds and specialist funds take on insurance risk through **insurance-linked securities** (ILS) and related structures. Why? Because catastrophe returns are largely independent of stock and bond markets: a hurricane doesn’t care about interest rates. Their capital is now a significant part of the catastrophe reinsurance market."
          },
          {
            id: "bond", at: [2, 1], label: "Cat bond", sub: "Principal at risk",
            teach: "Investors in a **catastrophe bond** receive a coupon, and their principal back at maturity, unless a defined catastrophe occurs. If it does, they lose some or all of the principal, which pays the sponsor’s claims.",
            like: "A cat bond is like a loan with a weather condition attached. Investors collect interest while the skies stay calm. If a big enough storm strikes, they lose some or all of the loan, and that money pays the claims."
          },
          {
            id: "collat", at: [2, 2], label: "Collateralised", sub: "Reinsurance with funds in trust",
            teach: "**Collateralised reinsurance** is fully backed by funds held in trust for the cedant, which removes most of the credit risk you met in lesson 1: the money to pay the full limit is already set aside."
          },
          {
            id: "side", at: [2, 3], label: "Sidecar", sub: "A quota share, for a while",
            teach: "A **sidecar** is a vehicle funded by investors that takes a quota share of a reinsurer’s portfolio for a limited period, often to add capacity after a big loss when prices are high."
          },
          {
            id: "trig", at: [3, 1], span: 2, tone: "tint", label: "The trigger", sub: "Indemnity, industry or parametric",
            teach: "Each structure must define what makes it pay. An **indemnity** trigger pays on the cedant’s own losses. An **industry loss warranty** pays when the whole industry’s loss from an event exceeds a trigger. **Parametric** cover pays a fixed amount when a measured parameter, such as wind speed or earthquake magnitude, reaches a stated level."
          },
          {
            id: "lb", at: [3, 3], label: "London Bridge", sub: "Lloyd’s ILS vehicle",
            teach: "Lloyd’s established **London Bridge Risk PCC**, an insurance special purpose vehicle through which investors can provide capital to Lloyd’s syndicates in separate cells. It brings capital-markets money into the Lloyd’s market itself."
          },
          {
            id: "basis", at: [4, 1], span: 3, tone: "bad", label: "Basis risk", sub: "Paying a different amount from the real loss",
            teach: "Triggers other than the cedant’s own loss create **basis risk**: the chance that the cover pays less than the cedant’s actual loss, or pays when it has suffered little. Parametric and industry-loss covers trade basis risk for speed and simplicity: no loss adjusting, payment within days."
          }
        ],
        edges: [
          { from: "inv", to: "bond", teach: "Investors buy cat bonds issued for a sponsor." },
          { from: "inv", to: "collat", teach: "They fund collateralised reinsurance directly." },
          { from: "inv", to: "side", teach: "They take quota shares of reinsurers’ books through sidecars." },
          { from: "bond", to: "trig", label: "pays on", teach: "A cat bond’s trigger decides when investors lose principal." },
          { from: "collat", to: "trig", label: "pays on", teach: "Collateralised covers also need a defined trigger." },
          { from: "side", to: "lb", label: "at Lloyd’s via", teach: "London Bridge offers a similar route into Lloyd’s syndicates." },
          { from: "trig", to: "basis", label: "can create", teach: "Any trigger other than the cedant’s own loss can pay the wrong amount." }
        ]
      },
      explore: "cat-bond",
      takeaways: [
        "Insurance-linked securities bring capital-markets investors into reinsurance.",
        "Catastrophe bonds pay investors a coupon unless a defined catastrophe occurs; collateralised structures remove most credit risk.",
        "Parametric and industry-loss triggers pay on measured events and carry basis risk."
      ]
    },
    {
      title: "Designing a reinsurance programme",
      minutes: 8,
      keys: ["Gross exposure", "Retention", "Order of cover", "Value for money"],
      intro: "A cedant’s reinsurance isn’t a collection of separate purchases but a single design, meant to shape its net risk to fit its risk appetite at a reasonable cost. The left column shows the order in which the covers respond; the right column shows the three decisions that shape them.",
      diagram: {
        cols: 2,
        gapX: 60,
        nodes: [
          {
            id: "gross", at: [1, 1], span: 2, tone: "ink", label: "The gross book", sub: "Large risks and catastrophe exposure",
            teach: "Design starts with the gross portfolio: the largest individual risks, how often large losses happen and how big they get, and the catastrophe exposure, summarised in an **EP curve** for each peril. Brokers’ analytics teams then model how different structures would change the net results across thousands of simulated years.",
            like: "Designing a programme is like designing flood defences for a town. Engineers map how high the water could rise, decide how much flooding the town can tolerate, then build walls, pumps and barriers that work together, checking each earns its cost."
          },
          {
            id: "surplus", at: [2, 1], label: "1. Surplus treaty", sub: "Cuts big risks to the line",
            teach: "In a typical property programme, a surplus treaty first reduces large risks to the cedant’s line, evening out the book."
          },
          {
            id: "ret", at: [2, 2], tone: "brass", label: "Retention", sub: "Set by capital and earnings",
            teach: "The **retention** is how much of each loss the cedant pays itself. A common guide: no single risk loss, and no catastrophe below a chosen return period, should cost more than a set share of the year’s expected profit or of capital. Bigger insurers can afford higher retentions."
          },
          {
            id: "pr", at: [3, 1], label: "2. Per risk XL", sub: "Protects the retained line",
            teach: "A per risk excess of loss then protects the retained line against large single losses. It is bought up to the largest line the cedant writes."
          },
          {
            id: "lim", at: [3, 2], tone: "brass", label: "Limit", sub: "To the 1-in-200 and beyond",
            teach: "The catastrophe limit decides how extreme an event the cedant is protected against. Many buy cover to at least their modelled **1-in-200-year** loss, the standard for regulatory capital; some buy higher to satisfy rating agencies or their own appetite."
          },
          {
            id: "cat", at: [4, 1], label: "3. Catastrophe XL", sub: "Protects the net account",
            teach: "Finally a catastrophe programme protects the net account against events. Because each cover **inures to the benefit** of the next, the order in which they apply must be stated precisely in each wording: the cat programme responds to losses net of the surplus and per risk recoveries."
          },
          {
            id: "value", at: [4, 2], tone: "brass", label: "Value test", sub: "Net cost against what it removes",
            teach: "Each element is tested for value. The **net cost** of the reinsurance, premium less expected recoveries, is compared with the capital it releases and the volatility it removes. Covers that cost more than they save may be dropped or restructured; gaps that leave the business outside its risk appetite must be filled. Security of the panel and long-term relationships count too."
          },
          {
            id: "net", at: [5, 1], span: 2, tone: "good", label: "The net book", sub: "Shaped to fit the risk appetite",
            teach: "What’s left is the net book: the risk the cedant has chosen to keep, at a known cost. Designing it is one of the most important decisions of the year, usually led by the chief underwriting officer with actuaries and reinsurance brokers."
          }
        ],
        edges: [
          { from: "gross", to: "surplus", label: "first", teach: "The surplus treaty applies first, to each large risk." },
          { from: "surplus", to: "pr", label: "inures to", teach: "The per risk cover protects what the surplus leaves." },
          { from: "pr", to: "cat", label: "inures to", teach: "The catastrophe cover protects the net account after both." },
          { from: "cat", to: "net", label: "leaves", teach: "What remains is the cedant’s net risk." },
          { from: "ret", to: "pr", label: "sets", teach: "The retention decision sets where each excess of loss cover begins." },
          { from: "lim", to: "cat", label: "sets", teach: "The limit decision sets how high the catastrophe tower goes." },
          { from: "value", to: "net", label: "tests", teach: "Every piece must earn its cost against what it does to the net book." }
        ]
      },
      explore: "programme",
      think: { q: "Why might a cedant choose to raise its catastrophe retention after several years of profitable growth?", a: "As its capital and earnings have grown, it can absorb larger losses itself. Raising the retention reduces the cost of reinsurance, because reinsurers no longer pay the more frequent lower losses, and the saving improves the expected result while volatility stays within appetite." },
      takeaways: [
        "A reinsurance programme is a single design that shapes net risk to fit the risk appetite.",
        "Retentions are set by capital and earnings; limits by return period, regulation and rating needs.",
        "Covers respond in a stated order, such as surplus, then per risk XL, then catastrophe cover.",
        "Each element is tested for value against the capital and volatility it removes."
      ]
    }
  ],
  quiz: [
    {
      q: "What is a cedant?",
      options: ["A reinsurer", "The insurer that buys reinsurance and passes on risk", "A reinsurance broker", "A catastrophe model"],
      answer: 1,
      why: "The cedant cedes, or passes on, part of its risk to the reinsurer."
    },
    {
      q: "If a reinsurer fails, what happens to the cedant’s obligations to its policyholders?",
      options: [
        "They remain in full; the cedant must still pay its policyholders",
        "They are reduced in proportion to the reinsurance",
        "They pass to the Financial Services Compensation Scheme",
        "They pass to the reinsurer’s liquidator"
      ],
      answer: 0,
      why: "Reinsurance is a contract between insurers. The cedant remains liable to its policyholders and bears the credit risk of its reinsurers."
    },
    {
      q: "An insurer has a 30% quota share and suffers a £10m claim. How much does the reinsurer pay?",
      options: ["£0", "£3m", "£7m", "£10m"],
      answer: 1,
      why: "A quota share pays the same percentage of every claim: 30% of £10m is £3m."
    },
    {
      q: "A surplus treaty has a £2m retention and nine lines. How much of a £12m risk is ceded?",
      options: ["£2m", "£10m", "£12m", "£18m"],
      answer: 1,
      why: "The cedant keeps £2m and cedes the £10m surplus, which is within the treaty’s £18m capacity."
    },
    {
      q: "A layer of £20m xs £10m is hit by a £25m loss. What does the reinsurer pay?",
      options: ["£10m", "£15m", "£20m", "£25m"],
      answer: 1,
      why: "£25m less the £10m retention is £15m, which is within the £20m limit."
    },
    {
      q: "A £10m layer costs £2m. What is its rate on line?",
      options: ["2%", "5%", "20%", "50%"],
      answer: 2,
      why: "Rate on line is premium divided by limit: £2m ÷ £10m = 20%."
    },
    {
      q: "What does an hours clause do?",
      options: [
        "Defines how losses are grouped into a single event for a catastrophe cover",
        "Sets the time allowed for paying premium",
        "Limits the hours a reinsurer’s office is open",
        "Fixes the time at which cover incepts"
      ],
      answer: 0,
      why: "It groups losses from a peril within a set period, such as 72 hours, into one event with one retention."
    },
    {
      q: "What is basis risk?",
      options: [
        "The risk that a cover with a parametric or industry trigger pays a different amount from the cedant’s actual loss",
        "The risk that the reinsurer becomes insolvent",
        "The risk that currency rates move",
        "The risk that the broker makes an error"
      ],
      answer: 0,
      why: "Triggers based on measured parameters or industry losses do not match the cedant’s own loss exactly."
    }
  ]
});
