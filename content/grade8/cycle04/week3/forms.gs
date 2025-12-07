/**
 * ============================================================================
 * GRADE 8 - CYCLE 4 WEEK 3: SYNTHESIS & ASSESSMENT
 * 3 Forms | 100 Points Total | ~75 Minutes
 * ============================================================================
 *
 * ASSESSMENT WEEK STRUCTURE:
 *   Part 1: Synthesis Review (20 pts, ~15 min) - Connects W1+W2 concepts
 *   Part 2: Cumulative Assessment (60 pts, ~40 min) - All learning targets
 *   Part 3: Misconception Final Check (20 pts, ~20 min) - Targeted remediation
 *
 * LEARNING TARGETS ASSESSED (from W1 & W2):
 *   W1-1: Trace energy flow through trophic levels
 *   W1-2: Apply the 10% rule to calculate energy transfer
 *   W1-3: Calculate and compare biomass at different levels
 *   W1-4: Design a sustainable food production system
 *   W2-1: Explain how invasive species disrupt energy flow
 *   W2-2: Model cascade effects of species removal or addition
 *   W2-3: Analyze invasive species case studies
 *   W2-4: Design and evaluate intervention strategies
 *
 * SPIRAL FROM CYCLE 3:
 *   MS-LS4-4: Natural selection and adaptation
 *
 * MISCONCEPTIONS TARGETED:
 *   1. "Energy is recycled like matter" (W1)
 *   2. "Ecosystems are always stable" (W2)
 *   3. "Energy pyramids are always stable" (W1/W2)
 *
 * ============================================================================
 */

// ============================================================================
// MAIN FUNCTION
// ============================================================================

function createAllG8C4W3Forms() {
  Logger.log('================================================');
  Logger.log('G8 CYCLE 4 WEEK 3: SYNTHESIS & ASSESSMENT');
  Logger.log('================================================\n');

  const forms = {
    synthesis: createG8C4W3Synthesis_(),
    assessment: createG8C4W3Assessment_(),
    misconceptionCheck: createG8C4W3MisconceptionCheck_()
  };

  Logger.log('\n================================================');
  Logger.log('ALL 3 FORMS CREATED - 100 POINTS TOTAL');
  Logger.log('================================================');

  return forms;
}

// ============================================================================
// PART 1: SYNTHESIS REVIEW (20 points, ~15 min)
// ============================================================================

