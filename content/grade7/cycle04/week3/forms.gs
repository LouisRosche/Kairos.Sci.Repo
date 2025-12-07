/**
 * ============================================================================
 * GRADE 7 - CYCLE 4 WEEK 3: SYNTHESIS & ASSESSMENT
 * 3 Forms | 100 Points Total | ~75 Minutes
 * ============================================================================
 *
 * ASSESSMENT WEEK STRUCTURE:
 *   Part 1: Synthesis Review (20 pts, ~15 min) - Connects W1+W2 concepts
 *   Part 2: Cumulative Assessment (60 pts, ~40 min) - All learning targets
 *   Part 3: Misconception Final Check (20 pts, ~20 min) - Targeted remediation
 *
 * LEARNING TARGETS ASSESSED (from W1 & W2):
 *   W1-1: Explain how CO2 dissolution causes ocean acidification
 *   W1-2: Interpret pH data and predict effects on marine life
 *   W1-3: Apply mass balance to ocean-atmosphere carbon exchange
 *   W1-4: Design a monitoring system for ocean acidification
 *   W2-1: Trace nitrogen and phosphorus through ecosystems
 *   W2-2: Explain the eutrophication cascade
 *   W2-3: Analyze Gulf of Mexico dead zone data
 *   W2-4: Design solutions to minimize nutrient runoff
 *
 * SPIRAL FROM CYCLE 3:
 *   MS-ESS3-5: Climate change factors, feedback loops
 *
 * MISCONCEPTIONS TARGETED:
 *   1. "Ocean acidification is only from CO2" (W1)
 *   2. "More nutrients are always better" (W2)
 *   3. "Dead zones are permanent" (W2)
 *
 * ============================================================================
 */

// ============================================================================
// MAIN FUNCTION
// ============================================================================

function createAllG7C4W3Forms() {
  Logger.log('================================================');
  Logger.log('G7 CYCLE 4 WEEK 3: SYNTHESIS & ASSESSMENT');
  Logger.log('================================================\n');

  const forms = {
    synthesis: createG7C4W3Synthesis_(),
    assessment: createG7C4W3Assessment_(),
    misconceptionCheck: createG7C4W3MisconceptionCheck_()
  };

  Logger.log('\n================================================');
  Logger.log('ALL 3 FORMS CREATED - 100 POINTS TOTAL');
  Logger.log('================================================');

  return forms;
}

// ============================================================================
// PART 1: SYNTHESIS REVIEW (20 points, ~15 min)
// ============================================================================

