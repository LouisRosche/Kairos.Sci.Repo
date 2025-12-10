/**
 * ============================================================================
 * GRADE 7 - CYCLE 4 WEEK 2: EUTROPHICATION & DEAD ZONES
 * 5 Forms | 100 Points Total | ~75 Minutes
 * ============================================================================
 *
 * NGSS ALIGNMENT:
 *   Primary: MS-ESS3-3 - Apply scientific principles to design a method for
 *            monitoring and minimizing human impact on the environment
 *   Spiral:  MS-ESS3-5 - Climate change factors (Cycle 3)
 *            MS-PS1-5 - Conservation of mass (Cycle 2)
 *
 * 3-DIMENSIONAL LEARNING:
 *   SEP-6: Constructing Explanations - Explain eutrophication cascade
 *   SEP-8: Obtaining Information - Analyze Gulf dead zone data
 *   DCI ESS3.C: Human Impacts on Earth Systems
 *   CCC-4: Systems and System Models - Nutrient cycling
 *   CCC-7: Stability and Change - Ecosystem disruption
 *
 * LEARNING TARGETS:
 *   1. Trace nitrogen and phosphorus through ecosystems
 *   2. Explain the eutrophication cascade (nutrients -> algae -> decomposition -> O2 depletion)
 *   3. Analyze real-world data from the Gulf of Mexico dead zone
 *   4. Design a solution to minimize nutrient runoff
 *
 * SPIRAL CONNECTIONS:
 *   Week 1: Ocean acidification, pH, carbon cycle
 *   Cycle 3: Feedback loops, conservation of mass
 *
 * MISCONCEPTIONS TARGETED:
 *   - nutrients-always-good: More nutrients are always better for ecosystems
 *   - dead-zones-permanent: Dead zones are permanent and cannot recover
 *
 * FORMS:
 *   1. Hook - The Green Lake Mystery (12 pts, ~10 min)
 *   2. Station 1 - Nutrient Cycle Modeling (20 pts, ~18 min)
 *   3. Station 2 - Dead Zone Data Analysis (20 pts, ~15 min)
 *   4. Station 3 - Design a Remediation Plan (25 pts, ~20 min)
 *   5. Exit Ticket - Biogeochemical Systems (23 pts, ~15 min)
 *
 * ============================================================================
 */

// ============================================================================
// MAIN FUNCTION
// ============================================================================

/**
 * Create all forms for G7 C4 W2
 * After running, copy the JSON output to use with:
 *   node scripts/embed-forms-in-student-page.js 7 4 2 --from-json output.json
 */
function createAllG7C4W2Forms() {
  Logger.log('================================================');
  Logger.log('G7 CYCLE 4 WEEK 2: EUTROPHICATION & DEAD ZONES');
  Logger.log('================================================\n');

  const forms = {
    hook: createG7C4W2Hook_(),
    station1: createG7C4W2Station1_(),
    station2: createG7C4W2Station2_(),
    station3: createG7C4W2Station3_(),
    exitTicket: createG7C4W2ExitTicket_()
  };

  // Apply complete settings to all forms and log URLs
  Logger.log('\n--- APPLYING SETTINGS & GENERATING URLS ---\n');

  const output = {
    grade: 7,
    cycle: 4,
    week: 2,
    created: new Date().toISOString(),
    forms: {}
  };

  Object.keys(forms).forEach(formType => {
    const form = forms[formType];

    // Apply all standard settings (uses shared/FormSettings.gs if available)
    if (typeof applyStandardSettings === 'function') {
      applyStandardSettings(form);
    }

    // Collect URLs for output
    output.forms[formType] = {
      id: form.getId(),
      editUrl: form.getEditUrl(),
      publishedUrl: form.getPublishedUrl(),
      embedUrl: form.getPublishedUrl().replace('/viewform', '/viewform?embedded=true')
    };

    Logger.log(`${formType}:`);
    Logger.log(`  Edit: ${form.getEditUrl()}`);
    Logger.log(`  Embed: ${output.forms[formType].embedUrl}`);
  });

  // Output JSON for automation script
  Logger.log('\n================================================');
  Logger.log('JSON OUTPUT (copy for automation):');
  Logger.log('================================================');
  Logger.log(JSON.stringify(output, null, 2));

  Logger.log('\n================================================');
  Logger.log('ALL 5 FORMS CREATED - 100 POINTS TOTAL');
  Logger.log('================================================');

  // Print manual checklist reminder
  if (typeof printManualChecklist === 'function') {
    printManualChecklist();
  } else {
    Logger.log('\n⚠️  MANUAL CONFIG REQUIRED:');
    Logger.log('Open each form > Settings > Quizzes:');
    Logger.log('  ✓ Release grade: "Immediately after each submission"');
    Logger.log('  ✓ Respondent can see: Missed questions, Correct answers, Point values');
    Logger.log('Open each form > Settings > Responses:');
    Logger.log('  ✓ Send respondents a copy: "Always"');
  }

  return forms;
}

