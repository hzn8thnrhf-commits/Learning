/* The Slip — Who’s who */
window.SLIP_DATA = window.SLIP_DATA || {};
(window.SLIP_DATA.modules = window.SLIP_DATA.modules || []).push({
  id: "m02",
  title: "Who’s who",
  short: "Players",
  blurb: "Lloyd’s, the company market, brokers, mutuals and the bodies that hold the market together.",
  outcomes: [
    "Explain why Lloyd’s is a market rather than an insurer, and describe the roles of the Corporation, managing agents, syndicates and members.",
    "Compare a Lloyd’s syndicate with a London company market insurer.",
    "Explain the role of brokers and the difference between retail and wholesale broking.",
    "Describe the roles of P&I clubs, trade associations and the market’s service providers."
  ],
  lessons: [
    {
      title: "Lloyd’s: a market, not an insurer",
      minutes: 5,
      keys: ["Corporation", "Syndicates", "Managing agents", "Members"],
      body: [
        "The most common misunderstanding about Lloyd’s is that it is an insurance company. It is not. **Lloyd’s is a marketplace**, and the insurance is written by the **syndicates** that trade within it. A policy described as a Lloyd’s policy is in fact a contract with the syndicates that subscribed to it.",
        {
          terms: [
            ["The Corporation of Lloyd’s", "Runs the market. It sets rules and standards, approves syndicates’ business plans, monitors their performance, manages the Central Fund and holds the market’s worldwide licences. It does not underwrite risks itself."],
            ["Syndicates", "The underwriting units of the market. Each is a group of members whose capital supports the risks the syndicate writes, and each is identified by a number."],
            ["Managing agents", "Companies that manage syndicates. They employ the underwriters, handle claims and run the business. One managing agent may manage several syndicates."],
            ["Members", "The providers of capital. Most are now corporate members, such as insurance groups and investment vehicles, but some individuals, historically known as Names, still participate."]
          ]
        },
        "Around fifty managing agents manage roughly one hundred syndicates, which together write more than £50bn of premium each year.",
        { fig: "lloyds" },
        { analogy: "Think of a farmers’ market. The operator owns the site, sets the rules, checks standards and decides who may have a stall, but it does not grow or sell any produce. The stallholders, the syndicates, do the trading, with produce supplied by the farms behind them, the members’ capital." },
        "Each syndicate’s underwriters work at a **box** in the Underwriting Room at One Lime Street, where brokers bring risks to them and negotiate face to face or electronically. Because every syndicate shares the Lloyd’s brand, licences and ratings, a policy written by a small specialist syndicate carries the same backing as one written by the largest. That shared strength comes from the **chain of security**, described in the next module."
      ],
      takeaways: [
        "Lloyd’s is a marketplace; the insurance is written by its syndicates.",
        "Managing agents run the syndicates, and members provide the capital.",
        "The Corporation regulates the market and holds its licences and central assets."
      ]
    },
    {
      title: "The company market",
      minutes: 4,
      keys: ["Insurance companies", "IUA", "Own ratings", "Shared slips"],
      body: [
        "Alongside Lloyd’s operates the **company market**: insurance and reinsurance companies that write wholesale and specialty business from London. They are limited companies with their own balance sheets, authorised and supervised by the Prudential Regulation Authority and the Financial Conduct Authority.",
        "Many of these companies are branches or subsidiaries of international groups from the United States, Europe, Bermuda and Asia. Their trade association is the **International Underwriting Association (IUA)**.",
        "The two parts of the market are closely intertwined. Many groups operate both a Lloyd’s syndicate and a London insurance company, and choose the platform that best suits each risk. It is common to see syndicates and companies sharing the same risk on a single slip.",
        { analogy: "If Lloyd’s is a market of independent stalls, the company market is the row of established shops in the same street. Customers move freely between the two, and many families own both a stall and a shop." },
        {
          table: {
            head: ["", "Lloyd’s syndicate", "London company"],
            rows: [
              ["Legal form", "Not a legal entity; its members are on risk", "A limited company"],
              ["Capital", "Members’ funds and the Lloyd’s central assets", "The company’s own balance sheet"],
              ["Licences", "Uses the Lloyd’s worldwide licences", "Needs its own permissions"],
              ["Rating", "Shares the Lloyd’s market rating", "Has its own rating"],
              ["Trade body", "Lloyd’s Market Association (LMA)", "International Underwriting Association (IUA)"]
            ]
          }
        }
      ],
      takeaways: [
        "The company market consists of insurance companies writing wholesale business from London.",
        "Companies rely on their own balance sheets and ratings.",
        "Syndicates and companies frequently share the same risk on one slip."
      ]
    },
    {
      title: "Brokers: the client’s agent",
      minutes: 5,
      keys: ["Agent of the insured", "Retail and wholesale", "Lloyd’s brokers", "Brokerage"],
      body: [
        "Almost all London Market business is placed through a **broker**. Under English law the broker is generally the **agent of the insured** rather than of the insurer, and its task is to obtain the most suitable cover on the best available terms for its client. A broker’s work typically includes:",
        {
          ul: [
            "**Advising** the client on its risks and the cover it needs;",
            "**Presenting** the risk to underwriters fairly and clearly;",
            "**Negotiating** the terms, the price and the choice of leader;",
            "**Placing** the risk by collecting enough lines to complete 100% of it; and",
            "**Servicing** the policy, including amendments, premium collection and claims."
          ]
        },
        "A risk often passes through more than one broker. A **retail** or **producing** broker deals with the client in its own country, perhaps in Texas or Malaysia, and passes the risk to a **wholesale** or **placing** broker with access to London, who takes it to underwriters. Only brokers accredited by Lloyd’s, known as **Lloyd’s brokers**, may place open market business directly with syndicates.",
        { analogy: "A broker is like a buyer’s agent in the property market. The agent works for you, knows which sellers are worth approaching and negotiates on your behalf. The seller must still agree a price, but you do not have to knock on every door yourself." },
        "Brokers are paid by **brokerage**, a percentage of the premium deducted before the premium reaches insurers, and sometimes by fees agreed with the client. The largest international brokers include Marsh, Aon, WTW, Gallagher and Howden, alongside many specialist firms.",
        { note: "Under a typical Terms of Business Agreement (TOBA), premium paid by the client to the broker is treated as paid to the insurer. This arrangement, known as risk transfer, protects the client if the broker fails before passing the money on." },
        { aware: "A broker that also holds a binding authority from an insurer acts for that insurer when binding risks under it. It must manage the resulting conflict of interest carefully and be clear about whom it is representing at each stage." }
      ],
      takeaways: [
        "Brokers generally act for the client, not the insurer.",
        "Risks often pass from a local retail broker to a London wholesale broker.",
        "Only accredited Lloyd’s brokers may place open market business directly with syndicates.",
        "Brokers are paid mainly by brokerage, a percentage of the premium."
      ]
    },
    {
      title: "Mutuals, trade bodies and service providers",
      minutes: 5,
      keys: ["P&I clubs", "LMA and IUA", "LIIBA", "Velonetic"],
      body: [
        "Several other organisations complete the picture of the London Market.",
        { h: "P&I clubs" },
        "**Protection and indemnity (P&I) clubs** are mutual associations owned by their shipowner members. They insure third-party liabilities such as injury to crew, pollution, wreck removal and damage to cargo. Twelve clubs form the **International Group of P&I Clubs**, which together insure about 90% of the world’s ocean-going tonnage. Each club pays claims up to its own retention; larger claims are shared among the clubs through a pooling arrangement, and the largest are protected by a reinsurance programme bought jointly by the Group.",
        { fig: "pi-layers" },
        { analogy: "A P&I club works like a mutual fund set up by a fleet of owners. Each owner pays into the fund every year, through payments called calls, and the fund pays any member’s liabilities. If the fund runs short, members are asked to contribute more." },
        { h: "Trade and market bodies" },
        {
          terms: [
            ["LMA", "The Lloyd’s Market Association represents managing agents and produces standard wordings and clauses for the market."],
            ["IUA", "The International Underwriting Association represents London company market insurers."],
            ["LIIBA", "The London & International Insurance Brokers’ Association represents Lloyd’s and London brokers."],
            ["LMG", "The London Market Group brings these bodies and Lloyd’s together to promote the market as a whole."]
          ]
        },
        { h: "Processing" },
        "**Velonetic**, formerly known as Xchanging, provides much of the market’s back-office processing. It records contracts, accounts for premiums and settles money centrally between brokers and insurers. Around all of these organisations work actuaries, loss adjusters, lawyers, catastrophe modellers, rating agencies and the two regulators, the **PRA** and the **FCA**."
      ],
      takeaways: [
        "P&I clubs are shipowners’ mutuals covering marine liabilities, with large claims pooled and reinsured.",
        "The LMA, IUA and LIIBA represent managing agents, companies and brokers respectively.",
        "Velonetic provides much of the market’s central processing."
      ]
    }
  ],
  quiz: [
    {
      q: "Which statement about Lloyd’s is correct?",
      options: [
        "Lloyd’s is an insurance company that issues policies in its own name",
        "Lloyd’s is a marketplace in which syndicates underwrite risks",
        "Lloyd’s is a broker that places risks with insurers",
        "Lloyd’s is the UK insurance regulator"
      ],
      answer: 1,
      why: "The Corporation runs the market, but the syndicates do the underwriting."
    },
    {
      q: "Who manages a Lloyd’s syndicate from day to day?",
      options: ["The Council of Lloyd’s", "The lead broker", "A managing agent", "The PRA"],
      answer: 2,
      why: "Managing agents employ the underwriters and run the syndicates. The Corporation oversees the market as a whole."
    },
    {
      q: "In whose interest does a London broker generally act?",
      options: ["The insurer’s", "The insured client’s", "Lloyd’s", "The regulator’s"],
      answer: 1,
      why: "Under English law a broker is generally the agent of the insured."
    },
    {
      q: "What do P&I clubs mainly insure?",
      options: [
        "Damage to the ship itself",
        "Shipowners’ third-party liabilities, such as pollution and injury to crew",
        "Cargo owners’ goods in transit",
        "Ports against strike action"
      ],
      answer: 1,
      why: "Damage to the ship is covered by hull insurance and goods in transit by cargo insurance. P&I covers liabilities."
    },
    {
      q: "Which body represents London company market insurers?",
      options: ["LMA", "IUA", "LIIBA", "FCA"],
      answer: 1,
      why: "The International Underwriting Association represents companies; the LMA represents Lloyd’s managing agents."
    },
    {
      q: "A broker in Texas passes a risk to a London broker, who places it with underwriters. What is the London broker usually called?",
      options: ["The retail broker", "The wholesale or placing broker", "The coverholder", "The managing agent"],
      answer: 1,
      why: "The local firm is the retail or producing broker; the London firm is the wholesale or placing broker."
    }
  ]
});
