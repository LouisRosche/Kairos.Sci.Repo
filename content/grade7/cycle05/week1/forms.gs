/**
 * ============================================================================
 * GRADE 7 - CYCLE 5 WEEK 1: WEATHER FRONTS & AIR MASS COLLISIONS
 * 5 Forms | 100 Points Total | ~75 Minutes
 * ============================================================================
 *
 * NGSS ALIGNMENT:
 * ---------------
 * Primary:    MS-ESS2-5 - Collect data to provide evidence for how the motions
 *             and complex interactions of air masses result in changes in
 *             weather conditions
 *
 * Secondary:  MS-ESS2-6 - Develop and use a model to describe how unequal
 *             heating and rotation of the Earth cause patterns of atmospheric
 *             and oceanic circulation
 *
 * Spiral:     MS-ESS3-5 - Climate change factors (Cycle 3)
 *             MS-ESS3-3 - Human impact on environment (Cycle 4)
 *             MS-ESS2-4 - Water cycle (Cycle 4)
 *
 * 3-DIMENSIONAL LEARNING:
 * -----------------------
 * SEP-4: Analyzing and Interpreting Data
 *        - Analyze weather maps to identify patterns in air mass movement
 *        - Interpret pressure and temperature data from multiple sources
 *
 * SEP-2: Developing and Using Models
 *        - Model frontal boundary interactions using cross-section diagrams
 *        - Use air mass classification system to predict weather
 *
 * DCI ESS2.C: The Roles of Water in Earth's Surface Processes
 *        - Water vapor in air masses affects weather at fronts
 *
 * DCI ESS2.D: Weather and Climate
 *        - Air masses have distinct temperature and humidity properties
 *        - Fronts form where air masses with different properties meet
 *
 * CCC-1: Patterns
 *        - Recognize patterns in air mass classification (mT, cT, mP, cP)
 *        - Identify recurring patterns in frontal weather
 *
 * CCC-2: Cause and Effect
 *        - Air mass collisions cause frontal weather changes
 *        - Pressure differences cause wind and air movement
 *
 * CCC-4: Systems and System Models
 *        - Atmosphere as an interconnected system of air masses
 *        - Weather as emergent property of air mass interactions
 *
 * LEARNING TARGETS:
 * -----------------
 * LT1: Identify characteristics of different air mass types (mT, cT, mP, cP)
 * LT2: Explain how frontal boundaries form where air masses meet
 * LT3: Interpret weather maps showing pressure systems and fronts
 * LT4: Predict weather changes based on approaching fronts
 *
 * SPIRAL FROM PREVIOUS WEEK (C4.W3):
 * ----------------------------------
 * - Water cycle processes (evaporation, condensation)
 * - Energy transfer in Earth systems
 * - Human impacts on natural cycles
 *
 * FORMS:
 * ------
 *   1. Hook - The Sudden Storm Mystery (12 pts, ~10 min)
 *   2. Station 1 - Air Mass Properties (20 pts, ~18 min)
 *   3. Station 2 - Frontal Boundary Modeling (20 pts, ~15 min)
 *   4. Station 3 - Pressure System Analysis (25 pts, ~20 min)
 *   5. Exit Ticket - Air Mass Integration (23 pts, ~15 min)
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
 *   3. Run: createAllG7C5W1Forms()
 *   4. Check Logger (View > Logs) for form URLs
 *   5. MANUAL CONFIG REQUIRED (Settings > Quizzes in each form):
 *      - Release grade: "Immediately after each submission"
 *      - Respondent can see: Check ALL boxes
 *      - Shuffle option order: ON
 *   6. Embed forms in LMS using the embed URLs from Logger
 */

// ============================================================================
// HELPER FUNCTION - Standardized logging for all forms
// ============================================================================

/**
 * Logs form information in a standardized format.
 * @param {GoogleAppsScript.Forms.Form} form - The form object
 * @param {string} name - Display name for the form
 * @param {number} points - Total points for the form
 */
function logFormInfo_(form, name, points) {
  const editUrl = form.getEditUrl();
  const pubUrl = form.getPublishedUrl();
  const embedUrl = pubUrl.replace('/viewform', '/viewform?embedded=true');

  Logger.log('----------------------------------------');
  Logger.log(name + ' (' + points + ' pts)');
  Logger.log('Edit:  ' + editUrl);
  Logger.log('Embed: ' + embedUrl);
}

// ============================================================================
// MAIN FUNCTION
// ============================================================================

function createAllG7C5W1Forms() {
  Logger.log('================================================');
  Logger.log('G7 CYCLE 5 WEEK 1: WEATHER FRONTS & AIR MASS COLLISIONS');
  Logger.log('================================================\n');

  const forms = {
    hook: createG7C5W1Hook_(),
    station1: createG7C5W1Station1_(),
    station2: createG7C5W1Station2_(),
    station3: createG7C5W1Station3_(),
    exitTicket: createG7C5W1ExitTicket_()
  };

  Logger.log('\n================================================');
  Logger.log('ALL 5 FORMS CREATED - 100 POINTS TOTAL');
  Logger.log('================================================');

  return forms;
}

// ============================================================================
// HOOK - THE SUDDEN STORM MYSTERY (12 points, ~10 min)
// Connects climate learning from Cycles 3-4 to weather phenomena
// ============================================================================

