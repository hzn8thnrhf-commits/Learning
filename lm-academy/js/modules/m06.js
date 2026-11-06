/* The Slip — Classes of business */
window.SLIP_DATA = window.SLIP_DATA || {};
(window.SLIP_DATA.modules = window.SLIP_DATA.modules || []).push({
  id: "m06",
  title: "Classes of business",
  short: "Classes",
  blurb: "Marine, aviation and space, energy, property, casualty and the specialty classes for which London is known.",
  outcomes: [
    "Describe the main covers in marine, aviation, space and energy insurance.",
    "Explain catastrophe accumulation and business interruption in property insurance.",
    "Explain why casualty business is described as long-tail and why cyber raises concerns about systemic risk.",
    "Give examples of London’s specialty classes."
  ],
  lessons: [
    {
      title: "Marine",
      minutes: 6,
      keys: ["Hull and cargo", "War risks", "General average", "Listed areas"],
      intro: "Marine insurance is where the London Market began, and London is still the world’s leading centre for it. Picture a single voyage at the top of the diagram, then follow the different interests in it down to one of the oldest ideas in insurance: sharing a sacrifice.",
      diagram: {
        cols: 2,
        nodes: [
          {
            id: "voyage", at: [1, 1], span: 2, tone: "ink", label: "A voyage", sub: "A ship, its cargo and crew at sea",
            teach: "A single voyage brings together several separate interests: the shipowner’s vessel, the goods of many cargo owners, the crew, and everyone the ship might harm. Each is insured separately, often in London.\n\nThe shipowner’s liabilities to others, for pollution, injury and collision, mostly go to the P&I clubs you met in Module 02."
          },
          {
            id: "hull", at: [2, 1], label: "Hull and machinery", sub: "The ship itself",
            teach: "**Hull and machinery** covers physical damage to the ship itself: grounding, collision, fire, heavy weather, breakdown. A modern container ship can be worth well over $100m, so hull risks are often shared on a slip."
          },
          {
            id: "cargo", at: [2, 2], label: "Cargo", sub: "Warehouse to warehouse",
            teach: "**Cargo** insurance covers goods in transit by sea, air or land, often from the seller’s warehouse to the buyer’s. High-value goods such as gold, cash, jewellery and fine art are written as **specie**, a specialist line of its own.\n\nNotice that one ship may carry the goods of hundreds of cargo owners, each with their own insurer."
          },
          {
            id: "war", at: [3, 1], tone: "bad", label: "War risks", sub: "Bought separately",
            teach: "Damage caused by war, piracy, seizure and similar perils is usually excluded from standard hull cover and bought separately as **war risks** insurance.\n\nWhy separate it? Because war risk changes fast and affects whole regions at once, so it needs its own pricing and its own capacity."
          },
          {
            id: "ga", at: [3, 2], tone: "brass", label: "General average", sub: "A sacrifice shared by all",
            teach: "**General average** is an ancient principle. If cargo is jettisoned, or money spent, to save the ship and cargo from a common danger, everyone with an interest in the voyage contributes to the cost in proportion to the value of their interest.\n\nIt’s fair because everyone benefited from the sacrifice. Try the model to see how the shares work out.",
            like: "It’s like walkers lightening their packs in a storm. If one walker’s tent is thrown away so everyone can get off the mountain safely, the whole party shares the cost of replacing it."
          },
          {
            id: "listed", at: [4, 1], label: "Listed areas", sub: "Joint War Committee",
            teach: "The **Joint War Committee**, made up of Lloyd’s and company underwriters, publishes **listed areas** where additional premium applies for war risks. Ships entering them must notify their insurers and may pay more.\n\nRates can be reviewed at short notice when conflicts flare, as they have in the Black Sea and the Red Sea in recent years."
          },
          {
            id: "pay", at: [4, 2], label: "Insurers pay", sub: "Each client’s contribution",
            teach: "Each party’s insurer pays its client’s general average contribution: the hull insurer for the shipowner, each cargo insurer for its cargo owner. So a single sacrifice on one ship can produce claims on dozens of policies at once."
          }
        ],
        edges: [
          { from: "voyage", to: "hull", label: "the ship", teach: "The shipowner insures the vessel under a hull policy." },
          { from: "voyage", to: "cargo", label: "the goods", teach: "Each cargo owner insures its own goods." },
          { from: "hull", to: "war", label: "excludes war", teach: "Standard hull cover excludes war perils, so they are bought separately." },
          { from: "war", to: "listed", label: "priced by", teach: "War premium depends on where the ship goes, as set by the listed areas." },
          { from: "hull", to: "ga", label: "shares", teach: "The ship contributes to general average in proportion to its value." },
          { from: "cargo", to: "ga", label: "shares", teach: "So does every cargo owner, including the one whose goods were sacrificed." },
          { from: "ga", to: "pay", label: "funded by", teach: "Each party’s insurer pays its client’s contribution." }
        ]
      },
      explore: "general-average",
      takeaways: [
        "Marine insurance covers hull, cargo, liability, war and specie risks.",
        "General average shares the cost of a sacrifice made to save a voyage among everyone with an interest in it.",
        "War risks are bought separately and priced by area, using the Joint War Committee’s listed areas."
      ]
    },
    {
      title: "Aviation and space",
      minutes: 6,
      keys: ["Aviation hull", "Aviation liability", "Hull war", "Space"],
      intro: "Aviation and space share a pattern: very high values, the possibility of enormous liabilities, and not many losses, so each one matters a great deal. The first diagram covers an airline; the second, a satellite.",
      diagram: [
        {
          name: "Aviation",
          cols: 2,
          nodes: [
            {
              id: "airline", at: [1, 1], span: 2, tone: "ink", label: "An airline’s fleet", sub: "Or a lessor, airport, manufacturer",
              teach: "Aviation insurance covers airlines, aircraft lessors, airports, manufacturers and private aircraft. A single airliner may be worth hundreds of millions of dollars, and the liability from a crash may be far greater, so aviation suits the subscription market well."
            },
            {
              id: "hull", at: [2, 1], label: "Hull", sub: "The aircraft",
              teach: "**Hull** cover pays for physical damage to the aircraft, on the ground or in the air. Values are agreed in advance, which matters for leased aircraft, where the lessor is often a named insured."
            },
            {
              id: "liab", at: [2, 2], label: "Liability", sub: "Passengers and third parties",
              teach: "**Aviation liability** covers injury to passengers and harm to people and property on the ground. Limits are very high, often more than a billion dollars per aircraft, because a single crash can produce claims of that size."
            },
            {
              id: "hullwar", at: [3, 1], tone: "bad", label: "Hull war", sub: "War, hijack, confiscation",
              teach: "**Hull war** cover, written separately, responds to war, hijacking, confiscation and terrorism. As in marine, these perils are excluded from the standard hull policy because they can affect many aircraft at once."
            },
            {
              id: "products", at: [3, 2], label: "Products liability", sub: "The makers of aircraft and parts",
              teach: "**Products liability** protects manufacturers of aircraft and their components against claims that a defect caused an accident. A fault in one part can be fitted to hundreds of aircraft, so these exposures can be very large."
            },
            {
              id: "russia", at: [4, 1], span: 2, tone: "brass", label: "Aircraft stranded in Russia", sub: "The 2022 sanctions",
              teach: "In 2022 several hundred leased aircraft were stranded in Russia after sanctions were imposed. Lessors claimed under their policies, producing large losses and lengthy litigation in the London courts.\n\nThe key question was which policy responded: the ordinary all-risks cover or the war risks cover? That depended on the proximate cause, exactly the principle from Module 05."
            }
          ],
          edges: [
            { from: "airline", to: "hull", label: "the aircraft", teach: "The aircraft themselves are insured under hull cover." },
            { from: "airline", to: "liab", label: "harm to others", teach: "The airline’s liability to passengers and third parties is insured separately, with high limits." },
            { from: "hull", to: "hullwar", label: "excludes war", teach: "War and confiscation are excluded from hull and bought as hull war." },
            { from: "liab", to: "products", label: "makers too", teach: "Manufacturers face their own liability exposure for defects." },
            { from: "hullwar", to: "russia", label: "tested by", teach: "The Russian losses tested which cover applied when aircraft were confiscated." }
          ]
        },
        {
          name: "Space",
          intro: "Space insurance prices one-off risks of extreme severity with very little data. Follow a satellite from launch into orbit, and see why the results swing so wildly.",
          cols: 2,
          gapX: 56,
          nodes: [
            {
              id: "sat", at: [1, 1], span: 2, tone: "ink", label: "A satellite", sub: "Hundreds of millions, one shot",
              teach: "A communications satellite can be worth several hundred million dollars, and it must survive a violent launch before working for fifteen years in orbit. Space insurance covers launch, in-orbit operation and third-party liability.",
              like: "It’s like insuring a single concert whose stage is built on top of a rocket. There is little history to price from, so underwriters rely on engineering judgement about each launch vehicle and satellite."
            },
            {
              id: "launch", at: [2, 1], label: "Launch", sub: "The riskiest minutes",
              teach: "Most of the risk is concentrated in a few minutes: launch and the first weeks of deployment. A launch failure is usually a total loss."
            },
            {
              id: "orbit", at: [2, 2], label: "In orbit", sub: "Years of operation",
              teach: "Once working, a satellite can still fail through a fault, a power loss or a collision with debris. In-orbit cover is usually renewed annually."
            },
            {
              id: "judge", at: [3, 1], label: "Little history", sub: "Engineering judgement",
              teach: "Each launch vehicle and satellite design has a short track record, so underwriters rely on engineering analysis rather than large data sets. That makes space a classic London specialty."
            },
            {
              id: "few", at: [3, 2], label: "Few insurers", sub: "Many of them in London",
              teach: "Only a small number of insurers write space risks, and many are based in London. Total premium for the whole market is modest, measured in hundreds of millions of dollars."
            },
            {
              id: "volatile", at: [4, 1], span: 2, tone: "bad", label: "Volatile results", sub: "A few losses can sink a year",
              teach: "Put those facts together: large values, few risks, small total premium. A handful of losses in one year can exceed the premium of the entire market. Space is a small, volatile class, which is why some insurers enter and leave it as results swing."
            }
          ],
          edges: [
            { from: "sat", to: "launch", label: "first", teach: "Cover starts with the most dangerous phase: launch." },
            { from: "launch", to: "orbit", label: "then", teach: "Once safely in orbit, the satellite moves to annual in-orbit cover." },
            { from: "launch", to: "judge", label: "priced with", teach: "With few comparable launches, pricing rests on engineering judgement." },
            { from: "orbit", to: "few", label: "written by", teach: "Only a small group of insurers provide this capacity." },
            { from: "judge", to: "volatile", label: "so", teach: "Uncertain pricing adds to the volatility." },
            { from: "few", to: "volatile", label: "and", teach: "A small premium pool means each loss hits the whole market hard." }
          ]
        }
      ],
      explore: "space-year",
      takeaways: [
        "Aviation insurance covers hull, liability, war and products risks.",
        "Very high values and liabilities make aviation well suited to the subscription market.",
        "Space insurance prices one-off, high-severity risks with little data, so a few losses can swing a whole year."
      ]
    },
    {
      title: "Energy",
      minutes: 5,
      keys: ["Upstream", "Midstream", "Downstream", "Renewables"],
      intro: "Energy insurance follows oil and gas along its journey, from the well to the refinery, and increasingly follows power from the wind and the sun. Trace the chain down the left-hand side and see the distinctive risk at each stage on the right.",
      diagram: {
        cols: 2,
        gapX: 64,
        nodes: [
          {
            id: "up", at: [1, 1], tone: "ink", label: "Upstream", sub: "Platforms, rigs, wells",
            teach: "**Upstream** means exploration and production: offshore platforms, drilling rigs and wells. Values are very large and risks concentrated. The Piper Alpha disaster in 1988 killed 167 people and was one of the largest insured losses of its time."
          },
          {
            id: "well", at: [1, 2], tone: "bad", label: "Control of well", sub: "Blowouts",
            teach: "**Control of well** cover pays to regain control of a well after a blowout, and for redrilling and pollution clean-up. It is the upstream market’s signature cover, because a blowout can cost far more than the equipment involved."
          },
          {
            id: "mid", at: [2, 1], label: "Midstream", sub: "Pipelines and storage",
            teach: "**Midstream** covers pipelines, storage and transport, the links between production and processing. Long pipelines cross many territories and hazards, from floods to sabotage."
          },
          {
            id: "down", at: [3, 1], label: "Downstream", sub: "Refineries, terminals",
            teach: "**Downstream** covers refineries, petrochemical plants and terminals. A major refinery may carry property values measured in billions, plus large business interruption exposure."
          },
          {
            id: "block", at: [3, 2], tone: "brass", label: "A connected site", sub: "Fire can spread",
            teach: "Underwriters look hard at separation distances, fire protection and maintenance, because one fire can spread across a whole site.",
            like: "Insuring a refinery is like insuring a city block in which every building is connected by pipes full of flammable liquid. A fire in one place can spread to the rest."
          },
          {
            id: "renew", at: [4, 1], tone: "good", label: "Power and renewables", sub: "Wind, solar, batteries",
            teach: "**Power and renewables** covers power stations, wind farms, solar parks and battery storage. Renewable energy is the class’s main area of growth, and London is a leading market for it."
          },
          {
            id: "build", at: [4, 2], label: "Two phases", sub: "Construction, then operation",
            teach: "Offshore wind farms bring new engineering and weather risks, and insurers must price both the **construction** phase, with vessels, cables and installation, and the years of **operation** that follow. The two phases have very different risks, and often different insurers."
          }
        ],
        edges: [
          { from: "up", to: "well", label: "faces", teach: "A blowout is the defining upstream risk, with its own cover." },
          { from: "up", to: "mid", label: "flows to", teach: "Oil and gas flow from production into pipelines and storage." },
          { from: "mid", to: "down", label: "flows to", teach: "And on to refineries and terminals." },
          { from: "down", to: "block", label: "faces", teach: "The defining downstream risk is fire spreading across a connected site." },
          { from: "down", to: "renew", label: "shifting to", teach: "The energy transition is moving the class towards power and renewables." },
          { from: "renew", to: "build", label: "faces", teach: "Renewables projects carry distinct construction and operating risks." }
        ]
      },
      takeaways: [
        "Energy insurance divides into upstream, midstream, downstream, and power and renewables.",
        "Each stage has its signature risk: blowouts, connected fires, construction.",
        "Renewable energy is a fast-growing part of the class."
      ]
    },
    {
      title: "Property",
      minutes: 6,
      keys: ["D&F property", "Binders", "Business interruption", "Catastrophe accumulation"],
      intro: "London writes property risks of every size, from a single refinery to thousands of homes. Follow the two routes in, then see the two things that make property underwriting difficult: losses that outgrow the physical damage, and catastrophes that produce thousands of claims at once.",
      diagram: {
        cols: 2,
        nodes: [
          {
            id: "prop", at: [1, 1], span: 2, tone: "ink", label: "Commercial property", sub: "Factories, warehouses, homes",
            teach: "London writes large commercial and industrial property risks from around the world, often for multinationals or for properties with heavy catastrophe exposure. Terrorism and political violence are often bought as separate, standalone covers."
          },
          {
            id: "dnf", at: [2, 1], label: "D&F property", sub: "Large risks, open market",
            teach: "**Direct and facultative (D&F) property** means large individual risks placed in the open market, sometimes as facultative reinsurance for local insurers. Each is underwritten on its own merits."
          },
          {
            id: "binder", at: [2, 2], label: "Binder property", sub: "Small risks via coverholders",
            teach: "**Binder property** means smaller commercial and residential risks written through coverholders, an important part of London’s US business. Each risk is small, but there are thousands of them, often in the same regions."
          },
          {
            id: "bi", at: [3, 1], tone: "tint", label: "Business interruption", sub: "Lost profit after damage",
            teach: "**Business interruption** (BI) pays the loss of profit following insured physical damage. It is often the bigger part of the claim: a factory may be rebuilt in months, but its customers may take much longer to return.\n\nThe **indemnity period** caps how long the loss of profit is covered. Choose it too short and the client bears the tail of the loss. The model shows how."
          },
          {
            id: "cat", at: [3, 2], tone: "bad", label: "Catastrophe accumulation", sub: "Many claims at once",
            teach: "Natural catastrophe is the dominant concern in property. Hurricanes, earthquakes, floods and wildfires produce thousands of claims at once, from risks that looked unrelated when they were written.",
            like: "Writing property in Florida is like selling umbrellas to everyone in the same street. A shower is manageable, but a storm makes every customer claim at once, so you keep count of how many umbrellas you’ve sold in each street."
          },
          {
            id: "agg", at: [4, 1], label: "Aggregates", sub: "Exposure by region",
            teach: "Underwriters manage their **aggregates**: the total exposure in each region or catastrophe zone. Aggregate limits stop an insurer piling up more exposure in one place than it can afford to lose."
          },
          {
            id: "models", at: [4, 2], label: "Catastrophe models", sub: "Thousands of simulated events",
            teach: "**Catastrophe models** estimate the losses from many thousands of simulated hurricanes, earthquakes and floods applied to the insurer’s actual exposures. They drive pricing, capital and reinsurance buying, as you’ll see in Modules 10 and 13."
          }
        ],
        edges: [
          { from: "prop", to: "dnf", label: "large risks", teach: "Big individual risks come through the open market." },
          { from: "prop", to: "binder", label: "small risks", teach: "Small risks come through coverholders in bulk." },
          { from: "dnf", to: "bi", label: "damage triggers", teach: "Physical damage to a large site triggers a loss of profit, which can exceed the damage." },
          { from: "binder", to: "cat", label: "thousands of homes", teach: "Binder books are especially prone to accumulation: many small risks in the same storm path." },
          { from: "dnf", to: "cat", teach: "Large sites in catastrophe zones add to the same accumulation." },
          { from: "cat", to: "agg", label: "tracked by", teach: "Insurers track their exposure by region and set limits." },
          { from: "cat", to: "models", label: "estimated by", teach: "Models turn those exposures into estimated losses." }
        ]
      },
      explore: "bi",
      takeaways: [
        "London writes large D&F property risks and smaller property business through binders.",
        "Business interruption losses can exceed the cost of the physical damage, within the indemnity period.",
        "Catastrophe accumulation is the central risk in property insurance, managed with aggregates and models."
      ]
    },
    {
      title: "Casualty and financial lines",
      minutes: 7,
      keys: ["Liability", "PI and D&O", "Long-tail", "Cyber"],
      intro: "Casualty insurance covers the sums a business must pay to others for harm it has caused. What makes it hard is time: claims can surface decades later. The second diagram turns to cyber, where the worry is not time but scale.",
      diagram: [
        {
          name: "Liability",
          cols: 2,
          nodes: [
            {
              id: "biz", at: [1, 1], span: 2, tone: "ink", label: "A business harms others", sub: "Injury, damage or financial loss",
              teach: "**Casualty** insurance covers liability: what a business must pay to others for injury, damage or financial loss it has caused. The insured’s own property isn’t the point; its legal responsibility is."
            },
            {
              id: "gl", at: [2, 1], label: "General liability", sub: "Injury and damage",
              teach: "**General liability** covers injury to third parties and damage to their property, often for large companies and written as excess layers above local primary policies. **Medical malpractice**, claims against doctors and hospitals, is a close relative."
            },
            {
              id: "fl", at: [2, 2], label: "Financial lines", sub: "PI, D&O, FI",
              teach: "**Professional indemnity** (PI) covers claims for negligent advice or services, against lawyers, accountants or architects. **Directors’ and officers’** (D&O) protects directors against claims arising from their decisions, including shareholder class actions. **Financial institutions** (FI) packages bundle crime, PI and D&O for banks and asset managers."
            },
            {
              id: "tail", at: [3, 1], span: 2, tone: "brass", label: "Long tail", sub: "Claims emerge years later",
              teach: "Casualty business is **long-tail**: claims may be made years or decades after the policy period. Asbestos is the classic example, with illnesses diagnosed long after the exposure.\n\nSo an insurer may still hold reserves for a liability policy written twenty years ago.",
              like: "Short-tail business is like a parking ticket: you soon know whether you have one and what it costs. Long-tail business is like a slow leak behind a wall: the damage began years ago, and only now are you finding out what it will cost to repair."
            },
            {
              id: "social", at: [4, 1], tone: "bad", label: "Social inflation", sub: "Rising awards and costs",
              teach: "**Social inflation** is the rising cost of jury awards, settlements and litigation, particularly in the United States. It compounds year after year over a long tail, so a reserve set at today’s prices can prove badly short. The model shows how quickly that adds up."
            },
            {
              id: "reserve", at: [4, 2], label: "Reserving", sub: "Estimating the unknown",
              teach: "Long tails make **reserving**, estimating what claims will finally cost, much harder. Module 08 explains how actuaries estimate claims incurred but not yet reported."
            }
          ],
          edges: [
            { from: "biz", to: "gl", label: "injury", at: 0.7, teach: "Physical harm to others falls under general liability." },
            { from: "biz", to: "fl", label: "advice", at: 0.7, teach: "Financial harm from advice or decisions falls under financial lines." },
            { from: "gl", to: "tail", teach: "Injury claims, especially from disease, can emerge decades later." },
            { from: "fl", to: "tail", teach: "Negligent advice may only come to light years afterwards." },
            { from: "tail", to: "social", label: "exposed to", teach: "The longer claims take, the longer inflation has to compound." },
            { from: "tail", to: "reserve", label: "complicates", teach: "Uncertain timing and cost make reserves hard to set." }
          ]
        },
        {
          name: "Cyber",
          intro: "Cyber is one of London’s fastest-growing classes. The challenge here isn’t a long tail, but the chance that one event hits thousands of policyholders at once.",
          cols: 2,
          nodes: [
            {
              id: "firm", at: [1, 1], span: 2, tone: "ink", label: "A firm’s systems", sub: "Data, networks, suppliers",
              teach: "**Cyber** insurance covers losses from data breaches, ransomware and IT outages, together with the liabilities that follow. Almost every business now depends on systems that can be attacked or fail."
            },
            {
              id: "breach", at: [2, 1], label: "Data breach", sub: "Notification and liability",
              teach: "A **data breach** brings costs to investigate, notify customers and regulators, defend claims and restore systems, plus liability to the people whose data was exposed."
            },
            {
              id: "ransom", at: [2, 2], label: "Ransomware", sub: "Extortion and downtime",
              teach: "**Ransomware** locks a firm’s systems until a ransom is paid. The bigger cost is often the downtime: a business that can’t trade for weeks loses far more than the ransom demand."
            },
            {
              id: "systemic", at: [3, 1], span: 2, tone: "bad", label: "One attack, many victims", sub: "Systemic risk",
              teach: "Here is the worry. A flaw in widely used software, or an attack on a shared cloud provider, could hit thousands of policyholders in the same week. That is a **systemic** catastrophe, potentially too large for the market to absorb, and unlike a hurricane there is no geography to limit it."
            },
            {
              id: "state", at: [4, 1], span: 2, tone: "tint", label: "State-backed attacks excluded", sub: "Lloyd’s requirement",
              teach: "Lloyd’s requires syndicates to exclude losses arising from **state-backed cyber attacks** from standalone cyber policies. The concern is that such an attack, effectively an act of war in cyberspace, could cause a systemic catastrophe too large to insure."
            }
          ],
          edges: [
            { from: "firm", to: "breach", teach: "Stolen or exposed data is one family of cyber loss." },
            { from: "firm", to: "ransom", teach: "Extortion and downtime are another." },
            { from: "breach", to: "systemic", label: "if widespread", teach: "A breach of a shared supplier can hit many firms at once." },
            { from: "ransom", to: "systemic", label: "if widespread", teach: "A ransomware campaign can spread across thousands of businesses." },
            { from: "systemic", to: "state", label: "managed by", teach: "Excluding state-backed attacks keeps the worst systemic scenario outside standalone cyber cover." }
          ]
        }
      ],
      explore: "long-tail",
      think: { q: "Why might an insurer hold reserves for a liability policy written twenty years ago?", a: "Liability claims can emerge long after the policy period, for example when an illness caused by exposure to a hazardous substance is diagnosed decades later. Under an occurrence-based wording, the old policy in force when the exposure happened may still be liable." },
      takeaways: [
        "Casualty insurance covers liabilities to third parties, including financial lines such as PI and D&O.",
        "Long-tail claims may emerge many years after the policy period and are exposed to social inflation.",
        "Cyber is a major growth class, with concerns about systemic risk; state-backed attacks are excluded."
      ]
    },
    {
      title: "Specialty",
      minutes: 5,
      keys: ["Political risk", "K&R", "Contingency", "Fine art"],
      intro: "London’s reputation for insuring the unusual rests on its specialty classes. There is no data-rich, off-the-peg version of most of these risks. Look across the columns, and then at what they all have in common at the bottom.",
      diagram: {
        cols: 3,
        nodes: [
          {
            id: "unusual", at: [1, 1], span: 3, tone: "ink", label: "The unusual", sub: "Risks with no off-the-peg policy",
            teach: "Specialty classes protect against risks most insurers won’t touch: governments seizing assets, kidnappers, a festival called off, a racehorse falling ill. Each needs a specialist who understands the peril itself."
          },
          {
            id: "political", at: [2, 1], label: "Political risk", sub: "Seizure, inconvertibility",
            teach: "**Political risk** covers companies investing or trading abroad against confiscation, expropriation, contract frustration and currency inconvertibility. The peril is a government’s decision, not a natural event."
          },
          {
            id: "terror", at: [2, 2], label: "Terrorism and PV", sub: "Riots, war on land",
            teach: "**Terrorism and political violence** covers damage from terrorism, riots, civil commotion, insurrection and war on land, often as standalone cover alongside a property programme."
          },
          {
            id: "contingency", at: [2, 3], label: "Contingency", sub: "Events cancelled",
            teach: "**Contingency** covers event cancellation and non-appearance, when a festival, conference or sporting event is called off or a star can’t perform. The pandemic was a defining event, producing large losses worldwide; many wordings now exclude communicable disease."
          },
          {
            id: "credit", at: [3, 1], label: "Trade credit", sub: "Buyers who don’t pay",
            teach: "**Trade credit** covers non-payment by buyers or borrowers. It is a close cousin of political risk: both protect a company whose money is in someone else’s hands."
          },
          {
            id: "kr", at: [3, 2], label: "Kidnap and ransom", sub: "And crisis response",
            teach: "**Kidnap and ransom** (K&R) covers ransom payments, the fees of crisis consultants and related costs. Much of the value lies in the expert response teams the policy gives access to."
          },
          {
            id: "art", at: [3, 3], label: "Fine art and bloodstock", sub: "Unique valuables",
            teach: "**Fine art and specie** covers collections, museums, galleries and valuables; **bloodstock** covers racehorses and other high-value animals. **Accident and health** covers such as sports injury sit in this world too."
          },
          {
            id: "judgement", at: [4, 1], span: 3, tone: "tint", label: "Judgement over data", sub: "Each policy cut to fit",
            teach: "What unites these classes is scarce data and bespoke wordings. Many specialty risks have little loss history, so pricing depends on underwriting judgement, and a single major event, like the pandemic, can reshape a class’s wordings overnight.",
            like: "Specialty underwriters are like bespoke tailors. There’s no off-the-peg size for insuring a racing driver’s contract or a mine in an unstable country, so each policy is cut to fit."
          }
        ],
        edges: [
          { from: "unusual", to: "political", teach: "Governments’ decisions are one kind of unusual risk." },
          { from: "unusual", to: "terror", teach: "Violence and unrest are another." },
          { from: "unusual", to: "contingency", teach: "Events that might not happen are a third." },
          { from: "political", to: "credit", label: "cousin", teach: "Both protect money in the hands of a foreign buyer, borrower or government." },
          { from: "terror", to: "kr", label: "cousin", teach: "Both deal with deliberate violence, against property or people." },
          { from: "contingency", to: "art", label: "cousin", teach: "Both insure one-off, hard-to-replace values." },
          { from: "credit", to: "judgement", teach: "Credit risk depends on judging buyers and countries." },
          { from: "kr", to: "judgement", teach: "K&R depends on expert knowledge of the regions and the perpetrators." },
          { from: "art", to: "judgement", teach: "Unique objects and animals have no actuarial tables." }
        ]
      },
      takeaways: [
        "Specialty classes include political risk, trade credit, terrorism, K&R, contingency, fine art and bloodstock.",
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
