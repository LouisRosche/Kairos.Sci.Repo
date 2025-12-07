/**
 * ============================================================================
 * GRADE 8 - CYCLE 4 WEEK 2: ECOSYSTEM DISRUPTION & INVASIVE SPECIES
 * 5 Forms | 100 Points Total | ~75 Minutes
 * ============================================================================
 *
 * NGSS ALIGNMENT:
 *   Primary: MS-LS2-3 - Develop a model to describe the cycling of matter
 *            and flow of energy among living and nonliving parts of an ecosystem
 *   Spiral:  MS-LS4-4 - Natural selection and adaptation (Cycle 3)
 *            MS-LS2-4 - Changes to components affect populations (Cycle 3)
 *
 * 3-DIMENSIONAL LEARNING:
 *   SEP-2: Developing Models - Model disruption effects on food webs
 *   SEP-4: Analyzing Data - Interpret invasive species impact data
 *   DCI LS2.B: Cycles of Matter and Energy Transfer
 *   DCI LS2.C: Ecosystem Dynamics, Functioning, and Resilience
 *   CCC-4: Systems and System Models - Ecosystem as interconnected system
 *   CCC-7: Stability and Change - Disruption and recovery
 *
 * LEARNING TARGETS:
 *   1. Explain how invasive species disrupt energy flow in ecosystems
 *   2. Model the cascade effects of species removal or addition
 *   3. Analyze real-world invasive species case studies
 *   4. Design and evaluate intervention strategies
 *
 * FORMS:
 *   1. Hook - The Cane Toad Disaster (12 pts, ~10 min)
 *   2. Station 1 - Modeling Disruption (20 pts, ~18 min)
 *   3. Station 2 - Case Study Analysis (20 pts, ~15 min)
 *   4. Station 3 - Design an Intervention (25 pts, ~20 min)
 *   5. Exit Ticket - Ecosystem Dynamics (23 pts, ~15 min)
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
 * ============================================================================
 */

// ============================================================================
// MAIN FUNCTION
// ============================================================================

function createAllG8C4W2Forms() {
  Logger.log('================================================');
  Logger.log('G8 CYCLE 4 WEEK 2: ECOSYSTEM DISRUPTION & INVASIVE SPECIES');
  Logger.log('================================================\n');

  const forms = {
    hook: createG8C4W2Hook_(),
    station1: createG8C4W2Station1_(),
    station2: createG8C4W2Station2_(),
    station3: createG8C4W2Station3_(),
    exitTicket: createG8C4W2ExitTicket_()
  };

  Logger.log('\n================================================');
  Logger.log('ALL 5 FORMS CREATED - 100 POINTS TOTAL');
  Logger.log('================================================');

  return forms;
}

// ============================================================================
// HOOK - THE CANE TOAD DISASTER (12 points, ~10 min)
// Phenomenon-based introduction to invasive species
// ============================================================================

