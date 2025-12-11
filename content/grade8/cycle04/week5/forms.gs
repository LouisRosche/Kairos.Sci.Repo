/**
 * Grade 8 Cycle 4 Week 5: Ecosystem Services & Human Dependence
 * Standards: MS-LS2-5 (ecosystem services), MS-ESS3-3 (human impact)
 * Phenomenon: How much would it cost to replace bees with robots?
 *
 * Form Structure:
 * - Hook: The Robot Bee Mystery (12 pts)
 * - Station 1: Ecosystem Services Investigation (20 pts)
 * - Station 2: Economic Value Analysis (20 pts)
 * - Station 3: Design a Conservation Plan (25 pts)
 * - Exit Ticket: Ecosystem Services Integration (23 pts)
 *
 * Total: 100 points
 */

// ============================================================================
// CONFIGURATION
// ============================================================================

const G8_C4_W5_CONFIG = {
  grade: 8,
  cycle: 4,
  week: 5,
  topic: 'Ecosystem Services & Human Dependence',
  phenomenon: 'How much would it cost to replace bees with robots?',
  standards: ['MS-LS2-5', 'MS-ESS3-3'],
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
      id: 'nature-free',
      description: 'Students think ecosystem services are free and unlimited',
      targetedIn: ['hook_q3', 's2_q2']
    },
    {
      id: 'tech-can-replace',
      description: 'Students think technology can easily replace natural ecosystem services',
      targetedIn: ['s1_q4', 'exit_q2']
    },
    {
      id: 'only-food-matters',
      description: 'Students think ecosystems only provide food services',
      targetedIn: ['s1_q2', 'exit_q4']
    }
  ],
  spiralTargets: {
    w4: 'Food web complexity and stability',
    w3: 'Decomposition and matter cycling',
    w2: 'Invasive species and ecosystem disruption',
    w1: 'Energy pyramids and trophic levels'
  }
};

// ============================================================================
// MAIN ENTRY POINT
// ============================================================================

/**
 * Creates all forms for G8 C4 W5
 */
function createAllForms() {
  const results = {
    hook: createHookForm_(),
    station1: createStation1Form_(),
    station2: createStation2Form_(),
    station3: createStation3Form_(),
    exitTicket: createExitTicketForm_()
  };

  Logger.log('=== G8 C4 W5 Forms Created ===');
  Object.entries(results).forEach(([name, url]) => {
    Logger.log(`${name}: ${url}`);
  });

  return results;
}

// ============================================================================
// HOOK: THE ROBOT BEE MYSTERY (12 points)
// ============================================================================

