/* LM3 · 2 — Contracts and wordings */
(() => {
  const { bars, flow, stats, recap, money } = window.SLIP.kit;

  window.SLIP.chapters.push({
    id: "wording", part: "LM3",
    title: "Contracts and wordings",
    blurb: "The parties to the contract, the drafting of wordings and the dangers of amendment, and the principles of interpretation.",
    minutes: 8,
    lead: "What an insurer has agreed to pay is determined by the words of the contract. This chapter considers who is party to it, how it is drafted, and how a court will read it.",
    aims: [
      "Identify the parties to an insurance contract and distinguish joint from composite insurance.",
      "Explain the rights that statute gives to third parties.",
      "Explain the risks of amending model wordings and the purpose of clauses such as service of suit.",
      "State the approach of the courts to the interpretation of a policy."
    ],
    init: { kind: 0, clause: 0 },
    steps: [
      {
        h: "The parties",
        say: "The parties to an insurance contract are the **insured** and the **insurers**. Others influence its terms without being party to it: the broker, lenders who require the insurance as a condition of finance, and regulators.\n\nThe insured must be identified accurately. Each company in a group is a separate legal person, and a subsidiary that is neither named nor brought within the definition of the insured has no cover.",
        scene: () => flow({
          h: 170,
          nodes: [
            { id: "i", x: 4, y: 4, w: 150, label: "The insured", sub: "Named exactly", tone: "c1" },
            { id: "u", x: 186, y: 4, w: 150, label: "The insurers", tone: "c1" },
            { id: "b", x: 4, y: 110, w: 104, label: "Broker" }, { id: "l", x: 118, y: 110, w: 104, label: "Lender" }, { id: "r", x: 232, y: 110, w: 104, label: "Regulator" }
          ],
          edges: [["i", "u", "contract"]]
        }),
        ask: {
          q: "A policy insures “Harbour Foods Ltd”. Fire destroys a warehouse owned by its subsidiary, Harbour Cold Stores Ltd. Is the loss covered?",
          opts: [
          ["Yes. It is the same group.", "A group is not a legal person. Each company in it is."],
          "Not unless the subsidiary is also an insured.",
          ["Yes, because the parent owns the subsidiary’s shares.", "Owning shares in a company is not owning its warehouse."],
          ["Yes, if the premium was calculated on group values.", "Evidence of what was intended, perhaps. But the policy insures who it says it insures."]
        ],
          a: 1,
          why: "Each company is a separate legal person with its own insurable interest. Wordings solve this with a wide definition of the insured, such as “and subsidiary companies”, but only if someone remembers to include it."
        }
      },
      {
        h: "Joint and composite insurance",
        say: "Where a policy insures more than one person, the nature of their interests determines the effect of misconduct by one of them.\n\nUnder a **joint** policy the insureds share a single, indivisible interest, as co-owners of a property do, and the policy is one contract: a defence available against one is available against all. Under a **composite** policy the insureds have distinct interests, as an owner and its mortgagee do, and the policy is treated as a bundle of separate contracts, each of which stands alone.",
        scene: (v) => {
          const comp = v.kind === 1;
          return stats([["Guilty party", "Nothing", "bad"], ["Innocent party", comp ? "Paid" : "Nothing", comp ? "good" : "bad"]]) +
            flow({
              h: 130,
              nodes: [
                { id: "a", x: 4, y: 4, w: 150, label: "Insured A", sub: "Set the fire", tone: "bad" },
                { id: "b", x: 186, y: 4, w: 150, label: "Insured B", sub: "Knew nothing", tone: comp ? "good" : "bad" },
                { id: "p", x: 95, y: 84, label: comp ? "Two interests" : "One shared interest", tone: "ink" }
              ],
              edges: [["a", "p"], ["b", "p"]]
            });
        },
        ctl: [{ k: "kind", label: "The policy is", opts: ["Joint", "Composite"] }],
        live: (v) => (v.kind ? "**Composite.** A’s fraud defeats A’s claim only. B, the innocent bank, can still recover for its own interest." : "**Joint.** One interest, one fate. A’s wrongdoing taints the whole claim, and innocent B recovers nothing."),
        ask: {
          q: "A bank and a shipowner are both insured under one hull policy. The owner scuttles the ship. For the bank to be paid, the policy must be…",
          fix: true,
          opts: [
          ["Joint.", "Joint insureds stand or fall together. The owner’s fraud would sink the bank’s claim too."],
          "Composite.",
          ["Either: the bank is innocent.", "Innocence only helps if the bank’s interest is separate from the wrongdoer’s."]
        ],
          a: 1,
          why: "Owner and lender have **different** interests in the ship, so the policy is composite and each stands alone. This is why lenders insist on being separately insured, not merely noted."
        }
      },
      {
        h: "Rights of third parties",
        say: "Two statutes confer rights on persons who are not party to the contract.\n\nThe **Contracts (Rights of Third Parties) Act 1999** enables a third party to enforce a term intended to benefit them; as noted in LM2, it is commonly excluded. The **Third Parties (Rights against Insurers) Act 2010** cannot be excluded. Where an insured incurs a liability to a third party and becomes **insolvent**, the insured’s rights against its liability insurer in respect of that liability are transferred to the third party, who may proceed against the insurer directly.",
        scene: () => flow({
          h: 170,
          nodes: [
            { id: "v", x: 4, y: 4, w: 150, label: "Injured customer", tone: "ink" },
            { id: "f", x: 186, y: 4, w: 150, label: "The insured firm", sub: "Now insolvent", tone: "bad" },
            { id: "i", x: 95, y: 110, label: "Its liability insurer", tone: "c1" }
          ],
          edges: [["v", "f", "owed damages", { dash: true }], ["v", "i", "claims directly"]]
        }),
        ask: {
          q: "A firm injures a customer, then collapses with large debts. Without the 2010 Act, where would its liability insurance money go?",
          opts: [
          ["Straight to the injured customer.", "That is what the Act achieves. Without it, the money belongs to the insolvent firm."],
          "Into the pot for all the firm’s creditors.",
          ["Back to the insurer.", "The claim is valid, so the insurer must pay it to someone."],
          ["To the firm’s directors.", "It is the company’s asset, and so its creditors’."]
        ],
          a: 1,
          why: "The injured person would be one unsecured creditor among many, getting pennies. The Act steers the proceeds to the person the cover was really for, and it cannot be excluded."
        }
      },
      {
        h: "Wordings and their amendment",
        say: "The wording defines what has been sold. Most London contracts are built on a **model wording** whose meaning has been settled by long use and, often, by litigation. To this are added further clauses: other model clauses, or clauses drafted for the purpose by the broker or the insurer.\n\nThe principal source of dispute is amendment. A clause **copied** from another contract may rely on definitions that differ from those of the base wording, or may contradict one of its provisions.",
        scene: (v) => {
          const bad = v.clause === 1;
          return bars([
            { label: "Base wording: “Flood is excluded”", segs: [[100, "c1", "Clear"]] },
            { label: bad ? "Pasted clause: “All water damage is covered”" : "Added clause: “Burst pipes are covered”", right: bad ? "contradiction" : "consistent", segs: [[100, bad ? "bad" : "c1", bad ? "Which one wins?" : "Fits the base wording"]] }
          ], { max: 100 });
        },
        ctl: [{ k: "clause", label: "Clause added", opts: ["Drafted to fit", "Pasted in"] }],
        live: (v) => (v.clause ? "Is a flood “water damage”? The policy now says both yes and no. That ambiguity will be found on the day of the claim, and courts tend to read ambiguity **against the party who put the clause forward**." : "The addition uses the same terms as the base wording and extends cover in one defined direction. Nothing to argue about.")
      },
      {
        h: "Required clauses and side letters",
        say: "Certain clauses are included because a regulator requires them. US surplus lines business commonly requires a **service of suit** clause, by which the insurers submit to the jurisdiction of a competent US court and nominate a person in the United States to accept service of proceedings.\n\nA **side letter** records a term agreed outside the principal contract. Such letters are to be avoided: a term that does not appear in the contract documentation is inconsistent with contract certainty. Where the insured is a **consumer**, the Consumer Rights Act 2015 requires that terms be transparent and fair.",
        scene: () => flow({
          h: 130,
          nodes: [
            { id: "c", x: 4, y: 40, w: 150, label: "US policyholder" },
            { id: "l", x: 186, y: 40, w: 150, label: "London insurers", sub: "Agree to US courts", tone: "c1" }
          ],
          edges: [["c", "l", "service of suit"]]
        }),
        ask: {
          q: "Why would a US regulator insist on a service of suit clause?",
          opts: [
          ["To raise the cost of London’s paper.", "It adds little cost. Its purpose is access."],
          "So a local policyholder can sue at home, not in London.",
          ["To make US law apply to every policy term.", "The clause is about where the insurer can be sued and served, not a wholesale choice of law."],
          ["To make London insurers admitted.", "They remain non-admitted. The clause compensates for that."]
        ],
          a: 1,
          why: "A non-admitted insurer has no local presence. The clause removes the practical barrier of having to chase it across the Atlantic."
        }
      },
      {
        h: "Interpretation",
        say: "An insurance policy is interpreted on the same principles as any other commercial contract. The court seeks the meaning the document would convey to a reasonable person having the background knowledge available to both parties when the contract was made; the subjective intentions of either are irrelevant.\n\nIt begins with the **natural and ordinary meaning** of the words, takes account of any **technical or trade meaning**, and reads each clause in the context of the contract **as a whole**. Only if genuine ambiguity remains will it construe the clause against the party who proposed it, the rule known as *contra proferentem*.",
        scene: () => flow({
          h: 250,
          nodes: [
            { id: "1", x: 95, y: 4, label: "Ordinary meaning", tone: "c1" },
            { id: "2", x: 95, y: 68, label: "Technical meaning" },
            { id: "3", x: 95, y: 132, label: "The contract as a whole" },
            { id: "4", x: 95, y: 196, label: "Still ambiguous?", sub: "Against the party relying on it", tone: "c2" }
          ],
          edges: [["1", "2"], ["2", "3"], ["3", "4"]]
        }),
        ask: {
          q: "A policy excludes “flood”. A burst water main fills the insured’s basement. The insurer says that is a flood. Where does a court start?",
          opts: [
          ["With what the insurer intended the exclusion to catch.", "One side’s private intention is irrelevant."],
          "With what “flood” ordinarily means to a reasonable reader.",
          ["With what the broker understood.", "The broker’s view is no more decisive than the insurer’s."],
          ["By reading it against the insurer.", "That is the last resort, used only if real ambiguity survives everything else."]
        ],
          a: 1,
          why: "Ordinary meaning first: most people think of a flood as water arriving from outside by natural causes, not a pipe failing. Then any trade meaning, then the contract as a whole. Only then, if still ambiguous, against the party relying on the clause."
        }
      },
      {
        h: "The wordings specialist",
        say: "Insurers and brokers employ wordings specialists, whose function is to review each contract **in its entirety** and not merely the clauses that have been changed. They monitor developments in law and regulation, and they report to underwriters what claims and complaints disclose about the operation of the wordings in use.",
        scene: () => flow({
          h: 150,
          nodes: [
            { id: "u", x: 4, y: 4, w: 104, label: "Underwriters" }, { id: "c", x: 118, y: 4, w: 104, label: "Claims" }, { id: "r", x: 232, y: 4, w: 104, label: "Regulation" },
            { id: "w", x: 95, y: 100, label: "Wordings team", tone: "c1" }
          ],
          edges: [["u", "w"], ["c", "w"], ["r", "w"]]
        })
      },
      {
        h: "Summary",
        say: "The next two chapters consider the risk an insurer is prepared to bear and the capital that supports it.",
        scene: () => recap([
          "Name every insured: each company is a separate legal person.",
          "Joint insureds stand or fall together; composite insureds do not.",
          "The 2010 Act lets an injured party claim directly from an insolvent insured’s insurer.",
          "Pasted clauses that contradict the base wording create ambiguity, read against their author.",
          "Courts start with ordinary meaning and read the contract as a whole."
        ])
      }
    ]
  });
})();
