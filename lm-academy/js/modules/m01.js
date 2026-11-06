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
      minutes: 6,
      keys: ["Specialist risks", "Brokers", "Lloyd’s and companies", "Subscription"],
      intro: "Let’s begin with a map. When a risk is too big or too unusual for a local insurer, say a fleet of tankers or an oil refinery, it travels to a few streets in the City of London. Follow it from the client at the top to the capital at the bottom, and tap each box as you go.",
      diagram: {
        cols: 2,
        nodes: [
          {
            id: "client", at: [1, 1], span: 2, tone: "ink", label: "The client", sub: "Shipowner, airline, energy firm, insurer",
            teach: "Start by noticing who the clients are. They are businesses, public bodies and other insurers, not private individuals: a Greek shipowner, a Brazilian airline, a Japanese insurer buying reinsurance. Most are based outside the UK.\n\nWhat they have in common is a risk that is too large, too complex or too international for their home market to handle comfortably. That is the defining feature of London business, and it is why the UK’s retail market for car and home insurance is a different world altogether.",
            like: "Think of a specialist hospital. Your local doctor deals with everyday complaints, but a rare or complicated case is referred to specialists. London is where the world’s insurance referrals go."
          },
          {
            id: "broker", at: [2, 1], span: 2, label: "The broker", sub: "Acts for the client",
            teach: "The broker is the client’s agent, and that is the first thing to get straight: brokers work for the buyer, not for the insurers. They prepare the risk, choose which underwriters to approach, negotiate the price and the wording, and later help the client with claims.\n\nAlmost nothing reaches a London underwriter without a broker. That isn’t a law of nature; it is simply how the market is organised, and it means the broker’s skill shapes what cover the client ends up with."
          },
          {
            id: "slip", at: [3, 1], span: 2, tone: "brass", label: "The slip", sub: "One contract, many insurers",
            teach: "The broker summarises the risk in a standard document, today called the Market Reform Contract, though everyone still says slip. Each insurer that agrees to take part writes its percentage, its **line**, on it.\n\nWhy share at all? Because a refinery worth £2bn is far too much for any one insurer, but 5% of it is perfectly comfortable. Spreading one risk across many insurers is the **subscription market**, and it is London’s defining idea. You will meet it in almost every lesson from here on."
          },
          {
            id: "lloyds", at: [4, 1], label: "Lloyd’s syndicates", sub: "Underwriting at Lloyd’s",
            teach: "Lloyd’s is a marketplace, not an insurance company. Inside it, dozens of syndicates compete for business, each run by a managing agent and backed by the capital of its members. The syndicate is the unit that actually accepts a share of a risk.\n\nWe will open up Lloyd’s properly in the next module. For now, picture many independent underwriting teams trading under one roof and one brand."
          },
          {
            id: "companies", at: [4, 2], label: "Insurance companies", sub: "The company market",
            teach: "Alongside Lloyd’s, insurance and reinsurance companies write the same kinds of business from London offices. Many are branches or subsidiaries of global groups, and their trade body is the International Underwriting Association.\n\nOn a large risk you will often find syndicates and companies side by side on the same slip, each taking a line on identical terms. To the client it is one policy, even though dozens of separate insurers stand behind it."
          },
          {
            id: "capital", at: [5, 1], span: 2, tone: "tint", label: "The capital behind them", sub: "Members, shareholders, investors",
            teach: "A promise to pay a claim is only as good as the money behind it. Syndicates are backed by their members, mostly large corporate groups today, and companies by their shareholders. That capital is what the client is really buying access to.\n\nKeep this box in mind. A great deal of the course, from Lloyd’s chain of security to business planning, is about how that capital is protected, measured and put to work."
          }
        ],
        edges: [
          { from: "client", to: "broker", label: "instructs", teach: "The client appoints a broker to place its insurance. Often a broker in the client’s own country appoints a London broker in turn, so there can be two brokers in the chain, each taking a share of the commission." },
          { from: "broker", to: "slip", label: "presents", teach: "The broker turns the client’s needs into a slip and shows it to underwriters, usually starting with the one they would like to lead the risk and set its terms." },
          { from: "slip", to: "lloyds", label: "a line", teach: "A syndicate that likes the risk writes its share, say 10%. From then on it is bound for exactly that share of the premium and of every claim, no more and no less." },
          { from: "slip", to: "companies", label: "a line", teach: "Companies take lines on the same slip and the same terms as the syndicates. Each insurer’s liability is separate: if one fails, the others do not pick up its share." },
          { from: "capital", to: "lloyds", label: "backs", teach: "Members’ capital stands behind each syndicate’s promises. If premiums are not enough to pay the claims, members’ funds are next in line." },
          { from: "capital", to: "companies", label: "backs", teach: "A company’s own balance sheet, funded by its shareholders and supervised by the regulator, stands behind its policies." }
        ]
      },
      explore: "subscription",
      think: { q: "Why might a London insurer prefer to take 10% of a large risk rather than all of it?", a: "A small share caps what it can lose on any one risk, so a single disaster can’t sink it. It also lets the insurer spread its capital across many risks and build a diversified book, rather than depending on a few huge exposures." },
      takeaways: [
        "The London Market insures and reinsures large, complex and mainly international commercial risks.",
        "Clients reach it through brokers, who act for the client.",
        "Large risks are shared on one slip by many insurers, syndicates and companies alike: the subscription market."
      ]
    },
    {
      title: "From coffee house to Lime Street",
      minutes: 6,
      keys: ["Edward Lloyd", "Underwriters", "Lloyd’s Act 1871", "San Francisco 1906"],
      intro: "Why does a modern market still talk about slips, boxes and underwriters? Because many of its habits were formed in a seventeenth-century coffee house and never quite went away. The left column runs through time; the right column shows what each moment left behind.",
      diagram: {
        cols: 2,
        gapX: 66,
        nodes: [
          {
            id: "coffee", at: [1, 1], tone: "ink", label: "Lloyd’s coffee house", sub: "Tower Street, 1688",
            teach: "In the late 1680s Edward Lloyd ran a coffee house near the Thames. Ship captains, merchants and shipowners met there for news of ships and cargoes, so it naturally became the place to arrange marine insurance. Lloyd moved to Lombard Street in 1691.\n\nNotice what Lloyd himself was: a coffee-house keeper, not an insurer. He provided the room and the information; others took the risks. That division, a place that hosts underwriting rather than doing it, survives in Lloyd’s today."
          },
          {
            id: "under", at: [1, 2], label: "Underwriters", sub: "Names written under the risk",
            teach: "A merchant’s broker wrote the details of a ship and voyage on a sheet of paper. Wealthy individuals willing to take part of the risk wrote their names beneath the details, with the amount they would cover. Hence the word **underwriter**.\n\nLook closely and you will see the subscription market already fully formed: one document, many backers, each liable only for their own share.",
            like: "It was crowdfunding with a quill. Instead of one backer funding the whole voyage, many backers each pledged a part, and the list of names on the paper was the agreement."
          },
          {
            id: "list", at: [2, 2], label: "Lloyd’s List", sub: "Shipping news since 1734",
            teach: "Information was the coffee house’s real product. Lloyd’s List, first published in 1734, carried news of ship movements and losses, and it is one of the oldest continuously published journals in the world.\n\nWhy does that matter? An underwriter pricing a voyage needs to know about weather, piracy and port conditions. Being where the news arrived first was a commercial advantage, and London’s concentration of specialist knowledge is still one of its main attractions."
          },
          {
            id: "exchange", at: [2, 1], label: "Royal Exchange", sub: "1774: a society forms",
            teach: "By 1774 the underwriters had outgrown the coffee house and moved into rooms at the Royal Exchange. Leaving the coffee house was a step from an informal gathering towards an organised society with its own committee and rules about who could trade.\n\nThe Lutine Bell, salvaged from a ship insured by Lloyd’s underwriters that sank in 1799 with a cargo of gold, later hung in the Underwriting Room. It was once struck once for a loss and twice for good news."
          },
          {
            id: "act", at: [3, 1], label: "Lloyd’s Act 1871", sub: "Incorporated in law",
            teach: "The Lloyd’s Act 1871 incorporated the Society of Lloyd’s, giving it legal personality and the power to make rules for its members. Later Acts, most importantly in 1982, built the governance structure we will meet in Module 03.\n\nThe key idea is self-regulation within a legal framework: Lloyd’s sets and enforces standards for the businesses that trade in its market, alongside the government regulators."
          },
          {
            id: "sf", at: [4, 1], label: "San Francisco 1906", sub: "Paying in full",
            teach: "After the San Francisco earthquake and fire of 1906, the underwriter Cuthbert Heath reportedly told his agents to pay policyholders in full, irrespective of the terms of their policies.\n\nWhether every detail of the story is exact matters less than what it did: it gave Lloyd’s a reputation in the United States for paying claims, and the US has been Lloyd’s largest market ever since."
          },
          {
            id: "trust", at: [4, 2], tone: "good", label: "A name for paying", sub: "Trust that still sells",
            teach: "An insurance policy is a promise about the future, so reputation is the product. A client choosing between markets is really asking: when the worst happens, will they pay, and quickly?\n\nThat is why claims service and financial strength come up again and again in this course. London’s history gives it a head start, but every bad claims experience spends some of that inheritance."
          },
          {
            id: "lime", at: [5, 1], label: "One Lime Street", sub: "Lloyd’s building, 1986",
            teach: "Lloyd’s moved into Richard Rogers’ building at One Lime Street in 1986, with the Underwriting Room at its heart. A decade later the market settled the crisis of the early 1990s, and in 2019 Lloyd’s Insurance Company in Brussels began writing business to keep access to EU clients after Brexit.\n\nSo the institution has repeatedly reshaped itself while keeping the same basic model: a market, not a company."
          },
          {
            id: "room", at: [5, 2], tone: "brass", label: "The Room today", sub: "Brokers queue at the boxes",
            teach: "Underwriters still sit at **boxes**, desks in the Underwriting Room, and brokers still queue to discuss risks face to face. That is a direct descendant of the coffee-house table.\n\nA growing share of business is now placed electronically, but complex risks are still often negotiated in person. As you will see, the market is trying to keep the judgement of face-to-face trading while removing the paper."
          }
        ],
        edges: [
          { from: "coffee", to: "under", label: "gives us", teach: "The coffee-house way of sharing a voyage among many backers gave the market both its vocabulary and its method." },
          { from: "coffee", to: "exchange", label: "outgrows", teach: "Success brought more underwriters and more rules, and the gathering moved to grander rooms and became a society." },
          { from: "coffee", to: "list", label: "news", fromAt: 0.82, teach: "The coffee house’s stream of shipping news grew into a newspaper, Lloyd’s List, which kept its underwriters better informed than anyone else." },
          { from: "exchange", to: "act", label: "formalised", teach: "The informal society became a legal corporation with the power to make rules for those who trade at Lloyd’s." },
          { from: "act", to: "sf", label: "tested", teach: "A large catastrophe tests any insurer. How the market behaved after 1906 shaped its reputation abroad." },
          { from: "sf", to: "trust", label: "earns", teach: "Paying promptly, even generously, built the trust that still brings American business to London." },
          { from: "sf", to: "lime", teach: "The twentieth century brought growth, then crisis, then reform, ending in the modern market at Lime Street." },
          { from: "lime", to: "room", label: "houses", teach: "The Underwriting Room keeps the old face-to-face habit alive, now alongside electronic placing." }
        ]
      },
      think: { q: "Lloyd’s is often described as a market rather than an insurer. What in its history explains that?", a: "Edward Lloyd never insured anything himself: he ran the place where individual underwriters met and traded. The Society that grew from the coffee house kept that role, providing the premises, the rules and the brand, while the risk is taken by the syndicates and their members." },
      takeaways: [
        "Lloyd’s began in a seventeenth-century coffee house where marine risks were shared among individuals.",
        "The word underwriter comes from writing one’s name beneath the description of a risk.",
        "Lloyd’s was incorporated in 1871, built its reputation by paying claims, and has occupied One Lime Street since 1986.",
        "Face-to-face trading at the boxes survives alongside electronic placement."
      ]
    },
    {
      title: "Why risks come to London",
      minutes: 6,
      keys: ["Network effect", "Expertise", "Capacity", "English law"],
      intro: "Plenty of countries have large, capable insurers, so why would a Brazilian airline or a Japanese insurer bring its risk to a few streets in London? Part of the answer is what London offers. The more interesting part is the loop in the middle, where each advantage feeds the next.",
      diagram: {
        cols: 2,
        nodes: [
          {
            id: "capacity", at: [1, 1], label: "Capacity and security", sub: "Big limits, strong backing",
            teach: "By sharing risks across many insurers, London can assemble very large limits that no single insurer would carry alone. Behind those limits sit strong ratings and, at Lloyd’s, a chain of security with a central fund.\n\nFor a client, that combination means two things: enough cover for a very large risk, and confidence that the policy will be good for the money years later."
          },
          {
            id: "law", at: [1, 2], label: "Law and licences", sub: "English law, worldwide reach",
            teach: "Many London policies are governed by **English law**, which has centuries of insurance case law and respected courts and arbitrators. Certainty about what a contract means is worth a great deal when a large claim is disputed.\n\nLloyd’s also holds licences or trading rights in more than 200 countries and territories, so a London policy can usually be written for a client almost anywhere."
          },
          {
            id: "risks", at: [2, 1], span: 2, tone: "ink", label: "Complex risks come to London", sub: "From clients and brokers worldwide",
            teach: "This is the centre of the loop. Brokers bring their hardest risks to London because the specialists are there: the satellite launch, the war-zone cargo, the cyber tower, a performer’s voice.\n\nThe flow itself is valuable. Every unusual risk London sees teaches its underwriters something that a competitor who never saw it cannot know."
          },
          {
            id: "data", at: [3, 2], label: "Experience and data", sub: "Seen it before",
            teach: "Pricing a risk with little data is London’s speciality, but even judgement needs something to work from. Years of handling unusual risks give London underwriters, claims teams and lawyers a store of experience and loss data that is hard to find elsewhere.\n\nThat experience is a barrier to entry: a new market can raise capital quickly, but it cannot buy decades of claims history overnight."
          },
          {
            id: "expertise", at: [3, 1], label: "Specialist expertise", sub: "Underwriters, brokers, lawyers",
            teach: "Specialist underwriters, brokers, lawyers, loss adjusters and actuaries all work within a short walk of one another. A broker can test a difficult risk with several leading underwriters in a single afternoon.\n\nExpertise is what clients say they are buying, and it is what closes the loop: specialists attract complex risks, and complex risks make the specialists better."
          },
          {
            id: "talent", at: [4, 1], span: 2, tone: "tint", label: "Talent and capital follow", sub: "Careers and investors come to the hub",
            teach: "Ambitious underwriters move to where the interesting work is, and investors put money where the expertise is. Both strengthen London’s ability to take on the next difficult risk.\n\nThis is a **network effect**: each participant makes the market more valuable to the others. It explains how London has kept its position for over three centuries despite strong competition from Bermuda, Zurich, Singapore, Dubai and the US excess and surplus lines market.",
            like: "It works like a city’s antiques quarter. Dealers gather in the same streets because collectors know to look there, and collectors go there because that is where the dealers are. Each side keeps the other coming back."
          }
        ],
        edges: [
          { from: "capacity", to: "risks", label: "pulls in", teach: "Large, secure capacity is the entry ticket: without it, London could not take the biggest risks at all." },
          { from: "law", to: "risks", label: "pulls in", teach: "Clear law and global licences make a London policy usable for a client almost anywhere, and enforceable when things go wrong." },
          { from: "risks", to: "data", label: "builds", fromSide: "b", fromAt: 0.78, toSide: "t", teach: "Each unusual risk written in London adds to the market’s experience: what went wrong, what it cost, how the wording held up." },
          { from: "data", to: "talent", label: "draws in", fromSide: "b", toSide: "t", toAt: 0.78, teach: "A market with the best experience offers the best careers and the best returns, so people and capital are drawn to it." },
          { from: "talent", to: "expertise", label: "deepens", fromSide: "t", fromAt: 0.22, toSide: "b", teach: "New people and capital deepen the pool of specialists and widen what the market can write." },
          { from: "expertise", to: "risks", label: "attracts", fromSide: "t", toSide: "b", toAt: 0.22, teach: "Deeper expertise attracts the next wave of complex risks, and the loop goes round again." }
        ]
      },
      think: { q: "If a rival hub offered cheaper capacity tomorrow, why might London still keep much of its business?", a: "Capacity is only one part of the loop. The rival would still lack the concentrated expertise, experience, legal certainty and track record that London has built up, and clients with complex risks value those as much as price. A network effect is hard to copy quickly." },
      takeaways: [
        "London combines capacity and security, English law, global licences and concentrated expertise.",
        "These advantages reinforce one another in a network effect: risks build experience, experience attracts talent and capital, and that expertise attracts more risks.",
        "The loop explains London’s long-standing position despite strong competition."
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
