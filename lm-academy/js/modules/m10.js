/* The Slip — The numbers */
window.SLIP_DATA = window.SLIP_DATA || {};
(window.SLIP_DATA.modules = window.SLIP_DATA.modules || []).push({
  id: "m10",
  title: "The numbers",
  short: "Numbers",
  blurb: "Written and earned premium, the combined ratio, the underwriting cycle and the capital rules that keep insurers solvent.",
  outcomes: [
    "Distinguish gross and net, written and earned premium, and explain unearned premium.",
    "Calculate loss, expense and combined ratios, and explain the role of investment income.",
    "Describe the underwriting cycle and what drives it.",
    "Explain the Solvency Capital Requirement and the solvency ratio."
  ],
  lessons: [
    {
      title: "Premium: written, earned, gross and net",
      minutes: 6,
      keys: ["Written premium", "Earned premium", "Gross and net", "Unearned premium"],
      intro: "Premium is measured in several ways, and confusing them is the commonest mistake in reading an insurer’s numbers. Follow a year’s premium from the top: first reinsurance takes a slice, then time decides how much has actually been earned.",
      diagram: {
        cols: 2,
        gapX: 64,
        nodes: [
          {
            id: "gwp", at: [1, 1], span: 2, tone: "ink", label: "Gross written premium", sub: "Everything written, before reinsurance",
            teach: "**Gross written premium** (GWP) is the total premium on policies written during a period, before any reinsurance. It measures the size of the business, which is why it is the headline figure in most plans."
          },
          {
            id: "ri", at: [2, 1], label: "Reinsurance premium", sub: "Paid to reinsurers",
            teach: "Part of the gross premium is passed to reinsurers in return for their protection, as you saw in Module 09."
          },
          {
            id: "nwp", at: [2, 2], label: "Net written premium", sub: "GWP less reinsurance",
            teach: "**Net written premium** (NWP) is gross written premium less the premium paid to reinsurers: the premium the insurer keeps for the risk it keeps."
          },
          {
            id: "time", at: [3, 1], span: 2, tone: "q", label: "Time passes", sub: "Cover is given day by day",
            teach: "Written premium is collected for cover that hasn’t yet been provided. An insurer only **earns** it as the policy period runs.",
            like: "Premium is like a gym membership paid in advance. On day one the gym has your money, but it hasn’t earned it until it has given you the months of access. Each month, a twelfth moves from owed to earned."
          },
          {
            id: "earned", at: [4, 1], tone: "good", label: "Earned premium", sub: "Cover already given",
            teach: "**Earned premium** is the part that relates to cover already provided. A twelve-month policy incepting on 1 October for £120,000 has earned £30,000 by 31 December: three months out of twelve."
          },
          {
            id: "unearned", at: [4, 2], tone: "bad", label: "Unearned premium", sub: "A liability: cover still owed",
            teach: "**Unearned premium** is premium received for cover still to be provided: the other £90,000 in our example. It sits on the balance sheet as a **liability**, because if the policy were cancelled, much of it would have to be returned."
          },
          {
            id: "ratios", at: [5, 1], label: "Results use earned", sub: "Claims ÷ earned premium",
            teach: "Ratios are measured against earned premium, because that’s the premium matching the claims that have happened. Use written premium instead and a fast-growing insurer looks better than it really is: the premium has arrived, the claims haven’t yet."
          },
          {
            id: "uneven", at: [5, 2], label: "Not always even", sub: "Hurricane season, construction",
            teach: "Not every policy earns evenly. Hurricane cover written in January earns more of its premium during the autumn hurricane season, when the risk is concentrated, and a construction project’s premium is earned as the project grows in value. The model lets you compare."
          }
        ],
        edges: [
          { from: "gwp", to: "ri", label: "less", teach: "Reinsurance premium is deducted from the gross." },
          { from: "ri", to: "nwp", label: "leaves", teach: "What remains is net written premium." },
          { from: "nwp", to: "time", label: "earned over", teach: "Written premium is earned over the period of cover." },
          { from: "time", to: "earned", label: "used", teach: "Cover already given turns premium into earned premium." },
          { from: "time", to: "unearned", label: "still owed", teach: "Cover not yet given is held as unearned premium." },
          { from: "earned", to: "ratios", label: "measures", teach: "Earned premium is the denominator for loss and expense ratios." },
          { from: "unearned", to: "uneven", label: "depends on", teach: "How fast unearned premium runs off depends on when the risk falls." }
        ]
      },
      explore: "earned-premium",
      takeaways: [
        "Gross written premium is measured before reinsurance; net written premium after it.",
        "Premium is earned over the period of cover, evenly or in line with the risk.",
        "Unearned premium is a liability on the balance sheet; ratios use earned premium."
      ]
    },
    {
      title: "Loss, expense and combined ratios",
      minutes: 6,
      keys: ["Combined ratio", "Loss ratio", "Expense ratio", "Float"],
      intro: "The most quoted measure of underwriting performance is the combined ratio. Build it from the top, then look at the right-hand column: the money an insurer earns simply by holding premium before claims are paid.",
      diagram: {
        cols: 3,
        nodes: [
          {
            id: "ep", at: [1, 1], span: 3, tone: "ink", label: "Earned premium £200m", sub: "The denominator for every ratio",
            teach: "Everything is measured against earned premium. Our insurer has earned £200m this year."
          },
          {
            id: "claims", at: [2, 1], label: "Claims £120m", sub: "Loss ratio 60%",
            teach: "The **loss ratio** is claims incurred divided by earned premium: £120m ÷ £200m = 60%. Incurred includes reserves for claims not yet paid, so it depends on reserving, as Module 08 showed."
          },
          {
            id: "exp", at: [2, 2], label: "Expenses £66m", sub: "Expense ratio 33%",
            teach: "The **expense ratio** is acquisition costs, such as brokerage and commission, plus operating expenses, divided by earned premium: £66m ÷ £200m = 33%."
          },
          {
            id: "float", at: [2, 3], label: "The float", sub: "Premium held until claims are paid",
            teach: "Premium usually arrives before claims are paid. The money held in between, the **float**, is invested. Long-tail classes, whose claims take years to pay, generate much more float."
          },
          {
            id: "cor", at: [3, 1], span: 2, tone: "tint", label: "Combined ratio 93%", sub: "Under 100% = underwriting profit",
            teach: "The **combined ratio** is the loss ratio plus the expense ratio: 60% + 33% = 93%. Below 100% means an underwriting profit: for every £1 of premium, the insurer kept 7p before investment income. Above 100% means an underwriting loss.\n\nLloyd’s reported a combined ratio of 84.0% for 2023, one of its strongest results for years; in heavy-loss years such as 2017 and 2020 it was above 100%.",
            like: "Think of a café. If every £1 of takings costs 60p in ingredients and 33p in rent and wages, the café keeps 7p. A combined ratio above 100% is a café selling coffee for less than it costs to make."
          },
          {
            id: "inv", at: [3, 3], label: "Investment income", sub: "Earned on the float",
            teach: "**Investment income** on the float adds to the result. When interest rates are high and claims are paid slowly, a combined ratio slightly above 100% can still be profitable overall. When rates are near zero, underwriting has to pay its own way."
          },
          {
            id: "overall", at: [4, 1], span: 3, tone: "good", label: "The overall result", sub: "Underwriting result plus investment income",
            teach: "The overall result is the underwriting result plus investment income. Try the model: push the combined ratio over 100% and see how much float, and how high an interest rate, it takes to stay in profit."
          }
        ],
        edges: [
          { from: "ep", to: "claims", label: "÷", teach: "Claims are expressed as a share of earned premium." },
          { from: "ep", to: "exp", label: "÷", teach: "So are expenses." },
          { from: "ep", to: "float", label: "held as", teach: "Premium not yet paid out as claims is held and invested." },
          { from: "claims", to: "cor", label: "+", teach: "The loss ratio is the first part of the combined ratio." },
          { from: "exp", to: "cor", label: "+", teach: "The expense ratio is the second." },
          { from: "float", to: "inv", label: "earns", teach: "Invested float earns investment income." },
          { from: "cor", to: "overall", label: "underwriting", teach: "100% minus the combined ratio is the underwriting margin." },
          { from: "inv", to: "overall", label: "plus", teach: "Investment income comes on top." }
        ]
      },
      explore: "combined-ratio",
      takeaways: [
        "The combined ratio is the loss ratio plus the expense ratio, both measured against earned premium.",
        "A combined ratio below 100% indicates an underwriting profit.",
        "Investment income on the float adds to the overall result, especially for long-tail business when rates are high."
      ]
    },
    {
      title: "The underwriting cycle",
      minutes: 6,
      keys: ["Soft markets", "Hard markets", "Capital flows", "Discipline"],
      intro: "Insurance prices move in a recurring pattern, swinging between soft and hard markets. The six boxes at the top form a loop: start at Profits and go round clockwise. Then look at the two forces underneath that can speed the loop up or slow it down.",
      diagram: {
        cols: 2,
        gapX: 60,
        nodes: [
          {
            id: "profits", at: [1, 1], tone: "good", label: "Profits", sub: "Good results",
            teach: "We start in good times: rates are adequate, results are strong and returns on capital are attractive. That is exactly what sets the next phase in motion."
          },
          {
            id: "capital", at: [1, 2], label: "New capital arrives", sub: "Investors chase returns",
            teach: "Profits attract capital: new syndicates, new insurers, ILS funds, existing players growing. More capital means more capacity chasing the same risks."
          },
          {
            id: "hard", at: [2, 1], tone: "tint", label: "Hard market", sub: "Prices rise, terms tighten",
            teach: "In a **hard market**, after heavy losses or a shortage of capital, prices rise, terms tighten and capacity contracts. Margins recover, and the loop returns to profits.\n\nLondon saw one from 2019, driven by catastrophe losses, the pandemic, inflation and the rising cost of reinsurance."
          },
          {
            id: "soft", at: [2, 2], label: "Soft market", sub: "Competition cuts prices",
            teach: "In a **soft market**, plentiful capital competes for business. Prices fall, terms broaden and margins narrow, often slowly enough that each year’s cut looks harmless.",
            like: "The cycle resembles rents in a university town. When lots of new flats are built, landlords cut rents to fill them. When supply dries up or demand surges, rents rise sharply. Insurance capacity behaves like housing supply."
          },
          {
            id: "exit", at: [3, 1], label: "Capital leaves or is lost", sub: "Withdrawals, failures",
            teach: "Losses deplete capital, and disappointed investors withdraw it. Capacity shrinks, and the remaining insurers can charge more."
          },
          {
            id: "losses", at: [3, 2], tone: "bad", label: "Losses exceed premium", sub: "Combined ratios above 100%",
            teach: "Eventually rates fall below what claims cost: combined ratios rise above 100% and results turn negative, sometimes only revealed years later as reserves develop."
          },
          {
            id: "shock", at: [4, 1], tone: "bad", label: "A shock", sub: "Catastrophe, pandemic, inflation",
            teach: "A large shock, such as a major catastrophe year, the pandemic or a burst of inflation, can wipe out capital suddenly and turn a soft market hard almost overnight."
          },
          {
            id: "discipline", at: [4, 2], tone: "brass", label: "Discipline", sub: "Holding rates when others don’t",
            teach: "**Underwriting discipline** means maintaining rates and terms when competitors chase volume. It is easy to describe and hard to practise. After several soft years of poor results, Lloyd’s launched a performance review in 2018 that required syndicates to improve or stop writing their worst business. Module 13 looks at how businesses attempt discipline."
          }
        ],
        edges: [
          { from: "profits", to: "capital", label: "attract", teach: "Good returns attract new capital into the market." },
          { from: "capital", to: "soft", label: "competes", teach: "More capacity competes for the same business, pushing prices down." },
          { from: "soft", to: "losses", label: "until", teach: "Prices eventually fall below the cost of claims." },
          { from: "losses", to: "exit", label: "drive out", teach: "Losses destroy capital and drive investors away." },
          { from: "exit", to: "hard", label: "shrinks supply", teach: "Less capacity means higher prices and tighter terms." },
          { from: "hard", to: "profits", label: "restores", teach: "Higher prices restore profits, and the loop begins again." },
          { from: "shock", to: "exit", label: "speeds", teach: "A shock destroys capital all at once, jumping the cycle forward." },
          { from: "discipline", to: "losses", label: "softens", teach: "Disciplined underwriters lose less in the soft phase." }
        ]
      },
      explore: "cycle",
      takeaways: [
        "Soft markets have plentiful capital and falling prices; hard markets have scarce capacity and rising prices.",
        "Flows of capital into and out of the market drive the cycle; shocks can turn it suddenly.",
        "Lloyd’s used its 2018 performance review to correct a period of poor results."
      ]
    },
    {
      title: "Capital and solvency",
      minutes: 6,
      keys: ["SCR", "1-in-200", "Solvency ratio", "Internal models"],
      intro: "Insurers must hold enough capital to survive bad years. In the UK the rules derive from Solvency II, adapted as Solvency UK and supervised by the Prudential Regulation Authority. Follow the two numbers that matter, what is needed and what is held, down to the ratio that compares them.",
      diagram: {
        cols: 2,
        gapX: 60,
        nodes: [
          {
            id: "risks", at: [1, 1], tone: "ink", label: "The insurer’s risks", sub: "Underwriting, reserves, cat, market",
            teach: "An insurer faces many risks: that this year’s business makes a loss, that past reserves prove short, that a catastrophe strikes, that investments fall, that reinsurers fail to pay. Capital must cover them all at once, after allowing for the fact that they rarely all go wrong together."
          },
          {
            id: "model", at: [1, 2], label: "Internal model", sub: "Or the standard formula",
            teach: "Most insurers use a standard formula, but Lloyd’s and many larger insurers use an **internal model**: their own model, approved by the regulator, for calculating the requirement. Each Lloyd’s syndicate’s model is reviewed by Lloyd’s."
          },
          {
            id: "scr", at: [2, 1], label: "The SCR", sub: "Survive a 1-in-200 year",
            teach: "The **Solvency Capital Requirement** (SCR) is the capital needed to withstand a 1-in-200-year loss over one year: a 99.5% confidence level.",
            like: "The SCR is like building a sea wall to the height of a 1-in-200-year storm surge. In most years the sea never comes close, but the wall must be ready for the rare year when it does."
          },
          {
            id: "own", at: [2, 2], label: "Own funds", sub: "Capital actually held",
            teach: "**Own funds** are the capital the insurer actually holds to meet its SCR: broadly, assets less liabilities, with some adjustments for quality."
          },
          {
            id: "ratio", at: [3, 1], span: 2, tone: "tint", label: "Solvency ratio", sub: "Own funds ÷ SCR, e.g. 150%",
            teach: "The **solvency ratio** is own funds divided by the SCR. Regulators expect it to be comfortably above 100%. With own funds of £300m and an SCR of £200m, the ratio is 150%. If a catastrophe then used £80m of capital, own funds would fall to £220m and the ratio to 110%: still above 100%, but with much less room."
          },
          {
            id: "uplift", at: [4, 1], label: "Lloyd’s 35% uplift", sub: "Members’ capital above the SCR",
            teach: "At Lloyd’s, each syndicate’s modelled requirement is increased by 35% to set the Funds at Lloyd’s its members must provide, as you saw in Module 03."
          },
          {
            id: "rds", at: [4, 2], tone: "brass", label: "Realistic Disaster Scenarios", sub: "Standard catastrophes",
            teach: "Lloyd’s also requires syndicates to model **Realistic Disaster Scenarios**: standard catastrophes, such as a major US hurricane or a Californian earthquake, applied to every syndicate so Lloyd’s can see the whole market’s exposure to the same event."
          }
        ],
        edges: [
          { from: "risks", to: "scr", label: "measured as", teach: "The combined risks, at a 1-in-200 level, set the SCR." },
          { from: "model", to: "scr", label: "calculates", teach: "The internal model or standard formula does the calculation." },
          { from: "scr", to: "ratio", label: "divides", teach: "The SCR is the denominator." },
          { from: "own", to: "ratio", label: "over", teach: "Own funds are the numerator." },
          { from: "ratio", to: "uplift", label: "at Lloyd’s", teach: "Lloyd’s sets members’ capital above the SCR with its uplift." },
          { from: "ratio", to: "rds", label: "tested by", teach: "Scenarios test whether capital would survive specific disasters." }
        ]
      },
      explore: "solvency",
      think: { q: "An insurer holds own funds of £300m and its SCR is £200m. What is its solvency ratio, and what happens to the ratio if a catastrophe uses £80m of its capital?", a: "The ratio is £300m ÷ £200m = 150%. After an £80m loss, own funds fall to £220m and, if the SCR is unchanged, the ratio falls to 110%: still above 100%, but with much less margin." },
      takeaways: [
        "The SCR is set to withstand a 1-in-200-year loss over one year.",
        "The solvency ratio is own funds divided by the SCR, and regulators expect it to be comfortably above 100%.",
        "Lloyd’s applies a 35% uplift and uses Realistic Disaster Scenarios to monitor catastrophe exposure."
      ]
    }
  ],
  quiz: [
    {
      q: "Earned premium is £100m, claims are £65m and expenses are £30m. What is the combined ratio?",
      options: ["35%", "65%", "95%", "105%"],
      answer: 2,
      why: "The loss ratio of 65% plus the expense ratio of 30% gives 95%."
    },
    {
      q: "What does a combined ratio of 104% mean?",
      options: [
        "An underwriting profit of 4%",
        "An underwriting loss equal to 4% of earned premium",
        "Claims were 104% of premium",
        "Expenses were 4% of premium"
      ],
      answer: 1,
      why: "Claims and expenses together came to 104% of earned premium, so underwriting lost 4p for every £1."
    },
    {
      q: "A twelve-month policy with a premium of £24,000 incepts on 1 July. How much has been earned by 31 December?",
      options: ["£6,000", "£12,000", "£18,000", "£24,000"],
      answer: 1,
      why: "Six of the twelve months have passed, so half of the premium has been earned."
    },
    {
      q: "What characterises a hard market?",
      options: [
        "Falling prices and broad terms",
        "Rising prices, tighter terms and reduced capacity",
        "No new business being written",
        "Prices fixed by the government"
      ],
      answer: 1,
      why: "Hard markets follow heavy losses or shortages of capital."
    },
    {
      q: "To what is the Solvency II SCR calibrated?",
      options: ["A 1-in-10-year loss", "A 1-in-100-year loss", "A 1-in-200-year loss over one year", "The worst loss in history"],
      answer: 2,
      why: "The SCR targets a 99.5% confidence level over one year."
    },
    {
      q: "What is the float?",
      options: [
        "Premium held and invested before claims are paid",
        "A floating rate of interest",
        "The unplaced part of a slip",
        "Reinsurance commission"
      ],
      answer: 0,
      why: "Insurers invest premium between receiving it and paying claims, and earn investment income on it."
    }
  ]
});
