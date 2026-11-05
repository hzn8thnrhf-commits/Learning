/* The Slip — Law and principles */
window.SLIP_DATA = window.SLIP_DATA || {};
(window.SLIP_DATA.modules = window.SLIP_DATA.modules || []).push({
  id: "m09",
  title: "Law and principles",
  short: "Law",
  blurb: "The principles of insurance law, the Insurance Act 2015, warranties, policy triggers and the resolution of disputes.",
  outcomes: [
    "Explain the core principles of insurance law: insurable interest, utmost good faith, indemnity and proximate cause.",
    "Describe the duty of fair presentation under the Insurance Act 2015.",
    "Explain the remedies for a breach of that duty, and the modern treatment of warranties.",
    "Distinguish losses-occurring, claims-made and reinsurance triggers.",
    "Describe how London Market disputes are resolved."
  ],
  lessons: [
    {
      title: "Core principles",
      minutes: 5,
      keys: ["Insurable interest", "Utmost good faith", "Indemnity", "Proximate cause"],
      body: [
        "Insurance law rests on a small number of principles, many of them developed by the English courts in marine cases decided over the past three centuries.",
        {
          terms: [
            ["Insurable interest", "The insured must stand to lose financially if the event insured against occurs. A business may insure its own warehouse, but not a stranger’s."],
            ["Utmost good faith", "Both parties must deal with each other honestly and openly. Historically the duty bore heavily on the insured: any failure to disclose a material fact could entitle the insurer to avoid the policy."],
            ["Indemnity", "Insurance should restore the insured to the financial position it was in before the loss, no better and no worse. Some covers, such as personal accident, pay fixed sums instead."],
            ["Proximate cause", "Whether a loss is covered depends on its dominant or effective cause, not simply on the last event to occur before it."],
            ["Contribution and subrogation", "Rules that follow from indemnity and prevent the insured from profiting from a loss."]
          ]
        },
        { analogy: "Proximate cause is like working out why a row of dominoes fell. The last domino struck the table, but the cause was whatever knocked over the first one. The courts look for that effective cause." },
        "The **Marine Insurance Act 1906** codified much of this law, and many of its principles are applied by analogy to non-marine insurance.",
        { think: { q: "A ship is damaged by a fire, which spreads because the crew are fighting off an armed attack. The hull policy excludes war risks. Why might the outcome depend on proximate cause?", a: "If the court finds that the dominant cause of the damage was the attack, a war risk, the hull policy may not respond and the war risks policy will. If it finds that the fire was the effective cause, the hull policy may respond. The answer turns on the effective cause, not merely on the last event." } }
      ],
      takeaways: [
        "Insurable interest, utmost good faith, indemnity and proximate cause are the core principles.",
        "Proximate cause looks for the dominant or effective cause, not the last event.",
        "The Marine Insurance Act 1906 codified much of the law."
      ]
    },
    {
      title: "The Insurance Act 2015: fair presentation",
      minutes: 6,
      keys: ["Fair presentation", "Material circumstances", "No data dumping", "Reasonable search"],
      body: [
        "The **Insurance Act 2015**, which came into force in August 2016, modernised the law governing business insurance. At its centre is the **duty of fair presentation**, which replaced the old duty of disclosure. Before the contract is entered into, the insured must:",
        {
          ul: [
            "disclose every **material circumstance** that it knows or ought to know, or at least enough information to put a prudent insurer on notice that it should make further enquiries;",
            "make the disclosure in a manner that is **reasonably clear and accessible**, so that the underwriter is not buried under thousands of documents; and",
            "ensure that every material representation of fact is **substantially correct**, and that every representation of expectation or belief is made in good faith."
          ]
        },
        "What the insured knows includes what is known to its **senior management** and to the people responsible for its insurance, together with what a **reasonable search** would reveal. Insurers, for their part, are expected to know matters of common knowledge in their class of business, and to ask questions when a presentation raises concerns.",
        { analogy: "Fair presentation is like selling a used car to an expert buyer. You must mention the faulty gearbox, and you cannot hide that information in a box of four hundred receipts. You need not explain what a gearbox is, and if the buyer notices a warning light, it is the buyer’s responsibility to ask about it." },
        { note: "Consumer insurance is different. Under the Consumer Insurance (Disclosure and Representations) Act 2012, a consumer need only take reasonable care not to make a misrepresentation when answering the insurer’s questions." }
      ],
      takeaways: [
        "Business insureds owe a duty of fair presentation before the contract is made.",
        "Material circumstances must be disclosed clearly and accessibly, not buried.",
        "Insurers are expected to ask questions when a presentation raises concerns."
      ]
    },
    {
      title: "Remedies and warranties",
      minutes: 6,
      keys: ["Proportionate remedies", "Warranties suspend", "Section 11", "Late payment"],
      body: [
        "Under the old law, any breach of the duty of disclosure entitled the insurer to **avoid** the policy, treating it as though it had never existed. The Insurance Act 2015 replaced this all-or-nothing approach with **proportionate remedies**, which depend on how the breach occurred and on what the insurer would have done had it been told.",
        {
          table: {
            head: ["If the breach was", "And the insurer would have", "Then the insurer may"],
            rows: [
              ["Deliberate or reckless", "Acted in any way", "Avoid the policy, refuse all claims and keep the premium"],
              ["Neither deliberate nor reckless", "Declined the risk", "Avoid the policy, but must return the premium"],
              ["Neither deliberate nor reckless", "Used different terms", "Treat the contract as if those terms applied"],
              ["Neither deliberate nor reckless", "Charged more premium", "Reduce claims in proportion"]
            ]
          }
        },
        { fig: "remedies" },
        { example: { title: "A proportionate reduction", text: "An insured carelessly fails to mention a previous fire. With that information the insurer would have charged £150,000 instead of £100,000. The insured then claims £1m. The insurer pays in proportion to the premium actually charged: £100,000 ÷ £150,000, or two-thirds, so £666,667." } },
        { h: "Warranties" },
        "A **warranty** is a promise by the insured, for example that a sprinkler system will be maintained in working order. Under the old law any breach of warranty automatically discharged the insurer from liability from that moment, even if the breach had nothing to do with a later loss.",
        "The 2015 Act changed this in two ways. First, a breach of warranty now **suspends** cover only until the breach is remedied. Secondly, under section 11, where a term is designed to reduce the risk of a particular kind of loss, the insurer cannot rely on non-compliance if the insured shows that it could not have increased the risk of the loss that actually occurred.",
        { analogy: "Under the old law, forgetting to set a burglar alarm was a red card: you were sent off for the rest of the match. Under the 2015 Act it is more like the sin bin. You are off the pitch while the breach lasts and return once it is put right, and if the loss was caused by a flood, the alarm is irrelevant." },
        "The Act also abolished **basis of the contract clauses**, which had turned every answer on a proposal form into a warranty. Businesses may contract out of some of the Act’s provisions, but only if the change is clear and the insured is made aware of it. In addition, since 2017 insurers have been required to pay valid claims within a reasonable time, and may be liable for damages if they do not."
      ],
      takeaways: [
        "Remedies for an unfair presentation are now proportionate to the breach.",
        "A breach of warranty suspends cover until it is remedied, rather than ending it.",
        "Section 11 prevents insurers relying on breaches that could not have affected the loss.",
        "Insurers must pay valid claims within a reasonable time."
      ]
    },
    {
      title: "Policy triggers",
      minutes: 5,
      keys: ["Losses occurring", "Claims made", "Risks attaching", "Retroactive dates"],
      body: [
        "When does a policy respond? The answer depends on its **trigger**, and mismatched triggers are a classic cause of gaps in cover.",
        {
          terms: [
            ["Losses occurring", "Covers losses that happen during the policy period, whenever they are reported. It is common for property insurance."],
            ["Claims made", "Covers claims first made against the insured during the policy period, whenever the underlying event occurred, subject to any retroactive date. It is common for professional indemnity and directors’ and officers’ liability."],
            ["Risks attaching", "In reinsurance, covers losses on original policies that incept during the reinsurance period, even if the losses occur later."],
            ["Losses occurring during", "In reinsurance, covers losses that occur during the reinsurance period, whenever the original policies incepted."]
          ]
        },
        { fig: "triggers" },
        { analogy: "A losses-occurring policy is like a gym membership: what matters is when you used the gym. A claims-made policy is like a warranty helpline: what matters is when you call, not when the fault developed." },
        { example: { title: "A gap in cover", text: "A firm moves its claims-made professional indemnity insurance to a new insurer, which sets a retroactive date equal to the start of the new policy. A claim then arrives concerning advice given two years earlier. The old policy has expired, and the new one excludes work done before its retroactive date, so there is no cover. Brokers avoid such gaps by preserving the original retroactive date or by arranging run-off cover." } }
      ],
      takeaways: [
        "Under a losses-occurring trigger, what matters is when the loss happens.",
        "Under a claims-made trigger, what matters is when the claim is first made.",
        "Reinsurance uses risks-attaching or losses-occurring-during bases.",
        "Mismatched triggers and retroactive dates can create gaps in cover."
      ]
    },
    {
      title: "Disputes, courts and arbitration",
      minutes: 4,
      keys: ["English law", "Commercial Court", "Arbitration", "Test cases"],
      body: [
        "Most London Market contracts choose **English law**, and either the English courts or arbitration in London, to resolve disputes. The **Commercial Court** in London hears many of the world’s largest insurance disputes.",
        "Reinsurance disputes are frequently referred to **arbitration**, which is private and allows the parties to appoint arbitrators who understand the market. ARIAS (UK) is a specialist body for insurance and reinsurance arbitration.",
        "Landmark judgments in London shape policy wordings around the world. In the **FCA business interruption test case** in 2021, the UK Supreme Court ruled on how business interruption policies responded to losses caused by the pandemic, a decision that affected hundreds of thousands of policyholders.",
        { analogy: "Choosing English law is like agreeing which rulebook a match will be played under before kick-off. Everyone knows the rules, and decades of earlier decisions show how the referee interprets them." },
        "Other routes include **mediation**, in which a neutral third party helps the parties to reach a settlement, and **ex gratia** payments, which an insurer may make without admitting liability, often to preserve a client relationship."
      ],
      takeaways: [
        "Most London contracts use English law and either the London courts or arbitration.",
        "The Commercial Court and specialist arbitrators hear major insurance disputes.",
        "Test cases such as the FCA business interruption case shape wordings worldwide."
      ]
    }
  ],
  quiz: [
    {
      q: "Under the Insurance Act 2015, what replaced the old duty of disclosure for business insureds?",
      options: ["The duty of utmost good faith", "The duty of fair presentation", "The duty of care", "The duty of reasonable enquiry"],
      answer: 1,
      why: "The duty of fair presentation sets out what the insured must disclose, and how."
    },
    {
      q: "A breach was careless. The insurer would have charged 25% more premium. What remedy applies?",
      options: [
        "Avoid the policy and keep the premium",
        "Avoid the policy and return the premium",
        "Reduce claims in proportion",
        "No remedy at all"
      ],
      answer: 2,
      why: "Claims are paid in the proportion that the premium charged bears to the premium the insurer would have charged."
    },
    {
      q: "Under the 2015 Act, what is the effect of a breach of warranty?",
      options: [
        "The insurer is discharged from all liability",
        "Cover is suspended until the breach is remedied",
        "The policy is void from inception",
        "The premium is doubled"
      ],
      answer: 1,
      why: "Suspension replaced automatic discharge."
    },
    {
      q: "A professional indemnity policy covers claims first made during the policy period. What trigger is this?",
      options: ["Losses occurring", "Claims made", "Risks attaching", "Losses occurring during"],
      answer: 1,
      why: "A claims-made policy responds according to when the claim is made, not when the work was done."
    },
    {
      q: "What does proximate cause mean?",
      options: [
        "The last event before the loss",
        "The dominant or effective cause of the loss",
        "The nearest cause geographically",
        "Whichever cause the insured chooses"
      ],
      answer: 1,
      why: "The courts look for the effective cause, not simply the most recent event."
    },
    {
      q: "Burying an underwriter under thousands of documents breaches which requirement?",
      options: [
        "Insurable interest",
        "Presenting information in a reasonably clear and accessible manner",
        "Indemnity",
        "Contribution"
      ],
      answer: 1,
      why: "A fair presentation must be clear and accessible, not hidden in a mass of material."
    },
    {
      q: "A reinsurance treaty written on a risks-attaching basis covers:",
      options: [
        "Losses on policies that incept during the treaty period",
        "Only losses that occur during the treaty period",
        "Claims first made during the period",
        "Only catastrophe losses"
      ],
      answer: 0,
      why: "Risks attaching follows the inception date of the original policies."
    }
  ]
});
