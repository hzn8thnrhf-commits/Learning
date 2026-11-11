/* LM1 · 5 — Who is in the market */
(() => {
  const { bars, flow, stats, recap, money, pct, num } = window.SLIP.kit;
  const slip = (v) => {
    const cap = (50 / v.size) * 100, line = Math.min(v.line, cap), n = Math.ceil(100 / line - 1e-9);
    return { n, line, each: (line / 100) * v.size, capped: cap < v.line, segs: Array.from({ length: n }, (_, i) => [i === n - 1 ? 100 - line * (n - 1) : line, i % 2 ? "soft1" : "c1", n <= 10 ? pct(line, 1) : ""]) };
  };

  window.SLIP.chapters.push({
    id: "market", part: "LM1",
    title: "Who is in the market",
    blurb: "Lloyd’s, companies, mutuals, captives, MGAs and brokers, and why a risk comes to London at all.",
    minutes: 10,
    init: { size: 1000, line: 5, brk: 20 },
    steps: [
      {
        h: "Start with a problem",
        say: "A refinery is worth **£1bn**. Its owner wants it insured against fire and explosion.\n\nYou run an insurer with **£400m** of capital. The premium on offer is large.",
        scene: () => bars([
          { label: "Your capital", right: "£400m", segs: [[400, "c1", "£400m"]] },
          { label: "The refinery", right: "£1bn", segs: [[1000, "bad", "A total loss: £1bn"]] }
        ], { max: 1000 }),
        ask: {
          q: "Do you insure the whole refinery?",
          opts: ["Yes. The premium is too good to turn down.", "No. One fire could cost more than everything we own."],
          a: 1,
          why: "A total loss would be two and a half times your capital. You would be bankrupt, and the client would hold a policy that can’t pay. Neither side wants that."
        }
      },
      {
        h: "So take a slice",
        say: "Each insurer takes a percentage, a **line**, and many insurers together make up 100%. This is the **subscription market**, London’s defining idea.\n\nSuppose no insurer will risk more than £50m on one refinery.",
        scene: (v) => {
          const s = slip(v);
          return stats([["Insurers needed", String(s.n)], ["Each line", pct(s.line, 1)], ["Worst loss each", money(s.each)]]) +
            bars([{ label: "The risk, 100%", right: money(v.size), segs: s.segs }], { max: 100 });
        },
        ctl: [{ k: "size", label: "Value of the risk", min: 100, max: 3000, step: 100, fmt: money }, { k: "line", label: "Line each insurer would like", min: 2.5, max: 25, step: 2.5, fmt: (x) => pct(x, 1) }],
        live: (v) => {
          const s = slip(v);
          return s.capped ? `Each would like ${pct(v.line, 1)}, but that is ${money((v.line / 100) * v.size)}: too much. Lines shrink to ${pct(s.line, 1)}, so the slip needs **${s.n} insurers**.`
            : `**${s.n} insurers**, none exposed to more than ${money(s.each)}. Any mix of Lloyd’s syndicates, London companies and overseas insurers can share one risk.`;
        }
      },
      {
        h: "Lloyd’s is not an insurer",
        say: "Think of a farmers’ market: the operator provides the site and the rules, but grows nothing.\n\nLloyd’s is a **marketplace**. The risk is taken by **syndicates**. Each is run by a **managing agent** and funded by its **members**, also called **Names**, who may be individuals or companies. Today most of the capital is corporate.",
        scene: () => flow({
          h: 224,
          nodes: [
            { id: "corp", x: 4, y: 4, w: 150, label: "Lloyd’s", sub: "Structure and regulation", tone: "ink" },
            { id: "ma", x: 4, y: 90, w: 150, label: "Managing agent", sub: "May run several syndicates" },
            { id: "syn", x: 186, y: 90, w: 150, label: "A syndicate", sub: "Writes the lines", tone: "c1" },
            { id: "mem", x: 186, y: 176, w: 150, label: "Members (Names)", sub: "Provide the capital", tone: "c2" },
            { id: "ag", x: 4, y: 176, w: 150, label: "Members’ agent", sub: "Advises individual Names" }
          ],
          edges: [["corp", "ma", "oversees"], ["ma", "syn", "runs"], ["mem", "syn", "backs"], ["ag", "mem", "advises"]]
        }),
        ask: {
          q: "A syndicate loses £80m. Who bears it?",
          opts: ["Lloyd’s itself.", "The managing agent.", "The syndicate’s members."],
          a: 2,
          why: "The members put up the capital and carry the risk. The managing agent runs the business; a **members’ agent** advises individual Names on which syndicates to back."
        }
      },
      {
        h: "A one-year venture",
        say: "A syndicate exists for **one year** at a time. Its members join for that year of account only. But claims arrive slowly, so its accounts are not finalised for **three years**.",
        scene: () => bars([
          { label: "2024 syndicate year", right: "result known end 2026", segs: [[12, "c1", "Writing"], [24, "soft1", "Claims develop"]] },
          { label: "2025 syndicate year", right: "end 2027", segs: [[12, "none"], [12, "c1", "Writing"], [24, "soft1", "Claims develop"]] }
        ], { max: 48 }),
        ask: {
          q: "A member joined only for 2024. When does it learn its profit or loss?",
          opts: ["At the end of 2024.", "Around the end of 2026."],
          a: 1,
          why: "The year is kept open for three years so that claims can develop before the result is struck. LM2 explains how the year is finally closed."
        }
      },
      {
        h: "The company market",
        say: "Alongside Lloyd’s are **insurance companies**, owned by shareholders, many of them branches of overseas groups. Plenty of groups run both a company and a syndicate.\n\nTwo special kinds: a **mutual** is owned by its policyholders, who pool together to insure each other. A **captive** is an insurer set up by a group to insure the group’s own risks.",
        scene: () => flow({
          h: 150,
          nodes: [
            { id: "c", x: 4, y: 4, w: 104, label: "Company", sub: "Shareholders" }, { id: "m", x: 118, y: 4, w: 104, label: "Mutual", sub: "Its insureds" }, { id: "k", x: 232, y: 4, w: 104, label: "Captive", sub: "Its parent group" },
            { id: "o", x: 70, y: 100, w: 200, label: "Who owns it, and bears the result", tone: "ink" }
          ],
          edges: [["o", "c"], ["o", "m"], ["o", "k"]]
        }),
        ask: {
          q: "An oil major sets up its own insurer to cover only its own rigs and refineries. What is that?",
          opts: ["A mutual.", "A captive.", "A syndicate."],
          a: 1,
          why: "A captive takes risk from one source, usually its own group. It often then buys reinsurance in London for the part it doesn’t want to keep."
        }
      },
      {
        h: "MGAs and brokers",
        say: "A **managing general agent** (MGA) is given authority by insurers to act for them: to accept risks, and sometimes to agree claims. Some MGAs handle more premium than many insurers.\n\nA **broker** is a professional intermediary and the **agent of the insured**, in placing and in claims. Brokers must be authorised by the regulator; one accredited by Lloyd’s is a **Lloyd’s broker**.",
        scene: () => flow({
          h: 176,
          nodes: [
            { id: "c", x: 4, y: 66, w: 92, label: "Client" },
            { id: "b", x: 124, y: 66, w: 92, label: "Broker", sub: "Client’s agent", tone: "c1" },
            { id: "i", x: 244, y: 20, w: 92, label: "Insurers" },
            { id: "m", x: 244, y: 112, w: 92, label: "MGA", sub: "Insurers’ agent", tone: "c2" }
          ],
          edges: [["c", "b"], ["b", "i"], ["b", "m"], ["m", "i", "binds for"]]
        }),
        ask: {
          q: "A broker and an MGA sit either side of a deal. Whose agents are they?",
          opts: ["Both act for the client.", "The broker acts for the client; the MGA for the insurers."],
          a: 1,
          why: "The broker owes its duties to the buyer. The MGA holds **delegated authority** from insurers and binds them. Keeping straight who acts for whom is half of understanding this market."
        }
      },
      {
        h: "Where the premium goes",
        say: "The client pays the broker. The broker keeps its commission, **brokerage**, which the insurers allow as a deduction, and passes on the rest. A central bureau (historically Xchanging) records each insurer’s share and moves the money in one settlement. Claims travel back the same way.\n\nThe insurers need £400k net. Change the brokerage.",
        scene: (v) => {
          const gross = 400 / (1 - v.brk / 100), b = gross - 400;
          return stats([["Client pays", `£${num(gross, 0)}k`], ["Broker keeps", `£${num(b, 0)}k`, "c2"], ["Insurers receive", "£400k", "c1"]]) +
            bars([{ label: "The client’s gross premium", right: `£${num(gross, 0)}k`, segs: [[400, "c1", "Insurers"], [b, "c2", "Brokerage"]] }], { max: gross });
        },
        ctl: [{ k: "brk", label: "Brokerage, share of gross premium", min: 0, max: 35, step: 2.5, fmt: (x) => pct(x, 1) }],
        live: (v) => (v.brk ? `Brokerage is a slice of the **gross** premium, so in the end the client funds it, even though the insurers “pay” it. At ${pct(v.brk, 1)} the client pays ${pct((1 / (1 - v.brk / 100) - 1) * 100, 1)} on top of the net.` : "With no brokerage the broker would charge the client a fee instead. Distribution is never free.")
      },
      {
        h: "The market’s clubs",
        say: "Each part of the market has a body that speaks for it.\n\n**LMA**: Lloyd’s managing and members’ agents. **IUA**: the company market. **LIIBA**: London and international brokers. **BIBA**: UK brokers generally. **MGAA**: managing general agents.\n\nThey work together, notably on standard wordings.",
        scene: () => flow({
          h: 176,
          nodes: [
            { id: "lma", x: 4, y: 4, w: 104, label: "LMA", sub: "Lloyd’s agents" }, { id: "iua", x: 118, y: 4, w: 104, label: "IUA", sub: "Companies" }, { id: "li", x: 232, y: 4, w: 104, label: "LIIBA", sub: "London brokers" },
            { id: "bi", x: 60, y: 124, w: 104, label: "BIBA", sub: "UK brokers" }, { id: "mg", x: 176, y: 124, w: 104, label: "MGAA", sub: "MGAs" },
            { id: "w", x: 95, y: 68, w: 150, h: 30, label: "Shared wordings", tone: "ink" }
          ],
          edges: [["lma", "w"], ["iua", "w"], ["li", "w"]]
        }),
        ask: {
          q: "The IUA dislikes how one of its members is underwriting. Can it order the company to stop?",
          opts: ["Yes. It regulates the company market.", "No. It represents its members; it doesn’t control them."],
          a: 1,
          why: "Trade associations represent, inform and coordinate. Control belongs to the regulators and, inside Lloyd’s, to Lloyd’s itself."
        }
      },
      {
        h: "Why risks come to London",
        say: "Both the capital and the customers are international. Clients and their brokers choose London for five reasons.",
        scene: () => recap([
          "Capacity: very large limits can be assembled.",
          "Subscription: a risk can be shared among many insurers.",
          "History and knowledge: someone here has seen it before.",
          "Entrepreneurial underwriters, willing to consider the unusual.",
          "A reputation for paying claims."
        ])
      }
    ]
  });
})();
