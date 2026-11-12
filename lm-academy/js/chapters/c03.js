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
          q: "A tanker runs aground. Its hull is torn open and oil reaches a fishing village. Which cover pays for what?",
          opts: [
          ["First-party cover pays for both: it is one accident.", "One accident, but two different losses. The villagers’ loss isn’t the shipowner’s property."],
          "First-party pays for the hull; third-party pays the villagers.",
          ["Third-party pays for both: the owner caused it.", "The owner’s own ship is its own property: first-party."],
          ["The villagers must claim on their own insurance.", "They may, but the shipowner is liable to them, and that liability is what third-party cover is for."]
        ],
          a: 1,
          why: "The same event usually triggers both. Damage to the insured’s own property is **first-party**; what it owes to others is **third-party** liability."
        }
      },
      {
        h: "Marine",
        say: "**Hull**: the vessel. **Cargo**: goods in transit. **Marine liability**: collision, pollution, crew. **Offshore energy**: rigs and platforms, and their construction. **Specie and fine art**: valuables, which can sit in either the marine or non-marine market.\n\nMarine underwriters also write most **political risks**, such as war and confiscation.",
        scene: () => family(["l", "m"]),
        ask: {
          q: "A satellite is trucked from the factory to its launch site. Which market insures it on the journey?",
          opts: [
          ["Aviation, since it is going to space.", "Not yet it isn’t. Classes follow what the risk is now."],
          "Marine cargo.",
          ["Non-marine property.", "Property cover is for things at a fixed location. This is moving."],
          ["Motor, as it is on a lorry.", "Motor covers the lorry and its liabilities, not a load worth hundreds of millions."]
        ],
          a: 1,
          why: "“Marine” cargo covers goods in transit by any means, sea or not. Until launch, a satellite is simply very expensive cargo."
        }
      },
      {
        h: "Non-marine",
        say: "**Property**: buildings and contents, and the income lost while they are rebuilt. **Construction**: buildings going up. **Onshore energy**: refineries, power stations, wind farms.\n\n**Liability**: public, products, employers’, professional. Every **compulsory** insurance sits here. So does **personal accident**, a benefit policy, not an indemnity.",
        scene: () => family(["l", "n"]),
        ask: {
          q: "Why is so little ordinary motor insurance written in London?",
          opts: [
          ["UK law reserves motor for domestic insurers.", "There is no such rule."],
          "It is high-volume, standard business that doesn’t need London.",
          ["Motor is too risky for London’s capital.", "The opposite: it is among the most predictable classes there is."],
          ["Lloyd’s rules forbid it.", "Lloyd’s syndicates do write motor, mostly specialist or through delegated authority."]
        ],
          a: 1,
          why: "London’s edge is big, complex or unusual risk, where expert judgement and shared capacity earn their cost. Millions of similar cars are better served by a domestic insurer’s systems."
        }
      },
      {
        h: "Aviation",
        say: "Aviation covers physical damage to aircraft (**hull**), **liability** to passengers and people on the ground, and **products liability** for manufacturers. Airports buy their own, separate policies.\n\nAn airline still needs ordinary non-marine cover for its offices and its staff.",
        scene: (v) => (v.$done ? bars([
  { label: "The aircraft", right: "aviation hull", segs: [[100, "c1", "Aviation"]] },
  { label: "Injury to passengers", right: "aviation liability", segs: [[100, "c1", "Aviation"]] },
  { label: "The head office", right: "property", segs: [[100, "c2", "Non-marine"]] },
  { label: "Injury to office staff", right: "employers’ liability", segs: [[100, "c2", "Non-marine"]] }
], { max: 100 }) : family(["l", "a"])),
        ask: {
          q: "An airline needs cover for four things: its aircraft, injury to passengers, its head office building, and injuries to office staff. How many belong in the **aviation** market?",
          fix: true,
          opts: [
          ["One", "The aircraft, yes. But passenger liability is aviation business too."],
          "Two",
          ["Three", "The head office is an ordinary building: non-marine property."],
          ["All four", "Being an airline doesn’t make its office a plane. The office and its staff are ordinary non-marine risks."]
        ],
          a: 1,
          why: "Aircraft hull and passenger liability are aviation. The office is non-marine property, and injury to employees is employers’ liability, a compulsory non-marine cover."
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
        live: (v) => `The amount the insurer bears itself is its **retention**. ${v.loss > v.keep ? "Above it, the reinsurer pays, so a single disaster can’t sink the insurer." : "This loss is inside the retention, so the reinsurer isn’t troubled."}`,
        goal: {
          say: "Make the loss £45m. Then set the retention so the reinsurer pays exactly twice what the insurer keeps.",
          test: (v) => v.loss === 45 && v.keep === 15,
          done: "Keep £15m, cede £30m. Now drop the loss to £10m: the reinsurer pays nothing at all. A retention protects against the large loss, not the ordinary one."
        }
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
          q: "An insurer has reinsured 80% of a £10m policy. The reinsurer goes bust before the claim. What must the insurer pay its policyholder?",
          fix: true,
          opts: [
          ["£2m: its own retained share.", "The policyholder never agreed to depend on a reinsurer it has never heard of."],
          "The full £10m.",
          ["£10m, but only once it recovers from the reinsurer’s liquidator.", "The policyholder’s claim doesn’t wait on the insurer’s own recoveries."]
        ],
          a: 1,
          why: "Reinsurance is a separate contract between insurers. The policyholder has no rights against the reinsurer and owes it nothing, and the insurer owes the full claim whatever happens upstream. A failed reinsurer is the insurer’s **credit risk**."
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
