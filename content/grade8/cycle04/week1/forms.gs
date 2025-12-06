/**
 * ============================================================================
 * GRADE 8 - CYCLE 4 WEEK 1: ENERGY PYRAMIDS & TROPHIC LEVELS
 * 5 Forms | 100 Points Total | ~75 Minutes
 * ============================================================================
 *
 * NGSS ALIGNMENT:
 *   Primary: MS-LS2-3 - Develop a model to describe the cycling of matter
 *            and flow of energy among living and nonliving parts of an ecosystem
 *   Spiral:  MS-LS4-4 - Natural selection and adaptation (Cycle 3)
 *            MS-PS2-2 - Force and motion relationships (Cycle 2)
 *
 * 3-DIMENSIONAL LEARNING:
 *   SEP-2: Developing Models - Model energy flow through trophic levels
 *   SEP-4: Analyzing Data - Interpret biomass and energy data
 *   DCI LS2.B: Cycles of Matter and Energy Transfer
 *   CCC-5: Energy and Matter - Energy flows, matter cycles
 *   CCC-4: Systems and System Models - Ecosystem as a system
 *
 * LEARNING TARGETS:
 *   1. Trace energy flow through trophic levels
 *   2. Apply the 10% rule to calculate energy transfer
 *   3. Calculate and compare biomass at different levels
 *   4. Design a sustainable food production system
 *
 * FORMS:
 *   1. Hook - The Missing Energy Mystery (12 pts, ~10 min)
 *   2. Station 1 - 10% Rule Investigation (20 pts, ~18 min)
 *   3. Station 2 - Biomass Calculations (20 pts, ~15 min)
 *   4. Station 3 - Design a Sustainable Farm (25 pts, ~20 min)
 *   5. Exit Ticket - Energy Flow Integration (23 pts, ~15 min)
 *
 * ============================================================================
 * GOOGLE FORMS API CONSTRAINTS - NON-NEGOTIABLE RULES
 * ============================================================================
 * RULE 1: setPoints() ONLY on auto-gradable items (MCQ, Checkbox, Scale)
 * RULE 2: setShuffleOrder() does NOT exist - configure manually in UI
 * RULE 3: Use requireTextLengthGreaterThanOrEqualTo(), NOT requireTextLengthGreaterThan()
 * RULE 4: setRequireLogin(true) for verified email collection
 * RULE 5: Feedback requires FormApp.createFeedback().setText().build()
 * RULE 6: Scale items support setPoints() but use 0 for diagnostics
 * RULE 7: Checkbox grading is all-or-nothing
 *
 * ============================================================================
 * DEPLOYMENT CHECKLIST
 * ============================================================================
 *   1. Open script.google.com, create new project
 *   2. Paste this entire script
 *   3. Run: createAllG8C4W1Forms()
 *   4. Check Logger (View > Logs) for form URLs
 *   5. MANUAL CONFIG REQUIRED (Settings > Quizzes in each form):
 *      - Release grade: "Immediately after each submission"
 *      - Respondent can see: Check ALL boxes
 *      - Shuffle option order: ON
 *   6. Embed forms in LMS using the embed URLs from Logger
 */

// ============================================================================
// MAIN FUNCTION
// ============================================================================

function createAllG8C4W1Forms() {
  Logger.log('================================================');
  Logger.log('G8 CYCLE 4 WEEK 1: ENERGY PYRAMIDS & TROPHIC LEVELS');
  Logger.log('================================================\n');

  const forms = {
    hook: createG8C4W1Hook_(),
    station1: createG8C4W1Station1_(),
    station2: createG8C4W1Station2_(),
    station3: createG8C4W1Station3_(),
    exitTicket: createG8C4W1ExitTicket_()
  };

  Logger.log('\n================================================');
  Logger.log('ALL 5 FORMS CREATED - 100 POINTS TOTAL');
  Logger.log('================================================');

  return forms;
}

// ============================================================================
// HOOK - THE MISSING ENERGY MYSTERY (12 points, ~10 min)
// Connects to energy concepts and introduces trophic levels
// ============================================================================

