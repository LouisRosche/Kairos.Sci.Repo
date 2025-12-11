/**
 * Grade 7 Cycle 4 Week 4: Nitrogen Cycle & Agriculture
 * Standards: MS-ESS3-3 (human impact), MS-LS2-3 (matter cycling)
 * Phenomenon: Why do some plants need fertilizer and others don't?
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
  phenomenon: 'Why do some plants need fertilizer and others don\'t?',
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
      id: 'nitrogen-from-air-directly',
      description: 'Students think plants can absorb nitrogen directly from air',
      targetedIn: ['hook_q4', 's1_q3']
    },
    {
      id: 'more-fertilizer-better',
      description: 'Students think more fertilizer always means better growth',
      targetedIn: ['s2_q3', 'exit_q2']
    },
    {
      id: 'nitrogen-created',
      description: 'Students think fertilizer creates new nitrogen',
      targetedIn: ['s1_q4', 's2_q4']
    }
  ],
  spiralTargets: {
    w3: 'Carbon cycle and sequestration'
  }
};

// ============================================================================
// MAIN ENTRY POINT
// ============================================================================

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
    'Phenomenon: A prairie field and a corn field sit side by side. ' +
    'The prairie has never been fertilized and grows lush plants every year. ' +
    'The corn field requires hundreds of kilograms of nitrogen fertilizer annually or the crop fails.\n\n' +
    'Why does the prairie NOT need fertilizer?\n\n' +
    'Points: 12 | Standards: MS-ESS3-3'
  );

  // Q1: Initial observation (2 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q1: The atmosphere is 78% nitrogen gas (N2). If nitrogen is everywhere, why can\'t corn just use atmospheric nitrogen?')
    .setHelpText('Question ID: g7_c4_w4_hook_q1')
    .setChoices([
      form.createChoice('Corn doesn\'t need nitrogen', false),
      form.createChoice('Plants cannot use N2 gas directly - it must be converted to usable forms', true),
      form.createChoice('The atmosphere doesn\'t contain enough nitrogen', false),
      form.createChoice('Corn absorbs nitrogen through its leaves', false)
    ])
    .setRequired(true)
    .setPoints(2);

  // Q2: Prairie observation (2 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q2: Prairie ecosystems contain legumes (like clover) that have bacteria in their roots. These bacteria can convert N2 gas into usable nitrogen. What advantage does this give the prairie?')
    .setHelpText('Question ID: g7_c4_w4_hook_q2')
    .setChoices([
      form.createChoice('The bacteria make the soil warmer', false),
      form.createChoice('The prairie has a natural source of usable nitrogen without fertilizer', true),
      form.createChoice('The bacteria protect plants from disease', false),
      form.createChoice('Legumes don\'t actually help the prairie', false)
    ])
    .setRequired(true)
    .setPoints(2);

  // Q3: Prior knowledge connection (3 pts)
  form.addParagraphTextItem()
    .setTitle('Q3: In Week 3, you learned about the carbon cycle. Based on what you know about biogeochemical cycles, predict: Does nitrogen cycle through ecosystems like carbon does, or is it used up?')
    .setHelpText('Question ID: g7_c4_w4_hook_q3 | 3 points: Make prediction with reasoning')
    .setRequired(true);
  setPointsForLastItem_(form, 3);

  // Q4: Misconception target - nitrogen-from-air-directly (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q4: A student says "Plants should be able to absorb nitrogen from the air since it\'s all around them." Why is this INCORRECT?')
    .setHelpText('Question ID: g7_c4_w4_hook_q4 | Targets misconception: nitrogen-from-air-directly')
    .setChoices([
      form.createChoice('There\'s not enough nitrogen in the air', false),
      form.createChoice('N2 gas has a triple bond that plants cannot break - only certain bacteria can convert it', true),
      form.createChoice('Plants don\'t have leaves that can absorb gases', false),
      form.createChoice('The statement is actually correct', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // Q5: Question generation (2 pts)
  form.addParagraphTextItem()
    .setTitle('Q5: What questions do you have about how nitrogen moves through ecosystems and why farms need fertilizer?')
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
    'Trace nitrogen through the nitrogen cycle: atmosphere, soil, plants, animals, and back.\n\n' +
    'Use the interactive nitrogen cycle simulation.\n\n' +
    'Spiral Review: Carbon cycle from Week 3\n' +
    'Points: 20 | Standards: MS-LS2-3'
  );

  // Q1: Nitrogen fixation (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q1: "Nitrogen fixation" converts N2 gas into usable forms. Which organisms can do this?')
    .setHelpText('Question ID: g7_c4_w4_s1_q1')
    .setChoices([
      form.createChoice('All plants', false),
      form.createChoice('Only certain bacteria (including those in legume roots)', true),
      form.createChoice('All animals', false),
      form.createChoice('Fungi and mushrooms', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // Q2: Usable forms (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q2: What forms of nitrogen CAN plants absorb from soil?')
    .setHelpText('Question ID: g7_c4_w4_s1_q2')
    .setChoices([
      form.createChoice('N2 gas', false),
      form.createChoice('Ammonium (NH4+) and nitrate (NO3-)', true),
      form.createChoice('Pure nitrogen atoms', false),
      form.createChoice('Nitrogen oxide gases', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // Q3: Misconception target - nitrogen-from-air-directly (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q3: Why is nitrogen fixation considered a "bottleneck" in ecosystems?')
    .setHelpText('Question ID: g7_c4_w4_s1_q3 | Targets misconception: nitrogen-from-air-directly')
    .setChoices([
      form.createChoice('There\'s very little nitrogen in the atmosphere', false),
      form.createChoice('Converting N2 to usable forms is slow and limited to certain bacteria', true),
      form.createChoice('Plants use nitrogen very quickly', false),
      form.createChoice('Animals hoard all the nitrogen', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // Q4: Misconception target - nitrogen-created (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q4: In the simulation, does the TOTAL amount of nitrogen on Earth change over time?')
    .setHelpText('Question ID: g7_c4_w4_s1_q4 | Targets misconception: nitrogen-created')
    .setChoices([
      form.createChoice('Yes - nitrogen is constantly being created', false),
      form.createChoice('No - nitrogen cycles between reservoirs but the total stays constant', true),
      form.createChoice('Yes - nitrogen is constantly being destroyed', false),
      form.createChoice('It depends on how many plants are growing', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q5: Cycle tracing (4 pts)
  form.addParagraphTextItem()
    .setTitle('Q5: Trace a nitrogen atom through one complete cycle: starting in the atmosphere, through fixation, into a plant, into an animal, through decomposition, and back to the atmosphere. Label each step.')
    .setHelpText('Question ID: g7_c4_w4_s1_q5 | 4 points: Complete cycle with all steps labeled')
    .setRequired(true);
  setPointsForLastItem_(form, 4);

  // Q6: Spiral review - W3 carbon cycle (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q6: [SPIRAL W3] How is the nitrogen cycle SIMILAR to the carbon cycle you learned about last week?')
    .setHelpText('Question ID: g7_c4_w4_s1_q6 | Spiral: W3 Carbon Cycle')
    .setChoices([
      form.createChoice('Both cycles create new atoms', false),
      form.createChoice('Both involve matter cycling through living and nonliving components', true),
      form.createChoice('Both cycles only involve plants', false),
      form.createChoice('They are completely different with no similarities', false)
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
    'Analyze data on how agricultural fertilizer use affects the nitrogen cycle and environment.\n\n' +
    'Examine real data on fertilizer runoff and its consequences.\n\n' +
    'Points: 20 | Standards: MS-ESS3-3'
  );

  // Scenario introduction
  form.addSectionHeaderItem()
    .setTitle('Fertilizer Use Data')
    .setHelpText('Corn farm nitrogen budget:\n' +
                 '• Fertilizer applied: 150 kg N/hectare/year\n' +
                 '• Taken up by crop: 100 kg N/hectare/year\n' +
                 '• Remaining in soil: 20 kg N/hectare/year\n' +
                 '• Lost to runoff/leaching: 30 kg N/hectare/year');

  // Q1: Efficiency calculation (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q1: What percentage of applied fertilizer is actually used by the corn crop?')
    .setHelpText('Question ID: g7_c4_w4_s2_q1 | Calculate: (100/150) × 100%')
    .setChoices([
      form.createChoice('100%', false),
      form.createChoice('67%', true),
      form.createChoice('50%', false),
      form.createChoice('20%', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q2: Runoff consequences (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q2: The 30 kg N/hectare that runs off ends up in streams and rivers. Based on what you learned in Week 2 about nutrients, what problem does this cause?')
    .setHelpText('Question ID: g7_c4_w4_s2_q2')
    .setChoices([
      form.createChoice('The streams become cleaner', false),
      form.createChoice('Excess nutrients cause algae blooms and dead zones (eutrophication)', true),
      form.createChoice('Fish grow larger and healthier', false),
      form.createChoice('The nitrogen disappears harmlessly', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q3: Misconception target - more-fertilizer-better (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q3: A farmer thinks "If 150 kg N/ha gives good yields, 300 kg N/ha will give twice the yield." Why is this reasoning FLAWED?')
    .setHelpText('Question ID: g7_c4_w4_s2_q3 | Targets misconception: more-fertilizer-better')
    .setChoices([
      form.createChoice('The farmer is completely correct', false),
      form.createChoice('Plants can only use so much nitrogen; excess runs off and causes pollution', true),
      form.createChoice('Fertilizer is too expensive to double', false),
      form.createChoice('Nitrogen makes plants grow slower', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q4: Misconception target - nitrogen-created (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q4: Where does the nitrogen in synthetic fertilizer originally come from?')
    .setHelpText('Question ID: g7_c4_w4_s2_q4 | Targets misconception: nitrogen-created')
    .setChoices([
      form.createChoice('Fertilizer factories create new nitrogen atoms', false),
      form.createChoice('The Haber process captures N2 from air and converts it (using fossil fuel energy)', true),
      form.createChoice('Nitrogen is mined from underground deposits', false),
      form.createChoice('Nitrogen is extracted from ocean water', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q5: Data interpretation (4 pts)
  form.addParagraphTextItem()
    .setTitle('Q5: A watershed contains 10,000 hectares of corn farms. Calculate the total nitrogen entering waterways per year from fertilizer runoff. Explain why this is a problem for downstream ecosystems.')
    .setHelpText('Question ID: g7_c4_w4_s2_q5 | 4 points: Calculation + environmental impact explanation')
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
    'Apply your understanding of the nitrogen cycle to design a sustainable farming system.\n\n' +
    'Engineering Challenge: Maintain crop yields while reducing nitrogen pollution.\n\n' +
    'Points: 25 | Standards: MS-ESS3-3, MS-ETS1-2'
  );

  // Scenario introduction
  form.addSectionHeaderItem()
    .setTitle('Farm Design Challenge')
    .setHelpText('A 100-hectare corn farm wants to reduce nitrogen runoff by 50%.\n\n' +
                 'Available strategies:\n' +
                 '• Precision fertilizer application: Reduces waste by 20%, costs $50/ha\n' +
                 '• Cover crops (legumes): Adds 30 kg N/ha naturally, costs $100/ha\n' +
                 '• Buffer strips along streams: Captures 60% of runoff, removes 10 ha from production\n' +
                 '• Split fertilizer applications: Reduces runoff by 25%, same cost\n\n' +
                 'Current runoff: 30 kg N/ha = 3,000 kg total\n' +
                 'Goal: Reduce to 1,500 kg total');

  // Q1: Strategy analysis (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q1: How do legume cover crops help reduce the need for synthetic fertilizer?')
    .setHelpText('Question ID: g7_c4_w4_s3_q1')
    .setChoices([
      form.createChoice('They shade out weeds', false),
      form.createChoice('Bacteria in their roots fix atmospheric N2 into usable nitrogen', true),
      form.createChoice('They absorb pollution from the air', false),
      form.createChoice('They don\'t actually help with nitrogen', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q2: Trade-off analysis (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q2: Buffer strips capture runoff but remove land from production. If you install buffer strips on 10 ha, how much corn production area remains?')
    .setHelpText('Question ID: g7_c4_w4_s3_q2')
    .setChoices([
      form.createChoice('100 ha', false),
      form.createChoice('90 ha', true),
      form.createChoice('110 ha', false),
      form.createChoice('10 ha', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q3: Strategy combination (5 pts)
  form.addParagraphTextItem()
    .setTitle('Q3: Calculate: If you use precision application (20% reduction) AND split applications (25% reduction), what is your new runoff per hectare? (Start with 30 kg/ha, apply reductions)')
    .setHelpText('Question ID: g7_c4_w4_s3_q3 | 5 points: Show calculations step by step')
    .setRequired(true);
  setPointsForLastItem_(form, 5);

  // Q4: Design proposal (6 pts)
  form.addParagraphTextItem()
    .setTitle('Q4: Design a complete plan to reduce nitrogen runoff by 50%. Specify: (1) Which strategies you\'ll use, (2) Calculations showing you meet the goal, (3) Total cost of your plan.')
    .setHelpText('Question ID: g7_c4_w4_s3_q4 | 6 points: Complete plan with math and cost analysis')
    .setRequired(true);
  setPointsForLastItem_(form, 6);

  // Q5: Systems thinking (6 pts)
  form.addParagraphTextItem()
    .setTitle('Q5: Your sustainable farm plan uses nitrogen cycle knowledge to reduce pollution. Explain how your strategies work WITH natural nitrogen cycling rather than against it. What would happen if all farms adopted your approach?')
    .setHelpText('Question ID: g7_c4_w4_s3_q5 | 6 points: Connect to nitrogen cycle + scale up analysis')
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
    .setTitle('Q1 [NEW]: What makes nitrogen fixation essential for life on Earth?')
    .setHelpText('Question ID: g7_c4_w4_exit_q1')
    .setChoices([
      form.createChoice('It creates new nitrogen atoms', false),
      form.createChoice('It converts unusable N2 gas into forms plants can absorb', true),
      form.createChoice('It removes nitrogen from the atmosphere', false),
      form.createChoice('It heats up the soil for plant growth', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // NEW Q2: Misconception target - more-fertilizer-better (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q2 [NEW]: Why do sustainable farming practices focus on applying the RIGHT amount of fertilizer rather than the MAXIMUM amount?')
    .setHelpText('Question ID: g7_c4_w4_exit_q2 | Targets misconception: more-fertilizer-better')
    .setChoices([
      form.createChoice('Fertilizer is expensive', false),
      form.createChoice('Excess fertilizer runs off into waterways, causing pollution without helping crops', true),
      form.createChoice('Plants don\'t like too much nitrogen', false),
      form.createChoice('Maximum fertilizer always gives maximum yield', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // SPIRAL Q3: W3 - Carbon cycle (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q3 [SPIRAL W3]: Both carbon and nitrogen are essential for life. Which statement correctly compares how they cycle?')
    .setHelpText('Question ID: g7_c4_w4_exit_q3 | Spiral: W3 Carbon Cycle')
    .setChoices([
      form.createChoice('Carbon cycles but nitrogen doesn\'t', false),
      form.createChoice('Both cycle through living and nonliving parts of ecosystems', true),
      form.createChoice('Nitrogen cycles but carbon doesn\'t', false),
      form.createChoice('Neither actually cycles - they\'re constantly created', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // SPIRAL Q4: W2 - Eutrophication connection (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q4 [SPIRAL W2]: Fertilizer runoff causes eutrophication. Which sequence correctly describes this process?')
    .setHelpText('Question ID: g7_c4_w4_exit_q4 | Spiral: W2 Eutrophication')
    .setChoices([
      form.createChoice('Runoff → clear water → healthy fish', false),
      form.createChoice('Runoff → algae bloom → decomposition → oxygen depletion → dead zone', true),
      form.createChoice('Runoff → cold water → ice formation', false),
      form.createChoice('Runoff → nitrogen gas release → ozone hole', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // INTEGRATION Q5: Cross-concept connection (5 pts)
  form.addParagraphTextItem()
    .setTitle('Q5 [INTEGRATION]: Using your knowledge from W2 (eutrophication), W3 (carbon cycle), and W4 (nitrogen cycle), explain how excessive fertilizer use affects BOTH the nitrogen cycle AND the carbon cycle in aquatic ecosystems downstream.')
    .setHelpText('Question ID: g7_c4_w4_exit_q5 | 5 points: Connect all three concepts')
    .setRequired(true);
  setPointsForLastItem_(form, 5);

  // SEP Q6: Obtaining and evaluating information (4 pts)
  form.addParagraphTextItem()
    .setTitle('Q6 [SEP]: A fertilizer company claims their product is "100% efficient - all nitrogen goes to plants." Based on what you learned about the nitrogen cycle, evaluate this claim. Is it scientifically possible? Why or why not?')
    .setHelpText('Question ID: g7_c4_w4_exit_q6 | 4 points: SEP 8 - Obtaining, Evaluating, and Communicating Information')
    .setRequired(true);
  setPointsForLastItem_(form, 4);

  return form.getPublishedUrl();
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function configFormSettings_(form) {
  form.setIsQuiz(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setShowLinkToRespondAgain(false);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Your responses have been recorded. Great work understanding the nitrogen cycle!\n\n' +
    'Key Takeaway: Nitrogen cycles naturally, but human agriculture disrupts the balance - ' +
    'sustainable practices can work WITH the cycle!'
  );
}

function setPointsForLastItem_(form, points) {
  const items = form.getItems();
  const lastItem = items[items.length - 1];
  if (lastItem.getType() === FormApp.ItemType.PARAGRAPH_TEXT) {
    // Points included in helpText for manual grading
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
    hook: 2 + 2 + 3 + 3 + 2,
    station1: 3 + 3 + 3 + 4 + 4 + 3,
    station2: 4 + 4 + 4 + 4 + 4,
    station3: 4 + 4 + 5 + 6 + 6,
    exitTicket: 4 + 4 + 3 + 3 + 5 + 4
  };
  calculated.total = Object.values(calculated).reduce((a, b) => a + b, 0);
  return calculated.total === expected.total;
}
