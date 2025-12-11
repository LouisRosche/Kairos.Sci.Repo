/**
 * Grade 8 Cycle 4 Week 6: Synthesis & Assessment
 * Standards: MS-LS2-3, MS-LS2-4, MS-LS2-5 (cycle synthesis)
 * Assessment Focus: Integration of W1-W5 concepts on Ecosystems & Energy Transfer
 *
 * Form Structure:
 * - Hook: The Ecosystem Challenge (12 pts)
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

const G8_C4_W6_CONFIG = {
  grade: 8,
  cycle: 4,
  week: 6,
  topic: 'Synthesis & Assessment',
  isAssessmentWeek: true,
  standards: ['MS-LS2-3', 'MS-LS2-4', 'MS-LS2-5'],
  points: {
    hook: 12,
    station1: 20,
    station2: 20,
    station3: 25,
    exitTicket: 23,
    total: 100
  },
  cycleTopicsCovered: {
    w1: 'Energy Flow & Trophic Levels',
    w2: 'Invasive Species & Ecosystem Disruption',
    w3: 'Decomposition & Matter Cycling',
    w4: 'Food Web Complexity & Stability',
    w5: 'Ecosystem Services & Human Dependence'
  }
};

// ============================================================================
// MAIN ENTRY POINT
// ============================================================================

/**
 * Creates all forms for G8 C4 W6
 */
function createAllForms() {
  const results = {
    hook: createHookForm_(),
    station1: createStation1Form_(),
    station2: createStation2Form_(),
    station3: createStation3Form_(),
    exitTicket: createExitTicketForm_()
  };

  Logger.log('=== G8 C4 W6 Forms Created ===');
  Object.entries(results).forEach(([name, url]) => {
    Logger.log(`${name}: ${url}`);
  });

  return results;
}

// ============================================================================
// HOOK: THE ECOSYSTEM CHALLENGE (12 points)
// ============================================================================

