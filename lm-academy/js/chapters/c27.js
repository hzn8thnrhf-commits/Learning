/* MGA · 2 — Managing the book across carriers */
(() => {
  const { bars, cols, flow, stats, recap, plot, money, pct, num } = window.SLIP.kit;
  const QUAD = [
    ["Well priced and growing", "Feed it. This is where underwriters’ time, marketing and capacity should go. Check that the growth isn’t being bought with price."],
    ["Well priced but shrinking", "Find out why. A competitor undercutting, a broker lost, appetite too narrow? Good business is leaving and it is worth winning back."],
    ["Under-priced and shrinking", "The market is doing the work for you. Push rate, accept the losses of business, and let it run down if it can’t be fixed."],
    ["Under-priced and growing", "The danger quadrant. Something is too cheap and brokers have noticed. Left alone, it becomes the largest part of the book and then the reason a carrier leaves."]
  ];

  window.SLIP.chapters.push({
    id: "mgabook", part: "MGA",
    title: "Managing the book across carriers",
    blurb: "Only the MGA sees the whole portfolio. Finding what the average hides, steering the mix, and living within every carrier’s limits at once.",
    minutes: 12,
    init: { c: 20, q: 3, a: 60, run: 1.8, m: 6 },
    steps: [
      {
        h: "Only you see all of it",
        say: "Each carrier sees its own share. A broker sees its own clients. The MGA is the only party that sees the **whole book**: every risk, every carrier’s share, every accumulation.\n\nThat makes portfolio management the MGA’s job, not something to leave to carriers’ audits. And it has to be done for several owners at once, each with its own limits and appetite.",
        scene: () => flow({
          h: 190,
          nodes: [
            { id: "m", x: 95, y: 4, label: "The MGA", sub: "Sees the whole book", tone: "c1" },
            { id: "a", x: 4, y: 100, w: 104, label: "Carrier A", sub: "Its share" }, { id: "b", x: 118, y: 100, w: 104, label: "Carrier B", sub: "Its share" }, { id: "c", x: 232, y: 100, w: 104, label: "Carrier C", sub: "Its share" }
          ],
          edges: [["m", "a"], ["m", "b"], ["m", "c"]]
        }),
        ask: {
          q: "Every risk the MGA binds is individually well underwritten. Is the portfolio therefore sound?",
          opts: ["Yes. A book is the sum of its risks.", "No. Concentration and mix exist only at portfolio level."],
          a: 1,
          why: "Forty good risks on one flood plain are a bad portfolio. So is a book whose growth all came from its cheapest segment. Risk-by-risk underwriting can’t see either."
        }
      },
      {
        h: "What the average hides",
        say: "The book runs at a comfortable overall loss ratio. Split it into its three segments and it looks different: contractors at 45%, retail at 55%, and a newer hospitality segment at 95%.\n\nHospitality is where the growth is. Let it grow.",
        scene: (v) => {
          const other = 100 - v.c, a = other * 0.5, b = other * 0.5, lr = (a * 45 + b * 55 + v.c * 95) / 100;
          return stats([["Hospitality share", pct(v.c)], ["Overall loss ratio", pct(lr, 1), lr > 65 ? "bad" : "good"]]) +
            bars([
              { label: "Contractors", right: "45%", segs: [[a, "c1"]] },
              { label: "Retail", right: "55%", segs: [[b, "c1"]] },
              { label: "Hospitality", right: "95%", segs: [[v.c, "bad"]] }
            ], { max: 60 });
        },
        ctl: [{ k: "c", label: "Hospitality’s share of premium", min: 10, max: 60, step: 5, fmt: pct }],
        live: (v) => (v.c <= 25 ? "At a fifth of the book, hospitality is invisible in the total: the good segments are quietly subsidising it. A carrier looking only at the headline would see nothing wrong." : v.c < 45 ? "No segment’s own loss ratio has changed. The overall figure is deteriorating purely because the **mix** is shifting towards the worst segment." : "The subsidy has run out. The book’s headline result is now poor, and it happened without any single bad underwriting decision. Results must be read by segment, by underwriting year and by type of loss, never only in total.")
      },
      {
        h: "Price adequacy by segment",
        say: "Loss ratios arrive late. A faster signal is the **actual-to-technical** ratio: premium charged divided by the technical price, segment by segment. It shows where the book is under-priced before the claims prove it.",
        scene: () => cols({
          h: 170, max: 130,
          bars: [{ label: "Contractors", segs: [[108, "c1"]], top: "108%" }, { label: "Retail", segs: [[101, "c1"]], top: "101%" }, { label: "Hospitality", hot: true, segs: [[82, "bad"]], top: "82%" }, { label: "Cyber add-on", segs: [[88, "c2"]], top: "88%" }],
          lines: [{ v: 100, label: "Technical price", right: true }]
        }),
        ask: {
          q: "Hospitality is at 82% of technical price and is the fastest-growing segment. What does that combination tell you?",
          opts: ["Brokers love the product.", "It is growing *because* it is cheap."],
          a: 1,
          why: "Brokers send business where the price is keenest. Rapid growth in an under-priced segment is not a coincidence; it is the market telling you your rate is wrong."
        }
      },
      {
        h: "Steering the mix",
        say: "Put each segment on two axes: is it adequately priced, and is it growing? Four positions, four different actions.",
        scene: (v) => flow({
          h: 170,
          on: [["a", "b", "c", "d"][v.q]],
          nodes: [
            { id: "b", x: 4, y: 4, w: 150, label: "Priced well, shrinking", sub: "Find out why" }, { id: "a", x: 186, y: 4, w: 150, label: "Priced well, growing", sub: "Feed", tone: "good" },
            { id: "c", x: 4, y: 100, w: 150, label: "Under-priced, shrinking", sub: "Fix or run down" }, { id: "d", x: 186, y: 100, w: 150, label: "Under-priced, growing", sub: "Danger", tone: "bad" }
          ]
        }),
        ctl: [{ k: "q", label: "Segment is", opts: ["Good, growing", "Good, shrinking", "Cheap, shrinking", "Cheap, growing"] }],
        live: (v) => `**${QUAD[v.q][0]}.** ${QUAD[v.q][1]}`
      },
      {
        h: "The levers an MGA has",
        say: "An MGA steers with what it controls: the **appetite guide** it gives brokers, its **rates** and rating factors, the **line size** it offers, **referral rules** for its own underwriters, and which **brokers** it courts.\n\nIt can’t buy reinsurance for the carriers or change their capital. So it steers by selection and price.",
        scene: () => recap(["Appetite guide: what brokers are told you want", "Rates and rating factors", "Line size and deductibles", "Referral rules inside the MGA", "Which brokers and channels to invest in"]),
        ask: {
          q: "The MGA raises hospitality rates 20% and tightens its appetite. Premium in the segment falls by a third. Has the action failed?",
          opts: ["Yes. The MGA has lost commission.", "No. Shrinking under-priced business was the aim."],
          a: 1,
          why: "The MGA’s commission income falls, which is exactly why the decision is hard and why carriers watch for it. An MGA that will give up volume to protect the loss ratio is one that keeps its capacity."
        }
      },
      {
        h: "The tightest limit governs",
        say: "Every carrier sets its own limits in its binder. On a panel each takes a fixed share of every risk, so the carrier that fills up first stops everyone.\n\nTwo carriers share a flood-exposed book. Carrier A will hold up to **£30m** of flood aggregate; Carrier B up to **£24m**. Change how the panel is split.",
        scene: (v) => {
          const a = v.a / 100, capA = 30 / a, capB = 24 / (1 - a), cap = Math.min(capA, capB), bind = capA < capB ? "A" : capB < capA ? "B" : "both";
          return stats([["Most the panel can write", money(cap), "c1"], ["Limit that binds", bind === "both" ? "Both" : `Carrier ${bind}`]]) +
            bars([
              { label: `Carrier A at ${v.a}%`, right: `uses ${money(cap * a)} of £30m`, segs: [[cap * a, bind !== "B" ? "bad" : "c1"], [30 - cap * a, "idle"]] },
              { label: `Carrier B at ${100 - v.a}%`, right: `uses ${money(cap * (1 - a))} of £24m`, segs: [[cap * (1 - a), bind !== "A" ? "bad" : "c2"], [24 - cap * (1 - a), "idle"]] }
            ], { max: 30 });
        },
        ctl: [{ k: "a", label: "Carrier A’s share of the panel", min: 30, max: 80, step: 5, fmt: pct }],
        live: (v) => {
          const a = v.a / 100, capA = 30 / a, capB = 24 / (1 - a);
          return Math.abs(capA - capB) < 1 ? "Both carriers fill at the same moment: the panel uses all £54m of available aggregate. The shares match the carriers’ appetites." : capA < capB ? `Carrier A fills first at ${money(capA)} of total aggregate, leaving ${money(24 - capA * (1 - a))} of B’s limit unusable. To write more, renegotiate A’s limit or shift share to B.` : `Carrier B fills first at ${money(capB)}, stranding ${money(30 - capB * a)} of A’s appetite. The panel is only as large as its most cautious member allows.`;
        }
      },
      {
        h: "Premium limits: look ahead",
        say: "A binder also caps the **premium** the MGA may write in the year, here £20m. Breaching it means writing without authority. The limit must be tracked as a projection, not discovered in December.",
        scene: (v) => {
          const pts = Array.from({ length: 13 }, (_, i) => [i, v.run * i]), end = v.run * 12, sofar = v.run * v.m, hit = 20 / v.run;
          return stats([["Written so far", money(sofar)], ["Projected year end", money(end), end > 20 ? "bad" : "good"], ["Limit reached", end > 20 ? `month ${Math.ceil(hit)}` : "not this year", end > 20 ? "bad" : ""]]) +
            plot({ h: 160, x: { min: 0, max: 12, ticks: [0, 3, 6, 9, 12], title: "Month" }, y: { min: 0, max: 30, ticks: [0, 10, 20, 30], fmt: (x) => `£${x}m` },
              series: [{ tone: "c1", pts: pts.filter((p) => p[0] <= v.m) }, { tone: end > 20 ? "bad" : "c1", dash: true, pts: pts.filter((p) => p[0] >= v.m) }],
              dots: [{ x: v.m, y: sofar, tone: "c1" }], refs: [{ y: 20, label: "Binder limit £20m", left: true }] });
        },
        ctl: [{ k: "run", label: "Premium written each month", min: 1.2, max: 2.4, step: 0.1, fmt: money }, { k: "m", label: "Month now", min: 1, max: 12, step: 1, fmt: (x) => `${x}` }],
        live: (v) => (v.run * 12 > 20 ? `At this pace the limit is reached in **month ${Math.ceil(20 / v.run)}**. The time to ask the carriers for an increase is now, with the reasons for the growth, not after the breach. With several carriers, every one of them must agree.` : "On course to finish inside the limit. The same projection should be run for each carrier’s share and each sub-limit in each binder.")
      },
      {
        h: "Whose risk is it?",
        say: "Where carriers take different segments, or the MGA has more than one facility able to take the same risk, someone must decide where each risk goes. That decision can be worth money to the MGA.",
        scene: () => flow({
          h: 170,
          nodes: [
            { id: "r", x: 95, y: 4, label: "A good new risk", sub: "Fits both facilities", tone: "ink" },
            { id: "a", x: 4, y: 110, w: 150, label: "Facility A", sub: "Pays MGA 30%", tone: "c2" }, { id: "b", x: 186, y: 110, w: 150, label: "Facility B", sub: "Pays MGA 25%" }
          ],
          edges: [["r", "a", "?"], ["r", "b", "?"]]
        }),
        ask: {
          q: "The risk fits both facilities. A pays the MGA more. Where should it go?",
          opts: ["To A. The MGA is entitled to maximise its income.", "Wherever the agreed, written allocation rules send it."],
          a: 1,
          why: "If good risks drift to the facility that pays best, the other carrier is left with a worse book than it agreed to back. Allocation must follow rules fixed in advance and open to audit. The same applies with extra force where the MGA or its owners take a share of the risk themselves."
        }
      },
      {
        h: "One event, different pain",
        say: "The structure decides how an accumulation lands on each carrier.",
        scene: () => bars([
          { label: "Panel: coastal storm, £12m", right: "shared by all", segs: [[6, "c1", "A 50%"], [3.6, "c2", "B 30%"], [2.4, "c3", "C 20%"]] },
          { label: "By segment: same storm", right: "falls on one", segs: [[12, "bad", "The property carrier takes all £12m"]] }
        ], { max: 12 }),
        ask: {
          q: "Why might a carrier prefer a 30% share of a panel to 100% of one segment of the same book?",
          opts: ["It doesn’t: more premium is better.", "It gets the same mix as everyone else, and a share of any event, not all of it."],
          a: 1,
          why: "On a panel no carrier can be handed a worse selection, and concentrations are diluted. A segment split gives a carrier the business it wants, with a concentrated exposure and reliance on the MGA’s fairness."
        }
      },
      {
        h: "In five lines",
        say: "Next: keeping the carriers once you have them.",
        scene: () => recap([
          "Only the MGA sees the whole book, so the portfolio is its job.",
          "Read results by segment: a shifting mix can spoil a book with no bad decision.",
          "Under-priced and growing is the dangerous combination.",
          "On a panel the tightest carrier limit governs; project premium limits ahead.",
          "Allocate between carriers by fixed, auditable rules."
        ])
      }
    ]
  });
})();
