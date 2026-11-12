/* LM1 · 8 — Brokers and underwriters at work */
(() => {
  const { bars, flow, stats, recap, pct, num } = window.SLIP.kit;
  const NAMES = ["Leader", "B", "C", "D"], TONES = ["c1", "c2", "c3", "ink"];
  const written = (v) => [v.a, v.b, v.c, v.d];
  const sign = (v) => {
    const w = written(v), W = w.reduce((x, y) => x + y, 0);
    if (W <= 100) return { w, W, s: w.slice(), f: 1 };
    if (v.stand) { const f = Math.min(1, Math.max(0, 100 - v.a) / (W - v.a)); return { w, W, f, s: w.map((x, i) => (i ? x * f : x)) }; }
    return { w, W, f: 100 / W, s: w.map((x) => (x * 100) / W) };
  };
  const row = (label, arr, total) => ({ label, right: pct(total, 1), segs: arr.map((x, i) => [x, TONES[i], `${num(x, 1)}%`]) });
  const lineCtl = (k, label) => ({ k, label, min: 0, max: 50, step: 2.5, fmt: (x) => pct(x, 1) });

  window.SLIP.chapters.push({
    id: "broking", part: "LM1",
    title: "Brokers and underwriters at work",
    blurb: "The law of agency, the underwriter’s four decisions, and a slip you fill and sign down yourself.",
    minutes: 10,
    init: { a: 25, b: 20, c: 20, d: 15, stand: 0 },
    steps: [
      {
        h: "The broker is an agent",
        say: "An **agent** acts on behalf of someone else, the **principal**, and can bind them. A broker is the agent of the **insured**: its client’s professional adviser in placing the risk and in making claims.\n\nThe terms of each relationship are written into a **Terms of Business Agreement** (TOBA): one with the client, and one with each insurer.",
        scene: () => flow({
          h: 130,
          nodes: [
            { id: "c", x: 4, y: 40, w: 96, label: "Client", sub: "Principal", tone: "ink" },
            { id: "b", x: 122, y: 40, w: 96, label: "Broker", sub: "Agent", tone: "c1" },
            { id: "u", x: 240, y: 40, w: 96, label: "Insurers" }
          ],
          edges: [["c", "b", "TOBA"], ["b", "u", "TOBA"]]
        }),
        ask: {
          q: "The insurers allow the broker its commission out of the premium. Whose agent is the broker?",
          opts: [
          ["The insurers’, since they pay.", "The money comes out of the client’s premium. Who hands it over doesn’t decide who is served."],
          "The client’s.",
          ["Both, equally.", "An agent can’t serve two principals with opposite interests in the same deal."],
          ["Nobody’s: a broker is independent.", "Independent of insurers, yes. But it acts for someone, and can bind them."]
        ],
          a: 1,
          why: "The broker is the agent of the insured. One exception: a broker holding **delegated authority** from an insurer acts for that insurer when it uses it, and must manage the conflict."
        }
      },
      {
        h: "How agency begins and ends",
        say: "Agency is usually created by **consent**: the client appoints the broker. It can also arise from **necessity**, in an emergency, or by **ratification**, when a principal approves afterwards something the agent did without authority.\n\nIt ends by agreement, by either side ending it, or on the death, insanity or bankruptcy of either.",
        scene: () => flow({
          h: 130,
          nodes: [
            { id: "a", x: 4, y: 4, w: 104, label: "Consent" }, { id: "b", x: 118, y: 4, w: 104, label: "Necessity" }, { id: "c", x: 232, y: 4, w: 104, label: "Ratification" },
            { id: "k", x: 95, y: 84, label: "Agency exists", tone: "ink" }
          ],
          edges: [["a", "k"], ["b", "k"], ["c", "k"]]
        }),
        ask: {
          q: "A broker, without asking, extends a client’s cover to a new warehouse. Told later, the client says “Good, keep it.” What has happened?",
          opts: [
          ["Nothing. An unauthorised act is void.", "It was unauthorised when done. But the principal can adopt it."],
          "Ratification.",
          ["Agency by necessity.", "Necessity needs an emergency in which the principal couldn’t be reached. Nothing suggests that."],
          ["Agency by consent.", "Consent comes before the act. Here approval came after."]
        ],
          a: 1,
          why: "By approving afterwards, the client is bound as if it had authorised the broker in advance. Had the client refused, the broker would have been left personally exposed."
        }
      },
      {
        h: "The underwriter’s four decisions",
        say: "An **underwriter** decides, on the insurer’s behalf, whether to accept a risk and on what terms. Each insurer employs several, each a specialist in a class.\n\nEvery risk gets the same four questions. Is it a fair risk for the pool? Do we want it, and **how much** of it? On what **terms**? For what **premium**?",
        scene: () => flow({
          h: 250,
          nodes: [
            { id: "1", x: 95, y: 4, label: "1. Assess the risk", tone: "ink" },
            { id: "2", x: 95, y: 68, label: "2. Accept? How much?" },
            { id: "3", x: 95, y: 132, label: "3. Set the terms" },
            { id: "4", x: 95, y: 196, label: "4. Price it", tone: "c1" }
          ],
          edges: [["1", "2"], ["2", "3"], ["3", "4"]]
        }),
        ask: {
          q: "An underwriter likes a risk and the price, but already has many similar risks in the same port. Which of the four decisions is really in play?",
          opts: [
          ["Is it a fair risk for the pool?", "She has already decided it is."],
          "How much of it do we want?",
          ["On what terms?", "Terms change what is covered. Her concern is how much she holds in one place."],
          ["For what premium?", "She is happy with the price."]
        ],
          a: 1,
          why: "A good risk can still be one you want only a little of. Line size is where an underwriter controls her exposure to any single event."
        }
      },
      {
        h: "Collect the lines",
        say: "You are the broker. A **leader** has set the terms. Now fill the slip: set the line each underwriter will write.",
        scene: (v) => {
          const { w, W } = sign(v);
          return stats([["Written so far", pct(W, 1), W < 100 ? "bad" : "good"], ["Still to place", pct(Math.max(0, 100 - W), 1)]]) +
            bars([row("Written lines", w, W)], { max: Math.max(100, W) * 1.04, marks: [[100, "100%"]], legend: NAMES.map((n, i) => [TONES[i], n]) });
        },
        ctl: [lineCtl("a", "Leader"), lineCtl("b", "Underwriter B"), lineCtl("c", "Underwriter C"), lineCtl("d", "Underwriter D")],
        live: (v) => {
          const { W } = sign(v);
          if (W < 100) return `**${pct(100 - W, 1)} unplaced.** Part of the risk has no insurer. Find more lines.`;
          if (W === 100) return "**Exactly 100%.** Placed, with nothing to spare if someone pulls out.";
          return `**Oversubscribed at ${pct(W, 1)}.** Brokers aim for this. But there is only 100% of a risk to insure, so something has to give.`;
        },
        goal: {
          say: "Complete the slip at exactly 100%, with the leader on at least 30% and no follower above 25%.",
          test: (v) => v.a + v.b + v.c + v.d === 100 && v.a >= 30 && v.b <= 25 && v.c <= 25 && v.d <= 25,
          done: "Placed. Clients and followers both like to see a leader with real money on the line: it shows the terms were set by someone who has to live with them."
        }
      },
      {
        h: "More than 100%",
        set: { a: 40, b: 30, c: 30, d: 25, stand: 0 },
        say: "You have collected 40%, 30%, 30% and 25%: a total of **125%**.",
        scene: (v) => bars([row("Written lines", written(v), 125)], { max: 130, marks: [[100, "100%"]], legend: NAMES.map((n, i) => [TONES[i], n]) }),
        ask: {
          q: "The leader wrote 40%. What share does the leader end up with?",
          fix: true,
          opts: [
          ["40%. A deal is a deal.", "Then the slip would total 125% and the client would be over-insured."],
          "32%.",
          ["25%. An equal quarter each.", "Lines are scaled in proportion, not levelled."],
          ["15%. The leader absorbs the whole excess.", "Everyone shares the reduction in proportion."]
        ],
          a: 1,
          why: "Every line is scaled by 100 ÷ 125 = **0.8**. What an underwriter agrees is the **written line**; what it finally carries is the **signed line**. Premium and claims follow the signed line."
        }
      },
      {
        h: "Signing down",
        say: "An underwriter who refuses to be cut can ask for its line **to stand**. Try it for the leader, and watch who absorbs the squeeze.",
        scene: (v) => {
          const { w, W, s, f } = sign(v);
          return stats([["Factor", W > 100 ? num(f, 3) : "none"], ["Leader signs", pct(s[0], 1), "c1"], ["B signs", pct(s[1], 1), "c2"]]) +
            bars([row("Written", w, W), row("Signed", s, s.reduce((x, y) => x + y, 0))], { max: Math.max(100, W) * 1.04, marks: [[100, "100%"]] });
        },
        ctl: [{ k: "stand", label: "Leader’s line", opts: ["Signed down", "To stand"] }, lineCtl("d", "Underwriter D’s written line")],
        live: (v) => {
          const { W, s, f } = sign(v);
          if (W <= 100) return "At or under 100% there is nothing to sign down.";
          return v.stand ? `The leader keeps its full ${pct(v.a, 1)}. The others share what is left: each is multiplied by **${num(f, 3)}**, so B’s ${pct(v.b, 1)} becomes ${pct(s[1], 1)}.`
            : `Everyone is multiplied by 100 ÷ ${num(W, 1)} = **${num(f, 3)}**.`;
        },
        goal: {
          say: "Let the leader’s 40% stand. Then find the written line for D at which every follower signs for exactly three quarters of what it wrote.",
          test: (v) => v.stand === 1 && v.d === 20,
          done: "The followers wrote 80% between them and must fit into the 60% the leader has left: 60 ÷ 80 = 0.75. One line standing means everyone else is squeezed harder."
        }
      },
      {
        h: "Leaders and followers",
        say: "The underwriter the broker approaches first to set terms is the **leader**. A risk shared with other countries may have an **overall leader** abroad and a **slip leader** in London. The first Lloyd’s syndicate and the first IUA company on the slip are the **bureau leaders**.\n\nEveryone else is a **follower**. Followers should still judge the risk for themselves.",
        scene: () => flow({
          h: 190,
          nodes: [
            { id: "o", x: 95, y: 4, label: "Overall leader", sub: "May be outside London" },
            { id: "s", x: 95, y: 74, label: "Slip leader", sub: "Sets London terms", tone: "c1" },
            { id: "l", x: 4, y: 144, w: 150, label: "Lloyd’s bureau leader" }, { id: "c", x: 186, y: 144, w: 150, label: "Company bureau leader" }
          ],
          edges: [["o", "s"], ["s", "l"], ["s", "c"]]
        }),
        ask: {
          q: "A follower will only join for 10% more premium than the leader took. What follows?",
          opts: [
          ["The leader gets the extra too: one slip, one price.", "Not automatically. Each insurer contracts for its own share on its own terms."],
          "That follower gets its price; the slip now carries different terms.",
          ["The follower must accept the leader’s price or leave.", "A follower is free to ask for more. The broker decides whether to pay it."],
          ["The slip is void until all agree.", "Slips with differing terms exist. They are just harder to manage."]
        ],
          a: 1,
          why: "A follower isn’t obliged to accept the leader’s terms. But different terms on one slip mean, in effect, several leaders, and the **market agreements** that let a leader agree changes and claims for everyone work less well."
        }
      },
      {
        h: "Money and claims run through the broker",
        say: "In London, **premium** generally travels from client to broker to insurers, and **claims** money travels back the same way. The broker presents the claim, negotiates for the client, and passes on the payment.\n\nA good broker’s knowledge makes both journeys faster.",
        scene: () => flow({
          h: 130,
          nodes: [
            { id: "c", x: 4, y: 40, w: 96, label: "Client", tone: "ink" },
            { id: "b", x: 122, y: 40, w: 96, label: "Broker", tone: "c1" },
            { id: "u", x: 240, y: 40, w: 96, label: "Insurers" }
          ],
          edges: [["c", "b", "premium", { dy: -9 }], ["b", "u", "premium", { dy: -9 }], ["u", "b", "claims", { dy: 9 }], ["b", "c", "claims", { dy: 9 }]]
        }),
        ask: {
          q: "A client’s factory burns. Who presents the claim to the insurers and negotiates it?",
          opts: [
          ["The loss adjuster.", "The adjuster investigates for the insurers. It doesn’t argue the client’s case."],
          "The broker, acting for the client.",
          ["The leading underwriter.", "The leader agrees the claim for insurers. Someone has to bring it to them."],
          ["The client must deal with each insurer directly.", "With twenty insurers on a slip, that is exactly what the broker is there to spare them."]
        ],
          a: 1,
          why: "The broker’s agency doesn’t end at placement. It presents the claim, negotiates for the client and passes on the payment."
        }
      },
      {
        h: "LM1 in five lines",
        say: "That completes the essentials. LM2 takes each idea further and adds the arithmetic.",
        scene: () => recap([
          "A broker is the insured’s agent; agency arises by consent, necessity or ratification.",
          "An underwriter assesses, accepts a share, sets terms and prices.",
          "Written lines above 100% are signed down in proportion.",
          "The leader sets terms; followers decide independently.",
          "Premiums and claims both flow through the broker."
        ])
      }
    ]
  });
})();
