/* The Slip — Inside Lloyd’s */
window.SLIP_DATA = window.SLIP_DATA || {};
(window.SLIP_DATA.modules = window.SLIP_DATA.modules || []).push({
  id: "m03",
  title: "Inside Lloyd’s",
  short: "Lloyd’s",
  blurb: "Capacity and capital, the chain of security, the three-year life of a year of account, and the crisis that reshaped the market.",
  outcomes: [
    "Explain syndicate capacity and how members support it with Funds at Lloyd’s.",
    "Describe the three links of the Lloyd’s chain of security.",
    "Explain the year of account and how a year is closed by reinsurance to close.",
    "Describe the causes of the crisis of the 1990s and the reforms that followed it."
  ],
  lessons: [
    {
      title: "Capacity and capital",
      minutes: 6,
      keys: ["Capacity", "Funds at Lloyd’s", "35% uplift", "Business plans"],
      intro: "Before a syndicate writes a single risk, two numbers must be agreed: how much premium it may accept, and how much capital its members must lodge to back it. This diagram shows how the two are linked, and why a riskier plan needs more capital for every pound of premium.",
      diagram: {
        cols: 2,
        gapX: 70,
        nodes: [
          {
            id: "review", at: [1, 1], tone: "ink", label: "Lloyd’s review", sub: "Challenge, cut or approve",
            teach: "Every year Lloyd’s reviews each syndicate’s business plan: which classes it will write, at what rates, with what reinsurance and what expected loss ratio. Plans can be challenged, cut back or, in extreme cases, rejected.\n\nWhy is the market so involved in one syndicate’s plans? Because every syndicate shares the Lloyd’s brand and Central Fund. One reckless plan puts everyone’s capital at risk, as the next lesson shows."
          },
          {
            id: "plan", at: [1, 2], label: "Business plan", sub: "Premium, rates, claims, reinsurance",
            teach: "The business plan is the syndicate’s promise for the year ahead: the premium it expects in each class, the rates it expects to achieve, the claims it expects to pay and the reinsurance it will buy.\n\nEverything else on this diagram flows from it. You will build plans yourself in Module 12."
          },
          {
            id: "capacity", at: [2, 1], label: "Capacity", sub: "Premium limit for the year",
            teach: "**Capacity** is the maximum premium a syndicate may accept in a year of account, measured net of brokerage and other acquisition costs. Lloyd’s approves it as part of the plan, and it reflects what the members have committed.\n\nNotice that it is a limit on premium, not on the size of any one risk. A syndicate with £500m of capacity can’t write £600m of premium, however attractive the business looks.",
            like: "Capacity is like the limit on a credit card, and Funds at Lloyd’s are the deposit you lodge to get it. The riskier the things you plan to buy, the bigger the deposit Lloyd’s asks for."
          },
          {
            id: "scr", at: [2, 2], label: "Capital requirement", sub: "Solvency II model",
            teach: "Each syndicate calculates how much capital its plan needs under **Solvency II**: enough to survive a 1-in-200-year bad outcome over the coming year, using a model that Lloyd’s reviews.\n\nThree things push the number up: riskier classes, bigger catastrophe exposures and thinner reinsurance. Keep those three levers in mind; you can pull them in the model."
          },
          {
            id: "uplift", at: [3, 2], tone: "brass", label: "35% uplift", sub: "Lloyd’s buffer",
            teach: "Lloyd’s then adds an **uplift of 35%** to the syndicate’s requirement to set the capital members must actually provide. This is a deliberate buffer above the regulatory minimum.\n\nIt protects the shared Central Fund and the market’s single rating: the stronger each syndicate’s own capital, the less likely anyone ever needs the shared fund."
          },
          {
            id: "fal", at: [4, 1], span: 2, tone: "tint", label: "Funds at Lloyd’s", sub: "The capital members lodge",
            teach: "**Funds at Lloyd’s** (FAL) is the capital each member lodges with Lloyd’s to support its share of a syndicate’s underwriting: cash, investments or letters of credit, held in trust.\n\nThis is the second link in the chain of security. If a syndicate’s own premiums and reserves run out, members’ FAL is what pays the claims next."
          },
          {
            id: "members", at: [5, 1], span: 2, label: "Members", sub: "Mostly corporate today",
            teach: "Most capacity now comes from **corporate members**: insurance groups backing their own syndicates, and specialist investment vehicles. Individuals still take part, but no new members with unlimited liability have been admitted since 2003, and individuals now usually take part through limited liability vehicles."
          }
        ],
        edges: [
          { from: "review", to: "plan", label: "challenges", teach: "Lloyd’s tests the plan’s assumptions, especially rates and loss ratios, before approving it." },
          { from: "plan", to: "capacity", label: "sets", fromSide: "b", fromAt: 0.25, toSide: "t", toAt: 0.75, teach: "The approved premium becomes the syndicate’s capacity for the year." },
          { from: "plan", to: "scr", label: "drives", teach: "The mix of business drives the capital requirement: a catastrophe-heavy plan needs far more capital than a plan of small, steady risks." },
          { from: "scr", to: "uplift", label: "+35%", teach: "The syndicate’s own requirement is increased by 35% to set the members’ capital." },
          { from: "uplift", to: "fal", label: "sizes", fromSide: "b", toSide: "t", toAt: 0.75, teach: "The uplifted figure is the capital members must lodge as Funds at Lloyd’s." },
          { from: "capacity", to: "fal", label: "backed by", fromSide: "b", toSide: "t", toAt: 0.25, teach: "Every pound of capacity must be backed by members’ capital. The ratio isn’t fixed: it depends on how risky the plan is." },
          { from: "members", to: "fal", label: "lodge", teach: "Members lodge their funds with Lloyd’s in trust, where they stay committed to the syndicates they support." }
        ]
      },
      explore: "fal",
      think: { q: "Two syndicates each have £400m of capacity. One writes UK professional indemnity, the other US property catastrophe reinsurance. Which needs more Funds at Lloyd’s, and why?", a: "The catastrophe reinsurer, by a wide margin. A single hurricane could cost it several years of premium, so its 1-in-200 outcome is far worse relative to its premium. The professional indemnity book is spread across many independent risks, so its bad years are milder." },
      takeaways: [
        "Capacity is the premium, net of acquisition costs, that a syndicate may accept in a year.",
        "Members support capacity with Funds at Lloyd’s, set from the Solvency II requirement plus a 35% uplift.",
        "Riskier plans need more capital per pound of premium; reinsurance reduces it.",
        "Lloyd’s reviews and approves every syndicate’s business plan each year."
      ]
    },
    {
      title: "The chain of security",
      minutes: 5,
      keys: ["Syndicate assets", "Members’ funds", "Central Fund", "One market rating"],
      intro: "Why should a client in Argentina trust a syndicate it has never heard of? Because behind every valid Lloyd’s claim stand three links of assets, one after another. Follow a claim down the chain, and notice that the last link is shared by everyone.",
      diagram: {
        cols: 2,
        gap: 36,
        nodes: [
          {
            id: "claim", at: [1, 1], span: 2, tone: "ink", label: "A valid claim", sub: "The policyholder must be paid",
            teach: "Start with the promise. A policyholder has a valid claim against the syndicates on its slip, and it expects to be paid in full, whoever the members are and however the syndicate has fared that year."
          },
          {
            id: "ptf", at: [2, 1], span: 2, label: "1. Syndicate assets", sub: "Premium trust funds",
            teach: "Claims are paid first from the syndicate’s own assets: premiums and reserves held in **premium trust funds**, ring-fenced for policyholders.\n\nIn an ordinary year this first link pays every claim. The other two links exist for the years that aren’t ordinary."
          },
          {
            id: "fal", at: [3, 1], span: 2, label: "2. Members’ funds", sub: "Funds at Lloyd’s",
            teach: "If a syndicate’s own funds aren’t enough, each member’s **Funds at Lloyd’s** are drawn on to meet its share of the loss.\n\nThis is why FAL is sized so carefully, with the 35% uplift: it is the capital that absorbs a genuinely bad year."
          },
          {
            id: "central", at: [4, 1], span: 2, tone: "tint", label: "3. Central assets", sub: "The Central Fund, shared by all",
            teach: "If a member can’t meet its obligations even from its FAL, the **central assets** step in, chiefly the **Central Fund**. Every member pays into it each year in proportion to the premium it writes. It was drawn on heavily in the 1990s to meet the debts of members who couldn’t pay.",
            like: "Picture a trapeze act with three safety nets, one below another. Most falls are caught by the first. A very bad fall might break through to the second. The third, shared by every act in the circus, is there for the worst case of all."
          },
          {
            id: "rating", at: [5, 1], tone: "good", label: "One market rating", sub: "Every syndicate shares it",
            teach: "Because the third link is shared, Lloyd’s carries a single financial strength rating for the whole market. A client buying from any syndicate gets that rating.\n\nThis is a big part of why small specialist syndicates can compete with global insurers for the same clients."
          },
          {
            id: "discipline", at: [5, 2], tone: "brass", label: "Everyone polices everyone", sub: "Shared risk, shared interest",
            teach: "The flip side of sharing is that one syndicate’s failure could cost every other member through the Central Fund. So each member has a stake in every other member’s underwriting.\n\nThat explains why Lloyd’s supervises business plans and performance so closely: it is protecting the shared link."
          }
        ],
        edges: [
          { from: "claim", to: "ptf", label: "paid first", teach: "Every claim starts at the syndicate’s own premium trust funds." },
          { from: "ptf", to: "fal", label: "if short", teach: "Only if the syndicate’s funds run short does the claim reach members’ capital, with each member paying its share." },
          { from: "fal", to: "central", label: "if a member fails", teach: "Only if a member can’t pay does the claim reach the central assets." },
          { from: "central", to: "rating", label: "supports", teach: "The shared fund underpins one rating for the whole market." },
          { from: "central", to: "discipline", label: "demands", teach: "Shared losses create a shared interest in good underwriting, and so in strict oversight." }
        ]
      },
      explore: "chain",
      think: { q: "Why does a mutual Central Fund encourage Lloyd’s to oversee syndicates closely?", a: "If one syndicate’s members can’t meet their losses, the Central Fund, built from every member’s contributions, may have to pay. Poor underwriting by one syndicate can therefore cost all the others, so the market has a collective interest in each syndicate’s discipline." },
      takeaways: [
        "Claims are met first from syndicate assets, then from members’ Funds at Lloyd’s, then from central assets.",
        "The shared Central Fund allows Lloyd’s to carry a single market-wide rating.",
        "Every member has a stake in the quality of every other member’s underwriting."
      ]
    },
    {
      title: "Years of account and reinsurance to close",
      minutes: 6,
      keys: ["Year of account", "Three-year close", "RITC", "Run-off"],
      intro: "Here is the puzzle. Claims can take years to arrive, but members want to know their result. Lloyd’s solves it by giving each year of business a three-year life and then handing its leftover claims to the next year, for a price. Follow the 2024 year of account from birth to close.",
      diagram: {
        cols: 2,
        gapX: 72,
        nodes: [
          {
            id: "incept", at: [1, 1], tone: "ink", label: "2024 policies incept", sub: "All belong to the 2024 year",
            teach: "Each syndicate is legally an **annual venture**. Members join for a particular **year of account**, and every policy that incepts during 2024 belongs to the 2024 year, however long its claims take to emerge.\n\nA policy that starts on 30 December 2024 is still a 2024 policy, even though almost all of its cover falls in 2025."
          },
          {
            id: "develop", at: [2, 1], label: "Years two and three", sub: "Claims emerge and develop",
            teach: "A year of account normally stays open for three years. Year one writes the policies; years two and three see claims reported, investigated and paid.\n\nSome liability claims keep arriving for decades, but by the end of year three the picture is usually clear enough to estimate what is left."
          },
          {
            id: "estimate", at: [3, 1], label: "Estimate what’s left", sub: "Reported claims and IBNR",
            teach: "At the end of year three, actuaries estimate the remaining liabilities: claims reported but not yet paid, plus claims **incurred but not reported** (IBNR).\n\nThis estimate is the price of closing the year, so it matters who it is fair to. Too low, and the next year inherits a loss. Too high, and the closing members are short-changed."
          },
          {
            id: "runoff", at: [3, 2], tone: "bad", label: "Run-off", sub: "If it can’t be priced",
            teach: "If the remaining liabilities are too uncertain to price, perhaps because of a long legal dispute, the year stays open in **run-off** until it can be closed.\n\nRun-off ties up members’ capital and delays their result, so it is unwelcome. Specialist run-off buyers sometimes provide the RITC instead."
          },
          {
            id: "ritc", at: [4, 1], tone: "brass", label: "Reinsurance to close", sub: "A premium to the next year",
            teach: "**Reinsurance to close** (RITC) is a premium paid by the closing year to the next year of account, or to another syndicate, in return for taking on all its remaining liabilities.\n\nSuppose the actuaries put the 2024 year’s remaining claims at £40m. The 2024 year pays the 2025 year an RITC premium of £40m, and any future 2024 claims become the 2025 year’s problem.",
            like: "It’s like the handover in a relay race. The 2024 runners carry the baton, the unsettled claims, as far as they can, pass it to the 2025 team with enough provision to finish the race, and leave the track with their result."
          },
          {
            id: "next", at: [4, 2], label: "2025 year of account", sub: "Takes on the old claims",
            teach: "The 2025 year accepts the 2024 liabilities together with the premium. Its members, who may differ from 2024’s, are now responsible for any future claims on 2024 policies.\n\nThat is why the price has to be fair to both sides: two different groups of members are on either side of the deal."
          },
          {
            id: "result", at: [5, 1], tone: "good", label: "2024 closes", sub: "Members get their result",
            teach: "Once the RITC is paid, the 2024 year is closed, and its members receive their profit or meet their loss.\n\nThis is why London practitioners describe results by year of account rather than by calendar year: a year’s true result isn’t known until it closes."
          }
        ],
        edges: [
          { from: "incept", to: "develop", label: "stays open", teach: "The year stays open while its claims develop." },
          { from: "develop", to: "estimate", label: "end of year 3", teach: "At the end of the third year the closing calculation begins." },
          { from: "estimate", to: "runoff", label: "too unsure", teach: "If the estimate can’t be made reliably, the year stays open in run-off." },
          { from: "estimate", to: "ritc", label: "prices", teach: "A reliable estimate becomes the RITC premium." },
          { from: "ritc", to: "next", label: "transfers", teach: "The liabilities and the premium pass to the next year of account." },
          { from: "ritc", to: "result", label: "then", teach: "With the liabilities passed on, the closing year’s result is final." }
        ]
      },
      explore: "ritc",
      think: { q: "A syndicate’s 2024 year closes with an RITC that later proves 20% too low. Who loses, and why might that be unfair?", a: "The members of the 2025 year, who accepted the old liabilities for too little premium. The 2024 members walked away with a better result than they had really earned. Where the membership of the two years differs, one group has effectively subsidised the other, which is why RITC pricing is scrutinised closely." },
      takeaways: [
        "Each policy belongs to the year of account in which it incepts.",
        "A year of account normally closes after three years by reinsurance to close.",
        "The RITC price must be fair to both the closing and the receiving members.",
        "A year that cannot be priced stays open in run-off."
      ]
    },
    {
      title: "The crisis of the 1990s",
      minutes: 7,
      keys: ["Names", "Unlimited liability", "LMX spiral", "Equitas"],
      intro: "In the late 1980s and early 1990s, Lloyd’s came close to collapse. No single cause did it. Trace the causes at the top as they flow into the people who bore the losses, and then follow the reforms that rebuilt the market.",
      diagram: {
        cols: 2,
        gap: 38,
        nodes: [
          {
            id: "asbestos", at: [1, 1], label: "Asbestos and pollution", sub: "Old US claims surface",
            teach: "Enormous, long-hidden liability claims emerged in the United States for **asbestos** and **pollution**, much of it on policies written decades earlier.\n\nThis is the danger of long-tail business in its purest form: the premium was collected and spent long before anyone knew the true cost."
          },
          {
            id: "cats", at: [1, 2], label: "Catastrophes", sub: "Piper Alpha, Exxon Valdez, Hugo",
            teach: "A run of catastrophes followed: the Piper Alpha platform disaster in 1988, then the Exxon Valdez oil spill and Hurricane Hugo in 1989. Each produced very large losses for London’s marine, energy and property underwriters, and for their reinsurers."
          },
          {
            id: "spiral", at: [2, 2], tone: "bad", label: "The LMX spiral", sub: "Losses passed round and round",
            teach: "London syndicates had been buying excess of loss reinsurance from one another, who bought it from others, and so on. When the catastrophes hit, the same losses circled the market several times. It looked like risk was being spread; really it was being passed around a closed room, and it ended up concentrated on the syndicates whose own reinsurance ran out first.",
            like: "It was pass the parcel with a bomb inside. Each syndicate passed its large losses to another, which passed them on again, until the same loss had circled the room several times. When the music stopped, the losses landed on whoever was holding the parcel."
          },
          {
            id: "names", at: [3, 1], span: 2, tone: "ink", label: "Names with unlimited liability", sub: "Over 30,000 individuals",
            teach: "For most of its history Lloyd’s capital came from wealthy individuals called **Names**, who backed syndicates with **unlimited liability**: they were liable for their share of losses to the full extent of their personal wealth.\n\nLosses for the years 1988 to 1992 ran into billions of pounds. Many Names were ruined, and there was widespread litigation against the managing agents who had run their syndicates."
          },
          {
            id: "corporate", at: [4, 1], tone: "good", label: "Corporate capital", sub: "Admitted from 1994",
            teach: "From 1994, companies were allowed to become members of Lloyd’s with limited liability. Corporate capital rapidly became the main source of funding, and today it provides most of the market’s capacity.\n\nNotice the shift: from individuals risking everything they owned to professional investors risking a defined amount."
          },
          {
            id: "rnr", at: [4, 2], label: "Reconstruction and Renewal", sub: "The 1996 settlement",
            teach: "In 1996 the **Reconstruction and Renewal** plan settled the disputes between Names, managing agents and Lloyd’s, with a large settlement offer to Names who agreed to drop their litigation.\n\nIts central idea was to draw a line between the market’s past and its future."
          },
          {
            id: "reformed", at: [5, 1], label: "A reformed market", sub: "Stronger chain, closer oversight",
            teach: "The crisis transformed Lloyd’s. The chain of security was strengthened, central oversight of syndicates became far more rigorous, and the way capital is set and business plans are reviewed today owes a great deal to these lessons."
          },
          {
            id: "equitas", at: [5, 2], tone: "brass", label: "Equitas", sub: "Takes the old liabilities",
            teach: "**Equitas** was created to reinsure all the 1992 and earlier non-life liabilities of Lloyd’s Names, separating the old problems from the new market. In 2007 Berkshire Hathaway’s National Indemnity took over Equitas’s liabilities through reinsurance.\n\nYou can see reinsurance to close at work here on a grand scale: a whole decade of liabilities handed over for a price."
          }
        ],
        edges: [
          { from: "asbestos", to: "names", label: "long-tail claims", fromSide: "b", toSide: "t", toAt: 0.25, teach: "Old liability claims fell on the Names who backed the syndicates that had written those policies, or that reinsured them." },
          { from: "cats", to: "spiral", label: "excess losses", teach: "The catastrophe losses flowed into the excess of loss reinsurance that London syndicates had sold one another." },
          { from: "spiral", to: "names", label: "concentrated", fromSide: "b", toSide: "t", toAt: 0.75, teach: "The spiral concentrated losses on a few syndicates, and so on their Names." },
          { from: "names", to: "corporate", label: "replaced by", fromSide: "b", fromAt: 0.25, teach: "Unlimited personal liability gave way to corporate members with limited liability." },
          { from: "names", to: "rnr", label: "settled by", fromSide: "b", fromAt: 0.75, teach: "The litigation was settled through Reconstruction and Renewal in 1996." },
          { from: "corporate", to: "reformed", label: "funds", teach: "Professional capital funds the modern market, under stricter rules." },
          { from: "rnr", to: "equitas", label: "creates", teach: "The settlement created Equitas to take on the old liabilities." }
        ]
      },
      explore: "spiral",
      takeaways: [
        "Names with unlimited liability once provided most of the capital at Lloyd’s.",
        "Asbestos, pollution, catastrophes and the LMX spiral caused huge losses between 1988 and 1992.",
        "Corporate capital was admitted from 1994, and Reconstruction and Renewal in 1996 created Equitas."
      ]
    }
  ],
  quiz: [
    {
      q: "What is a syndicate’s capacity?",
      options: [
        "The largest sum insured it may accept on any one risk",
        "The maximum premium, net of acquisition costs, it may accept in a year of account",
        "The total of the claims it can pay",
        "The number of underwriters it employs"
      ],
      answer: 1,
      why: "Capacity limits premium income, and members must support it with capital."
    },
    {
      q: "In the chain of security, which assets are used first to pay a valid claim?",
      options: ["The Central Fund", "Members’ Funds at Lloyd’s", "Syndicate premium trust funds", "The Bank of England"],
      answer: 2,
      why: "Syndicate assets are used first, then members’ Funds at Lloyd’s, then central assets."
    },
    {
      q: "A policy incepts on 1 March 2025. To which year of account does it belong?",
      options: ["2025", "2026", "2027", "Whichever year is open when a claim arrives"],
      answer: 0,
      why: "Policies belong to the year of account in which they incept."
    },
    {
      q: "What does reinsurance to close achieve?",
      options: [
        "It closes a syndicate permanently",
        "It transfers a year of account’s remaining liabilities to a later year or another syndicate, for a premium",
        "It cancels policies that have had no claims",
        "It reinsures the Central Fund"
      ],
      answer: 1,
      why: "RITC allows a year of account to close, so that its members can receive their result."
    },
    {
      q: "What was the LMX spiral?",
      options: [
        "A pricing model for marine risks",
        "Excess of loss reinsurance passed repeatedly among London syndicates, which concentrated losses",
        "The design of the 1986 Lloyd’s building",
        "A method of signing down lines"
      ],
      answer: 1,
      why: "The same losses circled the market several times and ended up concentrated on a small number of syndicates."
    },
    {
      q: "Which company was created in 1996 to reinsure the 1992 and earlier liabilities of Lloyd’s Names?",
      options: ["Equitas", "Velonetic", "Pool Re", "Lloyd’s Insurance Company"],
      answer: 0,
      why: "Equitas separated the old liabilities from the market as part of Reconstruction and Renewal."
    },
    {
      q: "What uplift does Lloyd’s apply to a syndicate’s Solvency II capital requirement when setting members’ capital?",
      options: ["10%", "20%", "35%", "100%"],
      answer: 2,
      why: "The 35% uplift gives Lloyd’s an additional buffer above the regulatory minimum."
    }
  ]
});