function createG8C4W2Hook_() {
  const form = FormApp.create('G8.C4.W2: Hook - The Cane Toad Disaster');

  form.setDescription(
    'THE CANE TOAD DISASTER\n\n' +
    'In 1935, Australia introduced 102 cane toads to eat beetles destroying sugar cane crops.\n\n' +
    'Today, there are over 200 MILLION cane toads spreading across the continent.\n' +
    '• They don\'t eat the beetles (they can\'t catch them)\n' +
    '• They ARE highly toxic, killing predators that eat them\n' +
    '• Native species populations have crashed\n\n' +
    'How did 102 toads become an ecological catastrophe?\n\n' +
    '---\n' +
    'Time: About 10 minutes | Points: 12\n' +
    'Connect this to Week 1\'s energy pyramids!'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Hook submitted! You\'re ready for Station 1.\n\n' +
    'Next: Model how species removal and addition disrupts food webs.\n' +
    'You\'ll use simulations to predict cascade effects!'
  );

  // --- PART 1: OBSERVATION ---
  form.addPageBreakItem()
    .setTitle('Part 1: The Phenomenon')
    .setHelpText('Think about what happens when a new species is introduced.');

  // Q1: Initial observation (3 pts auto)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('The cane toads were introduced to control beetle pests but failed. What went WRONG with this plan?')
    .setHelpText('Think about the relationship between predator and prey.')
    .setRequired(true);

  q1.setChoices([
    q1.createChoice('The toads couldn\'t catch the fast-moving beetles that lived in high sugar cane', true),
    q1.createChoice('The toads were eaten by the beetles', false),
    q1.createChoice('The toads became friends with the beetles', false),
    q1.createChoice('The beetles left Australia voluntarily', false)
  ]);
  q1.setPoints(3);
  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Scientists didn\'t research whether toads could actually catch the beetles. The beetles live high on cane stalks where toads can\'t reach.')
      .build()
  );
  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('The plan failed because cane toads hunt on the ground, but beetles live up on sugar cane stalks.')
      .build()
  );

  // --- MTSS FLAG: Check for ecosystem stability misconception ---
  const mtss1 = form.addMultipleChoiceItem()
    .setTitle('QUICK CHECK (Prior Knowledge): Ecosystems are:')
    .setHelpText('This checks a common misconception. Your answer does NOT affect your grade.')
    .setRequired(true);

  mtss1.setChoices([
    mtss1.createChoice('Always perfectly balanced and self-correcting', false), // FLAG: Stability misconception
    mtss1.createChoice('Dynamic systems that can be disrupted by changes', true),
    mtss1.createChoice('Impossible to change by human actions', false),
    mtss1.createChoice('Random with no predictable patterns', false)
  ]);
  mtss1.setPoints(0); // Diagnostic only

  // Q2: Prediction (3 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 2 (3 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '3: Identifies lack of predators + connects to energy pyramid (no top predator control)\n' +
      '2: Mentions predators but incomplete reasoning\n' +
      '1: General guess without ecosystem reasoning\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Why did the cane toad population EXPLODE in Australia? Consider: What usually limits a population, and what was different for cane toads?')
    .setHelpText(
      'Sentence starters:\n' +
      '• "Populations are usually limited by..." \n' +
      '• "Cane toads had no natural ___ in Australia because..." \n' +
      '• "Using Week 1\'s energy pyramid, cane toads became..."'
    )
    .setRequired(true);

  // --- PART 2: WEEK 1 CONNECTION ---
  form.addPageBreakItem()
    .setTitle('Part 2: Week 1 Connection')
    .setHelpText('Connect invasive species to energy pyramids.');

  // Q3: Energy pyramid disruption (3 pts auto)
  const q3 = form.addMultipleChoiceItem()
    .setTitle('In Week 1, we learned about energy pyramids. When cane toads kill native predators (quolls, snakes, crocodiles), what happens to the energy pyramid?')
    .setRequired(true);

  q3.setChoices([
    q3.createChoice('Top of pyramid collapses → prey populations explode → producers overgrazed', true),
    q3.createChoice('Energy pyramid becomes stronger', false),
    q3.createChoice('Nothing changes in the energy flow', false),
    q3.createChoice('More energy becomes available to all levels', false)
  ]);
  q3.setPoints(3);
  q3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Removing top predators causes a cascade: no population control → herbivores boom → vegetation decimated.')
      .build()
  );
  q3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Think about the 10% rule: if predators die, who controls prey populations? The pyramid doesn\'t just stay the same.')
      .build()
  );

  // Q4: Trophic cascade (3 pts auto)
  const q4 = form.addMultipleChoiceItem()
    .setTitle('A "trophic cascade" happens when changes at one level affect ALL other levels. Which best describes what cane toads caused?')
    .setRequired(true);

  q4.setChoices([
    q4.createChoice('Top-down cascade: predator removal affects everything below', true),
    q4.createChoice('Bottom-up cascade: producer changes affect everything above', false),
    q4.createChoice('No cascade occurred', false),
    q4.createChoice('Only one trophic level was affected', false)
  ]);
  q4.setPoints(3);
  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Cane toads killed predators (top), which caused prey to increase, which affected plants—a top-down cascade.')
      .build()
  );
  q4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Toads are toxic to predators (top level). When predators die, effects ripple DOWN through the ecosystem.')
      .build()
  );

  // Q5: Confidence (0 pts - diagnostic only)
  form.addScaleItem()
    .setTitle('Self-Assessment: How confident are you that you can explain how invasive species disrupt ecosystems?')
    .setHelpText('FOR REFLECTION ONLY - This does NOT affect your grade. Be honest!')
    .setBounds(1, 5)
    .setLabels('Still learning', 'Got it!')
    .setRequired(true);

  logFormInfo_(form, 'G8 C4 W2 Hook', 12);
  return form;
}

// ============================================================================
// STATION 1 - MODELING DISRUPTION (20 points, ~18 min)
// Food web simulation with species removal/addition
// ============================================================================