function createG7C5W1Hook_() {
  const form = FormApp.create('G7.C5.W1: Hook - The Sudden Storm Mystery');

  form.setDescription(
    'THE SUDDEN STORM MYSTERY\n\n' +
    'On a February morning in 2011, Chicago residents woke to partly cloudy skies.\n' +
    'By that evening, a historic blizzard had buried the city under 21.2 inches of snow.\n\n' +
    'Key observations:\n' +
    '• Temperature dropped 25°F in just 4 hours\n' +
    '• Wind speeds reached 70 mph\n' +
    '• Thunder and lightning occurred DURING the snowstorm\n' +
    '• Cities just 50 miles away got only 6 inches of snow\n\n' +
    'What invisible forces created such a dramatic weather change?\n\n' +
    '---\n' +
    'Time: About 10 minutes | Points: 12\n' +
    'Think about what you learned about the atmosphere in Cycles 3-4!'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Hook submitted! You\'re ready for Station 1.\n\n' +
    'Next: Learn about air masses and how their properties affect weather.\n' +
    'You\'ll classify different air masses and predict their behavior!'
  );

  // --- MTSS DIAGNOSTIC (0 points) ---
  // Check prior knowledge from Cycle 4 - does NOT affect grade
  const mtss1 = form.addMultipleChoiceItem()
    .setTitle('QUICK CHECK (Cycle 4 Review): What happens to water when it evaporates from the ocean?')
    .setHelpText('This checks your understanding from Cycle 4. Your answer does NOT affect your grade.')
    .setRequired(true);

  mtss1.setChoices([
    mtss1.createChoice('It becomes water vapor (gas) in the air', true),
    mtss1.createChoice('It disappears completely', false),
    mtss1.createChoice('It turns into salt', false),
    mtss1.createChoice('It sinks to the ocean floor', false)
  ]);
  // Diagnostic only - omit setPoints() for ungraded items
  mtss1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('✓ Great! You remember that evaporation adds water vapor to air. This is key for understanding humid air masses!')
      .build()
  );
  mtss1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Review: Water evaporates (becomes gas) and enters the air. This is how air over oceans becomes humid!')
      .build()
  );

  // --- PART 1: CYCLE 3-4 RETRIEVAL ---
  form.addPageBreakItem()
    .setTitle('Part 1: What You Already Know')
    .setHelpText('These questions check your understanding from previous cycles.');

  // Q1: Atmosphere and energy (3 pts auto)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('From Cycle 3: What is the ultimate source of energy that drives weather patterns on Earth?')
    .setHelpText('Think about what powers the water cycle and air movement.')
    .setRequired(true);

  q1.setChoices([
    q1.createChoice('The Sun', true),
    q1.createChoice('Earth\'s core', false),
    q1.createChoice('The Moon\'s gravity', false),
    q1.createChoice('Ocean currents', false)
  ]);
  q1.setPoints(3);
  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Solar energy heats Earth\'s surface unevenly, creating air movement and weather.')
      .build()
  );
  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Review Cycle 3: The Sun provides the energy that heats air and drives atmospheric circulation.')
      .build()
  );

  // --- PART 2: PHENOMENON EXPLORATION ---
  form.addPageBreakItem()
    .setTitle('Part 2: Exploring the Blizzard Mystery')
    .setHelpText('Use the storm observations to make predictions.');

  // Q2: Temperature change observation (3 pts auto)
  const q2 = form.addMultipleChoiceItem()
    .setTitle('The temperature dropped 25°F in 4 hours. What does this rapid change suggest?')
    .setHelpText('Normal daily temperature changes are usually 10-15°F over many hours.')
    .setRequired(true);

  q2.setChoices([
    q2.createChoice('A large mass of very cold air moved in quickly', true),
    q2.createChoice('The Sun suddenly got weaker', false),
    q2.createChoice('Chicago moved further from the equator', false),
    q2.createChoice('The ocean got colder', false)
  ]);
  q2.setPoints(3);
  q2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Exactly! This rapid cooling indicates a new air mass with very different properties arrived.')
      .build()
  );
  q2.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Think about what could cause such a sudden temperature change. What if different air arrived?')
      .build()
  );

  // Q3: Thunder-snow phenomenon (3 pts auto)
  const q3 = form.addMultipleChoiceItem()
    .setTitle('Thunder and lightning during a snowstorm is very rare. What conditions might cause this?')
    .setHelpText('Thunder requires rapid air movement and temperature differences.')
    .setRequired(true);

  q3.setChoices([
    q3.createChoice('Two very different air masses colliding violently', true),
    q3.createChoice('Snow clouds that are electrically charged', false),
    q3.createChoice('Cold temperatures making static electricity', false),
    q3.createChoice('High altitude snow reflecting sunlight', false)
  ]);
  q3.setPoints(3);
  q3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Right! "Thunder-snow" happens when warm, moist air is rapidly forced upward by very cold air.')
      .build()
  );
  q3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Thunder-snow is rare because it requires extreme conditions where air masses with very different temperatures collide.')
      .build()
  );

  // --- SECTION HEADER WITH RUBRIC for open-response ---
  form.addSectionHeaderItem()
    .setTitle('Question 4 (3 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '3 pts: Explains geographic or atmospheric factors affecting snow distribution\n' +
      '2 pts: Mentions location difference with partial reasoning\n' +
      '1 pt:  Vague response about distance or location\n' +
      '0 pts: No response or unrelated answer'
    );

  // Q4: Prediction (open response, 3 pts manual)
  const q4 = form.addParagraphTextItem()
    .setTitle('PREDICT: Why might cities just 50 miles away have gotten so much less snow?')
    .setHelpText(
      'Use what you know about weather and location.\n\n' +
      'SENTENCE STARTERS:\n' +
      '• Cities 50 miles away may have received less snow because...\n' +
      '• The difference in snowfall could be explained by...\n' +
      '• Geographic or atmospheric factors that might affect this include...\n\n' +
      'WORD BANK: air mass, front, temperature, moisture, location, boundary, collision'
    )
    .setRequired(true);

  q4.setValidation(
    FormApp.createParagraphTextValidation()
      .requireTextLengthGreaterThanOrEqualTo(50)
      .build()
  );

  // --- SELF-ASSESSMENT (0 points) ---
  form.addPageBreakItem()
    .setTitle('Self-Assessment')
    .setHelpText('Rate your understanding. This does NOT affect your grade.');

  const selfAssess = form.addScaleItem()
    .setTitle('How confident do you feel about explaining how weather can change suddenly?')
    .setHelpText('Be honest! This helps your teacher know what to review.')
    .setBounds(1, 5)
    .setLabels('Not confident yet', 'Very confident')
    .setRequired(true);
  // Diagnostic only - omit setPoints() for ungraded items

  logFormInfo_(form, 'G7.C5.W1 Hook', 12);
  return form;
}

// ============================================================================
// STATION 1 - AIR MASS PROPERTIES (20 points, ~18 min)
// Students classify air masses by source region and predict characteristics
// ============================================================================

