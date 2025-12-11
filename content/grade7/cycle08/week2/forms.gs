/**
 * ============================================================================
 * GRADE 7 - CYCLE 8 WEEK 2: BIODIVERSITY & ECOSYSTEM SERVICES
 * 5 Forms | 100 Points Total | ~78 Minutes
 * ============================================================================
 *
 * NGSS ALIGNMENT:
 *   Primary: MS-LS2-4 - Construct an argument supported by empirical evidence
 *            that changes to physical or biological components of an ecosystem
 *            affect populations.
 *   Spiral:  MS-ESS3-3 - Human impact (Cycle 4)
 *            MS-ESS3-5 - Climate change factors (Cycle 3)
 *
 * 3-DIMENSIONAL LEARNING:
 *   SEP-7: Engaging in Argument - Argue for conservation strategies
 *   SEP-6: Constructing Explanations - Explain biodiversity-resilience link
 *   DCI LS2.C: Ecosystem Dynamics, Functioning, and Resilience
 *   DCI ESS3.C: Human Impacts on Earth Systems
 *   CCC-7: Stability and Change - Ecosystem stability through diversity
 *   CCC-4: Systems and System Models - Ecosystem services
 *
 * LEARNING TARGETS:
 *   1. Explain why biodiversity increases ecosystem resilience
 *   2. Identify ecosystem services and their economic value
 *   3. Connect human activities to biodiversity loss
 *   4. Design evidence-based conservation strategies
 *
 * FORMS:
 *   1. Hook - The Pollinator Crisis Mystery (12 pts, ~10 min)
 *   2. Station 1 - Biodiversity & Resilience Simulation (20 pts, ~18 min)
 *   3. Station 2 - Ecosystem Services Valuation (20 pts, ~15 min)
 *   4. Station 3 - Design a Conservation Plan (25 pts, ~20 min)
 *   5. Exit Ticket - Biodiversity Integration (23 pts, ~15 min)
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
 *   3. Run: createAllG7C8W2Forms()
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

function createAllG7C8W2Forms() {
  Logger.log('================================================');
  Logger.log('G7 CYCLE 8 WEEK 2: BIODIVERSITY & ECOSYSTEM SERVICES');
  Logger.log('================================================\n');

  const forms = {
    hook: createG7C8W2Hook_(),
    station1: createG7C8W2Station1_(),
    station2: createG7C8W2Station2_(),
    station3: createG7C8W2Station3_(),
    exitTicket: createG7C8W2ExitTicket_()
  };

  Logger.log('\n================================================');
  Logger.log('ALL 5 FORMS CREATED - 100 POINTS TOTAL');
  Logger.log('================================================');

  return forms;
}

// ============================================================================
// HOOK - THE POLLINATOR CRISIS MYSTERY (12 points, ~10 min)
// Connects Week 1 cascades to biodiversity and ecosystem services
// ============================================================================

function createG7C8W2Hook_() {
  const form = FormApp.create('G7.C8.W2: Hook - The Pollinator Crisis Mystery');

  form.setDescription(
    'THE POLLINATOR CRISIS MYSTERY\n\n' +
    'Something alarming is happening to our pollinators:\n' +
    '- Bee populations have declined by 40% in the last decade\n' +
    '- 75% of crops depend on animal pollinators\n' +
    '- $235 BILLION in crops worldwide depend on pollinators\n\n' +
    'What happens if pollinators disappear?\n\n' +
    '---\n' +
    'Time: About 10 minutes | Points: 12\n' +
    'Connect to Week 1: We saw how wolves affected rivers. Could bees affect our food supply?'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Hook submitted! You\'re ready for Station 1.\n\n' +
    'Next: Explore how biodiversity makes ecosystems more resilient using the simulation.'
  );

  // --- PART 1: WEEK 1 CONNECTION ---
  form.addPageBreakItem()
    .setTitle('Part 1: Connect to Week 1')
    .setHelpText('Remember what you learned about trophic cascades!');

  // Q1: Week 1 recall (3 pts auto)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('In Week 1, we learned about trophic cascades. What is a trophic cascade?')
    .setRequired(true);

  q1.setChoices([
    q1.createChoice('When changes at one trophic level ripple through and affect all other levels', true),
    q1.createChoice('When animals migrate to different ecosystems', false),
    q1.createChoice('When plants grow faster in summer', false),
    q1.createChoice('When predators hibernate during winter', false)
  ]);
  q1.setPoints(3);
  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Trophic cascades show how interconnected ecosystems are - one change affects everything.')
      .build()
  );
  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Review Week 1: Trophic cascades are when removing/adding species creates ripple effects through the whole ecosystem.')
      .build()
  );

  // --- MTSS FLAG: Ecosystem interconnection check ---
  const mtss1 = form.addMultipleChoiceItem()
    .setTitle('QUICK CHECK: In an ecosystem, species are:')
    .setHelpText('This checks your understanding. Your answer does NOT affect your grade.')
    .setRequired(true);

  mtss1.setChoices([
    mtss1.createChoice('Independent - they don\'t affect each other', false),
    mtss1.createChoice('Connected through food webs and ecosystem services', true),
    mtss1.createChoice('Only connected if they are predator and prey', false),
    mtss1.createChoice('Only connected through competition for resources', false)
  ]);
  // Diagnostic only - omit setPoints()

  // --- PART 2: THE PHENOMENON ---
  form.addPageBreakItem()
    .setTitle('Part 2: The Pollinator Crisis')
    .setHelpText('Consider the data about pollinator decline.');

  // Q2: Pollinator importance (3 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 2 (3 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '3: Explains multiple crops affected + economic impact + food security concern\n' +
      '2: Mentions 2 of 3 elements\n' +
      '1: Basic mention of food impact\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('If pollinators disappeared, what would happen to human food supplies? Give at least TWO specific examples.')
    .setHelpText(
      'Sentence starters:\n' +
      '• "Without pollinators, crops like ___ would not produce..." \n' +
      '• "This would affect humans because..." \n' +
      '• "The economic impact would be..."'
    )
    .setRequired(true);

  // Q3: Cascade prediction (3 pts auto)
  const q3 = form.addMultipleChoiceItem()
    .setTitle('How is the pollinator crisis similar to the wolf removal in Yellowstone?')
    .setRequired(true);

  q3.setChoices([
    q3.createChoice('Both show how removing one species creates cascading effects through the ecosystem', true),
    q3.createChoice('Both involve animals that are large and dangerous', false),
    q3.createChoice('Both only affect plants, not animals', false),
    q3.createChoice('They are not similar at all', false)
  ]);
  q3.setPoints(3);
  q3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Both are examples of how losing key species triggers cascading effects through the ecosystem.')
      .build()
  );
  q3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Think about trophic cascades: Wolves affected elk → plants → beavers → rivers. Pollinators affect plants → food → animals → humans.')
      .build()
  );

  // Q4: Biodiversity hypothesis (3 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 3 (3 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '3: Connects diversity to resilience with specific reasoning\n' +
      '2: Mentions diversity or resilience without clear connection\n' +
      '1: Vague prediction\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('HYPOTHESIS: Why might ecosystems with MORE different pollinator species (bees, butterflies, hummingbirds) be more stable than ecosystems with only ONE pollinator species?')
    .setHelpText(
      'Sentence starters:\n' +
      '• "If there are many pollinator species, then..." \n' +
      '• "If one species declines, the others can..." \n' +
      '• "This is like having a backup..."'
    )
    .setRequired(true);

  // Q5: Confidence (0 pts - diagnostic only)
  form.addScaleItem()
    .setTitle('Self-Assessment: How well can you explain why diverse ecosystems are more stable?')
    .setHelpText('FOR REFLECTION ONLY - This does NOT affect your grade. Be honest!')
    .setBounds(1, 5)
    .setLabels('Still learning', 'Got it!')
    .setRequired(true);

  logFormInfo_(form, 'G7 C8 W2 Hook', 12);
  return form;
}

// ============================================================================
// STATION 1 - BIODIVERSITY & RESILIENCE SIMULATION (20 points, ~18 min)
// Uses biodiversity-resilience-simulator.html
// ============================================================================

function createG7C8W2Station1_() {
  const form = FormApp.create('G7.C8.W2: Station 1 - Biodiversity & Resilience Simulation');

  form.setDescription(
    'YOUR MISSION: EXPLORE HOW BIODIVERSITY AFFECTS ECOSYSTEM STABILITY\n\n' +
    'Use the simulator to compare ecosystems with different levels of biodiversity.\n' +
    'Discover why diverse ecosystems are more resilient to disturbances.\n\n' +
    'KEY CONCEPTS:\n' +
    '- Biodiversity: Variety of different species in an ecosystem\n' +
    '- Resilience: Ability to recover from disturbances\n' +
    '- Monoculture: Ecosystem with only one or few species\n\n' +
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
    'KEY INSIGHT: Diverse ecosystems are like having multiple backup systems.\n' +
    'When one species is affected, others can fill in - the ecosystem survives.\n\n' +
    'Continue to Station 2: Ecosystem Services Valuation'
  );

  // --- SCENARIO 1: DIVERSE VS MONOCULTURE ---
  form.addPageBreakItem()
    .setTitle('Scenario 1: Compare Ecosystems')
    .setHelpText(
      'In the simulator, compare a diverse ecosystem (many species) to a monoculture (one main species).\n' +
      'Apply the same disturbance to both and observe what happens.'
    );

  // Q1: Prediction (2 pts auto)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('PREDICT: Which ecosystem do you think will recover better from a disease outbreak?')
    .setRequired(true);

  q1.setChoices([
    q1.createChoice('The diverse ecosystem (many different species)', true),
    q1.createChoice('The monoculture (one main species)', false),
    q1.createChoice('Both will recover equally', false),
    q1.createChoice('Neither will recover', false)
  ]);
  q1.setPoints(2);
  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Good hypothesis! Let\'s test it with the simulation.')
      .build()
  );
  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Think about it: If a disease affects one species, and that\'s all you have, vs. if you have many species...')
      .build()
  );

  // Q2: Observation (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 2: Record Your Observations (4 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '4: Records specific differences in recovery time, species survival, and ecosystem function\n' +
      '3: Records 2-3 differences with some numbers\n' +
      '2: Records general differences\n' +
      '1: Vague observation\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Run the disease outbreak in BOTH ecosystems. Record what happened to:\n• Recovery time (how long to return to stability)\n• Species survival rates\n• Overall ecosystem function')
    .setHelpText(
      'Sentence starters:\n' +
      '• "The diverse ecosystem recovered in ___ years, while the monoculture took ___ years" \n' +
      '• "In the diverse ecosystem, ___% of species survived, compared to ___%" \n' +
      '• "The ecosystem function..."'
    )
    .setRequired(true);

  // Q3: Explain mechanism (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 3: Explain WHY Diversity Helps (4 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '4: Explains redundancy, functional roles, and backup systems with specific examples\n' +
      '3: Explains 2 mechanisms\n' +
      '2: Explains 1 mechanism\n' +
      '1: Vague explanation\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Explain the MECHANISM: WHY does biodiversity increase resilience? What happens when one species is affected in a diverse vs. monoculture ecosystem?')
    .setHelpText(
      'Sentence starters:\n' +
      '• "In a diverse ecosystem, when one species is affected..." \n' +
      '• "Other species can fill in because..." \n' +
      '• "In a monoculture, if the main species is affected..."'
    )
    .setRequired(true);

  // --- SCENARIO 2: CLIMATE CHANGE ---
  form.addPageBreakItem()
    .setTitle('Scenario 2: Climate Change Stress')
    .setHelpText('Apply gradual climate warming to both ecosystems and observe adaptation.');

  // Q4: Climate adaptation (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 4: Climate Change Effects (4 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '4: Compares adaptation in both systems + explains why diversity helps adaptation\n' +
      '3: Compares adaptation with partial explanation\n' +
      '2: Describes effects without comparison\n' +
      '1: Vague response\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Apply climate warming to both ecosystems. How does each ecosystem respond? Why does diversity help with climate adaptation?')
    .setHelpText(
      'Sentence starters:\n' +
      '• "The diverse ecosystem adapted by..." \n' +
      '• "The monoculture struggled because..." \n' +
      '• "Diversity helps with climate change because..."'
    )
    .setRequired(true);

  // Q5: Spiral - Cycle 3 connection (4 pts auto)
  const q5 = form.addMultipleChoiceItem()
    .setTitle('CYCLE 3 SPIRAL: How does climate change connect to biodiversity loss?')
    .setRequired(true);

  q5.setChoices([
    q5.createChoice('Climate change can cause species to go extinct if they can\'t adapt, reducing biodiversity', true),
    q5.createChoice('Climate change has no effect on biodiversity', false),
    q5.createChoice('Climate change always increases biodiversity', false),
    q5.createChoice('Biodiversity causes climate change', false)
  ]);
  q5.setPoints(4);
  q5.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Climate change is one of the main drivers of biodiversity loss, which then makes ecosystems less resilient to future changes.')
      .build()
  );
  q5.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Review Cycle 3: Climate change causes habitat shifts, extreme weather, and changed seasons - species that can\'t adapt go extinct.')
      .build()
  );

  // Q6: Data interpretation (2 pts auto)
  const q6 = form.addMultipleChoiceItem()
    .setTitle('Based on your simulation results, which statement is TRUE about monocultures?')
    .setRequired(true);

  q6.setChoices([
    q6.createChoice('Monocultures are highly vulnerable to disease and environmental change', true),
    q6.createChoice('Monocultures are more stable than diverse ecosystems', false),
    q6.createChoice('Monocultures recover faster from disturbances', false),
    q6.createChoice('Monocultures have more backup species when problems occur', false)
  ]);
  q6.setPoints(2);
  q6.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Monocultures are vulnerable because they have no backup - if the main species is affected, everything collapses.')
      .build()
  );
  q6.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Look at your simulation data: Which ecosystem recovered faster? Which had more species survive?')
      .build()
  );

  logFormInfo_(form, 'G7 C8 W2 Station 1', 20);
  return form;
}

// ============================================================================
// STATION 2 - ECOSYSTEM SERVICES VALUATION (20 points, ~15 min)
// Calculate economic value of ecosystem services
// ============================================================================

function createG7C8W2Station2_() {
  const form = FormApp.create('G7.C8.W2: Station 2 - Ecosystem Services Valuation');

  form.setDescription(
    'YOUR MISSION: CALCULATE THE VALUE OF NATURE\'S SERVICES\n\n' +
    'Ecosystems provide "services" that humans depend on.\n' +
    'These services have real economic value - if we had to replace them artificially!\n\n' +
    'ECOSYSTEM SERVICE CATEGORIES:\n' +
    '• Provisioning: Food, water, materials\n' +
    '• Regulating: Climate, pollination, water purification\n' +
    '• Cultural: Recreation, spiritual, aesthetic\n' +
    '• Supporting: Nutrient cycling, habitat, soil formation\n\n' +
    '---\n' +
    'Time: About 15 minutes | Points: 20\n' +
    'SPIRAL: Connect to Cycle 4 human impact concepts!'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Station 2 complete!\n\n' +
    'KEY INSIGHT: Nature\'s services are worth TRILLIONS of dollars globally.\n' +
    'When we destroy ecosystems, we lose these services - and have to pay to replace them.\n\n' +
    'Continue to Station 3: Design a Conservation Plan'
  );

  // --- DATA REFERENCE ---
  form.addPageBreakItem()
    .setTitle('Reference: Ecosystem Service Values')
    .setHelpText(
      'ECOSYSTEM SERVICE VALUES (per hectare per year):\n\n' +
      '| Service               | Value/ha/year | Example             |\n' +
      '|-----------------------|---------------|---------------------|\n' +
      '| Pollination           | $3,251        | Apple orchards      |\n' +
      '| Water purification    | $2,455        | Wetlands filtering  |\n' +
      '| Carbon storage        | $1,987        | Forest carbon sink  |\n' +
      '| Flood control         | $4,539        | Wetlands/riparian   |\n' +
      '| Pest control          | $1,340        | Bird/bat predation  |\n' +
      '| Recreation            | $969          | Parks, hiking       |\n' +
      '| Habitat provision     | $2,107        | Wildlife support    |\n\n' +
      '1 hectare = about 2.5 acres (a little smaller than 2 football fields)'
    );

  // Q1: Service categorization (4 pts auto)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('Pollination is what type of ecosystem service?')
    .setRequired(true);

  q1.setChoices([
    q1.createChoice('Regulating service - it regulates plant reproduction', true),
    q1.createChoice('Provisioning service - it provides honey', false),
    q1.createChoice('Cultural service - it\'s beautiful to watch', false),
    q1.createChoice('Supporting service - it supports human recreation', false)
  ]);
  q1.setPoints(4);
  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Pollination is a regulating service because it regulates the reproduction of plants.')
      .build()
  );
  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Regulating services control natural processes. Pollination regulates plant reproduction - without it, most plants can\'t make seeds.')
      .build()
  );

  // Q2: Calculation (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 2: Calculate Total Value (4 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '4: Correct calculation with clear work shown (100 ha x $4,539 = $453,900)\n' +
      '3: Correct answer without clear work\n' +
      '2: Correct setup but calculation error\n' +
      '1: Attempted calculation\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('A local wetland covers 100 hectares. Calculate the annual value of its FLOOD CONTROL service alone.\n\nSHOW YOUR WORK!')
    .setHelpText(
      'Sentence starters:\n' +
      '• "Flood control value = ___ per hectare x ___ hectares" \n' +
      '• "Total annual value = $___" \n' +
      '• "This means if we destroy the wetland, we\'d need to spend $___/year on artificial flood control"'
    )
    .setRequired(true);

  // Q3: Multiple services (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 3: Total Wetland Value (4 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '4: Calculates 3+ services correctly + explains the total value\n' +
      '3: Calculates 2-3 services with explanation\n' +
      '2: Lists services without calculations\n' +
      '1: Partial attempt\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('The same 100-hectare wetland provides: flood control, water purification, AND habitat provision. Calculate the TOTAL annual value of all three services.')
    .setHelpText(
      'Sentence starters:\n' +
      '• "Flood control: $4,539 x 100 = $___" \n' +
      '• "Water purification: $2,455 x 100 = $___" \n' +
      '• "Habitat provision: $2,107 x 100 = $___" \n' +
      '• "TOTAL: $___/year"'
    )
    .setRequired(true);

  // Q4: SPIRAL - Human impact (4 pts auto)
  const q4 = form.addMultipleChoiceItem()
    .setTitle('CYCLE 4 SPIRAL: When humans destroy a wetland for development, who pays for the lost ecosystem services?')
    .setRequired(true);

  q4.setChoices([
    q4.createChoice('Everyone - through higher costs for water treatment, flood damage, and lost wildlife', true),
    q4.createChoice('No one - ecosystem services have no real value', false),
    q4.createChoice('Only the developer who destroyed the wetland', false),
    q4.createChoice('The government pays for everything', false)
  ]);
  q4.setPoints(4);
  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! The costs of lost ecosystem services are shared by society - we all pay through taxes, insurance, and higher prices.')
      .build()
  );
  q4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Review Cycle 4: When we lose nature\'s free services, we have to build expensive alternatives (water treatment plants, levees, etc.).')
      .build()
  );

  // Q5: Critical thinking (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 5: Should We Put a Dollar Value on Nature? (4 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '4: Presents thoughtful argument with pros AND cons of valuation\n' +
      '3: Presents argument with reasoning\n' +
      '2: Opinion without much reasoning\n' +
      '1: Simple yes/no\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Some people argue we SHOULD put dollar values on nature to show its importance. Others say nature has value beyond money. What do YOU think? Give reasons for your position.')
    .setHelpText(
      'Consider both sides:\n' +
      '• PRO: Dollar values help people understand what we\'d lose\n' +
      '• PRO: Helps make economic arguments for conservation\n' +
      '• CON: Some values (spiritual, aesthetic) can\'t be measured\n' +
      '• CON: Might suggest nature only matters if it\'s profitable'
    )
    .setRequired(true);

  logFormInfo_(form, 'G7 C8 W2 Station 2', 20);
  return form;
}

// ============================================================================
// STATION 3 - DESIGN A CONSERVATION PLAN (25 points, ~20 min)
// Apply understanding to real conservation challenge
// ============================================================================

function createG7C8W2Station3_() {
  const form = FormApp.create('G7.C8.W2: Station 3 - Design a Conservation Plan');

  form.setDescription(
    'ENGINEERING CHALLENGE: SAVE A THREATENED WETLAND\n\n' +
    'A local wetland is threatened by development. Your job is to make a\n' +
    'compelling case for conservation using EVIDENCE from this week.\n\n' +
    'THE WETLAND PROVIDES:\n' +
    '• Habitat for 200+ species\n' +
    '• Water filtration for 50,000 people\n' +
    '• Flood control during storms\n' +
    '• Recreation for the community\n\n' +
    'THE DEVELOPMENT PLAN:\n' +
    '• 500 new housing units\n' +
    '• Shopping center\n' +
    '• 1,000 new jobs\n\n' +
    '---\n' +
    'Time: About 20 minutes | Points: 25 (highest value!)'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Station 3 complete!\n\n' +
    'You\'ve built an evidence-based argument for conservation!\n' +
    'Real conservation scientists use exactly this kind of analysis.\n\n' +
    'Continue to Exit Ticket'
  );

  // Q1: Calculate services lost (6 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 1: Calculate What We Would Lose (6 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '6: Calculates 4+ services with annual total + shows all work\n' +
      '5: Calculates 3-4 services correctly\n' +
      '3-4: Calculates 2 services\n' +
      '1-2: Calculates 1 service\n' +
      '0: No response\n\n' +
      'The wetland is 150 hectares. Use the values from Station 2.'
    );

  form.addParagraphTextItem()
    .setTitle('The wetland is 150 hectares. Calculate the annual value of ALL ecosystem services that would be lost:\n• Flood control ($4,539/ha)\n• Water purification ($2,455/ha)\n• Habitat provision ($2,107/ha)\n• Recreation ($969/ha)\n\nSHOW YOUR WORK and calculate the TOTAL.')
    .setHelpText(
      'Sentence starters:\n' +
      '• "Flood control: $4,539 x 150 = $___" \n' +
      '• "Water purification: $2,455 x 150 = $___" \n' +
      '• "..." \n' +
      '• "TOTAL ANNUAL LOSS: $___"'
    )
    .setRequired(true);

  // Q2: Biodiversity argument (5 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 2: Biodiversity Argument (5 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '5: Uses simulation evidence + explains resilience value + connects to ecosystem services\n' +
      '4: Strong argument with some evidence\n' +
      '3: Mentions biodiversity importance\n' +
      '2: Vague argument\n' +
      '1: Opinion only\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Using what you learned from the simulation, explain WHY the 200+ species in this wetland matter. How does this biodiversity make the ecosystem more valuable and resilient?')
    .setHelpText(
      'Use evidence from Station 1:\n' +
      '• "Diverse ecosystems are more resilient because..." \n' +
      '• "The simulation showed that when one species is affected..." \n' +
      '• "Losing these 200+ species would affect services like..."'
    )
    .setRequired(true);

  // Q3: Alternative solutions (5 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 3: Alternative Solutions (5 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '5: Proposes 2+ creative alternatives that address development needs while preserving wetland\n' +
      '4: Proposes alternatives with some detail\n' +
      '3: One alternative with reasoning\n' +
      '2: Vague alternatives\n' +
      '1: Just says "don\'t develop"\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('The community needs housing and jobs. Propose at least TWO alternative solutions that could meet development needs WITHOUT destroying the wetland.')
    .setHelpText(
      'Consider:\n' +
      '• Could housing be built elsewhere or in a different way?\n' +
      '• Could the wetland become an economic asset (ecotourism, education center)?\n' +
      '• Could we preserve part of the wetland while developing around it?\n' +
      '• Could green infrastructure incorporate some wetland functions?'
    )
    .setRequired(true);

  // Q4: Stakeholder analysis (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 4: Stakeholder Analysis (4 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '4: Identifies 3+ stakeholders with their perspectives and concerns\n' +
      '3: Identifies 2-3 stakeholders with perspectives\n' +
      '2: Lists stakeholders without perspectives\n' +
      '1: Mentions 1 stakeholder\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Who are the STAKEHOLDERS (people affected by this decision)? What does each group care about? How could your plan address their concerns?')
    .setHelpText(
      'Think about:\n' +
      '• Developers (want profit, jobs)\n' +
      '• Residents (want housing, clean water, flood protection)\n' +
      '• Wildlife (need habitat)\n' +
      '• Local businesses (tourism, recreation)\n' +
      '• Future generations (long-term sustainability)'
    )
    .setRequired(true);

  // Q5: Final argument (5 pts auto)
  const q5 = form.addMultipleChoiceItem()
    .setTitle('SEP-7: Which argument would be MOST persuasive to decision-makers considering this development?')
    .setRequired(true);

  q5.setChoices([
    q5.createChoice('Show the dollar value of ecosystem services lost vs. development gains, plus biodiversity resilience evidence', true),
    q5.createChoice('Just say "nature is beautiful and should be protected"', false),
    q5.createChoice('Threaten to protest if they develop', false),
    q5.createChoice('Ignore the economic benefits of development completely', false)
  ]);
  q5.setPoints(5);
  q5.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Evidence-based arguments that show real costs and benefits are most persuasive to decision-makers.')
      .build()
  );
  q5.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Decision-makers respond to evidence and economics. Show them what we\'d lose in measurable terms!')
      .build()
  );

  logFormInfo_(form, 'G7 C8 W2 Station 3', 25);
  return form;
}

// ============================================================================
// EXIT TICKET - BIODIVERSITY INTEGRATION (23 points, ~15 min)
// 2 NEW + 2 SPIRAL + 1 INTEGRATION + 1 SEP
// ============================================================================

function createG7C8W2ExitTicket_() {
  const form = FormApp.create('G7.C8.W2: Exit Ticket - Biodiversity Integration');

  form.setDescription(
    'EXIT TICKET: SHOW WHAT YOU LEARNED\n\n' +
    'This tests whether you understand biodiversity, ecosystem services, and conservation.\n\n' +
    '---\n' +
    'Time: About 15 minutes | Points: 23\n\n' +
    'QUESTION TYPES:\n' +
    '- 2 NEW questions (biodiversity, ecosystem services)\n' +
    '- 2 SPIRAL questions (Cycle 3: climate; Cycle 4: human impact)\n' +
    '- 1 INTEGRATION question (connects Week 1 cascades + Week 2 biodiversity)\n' +
    '- 1 SEP-7 question (argue for conservation using evidence)'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'WEEK 2 COMPLETE! Great work!\n\n' +
    'You learned why diverse ecosystems are more stable and valuable.\n\n' +
    'Key takeaways:\n' +
    '• Biodiversity = resilience (backup systems)\n' +
    '• Ecosystem services have real economic value\n' +
    '• Conservation decisions should be based on evidence\n\n' +
    'NEXT WEEK: Year-End Integration - Putting it all together!'
  );

  // --- NEW CONTENT ---
  form.addPageBreakItem()
    .setTitle('NEW CONTENT (Questions 1 & 2)')
    .setHelpText('These test what you learned TODAY about biodiversity.');

  // Q1: NEW - Biodiversity definition (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 1: NEW - Explain Biodiversity\'s Value (4 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '4: Explains redundancy/backup concept + connects to ecosystem services + gives example\n' +
      '3: Good explanation with example\n' +
      '2: Partial explanation\n' +
      '1: Vague or incorrect\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Explain WHY biodiversity increases ecosystem resilience. Use the "backup system" concept from the simulation.')
    .setHelpText(
      'Sentence starters:\n' +
      '• "Biodiversity increases resilience because..." \n' +
      '• "When one species is affected, other species can..." \n' +
      '• "For example, if we lose one pollinator species..."'
    )
    .setRequired(true);

  // Q2: NEW - Ecosystem services (4 pts auto)
  const q2 = form.addMultipleChoiceItem()
    .setTitle('A wetland provides flood control worth $4,539/hectare/year. If a 200-hectare wetland is destroyed, what is the annual cost of replacing this ONE service?')
    .setRequired(true);

  q2.setChoices([
    q2.createChoice('$907,800/year', true),
    q2.createChoice('$4,539/year', false),
    q2.createChoice('$200/year', false),
    q2.createChoice('$2,270/year', false)
  ]);
  q2.setPoints(4);
  q2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! $4,539 x 200 = $907,800 per year just for flood control!')
      .build()
  );
  q2.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Multiply: $4,539/hectare x 200 hectares = $907,800/year')
      .build()
  );

  // --- SPIRAL CONTENT ---
  form.addPageBreakItem()
    .setTitle('SPIRAL CONTENT (Questions 3 & 4)')
    .setHelpText('These review concepts from previous cycles.');

  // Q3: SPIRAL - Climate change (4 pts auto)
  const q3 = form.addMultipleChoiceItem()
    .setTitle('CYCLE 3 REVIEW: How does climate change threaten biodiversity?')
    .setRequired(true);

  q3.setChoices([
    q3.createChoice('Species that can\'t adapt to changing conditions may go extinct, reducing diversity', true),
    q3.createChoice('Climate change makes all species stronger', false),
    q3.createChoice('Climate change only affects weather, not ecosystems', false),
    q3.createChoice('Biodiversity causes climate change', false)
  ]);
  q3.setPoints(4);
  q3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Climate change is a major driver of biodiversity loss through habitat shifts, extreme weather, and changed seasons.')
      .build()
  );
  q3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Review Cycle 3: Climate change alters habitats and conditions. Species that can\'t adapt or migrate fast enough go extinct.')
      .build()
  );

  // Q4: SPIRAL - Human impact (4 pts auto)
  const q4 = form.addMultipleChoiceItem()
    .setTitle('CYCLE 4 REVIEW: What is the MAIN cause of biodiversity loss globally?')
    .setRequired(true);

  q4.setChoices([
    q4.createChoice('Habitat destruction and fragmentation', true),
    q4.createChoice('Natural disasters', false),
    q4.createChoice('Animal migration', false),
    q4.createChoice('Plant disease', false)
  ]);
  q4.setPoints(4);
  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Habitat destruction (deforestation, development, agriculture expansion) is the #1 cause of biodiversity loss.')
      .build()
  );
  q4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Review Cycle 4: Human activities, especially destroying natural habitats for development and agriculture, are the main cause.')
      .build()
  );

  // --- INTEGRATION ---
  form.addPageBreakItem()
    .setTitle('INTEGRATION (Question 5)')
    .setHelpText('This requires knowledge from BOTH Week 1 AND Week 2.');

  // Q5: Integration (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 5: INTEGRATION (4 points)')
    .setHelpText(
      '3D ASSESSMENT RUBRIC:\n' +
      '4: Connects trophic cascades + biodiversity resilience + ecosystem services\n' +
      '   SEP-6: Constructs explanation\n' +
      '   DCI: Applies LS2.C correctly\n' +
      '   CCC-7: Uses stability and change\n' +
      '3: Connects 2 concepts well\n' +
      '2: Basic connection\n' +
      '1: Vague response\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Connect Week 1 and Week 2: How do TROPHIC CASCADES and BIODIVERSITY work together to determine ecosystem health? Use examples from both weeks.')
    .setHelpText(
      'Sentence starters:\n' +
      '• "Week 1 showed that removing one species like wolves..." \n' +
      '• "Week 2 showed that diverse ecosystems are more resilient because..." \n' +
      '• "Together, this means that ecosystem health depends on..."'
    )
    .setRequired(true);

  // --- SEP-7: ENGAGING IN ARGUMENT ---
  form.addPageBreakItem()
    .setTitle('SEP-7: Engage in Argument (Question 6)')
    .setHelpText(
      'NGSS Practice: Engaging in Argument from Evidence\n' +
      'Make a compelling case using evidence!'
    );

  form.addSectionHeaderItem()
    .setTitle('Question 6: Argue from Evidence (3 points)')
    .setHelpText(
      'RUBRIC - SEP-7: Engaging in Argument\n' +
      '3 pts: Clear claim + specific evidence from BOTH weeks + sound reasoning\n' +
      '2 pts: Claim and evidence but weak reasoning\n' +
      '1 pt: Claim only or vague response\n' +
      '0 pts: No response'
    );

  form.addParagraphTextItem()
    .setTitle('A city council is deciding whether to protect or develop a forest. Using EVIDENCE from this cycle (trophic cascades, biodiversity, ecosystem services), make an argument for conservation:\n• CLAIM: State your position\n• EVIDENCE: Use specific data/examples\n• REASONING: Explain WHY this evidence supports your claim')
    .setHelpText(
      'Sentence starters:\n' +
      '• "CLAIM: The forest should be protected because..." \n' +
      '• "EVIDENCE: From Week 1, we learned that removing species causes... From Week 2, the forest provides services worth $..." \n' +
      '• "REASONING: This matters because..."'
    )
    .setRequired(true);

  logFormInfo_(form, 'G7 C8 W2 Exit Ticket', 23);
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
function testG7C8W2Hook() { createG7C8W2Hook_(); }
function testG7C8W2Station1() { createG7C8W2Station1_(); }
function testG7C8W2Station2() { createG7C8W2Station2_(); }
function testG7C8W2Station3() { createG7C8W2Station3_(); }
function testG7C8W2ExitTicket() { createG7C8W2ExitTicket_(); }
