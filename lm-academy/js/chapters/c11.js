/* LM2 · 3 — Law, consumers and tax */
(() => {
  const { bars, flow, stats, recap, num } = window.SLIP.kit;
  const RATE = [12, 20, 0];

  window.SLIP.chapters.push({
    id: "law", part: "LM2",
    title: "Law, consumers and tax",
    blurb: "Insurance the law insists on, the Acts that protect consumers and third parties, and how to work out premium tax.",
    minutes: 8,
    init: { prem: 10000, type: 0 },
    steps: [
      {
        h: "Insurance you must buy",
        say: "Most insurance is a choice. A few are **compulsory**, and nearly all of those are **liability** covers. The idea is simple: someone injured by your activity should be compensated even if you can’t pay.\n\nThe two everyone meets: **motor** third-party liability and **employers’ liability**. Others apply to particular trades and professions.",
        scene: () => flow({
          h: 150,
          nodes: [
            { id: "a", x: 4, y: 4, w: 150, label: "Driver or employer", sub: "Causes an injury" },
            { id: "v", x: 186, y: 4, w: 150, label: "The injured person", tone: "ink" },
            { id: "i", x: 95, y: 100, label: "Compulsory insurer", sub: "Makes sure they are paid", tone: "c1" }
          ],
          edges: [["a", "v", "harms"], ["i", "v", "pays"]]
        }),
        ask: {
          q: "Which of these must a UK business with staff buy by law?",
          opts: ["Property insurance on its premises.", "Employers’ liability insurance.", "Business interruption insurance."],
          a: 1,
          why: "Its own building is its own risk. Its duty to employees is everyone’s concern, so the law compels cover for it."
        }
      },
      {
        h: "The insurer’s usual defences fall away",
        say: "With ordinary insurance, an insured who breaks a policy term may lose the claim. With compulsory insurance, that would punish the wrong person: the victim.\n\nSo insurers **cannot rely on normal defences**, such as a breach of warranty, to refuse the injured party.",
        scene: () => flow({
          h: 150,
          nodes: [
            { id: "e", x: 4, y: 4, w: 150, label: "Employer", sub: "Broke a policy condition", tone: "bad" },
            { id: "i", x: 186, y: 4, w: 150, label: "Insurer" },
            { id: "w", x: 186, y: 100, w: 150, label: "Injured employee", tone: "ink" }
          ],
          edges: [["i", "w", "must still pay"], ["i", "e", "may recover"]]
        }),
        ask: {
          q: "An employer ignored a safety condition in its employers’ liability policy. A worker is hurt. Does the insurer pay the worker?",
          opts: ["No. The condition was broken.", "Yes. It may then seek recovery from the employer."],
          a: 1,
          why: "The worker is protected regardless. The quarrel about the broken condition is between insurer and employer, afterwards."
        }
      },
      {
        h: "Consumers get extra protection",
        say: "The **Consumer Rights Act 2015** applies to contracts with consumers, not commercial clients. Terms must be **fair** and **transparent**. A term that tilts the contract unfairly against the consumer, such as a harsh claims deadline buried in small print, **does not bind them**.\n\nNote that the regulator’s definition of a consumer is wider than you might guess.",
        scene: () => bars([
          { label: "A clear 30-day claims notice period", right: "binding", segs: [[100, "c1", "Fair and transparent"]] },
          { label: "“Notify within 24 hours or lose all cover”, in small print", right: "not binding", segs: [[100, "hole", "Unfair"]] }
        ], { max: 100 }),
        ask: {
          q: "A refinery owner says a harsh clause in its policy is “unfair” under the Consumer Rights Act. Will that work?",
          opts: ["Yes. Unfair is unfair.", "No. The Act protects consumers, not commercial insureds."],
          a: 1,
          why: "A commercial buyer with a broker is expected to read and negotiate its contract. Much of London’s business is commercial, so this Act matters most where products reach individuals, often through delegated authority."
        }
      },
      {
        h: "Outsiders with rights",
        say: "Normally only the parties to a contract can enforce it. The **Contracts (Rights of Third Parties) Act 1999** lets certain people who are *not* parties enforce a term meant to benefit them.\n\nInsurers dislike strangers gaining rights under their policies, so London wordings usually **contract out** of the Act with an exclusion clause.",
        scene: () => flow({
          h: 150,
          nodes: [
            { id: "a", x: 4, y: 4, w: 150, label: "Insurer" }, { id: "b", x: 186, y: 4, w: 150, label: "Insured" }, { id: "c", x: 186, y: 100, w: 150, label: "Third party", sub: "Not a party", tone: "c2" }
          ],
          edges: [["a", "b", "contract"], ["b", "c", "benefit?", { dash: true }]]
        }),
        ask: {
          q: "A policy contains a clause excluding the 1999 Act. A supplier named in the policy tries to claim directly. Can it?",
          opts: ["Yes. The Act gives it rights.", "No. The parties have validly excluded the Act."],
          a: 1,
          why: "The Act allows contracting out. That is exactly why the exclusion appears in so many London policies."
        }
      },
      {
        h: "Insurance premium tax",
        say: "**Insurance premium tax** (IPT) is charged on most UK general insurance premiums. It works much like VAT: the **insured pays** it on top of the premium, and the **insurer collects** it and accounts to HMRC.\n\nThere are two rates, **12% standard** and **20% higher** (travel, and cover sold alongside vehicles and appliances), and several exemptions.",
        scene: (v) => {
          const tax = (v.prem * RATE[v.type]) / 100;
          return stats([["Premium", `£${num(v.prem, 0)}`], ["IPT", `£${num(tax, 0)}`, "c2"], ["Client pays", `£${num(v.prem + tax, 0)}`]]) +
            bars([{ label: "What the client pays", segs: [[v.prem, "c1", "Premium"], [tax, "c2", `IPT ${RATE[v.type]}%`]] }], { max: v.prem * 1.2 });
        },
        ctl: [{ k: "type", label: "Kind of insurance", opts: ["Standard", "Higher", "Exempt"] }, { k: "prem", label: "Premium", min: 1000, max: 50000, step: 1000, fmt: (x) => `£${num(x, 0)}` }],
        live: (v) => ["**Standard rate, 12%:** most UK commercial and personal general insurance.", "**Higher rate, 20%:** travel insurance, and insurance sold as part of buying a vehicle or an appliance.", "**Exempt:** reinsurance, ships, aircraft, international goods in transit, most long-term insurance, and risks located outside the UK (which may attract another country’s tax instead)."][v.type]
      },
      {
        h: "An IPT question",
        say: "London writes a great deal of marine, aviation and overseas business.",
        scene: () => bars([
          { label: "UK warehouse, property", right: "12%", segs: [[12, "c2"]] },
          { label: "UK travel policy", right: "20%", segs: [[20, "c2"]] },
          { label: "Hull insurance on a ship", right: "?", segs: [[0.2, "idle"]] }
        ], { max: 20 }),
        ask: {
          q: "A shipowner pays £200,000 for hull insurance on its vessel. How much IPT?",
          opts: ["£24,000", "£40,000", "None."],
          a: 2,
          why: "Insurance on ships is exempt, as are aircraft, international cargo and reinsurance. Much of the London Market’s core business therefore carries no UK IPT, though overseas premium taxes may apply."
        }
      },
      {
        h: "People, not just firms",
        say: "Regulators hold named **individuals** responsible for a regulated firm. Those performing key functions must be approved and must follow conduct principles of their own: integrity, due skill and care, openness with the regulator.\n\nTwo roles you have already met: the **compliance officer** and the **Money Laundering Reporting Officer**. This applies to brokers, insurers, managing agents and members’ agents alike.",
        scene: () => flow({
          h: 150,
          nodes: [
            { id: "r", x: 95, y: 4, label: "The regulator", tone: "ink" },
            { id: "f", x: 4, y: 100, w: 150, label: "The firm" },
            { id: "p", x: 186, y: 100, w: 150, label: "Approved individuals", sub: "Personally accountable", tone: "c1" }
          ],
          edges: [["r", "f"], ["r", "p"]]
        })
      },
      {
        h: "In five lines",
        say: "Next: the law that governs the people in the middle.",
        scene: () => recap([
          "Compulsory insurances are almost all liability covers; injured parties are paid regardless.",
          "Consumer Rights Act 2015: unfair terms don’t bind consumers.",
          "Third Parties Act 1999: outsiders may gain rights unless the policy excludes the Act.",
          "IPT: 12% standard, 20% higher; paid by the insured, collected by the insurer.",
          "Ships, aircraft, international cargo, reinsurance and overseas risks are exempt."
        ])
      }
    ]
  });
})();