function createHookForm_() {
  const form = FormApp.create('G8.C4.W5: Hook - The Robot Bee Mystery');
  configFormSettings_(form);

  form.setDescription(
    'Phenomenon: In some parts of China, bee populations have collapsed so severely that farmers must ' +
    'hand-pollinate apple trees using brushes - hiring thousands of workers to do what bees did for free. ' +
    'Scientists estimate that replacing bee pollination worldwide with robots or humans would cost ' +
    '$190-580 BILLION per year. Why are bees so hard to replace?\n\n' +
    'Points: 12 | Standards: MS-LS2-5, MS-ESS3-3'
  );

  // Q1: Initial observation (2 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q1: What is MOST surprising about the cost to replace bee pollination?')
    .setHelpText('Question ID: g8_c4_w5_hook_q1')
    .setChoices([
      form.createChoice('Bees exist', false),
      form.createChoice('A service we get "for free" from nature would cost hundreds of billions to replace', true),
      form.createChoice('Apples need pollination', false),
      form.createChoice('China has farms', false)
    ])
    .setRequired(true)
    .setPoints(2);

  // Q2: Prior knowledge connection (2 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q2: Based on Week 4, why might losing pollinators affect the entire food web, not just plants?')
    .setHelpText('Question ID: g8_c4_w5_hook_q2')
    .setChoices([
      form.createChoice('Pollinators only affect flowers', false),
      form.createChoice('Fewer plants means less energy entering the food web, affecting all trophic levels above', true),
      form.createChoice('Food webs don\'t include pollinators', false),
      form.createChoice('Plants don\'t connect to animals in food webs', false)
    ])
    .setRequired(true)
    .setPoints(2);

  // Q3: Misconception target - nature-free (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q3: A business owner says "Bees work for free, so pollination has no real economic value." What is WRONG with this reasoning?')
    .setHelpText('Question ID: g8_c4_w5_hook_q3 | Targets misconception: nature-free')
    .setChoices([
      form.createChoice('The reasoning is correct - natural services have no value', false),
      form.createChoice('Just because we don\'t pay for something doesn\'t mean it has no value - the replacement cost proves its worth', true),
      form.createChoice('Bees are actually paid by farmers', false),
      form.createChoice('Pollination doesn\'t affect business', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // Q4: Connections (3 pts)
  form.addParagraphTextItem()
    .setTitle('Q4: Pollination is just ONE service ecosystems provide. What are TWO other services you think healthy ecosystems might provide to humans?')
    .setHelpText('Question ID: g8_c4_w5_hook_q4 | 3 points: Two distinct ecosystem services identified')
    .setRequired(true);
  setPointsForLastItem_(form, 3);

  // Q5: Question generation (2 pts)
  form.addParagraphTextItem()
    .setTitle('Q5: What questions do you have about how humans depend on ecosystem services?')
    .setHelpText('Question ID: g8_c4_w5_hook_q5 | 2 points: Generate investigable questions')
    .setRequired(true);
  setPointsForLastItem_(form, 2);

  return form.getPublishedUrl();
}

// ============================================================================
// STATION 1: ECOSYSTEM SERVICES INVESTIGATION (20 points)
// ============================================================================

function createStation1Form_() {
  const form = FormApp.create('G8.C4.W5: Station 1 - Ecosystem Services Investigation');
  configFormSettings_(form);

  form.setDescription(
    'Explore the four categories of ecosystem services and identify how healthy ecosystems support human well-being.\n\n' +
    'Spiral Review: Food web complexity from Week 4\n' +
    'Points: 20 | Standards: MS-LS2-5'
  );

  // Scenario introduction
  form.addSectionHeaderItem()
    .setTitle('Categories of Ecosystem Services')
    .setHelpText('1. PROVISIONING: Products we get directly\n' +
                 '   - Food (fish, crops, livestock)\n' +
                 '   - Fresh water (filtration, storage)\n' +
                 '   - Raw materials (wood, fiber, fuel)\n' +
                 '   - Genetic resources (medicines)\n\n' +
                 '2. REGULATING: Benefits from ecosystem processes\n' +
                 '   - Climate regulation (carbon storage, cooling)\n' +
                 '   - Water purification (wetlands filtering)\n' +
                 '   - Pollination\n' +
                 '   - Pest & disease control\n\n' +
                 '3. SUPPORTING: Basic processes that enable all other services\n' +
                 '   - Nutrient cycling (decomposition)\n' +
                 '   - Soil formation\n' +
                 '   - Primary production (photosynthesis)\n\n' +
                 '4. CULTURAL: Non-material benefits\n' +
                 '   - Recreation & tourism\n' +
                 '   - Aesthetic beauty\n' +
                 '   - Spiritual value\n' +
                 '   - Education & research');

  // Q1: Classification (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q1: A forest absorbs CO2 and releases oxygen while cooling the local area. Which category of ecosystem service is this?')
    .setHelpText('Question ID: g8_c4_w5_s1_q1')
    .setChoices([
      form.createChoice('Provisioning (direct products)', false),
      form.createChoice('Regulating (benefits from ecosystem processes)', true),
      form.createChoice('Cultural (non-material benefits)', false),
      form.createChoice('None - this isn\'t an ecosystem service', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // Q2: Misconception target - only-food-matters (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q2: A developer says "This wetland is useless - you can\'t farm it or build on it." Looking at the ecosystem services framework, why is this reasoning INCOMPLETE?')
    .setHelpText('Question ID: g8_c4_w5_s1_q2 | Targets misconception: only-food-matters')
    .setChoices([
      form.createChoice('The developer is correct - wetlands have no value', false),
      form.createChoice('Wetlands provide water purification, flood control, wildlife habitat, and carbon storage - valuable regulating services', true),
      form.createChoice('Wetlands only matter for fishing', false),
      form.createChoice('Ecosystem services only count if you can sell products', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q3: Spiral - W4 connection (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q3: [SPIRAL W4] In Week 4, you learned that complex food webs are more stable. How does this relate to ecosystem services?')
    .setHelpText('Question ID: g8_c4_w5_s1_q3 | Spiral: W4 Food Web Stability')
    .setChoices([
      form.createChoice('Food web complexity has nothing to do with ecosystem services', false),
      form.createChoice('More stable ecosystems provide more reliable services; if food webs collapse, services collapse too', true),
      form.createChoice('Simple food webs provide better ecosystem services', false),
      form.createChoice('Ecosystem services don\'t depend on living organisms', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // Q4: Misconception target - tech-can-replace (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q4: An engineer says "We can build water treatment plants to replace wetland filtration, so we don\'t need natural wetlands." What does this reasoning MISS?')
    .setHelpText('Question ID: g8_c4_w5_s1_q4 | Targets misconception: tech-can-replace')
    .setChoices([
      form.createChoice('The engineer is completely correct', false),
      form.createChoice('Treatment plants only replace ONE service; wetlands also control flooding, store carbon, provide habitat, and maintain food webs', true),
      form.createChoice('Wetlands and treatment plants are identical', false),
      form.createChoice('Technology is always better than nature', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q5: Service identification (3 pts)
  form.addParagraphTextItem()
    .setTitle('Q5: For your local area, identify ONE example each of: (a) a provisioning service, (b) a regulating service, and (c) a supporting service provided by nearby ecosystems.')
    .setHelpText('Question ID: g8_c4_w5_s1_q5 | 3 points: Three correct examples in proper categories')
    .setRequired(true);
  setPointsForLastItem_(form, 3);

  // Q6: Interconnection (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q6: If decomposer populations crashed (supporting service), which other services would be affected?')
    .setHelpText('Question ID: g8_c4_w5_s1_q6')
    .setChoices([
      form.createChoice('No other services would be affected', false),
      form.createChoice('Nutrient cycling stops → soil fertility drops → plant growth declines → provisioning + regulating services collapse', true),
      form.createChoice('Only cultural services would be affected', false),
      form.createChoice('Decomposition is not connected to other services', false)
    ])
    .setRequired(true)
    .setPoints(3);

  return form.getPublishedUrl();
}

// ============================================================================
// STATION 2: ECONOMIC VALUE ANALYSIS (20 points)
// ============================================================================

function createStation2Form_() {
  const form = FormApp.create('G8.C4.W5: Station 2 - Economic Value Analysis');
  configFormSettings_(form);

  form.setDescription(
    'Analyze real economic data on ecosystem services to understand their true value.\n\n' +
    'Compare costs of natural vs. technological solutions.\n\n' +
    'Points: 20 | Standards: MS-LS2-5, MS-ESS3-3'
  );

  // Scenario introduction
  form.addSectionHeaderItem()
    .setTitle('Ecosystem Services Economic Data')
    .setHelpText('Global Ecosystem Service Values (annual estimates):\n\n' +
                 '• Pollination: $235-577 billion\n' +
                 '• Water purification by wetlands: $4.9 trillion\n' +
                 '• Coastal protection by mangroves: $65 billion\n' +
                 '• Carbon storage by forests: $2.4 trillion\n' +
                 '• Soil formation: $25 billion\n' +
                 '• Recreation & tourism: $6.6 trillion\n\n' +
                 'Technology Replacement Costs:\n' +
                 '• Water treatment plant: $300 million to build, $20 million/year to operate\n' +
                 '• Seawall (1 km): $5-15 million to build, $500K/year maintenance\n' +
                 '• Carbon capture facility: $100-600/tonne CO2 captured\n' +
                 '• Robot pollinator (prototype): $250,000 each, limited capacity');

  // Q1: Data interpretation (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q1: According to the data, which ecosystem service has the highest estimated annual value?')
    .setHelpText('Question ID: g8_c4_w5_s2_q1')
    .setChoices([
      form.createChoice('Pollination', false),
      form.createChoice('Recreation & tourism ($6.6 trillion)', true),
      form.createChoice('Soil formation', false),
      form.createChoice('Coastal protection', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q2: Misconception target - nature-free (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q2: Wetlands provide $4.9 trillion in water purification services annually. Why don\'t we normally "see" this value?')
    .setHelpText('Question ID: g8_c4_w5_s2_q2 | Targets misconception: nature-free')
    .setChoices([
      form.createChoice('Because wetlands don\'t actually provide this service', false),
      form.createChoice('Because nature provides this service without billing us - we only notice its value when it\'s lost or must be replaced', true),
      form.createChoice('Because economists made up these numbers', false),
      form.createChoice('Because water purification has no real value', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q3: Cost comparison (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q3: A city can either: (A) preserve a 500-acre wetland that naturally filters water, or (B) destroy it and build a water treatment plant. Beyond construction costs, what ONGOING expense does Option B have that Option A doesn\'t?')
    .setHelpText('Question ID: g8_c4_w5_s2_q3')
    .setChoices([
      form.createChoice('Option B has no additional costs', false),
      form.createChoice('$20 million per year for treatment plant operation vs. wetland self-maintenance', true),
      form.createChoice('Option A is more expensive long-term', false),
      form.createChoice('Both options have identical costs', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q4: Calculation (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q4: If a forest stores carbon worth $2.4 trillion globally and covering 4 billion hectares, what is the approximate carbon storage value per hectare?')
    .setHelpText('Question ID: g8_c4_w5_s2_q4 | Calculate: $2.4 trillion ÷ 4 billion hectares')
    .setChoices([
      form.createChoice('$60 per hectare', false),
      form.createChoice('$600 per hectare', true),
      form.createChoice('$6,000 per hectare', false),
      form.createChoice('$60,000 per hectare', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q5: Analysis (4 pts)
  form.addParagraphTextItem()
    .setTitle('Q5: A coastal city is considering whether to protect their mangrove forest or remove it for development. Using the data, make an economic argument for protecting the mangroves. Include at least TWO types of ecosystem services in your analysis.')
    .setHelpText('Question ID: g8_c4_w5_s2_q5 | 4 points: Economic argument citing multiple service values')
    .setRequired(true);
  setPointsForLastItem_(form, 4);

  return form.getPublishedUrl();
}

// ============================================================================
// STATION 3: DESIGN A CONSERVATION PLAN (25 points)
// ============================================================================

function createStation3Form_() {
  const form = FormApp.create('G8.C4.W5: Station 3 - Design a Conservation Plan');
  configFormSettings_(form);

  form.setDescription(
    'Apply your ecosystem services knowledge to design a conservation strategy.\n\n' +
    'Engineering Challenge: Maximize ecosystem service value within constraints.\n\n' +
    'Points: 25 | Standards: MS-LS2-5, MS-ESS3-3'
  );

  // Scenario introduction
  form.addSectionHeaderItem()
    .setTitle('Community Conservation Challenge')
    .setHelpText('Greenville (population 50,000) owns 10,000 acres of undeveloped land:\n' +
                 '• 4,000 acres: Forest (carbon storage, recreation)\n' +
                 '• 3,000 acres: Wetlands (water filtration, flood control)\n' +
                 '• 2,000 acres: Grassland (pollinator habitat, soil health)\n' +
                 '• 1,000 acres: Riparian corridor (connecting all ecosystems)\n\n' +
                 'A developer offers $50 million to buy ALL the land for housing.\n\n' +
                 'City Council questions:\n' +
                 '1. What ecosystem services would be lost?\n' +
                 '2. What would it cost to replace those services?\n' +
                 '3. Is there a middle path that preserves critical services?\n\n' +
                 'Your task: Advise the city council');

  // Q1: Service inventory (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q1: Which ecosystem type provides the MOST services that would be difficult to replace technologically?')
    .setHelpText('Question ID: g8_c4_w5_s3_q1')
    .setChoices([
      form.createChoice('Grassland (can be recreated easily)', false),
      form.createChoice('Wetlands (water filtration + flood control + habitat + carbon = multiple irreplaceable services)', true),
      form.createChoice('All ecosystems are equally easy to replace', false),
      form.createChoice('None of these ecosystems provide valuable services', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q2: Connectivity importance (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q2: The riparian corridor connects all ecosystems. If this 1,000 acres is developed, what happens to the other ecosystems\' ability to provide services?')
    .setHelpText('Question ID: g8_c4_w5_s3_q2')
    .setChoices([
      form.createChoice('Nothing - they function independently', false),
      form.createChoice('Isolated ecosystems become less stable and provide reduced services due to lost connectivity', true),
      form.createChoice('The other ecosystems would improve without the corridor', false),
      form.createChoice('Corridors have no ecological function', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q3: Conservation strategy (5 pts)
  form.addParagraphTextItem()
    .setTitle('Q3: Design a conservation plan that allows SOME development while preserving critical ecosystem services. Specify: (1) Which areas to protect (and why), (2) Which areas could be developed, and (3) What conditions or mitigation would be required.')
    .setHelpText('Question ID: g8_c4_w5_s3_q3 | 5 points: Strategic plan with clear priorities and reasoning')
    .setRequired(true);
  setPointsForLastItem_(form, 5);

  // Q4: Economic analysis (6 pts)
  form.addParagraphTextItem()
    .setTitle('Q4: Create a simple cost-benefit analysis: (1) Estimate the annual value of ecosystem services from the land (use data from Station 2), (2) Compare to the $50 million one-time payment, and (3) Make a recommendation to the city council with your reasoning.')
    .setHelpText('Question ID: g8_c4_w5_s3_q4 | 6 points: Calculation, comparison, and recommendation with reasoning')
    .setRequired(true);
  setPointsForLastItem_(form, 6);

  // Q5: Stakeholder communication (6 pts)
  form.addParagraphTextItem()
    .setTitle('Q5: A resident says "I don\'t care about birds and wetlands - I want cheaper housing!" How would you explain to this person why protecting ecosystem services actually benefits them economically and personally? Use specific examples.')
    .setHelpText('Question ID: g8_c4_w5_s3_q5 | 6 points: Persuasive explanation connecting ecosystem services to personal benefits')
    .setRequired(true);
  setPointsForLastItem_(form, 6);

  return form.getPublishedUrl();
}

// ============================================================================
// EXIT TICKET: ECOSYSTEM SERVICES INTEGRATION (23 points)
// ============================================================================

function createExitTicketForm_() {
  const form = FormApp.create('G8.C4.W5: Exit Ticket - Ecosystem Services Integration');
  configFormSettings_(form);

  form.setDescription(
    'Demonstrate your understanding of ecosystem services and their value to humans.\n\n' +
    'Structure: 2 New + 2 Spiral + 1 Integration + 1 SEP\n' +
    'Points: 23 | Standards: MS-LS2-5, MS-ESS3-3'
  );

  // NEW Q1: Core concept (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q1 [NEW]: Which of these is an example of a REGULATING ecosystem service?')
    .setHelpText('Question ID: g8_c4_w5_exit_q1')
    .setChoices([
      form.createChoice('Harvesting fish for food (provisioning)', false),
      form.createChoice('Wetlands filtering pollutants from water (regulating)', true),
      form.createChoice('Hiking in a national park (cultural)', false),
      form.createChoice('Decomposition creating soil (supporting)', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // NEW Q2: Misconception target - tech-can-replace (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q2 [NEW]: A politician says "Technology can replace any ecosystem service, so conservation is unnecessary." What is the main flaw in this argument?')
    .setHelpText('Question ID: g8_c4_w5_exit_q2 | Targets misconception: tech-can-replace')
    .setChoices([
      form.createChoice('Technology is always better than nature', false),
      form.createChoice('Technology replacements are extremely expensive, often only replicate ONE service, and may fail - ecosystems provide multiple services for free', true),
      form.createChoice('Conservation is never necessary', false),
      form.createChoice('The argument is completely valid', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // SPIRAL Q3: W3 - Decomposition (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q3 [SPIRAL W3]: Decomposition is a "supporting" ecosystem service. Based on Week 3, why is this service ESSENTIAL for all other ecosystem services to function?')
    .setHelpText('Question ID: g8_c4_w5_exit_q3 | Spiral: W3 Decomposition')
    .setChoices([
      form.createChoice('Decomposition is not connected to other services', false),
      form.createChoice('Without decomposition, nutrients wouldn\'t cycle back to plants, collapsing the base of all food webs and services', true),
      form.createChoice('Decomposition only affects soil', false),
      form.createChoice('Supporting services are optional', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // SPIRAL Q4: W4 - Food web stability (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q4 [SPIRAL W4]: Based on Week 4, why would an ecosystem with higher biodiversity provide MORE RELIABLE ecosystem services over time?')
    .setHelpText('Question ID: g8_c4_w5_exit_q4 | Spiral: W4 Food Web Stability | Targets misconception: only-food-matters')
    .setChoices([
      form.createChoice('Biodiversity doesn\'t affect service reliability', false),
      form.createChoice('More species means more functional redundancy, so if some species decline, others maintain the services', true),
      form.createChoice('Simple ecosystems provide better services', false),
      form.createChoice('Services only depend on one species', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // INTEGRATION Q5: Full cycle connection (5 pts)
  form.addParagraphTextItem()
    .setTitle('Q5 [INTEGRATION]: Climate change threatens both ecosystems and the services they provide. Using your knowledge from W1-W5 (energy flow, invasive species, decomposition, food web stability, and ecosystem services), explain how protecting biodiversity helps BOTH ecosystems AND human well-being in a changing climate.')
    .setHelpText('Question ID: g8_c4_w5_exit_q5 | 5 points: Connect multiple concepts to ecosystem services and human benefit')
    .setRequired(true);
  setPointsForLastItem_(form, 5);

  // SEP Q6: Engaging in argument (4 pts)
  form.addParagraphTextItem()
    .setTitle('Q6 [SEP]: Your school is debating whether to pave over a small wetland area to expand the parking lot. Make an evidence-based argument about what should be done, citing specific ecosystem services that would be lost or preserved and their approximate value.')
    .setHelpText('Question ID: g8_c4_w5_exit_q6 | 4 points: SEP 7 - Engaging in Argument from Evidence')
    .setRequired(true);
  setPointsForLastItem_(form, 4);

  return form.getPublishedUrl();
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Configures standard form settings for quizzes
 * @param {GoogleAppsScript.Forms.Form} form - The form to configure
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

  Logger.log('=== Point Validation ===');
  Object.keys(expected).forEach(key => {
    const match = expected[key] === calculated[key];
    Logger.log(`${key}: Expected ${expected[key]}, Got ${calculated[key]} ${match ? '✓' : '✗'}`);
  });

  return calculated.total === expected.total;
}
