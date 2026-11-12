/* LM3 · 1 — The market framework */
(() => {
  const { bars, flow, stats, recap, pct, num } = window.SLIP.kit;
  const CODE = [
    ["Board leadership and purpose", "The board sets the company’s purpose, values and strategy, and makes sure the culture matches them."],
    ["Division of responsibilities", "The chair runs the board; the chief executive runs the company. No one person has unfettered power."],
    ["Composition, succession and evaluation", "The right mix of skills and independence, a plan for replacing people, and regular review of how the board performs."],
    ["Audit, risk and internal control", "Independent audit, honest reporting, and a board that understands the risks it is taking."],
    ["Remuneration", "Pay that supports long-term success, not short-term gambles."]
  ];

  window.SLIP.chapters.push({
    id: "framework", part: "LM3",
    title: "The market framework",
    blurb: "London as a global market: its sources of capital, its regulation since the UK left the EU, and the governance of the firms within it.",
    minutes: 9,
    lead: "LM3 considers the market from the underwriter’s position. It begins with the framework within which every underwriting decision is taken: where the business and the capital come from, and how firms are regulated and governed.",
    aims: [
      "Distinguish a global from a domestic market and explain the significance of overseas licensing.",
      "Identify the sources of London’s capital and explain why expenses affect its supply.",
      "Describe the regulatory position following the UK’s withdrawal from the EU.",
      "Explain the role of Lloyd’s as a supervisor of its own market, the Senior Managers regime and the Corporate Governance Code."
    ],
    init: { exp: 38, loss: 55, code: 0 },
    steps: [
      {
        h: "A global market",
        say: "A **domestic** market insures risks located in its own territory. A **global** market attracts business from many territories. London is a global market: the greater part of its premium income originates outside the UK.\n\nA client may nevertheless place part of its programme in its home market, from preference or because local law requires it. And London may insure risks in another country only to the extent that the law of that country **permits** insurers established abroad to do so.",
        scene: () => flow({
          h: 170,
          nodes: [
            { id: "a", x: 4, y: 4, w: 104, label: "US client" }, { id: "b", x: 118, y: 4, w: 104, label: "Asian client" }, { id: "c", x: 232, y: 4, w: 104, label: "UK client" },
            { id: "l", x: 95, y: 110, label: "London", sub: "A global market", tone: "c1" }
          ],
          edges: [["a", "l"], ["b", "l"], ["c", "l"]]
        }),
        ask: {
          q: "A Brazilian manufacturer wants London to insure its factory. What is the first question?",
          opts: [
          ["What rate will the market charge?", "A price for a contract you may not legally make is worth nothing."],
          "May a London insurer legally write that risk in Brazil?",
          ["Is the risk large enough for London?", "Size affects whether London is the right market, but not whether it is allowed."],
          ["Which Lloyd’s broker will place it?", "A practical step, but it comes after knowing the business can be written at all."]
        ],
          a: 1,
          why: "Licensing comes before pricing. Depending on the country, London may write a risk directly, only as reinsurance of a local insurer, or not at all."
        }
      },
      {
        h: "The sources of capital",
        say: "The capital supporting the London Market comes from several sources: overseas insurance groups, which supply a large share; UK insurers; pension funds and other institutional investors; and, at Lloyd’s, a diminishing number of private individuals. Many groups participate through **both** a company and a syndicate.\n\nCapital is mobile. It remains only while the return it earns in London exceeds what it could earn at comparable risk elsewhere.",
        scene: (v) => {
          const cr = v.loss + v.exp, margin = 100 - cr, roc = margin * 1.5 + 3;
          return stats([["Combined ratio", pct(cr)], ["Return on capital", pct(roc), roc < 8 ? "bad" : "good"]]) +
            bars([{ label: "Each £100 of premium", segs: [[v.loss, "c1", "Claims"], [v.exp, "c2", "Expenses"], [Math.max(margin, 0), "c3", "Margin"]] }], { max: Math.max(100, cr), marks: [[100, "Premium"]] });
        },
        ctl: [{ k: "exp", label: "Expense ratio", min: 28, max: 46, step: 1, fmt: pct }, { k: "loss", label: "Claims ratio", min: 45, max: 70, step: 1, fmt: pct }],
        live: (v) => {
          const roc = (100 - v.loss - v.exp) * 1.5 + 3;
          return roc < 8 ? "At this return, an investor can do as well elsewhere with less risk. Capital drifts to cheaper markets such as Bermuda or Singapore." : "A healthy return. Note how much of it depends on **expenses**: London’s chain of brokers, bureaux and paper processes is costly, which is why the market keeps trying to modernise.";
        },
        goal: {
          say: "Investors want at least 8%. With a claims ratio of 60%, find the highest expense ratio the market can afford.",
          test: (v) => v.loss === 60 && v.exp === 36,
          done: "36%. One more point of expense and the capital has a better home elsewhere. Underwriters cannot control the weather, but the market can control what it spends, which is why expenses are where London’s competitiveness is decided."
        }
      },
      {
        h: "Market modernisation",
        say: "London’s expenses are high by international standards, in part because a subscription market requires each transaction to be processed by many parties. The market’s collective response is **Blueprint Two**, a programme led by Lloyd’s with the market associations to replace long-established central systems with digital processes for placing, accounting and claims, founded on common data standards. Its delivery has been phased over several years.",
        scene: () => bars([
          { label: "Before", right: "re-keyed at every stage", segs: [[25, "bad", "Broker"], [25, "bad", "Insurer"], [25, "bad", "Bureau"], [25, "bad", "Claims"]] },
          { label: "The aim", right: "entered once, reused", segs: [[25, "c1", "Data captured"], [75, "soft1", "Flows through"]] }
        ], { max: 100 }),
        ask: {
          q: "One insurer on a twenty-insurer slip still wants paper documents. Who bears the cost?",
          opts: [
          ["Only that insurer.", "The slip cannot be processed digitally for nineteen and on paper for one."],
          "Everyone on the slip, and the broker.",
          ["Nobody: the bureau absorbs it.", "The bureau’s costs are charged back to the market."],
          ["The client, directly.", "Eventually, through the premium. But first it lands on every firm handling the risk."]
        ],
          a: 1,
          why: "A shared risk can only be handled as fast as its slowest participant. Modernisation therefore has to be collective, which is also why it is slow."
        }
      },
      {
        h: "Regulation since withdrawal from the EU",
        say: "While the UK was a member of the EU, an insurer authorised in the UK could conduct business throughout the Union on the strength of that authorisation, a right known as **passporting**. The right ended with the UK’s withdrawal.\n\nLegislation of European origin that had been incorporated into UK law, such as the rules implementing the Insurance Distribution Directive, continues to apply. The **Financial Services and Markets Act 2023** provides for such inherited law, including the Solvency II regime, to be replaced over time by rules made by the UK regulators.",
        scene: () => flow({
          h: 170,
          nodes: [
            { id: "u", x: 4, y: 4, w: 150, label: "UK insurer", tone: "ink" },
            { id: "e", x: 186, y: 4, w: 150, label: "EU client" },
            { id: "s", x: 95, y: 110, label: "EU subsidiary", sub: "Licensed inside the EU", tone: "c1" }
          ],
          edges: [["u", "e", "passport ended", { dash: true }], ["u", "s"], ["s", "e"]]
        }),
        ask: {
          q: "How does Lloyd’s write EU business now that passporting has ended?",
          opts: [
          ["It cannot.", "It can, by a different route."],
          "Through an insurance company it set up in Brussels.",
          ["Under a UK–EU agreement that replaced passporting.", "No such agreement exists for insurance."],
          ["As surplus lines business.", "That is a US concept. The EU has no equivalent open door."]
        ],
          a: 1,
          why: "Lloyd’s Europe, authorised in Belgium, writes the EU risks and reinsures them back to the syndicates. Company market insurers took similar steps with subsidiaries in Dublin, Luxembourg and elsewhere."
        }
      },
      {
        h: "Lloyd’s as supervisor",
        say: "Within its own market Lloyd’s exercises supervisory functions alongside the PRA and the FCA, with which it has cooperation arrangements designed to avoid duplication.\n\nIt does so through **byelaws** and through the **Principles for doing business at Lloyd’s**: standards, expressed as outcomes, covering underwriting, claims, reserving, governance, culture and other matters. Oversight is proportionate. A syndicate that meets the Principles is subject to less intervention; one that does not may face restrictions on its plan and a higher capital requirement.",
        scene: () => bars([
          { label: "Syndicate A: meets the Principles", right: "lighter oversight", segs: [[30, "c1", "Oversight"]] },
          { label: "Syndicate B: falls short", right: "plan restricted, capital loaded", segs: [[85, "bad", "Oversight"]] }
        ], { max: 100 }),
        ask: {
          q: "Why does Lloyd’s care how well one syndicate sets its reserves?",
          opts: [
          ["Because the PRA asks it to.", "The PRA supervises managing agents itself. Lloyd’s has its own reason."],
          "Because a failure falls on the Central Fund and the market’s shared rating.",
          ["Because Lloyd’s shares in each syndicate’s profit.", "Lloyd’s takes levies and contributions, not a share of underwriting profit."],
          ["It does not: reserving is the managing agent’s business.", "It is the agent’s job. But everyone else pays if it is done badly."]
        ],
          a: 1,
          why: "The chain of security makes every syndicate’s standards everyone’s business."
        }
      },
      {
        h: "The Senior Managers and Certification Regime",
        say: "The **Senior Managers and Certification Regime** has three elements. **Senior managers** hold functions for which regulatory approval is required, and each has a statement of the matters for which they are personally responsible. Staff in **certified** roles, whose work could cause significant harm, must be assessed by the firm as fit and proper each year. **Conduct rules** apply to almost all employees.\n\nThe purpose is that, when something goes wrong, responsibility can be attributed to an identified individual.",
        scene: () => flow({
          h: 190,
          nodes: [
            { id: "s", x: 95, y: 4, label: "Senior managers", sub: "Approved by the regulator", tone: "ink" },
            { id: "c", x: 95, y: 74, label: "Certified staff", sub: "Certified by the firm, yearly", tone: "c1" },
            { id: "r", x: 95, y: 144, label: "Almost everyone", sub: "Conduct rules" }
          ],
          edges: [["s", "c"], ["c", "r"]]
        }),
        ask: {
          q: "Claims handling at an insurer has failed badly. The regulator asks who was responsible. Under the regime, the answer should be…",
          opts: [
          ["The board, collectively.", "Collective responsibility was the old problem: when everyone is responsible, nobody is."],
          "The senior manager whose statement of responsibilities covers claims.",
          ["The junior handlers who made the errors.", "They are bound by conduct rules, but the regime looks for whoever was accountable for the function."],
          ["The firm, not any individual.", "The firm can be sanctioned too. The regime exists so that an individual is identifiable as well."]
        ],
          a: 1,
          why: "Each senior manager has a written **statement of responsibilities**. After a failure, the question “who was responsible?” already has an answer on file."
        }
      },
      {
        h: "Governance",
        say: "The **UK Corporate Governance Code**, issued by the Financial Reporting Council, applies to companies with a premium listing and is widely adopted as a standard by others, including London Market insurers. It operates on a “comply or explain” basis: a company must either follow each provision or give its reasons for not doing so.\n\nThe Code is organised under five headings.",
        scene: (v) => `<ol class="k-recap">${CODE.map((m, i) => `<li${i === v.code ? ' style="font-weight:600"' : ' style="opacity:.55"'}>${m[0]}</li>`).join("")}</ol>`,
        ctl: [{ k: "code", label: "Theme", min: 0, max: 4, step: 1, fmt: (i) => `${i + 1} of 5` }],
        live: (v) => `**${CODE[v.code][0]}.** ${CODE[v.code][1]}`
      },
      {
        h: "Summary",
        say: "The next chapter considers the contract itself and the wording in which it is expressed.",
        scene: () => recap([
          "London is a global market, but each country decides whether it may write there.",
          "Capital is mobile: it stays only while returns beat the alternatives.",
          "Expenses are London’s weak point; Blueprint Two is the collective fix.",
          "Passporting ended with Brexit; EU-derived rules such as the IDD remain in UK law.",
          "Lloyd’s Principles, SM&CR and the Governance Code make firms and people accountable."
        ])
      }
    ]
  });
})();
