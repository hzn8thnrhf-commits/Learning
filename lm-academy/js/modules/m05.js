/* The Slip — Delegated authority */
window.SLIP_DATA = window.SLIP_DATA || {};
(window.SLIP_DATA.modules = window.SLIP_DATA.modules || []).push({
  id: "m05",
  title: "Delegated authority",
  short: "Delegated",
  blurb: "How London capacity reaches small and local risks worldwide through coverholders, binders, MGAs and facilities.",
  outcomes: [
    "Distinguish open market placement from delegated authority and explain why delegation is used.",
    "Describe binding authorities, coverholders, MGAs and third-party administrators.",
    "Explain how insurers oversee delegated business through bordereaux, audits and referral rules.",
    "Describe lineslips, consortia and follow facilities."
  ],
  lessons: [
    {
      title: "Open market and delegated authority",
      minutes: 6,
      keys: ["Open market", "Delegated authority", "Local reach", "Oversight"],
      intro: "London capital reaches clients by two quite different routes. Compare the two columns: on the left, one large, unusual risk seen by an underwriter; on the right, thousands of small ones that no London underwriter ever sees. Notice that both routes end in the same capital.",
      diagram: {
        cols: 2,
        nodes: [
          {
            id: "refinery", at: [1, 1], label: "A refinery", sub: "One big, unusual risk",
            teach: "A refinery, a satellite or a fleet of tankers is large, complex and different from every other risk. It needs an expert to look at it individually, and its premium easily justifies the cost of that attention."
          },
          {
            id: "shops", at: [1, 2], label: "5,000 small shops", sub: "Many standard risks",
            teach: "Five thousand small shops in Italy, or twenty thousand homes in Texas, are a different proposition. Each premium is small, the risks are similar, and the customers expect cover on the spot.\n\nNo London underwriter could look at each one, and none would want to: the cost of doing so would exceed the premium."
          },
          {
            id: "broker", at: [2, 1], label: "The broker", sub: "Presents each risk",
            teach: "In the **open market**, a broker presents each risk to underwriters, as you saw in Module 04. It works well, but every placement takes skilled time from the broker and the underwriter."
          },
          {
            id: "coverholder", at: [2, 2], tone: "tint", label: "A local coverholder", sub: "Binds on the spot",
            teach: "Under **delegated authority**, a local firm, the coverholder, accepts risks, issues documents and sometimes handles claims on the insurer’s behalf, within agreed limits.\n\nThe customer deals with someone nearby, in their own language, and gets cover immediately.",
            like: "Delegated authority resembles a franchise. Head office, the syndicate, designs the menu, sets the prices and writes the hygiene rules. Local franchisees serve customers every day, while head office checks the accounts and inspects the kitchens."
          },
          {
            id: "uw", at: [3, 1], label: "The underwriter", sub: "Decides each risk",
            teach: "The open market underwriter assesses each risk, decides whether to accept it and sets the terms. Judgement is applied risk by risk: slow and costly, but well suited to unusual exposures."
          },
          {
            id: "binder", at: [3, 2], label: "The binding authority", sub: "Rules set in advance",
            teach: "Under delegation, the underwriter’s judgement is exercised once, in advance, when the **binding authority** is written: which classes, territories, limits, rates and wordings the coverholder may use.\n\nThat is the trade: judgement moves from each risk to the rules, so the rules and the firm applying them must be chosen with great care."
          },
          {
            id: "capital", at: [4, 1], span: 2, tone: "ink", label: "The insurer’s capital", sub: "Syndicate or company",
            teach: "Both routes commit the same capital. Delegated authority accounts for a substantial share of Lloyd’s premium, bringing London capacity to smaller, local business far from Lime Street.\n\nBut it places the insurer’s capital in another firm’s hands. That is why selection, clear limits and close oversight are essential, and why this module spends a whole lesson on oversight."
          }
        ],
        edges: [
          { from: "refinery", to: "broker", label: "placed by", teach: "A big, unusual risk is placed individually through a broker." },
          { from: "shops", to: "coverholder", label: "sold by", teach: "Small, standard risks are sold locally by a coverholder." },
          { from: "broker", to: "uw", label: "presents", teach: "The broker shows the risk to the underwriter, who decides." },
          { from: "coverholder", to: "binder", label: "binds within", teach: "The coverholder binds each risk itself, within the limits of the binding authority." },
          { from: "uw", to: "capital", label: "commits", teach: "Each accepted risk commits a share of the insurer’s capital." },
          { from: "binder", to: "capital", label: "commits", teach: "Every risk the coverholder binds commits the same capital, without the underwriter seeing it." }
        ]
      },
      explore: "da-cost",
      takeaways: [
        "In the open market, an underwriter assesses each risk individually.",
        "Under delegated authority, another firm binds risks within limits agreed in advance.",
        "Delegation brings London capacity to small, local business efficiently, but requires close oversight."
      ]
    },
    {
      title: "Coverholders, binders and MGAs",
      minutes: 6,
      keys: ["Binding authorities", "Coverholders", "MGAs", "Third-party administrators"],
      intro: "Delegated authority has its own cast of characters. Start with the managing agent at the top, which grants the authority, and follow it down to the policyholders. Notice who binds the risks, who pays the claims, and what happens to a risk that falls outside the rules.",
      diagram: {
        cols: 2,
        gapX: 66,
        nodes: [
          {
            id: "agent", at: [1, 1], tone: "ink", label: "Managing agent", sub: "Grants the authority",
            teach: "The managing agent, or for a company the insurer itself, provides the capacity and grants the authority. It remains responsible for everything written under it, which is why it must approve whom it delegates to and keep watching them.\n\nAt Lloyd’s, every coverholder must also be approved by Lloyd’s."
          },
          {
            id: "service", at: [1, 2], label: "Service company", sub: "An in-house coverholder",
            teach: "A **service company** is a coverholder owned by a managing agent, writing business for its own syndicates. It lets the group distribute locally without handing authority to an outside firm."
          },
          {
            id: "binder", at: [2, 1], span: 2, tone: "tint", label: "The binding authority", sub: "Classes, limits, rates, wordings",
            teach: "The **binding authority**, or binder, is the contract that delegates authority. It sets out the classes and territories, the maximum limits, the rates or rating rules, the policy wordings to use and the reporting the coverholder must provide.\n\nBinders vary in freedom. Some let the coverholder price and bind freely within guidelines; others require referral for anything outside tight parameters.",
            like: "A binder is like giving a teenager a debit card with rules attached: a spending limit, a list of approved shops and a requirement to keep every receipt. Within those rules, they needn’t ask before each purchase."
          },
          {
            id: "coverholder", at: [3, 1], label: "Coverholder or MGA", sub: "Binds risks locally",
            teach: "A **coverholder** is a company authorised to enter into insurance contracts on behalf of Lloyd’s syndicates under a binding authority. **Managing general agent** (MGA) is the wider industry term for a specialist underwriting business with delegated authority, often holding binders from several insurers.\n\nMGAs have grown rapidly, especially in the United States, as experienced underwriters set up specialist firms and capital providers sought access to their books. Module 14 looks at the business from the MGA’s side."
          },
          {
            id: "tpa", at: [3, 2], label: "Claims administrator", sub: "A TPA settles claims",
            teach: "A **third-party administrator** (TPA) is a firm authorised to handle and settle claims on the insurer’s behalf. Separating claims from sales is a useful control: the firm that wins the business isn’t the one deciding whether to pay its claims."
          },
          {
            id: "refer", at: [4, 1], tone: "brass", label: "Referral", sub: "Outside the rules? Ask first",
            teach: "Anything outside the coverholder’s authority, say a property above the maximum value or one in a flood zone, must be **referred** to the underwriter before binding.\n\nIf a coverholder binds without referring, the insurer may still be bound to a risk it never wanted. Referral rules are only as good as the coverholder’s discipline."
          },
          {
            id: "policy", at: [4, 2], label: "Policyholders", sub: "Local clients",
            teach: "The policyholders deal with the coverholder and, for claims, perhaps the TPA. Many never know their cover is backed by a Lloyd’s syndicate in London, but their policies carry the same chain of security."
          }
        ],
        edges: [
          { from: "agent", to: "service", label: "may own", teach: "Some managing agents own their own coverholders, called service companies." },
          { from: "agent", to: "binder", label: "grants", teach: "The managing agent grants the binding authority and stays responsible for it." },
          { from: "binder", to: "coverholder", label: "authorises", teach: "The binder authorises the coverholder to bind risks within its terms." },
          { from: "binder", to: "tpa", label: "claims authority", teach: "Claims authority may sit with the coverholder or with a separate TPA." },
          { from: "coverholder", to: "refer", label: "if outside", teach: "Risks outside the authority go back to the underwriter before binding." },
          { from: "coverholder", to: "policy", teach: "Within its authority, the coverholder binds cover for local clients." },
          { from: "tpa", to: "policy", label: "pays claims", teach: "The TPA handles claims from those same policyholders." }
        ]
      },
      takeaways: [
        "A binding authority sets the limits within which a coverholder may bind risks.",
        "Lloyd’s approves coverholders; MGA is the broader industry term.",
        "Risks outside the authority must be referred; claims are often handled by third-party administrators."
      ]
    },
    {
      title: "Bordereaux and oversight",
      minutes: 6,
      keys: ["Bordereaux", "Reporting standards", "Audits", "Referral rules"],
      intro: "If an underwriter never sees the risks one by one, how does it know what has been written in its name? Follow the monthly reports up from the coverholder to the managing agent, then see what the agent is looking for.",
      diagram: {
        cols: 6,
        gapX: 12,
        nodes: [
          {
            id: "dd", at: [1, 1], span: 2, label: "Due diligence", sub: "Before appointing",
            teach: "Oversight starts before any risk is bound. **Due diligence** checks the coverholder’s people, systems, finances, controls and track record. Lloyd’s also approves every coverholder for its syndicates."
          },
          {
            id: "ch", at: [1, 3], span: 4, tone: "ink", label: "The coverholder binds", sub: "Hundreds of risks a month",
            teach: "Every month the coverholder binds risks, collects premium and handles claims. The managing agent sees none of it directly, so it depends on what the coverholder reports."
          },
          {
            id: "rb", at: [2, 1], span: 2, label: "Risk", sub: "Each policy bound",
            teach: "A **risk bordereau** lists each policy bound, with the insured, location, sum insured, premium and dates. It is how the insurer learns what it has actually written."
          },
          {
            id: "pb", at: [2, 3], span: 2, label: "Premium", sub: "Money due",
            teach: "A **premium bordereau** shows the premiums collected and due to the insurer, so the insurer can check it is being paid what it is owed."
          },
          {
            id: "cb", at: [2, 5], span: 2, label: "Claims", sub: "Notified, paid, reserved",
            teach: "A **claims bordereau** shows the claims notified, paid and reserved. It is the early-warning system for a book going wrong."
          },
          {
            id: "agent", at: [3, 1], span: 6, tone: "tint", label: "The managing agent reviews", sub: "Monthly, in a standard format",
            teach: "A **bordereau** (plural **bordereaux**) is a regular report, usually monthly. Lloyd’s publishes **coverholder reporting standards** so they follow a common format across the market.\n\nThe agent uses them to monitor what is being written, check compliance with the binder and spot problems early.",
            like: "Bordereaux are the monthly statements for that teenager’s debit card. You don’t approve each purchase in advance, but you do read the statement, and if something odd appears, you ask about it."
          },
          {
            id: "accum", at: [4, 1], span: 2, label: "Accumulation", sub: "Too much in one place?",
            teach: "Are too many of the risks in the same flood plain or the same city block? Only the risk bordereau can tell the insurer how much a single catastrophe would cost it across this binder, and its other business."
          },
          {
            id: "breach", at: [4, 3], span: 2, tone: "bad", label: "Breaches", sub: "Outside authority?",
            teach: "Has the coverholder bound risks it shouldn’t have, in the wrong territory, above the limit or at the wrong rate? A breach can leave the insurer bound to a risk it never wished to accept."
          },
          {
            id: "audit", at: [4, 5], span: 2, label: "Audits", sub: "Check on site",
            teach: "Regular **audits** check on site that the coverholder does what its reports say: that files are complete, money is handled properly and referral rules are followed.\n\nBe aware that data quality has long been the weak point of delegated business. Bordereaux arrive late, incomplete or in inconsistent formats, which is why the market’s modernisation puts so much weight on structured data. Try the model."
          }
        ],
        edges: [
          { from: "dd", to: "ch", teach: "Due diligence comes before any authority is granted." },
          { from: "ch", to: "rb", teach: "The coverholder reports every risk it binds." },
          { from: "ch", to: "pb", teach: "It reports the premium it has collected and owes." },
          { from: "ch", to: "cb", teach: "It reports the claims it has received and paid." },
          { from: "rb", to: "agent", teach: "The risk data shows what the insurer is exposed to." },
          { from: "pb", to: "agent", teach: "The premium data shows whether the insurer is being paid." },
          { from: "cb", to: "agent", teach: "The claims data shows whether the business is profitable." },
          { from: "agent", to: "accum", label: "checks", at: 0.72, teach: "The agent looks for dangerous concentrations." },
          { from: "agent", to: "breach", label: "checks", at: 0.72, teach: "It looks for risks bound outside the authority." },
          { from: "agent", to: "audit", label: "follows up", at: 0.72, teach: "Anything odd prompts questions, and audits verify what the reports claim." }
        ]
      },
      explore: "bdx-lag",
      takeaways: [
        "Bordereaux report the risks, premiums and claims written under a binding authority.",
        "Standard reporting formats help insurers monitor accumulations and breaches.",
        "Due diligence, audits and referral rules keep delegated risk under control; late or poor data creates blind spots."
      ]
    },
    {
      title: "Facilities: lineslips and consortia",
      minutes: 5,
      keys: ["Lineslips", "Consortia", "Follow facilities", "Speed versus judgement"],
      intro: "Between the open market and full delegation lie facilities: ways of placing many risks with a panel of insurers agreed in advance. Compare the three kinds in the middle row, then look at what they gain and what they risk.",
      diagram: {
        cols: 6,
        nodes: [
          {
            id: "broker", at: [1, 1], span: 6, tone: "ink", label: "A broker with many similar risks", sub: "Cargo, property, terrorism…",
            teach: "Imagine a broker placing hundreds of similar cargo or property risks a year. Placing each one in the open market, collecting fifteen lines every time, would be slow and expensive for everyone. Facilities let the broker agree the panel and the rules once, in advance."
          },
          {
            id: "lineslip", at: [2, 1], span: 2, label: "Lineslip", sub: "Leaders bind for all",
            teach: "Under a **lineslip**, the participating insurers delegate authority to one or more leading underwriters to accept risks on behalf of all of them. The broker shows each risk only to the slip leaders.",
            like: "A lineslip is like friends who pool their money for a season of football and let one of them choose which matches to attend. The budget and rules are agreed in advance; after that, they trust the person choosing."
          },
          {
            id: "consortium", at: [2, 3], span: 2, label: "Consortium", sub: "A group, one leader",
            teach: "A **consortium** is a group of syndicates, sometimes with companies, that writes a class of business together, with one leader underwriting on behalf of the group. Lloyd’s approves consortia and their arrangements."
          },
          {
            id: "follow", at: [2, 5], span: 2, tone: "q", label: "Follow facility", sub: "Rules, not judgement",
            teach: "A **follow facility** automatically takes a share of a broker’s or a leader’s placements across a portfolio, applying agreed rules rather than individual underwriting. You met these in Module 04."
          },
          {
            id: "panel", at: [3, 1], span: 6, tone: "tint", label: "A panel of insurers", sub: "Agreed in advance",
            teach: "In every case, the decision about who participates, and on what basis, is made once, in advance, rather than risk by risk. That is what makes facilities fast."
          },
          {
            id: "speed", at: [4, 1], span: 3, tone: "good", label: "Faster and cheaper", sub: "For high-volume classes",
            teach: "Facilities save time for brokers and underwriters in high-volume classes, and they give followers access to a spread of business they could never underwrite individually."
          },
          {
            id: "fewer", at: [4, 4], span: 3, tone: "bad", label: "Fewer hands decide", sub: "Less independent judgement",
            teach: "The price is concentration. Fewer underwriters exercise judgement on each risk, so a mistake by a leader spreads to everyone following. That is why facilities sit at the centre of the debate about the future of the subscription market."
          }
        ],
        edges: [
          { from: "broker", to: "lineslip", teach: "The broker can use a lineslip, showing each risk only to its leaders." },
          { from: "broker", to: "consortium", teach: "Or place the class with a consortium." },
          { from: "broker", to: "follow", teach: "Or attach a follow facility that takes a share automatically." },
          { from: "lineslip", to: "panel", teach: "The lineslip’s participants are agreed when it is set up." },
          { from: "consortium", to: "panel", teach: "So are the consortium’s members." },
          { from: "follow", to: "panel", teach: "The follow facility’s capital is committed in advance too." },
          { from: "panel", to: "speed", label: "gains", teach: "Agreeing the panel once saves time on every risk." },
          { from: "panel", to: "fewer", label: "risks", teach: "But fewer people now look closely at each risk." }
        ]
      },
      takeaways: [
        "Lineslips let leading underwriters bind risks on behalf of a panel of insurers.",
        "Consortia let syndicates write a class together under a single leader.",
        "Follow facilities apply agreed rules instead of individual underwriting; all three trade judgement for speed."
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