// ============================================================================
// HOOK - THE GREEN LAKE MYSTERY (12 points, ~10 min)
// ============================================================================

function createG7C4W2Hook_() {
  const form = FormApp.create('G7.C4.W2: Hook - The Green Lake Mystery');

  form.setDescription(
    'THE GREEN LAKE MYSTERY\n\n' +
    'Lake Erie, 2014:\n' +
    '- A massive algae bloom turned the lake bright green\n' +
    '- 500,000 people could not drink their tap water for 3 days\n' +
    '- Fish were dying by the thousands\n' +
    '- The algae produced toxins dangerous to humans and pets\n\n' +
    'But here is what is confusing: Farmers MEANT to help their crops grow better ' +
    'by adding fertilizer. How did helping plants on land end up poisoning a lake?\n\n' +
    '---\n' +
    'Time: About 10 minutes | Points: 12\n' +
    'Connect to what you learned about the carbon cycle in Week 1!'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Hook submitted! You are ready for Station 1.\n\n' +
    'Next: Model how nutrients flow through ecosystems.'
  );

  // --- MTSS: WEEK 1 CHECK (0 pts diagnostic) ---
  form.addPageBreakItem()
    .setTitle('Quick Review: Week 1 Check')
    .setHelpText('Review key concepts from Week 1.');

  const mtss1 = form.addMultipleChoiceItem()
    .setTitle('QUICK CHECK (Week 1): What happens when CO2 dissolves in ocean water?')
    .setHelpText('Think back to ocean acidification!')
    .setRequired(true);

  mtss1.setChoices([
    mtss1.createChoice('The water becomes more basic (higher pH)', false),
    mtss1.createChoice('The water becomes more acidic (lower pH)', true),
    mtss1.createChoice('The pH stays exactly the same', false),
    mtss1.createChoice('CO2 does not affect the water', false)
  ]);
  // Diagnostic only - omit setPoints() for ungraded items
  mtss1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! CO2 + H2O forms carbonic acid, which lowers pH.')
      .build()
  );
  mtss1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Review: CO2 dissolves to form carbonic acid, LOWERING the pH.')
      .build()
  );

  // --- PART 1: OBSERVATIONS ---
  form.addPageBreakItem()
    .setTitle('Part 1: What You Notice')
    .setHelpText('Examine the phenomenon carefully.');

  // Q1: Initial observation (3 pts)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('Looking at the green lake images, what caused the water to turn green?')
    .setRequired(true);

  q1.setChoices([
    q1.createChoice('Pollution from factories dumping green chemicals', false),
    q1.createChoice('Massive growth of algae (tiny plant-like organisms)', true),
    q1.createChoice('Reflection from trees around the lake', false),
    q1.createChoice('Natural minerals in the water', false)
  ]);
  q1.setPoints(3);
  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! The green color is from billions of algae that grew explosively - an "algae bloom."')
      .build()
  );

  // Q2: Prior knowledge (3 pts)
  const q2 = form.addMultipleChoiceItem()
    .setTitle('Farmers add fertilizer to help crops grow. What do fertilizers contain that plants need?')
    .setRequired(true);

  q2.setChoices([
    q2.createChoice('Only water', false),
    q2.createChoice('Nutrients like nitrogen and phosphorus', true),
    q2.createChoice('Only sunlight energy', false),
    q2.createChoice('Carbon dioxide only', false)
  ]);
  q2.setPoints(3);
  q2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Fertilizers contain nitrogen (N) and phosphorus (P) - nutrients plants need to grow.')
      .build()
  );

  // --- PART 2: PREDICTIONS ---
  form.addPageBreakItem()
    .setTitle('Part 2: Making Predictions')
    .setHelpText('Think about what might have happened.');

  // Q3: Connection hypothesis (3 pts manual)
  const q3 = form.addParagraphTextItem()
    .setTitle('How might fertilizer from farms end up in Lake Erie? Describe the path it could take.')
    .setHelpText('Think about what happens when it rains on farmland.')
    .setRequired(true);

  // Q4: Prediction (3 pts manual)
  const q4 = form.addParagraphTextItem()
    .setTitle('If algae grew so much that it covered the whole lake surface, what might happen to the fish? Explain your reasoning.')
    .setHelpText('Think about what fish need to survive.')
    .setRequired(true);

  // Confidence scale
  form.addScaleItem()
    .setTitle('How confident are you in understanding how nutrients move through ecosystems?')
    .setHelpText('1 = Not confident, 5 = Very confident. Does NOT affect your grade.')
    .setBounds(1, 5)
    .setLabels('Not confident', 'Very confident')
    .setRequired(true);

  Logger.log('Hook created: G7.C4.W2 - The Green Lake Mystery (12 pts)');
  return form;
}

