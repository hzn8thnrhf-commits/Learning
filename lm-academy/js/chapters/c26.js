/* LM3 · 10 — Writing and distributing business */
(() => {
  const { bars, flow, stats, recap, money, pct, num } = window.SLIP.kit;
  const ROUTE = [
    ["Overseas office", "The insurer opens its own office near the clients, for example on Lloyd’s platforms in **Singapore** or **Dubai**. Local knowledge and relationships, at the cost of premises and staff."],
    ["Affinity", "Cover is offered to members of a group with something in common: a profession, a club, customers of a retailer. One relationship reaches thousands of similar risks."],
    ["Partnering", "The insurer shares risks with another insurer that already has the access: by co-insuring, or by reinsuring a local company that fronts the business."],
    ["Delegation", "Authority to accept risks is given to a coverholder or MGA who already has the clients."]
  ];

  window.SLIP.chapters.push({
    id: "distribution", part: "LM3",
    title: "Writing and distributing business",
    blurb: "The ways of participating in a risk, the control of underwriting authority, distribution channels, and the economics of delegation.",
    minutes: 8,
    lead: "A plan to write business is incomplete without a plan to obtain it. This chapter considers the bases on which an insurer may write a risk, the control of its underwriters, and the channels through which business reaches it.",
    aims: [
      "Identify the bases on which an insurer may participate in a risk, including fronting.",
      "Explain how the position of a layer in a programme affects its premium and its risk.",
      "Describe underwriting authorities and peer review.",
      "Compare the costs and risks of delegated authority with those of direct underwriting."
    ],
    init: { att: 0, route: 0, comm: 27, n: 2000 },
    steps: [
      {
        h: "Bases of participation",
        say: "An insurer may participate in a given risk on one of three bases: as a **direct subscriber**, taking a share of the original insurance; as a **reinsurer**, where local law requires the original policy to be issued by a domestic insurer; or under a **delegated authority**, where another party binds the risk on its behalf.\n\nThe business plan should state which bases are to be used, for which classes, and with what line sizes.",
        scene: () => flow({
          h: 170,
          nodes: [
            { id: "r", x: 95, y: 4, label: "The risk", tone: "ink" },
            { id: "s", x: 4, y: 100, w: 104, label: "Subscribe", sub: "A direct line" }, { id: "re", x: 118, y: 100, w: 104, label: "Reinsure", sub: "A local insurer" }, { id: "d", x: 232, y: 100, w: 104, label: "Delegate", sub: "A coverholder binds" }
          ],
          edges: [["r", "s"], ["r", "re"], ["r", "d"]]
        }),
        ask: {
          q: "A country requires every local risk to be insured by a locally licensed insurer. How can London take part?",
          opts: [
          ["It cannot.", "Not directly. But the local insurer can pass the risk on."],
          "By reinsuring the local insurer.",
          ["By writing it directly and paying a fine.", "Unlicensed insurance is not a fee-paying option. Policies can be void and people prosecuted."],
          ["Through a UK coverholder.", "A coverholder binds for London insurers, who still are not licensed there."]
        ],
          a: 1,
          why: "The local company issues the policy, often keeping very little, and cedes most of the risk to London. This is **fronting**. London carries the risk, plus the credit risk of the front."
        }
      },
      {
        h: "Position in a layered programme",
        say: "Large risks are commonly placed in **layers**, and an insurer’s appetite extends to its position in the programme as well as to the risk itself. A low layer is reached by most losses: it carries a high premium and a heavy burden of claims handling. A high layer is reached seldom, but when reached is likely to be exhausted.\n\nThe premium for a layer is often expressed as a **rate on line**: premium as a percentage of the layer’s limit. Consider a £25m layer in a programme of £100m.",
        scene: (v) => {
          const rol = [8, 3, 1.2, 0.5][v.att], hit = ["about 1 year in 12", "about 1 year in 35", "about 1 year in 85", "about 1 year in 200"][v.att];
          return stats([["Your layer", `£25m xs £${v.att * 25}m`], ["Rate on line", pct(rol, 1), "c1"], ["Premium", money(25 * rol / 100)]]) +
            bars([3, 2, 1, 0].map((i) => ({ label: `£25m xs £${i * 25}m`, right: i === v.att ? hit : "", segs: [[100, i === v.att ? "c1" : "idle", i === v.att ? "Your line" : ""]] })), { max: 100 });
        },
        ctl: [{ k: "att", label: "Attachment point", min: 0, max: 3, step: 1, fmt: (i) => (i ? `excess of £${i * 25}m` : "primary") }],
        live: (v) => (v.att === 0 ? "The **primary** layer: you pay on almost every loss. High premium, and you need a strong claims team because you are first to every claim." : v.att === 3 ? "The top layer: tiny premium for a full £25m limit. It looks like free money for years. Then it is not." : "A middle layer: fewer claims than the primary, more premium than the top. **Rate on line** is premium as a percentage of the limit."),
        goal: {
          say: "Find the layer where one full loss wipes out two hundred years of premium.",
          test: (v) => v.att === 3,
          done: "The top layer: £125k a year for a £25m limit. It will almost certainly be profitable every year of your career. The question is whether 0.5% is the right price for the year it is not, and you will never have enough data to know."
        }
      },
      {
        h: "Underwriting authority and peer review",
        say: "Each underwriter holds a written **authority** specifying the classes and territories in which they may write, the maximum line, and the matters that must be referred to a superior. A risk outside the authority may not be written without approval.\n\n**Peer review** is the examination of a risk, after it has been written, by a second underwriter, who considers whether it was within authority, priced on the agreed basis and properly documented.",
        scene: () => flow({
          h: 130,
          nodes: [
            { id: "a", x: 4, y: 40, w: 104, label: "Authority", sub: "Before" },
            { id: "w", x: 118, y: 40, w: 104, label: "Risk written", tone: "c1" },
            { id: "p", x: 232, y: 40, w: 104, label: "Peer review", sub: "After" }
          ],
          edges: [["a", "w"], ["w", "p"]]
        }),
        ask: {
          q: "An underwriter with a £5m line limit is offered an excellent risk needing £8m, with an hour to decide. What should she do?",
          opts: [
          ["Write £8m. It is a good risk.", "The limit is not a view on the risk. Reinsurance, aggregates and capital are all built around it."],
          "Write £5m, or get approval for more first.",
          ["Write £8m and report it to her manager afterwards.", "Authority has to exist before the stamp goes down."],
          ["Decline: a risk needing £8m is outside her authority.", "She can write up to £5m of it. The broker can find the rest elsewhere."]
        ],
          a: 1,
          why: "Exceeding authority is a disciplinary matter even when the risk runs clean. The limit exists because nobody can judge, in an hour, what else the firm already has exposed."
        }
      },
      {
        h: "Distribution channels",
        say: "The selection of business to be written must be accompanied by a decision as to **distribution**: the channels through which that business is to be obtained.",
        scene: (v) => `<ol class="k-recap">${ROUTE.map((m, i) => `<li${i === v.route ? ' style="font-weight:600"' : ' style="opacity:.55"'}>${m[0]}</li>`).join("")}</ol>`,
        ctl: [{ k: "route", label: "Route", opts: ["Office", "Affinity", "Partner", "Delegate"] }],
        live: (v) => `**${ROUTE[v.route][0]}.** ${ROUTE[v.route][1]}`
      },
      {
        h: "The economics of delegated authority",
        say: "Delegation exchanges one category of expense for another. The insurer’s **operating costs** fall, since its own underwriters no longer consider each risk. Its **acquisition costs** rise, since the coverholder is remunerated by commission for doing so.\n\nTake a portfolio of small risks, each with a premium of £1,500.",
        scene: (v) => {
          const prem = v.n * 1.5, own = v.n * 0.3 + 150, da = prem * v.comm / 100 + 60;
          return stats([["Premium", `£${num(prem / 1000, 1)}m`], ["Write it yourself", `£${num(own, 0)}k`, own > da ? "bad" : "good"], ["Delegate", `£${num(da, 0)}k`, da > own ? "bad" : "good"]]) +
            bars([
              { label: "In-house", right: pct(own / prem * 100), segs: [[150, "c1", "Team"], [v.n * 0.3, "c1", "Per-risk handling"]] },
              { label: "Delegated", right: pct(da / prem * 100), segs: [[60, "c1", "Oversight"], [prem * v.comm / 100, "c2", "Commission"]] }
            ], { max: Math.max(own, da) * 1.05 });
        },
        ctl: [{ k: "n", label: "Number of risks", min: 200, max: 6000, step: 200, fmt: (x) => num(x, 0) }, { k: "comm", label: "Coverholder’s commission", min: 15, max: 40, step: 1, fmt: pct }],
        live: (v) => {
          const prem = v.n * 1.5, own = v.n * 0.3 + 150, da = prem * v.comm / 100 + 60;
          return da < own ? "Delegation is cheaper here. The other price is **control**: the insurer no longer chooses each risk, and must rely on the agreement, the bordereaux and audits." : "At this commission, delegating costs more than doing it yourself. That can still be worth it if the coverholder brings business the insurer could never reach.";
        },
        goal: {
          say: "With 2,000 risks, find the commission at which delegating costs exactly the same as doing it yourself.",
          test: (v) => v.n === 2000 && v.comm === 23,
          done: "23%. Now shrink the book to 400 risks: delegation wins at almost any commission, because your own team’s fixed cost has nothing to spread over. Delegation is cheapest for books too small to deserve a team of their own."
        }
      },
      {
        h: "Selection and oversight of a coverholder",
        say: "Delegation should be preceded by **due diligence** into the proposed coverholder’s management, record, financial standing, systems and licences, and by an agreement, normally based on a **model wording**, that defines precisely what may be bound.\n\nIt must be followed by monitoring: of bordereaux, of audit findings, of premium against limits, of claims experience and of complaints. The **FCA** requires an insurer to oversee the outcomes that its delegates produce for customers, and **Lloyd’s** imposes its own requirements for approval and oversight.",
        scene: () => flow({
          h: 130,
          nodes: [
            { id: "c", x: 4, y: 40, w: 104, label: "Choose", sub: "Due diligence" },
            { id: "a", x: 118, y: 40, w: 104, label: "Agree", sub: "Clear authority" },
            { id: "m", x: 232, y: 40, w: 104, label: "Monitor", sub: "Reports, audits", tone: "c1" }
          ],
          edges: [["c", "a"], ["a", "m"], ["m", "c", "", { dy: 30 }]]
        }),
        ask: {
          q: "A coverholder mis-sells policies to consumers. Whom will the regulator hold responsible?",
          opts: [
          ["Only the coverholder: it made the sales.", "It will be held responsible. It will not be alone."],
          "The insurer as well: it delegated the authority.",
          ["Nobody, if the binder forbade mis-selling.", "A clause in a contract is not oversight."],
          ["The broker that introduced the coverholder.", "The broker may have duties of its own, but the product belongs to the insurer."]
        ],
          a: 1,
          why: "Authority can be delegated; responsibility cannot. The insurer is the product’s manufacturer and must show it actually oversaw how the product was sold."
        }
      },
      {
        h: "Summary",
        say: "This completes the three syllabuses. The final part applies them to a single business: a managing general agent that manages a portfolio on behalf of several carriers.",
        scene: () => recap([
          "An insurer can subscribe, reinsure a local front, or delegate.",
          "Low layers pay often; high layers pay rarely and in full.",
          "Written authorities and peer review control the individual underwriter.",
          "Distribution: own offices, affinity groups, partners, delegation.",
          "Delegation trades operating cost for acquisition cost, and control for reach."
        ])
      }
    ]
  });
})();
