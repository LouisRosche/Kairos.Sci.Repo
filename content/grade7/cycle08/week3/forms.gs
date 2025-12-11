/**
 * ============================================================================
 * GRADE 7 - CYCLE 8 WEEK 3: YEAR-END INTEGRATION & ASSESSMENT
 * 4 Forms | 100 Points Total | 3 Days
 * ============================================================================
 *
 * SPECIAL STRUCTURE: Year-End Integration Week
 * This week combines Cycle 8 content assessment with Year-End Integration.
 * Point structure differs from standard weeks.
 *
 * NGSS ALIGNMENT:
 *   Primary: MS-LS2-4 - Ecosystem dynamics
 *   Integration: All Year Standards Synthesis (Cycles 3-8)
 *   CCCs: All 7 Cross-Cutting Concepts
 *
 * FORMS:
 *   1. Day 1: CCC Ecosystem Analysis (40 pts)
 *   2. Day 2: Investigation Presentation Rubric & Peer Feedback (40 pts)
 *   3. Day 3: Cycle 8 Cumulative Assessment (15 pts)
 *   4. Day 3: Year-End Reflection (5 pts)
 *
 * ============================================================================
 * DEPLOYMENT CHECKLIST
 * ============================================================================
 *   1. Open script.google.com, create new project
 *   2. Paste this entire script
 *   3. Run: createAllG7C8W3Forms()
 *   4. Check Logger (View > Logs) for form URLs
 *   5. MANUAL CONFIG REQUIRED (Settings > Quizzes in each form)
 */

// ============================================================================
// MAIN FUNCTION
// ============================================================================

function createAllG7C8W3Forms() {
  Logger.log('================================================');
  Logger.log('G7 CYCLE 8 WEEK 3: YEAR-END INTEGRATION');
  Logger.log('================================================\n');

  const forms = {
    cccAnalysis: createG7C8W3Day1CCCAnalysis_(),
    investigation: createG7C8W3Day2Investigation_(),
    assessment: createG7C8W3Day3Assessment_(),
    reflection: createG7C8W3Day3Reflection_()
  };

  Logger.log('\n================================================');
  Logger.log('ALL 4 FORMS CREATED - 100 POINTS TOTAL');
  Logger.log('================================================');

  return forms;
}

// ============================================================================
// DAY 1: CCC ECOSYSTEM ANALYSIS (40 points)
// Apply all 7 Cross-Cutting Concepts to Yellowstone ecosystem
// ============================================================================

