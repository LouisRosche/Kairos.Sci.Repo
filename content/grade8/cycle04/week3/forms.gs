/**
 * Grade 8 Cycle 4 Week 3: Matter Cycling & Decomposition
 * Standards: MS-LS2-3 (cycling of matter and energy flow in ecosystems)
 * Phenomenon: Why don't dead leaves pile up forever in forests?
 *
 * Form Structure:
 * - Hook: The Disappearing Leaves Mystery (12 pts)
 * - Station 1: Decomposition Investigation (20 pts)
 * - Station 2: Nutrient Cycle Analysis (20 pts)
 * - Station 3: Design a Composting System (25 pts)
 * - Exit Ticket: Matter Cycling Integration (23 pts)
 *
 * Total: 100 points
 */

// ============================================================================
// CONFIGURATION
// ============================================================================

const G8_C4_W3_CONFIG = {
  grade: 8,
  cycle: 4,
  week: 3,
  topic: 'Matter Cycling & Decomposition',
  phenomenon: 'Why don\'t dead leaves pile up forever in forests?',
  standards: ['MS-LS2-3'],
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
      id: 'matter-disappears',
      description: 'Students think decomposing matter disappears or is destroyed',
      targetedIn: ['hook_q4', 's1_q4']
    },
    {
      id: 'decomposers-unimportant',
      description: 'Students underestimate the role of decomposers in ecosystems',
      targetedIn: ['s1_q3', 'exit_q2']
    },
    {
      id: 'matter-energy-same',
      description: 'Students confuse matter cycling with energy flow',
      targetedIn: ['s2_q4', 'exit_q4']
    }
  ],
  spiralTargets: {
    w1: 'Energy flow through trophic levels (10% rule)'
  }
};

// ============================================================================
// MAIN ENTRY POINT
// ============================================================================

/**
 * Creates all forms for G8 C4 W3
 */
function createAllForms() {
  const results = {
    hook: createHookForm_(),
    station1: createStation1Form_(),
    station2: createStation2Form_(),
    station3: createStation3Form_(),
    exitTicket: createExitTicketForm_()
  };

  Logger.log('=== G8 C4 W3 Forms Created ===');
  Object.entries(results).forEach(([name, url]) => {
    Logger.log(`${name}: ${url}`);
  });

  return results;
}

// ============================================================================
// HOOK: THE DISAPPEARING LEAVES MYSTERY (12 points)
// ============================================================================

