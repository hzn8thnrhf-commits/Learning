/* The Slip — The market today */
window.SLIP_DATA = window.SLIP_DATA || {};
(window.SLIP_DATA.modules = window.SLIP_DATA.modules || []).push({
  id: "m11",
  title: "The market today",
  short: "Today",
  blurb: "Regulation, tax and sanctions, London’s global reach, the move to digital trading, and the emerging risks shaping the market.",
  outcomes: [
    "Explain how the PRA, the FCA and Lloyd’s divide the oversight of the London Market.",
    "Describe insurance premium tax, sanctions compliance and financial crime controls.",
    "Explain how London reaches overseas markets, and why the United States matters so much.",
    "Describe the market’s digital modernisation and the emerging risks shaping its future."
  ],
  lessons: [
    {
      title: "Who regulates whom",
      minutes: 6,
      keys: ["PRA and FCA", "Dual regulation", "Lloyd’s oversight", "Consumer Duty"],
      intro: "UK financial regulation is split between two regulators, an arrangement called twin peaks, and Lloyd’s adds a layer of its own. Follow the lines of oversight down from the top, and notice that Lloyd’s is both regulated and a regulator.",
      diagram: {
        cols: 2,
        nodes: [
          {
            id: "pra", at: [1, 1], tone: "ink", label: "PRA", sub: "Safety and soundness",
            teach: "The **Prudential Regulation Authority**, part of the Bank of England, supervises the safety and soundness of insurers: their capital, reserves and governance. Its question is: will this firm be able to pay its claims?",
            like: "Think of a building with two inspectors. One checks the structure won’t fall down: that’s the PRA. The other checks tenants are treated fairly and the fire exits work: that’s the FCA. Lloyd’s is the landlord, with house rules of its own."
          },
          {
            id: "fca", at: [1, 2], tone: "ink", label: "FCA", sub: "Conduct and markets",
            teach: "The **Financial Conduct Authority** supervises conduct: how firms treat customers, the integrity of markets and the prevention of financial crime. It also regulates brokers. Its question is: is this firm behaving properly?"
          },
          {
            id: "lloyds", at: [2, 1], span: 2, tone: "tint", label: "Lloyd’s", sub: "Regulated by both, and a regulator itself",
            teach: "The Society of Lloyd’s is regulated by both the PRA and the FCA, and in turn oversees the managing agents and coverholders in its market through its own rules and standards. Managing agents and London insurance companies are therefore **dual-regulated**, and at Lloyd’s there is a third layer on top.\n\nOverseas, Lloyd’s and London insurers must also satisfy the regulators of every country where they write business."
          },
          {
            id: "agents", at: [3, 1], label: "Managing agents", sub: "PRA, FCA, plus Lloyd’s rules",
            teach: "Managing agents answer to the PRA for prudential matters, the FCA for conduct, and Lloyd’s for how they run their syndicates and oversee their coverholders. London companies outside Lloyd’s have the first two layers only."
          },
          {
            id: "brokers", at: [3, 2], label: "Brokers", sub: "FCA, plus Lloyd’s accreditation",
            teach: "Brokers don’t carry insurance risk, so they are regulated by the FCA alone. To trade directly with syndicates they also need Lloyd’s accreditation, as you saw in Module 02."
          },
          {
            id: "duty", at: [4, 1], span: 2, tone: "brass", label: "The Consumer Duty", sub: "In force since July 2023",
            teach: "The FCA’s **Consumer Duty** raised the standards expected of firms whose products reach retail customers: good outcomes, fair value, clear communication, proper support. It reaches into the London Market where products are sold to consumers and small businesses, often through delegated authority."
          }
        ],
        edges: [
          { from: "pra", to: "lloyds", label: "prudential", teach: "The PRA supervises Lloyd’s and its firms for financial soundness." },
          { from: "fca", to: "lloyds", label: "conduct", teach: "The FCA supervises them for conduct." },
          { from: "lloyds", to: "agents", label: "oversees", teach: "Lloyd’s sets and enforces its own standards for managing agents." },
          { from: "lloyds", to: "brokers", label: "accredits", teach: "Lloyd’s accredits the brokers allowed to place business directly in its market." },
          { from: "agents", to: "duty", label: "for retail", teach: "Where products reach consumers, insurers must show good outcomes and fair value." },
          { from: "brokers", to: "duty", label: "for retail", teach: "Brokers distributing to consumers share that duty." }
        ]
      },
      takeaways: [
        "The PRA supervises financial soundness and the FCA supervises conduct.",
        "Managing agents and insurers are dual-regulated; brokers are regulated by the FCA.",
        "Lloyd’s oversees its own market in addition to the regulators, and the Consumer Duty applies where products reach retail customers."
      ]
    },
    {
      title: "Tax, sanctions and financial crime",
      minutes: 6,
      keys: ["Insurance premium tax", "Sanctions", "OFSI", "Anti-bribery"],
      intro: "Every London policy has to pass three checks before it is safe to write and to pay: is the tax right, is anyone or anything on it sanctioned, and is the money clean? Follow each check down its column.",
      diagram: {
        cols: 3,
        nodes: [
          {
            id: "policy", at: [1, 1], span: 3, tone: "ink", label: "A London policy", sub: "Premium, parties, vessels, territories",
            teach: "A single London policy may cover risks in a dozen countries, involve several parties and, in marine, name ships and cargoes. Each of those facts triggers obligations."
          },
          {
            id: "ipt", at: [2, 1], label: "Premium tax", sub: "UK IPT 12%",
            teach: "Premiums for UK risks are subject to **Insurance Premium Tax** (IPT), charged on top of the premium. The standard rate is 12%; a higher rate of 20% applies to some products, such as travel insurance."
          },
          {
            id: "sanc", at: [2, 2], tone: "bad", label: "Sanctions", sub: "UK, US, EU, UN",
            teach: "London insurers must not provide cover that would breach **sanctions**: UK financial sanctions, enforced by the **Office of Financial Sanctions Implementation** (OFSI), and often US, EU and UN regimes as well.",
            like: "Sanctions screening is like a door supervisor with a list of people who mustn’t be admitted. Insurers check names, vessels and countries before binding and again before paying claims, because the list changes constantly."
          },
          {
            id: "crime", at: [2, 3], label: "Financial crime", sub: "Laundering, bribery, fraud",
            teach: "Firms must prevent **money laundering**, **bribery** under the Bribery Act 2010, and fraud."
          },
          {
            id: "alloc", at: [3, 1], label: "By territory", sub: "Each country taxes its share",
            teach: "Other countries levy their own premium taxes, so London policies must **allocate premium between territories** to calculate the tax correctly. That is what the MRC’s Fiscal and Regulatory section is for."
          },
          {
            id: "clause", at: [3, 2], label: "Sanctions clauses", sub: "Suspend cover or payment",
            teach: "Policies contain **sanctions clauses** that suspend cover or payment where providing it would breach sanctions. The insurer can’t pay a claim to a party that became sanctioned after the policy was written."
          },
          {
            id: "scrutiny", at: [3, 3], label: "Extra scrutiny", sub: "Where the risk is higher",
            teach: "Commission payments, delegated authority arrangements and business from higher-risk territories all get particular scrutiny, because that is where improper payments are easiest to hide."
          },
          {
            id: "marine", at: [4, 1], span: 3, tone: "brass", label: "Marine is most exposed", sub: "Ships, cargoes, owners and the oil price cap",
            teach: "Marine insurance is especially exposed, because ships, cargoes and owners may all be sanctioned, and ownership can be hard to trace. The price cap on Russian oil has required insurers to obtain confirmation of the prices at which cargoes were bought before covering them."
          }
        ],
        edges: [
          { from: "policy", to: "ipt", teach: "First check: the tax." },
          { from: "policy", to: "sanc", teach: "Second: sanctions." },
          { from: "policy", to: "crime", teach: "Third: financial crime." },
          { from: "ipt", to: "alloc", label: "needs", teach: "Correct tax needs premium allocated to each territory." },
          { from: "sanc", to: "clause", label: "written as", teach: "Sanctions obligations are built into the wording." },
          { from: "crime", to: "scrutiny", label: "drives", teach: "Crime risk drives closer checks on payments and partners." },
          { from: "clause", to: "marine", label: "tested in", teach: "Nowhere are sanctions clauses tested harder than in marine." }
        ]
      },
      takeaways: [
        "UK insurance premium tax is 12% at the standard rate and 20% for some products; premium is allocated between territories.",
        "Sanctions compliance, enforced in the UK by OFSI, is critical, particularly in marine insurance.",
        "Anti-bribery and anti-money laundering rules apply throughout the market."
      ]
    },
    {
      title: "Going global",
      minutes: 5,
      keys: ["200+ territories", "Lloyd’s Europe", "Overseas platforms", "US surplus lines"],
      intro: "Most London business comes from abroad, so access to overseas markets is essential. Follow London’s reach outwards, and notice how much weight falls on one country.",
      diagram: {
        cols: 2,
        gapX: 56,
        nodes: [
          {
            id: "london", at: [1, 1], span: 2, tone: "ink", label: "London", sub: "Licences in 200+ territories",
            teach: "Lloyd’s can write business in more than 200 countries and territories, through licences and trading rights negotiated centrally on behalf of the whole market.",
            like: "Lloyd’s licences work like an airline’s landing rights. One carrier negotiates permission to land at hundreds of airports, and every aircraft in its fleet may then use them."
          },
          {
            id: "us", at: [2, 1], tone: "tint", label: "The United States", sub: "About half of Lloyd’s premium",
            teach: "The United States is Lloyd’s largest market, accounting for around half of its premium, a relationship that goes back to San Francisco in 1906."
          },
          {
            id: "eu", at: [2, 2], label: "Lloyd’s Europe", sub: "Brussels, since 2019",
            teach: "**Lloyd’s Insurance Company S.A.**, based in Brussels, was set up so the market could keep writing EU business after Brexit. It began writing policies in 2019."
          },
          {
            id: "esl", at: [3, 1], label: "Excess and surplus lines", sub: "Risks US insurers won’t take",
            teach: "Lloyd’s is a leading writer of US **excess and surplus lines**: risks that standard US insurers won’t accept, written outside the usual state licensing system. Much of it arrives through MGAs and coverholders."
          },
          {
            id: "asia", at: [3, 2], label: "Asia and the Middle East", sub: "Singapore, Shanghai, Dubai",
            teach: "Lloyd’s platforms in **Singapore** (Lloyd’s Asia), **Shanghai** (Lloyd’s China) and the **Dubai** International Financial Centre let syndicates write regional business locally."
          },
          {
            id: "drive", at: [4, 1], span: 2, tone: "brass", label: "US trends drive London’s results", sub: "Regulation, litigation, catastrophes",
            teach: "Because so much premium is American, US regulation, litigation trends such as social inflation, and US catastrophes have a particularly strong influence on London’s results. Growth elsewhere helps balance that dependence."
          }
        ],
        edges: [
          { from: "london", to: "us", label: "largest", teach: "The biggest share of London’s business is American." },
          { from: "london", to: "eu", label: "post-Brexit", teach: "EU business now flows through the Brussels company." },
          { from: "us", to: "esl", label: "largely", teach: "Much of the US business is excess and surplus lines." },
          { from: "eu", to: "asia", label: "plus", teach: "Local platforms extend the reach into Asia and the Gulf." },
          { from: "esl", to: "drive", label: "makes", teach: "Dependence on the US makes American trends London’s trends." },
          { from: "asia", to: "drive", label: "balances", teach: "Growth in other regions balances that dependence." }
        ]
      },
      takeaways: [
        "Lloyd’s holds licences and trading rights in more than 200 countries and territories.",
        "Lloyd’s Europe, in Brussels, preserves access to EU business after Brexit; platforms in Singapore, Shanghai and Dubai serve those regions.",
        "The United States is London’s largest market, so US trends strongly shape London’s results."
      ]
    },
    {
      title: "Going digital",
      minutes: 5,
      keys: ["Electronic placing", "Blueprint Two", "Core Data Record", "ACORD"],
      intro: "For a market that still values face-to-face negotiation, the move to digital has been a long one. Follow it from the paper slip to the goal at the bottom right, and see where the real saving comes from.",
      diagram: {
        cols: 2,
        gapX: 60,
        nodes: [
          {
            id: "paper", at: [1, 1], tone: "q", label: "Paper slips", sub: "Typed, stamped, re-keyed",
            teach: "For centuries the slip was paper. Each party then typed the same details into its own systems, again and again, for accounting, tax and claims, with errors creeping in at every step."
          },
          {
            id: "face", at: [1, 2], label: "Face to face", sub: "Still valued",
            teach: "The market still values negotiating complex risks in person, at the boxes. Modernisation aims to keep that judgement while removing the paper."
          },
          {
            id: "eplace", at: [2, 1], span: 2, tone: "tint", label: "Electronic placing", sub: "PPL and Whitespace",
            teach: "Platforms such as **PPL** and **Whitespace** let brokers and underwriters negotiate and bind MRC contracts electronically. They have replaced most paper slips."
          },
          {
            id: "bp2", at: [3, 1], span: 2, label: "Blueprint Two", sub: "Processing around structured data",
            teach: "**Blueprint Two** is the market’s programme to digitise processing around structured data. Its timetable has been revised several times, which tells you how hard it is to change a market of hundreds of firms at once.",
            like: "Moving from paper slips to structured data is like moving from recipes scribbled on cards to a shared recipe app. With cards, every cook copies the ingredients by hand and mistakes creep in; with the app, the recipe is entered once and everyone sees the same version."
          },
          {
            id: "cdr", at: [4, 1], tone: "good", label: "Core Data Record", sub: "Entered once, reused",
            teach: "At its heart is the **Core Data Record**, which captures each contract’s details once and reuses them for accounting, tax and claims. The model shows why entering data once matters so much."
          },
          {
            id: "acord", at: [4, 2], label: "ACORD standards", sub: "Common formats",
            teach: "**ACORD** standards are common data formats that let brokers’ and insurers’ systems exchange information without re-keying."
          },
          {
            id: "lab", at: [5, 1], label: "Lloyd’s Lab", sub: "Insurtech accelerator",
            teach: "The **Lloyd’s Lab** is an accelerator for insurtech start-ups working with the market, a way of bringing new tools in from outside."
          },
          {
            id: "aim", at: [5, 2], tone: "good", label: "Lower costs, faster money", sub: "And the same expertise",
            teach: "The aim is to cut the cost of doing business in London, often said to be high compared with rival centres, and to speed up premium and claims payments, while keeping the expertise and subscription model that make the market distinctive."
          }
        ],
        edges: [
          { from: "paper", to: "eplace", label: "replaced by", teach: "Electronic platforms replaced the paper slip." },
          { from: "face", to: "eplace", label: "alongside", teach: "Face-to-face negotiation continues alongside electronic binding." },
          { from: "eplace", to: "bp2", label: "next", teach: "Digital placing was the first step; digital processing is the next." },
          { from: "bp2", to: "cdr", label: "built on", teach: "Blueprint Two rests on capturing data once." },
          { from: "bp2", to: "acord", label: "uses", teach: "Common standards let systems talk to each other." },
          { from: "cdr", to: "aim", label: "delivers", teach: "Data entered once means fewer errors, lower costs and faster payments." },
          { from: "acord", to: "aim", label: "enables", teach: "Shared formats make that possible across firms." },
          { from: "lab", to: "aim", label: "speeds", teach: "New tools from start-ups speed the change." }
        ]
      },
      explore: "rekeying",
      takeaways: [
        "Electronic placing platforms have replaced most paper slips.",
        "Blueprint Two aims to digitise processing around structured data and a Core Data Record.",
        "Lower costs and faster processing are central to London’s competitiveness."
      ]
    },
    {
      title: "Emerging risks",
      minutes: 6,
      keys: ["Climate", "Cyber", "Artificial intelligence", "Protection gap"],
      intro: "London’s advantage has always rested on its willingness to insure new risks. Four themes are reshaping the market now. Follow them down to the gap between what is lost and what is insured, and to the tools for narrowing it.",
      diagram: {
        cols: 4,
        nodes: [
          {
            id: "new", at: [1, 1], span: 4, tone: "ink", label: "London’s edge: new risks", sub: "Insuring what others won’t yet",
            teach: "From the first marine policies to satellites and cyber, London has made its living by insuring risks before anyone has much data about them.",
            like: "Underwriting emerging risks is like charting a coastline while sailing along it. There is no complete map, so you take soundings, proceed with care and share what you learn."
          },
          {
            id: "climate", at: [2, 1], label: "Climate", sub: "More and worse events",
            teach: "**Climate change** brings more intense catastrophes and greater losses from floods and wildfires, plus transition risks as economies decarbonise. Yesterday’s loss history understates tomorrow’s risk; the model shows what that does to prices."
          },
          {
            id: "cyber", at: [2, 2], label: "Cyber", sub: "Fast growth, systemic",
            teach: "**Cyber** demand is growing rapidly, together with the challenge of systemic events that could hit thousands of policyholders at once."
          },
          {
            id: "geo", at: [2, 3], label: "Politics", sub: "War, sanctions",
            teach: "**Geopolitics**: wars, sanctions and political violence affect marine, aviation, political risk and terrorism covers, as the Black Sea, the Red Sea and the aircraft in Russia have shown."
          },
          {
            id: "ai", at: [2, 4], label: "AI", sub: "New liabilities, new tools",
            teach: "**Artificial intelligence** brings new liabilities from errors and misuse of AI, and new tools that help underwriters and claims handlers."
          },
          {
            id: "gap", at: [3, 1], span: 4, tone: "bad", label: "The protection gap", sub: "The share of economic loss that is uninsured",
            teach: "The **protection gap** is the share of economic losses that nobody has insured. When risks grow faster than insurance, or prices rise beyond what people can pay, the gap widens, and the losses fall on households, businesses and governments. Narrowing it is a shared aim of insurers and governments."
          },
          {
            id: "para", at: [4, 1], span: 2, tone: "good", label: "Parametric cover", sub: "Fast, simple payouts",
            teach: "**Parametric insurance** pays quickly when measured data, such as wind speed or rainfall, crosses a trigger. Its speed and simplicity can help close protection gaps in developing countries, at the price of the basis risk you met in Module 09."
          },
          {
            id: "schemes", at: [4, 3], span: 2, label: "Pool Re and Flood Re", sub: "Government-backed",
            teach: "Government-backed schemes cover some risks the private market can’t carry alone: **Pool Re** reinsures UK terrorism risk and **Flood Re** helps keep household flood cover affordable in the UK."
          }
        ],
        edges: [
          { from: "new", to: "climate", teach: "The physical world is changing." },
          { from: "new", to: "cyber", teach: "The digital world creates new perils." },
          { from: "new", to: "geo", teach: "The political world is less stable." },
          { from: "new", to: "ai", teach: "And new technology creates new liabilities." },
          { from: "climate", to: "gap", label: "widens", teach: "Rising catastrophe costs push prices up and cover out of reach." },
          { from: "cyber", to: "gap", teach: "Much cyber risk is still uninsured, especially for small firms." },
          { from: "gap", to: "para", label: "narrowed", teach: "Parametric cover can reach places traditional insurance doesn’t." },
          { from: "gap", to: "schemes", label: "backstop", teach: "Where the market can’t carry the risk alone, governments step in." }
        ]
      },
      explore: "climate-cost",
      takeaways: [
        "Climate change, cyber, geopolitics and artificial intelligence are reshaping demand for insurance.",
        "The protection gap is the uninsured share of economic losses; parametric cover can help close it.",
        "Pool Re and Flood Re support UK terrorism and household flood risks."
      ]
    }
  ],
  quiz: [
    {
      q: "Which regulator supervises the capital and financial soundness of UK insurers?",
      options: ["FCA", "PRA", "OFSI", "Lloyd’s"],
      answer: 1,
      why: "The Prudential Regulation Authority, part of the Bank of England, is the prudential regulator."
    },
    {
      q: "What is the standard rate of UK Insurance Premium Tax?",
      options: ["5%", "12%", "20%", "25%"],
      answer: 1,
      why: "The standard rate is 12%; a higher rate of 20% applies to some products such as travel insurance."
    },
    {
      q: "Why was Lloyd’s Insurance Company S.A. established in Brussels?",
      options: [
        "To reduce UK tax",
        "To continue writing EU business after Brexit",
        "To run Lloyd’s claims processing",
        "To replace the Corporation of Lloyd’s"
      ],
      answer: 1,
      why: "After Brexit, Lloyd’s needed an insurer authorised in the EU to continue serving EU clients."
    },
    {
      q: "Which country is Lloyd’s largest market?",
      options: ["The United Kingdom", "China", "The United States", "Germany"],
      answer: 2,
      why: "The United States accounts for around half of Lloyd’s premium."
    },
    {
      q: "What is Pool Re?",
      options: [
        "A reinsurance pool for UK household flood",
        "A government-backed reinsurer for UK terrorism risk",
        "A P&I club",
        "A Lloyd’s syndicate"
      ],
      answer: 1,
      why: "Pool Re covers UK terrorism; Flood Re supports UK household flood cover."
    },
    {
      q: "What does Blueprint Two aim to do?",
      options: [
        "Rebuild the Lloyd’s building",
        "Digitise market processing around structured data",
        "Replace brokers with algorithms",
        "Merge Lloyd’s with the company market"
      ],
      answer: 1,
      why: "It aims to capture contract data once and reuse it for accounting, tax and claims."
    },
    {
      q: "For what is OFSI responsible?",
      options: ["Implementing UK financial sanctions", "Insurance premium tax", "Lloyd’s capital", "Claims arbitration"],
      answer: 0,
      why: "The Office of Financial Sanctions Implementation enforces UK financial sanctions."
    }
  ]
});