function createG8C4W3Synthesis_() {
  const form = FormApp.create('G8.C4.W3: Part 1 - Synthesis Review');

  form.setDescription(
    'CYCLE 4 SYNTHESIS: ECOSYSTEMS & ENERGY TRANSFER\n\n' +
    'Over the past two weeks, you learned:\n' +
    '- Week 1: Energy pyramids and the 10% rule\n' +
    '- Week 2: Ecosystem disruption and invasive species\n\n' +
    'Both explain how energy flows and what happens when it\'s disrupted.\n' +
    'Now connect these ideas into a complete picture.\n\n' +
    '---\n' +
    'Time: About 15 minutes | Points: 20'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Synthesis Review complete! Take a 5-minute break, then continue to Part 2.'
  );

  // --- COMPARISON ---
  form.addPageBreakItem()
    .setTitle('Connecting Energy Flow and Disruption')
    .setHelpText('Both weeks are about how energy moves through ecosystems.');

  // Q1: Core connection (4 pts)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('The 10% rule (Week 1) helps explain why invasive species (Week 2) are so damaging. Which connection is correct?')
    .setRequired(true);

  q1.setChoices([
    q1.createChoice('Limited energy at each level means losing one species can cascade through the whole system', true),
    q1.createChoice('The 10% rule only applies to plants, not invasive species', false),
    q1.createChoice('Invasive species create more energy in ecosystems', false),
    q1.createChoice('Energy pyramids are unrelated to invasive species', false)
  ]);
  q1.setPoints(4);

  // Q2: Cascade synthesis (4 pts manual)
  const q2 = form.addParagraphTextItem()
    .setTitle('Explain how the 10% rule makes trophic cascades MORE severe. Why does losing a top predator have such big effects?')
    .setHelpText('Think about: How much energy does each level have? What happens when that limited energy is no longer regulated?')
    .setRequired(true);

  // Q3: Keystone connection (4 pts)
  const q3 = form.addMultipleChoiceItem()
    .setTitle('INTEGRATION: Wolves are a keystone species. Using the 10% rule, explain why their absence caused willows to disappear:')
    .setRequired(true);

  q3.setChoices([
    q3.createChoice('Without wolves (limited energy apex), elk (more energy) overpopulated and ate all willows', true),
    q3.createChoice('Wolves ate all the willows', false),
    q3.createChoice('Willows can\'t survive without wolves', false),
    q3.createChoice('The 10% rule doesn\'t apply to this situation', false)
  ]);
  q3.setPoints(4);

  // Q4: Design synthesis (4 pts manual)
  const q4 = form.addParagraphTextItem()
    .setTitle('You designed a sustainable farm (Week 1) and an invasive species intervention (Week 2). What do good designs in BOTH cases have in common?')
    .setHelpText('Think about: Do they consider trade-offs? Do they work with energy flow or against it?')
    .setRequired(true);

  // Q5: Real-world integration (4 pts manual)
  const q5 = form.addParagraphTextItem()
    .setTitle('A farmer wants to introduce a non-native species to control pests. Using BOTH energy pyramid concepts AND invasive species knowledge, what advice would you give?')
    .setHelpText('Consider: Where does the new species fit in the energy pyramid? What could go wrong?')
    .setRequired(true);

  Logger.log('Part 1 created: Synthesis Review (20 pts)');
  return form;
}

// ============================================================================
// PART 2: CUMULATIVE ASSESSMENT (60 points, ~40 min)
// ============================================================================

