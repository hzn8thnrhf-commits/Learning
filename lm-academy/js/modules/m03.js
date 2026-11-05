/* The Slip — Inside Lloyd’s */
window.SLIP_DATA = window.SLIP_DATA || {};
(window.SLIP_DATA.modules = window.SLIP_DATA.modules || []).push({
  id: "m03",
  title: "Inside Lloyd’s",
  short: "Lloyd’s",
  blurb: "Capacity and capital, the chain of security, the three-year life of a year of account, and the crisis that reshaped the market.",
  outcomes: [
    "Explain syndicate capacity and how members support it with Funds at Lloyd’s.",
    "Describe the three links of the Lloyd’s chain of security.",
    "Explain the year of account and how a year is closed by reinsurance to close.",
    "Describe the causes of the crisis of the 1990s and the reforms that followed it."
  ],
  lessons: [
    {
      title: "Capacity and capital",
      minutes: 5,
      keys: ["Capacity", "Funds at Lloyd’s", "35% uplift", "Business plans"],
      body: [
        "Each year every syndicate has a **capacity**: the maximum premium, net of brokerage and other acquisition costs, that it may accept. Capacity reflects the commitments of the syndicate’s members, and it is approved by Lloyd’s as part of the syndicate’s annual business plan.",
        "To support that premium, members must lodge capital with Lloyd’s, known as **Funds at Lloyd’s (FAL)**. The amount depends on how risky the business is. Each syndicate calculates its capital requirement under Solvency II, using a model reviewed by Lloyd’s, and Lloyd’s then adds an uplift of 35% to set the capital its members must provide. A riskier plan therefore needs more capital for every pound of premium.",
        { analogy: "Capacity is like the credit limit on a card, and Funds at Lloyd’s are the deposit required to obtain it. The riskier the things you plan to buy, the larger the deposit Lloyd’s asks for." },
        "Lloyd’s reviews every syndicate’s business plan each year, examining which classes it will write, at what rates and with what reinsurance. Plans can be challenged, reduced or, in extreme cases, rejected. This oversight is one of the ways in which Lloyd’s protects the brand and the capital that all syndicates share; it is examined in more detail in the module on business planning.",
        { h: "Where the capital comes from" },
        "Most capacity now comes from **corporate members**, chiefly insurance groups that support their own syndicates, together with specialist investment vehicles. Individual members still take part, but no new members with unlimited liability have been admitted since 2003, and individuals now usually participate through vehicles with limited liability."
      ],
      takeaways: [
        "Capacity is the premium, net of acquisition costs, that a syndicate may accept in a year.",
        "Members support capacity with Funds at Lloyd’s, sized to the risk with a 35% uplift.",
        "Lloyd’s reviews and approves each syndicate’s business plan every year.",
        "Most capital now comes from corporate members."
      ]
    },
    {
      title: "The chain of security",
      minutes: 5,
      keys: ["Syndicate assets", "Members’ funds", "Central Fund", "One market rating"],
      body: [
        "Why should a client in Argentina trust a policy written by a syndicate it has never heard of? The answer is that every Lloyd’s policy is supported by the **chain of security**: three links of assets that stand behind every valid claim.",
        {
          chain: [
            ["Syndicate assets", "Premiums and reserves held in each syndicate’s premium trust funds. Claims are paid from these first."],
            ["Members’ funds at Lloyd’s", "The capital each member has lodged to support its share of the syndicate’s underwriting."],
            ["Central assets", "The Lloyd’s Central Fund and other central resources, available if a member cannot meet its obligations."]
          ]
        },
        { analogy: "Picture a trapeze act with three safety nets, one below another. Most falls are caught by the first net. A very bad fall might break through to the second. The third, shared by every act in the circus, is there for the worst case of all." },
        "The shared third link allows Lloyd’s to carry a single financial strength rating for the whole market. It also gives every member an interest in the discipline of all the others, which explains why Lloyd’s supervises underwriting standards so closely.",
        { note: "Members contribute to the Central Fund each year in proportion to the premium they write. The fund was used during the 1990s to meet the obligations of members who could not pay their share of losses." },
        { think: { q: "Why does the existence of a mutual Central Fund encourage Lloyd’s to oversee syndicates closely?", a: "If one syndicate’s members cannot meet their losses, the Central Fund, built from contributions by every member, may have to pay. Poor underwriting by one syndicate can therefore cost all the others, so the market has a collective interest in each syndicate’s discipline." } }
      ],
      takeaways: [
        "Claims are met first from syndicate assets, then from members’ Funds at Lloyd’s, then from central assets.",
        "The mutual Central Fund allows Lloyd’s to carry a single market-wide rating.",
        "Every member has a stake in the quality of every other member’s underwriting."
      ]
    },
    {
      title: "Years of account and reinsurance to close",
      minutes: 6,
      keys: ["Year of account", "Three-year close", "RITC", "Run-off"],
      body: [
        "Legally, each syndicate is an **annual venture**. Members join a syndicate for a particular **year of account**, and every policy that incepts in, say, 2026 belongs to the 2026 year of account, however long its claims take to emerge.",
        "Because claims can take years to settle, a year of account normally remains open for three years before its result is finalised. At the end of the third year it is closed by **reinsurance to close (RITC)**. The closing year pays a premium to the next year of account, or to another syndicate, which accepts responsibility for all of the closing year’s remaining liabilities. The members of the closed year then receive their profit or meet their loss.",
        { fig: "yoa" },
        { analogy: "Reinsurance to close is like the handover in a relay race. The 2024 runners carry the baton, the unsettled claims, as far as they can. At the handover they pass it to the 2025 team, together with enough provision to finish the race, and leave the track with their result." },
        { example: { title: "Closing a year", text: "A syndicate’s 2024 year of account closes on 31 December 2026. Some claims remain open and others have not yet been reported. Actuaries estimate the remaining liabilities at £40m. The 2024 year pays an RITC premium of £40m to the 2025 year, which accepts responsibility for any future claims. Whatever remains is the 2024 members’ profit." } },
        "If the remaining liabilities are too uncertain to price, the year stays open in **run-off** until it can be closed. Run-off years tie up members’ capital and are therefore unwelcome. This structure also explains why London practitioners describe results by year of account rather than only by calendar year."
      ],
      takeaways: [
        "Each policy belongs to the year of account in which it incepts.",
        "A year of account normally closes after three years by reinsurance to close.",
        "A year that cannot be closed remains open in run-off."
      ]
    },
    {
      title: "The crisis of the 1990s",
      minutes: 6,
      keys: ["Names", "Unlimited liability", "LMX spiral", "Equitas"],
      body: [
        "For most of its history Lloyd’s capital came from wealthy individuals known as **Names**, who supported syndicates with **unlimited liability**: they were liable for their share of losses to the full extent of their personal wealth. By the late 1980s there were more than 30,000 of them.",
        "Several disasters then struck at once. Enormous and long-hidden claims emerged in the United States for **asbestos** and **pollution**; a run of catastrophes followed, including Piper Alpha in 1988 and the Exxon Valdez and Hurricane Hugo in 1989; and the market was weakened by the **LMX spiral**, in which excess of loss reinsurance had been passed repeatedly between London syndicates, concentrating losses on a few of them.",
        { fig: "spiral" },
        { analogy: "The LMX spiral resembled a game of pass the parcel with a bomb inside. Each syndicate reinsured its large losses with another, which reinsured with another, until the same loss had circled the room several times. When the music stopped, the losses landed on whoever was holding the parcel." },
        "Losses for the years 1988 to 1992 ran into billions of pounds. Many Names were ruined, and there was widespread litigation against managing agents. In 1996 the **Reconstruction and Renewal** plan settled the disputes. A new company, **Equitas**, reinsured all the 1992 and earlier non-life liabilities of Lloyd’s Names, separating the past from the market’s future. In 2007 Berkshire Hathaway’s National Indemnity took over the liabilities of Equitas through reinsurance.",
        "The crisis transformed Lloyd’s. Corporate capital was admitted from 1994, the chain of security was strengthened, and central oversight became much more rigorous."
      ],
      takeaways: [
        "Names with unlimited liability once provided most of the capital at Lloyd’s.",
        "Asbestos, pollution, catastrophes and the LMX spiral caused huge losses between 1988 and 1992.",
        "Reconstruction and Renewal in 1996 created Equitas, and corporate capital was admitted from 1994."
      ]
    }
  ],
  quiz: [
    {
      q: "What is a syndicate’s capacity?",
      options: [
        "The largest sum insured it may accept on any one risk",
        "The maximum premium, net of acquisition costs, it may accept in a year of account",
        "The total of the claims it can pay",
        "The number of underwriters it employs"
      ],
      answer: 1,
      why: "Capacity limits premium income, and members must support it with capital."
    },
    {
      q: "In the chain of security, which assets are used first to pay a valid claim?",
      options: ["The Central Fund", "Members’ Funds at Lloyd’s", "Syndicate premium trust funds", "The Bank of England"],
      answer: 2,
      why: "Syndicate assets are used first, then members’ Funds at Lloyd’s, then central assets."
    },
    {
      q: "A policy incepts on 1 March 2025. To which year of account does it belong?",
      options: ["2025", "2026", "2027", "Whichever year is open when a claim arrives"],
      answer: 0,
      why: "Policies belong to the year of account in which they incept."
    },
    {
      q: "What does reinsurance to close achieve?",
      options: [
        "It closes a syndicate permanently",
        "It transfers a year of account’s remaining liabilities to a later year or another syndicate, for a premium",
        "It cancels policies that have had no claims",
        "It reinsures the Central Fund"
      ],
      answer: 1,
      why: "RITC allows a year of account to close, so that its members can receive their result."
    },
    {
      q: "What was the LMX spiral?",
      options: [
        "A pricing model for marine risks",
        "Excess of loss reinsurance passed repeatedly among London syndicates, which concentrated losses",
        "The design of the 1986 Lloyd’s building",
        "A method of signing down lines"
      ],
      answer: 1,
      why: "The same losses circled the market several times and ended up concentrated on a small number of syndicates."
    },
    {
      q: "Which company was created in 1996 to reinsure the 1992 and earlier liabilities of Lloyd’s Names?",
      options: ["Equitas", "Velonetic", "Pool Re", "Lloyd’s Insurance Company"],
      answer: 0,
      why: "Equitas separated the old liabilities from the market as part of Reconstruction and Renewal."
    },
    {
      q: "What uplift does Lloyd’s apply to a syndicate’s Solvency II capital requirement when setting members’ capital?",
      options: ["10%", "20%", "35%", "100%"],
      answer: 2,
      why: "The 35% uplift gives Lloyd’s an additional buffer above the regulatory minimum."
    }
  ]
});