function createG7C8W3Day1CCCAnalysis_() {
  const form = FormApp.create('G7.C8.W3: Day 1 - CCC Ecosystem Analysis');

  form.setDescription(
    'YEAR-END INTEGRATION: CROSS-CUTTING CONCEPTS\n\n' +
    'Throughout this year, you\'ve used the 7 Cross-Cutting Concepts (CCCs)\n' +
    'to understand Earth and Life Science. Now, apply ALL of them to\n' +
    'analyze the Yellowstone ecosystem we\'ve been studying.\n\n' +
    'THE 7 CROSS-CUTTING CONCEPTS:\n' +
    '1. Patterns\n' +
    '2. Cause and Effect\n' +
    '3. Scale, Proportion, and Quantity\n' +
    '4. Systems and System Models\n' +
    '5. Energy and Matter\n' +
    '6. Structure and Function\n' +
    '7. Stability and Change\n\n' +
    '---\n' +
    'Time: About 60 minutes | Points: 40 | Day 1 of Year-End Integration'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Day 1 Complete!\n\n' +
    'You\'ve applied all 7 Cross-Cutting Concepts to the Yellowstone ecosystem.\n' +
    'These big ideas connect EVERYTHING in science!\n\n' +
    'Tomorrow: Student Investigation Presentations'
  );

  // --- CCC 1: PATTERNS ---
  form.addPageBreakItem()
    .setTitle('CCC 1: Patterns')
    .setHelpText('Scientists look for patterns in data, events, and observations.');

  form.addSectionHeaderItem()
    .setTitle('Patterns in Yellowstone (5 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '5: Identifies 3+ specific patterns with data/examples\n' +
      '4: Identifies 2-3 patterns with examples\n' +
      '3: Identifies 2 patterns\n' +
      '2: Identifies 1 pattern\n' +
      '1: Vague response\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Identify at least THREE patterns you observed in the Yellowstone ecosystem (population cycles, seasonal changes, migration, etc.).')
    .setHelpText(
      'Examples to consider:\n' +
      '• Population patterns (elk cycles, wolf pack sizes)\n' +
      '• Seasonal patterns (migration, breeding seasons)\n' +
      '• Geographic patterns (where animals live, plant distribution)\n' +
      '• Historical patterns (before/after wolves)'
    )
    .setRequired(true);

  // --- CCC 2: CAUSE AND EFFECT ---
  form.addPageBreakItem()
    .setTitle('CCC 2: Cause and Effect')
    .setHelpText('Events have causes, sometimes simple, sometimes complex.');

  form.addSectionHeaderItem()
    .setTitle('Cause and Effect in Yellowstone (6 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '6: Complete chain with 4+ links, each with mechanism\n' +
      '5: 4 links with most mechanisms\n' +
      '4: 3 links with mechanisms\n' +
      '3: 2-3 links\n' +
      '2: 1-2 links\n' +
      '1: Vague cause-effect\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Create a COMPLETE cause-effect chain for the trophic cascade: Wolf removal → [effects] → River changes.\n\nInclude at least 4 steps and explain HOW each causes the next.')
    .setHelpText(
      'Template:\n' +
      '1. Wolf removal caused... because...\n' +
      '2. This caused... because...\n' +
      '3. This caused... because...\n' +
      '4. This caused... because...\n' +
      '5. Final effect: Rivers changed because...'
    )
    .setRequired(true);

  // --- CCC 3: SCALE, PROPORTION, QUANTITY ---
  form.addPageBreakItem()
    .setTitle('CCC 3: Scale, Proportion, and Quantity')
    .setHelpText('Size, time, and quantity matter in understanding phenomena.');

  // Q3a: Auto-graded
  const q3a = form.addMultipleChoiceItem()
    .setTitle('The 10% energy rule shows that only 10% of energy transfers between trophic levels. In Yellowstone, if plants capture 100,000 units of energy from the sun, how much energy is available to wolves (tertiary consumers)?')
    .setRequired(true);

  q3a.setChoices([
    q3a.createChoice('10,000 units (10%)', false),
    q3a.createChoice('1,000 units (1%)', false),
    q3a.createChoice('100 units (0.1%)', true),
    q3a.createChoice('10 units (0.01%)', false)
  ]);
  q3a.setPoints(3);
  q3a.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Plants→Herbivores (10,000)→Carnivores (1,000)→Wolves (100). Three 10% transfers!')
      .build()
  );
  q3a.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Count the levels: Plants (100,000) → Herbivores (10,000) → Carnivores (1,000) → Wolves (100)')
      .build()
  );

  form.addSectionHeaderItem()
    .setTitle('Scale Explanation (3 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '3: Explains how energy limits population sizes at top trophic levels\n' +
      '2: Partial explanation\n' +
      '1: Vague response\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Explain WHY apex predators like wolves are always rare compared to animals at lower trophic levels. Use the 10% rule in your explanation.')
    .setRequired(true);

  // --- CCC 4: SYSTEMS AND SYSTEM MODELS ---
  form.addPageBreakItem()
    .setTitle('CCC 4: Systems and System Models')
    .setHelpText('Defining a system and its boundaries helps us understand how parts interact.');

  form.addSectionHeaderItem()
    .setTitle('System Analysis (5 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '5: Identifies system components, boundaries, inputs/outputs, and interactions\n' +
      '4: Identifies most elements\n' +
      '3: Identifies components and some interactions\n' +
      '2: Lists components without interactions\n' +
      '1: Vague response\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Describe the Yellowstone ecosystem as a SYSTEM:\n• What are the main components?\n• What are the boundaries?\n• What flows in and out?\n• How do parts interact?')
    .setHelpText(
      'Think about:\n' +
      '• Living components (wolves, elk, plants, decomposers)\n' +
      '• Non-living components (rivers, soil, climate)\n' +
      '• Energy flow, nutrient cycling\n' +
      '• Connections between components'
    )
    .setRequired(true);

  // --- CCC 5: ENERGY AND MATTER ---
  form.addPageBreakItem()
    .setTitle('CCC 5: Energy and Matter')
    .setHelpText('Energy flows through systems; matter is conserved and cycles.');

  form.addSectionHeaderItem()
    .setTitle('Energy and Matter Flow (6 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '6: Explains energy flow AND matter cycling with Yellowstone examples\n' +
      '5: Explains both with some examples\n' +
      '4: Explains one well, one partially\n' +
      '3: Partial explanation of both\n' +
      '2: One explained\n' +
      '1: Vague response\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Explain:\n1. How does ENERGY flow through the Yellowstone ecosystem? (Does it cycle or flow through?)\n2. How does MATTER (like carbon or nitrogen) cycle through the ecosystem?')
    .setHelpText(
      'Key difference:\n' +
      '• Energy flows ONE WAY (sun → producers → consumers → heat)\n' +
      '• Matter CYCLES (carbon goes: air → plants → animals → decomposers → air)'
    )
    .setRequired(true);

  // --- CCC 6: STRUCTURE AND FUNCTION ---
  form.addPageBreakItem()
    .setTitle('CCC 6: Structure and Function')
    .setHelpText('The way something is shaped or organized determines what it can do.');

  form.addSectionHeaderItem()
    .setTitle('Structure-Function Examples (6 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '6: Provides 3+ examples from different trophic levels with clear structure-function links\n' +
      '5: 3 examples with links\n' +
      '4: 2 examples with clear links\n' +
      '3: 2 examples with partial links\n' +
      '2: 1 example\n' +
      '1: Vague response\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Give THREE examples from the Yellowstone ecosystem where STRUCTURE determines FUNCTION. Include organisms from different trophic levels.')
    .setHelpText(
      'Examples:\n' +
      '• Wolf teeth (structure) → tearing meat (function)\n' +
      '• Elk hooves (structure) → running from predators (function)\n' +
      '• Willow roots (structure) → stabilizing riverbanks (function)\n' +
      '• Beaver dams (structure) → creating ponds (function)'
    )
    .setRequired(true);

  // --- CCC 7: STABILITY AND CHANGE ---
  form.addPageBreakItem()
    .setTitle('CCC 7: Stability and Change')
    .setHelpText('Systems can be stable until something disrupts them; then they change.');

  form.addSectionHeaderItem()
    .setTitle('Stability and Change Analysis (6 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '6: Explains initial stability, disruption mechanism, AND pathway to new stability\n' +
      '5: Explains all three with some detail\n' +
      '4: Explains 2 of 3 well\n' +
      '3: Partial explanation\n' +
      '2: Only mentions one phase\n' +
      '1: Vague response\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('The Yellowstone ecosystem went through three phases:\n1. STABLE (before 1926, with wolves)\n2. DISRUPTED (1926-1995, without wolves)\n3. RECOVERING (1995-present, wolves returned)\n\nExplain what "stability" looked like in each phase and what caused the changes between them.')
    .setRequired(true);

  logFormInfo_(form, 'G7 C8 W3 Day 1 CCC Analysis', 40);
  return form;
}

