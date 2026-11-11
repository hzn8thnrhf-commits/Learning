/* MGA · 3 — Reporting, renewal and resilience */
(() => {
  const { bars, cols, flow, stats, recap, money, pct, num } = window.SLIP.kit;
  const YRS = [[2022, 50], [2023, 95], [2024, 55]];
  const comm = (lr) => Math.max(20, Math.min(30, 30 - (lr - 50) * 0.5));

  window.SLIP.chapters.push({
    id: "mgacarriers", part: "MGA",
    title: "Reporting, renewal and resilience",
    blurb: "What carriers need to see, why the same book looks different to each of them, and how capacity is renewed, grown and run off.",
    minutes: 10,
    init: { join: 0, lr: 55, late: 0 },
    steps: [
      {
        h: "Every policy, every share",
        say: "With several carriers, the MGA must record for **each policy** exactly which carriers are on risk and in what shares. Shares change at renewal; carriers join and leave mid-year.\n\nThe rule that keeps it straight: a policy belongs to the shares in force on the day it **incepted**.",
        scene: () => bars([
          { label: "Policies incepting before 1 July", right: "", segs: [[60, "c1", "Carrier A 60%"], [40, "c2", "Carrier B 40%"]] },
          { label: "Policies incepting from 1 July", right: "", segs: [[50, "c1", "A 50%"], [50, "c2", "B 50%"]] }
        ], { max: 100 }),
        ask: {
          q: "The panel changed from 60/40 to 50/50 on 1 July. A claim is made in October on a policy that incepted on 15 June. How is it split?",
          opts: ["50/50: the shares in force when the claim was made.", "60/40: the shares in force at inception."],
          a: 1,
          why: "The carriers who took the premium bear the claim. An MGA that can’t prove, policy by policy, who was on risk can’t collect claims money correctly, and will fail its first audit."
        }
      },
      {
        h: "What carriers need to see",
        say: "Carriers can’t see the risks, so they rely on what the MGA sends. **Bordereaux**: monthly lists of every risk bound, premium and claim. **Management information**: the story those lists tell.\n\nGood MI answers the carrier’s questions before they are asked.",
        scene: (v) => {
          const known = Math.max(0, 100 - v.late * 16);
          return stats([["Reported to carriers", pct(known)], ["Unseen", pct(100 - known), v.late >= 2 ? "bad" : ""]]) +
            recap(["Premium against plan and against binder limits", "Rate change and price adequacy", "Loss ratio by underwriting year and segment", "Large losses and aggregates by zone", "Complaints and referrals"]);
        },
        ctl: [{ k: "late", label: "Reporting running late by", min: 0, max: 5, step: 1, fmt: (x) => (x ? `${x} month${x > 1 ? "s" : ""}` : "nothing") }],
        live: (v) => (v.late < 2 ? "Timely and complete. The carriers can manage their own aggregates, reinsurance and reserves, and have no reason to wonder what they aren’t being told." : "The carriers are on risk for business they can’t see. Whatever the reason, late or patchy reporting reads as loss of control, and it is the commonest reason capacity is withdrawn from an MGA whose underwriting is perfectly sound.")
      },
      {
        h: "Same book, different story",
        say: "The book’s three underwriting years ran at 50%, 95% and 55%. Each carrier judges the MGA on the years **it** was on. Choose when a carrier joined.",
        scene: (v) => {
          const mine = YRS.slice(v.join), avg = mine.reduce((a, y) => a + y[1], 0) / mine.length;
          return stats([["Years on risk", `${mine.length}`], ["Its loss ratio", pct(avg, 0), avg > 70 ? "bad" : "good"]]) +
            cols({ h: 160, max: 110, bars: YRS.map(([y, lr], i) => ({ label: `${y}`, segs: [[lr, i < v.join ? "idle" : lr > 70 ? "bad" : "c1"]], top: `${lr}%` })), lines: [{ v: 72, label: "Break-even", right: true }] });
        },
        ctl: [{ k: "join", label: "Carrier joined in", opts: ["2022", "2023", "2024"] }],
        live: (v) => ["On since 2022, this carrier has seen a 67% average: one bad year between two good ones. It has context and is likely to stay.", "Joined in 2023 and met the bad year first. Its experience so far is 75%, and it is asking whether it was sold a problem. **The newest carrier in a bad year is the likeliest to leave.**", "Joined in 2024 and has seen only a good year. It may think the book is better than it is, and be badly surprised later."][v.join]
      },
      {
        h: "Reviews and audits",
        say: "Carriers hold regular **business reviews** with the MGA, and send **auditors** to test files: was each risk within the binder’s authority, priced on the agreed basis, documented, and were customers treated fairly?",
        scene: () => flow({
          h: 130,
          nodes: [
            { id: "b", x: 4, y: 40, w: 104, label: "Binder", sub: "The authority" },
            { id: "f", x: 118, y: 40, w: 104, label: "Files", sub: "What was done", tone: "c1" },
            { id: "a", x: 232, y: 40, w: 104, label: "Audit", sub: "Do they match?" }
          ],
          edges: [["b", "f"], ["f", "a"]]
        }),
        ask: {
          q: "An audit finds twelve policies bound in a territory the binder excludes. What is their status?",
          opts: ["Void. There was no authority.", "Probably binding on the carrier, who will look to the MGA for any loss."],
          a: 1,
          why: "An innocent policyholder is usually protected. But the MGA acted outside its authority, so the carrier can recover its losses from the MGA, whose own professional indemnity insurance may be called on. Authority limits are not guidance."
        }
      },
      {
        h: "The customer at the end",
        say: "Under FCA rules the carrier is the product’s **manufacturer** and the MGA often a **co-manufacturer**. Both must be able to show the product gives customers **fair value**, including after everyone in the chain has been paid.",
        scene: () => bars([
          { label: "Each £100 the customer pays", segs: [[45, "c1", "Claims"], [15, "c2", "Broker"], [20, "c2", "MGA"], [20, "soft1", "Carrier"]] }
        ], { max: 100 }),
        ask: {
          q: "A product’s commissions add up to 55% of premium and only 20% is ever paid in claims. Its loss ratio is superb. Is the carrier content?",
          opts: ["Yes. A 20% loss ratio is excellent.", "No. It may not be fair value to the customer."],
          a: 1,
          why: "A very low claims ratio with very high distribution costs is a regulatory warning sign, not a triumph. Portfolio reviews now cover customer outcomes as well as financial ones, and a carrier will withdraw from a product it can’t defend."
        }
      },
      {
        h: "A sliding scale",
        say: "Some binders make the ordinary commission itself move with results: a **sliding scale**. Here it pays 30% at a loss ratio of 50% or better, falling half a point for each point of loss ratio, to a floor of 20%.\n\nOn £20m of premium:",
        scene: (v) => {
          const c = comm(v.lr), inc = 20 * (c - 10) / 100, profit = inc - 2.2;
          return stats([["Commission", pct(c, 1), "c1"], ["MGA keeps after brokers", money(inc)], ["MGA result", money(profit), profit < 0 ? "bad" : "good"]]) +
            bars([{ label: "Commission rate", right: pct(c, 1), segs: [[20, "c1", "Floor 20%"], [c - 20, "c3", "Earned by results"]] }], { max: 30 });
        },
        ctl: [{ k: "lr", label: "Loss ratio", min: 40, max: 80, step: 1, fmt: pct }],
        live: (v) => (comm(v.lr) <= 20 ? "At the floor: after paying brokers 10 points, the MGA keeps 10% of premium, £2.0m, against £2.2m of costs. A bad book now makes the MGA itself loss-making. That is alignment with teeth." : comm(v.lr) >= 30 ? "Maximum commission. The MGA is being paid for the result, not just the volume." : "Each point of loss ratio costs the MGA £100,000. Unlike profit commission, which arrives years later, a sliding scale is felt quickly.")
      },
      {
        h: "Renewing and growing capacity",
        say: "Each renewal reviews both sides: results, data quality, controls, and whether appetites still match. Commission, profit share, limits and classes are all on the table.\n\nMGAs grow most safely by **deepening** relationships with a few committed carriers, and by seeking longer-term agreements, before adding new names.",
        scene: () => bars([
          { label: "Three carriers, each with a large share, multi-year", right: "committed", segs: [[40, "c1"], [35, "c2"], [25, "c3"]] },
          { label: "Nine carriers with small shares, annual", right: "fragile", segs: [[12, "idle"], [12, "soft1"], [11, "idle"], [11, "soft1"], [11, "idle"], [11, "soft1"], [11, "idle"], [11, "soft1"], [10, "idle"]] }
        ], { max: 100 }),
        ask: {
          q: "Why might nine small carriers be weaker support than three large ones?",
          opts: ["They aren’t: more names means more diversification.", "None has enough at stake to stay through a bad year, and each must be serviced."],
          a: 1,
          why: "Diversifying capacity protects against losing any one carrier. But a carrier with a token share has little reason to stay when results dip, and every carrier brings its own reporting, audits and limits to satisfy."
        }
      },
      {
        h: "When capacity ends",
        say: "A binder ending doesn’t end the policies written under it. They **run off**: cover continues to expiry, and claims may arrive for years. Someone must go on handling them, reporting them and collecting from the carriers. The binder should say who, and who pays.",
        scene: () => bars([
          { label: "Premium income", right: "stops at once", segs: [[12, "c1", "Written"], [0.1, "none"]] },
          { label: "Policies in force", right: "up to 12 months more", segs: [[12, "c1"], [12, "soft1", "Running off"]] },
          { label: "Claims to handle", right: "years, on liability", segs: [[12, "c2"], [36, "soft2", "Still arriving"]] }
        ], { max: 48, marks: [[12, "Binder ends"]] }),
        ask: {
          q: "A binder is cancelled on 31 December. A 12-month policy bound on 1 December has a loss the following October. Is it covered?",
          opts: ["No. The binder had ended.", "Yes. It was validly bound while the authority existed."],
          a: 1,
          why: "Termination stops **new** business. Everything already bound stays with the carriers who took it. The MGA still has to service it, now with no new commission coming in to pay for the work."
        }
      },
      {
        h: "What makes an MGA worth backing",
        say: "Put the three chapters together. An MGA’s value isn’t its premium volume. It rests on a short list.",
        scene: () => recap([
          "Underwriting results that hold up by segment and by year",
          "Data good enough for a carrier to see what it owns",
          "Pay that rises and falls with the carriers’ results",
          "Capacity that would survive losing its largest provider",
          "A record of giving up volume when the price was wrong"
        ])
      },
      {
        h: "In five lines",
        say: "That is the course. The glossary on the home page holds every term.",
        scene: () => recap([
          "A policy belongs to the carrier shares in force at its inception.",
          "Late or thin reporting loses capacity faster than bad results.",
          "Each carrier judges the book on the years it was on.",
          "Sliding scales and profit commission make the MGA share the outcome.",
          "Ending a binder stops new business; the run-off still has to be serviced."
        ])
      }
    ]
  });
})();
