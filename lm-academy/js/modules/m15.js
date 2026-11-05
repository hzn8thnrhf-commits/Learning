/* The Slip — MGAs and multiple carriers */
window.SLIP_DATA = window.SLIP_DATA || {};
(window.SLIP_DATA.modules = window.SLIP_DATA.modules || []).push({
  id: "m15",
  title: "MGAs and multiple carriers",
  short: "MGAs",
  blurb: "How a managing general agent builds, plans and manages a book of business on capacity from several carriers.",
  outcomes: [
    "Explain how a managing general agent earns its income and what it costs to run.",
    "Describe the main sources of capacity and what carriers expect before they will provide it.",
    "Compare ways of structuring capacity from several carriers, including panels, splits and fronting.",
    "Build an MGA business plan and show how the same plan looks to the MGA and to each carrier.",
    "Calculate commission and profit commission, including the effect of a deficit carried forward.",
    "Explain how an MGA manages its portfolio, reporting and oversight across a panel of carriers."
  ],
  lessons: [
    {
      title: "The MGA business model",
      minutes: 6,
      keys: ["Delegated authority", "Commission", "Profit commission", "Fixed costs"],
      body: [
        "A **managing general agent (MGA)** is an underwriting business that does not carry insurance risk on its own balance sheet. Instead, it holds delegated authority from one or more insurers, known as **carriers** or **capacity providers**, to underwrite and bind policies on their behalf. The carriers provide the capital and pay the claims; the MGA provides the underwriting expertise, the relationships with brokers and the day-to-day administration. In the Lloyd’s market an MGA that holds a binding authority is called a **coverholder**, but the economics are the same whether the capacity comes from a Lloyd’s syndicate or from an insurance company.",
        "MGAs tend to grow up around specialist expertise. A team of underwriters who know a niche well, such as contractors’ liability in Texas, private collections of fine art or cyber cover for small firms, can often build a better book as an MGA than inside a large insurer. An MGA can move quickly, invest in technology for a single product and serve brokers whom a large insurer would find uneconomic to reach.",
        { h: "Where the money comes from" },
        {
          terms: [
            ["Commission", "The MGA’s main income: a percentage of the gross premium, deducted before the premium is paid to the carrier. Part of it is usually passed on to the broker that introduced the business."],
            ["Profit commission", "A share of the carrier’s underwriting profit, paid if the business performs better than an agreed threshold. It rewards good underwriting rather than volume."],
            ["Fees", "Policy or administration fees charged to clients where local rules allow, and fees for services such as claims handling."]
          ]
        },
        { h: "Where the money goes" },
        "Against that income the MGA must pay its underwriters and support staff, its technology and data costs, compliance and audit costs, premises, and often a third-party administrator to handle claims. Because commission is earned as a percentage of premium while most of these costs are fixed, an MGA’s profit is highly sensitive to volume. A book that falls short of its premium target can turn a profitable MGA into a loss-making one, even if every policy it writes is sound.",
        { fig: "mga-model" },
        { analogy: "An MGA is like an architectural practice designing buildings for developers who supply the money. The architects are judged on whether the buildings stand up and sell, but it is the developers’ capital that is at stake. A good practice wins repeat work from the same developers; a careless one soon finds that nobody will fund its designs." },
        { aware: "Because the carrier bears the losses, an MGA paid only by commission has an incentive to grow premium even when prices are inadequate. Much of the structure of a well-designed MGA arrangement, from profit commission to audit rights, exists to counter that incentive." },
        { think: { q: "An MGA writes £20m of premium at a commission of 25%, and passes 10 percentage points of that to the producing brokers. Its running costs are £2.2m. What is its operating profit before any profit commission?", a: "The MGA keeps 25% − 10% = 15% of £20m, which is £3.0m. After running costs of £2.2m, it makes £0.8m before any profit commission." } }
      ],
      takeaways: [
        "An MGA underwrites on behalf of carriers that provide the capital and pay the claims.",
        "Its income is mainly commission on premium, with profit commission and fees on top.",
        "Its costs are largely fixed, so its profit depends heavily on premium volume.",
        "A well-designed arrangement aligns the MGA’s incentives with the carrier’s profit."
      ]
    },
    {
      title: "Finding capacity",
      minutes: 6,
      keys: ["Lloyd’s syndicates", "Company paper", "Fronting", "Due diligence"],
      body: [
        "Capacity is the lifeblood of an MGA. Without a carrier willing to stand behind its policies, an MGA has nothing to sell. Securing capacity is therefore its first and most important commercial task, and keeping capacity requires a continuing relationship rather than a single negotiation.",
        { h: "Sources of capacity" },
        {
          terms: [
            ["Lloyd’s syndicates", "Grant binding authorities to approved coverholders. The MGA gains access to Lloyd’s licences and ratings, and must meet Lloyd’s standards for delegated authority."],
            ["Insurance companies", "London company market insurers and overseas insurers provide their own policy paper, usually through a binding authority or an agency agreement."],
            ["Fronting carriers", "Licensed insurers that issue the policies but pass most of the risk to reinsurers, in return for a fronting fee. The model is particularly common in the United States."],
            ["Reinsurers and other capital", "Increasingly provide the risk capital behind fronted programmes, sometimes on multi-year terms, and include investors using insurance-linked structures."]
          ]
        },
        "Each source has its own strengths. Lloyd’s offers a strong brand and very wide licensing; a company carrier may offer a simpler structure and its own rating; a fronting arrangement can give access to a broad panel of reinsurers and to specific licences in individual US states.",
        { h: "What carriers look for" },
        "Before providing capacity, a carrier carries out **due diligence**. It wants to understand the underwriting team’s track record, ideally supported by several years of loss data from a previous carrier; the business plan and the reasons for choosing the target market; the MGA’s systems, data quality and controls; its governance, compliance arrangements and financial resources; and how the MGA will be paid, in particular whether it will share in the results.",
        "A carrier is, in effect, making an investment decision. It expects a return on the capital it puts behind the MGA’s business, and it will compare that opportunity with other uses of the same capital, including writing similar business through its own underwriters.",
        { analogy: "Pitching for capacity is like a chef looking for backers for a new restaurant. The backers taste the food, but they also look at the chef’s previous restaurants, the business plan, the suppliers and who will keep the books. Talent alone rarely secures the money; talent with a credible plan and a track record usually does." },
        { note: "Capacity agreements usually run for twelve months and are renewed annually, with notice periods for either side. Some MGAs negotiate multi-year commitments for stability, often in exchange for tighter performance conditions or a share of the risk." },
        { aware: "Capacity can disappear quickly. After poor results elsewhere in its account, a change of strategy or a hardening market, a carrier may give notice even when the MGA’s own book is profitable. Dependence on a single carrier is the most common threat to the survival of a young MGA." }
      ],
      takeaways: [
        "Capacity can come from Lloyd’s syndicates, insurance companies, fronting carriers, or reinsurers and other capital.",
        "Carriers carry out due diligence on the team, the plan, the data, the controls and the alignment of interest.",
        "A carrier treats capacity as an investment and expects a return on its capital.",
        "Dependence on one carrier is a serious risk, so most MGAs aim to have more than one source of capacity."
      ]
    },
    {
      title: "Structuring capacity from several carriers",
      minutes: 7,
      keys: ["Panels", "Horizontal and vertical splits", "Fronting fees", "Resilience"],
      body: [
        "As an MGA grows, it usually wants more than one carrier. Several carriers can support a larger book, reduce the damage if one of them withdraws, and bring different appetites, ratings or licences. The question is how to arrange them. There are four common structures, and many MGAs use a combination of them.",
        { h: "A panel on one binder" },
        "The simplest multi-carrier structure is a **panel**, in which several carriers share every risk in fixed proportions, just as underwriters share a risk on a London slip. One carrier, the **lead**, agrees the terms of the binder and the others follow. If the panel is 40% Carrier A, 35% Carrier B and 25% Carrier C, every policy is written in those shares and every claim is paid in the same proportions.",
        { fig: "mga-panel" },
        "A panel keeps administration simple and treats the carriers equally, because none of them can be given better or worse risks than the others. Its weakness is rigidity: if one carrier wants to reduce its share or leave, the whole panel has to be rearranged.",
        { h: "Splitting the book" },
        "Alternatively, the book can be divided so that different carriers support different parts of it. A **horizontal split** divides the business by segment: one carrier for property and another for liability, for example, or one carrier for each country. A **vertical split** divides each risk by layer, so that one carrier writes the primary layer and another the excess. Splits let each carrier take the business it likes best, but they create more binders to manage and can tempt the MGA to steer the best risks towards the carrier that pays it most.",
        { h: "Fronting" },
        "In a **fronted** structure, a single licensed insurer issues all the policies, so that clients and brokers see one recognised name. The fronting insurer then passes most or all of the risk to one or more reinsurers through a quota share, and charges a **fronting fee**, typically a few per cent of premium, for the use of its licence, rating and administration. Because the fronting insurer remains liable to policyholders if a reinsurer fails, it takes a close interest in the reinsurers’ financial strength and often requires them to post collateral.",
        { fig: "fronting" },
        { h: "Building resilience" },
        "Many MGAs combine these structures: a core panel on the main binder, a separate carrier for a new product, and a reinsurance-backed fronted programme for a particular country. The aim is resilience. A useful test is whether the MGA could survive the loss of its largest carrier at the next renewal.",
        { analogy: "A panel is like a syndicated loan, in which every bank lends the same share of every pound. A split is more like a shopping centre, where each tenant takes the units that suit it. Fronting resembles a franchise that trades under one famous name while the money behind each outlet comes from others." },
        { think: { q: "Why might a carrier prefer to sit on a panel rather than take a horizontal split of the same MGA’s business?", a: "On a panel the carrier receives exactly the same share of every risk as the other carriers, so it cannot be given a worse selection of business. With a split it depends on the MGA allocating risks fairly, and it carries a more concentrated exposure to one segment." } }
      ],
      takeaways: [
        "A panel shares every risk among carriers in fixed proportions, with one carrier leading.",
        "A horizontal split divides the book by segment; a vertical split divides each risk by layer.",
        "Fronting puts every policy on one licensed insurer, which reinsures most of the risk in return for a fee.",
        "A good structure would survive the loss of the largest carrier."
      ]
    },
    {
      title: "The MGA business plan",
      minutes: 8,
      keys: ["Premium plan", "Loss ratio plan", "Carrier view", "Sensitivities"],
      body: [
        "An MGA’s business plan has two audiences. Internally, it sets targets for premium, profit and investment. Externally, it is the document on which carriers decide whether to provide capacity, and how much. A plan that persuades carriers must show not only that the MGA will make money, but that the carriers will too.",
        { h: "Building the premium plan" },
        "The premium plan is built product by product and, where relevant, territory by territory. For each segment the MGA estimates how much expiring business it will renew, by applying a **retention rate**, and adjusts that figure for the expected **rate change** and **exposure change**. It then adds new business, estimated from its pipeline and its relationships with brokers. The resulting volumes should be checked against the size of each market and a realistic share of it.",
        { h: "The loss ratio plan" },
        "For each segment the MGA projects an expected loss ratio. The usual starting point is the historical loss ratio for each underwriting year, developed to its expected ultimate value, adjusted for the rate changes made since that year was written and for claims inflation. Carriers scrutinise this figure more closely than any other, because the loss ratio drives their profit. A credible plan shows how the figure was derived and how it compares with past years.",
        { h: "Two views of the same plan" },
        "The same premium produces two different profit and loss accounts. In the MGA’s account, commission and fees are income and operating costs are expenses. In the carrier’s account, premium is income, and commission, claims, the carrier’s own expenses and any reinsurance are costs. The table shows both views of a £20m book.",
        { fig: "mga-premium" },
        {
          table: {
            head: ["Item", "MGA view", "Carrier view"],
            rows: [
              ["Gross written premium", "Collected for the carrier", "£20.0m income"],
              ["Broker commission (10%)", "Passed to brokers", "£2.0m cost"],
              ["MGA commission (18%)", "£3.6m income", "£3.6m cost"],
              ["Claims at a 55% loss ratio", "Not its cost", "£11.0m cost"],
              ["Carrier expenses (5%)", "Not its cost", "£1.0m cost"],
              ["MGA running costs", "£2.4m cost", "Not its cost"],
              ["Underwriting result", "£1.2m profit", "£2.4m profit"]
            ]
          }
        },
        { example: { title: "Allocating the plan to carriers", text: "If the £20m book is written by a panel of Carrier A at 40%, Carrier B at 35% and Carrier C at 25%, each carrier’s plan has the same shape but a different size. Carrier A expects £8m of premium and an underwriting profit of £0.96m, Carrier B £7m and £0.84m, and Carrier C £5m and £0.60m. Each carrier will compare its expected profit with the capital it must hold to support its share." } },
        { h: "Testing the plan" },
        "A good plan includes sensitivities. What happens to each party if the loss ratio is five points worse than expected, or if premium is 20% below plan? Because the MGA’s costs are largely fixed, a shortfall in premium hurts the MGA most; because the carrier pays the claims, a deterioration in the loss ratio hurts the carrier most. Showing both effects makes the plan more credible, not less.",
        { think: { q: "In the example, the loss ratio deteriorates from 55% to 60%. What happens to the carrier’s underwriting profit, and to the MGA’s?", a: "Claims rise by £1m (5% of £20m), so the carrier’s profit falls from £2.4m to £1.4m. The MGA’s profit is unchanged at £1.2m before profit commission, although any profit commission it hoped to earn will fall." } }
      ],
      takeaways: [
        "The MGA’s plan is both an internal budget and the case for carriers to provide capacity.",
        "Premium is built from renewals, rate and exposure change, and new business, segment by segment.",
        "The same plan gives an MGA view, driven by commission and costs, and a carrier view, driven by the loss ratio.",
        "Sensitivities show how each party is affected if premium or the loss ratio misses plan."
      ]
    },
    {
      title: "Binder economics",
      minutes: 8,
      keys: ["Commission", "Sliding scale", "Profit commission", "Deficit carried forward"],
      body: [
        "The binding authority agreement turns the business plan into contractual terms. Besides the scope of the authority itself, meaning the classes, territories, limits, rates and wordings, the binder sets out how the MGA is paid. The way that remuneration is structured does much to determine how the MGA behaves.",
        { h: "Commission" },
        "The MGA receives a **commission** expressed as a percentage of gross premium. It normally has to cover both the MGA’s own costs and the commission it pays to producing brokers, so binders often state an overall allowance for acquisition costs as well as the MGA’s own share. Commission is usually fixed, but some binders use a **sliding scale**, under which commission rises as the loss ratio falls, between an agreed minimum and maximum.",
        { h: "Profit commission" },
        "A **profit commission** pays the MGA a share of the carrier’s profit on the business, usually calculated for each underwriting year once its results are reasonably mature. A typical formula is set out below.",
        { example: { title: "A typical profit commission formula", text: "Profit = earned premium − commission − incurred claims − the carrier’s management allowance. Profit commission = the agreed percentage × profit, paid only if the profit is positive." } },
        "Because profit can be measured only once claims have developed, profit commission is usually calculated two or three years after the underwriting year begins and then adjusted as claims settle. Payments made too early can turn out to be overpayments, so binders often provide for provisional payments that are adjusted later, or simply postpone payment until the year is mature.",
        { h: "Deficit carried forward" },
        "To prevent an MGA being rewarded for a good year that follows a bad one, many binders include a **deficit carried forward** clause. A loss in one year must be recovered from the profits of later years before any further profit commission is paid. Some agreements carry a deficit forward for a limited number of years; others carry it forward indefinitely.",
        { fig: "mga-pc" },
        { example: { title: "Three years with a deficit", text: "Profit commission is 20% of profit. Year 1 makes a profit of £1.0m, so the MGA receives £0.2m. Year 2 makes a loss of £0.6m, so no profit commission is paid and the deficit is carried forward. Year 3 makes a profit of £1.5m, but £0.6m of that must first offset the deficit, so profit commission is 20% of £0.9m, which is £0.18m." } },
        { h: "Other terms that matter" },
        {
          terms: [
            ["Minimum or target premium", "A level of premium the MGA is expected to reach, sometimes with consequences if it falls short."],
            ["Claims authority", "Whether the MGA or its claims administrator may settle claims, and up to what amount without referral to the carrier."],
            ["Premium settlement", "How quickly premium collected must be paid to the carrier, usually within a set number of days after each month or quarter end."],
            ["Termination and run-off", "Notice periods, rights to terminate for cause, and who services the policies and claims after the binder ends."]
          ]
        },
        { aware: "A high commission with no profit commission rewards volume; a lower commission with a generous profit commission rewards results. Carriers increasingly favour the second, and MGAs that are confident in their underwriting often prefer it too." }
      ],
      takeaways: [
        "The binder sets out the MGA’s remuneration as well as the scope of its authority.",
        "Commission pays for the MGA’s costs and the brokers’ commission; a sliding scale links it to results.",
        "Profit commission shares the carrier’s profit, calculated once each year’s results are mature.",
        "A deficit carried forward clause means a loss must be recovered before later profits earn profit commission."
      ]
    },
    {
      title: "Alignment of interest",
      minutes: 6,
      keys: ["Volume versus profit", "Risk participation", "Equity stakes", "Fair allocation"],
      body: [
        "The central tension in any MGA arrangement is that the MGA writes the business but the carrier pays the claims. If the MGA is paid mainly according to volume, it may be tempted to write more business than the market can support at adequate prices. Carriers have learned, sometimes expensively, that alignment of interest has to be designed into the relationship from the start.",
        { h: "Tools for alignment" },
        {
          terms: [
            ["Profit commission", "Ties part of the MGA’s income to underwriting profit, as described in the previous lesson."],
            ["Deferred or contingent commission", "Holds back part of the commission until the results are known, or reduces it if results are poor."],
            ["Risk participation", "The MGA takes a share of the risk itself, often through a captive or a related reinsurance vehicle that writes a quota share of the binder."],
            ["Equity", "A carrier or investor takes a stake in the MGA, sharing in its long-term value as well as its annual results."],
            ["Performance conditions", "Agreed thresholds, such as a maximum loss ratio, beyond which the carrier may review or end the arrangement."]
          ]
        },
        "**Risk participation** is the strongest form of alignment, because the MGA loses money directly when claims are high. It requires capital, however, and turns the MGA into a risk carrier, with the regulatory and financial obligations that brings.",
        { analogy: "Alignment of interest is like a ship’s captain who owns part of the cargo. A captain paid only for each voyage might sail through a storm to save a day; a captain with a stake in the cargo thinks harder about whether it arrives safely." },
        { h: "Treating every carrier fairly" },
        "Where carriers sit on separate binders, the MGA must allocate business fairly and in line with the agreed rules. Steering the better risks towards the carrier that pays the higher commission, or towards a vehicle in which the MGA participates, would breach the trust on which the arrangement depends, and could breach contractual and regulatory obligations. Clear allocation rules, recorded and open to audit, protect the MGA as much as its carriers.",
        { think: { q: "An MGA is offered either 28% commission with no profit commission, or 23% commission plus 25% profit commission. It expects a 50% loss ratio on £10m of premium, and the carrier’s management allowance is 5% of premium. Which option pays more?", a: "Under the second option, profit = £10m − £2.3m commission − £5.0m claims − £0.5m allowance = £2.2m, so profit commission is £0.55m. Total income is £2.3m + £0.55m = £2.85m, against £2.8m under the first option. The second option pays slightly more if the 50% loss ratio is achieved, and considerably less if it is not." } }
      ],
      takeaways: [
        "The MGA writes the business while the carrier pays the claims, so incentives must be aligned by design.",
        "Profit commission, deferred commission, risk participation and equity are the main tools.",
        "Risk participation aligns interests most strongly, but brings capital and regulatory obligations.",
        "Business must be allocated between carriers fairly, under clear rules that can be audited."
      ]
    },
    {
      title: "Managing a portfolio across carriers",
      minutes: 8,
      keys: ["Policy-level data", "Carrier limits", "Business reviews", "Audits"],
      body: [
        "Once capacity is in place, the MGA’s task is to manage the book so that it performs for every carrier. This is portfolio management of the kind described in the previous module, with an additional layer: the MGA must be able to show each carrier, separately, how its share of the business is performing and whether the agreed limits are being respected.",
        { h: "Knowing the book" },
        "The foundation is data. For every policy the MGA must record which carriers are on risk and in what shares, together with the exposure details the carriers need: location, sum insured or limit, occupation, deductibles and premium. These data feed the **bordereaux** sent to carriers, usually monthly, as well as the MGA’s own management information.",
        { h: "Limits that apply carrier by carrier" },
        "Each binder sets limits, and where there are several carriers those limits may differ. Typical examples are a maximum line on any one risk, a maximum aggregate exposure in a catastrophe zone, a cap on total premium, and restrictions on particular occupations or territories. The MGA must monitor every limit for every carrier. A catastrophe aggregate illustrates the point: if Carrier A allows £50m of exposure in coastal Florida for its share and holds 40% of a panel, the panel as a whole cannot exceed £125m in that zone without breaching Carrier A’s limit.",
        { h: "Reporting to carriers" },
        "Beyond bordereaux, carriers expect regular management information: premium against plan, rate change achieved, the retention of renewals, loss ratios by underwriting year, large losses, and any breaches or referrals. Most relationships include a **quarterly business review**, at which the MGA and each carrier discuss performance, market conditions and any changes to the plan.",
        { fig: "oversight-loop" },
        { h: "Audit and oversight" },
        "Carriers are responsible for business written in their name, so they audit their MGAs. Audits typically test that risks were written within the authority, that premiums were rated correctly, that claims were handled properly, that customers were treated fairly and that money was handled as the agreement requires. In the Lloyd’s market, managing agents must follow Lloyd’s requirements for delegated authority, which include the approval of coverholders and regular oversight of them.",
        { aware: "Breaches of authority are taken seriously. Writing a risk outside the binder, even with the best of intentions, can leave the carrier exposed to a loss it never agreed to accept, and can lead to the binder being terminated. Referral rules exist so that unusual risks are seen by the carrier before they are bound." },
        { think: { q: "A panel has two carriers: Carrier A at 60%, with a flood aggregate of £30m for its share, and Carrier B at 40%, with a flood aggregate of £24m for its share. What is the most the panel can write in the flood zone?", a: "Carrier A’s limit allows the panel to write £30m ÷ 0.6 = £50m. Carrier B’s limit allows £24m ÷ 0.4 = £60m. The tighter limit governs, so the panel can write no more than £50m in the zone." } }
      ],
      takeaways: [
        "The MGA must record, for every policy, which carriers are on risk and in what shares.",
        "Every binder limit must be monitored for every carrier, and on a panel the tightest limit governs.",
        "Carriers expect bordereaux, management information and regular business reviews.",
        "Audits test that business was written within authority and that customers were treated fairly."
      ]
    },
    {
      title: "Renewal, growth and exit",
      minutes: 6,
      keys: ["Renewal", "Adding carriers", "Run-off", "Durable earnings"],
      body: [
        "MGA arrangements are renewed every year, and the renewal is where the relationship is tested. The carrier reviews the year’s results, the quality of the MGA’s data and controls, and its own appetite and capital. The MGA, for its part, considers whether the carrier’s terms, service and commitment still suit its plans.",
        { h: "The renewal" },
        "A good renewal begins months before the binder expires. The MGA presents updated results, an explanation of any adverse developments, the plan for the coming year and any changes it wants, such as new products, higher limits or better commission. The carrier may respond with changes of its own: tighter limits, rate requirements, a smaller share or new reporting obligations.",
        { h: "Growing the panel" },
        "Growth often means adding carriers. A new carrier may join an existing panel, take a share of a new product or support a new territory. Each addition brings due diligence, onboarding, new reporting and new limits, so MGAs usually prefer to grow by deepening their relationships with a small number of committed carriers rather than by adding many small lines.",
        { h: "When capacity is withdrawn" },
        "If a carrier gives notice, the MGA must replace that capacity before the binder ends or stop writing the corresponding share of the business. The carrier’s obligations do not end at expiry. Policies already bound remain on risk until they expire, and claims must be handled until they are settled, often for several years. The binder should therefore state who will service the **run-off**, and on what terms.",
        { h: "What makes an MGA valuable" },
        "For owners and investors, the value of an MGA rests on the durability of its earnings: a record of underwriting profit, diversified and committed capacity, strong broker relationships, good data and systems, and a team that will stay. An MGA whose income depends on the goodwill of one carrier, or on one underwriter, is worth much less than one with resilient capacity and a proven book.",
        { analogy: "Renewing capacity is like renewing a lease. A tenant who has paid on time, looked after the building and kept the landlord informed can usually renew, often on better terms. A tenant who has surprised the landlord with problems finds the terms harder, or the door closed." }
      ],
      takeaways: [
        "Each renewal reviews the results, data, controls and appetite of both parties.",
        "MGAs grow most safely by deepening relationships with a few committed carriers.",
        "When capacity ends, policies and claims run off, and the binder should say who services them.",
        "An MGA’s value rests on profitable results and resilient, diversified capacity."
      ]
    }
  ],
  quiz: [
    {
      q: "What distinguishes a managing general agent from an insurer?",
      options: [
        "It underwrites on behalf of carriers that carry the risk on their own balance sheets",
        "It only sells personal lines insurance",
        "It is regulated by Lloyd’s instead of the FCA",
        "It never handles claims"
      ],
      answer: 0,
      why: "The MGA provides underwriting expertise and administration; the carriers provide the capital and pay the claims."
    },
    {
      q: "An MGA writes £15m of premium at 25% commission and pays brokers 10% of premium. Its running costs are £1.8m. What is its operating profit before profit commission?",
      options: ["£0.45m", "£1.95m", "£2.25m", "£3.75m"],
      answer: 0,
      why: "It keeps 15% of £15m, which is £2.25m. After £1.8m of costs, its profit is £0.45m."
    },
    {
      q: "On a panel of three carriers, how are risks shared?",
      options: [
        "Each carrier takes whole risks in rotation",
        "Every risk is shared in the same fixed proportions",
        "The lead carrier takes every risk and reinsures the others",
        "Each carrier writes a different class of business"
      ],
      answer: 1,
      why: "A panel works like a London slip: every risk and every claim is shared in the agreed proportions."
    },
    {
      q: "What does a fronting carrier provide?",
      options: [
        "Its licence, rating and policy paper, while passing most of the risk to reinsurers",
        "Claims handling only",
        "Equity capital in the MGA",
        "Broking services"
      ],
      answer: 0,
      why: "The fronting insurer issues the policies and remains liable to policyholders, but reinsures most of the risk in return for a fronting fee."
    },
    {
      q: "Profit commission is 20%, with deficits carried forward. Year 1 makes £2m profit, Year 2 a £1m loss and Year 3 a £1.5m profit. What profit commission is paid for Year 3?",
      options: ["£0.1m", "£0.2m", "£0.3m", "£0.5m"],
      answer: 0,
      why: "Year 3’s £1.5m profit must first absorb the £1m deficit from Year 2, leaving £0.5m. Twenty per cent of £0.5m is £0.1m."
    },
    {
      q: "Which arrangement aligns an MGA’s interests with its carrier’s most directly?",
      options: ["A higher fixed commission", "The MGA taking a share of the risk itself", "Monthly bordereaux", "A longer notice period"],
      answer: 1,
      why: "If the MGA bears part of the risk, it loses money directly when claims are high."
    },
    {
      q: "Carrier A holds 40% of a panel and allows £40m of hurricane exposure for its share. If no other limit is tighter, what is the most the panel can write in the zone?",
      options: ["£16m", "£40m", "£100m", "£160m"],
      answer: 2,
      why: "£40m is Carrier A’s 40% share, so the panel total can be £40m ÷ 0.4 = £100m."
    },
    {
      q: "Why is dependence on a single carrier dangerous for an MGA?",
      options: [
        "Single-carrier binders are prohibited",
        "The carrier may withdraw capacity even if the MGA’s book is profitable",
        "Commission is always lower with one carrier",
        "Lloyd’s requires at least three carriers"
      ],
      answer: 1,
      why: "Carriers withdraw for their own reasons, such as strategy or capital, so an MGA with one carrier can lose its whole business at a single renewal."
    }
  ]
});
