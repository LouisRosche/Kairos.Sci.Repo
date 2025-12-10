/**
 * ============================================================================
 * GRADE 8 - CYCLE 5 WEEK 2: WAVES & MATERIAL INTERACTIONS
 * 5 Forms | 100 Points Total | ~75 Minutes
 * ============================================================================
 *
 * NGSS ALIGNMENT:
 *   Primary: MS-PS4-2 - Develop and use a model to describe that waves are
 *            reflected, absorbed, or transmitted through various materials
 *            depending on the wave type and material.
 *   Spiral:  MS-LS2-3 - Energy flow in ecosystems (Cycle 4)
 *            MS-LS4-4 - Natural selection (Cycle 3)
 *            Week 1: Wave properties & behaviors
 *
 * 3-DIMENSIONAL LEARNING:
 *   SEP-3: Planning and Carrying Out Investigations
 *   SEP-4: Analyzing and Interpreting Data
 *   SEP-6: Constructing Explanations and Designing Solutions
 *   DCI PS4.A: Wave Properties - Material-dependent transmission
 *   DCI PS4.C: Information Technologies - Digital encoding
 *   CCC-1: Patterns - Material properties predict wave interactions
 *   CCC-2: Cause and Effect - Material structure causes transmission/blocking
 *   CCC-5: Energy and Matter - Energy absorbed/transmitted by materials
 *
 * LEARNING TARGETS:
 *   1. Explain why different materials affect waves differently
 *   2. Quantify transmission, absorption, and reflection for various materials
 *   3. Describe how digital information is encoded in waves
 *   4. Design communication systems considering material interactions
 *
 * FORMS:
 *   1. Hook - The Signal Blocker Mystery (12 pts, ~10 min)
 *   2. Station 1 - Transmission-Absorption Lab (20 pts, ~18 min)
 *   3. Station 2 - Information Encoding Investigation (20 pts, ~15 min)
 *   4. Station 3 - Design a Communication System (25 pts, ~20 min)
 *   5. Exit Ticket - Material Interactions Integration (23 pts, ~15 min)
 *
 * TARGET MISCONCEPTIONS:
 *   - "Dark materials absorb all waves" (45% frequency)
 *   - "Thick materials always block more" (40% frequency)
 *   - "Waves are either blocked or not" (55% frequency)
 *
 * SCHOLARLY FOUNDATIONS COMPLIANCE:
 *   - Refutational text structure (g = 0.41) for misconception targeting
 *   - High-information feedback (d = 0.99) on all items
 *   - Interleaving (d = 0.83) via 2 spiral questions per exit ticket
 *   - Digital-first design with simulation integration
 *
 * ============================================================================
 */

// ============================================================================
// MAIN FUNCTION
// ============================================================================

function createAllG8C5W2Forms() {
  Logger.log('================================================');
  Logger.log('G8 CYCLE 5 WEEK 2: WAVES & MATERIAL INTERACTIONS');
  Logger.log('================================================\n');

  const forms = {
    hook: createG8C5W2Hook_(),
    station1: createG8C5W2Station1_(),
    station2: createG8C5W2Station2_(),
    station3: createG8C5W2Station3_(),
    exitTicket: createG8C5W2ExitTicket_()
  };

  Logger.log('\n================================================');
  Logger.log('ALL 5 FORMS CREATED - 100 POINTS TOTAL');
  Logger.log('================================================');

  return forms;
}

// ============================================================================
// HOOK - THE SIGNAL BLOCKER MYSTERY (12 points, ~10 min)
// ============================================================================

