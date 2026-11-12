/* LM2 · 4 — Intermediaries */
(() => {
  const { bars, flow, stats, recap, pct, num } = window.SLIP.kit;

  window.SLIP.chapters.push({
    id: "intermediaries", part: "LM2",
    title: "Intermediaries",
    blurb: "The broking chain, what agents and principals owe each other, TOBAs, client money and how brokers are paid.",
    minutes: 9,
    init: { brk: 20, share: 50, fee: 0 },
    steps: [
      {
        h: "A chain of brokers",
        say: "A London risk often passes through two brokers. The **retail** broker has the client. It is also the **producing** broker, because it produces the business. The **wholesale** or **placing** broker has the access to underwriters.\n\nOne firm can be both.",
        scene: () => flow({
          h: 250,
          nodes: [
            { id: "c", x: 95, y: 4, label: "Client", sub: "A manufacturer in Ohio", tone: "ink" },
            { id: "r", x: 95, y: 68, label: "Retail broker", sub: "Producing: has the client" },
            { id: "w", x: 95, y: 132, label: "Wholesale broker", sub: "Placing: has the market", tone: "c1" },
            { id: "u", x: 95, y: 196, label: "London underwriters" }
          ],
          edges: [["c", "r"], ["r", "w"], ["w", "u"]]
        }),
        ask: {
          q: "The Ohio risk can only be written in London as non-admitted business. Which specialist must be in the chain?",
          opts: [
          ["A tied agent.", "A tied agent sells for particular insurers. It has no role in accessing non-admitted markets."],
          "A surplus lines broker.",
          ["A members’ agent.", "Members’ agents advise Names on which syndicates to back."],
          ["An open market correspondent.", "It introduces business to Lloyd’s but holds no US state licence to export a risk."]
        ],
          a: 1,
          why: "US states license **surplus lines brokers** to place risks with non-admitted insurers once the local market can’t or won’t write them."
        }
      },
      {
        h: "What each side owes",
        say: "Agency is a relationship of trust, with duties in both directions.\n\nThe **agent** must follow instructions, use proper skill and care, act in good faith, and account for money it handles. The **principal** must pay the agreed remuneration and indemnify the agent for costs properly incurred.",
        scene: () => flow({
          h: 130,
          nodes: [
            { id: "a", x: 4, y: 40, w: 150, label: "Agent", sub: "Obey · care · good faith · account", tone: "c1" },
            { id: "p", x: 186, y: 40, w: 150, label: "Principal", sub: "Pay · indemnify", tone: "ink" }
          ],
          edges: [["a", "p", "", { dy: -9 }], ["p", "a", "", { dy: 9 }]]
        }),
        ask: {
          q: "A broker picks the dearer of two identical quotes because that insurer quietly pays it an extra bonus. Which duty is broken?",
          opts: [
          ["Skill and care.", "It knew exactly what it was doing. This wasn’t carelessness."],
          "Good faith.",
          ["Obedience to instructions.", "The client’s instruction was to arrange cover, and cover was arranged."],
          ["None, since the cover is the same.", "The client paid more than it needed to, for the broker’s benefit."]
        ],
          a: 1,
          why: "An agent must not put its own interest above its principal’s or profit secretly from its position. Rules now require brokers to be open about what they earn and about any ties to an insurer."
        }
      },
      {
        h: "Agents of the insurer",
        say: "Not every intermediary works for the buyer. A **tied agent** represents insurers: a **single-tied** agent sells for one insurer only; a **multi-tied** agent for several, but only one product from each.\n\nAnd a broker holding a **delegated authority** is the insurer’s agent whenever it uses it.",
        scene: () => flow({
          h: 150,
          nodes: [
            { id: "b", x: 4, y: 4, w: 150, label: "Independent broker", sub: "Agent of the client", tone: "c1" },
            { id: "t", x: 186, y: 4, w: 150, label: "Tied agent", sub: "Agent of the insurer", tone: "c2" },
            { id: "d", x: 95, y: 100, label: "Broker with a binder", sub: "Both, at different moments", tone: "bad" }
          ],
          edges: [["b", "d"], ["t", "d"]]
        }),
        ask: {
          q: "A broker binds its own client’s risk under a binding authority it holds from an insurer. What must it do?",
          opts: [
          ["Nothing special.", "For that moment it is advising the buyer and accepting for the seller."],
          "Recognise the conflict, manage it and disclose it to the client.",
          ["Refuse: a broker may never use its own binder for a client.", "It may, and often the binder is the best home for the risk. The duty is to handle the conflict, not to avoid the business."],
          ["Charge no commission on that risk.", "Pay isn’t the issue. Whose interests it is serving is."]
        ],
          a: 1,
          why: "Conflicts aren’t forbidden. They must be identified, managed and made clear, so the client knows the broker is wearing two hats and can judge the advice accordingly."
        }
      },
      {
        h: "The TOBA",
        say: "A **Terms of Business Agreement** sets out how two firms deal with each other: broker and client, broker and insurer, broker and producing broker.\n\nSome insurer TOBAs grant **risk transfer**: the broker holds premium *as the insurer’s agent*. So once the client has paid the broker, the insurer is treated as paid.",
        scene: () => flow({
          h: 150,
          nodes: [
            { id: "c", x: 4, y: 4, w: 150, label: "Client" },
            { id: "i", x: 186, y: 4, w: 150, label: "Insurer" },
            { id: "b", x: 95, y: 100, label: "Broker", sub: "Holds premium for the insurer", tone: "c1" }
          ],
          edges: [["c", "b", "pays"], ["b", "i", "risk transfer", { dash: true }]]
        }),
        ask: {
          q: "A client pays its premium to the broker. The broker collapses before passing it on. Is the client still insured?",
          opts: [
          ["No. The insurer never received the money.", "True without risk transfer. With it, the broker held the money as the insurer’s agent."],
          "Only if the TOBA gave the broker risk transfer.",
          ["Yes, always. Paying your broker is paying your insurer.", "Only where the insurer has agreed that. Otherwise the client may have to pay twice."],
          ["Yes, but only for half the cover.", "There is no halfway. Either the insurer is treated as paid or it isn’t."]
        ],
          a: 1,
          why: "With **risk transfer**, payment to the broker counts as payment to the insurer, and the broker’s failure is the insurer’s loss. Without it, the unpaid insurer can look to the client again."
        }
      },
      {
        h: "Client money",
        say: "Money a broker holds for others is not its own. FCA rules require it to be kept in **segregated client accounts**, apart from the firm’s own funds, and limit what can be done with it.\n\nIn particular, the rules control when a broker may fund one client’s premium, or pay a claim, before the money has actually arrived.",
        scene: (v) => bars([
  { label: "Client account, held on trust", right: "£5m", segs: [[5, "c1", "Clients’ and insurers’ money"]] },
  { label: "The broker’s own account", right: "£1m", segs: [[1, "ink"]] },
  { label: "Owed to the bank", right: v.$done ? "recovers £1m of £8m" : "£8m", segs: v.$done ? [[1, "ink"], [7, "hole", "Unpaid"]] : [[8, "bad", "£8m"]] }
], { max: 8 }),
        ask: {
          q: "A broker fails owing its bank £8m. Its client account holds £5m and its own office account £1m. How much can the bank reach?",
          fix: true,
          opts: [
          ["£6m", "The client account isn’t the broker’s money."],
          ["£5m", "That is precisely the money the bank can’t touch."],
          "£1m",
          ["Nothing", "The office account is the firm’s own, and its creditors can claim it."]
        ],
          a: 2,
          why: "Client money is held on trust in segregated accounts, so it survives the broker’s failure. Only the firm’s own money, including brokerage it has already earned, is available to its creditors."
        }
      },
      {
        h: "How brokers are paid",
        say: "Usually by **brokerage**: a percentage of the gross premium that the insurer lets the broker deduct. Sometimes by a **fee** agreed with the client. And by charges for extra services, such as engineering or claims advice.\n\nThe insurers need £400k net. Split a brokerage between two brokers.",
        scene: (v) => {
          const gross = 400 / (1 - v.brk / 100), b = gross - 400, retail = (b * v.share) / 100;
          return stats([["Client pays", `£${num(gross, 0)}k`], ["Placing broker", `£${num(b - retail, 0)}k`, "c2"], ["Retail broker", `£${num(retail, 0)}k`, "c3"]]) +
            bars([{ label: "Gross premium", right: `£${num(gross, 0)}k`, segs: [[400, "c1", "Insurers"], [b - retail, "c2", "Placing"], [retail, "c3", "Retail"]] }], { max: gross });
        },
        ctl: [{ k: "brk", label: "Total brokerage", min: 5, max: 35, step: 2.5, fmt: (x) => pct(x, 1) }, { k: "share", label: "Retail broker’s share of it", min: 0, max: 80, step: 10, fmt: pct }],
        live: (v) => "Changing the split between the brokers doesn’t change what the client pays. Raising the total does. Either way it is the client’s money, which is why disclosure of remuneration matters.",
        goal: {
          say: "The insurers need £400k net. Arrange things so the client pays exactly £500k and the retail broker earns £60k.",
          test: (v) => v.brk === 20 && v.share === 60,
          done: "20% brokerage, split 60:40. Notice which of the two sliders the client can feel. It is why regulators ask brokers to disclose the total, not just their own slice."
        }
      },
      {
        h: "The rulebook for distributors",
        say: "European rules on selling insurance, first the Insurance Mediation Directive and then the **Insurance Distribution Directive**, are written into UK regulation.\n\nThe essentials: brokers must be registered and competent; what they tell customers must be **clear, fair and not misleading**; and they must act **honestly, fairly and professionally in the customer’s best interests**.",
        scene: () => recap(["Registered and authorised", "Competent, with continuing training", "Clear, fair and not misleading", "In the customer’s best interests", "Transparent about pay and insurer ties"]),
        ask: {
          q: "A brochure says a policy “covers all flood damage”. The wording excludes coastal flooding. Which standard has been breached?",
          opts: [
          ["Competence and training.", "The staff may be well trained. The document is the problem."],
          "Clear, fair and not misleading.",
          ["Registration.", "The firm may be properly authorised and still mislead."],
          ["None: the wording is what counts.", "Legally the wording governs the claim. The regulator still punishes the misleading promotion."]
        ],
          a: 1,
          why: "Everything a distributor tells a customer, including marketing, must be **clear, fair and not misleading**. A true wording doesn’t cure a misleading brochure."
        }
      },
      {
        h: "In five lines",
        say: "Next: the view from the other side of the box.",
        scene: () => recap([
          "Retail (producing) brokers hold the client; wholesale (placing) brokers hold the market.",
          "Agents owe obedience, skill, good faith and an account; principals owe pay and indemnity.",
          "Tied agents and binder-holding brokers act for insurers.",
          "Risk transfer: paying the broker counts as paying the insurer.",
          "Client money is segregated and survives the broker’s failure."
        ])
      }
    ]
  });
})();
