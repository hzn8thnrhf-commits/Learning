/* LM2 · 8 — Claims */
(() => {
  const { bars, flow, stats, recap, money, pct } = window.SLIP.kit;
  const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  window.SLIP.chapters.push({
    id: "claims", part: "LM2",
    title: "Claims",
    blurb: "The claim is the product. Who handles it, what the policy pays, which year responds, and where a complaint goes.",
    minutes: 9,
    init: { loss: 4, exc: 0.5, lim: 5, delay: 13, retro: 0 },
    steps: [
      {
        h: "The path of a claim",
        say: "The insured tells its broker; the broker notifies the insurers and collects the money when the claim is agreed. In between, insurers ask three questions in order: **Is there a valid policy? Is the loss covered? How much?**",
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
          opts: ["All twelve, one by one.", "The leader, sometimes with a second insurer, for everyone."],
          a: 1,
          why: "Market claims schemes let the leader, plus a second **agreement party** for larger or complex claims, bind the followers. The client deals with one decision, not twelve."
        }
      },
      {
        h: "The experts",
        say: "Insurers rarely investigate alone.\n\nA **loss adjuster** investigates and quantifies property and liability claims. Paid by insurers, expected to be impartial. A **surveyor** inspects damaged ships and cargo. An **average adjuster** works out who bears what after a marine casualty. **Lawyers** defend liability claims.\n\nAn expert hired by the *insured* to argue its case is a **loss assessor**.",
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
          q: "A container ship jettisons cargo to save the vessel. Who works out how the loss is shared among everyone with an interest?",
          opts: ["A loss assessor.", "An average adjuster."],
          a: 1,
          why: "That sacrifice is **general average**: everyone whose property was saved contributes. Calculating it is the average adjuster’s speciality."
        }
      },
      {
        h: "How much?",
        say: "Two numbers frame every payment. The **excess** (or deductible) is the first part of each loss, borne by the insured. The **limit** is the most the policy pays.",
        scene: (v) => {
          const paid = Math.max(0, Math.min(v.loss - v.exc, v.lim)), over = Math.max(0, v.loss - v.exc - v.lim), kept = Math.min(v.loss, v.exc);
          return stats([["Loss", money(v.loss)], ["Insurers pay", money(paid), "c1"], ["Insured bears", money(kept + over), over > 0 ? "bad" : "c2"]]) +
            bars([{ label: "The loss", segs: [[kept, "c2", "Excess"], [paid, "c1", "Paid"], [over, "hole", "Over the limit"]] }], { max: 10, marks: [[v.exc + v.lim, "Top of cover"]] });
        },
        ctl: [{ k: "loss", label: "Size of the loss", min: 0.2, max: 10, step: 0.2, fmt: money }, { k: "exc", label: "Excess", min: 0, max: 2, step: 0.1, fmt: money }, { k: "lim", label: "Limit", min: 1, max: 8, step: 0.5, fmt: money }],
        live: (v) => (v.loss <= v.exc ? "The loss is inside the excess: no claim at all. That is the point. An excess removes small claims that cost more to handle than they are worth, and keeps the insured careful."
          : v.loss - v.exc > v.lim ? "The loss has gone through the top of the cover. The insured bears both the excess and everything above the limit." : "An ordinary claim: the insured bears the excess, insurers pay the rest.")
      },
      {
        h: "Which year’s policy?",
        say: "A firm buys annual policies. Something goes wrong in one year; the claim arrives in another. The policy’s **trigger** decides which year pays. **Losses occurring** asks *when did it happen?* **Claims made** asks *when was the claim made?*",
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
        }
      },
      {
        h: "The regulator’s claims rules",
        say: "The FCA’s insurance conduct rules (ICOBS) require insurers to handle claims **promptly and fairly**, give reasonable guidance to help the policyholder claim, not **unreasonably reject** a claim, and settle promptly once terms are agreed.\n\nFor consumers, rejecting a claim over a breach that had nothing to do with the loss is generally unreasonable.",
        scene: () => recap(["Handle claims promptly and fairly", "Help the policyholder make the claim", "Don’t unreasonably reject", "Settle promptly once agreed"]),
        ask: {
          q: "A consumer’s home policy requires window locks. A burglar comes in through an unlocked front door the policy says nothing about. May the insurer refuse over missing window locks?",
          opts: ["Yes. A condition was breached.", "Generally no. The breach was unconnected to the loss."],
          a: 1,
          why: "The Insurance Act 2015 points the same way for all insureds: a term aimed at one kind of loss can’t be used to defeat a claim for a different kind."
        }
      },
      {
        h: "When the customer complains",
        say: "Firms must have a complaints procedure. If an **eligible complainant**, broadly a consumer or a small business, is still unhappy, they can go to the **Financial Ombudsman Service**: free, informal, and able to decide on what is fair, not only on strict law.",
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
          q: "The Ombudsman decides for the customer. Who is bound by that decision?",
          opts: ["Both sides.", "The insurer. The customer can still reject it and go to court."],
          a: 1,
          why: "If the customer accepts, the insurer must comply. If the customer rejects it, they keep the right to sue. The insurer has no such choice."
        }
      },
      {
        h: "Last checks before paying",
        say: "Two things happen before money leaves. **Sanctions:** the payee, and everyone the money passes through, is screened again, because lists change between inception and claim. **Recoveries:** having paid, the insurer considers subrogation against whoever caused the loss, and its own reinsurance.\n\nAnd if the *insurer* fails, eligible policyholders look to the **FSCS**.",
        scene: () => flow({
          h: 130,
          nodes: [
            { id: "s", x: 4, y: 40, w: 104, label: "Sanctions", sub: "Screen the payee", tone: "bad" },
            { id: "p", x: 118, y: 40, w: 104, label: "Pay", tone: "c1" },
            { id: "r", x: 232, y: 40, w: 104, label: "Recover", sub: "Subrogation, RI" }
          ],
          edges: [["s", "p"], ["p", "r"]]
        }),
        ask: {
          q: "A valid cargo claim is agreed. Screening shows the cargo owner was added to the UK sanctions list last month. Pay?",
          opts: ["Yes. The claim is valid and the policy predates the listing.", "No. Paying could itself breach sanctions."],
          a: 1,
          why: "A valid claim doesn’t override the law. The payment is frozen and the matter reported; a licence would be needed to pay."
        }
      },
      {
        h: "In five lines",
        say: "That completes the principles and practices. Part three looks at the same market from the underwriter’s chair.",
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