function createG8C5W2Hook_() {
  const form = FormApp.create('G8.C5.W2: Hook - The Signal Blocker Mystery');

  form.setDescription(
    'THE SIGNAL BLOCKER MYSTERY\n\n' +
    'You\'re in a building and your cell phone shows full bars. Walk into an elevator—signal gone.\n' +
    'Move to a room with thick concrete walls—one bar. Go outside near metal fencing—signal varies wildly.\n\n' +
    'Your phone uses invisible waves to communicate, but those waves can\'t go everywhere.\n\n' +
    '---\n' +
    'Time: About 10 minutes | Points: 12\n' +
    'Build on what you learned in Week 1 about wave properties!'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Hook submitted! You\'re ready for Station 1.\n\n' +
    'Next: Measure exactly HOW MUCH different materials block light waves.\n' +
    'We\'ll quantify transmission, absorption, and reflection!'
  );

  // Q1: Observation (3 pts auto)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('Based on everyday experience, which material would MOST effectively block a cell phone signal?')
    .setHelpText('Think about where you lose signal.')
    .setRequired(true);

  q1.setChoices([
    q1.createChoice('Metal (like an elevator or car)', true),
    q1.createChoice('Glass (like a window)', false),
    q1.createChoice('Cardboard (like a shipping box)', false),
    q1.createChoice('Fabric (like a curtain)', false)
  ]);
  q1.setPoints(3);
  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Metals have free electrons that reflect radio waves. That\'s why elevators (metal boxes) kill your signal!')
      .build()
  );
  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Think about where signals disappear: elevators, metal buildings, cars with closed doors. Metal is the signal killer!')
      .build()
  );

  // MTSS Diagnostic (0 pts)
  const mtss1 = form.addMultipleChoiceItem()
    .setTitle('QUICK CHECK (Prior Knowledge): In Week 1, we learned waves interact with materials by reflection, refraction, diffraction, and transmission. What does TRANSMISSION mean?')
    .setHelpText('This checks your Week 1 vocabulary. Does NOT affect your grade.')
    .setRequired(true);

  mtss1.setChoices([
    mtss1.createChoice('The wave passes through the material', true),
    mtss1.createChoice('The wave bounces off the material', false),
    mtss1.createChoice('The wave bends when entering the material', false),
    mtss1.createChoice('The wave spreads around the material', false)
  ]);
  // Diagnostic only - omit setPoints() for ungraded items

  // Q2: Prediction (3 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 2 (3 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '3: Mentions material structure/properties (conductivity, density, free electrons) with reasoning\n' +
      '2: Mentions material type but incomplete mechanism\n' +
      '1: Guess without scientific reasoning\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('WHY do you think metals block cell signals so effectively? Think about what\'s different about the structure of metals compared to glass or cardboard.')
    .setHelpText(
      'Sentence starters:\n' +
      '• "Metals might block signals because their structure..." \n' +
      '• "Unlike glass, metals have ___ that could..." \n' +
      '• "At the atomic level, metals are different because..."'
    )
    .setRequired(true);

  // Q3: Week 1 Connection (3 pts auto)
  const q3 = form.addMultipleChoiceItem()
    .setTitle('WEEK 1 CONNECTION: When a cell signal hits a metal wall, what happens to the wave\'s energy?')
    .setRequired(true);

  q3.setChoices([
    q3.createChoice('Most energy is reflected back; some may be absorbed as heat', true),
    q3.createChoice('The energy is destroyed completely', false),
    q3.createChoice('The energy teleports through the wall', false),
    q3.createChoice('The energy is stored in the metal forever', false)
  ]);
  q3.setPoints(3);
  q3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Energy is conserved. Metals reflect most radio wave energy back. Any absorbed energy becomes heat (though usually tiny amounts).')
      .build()
  );
  q3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Remember Week 1: Energy can\'t be destroyed! When a wave hits a barrier, energy must go somewhere—reflected, absorbed, or transmitted.')
      .build()
  );

  // Q4: Application (3 pts auto)
  const q4 = form.addMultipleChoiceItem()
    .setTitle('A building has glass walls. Compared to metal walls, how would you expect cell signal strength inside?')
    .setRequired(true);

  q4.setChoices([
    q4.createChoice('Stronger signal—glass transmits more radio waves than metal', true),
    q4.createChoice('Same signal—all walls block equally', false),
    q4.createChoice('Weaker signal—glass absorbs more waves', false),
    q4.createChoice('No signal—glass is completely opaque to radio', false)
  ]);
  q4.setPoints(3);
  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Glass transmits radio waves much better than metal. That\'s why you often have better signal near windows!')
      .build()
  );
  q4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Glass is largely transparent to radio waves—that\'s why signal is often better near windows. Different materials affect waves differently!')
      .build()
  );

  logFormInfo_(form, 'G8 C5 W2 Hook', 12);
  return form;
}

// ============================================================================
// STATION 1 - TRANSMISSION-ABSORPTION LAB (20 points, ~18 min)
// ============================================================================

