/**
 * Grade 7 Cycle 4 Week 3: Carbon Cycle & Sequestration
 * Standards: MS-ESS3-3 (monitoring/minimizing human impact), MS-PS1-5 (conservation of mass)
 * Phenomenon: Where does all the carbon go when forests are cut down?
 *
 * Form Structure:
 * - Hook: The Disappearing Carbon Mystery (12 pts)
 * - Station 1: Carbon Cycle Investigation (20 pts)
 * - Station 2: Carbon Sequestration Analysis (20 pts)
 * - Station 3: Design a Carbon Reduction Strategy (25 pts)
 * - Exit Ticket: Carbon Cycle Integration (23 pts)
 *
 * Total: 100 points
 */

// ============================================================================
// CONFIGURATION
// ============================================================================

const G7_C4_W3_CONFIG = {
  grade: 7,
  cycle: 4,
  week: 3,
  topic: 'Carbon Cycle & Sequestration',
  phenomenon: 'Where does all the carbon go when forests are cut down?',
  standards: ['MS-ESS3-3', 'MS-PS1-5'],
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
      id: 'carbon-destroyed',
      description: 'Students think carbon disappears or is destroyed when burned',
      targetedIn: ['hook_q4', 's1_q4']
    },
    {
      id: 'trees-only-storage',
      description: 'Students think only trees store carbon',
      targetedIn: ['s2_q3', 'exit_q2']
    },
    {
      id: 'carbon-one-direction',
      description: 'Students think carbon only moves one direction in the cycle',
      targetedIn: ['s1_q3', 's2_q4']
    }
  ],
  spiralTargets: {
    w1: 'Ocean acidification from CO2 dissolution'
  }
};

// ============================================================================
// MAIN ENTRY POINT
// ============================================================================

/**
 * Creates all forms for G7 C4 W3
 */
function createAllForms() {
  const results = {
    hook: createHookForm_(),
    station1: createStation1Form_(),
    station2: createStation2Form_(),
    station3: createStation3Form_(),
    exitTicket: createExitTicketForm_()
  };

  Logger.log('=== G7 C4 W3 Forms Created ===');
  Object.entries(results).forEach(([name, url]) => {
    Logger.log(`${name}: ${url}`);
  });

  return results;
}

// ============================================================================
// HOOK: THE DISAPPEARING CARBON MYSTERY (12 points)
// ============================================================================