function createG8C4W3Assessment_() {
  const form = FormApp.create('G8.C4.W3: Part 2 - Cumulative Assessment');

  form.setDescription(
    'CYCLE 4 CUMULATIVE ASSESSMENT\n\n' +
    'This assessment covers all learning targets from Weeks 1 and 2.\n\n' +
    'Sections:\n' +
    'A: Energy Pyramids & 10% Rule (15 pts)\n' +
    'B: Ecosystem Disruption (15 pts)\n' +
    'C: Data Analysis (15 pts)\n' +
    'D: Engineering Design (15 pts)\n\n' +
    '---\n' +
    'Time: About 40 minutes | Points: 60\n' +
    'Read each question carefully. Show your best scientific thinking!'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Assessment complete! After a short break, complete Part 3: Misconception Check.'
  );

  // --- SECTION A: ENERGY PYRAMIDS (15 pts) ---
  form.addPageBreakItem()
    .setTitle('Section A: Energy Pyramids & 10% Rule')
    .setHelpText('Questions about Week 1 content.');

  // A1: 10% rule calculation (4 pts)
  const a1 = form.addMultipleChoiceItem()
    .setTitle('An ecosystem has 500,000 kcal of energy at the producer level. How much energy is available to a tertiary consumer (4th trophic level)?')
    .setRequired(true);

  a1.setChoices([
    a1.createChoice('50 kcal (500,000 × 0.1 × 0.1 × 0.1)', true),
    a1.createChoice('500 kcal', false),
    a1.createChoice('5,000 kcal', false),
    a1.createChoice('50,000 kcal', false)
  ]);
  a1.setPoints(4);
  a1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Apply 10% three times: 500,000 → 50,000 → 5,000 → 500 → 50 kcal at level 4.')
      .build()
  );
  a1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Count the energy transfers: Producer → Primary → Secondary → Tertiary = 3 transfers. Multiply by 0.10 three times.')
      .build()
  );

  // A2: Energy loss explanation (5 pts manual)
  const a2 = form.addParagraphTextItem()
    .setTitle('Explain where the 90% of energy goes at each trophic level. List at least 3 specific destinations.')
    .setRequired(true);

  // A3: Pyramid shape (3 pts)
  const a3 = form.addMultipleChoiceItem()
    .setTitle('Why are energy pyramids always wider at the bottom and narrower at the top?')
    .setRequired(true);

  a3.setChoices([
    a3.createChoice('Each level has less energy to support organisms, so fewer individuals can survive', true),
    a3.createChoice('Predators are always larger than prey', false),
    a3.createChoice('Plants reproduce faster than animals', false),
    a3.createChoice('It\'s just coincidence', false)
  ]);
  a3.setPoints(3);

  // A4: Spiral - Cycle 3 (3 pts)
  const a4 = form.addMultipleChoiceItem()
    .setTitle('CYCLE 3 CONNECTION: Limited energy at higher trophic levels creates selection pressure for:')
    .setRequired(true);

  a4.setChoices([
    a4.createChoice('Efficient hunting/foraging behaviors that minimize energy waste', true),
    a4.createChoice('Larger body size regardless of energy cost', false),
    a4.createChoice('Brighter colors to attract mates', false),
    a4.createChoice('Nothing - natural selection doesn\'t affect energy use', false)
  ]);
  a4.setPoints(3);

  // --- SECTION B: ECOSYSTEM DISRUPTION (15 pts) ---
  form.addPageBreakItem()
    .setTitle('Section B: Ecosystem Disruption')
    .setHelpText('Questions about Week 2 content.');

  // B1: Trophic cascade (4 pts)
  const b1 = form.addMultipleChoiceItem()
    .setTitle('When wolves were removed from Yellowstone, what happened in sequence?')
    .setRequired(true);

  b1.setChoices([
    b1.createChoice('Elk increased → Willows overgrazed → Beavers declined → River banks eroded', true),
    b1.createChoice('Elk decreased → Willows grew → Beavers increased → Rivers flooded', false),
    b1.createChoice('Nothing changed because ecosystems are stable', false),
    b1.createChoice('Wolves ate all the willows before leaving', false)
  ]);
  b1.setPoints(4);

  // B2: Invasive success (3 pts)
  const b2 = form.addMultipleChoiceItem()
    .setTitle('Invasive species often outcompete natives because:')
    .setRequired(true);

  b2.setChoices([
    b2.createChoice('They have no natural predators and natives haven\'t evolved defenses', true),
    b2.createChoice('They are always stronger', false),
    b2.createChoice('They can create their own energy', false),
    b2.createChoice('Native species choose to leave', false)
  ]);
  b2.setPoints(3);

  // B3: Island vulnerability (4 pts)
  const b3 = form.addMultipleChoiceItem()
    .setTitle('Why are island ecosystems especially vulnerable to invasive predators?')
    .setRequired(true);

  b3.setChoices([
    b3.createChoice('Island species evolved without predators, so never developed anti-predator adaptations', true),
    b3.createChoice('Islands have less food', false),
    b3.createChoice('Island animals are genetically weaker', false),
    b3.createChoice('Invasive species are attracted to islands', false)
  ]);
  b3.setPoints(4);

  // B4: Keystone explanation (4 pts manual)
  const b4 = form.addParagraphTextItem()
    .setTitle('Explain what makes a species a "keystone species" and why their removal causes such large effects.')
    .setRequired(true);

  // --- SECTION C: DATA ANALYSIS (15 pts) ---
  form.addPageBreakItem()
    .setTitle('Section C: Data Analysis')
    .setHelpText('Apply your skills to interpret data.');

  // C1: Zebra mussel interpretation (5 pts manual)
  const c1 = form.addParagraphTextItem()
    .setTitle('Zebra mussels filter-feed on plankton. As their population grew from 0 to 150,000 per m², native fish declined from 100% to 35%. Explain the cause-effect relationship using energy flow concepts.')
    .setHelpText('Think about: What were both species eating? Where in the energy pyramid is the competition?')
    .setRequired(true);

  // C2: Correlation type (5 pts)
  const c2 = form.addMultipleChoiceItem()
    .setTitle('The relationship between zebra mussel population and native fish population is:')
    .setRequired(true);

  c2.setChoices([
    c2.createChoice('Negative correlation - as mussels increased, fish decreased', true),
    c2.createChoice('Positive correlation - both increased together', false),
    c2.createChoice('No correlation - they are unrelated', false),
    c2.createChoice('Inverse proportion - they switched places', false)
  ]);
  c2.setPoints(5);

  // C3: Prediction (5 pts manual)
  const c3 = form.addParagraphTextItem()
    .setTitle('If we successfully remove 50% of zebra mussels from the Great Lakes, predict what will happen to native fish populations over 5 years. Explain your reasoning using energy flow.')
    .setRequired(true);

  // --- SECTION D: ENGINEERING DESIGN (15 pts) ---
  form.addPageBreakItem()
    .setTitle('Section D: Engineering Design')
    .setHelpText('Apply scientific principles to design solutions.');

  // D1: Farm efficiency (5 pts)
  const d1 = form.addMultipleChoiceItem()
    .setTitle('To feed the most people with limited land, the MOST efficient approach is:')
    .setRequired(true);

  d1.setChoices([
    d1.createChoice('Grow mostly crops (100% energy capture) with some efficient animals (poultry, fish)', true),
    d1.createChoice('Raise only cattle (most protein)', false),
    d1.createChoice('Feed crops to cattle, then eat the cattle', false),
    d1.createChoice('Import all food from other countries', false)
  ]);
  d1.setPoints(5);

  // D2: Intervention evaluation (5 pts auto)
  const d2 = form.addCheckboxItem()
    .setTitle('Which interventions for invasive species are LEAST likely to cause new problems? SELECT ALL THAT APPLY.')
    .setRequired(true);

  d2.setChoices([
    d2.createChoice('Physical removal (trapping)', true),
    d2.createChoice('Barrier fencing to prevent spread', true),
    d2.createChoice('Introducing a predator from another continent', false),
    d2.createChoice('Using pesticides that kill all similar species', false),
    d2.createChoice('Public education to prevent new introductions', true)
  ]);
  d2.setPoints(5);

  // D3: Trade-off analysis (5 pts manual)
  const d3 = form.addParagraphTextItem()
    .setTitle('A town wants to use biological control (introducing a predator) to control an invasive pest. What specific questions should they ask before proceeding?')
    .setHelpText('Think about: What could go wrong? What information is needed?')
    .setRequired(true);

  Logger.log('Part 2 created: Cumulative Assessment (60 pts)');
  return form;
}

