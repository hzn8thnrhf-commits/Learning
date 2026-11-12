/* MGA · 2 — Managing the book across carriers */
(() => {
  const { bars, cols, flow, stats, recap, plot, money, pct, num } = window.SLIP.kit;
  const QUAD = [
    ["Well priced and growing", "Feed it. This is where underwriters’ time, marketing and capacity should go. Check that the growth is not being bought with price."],
    ["Well priced but shrinking", "Find out why. A competitor undercutting, a broker lost, appetite too narrow? Good business is leaving and it is worth winning back."],
    ["Under-priced and shrinking", "The market is doing the work for you. Push rate, accept the losses of business, and let it run down if it cannot be fixed."],
    ["Under-priced and growing", "The danger quadrant. Something is too cheap and brokers have noticed. Left alone, it becomes the largest part of the book and then the reason a carrier leaves."]
  ];

  window.SLIP.chapters.push({
    id: "mgabook", part: "MGA",
    title: "Managing the book across carriers",
    blurb: "Portfolio analysis by segment, the steering of mix, the operation of several carriers’ limits at once, and the fair allocation of risks.",
    minutes: 12,
    lead: "Each carrier sees its own share of an MGA’s business. Only the MGA sees the whole, and the management of the portfolio is accordingly its responsibility.",
    aims: [
      "Explain why a portfolio must be analysed by segment and how a change of mix can alter its result.",
      "Use price adequacy and growth to decide where a portfolio should expand or contract.",
      "Calculate the capacity available to a panel when its carriers have different limits.",
      "Explain the need for forward projection of premium limits and for fair allocation between carriers."
    ],
    init: { c: 20, q: 3, a: 60, run: 1.8, m: 6 },
    steps: [
      {
        h: "The MGA’s view of the portfolio",
        say: "A carrier sees only its own participation, and a broker only its own clients. The MGA alone has sight of the **entire portfolio**: every risk, every carrier’s share and every accumulation.\n\nPortfolio management is therefore a function that the MGA cannot leave to its carriers’ audits. It must moreover be performed on behalf of several principals at once, each with its own limits and appetite.",
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
          opts: [
          ["Yes. A book is the sum of its risks.", "A book also has a shape: where the risks are, and which kind is growing."],
          "No. Concentration and mix exist only at portfolio level.",
          ["Yes, provided each carrier audits its own share.", "Each carrier audits a slice. None of them sees the whole."]
        ],
          a: 1,
          why: "Forty good risks on one flood plain are a bad portfolio. So is a book whose growth all came from its cheapest segment. Risk-by-risk underwriting cannot see either."
        }
      },
      {
        h: "Analysis by segment",
        say: "The portfolio as a whole shows a satisfactory loss ratio. Analysed by segment, the position is less uniform: contractors at 45%, retail at 55%, and a more recent hospitality segment at 95%.\n\nHospitality is the segment that is growing. Increase its share of the portfolio.",
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
        live: (v) => (v.c <= 25 ? "At a fifth of the book, hospitality is invisible in the total: the good segments are quietly subsidising it. A carrier looking only at the headline would see nothing wrong." : v.c < 45 ? "No segment’s own loss ratio has changed. The overall figure is deteriorating purely because the **mix** is shifting towards the worst segment." : "The subsidy has run out. The book’s headline result is now poor, and it happened without any single bad underwriting decision. Results must be read by segment, by underwriting year and by type of loss, never only in total."),
        goal: {
          say: "Find the hospitality share at which the whole book’s loss ratio passes 65%.",
          test: (v) => v.c === 35,
          done: "Just over a third. No segment’s loss ratio changed on the way: contractors still 45%, retail 55%, hospitality 95%. The book went from good to poor through mix alone, and at every step the headline moved by only a couple of points."
        }
      },
      {
        h: "Price adequacy by segment",
        say: "Loss ratios emerge slowly, particularly in liability classes. An earlier indication is given by the **actual-to-technical** ratio for each segment: the premium charged as a percentage of the technical price. It identifies under-pricing before the claims experience confirms it.",
        scene: () => cols({
          h: 170, max: 130,
          bars: [{ label: "Contractors", segs: [[108, "c1"]], top: "108%" }, { label: "Retail", segs: [[101, "c1"]], top: "101%" }, { label: "Hospitality", hot: true, segs: [[82, "bad"]], top: "82%" }, { label: "Cyber add-on", segs: [[88, "c2"]], top: "88%" }],
          lines: [{ v: 100, label: "Technical price", right: true }]
        }),
        ask: {
          q: "Hospitality is at 82% of technical price and is the fastest-growing segment. What does that combination tell you?",
          opts: [
          ["Brokers love the product.", "They love the price."],
          "It is growing *because* it is cheap.",
          ["The technical price must be too high.", "Possible, and worth checking. But a model that is wrong only in the segment that happens to be booming would be a coincidence."]
        ],
          a: 1,
          why: "Brokers send business where the price is keenest. Rapid growth in an under-priced segment is not luck; it is the market telling you your rate is wrong."
        }
      },
      {
        h: "Steering the mix",
        say: "Each segment may be placed according to two characteristics: whether it is adequately priced, and whether it is growing. The four possible combinations call for four different responses.",
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
        h: "The MGA’s means of control",
        say: "An MGA directs its portfolio by the means within its control: the **appetite** it communicates to brokers, its **rates** and rating factors, the **line sizes** it offers, the **referral rules** that bind its own underwriters, and its choice of the **brokers** it cultivates.\n\nIt cannot purchase reinsurance for its carriers or alter their capital. Its instruments are selection and price.",
        scene: () => recap(["Appetite guide: what brokers are told you want", "Rates and rating factors", "Line size and deductibles", "Referral rules inside the MGA", "Which brokers and channels to invest in"]),
        ask: {
          q: "The MGA raises hospitality rates 20% and tightens its appetite. Premium in the segment falls by a third. Has the action failed?",
          opts: [
          ["Yes. The MGA has lost commission.", "It has, which is why the decision is hard. But commission was not the aim."],
          "No. Shrinking under-priced business was the aim.",
          ["Yes. The rate rise should have increased premium.", "Only if every client stayed. The ones who left were the ones only there for the price."]
        ],
          a: 1,
          why: "The MGA gives up income to protect its carriers’ loss ratio. An MGA willing to do that is one that keeps its capacity."
        }
      },
      {
        h: "Carriers’ limits on a panel",
        say: "Each carrier specifies its own limits in its binding authority. On a panel, every carrier takes a fixed share of every risk, so that the carrier whose limit is reached first prevents further business for all.\n\nTwo carriers share a portfolio exposed to flood. Carrier A will accept an aggregate of **£30m** for its share; Carrier B, **£24m**. Vary the shares.",
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
          return Math.abs(capA - capB) < 2 ? "Both carriers fill at the same moment: the panel uses all £54m of available aggregate. The shares match the carriers’ appetites." : capA < capB ? `Carrier A fills first at ${money(capA)} of total aggregate, leaving ${money(24 - capA * (1 - a))} of B’s limit unusable. To write more, renegotiate A’s limit or shift share to B.` : `Carrier B fills first at ${money(capB)}, stranding ${money(30 - capB * a)} of A’s appetite. The panel is only as large as its most cautious member allows.`;
        },
        goal: {
          say: "Find the split that comes closest to using every pound of both carriers’ flood appetite.",
          test: (v) => v.a === 55,
          done: "About 55:45, matching the ratio of their limits (30:24). Shares that mirror appetites waste nothing. Shares set by history or negotiation leave capacity stranded on one side."
        }
      },
      {
        h: "Projecting the premium limit",
        say: "A binding authority also limits the total **premium** that may be written in the year, here £20m. To exceed it is to write without authority. The limit must therefore be monitored by projecting the year-end position from the current rate of writing, and not merely by recording the premium written to date.",
        scene: (v) => {
          const pts = Array.from({ length: 13 }, (_, i) => [i, v.run * i]), end = v.run * 12, sofar = v.run * v.m, hit = 20 / v.run;
          return stats([["Written so far", money(sofar)], ["Projected year end", money(end), end > 20 ? "bad" : "good"], ["Limit reached", end > 20 ? `month ${Math.ceil(hit)}` : "not this year", end > 20 ? "bad" : ""]]) +
            plot({ h: 160, x: { min: 0, max: 12, ticks: [0, 3, 6, 9, 12], title: "Month" }, y: { min: 0, max: 30, ticks: [0, 10, 20, 30], fmt: (x) => `£${x}m` },
              series: [{ tone: "c1", pts: pts.filter((p) => p[0] <= v.m) }, { tone: end > 20 ? "bad" : "c1", dash: true, pts: pts.filter((p) => p[0] >= v.m) }],
              dots: [{ x: v.m, y: sofar, tone: "c1" }], refs: [{ y: 20, label: "Binder limit £20m", left: true }] });
        },
        ctl: [{ k: "run", label: "Premium written each month", min: 1.2, max: 2.4, step: 0.1, fmt: money }, { k: "m", label: "Month now", min: 1, max: 12, step: 1, fmt: (x) => `${x}` }],
        live: (v) => (v.run * 12 > 20 ? `At this pace the limit is reached in **month ${Math.ceil(20 / v.run)}**. The time to ask the carriers for an increase is now, with the reasons for the growth, not after the breach. With several carriers, every one of them must agree.` : "On course to finish inside the limit. The same projection should be run for each carrier’s share and each sub-limit in each binder."),
        goal: {
          say: "Find the fastest monthly pace that stays inside the £20m limit all year.",
          test: (v) => v.run === 1.6,
          done: "£1.6m a month. At the £1.8m the MGA started on, the limit is breached in the last month of the year, and it could have been seen in January. The projection, not the running total, is the control."
        }
      },
      {
        h: "Allocation between carriers",
        say: "Where carriers participate in different segments, or where more than one facility could accept the same risk, the MGA must decide to which each risk is allocated. Since the facilities may remunerate the MGA differently, the decision can affect its own income.",
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
          opts: [
          ["To A. The MGA may maximise its income.", "Not at a carrier’s expense. B was promised a fair share of the good risks."],
          "Wherever the written allocation rules send it.",
          ["To B, to avoid any appearance of bias.", "Sending everything to the lower payer is just a different bias. The answer is rules, not gestures."]
        ],
          a: 1,
          why: "If good risks drift to the facility that pays best, the other carrier is left with a worse book than it agreed to back. Allocation must follow rules fixed in advance and open to audit, above all where the MGA or its owners take a share of risk themselves."
        }
      },
      {
        h: "Accumulation and capacity structure",
        say: "The structure of the capacity determines how an accumulated loss is distributed among the carriers.",
        scene: () => bars([
          { label: "Panel: coastal storm, £12m", right: "shared by all", segs: [[6, "c1", "A 50%"], [3.6, "c2", "B 30%"], [2.4, "c3", "C 20%"]] },
          { label: "By segment: same storm", right: "falls on one", segs: [[12, "bad", "The property carrier takes all £12m"]] }
        ], { max: 12 }),
        ask: {
          q: "Why might a carrier prefer a 30% share of a panel to 100% of one segment of the same book?",
          opts: [
          ["It would not: more premium is better.", "More premium from one segment is also more concentration."],
          "It gets the same mix as everyone else, and only a share of any one event.",
          ["Panels pay carriers a higher commission.", "Carriers pay commission, and the structure does not set its level."]
        ],
          a: 1,
          why: "On a panel no carrier can be handed a worse selection, and concentrations are diluted. A segment split gives a carrier the business it wants, with a concentrated exposure and reliance on the MGA’s fairness."
        }
      },
      {
        h: "Summary",
        say: "The final chapter considers how an MGA retains the support of its carriers.",
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
