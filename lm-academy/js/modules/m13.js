/* The Slip — Business planning */
window.SLIP_DATA = window.SLIP_DATA || {};
(window.SLIP_DATA.modules = window.SLIP_DATA.modules || []).push({
  id: "m13",
  title: "Business planning",
  short: "Planning",
  blurb: "How an insurer turns strategy into a plan for premium, claims, expenses, reinsurance and capital, and keeps it on course.",
  outcomes: [
    "Describe the annual planning cycle and the people and bodies who rely on the plan.",
    "Explain how strategy and risk appetite shape what an insurer chooses to write.",
    "Build a premium plan from renewals, rate change, exposure change and new business.",
    "Construct a plan loss ratio from attritional, large and catastrophe components.",
    "Turn gross premium into a net result, allowing for expenses, reinsurance and investment income.",
    "Explain how capital requirements and return on capital test whether a plan is worthwhile.",
    "Describe how Lloyd’s reviews syndicate plans, and how plans are monitored and corrected."
  ],
  lessons: [
    {
      title: "Why insurers plan",
      minutes: 5,
      keys: ["Planning cycle", "Audiences", "Strategy into plan", "Reforecasting"],
      body: [
        "Every insurer, whether a Lloyd’s syndicate, a London company or an overseas group writing through London, prepares a business plan for each year. The plan sets out what the business intends to write, at what price, with what reinsurance and with how much capital, and what result it expects. It is the bridge between strategy, which describes where the business wants to be in several years’ time, and the daily decisions of its underwriters.",
        "A plan serves several audiences at once. The board uses it to set direction and to approve the risks the business will run. Capital providers, whether the members of a Lloyd’s syndicate or the shareholders of a company, use it to judge whether their capital will earn an adequate return. Regulators and, at Lloyd’s, the Corporation use it to check that the business is sound and that its risks are understood. Rating agencies use it to assess financial strength, and the underwriters use it as their budget and their brief.",
        { h: "The planning cycle" },
        "Planning is a cycle rather than an event. Strategy and risk appetite are set first. The business plan is then built class by class, and the capital needed to support it is calculated. The board, and at Lloyd’s the Corporation, review and approve the plan; the business underwrites against it; results are monitored; and the plan is reforecast as the year unfolds. The experience gained during the year then informs the next year’s strategy.",
        { fig: "planning-cycle" },
        { analogy: "A business plan is like the voyage plan for a ship. The owners decide the destination (strategy) and how much risk they will accept on the way (risk appetite). The navigator plots the course and calculates the fuel and cargo (the plan). Throughout the voyage the officers check the ship’s position against the plan and adjust course when the weather changes." },
        { note: "Plans are usually prepared during the summer and autumn for the following year. At Lloyd’s, each syndicate submits its plan and capital requirement to the Corporation for review before the new year of account begins on 1 January." },
        { think: { q: "Why might a capital provider and an underwriter read the same plan in different ways?", a: "The capital provider reads it as an investment proposal, asking whether the expected return justifies the capital at risk. The underwriter reads it as a budget and a brief, asking how much business to write, in which classes and at what prices." } }
      ],
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
      body: [
        "Before any numbers are set, an insurer must decide what kind of business it wants to be. Strategy answers two questions: where to compete, and how to win there. Risk appetite then sets the boundaries within which the strategy must be pursued.",
        { h: "Where to compete" },
        "Choices about where to compete include classes of business, territories, types of client, distribution channels, and whether to lead or follow. A syndicate might decide to concentrate on marine and energy, to lead most of what it writes and to grow in Asia; an MGA might choose a single product sold through a carefully chosen group of regional brokers. Each choice should rest on a genuine advantage, such as specialist expertise, better data, strong relationships with brokers or lower costs.",
        { h: "Risk appetite" },
        "**Risk appetite** is the amount and type of risk a business is willing to take in pursuit of its objectives. It is usually set out in a **risk appetite statement** approved by the board and supported by measurable **tolerances** and operational **limits**. A statement might say that the business will not accept a catastrophe loss that would threaten its ability to trade; the tolerance turns that into a maximum modelled loss; and the limits turn the tolerance into maximum exposures in each catastrophe zone.",
        {
          table: {
            head: ["Level", "Example"],
            rows: [
              ["Appetite statement", "We accept volatility from natural catastrophes, but not a loss that would threaten our ability to trade."],
              ["Tolerance", "The modelled 1-in-200-year net catastrophe loss must not exceed 25% of capital."],
              ["Limit", "Net exposure to a Florida hurricane must not exceed £150m at the 1-in-100-year return period."]
            ]
          }
        },
        "Risk appetite covers more than catastrophes. It also sets the maximum line on any one risk, the share of the account in long-tail classes, the minimum credit quality of reinsurers, the tolerance for deterioration in reserves, and the business’s attitude to conduct and reputational risks.",
        { analogy: "Strategy is choosing which mountains to climb; risk appetite is deciding in advance the weather in which you will turn back. Climbers who agree the second rule at base camp make better decisions than those who try to decide on the ridge." },
        { aware: "A risk appetite that is never tested against the plan is merely decoration. The plan should be checked against every tolerance and limit before it is approved, and the results reported to the board." }
      ],
      takeaways: [
        "Strategy decides where to compete and how to win, and should rest on a genuine advantage.",
        "Risk appetite is the amount and type of risk the business will accept, approved by the board.",
        "Appetite statements are turned into measurable tolerances and operational limits.",
        "The plan must be tested against the risk appetite before it is approved."
      ]
    },
    {
      title: "Building the premium plan",
      minutes: 7,
      keys: ["Retention", "Risk-adjusted rate change", "Exposure change", "New business"],
      body: [
        "The premium plan answers a simple question: how much premium will each class write next year? The answer is built up from the existing book rather than guessed from the top down, because most of next year’s premium will come from renewing this year’s policies.",
        { h: "The building blocks" },
        {
          ol: [
            "**Expiring premium.** Start with the premium on policies that are due to renew during the year.",
            "**Retention.** Not every policy renews. Some clients move to competitors and others are declined by the underwriter. A retention rate of 85% means that 15% of expiring premium is expected to be lost.",
            "**Rate change.** The price of renewed business changes. It is measured like for like, stripping out changes in cover, so that the figure reflects price alone.",
            "**Exposure change.** The amount insured also changes, through higher property values, larger turnover or more vessels in a fleet. Premium usually rises with exposure even if the rate is unchanged.",
            "**New business.** Finally, add the premium expected from new clients, based on the pipeline, broker relationships and market opportunities."
          ]
        },
        { fig: "premium-waterfall" },
        { example: { title: "A premium plan for one class", text: "Expiring premium is £100m. Retention is 88%, so £12m is expected to be lost and £88m renewed. A like-for-like rate increase of 5% adds £4.4m, and exposure growth of 3% adds a further £2.8m. New business is planned at £15m. The plan premium is therefore £88m + £4.4m + £2.8m + £15m = £110.2m." } },
        { h: "Measuring rate change" },
        "In the London Market the like-for-like measure is usually called the **risk-adjusted rate change**. If a client’s premium rises by 10% but its deductible has been halved and its limit doubled, the true change in price may well be negative. Underwriters therefore record, for each renewal, the change in premium that is attributable to price alone, and these figures are combined to show the rate change achieved across the account.",
        { aware: "Premium growth is not the same as a rate increase. A class can grow its premium by 20% simply by writing more exposure at inadequate prices. Plans should always separate the effects of price, exposure and volume." },
        { think: { q: "A class has £50m of expiring premium, a retention rate of 90% and a like-for-like rate change of −4%. Ignoring exposure change and new business, how much premium will it renew?", a: "Retained premium is 90% of £50m, which is £45m. A 4% rate reduction takes this to £45m × 0.96 = £43.2m." } }
      ],
      takeaways: [
        "The premium plan is built up from expiring premium, not guessed from the top down.",
        "Retention, rate change, exposure change and new business each move the premium.",
        "Rate change should be measured like for like, stripping out changes in cover.",
        "Premium growth is not the same as a rate increase."
      ]
    },
    {
      title: "Planning the loss ratio",
      minutes: 8,
      keys: ["Attritional losses", "Large losses", "Catastrophe load", "On-levelling"],
      body: [
        "If the premium plan is the top line, the loss ratio is the figure that decides whether the plan succeeds. It is also the hardest to forecast, because it depends on claims that have not yet happened. Planners therefore divide the expected loss ratio into components that behave differently and can be estimated separately.",
        { h: "Three components" },
        {
          terms: [
            ["Attritional losses", "The steady flow of small and medium-sized claims. They are relatively predictable and are usually projected from the historical attritional loss ratio, adjusted for rate change and inflation."],
            ["Large losses", "Individual claims above a threshold, such as £1m. They are less frequent and more volatile, so they are planned as an average annual cost based on a long history or a model."],
            ["Catastrophe losses", "Losses from events that affect many risks at once, such as hurricanes and earthquakes. They are planned using the average annual loss from a catastrophe model, adjusted for any perils the model does not cover."]
          ]
        },
        { fig: "lr-build" },
        { h: "From past years to next year" },
        "The usual starting point for the attritional loss ratio is the history of each underwriting year, developed to its expected ultimate value. That history is then **on-levelled**: each past year’s loss ratio is restated as if the business had been written at today’s prices, by allowing for the rate changes made since. Claims inflation is applied to bring past claims up to what they would cost today. The result estimates the loss ratio that the business would produce at current rates, and the planned rate change then moves it to next year’s prices.",
        { example: { title: "On-levelling a past year", text: "Two years ago a class produced an ultimate attritional loss ratio of 60%. Since then rates have risen by 8% and then by 5%, a cumulative increase of 13.4%, while claims inflation has been 6% a year, or about 12.4% over the two years. At today’s rates and costs, the loss ratio becomes 60% × 1.124 ÷ 1.134, which is about 59.5%." } },
        { h: "Uncertainty" },
        "Even a carefully prepared plan loss ratio is an estimate with a wide range of possible outcomes around it. Large and catastrophe losses can make one year look much better or much worse than the plan without any change in the underlying quality of the business. A sensible plan states its assumptions, shows a range of outcomes and does not treat a benign year as proof that prices are adequate.",
        { analogy: "Planning a loss ratio is like budgeting for repairs to a house. Small repairs come along steadily and can be estimated from last year’s receipts. A new boiler is rarer, so you set aside an average amount each year. Storm damage to the roof is rarer still, so you rely on the odds of a bad storm rather than on last year’s experience." },
        { think: { q: "A class plans an attritional loss ratio of 48%, large losses of 9% and catastrophe losses of 6%. What is its plan loss ratio, and which components are most likely to make the actual result differ from plan?", a: "The plan loss ratio is 48% + 9% + 6% = 63%. The large loss and catastrophe components are the most volatile, so they are the most likely to cause a large difference from plan in any one year." } }
      ],
      takeaways: [
        "The plan loss ratio is built from attritional, large and catastrophe components.",
        "Past years are developed to ultimate, on-levelled for rate change and adjusted for inflation.",
        "Catastrophe losses are planned from a model’s average annual loss.",
        "Every plan loss ratio is uncertain, and a good plan shows the range of outcomes."
      ]
    },
    {
      title: "From gross premium to net result",
      minutes: 8,
      keys: ["Acquisition costs", "Operating expenses", "Net cost of reinsurance", "Investment income"],
      body: [
        "Premium and claims are only part of the picture. Between the gross premium written and the profit the business makes lie acquisition costs, operating expenses, reinsurance and investment income. The plan must account for each of them.",
        { h: "Acquisition costs" },
        "**Acquisition costs** are the costs of obtaining business: brokerage, commission paid to coverholders and MGAs, and sometimes profit commissions and fees. In the London Market they are often between 25% and 35% of gross premium, and they vary widely by class and channel. Business written under delegated authority usually carries higher acquisition costs than open market business, because the coverholder is paid for the underwriting and administration it performs.",
        { h: "Operating expenses" },
        "**Operating expenses**, sometimes called management expenses, cover underwriting and claims staff, systems, premises and central functions. At Lloyd’s they also include the managing agent’s fees and the market’s own charges, such as subscriptions and contributions to the Central Fund.",
        { h: "Reinsurance" },
        "Outwards reinsurance has a cost, the premium paid to reinsurers, and a benefit, the recoveries expected from them. The plan shows both. The **net cost of reinsurance** is the premium ceded less the expected recoveries and any commission received. It is the price of the protection, and in most years it is positive.",
        { h: "Investment income" },
        "Finally, premium is held and invested until claims are paid. The planned investment return on those funds is added to the underwriting result to give the overall result.",
        { fig: "pnl-waterfall" },
        { example: { title: "A simple net plan", text: "Gross premium is £200m, assumed to be fully earned for simplicity. Acquisition costs are £56m (28%), expected gross claims £118m (59%) and operating expenses £16m (8%). Reinsurance premium is £20m and expected recoveries £12m, a net cost of £8m. The underwriting result is £200m − £56m − £118m − £16m − £8m = £2m. Investment income on the funds held is £6m, giving an overall result of £8m." } },
        "Expressed as ratios, this plan has a gross combined ratio of 95% and a net combined ratio of about 98.9%. The reinsurance is expected to cost more than it recovers, which is normal: the business pays reinsurers a margin in return for reducing its volatility and its capital needs. Investment income provides much of the overall return.",
        { aware: "A plan in which the net result looks better than the gross result deserves close scrutiny. It usually means the plan assumes more reinsurance recoveries than the reinsurers expect to pay, which is unlikely to be true over time." },
        { think: { q: "Why is the net combined ratio in the example worse than the gross combined ratio?", a: "The reinsurance premium of £20m exceeds the expected recoveries of £12m. The business pays reinsurers an expected margin of £8m in exchange for lower volatility and capital requirements, so its expected net result is lower than its expected gross result." } }
      ],
      takeaways: [
        "The plan moves from gross premium to net result through acquisition costs, expenses, reinsurance and investment income.",
        "Acquisition costs vary by class and channel, and are usually higher for delegated business.",
        "The net cost of reinsurance is ceded premium less expected recoveries and commission.",
        "Reinsurance normally reduces the expected result in exchange for lower volatility."
      ]
    },
    {
      title: "Capital and return",
      minutes: 7,
      keys: ["Solvency Capital Requirement", "Return on capital", "Hurdle rate", "Stress testing"],
      body: [
        "A plan can show a healthy profit and still be a poor use of capital. Every pound of premium written needs capital behind it, and capital is expensive. The final test of a plan is therefore whether its expected return justifies the capital it requires.",
        { h: "How much capital?" },
        "Under Solvency II and its UK successor, an insurer must hold enough capital to survive a 1-in-200-year loss over the coming year, known as its **Solvency Capital Requirement (SCR)**. The SCR reflects the risks in the plan: premium risk on business still to be written, reserve risk on business already written, catastrophe risk, market and credit risk, and operational risk. At Lloyd’s, each syndicate calculates its requirement over the full life of the year of account, and Lloyd’s adds an uplift of 35% to set the capital its members must provide.",
        { h: "Return on capital" },
        "**Return on capital** compares expected profit with the capital required. A plan that expects a profit of £30m and needs £200m of capital has an expected return of 15%. Capital providers set a **hurdle rate**, the minimum return they will accept, and plans that fall short are revised by changing the mix of business, raising prices, buying more efficient reinsurance or reducing expenses.",
        { h: "Allocating capital to classes" },
        "Because different classes consume different amounts of capital, a business can allocate its capital to each class and measure the class’s return. A property catastrophe class may need far more capital per pound of premium than a short-tail marine cargo class, so a class with a modest margin but a small capital need can earn a better return than one with a higher margin and a heavy capital requirement.",
        {
          table: {
            head: ["Class", "Premium", "Expected profit", "Capital", "Return"],
            rows: [
              ["Marine cargo", "£40m", "£4m", "£16m", "25%"],
              ["Property catastrophe", "£60m", "£12m", "£90m", "13%"],
              ["Professional indemnity", "£50m", "£3m", "£35m", "9%"]
            ]
          }
        },
        { h: "Stress and scenario testing" },
        "Plans are also tested against adverse scenarios, such as a major catastrophe, a run of large losses, a fall in rates, the failure of a reinsurer or a deterioration in reserves on earlier years. The test is whether the business would remain solvent and within its risk appetite in each scenario, and what it would do in response.",
        { analogy: "Return on capital is like the yield on a rental property. A flat that earns £12,000 a year is a better investment than one earning £15,000 if the first cost £150,000 and the second £300,000. Insurers judge their classes in the same way, by the profit earned on the capital tied up." },
        { think: { q: "In the table, which classes would you grow if the hurdle rate were 12%, and which would you review?", a: "Marine cargo (25%) and property catastrophe (about 13%) both clear a 12% hurdle, with cargo the more efficient use of capital. Professional indemnity, at about 9%, falls short and should be reviewed for rate increases, better terms, more efficient reinsurance or a smaller share of the plan." } }
      ],
      takeaways: [
        "Every plan must be tested against the capital it requires, not only the profit it expects.",
        "The SCR covers premium, reserve, catastrophe, market, credit and operational risks.",
        "Return on capital compares expected profit with the capital required, against a hurdle rate.",
        "Stress and scenario tests check that the plan stays within appetite when things go wrong."
      ]
    },
    {
      title: "Planning at Lloyd’s",
      minutes: 7,
      keys: ["Business forecast", "Capital return", "Plan review", "ORSA"],
      body: [
        "Planning at Lloyd’s follows the same principles as planning anywhere else, but with an additional layer of review. Because every syndicate shares the Lloyd’s brand, licences, ratings and Central Fund, the Corporation of Lloyd’s takes a close interest in each syndicate’s plan, and must approve it before the syndicate can trade in the new year of account.",
        { h: "What a syndicate submits" },
        "Each autumn the managing agent submits, for every syndicate it manages, a **syndicate business forecast** setting out the planned premium, loss ratios, expenses, reinsurance and expected results by class, together with the assumptions behind them. Alongside it, the agent submits a capital return showing the syndicate’s capital requirement, calculated with its internal model. The two are reviewed together, because the plan drives the capital and the capital tests the plan.",
        { h: "How Lloyd’s reviews plans" },
        "Lloyd’s reviews each plan against the syndicate’s past performance, the market’s experience in each class and its own view of rate adequacy. In recent years it has adopted a more risk-based approach, concentrating its attention on syndicates whose plans or performance give most cause for concern and allowing more freedom to those with a strong record. A plan that relies on optimistic loss ratios, aggressive growth in a weak market or untested new classes can expect to be challenged, and may be approved only with conditions or at a reduced size.",
        { fig: "lloyds-timeline" },
        { h: "Capacity and growth" },
        "The approved plan sets the syndicate’s **capacity** for the year, the maximum premium (net of acquisition costs) it may accept. Writing materially more than the approved plan requires further approval. Growth in a class that Lloyd’s regards as underpriced may be restricted, while growth in a profitable class with a credible plan is more readily accepted.",
        { h: "Lessons from remediation" },
        "In 2018, after several years of poor results, Lloyd’s required syndicates to examine the worst-performing parts of their portfolios and either improve them or stop writing them. The exercise showed how the planning process can be used to improve the performance of a whole market, not only of individual syndicates.",
        { note: "Company market insurers go through a comparable process with their boards and regulators. Under Solvency II they must also carry out an **Own Risk and Solvency Assessment (ORSA)**, which tests whether the business plan can be achieved within the firm’s risk appetite and capital over the planning horizon." },
        { analogy: "Lloyd’s review of a plan is like a building society assessing a mortgage application. The applicant proposes how much to borrow and how it will be repaid; the society checks the income, the history and the property before lending, because if the borrower defaults, every member of the society shares the cost." }
      ],
      takeaways: [
        "Lloyd’s must approve each syndicate’s plan before the new year of account begins.",
        "Managing agents submit a business forecast and a capital return for each syndicate in the autumn.",
        "Lloyd’s reviews plans against past performance, market experience and rate adequacy, with a risk-based focus.",
        "Company insurers test their plans through their boards, their regulators and the ORSA."
      ]
    },
    {
      title: "Monitoring the plan",
      minutes: 7,
      keys: ["Actual against plan", "Variance analysis", "Reforecasting", "Early warnings"],
      body: [
        "A plan is useful only if the business knows, throughout the year, whether it is on course. Monitoring compares actual performance with the plan, explains the differences and decides what should be done about them.",
        { h: "What to monitor" },
        {
          terms: [
            ["Premium against plan", "Written premium by class and month, compared with the planned phasing, since many classes renew heavily on particular dates."],
            ["Rate change achieved", "The like-for-like rate change on renewals, compared with the planned rate change."],
            ["Retention and new business", "The proportion of expiring business renewed, and the volume and quality of new business."],
            ["Loss ratios", "Attritional loss ratios as they emerge, the number and size of large losses, and any catastrophe events."],
            ["Expenses", "Operating expenses and acquisition costs against budget."],
            ["Exposure", "Aggregates and modelled catastrophe losses against the limits in the risk appetite."]
          ]
        },
        { fig: "plan-vs-actual" },
        { h: "Reading the variances" },
        "A difference from plan is a question, not an answer. Premium may be below plan because the market has softened and the underwriters have rightly declined underpriced business, which is good discipline; or because a major broker has moved its business elsewhere, which is a problem. Premium above plan may reflect success, or a willingness to write business the plan never intended. Each variance needs an explanation.",
        { h: "Reforecasting" },
        "Most businesses **reforecast** the year at least quarterly, replacing the original assumptions with the latest information. The reforecast does not replace the plan as the benchmark, but it shows the expected outcome for the year and the action needed to stay within appetite.",
        { analogy: "Monitoring a plan is like watching the arrival time on a satnav during a journey. A delay of ten minutes may be traffic that will clear, or the first sign of a closed road. The driver does not abandon the destination, but decides whether to wait, take another route or warn the people expecting them." },
        { think: { q: "Premium in a class is 10% ahead of plan, but the rate change achieved is six points below the planned figure. Why should this worry the underwriting director?", a: "The extra premium is probably coming from writing more business at lower prices than planned. The loss ratio on that business is likely to be worse than the plan assumed, so the growth may reduce profit rather than increase it." } }
      ],
      takeaways: [
        "Monitoring compares premium, rate, retention, losses, expenses and exposure with the plan.",
        "Every variance needs an explanation, because the same figure can signal success or trouble.",
        "Reforecasts update the expected outcome without replacing the plan as the benchmark.",
        "Premium growth accompanied by weaker rates is an early warning sign."
      ]
    },
    {
      title: "When results fall short",
      minutes: 6,
      keys: ["Remediation", "Re-underwriting", "Rate action", "Exit"],
      body: [
        "Sometimes monitoring shows that a class is not performing as planned, and that the problem is not a single bad year but a lasting weakness. The business must then decide whether the class can be put right or should be closed. This process is usually called **remediation**.",
        { h: "Diagnosing the problem" },
        "The first step is to understand why results are poor. The cause may be inadequate pricing across the class, poor selection of risks, a small number of very large losses, weaknesses in claims handling, unexpected claims inflation, or business written outside appetite. Each cause calls for a different response, and a remedy aimed at the wrong cause can make matters worse.",
        { h: "Remedies" },
        {
          ul: [
            "**Re-underwriting:** tightening guidelines, raising deductibles, reducing limits and declining the worst segments.",
            "**Rate action:** increasing prices where they are inadequate, accepting that some clients will leave.",
            "**Changing distribution:** ending relationships with brokers or coverholders whose business performs poorly.",
            "**Reinsurance:** buying protection to reduce volatility while the account is improved.",
            "**Exit:** ceasing to write the class altogether and running off the existing book."
          ]
        },
        "Remediation usually costs premium. A class that sheds its worst business and raises prices will shrink before it improves, and the plan must recognise this. Holding on to premium in an underperforming class in order to protect the expense base is one of the most common mistakes in insurance management.",
        { h: "Knowing when to stop" },
        "Leaving a class is a difficult decision, because it means losing staff, broker relationships and expertise that may be hard to rebuild. It is the right decision when the class cannot earn an adequate return over the cycle, when the business has no genuine advantage in it, or when the capital could earn more elsewhere.",
        { analogy: "Remediating a class is like pruning a fruit tree. Cutting back branches makes the tree smaller this season, but it lets the healthy wood grow and fruit better next year. A gardener who never prunes keeps a large tree that bears less and less." },
        { aware: "Remediation is easier to plan than to carry out. Underwriters are reluctant to lose clients they have known for years, and brokers resist rate increases. Clear targets, agreed in advance and monitored every month, make it more likely that the plan is followed." }
      ],
      takeaways: [
        "Remediation starts by diagnosing why a class is underperforming.",
        "Remedies include re-underwriting, rate action, changing distribution, reinsurance and exit.",
        "Remediation usually shrinks premium before it improves results.",
        "Exit is right when a class cannot earn an adequate return over the cycle."
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
