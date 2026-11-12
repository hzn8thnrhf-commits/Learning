/* LM1 · 2 — The contract and its principles */
(() => {
  const { bars, flow, stats, recap, money, pct } = window.SLIP.kit;

  window.SLIP.chapters.push({
    id: "principles", part: "LM1",
    title: "The contract and its principles",
    blurb: "Offer, acceptance, consideration, and the five principles every claim is tested against.",
    minutes: 10,
    init: { si: 30, a: 10, b: 5, loss: 6 },
    steps: [
      {
        h: "Three ingredients",
        say: "An insurance policy is a contract, and a contract needs three things.\n\n**Offer**: one side proposes terms. **Acceptance**: the other agrees to exactly those terms. **Consideration**: each side gives something of value. Here, the insured’s premium for the insurer’s promise to pay claims.\n\nMiss one and no contract ever existed.",
        scene: () => flow({
          h: 130,
          nodes: [
            { id: "o", x: 4, y: 4, w: 104, label: "Offer" }, { id: "a", x: 118, y: 4, w: 104, label: "Acceptance" }, { id: "c", x: 232, y: 4, w: 104, label: "Consideration" },
            { id: "k", x: 70, y: 84, w: 200, label: "A valid contract", tone: "good" }
          ],
          edges: [["o", "k"], ["a", "k"], ["c", "k"]]
        }),
        ask: {
          q: "A broker offers a risk with a £25,000 excess. The underwriter replies: “I’ll write it, but with a £50,000 excess.” Where do things stand?",
          opts: [
          ["A contract exists at £50,000.", "The broker hasn’t agreed to £50,000. Nobody has accepted anything yet."],
          ["A contract exists at £25,000.", "The underwriter never agreed to £25,000."],
          "No contract. The underwriter has made a counter-offer.",
          ["A contract exists; the excess will be settled later.", "With a term this important still open, there is no agreement to enforce."]
        ],
          a: 2,
          why: "Acceptance must match the offer exactly. Changing a term kills the original offer and replaces it with a **counter-offer**, which the broker’s client may now accept or refuse."
        }
      },
      {
        h: "Insurable interest",
        say: "You can only insure something if you would **lose financially** when it is damaged, or when it makes you liable to others. That link is **insurable interest**.\n\nWithout it, a policy would be a bet on a stranger’s misfortune.",
        scene: () => flow({
          h: 150,
          nodes: [
            { id: "o", x: 4, y: 4, w: 104, label: "Owner" }, { id: "b", x: 118, y: 4, w: 104, label: "Bank", sub: "Lent against it" }, { id: "w", x: 232, y: 4, w: 104, label: "Warehouse", sub: "Stores it" },
            { id: "g", x: 95, y: 100, label: "The goods", tone: "ink" }
          ],
          edges: [["o", "g"], ["b", "g"], ["w", "g"]]
        }),
        ask: {
          q: "Which of these has **no** insurable interest in a warehouse?",
          opts: [
          ["The bank that lent money against it.", "If it burns, the bank’s security is gone. That is a financial stake."],
          ["A tenant obliged by its lease to repair it.", "The tenant would have to pay for repairs: a legal liability, so an interest."],
          ["A firm storing customers’ goods inside.", "It is responsible for those goods, so it stands to lose."],
          "A rival firm that would win customers if it burned."
        ],
          a: 3,
          why: "Insurable interest means you would **lose** if the thing were damaged. It doesn’t require ownership: lenders, tenants and bailees all have it. Someone who would *gain* from the loss has the opposite, and a policy for them would be a bet with a motive."
        }
      },
      {
        h: "Good faith",
        say: "The buyer knows the risk far better than the insurer can. So insurance contracts demand **good faith** from both sides: honesty and openness about what matters.\n\nHow much the buyer must volunteer depends on who they are.",
        scene: () => flow({
          h: 150,
          nodes: [
            { id: "g", x: 95, y: 4, label: "Good faith", sub: "A two-way duty", tone: "ink" },
            { id: "c", x: 4, y: 96, w: 150, label: "Consumers", sub: "Answer questions carefully" },
            { id: "b", x: 186, y: 96, w: 150, label: "Businesses", sub: "Make a fair presentation", tone: "c1" }
          ],
          edges: [["g", "c", "2012 Act"], ["g", "b", "2015 Act"]]
        }),
        ask: {
          q: "Neither a homeowner nor a factory owner is asked about a past subsidence claim. Neither mentions it. Who has broken their duty?",
          opts: [
          ["Both.", "The homeowner was never asked. A consumer’s duty is to answer honestly, not to guess what matters."],
          ["Neither.", "A business can’t wait to be asked."],
          "Only the factory owner.",
          ["Only the homeowner.", "It is the other way round: the law asks less of consumers, not more."]
        ],
          a: 2,
          why: "A **consumer** need only take reasonable care answering the questions asked (the 2012 Act), so the burden is on the insurer to ask. A **business** must volunteer everything material in a *fair presentation* (the Insurance Act 2015)."
        }
      },
      {
        h: "Proximate cause",
        say: "Whether a loss is covered depends on its **proximate cause**: the dominant, most powerful cause. Not necessarily the last thing to happen.\n\nA ship’s crew are fighting off an armed attack when fire breaks out and destroys the vessel. The policy **excludes war risks**.",
        scene: () => flow({
          h: 150,
          nodes: [
            { id: "a", x: 4, y: 4, w: 150, label: "Armed attack", sub: "Excluded", tone: "bad" },
            { id: "f", x: 186, y: 4, w: 150, label: "Fire", sub: "Covered" },
            { id: "l", x: 95, y: 100, label: "Ship destroyed", tone: "ink" }
          ],
          edges: [["a", "f", "leads to"], ["f", "l"], ["a", "l"]]
        }),
        ask: {
          q: "Does the policy pay?",
          opts: [
          ["Yes. Fire destroyed the ship and fire is covered.", "The last thing to happen isn’t automatically the cause."],
          ["No. The attack came first, so it is the cause.", "First in time isn’t the test either."],
          "It depends which was the dominant cause.",
          ["Half, since two causes were at work.", "Proximate cause picks one dominant cause. It doesn’t split the difference."]
        ],
          a: 2,
          why: "Picture dominoes: the cause is whatever started an **unbroken** chain. If the attackers set the fire, the attack is the proximate cause and the war exclusion bites. If a galley fire broke out by coincidence during the attack, fire is the cause and the policy pays."
        }
      },
      {
        h: "Indemnity",
        say: "**Indemnity** means putting the insured back where they were before the loss. No better, no worse. It can be done by **cash, repair, replacement or reinstatement**.\n\nSome policies can’t indemnify, because nobody can price a lost limb. Accident and health policies pay a fixed scale instead: they are **benefit policies**.",
        scene: (v) => bars([
  { label: "What it cost, five years ago", right: "£1,200", segs: [[1200, "idle"]] },
  { label: "The same model, new, today", right: v.$done ? "£1,000 · betterment" : "£1,000", segs: [[1000, "idle"]] },
  { label: "A five-year-old one, today", right: v.$done ? "£250 · the indemnity" : "£250", segs: [[250, v.$done ? "c1" : "idle"]] }
], { max: 1200 }),
        ask: {
          q: "A laptop bought for £1,200 five years ago is stolen. The same model costs £1,000 new today. A five-year-old one sells for £250. What does strict indemnity pay?",
          fix: true,
          opts: [
          ["£1,200", "What it cost is history. Indemnity looks at the loss on the day."],
          ["£1,000", "A new laptop would leave the owner better off than before the theft."],
          "£250"
        ],
          a: 2,
          why: "The owner lost a five-year-old laptop, worth £250. Policies often *modify* indemnity by agreement: “new for old” cover would pay £1,000, while an excess or a limit pays less."
        }
      },
      {
        h: "Indemnity’s sharp edge",
        say: "A warehouse would cost **£50m** to rebuild. To save premium its owner insures it for less. A fire then does **£10m** of damage, comfortably inside the sum insured.",
        scene: (v) => {
          const ratio = Math.min(1, v.si / 50), paid = 10 * ratio;
          return stats([["Insured to", pct(ratio * 100), ratio < 1 ? "bad" : "good"], ["Paid", money(paid)], ["Owner bears", money(10 - paid), ratio < 1 ? "bad" : ""]]) +
            bars([
              { label: "Sum insured against true value", right: `${money(v.si)} of £50m`, segs: [[ratio * 100, "c1", "Insured"], [100 - ratio * 100, "hole"]] },
              { label: "The £10m claim", right: `${money(paid)} paid`, segs: [[ratio * 100, "c1", "Paid"], [100 - ratio * 100, "hole"]] }
            ], { max: 100 });
        },
        ctl: [{ k: "si", label: "Sum insured", min: 10, max: 50, step: 5, fmt: money }],
        live: (v) => (v.si >= 50 ? "Insured to full value, so the claim is paid in full."
          : `The owner paid premium on only ${pct((v.si / 50) * 100)} of the value, so only ${pct((v.si / 50) * 100)} of **any** loss is paid. This is **average**. The pool is only fair if everyone pays in for the risk they really bring.`),
        goal: {
          say: "The owner needs at least £8m of this £10m claim paid. Find the lowest sum insured that achieves it.",
          test: (v) => v.si === 40,
          done: "£40m. Insured for 80% of value, paid 80% of the loss. The saving on premium is repaid, with interest, in every claim."
        }
      },
      {
        h: "Contribution",
        say: "Suppose two policies cover the same thing against the same peril. The insured can’t collect twice: that would beat indemnity. The insurers **share** the loss rateably. That is **contribution**.\n\nSet each policy’s limit and the size of the loss.",
        scene: (v) => {
          const ia = Math.min(v.loss, v.a), ib = Math.min(v.loss, v.b), both = ia + ib;
          const sa = both >= v.loss ? (v.loss * ia) / both : ia, sb = both >= v.loss ? (v.loss * ib) / both : ib;
          return stats([["Insurer A pays", money(sa), "c1"], ["Insurer B pays", money(sb), "c2"], ["Insured gets", money(sa + sb)]]) +
            bars([{ label: "The loss", right: money(v.loss), segs: [[sa, "c1", "A"], [sb, "c2", "B"], [v.loss - sa - sb, "hole"]] }], { max: v.loss });
        },
        ctl: [{ k: "loss", label: "The loss", min: 1, max: 20, step: 1, fmt: money }, { k: "a", label: "Policy A’s limit", min: 1, max: 20, step: 1, fmt: money }, { k: "b", label: "Policy B’s limit", min: 1, max: 20, step: 1, fmt: money }],
        live: (v) => {
          const ia = Math.min(v.loss, v.a), ib = Math.min(v.loss, v.b);
          return ia + ib >= v.loss
            ? `Alone, A would owe ${money(ia)} and B ${money(ib)}. They share in that ratio, and the insured receives ${money(v.loss)} once, not ${money(ia + ib)}.`
            : "Together the two limits still fall short of the loss, so each pays in full and the insured bears the rest.";
        },
        goal: {
          say: "Set the loss to £12m. Then choose limits so that Insurer A pays exactly three times what Insurer B pays, and the insured is paid in full.",
          test: (v) => { const ia = Math.min(v.loss, v.a), ib = Math.min(v.loss, v.b); return v.loss === 12 && ia + ib >= 12 && ia === 3 * ib; },
          done: "Each insurer’s share follows what it would have paid had it been alone: £9m against £3m. Now push both limits above £12m and they share equally, because each alone would have paid everything."
        }
      },
      {
        h: "Subrogation",
        say: "A contractor’s carelessness burns down your warehouse. Your insurer pays you. Now your insurer may step into your shoes and pursue the contractor to get its money back. That right is **subrogation**.\n\nLike contribution, it exists to protect indemnity: you can’t be paid by your insurer *and* keep damages from the wrongdoer.",
        scene: () => flow({
          h: 150,
          nodes: [
            { id: "i", x: 4, y: 4, w: 104, label: "Insurer" }, { id: "y", x: 118, y: 4, w: 104, label: "Insured" }, { id: "c", x: 232, y: 4, w: 104, label: "Contractor", sub: "At fault", tone: "bad" },
            { id: "r", x: 70, y: 100, w: 200, label: "Insurer recovers from contractor", tone: "c1" }
          ],
          edges: [["i", "y", "1. pays"], ["i", "r"], ["r", "c", "2. pursues"]]
        }),
        ask: {
          q: "A £100,000 loss. The insured bears a £20,000 excess and the insurer pays £80,000. The insurer then recovers the full £100,000 from the contractor. How much may the insurer keep?",
          fix: true,
          opts: [
          ["All £100,000.", "That would be a £20,000 profit on the claim. Subrogation only makes the insurer whole."],
          "£80,000. The other £20,000 goes to the insured.",
          ["Nothing. Recoveries belong to the insured.", "Then the insured would be paid twice for the same loss, which is exactly what subrogation prevents."]
        ],
          a: 1,
          why: "The insurer can recover what it **paid**, no more. The right also only arises once it has paid: indemnify first, then subrogate."
        }
      },
      {
        h: "In five lines",
        say: "These five principles return in every claim you will ever see.",
        scene: () => recap([
          "A contract needs offer, acceptance and consideration.",
          "Insurable interest: you must stand to lose. Ownership isn’t required.",
          "Good faith runs both ways; businesses owe a fair presentation.",
          "Proximate cause decides if a loss is covered; indemnity decides how much.",
          "Contribution and subrogation stop the insured being paid twice."
        ])
      }
    ]
  });
})();
