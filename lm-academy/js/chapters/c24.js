/* LM3 · 8 — Exposure and accumulation */
(() => {
  const { bars, flow, stats, recap, plot, money, pct, num } = window.SLIP.kit;
  const RP = [5, 10, 25, 50, 100, 200, 500];
  const loss = (T) => 6 * Math.pow(Math.log(T), 1.8);
  const MOD = [
    ["Hazard", "A catalogue of thousands of simulated events: where each storm or earthquake strikes and how strong it is at every point."],
    ["Exposure", "Your data: where each insured property is, what it is built of, what it is worth. The only part the insurer supplies, and the part most often wrong."],
    ["Vulnerability", "How much damage a building of that type suffers at that wind speed or ground movement."],
    ["Financial", "Applies policy terms, deductibles, limits and reinsurance to turn damage into the insurer’s own loss."]
  ];

  window.SLIP.chapters.push({
    id: "exposure", part: "LM3",
    title: "Exposure and accumulation",
    blurb: "Why a book of well-priced risks can still sink an insurer, how catastrophe models are read, and the levers that control it.",
    minutes: 10,
    init: { n: 12, mod: 0, rp: 5, lim: 50 },
    steps: [
      {
        h: "Good risks, bad portfolio",
        say: "Pricing asks: *is this risk worth writing?* Exposure management asks a different question: *what happens if many of my risks are hit at once?*\n\nAn **accumulation** is the total exposed to one event.",
        scene: () => bars([
          { label: "Book A: 40 risks across 40 cities", right: "worst event: 1 risk", segs: [[5, "c1"]] },
          { label: "Book B: 40 risks along one coast", right: "worst event: all 40", segs: [[200, "bad", "One hurricane"]] }
        ], { max: 200 }),
        ask: {
          q: "Both books hold 40 identical, well-priced £5m lines. Which is the better portfolio?",
          opts: ["The same: identical risks, identical prices.", "Book A. Book B can lose £200m in an afternoon."],
          a: 1,
          why: "Individually the risks are indistinguishable. The difference exists only at portfolio level, which is why an underwriter can do everything right risk by risk and still build something dangerous."
        }
      },
      {
        h: "Counting the aggregate",
        say: "The first tool is simple: add up the limits exposed in each zone and compare the total with a ceiling.\n\nThe underwriter writes £5m lines. The Miami zone has an aggregate limit of £100m. Keep saying yes to good Miami risks.",
        scene: (v) => {
          const agg = v.n * 5;
          return stats([["Miami risks", `${v.n}`], ["Aggregate", money(agg), agg > 100 ? "bad" : ""], ["Room left", money(Math.max(100 - agg, 0)), agg >= 90 ? "bad" : "good"]]) +
            bars([
              { label: "Miami", right: money(agg), segs: [[Math.min(agg, 100), "c1"], [Math.max(agg - 100, 0), "bad", "Over"]] },
              { label: "Houston", right: "£45m", segs: [[45, "c1"]] },
              { label: "New Orleans", right: "£30m", segs: [[30, "c1"]] }
            ], { max: 160, marks: [[100, "Zone limit"]] });
        },
        ctl: [{ k: "n", label: "Miami risks written", min: 4, max: 30, step: 1, fmt: (x) => `${x}` }],
        live: (v) => (v.n * 5 > 100 ? "Over the limit, and every single risk was within the £5m line authority. Nobody broke a rule on any one risk; the breach exists only in the total." : v.n * 5 >= 90 ? "Nearly full. From here every new Miami risk should prompt a question: a smaller line, facultative reinsurance, or letting a weaker Miami risk go at renewal to make room." : "Room to write. Aggregates are tracked by zone and peril, in real time where possible, so the answer is known before the stamp goes down.")
      },
      {
        h: "Inside a catastrophe model",
        say: "Adding limits assumes everything in the zone is a total loss. A **catastrophe model** is subtler: it simulates thousands of possible events against the actual portfolio. It has four parts.",
        scene: (v) => flow({
          h: 250,
          on: [["h", "e", "v", "f"][v.mod]],
          nodes: [
            { id: "h", x: 95, y: 4, label: "Hazard", sub: "The events" },
            { id: "e", x: 95, y: 68, label: "Exposure", sub: "Your data", tone: "c2" },
            { id: "v", x: 95, y: 132, label: "Vulnerability", sub: "Damage" },
            { id: "f", x: 95, y: 196, label: "Financial", sub: "Your loss", tone: "c1" }
          ],
          edges: [["h", "e"], ["e", "v"], ["v", "f"]]
        }),
        ctl: [{ k: "mod", label: "Module", opts: ["Hazard", "Exposure", "Damage", "Financial"] }],
        live: (v) => `**${MOD[v.mod][0]}.** ${MOD[v.mod][1]}`
      },
      {
        h: "Reading the curve",
        say: "The model’s main output is an **exceedance probability curve**: for each return period, the loss that will be equalled or exceeded that often. The average of all the simulated years is the **average annual loss**, which is what the catastrophe load in the price must cover.\n\nThis insurer has £110m of capital.",
        scene: (v) => {
          const T = RP[v.rp], L = loss(T);
          const pts = [2, 3, 5, 10, 25, 50, 100, 200, 500].map((t) => [t, loss(t)]);
          return stats([["Return period", `1 in ${T}`], ["Loss at that level", money(L), L > 110 ? "bad" : "c1"], ["Chance each year", pct(100 / T, T > 100 ? 1 : 0)]]) +
            plot({ h: 170, x: { min: 2, max: 500, log: true, ticks: [5, 10, 50, 200, 500], title: "Return period, years" }, y: { min: 0, max: 180, ticks: [0, 60, 120, 180], fmt: (x) => `£${x}m` },
              series: [{ tone: "c1", pts }], dots: [{ x: T, y: L, tone: L > 110 ? "bad" : "c1" }], refs: [{ y: 110, label: "Capital £110m", left: true }] });
        },
        ctl: [{ k: "rp", label: "Return period", min: 0, max: RP.length - 1, step: 1, fmt: (i) => `1 in ${RP[i]} years` }],
        live: (v) => {
          const T = RP[v.rp], L = loss(T);
          return L > 110 ? `At 1 in ${T} the modelled loss of ${money(L)} is **more than the capital**. If the board’s appetite is to survive a 1-in-200 year, this book is outside it, and something must change: less exposure, more reinsurance, or more capital.` : `At 1 in ${T} the loss is ${money(L)}: painful, survivable. Appetite is usually set at several points on this curve, such as “no more than a quarter of capital at 1 in 50”.`;
        }
      },
      {
        h: "Reinsurance reshapes the curve",
        say: "The gross 1-in-200 loss is £121m against £110m of capital. The board wants the **net** 1-in-200 loss under £50m. The insurer keeps the first £20m of any event and buys catastrophe excess of loss above that.",
        scene: (v) => {
          const rec = Math.min(v.lim, 101), net = 121 - rec;
          return stats([["Gross", "£121m"], ["Recovered", money(rec), "c2"], ["Net", money(net), net > 50 ? "bad" : "good"]]) +
            bars([{ label: "The 1-in-200 loss", segs: [[20, "c1", "Kept"], [101 - rec, "bad", "Also kept"], [rec, "c2", "Reinsurers"]] }], { max: 125, marks: [[50, "Net appetite"]] });
        },
        ctl: [{ k: "lim", label: "Cover bought above £20m", min: 0, max: 120, step: 10, fmt: (x) => (x ? `${money(x)} xs £20m` : "none") }],
        live: (v) => {
          const net = 121 - Math.min(v.lim, 101);
          return v.lim > 101 ? "Cover above the modelled loss. Not wasted: it protects against the model being wrong, which it will be. But it costs premium." : net > 50 ? `Net ${money(net)}: still outside appetite. Buy more, or write less.` : `Net ${money(net)}: inside appetite. Two cautions. The recovery depends on the **reinsurers paying**, so their security is part of the exposure. And after a big event, cover must be **reinstated** at extra cost, or the next event is unprotected.`;
        }
      },
      {
        h: "What the model doesn’t see",
        say: "**Realistic disaster scenarios** complement the model: take one defined event and add up everything it would cost. They catch what models miss.\n\n**Clash:** one event hitting several classes at once. **Non-modelled perils:** risks with no reliable model yet, where exposure must be tracked by simpler means.",
        scene: () => flow({
          h: 190,
          nodes: [
            { id: "e", x: 95, y: 4, label: "One port explosion", tone: "bad" },
            { id: "a", x: 4, y: 76, w: 104, label: "Property" }, { id: "b", x: 118, y: 76, w: 104, label: "Marine cargo" }, { id: "c", x: 232, y: 76, w: 104, label: "Liability" },
            { id: "d", x: 60, y: 136, w: 104, label: "Business interr." }, { id: "f", x: 176, y: 136, w: 104, label: "Marine hull" }
          ],
          edges: [["e", "a"], ["e", "b"], ["e", "c"]]
        }),
        ask: {
          q: "Each class underwriter is inside their own aggregate limit for the port. Is the insurer safe?",
          opts: ["Yes. Every limit is respected.", "Not necessarily. Nobody has added the classes together."],
          a: 1,
          why: "Five teams, each within limits, can share one loss. Clash is found only by someone looking across classes, which is the job of a central exposure management function, and the reason Lloyd’s prescribes cross-class scenarios."
        }
      },
      {
        h: "Garbage in",
        say: "A model is exactly as good as the exposure data fed to it. Location, construction, occupancy and value all change the answer, sometimes dramatically.",
        scene: () => bars([
          { label: "Coded to the street address", right: "in the flood plain", segs: [[90, "bad", "High modelled loss"]] },
          { label: "Coded only to the postcode centre", right: "on the hill", segs: [[15, "c1"]] }
        ], { max: 100 }),
        ask: {
          q: "A coverholder’s bordereau gives only a town name for each property. What does the cat model do with it?",
          opts: ["Refuses to run.", "Assumes an average location, which may be badly wrong."],
          a: 1,
          why: "The model runs and produces a confident number. Nothing on the output says the inputs were guesses. Asking for better data, and loading for poor data, is part of underwriting delegated business."
        }
      },
      {
        h: "The levers",
        say: "Exposure is managed with a small set of tools, used together.",
        scene: () => recap([
          "Line size: how much of each risk",
          "Aggregate limits: how much per zone and peril",
          "Reinsurance: facultative on one risk, treaty on the book",
          "Price: charge for the capital the accumulation uses",
          "Mix: write less where you are full, more where you are empty"
        ]),
        ask: {
          q: "The Miami zone is at 95% of its limit. An excellent new Miami risk is offered. What is the best response?",
          opts: ["Decline. The zone is nearly full.", "Write it anyway. It is excellent.", "Find room: a smaller line, facultative cover, or drop a weaker Miami risk."],
          a: 2,
          why: "A limit is a budget, not a wall. The skilled move is to spend scarce capacity on the best risks in the zone, improving the quality of the accumulation without growing it."
        }
      },
      {
        h: "In five lines",
        say: "Next: getting the business through the door.",
        scene: () => recap([
          "An accumulation is everything one event can hit.",
          "Line limits control a risk; aggregate limits control a portfolio.",
          "Cat models give a loss for each return period, and are only as good as the data.",
          "Reinsurance brings the net curve inside appetite, if the reinsurers pay.",
          "Clash and unmodelled perils need scenarios and someone looking across classes."
        ])
      }
    ]
  });
})();
