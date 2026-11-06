/* The Slip — Business planning */
window.SLIP_DATA = window.SLIP_DATA || {};
(window.SLIP_DATA.modules = window.SLIP_DATA.modules || []).push({
  id: "m13",
  title: "Business planning",
  short: "Planning",
  blurb: "How insurers plan: strategy and risk appetite, premium and loss ratio plans, the path to the net result, capital and return, Lloyd’s review, monitoring and remediation.",
  outcomes: [
    "Explain why insurers plan and how strategy and risk appetite shape a plan.",
    "Build a premium plan and a plan loss ratio, including on-levelling.",
    "Trace a plan from gross premium to net result, and judge it by return on capital.",
    "Describe planning at Lloyd’s, monitoring against plan and remediation of weak classes."
  ],
  lessons: [
    {
      title: "Why insurers plan",
      minutes: 6,
      keys: ["Planning cycle", "Audiences", "Strategy into plan", "Reforecasting"],
      intro: "Every insurer prepares a business plan each year: what it will write, at what price, with what reinsurance and capital, and with what expected result. Planning is a cycle, not an event. Go round the loop clockwise from strategy, and notice how the end feeds the beginning.",
      diagram: {
        cols: 2,
        gapX: 60,
        nodes: [
          {
            id: "strategy", at: [1, 1], tone: "ink", label: "Strategy and appetite", sub: "Where, and how much risk",
            teach: "Strategy says where the business wants to be in several years; risk appetite says how much risk it will run on the way. Both are set first, and the next lesson unpacks them.",
            like: "A business plan is like a ship’s voyage plan. The owners pick the destination (strategy) and the risks they’ll accept (appetite). The navigator plots the course and calculates fuel and cargo (the plan), and the officers check position against it all voyage, adjusting when the weather changes."
          },
          {
            id: "plan", at: [1, 2], label: "The business plan", sub: "Built class by class",
            teach: "The plan is the bridge between strategy and the underwriters’ daily decisions. It serves many readers at once: the **board** sets direction and approves risks; **capital providers** judge whether their capital will earn enough; **regulators** and, at Lloyd’s, the **Corporation** check it is sound; **rating agencies** assess strength; and **underwriters** use it as budget and brief.\n\nA capital provider reads it as an investment proposal; an underwriter reads it as a shopping list."
          },
          {
            id: "capital", at: [2, 2], label: "Capital", sub: "What the plan needs",
            teach: "The capital needed to support the plan is calculated from its risks. A plan that needs more capital than is available, or earns too little on it, goes back for revision. Lesson 6 covers this."
          },
          {
            id: "approve", at: [3, 2], tone: "tint", label: "Approval", sub: "Board, and at Lloyd’s the Corporation",
            teach: "The board, and at Lloyd’s the Corporation, review and approve the plan. Plans are usually prepared in summer and autumn; each syndicate submits its plan and capital requirement to Lloyd’s before the new year of account begins on 1 January."
          },
          {
            id: "write", at: [4, 2], label: "Underwriting", sub: "Writing against the plan",
            teach: "The business underwrites against the plan through the year. The plan sets the targets: how much to write in each class, at what rates, within what limits."
          },
          {
            id: "monitor", at: [4, 1], label: "Monitoring", sub: "Actual against plan",
            teach: "Results are monitored against the plan, month by month: premium, rates, losses, expenses and exposure. Lesson 8 shows how to read the differences."
          },
          {
            id: "reforecast", at: [3, 1], label: "Reforecasting", sub: "The latest view of the year",
            teach: "The plan is reforecast as the year unfolds, usually quarterly, replacing assumptions with the latest information. The original plan stays the benchmark; the reforecast shows where the year is actually heading."
          },
          {
            id: "lessons", at: [2, 1], tone: "good", label: "Lessons learned", sub: "Feed next year’s strategy",
            teach: "What the year teaches, about pricing, claims, brokers and markets, feeds straight into the next year’s strategy. That is what makes planning a cycle rather than a once-a-year form-filling exercise."
          }
        ],
        edges: [
          { from: "strategy", to: "plan", label: "shapes", teach: "Strategy and appetite set the frame within which the plan is built." },
          { from: "plan", to: "capital", label: "needs", teach: "The plan’s risks determine how much capital it requires." },
          { from: "capital", to: "approve", label: "then", teach: "Plan and capital are approved together." },
          { from: "approve", to: "write", label: "then", teach: "Underwriters write against the approved plan." },
          { from: "write", to: "monitor", label: "tracked", teach: "What is written, and what it costs, is tracked against the plan." },
          { from: "monitor", to: "reforecast", label: "updates", teach: "Monitoring feeds regular reforecasts." },
          { from: "reforecast", to: "lessons", label: "teaches", teach: "The gaps between plan and reality are the year’s lessons." },
          { from: "lessons", to: "strategy", label: "inform", teach: "Those lessons shape next year’s strategy, and the loop begins again." }
        ]
      },
      takeaways: [
        "A business plan sets out what an insurer will write, at what price, with what reinsurance and capital, and with what expected result.",
        "Boards, capital providers, regulators, Lloyd’s, rating agencies and underwriters all rely on it.",
        "Planning is a cycle of strategy, plan, capital, approval, underwriting, monitoring and reforecasting."
      ]
    },
    {
      title: "Strategy and risk appetite",
      minutes: 6,
      keys: ["Where to compete", "Risk appetite", "Tolerances and limits", "Competitive advantage"],
      intro: "Before any numbers are set, an insurer must decide what kind of business it wants to be. Strategy answers where to compete and how to win; risk appetite sets the boundaries. Follow the appetite down from a board’s words to a number an underwriter can check.",
      diagram: {
        cols: 2,
        gapX: 64,
        nodes: [
          {
            id: "where", at: [1, 1], tone: "ink", label: "Where to compete", sub: "Classes, territories, channels",
            teach: "Choices about where to compete include classes, territories, types of client, distribution channels, and whether to lead or follow. A syndicate might focus on marine and energy, lead most of what it writes and grow in Asia; an MGA might sell one product through a few chosen regional brokers."
          },
          {
            id: "win", at: [1, 2], label: "How to win", sub: "A genuine advantage",
            teach: "Each choice should rest on a **genuine advantage**: specialist expertise, better data, strong broker relationships or lower costs. A strategy that says “grow in a class where we have no edge” is a plan to lose money at scale."
          },
          {
            id: "appetite", at: [2, 1], span: 2, tone: "tint", label: "Risk appetite statement", sub: "Approved by the board",
            teach: "**Risk appetite** is the amount and type of risk a business is willing to take in pursuit of its objectives, written in a **risk appetite statement** approved by the board. For example: “We accept volatility from natural catastrophes, but not a loss that would threaten our ability to trade.”",
            like: "Strategy is choosing which mountains to climb; risk appetite is deciding in advance the weather in which you’ll turn back. Climbers who agree that rule at base camp decide better than those who try to decide on the ridge."
          },
          {
            id: "tolerance", at: [3, 1], span: 2, label: "Tolerance", sub: "1-in-200 net cat loss ≤ 25% of capital",
            teach: "A **tolerance** turns the statement into something measurable: the modelled 1-in-200-year net catastrophe loss must not exceed 25% of capital."
          },
          {
            id: "limit", at: [4, 1], label: "Limit", sub: "Florida 1-in-100 ≤ £150m",
            teach: "An operational **limit** turns the tolerance into rules underwriters can apply: net exposure to a Florida hurricane must not exceed £150m at the 1-in-100-year return period."
          },
          {
            id: "other", at: [4, 2], label: "Other limits", sub: "Line size, long tail, reinsurers",
            teach: "Appetite covers much more than catastrophes: the maximum line on any one risk, the share of the account in long-tail classes, the minimum credit quality of reinsurers, tolerance for reserve deterioration, and attitudes to conduct and reputational risk."
          },
          {
            id: "test", at: [5, 1], span: 2, tone: "brass", label: "Test the plan against it", sub: "Or it’s just decoration",
            teach: "Be aware: a risk appetite that is never tested against the plan is merely decoration. Before approval, the plan should be checked against every tolerance and limit, and the results reported to the board."
          }
        ],
        edges: [
          { from: "where", to: "win", label: "rests on", teach: "Every choice of where to compete needs a reason to expect to win there." },
          { from: "where", to: "appetite", label: "within", fromSide: "b", toSide: "t", toAt: 0.25, teach: "The strategy must be pursued within the board’s appetite for risk." },
          { from: "appetite", to: "tolerance", label: "measured as", teach: "The words become a measurable tolerance." },
          { from: "tolerance", to: "limit", label: "turned into", fromSide: "b", fromAt: 0.25, teach: "The tolerance becomes limits underwriters can apply day to day." },
          { from: "tolerance", to: "other", label: "and", fromSide: "b", fromAt: 0.75, teach: "Similar tolerances and limits cover every other kind of risk." },
          { from: "limit", to: "test", teach: "The plan is checked against each limit." },
          { from: "other", to: "test", teach: "And against every other tolerance, before the board approves it." }
        ]
      },
      takeaways: [
        "Strategy decides where to compete and how to win, and should rest on a genuine advantage.",
        "Risk appetite is the amount and type of risk the business will accept, approved by the board.",
        "Appetite statements become measurable tolerances and operational limits, and the plan must be tested against them."
      ]
    },
    {
      title: "Building the premium plan",
      minutes: 7,
      keys: ["Retention", "Risk-adjusted rate change", "Exposure change", "New business"],
      intro: "How much premium will a class write next year? The answer is built up from the existing book, not guessed from the top down, because most of next year’s premium comes from renewing this year’s policies. Follow the building blocks down the page.",
      diagram: {
        cols: 2,
        gapX: 60,
        nodes: [
          {
            id: "expiring", at: [1, 1], span: 2, tone: "ink", label: "Expiring premium £100m", sub: "Policies due to renew",
            teach: "Start with the premium on policies that are due to renew during the year: £100m in our class."
          },
          {
            id: "retention", at: [2, 1], label: "Retention 88%", sub: "£12m lost, £88m renewed",
            teach: "Not every policy renews. Some clients move to competitors; others are declined by the underwriter. A **retention** rate of 88% means 12% of expiring premium, £12m, is expected to be lost."
          },
          {
            id: "rate", at: [2, 2], label: "Rate change +5%", sub: "Like for like: +£4.4m",
            teach: "The price of renewed business changes, measured **like for like**: in London, the **risk-adjusted rate change**. If a client’s premium rises 10% but its deductible has been halved and its limit doubled, the true change in price may be negative. +5% on £88m adds £4.4m."
          },
          {
            id: "exposure", at: [3, 2], label: "Exposure +3%", sub: "Bigger values: +£2.8m",
            teach: "The amount insured also changes: higher property values, larger turnover, more vessels. Premium usually rises with exposure even if the rate is unchanged. Exposure growth of 3% adds about £2.8m."
          },
          {
            id: "newbiz", at: [3, 1], label: "New business +£15m", sub: "From the pipeline",
            teach: "Finally, add premium from new clients, based on the pipeline, broker relationships and market opportunities: £15m."
          },
          {
            id: "plan", at: [4, 1], span: 2, tone: "good", label: "Plan premium £110.2m", sub: "£88m + £4.4m + £2.8m + £15m",
            teach: "Add it up: £88m + £4.4m + £2.8m + £15m = **£110.2m**. Notice that only £4.4m of the £10.2m growth comes from price."
          },
          {
            id: "warn", at: [5, 1], span: 2, tone: "bad", label: "Growth isn’t rate", sub: "Separate price, exposure and volume",
            teach: "Be aware: premium growth is not the same as a rate increase. A class can grow its premium by 20% simply by writing more exposure at inadequate prices. A good plan always separates the effects of price, exposure and volume, and the model lets you pull them apart."
          }
        ],
        edges: [
          { from: "expiring", to: "retention", label: "keeps", teach: "Most of the expiring book renews; some is lost." },
          { from: "retention", to: "rate", label: "repriced", teach: "Renewed business is repriced at the new rate." },
          { from: "rate", to: "exposure", label: "resized", teach: "And resized for changes in what is insured." },
          { from: "exposure", to: "newbiz", label: "plus", teach: "New clients add to the renewed book." },
          { from: "newbiz", to: "plan", label: "gives", fromSide: "b", toSide: "t", toAt: 0.25, teach: "Together they give the plan premium." },
          { from: "plan", to: "warn", label: "but", teach: "Read the total with care: how much of it is price?" }
        ]
      },
      explore: "premium-plan",
      think: { q: "A class has £50m of expiring premium, a retention rate of 90% and a like-for-like rate change of −4%. Ignoring exposure change and new business, how much premium will it renew?", a: "Retained premium is 90% of £50m, £45m. A 4% rate reduction takes this to £45m × 0.96 = £43.2m." },
      takeaways: [
        "The premium plan is built up from expiring premium, not guessed from the top down.",
        "Retention, rate change, exposure change and new business each move the premium.",
        "Rate change is measured like for like, and premium growth is not the same as a rate increase."
      ]
    },
    {
      title: "Planning the loss ratio",
      minutes: 7,
      keys: ["Attritional losses", "Large losses", "Catastrophe load", "On-levelling"],
      intro: "If premium is the top line, the loss ratio decides whether the plan succeeds, and it is the hardest number to forecast. Planners split it into three parts that behave differently. Follow each part up from its source to the plan.",
      diagram: {
        cols: 3,
        nodes: [
          {
            id: "history", at: [1, 1], span: 3, tone: "ink", label: "Past years’ loss ratios", sub: "Each developed to ultimate",
            teach: "The usual starting point is the history of each underwriting year, developed to its expected ultimate value, as you saw in Module 08. But a loss ratio from two years ago was earned at two-year-old prices and two-year-old claims costs."
          },
          {
            id: "onlevel", at: [2, 1], label: "On-level", sub: "For rates since",
            teach: "**On-levelling** restates each past year’s loss ratio as if the business had been written at today’s prices, by dividing by the cumulative rate change since. Rates up 8% then 5% is a cumulative 13.4%."
          },
          {
            id: "trend", at: [2, 2], label: "Trend", sub: "For claims inflation",
            teach: "Claims inflation brings past claims up to today’s costs. At 6% a year for two years, about 12.4%. A past loss ratio of 60% becomes 60% × 1.124 ÷ 1.134, about **59.5%**: rates have only just outrun inflation. The model lets you vary both."
          },
          {
            id: "model", at: [2, 3], label: "Cat model", sub: "Average annual loss",
            teach: "Catastrophe losses can’t be planned from a few years of history. They come from a catastrophe model’s **average annual loss**, adjusted for perils the model doesn’t cover."
          },
          {
            id: "attr", at: [3, 1], label: "Attritional 48%", sub: "Steady, predictable",
            teach: "**Attritional** losses are the steady flow of small and medium claims. They are relatively predictable, projected from the on-levelled, trended history, then moved to next year’s prices by the planned rate change."
          },
          {
            id: "large", at: [3, 2], label: "Large 9%", sub: "Rarer, volatile",
            teach: "**Large losses** are individual claims above a threshold, say £1m. They are less frequent and more volatile, so they are planned as an average annual cost from a long history or a model."
          },
          {
            id: "cat", at: [3, 3], label: "Catastrophe 6%", sub: "From the model",
            teach: "**Catastrophe** losses come from events hitting many risks at once. The plan carries the model’s average, knowing that most years will be below it and a few far above."
          },
          {
            id: "plan", at: [4, 1], span: 3, tone: "tint", label: "Plan loss ratio 63%", sub: "A range, not a point",
            teach: "48% + 9% + 6% = **63%**. But it is an estimate with a wide range around it: large and catastrophe losses can make one year look much better or worse without any change in the quality of the business. A sensible plan states its assumptions, shows the range, and never treats a benign year as proof that prices are adequate.",
            like: "Planning a loss ratio is like budgeting for repairs to a house. Small repairs come steadily and can be estimated from last year’s receipts. A new boiler is rarer, so you set aside an average each year. Storm damage to the roof is rarer still, so you rely on the odds of a storm, not last year’s experience."
          }
        ],
        edges: [
          { from: "history", to: "onlevel", teach: "History must be restated at today’s prices..." },
          { from: "history", to: "trend", teach: "...and today’s claims costs." },
          { from: "onlevel", to: "attr", label: "gives", teach: "On-levelled history projects the attritional loss ratio." },
          { from: "trend", to: "attr", teach: "Trended for inflation too." },
          { from: "trend", to: "large", label: "plus history", teach: "Large losses come from a long, trended history." },
          { from: "model", to: "cat", label: "average", teach: "The model’s average annual loss sets the catastrophe load." },
          { from: "attr", to: "plan", label: "+", teach: "The plan adds the three parts together." },
          { from: "large", to: "plan", label: "+", teach: "Large losses are the second component." },
          { from: "cat", to: "plan", label: "+", teach: "Catastrophe is the third, and the most volatile." }
        ]
      },
      explore: "on-level",
      think: { q: "A class plans an attritional loss ratio of 48%, large losses of 9% and catastrophe losses of 6%. What is its plan loss ratio, and which components are most likely to make the actual result differ from plan?", a: "The plan loss ratio is 48% + 9% + 6% = 63%. The large loss and catastrophe components are the most volatile, so they are the most likely to cause a big difference from plan in any one year." },
      takeaways: [
        "The plan loss ratio is built from attritional, large and catastrophe components.",
        "Past years are developed to ultimate, on-levelled for rate change and trended for inflation.",
        "Catastrophe losses come from a model’s average annual loss; every plan loss ratio is a range."
      ]
    },
    {
      title: "From gross premium to net result",
      minutes: 7,
      keys: ["Acquisition costs", "Operating expenses", "Net cost of reinsurance", "Investment income"],
      intro: "Premium and claims are only part of the picture. Between the gross premium written and the profit lie acquisition costs, expenses, reinsurance and investment income. Follow £200m of premium down the page to an £8m result.",
      diagram: {
        cols: 2,
        gapX: 56,
        nodes: [
          {
            id: "gross", at: [1, 1], span: 2, tone: "ink", label: "Gross premium £200m", sub: "Assume fully earned",
            teach: "We start with £200m of gross premium, assumed fully earned for simplicity."
          },
          {
            id: "acq", at: [2, 1], label: "Acquisition £56m", sub: "28%: brokerage, commission",
            teach: "**Acquisition costs** are the costs of getting the business: brokerage, commission to coverholders and MGAs, sometimes fees and profit commissions. In London they are often 25% to 35% of gross premium. Delegated business usually costs more, because the coverholder is paid for underwriting and administration."
          },
          {
            id: "claims", at: [2, 2], label: "Gross claims £118m", sub: "59% loss ratio",
            teach: "Expected gross claims are £118m, a 59% loss ratio, built as in the last lesson."
          },
          {
            id: "opex", at: [3, 1], label: "Expenses £16m", sub: "8%: people, systems, charges",
            teach: "**Operating expenses** cover underwriting and claims staff, systems, premises and central functions. At Lloyd’s they include the managing agent’s fees and market charges such as subscriptions and Central Fund contributions."
          },
          {
            id: "reins", at: [3, 2], tone: "brass", label: "Reinsurance net cost £8m", sub: "£20m paid, £12m expected back",
            teach: "Outwards reinsurance has a cost, £20m of premium, and a benefit, £12m of expected recoveries. The **net cost of reinsurance** is £8m. In most years it is positive: the business pays reinsurers a margin for reducing its volatility and capital needs.\n\nBe aware: a plan whose net result looks better than its gross result deserves scrutiny. It usually assumes more recoveries than reinsurers expect to pay, which is unlikely over time."
          },
          {
            id: "uw", at: [4, 1], span: 2, tone: "tint", label: "Underwriting result £2m", sub: "Gross combined ratio 95%, net about 98.9%",
            teach: "£200m − £56m − £118m − £16m − £8m = **£2m**. The gross combined ratio is 95%; after reinsurance, about 98.9%. Reinsurance reduces the expected result in exchange for lower volatility."
          },
          {
            id: "inv", at: [5, 1], label: "Investment income £6m", sub: "On funds held",
            teach: "Premium is held and invested until claims are paid. The planned investment return, £6m, is added to the underwriting result."
          },
          {
            id: "result", at: [5, 2], tone: "good", label: "Overall result £8m", sub: "Investment does the heavy lifting",
            teach: "The overall result is £8m, three quarters of it from investment income. That is a perfectly normal shape for a London plan, and a reminder of how exposed insurers are when interest rates fall."
          }
        ],
        edges: [
          { from: "gross", to: "acq", label: "less", teach: "First, the cost of acquiring the business." },
          { from: "gross", to: "claims", label: "less", teach: "Then the expected claims." },
          { from: "acq", to: "opex", label: "less", teach: "Then the costs of running the business." },
          { from: "claims", to: "reins", label: "net of", teach: "Reinsurance reduces the claims the business keeps, at a cost." },
          { from: "opex", to: "uw", teach: "What’s left after all costs..." },
          { from: "reins", to: "uw", teach: "...and the net cost of reinsurance is the underwriting result." },
          { from: "uw", to: "result", label: "plus", fromSide: "b", fromAt: 0.75, toSide: "t", teach: "The underwriting result is the first part of the overall result." },
          { from: "inv", to: "result", label: "plus", teach: "Investment income is the second." }
        ]
      },
      explore: "net-result",
      think: { q: "Why is the net combined ratio in the example worse than the gross combined ratio?", a: "The reinsurance premium of £20m exceeds the expected recoveries of £12m. The business pays reinsurers an expected margin of £8m in exchange for lower volatility and capital requirements, so its expected net result is below its expected gross result." },
      takeaways: [
        "The plan moves from gross premium to net result through acquisition costs, expenses, reinsurance and investment income.",
        "The net cost of reinsurance is ceded premium less expected recoveries and commission.",
        "Reinsurance normally reduces the expected result in exchange for lower volatility."
      ]
    },
    {
      title: "Capital and return",
      minutes: 7,
      keys: ["Solvency Capital Requirement", "Return on capital", "Hurdle rate", "Stress testing"],
      intro: "A plan can show a healthy profit and still be a poor use of capital. Every pound of premium needs capital behind it, and capital is expensive. Follow the two numbers down into one ratio, then see how that ratio steers the plan.",
      diagram: {
        cols: 2,
        gapX: 60,
        nodes: [
          {
            id: "plan", at: [1, 1], span: 2, tone: "ink", label: "The plan", sub: "What it writes, and how risky it is",
            teach: "The plan gives two things: an expected profit, and a set of risks. Both matter."
          },
          {
            id: "scr", at: [2, 1], label: "Capital required", sub: "The SCR, from all its risks",
            teach: "The **SCR** must survive a 1-in-200-year loss over the coming year, covering premium risk on new business, reserve risk on old business, catastrophe, market, credit and operational risk. At Lloyd’s, each syndicate calculates it over the full life of the year of account, plus the 35% uplift.\n\nPlans are also **stress-tested** against a major catastrophe, a run of large losses, falling rates, a reinsurer failing or reserves deteriorating: would the business stay solvent and within appetite?"
          },
          {
            id: "profit", at: [2, 2], label: "Expected profit", sub: "£30m",
            teach: "The expected profit is the plan’s central estimate of its result: £30m in our example."
          },
          {
            id: "roc", at: [3, 1], span: 2, tone: "tint", label: "Return on capital", sub: "£30m ÷ £200m = 15%",
            teach: "**Return on capital** compares expected profit with the capital required: £30m on £200m is 15%.",
            like: "Return on capital is like the yield on a rental property. A flat earning £12,000 a year beats one earning £15,000 if the first cost £150,000 and the second £300,000. Insurers judge their classes the same way."
          },
          {
            id: "hurdle", at: [4, 1], label: "Hurdle rate", sub: "The minimum acceptable",
            teach: "Capital providers set a **hurdle rate**, the minimum return they will accept. A plan that falls short is revised."
          },
          {
            id: "classes", at: [4, 2], label: "Return by class", sub: "Cargo 25%, cat 13%, PI 9%",
            teach: "Different classes consume very different amounts of capital. Marine cargo: £4m profit on £16m capital, 25%. Property catastrophe: £12m on £90m, about 13%. Professional indemnity: £3m on £35m, about 9%. A modest margin on little capital can beat a fat margin on a lot of capital."
          },
          {
            id: "revise", at: [5, 1], span: 2, tone: "brass", label: "Revise the plan", sub: "Mix, price, reinsurance, costs",
            teach: "Plans that fall short are revised by changing the mix of business, raising prices, buying more efficient reinsurance or cutting expenses. With a 12% hurdle, you would grow cargo, hold catastrophe and review PI. The model lets you try it."
          }
        ],
        edges: [
          { from: "plan", to: "scr", label: "needs", teach: "The plan’s risks set the capital it needs." },
          { from: "plan", to: "profit", label: "expects", teach: "The plan’s prices and losses set the profit it expects." },
          { from: "scr", to: "roc", label: "÷ by", teach: "Capital is the denominator." },
          { from: "profit", to: "roc", label: "over", teach: "Profit is the numerator." },
          { from: "roc", to: "hurdle", label: "against", fromSide: "b", fromAt: 0.25, teach: "The return is compared with the hurdle." },
          { from: "roc", to: "classes", label: "by class", fromSide: "b", fromAt: 0.75, teach: "Allocating capital to classes shows which earn their keep." },
          { from: "hurdle", to: "revise", label: "if short", toSide: "t", toAt: 0.25, teach: "A plan that misses the hurdle is revised." },
          { from: "classes", to: "revise", label: "steers", toSide: "t", toAt: 0.75, teach: "Class returns show where to grow, fix or shrink." }
        ]
      },
      explore: "roc",
      takeaways: [
        "Every plan must be tested against the capital it requires, not only the profit it expects.",
        "Return on capital compares expected profit with capital, against a hurdle rate.",
        "Different classes consume very different capital, so class returns steer the mix.",
        "Stress and scenario tests check that the plan stays within appetite when things go wrong."
      ]
    },
    {
      title: "Planning at Lloyd’s",
      minutes: 6,
      keys: ["Business forecast", "Capital return", "Plan review", "ORSA"],
      intro: "Planning at Lloyd’s follows the same principles as anywhere else, with an extra layer of review: because every syndicate shares the brand, licences, ratings and Central Fund, Lloyd’s must approve each plan before the syndicate can trade. Follow a plan from the managing agent to 1 January.",
      diagram: {
        cols: 2,
        nodes: [
          {
            id: "agent", at: [1, 1], span: 2, tone: "ink", label: "The managing agent", sub: "Prepares each syndicate’s plan",
            teach: "Each autumn the managing agent prepares a plan for every syndicate it manages. Company market insurers go through a comparable process with their boards and regulators, and under Solvency II must also carry out an **Own Risk and Solvency Assessment** (ORSA), testing whether the plan can be achieved within appetite and capital over the planning horizon."
          },
          {
            id: "sbf", at: [2, 1], label: "Business forecast", sub: "Premium, loss ratios, costs",
            teach: "The **syndicate business forecast** sets out planned premium, loss ratios, expenses, reinsurance and expected results by class, together with the assumptions behind them."
          },
          {
            id: "cap", at: [2, 2], label: "Capital return", sub: "The internal model’s answer",
            teach: "Alongside it, the agent submits a **capital return** showing the syndicate’s capital requirement from its internal model. The two are reviewed together, because the plan drives the capital and the capital tests the plan."
          },
          {
            id: "review", at: [3, 1], span: 2, tone: "tint", label: "Lloyd’s review", sub: "Risk-based, against history and the market",
            teach: "Lloyd’s reviews each plan against the syndicate’s past performance, the market’s experience in each class and its own view of rate adequacy. In recent years it has taken a **risk-based** approach: closest attention to the plans and syndicates of most concern, more freedom for those with a strong record.\n\nIn 2018, after several poor years, Lloyd’s required syndicates to fix or stop writing their worst business, showing how planning can lift a whole market.",
            like: "Lloyd’s review of a plan is like a building society assessing a mortgage application. The applicant proposes the loan and how it will be repaid; the society checks income, history and property first, because if the borrower defaults, every member shares the cost."
          },
          {
            id: "ok", at: [4, 1], tone: "good", label: "Approved", sub: "Sets the capacity",
            teach: "The approved plan sets the syndicate’s **capacity** for the year. Writing materially more than the plan needs further approval. Growth in a profitable class with a credible plan is more readily accepted."
          },
          {
            id: "cond", at: [4, 2], tone: "bad", label: "Conditions or cuts", sub: "Optimism challenged",
            teach: "A plan relying on optimistic loss ratios, aggressive growth in a weak market or untested new classes can expect to be challenged, and may be approved only with conditions or at a reduced size. Growth in a class Lloyd’s regards as underpriced may be restricted."
          },
          {
            id: "jan", at: [5, 1], span: 2, label: "1 January", sub: "The new year of account begins",
            teach: "Only with an approved plan and capital in place can the syndicate trade in the new year of account from 1 January."
          }
        ],
        edges: [
          { from: "agent", to: "sbf", label: "submits", teach: "The agent submits the business forecast." },
          { from: "agent", to: "cap", label: "submits", teach: "And the capital return." },
          { from: "sbf", to: "review", teach: "Lloyd’s reviews the plan..." },
          { from: "cap", to: "review", teach: "...together with its capital." },
          { from: "review", to: "ok", label: "credible", teach: "A credible plan is approved and sets capacity." },
          { from: "review", to: "cond", label: "optimistic", teach: "An optimistic one is challenged, conditioned or cut." },
          { from: "ok", to: "jan", teach: "Approved syndicates trade from 1 January." },
          { from: "cond", to: "jan", teach: "So do conditioned ones, within their reduced or conditioned plans." }
        ]
      },
      takeaways: [
        "Lloyd’s must approve each syndicate’s plan before the new year of account begins.",
        "Managing agents submit a business forecast and a capital return for each syndicate in the autumn.",
        "Lloyd’s reviews plans against past performance, market experience and rate adequacy, with a risk-based focus.",
        "Company insurers test their plans through their boards, regulators and the ORSA."
      ]
    },
    {
      title: "Monitoring the plan",
      minutes: 6,
      keys: ["Actual against plan", "Variance analysis", "Reforecasting", "Early warnings"],
      intro: "A plan is only useful if the business knows, all year, whether it is on course. Follow one real-looking situation down the page: premium ahead of plan, rates behind it. Is that good news?",
      diagram: {
        cols: 2,
        nodes: [
          {
            id: "plan", at: [1, 1], tone: "ink", label: "The plan", sub: "Premium, rate, retention, losses",
            teach: "Monitoring compares actual performance with the plan on several fronts: **premium** by class and month (many classes renew heavily on particular dates), **rate change** achieved, **retention** and new business, **loss ratios** as they emerge, **expenses**, and **exposure** against the risk appetite limits."
          },
          {
            id: "actual", at: [1, 2], label: "What actually happened", sub: "Month by month",
            teach: "The actuals arrive month by month: premium bound, rates achieved, claims notified. Each one can be set against the plan’s phasing."
          },
          {
            id: "var", at: [2, 1], span: 2, tone: "tint", label: "The variance", sub: "A question, not an answer",
            teach: "A difference from plan is a **question**, not an answer. Premium below plan might mean the market has softened and underwriters have rightly declined underpriced business: good discipline. Or a major broker has moved elsewhere: a problem. Each variance needs an explanation.",
            like: "Monitoring a plan is like watching the arrival time on a satnav. A ten-minute delay may be traffic that will clear, or the first sign of a closed road. The driver doesn’t abandon the destination, but decides whether to wait, reroute or warn the people expecting them."
          },
          {
            id: "prem", at: [3, 1], tone: "good", label: "Premium 10% ahead", sub: "Looks like success",
            teach: "On its own, premium ahead of plan looks like success: more business, more income."
          },
          {
            id: "rate", at: [3, 2], tone: "bad", label: "Rate 6 points behind", sub: "Prices below plan",
            teach: "But the like-for-like rate change achieved is six points below plan. The business is being written at lower prices than the plan assumed."
          },
          {
            id: "diag", at: [4, 1], span: 2, tone: "brass", label: "Growth from underpriced business", sub: "The early warning",
            teach: "Put the two together and the likely story is worrying: the extra premium is coming from writing more business at lower prices than planned. The loss ratio on that business will probably be worse than the plan assumed, so the growth may **reduce** profit rather than increase it. The model shows how."
          },
          {
            id: "refc", at: [5, 1], label: "Reforecast", sub: "At least quarterly",
            teach: "Most businesses **reforecast** at least quarterly. The reforecast doesn’t replace the plan as the benchmark, but shows the expected outcome for the year and the action needed to stay within appetite."
          },
          {
            id: "act", at: [5, 2], label: "Act", sub: "Hold rates, slow growth",
            teach: "Here, the action is probably to hold rates and slow growth, even if it means missing the premium plan. Missing the premium target is a much smaller problem than writing a book that loses money."
          }
        ],
        edges: [
          { from: "plan", to: "var", teach: "The plan is the benchmark..." },
          { from: "actual", to: "var", teach: "...and the actuals are measured against it." },
          { from: "var", to: "prem", label: "shows", teach: "One variance: more premium than planned." },
          { from: "var", to: "rate", label: "shows", teach: "Another: lower rates than planned." },
          { from: "prem", to: "diag", label: "together", teach: "Read together, the two variances tell a different story from either alone." },
          { from: "rate", to: "diag", label: "together", teach: "Lower rates explain where the extra premium is coming from." },
          { from: "diag", to: "refc", label: "updates", teach: "The diagnosis feeds a revised view of the year." },
          { from: "diag", to: "act", label: "prompts", teach: "And action to bring the business back within plan and appetite." }
        ]
      },
      explore: "variance",
      takeaways: [
        "Monitoring compares premium, rate, retention, losses, expenses and exposure with the plan.",
        "Every variance needs an explanation, because the same figure can signal success or trouble.",
        "Reforecasts update the expected outcome without replacing the plan as the benchmark.",
        "Premium growth with weaker rates is an early warning sign."
      ]
    },
    {
      title: "When results fall short",
      minutes: 6,
      keys: ["Remediation", "Re-underwriting", "Rate action", "Exit"],
      intro: "Sometimes monitoring shows a lasting weakness in a class, not just one bad year. The business must then decide whether the class can be put right, or should be closed. Follow remediation down the page, and notice the step most managers find hardest to accept.",
      diagram: {
        cols: 2,
        gapX: 60,
        nodes: [
          {
            id: "weak", at: [1, 1], span: 2, tone: "bad", label: "A weak class", sub: "A lasting problem, not one bad year",
            teach: "Large and catastrophe losses can make any class look bad for a year. Remediation is for something more persistent: results below plan year after year, after allowing for bad luck."
          },
          {
            id: "diag", at: [2, 1], span: 2, tone: "ink", label: "Diagnose the cause", sub: "Price, selection, claims, inflation",
            teach: "First understand why. Inadequate pricing across the class? Poor selection of risks? A few very large losses? Weak claims handling? Unexpected claims inflation? Business written outside appetite? Each cause needs a different remedy, and a remedy aimed at the wrong cause can make things worse."
          },
          {
            id: "fix", at: [3, 1], label: "Re-underwrite and reprice", sub: "Tighter terms, higher rates",
            teach: "**Re-underwriting** tightens guidelines, raises deductibles, reduces limits and declines the worst segments. **Rate action** raises prices where they are inadequate, accepting that some clients will leave."
          },
          {
            id: "chan", at: [3, 2], label: "Change distribution", sub: "Drop poor brokers or coverholders",
            teach: "Sometimes the problem is where the business comes from. Ending relationships with brokers or coverholders whose business performs poorly can fix a class faster than any rate change."
          },
          {
            id: "shrink", at: [4, 1], tone: "brass", label: "Smaller first", sub: "Premium falls before results improve",
            teach: "Remediation usually **costs premium**. A class that sheds its worst business and raises prices shrinks before it improves, and the plan must recognise it.\n\nHolding on to premium in a weak class to protect the expense base is one of the commonest mistakes in insurance management. The model shows why it tempts managers, and why it is a trap.",
            like: "Remediating a class is like pruning a fruit tree. Cutting back makes the tree smaller this season, but lets the healthy wood grow and fruit better next year. A gardener who never prunes keeps a large tree that bears less and less."
          },
          {
            id: "reins", at: [4, 2], label: "Reinsurance", sub: "Cut volatility meanwhile",
            teach: "Buying protection can reduce volatility while the account is being improved, so a bad year during remediation doesn’t derail it."
          },
          {
            id: "better", at: [5, 1], tone: "good", label: "A healthier class", sub: "Smaller, but profitable",
            teach: "Done well, remediation leaves a smaller, profitable class with a sound base for future growth. Be aware it is easier to plan than to carry out: underwriters are reluctant to lose long-standing clients and brokers resist rate increases. Clear targets, agreed in advance and checked monthly, help."
          },
          {
            id: "exit", at: [5, 2], tone: "bad", label: "Exit", sub: "If it can’t earn its return",
            teach: "Leaving a class is hard: staff, broker relationships and expertise may be impossible to rebuild. It is the right decision when the class can’t earn an adequate return over the cycle, when the business has no genuine advantage in it, or when the capital could earn more elsewhere. The existing book is then run off."
          }
        ],
        edges: [
          { from: "weak", to: "diag", label: "first", teach: "Remediation begins with diagnosis, not action." },
          { from: "diag", to: "fix", label: "if pricing", at: 0.7, teach: "Pricing and selection problems call for re-underwriting and rate action." },
          { from: "diag", to: "chan", label: "if channel", at: 0.7, teach: "Problems with particular brokers or coverholders call for changing distribution." },
          { from: "fix", to: "shrink", label: "costs premium", teach: "Tighter terms and higher rates lose some clients." },
          { from: "chan", to: "reins", label: "meanwhile", teach: "While the book is being reshaped, reinsurance can damp volatility." },
          { from: "shrink", to: "better", label: "then", teach: "The smaller book then improves." },
          { from: "better", to: "exit", label: "if it can’t", teach: "If the class still can’t earn its return over the cycle, the right answer is to leave." }
        ]
      },
      explore: "remediation",
      takeaways: [
        "Remediation starts by diagnosing why a class is underperforming.",
        "Remedies include re-underwriting, rate action, changing distribution, reinsurance and exit.",
        "Remediation usually shrinks premium before it improves results.",
        "Exit is right when a class can’t earn an adequate return over the cycle."
      ]
    }
  ],
  quiz: [
    {
      q: "Which is the best description of risk appetite?",
      options: [
        "The maximum premium a syndicate may write",
        "The amount and type of risk a business is willing to take in pursuit of its objectives",
        "The reinsurance programme a business buys",
        "The capital required by the regulator"
      ],
      answer: 1,
      why: "Risk appetite is set by the board and turned into tolerances and limits that the plan must respect."
    },
    {
      q: "Expiring premium is £80m, retention is 90%, rate change is +5%, exposure is unchanged and new business is £10m. What is the plan premium?",
      options: ["£85.6m", "£82.0m", "£90.0m", "£94.0m"],
      answer: 0,
      why: "Renewed premium is £72m, which becomes £75.6m after a 5% rate increase. Adding £10m of new business gives £85.6m."
    },
    {
      q: "Why is rate change measured like for like?",
      options: [
        "To separate the change in price from changes in cover such as limits and deductibles",
        "Because brokers require it",
        "To include the effect of new business",
        "To remove inflation from claims"
      ],
      answer: 0,
      why: "A premium can rise while the price falls, for example if the limit has increased. Like-for-like measurement isolates price."
    },
    {
      q: "A class plans an attritional loss ratio of 50%, large losses of 8% and catastrophe losses of 7%. What is its plan loss ratio?",
      options: ["50%", "57%", "58%", "65%"],
      answer: 3,
      why: "The components are added together: 50% + 8% + 7% = 65%."
    },
    {
      q: "What does on-levelling do?",
      options: [
        "Restates past loss ratios as if the business had been written at today’s rates",
        "Removes catastrophe losses from the history",
        "Converts premium into another currency",
        "Adjusts commission to market levels"
      ],
      answer: 0,
      why: "On-levelling allows for rate changes since each past year was written, so the history can be compared with today’s prices."
    },
    {
      q: "Reinsurance premium is £30m and expected recoveries are £18m, with no commission. What is the net cost of reinsurance?",
      options: ["£12m", "£18m", "£30m", "£48m"],
      answer: 0,
      why: "The net cost is the premium ceded less the expected recoveries: £30m − £18m = £12m."
    },
    {
      q: "A plan expects a profit of £24m and requires £160m of capital. What is its expected return on capital?",
      options: ["6.7%", "10%", "15%", "24%"],
      answer: 2,
      why: "£24m ÷ £160m = 15%."
    },
    {
      q: "What must a Lloyd’s syndicate obtain before trading in a new year of account?",
      options: [
        "A new Act of Parliament",
        "Approval of its business plan and capital by the Corporation of Lloyd’s",
        "A separate licence in every country in which it writes",
        "A rating from every rating agency"
      ],
      answer: 1,
      why: "Lloyd’s reviews and approves each syndicate’s business forecast and capital requirement before the year begins."
    },
    {
      q: "Premium is well ahead of plan but rate change is well below plan. What is the most likely concern?",
      options: ["Expenses are too low", "Growth is coming from underpriced business", "Retention is too high", "Catastrophe exposure has fallen"],
      answer: 1,
      why: "Writing more business at lower prices than planned usually means the loss ratio will be worse than the plan assumed."
    }
  ]
});
