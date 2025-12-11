/**
 * Grade 7 Cycle 4 Week 4: Nitrogen Cycle & Agriculture
 * Standards: MS-ESS3-3 (monitoring/minimizing human impact), MS-LS2-3 (matter cycling)
 * Phenomenon: Why does corn need fertilizer but prairie grass doesn't?
 *
 * Form Structure:
 * - Hook: The Fertilizer Mystery (12 pts)
 * - Station 1: Nitrogen Cycle Investigation (20 pts)
 * - Station 2: Agricultural Impact Analysis (20 pts)
 * - Station 3: Design a Sustainable Farm (25 pts)
 * - Exit Ticket: Nitrogen Cycle Integration (23 pts)
 *
 * Total: 100 points
 */

// ============================================================================
// CONFIGURATION
// ============================================================================

const G7_C4_W4_CONFIG = {
  grade: 7,
  cycle: 4,
  week: 4,
  topic: 'Nitrogen Cycle & Agriculture',
  phenomenon: 'Why does corn need fertilizer but prairie grass doesn\'t?',
  standards: ['MS-ESS3-3', 'MS-LS2-3'],
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
      id: 'nitrogen-from-soil-only',
      description: 'Students think plants get nitrogen only from soil, not understanding atmospheric nitrogen fixation',
      targetedIn: ['hook_q3', 's1_q2']
    },
    {
      id: 'fertilizer-creates-nitrogen',
      description: 'Students think fertilizer creates new nitrogen rather than adding fixed nitrogen',
      targetedIn: ['s1_q4', 'exit_q2']
    },
    {
      id: 'more-fertilizer-always-better',
      description: 'Students think more fertilizer always leads to better plant growth',
      targetedIn: ['s2_q3', 'exit_q4']
    }
  ],
  spiralTargets: {
    w3: 'Carbon cycle and conservation of mass',
    w2: 'Nutrient runoff and eutrophication'
  }
};

// ============================================================================
// MAIN ENTRY POINT
// ============================================================================

/**
 * Creates all forms for G7 C4 W4
 */
function createAllForms() {
  const results = {
    hook: createHookForm_(),
    station1: createStation1Form_(),
    station2: createStation2Form_(),
    station3: createStation3Form_(),
    exitTicket: createExitTicketForm_()
  };

  Logger.log('=== G7 C4 W4 Forms Created ===');
  Object.entries(results).forEach(([name, url]) => {
    Logger.log(`${name}: ${url}`);
  });

  return results;
}

// ============================================================================
// HOOK: THE FERTILIZER MYSTERY (12 points)
// ============================================================================

