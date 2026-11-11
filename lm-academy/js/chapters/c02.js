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
          q: "An underwriter says: “I’ll write it, but with a £50,000 excess instead of £25,000.” Is that acceptance?",
          opts: ["Yes. They agreed to write it.", "No. It is a new offer."],
          a: 1,
          why: "Acceptance must match the offer exactly. Changing a term kills the original offer and replaces it with a **counter-offer**, which the other side may now accept or refuse."
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
          q: "A warehouse keeper stores customers’ goods it doesn’t own. Can it insure them?",
          opts: ["No. Only the owner can.", "Yes. It is responsible for them, so it stands to lose."],
          a: 1,
          why: "Insurable interest does **not** require ownership. Anyone with a legal or financial stake has one: an owner, a lender, a tenant, someone holding goods for others."
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
          q: "A homeowner isn’t asked about a past subsidence claim and doesn’t mention it. Have they broken their duty?",
          opts: ["Yes. They should have volunteered it.", "No. A consumer need only take reasonable care answering the questions asked."],
          a: 1,
          why: "The **Consumer Insurance (Disclosure and Representations) Act 2012** puts the burden on the insurer to ask. A business is different: under the **Insurance Act 2015** it must volunteer everything material in a *fair presentation*."
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
          opts: ["Yes. Fire destroyed the ship, and fire is covered.", "Only if fire, not the attack, was the dominant cause."],
          a: 1,
          why: "Picture dominoes: the last one hits the table, but the cause is whatever pushed the first. If the attack set an unbroken chain in motion, this is a war loss and the exclusion bites."
        }
      },
      {
        h: "Indemnity",
        say: "**Indemnity** means putting the insured back where they were before the loss. No better, no worse. It can be done by **cash, repair, replacement or reinstatement**.\n\nSome policies can’t indemnify, because nobody can price a lost limb. Accident and health policies pay a fixed scale instead: they are **benefit policies**.",
        scene: () => flow({
          h: 130,
          nodes: [
            { id: "i", x: 95, y: 4, label: "Indemnity", sub: "Back where you were", tone: "ink" },
            { id: "a", x: 4, y: 84, w: 78, label: "Cash" }, { id: "b", x: 88, y: 84, w: 78, label: "Repair" }, { id: "c", x: 172, y: 84, w: 78, label: "Replace" }, { id: "d", x: 256, y: 84, w: 80, label: "Reinstate" }
          ],
          edges: [["i", "a"], ["i", "b"], ["i", "c"], ["i", "d"]]
        }),
        ask: {
          q: "A five-year-old laptop is stolen. Strict indemnity pays for…",
          opts: ["A brand-new one.", "The value of a five-year-old laptop."],
          a: 1,
          why: "A new one would leave the owner better off. Policies often *modify* indemnity by agreement: “new for old” cover gives more, while an excess or a limit gives less."
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
          : `The owner paid premium on only ${pct((v.si / 50) * 100)} of the value, so only ${pct((v.si / 50) * 100)} of **any** loss is paid. This is **average**. The pool is only fair if everyone pays in for the risk they really bring.`)
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
          q: "Can the insurer chase the contractor before it has paid the claim?",
          opts: ["Yes, to save time.", "No. It must indemnify the insured first."],
          a: 1,
          why: "The right arises from having paid. Indemnify first, then subrogate. And the insurer can only recover what it paid out, not make a profit on the claim."
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
