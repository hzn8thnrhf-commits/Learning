/* LM1 · 1 — Risk and insurance */
(() => {
  const { bars, flow, stats, recap, money, pct, num } = window.SLIP.kit;
  const POOL = [10, 50, 200, 1000, 5000, 20000, 100000];
  const pool = (v) => {
    const n = POOL[v.n], p = 0.004, cost = 250000;
    const fair = p * cost;
    const sd = Math.sqrt(p * (1 - p) / n) * cost;
    return { n, fair, lo: Math.max(0, fair - 1.645 * sd), hi: fair + 1.645 * sd };
  };
  const tick = (items) => `<ul class="k-check">${items.map(([ok, t]) => `<li class="${ok ? "y" : "n"}">${t}</li>`).join("")}</ul>`;

  window.SLIP.chapters.push({
    id: "risk", part: "LM1",
    title: "Risk and insurance",
    blurb: "What risk is, which risks can be insured, and why a pool of strangers beats going it alone.",
    minutes: 8,
    init: { n: 2 },
    steps: [
      {
        h: "Four things you can do with a risk",
        say: "Risk is uncertainty about a loss. A business that has spotted one has four choices: **avoid** it, **reduce** it, **keep** it, or **transfer** it to someone else. Spotting, measuring and choosing is called **risk management**.\n\nInsurance is the fourth choice: transfer, in exchange for a premium.",
        scene: () => flow({
          h: 170,
          nodes: [
            { id: "r", x: 95, y: 4, label: "A risk", tone: "ink" },
            { id: "a", x: 4, y: 76, w: 78, label: "Avoid" }, { id: "m", x: 88, y: 76, w: 78, label: "Reduce" },
            { id: "k", x: 172, y: 76, w: 78, label: "Keep" }, { id: "t", x: 256, y: 76, w: 80, label: "Transfer", tone: "c1" },
            { id: "i", x: 216, y: 132, w: 120, label: "Insurance", tone: "c1" }
          ],
          edges: [["r", "a"], ["r", "m"], ["r", "k"], ["r", "t"], ["t", "i"]]
        }),
        ask: {
          q: "A haulier fits trackers and alarms to every lorry. Which choice is that?",
          opts: ["Avoid", "Reduce", "Transfer"],
          a: 1,
          why: "The lorries still run, so the risk isn’t avoided, and nobody else has taken it on. The haulier has made theft less likely and less costly. Most firms do this *and* insure what is left."
        }
      },
      {
        h: "The common pool",
        say: "A house costs £250,000 to rebuild. In any year, about 4 houses in 1,000 burn down. No owner knows if theirs is one of them.\n\nSo owners club together. Each pays a small, certain premium into a **pool**; the unlucky few are paid from it. Change the size of the pool.",
        scene: (v) => {
          const p = pool(v);
          return stats([["Members", p.n.toLocaleString("en-GB")], ["Fair premium", `£${num(p.fair, 0)}`], ["Bad year, each", `£${num(p.hi, 0)}`, p.hi > p.fair * 1.5 ? "bad" : "good"]]) +
            bars([{ label: "Likely claims cost per member", right: `£${num(p.lo, 0)} to £${num(p.hi, 0)}`, segs: [[p.lo, "none"], [Math.min(p.hi, 6000) - p.lo, p.hi > p.fair * 1.5 ? "bad" : "c1"]] }], { max: 6000, marks: [[p.fair, "Expected £1,000"]] });
        },
        ctl: [{ k: "n", label: "Houses in the pool", min: 0, max: POOL.length - 1, step: 1, fmt: (i) => POOL[i].toLocaleString("en-GB") }],
        live: (v) => {
          const p = pool(v);
          return p.n < 1000
            ? `With ${p.n} houses, one fire more or less changes everything. A bad year could cost each member **£${num(p.hi, 0)}**, far more than the £1,000 expected. A small pool is still a gamble.`
            : `With ${p.n.toLocaleString("en-GB")} houses, results settle close to the average: the **law of large numbers**. That is what lets an insurer charge each member a fair, predictable premium.`;
        }
      },
      {
        h: "Peril and hazard",
        say: "Two words underwriters never mix up.\n\nA **peril** is what causes the loss: fire, theft, storm.\n\nA **hazard** is anything that makes the peril more likely or its damage worse.",
        scene: () => flow({
          h: 130,
          nodes: [
            { id: "h", x: 4, y: 4, w: 150, label: "Hazard", sub: "Makes it likelier or worse", tone: "c2" },
            { id: "p", x: 186, y: 4, w: 150, label: "Peril", sub: "Causes the loss", tone: "bad" },
            { id: "l", x: 186, y: 84, w: 150, label: "Loss", tone: "ink" }
          ],
          edges: [["h", "p", "feeds"], ["p", "l"]]
        }),
        ask: {
          q: "A cottage has a thatched roof. Is the thatch a peril or a hazard?",
          opts: ["A peril", "A hazard"],
          a: 1,
          why: "Thatch doesn’t cause a loss by itself. Fire is the peril; thatch makes a fire more likely and far more destructive. Because it is a feature of the thing insured, it is a **physical hazard**."
        }
      },
      {
        h: "The hazard you can’t photograph",
        say: "Physical hazard is about the *thing*: thatch, no sprinklers, a factory next to a river.\n\n**Moral hazard** is about the *person*: their honesty, their care, their attitude to loss. A surveyor can measure the first. The second shows up in behaviour and history.",
        scene: () => bars([
          { label: "Shop A: alarm, tidy stock, no claims in ten years", segs: [[20, "c1", "Low"]] },
          { label: "Shop B: same building, three unexplained fires", segs: [[85, "bad", "High moral hazard"]] }
        ], { max: 100 }),
        ask: {
          q: "A shipowner cuts crew training to save money, reasoning that “the insurers will pay anyway”. What kind of hazard?",
          opts: ["Physical", "Moral"],
          a: 1,
          why: "The ship is unchanged; the attitude is the problem. Insurers respond to poor moral hazard with higher premiums, tighter terms, an excess the insured must bear, or by declining."
        }
      },
      {
        h: "Three ways to sort a risk",
        say: "**Pure or speculative.** Pure risks can only hurt you (a fire). Speculative risks might pay off (launching a product).\n\n**Particular or fundamental.** Particular risks strike individuals. Fundamental ones strike whole societies: war, famine.\n\n**Financial or non-financial.** Can the loss be measured in money?",
        scene: () => flow({
          h: 176,
          nodes: [
            { id: "a", x: 4, y: 4, w: 150, label: "Pure", sub: "Loss or no loss", tone: "c1" }, { id: "b", x: 186, y: 4, w: 150, label: "Speculative", sub: "Loss, or gain" },
            { id: "c", x: 4, y: 64, w: 150, label: "Particular", sub: "Hits individuals", tone: "c1" }, { id: "d", x: 186, y: 64, w: 150, label: "Fundamental", sub: "Hits everyone" },
            { id: "e", x: 4, y: 124, w: 150, label: "Financial", sub: "Measurable in money", tone: "c1" }, { id: "f", x: 186, y: 124, w: 150, label: "Non-financial", sub: "Sentiment, grief" }
          ]
        }),
        ask: {
          q: "A chef opens a second restaurant. It might lose money. Can she insure against that?",
          opts: ["Yes, any risk has its price.", "No. It is a speculative risk."],
          a: 1,
          why: "She took the risk hoping to profit, and whether it pays depends on her own decisions. Insurance covers **pure** risks. She can insure the restaurant against fire; she can’t insure it against being unpopular."
        }
      },
      {
        h: "The insurability test",
        say: "Put it together. The blue column in the last picture is the insurable side. A risk generally needs to pass all of these.",
        scene: () => tick([[1, "Financial: the loss can be valued"], [1, "Pure, not speculative"], [1, "Particular, not fundamental"], [1, "Fortuitous: accidental as far as the insured is concerned"], [1, "The insured has an insurable interest"], [1, "Not against public policy"], [0, "One-offs with no comparable risks are hard, though Lloyd’s is known for trying"]]),
        ask: {
          q: "A courier wants a policy to pay his speeding fines. Which test does it fail?",
          opts: ["It isn’t financial.", "It is against public policy.", "It is a fundamental risk."],
          a: 1,
          why: "A fine is meant to punish. Letting someone insure it away would defeat the law, so the courts won’t enforce such a contract."
        }
      },
      {
        h: "What insurance is for",
        say: "The **primary functions**: transfer risk, spread it through the pool, and give the insured certainty, a known premium in place of an unknown loss.\n\nThe **secondary functions** are what follows: firms needn’t hoard cash against disaster, so they can invest and expand; jobs survive a fire; and insurers’ funds are invested in the economy.\n\nSome cover is **compulsory**, such as motor and employers’ liability, so that injured people are always compensated.",
        scene: () => flow({
          h: 190,
          nodes: [
            { id: "p", x: 70, y: 4, w: 200, label: "Primary", sub: "Transfer · spread · certainty", tone: "ink" },
            { id: "a", x: 4, y: 84, w: 104, label: "Cash freed" }, { id: "b", x: 118, y: 84, w: 104, label: "Firms expand" }, { id: "c", x: 232, y: 84, w: 104, label: "Jobs protected" },
            { id: "d", x: 70, y: 146, w: 200, label: "Premiums invested", sub: "in the wider economy", tone: "c2" }
          ],
          edges: [["p", "a"], ["p", "b"], ["p", "c"], ["b", "d"]]
        }),
        ask: {
          q: "What does a client actually remember about its insurer?",
          opts: ["The premium.", "How the claim was handled."],
          a: 1,
          why: "A policy is a promise. The claim is the moment the promise is tested, which is why claims handling is treated as the heart of the product, not an afterthought."
        }
      },
      {
        h: "In five lines",
        say: "Next: what makes that promise a contract.",
        scene: () => recap([
          "Risk can be avoided, reduced, kept or transferred. Insurance transfers it.",
          "Many pay a little into a pool so the few can be paid a lot; large numbers make the cost predictable.",
          "A peril causes loss. A hazard, physical or moral, makes it likelier or worse.",
          "Insurable risks are financial, pure, particular, fortuitous and lawful.",
          "Primary functions: transfer, spreading, certainty. Everything else follows from those."
        ])
      }
    ]
  });
})();
