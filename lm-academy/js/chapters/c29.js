/* MGA · 3 — Reporting, renewal and resilience */
(() => {
  const { bars, cols, flow, stats, recap, money, pct, num } = window.SLIP.kit;
  const YRS = [[2022, 50], [2023, 95], [2024, 55]];
  const comm = (lr) => Math.max(20, Math.min(30, 30 - (lr - 50) * 0.5));

  window.SLIP.chapters.push({
    id: "mgacarriers", part: "MGA",
    title: "Reporting, renewal and resilience",
    blurb: "Reporting to carriers, review and audit, fair value, the renewal of capacity, and the run-off of a terminated binder.",
    minutes: 10,
    lead: "Capacity is granted for a year at a time and must be earned again at each renewal. This chapter considers what carriers require of an MGA and what follows when capacity ends.",
    aims: [
      "Explain why each policy must be recorded against the carrier shares in force at its inception.",
      "Describe the reporting, review and audit that carriers require.",
      "Calculate remuneration under a sliding scale of commission.",
      "Explain the obligations that continue after a binding authority is terminated."
    ],
    init: { join: 0, lr: 55, late: 0 },
    steps: [
      {
        h: "Recording carrier shares",
        say: "Where there are several carriers, the MGA must record for **every policy** which carriers are on risk and in what proportions. The proportions may change at renewal, and carriers may join or withdraw during the year.\n\nThe governing rule is that a policy is allocated according to the shares in force at the date of its **inception**, and retains that allocation throughout its life.",
        scene: () => bars([
          { label: "Policies incepting before 1 July", right: "", segs: [[60, "c1", "Carrier A 60%"], [40, "c2", "Carrier B 40%"]] },
          { label: "Policies incepting from 1 July", right: "", segs: [[50, "c1", "A 50%"], [50, "c2", "B 50%"]] }
        ], { max: 100 }),
        ask: {
          q: "The panel changed from 60/40 to 50/50 on 1 July. A claim is made in October on a policy that incepted on 15 June. How is it split?",
          fix: true,
          opts: [
          ["50/50: the shares when the claim was made.", "The carriers who took the premium bear the claim."],
          "60/40: the shares at inception.",
          ["55/45: pro rata over the policy period.", "Shares do not blend. A policy is written on one set of shares for its whole life."]
        ],
          a: 1,
          why: "An MGA that cannot prove, policy by policy, who was on risk cannot collect claims money correctly, and will fail its first audit."
        }
      },
      {
        h: "Reporting to carriers",
        say: "A carrier cannot inspect the risks written on its behalf and depends on what the MGA reports. **Bordereaux** are the periodic schedules of risks bound, premiums and claims. **Management information** is the analysis drawn from them.\n\nManagement information is effective to the extent that it anticipates the questions a carrier will ask.",
        scene: (v) => {
          const known = Math.max(0, 100 - v.late * 16);
          return stats([["Reported to carriers", pct(known)], ["Unseen", pct(100 - known), v.late >= 2 ? "bad" : ""]]) +
            recap(["Premium against plan and against binder limits", "Rate change and price adequacy", "Loss ratio by underwriting year and segment", "Large losses and aggregates by zone", "Complaints and referrals"]);
        },
        ctl: [{ k: "late", label: "Reporting running late by", min: 0, max: 5, step: 1, fmt: (x) => (x ? `${x} month${x > 1 ? "s" : ""}` : "nothing") }],
        live: (v) => (v.late < 2 ? "Timely and complete. The carriers can manage their own aggregates, reinsurance and reserves, and have no reason to wonder what they are not being told." : "The carriers are on risk for business they cannot see. Whatever the reason, late or patchy reporting reads as loss of control, and it is the commonest reason capacity is withdrawn from an MGA whose underwriting is perfectly sound.")
      },
      {
        h: "The carrier’s experience",
        say: "The portfolio’s three underwriting years produced loss ratios of 50%, 95% and 55%. Each carrier forms its view of the MGA from the years in which **it** participated. Select the year in which a carrier joined.",
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
        say: "Carriers hold periodic **business reviews** with the MGA and commission **audits** of its files. An audit tests whether each risk was within the authority granted, was priced on the agreed basis and was properly documented, and whether customers were treated fairly.",
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
          opts: [
          ["Void. There was no authority.", "That would punish policyholders who had no way of knowing."],
          "Probably binding on the carrier, who will look to the MGA for any loss.",
          ["Valid, and nothing more need be done.", "The carrier is on risk for business it never agreed to write. Someone will pay for that."]
        ],
          a: 1,
          why: "An innocent policyholder is usually protected. But the MGA acted outside its authority, so the carrier can recover its losses from the MGA, whose own professional indemnity insurance may be called on."
        }
      },
      {
        h: "Fair value",
        say: "Under the FCA’s product governance rules, the carrier is the **manufacturer** of the product, and the MGA is commonly a **co-manufacturer**. Each must be able to demonstrate that the product provides **fair value** to the customer, having regard to the total remuneration taken by every party in the distribution chain.",
        scene: () => bars([
          { label: "Each £100 the customer pays", segs: [[45, "c1", "Claims"], [15, "c2", "Broker"], [20, "c2", "MGA"], [20, "soft1", "Carrier"]] }
        ], { max: 100 }),
        ask: {
          q: "A product’s commissions add up to 55% of premium and only 20% is ever paid in claims. Its loss ratio is superb. Is the carrier content?",
          opts: [
          ["Yes. A 20% loss ratio is excellent.", "For the carrier’s accounts. Not for the customer who paid £100 for £20 of protection."],
          "No. It may not be fair value to the customer.",
          ["Yes, as long as commissions were disclosed.", "Disclosure does not make poor value fair."]
        ],
          a: 1,
          why: "A very low claims ratio with very high distribution costs is a regulatory warning sign, not a triumph. Carriers now withdraw from products they cannot defend."
        }
      },
      {
        h: "Sliding scale commission",
        say: "Some binding authorities make the rate of ordinary commission itself depend on the result, by means of a **sliding scale**. In this example the commission is 30% where the loss ratio is 50% or better, and falls by half a point for each point by which the loss ratio exceeds 50%, to a minimum of 20%.\n\nThe premium is £20m.",
        scene: (v) => {
          const c = comm(v.lr), inc = 20 * (c - 10) / 100, profit = inc - 2.2;
          return stats([["Commission", pct(c, 1), "c1"], ["MGA keeps after brokers", money(inc)], ["MGA result", money(profit), profit < 0 ? "bad" : "good"]]) +
            bars([{ label: "Commission rate", right: pct(c, 1), segs: [[20, "c1", "Floor 20%"], [c - 20, "c3", "Earned by results"]] }], { max: 30 });
        },
        ctl: [{ k: "lr", label: "Loss ratio", min: 40, max: 80, step: 1, fmt: pct }],
        live: (v) => (comm(v.lr) <= 20 ? "At the floor: after paying brokers 10 points, the MGA keeps 10% of premium, £2.0m, against £2.2m of costs. A bad book now makes the MGA itself loss-making. That is alignment with teeth." : comm(v.lr) >= 30 ? "Maximum commission. The MGA is being paid for the result, not just the volume." : "Each point of loss ratio costs the MGA £100,000. Unlike profit commission, which arrives years later, a sliding scale is felt quickly."),
        goal: {
          say: "Find the loss ratio at which the MGA itself only breaks even.",
          test: (v) => v.lr === 68,
          done: "68%. Recall that the carrier breaks even at about 70%. The scale has been set so the MGA starts losing money just before its carrier does. That is not an accident; it is the design."
        }
      },
      {
        h: "Renewing and growing capacity",
        say: "At each renewal both parties review the results, the quality of the data, the controls, and whether their appetites remain compatible. Commission, profit commission, limits and classes are all open to negotiation.\n\nAn MGA expands its capacity most securely by **deepening** its relationships with a small number of committed carriers, and by seeking agreements for longer than one year, before it adds further carriers.",
        scene: () => bars([
          { label: "Three carriers, each with a large share, multi-year", right: "committed", segs: [[40, "c1"], [35, "c2"], [25, "c3"]] },
          { label: "Nine carriers with small shares, annual", right: "fragile", segs: [[12, "idle"], [12, "soft1"], [11, "idle"], [11, "soft1"], [11, "idle"], [11, "soft1"], [11, "idle"], [11, "soft1"], [10, "idle"]] }
        ], { max: 100 }),
        ask: {
          q: "Why might nine small carriers be weaker support than three large ones?",
          opts: [
          ["They are not: more names means more security.", "Against losing any single one, yes. But think about why each would stay."],
          "None has enough at stake to stay through a bad year, and each must be serviced.",
          ["Small carriers have worse credit ratings.", "Share of this book says nothing about a carrier’s own strength."]
        ],
          a: 1,
          why: "Diversifying capacity protects against losing any one carrier. But a carrier with a token share has little reason to stay when results dip, and every carrier brings its own reporting, audits and limits."
        }
      },
      {
        h: "Termination and run-off",
        say: "The termination of a binding authority does not terminate the policies written under it. They **run off**: cover continues until each policy expires, and claims may be notified for years afterwards. The handling and reporting of those claims, and the collection of payments from the carriers, must continue. The agreement should specify who is to perform that work and at whose expense.",
        scene: () => bars([
          { label: "Premium income", right: "stops at once", segs: [[12, "c1", "Written"], [0.1, "none"]] },
          { label: "Policies in force", right: "up to 12 months more", segs: [[12, "c1"], [12, "soft1", "Running off"]] },
          { label: "Claims to handle", right: "years, on liability", segs: [[12, "c2"], [36, "soft2", "Still arriving"]] }
        ], { max: 48, marks: [[12, "Binder ends"]] }),
        ask: {
          q: "A binder is cancelled on 31 December. A 12-month policy bound on 1 December has a loss the following October. Is it covered?",
          opts: [
          ["No. The binder had ended.", "Ending the binder stops the MGA binding anything new. It does not reach back."],
          "Yes. It was validly bound while the authority existed.",
          ["Only until 31 December.", "The policy is a twelve-month contract with the policyholder, who is not party to the binder."]
        ],
          a: 1,
          why: "Termination stops **new** business. Everything already bound stays with the carriers who took it, and the MGA still has to service it, now with no new commission coming in to pay for the work."
        }
      },
      {
        h: "The attributes of a sound MGA",
        say: "The three chapters may be drawn together. The value of an MGA does not lie in the volume of premium it writes. It rests on a small number of attributes, each of which a carrier can test.",
        scene: () => recap([
          "Underwriting results that hold up by segment and by year",
          "Data good enough for a carrier to see what it owns",
          "Pay that rises and falls with the carriers’ results",
          "Capacity that would survive losing its largest provider",
          "A record of giving up volume when the price was wrong"
        ])
      },
      {
        h: "Summary",
        say: "This concludes the course. The glossary, available from the contents page, defines the terms used throughout.",
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
