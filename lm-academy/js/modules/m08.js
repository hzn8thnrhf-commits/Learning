/* The Slip — Claims */
window.SLIP_DATA = window.SLIP_DATA || {};
(window.SLIP_DATA.modules = window.SLIP_DATA.modules || []).push({
  id: "m08",
  title: "Claims",
  short: "Claims",
  blurb: "The life of a claim in the London Market, who decides on behalf of the slip, how reserves are set and how insurers recover what they have paid.",
  outcomes: [
    "Describe the stages of a London Market claim and the roles of loss adjusters and loss assessors.",
    "Explain how claims lead arrangements allow claims to be agreed on behalf of all the insurers on a slip.",
    "Distinguish case reserves from IBNR and calculate an ultimate loss.",
    "Explain subrogation, contribution and salvage, and their link to indemnity."
  ],
  lessons: [
    {
      title: "The life of a claim",
      minutes: 6,
      keys: ["Notification", "Loss adjusters", "Reservation of rights", "Settlement"],
      intro: "The claims service is where an insurer proves its worth. Follow a large property claim down the left-hand column, step by step, and look across at the right for the people and tools each step involves.",
      diagram: {
        cols: 2,
        gapX: 68,
        nodes: [
          {
            id: "notify", at: [1, 1], tone: "ink", label: "1. Notification", sub: "Insured, broker, leader",
            teach: "The insured tells its broker, who notifies the leader and the following market. London claims are often large, complex, international and shared among many insurers, so a clear notification sets the tone for everything after."
          },
          {
            id: "notice", at: [1, 2], tone: "bad", label: "Notice condition", sub: "On time, or risk the claim",
            teach: "Policies require notice within a set time or “as soon as reasonably practicable”. Late notice can prejudice the insurer’s investigation, and depending on the wording may reduce or even defeat the claim. Brokers chase it for that reason."
          },
          {
            id: "invest", at: [2, 1], label: "2. Investigation", sub: "What happened, and what did it cost?",
            teach: "Insurers investigate the cause and the amount of the loss, sometimes with lawyers, forensic accountants or engineers alongside the adjuster. For a big fire this can take months."
          },
          {
            id: "adjuster", at: [2, 2], tone: "tint", label: "Loss adjuster", sub: "Acts for the insurers",
            teach: "A **loss adjuster** is appointed by insurers to investigate the cause and quantify the loss. The adjuster doesn’t decide whether the claim is covered; it establishes the facts so the insurers can decide.\n\nDon’t confuse the adjuster with a **loss assessor**, who works for the insured: see the bottom of the diagram.",
            like: "A loss adjuster is like a surveyor called in after a flood. The surveyor doesn’t decide whether you are insured, but works out what happened and what it will cost to put right."
          },
          {
            id: "coverage", at: [3, 1], label: "3. Coverage review", sub: "Does the policy respond?",
            teach: "Insurers consider whether the policy responds: is the peril covered, and does any exclusion or condition apply? This is where the principles of Module 05, proximate cause above all, are applied to real facts."
          },
          {
            id: "ror", at: [3, 2], tone: "q", label: "Reservation of rights", sub: "Investigating, not accepting",
            teach: "While they investigate, insurers may issue a **reservation of rights**: notice that they are looking into the claim but have not yet accepted cover. It protects their position without forcing an early decision."
          },
          {
            id: "reserve", at: [4, 1], label: "4. Reserving", sub: "An estimate of the cost",
            teach: "Insurers set a **reserve**, their estimate of what the claim will cost, and revise it as facts emerge. Reserves feed straight into results and capital, as lesson 3 explains."
          },
          {
            id: "interim", at: [4, 2], tone: "good", label: "Interim payments", sub: "Money on account",
            teach: "For large losses, insurers often make **payments on account** before the final figure is agreed, so the insured can rebuild or keep trading. A business that runs out of cash while waiting for its claim can fail, which helps nobody."
          },
          {
            id: "settle", at: [5, 1], tone: "good", label: "5. Settlement", sub: "Agreed and paid",
            teach: "The claim is agreed and paid, usually through the broker and central settlement, in each insurer’s signed share. Then the insurers turn to any recoveries, the subject of lesson 4."
          },
          {
            id: "assessor", at: [5, 2], label: "Loss assessor", sub: "Acts for the insured",
            teach: "A **loss assessor** is engaged by the insured to prepare and negotiate the claim on its behalf. So on a big claim you may have an adjuster for the insurers and an assessor for the insured, negotiating with each other."
          }
        ],
        edges: [
          { from: "notify", to: "notice", label: "must meet", teach: "Notification has to satisfy the policy’s notice condition." },
          { from: "notify", to: "invest", label: "starts", teach: "Notification starts the investigation." },
          { from: "invest", to: "adjuster", label: "led by", teach: "The insurers’ adjuster leads the investigation." },
          { from: "invest", to: "coverage", label: "informs", teach: "The facts found decide whether the policy responds." },
          { from: "coverage", to: "ror", label: "may issue", teach: "While coverage is uncertain, insurers can reserve their rights." },
          { from: "coverage", to: "reserve", label: "then", teach: "Insurers estimate the cost and hold a reserve for it." },
          { from: "reserve", to: "interim", label: "allows", teach: "Once the loss is broadly understood, insurers can pay some of it on account." },
          { from: "reserve", to: "settle", label: "finally", teach: "Eventually the claim is agreed and paid." },
          { from: "assessor", to: "settle", label: "negotiates", teach: "The insured’s assessor negotiates the final figure with the insurers’ adjuster." }
        ]
      },
      takeaways: [
        "Claims pass through notification, investigation, coverage review, reserving and settlement.",
        "Loss adjusters act for insurers; loss assessors act for insureds.",
        "Insurers may reserve their rights while investigating, and interim payments help insureds recover."
      ]
    },
    {
      title: "Who decides? Claims lead arrangements",
      minutes: 5,
      keys: ["Claims leader", "Second agreement party", "Single claims agreement", "Electronic claims files"],
      intro: "If fifteen insurers share a risk, must the insured negotiate its claim fifteen times? No, and this diagram shows why not. Follow the claim from the insured to the market, and notice who is allowed to say yes on everyone’s behalf.",
      diagram: {
        cols: 2,
        gapX: 66,
        nodes: [
          {
            id: "insured", at: [1, 1], span: 2, tone: "ink", label: "The insured", sub: "One claim, fifteen insurers",
            teach: "The insured has one loss and one policy, even though fifteen insurers each hold a share. It wants one conversation and one answer, not fifteen."
          },
          {
            id: "broker", at: [2, 1], label: "The broker", sub: "Presents the claim",
            teach: "The broker presents the claim and its supporting documents to the market, just as it presented the risk at placement."
          },
          {
            id: "systems", at: [2, 2], label: "ECF and CLASS", sub: "One shared claim file",
            teach: "Claims are recorded and agreed electronically. Lloyd’s uses systems including the **Electronic Claims File** (ECF) and **CLASS**, so brokers, leaders and followers work from the same documents and decisions."
          },
          {
            id: "leader", at: [3, 1], tone: "tint", label: "Claims leader", sub: "Usually the slip leader",
            teach: "Market agreements give the **claims leader**, usually the slip leader, authority to agree claims on behalf of the followers. Under the **Lloyd’s Claims Lead Arrangements**, many claims may be agreed by the leader alone.\n\n**Single Claims Agreement Party** arrangements go further, letting one leader agree claims for the whole slip on eligible contracts. Exactly what the leader may decide alone is written into the contract’s subscription agreement.",
            like: "It’s like a group holiday booking. When something goes wrong at the hotel, one person speaks to the manager for the group. Small problems are settled on the spot; for bigger ones, they check with a second member before agreeing anything."
          },
          {
            id: "second", at: [3, 2], label: "Second agreement party", sub: "For larger, complex claims",
            teach: "Larger or more complex claims also need the agreement of a **second agreement party**, another insurer on the slip. Two experienced pairs of eyes on a big decision protect the followers who rely on them."
          },
          {
            id: "followers", at: [4, 1], span: 2, label: "The followers", sub: "Bound, and kept informed",
            teach: "The followers are bound by what the leader, and where needed the second party, agree. They are kept informed of significant developments, and some decisions defined in the subscription agreement still need their own agreement.\n\nNotice the trust involved: a follower that has written 5% may pay its share of a large claim it never examined."
          }
        ],
        edges: [
          { from: "insured", to: "broker", label: "notifies", teach: "The insured notifies the claim through its broker." },
          { from: "broker", to: "systems", label: "uploads", teach: "The broker puts the claim and documents on the shared electronic file." },
          { from: "broker", to: "leader", label: "presents", teach: "The broker presents the claim to the claims leader." },
          { from: "systems", to: "second", label: "shared file", teach: "Every party works from the same file and sees the same decisions." },
          { from: "leader", to: "second", label: "consults", teach: "For larger or complex claims, the leader must get a second agreement." },
          { from: "leader", to: "followers", label: "agrees for", fromSide: "b", fromAt: 0.5, toSide: "t", toAt: 0.25, teach: "The leader’s agreement binds the followers within its authority." },
          { from: "second", to: "followers", label: "co-agrees", fromSide: "b", toSide: "t", toAt: 0.75, teach: "Where required, the second party’s agreement completes the decision for everyone." }
        ]
      },
      takeaways: [
        "The claims leader agrees claims on behalf of the following market.",
        "Larger or more complex claims may need a second agreement party.",
        "Shared electronic systems keep everyone working from the same claim file."
      ]
    },
    {
      title: "Reserves and IBNR",
      minutes: 7,
      keys: ["Case reserves", "IBNR", "Ultimate loss", "Development"],
      intro: "Insurers must say what their claims will finally cost long before every claim is settled, and the estimate is usually the largest number on the balance sheet. The diagram builds that estimate from the pieces, top to bottom. Then try the model to watch a year’s claims develop.",
      diagram: {
        cols: 3,
        nodes: [
          {
            id: "paid", at: [1, 1], label: "Paid claims", sub: "Money already out",
            teach: "**Paid claims** are what the insurer has actually paid so far. They are certain, but for a recent year they are only a small part of the eventual total."
          },
          {
            id: "case", at: [1, 2], label: "Case reserves", sub: "Known claims, still open",
            teach: "A **case reserve** is the claims handler’s estimate of the cost of a specific reported claim that isn’t yet settled."
          },
          {
            id: "tri", at: [1, 3], label: "Past patterns", sub: "Development triangles",
            teach: "Actuaries project the future from the past, using **development triangles**: tables showing how each earlier year’s claims grew over time. If past years’ claims typically doubled after year one, this year’s probably will too."
          },
          {
            id: "incurred", at: [2, 1], span: 2, label: "Incurred claims", sub: "Paid plus case reserves",
            teach: "**Incurred** claims are paid claims plus case reserves: everything the insurer knows about. Incurred usually rises faster than paid, because claims are reserved before they are paid."
          },
          {
            id: "ibnr", at: [2, 3], tone: "brass", label: "IBNR", sub: "Not yet reported",
            teach: "**IBNR**, incurred but not reported, is the actuaries’ estimate for claims that have happened but haven’t been notified, together with the expected further growth in known claims.\n\nLong-tail classes need large IBNR reserves because their claims emerge slowly.",
            like: "IBNR is like estimating the bills still to come after a large party. You know what you’ve paid and which invoices are on your desk, but past parties tell you a few more will arrive next month, so you set money aside now."
          },
          {
            id: "ult", at: [3, 1], span: 3, tone: "ink", label: "Ultimate loss", sub: "Paid + case reserves + IBNR",
            teach: "The **ultimate loss** is the final total cost once every claim has been settled: paid claims plus case reserves plus IBNR.\n\nSuppose paid claims are £30m, case reserves £20m and IBNR £10m. The ultimate is £60m, of which only half has been paid."
          },
          {
            id: "dev", at: [4, 1], span: 2, label: "Reserve development", sub: "Releases and strengthening",
            teach: "Estimates change as claims emerge. **Releasing** reserves, because claims cost less than feared, increases profit; **strengthening** them reduces it. A market whose reserves keep developing badly is a market that under-priced its past business."
          },
          {
            id: "result", at: [4, 3], label: "The result", sub: "Profit, RITC, capital",
            teach: "Reserves feed directly into a syndicate’s result, into the reinsurance to close premium when a year closes, and into the capital it must hold."
          }
        ],
        edges: [
          { from: "paid", to: "incurred", teach: "Paid claims are part of incurred." },
          { from: "case", to: "incurred", teach: "So are case reserves on open claims." },
          { from: "tri", to: "ibnr", label: "projects", teach: "Past development patterns let actuaries project what is still to come." },
          { from: "incurred", to: "ult", teach: "What is known so far..." },
          { from: "ibnr", to: "ult", teach: "...plus what is expected but not yet known gives the ultimate." },
          { from: "ult", to: "dev", label: "changes", teach: "The ultimate is re-estimated every quarter as claims develop." },
          { from: "ult", to: "result", label: "drives", teach: "Every change in the ultimate flows straight into the result." }
        ]
      },
      explore: "ibnr",
      think: { q: "Paid claims for an underwriting year total £30m and case reserves £20m. Actuaries estimate IBNR at £10m. What is the estimated ultimate loss, and what proportion of it has been paid?", a: "Ultimate loss is £30m + £20m + £10m = £60m, of which £30m, or half, has been paid." },
      takeaways: [
        "Reserves are estimates of the claims still to be paid.",
        "IBNR covers claims that have occurred but have not yet been reported, and growth in known claims.",
        "Ultimate loss is paid claims plus case reserves plus IBNR; changes in it flow into results."
      ]
    },
    {
      title: "Recoveries: subrogation, contribution and salvage",
      minutes: 5,
      keys: ["Subrogation", "Contribution", "Salvage", "Indemnity"],
      intro: "Paying a claim isn’t always the end of the story: the insurer may be able to recover some of the money. Start with the principle at the top, then see the three ways the cost of a claim can be brought down.",
      diagram: {
        cols: 3,
        nodes: [
          {
            id: "indemnity", at: [1, 1], span: 3, tone: "tint", label: "Indemnity", sub: "No better and no worse off",
            teach: "All three recoveries follow from the principle of **indemnity**: insurance should put the insured back where it was before the loss, no better and no worse. If the insured could keep the insurer’s money and also sue the wrongdoer, or claim twice, it would profit from its loss."
          },
          {
            id: "paid", at: [2, 1], span: 3, tone: "ink", label: "The insurer pays £10m", sub: "For a warehouse fire",
            teach: "A contractor’s negligence starts a fire that destroys a warehouse, and the property insurer pays £10m. The insured is made whole. Now the insurer looks at what it can recover."
          },
          {
            id: "subro", at: [3, 1], label: "Subrogation", sub: "Pursue who caused it",
            teach: "Having paid, the insurer **stands in the insured’s shoes** and may pursue whoever caused the loss. Here, the property insurer may sue the negligent contractor, and in practice the contractor’s liability insurer.",
            like: "It’s like a friend paying your dry-cleaning bill after a waiter spills soup on you, then taking it up with the restaurant. You’re made whole, and your friend pursues whoever was responsible."
          },
          {
            id: "contrib", at: [3, 2], label: "Contribution", sub: "Share with another policy",
            teach: "If two policies cover the same loss, the insurers **share** it, so the insured can’t recover twice. An insurer that has paid in full can recover the other’s share. The model shows how the split is worked out."
          },
          {
            id: "salvage", at: [3, 3], label: "Salvage", sub: "Sell what’s left",
            teach: "After paying for a total loss, the insurer takes ownership of the damaged property and sells what it can. In marine insurance, **salvage** also means the reward paid to those who save a ship or its cargo."
          },
          {
            id: "net", at: [4, 1], span: 3, tone: "good", label: "The insurer’s net cost", sub: "Paid, less what it recovers",
            teach: "The insurer’s true cost is what it paid less what it recovers. Insurers also make claims under their own **reinsurance**, a recovery of a different kind that Module 09 explores.\n\nRecoveries matter commercially: a strong recovery team can make a real difference to a loss ratio."
          }
        ],
        edges: [
          { from: "indemnity", to: "paid", label: "limits", teach: "Indemnity limits the insured to its actual loss, which is what creates the rights to recover." },
          { from: "paid", to: "subro", teach: "One route: pursue the wrongdoer." },
          { from: "paid", to: "contrib", teach: "Another: share with an overlapping insurer." },
          { from: "paid", to: "salvage", teach: "A third: recover value from the damaged property." },
          { from: "subro", to: "net", label: "recovers", teach: "Money recovered from the wrongdoer reduces the net cost." },
          { from: "contrib", to: "net", label: "shares", teach: "The other insurer’s share reduces it too." },
          { from: "salvage", to: "net", label: "recoups", teach: "So does whatever the damaged property fetches." }
        ]
      },
      explore: "contribution",
      takeaways: [
        "Subrogation lets insurers pursue third parties who caused a loss.",
        "Contribution shares a loss between overlapping policies; salvage recovers value from damaged property.",
        "All recoveries uphold the principle of indemnity."
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
