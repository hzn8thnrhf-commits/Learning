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
    blurb: "The UK’s regulators and their objectives, authorisation, Lloyd’s own governance, and the protection available to policyholders.",
    minutes: 9,
    lead: "An insured pays today for a promise that may not be tested for years. Regulation exists to ensure that the promise can be kept and that it was fairly sold.",
    aims: [
      "Distinguish the objectives of the PRA and the FCA, and identify which firms are dual-regulated.",
      "Explain the status of the FCA’s Principles for Businesses.",
      "Explain authorisation, and the admitted and surplus lines routes into overseas markets.",
      "State who may use the Financial Ombudsman Service and what the FSCS pays."
    ],
    init: { claim: 200, comp: 0 },
    steps: [
      {
        h: "Why insurance is regulated",
        say: "A policyholder cannot assess for themselves whether an insurer will be able to pay a claim many years hence. Regulation supplies that assurance.\n\nUnder the Financial Services and Markets Act 2000, as amended, responsibility is divided. The **Prudential Regulation Authority** (PRA), part of the Bank of England, promotes the safety and soundness of firms and the protection of policyholders. The **Financial Conduct Authority** (FCA) regulates conduct: the protection of consumers, the integrity of markets and effective competition. The Bank’s **Financial Policy Committee** monitors risks to the financial system as a whole.",
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
        h: "Dual regulation",
        say: "Firms that **carry insurance risk** are supervised by both authorities and are described as **dual-regulated**: the PRA for their prudential soundness and the FCA for their conduct. Insurers, the Society of Lloyd’s and managing agents fall into this category.\n\nFirms that **arrange** insurance without carrying risk are regulated by the FCA alone.",
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
        h: "The Principles for Businesses",
        say: "The FCA’s Handbook opens with a small number of **Principles for Businesses**: general statements of the obligations of every authorised firm. There were eleven when the study text was written; a twelfth, the **Consumer Duty**, was added in 2023 for retail business.\n\nThey require a firm, among other things, to act with **integrity**, to exercise **skill, care and diligence**, to treat **customers fairly**, to manage **conflicts of interest**, to protect **client assets**, and to deal with its regulators **openly**. The Principles are themselves rules, and a breach of one is sufficient ground for enforcement.",
        scene: () => recap(["Integrity", "Skill, care and diligence", "Customers’ interests: treat them fairly", "Clear, fair, not misleading communications", "Manage conflicts of interest", "Protect client assets", "Be open and cooperative with regulators"]),
        ask: {
          q: "A firm follows every detailed rule but designs a product it knows most buyers can never claim on. Has it complied?",
          opts: [
          ["Yes. No rule was broken.", "The Principles are rules, and they outrank the detailed ones."],
          "No. It has breached the principle of treating customers fairly.",
          ["Only if customers complain.", "The regulator can act on a breach of principle without waiting for a complaint."],
          ["Yes, provided the wording was disclosed.", "Disclosure does not make an unfair product fair."]
        ],
          a: 1,
          why: "The Principles are short and broad precisely so that a firm cannot hide behind the letter of a rule. Breaking a principle is enough for the regulator to act."
        }
      },
      {
        h: "Authorisation and supervision",
        say: "It is a criminal offence to carry on insurance business, or to arrange insurance, in the UK without **authorisation**. To obtain it a firm must satisfy the **threshold conditions**: among them adequate resources, suitable management and a viable business model.\n\nThe conditions apply continuously, not merely at the point of entry. The regulators **supervise** firms throughout their lives and may restrict their activities, impose financial penalties, prohibit individuals, or withdraw authorisation.",
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
          ["Only at the next annual review.", "Supervision is continuous. Policyholders cannot wait a year."],
          ["Only if a claim goes unpaid.", "By then it is too late. The point is to act before policyholders are hurt."]
        ],
          a: 1,
          why: "The conditions for authorisation must go on being met. The regulators can restrict what a firm writes, require more capital, fine it, ban individuals or withdraw authorisation."
        }
      },
      {
        h: "Overseas regulation",
        say: "Most London business originates overseas, and every jurisdiction determines for itself who may insure risks located within it. In the **United States**, insurance is regulated by the individual states.\n\nAn **admitted** insurer is one licensed in the state concerned. A **surplus lines** insurer is not licensed there, but is permitted to accept risks that the admitted market is unable or unwilling to write. A large part of London’s US business is written on this basis.",
        scene: () => flow({
          h: 150,
          nodes: [
            { id: "r", x: 95, y: 4, label: "A risk in Texas", tone: "ink" },
            { id: "a", x: 4, y: 96, w: 150, label: "Admitted insurers", sub: "Licensed in the state" },
            { id: "s", x: 186, y: 96, w: 150, label: "Surplus lines", sub: "If they cannot or will not", tone: "c1" }
          ],
          edges: [["r", "a", "first"], ["a", "s", "declined"]]
        }),
        ask: {
          q: "A new Lloyd’s syndicate wants to write business in forty countries. Who obtains the licences?",
          opts: [
          ["The syndicate, country by country.", "That is what an insurance company must do. A syndicate does not need to."],
          "Lloyd’s holds them centrally for the whole market.",
          ["Its managing agent.", "The agent must follow each country’s rules, but the licences belong to Lloyd’s."],
          ["The brokers who bring the business.", "Brokers need their own permissions, but cannot license an insurer."]
        ],
          a: 1,
          why: "Lloyd’s holds the market’s licences and handles overseas compliance centrally, a major attraction of the platform for a new entrant."
        }
      },
      {
        h: "The governance of Lloyd’s",
        say: "Lloyd’s has a further tier of governance of its own. Under the Lloyd’s Acts, the **Council of Lloyd’s** is responsible for the management and supervision of the market, and makes the byelaws and requirements with which managing agents, members and Lloyd’s brokers must comply.\n\nA managing agent is accordingly answerable to three bodies: the PRA, the FCA and Lloyd’s.",
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
          why: "Dual regulation by the state, plus the Council of Lloyd’s own rules for the market. The three cooperate so that firms are not asked for the same thing three times."
        }
      },
      {
        h: "Complaints and the Ombudsman",
        say: "A complaint must first be made to the firm, which has eight weeks to give its final response. A complainant who remains dissatisfied, and who is eligible, may refer the matter to the **Financial Ombudsman Service** (FOS), which is free to the complainant and decides by reference to what is fair and reasonable.\n\nEligibility extends to consumers, to small businesses (broadly, turnover below £6.5m and fewer than 50 employees), and to small charities and trusts. Lloyd’s operates its own complaints procedure for policyholders of the market before a matter reaches the FOS.",
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
          ["Another insurer.", "The service exists for those who cannot easily fight an insurer."]
        ],
          a: 1,
          why: "The Ombudsman protects individuals and small businesses. Its decision binds the firm, up to a money limit (£355,000 in this edition of the text), but not the customer, who may still go to court."
        }
      },
      {
        h: "The compensation scheme",
        say: "If an authorised insurer is unable to meet its liabilities, eligible policyholders, principally individuals and small businesses, may claim on the **Financial Services Compensation Scheme** (FSCS), which is funded by a levy on the industry.\n\nFor general insurance the scheme pays **100%** of claims under compulsory insurance and **90%** of most other claims, without an upper limit.",
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
        h: "Summary",
        say: "The next chapter deals with the controls on whom a firm may deal with, and on the data and money it holds.",
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