function createG8C4W1Hook_() {
  const form = FormApp.create('G8.C4.W1: Hook - The Missing Energy Mystery');

  form.setDescription(
    'THE MISSING ENERGY MYSTERY\n\n' +
    'The Serengeti ecosystem in Africa has:\n' +
    '- Millions of pounds of grasses\n' +
    '- Hundreds of thousands of wildebeest, zebras, gazelles\n' +
    '- Only a few thousand lions and hyenas\n\n' +
    'Why are there SO MANY plants and herbivores, but SO FEW top predators?\n' +
    'Where does all the energy go?\n\n' +
    '---\n' +
    'Time: About 10 minutes | Points: 12\n' +
    'Use what you learned in Cycle 3 about natural selection and populations!'
  );

  // Quiz and response settings
  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Hook submitted! You\'re ready for Station 1.\n\n' +
    'Next: Investigate the 10% rule and discover where energy goes!\n' +
    'You\'ll do calculations to track energy through food chains.'
  );

  // --- PART 1: OBSERVATION ---
  form.addPageBreakItem()
    .setTitle('Part 1: The Phenomenon')
    .setHelpText('Think about what you observe in ecosystems.');

  // Q1: Initial observation (3 pts auto)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('In most ecosystems, which statement is TRUE about organism numbers?')
    .setHelpText('Think about any ecosystem you know.')
    .setRequired(true);

  q1.setChoices([
    q1.createChoice('There are more producers (plants) than consumers (animals)', true),
    q1.createChoice('There are equal numbers of producers and consumers', false),
    q1.createChoice('There are more top predators than herbivores', false),
    q1.createChoice('The numbers are random and don\'t follow patterns', false)
  ]);
  q1.setPoints(3);
  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Producers always outnumber consumers in healthy ecosystems. We\'ll discover why!')
      .build()
  );
  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Think about a field: millions of grass blades, thousands of rabbits, but only a few foxes.')
      .build()
  );

  // --- MTSS FLAG: Check for energy misconception from prior learning ---
  const mtss1 = form.addMultipleChoiceItem()
    .setTitle('QUICK CHECK (Prior Knowledge): What happens to energy in a food chain?')
    .setHelpText('This checks a common misconception. Your answer does NOT affect your grade.')
    .setRequired(true);

  mtss1.setChoices([
    mtss1.createChoice('Energy is recycled from decomposers back to producers', false),  // FLAG: Matter/energy confusion
    mtss1.createChoice('Energy flows one way; each level has less available energy', true),
    mtss1.createChoice('Energy increases as you go up the food chain', false),
    mtss1.createChoice('Energy is created by plants during photosynthesis', false)
  ]);
  mtss1.setPoints(0);  // Diagnostic only

  // Q2: Prediction (3 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 2 (3 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '3: Connects energy availability to population limits with reasoning\n' +
      '2: Mentions energy or food but incomplete connection\n' +
      '1: Guess without scientific reasoning\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('WHY do you think there are fewer lions than wildebeest in the Serengeti? What limits the lion population?')
    .setHelpText(
      'Sentence starters:\n' +
      '• "I think there are fewer lions because..." \n' +
      '• "Lions need ___ to survive, and..." \n' +
      '• "If there were more lions than wildebeest, then..."'
    )
    .setRequired(true);

  // --- PART 2: CYCLE 3 CONNECTION ---
  form.addPageBreakItem()
    .setTitle('Part 2: Cycle 3 Connection')
    .setHelpText('Connect this to what you learned about natural selection.');

  // Q3: Evolution connection (3 pts auto)
  const q3 = form.addMultipleChoiceItem()
    .setTitle('In Cycle 3, we learned about natural selection. How might limited energy at top trophic levels RELATE to natural selection?')
    .setRequired(true);

  q3.setChoices([
    q3.createChoice('Organisms that use energy efficiently are more likely to survive and reproduce', true),
    q3.createChoice('Natural selection doesn\'t apply to energy use', false),
    q3.createChoice('Predators always evolve to be stronger regardless of energy', false),
    q3.createChoice('Energy has nothing to do with survival', false)
  ]);
  q3.setPoints(3);
  q3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Energy efficiency IS a selective pressure—organisms that waste less energy are more successful.')
      .build()
  );
  q3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Think: if energy is limited, which organisms survive? Those that use energy well or waste it?')
      .build()
  );

  // Q4: Energy source (3 pts auto)
  const q4 = form.addMultipleChoiceItem()
    .setTitle('Where does ALL the energy in an ecosystem originally come from?')
    .setRequired(true);

  q4.setChoices([
    q4.createChoice('The Sun (captured by producers through photosynthesis)', true),
    q4.createChoice('The soil (absorbed by plant roots)', false),
    q4.createChoice('Decomposers (recycled from dead organisms)', false),
    q4.createChoice('Water (converted into energy)', false)
  ]);
  q4.setPoints(3);
  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Sunlight → producers → consumers → decomposers. Energy enters only through photosynthesis.')
      .build()
  );
  q4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Only photosynthesis captures NEW energy. Decomposers recycle MATTER, not energy.')
      .build()
  );

  // Q5: Confidence (0 pts - diagnostic only)
  form.addScaleItem()
    .setTitle('Self-Assessment: How confident are you that you can explain why there are fewer predators than prey in ecosystems?')
    .setHelpText('FOR REFLECTION ONLY - This does NOT affect your grade. Be honest!')
    .setBounds(1, 5)
    .setLabels('Still learning', 'Got it!')
    .setRequired(true);

  logFormInfo_(form, 'G8 C4 W1 Hook', 12);
  return form;
}

