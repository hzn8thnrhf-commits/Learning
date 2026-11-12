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
    blurb: "London as a global market: where its capital comes from, who regulates it after Brexit, and how firms are governed.",
    minutes: 9,
    init: { exp: 38, loss: 55, code: 0 },
    steps: [
      {
        h: "Global, not domestic",
        say: "A **domestic** market insures its own territory. A **global** market draws clients from everywhere. London is global: most of its premium comes from overseas.\n\nA client may still keep part of its programme at home, out of loyalty or because local rules require a local insurer. And London can only write a country’s risks if that country’s regulator **permits** overseas insurers to do so.",
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
        h: "Whose money is it?",
        say: "London’s capital comes from many kinds of investor: overseas insurance groups (a large share), UK insurers, pension and investment funds, and at Lloyd’s some private individuals. Many groups operate **both** a company and a Lloyd’s syndicate.\n\nInvestors can put money anywhere. Capital stays only while the return beats the alternatives.",
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
          done: "36%. One more point of expense and the capital has a better home elsewhere. Underwriters can’t control the weather, but the market can control what it spends, which is why expenses are where London’s competitiveness is decided."
        }
      },
      {
        h: "Modernising the market",
        say: "The expense problem has a market-wide response. **Blueprint Two** is a cross-market programme, led by Lloyd’s with the market associations, to replace decades-old shared systems with digital placing, accounting and claims processes built around standard data.",
        scene: () => bars([
          { label: "Before", right: "re-keyed at every stage", segs: [[25, "bad", "Broker"], [25, "bad", "Insurer"], [25, "bad", "Bureau"], [25, "bad", "Claims"]] },
          { label: "The aim", right: "entered once, reused", segs: [[25, "c1", "Data captured"], [75, "soft1", "Flows through"]] }
        ], { max: 100 }),
        ask: {
          q: "One insurer on a twenty-insurer slip still wants paper documents. Who bears the cost?",
          opts: [
          ["Only that insurer.", "The slip can’t be processed digitally for nineteen and on paper for one."],
          "Everyone on the slip, and the broker.",
          ["Nobody: the bureau absorbs it.", "The bureau’s costs are charged back to the market."],
          ["The client, directly.", "Eventually, through the premium. But first it lands on every firm handling the risk."]
        ],
          a: 1,
          why: "A shared risk can only be handled as fast as its slowest participant. Modernisation therefore has to be collective, which is also why it is slow."
        }
      },
      {
        h: "Regulation after Brexit",
        say: "Brokers are regulated by the **FCA** only. Insurers and managing agents are **dual-regulated** by the PRA and FCA.\n\nBefore Brexit, a UK insurer could **passport**: use its UK authorisation across the EU. That right has gone. Rules that came from Europe, such as the Insurance Distribution Directive, remain because they were written into UK law. The **Financial Services and Markets Act 2023** lets the UK replace inherited EU rules, including Solvency II, with its own.",
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
          ["It can’t.", "It can, by a different route."],
          "Through an insurance company it set up in Brussels.",
          ["Under a UK–EU agreement that replaced passporting.", "No such agreement exists for insurance."],
          ["As surplus lines business.", "That is a US concept. The EU has no equivalent open door."]
        ],
          a: 1,
          why: "Lloyd’s Europe, authorised in Belgium, writes the EU risks and reinsures them back to the syndicates. Company market insurers took similar steps with subsidiaries in Dublin, Luxembourg and elsewhere."
        }
      },
      {
        h: "Lloyd’s as a regulator",
        say: "Inside its own market Lloyd’s acts as a partial regulator, alongside the PRA and FCA, with cooperation agreements so firms aren’t asked for the same thing three times.\n\nIt works through **byelaws** and the **Principles for doing business at Lloyd’s**: outcome-based standards covering underwriting, claims, reserving, governance, culture and more. Syndicates that meet them well get a lighter touch; those that don’t get closer oversight and may be made to hold more capital.",
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
          ["It doesn’t: reserving is the managing agent’s business.", "It is the agent’s job. But everyone else pays if it is done badly."]
        ],
          a: 1,
          why: "The chain of security makes every syndicate’s standards everyone’s business."
        }
      },
      {
        h: "Accountable people",
        say: "Under the **Senior Managers and Certification Regime**, each senior manager holds a regulator-approved function with a written statement of what they are personally responsible for. Staff whose jobs could cause significant harm are certified fit and proper by the firm each year. Conduct rules apply to nearly everyone.\n\nThe aim is that after a failure, “who was responsible?” already has an answer.",
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
        say: "The **UK Corporate Governance Code** is not insurance-specific, but London insurers follow it. It works on a “comply or explain” basis and has five themes.",
        scene: (v) => `<ol class="k-recap">${CODE.map((m, i) => `<li${i === v.code ? ' style="font-weight:600"' : ' style="opacity:.55"'}>${m[0]}</li>`).join("")}</ol>`,
        ctl: [{ k: "code", label: "Theme", min: 0, max: 4, step: 1, fmt: (i) => `${i + 1} of 5` }],
        live: (v) => `**${CODE[v.code][0]}.** ${CODE[v.code][1]}`
      },
      {
        h: "In five lines",
        say: "Next: the words that make the promise.",
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
