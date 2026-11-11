/* LM1 · 3 — What London insures */
(() => {
  const { bars, flow, stats, recap, money, pct } = window.SLIP.kit;
  const family = (on) => flow({
    h: 150, on,
    nodes: [
      { id: "l", x: 95, y: 4, label: "London Market", tone: "ink" },
      { id: "m", x: 4, y: 96, w: 104, label: "Marine", sub: "Ships, cargo, offshore" },
      { id: "n", x: 118, y: 96, w: 104, label: "Non-marine", sub: "Property, liability" },
      { id: "a", x: 232, y: 96, w: 104, label: "Aviation", sub: "Aircraft, airports" }
    ],
    edges: [["l", "m"], ["l", "n"], ["l", "a"]]
  });

  window.SLIP.chapters.push({
    id: "classes", part: "LM1",
    title: "What London insures",
    blurb: "Marine, non-marine and aviation, the two sides of every policy, and the idea of insuring an insurer.",
    minutes: 8,
    init: { loss: 30, keep: 10 },
    steps: [
      {
        h: "Three families",
        say: "The market sorts its business into three families, a division that goes back to its seafaring roots: **marine**, **aviation**, and everything else, called **non-marine**.\n\nAcross all three runs a fourth kind of business: **reinsurance**, insurance bought by insurers.",
        scene: () => family()
      },
      {
        h: "First party, third party",
        say: "Within every family, cover comes in two kinds.\n\n**First-party** cover pays for damage to the insured’s own property: its ship, its factory, its aircraft.\n\n**Third-party** cover pays what the insured owes to *others* it has harmed: its **liabilities**.",
        scene: () => flow({
          h: 130,
          nodes: [
            { id: "i", x: 95, y: 4, label: "The insured", tone: "ink" },
            { id: "f", x: 4, y: 84, w: 150, label: "First party", sub: "Its own property", tone: "c1" },
            { id: "t", x: 186, y: 84, w: 150, label: "Third party", sub: "What it owes others", tone: "c2" }
          ],
          edges: [["i", "f"], ["i", "t"]]
        }),
        ask: {
          q: "A tanker runs aground. Oil reaches a fishing village. Which cover pays the villagers?",
          opts: ["First-party: it is the shipowner’s accident.", "Third-party: it is the shipowner’s liability to others."],
          a: 1,
          why: "Damage to the tanker itself is first-party (hull). The pollution, and the villagers’ losses, are liabilities to third parties."
        }
      },
      {
        h: "Marine",
        say: "**Hull**: the vessel. **Cargo**: goods in transit. **Marine liability**: collision, pollution, crew. **Offshore energy**: rigs and platforms, and their construction. **Specie and fine art**: valuables, which can sit in either the marine or non-marine market.\n\nMarine underwriters also write most **political risks**, such as war and confiscation.",
        scene: () => family(["l", "m"]),
        ask: {
          q: "A satellite is trucked to its launch site. Which market insures it on the journey?",
          opts: ["Aviation, since it is going to space.", "Marine cargo: it is goods in transit."],
          a: 1,
          why: "Until launch, a satellite is simply very expensive cargo. The classes follow what the risk *is* at the time, not what the object will become."
        }
      },
      {
        h: "Non-marine",
        say: "**Property**: buildings and contents, and the income lost while they are rebuilt. **Construction**: buildings going up. **Onshore energy**: refineries, power stations, wind farms.\n\n**Liability**: public, products, employers’, professional. Every **compulsory** insurance sits here. So does **personal accident**, a benefit policy, not an indemnity.",
        scene: () => family(["l", "n"]),
        ask: {
          q: "Why is so little ordinary motor insurance written in London?",
          opts: ["London doesn’t understand motor.", "It is high-volume, standard business, not large or unusual risk."],
          a: 1,
          why: "London’s edge is big, complex or unusual risk. What motor it sees is specialist, like classic cars, or arrives in bulk through delegated underwriting."
        }
      },
      {
        h: "Aviation",
        say: "Aviation covers physical damage to aircraft (**hull**), **liability** to passengers and people on the ground, and **products liability** for manufacturers. Airports buy their own, separate policies.\n\nAn airline still needs ordinary non-marine cover for its offices and its staff.",
        scene: () => family(["l", "a"]),
        ask: {
          q: "One airliner: hull worth £100m, liability limit £1.5bn. Which is harder to place?",
          opts: ["The hull.", "The liability."],
          a: 1,
          why: "Liability limits dwarf hull values, because one crash can injure hundreds. Both are shared across many insurers, which is the subscription market doing its job."
        }
      },
      {
        h: "Insurance for insurers",
        say: "An insurer that has taken on more risk than it wants to keep can pass part of it to another insurer. That is **reinsurance**. The buyer is the **reinsured** or **cedant**; it **cedes** risk. A reinsurer that reinsures itself buys **retrocession**.\n\nThis insurer faces a loss. Decide how much it keeps.",
        scene: (v) => {
          const kept = Math.min(v.loss, v.keep), ceded = v.loss - kept;
          return stats([["Insurer keeps", money(kept), "c1"], ["Reinsurer pays", money(ceded), "c2"]]) +
            bars([{ label: "The loss", right: money(v.loss), segs: [[kept, "c1", "Kept"], [ceded, "c2", "Reinsured"]] }], { max: 60, marks: [[v.keep, "Retention"]] });
        },
        ctl: [{ k: "loss", label: "Size of the loss", min: 5, max: 60, step: 5, fmt: money }, { k: "keep", label: "Most the insurer will keep", min: 5, max: 40, step: 5, fmt: money }],
        live: (v) => `The amount the insurer bears itself is its **retention**. ${v.loss > v.keep ? "Above it, the reinsurer pays, so a single disaster can’t sink the insurer." : "This loss is inside the retention, so the reinsurer isn’t troubled."}`
      },
      {
        h: "Why buy it, and from whom",
        say: "Reinsurance lets an insurer write bigger risks than its capital alone allows, smooths its results, and helps it enter new classes with an expert behind it. Sellers gain too: access to regions and classes they can’t reach directly.\n\nBuyers include insurers, reinsurers, **mutuals** and **captives**. Sellers are specialist reinsurers, Lloyd’s syndicates and companies that write both.",
        scene: () => flow({
          h: 190,
          nodes: [
            { id: "p", x: 95, y: 4, label: "Policyholder" },
            { id: "c", x: 95, y: 74, label: "Insurer (cedant)", sub: "Still owes the full claim", tone: "c1" },
            { id: "r", x: 95, y: 144, label: "Reinsurer", tone: "c2" }
          ],
          edges: [["p", "c", "insured by"], ["c", "r", "cedes"]]
        }),
        ask: {
          q: "The reinsurer goes bust. Can the insurer pay its policyholder less?",
          opts: ["Yes, by the reinsured share.", "No. The policyholder’s contract is with the insurer alone."],
          a: 1,
          why: "Reinsurance is a separate contract between insurers. The policyholder has no rights against the reinsurer, and the insurer owes the full claim whatever happens upstream."
        }
      },
      {
        h: "In five lines",
        say: "LM2 returns to reinsurance and puts numbers on it.",
        scene: () => recap([
          "Three families: marine, non-marine and aviation.",
          "First-party cover protects your property; third-party cover pays your liabilities.",
          "A risk is classed by what it is at the time: a satellite on a lorry is cargo.",
          "All compulsory insurances are non-marine liability covers.",
          "Reinsurance is insurance for insurers; the cedant stays fully liable to its policyholder."
        ])
      }
    ]
  });
})();
