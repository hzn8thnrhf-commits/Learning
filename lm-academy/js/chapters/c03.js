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
    blurb: "The classes of business written in London, the distinction between first-party and third-party cover, and the purpose of reinsurance.",
    minutes: 8,
    lead: "The London Market organises its business by class. The classification is partly historical, but it determines which underwriters see a risk and which wordings apply.",
    aims: [
      "Assign a risk to the marine, aviation or non-marine market.",
      "Distinguish first-party from third-party cover.",
      "Define reinsurance, retention and retrocession, and explain why insurers buy reinsurance.",
      "Explain why a policyholder’s rights are unaffected by the failure of a reinsurer."
    ],
    init: { loss: 30, keep: 10 },
    steps: [
      {
        h: "The three markets",
        say: "London business is conventionally divided into three groups: **marine**, **aviation** and **non-marine**, the last being a residual category for everything else. The division reflects the market’s origins in the insurance of ships and cargoes and still governs how underwriting teams, wordings and market associations are organised.\n\nCutting across all three is **reinsurance**: insurance purchased by insurers on the risks they have themselves accepted.",
        scene: () => family()
      },
      {
        h: "First party, third party",
        say: "Within each group, cover is of two kinds.\n\n**First-party** insurance covers loss of or damage to the insured’s own property, and financial loss consequent upon it.\n\n**Third-party** insurance covers the insured’s legal **liability** to others for injury, damage or loss that the insured has caused them.",
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
          ["First-party cover pays for both: it is one accident.", "One accident, but two different losses. The villagers’ loss is not the shipowner’s property."],
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
        say: "The marine market writes **hull** (the vessel), **cargo** (goods in transit by any means), **marine liability** (collision, pollution and liabilities to crew), and **offshore energy** (rigs and platforms, including their construction). **Specie and fine art**, being valuables, may be placed in either the marine or the non-marine market.\n\nMarine underwriters also write most **political risks**, including war and confiscation, a specialism that grew from the war risks to which ships have always been exposed.",
        scene: () => family(["l", "m"]),
        ask: {
          q: "A satellite is trucked from the factory to its launch site. Which market insures it on the journey?",
          opts: [
          ["Aviation, since it is going to space.", "Not yet it is not. Classes follow what the risk is now."],
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
        say: "The non-marine market writes **property** (buildings, contents and the loss of income while they are reinstated), **construction**, and **onshore energy** such as refineries and power stations.\n\nIt also writes **liability** insurance: public, products, employers’ and professional. All insurances made compulsory by UK statute fall within it. **Personal accident** is written here too, although it is a benefit policy and not a contract of indemnity.",
        scene: () => family(["l", "n"]),
        ask: {
          q: "Why is so little ordinary motor insurance written in London?",
          opts: [
          ["UK law reserves motor for domestic insurers.", "There is no such rule."],
          "It is high-volume, standard business that does not need London.",
          ["Motor is too risky for London’s capital.", "The opposite: it is among the most predictable classes there is."],
          ["Lloyd’s rules forbid it.", "Lloyd’s syndicates do write motor, mostly specialist or through delegated authority."]
        ],
          a: 1,
          why: "London’s edge is big, complex or unusual risk, where expert judgement and shared capacity earn their cost. Millions of similar cars are better served by a domestic insurer’s systems."
        }
      },
      {
        h: "Aviation",
        say: "The aviation market covers physical loss of or damage to aircraft (**hull**), **liability** to passengers and to third parties on the ground, and the **products liability** of aircraft and component manufacturers. Airports arrange separate policies for their own liabilities.\n\nOnly risks arising from flight belong here. An airline’s premises and employees are insured in the non-marine market like those of any other business.",
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
          ["All four", "Being an airline does not make its office a plane. The office and its staff are ordinary non-marine risks."]
        ],
          a: 1,
          why: "Aircraft hull and passenger liability are aviation. The office is non-marine property, and injury to employees is employers’ liability, a compulsory non-marine cover."
        }
      },
      {
        h: "Reinsurance",
        say: "An insurer that has accepted more risk than it wishes to retain may transfer part of it to another insurer. This is **reinsurance**. The party transferring the risk is the **reinsured** or **cedant**, and is said to **cede** it; the amount it keeps is its **retention**. A reinsurer that in turn reinsures its own acceptances buys **retrocession**.\n\nThis insurer faces a loss. Set the amount it retains.",
        scene: (v) => {
          const kept = Math.min(v.loss, v.keep), ceded = v.loss - kept;
          return stats([["Insurer keeps", money(kept), "c1"], ["Reinsurer pays", money(ceded), "c2"]]) +
            bars([{ label: "The loss", right: money(v.loss), segs: [[kept, "c1", "Kept"], [ceded, "c2", "Reinsured"]] }], { max: 60, marks: [[v.keep, "Retention"]] });
        },
        ctl: [{ k: "loss", label: "Size of the loss", min: 5, max: 60, step: 5, fmt: money }, { k: "keep", label: "Most the insurer will keep", min: 5, max: 40, step: 5, fmt: money }],
        live: (v) => `The amount the insurer bears itself is its **retention**. ${v.loss > v.keep ? "Above it, the reinsurer pays, so a single disaster cannot sink the insurer." : "This loss is inside the retention, so the reinsurer is not troubled."}`,
        goal: {
          say: "Make the loss £45m. Then set the retention so the reinsurer pays exactly twice what the insurer keeps.",
          test: (v) => v.loss === 45 && v.keep === 15,
          done: "Keep £15m, cede £30m. Now drop the loss to £10m: the reinsurer pays nothing at all. A retention protects against the large loss, not the ordinary one."
        }
      },
      {
        h: "The purposes of reinsurance",
        say: "Reinsurance serves three purposes for the buyer. It provides **capacity**, allowing the insurer to accept risks larger than its own capital would support. It provides **stability**, by limiting the effect of large or accumulated losses on a single year’s result. And it provides **expertise**, where a reinsurer supports an insurer’s entry into an unfamiliar class.\n\nThe buyers are insurers, reinsurers, **mutuals** and **captives**. The sellers are specialist reinsurers, Lloyd’s syndicates, and companies that write both insurance and reinsurance.",
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
          ["£10m, but only once it recovers from the reinsurer’s liquidator.", "The policyholder’s claim does not wait on the insurer’s own recoveries."]
        ],
          a: 1,
          why: "Reinsurance is a separate contract between insurers. The policyholder has no rights against the reinsurer and owes it nothing, and the insurer owes the full claim whatever happens upstream. A failed reinsurer is the insurer’s **credit risk**."
        }
      },
      {
        h: "Summary",
        say: "The methods of reinsurance, and the calculations they involve, are the subject of the first chapter of LM2.",
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
