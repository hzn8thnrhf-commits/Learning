/* The Slip — Treaty underwriting */
window.SLIP_DATA = window.SLIP_DATA || {};
(window.SLIP_DATA.modules = window.SLIP_DATA.modules || []).push({
  id: "m12",
  title: "Treaty underwriting",
  short: "Treaty",
  blurb: "How reinsurers assess, price and manage treaties: submissions, cedants, proportional and excess of loss pricing, wordings, renewals and claims.",
  outcomes: [
    "Describe the contents of a treaty submission and how an underwriter reads it.",
    "Explain how reinsurers assess a cedant.",
    "Price a proportional treaty through its commission, and an excess of loss layer by experience and exposure.",
    "Explain catastrophe pricing, key wording clauses, the renewal season and how treaty claims and run-off are handled."
  ],
  lessons: [
    {
      title: "The treaty submission",
      minutes: 7,
      keys: ["Estimated premium income", "Risk profile", "Loss triangles", "What has changed"],
      intro: "A treaty covers a whole portfolio, so the treaty underwriter can’t inspect each policy. Everything rests on the submission. Look at what goes into it, row by row, and then at how the underwriter reads it: not for the history, but for change.",
      diagram: {
        cols: 3,
        nodes: [
          {
            id: "src", at: [1, 1], span: 3, tone: "ink", label: "Cedant and broker", sub: "Prepare the submission",
            teach: "The cedant and its reinsurance broker prepare a **submission** describing the business to be covered, its history and the terms requested. It also covers the cedant itself: strategy, management, financial strength and anything that has changed in the past year.\n\nIts quality has a direct effect on the terms: reinsurers price uncertainty, and a thin submission costs money.",
            like: "A treaty submission is like the information a buyer gets before acquiring a small business. The buyer can’t meet every customer, so relies on the accounts, the customer list, the complaints history and the owner’s plans. Gaps make the buyer cautious, and lower the price offered."
          },
          {
            id: "epi", at: [2, 1], label: "Premium", sub: "EPI and rate changes",
            teach: "The **estimated premium income** (EPI) for the period, how it has developed over past years, and the rate changes achieved. The EPI is what the treaty’s premium and ceding will be measured against."
          },
          {
            id: "profile", at: [2, 2], label: "Risk profile", sub: "Policies by size band",
            teach: "The **risk profile** is a table showing how many policies, how much premium and how much sum insured fall into each band of size. It is essential for exposure rating, as lesson 4 explains."
          },
          {
            id: "biz", at: [2, 3], label: "The business", sub: "Classes, territories, rules",
            teach: "Classes, territories, distribution, policy limits and deductibles, and the **underwriting guidelines** the cedant applies. This is the description of what the reinsurer will be backing, sight unseen."
          },
          {
            id: "losses", at: [3, 1], label: "Loss history", sub: "Triangles, large losses",
            teach: "Losses by underwriting or accident year for at least five and often ten years, with **triangles** showing how they developed, and a list of individual large losses."
          },
          {
            id: "cat", at: [3, 2], label: "Cat exposure", sub: "Zones and models",
            teach: "For property and other exposed classes: aggregate sums insured by zone and the results of catastrophe models. This feeds catastrophe pricing in lesson 5."
          },
          {
            id: "terms", at: [3, 3], label: "Proposed terms", sub: "The structure requested",
            teach: "The structure requested, such as retention, limit, reinstatements and commission, and any changes from the expiring terms."
          },
          {
            id: "reader", at: [4, 1], span: 3, tone: "tint", label: "The underwriter reads for change", sub: "And tests the data",
            teach: "The underwriter reads a submission looking for **change**. A new underwriting team, a new territory, a sharp rise in premium or a shift in mix all alter the risk, often in ways the history doesn’t yet show.\n\nThe data is tested too. Do the risk profile’s premiums reconcile with the EPI? Do the triangles add up? Are the large losses consistent with earlier submissions?"
          },
          {
            id: "price", at: [5, 1], span: 3, tone: "bad", label: "Uncertainty is priced", sub: "A thin submission costs money",
            teach: "Past results guide future results only if the business hasn’t changed. Where the underwriter can’t tell, it assumes the worse case, so gaps and inconsistencies become extra premium or less support. A good submission is the cheapest way for a cedant to improve its terms."
          }
        ],
        edges: [
          { from: "src", to: "epi", teach: "The submission sets out the premium being ceded." },
          { from: "src", to: "profile", teach: "It sets out the shape of the portfolio." },
          { from: "src", to: "biz", teach: "It describes the business and how it is underwritten." },
          { from: "epi", to: "losses", label: "set against", teach: "Losses only mean something against the premium that produced them: hence loss ratios." },
          { from: "profile", to: "cat", label: "with", teach: "Size bands and catastrophe aggregates together describe the exposure in force today." },
          { from: "biz", to: "terms", label: "shapes", teach: "The kind of business shapes the structure the cedant asks for." },
          { from: "losses", to: "reader", teach: "The underwriter tests the history." },
          { from: "cat", to: "reader", teach: "It checks the exposure data." },
          { from: "terms", to: "reader", teach: "And it compares the terms requested with its own view." },
          { from: "reader", to: "price", label: "or else", teach: "What it can’t verify, it prices as uncertainty." }
        ]
      },
      think: { q: "A cedant’s submission shows premium growing by 35% in a year, with an unchanged history of loss ratios. What questions would you ask?", a: "Where has the growth come from: new territories, new classes, new distribution or larger lines? Is it rate increases or extra exposure, and at what prices? The loss history describes the old book, and may not describe the business now being ceded." },
      takeaways: [
        "A treaty underwriter relies on the submission, because individual policies can’t be inspected.",
        "A submission covers the cedant, the business, premium, the risk profile, losses, catastrophe exposure and the proposed terms.",
        "Underwriters test the data and look for changes the history doesn’t show; poor information is priced as uncertainty."
      ]
    },
    {
      title: "Assessing the cedant",
      minutes: 6,
      keys: ["Management", "Underwriting discipline", "Claims handling", "Continuity"],
      intro: "Under a treaty, the reinsurer accepts business it hasn’t selected, priced or handled, often for years. So it is backing the cedant’s people and processes as much as the portfolio. Work down both columns and see how they combine into a verdict.",
      diagram: {
        cols: 2,
        nodes: [
          {
            id: "mgmt", at: [1, 1], tone: "ink", label: "Management and strategy", sub: "Experience, stability, coherence",
            teach: "The experience and stability of the team, and whether the strategy is coherent and achievable. A new CEO promising rapid growth in unfamiliar classes is a very different proposition from a settled team doing what it has always done well."
          },
          {
            id: "fin", at: [1, 2], label: "Financial strength", sub: "Capital, ratings, reserves",
            teach: "Capital, ratings and reserves affect the cedant’s ability to meet its own share of losses and to pay its premiums. A weak cedant may also be tempted to cede more than it should."
          },
          {
            id: "uw", at: [2, 1], label: "Underwriting discipline", sub: "Guidelines, pricing, monitoring",
            teach: "Guidelines, authorities, pricing tools and rate monitoring, and **evidence they are followed**. Every cedant has guidelines; the question is whether they bend when a broker pushes."
          },
          {
            id: "align", at: [2, 2], tone: "brass", label: "Alignment", sub: "What the cedant keeps",
            teach: "How much of the risk the cedant keeps, and whether its commission rewards results rather than volume. A cedant keeping 50% of a quota share cares far more about its underwriting than one keeping 10%, whose result depends mainly on commission."
          },
          {
            id: "claims", at: [3, 1], label: "Claims handling", sub: "Reserving and settlements",
            teach: "Reserving practice, the speed and fairness of settlements, and the handling of large and complex claims. Remember that under a treaty the reinsurer will generally follow the cedant’s settlements, so poor claims handling flows straight through."
          },
          {
            id: "audit", at: [3, 2], label: "Meetings and audits", sub: "Does practice match the story?",
            teach: "Treaty underwriters meet their cedants regularly, often visiting before renewal, and many treaties give the reinsurer the right to inspect records. Claims and underwriting audits test whether the cedant’s practice matches its description of itself."
          },
          {
            id: "verdict", at: [4, 1], span: 2, tone: "tint", label: "Backing people, not just a portfolio", sub: "Support, change the terms, or decline",
            teach: "Put together, these give the reinsurer its view: support on the terms offered, support on different terms, or decline.",
            like: "Assessing a cedant is like choosing a fund run by someone else. Past returns matter, but so do the manager’s experience, process and integrity, and whether the manager has their own money in alongside yours."
          },
          {
            id: "cont", at: [5, 1], span: 2, tone: "good", label: "Continuity", sub: "Valued, but not at any price",
            teach: "Treaty reinsurance is a long-term relationship. A reinsurer that supports a cedant through a bad year expects to share in the good years that follow, and cedants value consistent support.\n\nBut continuity isn’t loyalty at any price. A reinsurer that ignores a deteriorating cedant for the sake of the relationship serves neither party."
          }
        ],
        edges: [
          { from: "mgmt", to: "uw", label: "sets", teach: "Management sets the underwriting culture and its limits." },
          { from: "uw", to: "claims", label: "and", teach: "Good underwriting is wasted if claims are handled poorly, and vice versa." },
          { from: "fin", to: "align", label: "allows", teach: "A strong cedant can afford to keep more of its own risk." },
          { from: "align", to: "audit", label: "checked in", teach: "Meetings and audits test whether incentives work as described." },
          { from: "claims", to: "verdict", label: "proves", teach: "Claims practice is where the cedant’s claims about itself are proven." },
          { from: "audit", to: "verdict", label: "tests", teach: "Audits feed directly into the reinsurer’s view." },
          { from: "verdict", to: "cont", label: "over years", teach: "A good relationship builds continuity, but it must be renewed on the evidence." }
        ]
      },
      think: { q: "Why might a reinsurer prefer a quota share under which the cedant keeps 50% to one under which it keeps only 10%, on the same commission terms?", a: "A cedant that keeps half the risk shares heavily in its own results, so its incentive to underwrite and settle claims carefully is much stronger. With only 10% kept, its result depends mainly on the commission it earns, which rewards volume." },
      takeaways: [
        "A treaty reinsurer backs the cedant’s people and processes as well as its portfolio.",
        "Reinsurers assess management, underwriting discipline, claims handling, financial strength and alignment.",
        "Meetings, inspection rights and audits test whether practice matches description.",
        "Continuity is valued, but should not mean supporting a deteriorating cedant regardless."
      ]
    },
    {
      title: "Pricing proportional treaties",
      minutes: 8,
      keys: ["Expected loss ratio", "Ceding commission", "Sliding scale", "Loss corridor"],
      intro: "A proportional reinsurer shares the cedant’s premium and losses, so it can’t set a rate in the usual way. Instead, the price is the ceding commission, plus features that adjust the reinsurer’s share of the result. Build the commission from the top row, then see the three ways it can be made to respond to results.",
      diagram: {
        cols: 3,
        nodes: [
          {
            id: "elr", at: [1, 1], tone: "ink", label: "Expected loss ratio", sub: "60%",
            teach: "The reinsurer projects the loss ratio much as a cedant plans its own: develop each past year to ultimate, on-level for rate changes, adjust for claims inflation, and allow separately for large and catastrophe losses. The result is an **expected loss ratio**, with a view of how widely the actual result might vary."
          },
          {
            id: "costs", at: [1, 2], label: "Reinsurer’s costs", sub: "About 5%",
            teach: "The reinsurer needs to cover its own brokerage and expenses: say 5% of premium."
          },
          {
            id: "margin", at: [1, 3], label: "Required margin", sub: "About 5%",
            teach: "And it needs a profit margin for the capital it commits: say another 5%."
          },
          {
            id: "comm", at: [2, 1], span: 3, tone: "tint", label: "Commission the treaty can bear", sub: "100% − 60% − 5% − 5% = 30%",
            teach: "Whatever is left can go back to the cedant as **ceding commission**: 100% − 60% − 5% − 5% = 30%. A cedant asking for 35% would leave the reinsurer expecting to lose money, unless its loss ratio projection is too pessimistic.\n\nSo every point of commission is really an argument about the loss ratio."
          },
          {
            id: "slide", at: [3, 1], label: "Sliding scale", sub: "Moves with the loss ratio",
            teach: "A **sliding scale** pays a provisional commission at the outset and adjusts it once results are known: higher if the loss ratio is low, lower if high, within a minimum and maximum. A typical scale pays 30% at a 60% loss ratio, moving one point for each point of loss ratio, between 25% and 35%. Try it in the first model."
          },
          {
            id: "pc", at: [3, 2], label: "Profit commission", sub: "A share of the profit",
            teach: "Alternatively, or as well, the treaty may pay a **profit commission**: a share, often 15% to 25%, of the reinsurer’s profit after an allowance for its expenses. Deficits from poor years are usually carried forward against later profits."
          },
          {
            id: "limits", at: [3, 3], tone: "bad", label: "Limits", sub: "Event limit, cap, corridor",
            teach: "Three features limit the reinsurer’s exposure. An **event limit** caps its share of any one catastrophe. A **loss ratio cap** limits its total losses, say to 150% of premium. A **loss corridor** makes the cedant keep all losses between two loss ratios, such as 70% and 80%, giving it a stake in moderately poor results. The second model shows a corridor at work."
          }
        ],
        edges: [
          { from: "elr", to: "comm", teach: "The expected losses come off first." },
          { from: "costs", to: "comm", teach: "Then the reinsurer’s costs." },
          { from: "margin", to: "comm", teach: "Then its margin; the rest is commission." },
          { from: "comm", to: "slide", label: "flexes", at: 0.75, teach: "A sliding scale makes the commission respond to the actual loss ratio." },
          { from: "comm", to: "pc", label: "adds", at: 0.75, teach: "A profit commission adds a share of any profit." },
          { from: "comm", to: "limits", label: "guards", at: 0.75, teach: "Limits stop a quota share becoming unlimited catastrophe cover." }
        ]
      },
      explore: ["sliding-scale", "loss-corridor"],
      think: { q: "A sliding scale pays 30% at a 60% loss ratio, moving one point for each point of loss ratio, between 25% and 35%. What commission is paid at a final loss ratio of 57%? And at 70%?", a: "At 57% the loss ratio is three points better than 60%, so the commission is 33%. At 70% the scale would give 20%, but the minimum is 25%, so 25% is paid." },
      takeaways: [
        "Proportional treaties are priced mainly through the ceding commission.",
        "The commission a treaty can bear is 100% less the expected loss ratio, the reinsurer’s expenses and its margin.",
        "Sliding scales and profit commissions link the cedant’s commission to results.",
        "Event limits, loss ratio caps and loss corridors limit the reinsurer’s exposure."
      ]
    },
    {
      title: "Pricing excess of loss: experience and exposure",
      minutes: 8,
      keys: ["Burning cost", "As-if losses", "Exposure curves", "Credibility"],
      intro: "An excess of loss layer pays only the part of each loss inside it, so its price depends on how often losses reach it and how big they are when they do. Reinsurers estimate that two ways, one from the past and one from the present. Follow both columns down to where they meet.",
      diagram: {
        cols: 2,
        nodes: [
          {
            id: "layer", at: [1, 1], span: 2, tone: "ink", label: "A £10m xs £5m layer", sub: "What should it cost?",
            teach: "Our layer pays losses between £5m and £15m on a cedant writing about £48m of premium. We need its expected cost, as a rate on that premium."
          },
          {
            id: "exp", at: [2, 1], label: "Experience rating", sub: "From past losses",
            teach: "**Experience rating** asks: what would this layer have cost if it had been in place in each past year? It works well with plenty of relevant history; it struggles when the layer is high and rarely touched, when the portfolio has changed, or when one exceptional year dominates.",
            like: "Experience rating is like estimating next winter’s heating bill from the last five winters’ bills."
          },
          {
            id: "expo", at: [2, 2], label: "Exposure rating", sub: "From today’s policies",
            teach: "**Exposure rating** starts from the business in force now. Using the risk profile, it estimates how much of each band’s expected loss would fall into the layer. Because it doesn’t depend on past losses, it is especially useful for high layers and changed portfolios.",
            like: "Exposure rating is like estimating it from the size of the house, its insulation and the boiler. If the house has just doubled in size, this method will be closer."
          },
          {
            id: "asif", at: [3, 1], label: "As-if losses", sub: "Restated at today’s values",
            teach: "Each past large loss is adjusted to today’s values for **claims inflation**, and developed for any further growth expected in its estimate. These **as-if** losses are applied to the layer.\n\nNotice what inflation does at the retention: a loss of £4.8m five years ago may be a £6m loss today, piercing a £5m retention it never touched. The model shows this leverage."
          },
          {
            id: "curves", at: [3, 2], label: "Curves and ILFs", sub: "Applied to the risk profile",
            teach: "For property, reinsurers use **exposure curves**, which describe how losses are distributed as a share of the sum insured. For liability they use **increased limit factors**, which describe how the expected cost of cover rises with the limit."
          },
          {
            id: "burn", at: [4, 1], label: "Burning cost", sub: "e.g. 3.2% of premium",
            teach: "Each year’s as-if losses to the layer are divided by that year’s premium, also restated to today’s level. The average is the **burning cost**: say £7m of losses over £220m of premium, 3.2%. Loaded for expenses and margin, often by dividing by 0.7 or 0.8, it gives a rate of about 4.0% to 4.6%."
          },
          {
            id: "expcost", at: [4, 2], label: "Exposure cost", sub: "Expected loss in the layer",
            teach: "The exposure method produces its own estimate of the layer’s expected loss from today’s profile. It gives a positive cost even for a layer that has never been touched, which is exactly right: a clean record may just be luck."
          },
          {
            id: "cred", at: [5, 1], span: 2, tone: "tint", label: "A credibility-weighted price", sub: "Two views, one decision",
            teach: "The underwriter or actuary compares the two. If experience is much worse than exposure suggests, the cedant may be selecting poor risks or the curves may be unsuitable. If it is much better, the history may simply have been fortunate. The final price combines the two, weighted by the **credibility** of each."
          }
        ],
        edges: [
          { from: "layer", to: "exp", label: "look back", teach: "One route looks at the cedant’s own past losses." },
          { from: "layer", to: "expo", label: "look now", teach: "The other looks at what is insured today." },
          { from: "exp", to: "asif", label: "restate", teach: "Old losses must be restated to today’s money before they mean anything." },
          { from: "expo", to: "curves", label: "apply", teach: "Curves or limit factors turn the risk profile into an expected layer loss." },
          { from: "asif", to: "burn", label: "average", teach: "As-if layer losses over on-levelled premium give the burning cost." },
          { from: "curves", to: "expcost", label: "sum", teach: "Summing across the profile gives the exposure cost." },
          { from: "burn", to: "cred", teach: "Experience brings the cedant’s actual record." },
          { from: "expcost", to: "cred", teach: "Exposure brings today’s book and the market’s wider knowledge." }
        ]
      },
      explore: "burning-cost",
      think: { q: "No loss has touched a layer in ten years, so its burning cost is zero. Why would a reinsurer still charge a significant premium?", a: "A clean record doesn’t mean the layer can’t be hit; it may reflect good fortune, or a portfolio too small to have produced a loss yet. Exposure rating, based on the limits and sums insured now in force, will show a positive expected loss, and the reinsurer must also be paid for the capital it holds against the layer." },
      takeaways: [
        "Experience rating restates past losses at today’s values and applies them to the layer; the burning cost is their average share of premium.",
        "Exposure rating applies exposure curves or increased limit factors to the current risk profile.",
        "Final prices combine both methods according to their credibility."
      ]
    },
    {
      title: "Pricing catastrophe excess of loss",
      minutes: 8,
      keys: ["Catastrophe models", "Expected loss", "Multiples", "Rate on line"],
      intro: "Major catastrophes are rare, so a cedant’s own history is a poor guide to the cost of catastrophe cover. Pricing relies instead on models. Follow the exposure data down through the model to a price, and notice how capital, not expected loss, drives the price of the highest layers.",
      diagram: {
        cols: 2,
        gapX: 66,
        nodes: [
          {
            id: "data", at: [1, 1], span: 2, tone: "ink", label: "Exposure data", sub: "Locations, values, construction",
            teach: "The cedant’s exposure data, meaning the locations, values and characteristics of the properties it insures, is the raw material.\n\nBe aware: a cedant whose data is incomplete or out of date will find reinsurers substituting their own, more cautious assumptions. Better data is one of the most effective ways to cut the cost of catastrophe reinsurance."
          },
          {
            id: "model", at: [2, 1], span: 2, label: "Catastrophe model", sub: "Tens of thousands of simulated years",
            teach: "The data is run through one or more **catastrophe models**, which simulate tens of thousands of years of possible hurricanes, earthquakes and floods and estimate the cedant’s loss from each. Applying the layer’s terms to every simulated loss gives the layer’s whole range of outcomes."
          },
          {
            id: "el", at: [3, 1], label: "Expected loss", sub: "The average annual cost",
            teach: "The layer’s **expected loss** is its average annual cost across all the simulated years. A lower £50m layer might have an expected loss of £6m, 12% of its limit; an upper £100m layer perhaps £1.5m, 1.5% of its limit."
          },
          {
            id: "dist", at: [3, 2], label: "The distribution", sub: "How bad it can get",
            teach: "The model also shows the full distribution: how often the layer is hit at all, and how often it is wiped out. For a high layer, the answer is “rarely, but completely”."
          },
          {
            id: "mult", at: [4, 1], tone: "tint", label: "The multiple", sub: "Premium ÷ expected loss",
            teach: "Premium is considerably higher than expected loss. The ratio is the **multiple**. Our lower layer, priced at twice its expected loss, costs £12m, a rate on line of 24%. The upper layer at four times its expected loss costs £6m, a rate on line of 6%: cheaper in pounds, but far dearer relative to its expected claims."
          },
          {
            id: "capital", at: [4, 2], label: "Capital", sub: "Held against a total loss",
            teach: "Why the higher multiple at the top? Because a top layer, when it is hit, is likely to be hit in full, so the reinsurer must hold capital against the whole limit. Most of a top layer’s premium pays for that capital rather than for expected claims."
          },
          {
            id: "price", at: [5, 1], tone: "good", label: "Price and rate on line", sub: "Including reinstatements",
            teach: "Prices are quoted as a **rate on line**, premium divided by limit, and compared with similar programmes in the market. Most cat layers include reinstatements, often one at 100%, and the reinsurer allows for the expected reinstatement premium: a loss brings in extra premium as well as a claim."
          },
          {
            id: "judge", at: [5, 2], label: "Judgement", sub: "On the model",
            teach: "Models have known limits. They may miss perils, or the inflation in rebuilding costs after a major event, or weaknesses in the cedant’s data. Underwriters adjust the modelled results for unmodelled perils, data quality and their own view of the risk."
          }
        ],
        edges: [
          { from: "data", to: "model", label: "fed into", teach: "The exposure data drives the model; poor data, poor output." },
          { from: "model", to: "el", label: "average", teach: "Averaging the layer’s loss over all simulated years gives its expected loss." },
          { from: "model", to: "dist", label: "spread", teach: "The spread of outcomes shows how volatile the layer is." },
          { from: "el", to: "mult", label: "× multiple", teach: "Expected loss times the multiple gives the premium." },
          { from: "dist", to: "capital", label: "drives", teach: "The worse the tail, the more capital the reinsurer must hold." },
          { from: "capital", to: "mult", label: "raises", teach: "More capital per pound of expected loss means a higher multiple." },
          { from: "mult", to: "price", label: "gives", teach: "The result is the premium, often expressed as rate on line." },
          { from: "judge", to: "price", label: "adjusts", teach: "Underwriters adjust the modelled price for what the model can’t see." }
        ]
      },
      explore: "ep-layer",
      think: { q: "Why is the multiple of premium to expected loss usually higher for a top layer than for a bottom layer?", a: "A top layer is rarely hit, so its expected loss is small, but when it is hit the loss is likely to be total. The reinsurer must hold capital against that full loss, so most of the premium pays for the capital rather than for the expected claims." },
      takeaways: [
        "Catastrophe layers are priced mainly from catastrophe models, not the cedant’s history.",
        "The model gives the layer’s expected loss and the distribution of possible outcomes.",
        "Premium exceeds expected loss by a multiple reflecting the capital the layer consumes.",
        "Underwriters adjust modelled results for unmodelled perils, data quality and judgement."
      ]
    },
    {
      title: "The treaty wording",
      minutes: 7,
      keys: ["Ultimate net loss", "Follow the settlements", "Claims co-operation", "Run-off or clean cut"],
      intro: "The wording is the contract between cedant and reinsurer, and because the reinsurer follows the business for years, it matters as much as the price. The clauses fall into three families. Read down each column, and notice that most disputes happen at the bottom.",
      diagram: {
        cols: 3,
        nodes: [
          {
            id: "wording", at: [1, 1], span: 3, tone: "ink", label: "The treaty wording", sub: "Cover, claims, money and the end",
            teach: "The wording decides what is covered, how losses are measured, how money moves and how disputes are resolved.\n\nBe aware: wordings are sometimes agreed in haste at the end of a busy renewal. Contract certainty requires the wording, not just the main terms, to be agreed before inception.",
            like: "A treaty wording is like a long-term partnership agreement. The headline split of profits matters, but most disagreements come later, over details: what counts as partnership business, who decides on large expenses, and what happens when one partner wants to leave."
          },
          {
            id: "cover", at: [2, 1], label: "The cover", sub: "Business, exclusions",
            teach: "**Business covered**: the classes, territories and types of policy, and the basis of attachment, risks attaching or losses occurring. **Exclusions**: nuclear, war, communicable disease, certain cyber exposures. **Inuring reinsurance**: other cover, such as a quota share, that must be deducted before this treaty responds."
          },
          {
            id: "claims", at: [2, 2], label: "Claims clauses", sub: "Notice and payment",
            teach: "**Claims notification** requires prompt notice of losses that may affect the treaty, often once a loss reaches a set share of the retention. A **cash call** lets the cedant demand immediate payment of a large loss rather than waiting for the quarterly accounts."
          },
          {
            id: "money", at: [2, 3], label: "Money", sub: "Accounts and reinstatements",
            teach: "**Premium and accounts** clauses set how deposit premiums, adjustments and claims are accounted for and settled, usually quarterly. **Reinstatement** clauses say how cover is restored after a loss, and at what price."
          },
          {
            id: "unl", at: [3, 1], label: "Ultimate net loss", sub: "What the retention applies to",
            teach: "**Ultimate net loss** is the cedant’s loss after recoveries and salvage, including or excluding defence costs as the wording says. It is the figure the retention and limit apply to, so its definition directly moves money."
          },
          {
            id: "follow", at: [3, 2], tone: "tint", label: "Follow the settlements", sub: "If honest and businesslike",
            teach: "The reinsurer agrees to **follow the cedant’s settlement** of claims, provided the claim falls within the original policy and the reinsurance, and was settled honestly and in a proper and businesslike way. It is the clause that makes treaty reinsurance workable."
          },
          {
            id: "end", at: [3, 3], label: "Run-off or clean cut", sub: "After the treaty expires",
            teach: "On a **run-off** basis, the reinsurer stays liable after expiry for losses on policies already written. On a **clean cut** basis, those liabilities pass to the next treaty in exchange for a **portfolio transfer** of premium and reserves."
          },
          {
            id: "hours", at: [4, 1], tone: "brass", label: "Loss occurrence", sub: "The hours clause",
            teach: "The **loss occurrence** and **hours clause** define what counts as one event for catastrophe cover, such as all windstorm losses within 72 consecutive hours. Each event carries its own retention and limit, so this definition can move millions. Try it in the model."
          },
          {
            id: "coop", at: [4, 2], label: "Co-operation or control", sub: "Say on big claims",
            teach: "**Claims co-operation** gives the reinsurer the right to be consulted on significant claims; **claims control** lets it take them over. Both are exceptions to simply following the cedant."
          },
          {
            id: "term", at: [4, 3], label: "Special termination", sub: "Downgrade, insolvency, sale",
            teach: "**Special termination** lets either side end the treaty early if, for example, the other is downgraded, becomes insolvent or changes ownership. **Disputes** are usually referred to arbitration, often in London under English law."
          }
        ],
        edges: [
          { from: "wording", to: "cover", teach: "One family of clauses defines the cover." },
          { from: "wording", to: "claims", teach: "Another governs claims." },
          { from: "wording", to: "money", teach: "A third deals with money and the end of the treaty." },
          { from: "cover", to: "unl", label: "measured as", teach: "Covered losses are measured as ultimate net loss." },
          { from: "unl", to: "hours", label: "per event", teach: "For catastrophe covers, losses are added up per event, as the hours clause defines." },
          { from: "claims", to: "follow", label: "follow", teach: "Claims settled properly by the cedant bind the reinsurer." },
          { from: "follow", to: "coop", label: "unless", teach: "For big claims, the reinsurer may have a say, or control." },
          { from: "money", to: "end", label: "and at the end", teach: "The wording must say what happens to liabilities after expiry." },
          { from: "end", to: "term", label: "or early", teach: "And when the treaty can end before its time." }
        ]
      },
      explore: "hours-clause",
      takeaways: [
        "The wording decides what is covered, how losses are measured, how money moves and how disputes are resolved.",
        "Key definitions include the business covered, exclusions, ultimate net loss and the loss occurrence clause.",
        "Claims clauses include follow the settlements, notification, co-operation or control, and cash calls.",
        "Termination clauses decide whether liabilities run off or pass to the next treaty."
      ]
    },
    {
      title: "The renewal season",
      minutes: 6,
      keys: ["1 January", "Quotes", "Firm order terms", "Catastrophe budgets"],
      intro: "Most treaties renew each year on fixed dates, which gives the reinsurance market a strong seasonal rhythm. The busiest is 1 January. Follow the path through the second half of the year, snaking across the page, to the moment the treaties incept.",
      diagram: {
        cols: 2,
        gapX: 56,
        nodes: [
          {
            id: "summer", at: [1, 1], tone: "ink", label: "Summer", sub: "Review the expiring programme",
            teach: "Preparations for 1 January begin in the summer, when cedants and brokers review the expiring programme: what worked, what was too expensive, what has changed in the business."
          },
          {
            id: "monte", at: [1, 2], label: "Monte Carlo", sub: "September",
            teach: "In September the industry gathers at the **Rendezvous de Septembre** in Monte Carlo. Cedants, brokers and reinsurers discuss market conditions and early views on pricing, mostly in back-to-back meetings."
          },
          {
            id: "baden", at: [2, 2], label: "Baden-Baden", sub: "October",
            teach: "In October the reinsurance meeting in **Baden-Baden** follows, with a European focus. By now the tone of the renewal, hardening or softening, is usually clear."
          },
          {
            id: "subs", at: [2, 1], label: "Submissions", sub: "Autumn",
            teach: "Submissions are issued during the autumn. Reinsurers read them for change, as you saw in lesson 1, and model the catastrophe exposure."
          },
          {
            id: "quotes", at: [3, 1], label: "Quotes", sub: "November and December",
            teach: "The broker invites selected reinsurers to **quote**: to propose terms, including the price, for some or all of the layers. The cedant chooses the quote it prefers."
          },
          {
            id: "fot", at: [3, 2], tone: "tint", label: "Firm order terms", sub: "The chosen price",
            teach: "The broker then issues **firm order terms** to the market: the price and conditions the cedant will accept, usually based on the chosen quote."
          },
          {
            id: "lines", at: [4, 2], label: "Written lines", sub: "Shares on those terms",
            teach: "Reinsurers respond with **written lines**. A reinsurer’s line depends on the price against its own technical price, its appetite for the cedant and class, and its capacity. For catastrophe layers, capacity is limited by its **catastrophe budget** for each peril and region: a line on a Florida layer competes with every other Florida layer it writes.\n\nSome programmes are placed on **differential terms**, different prices for different reinsurers on the same layer. It is controversial, because it undermines the principle of one contract and one price."
          },
          {
            id: "sign", at: [4, 1], label: "Signed down", sub: "Each layer at 100%",
            teach: "As in the direct market, a programme that attracts more support than it needs is **oversubscribed**, and the lines are signed down so each layer is placed at exactly 100%."
          },
          {
            id: "jan", at: [5, 1], span: 2, tone: "good", label: "1 January", sub: "Treaties incept, signed and agreed",
            teach: "Terms and wordings must be agreed and signed before the treaties incept. Then the cycle moves on: 1 April for Japan, 1 June for Florida, 1 July for Australia and parts of the US.",
            like: "The 1 January renewal is like the January transfer window in football. Clubs plan for months, negotiations intensify as the deadline nears, and everything must be signed before the window closes. Clubs that leave it to the last day often pay more or miss out."
          }
        ],
        edges: [
          { from: "summer", to: "monte", teach: "Planning leads into the first big market meeting." },
          { from: "monte", to: "baden", teach: "Early views on pricing firm up through the autumn meetings." },
          { from: "baden", to: "subs", teach: "Submissions go out to reinsurers." },
          { from: "subs", to: "quotes", label: "then", teach: "Reinsurers analyse them and quote." },
          { from: "quotes", to: "fot", teach: "The cedant picks a quote, and the broker issues firm order terms." },
          { from: "fot", to: "lines", label: "then", teach: "The market responds with written lines on those terms." },
          { from: "lines", to: "sign", teach: "Oversubscribed layers are signed down to 100%." },
          { from: "sign", to: "jan", label: "by", teach: "Everything must be complete before inception." }
        ]
      },
      takeaways: [
        "Most treaties renew on fixed dates, and 1 January is the largest renewal.",
        "Meetings in Monte Carlo and Baden-Baden set the tone for the 1 January renewal.",
        "The broker obtains quotes, issues firm order terms and collects written lines, signed down if oversubscribed.",
        "A reinsurer’s line depends on price, appetite and its catastrophe budget for each peril and region."
      ]
    },
    {
      title: "Treaty claims, run-off and commutation",
      minutes: 7,
      keys: ["Cash calls", "Event estimates", "Aggregation", "Commutation"],
      intro: "Treaty claims arrive in two very different ways: steadily through the accounts, or suddenly after a catastrophe. Follow the steady stream down the left to the ways long-tail liabilities are finally settled, and the sudden one down the right to the arguments it can start.",
      diagram: {
        cols: 2,
        gapX: 60,
        nodes: [
          {
            id: "acc", at: [1, 1], tone: "ink", label: "Quarterly accounts", sub: "Most claims arrive here",
            teach: "Most treaty claims come through the regular accounts, in which the cedant reports the premiums and losses ceded each quarter, and the balance is settled."
          },
          {
            id: "cat", at: [1, 2], tone: "bad", label: "A catastrophe", sub: "Notified within days",
            teach: "Large losses and catastrophes are notified individually, often within days of the event, and may be paid at once under a **cash call** clause."
          },
          {
            id: "runoff", at: [2, 1], label: "Run-off", sub: "Late claims for years",
            teach: "Treaties written on a run-off basis leave the reinsurer exposed to late claims for many years, especially in long-tail casualty classes. Both sides carry uncertainty, administration and capital for a contract that ended long ago."
          },
          {
            id: "est", at: [2, 2], label: "Event estimates", sub: "Revised many times",
            teach: "After a catastrophe, reinsurers need loss estimates quickly for their capital and reporting, long before cedants know their final figures. They combine industry loss estimates, model output and early cedant information. Initial estimates are often revised many times, and the final cost may not be known for years."
          },
          {
            id: "comm", at: [3, 1], tone: "good", label: "Commutation", sub: "One payment, a clean break",
            teach: "A **commutation** is a single payment, agreed between the parties, in full settlement of all future liabilities under the treaty. The cedant gets certainty and cash now; the reinsurer is released from future uncertainty and administration. The model shows how interest rates and risk shape the price.",
            like: "A commutation is like settling a long-running maintenance contract with a single payment. Each side gives up the chance that the other would have paid more over time, in exchange for certainty and a clean break."
          },
          {
            id: "aggr", at: [3, 2], tone: "brass", label: "Aggregation disputes", sub: "One event or several?",
            teach: "Many treaty disputes concern **aggregation**: whether a series of losses arose from one event or several. If a flood outlasts the hours clause, or one cause produces claims under many policies, the answer can move millions between cedant and reinsurer, because each event carries its own retention and limit."
          },
          {
            id: "lpt", at: [4, 1], label: "Loss portfolio transfer", sub: "A whole book moved",
            teach: "Insurers can transfer whole books of past liabilities to specialist legacy reinsurers. A **loss portfolio transfer** moves existing reserves to a reinsurer for a premium. Lloyd’s transfer of 1992 and prior liabilities into Equitas is one of the best-known deals of this kind."
          },
          {
            id: "adc", at: [4, 2], label: "Adverse development cover", sub: "If reserves prove short",
            teach: "An **adverse development cover** protects the cedant if its reserves for past years prove insufficient: the reinsurer pays deterioration above an agreed point. The cedant keeps the claims, but caps its downside."
          }
        ],
        edges: [
          { from: "acc", to: "runoff", label: "long tail", teach: "Long-tail treaties keep producing claims through the accounts for years." },
          { from: "runoff", to: "comm", label: "ended by", teach: "A commutation can end the run-off with one payment." },
          { from: "comm", to: "lpt", label: "or, for a book", teach: "For a whole book of liabilities, a loss portfolio transfer does the same job at scale." },
          { from: "lpt", to: "adc", label: "or instead", teach: "Or the cedant keeps the book but buys protection against it getting worse." },
          { from: "cat", to: "est", label: "triggers", teach: "A catastrophe triggers rapid, repeated loss estimates." },
          { from: "est", to: "aggr", label: "then", teach: "As claims settle, the number of events becomes the battleground." }
        ]
      },
      explore: "commutation",
      think: { q: "Why might a reinsurer agree to commute a casualty treaty for more than its own best estimate of the remaining claims?", a: "Commutation removes the risk that claims develop worse than expected, frees the capital held against the treaty and ends the cost of administering it. The reinsurer may judge those benefits worth more than the difference between the payment and its best estimate." },
      takeaways: [
        "Most treaty claims arrive in quarterly accounts; large losses are notified individually and may be cash-called.",
        "After a catastrophe, reinsurers estimate losses quickly from market data, models and cedants’ reports.",
        "Aggregation disputes decide how many events, and so how many retentions and limits, apply.",
        "Commutations, loss portfolio transfers and adverse development covers deal with long-tail liabilities."
      ]
    },
    {
      title: "Managing a reinsurance portfolio",
      minutes: 6,
      keys: ["Catastrophe budgets", "Balance", "Retrocession", "Security"],
      intro: "A reinsurer is an insurer of insurers, and it manages its own book with the same tools you will meet in portfolio management, adapted to much more concentrated risk. Start with its capital, follow the two ways it is spent, and see what ends up determining the capacity it can offer.",
      diagram: {
        cols: 2,
        nodes: [
          {
            id: "cap", at: [1, 1], span: 2, tone: "ink", label: "The reinsurer’s capital", sub: "Finite, and shared by every line",
            teach: "Every line a reinsurer writes consumes some of the same finite capital. Managing a reinsurance portfolio is deciding where that capital earns the best return for the risk."
          },
          {
            id: "budget", at: [2, 1], label: "Catastrophe budgets", sub: "Per peril and region",
            teach: "A property catastrophe reinsurer allocates capital as **catastrophe budgets**: limits on the modelled loss it will accept from each peril and region at chosen return periods. During renewals, underwriters track how much of each budget their lines consume.",
            like: "Managing catastrophe budgets is like an airline allocating seats on its busiest routes. Each route has a fixed number of seats, the popular flights fill first, and the airline must decide which customers and fares deserve the space."
          },
          {
            id: "balance", at: [2, 2], label: "Balance", sub: "Property and casualty, short and long",
            teach: "Reinsurers seek a balance of property and casualty, short-tail and long-tail, proportional and non-proportional, across many territories. Proportional business offers steadier premium and thinner margins; catastrophe XL offers higher margins with far more volatility."
          },
          {
            id: "peak", at: [3, 1], tone: "bad", label: "Peak zones", sub: "US hurricane, Japan quake",
            teach: "Budgets bind hardest in **peak zones** such as US hurricane and Japanese earthquake, where everyone wants capacity. The most attractive layers compete for the limited budget available there."
          },
          {
            id: "cas", at: [3, 2], label: "Casualty treaties", sub: "Income now, reserve risk later",
            teach: "Casualty treaties generate investment income from reserves held for years, but carry the risk that those reserves prove inadequate, as social inflation has shown."
          },
          {
            id: "retro", at: [4, 1], label: "Retrocession", sub: "Protects the peaks",
            teach: "Reinsurers buy **retrocession** to cut their peak exposures and protect their capital. The retro market is smaller and more volatile, and leans heavily on alternative capital. When retro became scarce and expensive after the heavy catastrophe losses of the years to 2022, reinsurers offered less catastrophe capacity to their own cedants."
          },
          {
            id: "sec", at: [4, 2], label: "Security", sub: "Ratings and collateral",
            teach: "Cedants care whether their reinsurer can pay, sometimes decades later. Most set minimum ratings, limit their exposure to any one reinsurer, and require collateral from unrated reinsurers and alternative capital. Financial strength is a commercial asset as well as a regulatory requirement."
          },
          {
            id: "capacity", at: [5, 1], span: 2, tone: "good", label: "Capacity offered to cedants", sub: "What the market can actually buy",
            teach: "Put it together: how much catastrophe capacity a reinsurer can offer depends on its capital, its budgets, the cost of its own retrocession and the confidence of its cedants. That is why reinsurance prices move so sharply after big losses."
          }
        ],
        edges: [
          { from: "cap", to: "budget", label: "allocated as", teach: "Capital for catastrophe risk is rationed through budgets." },
          { from: "cap", to: "balance", label: "spread for", teach: "Capital is spread across classes to diversify." },
          { from: "budget", to: "peak", label: "tightest in", teach: "The budgets bite in the zones everyone wants to write." },
          { from: "balance", to: "cas", label: "includes", teach: "Casualty balances property, with its own risks." },
          { from: "peak", to: "retro", label: "protected by", teach: "Retrocession takes the edge off the peaks." },
          { from: "cas", to: "sec", label: "relies on", teach: "Long-tail business means cedants rely on the reinsurer’s strength for decades." },
          { from: "retro", to: "capacity", label: "expands", teach: "Affordable retro lets the reinsurer offer more capacity." },
          { from: "sec", to: "capacity", label: "wins", teach: "Strong security wins the lines cedants most want to place." }
        ]
      },
      takeaways: [
        "Reinsurers allocate capital through catastrophe budgets for each peril and region.",
        "They balance property and casualty, short-tail and long-tail, proportional and non-proportional business.",
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