// ============================================================================
// STATION 1 - NUTRIENT CYCLE MODELING (20 points, ~18 min)
// ============================================================================

function createG7C4W2Station1_() {
  const form = FormApp.create('G7.C4.W2: Station 1 - Nutrient Cycle Modeling');

  form.setDescription(
    'STATION 1: NUTRIENT CYCLE MODELING\n\n' +
    'Trace how nutrients (nitrogen and phosphorus) move through ecosystems.\n\n' +
    'KEY VOCABULARY:\n' +
    '- Biogeochemical cycle: Movement of elements through living/nonliving systems\n' +
    '- Eutrophication: Excess nutrients cause explosive algae growth\n' +
    '- Limiting factor: Resource that restricts organism growth\n\n' +
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
    'Station 1 complete! Next: Analyze real data from the Gulf of Mexico dead zone.'
  );

  // --- PART 1: NUTRIENT SOURCES ---
  form.addPageBreakItem()
    .setTitle('Part 1: Where Do Nutrients Come From?')
    .setHelpText('Use the nutrient flow simulation.');

  // Q1: Sources (4 pts)
  const q1 = form.addCheckboxItem()
    .setTitle('Which are sources of nitrogen and phosphorus entering waterways? SELECT ALL THAT APPLY.')
    .setRequired(true);

  q1.setChoices([
    q1.createChoice('Agricultural fertilizer runoff', true),
    q1.createChoice('Sewage treatment plant discharge', true),
    q1.createChoice('Natural decomposition of dead organisms', true),
    q1.createChoice('Atmospheric nitrogen from lightning', true),
    q1.createChoice('Sunlight energy', false),
    q1.createChoice('Ocean waves', false)
  ]);
  q1.setPoints(4);

  // Q2: Human amplification (4 pts)
  const q2 = form.addMultipleChoiceItem()
    .setTitle('Human sources (farms, sewage) add about ___ times more nutrients than natural sources.')
    .setRequired(true);

  q2.setChoices([
    q2.createChoice('About the same (1x)', false),
    q2.createChoice('2-3 times greater', false),
    q2.createChoice('5-10 times greater', true),
    q2.createChoice('Less than natural sources', false)
  ]);
  q2.setPoints(4);
  q2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Human activities have increased nutrient input 5-10x, overwhelming ecosystems.')
      .build()
  );

  // --- PART 2: EUTROPHICATION CASCADE ---
  form.addPageBreakItem()
    .setTitle('Part 2: The Eutrophication Cascade')
    .setHelpText('Model what happens when excess nutrients enter a lake.');

  // Q3: Cascade ordering (4 pts manual)
  const q3 = form.addParagraphTextItem()
    .setTitle('Put these events in ORDER during eutrophication:\n\n' +
              'A. Fish die from lack of oxygen\n' +
              'B. Bacteria decompose dead algae, using up oxygen\n' +
              'C. Algae grow rapidly, blocking sunlight\n' +
              'D. Excess nutrients (N, P) enter the water\n' +
              'E. Dead plants and algae sink to the bottom\n\n' +
              'Write letters in order (e.g., D, C, E, B, A)')
    .setRequired(true);

  // Q4: Misconception check (4 pts manual)
  const q4 = form.addParagraphTextItem()
    .setTitle('CRITICAL: A farmer says "Plants need nutrients to grow, so more nutrients = healthier ecosystem." ' +
              'Explain why this reasoning is FLAWED.')
    .setHelpText('This is a common misconception. Use evidence from the simulation.')
    .setRequired(true);

  // --- PART 3: SPIRAL ---
  form.addPageBreakItem()
    .setTitle('Part 3: Connecting to Cycle 3')
    .setHelpText('Link to feedback loops.');

  // Q5: Feedback loop (4 pts)
  const q5 = form.addMultipleChoiceItem()
    .setTitle('SPIRAL (Cycle 3): Eutrophication is what type of feedback loop?')
    .setRequired(true);

  q5.setChoices([
    q5.createChoice('POSITIVE feedback - the process accelerates itself', true),
    q5.createChoice('NEGATIVE feedback - the process slows itself down', false),
    q5.createChoice('No feedback - events are independent', false),
    q5.createChoice('Cannot determine', false)
  ]);
  q5.setPoints(4);
  q5.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Eutrophication is POSITIVE feedback: more death leads to more decomposition leads to less oxygen leads to more death.')
      .build()
  );

  Logger.log('Station 1 created: G7.C4.W2 - Nutrient Cycle Modeling (20 pts)');
  return form;
}