function createG8C5W2Station1_() {
  const form = FormApp.create('G8.C5.W2: Station 1 - Transmission-Absorption Lab');

  form.setDescription(
    'YOUR MISSION: QUANTIFY MATERIAL INTERACTIONS\n\n' +
    'In Week 1, we learned waves can be transmitted, reflected, or absorbed.\n' +
    'Today we\'ll MEASURE exactly how much each material transmits!\n\n' +
    '---\n' +
    'Time: About 18 minutes | Points: 20\n' +
    'Use the light sensor simulation or data table to analyze material properties.'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Station 1 complete!\n\n' +
    'KEY INSIGHT: Different materials transmit different percentages of wave energy.\n' +
    'Metal reflects most, glass transmits most, and others are in between!\n\n' +
    'Continue to Station 2: Information Encoding Investigation'
  );

  // Data reference
  form.addPageBreakItem()
    .setTitle('Reference: Transmission Lab Data')
    .setHelpText(
      'LIGHT TRANSMISSION DATA (from class investigation):\n\n' +
      '┌──────────────────────────────────────────────────────────────────┐\n' +
      '│ MATERIAL     │ INTENSITY (%) │ TRANSMITTED │ ABSORBED/REFLECTED │\n' +
      '├──────────────────────────────────────────────────────────────────┤\n' +
      '│ Air (control)│     100%      │    100%     │        0%          │\n' +
      '│ Clear glass  │     100%      │     90%     │       10%          │\n' +
      '│ White paper  │     100%      │     25%     │       75%          │\n' +
      '│ Black fabric │     100%      │      5%     │       95%          │\n' +
      '│ Aluminum foil│     100%      │     ~0%     │      ~100%         │\n' +
      '│ Cardboard    │     100%      │     10%     │       90%          │\n' +
      '│ Frosted glass│     100%      │     70%     │       30%          │\n' +
      '└──────────────────────────────────────────────────────────────────┘\n\n' +
      'VOCABULARY:\n' +
      '• Transparent: Most light transmits (>75%)\n' +
      '• Translucent: Some light transmits (10-75%)\n' +
      '• Opaque: Little/no light transmits (<10%)'
    );

  // Q1: Data interpretation (4 pts auto)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('Based on the data table, which material is TRANSLUCENT (transmits 10-75% of light)?')
    .setRequired(true);

  q1.setChoices([
    q1.createChoice('White paper (25% transmitted)', true),
    q1.createChoice('Clear glass (90% transmitted)', false),
    q1.createChoice('Aluminum foil (~0% transmitted)', false),
    q1.createChoice('Black fabric (5% transmitted)', false)
  ]);
  q1.setPoints(4);
  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! White paper transmits 25%—within the translucent range (10-75%). Light gets through but is scattered, which is why you can\'t see clear images through paper.')
      .build()
  );
  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Check the definitions: Translucent = 10-75% transmission. White paper at 25% fits this range!')
      .build()
  );

  // Q2: Pattern analysis (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 2: Analyze the Pattern (4 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '4: Identifies metal vs non-metal pattern + explains reflection mechanism\n' +
      '3: Identifies pattern with partial explanation\n' +
      '2: Describes data without pattern identification\n' +
      '1: Incomplete response\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Compare aluminum foil (~0% transmission) to the other materials. What pattern do you notice about metals vs non-metals? Explain WHY metals behave differently.')
    .setHelpText(
      'Sentence starters:\n' +
      '• "Metals like aluminum transmit ~0% while non-metals transmit..." \n' +
      '• "This is because metals have ___ that..." \n' +
      '• "The free electrons in metals cause..."'
    )
    .setRequired(true);

  // Q3: Misconception challenge (4 pts auto)
  const q3 = form.addMultipleChoiceItem()
    .setTitle('MISCONCEPTION CHECK: A student says "Black fabric absorbs more light because it\'s darker, so it should also block more cell phone signals." Is this correct?')
    .setRequired(true);

  q3.setChoices([
    q3.createChoice('No—color affects visible light but has no effect on radio waves', true),
    q3.createChoice('Yes—darker materials absorb all types of waves', false),
    q3.createChoice('Yes—the same properties that absorb light also absorb radio', false),
    q3.createChoice('No—radio waves pass through everything equally', false)
  ]);
  q3.setPoints(4);
  q3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('CORRECT! Color is ONLY about visible light absorption. A black t-shirt lets radio waves pass right through! Cell signals don\'t "see" colors.')
      .build()
  );
  q3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('MISCONCEPTION ALERT: Color = visible light property ONLY. Radio waves don\'t care about color! A black shirt and a white shirt transmit radio waves equally.')
      .build()
  );

  // Q4: Calculation (4 pts auto)
  const q4 = form.addMultipleChoiceItem()
    .setTitle('If light starts at 100% intensity and passes through frosted glass (70% transmitted), then through white paper (25% transmitted), what percentage reaches the sensor?')
    .setHelpText('Hint: Multiply the transmission percentages.')
    .setRequired(true);

  q4.setChoices([
    q4.createChoice('17.5% (70% × 25% = 17.5%)', true),
    q4.createChoice('95% (70% + 25% = 95%)', false),
    q4.createChoice('45% (70% - 25% = 45%)', false),
    q4.createChoice('47.5% ((70% + 25%) ÷ 2 = 47.5%)', false)
  ]);
  q4.setPoints(4);
  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Transmission multiplies, not adds. 0.70 × 0.25 = 0.175 = 17.5%. Each material reduces what\'s already coming through!')
      .build()
  );
  q4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Transmission MULTIPLIES! First material passes 70%, then second passes 25% of THAT. 100% × 0.70 = 70%, then 70% × 0.25 = 17.5%.')
      .build()
  );

  // Q5: Cycle 4 Connection (4 pts auto)
  const q5 = form.addMultipleChoiceItem()
    .setTitle('CYCLE 4 CONNECTION: In Cycle 4, we learned about energy loss at each trophic level (10% rule). How is this similar to light transmission through multiple materials?')
    .setRequired(true);

  q5.setChoices([
    q5.createChoice('Both involve multiplying percentages—energy/light decreases at each step', true),
    q5.createChoice('Both involve adding percentages', false),
    q5.createChoice('Energy is destroyed in both cases', false),
    q5.createChoice('They are completely unrelated', false)
  ]);
  q5.setPoints(4);
  q5.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Great connection! In food chains, 10% × 10% × 10% = tiny energy at top. In optics, each material transmits a PERCENTAGE of incoming light, so they multiply!')
      .build()
  );
  q5.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Remember the 10% rule: each level gets 10% of the previous. Similarly, each material transmits a % of what enters. Both are multiplicative!')
      .build()
  );

  logFormInfo_(form, 'G8 C5 W2 Station 1', 20);
  return form;
}