function createHookForm_() {
  const form = FormApp.create('G7.C4.W3: Hook - The Disappearing Carbon Mystery');
  configFormSettings_(form);

  form.setDescription(
    'Phenomenon: Every year, about 10 million hectares of forest are cut down. ' +
    'A single large tree can store hundreds of kilograms of carbon. ' +
    'When the forest is cleared, where does all that carbon GO?\n\n' +
    'Points: 12 | Standards: MS-ESS3-3, MS-PS1-5'
  );

  // Q1: Initial observation (2 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q1: When a tree is cut down and burned, the wood seems to "disappear." Based on conservation of mass, what actually happens to the matter in the wood?')
    .setHelpText('Question ID: g7_c4_w3_hook_q1')
    .setChoices([
      form.createChoice('The matter is destroyed by the fire', false),
      form.createChoice('The matter transforms into gases (CO2, water vapor) and ash', true),
      form.createChoice('The matter turns into pure energy', false),
      form.createChoice('The matter teleports underground', false)
    ])
    .setRequired(true)
    .setPoints(2);

  // Q2: Scale of the problem (2 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q2: If deforestation releases carbon into the atmosphere, which of these is MOST likely to happen?')
    .setHelpText('Question ID: g7_c4_w3_hook_q2')
    .setChoices([
      form.createChoice('Atmospheric CO2 levels decrease', false),
      form.createChoice('Atmospheric CO2 levels increase', true),
      form.createChoice('Atmospheric CO2 levels stay the same', false),
      form.createChoice('The carbon disappears completely', false)
    ])
    .setRequired(true)
    .setPoints(2);

  // Q3: Prior knowledge connection (3 pts)
  form.addParagraphTextItem()
    .setTitle('Q3: In Week 1, you learned how CO2 dissolves in the ocean and causes acidification. If deforestation releases more CO2 into the atmosphere, how might this affect the oceans?')
    .setHelpText('Question ID: g7_c4_w3_hook_q3 | 3 points: Connect deforestation to ocean acidification')
    .setRequired(true);
  setPointsForLastItem_(form, 3);

  // Q4: Misconception target - carbon-destroyed (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q4: A student says "When we burn forests, we destroy the carbon so it\'s gone forever." What is WRONG with this statement?')
    .setHelpText('Question ID: g7_c4_w3_hook_q4 | Targets misconception: carbon-destroyed')
    .setChoices([
      form.createChoice('Nothing - the statement is correct', false),
      form.createChoice('Carbon cannot be destroyed, only transformed into different compounds like CO2', true),
      form.createChoice('Forests don\'t contain carbon', false),
      form.createChoice('Burning creates new carbon atoms', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // Q5: Question generation (2 pts)
  form.addParagraphTextItem()
    .setTitle('Q5: What questions do you have about where carbon goes and how it cycles through Earth\'s systems?')
    .setHelpText('Question ID: g7_c4_w3_hook_q5 | 2 points: Generate investigable questions')
    .setRequired(true);
  setPointsForLastItem_(form, 2);

  return form.getPublishedUrl();
}

// ============================================================================
// STATION 1: CARBON CYCLE INVESTIGATION (20 points)
// ============================================================================

function createStation1Form_() {
  const form = FormApp.create('G7.C4.W3: Station 1 - Carbon Cycle Investigation');
  configFormSettings_(form);

  form.setDescription(
    'Trace carbon through Earth\'s major reservoirs: atmosphere, biosphere, hydrosphere, and lithosphere.\n\n' +
    'Use the interactive carbon cycle simulation to track carbon movement.\n\n' +
    'Spiral Review: Ocean acidification from Week 1\n' +
    'Points: 20 | Standards: MS-ESS3-3'
  );

  // Q1: Carbon reservoirs (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q1: Which of these is the LARGEST reservoir of carbon on Earth?')
    .setHelpText('Question ID: g7_c4_w3_s1_q1')
    .setChoices([
      form.createChoice('Atmosphere', false),
      form.createChoice('Oceans (dissolved CO2 and carbonate rocks)', true),
      form.createChoice('Living organisms', false),
      form.createChoice('Fossil fuels', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // Q2: Photosynthesis role (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q2: How do plants remove carbon from the atmosphere?')
    .setHelpText('Question ID: g7_c4_w3_s1_q2')
    .setChoices([
      form.createChoice('They burn carbon for energy', false),
      form.createChoice('They absorb CO2 through photosynthesis and store carbon in their tissues', true),
      form.createChoice('They filter carbon out of the air mechanically', false),
      form.createChoice('Plants don\'t affect atmospheric carbon', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // Q3: Misconception target - carbon-one-direction (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q3: Carbon moves from the atmosphere INTO plants through photosynthesis. How does carbon move BACK to the atmosphere?')
    .setHelpText('Question ID: g7_c4_w3_s1_q3 | Targets misconception: carbon-one-direction')
    .setChoices([
      form.createChoice('It doesn\'t - carbon stays in plants forever', false),
      form.createChoice('Through respiration (plants and animals), decomposition, and combustion', true),
      form.createChoice('Carbon spontaneously evaporates from plants', false),
      form.createChoice('Sunlight converts plant carbon directly to atmospheric CO2', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // Q4: Misconception target - carbon-destroyed (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q4: In the simulation, you see carbon moving between reservoirs. Why does the TOTAL amount of carbon on Earth stay constant?')
    .setHelpText('Question ID: g7_c4_w3_s1_q4 | Targets misconception: carbon-destroyed')
    .setChoices([
      form.createChoice('New carbon is constantly being created to replace what\'s used', false),
      form.createChoice('Conservation of mass - carbon is transformed but never created or destroyed', true),
      form.createChoice('The simulation is simplified and doesn\'t show carbon loss', false),
      form.createChoice('Carbon is being added from outer space', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q5: Data analysis (4 pts)
  form.addParagraphTextItem()
    .setTitle('Q5: Using the simulation data, trace the path of a single carbon atom from the atmosphere, through a plant, into an animal, and back to the atmosphere. Describe each step.')
    .setHelpText('Question ID: g7_c4_w3_s1_q5 | 4 points: Complete carbon pathway with all transitions explained')
    .setRequired(true);
  setPointsForLastItem_(form, 4);

  // Q6: Spiral review - W1 ocean acidification (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q6: [SPIRAL W1] In Week 1, you learned about ocean acidification. The ocean is a carbon reservoir. When atmospheric CO2 increases, what happens to ocean carbon levels?')
    .setHelpText('Question ID: g7_c4_w3_s1_q6 | Spiral: W1 Ocean Acidification')
    .setChoices([
      form.createChoice('Ocean carbon decreases as oceans release CO2', false),
      form.createChoice('Ocean carbon increases as more CO2 dissolves in seawater', true),
      form.createChoice('Ocean carbon stays exactly the same', false),
      form.createChoice('Oceans and atmosphere are not connected', false)
    ])
    .setRequired(true)
    .setPoints(3);

  return form.getPublishedUrl();
}

// ============================================================================
// STATION 2: CARBON SEQUESTRATION ANALYSIS (20 points)
// ============================================================================

function createStation2Form_() {
  const form = FormApp.create('G7.C4.W3: Station 2 - Carbon Sequestration Analysis');
  configFormSettings_(form);

  form.setDescription(
    'Analyze data on natural carbon sinks: forests, oceans, and soil.\n\n' +
    'Compare how different ecosystems store carbon and which are most effective.\n\n' +
    'Points: 20 | Standards: MS-ESS3-3'
  );

  // Scenario introduction
  form.addSectionHeaderItem()
    .setTitle('Carbon Storage Data')
    .setHelpText('Carbon stored per hectare:\n' +
                 '• Tropical rainforest: 250 tonnes C/ha (trees) + 100 tonnes C/ha (soil)\n' +
                 '• Temperate forest: 150 tonnes C/ha (trees) + 200 tonnes C/ha (soil)\n' +
                 '• Grassland: 10 tonnes C/ha (plants) + 300 tonnes C/ha (soil)\n' +
                 '• Peatland: 5 tonnes C/ha (plants) + 1500 tonnes C/ha (soil)');

  // Q1: Data interpretation (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q1: Based on the data, which ecosystem stores the MOST total carbon per hectare?')
    .setHelpText('Question ID: g7_c4_w3_s2_q1')
    .setChoices([
      form.createChoice('Tropical rainforest (350 tonnes/ha)', false),
      form.createChoice('Temperate forest (350 tonnes/ha)', false),
      form.createChoice('Grassland (310 tonnes/ha)', false),
      form.createChoice('Peatland (1505 tonnes/ha)', true)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q2: Below-ground storage (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q2: Looking at the data, where is MOST of the carbon stored in peatlands and grasslands?')
    .setHelpText('Question ID: g7_c4_w3_s2_q2')
    .setChoices([
      form.createChoice('In the living plants above ground', false),
      form.createChoice('In the soil below ground', true),
      form.createChoice('In the animals living there', false),
      form.createChoice('In the atmosphere above them', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q3: Misconception target - trees-only-storage (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q3: Many people focus on planting trees to store carbon. Based on this data, why might protecting peatlands be EVEN MORE important?')
    .setHelpText('Question ID: g7_c4_w3_s2_q3 | Targets misconception: trees-only-storage')
    .setChoices([
      form.createChoice('Peatlands are prettier than forests', false),
      form.createChoice('Peatlands store 4x more carbon per hectare than tropical rainforests', true),
      form.createChoice('Trees actually release more carbon than they store', false),
      form.createChoice('Peatlands and forests store the same amount', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q4: Misconception target - carbon-one-direction (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q4: If a peatland is drained for agriculture, what happens to its stored carbon?')
    .setHelpText('Question ID: g7_c4_w3_s2_q4 | Targets misconception: carbon-one-direction')
    .setChoices([
      form.createChoice('The carbon stays safely underground', false),
      form.createChoice('Oxygen reaches the peat, decomposition accelerates, and CO2 is released', true),
      form.createChoice('The carbon is destroyed when the water drains', false),
      form.createChoice('The carbon moves to nearby forests', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q5: Application (4 pts)
  form.addParagraphTextItem()
    .setTitle('Q5: A country wants to maximize carbon storage per hectare. Based on the data, recommend a land use strategy and explain your reasoning.')
    .setHelpText('Question ID: g7_c4_w3_s2_q5 | 4 points: Strategy with data-supported reasoning')
    .setRequired(true);
  setPointsForLastItem_(form, 4);

  return form.getPublishedUrl();
}

// ============================================================================
// STATION 3: DESIGN A CARBON REDUCTION STRATEGY (25 points)
// ============================================================================

function createStation3Form_() {
  const form = FormApp.create('G7.C4.W3: Station 3 - Design a Carbon Reduction Strategy');
  configFormSettings_(form);

  form.setDescription(
    'Apply your carbon cycle knowledge to design a strategy for reducing atmospheric CO2.\n\n' +
    'Engineering Challenge: Help a community reduce its carbon footprint.\n\n' +
    'Points: 25 | Standards: MS-ESS3-3, MS-ETS1-2'
  );

  // Scenario introduction
  form.addSectionHeaderItem()
    .setTitle('Community Carbon Challenge')
    .setHelpText('A town of 10,000 people produces 100,000 tonnes of CO2 per year.\n' +
                 'They want to become "carbon neutral" (net zero emissions).\n' +
                 'Options:\n' +
                 '• Plant trees ($500/ha, stores 10 tonnes CO2/year/ha)\n' +
                 '• Restore peatland ($2000/ha, prevents 20 tonnes CO2/year/ha release)\n' +
                 '• Solar panels ($10,000 per household, saves 5 tonnes CO2/year)\n' +
                 'Budget: $5 million');

  // Q1: Problem analysis (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q1: To offset 100,000 tonnes of CO2/year using ONLY tree planting, how many hectares would be needed?')
    .setHelpText('Question ID: g7_c4_w3_s3_q1 | Calculate: 100,000 tonnes ÷ 10 tonnes/ha/year')
    .setChoices([
      form.createChoice('1,000 hectares', false),
      form.createChoice('10,000 hectares', true),
      form.createChoice('100,000 hectares', false),
      form.createChoice('1,000,000 hectares', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q2: Cost analysis (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q2: How much would it cost to plant 10,000 hectares of trees?')
    .setHelpText('Question ID: g7_c4_w3_s3_q2')
    .setChoices([
      form.createChoice('$500,000', false),
      form.createChoice('$5,000,000', true),
      form.createChoice('$50,000,000', false),
      form.createChoice('$500,000,000', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q3: Strategy comparison (5 pts)
  form.addParagraphTextItem()
    .setTitle('Q3: Compare two approaches: (A) Spend entire $5M on tree planting, or (B) Spend $2M on peatland restoration and $3M on other solutions. Which reduces more CO2? Show your calculations.')
    .setHelpText('Question ID: g7_c4_w3_s3_q3 | 5 points: Complete calculations for both scenarios')
    .setRequired(true);
  setPointsForLastItem_(form, 5);

  // Q4: Design proposal (6 pts)
  form.addParagraphTextItem()
    .setTitle('Q4: Design a complete carbon reduction strategy for the town using the $5M budget. Specify: (1) How much to spend on each option, (2) Total CO2 offset achieved, (3) Why this combination is optimal.')
    .setHelpText('Question ID: g7_c4_w3_s3_q4 | 6 points: Complete strategy with math and reasoning')
    .setRequired(true);
  setPointsForLastItem_(form, 6);

  // Q5: Limitations analysis (6 pts)
  form.addParagraphTextItem()
    .setTitle('Q5: Your strategy uses the carbon cycle to reduce atmospheric CO2. What are TWO limitations of these approaches? What could go wrong?')
    .setHelpText('Question ID: g7_c4_w3_s3_q5 | 6 points: Two distinct limitations with explanations')
    .setRequired(true);
  setPointsForLastItem_(form, 6);

  return form.getPublishedUrl();
}

// ============================================================================
// EXIT TICKET: CARBON CYCLE INTEGRATION (23 points)
// ============================================================================

function createExitTicketForm_() {
  const form = FormApp.create('G7.C4.W3: Exit Ticket - Carbon Cycle Integration');
  configFormSettings_(form);

  form.setDescription(
    'Demonstrate your understanding of the carbon cycle and sequestration.\n\n' +
    'Structure: 2 New + 2 Spiral + 1 Integration + 1 SEP\n' +
    'Points: 23 | Standards: MS-ESS3-3, MS-PS1-5'
  );

  // NEW Q1: Carbon cycle basics (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q1 [NEW]: Which process moves carbon FROM the atmosphere INTO living organisms?')
    .setHelpText('Question ID: g7_c4_w3_exit_q1')
    .setChoices([
      form.createChoice('Respiration', false),
      form.createChoice('Photosynthesis', true),
      form.createChoice('Combustion', false),
      form.createChoice('Decomposition', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // NEW Q2: Misconception target - trees-only-storage (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q2 [NEW]: A student says "We just need to plant more trees to solve climate change." What is this statement MISSING?')
    .setHelpText('Question ID: g7_c4_w3_exit_q2 | Targets misconception: trees-only-storage')
    .setChoices([
      form.createChoice('Trees don\'t actually store carbon', false),
      form.createChoice('Other carbon sinks (oceans, soil, peatlands) are also critical and store more carbon', true),
      form.createChoice('Climate change has nothing to do with carbon', false),
      form.createChoice('The statement is complete - trees are the only solution needed', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // SPIRAL Q3: W1 - Ocean acidification (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q3 [SPIRAL W1]: When the ocean absorbs CO2, what happens to the water\'s pH?')
    .setHelpText('Question ID: g7_c4_w3_exit_q3 | Spiral: W1 Ocean Acidification')
    .setChoices([
      form.createChoice('pH increases (more basic)', false),
      form.createChoice('pH decreases (more acidic)', true),
      form.createChoice('pH stays exactly the same', false),
      form.createChoice('CO2 cannot dissolve in water', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // SPIRAL Q4: W2 - Nutrient cycling connection (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q4 [SPIRAL W2]: In Week 2, you learned about nutrient runoff causing dead zones. How does this connect to the carbon cycle?')
    .setHelpText('Question ID: g7_c4_w3_exit_q4 | Spiral: W2 Eutrophication')
    .setChoices([
      form.createChoice('Nutrient cycles and carbon cycles are completely separate', false),
      form.createChoice('Excess nutrients cause algae blooms that initially absorb CO2 but release it when they die and decompose', true),
      form.createChoice('Dead zones absorb extra carbon from the atmosphere', false),
      form.createChoice('Nutrients destroy carbon molecules', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // INTEGRATION Q5: Cross-concept connection (5 pts)
  form.addParagraphTextItem()
    .setTitle('Q5 [INTEGRATION]: A coastal community both burns fossil fuels (releasing CO2) AND has nutrient runoff (causing dead zones). Using your knowledge from W1-W3, explain how these two human impacts BOTH affect the ocean and how they might interact.')
    .setHelpText('Question ID: g7_c4_w3_exit_q5 | 5 points: Connect carbon emissions, acidification, and eutrophication')
    .setRequired(true);
  setPointsForLastItem_(form, 5);

  // SEP Q6: Constructing explanations (4 pts)
  form.addParagraphTextItem()
    .setTitle('Q6 [SEP]: Construct an explanation for why cutting down a tropical rainforest and replacing it with grassland would result in a NET RELEASE of carbon to the atmosphere, even though both have living plants.')
    .setHelpText('Question ID: g7_c4_w3_exit_q6 | 4 points: SEP 6 - Constructing Explanations')
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
    'Your responses have been recorded. Great work understanding the carbon cycle!\n\n' +
    'Key Takeaway: Carbon cycles through atmosphere, biosphere, hydrosphere, and lithosphere - ' +
    'it\'s never destroyed, only transformed!'
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

function createG7C4W3Hook() { return createHookForm_(); }
function createG7C4W3Station1() { return createStation1Form_(); }
function createG7C4W3Station2() { return createStation2Form_(); }
function createG7C4W3Station3() { return createStation3Form_(); }
function createG7C4W3ExitTicket() { return createExitTicketForm_(); }

// ============================================================================
// VALIDATION
// ============================================================================

function validatePoints_() {
  const expected = G7_C4_W3_CONFIG.points;
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
