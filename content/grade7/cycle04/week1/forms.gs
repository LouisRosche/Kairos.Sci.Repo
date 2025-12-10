/**
 * ============================================================================
 * GRADE 7 - CYCLE 4 WEEK 1: OCEAN ACIDIFICATION INVESTIGATION
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
 *   SEP-6: Constructing Explanations - Explain ocean acidification mechanism
 *   SEP-8: Obtaining Information - Interpret pH and carbon data
 *   DCI ESS3.C: Human Impacts on Earth Systems
 *   DCI PS1.B: Chemical Reactions (carbonic acid formation)
 *   CCC-4: Systems and System Models - Ocean-atmosphere carbon system
 *   CCC-7: Stability and Change - pH equilibrium disruption
 *
 * LEARNING TARGETS:
 *   1. Explain how atmospheric CO₂ affects ocean pH
 *   2. Interpret pH data and predict effects on marine life
 *   3. Apply mass balance to ocean-atmosphere carbon exchange
 *   4. Design a monitoring system for ocean acidification
 *
 * FORMS:
 *   1. Hook - The Dissolving Shells Mystery (12 pts, ~10 min)
 *   2. Station 1 - pH and Marine Life (20 pts, ~18 min)
 *   3. Station 2 - Carbon Sources and Sinks (20 pts, ~15 min)
 *   4. Station 3 - Design a Monitoring System (25 pts, ~20 min)
 *   5. Exit Ticket - Ocean Chemistry Integration (23 pts, ~15 min)
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
 *   3. Run: createAllG7C4W1Forms()
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

function createAllG7C4W1Forms() {
  Logger.log('================================================');
  Logger.log('G7 CYCLE 4 WEEK 1: OCEAN ACIDIFICATION INVESTIGATION');
  Logger.log('================================================\n');

  const forms = {
    hook: createG7C4W1Hook_(),
    station1: createG7C4W1Station1_(),
    station2: createG7C4W1Station2_(),
    station3: createG7C4W1Station3_(),
    exitTicket: createG7C4W1ExitTicket_()
  };

  Logger.log('\n================================================');
  Logger.log('ALL 5 FORMS CREATED - 100 POINTS TOTAL');
  Logger.log('================================================');

  return forms;
}

// ============================================================================
// HOOK - THE DISSOLVING SHELLS MYSTERY (12 points, ~10 min)
// Connects CO₂ learning from Cycle 3 to new ocean chemistry phenomenon
// ============================================================================

function createG7C4W1Hook_() {
  const form = FormApp.create('G7.C4.W1: Hook - The Dissolving Shells Mystery');

  form.setDescription(
    'THE DISSOLVING SHELLS MYSTERY\n\n' +
    'Scientists studying pteropods ("sea butterflies") made a disturbing discovery:\n' +
    '- Shells collected TODAY are thinner and more fragile than shells from 50 years ago\n' +
    '- Some shells are literally dissolving while the animals are still alive\n' +
    '- This is happening in oceans around the world\n\n' +
    'These tiny creatures haven\'t changed. The water has.\n\n' +
    '---\n' +
    'Time: About 10 minutes | Points: 12\n' +
    'Use what you learned in Cycle 3 about CO₂ and climate!'
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
    'Next: Investigate how pH affects marine life and what\'s causing the change.\n' +
    'You\'ll use real data from ocean monitoring stations!'
  );

  // --- PART 1: CYCLE 3 RETRIEVAL (CO₂ CONNECTION) ---
  form.addPageBreakItem()
    .setTitle('Part 1: What You Already Know from Cycle 3')
    .setHelpText('These questions check what you remember about CO₂ and the carbon cycle.');

  // Q1: CO₂ and atmosphere (3 pts auto)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('In Cycle 3, we learned that atmospheric CO₂ levels are increasing. What is the PRIMARY cause?')
    .setHelpText('Think back to the carbon cycle and human impacts.')
    .setRequired(true);

  q1.setChoices([
    q1.createChoice('Burning fossil fuels releases carbon stored for millions of years', true),
    q1.createChoice('Volcanoes are erupting more frequently', false),
    q1.createChoice('Plants are photosynthesizing less', false),
    q1.createChoice('The sun is getting hotter', false)
  ]);
  q1.setPoints(3);
  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Burning fossil fuels releases ancient carbon that was locked away underground.')
      .build()
  );
  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Review Cycle 3: Human activities, especially burning fossil fuels, are the main source of increased CO₂.')
      .build()
  );

  // --- MTSS FLAG: Check for Cycle 3 misconception about CO₂ ---
  const mtss1 = form.addMultipleChoiceItem()
    .setTitle('QUICK CHECK (Cycle 3 Review): What happens when CO₂ dissolves in water?')
    .setHelpText('This checks understanding from Cycle 3. Your answer does NOT affect your grade.')
    .setRequired(true);

  mtss1.setChoices([
    mtss1.createChoice('It disappears completely - the CO₂ is destroyed', false),  // FLAG: Conservation misconception
    mtss1.createChoice('It forms a weak acid called carbonic acid (H₂CO₃)', true),
    mtss1.createChoice('It turns into oxygen that fish can breathe', false),
    mtss1.createChoice('Nothing happens - gases cannot dissolve in water', false)
  ]);
  // Diagnostic only - omit setPoints() for ungraded items

  // --- PART 2: PHENOMENON ---
  form.addPageBreakItem()
    .setTitle('Part 2: The Phenomenon')
    .setHelpText('Observe what\'s happening to ocean shells.');

  // Q2: Observation (3 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 2 (3 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '3: Describes shell thinning/dissolving + notes timeframe (50 years) + mentions living organisms affected\n' +
      '2: Describes 2 of 3 elements\n' +
      '1: Basic description only\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Based on the scenario, describe what is happening to pteropod shells and why this is concerning.')
    .setHelpText(
      'Sentence starters:\n' +
      '• "The shells are becoming..." \n' +
      '• "This is concerning because..." \n' +
      '• "Compared to 50 years ago..."'
    )
    .setRequired(true);

  // Q3: Initial hypothesis (3 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 3 (3 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '3: Connects CO₂ increase to water chemistry change using mechanism\n' +
      '2: Mentions CO₂ or acid but mechanism incomplete\n' +
      '1: Guess without scientific reasoning\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Based on what you learned in Cycle 3 about CO₂, why might ocean water be dissolving shells now when it didn\'t 50 years ago?')
    .setHelpText(
      'Sentence starters:\n' +
      '• "I think this is connected to CO₂ because..." \n' +
      '• "If more CO₂ dissolves in the ocean, then..." \n' +
      '• "The change over 50 years suggests..."'
    )
    .setRequired(true);

  // Q4: Connection prediction (3 pts auto)
  const q4 = form.addMultipleChoiceItem()
    .setTitle('Shells are made of calcium carbonate (CaCO₃). Acids dissolve calcium carbonate. What does this suggest about ocean chemistry?')
    .setRequired(true);

  q4.setChoices([
    q4.createChoice('The ocean is becoming more acidic (lower pH)', true),
    q4.createChoice('The ocean is becoming more basic (higher pH)', false),
    q4.createChoice('The ocean temperature is changing the shells', false),
    q4.createChoice('Shells are just naturally getting weaker over time', false)
  ]);
  q4.setPoints(3);
  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! If acid dissolves shells, and shells are dissolving, the ocean must be becoming more acidic.')
      .build()
  );
  q4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Think about cause and effect: acids dissolve calcium carbonate, shells are dissolving, so the water must be more...')
      .build()
  );

  // Q5: Confidence (0 pts - diagnostic only)
  form.addScaleItem()
    .setTitle('Self-Assessment: How confident are you that you can explain the connection between CO₂ and ocean chemistry?')
    .setHelpText('FOR REFLECTION ONLY - This does NOT affect your grade. Be honest!')
    .setBounds(1, 5)
    .setLabels('Still learning', 'Got it!')
    .setRequired(true);

  logFormInfo_(form, 'G7 C4 W1 Hook', 12);
  return form;
}

// ============================================================================
// STATION 1 - pH AND MARINE LIFE (20 points, ~18 min)
// Data interpretation + impact prediction
// ============================================================================

function createG7C4W1Station1_() {
  const form = FormApp.create('G7.C4.W1: Station 1 - pH and Marine Life');

  form.setDescription(
    'YOUR MISSION: INVESTIGATE OCEAN pH CHANGES\n\n' +
    'The pH scale measures how acidic or basic a solution is.\n' +
    '- pH 7 = neutral (pure water)\n' +
    '- Below 7 = acidic (more H⁺ ions)\n' +
    '- Above 7 = basic (fewer H⁺ ions)\n\n' +
    'CRITICAL: The pH scale is LOGARITHMIC!\n' +
    'A change of 1 pH unit = 10x more acidic\n' +
    'A change of 0.1 pH unit = 26% more acidic\n\n' +
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
    'KEY INSIGHT: Ocean pH has dropped 0.1 units since 1800 = 26% more acidic.\n' +
    'This "small" change has BIG effects on shell-building organisms.\n\n' +
    'Continue to Station 2: Carbon Sources and Sinks'
  );

  // --- DATA REFERENCE ---
  form.addPageBreakItem()
    .setTitle('Reference Data: Ocean pH Over Time')
    .setHelpText(
      'HISTORICAL OCEAN pH DATA:\n' +
      '┌──────────────┬─────────┬────────────────────┐\n' +
      '│ Year         │ pH      │ Change from 1800   │\n' +
      '├──────────────┼─────────┼────────────────────┤\n' +
      '│ 1800         │ 8.25    │ baseline           │\n' +
      '│ 1900         │ 8.21    │ -0.04              │\n' +
      '│ 1950         │ 8.18    │ -0.07              │\n' +
      '│ 2000         │ 8.12    │ -0.13              │\n' +
      '│ 2020         │ 8.10    │ -0.15              │\n' +
      '│ 2100 (pred)  │ 7.95    │ -0.30 (projected)  │\n' +
      '└──────────────┴─────────┴────────────────────┘\n\n' +
      'MARINE ORGANISM pH THRESHOLDS:\n' +
      '• Pteropods (sea butterflies): Shells dissolve below pH 7.8\n' +
      '• Oysters: Larvae fail to develop below pH 7.9\n' +
      '• Coral: Calcification slows significantly below pH 8.0'
    );

  // Q1: Data interpretation (4 pts auto)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('Based on the data table, what is the overall TREND in ocean pH since 1800?')
    .setRequired(true);

  q1.setChoices([
    q1.createChoice('pH is increasing (becoming more basic)', false),
    q1.createChoice('pH is decreasing (becoming more acidic)', true),
    q1.createChoice('pH is staying constant', false),
    q1.createChoice('pH is fluctuating with no clear pattern', false)
  ]);
  q1.setPoints(4);
  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Ocean pH has dropped from 8.25 to 8.10 - becoming more acidic over time.')
      .build()
  );
  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Look at the pH values: 8.25 → 8.21 → 8.18 → 8.12 → 8.10. The numbers are getting smaller (more acidic).')
      .build()
  );

  // Q2: Magnitude understanding (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 2: Calculate the Impact (4 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '4: Correctly explains 0.1 pH = 26% more acidic + notes this is significant for organisms\n' +
      '3: Correct calculation OR correct significance\n' +
      '2: Partial understanding of logarithmic scale\n' +
      '1: Thinks 0.1 is small/insignificant\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('A 0.1 change in pH might seem small. Using the information that the pH scale is logarithmic (0.1 pH = 26% change), explain why this matters for marine life.')
    .setHelpText(
      'Sentence starters:\n' +
      '• "Even though 0.1 seems small, it actually means..." \n' +
      '• "For marine organisms, this is significant because..." \n' +
      '• "The logarithmic scale means..."'
    )
    .setRequired(true);

  // Q3: Prediction (4 pts auto)
  const q3 = form.addMultipleChoiceItem()
    .setTitle('Based on the threshold data, which organisms are MOST at risk by 2100 if pH reaches 7.95?')
    .setRequired(true);

  q3.setChoices([
    q3.createChoice('All three (pteropods, oysters, and coral) will be severely affected', true),
    q3.createChoice('Only pteropods will be affected', false),
    q3.createChoice('Only coral will be affected', false),
    q3.createChoice('None will be affected - they will adapt', false)
  ]);
  q3.setPoints(4);
  q3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! At pH 7.95, all three organisms would be below their threshold: pteropods (<7.8), oysters (<7.9), coral (<8.0).')
      .build()
  );
  q3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Compare 7.95 to each threshold: pteropods (7.8), oysters (7.9), coral (8.0). Is 7.95 below all of these?')
      .build()
  );

  // --- MISCONCEPTION CHECK ---
  form.addPageBreakItem()
    .setTitle('Critical Thinking: Common Misconceptions')
    .setHelpText('Many people misunderstand ocean acidification. Let\'s address these.');

  // Q4: Misconception - "like battery acid" (4 pts auto)
  const q4 = form.addMultipleChoiceItem()
    .setTitle('A student says: "Ocean acidification will turn the ocean into acid like battery acid (pH ~1)." Is this accurate?')
    .setRequired(true);

  q4.setChoices([
    q4.createChoice('Yes - the ocean will become extremely acidic like battery acid', false),
    q4.createChoice('No - the ocean is becoming MORE acidic but will stay basic (above pH 7)', true),
    q4.createChoice('No - the ocean is actually becoming more basic, not acidic', false),
    q4.createChoice('Yes - but only in certain areas near pollution sources', false)
  ]);
  q4.setPoints(4);
  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Even at pH 7.95, the ocean is still BASIC (above 7). "Ocean acidification" means MORE acidic, not actually acidic.')
      .build()
  );
  q4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Look at the predicted pH: 7.95. That\'s still above 7 (neutral), so still technically basic. The term "acidification" means moving TOWARD acidic.')
      .build()
  );

  // Q5: Spiral - Cycle 3 carbon cycle (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 5: SPIRAL - Cycle 3 Connection (4 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '4: Explains CO₂ absorbing into ocean + forming carbonic acid + lowering pH with clear mechanism\n' +
      '3: Mentions CO₂ absorption and acid formation\n' +
      '2: General connection without mechanism\n' +
      '1: Vague reference to CO₂\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('CYCLE 3 CONNECTION: Using what you learned about the carbon cycle, explain HOW increasing atmospheric CO₂ leads to lower ocean pH.')
    .setHelpText(
      'Sentence starters:\n' +
      '• "When CO₂ from the atmosphere dissolves in seawater..." \n' +
      '• "This forms _____ acid, which..." \n' +
      '• "The chemical equation is: CO₂ + H₂O → ..."'
    )
    .setRequired(true);

  // Q6: SEP-8 Obtaining Information (0 pts - reflection)
  form.addScaleItem()
    .setTitle('SEP-8 Reflection: How well can you now interpret pH data to predict effects on marine life?')
    .setHelpText('FOR REFLECTION ONLY - This does NOT affect your grade.')
    .setBounds(1, 5)
    .setLabels('Need more practice', 'Confident')
    .setRequired(true);

  logFormInfo_(form, 'G7 C4 W1 Station 1', 20);
  return form;
}

// ============================================================================
// STATION 2 - CARBON SOURCES AND SINKS (20 points, ~15 min)
// Mass balance + ocean-atmosphere carbon budget
// ============================================================================

function createG7C4W1Station2_() {
  const form = FormApp.create('G7.C4.W1: Station 2 - Carbon Sources and Sinks');

  form.setDescription(
    'YOUR MISSION: TRACK CARBON IN THE OCEAN-ATMOSPHERE SYSTEM\n\n' +
    'The ocean is a massive carbon SINK - it absorbs about 25% of human CO₂ emissions.\n' +
    'This sounds helpful for climate (less CO₂ in air), but it\'s causing ocean acidification.\n\n' +
    'Use conservation of mass to understand where carbon goes!\n\n' +
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
    'KEY INSIGHT: The ocean absorbs ~10 billion metric tons of CO₂ per year.\n' +
    'This helps slow atmospheric warming but accelerates ocean acidification.\n' +
    'It\'s a trade-off with no perfect solution except reducing emissions.\n\n' +
    'Continue to Station 3: Design a Monitoring System'
  );

  // --- DATA REFERENCE ---
  form.addPageBreakItem()
    .setTitle('Reference: Global Carbon Budget')
    .setHelpText(
      'ANNUAL CARBON FLOWS (billions of metric tons CO₂/year):\n\n' +
      'SOURCES (release CO₂):\n' +
      '• Fossil fuels + industry: 36 billion tons\n' +
      '• Deforestation: 4 billion tons\n' +
      '• TOTAL RELEASED: 40 billion tons/year\n\n' +
      'SINKS (absorb CO₂):\n' +
      '• Land plants/soil: 12 billion tons (30%)\n' +
      '• Ocean: 10 billion tons (25%)\n' +
      '• TOTAL ABSORBED: 22 billion tons/year\n\n' +
      'REMAINING IN ATMOSPHERE: 18 billion tons/year (45%)\n\n' +
      'KEY EQUATION:\n' +
      'Sources - Sinks = Atmospheric Accumulation\n' +
      '40 - 22 = 18 billion tons added to atmosphere annually'
    );

  // Q1: Mass balance calculation (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 1: Calculate Carbon Balance (4 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '4: Correct answer (10 billion tons) with clear work shown using the equation\n' +
      '3: Correct answer without clear work\n' +
      '2: Correct setup but calculation error\n' +
      '1: Wrong approach\n' +
      '0: No response\n\n' +
      'ANSWER: 40 - 12 - 18 = 10 billion tons'
    );

  form.addParagraphTextItem()
    .setTitle('If humans emit 40 billion tons of CO₂, land absorbs 12 billion tons, and 18 billion tons stays in the atmosphere, how much does the ocean absorb?\n\nSHOW YOUR WORK!')
    .setHelpText(
      'Sentence starters:\n' +
      '• "Using conservation of mass: Sources = Sinks + Atmosphere..." \n' +
      '• "40 = 12 + Ocean + 18, so Ocean = ..." \n' +
      '• "This means the ocean absorbs..."'
    )
    .setRequired(true);

  // Q2: Percentage calculation (4 pts auto)
  const q2 = form.addMultipleChoiceItem()
    .setTitle('What percentage of human CO₂ emissions does the ocean absorb?')
    .setHelpText('Calculate: (Ocean absorption ÷ Total emissions) × 100')
    .setRequired(true);

  q2.setChoices([
    q2.createChoice('10% (4 billion ÷ 40 billion)', false),
    q2.createChoice('25% (10 billion ÷ 40 billion)', true),
    q2.createChoice('30% (12 billion ÷ 40 billion)', false),
    q2.createChoice('45% (18 billion ÷ 40 billion)', false)
  ]);
  q2.setPoints(4);
  q2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! 10 ÷ 40 = 0.25 = 25%. The ocean absorbs one quarter of human CO₂ emissions.')
      .build()
  );
  q2.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Ocean absorbs 10 billion tons. Total is 40 billion. 10/40 = 0.25 = 25%')
      .build()
  );

  // Q3: Trade-off analysis (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 3: Analyze the Trade-off (4 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '4: Identifies both benefit (less atmospheric CO₂/warming) AND cost (ocean acidification) with clear explanation\n' +
      '3: Identifies both but explanation incomplete\n' +
      '2: Identifies only benefit OR only cost\n' +
      '1: Vague response\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('The ocean absorbing CO₂ sounds like good news for climate change. Explain WHY this is actually a double-edged sword (has both benefits AND costs).')
    .setHelpText(
      'Sentence starters:\n' +
      '• "The benefit is that..." \n' +
      '• "However, the cost is..." \n' +
      '• "This creates a trade-off because..."'
    )
    .setRequired(true);

  // Q4: Conservation check (4 pts auto)
  const q4 = form.addMultipleChoiceItem()
    .setTitle('SPIRAL - Cycle 2: A student says "The ocean destroys CO₂ when it absorbs it." Is this correct?')
    .setRequired(true);

  q4.setChoices([
    q4.createChoice('Yes - the CO₂ molecules are broken down and destroyed', false),
    q4.createChoice('No - the carbon atoms are conserved; CO₂ becomes carbonic acid (H₂CO₃)', true),
    q4.createChoice('Yes - the ocean converts CO₂ into oxygen for fish', false),
    q4.createChoice('No - the CO₂ just sits unchanged at the bottom of the ocean', false)
  ]);
  q4.setPoints(4);
  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Conservation of mass - carbon atoms are never destroyed, just rearranged. CO₂ + H₂O → H₂CO₃ (carbonic acid).')
      .build()
  );
  q4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Remember Cycle 2: atoms cannot be created or destroyed. The carbon atoms in CO₂ become carbon atoms in H₂CO₃.')
      .build()
  );

  // Q5: System thinking (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 5: System Connections (4 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '4: Correctly predicts ocean would absorb more + explains eventual saturation/limits + identifies consequences\n' +
      '3: Correct prediction with some explanation\n' +
      '2: Partial understanding of system dynamics\n' +
      '1: Incorrect prediction\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('If atmospheric CO₂ doubles, what would happen to ocean absorption? Would this continue forever? Explain using system thinking.')
    .setHelpText(
      'Sentence starters:\n' +
      '• "If atmospheric CO₂ increases, the ocean would..." \n' +
      '• "This cannot continue forever because..." \n' +
      '• "Eventually, the system would..."'
    )
    .setRequired(true);

  logFormInfo_(form, 'G7 C4 W1 Station 2', 20);
  return form;
}

// ============================================================================
// STATION 3 - DESIGN A MONITORING SYSTEM (25 points, ~20 min)
// Engineering design challenge - MS-ESS3-3
// ============================================================================

function createG7C4W1Station3_() {
  const form = FormApp.create('G7.C4.W1: Station 3 - Design a Monitoring System');

  form.setDescription(
    'ENGINEERING CHALLENGE: DESIGN AN OCEAN ACIDIFICATION MONITORING SYSTEM\n\n' +
    'Your task: Design a monitoring network that can detect and track ocean acidification\n' +
    'to help scientists and policymakers understand and respond to the problem.\n\n' +
    'This directly addresses NGSS MS-ESS3-3: Design a method for monitoring human impact.\n\n' +
    '---\n' +
    'Time: About 20 minutes | Points: 25 (highest value!)\n\n' +
    'CONSTRAINTS:\n' +
    '• Budget: $500,000 annual operating cost\n' +
    '• Coverage: Must monitor at least 3 different ocean regions\n' +
    '• Data: Must measure pH, temperature, and CO₂ levels\n' +
    '• Frequency: Data must be collected at least weekly'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Station 3 complete!\n\n' +
    'You\'ve designed a monitoring system to track human impact on the ocean.\n' +
    'Real systems like Argo floats and ocean buoys collect this data worldwide!\n\n' +
    'Continue to Exit Ticket'
  );

  // --- DESIGN OPTIONS REFERENCE ---
  form.addPageBreakItem()
    .setTitle('Available Monitoring Technologies')
    .setHelpText(
      'OPTION A: FIXED BUOYS\n' +
      '• Cost: $50,000/year per buoy\n' +
      '• Measures: pH, temp, CO₂ continuously\n' +
      '• Coverage: Single location only\n' +
      '• Pros: Reliable, real-time data, long-term\n' +
      '• Cons: Can\'t move, limited spatial coverage\n\n' +
      'OPTION B: AUTONOMOUS FLOATS (like Argo)\n' +
      '• Cost: $30,000/year per float\n' +
      '• Measures: pH, temp (no CO₂)\n' +
      '• Coverage: Drifts with currents\n' +
      '• Pros: Covers large area, many locations\n' +
      '• Cons: Unpredictable path, no CO₂ sensor\n\n' +
      'OPTION C: SHIP-BASED SURVEYS\n' +
      '• Cost: $200,000/year per expedition\n' +
      '• Measures: pH, temp, CO₂, plus samples\n' +
      '• Coverage: Chosen route\n' +
      '• Pros: Most comprehensive data, flexible\n' +
      '• Cons: Expensive, infrequent (monthly)\n\n' +
      'OPTION D: SATELLITE MONITORING\n' +
      '• Cost: $100,000/year for data access\n' +
      '• Measures: Surface temp, chlorophyll (indirect pH)\n' +
      '• Coverage: Global ocean surface\n' +
      '• Pros: Vast coverage, daily updates\n' +
      '• Cons: Surface only, indirect measurements'
    );

  // Q1: System design (7 pts manual) - highest value question
  form.addSectionHeaderItem()
    .setTitle('Question 1: Design Your Monitoring Network (7 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '7: Uses multiple methods strategically, stays within budget, explains WHY each component was chosen, addresses all constraints\n' +
      '5-6: Good combination with most constraints addressed\n' +
      '3-4: Viable design but missing some constraints or justification\n' +
      '1-2: Basic attempt, major gaps\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Design your monitoring network. Specify:\n• Which technologies you will use and how many\n• Your total cost (must be ≤$500,000)\n• Which regions you will monitor\n• How often data will be collected')
    .setHelpText(
      'Sentence starters:\n' +
      '• "My monitoring network will include..." \n' +
      '• "The total cost is $_____ calculated as..." \n' +
      '• "I chose these technologies because..."'
    )
    .setRequired(true);

  // Q2: Trade-off justification (6 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 2: Justify Your Trade-offs (6 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '6: Explicitly identifies 2+ trade-offs and explains why choices were made\n' +
      '4-5: Identifies trade-offs with some explanation\n' +
      '2-3: Mentions trade-offs but weak justification\n' +
      '1: Vague response\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('What trade-offs did you make in your design? For example, coverage vs. accuracy, cost vs. comprehensiveness, or frequency vs. depth of data.')
    .setHelpText(
      'Sentence starters:\n' +
      '• "I traded off ___ for ___ because..." \n' +
      '• "I prioritized ___ over ___ since..." \n' +
      '• "A limitation of my design is..., but this was acceptable because..."'
    )
    .setRequired(true);

  // Q3: Data use (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 3: Using the Data (4 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '4: Explains how data informs BOTH monitoring AND minimizing impact (MS-ESS3-3)\n' +
      '3: Addresses monitoring OR minimizing\n' +
      '2: General mention of data use\n' +
      '1: Vague response\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('How would scientists and policymakers USE the data from your monitoring system to minimize human impact on the ocean?')
    .setHelpText(
      'Sentence starters:\n' +
      '• "Scientists could use this data to..." \n' +
      '• "Policymakers could respond by..." \n' +
      '• "If the data shows worsening acidification, we could..."'
    )
    .setRequired(true);

  // Q4: Limitations (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 4: Identify Limitations (4 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '4: Identifies 2+ specific limitations and suggests how they could be addressed\n' +
      '3: Identifies limitations with partial solutions\n' +
      '2: Lists limitations without solutions\n' +
      '1: Vague awareness of limitations\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('What are the limitations of your monitoring system? What important information might you miss? How could future improvements address these gaps?')
    .setHelpText(
      'Sentence starters:\n' +
      '• "My system might miss ___ because..." \n' +
      '• "A limitation is ___, which could be addressed by..." \n' +
      '• "To improve, we would need..."'
    )
    .setRequired(true);

  // Q5: Scale (4 pts auto)
  const q5 = form.addMultipleChoiceItem()
    .setTitle('If ocean acidification continues to worsen, what would be the FIRST change you\'d make to your monitoring system?')
    .setRequired(true);

  q5.setChoices([
    q5.createChoice('Increase monitoring frequency to track rapid changes', true),
    q5.createChoice('Reduce the number of monitoring stations to save money', false),
    q5.createChoice('Switch entirely to satellite monitoring for cost efficiency', false),
    q5.createChoice('Stop monitoring since the problem is already identified', false)
  ]);
  q5.setPoints(4);
  q5.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! As a problem worsens, MORE frequent data helps track changes and evaluate interventions.')
      .build()
  );
  q5.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('When problems worsen, we need MORE information to understand changes and evaluate solutions, not less.')
      .build()
  );

  logFormInfo_(form, 'G7 C4 W1 Station 3', 25);
  return form;
}

// ============================================================================
// EXIT TICKET - OCEAN CHEMISTRY INTEGRATION (23 points, ~15 min)
// 2 NEW + 2 SPIRAL + 1 INTEGRATION + 1 SEP
// ============================================================================

function createG7C4W1ExitTicket_() {
  const form = FormApp.create('G7.C4.W1: Exit Ticket - Ocean Chemistry Integration');

  form.setDescription(
    'EXIT TICKET: SHOW WHAT YOU LEARNED\n\n' +
    'This tests whether you can connect CO₂, ocean chemistry, and human impact.\n\n' +
    '---\n' +
    'Time: About 15 minutes | Points: 23\n\n' +
    'QUESTION TYPES:\n' +
    '- 2 NEW questions (Cycle 4 content - ocean acidification)\n' +
    '- 2 SPIRAL questions (Cycle 3 review - carbon cycle, climate)\n' +
    '- 1 INTEGRATION question (connects Cycles 3 & 4)\n' +
    '- 1 SEP-6 question (constructing explanations)'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'WEEK 1 COMPLETE! Congratulations!\n\n' +
    'You connected atmospheric CO₂ to ocean chemistry.\n\n' +
    'Key takeaways:\n' +
    '• Ocean absorbs 25% of human CO₂ emissions\n' +
    '• This forms carbonic acid, lowering pH\n' +
    '• Small pH changes have big effects on marine life\n' +
    '• Monitoring helps us track and respond to impacts\n\n' +
    'NEXT WEEK: What happens when nutrients run off into waterways?'
  );

  // --- NEW CONTENT ---
  form.addPageBreakItem()
    .setTitle('NEW CONTENT (Questions 1 & 2)')
    .setHelpText('These test what you learned TODAY about ocean acidification.');

  // Q1: NEW - Explain ocean acidification (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 1: NEW - Explain Ocean Acidification (4 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '4: Complete mechanism: CO₂ dissolves → forms H₂CO₃ → releases H⁺ → lowers pH → affects calcifying organisms\n' +
      '3: Most steps present\n' +
      '2: Partial mechanism\n' +
      '1: Vague or incomplete\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Explain the complete mechanism of ocean acidification, from CO₂ in the atmosphere to effects on marine organisms.')
    .setHelpText(
      'Sentence starters:\n' +
      '• "First, atmospheric CO₂..." \n' +
      '• "When CO₂ dissolves in seawater, it..." \n' +
      '• "This affects marine organisms because..."'
    )
    .setRequired(true);

  // Q2: NEW - pH interpretation (4 pts auto)
  const q2 = form.addMultipleChoiceItem()
    .setTitle('Ocean pH has dropped from 8.25 to 8.10 since 1800. Why is this significant even though it\'s "only" 0.15 units?')
    .setRequired(true);

  q2.setChoices([
    q2.createChoice('The pH scale is logarithmic, so 0.15 units = ~41% increase in acidity', true),
    q2.createChoice('Any change in pH automatically kills all marine life', false),
    q2.createChoice('0.15 is actually not significant - scientists are overreacting', false),
    q2.createChoice('The change is linear, so it represents a 15% increase in acidity', false)
  ]);
  q2.setPoints(4);
  q2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! The logarithmic scale means "small" pH changes represent large changes in H⁺ concentration. 0.15 units ≈ 41% more acidic.')
      .build()
  );
  q2.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Remember: pH is logarithmic. Each 0.1 unit change = 26% change. So 0.15 units = about 41% more acidic (not 15%).')
      .build()
  );

  // --- SPIRAL CONTENT ---
  form.addPageBreakItem()
    .setTitle('SPIRAL CONTENT (Questions 3 & 4)')
    .setHelpText('These review concepts from Cycle 3.');

  // Q3: SPIRAL - Carbon cycle (4 pts auto)
  const q3 = form.addMultipleChoiceItem()
    .setTitle('CYCLE 3 REVIEW: Which process REMOVES carbon from the atmosphere?')
    .setRequired(true);

  q3.setChoices([
    q3.createChoice('Burning fossil fuels', false),
    q3.createChoice('Deforestation', false),
    q3.createChoice('Photosynthesis by plants and ocean phytoplankton', true),
    q3.createChoice('Decomposition of organic matter', false)
  ]);
  q3.setPoints(4);
  q3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Photosynthesis removes CO₂ from the atmosphere: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂')
      .build()
  );
  q3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Photosynthesis is the main process that REMOVES CO₂. Burning, deforestation, and decomposition all RELEASE CO₂.')
      .build()
  );

  // Q4: SPIRAL - Greenhouse effect (4 pts auto)
  const q4 = form.addMultipleChoiceItem()
    .setTitle('CYCLE 3 REVIEW: Why is CO₂ called a "greenhouse gas"?')
    .setRequired(true);

  q4.setChoices([
    q4.createChoice('It is green in color', false),
    q4.createChoice('It absorbs infrared radiation and re-emits it, trapping heat', true),
    q4.createChoice('It is only found in greenhouses', false),
    q4.createChoice('It helps plants grow faster', false)
  ]);
  q4.setPoints(4);
  q4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Review Cycle 3: greenhouse gases absorb and re-emit infrared radiation, trapping heat in the atmosphere like a greenhouse traps heat.')
      .build()
  );
  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! CO₂ molecules absorb infrared (heat) radiation and re-emit it in all directions, including back toward Earth\'s surface.')
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
      '4: Explains both effects with mechanism + notes feedback relationship\n' +
      '   SEP-6: Constructs explanation using evidence\n' +
      '   DCI: Applies ESS3.C (human impacts) correctly\n' +
      '   CCC: Uses systems thinking\n' +
      '3: Explains both effects\n' +
      '2: Explains one effect well\n' +
      '1: Vague connection\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Burning fossil fuels releases CO₂. Explain TWO different environmental consequences:\n1. How does this affect ATMOSPHERE temperature? (Cycle 3)\n2. How does this affect OCEAN chemistry? (Cycle 4)')
    .setHelpText(
      'Sentence starters:\n' +
      '• "In the atmosphere, the released CO₂..." \n' +
      '• "In the ocean, when CO₂ dissolves..." \n' +
      '• "Both effects are connected because..."'
    )
    .setRequired(true);

  // --- SEP-6: CONSTRUCTING EXPLANATIONS ---
  form.addPageBreakItem()
    .setTitle('SEP-6: Construct an Explanation (Question 6)')
    .setHelpText(
      'NGSS Practice: Constructing Explanations\n' +
      'Good scientists explain phenomena using evidence and reasoning!'
    );

  form.addSectionHeaderItem()
    .setTitle('Question 6: Construct an Explanation (3 points)')
    .setHelpText(
      'RUBRIC - SEP-6: Constructing Explanations\n' +
      '3 pts: Uses Claim-Evidence-Reasoning structure with specific data\n' +
      '2 pts: Has claim and evidence but weak reasoning\n' +
      '1 pt: Claim only or vague response\n' +
      '0 pts: No response'
    );

  form.addParagraphTextItem()
    .setTitle('A classmate claims: "Ocean acidification isn\'t a big deal because the ocean is still technically basic (above pH 7)."\n\nConstruct an explanation to address this claim using the Claim-Evidence-Reasoning format:\n• CLAIM: State whether you agree or disagree\n• EVIDENCE: Use specific data from today\'s stations\n• REASONING: Explain WHY the evidence supports your claim')
    .setHelpText(
      'Sentence starters:\n' +
      '• "CLAIM: I disagree because..." \n' +
      '• "EVIDENCE: The data shows..." \n' +
      '• "REASONING: This matters because..."'
    )
    .setRequired(true);

  logFormInfo_(form, 'G7 C4 W1 Exit Ticket', 23);
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
function testG7C4W1Hook() { createG7C4W1Hook_(); }
function testG7C4W1Station1() { createG7C4W1Station1_(); }
function testG7C4W1Station2() { createG7C4W1Station2_(); }
function testG7C4W1Station3() { createG7C4W1Station3_(); }
function testG7C4W1ExitTicket() { createG7C4W1ExitTicket_(); }
