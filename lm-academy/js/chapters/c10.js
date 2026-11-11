/* LM2 · 2 — Market security */
(() => {
  const { bars, flow, stats, recap, money, pct } = window.SLIP.kit;

  window.SLIP.chapters.push({
    id: "security", part: "LM2",
    title: "Market security",
    blurb: "Will the insurer still be there when the claim arrives? Solvency, Lloyd’s chain of security, and ratings.",
    minutes: 8,
    init: { res: 0, claims: 150 },
    steps: [
      {
        h: "Solvency in one line",
        say: "An insurer is **solvent** when its **assets** exceed its **liabilities**. Assets are cash and anything that can be turned into cash: investments, buildings. Liabilities are claims, paid and unpaid, plus the costs of running the business.\n\nThe gap is the **solvency margin**. The biggest liability, unpaid claims, is an *estimate*. Watch what happens when the estimate is revised.",
        scene: (v) => {
          const A = 500, L = 380 * (1 + v.res / 100), m = A - L;
          return stats([["Assets", money(A)], ["Liabilities", money(L)], ["Margin", money(m), m < 40 ? "bad" : "good"]]) +
            bars([{ label: "Assets", segs: [[A, "c1"]] }, { label: "Liabilities", segs: [[L, L > A ? "bad" : "c2"]] }], { max: 560, marks: [[A, "Assets"]] });
        },
        ctl: [{ k: "res", label: "Unpaid claims turn out", min: 0, max: 40, step: 5, fmt: (x) => (x ? `${x}% worse` : "as estimated") }],
        live: (v) => (v.res < 15 ? "A healthy margin. But it rests on an estimate of claims not yet paid, including those not yet reported (IBNR)." : v.res <= 30 ? "The margin is almost gone, and nothing has actually happened except a revised estimate. This is why reserving matters to solvency." : "Liabilities now exceed assets. The insurer is **insolvent**, on paper before anyone noticed in the bank account.")
      },
      {
        h: "Solvency II",
        say: "The rules on how much margin an insurer must hold come from **Solvency II**, the European regime in force since 2016, supervised day to day in the UK by the **PRA**. It rests on three pillars.",
        scene: () => flow({
          h: 150,
          nodes: [
            { id: "s", x: 95, y: 4, label: "Solvency II", tone: "ink" },
            { id: "1", x: 4, y: 96, w: 104, label: "1. Quantitative", sub: "How much capital" },
            { id: "2", x: 118, y: 96, w: 104, label: "2. Supervisory", sub: "How well run" },
            { id: "3", x: 232, y: 96, w: 104, label: "3. Disclosure", sub: "What is reported" }
          ],
          edges: [["s", "1"], ["s", "2"], ["s", "3"]]
        }),
        ask: {
          q: "A regulator reviews whether an insurer’s board really understands and manages its risks. Which pillar?",
          opts: ["Pillar 1: quantitative requirements.", "Pillar 2: supervisory review.", "Pillar 3: disclosure."],
          a: 1,
          why: "Pillar 1 is the capital number. Pillar 2 is governance and risk management, tested by the supervisor. Pillar 3 is reporting to the regulator and the public. Its aims: better regulation, deeper integration, stronger policyholder protection and more competition."
        }
      },
      {
        h: "Risks that aren’t insurance",
        say: "Capital must cover more than bad claims years. An insurer also faces **market risk** (investments fall), **credit risk** (someone who owes it money fails), **liquidity risk** (assets can’t be sold quickly enough), **operational risk** (systems, people, fraud) and **group risk** (trouble elsewhere in its group).",
        scene: () => flow({
          h: 170,
          nodes: [
            { id: "c", x: 95, y: 4, label: "Capital must cover", tone: "ink" },
            { id: "m", x: 4, y: 76, w: 104, label: "Market" }, { id: "cr", x: 118, y: 76, w: 104, label: "Credit" }, { id: "l", x: 232, y: 76, w: 104, label: "Liquidity" },
            { id: "o", x: 60, y: 126, w: 104, label: "Operational" }, { id: "g", x: 176, y: 126, w: 104, label: "Group" }
          ],
          edges: [["c", "m"], ["c", "cr"], ["c", "l"]]
        }),
        ask: {
          q: "An insurer is owed £30m by a reinsurer that collapses. Which risk has just bitten?",
          opts: ["Market risk.", "Credit risk.", "Operational risk."],
          a: 1,
          why: "Also called **counterparty risk**. The insurer still owes its own policyholders in full, so a failed reinsurer is a hole in its assets."
        }
      },
      {
        h: "Lloyd’s chain of security",
        say: "A Lloyd’s policy is backed by three links, used in order. **First**, the premiums held in trust for each syndicate. **Second**, the funds each member has deposited at Lloyd’s. **Third**, the **Central Fund**, topped up by a contribution from every premium written in the market.\n\nPush a syndicate’s claims up.",
        scene: (v) => {
          const a = Math.min(v.claims, 200), b = Math.min(Math.max(v.claims - 200, 0), 150), c = Math.max(v.claims - 350, 0);
          return bars([
            { label: "1. Premium trust funds", right: `${money(a)} of £200m`, segs: [[a, "c1"]] },
            { label: "2. Members’ funds at Lloyd’s", right: `${money(b)} of £150m`, segs: [[b, "c2"]] },
            { label: "3. The Central Fund", right: money(c), segs: [[c, "bad"]] }
          ], { max: 200 });
        },
        ctl: [{ k: "claims", label: "Claims this year", min: 50, max: 520, step: 10, fmt: money }],
        live: (v) => (v.claims <= 200 ? "An ordinary year: premiums pay the claims and the members’ capital is untouched."
          : v.claims <= 350 ? `The trust funds are exhausted. Members pay **${money(v.claims - 200)}** from their own funds. Policyholders notice nothing.`
            : `Members’ funds are gone too. **${money(v.claims - 350)}** falls on the Central Fund, which every member of Lloyd’s pays into.`)
      },
      {
        h: "One market, one test",
        say: "Because of that shared third link, solvency rules treat **Lloyd’s as a single entity**, and the market carries one financial strength rating for every syndicate.",
        scene: () => flow({
          h: 150,
          nodes: [
            { id: "cf", x: 95, y: 4, label: "The Central Fund", sub: "Shared by every member", tone: "ink" },
            { id: "r", x: 4, y: 100, w: 150, label: "One market rating", tone: "good" },
            { id: "o", x: 186, y: 100, w: 150, label: "Close oversight", tone: "c2" }
          ],
          edges: [["cf", "r"], ["cf", "o"]]
        }),
        ask: {
          q: "A small new syndicate and the largest syndicate each write 10% of a risk. Whose line is better secured?",
          opts: ["The largest syndicate’s.", "Neither: both carry the same market backing."],
          a: 1,
          why: "Every Lloyd’s line has the full chain behind it. That is the commercial value of the platform, and the reason Lloyd’s polices each syndicate: one failure costs everyone."
        }
      },
      {
        h: "Rating agencies",
        say: "Brokers can’t audit every insurer, so they lean on **rating agencies**: A.M. Best, Standard & Poor’s and Fitch. Each publishes a grade based on an insurer’s capital, management, operations and business profile.\n\nRatings move. And many clients, and brokers’ security committees, set a **minimum** rating below which they will not place.",
        scene: () => bars([
          { label: "Insurer A, rated A+", right: "accepted", segs: [[90, "c1"]] },
          { label: "Insurer B, rated A", right: "accepted", segs: [[78, "c1"]] },
          { label: "Insurer C, downgraded to BBB", right: "below the line", segs: [[52, "bad"]] }
        ], { max: 100, marks: [[70, "Broker’s minimum"]] }),
        ask: {
          q: "An insurer is downgraded while its rivals are not. What happens next?",
          opts: ["Nothing until the next renewal.", "Brokers start moving business to better-rated rivals."],
          a: 1,
          why: "A broker that places a client with a weak insurer risks being sued for negligence if that insurer fails. So a downgrade below a common minimum can drain an insurer’s business quickly, which weakens it further."
        }
      },
      {
        h: "In four lines",
        say: "Security is the first thing a broker checks and the last thing a client thinks about, until the day it matters.",
        scene: () => recap([
          "Solvency: assets must exceed liabilities, and liabilities are partly estimates.",
          "Solvency II: three pillars: capital, supervision, disclosure.",
          "Lloyd’s chain: premium trust funds, members’ funds, the Central Fund.",
          "Ratings from A.M. Best, S&P and Fitch steer where brokers place business."
        ])
      }
    ]
  });
})();