// ============================================================================
// STATION 2 - INFORMATION ENCODING INVESTIGATION (20 points, ~15 min)
// ============================================================================

function createG8C5W2Station2_() {
  const form = FormApp.create('G8.C5.W2: Station 2 - Information Encoding Investigation');

  form.setDescription(
    'YOUR MISSION: DISCOVER HOW WAVES CARRY INFORMATION\n\n' +
    'Every text, call, video, and website travels as waves!\n' +
    'But how can invisible waves carry words and images?\n\n' +
    'The secret: DIGITAL ENCODING—turning information into 1s and 0s.\n\n' +
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
    'Station 2 complete!\n\n' +
    'KEY INSIGHT: Digital signals use 1s and 0s encoded in wave properties!\n' +
    'Amplitude shift, frequency shift, and phase shift all work.\n\n' +
    'Continue to Station 3: Design a Communication System'
  );

  // Reference
  form.addPageBreakItem()
    .setTitle('Reference: Digital Encoding Methods')
    .setHelpText(
      'HOW WAVES CARRY DIGITAL INFORMATION:\n\n' +
      '┌────────────────────────────────────────────────────────────────┐\n' +
      '│ ENCODING TYPE   │ HOW IT WORKS           │ EXAMPLE              │\n' +
      '├────────────────────────────────────────────────────────────────┤\n' +
      '│ AMPLITUDE SHIFT │ High amplitude = 1     │ Loud = 1, quiet = 0  │\n' +
      '│ (ASK)           │ Low amplitude = 0      │                      │\n' +
      '├────────────────────────────────────────────────────────────────┤\n' +
      '│ FREQUENCY SHIFT │ High frequency = 1     │ High pitch = 1       │\n' +
      '│ (FSK)           │ Low frequency = 0      │ Low pitch = 0        │\n' +
      '├────────────────────────────────────────────────────────────────┤\n' +
      '│ PHASE SHIFT     │ Shifted wave = 1       │ Modern cell signals  │\n' +
      '│ (PSK)           │ Unshifted wave = 0     │ Most reliable!       │\n' +
      '└────────────────────────────────────────────────────────────────┘\n\n' +
      'BINARY CODE:\n' +
      '• A = 01000001\n' +
      '• B = 01000010\n' +
      '• 0 = 00110000\n' +
      '• Every character = 8 bits (binary digits)\n\n' +
      'WHY DIGITAL > ANALOG:\n' +
      '• Noise doesn\'t change 1 to 0 easily (just needs to be "above" or "below" threshold)\n' +
      '• Can detect and correct errors\n' +
      '• Easy to copy without quality loss'
    );

  // Q1: Binary understanding (4 pts auto)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('Digital information uses binary code (1s and 0s). Why does binary work better than trying to send exact voltage levels (analog)?')
    .setRequired(true);

  q1.setChoices([
    q1.createChoice('Binary only needs to distinguish "high" vs "low"—easier to detect correctly with noise', true),
    q1.createChoice('Binary signals travel faster than analog signals', false),
    q1.createChoice('Analog signals can\'t travel through wires', false),
    q1.createChoice('Binary uses less electricity than analog', false)
  ]);
  q1.setPoints(4);
  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Binary is robust to noise because you only need to tell "high" from "low." Analog needs exact values—small noise causes big errors!')
      .build()
  );
  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Think about noise: If signal gets a little weaker, analog value changes completely. Binary just needs to be "above 50%" to count as 1!')
      .build()
  );

  // Q2: Encoding identification (4 pts auto)
  const q2 = form.addMultipleChoiceItem()
    .setTitle('A radio station encodes data by changing between two different pitches (frequencies). Which encoding method is this?')
    .setRequired(true);

  q2.setChoices([
    q2.createChoice('Frequency Shift Keying (FSK)', true),
    q2.createChoice('Amplitude Shift Keying (ASK)', false),
    q2.createChoice('Phase Shift Keying (PSK)', false),
    q2.createChoice('Digital Amplitude Modulation (DAM)', false)
  ]);
  q2.setPoints(4);
  q2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Frequency shift = different pitches for 1 and 0. High pitch = 1, low pitch = 0. This is how early modems worked!')
      .build()
  );
  q2.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Pitch = frequency! Changing between two pitches is Frequency Shift Keying (FSK). Amplitude = loudness, Phase = timing offset.')
      .build()
  );

  // Q3: Binary encoding (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 3: Decode the Message (4 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '4: Correct decoding + explanation of process\n' +
      '3: Correct answer only\n' +
      '2: Partial decode or process explanation only\n' +
      '1: Attempted but incorrect\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Using amplitude shift encoding, a signal shows: HIGH-LOW-HIGH-LOW (where HIGH=1, LOW=0). Write the binary number this represents. Then, if this 4-bit binary number represents a value from 0-15, what decimal number is it?')
    .setHelpText(
      'Hint:\n' +
      '• HIGH-LOW-HIGH-LOW = 1010 in binary\n' +
      '• Binary place values (right to left): 1, 2, 4, 8\n' +
      '• 1010 = (1×8) + (0×4) + (1×2) + (0×1) = ?'
    )
    .setRequired(true);

  // Q4: Error resistance (4 pts auto)
  const q4 = form.addMultipleChoiceItem()
    .setTitle('During transmission, electrical noise reduces signal strength by 20%. How does this affect digital vs analog signals?')
    .setRequired(true);

  q4.setChoices([
    q4.createChoice('Digital still works (1s and 0s still distinguishable); analog has 20% quality loss', true),
    q4.createChoice('Both have 20% quality loss', false),
    q4.createChoice('Digital has 20% quality loss; analog is unaffected', false),
    q4.createChoice('Both signals are completely destroyed', false)
  ]);
  q4.setPoints(4);
  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Digital is noise-resistant: a "1" at 80% strength is still clearly a "1"! Analog loses 20% quality directly.')
      .build()
  );
  q4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Digital advantage: only need to distinguish high/low. 20% weaker "high" is still obviously "high." Analog loses exact value precision!')
      .build()
  );

  // Q5: Application (4 pts auto)
  const q5 = form.addMultipleChoiceItem()
    .setTitle('Why do modern cell phones use Phase Shift Keying (PSK) instead of simple Amplitude Shift Keying (ASK)?')
    .setRequired(true);

  q5.setChoices([
    q5.createChoice('PSK is more resistant to interference because phase is harder to corrupt than amplitude', true),
    q5.createChoice('PSK uses less battery power', false),
    q5.createChoice('ASK doesn\'t work with digital signals', false),
    q5.createChoice('PSK was invented more recently so it must be better', false)
  ]);
  q5.setPoints(4);
  q5.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Phase (timing) is very stable even when amplitude fluctuates. Interference easily changes amplitude but rarely shifts phase—making PSK more reliable!')
      .build()
  );
  q5.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Think about what interference does: it mostly affects loudness (amplitude). Phase (timing relationship) is much more stable, making PSK ideal for noisy environments.')
      .build()
  );

  logFormInfo_(form, 'G8 C5 W2 Station 2', 20);
  return form;
}

