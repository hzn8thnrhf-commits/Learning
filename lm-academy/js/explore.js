/* The Slip — "Try it" models. Each model has sliders (inputs) and a compute function that
   returns a chart (any figure type the app draws), a few headline numbers and a short
   explanation of cause and effect. Figures in £m unless a model says otherwise. */
window.SLIP_DATA = window.SLIP_DATA || {};
(() => {
  const seq = (n, f) => Array.from({ length: n }, (_, i) => f(i));
  const r1 = (v) => Math.round(v * 10) / 10;
  const r2 = (v) => Math.round(v * 100) / 100;
  const pc = (v) => `${r1(v)}%`;

  const X = {};

  /* ---------------------------------------------------------------- m01 */
  X.subscription = {
    title: "How many insurers does one risk need?",
    blurb: "Grow the risk or shrink the lines, and count the insurers on the slip.",
    ask: "A broker is placing a large refinery. Make the risk bigger, or make each insurer more cautious, and watch how many insurers the slip needs.",
    inputs: [
      { k: "size", label: "Sum insured", min: 100, max: 3000, step: 100, value: 1000, unit: "m" },
      { k: "line", label: "Line each insurer would like to write", min: 2.5, max: 25, step: 2.5, value: 5, unit: "pct" },
      { k: "cap", label: "Most any one insurer will lose on one risk", min: 10, max: 200, step: 10, value: 50, unit: "m" }
    ],
    presets: [
      { label: "Mid-size factory", v: { size: 200, line: 20, cap: 50 } },
      { label: "Refinery", v: { size: 1000, line: 5, cap: 50 } },
      { label: "Mega-risk", v: { size: 3000, line: 10, cap: 60 } }
    ],
    compute(v, H) {
      const capLine = (v.cap / v.size) * 100;
      const capped = capLine < v.line;
      const line = Math.min(v.line, capLine);
      const n = Math.ceil(100 / line - 1e-9);
      const last = r2(100 - line * (n - 1));
      const segs = seq(n, (i) => [i === n - 1 ? last : line, n <= 10 ? pc(i === n - 1 ? last : line) : "", i % 2 ? "c1m" : "c1"]);
      const each = (line / 100) * v.size;
      const insight = capped
        ? `Each insurer would happily write ${pc(v.line)}, but ${pc(v.line)} of ${H.fmtM(v.size)} is ${H.fmtM((v.line / 100) * v.size)}, more than any of them will lose on one risk. So each line is cut to ${pc(line)} (${H.fmtM(each)}), and the broker needs **${n} insurers**.\n\nNotice the cause and effect: a bigger risk with the same appetite means smaller lines and a longer slip.`
        : `With ${pc(line)} lines the broker needs **${n} insurers**, and none of them can lose more than ${H.fmtM(each)} if the whole risk is destroyed.\n\nHalve the line and you double the number of insurers. That is the subscription market at work: no single balance sheet takes the full hit.`;
      return {
        readouts: [["Insurers needed", String(n), capped ? "bad" : ""], ["Each line", pc(line)], ["Worst loss each", H.fmtM(each)]],
        chart: {
          type: "bars",
          scale: 100,
          ticks: [0, 25, 50, 75, 100],
          suffix: "%",
          rows: [{ label: "The slip, 100% of the risk", total: `${n} lines`, segs }],
          legend: [["c1", "One insurer’s line"]]
        },
        insight
      };
    }
  };

  /* ---------------------------------------------------------------- m02 */
  const k0 = (x) => `£${Math.round(x).toLocaleString("en-GB")}k`;
  X["premium-flow"] = {
    title: "Who gets the client’s premium?",
    blurb: "Change the brokerage and see what the client pays for the same cover.",
    ask: "The insurer needs a set net premium to cover its claims, costs and profit. Change the brokerage and how the two brokers share it, and watch what the client pays.",
    inputs: [
      { k: "net", label: "Net premium the insurer needs", min: 100, max: 1000, step: 25, value: 400, unit: "k" },
      { k: "brk", label: "Brokerage, as a share of gross premium", min: 0, max: 35, step: 2.5, value: 20, unit: "pct" },
      { k: "ret", label: "Retail broker’s share of the brokerage", min: 0, max: 80, step: 5, value: 50, unit: "pct" }
    ],
    presets: [
      { label: "One broker, 15%", v: { brk: 15, ret: 0 } },
      { label: "Two brokers, 25%", v: { brk: 25, ret: 50 } }
    ],
    compute(v) {
      const gross = v.net / (1 - v.brk / 100);
      const brokerage = gross - v.net;
      const retail = (brokerage * v.ret) / 100;
      const london = brokerage - retail;
      const p = (x) => (x / gross) * 100;
      const uplift = (gross / v.net - 1) * 100;
      const insight = v.brk === 0
        ? `With no brokerage the client pays exactly the ${k0(v.net)} the insurer needs. In practice the broker would then charge the client a fee instead: distribution is never free, only paid differently.`
        : `Brokerage of ${pc(v.brk)} is a share of the **gross** premium, so for the insurer to keep ${k0(v.net)} it must charge ${k0(gross)}. That is ${r1(uplift)}% on top of the net, more than the headline ${pc(v.brk)}.\n\n${v.ret > 0 ? `The two brokers share ${k0(brokerage)}: ${k0(london)} to London and ${k0(retail)} to the retail broker. Notice that changing the split doesn’t change what the client pays; only the rate does.` : `One broker keeps all ${k0(brokerage)}. Add a retail broker and the same brokerage is shared, unless the rate rises to pay both.`}`;
      return {
        readouts: [["Client pays", k0(gross)], ["Brokerage", k0(brokerage)], ["Above the net", `+${r1(uplift)}%`, uplift > 30 ? "bad" : ""]],
        chart: {
          type: "bars",
          scale: 100,
          ticks: [0, 25, 50, 75, 100],
          suffix: "%",
          rows: [{
            label: "The client’s gross premium",
            total: k0(gross),
            segs: [[p(v.net), "Insurer", "c1"], [p(london), p(london) >= 15 ? "London" : "", "c2"], [p(retail), p(retail) >= 15 ? "Retail" : "", "c3"]]
          }],
          legend: [["c1", `Insurer ${k0(v.net)}`], ["c2", `London broker ${k0(london)}`], ["c3", `Retail broker ${k0(retail)}`]]
        },
        insight
      };
    }
  };

  const usd = (v) => (v >= 1000 ? `US$${r2(v / 1000)}bn` : `US$${Math.round(v)}m`);
  X["pi-claim"] = {
    title: "Where does a P&I claim land?",
    blurb: "Grow a shipowner’s liability claim and watch it climb from one club to the whole market.",
    ask: "A member’s ship causes a liability claim. Make the claim bigger and see who pays each part. (Illustrative layers: each club keeps the first US$10m, the pool shares claims to US$100m, and the clubs’ joint reinsurance runs to US$3.1bn.)",
    inputs: [
      { k: "claim", label: "Size of the claim", values: [1, 3, 5, 8, 10, 15, 25, 50, 75, 100, 150, 300, 500, 1000, 2000, 3100, 4000, 5000], value: 50, unit: "usd" }
    ],
    presets: [
      { label: "Crew injury", v: { claim: 3 } },
      { label: "Cargo dispute", v: { claim: 15 } },
      { label: "Major spill", v: { claim: 1000 } },
      { label: "Beyond the programme", v: { claim: 4000 } }
    ],
    compute(v) {
      const c = v.claim;
      const club = Math.min(c, 10);
      const pool = Math.min(Math.max(c - 10, 0), 90);
      const gxl = Math.min(Math.max(c - 100, 0), 3000);
      const over = Math.max(c - 3100, 0);
      const row = (label, used, size, tone) => ({ label, total: usd(used), segs: [[(used / size) * 100, used ? usd(used) : "", tone]] });
      let insight;
      if (c <= 10) insight = `A ${usd(c)} claim stays entirely with the member’s own club. Most P&I claims, a crew injury or a cargo dispute, never leave the club.`;
      else if (c <= 100) insight = `The club pays the first US$10m and the other ${usd(pool)} is shared among the International Group’s clubs through the pool.\n\nEvery club bears a slice, so one club’s bad year is cushioned by the others. It is the subscription idea again, between mutuals.`;
      else if (c <= 3100) insight = `This is a very large casualty, such as a major oil spill or wreck removal. The club pays US$10m, the pool US$90m and the Group’s reinsurers ${usd(gxl)}.\n\nNotice what has happened: the mutuals have passed their catastrophe risk to the commercial reinsurance market.`;
      else insight = `The claim has exhausted the reinsurance programme. The overspill of ${usd(over)} falls back on all the clubs, and through them on their members.\n\nIn a mutual, the members are always the last line.`;
      return {
        readouts: [["Own club", usd(club)], ["Pool", usd(pool)], ["Reinsurers", usd(gxl)], ["Overspill", usd(over), over ? "bad" : ""]],
        chart: {
          type: "bars",
          scale: 100,
          ticks: [0, 50, 100],
          suffix: "%",
          rows: [
            row("Own club · first US$10m", club, 10, "neutral"),
            row("Pool · to US$100m", pool, 90, "c1"),
            row("Reinsurance · to US$3.1bn", gxl, 3000, "c2"),
            row("Overspill · above that", over, 1900, "c3")
          ]
        },
        insight
      };
    }
  };

  /* ---------------------------------------------------------------- m03 */
  X.fal = {
    title: "How much capital does a plan need?",
    blurb: "Shift the book towards catastrophe risk, or cut the reinsurance, and watch the capital climb.",
    ask: "A syndicate is planning its year. Change its premium, how much of the book is exposed to catastrophes, and how much of that it reinsures. (An illustrative model, not Lloyd’s actual formula.)",
    inputs: [
      { k: "prem", label: "Capacity, the planned premium", min: 100, max: 1000, step: 50, value: 500, unit: "m" },
      { k: "cat", label: "Share of the book exposed to catastrophes", min: 0, max: 80, step: 5, value: 30, unit: "pct" },
      { k: "ri", label: "Catastrophe risk passed to reinsurers", min: 0, max: 80, step: 5, value: 50, unit: "pct" }
    ],
    presets: [
      { label: "Steady casualty book", v: { cat: 0, ri: 0 } },
      { label: "Catastrophe specialist", v: { cat: 70, ri: 30 } }
    ],
    compute(v, H) {
      const steady = v.prem * (1 - v.cat / 100) * 0.32;
      const perCat = 1.1 * (1 - (0.7 * v.ri) / 100);
      const cat = v.prem * (v.cat / 100) * perCat;
      const scr = Math.sqrt(steady * steady + cat * cat + 0.5 * steady * cat);
      const div = scr - steady - cat;
      const fal = scr * 1.35;
      const pence = Math.round((fal / v.prem) * 100);
      let insight = `The plan needs ${H.fmtM(fal)} of members’ capital: **${pence}p for every £1 of capacity**.`;
      if (v.cat >= 50) insight += `\n\nThis is a catastrophe-heavy book. One bad hurricane season could cost several years of premium, so each £1 of catastrophe premium needs about ${Math.round(perCat * 100)}p of capital before diversification, against 32p for steady business.`;
      else if (v.cat > 0) insight += `\n\nNotice the difference in weight: each £1 of catastrophe premium needs about ${Math.round(perCat * 100)}p of capital before diversification, against 32p for steady business.`;
      else insight += `\n\nWith no catastrophe exposure, the book is made of many independent risks whose bad years are mild, so capital per pound is low.`;
      if (v.cat > 0 && v.ri <= 20) insight += ` With so little reinsurance, the members’ own capital must absorb the catastrophe. Buy more and the requirement falls, at the cost of reinsurance premium.`;
      if (div < -1) insight += `\n\nDiversification saves ${H.fmtM(-div)}: the two kinds of risk rarely go badly wrong in the same year.`;
      return {
        readouts: [["Capital requirement", H.fmtM(scr)], ["Funds at Lloyd’s", H.fmtM(fal)], ["Per £1 of capacity", `${pence}p`, pence > 70 ? "bad" : ""]],
        chart: {
          type: "waterfall",
          prefix: "£",
          suffix: "m",
          dp: 0,
          legend: [["c1", "Adds capital"], ["c2", "Reduces it"], ["total", "Total"]],
          steps: [
            { label: "Steady business", value: steady },
            { label: "Catastrophe risk", value: cat },
            { label: "Diversification", value: div },
            { label: "Requirement", total: true },
            { label: "Lloyd’s 35% uplift", value: scr * 0.35 },
            { label: "Funds at Lloyd’s", total: true }
          ]
        },
        insight
      };
    }
  };

  X.chain = {
    title: "Which link pays the claims?",
    blurb: "Push a syndicate’s claims up and watch them work down the chain of security.",
    ask: "A syndicate has a bad year. Raise its claims, or change how much it holds at each link, and see where the money comes from. (Assume the members can’t put in more than their Funds at Lloyd’s.)",
    inputs: [
      { k: "claims", label: "Claims to pay this year", min: 0, max: 600, step: 10, value: 250, unit: "m" },
      { k: "own", label: "Syndicate’s own assets", min: 100, max: 400, step: 10, value: 200, unit: "m" },
      { k: "fal", label: "Members’ Funds at Lloyd’s", min: 50, max: 300, step: 10, value: 150, unit: "m" }
    ],
    presets: [
      { label: "Ordinary year", v: { claims: 150 } },
      { label: "Bad year", v: { claims: 280 } },
      { label: "Disaster", v: { claims: 500 } }
    ],
    compute(v, H) {
      const a = Math.min(v.claims, v.own);
      const b = Math.min(Math.max(v.claims - v.own, 0), v.fal);
      const c = Math.max(v.claims - v.own - v.fal, 0);
      let insight;
      if (v.claims <= v.own) insight = `An ordinary year: the syndicate’s own premiums and reserves pay every claim. The members’ capital isn’t touched; it simply sits in trust, as it does in most years.`;
      else if (c === 0) insight = `A bad year. The syndicate’s own funds are exhausted, and members pay ${H.fmtM(b)} from their Funds at Lloyd’s, ${Math.round((b / v.fal) * 100)}% of what they lodged.\n\nThe policyholders notice nothing; the members certainly do.`;
      else insight = `A disaster. The syndicate’s funds and the members’ FAL are both used up, and the Central Fund pays ${H.fmtM(c)}.\n\nEvery member of Lloyd’s now shares this loss through the fund they all contribute to, which is exactly why the market polices every syndicate’s plan.`;
      return {
        readouts: [["Syndicate pays", H.fmtM(a)], ["Members pay", H.fmtM(b)], ["Central Fund", H.fmtM(c), c ? "bad" : ""]],
        chart: {
          type: "bars",
          scale: 100,
          ticks: [0, 50, 100],
          suffix: "%",
          rows: [
            { label: "1. Syndicate assets", total: `${H.fmtM(a)} of ${H.fmtM(v.own)}`, segs: [[(a / v.own) * 100, "", "c1"]] },
            { label: "2. Members’ FAL", total: `${H.fmtM(b)} of ${H.fmtM(v.fal)}`, segs: [[(b / v.fal) * 100, "", "c2"]] },
            { label: "3. Central Fund", total: H.fmtM(c), segs: [[Math.min(100, (c / 300) * 100), "", "c3"]] }
          ]
        },
        insight
      };
    }
  };

  X.ritc = {
    title: "Is the closing price fair?",
    blurb: "Get the estimate of old claims wrong and see who wins and who loses.",
    ask: "The 2024 year of account earned £100m of premium and spent £25m on expenses. Set what it has paid in claims, the estimate of claims still to come, and then how that estimate turns out.",
    inputs: [
      { k: "paid", label: "Claims paid by the end of year three", min: 20, max: 80, step: 1, value: 45, unit: "m" },
      { k: "est", label: "Estimated claims still to come", min: 0, max: 60, step: 1, value: 25, unit: "m" },
      { k: "err", label: "How the estimate turns out", min: -40, max: 40, step: 5, value: 0, show: (x) => (x === 0 ? "Spot on" : `${x > 0 ? "+" : "−"}${Math.abs(x)}%`) }
    ],
    compute(v, H) {
      const result = 100 - 25 - v.paid - v.est;
      const actual = v.est * (1 + v.err / 100);
      const gain = v.est - actual;
      let insight;
      if (v.err === 0) insight = `The estimate was right, so the deal is fair to both sides. The 2024 members ${result >= 0 ? `receive ${H.fmtM(result)}` : `pay in ${H.fmtM(-result)}`}, and the 2025 year breaks even on the claims it took on.`;
      else if (v.err > 0) insight = `The old claims cost ${H.fmtM(actual)}, ${v.err}% more than the ${H.fmtM(v.est)} estimate. The **2025 members lose ${H.fmtM(-gain)}** on business they never wrote, while the 2024 members kept a result that was really too good.`;
      else insight = `The claims came in ${H.fmtM(gain)} below the estimate, so the **2025 members make a windfall** at the expense of the 2024 members, who paid too much to close their year.`;
      if (result < 0) insight += `\n\nNotice too that the 2024 year made a loss: its members must pay in ${H.fmtM(-result)} to close it.`;
      return {
        readouts: [["2024 members’ result", H.fmtM(result), result >= 0 ? "good" : "bad"], ["2025’s gain on old claims", H.fmtM(gain), gain > 0.05 ? "good" : gain < -0.05 ? "bad" : ""]],
        chart: {
          type: "waterfall",
          prefix: "£",
          suffix: "m",
          dp: 0,
          steps: [
            { label: "2024 premium", value: 100 },
            { label: "Expenses", value: -25 },
            { label: "Claims paid", value: -v.paid },
            { label: "RITC premium", value: -v.est },
            { label: "2024 result", total: true }
          ]
        },
        insight
      };
    }
  };

  X.spiral = {
    title: "The LMX spiral",
    blurb: "Pass one catastrophe loss around a ring of reinsurers and see where it ends up.",
    ask: "Five syndicates reinsure one another in a ring: A is reinsured by B, B by C, and so on, with E reinsured by A. A catastrophe hits A. Each keeps a small retention and passes the rest on, until someone’s reinsurance runs out.",
    inputs: [
      { k: "loss", label: "The original catastrophe loss", min: 50, max: 300, step: 10, value: 100, unit: "m" },
      { k: "ret", label: "Each syndicate’s retention", min: 2, max: 30, step: 1, value: 5, unit: "m" },
      { k: "lim", label: "Reinsurance each syndicate has bought", min: 20, max: 300, step: 10, value: 100, unit: "m" }
    ],
    presets: [
      { label: "Thin retentions", v: { ret: 3, lim: 150 } },
      { label: "Prudent retentions", v: { ret: 25, lim: 100 } }
    ],
    compute(v, H) {
      const n = 5;
      const names = ["A", "B", "C", "D", "E"];
      const G = Array(n).fill(0);
      const R = Array(n).fill(0);
      G[0] = v.loss;
      let moving = true;
      let guard = 0;
      while (moving && guard++ < 2000) {
        moving = false;
        for (let i = 0; i < n; i++) {
          const due = Math.min(Math.max(G[i] - v.ret, 0), v.lim);
          const extra = due - R[i];
          if (extra > 1e-6) { R[i] = due; G[(i + 1) % n] += extra; moving = true; }
        }
      }
      const net = G.map((g, i) => g - R[i]);
      const passed = G.reduce((a, b) => a + b, 0) - v.loss;
      const worst = net.indexOf(Math.max(...net));
      const even = Math.max(...net) - Math.min(...net) < 0.5;
      const insight = even
        ? `With retentions of ${H.fmtM(v.ret)}, each syndicate keeps a fair share and the loss stops circulating: the reinsurance did what it was meant to do, spreading the loss across the market.`
        : `The ${H.fmtM(v.loss)} loss generated **${H.fmtM(passed)} of reinsurance claims** as it circled the ring, ${r1((passed + v.loss) / v.loss)} times the real loss. Yet the market as a whole still lost only ${H.fmtM(v.loss)}.\n\nMost syndicates kept just their ${H.fmtM(v.ret)} retention. Syndicate ${names[worst]}, whose reinsurance ran out first, was left holding ${H.fmtM(net[worst])}. Notice that buying more reinsurance in a closed ring only makes the parcel go round more times; it doesn’t make the loss go away.`;
      return {
        readouts: [["Claims passed round", H.fmtM(passed), passed > v.loss * 2 ? "bad" : ""], ["Largest net loss", `${names[worst]}: ${H.fmtM(net[worst])}`]],
        chart: {
          type: "bars",
          scale: v.loss,
          ticks: [0, v.loss / 2, v.loss].map((x) => Math.round(x)),
          prefix: "£",
          suffix: "m",
          rows: names.map((nm, i) => ({ label: `Syndicate ${nm}${i === 0 ? " · hit first" : ""}`, total: H.fmtM(net[i]), segs: [[net[i], "", i === worst && !even ? "c2" : "c1"]] }))
        },
        insight
      };
    }
  };

  /* ---------------------------------------------------------------- m04 */
  X.several = {
    title: "When one insurer can’t pay",
    blurb: "See what a failed insurer’s line costs the client when liability is several.",
    ask: "Five insurers share a risk. One becomes insolvent and its estate can pay only part of what it owes. Change the claim, the failed insurer’s line and how much its estate eventually pays.",
    inputs: [
      { k: "claim", label: "Size of the claim", min: 10, max: 200, step: 10, value: 80, unit: "m" },
      { k: "line", label: "Failed insurer’s signed line", min: 5, max: 40, step: 5, value: 15, unit: "pct" },
      { k: "rec", label: "What its estate eventually pays", min: 0, max: 100, step: 10, value: 30, show: (x) => `${x}p in the £` }
    ],
    compute(v, H) {
      const failed = (v.claim * v.line) / 100;
      const estate = (failed * v.rec) / 100;
      const gap = failed - estate;
      const others = v.claim - failed;
      const insight = gap < 0.01
        ? `The failed insurer’s estate pays in full, so the client loses nothing, though it may wait years for the money.`
        : `The other insurers pay their ${H.fmtM(others)} in full, but none of them touches the failed insurer’s ${pc(v.line)}. Its estate pays ${v.rec}p in the pound, so the client is **${H.fmtM(gap)} short**.\n\nThat gap is what several liability means in practice, and it is why brokers vet the security of every insurer on the slip, not just the leader.`;
      return {
        readouts: [["Other insurers pay", H.fmtM(others)], ["Estate pays", H.fmtM(estate)], ["Client loses", H.fmtM(gap), gap > 0.01 ? "bad" : ""]],
        chart: {
          type: "bars",
          scale: 100,
          ticks: [0, 25, 50, 75, 100],
          suffix: "%",
          rows: [{ label: "The claim", total: H.fmtM(v.claim), segs: [[100 - v.line, "Paid by the others", "c1"], [(v.line * v.rec) / 100, "", "c2"], [(v.line * (100 - v.rec)) / 100, "", "hatch"]] }],
          legend: [["c1", "Other insurers"], ["c2", "Failed insurer’s estate"], ["hatch", "Never paid"]]
        },
        insight
      };
    }
  };

  X["signing-down"] = {
    title: "Sign the lines down",
    blurb: "Collect more than 100% and watch every line shrink by the same factor.",
    ask: "Four underwriters write lines on a slip. Change their written lines, and decide whether the leader’s line stands, then see the signed lines.",
    inputs: [
      { k: "a", label: "Leader’s written line", min: 5, max: 60, step: 2.5, value: 40, unit: "pct" },
      { k: "b", label: "Follower B", min: 0, max: 50, step: 2.5, value: 30, unit: "pct" },
      { k: "c", label: "Follower C", min: 0, max: 50, step: 2.5, value: 30, unit: "pct" },
      { k: "d", label: "Follower D", min: 0, max: 50, step: 2.5, value: 25, unit: "pct" },
      { k: "stand", label: "Leader’s line to stand?", min: 0, max: 1, step: 1, value: 0, show: (x) => (x ? "Yes" : "No") }
    ],
    presets: [
      { label: "Undersubscribed", v: { a: 25, b: 20, c: 20, d: 15 } },
      { label: "Exactly 100%", v: { a: 30, b: 25, c: 25, d: 20 } },
      { label: "125%", v: { a: 40, b: 30, c: 30, d: 25 } }
    ],
    compute(v) {
      const w = [v.a, v.b, v.c, v.d];
      const W = w.reduce((x, y) => x + y, 0);
      let f = 1;
      let s = w.slice();
      if (W > 100) {
        if (v.stand) {
          const rest = W - v.a;
          f = rest > 0 ? Math.min(1, Math.max(0, 100 - v.a) / rest) : 1;
          s = w.map((x, i) => (i === 0 ? x : x * f));
        } else {
          f = 100 / W;
          s = w.map((x) => x * f);
        }
      }
      const S = s.reduce((x, y) => x + y, 0);
      const scale = Math.max(100, Math.ceil(W / 25) * 25);
      const tones = ["c1", "c2", "c3", "c4"];
      const seg = (arr) => arr.map((x, i) => [x, (x / scale) * 100 >= 11 ? `${r1(x)}%` : "", tones[i]]);
      let insight;
      if (W < 100) insight = `**Undersubscribed:** only ${pc(W)} is placed, so ${pc(100 - W)} of the risk has no insurer. The broker can’t complete the placement until it finds more lines, or the client agrees to go ahead with less than 100% covered.`;
      else if (W === 100) insight = `Exactly 100%: no signing down is needed and every written line is also the signed line. Notice there is no buffer at all if anyone withdraws before binding.`;
      else if (v.stand) insight = `Written lines total ${pc(W)}. The leader’s ${pc(v.a)} **stands**, so the other three share the remaining ${pc(Math.max(0, 100 - v.a))}: each is multiplied by ${f.toFixed(3)}.\n\nSee how the followers absorb the whole squeeze? Follower B’s ${pc(v.b)} becomes ${pc(s[1])}.`;
      else insight = `Written lines total ${pc(W)}, so every line is multiplied by 100 ÷ ${r1(W)} = **${f.toFixed(3)}**. The leader’s ${pc(v.a)} becomes ${pc(s[0])}, and the four signed lines total exactly 100%.\n\nPremium and claims will follow these signed lines, not the written ones.`;
      return {
        readouts: [["Written total", pc(W), W < 100 ? "bad" : ""], ["Factor", W > 100 ? f.toFixed(3) : "None"], ["Leader signs", pc(s[0])]],
        chart: {
          type: "bars",
          scale,
          mark: [100, "100%"],
          ticks: [0, 50].concat(scale > 100 ? [scale] : []),
          suffix: "%",
          rows: [
            { label: "Written lines", total: pc(W), segs: seg(w) },
            { label: "Signed lines", total: pc(S), segs: seg(s) }
          ],
          legend: [["c1", "Leader"], ["c2", "B"], ["c3", "C"], ["c4", "D"]]
        },
        insight
      };
    }
  };

  /* ---------------------------------------------------------------- m09 */
  const gbp = (m) => {
    if (Math.abs(m) < 0.0005) return "£0";
    if (Math.abs(m) < 1) return `${m < 0 ? "−" : ""}£${Math.round(Math.abs(m) * 1000).toLocaleString("en-GB")}k`;
    return `${m < 0 ? "−" : ""}£${r1(Math.abs(m)).toLocaleString("en-GB")}m`;
  };

  X.average = {
    title: "Underinsurance and average",
    blurb: "Insure a building for less than it’s worth and see what happens to every claim.",
    ask: "A warehouse costs a certain amount to rebuild but is insured for less, under a policy subject to average. Change the value, the sum insured and the size of the loss.",
    inputs: [
      { k: "value", label: "True rebuilding value", min: 10, max: 100, step: 5, value: 50, unit: "m" },
      { k: "si", label: "Sum insured", min: 5, max: 100, step: 5, value: 30, unit: "m" },
      { k: "loss", label: "Size of the loss", min: 1, max: 100, step: 1, value: 10, unit: "m" }
    ],
    presets: [
      { label: "Fully insured", v: { value: 50, si: 50, loss: 10 } },
      { label: "Badly underinsured", v: { value: 80, si: 30, loss: 20 } }
    ],
    compute(v, H) {
      const loss = Math.min(v.loss, v.value);
      const ratio = Math.min(1, v.si / v.value);
      const paid = Math.min(loss * ratio, v.si);
      const gap = loss - paid;
      const insight = ratio >= 1
        ? `The building is insured for its full value, so the ${H.fmtM(loss)} loss is paid in full. Average only bites when the sum insured falls short of the true value.`
        : `The building is insured for only **${Math.round(ratio * 100)}% of its value**, so under average only ${Math.round(ratio * 100)}% of each loss is paid: ${gbp(paid)} of the ${H.fmtM(loss)} loss. The insured is treated as its own insurer for the uninsured part.\n\nNotice that a small, partial loss is cut too, not just a total loss. That surprises many clients, and it is why insuring to full value matters.`;
      return {
        readouts: [["Insured to value", `${Math.round(ratio * 100)}%`, ratio < 1 ? "bad" : "good"], ["Insurer pays", gbp(paid)], ["Insured bears", gbp(gap), gap > 0.001 ? "bad" : ""]],
        chart: {
          type: "bars",
          scale: 100,
          ticks: [0, 25, 50, 75, 100],
          suffix: "%",
          rows: [
            { label: "Sum insured ÷ true value", total: `${H.fmtM(v.si)} of ${H.fmtM(v.value)}`, segs: [[ratio * 100, "Insured", "c1"], [100 - ratio * 100, "", "idle"]] },
            { label: "Share of the loss paid", total: `${gbp(paid)} of ${H.fmtM(loss)}`, segs: [[(paid / loss) * 100, "Paid", "c1"], [(gap / loss) * 100, "", "hatch"]] }
          ],
          legend: [["c1", "Covered"], ["hatch", "Borne by the insured"]]
        },
        insight
      };
    }
  };

  X.proportionate = {
    title: "A proportionate reduction",
    blurb: "Change what the insurer would have charged, and watch the claim shrink.",
    ask: "An insured carelessly failed to mention a previous fire and paid £100k of premium. Set what the insurer would have charged had it known, the size of the claim, and whether the breach was deliberate.",
    inputs: [
      { k: "would", label: "Premium it would have charged", min: 100, max: 300, step: 10, value: 150, unit: "k" },
      { k: "claim", label: "The claim", min: 0.1, max: 5, step: 0.1, value: 1, unit: "m" },
      { k: "delib", label: "Deliberate or reckless?", min: 0, max: 1, step: 1, value: 0, show: (x) => (x ? "Yes" : "No") }
    ],
    compute(v) {
      const share = v.delib ? 0 : 100 / v.would;
      const paid = v.claim * share;
      let insight;
      if (v.delib) insight = `A deliberate or reckless breach: the insurer may avoid the policy, refuse all claims and **keep the £100k premium**. The ${gbp(v.claim)} claim isn’t paid at all.`;
      else if (v.would === 100) insight = `The insurer would have charged the same premium, so the omission made no difference to the price and the ${gbp(v.claim)} claim is paid in full, unless it would have changed the terms instead.`;
      else insight = `Told about the fire, the insurer would have charged £${v.would}k, so it received only 100 ÷ ${v.would} = **${Math.round(share * 100)}%** of the premium it should have. It pays the same ${Math.round(share * 100)}% of the claim: ${gbp(paid)} of ${gbp(v.claim)}.\n\nUnder the old law it could have avoided the whole policy and paid nothing. That is the shift from all-or-nothing to proportionate.`;
      return {
        readouts: [["Share paid", `${Math.round(share * 100)}%`, v.delib ? "bad" : ""], ["Paid", gbp(paid)], ["Cut", gbp(v.claim - paid), v.claim - paid > 0.001 ? "bad" : ""]],
        chart: {
          type: "bars",
          scale: 100,
          ticks: [0, 25, 50, 75, 100],
          suffix: "%",
          rows: [
            { label: "Premium charged ÷ premium it should have been", total: v.delib ? "Avoided" : `£100k of £${v.would}k`, segs: [[v.delib ? 0 : share * 100, "", "c2"], [v.delib ? 100 : 100 - share * 100, "", "idle"]] },
            { label: "Share of the claim paid", total: `${gbp(paid)} of ${gbp(v.claim)}`, segs: [[share * 100, share > 0.3 ? "Paid" : "", "c1"], [100 - share * 100, "", "hatch"]] }
          ],
          legend: [["c1", "Paid"], ["hatch", "Cut"]]
        },
        insight
      };
    }
  };

  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const mon = (i) => `${MONTHS[i % 12]} ${2024 + Math.floor(i / 12)}`;
  X.triggers = {
    title: "Which policy pays?",
    blurb: "Move the loss and the claim through time and see which policy year responds.",
    ask: "A firm buys annual cover every January. Something goes wrong, and a claim is made later. Move the two dates, and choose whether the firm reset its retroactive date when it changed insurer in 2026.",
    inputs: [
      { k: "loss", label: "When it happened", min: 0, max: 35, step: 1, value: 14, show: mon },
      { k: "delay", label: "Then the claim is made", min: 0, max: 24, step: 1, value: 13, show: (x) => (x === 0 ? "At once" : `${x} month${x === 1 ? "" : "s"} later`) },
      { k: "retro", label: "Retroactive date on the 2026 policy", min: 0, max: 1, step: 1, value: 0, show: (x) => (x ? "Reset to 2026" : "Kept from 2024") }
    ],
    presets: [
      { label: "A fire", v: { loss: 14, delay: 0 } },
      { label: "Bad advice", v: { loss: 14, delay: 13, retro: 0 } },
      { label: "The gap", v: { loss: 14, delay: 13, retro: 1 } }
    ],
    compute(v) {
      const claimM = v.loss + v.delay;
      const loY = 2024 + Math.floor(v.loss / 12);
      const cmY = 2024 + Math.floor(claimM / 12);
      const cmOff = cmY > 2027;
      const gap = !cmOff && v.retro && cmY >= 2026 && loY < 2026;
      const rows = [2024, 2025, 2026, 2027].map((y) => {
        const lo = y === loY, cm = y === cmY && !cmOff;
        let tone = "idle";
        if (lo && cm) tone = gap ? "c1" : "c3";
        else if (lo) tone = "c1";
        else if (cm) tone = gap ? "hatch" : "c2";
        return { id: `p${y}`, label: `${y} policy`, segs: [[y, y + 1, tone, ""]] };
      });
      const lx = 2024 + v.loss / 12 + 1 / 24;
      const cx = 2024 + claimM / 12 + 1 / 24;
      const markers = Math.abs(cx - lx) < 0.35 ? [[lx, "Loss and claim"]] : [[lx, "Loss"], [Math.min(cx, 2027.98), "Claim"]];
      let insight;
      if (loY === cmY) insight = `The loss and the claim fall in the same policy year, so both triggers point to the **${loY} policy**. Triggers only matter when time separates the event from the claim.`;
      else {
        insight = `It happened in ${mon(v.loss)}, but the claim came in ${mon(claimM)}. A losses-occurring policy looks at the loss date, so the **${loY} policy** pays. A claims-made policy looks at the claim date, so the **${cmOff ? "(not yet bought)" : cmY} policy** pays.`;
        if (gap) insight += `\n\nBut the 2026 policy’s retroactive date was reset to January 2026, and the work was done in ${loY}. The old policy has expired and the new one excludes earlier work: **no one pays**. That is the classic gap in cover.`;
      }
      return {
        readouts: [["Losses occurring", `${loY} policy`, "c1"], ["Claims made", gap ? "Not covered" : cmOff ? "Beyond 2027" : `${cmY} policy`, gap ? "bad" : "c2"]],
        chart: {
          type: "timeline",
          from: 2024,
          to: 2028,
          ticks: [2024, 2025, 2026, 2027, 2028],
          markers,
          legend: [["c1", "Losses occurring"], ["c2", "Claims made"], ["c3", "Both"], ["hatch", "Excluded"]],
          rows
        },
        insight
      };
    }
  };

  /* ---------------------------------------------------------------- m05 */
  const pounds = (x) => (x >= 1e6 ? `£${r2(x / 1e6)}m` : x >= 1000 ? `£${Math.round(x / 1000).toLocaleString("en-GB")}k` : `£${Math.round(x)}`);
  X["da-cost"] = {
    title: "Why small risks need delegation",
    blurb: "Shrink the premium per risk and watch open market costs swallow it.",
    ask: "Compare the cost of placing each risk in the open market with writing it under a binding authority. Change the premium per risk and how many risks the binder writes in a year. (Illustrative costs.)",
    inputs: [
      { k: "prem", label: "Premium per risk", values: [500, 1000, 2500, 5000, 10000, 25000, 50000, 100000, 250000, 500000, 1000000], value: 2500, show: pounds },
      { k: "n", label: "Risks the binder writes a year", values: [20, 50, 100, 250, 500, 1000, 2500, 5000, 10000, 20000], value: 2500, show: (x) => x.toLocaleString("en-GB") }
    ],
    presets: [
      { label: "Small shops", v: { prem: 1000, n: 5000 } },
      { label: "A refinery", v: { prem: 1000000, n: 20 } }
    ],
    compute(v) {
      const open = 15 + (2500 / v.prem) * 100;
      const da = 25 + ((100000 / v.n + 20) / v.prem) * 100;
      const row = (label, x) => ({ label, total: `${Math.round(x)}% of premium`, segs: [[Math.min(x, 100), x > 100 ? "More than the premium" : "", x > da && x > open - 0.01 && x > 60 ? "c2" : "c1"]] });
      let insight;
      if (open > da) insight = `For a ${pounds(v.prem)} risk, placing it in the open market would cost about **${Math.round(open)}% of the premium**: the broker’s and underwriter’s time is worth ${open > 100 ? "more than the risk itself" : "a large slice of it"}. Under a binding authority the cost falls to about ${Math.round(da)}%, mostly the coverholder’s commission.\n\nThat is why most small, standard business reaches London through delegated authority.`;
      else insight = `At ${pounds(v.prem)} a risk, the premium easily pays for individual underwriting: the open market costs about ${Math.round(open)}%, less than the ${Math.round(da)}% the delegated route would. Big, unusual risks justify an expert’s attention, so they stay in the open market.`;
      if (v.n < 250) insight += `\n\nNotice the fixed cost of oversight: a binder writing only ${v.n} risks a year loads each one with ${pounds(100000 / v.n)} of audits and monitoring. Delegation pays only at volume.`;
      return {
        readouts: [["Open market", `${Math.round(open)}%`, open > da ? "bad" : "good"], ["Delegated", `${Math.round(da)}%`, da > open ? "bad" : "good"]],
        chart: {
          type: "bars",
          scale: 100,
          ticks: [0, 25, 50, 75, 100],
          suffix: "%",
          rows: [row("Open market: brokerage and handling", open), row("Delegated: commission and oversight", da)]
        },
        insight
      };
    }
  };

  X["bdx-lag"] = {
    title: "What late bordereaux hide",
    blurb: "Delay the reports and watch the insurer’s blind spot grow before a hurricane.",
    ask: "A coverholder binds homes on the Florida coast every month, and a hurricane strikes at the end of the year. Change how much it binds, how late its bordereaux arrive and how many records lack key data.",
    inputs: [
      { k: "monthly", label: "Sum insured bound each month", min: 10, max: 100, step: 5, value: 40, unit: "m" },
      { k: "lag", label: "Bordereaux arrive", min: 0, max: 4, step: 1, value: 2, show: (x) => (x === 0 ? "On time" : `${x} month${x > 1 ? "s" : ""} late`) },
      { k: "bad", label: "Records missing locations or values", min: 0, max: 40, step: 5, value: 10, unit: "pct" }
    ],
    compute(v, H) {
      const total = v.monthly * 12;
      const reported = v.monthly * (12 - v.lag);
      const unusable = (reported * v.bad) / 100;
      const visible = reported - unusable;
      const late = total - reported;
      const blind = late + unusable;
      const insight = blind < 0.01
        ? `Timely, complete bordereaux: when the hurricane strikes, the insurer can see every one of the ${H.fmtM(total)} of homes bound, and can model its loss straight away.`
        : `When the hurricane strikes, the coverholder has bound ${H.fmtM(total)} of homes, but the insurer can see only ${H.fmtM(visible)}. **${H.fmtM(blind)}, ${Math.round((blind / total) * 100)}% of the exposure, is a blind spot**: ${H.fmtM(late)} not yet reported and ${H.fmtM(unusable)} reported without the data needed to model it.\n\nAn insurer can’t manage an accumulation it can’t see. That is why timely, structured data matters so much in delegated business.`;
      return {
        readouts: [["Insurer can see", H.fmtM(visible)], ["Blind spot", H.fmtM(blind), blind > 0.01 ? "bad" : "good"]],
        chart: {
          type: "bars",
          scale: 100,
          ticks: [0, 25, 50, 75, 100],
          suffix: "%",
          rows: [{ label: "Exposure on the day of the hurricane", total: H.fmtM(total), segs: [[(visible / total) * 100, "Visible", "c1"], [(unusable / total) * 100, "", "hatch"], [(late / total) * 100, "", "c2"]] }],
          legend: [["c1", "Reported and usable"], ["hatch", "Reported, unusable"], ["c2", "Not yet reported"]]
        },
        insight
      };
    }
  };

  /* ---------------------------------------------------------------- m06 */
  X["general-average"] = {
    title: "Share the sacrifice",
    blurb: "Jettison cargo to save a ship, then share the cost by value.",
    ask: "In a storm, the master throws part of cargo owner B’s goods overboard to save the ship. Under general average, everyone contributes in proportion to the value they had at risk. Change the values and the size of the sacrifice.",
    inputs: [
      { k: "ship", label: "Value of the ship", min: 20, max: 100, step: 5, value: 60, unit: "m" },
      { k: "a", label: "Cargo owner A’s goods", min: 5, max: 60, step: 5, value: 30, unit: "m" },
      { k: "b", label: "Cargo owner B’s goods", min: 5, max: 60, step: 5, value: 10, unit: "m" },
      { k: "s", label: "B’s goods jettisoned", min: 1, max: 10, step: 0.5, value: 5, unit: "m" }
    ],
    compute(v, H) {
      const s = Math.min(v.s, v.b);
      const T = v.ship + v.a + v.b;
      const cShip = (s * v.ship) / T, cA = (s * v.a) / T, cB = (s * v.b) / T;
      const share = (x) => Math.round((x / T) * 100);
      const insight = `B’s goods worth ${H.fmtM(s)} went overboard to save the voyage. Everyone shares the cost by the value they had at risk: the ship pays ${gbp(cShip)} (${share(v.ship)}% of the values), cargo A ${gbp(cA)} and B itself ${gbp(cB)}. B is made good for the rest, so **B’s net loss is only ${gbp(cB)}**.\n\nIn practice each party’s insurer pays its client’s contribution. Notice that A’s goods were never touched, yet A pays: it benefited from the sacrifice.`;
      return {
        readouts: [["Ship pays", gbp(cShip)], ["A pays", gbp(cA)], ["B’s net loss", gbp(cB)]],
        chart: {
          type: "bars",
          scale: 100,
          ticks: [0, 25, 50, 75, 100],
          suffix: "%",
          rows: [
            { label: "Values at risk", total: H.fmtM(T), segs: [[(v.ship / T) * 100, "Ship", "c1"], [(v.a / T) * 100, (v.a / T) * 100 > 12 ? "A" : "", "c2"], [(v.b / T) * 100, (v.b / T) * 100 > 12 ? "B" : "", "c3"]] },
            { label: "Shares of the sacrifice", total: gbp(s), segs: [[(cShip / s) * 100, gbp(cShip), "c1"], [(cA / s) * 100, (cA / s) * 100 > 16 ? gbp(cA) : "", "c2"], [(cB / s) * 100, (cB / s) * 100 > 16 ? gbp(cB) : "", "c3"]] }
          ],
          legend: [["c1", "Shipowner"], ["c2", "Cargo A"], ["c3", "Cargo B"]]
        },
        insight
      };
    }
  };

  X["space-year"] = {
    title: "A year in the space market",
    blurb: "Add a satellite failure or two and watch a whole market’s premium disappear.",
    ask: "The whole space insurance market collects a modest premium each year. Change it, and the number and size of satellite losses, and see what happens to the market’s result. (Illustrative figures.)",
    inputs: [
      { k: "prem", label: "Premium for the whole market", min: 300, max: 1000, step: 50, value: 500, unit: "usd" },
      { k: "n", label: "Satellites lost this year", min: 0, max: 5, step: 1, value: 1 },
      { k: "size", label: "Insured value of each", min: 100, max: 500, step: 50, value: 300, unit: "usd" }
    ],
    compute(v) {
      const loss = v.n * v.size;
      const lr = (loss / v.prem) * 100;
      const scale = Math.max(v.prem, loss) * 1.05;
      const insight = v.n === 0
        ? `A clean year: no satellites lost, and the market keeps its ${usd(v.prem)} premium, less expenses. Years like this have to pay for the bad ones.`
        : `${v.n === 1 ? "One failure" : `${v.n} failures`} at ${usd(v.size)} each cost ${usd(loss)}, a loss ratio of **${Math.round(lr)}%**${lr > 100 ? ": more than the whole market collected" : ""}.\n\nNotice how few events it takes. With large values, few risks and a small premium pool, a single launch failure can decide the year, which is why insurers enter and leave this class as results swing.`;
      return {
        readouts: [["Loss ratio", `${Math.round(lr)}%`, lr > 100 ? "bad" : lr > 60 ? "" : "good"], ["Market result", `${v.prem - loss < 0 ? "−" : ""}${usd(Math.abs(v.prem - loss))}`, v.prem - loss < 0 ? "bad" : "good"]],
        chart: {
          type: "bars",
          scale,
          ticks: [0, Math.round(scale / 2 / 100) * 100, Math.round(scale / 100) * 100].filter((x, i, a) => a.indexOf(x) === i && x <= scale),
          prefix: "$",
          suffix: "m",
          rows: [
            { label: "Premium collected", total: usd(v.prem), segs: [[v.prem, "", "c1"]] },
            { label: "Claims from failures", total: usd(loss), segs: Array.from({ length: v.n }, (_, i) => [v.size, v.size / scale > 0.14 ? `#${i + 1}` : "", i % 2 ? "c2" : "c1m"]) }
          ]
        },
        insight
      };
    }
  };

  X.bi = {
    title: "Business interruption",
    blurb: "Lengthen the recovery and watch lost profit outgrow the damage itself.",
    ask: "A fire damages a factory. Change the cost of the damage, the factory’s annual gross profit, how long it takes to recover fully, and the indemnity period the client chose.",
    inputs: [
      { k: "pd", label: "Cost of the physical damage", min: 1, max: 40, step: 1, value: 8, unit: "m" },
      { k: "gp", label: "Annual gross profit", min: 2, max: 40, step: 1, value: 12, unit: "m" },
      { k: "rec", label: "Time to recover fully", min: 1, max: 30, step: 1, value: 18, unit: "mo" },
      { k: "ip", label: "Indemnity period chosen", values: [6, 12, 18, 24, 36], value: 12, unit: "mo" }
    ],
    compute(v, H) {
      const lost = (v.gp / 12) * v.rec;
      const paid = (v.gp / 12) * Math.min(v.rec, v.ip);
      const gap = lost - paid;
      const scale = Math.max(v.pd, lost) * 1.05;
      let insight = `The fire did ${H.fmtM(v.pd)} of damage, but the factory takes ${v.rec} months to recover, losing ${gbp(lost)} of gross profit${lost > v.pd ? ": **more than the damage itself**" : ""}.`;
      insight += gap > 0.001
        ? `\n\nWith a ${v.ip}-month indemnity period, only ${gbp(paid)} is covered, and the client bears ${gbp(gap)}. Customers who left during the outage don’t return the day the building reopens; choosing the indemnity period is really a forecast of how long recovery takes.`
        : `\n\nThe ${v.ip}-month indemnity period covers the whole recovery, so all ${gbp(lost)} of lost profit is paid.`;
      return {
        readouts: [["Lost profit", gbp(lost)], ["Covered", gbp(paid)], ["Client bears", gbp(gap), gap > 0.001 ? "bad" : "good"]],
        chart: {
          type: "bars",
          scale,
          prefix: "£",
          suffix: "m",
          rows: [
            { label: "Physical damage", total: H.fmtM(v.pd), segs: [[v.pd, "", "c2"]] },
            { label: "Lost gross profit", total: gbp(lost), segs: [[paid, paid / scale > 0.2 ? "Covered" : "", "c1"], [gap, "", "hatch"]] }
          ],
          legend: [["c2", "Damage"], ["c1", "BI covered"], ["hatch", "Beyond the indemnity period"]]
        },
        insight
      };
    }
  };

  X["long-tail"] = {
    title: "Inflation on a long tail",
    blurb: "Stretch the tail and raise claims inflation, and watch the ultimate cost run away.",
    ask: "A liability book is expected to cost £100m at today’s prices. Its claims are paid evenly over a number of years, and each year’s payments rise with claims inflation. Change both.",
    inputs: [
      { k: "years", label: "Years over which claims are paid", min: 1, max: 20, step: 1, value: 10, unit: "yr" },
      { k: "infl", label: "Claims inflation each year", min: 0, max: 12, step: 0.5, value: 5, unit: "pct" }
    ],
    presets: [
      { label: "Property, short tail", v: { years: 2, infl: 4 } },
      { label: "US liability, social inflation", v: { years: 15, infl: 9 } }
    ],
    compute(v) {
      const n = v.years, g = 1 + v.infl / 100;
      let cum = 0;
      const actual = [[0, 0]], today = [[0, 0]];
      for (let t = 1; t <= n; t++) {
        cum += (100 / n) * Math.pow(g, t);
        actual.push([t, r1(cum)]);
        today.push([t, r1((100 * t) / n)]);
      }
      const ult = cum;
      const ymax = Math.max(120, Math.ceil(ult / 20) * 20);
      const ticks = [];
      for (let y = 0; y <= ymax; y += ymax > 200 ? 50 : 20) ticks.push(y);
      const xt = n <= 5 ? Array.from({ length: n + 1 }, (_, i) => i) : [0, Math.round(n / 2), n];
      const insight = `Paid over ${n} year${n > 1 ? "s" : ""} at ${pc(v.infl)} claims inflation, a book expected to cost £100m at today’s prices ends up costing **£${Math.round(ult)}m**, ${Math.round(ult - 100)}% more.\n\nThe longer the tail, the longer inflation has to compound. That is why social inflation in US liability is so dangerous for reserves, and why short-tail property barely notices the same inflation rate.`;
      return {
        readouts: [["Ultimate cost", `£${Math.round(ult)}m`], ["Above estimate", `+${Math.round(ult - 100)}%`, ult > 130 ? "bad" : ""]],
        chart: {
          type: "line",
          title: "Cumulative claims paid",
          height: 210,
          x: { min: 0, max: n, ticks: xt, suffix: n > 1 ? "" : "", title: "Years after the policy period" },
          y: { min: 0, max: ymax, ticks, prefix: "£", suffix: "m", title: "Paid to date" },
          series: [
            { name: "At today’s prices", tone: "neutral", dash: true, points: today },
            { name: "With claims inflation", tone: "c2", points: actual }
          ],
          marks: [{ x: n, y: r1(ult), label: `£${Math.round(ult)}m`, dx: -8, dy: -10, anchor: "end", tone: "c2" }]
        },
        insight
      };
    }
  };

  /* ---------------------------------------------------------------- m08 */
  X.ibnr = {
    title: "Watch a year’s claims develop",
    blurb: "Move through time and see IBNR turn into reported and then paid claims.",
    ask: "A book of policies will eventually cost £60m in claims. Move forward in time, and change the type of business, to see how much has been paid, how much is known about, and how much is still IBNR.",
    inputs: [
      { k: "t", label: "Time since the policies began", min: 0.5, max: 10, step: 0.5, value: 2, unit: "yr" },
      { k: "tail", label: "Type of business", min: 0, max: 100, step: 10, value: 20, show: (x) => (x <= 20 ? "Short tail, like property" : x >= 80 ? "Long tail, like liability" : "In between") }
    ],
    presets: [
      { label: "Property, year 1", v: { t: 1, tail: 0 } },
      { label: "Liability, year 1", v: { t: 1, tail: 100 } },
      { label: "Liability, year 5", v: { t: 5, tail: 100 } }
    ],
    compute(v, H) {
      const U = 60;
      const tr = 0.5 + (3 * v.tail) / 100, tp = 1 + (5 * v.tail) / 100;
      const rep = (t) => 1 - Math.exp(-t / tr), pay = (t) => 1 - Math.exp(-t / tp);
      const paid = U * pay(v.t), inc = U * rep(v.t), cs = inc - paid, ib = U - inc;
      const pts = (f) => Array.from({ length: 21 }, (_, i) => [i / 2, r1(f(i / 2) * 100)]);
      const kind = v.tail <= 20 ? "this property-like book" : v.tail >= 80 ? "this liability book" : "this book";
      const insight = `${v.t} year${v.t === 1 ? "" : "s"} in, ${kind} has paid ${gbp(paid)} and knows of another ${gbp(cs)} in open claims. That leaves **${gbp(ib)} of IBNR**: ${Math.round((ib / U) * 100)}% of the ultimate is claims nobody has reported yet.\n\n${v.tail >= 60 ? "With a long tail, IBNR dominates for years. The reserve rests mostly on actuarial projection rather than known claims, which is exactly why long-tail reserving is so uncertain." : "With a short tail, claims are reported quickly, so IBNR shrinks fast and the estimate soon rests on known claims."}`;
      return {
        readouts: [["Paid", gbp(paid), "c1"], ["Case reserves", gbp(cs), "c2"], ["IBNR", gbp(ib), ib > 30 ? "bad" : ""]],
        chart: {
          type: "line",
          title: "Claims development",
          height: 210,
          x: { min: 0, max: 10, ticks: [0, 2, 4, 6, 8, 10], suffix: "", title: "Years since the policies began" },
          y: { min: 0, max: 100, ticks: [0, 25, 50, 75, 100], suffix: "%", title: "Share of the £60m ultimate" },
          refs: [{ x: v.t, label: "Now" }],
          series: [
            { name: "Incurred (paid + case)", tone: "c2", points: pts(rep) },
            { name: "Paid", tone: "c1", points: pts(pay) }
          ],
          marks: [{ x: v.t, y: r1(rep(v.t) * 100), tone: "c2" }, { x: v.t, y: r1(pay(v.t) * 100), tone: "c1" }]
        },
        insight
      };
    }
  };

  X.contribution = {
    title: "Two policies, one loss",
    blurb: "Overlap two policies and see how contribution shares the loss.",
    ask: "A loss is covered by two policies with different insurers. Change the loss and each policy’s limit, and see how the insurers share it so the insured recovers only once.",
    inputs: [
      { k: "loss", label: "The loss", min: 1, max: 20, step: 0.5, value: 8, unit: "m" },
      { k: "a", label: "Policy A’s limit", min: 1, max: 20, step: 0.5, value: 10, unit: "m" },
      { k: "b", label: "Policy B’s limit", min: 1, max: 20, step: 0.5, value: 5, unit: "m" }
    ],
    compute(v) {
      const ia = Math.min(v.loss, v.a), ib = Math.min(v.loss, v.b);
      const both = ia + ib;
      const sa = both >= v.loss ? (v.loss * ia) / both : ia;
      const sb = both >= v.loss ? (v.loss * ib) / both : ib;
      const gap = v.loss - sa - sb;
      const p = (x) => (x / v.loss) * 100;
      const insight = both >= v.loss
        ? `On its own, A would pay ${gbp(ia)} and B ${gbp(ib)}: together ${gbp(both)} for a ${gbp(v.loss)} loss. So they share in proportion to those **independent liabilities**: A pays ${Math.round((ia / both) * 100)}%, ${gbp(sa)}, and B ${Math.round((ib / both) * 100)}%, ${gbp(sb)}.\n\nThe insured recovers its ${gbp(v.loss)} once, not ${gbp(both)}. That is indemnity at work.`
        : `Even together the two policies only provide ${gbp(both)}, less than the ${gbp(v.loss)} loss. Each pays its full limit and the insured bears the remaining ${gbp(gap)}: contribution can’t create cover that isn’t there.`;
      return {
        readouts: [["A pays", gbp(sa), "c1"], ["B pays", gbp(sb), "c2"], ["Insured bears", gbp(gap), gap > 0.001 ? "bad" : "good"]],
        chart: {
          type: "bars",
          scale: 100,
          ticks: [0, 25, 50, 75, 100],
          suffix: "%",
          rows: [
            { label: "What each would pay alone", total: gbp(both), segs: [[(ia / both) * 100, (ia / both) * 100 > 22 ? `A ${gbp(ia)}` : "", "c1l"], [(ib / both) * 100, (ib / both) * 100 > 22 ? `B ${gbp(ib)}` : "", "c1m"]] },
            { label: "How the loss is shared", total: gbp(v.loss), segs: [[p(sa), p(sa) > 18 ? "A" : "", "c1"], [p(sb), p(sb) > 18 ? "B" : "", "c2"], [p(gap), "", "hatch"]] }
          ],
          legend: [["c1", "Insurer A"], ["c2", "Insurer B"], ["hatch", "Uninsured"]]
        },
        insight
      };
    }
  };

  /* ---------------------------------------------------------------- m07 */
  X["quota-share"] = {
    title: "A quota share",
    tab: "Quota share",
    blurb: "Change the cession, the loss ratio and the commission, and see who makes money.",
    ask: "An insurer writes £50m of premium and spends 30% of it on acquisition and running costs. Change how much it cedes, how bad the year is and the ceding commission, and compare the results.",
    inputs: [
      { k: "q", label: "Share ceded", min: 10, max: 90, step: 5, value: 40, unit: "pct" },
      { k: "lr", label: "Loss ratio for the year", min: 30, max: 130, step: 5, value: 60, unit: "pct" },
      { k: "c", label: "Ceding commission", min: 15, max: 40, step: 2.5, value: 30, unit: "pct" }
    ],
    presets: [
      { label: "Good year", v: { lr: 45 } },
      { label: "Catastrophe year", v: { lr: 110 } }
    ],
    compute(v, H) {
      const P = 50, C = (P * v.lr) / 100, E = 15;
      const pc = (P * v.q) / 100, cc = (C * v.q) / 100, k = (pc * v.c) / 100;
      const gross = P - C - E;
      const net = P - pc - (C - cc) + k - E;
      const re = pc - cc - k;
      let insight = `The cedant cedes £${r1(pc)}m of premium and recovers £${r1(cc)}m of claims, and receives £${r1(k)}m of ceding commission.\n\n`;
      insight += gross >= 0
        ? `In this year the book makes ${gbp(gross)} gross. The quota share hands ${gbp(gross - net)} of that to the reinsurer: a good year’s profit is shared, just like a bad year’s loss.`
        : `In this year the book loses ${gbp(-gross)} gross. The quota share cuts the cedant’s loss to ${gbp(-net)}: the reinsurer takes its ${v.q}% share of the pain.`;
      if (Math.abs(v.c - 30) >= 2.5) insight += ` Notice the commission: at ${pc(v.c)}, ${v.c > 30 ? "more" : "less"} than the cedant’s 30% expense ratio, ${v.c > 30 ? "the cedant actually earns a margin on the business it cedes." : "ceding costs the cedant more than its own expenses on that business."}`;
      return {
        readouts: [["Cedant, no reinsurance", gbp(gross), gross >= 0 ? "good" : "bad"], ["Cedant, with quota share", gbp(net), net >= 0 ? "good" : "bad"], ["Reinsurer", gbp(re), re >= 0 ? "good" : "bad"]],
        chart: {
          type: "bars",
          scale: 100,
          ticks: [0, 25, 50, 75, 100],
          suffix: "%",
          rows: [
            { label: "Premium", total: `£${P}m`, segs: [[100 - v.q, "Kept", "c1"], [v.q, v.q >= 20 ? "Ceded" : "", "c2"]] },
            { label: "Claims", total: `£${r1(C)}m`, segs: [[100 - v.q, "Kept", "c1"], [v.q, v.q >= 20 ? "Ceded" : "", "c2"]] }
          ],
          legend: [["c1", "Kept by the cedant"], ["c2", "Ceded to the reinsurer"]]
        },
        insight
      };
    }
  };

  X.surplus = {
    title: "A surplus treaty",
    tab: "Surplus",
    blurb: "Grow the risk and see how a fixed retention changes the share ceded.",
    ask: "The cedant keeps a fixed retention on each risk and cedes the surplus, up to a number of lines. Change the size of the risk, the retention and the lines, and see how a claim on that risk is shared.",
    inputs: [
      { k: "size", label: "Sum insured of the risk", min: 0.5, max: 30, step: 0.5, value: 10, unit: "m" },
      { k: "ret", label: "Retention, one line", min: 1, max: 5, step: 0.5, value: 2, unit: "m" },
      { k: "lines", label: "Lines in the treaty", min: 1, max: 15, step: 1, value: 9 },
      { k: "claim", label: "Claim, as a share of the sum insured", min: 10, max: 100, step: 10, value: 50, unit: "pct" }
    ],
    presets: [
      { label: "Small risk", v: { size: 1.5 } },
      { label: "£10m risk", v: { size: 10, ret: 2, lines: 9 } },
      { label: "£25m risk", v: { size: 25, ret: 2, lines: 9 } }
    ],
    compute(v, H) {
      const kept = Math.min(v.size, v.ret);
      const cap = v.ret * v.lines;
      const ceded = Math.min(Math.max(v.size - v.ret, 0), cap);
      const fac = Math.max(v.size - v.ret - cap, 0);
      const s = (x) => (x / v.size) * 100;
      const cl = (v.size * v.claim) / 100;
      let insight;
      if (v.size <= v.ret) insight = `This risk is no bigger than the ${gbp(v.ret)} retention, so the cedant keeps **all of it**. Small risks never reach the treaty.`;
      else {
        insight = `The cedant keeps its ${gbp(v.ret)} line, **${Math.round(s(kept))}% of this risk**, and cedes ${gbp(ceded)} (${Math.round(s(ceded))}%). A ${gbp(cl)} claim is shared in the same proportions: the cedant pays ${gbp((cl * kept) / v.size)}.`;
        insight += fac > 0
          ? `\n\nBut the treaty’s capacity is only ${v.lines} × ${gbp(v.ret)} = ${gbp(cap)}, so **${gbp(fac)} is left over**: the cedant must buy facultative cover for it or decline the risk.`
          : `\n\nNotice the even net book this creates: however large the risk, the cedant never keeps more than ${gbp(v.ret)}.`;
      }
      return {
        readouts: [["Cedant keeps", `${gbp(kept)} · ${Math.round(s(kept))}%`, "c1"], ["Treaty takes", `${gbp(ceded)} · ${Math.round(s(ceded))}%`, "c2"], ["Needs fac", gbp(fac), fac > 0 ? "bad" : ""]],
        chart: {
          type: "bars",
          scale: 100,
          ticks: [0, 25, 50, 75, 100],
          suffix: "%",
          rows: [
            { label: "The risk", total: gbp(v.size), segs: [[s(kept), s(kept) >= 18 ? "Kept" : "", "c1"], [s(ceded), s(ceded) >= 18 ? "Treaty" : "", "c2"], [s(fac), s(fac) >= 18 ? "Fac" : "", "c3"]] },
            { label: "A claim on it", total: gbp(cl), segs: [[s(kept), "", "c1"], [s(ceded), "", "c2"], [s(fac), "", "c3"]] }
          ],
          legend: [["c1", "Cedant’s retention"], ["c2", "Surplus treaty"], ["c3", "Facultative"]]
        },
        insight
      };
    }
  };

  X["xl-layer"] = {
    title: "An excess of loss layer",
    blurb: "Send different losses through a layer and see who pays which slice.",
    ask: "A cedant buys a layer of cover in excess of its retention. Change the loss, the retention and the limit, and see how the loss is sliced.",
    inputs: [
      { k: "loss", label: "Size of the loss", min: 0, max: 40, step: 1, value: 12, unit: "m" },
      { k: "ret", label: "Retention", min: 1, max: 15, step: 1, value: 5, unit: "m" },
      { k: "lim", label: "Layer limit", min: 2, max: 30, step: 1, value: 10, unit: "m" }
    ],
    presets: [
      { label: "£3m loss", v: { loss: 3, ret: 5, lim: 10 } },
      { label: "£12m loss", v: { loss: 12, ret: 5, lim: 10 } },
      { label: "£20m loss", v: { loss: 20, ret: 5, lim: 10 } }
    ],
    compute(v, H) {
      const below = Math.min(v.loss, v.ret);
      const rec = Math.min(Math.max(v.loss - v.ret, 0), v.lim);
      const above = Math.max(v.loss - v.ret - v.lim, 0);
      const S = Math.max(v.loss, v.ret + v.lim) * 1.04;
      let insight;
      if (v.loss <= v.ret) insight = `The ${gbp(v.loss)} loss sits inside the ${gbp(v.ret)} retention, so the cedant pays it all and **the reinsurer pays nothing**. Most losses never reach an excess of loss layer; that is why it’s cheap compared with a quota share.`;
      else if (above === 0) insight = `The cedant pays its ${gbp(v.ret)} retention and the layer pays the rest: ${gbp(v.loss)} − ${gbp(v.ret)} = **${gbp(rec)}**, using ${Math.round((rec / v.lim) * 100)}% of the limit.`;
      else insight = `The loss exhausts the layer. The reinsurer pays its full ${gbp(v.lim)} limit, and the cedant pays its ${gbp(v.ret)} retention **plus ${gbp(above)} above the layer**: ${gbp(below + above)} in all. To close that gap it would need another layer on top.`;
      return {
        readouts: [["Cedant pays", gbp(below + above), above > 0 ? "bad" : ""], ["Reinsurer pays", gbp(rec), "c1"], ["Limit used", `${Math.round((rec / v.lim) * 100)}%`]],
        chart: {
          type: "bars",
          scale: S,
          prefix: "£",
          suffix: "m",
          ticks: [0, v.ret, v.ret + v.lim],
          rows: [
            { label: "The cover", total: `${gbp(v.lim)} xs ${gbp(v.ret)}`, segs: [[v.ret, "Retention", "idle"], [v.lim, "Layer", "c1l"]] },
            { label: "The loss", total: gbp(v.loss), segs: [[below, below / S > 0.15 ? "Cedant" : "", "neutral"], [rec, rec / S > 0.15 ? "Reinsurer" : "", "c1"], [above, above / S > 0.15 ? "Cedant" : "", "hatch"]] }
          ],
          legend: [["neutral", "Retention"], ["c1", "Paid by the layer"], ["hatch", "Above the layer"]]
        },
        insight
      };
    }
  };

  X.reinstatement = {
    title: "Two storms, one layer",
    blurb: "Hit a layer twice and see what a reinstatement buys.",
    ask: "A £20m xs £20m catastrophe layer costs £2m. Two storms hit it in the same year. Change how much of the layer each uses, and how many reinstatements the cedant bought.",
    inputs: [
      { k: "e1", label: "First storm’s loss to the layer", min: 0, max: 20, step: 1, value: 8, unit: "m" },
      { k: "e2", label: "Second storm’s loss to the layer", min: 0, max: 20, step: 1, value: 15, unit: "m" },
      { k: "n", label: "Reinstatements at 100%", min: 0, max: 2, step: 1, value: 1 }
    ],
    compute(v, H) {
      const L = 20, P = 2;
      const agg = L * (1 + v.n);
      const r1v = Math.min(v.e1, L, agg);
      const avail2 = v.n > 0 ? Math.min(L, agg - r1v) : L - r1v;
      const r2v = Math.min(v.e2, avail2);
      const reinstated = Math.min(r1v + r2v, v.n * L);
      const rp = (P * reinstated) / L;
      const short = v.e2 - r2v;
      let insight = `The first storm uses ${gbp(r1v)} of the ${gbp(L)} limit. `;
      insight += v.n > 0
        ? `With ${v.n} reinstatement${v.n > 1 ? "s" : ""}, the cedant pays £2m × ${r1v} ÷ 20 = ${gbp((P * Math.min(r1v, v.n * L)) / L)} to restore it, so the second storm finds ${gbp(avail2)} waiting and recovers ${gbp(r2v)}.`
        : `Without a reinstatement, only ${gbp(L - r1v)} is left for the second storm, which recovers ${gbp(r2v)}.`;
      if (short > 0.001) insight += ` **${gbp(short)} of the second storm falls back on the cedant.**`;
      if (v.n > 0) insight += `\n\nReinstatement premium is due on the limit restored: ${gbp(rp)} in all this year. It is the price of being protected against the next storm as well as this one.`;
      return {
        readouts: [["Recovered", gbp(r1v + r2v), "c1"], ["Reinstatement premium", gbp(rp)], ["Not covered", gbp(short), short > 0.001 ? "bad" : "good"]],
        chart: {
          type: "bars",
          scale: L,
          prefix: "£",
          suffix: "m",
          ticks: [0, 10, 20],
          rows: [
            { label: "First storm", total: gbp(v.e1), segs: [[r1v, r1v >= 4 ? "Recovered" : "", "c1"]] },
            { label: "Second storm", total: gbp(v.e2), segs: [[r2v, r2v >= 4 ? "Recovered" : "", "c1"], [short, "", "hatch"]] }
          ],
          legend: [["c1", "Paid by the layer"], ["hatch", "Limit exhausted"]]
        },
        insight
      };
    }
  };

  X["cat-bond"] = {
    title: "A catastrophe bond",
    blurb: "Move an industry loss through a bond’s trigger and watch the investors’ principal.",
    ask: "Investors put US$100m into a cat bond with an industry-loss trigger. They lose principal once the industry’s loss from one hurricane passes the attachment, and all of it at the exhaustion point. Change the storm and the trigger.",
    inputs: [
      { k: "loss", label: "Industry loss from the hurricane", min: 0, max: 100, step: 5, value: 45, show: (x) => `US$${x}bn` },
      { k: "att", label: "Attachment point", min: 20, max: 60, step: 5, value: 40, show: (x) => `US$${x}bn` },
      { k: "w", label: "Width to exhaustion", min: 10, max: 40, step: 5, value: 20, show: (x) => `US$${x}bn` }
    ],
    compute(v) {
      const f = Math.min(1, Math.max(0, (v.loss - v.att) / v.w));
      const lost = 100 * f;
      let insight;
      if (f === 0) insight = `The hurricane cost the industry US$${v.loss}bn, below the US$${v.att}bn attachment. **Investors keep all their principal** and their coupon. Most years end this way, which is what investors are paid for.`;
      else if (f < 1) insight = `The industry loss of US$${v.loss}bn is ${Math.round(f * 100)}% of the way through the trigger window, so investors lose **US$${Math.round(lost)}m** of principal, which pays the sponsor’s claims.`;
      else insight = `The industry loss passes the US$${v.att + v.w}bn exhaustion point: **investors lose all US$100m**. Their money now pays the sponsor’s claims.`;
      insight += `\n\nNotice the trigger is the industry’s loss, not the sponsor’s. The sponsor’s own loss could be higher or lower than this payout suggests: that is basis risk.`;
      return {
        readouts: [["Principal lost", `${Math.round(lost)}%`, lost > 0 ? "bad" : "good"], ["Paid to sponsor", `US$${Math.round(lost)}m`, lost > 0 ? "c1" : ""]],
        chart: {
          type: "line",
          title: "Principal lost against industry loss",
          height: 200,
          x: { min: 0, max: 100, ticks: [0, 25, 50, 75, 100], prefix: "$", suffix: "bn", title: "Industry loss from the event" },
          y: { min: 0, max: 100, ticks: [0, 50, 100], suffix: "%", title: "Principal lost" },
          series: [{ name: "Payout", tone: "c1", points: [[0, 0], [v.att, 0], [Math.min(100, v.att + v.w), Math.min(100, ((Math.min(100, v.att + v.w) - v.att) / v.w) * 100)], [100, Math.min(100, ((100 - v.att) / v.w) * 100)]] }],
          marks: [{ x: v.loss, y: r1(lost), tone: "c2", label: "This storm", dx: v.loss > 70 ? -8 : 8, dy: lost > 80 ? 16 : -8, anchor: v.loss > 70 ? "end" : "start" }]
        },
        insight
      };
    }
  };

  X.programme = {
    title: "Design a catastrophe programme",
    blurb: "Choose a retention and a top, and weigh the cost against the protection.",
    ask: "An insurer’s modelled hurricane losses are £63m at 1-in-10, £141m at 1-in-50, £283m at 1-in-200 and £447m at 1-in-500. Choose where its catastrophe programme starts and stops, and see what it costs and what it leaves behind. (Illustrative pricing.)",
    inputs: [
      { k: "ret", label: "Retention, where cover starts", min: 20, max: 150, step: 10, value: 60, unit: "m" },
      { k: "top", label: "Top of the programme", min: 150, max: 500, step: 25, value: 300, unit: "m" }
    ],
    presets: [
      { label: "Cheap and thin", v: { ret: 120, top: 200 } },
      { label: "To the 1-in-200", v: { ret: 60, top: 300 } },
      { label: "Belt and braces", v: { ret: 30, top: 450 } }
    ],
    compute(v, H) {
      const top = Math.max(v.top, v.ret + 10);
      const gl = (rp) => 20 * Math.sqrt(rp);
      const el = 400 * (1 / v.ret - 1 / top);
      const prem = Math.max(el * 1.8, 0.01 * (top - v.ret));
      const rps = [10, 50, 200, 500];
      const rows = rps.map((rp) => {
        const g = gl(rp);
        const rec = Math.min(Math.max(g - v.ret, 0), top - v.ret);
        const kept = Math.min(g, v.ret);
        const above = Math.max(g - top, 0);
        return { label: `1-in-${rp} loss`, total: `${H.fmtM(g)} → net ${H.fmtM(kept + above)}`, segs: [[kept, "", "c1"], [rec, "", "c1l"], [above, "", "hatch"]] };
      });
      const g200 = gl(200);
      const net200 = Math.min(g200, v.ret) + Math.max(g200 - top, 0);
      const protRP = Math.round(Math.pow(top / 20, 2));
      let insight = `The programme costs about **${H.fmtM(prem)} a year** and is expected to recover ${H.fmtM(el)} a year on average. The difference, ${H.fmtM(prem - el)}, is the price of stability: you pay it every year so that the bad years are bearable.`;
      insight += top < g200
        ? `\n\nBut it stops at ${H.fmtM(top)}, below the 1-in-200 loss of ${H.fmtM(g200)}: a 1-in-200 storm would leave ${H.fmtM(g200 - top)} uninsured above the tower, which regulators and rating agencies would notice.`
        : `\n\nIt protects to about a 1-in-${protRP} event, so the 1-in-200 loss costs the insurer only its ${H.fmtM(v.ret)} retention.`;
      insight += ` Try lowering the retention: the frequent small events become the reinsurer’s, and the price climbs quickly.`;
      return {
        readouts: [["Reinsurance cost", H.fmtM(prem)], ["Net 1-in-200 loss", H.fmtM(net200), net200 > 150 ? "bad" : ""], ["Protected to", `1\u2011in\u2011${protRP}`]],
        chart: {
          type: "bars",
          scale: 460,
          prefix: "£",
          suffix: "m",
          ticks: [0, 150, 300, 450],
          rows,
          legend: [["c1", "Retention"], ["c1l", "Recovered"], ["hatch", "Above the programme"]]
        },
        insight
      };
    }
  };

  /* ---------------------------------------------------------------- m12 */
  X["sliding-scale"] = {
    title: "A sliding scale commission",
    tab: "Sliding scale",
    blurb: "Move the final loss ratio and watch the commission slide between its floor and cap.",
    ask: "A quota share pays a provisional commission at a 60% loss ratio, moving one point of commission for each point of loss ratio, within five points either way. Move the final loss ratio and the provisional commission.",
    inputs: [
      { k: "lr", label: "Final loss ratio", min: 40, max: 90, step: 1, value: 57, unit: "pct" },
      { k: "prov", label: "Commission at a 60% loss ratio", min: 25, max: 35, step: 1, value: 30, unit: "pct" }
    ],
    presets: [
      { label: "57%", v: { lr: 57 } },
      { label: "70%", v: { lr: 70 } },
      { label: "48%", v: { lr: 48 } }
    ],
    compute(v) {
      const lo = v.prov - 5, hi = v.prov + 5;
      const comm = Math.min(hi, Math.max(lo, v.prov + (60 - v.lr)));
      const margin = 100 - v.lr - comm - 5;
      let insight;
      if (comm === hi) insight = `At ${v.lr}% the scale has hit its **cap of ${hi}%**. The cedant is rewarded for a good result, but below ${60 - 5}% it earns nothing more; the reinsurer keeps the extra profit.`;
      else if (comm === lo) insight = `At ${v.lr}% the scale has hit its **floor of ${lo}%**. Above ${60 + 5}%, every further point of loss ratio falls on the reinsurer alone: its margin is now ${r1(margin)}%.`;
      else insight = `At ${v.lr}% the commission slides to **${comm}%**, ${comm >= v.prov ? `${comm - v.prov} point${comm - v.prov === 1 ? "" : "s"} above` : `${v.prov - comm} point${v.prov - comm === 1 ? "" : "s"} below`} the provisional ${v.prov}%.\n\nNotice that inside the band the reinsurer’s margin hardly moves: commission and loss ratio move together, so the cedant shares in its own results. That is the whole point of a sliding scale.`;
      return {
        readouts: [["Commission paid", `${comm}%`, "c1"], ["Reinsurer’s margin", `${r1(margin)}%`, margin < 0 ? "bad" : "good"]],
        chart: {
          type: "line",
          title: "Commission by final loss ratio",
          height: 200,
          x: { min: 40, max: 90, ticks: [40, 50, 60, 70, 80, 90], suffix: "%", title: "Final loss ratio" },
          y: { min: 15, max: 45, ticks: [20, 30, 40], suffix: "%", title: "Commission" },
          refs: [{ x: 60, label: "Expected" }],
          series: [{ name: "Commission", tone: "c1", points: [[40, hi], [55, hi], [65, lo], [90, lo]] }],
          marks: [{ x: v.lr, y: comm, tone: "c2", label: `${comm}%`, dx: 8, dy: -8 }]
        },
        insight
      };
    }
  };

  X["loss-corridor"] = {
    title: "A loss corridor",
    tab: "Loss corridor",
    blurb: "Push the loss ratio through a corridor and see who pays for it.",
    ask: "A 50% quota share has a loss corridor: between two loss ratios, the cedant keeps all the losses before the reinsurer resumes its share. Move the year’s loss ratio and the corridor.",
    inputs: [
      { k: "lr", label: "Year’s gross loss ratio", min: 40, max: 120, step: 5, value: 85, unit: "pct" },
      { k: "a", label: "Corridor starts at", min: 60, max: 85, step: 5, value: 70, unit: "pct" },
      { k: "w", label: "Corridor width", min: 0, max: 20, step: 5, value: 10, show: (x) => (x ? `${x} points` : "No corridor") }
    ],
    compute(v) {
      const below = Math.min(v.lr, v.a);
      const inC = Math.min(Math.max(v.lr - v.a, 0), v.w);
      const above = Math.max(v.lr - v.a - v.w, 0);
      const reLoss = 0.5 * below + 0.5 * above;
      const ceLoss = v.lr - reLoss;
      const reLR = reLoss / 0.5, ceLR = ceLoss / 0.5;
      const scale = Math.max(100, Math.ceil(v.lr / 10) * 10);
      const insight = inC === 0 && v.lr <= v.a
        ? `At ${v.lr}% the corridor isn’t reached, so the two share every loss half and half: each has a ${v.lr}% loss ratio.`
        : `The first ${v.a}% of losses is shared half and half. Then the cedant pays **all** of the next ${inC} points, inside the corridor${above ? `, before the reinsurer resumes its 50% share of the remaining ${above} points` : ""}.\n\nThe reinsurer’s loss ratio is ${r1(reLR)}%, the cedant’s ${r1(ceLR)}%. A corridor gives the cedant a real stake in moderately poor years, without exposing it to the catastrophic ones.`;
      return {
        readouts: [["Reinsurer’s loss ratio", `${r1(reLR)}%`, reLR > 100 ? "bad" : ""], ["Cedant’s loss ratio", `${r1(ceLR)}%`, ceLR > 100 ? "bad" : ""]],
        chart: {
          type: "bars",
          scale,
          suffix: "%",
          ticks: [0, 50, 100].filter((x) => x <= scale),
          rows: [
            { label: "Losses paid by the reinsurer", total: `${r1(reLoss)} pts`, segs: [[0.5 * below, "", "c1"], [0, "", "c2"], [0.5 * above, "", "c3"]] },
            { label: "Losses paid by the cedant", total: `${r1(ceLoss)} pts`, segs: [[0.5 * below, "", "c1"], [inC, "", "c2"], [0.5 * above, "", "c3"]] }
          ],
          legend: [["c1", `Below ${v.a}%: shared`], ["c2", "In the corridor"], ["c3", "Above it: shared"]]
        },
        insight
      };
    }
  };

  const LOSSES = { 2020: [6.5, 4.4], 2021: [4.1], 2022: [9.2, 5.6], 2023: [4.8, 3.9], 2024: [6.1] };
  const PREMS = { 2020: 40, 2021: 42, 2022: 44, 2023: 46, 2024: 48 };
  X["burning-cost"] = {
    title: "Burning cost and inflation",
    blurb: "Raise claims inflation and watch old losses pierce the retention.",
    ask: "Here are a cedant’s large losses for five years, at the values they settled for. Restate them for claims inflation and apply them to a £10m layer. Change the inflation rate and the retention.",
    inputs: [
      { k: "inf", label: "Claims inflation a year", min: 0, max: 12, step: 1, value: 5, unit: "pct" },
      { k: "ret", label: "Retention of the layer", min: 3, max: 8, step: 0.5, value: 5, unit: "m" }
    ],
    compute(v) {
      const burnAt = (inf) => {
        let L = 0;
        const rows = Object.keys(LOSSES).map((y) => {
          const f = Math.pow(1 + inf / 100, 2025 - y);
          const lay = LOSSES[y].reduce((a, x) => a + Math.min(Math.max(x * f - v.ret, 0), 10), 0);
          L += lay;
          return { y, lay, burn: (lay / PREMS[y]) * 100 };
        });
        return { rows, burn: (L / 220) * 100, total: L };
      };
      const now = burnAt(v.inf), flat = burnAt(0);
      const rate = now.burn / 0.75;
      const gear = flat.burn > 0 ? now.burn / flat.burn : 0;
      const groundUp = (Math.pow(1 + v.inf / 100, 5) - 1) * 100;
      const insight = v.inf === 0
        ? `With no inflation, the old losses are taken at face value: the layer would have burned ${gbp(flat.total)} over five years, a burning cost of **${r1(flat.burn)}%** of premium.`
        : `At ${v.inf}% a year, the oldest losses grow by up to ${Math.round(groundUp)}%, but the burning cost rises from ${r1(flat.burn)}% to **${r1(now.burn)}%**${gear ? `, ${r1(gear)} times as much` : ""}. Losses that sat just under the ${gbp(v.ret)} retention now pierce it.\n\nThat gearing is why excess of loss reinsurers watch claims inflation so closely: a layer feels inflation far more than the business beneath it.`;
      return {
        readouts: [["Burning cost", `${r1(now.burn)}%`, "c1"], ["Rate after loading", `${r1(rate)}%`], ["Ground-up growth", `up to +${Math.round(groundUp)}%`]],
        chart: {
          type: "bars",
          scale: Math.max(12, Math.ceil(Math.max(...now.rows.map((r) => r.burn)) / 4) * 4),
          suffix: "%",
          mark: [now.burn, `Average ${r1(now.burn)}%`],
          rows: now.rows.map((r) => ({ label: `${r.y} · premium £${PREMS[r.y]}m`, total: `${gbp(r.lay)} · ${r1(r.burn)}%`, segs: [[r.burn, "", "c1"]] }))
        },
        insight
      };
    }
  };

  X["ep-layer"] = {
    title: "Price a catastrophe layer",
    blurb: "Slide a layer up the EP curve and watch expected loss, multiple and rate on line.",
    ask: "A cedant’s modelled hurricane losses follow the curve below: £63m at 1-in-10, £200m at 1-in-100, £447m at 1-in-500. Place a layer on it and see how a reinsurer might price it. (Illustrative curve and multiples.)",
    inputs: [
      { k: "att", label: "Attachment", min: 20, max: 400, step: 10, value: 50, unit: "m" },
      { k: "lim", label: "Limit", min: 25, max: 300, step: 25, value: 50, unit: "m" }
    ],
    presets: [
      { label: "Low layer", v: { att: 40, lim: 50 } },
      { label: "High layer", v: { att: 200, lim: 100 } }
    ],
    compute(v, H) {
      const a = v.att, b = v.att + v.lim;
      const el = 400 * (1 / a - 1 / b);
      const elPct = (el / v.lim) * 100;
      const mult = 1.5 + 2.5 * (1 - Math.min(1, elPct / 15));
      const prem = el * mult;
      const rol = (prem / v.lim) * 100;
      const rpA = Math.pow(a / 20, 2), rpB = Math.pow(b / 20, 2);
      const rp = (x) => (x >= 1000 ? "1,000+" : Math.round(x).toLocaleString("en-GB"));
      const curve = [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000].map((x) => [x, Math.round(20 * Math.sqrt(x))]);
      const insight = `The layer starts paying at about a **1-in-${rp(rpA)}** loss and is used up at 1-in-${rp(rpB)}. Its expected loss is ${H.fmtM(el)} a year, ${r1(elPct)}% of the limit.\n\nAt a multiple of ${r1(mult)}, the premium is ${H.fmtM(prem)}: a rate on line of **${r1(rol)}%**. Move the layer higher and the expected loss shrinks fast, but the multiple climbs, because the reinsurer must hold capital against a layer that, when hit, is hit in full.`;
      return {
        readouts: [["Expected loss", H.fmtM(el)], ["Share of limit", `${r1(elPct)}%`], ["Multiple", `${r1(mult)}×`], ["Rate on line", `${r1(rol)}%`, "c1"]],
        chart: {
          type: "line",
          title: "The cedant’s hurricane EP curve",
          height: 220,
          x: { min: 1, max: 1000, log: true, ticks: [1, 10, 100, 1000], labels: ["1", "10", "100", "1,000"], title: "Return period, years (log scale)" },
          y: { min: 0, max: 700, ticks: [0, 200, 400, 600], prefix: "£", suffix: "m", title: "Loss" },
          bands: [{ from: a, to: Math.min(b, 700), tone: "c2", label: "The layer" }],
          series: [{ name: "Modelled loss", tone: "c1", points: curve }]
        },
        insight
      };
    }
  };

  X["hours-clause"] = {
    title: "One storm or two?",
    blurb: "Stretch a storm past the hours clause and see whether two events help or hurt.",
    ask: "A catastrophe layer pays per event, and a 72-hour clause defines an event. Losses build up evenly while the storm lasts. Change its length and size, and the layer, and compare one event with several.",
    inputs: [
      { k: "d", label: "Length of the storm", min: 24, max: 144, step: 12, value: 96, unit: "h" },
      { k: "L", label: "Total loss from the storm", min: 50, max: 300, step: 10, value: 150, unit: "m" },
      { k: "ret", label: "Retention per event", min: 10, max: 80, step: 5, value: 40, unit: "m" },
      { k: "lim", label: "Limit per event", min: 50, max: 150, step: 10, value: 100, unit: "m" }
    ],
    presets: [
      { label: "Splitting hurts", v: { d: 96, L: 150, ret: 40, lim: 100 } },
      { label: "Splitting helps", v: { d: 120, L: 300, ret: 40, lim: 100 } }
    ],
    compute(v, H) {
      const pay = (x) => Math.min(Math.max(x - v.ret, 0), v.lim);
      const n = Math.ceil(v.d / 72);
      const parts = Array.from({ length: n }, (_, i) => (v.L * (Math.min(v.d, 72 * (i + 1)) - 72 * i)) / v.d);
      const split = parts.reduce((a, x) => a + pay(x), 0);
      const one = pay(v.L);
      const diff = split - one;
      const row = (label, x) => ({ label, total: `${H.fmtM(x)} → ${H.fmtM(pay(x))} recovered`, segs: [[Math.min(x, v.ret), "", "neutral"], [pay(x), "", "c1"], [Math.max(x - v.ret - v.lim, 0), "", "hatch"]] });
      const rows = n > 1
        ? parts.map((x, i) => row(`Event ${i + 1} · hours ${72 * i}–${Math.min(v.d, 72 * (i + 1))}`, x)).concat([row("If it were one event", v.L)])
        : [row(`One event · ${v.d} hours`, v.L)];
      let insight;
      if (n === 1) insight = `The storm lasts ${v.d} hours, within the 72-hour clause, so it is **one event**: one retention, one limit, a recovery of ${H.fmtM(one)}.`;
      else insight = `The storm lasts ${v.d} hours, longer than the 72-hour clause, so it counts as **${n} events**: ${n} retentions, but also ${n} limits. The cedant recovers ${H.fmtM(split)}, against ${H.fmtM(one)} if it were one event: ${diff >= 0 ? `**${H.fmtM(diff)} more**, because the extra limit outweighs the extra retention` : `**${H.fmtM(-diff)} less**, because the later event barely clears its own retention`}.\n\nThat is why aggregation is fought over: the same storm can be worth very different sums depending on how many events it is.`;
      return {
        readouts: [["Events", String(n)], ["Recovered", H.fmtM(split), "c1"], ["Versus one event", `${diff >= 0 ? "+" : "−"}${H.fmtM(Math.abs(diff))}`, diff > 0.01 ? "good" : diff < -0.01 ? "bad" : ""]],
        chart: {
          type: "bars",
          scale: Math.max(v.L, v.ret + v.lim) * 1.04,
          prefix: "£",
          suffix: "m",
          ticks: [0, 100, 200, 300].filter((x) => x <= Math.max(v.L, v.ret + v.lim)),
          rows,
          legend: [["neutral", "Retention"], ["c1", "Recovered"], ["hatch", "Above the limit"]]
        },
        insight
      };
    }
  };

  X.commutation = {
    title: "Price a commutation",
    blurb: "Change interest rates and the price of certainty, and watch the clean-break payment move.",
    ask: "A reinsurer expects to pay £20m more in claims on an old casualty treaty, spread evenly over the coming years. Both sides want a clean break. Change the timing, interest rates and the premium the reinsurer will pay for certainty.",
    inputs: [
      { k: "E", label: "Claims still expected", min: 5, max: 50, step: 1, value: 20, unit: "m" },
      { k: "n", label: "Years over which they’d be paid", min: 1, max: 20, step: 1, value: 8, unit: "yr" },
      { k: "r", label: "Interest rate", min: 0, max: 8, step: 0.5, value: 4, unit: "pct" },
      { k: "m", label: "Extra paid for certainty", min: 0, max: 30, step: 5, value: 10, unit: "pct" }
    ],
    compute(v, H) {
      let pv = 0;
      for (let t = 1; t <= v.n; t++) pv += v.E / v.n / Math.pow(1 + v.r / 100, t - 0.5);
      const pay = pv * (1 + v.m / 100);
      const insight = `Paid over ${v.n} year${v.n === 1 ? "" : "s"}, the ${gbp(v.E)} of claims is worth ${gbp(pv)} today at ${pc(v.r)} interest. The reinsurer offers **${gbp(pay)}**, ${v.m}% above that best estimate, to be rid of the uncertainty, the capital and the administration.\n\nNow raise the interest rate: future claims are worth less today, so the payment falls. That is why legacy and commutation deals tend to flourish when rates rise.`;
      return {
        readouts: [["Present value", gbp(pv)], ["Commutation payment", gbp(pay), "c1"], ["Versus nominal claims", `${Math.round((pay / v.E - 1) * 100)}%`]],
        chart: {
          type: "waterfall",
          prefix: "£",
          suffix: "m",
          dp: 1,
          legend: [["c1", "Adds"], ["c2", "Takes away"], ["total", "Total"]],
          steps: [
            { label: "Claims still expected", value: v.E },
            { label: "Discount for time", value: pv - v.E },
            { label: "Present value", total: true },
            { label: "Price of certainty", value: pay - pv },
            { label: "Commutation payment", total: true }
          ]
        },
        insight
      };
    }
  };

  /* ---------------------------------------------------------------- m10 */
  const SEASON = [4, 4, 4, 4, 4, 8, 10, 16, 20, 14, 6, 6];
  X["earned-premium"] = {
    title: "Earn the premium",
    blurb: "Move through the policy year and watch unearned premium turn into earned.",
    ask: "A twelve-month policy costs £120k. Choose when it starts, how far through the year we are, and whether it earns evenly or with the hurricane season.",
    inputs: [
      { k: "start", label: "Policy starts", min: 0, max: 11, step: 1, value: 9, show: (x) => `1 ${MONTHS[x]}` },
      { k: "m", label: "Months of cover given so far", min: 0, max: 12, step: 1, value: 3, unit: "mo" },
      { k: "season", label: "Earning pattern", min: 0, max: 1, step: 1, value: 0, show: (x) => (x ? "Hurricane season" : "Even") }
    ],
    presets: [
      { label: "1 Oct, at 31 Dec", v: { start: 9, m: 3, season: 0 } },
      { label: "Hurricane cover, 30 Jun", v: { start: 0, m: 6, season: 1 } },
      { label: "Hurricane cover, 30 Nov", v: { start: 0, m: 11, season: 1 } }
    ],
    compute(v) {
      const w = Array.from({ length: 12 }, (_, i) => (v.season ? SEASON[(v.start + i) % 12] : 100 / 12));
      const tot = w.reduce((a, b) => a + b, 0);
      const earnedPct = w.slice(0, v.m).reduce((a, b) => a + b, 0) / tot;
      const earned = 120 * earnedPct;
      const segs = w.map((x, i) => [(x / tot) * 100, (x / tot) * 100 > 9 ? MONTHS[(v.start + i) % 12] : "", i < v.m ? "c1" : "c1l"]);
      const insight = v.m === 0
        ? `The policy has just started: all £120k is **unearned**, held as a liability, because no cover has yet been given.`
        : `After ${v.m} month${v.m === 1 ? "" : "s"}, **£${Math.round(earned)}k is earned** and £${Math.round(120 - earned)}k is still unearned, a liability for cover yet to be given.${v.season ? `\n\nNotice the hurricane pattern: the months from June to October carry most of the risk, so they earn most of the premium. Halfway through the calendar year, far less than half the premium has been earned.` : `\n\nEarned evenly, each month moves £10k from unearned to earned.`}`;
      return {
        readouts: [["Earned", `£${Math.round(earned)}k`, "c1"], ["Unearned", `£${Math.round(120 - earned)}k`]],
        chart: {
          type: "bars",
          scale: 100,
          ticks: [0, 25, 50, 75, 100],
          suffix: "%",
          rows: [{ label: "The £120k premium, month by month", total: `${Math.round(earnedPct * 100)}% earned`, segs }],
          legend: [["c1", "Earned"], ["c1l", "Unearned"]]
        },
        insight
      };
    }
  };

  X["combined-ratio"] = {
    title: "Combined ratio and the float",
    blurb: "Push the combined ratio over 100% and see whether investment income rescues the year.",
    ask: "An insurer earns £200m of premium. Change its claims and expenses, how long it holds premium before paying claims, and the interest rate it earns on that float.",
    inputs: [
      { k: "c", label: "Claims incurred", min: 80, max: 200, step: 2, value: 120, unit: "m" },
      { k: "e", label: "Expenses", min: 40, max: 90, step: 2, value: 66, unit: "m" },
      { k: "dur", label: "Years premium is held before claims are paid", min: 0.5, max: 6, step: 0.5, value: 2, unit: "yr" },
      { k: "r", label: "Interest rate", min: 0, max: 8, step: 0.5, value: 4, unit: "pct" }
    ],
    presets: [
      { label: "Short tail, low rates", v: { c: 130, e: 72, dur: 1, r: 0.5 } },
      { label: "Long tail, high rates", v: { c: 136, e: 72, dur: 5, r: 5 } }
    ],
    compute(v, H) {
      const P = 200;
      const cor = ((v.c + v.e) / P) * 100;
      const uw = P - v.c - v.e;
      const inv = (v.c * v.dur * v.r) / 100;
      const total = uw + inv;
      let insight = `Loss ratio ${r1((v.c / P) * 100)}% plus expense ratio ${r1((v.e / P) * 100)}% gives a **combined ratio of ${r1(cor)}%**: an underwriting ${uw >= 0 ? "profit" : "loss"} of ${H.fmtM(Math.abs(uw))}.`;
      if (uw < 0 && total >= 0) insight += `\n\nYet the year is still profitable: holding claims money for ${v.dur} years at ${pc(v.r)} earns ${H.fmtM(inv)}, more than the underwriting loss. That only works while claims are paid slowly and interest rates hold up.`;
      else if (uw < 0) insight += `\n\nInvestment income of ${H.fmtM(inv)} isn’t enough to cover it. Try lengthening the tail or raising rates, and notice how much both are needed to rescue a combined ratio above 100%.`;
      else insight += `\n\nInvestment income adds ${H.fmtM(inv)} on top. When rates are low, this is close to nothing and underwriting has to earn the whole return.`;
      return {
        readouts: [["Combined ratio", `${r1(cor)}%`, cor > 100 ? "bad" : "good"], ["Underwriting", H.fmtM(uw), uw >= 0 ? "good" : "bad"], ["Overall", H.fmtM(total), total >= 0 ? "good" : "bad"]],
        chart: {
          type: "waterfall",
          prefix: "£",
          suffix: "m",
          dp: 0,
          legend: [["c1", "Adds"], ["c2", "Takes away"], ["total", "Total"]],
          steps: [
            { label: "Earned premium", value: P },
            { label: "Claims", value: -v.c },
            { label: "Expenses", value: -v.e },
            { label: "Underwriting result", total: true },
            { label: "Investment income", value: inv },
            { label: "Overall result", total: true }
          ]
        },
        insight
      };
    }
  };

  X.cycle = {
    title: "Run the underwriting cycle",
    blurb: "Add a shock, speed up new capital or impose discipline, and watch twelve years of rates.",
    ask: "A simple model of a market over twelve years: rates fall when capital is plentiful and rise when it is scarce, and good returns attract new capital. Add a shock in year 4, change how fast capital floods in, and see what discipline does.",
    inputs: [
      { k: "shock", label: "Catastrophe shock in year 4", min: 0, max: 70, step: 10, value: 40, show: (x) => (x ? `${x}% of capital` : "None") },
      { k: "speed", label: "How fast new capital arrives", min: 0, max: 2, step: 0.5, value: 1, show: (x) => (x === 0 ? "Not at all" : x < 1 ? "Slowly" : x === 1 ? "Normally" : "Very fast") },
      { k: "disc", label: "Underwriting discipline", min: 0, max: 90, step: 10, value: 0, unit: "pct" }
    ],
    compute(v) {
      let K = 110, R = 100;
      const rate = [], cor = [];
      for (let t = 1; t <= 12; t++) {
        const lr = (62 * 100) / R;
        rate.push([t, r1(R)]);
        cor.push([t, r1(lr + 33)]);
        const profit = R * (1 - lr / 100 - 0.33) - (t === 4 ? (v.shock * 110) / 100 : 0) + 0.03 * K;
        const roe = profit / K;
        K = K + profit + 0.6 * v.speed * Math.max(0, roe - 0.08) * K - (roe < 0 ? -0.2 * profit : 0);
        let g = (0.45 * (100 - K)) / 100;
        if (g < 0) g *= 1 - v.disc / 100;
        R *= 1 + Math.max(-0.1, Math.min(0.3, g));
      }
      const rs = rate.map((p) => p[1]), cs = cor.map((p) => p[1]);
      const swing = Math.max(...rs) - Math.min(...rs);
      let insight = `Rates swing by **${Math.round(swing)} points** over the twelve years, and the combined ratio ranges from ${Math.round(Math.min(...cs))}% to ${Math.round(Math.max(...cs))}%.`;
      insight += v.shock
        ? ` The year-4 shock destroys capital, capacity shrinks and rates jump: a hard market. Profits then attract new capital, and the softening begins again.`
        : ` Even with no shock, the market cycles by itself: profits attract capital, capital cuts prices, losses drive capital out. The cycle is built into how capital flows.`;
      if (v.disc >= 50) insight += `\n\nDiscipline flattens the swings: underwriters who refuse to follow prices down lose less in the soft phase, so there is less damage to repair.`;
      return {
        readouts: [["Rate swing", `${Math.round(swing)} pts`], ["Worst combined ratio", `${Math.round(Math.max(...cs))}%`, Math.max(...cs) > 105 ? "bad" : ""], ["Best", `${Math.round(Math.min(...cs))}%`, "good"]],
        chart: {
          type: "line",
          title: "Twelve years of the cycle",
          height: 210,
          x: { min: 1, max: 12, ticks: [1, 4, 8, 12], suffix: "", title: "Year" },
          y: { min: 60, max: 160, ticks: [60, 80, 100, 120, 140, 160], title: "Index / %" },
          refs: [{ y: 100, label: "Break-even", align: "start" }].concat(v.shock ? [{ x: 4, label: "Shock" }] : []),
          series: [
            { name: "Rate level (index)", tone: "c1", points: rate },
            { name: "Combined ratio %", tone: "c2", dash: true, points: cor }
          ]
        },
        insight
      };
    }
  };

  X.solvency = {
    title: "The solvency ratio",
    blurb: "Change the risks and the capital, then hit the insurer with a catastrophe.",
    ask: "An insurer’s SCR combines its catastrophe risk with its other risks, allowing for diversification. Change its capital and risks, and then the size of a catastrophe this year.",
    inputs: [
      { k: "own", label: "Own funds", min: 150, max: 500, step: 10, value: 300, unit: "m" },
      { k: "cat", label: "1-in-200 catastrophe loss", min: 50, max: 300, step: 10, value: 150, unit: "m" },
      { k: "oth", label: "Capital for all other risks", min: 50, max: 250, step: 10, value: 120, unit: "m" },
      { k: "ev", label: "Catastrophe this year", min: 0, max: 250, step: 10, value: 80, unit: "m" }
    ],
    compute(v, H) {
      const scr = Math.sqrt(v.cat * v.cat + v.oth * v.oth);
      const before = (v.own / scr) * 100;
      const after = ((v.own - v.ev) / scr) * 100;
      const div = v.cat + v.oth - scr;
      const scale = Math.max(v.own, scr) * 1.12;
      let insight = `The SCR is ${H.fmtM(scr)}: less than the ${H.fmtM(v.cat + v.oth)} you get by adding the two risks, because they are unlikely to hit their 1-in-200 levels in the same year (diversification saves ${H.fmtM(div)}).\n\nWith ${H.fmtM(v.own)} of own funds, the solvency ratio is **${Math.round(before)}%**.`;
      if (v.ev > 0) insight += after >= 100
        ? ` After a ${H.fmtM(v.ev)} catastrophe it falls to ${Math.round(after)}%: still solvent, but with much less margin for the next event.`
        : ` After a ${H.fmtM(v.ev)} catastrophe it falls to **${Math.round(after)}%**, below 100%. The insurer must restore it quickly: raise capital, buy more reinsurance or write less risk.`;
      return {
        readouts: [["SCR", H.fmtM(scr)], ["Ratio before", `${Math.round(before)}%`, before >= 100 ? "good" : "bad"], ["Ratio after", `${Math.round(after)}%`, after >= 120 ? "good" : after >= 100 ? "" : "bad"]],
        chart: {
          type: "bars",
          scale,
          prefix: "£",
          suffix: "m",
          mark: [scr, `SCR ${H.fmtM(scr)}`],
          rows: [
            { label: "Own funds before", total: H.fmtM(v.own), segs: [[v.own, "", "c1"]] },
            { label: "After the catastrophe", total: H.fmtM(v.own - v.ev), segs: [[Math.max(0, v.own - v.ev), "", after >= 100 ? "c1" : "c2"], [Math.min(v.ev, v.own), "", "hatch"]] }
          ],
          legend: [["c1", "Own funds"], ["hatch", "Lost to the catastrophe"]]
        },
        insight
      };
    }
  };

  /* ---------------------------------------------------------------- m13 */
  X["premium-plan"] = {
    title: "Build a premium plan",
    blurb: "Move retention, rate, exposure and new business, and see how much growth is really price.",
    ask: "A class has £100m of expiring premium. Set next year’s retention, like-for-like rate change, exposure change and new business, and see the plan premium and where it comes from.",
    inputs: [
      { k: "ret", label: "Retention", min: 70, max: 100, step: 1, value: 88, unit: "pct" },
      { k: "rate", label: "Like-for-like rate change", min: -10, max: 15, step: 1, value: 5, show: (x) => `${x > 0 ? "+" : x < 0 ? "−" : ""}${Math.abs(x)}%` },
      { k: "exp", label: "Exposure change", min: -5, max: 10, step: 1, value: 3, show: (x) => `${x > 0 ? "+" : x < 0 ? "−" : ""}${Math.abs(x)}%` },
      { k: "nb", label: "New business", min: 0, max: 30, step: 1, value: 15, unit: "m" }
    ],
    presets: [
      { label: "Hard market", v: { ret: 90, rate: 10, exp: 3, nb: 8 } },
      { label: "Growth at any price", v: { ret: 92, rate: -6, exp: 4, nb: 25 } }
    ],
    compute(v) {
      const renewed = v.ret;
      const rateAdd = (renewed * v.rate) / 100;
      const expAdd = ((renewed + rateAdd) * v.exp) / 100;
      const plan = renewed + rateAdd + expAdd + v.nb;
      const growth = plan - 100;
      const insight = `The plan premium is **£${r1(plan)}m**, ${growth >= 0 ? `up ${r1(growth)}%` : `down ${r1(-growth)}%`} on the expiring £100m. Of that change, ${gbp(rateAdd)} comes from price, ${gbp(expAdd)} from exposure, ${gbp(v.nb)} from new clients and −${gbp(100 - v.ret)} from business lost.${v.rate < 0 && growth > 0 ? `\n\nNotice the danger: premium is growing while rates are **falling**. The growth comes from volume at lower prices, which is exactly the pattern a planner should question.` : v.rate > 0 ? `\n\nOnly the rate line improves the margin on each policy; the rest just changes how much business there is.` : ""}`;
      return {
        readouts: [["Plan premium", `£${r1(plan)}m`, "c1"], ["Growth", `${growth >= 0 ? "+" : "−"}${r1(Math.abs(growth))}%`], ["From price", gbp(rateAdd), v.rate < 0 ? "bad" : ""]],
        chart: {
          type: "waterfall",
          prefix: "£",
          suffix: "m",
          dp: 1,
          steps: [
            { label: "Expiring premium", value: 100, total: true },
            { label: "Lost at renewal", value: -(100 - v.ret) },
            { label: "Rate change", value: rateAdd },
            { label: "Exposure change", value: expAdd },
            { label: "New business", value: v.nb },
            { label: "Plan premium", total: true }
          ]
        },
        insight
      };
    }
  };

  X["on-level"] = {
    title: "On-level a past loss ratio",
    blurb: "Pit two years of rate rises against two years of claims inflation.",
    ask: "Two years ago a class produced an ultimate loss ratio of 60%. Restate it at today’s prices and claims costs. Change the two years’ rate changes and the claims inflation.",
    inputs: [
      { k: "lr", label: "Past loss ratio", min: 40, max: 80, step: 1, value: 60, unit: "pct" },
      { k: "r1", label: "Rate change last year but one", min: -10, max: 15, step: 1, value: 8, show: (x) => `${x > 0 ? "+" : x < 0 ? "−" : ""}${Math.abs(x)}%` },
      { k: "r2", label: "Rate change last year", min: -10, max: 15, step: 1, value: 5, show: (x) => `${x > 0 ? "+" : x < 0 ? "−" : ""}${Math.abs(x)}%` },
      { k: "inf", label: "Claims inflation a year", min: 0, max: 12, step: 1, value: 6, unit: "pct" }
    ],
    compute(v) {
      const rates = (1 + v.r1 / 100) * (1 + v.r2 / 100);
      const infl = Math.pow(1 + v.inf / 100, 2);
      const trended = v.lr * infl;
      const onl = trended / rates;
      const insight = `Claims inflation of ${v.inf}% a year raises today’s cost of those claims by ${r1((infl - 1) * 100)}%, to a ${r1(trended)}% loss ratio. Rates have changed by a cumulative ${r1((rates - 1) * 100)}%, which brings it to **${r1(onl)}%** at today’s prices.\n\n${onl < v.lr - 0.5 ? "Rates have outrun inflation, so the business is genuinely more profitable than it was." : onl > v.lr + 0.5 ? "Inflation has outrun the rate increases, so despite the price rises, margins are **worse** than two years ago." : "Rates have only just kept pace with inflation: the price rises bought no extra margin at all."} A rate increase only improves margins when it beats claims inflation.`;
      return {
        readouts: [["Past", `${v.lr}%`], ["At today’s costs", `${r1(trended)}%`], ["On-levelled", `${r1(onl)}%`, onl > v.lr + 0.5 ? "bad" : onl < v.lr - 0.5 ? "good" : ""]],
        chart: {
          type: "waterfall",
          suffix: "%",
          dp: 1,
          steps: [
            { label: "Past loss ratio", value: v.lr, total: true },
            { label: "Claims inflation", value: trended - v.lr },
            { label: "Rate changes since", value: onl - trended },
            { label: "On-levelled", total: true }
          ]
        },
        insight
      };
    }
  };

  X["net-result"] = {
    title: "From gross to net",
    blurb: "Change acquisition costs, losses and reinsurance, and follow £200m down to the result.",
    ask: "A plan writes £200m of gross premium with £16m of operating expenses. Change its acquisition costs, loss ratio, reinsurance spend and expected recoveries, and its investment income.",
    inputs: [
      { k: "acq", label: "Acquisition costs", min: 20, max: 40, step: 1, value: 28, unit: "pct" },
      { k: "lr", label: "Gross loss ratio", min: 40, max: 90, step: 1, value: 59, unit: "pct" },
      { k: "rp", label: "Reinsurance premium", min: 0, max: 40, step: 1, value: 20, unit: "m" },
      { k: "rr", label: "Expected recoveries", min: 0, max: 30, step: 1, value: 12, unit: "m" },
      { k: "inv", label: "Investment income", min: 0, max: 15, step: 1, value: 6, unit: "m" }
    ],
    compute(v, H) {
      const P = 200, acq = (P * v.acq) / 100, cl = (P * v.lr) / 100, ox = 16;
      const net = v.rp - v.rr;
      const uw = P - acq - cl - ox - net;
      const gcor = ((acq + cl + ox) / P) * 100;
      const ncor = ((acq + cl + ox + net) / P) * 100;
      let insight = `Gross combined ratio ${r1(gcor)}%, net ${r1(ncor)}%. The underwriting result is ${H.fmtM(uw)}, and investment income brings the overall result to **${H.fmtM(uw + v.inv)}**.`;
      insight += net > 0
        ? `\n\nReinsurance costs ${H.fmtM(net)} more than it is expected to recover: the margin paid for lower volatility and capital. That is normal.`
        : net < 0
          ? `\n\n**Be suspicious**: this plan expects reinsurers to pay back more than they charge. Over time reinsurers won’t sustain that, so the net result is probably flattered.`
          : `\n\nThe reinsurance is assumed to break even, which is optimistic: reinsurers expect a margin.`;
      return {
        readouts: [["Gross combined", `${r1(gcor)}%`], ["Net combined", `${r1(ncor)}%`, ncor > 100 ? "bad" : ""], ["Overall", H.fmtM(uw + v.inv), uw + v.inv >= 0 ? "good" : "bad"]],
        chart: {
          type: "waterfall",
          prefix: "£",
          suffix: "m",
          dp: 0,
          steps: [
            { label: "Gross premium", value: P },
            { label: "Acquisition", value: -acq },
            { label: "Gross claims", value: -cl },
            { label: "Expenses", value: -ox },
            { label: "Net reinsurance", value: -net },
            { label: "Underwriting", total: true },
            { label: "Investment", value: v.inv },
            { label: "Overall result", total: true }
          ]
        },
        insight
      };
    }
  };

  X.roc = {
    title: "Return on capital by class",
    blurb: "Set a hurdle and reprice the classes, and see which earn their capital.",
    ask: "Three classes use very different amounts of capital. Set the capital providers’ hurdle rate, and change the price of property catastrophe and professional indemnity, to see which classes clear it.",
    inputs: [
      { k: "h", label: "Hurdle rate", min: 5, max: 20, step: 1, value: 12, unit: "pct" },
      { k: "cat", label: "Price change: property catastrophe", min: -15, max: 15, step: 1, value: 0, show: (x) => `${x > 0 ? "+" : x < 0 ? "−" : ""}${Math.abs(x)}%` },
      { k: "pi", label: "Price change: professional indemnity", min: -10, max: 15, step: 1, value: 0, show: (x) => `${x > 0 ? "+" : x < 0 ? "−" : ""}${Math.abs(x)}%` }
    ],
    compute(v) {
      const cls = [
        { n: "Marine cargo", p: 40, pr: 4, c: 16, ch: 0 },
        { n: "Property catastrophe", p: 60, pr: 12, c: 90, ch: v.cat },
        { n: "Professional indemnity", p: 50, pr: 3, c: 35, ch: v.pi }
      ].map((x) => Object.assign(x, { prof: x.pr + (x.p * x.ch) / 100 })).map((x) => Object.assign(x, { roc: (x.prof / x.c) * 100 }));
      const tot = cls.reduce((a, x) => a + x.prof, 0), cap = cls.reduce((a, x) => a + x.c, 0);
      const below = cls.filter((x) => x.roc < v.h);
      const pi = cls[2];
      const need = ((v.h / 100) * pi.c - 3) / 50 * 100;
      let insight = `Overall the plan earns ${r1((tot / cap) * 100)}% on £${cap}m of capital. ${below.length ? `**${below.map((x) => x.n).join(" and ")}** fall${below.length === 1 ? "s" : ""} short of the ${v.h}% hurdle.` : `Every class clears the ${v.h}% hurdle.`}`;
      insight += `\n\nCargo earns ${r1(cls[0].roc)}% on very little capital, while catastrophe needs £90m: a fat margin on a lot of capital can be a worse use of money than a thin margin on a little. PI needs a price rise of about ${Math.max(0, Math.round(need))}% to reach ${v.h}%.`;
      return {
        readouts: [["Whole plan", `${r1((tot / cap) * 100)}%`, (tot / cap) * 100 >= v.h ? "good" : "bad"], ["Classes below hurdle", String(below.length), below.length ? "bad" : "good"]],
        chart: {
          type: "bars",
          scale: 30,
          suffix: "%",
          mark: [v.h, `Hurdle ${v.h}%`],
          rows: cls.map((x) => ({ label: `${x.n} · capital £${x.c}m`, total: `${r1(x.roc)}% on profit ${gbp(x.prof)}`, segs: [[Math.max(0, Math.min(30, x.roc)), "", x.roc >= v.h ? "c1" : "c2"]] })),
          legend: [["c1", "Clears the hurdle"], ["c2", "Falls short"]]
        },
        insight
      };
    }
  };

  X.variance = {
    title: "Explain the variance",
    blurb: "Mix rate shortfalls, extra volume and big losses, and trace the result back to plan.",
    ask: "The plan was £200m of premium at a 60% loss ratio and 30% expenses: a £20m profit. Change what actually happened: rates against plan, volume against plan, and any extra large or catastrophe losses.",
    inputs: [
      { k: "rate", label: "Rates achieved against plan", min: -10, max: 5, step: 1, value: -6, show: (x) => `${x > 0 ? "+" : x < 0 ? "−" : ""}${Math.abs(x)} points` },
      { k: "vol", label: "Volume against plan", min: -20, max: 20, step: 5, value: 10, show: (x) => `${x > 0 ? "+" : x < 0 ? "−" : ""}${Math.abs(x)}%` },
      { k: "large", label: "Extra large losses", min: 0, max: 20, step: 1, value: 4, unit: "m" },
      { k: "cat", label: "A catastrophe", min: 0, max: 40, step: 5, value: 0, unit: "m" }
    ],
    compute(v, H) {
      const p1 = 200 * (1 + v.rate / 100);
      const prof1 = 0.7 * p1 - 120;
      const prof2 = prof1 * (1 + v.vol / 100);
      const actual = prof2 - v.large - v.cat;
      const prem = p1 * (1 + v.vol / 100);
      let insight = `Premium is ${H.fmtM(prem)}, ${prem >= 200 ? `${r1((prem / 200 - 1) * 100)}% ahead of` : `${r1((1 - prem / 200) * 100)}% behind`} plan, but the result is **${H.fmtM(actual)}** against a plan of £20m.`;
      if (v.rate < 0 && v.vol > 0) insight += `\n\nThe headline growth hides the problem: each policy is priced ${-v.rate} points below plan, so its margin is thinner, and writing more of them multiplies the shortfall rather than fixing it.`;
      if (v.large || v.cat) insight += ` Large and catastrophe losses add ${H.fmtM(v.large + v.cat)} of volatility that may not repeat; the rate shortfall will.`;
      return {
        readouts: [["Actual result", H.fmtM(actual), actual >= 20 ? "good" : actual >= 0 ? "" : "bad"], ["Versus plan", `${actual - 20 >= 0 ? "+" : "−"}${H.fmtM(Math.abs(actual - 20))}`, actual >= 20 ? "good" : "bad"]],
        chart: {
          type: "waterfall",
          prefix: "£",
          suffix: "m",
          dp: 1,
          steps: [
            { label: "Plan result", value: 20, total: true },
            { label: "Rates against plan", value: prof1 - 20 },
            { label: "Volume against plan", value: prof2 - prof1 },
            { label: "Large losses", value: -v.large },
            { label: "Catastrophe", value: -v.cat },
            { label: "Actual result", total: true }
          ]
        },
        insight
      };
    }
  };

  X.remediation = {
    title: "Remediate a class",
    blurb: "Drop the worst business and reprice the rest: watch premium fall and profit rise.",
    ask: "A £100m class carries £10m of fixed costs plus 20% variable costs. One segment performs badly. Decide how big that segment is and how bad, then drop it and put up rates on the rest, losing some clients.",
    inputs: [
      { k: "share", label: "Share of the book in the bad segment", min: 10, max: 40, step: 5, value: 25, unit: "pct" },
      { k: "badlr", label: "Its loss ratio", min: 80, max: 150, step: 5, value: 110, unit: "pct" },
      { k: "rate", label: "Rate rise on the rest", min: 0, max: 15, step: 1, value: 8, unit: "pct" },
      { k: "lost", label: "Clients lost to the rise", min: 0, max: 25, step: 5, value: 10, unit: "pct" }
    ],
    compute(v, H) {
      const goodP = 100 - v.share, goodLR = 58;
      const before = 100 - ((v.share * v.badlr) / 100 + (goodP * goodLR) / 100) - (10 + 20);
      const s1 = before + (-v.share + (v.share * v.badlr) / 100 + 0.2 * v.share);
      const p2 = goodP * (1 + v.rate / 100);
      const s2 = s1 + goodP * (v.rate / 100) * 0.8;
      const lr2 = goodLR / (1 + v.rate / 100);
      const lostP = (p2 * v.lost) / 100;
      const s3 = s2 - lostP * (1 - lr2 / 100 - 0.2);
      const pAfter = p2 - lostP;
      const erB = 30, erA = ((10 + 0.2 * pAfter) / pAfter) * 100;
      const insight = `Premium falls from £100m to **${gbp(pAfter)}**, but the result swings from ${H.fmtM(before)} to **${H.fmtM(s3)}**.\n\nNotice the expense ratio: it rises from ${erB}% to ${r1(erA)}%, because the £10m of fixed costs is now spread over less premium. That is the temptation to keep bad business “to cover the expense base”. It’s a trap: the bad segment was costing far more than its share of overheads.`;
      return {
        readouts: [["Premium after", gbp(pAfter)], ["Result after", H.fmtM(s3), s3 > before ? "good" : "bad"], ["Expense ratio after", `${r1(erA)}%`, "bad"]],
        chart: {
          type: "waterfall",
          prefix: "£",
          suffix: "m",
          dp: 1,
          steps: [
            { label: "Result before", value: before, total: true },
            { label: "Drop the bad segment", value: s1 - before },
            { label: "Rate rise on the rest", value: s2 - s1 },
            { label: "Clients lost", value: s3 - s2 },
            { label: "Result after", total: true }
          ]
        },
        insight
      };
    }
  };

  /* ---------------------------------------------------------------- m14 */
  X["large-numbers"] = {
    title: "Why big books are steadier",
    blurb: "Add independent risks and watch the range of results narrow, unless they share a coastline.",
    ask: "Each risk has a 2% chance of a total loss and is priced for a 60% loss ratio. Add more risks to the book and see the range of loss ratios you might get in a good or bad year (1 in 20 either way). Then put them all on the same coastline.",
    inputs: [
      { k: "n", label: "Risks in the book", values: [1, 10, 50, 100, 500, 1000, 5000, 20000], value: 100, show: (x) => x.toLocaleString("en-GB") },
      { k: "same", label: "Are the risks independent?", min: 0, max: 1, step: 1, value: 0, show: (x) => (x ? "Same coastline" : "Independent") }
    ],
    presets: [
      { label: "A handful", v: { n: 10, same: 0 } },
      { label: "Thousands, spread out", v: { n: 5000, same: 0 } },
      { label: "Thousands, one coast", v: { n: 5000, same: 1 } }
    ],
    compute(v) {
      if (v.n === 1) {
        return {
          readouts: [["Good year", "0%"], ["Bad year", "3,000%", "bad"]],
          chart: { type: "bars", scale: 200, suffix: "%", ticks: [0, 60, 100, 200], mark: [60, "Expected 60%"], rows: [{ label: "One risk: all or nothing", total: "0% or 3,000%", segs: [[200, "", "hatch"]] }] },
          insight: `With one risk, the result is all or nothing: either no claim, a 0% loss ratio, or a total loss, **3,000%**. The 60% expected loss ratio never actually happens. That is why no insurer can live on a single risk.`
        };
      }
      const c = v.same ? 0.02 : 0;
      const sd = 420 * Math.sqrt((1 - c) / v.n + c);
      const lo = Math.max(0, 60 - 1.645 * sd), hi = 60 + 1.645 * sd;
      const shownHi = Math.min(hi, 200);
      const insight = v.same
        ? `On the same coastline the risks fail together, so adding more of them stops helping: the bad-year loss ratio stays around **${Math.round(hi)}%** however big the book gets. That is accumulation, and it is why spreading risk matters as much as having lots of it.`
        : `With ${v.n.toLocaleString("en-GB")} independent risks, a bad year (1 in 20) comes in around **${Math.round(hi)}%** and a good one around ${Math.round(lo)}%. Quadruple the book and the spread halves: the law of large numbers. Volatility falls with the square root of the number of risks, but only if they really are independent.`;
      return {
        readouts: [["Good year (1 in 20)", `${Math.round(lo)}%`, "good"], ["Bad year (1 in 20)", `${Math.round(hi)}%`, hi > 100 ? "bad" : ""]],
        chart: {
          type: "bars",
          scale: 200,
          suffix: "%",
          ticks: [0, 100, 200],
          mark: [60, "Expected 60%"],
          rows: [{ label: "Likely range of the loss ratio", total: `${Math.round(lo)}% to ${hi > 200 ? `${Math.round(hi)}% (off the scale)` : `${Math.round(hi)}%`}`, segs: [[lo, "", "none"], [shownHi - lo, "", v.same ? "c2" : "c1"]] }]
        },
        insight
      };
    }
  };

  X["rate-index"] = {
    title: "Rates compound, and so does inflation",
    blurb: "Set four years of rate changes against claims inflation and watch the margin.",
    ask: "A class ran at a 60% loss ratio four years ago. Set the rate change in each year since, and the claims inflation, and see whether prices have really kept up.",
    inputs: [
      { k: "a", label: "Year 1 rate change", min: -10, max: 20, step: 1, value: 10, show: (x) => `${x > 0 ? "+" : x < 0 ? "−" : ""}${Math.abs(x)}%` },
      { k: "b", label: "Year 2", min: -10, max: 20, step: 1, value: 8, show: (x) => `${x > 0 ? "+" : x < 0 ? "−" : ""}${Math.abs(x)}%` },
      { k: "c", label: "Year 3", min: -10, max: 20, step: 1, value: -5, show: (x) => `${x > 0 ? "+" : x < 0 ? "−" : ""}${Math.abs(x)}%` },
      { k: "d", label: "Year 4", min: -10, max: 20, step: 1, value: -3, show: (x) => `${x > 0 ? "+" : x < 0 ? "−" : ""}${Math.abs(x)}%` },
      { k: "inf", label: "Claims inflation a year", min: 0, max: 10, step: 1, value: 5, unit: "pct" }
    ],
    compute(v) {
      const ch = [v.a, v.b, v.c, v.d];
      let ri = 100;
      const rate = [[0, 100]], cost = [[0, 100]];
      ch.forEach((x, i) => { ri *= 1 + x / 100; rate.push([i + 1, r1(ri)]); cost.push([i + 1, r1(100 * Math.pow(1 + v.inf / 100, i + 1))]); });
      const ci = 100 * Math.pow(1 + v.inf / 100, 4);
      const lr = (60 * ci) / ri;
      const sum = ch.reduce((x, y) => x + y, 0);
      const ymin = Math.floor(Math.min(...rate.map((p) => p[1]), 100) / 10) * 10 - 10;
      const ymax = Math.ceil(Math.max(...rate.map((p) => p[1]), ci) / 10) * 10 + 10;
      const insight = `Compounded, rates have moved **${r1(ri - 100) >= 0 ? "+" : ""}${r1(ri - 100)}%**, not the ${sum >= 0 ? "+" : ""}${sum}% you get by adding the changes up. Meanwhile claims costs have risen ${r1(ci - 100)}%.\n\nSo the 60% loss ratio is now about **${r1(lr)}%**. ${lr > 61 ? "Despite the early rate rises, inflation has overtaken them: the class is less profitable than four years ago." : lr < 59 ? "Rates have outrun inflation, so margins have genuinely improved." : "Rates have only just kept pace with inflation."}`;
      return {
        readouts: [["Rates, compounded", `${ri >= 100 ? "+" : "−"}${r1(Math.abs(ri - 100))}%`], ["Claims costs", `+${r1(ci - 100)}%`], ["Loss ratio now", `${r1(lr)}%`, lr > 61 ? "bad" : lr < 59 ? "good" : ""]],
        chart: {
          type: "line",
          title: "Rate index against claims cost index",
          height: 200,
          x: { min: 0, max: 4, ticks: [0, 1, 2, 3, 4], suffix: "", title: "Years" },
          y: { min: ymin, max: ymax, ticks: [ymin, 100, ymax], title: "Index (start = 100)" },
          series: [
            { name: "Rate index", tone: "c1", points: rate },
            { name: "Claims cost index", tone: "c2", dash: true, points: cost }
          ]
        },
        insight
      };
    }
  };

  X.technical = {
    title: "Build a technical price",
    blurb: "Change the expected loss and the capital a risk needs, and test the premium charged.",
    ask: "Build a risk’s technical price from its expected loss and the capital it ties up, with expenses and margin taking 30% of the price. Then set the premium actually charged and read the price adequacy.",
    inputs: [
      { k: "el", label: "Expected loss", min: 40, max: 120, step: 5, value: 70, unit: "k" },
      { k: "cap", label: "Capital the risk needs", min: 50, max: 400, step: 10, value: 150, unit: "k" },
      { k: "coc", label: "Cost of capital", min: 5, max: 20, step: 1, value: 12, unit: "pct" },
      { k: "act", label: "Premium actually charged", min: 60, max: 200, step: 5, value: 120, unit: "k" }
    ],
    compute(v) {
      const charge = (v.cap * v.coc) / 100;
      const tp = (v.el + charge) / 0.7;
      const ex = tp - v.el - charge;
      const at = (v.act / tp) * 100;
      const scale = Math.max(tp, v.act) * 1.12;
      const insight = `The technical price is **£${Math.round(tp)}k**: £${v.el}k of expected loss, £${Math.round(charge)}k for the capital the risk ties up, and £${Math.round(ex)}k of expenses and margin. Charging £${v.act}k puts the risk at **${Math.round(at)}% of technical**${at < 95 ? ", underpriced" : at > 105 ? ", comfortably priced" : ", about right"}.\n\nNotice the capital charge: two risks with the same expected loss can have very different technical prices if one is far more volatile, because it needs more capital.`;
      return {
        readouts: [["Technical price", `£${Math.round(tp)}k`], ["Actual ÷ technical", `${Math.round(at)}%`, at < 95 ? "bad" : at > 105 ? "good" : ""]],
        chart: {
          type: "bars",
          scale,
          prefix: "£",
          suffix: "k",
          mark: [tp, "Technical"],
          rows: [
            { label: "Technical price", total: `£${Math.round(tp)}k`, segs: [[v.el, "Expected loss", "c1"], [charge, "", "c3"], [ex, "", "c2"]] },
            { label: "Premium charged", total: `£${v.act}k`, segs: [[v.act, "", at < 95 ? "hatch" : "c4"]] }
          ],
          legend: [["c1", "Expected loss"], ["c3", "Capital charge"], ["c2", "Expenses and margin"]]
        },
        insight
      };
    }
  };

  X.accumulation = {
    title: "Fill up a hurricane zone",
    blurb: "Write more in one coastal zone and watch the modelled loss approach its limit.",
    ask: "An insurer writes property in three Gulf and Florida zones, with a limit of £150m modelled loss from one hurricane in each zone. Change how much it insures in each zone and how severe the hurricane is.",
    inputs: [
      { k: "a", label: "Sum insured in zone A, Miami", min: 0, max: 1500, step: 50, value: 900, unit: "m" },
      { k: "b", label: "Zone B, Tampa", min: 0, max: 1500, step: 50, value: 600, unit: "m" },
      { k: "c", label: "Zone C, Houston", min: 0, max: 1500, step: 50, value: 400, unit: "m" },
      { k: "dr", label: "Share of values a major hurricane destroys", min: 5, max: 30, step: 1, value: 15, unit: "pct" }
    ],
    compute(v, H) {
      const zones = [["Zone A · Miami", v.a], ["Zone B · Tampa", v.b], ["Zone C · Houston", v.c]];
      const L = 150;
      const losses = zones.map(([n, si]) => [n, (si * v.dr) / 100, si]);
      const over = losses.filter((z) => z[1] > L);
      const worst = losses.reduce((a, b) => (b[1] > a[1] ? b : a));
      const head = (L * 100) / v.dr - worst[2];
      const insight = over.length
        ? `A hurricane destroying ${v.dr}% of values would cost **${H.fmtM(worst[1])}** in ${worst[0].split(" · ")[1]}, over the £150m limit. ${over.length > 1 ? `${over.length} zones are over the limit.` : ""} The portfolio manager must stop writing there, buy more reinsurance or shed exposure, however good the individual risks look.`
        : `The worst zone is ${worst[0].split(" · ")[1]}: ${H.fmtM(worst[1])} from one hurricane, within the £150m limit. At this severity there is room for about ${H.fmtM(Math.max(0, head))} more sum insured there.\n\nNotice how the limit binds per zone, not in total: risks spread across three cities are three smaller accumulations, not one big one.`;
      return {
        readouts: [["Worst zone loss", H.fmtM(worst[1]), worst[1] > L ? "bad" : ""], ["Zones over limit", String(over.length), over.length ? "bad" : "good"]],
        chart: {
          type: "bars",
          scale: 300,
          prefix: "£",
          suffix: "m",
          mark: [L, "Limit £150m"],
          rows: losses.map(([n, l, si]) => ({ label: n, total: `${H.fmtM(l)} of ${H.fmtM(si)}`, segs: [[Math.min(l, 300), "", l > L ? "c2" : "c1"]] }))
        },
        insight
      };
    }
  };

  X.diversification = {
    title: "The diversification benefit",
    blurb: "Change how correlated two books are and watch the capital they need together.",
    ask: "Two books each need capital on their own to survive a 1-in-200 year. Combine them, and change how closely their results move together.",
    inputs: [
      { k: "a", label: "Book A’s capital alone", min: 20, max: 100, step: 5, value: 50, unit: "m" },
      { k: "b", label: "Book B’s capital alone", min: 20, max: 100, step: 5, value: 50, unit: "m" },
      { k: "rho", label: "How closely they move together", min: 0, max: 100, step: 2.5, value: 12.5, unit: "pct" }
    ],
    presets: [
      { label: "Ordinary year", v: { rho: 12.5 } },
      { label: "An extreme year", v: { rho: 80 } },
      { label: "Independent", v: { rho: 0 } }
    ],
    compute(v, H) {
      const comb = Math.sqrt(v.a * v.a + v.b * v.b + (2 * v.rho * v.a * v.b) / 100);
      const ben = v.a + v.b - comb;
      const insight = `Separately the books need ${H.fmtM(v.a + v.b)}. Together they need **${H.fmtM(comb)}**, a diversification benefit of ${H.fmtM(ben)} (${Math.round((ben / (v.a + v.b)) * 100)}%).\n\n${v.rho >= 60 ? "Notice how little is saved when the books move together. In extreme events correlations jump, so the benefit you counted on in ordinary years can largely vanish exactly when you need it." : "Push the correlation up, as happens in a hurricane, a financial crisis or a pandemic, and watch the benefit shrink."}`;
      return {
        readouts: [["Together", H.fmtM(comb)], ["Benefit", H.fmtM(ben), ben > 1 ? "good" : ""], ["Saved", `${Math.round((ben / (v.a + v.b)) * 100)}%`]],
        chart: {
          type: "bars",
          scale: v.a + v.b,
          prefix: "£",
          suffix: "m",
          rows: [
            { label: "Separately", total: H.fmtM(v.a + v.b), segs: [[v.a, "A", "c1"], [v.b, "B", "c2"]] },
            { label: "Together", total: H.fmtM(comb), segs: [[comb, "Combined", "c1m"], [ben, "", "hatch"]] }
          ],
          legend: [["c1m", "Capital needed together"], ["hatch", "Diversification benefit"]]
        },
        insight
      };
    }
  };

  X.matrix = {
    title: "Steer the portfolio matrix",
    blurb: "Push rates up on a fast-growing, underpriced segment and watch it move quadrant.",
    ask: "Four segments sit on the matrix by price adequacy and growth. Liability is underpriced and growing fast. Put rates up on liability, and across the whole book, and see where everything moves (assume each point of rate costs about 1.2 points of growth).",
    inputs: [
      { k: "rc", label: "Rate rise on liability", min: 0, max: 25, step: 1, value: 0, unit: "pct" },
      { k: "ra", label: "Rate rise across the book", min: 0, max: 10, step: 1, value: 0, unit: "pct" }
    ],
    presets: [
      { label: "Do nothing", v: { rc: 0, ra: 0 } },
      { label: "Fix liability", v: { rc: 18, ra: 0 } }
    ],
    compute(v) {
      const segs = [["Cargo", 112, 10], ["Property", 104, -6], ["Liability", 86, 22], ["Cyber", 82, -12]];
      const pts = segs.map(([n, x, y]) => {
        const r = v.ra + (n === "Liability" ? v.rc : 0);
        return { label: n, x: r1(Math.min(129, x * (1 + r / 100))), y: r1(Math.max(-29, y - 1.2 * r)) };
      });
      const lia = pts[2];
      const danger = pts.filter((p) => p.x < 100 && p.y > 0).length;
      pts.forEach((p) => { p.dx = 9; p.dy = 4; p.anchor = "start"; if (p.x > 118) { p.dx = -9; p.anchor = "end"; } p.tone = p.x < 100 && p.y > 0 ? "c2" : "c1"; });
      const insight = lia.x < 100 && lia.y > 0
        ? `Liability sits at ${Math.round(lia.x)}% of technical and growing ${Math.round(lia.y)}% a year: the **danger quadrant**. Its growth is almost certainly coming from underpricing. Push its rates up and watch it move.`
        : `Liability is now at ${Math.round(lia.x)}% of technical, ${lia.y > 0 ? `still growing ${Math.round(lia.y)}%` : `shrinking ${Math.round(-lia.y)}%`}. ${lia.x >= 100 ? "It has left the danger quadrant, at the cost of some volume, which is exactly the trade a portfolio manager should accept." : "Better priced, but still below technical: it needs more, or remediation."}`;
      return {
        readouts: [["Liability adequacy", `${Math.round(lia.x)}%`, lia.x < 100 ? "bad" : "good"], ["Liability growth", `${lia.y >= 0 ? "+" : "−"}${Math.round(Math.abs(lia.y))}%`], ["In danger quadrant", String(danger), danger ? "bad" : "good"]],
        chart: {
          type: "quadrant",
          title: "Segments by price adequacy and growth",
          x: { min: 70, max: 130, split: 100, ticks: [70, 85, 100, 115, 130], suffix: "%", title: "Actual ÷ technical price" },
          y: { min: -30, max: 30, split: 0, ticks: [-30, -15, 0, 15, 30], suffix: "%", title: "Premium growth" },
          quadrants: { tl: "Danger", tr: "Keep going", bl: "Fix or exit", br: "Win more" },
          points: pts
        },
        insight
      };
    }
  };

  X["reinsurance-value"] = {
    title: "Is the reinsurance worth it?",
    blurb: "Weigh the reinsurer’s margin against the value of the capital it frees.",
    ask: "A reinsurance programme costs more than it is expected to recover: that’s the reinsurer’s margin. But it also cuts the capital the business needs. Change the margin, the capital released and the cost of capital.",
    inputs: [
      { k: "m", label: "Reinsurer’s margin a year", min: 0, max: 30, step: 1, value: 10, unit: "m" },
      { k: "cap", label: "Capital released", min: 0, max: 150, step: 5, value: 80, unit: "m" },
      { k: "coc", label: "Cost of capital", min: 5, max: 20, step: 1, value: 15, unit: "pct" }
    ],
    compute(v, H) {
      const val = (v.cap * v.coc) / 100;
      const net = val - v.m;
      const scale = Math.max(v.m, val, 1) * 1.15;
      const insight = net >= 0
        ? `The capital released is worth **${H.fmtM(val)} a year** at a ${v.coc}% cost of capital, more than the ${H.fmtM(v.m)} margin the reinsurer earns. The reinsurance is cheaper than holding the capital: worth buying, provided the reinsurers are strong enough to pay.`
        : `The capital released is worth only ${H.fmtM(val)} a year, less than the ${H.fmtM(v.m)} margin. On capital grounds alone, it would be cheaper to hold the capital and keep the risk, unless the reinsurance is needed to stay within appetite.`;
      return {
        readouts: [["Value of capital", H.fmtM(val)], ["Net benefit", `${net >= 0 ? "+" : "−"}${H.fmtM(Math.abs(net))}`, net >= 0 ? "good" : "bad"]],
        chart: {
          type: "bars",
          scale,
          prefix: "£",
          suffix: "m",
          rows: [
            { label: "Reinsurer’s margin", total: H.fmtM(v.m), segs: [[v.m, "", "c2"]] },
            { label: "Value of capital released", total: H.fmtM(val), segs: [[val, "", "c1"]] }
          ]
        },
        insight
      };
    }
  };

  /* ---------------------------------------------------------------- m15 */
  X["mga-economics"] = {
    title: "An MGA’s break-even point",
    blurb: "Move the premium and watch fixed costs turn an MGA from loss to profit.",
    ask: "An MGA earns commission on premium and passes part of it to brokers, but its running costs are mostly fixed. Change the premium it writes, its commission, the brokers’ share and its costs.",
    inputs: [
      { k: "p", label: "Premium written", min: 5, max: 40, step: 1, value: 20, unit: "m" },
      { k: "c", label: "Total commission", min: 20, max: 35, step: 1, value: 25, unit: "pct" },
      { k: "b", label: "Of which, to brokers", min: 5, max: 15, step: 1, value: 10, unit: "pct" },
      { k: "cost", label: "Running costs", min: 1, max: 5, step: 0.1, value: 2.2, unit: "m" }
    ],
    compute(v, H) {
      const keep = (v.c - v.b) / 100;
      const profit = v.p * keep - v.cost;
      const be = v.cost / keep;
      const insight = `The MGA keeps ${v.c - v.b}% of premium: ${gbp(v.p * keep)} on ${H.fmtM(v.p)}. After ${gbp(v.cost)} of running costs, it makes **${gbp(profit)}**.\n\nIts break-even is about ${gbp(be)} of premium. ${profit < 0 ? "Below it, the MGA loses money even if every policy it writes is sound." : `Notice the leverage: a 20% fall in premium would cut profit by ${gbp(v.p * keep * 0.2)}, ${profit > 0 ? `${Math.round(((v.p * keep * 0.2) / profit) * 100)}% of it` : ""}, because the costs don’t fall with it.`}`;
      return {
        readouts: [["MGA keeps", gbp(v.p * keep)], ["Profit", gbp(profit), profit >= 0 ? "good" : "bad"], ["Break-even premium", gbp(be)]],
        chart: {
          type: "line",
          title: "MGA profit against premium",
          height: 200,
          x: { min: 0, max: 40, ticks: [0, 10, 20, 30, 40], prefix: "£", suffix: "m", title: "Premium written" },
          y: { min: -5, max: 10, ticks: [-5, 0, 5, 10], prefix: "£", suffix: "m", title: "MGA profit" },
          refs: [{ y: 0, label: "Break-even", align: "start" }],
          series: [{ name: "Profit", tone: "c1", points: [[0, -v.cost], [40, r2(40 * keep - v.cost)]] }],
          marks: [{ x: v.p, y: r2(profit), tone: "c2", label: gbp(profit), dx: 8, dy: -8 }]
        },
        insight
      };
    }
  };

  X["panel-withdrawal"] = {
    title: "Lose a carrier",
    blurb: "Take the largest carrier off the panel and see what happens to the MGA.",
    ask: "An MGA’s £20m book is written by a panel: A 40%, B 35%, C 25%. It keeps 18% commission and has £2.4m of fixed costs. Have Carrier A give notice, and see how much replacement capacity the MGA can find in time.",
    inputs: [
      { k: "out", label: "Carrier A gives notice?", min: 0, max: 1, step: 1, value: 1, show: (x) => (x ? "Yes" : "No") },
      { k: "rep", label: "Replacement capacity found", min: 0, max: 40, step: 5, value: 15, unit: "pct" }
    ],
    compute(v, H) {
      const cap = v.out ? 60 + Math.min(v.rep, 40) : 100;
      const prem = (20 * cap) / 100;
      const profit = 0.18 * prem - 2.4;
      const insight = !v.out
        ? `With the full panel the MGA writes its planned £20m and makes **${gbp(profit)}**. Now see what happens if its largest carrier leaves.`
        : `Carrier A’s 40% goes. ${v.rep ? `The MGA finds ${v.rep}% elsewhere, so it can write ${cap}% of its plan: ${gbp(prem)}.` : `Without a replacement, it can write only 60% of its plan: ${gbp(prem)}.`} Its fixed costs don’t shrink, so profit falls from £1.2m to **${gbp(profit)}**${profit < 0 ? ": a loss, from a book that was perfectly profitable" : ""}.\n\nThat is why dependence on one large carrier is so dangerous, and why the test of a structure is whether it survives losing its biggest backer.`;
      return {
        readouts: [["Premium written", gbp(prem)], ["MGA profit", gbp(profit), profit >= 0 ? "good" : "bad"]],
        chart: {
          type: "bars",
          scale: 100,
          suffix: "%",
          ticks: [0, 50, 100],
          rows: [{ label: "Before: the planned panel", total: "100%", segs: [[40, v.out ? "" : "A 40%", v.out ? "hatch" : "c1"], [35, "B 35%", "c2"], [25, "C 25%", "c3"]] },
            { label: "After renewal", total: `${cap}%`, segs: (v.out ? [[Math.min(v.rep, 40), v.rep >= 12 ? "New" : "", "c4"]] : [[40, "A", "c1"]]).concat([[35, "B", "c2"], [25, "C", "c3"]]) }],
          legend: [["c1", "Carrier A"], ["c2", "B"], ["c3", "C"], ["c4", "Replacement"]]
        },
        insight
      };
    }
  };

  X["two-views"] = {
    title: "Two views of one plan",
    blurb: "Miss the premium plan or the loss ratio and see who gets hurt.",
    ask: "The plan: £20m of premium, brokers 10%, MGA commission 18%, a 55% loss ratio, carrier expenses 5%, MGA costs £2.4m. Change premium against plan and the loss ratio, and compare the MGA’s result with the carrier’s.",
    inputs: [
      { k: "d", label: "Premium against plan", min: -30, max: 20, step: 5, value: 0, show: (x) => `${x > 0 ? "+" : x < 0 ? "−" : ""}${Math.abs(x)}%` },
      { k: "lr", label: "Loss ratio", min: 40, max: 75, step: 1, value: 55, unit: "pct" }
    ],
    presets: [
      { label: "On plan", v: { d: 0, lr: 55 } },
      { label: "Premium 20% short", v: { d: -20, lr: 55 } },
      { label: "Loss ratio +5", v: { d: 0, lr: 60 } }
    ],
    compute(v) {
      const P = 20 * (1 + v.d / 100);
      const mga = 0.18 * P - 2.4;
      const car = P * (1 - 0.1 - 0.18 - v.lr / 100 - 0.05);
      const insight = `On ${gbp(P)} of premium at a ${v.lr}% loss ratio, the MGA makes **${gbp(mga)}** and the carrier **${gbp(car)}**, against plans of £1.2m and £2.4m.\n\n${v.d < 0 ? `The premium shortfall hits the MGA hardest: its commission falls but its costs don’t. ` : ""}${v.lr > 55 ? `The worse loss ratio falls entirely on the carrier: the MGA’s result doesn’t move, except for any profit commission it loses. ` : ""}That asymmetry is why carriers insist on alignment, and why a plan should show both sensitivities.`;
      return {
        readouts: [["MGA result", gbp(mga), mga >= 0 ? "good" : "bad"], ["Carrier result", gbp(car), car >= 0 ? "good" : "bad"]],
        chart: {
          type: "waterfall",
          diverging: true,
          prefix: "£",
          suffix: "m",
          dp: 2,
          steps: [
            { label: "MGA, plan", value: 1.2 },
            { label: "MGA, actual", value: mga },
            { label: "Carrier, plan", value: 2.4 },
            { label: "Carrier, actual", value: car }
          ]
        },
        insight
      };
    }
  };

  X["profit-commission"] = {
    title: "Profit commission with a deficit",
    blurb: "Set three years of results and watch a deficit carry forward.",
    ask: "A binder pays the MGA a share of the carrier’s profit each underwriting year. Set each year’s profit or loss, the profit commission rate, and whether deficits are carried forward.",
    inputs: [
      { k: "y1", label: "Year 1 result", min: -2, max: 3, step: 0.1, value: 1, unit: "m" },
      { k: "y2", label: "Year 2 result", min: -2, max: 3, step: 0.1, value: -0.6, unit: "m" },
      { k: "y3", label: "Year 3 result", min: -2, max: 3, step: 0.1, value: 1.5, unit: "m" },
      { k: "rate", label: "Profit commission rate", min: 10, max: 30, step: 5, value: 20, unit: "pct" },
      { k: "dcf", label: "Deficit carried forward?", min: 0, max: 1, step: 1, value: 1, show: (x) => (x ? "Yes" : "No") }
    ],
    presets: [
      { label: "The textbook case", v: { y1: 1, y2: -0.6, y3: 1.5, rate: 20, dcf: 1 } },
      { label: "Two bad years", v: { y1: -1.2, y2: -0.8, y3: 1.5, rate: 20, dcf: 1 } }
    ],
    compute(v) {
      let def = 0;
      const ys = [v.y1, v.y2, v.y3];
      const pcs = ys.map((r) => {
        if (!v.dcf) return Math.max(0, r) * (v.rate / 100);
        if (r < 0) { def += -r; return 0; }
        const base = Math.max(0, r - def);
        def = Math.max(0, def - r);
        return base * (v.rate / 100);
      });
      const total = pcs.reduce((a, b) => a + b, 0);
      const noDcf = ys.reduce((a, r) => a + Math.max(0, r) * (v.rate / 100), 0);
      let insight = `Total profit commission over three years: **${gbp(total)}**.`;
      insight += v.dcf
        ? ` ${ys.some((r) => r < 0) ? `Each loss had to be earned back from later profits before more profit commission was paid. Without the deficit clause the MGA would have received ${gbp(noDcf)}, being rewarded for a good year straight after a bad one.` : "No year lost money, so the deficit clause never bit."}`
        : ` Without a deficit clause, a loss year simply pays nothing and is then forgotten, so the MGA is rewarded for the good years without paying back the bad. Switch the clause on and compare.`;
      return {
        readouts: [["Year 1", gbp(pcs[0])], ["Year 2", gbp(pcs[1])], ["Year 3", gbp(pcs[2])], ["Total", gbp(total), "c1"]],
        chart: {
          type: "waterfall",
          diverging: true,
          prefix: "£",
          suffix: "m",
          dp: 1,
          steps: [
            { label: "Year 1 result", value: v.y1, note: `Profit commission ${gbp(pcs[0])}` },
            { label: "Year 2 result", value: v.y2, note: `Profit commission ${gbp(pcs[1])}` },
            { label: "Year 3 result", value: v.y3, note: `Profit commission ${gbp(pcs[2])}` }
          ]
        },
        insight
      };
    }
  };

  X["commission-choice"] = {
    title: "Flat commission or profit commission?",
    blurb: "Move the loss ratio and see which pay deal is better for the MGA, and for the carrier.",
    ask: "On £10m of premium an MGA can choose 28% flat commission, or 23% plus 25% profit commission (after a 5% carrier allowance). Move the loss ratio and compare the MGA’s income under each.",
    inputs: [
      { k: "lr", label: "Loss ratio", min: 30, max: 80, step: 1, value: 50, unit: "pct" }
    ],
    presets: [
      { label: "Good year", v: { lr: 40 } },
      { label: "As planned", v: { lr: 50 } },
      { label: "Bad year", v: { lr: 70 } }
    ],
    compute(v) {
      const flat = 2.8;
      const prof = Math.max(0, 10 - 2.3 - v.lr / 10 - 0.5);
      const withPc = 2.3 + 0.25 * prof;
      const carFlat = 10 - 2.8 - v.lr / 10 - 0.5;
      const carPc = 10 - 2.3 - v.lr / 10 - 0.5 - 0.25 * prof;
      const pts = (f) => [30, 40, 52, 60, 72, 80].map((x) => [x, r2(f(x))]);
      const pcAt = (x) => 2.3 + 0.25 * Math.max(0, 7.2 - x / 10);
      const insight = `At a ${v.lr}% loss ratio the flat deal pays the MGA ${gbp(flat)}, and the profit commission deal **${gbp(withPc)}**. ${withPc > flat + 0.005 ? "Good results make the profit-linked deal better for the MGA." : withPc < flat - 0.005 ? "With poor results, the profit-linked deal pays less: the MGA shares the pain." : "They are about equal here."}\n\nThe crossover is a loss ratio of about 52%. Under the profit-linked deal the MGA gains when the carrier gains and loses when it loses. That is what alignment means in practice, and why confident MGAs often prefer it.`;
      return {
        readouts: [["Flat 28%", gbp(flat)], ["23% plus PC", gbp(withPc), withPc >= flat ? "good" : "bad"], ["Carrier, with PC", gbp(carPc), carPc >= 0 ? "" : "bad"]],
        chart: {
          type: "line",
          title: "MGA income by loss ratio",
          height: 200,
          x: { min: 30, max: 80, ticks: [30, 40, 50, 60, 70, 80], suffix: "%", title: "Loss ratio" },
          y: { min: 2, max: 3.6, ticks: [2, 2.5, 3, 3.5], prefix: "£", suffix: "m", title: "MGA income" },
          series: [
            { name: "Flat 28%", tone: "c2", dash: true, points: pts(() => flat) },
            { name: "23% plus profit commission", tone: "c1", points: pts(pcAt) }
          ],
          marks: [{ x: v.lr, y: r2(withPc), tone: "c1" }, { x: v.lr, y: flat, tone: "c2" }],
          refs: [{ x: v.lr, label: "Now" }]
        },
        insight: insight + (carFlat !== carPc ? "" : "")
      };
    }
  };

  X["carrier-limits"] = {
    title: "The tightest limit governs",
    blurb: "Give two carriers different zone limits and find the panel’s ceiling.",
    ask: "A two-carrier panel writes flood-zone business. Each carrier sets a limit on its own share of the exposure. Change the shares and the limits, and find the most the whole panel can write.",
    inputs: [
      { k: "a", label: "Carrier A’s share", min: 30, max: 80, step: 5, value: 60, unit: "pct" },
      { k: "la", label: "A’s limit for its share", min: 10, max: 60, step: 2, value: 30, unit: "m" },
      { k: "lb", label: "B’s limit for its share", min: 10, max: 60, step: 2, value: 24, unit: "m" }
    ],
    compute(v, H) {
      const b = 100 - v.a;
      const pa = v.la / (v.a / 100), pb = v.lb / (b / 100);
      const max = Math.min(pa, pb);
      const who = pa <= pb ? "A" : "B";
      const insight = `Carrier A’s limit allows the panel ${H.fmtM(pa)} (£${v.la}m ÷ ${v.a}%); Carrier B’s allows ${H.fmtM(pb)} (£${v.lb}m ÷ ${b}%). The **tighter one governs**: the panel can write no more than **${H.fmtM(max)}** in the zone, set by Carrier ${who}.\n\nNotice that a carrier with a big share and a modest limit often binds first. The MGA must track every limit for every carrier, every month.`;
      return {
        readouts: [["Panel maximum", H.fmtM(max), "c1"], ["Set by", `Carrier ${who}`]],
        chart: {
          type: "bars",
          scale: Math.max(pa, pb) * 1.15,
          prefix: "£",
          suffix: "m",
          mark: [max, `Panel maximum ${H.fmtM(max)}`],
          rows: [
            { label: `Allowed by A (${v.a}% share)`, total: H.fmtM(pa), segs: [[pa, "", who === "A" ? "c2" : "c1"]] },
            { label: `Allowed by B (${b}% share)`, total: H.fmtM(pb), segs: [[pb, "", who === "B" ? "c2" : "c1"]] }
          ]
        },
        insight
      };
    }
  };

  /* ---------------------------------------------------------------- m11 */
  X.rekeying = {
    title: "Enter it once",
    blurb: "Re-key the same contract data several times and count the errors.",
    ask: "Each time someone types a contract’s details into another system, there’s a small chance of a mistake. Change how many times the data is re-keyed and the error rate, and compare with entering it once.",
    inputs: [
      { k: "k", label: "Times the same data is typed", min: 1, max: 6, step: 1, value: 4 },
      { k: "e", label: "Chance of an error each time", min: 0.5, max: 5, step: 0.5, value: 2, unit: "pct" }
    ],
    compute(v) {
      const p = 1 - Math.pow(1 - v.e / 100, v.k);
      const once = v.e / 100;
      const n = 10000;
      const insight = `Typed ${v.k} time${v.k === 1 ? "" : "s"} at a ${pc(v.e)} error rate, **${r1(p * 100)}% of contracts** end up with at least one mistake: about ${Math.round(p * n).toLocaleString("en-GB")} in every 10,000. Entered once and reused, as the Core Data Record intends, it would be ${Math.round(once * n).toLocaleString("en-GB")}.\n\nEvery error means a query, a delay in paying premium or a claim, and staff time to fix it. That is where the cost of re-keying really lies.`;
      return {
        readouts: [["Contracts with an error", `${r1(p * 100)}%`, p > once * 1.5 ? "bad" : ""], ["If entered once", `${r1(once * 100)}%`, "good"]],
        chart: {
          type: "bars",
          scale: 30,
          suffix: "%",
          ticks: [0, 10, 20, 30],
          rows: [
            { label: `Re-keyed ${v.k} times`, total: `${Math.round(p * n).toLocaleString("en-GB")} in 10,000`, segs: [[Math.min(30, p * 100), "", "c2"]] },
            { label: "Entered once", total: `${Math.round(once * n).toLocaleString("en-GB")} in 10,000`, segs: [[once * 100, "", "c1"]] }
          ]
        },
        insight
      };
    }
  };

  X["climate-cost"] = {
    title: "A changing climate and the price of cover",
    blurb: "Make catastrophes more frequent and severe, and see what rates must do to keep up.",
    ask: "A property book earns £100m of premium, with a £20m catastrophe load, £45m of other claims and 30% expenses: a 95% combined ratio. Make catastrophes more frequent and more severe, and set the rate rise the market achieves.",
    inputs: [
      { k: "f", label: "More frequent catastrophes", min: 0, max: 50, step: 5, value: 20, show: (x) => `+${x}%` },
      { k: "s", label: "More severe catastrophes", min: 0, max: 30, step: 5, value: 10, show: (x) => `+${x}%` },
      { k: "r", label: "Rate rise achieved", min: 0, max: 40, step: 1, value: 5, show: (x) => `+${x}%` }
    ],
    compute(v, H) {
      const aal = 20 * (1 + v.f / 100) * (1 + v.s / 100);
      const P = 100 * (1 + v.r / 100);
      const cor = ((45 + aal) / P + 0.3) * 100;
      const need = ((45 + aal) / 0.65 / 100 - 1) * 100;
      const insight = `The catastrophe load rises from £20m to **${gbp(aal)}**. To hold a 95% combined ratio, rates would need to rise about **${r1(need)}%**. With ${v.r}% achieved, the combined ratio is ${r1(cor)}%.\n\n${v.r < need - 0.5 ? "Prices are lagging the risk: insurers either lose money or pull back capacity. And if prices do catch up, some clients can no longer afford cover, which widens the protection gap. That squeeze is the market’s climate dilemma." : "Prices have kept up with the risk, but notice the cost: clients are paying much more for the same cover, and some will buy less of it, widening the protection gap."}`;
      return {
        readouts: [["Catastrophe load", gbp(aal)], ["Rate rise needed", `+${r1(need)}%`], ["Combined ratio", `${r1(cor)}%`, cor > 100 ? "bad" : cor <= 95.5 ? "good" : ""]],
        chart: {
          type: "bars",
          scale: 140,
          prefix: "£",
          suffix: "m",
          mark: [P, `Premium ${gbp(P)}`],
          rows: [
            { label: "Costs before", total: "£95m", segs: [[45, "Claims", "c1"], [20, "Cat", "c2"], [30, "Expenses", "neutral"]] },
            { label: "Costs now", total: gbp(45 + aal + 0.3 * P), segs: [[45, "Claims", "c1"], [aal, "Cat", "c2"], [0.3 * P, "Expenses", "neutral"]] }
          ],
          legend: [["c1", "Other claims"], ["c2", "Catastrophe load"], ["neutral", "Expenses"]]
        },
        insight
      };
    }
  };

  window.SLIP_DATA.explore = Object.assign(window.SLIP_DATA.explore || {}, X);
})();