// ============================================================================
// STATION 2 - DEAD ZONE DATA ANALYSIS (20 points, ~15 min)
// ============================================================================

function createG7C4W2Station2_() {
  const form = FormApp.create('G7.C4.W2: Station 2 - Dead Zone Data Analysis');

  form.setDescription(
    'STATION 2: DEAD ZONE DATA ANALYSIS\n\n' +
    'The Gulf of Mexico has a massive "dead zone" where oxygen levels are too low ' +
    'for most marine life. It forms every summer.\n\n' +
    'DATA YOU WILL ANALYZE:\n' +
    '- Dead zone size over time (1985-2024)\n' +
    '- Mississippi River nutrient levels\n' +
    '- Seasonal patterns\n\n' +
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
    'Station 2 complete! Next: Design a remediation plan at Station 3.'
  );

  // --- PART 1: SIZE TRENDS ---
  form.addPageBreakItem()
    .setTitle('Part 1: Dead Zone Size Over Time')
    .setHelpText('Examine Graph A showing dead zone area 1985-2024.');

  // Q1: Trend (4 pts)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('What is the overall TREND in dead zone size from 1985 to 2024?')
    .setRequired(true);

  q1.setChoices([
    q1.createChoice('Steadily decreasing (getting smaller)', false),
    q1.createChoice('Generally increasing with variation (getting bigger overall)', true),
    q1.createChoice('Staying constant (no change)', false),
    q1.createChoice('Randomly fluctuating with no pattern', false)
  ]);
  q1.setPoints(4);
  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! The dead zone has grown from ~4,000 km2 in 1985 to over 15,000 km2 - roughly the size of Connecticut!')
      .build()
  );

  // Q2: Quantitative (4 pts)
  const q2 = form.addMultipleChoiceItem()
    .setTitle('Dead zone size in 2021 (16,400 km2) is approximately how many times larger than 1985 (4,100 km2)?')
    .setHelpText('Calculate: 2021 size / 1985 size')
    .setRequired(true);

  q2.setChoices([
    q2.createChoice('About 2 times larger', false),
    q2.createChoice('About 4 times larger', true),
    q2.createChoice('About 10 times larger', false),
    q2.createChoice('About the same size', false)
  ]);
  q2.setPoints(4);
  q2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! 16,400 / 4,100 = 4. The dead zone has QUADRUPLED in 35 years.')
      .build()
  );

  // --- PART 2: SEASONAL PATTERNS ---
  form.addPageBreakItem()
    .setTitle('Part 2: Seasonal Patterns')
    .setHelpText('Examine Graph B showing when the dead zone forms.');

  // Q3: Seasonal explanation (4 pts manual)
  const q3 = form.addParagraphTextItem()
    .setTitle('The dead zone is largest in July-August and smallest in winter. Using eutrophication, explain WHY it is biggest in summer.')
    .setHelpText('Think: When do algae grow fastest? When is fertilizer applied? When does rain wash it into rivers?')
    .setRequired(true);

  // Q4: Conservation of mass (4 pts)
  const q4 = form.addMultipleChoiceItem()
    .setTitle('SPIRAL (Cycle 2): Nutrients from Midwest farms traveled down the Mississippi to the Gulf. This demonstrates:')
    .setRequired(true);

  q4.setChoices([
    q4.createChoice('Conservation of mass - atoms moved, not destroyed', true),
    q4.createChoice('Conservation of energy', false),
    q4.createChoice('Spontaneous generation of matter', false),
    q4.createChoice('Chemical equilibrium', false)
  ]);
  q4.setPoints(4);
  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! The nitrogen/phosphorus atoms were not destroyed - they were transported from Iowa to the Gulf. Matter cycles!')
      .build()
  );

  // --- PART 3: CORRELATION ---
  form.addPageBreakItem()
    .setTitle('Part 3: Connecting the Evidence')
    .setHelpText('Look for relationships between data sets.');

  // Q5: Correlation (4 pts manual)
  const q5 = form.addParagraphTextItem()
    .setTitle('Graph C shows Mississippi River nutrient levels over time. Describe the relationship between river nutrients and dead zone size. Does the data support that farm runoff causes the dead zone?')
    .setHelpText('Use specific numbers or trends from both graphs.')
    .setRequired(true);

  Logger.log('Station 2 created: G7.C4.W2 - Dead Zone Data Analysis (20 pts)');
  return form;
}

