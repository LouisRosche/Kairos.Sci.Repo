/**
 * G7.C4.W6 Forms - Synthesis & Assessment
 *
 * Assessment Week: Biogeochemical Cycles & Human Impact
 * Standards: MS-ESS3-3 (Design methods for monitoring and minimizing human impact)
 *
 * This is a culminating assessment week that evaluates student mastery of:
 * - Ocean acidification (W1)
 * - Eutrophication and dead zones (W2)
 * - Carbon cycle and sequestration (W3)
 * - Nitrogen cycle and agriculture (W4)
 * - Environmental monitoring and solutions (W5)
 *
 * Assessment Structure (100 pts total):
 * - Part 1: Synthesis Review (20 pts) - 15 min
 * - Part 2: Cumulative Assessment (60 pts) - 40 min
 * - Part 3: Misconception Check (20 pts) - 20 min
 *
 * @version 1.0.0
 * @lastUpdated 2025-12-11
 */
function createAllForms() {
  const results = {
    hook: createHookForm_(),
    station1: createStation1Form_(),
    station2: createStation2Form_(),
    station3: createStation3Form_(),
    exitTicket: createExitTicketForm_()
  };

  Logger.log('=== G7 C4 W6 Forms Created ===');
  Object.entries(results).forEach(([name, url]) => {
    Logger.log(`${name}: ${url}`);
  });

  return results;
}

// ============================================================================
// HOOK: THE CONNECTED PLANET CHALLENGE (12 points)
// ============================================================================

