/* The Slip — Treaty underwriting */
window.SLIP_DATA = window.SLIP_DATA || {};
(window.SLIP_DATA.modules = window.SLIP_DATA.modules || []).push({
  id: "m12",
  title: "Treaty underwriting",
  short: "Treaty",
  blurb: "How reinsurers assess, price, word and manage treaty reinsurance, from the submission to the claims.",
  outcomes: [
    "Describe the information a reinsurer expects in a treaty submission and how it is used.",
    "Explain how a reinsurer assesses the cedant as well as the business ceded.",
    "Price a proportional treaty, including the ceding commission, sliding scales, profit commission and loss corridors.",
    "Explain experience rating, exposure rating and catastrophe modelling for excess of loss treaties.",
    "Identify the main clauses of a treaty wording and explain what each does.",
    "Describe the renewal season and how treaty lines are quoted, written and signed.",
    "Explain how treaty claims, run-off and a reinsurer’s own portfolio are managed."
  ],
  lessons: [
    {
      title: "The treaty submission",
      minutes: 7,
      keys: ["Estimated premium income", "Risk profile", "Loss triangles", "What has changed"],
      body: [
        "A treaty covers a whole portfolio rather than a single risk, so the treaty underwriter cannot inspect each policy. Instead, the underwriter relies on a **submission** prepared by the cedant and its reinsurance broker, which describes the business to be covered, its history and the terms requested. The quality of a submission has a direct effect on the terms the cedant obtains: reinsurers price uncertainty, and a thin submission costs money.",
        { h: "What a submission contains" },
        {
          terms: [
            ["The cedant", "Its strategy, management, financial strength and underwriting philosophy, and any significant changes during the past year."],
            ["The business", "Classes, territories, distribution, policy limits and deductibles, and the underwriting guidelines the cedant applies."],
            ["Premium", "The **estimated premium income (EPI)** for the period, its development over past years and the rate changes achieved."],
            ["Risk profile", "A table showing how many policies, how much premium and how much sum insured fall into each band of size. It is essential for exposure rating."],
            ["Loss history", "Losses by underwriting or accident year for at least five and often ten years, with triangles showing how they developed, and a list of individual large losses."],
            ["Catastrophe exposure", "Aggregate sums insured by zone and the results of catastrophe models, for property and other exposed classes."],
            ["Proposed terms", "The structure requested, such as the retention, limit, reinstatements and commission, and any changes from the expiring terms."]
          ]
        },
        { h: "Reading a submission" },
        "The underwriter reads a submission looking for change. A new underwriting team, a move into a new territory, a sharp rise in premium or a shift in the mix of business all alter the risk, often in ways that the history does not yet reveal. The underwriter also tests the data. Do the premiums in the risk profile reconcile with the EPI? Do the loss triangles add up? Are the large losses consistent with the claims reported in earlier submissions?",
        { analogy: "A treaty submission is like the information a buyer receives before acquiring a small business. The buyer cannot meet every customer, so relies on the accounts, the customer list, the history of complaints and the owner’s plans. Gaps and inconsistencies in that information make the buyer cautious, and lower the price offered." },
        { aware: "Past results are a guide to future results only if the business has not changed. A treaty underwriter should always ask what is different this year, because the answer often matters more than the history." },
        { think: { q: "A cedant’s submission shows premium growing by 35% in a year, with an unchanged history of loss ratios. What questions would you ask?", a: "Where has the growth come from: new territories, new classes, new distribution or larger lines? Has it come from rate increases or from additional exposure, and at what prices? The loss history describes the old book, and may not describe the business now being ceded." } }
      ],
      takeaways: [
        "A treaty underwriter relies on the submission, because individual policies cannot be inspected.",
        "A submission covers the cedant, the business, premium, the risk profile, losses, catastrophe exposure and the proposed terms.",
        "Underwriters test the data for consistency and look for changes that the history does not show.",
        "Poor information is priced as uncertainty."
      ]
    },
    {
      title: "Assessing the cedant",
      minutes: 6,
      keys: ["Management", "Underwriting discipline", "Claims handling", "Continuity"],
      body: [
        "Under a treaty the reinsurer accepts business it has not selected, priced or handled. It follows the cedant’s underwriting and claims decisions, often for several years. The reinsurer is therefore backing the cedant’s people and processes as much as the portfolio itself, and treaty underwriters spend a great deal of time assessing them.",
        { h: "What the reinsurer looks at" },
        {
          ul: [
            "**Management and strategy:** the experience and stability of the team, and whether the strategy is coherent and achievable.",
            "**Underwriting discipline:** guidelines, authorities, pricing tools and rate monitoring, and evidence that they are followed.",
            "**Claims handling:** reserving practice, the speed and fairness of settlements, and the handling of large and complex claims.",
            "**Financial strength:** capital, ratings and reserves, which affect the cedant’s ability to meet its own share of losses and to pay its premiums.",
            "**Alignment:** how much of the risk the cedant keeps, and whether the commission it earns rewards results rather than volume."
          ]
        },
        { h: "Meetings and audits" },
        "Treaty underwriters meet their cedants regularly, often visiting them before renewal, and many treaties give the reinsurer the right to inspect the cedant’s records. Claims and underwriting audits test whether the cedant’s practice matches its description of itself.",
        { h: "Relationship and continuity" },
        "Treaty reinsurance is a long-term relationship. A reinsurer that supports a cedant through a bad year expects to share in the good years that follow, and cedants value reinsurers that are consistent in their support. This **continuity** is valued on both sides, but it should not be confused with loyalty at any price. A reinsurer that ignores a deteriorating cedant for the sake of the relationship serves neither party.",
        { analogy: "Assessing a cedant is like choosing a fund run by someone else. The fund’s past returns matter, but so do the manager’s experience, process and integrity, and whether the manager has their own money invested alongside yours." },
        { think: { q: "Why might a reinsurer prefer a quota share under which the cedant retains 50% to one under which it retains only 10%, even on the same commission terms?", a: "A cedant that keeps half of the risk shares heavily in its own results, so its incentive to underwrite and settle claims carefully is much stronger. With only 10% retained, the cedant’s results depend mainly on the commission it earns, which rewards volume." } }
      ],
      takeaways: [
        "A treaty reinsurer backs the cedant’s people and processes as well as its portfolio.",
        "Reinsurers assess management, underwriting discipline, claims handling, financial strength and alignment.",
        "Meetings, inspection rights and audits test whether practice matches description.",
        "Continuity is valued, but should not mean supporting a deteriorating cedant regardless."
      ]
    },
    {
      title: "Pricing proportional treaties",
      minutes: 9,
      keys: ["Expected loss ratio", "Ceding commission", "Sliding scale", "Loss corridor"],
      body: [
        "Under a proportional treaty the reinsurer shares premium and losses with the cedant, so it does not set a premium rate in the usual sense. Instead, the price is expressed through the **ceding commission** that the reinsurer pays back to the cedant, and through features that adjust the reinsurer’s share of the result. The starting point is the expected loss ratio of the business ceded.",
        { h: "Estimating the loss ratio" },
        "The reinsurer projects the loss ratio for the coming year in much the same way that a cedant plans its own: by developing each past year’s losses to ultimate, on-levelling them for rate changes, adjusting for claims inflation, and allowing separately for large and catastrophe losses. The result is an **expected loss ratio** for the treaty, together with a view of how widely the actual result might vary around it.",
        { h: "The commission the treaty can bear" },
        "If the expected loss ratio is 60%, and the reinsurer needs about 5% of premium to cover its own expenses and brokerage and a further 5% as profit, the treaty can bear a ceding commission of about 30%. A cedant asking for 35% would leave the reinsurer expecting to lose money, unless the reinsurer’s projection of the loss ratio is too pessimistic.",
        { example: { title: "The commission a treaty can bear", text: "Expected loss ratio 60%. Reinsurer’s brokerage and expenses 5%. Required margin 5%. Commission the treaty can bear: 100% − 60% − 5% − 5% = 30%." } },
        { h: "Sliding scale commission" },
        "A **sliding scale** links the commission to the loss ratio actually achieved. A provisional commission is paid at the outset, and the final commission is adjusted once the results are known: higher if the loss ratio is low, lower if it is high, within an agreed minimum and maximum. A typical scale might pay 30% at a 60% loss ratio, rising by one point for each point by which the loss ratio falls, to a maximum of 35% at 55%, and falling by one point for each point by which it rises, to a minimum of 25% at 65%.",
        { fig: "sliding-scale" },
        { h: "Profit commission" },
        "Alternatively, or in addition, the treaty may pay the cedant a **profit commission**: a share, often between 15% and 25%, of the reinsurer’s profit on the treaty after an allowance for its expenses. Deficits from poor years are usually carried forward against the profits of later years.",
        { h: "Limiting the reinsurer’s exposure" },
        {
          terms: [
            ["Event limit", "Caps the reinsurer’s share of losses from any one catastrophe, so that a quota share does not become an unlimited catastrophe cover."],
            ["Loss ratio cap", "Limits the reinsurer’s total losses to a stated loss ratio, such as 150% of premium."],
            ["Loss corridor", "The cedant keeps all losses between two loss ratios, such as 70% and 80%, before the reinsurer resumes its share. It gives the cedant a stake in moderately poor results."]
          ]
        },
        { fig: "loss-corridor" },
        { think: { q: "A sliding scale pays 30% at a 60% loss ratio, moving one point for each point of loss ratio, between 25% and 35%. What commission is paid if the final loss ratio is 57%? And if it is 70%?", a: "At 57% the loss ratio is three points better than 60%, so the commission is 33%. At 70% the scale would give 20%, but the minimum is 25%, so 25% is paid." } }
      ],
      takeaways: [
        "Proportional treaties are priced mainly through the ceding commission.",
        "The commission a treaty can bear is 100% less the expected loss ratio, the reinsurer’s expenses and its margin.",
        "Sliding scales and profit commissions link the cedant’s commission to results.",
        "Event limits, loss ratio caps and loss corridors limit the reinsurer’s exposure."
      ]
    },
    {
      title: "Pricing excess of loss: experience and exposure",
      minutes: 9,
      keys: ["Burning cost", "As-if losses", "Exposure curves", "Credibility"],
      body: [
        "An excess of loss treaty pays only the part of each loss that falls within its layer, so its price depends on how often losses reach the layer and how large they are when they do. Reinsurers use two complementary methods to estimate that cost: **experience rating**, based on the cedant’s own past losses, and **exposure rating**, based on the policies currently in force.",
        { h: "Experience rating and the burning cost" },
        "Experience rating asks what the layer would have cost if it had been in place in each past year. Each historical large loss is first adjusted to today’s values for claims inflation, and developed for any further growth expected in its estimate. These **as-if** losses are applied to the layer, and the total for each year is compared with that year’s premium income, also adjusted to today’s level. The result is the **burning cost**: the average proportion of premium that losses to the layer would have consumed.",
        {
          table: {
            head: ["Year", "Premium (on-levelled)", "As-if losses to layer", "Burn"],
            rows: [
              ["2020", "£40m", "£1.2m", "3.0%"],
              ["2021", "£42m", "£0.0m", "0.0%"],
              ["2022", "£44m", "£3.5m", "8.0%"],
              ["2023", "£46m", "£0.9m", "2.0%"],
              ["2024", "£48m", "£1.4m", "2.9%"],
              ["Total", "£220m", "£7.0m", "3.2%"]
            ]
          }
        },
        "The burning cost of 3.2% is then loaded for the reinsurer’s expenses and required margin, often by dividing it by a factor such as 0.7 or 0.8, which gives a rate of roughly 4.0% to 4.6% of the premium income.",
        "Experience rating works well when there is plenty of relevant history. It struggles when the layer is high and rarely touched, when the portfolio has changed, or when one exceptional year dominates the record.",
        { h: "Exposure rating" },
        "Exposure rating starts from the business currently in force. Using the cedant’s risk profile, the reinsurer estimates, for each band of policies, how much of the expected loss would fall into the layer. For property it uses **exposure curves**, which describe how losses are distributed as a proportion of the sum insured; for liability it uses **increased limit factors**, which describe how the expected cost of cover rises as the limit increases. Because exposure rating does not depend on past losses, it is particularly useful for high layers and for portfolios that have changed.",
        { h: "Bringing the methods together" },
        "In practice the underwriter or actuary compares the two results and forms a view. If experience is much worse than exposure suggests, the cedant may be selecting poor risks or the curves may be unsuitable; if it is much better, the history may simply have been fortunate. The final price combines the two, weighted by the **credibility** of each.",
        { analogy: "Experience rating is like estimating next winter’s heating bill from the bills of the last five winters; exposure rating is like estimating it from the size of the house, its insulation and the efficiency of the boiler. If the house has just doubled in size, the second method will be closer." },
        { think: { q: "No loss has touched a layer in ten years, so its burning cost is zero. Why would a reinsurer still charge a significant premium?", a: "A clean record does not mean that the layer cannot be hit; it may reflect good fortune, or a portfolio too small to have produced a loss yet. Exposure rating, based on the limits and sums insured now in force, will show a positive expected loss, and the reinsurer must also be paid for the capital it holds against the layer." } }
      ],
      takeaways: [
        "Experience rating restates past losses at today’s values and applies them to the layer.",
        "The burning cost is the average proportion of premium that losses to the layer would have consumed.",
        "Exposure rating applies exposure curves or increased limit factors to the current risk profile.",
        "Final prices combine both methods according to their credibility."
      ]
    },
    {
      title: "Pricing catastrophe excess of loss",
      minutes: 8,
      keys: ["Catastrophe models", "Expected loss", "Multiples", "Rate on line"],
      body: [
        "Catastrophe excess of loss treaties protect a cedant against the accumulation of many losses from a single event. Because major catastrophes are rare, the cedant’s own history is a poor guide to the cost of the cover, and pricing relies heavily on **catastrophe models**.",
        { h: "From model to expected loss" },
        "The cedant’s exposure data, meaning the locations, values and characteristics of the properties it insures, are run through one or more catastrophe models. The models simulate tens of thousands of years of possible events and estimate the cedant’s loss from each. Applying the layer’s terms to each simulated loss gives the layer’s **expected loss**, its average annual cost, and the full distribution of possible outcomes.",
        { fig: "ep-layer" },
        { h: "From expected loss to price" },
        "A catastrophe layer’s premium is considerably higher than its expected loss, because the reinsurer must hold substantial capital against the possibility of a total loss. The ratio of premium to expected loss, often called the **multiple**, is usually highest for the highest layers, which are rarely hit but would consume a great deal of capital if they were. Prices are also expressed as a **rate on line**, the premium divided by the limit.",
        { example: { title: "Pricing two layers", text: "A lower layer of £50m has an expected loss of £6m, or 12% of its limit. Priced at twice its expected loss, its premium is £12m, a rate on line of 24%. An upper layer of £100m has an expected loss of £1.5m, or 1.5% of its limit. Priced at four times its expected loss, its premium is £6m, a rate on line of 6%. The upper layer is cheaper in absolute terms but far more expensive relative to its expected loss, because it ties up more capital for each pound of expected claims." } },
        { h: "Judgement on the model" },
        "Models have known limitations. They may not capture every peril, the effect of inflation in rebuilding costs after a major event, or weaknesses in the cedant’s data. Underwriters therefore adjust modelled results for perils that are not modelled, for data quality and for their own view of the risk, and compare the price with those of similar programmes in the market.",
        { h: "Reinstatements and price" },
        "Most catastrophe layers include reinstatements, often one at 100% of the original premium. The reinsurer allows for the expected reinstatement premium in its pricing, because a loss to the layer brings in additional premium as well as a claim.",
        { aware: "A cedant whose exposure data are incomplete or out of date will often find that reinsurers substitute their own, more cautious assumptions. Improving exposure data is one of the most effective ways for a cedant to reduce the cost of its catastrophe reinsurance." },
        { think: { q: "Why is the multiple of premium to expected loss usually higher for a top layer than for a bottom layer?", a: "A top layer is rarely hit, so its expected loss is small, but when it is hit the loss is likely to be total. The reinsurer must hold capital against that full loss, so most of the premium pays for the capital rather than for the expected claims." } }
      ],
      takeaways: [
        "Catastrophe layers are priced mainly from catastrophe models rather than from the cedant’s history.",
        "The model gives the layer’s expected loss and the distribution of possible outcomes.",
        "Premium exceeds expected loss by a multiple that reflects the capital the layer consumes.",
        "Underwriters adjust modelled results for unmodelled perils, data quality and their own judgement."
      ]
    },
    {
      title: "The treaty wording",
      minutes: 9,
      keys: ["Ultimate net loss", "Follow the settlements", "Claims co-operation", "Run-off or clean cut"],
      body: [
        "The treaty wording is the contract between the cedant and the reinsurer. Its clauses decide what is covered, how losses are measured, how money moves and how disputes are resolved. Because the reinsurer follows the cedant’s business over a long period, the wording matters as much as the price.",
        { h: "Clauses that define the cover" },
        {
          terms: [
            ["Business covered", "The classes, territories and types of policy protected, and the basis of attachment: risks attaching during the period, or losses occurring during it."],
            ["Exclusions", "Business or perils outside the treaty, such as nuclear risks, war, communicable disease or certain cyber exposures."],
            ["Ultimate net loss", "The cedant’s loss after deducting recoveries and salvage, including or excluding defence costs as the wording specifies. It is the figure to which the retention and the limit apply."],
            ["Inuring reinsurance", "Other reinsurance that must be deducted before the treaty responds, such as a quota share sitting beneath an excess of loss."],
            ["Loss occurrence and hours clause", "Define what counts as one event for a catastrophe cover, such as all windstorm losses within 72 consecutive hours."]
          ]
        },
        { h: "Clauses about claims" },
        {
          terms: [
            ["Follow the settlements", "The reinsurer agrees to follow the cedant’s settlement of claims, provided that the claim falls within the original policy and the reinsurance, and was settled honestly and in a proper and businesslike way."],
            ["Claims notification", "Requires the cedant to tell the reinsurer promptly about losses that may affect the treaty, often once a loss reaches a set proportion of the retention."],
            ["Claims co-operation or control", "Gives the reinsurer the right to be consulted on, or to control, the handling of significant claims."],
            ["Cash call", "Allows the cedant to demand immediate payment of a large loss rather than waiting for the normal accounts."]
          ]
        },
        { h: "Clauses about money and the end of the treaty" },
        {
          terms: [
            ["Premium and accounts", "How deposit premiums, adjustments and claims are accounted for and settled, usually quarterly."],
            ["Reinstatement", "How cover is restored after a loss, and what additional premium is due."],
            ["Run-off or clean cut", "Whether the reinsurer remains liable after expiry for losses on policies already written (run-off), or whether those liabilities pass to the next treaty in exchange for a portfolio transfer (clean cut)."],
            ["Special termination", "Allows either party to end the treaty early if, for example, the other is downgraded, becomes insolvent or changes ownership."],
            ["Disputes", "Usually referred to arbitration, often in London under English law."]
          ]
        },
        { analogy: "A treaty wording is like a long-term partnership agreement. The headline division of profits matters, but most disagreements arise later, over details: what counts as partnership business, who decides on large expenses, and what happens when one partner wishes to leave." },
        { aware: "Wordings are sometimes agreed in haste at the end of a busy renewal season. Contract certainty requires the wording, not only the main terms, to be agreed before the treaty incepts, and disputes frequently turn on clauses that nobody read closely at the time." }
      ],
      takeaways: [
        "The wording decides what is covered, how losses are measured, how money moves and how disputes are resolved.",
        "Key definitions include the business covered, exclusions, ultimate net loss and the loss occurrence clause.",
        "Claims clauses include follow the settlements, notification, claims co-operation or control, and cash calls.",
        "Termination clauses decide whether liabilities run off or pass to the next treaty."
      ]
    },
    {
      title: "The renewal season",
      minutes: 7,
      keys: ["1 January", "Quotes", "Firm order terms", "Catastrophe budgets"],
      body: [
        "Most treaties are renewed each year on the same dates, which gives the reinsurance market a pronounced seasonal rhythm. The busiest season by far is the renewal on 1 January, when much of the world’s property and casualty treaty business renews.",
        { fig: "renewal-season" },
        { h: "The timetable" },
        "Preparations for 1 January begin in the summer, when cedants and brokers review the expiring programme and plan any changes. In September the industry gathers at the Rendezvous de Septembre in Monte Carlo, and in October at the reinsurance meeting in Baden-Baden, where cedants, brokers and reinsurers discuss market conditions and early views on pricing. Submissions are issued during the autumn, quotations follow in November and December, and terms must be agreed and signed before the treaties incept.",
        { h: "Quoting and placing" },
        "The broker invites selected reinsurers to **quote**, that is, to propose terms, including the price, for some or all of the layers. The cedant chooses the quote it prefers, and the broker then issues **firm order terms** to the market. Reinsurers respond with **written lines**, the shares they are prepared to take on those terms. As in the direct market, a programme that attracts more support than it needs is **oversubscribed**, and the lines are signed down so that each layer is placed at exactly 100%.",
        { h: "How a reinsurer decides its line" },
        "A reinsurer’s line on a layer depends on the price relative to its own view of the technical price, its appetite for the cedant and the class, and its capacity. For catastrophe layers, capacity is constrained by the reinsurer’s **catastrophe budget**: the total modelled loss it is willing to accept in each peril and region. A line on a Florida hurricane layer competes for the same budget as every other Florida layer the reinsurer writes.",
        { aware: "Some programmes are placed with different reinsurers on different terms, a practice sometimes called private or differential terms. It is controversial because it undermines the principle that all the reinsurers on a layer share the same contract and price, and many cedants and reinsurers prefer to avoid it." },
        { analogy: "The 1 January renewal is like the January transfer window in football. Clubs plan for months, negotiations intensify as the deadline approaches, and everything must be signed before the window closes. Clubs that leave everything to the last day often pay more or miss out." }
      ],
      takeaways: [
        "Most treaties renew on fixed dates, and 1 January is the largest renewal.",
        "Meetings in Monte Carlo and Baden-Baden set the tone for the 1 January renewal.",
        "The broker obtains quotes, issues firm order terms and collects written lines, which are signed down if oversubscribed.",
        "A reinsurer’s line depends on price, appetite and its catastrophe budget for each peril and region."
      ]
    },
    {
      title: "Treaty claims, run-off and commutation",
      minutes: 7,
      keys: ["Cash calls", "Event estimates", "Aggregation", "Commutation"],
      body: [
        "Treaty claims arrive in two ways. Most come through the regular accounts, in which the cedant reports the premiums and losses ceded each quarter. Large losses and catastrophes are notified individually, often within days of the event, and may be paid at once under a cash call clause.",
        { h: "After a catastrophe" },
        "When a major catastrophe strikes, reinsurers need to estimate their losses quickly, for their own capital and reporting purposes, long before their cedants know their final figures. They combine market estimates of the industry loss, catastrophe model outputs and early information from cedants. Initial estimates are often revised many times, and the final cost of a major event may not be known for years.",
        { h: "Disputes about events" },
        "Many treaty disputes concern **aggregation**: whether a series of losses arose from one event or from several. If a flood lasts longer than the hours clause allows, or a single cause gives rise to claims under many different policies, the answer can move millions of pounds between cedant and reinsurer, because each event carries its own retention and limit.",
        { h: "Run-off and commutation" },
        "Treaties written on a run-off basis leave the reinsurer exposed to late claims for many years, especially in long-tail casualty classes. Both parties may then prefer to end the relationship with a **commutation**: a single payment, agreed between them, in full settlement of all future liabilities under the treaty. A commutation gives the cedant certainty and immediate cash, and releases the reinsurer from future uncertainty and administration.",
        { h: "Legacy transactions" },
        "Insurers can also transfer whole books of past liabilities to specialist legacy reinsurers. A **loss portfolio transfer** moves existing reserves to a reinsurer in exchange for a premium, while an **adverse development cover** protects the cedant if its reserves for past years prove insufficient. The reinsurance of Lloyd’s 1992 and prior liabilities into Equitas is one of the best-known transactions of this kind.",
        { analogy: "A commutation is like settling a long-running maintenance contract with a single payment. Each side gives up the chance that the other would have paid more over time, in exchange for certainty and a clean break." },
        { think: { q: "Why might a reinsurer agree to commute a casualty treaty for more than its own best estimate of the remaining claims?", a: "Commutation removes the risk that claims will develop worse than expected, frees the capital held against the treaty and ends the cost of administering it. The reinsurer may judge those benefits to be worth more than the difference between the payment and its best estimate." } }
      ],
      takeaways: [
        "Most treaty claims arrive in quarterly accounts; large losses are notified individually and may be cash-called.",
        "After a catastrophe, reinsurers estimate losses quickly from market data, models and cedants’ reports.",
        "Aggregation disputes decide how many events, and so how many retentions and limits, apply.",
        "Commutations, loss portfolio transfers and adverse development covers deal with long-tail liabilities."
      ]
    },
    {
      title: "Managing a reinsurance portfolio",
      minutes: 7,
      keys: ["Catastrophe budgets", "Balance", "Retrocession", "Security"],
      body: [
        "A reinsurer is an insurer of insurers, and it manages its own portfolio with the same tools described in the portfolio management module, adapted to the scale and concentration of reinsurance risk.",
        { h: "Catastrophe budgets" },
        "A property catastrophe reinsurer allocates its capital in the form of **catastrophe budgets**: limits on the modelled loss it will accept from each peril and region at chosen return periods. During the renewal season, underwriters track how much of each budget their lines consume, and the most attractive layers compete for the limited capacity available in peak zones such as US hurricane and Japanese earthquake.",
        { h: "Balancing the book" },
        "Reinsurers seek a balance of property and casualty business, of short-tail and long-tail classes, and of proportional and non-proportional treaties, across many territories. Proportional business offers steadier premium and smaller margins; catastrophe excess of loss offers higher margins with far greater volatility; and casualty treaties generate investment income from long-held reserves, but carry the risk that those reserves prove inadequate.",
        { h: "Retrocession" },
        "Reinsurers buy their own protection, known as **retrocession**, to reduce their peak exposures and protect their capital. The retrocession market is smaller and more volatile than the reinsurance market, and relies heavily on alternative capital. When retrocession becomes scarce or expensive, as it did after the heavy catastrophe losses of the years to 2022, reinsurers often reduce the catastrophe capacity they offer to their own cedants.",
        { h: "Security and credit" },
        "Cedants care about their reinsurers’ ability to pay, sometimes many years after a loss. Most set minimum standards for reinsurers’ ratings, limit their exposure to any single reinsurer and require collateral from unrated reinsurers and providers of alternative capital. A reinsurer’s financial strength is therefore a commercial asset as well as a regulatory requirement.",
        { analogy: "A reinsurer managing catastrophe budgets is like an airline allocating seats on its busiest routes. Each route has a fixed number of seats, the most popular flights fill first, and the airline must decide which customers and fares deserve the limited space." }
      ],
      takeaways: [
        "Reinsurers allocate capital through catastrophe budgets for each peril and region.",
        "They balance property and casualty, short-tail and long-tail, and proportional and non-proportional business.",
        "Retrocession protects reinsurers, and its cost and availability affect the capacity they offer.",
        "Financial strength is both a regulatory requirement and a commercial asset."
      ]
    }
  ],
  quiz: [
    {
      q: "What is the risk profile in a treaty submission?",
      options: [
        "A table showing the number of policies, the premium and the sums insured in bands of size",
        "The cedant’s credit rating",
        "The list of individual large losses",
        "The broker’s remuneration"
      ],
      answer: 0,
      why: "The risk profile shows how the portfolio is distributed by size, which is essential for exposure rating."
    },
    {
      q: "The expected loss ratio is 62%, the reinsurer’s expenses are 4% and its required margin is 6%. What ceding commission can the treaty bear?",
      options: ["24%", "28%", "32%", "38%"],
      answer: 1,
      why: "100% − 62% − 4% − 6% = 28%."
    },
    {
      q: "A sliding scale pays 28% at a 60% loss ratio, moving one point for each point of loss ratio, between 24% and 32%. What is paid at a 58% loss ratio?",
      options: ["26%", "28%", "30%", "32%"],
      answer: 2,
      why: "The loss ratio is two points better than 60%, so the commission rises by two points to 30%."
    },
    {
      q: "What is a loss corridor?",
      options: [
        "A band of loss ratio within which the cedant keeps all losses before the reinsurer resumes its share",
        "A limit on catastrophe exposure in a zone",
        "A minimum and deposit premium",
        "A type of arbitration procedure"
      ],
      answer: 0,
      why: "A corridor, for example between 70% and 80%, gives the cedant a direct stake in moderately poor results."
    },
    {
      q: "Over five years, on-levelled premium totals £250m and as-if losses to a layer total £10m. What is the burning cost?",
      options: ["2.5%", "4%", "10%", "25%"],
      answer: 1,
      why: "£10m ÷ £250m = 4% of premium income, before loadings for expenses and margin."
    },
    {
      q: "Why is exposure rating particularly useful for high layers?",
      options: [
        "It uses the limits and sums insured now in force rather than past losses, which rarely reach high layers",
        "It ignores catastrophe losses",
        "It always produces a lower price",
        "It relies on the broker’s estimate"
      ],
      answer: 0,
      why: "High layers have little loss history, so a method based on current exposures is more credible."
    },
    {
      q: "A £100m catastrophe layer has an expected loss of £2m and is priced at three times its expected loss. What is its rate on line?",
      options: ["2%", "3%", "6%", "9%"],
      answer: 2,
      why: "The premium is £6m, and £6m ÷ £100m = 6%."
    },
    {
      q: "What does a follow the settlements clause require?",
      options: [
        "The reinsurer follows the cedant’s settlements that fall within the policy and the treaty and were made honestly and in a businesslike way",
        "The cedant follows the reinsurer’s instructions on every claim",
        "Claims are settled in the order in which they are received",
        "The reinsurer pays every claim, whatever the cover"
      ],
      answer: 0,
      why: "The reinsurer is bound by proper settlements, but not by settlements outside the cover or made improperly."
    },
    {
      q: "What is a commutation?",
      options: [
        "A single agreed payment in full settlement of all future liabilities under a treaty",
        "A change in the currency of a treaty",
        "The renewal of a treaty on new terms",
        "The transfer of a treaty to a new broker"
      ],
      answer: 0,
      why: "Commutation ends the treaty relationship with a clean break, giving certainty to both parties."
    }
  ]
});
