/* The Slip — Claims */
window.SLIP_DATA = window.SLIP_DATA || {};
(window.SLIP_DATA.modules = window.SLIP_DATA.modules || []).push({
  id: "m08",
  title: "Claims",
  short: "Claims",
  blurb: "From notification to settlement: who decides, how reserves work, and how insurers recover what they have paid.",
  outcomes: [
    "Describe the stages in the life of a London Market claim.",
    "Explain how claims leaders agree claims on behalf of the market.",
    "Explain case reserves, IBNR and ultimate loss, and how claims develop over time.",
    "Describe subrogation, contribution and salvage."
  ],
  lessons: [
    {
      title: "The life of a claim",
      minutes: 5,
      keys: ["Notification", "Loss adjusters", "Reservation of rights", "Settlement"],
      body: [
        "The claims service is where an insurer proves its worth. In the London Market, claims are often large, complex and international, and shared among many insurers, so they follow a structured process.",
        {
          ol: [
            "**Notification.** The insured informs its broker, who notifies the leader and the following market. Policies require notice within a set time or as soon as reasonably practicable.",
            "**Investigation.** Insurers appoint **loss adjusters** to investigate the cause and the amount of the loss, and sometimes lawyers, forensic accountants or engineers.",
            "**Coverage review.** Insurers consider whether the policy responds: whether the peril is covered and whether any exclusion or condition applies. They may issue a **reservation of rights** while they investigate.",
            "**Reserving.** Insurers set a reserve, their estimate of what the claim will cost.",
            "**Interim payments.** For large losses, insurers often make payments on account so that the insured can rebuild or continue trading.",
            "**Settlement.** The claim is agreed and paid, usually through the broker and central settlement."
          ]
        },
        { fig: "claim-life" },
        { analogy: "A loss adjuster is like a surveyor called in after a flood. The surveyor does not decide whether you are insured, but establishes what happened and what it will cost to put right, so that the insurer can decide." },
        "A **loss assessor**, by contrast, is engaged by the insured to prepare and negotiate the claim on its behalf."
      ],
      takeaways: [
        "Claims pass through notification, investigation, coverage review, reserving and settlement.",
        "Loss adjusters act for insurers; loss assessors act for insureds.",
        "Interim payments help insureds to recover while large claims are resolved."
      ]
    },
    {
      title: "Who decides? Claims lead arrangements",
      minutes: 5,
      keys: ["Claims leader", "Second agreement party", "Single claims agreement", "Electronic claims files"],
      body: [
        "Where fifteen insurers share a risk, the insured cannot be expected to negotiate its claim with each of them separately. Market agreements therefore give the **claims leader**, usually the slip leader, authority to agree claims on behalf of the followers.",
        "Under the **Lloyd’s Claims Lead Arrangements**, many claims may be agreed by the leader alone, while larger or more complex claims also require the agreement of a second insurer. The company market has comparable arrangements, and **Single Claims Agreement Party** arrangements allow one leader to agree claims for the whole slip on eligible contracts. Which decisions require more than the leader depends on the arrangements written into the contract’s subscription agreement, and followers are kept informed of significant developments.",
        { analogy: "It is like a group holiday booking. When something goes wrong at the hotel, one person speaks to the manager on behalf of the group. Small problems are settled on the spot; for larger ones, that person consults a second member of the group before agreeing anything." },
        { h: "Claims systems" },
        "Claims are recorded and agreed electronically. Lloyd’s uses systems including the **Electronic Claims File (ECF)** and **CLASS**, so that brokers, leaders and followers work from the same documents and decisions."
      ],
      takeaways: [
        "The claims leader agrees claims on behalf of the following market.",
        "Larger or more complex claims may need a second agreement party.",
        "Shared electronic systems keep everyone working from the same claim file."
      ]
    },
    {
      title: "Reserves and IBNR",
      minutes: 6,
      keys: ["Case reserves", "IBNR", "Ultimate loss", "Development"],
      body: [
        "Insurers must estimate what they will eventually pay for claims long before every claim is settled. These estimates are called **reserves**, and they are usually the largest figure on an insurer’s balance sheet.",
        {
          terms: [
            ["Case reserve", "An estimate of the cost of a specific reported claim, set by the claims handler."],
            ["IBNR", "Incurred but not reported: an estimate, made by actuaries, for claims that have occurred but have not yet been notified, together with the expected further growth in known claims."],
            ["Ultimate loss", "The final total cost once every claim has been settled: paid claims plus case reserves plus IBNR."],
            ["Reserve development", "The way estimates change over time. Releases of reserves increase profit; strengthening reduces it."]
          ]
        },
        { fig: "claims-development" },
        "Actuaries project ultimate losses using **development triangles**, tables showing how each past year’s claims grew over time. Paid claims rise slowly towards the ultimate; incurred claims, which include case reserves, usually rise faster. Long-tail classes need large IBNR reserves because their claims emerge slowly.",
        { analogy: "IBNR is like estimating the bills still to arrive after a large party. You know what you have paid and which invoices are on your desk, but past parties tell you that a few more will arrive next month, so you set money aside for them now." },
        "Reserves feed directly into a syndicate’s result and into the reinsurance to close premium when a year of account closes.",
        { think: { q: "Paid claims for an underwriting year total £30m and case reserves £20m. Actuaries estimate IBNR at £10m. What is the estimated ultimate loss, and what proportion of it has been paid?", a: "Ultimate loss is £30m + £20m + £10m = £60m, of which £30m, or half, has been paid." } }
      ],
      takeaways: [
        "Reserves are estimates of the claims still to be paid.",
        "IBNR covers claims that have occurred but have not yet been reported.",
        "Ultimate loss is paid claims plus case reserves plus IBNR."
      ]
    },
    {
      title: "Recoveries: subrogation, contribution and salvage",
      minutes: 4,
      keys: ["Subrogation", "Contribution", "Salvage", "Indemnity"],
      body: [
        "Once an insurer has paid a claim, it may be able to recover some of the money.",
        {
          terms: [
            ["Subrogation", "Having paid, the insurer stands in the insured’s shoes and may pursue whoever caused the loss. If a contractor’s negligence causes a warehouse fire, the property insurer may sue the contractor."],
            ["Contribution", "Where two policies cover the same loss, the insurers share it, so that the insured cannot recover twice."],
            ["Salvage", "After paying for a total loss, the insurer takes ownership of the damaged property and sells what it can. In marine insurance, salvage also means the reward paid to those who save a ship or its cargo."],
            ["Reinsurance recoveries", "Claims made by the insurer under its own treaties and facultative covers."]
          ]
        },
        { analogy: "Subrogation is like a friend paying your dry-cleaning bill after a waiter spills soup on you, and then taking the matter up with the restaurant. You are made whole, and your friend pursues whoever was responsible." },
        "These rights follow from the principle of **indemnity**: insurance should put the insured back in the position it was in before the loss, no better and no worse."
      ],
      takeaways: [
        "Subrogation allows insurers to pursue third parties who caused a loss.",
        "Contribution shares a loss between overlapping policies.",
        "Recoveries uphold the principle of indemnity."
      ]
    }
  ],
  quiz: [
    {
      q: "What does IBNR stand for?",
      options: ["Insured but not reinsured", "Incurred but not reported", "Indemnity before notice received", "Interim benefit not released"],
      answer: 1,
      why: "IBNR covers claims that have occurred but have not yet been reported."
    },
    {
      q: "For whom does a loss adjuster normally act?",
      options: ["The insured", "The insurer", "The broker", "The court"],
      answer: 1,
      why: "Loss adjusters are appointed by insurers. A loss assessor acts for the insured."
    },
    {
      q: "An insurer pays for a warehouse fire caused by a contractor, and then sues the contractor. What is this called?",
      options: ["Contribution", "Subrogation", "Salvage", "General average"],
      answer: 1,
      why: "Subrogation lets the insurer exercise the insured’s rights against the party at fault."
    },
    {
      q: "Ultimate loss equals:",
      options: ["Paid claims only", "Paid claims plus case reserves plus IBNR", "Premium minus claims", "Case reserves minus IBNR"],
      answer: 1,
      why: "Ultimate loss is everything already paid plus everything still expected to be paid."
    },
    {
      q: "Why do claims lead arrangements exist?",
      options: [
        "So that the insured need not negotiate separately with every insurer on the slip",
        "To allow followers to refuse all claims",
        "To transfer claims to Lloyd’s",
        "To delay claims for three years"
      ],
      answer: 0,
      why: "The leader, sometimes with a second insurer, agrees claims on behalf of the whole slip."
    },
    {
      q: "What is a reservation of rights?",
      options: [
        "Notice that the insurer is investigating but has not yet accepted cover",
        "A reinsurance clause",
        "A refund of premium",
        "A coverholder’s authority"
      ],
      answer: 0,
      why: "It allows the insurer to investigate without giving up its right to decline the claim later."
    }
  ]
});