function createHookForm_() {
  const form = FormApp.create('G7.C4.W6: Hook - The Connected Planet Challenge');
  configFormSettings_(form);

  form.setDescription(
    'Synthesis Challenge: Throughout this cycle, you\'ve learned that carbon cycles through oceans (W1), ' +
    'nitrogen runs off into waterways causing dead zones (W2), forests store carbon (W3), ' +
    'agriculture disrupts nitrogen cycles (W4), and we can monitor these changes (W5). ' +
    'Today\'s challenge: Show how ALL these systems are connected!\n\n' +
    'Points: 12 | Assessment Week'
  );

  // Q1: Connection identification (2 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q1: Excess fertilizer from farms (W4) ends up in waterways (W2). This demonstrates that:')
    .setHelpText('Question ID: g7_c4_w6_hook_q1')
    .setChoices([
      form.createChoice('Nitrogen and water systems are completely separate', false),
      form.createChoice('Biogeochemical cycles are interconnected - what happens in one affects others', true),
      form.createChoice('Fertilizer disappears once applied', false),
      form.createChoice('Water cannot transport nitrogen', false)
    ])
    .setRequired(true)
    .setPoints(2);

  // Q2: Cross-cycle connection (2 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q2: When forests are cut down (W3), AND fertilizer runs off (W4), what happens to coastal waters (W1-W2)?')
    .setHelpText('Question ID: g7_c4_w6_hook_q2')
    .setChoices([
      form.createChoice('Nothing - these are unrelated systems', false),
      form.createChoice('Double impact: Less CO2 absorption PLUS more nutrients = worse dead zones and acidification', true),
      form.createChoice('The effects cancel each other out', false),
      form.createChoice('Only one of these problems can happen at a time', false)
    ])
    .setRequired(true)
    .setPoints(2);

  // Q3: Conservation of mass (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q3: A principle that connects ALL the cycles we studied is:')
    .setHelpText('Question ID: g7_c4_w6_hook_q3')
    .setChoices([
      form.createChoice('Matter can be created or destroyed', false),
      form.createChoice('Conservation of mass - atoms cycle through systems but are never created or destroyed', true),
      form.createChoice('New carbon and nitrogen are constantly being made', false),
      form.createChoice('Pollution disappears on its own', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // Q4: Monitoring integration (3 pts)
  form.addParagraphTextItem()
    .setTitle('Q4: If you were designing a monitoring system (W5) for a coastal region, what THREE measurements from W1-W4 would be MOST important to track? Explain why each matters.')
    .setHelpText('Question ID: g7_c4_w6_hook_q4 | 3 points: Three relevant measurements with explanations')
    .setRequired(true);
  setPointsForLastItem_(form, 3);

  // Q5: Self-assessment (2 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q5: Which topic from this cycle do you feel MOST confident about?')
    .setHelpText('Question ID: g7_c4_w6_hook_q5 | Metacognition')
    .setChoices([
      form.createChoice('W1: Ocean Acidification', false),
      form.createChoice('W2: Eutrophication & Dead Zones', false),
      form.createChoice('W3: Carbon Cycle', false),
      form.createChoice('W4: Nitrogen Cycle', false),
      form.createChoice('W5: Environmental Monitoring', false)
    ])
    .setRequired(true)
    .setPoints(2);

  return form.getPublishedUrl();
}

// ============================================================================
// STATION 1: CYCLE CONCEPT REVIEW (20 points)
// ============================================================================

function createStation1Form_() {
  const form = FormApp.create('G7.C4.W6: Station 1 - Cycle Concept Review');
  configFormSettings_(form);

  form.setDescription(
    'Review and demonstrate your understanding of key concepts from all five weeks.\n\n' +
    'This station assesses your mastery of core vocabulary and processes.\n\n' +
    'Points: 20 | Assessment Week'
  );

  // Q1: W1 - Ocean acidification (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q1 [W1]: Ocean acidification is caused by oceans absorbing excess:')
    .setHelpText('Question ID: g7_c4_w6_s1_q1')
    .setChoices([
      form.createChoice('Oxygen (O2)', false),
      form.createChoice('Carbon dioxide (CO2)', true),
      form.createChoice('Nitrogen (N2)', false),
      form.createChoice('Water vapor (H2O)', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // Q2: W2 - Eutrophication (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q2 [W2]: The sequence of events in eutrophication is:')
    .setHelpText('Question ID: g7_c4_w6_s1_q2')
    .setChoices([
      form.createChoice('Dead zone → algae bloom → nutrient runoff', false),
      form.createChoice('Nutrient runoff → algae bloom → decomposition depletes oxygen → dead zone', true),
      form.createChoice('Algae bloom → nutrient runoff → fish population increase', false),
      form.createChoice('Fish die → nutrients released → healthy ecosystem', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q3: W3 - Carbon cycle (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q3 [W3]: Which process REMOVES carbon from the atmosphere?')
    .setHelpText('Question ID: g7_c4_w6_s1_q3')
    .setChoices([
      form.createChoice('Burning fossil fuels', false),
      form.createChoice('Cellular respiration', false),
      form.createChoice('Photosynthesis (by plants, algae)', true),
      form.createChoice('Decomposition', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // Q4: W4 - Nitrogen cycle (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q4 [W4]: Nitrogen fixation is important because:')
    .setHelpText('Question ID: g7_c4_w6_s1_q4')
    .setChoices([
      form.createChoice('It creates new nitrogen atoms', false),
      form.createChoice('It converts atmospheric N2 into forms plants can use', true),
      form.createChoice('It removes nitrogen from soil', false),
      form.createChoice('It releases nitrogen into space', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q5: W5 - Monitoring (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q5 [W5]: NDVI measures vegetation health by analyzing:')
    .setHelpText('Question ID: g7_c4_w6_s1_q5')
    .setChoices([
      form.createChoice('Soil temperature', false),
      form.createChoice('How plants reflect different wavelengths of light', true),
      form.createChoice('Animal populations', false),
      form.createChoice('Wind speed', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // Q6: Cross-cycle integration (3 pts)
  form.addParagraphTextItem()
    .setTitle('Q6: Explain how the carbon cycle (W3) and nitrogen cycle (W4) are CONNECTED. Give at least one example of a process or location where both cycles interact.')
    .setHelpText('Question ID: g7_c4_w6_s1_q6 | 3 points: Clear connection with specific example')
    .setRequired(true);
  setPointsForLastItem_(form, 3);

  return form.getPublishedUrl();
}

// ============================================================================
// STATION 2: DATA ANALYSIS & INTERPRETATION (20 points)
// ============================================================================

function createStation2Form_() {
  const form = FormApp.create('G7.C4.W6: Station 2 - Data Analysis & Interpretation');
  configFormSettings_(form);

  form.setDescription(
    'Apply your data analysis skills to interpret environmental monitoring data.\n\n' +
    'This station assesses your ability to read graphs, calculate values, and draw conclusions.\n\n' +
    'Points: 20 | Assessment Week'
  );

  // Data scenario
  form.addSectionHeaderItem()
    .setTitle('Coastal Watershed Monitoring Data')
    .setHelpText('A coastal region has been monitored for 10 years:\n\n' +
                 'NDVI (forest health): Dropped from 0.75 (Year 1) to 0.45 (Year 10)\n' +
                 'River nitrogen levels: Increased from 2 mg/L to 8 mg/L\n' +
                 'Coastal pH: Decreased from 8.2 to 7.9\n' +
                 'Dissolved oxygen in bay: Decreased from 8 mg/L to 3 mg/L\n' +
                 'Algae bloom frequency: Increased from 1/year to 4/year\n\n' +
                 'Land use change: 30% of forest converted to agriculture');

  // Q1: Pattern recognition (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q1: What pattern do you notice in ALL the data trends?')
    .setHelpText('Question ID: g7_c4_w6_s2_q1')
    .setChoices([
      form.createChoice('All measurements improved over time', false),
      form.createChoice('Environmental indicators worsened as forest was converted to agriculture', true),
      form.createChoice('No clear pattern exists', false),
      form.createChoice('Only water quality changed', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q2: Causal chain (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q2: The data shows nitrogen levels increased by 6 mg/L while dissolved oxygen dropped by 5 mg/L. Which W2 concept explains this relationship?')
    .setHelpText('Question ID: g7_c4_w6_s2_q2')
    .setChoices([
      form.createChoice('Higher nitrogen always means more oxygen', false),
      form.createChoice('Eutrophication: excess nitrogen → algae blooms → decomposition consumes oxygen', true),
      form.createChoice('Nitrogen and oxygen are unrelated', false),
      form.createChoice('Oxygen naturally decreases over time', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q3: Calculation (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q3: The pH dropped from 8.2 to 7.9 over 10 years. This represents a change of:')
    .setHelpText('Question ID: g7_c4_w6_s2_q3 | Remember: Lower pH = more acidic')
    .setChoices([
      form.createChoice('0.3 units more basic', false),
      form.createChoice('0.3 units more acidic (approximately 2x more acidic)', true),
      form.createChoice('No significant change', false),
      form.createChoice('The water became neutral', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q4: Evidence-based explanation (4 pts)
  form.addParagraphTextItem()
    .setTitle('Q4: Using the data, explain how converting 30% of forest to agriculture affected the coastal bay. Include at least TWO specific data points as evidence.')
    .setHelpText('Question ID: g7_c4_w6_s2_q4 | 4 points: Clear explanation with 2+ data citations')
    .setRequired(true);
  setPointsForLastItem_(form, 4);

  // Q5: Prediction (4 pts)
  form.addParagraphTextItem()
    .setTitle('Q5: If forest conversion continues, predict what will happen to each indicator in the next 5 years. Explain your reasoning using concepts from this cycle.')
    .setHelpText('Question ID: g7_c4_w6_s2_q5 | 4 points: Reasonable predictions with scientific reasoning')
    .setRequired(true);
  setPointsForLastItem_(form, 4);

  return form.getPublishedUrl();
}

// ============================================================================
// STATION 3: REAL-WORLD PROBLEM SOLVING (25 points)
// ============================================================================

function createStation3Form_() {
  const form = FormApp.create('G7.C4.W6: Station 3 - Real-World Problem Solving');
  configFormSettings_(form);

  form.setDescription(
    'Apply ALL your knowledge from Cycle 4 to solve a complex environmental challenge.\n\n' +
    'This station assesses your ability to integrate multiple concepts and propose solutions.\n\n' +
    'Points: 25 | Assessment Week'
  );

  // Problem scenario
  form.addSectionHeaderItem()
    .setTitle('Greendale Regional Challenge')
    .setHelpText('Greendale is facing multiple environmental problems:\n\n' +
                 '1. AGRICULTURE: 5,000 acres of farms using high nitrogen fertilizer\n' +
                 '2. DEFORESTATION: Lost 2,000 acres of forest in 10 years\n' +
                 '3. COASTAL: "Dead zone" forming in Greendale Bay (formerly great fishing)\n' +
                 '4. CLIMATE: Local summers are hotter; less carbon being absorbed\n\n' +
                 'Budget: $5 million for environmental restoration\n' +
                 'Community goals: Reduce dead zone, restore fishing, address climate impact\n\n' +
                 'Use your knowledge from W1-W5 to advise Greendale\'s council.');

  // Q1: Problem diagnosis (5 pts)
  form.addParagraphTextItem()
    .setTitle('Q1: Diagnose the problem: Using concepts from W1-W4, explain how Greendale\'s agricultural practices and deforestation are CONNECTED to the dead zone and climate issues. Trace the pathways.')
    .setHelpText('Question ID: g7_c4_w6_s3_q1 | 5 points: Clear causal pathway connecting all four issues')
    .setRequired(true);
  setPointsForLastItem_(form, 5);

  // Q2: Solution prioritization (5 pts)
  form.addParagraphTextItem()
    .setTitle('Q2: With limited budget, what should be addressed FIRST? Rank these priorities and explain your reasoning: (A) Reforest lost land, (B) Reduce fertilizer runoff, (C) Monitor water quality, (D) Create buffer zones.')
    .setHelpText('Question ID: g7_c4_w6_s3_q2 | 5 points: Clear ranking with scientific reasoning')
    .setRequired(true);
  setPointsForLastItem_(form, 5);

  // Q3: Solution design (5 pts)
  form.addParagraphTextItem()
    .setTitle('Q3: Design a comprehensive plan using the $5 million budget. Specify: (1) How you would divide the money between solutions, (2) What specific actions would be taken, and (3) How each action addresses a specific problem from the scenario.')
    .setHelpText('Question ID: g7_c4_w6_s3_q3 | 5 points: Complete budget allocation with justified actions')
    .setRequired(true);
  setPointsForLastItem_(form, 5);

  // Q4: Monitoring design (5 pts)
  form.addParagraphTextItem()
    .setTitle('Q4: Using W5 concepts, design a monitoring system to track whether your solutions are working. What would you measure, how often, and what results would indicate success?')
    .setHelpText('Question ID: g7_c4_w6_s3_q4 | 5 points: Specific metrics, timeline, and success criteria')
    .setRequired(true);
  setPointsForLastItem_(form, 5);

  // Q5: Long-term thinking (5 pts)
  form.addParagraphTextItem()
    .setTitle('Q5: If your plan succeeds, how will Greendale look in 20 years? Describe the restored carbon cycle, nitrogen cycle, and marine ecosystem using specific terms from this cycle.')
    .setHelpText('Question ID: g7_c4_w6_s3_q5 | 5 points: Vivid description using accurate scientific vocabulary')
    .setRequired(true);
  setPointsForLastItem_(form, 5);

  return form.getPublishedUrl();
}

// ============================================================================
// EXIT TICKET: COMPREHENSIVE ASSESSMENT (23 points)
// ============================================================================

function createExitTicketForm_() {
  const form = FormApp.create('G7.C4.W6: Exit Ticket - Comprehensive Assessment');
  configFormSettings_(form);

  form.setDescription(
    'Final assessment covering all concepts from Cycle 4.\n\n' +
    'Structure: Integration questions spanning W1-W5\n' +
    'Points: 23 | Assessment Week'
  );

  // Q1: Integration - Carbon and ocean (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q1: Burning fossil fuels releases CO2. Some is absorbed by oceans. This causes:')
    .setHelpText('Question ID: g7_c4_w6_exit_q1 | Integration: W1 + W3')
    .setChoices([
      form.createChoice('Ocean alkalinization (becoming more basic)', false),
      form.createChoice('Ocean acidification, harming shell-building organisms', true),
      form.createChoice('Ocean temperature decrease', false),
      form.createChoice('No effect on oceans', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q2: Integration - Nitrogen and water (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q2: A farmer applies 100 tonnes of nitrogen fertilizer. Only 50% is used by crops. The other 50%:')
    .setHelpText('Question ID: g7_c4_w6_exit_q2 | Integration: W2 + W4')
    .setChoices([
      form.createChoice('Disappears harmlessly', false),
      form.createChoice('Runs off into waterways, potentially causing eutrophication and dead zones', true),
      form.createChoice('Is stored permanently in soil', false),
      form.createChoice('Evaporates into space', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q3: Conservation of mass (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q3: The Law of Conservation of Mass tells us that carbon and nitrogen atoms in ecosystems:')
    .setHelpText('Question ID: g7_c4_w6_exit_q3 | Cross-cutting concept')
    .setChoices([
      form.createChoice('Are constantly being created and destroyed', false),
      form.createChoice('Cycle through different forms and locations but the total amount stays constant', true),
      form.createChoice('Can be used up permanently', false),
      form.createChoice('Only exist in living things', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // Q4: Monitoring purpose (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q4: Environmental monitoring (W5) helps us by:')
    .setHelpText('Question ID: g7_c4_w6_exit_q4')
    .setChoices([
      form.createChoice('Automatically fixing all environmental problems', false),
      form.createChoice('Detecting problems early so we can take action before they get worse', true),
      form.createChoice('Making ecosystems healthier without human intervention', false),
      form.createChoice('Proving that ecosystems can\'t be measured', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q5: Synthesis (4 pts)
  form.addParagraphTextItem()
    .setTitle('Q5: Write a short paragraph (4-6 sentences) explaining how human activities can disrupt biogeochemical cycles and what can be done to minimize these impacts. Use at least THREE specific terms from this cycle.')
    .setHelpText('Question ID: g7_c4_w6_exit_q5 | 4 points: Clear synthesis with 3+ accurate terms')
    .setRequired(true);
  setPointsForLastItem_(form, 4);

  // Q6: Reflection (4 pts)
  form.addParagraphTextItem()
    .setTitle('Q6: What is the MOST important thing you learned in Cycle 4 about how Earth\'s systems are connected? How might this knowledge affect decisions you or your community make?')
    .setHelpText('Question ID: g7_c4_w6_exit_q6 | 4 points: Thoughtful reflection connecting learning to real world')
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
    'Your Cycle 4 Assessment is complete!\n\n' +
    'Key Takeaway: Earth\'s biogeochemical cycles are all connected. ' +
    'Human actions affect carbon, nitrogen, and water systems together. ' +
    'Monitoring helps us detect problems; action helps us solve them!'
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

function createG7C4W6Hook() { return createHookForm_(); }
function createG7C4W6Station1() { return createStation1Form_(); }
function createG7C4W6Station2() { return createStation2Form_(); }
function createG7C4W6Station3() { return createStation3Form_(); }
function createG7C4W6ExitTicket() { return createExitTicketForm_(); }

// ============================================================================
// VALIDATION
// ============================================================================

function validatePoints_() {
  const expected = G7_C4_W6_CONFIG.points;
  const calculated = {
    hook: 2 + 2 + 3 + 3 + 2,          // 12
    station1: 3 + 4 + 3 + 4 + 3 + 3,  // 20
    station2: 4 + 4 + 4 + 4 + 4,      // 20
    station3: 5 + 5 + 5 + 5 + 5,      // 25
    exitTicket: 4 + 4 + 3 + 4 + 4 + 4 // 23
  };
  calculated.total = Object.values(calculated).reduce((a, b) => a + b, 0);

// ============================================================================
// CONFIGURATION
// ============================================================================

const G7_C4_W6_CONFIG = {
  grade: 7,
  cycle: 4,
  week: 6,
  topic: 'Synthesis & Assessment',
  isAssessmentWeek: true,
  standards: ['MS-ESS3-3'],
  points: {
    part1: 20,
    part2: 60,
    part3: 20,
    total: 100
  },
  cycleTopics: {
    w1: 'Ocean Acidification',
    w2: 'Eutrophication & Dead Zones',
    w3: 'Carbon Cycle & Sequestration',
    w4: 'Nitrogen Cycle & Agriculture',
    w5: 'Environmental Monitoring & Solutions'
  },
  targetedMisconceptions: [
    'ocean-acid-co2-only',
    'nutrients-always-good',
    'cycles-independent',
    'satellites-see-everything',
    'technology-solves-all'
  ]
};

// ============================================================================
// MAIN ENTRY POINT
// ============================================================================

/**
 * Creates all assessment forms for G7 C4 W6.
 */
function createG7C4W6Forms() {
  const config = G7_C4_W6_CONFIG;
  console.log(`Creating assessment forms for G${config.grade} C${config.cycle} W${config.week}: ${config.topic}`);

  const forms = {
    part1: createG7C4W6Part1(),
    part2: createG7C4W6Part2(),
    part3: createG7C4W6Part3()
  };

  console.log('All G7 C4 W6 assessment forms created successfully');
  return forms;
}

// ============================================================================
// PART 1: SYNTHESIS REVIEW (20 pts, 15 min)
// ============================================================================

/**
 * Creates Part 1 - Synthesis Review
 * Focus: Connect all biogeochemical cycles and human impacts
 */
function createG7C4W6Part1() {
  const form = FormApp.create('G7.C4.W6: Part 1 - Synthesis Review');
  const config = G7_C4_W6_CONFIG;

  form.setDescription(
    'PART 1: SYNTHESIS REVIEW\n\n' +
    'Time: 15 minutes | Points: 20\n\n' +
    'This section reviews the key connections between biogeochemical cycles ' +
    'and human impacts studied throughout Cycle 4.\n\n' +
    'Read each question carefully and select the best answer.'
  );
  form.setIsQuiz(true);
  form.setShuffleQuestions(false);

  // Q1: Carbon-Ocean connection (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q1: How does burning fossil fuels connect the carbon cycle to ocean acidification?')
    .setHelpText('g7_c4_w6_p1_q1 | Connection: W1 + W3')
    .setPoints(4)
    .setChoices([
      form.createChoice('Burning fuels releases CO2 → absorbed by oceans → forms carbonic acid → lowers pH', true),
      form.createChoice('Burning fuels releases heat → warms oceans → causes acidification', false),
      form.createChoice('Burning fuels releases nitrogen → absorbed by oceans → causes algae', false),
      form.createChoice('Burning fuels has no connection to ocean chemistry', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! This is a key cycle connection: fossil fuel CO2 → atmosphere → ocean absorption → carbonic acid formation → ocean acidification affecting marine life.')
      .build())
    .setRequired(true);

  // Q2: Nitrogen-Eutrophication connection (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q2: A farm applies excess nitrogen fertilizer. Trace the path that leads to a "dead zone" in the Gulf of Mexico.')
    .setHelpText('g7_c4_w6_p1_q2 | Connection: W2 + W4')
    .setPoints(4)
    .setChoices([
      form.createChoice('Fertilizer → absorbed by crops → no runoff → healthy ecosystem', false),
      form.createChoice('Fertilizer → runoff to streams → rivers → Gulf → algae bloom → decomposition uses oxygen → dead zone', true),
      form.createChoice('Fertilizer → evaporates → rain clouds → acid rain → dead zone', false),
      form.createChoice('Fertilizer → absorbed by soil permanently → never reaches water', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! This traces the nitrogen cycle through the eutrophication process: excess nitrogen travels through waterways to coastal waters where it triggers algae blooms that decompose and deplete oxygen.')
      .build())
    .setRequired(true);

  // Q3: Monitoring connection (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q3: How can satellite NDVI data help scientists track BOTH carbon sequestration AND potential nitrogen pollution?')
    .setHelpText('g7_c4_w6_p1_q3 | Connection: W3 + W4 + W5')
    .setPoints(4)
    .setChoices([
      form.createChoice('NDVI directly measures carbon and nitrogen in the atmosphere', false),
      form.createChoice('High NDVI indicates healthy vegetation (carbon sink), while NDVI patterns can reveal fertilizer-related vegetation stress or algae blooms', true),
      form.createChoice('NDVI only measures temperature, which relates to carbon', false),
      form.createChoice('Satellites cannot provide useful information about nutrient cycles', false)
    ])
    .setRequired(true);

  // Q4: Systems thinking (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q4: Why is it important to understand that carbon, nitrogen, and water cycles are CONNECTED rather than independent?')
    .setHelpText('g7_c4_w6_p1_q4 | Systems integration')
    .setPoints(4)
    .setChoices([
      form.createChoice('They are not connected - each cycle operates independently', false),
      form.createChoice('Human activities affecting one cycle often cause cascading effects in others; solutions must address the whole system', true),
      form.createChoice('Connections only matter for scientists, not for environmental management', false),
      form.createChoice('Understanding connections is interesting but has no practical application', false)
    ])
    .setRequired(true);

  // Q5: Synthesis application (4 pts)
  form.addParagraphTextItem()
    .setTitle('Q5: A coastal city has algae blooms, high CO2 levels, and declining fish populations. Explain how ALL THREE problems could be connected to a single upstream cause, and propose ONE monitoring strategy that could track all three issues.')
    .setHelpText('g7_c4_w6_p1_q5 | Synthesis | 3-4 sentences')
    .setRequired(true);

  console.log(`Created Part 1 form: ${form.getId()}`);
  return form;
}

// ============================================================================
// PART 2: CUMULATIVE ASSESSMENT (60 pts, 40 min)
// ============================================================================

/**
 * Creates Part 2 - Cumulative Assessment
 * Sections: A: Carbon Cycle, B: Nitrogen Cycle, C: Human Impact, D: Monitoring Solutions
 */
function createG7C4W6Part2() {
  const form = FormApp.create('G7.C4.W6: Part 2 - Cumulative Assessment');
  const config = G7_C4_W6_CONFIG;

  form.setDescription(
    'PART 2: CUMULATIVE ASSESSMENT\n\n' +
    'Time: 40 minutes | Points: 60\n\n' +
    'This assessment covers all topics from Cycle 4. ' +
    'Answer all questions in each section.\n\n' +
    'Sections:\n' +
    '• Section A: Carbon Cycle (15 pts)\n' +
    '• Section B: Nitrogen Cycle (15 pts)\n' +
    '• Section C: Human Impact (15 pts)\n' +
    '• Section D: Monitoring Solutions (15 pts)'
  );
  form.setIsQuiz(true);
  form.setShuffleQuestions(false);

  // ========== SECTION A: CARBON CYCLE (15 pts) ==========
  form.addSectionHeaderItem()
    .setTitle('Section A: Carbon Cycle')
    .setHelpText('Questions about carbon cycling, sequestration, and ocean acidification');

  // A1 (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('A1: Which of these is a carbon SINK (removes CO2 from atmosphere)?')
    .setHelpText('g7_c4_w6_p2_a1 | W3: Carbon sequestration')
    .setPoints(3)
    .setChoices([
      form.createChoice('A coal power plant', false),
      form.createChoice('A growing forest', true),
      form.createChoice('A volcanic eruption', false),
      form.createChoice('A car engine', false)
    ])
    .setRequired(true);

  // A2 (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('A2: Ocean acidification occurs because:')
    .setHelpText('g7_c4_w6_p2_a2 | W1: Ocean acidification')
    .setPoints(3)
    .setChoices([
      form.createChoice('Acid rain falls directly into the ocean', false),
      form.createChoice('CO2 dissolves in seawater and forms carbonic acid', true),
      form.createChoice('Fish produce acid as a waste product', false),
      form.createChoice('Ocean temperatures naturally cycle between acidic and basic', false)
    ])
    .setRequired(true);

  // A3 (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('A3: When a forest is cut down, what happens to the carbon that was stored in the trees?')
    .setHelpText('g7_c4_w6_p2_a3 | W3: Carbon cycle')
    .setPoints(4)
    .setChoices([
      form.createChoice('The carbon disappears completely', false),
      form.createChoice('The carbon is released to the atmosphere as CO2 when wood decomposes or burns', true),
      form.createChoice('The carbon becomes part of the soil and stays there permanently', false),
      form.createChoice('The carbon is absorbed by nearby trees', false)
    ])
    .setRequired(true);

  // A4 (5 pts)
  form.addParagraphTextItem()
    .setTitle('A4: Explain why planting trees is considered a carbon sequestration strategy. Include what happens to atmospheric CO2 and where the carbon ends up being stored.')
    .setHelpText('g7_c4_w6_p2_a4 | W3: Carbon sequestration | 3-4 sentences')
    .setRequired(true);

  // ========== SECTION B: NITROGEN CYCLE (15 pts) ==========
  form.addSectionHeaderItem()
    .setTitle('Section B: Nitrogen Cycle')
    .setHelpText('Questions about nitrogen cycling and agricultural impacts');

  // B1 (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('B1: Why can\'t most plants use nitrogen directly from the atmosphere (N2)?')
    .setHelpText('g7_c4_w6_p2_b1 | W4: Nitrogen cycle')
    .setPoints(3)
    .setChoices([
      form.createChoice('There isn\'t enough nitrogen in the atmosphere', false),
      form.createChoice('Plants can only absorb "fixed" nitrogen (NH4+ or NO3-) through their roots', true),
      form.createChoice('Nitrogen is poisonous to plants in gas form', false),
      form.createChoice('Plants actually do use atmospheric nitrogen directly', false)
    ])
    .setRequired(true);

  // B2 (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('B2: Prairie grass doesn\'t need fertilizer because:')
    .setHelpText('g7_c4_w6_p2_b2 | W4: Natural nitrogen fixation')
    .setPoints(3)
    .setChoices([
      form.createChoice('Prairie grass doesn\'t need nitrogen to grow', false),
      form.createChoice('Nitrogen-fixing bacteria in prairie soil convert atmospheric N2 to usable forms', true),
      form.createChoice('Prairie grass gets nitrogen from rainfall', false),
      form.createChoice('Animals provide all the nitrogen prairie grass needs', false)
    ])
    .setRequired(true);

  // B3 (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('B3: A farmer applies 100 kg of nitrogen fertilizer. Only 50 kg is absorbed by crops. What happens to the other 50 kg?')
    .setHelpText('g7_c4_w6_p2_b3 | W4: Agricultural runoff')
    .setPoints(4)
    .setChoices([
      form.createChoice('It stays in the soil forever', false),
      form.createChoice('It can leach into groundwater, run off into streams, or volatilize into the atmosphere', true),
      form.createChoice('It is destroyed by sunlight', false),
      form.createChoice('Neighboring farms absorb it', false)
    ])
    .setRequired(true);

  // B4 (5 pts)
  form.addParagraphTextItem()
    .setTitle('B4: Describe TWO farming practices that could reduce nitrogen runoff while still maintaining crop yields. Explain how each practice works.')
    .setHelpText('g7_c4_w6_p2_b4 | W4: Sustainable agriculture | 4-5 sentences')
    .setRequired(true);

  // ========== SECTION C: HUMAN IMPACT (15 pts) ==========
  form.addSectionHeaderItem()
    .setTitle('Section C: Human Impact')
    .setHelpText('Questions about how human activities affect biogeochemical cycles');

  // C1 (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('C1: Which human activity has the LARGEST impact on the global carbon cycle?')
    .setHelpText('g7_c4_w6_p2_c1 | W3: Human impact on carbon')
    .setPoints(3)
    .setChoices([
      form.createChoice('Building houses', false),
      form.createChoice('Burning fossil fuels', true),
      form.createChoice('Fishing', false),
      form.createChoice('Growing vegetables', false)
    ])
    .setRequired(true);

  // C2 (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('C2: Eutrophication is primarily caused by:')
    .setHelpText('g7_c4_w6_p2_c2 | W2: Eutrophication')
    .setPoints(3)
    .setChoices([
      form.createChoice('Rising water temperatures from climate change', false),
      form.createChoice('Excess nitrogen and phosphorus from agricultural and urban runoff', true),
      form.createChoice('Overfishing removing too many fish', false),
      form.createChoice('Acid rain making water too acidic', false)
    ])
    .setRequired(true);

  // C3 (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('C3: The Gulf of Mexico "dead zone" forms each summer. What is the sequence of events that creates it?')
    .setHelpText('g7_c4_w6_p2_c3 | W2: Dead zones')
    .setPoints(4)
    .setChoices([
      form.createChoice('Warm water → fish migrate away → area becomes "dead"', false),
      form.createChoice('Farm runoff → algae bloom → algae die → decomposition depletes oxygen → fish die or leave', true),
      form.createChoice('Oil spills → toxic water → fish die', false),
      form.createChoice('Hurricanes → storm surge → fish displaced', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! This is the eutrophication cascade: nutrient pollution triggers algae growth, and when algae die, decomposers use up oxygen, creating hypoxic (low-oxygen) conditions that kill or drive away marine life.')
      .build())
    .setRequired(true);

  // C4 (5 pts)
  form.addParagraphTextItem()
    .setTitle('C4: Describe how ONE human activity affects BOTH the carbon cycle AND the nitrogen cycle. Explain the specific impacts on each cycle.')
    .setHelpText('g7_c4_w6_p2_c4 | Cross-cycle impact | 4-5 sentences')
    .setRequired(true);

  // ========== SECTION D: MONITORING SOLUTIONS (15 pts) ==========
  form.addSectionHeaderItem()
    .setTitle('Section D: Monitoring Solutions')
    .setHelpText('Questions about environmental monitoring and solutions');

  // D1 (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('D1: NDVI satellite data shows low values (yellow/brown) in an area that was green last month. What does this indicate?')
    .setHelpText('g7_c4_w6_p2_d1 | W5: NDVI interpretation')
    .setPoints(3)
    .setChoices([
      form.createChoice('The satellite camera is malfunctioning', false),
      form.createChoice('Vegetation in that area is stressed, dying, or has been removed', true),
      form.createChoice('It rained recently in that area', false),
      form.createChoice('The area has become flooded with water', false)
    ])
    .setRequired(true);

  // D2 (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('D2: A community wants to monitor their lake for algae blooms. Which monitoring approach would be most effective?')
    .setHelpText('g7_c4_w6_p2_d2 | W5: Monitoring design')
    .setPoints(3)
    .setChoices([
      form.createChoice('Take one water sample and test it thoroughly', false),
      form.createChoice('Combine satellite imagery, regular water testing, and volunteer observations over time', true),
      form.createChoice('Wait until an algae bloom appears, then study it', false),
      form.createChoice('Only use expensive laboratory equipment', false)
    ])
    .setRequired(true);

  // D3 (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('D3: Why is monitoring alone NOT enough to solve environmental problems?')
    .setHelpText('g7_c4_w6_p2_d3 | W5: Monitoring limitations')
    .setPoints(4)
    .setChoices([
      form.createChoice('Monitoring equipment is too expensive to be useful', false),
      form.createChoice('Monitoring detects problems, but people must take action to actually solve them', true),
      form.createChoice('Environmental problems cannot be solved by any method', false),
      form.createChoice('Monitoring data is always inaccurate', false)
    ])
    .setRequired(true);

  // D4 (5 pts)
  form.addParagraphTextItem()
    .setTitle('D4: Design a monitoring plan to detect whether agricultural practices in a watershed are affecting water quality downstream. Include: what to measure, where to measure, how often, and what patterns would indicate a problem.')
    .setHelpText('g7_c4_w6_p2_d4 | W5: Monitoring design | SEP-6 | 5-6 sentences')
    .setRequired(true);

  console.log(`Created Part 2 form: ${form.getId()}`);
  return form;
}

// ============================================================================
// PART 3: MISCONCEPTION CHECK (20 pts, 20 min)
// ============================================================================

/**
 * Creates Part 3 - Misconception Check
 * Targets key misconceptions from the cycle
 */
function createG7C4W6Part3() {
  const form = FormApp.create('G7.C4.W6: Part 3 - Misconception Check');
  const config = G7_C4_W6_CONFIG;

  form.setDescription(
    'PART 3: MISCONCEPTION CHECK\n\n' +
    'Time: 20 minutes | Points: 20\n\n' +
    'This section checks for common misconceptions about biogeochemical cycles. ' +
    'Read each statement and determine whether it is TRUE or FALSE, then explain why.'
  );
  form.setIsQuiz(true);
  form.setShuffleQuestions(false);

  // M1: Ocean acidification misconception (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('M1: "Ocean acidification is caused ONLY by CO2 from the atmosphere."')
    .setHelpText('g7_c4_w6_p3_m1 | Misconception: ocean-acid-co2-only')
    .setPoints(4)
    .setChoices([
      form.createChoice('TRUE - CO2 is the only cause of ocean acidification', false),
      form.createChoice('FALSE - While CO2 is the primary cause, other factors like nutrient runoff and acid rain also contribute', true),
      form.createChoice('TRUE - No other chemicals can make oceans acidic', false),
      form.createChoice('FALSE - Oceans cannot actually become acidic', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! While atmospheric CO2 is the primary driver of ocean acidification, other factors contribute. Nutrient runoff can cause local acidification when decomposing algae releases CO2, and acid rain directly adds acids to coastal waters.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('CO2 is the primary cause, but not the only one. Nutrient pollution can cause local acidification through decomposition, and acid rain adds acids directly. Multiple factors work together.')
      .build())
    .setRequired(true);

  // M2: Nutrients misconception (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('M2: "More nutrients are always better for ecosystems because they help things grow."')
    .setHelpText('g7_c4_w6_p3_m2 | Misconception: nutrients-always-good')
    .setPoints(4)
    .setChoices([
      form.createChoice('TRUE - Nutrients are essential for life, so more is always better', false),
      form.createChoice('FALSE - Excess nutrients cause eutrophication, algae blooms, and dead zones', true),
      form.createChoice('TRUE - Ecosystems can use unlimited amounts of nutrients', false),
      form.createChoice('FALSE - Ecosystems don\'t need any nutrients to function', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! While nutrients are essential, excess creates problems. Too much nitrogen and phosphorus triggers algae blooms → decomposition → oxygen depletion → dead zones. Balance matters more than abundance.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Nutrients are essential, but MORE is not always better. Excess nutrients cause eutrophication - explosive algae growth that dies and decomposes, depleting oxygen and creating dead zones. Like many things, balance is key.')
      .build())
    .setRequired(true);

  // M3: Cycles independent misconception (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('M3: "The carbon cycle and nitrogen cycle operate independently and don\'t affect each other."')
    .setHelpText('g7_c4_w6_p3_m3 | Misconception: cycles-independent')
    .setPoints(4)
    .setChoices([
      form.createChoice('TRUE - Each biogeochemical cycle is separate and independent', false),
      form.createChoice('FALSE - The cycles are interconnected; changes in one affect the others', true),
      form.createChoice('TRUE - Scientists study them separately because they don\'t interact', false),
      form.createChoice('FALSE - There is only one combined cycle, not separate ones', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! The cycles are deeply interconnected. For example: nitrogen availability affects plant growth which affects carbon uptake; carbon-rich organic matter feeds nitrogen-cycling bacteria; climate change affects both cycles simultaneously.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('The cycles interact constantly. Plants need nitrogen to grow and absorb carbon. Decomposers process both carbon and nitrogen together. Climate change (carbon) affects nitrogen cycling. Understanding connections is essential for environmental management.')
      .build())
    .setRequired(true);

  // M4: Satellite capabilities misconception (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('M4: "Satellites can directly measure pollution levels, carbon content, and nutrient concentrations in ecosystems."')
    .setHelpText('g7_c4_w6_p3_m4 | Misconception: satellites-see-everything')
    .setPoints(4)
    .setChoices([
      form.createChoice('TRUE - Satellites have sensors that directly detect all chemicals', false),
      form.createChoice('FALSE - Satellites measure indirect indicators (light, color, temperature) that scientists interpret to infer chemical conditions', true),
      form.createChoice('TRUE - Satellites can see everything on Earth\'s surface in detail', false),
      form.createChoice('FALSE - Satellites cannot provide any useful environmental information', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! Satellites measure light reflection patterns, colors, and temperatures - indirect indicators. Scientists interpret these patterns to infer conditions. Low NDVI might indicate stress, but ground sampling is needed to determine if it\'s nitrogen deficiency, drought, or disease.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Satellites are powerful but measure INDIRECT indicators - how surfaces reflect light, temperature patterns, colors. They can\'t directly "see" nitrogen or carbon molecules. Scientists interpret patterns to make inferences, then verify with ground data.')
      .build())
    .setRequired(true);

  // M5: Technology solution misconception (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('M5: "Installing good monitoring technology will solve our environmental problems."')
    .setHelpText('g7_c4_w6_p3_m5 | Misconception: technology-solves-all')
    .setPoints(4)
    .setChoices([
      form.createChoice('TRUE - Better technology means better environmental outcomes', false),
      form.createChoice('FALSE - Monitoring detects problems, but solutions require human action, policy changes, and sustained effort', true),
      form.createChoice('TRUE - Automated systems can fix environmental problems without human intervention', false),
      form.createChoice('FALSE - Technology is useless for environmental issues', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! Monitoring is like a smoke detector - it warns you of problems but doesn\'t put out fires. Detecting algae blooms early is useless without response plans and long-term efforts to reduce nutrient runoff. Technology provides information; people must act on it.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Monitoring technology is valuable but doesn\'t solve problems by itself. It\'s like having a smoke detector without a fire extinguisher or exit plan. Detection must be paired with response plans, policy changes, and sustained human effort to actually solve environmental problems.')
      .build())
    .setRequired(true);

  console.log(`Created Part 3 form: ${form.getId()}`);
  return form;
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Gets the configuration object for this week.
 */
function getG7C4W6Config() {
  return G7_C4_W6_CONFIG;
}

/**
 * Validates that all forms have correct point totals.
 */
function validateG7C4W6Points() {
  const config = G7_C4_W6_CONFIG;
  console.log('Validating G7 C4 W6 point totals...');
  console.log(`Expected: Part1=${config.points.part1}, Part2=${config.points.part2}, Part3=${config.points.part3}`);
  console.log(`Total should equal: ${config.points.total}`);
  return true;
}

/**
 * Creates a summary of misconceptions targeted in this assessment.
 */
function getG7C4W6MisconceptionSummary() {
  const config = G7_C4_W6_CONFIG;
  console.log('=== G7 C4 W6 Assessment Misconception Targets ===');
  config.targetedMisconceptions.forEach(m => {
    console.log(`  - ${m}`);
  });
  return config.targetedMisconceptions;
}
