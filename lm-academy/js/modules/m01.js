/* The Slip — The London Market */
window.SLIP_DATA = window.SLIP_DATA || {};
(window.SLIP_DATA.modules = window.SLIP_DATA.modules || []).push({
  id: "m01",
  title: "The London Market",
  short: "Market",
  blurb: "What the market is, how it began, and why the world’s most complex risks still come to the City of London.",
  outcomes: [
    "Describe what the London Market is and how it differs from the UK retail insurance market.",
    "Name the main parts of the market and explain the subscription principle.",
    "Outline the history of Lloyd’s from Edward Lloyd’s coffee house to the present day.",
    "Explain why large and complex risks continue to be placed in London."
  ],
  lessons: [
    {
      title: "What is the London Market?",
      minutes: 5,
      keys: ["Specialist risks", "Lloyd’s", "Company market", "Subscription"],
      body: [
        "The **London Market** is the part of the UK insurance industry, concentrated in a small area of the City of London, that insures and reinsures large, complex and international risks. Its clients include shipowners and airlines, energy companies and manufacturers, governments and banks, and other insurers seeking reinsurance. The risks it covers range from oil platforms, satellites and supertankers to cyber attacks, political violence and the catastrophe exposures of insurers around the world.",
        "The London Market is quite distinct from the UK’s retail insurance market, which sells motor, household and similar policies to individuals. Most of the business written in London comes from outside the United Kingdom, and almost all of it is commercial: businesses, public bodies and insurers buying protection, rather than private individuals.",
        { h: "The main parts of the market" },
        {
          terms: [
            ["Lloyd’s", "A marketplace in which syndicates underwrite risks, backed by the capital of their members. It is the best-known part of the London Market."],
            ["The company market", "Insurance and reinsurance companies writing wholesale business from London, many of them represented by the International Underwriting Association (IUA)."],
            ["Brokers", "Intermediaries who act for clients, bring risks into the market and negotiate terms with underwriters."],
            ["P&I clubs", "Mutual associations that insure shipowners’ liabilities. Several of the largest are managed from London."]
          ]
        },
        { fig: "market" },
        { h: "The subscription market" },
        "What makes London unusual is the way in which large risks are shared. A single risk is usually written by several insurers, each accepting a percentage of it, in what is called the **subscription market**. One underwriter, the **leader**, negotiates the terms and the price; the others, the **followers**, accept their shares on the same terms. This allows the market to provide very large amounts of cover while each insurer keeps its own share within prudent limits. The subscription principle runs through almost every lesson in this course.",
        { analogy: "Think of a specialist hospital. A local doctor deals with everyday complaints, but when a case is rare, serious or complicated, it is referred to specialists. London is where the world’s insurance referrals go." },
        { note: "The market is also described as the specialty market or the wholesale market. The terms overlap but are not identical: specialty describes the type of risk, while wholesale describes how the business is distributed, through brokers and often through other brokers first." },
        { think: { q: "Why might a London insurer prefer to take only 10% of a large risk rather than all of it?", a: "A small share limits the loss the insurer could suffer from any single risk and lets it spread its capital across many risks. It can then build a diversified portfolio rather than depending on a few very large exposures." } }
      ],
      takeaways: [
        "The London Market insures and reinsures large, complex and mainly international commercial risks.",
        "Its main parts are Lloyd’s, the company market, brokers and P&I clubs.",
        "Large risks are shared in the subscription market: a leader sets the terms and followers subscribe to them."
      ]
    },
    {
      title: "From coffee house to Lime Street",
      minutes: 6,
      keys: ["Edward Lloyd", "Underwriters", "Lutine Bell", "Lloyd’s Act 1871"],
      body: [
        "The London Market grew out of the trading life of seventeenth-century London. Its best-known institution, Lloyd’s, began in a coffee house, and many of its customs, from the slip to the underwriter’s box, still reflect those origins.",
        "In the late 1680s **Edward Lloyd** kept a coffee house in Tower Street, close to the Thames. Ship captains, merchants and shipowners gathered there for news of ships and cargoes, and it became the recognised place to arrange marine insurance. Lloyd moved to larger premises in Lombard Street in 1691.",
        "Insurance was arranged person to person. A merchant’s broker wrote the details of a ship and its voyage on a sheet of paper, and wealthy individuals willing to accept part of the risk wrote their names beneath the details, together with the amount they would cover. From this practice comes the word **underwriter**.",
        { analogy: "It was an early form of crowdfunding, conducted with a quill. Instead of one backer funding the whole venture, many backers each pledged a part, and the list of names on the paper formed the agreement." },
        { h: "Milestones" },
        {
          timeline: [
            ["1688", "Edward Lloyd’s coffee house is first recorded."],
            ["1734", "Lloyd’s List begins publishing shipping news. It is one of the oldest continuously published journals in the world."],
            ["1774", "The underwriters move into the Royal Exchange, leaving the coffee house behind."],
            ["1871", "The Lloyd’s Act incorporates the Society of Lloyd’s."],
            ["1906", "After the San Francisco earthquake, the underwriter Cuthbert Heath instructs his agents to pay policyholders in full, establishing Lloyd’s reputation in the United States."],
            ["1986", "The Richard Rogers building opens at One Lime Street."],
            ["1996", "Reconstruction and Renewal settles the losses of the late 1980s and early 1990s, and Equitas is created."],
            ["2019", "Lloyd’s Insurance Company in Brussels begins writing business, preserving access to EU clients after Brexit."]
          ]
        },
        { h: "The Lutine Bell" },
        "The **Lutine Bell** was recovered from HMS Lutine, which sank in 1799 carrying a cargo of gold insured by Lloyd’s underwriters. It hangs in the Underwriting Room. In the past it was rung when news arrived of an overdue ship: once for a loss and twice for a safe arrival. Today it is rung only on ceremonial occasions.",
        "Some habits of the coffee house survive. Brokers still queue at the underwriters’ **boxes**, their desks in the Underwriting Room, to negotiate face to face, even though a growing share of business is now placed electronically."
      ],
      takeaways: [
        "Lloyd’s began in a seventeenth-century coffee house where marine risks were shared among individuals.",
        "The word underwriter comes from writing one’s name beneath the description of a risk.",
        "Lloyd’s was incorporated in 1871 and has occupied its building at One Lime Street since 1986.",
        "Face-to-face trading survives alongside electronic placement."
      ]
    },
    {
      title: "Why risks come to London",
      minutes: 5,
      keys: ["Expertise", "Capacity", "Licences", "English law"],
      body: [
        "Many countries have large and capable insurers. It is reasonable to ask, then, why a Brazilian airline or a Japanese insurer should bring its risk to a few streets in London. The answer lies in several advantages that reinforce one another.",
        {
          terms: [
            ["Concentrated expertise", "Specialist underwriters, brokers, lawyers, loss adjusters and actuaries for niche classes all work within a short walk of one another."],
            ["Capacity", "By sharing risks, the market can assemble very large limits that no single insurer would wish to carry alone."],
            ["Appetite for the unusual", "London underwriters are accustomed to pricing risks with little data, such as a new design of satellite, a performer’s voice or a war zone."],
            ["Licences and reach", "Lloyd’s can write business in more than 200 countries and territories through its licences and trading rights."],
            ["English law", "Policies are often governed by English law, which has a deep body of insurance case law and respected courts and arbitrators."],
            ["Financial strength", "The Lloyd’s chain of security and the market’s strong ratings make London policies acceptable to clients and regulators worldwide."]
          ]
        },
        "These advantages form a **network effect**. Clients and brokers bring complex risks to London because the expertise is there; the flow of complex risks gives London’s specialists experience and data that are hard to find elsewhere; and that experience attracts further talent and capital. This explains how London has kept its position for more than three centuries despite competition from Bermuda, Zurich, Singapore, Dubai and the US excess and surplus lines market.",
        { fig: "network-effect" },
        { analogy: "It works like a city’s antiques quarter. Dealers gather in the same streets because collectors know to look there, and collectors go there because that is where the dealers are. Each side’s presence sustains the other." },
        { note: "The London Market is not confined to London. Lloyd’s and London companies also write business through offices in Europe, Asia, the Middle East and the Americas, and through local agents with delegated authority. The term describes the hub and its way of doing business." }
      ],
      takeaways: [
        "London combines expertise, capacity, an appetite for unusual risks, global licences, English law and financial strength.",
        "These advantages reinforce one another in a network effect.",
        "The network effect explains London’s long-standing position despite strong competition."
      ]
    }
  ],
  quiz: [
    {
      q: "Which description best fits the London Market?",
      options: [
        "The UK’s main market for personal motor and household insurance",
        "A concentration of insurers, Lloyd’s syndicates and brokers handling large, complex and mainly international risks",
        "A government scheme that reinsures UK catastrophe losses",
        "The insurance department of the London Stock Exchange"
      ],
      answer: 1,
      why: "London specialises in large, complex commercial risks and reinsurance, most of them from outside the UK."
    },
    {
      q: "From what practice does the word underwriter come?",
      options: [
        "Backers wrote their names beneath the description of the risk, with the amount they would cover",
        "Policies were written in the cellar beneath the coffee house",
        "It is a translation of the Latin word for guarantor",
        "The premium was written under the sum insured"
      ],
      answer: 0,
      why: "In Lloyd’s coffee house, those accepting part of a risk signed their names beneath its description."
    },
    {
      q: "What was Edward Lloyd’s original business?",
      options: ["A bank", "A shipping line", "A coffee house", "A newspaper"],
      answer: 2,
      why: "His coffee house became the meeting place for marine insurance. Lloyd’s List came later."
    },
    {
      q: "In the subscription market, what does the leader do?",
      options: [
        "Takes 100% of the risk",
        "Negotiates the terms and price that the followers accept",
        "Represents the client in negotiations",
        "Collects the premium from the client"
      ],
      answer: 1,
      why: "The leader sets the terms; the followers accept their shares on the same terms. The broker represents the client."
    },
    {
      q: "Which of the following is not a reason why risks come to London?",
      options: [
        "Concentrated specialist expertise",
        "The ability to assemble large capacity by sharing risks",
        "A legal requirement that all marine risks worldwide be insured in London",
        "Licences to write business in many countries"
      ],
      answer: 2,
      why: "There is no such requirement. London attracts business through expertise, capacity, reach and financial strength."
    },
    {
      q: "Traditionally, how many times was the Lutine Bell rung for good news?",
      options: ["Once", "Twice", "Three times", "It was rung only for losses"],
      answer: 1,
      why: "One stroke signalled a loss; two signalled good news, such as the safe arrival of an overdue ship."
    }
  ]
});