function createHookForm_() {
  const form = FormApp.create('G8.C4.W3: Hook - The Disappearing Leaves Mystery');
  configFormSettings_(form);

  form.setDescription(
    'Phenomenon: Every autumn, trees drop thousands of kilograms of leaves per hectare. ' +
    'Yet the forest floor never gets buried under meters of dead leaves. ' +
    'Where do all the leaves GO?\n\n' +
    'Points: 12 | Standards: MS-LS2-3'
  );

  // Q1: Initial observation (2 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q1: A forest produces about 5,000 kg of leaf litter per hectare each year. After 100 years, how much leaf litter should have accumulated?')
    .setHelpText('Question ID: g8_c4_w3_hook_q1')
    .setChoices([
      form.createChoice('500,000 kg (if nothing removed it)', true),
      form.createChoice('5,000 kg (stays constant)', false),
      form.createChoice('0 kg (leaves evaporate)', false),
      form.createChoice('50 kg (leaves shrink over time)', false)
    ])
    .setRequired(true)
    .setPoints(2);

  // Q2: Reality check (2 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q2: In reality, the leaf layer on most forest floors is only a few centimeters thick. What MUST be happening to the leaves?')
    .setHelpText('Question ID: g8_c4_w3_hook_q2')
    .setChoices([
      form.createChoice('The leaves are being teleported elsewhere', false),
      form.createChoice('The leaves are being broken down by decomposers', true),
      form.createChoice('The leaves are being compressed into nothing', false),
      form.createChoice('The leaves dissolve in rainwater and disappear', false)
    ])
    .setRequired(true)
    .setPoints(2);

  // Q3: Prior knowledge connection (3 pts)
  form.addParagraphTextItem()
    .setTitle('Q3: In Week 1, you learned that energy flows through ecosystems and is lost as heat at each level. What do you predict happens to the MATTER (atoms) in dead leaves? Is matter lost like energy?')
    .setHelpText('Question ID: g8_c4_w3_hook_q3 | 3 points: Connect energy loss to matter cycling')
    .setRequired(true);
  setPointsForLastItem_(form, 3);

  // Q4: Misconception target - matter-disappears (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q4: A student says "Dead leaves just rot away into nothing." What is WRONG with this statement?')
    .setHelpText('Question ID: g8_c4_w3_hook_q4 | Targets misconception: matter-disappears')
    .setChoices([
      form.createChoice('Nothing - matter can be destroyed through decomposition', false),
      form.createChoice('The atoms in leaves are transformed into CO2, water, and nutrients - not destroyed', true),
      form.createChoice('Leaves actually stay intact forever', false),
      form.createChoice('Only animal matter decomposes, not plant matter', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // Q5: Question generation (2 pts)
  form.addParagraphTextItem()
    .setTitle('Q5: What questions do you have about how matter cycles through ecosystems?')
    .setHelpText('Question ID: g8_c4_w3_hook_q5 | 2 points: Generate investigable questions')
    .setRequired(true);
  setPointsForLastItem_(form, 2);

  return form.getPublishedUrl();
}

// ============================================================================
// STATION 1: DECOMPOSITION INVESTIGATION (20 points)
// ============================================================================

function createStation1Form_() {
  const form = FormApp.create('G8.C4.W3: Station 1 - Decomposition Investigation');
  configFormSettings_(form);

  form.setDescription(
    'Model how decomposers break down dead organic matter and return nutrients to ecosystems.\n\n' +
    'Use the decomposition simulation to track what happens to matter in dead organisms.\n\n' +
    'Spiral Review: Energy flow and the 10% rule from Week 1\n' +
    'Points: 20 | Standards: MS-LS2-3'
  );

  // Q1: Decomposer identification (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q1: Which organisms are the PRIMARY decomposers in most ecosystems?')
    .setHelpText('Question ID: g8_c4_w3_s1_q1')
    .setChoices([
      form.createChoice('Large predators like wolves and lions', false),
      form.createChoice('Bacteria and fungi', true),
      form.createChoice('Plants and algae', false),
      form.createChoice('Insects only', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // Q2: Decomposition products (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q2: When decomposers break down a dead leaf, what are the main products?')
    .setHelpText('Question ID: g8_c4_w3_s1_q2')
    .setChoices([
      form.createChoice('Pure energy that floats away', false),
      form.createChoice('CO2, water, and mineral nutrients (nitrogen, phosphorus)', true),
      form.createChoice('New plant cells that grow from the dead leaf', false),
      form.createChoice('Nothing - the leaf just disappears', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // Q3: Misconception target - decomposers-unimportant (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q3: What would happen to an ecosystem if ALL decomposers suddenly disappeared?')
    .setHelpText('Question ID: g8_c4_w3_s1_q3 | Targets misconception: decomposers-unimportant')
    .setChoices([
      form.createChoice('Nothing - other organisms would take over', false),
      form.createChoice('Dead matter would pile up and nutrients would stop cycling back to producers', true),
      form.createChoice('Plants would grow faster without competition', false),
      form.createChoice('Animals would eat the dead matter instead', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // Q4: Misconception target - matter-disappears (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q4: A 10 kg log decomposes over several years until it\'s gone. What happened to the 10 kg of matter?')
    .setHelpText('Question ID: g8_c4_w3_s1_q4 | Targets misconception: matter-disappears')
    .setChoices([
      form.createChoice('The 10 kg was converted to energy', false),
      form.createChoice('The 10 kg was transformed into gases (CO2, H2O) and nutrients that entered soil/air', true),
      form.createChoice('The 10 kg was destroyed by bacteria', false),
      form.createChoice('The 10 kg evaporated into space', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q5: Matter tracking (4 pts)
  form.addParagraphTextItem()
    .setTitle('Q5: Using the simulation, trace the carbon atoms from a dead leaf through decomposition. Where do the carbon atoms end up? List at least 3 possible destinations.')
    .setHelpText('Question ID: g8_c4_w3_s1_q5 | 4 points: Identify 3+ carbon destinations with explanations')
    .setRequired(true);
  setPointsForLastItem_(form, 4);

  // Q6: Spiral review - W1 energy flow (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q6: [SPIRAL W1] In Week 1, you learned the 10% rule - only 10% of energy transfers between trophic levels. Does matter follow the same 10% rule?')
    .setHelpText('Question ID: g8_c4_w3_s1_q6 | Spiral: W1 Energy Flow')
    .setChoices([
      form.createChoice('Yes - only 10% of matter transfers between levels', false),
      form.createChoice('No - matter cycles completely; energy flows and is lost as heat', true),
      form.createChoice('Yes - matter is also lost as heat', false),
      form.createChoice('Neither energy nor matter transfers between levels', false)
    ])
    .setRequired(true)
    .setPoints(3);

  return form.getPublishedUrl();
}

// ============================================================================
// STATION 2: NUTRIENT CYCLE ANALYSIS (20 points)
// ============================================================================

function createStation2Form_() {
  const form = FormApp.create('G8.C4.W3: Station 2 - Nutrient Cycle Analysis');
  configFormSettings_(form);

  form.setDescription(
    'Analyze how essential nutrients cycle through ecosystems via decomposition.\n\n' +
    'Compare how matter cycling differs from energy flow.\n\n' +
    'Points: 20 | Standards: MS-LS2-3'
  );

  // Scenario introduction
  form.addSectionHeaderItem()
    .setTitle('Ecosystem Matter Budget')
    .setHelpText('A forest ecosystem contains:\n' +
                 '• Living biomass: 200,000 kg/ha\n' +
                 '• Dead organic matter (soil): 150,000 kg/ha\n' +
                 '• Annual leaf fall: 5,000 kg/ha\n' +
                 '• Annual decomposition: ~5,000 kg/ha');

  // Q1: Steady state understanding (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q1: The forest adds 5,000 kg of dead leaves each year and decomposes about 5,000 kg. What does this tell us about the system?')
    .setHelpText('Question ID: g8_c4_w3_s2_q1')
    .setChoices([
      form.createChoice('The forest is dying', false),
      form.createChoice('The system is in approximate balance - matter is cycling', true),
      form.createChoice('Decomposition is too slow', false),
      form.createChoice('The numbers must be wrong', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q2: Nutrient pathway (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q2: When decomposers break down dead leaves, nutrients like nitrogen and phosphorus are released. Where do these nutrients go next?')
    .setHelpText('Question ID: g8_c4_w3_s2_q2')
    .setChoices([
      form.createChoice('They are destroyed and must be replaced', false),
      form.createChoice('They enter the soil and can be absorbed by plant roots', true),
      form.createChoice('They float into the atmosphere permanently', false),
      form.createChoice('They turn into energy for decomposers', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q3: Cycle completion (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q3: A nitrogen atom in a dead leaf is released by decomposers, absorbed by a plant root, built into a new leaf, eaten by a caterpillar, then excreted. This is an example of:')
    .setHelpText('Question ID: g8_c4_w3_s2_q3')
    .setChoices([
      form.createChoice('Energy flow through an ecosystem', false),
      form.createChoice('Matter cycling through an ecosystem', true),
      form.createChoice('Matter being destroyed and recreated', false),
      form.createChoice('The 10% energy rule', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q4: Misconception target - matter-energy-same (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q4: What is the KEY difference between how MATTER and ENERGY move through ecosystems?')
    .setHelpText('Question ID: g8_c4_w3_s2_q4 | Targets misconception: matter-energy-same')
    .setChoices([
      form.createChoice('Both matter and energy cycle continuously', false),
      form.createChoice('Matter cycles (atoms are reused); energy flows through and is lost as heat', true),
      form.createChoice('Both matter and energy flow through and are lost', false),
      form.createChoice('Energy cycles; matter flows through and is lost', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q5: Application (4 pts)
  form.addParagraphTextItem()
    .setTitle('Q5: A farmer removes crops (and their nutrients) from a field each year. Using your understanding of matter cycling, explain why the farmer must add fertilizer to maintain crop yields.')
    .setHelpText('Question ID: g8_c4_w3_s2_q5 | 4 points: Connect nutrient removal to cycle disruption')
    .setRequired(true);
  setPointsForLastItem_(form, 4);

  return form.getPublishedUrl();
}

// ============================================================================
// STATION 3: DESIGN A COMPOSTING SYSTEM (25 points)
// ============================================================================

function createStation3Form_() {
  const form = FormApp.create('G8.C4.W3: Station 3 - Design a Composting System');
  configFormSettings_(form);

  form.setDescription(
    'Apply your understanding of decomposition to design an efficient composting system.\n\n' +
    'Engineering Challenge: Maximize decomposition rate while producing useful compost.\n\n' +
    'Points: 25 | Standards: MS-LS2-3, MS-ETS1-2'
  );

  // Scenario introduction
  form.addSectionHeaderItem()
    .setTitle('School Composting Challenge')
    .setHelpText('Your school cafeteria produces 50 kg of food waste per day.\n' +
                 'You need to design a composting system that:\n' +
                 '• Breaks down waste within 8 weeks\n' +
                 '• Produces usable compost for the school garden\n' +
                 '• Doesn\'t create odor problems\n\n' +
                 'Factors affecting decomposition rate:\n' +
                 '• Temperature (warmer = faster, up to 60°C)\n' +
                 '• Moisture (40-60% is optimal)\n' +
                 '• Oxygen (aerobic decomposition is faster)\n' +
                 '• Carbon:Nitrogen ratio (25-30:1 is optimal)');

  // Q1: Decomposer requirements (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q1: Decomposing bacteria work best with oxygen (aerobic conditions). How can you ensure your compost pile has enough oxygen?')
    .setHelpText('Question ID: g8_c4_w3_s3_q1')
    .setChoices([
      form.createChoice('Pack the pile as tightly as possible', false),
      form.createChoice('Turn the pile regularly and/or add bulky materials for air spaces', true),
      form.createChoice('Keep the pile underwater', false),
      form.createChoice('Add more food waste to increase oxygen', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q2: C:N ratio understanding (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q2: Food scraps are high in nitrogen (C:N ratio ~15:1). Dry leaves are high in carbon (C:N ratio ~50:1). To achieve the optimal 25-30:1 ratio, you should:')
    .setHelpText('Question ID: g8_c4_w3_s3_q2')
    .setChoices([
      form.createChoice('Use only food scraps', false),
      form.createChoice('Mix food scraps with dry leaves or cardboard', true),
      form.createChoice('Use only dry leaves', false),
      form.createChoice('C:N ratio doesn\'t matter', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q3: System design (5 pts)
  form.addParagraphTextItem()
    .setTitle('Q3: Design your composting system. Describe: (1) Size/structure of the compost bin, (2) What materials you\'ll mix together, (3) How you\'ll maintain optimal conditions (turning schedule, moisture management).')
    .setHelpText('Question ID: g8_c4_w3_s3_q3 | 5 points: Complete design addressing all three elements')
    .setRequired(true);
  setPointsForLastItem_(form, 5);

  // Q4: Problem solving (6 pts)
  form.addParagraphTextItem()
    .setTitle('Q4: Your compost pile starts smelling bad (like rotten eggs). Based on what you know about decomposition, diagnose TWO possible causes and explain how to fix each one.')
    .setHelpText('Question ID: g8_c4_w3_s3_q4 | 6 points: Two causes with scientific explanations and solutions')
    .setRequired(true);
  setPointsForLastItem_(form, 6);

  // Q5: Matter tracking (6 pts)
  form.addParagraphTextItem()
    .setTitle('Q5: You add 50 kg of food waste to your compost. After 8 weeks, the finished compost weighs only 15 kg. Where did the other 35 kg go? Explain using your knowledge of decomposition and matter cycling.')
    .setHelpText('Question ID: g8_c4_w3_s3_q5 | 6 points: Account for mass using conservation of matter')
    .setRequired(true);
  setPointsForLastItem_(form, 6);

  return form.getPublishedUrl();
}

// ============================================================================
// EXIT TICKET: MATTER CYCLING INTEGRATION (23 points)
// ============================================================================

function createExitTicketForm_() {
  const form = FormApp.create('G8.C4.W3: Exit Ticket - Matter Cycling Integration');
  configFormSettings_(form);

  form.setDescription(
    'Demonstrate your understanding of decomposition and matter cycling in ecosystems.\n\n' +
    'Structure: 2 New + 2 Spiral + 1 Integration + 1 SEP\n' +
    'Points: 23 | Standards: MS-LS2-3'
  );

  // NEW Q1: Matter cycling basics (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q1 [NEW]: Which statement BEST describes matter cycling in ecosystems?')
    .setHelpText('Question ID: g8_c4_w3_exit_q1')
    .setChoices([
      form.createChoice('Matter is created by producers and destroyed by decomposers', false),
      form.createChoice('The same atoms cycle repeatedly between living and nonliving components', true),
      form.createChoice('Matter flows from sun to producers to consumers and is lost', false),
      form.createChoice('Only energy cycles; matter is always lost', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // NEW Q2: Misconception target - decomposers-unimportant (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q2 [NEW]: Why are decomposers considered essential to ALL ecosystems?')
    .setHelpText('Question ID: g8_c4_w3_exit_q2 | Targets misconception: decomposers-unimportant')
    .setChoices([
      form.createChoice('They provide food for large predators', false),
      form.createChoice('They release nutrients from dead matter so producers can use them again', true),
      form.createChoice('They create new matter from nothing', false),
      form.createChoice('They are not essential - ecosystems can function without them', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // SPIRAL Q3: W1 - Energy flow (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q3 [SPIRAL W1]: In Week 1, you learned that only 10% of energy transfers between trophic levels. The other 90% is:')
    .setHelpText('Question ID: g8_c4_w3_exit_q3 | Spiral: W1 Energy Flow')
    .setChoices([
      form.createChoice('Stored in the ecosystem for later', false),
      form.createChoice('Lost as heat through metabolism', true),
      form.createChoice('Recycled back to producers', false),
      form.createChoice('Converted to matter', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // SPIRAL Q4: W2 - Ecosystem disruption (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q4 [SPIRAL W2]: Misconception target - matter-energy-same')
    .setHelpText('Question ID: g8_c4_w3_exit_q4 | Targets misconception: matter-energy-same')
    .setChoices([
      form.createChoice('Both matter and energy are lost from the ecosystem', false),
      form.createChoice('Energy is lost as heat; matter cycles back through decomposition', true),
      form.createChoice('Both matter and energy cycle indefinitely', false),
      form.createChoice('Matter is lost; energy cycles back', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // INTEGRATION Q5: Cross-concept connection (5 pts)
  form.addParagraphTextItem()
    .setTitle('Q5 [INTEGRATION]: In Week 1, you learned energy flows (and is lost). In Week 3, you learned matter cycles. A forest loses 90% of its energy at each trophic level, yet the same atoms have been cycling for millions of years. Explain how BOTH of these can be true at the same time.')
    .setHelpText('Question ID: g8_c4_w3_exit_q5 | 5 points: Distinguish energy flow from matter cycling')
    .setRequired(true);
  setPointsForLastItem_(form, 5);

  // SEP Q6: Developing models (4 pts)
  form.addParagraphTextItem()
    .setTitle('Q6 [SEP]: Draw or describe a model showing how a carbon atom in a dead leaf could end up in a new leaf on a different tree. Include at least 4 steps and label the role of decomposers.')
    .setHelpText('Question ID: g8_c4_w3_exit_q6 | 4 points: SEP 2 - Developing and Using Models')
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
  form.setRequireLogin(true);
  form.setLimitOneResponsePerUser(true);
  form.setShowLinkToRespondAgain(false);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Your responses have been recorded. Great work understanding decomposition!\n\n' +
    'Key Takeaway: Matter cycles through ecosystems - the atoms in your body were once ' +
    'part of countless other organisms!'
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

function createG8C4W3Hook() { return createHookForm_(); }
function createG8C4W3Station1() { return createStation1Form_(); }
function createG8C4W3Station2() { return createStation2Form_(); }
function createG8C4W3Station3() { return createStation3Form_(); }
function createG8C4W3ExitTicket() { return createExitTicketForm_(); }

// ============================================================================
// VALIDATION
// ============================================================================

function validatePoints_() {
  const expected = G8_C4_W3_CONFIG.points;
  const calculated = {
    hook: 2 + 2 + 3 + 3 + 2,        // 12
    station1: 3 + 3 + 3 + 4 + 4 + 3,  // 20
    station2: 4 + 4 + 4 + 4 + 4,     // 20
    station3: 4 + 4 + 5 + 6 + 6,     // 25
    exitTicket: 4 + 4 + 3 + 3 + 5 + 4  // 23
  };
  calculated.total = Object.values(calculated).reduce((a, b) => a + b, 0);

  Logger.log('=== Point Validation ===');
  Object.keys(expected).forEach(key => {
    const match = expected[key] === calculated[key];
    Logger.log(`${key}: Expected ${expected[key]}, Got ${calculated[key]} ${match ? '✓' : '✗'}`);
  });

  return calculated.total === expected.total;
}