function createG7C5W1Station1_() {
  const form = FormApp.create('G7.C5.W1: Station 1 - Air Mass Properties');

  form.setDescription(
    'STATION 1: AIR MASS PROPERTIES\n\n' +
    'An AIR MASS is a huge body of air that has similar temperature and humidity\n' +
    'throughout. Air masses form when air sits over a region long enough to take on\n' +
    'that region\'s characteristics.\n\n' +
    'CLASSIFICATION SYSTEM:\n' +
    '• First letter = moisture: m (maritime/wet) or c (continental/dry)\n' +
    '• Second letter = temperature: P (Polar/cold) or T (Tropical/warm)\n\n' +
    'Examples:\n' +
    '• mT = maritime Tropical = warm and humid (forms over tropical ocean)\n' +
    '• cP = continental Polar = cold and dry (forms over arctic land)\n\n' +
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
    'Station 1 complete! You\'ve learned to classify air masses.\n\n' +
    'Next at Station 2: See what happens when these different air masses collide!'
  );

  // --- MTSS DIAGNOSTIC (0 points) ---
  const mtss1 = form.addMultipleChoiceItem()
    .setTitle('QUICK CHECK: Which location would have MORE water vapor in the air?')
    .setHelpText('This checks your understanding of humidity. Does NOT affect your grade.')
    .setRequired(true);

  mtss1.setChoices([
    mtss1.createChoice('Above the middle of the Pacific Ocean', true),
    mtss1.createChoice('Above the Sahara Desert', false),
    mtss1.createChoice('Both would have the same amount', false),
    mtss1.createChoice('Neither has water vapor', false)
  ]);
  // Diagnostic only - omit setPoints() for ungraded items
  mtss1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('✓ Correct! Oceans add moisture to air through evaporation. This is why "maritime" air is humid.')
      .build()
  );
  mtss1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Think about water sources: Oceans have lots of water evaporating, deserts have very little.')
      .build()
  );

  // Q1: Maritime definition (3 pts auto)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('An air mass labeled "maritime" (m) would have formed over:')
    .setHelpText('Maritime relates to the sea.')
    .setRequired(true);

  q1.setChoices([
    q1.createChoice('An ocean or large body of water', true),
    q1.createChoice('A large continent', false),
    q1.createChoice('Mountains', false),
    q1.createChoice('A desert', false)
  ]);
  q1.setPoints(3);
  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! "Maritime" means ocean-related. These air masses pick up moisture from the water.')
      .build()
  );
  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('"Maritime" comes from the Latin word for sea. These air masses form over water and are humid.')
      .build()
  );

  // Q2: cP classification (4 pts auto)
  const q2 = form.addMultipleChoiceItem()
    .setTitle('An air mass classified as "cP" (continental Polar) would be:')
    .setHelpText('Remember: c = continental (over land), P = Polar (from high latitudes)')
    .setRequired(true);

  q2.setChoices([
    q2.createChoice('Cold and dry', true),
    q2.createChoice('Cold and humid', false),
    q2.createChoice('Warm and dry', false),
    q2.createChoice('Warm and humid', false)
  ]);
  q2.setPoints(4);
  q2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Continental = dry (over land), Polar = cold (from arctic regions).')
      .build()
  );
  q2.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Break down the code: c = continental (dry, from land), P = Polar (cold, from high latitudes).')
      .build()
  );

  // Q3: mT source region (3 pts auto)
  const q3 = form.addMultipleChoiceItem()
    .setTitle('Which location would most likely be the source region for an mT (maritime Tropical) air mass?')
    .setHelpText('Think about where air would become warm AND humid.')
    .setRequired(true);

  q3.setChoices([
    q3.createChoice('Gulf of Mexico', true),
    q3.createChoice('Canadian Arctic', false),
    q3.createChoice('Sahara Desert', false),
    q3.createChoice('Siberia', false)
  ]);
  q3.setPoints(3);
  q3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! The Gulf of Mexico is warm ocean water - perfect for forming warm, humid air masses.')
      .build()
  );
  q3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('mT needs a warm (Tropical) water source (maritime). The Gulf of Mexico fits both requirements.')
      .build()
  );

  // Q4: Weather prediction from air mass (4 pts auto)
  const q4 = form.addMultipleChoiceItem()
    .setTitle('If a weather forecast says "a cP air mass is moving down from Canada," what weather would you predict?')
    .setHelpText('Apply what you know about cP characteristics.')
    .setRequired(true);

  q4.setChoices([
    q4.createChoice('Cold temperatures and clear, dry skies', true),
    q4.createChoice('Warm temperatures and rain', false),
    q4.createChoice('Hot temperatures and humidity', false),
    q4.createChoice('Cool temperatures and fog', false)
  ]);
  q4.setPoints(4);
  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Right! cP brings cold, dry conditions. Without moisture, expect clear skies.')
      .build()
  );
  q4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('cP = continental (dry) + Polar (cold). Dry air typically means clear skies.')
      .build()
  );

  // Q5: Chicago blizzard connection (3 pts auto)
  const q5 = form.addMultipleChoiceItem()
    .setTitle('The Chicago blizzard occurred when cP air from Canada met mT air from the Gulf. Which statement is TRUE?')
    .setHelpText('Think about the temperature AND moisture differences.')
    .setRequired(true);

  q5.setChoices([
    q5.createChoice('The mT air provided moisture; the cP air provided the cold for snow', true),
    q5.createChoice('Both air masses were cold, so they combined to make extra cold weather', false),
    q5.createChoice('Both air masses were wet, creating double the precipitation', false),
    q5.createChoice('The cP air was warm enough to melt the mT air', false)
  ]);
  q5.setPoints(3);
  q5.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Exactly! mT brought warm, moist air. cP brought the cold. When they met - massive snowfall.')
      .build()
  );
  q5.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('mT = warm + wet, cP = cold + dry. Snow needs moisture (from mT) and cold (from cP).')
      .build()
  );

  // --- SECTION HEADER WITH RUBRIC for open-response ---
  form.addSectionHeaderItem()
    .setTitle('Question 6 (3 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '3 pts: Correctly identifies cP AND explains both letters (continental = dry, Polar = cold)\n' +
      '2 pts: Correct classification with partial explanation\n' +
      '1 pt:  Correct classification only, no explanation\n' +
      '0 pts: Incorrect classification or no response'
    );

  // Q6: Classification practice (3 pts, open response)
  const q6 = form.addParagraphTextItem()
    .setTitle('CLASSIFY: An air mass forms over the frozen tundra of northern Russia. What would its classification be? Explain your reasoning using the classification system.')
    .setHelpText(
      'State the two-letter code and explain each letter.\n\n' +
      'SENTENCE STARTERS:\n' +
      '• This air mass would be classified as ___ because...\n' +
      '• The first letter is ___ because...\n' +
      '• The second letter is ___ because...\n\n' +
      'WORD BANK: continental, maritime, polar, tropical, cold, warm, dry, humid, land, water'
    )
    .setRequired(true);

  q6.setValidation(
    FormApp.createParagraphTextValidation()
      .requireTextLengthGreaterThanOrEqualTo(40)
      .build()
  );

  // --- SELF-ASSESSMENT (0 points) ---
  form.addPageBreakItem()
    .setTitle('Self-Assessment')
    .setHelpText('Rate your understanding. This does NOT affect your grade.');

  const selfAssess = form.addScaleItem()
    .setTitle('How confident do you feel about classifying air masses using the mT/cP/mP/cT system?')
    .setHelpText('Be honest! This helps your teacher plan support.')
    .setBounds(1, 5)
    .setLabels('Not confident yet', 'Very confident')
    .setRequired(true);
  // Diagnostic only - omit setPoints() for ungraded items

  logFormInfo_(form, 'G7.C5.W1 Station 1', 20);
  return form;
}