// ============================================================================
// STATION 1 - 10% RULE INVESTIGATION (20 points, ~18 min)
// Understanding energy transfer between trophic levels
// ============================================================================

function createG8C4W1Station1_() {
  const form = FormApp.create('G8.C4.W1: Station 1 - 10% Rule Investigation');

  form.setDescription(
    'YOUR MISSION: DISCOVER THE 10% RULE\n\n' +
    'When energy moves from one trophic level to the next, most of it is LOST.\n' +
    'But lost where? And why only ~10% transfers?\n\n' +
    'TROPHIC LEVELS:\n' +
    '1. Producers (plants, algae) - capture sunlight\n' +
    '2. Primary consumers (herbivores) - eat producers\n' +
    '3. Secondary consumers (carnivores) - eat herbivores\n' +
    '4. Tertiary consumers (top predators) - eat other carnivores\n\n' +
    '---\n' +
    'Time: About 18 minutes | Points: 20'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Station 1 complete!\n\n' +
    'KEY INSIGHT: Only ~10% of energy transfers between levels.\n' +
    '90% is lost to heat, movement, waste, and parts not eaten.\n\n' +
    'Continue to Station 2: Biomass Calculations'
  );

  // --- DATA REFERENCE ---
  form.addPageBreakItem()
    .setTitle('Reference: Where Does Energy Go?')
    .setHelpText(
      'WHEN A ZEBRA EATS GRASS:\n' +
      '┌────────────────────────────────────────────┐\n' +
      '│ Energy in grass eaten: 1000 kcal          │\n' +
      '├────────────────────────────────────────────┤\n' +
      '│ Lost to heat (metabolism):     ~60%       │\n' +
      '│ Lost to waste (feces, urine):  ~25%       │\n' +
      '│ Parts not eaten (roots):       ~5%        │\n' +
      '│ Stored in zebra body:          ~10%       │\n' +
      '└────────────────────────────────────────────┘\n\n' +
      'The 10% stored in the zebra is what\'s available to the NEXT level (lions).\n\n' +
      'ENERGY AVAILABLE AT EACH LEVEL:\n' +
      '• Producers (grass): 10,000 kcal\n' +
      '• Primary consumers (zebras): 1,000 kcal (10%)\n' +
      '• Secondary consumers (lions): 100 kcal (10% of 10%)\n' +
      '• Tertiary consumers: 10 kcal (10% of 10% of 10%)'
    );

  // Q1: 10% rule understanding (4 pts auto)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('According to the 10% rule, if producers have 50,000 kcal of energy, how much energy is available to secondary consumers (carnivores)?')
    .setHelpText('Apply the 10% rule TWICE (producers → herbivores → carnivores)')
    .setRequired(true);

  q1.setChoices([
    q1.createChoice('500 kcal (10% × 10% = 1%)', true),
    q1.createChoice('5,000 kcal (10%)', false),
    q1.createChoice('25,000 kcal (50%)', false),
    q1.createChoice('50 kcal (0.1%)', false)
  ]);
  q1.setPoints(4);
  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! 50,000 × 0.10 = 5,000 (herbivores), then 5,000 × 0.10 = 500 kcal (carnivores).')
      .build()
  );
  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Work step by step: Producers → Herbivores = 10%, then Herbivores → Carnivores = another 10%.')
      .build()
  );

  // Q2: Energy loss explanation (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 2: Explain Energy Loss (4 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '4: Lists 3+ specific ways energy is lost (heat/metabolism, waste, movement, body parts not eaten)\n' +
      '3: Lists 2 specific ways with explanation\n' +
      '2: Mentions "lost to heat" but vague\n' +
      '1: Incorrect or minimal response\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('The 10% rule means 90% of energy is "lost" at each level. WHERE does that 90% go? List at least 3 specific destinations.')
    .setHelpText(
      'Sentence starters:\n' +
      '• "Energy is lost to ___ when organisms..." \n' +
      '• "Organisms use energy for ___ which produces..." \n' +
      '• "Not all parts of prey are eaten, such as..."'
    )
    .setRequired(true);

  // Q3: Food chain calculation (4 pts auto)
  const q3 = form.addMultipleChoiceItem()
    .setTitle('A simple food chain: Grass → Grasshopper → Frog → Snake → Hawk\n\nIf the grass has 100,000 kcal, how much energy is available to the hawk?')
    .setHelpText('Apply 10% rule four times.')
    .setRequired(true);

  q3.setChoices([
    q3.createChoice('10 kcal (0.01%)', true),
    q3.createChoice('100 kcal (0.1%)', false),
    q3.createChoice('1,000 kcal (1%)', false),
    q3.createChoice('10,000 kcal (10%)', false)
  ]);
  q3.setPoints(4);
  q3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! 100,000 → 10,000 → 1,000 → 100 → 10 kcal. Each arrow = 10%.')
      .build()
  );
  q3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Count the arrows: 4 transfers. Each transfer = multiply by 0.10. So 100,000 × 0.10 × 0.10 × 0.10 × 0.10 = ?')
      .build()
  );

  // Q4: Why pyramids (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 4: Explain Pyramid Shape (4 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '4: Connects 10% rule to decreasing energy → fewer organisms supported → pyramid shape\n' +
      '3: Mentions energy decreasing but doesn\'t fully explain population connection\n' +
      '2: Partial explanation\n' +
      '1: Incorrect reasoning\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Energy pyramids are WIDE at the bottom (producers) and NARROW at the top (apex predators). Explain WHY this shape exists using the 10% rule.')
    .setHelpText(
      'Sentence starters:\n' +
      '• "The pyramid is wide at the bottom because producers..." \n' +
      '• "Each level gets smaller because only ___% of energy..." \n' +
      '• "This means fewer ___ can be supported at higher levels."'
    )
    .setRequired(true);

  // Q5: Spiral - Cycle 3 (4 pts auto)
  const q5 = form.addMultipleChoiceItem()
    .setTitle('CYCLE 3 CONNECTION: Lions are apex predators with very limited energy available. How might this relate to natural selection?')
    .setRequired(true);

  q5.setChoices([
    q5.createChoice('Organisms with efficient hunting strategies and metabolism are selected for', true),
    q5.createChoice('Apex predators don\'t face natural selection', false),
    q5.createChoice('Lions evolved to need no energy', false),
    q5.createChoice('Natural selection only affects prey, not predators', false)
  ]);
  q5.setPoints(4);
  q5.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Limited energy means only efficient hunters survive. This is directional selection for hunting ability and energy efficiency.')
      .build()
  );
  q5.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Think: if energy is scarce for top predators, which ones survive? Those that hunt efficiently and use energy wisely.')
      .build()
  );

  logFormInfo_(form, 'G8 C4 W1 Station 1', 20);
  return form;
}

