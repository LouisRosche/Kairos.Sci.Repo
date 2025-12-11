/**
 * ============================================================================
 * GRADE 7 - CYCLE 8 WEEK 1: ECOSYSTEM DYNAMICS & TROPHIC CASCADES
 * 5 Forms | 100 Points Total | ~78 Minutes
 * ============================================================================
 *
 * NGSS ALIGNMENT:
 *   Primary: MS-LS2-4 - Construct an argument supported by empirical evidence
 *            that changes to physical or biological components of an ecosystem
 *            affect populations.
 *   Spiral:  MS-ESS1-4 - Geologic time scale (Cycle 7)
 *            MS-ESS3-3 - Human impact (Cycle 4)
 *
 * 3-DIMENSIONAL LEARNING:
 *   SEP-7: Engaging in Argument - Argue for conservation interventions
 *   SEP-6: Constructing Explanations - Explain trophic cascade mechanisms
 *   DCI LS2.A: Interdependent Relationships in Ecosystems
 *   DCI LS2.C: Ecosystem Dynamics, Functioning, and Resilience
 *   CCC-7: Stability and Change - Ecosystem equilibrium disruption
 *   CCC-2: Cause and Effect - Cascading effects through food webs
 *
 * LEARNING TARGETS:
 *   1. Explain how energy flows through trophic levels
 *   2. Model cascading effects through food webs
 *   3. Predict ecosystem changes from species removal/addition
 *   4. Design interventions for ecosystem restoration
 *
 * FORMS:
 *   1. Hook - The Wolves and Rivers Mystery (12 pts, ~10 min)
 *   2. Station 1 - Trophic Cascade Simulation (20 pts, ~18 min)
 *   3. Station 2 - Population Dynamics Analysis (20 pts, ~15 min)
 *   4. Station 3 - Design a Conservation Plan (25 pts, ~20 min)
 *   5. Exit Ticket - Ecosystem Dynamics Integration (23 pts, ~15 min)
 *
 * ============================================================================
 * GOOGLE FORMS API CONSTRAINTS - NON-NEGOTIABLE RULES
 * ============================================================================
 * RULE 1: setPoints() ONLY on auto-gradable items (MCQ, Checkbox, Scale)
 * RULE 2: setShuffleOrder() does NOT exist - configure manually in UI
 * RULE 3: Use requireTextLengthGreaterThanOrEqualTo(), NOT requireTextLengthGreaterThan()
 * RULE 4: setRequireLogin(true) for verified email collection
 * RULE 5: Feedback requires FormApp.createFeedback().setText().build()
 * RULE 6: Scale items - omit setPoints() for diagnostics (ungraded)
 * RULE 7: Checkbox grading is all-or-nothing
 *
 * ============================================================================
 * DEPLOYMENT CHECKLIST
 * ============================================================================
 *   1. Open script.google.com, create new project
 *   2. Paste this entire script
 *   3. Run: createAllG7C8W1Forms()
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

function createAllG7C8W1Forms() {
  Logger.log('================================================');
  Logger.log('G7 CYCLE 8 WEEK 1: ECOSYSTEM DYNAMICS & TROPHIC CASCADES');
  Logger.log('================================================\n');

  const forms = {
    hook: createG7C8W1Hook_(),
    station1: createG7C8W1Station1_(),
    station2: createG7C8W1Station2_(),
    station3: createG7C8W1Station3_(),
    exitTicket: createG7C8W1ExitTicket_()
  };

  Logger.log('\n================================================');
  Logger.log('ALL 5 FORMS CREATED - 100 POINTS TOTAL');
  Logger.log('================================================');

  return forms;
}

// ============================================================================
// HOOK - THE WOLVES AND RIVERS MYSTERY (12 points, ~10 min)
// Phenomenon-driven introduction to trophic cascades
// ============================================================================

function createG7C8W1Hook_() {
  const form = FormApp.create('G7.C8.W1: Hook - The Wolves and Rivers Mystery');

  form.setDescription(
    'THE WOLVES AND RIVERS MYSTERY\n\n' +
    'Something incredible happened in Yellowstone National Park:\n' +
    '- Wolves were hunted to extinction by 1926\n' +
    '- In 1995, scientists reintroduced 14 wolves\n' +
    '- Within 20 years, the RIVERS changed course!\n\n' +
    'How can predators change geography? Let\'s investigate.\n\n' +
    '---\n' +
    'Time: About 10 minutes | Points: 12\n' +
    'Think about what you learned in Cycle 7 about how ecosystems change over time!'
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
    'Next: Use the Trophic Cascade Simulator to model what happens\n' +
    'when species are removed from or added to an ecosystem.'
  );

  // --- PART 1: PRIOR KNOWLEDGE ---
  form.addPageBreakItem()
    .setTitle('Part 1: What You Already Know')
    .setHelpText('These questions check what you remember about ecosystems and change over time.');

  // Q1: Food chain basics (3 pts auto)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('In a food chain, energy flows from:')
    .setHelpText('Think about who eats whom.')
    .setRequired(true);

  q1.setChoices([
    q1.createChoice('Producers → Primary Consumers → Secondary Consumers → Apex Predators', true),
    q1.createChoice('Apex Predators → Secondary Consumers → Primary Consumers → Producers', false),
    q1.createChoice('All organisms share energy equally', false),
    q1.createChoice('Energy is created by each level, not transferred', false)
  ]);
  q1.setPoints(3);
  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Energy flows from producers (plants) up through the food chain to apex predators.')
      .build()
  );
  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Energy flows UP from producers (plants that make their own food) through consumers. Apex predators are at the top.')
      .build()
  );

  // --- MTSS FLAG: Check for ecosystem stability misconception ---
  const mtss1 = form.addMultipleChoiceItem()
    .setTitle('QUICK CHECK: Which statement is TRUE about ecosystems?')
    .setHelpText('This checks your understanding. Your answer does NOT affect your grade.')
    .setRequired(true);

  mtss1.setChoices([
    mtss1.createChoice('Ecosystems stay the same forever unless humans interfere', false), // FLAG: Stability misconception
    mtss1.createChoice('Ecosystems are constantly changing; populations naturally rise and fall', true),
    mtss1.createChoice('Ecosystems only change during mass extinctions', false),
    mtss1.createChoice('Individual animals evolve to fix ecosystem problems', false) // FLAG: Lamarckian
  ]);
  // Diagnostic only - omit setPoints()

  // --- PART 2: PHENOMENON ---
  form.addPageBreakItem()
    .setTitle('Part 2: The Yellowstone Mystery')
    .setHelpText('Watch the Yellowstone phenomenon unfold.');

  // Q2: Initial observation (3 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 2 (3 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '3: Describes specific changes (rivers, elk behavior, vegetation) + notes timeframe\n' +
      '2: Describes 2 elements\n' +
      '1: Basic description only\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('After watching the video/reading about Yellowstone: Describe at least TWO changes that happened after wolves were reintroduced.')
    .setHelpText(
      'Sentence starters:\n' +
      '• "After wolves returned, the rivers..." \n' +
      '• "The elk populations..." \n' +
      '• "The vegetation near riverbanks..."'
    )
    .setRequired(true);

  // Q3: Prediction (3 pts auto)
  const q3 = form.addMultipleChoiceItem()
    .setTitle('How could adding wolves (predators) possibly change RIVERS (geography)?')
    .setHelpText('Think about the connections between organisms.')
    .setRequired(true);

  q3.setChoices([
    q3.createChoice('Wolves changed elk behavior → elk stopped overgrazing riverbanks → plants returned → roots stabilized soil → rivers narrowed', true),
    q3.createChoice('Wolves dug channels that redirected water flow', false),
    q3.createChoice('Wolves scared all the water away from certain areas', false),
    q3.createChoice('This is impossible - predators cannot affect geography', false)
  ]);
  q3.setPoints(3);
  q3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! This is called a TROPHIC CASCADE - effects that ripple down through the food web.')
      .build()
  );
  q3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Think about the chain of effects: Wolves eat elk → elk behavior changes → plants are affected → soil is affected → rivers change.')
      .build()
  );

  // Q4: Connection to geologic time (3 pts auto)
  const q4 = form.addMultipleChoiceItem()
    .setTitle('CYCLE 7 CONNECTION: In geologic time, what happens when ecosystems lose key species?')
    .setRequired(true);

  q4.setChoices([
    q4.createChoice('The ecosystem always recovers instantly', false),
    q4.createChoice('It can take thousands to millions of years for ecosystems to recover, and some never do', true),
    q4.createChoice('Other species immediately fill the gap', false),
    q4.createChoice('Nothing changes - ecosystems are stable', false)
  ]);
  q4.setPoints(3);
  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Mass extinctions show that losing key species can change ecosystems for millions of years.')
      .build()
  );
  q4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Remember Cycle 7: After mass extinctions, it takes millions of years for biodiversity to recover. Yellowstone recovered faster because wolves were only gone ~70 years.')
      .build()
  );

  // Q5: Confidence (0 pts - diagnostic only)
  form.addScaleItem()
    .setTitle('Self-Assessment: How well can you explain how one species affects an entire ecosystem?')
    .setHelpText('FOR REFLECTION ONLY - This does NOT affect your grade. Be honest!')
    .setBounds(1, 5)
    .setLabels('Still learning', 'Got it!')
    .setRequired(true);

  logFormInfo_(form, 'G7 C8 W1 Hook', 12);
  return form;
}

// ============================================================================
// STATION 1 - TROPHIC CASCADE SIMULATION (20 points, ~18 min)
// Uses the embedded trophic-cascade-simulator.html
// ============================================================================

function createG7C8W1Station1_() {
  const form = FormApp.create('G7.C8.W1: Station 1 - Trophic Cascade Simulation');

  form.setDescription(
    'YOUR MISSION: MODEL CASCADING EFFECTS IN YELLOWSTONE\n\n' +
    'Use the Trophic Cascade Simulator to explore what happens when\n' +
    'you remove or add species to the Yellowstone ecosystem.\n\n' +
    'KEY CONCEPTS:\n' +
    '- Trophic Level: Position in the food chain (producer, consumer, etc.)\n' +
    '- Trophic Cascade: When changes at one level ripple through the whole system\n' +
    '- Keystone Species: A species with disproportionate effects on its ecosystem\n\n' +
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
    'KEY INSIGHT: Removing apex predators creates a cascade:\n' +
    '→ Prey populations explode\n' +
    '→ Plants get overgrazed\n' +
    '→ Other species that depend on plants decline\n' +
    '→ Physical environment changes\n\n' +
    'Continue to Station 2: Population Dynamics Analysis'
  );

  // --- SCENARIO 1: WOLF REMOVAL ---
  form.addPageBreakItem()
    .setTitle('Scenario 1: Remove Apex Predator')
    .setHelpText(
      'In the simulator, select "Remove Apex Predator" and run the simulation from 1926.\n' +
      'Watch what happens to each trophic level over time.'
    );

  // Q1: Elk population prediction before (2 pts auto)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('PREDICT: Before running the simulation, what do you think will happen to elk populations when wolves are removed?')
    .setRequired(true);

  q1.setChoices([
    q1.createChoice('Elk populations will increase dramatically (no predators to control them)', true),
    q1.createChoice('Elk populations will decrease (no wolves to protect them)', false),
    q1.createChoice('Elk populations will stay the same (wolves don\'t matter)', false),
    q1.createChoice('Elk populations will go extinct (they need wolves)', false)
  ]);
  q1.setPoints(2);
  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Good prediction! Without predators, prey populations typically explode.')
      .build()
  );
  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Think about predator-prey relationships: if there are no predators, what limits prey populations?')
      .build()
  );

  // Q2: Observation from simulation (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 2: Record Your Observations (4 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '4: Records specific population changes for 3+ species with approximate numbers/percentages\n' +
      '3: Records changes for 2-3 species\n' +
      '2: Records general trends\n' +
      '1: Vague observation\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Run Scenario 1 (Wolf Removal). Record what happens to:\n• Wolves\n• Elk\n• Willows/vegetation\n• Beavers')
    .setHelpText(
      'Sentence starters:\n' +
      '• "Wolves: decreased from ___ to ___" \n' +
      '• "Elk: increased by approximately ___%" \n' +
      '• "Willows: declined because..." \n' +
      '• "Beavers: affected because..."'
    )
    .setRequired(true);

  // Q3: Cascade mechanism (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 3: Explain the Cascade (4 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '4: Traces complete chain: wolves removed → elk increase → overgrazing → vegetation loss → beaver decline → river change\n' +
      '3: Identifies 4-5 links in the chain\n' +
      '2: Identifies 2-3 links\n' +
      '1: Only identifies direct predator-prey effect\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Explain the CHAIN OF EVENTS from wolf removal to river changes. How does each step lead to the next?')
    .setHelpText(
      'Sentence starters:\n' +
      '• "Step 1: When wolves were removed..." \n' +
      '• "Step 2: This caused elk to..." \n' +
      '• "Step 3: Because elk overgrazed, willows..." \n' +
      '• "Step 4: Without willows, beavers..." \n' +
      '• "Step 5: Without beaver dams, rivers..."'
    )
    .setRequired(true);

  // --- SCENARIO 2: OTHER CHANGES ---
  form.addPageBreakItem()
    .setTitle('Scenario 2: Explore Another Change')
    .setHelpText('Reset the simulation and try "Add Invasive Species" OR "Disease in Producers".');

  // Q4: Second scenario observation (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 4: Second Scenario (4 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '4: Describes specific cascade effects from the second scenario with mechanism\n' +
      '3: Describes effects with partial mechanism\n' +
      '2: Describes effects only\n' +
      '1: Vague response\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Which second scenario did you try? What cascade of effects did you observe? How is this SIMILAR to or DIFFERENT from the wolf removal scenario?')
    .setHelpText(
      'Sentence starters:\n' +
      '• "I tried the ___ scenario..." \n' +
      '• "The cascade started at ___ and affected..." \n' +
      '• "This is similar/different because..."'
    )
    .setRequired(true);

  // Q5: Energy transfer (4 pts auto)
  const q5 = form.addMultipleChoiceItem()
    .setTitle('The 10% rule states that only about 10% of energy transfers between trophic levels. Why does this mean apex predators are always rare?')
    .setRequired(true);

  q5.setChoices([
    q5.createChoice('Each level up has less energy available, so fewer organisms can survive there', true),
    q5.createChoice('Apex predators are lazy and don\'t hunt enough', false),
    q5.createChoice('Other animals outcompete apex predators for food', false),
    q5.createChoice('The 10% rule only applies to plants, not animals', false)
  ]);
  q5.setPoints(4);
  q5.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! If only 10% of energy transfers up, the top levels have very little energy to support many organisms.')
      .build()
  );
  q5.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Think about it: If grass has 10,000 units of energy, herbivores get 1,000, carnivores get 100, and apex predators get only 10!')
      .build()
  );

  // Q6: Keystone species (2 pts auto)
  const q6 = form.addMultipleChoiceItem()
    .setTitle('Based on the simulation, why are wolves considered a KEYSTONE species?')
    .setRequired(true);

  q6.setChoices([
    q6.createChoice('They are the largest animal in Yellowstone', false),
    q6.createChoice('They have effects far beyond their numbers - removing them changed the whole ecosystem', true),
    q6.createChoice('They eat more food than any other species', false),
    q6.createChoice('They are the most endangered species in Yellowstone', false)
  ]);
  q6.setPoints(2);
  q6.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Keystone species have disproportionate effects - their impact is much larger than their population size suggests.')
      .build()
  );
  q6.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Keystone species are defined by their EFFECT on the ecosystem, not their size or diet. Small numbers, big impact!')
      .build()
  );

  logFormInfo_(form, 'G7 C8 W1 Station 1', 20);
  return form;
}

// ============================================================================
// STATION 2 - POPULATION DYNAMICS ANALYSIS (20 points, ~15 min)
// Data interpretation and graphing
// ============================================================================

function createG7C8W1Station2_() {
  const form = FormApp.create('G7.C8.W1: Station 2 - Population Dynamics Analysis');

  form.setDescription(
    'YOUR MISSION: ANALYZE REAL YELLOWSTONE POPULATION DATA\n\n' +
    'Scientists have tracked animal populations in Yellowstone for decades.\n' +
    'Use this real data to identify patterns and make predictions.\n\n' +
    '---\n' +
    'Time: About 15 minutes | Points: 20\n' +
    'SPIRAL: Connect to what you learned in Cycle 4 about human impacts!'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Station 2 complete!\n\n' +
    'KEY INSIGHT: Population data tells a story of ecosystem change.\n' +
    'The patterns we see in Yellowstone happen in ecosystems worldwide.\n\n' +
    'Continue to Station 3: Design a Conservation Plan'
  );

  // --- DATA REFERENCE ---
  form.addPageBreakItem()
    .setTitle('Reference: Yellowstone Population Data')
    .setHelpText(
      'YELLOWSTONE POPULATION DATA:\n\n' +
      '┌─────────┬─────────┬─────────┬─────────┬─────────┐\n' +
      '│ Year    │ Wolves  │ Elk     │ Willows │ Beavers │\n' +
      '├─────────┼─────────┼─────────┼─────────┼─────────┤\n' +
      '│ 1920    │ 150     │ 12,000  │ 100%    │ 1,500   │\n' +
      '│ 1926    │ 0       │ 12,000  │ 100%    │ 1,500   │\n' +
      '│ 1950    │ 0       │ 20,000  │ 40%     │ 200     │\n' +
      '│ 1970    │ 0       │ 25,000  │ 20%     │ 50      │\n' +
      '│ 1995    │ 14*     │ 20,000  │ 15%     │ 30      │\n' +
      '│ 2000    │ 120     │ 15,000  │ 25%     │ 100     │\n' +
      '│ 2010    │ 97      │ 6,000   │ 50%     │ 350     │\n' +
      '│ 2020    │ 123     │ 7,500   │ 65%     │ 600     │\n' +
      '└─────────┴─────────┴─────────┴─────────┴─────────┘\n' +
      '* 14 wolves reintroduced in 1995\n\n' +
      'Willows shown as % of 1920 coverage'
    );

  // Q1: Pattern identification (4 pts auto)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('Looking at 1926-1970 (no wolves), what pattern do you see in elk and willow populations?')
    .setRequired(true);

  q1.setChoices([
    q1.createChoice('Both increased together', false),
    q1.createChoice('Both decreased together', false),
    q1.createChoice('Elk increased while willows decreased (inverse relationship)', true),
    q1.createChoice('No clear pattern', false)
  ]);
  q1.setPoints(4);
  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! As elk populations grew without wolf predation, they overgrazed the willows.')
      .build()
  );
  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Compare the columns: Elk went 12,000 → 25,000, Willows went 100% → 20%. One up, one down = inverse!')
      .build()
  );

  // Q2: Data interpretation (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 2: Analyze the 1995-2020 Recovery (4 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '4: Correctly identifies all 4 trends + explains connections between them\n' +
      '3: Identifies 3-4 trends with some connections\n' +
      '2: Identifies 2 trends\n' +
      '1: Identifies 1 trend or vague response\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('After wolves were reintroduced in 1995, describe the TRENDS for each population. How are these changes CONNECTED?')
    .setHelpText(
      'Sentence starters:\n' +
      '• "Wolves: increased from ___ to ___" \n' +
      '• "Elk: changed from ___ to ___ because..." \n' +
      '• "Willows: recovered from ___% to ___% because..." \n' +
      '• "Beavers: increased because..."'
    )
    .setRequired(true);

  // Q3: Rate of change (4 pts auto)
  const q3 = form.addMultipleChoiceItem()
    .setTitle('Calculate: How many years did it take for willow coverage to drop from 100% to 20% (1920-1970)?')
    .setRequired(true);

  q3.setChoices([
    q3.createChoice('25 years', false),
    q3.createChoice('50 years', true),
    q3.createChoice('70 years', false),
    q3.createChoice('100 years', false)
  ]);
  q3.setPoints(4);
  q3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! 1970 - 1920 = 50 years. Destruction happened over 50 years.')
      .build()
  );
  q3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Subtract: 1970 - 1920 = 50 years')
      .build()
  );

  // Q4: SPIRAL - Human impact (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 4: SPIRAL - Cycle 4 Human Impact (4 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '4: Identifies human cause (hunting/removal) + explains cascade + connects to Cycle 4 concepts\n' +
      '3: Identifies human cause and cascade\n' +
      '2: Mentions human impact without mechanism\n' +
      '1: Vague response\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('CYCLE 4 CONNECTION: How did HUMAN decisions cause the ecosystem changes shown in the data? Connect this to what you learned about human impacts in Cycle 4.')
    .setHelpText(
      'Sentence starters:\n' +
      '• "Humans caused this cascade by..." \n' +
      '• "This is similar to Cycle 4 because..." \n' +
      '• "The key lesson is that human actions..."'
    )
    .setRequired(true);

  // Q5: Prediction (4 pts auto)
  const q5 = form.addMultipleChoiceItem()
    .setTitle('Based on the recovery trends, predict what might happen to beaver populations by 2030 if wolves remain stable.')
    .setRequired(true);

  q5.setChoices([
    q5.createChoice('Beavers will likely continue increasing as willows recover', true),
    q5.createChoice('Beavers will decrease because wolves eat them', false),
    q5.createChoice('Beavers will stay exactly at 600', false),
    q5.createChoice('Beavers will go extinct', false)
  ]);
  q5.setPoints(4);
  q5.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Willows are recovering (food source for beavers), so beaver populations should continue increasing.')
      .build()
  );
  q5.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Beavers eat willows and use them for dams. Willows are recovering from 15% → 65%. More food = more beavers!')
      .build()
  );

  logFormInfo_(form, 'G7 C8 W1 Station 2', 20);
  return form;
}

// ============================================================================
// STATION 3 - DESIGN A CONSERVATION PLAN (25 points, ~20 min)
// Engineering design challenge - SEP-7: Engaging in Argument
// ============================================================================

function createG7C8W1Station3_() {
  const form = FormApp.create('G7.C8.W1: Station 3 - Design a Conservation Plan');

  form.setDescription(
    'ENGINEERING CHALLENGE: DESIGN AN ECOSYSTEM INTERVENTION\n\n' +
    'A local prairie ecosystem has lost its keystone species (prairie dogs) due to disease.\n' +
    'You are a conservation scientist tasked with restoring the ecosystem.\n\n' +
    'THE PROBLEM:\n' +
    '• Prairie dogs burrow and aerate soil\n' +
    '• Their burrows provide homes for burrowing owls\n' +
    '• Hawks and coyotes depend on prairie dogs for food\n' +
    '• Without prairie dogs, vegetation is becoming overgrown\n' +
    '• Soil is compacting, affecting water drainage\n\n' +
    '---\n' +
    'Time: About 20 minutes | Points: 25 (highest value!)\n\n' +
    'CONSTRAINTS:\n' +
    '• Budget: $100,000\n' +
    '• Timeline: 5 years\n' +
    '• Must address at least 3 affected species'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Station 3 complete!\n\n' +
    'You\'ve designed a conservation intervention based on trophic cascade principles.\n' +
    'Real conservation scientists use exactly this kind of thinking!\n\n' +
    'Continue to Exit Ticket'
  );

  // --- INTERVENTION OPTIONS ---
  form.addPageBreakItem()
    .setTitle('Available Intervention Options')
    .setHelpText(
      'OPTION A: REINTRODUCE PRAIRIE DOGS\n' +
      '• Cost: $40,000 (capture & relocate from healthy populations)\n' +
      '• Pros: Restores keystone species directly\n' +
      '• Cons: Disease might still be present; takes 3-5 years to establish\n\n' +
      'OPTION B: CREATE ARTIFICIAL BURROWS\n' +
      '• Cost: $25,000 (install 500 artificial burrow systems)\n' +
      '• Pros: Immediate habitat for burrowing owls\n' +
      '• Cons: Doesn\'t address food web; no soil aeration\n\n' +
      'OPTION C: INTRODUCE BLACK-FOOTED FERRETS\n' +
      '• Cost: $60,000 (endangered species program)\n' +
      '• Pros: Ferrets control prairie dog populations naturally\n' +
      '• Cons: Requires existing prairie dogs; very expensive\n\n' +
      'OPTION D: CONTROLLED GRAZING\n' +
      '• Cost: $15,000/year (manage cattle/bison grazing)\n' +
      '• Pros: Mimics prairie dog effect on vegetation\n' +
      '• Cons: Doesn\'t provide burrows or food for predators\n\n' +
      'OPTION E: DISEASE VACCINATION PROGRAM\n' +
      '• Cost: $30,000 (develop and distribute vaccines)\n' +
      '• Pros: Protects reintroduced prairie dogs\n' +
      '• Cons: Only useful with Option A'
    );

  // Q1: Identify keystone role (5 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 1: Analyze the Keystone Species (5 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '5: Identifies 4+ ecosystem services provided by prairie dogs with specific connections to other species\n' +
      '4: Identifies 3 services with connections\n' +
      '3: Identifies 2-3 services\n' +
      '2: Identifies 1 service\n' +
      '1: Vague response\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Explain WHY prairie dogs are a keystone species in this ecosystem. What specific services do they provide? How do other species depend on them?')
    .setHelpText(
      'Sentence starters:\n' +
      '• "Prairie dogs are keystone because they provide..." \n' +
      '• "Burrowing owls depend on them because..." \n' +
      '• "Hawks and coyotes need them because..." \n' +
      '• "The soil benefits from prairie dogs because..."'
    )
    .setRequired(true);

  // Q2: Design intervention (7 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 2: Design Your Intervention (7 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '7: Comprehensive plan using 2+ options strategically, within budget, with clear timeline and rationale\n' +
      '5-6: Good combination addressing multiple issues\n' +
      '3-4: Single approach with some justification\n' +
      '1-2: Basic response without clear plan\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Design your ecosystem intervention plan. Specify:\n• Which options you will use\n• Your total cost (must be ≤$100,000)\n• Your timeline (within 5 years)\n• WHY you chose this combination')
    .setHelpText(
      'Sentence starters:\n' +
      '• "My plan includes Option ___ and Option ___ because..." \n' +
      '• "The total cost is $_____, which is under budget because..." \n' +
      '• "In Year 1, we will... In Year 2..." \n' +
      '• "I prioritized ___ over ___ because..."'
    )
    .setRequired(true);

  // Q3: Predict cascade effects (5 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 3: Predict the Cascade (5 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '5: Traces cascade effects for 3+ species with timeline and mechanism\n' +
      '4: Traces effects for 2-3 species with mechanism\n' +
      '3: Mentions effects without mechanism\n' +
      '2: Vague prediction\n' +
      '1: Incorrect prediction\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Predict the CASCADE of effects your intervention will cause. How will each species respond over the 5-year timeline?')
    .setHelpText(
      'Sentence starters:\n' +
      '• "Year 1-2: Prairie dogs will..." \n' +
      '• "Year 2-3: As prairie dogs establish, hawks will..." \n' +
      '• "Year 3-5: Burrowing owls will... because..." \n' +
      '• "The soil will... leading to..."'
    )
    .setRequired(true);

  // Q4: Trade-offs and limitations (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 4: Acknowledge Trade-offs (4 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '4: Identifies 2+ specific limitations and explains trade-offs made\n' +
      '3: Identifies limitations with partial explanation\n' +
      '2: Mentions limitations without trade-off analysis\n' +
      '1: Vague awareness\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('What are the LIMITATIONS of your plan? What TRADE-OFFS did you make? What could go wrong?')
    .setHelpText(
      'Sentence starters:\n' +
      '• "One limitation is ___ because..." \n' +
      '• "I traded ___ for ___ because..." \n' +
      '• "A risk is that ___, which I would address by..."'
    )
    .setRequired(true);

  // Q5: SEP-7 Argumentation (4 pts auto)
  const q5 = form.addMultipleChoiceItem()
    .setTitle('SEP-7: A rancher argues "Prairie dogs are pests that compete with cattle for grass. We should NOT reintroduce them." How would you respond using ecosystem evidence?')
    .setRequired(true);

  q5.setChoices([
    q5.createChoice('Prairie dogs actually improve grassland health - their burrowing aerates soil and their grazing stimulates new growth', true),
    q5.createChoice('The rancher is completely right - prairie dogs should stay extinct', false),
    q5.createChoice('Cattle are more important than ecosystems', false),
    q5.createChoice('There is no way to respond to this argument', false)
  ]);
  q5.setPoints(4);
  q5.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Research shows prairie dogs actually improve grassland health, benefiting cattle in the long run.')
      .build()
  );
  q5.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Use evidence! Prairie dogs aerate soil, stimulate plant growth, and create biodiversity. Long-term ecosystem health benefits everyone.')
      .build()
  );

  logFormInfo_(form, 'G7 C8 W1 Station 3', 25);
  return form;
}

// ============================================================================
// EXIT TICKET - ECOSYSTEM DYNAMICS INTEGRATION (23 points, ~15 min)
// 2 NEW + 2 SPIRAL + 1 INTEGRATION + 1 SEP
// ============================================================================

function createG7C8W1ExitTicket_() {
  const form = FormApp.create('G7.C8.W1: Exit Ticket - Ecosystem Dynamics Integration');

  form.setDescription(
    'EXIT TICKET: SHOW WHAT YOU LEARNED\n\n' +
    'This tests whether you can explain trophic cascades and predict ecosystem changes.\n\n' +
    '---\n' +
    'Time: About 15 minutes | Points: 23\n\n' +
    'QUESTION TYPES:\n' +
    '- 2 NEW questions (trophic cascades, keystone species)\n' +
    '- 2 SPIRAL questions (Cycle 7 - geologic time; Cycle 4 - human impact)\n' +
    '- 1 INTEGRATION question (connects all concepts)\n' +
    '- 1 SEP-7 question (engaging in argument from evidence)'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'WEEK 1 COMPLETE! Great work!\n\n' +
    'You learned how changes to one species cascade through entire ecosystems.\n\n' +
    'Key takeaways:\n' +
    '• Trophic cascades connect predators to plants to geography\n' +
    '• Keystone species have effects far beyond their numbers\n' +
    '• Human actions can trigger or reverse cascades\n' +
    '• Ecosystem restoration requires understanding connections\n\n' +
    'NEXT WEEK: How does biodiversity affect ecosystem resilience?'
  );

  // --- NEW CONTENT ---
  form.addPageBreakItem()
    .setTitle('NEW CONTENT (Questions 1 & 2)')
    .setHelpText('These test what you learned TODAY about trophic cascades.');

  // Q1: NEW - Define trophic cascade (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 1: NEW - Explain Trophic Cascades (4 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '4: Complete definition + Yellowstone example with mechanism\n' +
      '3: Good definition with example\n' +
      '2: Partial definition\n' +
      '1: Vague or incorrect\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Define "trophic cascade" in your own words and give ONE specific example from Yellowstone.')
    .setHelpText(
      'Sentence starters:\n' +
      '• "A trophic cascade is when..." \n' +
      '• "For example, in Yellowstone..." \n' +
      '• "The cascade went from ___ to ___ to ___ because..."'
    )
    .setRequired(true);

  // Q2: NEW - Keystone species (4 pts auto)
  const q2 = form.addMultipleChoiceItem()
    .setTitle('What makes a species a "keystone" species?')
    .setRequired(true);

  q2.setChoices([
    q2.createChoice('They have disproportionately large effects on their ecosystem relative to their numbers', true),
    q2.createChoice('They are the largest species in the ecosystem', false),
    q2.createChoice('They are the most numerous species in the ecosystem', false),
    q2.createChoice('They are shaped like a keystone', false)
  ]);
  q2.setPoints(4);
  q2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Keystone species have impacts much larger than their population size would suggest - like wolves in Yellowstone.')
      .build()
  );
  q2.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Keystone species are defined by their EFFECT, not size or number. A keystone in an arch is small but holds everything together!')
      .build()
  );

  // --- SPIRAL CONTENT ---
  form.addPageBreakItem()
    .setTitle('SPIRAL CONTENT (Questions 3 & 4)')
    .setHelpText('These review concepts from previous cycles.');

  // Q3: SPIRAL - Geologic time (4 pts auto)
  const q3 = form.addMultipleChoiceItem()
    .setTitle('CYCLE 7 REVIEW: After the mass extinction that killed the dinosaurs, how long did it take for biodiversity to recover?')
    .setRequired(true);

  q3.setChoices([
    q3.createChoice('A few weeks', false),
    q3.createChoice('About 100 years', false),
    q3.createChoice('About 10,000 years', false),
    q3.createChoice('Millions of years', true)
  ]);
  q3.setPoints(4);
  q3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Major ecosystem disruptions take millions of years to fully recover. Yellowstone recovered faster because wolves were only gone 70 years.')
      .build()
  );
  q3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Review Cycle 7: Mass extinctions have lasting effects. The dinosaur extinction was 66 million years ago, and mammals took millions of years to diversify.')
      .build()
  );

  // Q4: SPIRAL - Human impact (4 pts auto)
  const q4 = form.addMultipleChoiceItem()
    .setTitle('CYCLE 4 REVIEW: Which human activity has the GREATEST direct impact on ecosystems?')
    .setRequired(true);

  q4.setChoices([
    q4.createChoice('Habitat destruction and fragmentation', true),
    q4.createChoice('Using paper products', false),
    q4.createChoice('Driving electric cars', false),
    q4.createChoice('Recycling plastic', false)
  ]);
  q4.setPoints(4);
  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Habitat destruction is the #1 cause of biodiversity loss. Removing species (like wolves from Yellowstone) triggers cascading effects.')
      .build()
  );
  q4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Review Cycle 4: Habitat destruction (deforestation, development, etc.) directly removes species and triggers cascade effects.')
      .build()
  );

  // --- INTEGRATION ---
  form.addPageBreakItem()
    .setTitle('INTEGRATION (Question 5)')
    .setHelpText('This requires knowledge from BOTH previous cycles AND this week.');

  // Q5: Integration (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 5: INTEGRATION (4 points)')
    .setHelpText(
      '3D ASSESSMENT RUBRIC:\n' +
      '4: Connects geologic timescales + human impact + trophic cascades with mechanism\n' +
      '   SEP-6: Constructs explanation\n' +
      '   DCI: Applies LS2.C correctly\n' +
      '   CCC-7: Uses stability and change\n' +
      '3: Connects 2 concepts well\n' +
      '2: Basic connection\n' +
      '1: Vague response\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Explain why Yellowstone recovered in 25 years after wolf reintroduction, but mass extinctions take MILLIONS of years to recover. What\'s different about human-caused vs. natural ecosystem disruptions?')
    .setHelpText(
      'Sentence starters:\n' +
      '• "Yellowstone recovered quickly because..." \n' +
      '• "Mass extinctions take longer because..." \n' +
      '• "The key difference is..."'
    )
    .setRequired(true);

  // --- SEP-7: ENGAGING IN ARGUMENT ---
  form.addPageBreakItem()
    .setTitle('SEP-7: Engage in Argument (Question 6)')
    .setHelpText(
      'NGSS Practice: Engaging in Argument from Evidence\n' +
      'Good scientists support claims with evidence and reasoning!'
    );

  form.addSectionHeaderItem()
    .setTitle('Question 6: Argue from Evidence (3 points)')
    .setHelpText(
      'RUBRIC - SEP-7: Engaging in Argument\n' +
      '3 pts: Clear claim + specific evidence from lesson + sound reasoning\n' +
      '2 pts: Claim and evidence but weak reasoning\n' +
      '1 pt: Claim only or vague response\n' +
      '0 pts: No response'
    );

  form.addParagraphTextItem()
    .setTitle('A classmate claims: "It doesn\'t matter if we lose some species - nature will figure it out."\n\nConstruct an ARGUMENT to respond using evidence from today\'s lesson:\n• CLAIM: Do you agree or disagree?\n• EVIDENCE: Cite specific examples from Yellowstone\n• REASONING: Explain WHY losing species matters')
    .setHelpText(
      'Sentence starters:\n' +
      '• "CLAIM: I disagree because..." \n' +
      '• "EVIDENCE: In Yellowstone, when wolves were removed..." \n' +
      '• "REASONING: This shows that losing species matters because..."'
    )
    .setRequired(true);

  logFormInfo_(form, 'G7 C8 W1 Exit Ticket', 23);
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
function testG7C8W1Hook() { createG7C8W1Hook_(); }
function testG7C8W1Station1() { createG7C8W1Station1_(); }
function testG7C8W1Station2() { createG7C8W1Station2_(); }
function testG7C8W1Station3() { createG7C8W1Station3_(); }
function testG7C8W1ExitTicket() { createG7C8W1ExitTicket_(); }