function createG8C4W2Station1_() {
  const form = FormApp.create('G8.C4.W2: Station 1 - Modeling Disruption');

  form.setDescription(
    'YOUR MISSION: MODEL ECOSYSTEM DISRUPTION\n\n' +
    'Use the food web simulation to predict what happens when species are removed or added.\n\n' +
    'KEY CONCEPTS:\n' +
    '• Trophic cascade: Changes ripple through multiple levels\n' +
    '• Keystone species: Species with outsized effects on ecosystem\n' +
    '• Ecological niche: Role a species plays in the ecosystem\n\n' +
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
    'KEY INSIGHT: Removing or adding one species can affect the entire ecosystem.\n' +
    'Invasive species often lack natural predators, letting them dominate.\n\n' +
    'Continue to Station 2: Case Study Analysis'
  );

  // --- REFERENCE: SAMPLE FOOD WEB ---
  form.addPageBreakItem()
    .setTitle('Reference: Yellowstone Food Web')
    .setHelpText(
      'YELLOWSTONE ECOSYSTEM (simplified):\n\n' +
      '                    ┌─────────┐\n' +
      '                    │  WOLVES │  ← Apex predator\n' +
      '                    └────┬────┘\n' +
      '                         ↓\n' +
      '              ┌──────────┴──────────┐\n' +
      '              ↓                     ↓\n' +
      '         ┌─────────┐           ┌─────────┐\n' +
      '         │   ELK   │           │ COYOTES │\n' +
      '         └────┬────┘           └────┬────┘\n' +
      '              ↓                     ↓\n' +
      '    ┌─────────┴─────────┐     ┌────┴────┐\n' +
      '    ↓         ↓         ↓     ↓         ↓\n' +
      '┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐\n' +
      '│WILLOWS│ │ASPENS │ │GRASSES│ │RABBITS│ │ MICE  │\n' +
      '└───────┘ └───────┘ └───────┘ └───────┘ └───────┘\n\n' +
      'REAL HISTORY:\n' +
      '• 1926: Wolves eliminated from Yellowstone\n' +
      '• 1926-1995: Elk overpopulated, willows/aspens decimated\n' +
      '• 1995: Wolves reintroduced (31 wolves)\n' +
      '• Result: Ecosystem dramatically recovered'
    );

  // Q1: Prediction - Wolf removal (4 pts auto)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('When wolves were removed from Yellowstone, what happened to the elk population?')
    .setHelpText('Use the food web to predict.')
    .setRequired(true);

  q1.setChoices([
    q1.createChoice('Elk population increased dramatically (no predator control)', true),
    q1.createChoice('Elk population decreased (less competition)', false),
    q1.createChoice('Elk population stayed the same', false),
    q1.createChoice('Elk went extinct', false)
  ]);
  q1.setPoints(4);
  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Without wolves, elk had no major predator. Their population exploded from ~4,000 to over 20,000.')
      .build()
  );
  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Think about the 10% rule: predators limit prey populations. Without wolves, what limits elk?')
      .build()
  );

  // Q2: Cascade prediction (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 2: Predict the Cascade (4 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '4: Traces complete cascade: wolves gone → elk up → plants down → riparian areas damaged → erosion\n' +
      '3: Traces 2-3 steps correctly\n' +
      '2: Identifies direction but incomplete\n' +
      '1: Vague or incorrect\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Trace the cascade: When elk overpopulated (no wolves), what happened to willows and aspens? What OTHER organisms depend on willows? What happened to them?')
    .setHelpText(
      'Sentence starters:\n' +
      '• "Without wolves, elk populations..." \n' +
      '• "More elk meant more grazing, so willows and aspens..." \n' +
      '• "Beavers need willows to build dams, so when willows..."'
    )
    .setRequired(true);

  // Q3: Invasive species prediction (4 pts auto)
  const q3 = form.addMultipleChoiceItem()
    .setTitle('If an invasive plant species took over all the grass in Yellowstone, what would happen to the wolf population?')
    .setHelpText('Think about bottom-up effects.')
    .setRequired(true);

  q3.setChoices([
    q3.createChoice('Wolves would eventually decline (less elk food → less elk → less wolf food)', true),
    q3.createChoice('Wolves would increase (more hiding spots)', false),
    q3.createChoice('Wolves are unaffected by plants', false),
    q3.createChoice('Wolves would switch to eating the invasive plants', false)
  ]);
  q3.setPoints(4);
  q3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! This is a bottom-up cascade: producers (grass) → primary consumers (elk) → secondary consumers (wolves). All levels are connected!')
      .build()
  );
  q3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Remember the 10% rule: energy flows from producers → consumers. If producers change, all higher levels are affected.')
      .build()
  );

  // Q4: Keystone species (4 pts auto)
  const q4 = form.addMultipleChoiceItem()
    .setTitle('Wolves are called a "keystone species." What makes a species a keystone?')
    .setRequired(true);

  q4.setChoices([
    q4.createChoice('Its effects on the ecosystem are much greater than its population size suggests', true),
    q4.createChoice('It has the largest population', false),
    q4.createChoice('It is the strongest predator', false),
    q4.createChoice('It lives the longest', false)
  ]);
  q4.setPoints(4);
  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Wolves are only ~0.01% of Yellowstone\'s animal biomass, but their removal caused the entire ecosystem to change.')
      .build()
  );
  q4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Keystone species have outsized effects. Removing a keystone species—even if rare—collapses the ecosystem "arch."')
      .build()
  );

  // Q5: Spiral - Cycle 3 (4 pts auto)
  const q5 = form.addMultipleChoiceItem()
    .setTitle('CYCLE 3 CONNECTION: When wolves were reintroduced, elk behavior changed—they avoided open areas near rivers. How does this relate to natural selection?')
    .setRequired(true);

  q5.setChoices([
    q5.createChoice('Elk that avoided risky areas survived more, selecting for cautious behavior', true),
    q5.createChoice('Elk evolved new DNA in 10 years', false),
    q5.createChoice('Natural selection doesn\'t affect behavior', false),
    q5.createChoice('Wolves taught the elk to avoid rivers', false)
  ]);
  q5.setPoints(4);
  q5.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! This is behavioral adaptation through selection. Careless elk got eaten; cautious elk survived and reproduced.')
      .build()
  );
  q5.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Cycle 3: Natural selection acts on variation. Some elk are naturally more cautious. Those survive when wolves are present.')
      .build()
  );

  logFormInfo_(form, 'G8 C4 W2 Station 1', 20);
  return form;
}