// ============================================================================
// STATION 2 - BIOMASS CALCULATIONS (20 points, ~15 min)
// Quantitative analysis of energy pyramid data
// ============================================================================

function createG8C4W1Station2_() {
  const form = FormApp.create('G8.C4.W1: Station 2 - Biomass Calculations');

  form.setDescription(
    'YOUR MISSION: CALCULATE BIOMASS AND ENERGY\n\n' +
    'BIOMASS = Total mass of all organisms at a trophic level\n\n' +
    'Biomass is a way to measure how much "living stuff" exists at each level.\n' +
    'It connects directly to energy—more biomass = more stored energy.\n\n' +
    '---\n' +
    'Time: About 15 minutes | Points: 20\n' +
    'You\'ll need a calculator for this station.'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Station 2 complete!\n\n' +
    'KEY INSIGHT: Biomass decreases at higher trophic levels because energy is lost.\n' +
    'This explains why ecosystems can only support a few top predators.\n\n' +
    'Continue to Station 3: Design a Sustainable Farm'
  );

  // --- DATA REFERENCE ---
  form.addPageBreakItem()
    .setTitle('Reference: Serengeti Ecosystem Data')
    .setHelpText(
      'SERENGETI ECOSYSTEM BIOMASS DATA:\n\n' +
      '┌────────────────────────────────────────────────────┐\n' +
      '│ Trophic Level        │ Biomass (kg/km²) │ Energy  │\n' +
      '├────────────────────────────────────────────────────┤\n' +
      '│ Producers (grasses)  │ 4,000,000        │ 100%    │\n' +
      '│ Primary (wildebeest) │ 400,000          │ 10%     │\n' +
      '│ Secondary (lions)    │ 40,000           │ 1%      │\n' +
      '│ Tertiary (bacteria)  │ 4,000            │ 0.1%    │\n' +
      '└────────────────────────────────────────────────────┘\n\n' +
      'CONVERSION: 1 kg biomass ≈ 5 kcal stored energy\n\n' +
      'POPULATION ESTIMATES (per 100 km²):\n' +
      '• Grass: Unmeasurable (continuous coverage)\n' +
      '• Wildebeest: 1,500 individuals\n' +
      '• Lions: 25 individuals\n' +
      '• Hyenas: 50 individuals'
    );

  // Q1: Biomass ratio (4 pts auto)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('What is the ratio of producer biomass to secondary consumer (lion) biomass?')
    .setHelpText('Divide producer biomass by lion biomass.')
    .setRequired(true);

  q1.setChoices([
    q1.createChoice('100:1 (producers have 100× more biomass)', true),
    q1.createChoice('10:1 (producers have 10× more biomass)', false),
    q1.createChoice('1000:1 (producers have 1000× more biomass)', false),
    q1.createChoice('1:1 (equal biomass)', false)
  ]);
  q1.setPoints(4);
  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! 4,000,000 ÷ 40,000 = 100. Producers have 100 times more biomass than lions.')
      .build()
  );
  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Producer biomass = 4,000,000. Lion biomass = 40,000. Divide to find the ratio.')
      .build()
  );

  // Q2: Energy calculation (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 2: Calculate Energy (4 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '4: Correct calculation (200,000 kcal) with clear work shown\n' +
      '3: Correct answer without work\n' +
      '2: Correct setup but calculation error\n' +
      '1: Wrong approach\n' +
      '0: No response\n\n' +
      'ANSWER: 40,000 kg × 5 kcal/kg = 200,000 kcal'
    );

  form.addParagraphTextItem()
    .setTitle('If lion biomass is 40,000 kg/km² and 1 kg biomass = 5 kcal, how much energy is stored in the lion population?\n\nSHOW YOUR WORK!')
    .setHelpText(
      'Sentence starters:\n' +
      '• "Energy = biomass × conversion factor..." \n' +
      '• "40,000 kg × 5 kcal/kg = ..." \n' +
      '• "This means lions store ___ kcal of energy."'
    )
    .setRequired(true);

  // Q3: Inverted pyramid (4 pts auto)
  const q3 = form.addMultipleChoiceItem()
    .setTitle('In some ocean ecosystems, the biomass pyramid appears "inverted" (more consumers than producers at any moment). Why might this happen?')
    .setHelpText('Think about the RATE at which producers can reproduce.')
    .setRequired(true);

  q3.setChoices([
    q3.createChoice('Phytoplankton reproduce extremely fast, replacing biomass quickly even though standing biomass is low', true),
    q3.createChoice('The 10% rule doesn\'t apply to ocean ecosystems', false),
    q3.createChoice('Ocean predators don\'t need as much energy', false),
    q3.createChoice('This is impossible—it violates energy laws', false)
  ]);
  q3.setPoints(4);
  q3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Fast turnover rate means producers are constantly replaced. It\'s about FLOW of energy, not just standing biomass.')
      .build()
  );
  q3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Hint: Phytoplankton can divide every few hours. Even if there\'s less at any moment, they produce MORE total energy over time.')
      .build()
  );

  // Q4: Prediction (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 4: Make a Prediction (4 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '4: Predicts DECREASE in lion population with clear energy-based reasoning\n' +
      '3: Correct prediction with partial reasoning\n' +
      '2: Mentions energy but vague prediction\n' +
      '1: Incorrect prediction\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('If a drought kills 50% of the grass in the Serengeti, predict what will happen to the lion population. Use the 10% rule to explain your reasoning.')
    .setHelpText(
      'Sentence starters:\n' +
      '• "If grass decreases by 50%, then herbivores will..." \n' +
      '• "Using the 10% rule, lions will have access to..." \n' +
      '• "Therefore, the lion population will likely..."'
    )
    .setRequired(true);

  // Q5: System thinking (4 pts auto)
  const q5 = form.addMultipleChoiceItem()
    .setTitle('Why is it MORE efficient for humans to eat plants directly rather than eat animals that eat plants?')
    .setRequired(true);

  q5.setChoices([
    q5.createChoice('We get 100% of plant energy vs. only 10% when eating herbivores', true),
    q5.createChoice('Plants taste better than meat', false),
    q5.createChoice('Animals don\'t have any energy', false),
    q5.createChoice('It\'s actually equally efficient', false)
  ]);
  q5.setPoints(4);
  q5.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Eating plants = first trophic level for us. Eating beef = we\'re at third level (grass → cow → human), losing 90% at each step.')
      .build()
  );
  q5.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Apply the 10% rule: if we eat plants directly, we\'re primary consumers. If we eat animals, we\'re secondary consumers with 90% less energy available.')
      .build()
  );

  logFormInfo_(form, 'G8 C4 W1 Station 2', 20);
  return form;
}

