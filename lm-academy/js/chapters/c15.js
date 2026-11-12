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
    blurb: "Why insurers hand the pen to someone else, the three ways of doing it, and how they keep control.",
    minutes: 8,
    init: { p: 2, kind: 0, late: 0 },
    steps: [
      {
        h: "Not every risk can come to London",
        say: "An underwriter’s and a broker’s attention costs money. Compare the cost of placing one risk individually with binding it under rules agreed in advance. Shrink the premium.",
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
        h: "Three ways to delegate",
        say: "Delegation differs in *who* is given the pen.",
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
        h: "Tell them apart",
        say: "The distinction that matters is whether the decision leaves the insurers’ own hands.",
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
        h: "Becoming a Lloyd’s coverholder",
        say: "Nobody simply starts binding risks for Lloyd’s syndicates. A would-be coverholder needs a **Lloyd’s broker** to sponsor it, a **managing agent** willing to back it, and approval from **Lloyd’s** after due diligence on its people, finances, systems and local licences.",
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
          ["The sponsoring broker.", "The broker introduced the coverholder. It didn’t lend it capital."],
          ["The coverholder alone.", "It is accountable to the syndicate. But to the policyholder and regulator, its acts are the syndicate’s."]
        ],
          a: 1,
          why: "You can delegate authority but not responsibility."
        }
      },
      {
        h: "How much pen?",
        say: "A binding authority agreement spells out the limits: classes of business, territories, maximum sum insured, premium income limit, the wordings and rates to use, and who handles claims.\n\nWith **full authority** the coverholder decides which risks to accept and at what price. With **limited authority**, sometimes called prior submit, it must refer each risk, or risks outside a tight box, back to the insurer.",
        scene: () => bars([
          { label: "Full authority", right: "", segs: [[80, "c2", "Coverholder decides"], [20, "c1", "Refer"]] },
          { label: "Limited authority", right: "", segs: [[20, "c2", ""], [80, "c1", "Insurer decides each risk"]] }
        ], { max: 100 }),
        ask: {
          q: "A coverholder with a £2m limit per risk is asked to insure a £3m building for an excellent client. What can it do?",
          opts: [
          ["Bind it: the client is a good one.", "The quality of the client doesn’t create authority."],
          "Refer it to the insurer before binding anything.",
          ["Bind it and report it on the next bordereau.", "Telling the insurer afterwards doesn’t cure acting without authority."],
          ["Bind it as two policies of £1.5m.", "Splitting a risk to dodge a limit is still exceeding the limit, and now looks deliberate."]
        ],
          a: 1,
          why: "Outside the agreement it has no authority at all. If it binds anyway, the insurer may still be bound to the innocent policyholder, and will look to the coverholder to make good the damage."
        }
      },
      {
        h: "Seeing what you can’t see",
        say: "The insurer learns what has been written from **bordereaux**: regular lists of every risk bound, premium due and claim paid. It backs these with **audits** of the coverholder’s files.\n\nWatch what happens to the insurer’s view when reporting slips.",
        scene: (v) => {
          const known = Math.max(0, 100 - v.late * 16);
          return stats([["Reported", pct(known)], ["Unseen exposure", pct(100 - known), v.late >= 2 ? "bad" : ""]]) +
            bars([{ label: "Risks the insurer is carrying", segs: [[known, "c1", "On a bordereau"], [100 - known, "hole", "Not yet reported"]] }], { max: 100 });
        },
        ctl: [{ k: "late", label: "Bordereaux running late by", min: 0, max: 5, step: 1, fmt: (x) => (x ? `${x} month${x > 1 ? "s" : ""}` : "nothing") }],
        live: (v) => (v.late < 2 ? "With timely reporting the insurer can track its aggregates, premium income limits and claims trends." : "The insurer is on risk for policies it doesn’t know exist. It can’t manage aggregates, buy the right reinsurance or spot a deteriorating book. Late or patchy bordereaux are the first warning sign of a delegation going wrong.")
      },
      {
        h: "In five lines",
        say: "Last in LM2: the moment the policy is tested.",
        scene: () => recap([
          "Delegation makes small or distant risks economic to write.",
          "Binding authority: an outside coverholder binds. Line slip and consortium: insurers bind for each other.",
          "Lloyd’s coverholders need a sponsoring broker, a managing agent and Lloyd’s approval.",
          "Authority can be delegated; responsibility can’t.",
          "Bordereaux and audits are how the insurer keeps sight of the book."
        ])
      }
    ]
  });
})();
