/**
 * ============================================================================
 * GRADE 8 - CYCLE 8 WEEK 1: THERMAL CONDUCTIVITY & HEAT TRANSFER
 * 5 Forms | 100 Points Total | ~78 Minutes
 * ============================================================================
 *
 * NGSS ALIGNMENT:
 *   Primary: MS-PS3-4 - Plan an investigation to determine the relationships
 *            among energy transferred, type of matter, mass, and change in
 *            average kinetic energy of particles as measured by temperature.
 *   Spiral:  MS-PS1-2 - Chemical reactions (Cycle 7)
 *            MS-PS2-3 - Electric/magnetic forces (Cycle 6)
 *
 * 3-DIMENSIONAL LEARNING:
 *   SEP-3: Planning and Carrying Out Investigations - Design thermal experiments
 *   SEP-4: Analyzing and Interpreting Data - Temperature change analysis
 *   SEP-6: Constructing Explanations - Explain heat transfer mechanisms
 *   DCI PS3.A: Definitions of Energy (thermal = particle motion)
 *   DCI PS3.B: Conservation of Energy (energy transfers, not destroyed)
 *   CCC-5: Energy and Matter - Energy flows from hot to cold
 *   CCC-2: Cause and Effect - Material properties affect heat transfer
 *
 * LEARNING TARGETS:
 *   1. Explain thermal conductivity in terms of particle motion
 *   2. Distinguish between conduction, convection, and radiation
 *   3. Predict heat transfer based on material properties
 *   4. Design investigations to test thermal properties
 *
 * FORMS:
 *   1. Hook - The Hot Spoon Mystery (12 pts, ~10 min)
 *   2. Station 1 - Conductivity Race (20 pts, ~18 min)
 *   3. Station 2 - Three Mechanisms Lab (20 pts, ~15 min)
 *   4. Station 3 - Design a Thermal Shield (25 pts, ~20 min)
 *   5. Exit Ticket - Heat Transfer Integration (23 pts, ~15 min)
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
 *   3. Run: createAllG8C8W1Forms()
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

function createAllG8C8W1Forms() {
  Logger.log('================================================');
  Logger.log('G8 CYCLE 8 WEEK 1: THERMAL CONDUCTIVITY & HEAT TRANSFER');
  Logger.log('================================================\n');

  const forms = {
    hook: createG8C8W1Hook_(),
    station1: createG8C8W1Station1_(),
    station2: createG8C8W1Station2_(),
    station3: createG8C8W1Station3_(),
    exitTicket: createG8C8W1ExitTicket_()
  };

  Logger.log('\n================================================');
  Logger.log('ALL 5 FORMS CREATED - 100 POINTS TOTAL');
  Logger.log('================================================');

  return forms;
}

// ============================================================================
// HOOK - THE HOT SPOON MYSTERY (12 points, ~10 min)
// Phenomenon-driven introduction to thermal conductivity
// ============================================================================

function createG8C8W1Hook_() {
  const form = FormApp.create('G8.C8.W1: Hook - The Hot Spoon Mystery');

  form.setDescription(
    'THE HOT SPOON MYSTERY\n\n' +
    'You\'re stirring hot soup with a metal spoon, and within seconds,\n' +
    'the handle becomes too hot to hold. But a wooden spoon in the same\n' +
    'soup stays perfectly cool.\n\n' +
    'Both are in the same hot liquid—why does one conduct heat\n' +
    'while the other doesn\'t?\n\n' +
    '---\n' +
    'Time: About 10 minutes | Points: 12\n' +
    'Think about what you learned about energy transfer!'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Hook submitted! You\'re ready for Station 1.\n\n' +
    'Next: Use the Conductivity Race to compare how different\n' +
    'materials transfer heat.'
  );

  // --- PART 1: PRIOR KNOWLEDGE ---
  form.addPageBreakItem()
    .setTitle('Part 1: What You Already Know')
    .setHelpText('These questions check what you remember about energy.');

  // Q1: Energy basics (3 pts auto)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('What is heat?')
    .setHelpText('Think about what heat really is at the particle level.')
    .setRequired(true);

  q1.setChoices([
    q1.createChoice('The transfer of thermal energy from a warmer object to a cooler object', true),
    q1.createChoice('A substance that flows from hot objects', false),
    q1.createChoice('A type of matter found in hot things', false),
    q1.createChoice('The same thing as temperature', false)
  ]);
  q1.setPoints(3);
  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Heat is energy transfer, not a substance. It always flows from hot to cold.')
      .build()
  );
  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Heat is the TRANSFER of thermal energy from hot to cold. It\'s not a substance and not the same as temperature.')
      .build()
  );

  // --- MTSS FLAG: Heat misconception check ---
  const mtss1 = form.addMultipleChoiceItem()
    .setTitle('QUICK CHECK: Which statement is TRUE about "cold"?')
    .setHelpText('This checks your understanding. Your answer does NOT affect your grade.')
    .setRequired(true);

  mtss1.setChoices([
    mtss1.createChoice('"Cold" is a substance that moves into warm objects', false), // FLAG: Misconception
    mtss1.createChoice('"Cold" is simply the absence of heat; only heat energy transfers', true),
    mtss1.createChoice('"Cold" and "heat" both flow in opposite directions', false),
    mtss1.createChoice('"Cold" is stored inside ice cubes', false)
  ]);
  // Diagnostic only - omit setPoints()

  // --- PART 2: PHENOMENON ---
  form.addPageBreakItem()
    .setTitle('Part 2: The Spoon Mystery')
    .setHelpText('Think about what\'s happening at the particle level.');

  // Q2: Initial observation (3 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 2 (3 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '3: Describes specific observations + attempts particle-level explanation\n' +
      '2: Describes observations only\n' +
      '1: Vague observation\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('When you put a metal spoon and a wooden spoon into the same hot soup, the metal handle becomes hot quickly while the wooden handle stays cool. What do you think is happening at the particle level that causes this difference?')
    .setHelpText(
      'Sentence starters:\n' +
      '• "I observed that the metal spoon..." \n' +
      '• "I think this happens because particles in metal..." \n' +
      '• "The wood stays cool because..."'
    )
    .setRequired(true);

  // Q3: Prediction (3 pts auto)
  const q3 = form.addMultipleChoiceItem()
    .setTitle('Why do you think metal feels cold when you touch it at room temperature, even though it\'s the same temperature as a wooden table?')
    .setRequired(true);

  q3.setChoices([
    q3.createChoice('Metal pulls heat from your hand faster than wood does', true),
    q3.createChoice('Metal is actually colder than wood at room temperature', false),
    q3.createChoice('Metal contains cold that flows into your hand', false),
    q3.createChoice('Your hand gets confused by shiny surfaces', false)
  ]);
  q3.setPoints(3);
  q3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Metal conducts heat away from your skin faster, making it FEEL cold even at room temperature.')
      .build()
  );
  q3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Both are at room temperature! Metal FEELS cold because it conducts heat away from your hand quickly.')
      .build()
  );

  // Q4: Spiral - Energy (3 pts auto)
  const q4 = form.addMultipleChoiceItem()
    .setTitle('ENERGY CONNECTION: Where does the thermal energy in the hot spoon come from?')
    .setRequired(true);

  q4.setChoices([
    q4.createChoice('It transfers from the hot soup into the spoon', true),
    q4.createChoice('The spoon creates its own heat energy', false),
    q4.createChoice('Heat appears spontaneously in metal', false),
    q4.createChoice('The air heats up the spoon', false)
  ]);
  q4.setPoints(3);
  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Energy is conserved - the spoon\'s thermal energy came from the soup. Heat flows from hot to cold.')
      .build()
  );
  q4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Energy cannot be created! The spoon\'s heat energy transfers from the hot soup.')
      .build()
  );

  // Q5: Confidence (0 pts - diagnostic only)
  form.addScaleItem()
    .setTitle('Self-Assessment: How well can you explain why different materials transfer heat at different rates?')
    .setHelpText('FOR REFLECTION ONLY - This does NOT affect your grade. Be honest!')
    .setBounds(1, 5)
    .setLabels('Still learning', 'Got it!')
    .setRequired(true);

  logFormInfo_(form, 'G8 C8 W1 Hook', 12);
  return form;
}

// ============================================================================
// STATION 1 - CONDUCTIVITY RACE (20 points, ~18 min)
// Compare thermal conductivity of different materials
// ============================================================================

function createG8C8W1Station1_() {
  const form = FormApp.create('G8.C8.W1: Station 1 - Conductivity Race');

  form.setDescription(
    'YOUR MISSION: RACE DIFFERENT MATERIALS TO SEE WHICH CONDUCTS HEAT FASTEST\n\n' +
    'You\'ll compare how quickly heat travels through different materials\n' +
    'and explain WHY some materials are better conductors than others.\n\n' +
    'KEY CONCEPTS:\n' +
    '- Thermal Conductivity: How well a material transfers heat\n' +
    '- Conductor: Material that transfers heat easily (metals)\n' +
    '- Insulator: Material that resists heat transfer (wood, plastic)\n\n' +
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
    'KEY INSIGHT: Metals conduct heat because their particles\n' +
    'can transfer energy quickly through free-moving electrons.\n' +
    'Insulators like wood have particles that don\'t transfer energy efficiently.\n\n' +
    'Continue to Station 2: Three Mechanisms Lab'
  );

  // --- INVESTIGATION ---
  form.addPageBreakItem()
    .setTitle('Investigation: Conductivity Race')
    .setHelpText(
      'Use the simulation or lab materials to test how quickly\n' +
      'heat travels through copper, steel, glass, and wood.'
    );

  // Q1: Prediction (2 pts auto)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('PREDICT: Before testing, rank these materials from BEST conductor to WORST conductor:')
    .setRequired(true);

  q1.setChoices([
    q1.createChoice('Copper > Steel > Glass > Wood', true),
    q1.createChoice('Wood > Glass > Steel > Copper', false),
    q1.createChoice('Glass > Copper > Wood > Steel', false),
    q1.createChoice('Steel > Wood > Copper > Glass', false)
  ]);
  q1.setPoints(2);
  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Good prediction! Metals (copper, steel) conduct best; wood conducts worst.')
      .build()
  );
  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Think about it: Which materials feel hot/cold quickly when touched? Those are better conductors.')
      .build()
  );

  // Q2: Data collection (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 2: Record Your Data (4 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '4: Records specific times/temperatures for all 4 materials with ranking\n' +
      '3: Records data for 3-4 materials\n' +
      '2: Records data for 2 materials\n' +
      '1: Incomplete data\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Record how long it takes for heat to travel through each material (or temperature change after 60 seconds):\n• Copper:\n• Steel:\n• Glass:\n• Wood:\n\nRank them from best to worst conductor.')
    .setHelpText(
      'Record format:\n' +
      '• "Copper: ___ seconds (or ___°C change)" \n' +
      '• "Ranking: 1. ___ 2. ___ 3. ___ 4. ___"'
    )
    .setRequired(true);

  // Q3: Particle explanation (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 3: Explain at the Particle Level (4 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '4: Explains particle motion differences + electron role in metals + structure in wood\n' +
      '3: Explains 2 of 3 factors\n' +
      '2: Mentions particles without mechanism\n' +
      '1: Vague explanation\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Explain WHY metals conduct heat better than wood at the particle level. What\'s different about how particles transfer energy in these materials?')
    .setHelpText(
      'Sentence starters:\n' +
      '• "In metals, particles can transfer energy because..." \n' +
      '• "Metals have free electrons that..." \n' +
      '• "Wood is a poor conductor because its particles..."'
    )
    .setRequired(true);

  // Q4: Equilibrium (4 pts auto)
  const q4 = form.addMultipleChoiceItem()
    .setTitle('What happens to the metal spoon after being in hot soup for a long time?')
    .setRequired(true);

  q4.setChoices([
    q4.createChoice('It reaches thermal equilibrium - same temperature as the soup', true),
    q4.createChoice('It becomes hotter than the soup', false),
    q4.createChoice('It stays cooler than the soup forever', false),
    q4.createChoice('It keeps getting hotter without limit', false)
  ]);
  q4.setPoints(4);
  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Heat flows until both objects reach the same temperature - thermal equilibrium.')
      .build()
  );
  q4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Heat flows from hot to cold until they\'re equal. The spoon will match the soup\'s temperature.')
      .build()
  );

  // Q5: SPIRAL - Cycle 7 connection (4 pts auto)
  const q5 = form.addMultipleChoiceItem()
    .setTitle('CYCLE 7 SPIRAL: In chemical reactions that release heat (exothermic), where does the thermal energy come from?')
    .setRequired(true);

  q5.setChoices([
    q5.createChoice('Chemical bonds store energy that is released when bonds break and reform', true),
    q5.createChoice('Heat is created from nothing during the reaction', false),
    q5.createChoice('The container provides the heat', false),
    q5.createChoice('Air temperature provides all the heat', false)
  ]);
  q5.setPoints(4);
  q5.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Chemical potential energy in bonds converts to thermal energy during exothermic reactions.')
      .build()
  );
  q5.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Review Cycle 7: Exothermic reactions release energy stored in chemical bonds as thermal energy.')
      .build()
  );

  // Q6: Application (2 pts auto)
  const q6 = form.addMultipleChoiceItem()
    .setTitle('Why do cooking pans have metal bottoms but plastic handles?')
    .setRequired(true);

  q6.setChoices([
    q6.createChoice('Metal conducts heat to cook food; plastic insulates to protect your hand', true),
    q6.createChoice('Metal is cheaper than plastic', false),
    q6.createChoice('Plastic looks better than metal', false),
    q6.createChoice('There\'s no scientific reason', false)
  ]);
  q6.setPoints(2);
  q6.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Engineers use conductors where we want heat transfer and insulators where we don\'t.')
      .build()
  );
  q6.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Think about conductivity: We want heat to flow into the food, not into our hands!')
      .build()
  );

  logFormInfo_(form, 'G8 C8 W1 Station 1', 20);
  return form;
}

// ============================================================================
// STATION 2 - THREE MECHANISMS LAB (20 points, ~15 min)
// Observe conduction, convection, and radiation
// ============================================================================

function createG8C8W1Station2_() {
  const form = FormApp.create('G8.C8.W1: Station 2 - Three Mechanisms Lab');

  form.setDescription(
    'YOUR MISSION: IDENTIFY AND COMPARE THE THREE HEAT TRANSFER MECHANISMS\n\n' +
    'Heat can transfer in three different ways:\n' +
    '1. CONDUCTION - Direct contact (particles bump into each other)\n' +
    '2. CONVECTION - Fluid circulation (hot fluid rises, cool fluid sinks)\n' +
    '3. RADIATION - Electromagnetic waves (no contact needed!)\n\n' +
    '---\n' +
    'Time: About 15 minutes | Points: 20\n' +
    'SPIRAL: Connect to energy transformation from Cycle 6!'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Station 2 complete!\n\n' +
    'KEY INSIGHT:\n' +
    '• Conduction needs contact (solids mainly)\n' +
    '• Convection needs fluid movement (liquids and gases)\n' +
    '• Radiation needs nothing - it works through empty space!\n\n' +
    'Continue to Station 3: Design a Thermal Shield'
  );

  // --- MECHANISM IDENTIFICATION ---
  form.addPageBreakItem()
    .setTitle('Identify the Mechanisms')
    .setHelpText('For each scenario, identify which mechanism is primarily responsible.');

  // Q1: Conduction identification (4 pts auto)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('A metal rod is heated at one end. After a few minutes, the other end becomes hot. Which mechanism is this?')
    .setRequired(true);

  q1.setChoices([
    q1.createChoice('Conduction - heat transfers through direct particle contact along the rod', true),
    q1.createChoice('Convection - the metal flows from hot end to cold end', false),
    q1.createChoice('Radiation - electromagnetic waves travel through the metal', false),
    q1.createChoice('All three equally', false)
  ]);
  q1.setPoints(4);
  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Conduction is heat transfer through direct contact - particles vibrate and bump into neighbors.')
      .build()
  );
  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('This is conduction! The heat moves through the solid metal as particles vibrate and transfer energy to neighbors.')
      .build()
  );

  // Q2: Convection identification (4 pts auto)
  const q2 = form.addMultipleChoiceItem()
    .setTitle('A pot of water is heated on a stove. Hot water rises from the bottom and cooler water sinks. Which mechanism is this?')
    .setRequired(true);

  q2.setChoices([
    q2.createChoice('Convection - hot fluid rises and cool fluid sinks, creating circulation', true),
    q2.createChoice('Conduction - the water conducts heat up', false),
    q2.createChoice('Radiation - the water emits heat waves', false),
    q2.createChoice('No mechanism - water just mixes randomly', false)
  ]);
  q2.setPoints(4);
  q2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Convection is heat transfer by fluid movement. Hot water is less dense and rises.')
      .build()
  );
  q2.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('This is convection! The HOT water rises (less dense) and COOL water sinks (more dense), creating circulation.')
      .build()
  );

  // Q3: Radiation identification (4 pts auto)
  const q3 = form.addMultipleChoiceItem()
    .setTitle('You can feel warmth from a heat lamp even though there\'s only air between you and the lamp. Which mechanism is this?')
    .setRequired(true);

  q3.setChoices([
    q3.createChoice('Radiation - electromagnetic waves travel through space without needing matter', true),
    q3.createChoice('Conduction - heat conducts through the air', false),
    q3.createChoice('Convection - hot air rises from the lamp to you', false),
    q3.createChoice('Sound waves carrying heat', false)
  ]);
  q3.setPoints(4);
  q3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Radiation is heat transfer by electromagnetic waves - no medium needed. That\'s how the sun warms Earth!')
      .build()
  );
  q3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('This is radiation! EM waves carry energy directly to you. This is how the sun warms Earth through empty space.')
      .build()
  );

  // Q4: SPIRAL - Cycle 6 connection (4 pts auto)
  const q4 = form.addMultipleChoiceItem()
    .setTitle('CYCLE 6 SPIRAL: When a light bulb converts electrical energy to light, it also produces heat. This heat reaches you through:')
    .setRequired(true);

  q4.setChoices([
    q4.createChoice('Radiation (and some convection of warmed air)', true),
    q4.createChoice('Only conduction through the air', false),
    q4.createChoice('Only convection of the light waves', false),
    q4.createChoice('Sound energy from the bulb', false)
  ]);
  q4.setPoints(4);
  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! The bulb radiates infrared energy (heat). The air around the bulb also heats up and rises (convection).')
      .build()
  );
  q4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Review Cycle 6: Energy transforms from electrical to light and heat. The heat reaches you primarily by radiation.')
      .build()
  );

  // Q5: Comparison (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 5: Compare All Three Mechanisms (4 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '4: Correctly compares all three with medium requirements and examples\n' +
      '3: Compares all three with minor errors\n' +
      '2: Compares 2 mechanisms well\n' +
      '1: Incomplete comparison\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Complete the comparison:\n\n1. CONDUCTION requires: _____ (solid/liquid/gas/vacuum?)\n2. CONVECTION requires: _____ (solid/liquid/gas/vacuum?)\n3. RADIATION requires: _____ (solid/liquid/gas/vacuum?)\n\nWhich is the only mechanism that can transfer heat through empty space (vacuum)? Explain why this matters for Earth.')
    .setHelpText(
      'Think about:\n' +
      '• What medium does each mechanism need?\n' +
      '• How does the sun warm Earth across empty space?'
    )
    .setRequired(true);

  logFormInfo_(form, 'G8 C8 W1 Station 2', 20);
  return form;
}

// ============================================================================
// STATION 3 - DESIGN A THERMAL SHIELD (25 points, ~20 min)
// Engineering challenge applying heat transfer concepts
// ============================================================================

function createG8C8W1Station3_() {
  const form = FormApp.create('G8.C8.W1: Station 3 - Design a Thermal Shield');

  form.setDescription(
    'ENGINEERING CHALLENGE: PROTECT AN ICE CUBE FROM A HEAT LAMP\n\n' +
    'Design a thermal shield that blocks heat transfer through ALL THREE mechanisms.\n' +
    'Your goal: Keep an ice cube from melting for at least 30 minutes under a heat lamp.\n\n' +
    'AVAILABLE MATERIALS:\n' +
    '• Aluminum foil (reflects radiation, but conducts heat)\n' +
    '• Foam sheets (insulates conduction, but doesn\'t reflect)\n' +
    '• Cardboard (moderate insulator)\n' +
    '• Fabric/cotton (traps air, reduces convection)\n' +
    '• Plastic wrap (reduces convection)\n\n' +
    'CONSTRAINTS:\n' +
    '• Shield must fit in a 15cm cube\n' +
    '• Cannot touch the ice directly\n' +
    '• Must use at least 2 different materials\n\n' +
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
    'You\'ve designed an engineering solution using thermal principles!\n' +
    'Real engineers use exactly this kind of thinking to design insulated buildings,\n' +
    'spacecraft thermal protection, and coolers.\n\n' +
    'Continue to Exit Ticket'
  );

  // Q1: Mechanism analysis (6 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 1: Analyze Each Mechanism (6 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '6: Explains how all 3 mechanisms contribute to ice melting with specific details\n' +
      '5: Explains all 3 with some details\n' +
      '4: Explains 2 mechanisms well\n' +
      '3: Explains 1-2 mechanisms\n' +
      '2: Basic mention of mechanisms\n' +
      '1: Vague response\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Without any shield, how would each heat transfer mechanism contribute to melting the ice?\n\n• CONDUCTION would...\n• CONVECTION would...\n• RADIATION would...')
    .setHelpText(
      'Sentence starters:\n' +
      '• "Conduction would transfer heat through..." \n' +
      '• "Convection would move warm air..." \n' +
      '• "Radiation from the heat lamp would..."'
    )
    .setRequired(true);

  // Q2: Design plan (7 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 2: Design Your Thermal Shield (7 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '7: Complete design addressing all 3 mechanisms with specific materials and justification\n' +
      '6: Addresses all 3 mechanisms with good justification\n' +
      '5: Addresses 2-3 mechanisms with reasoning\n' +
      '4: Addresses 2 mechanisms\n' +
      '3: Basic design with some reasoning\n' +
      '2: Design without clear reasoning\n' +
      '1: Incomplete design\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Design your thermal shield. For each layer, explain:\n• What material will you use?\n• Which mechanism does it block?\n• Why did you choose this material for this purpose?')
    .setHelpText(
      'Design format:\n' +
      '• "Layer 1 (outermost): ___ material to block ___ because..." \n' +
      '• "Layer 2: ___ material to block ___ because..." \n' +
      '• "Layer 3 (closest to ice): ___ material to block ___ because..."'
    )
    .setRequired(true);

  // Q3: Trade-offs (5 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 3: Identify Trade-offs (5 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '5: Identifies 2+ specific trade-offs with clear reasoning about design choices\n' +
      '4: Identifies 2 trade-offs\n' +
      '3: Identifies 1 trade-off with explanation\n' +
      '2: Mentions limitations without trade-off analysis\n' +
      '1: Vague response\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Engineering always involves trade-offs. What are the limitations of your design? What did you sacrifice to gain something else?')
    .setHelpText(
      'Consider:\n' +
      '• Foil reflects radiation but conducts heat\n' +
      '• Thick insulation blocks conduction but takes up space\n' +
      '• Air gaps reduce conduction but allow convection\n' +
      '• Cost vs. effectiveness'
    )
    .setRequired(true);

  // Q4: Prediction (4 pts auto)
  const q4 = form.addMultipleChoiceItem()
    .setTitle('Which layer of your shield should be on the OUTSIDE (facing the heat lamp)?')
    .setRequired(true);

  q4.setChoices([
    q4.createChoice('A reflective layer (foil) to bounce back radiation before it enters', true),
    q4.createChoice('An insulating layer (foam) to absorb the radiation', false),
    q4.createChoice('Plastic wrap to block convection first', false),
    q4.createChoice('The order doesn\'t matter', false)
  ]);
  q4.setPoints(4);
  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Reflect radiation FIRST before it can be absorbed and converted to heat. Then insulate what gets through.')
      .build()
  );
  q4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Think strategically: If you reflect radiation first, that energy never enters your shield at all!')
      .build()
  );

  // Q5: Real-world application (3 pts auto)
  const q5 = form.addMultipleChoiceItem()
    .setTitle('A thermos bottle keeps drinks hot (or cold) for hours. It uses a vacuum between two walls. Which mechanism does the vacuum primarily block?')
    .setRequired(true);

  q5.setChoices([
    q5.createChoice('Both conduction AND convection (vacuum has no matter to transfer heat)', true),
    q5.createChoice('Only radiation', false),
    q5.createChoice('Only conduction', false),
    q5.createChoice('All three mechanisms equally', false)
  ]);
  q5.setPoints(3);
  q5.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! A vacuum has no particles, so conduction and convection cannot occur. Thermoses also use reflective coating to block radiation.')
      .build()
  );
  q5.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Vacuum = no matter = no particle transfer. Both conduction (particle contact) and convection (fluid movement) require matter.')
      .build()
  );

  logFormInfo_(form, 'G8 C8 W1 Station 3', 25);
  return form;
}

// ============================================================================
// EXIT TICKET - HEAT TRANSFER INTEGRATION (23 points, ~15 min)
// 2 NEW + 2 SPIRAL + 1 INTEGRATION + 1 SEP
// ============================================================================

function createG8C8W1ExitTicket_() {
  const form = FormApp.create('G8.C8.W1: Exit Ticket - Heat Transfer Integration');

  form.setDescription(
    'EXIT TICKET: SHOW WHAT YOU LEARNED\n\n' +
    'This tests whether you can explain thermal conductivity and heat transfer mechanisms.\n\n' +
    '---\n' +
    'Time: About 15 minutes | Points: 23\n\n' +
    'QUESTION TYPES:\n' +
    '- 2 NEW questions (conductivity, mechanisms)\n' +
    '- 2 SPIRAL questions (Cycle 7: chemical energy; Cycle 6: energy transformation)\n' +
    '- 1 INTEGRATION question (connects particle motion to heat transfer)\n' +
    '- 1 SEP-6 question (Construct an explanation)'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'WEEK 1 COMPLETE! Great work!\n\n' +
    'You learned how heat transfers through conduction, convection, and radiation.\n\n' +
    'Key takeaways:\n' +
    '• Heat is energy transfer from hot to cold\n' +
    '• Conductors transfer heat easily; insulators resist\n' +
    '• Three mechanisms: conduction, convection, radiation\n' +
    '• Only radiation works through vacuum\n\n' +
    'NEXT WEEK: Apply this to engineering insulated containers!'
  );

  // --- NEW CONTENT ---
  form.addPageBreakItem()
    .setTitle('NEW CONTENT (Questions 1 & 2)')
    .setHelpText('These test what you learned TODAY about heat transfer.');

  // Q1: NEW - Conductivity (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 1: NEW - Explain Thermal Conductivity (4 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '4: Explains particle motion + electron role + comparison with example\n' +
      '3: Good explanation with some details\n' +
      '2: Partial explanation\n' +
      '1: Vague or incorrect\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Explain WHY metals conduct heat better than wood at the particle level. Include the role of electrons.')
    .setHelpText(
      'Sentence starters:\n' +
      '• "Metals conduct heat well because their particles..." \n' +
      '• "Free electrons in metals can..." \n' +
      '• "Wood conducts heat poorly because..."'
    )
    .setRequired(true);

  // Q2: NEW - Mechanisms (4 pts auto)
  const q2 = form.addMultipleChoiceItem()
    .setTitle('How does the sun warm Earth across 150 million kilometers of empty space?')
    .setRequired(true);

  q2.setChoices([
    q2.createChoice('Radiation - electromagnetic waves travel through vacuum without needing matter', true),
    q2.createChoice('Conduction - heat conducts through space slowly', false),
    q2.createChoice('Convection - hot gases flow from the sun to Earth', false),
    q2.createChoice('All three mechanisms working together', false)
  ]);
  q2.setPoints(4);
  q2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Only radiation can transfer energy through the vacuum of space. Conduction and convection need matter!')
      .build()
  );
  q2.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Space is a vacuum - no matter! Only radiation (EM waves) can travel through empty space.')
      .build()
  );

  // --- SPIRAL CONTENT ---
  form.addPageBreakItem()
    .setTitle('SPIRAL CONTENT (Questions 3 & 4)')
    .setHelpText('These review concepts from previous cycles.');

  // Q3: SPIRAL - Cycle 7 (4 pts auto)
  const q3 = form.addMultipleChoiceItem()
    .setTitle('CYCLE 7 REVIEW: An exothermic chemical reaction releases 500 J of energy. Where does this energy go?')
    .setRequired(true);

  q3.setChoices([
    q3.createChoice('It transfers to the surroundings as thermal energy, increasing temperature', true),
    q3.createChoice('It disappears completely', false),
    q3.createChoice('It stays inside the chemicals forever', false),
    q3.createChoice('It becomes matter', false)
  ]);
  q3.setPoints(4);
  q3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Energy released in reactions transfers to surroundings as heat (thermal energy). Energy is conserved!')
      .build()
  );
  q3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Review Cycle 7: Energy is conserved. Chemical potential energy converts to thermal energy that transfers to surroundings.')
      .build()
  );

  // Q4: SPIRAL - Cycle 6 (4 pts auto)
  const q4 = form.addMultipleChoiceItem()
    .setTitle('CYCLE 6 REVIEW: A toaster converts electrical energy to thermal energy. What happens to the total energy?')
    .setRequired(true);

  q4.setChoices([
    q4.createChoice('Total energy stays the same - it transforms from electrical to thermal', true),
    q4.createChoice('Total energy increases because heat is created', false),
    q4.createChoice('Total energy decreases because the toaster uses it up', false),
    q4.createChoice('Energy is destroyed in the process', false)
  ]);
  q4.setPoints(4);
  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Energy is conserved - it transforms from one form to another, never created or destroyed.')
      .build()
  );
  q4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Review Cycle 6: Conservation of energy - energy transforms between forms but total stays constant.')
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
      '4: Connects particle motion + energy conservation + heat transfer mechanisms\n' +
      '   SEP-6: Constructs explanation\n' +
      '   DCI: Applies PS3.A & PS3.B correctly\n' +
      '   CCC-5: Uses energy and matter concepts\n' +
      '3: Connects 2 concepts well\n' +
      '2: Basic connection\n' +
      '1: Vague response\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('A cup of hot coffee sits on a table. Over time, it cools down to room temperature.\n\nExplain:\n1. What happens to the coffee\'s thermal energy? (Where does it go?)\n2. Which heat transfer mechanisms are involved?\n3. At the particle level, what\'s happening to the coffee molecules?')
    .setHelpText(
      'Sentence starters:\n' +
      '• "The coffee\'s thermal energy transfers to..." \n' +
      '• "This happens through ___ and ___ because..." \n' +
      '• "At the particle level, the coffee molecules..."'
    )
    .setRequired(true);

  // --- SEP-6: CONSTRUCTING EXPLANATIONS ---
  form.addPageBreakItem()
    .setTitle('SEP-6: Construct an Explanation (Question 6)')
    .setHelpText(
      'NGSS Practice: Constructing Explanations\n' +
      'Use scientific principles to explain a phenomenon!'
    );

  form.addSectionHeaderItem()
    .setTitle('Question 6: Construct an Explanation (3 points)')
    .setHelpText(
      'RUBRIC - SEP-6: Constructing Explanations\n' +
      '3 pts: Complete explanation with mechanism, evidence, and reasoning\n' +
      '2 pts: Explanation with some gaps\n' +
      '1 pt: Incomplete explanation\n' +
      '0 pts: No response'
    );

  form.addParagraphTextItem()
    .setTitle('A student claims: "Wearing a white shirt keeps you cooler on a hot sunny day than wearing a black shirt."\n\nConstruct a scientific explanation for why this is true using what you learned about radiation.')
    .setHelpText(
      'Your explanation should include:\n' +
      '• The mechanism (what radiation does to each color)\n' +
      '• Evidence (what you observed or learned)\n' +
      '• Reasoning (why this makes sense scientifically)'
    )
    .setRequired(true);

  logFormInfo_(form, 'G8 C8 W1 Exit Ticket', 23);
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
function testG8C8W1Hook() { createG8C8W1Hook_(); }
function testG8C8W1Station1() { createG8C8W1Station1_(); }
function testG8C8W1Station2() { createG8C8W1Station2_(); }
function testG8C8W1Station3() { createG8C8W1Station3_(); }
function testG8C8W1ExitTicket() { createG8C8W1ExitTicket_(); }