// ============================================================================
// STATION 3 - DESIGN A SUSTAINABLE FARM (25 points, ~20 min)
// Engineering design challenge applying energy pyramid concepts
// ============================================================================

function createG8C4W1Station3_() {
  const form = FormApp.create('G8.C4.W1: Station 3 - Design a Sustainable Farm');

  form.setDescription(
    'ENGINEERING CHALLENGE: DESIGN A SUSTAINABLE FOOD PRODUCTION SYSTEM\n\n' +
    'Your task: Design a farm that feeds 1,000 people sustainably\n' +
    'using your knowledge of energy pyramids and the 10% rule.\n\n' +
    '---\n' +
    'Time: About 20 minutes | Points: 25 (highest value!)\n\n' +
    'CONSTRAINTS:\n' +
    '• Must feed 1,000 people (2,000 kcal/person/day = 2,000,000 kcal/day total)\n' +
    '• Limited land: 100 hectares available\n' +
    '• Must consider environmental sustainability\n' +
    '• Budget: $500,000 to start'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Station 3 complete!\n\n' +
    'You\'ve designed a food system using energy pyramid principles!\n' +
    'Key insight: Plant-based farming is 10× more energy efficient than meat production.\n\n' +
    'Continue to Exit Ticket'
  );

  // --- DESIGN OPTIONS REFERENCE ---
  form.addPageBreakItem()
    .setTitle('Available Food Production Options')
    .setHelpText(
      'OPTION A: VEGETABLE FARM (crops only)\n' +
      '• Energy efficiency: 100% (direct from sun)\n' +
      '• Yield: 50,000 kcal/hectare/day\n' +
      '• Cost: $2,000/hectare to set up\n' +
      '• Pros: Most efficient, lower environmental impact\n' +
      '• Cons: Limited protein, requires varied crops\n\n' +
      'OPTION B: CHICKEN FARM (poultry + eggs)\n' +
      '• Energy efficiency: 10% (herbivore level)\n' +
      '• Yield: 5,000 kcal/hectare/day\n' +
      '• Cost: $5,000/hectare to set up\n' +
      '• Pros: High-quality protein, eggs\n' +
      '• Cons: Needs feed crops, 10× more land for same energy\n\n' +
      'OPTION C: CATTLE RANCH (beef + dairy)\n' +
      '• Energy efficiency: 10% (but higher input needs)\n' +
      '• Yield: 2,500 kcal/hectare/day\n' +
      '• Cost: $8,000/hectare to set up\n' +
      '• Pros: Beef, milk, fertilizer\n' +
      '• Cons: Highest land/water needs, methane emissions\n\n' +
      'OPTION D: FISH FARM (aquaculture)\n' +
      '• Energy efficiency: 15% (slightly better than land animals)\n' +
      '• Yield: 7,500 kcal/hectare/day\n' +
      '• Cost: $10,000/hectare to set up\n' +
      '• Pros: High protein, efficient conversion\n' +
      '• Cons: Water quality issues, disease risk'
    );

  // Q1: System design (7 pts manual) - highest value question
  form.addSectionHeaderItem()
    .setTitle('Question 1: Design Your Farm System (7 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '7: Calculates exact land needs for 2,000,000 kcal/day, mixes production types logically, justifies with 10% rule, stays within constraints\n' +
      '5-6: Good design with most constraints addressed\n' +
      '3-4: Viable design but missing calculations or constraints\n' +
      '1-2: Basic attempt, major gaps\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Design your 100-hectare farm to feed 1,000 people. Specify:\n• How many hectares of each production type\n• Your total daily kcal output (must reach 2,000,000)\n• Your total cost (must be ≤$500,000)\n• How you used the 10% rule in your decisions')
    .setHelpText(
      'Sentence starters:\n' +
      '• "My farm will include ___ hectares of vegetables..." \n' +
      '• "Total output = ___ × 50,000 + ___ × 5,000 = ..." \n' +
      '• "I chose this mix because the 10% rule shows..."'
    )
    .setRequired(true);

  // Q2: Efficiency justification (6 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 2: Justify Your Efficiency Choices (6 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '6: Explicitly applies 10% rule to justify crop vs. animal ratio + considers sustainability\n' +
      '4-5: Mentions energy efficiency with some justification\n' +
      '2-3: General mention of efficiency without specifics\n' +
      '1: Vague response\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Why did you choose your particular mix of crops vs. animals? Use the 10% rule to explain why some choices are more land-efficient than others.')
    .setHelpText(
      'Sentence starters:\n' +
      '• "I prioritized crops because 10% rule means..." \n' +
      '• "Including some animals provides ___ even though..." \n' +
      '• "Vegetables use ___ times less land than beef because..."'
    )
    .setRequired(true);

  // Q3: Trade-off analysis (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 3: Analyze Trade-offs (4 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '4: Identifies specific trade-off (efficiency vs. nutrition OR environment vs. protein) with explanation\n' +
      '3: Identifies trade-off with partial explanation\n' +
      '2: General mention without specifics\n' +
      '1: Vague response\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('What trade-offs did you make in your design? For example, energy efficiency vs. nutritional variety, or cost vs. sustainability.')
    .setHelpText(
      'Sentence starters:\n' +
      '• "I traded off ___ for ___ because..." \n' +
      '• "A limitation of my design is..." \n' +
      '• "If I had more land/money, I would change..."'
    )
    .setRequired(true);

  // Q4: Scale-up problem (4 pts auto)
  const q4 = form.addMultipleChoiceItem()
    .setTitle('If the population doubles to 2,000 people, which option would BEST address the food shortage using the 10% rule?')
    .setRequired(true);

  q4.setChoices([
    q4.createChoice('Convert animal-based hectares to crops (10× more efficient)', true),
    q4.createChoice('Double the cattle ranch (more meat)', false),
    q4.createChoice('Stop farming entirely and import food', false),
    q4.createChoice('Feed the animals more to increase their output', false)
  ]);
  q4.setPoints(4);
  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Converting 1 hectare from cattle (2,500 kcal/day) to vegetables (50,000 kcal/day) gives 20× more food!')
      .build()
  );
  q4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Apply the 10% rule: crops produce 10× more food energy per hectare than animals. To scale up, prioritize efficiency.')
      .build()
  );

  // Q5: Real-world connection (4 pts auto)
  const q5 = form.addMultipleChoiceItem()
    .setTitle('Using energy pyramid principles, which global diet change would MOST reduce agricultural land use?')
    .setRequired(true);

  q5.setChoices([
    q5.createChoice('Reducing beef consumption and eating more plants/poultry', true),
    q5.createChoice('Eating more seafood from wild-caught fish', false),
    q5.createChoice('Increasing organic beef production', false),
    q5.createChoice('Importing more food from other countries', false)
  ]);
  q5.setPoints(4);
  q5.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Cattle are among the least efficient converters. Switching to plants or more efficient animals (poultry, fish) dramatically reduces land needs.')
      .build()
  );
  q5.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Think about energy efficiency: cattle need the most land per calorie. Reducing beef = biggest land savings.')
      .build()
  );

  logFormInfo_(form, 'G8 C4 W1 Station 3', 25);
  return form;
}

