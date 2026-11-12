/* LM3 · 4 — Capital */
(() => {
  const { bars, flow, stats, recap, plot, money, pct, num } = window.SLIP.kit;
  const RP = [10, 25, 50, 100, 200, 500];
  const CONF = [[90, 1.2816, "1 in 10"], [95, 1.6449, "1 in 20"], [99, 2.3263, "1 in 100"], [99.5, 2.5758, "1 in 200"]];
  const VOL = [0.15, 0.25, 0.4];
  const q = (s, z) => Math.exp(Math.log(100) - (s * s) / 2 + s * z);
  const pdf = (s, x) => Math.exp(-Math.pow(Math.log(x) - (Math.log(100) - (s * s) / 2), 2) / (2 * s * s)) / (x * s * Math.sqrt(2 * Math.PI));
  const KIND = [
    ["Motor", 30, "Claims are numerous, small and predictable, so little capital is required for each £1 of premium and a narrow margin is sufficient."],
    ["Commercial property", 60, "Results are steady in most years, with an occasional large fire or storm. The capital required is moderate."],
    ["Catastrophe reinsurance", 120, "Years of little loss are followed by one costing several times the premium. The capital required can exceed the premium itself, so only a wide margin justifies writing it."]
  ];
  const MEAS = [
    ["Regulatory capital", "The amount the supervisor requires. In the UK it is the **Solvency Capital Requirement**, calibrated so that the firm can withstand the losses of a 1-in-200 year, with a lower **Minimum Capital Requirement** beneath it."],
    ["Economic capital", "The firm’s own estimate of what it needs to pursue its plan within its appetite. It may use a different horizon or confidence level from the regulator’s, and it is the figure the board should manage to."],
    ["Rating agency capital", "The amount an agency’s model requires for the rating the firm wishes to hold. Since brokers set minimum ratings, this is often the constraint that binds in practice."]
  ];

  window.SLIP.chapters.push({
    id: "capital", part: "LM3",
    title: "Capital",
    blurb: "What capital is for, how much is required and by whom, what it costs, and how it is set at Lloyd’s.",
    minutes: 14,
    lead: "Premiums are priced to meet the claims an insurer expects. Capital exists for the claims it does not expect.",
    aims: [
      "Explain what capital is for, and why the amount required depends on volatility more than on expected loss.",
      "Interpret a 1-in-200 standard and distinguish regulatory, economic and rating agency capital.",
      "Explain diversification, and calculate a return on capital for classes with different capital needs.",
      "Describe how capital is set for a Lloyd’s syndicate, and the purpose of stress testing and the ORSA."
    ],
    init: { conf: 1, vol: 1, rp: 4, yrs: 30, meas: 0, own: 150, rho: 20, cr: 92, kind: 1, lev: 1 },
    steps: [
      {
        h: "What capital is for",
        say: "An insurer’s premiums and reserves are intended to meet its **expected** claims. **Capital** is the further sum, belonging to its owners, that absorbs the excess when claims are worse than expected.\n\nHow much is needed depends on two choices: how confident the firm wishes to be of surviving the year, and how variable its results are. This book expects claims of £100m. The curve shows how likely each outcome is.",
        scene: (v) => {
          const s = VOL[v.vol], z = CONF[v.conf][1], lossAt = q(s, z), cap = lossAt - 100;
          const pts = Array.from({ length: 61 }, (_, i) => { const x = 40 + i * 4.5; return [x, pdf(s, x) * 1000]; });
          const ymax = Math.ceil(pdf(s, 100 * Math.exp(-1.5 * s * s)) * 1000 / 5) * 5 + 5;
          return stats([["Expected claims", "£100m"], [`Claims at ${CONF[v.conf][2]}`, money(lossAt)], ["Capital needed", money(cap), cap > 100 ? "bad" : "c1"]]) +
            plot({ h: 160, x: { min: 40, max: 310, ticks: [50, 100, 150, 200, 250, 300], title: "Claims for the year, £m" }, y: { min: 0, max: ymax, ticks: [] },
              series: [{ tone: "c1", pts }], refs: [{ x: 100, label: "Expected", left: true }, { x: Math.min(lossAt, 308), label: CONF[v.conf][2], left: lossAt > 220 }] });
        },
        ctl: [{ k: "conf", label: "Standard of survival", opts: ["90%", "95%", "99%", "99.5%"] }, { k: "vol", label: "How variable the book is", opts: ["Steady", "Moderate", "Volatile"] }],
        goal: {
          say: "Find the combination at which this book needs more capital than it expects to pay in claims.",
          test: (v) => v.conf === 3 && v.vol === 2,
          done: "A volatile book held to the 1-in-200 standard needs about £159m of capital for £100m of expected claims. The expected loss has not changed at any point; only the spread and the standard have. Capital is a charge on uncertainty, and that is why two books with the same average result can require very different amounts of it."
        },
        live: (v) => `To survive all but the worst year in ${CONF[v.conf][2].slice(5)}, the firm must be able to pay ${money(q(VOL[v.vol], CONF[v.conf][1]))}. Premiums provide the first £100m; capital must supply the remaining **${money(q(VOL[v.vol], CONF[v.conf][1]) - 100)}**.`
      },
      {
        h: "Reading a return period",
        say: "The standard is usually expressed as a **return period**. A 1-in-200-year loss is one with a probability of 0.5% in any single year. It is a statement about probability and implies nothing about timing: such a loss may occur in consecutive years, or not for centuries.\n\nThe phrase encourages complacency, because the probability accumulates over any period of interest.",
        scene: (v) => {
          const T = RP[v.rp], p = 1 - Math.pow(1 - 1 / T, v.yrs);
          const pts = Array.from({ length: 41 }, (_, i) => [i, (1 - Math.pow(1 - 1 / T, i)) * 100]);
          return stats([["Probability in one year", pct(100 / T, T > 100 ? 1 : 0)], [`Probability within ${v.yrs} years`, pct(p * 100), p > 0.25 ? "bad" : ""]]) +
            plot({ h: 170, x: { min: 0, max: 40, ticks: [0, 10, 20, 30, 40], title: "Years" }, y: { min: 0, max: 100, ticks: [0, 50, 100], fmt: (x) => `${x}%` },
              series: [{ tone: "c1", pts }], dots: [{ x: v.yrs, y: p * 100, tone: "bad" }], refs: [{ x: v.yrs, label: `${v.yrs} years`, left: v.yrs > 28 }] });
        },
        ctl: [{ k: "rp", label: "Event", min: 0, max: RP.length - 1, step: 1, fmt: (i) => `1 in ${RP[i]} years` }, { k: "yrs", label: "Period of interest", min: 1, max: 40, step: 1, fmt: (x) => `${x} years` }],
        goal: {
          say: "Assume a career of thirty years. Find the rarest event that is nonetheless more likely than not to occur during it.",
          test: (v) => RP[v.rp] === 25 && v.yrs === 30,
          done: "The 1-in-25-year event: a probability of 71% over thirty years. Even the 1-in-50 is close to even odds. Events described as rare are an ordinary feature of a working lifetime, and of the lifetime of any firm."
        },
        live: (v) => {
          const T = RP[v.rp], p = (1 - Math.pow(1 - 1 / T, v.yrs)) * 100;
          return `A 1-in-${T} event has a probability of **${pct(p)}** of occurring at least once in ${v.yrs} years, on the assumption that each year is independent of the last.`;
        }
      },
      {
        h: "Three measures of capital",
        say: "“How much capital does this firm need?” has at least three answers, each given by a different party for a different purpose. A firm must satisfy all of them at once, and it is governed in practice by whichever is the most demanding.",
        scene: (v) => `<ol class="k-recap">${MEAS.map((m, i) => `<li${i === v.meas ? ' style="font-weight:600"' : ' style="opacity:.55"'}>${m[0]}</li>`).join("")}</ol>`,
        ctl: [{ k: "meas", label: "Measure", opts: ["Regulatory", "Economic", "Rating agency"] }],
        live: (v) => `**${MEAS[v.meas][0]}.** ${MEAS[v.meas][1]}`,
        ask: {
          q: "An insurer holds 140% of its regulatory requirement. To keep the A rating its brokers insist upon, the agency’s model requires more than it holds. Which constraint binds?",
          opts: [
            ["The regulatory requirement: it has the force of law.", "It has, and the firm satisfies it comfortably. It is not what restricts the firm today."],
            "The rating agency’s requirement.",
            ["Neither: the firm is compliant.", "It is compliant and about to lose its rating, and with it much of its business."]
          ],
          a: 1,
          why: "The binding constraint is the one that is tightest. For insurers that depend on brokers’ security committees, that is frequently the rating, and capital planning that looks only at the regulatory ratio will miss it."
        }
      },
      {
        h: "The supervisory ladder",
        say: "The UK regime, derived from Solvency II, sets two thresholds. Capital below the **Solvency Capital Requirement** (SCR) prompts supervisory intervention: the firm must submit a plan to restore its position within a fixed period. Capital below the **Minimum Capital Requirement** (MCR) exposes it to the loss of its authorisation.\n\nIntervention is therefore graduated. The purpose is that a firm in difficulty is dealt with while it can still pay its policyholders. Here the MCR is 35% of the SCR.",
        scene: (v) => {
          const st = v.own < 35 ? 2 : v.own < 100 ? 1 : 0;
          return stats([["Capital held", `${v.own}% of SCR`, st === 2 ? "bad" : st === 1 ? "c2" : "good"], ["Position", ["Compliant", "Recovery plan", "Authorisation at risk"][st], st === 2 ? "bad" : st === 1 ? "c2" : "good"]]) +
            bars([{ label: "Eligible capital as a share of the SCR", right: pct(v.own), segs: [[Math.min(v.own, 35), st === 2 ? "bad" : "c1"], [Math.min(Math.max(v.own - 35, 0), 65), st === 1 ? "c2" : "c1"], [Math.max(v.own - 100, 0), "c3", "Surplus"]] }], { max: 200, marks: [[35, "MCR"], [100, "SCR"]] });
        },
        ctl: [{ k: "own", label: "Capital held", min: 20, max: 200, step: 5, fmt: (x) => `${x}% of SCR` }],
        goal: {
          say: "Find the highest level of capital at which the firm’s authorisation is at risk.",
          test: (v) => v.own === 30,
          done: "Just under the MCR. Between there and the SCR the firm is under supervision but still trading; above the SCR it is free of intervention. Most boards set their own target well above 100%, so that an ordinary bad year does not bring the supervisor to the door."
        },
        live: (v) => (v.own < 35 ? "Below the MCR. Unless the position is restored within a short period, the supervisor may withdraw authorisation and the firm will cease to write business." : v.own < 100 ? "Below the SCR. The firm must inform the supervisor and submit a realistic plan to restore compliance, normally within six months." : "At or above the SCR. The firm meets the regulatory standard; the surplus is the buffer it has chosen to hold.")
      },
      {
        h: "Standard formula or internal model",
        say: "The SCR may be calculated in two ways. The **standard formula** is prescribed by the regulator and applies the same factors to every firm. An **internal model** is built by the firm to reflect its own risks, and may be used only with the supervisor’s approval.\n\nApproval is demanding. The firm must show that the model is statistically sound, properly governed and, above all, actually used in running the business: the **use test**.",
        scene: () => flow({
          h: 150,
          nodes: [
            { id: "s", x: 4, y: 4, w: 150, label: "Standard formula", sub: "One calibration for all" },
            { id: "i", x: 186, y: 4, w: 150, label: "Internal model", sub: "The firm’s own risks", tone: "c1" },
            { id: "c", x: 95, y: 100, label: "The SCR", tone: "ink" }
          ],
          edges: [["s", "c"], ["i", "c", "if approved"]]
        }),
        ask: {
          q: "A specialist catastrophe reinsurer finds that the standard formula describes its risks poorly. What is open to it?",
          opts: [
            ["To adjust the standard formula’s factors to fit.", "The factors are prescribed. A firm cannot edit them."],
            "To apply for approval of an internal model.",
            ["To use its own model for the SCR at once.", "An unapproved model has no regulatory standing, however good it is."],
            ["Nothing: the standard formula is compulsory.", "It is the default, with a prescribed alternative."]
          ],
          a: 1,
          why: "The standard formula is calibrated to an average firm. A specialist, or a large and complex group, may be badly described by it, in either direction. Every Lloyd’s syndicate’s capital is set using an internal model, reviewed by Lloyd’s."
        }
      },
      {
        h: "Diversification",
        say: "The capital a firm needs is less than the sum of the capital its classes would need separately, because their worst years seldom coincide. The saving is the **diversification benefit**, and its size depends on the **correlation** between the classes.\n\nConsidered alone, property requires £80m and casualty £60m.",
        scene: (v) => {
          const r = v.rho / 100, tot = Math.sqrt(80 * 80 + 60 * 60 + 2 * r * 80 * 60), ben = 140 - tot;
          return stats([["Standalone", "£140m"], ["Together", money(tot), "c1"], ["Benefit", money(ben), ben < 10 ? "bad" : "good"]]) +
            bars([
              { label: "Each class alone", right: "£140m", segs: [[80, "c1", "Property"], [60, "c2", "Casualty"]] },
              { label: "Combined", right: money(tot), segs: [[tot, "c3", "Capital needed"], [ben, "idle", "Saved"]] }
            ], { max: 140 });
        },
        ctl: [{ k: "rho", label: "Correlation between the classes", min: 0, max: 100, step: 10, fmt: (x) => (x === 0 ? "independent" : x === 100 ? "perfect" : `${x}%`) }],
        goal: {
          say: "Find the correlation at which combining the classes saves less than £10m of capital.",
          test: (v) => v.rho === 80,
          done: "At a correlation of about 80% the benefit has almost disappeared. That is where correlations tend to move in a crisis, when one event damages property, generates liability claims and depresses investment values together. The benefit is available in ordinary years and largely absent in the year for which capital is held."
        },
        live: (v) => (v.rho >= 70 ? "The classes move closely together, and little is saved by combining them." : v.rho <= 20 ? "The classes are nearly independent, and a large part of the standalone capital is saved. This is the financial case for a mixed book, and the reason a plan’s capital requirement changes when its mix does." : "A partial benefit. The correlation assumed is among the most consequential, and least observable, inputs to any capital model.")
      },
      {
        h: "Allocating capital to classes",
        say: "To judge a class, a firm must decide how much of its capital that class uses. This is a matter of method, since the diversification benefit belongs to the portfolio and not to any class within it.\n\nA common approach allocates the diversified total in proportion to each class’s standalone requirement.",
        scene: (v) => bars([
          { label: "Standalone requirements", right: "£140m", segs: [[80, "c1", "Property £80m"], [60, "c2", "Casualty £60m"]] },
          { label: "Diversified total to be allocated", right: "£109m", segs: v.$done ? [[62.3, "c1", "£62m"], [46.7, "c2", "£47m"]] : [[109, "c3", "£109m"]] }
        ], { max: 140 }),
        ask: {
          q: "Standalone, property requires £80m and casualty £60m. Together the firm requires £109m. On a proportional allocation, how much capital is attributed to property?",
          fix: true,
          opts: [
            ["£80m", "That is its standalone figure. It gives property none of the benefit of sitting in a mixed book."],
            "About £62m",
            ["£54.5m", "That divides the total equally, ignoring the fact that property is the riskier class."],
            ["£49m", "That gives the whole £31m benefit to property and none to casualty."]
          ],
          a: 1,
          why: "80 ÷ 140 × £109m ≈ £62m. The method matters because it determines each class’s measured return. A class can appear to clear the hurdle on one allocation basis and to miss it on another, so the basis should be settled before the results are known."
        }
      },
      {
        h: "The cost of capital",
        say: "Investors require a return on the capital they provide: the **hurdle rate**, taken here as 10%. Since classes differ greatly in the capital they need for a given premium, the same combined ratio may be excellent in one class and inadequate in another.\n\nConsider £100m of premium. Profit includes £3m of investment income.",
        scene: (v) => {
          const cap = KIND[v.kind][1], profit = 100 - v.cr + 3, roc = (profit / cap) * 100;
          return stats([["Profit", money(profit), profit < 0 ? "bad" : ""], ["Capital allocated", money(cap)], ["Return on capital", pct(roc, 1), roc < 10 ? "bad" : "good"]]) +
            bars([{ label: "Return on capital", right: pct(roc, 1), segs: [[Math.max(roc, 0), roc < 10 ? "bad" : "c1"]] }], { max: 40, marks: [[10, "Hurdle 10%"]] });
        },
        ctl: [{ k: "kind", label: "Class", opts: ["Motor", "Property", "Catastrophe"] }, { k: "cr", label: "Combined ratio", min: 80, max: 104, step: 1, fmt: pct }],
        goal: {
          say: "Find the highest combined ratio at which catastrophe business still meets the 10% hurdle.",
          test: (v) => v.kind === 2 && v.cr === 91,
          done: "91%. At the same 91%, motor returns 40%. A combined ratio is therefore not comparable between classes until it is related to the capital each requires, and a firm that ranks its classes by combined ratio alone will systematically favour those that consume the most capital."
        },
        live: (v) => `**${KIND[v.kind][0]}.** ${KIND[v.kind][2]}`
      },
      {
        h: "Leverage",
        say: "The ratio of premium written to capital held is a firm’s underwriting **leverage**. Writing more premium on the same capital raises the return in a good year and the loss in a bad one, in equal proportion.\n\nSuppose a good year yields an underwriting margin of 6% of premium, and a bad year a loss of 10%.",
        scene: (v) => {
          const good = 6 * v.lev, badY = 10 * v.lev;
          return stats([["Premium per £1 of capital", `£${num(v.lev, 2)}`], ["Good year", `+${pct(good, 1)}`, "good"], ["Bad year", `−${pct(badY, 1)}`, badY >= 25 ? "bad" : ""]]) +
            bars([
              { label: "Return on capital in a good year", right: `+${pct(good, 1)}`, segs: [[good, "c1"]] },
              { label: "Capital lost in a bad year", right: `−${pct(badY, 1)}`, segs: [[badY, "bad"]] }
            ], { max: 30 });
        },
        ctl: [{ k: "lev", label: "Premium written per £1 of capital", min: 0.5, max: 3, step: 0.25, fmt: (x) => `£${num(x, 2)}` }],
        goal: {
          say: "Find the leverage at which a single bad year consumes a quarter of the firm’s capital.",
          test: (v) => v.lev === 2.5,
          done: "£2.50 of premium for each £1 of capital. The same leverage produces a 15% return in a good year, which is why it is attractive and why supervisors and rating agencies watch it. Rapid premium growth on unchanged capital is leverage rising, whether or not anyone decided that it should."
        },
        live: (v) => (v.lev <= 1 ? "Low leverage. The capital is safe and under-employed: the good year barely meets a 10% hurdle, if at all." : v.lev >= 2.5 ? "High leverage. Returns in good years are substantial, and one bad year removes a quarter or more of the capital." : "Moderate leverage. Much of capital management consists of choosing a position on this scale deliberately.")
      },
      {
        h: "Capital at Lloyd’s",
        say: "Each syndicate calculates an SCR on an **ultimate** basis, covering the run-off of its liabilities to extinction and not merely the next twelve months, using an internal model that Lloyd’s reviews. Lloyd’s then applies an uplift, currently 35%, to arrive at the **Economic Capital Assessment**. The purpose of the uplift is to support the market’s rating and to protect the Central Fund.\n\nMembers lodge that capital as **Funds at Lloyd’s**, and the figure is re-examined at least annually in the process known as *coming into line*.",
        scene: (v) => bars([
          { label: "Ultimate SCR", right: "£200m", segs: [[200, "c1", "From the syndicate’s model"]] },
          { label: "Economic Capital Assessment", right: v.$done ? "£270m" : "?", segs: v.$done ? [[200, "c1", "uSCR"], [70, "c2", "35% uplift"]] : [[200, "c1", "uSCR"], [2, "idle"]] }
        ], { max: 280 }),
        ask: {
          q: "A syndicate’s ultimate SCR is £200m. How much capital must its members provide?",
          fix: true,
          opts: [
            ["£200m", "That is the regulatory figure. Lloyd’s requires more."],
            ["£235m", "The uplift is 35% of the SCR, not £35m."],
            "£270m"
          ],
          a: 2,
          why: "£200m × 1.35 = £270m. A member’s capital is held for that member’s own liabilities only, which is why the Central Fund stands behind it, and why Lloyd’s takes so close an interest in the model that produces the SCR."
        }
      },
      {
        h: "Stress testing and the ORSA",
        say: "A capital model summarises many scenarios in one figure. Boards are expected to examine particular scenarios as well. A **stress test** applies a defined event and measures the effect on capital. A **reverse stress test** begins from the failure of the business model and asks what would have to happen to cause it.\n\nThese feed the **Own Risk and Solvency Assessment** (ORSA): the board’s own forward-looking assessment of its risks and of the capital its plan requires. It originated in Solvency II and is retained in the UK regime.",
        scene: () => flow({
          h: 170,
          nodes: [
            { id: "s", x: 4, y: 4, w: 150, label: "Stress test", sub: "Event, then consequence" },
            { id: "r", x: 186, y: 4, w: 150, label: "Reverse stress test", sub: "Failure, then cause", tone: "c2" },
            { id: "o", x: 95, y: 110, label: "The ORSA", sub: "The board’s own assessment", tone: "c1" }
          ],
          edges: [["s", "o"], ["r", "o"]]
        }),
        ask: {
          q: "Which of these questions is a reverse stress test?",
          opts: [
            ["What would a major Florida hurricane cost us?", "This starts from an event and measures the result: an ordinary stress test."],
            "What combination of events would make our business unviable?",
            ["What is our 1-in-200 loss?", "This is the output of the capital model, a point on a distribution."],
            ["How much capital will the plan need in three years?", "A projection, and part of the ORSA, but not a test of failure."]
          ],
          a: 1,
          why: "Reverse stress testing obliges a board to describe its own failure and then to judge how remote it really is. It often discloses dependencies, such as a single reinsurer or a single coverholder, that no model of insurance losses would show."
        }
      },
      {
        h: "Summary",
        say: "With appetite and capital established, the next chapter builds the plan that must fit within both.",
        scene: () => recap([
          "Premiums meet expected claims; capital absorbs the unexpected.",
          "The capital required depends on the volatility of results and the standard of survival chosen.",
          "Regulatory, economic and rating agency capital differ; the most demanding governs.",
          "Diversification reduces capital, least of all in a crisis.",
          "A class is worth writing only if its profit exceeds the cost of the capital it uses."
        ])
      }
    ]
  });
})();
