/* LM2 · 6 — Conduct of business */
(() => {
  const { bars, flow, stats, recap, money, pct } = window.SLIP.kit;
  const MRC = [
    ["Risk details", "Who and what is insured, the period, the sum insured, conditions and the premium."],
    ["Information", "The facts the underwriters relied on when they decided to write the risk."],
    ["Security details", "Each insurer’s line and stamp, and the wording making each liable only for its own share."],
    ["Subscription agreement", "How the insurers work together: who leads, who agrees changes, how claims are settled."],
    ["Fiscal and regulatory", "Taxes payable, the regulatory classification of the client, and where the risk is located."],
    ["Broker remuneration and deductions", "The brokerage and any other deductions from the premium."]
  ];
  const TERMS = [
    ["Condition", "A term the insured must comply with. If breached, the insurer can claim damages for any loss the breach caused it, but must usually still pay the claim."],
    ["Condition precedent", "A condition that must be met before the insurer is liable at all, such as paying the premium by a set date or notifying a claim in time. Not met: no liability."],
    ["Warranty", "A promise that something is, or will stay, so. Under the Insurance Act 2015 a breach **suspends** cover until it is put right. Losses during the breach aren’t paid; losses after it is remedied are."],
    ["Exclusion", "Not a promise by the insured at all. It carves a peril or situation out of the cover, such as war or wear and tear."]
  ];

  window.SLIP.chapters.push({
    id: "conduct", part: "LM2",
    title: "Conduct of business",
    blurb: "From quotation to contract: fair presentation, the Market Reform Contract, policy terms and how cover ends.",
    minutes: 10,
    init: { would: 150, sec: 0, term: 0, day: 40 },
    steps: [
      {
        h: "Quotations",
        say: "A **quotation** is the insurer’s offer: these terms, this price. It usually stays open for a stated period and rests on the information given. If the facts change before it is accepted, the quote may no longer stand.\n\nFor simpler risks the facts arrive on a **proposal form**: the insurer’s own list of questions.",
        scene: () => flow({
          h: 130,
          nodes: [
            { id: "b", x: 4, y: 40, w: 96, label: "Broker", sub: "Presents risk" },
            { id: "u", x: 122, y: 40, w: 96, label: "Underwriter", sub: "Quotes", tone: "c1" },
            { id: "c", x: 240, y: 40, w: 96, label: "Client", sub: "Accepts or not" }
          ],
          edges: [["b", "u"], ["u", "c"]]
        }),
        ask: {
          q: "A yacht owner’s proposal form doesn’t ask about a recent grounding. He says nothing. Has he met his duty?",
          opts: ["Yes. He answered every question asked.", "It depends on whether he is a consumer or a business."],
          a: 1,
          why: "A **consumer** must take reasonable care not to misrepresent, which in practice means answering the questions honestly. A **commercial** insured must volunteer every material circumstance, asked or not. Same silence, different result."
        }
      },
      {
        h: "When the presentation was wrong",
        say: "A business carelessly failed to mention an earlier fire and paid **£100k**. Told the truth, the insurer would have charged more. The Insurance Act 2015 asks: *what would the insurer have done?*",
        scene: (v) => {
          const share = 100 / v.would;
          return stats([["Claim", "£1m"], ["Paid", money(share), "c1"], ["Cut", money(1 - share), share < 1 ? "bad" : ""]]) +
            bars([
              { label: "Premium paid against premium owed", right: `£100k of £${v.would}k`, segs: [[share * 100, "c2", "Paid"], [100 - share * 100, "idle"]] },
              { label: "The £1m claim", right: `${pct(share * 100)} paid`, segs: [[share * 100, "c1", "Paid"], [100 - share * 100, "hole"]] }
            ], { max: 100 });
        },
        ctl: [{ k: "would", label: "Premium the insurer would have charged", min: 100, max: 300, step: 10, fmt: (x) => `£${x}k` }],
        live: (v) => `The insurer received ${pct(10000 / v.would)} of the right premium, so it pays ${pct(10000 / v.would)} of the claim: a **proportionate remedy**. Had it refused the risk altogether, it may avoid the policy and return the premium. Only a **deliberate or reckless** breach lets it avoid and keep the premium.`
      },
      {
        h: "The Market Reform Contract",
        say: "London risks are recorded on a standard document, the **Market Reform Contract** (MRC), still called the slip. It always has the same six sections in the same order, so anyone can find anything. Tap through them.",
        scene: (v) => `<ol class="k-recap">${MRC.map((m, i) => `<li${i === v.sec ? ' style="font-weight:600"' : ' style="opacity:.55"'}>${m[0]}</li>`).join("")}</ol>`,
        ctl: [{ k: "sec", label: "Section", min: 0, max: 5, step: 1, fmt: (i) => `${i + 1} of 6` }],
        live: (v) => `**${MRC[v.sec][0]}.** ${MRC[v.sec][1]}`
      },
      {
        h: "Find it on the slip",
        say: "A following underwriter wants to know whether the leader can agree a change of address without asking everyone.",
        scene: () => `<ol class="k-recap">${MRC.map((m) => `<li>${m[0]}</li>`).join("")}</ol>`,
        ask: {
          q: "Which section answers that?",
          opts: ["Risk details.", "Security details.", "Subscription agreement."],
          a: 2,
          why: "The subscription agreement sets out the leader’s authority. Many slips adopt the **General Underwriters’ Agreement** (GUA), a standard scheme sorting changes into those the leader agrees alone, those needing the agreement parties, and those needing every insurer."
        }
      },
      {
        h: "On risk, and certain",
        say: "An insurer is **on risk** from the agreed inception date once it has put its line down, whether or not the paperwork is finished. Its written line may later be signed down.\n\n**Contract certainty** means the full terms are agreed by the time the insurer commits, and the contract documents reach the insured promptly afterwards. It replaced the old habit of “deal now, detail later”.",
        scene: () => bars([
          { label: "Deal now, detail later", right: "dispute waiting", segs: [[30, "c1", "Bound"], [70, "hole", "Wording still argued when the claim arrives"]] },
          { label: "Contract certainty", right: "", segs: [[30, "c2", "Terms agreed"], [70, "c1", "Bound, wording known"]] }
        ], { max: 100 }),
        ask: {
          q: "A risk is bound on the 1st with wording “to be agreed”. A loss happens on the 5th. What is the problem?",
          opts: ["There is no cover until the wording is agreed.", "There is cover, but nobody can say for certain on what terms."],
          a: 1,
          why: "The insurers are on risk. But each side will now argue for the wording that suits it. Contract certainty exists to stop exactly this."
        }
      },
      {
        h: "Four kinds of term",
        say: "Policy terms differ in what happens when they are breached. Getting the label right matters a great deal at claim time.",
        scene: (v) => `<ol class="k-recap">${TERMS.map((m, i) => `<li${i === v.term ? ' style="font-weight:600"' : ' style="opacity:.55"'}>${m[0]}</li>`).join("")}</ol>`,
        ctl: [{ k: "term", label: "Term", opts: ["Condition", "Precedent", "Warranty", "Exclusion"] }],
        live: (v) => `**${TERMS[v.term][0]}.** ${TERMS[v.term][1]}`
      },
      {
        h: "A broken warranty",
        say: "A warehouse policy warrants that the burglar alarm is working. It runs for a year. The alarm fails on day 100 and is repaired on day 130. Move the date of a theft.",
        scene: (v) => {
          const inBreach = v.day >= 100 && v.day < 130;
          return stats([["Theft on", `day ${v.day}`], ["Claim", inBreach ? "Not paid" : "Paid", inBreach ? "bad" : "good"]]) +
            bars([{ label: "The policy year", segs: [[100, "c1", "Cover"], [30, "hole", "Suspended"], [235, "c1", "Cover restored"]] }], { max: 365, marks: [[v.day, "Theft"]] });
        },
        ctl: [{ k: "day", label: "Day of the theft", min: 10, max: 360, step: 10, fmt: (x) => `day ${x}` }],
        live: (v) => (v.day >= 100 && v.day < 130 ? "The loss fell while the warranty was breached, so cover was **suspended** and the insurer need not pay."
          : v.day >= 130 ? "The alarm had been fixed, so cover was back. Before the Insurance Act 2015 a breach ended cover for good, even after repair."
            : "No breach yet: an ordinary claim.")
      },
      {
        h: "How a contract ends",
        say: "Most policies end by **expiry**: the period runs out. They can also end by **cancellation**, where the policy allows either side to give notice, and by **fulfilment**: the insurer has done everything it promised, for example by paying a total loss.",
        scene: () => flow({
          h: 130,
          nodes: [
            { id: "e", x: 4, y: 40, w: 104, label: "Expiry", sub: "Time runs out" },
            { id: "c", x: 118, y: 40, w: 104, label: "Cancellation", sub: "Notice given" },
            { id: "f", x: 232, y: 40, w: 104, label: "Fulfilment", sub: "Promise performed", tone: "c1" }
          ]
        }),
        ask: {
          q: "A ship insured for £20m sinks in month three and the insurers pay £20m. What has happened to the policy?",
          opts: ["It runs on for nine more months.", "It has ended by fulfilment."],
          a: 1,
          why: "The insurers have paid everything the contract could ever require. Nothing is left to insure, and normally none of the premium comes back."
        }
      },
      {
        h: "In five lines",
        say: "Next: letting someone else hold the pen.",
        scene: () => recap([
          "Consumers answer honestly; businesses must volunteer a fair presentation.",
          "Careless breach: a proportionate remedy. Deliberate or reckless: avoidance.",
          "The MRC has six fixed sections; the GUA governs who agrees changes.",
          "Contract certainty: terms agreed before the insurer commits.",
          "A breached warranty suspends cover until it is remedied."
        ])
      }
    ]
  });
})();