// ============================================================================
// EXIT TICKET - ENERGY FLOW INTEGRATION (23 points, ~15 min)
// 2 NEW + 2 SPIRAL + 1 INTEGRATION + 1 SEP
// ============================================================================

function createG8C4W1ExitTicket_() {
  const form = FormApp.create('G8.C4.W1: Exit Ticket - Energy Flow Integration');

  form.setDescription(
    'EXIT TICKET: SHOW WHAT YOU LEARNED\n\n' +
    'This tests whether you can apply the 10% rule and energy pyramid concepts.\n\n' +
    '---\n' +
    'Time: About 15 minutes | Points: 23\n\n' +
    'QUESTION TYPES:\n' +
    '- 2 NEW questions (Cycle 4 content - energy pyramids)\n' +
    '- 2 SPIRAL questions (Cycle 3 review - natural selection)\n' +
    '- 1 INTEGRATION question (connects Cycles 3 & 4)\n' +
    '- 1 SEP-2 question (developing models)'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'WEEK 1 COMPLETE! Congratulations!\n\n' +
    'You learned about energy flow in ecosystems.\n\n' +
    'Key takeaways:\n' +
    '• Only 10% of energy transfers between trophic levels\n' +
    '• 90% is lost to heat, waste, and metabolism\n' +
    '• This limits the number of top predators\n' +
    '• Eating lower on the food chain is more efficient\n\n' +
    'NEXT WEEK: How do invasive species disrupt energy flow?'
  );

  // --- NEW CONTENT ---
  form.addPageBreakItem()
    .setTitle('NEW CONTENT (Questions 1 & 2)')
    .setHelpText('These test what you learned TODAY about energy pyramids.');

  // Q1: NEW - 10% rule application (4 pts auto)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('An ecosystem has 1,000,000 kcal at the producer level. How much energy is available to a tertiary consumer (4th trophic level)?')
    .setRequired(true);

  q1.setChoices([
    q1.createChoice('100 kcal (1,000,000 × 0.1 × 0.1 × 0.1)', true),
    q1.createChoice('1,000 kcal', false),
    q1.createChoice('10,000 kcal', false),
    q1.createChoice('100,000 kcal', false)
  ]);
  q1.setPoints(4);
  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Apply 10% three times: 1,000,000 → 100,000 → 10,000 → 1,000 → 100 kcal at level 4.')
      .build()
  );
  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Tertiary = 4th level. Count transfers: Producer→Primary→Secondary→Tertiary = 3 transfers = multiply by 0.10 three times.')
      .build()
  );

  // Q2: NEW - Energy pyramid explanation (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 2: NEW - Explain the Energy Pyramid (4 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '4: Explains energy decrease → fewer organisms → pyramid shape with specific numbers\n' +
      '3: Correct explanation without numbers\n' +
      '2: Partial understanding\n' +
      '1: Vague or incomplete\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Explain why ecosystems have many more plants than top predators. Use the 10% rule in your explanation.')
    .setHelpText(
      'Sentence starters:\n' +
      '• "At each trophic level, only ___ % of energy..." \n' +
      '• "This means producers have ___ times more energy than..." \n' +
      '• "Since energy limits population size..."'
    )
    .setRequired(true);

  // --- SPIRAL CONTENT ---
  form.addPageBreakItem()
    .setTitle('SPIRAL CONTENT (Questions 3 & 4)')
    .setHelpText('These review concepts from Cycle 3.');

  // Q3: SPIRAL - Natural selection (4 pts auto)
  const q3 = form.addMultipleChoiceItem()
    .setTitle('CYCLE 3 REVIEW: Natural selection requires variation in a population. Why is this necessary?')
    .setRequired(true);

  q3.setChoices([
    q3.createChoice('Different traits allow some individuals to survive and reproduce better than others', true),
    q3.createChoice('Variation makes populations look more interesting', false),
    q3.createChoice('All organisms need to be identical for evolution', false),
    q3.createChoice('Variation is not actually necessary for natural selection', false)
  ]);
  q3.setPoints(4);
  q3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Variation → differential survival → natural selection. Without variation, there\'s nothing to select for.')
      .build()
  );
  q3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Review Cycle 3: Selection needs options to "choose" from. Variation provides those different options.')
      .build()
  );

  // Q4: SPIRAL - Adaptation (4 pts auto)
  const q4 = form.addMultipleChoiceItem()
    .setTitle('CYCLE 3 REVIEW: An adaptation is a trait that...')
    .setRequired(true);

  q4.setChoices([
    q4.createChoice('Increases an organism\'s fitness (survival and reproduction) in its environment', true),
    q4.createChoice('Makes an organism look different from its parents', false),
    q4.createChoice('Appears in one generation and disappears in the next', false),
    q4.createChoice('Is always visible to the human eye', false)
  ]);
  q4.setPoints(4);
  q4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Review Cycle 3: Adaptations are traits that help organisms survive and reproduce better in their specific environment.')
      .build()
  );
  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Adaptations increase fitness—they help organisms survive, find mates, and reproduce in their environment.')
      .build()
  );

  // --- INTEGRATION ---
  form.addPageBreakItem()
    .setTitle('INTEGRATION (Question 5)')
    .setHelpText('This requires knowledge from BOTH Cycle 3 AND Cycle 4.');

  // Q5: Integration (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 5: INTEGRATION (4 points)')
    .setHelpText(
      '3D ASSESSMENT RUBRIC:\n' +
      '4: Connects limited energy to selection pressure for efficiency + gives specific example\n' +
      '   SEP-2: Develops mental model of selection pressure\n' +
      '   DCI: Applies LS2.B energy flow concepts\n' +
      '   CCC: Uses systems thinking\n' +
      '3: Makes connection with partial explanation\n' +
      '2: Mentions both concepts but doesn\'t connect\n' +
      '1: Vague connection\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('How does the 10% rule (Cycle 4) create a natural selection pressure (Cycle 3) for efficient hunting in apex predators like lions? Explain the connection.')
    .setHelpText(
      'Sentence starters:\n' +
      '• "The 10% rule means apex predators have very limited..." \n' +
      '• "This creates selection pressure because lions that..." \n' +
      '• "Over generations, this means only lions with ___ survive to..."'
    )
    .setRequired(true);

  // --- SEP-2: DEVELOPING MODELS ---
  form.addPageBreakItem()
    .setTitle('SEP-2: Develop a Model (Question 6)')
    .setHelpText(
      'NGSS Practice: Developing and Using Models\n' +
      'Scientists use models to explain and predict phenomena!'
    );

  form.addSectionHeaderItem()
    .setTitle('Question 6: Develop a Model (3 points)')
    .setHelpText(
      'RUBRIC - SEP-2: Developing Models\n' +
      '3 pts: Describes pyramid with correct ratios (10:1), labels levels, explains energy loss\n' +
      '2 pts: Describes pyramid shape with some details\n' +
      '1 pt: Basic description only\n' +
      '0 pts: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Describe an energy pyramid model you would create to explain the 10% rule to a 5th grader. Include:\n• What shape it would be and why\n• How you would show the energy decreasing\n• What labels you would include')
    .setHelpText(
      'Sentence starters:\n' +
      '• "My model would be shaped like ___ because..." \n' +
      '• "To show energy decreasing, I would..." \n' +
      '• "I would label each level with..."'
    )
    .setRequired(true);

  logFormInfo_(form, 'G8 C4 W1 Exit Ticket', 23);
  return form;
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function logFormInfo_(form, name, points) {
  const editUrl = form.getEditUrl();
  const pubUrl = form.getPublishedUrl();
  const embedUrl = pubUrl.replace('/viewform', '/viewform?embedded=true');

  Logger.log('----------------------------------------');
  Logger.log(name + ' (' + points + ' pts)');
  Logger.log('----------------------------------------');
  Logger.log('Edit:  ' + editUrl);
  Logger.log('Embed: ' + embedUrl);
  Logger.log('');
}

// Individual test functions
function testG8C4W1Hook() { createG8C4W1Hook_(); }
function testG8C4W1Station1() { createG8C4W1Station1_(); }
function testG8C4W1Station2() { createG8C4W1Station2_(); }
function testG8C4W1Station3() { createG8C4W1Station3_(); }
function testG8C4W1ExitTicket() { createG8C4W1ExitTicket_(); }
