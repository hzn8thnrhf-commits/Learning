/* LM3 · 9 — Writing and distributing business */
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
    blurb: "The ways an insurer can write a risk, how its underwriters are controlled, and the bargain behind delegated authority.",
    minutes: 8,
    init: { att: 0, route: 0, comm: 27, n: 2000 },
    steps: [
      {
        h: "Three ways in",
        say: "An insurer can meet the same risk in three ways. As a **subscription** insurer, taking a share directly. As a **reinsurer**, where local law keeps the direct policy with a domestic insurer. Or through **delegated authority**, where someone else binds it.\n\nThe business plan should say which routes are used, for what, and with what line sizes.",
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
          ["It can’t.", "Not directly. But the local insurer can pass the risk on."],
          "By reinsuring the local insurer.",
          ["By writing it directly and paying a fine.", "Unlicensed insurance isn’t a fee-paying option. Policies can be void and people prosecuted."],
          ["Through a UK coverholder.", "A coverholder binds for London insurers, who still aren’t licensed there."]
        ],
          a: 1,
          why: "The local company issues the policy, often keeping very little, and cedes most of the risk to London. This is **fronting**. London carries the risk, plus the credit risk of the front."
        }
      },
      {
        h: "Where on the programme?",
        say: "Large risks are placed in **layers**. Appetite includes *where* an insurer likes to sit. Low layers are hit often: more premium, more claims handling. High layers are hit rarely but then in full.\n\nA £100m programme. Move your £25m layer.",
        scene: (v) => {
          const rol = [8, 3, 1.2, 0.5][v.att], hit = ["about 1 year in 12", "about 1 year in 35", "about 1 year in 85", "about 1 year in 200"][v.att];
          return stats([["Your layer", `£25m xs £${v.att * 25}m`], ["Rate on line", pct(rol, 1), "c1"], ["Premium", money(25 * rol / 100)]]) +
            bars([3, 2, 1, 0].map((i) => ({ label: `£25m xs £${i * 25}m`, right: i === v.att ? hit : "", segs: [[100, i === v.att ? "c1" : "idle", i === v.att ? "Your line" : ""]] })), { max: 100 });
        },
        ctl: [{ k: "att", label: "Attachment point", min: 0, max: 3, step: 1, fmt: (i) => (i ? `excess of £${i * 25}m` : "primary") }],
        live: (v) => (v.att === 0 ? "The **primary** layer: you pay on almost every loss. High premium, and you need a strong claims team because you are first to every claim." : v.att === 3 ? "The top layer: tiny premium for a full £25m limit. It looks like free money for years. Then it isn’t." : "A middle layer: fewer claims than the primary, more premium than the top. **Rate on line** is premium as a percentage of the limit."),
        goal: {
          say: "Find the layer where one full loss wipes out two hundred years of premium.",
          test: (v) => v.att === 3,
          done: "The top layer: £125k a year for a £25m limit. It will almost certainly be profitable every year of your career. The question is whether 0.5% is the right price for the year it isn’t, and you will never have enough data to know."
        }
      },
      {
        h: "Controlling the pen",
        say: "Each underwriter has a written **authority**: classes, territories, maximum line, what must be referred upward. Outside it, they must ask.\n\n**Peer review** has a second underwriter examine a risk after it is written: was it within authority, priced on the agreed basis, properly recorded?",
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
          ["Write £8m. It is a good risk.", "The limit isn’t a view on the risk. Reinsurance, aggregates and capital are all built around it."],
          "Write £5m, or get approval for more first.",
          ["Write £8m and report it to her manager afterwards.", "Authority has to exist before the stamp goes down."],
          ["Decline: a risk needing £8m is outside her authority.", "She can write up to £5m of it. The broker can find the rest elsewhere."]
        ],
          a: 1,
          why: "Exceeding authority is a disciplinary matter even when the risk runs clean. The limit exists because nobody can judge, in an hour, what else the firm already has exposed."
        }
      },
      {
        h: "Reaching the client",
        say: "Planning what to write is half the job. The other half is **distribution**: how the business will reach you.",
        scene: (v) => `<ol class="k-recap">${ROUTE.map((m, i) => `<li${i === v.route ? ' style="font-weight:600"' : ' style="opacity:.55"'}>${m[0]}</li>`).join("")}</ol>`,
        ctl: [{ k: "route", label: "Route", opts: ["Office", "Affinity", "Partner", "Delegate"] }],
        live: (v) => `**${ROUTE[v.route][0]}.** ${ROUTE[v.route][1]}`
      },
      {
        h: "The delegated bargain",
        say: "Delegation swaps one cost for another. The insurer’s own **operating cost** falls: no underwriter sees each risk. Its **acquisition cost** rises: the coverholder is paid commission for doing the work.\n\nA book of small risks at £1,500 premium each.",
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
        h: "Choosing and watching a partner",
        say: "Before delegating: **due diligence** on the partner’s people, track record, finances, systems and licences. Then a clear agreement, usually built on a **model wording**, setting out exactly what may be bound.\n\nAfter: monitoring. Bordereaux, audits, premium against limits, claims trends, complaints. The **FCA** expects the insurer to oversee the customer outcomes its delegates produce; **Lloyd’s** adds its own approval and standards.",
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
          ["Only the coverholder: it made the sales.", "It will be held responsible. It won’t be alone."],
          "The insurer as well: it delegated the authority.",
          ["Nobody, if the binder forbade mis-selling.", "A clause in a contract isn’t oversight."],
          ["The broker that introduced the coverholder.", "The broker may have duties of its own, but the product belongs to the insurer."]
        ],
          a: 1,
          why: "Authority can be delegated; responsibility can’t. The insurer is the product’s manufacturer and must show it actually oversaw how the product was sold."
        }
      },
      {
        h: "In five lines",
        say: "That completes the three syllabuses. The last part applies them to one business: an MGA managing a portfolio for several carriers.",
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
