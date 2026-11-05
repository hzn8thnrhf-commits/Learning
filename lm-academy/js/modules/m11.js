/* The Slip — The market today */
window.SLIP_DATA = window.SLIP_DATA || {};
(window.SLIP_DATA.modules = window.SLIP_DATA.modules || []).push({
  id: "m11",
  title: "The market today",
  short: "Today",
  blurb: "Regulation, tax, sanctions, global reach, digital modernisation and the risks shaping the market’s future.",
  outcomes: [
    "Describe how the PRA, the FCA and Lloyd’s regulate the London Market.",
    "Explain insurance premium tax, sanctions and financial crime obligations.",
    "Describe how Lloyd’s and London insurers reach overseas markets.",
    "Describe the market’s programme of digital modernisation.",
    "Identify the emerging risks that are shaping the market."
  ],
  lessons: [
    {
      title: "Who regulates whom",
      minutes: 5,
      keys: ["PRA and FCA", "Dual regulation", "Lloyd’s oversight", "Consumer Duty"],
      body: [
        "Financial regulation in the United Kingdom is divided between two regulators, an arrangement sometimes described as **twin peaks**.",
        {
          terms: [
            ["PRA", "The Prudential Regulation Authority, part of the Bank of England, supervises the safety and soundness of insurers: their capital, reserves and governance."],
            ["FCA", "The Financial Conduct Authority supervises conduct: how firms treat their customers, the integrity of markets and the prevention of financial crime. It also regulates brokers."],
            ["Lloyd’s", "The Society of Lloyd’s is regulated by both, and in turn oversees managing agents and coverholders through its own rules and standards."]
          ]
        },
        "Managing agents and London insurance companies are therefore **dual-regulated** by the PRA and the FCA, while brokers are regulated by the FCA alone. Lloyd’s adds a third layer of oversight for its own market.",
        { fig: "regulators" },
        { analogy: "Think of a building with two inspectors. One checks that the structure will not fall down, which is the PRA’s role; the other checks that tenants are treated fairly and that the fire exits work, which is the FCA’s. Lloyd’s is the landlord, with house rules of its own." },
        "The FCA’s **Consumer Duty**, in force since July 2023, raised the standards expected of firms whose products reach retail customers. It applies to some London Market products, particularly those sold to consumers and small businesses through delegated authority.",
        "Overseas, Lloyd’s and London insurers must also satisfy the regulators of each country in which they write business."
      ],
      takeaways: [
        "The PRA supervises financial soundness and the FCA supervises conduct.",
        "Managing agents and insurers are dual-regulated; brokers are regulated by the FCA.",
        "Lloyd’s oversees its own market in addition to the regulators."
      ]
    },
    {
      title: "Tax, sanctions and financial crime",
      minutes: 5,
      keys: ["Insurance premium tax", "Sanctions", "OFSI", "Anti-bribery"],
      body: [
        { h: "Insurance premium tax" },
        "Premiums for UK risks are subject to **Insurance Premium Tax (IPT)**, charged in addition to the premium. The standard rate is 12%, and a higher rate of 20% applies to certain products such as travel insurance. Other countries levy their own premium taxes, so London policies must allocate premium between territories in order to calculate the tax correctly.",
        { h: "Sanctions" },
        "London insurers must not provide cover that would breach **sanctions**. These include UK financial sanctions, enforced by the **Office of Financial Sanctions Implementation (OFSI)**, and frequently US, EU and UN regimes as well. Marine insurance is especially exposed, because ships, cargoes and owners may all be sanctioned, and the price cap on Russian oil has required insurers to obtain confirmation of the prices at which cargoes were bought.",
        "Policies contain **sanctions clauses** that suspend cover or payment where providing it would breach sanctions.",
        { analogy: "Sanctions screening is like a door supervisor with a list of people who must not be admitted. Insurers check names, vessels and countries both before binding and before paying claims, because the list changes constantly." },
        { h: "Financial crime" },
        "Firms must also prevent **money laundering**, **bribery**, under the Bribery Act 2010, and fraud. Commission payments, delegated authority arrangements and business from higher-risk territories all receive particular scrutiny."
      ],
      takeaways: [
        "UK insurance premium tax is 12% at the standard rate and 20% for some products.",
        "Sanctions compliance is critical, particularly in marine insurance.",
        "Anti-bribery and anti-money laundering rules apply throughout the market."
      ]
    },
    {
      title: "Going global",
      minutes: 4,
      keys: ["200+ territories", "Lloyd’s Europe", "Overseas platforms", "US surplus lines"],
      body: [
        "Most London business comes from abroad, so access to overseas markets is essential. Lloyd’s can write business in more than 200 countries and territories through licences and trading rights negotiated centrally on behalf of the whole market.",
        {
          terms: [
            ["Lloyd’s Europe", "Lloyd’s Insurance Company S.A., based in Brussels, was established so that the market could continue to write EU business after Brexit. It began writing policies in 2019."],
            ["Lloyd’s Asia", "A platform in Singapore that allows syndicates to write regional business locally."],
            ["Lloyd’s China", "A platform in Shanghai for reinsurance and direct business."],
            ["Lloyd’s Dubai", "A platform in the Dubai International Financial Centre serving the Middle East."],
            ["US surplus lines", "Lloyd’s is a leading writer of US excess and surplus lines business: risks that standard US insurers will not accept."]
          ]
        },
        { analogy: "Lloyd’s licences work like an airline’s landing rights. One carrier negotiates permission to land at hundreds of airports, and every aircraft in its fleet may then use them." },
        "The United States is Lloyd’s largest market, accounting for around half of its premium, so American regulation, litigation trends and catastrophes have a particularly strong influence on London’s results."
      ],
      takeaways: [
        "Lloyd’s holds licences and trading rights in more than 200 countries and territories.",
        "Lloyd’s Europe, in Brussels, preserves access to EU business after Brexit.",
        "The United States is London’s largest market."
      ]
    },
    {
      title: "Going digital",
      minutes: 5,
      keys: ["Electronic placing", "Blueprint Two", "Core Data Record", "ACORD"],
      body: [
        "For a market that still values face-to-face negotiation, the move to digital processes has been a long one. Its principal elements are described below.",
        {
          terms: [
            ["Electronic placing", "Platforms such as PPL and Whitespace allow brokers and underwriters to negotiate and bind MRC contracts electronically, and have replaced most paper slips."],
            ["Blueprint Two", "The market’s programme to digitise processing around structured data, with a Core Data Record that captures the details of each contract once and reuses them for accounting, tax and claims. Its timetable has been revised several times."],
            ["Lloyd’s Lab", "An accelerator for insurtech start-ups working with the market."],
            ["ACORD standards", "Common data formats that allow the systems of brokers and insurers to exchange information."]
          ]
        },
        { analogy: "Moving from paper slips to structured data is like moving from recipes scribbled on cards to a shared recipe application. With cards, every cook copies the ingredients by hand and mistakes creep in; with the application, the recipe is entered once and everyone sees the same version." },
        "The aim is to reduce the cost of doing business in London, which is often said to be high compared with rival centres, and to speed up the payment of premiums and claims, while preserving the expertise and the subscription model that make the market distinctive."
      ],
      takeaways: [
        "Electronic placing platforms have replaced most paper slips.",
        "Blueprint Two aims to digitise processing around structured data and a Core Data Record.",
        "Lower costs and faster processing are central to London’s competitiveness."
      ]
    },
    {
      title: "Emerging risks",
      minutes: 5,
      keys: ["Climate", "Cyber", "Artificial intelligence", "Protection gap"],
      body: [
        "London’s advantage has always rested on its willingness to insure new risks. Several themes are shaping the market today.",
        {
          terms: [
            ["Climate change", "More intense catastrophes, greater losses from floods and wildfires, and transition risks as economies decarbonise."],
            ["Cyber", "Rapidly growing demand, together with the challenge of systemic events that could affect thousands of policyholders at once."],
            ["Geopolitics", "Wars, sanctions and political violence, affecting marine, aviation, political risk and terrorism covers."],
            ["Artificial intelligence", "New liabilities arising from errors and misuse of AI, alongside AI tools that assist underwriters and claims handlers."],
            ["Parametric insurance", "Rapid payouts triggered by measured data, which can help to close protection gaps in developing countries."],
            ["The protection gap", "The share of economic losses that is uninsured. Narrowing it is a shared aim of insurers and governments."]
          ]
        },
        "Government-backed schemes cover some risks that the private market cannot carry alone, such as **Pool Re** for UK terrorism and **Flood Re** for household flood risk in the United Kingdom.",
        { analogy: "Underwriting emerging risks is like charting a coastline while sailing along it. There is no complete map, so you take soundings, proceed with care and share what you learn." }
      ],
      takeaways: [
        "Climate change, cyber, geopolitics and artificial intelligence are reshaping demand for insurance.",
        "Parametric cover can help to close the protection gap.",
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
