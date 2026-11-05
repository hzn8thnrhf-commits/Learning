/* The Slip — The numbers */
window.SLIP_DATA = window.SLIP_DATA || {};
(window.SLIP_DATA.modules = window.SLIP_DATA.modules || []).push({
  id: "m10",
  title: "The numbers",
  short: "Numbers",
  blurb: "Written and earned premium, loss and combined ratios, the underwriting cycle and the capital behind it all.",
  outcomes: [
    "Distinguish written, earned, gross and net premium.",
    "Calculate loss, expense and combined ratios, and explain the role of investment income.",
    "Explain the underwriting cycle and the forces that drive it.",
    "Explain the purpose of the Solvency Capital Requirement and how Lloyd’s sets members’ capital."
  ],
  lessons: [
    {
      title: "Premium: written, earned, gross and net",
      minutes: 5,
      keys: ["Written premium", "Earned premium", "Gross and net", "Unearned premium"],
      body: [
        "Premium is measured in several ways, and the differences between them matter when results are read or plans are made.",
        {
          terms: [
            ["Gross written premium (GWP)", "The total premium on policies written during a period, before any reinsurance."],
            ["Net written premium (NWP)", "Gross written premium less the premium paid to reinsurers."],
            ["Earned premium", "The part of the premium that relates to cover already provided. Premium is earned over the period of the policy."],
            ["Unearned premium", "Premium received for cover still to be provided. It is held on the balance sheet as a liability."]
          ]
        },
        { fig: "earned-premium" },
        { example: { title: "Earning premium", text: "A twelve-month policy incepts on 1 October with a premium of £120,000. By 31 December three months have passed, so £30,000 has been earned and £90,000 remains unearned." } },
        { analogy: "Premium resembles a gym membership paid in advance. On the first day the gym has your money, but it has not earned it until it has provided the months of access. Each month, one twelfth moves from owed to earned." },
        "Not every policy earns its premium evenly. Hurricane cover written in January earns more of its premium during the autumn hurricane season, and the premium for a construction project is earned as the project grows in value."
      ],
      takeaways: [
        "Gross written premium is measured before reinsurance; net written premium after it.",
        "Premium is earned over the period of cover.",
        "Unearned premium is a liability on the balance sheet."
      ]
    },
    {
      title: "Loss, expense and combined ratios",
      minutes: 5,
      keys: ["Combined ratio", "Loss ratio", "Expense ratio", "Float"],
      body: [
        "The most widely quoted measure of underwriting performance is the **combined ratio**, which is built from two components.",
        {
          terms: [
            ["Loss ratio", "Claims incurred divided by earned premium."],
            ["Expense ratio", "Acquisition costs, such as brokerage and commission, plus operating expenses, divided by earned premium."],
            ["Combined ratio", "The loss ratio plus the expense ratio. A figure below 100% indicates an underwriting profit; a figure above 100% indicates an underwriting loss."]
          ]
        },
        { example: { title: "Calculating a combined ratio", text: "Earned premium is £200m, claims incurred £120m and expenses £66m. The loss ratio is 60%, the expense ratio 33% and the combined ratio 93%. For every £1 of premium, the insurer kept 7p as underwriting profit before investment income." } },
        { fig: "ratio" },
        { analogy: "Think of a café. If every £1 of takings costs 60p in ingredients (the claims) and 33p in rent and wages (the expenses), the café keeps 7p. A combined ratio above 100% is a café that sells coffee for less than it costs to make." },
        "Insurers also earn **investment income** on premium that they hold before paying claims, known as the **float**. Long-tail classes generate more float, so when interest rates are high a combined ratio slightly above 100% can still be profitable overall.",
        "Lloyd’s reported a combined ratio of 84.0% for 2023, one of its strongest results for many years. In years of heavy losses, such as 2017 and 2020, its combined ratio exceeded 100%.",
        { lab: "ratio", text: "Move premium, claims and expenses in the Combined ratio tool." }
      ],
      takeaways: [
        "The combined ratio is the loss ratio plus the expense ratio.",
        "A combined ratio below 100% indicates an underwriting profit.",
        "Investment income on the float adds to the overall result."
      ]
    },
    {
      title: "The underwriting cycle",
      minutes: 5,
      keys: ["Soft markets", "Hard markets", "Capital flows", "Discipline"],
      body: [
        "Insurance prices move in a recurring pattern known as the **underwriting cycle**, alternating between soft and hard markets.",
        {
          terms: [
            ["Soft market", "Plentiful capital competes for business. Prices fall, terms broaden and margins narrow."],
            ["Hard market", "After heavy losses or a shortage of capital, prices rise, terms tighten and capacity contracts. Margins recover."]
          ]
        },
        "A typical cycle runs as follows. Profits attract new capital; competition drives prices down; eventually losses exceed premiums; capital leaves or is depleted; prices rise; profits return; and new capital arrives once more.",
        { fig: "cycle" },
        { analogy: "The cycle resembles the rental market in a university town. When many new flats are built, landlords cut rents to fill them. When supply dries up or demand surges, rents rise sharply. Insurance capacity behaves in the same way as housing supply." },
        "London felt the cycle acutely in the late 2010s. After several years of soft pricing and poor results, Lloyd’s launched a performance review in 2018 that required syndicates to improve or stop writing their worst-performing business. A hard market followed from 2019, driven by catastrophe losses, the pandemic, inflation and the rising cost of reinsurance.",
        "Underwriting discipline means maintaining rates and terms when competitors chase volume. It is easy to describe and difficult to practise, and the module on portfolio management examines how businesses attempt it."
      ],
      takeaways: [
        "Soft markets have plentiful capital and falling prices; hard markets have scarce capacity and rising prices.",
        "Flows of capital into and out of the market drive the cycle.",
        "Lloyd’s used its 2018 performance review to correct a period of poor results."
      ]
    },
    {
      title: "Capital and solvency",
      minutes: 5,
      keys: ["SCR", "1-in-200", "Solvency ratio", "Internal models"],
      body: [
        "Insurers must hold enough capital to survive bad years. In the United Kingdom the rules derive from **Solvency II**, now adapted as **Solvency UK**, and are supervised by the **Prudential Regulation Authority**.",
        {
          terms: [
            ["Solvency Capital Requirement (SCR)", "The capital needed to withstand a 1-in-200-year loss over one year, which is a confidence level of 99.5%."],
            ["Own funds", "The capital an insurer actually holds to meet its SCR."],
            ["Solvency ratio", "Own funds divided by the SCR. Regulators expect it to be comfortably above 100%."],
            ["Internal model", "A firm’s own approved model for calculating its SCR, used by Lloyd’s and by many larger insurers."]
          ]
        },
        { analogy: "The SCR is like building a sea wall to the height of a 1-in-200-year storm surge. In most years the sea never comes close, but the wall must be ready for the rare year when it does." },
        "Each Lloyd’s syndicate calculates its capital requirement with a model reviewed by Lloyd’s, and Lloyd’s adds an uplift of 35% to set the Funds at Lloyd’s its members must provide. Lloyd’s also requires syndicates to model a set of **Realistic Disaster Scenarios**, standard catastrophes such as a major US hurricane or a Californian earthquake, so that it can see the market’s total exposure. The module on business planning shows how capital is used to judge whether a plan is worthwhile.",
        { think: { q: "An insurer holds own funds of £300m and its SCR is £200m. What is its solvency ratio, and what would happen to the ratio if a catastrophe used £80m of its capital?", a: "The solvency ratio is £300m ÷ £200m = 150%. After an £80m loss, own funds fall to £220m and, if the SCR is unchanged, the ratio falls to 110%, still above 100% but with much less margin." } }
      ],
      takeaways: [
        "The SCR is set to withstand a 1-in-200-year loss over one year.",
        "The solvency ratio is own funds divided by the SCR.",
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