function createG7C4W3Synthesis_() {
  const form = FormApp.create('G7.C4.W3: Part 1 - Synthesis Review');

  form.setDescription(
    'CYCLE 4 SYNTHESIS: CONNECTING HUMAN IMPACTS\n\n' +
    'Over the past two weeks, you learned:\n' +
    '- Week 1: Ocean acidification from CO2 dissolving in seawater\n' +
    '- Week 2: Eutrophication from nutrient runoff creating dead zones\n\n' +
    'Both are examples of how human activities disrupt Earth systems.\n' +
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
    .setTitle('Comparing Two Human Impacts')
    .setHelpText('Both problems involve humans adding chemicals to water systems.');

  // Q1: Input comparison (4 pts)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('Complete this comparison:\n\nOcean Acidification is caused by _____ entering the ocean.\nEutrophication is caused by _____ entering waterways.')
    .setRequired(true);

  q1.setChoices([
    q1.createChoice('Carbon dioxide (CO2) | Nitrogen and phosphorus (N, P)', true),
    q1.createChoice('Nitrogen and phosphorus | Carbon dioxide', false),
    q1.createChoice('Oxygen | Carbon dioxide', false),
    q1.createChoice('Salt | Oxygen', false)
  ]);
  q1.setPoints(4);

  // Q2: Cascade similarity (4 pts manual)
  const q2 = form.addParagraphTextItem()
    .setTitle('Both ocean acidification and eutrophication involve a CASCADE of effects. Describe one similarity in HOW the cascade works for both problems.')
    .setHelpText('Think about: initial input -> chain of effects -> harm to organisms')
    .setRequired(true);

  // Q3: Feedback loop connection (4 pts)
  const q3 = form.addMultipleChoiceItem()
    .setTitle('SPIRAL (Cycle 3): Both processes can involve positive feedback loops. Which statement is correct?')
    .setRequired(true);

  q3.setChoices([
    q3.createChoice('Both problems can make themselves worse over time without intervention', true),
    q3.createChoice('Both problems automatically fix themselves over time', false),
    q3.createChoice('Only ocean acidification involves feedback loops', false),
    q3.createChoice('Neither involves feedback loops', false)
  ]);
  q3.setPoints(4);

  // Q4: Solution comparison (4 pts manual)
  const q4 = form.addParagraphTextItem()
    .setTitle('You designed solutions for both problems (monitoring for W1, remediation for W2). What do effective solutions have in COMMON?')
    .setHelpText('Think about: Do they address the source or the symptom? Do they require behavior change?')
    .setRequired(true);

  // Q5: Integration question (4 pts manual)
  const q5 = form.addParagraphTextItem()
    .setTitle('A coastal bay experiences BOTH ocean acidification AND eutrophication. Explain how organisms in this bay face a "double threat" - how might the two problems interact?')
    .setHelpText('Consider: What does each problem do to the water? How might combined effects be worse than either alone?')
    .setRequired(true);

  Logger.log('Part 1 created: Synthesis Review (20 pts)');
  return form;
}

// ============================================================================
// PART 2: CUMULATIVE ASSESSMENT (60 points, ~40 min)
// ============================================================================

function createG7C4W3Assessment_() {
  const form = FormApp.create('G7.C4.W3: Part 2 - Cumulative Assessment');

  form.setDescription(
    'CYCLE 4 CUMULATIVE ASSESSMENT\n\n' +
    'This assessment covers all learning targets from Weeks 1 and 2.\n\n' +
    'Sections:\n' +
    'A: Ocean Acidification (15 pts)\n' +
    'B: Eutrophication & Dead Zones (15 pts)\n' +
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

  // --- SECTION A: OCEAN ACIDIFICATION (15 pts) ---
  form.addPageBreakItem()
    .setTitle('Section A: Ocean Acidification')
    .setHelpText('Questions about Week 1 content.');

  // A1: Mechanism (4 pts)
  const a1 = form.addMultipleChoiceItem()
    .setTitle('What happens chemically when CO2 dissolves in ocean water?')
    .setRequired(true);

  a1.setChoices([
    a1.createChoice('CO2 + H2O forms carbonic acid, which lowers pH', true),
    a1.createChoice('CO2 evaporates, raising pH', false),
    a1.createChoice('CO2 reacts with salt to form chlorine gas', false),
    a1.createChoice('CO2 has no chemical effect on water', false)
  ]);
  a1.setPoints(4);

  // A2: Impact explanation (5 pts manual)
  const a2 = form.addParagraphTextItem()
    .setTitle('Explain why ocean acidification is harmful to organisms that build shells (like oysters, clams, and pteropods). Include the chemistry in your explanation.')
    .setRequired(true);

  // A3: pH interpretation (3 pts)
  const a3 = form.addMultipleChoiceItem()
    .setTitle('Ocean pH has dropped from 8.2 to 8.1 over 200 years. A scientist says this is "a 30% increase in acidity." How is this possible when the numbers only changed by 0.1?')
    .setRequired(true);

  a3.setChoices([
    a3.createChoice('The pH scale is logarithmic - each 0.1 change is a large % change in H+ ions', true),
    a3.createChoice('The scientist made a calculation error', false),
    a3.createChoice('8.1 is 30% smaller than 8.2', false),
    a3.createChoice('The measurement was inaccurate', false)
  ]);
  a3.setPoints(3);

  // A4: Conservation of mass (3 pts)
  const a4 = form.addMultipleChoiceItem()
    .setTitle('SPIRAL: CO2 from a car in Iowa ends up in the Pacific Ocean. This demonstrates:')
    .setRequired(true);

  a4.setChoices([
    a4.createChoice('Conservation of mass - carbon atoms moved through Earth systems', true),
    a4.createChoice('Conservation of energy', false),
    a4.createChoice('New carbon was created', false),
    a4.createChoice('Carbon was destroyed and recreated', false)
  ]);
  a4.setPoints(3);

  // --- SECTION B: EUTROPHICATION (15 pts) ---
  form.addPageBreakItem()
    .setTitle('Section B: Eutrophication & Dead Zones')
    .setHelpText('Questions about Week 2 content.');

  // B1: Cascade ordering (4 pts)
  const b1 = form.addMultipleChoiceItem()
    .setTitle('What is the correct ORDER of the eutrophication cascade?')
    .setRequired(true);

  b1.setChoices([
    b1.createChoice('Nutrients enter -> Algae bloom -> Algae die -> Bacteria decompose -> Oxygen depleted', true),
    b1.createChoice('Oxygen depleted -> Algae die -> Bacteria decompose -> Nutrients enter', false),
    b1.createChoice('Algae bloom -> Nutrients enter -> Oxygen increases -> Fish thrive', false),
    b1.createChoice('Bacteria decompose -> Algae bloom -> Nutrients enter -> Oxygen increases', false)
  ]);
  b1.setPoints(4);

  // B2: Feedback identification (3 pts)
  const b2 = form.addMultipleChoiceItem()
    .setTitle('Eutrophication is a positive feedback loop because:')
    .setRequired(true);

  b2.setChoices([
    b2.createChoice('More death leads to more decomposition, which causes more oxygen depletion, causing more death', true),
    b2.createChoice('The system automatically returns to normal', false),
    b2.createChoice('Fish eat the algae, reducing the problem', false),
    b2.createChoice('Nutrients are used up, stopping the process', false)
  ]);
  b2.setPoints(3);

  // B3: Source identification (4 pts)
  const b3 = form.addCheckboxItem()
    .setTitle('Which are major sources of nutrient runoff causing eutrophication? SELECT ALL THAT APPLY.')
    .setRequired(true);

  b3.setChoices([
    b3.createChoice('Agricultural fertilizers', true),
    b3.createChoice('Sewage treatment discharge', true),
    b3.createChoice('Animal waste from farms', true),
    b3.createChoice('Carbon dioxide from cars', false),
    b3.createChoice('Sunlight', false)
  ]);
  b3.setPoints(4);

  // B4: Explanation (4 pts manual)
  const b4 = form.addParagraphTextItem()
    .setTitle('Explain why adding chemicals to kill algae is NOT a good long-term solution to eutrophication.')
    .setRequired(true);

  // --- SECTION C: DATA ANALYSIS (15 pts) ---
  form.addPageBreakItem()
    .setTitle('Section C: Data Analysis')
    .setHelpText('Apply your skills to interpret data.');

  // C1: Trend interpretation (5 pts manual)
  const c1 = form.addParagraphTextItem()
    .setTitle('The Gulf of Mexico dead zone was 4,000 km² in 1985 and 16,000 km² in 2021. Calculate the percent increase and explain what this trend means for marine ecosystems.')
    .setHelpText('Show your calculation: (new - old) / old x 100')
    .setRequired(true);

  // C2: Correlation (5 pts)
  const c2 = form.addMultipleChoiceItem()
    .setTitle('Data shows that as Mississippi River nitrogen levels increase, dead zone size increases. What type of relationship is this?')
    .setRequired(true);

  c2.setChoices([
    c2.createChoice('Positive correlation - as one increases, the other increases', true),
    c2.createChoice('Negative correlation - as one increases, the other decreases', false),
    c2.createChoice('No correlation - the variables are unrelated', false),
    c2.createChoice('Inverse relationship - they move in opposite directions', false)
  ]);
  c2.setPoints(5);

  // C3: Seasonal pattern (5 pts manual)
  const c3 = form.addParagraphTextItem()
    .setTitle('The dead zone is largest in July-August. Explain why, using your knowledge of agriculture, algae growth, and decomposition.')
    .setRequired(true);

  // --- SECTION D: ENGINEERING DESIGN (15 pts) ---
  form.addPageBreakItem()
    .setTitle('Section D: Engineering Design')
    .setHelpText('Apply scientific principles to design solutions.');

  // D1: Monitoring design (5 pts manual)
  const d1 = form.addParagraphTextItem()
    .setTitle('Design a simple monitoring system to detect early signs of eutrophication in a lake. What would you measure? How often? What values would trigger an alert?')
    .setRequired(true);

  // D2: Solution evaluation (5 pts)
  const d2 = form.addCheckboxItem()
    .setTitle('Which interventions would reduce BOTH ocean acidification AND eutrophication? SELECT ALL THAT APPLY.')
    .setRequired(true);

  d2.setChoices([
    d2.createChoice('Reducing fossil fuel use (less CO2)', true),
    d2.createChoice('Planting trees (carbon absorption)', true),
    d2.createChoice('Reducing fertilizer use', false),
    d2.createChoice('Building sea walls', false),
    d2.createChoice('Restoring wetlands (filter runoff + store carbon)', true)
  ]);
  d2.setPoints(5);

  // D3: Trade-offs (5 pts manual)
  const d3 = form.addParagraphTextItem()
    .setTitle('A farmer says: "If I use less fertilizer, my crops will produce less food." How would you respond? Propose a solution that addresses BOTH food production AND environmental protection.')
    .setRequired(true);

  Logger.log('Part 2 created: Cumulative Assessment (60 pts)');
  return form;
}

// ============================================================================
// PART 3: MISCONCEPTION CHECK (20 points, ~20 min)
// ============================================================================

function createG7C4W3MisconceptionCheck_() {
  const form = FormApp.create('G7.C4.W3: Part 3 - Misconception Check');

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
    'Great work this cycle. You learned how human activities affect Earth\'s water systems.\n\n' +
    'Next cycle: We\'ll explore more connections between human actions and environmental change.'
  );

  // --- MISCONCEPTION 1: Nutrients ---
  form.addPageBreakItem()
    .setTitle('Check Your Understanding: Nutrients')
    .setHelpText('This targets a common misconception about nutrients in ecosystems.');

  const m1 = form.addMultipleChoiceItem()
    .setTitle('MISCONCEPTION CHECK: "Since plants need nutrients to grow, adding more nutrients to an ecosystem will always make it healthier." Is this TRUE or FALSE?')
    .setRequired(true);

  m1.setChoices([
    m1.createChoice('TRUE - more nutrients always helps', false),
    m1.createChoice('FALSE - excess nutrients cause eutrophication and harm ecosystems', true)
  ]);
  m1.setPoints(4);
  m1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! This is one of the most common misconceptions. Excess nutrients cause algae blooms, oxygen depletion, and dead zones.')
      .build()
  );
  m1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('This is a common misconception! While plants DO need nutrients, EXCESS nutrients cause eutrophication - algae blooms that lead to oxygen depletion and dead zones.')
      .build()
  );

  const m1_explain = form.addParagraphTextItem()
    .setTitle('Explain WHY excess nutrients are harmful, using the eutrophication cascade.')
    .setRequired(true);

  // --- MISCONCEPTION 2: Dead zones ---
  form.addPageBreakItem()
    .setTitle('Check Your Understanding: Dead Zones')
    .setHelpText('Another common misconception.');

  const m2 = form.addMultipleChoiceItem()
    .setTitle('MISCONCEPTION CHECK: "Once a dead zone forms, it is permanent and can never recover." Is this TRUE or FALSE?')
    .setRequired(true);

  m2.setChoices([
    m2.createChoice('TRUE - dead zones are permanent', false),
    m2.createChoice('FALSE - dead zones can recover if nutrient input is reduced', true)
  ]);
  m2.setPoints(4);
  m2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Dead zones CAN recover. When nutrient input is reduced, the cascade stops, oxygen levels recover, and marine life returns.')
      .build()
  );

  const m2_explain = form.addParagraphTextItem()
    .setTitle('Explain what would need to happen for a dead zone to recover.')
    .setRequired(true);

  // --- MISCONCEPTION 3: pH scale ---
  form.addPageBreakItem()
    .setTitle('Check Your Understanding: Ocean Acidification')
    .setHelpText('Common confusion about pH changes.');

  const m3 = form.addMultipleChoiceItem()
    .setTitle('MISCONCEPTION CHECK: "A pH change from 8.2 to 8.1 is tiny and unimportant." Is this TRUE or FALSE?')
    .setRequired(true);

  m3.setChoices([
    m3.createChoice('TRUE - 0.1 is a tiny change', false),
    m3.createChoice('FALSE - pH is logarithmic, so 0.1 = 30% more acidic, which affects shell-builders', true)
  ]);
  m3.setPoints(4);
  m3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! The pH scale is logarithmic. A change of 0.1 means a 30% increase in hydrogen ions - a significant change for organisms.')
      .build()
  );

  const m3_explain = form.addParagraphTextItem()
    .setTitle('Explain why even "small" pH changes matter for marine organisms.')
    .setRequired(true);

  // --- SPIRAL MISCONCEPTION ---
  form.addPageBreakItem()
    .setTitle('Cycle 3 Spiral Check')
    .setHelpText('Checking retention of previous cycle concepts.');

  const spiral = form.addMultipleChoiceItem()
    .setTitle('SPIRAL CHECK (Cycle 3): In positive feedback loops, what happens?')
    .setRequired(true);

  spiral.setChoices([
    spiral.createChoice('The initial change is amplified - the system moves further from equilibrium', true),
    spiral.createChoice('The system returns to its original state', false),
    spiral.createChoice('Nothing changes', false),
    spiral.createChoice('The initial change is reversed', false)
  ]);
  spiral.setPoints(4);

  Logger.log('Part 3 created: Misconception Check (20 pts)');
  return form;
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function getG7C4W3FormUrls() {
  const forms = createAllG7C4W3Forms();
  Logger.log('\n=== FORM URLS ===');
  Object.entries(forms).forEach(([name, form]) => {
    Logger.log(name + ': ' + form.getPublishedUrl());
  });
}
