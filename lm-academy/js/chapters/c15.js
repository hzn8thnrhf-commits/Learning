/* LM2 · 7 — Delegated underwriting */
(() => {
  const { bars, flow, stats, recap, pct, num } = window.SLIP.kit;
  const pounds = (x) => (x >= 1e6 ? `£${num(x / 1e6, 1)}m` : x >= 1000 ? `£${num(x / 1000, 0)}k` : `£${x}`);
  const PREM = [500, 1000, 2500, 5000, 10000, 25000, 50000, 100000, 250000, 1000000];
  const KIND = [
    ["Binding authority", "An insurer authorises a **coverholder**, often a broker or MGA far from London, to accept risks and issue documents on its behalf. The insurers never see the individual risks."],
    ["Line slip", "A group of insurers authorise **one or two of their own number** to accept risks for all of them. A broker brings each risk; the leaders decide. The underwriting stays in the market."],
    ["Consortium", "Several insurers pool capacity and let **one of them** underwrite for the group under a single stamp, usually for a specialist class."]
  ];

  window.SLIP.chapters.push({
    id: "delegated", part: "LM2",
    title: "Delegated underwriting",
    blurb: "Why and how insurers delegate underwriting authority, the forms it takes, and the controls they retain.",
    minutes: 8,
    lead: "An insurer need not make every underwriting decision itself. It may authorise another to accept risks on its behalf, within limits it defines.",
    aims: [
      "Explain the economic reason for delegating underwriting authority.",
      "Distinguish a binding authority, a line slip and a consortium.",
      "Describe the approval of a Lloyd’s coverholder and the scope of its authority.",
      "Explain how a delegated arrangement is monitored and where responsibility remains."
    ],
    init: { p: 2, kind: 0, late: 0 },
    steps: [
      {
        h: "The economics of delegation",
        say: "The individual consideration of a risk by a broker and an underwriter has a cost, which does not fall in proportion as the premium falls. Below a certain size, a risk cannot bear it.\n\nCompare the expense of placing a risk individually with that of accepting it under terms agreed in advance, as the premium is reduced.",
        scene: (v) => {
          const prem = PREM[v.p];
          const open = 15 + (2500 / prem) * 100, da = 27 + (60 / prem) * 100;
          return bars([
            { label: "Open market: placed one by one", right: `${num(open, 0)}% of premium`, segs: [[Math.min(open, 100), open > da ? "bad" : "c1", open > 100 ? "More than the whole premium" : ""]] },
            { label: "Delegated: bound under agreed rules", right: `${num(da, 0)}% of premium`, segs: [[Math.min(da, 100), da > open ? "bad" : "c1"]] }
          ], { max: 100 });
        },
        ctl: [{ k: "p", label: "Premium for one risk", min: 0, max: PREM.length - 1, step: 1, fmt: (i) => pounds(PREM[i]) }],
        live: (v) => (PREM[v.p] <= 25000
          ? "For a small risk, individual attention would eat the premium. So the insurer decides once, in a contract, and lets someone local apply the rules."
          : "For a big, unusual risk, individual attention is cheap relative to the premium. This is the open market’s home ground."),
        goal: {
          say: "Find the smallest premium at which placing a risk individually becomes cheaper than delegating it.",
          test: (v) => v.p === 5,
          done: "Around £25,000. Below that, the fixed cost of a broker and an underwriter looking at one risk swamps the premium. This crossover, not tradition, decides what goes through a binder."
        }
      },
      {
        h: "The forms of delegation",
        say: "Delegated underwriting takes three principal forms. They are distinguished by the identity of the party to whom authority is given.",
        scene: (v) => flow({
          h: 190,
          nodes: [
            { id: "i", x: 95, y: 4, label: "Insurers", sub: "Set the rules once", tone: "ink" },
            { id: "h", x: 95, y: 74, label: ["Coverholder", "Leading insurer", "Consortium leader"][v.kind], sub: ["An outside firm", "One of the group", "One of the group"][v.kind], tone: v.kind ? "c1" : "c2" },
            { id: "r", x: 95, y: 144, label: ["Many small local risks", "Risks a broker brings", "A specialist class"][v.kind] }
          ],
          edges: [["i", "h", ["binding authority", "line slip", "consortium"][v.kind]], ["h", "r", "binds"]]
        }),
        ctl: [{ k: "kind", label: "Arrangement", opts: ["Binder", "Line slip", "Consortium"] }],
        live: (v) => `**${KIND[v.kind][0]}.** ${KIND[v.kind][1]}`
      },
      {
        h: "Distinguishing the forms",
        say: "The essential distinction is whether the underwriting decision remains with an insurer or passes to a party outside the insuring market.",
        scene: () => bars([
          { label: "Binding authority", right: "outside the market", segs: [[100, "c2", "Coverholder decides"]] },
          { label: "Line slip", right: "inside the market", segs: [[100, "c1", "Lead insurers decide"]] },
          { label: "Consortium", right: "inside the market", segs: [[100, "c1", "One member decides"]] }
        ], { max: 100 }),
        ask: {
          q: "Ten insurers let two of their number accept cargo risks for all ten whenever one broker brings a risk that fits. What is it?",
          opts: [
          ["A binding authority.", "Nobody outside the insurers has been given the pen."],
          "A line slip.",
          ["A consortium.", "Close, but a consortium normally has one member underwriting under a shared stamp for a specialist class. This is a facility built around one broker’s flow."],
          ["Ordinary subscription business.", "Eight of the ten never see the risks."]
        ],
          a: 1,
          why: "Insurers are still doing the underwriting, just fewer of them. It saves the broker walking every small risk to ten boxes. If the *broker* could accept the risks itself, that would be a binding authority."
        }
      },
      {
        h: "Approval as a coverholder",
        say: "A firm may not bind risks on behalf of Lloyd’s syndicates until it has been approved as a **coverholder**. The application must be sponsored by a **Lloyd’s broker**, supported by a **managing agent** willing to grant the authority, and approved by **Lloyd’s**, which examines the applicant’s management, financial standing, systems and local licences.",
        scene: () => flow({
          h: 150,
          nodes: [
            { id: "b", x: 4, y: 4, w: 104, label: "Lloyd’s broker", sub: "Sponsors" },
            { id: "m", x: 118, y: 4, w: 104, label: "Managing agent", sub: "Supports" },
            { id: "l", x: 232, y: 4, w: 104, label: "Lloyd’s", sub: "Approves" },
            { id: "c", x: 95, y: 100, label: "Approved coverholder", tone: "c1" }
          ],
          edges: [["b", "c"], ["m", "c"], ["l", "c"]]
        }),
        ask: {
          q: "After approval, who remains responsible for what the coverholder does with the pen?",
          opts: [
          ["Lloyd’s, which approved it.", "Approval is a gate, not a guarantee."],
          "The managing agent whose syndicate gave the authority.",
          ["The sponsoring broker.", "The broker introduced the coverholder. It did not lend it capital."],
          ["The coverholder alone.", "It is accountable to the syndicate. But to the policyholder and regulator, its acts are the syndicate’s."]
        ],
          a: 1,
          why: "You can delegate authority but not responsibility."
        }
      },
      {
        h: "The scope of the authority",
        say: "The **binding authority agreement** defines the limits of the authority: the classes and territories in which risks may be bound, the maximum sum insured, the total premium that may be written, the wordings and rates to be used, and the arrangements for handling claims.\n\nA coverholder with **full authority** decides which risks to accept and at what premium, within those limits. One with **limited authority**, also known as prior submit, must refer each risk, or each risk outside narrow criteria, to the insurer for decision.",
        scene: () => bars([
          { label: "Full authority", right: "", segs: [[80, "c2", "Coverholder decides"], [20, "c1", "Refer"]] },
          { label: "Limited authority", right: "", segs: [[20, "c2", ""], [80, "c1", "Insurer decides each risk"]] }
        ], { max: 100 }),
        ask: {
          q: "A coverholder with a £2m limit per risk is asked to insure a £3m building for an excellent client. What can it do?",
          opts: [
          ["Bind it: the client is a good one.", "The quality of the client does not create authority."],
          "Refer it to the insurer before binding anything.",
          ["Bind it and report it on the next bordereau.", "Telling the insurer afterwards does not cure acting without authority."],
          ["Bind it as two policies of £1.5m.", "Splitting a risk to dodge a limit is still exceeding the limit, and now looks deliberate."]
        ],
          a: 1,
          why: "Outside the agreement it has no authority at all. If it binds anyway, the insurer may still be bound to the innocent policyholder, and will look to the coverholder to make good the damage."
        }
      },
      {
        h: "Monitoring the coverholder",
        say: "The insurer’s knowledge of what has been written on its behalf comes from **bordereaux**: periodic schedules of the risks bound, the premiums due and the claims paid. It tests their accuracy, and the coverholder’s compliance with the agreement, by **audit**.\n\nObserve the effect on the insurer’s information when bordereaux are submitted late.",
        scene: (v) => {
          const known = Math.max(0, 100 - v.late * 16);
          return stats([["Reported", pct(known)], ["Unseen exposure", pct(100 - known), v.late >= 2 ? "bad" : ""]]) +
            bars([{ label: "Risks the insurer is carrying", segs: [[known, "c1", "On a bordereau"], [100 - known, "hole", "Not yet reported"]] }], { max: 100 });
        },
        ctl: [{ k: "late", label: "Bordereaux running late by", min: 0, max: 5, step: 1, fmt: (x) => (x ? `${x} month${x > 1 ? "s" : ""}` : "nothing") }],
        live: (v) => (v.late < 2 ? "With timely reporting the insurer can track its aggregates, premium income limits and claims trends." : "The insurer is on risk for policies it does not know exist. It cannot manage aggregates, buy the right reinsurance or spot a deteriorating book. Late or patchy bordereaux are the first warning sign of a delegation going wrong.")
      },
      {
        h: "Summary",
        say: "The final chapter of LM2 considers claims.",
        scene: () => recap([
          "Delegation makes small or distant risks economic to write.",
          "Binding authority: an outside coverholder binds. Line slip and consortium: insurers bind for each other.",
          "Lloyd’s coverholders need a sponsoring broker, a managing agent and Lloyd’s approval.",
          "Authority can be delegated; responsibility cannot.",
          "Bordereaux and audits are how the insurer keeps sight of the book."
        ])
      }
    ]
  });
})();
