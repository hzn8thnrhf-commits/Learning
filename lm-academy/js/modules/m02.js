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
      minutes: 6,
      keys: ["Corporation", "Syndicates", "Managing agents", "Members"],
      intro: "The most common mistake about Lloyd’s is to think it is an insurance company. It isn’t, and this diagram shows why. Notice that the Corporation sits off to one side: it runs the market but never takes a share of a risk. Follow the risk in from the client, and the capital up from the members, and see where they meet.",
      diagram: {
        cols: 2,
        nodes: [
          {
            id: "corp", at: [1, 1], tone: "ink", label: "Corporation of Lloyd’s", sub: "Runs the market",
            teach: "The Corporation runs the market. It sets the rules, approves each syndicate’s business plan, monitors performance, holds the market’s worldwide licences and manages the central assets, including the Central Fund. It is governed by the Council of Lloyd’s.\n\nWhat it does **not** do is underwrite. No risk is ever written by “Lloyd’s” itself. So when a client says it is insured at Lloyd’s, the precise version is: insured by syndicates at Lloyd’s.",
            like: "Think of a farmers’ market. The operator owns the site, sets the rules and decides who may have a stall, but grows and sells nothing. The stallholders do the trading, with produce from the farms behind them."
          },
          {
            id: "client", at: [1, 2], label: "The client", sub: "Wants cover",
            teach: "The client wants cover and has probably never heard of most syndicates. That doesn’t matter. Its contract is with whichever syndicates subscribe to the slip, and the shared Lloyd’s brand, licences and ratings stand behind every one of them.\n\nThis is a large part of what Lloyd’s sells: a client can buy from a small specialist syndicate with the confidence of a very large market."
          },
          {
            id: "agent", at: [2, 1], label: "Managing agent", sub: "Runs the syndicate",
            teach: "A managing agent is a company that runs one or more syndicates. It employs the underwriters, sets strategy, writes the business plan, handles claims and keeps the accounts. Around fifty managing agents operate at Lloyd’s.\n\nNotice the separation: the managing agent runs the business, but the money that pays claims belongs to the members. Separating management from capital is what makes Lloyd’s unusual, and it raises a question of alignment you will meet again when we study MGAs."
          },
          {
            id: "broker", at: [2, 2], label: "Lloyd’s broker", sub: "Acts for the client",
            teach: "Only brokers accredited by Lloyd’s can bring open market business directly to syndicates. The broker takes the client’s risk to the underwriters’ boxes in the Underwriting Room, or presents it electronically, and negotiates on the client’s behalf.\n\nRemember whose side the broker is on: the client’s. The syndicate’s interests are looked after by its own underwriter."
          },
          {
            id: "syndicate", at: [3, 1], span: 2, tone: "tint", label: "A syndicate", sub: "Numbered, and writes lines on risks",
            teach: "The syndicate is the unit that actually accepts the risk. It is not a company and has no legal personality: it is a group of members who each take a share of the business written for a given year of account, identified by a number such as 2001.\n\nBecause every syndicate shares the Lloyd’s brand, licences and ratings, a line from a small syndicate carries the same backing as one from the largest. That shared strength comes from the chain of security in the next module."
          },
          {
            id: "members", at: [4, 1], span: 2, tone: "brass", label: "Members", sub: "Provide the capital",
            teach: "Members provide the capital. Today most are corporate members, often part of the same insurance group as the managing agent, alongside investment vehicles and a small number of individuals, historically called **Names**.\n\nEach member takes a share of a syndicate’s capacity and receives that share of its profit or loss. This is where the risk finally lands: if premiums aren’t enough to pay claims, the members’ funds are next in line."
          }
        ],
        edges: [
          { from: "corp", to: "agent", label: "approves", teach: "Before a syndicate writes a single risk, the Corporation must approve its business plan and capital. It then monitors performance against that plan throughout the year." },
          { from: "client", to: "broker", label: "instructs", teach: "The client appoints the broker to find cover. The broker owes its duties to the client, not to the syndicates." },
          { from: "agent", to: "syndicate", label: "manages", fromSide: "b", toSide: "t", toAt: 0.25, teach: "The managing agent’s underwriters decide which risks the syndicate writes and at what price, within the plan agreed with the Corporation." },
          { from: "broker", to: "syndicate", label: "presents", fromSide: "b", toSide: "t", toAt: 0.75, teach: "The broker shows the risk to the syndicate’s underwriter. If the underwriter likes it, they write a line on the slip, binding the syndicate’s members to that share." },
          { from: "members", to: "syndicate", label: "capital", teach: "Members’ capital backs the syndicate’s promises. In return they receive their share of its underwriting profit, or bear their share of its losses." }
        ]
      },
      think: { q: "A syndicate makes a heavy loss. Who bears it, and who does not?", a: "The syndicate’s members bear it, each in proportion to its share, through the funds they have provided. The Corporation doesn’t bear it as an underwriter, though its central assets stand behind policyholders as a last resort if a member can’t pay. The managing agent loses fees and profit commission but is not the capital provider." },
      takeaways: [
        "Lloyd’s is a marketplace; the insurance is written by its syndicates.",
        "Managing agents run the syndicates, and members provide the capital.",
        "The Corporation sets the rules, approves business plans, and holds the licences and central assets."
      ]
    },
    {
      title: "The company market",
      minutes: 5,
      keys: ["Insurance companies", "Own ratings", "Security", "Shared slips"],
      intro: "Lloyd’s is only half of London. The other half is the company market: insurers that are ordinary limited companies. The diagram puts the two side by side so you can compare what stands behind each, and then shows where they meet, on the same slip.",
      diagram: {
        cols: 2,
        nodes: [
          {
            id: "groups", at: [1, 1], span: 2, tone: "ink", label: "Insurance groups", sub: "Many own both a syndicate and a company",
            teach: "Many of the world’s large insurance groups work in London on both platforms: a managing agent running a Lloyd’s syndicate, and a London insurance company. They choose whichever suits a given risk, for example using Lloyd’s licences in one country and the company’s own rating in another.\n\nSo don’t picture two rival camps. Picture one market with two front doors, often owned by the same people.",
            like: "If Lloyd’s is a market of independent stalls, the company market is the row of established shops in the same street. Customers move freely between them, and many families own both a stall and a shop."
          },
          {
            id: "syndicate", at: [2, 1], label: "Lloyd’s syndicate", sub: "Members on risk",
            teach: "A syndicate isn’t a legal entity; its members are on risk. It trades through the Lloyd’s platform, under Lloyd’s rules, using Lloyd’s licences. Its trade body is the **Lloyd’s Market Association**, the LMA, which also produces many of the market’s standard clauses."
          },
          {
            id: "company", at: [2, 2], label: "London company", sub: "A limited company",
            teach: "A London company is an ordinary limited company, authorised and supervised by the Prudential Regulation Authority and the Financial Conduct Authority. Many are branches or subsidiaries of groups from the United States, Europe, Bermuda and Asia. Their trade body is the **International Underwriting Association**, the IUA."
          },
          {
            id: "lloydsback", at: [3, 1], label: "Shared Lloyd’s backing", sub: "Licences, ratings, Central Fund",
            teach: "Every syndicate shares the Lloyd’s brand, the market’s worldwide licences and its financial strength ratings, with the Central Fund behind them all.\n\nThe consequence is worth stating plainly: a client with a line from a small syndicate gets the same market-level backing as a client with a line from the biggest."
          },
          {
            id: "ownback", at: [3, 2], label: "Its own balance sheet", sub: "Own licences and rating",
            teach: "A company stands on its own feet. It needs its own regulatory permissions in each country where it writes business, and its own rating from agencies such as AM Best or S&P.\n\nThat makes the rating commercially vital. Many brokers and clients will only accept insurers above a minimum rating, so a downgrade can cost a company business almost overnight."
          },
          {
            id: "slip", at: [4, 1], span: 2, tone: "brass", label: "The same slip", sub: "Side by side on one risk",
            teach: "This is where the two halves meet. On a large risk, syndicates and companies take lines side by side on the same slip, on the same terms. The broker checks the **security** for each line: the Lloyd’s market for the syndicates, each company’s own strength for the companies.\n\nEach line is a separate contract. If one insurer fails, the others don’t pick up its share. That is exactly why brokers keep lists of approved security and watch ratings closely."
          }
        ],
        edges: [
          { from: "groups", to: "syndicate", label: "run", teach: "A group’s managing agent runs the syndicate, and the group often provides much of its capital as a corporate member." },
          { from: "groups", to: "company", label: "own", teach: "The same group may own a London company to write business that suits a company balance sheet better." },
          { from: "syndicate", to: "lloydsback", label: "relies on", teach: "A syndicate’s promises are backed by its members’ funds and then by Lloyd’s central assets: the chain of security." },
          { from: "company", to: "ownback", label: "relies on", teach: "A company’s promises are backed only by its own capital, which is why its rating carries such weight with brokers." },
          { from: "lloydsback", to: "slip", label: "security", teach: "For a syndicate’s line, the client’s security is the Lloyd’s market as a whole." },
          { from: "ownback", to: "slip", label: "security", teach: "For a company’s line, the client’s security is that company alone." }
        ]
      },
      think: { q: "Why might a group that already owns a Lloyd’s syndicate also set up a London insurance company?", a: "Each platform has strengths. Lloyd’s offers worldwide licences and a shared rating; a company offers its own balance sheet and rating, which some clients and reinsurance buyers prefer, and can be cheaper to run for some business. Owning both lets the group use whichever suits each risk, client or country." },
      takeaways: [
        "The company market is insurance companies writing wholesale business from London, supervised by the PRA and FCA.",
        "Syndicates share Lloyd’s licences, ratings and central assets; companies rely on their own balance sheets and ratings.",
        "Many groups run both, and syndicates and companies often share one slip."
      ]
    },
    {
      title: "Brokers: the client’s agent",
      minutes: 6,
      keys: ["Agent of the insured", "Retail and wholesale", "Lloyd’s brokers", "Brokerage"],
      intro: "A London risk often passes through two brokers before it reaches an underwriter. Follow the chain down the left-hand side, then look across to the right at what each step means: whose side the broker is on, what lets it into Lloyd’s, and how it gets paid.",
      diagram: {
        cols: 2,
        gapX: 64,
        nodes: [
          {
            id: "client", at: [1, 1], tone: "ink", label: "The client", sub: "A manufacturer in Texas",
            teach: "Our client is a manufacturer in Texas with factories across three continents. It needs property cover larger and more complex than its local market will offer on good terms.\n\nIt doesn’t know London underwriters, and it doesn’t need to. It knows its local broker."
          },
          {
            id: "retail", at: [2, 1], label: "Retail broker", sub: "Producing broker, local",
            teach: "The **retail** or **producing** broker deals with the client in its own country. It knows the client’s business, advises on what cover it needs and gathers the information underwriters will ask for.\n\nWhen the risk is too big or unusual for the local market, the retail broker passes it on to a broker with access to London."
          },
          {
            id: "agent", at: [2, 2], tone: "good", label: "Agent of the insured", sub: "Whose side the broker is on",
            teach: "Under English law a broker is generally the **agent of the insured**. It owes its duties to the client: to advise properly, present the risk fairly, and get the most suitable cover on the best terms it can.\n\nThere is one important wrinkle. A broker that also holds a binding authority from an insurer acts for that insurer when it binds risks under it. That is a conflict of interest the broker must manage and disclose."
          },
          {
            id: "london", at: [3, 1], label: "London broker", sub: "Wholesale or placing broker",
            teach: "The **wholesale** or **placing** broker takes the risk into the London Market. It chooses the leader, presents the risk, negotiates the price and wording, and collects enough lines to complete 100%. Afterwards it services the policy: amendments, premium collection and claims.\n\nUnder a Terms of Business Agreement, premium the client pays to the broker usually counts as paid to the insurer. This **risk transfer** protects the client if the broker fails before passing the money on."
          },
          {
            id: "access", at: [3, 2], label: "Lloyd’s broker", sub: "Accredited to place there",
            teach: "Only brokers accredited by Lloyd’s, called **Lloyd’s brokers**, may place open market business directly with syndicates. Accreditation is Lloyd’s way of checking a broker’s standards, money handling and systems before letting it trade in the Room.\n\nThe largest international brokers, such as Marsh, Aon, WTW, Gallagher and Howden, are all here, alongside many specialist firms."
          },
          {
            id: "uw", at: [4, 1], tone: "tint", label: "Underwriters", sub: "Lead, then followers",
            teach: "The underwriters decide whether to accept a share of the risk and on what terms. The broker usually approaches the leader first and then the followers, as you’ll see in Module 04.\n\nNotice who the underwriter is negotiating with: not the client, but the client’s agent. The quality of the broker’s presentation shapes the price the client pays."
          },
          {
            id: "money", at: [4, 2], tone: "brass", label: "Brokerage", sub: "A slice of the premium",
            teach: "Brokers are paid mainly by **brokerage**, a percentage of the premium that the insurer allows the broker to deduct before passing the rest on. Sometimes the client pays a fee instead, or as well. When two brokers are involved, they share the brokerage.\n\nHere is the subtle point: brokerage is part of what the client pays. If distribution costs rise, either the client pays more or the insurer receives less for the same risk. Try the model to see by how much."
          }
        ],
        edges: [
          { from: "client", to: "retail", label: "instructs", teach: "The client appoints a local broker it knows and trusts." },
          { from: "retail", to: "agent", label: "acts as", teach: "Both brokers in the chain act for the client, not for the insurers." },
          { from: "retail", to: "london", label: "passes on", teach: "The retail broker passes the risk to a wholesale broker with access to London, and the two agree how to share the brokerage." },
          { from: "london", to: "access", label: "is a", teach: "Accreditation as a Lloyd’s broker is what lets the London broker trade directly with syndicates." },
          { from: "london", to: "uw", label: "presents", teach: "The broker presents the risk fairly and negotiates terms, then collects lines until the risk is fully placed." },
          { from: "uw", to: "money", label: "allows", teach: "The insurer agrees a brokerage percentage as a deduction from the gross premium. It is a cost of acquiring the business." }
        ]
      },
      explore: "premium-flow",
      think: { q: "If the broker works for the client, why is it the insurer that pays the brokerage?", a: "In form, the insurer allows the broker to deduct brokerage from the premium. In substance, the client pays it, because brokerage is part of the gross premium the client is charged. That arrangement is a market convention, which is why transparency about brokerage and any extra fees matters so much." },
      takeaways: [
        "Brokers generally act for the client, not the insurer.",
        "Risks often pass from a local retail broker to a London wholesale broker.",
        "Only accredited Lloyd’s brokers may place open market business directly with syndicates.",
        "Brokers are paid mainly by brokerage, a percentage of the premium the client pays."
      ]
    },
    {
      title: "Mutuals, trade bodies and service providers",
      minutes: 6,
      keys: ["P&I clubs", "International Group", "LMA, IUA, LIIBA", "Velonetic"],
      intro: "Two more groups complete the picture. First, the P&I clubs: shipowners insuring each other through mutuals, with a clever way of sharing very large claims. Then the bodies that speak for the market and keep its money moving.",
      diagram: [
        {
          name: "P&I clubs",
          cols: 2,
          gap: 36,
          nodes: [
            {
              id: "owners", at: [1, 1], span: 2, tone: "ink", label: "Shipowners", sub: "Members of their club",
              teach: "**Protection and indemnity (P&I) clubs** are mutual associations owned by their shipowner members. They insure the owners’ liabilities to third parties: injury to crew and passengers, pollution, wreck removal, damage to cargo and collisions not covered by hull insurance.\n\nBecause the members are the owners, there are no shareholders to pay. Any surplus belongs to the members, and any shortfall is theirs too.",
              like: "A P&I club works like a fund set up by a group of shipowners. Each pays in every year, through payments called calls, and the fund pays any member’s liabilities. If it runs short, members are asked for more."
            },
            {
              id: "club", at: [2, 1], span: 2, label: "Their own club", sub: "Pays claims up to its retention",
              teach: "Every claim starts with the member’s own club, which pays it up to the club’s **retention**. Most claims are small enough to stay here.\n\nTwelve clubs, several managed from London, form the **International Group of P&I Clubs**, which together insure about 90% of the world’s ocean-going tonnage."
            },
            {
              id: "pool", at: [3, 1], span: 2, tone: "tint", label: "The pool", sub: "Shared among the International Group",
              teach: "Above the retention, claims are shared among all the International Group clubs through the **pool**. A club with a bad year is helped by the others, and it helps them in turn.\n\nThis is the subscription idea again, applied between mutuals rather than between underwriters on a slip."
            },
            {
              id: "gxl", at: [4, 1], span: 2, tone: "brass", label: "Group reinsurance", sub: "Bought jointly in the market",
              teach: "Above the pool, the clubs buy a large excess of loss reinsurance programme together, much of it placed in London. Buying jointly gives them far more capacity, at a better price, than any one club could get alone.\n\nHere the mutual world meets the commercial one: the clubs become cedants and the reinsurance market takes the largest losses."
            },
            {
              id: "overspill", at: [5, 1], span: 2, tone: "bad", label: "Overspill", sub: "Shared by all the clubs",
              teach: "A claim larger than the whole reinsurance programme is an **overspill** claim, shared among all the clubs and ultimately funded by their members. It has never been a routine event, but it shows where the risk finally rests in a mutual: with the members."
            }
          ],
          edges: [
            { from: "owners", to: "club", label: "pay calls", teach: "Members pay calls to their club each year, set from the club’s view of their record and its own claims." },
            { from: "club", to: "pool", label: "larger claims", teach: "When a claim passes the club’s retention, the excess is shared across the International Group." },
            { from: "pool", to: "gxl", label: "larger still", teach: "Claims beyond the pool are recovered from the Group’s joint reinsurance programme." },
            { from: "gxl", to: "overspill", label: "the extreme", teach: "Only a claim that exhausts the reinsurance would spill over to be shared among all the clubs." }
          ]
        },
        {
          name: "Market bodies",
          intro: "The trade bodies speak for each part of the market, and come together in the London Market Group. Below them, Velonetic keeps the paperwork and the money moving.",
          cols: 2,
          nodes: [
            {
              id: "lma", at: [1, 1], label: "LMA", sub: "Lloyd’s managing agents",
              teach: "The **Lloyd’s Market Association** represents the managing agents at Lloyd’s. Beyond lobbying, it produces many of the standard clauses and wordings the market uses, which is why you’ll see “LMA” followed by a number on so many policies."
            },
            {
              id: "iua", at: [1, 2], label: "IUA", sub: "Company market insurers",
              teach: "The **International Underwriting Association** represents the London company market: the insurers and reinsurers that are limited companies. It too publishes standard clauses and runs market initiatives."
            },
            {
              id: "lmg", at: [2, 1], span: 2, tone: "tint", label: "London Market Group", sub: "The market’s joint voice",
              teach: "The **London Market Group** brings Lloyd’s, the LMA, the IUA and LIIBA together to promote the London Market as a whole and to drive shared projects, such as modernising how business is placed and processed.\n\nWhy does a market of competitors need a joint voice? Because some things, like data standards and the case for London with government, only work if everyone moves together."
            },
            {
              id: "liiba", at: [3, 1], label: "LIIBA", sub: "Brokers",
              teach: "The **London & International Insurance Brokers’ Association** represents the brokers that place business in London, including the Lloyd’s brokers."
            },
            {
              id: "lloyds", at: [3, 2], label: "Lloyd’s", sub: "The Corporation",
              teach: "The Corporation of Lloyd’s sits in the London Market Group alongside the trade bodies. It is both a member of the market’s joint voice and the regulator of its own marketplace."
            },
            {
              id: "velonetic", at: [4, 1], span: 2, tone: "q", label: "Velonetic", sub: "Processing and settlement",
              teach: "**Velonetic**, formerly Xchanging, provides much of the market’s back-office processing. It records contracts, accounts for premiums and claims, and settles the money centrally between brokers and insurers.\n\nAround all of these work actuaries, loss adjusters, lawyers, catastrophe modellers, rating agencies and the two regulators, the **PRA** and the **FCA**."
            }
          ],
          edges: [
            { from: "lma", to: "lmg", teach: "The LMA brings the managing agents’ view to the London Market Group." },
            { from: "iua", to: "lmg", teach: "The IUA brings the company market’s view." },
            { from: "liiba", to: "lmg", teach: "LIIBA brings the brokers’ view." },
            { from: "lloyds", to: "lmg", teach: "Lloyd’s joins as the operator of the largest part of the market." },
            { from: "liiba", to: "velonetic", label: "premiums in", teach: "Brokers submit premiums and claims through central processing, and Velonetic settles the money with each insurer on the slip." }
          ]
        }
      ],
      explore: "pi-claim",
      takeaways: [
        "P&I clubs are shipowners’ mutuals covering liabilities; large claims are pooled across the International Group and then reinsured.",
        "The LMA, IUA and LIIBA represent managing agents, companies and brokers, and meet in the London Market Group.",
        "Velonetic provides much of the market’s central processing and settlement."
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
