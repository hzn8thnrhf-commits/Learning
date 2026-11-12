/* LM1 · 7 — Sanctions, data and dirty money */
(() => {
  const { bars, flow, stats, recap, pct } = window.SLIP.kit;

  window.SLIP.chapters.push({
    id: "controls", part: "LM1",
    title: "Sanctions, data and dirty money",
    blurb: "Four sets of rules that can stop a deal, or a claim payment, however good the underwriting.",
    minutes: 8,
    init: { days: 1 },
    steps: [
      {
        h: "Some business you may not do",
        say: "**Sanctions** are bans on dealing with named governments, regimes, organisations and individuals. Governments use them to apply pressure without force.\n\nFor an insurer the ban covers providing cover *and* paying claims. A London firm writes risks from everywhere, so it needs **systems and controls** to catch a sanctioned party before money moves.",
        scene: () => flow({
          h: 190,
          nodes: [
            { id: "q", x: 4, y: 4, w: 104, label: "At quote" }, { id: "b", x: 118, y: 4, w: 104, label: "At binding" }, { id: "c", x: 232, y: 4, w: 104, label: "At claim" },
            { id: "s", x: 70, y: 84, w: 200, label: "Screen every party", sub: "Insured, payee, vessel, country", tone: "ink" },
            { id: "x", x: 95, y: 146, label: "Match? Stop.", tone: "bad" }
          ],
          edges: [["q", "s"], ["b", "s"], ["c", "s"], ["s", "x"]]
        }),
        ask: {
          q: "A valid cargo claim is agreed. The day before payment, the cargo owner is added to the UK sanctions list. What now?",
          opts: [
          ["Pay. The policy was written before the listing.", "The ban is on making the payment today, whenever the policy began."],
          "Don’t pay. Freeze it and report; paying would breach sanctions.",
          ["Pay the broker instead and let them decide.", "Passing money through someone else to a sanctioned party is still a breach, now by two firms."],
          ["Cancel the policy and refund the premium.", "A refund is also a payment to a sanctioned party."]
        ],
          a: 1,
          why: "Lists change constantly, so screening at inception isn’t enough: you check again before any money moves. Policies carry a **sanctions clause** saying the insurer won’t pay where that would break the law."
        }
      },
      {
        h: "Whose sanctions?",
        say: "Sanctions are imposed by the **United Nations**, the **UK**, the **European Union** and the **United States**. They overlap, but not perfectly.\n\nUS sanctions reach further than you might expect.",
        scene: () => flow({
          h: 150,
          nodes: [
            { id: "un", x: 4, y: 4, w: 78, label: "UN" }, { id: "uk", x: 88, y: 4, w: 78, label: "UK" }, { id: "eu", x: 172, y: 4, w: 78, label: "EU" }, { id: "us", x: 256, y: 4, w: 80, label: "US", tone: "c2" },
            { id: "f", x: 70, y: 100, w: 200, label: "A London insurer", sub: "May answer to all four", tone: "ink" }
          ],
          edges: [["un", "f"], ["uk", "f"], ["eu", "f"], ["us", "f"]]
        }),
        ask: {
          q: "A risk is legal under UK sanctions but banned by US sanctions. Which London insurer can most safely write it?",
          opts: [
          ["A syndicate owned by an American group.", "US sanctions follow US ownership, wherever the subsidiary sits."],
          ["A UK insurer that will be paid in US dollars.", "Dollar payments clear through US banks, which can be enough of a link."],
          ["A UK insurer whose claims manager is a US citizen.", "US persons are bound personally. She couldn’t touch the file."],
          "A UK-owned insurer with no US staff, trading in sterling."
        ],
          a: 3,
          why: "US sanctions reach US persons, firms they own, and often transactions in dollars. In practice many London firms treat US sanctions as applying to them, because some link is almost always there."
        }
      },
      {
        h: "Other people’s data",
        say: "Insurers hold deeply personal information: health records, convictions, bank details. The **Data Protection Act 2018** and the **GDPR** set the rules.\n\nPersonal data must be used **lawfully and fairly**, collected for a **stated purpose**, **limited** to what is needed, kept **accurate**, kept **no longer than necessary**, and kept **secure**.",
        scene: () => recap(["Lawful, fair and transparent", "For a stated purpose only", "No more than you need", "Accurate and up to date", "Not kept longer than necessary", "Kept secure"]),
        ask: {
          q: "A claim was settled eight years ago. The handler keeps the claimant’s medical reports “just in case”. Which principle is most at risk?",
          opts: [
          ["Accuracy.", "The reports may be perfectly accurate. That isn’t the problem."],
          "Keeping data no longer than necessary.",
          ["Lawful and fair collection.", "It was collected properly, for a real claim. The problem came later."],
          ["None. Keeping more is safer.", "Every extra file is extra harm if there is a breach."]
        ],
          a: 1,
          why: "Data needs a reason to be kept and a date to be deleted. Hoarding it breaks the storage rule and raises the stakes of any leak."
        }
      },
      {
        h: "Rights, and what a breach costs",
        say: "People have rights over their data: to **see** what a firm holds, to have errors **corrected**, and in some cases to have it **erased**.\n\nIf personal data is lost or stolen, a serious breach must be reported to the regulator, the Information Commissioner, within **72 hours**.",
        scene: (v) => bars([{ label: "Time since the breach was discovered", right: `${v.days * 24} hours`, segs: [[Math.min(v.days * 24, 72), "c1"], [Math.max(0, v.days * 24 - 72), "bad", "Late"]] }], { max: 168, marks: [[72, "72 hours"]] }),
        ctl: [{ k: "days", label: "Days the firm waits before reporting", min: 1, max: 7, step: 1, fmt: (x) => `${x}` }],
        live: (v) => (v.days <= 3 ? "Inside the deadline. The firm must still explain what happened and what it is doing about it." : "Late. On top of the breach itself, the delay is a second failure, and fines can be very large. Firms rehearse this so that nobody is deciding what to do on day four."),
        goal: {
          say: "A laptop holding claimants’ medical records is stolen on Monday morning. Find the last day the firm can report and still be on time.",
          test: (v) => v.days === 3,
          done: "Day three. The clock is 72 hours from when the firm **became aware**, not from when it finished investigating. Firms report with what they know and add detail later."
        }
      },
      {
        h: "Money laundering",
        say: "**Money laundering** turns the proceeds of crime into money that looks legitimate. Insurance is a useful washing machine: pay a premium with dirty money, cancel, and receive a clean refund from a respectable insurer.",
        scene: () => flow({
          h: 190,
          nodes: [
            { id: "d", x: 4, y: 4, w: 150, label: "Criminal cash", tone: "bad" },
            { id: "p", x: 186, y: 4, w: 150, label: "Pays a large premium" },
            { id: "c", x: 186, y: 76, w: 150, label: "Cancels the policy" },
            { id: "r", x: 186, y: 148, w: 150, label: "Refund from an insurer", sub: "Now it looks clean", tone: "good" }
          ],
          edges: [["d", "p"], ["p", "c"], ["c", "r"]]
        }),
        ask: {
          q: "A new client pays a year’s premium up front, cancels a week later and asks for the refund to go to a different company’s account. What do you do?",
          opts: [
          ["Refund it as asked. The customer is entitled.", "You would be completing the wash: dirty money in, clean money out to a third party."],
          "Report it to the MLRO and say nothing to the client.",
          ["Ask the client to explain why, and warn them how it looks.", "Alerting a suspect is itself a criminal offence: **tipping off**."],
          ["Report it straight to the police yourself.", "Staff report internally. The MLRO decides whether to report to the authorities."]
        ],
          a: 1,
          why: "Every firm has a **Money Laundering Reporting Officer**. Your duty is to report suspicion to them promptly and stay silent. The first defence comes earlier: knowing who your client is before you deal, **customer due diligence**."
        }
      },
      {
        h: "Bribery",
        say: "The Bribery Act 2010 creates four offences: **bribing** someone, **being bribed**, bribing a **foreign public official**, and, for a company, **failing to prevent** bribery by people acting for it.\n\nIn a market built on relationships, entertainment is normal. It becomes bribery when it is meant to make someone act improperly.",
        scene: () => recap(["Offering or paying a bribe", "Asking for or accepting one", "Bribing a foreign public official", "A firm failing to prevent bribery on its behalf"]),
        ask: {
          q: "An overseas agent, unknown to head office, pays an official to win a firm some business. Where does the firm stand?",
          opts: [
          ["In the clear. It didn’t know.", "Ignorance is no defence to this offence. That is what makes it unusual."],
          "Guilty of failing to prevent bribery, unless it had adequate procedures.",
          ["Guilty only if a director approved the payment.", "No approval is needed. The offence is the failure to prevent."],
          ["In the clear. The agent isn’t an employee.", "The Act covers anyone performing services for the firm."]
        ],
          a: 1,
          why: "The only defence is to show **adequate procedures**: training, due diligence on agents, clear gift and hospitality rules, and records. A firm that can’t show them is liable for what its agents do."
        }
      },
      {
        h: "In four lines",
        say: "None of these is about underwriting skill. All of them can end a career.",
        scene: () => recap([
          "Sanctions: screen at quote, at binding and again before paying a claim.",
          "UN, UK, EU and US regimes can all apply; US rules follow US ownership.",
          "Personal data: lawful, limited, accurate, secure, and deleted when no longer needed.",
          "Suspect laundering? Tell the MLRO, never the client. Bribery: adequate procedures are the only defence."
        ])
      }
    ]
  });
})();