// ============================================================================
// STATION 3 - DESIGN A COMMUNICATION SYSTEM (25 points, ~20 min)
// ============================================================================

function createG8C5W2Station3_() {
  const form = FormApp.create('G8.C5.W2: Station 3 - Design a Communication System');

  form.setDescription(
    'ENGINEERING CHALLENGE: ANTARCTIC RESEARCH COMMUNICATION\n\n' +
    'A research station in Antarctica needs to communicate with the main base 50 km away.\n' +
    'Between them: ice fields, a mountain range, and a research plane flying overhead.\n\n' +
    'Your task: Design a RELIABLE communication system!\n\n' +
    '---\n' +
    'Time: About 20 minutes | Points: 25 (highest value!)\n\n' +
    'CONSTRAINTS:\n' +
    '• Must work in extreme cold (-40°C)\n' +
    '• Limited power (solar/battery only)\n' +
    '• Mountains may block direct line of sight\n' +
    '• Backup system required for emergencies'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Station 3 complete!\n\n' +
    'You\'ve designed a real-world communication system using wave science!\n' +
    'Key factors: frequency choice, obstacle handling, power efficiency, redundancy.\n\n' +
    'Continue to Exit Ticket'
  );

  // Reference
  form.addPageBreakItem()
    .setTitle('Reference: Communication System Options')
    .setHelpText(
      'WAVE OPTIONS FOR COMMUNICATION:\n\n' +
      '┌────────────────────────────────────────────────────────────────────────┐\n' +
      '│ WAVE TYPE        │ RANGE    │ OBSTACLE HANDLING     │ POWER NEEDED    │\n' +
      '├────────────────────────────────────────────────────────────────────────┤\n' +
      '│ HF Radio (3-30 MHz) │ 1000+ km │ Bounces off ionosphere │ Medium        │\n' +
      '│                     │          │ Can go OVER mountains  │               │\n' +
      '├────────────────────────────────────────────────────────────────────────┤\n' +
      '│ VHF Radio (30-300 MHz)│ 50 km  │ Line-of-sight mostly  │ Low           │\n' +
      '│                     │          │ Some diffraction       │               │\n' +
      '├────────────────────────────────────────────────────────────────────────┤\n' +
      '│ Satellite Link    │ Global   │ Goes to space—bypasses │ High          │\n' +
      '│                   │          │ ALL ground obstacles   │               │\n' +
      '├────────────────────────────────────────────────────────────────────────┤\n' +
      '│ Microwave Relay   │ 50 km    │ Needs clear line-of-sight│ Medium       │\n' +
      '│ (point-to-point)  │          │ Mountain relay possible │               │\n' +
      '└────────────────────────────────────────────────────────────────────────┘\n\n' +
      'COLD WEATHER CONSIDERATIONS:\n' +
      '• Solar panels work but sun is low/absent in winter\n' +
      '• Batteries lose capacity in cold\n' +
      '• Equipment must handle -40°C temperatures\n' +
      '• Ice/snow can affect antenna performance'
    );

  // Q1: Primary system design (7 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 1: Design Your Primary Communication System (7 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '7: Specifies wave type + frequency + justifies with obstacle/power reasoning + addresses cold\n' +
      '5-6: Good design with most elements, minor gaps\n' +
      '3-4: Basic design without full justification\n' +
      '1-2: Minimal attempt\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Design your PRIMARY communication system. Include:\n• What type of waves you\'ll use\n• Why you chose this type (consider the mountain obstacle)\n• How you\'ll handle the power constraints\n• How your system works in extreme cold')
    .setHelpText(
      'Sentence starters:\n' +
      '• "For my primary system, I choose ___ because..." \n' +
      '• "To get around the mountain, I will..." \n' +
      '• "For power, I\'ll use ___ because in Antarctica..."'
    )
    .setRequired(true);

  // Q2: Backup system (6 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 2: Design Your Backup System (6 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '6: Different technology from primary + explains when to use + justifies choice\n' +
      '4-5: Viable backup with partial justification\n' +
      '2-3: Basic backup without reasoning\n' +
      '1: Minimal attempt\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('What BACKUP system will you use if your primary fails? It should use a DIFFERENT technology than your primary.')
    .setHelpText(
      'Sentence starters:\n' +
      '• "My backup uses ___ which is different from my primary because..." \n' +
      '• "I would switch to backup when..." \n' +
      '• "This provides redundancy because..."'
    )
    .setRequired(true);

  // Q3: Trade-off analysis (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 3: Analyze Trade-offs (4 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '4: Identifies specific trade-off with explanation of both sides\n' +
      '3: Identifies trade-off with partial explanation\n' +
      '2: General mention without specifics\n' +
      '1: Vague response\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('What trade-offs did you make in your design? (For example: reliability vs power consumption, range vs cost, complexity vs maintenance)')
    .setHelpText(
      'Sentence starters:\n' +
      '• "I traded off ___ for ___ because..." \n' +
      '• "A limitation of my design is..." \n' +
      '• "If power wasn\'t limited, I would change..."'
    )
    .setRequired(true);

  // Q4: Problem solving (4 pts auto)
  const q4 = form.addMultipleChoiceItem()
    .setTitle('Your VHF radio can\'t reach the base directly because of the mountain. Which solution BEST uses your wave knowledge?')
    .setRequired(true);

  q4.setChoices([
    q4.createChoice('Set up a relay station on the mountain peak—it has line-of-sight to both locations', true),
    q4.createChoice('Increase the power—more power means waves go through mountains', false),
    q4.createChoice('Switch to visible light—light waves are smaller so they go around mountains', false),
    q4.createChoice('Paint the mountain white—it will reflect signals around it', false)
  ]);
  q4.setPoints(4);
  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! A relay station receives your signal, then retransmits to the base. This is how many real mountain communication systems work!')
      .build()
  );
  q4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('VHF is mostly line-of-sight. More power doesn\'t help if the mountain is in the way! A relay on top has line-of-sight to both sides.')
      .build()
  );

  // Q5: Real-world connection (4 pts auto)
  const q5 = form.addMultipleChoiceItem()
    .setTitle('Real Antarctic research stations often use HF radio as one of their communication methods. Why is HF useful there?')
    .setRequired(true);

  q5.setChoices([
    q5.createChoice('HF bounces off the ionosphere, allowing communication over the horizon and past obstacles', true),
    q5.createChoice('HF is the only type of radio that works in cold temperatures', false),
    q5.createChoice('HF uses less power than all other radio types', false),
    q5.createChoice('HF signals travel faster than other radio waves', false)
  ]);
  q5.setPoints(4);
  q5.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! HF waves bounce off the ionosphere (sky-wave propagation), allowing communication over thousands of km without satellites or relays!')
      .build()
  );
  q5.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('HF\'s superpower is ionospheric bounce—the waves go up to the sky and bounce back down, reaching far beyond line-of-sight. All radio waves travel at light speed!')
      .build()
  );

  logFormInfo_(form, 'G8 C5 W2 Station 3', 25);
  return form;
}