// ============================================================================
// STATION 2 - FRONTAL BOUNDARY MODELING (20 points, ~15 min)
// Students learn about cold, warm, and stationary fronts
// ============================================================================

function createG7C5W1Station2_() {
  const form = FormApp.create('G7.C5.W1: Station 2 - Frontal Boundary Modeling');

  form.setDescription(
    'STATION 2: FRONTAL BOUNDARY MODELING\n\n' +
    'A FRONT is the boundary where two different air masses meet.\n' +
    'Because the air masses have different properties, they don\'t easily mix.\n\n' +
    'THREE TYPES OF FRONTS:\n\n' +
    '• COLD FRONT: Cold air pushes under warm air (like a bulldozer)\n' +
    '  → Symbol: Blue triangles pointing direction of movement\n' +
    '  → Weather: Fast-moving storms, then clearing\n\n' +
    '• WARM FRONT: Warm air slides up over cold air (like a ramp)\n' +
    '  → Symbol: Red semicircles pointing direction of movement\n' +
    '  → Weather: Long periods of steady rain, then warming\n\n' +
    '• STATIONARY FRONT: Neither air mass advances\n' +
    '  → Symbol: Alternating triangles and semicircles\n' +
    '  → Weather: Prolonged cloudy, rainy conditions\n\n' +
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
    'Station 2 complete! You now understand frontal boundaries.\n\n' +
    'Next at Station 3: Analyze pressure systems and read weather maps!'
  );

  // --- MTSS DIAGNOSTIC (0 points) ---
  const mtss1 = form.addMultipleChoiceItem()
    .setTitle('QUICK CHECK: Which is MORE dense (heavier per volume)?')
    .setHelpText('This checks your understanding of density. Does NOT affect your grade.')
    .setRequired(true);

  mtss1.setChoices([
    mtss1.createChoice('Cold air', true),
    mtss1.createChoice('Warm air', false),
    mtss1.createChoice('They have the same density', false),
    mtss1.createChoice('Air doesn\'t have density', false)
  ]);
  // Diagnostic only - omit setPoints() for ungraded items
  mtss1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('✓ Correct! Cold air molecules are closer together, making cold air denser. This is why cold air sinks!')
      .build()
  );
  mtss1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Remember: Cold = molecules slow down and pack together = denser. This is key for understanding fronts!')
      .build()
  );

  // Q1: Cold front mechanism (4 pts auto)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('At a cold front, the cold air mass:')
    .setHelpText('Cold air is denser (heavier) than warm air.')
    .setRequired(true);

  q1.setChoices([
    q1.createChoice('Pushes under the warm air, forcing it upward quickly', true),
    q1.createChoice('Rises over the warm air slowly', false),
    q1.createChoice('Mixes evenly with the warm air', false),
    q1.createChoice('Pushes the warm air sideways', false)
  ]);
  q1.setPoints(4);
  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Cold air is denser, so it wedges under warm air, forcing it to rise rapidly. This creates intense but short-lived storms.')
      .build()
  );
  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Think about density: Cold air is denser (heavier) than warm air. It sinks and pushes under the warmer air.')
      .build()
  );

  // Q2: Warm front weather (4 pts auto)
  const q2 = form.addMultipleChoiceItem()
    .setTitle('What type of weather is typically associated with an approaching warm front?')
    .setHelpText('Warm air rises gradually over cold air at a gentle slope.')
    .setRequired(true);

  q2.setChoices([
    q2.createChoice('Extended periods of steady, light rain', true),
    q2.createChoice('Sudden, intense thunderstorms', false),
    q2.createChoice('Clear, sunny skies', false),
    q2.createChoice('Heavy snow only', false)
  ]);
  q2.setPoints(4);
  q2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Warm fronts move slowly and produce gentle, prolonged precipitation as warm air gradually rises.')
      .build()
  );
  q2.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Warm fronts are gradual - warm air slowly slides up a "ramp" of cold air. This creates steady, long-lasting rain.')
      .build()
  );

  // Q3: Front symbol identification (3 pts auto)
  const q3 = form.addMultipleChoiceItem()
    .setTitle('On a weather map, you see a line with blue triangles pointing east. What does this represent?')
    .setHelpText('The triangles point in the direction the front is moving.')
    .setRequired(true);

  q3.setChoices([
    q3.createChoice('A cold front moving east', true),
    q3.createChoice('A warm front moving east', false),
    q3.createChoice('A cold front moving west', false),
    q3.createChoice('A stationary front', false)
  ]);
  q3.setPoints(3);
  q3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Blue triangles = cold front. Triangles point in the direction of movement.')
      .build()
  );
  q3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Cold fronts use blue triangles; warm fronts use red semicircles. The symbols point in the direction of movement.')
      .build()
  );

  // Q4: Chicago blizzard front type (3 pts auto)
  const q4 = form.addMultipleChoiceItem()
    .setTitle('The Chicago blizzard happened when cold Canadian air rapidly pushed into the region, forcing warm Gulf air upward. This was:')
    .setHelpText('Consider: Which air mass was doing the "pushing"?')
    .setRequired(true);

  q4.setChoices([
    q4.createChoice('A cold front', true),
    q4.createChoice('A warm front', false),
    q4.createChoice('A stationary front', false),
    q4.createChoice('Not a front at all', false)
  ]);
  q4.setPoints(3);
  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Right! The cold air was advancing, pushing under the warm air - a classic cold front. The rapid uplift caused the intense storm.')
      .build()
  );
  q4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('The cold air was "pushing" - advancing into the warm air region. When cold air advances, it\'s a cold front.')
      .build()
  );

  // Q5: Rapid weather changes (3 pts auto)
  const q5 = form.addMultipleChoiceItem()
    .setTitle('Why do cold fronts typically cause more rapid weather changes than warm fronts?')
    .setHelpText('Think about how each type of air moves relative to the other.')
    .setRequired(true);

  q5.setChoices([
    q5.createChoice('Cold air moves faster because it\'s denser and hugs the ground', true),
    q5.createChoice('Cold air is lighter so it moves more quickly', false),
    q5.createChoice('Warm fronts don\'t cause any weather changes', false),
    q5.createChoice('Cold fronts are always associated with hurricanes', false)
  ]);
  q5.setPoints(3);
  q5.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Cold air is denser, so it hugs the ground and can push forward rapidly like a wedge, causing quick weather changes.')
      .build()
  );
  q5.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Density matters! Cold air is denser, so it stays low and pushes forward efficiently. Warm air rises gradually over cold air.')
      .build()
  );

  // --- SECTION HEADER WITH RUBRIC for open-response ---
  form.addSectionHeaderItem()
    .setTitle('Question 6 (3 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '3 pts: Correctly uses density, rises, AND condenses in a logical sequence\n' +
      '2 pts: Uses 2 of 3 terms correctly with reasonable explanation\n' +
      '1 pt:  Uses 1 term correctly or vague explanation\n' +
      '0 pts: No response or incorrect use of all terms'
    );

  // Q6: Model creation (3 pts, open response)
  const q6 = form.addParagraphTextItem()
    .setTitle('MODEL: Describe what happens to the warm, moist air when a cold front arrives. Use the terms "density," "rises," and "condenses" in your explanation.')
    .setHelpText(
      'Explain the process step by step.\n\n' +
      'SENTENCE STARTERS:\n' +
      '• When a cold front arrives, the warm air...\n' +
      '• Because cold air has greater density, it...\n' +
      '• As the warm air rises, the water vapor...\n\n' +
      'WORD BANK: density, rises, condenses, clouds, precipitation, pushes, wedge, forced, upward'
    )
    .setRequired(true);

  q6.setValidation(
    FormApp.createParagraphTextValidation()
      .requireTextLengthGreaterThanOrEqualTo(60)
      .build()
  );

  // --- SELF-ASSESSMENT (0 points) ---
  form.addPageBreakItem()
    .setTitle('Self-Assessment')
    .setHelpText('Rate your understanding. This does NOT affect your grade.');

  const selfAssess = form.addScaleItem()
    .setTitle('How confident do you feel about explaining the difference between cold fronts and warm fronts?')
    .setHelpText('Be honest! This helps your teacher plan the next lesson.')
    .setBounds(1, 5)
    .setLabels('Not confident yet', 'Very confident')
    .setRequired(true);
  // Diagnostic only - omit setPoints() for ungraded items

  logFormInfo_(form, 'G7.C5.W1 Station 2', 20);
  return form;
}

