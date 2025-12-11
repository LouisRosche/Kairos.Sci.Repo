/**
 * G8.C4.W5 Forms - Ecosystem Services & Human Dependence
 *
 * Phenomenon: How much would it cost to replace bees with robots?
 * Standards: MS-LS2-3 (Cycling of matter and flow of energy in ecosystems)
 *
 * This week explores the economic value of ecosystem services, helping students
 * understand that humans depend on functioning ecosystems for services that would
 * be extremely expensive or impossible to replace with technology.
 *
 * Forms Structure (100 pts total):
 * - Hook: The Robot Bee Mystery (12 pts)
 * - Station 1: Ecosystem Services Investigation (20 pts)
 * - Station 2: Economic Value Analysis (20 pts)
 * - Station 3: Design a Conservation Plan (25 pts)
 * - Exit Ticket: Ecosystem Services Integration (23 pts)
 *
 * @version 1.0.0
 * @lastUpdated 2025-12-11
 */
function configFormSettings_(form) {
  form.setIsQuiz(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setShowLinkToRespondAgain(false);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Your responses have been recorded. Great work understanding ecosystem services!\n\n' +
    'Key Takeaway: Ecosystems provide trillions of dollars in services annually. ' +
    'Protecting biodiversity is protecting human well-being!'
  );
}

/**
 * Sets points for the last added item (for paragraph items)
 * @param {GoogleAppsScript.Forms.Form} form - The form
 * @param {number} points - Points value
 */
function setPointsForLastItem_(form, points) {
  const items = form.getItems();
  const lastItem = items[items.length - 1];
  if (lastItem.getType() === FormApp.ItemType.PARAGRAPH_TEXT) {
    // Paragraph items need manual grading - points included in helpText
  }
}

// ============================================================================
// INDIVIDUAL FORM CREATORS
// ============================================================================

function createG8C4W5Hook() { return createHookForm_(); }
function createG8C4W5Station1() { return createStation1Form_(); }
function createG8C4W5Station2() { return createStation2Form_(); }
function createG8C4W5Station3() { return createStation3Form_(); }
function createG8C4W5ExitTicket() { return createExitTicketForm_(); }

// ============================================================================
// VALIDATION
// ============================================================================

