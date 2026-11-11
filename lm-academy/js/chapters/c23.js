/* LM3 · 7 — Pricing a risk */
(() => {
  const { bars, cols, flow, stats, recap, plot, money, pct, num } = window.SLIP.kit;
  const YEARS = [[2021, 300, 80], [2022, 420, 90], [2023, 250, 100], [2024, 510, 110], [2025, 380, 120]];
  const FLEET = [5, 20, 50, 100, 250, 500, 1000, 2500];

  window.SLIP.chapters.push({
    id: "pricing", part: "LM3",
    title: "Pricing a risk",
    blurb: "Build a premium from its parts, rate from experience and from exposure, and tell a fair price from a merely higher one.",
    minutes: 12,
    init: { exp: 30, mar: 10, spr: 0, tim: 0, rec: 0, fl: 3, adj: 0, att: 95, rate: 2, inf: 5 },
    steps: [
      {
        h: "Building a price",
        say: "Each risk must contribute to the pool in proportion to the risk it brings. The premium has to cover three things: expected **claims**, **expenses** (including brokerage), and a **return** on the capital at risk.\n\nExpected claims on this risk: £60k.",
        scene: (v) => {
          const prem = 60 / (1 - v.exp / 100 - v.mar / 100);
          return stats([["Expected claims", "£60k"], ["Premium needed", `£${num(prem, 0)}k`, "c1"], ["Claims ratio", pct(6000 / prem)]]) +
            bars([{ label: "The premium", right: `£${num(prem, 0)}k`, segs: [[60, "c1", "Claims"], [prem * v.exp / 100, "c2", "Expenses"], [prem * v.mar / 100, "c3", "Return"]] }], { max: 160 });
        },
        ctl: [{ k: "exp", label: "Expenses and brokerage", min: 20, max: 45, step: 1, fmt: pct }, { k: "mar", label: "Return on capital", min: 0, max: 15, step: 1, fmt: pct }],
        live: (v) => `Expenses and return are percentages of the *premium*, so divide: £60k ÷ ${pct(100 - v.exp - v.mar)} = **£${num(60 / (1 - v.exp / 100 - v.mar / 100), 0)}k**. Simply adding ${pct(v.exp + v.mar)} to £60k would give £${num(60 * (1 + (v.exp + v.mar) / 100), 0)}k and leave the insurer short.`
      },
      {
        h: "Rate, exposure and rating factors",
        say: "In practice a premium is a **base rate** applied to an **exposure measure**, then adjusted by **rating factors**.\n\nA £50m factory at a base rate of 0.20% gives £100,000. Now describe the building.",
        scene: (v) => {
          const f = (v.spr ? 0.8 : 1) * (v.tim ? 1.3 : 1) * (v.rec ? 1.25 : 1), prem = 100 * f;
          return stats([["Base premium", "£100k"], ["Factors", `× ${num(f, 2)}`], ["Premium", `£${num(prem, 0)}k`, "c1"]]) +
            bars([
              { label: "Sprinklers", right: v.spr ? "× 0.80" : "× 1.00", segs: [[v.spr ? 80 : 100, v.spr ? "c3" : "idle"]] },
              { label: "Construction", right: v.tim ? "× 1.30" : "× 1.00", segs: [[v.tim ? 130 : 100, v.tim ? "bad" : "idle"]] },
              { label: "Claims record", right: v.rec ? "× 1.25" : "× 1.00", segs: [[v.rec ? 125 : 100, v.rec ? "bad" : "idle"]] }
            ], { max: 135, marks: [[100, "Average risk"]] });
        },
        ctl: [{ k: "spr", label: "Sprinklers", opts: ["None", "Fitted"] }, { k: "tim", label: "Construction", opts: ["Brick and steel", "Timber frame"] }, { k: "rec", label: "Claims record", opts: ["Clean", "Two fires"] }],
        live: (v) => "A **discount** rewards a feature that reduces the risk; a **loading** charges for one that increases it. Factors multiply. A rating matrix like this suits similar risks; large or unusual ones are priced individually."
      },
      {
        h: "Which premium?",
        say: "Be precise about the word.\n\n**Written** premium is on the line the underwriter put down; **signed** premium is on the line after signing down. **Gross** premium is before deductions such as brokerage and reinsurance cost; **net** is after. **Earned** premium is the part for cover already given.",
        scene: () => bars([
          { label: "Written line 20%", right: "£200k", segs: [[200, "soft1", "Written"]] },
          { label: "Signed line 15%", right: "£150k", segs: [[150, "c1", "Signed gross"]] },
          { label: "After 20% brokerage", right: "£120k", segs: [[120, "c1", "Net"], [30, "c2", "Brokerage"]] }
        ], { max: 200 }),
        ask: {
          q: "An underwriter budgets on written lines. The market is oversubscribed all year and lines sign down by a quarter. What happens to her income?",
          opts: ["Nothing.", "It comes in about 25% under budget."],
          a: 1,
          why: "Only signed lines produce premium. Underwriters therefore estimate signing when they write, and plans are built on signed, not written, income."
        }
      },
      {
        h: "Two ways to find the claims cost",
        say: "**Experience rating** uses the risk’s *own* history. **Exposure rating** uses what *similar* risks cost, through market rates or a model.\n\nA haulier’s own record suggests £900 a vehicle. Fleets like it average £600. How far should its own record be believed? That depends on how much record there is.",
        scene: (v) => {
          const n = FLEET[v.fl], z = n / (n + 150), price = z * 900 + (1 - z) * 600;
          return stats([["Fleet", `${num(n, 0)} vehicles`], ["Weight on own record", pct(z * 100), "c1"], ["Rate", `£${num(price, 0)} a vehicle`]]) +
            bars([{ label: "Where the price comes from", segs: [[z * 100, "c1", "Own experience"], [(1 - z) * 100, "c2", "Similar risks"]] }], { max: 100 });
        },
        ctl: [{ k: "fl", label: "Size of the fleet", min: 0, max: FLEET.length - 1, step: 1, fmt: (i) => `${num(FLEET[i], 0)} vehicles` }],
        live: (v) => (FLEET[v.fl] <= 50 ? "A handful of vehicles produce a handful of claims: mostly luck. Its record gets little weight and the price sits near the market rate." : FLEET[v.fl] >= 500 ? "Hundreds of vehicles generate enough claims for the record to mean something. The fleet is priced largely on itself." : "A blend. The weight given to a risk’s own experience is its **credibility**: it rises with the volume of data behind it.")
      },
      {
        h: "Burning cost",
        say: "The simplest experience rating: total past claims divided by total past exposure gives a rate to apply next year. Here, five years of the haulier’s claims.\n\nBut old years aren’t comparable to today until they are adjusted.",
        scene: (v) => {
          const rows = YEARS.map(([y, c, f], i) => { const k = v.adj ? Math.pow(1.06, 4 - i) : 1; return [y, c * k, f]; });
          const tot = rows.reduce((a, r) => a + r[1], 0), veh = rows.reduce((a, r) => a + r[2], 0), bc = tot / veh;
          return stats([["Claims, 5 years", `£${num(tot, 0)}k`], ["Vehicle-years", `${veh}`], ["Burning cost", `£${num(bc * 1000, 0)} a vehicle`, "c1"]]) +
            cols({ h: 160, max: 650, bars: rows.map(([y, c]) => ({ label: `${y}`, segs: [[c, "c1"]], top: `£${num(c, 0)}k` })) });
        },
        ctl: [{ k: "adj", label: "Claims shown", opts: ["As paid", "At today’s prices"] }],
        live: (v) => (v.adj ? "Inflating old claims at 6% a year lifts the burning cost. A 2021 repair bill would cost much more today. Other adjustments: claims not yet fully developed, and changes in the risk itself." : "Raw history understates today’s cost: these claims were paid at old prices, and the latest years are probably not fully reported yet.")
      },
      {
        h: "Triangles",
        say: "A **triangulation** sets out each year’s claims as they develop: after one year, two, three. Older, finished years show how much the recent ones still have to grow.\n\nThe 2022 year reported £4m after one year and finished at £10m: it grew **2.5 times**.",
        scene: () => bars([
          { label: "2022: fully developed", right: "£10m", segs: [[4, "c1", "Yr 1"], [3, "c1", "Yr 2"], [3, "c1", "Yr 3"]] },
          { label: "2023: two years in", right: "£8.4m so far", segs: [[4.8, "c1", "Yr 1"], [3.6, "c1", "Yr 2"], [3.6, "soft1", "?"]] },
          { label: "2024: one year in", right: "£5m so far", segs: [[5, "c1", "Yr 1"], [7.5, "soft1", "?"]] }
        ], { max: 13 }),
        ask: {
          q: "2024 has reported £5m after one year. If it develops like 2022, where will it finish?",
          opts: ["£5m: that is what has been reported.", "£7.5m", "£12.5m"],
          a: 2,
          why: "£5m × 2.5 = £12.5m. The catch is the “if”. Triangles only work on a **stable** book. Change the mix, the limits, the claims handling or the reinsurance, and the old pattern describes a business that no longer exists."
        }
      },
      {
        h: "Technical price",
        say: "The **technical price** is what the insurer’s own pricing says the risk needs: expected claims, expenses and the cost of capital. The market decides what can actually be charged.\n\nThe ratio of the two, **actual to technical**, is the most direct measure of price adequacy.",
        scene: (v) => {
          const cr = 60 / (v.att / 100) + 30;
          return stats([["Technical price", "£100k"], ["Charged", `£${v.att}k`, v.att < 100 ? "bad" : "good"], ["Expected combined", pct(cr), cr > 100 ? "bad" : cr > 90 ? "c2" : "good"]]) +
            bars([{ label: "Premium charged", right: `${v.att}% of technical`, segs: [[v.att, v.att < 100 ? "bad" : "c1"]] }], { max: 130, marks: [[100, "Technical price"]] });
        },
        ctl: [{ k: "att", label: "Premium the market will bear", min: 60, max: 130, step: 5, fmt: (x) => `£${x}k` }],
        live: (v) => (v.att < 85 ? "Well under technical. The risk will probably still make an accounting profit in a quiet year, which is what makes it dangerous: it isn’t paying for the capital it uses." : v.att < 100 ? "Slightly under. One risk like this is a commercial judgement. A whole portfolio drifting below 100% is a soft market showing up in the data." : "At or above technical: the risk earns its cost of capital. In a hard market the whole book can sit here, which is when to grow.")
      },
      {
        h: "Rate change compounds",
        say: "Insurers track **rate change**: what the same risk is charged this year against last. One year’s movement looks small. But rate compounds, and so does claims inflation, in the opposite direction.\n\nA book starts at a 60% claims ratio. Nothing about the risks changes for five renewals.",
        scene: (v) => {
          const pts = Array.from({ length: 6 }, (_, i) => [i, 60 * Math.pow((1 + v.inf / 100) / (1 + v.rate / 100), i)]);
          const end = pts[5][1];
          return stats([["Rate index after 5", `${num(Math.pow(1 + v.rate / 100, 5) * 100, 0)}`], ["Claims ratio, year 5", pct(end), end > 70 ? "bad" : end < 60 ? "good" : ""]]) +
            plot({ h: 160, x: { min: 0, max: 5, ticks: [0, 1, 2, 3, 4, 5], title: "Renewals from now" }, y: { min: 30, max: 110, ticks: [40, 70, 100], fmt: (x) => `${x}%` },
              series: [{ tone: end > 70 ? "bad" : "c1", pts }], refs: [{ y: 70, label: "Break-even" }] });
        },
        ctl: [{ k: "rate", label: "Rate change each year", min: -10, max: 10, step: 1, fmt: (x) => `${x > 0 ? "+" : ""}${x}%` }, { k: "inf", label: "Claims inflation each year", min: 0, max: 10, step: 1, fmt: pct }],
        live: (v) => (v.rate < v.inf ? `Each year the gap between rate and inflation is only ${v.inf - v.rate} points. After five renewals the claims ratio has moved from 60% to **${pct(60 * Math.pow((1 + v.inf / 100) / (1 + v.rate / 100), 5))}** without a single extra loss. A cumulative **rate index** shows this; a list of annual changes hides it.` : "Rate is keeping up with or beating claims inflation, so the book improves by itself. This is what a hardening market feels like.")
      },
      {
        h: "Who watches the price?",
        say: "Pricing isn’t left to the underwriter’s instinct. Lloyd’s **Principles for doing business** expect a syndicate to know its technical price, monitor rate change and price adequacy, and act on what it finds.\n\nWhere the customer is a consumer, the **FCA** adds another test: the product must offer **fair value**, and a renewing customer must not be charged more than an equivalent new one.",
        scene: () => flow({
          h: 150,
          nodes: [
            { id: "l", x: 4, y: 4, w: 150, label: "Lloyd’s and the PRA", sub: "Is the price enough?", tone: "c1" },
            { id: "f", x: 186, y: 4, w: 150, label: "The FCA", sub: "Is the price fair?", tone: "c2" },
            { id: "p", x: 95, y: 100, label: "The price", tone: "ink" }
          ],
          edges: [["l", "p"], ["f", "p"]]
        }),
        ask: {
          q: "A home insurer raises prices every year for customers who never shop around, while offering newcomers a low rate. What is the problem?",
          opts: ["None. That is the market.", "It penalises loyalty, which UK rules now prohibit."],
          a: 1,
          why: "Prudential regulators worry about prices that are too low; the conduct regulator worries about prices that exploit. An underwriter with consumer business, often through coverholders, answers to both."
        }
      },
      {
        h: "In five lines",
        say: "Next: when good prices aren’t enough.",
        scene: () => recap([
          "Premium = claims ÷ (1 − expenses − return).",
          "Base rate × exposure, then rating factors that load or discount.",
          "Experience rating needs volume; small risks lean on exposure rating.",
          "Burning cost and triangles need adjusted, stable history.",
          "Actual-to-technical and a cumulative rate index show whether the price is adequate."
        ])
      }
    ]
  });
})();