// ============================================================================
// DAY 2: INVESTIGATION PRESENTATION (40 points)
// Self-Assessment and Peer Feedback
// ============================================================================

function createG7C8W3Day2Investigation_() {
  const form = FormApp.create('G7.C8.W3: Day 2 - Investigation Self-Assessment & Peer Feedback');

  form.setDescription(
    'STUDENT INVESTIGATION SHOWCASE\n\n' +
    'Complete this form to self-assess your investigation presentation\n' +
    'and provide feedback to your peers.\n\n' +
    'You\'ll rate your own presentation, then provide feedback\n' +
    'to 3 classmates based on the rubric criteria.\n\n' +
    '---\n' +
    'Points: 40 | Day 2 of Year-End Integration'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Day 2 Complete!\n\n' +
    'You\'ve reflected on your investigation and provided peer feedback.\n\n' +
    'Tomorrow: Cycle 8 Assessment and Year-End Reflection'
  );

  // --- SELF-ASSESSMENT SECTION ---
  form.addPageBreakItem()
    .setTitle('Part 1: Self-Assessment')
    .setHelpText('Rate your own investigation presentation honestly.');

  // Self-assess: Research Question (5 pts)
  const selfQ1 = form.addMultipleChoiceItem()
    .setTitle('SELF-ASSESS: Research Question - My research question was:')
    .setRequired(true);

  selfQ1.setChoices([
    selfQ1.createChoice('Clear, specific, and testable (5 pts)', true),
    selfQ1.createChoice('Mostly clear with some vagueness (4 pts)', false),
    selfQ1.createChoice('Basic but lacked specificity (3 pts)', false),
    selfQ1.createChoice('Unclear or too broad (2 pts)', false),
    selfQ1.createChoice('Missing or not a question (0-1 pts)', false)
  ]);
  selfQ1.setPoints(5);

  // Self-assess: Evidence-based Methods (10 pts)
  const selfQ2 = form.addMultipleChoiceItem()
    .setTitle('SELF-ASSESS: Methods - My investigation methods were:')
    .setRequired(true);

  selfQ2.setChoices([
    selfQ2.createChoice('Well-designed with clear data collection and analysis (9-10 pts)', true),
    selfQ2.createChoice('Good methods with minor gaps (7-8 pts)', false),
    selfQ2.createChoice('Basic methods, some improvements needed (5-6 pts)', false),
    selfQ2.createChoice('Weak methods, significant improvements needed (3-4 pts)', false),
    selfQ2.createChoice('Methods unclear or missing (0-2 pts)', false)
  ]);
  selfQ2.setPoints(10);

  // Self-assess: Conclusions (10 pts)
  const selfQ3 = form.addMultipleChoiceItem()
    .setTitle('SELF-ASSESS: Conclusions - My conclusions were:')
    .setRequired(true);

  selfQ3.setChoices([
    selfQ3.createChoice('Clearly supported by evidence with accurate scientific reasoning (9-10 pts)', true),
    selfQ3.createChoice('Well-supported with minor gaps in reasoning (7-8 pts)', false),
    selfQ3.createChoice('Partially supported by evidence (5-6 pts)', false),
    selfQ3.createChoice('Weakly supported or contained misconceptions (3-4 pts)', false),
    selfQ3.createChoice('Not supported by evidence (0-2 pts)', false)
  ]);
  selfQ3.setPoints(10);

  // Self-assess: Cycle Connections (10 pts)
  const selfQ4 = form.addMultipleChoiceItem()
    .setTitle('SELF-ASSESS: Cycle Connections - My investigation connected to:')
    .setRequired(true);

  selfQ4.setChoices([
    selfQ4.createChoice('3+ cycles with clear, meaningful connections (9-10 pts)', true),
    selfQ4.createChoice('2 cycles with strong connections (7-8 pts)', false),
    selfQ4.createChoice('2 cycles with basic connections (5-6 pts)', false),
    selfQ4.createChoice('1 cycle connection (3-4 pts)', false),
    selfQ4.createChoice('No clear cycle connections (0-2 pts)', false)
  ]);
  selfQ4.setPoints(10);

  // Self-assess: Presentation Quality (5 pts)
  const selfQ5 = form.addMultipleChoiceItem()
    .setTitle('SELF-ASSESS: Presentation - My presentation was:')
    .setRequired(true);

  selfQ5.setChoices([
    selfQ5.createChoice('Clear, engaging, well-organized with strong delivery (5 pts)', true),
    selfQ5.createChoice('Clear and organized with good delivery (4 pts)', false),
    selfQ5.createChoice('Mostly clear with some organization issues (3 pts)', false),
    selfQ5.createChoice('Unclear or disorganized (2 pts)', false),
    selfQ5.createChoice('Significant presentation issues (0-1 pts)', false)
  ]);
  selfQ5.setPoints(5);

  // --- PEER FEEDBACK SECTION ---
  form.addPageBreakItem()
    .setTitle('Part 2: Peer Feedback')
    .setHelpText('Provide constructive feedback to 3 classmates.');

  form.addSectionHeaderItem()
    .setTitle('Peer Feedback #1')
    .setHelpText('This feedback does not affect your grade directly, but thoughtful feedback demonstrates scientific collaboration skills.');

  form.addTextItem()
    .setTitle('Peer #1: Name')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Peer #1: Strengths - What did this person do well in their investigation/presentation?')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Peer #1: Questions - What questions do you have about their investigation?')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Peer #1: Connections - What connections did you notice to other cycles or concepts?')
    .setRequired(true);

  // Peer 2
  form.addSectionHeaderItem()
    .setTitle('Peer Feedback #2');

  form.addTextItem()
    .setTitle('Peer #2: Name')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Peer #2: Strengths')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Peer #2: Questions')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Peer #2: Connections')
    .setRequired(true);

  // Peer 3
  form.addSectionHeaderItem()
    .setTitle('Peer Feedback #3');

  form.addTextItem()
    .setTitle('Peer #3: Name')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Peer #3: Strengths')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Peer #3: Questions')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Peer #3: Connections')
    .setRequired(true);

  logFormInfo_(form, 'G7 C8 W3 Day 2 Investigation', 40);
  return form;
}