function createHookForm_() {
  const form = FormApp.create('G8.C4.W6: Hook - The Ecosystem Challenge');
  configFormSettings_(form);

  form.setDescription(
    'Synthesis Challenge: Throughout this cycle, you\'ve learned that energy flows through trophic levels (W1), ' +
    'invasive species disrupt ecosystems (W2), decomposers cycle matter (W3), ' +
    'complex food webs are more stable (W4), and ecosystems provide valuable services (W5). ' +
    'Today\'s challenge: Show how ALL these concepts connect!\n\n' +
    'Points: 12 | Assessment Week'
  );

  // Q1: Connection identification (2 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q1: An invasive species (W2) eliminates several native herbivores. Based on W4, what happens to ecosystem stability?')
    .setHelpText('Question ID: g8_c4_w6_hook_q1')
    .setChoices([
      form.createChoice('Stability increases because there are fewer species', false),
      form.createChoice('Stability decreases because the food web loses redundancy and connections', true),
      form.createChoice('Stability is unaffected by species loss', false),
      form.createChoice('Invasive species always improve ecosystems', false)
    ])
    .setRequired(true)
    .setPoints(2);

  // Q2: Cross-cycle connection (2 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q2: If decomposers (W3) are killed by pollution, what happens to energy flow (W1) and ecosystem services (W5)?')
    .setHelpText('Question ID: g8_c4_w6_hook_q2')
    .setChoices([
      form.createChoice('Nothing - decomposers are not important', false),
      form.createChoice('Nutrients stop cycling, producers decline, energy flow collapses, and services like soil fertility fail', true),
      form.createChoice('Energy flow increases without decomposers', false),
      form.createChoice('Ecosystem services improve when decomposition stops', false)
    ])
    .setRequired(true)
    .setPoints(2);

  // Q3: Systems thinking (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q3: The key insight connecting ALL of Cycle 4 is:')
    .setHelpText('Question ID: g8_c4_w6_hook_q3')
    .setChoices([
      form.createChoice('Ecosystems are simple systems with few connections', false),
      form.createChoice('Ecosystems are complex, interconnected systems where changes to one component affect many others', true),
      form.createChoice('Each part of an ecosystem functions independently', false),
      form.createChoice('Humans are not part of ecosystems', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // Q4: Service integration (3 pts)
  form.addParagraphTextItem()
    .setTitle('Q4: A forest provides ecosystem services (W5). Using concepts from W1-W4, explain THREE ways damaging this forest would affect its ability to provide services.')
    .setHelpText('Question ID: g8_c4_w6_hook_q4 | 3 points: Three connections to different weeks')
    .setRequired(true);
  setPointsForLastItem_(form, 3);

  // Q5: Self-assessment (2 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q5: Which topic from this cycle do you feel MOST confident about?')
    .setHelpText('Question ID: g8_c4_w6_hook_q5 | Metacognition')
    .setChoices([
      form.createChoice('W1: Energy Flow & Trophic Levels', false),
      form.createChoice('W2: Invasive Species', false),
      form.createChoice('W3: Decomposition', false),
      form.createChoice('W4: Food Web Stability', false),
      form.createChoice('W5: Ecosystem Services', false)
    ])
    .setRequired(true)
    .setPoints(2);

  return form.getPublishedUrl();
}

// ============================================================================
// STATION 1: CYCLE CONCEPT REVIEW (20 points)
// ============================================================================

function createStation1Form_() {
  const form = FormApp.create('G8.C4.W6: Station 1 - Cycle Concept Review');
  configFormSettings_(form);

  form.setDescription(
    'Review and demonstrate your understanding of key concepts from all five weeks.\n\n' +
    'This station assesses your mastery of core vocabulary and processes.\n\n' +
    'Points: 20 | Assessment Week'
  );

  // Q1: W1 - Energy flow (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q1 [W1]: Only about 10% of energy transfers between trophic levels. The other 90% is:')
    .setHelpText('Question ID: g8_c4_w6_s1_q1')
    .setChoices([
      form.createChoice('Stored in the consumer\'s body forever', false),
      form.createChoice('Lost as heat through cellular respiration', true),
      form.createChoice('Transferred to decomposers immediately', false),
      form.createChoice('Created from nothing', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // Q2: W2 - Invasive species (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q2 [W2]: Invasive species often outcompete natives because they:')
    .setHelpText('Question ID: g8_c4_w6_s1_q2')
    .setChoices([
      form.createChoice('Are always larger than native species', false),
      form.createChoice('Lack natural predators and diseases that control them in their native habitat', true),
      form.createChoice('Are genetically identical to native species', false),
      form.createChoice('Cannot survive outside their native range', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q3: W3 - Decomposition (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q3 [W3]: Decomposition is essential because it:')
    .setHelpText('Question ID: g8_c4_w6_s1_q3')
    .setChoices([
      form.createChoice('Creates new matter from nothing', false),
      form.createChoice('Releases nutrients from dead organisms back into forms producers can use', true),
      form.createChoice('Destroys matter permanently', false),
      form.createChoice('Only happens in aquatic ecosystems', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // Q4: W4 - Food web stability (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q4 [W4]: Complex food webs are more stable than simple food chains because:')
    .setHelpText('Question ID: g8_c4_w6_s1_q4')
    .setChoices([
      form.createChoice('They have fewer species', false),
      form.createChoice('They have multiple pathways for energy flow, so losing one species doesn\'t collapse the system', true),
      form.createChoice('Simple food chains are always more stable', false),
      form.createChoice('Complexity doesn\'t affect stability', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q5: W5 - Ecosystem services (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q5 [W5]: Which is an example of a REGULATING ecosystem service?')
    .setHelpText('Question ID: g8_c4_w6_s1_q5')
    .setChoices([
      form.createChoice('Harvesting timber (provisioning)', false),
      form.createChoice('Wetlands filtering water pollution (regulating)', true),
      form.createChoice('Enjoying hiking trails (cultural)', false),
      form.createChoice('Decomposition creating soil (supporting)', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // Q6: Cross-cycle integration (3 pts)
  form.addParagraphTextItem()
    .setTitle('Q6: Explain how the 10% energy rule (W1) connects to why ecosystems with more biodiversity (W4) can support more ecosystem services (W5).')
    .setHelpText('Question ID: g8_c4_w6_s1_q6 | 3 points: Clear connection across three weeks')
    .setRequired(true);
  setPointsForLastItem_(form, 3);

  return form.getPublishedUrl();
}

// ============================================================================
// STATION 2: DATA ANALYSIS & INTERPRETATION (20 points)
// ============================================================================

function createStation2Form_() {
  const form = FormApp.create('G8.C4.W6: Station 2 - Data Analysis & Interpretation');
  configFormSettings_(form);

  form.setDescription(
    'Apply your data analysis skills to interpret ecosystem monitoring data.\n\n' +
    'This station assesses your ability to read graphs, identify patterns, and draw conclusions.\n\n' +
    'Points: 20 | Assessment Week'
  );

  // Data scenario
  form.addSectionHeaderItem()
    .setTitle('Lake Ecosystem Recovery Data')
    .setHelpText('A lake was damaged by invasive carp 15 years ago. Restoration began 10 years ago:\n\n' +
                 'YEAR 1 (damaged state):\n' +
                 '• Native fish species: 3 (down from 25)\n' +
                 '• Food web connections: 15 (down from 150)\n' +
                 '• Decomposer diversity: Low (2 species)\n' +
                 '• Ecosystem services value: $500K/year\n\n' +
                 'YEAR 10 (after restoration):\n' +
                 '• Native fish species: 18\n' +
                 '• Food web connections: 95\n' +
                 '• Decomposer diversity: Moderate (8 species)\n' +
                 '• Ecosystem services value: $3.5 million/year\n\n' +
                 'Restoration actions: Carp removal, native species reintroduction, habitat restoration');

  // Q1: Pattern recognition (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q1: What is the STRONGEST pattern in the recovery data?')
    .setHelpText('Question ID: g8_c4_w6_s2_q1')
    .setChoices([
      form.createChoice('All indicators declined over time', false),
      form.createChoice('As biodiversity increased, food web complexity and ecosystem service value also increased', true),
      form.createChoice('Ecosystem services value is unrelated to species diversity', false),
      form.createChoice('The invasive carp helped the ecosystem', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q2: Calculation (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q2: Ecosystem services value increased from $500K to $3.5 million. What is the ratio of improvement?')
    .setHelpText('Question ID: g8_c4_w6_s2_q2')
    .setChoices([
      form.createChoice('2x improvement', false),
      form.createChoice('7x improvement (3.5M ÷ 500K = 7)', true),
      form.createChoice('35x improvement', false),
      form.createChoice('3.5x improvement', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q3: Concept application (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q3: Food web connections increased from 15 to 95. Using W4 concepts, what does this increase tell us about ecosystem stability?')
    .setHelpText('Question ID: g8_c4_w6_s2_q3')
    .setChoices([
      form.createChoice('Stability decreased because complexity is bad', false),
      form.createChoice('Stability increased because more connections mean more pathways for energy and greater resilience', true),
      form.createChoice('Connections don\'t affect stability', false),
      form.createChoice('The ecosystem became less stable', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q4: Evidence-based explanation (4 pts)
  form.addParagraphTextItem()
    .setTitle('Q4: Using the data, explain why restoring decomposer diversity from 2 to 8 species was important for overall ecosystem recovery. Reference specific weeks\' concepts.')
    .setHelpText('Question ID: g8_c4_w6_s2_q4 | 4 points: Clear explanation with W3 concepts and data')
    .setRequired(true);
  setPointsForLastItem_(form, 4);

  // Q5: Prediction (4 pts)
  form.addParagraphTextItem()
    .setTitle('Q5: If restoration continues, predict what values you would expect for each indicator in Year 15. What would need to happen to restore the lake to its original state (25 fish species, 150 connections)?')
    .setHelpText('Question ID: g8_c4_w6_s2_q5 | 4 points: Reasonable predictions with restoration strategy')
    .setRequired(true);
  setPointsForLastItem_(form, 4);

  return form.getPublishedUrl();
}

// ============================================================================
// STATION 3: REAL-WORLD PROBLEM SOLVING (25 points)
// ============================================================================

function createStation3Form_() {
  const form = FormApp.create('G8.C4.W6: Station 3 - Real-World Problem Solving');
  configFormSettings_(form);

  form.setDescription(
    'Apply ALL your knowledge from Cycle 4 to solve a complex ecosystem challenge.\n\n' +
    'This station assesses your ability to integrate multiple concepts and propose solutions.\n\n' +
    'Points: 25 | Assessment Week'
  );

  // Problem scenario
  form.addSectionHeaderItem()
    .setTitle('Riverside Community Ecosystem Crisis')
    .setHelpText('Riverside faces an ecosystem crisis:\n\n' +
                 '1. INVASIVE SPECIES (W2): Asian carp dominating the river\n' +
                 '2. FOOD WEB COLLAPSE (W4): Native fish species declining; eagles and otters starving\n' +
                 '3. DECOMPOSITION FAILURE (W3): Dead carp not decomposing properly; water quality declining\n' +
                 '4. SERVICE LOSS (W5): Fishing industry ($2M/year) collapsing; tourism declining\n\n' +
                 'Budget: $3 million for ecosystem restoration\n' +
                 'Community goals: Restore native fish, recover fishing industry, improve water quality\n\n' +
                 'Use your knowledge from W1-W5 to advise Riverside\'s council.');

  // Q1: Problem diagnosis (5 pts)
  form.addParagraphTextItem()
    .setTitle('Q1: Diagnose the problem: Using concepts from W1-W5, explain how the invasive carp created a cascade of effects through the ecosystem. Trace the connections between all four issues.')
    .setHelpText('Question ID: g8_c4_w6_s3_q1 | 5 points: Clear causal chain connecting all issues')
    .setRequired(true);
  setPointsForLastItem_(form, 5);

  // Q2: Solution prioritization (5 pts)
  form.addParagraphTextItem()
    .setTitle('Q2: With limited budget, what should be addressed FIRST? Rank these priorities and explain your reasoning: (A) Remove invasive carp, (B) Reintroduce native fish, (C) Add decomposer organisms, (D) Create wildlife corridors.')
    .setHelpText('Question ID: g8_c4_w6_s3_q2 | 5 points: Clear ranking with ecological reasoning')
    .setRequired(true);
  setPointsForLastItem_(form, 5);

  // Q3: Solution design (5 pts)
  form.addParagraphTextItem()
    .setTitle('Q3: Design a comprehensive restoration plan using the $3 million budget. Specify: (1) Budget allocation, (2) Specific actions for each problem, and (3) How each action addresses a specific concept from W1-W5.')
    .setHelpText('Question ID: g8_c4_w6_s3_q3 | 5 points: Complete plan with concept integration')
    .setRequired(true);
  setPointsForLastItem_(form, 5);

  // Q4: Food web rebuilding (5 pts)
  form.addParagraphTextItem()
    .setTitle('Q4: Using W4 concepts, explain how you would rebuild the food web to be MORE resilient than before. What lessons from the collapse would inform your design?')
    .setHelpText('Question ID: g8_c4_w6_s3_q4 | 5 points: Resilience principles applied to restoration')
    .setRequired(true);
  setPointsForLastItem_(form, 5);

  // Q5: Long-term success (5 pts)
  form.addParagraphTextItem()
    .setTitle('Q5: If your plan succeeds, describe what the Riverside ecosystem will look like in 20 years. Include: energy flow, species diversity, ecosystem services value, and measures to prevent future invasions.')
    .setHelpText('Question ID: g8_c4_w6_s3_q5 | 5 points: Vision with all cycle concepts integrated')
    .setRequired(true);
  setPointsForLastItem_(form, 5);

  return form.getPublishedUrl();
}

// ============================================================================
// EXIT TICKET: COMPREHENSIVE ASSESSMENT (23 points)
// ============================================================================

function createExitTicketForm_() {
  const form = FormApp.create('G8.C4.W6: Exit Ticket - Comprehensive Assessment');
  configFormSettings_(form);

  form.setDescription(
    'Final assessment covering all concepts from Cycle 4.\n\n' +
    'Structure: Integration questions spanning W1-W5\n' +
    'Points: 23 | Assessment Week'
  );

  // Q1: Integration - Energy and food webs (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q1: A complex food web with many trophic levels requires a large producer base because:')
    .setHelpText('Question ID: g8_c4_w6_exit_q1 | Integration: W1 + W4')
    .setChoices([
      form.createChoice('Producers are unimportant in food webs', false),
      form.createChoice('Only 10% of energy transfers between levels, so many levels need massive primary production', true),
      form.createChoice('100% of energy transfers between levels', false),
      form.createChoice('Food web complexity has no relation to energy', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q2: Integration - Invasives and services (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q2: When invasive species reduce native biodiversity, ecosystem services:')
    .setHelpText('Question ID: g8_c4_w6_exit_q2 | Integration: W2 + W5')
    .setChoices([
      form.createChoice('Increase because invasives are more productive', false),
      form.createChoice('Decrease because fewer species means less functional redundancy and service provision', true),
      form.createChoice('Stay the same regardless of species composition', false),
      form.createChoice('Are unaffected by invasive species', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q3: Matter and energy distinction (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q3: A key difference between energy flow and matter cycling in ecosystems is:')
    .setHelpText('Question ID: g8_c4_w6_exit_q3 | Cross-cutting concept')
    .setChoices([
      form.createChoice('Energy cycles while matter flows', false),
      form.createChoice('Energy flows one-way (is used once) while matter cycles repeatedly through the ecosystem', true),
      form.createChoice('Both energy and matter are destroyed in ecosystems', false),
      form.createChoice('Matter cannot be recycled', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // Q4: Stability and resilience (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q4: An ecosystem with high functional redundancy is more resilient because:')
    .setHelpText('Question ID: g8_c4_w6_exit_q4 | Integration: W3 + W4')
    .setChoices([
      form.createChoice('Redundancy wastes energy', false),
      form.createChoice('If one species filling a role is lost, others can continue that ecological function', true),
      form.createChoice('Functional redundancy makes ecosystems weaker', false),
      form.createChoice('All species are interchangeable', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q5: Synthesis (4 pts)
  form.addParagraphTextItem()
    .setTitle('Q5: Write a short paragraph (4-6 sentences) explaining why protecting biodiversity is essential for maintaining ecosystem services that humans depend on. Use at least THREE specific terms from this cycle.')
    .setHelpText('Question ID: g8_c4_w6_exit_q5 | 4 points: Clear synthesis with 3+ accurate terms')
    .setRequired(true);
  setPointsForLastItem_(form, 4);

  // Q6: Reflection (4 pts)
  form.addParagraphTextItem()
    .setTitle('Q6: What is the MOST important insight you gained from Cycle 4 about how ecosystems work? How might this knowledge influence decisions about land use, conservation, or environmental policy?')
    .setHelpText('Question ID: g8_c4_w6_exit_q6 | 4 points: Thoughtful reflection connecting learning to real world')
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
    'Key Takeaway: Ecosystems are complex, interconnected systems. ' +
    'Energy flows one-way while matter cycles. Biodiversity creates stability. ' +
    'Protecting ecosystems protects the services humans depend on!'
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

function createG8C4W6Hook() { return createHookForm_(); }
function createG8C4W6Station1() { return createStation1Form_(); }
function createG8C4W6Station2() { return createStation2Form_(); }
function createG8C4W6Station3() { return createStation3Form_(); }
function createG8C4W6ExitTicket() { return createExitTicketForm_(); }

// ============================================================================
// VALIDATION
// ============================================================================

function validatePoints_() {
  const expected = G8_C4_W6_CONFIG.points;
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