// ============================================================================
// STATION 2 - CASE STUDY ANALYSIS (20 points, ~15 min)
// Real-world invasive species data analysis
// ============================================================================

function createG8C4W2Station2_() {
  const form = FormApp.create('G8.C4.W2: Station 2 - Case Study Analysis');

  form.setDescription(
    'YOUR MISSION: ANALYZE INVASIVE SPECIES CASE STUDIES\n\n' +
    'You\'ll analyze data from real invasive species:\n' +
    '• Zebra mussels in the Great Lakes\n' +
    '• Kudzu in the Southern US\n' +
    '• Brown tree snakes in Guam\n\n' +
    '---\n' +
    'Time: About 15 minutes | Points: 20\n' +
    'Use the data tables to answer questions.'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Station 2 complete!\n\n' +
    'KEY INSIGHT: Invasive species share common traits: fast reproduction,\n' +
    'no natural predators, and outcompete native species for resources.\n\n' +
    'Continue to Station 3: Design an Intervention'
  );

  // --- CASE STUDY DATA ---
  form.addPageBreakItem()
    .setTitle('Reference: Invasive Species Data')
    .setHelpText(
      'CASE STUDY 1: ZEBRA MUSSELS (Great Lakes)\n' +
      '┌────────────────────────────────────────────────────┐\n' +
      '│ Year   │ Population Density (per m²) │ Native Fish │\n' +
      '├────────────────────────────────────────────────────┤\n' +
      '│ 1988   │ 0 (just arrived)            │ 100%        │\n' +
      '│ 1995   │ 30,000                      │ 85%         │\n' +
      '│ 2000   │ 70,000                      │ 60%         │\n' +
      '│ 2010   │ 100,000                     │ 45%         │\n' +
      '│ 2020   │ 150,000                     │ 35%         │\n' +
      '└────────────────────────────────────────────────────┘\n\n' +
      'CASE STUDY 2: KUDZU ("The Vine That Ate the South")\n' +
      '• Introduced 1876 as ornamental plant\n' +
      '• Grows up to 1 foot (30 cm) PER DAY\n' +
      '• Covers 7.4 million acres in US\n' +
      '• Smothers native trees, blocks sunlight\n' +
      '• Estimated cost: $500 million/year in lost productivity\n\n' +
      'CASE STUDY 3: BROWN TREE SNAKE (Guam)\n' +
      '• Arrived ~1950 as cargo stowaway\n' +
      '• Guam has NO native snakes (island isolation)\n' +
      '• 10/12 native forest bird species now EXTINCT\n' +
      '• Spider population exploded 40× (no bird predators)\n' +
      '• Power outages: 1,600+ caused by snakes on power lines'
    );

  // Q1: Data interpretation - zebra mussels (4 pts auto)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('According to the zebra mussel data, as zebra mussel population increased, native fish populations:')
    .setRequired(true);

  q1.setChoices([
    q1.createChoice('Decreased (negative correlation: 100% → 35% as mussels increased)', true),
    q1.createChoice('Increased (positive correlation)', false),
    q1.createChoice('Stayed the same (no correlation)', false),
    q1.createChoice('First increased, then decreased', false)
  ]);
  q1.setPoints(4);
  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Zebra mussels filter-feed, removing plankton that native fish need. They outcompete native mussels for food.')
      .build()
  );
  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Look at the data: In 1988, native fish = 100%. In 2020, with many mussels, native fish = 35%. What\'s the pattern?')
      .build()
  );

  // Q2: Energy pyramid connection (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 2: Connect to Energy Pyramids (4 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '4: Explains zebra mussels compete for plankton → less energy to native fish → fish decline; uses 10% rule concept\n' +
      '3: Mentions competition but incomplete energy explanation\n' +
      '2: General connection without specifics\n' +
      '1: Vague response\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Using Week 1\'s 10% rule, explain HOW zebra mussels cause native fish populations to decline. Where in the energy pyramid is the competition happening?')
    .setHelpText(
      'Sentence starters:\n' +
      '• "Zebra mussels and native fish both eat..." \n' +
      '• "At the ___ trophic level, there is only so much energy..." \n' +
      '• "When mussels take more, fish get less, which means..."'
    )
    .setRequired(true);

  // Q3: Kudzu analysis (4 pts auto)
  const q3 = form.addMultipleChoiceItem()
    .setTitle('Kudzu grows 1 foot per day and smothers trees. What trophic cascade does this cause?')
    .setRequired(true);

  q3.setChoices([
    q3.createChoice('Trees die → forest animals lose habitat → predators decline → ecosystem collapses', true),
    q3.createChoice('More plants = more energy for all animals', false),
    q3.createChoice('Kudzu has no effect on animals', false),
    q3.createChoice('Predators eat the kudzu, controlling it', false)
  ]);
  q3.setPoints(4);
  q3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Kudzu kills native trees (producers), which eliminates habitat and food for the ENTIRE food web above.')
      .build()
  );
  q3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('When kudzu kills trees, what happens to animals that depend on trees for food or shelter? Trace the cascade.')
      .build()
  );

  // Q4: Brown tree snake analysis (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 4: Analyze the Guam Case (4 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '4: Explains isolation (no predators evolved), connects spider explosion to bird extinction (top-down cascade)\n' +
      '3: Mentions isolation or cascade but not both\n' +
      '2: Partial understanding\n' +
      '1: Vague response\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Why did the brown tree snake cause MORE damage in Guam than cane toads in Australia? Consider: What was special about Guam as an island ecosystem?')
    .setHelpText(
      'Sentence starters:\n' +
      '• "Guam is an island that evolved without..." \n' +
      '• "Island species often don\'t recognize..." \n' +
      '• "When birds went extinct, their prey (like spiders)..."'
    )
    .setRequired(true);

  // Q5: Common traits (4 pts auto)
  const q5 = form.addCheckboxItem()
    .setTitle('What traits do successful invasive species typically share? SELECT ALL THAT APPLY.')
    .setRequired(true);

  q5.setChoices([
    q5.createChoice('Fast reproduction rate', true),
    q5.createChoice('No natural predators in new environment', true),
    q5.createChoice('Outcompete native species for resources', true),
    q5.createChoice('Are always larger than native species', false),
    q5.createChoice('Need help from humans to spread', false)
  ]);
  q5.setPoints(4);

  logFormInfo_(form, 'G8 C4 W2 Station 2', 20);
  return form;
}

