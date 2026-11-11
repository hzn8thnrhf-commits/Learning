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
        scene: () => peaks(["pra", "fca"])
      },
      {
        h: "Who answers to whom",
        say: "Firms that **carry risk** answer to both regulators: they are **dual-regulated**. That covers insurers, the Society of Lloyd’s and managing agents.\n\nFirms that only **arrange** insurance answer to the FCA alone.",
        scene: () => peaks(),
        ask: {
          q: "Who regulates a London broker?",
          opts: ["The PRA and the FCA.", "The FCA only.", "Lloyd’s."],
          a: 1,
          why: "A broker holds no insurance risk, so there is no balance sheet for the PRA to worry about. Its conduct, and how it handles client money, are the FCA’s business. Members’ agents are the same."
        }
      },
      {
        h: "Eleven principles",
        say: "The FCA sets eleven **Principles for Businesses**. They are short and broad on purpose: a firm can’t hide behind the letter of a rule.\n\nAmong them: act with **integrity**; use **skill, care and diligence**; treat **customers fairly**; manage **conflicts of interest**; protect **client assets**; and be **open with the regulator**.",
        scene: () => recap(["Integrity", "Skill, care and diligence", "Customers’ interests: treat them fairly", "Clear, fair, not misleading communications", "Manage conflicts of interest", "Protect client assets", "Be open and cooperative with regulators"]),
        ask: {
          q: "A firm follows every detailed rule but designs a product it knows most buyers can never claim on. Has it complied?",
          opts: ["Yes. No rule was broken.", "No. It breaches the principle of treating customers fairly."],
          a: 1,
          why: "The Principles sit above the detailed rules. Breaking a principle is enough for the regulator to act."
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
        })
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
          q: "A new syndicate wants to write business in forty countries. Who obtains the licences?",
          opts: ["The syndicate, country by country.", "Lloyd’s, centrally, for the whole market."],
          a: 1,
          why: "Lloyd’s holds the market’s licences and handles overseas compliance centrally, a major attraction of the platform. An insurance **company** must deal with each regulator itself."
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
        })
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
          q: "A multinational airline disputes a hull claim. Can it use the FOS?",
          opts: ["Yes, anyone can.", "No. It is too large; it must negotiate, arbitrate or sue."],
          a: 1,
          why: "The Ombudsman protects those who can’t easily fight an insurer. Its decision binds the firm (up to a money limit, £355,000 in this edition of the text) but not the customer, who may still go to court."
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
        live: (v) => (v.comp ? "Compulsory cover exists to protect injured third parties, so it is paid in full. Employers’ liability policyholders qualify **whatever their size**." : "The policyholder bears 10%: enough to give buyers a reason to care about their insurer’s strength.")
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
