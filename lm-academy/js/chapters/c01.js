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
          q: "A haulier fits trackers and alarms to every lorry, and keeps its insurance. What has it done with the theft risk?",
          opts: [
          ["Avoided it.", "Avoiding means not running the risk at all: selling the lorries. They are still on the road."],
          "Reduced it, then transferred what is left.",
          ["Transferred it twice.", "A tracker company doesn’t take on the loss. Only the insurer does."],
          ["Kept it.", "Keeping means paying for thefts itself. It has an insurer for that."]
        ],
          a: 1,
          why: "The four choices aren’t exclusive. Most firms **reduce** what they can and **transfer** the rest, and insurers reward the first with a better price on the second."
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
        },
        goal: {
          say: "Find the smallest pool in which a bad year costs each member less than £1,500.",
          test: (v) => POOL[v.n] === 5000,
          done: "5,000 houses. Below that, a bad year can cost half as much again as the £1,000 expected, and at 50 houses over four times as much. A pool only becomes insurance when it is big enough to be boring."
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
          q: "A cottage has a thatched roof. In underwriting terms, the thatch is…",
          opts: [
          ["A peril.", "A peril is the event that does the damage. Thatch doesn’t cause a loss; fire does."],
          "A physical hazard.",
          ["A moral hazard.", "Moral hazard is about the owner’s behaviour. Thatch is a feature of the building."],
          ["Neither: it is simply part of the property insured.", "It is part of the property, but one that changes the risk, which is exactly what a hazard is."]
        ],
          a: 1,
          why: "Fire is the peril. Thatch makes a fire more likely and far more destructive, and because it is a feature of the thing insured it is a **physical** hazard."
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
          q: "A shipowner cuts crew training to save money, reasoning that “the insurers will pay anyway”. Which response deals with the problem most directly?",
          opts: [
          ["Send a surveyor to inspect the hull.", "The ship is unchanged. A survey measures physical hazard; this is an attitude."],
          "Make the owner bear a large excess on every claim.",
          ["Reduce the sum insured.", "That cuts the insurer’s maximum loss but leaves the owner just as careless."],
          ["Nothing: training is the owner’s business.", "Poorly trained crews cause casualties. It is very much the insurer’s business."]
        ],
          a: 1,
          why: "This is **moral hazard**: the insurance itself has made the owner careless. An excess puts some of his own money back at risk in every loss, which is the surest way to restore his interest in avoiding one."
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
          q: "A chef opens a second restaurant. Which of her risks can she insure?",
          opts: [
          ["That it never becomes popular.", "A speculative risk: she took it hoping to profit, and it depends on her own decisions."],
          "That a kitchen fire closes it for three months.",
          ["That a recession hits every restaurant in the country.", "A fundamental risk, striking a whole society at once. There is nobody left in the pool to pay."],
          ["That she comes to regret opening it.", "Regret can’t be measured in money: a non-financial risk."]
        ],
          a: 1,
          why: "A fire is **pure** (loss or no loss), **particular** (her restaurant, not everyone’s) and **financial** (repairs and lost income can be valued). The other three each fail one test."
        }
      },
      {
        h: "The insurability test",
        say: "Put it together. The blue column in the last picture is the insurable side. A risk generally needs to pass all of these.",
        scene: () => tick([[1, "Financial: the loss can be valued"], [1, "Pure, not speculative"], [1, "Particular, not fundamental"], [1, "Fortuitous: accidental as far as the insured is concerned"], [1, "The insured has an insurable interest"], [1, "Not against public policy"], [0, "One-offs with no comparable risks are hard, though Lloyd’s is known for trying"]]),
        ask: {
          q: "A courier wants a policy to pay his speeding fines. Which test does it fail?",
          opts: [
          ["It isn’t financial.", "A fine is an exact sum of money. It couldn’t be more financial."],
          "It is against public policy.",
          ["It is a fundamental risk.", "It strikes one driver, not society. It is a particular risk."],
          ["He has no insurable interest.", "He would certainly lose money, so the interest is there. The objection lies elsewhere."]
        ],
          a: 1,
          why: "A fine is meant to punish. Letting someone insure it away would defeat the law, so the courts won’t enforce such a contract. It isn’t fortuitous either: he chooses how fast to drive."
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
          q: "Which of these is a **secondary** function of insurance?",
          opts: [
          ["Swapping an uncertain loss for a known premium.", "That is certainty: one of the three primary functions."],
          ["Spreading the losses of the few across the many.", "That is the pool itself: a primary function."],
          "Letting a firm invest cash it would otherwise hold back against disaster.",
          ["Moving a risk from the insured to the insurer.", "That is risk transfer: the first primary function."]
        ],
          a: 2,
          why: "Primary functions are what insurance *does*: transfer, spread, give certainty. Secondary functions are what follows from that: freed capital, enterprise, protected jobs, and premiums invested in the economy."
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
