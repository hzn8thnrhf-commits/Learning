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
    blurb: "The subscription market, the structure of Lloyd’s and the company market, and the intermediaries that connect them to clients.",
    minutes: 10,
    lead: "The London Market is a subscription market: a place where many insurers share single risks. Its institutions follow from that one fact.",
    aims: [
      "Explain why large risks are shared, and how a subscription market shares them.",
      "Describe the structure of Lloyd’s: syndicates, managing agents, members and the annual venture.",
      "Distinguish companies, mutuals, captives, MGAs and brokers, and state for whom each acts.",
      "Explain how premium flows from client to insurers, and what the market associations do."
    ],
    init: { size: 1000, line: 5, brk: 20 },
    steps: [
      {
        h: "The problem of the large risk",
        say: "The market’s structure is best understood from the problem it solves.\n\nA refinery is valued at **£1bn**, and its owner seeks insurance against fire and explosion. Suppose that you direct an insurer with capital of **£400m**. The premium offered is substantial.",
        scene: (v) => bars([
  { label: "Your capital", right: "£400m", segs: [[400, "c1", "£400m"]] },
  { label: "A total loss, if you take it all", right: "£1bn", segs: [[1000, "bad", "2.5 times your capital"]] }
].concat(v.$done ? [{ label: "A total loss, on a 20% line", right: "£200m", segs: [[200, "c2", "£200m"]] }] : []), { max: 1000, marks: v.$done ? [[200, "Half your capital"]] : [] }),
        ask: {
          q: "Your board says no single loss may cost more than half your capital. What is the largest share of the refinery you can take?",
          fix: true,
          opts: [
          ["100%", "A total loss would be £1bn: two and a half times everything you own."],
          ["40%", "40% of £1bn is £400m: your entire capital, not half of it."],
          "20%",
          ["None. It is too big to touch.", "You do not have to take all of it or none of it. That is the idea this whole market is built on."]
        ],
          a: 2,
          why: "Half of £400m is £200m, and £200m is 20% of £1bn. So you want a slice, and the client needs someone else to take the other 80%."
        }
      },
      {
        h: "The subscription market",
        say: "The solution is for each insurer to accept a percentage of the risk, known as its **line**, and for the broker to assemble lines from many insurers until they total 100%. Each insurer is liable for its own share and no more. This is the **subscription market**, and it is the defining feature of London.\n\nAssume that no insurer will expose more than £50m to a single refinery.",
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
        },
        goal: {
          say: "Every insurer wants a 10% line. Find the largest risk that ten of them can cover between them.",
          test: (v) => v.line === 10 && v.size === 500,
          done: "£500m: ten lines of £50m. Make the risk any bigger and 10% breaches each insurer’s £50m limit, so lines shrink and the broker needs more names. Big risks need many insurers; that is why they come to a market."
        }
      },
      {
        h: "The structure of Lloyd’s",
        say: "Lloyd’s is not an insurance company. It is a **market**, constituted by Act of Parliament, in which insurance is transacted; the Corporation of Lloyd’s provides the premises, the rules and the oversight, as the operator of an exchange does, and underwrites nothing itself.\n\nRisk is accepted by **syndicates**. Each syndicate is run by a **managing agent** and capitalised by its **members**, historically called **Names**. Members may be individuals or companies; today corporate members supply most of the capital.",
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
          q: "A syndicate loses £80m in a year. Who bears it first?",
          opts: [
          ["Lloyd’s itself.", "Lloyd’s is the marketplace. It does not underwrite."],
          ["The managing agent.", "The agent runs the syndicate for a fee and a profit share. The capital is not its own."],
          "The syndicate’s members.",
          ["The Central Fund.", "Only as a last resort, if members cannot meet their share."]
        ],
          a: 2,
          why: "The members put up the capital and carry the risk. The managing agent runs the business; a **members’ agent** advises individual Names on which syndicates to back."
        }
      },
      {
        h: "The annual venture",
        say: "A syndicate is constituted for a single **year of account**, and its members participate for that year only. A syndicate that appears to trade continuously is, in law, a succession of annual ventures.\n\nSince claims on a year’s policies emerge over a long period, the account for each year is normally kept open for **three years** before its result is determined.",
        scene: () => bars([
          { label: "2024 syndicate year", right: "result known end 2026", segs: [[12, "c1", "Writing"], [24, "soft1", "Claims develop"]] },
          { label: "2025 syndicate year", right: "end 2027", segs: [[12, "none"], [12, "c1", "Writing"], [24, "soft1", "Claims develop"]] }
        ], { max: 48 }),
        ask: {
          q: "A member joins a syndicate for the 2024 year only. When does it learn its final profit or loss?",
          fix: true,
          opts: [
          ["At the end of 2024.", "Policies written in December 2024 still have eleven months to run, and their claims have not happened yet."],
          ["At the end of 2025.", "The policies have expired by then, but many claims are still being reported and argued."],
          "Around the end of 2026."
        ],
          a: 2,
          why: "The year is kept open for three years so claims can develop before the result is struck. LM2 explains how it is finally closed."
        }
      },
      {
        h: "The company market",
        say: "Outside Lloyd’s, risk is accepted by **insurance companies** owned by shareholders, many of them branches or subsidiaries of overseas groups. A number of groups operate both a company and a Lloyd’s syndicate.\n\nTwo forms deserve separate mention. A **mutual** is owned by its policyholders, who in effect insure one another. A **captive** is an insurer established by a commercial group to insure the risks of that group.",
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
          opts: [
          ["A mutual.", "A mutual is owned by its many policyholders, who insure each other. This has one owner and one customer."],
          "A captive.",
          ["A syndicate.", "Syndicates exist only at Lloyd’s and write business for outside clients."],
          ["A reinsurer.", "It insures the group directly. It will probably be a *buyer* of reinsurance."]
        ],
          a: 1,
          why: "A captive takes risk from one source, usually its own group. It often then buys reinsurance in London for the part it does not want to keep."
        }
      },
      {
        h: "MGAs and brokers",
        say: "Two kinds of intermediary must be distinguished by the party for whom they act.\n\nA **broker** is the agent of the **insured**. It advises the client, places the risk and assists with claims. Brokers must be authorised by the FCA; one admitted to place business at Lloyd’s is a **Lloyd’s broker**.\n\nA **managing general agent** (MGA) is the agent of **insurers**, who delegate to it authority to accept risks, and sometimes to settle claims, on their behalf.",
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
          q: "A broker brings its client’s risk to an MGA, which binds it. Whose agents are they?",
          opts: [
          ["Both act for the client.", "The MGA is binding the insurers’ capital. It cannot also be working for the buyer."],
          "The broker acts for the client; the MGA for the insurers.",
          ["Both act for the insurers.", "The broker’s duty is to the buyer, in placing and in claims."],
          ["The MGA acts for the client; the broker for the insurers.", "It is the other way round."]
        ],
          a: 1,
          why: "The broker owes its duties to the buyer. The MGA holds **delegated authority** from insurers and binds them. Keeping straight who acts for whom is half of understanding this market."
        }
      },
      {
        h: "The flow of premium",
        say: "The client pays the premium to its broker. The broker deducts its remuneration, **brokerage**, which is expressed as a percentage of the gross premium and allowed by the insurers, and remits the balance. A central bureau, operated by Velonetic (formerly Xchanging), records each insurer’s share and settles the amounts due in a single transaction. Claims payments travel by the same route in reverse.\n\nThe insurers require £400,000 net of brokerage.",
        scene: (v) => {
          const gross = 400 / (1 - v.brk / 100), b = gross - 400;
          return stats([["Client pays", `£${num(gross, 0)}k`], ["Broker keeps", `£${num(b, 0)}k`, "c2"], ["Insurers receive", "£400k", "c1"]]) +
            bars([{ label: "The client’s gross premium", right: `£${num(gross, 0)}k`, segs: [[400, "c1", "Insurers"], [b, "c2", "Brokerage"]] }], { max: gross });
        },
        ctl: [{ k: "brk", label: "Brokerage, share of gross premium", min: 0, max: 35, step: 2.5, fmt: (x) => pct(x, 1) }],
        live: (v) => (v.brk ? `Brokerage is a slice of the **gross** premium, so in the end the client funds it, even though the insurers “pay” it. At ${pct(v.brk, 1)} the client pays ${pct((1 / (1 - v.brk / 100) - 1) * 100, 1)} on top of the net.` : "With no brokerage the broker would charge the client a fee instead. Distribution is never free."),
        goal: {
          say: "Find the brokerage at which the client pays exactly a third more than the insurers receive.",
          test: (v) => v.brk === 25,
          done: "25%. A quarter of the gross is a third on top of the net. Brokerage is quoted on the gross premium, which makes it sound smaller than it feels to the person paying."
        }
      },
      {
        h: "The market associations",
        say: "Each section of the market has a representative association. The **Lloyd’s Market Association** (LMA) represents managing and members’ agents. The **International Underwriting Association** (IUA) represents the company market. The **London and International Insurance Brokers’ Association** (LIIBA) represents London Market brokers, and the **British Insurance Brokers’ Association** (BIBA) brokers generally. The **Managing General Agents’ Association** (MGAA) represents MGAs.\n\nThe associations have no regulatory powers. They represent their members, and they collaborate, notably in the drafting of model wordings.",
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
          q: "The IUA dislikes how one of its member companies is underwriting. What can it do?",
          opts: [
          ["Order it to stop.", "It has no such power. It is a trade body, not a regulator."],
          "Nothing binding. It represents its members; it does not control them.",
          ["Fine it.", "Fines come from regulators."],
          ["Withdraw its licence.", "Authorisation is granted and withdrawn by the PRA and FCA."]
        ],
          a: 1,
          why: "Trade associations represent, inform and coordinate. Control belongs to the regulators and, inside Lloyd’s, to Lloyd’s itself."
        }
      },
      {
        h: "Why risks come to London",
        say: "London’s capital and its clients are both predominantly international. The reasons commonly given for placing a risk in London are set out below; they explain what the market must preserve if it is to remain competitive.",
        scene: () => recap([
          "Capacity: very large limits can be assembled.",
          "Subscription: a risk can be shared among many insurers.",
          "History and knowledge: someone here has seen it before.",
          "Entrepreneurial underwriters, willing to consider the unusual.",
          "A reputation for paying claims."
        ]),
        ask: {
          q: "A broker has three risks to place. Which one least needs London?",
          opts: [
          "Two thousand ordinary high-street shops.",
          ["A £2bn gas plant.", "Too big for one insurer: it needs a subscription market’s shared capacity."],
          ["Liability for a new drone-delivery service.", "Nobody has rated this before. It needs specialists willing to price the unfamiliar."]
        ],
          a: 0,
          why: "London earns its cost on risks that are large, complex or new. Standard, small risks are cheaper to insure at home, though they may still reach London in bulk through delegated authority."
        }
      }
    ]
  });
})();
