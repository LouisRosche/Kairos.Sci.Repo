/**
 * Grade 7 Cycle 4 Week 5: Environmental Monitoring & Solutions
 * Standards: MS-ESS3-3 (monitoring/minimizing human impact), MS-ETS1-4 (iterative testing)
 * Phenomenon: How can satellites tell us if an ecosystem is healthy?
 *
 * Form Structure:
 * - Hook: The Satellite View Mystery (12 pts)
 * - Station 1: Remote Sensing Investigation (20 pts)
 * - Station 2: Monitoring Technology Analysis (20 pts)
 * - Station 3: Design a Monitoring System (25 pts)
 * - Exit Ticket: Monitoring & Solutions Integration (23 pts)
 *
 * Total: 100 points
 */

// ============================================================================
// CONFIGURATION
// ============================================================================

const G7_C4_W5_CONFIG = {
  grade: 7,
  cycle: 4,
  week: 5,
  topic: 'Environmental Monitoring & Solutions',
  phenomenon: 'How can satellites tell us if an ecosystem is healthy?',
  standards: ['MS-ESS3-3', 'MS-ETS1-4'],
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
      id: 'satellites-see-everything',
      description: 'Students think satellites can directly measure all environmental parameters',
      targetedIn: ['hook_q3', 's1_q2']
    },
    {
      id: 'single-metric-enough',
      description: 'Students think one measurement can fully assess ecosystem health',
      targetedIn: ['s2_q3', 'exit_q2']
    },
    {
      id: 'monitoring-solves-problems',
      description: 'Students think monitoring alone fixes environmental problems',
      targetedIn: ['s3_q4', 'exit_q5']
    }
  ],
  spiralTargets: {
    w4: 'Nitrogen cycle and agricultural impacts',
    w3: 'Carbon cycle and sequestration',
    w2: 'Eutrophication and dead zones',
    w1: 'Ocean acidification'
  }
};

// ============================================================================
// MAIN ENTRY POINT
// ============================================================================

/**
 * Creates all forms for G7 C4 W5
 */
function createAllForms() {
  const results = {
    hook: createHookForm_(),
    station1: createStation1Form_(),
    station2: createStation2Form_(),
    station3: createStation3Form_(),
    exitTicket: createExitTicketForm_()
  };

  Logger.log('=== G7 C4 W5 Forms Created ===');
  Object.entries(results).forEach(([name, url]) => {
    Logger.log(`${name}: ${url}`);
  });

  return results;
}

// ============================================================================
// HOOK: THE SATELLITE VIEW MYSTERY (12 points)
// ============================================================================