// ============================================================================
// EXIT TICKET - MATERIAL INTERACTIONS INTEGRATION (23 points, ~15 min)
// ============================================================================

function createG8C5W2ExitTicket_() {
  const form = FormApp.create('G8.C5.W2: Exit Ticket - Material Interactions Integration');

  form.setDescription(
    'EXIT TICKET: SHOW WHAT YOU LEARNED\n\n' +
    'This tests whether you can apply material interaction concepts.\n\n' +
    '---\n' +
    'Time: About 15 minutes | Points: 23\n\n' +
    'QUESTION TYPES:\n' +
    '- 2 NEW questions (material interactions, information encoding)\n' +
    '- 2 SPIRAL questions (Week 1 + Cycle 4 review)\n' +
    '- 1 INTEGRATION question (connects material science to communication)\n' +
    '- 1 SEP-4 question (analyzing transmission data)'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'WEEK 2 COMPLETE! Great work!\n\n' +
    'You learned about material interactions and information encoding.\n\n' +
    'Key takeaways:\n' +
    '• Different materials transmit, absorb, or reflect different amounts\n' +
    '• Metals reflect radio waves; glass transmits them\n' +
    '• Digital encoding (binary) is more noise-resistant than analog\n' +
    '• Communication systems must consider obstacles, power, and reliability\n\n' +
    'NEXT WEEK: Synthesis & Assessment'
  );

  // NEW CONTENT
  form.addPageBreakItem()
    .setTitle('NEW CONTENT (Questions 1 & 2)')
    .setHelpText('These test what you learned TODAY.');

  // Q1: NEW - Material interaction (4 pts auto)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('A smartphone case is made of metal instead of plastic. How will this affect signal strength?')
    .setRequired(true);

  q1.setChoices([
    q1.createChoice('Weaker signal—metal reflects/blocks radio waves', true),
    q1.createChoice('Stronger signal—metal amplifies radio waves', false),
    q1.createChoice('No change—case material doesn\'t affect signals', false),
    q1.createChoice('Depends on the color of the metal', false)
  ]);
  q1.setPoints(4);
  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Metal cases can significantly reduce signal strength because they reflect radio waves. Many phone manufacturers avoid full metal enclosures for this reason!')
      .build()
  );
  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Metal reflects radio waves—remember the elevator example? A metal phone case is like a mini elevator around your antenna!')
      .build()
  );

  // Q2: NEW - Digital encoding (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 2: NEW - Explain Digital Advantage (4 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '4: Explains binary threshold + error resistance + gives example\n' +
      '3: Explains advantage with partial reasoning\n' +
      '2: States digital is better without explanation\n' +
      '1: Vague response\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Explain why digital (binary) signals are more reliable than analog signals when there is interference/noise.')
    .setHelpText(
      'Sentence starters:\n' +
      '• "Digital signals only need to distinguish between ___ and ___..." \n' +
      '• "When noise reduces the signal, digital still works because..." \n' +
      '• "Analog signals are affected more because..."'
    )
    .setRequired(true);

  // SPIRAL CONTENT
  form.addPageBreakItem()
    .setTitle('SPIRAL CONTENT (Questions 3 & 4)')
    .setHelpText('These review Week 1 and Cycle 4.');

  // Q3: SPIRAL - Week 1 wave properties (4 pts auto)
  const q3 = form.addMultipleChoiceItem()
    .setTitle('WEEK 1 REVIEW: Why can sound waves bend around corners (diffraction) better than light waves?')
    .setRequired(true);

  q3.setChoices([
    q3.createChoice('Sound waves have much longer wavelengths than light waves', true),
    q3.createChoice('Sound waves travel faster than light waves', false),
    q3.createChoice('Light waves are blocked by air but sound isn\'t', false),
    q3.createChoice('Sound waves have more energy than light waves', false)
  ]);
  q3.setPoints(4);
  q3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Sound wavelengths are meters long; light wavelengths are nanometers. Longer wavelengths diffract more around obstacles!')
      .build()
  );
  q3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Review Week 1: Diffraction depends on wavelength. Longer wavelengths (sound: ~1m) diffract much more than shorter ones (light: ~500nm).')
      .build()
  );

  // Q4: SPIRAL - Cycle 4 energy (4 pts auto)
  const q4 = form.addMultipleChoiceItem()
    .setTitle('CYCLE 4 REVIEW: When light is absorbed by a material, what happens to the light\'s energy?')
    .setRequired(true);

  q4.setChoices([
    q4.createChoice('It\'s converted to heat in the material (thermal energy)', true),
    q4.createChoice('It\'s destroyed completely', false),
    q4.createChoice('It\'s stored as light energy forever', false),
    q4.createChoice('It teleports to another location', false)
  ]);
  q4.setPoints(4);
  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Energy is conserved. Absorbed light becomes thermal energy (heat). That\'s why black objects get hot in sunlight—they absorb more light energy!')
      .build()
  );
  q4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Remember Cycle 4: Energy is NEVER destroyed! Absorbed light energy transforms into heat. That\'s why things warm up in sunlight.')
      .build()
  );

  // INTEGRATION
  form.addPageBreakItem()
    .setTitle('INTEGRATION (Question 5)')
    .setHelpText('Connect material science to communication.');

  // Q5: Integration (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 5: INTEGRATION (4 points)')
    .setHelpText(
      '3D ASSESSMENT RUBRIC:\n' +
      '4: Connects material properties + wave behavior + communication application\n' +
      '3: Makes connection with partial explanation\n' +
      '2: Mentions concepts but doesn\'t connect\n' +
      '1: Vague connection\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('A new building is being designed. The architect wants large metal walls for aesthetics, but the client needs strong cell signal inside. Using your knowledge of wave-material interactions, propose a solution.')
    .setHelpText(
      'Sentence starters:\n' +
      '• "Metal blocks cell signals because..." \n' +
      '• "To maintain signal while using metal, the architect could..." \n' +
      '• "Another option would be to use ___ instead of solid metal because..."'
    )
    .setRequired(true);

  // SEP-4
  form.addPageBreakItem()
    .setTitle('SEP-4: Analyze Data (Question 6)')
    .setHelpText('Analyze transmission data to draw conclusions.');

  form.addSectionHeaderItem()
    .setTitle('Question 6: Analyze Transmission Data (3 points)')
    .setHelpText(
      'RUBRIC - SEP-4: Analyzing Data\n' +
      '3 pts: Calculates correctly + interprets result + suggests application\n' +
      '2 pts: Calculates correctly with interpretation\n' +
      '1 pt: Calculation only\n' +
      '0 pts: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Light passes through Material A (80% transmission) then Material B (50% transmission). Calculate the final transmission percentage, and explain what this means for designing a window system.')
    .setHelpText(
      'Show your work:\n' +
      '• Calculate: 80% × 50% = ?\n' +
      '• Explain what this means for a building designer'
    )
    .setRequired(true);

  logFormInfo_(form, 'G8 C5 W2 Exit Ticket', 23);
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
function testG8C5W2Hook() { createG8C5W2Hook_(); }
function testG8C5W2Station1() { createG8C5W2Station1_(); }
function testG8C5W2Station2() { createG8C5W2Station2_(); }
function testG8C5W2Station3() { createG8C5W2Station3_(); }
function testG8C5W2ExitTicket() { createG8C5W2ExitTicket_(); }