function createHookForm_() {
  const form = FormApp.create('G7.C4.W4: Hook - The Fertilizer Mystery');
  configFormSettings_(form);

  form.setDescription(
    'Phenomenon: A farmer plants corn in a field where native prairie grass once grew. ' +
    'The prairie grass thrived for thousands of years without any fertilizer. ' +
    'But the corn fails to grow well unless the farmer adds nitrogen fertilizer every year. ' +
    'Why does corn need fertilizer but prairie grass doesn\'t?\n\n' +
    'Points: 12 | Standards: MS-ESS3-3, MS-LS2-3'
  );

  // Q1: Initial observation (2 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q1: Both corn and prairie grass are plants that need nitrogen to grow. What is the MOST puzzling part of this phenomenon?')
    .setHelpText('Question ID: g7_c4_w4_hook_q1')
    .setChoices([
      form.createChoice('Corn is a plant and prairie grass is not', false),
      form.createChoice('Prairie grass gets nitrogen from somewhere without human help, but corn cannot', true),
      form.createChoice('Nitrogen is only needed by corn plants', false),
      form.createChoice('Fertilizer is made from prairie grass', false)
    ])
    .setRequired(true)
    .setPoints(2);

  // Q2: Prior knowledge activation (2 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q2: The atmosphere is about 78% nitrogen gas (N2). Why can\'t most plants use this nitrogen directly?')
    .setHelpText('Question ID: g7_c4_w4_hook_q2')
    .setChoices([
      form.createChoice('There isn\'t enough nitrogen in the atmosphere', false),
      form.createChoice('Atmospheric nitrogen gas (N2) is in a form most plants cannot absorb; it must be "fixed" first', true),
      form.createChoice('Plants breathe out nitrogen so they don\'t need more', false),
      form.createChoice('Nitrogen gas is poisonous to plants', false)
    ])
    .setRequired(true)
    .setPoints(2);

  // Q3: Misconception target - nitrogen-from-soil-only (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q3: A student says "Prairie grass must have found nitrogen in the soil, and corn used it all up." What is INCOMPLETE about this explanation?')
    .setHelpText('Question ID: g7_c4_w4_hook_q3 | Targets misconception: nitrogen-from-soil-only')
    .setChoices([
      form.createChoice('The explanation is complete and correct', false),
      form.createChoice('It doesn\'t explain how nitrogen gets INTO the soil in the first place or gets replaced', true),
      form.createChoice('Prairie grass doesn\'t actually need nitrogen', false),
      form.createChoice('Soil cannot contain nitrogen', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // Q4: Connection to cycles (3 pts)
  form.addParagraphTextItem()
    .setTitle('Q4: In Week 3, you learned that carbon cycles through ecosystems. Do you think nitrogen also cycles? What evidence from the phenomenon supports your answer?')
    .setHelpText('Question ID: g7_c4_w4_hook_q4 | 3 points: Connect to carbon cycle learning, cite evidence from phenomenon')
    .setRequired(true);
  setPointsForLastItem_(form, 3);

  // Q5: Question generation (2 pts)
  form.addParagraphTextItem()
    .setTitle('Q5: What questions do you have about how nitrogen moves through ecosystems and why some plants need fertilizer?')
    .setHelpText('Question ID: g7_c4_w4_hook_q5 | 2 points: Generate investigable questions')
    .setRequired(true);
  setPointsForLastItem_(form, 2);

  return form.getPublishedUrl();
}

// ============================================================================
// STATION 1: NITROGEN CYCLE INVESTIGATION (20 points)
// ============================================================================

function createStation1Form_() {
  const form = FormApp.create('G7.C4.W4: Station 1 - Nitrogen Cycle Investigation');
  configFormSettings_(form);

  form.setDescription(
    'Trace nitrogen through the atmosphere, soil, plants, animals, and back.\n\n' +
    'Use the interactive nitrogen cycle simulation to understand nitrogen fixation, ' +
    'nitrification, assimilation, and denitrification.\n\n' +
    'Spiral Review: Carbon cycle from Week 3\n' +
    'Points: 20 | Standards: MS-ESS3-3, MS-LS2-3'
  );

  // Q1: Nitrogen fixation (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q1: "Nitrogen fixation" is the process of converting atmospheric N2 into forms plants can use. Which organisms can do this naturally?')
    .setHelpText('Question ID: g7_c4_w4_s1_q1')
    .setChoices([
      form.createChoice('All plants through their leaves', false),
      form.createChoice('Special bacteria, including some that live in root nodules of legumes (beans, clover)', true),
      form.createChoice('Fish in nearby streams', false),
      form.createChoice('Only humans in fertilizer factories', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // Q2: Misconception target - nitrogen-from-soil-only (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q2: In the simulation, you see nitrogen entering the soil from multiple sources. Besides decomposition of dead organisms, what is another major source of soil nitrogen?')
    .setHelpText('Question ID: g7_c4_w4_s1_q2 | Targets misconception: nitrogen-from-soil-only')
    .setChoices([
      form.createChoice('Nitrogen-fixing bacteria that convert atmospheric N2 to ammonia', true),
      form.createChoice('Rainwater that contains nitrogen gas', false),
      form.createChoice('Rocks that release nitrogen when they weather', false),
      form.createChoice('Soil creates new nitrogen atoms', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q3: Cycle connections (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q3: How does nitrogen move from plants to animals and then back to the soil?')
    .setHelpText('Question ID: g7_c4_w4_s1_q3')
    .setChoices([
      form.createChoice('Animals absorb nitrogen from the air, then breathe it into soil', false),
      form.createChoice('Animals eat plants (assimilation), then waste/decomposition returns nitrogen to soil', true),
      form.createChoice('Nitrogen teleports directly from plants to soil', false),
      form.createChoice('Animals don\'t participate in the nitrogen cycle', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // Q4: Misconception target - fertilizer-creates-nitrogen (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q4: Synthetic fertilizers add nitrogen to farm soil. Does this fertilizer CREATE new nitrogen, or does it come from somewhere else?')
    .setHelpText('Question ID: g7_c4_w4_s1_q4 | Targets misconception: fertilizer-creates-nitrogen')
    .setChoices([
      form.createChoice('Fertilizer factories create new nitrogen atoms', false),
      form.createChoice('Fertilizer nitrogen comes from atmospheric N2, converted industrially (Haber process)', true),
      form.createChoice('Fertilizer is made of artificial nitrogen that didn\'t exist before', false),
      form.createChoice('Nitrogen in fertilizer appears spontaneously in the factory', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q5: Data analysis (3 pts)
  form.addParagraphTextItem()
    .setTitle('Q5: Using the simulation, trace a single nitrogen atom from the atmosphere, through fixation, into a plant, into an animal, and back to the atmosphere. Describe each step.')
    .setHelpText('Question ID: g7_c4_w4_s1_q5 | 3 points: Complete nitrogen pathway with all transitions explained')
    .setRequired(true);
  setPointsForLastItem_(form, 3);

  // Q6: Spiral review - W3 Carbon cycle (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q6: [SPIRAL W3] Compare the nitrogen cycle to the carbon cycle you learned about last week. How are they SIMILAR?')
    .setHelpText('Question ID: g7_c4_w4_s1_q6 | Spiral: W3 Carbon Cycle')
    .setChoices([
      form.createChoice('Both cycles are completely closed - no matter enters or leaves Earth', false),
      form.createChoice('Both involve matter cycling through atmosphere, organisms, and soil/water with no creation or destruction', true),
      form.createChoice('Both cycles only involve plants, not animals', false),
      form.createChoice('The nitrogen and carbon cycles are completely unrelated', false)
    ])
    .setRequired(true)
    .setPoints(3);

  return form.getPublishedUrl();
}

// ============================================================================
// STATION 2: AGRICULTURAL IMPACT ANALYSIS (20 points)
// ============================================================================

function createStation2Form_() {
  const form = FormApp.create('G7.C4.W4: Station 2 - Agricultural Impact Analysis');
  configFormSettings_(form);

  form.setDescription(
    'Analyze data on how agriculture disrupts the nitrogen cycle and causes environmental problems.\n\n' +
    'Connect fertilizer runoff to the dead zones you learned about in Week 2.\n\n' +
    'Points: 20 | Standards: MS-ESS3-3'
  );

  // Scenario introduction
  form.addSectionHeaderItem()
    .setTitle('Agricultural Nitrogen Data')
    .setHelpText('US Nitrogen Use (approximate):\n' +
                 '• 12 million tonnes of synthetic nitrogen fertilizer applied annually\n' +
                 '• Only 50% is actually absorbed by crops\n' +
                 '• Remaining 50% either:\n' +
                 '  - Runs off into waterways (25%)\n' +
                 '  - Converts to nitrous oxide (N2O), a greenhouse gas (10%)\n' +
                 '  - Leaches into groundwater (15%)');

  // Q1: Data interpretation (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q1: Based on the data, how many tonnes of nitrogen fertilizer run off into waterways each year in the US?')
    .setHelpText('Question ID: g7_c4_w4_s2_q1 | Calculate: 12 million × 0.25')
    .setChoices([
      form.createChoice('1.2 million tonnes', false),
      form.createChoice('3 million tonnes', true),
      form.createChoice('6 million tonnes', false),
      form.createChoice('12 million tonnes', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q2: Consequences (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q2: The data shows 10% of applied nitrogen converts to nitrous oxide (N2O). Why is this a problem beyond wasted fertilizer?')
    .setHelpText('Question ID: g7_c4_w4_s2_q2')
    .setChoices([
      form.createChoice('Nitrous oxide smells bad near farms', false),
      form.createChoice('Nitrous oxide is a potent greenhouse gas, contributing to climate change', true),
      form.createChoice('Nitrous oxide makes crops grow too fast', false),
      form.createChoice('Nitrous oxide is harmless and just returns to the atmosphere', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q3: Misconception target - more-fertilizer-always-better (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q3: A farmer thinks "If I double my fertilizer use, I\'ll double my crop yield." Based on the data, what is WRONG with this reasoning?')
    .setHelpText('Question ID: g7_c4_w4_s2_q3 | Targets misconception: more-fertilizer-always-better')
    .setChoices([
      form.createChoice('Nothing - more fertilizer always means more crops', false),
      form.createChoice('Plants can only absorb so much; excess runs off causing pollution and wasting money', true),
      form.createChoice('Doubling fertilizer will triple crop yield', false),
      form.createChoice('Fertilizer has no effect on crop growth', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q4: Connection to W2 (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q4: In Week 2, you learned about eutrophication and dead zones. How does the 3 million tonnes of nitrogen runoff contribute to these problems?')
    .setHelpText('Question ID: g7_c4_w4_s2_q4 | Connection to W2 Eutrophication')
    .setChoices([
      form.createChoice('Nitrogen makes water cleaner and clearer', false),
      form.createChoice('Excess nitrogen feeds algae blooms, which decompose and deplete oxygen, creating dead zones', true),
      form.createChoice('Nitrogen sinks to the bottom and stays there harmlessly', false),
      form.createChoice('Fish use the nitrogen to grow bigger', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q5: Analysis (4 pts)
  form.addParagraphTextItem()
    .setTitle('Q5: Prairie ecosystems cycle nitrogen naturally without creating pollution. What is DIFFERENT about how agricultural systems handle nitrogen that leads to these environmental problems?')
    .setHelpText('Question ID: g7_c4_w4_s2_q5 | 4 points: Compare natural vs agricultural nitrogen cycling')
    .setRequired(true);
  setPointsForLastItem_(form, 4);

  return form.getPublishedUrl();
}

// ============================================================================
// STATION 3: DESIGN A SUSTAINABLE FARM (25 points)
// ============================================================================

function createStation3Form_() {
  const form = FormApp.create('G7.C4.W4: Station 3 - Design a Sustainable Farm');
  configFormSettings_(form);

  form.setDescription(
    'Apply your nitrogen cycle knowledge to design a farming system that minimizes environmental impact.\n\n' +
    'Engineering Challenge: Reduce nitrogen pollution while maintaining crop yields.\n\n' +
    'Points: 25 | Standards: MS-ESS3-3, MS-ETS1-2'
  );

  // Scenario introduction
  form.addSectionHeaderItem()
    .setTitle('Sustainable Farming Options')
    .setHelpText('A 1000-acre corn farm currently uses:\n' +
                 '• 100 tonnes of synthetic nitrogen fertilizer per year\n' +
                 '• Only 50% efficiency (50 tonnes actually used by crops)\n' +
                 '• Cost: $500 per tonne of fertilizer\n\n' +
                 'Alternative Strategies:\n' +
                 '• Crop rotation with legumes: Fixes 30 tonnes N/year naturally (uses 200 acres)\n' +
                 '• Cover crops: Reduces runoff by 40%, no yield impact\n' +
                 '• Precision application: Increases efficiency to 70%, costs +$5000/year\n' +
                 '• Buffer strips: Filters runoff but uses 50 acres of land');

  // Q1: Problem analysis (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q1: Currently, how much of the fertilizer is WASTED (not absorbed by crops)?')
    .setHelpText('Question ID: g7_c4_w4_s3_q1')
    .setChoices([
      form.createChoice('25 tonnes', false),
      form.createChoice('50 tonnes', true),
      form.createChoice('75 tonnes', false),
      form.createChoice('100 tonnes', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q2: Strategy evaluation (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q2: If the farmer uses crop rotation with legumes, how much synthetic fertilizer could they REDUCE while getting the same total nitrogen?')
    .setHelpText('Question ID: g7_c4_w4_s3_q2')
    .setChoices([
      form.createChoice('30 tonnes (legumes replace this amount)', true),
      form.createChoice('50 tonnes', false),
      form.createChoice('70 tonnes', false),
      form.createChoice('100 tonnes', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q3: Cost-benefit analysis (5 pts)
  form.addParagraphTextItem()
    .setTitle('Q3: Calculate: If precision application costs $5000/year extra but increases efficiency from 50% to 70%, how much fertilizer could the farmer save? At $500/tonne, is this cost-effective? Show your math.')
    .setHelpText('Question ID: g7_c4_w4_s3_q3 | 5 points: Complete calculation with clear reasoning')
    .setRequired(true);
  setPointsForLastItem_(form, 5);

  // Q4: Design proposal (6 pts)
  form.addParagraphTextItem()
    .setTitle('Q4: Design a comprehensive plan combining multiple strategies to maximize nitrogen efficiency while minimizing environmental impact. Specify which strategies you would use and explain why this combination works better than any single approach.')
    .setHelpText('Question ID: g7_c4_w4_s3_q4 | 6 points: Multi-strategy plan with synergy explanation')
    .setRequired(true);
  setPointsForLastItem_(form, 6);

  // Q5: Trade-off analysis (6 pts)
  form.addParagraphTextItem()
    .setTitle('Q5: Every strategy has trade-offs. Identify TWO trade-offs in your design (e.g., cost vs. environmental benefit, land use vs. efficiency) and explain how you balanced them in your plan.')
    .setHelpText('Question ID: g7_c4_w4_s3_q5 | 6 points: Two distinct trade-offs with thoughtful balancing')
    .setRequired(true);
  setPointsForLastItem_(form, 6);

  return form.getPublishedUrl();
}

// ============================================================================
// EXIT TICKET: NITROGEN CYCLE INTEGRATION (23 points)
// ============================================================================

function createExitTicketForm_() {
  const form = FormApp.create('G7.C4.W4: Exit Ticket - Nitrogen Cycle Integration');
  configFormSettings_(form);

  form.setDescription(
    'Demonstrate your understanding of the nitrogen cycle and agricultural impacts.\n\n' +
    'Structure: 2 New + 2 Spiral + 1 Integration + 1 SEP\n' +
    'Points: 23 | Standards: MS-ESS3-3, MS-LS2-3'
  );

  // NEW Q1: Nitrogen cycle basics (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q1 [NEW]: Which process converts atmospheric nitrogen (N2) into forms plants can use?')
    .setHelpText('Question ID: g7_c4_w4_exit_q1')
    .setChoices([
      form.createChoice('Photosynthesis', false),
      form.createChoice('Nitrogen fixation (by bacteria)', true),
      form.createChoice('Respiration', false),
      form.createChoice('Evaporation', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // NEW Q2: Misconception target - fertilizer-creates-nitrogen (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q2 [NEW]: A student says "Fertilizer factories create nitrogen out of nothing." Using conservation of mass, explain why this is WRONG.')
    .setHelpText('Question ID: g7_c4_w4_exit_q2 | Targets misconception: fertilizer-creates-nitrogen')
    .setChoices([
      form.createChoice('The statement is correct - factories make new nitrogen', false),
      form.createChoice('Matter cannot be created; factories convert atmospheric N2 to usable forms', true),
      form.createChoice('Fertilizer doesn\'t actually contain nitrogen', false),
      form.createChoice('Nitrogen can be created but only in factories', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // SPIRAL Q3: W3 - Carbon cycle (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q3 [SPIRAL W3]: Both nitrogen and carbon cycle through ecosystems. What process releases BOTH carbon AND nitrogen back to the atmosphere/soil?')
    .setHelpText('Question ID: g7_c4_w4_exit_q3 | Spiral: W3 Carbon Cycle')
    .setChoices([
      form.createChoice('Photosynthesis', false),
      form.createChoice('Decomposition', true),
      form.createChoice('Nitrogen fixation', false),
      form.createChoice('Condensation', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // SPIRAL Q4: W2 - Eutrophication with misconception target (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q4 [SPIRAL W2]: If a farmer adds "extra" fertilizer "just to be safe," what happens to the excess nitrogen?')
    .setHelpText('Question ID: g7_c4_w4_exit_q4 | Spiral: W2 Eutrophication | Targets misconception: more-fertilizer-always-better')
    .setChoices([
      form.createChoice('Crops store it for later use', false),
      form.createChoice('It runs off into waterways, potentially causing algae blooms and dead zones', true),
      form.createChoice('It evaporates harmlessly into space', false),
      form.createChoice('Extra fertilizer is always absorbed by deeper roots', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // INTEGRATION Q5: Cross-concept connection (5 pts)
  form.addParagraphTextItem()
    .setTitle('Q5 [INTEGRATION]: Explain why prairie ecosystems maintained soil fertility for thousands of years without fertilizer, while modern farms deplete soil nitrogen in just a few years. Use your knowledge of the nitrogen cycle, decomposition, and biodiversity in your answer.')
    .setHelpText('Question ID: g7_c4_w4_exit_q5 | 5 points: Connect nitrogen cycle, decomposition, and ecosystem differences')
    .setRequired(true);
  setPointsForLastItem_(form, 5);

  // SEP Q6: Constructing explanations (4 pts)
  form.addParagraphTextItem()
    .setTitle('Q6 [SEP]: Construct an explanation for why rotating crops with legumes (like soybeans) can reduce the need for synthetic fertilizer. Include the role of nitrogen-fixing bacteria in your explanation.')
    .setHelpText('Question ID: g7_c4_w4_exit_q6 | 4 points: SEP 6 - Constructing Explanations with mechanism')
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
    'Your responses have been recorded. Great work understanding the nitrogen cycle!\n\n' +
    'Key Takeaway: Nitrogen cycles through atmosphere, soil, and organisms. ' +
    'Prairie ecosystems cycle nitrogen naturally, while farms often disrupt this balance.'
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

function createG7C4W4Hook() { return createHookForm_(); }
function createG7C4W4Station1() { return createStation1Form_(); }
function createG7C4W4Station2() { return createStation2Form_(); }
function createG7C4W4Station3() { return createStation3Form_(); }
function createG7C4W4ExitTicket() { return createExitTicketForm_(); }

// ============================================================================
// VALIDATION
// ============================================================================

function validatePoints_() {
  const expected = G7_C4_W4_CONFIG.points;
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
