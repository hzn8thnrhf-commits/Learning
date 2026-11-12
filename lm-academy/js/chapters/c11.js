/* LM2 · 3 — Law, consumers and tax */
(() => {
  const { bars, flow, stats, recap, num } = window.SLIP.kit;
  const RATE = [12, 20, 0];

  window.SLIP.chapters.push({
    id: "law", part: "LM2",
    title: "Law, consumers and tax",
    blurb: "Compulsory insurance, statutory protection for consumers and third parties, insurance premium tax, and individual accountability.",
    minutes: 8,
    lead: "Insurance contracts are made within a framework of statute. This chapter considers the legislation that compels insurance, protects consumers and third parties, and taxes premiums.",
    aims: [
      "Identify the compulsory insurances and explain why insurers’ defences are restricted under them.",
      "Explain the effect of the Consumer Rights Act 2015 and of the Contracts (Rights of Third Parties) Act 1999.",
      "Calculate insurance premium tax and identify the principal exemptions.",
      "Explain the personal accountability of individuals in regulated firms."
    ],
    init: { prem: 10000, type: 0 },
    steps: [
      {
        h: "Compulsory insurance",
        say: "Insurance is ordinarily a matter of choice. In a small number of cases Parliament has made it **compulsory**, and almost all of those are **liability** insurances. The policy is that a person injured by an activity should not go uncompensated merely because the person responsible lacks the means to pay.\n\nThe two of widest application are **motor** third-party liability, under the Road Traffic Act 1988, and **employers’ liability**, under the Employers’ Liability (Compulsory Insurance) Act 1969. Others apply to particular trades and professions.",
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
          ["Public liability insurance.", "Almost every business buys it, and contracts often demand it. The law does not."],
          ["Business interruption insurance.", "Prudent, never compulsory."]
        ],
          a: 1,
          why: "Compulsory insurance protects other people: here, employees injured at work. What a firm does about its own property is its own concern."
        }
      },
      {
        h: "Restricted defences",
        say: "Under an ordinary policy, an insured who breaches a term may forfeit the claim. If the same rule applied to compulsory insurance, the consequence would fall on the injured party, whom the legislation exists to protect.\n\nThe statutes therefore **restrict the defences** on which an insurer may rely against the injured party. The insurer must meet the claim, and is left to recover from its own insured.",
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
          ["The insurer pays the worker and the matter ends.", "The worker is protected, but the employer does not escape the consequences of its breach."],
          ["The worker must sue the employer personally.", "He may, but the point of compulsory cover is that the insurer stands behind the judgment."]
        ],
          a: 1,
          why: "Against the injured party, the insurer cannot rely on the breach. Between insurer and employer the breach still counts, and the insurer may claim back what it paid."
        }
      },
      {
        h: "The Consumer Rights Act 2015",
        say: "The **Consumer Rights Act 2015** applies to contracts between a trader and a **consumer**: an individual acting outside their trade or profession. It requires written terms to be **transparent**, and provides that a term which is **unfair**, in that it causes a significant imbalance to the consumer’s detriment contrary to good faith, is **not binding** on the consumer.\n\nThe Act does not apply to commercial insureds. The FCA’s own rules, however, extend some protections to small businesses.",
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
        h: "Rights of third parties",
        say: "At common law a contract can be enforced only by those who are party to it: the doctrine of **privity**. The **Contracts (Rights of Third Parties) Act 1999** modified the doctrine, allowing a third party to enforce a term that expressly so provides or that purports to confer a benefit on them.\n\nThe Act permits the parties to exclude it. Since insurers wish to know exactly who may enforce their obligations, London Market wordings commonly do so.",
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
          ["Yes. The Act gives it rights.", "The Act gives rights only where the parties have not excluded it."],
          "No. The parties have validly excluded the Act.",
          ["Yes, because it is named in the policy.", "Being named would normally be enough under the Act. The exclusion clause removes that."],
          ["Only if the insured is insolvent.", "That is a different statute, the Third Parties (Rights against Insurers) Act, which cannot be excluded."]
        ],
          a: 1,
          why: "The 1999 Act allows contracting out. That is exactly why the exclusion appears in so many London policies: insurers want to know precisely who can enforce their promise."
        }
      },
      {
        h: "Insurance premium tax",
        say: "**Insurance premium tax** (IPT) is charged on premiums for most general insurance of risks located in the UK. It is borne by the **insured** in addition to the premium, and the **insurer** is responsible for accounting for it to HM Revenue and Customs. Unlike VAT, it cannot be reclaimed by a business.\n\nThere are two rates: a **standard rate of 12%**, and a **higher rate of 20%** for travel insurance and for certain insurance sold with vehicles and domestic appliances. There are also several exemptions.",
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
          done: "£24,000. Travel is taxed at the higher rate of 20%. And unlike VAT, a business cannot reclaim IPT, so it is a real cost."
        }
      },
      {
        h: "The exemptions",
        say: "The exemptions are of particular importance in London, since they cover much of what the market writes: reinsurance, commercial ships and aircraft, goods in international transit, and risks located outside the UK.",
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
        h: "Individual accountability",
        say: "Regulation attaches to individuals as well as to firms. Under the **Senior Managers and Certification Regime**, those who perform the most senior functions must be approved by the regulator before taking up the role, and each has prescribed responsibilities for which they are personally accountable. All are bound by conduct rules requiring, among other things, integrity, due skill, care and diligence, and openness with the regulators.\n\nThe functions include those responsible for **compliance** and for **money laundering reporting**. The regime applies to insurers, managing agents and intermediaries alike.",
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
          why: "The regulator can fine, publicly censure or ban an individual. The aim is that responsibility cannot dissolve into “the firm”."
        }
      },
      {
        h: "Summary",
        say: "The next chapter considers the law and regulation that govern intermediaries.",
        scene: () => recap([
          "Compulsory insurances are almost all liability covers; injured parties are paid regardless.",
          "Consumer Rights Act 2015: unfair terms do not bind consumers.",
          "Third Parties Act 1999: outsiders may gain rights unless the policy excludes the Act.",
          "IPT: 12% standard, 20% higher; paid by the insured, collected by the insurer.",
          "Ships, aircraft, international cargo, reinsurance and overseas risks are exempt."
        ])
      }
    ]
  });
})();
