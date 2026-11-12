/* LM3 · 6 — Statistics for underwriters */
(() => {
  const { bars, cols, flow, stats, recap, plot, money, pct, num } = window.SLIP.kit;
  const BASE = [20, 30, 30, 40, 50, 60];
  const BOOKS = [[58, 62, 60, 57, 63, 61, 59, 60, 62, 58], [35, 48, 110, 40, 52, 38, 95, 45, 42, 95]];
  const sd = (a) => { const m = a.reduce((x, y) => x + y, 0) / a.length; return Math.sqrt(a.reduce((x, y) => x + (y - m) * (y - m), 0) / a.length); };

  window.SLIP.chapters.push({
    id: "statistics", part: "LM3",
    title: "Statistics for underwriters",
    blurb: "Frequency and severity, why averages mislead, what a clean record really proves, and how data lies when it changes.",
    minutes: 9,
    init: { freq: 4, sev: 50, big: 100, book: 0, near: 0, yrs: 5 },
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
        live: (v) => (v.freq >= 6 && v.sev <= 40 ? "**High frequency, low severity:** motor, small property. Many small claims, statistically predictable. The past is a good guide." : v.freq <= 2 && v.sev >= 100 ? "**Low frequency, high severity:** catastrophe, aviation, energy. Few data points, huge swings. The past tells you little, so models and judgement take over." : "The same expected cost can come from many small claims or a few large ones. They are very different risks to hold."),
        goal: {
          say: "The fleet’s expected cost is £2m. Find another way to reach exactly £2m, with twice as many claims.",
          test: (v) => v.freq === 8 && v.sev === 25,
          done: "Eighty claims of £25k, where before there were forty of £50k. The expected cost is identical, but the second fleet’s result will sit closer to £2m year after year: more, smaller claims are more predictable."
        }
      },
      {
        h: "Three averages",
        say: "“The average claim” has three meanings. The **mean**: total divided by the number of claims. The **median**: the middle claim when ranked. The **mode**: the most common value.\n\nSeven claims. Six are ordinary. Change the seventh.",
        scene: (v) => {
          const all = [...BASE, v.big], s = all.slice().sort((x, y) => x - y), mean = all.reduce((a, b) => a + b, 0) / 7, med = s[3];
          return stats([["Mean", `£${num(mean, 0)}k`, mean > med * 1.5 ? "bad" : ""], ["Median", `£${med}k`, "c1"], ["Mode", "£30k"]]) +
            cols({ h: 170, max: Math.max(120, v.big), bars: all.map((x, i) => ({ label: `${i + 1}`, hot: i === 6, segs: [[x, i === 6 ? "bad" : "c1"]] })), lines: [{ v: mean, label: "Mean" }] });
        },
        ctl: [{ k: "big", label: "The seventh claim", min: 60, max: 900, step: 20, fmt: (x) => `£${x}k` }],
        live: (v) => (v.big > 300 ? "One large claim has dragged the **mean** far above what a typical claim looks like, while the **median** hasn’t moved. Insurance losses are skewed like this. Always ask which average you are being shown." : "With no outlier, the three averages sit close together and any of them describes the book."),
        goal: {
          say: "Find the smallest seventh claim that pulls the mean above twice the median.",
          test: (v) => v.big === 340,
          done: "£340k. One claim in seven has made the “average” twice as large as a typical claim. Quote the mean and you alarm the client; quote the median and you understate the cost. The honest answer shows both, and the big one separately."
        }
      },
      {
        h: "The same average, a different risk",
        say: "An average says nothing about **spread**: how far individual results stray from it. The usual measure is the **standard deviation**.\n\nTwo books, ten years each. Both average a 60% claims ratio.",
        scene: (v) => {
          const a = BOOKS[v.book], worst = Math.max(...a);
          return stats([["Average", "60%"], ["Standard deviation", `${num(sd(a), 0)} points`, v.book ? "bad" : "good"], ["Worst year", pct(worst), worst > 65 ? "bad" : ""]]) +
            cols({ h: 170, max: 120, bars: a.map((x, i) => ({ label: `${i + 1}`, segs: [[x, x > 65 ? "bad" : "c1"]] })), lines: [{ v: 65, label: "Break-even", right: true }] });
        },
        ctl: [{ k: "book", label: "Book", opts: ["Steady", "Volatile"] }],
        live: (v) => (v.book ? "Three losing years in ten, each severe. The same 60% average needs far more capital behind it, so it must earn a wider margin to be worth writing. Averages price the expected loss; spread prices the capital." : "Every year lands within a few points of 60%. Little capital is needed to survive the worst of them.")
      },
      {
        h: "Probability, and independence",
        say: "Probability runs from 0 (impossible) to 1 (certain). For two events that have nothing to do with each other, the chance of **both** is the two chances multiplied.\n\nTwo warehouses each have a 1% chance of a serious fire this year.",
        scene: (v) => {
          const both = v.near ? 0.8 : 0.01;
          return stats([["One burns", "1%"], ["Both burn", pct(both, 2), v.near ? "bad" : "good"]]) +
            flow({
              h: 110,
              nodes: v.near ? [{ id: "a", x: 60, y: 30, w: 104, label: "Warehouse A", tone: "bad" }, { id: "b", x: 176, y: 30, w: 104, label: "Warehouse B", tone: "bad" }]
                : [{ id: "a", x: 4, y: 30, w: 104, label: "Warehouse A" }, { id: "b", x: 232, y: 30, w: 104, label: "Warehouse B" }],
              edges: v.near ? [["a", "b"]] : []
            });
        },
        ctl: [{ k: "near", label: "The warehouses are", opts: ["In different towns", "Next door"] }],
        live: (v) => (v.near ? "Next door, a fire in one will probably take the other. The events are **dependent**, and the chance of losing both is close to the chance of losing one. Multiplying the probabilities would understate it eighty times over." : "1% × 1% = **0.01%**: one year in ten thousand. This is why spreading risk works. But the multiplication is only valid if the events are truly **independent**.")
      },
      {
        h: "Chance has no memory",
        say: "A **return period** is a probability in disguise: 1-in-100 means 1% each year. It is not a timetable.",
        scene: () => bars([
          { label: "Chance of the flood last year", right: "1%", segs: [[1, "c1"]] },
          { label: "It happened", right: "", segs: [[100, "bad", "The 1-in-100 flood"]] },
          { label: "Chance of the flood this year", right: "?", segs: [[0.5, "idle"]] }
        ], { max: 100 }),
        ask: {
          q: "A town had its “1-in-100-year” flood last year. What is the chance of another this year?",
          opts: [
          ["Almost nil. It isn’t due for 99 years.", "A return period is a probability, not a timetable."],
          "Still about 1%.",
          ["Much higher: these things come in runs.", "The river has no memory. Though a recent event is a fair reason to ask whether 1% was ever right."],
          ["Exactly 0.01%: 1% × 1%.", "That is the chance of floods in two *specified* years, judged in advance. Last year has already happened."]
        ],
          a: 1,
          why: "Each year is an independent draw at 1%. The useful doubt is a different one: a town that has just flooded may have been mis-rated, and the true figure may be nearer 1 in 30."
        }
      },
      {
        h: "What a clean record proves",
        say: "A broker presents a risk with **no large losses** in its history. How much comfort is that?\n\nSuppose the true chance of a large loss is 1 in 20 each year. See how often such a risk shows a spotless record anyway.",
        scene: (v) => {
          const clean = Math.pow(0.95, v.yrs) * 100;
          const pts = Array.from({ length: 21 }, (_, i) => [i, Math.pow(0.95, i) * 100]);
          return stats([["Years of history", `${v.yrs}`], ["Chance it looks clean", pct(clean), clean > 50 ? "bad" : ""]]) +
            plot({ h: 160, x: { min: 0, max: 20, ticks: [0, 5, 10, 15, 20], title: "Years of loss-free history" }, y: { min: 0, max: 100, ticks: [0, 50, 100], fmt: (x) => `${x}%` },
              series: [{ tone: "c1", pts }], dots: [{ x: v.yrs, y: clean, tone: "bad" }] });
        },
        ctl: [{ k: "yrs", label: "Loss-free years presented", min: 1, max: 20, step: 1, fmt: (x) => `${x}` }],
        live: (v) => {
          const clean = Math.pow(0.95, v.yrs) * 100;
          return `A risk with a real 1-in-20 chance of a large loss still has a **${pct(clean)}** chance of showing ${v.yrs} clean year${v.yrs > 1 ? "s" : ""}. For rare, severe losses, a short clean record is weak evidence. This is why experience is given little weight on small or low-frequency risks: statisticians call the weight **credibility**.`;
        },
        goal: {
          say: "Find how many clean years it takes before a risk like this has less than an even chance of still looking clean.",
          test: (v) => v.yrs === 14,
          done: "Fourteen years. A five-year loss record, the usual submission, would look spotless more than three times in four. For rare losses, the absence of claims in a short history is close to no evidence at all."
        }
      },
      {
        h: "When the data changes under you",
        say: "Statistics describe the data that was collected. If what is being counted changes, the numbers move even when the risk doesn’t.",
        scene: () => bars([
          { label: "Last year: £5,000 excess", right: "40 claims, average £30k", segs: [[40, "c1", "Large claims only"]] },
          { label: "This year: no excess", right: "140 claims, average £10k", segs: [[40, "c1", "Large"], [100, "c2", "Small claims now reported"]] }
        ], { max: 150 }),
        ask: {
          q: "A fleet’s average claim fell from £30k to £10k after its excess was removed. What has happened?",
          opts: [
          ["It has become safer: severity fell by two thirds.", "The same accidents are happening. More of them are now being counted."],
          "Small claims that were always happening are now being reported.",
          ["Its drivers are more careful without an excess.", "If anything, removing an excess removes a reason to be careful."],
          ["The insurer’s costs have fallen.", "Total cost has gone **up**: 140 claims at £10k is £1.4m against £1.2m before."]
        ],
          a: 1,
          why: "Before, small accidents stayed under the excess and never appeared in the data. The average fell because the mix changed. Always ask what changed in the data before believing a trend."
        }
      },
      {
        h: "In five lines",
        say: "Next: turning these numbers into a price.",
        scene: () => recap([
          "Expected cost = frequency × severity.",
          "Mean, median and mode differ on skewed data.",
          "Spread, not the average, decides how much capital a book needs.",
          "Probabilities multiply only when events are independent.",
          "A short clean record proves little about rare losses; check what the data really counts."
        ])
      }
    ]
  });
})();
