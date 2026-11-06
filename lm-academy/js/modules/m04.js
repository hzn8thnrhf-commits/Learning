/* The Slip — Placing a risk */
window.SLIP_DATA = window.SLIP_DATA || {};
(window.SLIP_DATA.modules = window.SLIP_DATA.modules || []).push({
  id: "m04",
  title: "Placing a risk",
  short: "Placing",
  blurb: "How a risk travels from the client to the market: the slip, the MRC, leaders and followers, and signing down.",
  outcomes: [
    "Describe the main stages of placing a risk in the London subscription market.",
    "Explain the purpose and structure of the Market Reform Contract and the principle of contract certainty.",
    "Distinguish leaders from followers and explain what a line is.",
    "Calculate signed lines when a slip is oversubscribed, and explain several liability."
  ],
  lessons: [
    {
      title: "The journey of a risk",
      minutes: 6,
      keys: ["Submission", "Finding a lead", "Followers", "Binding"],
      intro: "Let’s follow one large property risk through the London Market, from the client’s first call to the premium arriving with insurers. The path snakes across the page. At each step, ask yourself who is doing the work and what they need from the step before.",
      diagram: {
        cols: 2,
        gapX: 74,
        nodes: [
          {
            id: "instruct", at: [1, 1], tone: "ink", label: "1. Instructions", sub: "Months before renewal",
            teach: "The client, or its local broker, instructs a London broker, usually several months before the renewal date. Why so early? Because a large risk may need dozens of insurers, and each wants time to analyse it.\n\nNot every risk takes this route. Smaller, more standard risks are often written under **delegated authority**, where an agent binds cover for underwriters who never see the individual risk. That is Module 06."
          },
          {
            id: "submit", at: [1, 2], label: "2. Submission", sub: "The risk, presented",
            teach: "The broker prepares a **submission**: schedules of values, the loss history, engineering surveys and a draft contract. This is the broker’s first big contribution to the client.\n\nA clear, complete submission gets better terms. It also matters legally: as you will see in Module 05, the client has a duty to make a fair presentation of the risk."
          },
          {
            id: "quote", at: [2, 2], label: "3. Finding a lead", sub: "Quotes from leaders",
            teach: "The broker asks selected underwriters to quote, and the client chooses a leader. Price matters, but so do terms, claims reputation and expertise in the class.\n\nThis is where the client’s decision really bites: the leader will negotiate the wording and later handle claims decisions for the whole slip."
          },
          {
            id: "lead", at: [2, 1], tone: "tint", label: "4. Lead terms", sub: "Price and wording agreed",
            teach: "The leader agrees the terms and writes a line, often between 10% and 30% of the risk. Its stamp on the slip tells every other underwriter: an expert has priced this.\n\nNotice the dependency: everything after this step rides on the leader’s judgement."
          },
          {
            id: "follow", at: [3, 1], label: "5. Followers", sub: "Join on the same terms",
            teach: "The broker takes the slip to other underwriters, who join on the leader’s terms until the lines total at least 100%. Each follower decides independently whether to take part and how big a line to write, but none renegotiates the price.",
            like: "It is rather like a leaving collection. One person, the leader, chooses the present and its price. The organiser, the broker, goes round the office collecting contributions until it is paid for. Everyone contributes to the same present on the same terms."
          },
          {
            id: "bind", at: [3, 2], tone: "brass", label: "6. Binding", sub: "Cover in place",
            teach: "Cover is **bound** in time for inception, the moment the policy starts. If the lines total more than 100%, they are signed down so they total exactly 100%; you will calculate that in lesson 4.\n\nBinding is the moment the insurers are legally on risk. From here, a fire at the client’s factory is their problem."
          },
          {
            id: "docs", at: [4, 2], label: "7. Documents and money", sub: "Contract, premium, policy",
            teach: "The contract is finalised, the premium is processed and paid, and policy documents are issued. This back-office work is easy to overlook, but errors here cause disputes later. Lesson 5 follows it in detail."
          }
        ],
        edges: [
          { from: "instruct", to: "submit", label: "prepares", teach: "The broker turns the client’s information into a presentation underwriters can price." },
          { from: "submit", to: "quote", label: "invites", teach: "The submission goes to the underwriters best placed to lead this class of risk." },
          { from: "quote", to: "lead", label: "client picks", teach: "The client, advised by the broker, chooses the leader on price, terms, claims reputation and expertise." },
          { from: "lead", to: "follow", label: "same terms", teach: "Followers rely on the leader’s analysis, but each still decides for itself whether to join." },
          { from: "follow", to: "bind", label: "100%+", teach: "Once lines total at least 100%, the risk can be bound." },
          { from: "bind", to: "docs", label: "then", teach: "After binding, the contract is documented and the premium accounted for." }
        ]
      },
      think: { q: "Why might a client choose a leader who quotes a slightly higher price than another underwriter?", a: "Because the leader shapes the wording and usually leads on claims. A leader with deep expertise and a strong claims reputation may be worth more to the client than a small saving in premium, and its name on the slip makes followers more willing to join." },
      takeaways: [
        "The broker prepares a submission and finds a lead underwriter, chosen by the client.",
        "Followers join on the leader’s terms until the risk is fully placed, and cover is bound before inception.",
        "Smaller and more standard risks are often written under delegated authority instead."
      ]
    },
    {
      title: "The slip and the MRC",
      minutes: 6,
      keys: ["Slip", "MRC", "Contract certainty", "Several liability"],
      intro: "The slip is the document at the heart of London placement. Today it takes a standard form, the Market Reform Contract. Start at the top with why the MRC exists, then open each of its sections, and finish with the most important consequence of how lines are recorded.",
      diagram: {
        cols: 2,
        gapX: 70,
        nodes: [
          {
            id: "oldslip", at: [1, 1], label: "The old slip", sub: "A card, scratched by hand",
            teach: "The slip was once a folded card on which the broker typed the details of the risk, and on which each underwriter stamped and initialled a line. Writing a line is still called **scratching** the slip.\n\nThe trouble was that cover often began before all the terms were written down. Disputes about what had been agreed were common, and expensive."
          },
          {
            id: "certainty", at: [1, 2], tone: "brass", label: "Contract certainty", sub: "Every term agreed first",
            teach: "**Contract certainty** means every term is agreed and documented before cover begins. The market adopted it in the 2000s, partly under regulatory pressure, after too many disputes about what a contract actually said.\n\nIt sounds obvious. It wasn’t always practised, and the MRC is the tool that enforces it."
          },
          {
            id: "mrc", at: [2, 1], span: 2, tone: "ink", label: "Market Reform Contract", sub: "Today’s slip, mostly electronic",
            teach: "The **MRC** is the market’s standard contract format, and most are now created and signed electronically. It has six sections: Risk Details, Information, Security Details, the Subscription Agreement, Fiscal and Regulatory, and Broker Remuneration and Deductions. The last two record tax and the brokerage taken from the premium.\n\nTap the sections below to see what the main four do and how they relate.",
            like: "The MRC is like a recipe card that every cook in a kitchen signs. The ingredients and method are the same for everyone, and each cook records the share of the dish they are responsible for."
          },
          {
            id: "risk", at: [3, 1], label: "Risk details", sub: "The contract terms",
            teach: "**Risk Details** is the contract itself: the insured, the period, what is covered, limits and deductibles, conditions, clauses, the choice of law and the premium.\n\nIf there is a dispute later, this is the section the lawyers read first."
          },
          {
            id: "info", at: [3, 2], label: "Information", sub: "Facts, not terms",
            teach: "**Information** holds facts presented to underwriters, such as survey findings or descriptions of operations, that don’t form part of the contract terms.\n\nThe distinction matters. A statement in Risk Details can be a term the insured must comply with; a statement in Information is part of the presentation of the risk."
          },
          {
            id: "security", at: [4, 1], label: "Security details", sub: "Each insurer’s line",
            teach: "**Security Details** lists every insurer’s share, its line, with its stamp and reference, and states that liability is **several and not joint**.\n\nThat short phrase has big consequences, as the box below explains."
          },
          {
            id: "subagr", at: [4, 2], label: "Subscription agreement", sub: "How insurers act together",
            teach: "The **Subscription Agreement** sets out how the leader and followers work together: who may agree later changes and claims, and how premium is to be paid. It usually incorporates the market’s General Underwriters Agreement, which you will meet in the next lesson."
          },
          {
            id: "several", at: [5, 1], span: 2, tone: "bad", label: "Several, not joint", sub: "Each pays only its own share",
            teach: "Liability under a London slip is **several, not joint**. Each insurer is liable only for its own share. If one fails, the others do not pick up its portion.\n\nSo the broker must consider the financial strength of every insurer on the slip, not only the leader. A client with a 15% line from an insurer that goes bust may recover only part of 15% of every claim. Try the model to see what that costs."
          }
        ],
        edges: [
          { from: "oldslip", to: "mrc", label: "became", teach: "The paper slip evolved into the standard, largely electronic MRC." },
          { from: "certainty", to: "mrc", label: "requires", teach: "Contract certainty is the principle; the MRC is how the market puts it into practice." },
          { from: "mrc", to: "risk", label: "terms", teach: "The contract terms sit in Risk Details." },
          { from: "mrc", to: "info", label: "facts", teach: "Supporting facts sit apart, in Information, so no one mistakes them for terms." },
          { from: "info", to: "risk", label: "not terms", dash: true, teach: "Information supports the underwriting, but it is deliberately kept out of the contract terms." },
          { from: "risk", to: "security", label: "agreed by", teach: "The insurers listed in Security Details each accept the Risk Details for their share." },
          { from: "subagr", to: "security", label: "coordinates", teach: "The Subscription Agreement governs how those separate insurers act together during the policy." },
          { from: "security", to: "several", label: "means", teach: "Because each line is recorded separately, each insurer is liable for its own share only." }
        ]
      },
      explore: "several",
      think: { q: "A risk is shared by five insurers, and one of them, holding 15%, becomes insolvent. What happens to that 15% of any claim?", a: "The other insurers are not liable for it, because liability is several. The insured must claim against the insolvent insurer’s estate, or rely on any compensation scheme that applies, for that 15%." },
      takeaways: [
        "The slip records the risk and each underwriter’s share; the MRC is today’s standard format.",
        "Contract certainty means every term is agreed and documented before cover begins.",
        "Each insurer is liable only for its own share: liability is several, not joint."
      ]
    },
    {
      title: "Leaders, followers and lines",
      minutes: 5,
      keys: ["Lines", "Leader", "GUA", "Follow facilities"],
      intro: "A slip has one leader and many followers, and they do quite different jobs. Look at what flows from the leader to everyone else, and notice the two ways a follower can join: by its own decision, or automatically through a facility.",
      diagram: {
        cols: 2,
        nodes: [
          {
            id: "broker", at: [1, 1], label: "The broker", sub: "Shows the leader first",
            teach: "The broker approaches the chosen leader first, because followers want to see who has led before they commit. A strong leader makes the rest of the placement much easier."
          },
          {
            id: "gua", at: [1, 2], label: "The GUA", sub: "Who can agree changes",
            teach: "The **General Underwriters Agreement** (GUA), built into the subscription agreement, sets out which later changes the leader may agree on behalf of all the insurers, and which need the followers too.\n\nCorrecting a clerical error might be for the leader alone; extending the territories covered might need every follower. Without such rules, every small change would mean chasing dozens of insurers."
          },
          {
            id: "leader", at: [2, 1], span: 2, tone: "ink", label: "The lead underwriter", sub: "Prices it and sets the wording",
            teach: "The **leader** does the heavy lifting: assessing the risk, negotiating the wording, setting the price, and later agreeing many changes and claims for the whole slip.\n\nLeading is valuable. Strong leaders see more business, build reputations in their classes and often earn better terms. It is also demanding, which is why leaders are usually specialists.",
            like: "The leader is like the head chef at the pass. Each dish is designed and tasted by the head chef, and the line cooks trust that judgement. A line cook may refuse a dish, but won’t redesign it."
          },
          {
            id: "follower", at: [3, 1], label: "A follower", sub: "Makes its own decision",
            teach: "A **follower** relies on the leader’s work but still decides independently whether to participate and how big a line to take. Following lets an underwriter build a diversified book by taking small lines on many risks, without the cost of leading each one."
          },
          {
            id: "facility", at: [3, 2], tone: "q", label: "Follow facility", sub: "Joins by agreed rules",
            teach: "A **follow facility** joins risks automatically when they meet pre-agreed rules, such as being led by approved leaders in certain classes. Facilities have grown rapidly because they make placement faster and cheaper.\n\nThe trade-off is that the facility’s capital follows without fresh judgement on each risk, so the rules and the leaders it follows must be chosen carefully."
          },
          {
            id: "line", at: [4, 1], span: 2, tone: "brass", label: "A line", sub: "The same share of premium and of every claim",
            teach: "A **line** is a percentage of the whole risk. A 15% line means the insurer receives 15% of the premium and pays 15% of every claim, from the smallest to a total loss.\n\nThat proportionality is the whole point. Everyone on the slip shares the risk on identical terms, just in different sizes."
          }
        ],
        edges: [
          { from: "broker", to: "leader", label: "goes first to", teach: "The broker takes the risk to the chosen leader before anyone else." },
          { from: "gua", to: "leader", label: "empowers", teach: "The GUA lets the leader agree many routine changes on behalf of all the insurers." },
          { from: "leader", to: "follower", label: "sets terms", teach: "Followers accept the leader’s price and wording; their only choice is whether and how much." },
          { from: "leader", to: "facility", label: "triggers", teach: "A follow facility joins automatically when an approved leader writes a qualifying risk." },
          { from: "follower", to: "line", label: "writes", teach: "Each follower writes its own line on the slip." },
          { from: "facility", to: "line", label: "writes", teach: "The facility writes a line too, on behalf of the capital behind it." }
        ]
      },
      takeaways: [
        "A line is a percentage share of the premium and of every claim.",
        "The leader sets the terms; followers subscribe to them after making their own decision.",
        "The GUA sets out which changes the leader may agree on behalf of all the insurers.",
        "Follow facilities join risks automatically according to agreed rules."
      ]
    },
    {
      title: "Written lines, signed lines and signing down",
      minutes: 6,
      keys: ["Written line", "Signed line", "Signing down", "To stand"],
      intro: "Here’s a curious feature of London broking: brokers deliberately collect more than 100% of a risk. Follow how the extra is squeezed back down to exactly 100%, and notice which lines escape the squeeze.",
      diagram: {
        cols: 2,
        nodes: [
          {
            id: "over", at: [1, 1], span: 2, tone: "ink", label: "The broker oversubscribes", sub: "Collects more than 100%",
            teach: "Brokers usually aim to **oversubscribe** a risk. Why ask for more than you need? Because an underwriter might withdraw before binding, and because oversubscription lets every insurer’s share be reduced evenly at the end, which is fairer than turning the last underwriter away."
          },
          {
            id: "written", at: [2, 1], label: "Written lines", sub: "40% + 30% + 30% + 25%",
            teach: "The share an underwriter agrees is its **written line**. In our example, four underwriters write 40%, 30%, 30% and 25%: a total of 125%.\n\nA written line is a maximum. The underwriter is saying “up to this much”, knowing it may end up with less."
          },
          {
            id: "stand", at: [2, 2], tone: "q", label: "Lines “to stand”", sub: "Not to be reduced",
            teach: "An underwriter that doesn’t want its share reduced may mark the line **to stand**. Only the other lines are then signed down, so they absorb all of the squeeze.\n\nLeaders sometimes do this to protect a share they negotiated hard for."
          },
          {
            id: "factor", at: [3, 1], span: 2, tone: "tint", label: "The signing-down factor", sub: "100 ÷ 125 = 0.8",
            teach: "To bring the total back to 100%, every line that can be reduced is multiplied by the same **signing-down factor**: 100 divided by the total written. Here, 100 ÷ 125 = 0.8.\n\nIf some lines stand, the factor is worked out on the lines that can move: the room left after the standing lines, divided by the total of the others.",
            like: "Imagine pre-orders for a limited edition of 100 prints. If orders arrive for 125, the gallery doesn’t turn the last customers away; it gives every buyer 80% of what they ordered, so each keeps a fair share."
          },
          {
            id: "signed", at: [4, 1], span: 2, tone: "good", label: "Signed lines", sub: "32% + 24% + 24% + 20% = 100%",
            teach: "The result is the **signed line**: the share each insurer finally takes. Our four lines become 32%, 24%, 24% and 20%, exactly 100%.\n\nSigning down must follow the terms of the slip and the client’s instructions, and is normally completed at, or shortly after, binding."
          },
          {
            id: "share", at: [5, 1], span: 2, label: "Premium and claims follow", sub: "The signed line, not the written",
            teach: "From now on, everything follows the signed line. The insurer with a 32% signed line receives 32% of the premium and pays 32% of every claim, even though it wrote 40%.\n\nThat is why underwriters care about signing down: it decides how much premium, and how much risk, they actually end up with."
          }
        ],
        edges: [
          { from: "over", to: "written", label: "collects", teach: "Each underwriter the broker visits writes a line, until the total passes 100%." },
          { from: "over", to: "stand", label: "may agree", teach: "The broker may agree that a particular line will stand." },
          { from: "written", to: "factor", label: "total 125%", teach: "The total of the lines that can move sets the factor." },
          { from: "stand", to: "factor", label: "left out", dash: true, teach: "Lines to stand are left out of the squeeze, so the factor applies only to the others." },
          { from: "factor", to: "signed", label: "× 0.8", teach: "Each reducible line is multiplied by the factor." },
          { from: "signed", to: "share", label: "decides", teach: "The signed line decides each insurer’s share of premium and claims." }
        ]
      },
      explore: "signing-down",
      think: { q: "Lines on a slip total 160%, and one underwriter has written 20%. What is that underwriter’s signed line?", a: "The signing-down factor is 100 ÷ 160 = 0.625, so the signed line is 20% × 0.625 = 12.5%." },
      takeaways: [
        "The written line is what the underwriter agrees; the signed line is the share it finally takes.",
        "Oversubscribed slips are signed down in proportion so that the lines total 100%.",
        "A line marked to stand is not reduced; the others absorb the squeeze."
      ]
    },
    {
      title: "After binding",
      minutes: 5,
      keys: ["Endorsements", "Premium terms", "Signing numbers", "Central settlement"],
      intro: "Binding is not the end of the broker’s work. The contract must be documented, the premium accounted for and paid, and the policy kept up to date. Follow the paperwork and the money from the moment cover is bound.",
      diagram: {
        cols: 2,
        nodes: [
          {
            id: "bound", at: [1, 1], span: 2, tone: "ink", label: "Cover is bound", sub: "Now the paperwork and the money",
            teach: "The insurers are on risk. Now two streams of work begin: keeping the contract up to date as the client’s business changes, and getting the premium from the client to every insurer on the slip, in the right shares."
          },
          {
            id: "endorse", at: [2, 1], label: "Endorsements", sub: "Changes during the policy",
            teach: "An **endorsement** changes the contract after inception: adding a location, extending the period, increasing a limit. It is agreed by the leader and, where the subscription agreement requires, by the followers.\n\nMany endorsements carry an additional premium, or a return of premium, which then has to be processed like the original."
          },
          {
            id: "terms", at: [2, 2], label: "Premium terms", sub: "Pay within 30 to 90 days",
            teach: "The contract says when premium must be paid, often within 30 to 90 days of inception. A **premium payment condition** gives insurers rights, sometimes including cancellation, if payment is late.\n\nInsurers care because premium in the bank earns investment income and protects them against a client who never pays."
          },
          {
            id: "accounting", at: [3, 1], span: 2, tone: "tint", label: "Central accounting", sub: "Broker submits to Velonetic",
            teach: "For much London business, the broker submits the premium details to **Velonetic**, which checks them against the contract and records each insurer’s share. The submission has traditionally used a form called the London Premium Advice Note, which the market is replacing with structured digital records."
          },
          {
            id: "signing", at: [4, 1], label: "Signing number", sub: "Each transaction’s reference",
            teach: "Each processed transaction receives a **signing number and date**. Brokers and insurers use it to match money to contracts.\n\nIt sounds dull, but without a common reference, thousands of payments a day would be impossible to reconcile."
          },
          {
            id: "settle", at: [4, 2], tone: "good", label: "Central settlement", sub: "Netted, then paid",
            teach: "Premiums and claims between brokers and insurers are **netted** and paid through a central system rather than transaction by transaction. Each party makes or receives one net payment.",
            like: "Central settlement is like friends using an app to settle up after a holiday. Instead of everyone paying everyone else, the app nets off what each person owes and makes a single payment for each."
          }
        ],
        edges: [
          { from: "bound", to: "endorse", label: "may need", teach: "As the client’s business changes, the contract is amended by endorsement." },
          { from: "bound", to: "terms", label: "starts the clock", teach: "Inception starts the premium payment period." },
          { from: "endorse", to: "accounting", label: "extra premium", fromSide: "b", toSide: "t", toAt: 0.25, teach: "Additional or return premiums from endorsements are processed like the original premium." },
          { from: "terms", to: "accounting", label: "premium due", fromSide: "b", toSide: "t", toAt: 0.75, teach: "When the premium is due, the broker submits it for central accounting." },
          { from: "accounting", to: "signing", label: "issues", teach: "Every processed transaction gets its signing number and date." },
          { from: "accounting", to: "settle", label: "feeds", teach: "Processed transactions flow into central settlement, where they are netted and paid." }
        ]
      },
      takeaways: [
        "Endorsements change the contract after inception and may carry extra premium.",
        "Premium is processed centrally and settled net between brokers and insurers.",
        "Each processed transaction receives a signing number and date."
      ]
    }
  ],
  quiz: [
    {
      q: "Lines on a slip total 160%. An underwriter wrote 20%. What is the signed line?",
      options: ["20%", "16%", "12.5%", "10%"],
      answer: 2,
      why: "The signing-down factor is 100 ÷ 160 = 0.625, and 20% × 0.625 = 12.5%."
    },
    {
      q: "What does it mean that liability on a London slip is several?",
      options: [
        "Each insurer is liable only for its own share",
        "All the insurers are jointly liable for the whole loss",
        "The leader pays everything and recovers from the followers",
        "Liability is divided equally between the insurers"
      ],
      answer: 0,
      why: "If one insurer fails, the others do not take over its share."
    },
    {
      q: "What is the main purpose of the MRC and of contract certainty?",
      options: [
        "To ensure that every term is agreed and documented before cover begins",
        "To allow the leader to change terms after a loss",
        "To replace brokers with direct placement",
        "To fix premiums across the market"
      ],
      answer: 0,
      why: "Contract certainty means that there is no doubt about what was agreed when a claim arises."
    },
    {
      q: "An underwriter marks a line to stand. What happens if the slip is oversubscribed?",
      options: [
        "The line is cancelled",
        "The line is not signed down; the other lines are",
        "The line is signed down first",
        "The slip becomes invalid"
      ],
      answer: 1,
      why: "A line to stand keeps its full written size, and the other lines absorb the reduction."
    },
    {
      q: "Who normally sets the terms and price that followers accept?",
      options: ["The broker", "The lead underwriter", "Lloyd’s", "The last underwriter to sign"],
      answer: 1,
      why: "The leader carries out the deepest analysis and sets the terms."
    },
    {
      q: "What is an endorsement?",
      options: [
        "A recommendation from a rating agency",
        "A change to the policy after inception",
        "The leader’s signature on the slip",
        "A claims payment"
      ],
      answer: 1,
      why: "Endorsements amend the contract during the policy period, for example to add a location."
    },
    {
      q: "Why do brokers often aim to oversubscribe a risk?",
      options: [
        "To earn more brokerage",
        "To provide a margin and allow every line to be signed down evenly",
        "Because Lloyd’s requires placements of at least 120%",
        "To avoid insurance premium tax"
      ],
      answer: 1,
      why: "Oversubscription protects the placement if an underwriter withdraws, and spreads the risk evenly."
    }
  ]
});
