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
          q: "A valid cargo claim is agreed. The day before payment, the cargo owner is added to a sanctions list. Do you pay?",
          opts: ["Yes. The policy was written before the listing.", "No. Paying would itself breach sanctions."],
          a: 1,
          why: "Lists change constantly, so screening at inception isn’t enough: you check again before paying. Policies carry a **sanctions clause** saying the insurer won’t pay where that would break the law."
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
          q: "A London syndicate is owned by an American group. A risk is legal under UK rules but banned by US sanctions. Can it write it?",
          opts: ["Yes. It is a UK firm under UK law.", "Probably not. Its US parentage brings US sanctions with it."],
          a: 1,
          why: "US sanctions bind US persons and often the firms they own, wherever those firms sit. Paying in US dollars can be enough of a link. Check every regime that could apply."
        }
      },
      {
        h: "Other people’s data",
        say: "Insurers hold deeply personal information: health records, convictions, bank details. The **Data Protection Act 2018** and the **GDPR** set the rules.\n\nPersonal data must be used **lawfully and fairly**, collected for a **stated purpose**, **limited** to what is needed, kept **accurate**, kept **no longer than necessary**, and kept **secure**.",
        scene: () => recap(["Lawful, fair and transparent", "For a stated purpose only", "No more than you need", "Accurate and up to date", "Not kept longer than necessary", "Kept secure"]),
        ask: {
          q: "A claim was settled eight years ago. The handler keeps the claimant’s medical reports “just in case”. Which rule is at risk?",
          opts: ["Accuracy.", "Not keeping data longer than necessary.", "None. More data is safer."],
          a: 1,
          why: "Data needs a reason to be kept and a date to be deleted. Hoarding it increases the harm if it leaks, and breaks the storage rule."
        }
      },
      {
        h: "Rights, and what a breach costs",
        say: "People have rights over their data: to **see** what a firm holds, to have errors **corrected**, and in some cases to have it **erased**.\n\nIf personal data is lost or stolen, a serious breach must be reported to the regulator, the Information Commissioner, within **72 hours**.",
        scene: (v) => bars([{ label: "Time since the breach was discovered", right: `${v.days * 24} hours`, segs: [[Math.min(v.days * 24, 72), "c1"], [Math.max(0, v.days * 24 - 72), "bad", "Late"]] }], { max: 168, marks: [[72, "72 hours"]] }),
        ctl: [{ k: "days", label: "Days the firm waits before reporting", min: 1, max: 7, step: 1, fmt: (x) => `${x}` }],
        live: (v) => (v.days <= 3 ? "Inside the deadline. The firm must still explain what happened and what it is doing about it." : "Late. On top of the breach itself, the delay is a second failure, and fines can be very large. Firms rehearse this so that nobody is deciding what to do on day four.")
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
          opts: ["Refund it. The customer is entitled.", "Report it internally to the Money Laundering Reporting Officer, and say nothing to the client."],
          a: 1,
          why: "Every firm has an **MLRO** who decides whether to report to the authorities. Warning the client is itself an offence, **tipping off**. The first defence is knowing who your client is before you deal: **customer due diligence**."
        }
      },
      {
        h: "Bribery",
        say: "The Bribery Act 2010 creates four offences: **bribing** someone, **being bribed**, bribing a **foreign public official**, and, for a company, **failing to prevent** bribery by people acting for it.\n\nIn a market built on relationships, entertainment is normal. It becomes bribery when it is meant to make someone act improperly.",
        scene: () => recap(["Offering or paying a bribe", "Asking for or accepting one", "Bribing a foreign public official", "A firm failing to prevent bribery on its behalf"]),
        ask: {
          q: "An overseas agent, unknown to head office, pays an official to win a firm some business. Is the firm guilty of anything?",
          opts: ["No. It didn’t know.", "Yes, of failing to prevent bribery, unless it had adequate procedures."],
          a: 1,
          why: "Ignorance is no defence. The only defence is to show **adequate procedures**: training, due diligence on agents, clear gift and hospitality rules, and records."
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
