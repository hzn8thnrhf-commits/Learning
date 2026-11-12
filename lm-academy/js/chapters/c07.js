/* LM1 · 7 — Sanctions, data and dirty money */
(() => {
  const { bars, flow, stats, recap, pct } = window.SLIP.kit;

  window.SLIP.chapters.push({
    id: "controls", part: "LM1",
    title: "Sanctions, data and financial crime",
    blurb: "The legal controls on whom a firm may deal with, whose data it holds and whose money it handles.",
    minutes: 8,
    lead: "Some of the most serious risks a London Market firm runs have nothing to do with underwriting. They arise from the law on sanctions, personal data and financial crime.",
    aims: [
      "Explain what sanctions prohibit and why screening must be repeated before payment.",
      "State the data protection principles and the 72-hour rule for reporting a breach.",
      "Recognise the signs of money laundering and describe the duty to report without tipping off.",
      "State the four offences under the Bribery Act 2010 and the defence of adequate procedures."
    ],
    init: { days: 1 },
    steps: [
      {
        h: "Sanctions",
        say: "**Sanctions** are legal restrictions on dealings with designated states, entities and individuals, imposed as an instrument of foreign policy. In the UK, financial sanctions are administered by the Office of Financial Sanctions Implementation, and breach is a criminal offence.\n\nFor an insurer the prohibition extends both to providing cover and to paying claims. Since London writes risks from every part of the world, a firm must maintain **systems and controls** capable of identifying a designated party before any money is transferred.",
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
          "Do not pay. Freeze it and report; paying would breach sanctions.",
          ["Pay the broker instead and let them decide.", "Passing money through someone else to a sanctioned party is still a breach, now by two firms."],
          ["Cancel the policy and refund the premium.", "A refund is also a payment to a sanctioned party."]
        ],
          a: 1,
          why: "Lists change constantly, so screening at inception is not enough: you check again before any money moves. Policies carry a **sanctions clause** saying the insurer will not pay where that would break the law."
        }
      },
      {
        h: "The sanctions regimes",
        say: "Sanctions are imposed principally by the **United Nations**, the **United Kingdom**, the **European Union** and the **United States**. The regimes overlap but are not identical, and a transaction lawful under one may be prohibited under another.\n\nThe reach of US sanctions is the widest. They bind US persons wherever located, entities owned or controlled by them, and commonly any transaction denominated in US dollars.",
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
          ["A UK insurer whose claims manager is a US citizen.", "US persons are bound personally. She could not touch the file."],
          "A UK-owned insurer with no US staff, trading in sterling."
        ],
          a: 3,
          why: "US sanctions reach US persons, firms they own, and often transactions in dollars. In practice many London firms treat US sanctions as applying to them, because some link is almost always there."
        }
      },
      {
        h: "Data protection",
        say: "Insurers hold personal data of great sensitivity, including medical records and details of criminal convictions. Its use is governed by the **Data Protection Act 2018** and the **UK GDPR**.\n\nPersonal data must be processed **lawfully, fairly and transparently**; collected for **specified purposes**; **limited** to what those purposes require; kept **accurate**; retained **no longer than necessary**; and kept **secure**. The firm must be able to demonstrate its compliance.",
        scene: () => recap(["Lawful, fair and transparent", "For a stated purpose only", "No more than you need", "Accurate and up to date", "Not kept longer than necessary", "Kept secure"]),
        ask: {
          q: "A claim was settled eight years ago. The handler keeps the claimant’s medical reports “just in case”. Which principle is most at risk?",
          opts: [
          ["Accuracy.", "The reports may be perfectly accurate. That is not the problem."],
          "Keeping data no longer than necessary.",
          ["Lawful and fair collection.", "It was collected properly, for a real claim. The problem came later."],
          ["None. Keeping more is safer.", "Every extra file is extra harm if there is a breach."]
        ],
          a: 1,
          why: "Data needs a reason to be kept and a date to be deleted. Hoarding it breaks the storage rule and raises the stakes of any leak."
        }
      },
      {
        h: "Data subjects’ rights and breaches",
        say: "Individuals have enforceable rights in relation to their data, including the rights of **access**, of **rectification** and, in certain circumstances, of **erasure**.\n\nWhere a personal data breach is likely to result in a risk to individuals, the firm must notify the Information Commissioner without undue delay and, where feasible, within **72 hours** of becoming aware of it.",
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
        say: "**Money laundering** is the process by which the proceeds of crime are given the appearance of legitimate origin. Insurance can be used for the purpose: a premium is paid with criminal funds, the policy is cancelled, and the refund arrives as a payment from a reputable insurer.\n\nUnder the Proceeds of Crime Act 2002, a person who knows or suspects that money laundering is taking place must report it, and commits an offence by warning the person concerned.",
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
        say: "The Bribery Act 2010 creates four offences: **bribing** another person; **being bribed**; bribing a **foreign public official**; and, for a commercial organisation, **failing to prevent** bribery by a person associated with it.\n\nCorporate hospitality is not in itself unlawful. It becomes bribery where it is intended to induce a person to perform their function improperly.",
        scene: () => recap(["Offering or paying a bribe", "Asking for or accepting one", "Bribing a foreign public official", "A firm failing to prevent bribery on its behalf"]),
        ask: {
          q: "An overseas agent, unknown to head office, pays an official to win a firm some business. Where does the firm stand?",
          opts: [
          ["In the clear. It did not know.", "Ignorance is no defence to this offence. That is what makes it unusual."],
          "Guilty of failing to prevent bribery, unless it had adequate procedures.",
          ["Guilty only if a director approved the payment.", "No approval is needed. The offence is the failure to prevent."],
          ["In the clear. The agent is not an employee.", "The Act covers anyone performing services for the firm."]
        ],
          a: 1,
          why: "The only defence is to show **adequate procedures**: training, due diligence on agents, clear gift and hospitality rules, and records. A firm that cannot show them is liable for what its agents do."
        }
      },
      {
        h: "Summary",
        say: "None of these controls concerns underwriting judgement, and a breach of any of them can attract criminal liability for the individual as well as the firm.",
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
