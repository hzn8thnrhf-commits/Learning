/* The Slip — Portfolio management */
window.SLIP_DATA = window.SLIP_DATA || {};
(window.SLIP_DATA.modules = window.SLIP_DATA.modules || []).push({
  id: "m14",
  title: "Portfolio management",
  short: "Portfolio",
  blurb: "Managing a book as a whole: rate adequacy, accumulation, diversification, mix and the tools for steering them.",
  outcomes: [
    "Explain the difference between underwriting individual risks and managing a portfolio.",
    "Describe the measures used to understand a portfolio, including exposure, rate change and results by segment.",
    "Explain how a technical price is built and how the actual-to-technical ratio is used.",
    "Describe how catastrophe accumulations are measured and controlled.",
    "Explain diversification and why it reduces the capital a portfolio needs.",
    "Use portfolio information to decide where to grow, hold or shrink, and how to use reinsurance.",
    "Describe the governance, controls and management information that support portfolio management."
  ],
  lessons: [
    {
      title: "From risks to portfolios",
      minutes: 5,
      keys: ["The book as a whole", "Profit and volatility", "Capital efficiency", "Concentration"],
      body: [
        "An underwriter’s training begins with individual risks: reading a submission, assessing the hazard, setting terms and agreeing a price. Yet an insurer’s results depend on how all of its risks behave together. **Portfolio management** is the discipline of managing the book as a whole: deciding what mix of business to write, how much exposure to accept in each area, and how to balance profit against volatility and capital.",
        "The two views complement each other. Good risk selection is necessary but not sufficient, because a book of individually well-priced risks can still be dangerous if they are concentrated in one hurricane zone, or uneconomic if they all need heavy capital. Equally, a well-balanced portfolio cannot compensate for consistently poor underwriting of individual risks.",
        { h: "What portfolio management aims to achieve" },
        {
          ul: [
            "**Profitability:** writing business whose price covers its expected cost, including the cost of capital.",
            "**Stability:** keeping the volatility of results within the business’s risk appetite.",
            "**Capital efficiency:** earning the best return on the capital the business holds.",
            "**Resilience:** avoiding concentrations that a single event, client, broker or legal change could damage."
          ]
        },
        { analogy: "Portfolio management is to underwriting what menu planning is to cooking. Each dish must be good, but the menu as a whole must also balance its costs, play to the kitchen’s strengths, avoid relying on a single supplier and still make money on a quiet night." },
        { think: { q: "An underwriter has written fifty well-priced commercial property risks, all within a mile of the same stretch of coast. Why might the portfolio manager be concerned?", a: "Each risk may be sound on its own, but together they form an accumulation. A single hurricane or storm surge could damage many of them at once, producing a loss far larger than the premiums anticipate and possibly breaching the business’s risk appetite." } }
      ],
      takeaways: [
        "Portfolio management manages the book as a whole, alongside the underwriting of each risk.",
        "Its aims are profitability, stability, capital efficiency and resilience.",
        "Well-priced risks can still form a dangerous or inefficient portfolio."
      ]
    },
    {
      title: "Knowing the book",
      minutes: 7,
      keys: ["Exposure data", "Rate index", "Results by segment", "Data quality"],
      body: [
        "Portfolio management begins with measurement. The portfolio manager needs to know what has been written, where, at what price and with what results, broken down in ways that reveal how the book behaves.",
        { h: "Exposure" },
        "**Exposure** data describe what the business stands to lose: sums insured and limits, locations, construction and occupancy for property, vessels and voyages for marine, turnover and activities for liability. Exposure can be summarised by territory, peril, industry, broker, coverholder or any other dimension that matters. Without accurate exposure data, neither catastrophe modelling nor pricing can be relied upon.",
        { h: "Premium and rate" },
        "Premium is tracked by class, segment and channel, together with the **rate change** achieved on renewals and the share of new business. Because rate changes compound, the portfolio manager also follows a cumulative **rate index**, which shows how prices have moved since a chosen base year.",
        { fig: "rate-index" },
        { example: { title: "Compounding rate change", text: "If rates rise by 10% in the first year, rise by 8% in the second and fall by 5% in the third, the cumulative change is 1.10 × 1.08 × 0.95 = 1.129, an increase of about 12.9%. Simply adding the three changes would suggest 13%; over longer periods the difference becomes significant." } },
        { h: "Results" },
        "Loss ratios are analysed by underwriting year and developed to ultimate, with attritional, large and catastrophe losses shown separately, so that a single large claim does not hide a deteriorating attritional trend, nor a benign year hide an emerging problem. Results are also split by segment, because an acceptable overall loss ratio can conceal one excellent segment subsidising a poor one.",
        { aware: "Averages can mislead. A class with an average loss ratio of 60% may contain one segment at 40% and another at 90%. Portfolio decisions should be made at the level of detail at which the business can actually act." }
      ],
      takeaways: [
        "Portfolio management starts with accurate data on exposure, premium, rate and results.",
        "Rate changes compound, so a cumulative rate index is more informative than a sum of changes.",
        "Results should be split by underwriting year, by type of loss and by segment.",
        "Averages can conceal segments that are subsidising one another."
      ]
    },
    {
      title: "Technical price and rate adequacy",
      minutes: 8,
      keys: ["Technical price", "Expected loss", "Cost of capital", "Actual-to-technical"],
      body: [
        "Rate change tells the portfolio manager how prices have moved; it does not say whether they are adequate. A 10% rate increase on a risk that was 30% underpriced still leaves it underpriced. To judge adequacy, the business needs a **technical price**: the premium that would cover the risk’s expected cost and provide the required return.",
        { h: "Building a technical price" },
        {
          ol: [
            "**Expected loss.** The expected cost of claims, estimated from experience, exposure or catastrophe models.",
            "**Expenses.** Acquisition costs and a share of operating expenses.",
            "**Cost of capital.** A charge for the capital the risk consumes, reflecting its volatility and its contribution to catastrophe exposure.",
            "**Profit margin.** Any further margin the business requires."
          ]
        },
        { fig: "technical-price" },
        { h: "The actual-to-technical ratio" },
        "Comparing the premium actually charged with the technical price gives the **actual-to-technical ratio**, often described as price adequacy. A ratio of 100% means the risk is priced exactly as the model requires; 90% means it is 10% below technical; 110% means it is 10% above. Aggregated across a portfolio, the ratio shows where the book is adequately priced and where it is not.",
        { example: { title: "Two segments compared", text: "Segment A has written £20m of premium against a technical price of £18m, an actual-to-technical ratio of 111%. Segment B has written £20m against a technical price of £25m, a ratio of 80%. Both may have achieved a 5% rate increase this year, but only Segment A is adequately priced." } },
        { h: "Using technical price well" },
        "Technical prices are only as good as the models and data behind them, and an underwriter may have sound reasons to depart from them on an individual risk. Their value lies in the pattern. A portfolio that is consistently priced below technical, or a segment whose ratio is drifting downwards, is a signal to act before the losses arrive.",
        { analogy: "The technical price is like the costing of a dish in a restaurant. The menu price can be higher or lower than the cost of the ingredients, labour and overheads for good reasons, but a restaurant that sells most of its dishes below cost will not last, however popular it is." },
        { think: { q: "A segment’s actual-to-technical ratio has fallen from 105% to 92% over three years, yet the rate change reported each year was small but positive. How can both be true?", a: "Technical prices have risen faster than actual prices, for example because claims inflation, higher catastrophe model estimates or a higher cost of capital have increased the expected cost. Small rate increases have not kept pace, so adequacy has fallen even though prices have gone up." } }
      ],
      takeaways: [
        "Rate change shows how prices move; the technical price shows whether they are adequate.",
        "A technical price covers expected loss, expenses, the cost of capital and a profit margin.",
        "The actual-to-technical ratio compares the premium charged with the technical price.",
        "The pattern across a portfolio matters more than any single risk."
      ]
    },
    {
      title: "Accumulation and catastrophe",
      minutes: 8,
      keys: ["Accumulation", "EP curves", "Return periods", "Realistic Disaster Scenarios"],
      body: [
        "Some losses arrive one risk at a time. Others strike many risks together: a hurricane, an earthquake, a flood, a cyber attack on a widely used system, or a legal change affecting a whole industry. An **accumulation** is the total exposure that a single event could affect, and controlling accumulations is one of the most important tasks in portfolio management.",
        { h: "Measuring catastrophe exposure" },
        "Insurers use **catastrophe models** to simulate many thousands of possible events and to estimate the loss each would cause to their portfolio. The output is an **exceedance probability (EP) curve**, which shows the probability that losses will exceed any given amount in a year. Points on the curve are usually described by their **return period**: a 1-in-100-year loss has a 1% chance of being exceeded in any one year, and a 1-in-200-year loss a 0.5% chance.",
        { fig: "ep-curve" },
        {
          terms: [
            ["Average annual loss (AAL)", "The average catastrophe loss per year across all the simulated years. It is the expected cost used in pricing and planning."],
            ["Occurrence exceedance probability (OEP)", "The probability that the largest single event in a year exceeds a given loss."],
            ["Aggregate exceedance probability (AEP)", "The probability that the total of all events in a year exceeds a given loss."],
            ["Probable maximum loss (PML)", "A loss at a chosen return period, used to set and monitor limits."]
          ]
        },
        { h: "Controlling accumulations" },
        "Risk appetite is turned into limits on modelled losses, such as a maximum 1-in-200-year loss for each peril and region, and on simpler measures such as the total sum insured in each zone. Lloyd’s also requires syndicates to report their losses from a set of standard **Realistic Disaster Scenarios**, so that exposures can be compared across the market. Portfolio managers monitor these measures as business is written, and may stop writing in a zone that is close to its limit.",
        { h: "Beyond the models" },
        "Models do not cover everything. Some perils are poorly modelled, some territories have little data, and some accumulations, such as those in cyber, casualty or political risks, do not follow geography at all. Good practice combines models with realistic scenarios, expert judgement and simple exposure limits.",
        { analogy: "Managing accumulation is like a fruit grower spreading orchards across several valleys. A late frost in one valley is painful but survivable; if every orchard is in the same valley, one cold night can destroy the whole crop." },
        { aware: "A catastrophe model’s output is an estimate, not a fact. Different models can produce very different figures for the same portfolio, and each new version of a model can move the numbers. Decisions should not rest on a single figure from a single model." },
        { think: { q: "A portfolio’s modelled 1-in-200-year hurricane loss is £180m, and its limit is £200m. The underwriters want to add an account whose own 1-in-200-year loss is £40m. Why can the effect not be found by simple addition?", a: "Return period losses do not simply add up. The new account’s largest losses may come from the same storms as the existing portfolio’s or from different ones. The portfolio must be modelled again with the new account included to see whether the combined 1-in-200-year loss stays within the £200m limit." } }
      ],
      takeaways: [
        "An accumulation is the total exposure that a single event could affect.",
        "Catastrophe models produce EP curves, average annual losses and return period losses.",
        "Risk appetite is turned into limits on modelled losses and on exposure in each zone.",
        "Models are estimates, and should be combined with scenarios and judgement."
      ]
    },
    {
      title: "Diversification",
      minutes: 6,
      keys: ["Diversification benefit", "Correlation", "Extreme events", "Capital"],
      body: [
        "**Diversification** is the reduction in overall risk that comes from combining exposures that do not all go wrong at the same time. It is the reason an insurer can write many classes and territories with less capital than those classes would need if each were a separate business.",
        { h: "How it works" },
        "Suppose a business writes two books, each of which would need £50m of capital on its own to survive a 1-in-200-year year. If the books’ results were perfectly correlated, so that both suffered their worst year together, the combined business would need £100m. In practice a marine cargo book and a professional indemnity book rarely have their worst years at the same time, so the combined capital requirement might be nearer £75m. The £25m saved is the **diversification benefit**.",
        { fig: "diversification" },
        { h: "Where diversification fails" },
        "Diversification is weakest when it is needed most. Some events affect many classes at once. A major hurricane damages property, energy, marine and motor risks together; a financial crisis affects credit insurance, directors’ and officers’ liability and investment values at the same time; and the COVID-19 pandemic produced claims in contingency, travel and business interruption insurance simultaneously. Correlations that look low in ordinary years can rise sharply in extreme ones.",
        { analogy: "Diversification is like a household with several earners working in different industries. If one employer closes, the household survives. But a deep recession can hit every employer at once, and a family that assumed its jobs were unrelated discovers that they were not." },
        { think: { q: "Why might a reinsurer with a global property catastrophe portfolio still be very exposed to a single event?", a: "If its largest exposures are concentrated in one peril and region, such as US hurricane, that peril will dominate its tail risk however many other territories it writes. Diversification helps most when no single peril dominates the portfolio." } }
      ],
      takeaways: [
        "Diversification reduces total risk by combining exposures that do not all go wrong together.",
        "The diversification benefit is the capital saved compared with the sum of standalone requirements.",
        "Correlations rise in extreme events, so diversification is weakest when it is most needed."
      ]
    },
    {
      title: "Steering the mix",
      minutes: 7,
      keys: ["Portfolio matrix", "Appetite guides", "Line size", "The cycle"],
      body: [
        "With measures of profitability, price adequacy, volatility and capital in place, the portfolio manager can decide where to grow, where to hold and where to shrink. These decisions turn the business plan into a direction for each segment.",
        { h: "A portfolio matrix" },
        "A common approach plots each segment by its price adequacy and its recent growth. Segments that are well priced and growing are doing what the business wants. Segments that are well priced but shrinking may deserve more effort to win business. Segments that are poorly priced but growing are the most dangerous, because their growth is probably coming from underpricing. Segments that are poorly priced and shrinking are candidates for remediation or exit.",
        { fig: "portfolio-matrix" },
        { h: "Levers for steering" },
        {
          terms: [
            ["Appetite guides", "Statements to underwriters and brokers setting out which risks are welcome, acceptable or unwanted."],
            ["Pricing", "Adjusting technical price loadings or minimum rates to attract or deter particular segments."],
            ["Line size", "Changing the share taken on each risk: larger lines where pricing is strong, smaller ones where it is weak."],
            ["Lead or follow", "Leading in segments where the business has expertise and influence, and following where it wants diversification at lower cost."],
            ["Distribution", "Investing in brokers, coverholders or MGAs that produce good business, and reducing reliance on those that do not."]
          ]
        },
        { h: "Timing and the cycle" },
        "The right mix changes with the market. When rates are high, the business may grow classes with strong margins; when rates fall, it may hold back and accept a smaller share. The discipline of shrinking in a soft market is easy to describe and hard to practise, because brokers, staff and the expense base all push for volume.",
        { analogy: "Steering the mix is like managing a farm’s fields. Fields with rich soil and good prices are planted more heavily, poor fields are rested or turned over to something else, and the farmer adjusts each year to the prices at market rather than planting the same crop out of habit." },
        { think: { q: "A segment’s actual-to-technical ratio is 85% and its premium grew by 25% last year. Where does it sit on the matrix, and what would you do?", a: "It is poorly priced and growing fast, which is the most dangerous quadrant. Its growth is probably coming from underpricing, so the business should raise rates or tighten terms, reduce line sizes and review the sources of new business before results deteriorate." } }
      ],
      takeaways: [
        "Plotting segments by price adequacy and growth shows where to grow, hold or shrink.",
        "Poorly priced segments that are growing fast are the most dangerous.",
        "The levers include appetite guides, pricing, line size, leading or following, and distribution.",
        "The right mix changes with the cycle, and shrinking in a soft market takes discipline."
      ]
    },
    {
      title: "Reinsurance as a portfolio tool",
      minutes: 7,
      keys: ["The net portfolio", "Value against capital", "Retention", "Credit risk"],
      body: [
        "Reinsurance is one of the most powerful tools available to a portfolio manager. It changes the shape of the net portfolio, the part the business keeps, without changing what the business offers its clients. The question is not whether reinsurance is cheap, but whether it is good value for the risk and capital it removes.",
        { h: "Shaping the net portfolio" },
        "Excess of loss reinsurance cuts off the largest losses, reducing volatility and the capital needed for large and catastrophe risks. Proportional reinsurance reduces the size of the whole account, which can support growth, or reduce capital in a class where the business wants to keep its client relationships but carry less risk. Catastrophe cover reduces the tail of the EP curve, bringing the net 1-in-200-year loss within appetite.",
        { fig: "gross-net" },
        { h: "Is it good value?" },
        "Reinsurance costs money, because the reinsurer expects a margin over the losses it pays. That margin can be compared with the cost of the capital the business would otherwise need. If a catastrophe programme costs £10m a year more than its expected recoveries, but reduces the capital requirement by £80m, and the business’s cost of capital is 15%, the capital released is worth £12m a year. The reinsurance is then cheaper than holding the capital.",
        { h: "Retention and limit" },
        "Setting the retention is a balance. A low retention gives a stable net result but costs more, because the reinsurer pays more frequent losses; a high retention is cheaper but leaves more volatility with the business. The limit decision asks how far up the EP curve protection should extend, and is usually guided by risk appetite and by regulatory and rating agency capital models.",
        { aware: "Reinsurance replaces insurance risk with credit risk. A recovery is worth something only if the reinsurer pays, so portfolio managers monitor the financial strength of their reinsurers and limit the share that any one of them takes." },
        { think: { q: "A business can buy a quota share ceding 30% of a growing class, with a ceding commission that covers its acquisition costs and expenses. Why might it do so, even though it gives away 30% of the expected profit?", a: "The quota share reduces the capital the class needs and its volatility, which may allow the business to support its clients and grow without raising new capital. If the capital released can earn a better return elsewhere, the profit given away is worth it." } }
      ],
      takeaways: [
        "Reinsurance changes the net portfolio without changing what is offered to clients.",
        "Its value is judged against the capital and volatility it removes, not just its price.",
        "Retention and limit decisions balance cost against stability and appetite.",
        "Recoveries depend on reinsurers paying, so their security must be monitored."
      ]
    },
    {
      title: "Governance and information",
      minutes: 6,
      keys: ["Authorities", "Peer review", "Management information", "Fair value"],
      body: [
        "Portfolio management depends on people making good decisions, with good information, within clear rules. Governance provides the rules; management information provides the evidence.",
        { h: "Underwriting governance" },
        {
          terms: [
            ["Underwriting authorities", "Each underwriter has written limits on the classes, line sizes and risks they may accept, with referral to a more senior underwriter above those limits."],
            ["Peer review", "A second underwriter reviews a sample of risks, or every risk above a threshold, before or shortly after binding."],
            ["Underwriting audits", "Periodic independent reviews of files to test compliance with guidelines, pricing and documentation standards."],
            ["Committees", "An underwriting committee reviews performance, appetite and major decisions; a reserving committee reviews claims reserves."]
          ]
        },
        { h: "Management information" },
        "Good management information is timely, accurate and focused on decisions. A typical portfolio pack shows premium against plan, rate change and price adequacy by segment, retention and new business, loss ratios by underwriting year with attritional, large and catastrophe losses shown separately, exposure against limits, and the main movements since the last report. It should lead the reader to the questions that matter rather than bury them in detail.",
        { h: "Conduct and customers" },
        "Portfolio management is not only about financial results. Where products reach consumers or small businesses, insurers must show that their products offer fair value and meet customers’ needs, under the FCA’s product governance rules and the Consumer Duty. Portfolio reviews therefore increasingly include claims acceptance rates, complaints and the value delivered to customers.",
        { analogy: "Governance and information are a ship’s charts and instruments. A skilled captain can sail without them for a while, but no owner would trust a valuable cargo to a ship whose instruments are broken or whose charts are years out of date." }
      ],
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