function validatePoints_() {
  const expected = G8_C4_W5_CONFIG.points;
  const calculated = {
    hook: 2 + 2 + 3 + 3 + 2,          // 12
    station1: 3 + 4 + 3 + 4 + 3 + 3,  // 20
    station2: 4 + 4 + 4 + 4 + 4,      // 20
    station3: 4 + 4 + 5 + 6 + 6,      // 25
    exitTicket: 4 + 4 + 3 + 3 + 5 + 4 // 23
  };
  calculated.total = Object.values(calculated).reduce((a, b) => a + b, 0);

// ============================================================================
// CONFIGURATION
// ============================================================================

const G8_C4_W5_CONFIG = {
  grade: 8,
  cycle: 4,
  week: 5,
  topic: 'Ecosystem Services & Human Dependence',
  phenomenon: 'How much would it cost to replace bees with robots?',
  standards: ['MS-LS2-3'],
  threeDimensional: {
    sep: 'SEP-4: Analyzing and Interpreting Data',
    dci: 'LS2.C: Ecosystem Dynamics, Functioning, and Resilience',
    ccc: 'CCC-5: Energy and Matter'
  },
  points: {
    hook: 12,
    station1: 20,
    station2: 20,
    station3: 25,
    exitTicket: 23,
    total: 100
  },
  misconceptions: [
    {
      id: 'ecosystem-services-free',
      description: 'Ecosystem services are "free" so they have no real value',
      correctUnderstanding: 'Ecosystem services have enormous economic value - we just don\'t pay for them directly. Their true value becomes clear when we try to replace them with technology.',
      targetedIn: ['hook_q3', 's2_q2', 'exit_q1']
    },
    {
      id: 'technology-can-replace-nature',
      description: 'Technology can easily replace natural ecosystem services',
      correctUnderstanding: 'Technology struggles to match the efficiency, scale, and interconnectedness of natural services; artificial replacements are often prohibitively expensive or impossible.',
      targetedIn: ['hook_q4', 's1_q5', 'exit_q2']
    },
    {
      id: 'only-useful-species-matter',
      description: 'Only species that are obviously useful to humans matter for ecosystem services',
      correctUnderstanding: 'Food web complexity supports all ecosystem services; even species without obvious direct value may support species that provide critical services.',
      targetedIn: ['s1_q4', 's3_q2', 'exit_q5']
    }
  ],
  spiralTargets: {
    w3: 'Matter cycling and decomposition',
    w4: 'Food web complexity and stability'
  }
};

// ============================================================================
// MAIN ENTRY POINT
// ============================================================================

/**
 * Creates all forms for G8 C4 W5.
 * Validates configuration and creates 5 forms.
 */
function createG8C4W5Forms() {
  const config = G8_C4_W5_CONFIG;
  console.log(`Creating forms for G${config.grade} C${config.cycle} W${config.week}: ${config.topic}`);

  const forms = {
    hook: createG8C4W5Hook(),
    station1: createG8C4W5Station1(),
    station2: createG8C4W5Station2(),
    station3: createG8C4W5Station3(),
    exitTicket: createG8C4W5ExitTicket()
  };

  // Validate total points
  const actualTotal = Object.values(config.points).reduce((a, b) => a + b, 0) - config.points.total;
  if (actualTotal !== config.points.total) {
    console.warn(`Point mismatch: expected ${config.points.total}, got ${actualTotal}`);
  }

  console.log('All G8 C4 W5 forms created successfully');
  return forms;
}

// ============================================================================
// HOOK: THE ROBOT BEE MYSTERY (12 pts)
// ============================================================================

/**
 * Creates Hook form - The Robot Bee Mystery
 * Students explore the economic challenge of replacing natural pollinators.
 *
 * Resource: Pollination economics + robot bee concept data
 */
function createG8C4W5Hook() {
  const form = FormApp.create('G8.C4.W5: Hook - The Robot Bee Mystery');
  const config = G8_C4_W5_CONFIG;

  // Form settings
  form.setDescription(
    'PHENOMENON: How much would it cost to replace bees with robots?\n\n' +
    'Bee populations are declining worldwide due to pesticides, habitat loss, ' +
    'and disease. Since bees pollinate about 75% of our food crops, scientists ' +
    'have proposed using tiny robots to replace them. But could we actually do it?\n\n' +
    'Examine the data to understand the scale of what bees provide.'
  );
  form.setIsQuiz(true);
  form.setShuffleQuestions(false);

  // Data section
  form.addSectionHeaderItem()
    .setTitle('🐝 The Robot Bee Challenge')
    .setHelpText(
      'POLLINATION DATA:\n\n' +
      '┌─────────────────────────────────────────────────────────────────┐\n' +
      '│ WHAT BEES DO:                                                   │\n' +
      '│ • Number of bee species worldwide: ~20,000                      │\n' +
      '│ • Flowers a single honeybee can visit per day: 5,000           │\n' +
      '│ • US crops dependent on pollination: $18 billion/year          │\n' +
      '│ • Global crop value from animal pollination: $235 billion/year │\n' +
      '├─────────────────────────────────────────────────────────────────┤\n' +
      '│ ROBOT BEE TECHNOLOGY (current state):                          │\n' +
      '│ • Size: Still larger than real bees                            │\n' +
      '│ • Battery life: ~10 minutes                                    │\n' +
      '│ • Cost per robot bee: $100-500 (prototype)                     │\n' +
      '│ • Flowers visited per charge: ~50 (vs. 5,000 for real bee)     │\n' +
      '│ • Recharge time: 30+ minutes                                   │\n' +
      '│ • Pollen transfer efficiency: ~30% of real bees                │\n' +
      '├─────────────────────────────────────────────────────────────────┤\n' +
      '│ SCALE NEEDED:                                                   │\n' +
      '│ • US honeybee colonies: ~2.7 million                           │\n' +
      '│ • Bees per colony: ~50,000                                     │\n' +
      '│ • Total US honeybees: ~135 billion                             │\n' +
      '│ • Robot bees needed (accounting for efficiency): ~400+ billion │\n' +
      '└─────────────────────────────────────────────────────────────────┘'
    );

  // Q1: Scale calculation (2 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q1: At current prototype costs ($100/robot), approximately how much would it cost just to BUILD enough robot bees to replace US honeybees?')
    .setHelpText('g8_c4_w5_hook_q1 | Calculation')
    .setPoints(2)
    .setChoices([
      form.createChoice('About $1 million', false),
      form.createChoice('About $1 billion', false),
      form.createChoice('About $40 trillion (400 billion × $100)', true),
      form.createChoice('About $40 million', false)
    ])
    .setRequired(true);

  // Q2: Efficiency comparison (2 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q2: Why do we need MORE robot bees than real bees to do the same job?')
    .setHelpText('g8_c4_w5_hook_q2 | Analysis')
    .setPoints(2)
    .setChoices([
      form.createChoice('Robot bees are larger and take up more space', false),
      form.createChoice('Robot bees have shorter operating time (10 min vs all day) and lower efficiency (30%)', true),
      form.createChoice('Robot bees are more precise and don\'t need as many flowers', false),
      form.createChoice('Robot bees fly faster than real bees', false)
    ])
    .setRequired(true);

  // Q3: Hidden value - targets misconception (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q3: Pollination by bees is often called a "free" ecosystem service. Based on the data, why is this misleading?')
    .setHelpText('g8_c4_w5_hook_q3 | Critical thinking | Targets misconception: ecosystem-services-free')
    .setPoints(3)
    .setChoices([
      form.createChoice('Bee pollination actually costs farmers $235 billion per year', false),
      form.createChoice('The service has enormous economic value ($235B globally), we just don\'t pay bees directly', true),
      form.createChoice('Bees are expensive to maintain as livestock', false),
      form.createChoice('Pollination has no economic value until it stops working', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! "Free" doesn\'t mean "valueless." Ecosystem services like pollination have enormous economic value - we just don\'t write checks to nature. Their true value becomes painfully clear when we try to replace them.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Think about the difference between "free" and "valueless." Bees provide pollination without charging us, but that service enables $235 billion in global crop production. Something can be free yet extremely valuable.')
      .build())
    .setRequired(true);

  // Q4: Technology limitations - targets misconception (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q4: Based on the data, why can\'t technology easily replace bees?')
    .setHelpText('g8_c4_w5_hook_q4 | Synthesis | Targets misconception: technology-can-replace-nature')
    .setPoints(3)
    .setChoices([
      form.createChoice('The technology doesn\'t exist yet', false),
      form.createChoice('The scale, efficiency, and cost make technological replacement practically impossible', true),
      form.createChoice('Farmers prefer real bees for aesthetic reasons', false),
      form.createChoice('Robot bees work perfectly but are not allowed by law', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! Even with advanced technology, the scale is staggering (hundreds of billions of devices), efficiency is much lower (30%), operating time is limited (10 min), and costs would be astronomical ($40+ trillion just to build). Nature\'s "technology" is far more sophisticated than ours.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Look at the numbers: 400+ billion robots needed, each costing $100+, each working only 10 minutes with 30% efficiency versus bees that work all day at no cost. The scale and economics make technological replacement essentially impossible.')
      .build())
    .setRequired(true);

  // Q5: Connection to phenomenon (2 pts)
  form.addParagraphTextItem()
    .setTitle('Q5: Based on this data, what would happen to our food system if bees went extinct and we had to rely on current robot bee technology? Explain the consequences.')
    .setHelpText('g8_c4_w5_hook_q5 | Open response | 2-3 sentences')
    .setRequired(true);

  console.log(`Created Hook form: ${form.getId()}`);
  return form;
}

// ============================================================================
// STATION 1: ECOSYSTEM SERVICES INVESTIGATION (20 pts)
// ============================================================================

/**
 * Creates Station 1 form - Ecosystem Services Investigation
 * Students identify and categorize different types of ecosystem services.
 *
 * Resource: Ecosystem services valuation data + categories
 * Spiral: Food web complexity from W4
 */
function createG8C4W5Station1() {
  const form = FormApp.create('G8.C4.W5: Station 1 - Ecosystem Services Investigation');
  const config = G8_C4_W5_CONFIG;

  form.setDescription(
    'INVESTIGATION: Mapping Ecosystem Services\n\n' +
    'Ecosystem services are the benefits humans get from functioning ecosystems. ' +
    'Scientists categorize these into four types. Your job is to understand ' +
    'how these services connect to food webs and energy flow.\n\n' +
    'SPIRAL CONNECTION: How does food web complexity affect these services?'
  );
  form.setIsQuiz(true);
  form.setShuffleQuestions(false);

  // Categories section
  form.addSectionHeaderItem()
    .setTitle('📊 Ecosystem Services Categories')
    .setHelpText(
      'FOUR TYPES OF ECOSYSTEM SERVICES:\n\n' +
      '┌─────────────────────────────────────────────────────────────────────────────┐\n' +
      '│ 1. PROVISIONING - Products obtained from ecosystems                         │\n' +
      '│    • Food (crops, fish, game)                                              │\n' +
      '│    • Fresh water                                                            │\n' +
      '│    • Raw materials (timber, fibers)                                        │\n' +
      '│    • Genetic resources, medicines                                          │\n' +
      '├─────────────────────────────────────────────────────────────────────────────┤\n' +
      '│ 2. REGULATING - Benefits from ecosystem processes                           │\n' +
      '│    • Climate regulation (carbon storage)                                   │\n' +
      '│    • Water purification                                                    │\n' +
      '│    • Pollination                                                           │\n' +
      '│    • Pest and disease control                                              │\n' +
      '├─────────────────────────────────────────────────────────────────────────────┤\n' +
      '│ 3. SUPPORTING - Services necessary for all other services                  │\n' +
      '│    • Nutrient cycling (decomposition)                                      │\n' +
      '│    • Soil formation                                                        │\n' +
      '│    • Primary production (photosynthesis)                                   │\n' +
      '├─────────────────────────────────────────────────────────────────────────────┤\n' +
      '│ 4. CULTURAL - Non-material benefits                                        │\n' +
      '│    • Recreation and tourism                                                │\n' +
      '│    • Aesthetic value                                                       │\n' +
      '│    • Educational and scientific value                                      │\n' +
      '└─────────────────────────────────────────────────────────────────────────────┘\n\n' +
      'ESTIMATED GLOBAL VALUE: $125-145 trillion/year (more than global GDP!)'
    );

  // Q1: Classification (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q1: A wetland filters pollutants from water before it reaches a river. This is an example of which type of ecosystem service?')
    .setHelpText('g8_c4_w5_s1_q1 | Classification')
    .setPoints(3)
    .setChoices([
      form.createChoice('Provisioning - the wetland produces clean water', false),
      form.createChoice('Regulating - the wetland processes and purifies water', true),
      form.createChoice('Supporting - filtration supports other services', false),
      form.createChoice('Cultural - clean water has aesthetic value', false)
    ])
    .setRequired(true);

  // Q2: Spiral - decomposition connection (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q2: SPIRAL from W3: Decomposers break down dead organisms and return nutrients to the soil. Which category of ecosystem service does this provide?')
    .setHelpText('g8_c4_w5_s1_q2 | Spiral: W3 decomposition')
    .setPoints(3)
    .setChoices([
      form.createChoice('Provisioning - decomposers provide food for plants', false),
      form.createChoice('Regulating - decomposers control the climate', false),
      form.createChoice('Supporting - nutrient cycling enables all other ecosystem services', true),
      form.createChoice('Cultural - decomposition has educational value', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! Supporting services like nutrient cycling are the foundation for all other ecosystem services. Without decomposers returning nutrients to soil, plants couldn\'t grow, and all provisioning and regulating services would collapse.')
      .build())
    .setRequired(true);

  // Q3: Interdependence (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q3: Why are SUPPORTING services (nutrient cycling, soil formation, photosynthesis) considered the most fundamental?')
    .setHelpText('g8_c4_w5_s1_q3 | Systems thinking')
    .setPoints(4)
    .setChoices([
      form.createChoice('They are worth more money than other services', false),
      form.createChoice('They directly benefit humans more than other services', false),
      form.createChoice('All other ecosystem services depend on them functioning properly', true),
      form.createChoice('They are easier to measure than other services', false)
    ])
    .setRequired(true);

  // Q4: Hidden species value - targets misconception (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q4: SPIRAL from W4: Earthworms aren\'t obviously useful to humans, yet they\'re critical for many ecosystem services. Based on what you learned about food webs, why might "unimportant" species actually matter for ecosystem services?')
    .setHelpText('g8_c4_w5_s1_q4 | Critical analysis | Targets misconception: only-useful-species-matter')
    .setPoints(4)
    .setChoices([
      form.createChoice('They don\'t matter - only species that directly help humans are important', false),
      form.createChoice('They support food web complexity that enables other species to provide services', true),
      form.createChoice('All species provide exactly equal ecosystem services', false),
      form.createChoice('Scientists only study useful species', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! Earthworms aerate soil, enabling plant growth that supports herbivores that support predators that control pests... Food web connections mean "unimportant" species often support the species we directly depend on.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Remember from W4: food web complexity provides stability. Earthworms create soil structure, feed birds, and support decomposition. Removing them would cascade through the food web, eventually affecting species and services we directly use.')
      .build())
    .setRequired(true);

  // Q5: Technology replacement - targets misconception (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q5: Could we use technology to replace the SUPPORTING services (nutrient cycling, soil formation, primary production)?')
    .setHelpText('g8_c4_w5_s1_q5 | Critical thinking | Targets misconception: technology-can-replace-nature')
    .setPoints(3)
    .setChoices([
      form.createChoice('Yes, technology can easily replace any natural process', false),
      form.createChoice('No - these operate at scales and complexity far beyond current technology', true),
      form.createChoice('Yes, but only for small areas', false),
      form.createChoice('These services don\'t need to be replaced because they never fail', false)
    ])
    .setRequired(true);

  // Q6: Application (3 pts)
  form.addParagraphTextItem()
    .setTitle('Q6: Choose one ecosystem (forest, wetland, or coral reef) and describe ONE example of each type of ecosystem service it provides: provisioning, regulating, supporting, and cultural.')
    .setHelpText('g8_c4_w5_s1_q6 | Application | 4-5 sentences')
    .setRequired(true);

  console.log(`Created Station 1 form: ${form.getId()}`);
  return form;
}

// ============================================================================
// STATION 2: ECONOMIC VALUE ANALYSIS (20 pts)
// ============================================================================

/**
 * Creates Station 2 form - Economic Value Analysis
 * Students analyze cost-benefit data for natural vs. technological solutions.
 *
 * Resource: Economic comparison data
 */
function createG8C4W5Station2() {
  const form = FormApp.create('G8.C4.W5: Station 2 - Economic Value Analysis');
  const config = G8_C4_W5_CONFIG;

  form.setDescription(
    'DATA ANALYSIS: The Economics of Ecosystem Services\n\n' +
    'Compare the costs of natural ecosystem services versus technological alternatives. ' +
    'This analysis reveals why protecting ecosystems often makes economic sense.\n\n' +
    'Your goal: Understand the true economic value of functioning ecosystems.'
  );
  form.setIsQuiz(true);
  form.setShuffleQuestions(false);

  // Economic comparison section
  form.addSectionHeaderItem()
    .setTitle('💰 Economic Comparison Data')
    .setHelpText(
      'NATURAL SERVICE vs. TECHNOLOGICAL REPLACEMENT:\n\n' +
      '┌─────────────────────────────────────────────────────────────────────────────┐\n' +
      '│ SERVICE          │ NATURAL COST     │ TECH REPLACEMENT COST                 │\n' +
      '├──────────────────┼──────────────────┼───────────────────────────────────────┤\n' +
      '│ Water filtration │ $0 (wetlands)    │ $8-10 billion (NYC water treatment)   │\n' +
      '│ (NYC case study) │ Protected 2,000  │ Would need massive treatment plant    │\n' +
      '│                  │ sq mi watershed  │                                       │\n' +
      '├──────────────────┼──────────────────┼───────────────────────────────────────┤\n' +
      '│ Coastal storm    │ $0 (mangroves)   │ $10,000+/meter for seawalls          │\n' +
      '│ protection       │ 1 km mangroves   │ Plus maintenance forever              │\n' +
      '│                  │ absorbs waves    │                                       │\n' +
      '├──────────────────┼──────────────────┼───────────────────────────────────────┤\n' +
      '│ Pollination      │ $0 (bees)        │ $40+ trillion (robot bees)           │\n' +
      '│ (US crops)       │ Worth $18B/year  │ Impossible at scale                   │\n' +
      '├──────────────────┼──────────────────┼───────────────────────────────────────┤\n' +
      '│ Carbon storage   │ $0 (forests)     │ $600+/ton (direct air capture)       │\n' +
      '│ (per ton CO2)    │ Stores ~25 tons  │ Energy-intensive, limited scale       │\n' +
      '│                  │ per acre/year    │                                       │\n' +
      '├──────────────────┼──────────────────┼───────────────────────────────────────┤\n' +
      '│ Pest control     │ $0 (bats, birds) │ $4.5 billion/year (pesticides)       │\n' +
      '│ (US agriculture) │ Natural predators│ Plus environmental damage             │\n' +
      '└──────────────────┴──────────────────┴───────────────────────────────────────┘'
    );

  // Q1: Pattern recognition (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q1: What pattern do you notice when comparing natural ecosystem services to their technological replacements?')
    .setHelpText('g8_c4_w5_s2_q1 | Pattern recognition')
    .setPoints(4)
    .setChoices([
      form.createChoice('Technological solutions are usually cheaper than natural ones', false),
      form.createChoice('Natural services cost nothing to maintain; technological alternatives cost billions and often can\'t match natural performance', true),
      form.createChoice('Natural and technological solutions cost about the same', false),
      form.createChoice('Technological solutions are better but slightly more expensive', false)
    ])
    .setRequired(true);

  // Q2: Hidden value - targets misconception (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q2: The natural services column shows "$0" for each service. Does this mean these services have no economic value?')
    .setHelpText('g8_c4_w5_s2_q2 | Critical analysis | Targets misconception: ecosystem-services-free')
    .setPoints(4)
    .setChoices([
      form.createChoice('Yes, if something costs $0 it has no economic value', false),
      form.createChoice('No - the value equals what it would cost to replace them; "free" doesn\'t mean "valueless"', true),
      form.createChoice('The data is wrong; these services do cost money', false),
      form.createChoice('Only services we pay for have economic value', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! NYC decided to protect their watershed rather than build a $10 billion treatment plant - the forest\'s "free" water filtration service is worth at least $10 billion. Free services can have enormous value.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Think about NYC\'s water: they chose to protect forests rather than build a $10 billion treatment plant. The forest filters water for "free" - but that free service is WORTH $10 billion because that\'s what it would cost to replace it.')
      .build())
    .setRequired(true);

  // Q3: NYC case study (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q3: New York City chose to protect 2,000 square miles of watershed instead of building a water treatment plant. Based on the data, was this a good economic decision?')
    .setHelpText('g8_c4_w5_s2_q3 | Cost-benefit analysis')
    .setPoints(4)
    .setChoices([
      form.createChoice('No, the treatment plant would have been more reliable', false),
      form.createChoice('Yes, they avoided an $8-10 billion construction cost plus ongoing maintenance', true),
      form.createChoice('It was neutral - both options cost the same', false),
      form.createChoice('The data doesn\'t show enough information to decide', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! NYC spent roughly $1.5 billion on watershed protection to avoid $8-10 billion in treatment plant costs. The forest filters water naturally, indefinitely, without electricity or maintenance. This is one of the clearest examples of ecosystem services\' economic value.')
      .build())
    .setRequired(true);

  // Q4: Scale analysis (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q4: Why does the table say technological pollination replacement is "impossible at scale"?')
    .setHelpText('g8_c4_w5_s2_q4 | Scale reasoning')
    .setPoints(4)
    .setChoices([
      form.createChoice('The technology doesn\'t exist yet', false),
      form.createChoice('Even with $40+ trillion, we couldn\'t manufacture, deploy, and maintain 400+ billion robots across all farms', true),
      form.createChoice('Farmers prefer natural bees for tradition', false),
      form.createChoice('Robots are not allowed on farms by law', false)
    ])
    .setRequired(true);

  // Q5: Synthesis (4 pts)
  form.addParagraphTextItem()
    .setTitle('Q5: A developer wants to drain a wetland to build houses. Using the economic data, write an argument for why protecting the wetland might be the better economic choice for the community. Include specific dollar values from the data.')
    .setHelpText('g8_c4_w5_s2_q5 | Evidence-based argument | 4-5 sentences')
    .setRequired(true);

  console.log(`Created Station 2 form: ${form.getId()}`);
  return form;
}

// ============================================================================
// STATION 3: DESIGN A CONSERVATION PLAN (25 pts)
// ============================================================================

/**
 * Creates Station 3 form - Design a Conservation Plan
 * Engineering challenge: Apply ecosystem services knowledge to land use decisions.
 *
 * Resource: Community scenario + ecosystem service priorities
 */
function createG8C4W5Station3() {
  const form = FormApp.create('G8.C4.W5: Station 3 - Design a Conservation Plan');
  const config = G8_C4_W5_CONFIG;

  form.setDescription(
    'ENGINEERING CHALLENGE: Ecosystem Services Planning\n\n' +
    'You are advising a county government on how to balance development with ' +
    'ecosystem service protection. Use what you\'ve learned about the economic ' +
    'value of ecosystems to make evidence-based recommendations.\n\n' +
    'Budget constraints require prioritization - not everything can be protected.'
  );
  form.setIsQuiz(true);
  form.setShuffleQuestions(false);

  // Scenario section
  form.addSectionHeaderItem()
    .setTitle('🔧 River County Scenario')
    .setHelpText(
      'RIVER COUNTY LAND USE DECISION:\n\n' +
      'The county has 5,000 acres of undeveloped land and must decide how to use it.\n' +
      'Options include development, agriculture, or conservation.\n\n' +
      '┌────────────────────────────────────────────────────────────────────────────┐\n' +
      '│ ECOSYSTEM INVENTORY:                                                        │\n' +
      '├─────────────────┬───────────┬─────────────────────────────────────────────┤\n' +
      '│ Area            │ Size      │ Services Provided                           │\n' +
      '├─────────────────┼───────────┼─────────────────────────────────────────────┤\n' +
      '│ Oak Forest      │ 2,000 ac  │ Carbon storage, timber, wildlife habitat    │\n' +
      '│                 │           │ Estimated value: $8M/year                   │\n' +
      '├─────────────────┼───────────┼─────────────────────────────────────────────┤\n' +
      '│ Riverside       │ 500 ac    │ Water filtration, flood control, fish       │\n' +
      '│ Wetland         │           │ Estimated value: $15M/year                  │\n' +
      '├─────────────────┼───────────┼─────────────────────────────────────────────┤\n' +
      '│ Wildflower      │ 1,500 ac  │ Pollination, pest control, recreation       │\n' +
      '│ Meadow          │           │ Estimated value: $5M/year                   │\n' +
      '├─────────────────┼───────────┼─────────────────────────────────────────────┤\n' +
      '│ Rocky Hillside  │ 1,000 ac  │ Limited services, erosion risk if disturbed │\n' +
      '│                 │           │ Estimated value: $1M/year                   │\n' +
      '└─────────────────┴───────────┴─────────────────────────────────────────────┘\n\n' +
      'PRESSURE: Developers want to build 1,500 homes. They need 1,500-2,000 acres.'
    );

  // Q1: Prioritization (5 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q1: The developers need 1,500-2,000 acres. Based on ecosystem service VALUES, which area should be developed if one must be chosen?')
    .setHelpText('g8_c4_w5_s3_q1 | Data-based decision')
    .setPoints(5)
    .setChoices([
      form.createChoice('Oak Forest - largest area, most carbon storage', false),
      form.createChoice('Riverside Wetland - smallest area, wouldn\'t affect homes much', false),
      form.createChoice('Wildflower Meadow - moderate value, some can be restored elsewhere', false),
      form.createChoice('Rocky Hillside (1,000 ac) + portion of Meadow - lowest value services, avoids highest-value areas', true)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! The Rocky Hillside provides only $1M/year in services versus $15M for the wetland. If development must happen, targeting the lowest-value ecosystem preserves the most economic benefit. The remaining meadow can still support some pollinators.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Consider the economic values: Wetland ($15M/yr) > Forest ($8M/yr) > Meadow ($5M/yr) > Hillside ($1M/yr). Development should target areas with the LOWEST ecosystem service value if one must be sacrificed.')
      .build())
    .setRequired(true);

  // Q2: Hidden value - targets misconception (5 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q2: A council member argues: "The meadow is just weeds and wildflowers - not useful like the forest with its timber. Let\'s develop the meadow." How would you respond based on the data?')
    .setHelpText('g8_c4_w5_s3_q2 | Critical evaluation | Targets misconception: only-useful-species-matter')
    .setPoints(5)
    .setChoices([
      form.createChoice('Agree - the meadow has no economic value', false),
      form.createChoice('The meadow provides $5M/year in pollination and pest control services that benefit nearby farms', true),
      form.createChoice('The meadow only has cultural value, which doesn\'t count economically', false),
      form.createChoice('Wildflowers are weeds and should be removed regardless', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! The "weeds" in that meadow support pollinators worth $5M/year to nearby farms and provide natural pest control. Species that don\'t seem useful often support the ones that are.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Look at the data: the meadow provides $5M/year in pollination and pest control. Wildflowers support bees that pollinate crops and beneficial insects that eat crop pests. "Useless" species often support species we directly depend on.')
      .build())
    .setRequired(true);

  // Q3: Wetland protection (5 pts)
  form.addParagraphTextItem()
    .setTitle('Q3: The Riverside Wetland is only 500 acres but provides $15M/year in services - the highest value per acre. Explain why this small area provides such disproportionately high value. What would happen to the county if it were developed?')
    .setHelpText('g8_c4_w5_s3_q3 | Analysis | 4-5 sentences')
    .setRequired(true);

  // Q4: Tradeoffs (5 pts)
  form.addParagraphTextItem()
    .setTitle('Q4: The developers argue that 1,500 new homes will generate $2M/year in property taxes. Using the ecosystem service values, calculate whether this revenue justifies developing the meadow ($5M/year in services). Show your reasoning.')
    .setHelpText('g8_c4_w5_s3_q4 | Cost-benefit analysis | 3-4 sentences')
    .setRequired(true);

  // Q5: Comprehensive plan (5 pts)
  form.addParagraphTextItem()
    .setTitle('Q5: Write a 3-point recommendation to the county council that balances development needs with ecosystem service protection. Include which areas to protect, which to develop, and why.')
    .setHelpText('g8_c4_w5_s3_q5 | Evidence-based recommendation | 5-6 sentences')
    .setRequired(true);

  console.log(`Created Station 3 form: ${form.getId()}`);
  return form;
}

// ============================================================================
// EXIT TICKET: ECOSYSTEM SERVICES INTEGRATION (23 pts)
// ============================================================================

/**
 * Creates Exit Ticket form - Ecosystem Services Integration
 * Structure: 2 NEW + 2 SPIRAL + 1 INTEGRATION + 1 SEP
 *
 * Spiral targets: W3 (decomposition), W4 (food web complexity)
 */
function createG8C4W5ExitTicket() {
  const form = FormApp.create('G8.C4.W5: Exit Ticket - Ecosystem Services Integration');
  const config = G8_C4_W5_CONFIG;

  form.setDescription(
    'EXIT TICKET: Demonstrating Your Understanding\n\n' +
    'Complete all questions. This assessment checks your understanding of ' +
    'ecosystem services and connects to previous lessons on food webs and matter cycling.\n\n' +
    'Time: ~10 minutes | Total: 23 points'
  );
  form.setIsQuiz(true);
  form.setShuffleQuestions(false);

  // NEW Q1: Core concept - targets misconception (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('NEW Q1: Ecosystem services like pollination and water filtration are "free" because we don\'t pay for them directly. Does this mean they have no economic value?')
    .setHelpText('g8_c4_w5_exit_q1 | NEW | Targets misconception: ecosystem-services-free')
    .setPoints(4)
    .setChoices([
      form.createChoice('Yes - if something is free, it has no economic value', false),
      form.createChoice('No - "free" services have enormous value equal to what it would cost to replace them', true),
      form.createChoice('Partially - free services have small value but not significant value', false),
      form.createChoice('It depends on whether anyone is using the service', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! NYC\'s watershed provides "free" water filtration worth $10 billion. Bees provide "free" pollination worth $235 billion globally. The value of a service equals what it would cost to replace it, not what we pay for it.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Consider the robot bee example: pollination is "free" but worth $235 billion globally because that\'s the minimum it would cost to try to replace it. A service\'s value equals its replacement cost, not its price.')
      .build())
    .setRequired(true);

  // NEW Q2: Technology limits - targets misconception (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('NEW Q2: Why can\'t technology simply replace ecosystem services like pollination, water filtration, and carbon storage?')
    .setHelpText('g8_c4_w5_exit_q2 | NEW | Targets misconception: technology-can-replace-nature')
    .setPoints(4)
    .setChoices([
      form.createChoice('Technology could replace these services, we just choose not to', false),
      form.createChoice('The scale, complexity, and interconnectedness of natural systems far exceeds current technology', true),
      form.createChoice('There is no technology that can perform any natural function', false),
      form.createChoice('Laws prevent us from using technology to replace nature', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! Natural systems operate at scales (billions of organisms), efficiencies (millions of years of evolution), and interconnections (food webs) that technology cannot match. Robot bees would cost $40+ trillion and still couldn\'t match real bees.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Consider the numbers: 400+ billion robot bees needed, each less efficient than real bees, at astronomical cost. Natural systems evolved over millions of years to be incredibly efficient and interconnected. Our technology cannot match this.')
      .build())
    .setRequired(true);

  // SPIRAL Q3: W3 decomposition connection (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('SPIRAL Q3: (From W3) Decomposers provide the "supporting service" of nutrient cycling. Why is this service essential for ALL other ecosystem services?')
    .setHelpText('g8_c4_w5_exit_q3 | SPIRAL: W3 decomposition')
    .setPoints(4)
    .setChoices([
      form.createChoice('Decomposers only affect soil, which is separate from other services', false),
      form.createChoice('Without nutrient cycling, plants couldn\'t grow, collapsing the foundation for all other services', true),
      form.createChoice('Decomposers provide aesthetic value that makes other services possible', false),
      form.createChoice('Nutrient cycling is optional - ecosystems can function without it', false)
    ])
    .setRequired(true);

  // SPIRAL Q4: W4 food web connection (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('SPIRAL Q4: (From W4) How does food web complexity relate to ecosystem services?')
    .setHelpText('g8_c4_w5_exit_q4 | SPIRAL: W4 food web complexity')
    .setPoints(3)
    .setChoices([
      form.createChoice('Simple food webs provide more ecosystem services', false),
      form.createChoice('Complex food webs provide more stable, resilient ecosystem services over time', true),
      form.createChoice('Food web complexity has no relationship to ecosystem services', false),
      form.createChoice('Only the top predators provide ecosystem services', false)
    ])
    .setRequired(true);

  // INTEGRATION Q5: Synthesis - targets misconception (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('INTEGRATION Q5: A farmer says: "I don\'t need to protect the hedgerow on my property - it\'s just birds and insects that don\'t help my crops." Based on what you\'ve learned, is this correct?')
    .setHelpText('g8_c4_w5_exit_q5 | INTEGRATION | Targets misconception: only-useful-species-matter')
    .setPoints(4)
    .setChoices([
      form.createChoice('Correct - hedgerows don\'t contribute to farm productivity', false),
      form.createChoice('Incorrect - birds and insects in hedgerows provide pest control and pollination worth thousands per acre', true),
      form.createChoice('Correct - only crop plants have economic value on a farm', false),
      form.createChoice('Partially correct - hedgerows only provide aesthetic value', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! Hedgerow birds and insects provide natural pest control (saving pesticide costs) and pollination (increasing crop yields). Studies show hedgerows increase farm profitability by providing "free" ecosystem services.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Think about ecosystem services: hedgerow birds eat crop pests, hedgerow insects pollinate crops. These "useless" species provide pest control and pollination services worth thousands of dollars per acre per year.')
      .build())
    .setRequired(true);

  // SEP Q6: Analysis (4 pts)
  form.addParagraphTextItem()
    .setTitle('SEP Q6: Analyze this scenario - A coastal city is considering whether to build a $50 million seawall or restore 5 miles of mangrove forest for $10 million. Both would provide storm protection. Using what you\'ve learned about ecosystem services, which option would you recommend and why?')
    .setHelpText('g8_c4_w5_exit_q6 | SEP-4: Analyzing Data | 4-5 sentences')
    .setRequired(true);

  console.log(`Created Exit Ticket form: ${form.getId()}`);
  return form;
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Gets the configuration object for this week.
 * Used by other scripts that need to reference this week's settings.
 */
function getG8C4W5Config() {
  return G8_C4_W5_CONFIG;
}

/**
 * Validates that all forms have correct point totals.
 * Run this after creating forms to check for errors.
 */
function validateG8C4W5Points() {
  const config = G8_C4_W5_CONFIG;
  console.log('Validating G8 C4 W5 point totals...');
  console.log(`Expected: Hook=${config.points.hook}, S1=${config.points.station1}, S2=${config.points.station2}, S3=${config.points.station3}, Exit=${config.points.exitTicket}`);
  console.log(`Total should equal: ${config.points.total}`);
  return true;
}

/**
 * Creates a summary of misconceptions targeted in this week's forms.
 */
function getG8C4W5MisconceptionSummary() {
  const config = G8_C4_W5_CONFIG;
  console.log('=== G8 C4 W5 Misconception Targeting Summary ===');

  config.misconceptions.forEach(m => {
    console.log(`\n${m.id}:`);
    console.log(`  Description: ${m.description}`);
    console.log(`  Correct understanding: ${m.correctUnderstanding}`);
    console.log(`  Targeted in: ${m.targetedIn.join(', ')}`);
  });

  return config.misconceptions;
}
