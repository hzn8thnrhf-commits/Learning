/* LM2 · 4 — Intermediaries */
(() => {
  const { bars, flow, stats, recap, pct, num } = window.SLIP.kit;

  window.SLIP.chapters.push({
    id: "intermediaries", part: "LM2",
    title: "Intermediaries",
    blurb: "The chain of intermediaries, the duties of agent and principal, client money and risk transfer, and how intermediaries are paid and regulated.",
    minutes: 9,
    lead: "Almost all London Market business reaches underwriters through intermediaries. This chapter examines the legal position of each kind and the rules to which they are subject.",
    aims: [
      "Describe the chain of intermediaries through which an overseas risk reaches London.",
      "State the duties owed by agent and principal to each other.",
      "Explain risk transfer and the segregation of client money.",
      "Explain how intermediaries are remunerated and the standards required of them."
    ],
    init: { brk: 20, share: 50, fee: 0 },
    steps: [
      {
        h: "The chain of intermediaries",
        say: "A risk placed in London has frequently passed through two intermediaries. The **retail** broker deals directly with the client; it is also called the **producing** broker, since it is the source of the business. The **wholesale** or **placing** broker has access to the London underwriters and places the risk with them.\n\nA single firm may perform both functions.",
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
          why: "US states license **surplus lines brokers** to place risks with non-admitted insurers once the local market cannot or will not write them."
        }
      },
      {
        h: "The duties of agent and principal",
        say: "Agency is a **fiduciary** relationship, and the law implies duties on both sides.\n\nThe **agent** must act within its authority and follow its principal’s lawful instructions; exercise reasonable skill and care; act in good faith, avoiding any conflict between its own interest and its principal’s; and account for money received on the principal’s behalf. The **principal** must pay the agreed remuneration and indemnify the agent against liabilities properly incurred in performing the agency.",
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
          ["Skill and care.", "It knew exactly what it was doing. This was not carelessness."],
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
        say: "Not every intermediary acts for the insured. A **tied agent** acts for insurers: a **single-tied** agent for one insurer only, and a **multi-tied** agent for several, though not for competing products.\n\nA broker to whom an insurer has granted **delegated authority** acts as the agent of that insurer whenever it exercises the authority, although it remains the agent of its client in other respects.",
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
          ["Charge no commission on that risk.", "Pay is not the issue. Whose interests it is serving is."]
        ],
          a: 1,
          why: "Conflicts are not forbidden. They must be identified, managed and made clear, so the client knows the broker is wearing two hats and can judge the advice accordingly."
        }
      },
      {
        h: "Terms of business and risk transfer",
        say: "A **Terms of Business Agreement** (TOBA) records the terms on which two firms deal: broker and client, broker and insurer, or one broker and another.\n\nA TOBA between broker and insurer may provide for **risk transfer**. The broker then holds premium as the agent of the *insurer*, with the consequence that premium paid to the broker is treated as received by the insurer.",
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
          ["Yes, but only for half the cover.", "There is no halfway. Either the insurer is treated as paid or it is not."]
        ],
          a: 1,
          why: "With **risk transfer**, payment to the broker counts as payment to the insurer, and the broker’s failure is the insurer’s loss. Without it, the unpaid insurer can look to the client again."
        }
      },
      {
        h: "Client money",
        say: "Money that a broker holds on behalf of clients or insurers does not belong to the broker. The FCA’s client money rules require it to be held on trust in **segregated client accounts**, separately from the firm’s own money, and restrict the purposes for which it may be used.\n\nIn particular the rules govern the circumstances in which a broker may **fund** a transaction, by paying a premium or a claim before it has itself been put in funds.",
        scene: (v) => bars([
  { label: "Client account, held on trust", right: "£5m", segs: [[5, "c1", "Clients’ and insurers’ money"]] },
  { label: "The broker’s own account", right: "£1m", segs: [[1, "ink"]] },
  { label: "Owed to the bank", right: v.$done ? "recovers £1m of £8m" : "£8m", segs: v.$done ? [[1, "ink"], [7, "hole", "Unpaid"]] : [[8, "bad", "£8m"]] }
], { max: 8 }),
        ask: {
          q: "A broker fails owing its bank £8m. Its client account holds £5m and its own office account £1m. How much can the bank reach?",
          fix: true,
          opts: [
          ["£6m", "The client account is not the broker’s money."],
          ["£5m", "That is precisely the money the bank cannot touch."],
          "£1m",
          ["Nothing", "The office account is the firm’s own, and its creditors can claim it."]
        ],
          a: 2,
          why: "Client money is held on trust in segregated accounts, so it survives the broker’s failure. Only the firm’s own money, including brokerage it has already earned, is available to its creditors."
        }
      },
      {
        h: "Remuneration",
        say: "A broker is most commonly remunerated by **brokerage**: a percentage of the gross premium, deducted with the insurer’s agreement. It may instead, or in addition, charge the client a **fee**, and it may be paid separately for ancillary services such as risk engineering or claims consultancy.\n\nThe insurers require £400,000 net. Divide the brokerage between a placing broker and a retail broker.",
        scene: (v) => {
          const gross = 400 / (1 - v.brk / 100), b = gross - 400, retail = (b * v.share) / 100;
          return stats([["Client pays", `£${num(gross, 0)}k`], ["Placing broker", `£${num(b - retail, 0)}k`, "c2"], ["Retail broker", `£${num(retail, 0)}k`, "c3"]]) +
            bars([{ label: "Gross premium", right: `£${num(gross, 0)}k`, segs: [[400, "c1", "Insurers"], [b - retail, "c2", "Placing"], [retail, "c3", "Retail"]] }], { max: gross });
        },
        ctl: [{ k: "brk", label: "Total brokerage", min: 5, max: 35, step: 2.5, fmt: (x) => pct(x, 1) }, { k: "share", label: "Retail broker’s share of it", min: 0, max: 80, step: 10, fmt: pct }],
        live: (v) => "Changing the split between the brokers does not change what the client pays. Raising the total does. Either way it is the client’s money, which is why disclosure of remuneration matters.",
        goal: {
          say: "The insurers need £400k net. Arrange things so the client pays exactly £500k and the retail broker earns £60k.",
          test: (v) => v.brk === 20 && v.share === 60,
          done: "20% brokerage, split 60:40. Notice which of the two sliders the client can feel. It is why regulators ask brokers to disclose the total, not just their own slice."
        }
      },
      {
        h: "Conduct standards",
        say: "The conduct of intermediaries is governed by FCA rules that give effect to European legislation, formerly the Insurance Mediation Directive and now the **Insurance Distribution Directive**, which remains part of UK law.\n\nIn summary, a distributor must be authorised and competent; its communications with customers must be **clear, fair and not misleading**; and it must act **honestly, fairly and professionally in accordance with the best interests of its customer**.",
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
          why: "Everything a distributor tells a customer, including marketing, must be **clear, fair and not misleading**. A true wording does not cure a misleading brochure."
        }
      },
      {
        h: "Summary",
        say: "The next chapter turns from the intermediary to the underwriter.",
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