function createHookForm_() {
  const form = FormApp.create('G7.C4.W5: Hook - The Satellite View Mystery');
  configFormSettings_(form);

  form.setDescription(
    'Phenomenon: NASA scientists look at satellite images of the Amazon rainforest. ' +
    'In some areas, the forest appears bright green; in others, it looks brownish-yellow. ' +
    'Without visiting the ground, scientists can tell which areas are healthy and which are stressed. ' +
    'How can they know this from space?\n\n' +
    'Points: 12 | Standards: MS-ESS3-3'
  );

  // Q1: Initial observation (2 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q1: What is MOST surprising about scientists being able to assess forest health from space?')
    .setHelpText('Question ID: g7_c4_w5_hook_q1')
    .setChoices([
      form.createChoice('Satellites exist', false),
      form.createChoice('They can detect plant health without touching or testing the plants directly', true),
      form.createChoice('Forests have different colors', false),
      form.createChoice('Scientists study forests', false)
    ])
    .setRequired(true)
    .setPoints(2);

  // Q2: Prior knowledge connection (2 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q2: Plants absorb certain colors of light for photosynthesis and reflect others. Healthy plants are green because they:')
    .setHelpText('Question ID: g7_c4_w5_hook_q2')
    .setChoices([
      form.createChoice('Absorb green light and reflect red/blue light', false),
      form.createChoice('Reflect green light and absorb red/blue light for photosynthesis', true),
      form.createChoice('Create green light from sunlight', false),
      form.createChoice('Paint themselves green for protection', false)
    ])
    .setRequired(true)
    .setPoints(2);

  // Q3: Misconception target - satellites-see-everything (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q3: A student says "Satellites can measure exactly how much carbon a forest is absorbing." What is INCOMPLETE about this statement?')
    .setHelpText('Question ID: g7_c4_w5_hook_q3 | Targets misconception: satellites-see-everything')
    .setChoices([
      form.createChoice('The statement is completely correct', false),
      form.createChoice('Satellites measure light reflection (a proxy for health), not carbon directly - scientists use models to estimate carbon', true),
      form.createChoice('Satellites can\'t see forests at all', false),
      form.createChoice('Carbon doesn\'t relate to plant health', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // Q4: Cycle connection (3 pts)
  form.addParagraphTextItem()
    .setTitle('Q4: In Weeks 3-4, you learned about carbon and nitrogen cycles. If satellites can detect plant stress, how might this help scientists monitor these biogeochemical cycles?')
    .setHelpText('Question ID: g7_c4_w5_hook_q4 | 3 points: Connect remote sensing to biogeochemical monitoring')
    .setRequired(true);
  setPointsForLastItem_(form, 3);

  // Q5: Question generation (2 pts)
  form.addParagraphTextItem()
    .setTitle('Q5: What questions do you have about how technology can help us monitor and protect ecosystems?')
    .setHelpText('Question ID: g7_c4_w5_hook_q5 | 2 points: Generate investigable questions')
    .setRequired(true);
  setPointsForLastItem_(form, 2);

  return form.getPublishedUrl();
}

// ============================================================================
// STATION 1: REMOTE SENSING INVESTIGATION (20 points)
// ============================================================================

function createStation1Form_() {
  const form = FormApp.create('G7.C4.W5: Station 1 - Remote Sensing Investigation');
  configFormSettings_(form);

  form.setDescription(
    'Learn how NDVI (Normalized Difference Vegetation Index) uses light reflection to measure plant health.\n\n' +
    'Analyze real satellite data to detect ecosystem changes.\n\n' +
    'Spiral Review: Carbon and nitrogen cycles from Weeks 3-4\n' +
    'Points: 20 | Standards: MS-ESS3-3'
  );

  // Scenario introduction
  form.addSectionHeaderItem()
    .setTitle('NDVI (Normalized Difference Vegetation Index)')
    .setHelpText('How it works:\n' +
                 '• Healthy plants strongly absorb RED light (for photosynthesis)\n' +
                 '• Healthy plants strongly reflect NEAR-INFRARED (NIR) light\n' +
                 '• NDVI = (NIR - Red) / (NIR + Red)\n' +
                 '• Scale: -1 to +1\n' +
                 '  - 0.6-0.9: Dense, healthy vegetation\n' +
                 '  - 0.2-0.5: Moderate vegetation or stressed plants\n' +
                 '  - 0-0.2: Bare soil, rock, or dead vegetation\n' +
                 '  - Negative: Water');

  // Q1: NDVI interpretation (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q1: A satellite measures NDVI of 0.8 over a forest and 0.3 over a nearby field. What does this data tell us?')
    .setHelpText('Question ID: g7_c4_w5_s1_q1')
    .setChoices([
      form.createChoice('The forest is healthier and has more active photosynthesis than the field', true),
      form.createChoice('The field is healthier than the forest', false),
      form.createChoice('Both areas have equal vegetation health', false),
      form.createChoice('NDVI cannot compare different areas', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // Q2: Misconception target - satellites-see-everything (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q2: NDVI measures light reflection. What does it NOT directly tell us about an ecosystem?')
    .setHelpText('Question ID: g7_c4_w5_s1_q2 | Targets misconception: satellites-see-everything')
    .setChoices([
      form.createChoice('Whether plants are actively photosynthesizing', false),
      form.createChoice('The specific species of plants or exact amount of carbon stored', true),
      form.createChoice('General vegetation health patterns', false),
      form.createChoice('Differences between vegetated and non-vegetated areas', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q3: Time-series analysis (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q3: A region\'s NDVI drops from 0.7 to 0.2 over five years. What is the MOST likely explanation?')
    .setHelpText('Question ID: g7_c4_w5_s1_q3')
    .setChoices([
      form.createChoice('The satellite sensors broke', false),
      form.createChoice('Vegetation loss due to deforestation, drought, or land use change', true),
      form.createChoice('The plants became healthier', false),
      form.createChoice('More water accumulated in the area', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // Q4: Carbon cycle connection (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q4: [SPIRAL W3] If NDVI decreases across a large forest region, what does this suggest about the carbon cycle in that area?')
    .setHelpText('Question ID: g7_c4_w5_s1_q4 | Spiral: W3 Carbon Cycle')
    .setChoices([
      form.createChoice('More carbon is being absorbed from the atmosphere', false),
      form.createChoice('Less photosynthesis means less CO2 absorption; the area may become a carbon SOURCE instead of SINK', true),
      form.createChoice('Carbon cycles are unrelated to plant health', false),
      form.createChoice('NDVI cannot connect to carbon data', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q5: Data analysis (3 pts)
  form.addParagraphTextItem()
    .setTitle('Q5: You are given NDVI data for a farm region showing values of 0.6 in spring, 0.3 in summer, and 0.5 in fall. Propose TWO possible explanations for this seasonal pattern.')
    .setHelpText('Question ID: g7_c4_w5_s1_q5 | 3 points: Two distinct, plausible explanations')
    .setRequired(true);
  setPointsForLastItem_(form, 3);

  // Q6: Nitrogen cycle connection (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q6: [SPIRAL W4] If NDVI reveals a "dead zone" of low vegetation along a river downstream from farms, what W4 concept might explain this?')
    .setHelpText('Question ID: g7_c4_w5_s1_q6 | Spiral: W4 Nitrogen Cycle/Agriculture')
    .setChoices([
      form.createChoice('Nitrogen fixation is increasing plant growth', false),
      form.createChoice('Nitrogen runoff from farms causing eutrophication and vegetation collapse', true),
      form.createChoice('The satellite is malfunctioning', false),
      form.createChoice('Rivers naturally have low NDVI', false)
    ])
    .setRequired(true)
    .setPoints(3);

  return form.getPublishedUrl();
}

// ============================================================================
// STATION 2: MONITORING TECHNOLOGY ANALYSIS (20 points)
// ============================================================================

function createStation2Form_() {
  const form = FormApp.create('G7.C4.W5: Station 2 - Monitoring Technology Analysis');
  configFormSettings_(form);

  form.setDescription(
    'Compare different environmental monitoring technologies and their strengths/limitations.\n\n' +
    'Evaluate which tools work best for different monitoring challenges.\n\n' +
    'Points: 20 | Standards: MS-ESS3-3, MS-ETS1-4'
  );

  // Scenario introduction
  form.addSectionHeaderItem()
    .setTitle('Monitoring Technology Comparison')
    .setHelpText('Technology Options:\n\n' +
                 '• Satellites (e.g., Landsat): Global coverage, repeat every 16 days, measures light reflection\n' +
                 '  - Cost: Free data; Resolution: 30m pixels\n\n' +
                 '• Drones: Local coverage, on-demand, can carry various sensors\n' +
                 '  - Cost: $5,000-50,000; Resolution: centimeters\n\n' +
                 '• Ground sensors: Single point, continuous real-time data\n' +
                 '  - Cost: $500-5,000 each; Resolution: exact location only\n\n' +
                 '• Water quality buoys: Measures pH, dissolved oxygen, nutrients directly\n' +
                 '  - Cost: $10,000-50,000 each; Coverage: one water body');

  // Q1: Scale matching (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q1: Which technology would be BEST for tracking deforestation across the entire Amazon basin?')
    .setHelpText('Question ID: g7_c4_w5_s2_q1')
    .setChoices([
      form.createChoice('Ground sensors', false),
      form.createChoice('Satellites (global coverage, regular repeat visits)', true),
      form.createChoice('Drones', false),
      form.createChoice('Water quality buoys', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q2: Resolution needs (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q2: A farmer wants to identify exactly which rows of crops are stressed in a 100-acre field. Which technology is BEST?')
    .setHelpText('Question ID: g7_c4_w5_s2_q2')
    .setChoices([
      form.createChoice('Satellites (30m resolution too coarse for individual rows)', false),
      form.createChoice('Drones (centimeter resolution can see individual plants)', true),
      form.createChoice('Water quality buoys', false),
      form.createChoice('A single ground sensor', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q3: Misconception target - single-metric-enough (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q3: A scientist uses ONLY satellite NDVI to declare an ecosystem "completely healthy." What is the problem with this approach?')
    .setHelpText('Question ID: g7_c4_w5_s2_q3 | Targets misconception: single-metric-enough')
    .setChoices([
      form.createChoice('Nothing - NDVI tells us everything we need', false),
      form.createChoice('Ecosystem health involves multiple factors (species diversity, water quality, soil health) that one metric cannot capture', true),
      form.createChoice('Satellites cannot measure NDVI', false),
      form.createChoice('Scientists should never use satellites', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q4: Integration (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q4: Why might scientists use MULTIPLE monitoring technologies together (e.g., satellites + ground sensors) instead of just one?')
    .setHelpText('Question ID: g7_c4_w5_s2_q4')
    .setChoices([
      form.createChoice('Using multiple technologies wastes money', false),
      form.createChoice('Different tools provide different information; satellites give broad patterns while ground sensors give precise local measurements', true),
      form.createChoice('Scientists like having many gadgets', false),
      form.createChoice('All technologies measure the same things', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q5: Trade-off analysis (4 pts)
  form.addParagraphTextItem()
    .setTitle('Q5: A conservation organization has $100,000 to monitor a coastal wetland threatened by pollution. Recommend a combination of technologies from the table and explain your reasoning, including trade-offs.')
    .setHelpText('Question ID: g7_c4_w5_s2_q5 | 4 points: Specific technologies with cost reasoning and trade-off analysis')
    .setRequired(true);
  setPointsForLastItem_(form, 4);

  return form.getPublishedUrl();
}

// ============================================================================
// STATION 3: DESIGN A MONITORING SYSTEM (25 points)
// ============================================================================

function createStation3Form_() {
  const form = FormApp.create('G7.C4.W5: Station 3 - Design a Monitoring System');
  configFormSettings_(form);

  form.setDescription(
    'Apply your knowledge to design a comprehensive environmental monitoring system.\n\n' +
    'Engineering Challenge: Create a monitoring plan that leads to action.\n\n' +
    'Points: 25 | Standards: MS-ESS3-3, MS-ETS1-4'
  );

  // Scenario introduction
  form.addSectionHeaderItem()
    .setTitle('Watershed Monitoring Challenge')
    .setHelpText('Scenario: The Clearwater River watershed (500 sq km) has:\n' +
                 '• Agricultural areas (40%) - potential nitrogen runoff\n' +
                 '• Forest (35%) - carbon sink, wildlife habitat\n' +
                 '• Urban development (15%) - growing, potential pollution\n' +
                 '• Wetlands (10%) - natural filter, at risk\n\n' +
                 'Recent problems:\n' +
                 '• Fish kills in downstream areas\n' +
                 '• Algae blooms increasing\n' +
                 '• Deforestation suspected but unconfirmed\n\n' +
                 'Budget: $200,000 for monitoring\n' +
                 'Goal: Detect problems EARLY and guide interventions');

  // Q1: Priority identification (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q1: Based on the scenario, which environmental issue should be the HIGHEST monitoring priority?')
    .setHelpText('Question ID: g7_c4_w5_s3_q1')
    .setChoices([
      form.createChoice('Forest bird populations', false),
      form.createChoice('Water quality (nitrogen, dissolved oxygen) - directly linked to fish kills and algae blooms', true),
      form.createChoice('Air temperature', false),
      form.createChoice('Cloud cover', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q2: Technology selection (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q2: To track deforestation in the 35% forest area, which monitoring approach is MOST efficient?')
    .setHelpText('Question ID: g7_c4_w5_s3_q2')
    .setChoices([
      form.createChoice('Hire people to walk through all forests weekly', false),
      form.createChoice('Free satellite imagery (Landsat) with regular change detection analysis', true),
      form.createChoice('Install ground sensors under every tree', false),
      form.createChoice('Ignore forest monitoring', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q3: System design (5 pts)
  form.addParagraphTextItem()
    .setTitle('Q3: Design a monitoring system using the $200,000 budget. Specify: (1) Which technologies you\'ll use, (2) Where you\'ll place them, (3) What each will measure, and (4) How often you\'ll collect data.')
    .setHelpText('Question ID: g7_c4_w5_s3_q3 | 5 points: Complete system with all 4 components addressed')
    .setRequired(true);
  setPointsForLastItem_(form, 5);

  // Q4: Misconception target - monitoring-solves-problems (6 pts)
  form.addParagraphTextItem()
    .setTitle('Q4: A city council member says "Once we install the monitoring system, our environmental problems will be solved." Explain why monitoring ALONE does not solve problems, and describe what additional steps are needed.')
    .setHelpText('Question ID: g7_c4_w5_s3_q4 | 6 points: Explain monitoring limitations + describe action steps | Targets misconception: monitoring-solves-problems')
    .setRequired(true);
  setPointsForLastItem_(form, 6);

  // Q5: Early warning design (6 pts)
  form.addParagraphTextItem()
    .setTitle('Q5: Design an "early warning" protocol: What specific measurements would trigger an alert? What actions should happen when an alert is triggered? Include at least TWO different warning triggers.')
    .setHelpText('Question ID: g7_c4_w5_s3_q5 | 6 points: Two triggers with specific thresholds and response actions')
    .setRequired(true);
  setPointsForLastItem_(form, 6);

  return form.getPublishedUrl();
}

// ============================================================================
// EXIT TICKET: MONITORING & SOLUTIONS INTEGRATION (23 points)
// ============================================================================

function createExitTicketForm_() {
  const form = FormApp.create('G7.C4.W5: Exit Ticket - Monitoring & Solutions Integration');
  configFormSettings_(form);

  form.setDescription(
    'Demonstrate your understanding of environmental monitoring and its role in protecting ecosystems.\n\n' +
    'Structure: 2 New + 2 Spiral + 1 Integration + 1 SEP\n' +
    'Points: 23 | Standards: MS-ESS3-3, MS-ETS1-4'
  );

  // NEW Q1: Core concept (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q1 [NEW]: NDVI (Normalized Difference Vegetation Index) measures ecosystem health by:')
    .setHelpText('Question ID: g7_c4_w5_exit_q1')
    .setChoices([
      form.createChoice('Counting individual plants from space', false),
      form.createChoice('Analyzing how plants reflect different wavelengths of light', true),
      form.createChoice('Measuring soil temperature', false),
      form.createChoice('Recording animal sounds', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // NEW Q2: Misconception target - single-metric-enough (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q2 [NEW]: Why do scientists use MULTIPLE types of environmental data instead of relying on just one measurement?')
    .setHelpText('Question ID: g7_c4_w5_exit_q2 | Targets misconception: single-metric-enough')
    .setChoices([
      form.createChoice('One measurement is always enough', false),
      form.createChoice('Ecosystems are complex; different measurements reveal different aspects of health', true),
      form.createChoice('Scientists like collecting unnecessary data', false),
      form.createChoice('Multiple measurements are required by law', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // SPIRAL Q3: W3 - Carbon cycle (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q3 [SPIRAL W3]: Satellites detect a large area where NDVI dropped from 0.8 to 0.2. Based on Week 3, what does this mean for the carbon cycle in that region?')
    .setHelpText('Question ID: g7_c4_w5_exit_q3 | Spiral: W3 Carbon Cycle')
    .setChoices([
      form.createChoice('More carbon is being absorbed', false),
      form.createChoice('Vegetation loss means less CO2 absorption; stored carbon may be released as the plants die/decompose', true),
      form.createChoice('The carbon cycle is unaffected', false),
      form.createChoice('Carbon is being created', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // SPIRAL Q4: W2 - Eutrophication (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q4 [SPIRAL W2]: Water quality sensors detect a sudden increase in nutrients and drop in dissolved oxygen. Based on Week 2, what is likely happening?')
    .setHelpText('Question ID: g7_c4_w5_exit_q4 | Spiral: W2 Eutrophication')
    .setChoices([
      form.createChoice('The water is becoming healthier', false),
      form.createChoice('Eutrophication - nutrient runoff is causing algae growth that depletes oxygen', true),
      form.createChoice('Fish populations are increasing', false),
      form.createChoice('The sensors are broken', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // INTEGRATION Q5: Full cycle connection (5 pts)
  form.addParagraphTextItem()
    .setTitle('Q5 [INTEGRATION]: Explain how a comprehensive monitoring system could detect AND help address BOTH of these problems: (1) Nitrogen runoff from farms (W4), and (2) Carbon release from deforestation (W3). What would you measure, and what actions would the data trigger?')
    .setHelpText('Question ID: g7_c4_w5_exit_q5 | 5 points: Address both problems with monitoring approach and action triggers | Targets misconception: monitoring-solves-problems')
    .setRequired(true);
  setPointsForLastItem_(form, 5);

  // SEP Q6: Analyzing data (4 pts)
  form.addParagraphTextItem()
    .setTitle('Q6 [SEP]: A scientist presents NDVI data showing a forest\'s health declining over 10 years. Another scientist argues "NDVI alone doesn\'t prove the forest is dying." Analyze both perspectives: What does the NDVI data tell us, and what are its limitations?')
    .setHelpText('Question ID: g7_c4_w5_exit_q6 | 4 points: SEP 4 - Analyzing and Interpreting Data')
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
  // Required form settings per CONTENT-DESIGN-GUIDE.md
  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setShowLinkToRespondAgain(false);
  form.setProgressBar(true);
  form.setShuffleQuestions(false);
  form.setConfirmationMessage(
    'Your responses have been recorded. Great work understanding environmental monitoring!\n\n' +
    'Key Takeaway: Monitoring technologies help us detect environmental problems early, ' +
    'but monitoring alone doesn\'t solve problems - data must lead to action!'
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

function createG7C4W5Hook() { return createHookForm_(); }
function createG7C4W5Station1() { return createStation1Form_(); }
function createG7C4W5Station2() { return createStation2Form_(); }
function createG7C4W5Station3() { return createStation3Form_(); }
function createG7C4W5ExitTicket() { return createExitTicketForm_(); }

// ============================================================================
// VALIDATION
// ============================================================================

function validatePoints_() {
  const expected = G7_C4_W5_CONFIG.points;
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
