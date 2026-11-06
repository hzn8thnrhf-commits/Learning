/* The Slip — Law and principles */
window.SLIP_DATA = window.SLIP_DATA || {};
(window.SLIP_DATA.modules = window.SLIP_DATA.modules || []).push({
  id: "m09",
  title: "Law and principles",
  short: "Law",
  blurb: "The legal principles behind every London policy, the Insurance Act 2015, policy triggers and how disputes are resolved.",
  outcomes: [
    "Explain insurable interest, utmost good faith, indemnity and proximate cause.",
    "Describe the duty of fair presentation under the Insurance Act 2015 and the remedies for breaching it.",
    "Explain how the 2015 Act changed the law on warranties.",
    "Distinguish losses-occurring, claims-made and risks-attaching triggers, and describe how disputes are resolved."
  ],
  lessons: [
    {
      title: "Core principles",
      minutes: 7,
      keys: ["Insurable interest", "Utmost good faith", "Indemnity", "Proximate cause"],
      intro: "Insurance law rests on a handful of principles, most of them worked out by English judges in marine cases over three centuries and codified in the Marine Insurance Act 1906. The diagram arranges them as the questions a claim has to answer: is there a valid contract, is this loss covered, and how much should be paid?",
      diagram: {
        cols: 2,
        gapX: 66,
        nodes: [
          {
            id: "interest", at: [1, 1], label: "Insurable interest", sub: "You must stand to lose",
            teach: "The insured must stand to lose financially if the insured event happens. A business may insure its own warehouse, but not a stranger’s.\n\nWhy insist on this? Without it, insurance becomes a bet on someone else’s misfortune, and a bet that may tempt the bettor to bring the misfortune about."
          },
          {
            id: "faith", at: [1, 2], label: "Utmost good faith", sub: "Honesty, both ways",
            teach: "Both parties must deal with each other honestly and openly. Historically the duty bore heavily on the insured: any failure to disclose a material fact let the insurer avoid the whole policy.\n\nThe reason is an imbalance of information. The client knows its own business far better than any underwriter can. For business insurance the Insurance Act 2015 now spells out what the duty requires, as the next lesson shows."
          },
          {
            id: "contract", at: [2, 1], span: 2, tone: "ink", label: "A valid insurance contract", sub: "A promise to indemnify",
            teach: "With an insurable interest and good faith in place, we have a valid contract: the insurer promises to indemnify the insured against defined losses in return for a premium.\n\nWhen a loss happens, the contract has to answer two separate questions. First, is this loss covered at all? Second, how much should be paid? The two boxes below take them in turn."
          },
          {
            id: "cause", at: [3, 1], tone: "brass", label: "Proximate cause", sub: "Is this loss covered?",
            teach: "Whether a loss is covered depends on its **proximate cause**: the dominant or effective cause, not simply the last thing that happened before the loss.\n\nSuppose a ship catches fire while its crew fight off an armed attack, and the hull policy excludes war risks. If the court finds the attack was the effective cause, the war risks policy responds, not the hull policy.",
            like: "It’s like working out why a row of dominoes fell. The last domino struck the table, but the cause was whatever knocked over the first one. The courts look for that effective cause."
          },
          {
            id: "indemnity", at: [3, 2], tone: "tint", label: "Indemnity", sub: "How much is paid?",
            teach: "Insurance should restore the insured to the financial position it was in before the loss: no better and no worse. Some covers, such as personal accident, pay fixed sums instead.\n\nIndemnity has a sharp edge when property is underinsured. Many policies are **subject to average**: if the sum insured is only 60% of the true value, only 60% of any loss is paid. Try the model to see why."
          },
          {
            id: "contribution", at: [4, 1], label: "Contribution", sub: "Two policies share the loss",
            teach: "If two policies cover the same loss, the insured can’t claim in full from both. **Contribution** lets an insurer who has paid recover a fair share from the other, usually in proportion to their liability.\n\nYou’ll see it again among the recoveries in Module 08."
          },
          {
            id: "subrogation", at: [4, 2], label: "Subrogation", sub: "The insurer steps into your shoes",
            teach: "Once it has paid, the insurer takes over the insured’s rights against anyone responsible for the loss: the negligent contractor, the careless driver. This is **subrogation**.\n\nIt stops the insured being paid twice, once by the insurer and once by the wrongdoer, and it lets the insurer recover some of what it paid."
          }
        ],
        edges: [
          { from: "interest", to: "contract", label: "needed for", teach: "No insurable interest, no valid insurance contract." },
          { from: "faith", to: "contract", label: "governs", teach: "Good faith governs how the contract is formed and how both sides behave under it." },
          { from: "contract", to: "cause", label: "first", fromSide: "b", fromAt: 0.25, teach: "The first question about any loss: what caused it, and is that cause covered?" },
          { from: "contract", to: "indemnity", label: "then", fromSide: "b", fromAt: 0.75, teach: "The second question: how much will put the insured back where it was?" },
          { from: "cause", to: "indemnity", label: "if covered", teach: "Only once a covered cause is established does the measure of indemnity matter." },
          { from: "indemnity", to: "contribution", label: "no double pay", teach: "Because indemnity forbids profit, two insurers covering one loss share it rather than both paying in full." },
          { from: "indemnity", to: "subrogation", label: "no profit", teach: "For the same reason, the insurer takes over the insured’s rights against whoever caused the loss." }
        ]
      },
      explore: "average",
      think: { q: "A ship is damaged by a fire that spreads because the crew are fighting off an armed attack. The hull policy excludes war risks. Why might the outcome depend on proximate cause?", a: "If the court finds that the dominant cause of the damage was the attack, a war risk, the hull policy may not respond and the war risks policy will. If it finds that the fire was the effective cause, the hull policy may respond. The answer turns on the effective cause, not merely on the last event." },
      takeaways: [
        "Insurable interest and utmost good faith underpin a valid contract.",
        "Proximate cause decides whether a loss is covered; indemnity decides how much is paid.",
        "Contribution and subrogation follow from indemnity and stop the insured profiting from a loss.",
        "The Marine Insurance Act 1906 codified much of the law."
      ]
    },
    {
      title: "The Insurance Act 2015: fair presentation",
      minutes: 6,
      keys: ["Fair presentation", "Material circumstances", "No data dumping", "Reasonable search"],
      intro: "The Insurance Act 2015 replaced the old duty of disclosure for business insurance with a duty of fair presentation. Read the diagram from top to bottom: what the insured is taken to know, the three things a fair presentation requires, and the part the insurer must play in return.",
      diagram: {
        cols: 6,
        nodes: [
          {
            id: "insured", at: [1, 1], span: 6, tone: "ink", label: "The insured business", sub: "Before the contract is made",
            teach: "The duty applies before the contract is entered into, and again before any variation. It belongs to the insured, but in practice the broker does much of the work of presenting the risk.\n\nThe Act came into force in August 2016 and covers business insurance. Consumers are treated differently: under a 2012 Act they need only take reasonable care to answer the insurer’s questions accurately."
          },
          {
            id: "knows", at: [2, 1], span: 3, label: "What it knows", sub: "Senior management, insurance team",
            teach: "A company’s knowledge isn’t everything known by every employee. Under the Act it includes what is known to its **senior management** and to the people responsible for its insurance."
          },
          {
            id: "search", at: [2, 4], span: 3, label: "Reasonable search", sub: "What it ought to know",
            teach: "The insured is also taken to know what a **reasonable search** would reveal, for example by asking around the business, its agents and others who hold relevant information.\n\nSo a board can’t avoid the duty by not asking questions."
          },
          {
            id: "duty", at: [3, 1], span: 6, tone: "tint", label: "The duty of fair presentation", sub: "Three requirements",
            teach: "A fair presentation has three parts, shown in the row below: disclose what’s material, do it in a way an underwriter can actually use, and make sure what you say is accurate.\n\nNotice the balance the Act strikes. The insured must be open, but the insurer can’t sit back and wait to be told everything.",
            like: "It’s like selling a used car to an expert buyer. You must mention the faulty gearbox, and you can’t hide it in a box of four hundred receipts. You needn’t explain what a gearbox is, and if the buyer spots a warning light, it’s for the buyer to ask."
          },
          {
            id: "material", at: [4, 1], span: 2, label: "Material", sub: "Or enough to prompt questions",
            teach: "The insured must disclose every **material circumstance** it knows or ought to know: anything that would influence a prudent insurer’s decision to accept the risk or on what terms.\n\nOr it can give enough information to put a prudent insurer on notice that it should ask further questions."
          },
          {
            id: "clear", at: [4, 3], span: 2, label: "Clear", sub: "No data dumping",
            teach: "The disclosure must be **reasonably clear and accessible**. Burying the one important fact in thousands of documents, sometimes called **data dumping**, is not a fair presentation."
          },
          {
            id: "accurate", at: [4, 5], span: 2, label: "Accurate", sub: "Facts right, beliefs honest",
            teach: "Every material representation of fact must be **substantially correct**, and every representation of expectation or belief must be made in good faith.\n\nA forecast that turns out wrong isn’t a breach; a forecast the insured didn’t honestly hold is."
          },
          {
            id: "insurer", at: [5, 1], span: 6, tone: "brass", label: "The insurer’s part", sub: "Knows its class, asks questions",
            teach: "The insurer is expected to know matters of common knowledge in its class of business, and to ask questions when a presentation raises concerns. If a presentation hints at a problem and the underwriter doesn’t follow it up, the insured may not be in breach.\n\nSo fair presentation is really a conversation, not a one-way confession."
          }
        ],
        edges: [
          { from: "insured", to: "knows", teach: "The Act defines whose knowledge counts, so the duty can be applied to a company." },
          { from: "insured", to: "search", teach: "It also extends the duty to what the insured would find if it looked properly." },
          { from: "knows", to: "duty", teach: "Everything the insured knows feeds into what it must present." },
          { from: "search", to: "duty", teach: "So does everything a reasonable search would reveal." },
          { from: "duty", to: "material", teach: "First requirement: disclose what matters, or enough to prompt questions." },
          { from: "duty", to: "clear", teach: "Second: make it usable." },
          { from: "duty", to: "accurate", teach: "Third: get the facts right and hold your beliefs honestly." },
          { from: "material", to: "insurer", teach: "A fair hint puts the insurer on notice to ask." },
          { from: "clear", to: "insurer", teach: "The underwriter must be able to find and read what matters." },
          { from: "accurate", to: "insurer", teach: "The underwriter relies on what it is told being true." }
        ]
      },
      think: { q: "A client sends its underwriter a 4,000-page data room in which, on page 3,112, a previous fire is mentioned. Has it made a fair presentation?", a: "Probably not. The fact may have been disclosed, but not in a reasonably clear and accessible manner. Data dumping of this kind is exactly what the Act’s second requirement is meant to prevent." },
      takeaways: [
        "Business insureds owe a duty of fair presentation before the contract is made.",
        "Material circumstances must be disclosed clearly and accessibly, and representations must be accurate.",
        "Insurers are expected to know their class and to ask questions when a presentation raises concerns."
      ]
    },
    {
      title: "Remedies and warranties",
      minutes: 7,
      keys: ["Proportionate remedies", "Warranties suspend", "Section 11", "Basis clauses"],
      intro: "Under the old law, almost any slip by the insured could cost it all its cover. The 2015 Act replaced that all-or-nothing approach with remedies that fit the breach. The first diagram is a decision tree for an unfair presentation; the second shows what changed for warranties.",
      diagram: [
        {
          name: "Remedies",
          cols: 3,
          gap: 50,
          nodes: [
            {
              id: "breach", at: [1, 1], span: 3, tone: "ink", label: "An unfair presentation", sub: "Something material wasn’t fairly presented",
              teach: "Under the old law any breach of the duty of disclosure let the insurer **avoid** the policy, treating it as though it had never existed. That was harsh: a careless omission could wipe out a large, unrelated claim.\n\nThe 2015 Act asks two questions instead, and the remedy depends on the answers."
            },
            {
              id: "q1", at: [2, 1], span: 3, tone: "q", label: "Was it deliberate or reckless?",
              teach: "The first question is about the insured’s state of mind. A **deliberate** breach is a knowing one; a **reckless** one means the insured didn’t care whether it was complying. The insurer has to prove it."
            },
            {
              id: "keep", at: [3, 1], tone: "bad", label: "Avoid and keep the premium",
              teach: "If the breach was deliberate or reckless, the insurer may avoid the policy, refuse all claims and **keep the premium**. Dishonesty is still punished hard."
            },
            {
              id: "q2", at: [3, 2], span: 2, tone: "q", label: "What would the insurer have done?",
              teach: "If the breach was innocent or careless, the question becomes: what would this insurer have done if it had been told? The remedy then puts the insurer in that position, no more.\n\nThis is the heart of the reform: the remedy is **proportionate** to the harm."
            },
            {
              id: "decline", at: [4, 1], label: "Avoid, return premium", sub: "It would have declined",
              teach: "If the insurer would have declined the risk altogether, it may avoid the policy, but must **return the premium**. The insured is treated as never having been covered, and gets its money back."
            },
            {
              id: "terms", at: [4, 2], label: "Apply those terms", sub: "It would have changed terms",
              teach: "If the insurer would have written the risk on different terms, say with an exclusion, the contract is treated **as if those terms applied**. A claim that the exclusion would have caught is not paid; others are."
            },
            {
              id: "prop", at: [4, 3], tone: "brass", label: "Cut claims in proportion", sub: "It would have charged more",
              teach: "If the insurer would have charged more premium, claims are **reduced in proportion**. Suppose it charged £100,000 but would have charged £150,000. It pays £100,000 ÷ £150,000, two-thirds, of each claim: £666,667 of a £1m claim. The model lets you vary this."
            }
          ],
          edges: [
            { from: "breach", to: "q1", teach: "Every remedy starts with the insured’s state of mind." },
            { from: "q1", to: "keep", label: "yes", teach: "Deliberate or reckless: the harshest remedy." },
            { from: "q1", to: "q2", label: "no", teach: "Innocent or careless: look at what the insurer would have done." },
            { from: "q2", to: "decline", label: "decline", at: 0.72, teach: "It would never have written the risk." },
            { from: "q2", to: "terms", label: "terms", at: 0.72, teach: "It would have written it, but differently." },
            { from: "q2", to: "prop", label: "price", at: 0.72, teach: "It would have written it for a higher price." }
          ]
        },
        {
          name: "Warranties",
          intro: "A warranty is a promise by the insured, such as keeping a sprinkler system working. The Act changed what happens when one is broken.",
          cols: 2,
          gapX: 64,
          nodes: [
            {
              id: "basis", at: [1, 1], tone: "q", label: "Basis clauses", sub: "Abolished",
              teach: "A **basis of the contract clause** turned every answer on a proposal form into a warranty, so a trivial wrong answer could defeat any claim. The 2015 Act abolished them for business insurance."
            },
            {
              id: "warranty", at: [1, 2], tone: "ink", label: "A warranty", sub: "e.g. sprinklers kept working",
              teach: "A **warranty** is a promise by the insured about a fact or a state of affairs, for example that the sprinkler system will be maintained in working order throughout the policy."
            },
            {
              id: "old", at: [2, 1], tone: "bad", label: "Old law", sub: "Breach ends cover for good",
              teach: "Under the old law any breach of warranty automatically discharged the insurer from liability from that moment, even if the breach was later put right and had nothing to do with a later loss.",
              like: "Under the old law, forgetting to set a burglar alarm was a red card: you were sent off for the rest of the match."
            },
            {
              id: "suspend", at: [2, 2], tone: "good", label: "2015 Act", sub: "Cover suspended until remedied",
              teach: "Now a breach of warranty **suspends** cover only until the breach is remedied. Losses during the breach aren’t covered; once the sprinklers are fixed, cover resumes.",
              like: "Under the 2015 Act it’s more like the sin bin: off the pitch while the breach lasts, back on once it’s put right."
            },
            {
              id: "s11", at: [3, 1], span: 2, tone: "tint", label: "Section 11", sub: "Irrelevant breaches don’t count",
              teach: "Where a term is designed to reduce the risk of a particular kind of loss, the insurer can’t rely on non-compliance if the insured shows it **could not have increased the risk of the loss that actually occurred**.\n\nIf the burglar alarm wasn’t set and the warehouse floods, the alarm is irrelevant to the flood, so the claim is paid."
            },
            {
              id: "out", at: [4, 1], span: 2, label: "Contracting out", sub: "Possible, but only if clear",
              teach: "Businesses can agree to contract out of some of these provisions, but only if the change is clear and unambiguous and the insured is made aware of it. The default rules protect the insured unless it knowingly gives them up.\n\nSeparately, since 2017 insurers must pay valid claims within a reasonable time, and can be liable for damages if they don’t."
            }
          ],
          edges: [
            { from: "basis", to: "warranty", label: "created", dash: true, teach: "Basis clauses used to create warranties out of proposal-form answers." },
            { from: "warranty", to: "old", label: "then", teach: "Before 2016, a breach ended cover permanently." },
            { from: "warranty", to: "suspend", label: "now", teach: "Since 2016, a breach only suspends cover while it lasts." },
            { from: "suspend", to: "s11", label: "plus", teach: "And a breach that couldn’t have affected the actual loss can’t be relied on at all." },
            { from: "s11", to: "out", label: "unless", teach: "These protections apply unless the parties clearly agree otherwise." }
          ]
        }
      ],
      explore: "proportionate",
      takeaways: [
        "Remedies for an unfair presentation are now proportionate to the breach and to what the insurer would have done.",
        "A breach of warranty suspends cover until it is remedied, rather than ending it.",
        "Section 11 prevents insurers relying on breaches that could not have affected the loss.",
        "Insurers must pay valid claims within a reasonable time."
      ]
    },
    {
      title: "Policy triggers",
      minutes: 6,
      keys: ["Losses occurring", "Claims made", "Risks attaching", "Retroactive dates"],
      intro: "When does a policy respond? It depends on its trigger: the event that decides which policy year picks up a loss. Mismatched triggers are a classic cause of gaps in cover. The first diagram covers direct insurance, the second reinsurance.",
      diagram: [
        {
          name: "Direct insurance",
          cols: 2,
          gapX: 76,
          nodes: [
            {
              id: "event", at: [1, 1], span: 2, tone: "ink", label: "Something goes wrong", sub: "A fire, or negligent advice",
              teach: "Every claim has at least two dates: when the damage or wrongful act happened, and when the claim was made. For a fire, they are close together. For negligent professional advice, years may separate them.\n\nThe trigger tells us which date picks the policy year."
            },
            {
              id: "lo", at: [2, 1], label: "Losses occurring", sub: "When did it happen?",
              teach: "A **losses-occurring** policy covers losses that happen during the policy period, whenever they are reported.\n\nIt suits risks where the loss is obvious and immediate.",
              like: "A losses-occurring policy is like a gym membership: what matters is when you used the gym."
            },
            {
              id: "cm", at: [2, 2], label: "Claims made", sub: "When was it claimed?",
              teach: "A **claims-made** policy covers claims first made against the insured during the policy period, whenever the underlying event occurred, subject to any **retroactive date**.\n\nIt suits liability risks where claims arrive long after the event, because the insurer can close its books on a policy year much sooner.",
              like: "A claims-made policy is like a warranty helpline: what matters is when you call, not when the fault developed."
            },
            {
              id: "property", at: [3, 1], label: "Property cover", sub: "Fires, storms, floods",
              teach: "Property insurance is usually written on a losses-occurring basis. If a storm damages the warehouse in March 2025, the policy in force in March 2025 responds, even if the claim is notified later."
            },
            {
              id: "pi", at: [3, 2], label: "PI and D&O", sub: "Liability for advice and decisions",
              teach: "Professional indemnity and directors’ and officers’ liability are usually claims-made. A claim made in 2026 about advice given in 2023 falls on the 2026 policy, provided the advice post-dates its retroactive date."
            },
            {
              id: "gap", at: [4, 1], tone: "bad", label: "A gap in cover", sub: "Switching carelessly",
              teach: "A firm moves its claims-made PI to a new insurer, which sets a retroactive date equal to the new policy’s start. A claim then arrives about advice given two years earlier. The old policy has expired, and the new one excludes work before its retroactive date: no cover.\n\nBrokers avoid this by preserving the original retroactive date, or by arranging run-off cover when a firm stops trading."
            },
            {
              id: "retro", at: [4, 2], label: "Retroactive date", sub: "How far back it reaches",
              teach: "The **retroactive date** is the earliest date of the wrongful act a claims-made policy will cover. Continuous cover usually keeps the same retroactive date year after year, so the policy reaches back to when the firm first bought cover."
            }
          ],
          edges: [
            { from: "event", to: "lo", label: "date of loss", teach: "Under a losses-occurring trigger, the date of the loss picks the policy." },
            { from: "event", to: "cm", label: "date of claim", teach: "Under a claims-made trigger, the date the claim is first made picks the policy." },
            { from: "lo", to: "property", label: "typical for", teach: "Losses-occurring suits immediate, obvious losses like property damage." },
            { from: "cm", to: "pi", label: "typical for", teach: "Claims-made suits long-tail liability like professional negligence." },
            { from: "pi", to: "retro", label: "limited by", teach: "A claims-made policy reaches back only as far as its retroactive date." },
            { from: "retro", to: "gap", label: "can cause", teach: "Resetting the retroactive date when changing insurer can leave earlier work uninsured." }
          ]
        },
        {
          name: "Reinsurance",
          intro: "Reinsurance treaties need a trigger too, because the reinsurer is covering a whole year’s worth of the cedant’s policies, which start on different dates.",
          cols: 2,
          nodes: [
            {
              id: "treaty", at: [1, 1], span: 2, tone: "ink", label: "A 2025 treaty", sub: "Covers the cedant’s book",
              teach: "Picture a reinsurance treaty running for calendar 2025. The cedant writes policies all through 2024 and 2025, each running for twelve months. Which of their losses does the 2025 treaty pick up? There are two common answers."
            },
            {
              id: "ra", at: [2, 1], label: "Risks attaching", sub: "Policies starting in 2025",
              teach: "On a **risks-attaching** basis, the treaty covers losses on original policies that **incept during the treaty period**, even if the losses happen later. A policy written in December 2025 is covered by this treaty for its whole life, well into 2026."
            },
            {
              id: "lod", at: [2, 2], label: "Losses occurring during", sub: "Losses in 2025",
              teach: "On a **losses-occurring-during** basis, the treaty covers losses that **happen during the treaty period**, whenever the original policies incepted. A 2024 policy’s loss in March 2025 falls on this treaty."
            },
            {
              id: "raex", at: [3, 1], tone: "tint", label: "Picks up a 2026 loss", sub: "On a December 2025 policy",
              teach: "Notice the long tail: a risks-attaching treaty can be exposed to losses for up to two years, because its last policies run for twelve months after it ends. Reinsurers price that in."
            },
            {
              id: "lodex", at: [3, 2], tone: "brass", label: "Picks up a 2025 loss", sub: "On a June 2024 policy",
              teach: "A losses-occurring-during treaty finishes cleanly at the end of its period, but at renewal the cedant must make sure the next treaty picks up where it left off, or losses can fall between the two."
            }
          ],
          edges: [
            { from: "treaty", to: "ra", teach: "One way to define what the treaty covers: by when the original policies start." },
            { from: "treaty", to: "lod", teach: "The other: by when the losses happen." },
            { from: "ra", to: "raex", label: "so it", teach: "Because it follows policies, a risks-attaching treaty runs on after its own period." },
            { from: "lod", to: "lodex", label: "so it", teach: "Because it follows losses, it picks up older policies’ losses during its period." }
          ]
        }
      ],
      explore: "triggers",
      takeaways: [
        "Under a losses-occurring trigger, what matters is when the loss happens.",
        "Under a claims-made trigger, what matters is when the claim is first made, back to the retroactive date.",
        "Reinsurance uses risks-attaching or losses-occurring-during bases.",
        "Mismatched triggers and reset retroactive dates can create gaps in cover."
      ]
    },
    {
      title: "Disputes, courts and arbitration",
      minutes: 5,
      keys: ["English law", "Commercial Court", "Arbitration", "Test cases"],
      intro: "Most disputes between insureds and insurers are settled quietly, but the ones that aren’t can shape wordings worldwide. Follow a coverage dispute down the escalation ladder, and notice how the choice between court and arbitration changes who gets to learn from the outcome.",
      diagram: {
        cols: 2,
        gapX: 60,
        nodes: [
          {
            id: "dispute", at: [1, 1], span: 2, tone: "ink", label: "A coverage dispute", sub: "Is this loss covered?",
            teach: "A dispute might be about whether a loss falls within the cover, how much it is worth, or whether the insurer has a remedy for a breach. Most London contracts say in advance which law applies and where disputes will be heard."
          },
          {
            id: "negotiate", at: [2, 1], label: "Negotiation", sub: "Most disputes end here",
            teach: "The great majority of disputes are settled by negotiation between the broker, the claims team and the client, often with lawyers in the background. Both sides have reasons to settle: litigation is slow, expensive and public."
          },
          {
            id: "gratia", at: [2, 2], tone: "q", label: "Ex gratia payment", sub: "Paid without admitting liability",
            teach: "An insurer may make an **ex gratia** payment: a payment it isn’t obliged to make, offered without admitting liability, often to preserve a valued client relationship. It settles the dispute without setting a precedent."
          },
          {
            id: "mediation", at: [3, 1], span: 2, label: "Mediation", sub: "A neutral helps them settle",
            teach: "In **mediation**, a neutral third party helps the parties reach their own settlement. The mediator decides nothing; the value lies in a structured, confidential conversation that often breaks a deadlock."
          },
          {
            id: "court", at: [4, 1], label: "Commercial Court", sub: "Public, sets precedent",
            teach: "The **Commercial Court** in London hears many of the world’s largest insurance disputes. Its judgments are public and become precedent, which is exactly why insurers sometimes prefer to avoid it."
          },
          {
            id: "arb", at: [4, 2], label: "Arbitration", sub: "Private and expert",
            teach: "Reinsurance disputes are often referred to **arbitration**, which is private and lets the parties appoint arbitrators who understand the market. ARIAS (UK) is a specialist body for insurance and reinsurance arbitration.\n\nThe trade-off: privacy and expertise, but no public precedent for others to learn from."
          },
          {
            id: "test", at: [5, 1], tone: "brass", label: "Test cases", sub: "e.g. the FCA BI case, 2021",
            teach: "Some cases are brought deliberately to settle a question for everyone. In the **FCA business interruption test case**, the UK Supreme Court ruled in 2021 on how business interruption policies responded to pandemic losses, a decision affecting hundreds of thousands of policyholders."
          },
          {
            id: "law", at: [5, 2], tone: "tint", label: "English law", sub: "The agreed rulebook",
            teach: "Most London Market contracts choose **English law**, which brings centuries of insurance case law and judges and arbitrators who know the market.",
            like: "Choosing English law is like agreeing which rulebook a match will be played under before kick-off. Everyone knows the rules, and decades of earlier decisions show how the referee reads them."
          }
        ],
        edges: [
          { from: "dispute", to: "negotiate", label: "first", teach: "Almost every dispute starts with negotiation." },
          { from: "dispute", to: "gratia", label: "or", teach: "Sometimes an insurer simply pays something to keep the relationship, without accepting it owed anything." },
          { from: "negotiate", to: "mediation", label: "if stuck", fromSide: "b", toSide: "t", toAt: 0.25, teach: "If negotiation stalls, a mediator can often unlock a settlement." },
          { from: "mediation", to: "court", label: "if still stuck", fromSide: "b", fromAt: 0.25, teach: "Without a settlement, the dispute goes to court, unless the contract says arbitration." },
          { from: "mediation", to: "arb", label: "or, if agreed", fromSide: "b", fromAt: 0.75, teach: "Many reinsurance contracts require arbitration instead of court." },
          { from: "court", to: "test", label: "can decide", teach: "Court judgments, especially test cases, become precedent for the whole market." },
          { from: "law", to: "arb", label: "governs", teach: "English law governs the dispute in either forum." }
        ]
      },
      takeaways: [
        "Most London contracts use English law and either the London courts or arbitration.",
        "Most disputes settle by negotiation or mediation; some insurers pay ex gratia.",
        "Court judgments and test cases, such as the FCA business interruption case, shape wordings worldwide; arbitration stays private."
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
