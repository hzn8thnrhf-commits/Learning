/* The Slip — MGAs and multiple carriers */
window.SLIP_DATA = window.SLIP_DATA || {};
(window.SLIP_DATA.modules = window.SLIP_DATA.modules || []).push({
  id: "m15",
  title: "MGAs and multiple carriers",
  short: "MGAs",
  blurb: "How managing general agents work: finding and structuring capacity from several carriers, the MGA business plan, binder economics, alignment of interest, portfolio oversight and renewal.",
  outcomes: [
    "Explain the MGA business model and why its profit is so sensitive to volume.",
    "Describe sources of capacity and how panels, splits and fronting combine several carriers.",
    "Build an MGA business plan from both the MGA’s and the carrier’s point of view.",
    "Explain commission, profit commission and deficits, how interests are aligned, and how a multi-carrier book is managed and renewed."
  ],
  lessons: [
    {
      title: "The MGA business model",
      minutes: 7,
      keys: ["Delegated authority", "Commission", "Profit commission", "Fixed costs"],
      intro: "A managing general agent underwrites, but carries no risk on its own balance sheet. Follow the business in from the policyholders, see who does what and who gets paid how, and notice the box at the bottom that decides whether the MGA itself makes money.",
      diagram: {
        cols: 2,
        gapX: 64,
        nodes: [
          {
            id: "ph", at: [1, 1], span: 2, label: "Policyholders", sub: "Pay premium, receive claims",
            teach: "MGAs tend to grow up around a niche: contractors’ liability in Texas, private fine art collections, cyber for small firms. Policyholders get specialist cover; most never know which carriers stand behind it."
          },
          {
            id: "brokers", at: [2, 1], label: "Brokers", sub: "Bring the clients",
            teach: "Brokers introduce the business and are paid a commission out of the premium, often around 10%. An MGA can serve brokers a large insurer would find uneconomic to reach."
          },
          {
            id: "mga", at: [2, 2], tone: "tint", label: "The MGA", sub: "Underwrites and binds",
            teach: "A **managing general agent** holds delegated authority from one or more insurers, its **carriers** or **capacity providers**, to underwrite and bind policies for them. It supplies the expertise, the broker relationships and the day-to-day administration. At Lloyd’s it is called a **coverholder**, but the economics are the same whoever provides the capacity.",
            like: "An MGA is like an architectural practice designing buildings for developers who supply the money. The architects are judged on whether the buildings stand up and sell, but it is the developers’ capital at stake. A good practice wins repeat work; a careless one soon finds nobody will fund its designs."
          },
          {
            id: "comm", at: [3, 1], tone: "brass", label: "Commission", sub: "The MGA’s main income",
            teach: "**Commission** is a percentage of gross premium, deducted before the premium goes to the carrier. Part is passed on to the producing brokers. The MGA may also charge **fees** where local rules allow, and for services such as claims handling."
          },
          {
            id: "carriers", at: [3, 2], tone: "ink", label: "The carriers", sub: "Provide capital, pay claims",
            teach: "The carriers provide the capital and pay the claims. Their profit depends on the loss ratio, which the MGA controls through its underwriting but doesn’t pay for."
          },
          {
            id: "costs", at: [4, 1], tone: "bad", label: "Mostly fixed costs", sub: "People, systems, compliance",
            teach: "Against its income the MGA pays underwriters and support staff, technology and data, compliance and audit, premises, and often a third-party administrator for claims. Most of these costs are **fixed**: they don’t fall if premium does."
          },
          {
            id: "pc", at: [4, 2], tone: "good", label: "Profit commission", sub: "A share of carrier profit",
            teach: "**Profit commission** is a share of the carrier’s underwriting profit, paid if the business beats an agreed threshold. It rewards good underwriting rather than volume, and lesson 5 works through it."
          },
          {
            id: "profit", at: [5, 1], span: 2, label: "The MGA’s profit", sub: "Highly sensitive to volume",
            teach: "Commission is a percentage of premium; costs are mostly fixed. So an MGA’s profit swings sharply with volume: a book that falls short of its premium target can turn a profitable MGA into a loss-maker, even if every policy is sound. Try the model to find the break-even point.\n\nBe aware of the flip side: an MGA paid only by commission has an incentive to grow even when prices are inadequate, because the carrier bears the losses. Much of a well-designed MGA arrangement exists to counter that."
          }
        ],
        edges: [
          { from: "ph", to: "brokers", label: "buy through", teach: "Clients reach the MGA through brokers." },
          { from: "brokers", to: "mga", label: "place with", teach: "Brokers bring their clients’ risks to the MGA." },
          { from: "mga", to: "carriers", label: "binds for", teach: "The MGA binds policies on the carriers’ paper, under its delegated authority." },
          { from: "mga", to: "comm", label: "keeps", teach: "From each premium, the MGA keeps its commission, paying part to the broker." },
          { from: "carriers", to: "pc", label: "may share", teach: "If the business is profitable for the carriers, they share some of that profit." },
          { from: "comm", to: "costs", label: "must cover", teach: "Commission has to cover the MGA’s largely fixed running costs." },
          { from: "costs", to: "profit", teach: "What’s left after costs..." },
          { from: "pc", to: "profit", teach: "...plus any profit commission is the MGA’s profit." }
        ]
      },
      explore: "mga-economics",
      think: { q: "An MGA writes £20m of premium at a commission of 25%, and passes 10 percentage points of that to the producing brokers. Its running costs are £2.2m. What is its operating profit before any profit commission?", a: "The MGA keeps 25% − 10% = 15% of £20m, which is £3.0m. After running costs of £2.2m, it makes £0.8m before any profit commission." },
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
      intro: "Capacity is the lifeblood of an MGA: without a carrier behind its policies, it has nothing to sell. Look across the four sources, then down at the test every carrier applies, and the risk that hangs over every young MGA.",
      diagram: {
        cols: 4,
        nodes: [
          {
            id: "mga", at: [1, 1], span: 4, tone: "ink", label: "An MGA needs capacity", sub: "Its first and most important commercial task",
            teach: "Securing capacity is an MGA’s first and most important commercial task, and keeping it needs a continuing relationship, not one negotiation. Capacity agreements usually run for twelve months and are renewed annually, with notice periods on both sides."
          },
          {
            id: "lloyds", at: [2, 1], label: "Lloyd’s", sub: "Syndicates",
            teach: "**Lloyd’s syndicates** grant binding authorities to approved coverholders. The MGA gains Lloyd’s licences and ratings, and must meet Lloyd’s standards for delegated authority."
          },
          {
            id: "co", at: [2, 2], label: "Insurers", sub: "Own paper",
            teach: "London company market and overseas **insurers** provide their own policy paper, usually through a binding authority or agency agreement, and may offer a simpler structure and their own rating."
          },
          {
            id: "front", at: [2, 3], label: "Fronts", sub: "Licensed paper",
            teach: "**Fronting carriers** are licensed insurers that issue the policies but pass most of the risk to reinsurers, for a fronting fee. The model is particularly common in the United States, where licences are state by state."
          },
          {
            id: "rein", at: [2, 4], label: "Capital", sub: "Reinsurers, investors",
            teach: "**Reinsurers and other capital**, including investors using insurance-linked structures, increasingly provide the risk capital behind fronted programmes, sometimes on multi-year terms."
          },
          {
            id: "dd", at: [3, 1], span: 4, tone: "tint", label: "Due diligence", sub: "Team, record, plan, data, controls, alignment",
            teach: "Before providing capacity, a carrier does **due diligence**: the team’s track record, ideally backed by years of loss data from a previous carrier; the business plan and why this market; systems, data and controls; governance, compliance and financial resources; and how the MGA will be paid, in particular whether it shares in the results.",
            like: "Pitching for capacity is like a chef looking for backers for a new restaurant. The backers taste the food, but they also look at the chef’s previous restaurants, the plan, the suppliers and who keeps the books. Talent alone rarely secures the money; talent with a credible plan and a track record usually does."
          },
          {
            id: "invest", at: [4, 1], span: 2, label: "An investment decision", sub: "A return on the carrier’s capital",
            teach: "A carrier is really making an investment decision. It expects a return on the capital it puts behind the MGA, and compares that with other uses of the same capital, including writing similar business through its own underwriters."
          },
          {
            id: "single", at: [4, 3], span: 2, tone: "bad", label: "One carrier is fragile", sub: "Capacity can vanish",
            teach: "Capacity can disappear quickly. After poor results elsewhere in its account, a change of strategy or a hardening market, a carrier may give notice even when the MGA’s own book is profitable. **Dependence on a single carrier** is the commonest threat to a young MGA’s survival, so most aim for more than one."
          }
        ],
        edges: [
          { from: "mga", to: "lloyds", teach: "One source: a Lloyd’s binding authority." },
          { from: "mga", to: "co", teach: "Another: an insurance company’s own paper." },
          { from: "mga", to: "front", teach: "A third: a fronting carrier’s licence." },
          { from: "mga", to: "rein", teach: "A fourth: reinsurers and investors, usually behind a front." },
          { from: "front", to: "rein", teach: "The fronting carrier passes most of the risk to reinsurers." },
          { from: "lloyds", to: "dd", teach: "Every source tests the MGA before committing." },
          { from: "co", to: "dd", teach: "Companies do their own due diligence." },
          { from: "rein", to: "dd", teach: "So do the reinsurers behind a front." },
          { from: "dd", to: "invest", label: "is really", teach: "Due diligence is the carrier deciding whether this is a good use of its capital." },
          { from: "dd", to: "single", label: "and can end", teach: "What a carrier grants, it can also withdraw." }
        ]
      },
      takeaways: [
        "Capacity can come from Lloyd’s syndicates, insurance companies, fronting carriers, or reinsurers and other capital.",
        "Carriers carry out due diligence on the team, plan, data, controls and alignment of interest.",
        "A carrier treats capacity as an investment and expects a return on its capital.",
        "Dependence on one carrier is a serious risk, so most MGAs aim for more than one source."
      ]
    },
    {
      title: "Structuring capacity from several carriers",
      minutes: 7,
      keys: ["Panels", "Horizontal and vertical splits", "Fronting fees", "Resilience"],
      intro: "As an MGA grows, it usually wants more than one carrier, for size, for safety and for different appetites and licences. There are three ways to arrange them, and most MGAs combine them. Compare the columns, and see the single question that judges the whole structure.",
      diagram: {
        cols: 3,
        nodes: [
          {
            id: "book", at: [1, 1], span: 3, tone: "ink", label: "A growing MGA book", sub: "Several carriers behind it",
            teach: "Several carriers can support a larger book, reduce the damage if one withdraws, and bring different appetites, ratings or licences. The question is how to arrange them."
          },
          {
            id: "panel", at: [2, 1], label: "A panel", sub: "Fixed shares of everything",
            teach: "In a **panel**, several carriers share every risk in fixed proportions, as underwriters share a slip. One carrier **leads** the binder; the others follow. At 40% A, 35% B and 25% C, every policy and every claim is split the same way.",
            like: "A panel is like a syndicated loan, in which every bank lends the same share of every pound."
          },
          {
            id: "split", at: [2, 2], label: "Splits", sub: "By segment or by layer",
            teach: "Or the book can be divided. A **horizontal split** divides it by segment: one carrier for property, another for liability, or one per country. A **vertical split** divides each risk by layer: one carrier for the primary layer, another for the excess.",
            like: "A split is more like a shopping centre, where each tenant takes the units that suit it."
          },
          {
            id: "front", at: [2, 3], label: "Fronting", sub: "One name on every policy",
            teach: "In a **fronted** structure, a single licensed insurer issues all the policies, so clients and brokers see one recognised name, and passes most of the risk to reinsurers through a quota share.",
            like: "Fronting resembles a franchise trading under one famous name while the money behind each outlet comes from others."
          },
          {
            id: "fair", at: [3, 1], tone: "good", label: "Equal treatment", sub: "But rigid",
            teach: "A panel keeps administration simple and treats carriers equally: none can be given better or worse risks than the others. Its weakness is rigidity: if one carrier wants to cut its share or leave, the whole panel must be rearranged."
          },
          {
            id: "steer", at: [3, 2], tone: "bad", label: "Temptation to steer", sub: "Best risks to the best payer",
            teach: "Splits let each carrier take the business it likes best, but they mean more binders to manage, and they can tempt the MGA to steer the best risks towards the carrier that pays it most. That is why a carrier may prefer a panel: it can’t be given a worse selection."
          },
          {
            id: "fee", at: [3, 3], label: "Fee and collateral", sub: "A few per cent of premium",
            teach: "The fronting insurer charges a **fronting fee**, typically a few per cent of premium, for its licence, rating and administration. It stays liable to policyholders if a reinsurer fails, so it watches the reinsurers’ strength closely and often requires collateral."
          },
          {
            id: "resil", at: [4, 1], span: 3, tone: "tint", label: "Could it survive losing its largest carrier?", sub: "The test of any structure",
            teach: "Many MGAs combine all three: a core panel on the main binder, a separate carrier for a new product, a reinsurance-backed fronted programme for one country. The aim is **resilience**, and the test is simple: could the MGA survive the loss of its largest carrier at the next renewal? The model lets you try."
          }
        ],
        edges: [
          { from: "book", to: "panel", teach: "One way: share everything in fixed proportions." },
          { from: "book", to: "split", teach: "Another: give each carrier its own part." },
          { from: "book", to: "front", teach: "A third: put everything on one licensed carrier’s paper." },
          { from: "panel", to: "fair", label: "gives", teach: "Fixed shares mean equal treatment." },
          { from: "split", to: "steer", label: "risks", teach: "Separate binders create room to steer business." },
          { from: "front", to: "fee", label: "costs", teach: "The front charges for its paper and protects itself with collateral." },
          { from: "fair", to: "resil", teach: "Each structure is judged by the same test..." },
          { from: "steer", to: "resil", teach: "...of whether the MGA survives a carrier leaving..." },
          { from: "fee", to: "resil", teach: "...including the front or its reinsurers." }
        ]
      },
      explore: "panel-withdrawal",
      think: { q: "Why might a carrier prefer to sit on a panel rather than take a horizontal split of the same MGA’s business?", a: "On a panel it receives exactly the same share of every risk as the other carriers, so it can’t be given a worse selection. With a split it depends on the MGA allocating risks fairly, and it carries a more concentrated exposure to one segment." },
      takeaways: [
        "A panel shares every risk among carriers in fixed proportions, with one carrier leading.",
        "A horizontal split divides the book by segment; a vertical split divides each risk by layer.",
        "Fronting puts every policy on one licensed insurer, which reinsures most of the risk for a fee.",
        "A good structure would survive the loss of the largest carrier."
      ]
    },
    {
      title: "The MGA business plan",
      minutes: 7,
      keys: ["Premium plan", "Loss ratio plan", "Carrier view", "Sensitivities"],
      intro: "An MGA’s plan has two audiences: the MGA itself, and the carriers deciding whether to back it. The same £20m of premium produces two quite different profit and loss accounts. Follow both columns down, and see which risk hurts which party.",
      diagram: {
        cols: 2,
        nodes: [
          {
            id: "plan", at: [1, 1], span: 2, tone: "ink", label: "The MGA’s plan", sub: "£20m of premium",
            teach: "The premium plan is built product by product, as in Module 12: renewals by retention rate, adjusted for rate and exposure change, plus new business from the pipeline, checked against the size of each market. Each segment then gets an expected loss ratio, developed, on-levelled and trended. Carriers scrutinise that loss ratio more than any other number."
          },
          {
            id: "mview", at: [2, 1], label: "The MGA’s view", sub: "Commission in, costs out",
            teach: "In the MGA’s account, commission and fees are income and operating costs are expenses. On £20m: MGA commission of 18% is £3.6m of income; running costs are £2.4m. Brokers’ 10% passes straight through, and claims aren’t its cost at all."
          },
          {
            id: "cview", at: [2, 2], label: "The carrier’s view", sub: "Premium in, everything else out",
            teach: "In the carrier’s account, premium is income, and commission, claims, its own expenses and any reinsurance are costs. On £20m: £2.0m to brokers, £3.6m to the MGA, £11.0m of claims at a 55% loss ratio, £1.0m of carrier expenses."
          },
          {
            id: "mp", at: [3, 1], tone: "good", label: "MGA profit £1.2m", sub: "£3.6m − £2.4m",
            teach: "The MGA expects £3.6m − £2.4m = **£1.2m** before any profit commission."
          },
          {
            id: "cp", at: [3, 2], tone: "good", label: "Carrier profit £2.4m", sub: "£20m − £17.6m",
            teach: "The carrier expects £20m − £2.0m − £3.6m − £11.0m − £1.0m = **£2.4m** of underwriting profit, which it will compare with the capital it must hold."
          },
          {
            id: "vol", at: [4, 1], tone: "bad", label: "Premium 20% short", sub: "Hurts the MGA most",
            teach: "Because the MGA’s costs are largely fixed, a premium shortfall hurts the MGA most: its commission falls but its costs don’t."
          },
          {
            id: "lr", at: [4, 2], tone: "bad", label: "Loss ratio 5 points worse", sub: "Hurts the carrier most",
            teach: "Because the carrier pays the claims, a worse loss ratio hurts the carrier most. Five points on £20m is £1m: the carrier’s profit falls from £2.4m to £1.4m, while the MGA’s stays at £1.2m (though its hoped-for profit commission shrinks)."
          },
          {
            id: "panel", at: [5, 1], span: 2, tone: "tint", label: "Shared across the panel", sub: "A 40%, B 35%, C 25%",
            teach: "On a panel, each carrier’s plan has the same shape at a different size: Carrier A expects £8m of premium and £0.96m of profit, B £7m and £0.84m, C £5m and £0.60m. A good plan shows each carrier its own sensitivities. Showing both effects makes a plan more credible, not less."
          }
        ],
        edges: [
          { from: "plan", to: "mview", teach: "The MGA reads the plan as commission against costs." },
          { from: "plan", to: "cview", teach: "Carriers read it as premium against claims and costs." },
          { from: "mview", to: "mp", teach: "The MGA’s bottom line." },
          { from: "cview", to: "cp", teach: "The carrier’s bottom line." },
          { from: "mp", to: "vol", label: "exposed to", teach: "The MGA’s profit is most exposed to volume." },
          { from: "cp", to: "lr", label: "exposed to", teach: "The carrier’s profit is most exposed to the loss ratio." },
          { from: "vol", to: "panel", label: "shown to", teach: "Both sensitivities belong in the plan shown to carriers." },
          { from: "lr", to: "panel", label: "shown to", teach: "Each carrier sees its share of the downside." }
        ]
      },
      explore: "two-views",
      think: { q: "In the example, the loss ratio deteriorates from 55% to 60%. What happens to the carrier’s underwriting profit, and to the MGA’s?", a: "Claims rise by £1m (5% of £20m), so the carrier’s profit falls from £2.4m to £1.4m. The MGA’s profit is unchanged at £1.2m before profit commission, although any profit commission it hoped to earn will fall." },
      takeaways: [
        "The MGA’s plan is both an internal budget and the case for carriers to provide capacity.",
        "The same plan gives an MGA view, driven by commission and costs, and a carrier view, driven by the loss ratio.",
        "Sensitivities show how each party is affected if premium or the loss ratio misses plan."
      ]
    },
    {
      title: "Binder economics",
      minutes: 7,
      keys: ["Commission", "Sliding scale", "Profit commission", "Deficit carried forward"],
      intro: "The binding authority turns the plan into contract terms: the scope of the authority, and how the MGA is paid. How that pay is structured does a lot to determine how the MGA behaves. Follow the pay terms down to the clause that stops a good year being rewarded straight after a bad one.",
      diagram: {
        cols: 2,
        gapX: 60,
        nodes: [
          {
            id: "binder", at: [1, 1], span: 2, tone: "ink", label: "The binder", sub: "Scope and pay",
            teach: "Besides the scope of the authority, the classes, territories, limits, rates and wordings, the binder sets out exactly how the MGA is paid."
          },
          {
            id: "comm", at: [2, 1], label: "Commission", sub: "Covers costs and brokers",
            teach: "The MGA receives a **commission** as a percentage of gross premium. It normally has to cover both the MGA’s own costs and the brokers’ commission, so binders often state an overall allowance for acquisition costs as well as the MGA’s own share."
          },
          {
            id: "other", at: [2, 2], label: "Other terms that matter", sub: "Premium, claims, settlement, run-off",
            teach: "A **minimum or target premium**, sometimes with consequences if missed. **Claims authority**: whether the MGA or its administrator may settle claims, and up to what amount. **Premium settlement**: how quickly collected premium reaches the carrier. **Termination and run-off**: notice periods, rights to terminate for cause, and who services policies and claims after the binder ends."
          },
          {
            id: "slide", at: [3, 1], label: "Sliding scale", sub: "Moves with the loss ratio",
            teach: "Commission is usually fixed, but some binders use a **sliding scale**: commission rises as the loss ratio falls, between a minimum and a maximum, just like the treaty scales in Module 10."
          },
          {
            id: "pc", at: [3, 2], tone: "tint", label: "Profit commission", sub: "A share of the carrier’s profit",
            teach: "**Profit commission** pays the MGA a share of the carrier’s profit for each underwriting year. A typical formula: profit = earned premium − commission − incurred claims − the carrier’s management allowance; profit commission = the agreed percentage × profit, if positive.\n\nBecause profit is only known as claims develop, it is usually calculated two or three years in and adjusted as claims settle. Binders often make provisional payments that are adjusted later.\n\nBe aware: a high commission with no profit commission rewards **volume**; a lower commission with generous profit commission rewards **results**."
          },
          {
            id: "dcf", at: [4, 1], span: 2, tone: "brass", label: "Deficit carried forward", sub: "Losses first recovered from later profits",
            teach: "A **deficit carried forward** clause means a loss in one year must be recovered from later profits before any more profit commission is paid. Say profit commission is 20%. Year 1 makes £1.0m profit: the MGA receives £0.2m. Year 2 loses £0.6m: nothing is paid and the deficit is carried forward. Year 3 makes £1.5m, but £0.6m first offsets the deficit, so profit commission is 20% of £0.9m, **£0.18m**. Some deficits carry forward for a limited period, others indefinitely. Try different years in the model."
          }
        ],
        edges: [
          { from: "binder", to: "comm", label: "pays", teach: "The binder sets the MGA’s commission." },
          { from: "binder", to: "other", label: "and sets", teach: "And all the other terms that govern the relationship." },
          { from: "comm", to: "slide", label: "fixed, or", teach: "Commission can be fixed or slide with results." },
          { from: "comm", to: "pc", label: "plus", teach: "Profit commission can sit on top of the base commission." },
          { from: "pc", to: "dcf", label: "subject to", teach: "A deficit clause stops a good year being rewarded straight after a bad one." }
        ]
      },
      explore: "profit-commission",
      takeaways: [
        "The binder sets out the MGA’s remuneration as well as the scope of its authority.",
        "Commission pays for the MGA’s costs and the brokers; a sliding scale links it to results.",
        "Profit commission shares the carrier’s profit, calculated once each year’s results are mature.",
        "A deficit carried forward clause means a loss must be recovered before later profits earn profit commission."
      ]
    },
    {
      title: "Alignment of interest",
      minutes: 6,
      keys: ["Volume versus profit", "Risk participation", "Equity stakes", "Fair allocation"],
      intro: "The central tension in any MGA arrangement is simple: the MGA writes the business, but the carrier pays the claims. Carriers have learned, sometimes expensively, that alignment must be designed in from the start. Read the tools from left to right, weakest to strongest, and then see the duty that applies across them all.",
      diagram: {
        cols: 3,
        nodes: [
          {
            id: "tension", at: [1, 1], span: 3, tone: "bad", label: "The MGA writes, the carrier pays", sub: "Paid on volume? Tempted to grow",
            teach: "If the MGA is paid mainly according to volume, it may be tempted to write more business than the market can support at adequate prices. The carrier then pays for the MGA’s growth.",
            like: "Alignment of interest is like a ship’s captain who owns part of the cargo. A captain paid only per voyage might sail through a storm to save a day; a captain with a stake in the cargo thinks harder about whether it arrives safely."
          },
          {
            id: "pc", at: [2, 1], label: "Profit commission", sub: "Pay tied to profit",
            teach: "**Profit commission** ties part of the MGA’s income to underwriting profit, as in the last lesson. The model compares it with a flat commission across different loss ratios."
          },
          {
            id: "defer", at: [2, 2], label: "Deferred commission", sub: "Held back until known",
            teach: "**Deferred or contingent commission** holds back part of the commission until results are known, or reduces it if results are poor."
          },
          {
            id: "cond", at: [2, 3], label: "Performance conditions", sub: "Agreed thresholds",
            teach: "**Performance conditions** set agreed thresholds, such as a maximum loss ratio, beyond which the carrier may review or end the arrangement."
          },
          {
            id: "risk", at: [3, 1], tone: "good", label: "Risk participation", sub: "The strongest",
            teach: "**Risk participation**: the MGA takes a share of the risk itself, often through a captive or related reinsurance vehicle writing a quota share of the binder. It is the strongest alignment, because the MGA loses money directly when claims are high. But it needs capital, and turns the MGA into a risk carrier with the regulatory and financial obligations that brings."
          },
          {
            id: "equity", at: [3, 2], label: "Equity", sub: "Long-term value",
            teach: "**Equity**: a carrier or investor takes a stake in the MGA, sharing in its long-term value as well as its annual results."
          },
          {
            id: "fair", at: [3, 3], tone: "brass", label: "Fair allocation", sub: "Rules that can be audited",
            teach: "Where carriers sit on separate binders, the MGA must allocate business fairly and by the agreed rules. Steering the better risks to the carrier paying the higher commission, or to a vehicle the MGA participates in, would breach the trust the arrangement rests on, and could breach contractual and regulatory obligations. Clear, recorded, auditable rules protect the MGA as much as its carriers."
          },
          {
            id: "aligned", at: [4, 1], span: 3, tone: "tint", label: "Aligned by design", sub: "Built in from the start",
            teach: "No single tool is enough. Good arrangements combine several, chosen at the start and written into the binder, so that both sides win and lose together."
          }
        ],
        edges: [
          { from: "tension", to: "pc", teach: "First answer: pay for profit, not just premium." },
          { from: "tension", to: "defer", teach: "Second: don’t pay it all until the results are known." },
          { from: "tension", to: "cond", teach: "Third: agree in advance what performance triggers a review." },
          { from: "pc", to: "risk", label: "stronger still", teach: "Sharing the risk itself goes further than sharing the profit." },
          { from: "defer", to: "equity", label: "longer term", teach: "Equity extends alignment from one year to the life of the business." },
          { from: "cond", to: "fair", label: "plus", teach: "Fair allocation rules apply across every carrier." },
          { from: "risk", to: "aligned", teach: "Each tool adds to the alignment..." },
          { from: "equity", to: "aligned", teach: "...designed in from the start..." },
          { from: "fair", to: "aligned", teach: "...and checked by audit." }
        ]
      },
      explore: "commission-choice",
      think: { q: "An MGA is offered either 28% commission with no profit commission, or 23% plus 25% profit commission. It expects a 50% loss ratio on £10m of premium, and the carrier’s management allowance is 5% of premium. Which option pays more?", a: "Under the second, profit = £10m − £2.3m − £5.0m − £0.5m = £2.2m, so profit commission is £0.55m and total income £2.85m, against £2.8m under the first. The second pays slightly more if the 50% loss ratio is achieved, and considerably less if it isn’t." },
      takeaways: [
        "The MGA writes the business while the carrier pays the claims, so incentives must be aligned by design.",
        "Profit commission, deferred commission, risk participation and equity are the main tools; risk participation is the strongest.",
        "Business must be allocated between carriers fairly, under clear rules that can be audited."
      ]
    },
    {
      title: "Managing a portfolio across carriers",
      minutes: 6,
      keys: ["Policy-level data", "Carrier limits", "Business reviews", "Audits"],
      intro: "Once capacity is in place, the MGA must manage the book so it performs for every carrier, and show each carrier separately how its share is doing. Start from the data on every policy and follow it out to the reports, the limits and the checks.",
      diagram: {
        cols: 2,
        gapX: 60,
        nodes: [
          {
            id: "policy", at: [1, 1], span: 2, tone: "ink", label: "Every policy", sub: "Which carriers, what shares, what exposure",
            teach: "The foundation is data. For every policy the MGA must record which carriers are on risk and in what shares, together with the exposure details they need: location, sum insured or limit, occupation, deductibles and premium."
          },
          {
            id: "bdx", at: [2, 1], label: "Bordereaux", sub: "Monthly, per carrier",
            teach: "The policy data feed the **bordereaux** sent to carriers, usually monthly, as well as the MGA’s own management information. Module 06 showed why late or incomplete bordereaux are dangerous."
          },
          {
            id: "lim", at: [2, 2], label: "Each carrier’s limits", sub: "Line, aggregate, premium",
            teach: "Each binder sets limits, and with several carriers they may differ: a maximum line on any one risk, a maximum aggregate in a catastrophe zone, a cap on total premium, restrictions on occupations or territories. The MGA must monitor every limit for every carrier."
          },
          {
            id: "mi", at: [3, 1], label: "Management information", sub: "Plan, rate, retention, losses",
            teach: "Beyond bordereaux, carriers expect regular MI: premium against plan, rate change achieved, retention of renewals, loss ratios by underwriting year, large losses, and any breaches or referrals."
          },
          {
            id: "tight", at: [3, 2], tone: "brass", label: "The tightest limit governs", sub: "On a panel",
            teach: "On a panel, each carrier’s limit applies to its share. If Carrier A allows £50m of coastal Florida exposure for its 40% share, the whole panel can’t exceed £50m ÷ 0.4 = £125m there. If another carrier’s limit implies less, that tighter limit governs. Try it in the model."
          },
          {
            id: "qbr", at: [4, 1], label: "Quarterly reviews", sub: "Performance and plans",
            teach: "Most relationships include a **quarterly business review** with each carrier: performance, market conditions and any changes to the plan."
          },
          {
            id: "audit", at: [4, 2], label: "Audits", sub: "Authority, rating, claims, fairness",
            teach: "Carriers are responsible for business written in their name, so they audit their MGAs: were risks written within authority, rated correctly, claims handled properly, customers treated fairly, money handled as agreed? At Lloyd’s, managing agents must follow Lloyd’s delegated authority requirements, including approving and overseeing coverholders."
          },
          {
            id: "breach", at: [5, 1], span: 2, tone: "bad", label: "Breaches of authority", sub: "Can end the binder",
            teach: "Breaches are taken seriously. Writing a risk outside the binder, even with the best intentions, can leave a carrier exposed to a loss it never agreed to accept, and can lead to the binder being terminated. Referral rules exist so that unusual risks are seen by the carrier before they are bound."
          }
        ],
        edges: [
          { from: "policy", to: "bdx", label: "feeds", teach: "Policy-level data feed every carrier’s bordereaux." },
          { from: "policy", to: "lim", label: "tested against", teach: "Every policy is tested against every carrier’s limits." },
          { from: "bdx", to: "mi", label: "and", teach: "The same data drive the management information." },
          { from: "lim", to: "tight", label: "on a panel", teach: "On a panel, the carrier with the tightest limit sets the ceiling." },
          { from: "mi", to: "qbr", label: "discussed at", teach: "MI is discussed with each carrier at regular reviews." },
          { from: "tight", to: "audit", label: "checked by", teach: "Audits check that limits were respected." },
          { from: "qbr", to: "breach", label: "surface", teach: "Reviews surface problems early..." },
          { from: "audit", to: "breach", label: "find", teach: "...and audits find any breaches of authority." }
        ]
      },
      explore: "carrier-limits",
      think: { q: "A panel has two carriers: Carrier A at 60%, with a flood aggregate of £30m for its share, and Carrier B at 40%, with a flood aggregate of £24m for its share. What is the most the panel can write in the flood zone?", a: "A’s limit allows £30m ÷ 0.6 = £50m. B’s allows £24m ÷ 0.4 = £60m. The tighter limit governs, so the panel can write no more than £50m in the zone." },
      takeaways: [
        "The MGA must record, for every policy, which carriers are on risk and in what shares.",
        "Every binder limit must be monitored for every carrier, and on a panel the tightest limit governs.",
        "Carriers expect bordereaux, management information, regular reviews and audits."
      ]
    },
    {
      title: "Renewal, growth and exit",
      minutes: 5,
      keys: ["Renewal", "Adding carriers", "Run-off", "Durable earnings"],
      intro: "MGA arrangements renew every year, and the renewal is where the relationship is tested. Follow the two paths out of it: the one that builds a valuable business, and the one where capacity is withdrawn.",
      diagram: {
        cols: 2,
        gapX: 60,
        nodes: [
          {
            id: "renewal", at: [1, 1], span: 2, tone: "ink", label: "The annual renewal", sub: "Both sides review",
            teach: "The carrier reviews the year’s results, the quality of the MGA’s data and controls, and its own appetite and capital. The MGA considers whether the carrier’s terms, service and commitment still suit its plans. A good renewal starts months before the binder expires.",
            like: "Renewing capacity is like renewing a lease. A tenant who has paid on time, looked after the building and kept the landlord informed can usually renew, often on better terms. A tenant who has surprised the landlord with problems finds the terms harder, or the door closed."
          },
          {
            id: "results", at: [2, 1], label: "Results and data", sub: "Explained, not excused",
            teach: "The MGA presents updated results, an honest explanation of any adverse development, and the plan for the coming year. Surprises at renewal are the fastest way to lose a carrier’s trust."
          },
          {
            id: "asks", at: [2, 2], label: "What each side asks", sub: "Products, limits, terms",
            teach: "The MGA may ask for new products, higher limits or better commission. The carrier may respond with tighter limits, rate requirements, a smaller share or new reporting obligations."
          },
          {
            id: "grow", at: [3, 1], tone: "good", label: "Grow with a few carriers", sub: "Deepen, don’t scatter",
            teach: "Growth often means adding carriers: joining an existing panel, taking a new product or supporting a new territory. Each addition brings due diligence, onboarding, reporting and new limits, so MGAs usually prefer to deepen relationships with a few committed carriers rather than add many small lines."
          },
          {
            id: "notice", at: [3, 2], tone: "bad", label: "A carrier gives notice", sub: "Replace it, or shrink",
            teach: "If a carrier gives notice, the MGA must replace that capacity before the binder ends, or stop writing that share of the business."
          },
          {
            id: "value", at: [4, 1], tone: "tint", label: "A valuable MGA", sub: "Durable earnings",
            teach: "For owners and investors, an MGA’s value rests on the **durability** of its earnings: a record of underwriting profit, diversified and committed capacity, strong broker relationships, good data and systems, and a team that will stay. An MGA dependent on one carrier, or one underwriter, is worth much less."
          },
          {
            id: "runoff", at: [4, 2], label: "Run-off", sub: "Policies and claims continue",
            teach: "A carrier’s obligations don’t end at expiry. Policies already bound stay on risk until they expire, and claims must be handled until settled, often for years. The binder should say who services the **run-off**, and on what terms."
          }
        ],
        edges: [
          { from: "renewal", to: "results", label: "reviews", teach: "Renewal starts with the evidence: results and data." },
          { from: "renewal", to: "asks", label: "negotiates", teach: "Both sides then negotiate changes." },
          { from: "results", to: "grow", label: "if good", teach: "Good results and trusted data earn more capacity." },
          { from: "asks", to: "notice", label: "if apart", teach: "If appetites have moved apart, or results disappoint, capacity may be withdrawn." },
          { from: "grow", to: "value", label: "builds", teach: "Profitable, diversified growth builds a valuable business." },
          { from: "notice", to: "runoff", label: "leaves", teach: "Withdrawal leaves a run-off to be serviced for years." }
        ]
      },
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