// ============================================================================
// STATION 3 - DESIGN AN INTERVENTION (25 points, ~20 min)
// Engineering challenge: Evaluate and design solutions
// ============================================================================

function createG8C4W2Station3_() {
  const form = FormApp.create('G8.C4.W2: Station 3 - Design an Intervention');

  form.setDescription(
    'ENGINEERING CHALLENGE: DESIGN AN INVASIVE SPECIES INTERVENTION\n\n' +
    'Your task: Evaluate intervention strategies and design your own plan\n' +
    'to control an invasive species while minimizing unintended consequences.\n\n' +
    '---\n' +
    'Time: About 20 minutes | Points: 25 (highest value!)\n\n' +
    'CONSTRAINTS:\n' +
    '• Must not harm native species\n' +
    '• Must consider long-term effects (not just short-term fix)\n' +
    '• Budget: $1 million per year\n' +
    '• Must be sustainable (can\'t just keep adding more forever)'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Station 3 complete!\n\n' +
    'KEY INSIGHT: Intervention design requires balancing effectiveness\n' +
    'against risks. The "cure" can sometimes be worse than the disease!\n\n' +
    'Continue to Exit Ticket'
  );

  // --- INTERVENTION OPTIONS ---
  form.addPageBreakItem()
    .setTitle('Available Intervention Strategies')
    .setHelpText(
      'SCENARIO: Control cane toads in Australia\n\n' +
      'OPTION A: PHYSICAL REMOVAL (Trapping)\n' +
      '• Effectiveness: Low (2% reduction per year)\n' +
      '• Cost: $500,000/year\n' +
      '• Risks: Labor intensive, can\'t keep up with reproduction\n' +
      '• Sustainability: Low (must continue forever)\n\n' +
      'OPTION B: CHEMICAL CONTROL (Pesticide)\n' +
      '• Effectiveness: Medium (30% reduction short-term)\n' +
      '• Cost: $800,000/year\n' +
      '• Risks: Kills native frogs too, poisons waterways\n' +
      '• Sustainability: Low (toads become resistant)\n\n' +
      'OPTION C: BIOLOGICAL CONTROL (Introduce Predator)\n' +
      '• Effectiveness: High if predator is specific\n' +
      '• Cost: $300,000 one-time + $100,000/year monitoring\n' +
      '• Risks: Predator might attack native species (new invasive!)\n' +
      '• Sustainability: High if works; catastrophic if fails\n\n' +
      'OPTION D: GENETIC CONTROL (Gene Drive)\n' +
      '• Effectiveness: Potentially 100% if it works\n' +
      '• Cost: $5 million research + $500,000/year\n' +
      '• Risks: Untested technology, might spread to native toads\n' +
      '• Sustainability: High if works; unknown risks\n\n' +
      'OPTION E: BARRIER CONTROL (Fencing + Monitoring)\n' +
      '• Effectiveness: Medium (prevents spread to new areas)\n' +
      '• Cost: $2 million construction + $200,000/year\n' +
      '• Risks: Doesn\'t reduce existing population\n' +
      '• Sustainability: Medium (protects areas, doesn\'t solve problem)'
    );

  // Q1: Evaluate options (6 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 1: Evaluate Two Options (6 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '6: Compares two options using effectiveness, cost, AND risk; explains trade-offs clearly\n' +
      '4-5: Compares but missing one criterion\n' +
      '2-3: Basic comparison with limited reasoning\n' +
      '1: Mentions options without comparison\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Compare TWO intervention options. For each, discuss: effectiveness, cost, and risk. Which is better and why?')
    .setHelpText(
      'Sentence starters:\n' +
      '• "Option ___ is effective because..." \n' +
      '• "However, the risk is..." \n' +
      '• "Compared to Option ___, it is better/worse because..."'
    )
    .setRequired(true);

  // Q2: Design your plan (7 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 2: Design Your Intervention (7 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '7: Proposes combination strategy, addresses constraints, explains energy flow reasoning, acknowledges trade-offs\n' +
      '5-6: Good plan with most elements\n' +
      '3-4: Basic plan with gaps\n' +
      '1-2: Incomplete proposal\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Design your own intervention plan for cane toads. You may combine strategies.\n\n• What specific methods will you use?\n• How does your plan stay within $1 million/year?\n• How does your plan consider the energy pyramid/food web?')
    .setHelpText(
      'Sentence starters:\n' +
      '• "My plan combines ___ and ___ because..." \n' +
      '• "For the first year, I would spend $... on..." \n' +
      '• "This addresses the energy pyramid by..."'
    )
    .setRequired(true);

  // Q3: Unintended consequences (4 pts auto)
  const q3 = form.addMultipleChoiceItem()
    .setTitle('In the past, scientists introduced mongoose to Hawaii to control rats. The mongoose now threatens native birds instead. This is an example of:')
    .setRequired(true);

  q3.setChoices([
    q3.createChoice('A biocontrol agent becoming an invasive species itself', true),
    q3.createChoice('A successful biocontrol program', false),
    q3.createChoice('Natural ecosystem recovery', false),
    q3.createChoice('Chemical control failure', false)
  ]);
  q3.setPoints(4);
  q3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! This is why biological control is risky. The "solution" can become a new problem if the predator isn\'t highly specific.')
      .build()
  );
  q3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Mongoose were supposed to eat rats. Instead, they prefer easier prey: native bird eggs. Now Hawaii has BOTH rats AND mongoose problems.')
      .build()
  );

  // Q4: Long-term thinking (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 4: Consider Long-term Effects (4 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '4: Identifies specific long-term cascade effect (removing toads → predators recover → prey controlled → ecosystem balance)\n' +
      '3: Mentions recovery but vague\n' +
      '2: Short-term thinking only\n' +
      '1: Incomplete\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('If your plan successfully reduces cane toad populations by 90%, what would happen to the NATIVE predators (quolls, snakes) that cane toads have been killing? Trace the cascade.')
    .setHelpText(
      'Sentence starters:\n' +
      '• "With fewer toxic toads, native predators would..." \n' +
      '• "As predators recover, their prey populations would..." \n' +
      '• "Eventually, the ecosystem might..."'
    )
    .setRequired(true);

  // Q5: Ethical considerations (4 pts auto)
  const q5 = form.addMultipleChoiceItem()
    .setTitle('Why is it important to consider whether an intervention might harm NATIVE species, even if it effectively controls invasives?')
    .setRequired(true);

  q5.setChoices([
    q5.createChoice('Native species are part of the ecosystem\'s natural energy flow and cannot be easily replaced', true),
    q5.createChoice('Native species don\'t matter as much as stopping invasives', false),
    q5.createChoice('It\'s impossible to harm native species with interventions', false),
    q5.createChoice('Ethical considerations don\'t apply to ecosystems', false)
  ]);
  q5.setPoints(4);
  q5.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Native species evolved together over millions of years. They\'re interconnected. Losing one can cascade through the entire food web.')
      .build()
  );
  q5.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Think about the Yellowstone wolves: native species have evolved roles in the ecosystem. Removing them causes cascades.')
      .build()
  );

  logFormInfo_(form, 'G8 C4 W2 Station 3', 25);
  return form;
}