// ============================================================================
// PART 3: MISCONCEPTION CHECK (20 points, ~20 min)
// ============================================================================

function createG8C4W3MisconceptionCheck_() {
  const form = FormApp.create('G8.C4.W3: Part 3 - Misconception Check');

  form.setDescription(
    'MISCONCEPTION FINAL CHECK\n\n' +
    'This section targets common misconceptions from Cycle 4.\n' +
    'These are the ideas students often get wrong on the first try.\n\n' +
    'Take your time. Think carefully before answering.\n\n' +
    '---\n' +
    'Time: About 20 minutes | Points: 20'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Cycle 4 Assessment Complete!\n\n' +
    'Great work this cycle. You learned about energy flow in ecosystems\n' +
    'and what happens when that flow is disrupted.\n\n' +
    'Next cycle: We\'ll explore new connections between energy and life!'
  );

  // --- MISCONCEPTION 1: Energy recycling ---
  form.addPageBreakItem()
    .setTitle('Check Your Understanding: Energy in Ecosystems')
    .setHelpText('This targets a common misconception about energy flow.');

  const m1 = form.addMultipleChoiceItem()
    .setTitle('MISCONCEPTION CHECK: "Energy is recycled in ecosystems just like matter (carbon, nitrogen) is recycled." Is this TRUE or FALSE?')
    .setRequired(true);

  m1.setChoices([
    m1.createChoice('TRUE - energy is recycled from decomposers back to producers', false),
    m1.createChoice('FALSE - energy flows through ecosystems and is lost as heat; only matter is recycled', true)
  ]);
  m1.setPoints(4);
  m1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! This is a crucial distinction. Energy flows ONE WAY (sunlight → producers → consumers → heat lost). Only MATTER cycles (carbon cycle, nitrogen cycle). New energy must constantly enter from the sun.')
      .build()
  );
  m1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('This is a very common misconception! Energy is NOT recycled. It enters as sunlight, flows through organisms, and exits as heat. Only matter (atoms) is recycled. That\'s why ecosystems constantly need sunlight.')
      .build()
  );

  const m1_explain = form.addParagraphTextItem()
    .setTitle('Explain the difference between how ENERGY moves through an ecosystem vs. how MATTER (like carbon) moves.')
    .setRequired(true);

  // --- MISCONCEPTION 2: Ecosystem stability ---
  form.addPageBreakItem()
    .setTitle('Check Your Understanding: Ecosystem Stability')
    .setHelpText('Another common misconception.');

  const m2 = form.addMultipleChoiceItem()
    .setTitle('MISCONCEPTION CHECK: "Ecosystems are naturally balanced and will always return to normal after a disturbance." Is this TRUE or FALSE?')
    .setRequired(true);

  m2.setChoices([
    m2.createChoice('TRUE - nature always balances itself', false),
    m2.createChoice('FALSE - ecosystems can be permanently disrupted, especially by invasive species', true)
  ]);
  m2.setPoints(4);
  m2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! While some ecosystems can recover from small disturbances, major disruptions (especially invasive species) can permanently alter ecosystems. Guam\'s birds will never return without intervention.')
      .build()
  );

  const m2_explain = form.addParagraphTextItem()
    .setTitle('Give a specific example of an ecosystem that was permanently changed and explain why it can\'t "return to normal."')
    .setRequired(true);

  // --- MISCONCEPTION 3: Removal effects ---
  form.addPageBreakItem()
    .setTitle('Check Your Understanding: Species Removal')
    .setHelpText('Common confusion about ecosystem connections.');

  const m3 = form.addMultipleChoiceItem()
    .setTitle('MISCONCEPTION CHECK: "Removing one species only affects species that directly eat or are eaten by it." Is this TRUE or FALSE?')
    .setRequired(true);

  m3.setChoices([
    m3.createChoice('TRUE - effects are limited to direct connections', false),
    m3.createChoice('FALSE - trophic cascades can affect species many levels away', true)
  ]);
  m3.setPoints(4);
  m3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Removing wolves affected willows, beavers, songbirds, and even river shapes—species with no direct connection to wolves. Ecosystems are deeply interconnected.')
      .build()
  );

  const m3_explain = form.addParagraphTextItem()
    .setTitle('Explain how removing wolves affected beavers, even though wolves don\'t eat beavers and beavers don\'t eat wolves.')
    .setRequired(true);

  // --- SPIRAL MISCONCEPTION ---
  form.addPageBreakItem()
    .setTitle('Cycle 3 Spiral Check')
    .setHelpText('Checking retention of previous cycle concepts.');

  const spiral = form.addMultipleChoiceItem()
    .setTitle('CYCLE 3 SPIRAL: Why do island species (like Guam\'s birds) lack defenses against predators?')
    .setRequired(true);

  spiral.setChoices([
    spiral.createChoice('Natural selection only creates adaptations to existing threats - no predators meant no anti-predator adaptations evolved', true),
    spiral.createChoice('Island animals are genetically inferior', false),
    spiral.createChoice('Islands don\'t have enough energy for defense adaptations', false),
    spiral.createChoice('Island animals chose not to develop defenses', false)
  ]);
  spiral.setPoints(4);

  Logger.log('Part 3 created: Misconception Check (20 pts)');
  return form;
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function getG8C4W3FormUrls() {
  const forms = createAllG8C4W3Forms();
  Logger.log('\n=== FORM URLS ===');
  Object.entries(forms).forEach(([name, form]) => {
    Logger.log(name + ': ' + form.getPublishedUrl());
  });
}
