/* LM2 · 1 — Reinsurance methods */
(() => {
  const { bars, flow, stats, recap, cols, wfall, money, pct, num } = window.SLIP.kit;
  const ATT = [52, 58, 61, 49, 66, 55, 60, 57, 63, 51, 72, 59];   // ordinary claims, £m, premium £100m
  const EVT = [0, 0, 0, 0, 0, 0, 80, 0, 0, 0, 0, 0];              // one catastrophe, year 7
  const years = (v) => {
    const q = v.qs / 100;
    return ATT.map((a, i) => {
      const e = EVT[i], rec = v.xl ? Math.min(Math.max(e - v.ret, 0), 100) : 0;
      return { kept: (a + e - rec) * (1 - q), ceded: (a + e - rec) * q + rec };
    });
  };

  window.SLIP.chapters.push({
    id: "reinsurance", part: "LM2",
    title: "Reinsurance methods",
    blurb: "Facultative and treaty, proportional and excess of loss, with the sums you will be asked to do.",
    minutes: 12,
    init: { qs: 0, xl: 0, ret: 20, size: 10, lines: 9, loss: 12, r: 5, l: 10 },
    steps: [
      {
        h: "Twelve years of one insurer",
        say: "An insurer earns £100m of premium a year and spends £30m running the business. That leaves **£70m** to pay claims. Here are its claims for twelve years.",
        scene: () => cols({ h: 190, max: 150, bars: ATT.map((a, i) => ({ label: i + 1, hot: i === 6, segs: [[a + EVT[i], a + EVT[i] > 70 ? "bad" : "c1"]] })), lines: [{ v: 70, label: "£70m available for claims" }] }),
        ask: {
          q: "Over the twelve years its claims average about £65m, against £70m available. Is this insurer safe?",
          opts: [
          ["Yes. On average it makes £5m a year.", "It has to survive each year to collect the average."],
          "No. Year 7 costs twice what it has, and insurers fail in single years.",
          ["No. A £5m average margin is too thin.", "The margin isn’t the danger. Eleven of the twelve years are comfortably affordable."],
          ["Yes, if it saves the profits from the good years.", "Six good years would save about £60m. Year 7 overshoots by £70m, and it could have come in year 1."]
        ],
          a: 1,
          why: "Reinsurance exists to **even out the peaks**: to swap an occasional ruinous year for a steady, known cost. It also releases capacity, so the insurer can write more than its own capital allows."
        }
      },
      {
        h: "One risk, or the whole book",
        say: "**Facultative** reinsurance covers one named risk, usually an unusual one. The insurer chooses whether to offer it and the reinsurer whether to take it.\n\nA **treaty** covers a whole class or account: every risk that fits is ceded automatically.",
        scene: () => flow({
          h: 150,
          nodes: [
            { id: "b", x: 95, y: 4, label: "The insurer’s book", tone: "ink" },
            { id: "f", x: 4, y: 96, w: 150, label: "Facultative", sub: "One risk at a time" },
            { id: "t", x: 186, y: 96, w: 150, label: "Treaty", sub: "The whole class", tone: "c1" }
          ],
          edges: [["b", "f", "the odd one"], ["b", "t", "the rest"]]
        }),
        ask: {
          q: "An insurer of small factories is offered one giant chemical plant. How should it reinsure the plant?",
          opts: [
          ["Under its treaty, automatically.", "The treaty was priced on small factories. One chemical plant could wreck its results, and may be outside its terms."],
          "Facultatively, as a one-off.",
          ["It can’t: anything outside the treaty must be declined.", "That is what facultative cover is for."],
          ["By raising the treaty’s retention.", "A higher retention means keeping *more* of the plant, not less."]
        ],
          a: 1,
          why: "Facultative reinsurance handles the risk that doesn’t fit: too large or too unusual. Each side chooses whether to offer and accept, and the treaty is protected from being distorted."
        }
      },
      {
        h: "Quota share: shrink everything",
        say: "A **quota share** is a proportional treaty: the reinsurer takes a fixed percentage of every risk, the same share of premium and of every claim. Set the share ceded.",
        scene: (v) => {
          const y = years(v), keepP = 70 * (1 - v.qs / 100), worst = Math.max(...y.map((x) => x.kept));
          return stats([["Kept for claims", money(keepP)], ["Worst year, net", money(worst), worst > keepP ? "bad" : "good"], ["Worst ÷ available", `${num(worst / keepP, 1)}×`]]) +
            cols({ h: 170, max: 150, bars: y.map((x, i) => ({ label: i + 1, hot: i === 6, segs: [[x.kept, "c1"], [x.ceded, "soft2"]] })), lines: [{ v: keepP, label: "Available, net" }], legend: [["c1", "Kept"], ["soft2", "Ceded"]] });
        },
        ctl: [{ k: "qs", label: "Share ceded", min: 0, max: 80, step: 10, fmt: pct }],
        live: (v) => (v.qs === 0 ? "No reinsurance. Year 7 costs twice what is available." : `Every bar shrinks by ${pct(v.qs)}, but so does the premium. Year 7 is **still twice** what the insurer can afford. A quota share makes the book smaller, not safer in shape. Its gift is capacity: less capital needed, room to write more.`)
      },
      {
        h: "A quota share sum",
        say: "The arithmetic is as simple as it looks.",
        scene: () => bars([
          { label: "Premium £40m", segs: [[70, "c1", "Kept 70%"], [30, "c2", "Ceded 30%"]] },
          { label: "A £10m claim", segs: [[70, "c1", "?"], [30, "c2", "?"]] }
        ], { max: 100 }),
        ask: {
          q: "An insurer has a 30% quota share. It suffers a £10m claim. What does the reinsurer pay?",
          opts: ["£3m", "£7m", "Nothing unless the claim exceeds a retention."],
          a: 0,
          why: "30% of every claim, large or small: £3m. The insurer bears £7m. Proportional treaties have no threshold; that belongs to excess of loss."
        }
      },
      {
        h: "Surplus: keep a fixed amount",
        say: "A **surplus** treaty is also proportional, but the insurer keeps a fixed *amount* of each risk, its **retention** or **line**, and cedes the surplus, up to a number of lines.\n\nHere the retention is **£2m**. Change the size of the risk and the lines in the treaty.",
        scene: (v) => {
          const kept = Math.min(v.size, 2), cap = 2 * v.lines, ceded = Math.min(Math.max(v.size - 2, 0), cap), over = v.size - kept - ceded;
          return stats([["Insurer keeps", `${money(kept)} · ${pct((kept / v.size) * 100)}`, "c1"], ["Treaty takes", `${money(ceded)} · ${pct((ceded / v.size) * 100)}`, "c2"], ["Left over", money(over), over > 0 ? "bad" : ""]]) +
            bars([{ label: "The risk", right: money(v.size), segs: [[kept, "c1", "Kept"], [ceded, "c2", "Surplus treaty"], [over, "hole", "?"]] }], { max: v.size });
        },
        ctl: [{ k: "size", label: "Sum insured of the risk", min: 1, max: 30, step: 1, fmt: money }, { k: "lines", label: "Lines in the treaty", min: 1, max: 12, step: 1, fmt: (x) => `${x}` }],
        live: (v) => {
          const cap = 2 * v.lines;
          if (v.size <= 2) return "The risk is within the retention, so the insurer keeps all of it. Small risks never touch a surplus treaty.";
          if (v.size > 2 + cap) return `The treaty’s capacity is ${v.lines} lines × £2m = ${money(cap)}. The remaining **${money(v.size - 2 - cap)}** needs facultative cover, or the insurer must write a smaller share.`;
          return `The insurer keeps ${pct((2 / v.size) * 100)} of this risk, so it keeps ${pct((2 / v.size) * 100)} of its premium and pays ${pct((2 / v.size) * 100)} of any claim on it. The share changes with every risk; only the £2m is fixed.`;
        },
        goal: {
          say: "Find the fewest lines that place a £24m risk with nothing left over.",
          test: (v) => v.size === 24 && v.lines === 11,
          done: "Eleven lines: £2m kept, £22m ceded. The insurer holds one twelfth of this risk, so it keeps one twelfth of the premium and pays one twelfth of every claim on it, however small."
        }
      },
      {
        h: "A surplus sum",
        set: { size: 12, lines: 9 },
        say: "Retention £2m. Nine lines. A risk of £12m.",
        scene: () => bars([{ label: "A £12m risk", right: "£12m", segs: [[2, "c1", "£2m"], [10, "c2", "Ceded"]] }], { max: 12 }),
        ask: {
          q: "A £3m claim arises on this risk. How much does the reinsurer pay?",
          opts: ["£1m (the part above the £2m retention).", "£2.5m (ten twelfths of the claim).", "£3m."],
          a: 1,
          why: "The risk is shared 2 : 10, so **every** claim on it is shared 2 : 10. Ten twelfths of £3m is £2.5m. The trap is treating the retention like an excess: in a surplus treaty it fixes the *proportion*, not a threshold."
        }
      },
      {
        h: "Excess of loss: cut off the top",
        say: "**Excess of loss** is non-proportional. The reinsurer pays only the part of a loss above the insurer’s **retention**, up to a **limit**. A layer is written “limit **xs** retention”. It is bought in layers, one above another.",
        scene: (v) => {
          const below = Math.min(v.loss, v.r), rec = Math.min(Math.max(v.loss - v.r, 0), v.l), above = Math.max(v.loss - v.r - v.l, 0);
          return stats([["Insurer pays", money(below + above), above ? "bad" : "c1"], ["Reinsurer pays", money(rec), "c2"]]) +
            bars([
              { label: "The cover", right: `${money(v.l)} xs ${money(v.r)}`, segs: [[v.r, "idle", "Retention"], [v.l, "soft2", "Layer"]] },
              { label: "The loss", right: money(v.loss), segs: [[below, "c1", "Insurer"], [rec, "c2", "Reinsurer"], [above, "hole", "Insurer"]] }
            ], { max: Math.max(v.loss, v.r + v.l) });
        },
        ctl: [{ k: "loss", label: "Size of the loss", min: 1, max: 40, step: 1, fmt: money }, { k: "r", label: "Retention", min: 1, max: 15, step: 1, fmt: money }, { k: "l", label: "Limit", min: 2, max: 25, step: 1, fmt: money }],
        live: (v) => (v.loss <= v.r ? "Inside the retention: the reinsurer pays nothing. Most losses never reach an excess layer."
          : v.loss > v.r + v.l ? `The layer is exhausted. Everything above ${money(v.r + v.l)} falls back on the insurer unless it bought another layer on top.`
            : `Loss minus retention: ${money(v.loss)} − ${money(v.r)} = **${money(v.loss - v.r)}** recovered.`),
        goal: {
          say: "Make the loss £30m. Then arrange a layer so that the reinsurer pays exactly £22m.",
          test: (v) => v.loss === 30 && Math.min(Math.max(v.loss - v.r, 0), v.l) === 22,
          done: "There are two ways to get there: a retention of £8m with enough limit above it, or a lower retention whose £22m limit runs out, leaving the insurer paying at both ends. The top of a layer matters as much as the bottom."
        }
      },
      {
        h: "An excess of loss sum",
        say: "A layer of **£20m xs £10m**. A loss of **£25m**.",
        scene: () => bars([{ label: "The cover", right: "£20m xs £10m", segs: [[10, "idle", "Retention"], [20, "soft2", "Layer"]] }, { label: "The loss", right: "£25m", segs: [[25, "ink", "£25m"]] }], { max: 30 }),
        ask: {
          q: "What does the reinsurer pay?",
          opts: ["£25m", "£20m", "£15m"],
          a: 2,
          why: "£25m − £10m retention = £15m, which is within the £20m limit. Had the loss been £40m, the reinsurer would pay its full £20m and the insurer the rest."
        }
      },
      {
        h: "Same twelve years, different shape",
        set: { qs: 0, xl: 1 },
        say: "Back to our insurer. Give it catastrophe excess of loss and move the retention. Compare this with what the quota share did.",
        scene: (v) => {
          const y = years(v), worst = Math.max(...y.map((x) => x.kept));
          return stats([["Worst year, net", money(worst), worst > 70 ? "bad" : "good"], ["Recovered in year 7", money(y[6].ceded), "c2"]]) +
            cols({ h: 170, max: 150, bars: y.map((x, i) => ({ label: i + 1, hot: i === 6, segs: [[x.kept, "c1"], [x.ceded, "soft2"]] })), lines: [{ v: 70, label: "£70m available" }], legend: [["c1", "Kept"], ["soft2", "Recovered"]] });
        },
        ctl: [{ k: "ret", label: "Retention for any one event", min: 5, max: 80, step: 5, fmt: money }],
        live: (v) => (v.ret <= 10 ? "Year 7 now looks like any other year. Eleven bars are untouched: excess of loss changes the **shape** of the results, where quota share only changed their size."
          : "Raise the retention and the insurer keeps more of year 7, in exchange for a cheaper treaty. A **stop loss** works the same way on the whole year’s loss ratio instead of one event."),
        goal: {
          say: "Find the highest retention at which year 7 is still affordable.",
          test: (v) => v.ret === 10,
          done: "£10m. Year 7 then costs exactly the £70m available, and the other eleven years haven’t changed at all. No quota share, at any percentage, could do that."
        }
      },
      {
        h: "Which pays first?",
        say: "A real programme stacks all three. When one loss could claim on several, they respond in a set order: **facultative first, then proportional, then non-proportional.** Each works on what the one before left behind.\n\nA £10m claim on a risk with 20% facultative cover, a 50% quota share, and excess of loss above £3m:",
        scene: () => wfall([{ label: "Gross claim", v: 10, total: true }, { label: "1. Facultative, 20%", v: -2 }, { label: "2. Quota share, 50%", v: -4 }, { label: "3. Excess above £3m", v: -1 }, { label: "Insurer’s net", total: true }], { fmt: (x) => `£${num(x, 0)}m` }),
        ask: {
          q: "Suppose the excess of loss above £3m were wrongly applied **first**, to the full £10m claim. How much would it pay?",
          fix: true,
          opts: [
          ["£1m, as before.", "It only paid £1m because the earlier covers had already cut the claim to £4m."],
          ["£4m", "That is what the quota share paid."],
          "£7m"
        ],
          a: 2,
          why: "£10m less the £3m retention is £7m, seven times what it owes when applied in the right order. Each cover works on what the one before left behind, and the order (facultative, proportional, non-proportional) is written into the contracts so nobody recovers the same pound twice."
        }
      },
      {
        h: "In five lines",
        say: "Reinsurance contracts also say how much say the reinsurer has in the original claims. And a reinsurer that buys reinsurance buys **retrocession**.",
        scene: () => recap([
          "Facultative: one risk. Treaty: a whole class, automatically.",
          "Quota share: the same percentage of every risk, premium and claim.",
          "Surplus: keep one line of each risk, cede the rest; claims follow that risk’s proportion.",
          "Excess of loss: recover loss minus retention, up to the limit.",
          "Order of recovery: facultative, proportional, non-proportional."
        ])
      }
    ]
  });
})();