// ============================================================================
// EXIT TICKET - ECOSYSTEM DYNAMICS (23 points, ~15 min)
// 2 NEW + 2 SPIRAL + 1 INTEGRATION + 1 SEP
// ============================================================================

function createG8C4W2ExitTicket_() {
  const form = FormApp.create('G8.C4.W2: Exit Ticket - Ecosystem Dynamics');

  form.setDescription(
    'EXIT TICKET: SHOW WHAT YOU LEARNED\n\n' +
    'This tests whether you can apply ecosystem disruption concepts.\n\n' +
    '---\n' +
    'Time: About 15 minutes | Points: 23\n\n' +
    'QUESTION TYPES:\n' +
    '- 2 NEW questions (Cycle 4 content - invasive species & disruption)\n' +
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
    'WEEK 2 COMPLETE! Congratulations!\n\n' +
    'You learned about ecosystem disruption and invasive species.\n\n' +
    'Key takeaways:\n' +
    '• Invasive species disrupt energy flow by outcompeting natives\n' +
    '• Trophic cascades ripple through entire ecosystems\n' +
    '• Keystone species have outsized effects\n' +
    '• Interventions must consider unintended consequences\n\n' +
    'NEXT WEEK: Cycle 4 Synthesis & Assessment'
  );

  // --- NEW CONTENT ---
  form.addPageBreakItem()
    .setTitle('NEW CONTENT (Questions 1 & 2)')
    .setHelpText('These test what you learned TODAY about ecosystem disruption.');

  // Q1: NEW - Trophic cascade (4 pts auto)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('When an apex predator is removed from an ecosystem, what typically happens first?')
    .setRequired(true);

  q1.setChoices([
    q1.createChoice('Prey populations increase rapidly (no predator control)', true),
    q1.createChoice('Producer populations increase', false),
    q1.createChoice('Nothing changes', false),
    q1.createChoice('The ecosystem becomes more stable', false)
  ]);
  q1.setPoints(4);
  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Without predators, prey populations explode. This is the first step in a top-down trophic cascade.')
      .build()
  );
  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Think about what predators do: they control prey populations. Remove them, and prey are no longer controlled.')
      .build()
  );

  // Q2: NEW - Invasive species traits (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 2: NEW - Explain Invasive Success (4 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '4: Explains why new species succeeds: no predators, no competition evolved, fast reproduction + connects to energy flow\n' +
      '3: Mentions 2-3 factors without energy connection\n' +
      '2: Basic understanding\n' +
      '1: Vague response\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Explain why invasive species are often MORE successful in their new environment than in their native environment. Use energy pyramid concepts.')
    .setHelpText(
      'Sentence starters:\n' +
      '• "In their native environment, species are limited by..." \n' +
      '• "In a new environment, they have access to energy that..." \n' +
      '• "Without predators controlling their population..."'
    )
    .setRequired(true);

  // --- SPIRAL CONTENT ---
  form.addPageBreakItem()
    .setTitle('SPIRAL CONTENT (Questions 3 & 4)')
    .setHelpText('These review concepts from Cycle 3 AND Week 1.');

  // Q3: SPIRAL - Week 1 10% rule (4 pts auto)
  const q3 = form.addMultipleChoiceItem()
    .setTitle('WEEK 1 REVIEW: According to the 10% rule, why can\'t an ecosystem support very many apex predators?')
    .setRequired(true);

  q3.setChoices([
    q3.createChoice('Only 10% of energy transfers between levels, so very little reaches the top', true),
    q3.createChoice('Apex predators are just rare by chance', false),
    q3.createChoice('Apex predators prefer to live alone', false),
    q3.createChoice('There\'s actually plenty of energy at the top', false)
  ]);
  q3.setPoints(4);
  q3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! If producers have 10,000 kcal, apex predators (4th level) only have access to 10 kcal (0.01%). Limited energy = limited population.')
      .build()
  );
  q3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Review Week 1: Apply 10% multiple times. Producers → primary → secondary → apex = 10% × 10% × 10% = 0.1% of original energy.')
      .build()
  );

  // Q4: SPIRAL - Cycle 3 natural selection (4 pts auto)
  const q4 = form.addMultipleChoiceItem()
    .setTitle('CYCLE 3 REVIEW: Island species (like Guam\'s birds) are often easily devastated by invasive predators because:')
    .setRequired(true);

  q4.setChoices([
    q4.createChoice('They evolved without predators, so never developed defensive adaptations', true),
    q4.createChoice('Island animals are genetically weaker', false),
    q4.createChoice('Islands have less food', false),
    q4.createChoice('Island animals are more aggressive', false)
  ]);
  q4.setPoints(4);
  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Cycle 3: Natural selection only produces adaptations to EXISTING pressures. If there were no predators, no anti-predator traits evolved.')
      .build()
  );
  q4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Think about Cycle 3: Adaptations evolve in response to selection pressures. No predators = no selection for predator avoidance.')
      .build()
  );

  // --- INTEGRATION ---
  form.addPageBreakItem()
    .setTitle('INTEGRATION (Question 5)')
    .setHelpText('This requires knowledge from multiple sources.');

  // Q5: Integration (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 5: INTEGRATION (4 points)')
    .setHelpText(
      '3D ASSESSMENT RUBRIC:\n' +
      '4: Connects energy efficiency (10% rule), evolution (time to adapt), and invasion (niche opportunity)\n' +
      '   SEP: Constructs explanation from multiple sources\n' +
      '   DCI: Applies LS2.C (ecosystem dynamics)\n' +
      '   CCC: Uses systems thinking\n' +
      '3: Makes 2 connections\n' +
      '2: Makes 1 connection\n' +
      '1: Vague connections\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Connect these three concepts:\n1. The 10% rule (Week 1)\n2. Natural selection (Cycle 3)\n3. Why invasive species succeed (Week 2)\n\nExplain how all three relate to explain why removing a native predator creates an opportunity for invasive species.')
    .setHelpText(
      'Sentence starters:\n' +
      '• "When native predators are removed, the energy they used to consume is now..." \n' +
      '• "Native species evolved specific niches through natural selection, but..." \n' +
      '• "Invasive species can exploit this because..."'
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
      '3 pts: Describes model showing before/after with arrows indicating cascade direction\n' +
      '2 pts: Describes model with some structure\n' +
      '1 pt: Basic description only\n' +
      '0 pts: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Describe a model you would create to show how cane toads disrupted Australian ecosystems. Include:\n• What organisms you would show\n• Arrows showing energy flow/relationships\n• How you would show the "before" and "after"')
    .setHelpText(
      'Sentence starters:\n' +
      '• "My model would show ___ connected to ___ with arrows..." \n' +
      '• "Before cane toads, the arrows would show..." \n' +
      '• "After cane toads, the arrows would show..."'
    )
    .setRequired(true);

  logFormInfo_(form, 'G8 C4 W2 Exit Ticket', 23);
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
function testG8C4W2Hook() { createG8C4W2Hook_(); }
function testG8C4W2Station1() { createG8C4W2Station1_(); }
function testG8C4W2Station2() { createG8C4W2Station2_(); }
function testG8C4W2Station3() { createG8C4W2Station3_(); }
function testG8C4W2ExitTicket() { createG8C4W2ExitTicket_(); }
