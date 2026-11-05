/* The Slip — Classes of business */
window.SLIP_DATA = window.SLIP_DATA || {};
(window.SLIP_DATA.modules = window.SLIP_DATA.modules || []).push({
  id: "m06",
  title: "Classes of business",
  short: "Classes",
  blurb: "Marine, aviation, energy, property, casualty and specialty: what London writes and what makes each class distinctive.",
  outcomes: [
    "Describe the main marine, aviation, energy and property covers written in London.",
    "Explain general average and the role of separate war risks cover.",
    "Describe the main casualty and financial lines, and explain why they are called long-tail.",
    "Give examples of specialty classes and the risks they cover."
  ],
  lessons: [
    {
      title: "Marine",
      minutes: 5,
      keys: ["Hull and cargo", "Marine liability", "War risks", "General average"],
      body: [
        "Marine insurance is where the London Market began, and London remains the world’s leading centre for marine business. The main lines are set out below.",
        {
          terms: [
            ["Hull and machinery", "Physical damage to the ship itself."],
            ["Cargo", "Goods in transit by sea, air or land, often insured from warehouse to warehouse."],
            ["Marine liability", "The liabilities of ports, terminals, charterers, ship repairers and others. Shipowners’ own liabilities are mostly insured by P&I clubs."],
            ["War", "Damage caused by war, piracy, seizure and similar perils, which is usually excluded from standard hull cover and bought separately."],
            ["Specie", "High-value goods in transit or storage, such as gold, cash, jewellery and fine art."],
            ["Yachts", "Pleasure craft and superyachts."]
          ]
        },
        "Marine insurance has a vocabulary of its own. **General average** is an ancient principle: if cargo is jettisoned, or expenditure incurred, to save the ship and cargo from a common danger, everyone with an interest in the voyage contributes to the cost in proportion to the value of their interest. Insurers pay their clients’ contributions.",
        { analogy: "General average is like a party of walkers lightening their packs in a storm. If one walker’s tent is thrown away so that everyone can get off the mountain safely, the whole party shares the cost of replacing it." },
        "War risks cover can change quickly. The **Joint War Committee**, made up of Lloyd’s and company underwriters, publishes **listed areas** in which additional premium applies, and rates may be reviewed at short notice when conflicts flare, as they have in the Black Sea and the Red Sea in recent years."
      ],
      takeaways: [
        "Marine insurance covers hull, cargo, liability, war and specie risks.",
        "General average shares the cost of sacrifices made to save a voyage.",
        "War risks are bought separately and priced by area."
      ]
    },
    {
      title: "Aviation and space",
      minutes: 5,
      keys: ["Aviation hull", "Aviation liability", "Hull war", "Space"],
      body: [
        "Aviation insurance covers airlines, aircraft lessors, airports, manufacturers and private aircraft. A single airliner may be worth hundreds of millions of dollars, and the liability arising from a crash may be far greater, so aviation is well suited to the subscription market.",
        {
          terms: [
            ["Hull", "Physical damage to the aircraft."],
            ["Aviation liability", "Liability to passengers and third parties, often with very high limits."],
            ["Hull war", "War, hijacking, confiscation and terrorism risks, written separately."],
            ["Products liability", "Liability of manufacturers of aircraft and their components."],
            ["Space", "Launch, in-orbit and third-party liability cover for satellites."]
          ]
        },
        "Aviation insurers faced a major test in 2022, when several hundred leased aircraft were stranded in Russia following the imposition of sanctions. Lessors claimed under their policies, producing large losses and lengthy litigation in the London courts about which policies should respond.",
        { analogy: "Space insurance is like insuring a single concert whose stage is built on top of a rocket. There is little history from which to set a price, so underwriters rely on engineering judgement about each launch vehicle and satellite." },
        "Space is a small and volatile class: a handful of losses in one year can exceed the premium of the entire market. Few insurers write it, and many of those that do are based in London."
      ],
      takeaways: [
        "Aviation insurance covers hull, liability, war and products risks.",
        "Very high values and liabilities make aviation well suited to the subscription market.",
        "Space insurance prices one-off, high-severity risks with little data."
      ]
    },
    {
      title: "Energy",
      minutes: 4,
      keys: ["Upstream", "Midstream", "Downstream", "Renewables"],
      body: [
        "Energy insurance covers the oil, gas and power industries, from exploration to refining, and increasingly renewable energy.",
        {
          terms: [
            ["Upstream", "Exploration and production: offshore platforms, drilling rigs and wells, including control of well cover against blowouts."],
            ["Midstream", "Pipelines, storage and transport."],
            ["Downstream", "Refineries, petrochemical plants and terminals."],
            ["Power and renewables", "Power stations, wind farms, solar parks and battery storage, including the construction phase."]
          ]
        },
        "Values are very large and risks are concentrated. The Piper Alpha disaster in 1988 killed 167 people and was one of the largest insured losses of its time, and a major refinery today may carry property values measured in billions.",
        { analogy: "Insuring a refinery is like insuring a city block in which every building is connected by pipes full of flammable liquid. A fire in one place can spread to the rest, so underwriters pay close attention to separation distances, fire protection and maintenance." },
        "Renewable energy is the main area of growth. Offshore wind farms bring new engineering and weather risks, and insurers must price both the construction phase and the years of operation that follow."
      ],
      takeaways: [
        "Energy insurance divides into upstream, midstream, downstream, and power and renewables.",
        "Values are very high and risks concentrated.",
        "Renewable energy is a fast-growing part of the class."
      ]
    },
    {
      title: "Property",
      minutes: 5,
      keys: ["D&F property", "Binders", "Business interruption", "Catastrophe accumulation"],
      body: [
        "London writes large commercial and industrial property risks from around the world, often for multinational companies or for properties with heavy catastrophe exposure.",
        {
          ul: [
            "**Direct and facultative (D&F) property:** large individual risks placed in the open market, sometimes as facultative reinsurance for local insurers.",
            "**Binder property:** smaller commercial and residential risks written through coverholders, an important part of London’s US business.",
            "**Business interruption:** loss of profit following physical damage, which can exceed the cost of the damage itself.",
            "**Terrorism and political violence:** often bought as separate, standalone cover."
          ]
        },
        "Natural catastrophe is the dominant concern. Hurricanes, earthquakes, floods and wildfires can produce thousands of claims at once, so underwriters manage their **aggregates**, the total exposure in each region, and use **catastrophe models** to estimate the losses from many thousands of simulated events. These tools are examined in the module on portfolio management.",
        { analogy: "Writing property insurance in Florida is like selling umbrellas to everyone in the same street. A single shower is manageable, but a storm makes every customer claim at once, so underwriters keep count of how many umbrellas they have sold in each street." }
      ],
      takeaways: [
        "London writes large D&F property risks and smaller property business through binders.",
        "Business interruption losses can exceed the cost of the physical damage.",
        "Catastrophe accumulation is the central risk in property insurance."
      ]
    },
    {
      title: "Casualty and financial lines",
      minutes: 6,
      keys: ["Liability", "PI and D&O", "Long-tail", "Cyber"],
      body: [
        "**Casualty** insurance covers liability: the sums a business must pay to others for injury, damage or financial loss it has caused.",
        {
          terms: [
            ["General liability", "Liability for injury to third parties and damage to their property, often for large companies and written as excess layers above local primary policies."],
            ["Professional indemnity (PI)", "Claims by clients for negligent advice or services, for example against lawyers, accountants or architects."],
            ["Directors’ and officers’ liability (D&O)", "Protects directors against claims arising from their management decisions, including shareholder class actions."],
            ["Financial institutions (FI)", "Packages for banks and asset managers, including crime, professional indemnity and D&O cover."],
            ["Medical malpractice", "Claims against doctors and hospitals."],
            ["Cyber", "Losses from data breaches, ransomware and IT outages, together with the resulting liabilities."]
          ]
        },
        "Casualty business is described as **long-tail**, because claims may be made years or even decades after the policy period. Asbestos is the classic example. Long tails make reserving more difficult and expose insurers to **social inflation**, the rising cost of jury awards and litigation, particularly in the United States.",
        { analogy: "Short-tail business is like a parking ticket: you soon know whether you have one and how much it costs. Long-tail business is like a slow leak behind a wall: the damage began years ago, and only now are you discovering what it will cost to repair." },
        "Cyber is one of London’s fastest-growing classes. Lloyd’s requires syndicates to exclude losses arising from state-backed cyber attacks from standalone cyber policies, reflecting concern that such an attack could cause a systemic catastrophe too large to insure.",
        { think: { q: "Why might an insurer hold reserves for a liability policy written twenty years ago?", a: "Liability claims can emerge long after the policy period, for example when an illness caused by exposure to a hazardous substance is diagnosed decades later. Claims-made and losses-occurring triggers determine which policy responds, and under occurrence-based wordings an old policy may still be liable." } }
      ],
      takeaways: [
        "Casualty insurance covers liabilities to third parties.",
        "Long-tail claims may emerge many years after the policy period.",
        "Cyber is a major growth class, with concerns about systemic risk."
      ]
    },
    {
      title: "Specialty",
      minutes: 5,
      keys: ["Political risk", "K&R", "Contingency", "Fine art"],
      body: [
        "London’s reputation for insuring the unusual rests on its specialty classes.",
        {
          terms: [
            ["Political risk", "Confiscation, expropriation, contract frustration and currency inconvertibility for companies investing or trading abroad."],
            ["Trade credit", "Non-payment by buyers or borrowers."],
            ["Terrorism and political violence", "Damage caused by terrorism, riots, civil commotion, insurrection and war on land."],
            ["Kidnap and ransom (K&R)", "Ransom payments, the fees of crisis consultants and related costs."],
            ["Contingency", "Event cancellation and non-appearance, for example when a festival or a sporting event is called off."],
            ["Fine art and specie", "Collections, museums, galleries and valuables."],
            ["Bloodstock", "Racehorses and other high-value animals."],
            ["Accident and health", "Personal accident, sports injury and travel-related covers."]
          ]
        },
        "The COVID-19 pandemic was a defining event for contingency insurers, producing large losses from cancelled events around the world. Many wordings now exclude communicable disease.",
        { analogy: "Specialty underwriters are like bespoke tailors. There is no off-the-peg size for insuring a racing driver’s contract or a mine in an unstable country, so each policy is cut to fit." }
      ],
      takeaways: [
        "Specialty classes include political risk, trade credit, K&R, contingency, fine art and bloodstock.",
        "Many specialty risks have little data and depend on underwriting judgement.",
        "Major events, such as the pandemic, reshape specialty wordings."
      ]
    }
  ],
  quiz: [
    {
      q: "Which cover protects a shipowner against damage to the vessel itself?",
      options: ["P&I", "Hull and machinery", "Cargo", "Specie"],
      answer: 1,
      why: "Hull and machinery covers the ship. P&I covers the owner’s liabilities."
    },
    {
      q: "What is general average?",
      options: [
        "The average premium for a class",
        "The sharing of the cost of sacrifices made to save a voyage among all those with an interest in it",
        "The average claim in marine insurance",
        "A form of reinsurance"
      ],
      answer: 1,
      why: "If cargo is jettisoned to save the ship, every interest contributes in proportion to its value."
    },
    {
      q: "Which term describes refineries and petrochemical plants?",
      options: ["Upstream", "Midstream", "Downstream", "Offshore"],
      answer: 2,
      why: "Upstream is exploration and production, midstream is pipelines and storage, and downstream is refining."
    },
    {
      q: "Why is casualty insurance described as long-tail?",
      options: [
        "Its policies last longer than a year",
        "Claims can emerge many years after the policy period",
        "Its policy wordings are long",
        "Its premiums are paid in instalments"
      ],
      answer: 1,
      why: "Liability claims, such as those arising from asbestos, can surface decades after the exposure."
    },
    {
      q: "What does contingency insurance typically cover?",
      options: ["Event cancellation and non-appearance", "Kidnap ransoms", "Crop failure", "Pipeline leaks"],
      answer: 0,
      why: "Contingency cover protects organisers if an event is cancelled or a key person fails to appear."
    },
    {
      q: "What has Lloyd’s required syndicates to exclude from standalone cyber policies?",
      options: ["All ransomware", "Losses from state-backed cyber attacks", "Data breaches", "Business interruption"],
      answer: 1,
      why: "State-backed attacks could cause systemic losses across the whole market."
    },
    {
      q: "What does business interruption insurance pay for?",
      options: [
        "Physical damage to buildings",
        "Loss of profit following insured physical damage",
        "Injuries to employees",
        "Fines and penalties"
      ],
      answer: 1,
      why: "Business interruption covers the income lost while the business recovers from damage."
    }
  ]
});
