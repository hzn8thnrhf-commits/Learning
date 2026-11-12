/* LM3 · 3 — Risk appetite */
(() => {
  const { bars, flow, stats, recap, money, pct, num } = window.SLIP.kit;
  const DIM = [
    ["Earnings", "“We accept no more than a 1-in-10 chance of an underwriting loss in any year.” This governs volatility: how often the firm is prepared to disappoint its investors."],
    ["Capital", "“A 1-in-200 year must not cost more than 30% of our capital.” This governs survival: how much of the buffer a single bad year may consume."],
    ["Liquidity", "“We will always hold enough liquid assets to pay our largest modelled event within thirty days.” A solvent insurer that cannot find cash on the day still fails its policyholders."],
    ["Concentration", "“No single broker, coverholder or reinsurer will account for more than 15% of our income or our recoverables.” This limits dependence on any one counterparty."],
    ["Conduct", "“We have no appetite for products that do not offer fair value.” Some statements are qualitative: they set a boundary the firm will not cross, whatever the return."]
  ];
  const zone = (x) => (x <= 40 ? 0 : x <= 80 ? 1 : x < 200 ? 2 : 3);

  window.SLIP.chapters.push({
    id: "appetite", part: "LM3",
    title: "Risk appetite",
    blurb: "How a board decides the risk it will bear, and how that decision travels from a sentence in a board paper to a limit on an underwriter’s desk.",
    minutes: 12,
    lead: "Every insurer takes risk for a living. The question a board must answer before any other is how much, and of what kind.",
    aims: [
      "Distinguish risk **capacity**, **appetite**, **tolerance** and **limit**.",
      "Classify the risks an insurer bears, including those that are not underwriting risks.",
      "Translate an appetite statement into a measurable underwriting limit.",
      "Explain the three lines of defence and who is responsible for acting on a breach."
    ],
    init: { loss: 20, dim: 0, dr: 40, util: 60 },
    steps: [
      {
        h: "Capacity, appetite and tolerance",
        say: "Three terms are routinely confused. **Risk capacity** is the most a firm *could* lose before it breaches a hard constraint, usually its regulatory capital requirement. **Risk appetite** is the amount of risk its board is *willing* to accept in pursuit of its objectives, and it is always set inside capacity. **Risk tolerance** is the acceptable variation around the appetite before action is required.\n\nThis insurer holds £200m of capital against a requirement of £120m. Its board has stated an appetite for losing no more than £40m in a year.",
        scene: (v) => {
          const z = zone(v.loss);
          return stats([["Loss for the year", money(v.loss)], ["Capital remaining", money(Math.max(200 - v.loss, 0)), z >= 2 ? "bad" : ""], ["Position", ["Within appetite", "Outside appetite", "Capital breach", "Insolvent"][z], z === 0 ? "good" : z === 1 ? "c2" : "bad"]]) +
            bars([{ label: "The year’s loss against the firm’s capital", segs: [[Math.min(v.loss, 40), "c1", "Appetite"], [Math.min(Math.max(v.loss - 40, 0), 40), "c2", "Capacity"], [Math.max(v.loss - 80, 0), "bad", "Beyond"]] }], { max: 220, marks: [[80, "Capacity"], [200, "All capital"]] });
        },
        ctl: [{ k: "loss", label: "Loss for the year", min: 0, max: 220, step: 10, fmt: money }],
        goal: {
          say: "Find the smallest loss that puts the firm in breach of its capital requirement.",
          test: (v) => v.loss === 90,
          done: "£90m, which leaves £110m against a requirement of £120m. Between £40m and £80m the firm was outside its appetite yet fully compliant: that interval is the purpose of setting appetite inside capacity. It buys time to act while the choices are still the firm’s own."
        },
        live: (v) => ["The loss is one the board has said it is prepared to bear. No action is required beyond reporting it.", "The firm remains solvent and compliant, but the loss exceeds what the board agreed to accept. Management must explain it and propose a response.", "Capital has fallen below the regulatory requirement. The decisions now belong in part to the supervisor, who will require a recovery plan.", "Liabilities exceed assets. The firm cannot meet its obligations to policyholders in full."][zone(v.loss)]
      },
      {
        h: "What an appetite statement contains",
        say: "A **risk appetite statement** is approved by the board and reviewed at least annually. A well-constructed statement does not rely on a single number. It addresses several dimensions, because a firm can fail along any of them, and it combines quantitative measures with qualitative boundaries.",
        scene: (v) => `<ol class="k-recap">${DIM.map((m, i) => `<li${i === v.dim ? ' style="font-weight:600"' : ' style="opacity:.55"'}>${m[0]}</li>`).join("")}</ol>`,
        ctl: [{ k: "dim", label: "Dimension", min: 0, max: 4, step: 1, fmt: (i) => `${i + 1} of 5` }],
        live: (v) => `**${DIM[v.dim][0]}.** ${DIM[v.dim][1]}`
      },
      {
        h: "The risks an insurer bears",
        say: "Appetite must be set for every material risk, and many are not underwriting risks. **Enterprise risk management** (ERM) is the discipline of identifying, measuring and managing them together, since they interact.\n\n**Insurance risk** has two components. *Underwriting risk* is the risk that business written now costs more than its price. *Reserving risk* is the risk that business written in the past costs more than the provision held for it. To these are added **market**, **credit**, **liquidity** and **operational** risk, and the less measurable **strategic** and **reputational** risks.",
        scene: () => flow({
          h: 190,
          nodes: [
            { id: "u", x: 4, y: 4, w: 150, label: "Underwriting", sub: "This year’s business", tone: "c1" }, { id: "r", x: 186, y: 4, w: 150, label: "Reserving", sub: "Past years’ claims", tone: "c1" },
            { id: "m", x: 4, y: 72, w: 104, label: "Market" }, { id: "cr", x: 118, y: 72, w: 104, label: "Credit" }, { id: "l", x: 232, y: 72, w: 104, label: "Liquidity" },
            { id: "o", x: 4, y: 130, w: 150, label: "Operational", sub: "People, systems, fraud" }, { id: "s", x: 186, y: 130, w: 150, label: "Strategic", sub: "Wrong plan, lost trust" }
          ]
        }),
        ask: {
          q: "A syndicate concludes that its 2019 liability claims will cost £30m more than the provision it holds. It has written no new business in that class. Which risk has materialised?",
          opts: [
            ["Underwriting risk.", "Underwriting risk concerns business being written now. This business was written years ago."],
            "Reserving risk.",
            ["Market risk.", "No investment has changed in value."],
            ["Credit risk.", "No counterparty has failed to pay the syndicate."]
          ],
          a: 1,
          why: "What has changed is the estimate of an earlier year’s cost. For insurers with long-tail liabilities, reserving risk is frequently larger than the risk in the current year’s underwriting, and an appetite framework that addresses only new business has ignored the larger exposure."
        }
      },
      {
        h: "From statement to limit",
        say: "An appetite statement has no effect until it constrains a decision. It is therefore translated in stages, each more specific than the last.\n\n**Appetite:** “A 1-in-200 year must not cost more than 30% of capital.”\n\n**Tolerance:** “Our net loss from a Florida windstorm at the 1-in-200 level must not exceed £60m.”\n\n**Limit:** “No line above £5m on any Florida risk, and no more than £150m of Florida limits in aggregate.”",
        scene: () => flow({
          h: 230,
          nodes: [
            { id: "a", x: 95, y: 4, label: "Appetite", sub: "The board’s statement", tone: "ink" },
            { id: "t", x: 95, y: 74, label: "Tolerance", sub: "A measure for each risk" },
            { id: "l", x: 95, y: 144, label: "Limit", sub: "A rule for each underwriter", tone: "c1" }
          ],
          edges: [["a", "t"], ["t", "l"]]
        }),
        ask: {
          q: "Every Florida risk on the book is within the £5m line limit, yet the £150m aggregate has been exceeded. Where did the control fail?",
          opts: [
            ["Nowhere: each underwriter acted within authority.", "Each underwriter did. The firm, taken as a whole, did not."],
            "In the monitoring of the aggregate.",
            ["With the underwriters, who wrote too many risks.", "No underwriter can observe the firm’s total from a single desk. The total must be compiled and reported to them."],
            ["With the board, whose appetite was too restrictive.", "The level of appetite is the board’s to determine. The failure lay in enforcing it."]
          ],
          a: 1,
          why: "A line limit constrains a single risk. Only an aggregate limit, monitored across the whole book, constrains a portfolio: forty lines of £5m, each properly authorised, amount to an accumulation of £200m."
        }
      },
      {
        h: "Where a limit comes from",
        say: "Limits are derived, not chosen. The tolerance is a modelled loss of £60m. The limit that delivers it depends on an assumption: the proportion of the exposed limits that a 1-in-200 windstorm is expected to destroy, net of reinsurance.\n\nIf that **damage ratio** is 40%, the firm may hold £60m ÷ 0.40 = £150m of Florida limits. Revise the assumption and observe the consequence.",
        scene: (v) => {
          const agg = 60 / (v.dr / 100);
          return stats([["Tolerance", "£60m"], ["Permitted aggregate", money(agg), "c1"], ["Lines of £5m", `${Math.floor(agg / 5)}`]]) +
            bars([{ label: "Florida limits the firm may hold", right: money(agg), segs: [[60, "bad", "Modelled loss"], [agg - 60, "c1", "Expected to survive"]] }], { max: 300 });
        },
        ctl: [{ k: "dr", label: "Damage ratio at 1 in 200", min: 20, max: 60, step: 5, fmt: pct }],
        goal: {
          say: "A new version of the catastrophe model raises the damage ratio to 50%. Find the revised aggregate limit.",
          test: (v) => v.dr === 50,
          done: "£120m. The board’s appetite has not changed, and no new risk has been written, yet the firm is now £30m over its limit and must shed exposure or buy protection. A limit is only as stable as the model beneath it, which is why model changes are themselves subject to governance."
        },
        live: (v) => `At a damage ratio of ${pct(v.dr)}, £60m of modelled loss corresponds to **${money(60 / (v.dr / 100))}** of exposed limits, or ${Math.floor(60 / (v.dr / 100) / 5)} lines of £5m.`
      },
      {
        h: "Three lines of defence",
        say: "Responsibility for risk is conventionally divided among three lines.\n\nThe **first line** is the business itself: underwriters, claims and operations own the risks they take and are responsible for managing them within limits. The **second line**, the risk management and compliance functions, sets the framework, monitors adherence and challenges the first line; it does not take the risks. The **third line**, internal audit, gives the board independent assurance that the first two are working.",
        scene: () => flow({
          h: 230,
          nodes: [
            { id: "b", x: 95, y: 4, label: "The board", sub: "Sets appetite; holds all to account", tone: "ink" },
            { id: "1", x: 4, y: 94, w: 104, label: "First line", sub: "Owns the risk", tone: "c1" },
            { id: "2", x: 118, y: 94, w: 104, label: "Second line", sub: "Oversees" },
            { id: "3", x: 232, y: 94, w: 104, label: "Third line", sub: "Assures" },
            { id: "r", x: 95, y: 176, label: "The risk itself" }
          ],
          edges: [["b", "1"], ["b", "2"], ["b", "3"], ["1", "r"]]
        }),
        ask: {
          q: "The risk function reports that the marine class has exceeded its aggregate limit. Whose responsibility is it to bring the exposure back within the limit?",
          opts: [
            "The head of the marine class.",
            ["The chief risk officer.", "The risk function identifies and escalates the breach. If it also corrected it, it would be managing the risk it is meant to oversee."],
            ["Internal audit.", "Audit reports on whether the control framework works. It neither takes nor remedies positions."],
            ["The board.", "The board will require an explanation and may direct a response, but the exposure belongs to the class that wrote it."]
          ],
          a: 0,
          why: "The first line owns the risk and therefore the remedy. The independence of the second and third lines depends on their not doing the first line’s work for it."
        }
      },
      {
        h: "Early warning",
        say: "A limit that is noticed only when it is breached has failed. Firms therefore track **key risk indicators** against thresholds set below the limit itself: commonly an *amber* trigger at which the position is escalated and a response prepared, and a *red* trigger at the limit.\n\nThe Florida aggregate limit is £150m.",
        scene: (v) => {
          const used = 150 * v.util / 100, st = v.util >= 100 ? 2 : v.util >= 80 ? 1 : 0;
          return stats([["Aggregate written", money(used)], ["Utilisation", pct(v.util), st === 2 ? "bad" : st === 1 ? "c2" : "good"], ["Status", ["Green", "Amber", "Red"][st], st === 2 ? "bad" : st === 1 ? "c2" : "good"]]) +
            bars([{ label: "Florida aggregate", right: `${money(used)} of £150m`, segs: [[Math.min(used, 120), "c1"], [Math.min(Math.max(used - 120, 0), 30), "c2"], [Math.max(used - 150, 0), "bad"]] }], { max: 180, marks: [[120, "Amber"], [150, "Limit"]] });
        },
        ctl: [{ k: "util", label: "Share of the limit in use", min: 40, max: 115, step: 5, fmt: pct }],
        live: (v) => (v.util >= 100 ? "The limit is breached. The firm is carrying more risk than its board agreed to, and the breach must be reported and remedied." : v.util >= 80 ? "Amber. Nothing has been breached, and that is the point: the class must now show how it will remain within the limit, while several inexpensive options are still open." : "Well within the limit. The indicator is reported and requires no action."),
        ask: {
          q: "An indicator has turned amber. What does that require?",
          opts: [
            ["Nothing. No limit has been breached.", "A trigger with no consequence is not a control."],
            "Escalation, and a plan to remain within the limit.",
            ["An immediate halt to all new business in the class.", "That may be the right response to a red indicator. Amber exists to allow something more measured."],
            ["An increase in the limit.", "Raising a limit because it is about to be reached removes the control. Any increase is a separate decision for the body that set it."]
          ],
          a: 1,
          why: "Amber converts a future breach into a present decision. The usual responses are smaller lines, facultative reinsurance, or declining to renew the weakest risks in the zone."
        }
      },
      {
        h: "Appetite and strategy",
        say: "A plan may be sound in itself and still be wrong for the capital that supports it. Before a business plan is approved it is tested against the appetite statement, and where they conflict one of them must change.",
        scene: () => flow({
          h: 170,
          nodes: [
            { id: "a", x: 95, y: 4, label: "Risk appetite", sub: "Set by the board", tone: "ink" },
            { id: "s", x: 4, y: 100, w: 104, label: "Strategy" }, { id: "p", x: 118, y: 100, w: 104, label: "Business plan", tone: "c1" }, { id: "c", x: 232, y: 100, w: 104, label: "Capital" }
          ],
          edges: [["a", "s"], ["a", "p"], ["a", "c"]]
        }),
        ask: {
          q: "A pension fund with a stated preference for stable returns backs a syndicate whose plan is 80% US hurricane reinsurance, at excellent rates. What is the difficulty?",
          opts: [
            ["None. The rates are excellent.", "Favourable rates raise the expected return. They do not reduce the amount that can be lost in one season."],
            "The strategy is inconsistent with the investor’s appetite.",
            ["Hurricane reinsurance is unprofitable.", "Over a long period it can be highly profitable. The issue is the path it takes to that result."],
            ["So concentrated a plan could not be approved.", "Specialist catastrophe syndicates exist. Concentration is a legitimate choice where the capital providers want it."]
          ],
          a: 1,
          why: "Catastrophe business earns well in most years and can consume a large part of the capital in one. The expected return may be attractive; the volatility is what this investor has said it does not want."
        }
      },
      {
        h: "When appetite is breached",
        say: "A breach leaves the board with four legitimate courses. It may **reduce the exposure**, **transfer** it through reinsurance, **raise capital** so that the same exposure is a smaller proportion of it, or **revise the appetite** by a deliberate, recorded decision that the earlier statement no longer reflects its view.\n\nWhat distinguishes these from an illegitimate response is that each either changes the risk or openly changes the board’s position on it.",
        scene: () => recap(["Reduce the exposure", "Transfer it by reinsurance", "Raise more capital", "Revise the appetite, openly and on the record"]),
        ask: {
          q: "After a model update, a firm’s catastrophe exposure exceeds its appetite. Which response is **not** legitimate?",
          opts: [
            ["Buying additional catastrophe reinsurance.", "This transfers part of the risk, and so reduces what the firm bears."],
            ["A board resolution raising the appetite, with reasons.", "A board may change its mind, provided it does so deliberately and can explain why."],
            "Reverting to the previous model version because it produces a lower figure.",
            ["Declining to renew the most exposed accounts.", "This reduces the exposure directly."]
          ],
          a: 2,
          why: "Selecting the measure that gives the preferred answer changes neither the risk nor the board’s considered view of it. It merely conceals the breach, and supervisors treat it as a failure of governance in its own right."
        }
      },
      {
        h: "Summary",
        say: "The next chapter turns from the risk a firm will accept to the capital that makes the acceptance credible.",
        scene: () => recap([
          "Capacity is what a firm could lose; appetite is what its board will accept; tolerance is the permitted variation.",
          "A sound statement covers earnings, capital, liquidity, concentration and conduct.",
          "Appetite is translated into tolerances and then into limits derived from a model.",
          "The first line owns the risk; the second oversees; the third assures.",
          "A breach is answered by changing the risk or, openly, the appetite."
        ])
      }
    ]
  });
})();
