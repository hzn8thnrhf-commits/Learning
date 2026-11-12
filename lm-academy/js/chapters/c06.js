/* LM1 · 6 — Regulators and protection */
(() => {
  const { bars, flow, stats, recap, money, pct } = window.SLIP.kit;
  const peaks = (on) => flow({
    h: 224, on,
    nodes: [
      { id: "pra", x: 4, y: 4, w: 150, label: "PRA", sub: "Safe and sound?", tone: "ink" },
      { id: "fca", x: 186, y: 4, w: 150, label: "FCA", sub: "Behaving properly?", tone: "ink" },
      { id: "ins", x: 4, y: 96, w: 150, label: "Insurers", sub: "Both regulators", tone: "c1" },
      { id: "ll", x: 186, y: 96, w: 150, label: "Lloyd’s, managing agents", sub: "Both regulators", tone: "c1" },
      { id: "br", x: 186, y: 180, w: 150, label: "Brokers, members’ agents", sub: "FCA only", tone: "c2" }
    ],
    edges: [["pra", "ins"], ["fca", "ll"], ["pra", "ll"], ["fca", "ins"], ["ll", "br"]]
  });

  window.SLIP.chapters.push({
    id: "regulation", part: "LM1",
    title: "Regulators and protection",
    blurb: "Who watches the market, and what happens when a customer is let down.",
    minutes: 9,
    init: { claim: 200, comp: 0 },
    steps: [
      {
        h: "Why insurance is regulated",
        say: "You pay today for a promise that may be tested years from now. You can’t inspect the insurer’s finances yourself. So the state does it for you.\n\nThe UK splits the job. The **Prudential Regulation Authority** (PRA) asks: *is this firm safe and sound, so policyholders will be paid?* The **Financial Conduct Authority** (FCA) asks: *is it treating customers fairly, with integrity, in a competitive market?* The Bank of England’s **Financial Policy Committee** watches the system as a whole.",
        scene: () => peaks(["pra", "fca"]),
        ask: {
          q: "Which question belongs to the PRA?",
          opts: [
          "Will this insurer still have the money to pay claims in ten years?",
          ["Was this policy sold fairly?", "How customers are treated is conduct: the FCA."],
          ["Is this market competitive?", "Promoting competition in consumers’ interests is an FCA objective."],
          ["Is the financial system as a whole building up risk?", "That is the Financial Policy Committee."]
        ],
          a: 0,
          why: "The PRA is **prudential**: safety and soundness of the firm, so that policyholders are paid. The FCA is **conduct**: how the firm behaves towards customers and markets."
        }
      },
      {
        h: "Who answers to whom",
        say: "Firms that **carry risk** answer to both regulators: they are **dual-regulated**. That covers insurers, the Society of Lloyd’s and managing agents.\n\nFirms that only **arrange** insurance answer to the FCA alone.",
        scene: () => peaks(),
        ask: {
          q: "Which of these answers to the FCA **only**?",
          opts: [
          ["An insurance company.", "It carries risk, so the PRA supervises its solvency as well."],
          ["A Lloyd’s managing agent.", "It runs a syndicate that carries risk: dual-regulated."],
          "A London broker.",
          ["The Society of Lloyd’s.", "Dual-regulated: the market as a whole carries risk."]
        ],
          a: 2,
          why: "A broker holds no insurance risk, so there is no balance sheet for the PRA to worry about. Its conduct, and how it handles client money, are the FCA’s business. Members’ agents are the same."
        }
      },
      {
        h: "Eleven principles",
        say: "The FCA sets eleven **Principles for Businesses**. They are short and broad on purpose: a firm can’t hide behind the letter of a rule.\n\nAmong them: act with **integrity**; use **skill, care and diligence**; treat **customers fairly**; manage **conflicts of interest**; protect **client assets**; and be **open with the regulator**.",
        scene: () => recap(["Integrity", "Skill, care and diligence", "Customers’ interests: treat them fairly", "Clear, fair, not misleading communications", "Manage conflicts of interest", "Protect client assets", "Be open and cooperative with regulators"]),
        ask: {
          q: "A firm follows every detailed rule but designs a product it knows most buyers can never claim on. Has it complied?",
          opts: [
          ["Yes. No rule was broken.", "The Principles are rules, and they outrank the detailed ones."],
          "No. It has breached the principle of treating customers fairly.",
          ["Only if customers complain.", "The regulator can act on a breach of principle without waiting for a complaint."],
          ["Yes, provided the wording was disclosed.", "Disclosure doesn’t make an unfair product fair."]
        ],
          a: 1,
          why: "The Principles are short and broad precisely so that a firm can’t hide behind the letter of a rule. Breaking a principle is enough for the regulator to act."
        }
      },
      {
        h: "Getting and keeping permission",
        say: "No one may insure, or broke insurance, in the UK without **authorisation**. A firm must meet set standards to get it: adequate resources, suitable people, a sound business model. It must keep meeting them to stay.\n\nThe regulators **supervise** firms continuously and can restrict what they do, fine them, ban individuals or withdraw authorisation.",
        scene: () => flow({
          h: 190,
          nodes: [
            { id: "a", x: 95, y: 4, label: "Authorise", sub: "Meet the standards", tone: "ink" },
            { id: "s", x: 95, y: 74, label: "Supervise", sub: "Keep meeting them" },
            { id: "e", x: 95, y: 144, label: "Enforce", sub: "Restrict, fine, ban, withdraw", tone: "bad" }
          ],
          edges: [["a", "s"], ["s", "e"]]
        }),
        ask: {
          q: "An authorised insurer’s capital falls below the required standard in the middle of the year. Can the regulator act?",
          opts: [
          ["No. Authorisation, once granted, stands.", "Authorisation is a continuing condition, not a certificate."],
          "Yes. The standards must be met at all times.",
          ["Only at the next annual review.", "Supervision is continuous. Policyholders can’t wait a year."],
          ["Only if a claim goes unpaid.", "By then it is too late. The point is to act before policyholders are hurt."]
        ],
          a: 1,
          why: "The conditions for authorisation must go on being met. The regulators can restrict what a firm writes, require more capital, fine it, ban individuals or withdraw authorisation."
        }
      },
      {
        h: "Abroad, the local rules apply",
        say: "Most London business comes from overseas, and each country decides who may insure its risks. In the **United States**, regulation is state by state.\n\nAn **admitted** insurer is licensed locally. A **surplus lines** insurer isn’t, but may take risks the admitted market can’t or won’t write. Much of London’s US business arrives this way.",
        scene: () => flow({
          h: 150,
          nodes: [
            { id: "r", x: 95, y: 4, label: "A risk in Texas", tone: "ink" },
            { id: "a", x: 4, y: 96, w: 150, label: "Admitted insurers", sub: "Licensed in the state" },
            { id: "s", x: 186, y: 96, w: 150, label: "Surplus lines", sub: "If they can’t or won’t", tone: "c1" }
          ],
          edges: [["r", "a", "first"], ["a", "s", "declined"]]
        }),
        ask: {
          q: "A new Lloyd’s syndicate wants to write business in forty countries. Who obtains the licences?",
          opts: [
          ["The syndicate, country by country.", "That is what an insurance company must do. A syndicate doesn’t need to."],
          "Lloyd’s holds them centrally for the whole market.",
          ["Its managing agent.", "The agent must follow each country’s rules, but the licences belong to Lloyd’s."],
          ["The brokers who bring the business.", "Brokers need their own permissions, but can’t license an insurer."]
        ],
          a: 1,
          why: "Lloyd’s holds the market’s licences and handles overseas compliance centrally, a major attraction of the platform for a new entrant."
        }
      },
      {
        h: "Lloyd’s governs itself too",
        say: "Inside Lloyd’s there is a further layer. The **Council of Lloyd’s** is responsible for the management and supervision of the market, under Acts of Parliament. It sets the rules by which managing agents, members and brokers operate there.\n\nSo a managing agent answers three ways: to the PRA, the FCA and Lloyd’s.",
        scene: () => flow({
          h: 190,
          nodes: [
            { id: "p", x: 4, y: 4, w: 104, label: "PRA" }, { id: "f", x: 118, y: 4, w: 104, label: "FCA" }, { id: "c", x: 232, y: 4, w: 104, label: "Council", sub: "of Lloyd’s", tone: "ink" },
            { id: "m", x: 95, y: 124, label: "A managing agent", tone: "c1" }
          ],
          edges: [["p", "m"], ["f", "m"], ["c", "m"]]
        }),
        ask: {
          q: "How many bodies does a Lloyd’s managing agent answer to?",
          fix: true,
          opts: [
          ["One: Lloyd’s.", "Lloyd’s oversight is in addition to the state regulators, not instead of them."],
          ["Two: the PRA and the FCA.", "True of an insurance company. A managing agent has one more."],
          "Three: the PRA, the FCA and Lloyd’s."
        ],
          a: 2,
          why: "Dual regulation by the state, plus the Council of Lloyd’s own rules for the market. The three cooperate so that firms aren’t asked for the same thing three times."
        }
      },
      {
        h: "When a customer complains",
        say: "A customer must complain to the firm first. If still unhappy, some customers can go to the **Financial Ombudsman Service** (FOS): free, independent and impartial.\n\nIt is open to individuals, small businesses (turnover up to £6.5m and fewer than 50 staff), and small charities and trusts. Lloyd’s has its own complaints team that tries to resolve matters before they reach the FOS.",
        scene: () => flow({
          h: 190,
          nodes: [
            { id: "c", x: 95, y: 4, label: "Complaint to the firm", tone: "ink" },
            { id: "l", x: 95, y: 74, label: "Lloyd’s complaints team", sub: "For Lloyd’s policies" },
            { id: "f", x: 95, y: 144, label: "The Ombudsman", sub: "Final, independent", tone: "c1" }
          ],
          edges: [["c", "l"], ["l", "f"]]
        }),
        ask: {
          q: "Which of these can take a complaint to the Financial Ombudsman?",
          opts: [
          ["A multinational airline disputing a hull claim.", "Far too large. It must negotiate, arbitrate or sue."],
          "A bakery with twelve staff and £1m turnover.",
          ["A haulier with 300 staff.", "Over the size limit: fewer than 50 staff."],
          ["Another insurer.", "The service exists for those who can’t easily fight an insurer."]
        ],
          a: 1,
          why: "The Ombudsman protects individuals and small businesses. Its decision binds the firm, up to a money limit (£355,000 in this edition of the text), but not the customer, who may still go to court."
        }
      },
      {
        h: "When the insurer itself fails",
        say: "If an insurer can’t pay valid claims, the **Financial Services Compensation Scheme** (FSCS) steps in for individuals and small businesses.\n\nIt pays **100%** of claims under compulsory insurance, and **90%** of most other general insurance claims, with no upper limit.",
        scene: (v) => {
          const share = v.comp ? 1 : 0.9, paid = v.claim * share;
          return stats([["FSCS pays", `£${Math.round(paid)}k`, "c1"], ["Policyholder loses", `£${Math.round(v.claim - paid)}k`, v.comp ? "good" : "bad"]]) +
            bars([{ label: "The unpaid claim", right: `£${v.claim}k`, segs: [[paid, "c1", pct(share * 100)], [v.claim - paid, "hole"]] }], { max: v.claim });
        },
        ctl: [{ k: "comp", label: "Type of insurance", opts: ["Other general", "Compulsory"] }, { k: "claim", label: "The claim", min: 20, max: 500, step: 20, fmt: (x) => `£${x}k` }],
        live: (v) => (v.comp ? "Compulsory cover exists to protect injured third parties, so it is paid in full. Employers’ liability policyholders qualify **whatever their size**." : "The policyholder bears 10%: enough to give buyers a reason to care about their insurer’s strength."),
        ask: {
          q: "A sole trader’s insurer fails owing him £200,000 for fire damage and £60,000 under his employers’ liability policy. What does the FSCS pay?",
          fix: true,
          opts: [
          ["£260,000", "Only compulsory insurance is paid in full."],
          "£240,000",
          ["£234,000", "That is 90% of everything. The employers’ liability claim is compulsory cover, paid at 100%."],
          ["Nothing: he is a business.", "Small businesses are protected."]
        ],
          a: 1,
          why: "90% of £200,000 is £180,000, plus 100% of £60,000. Compulsory cover protects injured third parties, so it is paid in full."
        }
      },
      {
        h: "In five lines",
        say: "Next: the rules about who you may deal with, and whose data and money you hold.",
        scene: () => recap([
          "PRA: safety and soundness. FCA: conduct, integrity, competition.",
          "Risk carriers are dual-regulated; brokers answer to the FCA only.",
          "Abroad, local regulators decide; Lloyd’s handles licences centrally.",
          "FOS resolves complaints from individuals and small businesses.",
          "FSCS pays when an insurer fails: 100% compulsory, 90% otherwise."
        ])
      }
    ]
  });
})();
