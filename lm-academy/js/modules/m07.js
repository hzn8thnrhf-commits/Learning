/* The Slip — Reinsurance */
window.SLIP_DATA = window.SLIP_DATA || {};
(window.SLIP_DATA.modules = window.SLIP_DATA.modules || []).push({
  id: "m07",
  title: "Reinsurance",
  short: "Re­insurance",
  blurb: "Insurance for insurers: why it is bought, the main forms of cover, how programmes are built and where the capital comes from.",
  outcomes: [
    "Explain why insurers buy reinsurance and the relationship it creates between cedant, reinsurer and policyholder.",
    "Distinguish facultative from treaty reinsurance, and proportional from non-proportional cover.",
    "Calculate recoveries under quota share, surplus and excess of loss arrangements.",
    "Describe how catastrophe programmes, reinstatements and hours clauses work.",
    "Describe the main forms of alternative capital, including catastrophe bonds.",
    "Explain how a cedant designs a reinsurance programme to fit its risk appetite."
  ],
  lessons: [
    {
      title: "Why insurers buy reinsurance",
      minutes: 6,
      keys: ["Cedant", "Capacity", "Capital relief", "Retrocession"],
      body: [
        "Reinsurance is insurance for insurance companies. An insurer that has accepted more risk than it wishes to keep passes part of that risk to another insurer, the **reinsurer**, in return for a share of the premium. The insurer passing on the risk is called the **cedant**, or ceding company, and the risk it passes on is said to be **ceded**. Reinsurers protect themselves in the same way, through reinsurance of their own known as **retrocession**.",
        "The original policyholder is not normally a party to the reinsurance contract and has no direct rights against the reinsurer. If a reinsurer fails, the cedant must still pay its policyholders in full. Reinsurance is therefore a contract between insurers, and the cedant bears the credit risk of its reinsurers.",
        { h: "Why insurers buy it" },
        {
          terms: [
            ["Capacity", "Reinsurance allows an insurer to accept larger risks than its own capital could support, by ceding the part it does not wish to keep."],
            ["Catastrophe protection", "It protects the insurer against the accumulation of many losses from a single event, such as a hurricane or an earthquake."],
            ["Stability", "It smooths results from year to year, so that one large loss or a bad year does not wipe out the insurer’s profits."],
            ["Capital relief", "It reduces the capital the insurer must hold, because less risk remains on its balance sheet."],
            ["Expertise", "Reinsurers bring knowledge of pricing, wordings and new classes, which helps cedants to enter new markets."]
          ]
        },
        { fig: "reins-chain" },
        { analogy: "A bakery receives an order for a 2,000-slice wedding cake. It could bake the whole cake itself, but if anything goes wrong the loss would be ruinous, so it subcontracts part of the order to a larger bakery. The couple deals only with the first bakery, but the risk is shared behind the scenes." },
        "London is one of the world’s principal reinsurance centres, alongside Bermuda, Zurich and Munich. Lloyd’s, taken as a whole, is one of the largest reinsurers in the world, and the London company market includes branches and subsidiaries of most of the major global reinsurers.",
        { think: { q: "A small insurer could raise more capital instead of buying reinsurance. Why might reinsurance be the better choice?", a: "Raising capital is slow, expensive and permanent, whereas reinsurance can be bought for the particular risks that need it, adjusted every year and spread across many reinsurers. For many insurers, renting capital through reinsurance is cheaper than owning it." } }
      ],
      takeaways: [
        "Reinsurance transfers part of a cedant’s risk to a reinsurer in return for part of the premium.",
        "Policyholders have no direct rights against the reinsurer, and the cedant bears the reinsurers’ credit risk.",
        "Insurers buy reinsurance for capacity, catastrophe protection, stability, capital relief and expertise.",
        "Reinsurers protect themselves through retrocession."
      ]
    },
    {
      title: "Treaty and facultative",
      minutes: 6,
      keys: ["Facultative", "Treaty", "Obligatory", "Facultative obligatory"],
      body: [
        "Reinsurance can be arranged one risk at a time or for a whole portfolio. The two methods are called facultative and treaty reinsurance, and most insurers use both.",
        {
          terms: [
            ["Facultative", "Reinsurance of a single risk, negotiated individually. Each party has the ‘faculty’ to choose: the cedant need not offer the risk, and the reinsurer need not accept it."],
            ["Treaty", "An agreement covering a defined portfolio, such as all of an insurer’s property business in Germany for a year. Every risk within its scope is ceded automatically, and the reinsurer cannot decline individual risks."]
          ]
        },
        "Because a treaty is automatic and obligatory on both sides, the reinsurer depends entirely on the cedant’s underwriting. A treaty reinsurer is backing a portfolio and the people who build it, which is why treaty underwriting places so much emphasis on assessing the cedant.",
        "Facultative reinsurance is used for risks that fall outside the treaties because they are too large, too hazardous, or of a kind the treaties exclude. It can also protect a treaty, by removing an unusual risk that would otherwise distort it. A facultative reinsurer underwrites each risk much as a direct underwriter would, examining the survey, the loss history and the terms.",
        "Between the two lies the **facultative obligatory** treaty, under which the cedant may choose which risks to cede but the reinsurer must accept them. It gives the cedant flexibility, but leaves the reinsurer exposed to selection against it, and reinsurers write it with care.",
        {
          table: {
            head: ["", "Facultative", "Treaty"],
            rows: [
              ["Scope", "One risk", "A defined portfolio"],
              ["Choice", "Both parties choose each risk", "Automatic once agreed"],
              ["What the reinsurer assesses", "The individual risk", "The cedant and its portfolio"],
              ["Administration", "Risk by risk", "Periodic accounts"],
              ["Typical use", "Large, unusual or excluded risks", "The main protection for a class"]
            ]
          }
        },
        { analogy: "Facultative reinsurance is buying a ticket for a single match. Treaty reinsurance is a season ticket: you commit at the start, and every match in the season is included without a separate decision." }
      ],
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
      body: [
        "Under proportional reinsurance the reinsurer takes an agreed share of each risk, receives the same share of its premium and pays the same share of every claim. Because the cedant has already paid the costs of acquiring the business, the reinsurer returns part of the premium to it as a **ceding commission**. The two main forms are quota share and surplus.",
        { h: "Quota share" },
        "Under a **quota share** the cedant cedes a fixed percentage of every policy within the treaty. A 40% quota share sends 40% of all premium to the reinsurer and recovers 40% of all claims, large or small.",
        { example: { title: "A quota share in figures", text: "An insurer writes £50m of premium and incurs £30m of claims. Under a 40% quota share it cedes £20m of premium and recovers £12m of claims. The reinsurer pays a ceding commission of, say, 30% of the ceded premium, which is £6m, towards the insurer’s acquisition and running costs." } },
        "Quota shares are simple to administer and provide substantial capital relief, which makes them popular with growing insurers, new ventures and MGAs’ carriers. Their limitation is that they leave the shape of the net portfolio unchanged: the cedant keeps a smaller copy of the same book, including its share of every catastrophe, and gives away part of the profit on its best business. Most quota shares therefore carry an event limit and sit alongside excess of loss protection.",
        { analogy: "A quota share is like a business partner who invests 40% and takes 40% of every sale and 40% of every bill. However large or small the order, the split is the same." },
        { h: "Surplus" },
        "Under a **surplus** treaty the cedant keeps a fixed amount on each risk, its **retention** or **line**, and cedes the surplus above that amount, up to a stated number of lines. The share ceded therefore varies from risk to risk, while premium and claims on each risk are shared in the same proportion as the sum insured.",
        { example: { title: "A surplus treaty in figures", text: "The retention is £2m and the treaty has nine lines, giving £18m of capacity above the retention. On a £10m risk the cedant keeps £2m (20%) and cedes £8m (80%), so it receives 20% of the premium and pays 20% of any claim. On a £1m risk it keeps everything. A £25m risk exceeds the £20m total capacity, so the cedant must arrange facultative cover for the remaining £5m or decline the risk." } },
        { fig: "surplus-split" },
        "Surplus treaties are used mainly for property, where sums insured vary widely. They make the net portfolio more even, because the cedant keeps no more than its line on any risk while keeping small risks entirely. Many cedants vary their retention by type of risk through a **table of limits**, keeping more on good risks and less on hazardous ones.",
        { think: { q: "Under a surplus treaty with a £3m retention and ten lines, how is a £15m risk shared, and what share of a £6m claim does the reinsurer pay?", a: "The cedant keeps £3m, which is 20% of the risk, and cedes £12m, which is 80% (within the treaty’s £30m capacity). The reinsurer pays 80% of the £6m claim, which is £4.8m." } }
      ],
      takeaways: [
        "Proportional reinsurance shares premium and claims in the same proportion, with a ceding commission returned to the cedant.",
        "A quota share cedes a fixed percentage of every policy and provides simple capital relief.",
        "A surplus treaty cedes the part of each risk above the cedant’s retention, up to a number of lines.",
        "Surplus treaties even out the net portfolio; quota shares leave its shape unchanged."
      ]
    },
    {
      title: "Excess of loss",
      minutes: 8,
      keys: ["Excess of loss", "Retention", "Per risk and catastrophe", "Rate on line"],
      body: [
        "Under non-proportional reinsurance the reinsurer pays only when a loss exceeds a threshold. The most common form is **excess of loss (XL)**, which protects the cedant against the part of a loss above its **retention**, up to a stated limit. Unlike proportional reinsurance, it changes the shape of the net portfolio by cutting off the largest losses.",
        "An excess of loss layer is described as its limit in excess of (xs) its retention, so a layer of £10m xs £5m pays losses between £5m and £15m. The cedant pays the first £5m of each loss itself, the reinsurer pays the next £10m, and anything above £15m falls back on the cedant unless it has bought a further layer.",
        { example: { title: "Recoveries under a £10m xs £5m layer", text: "A £3m loss falls within the retention, so the reinsurer pays nothing. A £12m loss produces a recovery of £7m (£12m − £5m). A £20m loss exhausts the layer: the reinsurer pays its full limit of £10m, and the cedant bears its £5m retention plus the £5m above the layer." } },
        { fig: "three-ways" },
        { h: "Forms of excess of loss" },
        {
          terms: [
            ["Per risk excess of loss", "Responds when the loss on a single risk exceeds the retention, such as a fire at one factory."],
            ["Catastrophe excess of loss", "Responds when the total of losses from one event, such as a hurricane, exceeds the retention."],
            ["Aggregate excess of loss or stop loss", "Responds when the total of losses over a year exceeds a threshold, often expressed as a loss ratio."]
          ]
        },
        { h: "How excess of loss is priced" },
        "Excess of loss premium is usually calculated as a rate applied to the cedant’s premium income on the protected business, known as the **subject premium**. A **minimum and deposit premium** is paid in instalments during the year and adjusted once the actual premium income is known. The price is often compared using the **rate on line**, the premium divided by the limit: a £10m layer costing £1.5m has a rate on line of 15%. Low layers, which are hit often, carry high rates on line; high layers, which are rarely hit, carry low ones.",
        { analogy: "An excess of loss layer works like the excess on a car policy turned inside out. You pay the first slice of any claim yourself; the reinsurer pays the middle slice, up to a cap; and if the claim is larger still, the top slice is yours again unless you have bought another layer." },
        { lab: "tower", text: "Watch a catastrophe loss climb a reinsurance programme in the Layer tower." }
      ],
      takeaways: [
        "Excess of loss pays the part of a loss above the retention, up to the limit, and cuts off the largest losses.",
        "Per risk covers respond to single risks, catastrophe covers to events, and stop loss covers to annual totals.",
        "Premium is usually a rate on the subject premium, with a minimum and deposit premium adjusted later.",
        "Rate on line is the premium divided by the limit."
      ]
    },
    {
      title: "Programmes, reinstatements and renewals",
      minutes: 8,
      keys: ["Layers and towers", "Reinstatements", "Hours clause", "Renewal dates"],
      body: [
        "Insurers rarely buy a single layer of catastrophe cover. Instead they build a **programme**, or tower, of layers stacked one above another, such as £50m xs £50m, £100m xs £100m and £200m xs £200m. Each layer is placed separately, often with a different panel of reinsurers who take shares of it in the same way that underwriters share a risk on a London slip.",
        { fig: "xl-tower" },
        { h: "Reinstatements" },
        "A layer’s limit is used up by the losses it pays. **Reinstatement** restores the limit so that the layer can respond to a further event in the same year. A layer with one reinstatement at 100% can pay its full limit twice; after the first loss, the cedant pays an additional premium to reinstate the cover, usually in proportion to the amount of limit used.",
        { example: { title: "A reinstatement premium", text: "A £20m xs £20m layer costs £2m. A hurricane uses £8m of its limit. With one reinstatement at 100%, pro rata as to amount, the cedant pays £2m × (8 ÷ 20) = £0.8m to restore the full £20m for the rest of the year." } },
        { h: "Defining an event" },
        "Because a catastrophe layer responds to each event separately, the treaty must define what counts as one event. An **hours clause** does this by grouping all losses from a given peril within a set period, typically 72 consecutive hours for windstorm and longer for flood, with the cedant usually allowed to choose when the period begins. Each event bears its own retention, so the definition can make a large difference to recoveries.",
        { analogy: "An hours clause is like a single call-out charge at a garage: everything fixed within the agreed window counts as one job with one fee, however many faults are mentioned." },
        { h: "The renewal calendar" },
        {
          table: {
            head: ["Date", "What renews"],
            rows: [
              ["1 January", "The largest renewal: Europe and much of the rest of the world, including many global programmes"],
              ["1 April", "Japan, together with Korea and India"],
              ["1 June", "Florida, ahead of the hurricane season"],
              ["1 July", "Australia, New Zealand and parts of the United States"]
            ]
          }
        },
        { think: { q: "A cedant’s £100m xs £100m layer has one reinstatement at 100%. Two hurricanes in the same year each cause £150m of losses. How much does the layer pay in total?", a: "Each event exceeds the £100m retention by £50m, so each produces a £50m recovery from the layer. After the first, the cedant reinstates the £50m of limit used, so the layer pays £100m in total across the two events, and the cedant pays a reinstatement premium for the limit restored." } }
      ],
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
      body: [
        "Not all reinsurance capital comes from insurance companies. Since the 1990s, investors such as pension funds and specialist funds have increasingly taken on insurance risk directly, through **insurance-linked securities (ILS)** and related structures. They are attracted by returns that are largely independent of stock and bond markets, and their capital now forms a significant part of the catastrophe reinsurance market.",
        {
          terms: [
            ["Catastrophe bond", "A bond whose investors lose some or all of their principal if a defined catastrophe occurs. Otherwise they receive a coupon and the return of their principal at maturity."],
            ["Collateralised reinsurance", "Reinsurance fully backed by funds held in trust for the cedant, which removes most of the credit risk."],
            ["Sidecar", "A vehicle funded by investors that takes a quota share of a reinsurer’s portfolio for a limited period."],
            ["Industry loss warranty", "Pays when the whole industry’s loss from an event exceeds a trigger, rather than the buyer’s own loss."],
            ["Parametric cover", "Pays a fixed amount when a measurable parameter, such as wind speed or earthquake magnitude, reaches a stated level."]
          ]
        },
        { fig: "cat-bond" },
        "London has developed its own framework for these structures. Lloyd’s established **London Bridge Risk PCC**, an insurance special purpose vehicle through which investors can provide capital to Lloyd’s syndicates in separate cells.",
        { analogy: "A catastrophe bond is like a loan with a weather condition attached. Investors collect interest while the skies stay calm. If a large enough storm strikes a defined area, they lose some or all of the loan, and that money pays the insurer’s claims." },
        { aware: "Triggers other than the cedant’s own loss create **basis risk**: the chance that the cover pays less than the cedant’s actual loss, or pays when the cedant has suffered little. Parametric and industry-loss covers trade basis risk for speed and simplicity." }
      ],
      takeaways: [
        "Insurance-linked securities bring capital-markets investors into reinsurance.",
        "Catastrophe bonds pay investors a coupon unless a defined catastrophe occurs.",
        "Collateralised structures remove most credit risk because the funds are held in trust.",
        "Parametric and industry-loss triggers pay on measured events and carry basis risk."
      ]
    },
    {
      title: "Designing a reinsurance programme",
      minutes: 8,
      keys: ["Gross exposure", "Retention", "Order of cover", "Value for money"],
      body: [
        "A cedant’s reinsurance programme is not a collection of separate purchases but a single design, intended to shape the business’s net risk to fit its risk appetite at a reasonable cost. Designing it is one of the most important decisions in an insurer’s year, and is usually led by the chief underwriting officer with the support of actuaries and reinsurance brokers.",
        { h: "Understanding the gross risk" },
        "The design starts with the gross portfolio: the largest individual risks and how they are distributed, the frequency and size of large losses, and the catastrophe exposure, summarised in an EP curve for each peril. Brokers’ analytics teams model how different structures would change the net results across thousands of simulated years.",
        { h: "Choosing retentions" },
        "The **retention** is the amount of each loss the cedant is prepared to pay itself. It is set by reference to the cedant’s capital and earnings: a common guide is that no single risk loss, and no catastrophe below a chosen return period, should cost more than a set proportion of the year’s expected profit or of capital. Larger insurers can afford higher retentions; smaller insurers need lower ones.",
        { h: "Choosing limits" },
        "The limit of the catastrophe programme determines how extreme an event the cedant is protected against. Many insurers buy cover up to at least their modelled 1-in-200-year loss, the standard used for regulatory capital, and some buy to a higher return period to satisfy rating agencies or their own appetite. Per risk covers are bought up to the largest line the cedant writes.",
        { h: "Putting the pieces in order" },
        "A typical property programme combines several covers that respond in sequence. A surplus treaty first reduces large risks to the cedant’s line; a per risk excess of loss then protects the retained line against large single losses; and a catastrophe programme protects the net account against events. Because each cover inures to the benefit of the next, the order in which they apply must be stated precisely in each wording.",
        { fig: "programme" },
        { h: "Is it worth it?" },
        "Each element is tested for value. The **net cost** of the reinsurance, meaning the premium less the expected recoveries, is compared with the capital it releases and the volatility it removes. Covers that cost more than they save may be dropped or restructured, while gaps that leave the business outside its risk appetite must be filled. Cedants also consider the security of the reinsurance panel and the value of long-term relationships.",
        { analogy: "Designing a reinsurance programme is like designing flood defences for a town. Engineers first map how high the water could rise, then decide how much flooding the town can tolerate, and finally build walls, pumps and barriers that work together, checking that each one earns its cost." },
        { think: { q: "Why might a cedant choose to raise its catastrophe retention after several years of profitable growth?", a: "As its capital and earnings have grown, it can absorb larger losses itself. Raising the retention reduces the cost of reinsurance, because the reinsurers no longer pay the more frequent lower losses, and the money saved improves the cedant’s expected result while volatility stays within appetite." } }
      ],
      takeaways: [
        "A reinsurance programme is a single design that shapes net risk to fit the risk appetite.",
        "Retentions are set by reference to capital and earnings; limits by return period, regulation and rating needs.",
        "Covers respond in a stated order, such as surplus, then per risk excess of loss, then catastrophe cover.",
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
