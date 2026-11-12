/* LM2 · 8 — Claims */
(() => {
  const { bars, flow, stats, recap, money, pct } = window.SLIP.kit;
  const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  window.SLIP.chapters.push({
    id: "claims", part: "LM2",
    title: "Claims",
    blurb: "How claims are notified, agreed and measured, which policy responds, and the regulatory standards that apply.",
    minutes: 9,
    lead: "The payment of valid claims is the purpose of an insurance contract. This chapter considers how a claim is handled, measured and, where necessary, disputed.",
    aims: [
      "Describe the stages in handling a claim and the parties involved in agreeing it.",
      "Apply an excess and a limit to a loss.",
      "Distinguish losses-occurring from claims-made cover and explain the significance of a retroactive date.",
      "State the FCA’s requirements for claims handling and the role of the Financial Ombudsman Service."
    ],
    init: { loss: 4, exc: 0.5, lim: 5, delay: 13, retro: 0 },
    steps: [
      {
        h: "The handling of a claim",
        say: "The insured notifies its broker, who notifies the insurers and, when the claim is agreed, collects the payment. In considering the claim, insurers address three questions in order. **Is there a valid policy in force? Is the loss within its terms? What is the amount payable?**",
        scene: () => flow({
          h: 250,
          nodes: [
            { id: "n", x: 95, y: 4, label: "Notify", sub: "Through the broker, promptly", tone: "ink" },
            { id: "v", x: 95, y: 68, label: "Valid policy?", sub: "In force, premium paid, terms met" },
            { id: "c", x: 95, y: 132, label: "Covered?", sub: "Peril insured, nothing excluded" },
            { id: "q", x: 95, y: 196, label: "How much?", sub: "Measure, apply excess and limit", tone: "c1" }
          ],
          edges: [["n", "v"], ["v", "c"], ["c", "q"]]
        }),
        ask: {
          q: "On a subscription risk with twelve insurers, who agrees the claim?",
          opts: [
          ["All twelve, one by one.", "That was the old way. It could take months."],
          "The leader, with a second insurer on larger claims, for everyone.",
          ["The broker.", "The broker presents and negotiates for the client. It cannot agree on the insurers’ behalf."],
          ["The loss adjuster.", "The adjuster investigates and recommends. Insurers decide."]
        ],
          a: 1,
          why: "Market claims schemes let the leader, plus a second **agreement party** for larger or complex claims, bind the followers. The client deals with one decision, not twelve."
        }
      },
      {
        h: "Specialists",
        say: "Insurers commonly appoint specialists to assist.\n\nA **loss adjuster** investigates property and liability claims and reports on cause and quantum; the adjuster is paid by insurers but is expected to act impartially. A **surveyor** examines damage to ships and cargo. An **average adjuster** apportions losses among the parties to a maritime adventure. **Lawyers** are instructed to defend liability claims.\n\nA **loss assessor**, by contrast, is retained by the insured to prepare and negotiate the claim on its behalf.",
        scene: () => flow({
          h: 170,
          nodes: [
            { id: "i", x: 95, y: 4, label: "Insurers", tone: "ink" },
            { id: "a", x: 4, y: 76, w: 104, label: "Loss adjuster" }, { id: "s", x: 118, y: 76, w: 104, label: "Surveyor" }, { id: "l", x: 232, y: 76, w: 104, label: "Lawyers" },
            { id: "x", x: 95, y: 130, label: "Loss assessor", sub: "Works for the insured", tone: "c2" }
          ],
          edges: [["i", "a"], ["i", "s"], ["i", "l"]]
        }),
        ask: {
          q: "A container ship jettisons cargo to save the vessel. Who works out how that loss is shared among everyone with property on board?",
          opts: [
          ["A loss assessor.", "An assessor argues one claimant’s case. This is a sharing calculation across all of them."],
          "An average adjuster.",
          ["A loss adjuster.", "Loss adjusters handle property and liability claims ashore."],
          ["A marine surveyor.", "The surveyor establishes what was damaged, not who contributes what."]
        ],
          a: 1,
          why: "That sacrifice is **general average**: everyone whose property was saved contributes to the loss of those whose property was sacrificed. Calculating it is the average adjuster’s speciality."
        }
      },
      {
        h: "Excess and limit",
        say: "The amount payable is bounded by two figures. The **excess**, or deductible, is the first part of each loss, which the insured bears. The **limit** is the maximum the policy will pay.",
        scene: (v) => {
          const paid = Math.max(0, Math.min(v.loss - v.exc, v.lim)), over = Math.max(0, v.loss - v.exc - v.lim), kept = Math.min(v.loss, v.exc);
          return stats([["Loss", money(v.loss)], ["Insurers pay", money(paid), "c1"], ["Insured bears", money(kept + over), over > 0 ? "bad" : "c2"]]) +
            bars([{ label: "The loss", segs: [[kept, "c2", "Excess"], [paid, "c1", "Paid"], [over, "hole", "Over the limit"]] }], { max: 10, marks: [[v.exc + v.lim, "Top of cover"]] });
        },
        ctl: [{ k: "loss", label: "Size of the loss", min: 0.2, max: 10, step: 0.2, fmt: money }, { k: "exc", label: "Excess", min: 0, max: 2, step: 0.1, fmt: money }, { k: "lim", label: "Limit", min: 1, max: 8, step: 0.5, fmt: money }],
        live: (v) => (v.loss <= v.exc ? "The loss is inside the excess: no claim at all. That is the point. An excess removes small claims that cost more to handle than they are worth, and keeps the insured careful."
          : v.loss - v.exc > v.lim ? "The loss has gone through the top of the cover. The insured bears both the excess and everything above the limit." : "An ordinary claim: the insured bears the excess, insurers pay the rest."),
        goal: {
          say: "A £9m loss. Arrange an excess and a limit so the insured bears £3m in total: part at the bottom and part at the top.",
          test: (v) => v.loss === 9 && v.lim === 6 && v.exc > 0 && v.exc < 3,
          done: "With a £6m limit, the insured always bears £3m of a £9m loss, however it is split between excess and overspill. An insured chooses its excess. It often discovers its limit."
        }
      },
      {
        h: "The basis of cover",
        say: "Where insurance is renewed annually, an event may occur in one policy period and give rise to a claim in another. Which policy responds depends on the basis on which the cover is written.\n\nA **losses-occurring** policy responds to events occurring during its period. A **claims-made** policy responds to claims first made against the insured during its period, usually provided that the event occurred after a stated **retroactive date**.",
        scene: (v) => {
          const lossM = 14, claimM = lossM + v.delay;
          const loY = Math.floor(lossM / 12), cmY = Math.floor(claimM / 12);
          const gap = v.retro && cmY >= 2 && loY < 2;
          return stats([["Losses occurring", `${2024 + loY} policy`, "c1"], ["Claims made", gap ? "No cover" : `${2024 + cmY} policy`, gap ? "bad" : "c2"]]) +
            bars([0, 1, 2, 3].map((y) => ({ label: `${2024 + y} policy`, segs: [[y * 12, "none"], [12, y === loY && y === cmY && !gap ? "c3" : y === loY ? "c1" : y === cmY ? (gap ? "hole" : "c2") : "idle"]] })),
              { max: 48, marks: claimM - lossM < 5 ? [[lossM + 0.5, "Event and claim"]] : [[lossM + 0.5, "Event"], [Math.min(claimM + 0.5, 47.5), "Claim"]] });
        },
        ctl: [
          { k: "delay", label: "The claim arrives", min: 0, max: 30, step: 1, fmt: (x) => (x ? `${x} months later` : "at once") },
          { k: "retro", label: "Firm changed insurer in 2026. Retroactive date:", opts: ["Kept from 2024", "Reset to 2026"] }
        ],
        live: (v) => {
          const cmY = Math.floor((14 + v.delay) / 12);
          if (v.retro && cmY >= 2) return "**The gap.** The claim is made in a year whose policy only covers work done since 2026, and the old policy has expired. Nobody pays. Good brokers never let a retroactive date reset.";
          return cmY === 1 ? "Event and claim fall in the same year, so both triggers agree." : "Property is written **losses occurring**: the fire is obvious on the day. Professional liability is usually **claims made**, so the insurer can close its books on old years.";
        },
        goal: {
          say: "Reset the retroactive date. Then find the shortest delay at which nobody pays the claim.",
          test: (v) => v.retro === 1 && v.delay === 10,
          done: "Ten months: the claim lands in January 2026, under a policy that only covers work done since 2026, for something done in 2025. Losses occurring cover would still have responded. On claims-made business, continuity of the retroactive date is everything."
        }
      },
      {
        h: "Regulatory requirements",
        say: "The FCA’s Insurance: Conduct of Business sourcebook (ICOBS) requires an insurer to handle claims **promptly and fairly**, to give the policyholder reasonable guidance in making a claim, not to **reject a claim unreasonably**, and to settle promptly once the claim is agreed.\n\nIn the case of a consumer, it is in general unreasonable to reject a claim for breach of a term unconnected with the circumstances of the loss.",
        scene: () => recap(["Handle claims promptly and fairly", "Help the policyholder make the claim", "Do not unreasonably reject", "Settle promptly once agreed"]),
        ask: {
          q: "A consumer’s home policy requires window locks. A burglar walks in through an unlocked front door. The windows had no locks. May the insurer refuse the claim over the windows?",
          opts: [
          ["Yes. A condition was breached.", "It was, but it had nothing to do with how the burglar got in."],
          "Generally no. The breach was unconnected to the loss.",
          ["Yes, but it must refund the premium.", "A refund does not make an unreasonable rejection reasonable."],
          ["No. Conditions never apply to consumers.", "They do. An unlocked window used by the burglar would have been a different story."]
        ],
          a: 1,
          why: "ICOBS forbids unreasonable rejection, and the Insurance Act 2015 points the same way for all insureds: a term aimed at one kind of loss cannot be used to defeat a claim for a different kind."
        }
      },
      {
        h: "Complaints",
        say: "Every firm must maintain a procedure for handling complaints. An **eligible complainant**, broadly a consumer or a small business, who remains dissatisfied may refer the complaint to the **Financial Ombudsman Service**, which is free to the complainant, informal, and empowered to decide by reference to what is fair and reasonable in the circumstances as well as to the law.",
        scene: () => flow({
          h: 190,
          nodes: [
            { id: "c", x: 95, y: 4, label: "Complaint to the firm", tone: "ink" },
            { id: "f", x: 95, y: 74, label: "Firm’s final response", sub: "Within eight weeks" },
            { id: "o", x: 95, y: 144, label: "Financial Ombudsman", sub: "Free to the complainant", tone: "c1" }
          ],
          edges: [["c", "f"], ["f", "o", "still unhappy"]]
        }),
        ask: {
          q: "The Ombudsman decides in the customer’s favour. Who is bound?",
          opts: [
          ["Both sides.", "The customer never gives up the right to go to court."],
          "The insurer, if the customer accepts the decision.",
          ["Neither: it is a recommendation.", "For the firm it is binding, up to the award limit."],
          ["The customer only.", "It is the other way round."]
        ],
          a: 1,
          why: "If the customer accepts, the insurer must comply. If the customer rejects the decision, they can still sue. The insurer has no such choice."
        }
      },
      {
        h: "Payment and recovery",
        say: "Two matters arise at the point of payment. First, the payee and any intermediary through which the payment will pass must be screened again for **sanctions**, since designations may have changed since inception. Secondly, having paid, the insurer considers its **recoveries**: by subrogation against any party responsible for the loss, and from its own reinsurers.\n\nShould the *insurer* fail, eligible policyholders may claim on the **FSCS**.",
        scene: (v) => (v.$done ? bars([
  { label: "The £2m claim", right: "paid 50:50", segs: [[1, "c1", "Insurer £1m"], [1, "c2", "Reinsurer £1m"]] },
  { label: "The £1m recovery", right: "shared 50:50", segs: [[0.5, "c1", "£500k"], [0.5, "c2", "£500k"]] }
], { max: 2 }) : flow({
  h: 130,
  nodes: [
    { id: "s", x: 4, y: 40, w: 104, label: "Sanctions", sub: "Screen the payee", tone: "bad" },
    { id: "p", x: 118, y: 40, w: 104, label: "Pay", tone: "c1" },
    { id: "r", x: 232, y: 40, w: 104, label: "Recover", sub: "Subrogation, RI" }
  ],
  edges: [["s", "p"], ["p", "r"]]
})),
        ask: {
          q: "An insurer pays a £2m fire claim. It has a 50% quota share. It then recovers £1m from the contractor who caused the fire. Who benefits from the recovery?",
          opts: [
          ["The insurer keeps all £1m.", "The reinsurer paid half the claim. It is entitled to half of what comes back."],
          "The insurer and its reinsurer, £500,000 each.",
          ["The insured.", "The insured has been indemnified. Keeping the recovery too would be double payment."],
          ["The reinsurer takes all £1m, as it paid first.", "It paid its share, not first. Recoveries follow the same proportions as the claim."]
        ],
          a: 1,
          why: "Subrogation recoveries reduce the claim, so they are shared with reinsurers in the proportions the claim was. One more check comes before any payment: **sanctions**, screened again because lists change between inception and claim."
        }
      },
      {
        h: "Summary",
        say: "This completes LM2. LM3 considers the same market from the underwriter’s position.",
        scene: () => recap([
          "Three questions: valid policy, covered loss, how much.",
          "Leaders agree claims for the followers; adjusters and surveyors investigate.",
          "The insured bears the excess and anything above the limit.",
          "Losses occurring and claims made triggers send a claim to different years.",
          "ICOBS, the Ombudsman and the FSCS protect the customer."
        ])
      }
    ]
  });
})();