// ============================================================================
// DAY 3: CYCLE 8 CUMULATIVE ASSESSMENT (15 points)
// Content mastery check for Cycle 8
// ============================================================================

function createG7C8W3Day3Assessment_() {
  const form = FormApp.create('G7.C8.W3: Day 3 - Cycle 8 Cumulative Assessment');

  form.setDescription(
    'CYCLE 8 CUMULATIVE ASSESSMENT\n\n' +
    'This assessment covers all content from Cycle 8:\n' +
    '• Week 1: Ecosystem Dynamics & Trophic Cascades\n' +
    '• Week 2: Biodiversity & Ecosystem Services\n\n' +
    '---\n' +
    'Time: About 30 minutes | Points: 15 | Day 3'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(false); // Assessment - no edits
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Assessment Complete!\n\n' +
    'Now complete the Year-End Reflection to finish the school year.'
  );

  // --- SECTION A: ECOSYSTEM DYNAMICS (5 pts) ---
  form.addPageBreakItem()
    .setTitle('Section A: Ecosystem Dynamics')
    .setHelpText('Questions about trophic cascades and food webs.');

  // A1: Trophic cascade definition (2 pts)
  const a1 = form.addMultipleChoiceItem()
    .setTitle('A1. What is a trophic cascade?')
    .setRequired(true);

  a1.setChoices([
    a1.createChoice('When changes at one trophic level ripple through all other levels in an ecosystem', true),
    a1.createChoice('When water flows down a series of waterfalls', false),
    a1.createChoice('When animals migrate from one ecosystem to another', false),
    a1.createChoice('When plants grow taller to reach sunlight', false)
  ]);
  a1.setPoints(2);
  a1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Trophic cascades show how interconnected ecosystems really are.')
      .build()
  );
  a1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Remember Yellowstone: Removing wolves affected elk, which affected plants, which affected rivers!')
      .build()
  );

  // A2: Keystone species (2 pts)
  const a2 = form.addMultipleChoiceItem()
    .setTitle('A2. Why are wolves considered a "keystone species" in Yellowstone?')
    .setRequired(true);

  a2.setChoices([
    a2.createChoice('Their effects on the ecosystem are disproportionately large compared to their population size', true),
    a2.createChoice('They are the largest predator in the park', false),
    a2.createChoice('They are the most numerous species in the park', false),
    a2.createChoice('They were there first', false)
  ]);
  a2.setPoints(2);
  a2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! A keystone species has outsized effects - small population, huge impact.')
      .build()
  );
  a2.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Keystone species are defined by their EFFECT, not size. Like a keystone in an arch - small but holds everything together.')
      .build()
  );

  // A3: Food web (1 pt)
  const a3 = form.addMultipleChoiceItem()
    .setTitle('A3. In a food chain, what happens to energy at each trophic level?')
    .setRequired(true);

  a3.setChoices([
    a3.createChoice('Only about 10% transfers to the next level; the rest is lost as heat', true),
    a3.createChoice('100% of energy transfers to the next level', false),
    a3.createChoice('Energy increases at each level', false),
    a3.createChoice('Energy is created at each level', false)
  ]);
  a3.setPoints(1);
  a3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! The 10% rule explains why there are fewer organisms at higher trophic levels.')
      .build()
  );
  a3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Remember the 10% rule - that\'s why apex predators are always rare!')
      .build()
  );

  // --- SECTION B: BIODIVERSITY & SERVICES (5 pts) ---
  form.addPageBreakItem()
    .setTitle('Section B: Biodiversity & Ecosystem Services')
    .setHelpText('Questions about biodiversity and the value of ecosystems.');

  // B1: Biodiversity and resilience (2 pts)
  const b1 = form.addMultipleChoiceItem()
    .setTitle('B1. Why does biodiversity increase ecosystem resilience?')
    .setRequired(true);

  b1.setChoices([
    b1.createChoice('Multiple species can fill similar roles - when one is affected, others can compensate', true),
    b1.createChoice('More species means more competition, which makes everyone stronger', false),
    b1.createChoice('Diverse ecosystems are warmer and more stable', false),
    b1.createChoice('Biodiversity has no effect on resilience', false)
  ]);
  b1.setPoints(2);
  b1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Biodiversity is like having backup systems - redundancy protects the ecosystem.')
      .build()
  );
  b1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Think about the simulation: Diverse ecosystems recovered faster because other species could fill in!')
      .build()
  );

  // B2: Ecosystem services calculation (2 pts)
  const b2 = form.addMultipleChoiceItem()
    .setTitle('B2. A wetland provides flood control worth $4,539/hectare/year. If a 50-hectare wetland is destroyed, what is the annual cost of lost flood control?')
    .setRequired(true);

  b2.setChoices([
    b2.createChoice('$226,950', true),
    b2.createChoice('$45,390', false),
    b2.createChoice('$4,539', false),
    b2.createChoice('$90.78', false)
  ]);
  b2.setPoints(2);
  b2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! $4,539 × 50 = $226,950 per year!')
      .build()
  );
  b2.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Multiply: $4,539/hectare × 50 hectares = $226,950/year')
      .build()
  );

  // B3: Ecosystem service categories (1 pt)
  const b3 = form.addMultipleChoiceItem()
    .setTitle('B3. Water purification by wetlands is what type of ecosystem service?')
    .setRequired(true);

  b3.setChoices([
    b3.createChoice('Regulating service', true),
    b3.createChoice('Provisioning service', false),
    b3.createChoice('Cultural service', false),
    b3.createChoice('Supporting service', false)
  ]);
  b3.setPoints(1);
  b3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Regulating services control natural processes like water quality, climate, and pollination.')
      .build()
  );
  b3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Regulating services REGULATE natural processes. Provisioning PROVIDES things. Cultural is recreation/spiritual.')
      .build()
  );

  // --- SECTION C: INTEGRATION (5 pts) ---
  form.addPageBreakItem()
    .setTitle('Section C: Integration')
    .setHelpText('Apply what you\'ve learned to a new scenario.');

  form.addSectionHeaderItem()
    .setTitle('Integration Question (5 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '5: Explains cascade mechanism, biodiversity impact, ecosystem services lost, and human consequences\n' +
      '4: Explains 3 of 4 elements\n' +
      '3: Explains 2 elements\n' +
      '2: Explains 1 element\n' +
      '1: Vague response\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('NEW SCENARIO: Scientists discover that a disease is killing 80% of bees in the Midwest.\n\nUsing what you learned in Cycle 8, explain:\n1. What TROPHIC CASCADE effects might occur?\n2. How would BIODIVERSITY help or hurt the ecosystem\'s recovery?\n3. What ECOSYSTEM SERVICES would be lost?\n4. How would this affect HUMANS?')
    .setRequired(true);

  logFormInfo_(form, 'G7 C8 W3 Day 3 Assessment', 15);
  return form;
}