// ============================================================================
// STATION 3 - PRESSURE SYSTEM ANALYSIS (25 points, ~20 min)
// Students interpret weather maps with pressure systems
// ============================================================================

function createG7C5W1Station3_() {
  const form = FormApp.create('G7.C5.W1: Station 3 - Pressure System Analysis');

  form.setDescription(
    'STATION 3: PRESSURE SYSTEM ANALYSIS\n\n' +
    'Air has weight! BAROMETRIC PRESSURE measures this weight.\n\n' +
    'HIGH PRESSURE (H on maps):\n' +
    '• Air sinking downward\n' +
    '• Generally clear, calm weather\n' +
    '• Winds spiral OUTWARD (clockwise in Northern Hemisphere)\n\n' +
    'LOW PRESSURE (L on maps):\n' +
    '• Air rising upward\n' +
    '• Generally cloudy, stormy weather\n' +
    '• Winds spiral INWARD (counterclockwise in Northern Hemisphere)\n\n' +
    'ISOBARS: Lines connecting points of equal pressure\n' +
    '• Closely spaced isobars = strong winds\n' +
    '• Widely spaced isobars = gentle winds\n\n' +
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
    'Station 3 complete! You can now read weather maps like a meteorologist.\n\n' +
    'Next: Exit Ticket to bring all your learning together!'
  );

  // --- MTSS DIAGNOSTIC (0 points) ---
  const mtss1 = form.addMultipleChoiceItem()
    .setTitle('QUICK CHECK: When air rises and cools, what usually happens to the water vapor in it?')
    .setHelpText('This checks understanding from the water cycle. Does NOT affect your grade.')
    .setRequired(true);

  mtss1.setChoices([
    mtss1.createChoice('It condenses into water droplets (clouds)', true),
    mtss1.createChoice('It stays as invisible vapor', false),
    mtss1.createChoice('It disappears completely', false),
    mtss1.createChoice('It gets warmer', false)
  ]);
  // Diagnostic only - omit setPoints() for ungraded items
  mtss1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('✓ Correct! Cooling air can\'t hold as much water vapor, so it condenses into clouds. This is why low pressure = clouds!')
      .build()
  );
  mtss1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Remember: Cool air holds less water vapor → condensation → clouds form. This connects to pressure systems!')
      .build()
  );

  // Q1: Low pressure and weather (4 pts auto)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('A large "L" on a weather map indicates:')
    .setHelpText('Think about what happens when air rises.')
    .setRequired(true);

  q1.setChoices([
    q1.createChoice('A low pressure system with likely clouds and precipitation', true),
    q1.createChoice('A low pressure system with clear skies', false),
    q1.createChoice('A high pressure system with storms', false),
    q1.createChoice('The letter has no meteorological meaning', false)
  ]);
  q1.setPoints(4);
  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Low pressure means air is rising. Rising air cools, and water vapor condenses into clouds and precipitation.')
      .build()
  );
  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('L = Low pressure. Air rises in low pressure areas. Rising air cools and often forms clouds and storms.')
      .build()
  );

  // Q2: High pressure characteristics (4 pts auto)
  const q2 = form.addMultipleChoiceItem()
    .setTitle('Which weather conditions are most likely under a high pressure system?')
    .setHelpText('Air is sinking in high pressure areas.')
    .setRequired(true);

  q2.setChoices([
    q2.createChoice('Clear skies and calm winds', true),
    q2.createChoice('Heavy thunderstorms', false),
    q2.createChoice('Hurricanes', false),
    q2.createChoice('Tornadoes', false)
  ]);
  q2.setPoints(4);
  q2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Sinking air in high pressure areas warms and dries out, preventing cloud formation. Result: clear skies.')
      .build()
  );
  q2.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('In high pressure, air sinks. Sinking air warms up and holds moisture as vapor - no clouds form.')
      .build()
  );

  // Q3: Isobar interpretation (4 pts auto)
  const q3 = form.addMultipleChoiceItem()
    .setTitle('If isobars on a weather map are very close together, you would expect:')
    .setHelpText('Isobars show pressure differences. Close isobars = big pressure difference over short distance.')
    .setRequired(true);

  q3.setChoices([
    q3.createChoice('Strong winds', true),
    q3.createChoice('Light breezes', false),
    q3.createChoice('No wind at all', false),
    q3.createChoice('Warm temperatures', false)
  ]);
  q3.setPoints(4);
  q3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Close isobars = steep pressure gradient = air rushing from high to low pressure = strong winds.')
      .build()
  );
  q3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Air flows from high to low pressure. When isobars are close, pressure changes rapidly over a short distance, creating strong winds.')
      .build()
  );

  // Q4: Wind direction (3 pts auto)
  const q4 = form.addMultipleChoiceItem()
    .setTitle('In the Northern Hemisphere, winds around a LOW pressure system spiral:')
    .setHelpText('The Coriolis effect from Earth\'s rotation affects wind direction.')
    .setRequired(true);

  q4.setChoices([
    q4.createChoice('Counterclockwise and inward', true),
    q4.createChoice('Clockwise and inward', false),
    q4.createChoice('Counterclockwise and outward', false),
    q4.createChoice('Straight toward the center', false)
  ]);
  q4.setPoints(3);
  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! In the Northern Hemisphere, low pressure winds spiral counterclockwise and inward toward the center.')
      .build()
  );
  q4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Earth\'s rotation (Coriolis effect) curves winds. In Northern Hemisphere lows: counterclockwise + inward.')
      .build()
  );

  // Q5: Blizzard pressure analysis (4 pts auto)
  const q5 = form.addMultipleChoiceItem()
    .setTitle('The Chicago blizzard was associated with a rapidly intensifying low pressure system. Why would this cause extreme weather?')
    .setHelpText('Think about what intensifying low pressure does to air.')
    .setRequired(true);

  q5.setChoices([
    q5.createChoice('Rapidly falling pressure causes air to rise quickly, creating intense storms', true),
    q5.createChoice('Low pressure always causes blizzards', false),
    q5.createChoice('Pressure has no effect on storm intensity', false),
    q5.createChoice('Rising pressure creates unstable air', false)
  ]);
  q5.setPoints(4);
  q5.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Exactly! Rapidly deepening low pressure = rapidly rising air = intense condensation = heavy precipitation and strong winds.')
      .build()
  );
  q5.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('The key word is "rapidly." Fast-falling pressure means air rises quickly, creating unstable conditions and intense storms.')
      .build()
  );

  // Q6: Spiral connection to C3-4 (3 pts auto)
  const q6 = form.addMultipleChoiceItem()
    .setTitle('SPIRAL (Cycle 3-4): Rising air in a low pressure system cools because:')
    .setHelpText('Remember what you learned about atmospheric pressure and temperature.')
    .setRequired(true);

  q6.setChoices([
    q6.createChoice('Air expands as pressure decreases at higher altitudes', true),
    q6.createChoice('The Sun doesn\'t reach high altitudes', false),
    q6.createChoice('Cold air from space mixes in', false),
    q6.createChoice('Rising air moves closer to the Moon', false)
  ]);
  q6.setPoints(3);
  q6.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! As air rises, pressure decreases, so air expands. Expanding air cools - this is why mountains are cold!')
      .build()
  );
  q6.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Review Cycles 3-4: Air pressure decreases with altitude. Rising air expands into lower pressure, and expansion causes cooling.')
      .build()
  );

  // --- SECTION HEADER WITH RUBRIC for open-response ---
  form.addSectionHeaderItem()
    .setTitle('Question 7 (3 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '3 pts: Correctly predicts strong winds AND stormy/cloudy conditions with evidence from both isobars and L\n' +
      '2 pts: Predicts either wind or clouds correctly with some reasoning\n' +
      '1 pt:  Vague prediction without connecting to map features\n' +
      '0 pts: No response or completely incorrect prediction'
    );

  // Q7: Weather map interpretation (3 pts, open response)
  const q7 = form.addParagraphTextItem()
    .setTitle('PREDICT: A weather map shows a large L (low pressure) with tightly packed isobars moving toward your city. Describe what weather you would expect over the next 24 hours.')
    .setHelpText(
      'Include wind conditions, sky conditions, and how weather might change.\n\n' +
      'SENTENCE STARTERS:\n' +
      '• Based on the low pressure system, I would expect...\n' +
      '• The tightly packed isobars tell me that...\n' +
      '• Over the next 24 hours, the weather will likely...\n\n' +
      'WORD BANK: low pressure, isobars, rising air, clouds, precipitation, strong winds, counterclockwise, stormy'
    )
    .setRequired(true);

  q7.setValidation(
    FormApp.createParagraphTextValidation()
      .requireTextLengthGreaterThanOrEqualTo(60)
      .build()
  );

  // --- SELF-ASSESSMENT (0 points) ---
  form.addPageBreakItem()
    .setTitle('Self-Assessment')
    .setHelpText('Rate your understanding. This does NOT affect your grade.');

  const selfAssess = form.addScaleItem()
    .setTitle('How confident do you feel about reading a weather map with pressure systems and isobars?')
    .setHelpText('Be honest! This helps your teacher know what to review.')
    .setBounds(1, 5)
    .setLabels('Not confident yet', 'Very confident')
    .setRequired(true);
  // Diagnostic only - omit setPoints() for ungraded items

  logFormInfo_(form, 'G7.C5.W1 Station 3', 25);
  return form;
}

