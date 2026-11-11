/* LM3 · 4 — Pricing and exposure */
(() => {
  const { bars, cols, flow, stats, recap, money, pct, num } = window.SLIP.kit;
  const BASE = [20, 30, 30, 40, 50, 60, 80];
  const YEARS = [[2021, 300, 80], [2022, 420, 90], [2023, 250, 100], [2024, 510, 110], [2025, 380, 120]];
  const sorted = (a) => a.slice().sort((x, y) => x - y);

  window.SLIP.chapters.push({
    id: "pricing", part: "LM3",
    title: "Pricing and exposure",
    blurb: "Frequency and severity, why averages mislead, building a premium, and burning cost.",
    minutes: 10,
    init: { freq: 4, sev: 50, big: 100, lr: 60, exp: 30, mar: 10, adj: 0, rate: -5 },
    steps: [
      {
        h: "How often, and how big",
        say: "Every expected loss cost is two numbers multiplied: **frequency** (how often claims happen) and **severity** (how large they are).\n\nA fleet of 1,000 vans. Set both.",
        scene: (v) => {
          const n = 1000 * v.freq / 100, cost = n * v.sev / 1000;
          return stats([["Claims a year", num(n, 0)], ["Expected cost", `£${num(cost, 2)}m`, "c1"], ["Per van", `£${num(cost * 1000, 0)}`]]) +
            bars([{ label: "Frequency: claims per 100 vans", right: `${v.freq}`, segs: [[v.freq, "c2"]] }, { label: "Severity: average claim", right: `£${v.sev}k`, segs: [[v.sev / 20, "c1"]] }], { max: 10 });
        },
        ctl: [{ k: "freq", label: "Frequency", min: 1, max: 10, step: 1, fmt: (x) => `${x} per 100` }, { k: "sev", label: "Severity", min: 5, max: 200, step: 5, fmt: (x) => `£${x}k` }],
        live: (v) => (v.freq >= 6 && v.sev <= 40 ? "**High frequency, low severity:** motor, small property. Many small claims, statistically predictable. The past is a good guide." : v.freq <= 2 && v.sev >= 100 ? "**Low frequency, high severity:** catastrophe, aviation, energy. Few data points, huge swings. The past tells you little, so models and judgement take over." : "The same expected cost can come from many small claims or a few large ones. They are very different risks to hold.")
      },
      {
        h: "Three averages",
        say: "“The average claim” has three meanings. The **mean**: total divided by the number of claims. The **median**: the middle claim when ranked. The **mode**: the most common value.\n\nSeven claims. Six are ordinary. Change the seventh.",
        scene: (v) => {
          const all = [...BASE.slice(0, 6), v.big], s = sorted(all), mean = all.reduce((a, b) => a + b, 0) / 7, med = s[3];
          return stats([["Mean", `£${num(mean, 0)}k`, mean > med * 1.5 ? "bad" : ""], ["Median", `£${med}k`, "c1"], ["Mode", "£30k"]]) +
            cols({ h: 170, max: Math.max(120, v.big), bars: all.map((x, i) => ({ label: `${i + 1}`, hot: i === 6, segs: [[x, i === 6 ? "bad" : "c1"]] })), lines: [{ v: mean, label: "Mean" }] });
        },
        ctl: [{ k: "big", label: "The seventh claim", min: 60, max: 900, step: 20, fmt: (x) => `£${x}k` }],
        live: (v) => (v.big > 300 ? "One large claim has dragged the **mean** far above what a typical claim looks like, while the **median** hasn’t moved. Insurance losses are skewed like this. Always ask which average you are being shown, and look at the **spread** as well." : "With no outlier, the three averages sit close together and any of them describes the book.")
      },
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
        h: "Burning cost",
        say: "The simplest experience rating: total past claims divided by total past exposure gives a rate to apply next year. Here, five years of a haulier’s claims.\n\nBut old years aren’t comparable to today until they are adjusted.",
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
        h: "Triangles, and their limit",
        say: "A **triangulation** sets out each year’s claims as they develop: after one year, two, three. Older years show how much later years are likely to grow, so the underwriter can project them to their final cost.\n\nThe method assumes the future develops like the past.",
        scene: () => bars([
          { label: "2022: fully developed", right: "£10m", segs: [[4, "c1", "Yr 1"], [3, "c1", "Yr 2"], [3, "c1", "Yr 3"]] },
          { label: "2023: two years in", right: "£8.4m so far", segs: [[4.8, "c1", "Yr 1"], [3.6, "c1", "Yr 2"], [3.6, "soft1", "Projected"]] },
          { label: "2024: one year in", right: "£5m so far", segs: [[5, "c1", "Yr 1"], [7.5, "soft1", "Projected"]] }
        ], { max: 13 }),
        ask: {
          q: "In 2024 the insurer switched from property to mostly liability business. Is the triangle still a good guide?",
          opts: ["Yes. The maths is the same.", "No. The book has changed, so past patterns don’t apply."],
          a: 1,
          why: "Triangulations only work on a stable book. Change the mix, the limits, the claims handling or the reinsurance, and the old development pattern describes a business that no longer exists."
        }
      },
      {
        h: "When history runs out",
        say: "For catastrophes there aren’t enough past events to rate from. **Catastrophe models** simulate thousands of possible years of storms and earthquakes against the insurer’s actual portfolio, giving a loss for each return period.\n\n**Realistic disaster scenarios** do the reverse: take one defined event and add up what it would cost.",
        scene: () => bars([
          { label: "1-in-10-year loss", right: "£15m", segs: [[15, "c1"]] },
          { label: "1-in-50", right: "£45m", segs: [[45, "c1"]] },
          { label: "1-in-200", right: "£110m", segs: [[110, "bad"]] }
        ], { max: 120, marks: [[90, "Capital available"]] }),
        ask: {
          q: "The model says a £110m loss is a 1-in-200 event. How much weight should the number carry?",
          opts: ["It is a fact.", "It is an estimate, only as good as its data and assumptions."],
          a: 1,
          why: "Models have been badly wrong when an event behaved in ways nobody coded. A wrong address field alone can move a risk across a flood boundary. Use the model; don’t hand it the decision."
        }
      },
      {
        h: "Watching the rate",
        say: "Insurers track **rate change**: what the same risk is charged this year against last. It is the earliest warning of where results are heading.\n\nLast year’s book ran at a 60% claims ratio. Nothing about the risks changes.",
        scene: (v) => {
          const lr = 60 / (1 + v.rate / 100), cr = lr + 35;
          return stats([["Rate change", `${v.rate > 0 ? "+" : ""}${v.rate}%`], ["Claims ratio", pct(lr), lr > 65 ? "bad" : ""], ["Combined", pct(cr), cr > 100 ? "bad" : "good"]]) +
            bars([{ label: "Per £100 of this year’s premium", segs: [[lr, "c1", "Claims"], [35, "c2", "Expenses"]] }], { max: 125, marks: [[100, "Break-even"]] });
        },
        ctl: [{ k: "rate", label: "Rate change at renewal", min: -30, max: 30, step: 5, fmt: (x) => `${x > 0 ? "+" : ""}${x}%` }],
        live: (v) => (v.rate < -10 ? "Same risks, same claims, less premium. The claims ratio rises without a single extra loss. This is how a soft market quietly destroys a book, and why regulators and Lloyd’s expect pricing adequacy to be monitored." : v.rate > 10 ? "A hardening market: the same claims are spread over more premium, so the ratio improves by itself." : "Small movements, small effect. Compounded over three or four renewals they are not small.")
      },
      {
        h: "In five lines",
        say: "Last chapter: getting the business through the door.",
        scene: () => recap([
          "Expected cost = frequency × severity.",
          "Mean, median and mode differ on skewed data; look at the spread.",
          "Premium = claims ÷ (1 − expenses − return).",
          "Burning cost and triangles need adjusted, stable history.",
          "Rate change moves the claims ratio before any claim does."
        ])
      }
    ]
  });
})();