// ============================================================================
// DAY 3: YEAR-END REFLECTION (5 points)
// Student reflection on scientific growth
// ============================================================================

function createG7C8W3Day3Reflection_() {
  const form = FormApp.create('G7.C8.W3: Day 3 - Year-End Reflection');

  form.setDescription(
    'YEAR-END REFLECTION\n\n' +
    'Take time to reflect on your growth as a scientific thinker this year.\n' +
    'There are no wrong answers - this is about YOUR journey!\n\n' +
    '---\n' +
    'Time: About 15 minutes | Points: 5 | Final Activity'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'CONGRATULATIONS! 🎉\n\n' +
    'You\'ve completed Grade 7 Science!\n\n' +
    'You\'ve learned about:\n' +
    '• Climate and weather systems\n' +
    '• Human impacts on Earth\n' +
    '• Geologic time and Earth\'s history\n' +
    '• Ecosystems and biodiversity\n\n' +
    'Keep asking questions and exploring the world like a scientist!\n' +
    'Have a great summer!'
  );

  // Reflection 1: Most surprising learning
  form.addSectionHeaderItem()
    .setTitle('Reflection Questions')
    .setHelpText('Answer honestly - your reflections help us improve the course!');

  form.addParagraphTextItem()
    .setTitle('1. What was the MOST SURPRISING thing you learned in science this year? Why did it surprise you?')
    .setHelpText('Think about all the phenomena we explored - which one made you say "Wow!"')
    .setRequired(true);

  // Reflection 2: SEP growth
  form.addParagraphTextItem()
    .setTitle('2. Which SCIENCE AND ENGINEERING PRACTICE did you improve the most?\n\n(Asking Questions, Developing Models, Planning Investigations, Analyzing Data, Using Math, Constructing Explanations, Arguing from Evidence, Obtaining/Communicating Information)')
    .setHelpText('What skill are you now better at than you were at the start of the year?')
    .setRequired(true);

  // Reflection 3: Science thinking
  form.addParagraphTextItem()
    .setTitle('3. How has your thinking about SCIENCE changed this year? What do scientists do that you didn\'t realize before?')
    .setHelpText('Think about what science IS versus what you thought it was.')
    .setRequired(true);

  // Reflection 4: Remaining questions
  form.addParagraphTextItem()
    .setTitle('4. What QUESTIONS do you still have about Earth science, life science, or how the world works?')
    .setHelpText('Good scientists always have more questions! What do you want to learn next?')
    .setRequired(true);

  // Completion credit (5 pts)
  const complete = form.addMultipleChoiceItem()
    .setTitle('5. I have thoughtfully completed all reflection questions above.')
    .setRequired(true);

  complete.setChoices([
    complete.createChoice('Yes, I have reflected thoughtfully on my year in science.', true)
  ]);
  complete.setPoints(5);

  logFormInfo_(form, 'G7 C8 W3 Day 3 Reflection', 5);
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
function testG7C8W3Day1() { createG7C8W3Day1CCCAnalysis_(); }
function testG7C8W3Day2() { createG7C8W3Day2Investigation_(); }
function testG7C8W3Day3Assessment() { createG7C8W3Day3Assessment_(); }
function testG7C8W3Day3Reflection() { createG7C8W3Day3Reflection_(); }