// ============================================================================
// EXIT TICKET - AIR MASS INTEGRATION (23 points, ~15 min)
// Synthesis of all Week 1 concepts + spiral from previous cycles
// ============================================================================

function createG7C5W1ExitTicket_() {
  const form = FormApp.create('G7.C5.W1: Exit Ticket - Air Mass Integration');

  form.setDescription(
    'EXIT TICKET: AIR MASS INTEGRATION\n\n' +
    'Show what you learned about air masses, fronts, and pressure systems!\n\n' +
    'This ticket includes:\n' +
    '• 2 questions on TODAY\'S content (air masses, fronts, pressure)\n' +
    '• 2 SPIRAL questions from Cycles 3-4 (climate, carbon, ecosystems)\n' +
    '• 1 INTEGRATION question connecting concepts\n' +
    '• 1 SEP question (Science & Engineering Practices)\n\n' +
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
    'Week 1 Exit Ticket complete!\n\n' +
    'Great work learning about weather fronts and air masses!\n' +
    'Next week: Learn to predict severe weather using data analysis!'
  );

  // --- MTSS DIAGNOSTIC (0 points) ---
  const mtss1 = form.addMultipleChoiceItem()
    .setTitle('QUICK CHECK (Week 1 Review): What does "cP" stand for in air mass classification?')
    .setHelpText('This checks a key concept from today. Your answer does NOT affect your grade.')
    .setRequired(true);

  mtss1.setChoices([
    mtss1.createChoice('Continental Polar', true),
    mtss1.createChoice('Cold Precipitation', false),
    mtss1.createChoice('Cloudy Pressure', false),
    mtss1.createChoice('Canadian Pacific', false)
  ]);
  // Diagnostic only - omit setPoints() for ungraded items
  mtss1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('✓ Correct! cP = continental (dry, from land) + Polar (cold, from high latitudes).')
      .build()
  );
  mtss1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Review: c = continental (over land), P = Polar (from high latitudes). So cP = continental Polar.')
      .build()
  );

  // --- NEW CONTENT QUESTIONS ---
  form.addPageBreakItem()
    .setTitle('Part 1: Today\'s Learning')
    .setHelpText('Questions about air masses, fronts, and pressure systems.');

  // Q1: Air mass + front connection (4 pts auto)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('A cP (continental Polar) air mass collides with an mT (maritime Tropical) air mass. The cP is advancing. Which BEST describes what happens?')
    .setHelpText('Think about which air mass is moving and what type of front forms.')
    .setRequired(true);

  q1.setChoices([
    q1.createChoice('Cold front forms; mT air forced up rapidly; intense storms possible', true),
    q1.createChoice('Warm front forms; gentle rain for many days', false),
    q1.createChoice('Stationary front forms; no weather change', false),
    q1.createChoice('Both air masses sink; clear weather', false)
  ]);
  q1.setPoints(4);
  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! cP advancing = cold front. Cold, dense air wedges under warm mT air, forcing it up rapidly = potential for severe storms.')
      .build()
  );
  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('When cold air (cP) advances, it\'s a cold front. Cold fronts push under warm air rapidly, causing intense weather.')
      .build()
  );

  // Q2: Pressure and fronts (4 pts auto)
  const q2 = form.addMultipleChoiceItem()
    .setTitle('Fronts typically form along the boundary of:')
    .setHelpText('Think about where different pressure systems meet.')
    .setRequired(true);

  q2.setChoices([
    q2.createChoice('Low pressure systems, where air converges', true),
    q2.createChoice('High pressure systems, where air diverges', false),
    q2.createChoice('Areas with no pressure differences', false),
    q2.createChoice('The equator only', false)
  ]);
  q2.setPoints(4);
  q2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Low pressure systems draw in air from surrounding areas. Where different air masses converge, fronts form.')
      .build()
  );
  q2.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Low pressure draws air inward (converges). When different air masses are pulled toward the same low, fronts form at their boundaries.')
      .build()
  );

  // --- SPIRAL QUESTIONS ---
  form.addPageBreakItem()
    .setTitle('Part 2: Spiral Review')
    .setHelpText('Connecting to Cycles 3-4. These help us remember important concepts!');

  // Q3: Spiral - Cycle 3 greenhouse (3 pts auto)
  const q3 = form.addMultipleChoiceItem()
    .setTitle('SPIRAL (Cycle 3): How does the greenhouse effect relate to air mass formation?')
    .setHelpText('Think about how energy enters the atmosphere.')
    .setRequired(true);

  q3.setChoices([
    q3.createChoice('Greenhouse gases trap heat, warming some regions more than others, creating temperature differences that form air masses', true),
    q3.createChoice('Greenhouse gases prevent all air masses from forming', false),
    q3.createChoice('Greenhouse gases only affect water, not air', false),
    q3.createChoice('There is no connection between greenhouse effect and weather', false)
  ]);
  q3.setPoints(3);
  q3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Excellent connection! Uneven heating creates temperature differences that drive air mass formation and weather patterns.')
      .build()
  );
  q3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('The greenhouse effect causes uneven heating. Some areas warm more than others → different temperature regions → different air masses form.')
      .build()
  );

  // Q4: Spiral - Cycle 4 water cycle (3 pts auto)
  const q4 = form.addMultipleChoiceItem()
    .setTitle('SPIRAL (Cycle 4): Maritime (m) air masses get their moisture from:')
    .setHelpText('Connect to what you learned about the water cycle.')
    .setRequired(true);

  q4.setChoices([
    q4.createChoice('Evaporation from oceans and other water bodies', true),
    q4.createChoice('Rainfall that occurs over the ocean', false),
    q4.createChoice('Ice melting at the poles', false),
    q4.createChoice('Factories releasing steam', false)
  ]);
  q4.setPoints(3);
  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Water evaporates from the ocean surface, adding moisture to the air above it. This is why maritime air is humid.')
      .build()
  );
  q4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('The water cycle! Water evaporates from oceans → enters the air → maritime air masses become humid.')
      .build()
  );

  // --- INTEGRATION QUESTION ---
  form.addPageBreakItem()
    .setTitle('Part 3: Integration')
    .setHelpText('Connecting multiple concepts together.');

  // --- SECTION HEADER WITH RUBRIC for open-response ---
  form.addSectionHeaderItem()
    .setTitle('Question 5 (4 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '4 pts: Clear cause-effect chain connecting all 3 concepts with 2+ specific examples\n' +
      '3 pts: Connects all 3 concepts with 1 specific example\n' +
      '2 pts: Connects 2 of 3 concepts with some reasoning\n' +
      '1 pt:  Mentions concepts without clear connections\n' +
      '0 pts: No response or unrelated answer'
    );

  // Q5: Integration (4 pts, open response)
  const q5 = form.addParagraphTextItem()
    .setTitle('INTEGRATE: Explain how the following connect: (1) Sun heats Earth unevenly, (2) Air masses form with different properties, (3) Fronts create weather. Use at least TWO specific examples.')
    .setHelpText(
      'Show how these concepts are linked in a cause-and-effect chain.\n\n' +
      'SENTENCE STARTERS:\n' +
      '• First, the Sun heats Earth unevenly, which causes...\n' +
      '• This leads to air masses forming with different properties. For example...\n' +
      '• When these air masses meet, fronts create weather such as...\n' +
      '• A specific example is when... meets..., creating...\n\n' +
      'WORD BANK: uneven heating, tropical, polar, maritime, continental, mT, cP, cold front, warm front, storms, precipitation'
    )
    .setRequired(true);

  q5.setValidation(
    FormApp.createParagraphTextValidation()
      .requireTextLengthGreaterThanOrEqualTo(80)
      .build()
  );

  // --- SEP QUESTION ---
  form.addPageBreakItem()
    .setTitle('Part 4: Science Practice')
    .setHelpText('Applying science and engineering practices.');

  // --- SECTION HEADER WITH RUBRIC for SEP open-response ---
  form.addSectionHeaderItem()
    .setTitle('Question 6 (5 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '5 pts: Correct claim (cold front passed) with 3+ pieces of evidence from data AND reasoning\n' +
      '4 pts: Correct claim with 3 pieces of evidence, limited reasoning\n' +
      '3 pts: Correct claim with 2 pieces of evidence\n' +
      '2 pts: Correct claim with 1 piece of evidence\n' +
      '1 pt:  Reasonable claim without data evidence\n' +
      '0 pts: No response or incorrect claim'
    );

  // Q6: SEP - Analyzing data (5 pts, open response)
  const q6 = form.addParagraphTextItem()
    .setTitle('SEP - ANALYZING DATA: A meteorologist shows you two days of weather data:\n\nDay 1: Temperature 55°F, Pressure 30.2 in, Wind SW 10 mph\nDay 2: Temperature 32°F, Pressure 30.5 in, Wind NW 25 mph\n\nWhat weather event likely occurred between Day 1 and Day 2? Cite at least THREE pieces of evidence from the data to support your claim.')
    .setHelpText(
      'Make a claim and support it with evidence from the data.\n\n' +
      'SENTENCE STARTERS:\n' +
      '• Based on the data, I claim that a ___ occurred because...\n' +
      '• Evidence 1: The temperature changed from ___ to ___, which indicates...\n' +
      '• Evidence 2: The pressure changed from ___ to ___, suggesting...\n' +
      '• Evidence 3: The wind direction shifted from ___ to ___, which shows...\n\n' +
      'WORD BANK: cold front, temperature drop, pressure rise, wind shift, northwest, cP air mass, advancing cold air'
    )
    .setRequired(true);

  q6.setValidation(
    FormApp.createParagraphTextValidation()
      .requireTextLengthGreaterThanOrEqualTo(100)
      .build()
  );

  // --- SELF-ASSESSMENT (0 points) ---
  form.addPageBreakItem()
    .setTitle('Self-Assessment')
    .setHelpText('Rate your understanding. This does NOT affect your grade.');

  const selfAssess = form.addScaleItem()
    .setTitle('Overall, how confident do you feel about Week 1 content (air masses, fronts, and pressure systems)?')
    .setHelpText('Be honest! This helps your teacher plan Week 2.')
    .setBounds(1, 5)
    .setLabels('Not confident yet', 'Very confident')
    .setRequired(true);
  // Diagnostic only - omit setPoints() for ungraded items

  logFormInfo_(form, 'G7.C5.W1 Exit Ticket', 23);
  return form;
}

// ============================================================================
// INDIVIDUAL TEST FUNCTIONS
// Use these to create forms one at a time for testing
// ============================================================================

function testCreateHook() {
  const form = createG7C5W1Hook_();
  Logger.log('Hook test complete. Check logs for URLs.');
  return form;
}

function testCreateStation1() {
  const form = createG7C5W1Station1_();
  Logger.log('Station 1 test complete. Check logs for URLs.');
  return form;
}

function testCreateStation2() {
  const form = createG7C5W1Station2_();
  Logger.log('Station 2 test complete. Check logs for URLs.');
  return form;
}

function testCreateStation3() {
  const form = createG7C5W1Station3_();
  Logger.log('Station 3 test complete. Check logs for URLs.');
  return form;
}

function testCreateExitTicket() {
  const form = createG7C5W1ExitTicket_();
  Logger.log('Exit Ticket test complete. Check logs for URLs.');
  return form;
}
