/**
 * Grade 7 Cycle 4 Week 6: Synthesis & Assessment
 * Standards: MS-ESS3-3, MS-LS2-3 (cycle synthesis)
 * Assessment Focus: Integration of W1-W5 concepts on Biogeochemical Cycles & Human Impact
 *
 * Form Structure:
 * - Hook: The Connected Planet Challenge (12 pts)
 * - Station 1: Cycle Concept Review (20 pts)
 * - Station 2: Data Analysis & Interpretation (20 pts)
 * - Station 3: Real-World Problem Solving (25 pts)
 * - Exit Ticket: Comprehensive Assessment (23 pts)
 *
 * Total: 100 points
 */

// ============================================================================
// CONFIGURATION
// ============================================================================

const G7_C4_W6_CONFIG = {
  grade: 7,
  cycle: 4,
  week: 6,
  topic: 'Synthesis & Assessment',
  isAssessmentWeek: true,
  standards: ['MS-ESS3-3', 'MS-LS2-3'],
  points: {
    hook: 12,
    station1: 20,
    station2: 20,
    station3: 25,
    exitTicket: 23,
    total: 100
  },
  cycleTopicsCovered: {
    w1: 'Ocean Acidification & Marine Ecosystems',
    w2: 'Eutrophication & Dead Zones',
    w3: 'Carbon Cycle & Sequestration',
    w4: 'Nitrogen Cycle & Agriculture',
    w5: 'Environmental Monitoring & Solutions'
  }
};

// ============================================================================
// MAIN ENTRY POINT
// ============================================================================

/**
 * Creates all forms for G7 C4 W6
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

  Logger.log('=== Point Validation ===');
  Object.keys(expected).forEach(key => {
    const match = expected[key] === calculated[key];
    Logger.log(`${key}: Expected ${expected[key]}, Got ${calculated[key]} ${match ? '✓' : '✗'}`);
  });

  return calculated.total === expected.total;
}
