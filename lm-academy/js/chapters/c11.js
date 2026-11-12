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
          opts: [
          ["Property insurance on its premises.", "Its own building is its own risk to take or insure."],
          "Employers’ liability insurance.",
          ["Public liability insurance.", "Almost every business buys it, and contracts often demand it. The law doesn’t."],
          ["Business interruption insurance.", "Prudent, never compulsory."]
        ],
          a: 1,
          why: "Compulsory insurance protects other people: here, employees injured at work. What a firm does about its own property is its own concern."
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
          q: "An employer ignored a safety condition in its employers’ liability policy. A worker is badly hurt. What happens?",
          opts: [
          ["The insurer refuses the claim. The condition was broken.", "That would leave an injured worker unpaid because of his employer’s fault."],
          "The insurer pays the worker, and may then seek recovery from the employer.",
          ["The insurer pays the worker and the matter ends.", "The worker is protected, but the employer doesn’t escape the consequences of its breach."],
          ["The worker must sue the employer personally.", "He may, but the point of compulsory cover is that the insurer stands behind the judgment."]
        ],
          a: 1,
          why: "Against the injured party, the insurer can’t rely on the breach. Between insurer and employer the breach still counts, and the insurer may claim back what it paid."
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
          q: "A harsh notification clause sits in the small print of four policies. Which insured can challenge it under the Consumer Rights Act?",
          opts: [
          ["A refinery owner.", "A commercial buyer with a broker is expected to read and negotiate its contract."],
          "A family that bought travel cover through a coverholder.",
          ["A shipping line.", "Commercial."],
          ["An insurer buying reinsurance.", "About as far from a consumer as it is possible to be."]
        ],
          a: 1,
          why: "The Act protects **consumers**. Most London business is commercial, so the Act bites where London’s products reach individuals, which is usually through delegated authority."
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
          q: "A policy contains a clause excluding the 1999 Act. A supplier named in the policy as benefiting from it tries to claim directly. Can it?",
          opts: [
          ["Yes. The Act gives it rights.", "The Act gives rights only where the parties haven’t excluded it."],
          "No. The parties have validly excluded the Act.",
          ["Yes, because it is named in the policy.", "Being named would normally be enough under the Act. The exclusion clause removes that."],
          ["Only if the insured is insolvent.", "That is a different statute, the Third Parties (Rights against Insurers) Act, which can’t be excluded."]
        ],
          a: 1,
          why: "The 1999 Act allows contracting out. That is exactly why the exclusion appears in so many London policies: insurers want to know precisely who can enforce their promise."
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
        live: (v) => ["**Standard rate, 12%:** most UK commercial and personal general insurance.", "**Higher rate, 20%:** travel insurance, and insurance sold as part of buying a vehicle or an appliance.", "**Exempt:** reinsurance, ships, aircraft, international goods in transit, most long-term insurance, and risks located outside the UK (which may attract another country’s tax instead)."][v.type],
        goal: {
          say: "A UK firm buys travel insurance for its staff at a premium of £20,000. Find what it actually pays.",
          test: (v) => v.type === 1 && v.prem === 20000,
          done: "£24,000. Travel is taxed at the higher rate of 20%. And unlike VAT, a business can’t reclaim IPT, so it is a real cost."
        }
      },
      {
        h: "An IPT question",
        say: "London writes a great deal of marine, aviation and overseas business.",
        scene: (v) => bars([
  { label: "UK warehouse", right: v.$done ? "£12,000" : "?", segs: [[v.$done ? 12 : 0.2, v.$done ? "c2" : "idle", "12%"]] },
  { label: "Ship’s hull", right: v.$done ? "exempt" : "?", segs: [[0.2, "idle"]] },
  { label: "Reinsurance treaty", right: v.$done ? "exempt" : "?", segs: [[0.2, "idle"]] },
  { label: "Factory in France", right: v.$done ? "not a UK risk" : "?", segs: [[0.2, "idle"]] }
], { max: 20 }),
        ask: {
          q: "A London broker places four policies at £100,000 each: a UK warehouse, a ship’s hull, a reinsurance treaty and a factory in France. How much UK IPT is due in total?",
          fix: true,
          opts: [
          "£12,000",
          ["£24,000", "The French factory is a risk located outside the UK. It may attract French tax, but not UK IPT."],
          ["£48,000", "Only one of the four is taxable. Ships, reinsurance and overseas risks are all exempt."],
          ["None", "The UK warehouse is an ordinary UK risk at the standard 12%."]
        ],
          a: 0,
          why: "Only the UK warehouse is taxable: 12% of £100,000. Ships, aircraft, international cargo, reinsurance and risks located abroad are exempt, which is why so much of London’s core business carries no UK IPT."
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
        }),
        ask: {
          q: "A broker is fined for mishandling client money. Can the regulator also act against the director responsible?",
          opts: [
          ["No. The firm is the regulated entity.", "Individuals in key roles are approved, and accountable, in their own right."],
          "Yes. Approved individuals are personally accountable.",
          ["Only if the director stole the money.", "No dishonesty is needed. Failing to take reasonable care in the role is enough."]
        ],
          a: 1,
          why: "The regulator can fine, publicly censure or ban an individual. The aim is that responsibility can’t dissolve into “the firm”."
        }
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