// ============================================================================
// STATION 3 - DESIGN A REMEDIATION PLAN (25 points, ~20 min)
// ============================================================================

function createG7C4W2Station3_() {
  const form = FormApp.create('G7.C4.W2: Station 3 - Design a Remediation Plan');

  form.setDescription(
    'STATION 3: DESIGN A REMEDIATION PLAN\n\n' +
    'ENGINEERING CHALLENGE:\n' +
    'You are an environmental consultant. A major lake is experiencing eutrophication. ' +
    'Design a plan to reduce nutrient runoff and help the lake recover.\n\n' +
    'CONSTRAINTS:\n' +
    '- Budget: $500,000 per year\n' +
    '- Cannot completely shut down farming\n' +
    '- Must show improvement within 5 years\n\n' +
    'AVAILABLE INTERVENTIONS:\n' +
    '- Riparian buffers (plant strips) - $100,000/yr - Medium effectiveness\n' +
    '- Constructed wetlands - $200,000/yr - High effectiveness\n' +
    '- Precision fertilizer tech - $150,000/yr - High effectiveness\n' +
    '- Cover crops program - $75,000/yr - Medium effectiveness\n' +
    '- Fertilizer timing regulations - $50,000/yr - Medium effectiveness\n\n' +
    '---\n' +
    'Time: About 20 minutes | Points: 25'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Station 3 complete! Next: Exit Ticket to show integrated understanding.'
  );

  // --- PART 1: PROBLEM DEFINITION ---
  form.addPageBreakItem()
    .setTitle('Part 1: Define the Problem')
    .setHelpText('Clearly define what you are solving.');

  // Q1: Problem (5 pts manual)
  const q1 = form.addParagraphTextItem()
    .setTitle('In your own words, explain the problem you need to solve. Include: What is happening? What is causing it? Why does it matter?')
    .setRequired(true);

  // --- PART 2: INTERVENTION SELECTION ---
  form.addPageBreakItem()
    .setTitle('Part 2: Choose Your Interventions')
    .setHelpText('Select 2-3 interventions within budget.');

  // Q2: Selection (5 pts)
  const q2 = form.addCheckboxItem()
    .setTitle('Which interventions will you include? Select 2-3 options that stay within $500,000 budget.')
    .setRequired(true);

  q2.setChoices([
    q2.createChoice('Riparian buffers - $100,000/year'),
    q2.createChoice('Constructed wetlands - $200,000/year'),
    q2.createChoice('Precision fertilizer tech - $150,000/year'),
    q2.createChoice('Cover crops program - $75,000/year'),
    q2.createChoice('Fertilizer timing regulations - $50,000/year')
  ]);
  q2.setPoints(5);

  // Q3: Justification (6 pts manual)
  const q3 = form.addParagraphTextItem()
    .setTitle('JUSTIFY YOUR CHOICES: For each intervention, explain:\n' +
              '1. HOW it reduces nutrient runoff (mechanism)\n' +
              '2. WHY you chose it over other options (trade-offs)')
    .setRequired(true);

  // --- PART 3: PREDICT OUTCOMES ---
  form.addPageBreakItem()
    .setTitle('Part 3: Predict Outcomes')
    .setHelpText('Scientists make quantitative predictions.');

  // Q4: Prediction (5 pts manual)
  const q4 = form.addParagraphTextItem()
    .setTitle('Based on effectiveness data, estimate:\n' +
              '- What % reduction in nutrient runoff do you expect?\n' +
              '- How long before the lake improves?\n' +
              '- What evidence would show success?')
    .setRequired(true);

  // Q5: Trade-offs (4 pts manual)
  const q5 = form.addParagraphTextItem()
    .setTitle('Every solution has trade-offs. What are TWO potential downsides with your plan? How would you address them?')
    .setHelpText('Consider: cost, farmer resistance, time, uncertainty.')
    .setRequired(true);

  Logger.log('Station 3 created: G7.C4.W2 - Design a Remediation Plan (25 pts)');
  return form;
}

