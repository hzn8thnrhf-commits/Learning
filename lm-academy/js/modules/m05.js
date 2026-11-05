/* The Slip — Delegated authority */
window.SLIP_DATA = window.SLIP_DATA || {};
(window.SLIP_DATA.modules = window.SLIP_DATA.modules || []).push({
  id: "m05",
  title: "Delegated authority",
  short: "Delegated",
  blurb: "How insurers authorise others to bind cover on their behalf, and how they keep control of the business.",
  outcomes: [
    "Distinguish open market placement from delegated authority.",
    "Explain binding authorities and the roles of coverholders, MGAs, service companies and claims administrators.",
    "Describe how carriers oversee delegated business through bordereaux, audits and referral rules.",
    "Explain how lineslips, consortia and follow facilities work."
  ],
  lessons: [
    {
      title: "Open market and delegated authority",
      minutes: 4,
      keys: ["Open market", "Delegated authority", "Local reach"],
      body: [
        "In the **open market**, an underwriter considers each risk individually: the broker presents it, and the underwriter assesses it and decides whether to accept it and on what terms. This approach suits a refinery or a satellite, but it would be impractical for five thousand small shops in Italy or twenty thousand homes in Texas.",
        "Under **delegated authority**, an insurer authorises another firm to accept risks, issue documents and sometimes handle claims on its behalf, within agreed limits. Delegated authority allows London capacity to reach local, smaller and more standardised business far from Lime Street, efficiently and at scale.",
        { fig: "delegated" },
        { analogy: "Delegated authority resembles a franchise. Head office, the syndicate, designs the menu, sets the prices and writes the hygiene rules. Local franchisees, the coverholders, serve customers every day, while head office checks the accounts and inspects the kitchens." },
        "Delegated authority accounts for a substantial share of Lloyd’s premium. It is efficient, but it places the insurer’s capital in the hands of another firm, so careful selection, clear limits and close oversight are essential. The module on MGAs and multiple carriers examines the business from the delegated underwriter’s side."
      ],
      takeaways: [
        "In the open market, the underwriter assesses each risk individually.",
        "Under delegated authority, another firm binds risks within agreed limits.",
        "Delegated authority brings London capacity to smaller, local business, but requires close oversight."
      ]
    },
    {
      title: "Coverholders, binders and MGAs",
      minutes: 5,
      keys: ["Binding authorities", "Coverholders", "MGAs", "Claims administrators"],
      body: [
        {
          terms: [
            ["Binding authority (binder)", "The contract by which an insurer delegates authority. It sets out the classes, territories, limits, rates, policy wordings and reporting requirements."],
            ["Coverholder", "A company authorised by a Lloyd’s managing agent to enter into contracts of insurance on behalf of its syndicates under a binding authority. Lloyd’s must approve every coverholder."],
            ["Managing general agent (MGA)", "A specialist underwriting business with delegated authority, often holding binders from several insurers. Coverholder is the Lloyd’s term; MGA is the wider industry term."],
            ["Third-party administrator (TPA)", "A firm authorised to handle and settle claims on the insurer’s behalf."],
            ["Service company", "A company owned by a managing agent that acts as a coverholder for its own syndicates."]
          ]
        },
        "Binding authorities vary in the freedom they give. Some allow the coverholder to price and bind freely within guidelines; others require referral to the underwriter for anything outside set parameters, such as a property above a certain value or one located in a flood zone.",
        { analogy: "A binder is rather like giving a teenager a debit card with rules attached: a spending limit, a list of approved shops and a requirement to keep every receipt. Within those rules, the teenager need not ask permission before each purchase." },
        "MGAs have grown rapidly in recent years, particularly in the United States, as experienced underwriters have moved to specialist firms and capital providers have sought access to their portfolios."
      ],
      takeaways: [
        "A binding authority sets the limits within which a coverholder may bind risks.",
        "Lloyd’s approves coverholders; MGA is the broader industry term.",
        "Claims under delegated authority are often handled by third-party administrators."
      ]
    },
    {
      title: "Bordereaux and oversight",
      minutes: 5,
      keys: ["Bordereaux", "Reporting standards", "Audits", "Referral rules"],
      body: [
        "If an underwriter does not see risks one by one, how does the underwriter know what has been written? The answer is the **bordereau** (plural **bordereaux**): a regular report, usually monthly, listing the risks, premiums and claims under a binding authority.",
        {
          ul: [
            "A **risk bordereau** lists each policy bound, with the insured, location, sum insured, premium and dates.",
            "A **premium bordereau** shows the premiums collected and due to the insurer.",
            "A **claims bordereau** shows the claims notified, paid and reserved."
          ]
        },
        "Lloyd’s publishes **coverholder reporting standards** so that bordereaux follow a common format across the market. Managing agents use them to monitor accumulations, check compliance with the binder and identify problems early.",
        "Oversight also includes **due diligence** before a coverholder is appointed, regular **audits**, and **referral rules** for risks outside the coverholder’s authority. A breach of authority can leave the insurer bound to a risk it never wished to accept, so managing agents monitor their coverholders closely.",
        { analogy: "Bordereaux are the monthly statements for that teenager’s debit card. You do not approve each purchase in advance, but you do read the statement, and if something unusual appears you ask about it." },
        { aware: "Data quality has long been a problem in delegated business. Bordereaux may arrive late, incomplete or in inconsistent formats, which is why the market’s modernisation programme places so much emphasis on structured, standardised data." }
      ],
      takeaways: [
        "Bordereaux report the risks, premiums and claims written under a binding authority.",
        "Standard reporting formats help insurers to monitor delegated business.",
        "Due diligence, audits and referral rules keep delegated risk under control."
      ]
    },
    {
      title: "Facilities: lineslips and consortia",
      minutes: 4,
      keys: ["Lineslips", "Consortia", "Follow facilities"],
      body: [
        "Between the open market and full delegation lie **facilities**: arrangements that allow a broker to place many risks with a panel of insurers agreed in advance.",
        {
          terms: [
            ["Lineslip", "A facility under which the participating insurers delegate authority to one or more leading underwriters to accept risks on behalf of all of them. The broker shows each risk only to the slip leaders."],
            ["Consortium", "A group of syndicates, sometimes with companies, that write a class of business together, with one leader underwriting on behalf of the group."],
            ["Follow facility", "A facility that automatically takes a share of a broker’s or leader’s placements across a portfolio, applying agreed rules rather than individual underwriting."]
          ]
        },
        { analogy: "A lineslip is like a group of friends who pool their money for a season of football and let one of them choose which matches to attend. The budget and rules are agreed in advance; after that, they trust the person choosing." },
        "Facilities save time for brokers and underwriters in high-volume classes, but they concentrate decisions in fewer hands. They are therefore central to the debate about the future of the subscription market."
      ],
      takeaways: [
        "Lineslips let leading underwriters bind risks on behalf of a panel of insurers.",
        "Consortia let syndicates write a class together under a single leader.",
        "Follow facilities apply agreed rules instead of individual underwriting."
      ]
    }
  ],
  quiz: [
    {
      q: "What is a coverholder?",
      options: [
        "A Lloyd’s broker placing open market risks",
        "A company authorised to enter into insurance contracts for Lloyd’s syndicates under a binding authority",
        "A member who provides capital",
        "A loss adjuster"
      ],
      answer: 1,
      why: "Coverholders bind risks on behalf of syndicates, within the limits of a binder, and need Lloyd’s approval."
    },
    {
      q: "What is a risk bordereau?",
      options: [
        "A periodic report listing the risks bound under delegated authority",
        "A map of catastrophe exposures",
        "The lead underwriter’s stamp",
        "A type of reinsurance treaty"
      ],
      answer: 0,
      why: "Bordereaux show insurers what has been written on their behalf."
    },
    {
      q: "Why is delegated authority used?",
      options: [
        "To bring London capacity efficiently to large numbers of smaller risks",
        "To avoid regulation",
        "To allow brokers to keep the premium",
        "Because open market placement is unlawful outside the UK"
      ],
      answer: 0,
      why: "Underwriters cannot assess thousands of small risks individually."
    },
    {
      q: "Under a lineslip, who usually sees and accepts each risk?",
      options: [
        "Every insurer on the facility",
        "The slip leaders, on behalf of all the participants",
        "The client",
        "The Corporation of Lloyd’s"
      ],
      answer: 1,
      why: "The participants delegate authority to the leaders, which saves the broker approaching every insurer."
    },
    {
      q: "What is the broader industry term for a specialist underwriting firm with delegated authority?",
      options: ["MGA", "TPA", "LMA", "UMR"],
      answer: 0,
      why: "Managing general agent. Coverholder is the term used at Lloyd’s."
    },
    {
      q: "What does a TPA do?",
      options: ["Underwrites risks", "Handles and settles claims on the insurer’s behalf", "Provides capital", "Audits Lloyd’s"],
      answer: 1,
      why: "A third-party administrator handles claims within the authority the insurer has given it."
    }
  ]
});
