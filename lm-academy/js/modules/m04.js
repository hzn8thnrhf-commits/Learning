/* The Slip — Placing a risk */
window.SLIP_DATA = window.SLIP_DATA || {};
(window.SLIP_DATA.modules = window.SLIP_DATA.modules || []).push({
  id: "m04",
  title: "Placing a risk",
  short: "Placing",
  blurb: "The slip and the MRC, leaders and followers, and how a risk is built up to 100%.",
  outcomes: [
    "Describe the stages in placing a risk in the London Market.",
    "Explain the purpose and structure of the Market Reform Contract.",
    "Explain the roles of leaders and followers and the significance of several liability.",
    "Calculate signed lines from written lines when a slip is oversubscribed.",
    "Describe what happens after binding, including endorsements, accounting and settlement."
  ],
  lessons: [
    {
      title: "The journey of a risk",
      minutes: 5,
      keys: ["Submission", "Finding a lead", "Followers", "Binding"],
      body: [
        "**Placement** is the process of arranging insurance for a risk. In the London Market it follows a well-established sequence, which is set out below for a large commercial property risk.",
        {
          ol: [
            "**Instructions.** The client, or its local broker, instructs a London broker, usually several months before the renewal date.",
            "**Submission.** The broker prepares a presentation of the risk: schedules of values, the loss history, engineering surveys and a draft contract.",
            "**Finding a lead.** The broker asks selected underwriters to quote. The client chooses a leader, weighing price, terms, claims reputation and expertise.",
            "**Agreeing lead terms.** The leader agrees the terms and writes a line, often between 10% and 30% of the risk.",
            "**Followers.** The broker takes the slip to other underwriters, who join on the same terms until the lines total at least 100%.",
            "**Binding.** Cover is bound in time for inception. If the lines total more than 100%, they are signed down.",
            "**Documentation and accounting.** The contract is finalised, the premium is processed and paid, and policy documents are issued."
          ]
        },
        { fig: "journey" },
        { analogy: "Placing a risk is rather like organising a collection for a leaving present. One person, the leader, chooses the present and sets its price. The organiser, the broker, then goes round the office collecting contributions until the cost is covered. Everyone contributes towards the same present on the same terms." },
        "Not every risk is placed in this way. Smaller and more standard risks are often written under **delegated authority**, where an agent binds cover on behalf of underwriters who never see the individual risk. Delegated authority is the subject of a later module."
      ],
      takeaways: [
        "The broker prepares a submission and finds a lead underwriter.",
        "Followers join on the leader’s terms until the risk is fully placed.",
        "Smaller and more standard risks are often written under delegated authority instead."
      ]
    },
    {
      title: "The slip and the MRC",
      minutes: 6,
      keys: ["Slip", "MRC", "Contract certainty", "Several liability"],
      body: [
        "The **slip** is the document at the heart of London placement. It was once a folded card on which the broker typed the details of the risk and on which each underwriter stamped and initialled a line, a process still known as **scratching** the slip.",
        "Today the standard format is the **Market Reform Contract (MRC)**. It was introduced in the 2000s so that every term is agreed and documented before cover begins, a principle known as **contract certainty**. Most MRCs are now created and signed electronically.",
        { h: "The sections of an MRC" },
        {
          terms: [
            ["Risk Details", "The contract itself: the insured, period, interest, limits, deductibles, conditions, clauses, choice of law and premium."],
            ["Information", "Facts presented to underwriters that do not form part of the contract terms."],
            ["Security Details", "Each insurer’s share, or line, with its stamp and reference, and the statement that liability is several and not joint."],
            ["Subscription Agreement", "How the leader and followers work together: who may agree changes and claims, and how premium is to be paid."],
            ["Fiscal and Regulatory", "Taxes payable, regulatory classifications and the allocation of premium between countries."],
            ["Broker Remuneration and Deductions", "Brokerage and any other deductions from the premium."]
          ]
        },
        { analogy: "The MRC is like a recipe card that every cook in a kitchen signs. The ingredients and method, the risk details, are the same for everyone, and each cook records the share of the dish for which they are responsible." },
        { h: "Several liability" },
        "Liability under a London slip is **several, not joint**. Each insurer is liable only for its own share. If one insurer fails, the others do not take over its portion, which is why brokers must consider the financial strength of every insurer on a slip, not only the leader.",
        { think: { q: "A risk is shared by five insurers, and one of them, holding 15%, becomes insolvent. What happens to that 15% of any claim?", a: "The other insurers are not liable for it, because liability is several. The insured must claim against the insolvent insurer’s estate, or rely on any compensation scheme that applies, for that 15%." } }
      ],
      takeaways: [
        "The slip records the risk and each underwriter’s share.",
        "The MRC is the market’s standard contract format and supports contract certainty.",
        "Each insurer is liable only for its own share: liability is several, not joint."
      ]
    },
    {
      title: "Leaders, followers and lines",
      minutes: 5,
      keys: ["Lines", "Leader", "GUA", "Follow facilities"],
      body: [
        "When underwriters accept part of a risk, they write a **line**, a percentage of the whole. A 15% line means that the syndicate or company receives 15% of the premium and pays 15% of every claim.",
        "The first underwriter to write is the **leader**, who is expected to carry out the most thorough analysis: assessing the risk, negotiating the wording and setting the price. Followers rely on that work, but each still decides independently whether to participate and how large a line to take.",
        "The subscription agreement, usually incorporating the market’s **General Underwriters Agreement (GUA)**, sets out which later changes the leader may agree on behalf of all the insurers, and which require the agreement of the followers. Correcting a clerical error might be for the leader alone; extending the territories covered might require every follower to agree.",
        { analogy: "The leader resembles the head chef at the pass. Each dish is designed and tasted by the head chef, and the line cooks, the followers, trust that judgement. A line cook may refuse a dish, but will not redesign it." },
        "Leading is valuable. Strong leaders see more business and build reputations in their classes. Following allows an underwriter to build a diversified portfolio by taking small lines on many risks. **Follow facilities**, which join risks automatically according to agreed rules, have grown rapidly in recent years."
      ],
      takeaways: [
        "A line is a percentage share of the premium and of every claim.",
        "The leader sets the terms; followers subscribe to them after making their own decision.",
        "The GUA sets out which changes the leader may agree on behalf of all the insurers."
      ]
    },
    {
      title: "Written lines, signed lines and signing down",
      minutes: 5,
      keys: ["Written line", "Signed line", "Signing down", "To stand"],
      body: [
        "Brokers usually aim to **oversubscribe** a risk, collecting lines that total more than 100%. This provides a margin in case an underwriter withdraws, and allows every insurer’s share to be reduced evenly at the end of the placement.",
        "The share an underwriter agrees is the **written line**. If the total exceeds 100%, each line is reduced in proportion to give the **signed line**, so that the lines total exactly 100%. This process is called **signing down**.",
        { example: { title: "Signing down", text: "A broker collects four lines of 40%, 30%, 30% and 25%, a total of 125%. The signing-down factor is 100 ÷ 125 = 0.8, so the signed lines are 32%, 24%, 24% and 20%, which total 100%." } },
        { fig: "signing" },
        { analogy: "Imagine pre-orders for a limited edition of 100 prints. If orders arrive for 125, the gallery does not turn away the last customers; it gives every buyer 80% of what they ordered, so that each keeps a fair share." },
        "An underwriter who does not wish to be reduced may mark the line **to stand**, in which case only the other lines are signed down. Signing down must follow the terms of the slip and the client’s instructions, and is normally completed at, or shortly after, binding.",
        { lab: "slip", text: "Set written lines and watch them sign down in the Slip builder." },
        { think: { q: "Lines on a slip total 160%, and one underwriter has written 20%. What is that underwriter’s signed line?", a: "The signing-down factor is 100 ÷ 160 = 0.625, so the signed line is 20% × 0.625 = 12.5%." } }
      ],
      takeaways: [
        "The written line is what the underwriter agrees; the signed line is the share finally taken.",
        "Oversubscribed slips are signed down in proportion so that the lines total 100%.",
        "A line marked to stand is not reduced."
      ]
    },
    {
      title: "After binding",
      minutes: 5,
      keys: ["Endorsements", "Premium terms", "Signing numbers", "Central settlement"],
      body: [
        "Binding is not the end of the broker’s work. The contract must be documented and accounted for, and kept up to date for the rest of the policy period.",
        {
          terms: [
            ["Endorsements", "Changes to the contract after inception, such as adding a location or extending the period. They are agreed by the leader and, where the subscription agreement requires, by the followers."],
            ["Premium payment terms", "Provisions stating when premium must be paid, often within 30 to 90 days of inception. A premium payment condition gives insurers rights if payment is late."],
            ["Central accounting", "For much London business, the broker submits the premium details to Velonetic, which checks them and records each insurer’s share."],
            ["Signing number and date", "The reference given to each processed transaction, which brokers and insurers use to match money to contracts."],
            ["Central settlement", "Premiums and claims between brokers and insurers are netted and paid through a central system rather than transaction by transaction."]
          ]
        },
        "Premium submissions have traditionally used a form called the **London Premium Advice Note (LPAN)**. The market’s modernisation programme aims to replace these paper-based forms with structured digital records, as described in the final module.",
        { analogy: "Central settlement is like a group of friends using an app to settle up after a holiday. Instead of everyone paying everyone else, the app nets off what each person owes and makes a single payment for each." }
      ],
      takeaways: [
        "Endorsements change the contract after inception.",
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