// ============================================================================
// EXIT TICKET - BIOGEOCHEMICAL SYSTEMS (23 points, ~15 min)
// ============================================================================

function createG7C4W2ExitTicket_() {
  const form = FormApp.create('G7.C4.W2: Exit Ticket - Biogeochemical Systems');

  form.setDescription(
    'EXIT TICKET: BIOGEOCHEMICAL SYSTEMS\n\n' +
    'This exit ticket tests your understanding of:\n' +
    '- Nutrient cycling and eutrophication (NEW)\n' +
    '- Carbon cycle and ocean acidification (SPIRAL - Week 1)\n' +
    '- Feedback loops (SPIRAL - Cycle 3)\n' +
    '- Connections between systems (INTEGRATION)\n\n' +
    '---\n' +
    'Time: About 15 minutes | Points: 23'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Week 2 Exit Ticket submitted!\n\n' +
    'NEXT WEEK: Synthesis and Assessment - connect ocean acidification + eutrophication.'
  );

  // --- NEW CONTENT (2 questions) ---
  form.addPageBreakItem()
    .setTitle('[NEW] This Week\'s Content')
    .setHelpText('Test what you learned about eutrophication.');

  // NEW Q1: Cascade (5 pts manual)
  const new1 = form.addParagraphTextItem()
    .setTitle('[NEW] Explain the complete eutrophication cascade, from nutrient input to dead zone. Include at least 4 steps in order.')
    .setHelpText('Use vocabulary: eutrophication, algae bloom, decomposition, hypoxia.')
    .setRequired(true);

  // NEW Q2: Misconception (4 pts)
  const new2 = form.addMultipleChoiceItem()
    .setTitle('[NEW] A classmate says: "Just add chemicals to kill the algae. Problem solved!" What is the MAIN flaw?')
    .setRequired(true);

  new2.setChoices([
    new2.createChoice('The chemicals would be too expensive', false),
    new2.createChoice('Killing algae adds MORE dead matter, worsening oxygen depletion', true),
    new2.createChoice('Algae are too small to kill', false),
    new2.createChoice('Chemicals cannot reach the algae', false)
  ]);
  new2.setPoints(4);
  new2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Killing algae adds more organic matter for bacteria to decompose, using more oxygen. The real solution is reducing nutrient INPUT.')
      .build()
  );

  // --- SPIRAL (2 questions) ---
  form.addPageBreakItem()
    .setTitle('[SPIRAL] Previous Learning')
    .setHelpText('Review Week 1 and Cycle 3 concepts.');

  // SPIRAL Q1: Week 1 (4 pts)
  const spiral1 = form.addMultipleChoiceItem()
    .setTitle('[SPIRAL - Week 1] What is the PRIMARY human input for each?\n' +
              'Ocean Acidification: _____ | Eutrophication: _____')
    .setRequired(true);

  spiral1.setChoices([
    spiral1.createChoice('CO2 emissions | Nutrient runoff (N, P)', true),
    spiral1.createChoice('Nutrient runoff | CO2 emissions', false),
    spiral1.createChoice('Plastic pollution | Oil spills', false),
    spiral1.createChoice('Heat | Light', false)
  ]);
  spiral1.setPoints(4);
  spiral1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Ocean acidification = CO2. Eutrophication = N and P runoff. Different causes, similar cascade effects.')
      .build()
  );

  // SPIRAL Q2: Cycle 3 (3 pts)
  const spiral2 = form.addMultipleChoiceItem()
    .setTitle('[SPIRAL - Cycle 3] Like ice-albedo feedback, eutrophication is a positive feedback loop because:')
    .setRequired(true);

  spiral2.setChoices([
    spiral2.createChoice('More algae -> more decomposition -> less oxygen -> more death -> more decomposition', true),
    spiral2.createChoice('More algae -> less nutrients -> less algae -> system stabilizes', false),
    spiral2.createChoice('More algae -> fish eat algae -> less algae -> system stabilizes', false),
    spiral2.createChoice('Eutrophication is not a feedback loop', false)
  ]);
  spiral2.setPoints(3);
  spiral2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Like ice-albedo, eutrophication AMPLIFIES itself until external intervention occurs.')
      .build()
  );

  // --- INTEGRATION (1 question) ---
  form.addPageBreakItem()
    .setTitle('[INTEGRATION] Connecting Concepts')
    .setHelpText('Connect ideas from multiple weeks and cycles.');

  // Integration (5 pts manual)
  const integration = form.addParagraphTextItem()
    .setTitle('[INTEGRATION] A coastal bay faces BOTH ocean acidification AND eutrophication.\n\n' +
              'Explain how these problems might INTERACT. Could one make the other worse?')
    .setHelpText('Think: What do both do to oxygen? How might acidification affect organisms already stressed by low oxygen?')
    .setRequired(true);

  // --- SEP-1 (1 question) ---
  form.addPageBreakItem()
    .setTitle('[SEP-1] Scientific Questions')
    .setHelpText('Generate testable questions.');

  // SEP-1 (2 pts manual)
  const sep1 = form.addParagraphTextItem()
    .setTitle('[SEP-1] Write 2 testable scientific questions about eutrophication.\n\n' +
              'Format: "How does X affect Y?" or "What is the relationship between X and Y?"')
    .setHelpText('Example: "How does water temperature affect the rate of algae growth?"')
    .setRequired(true);

  Logger.log('Exit Ticket created: G7.C4.W2 - Biogeochemical Systems (23 pts)');
  return form;
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function getG7C4W2FormUrls() {
  const forms = createAllG7C4W2Forms();
  Logger.log('\n=== FORM URLS ===');
  Object.entries(forms).forEach(([name, form]) => {
    Logger.log(name + ': ' + form.getPublishedUrl());
  });
}
