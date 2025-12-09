/**
 * ============================================================================
 * GRADE 8 - CYCLE 5 WEEK 3: SYNTHESIS & ASSESSMENT
 * 5 Forms | 100 Points Total | ~75 Minutes
 * ============================================================================
 *
 * NGSS ALIGNMENT:
 *   Primary: MS-PS4-2 - Wave-material interactions
 *   Spiral:  MS-LS2-3 - Energy flow in ecosystems (Cycle 4)
 *            MS-LS4-4 - Natural selection (Cycle 3)
 *            Weeks 1-2 content integration
 *
 * WEEK 3 ASSESSMENT STRUCTURE:
 *   Form 1: Synthesis (20 pts) - Connect Weeks 1 & 2
 *   Form 2: Cumulative Part A - Wave Properties (15 pts)
 *   Form 3: Cumulative Part B - Material Interactions (15 pts)
 *   Form 4: Cumulative Part C/D - Information Transfer & Model Development (30 pts)
 *   Form 5: Misconception Check (20 pts)
 *
 * SCHOLARLY FOUNDATIONS COMPLIANCE:
 *   - Refutational text structure (g = 0.41) for misconceptions
 *   - High-information feedback (d = 0.99)
 *   - Interleaving (d = 0.83) via spiral questions
 *   - Spacing effect: testing after 2-week learning period
 *
 * ============================================================================
 */

// ============================================================================
// MAIN FUNCTION
// ============================================================================

function createAllG8C5W3Forms() {
  Logger.log('================================================');
  Logger.log('G8 CYCLE 5 WEEK 3: SYNTHESIS & ASSESSMENT');
  Logger.log('================================================\n');

  const forms = {
    synthesis: createG8C5W3Synthesis_(),
    partA: createG8C5W3PartA_(),
    partB: createG8C5W3PartB_(),
    partCD: createG8C5W3PartCD_(),
    misconception: createG8C5W3Misconception_()
  };

  Logger.log('\n================================================');
  Logger.log('ALL 5 FORMS CREATED - 100 POINTS TOTAL');
  Logger.log('================================================');

  return forms;
}

// ============================================================================
// FORM 1: SYNTHESIS (20 points, ~15 min)
// Connect Weeks 1 & 2 concepts
// ============================================================================

function createG8C5W3Synthesis_() {
  const form = FormApp.create('G8.C5.W3: Part 1 - Synthesis');

  form.setDescription(
    'PART 1: SYNTHESIS\n\n' +
    'This section tests your ability to CONNECT concepts from Weeks 1 and 2.\n' +
    'Show how wave properties lead to material interaction outcomes!\n\n' +
    '---\n' +
    'Time: About 15 minutes | Points: 20\n' +
    'You may use your notecard for reference.'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Part 1 Complete!\n\n' +
    'Continue to Part 2: Cumulative Assessment (Wave Properties)'
  );

  // Q1: Connection - Wavelength to transmission (5 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 1: Connect Wavelength to Transmission (5 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '5: Explains wavelength difference + relates to material gaps/structure + gives prediction mechanism\n' +
      '4: Strong connection with minor gaps\n' +
      '3: Basic connection without mechanism\n' +
      '2: Partial explanation\n' +
      '1: Minimal attempt\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('SYNTHESIS: Explain why radio waves (wavelength ~1 m) pass through walls but visible light (wavelength ~500 nm) doesn\'t. Connect your answer to what you learned about both wave properties AND material structure.')
    .setHelpText(
      'Your answer should include:\n' +
      '• Week 1: How wavelength affects wave behavior\n' +
      '• Week 2: How materials interact with different wavelengths\n' +
      '• The CONNECTION: Why wavelength + material structure = transmission outcome'
    )
    .setRequired(true);

  // Q2: Application (5 pts auto)
  const q2 = form.addMultipleChoiceItem()
    .setTitle('SYNTHESIS APPLICATION: A new building material is being tested. It transmits 90% of radio waves, 50% of infrared, and 5% of visible light. What pattern does this suggest about wavelength and transmission?')
    .setRequired(true);

  q2.setChoices([
    q2.createChoice('Longer wavelengths are transmitted more than shorter wavelengths through this material', true),
    q2.createChoice('Shorter wavelengths are transmitted more than longer wavelengths', false),
    q2.createChoice('All wavelengths are transmitted equally', false),
    q2.createChoice('Transmission has nothing to do with wavelength', false)
  ]);
  q2.setPoints(5);
  q2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Radio (longest) = 90%, Infrared (medium) = 50%, Visible (shortest) = 5%. The pattern is clear: longer wavelengths transmit better through this material.')
      .build()
  );
  q2.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Look at the data: Radio (longest wavelength) = 90% transmission, Visible (shortest) = 5%. Longer wavelengths clearly transmit more!')
      .build()
  );

  // Q3: Integration diagram description (5 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 3: Describe a Wave-Material Model (5 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '5: Describes all key components + explains interaction + shows wavelength comparison\n' +
      '4: Most components with good explanation\n' +
      '3: Basic description missing key elements\n' +
      '2: Partial model description\n' +
      '1: Minimal attempt\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('SYNTHESIS: Describe a model that shows why a microwave oven door mesh blocks microwaves but lets you see inside. What would you show? What labels would you include?')
    .setHelpText(
      'Your description should include:\n' +
      '• The mesh structure (hole size relative to wavelengths)\n' +
      '• Microwave waves and their wavelength\n' +
      '• Visible light waves and their wavelength\n' +
      '• What happens to each wave type at the mesh'
    )
    .setRequired(true);

  // Q4: Cross-cycle integration (5 pts auto)
  const q4 = form.addMultipleChoiceItem()
    .setTitle('INTEGRATION: Both waves AND food chains transfer energy. When energy is absorbed by a material (wave) or by an organism (food chain), what happens to the energy in both cases?')
    .setRequired(true);

  q4.setChoices([
    q4.createChoice('Energy is converted to heat/thermal energy and becomes unavailable for transfer', true),
    q4.createChoice('Energy is destroyed', false),
    q4.createChoice('Energy is stored permanently', false),
    q4.createChoice('Energy teleports to another system', false)
  ]);
  q4.setPoints(5);
  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Excellent integration! In both systems, absorbed energy becomes heat (thermal energy). This is why neither waves nor food chains transfer 100% of their energy forward!')
      .build()
  );
  q4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Energy is conserved! In waves AND food chains, absorbed energy becomes heat. That\'s why each trophic level loses 90% and why materials warm up when absorbing light.')
      .build()
  );

  logFormInfo_(form, 'G8 C5 W3 Part 1 Synthesis', 20);
  return form;
}

// ============================================================================
// FORM 2: CUMULATIVE PART A - WAVE PROPERTIES (15 points)
// ============================================================================

function createG8C5W3PartA_() {
  const form = FormApp.create('G8.C5.W3: Part 2A - Wave Properties');

  form.setDescription(
    'PART 2A: WAVE PROPERTIES\n\n' +
    'Review of Week 1 content: wave behaviors and the EM spectrum.\n\n' +
    '---\n' +
    'Time: About 10 minutes | Points: 15'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Part 2A Complete!\n\n' +
    'Continue to Part 2B: Material Interactions'
  );

  // Q1: Wave behavior identification (3 pts auto)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('When a wave bounces off a surface at the same angle it arrived, this behavior is called:')
    .setRequired(true);

  q1.setChoices([
    q1.createChoice('Reflection', true),
    q1.createChoice('Refraction', false),
    q1.createChoice('Diffraction', false),
    q1.createChoice('Transmission', false)
  ]);
  q1.setPoints(3);
  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Reflection = wave bounces. Angle in = angle out.')
      .build()
  );
  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Reflection = bouncing. Refraction = bending when entering new medium. Diffraction = spreading around obstacles.')
      .build()
  );

  // Q2: EM spectrum order (3 pts auto)
  const q2 = form.addMultipleChoiceItem()
    .setTitle('Which correctly orders EM waves from LONGEST to SHORTEST wavelength?')
    .setRequired(true);

  q2.setChoices([
    q2.createChoice('Radio → Microwave → Infrared → Visible → UV → X-ray → Gamma', true),
    q2.createChoice('Gamma → X-ray → UV → Visible → Infrared → Microwave → Radio', false),
    q2.createChoice('Visible → UV → Radio → Infrared → Gamma → X-ray → Microwave', false),
    q2.createChoice('Microwave → Radio → Gamma → Visible → UV → X-ray → Infrared', false)
  ]);
  q2.setPoints(3);
  q2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Radio has the longest wavelength (and lowest energy). Gamma has the shortest wavelength (and highest energy).')
      .build()
  );
  q2.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Remember: Radio (longest) → Gamma (shortest). Mnemonic: "Randy Moves Into Very Unusual X-treme Games"')
      .build()
  );

  // Q3: Wave energy transfer (3 pts auto)
  const q3 = form.addMultipleChoiceItem()
    .setTitle('What do waves transfer from one place to another?')
    .setRequired(true);

  q3.setChoices([
    q3.createChoice('Energy (without matter)', true),
    q3.createChoice('Matter (particles move with the wave)', false),
    q3.createChoice('Both energy and matter equally', false),
    q3.createChoice('Nothing—waves are just patterns', false)
  ]);
  q3.setPoints(3);
  q3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Waves transfer ENERGY, not matter. A cork bobs but doesn\'t travel—only the energy moves forward!')
      .build()
  );
  q3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('KEY CONCEPT: Waves transfer energy WITHOUT transferring matter. The particles oscillate in place; energy moves forward.')
      .build()
  );

  // Q4: Wavelength and diffraction (3 pts auto)
  const q4 = form.addMultipleChoiceItem()
    .setTitle('Why can you hear someone talking around a corner but not see them?')
    .setRequired(true);

  q4.setChoices([
    q4.createChoice('Sound waves have longer wavelengths and diffract more around obstacles', true),
    q4.createChoice('Light waves travel faster than sound waves', false),
    q4.createChoice('Sound waves have more energy than light waves', false),
    q4.createChoice('Eyes are less sensitive than ears', false)
  ]);
  q4.setPoints(3);
  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Sound wavelengths (~1m) are comparable to doorway size, so they diffract around. Light wavelengths (~500nm) are tiny—minimal diffraction.')
      .build()
  );
  q4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Diffraction depends on wavelength relative to obstacle size. Sound (~1m) diffracts easily; light (~500nm) does not.')
      .build()
  );

  // Q5: Application (3 pts auto)
  const q5 = form.addMultipleChoiceItem()
    .setTitle('X-rays have higher energy than visible light. What does this tell you about X-ray wavelengths?')
    .setRequired(true);

  q5.setChoices([
    q5.createChoice('X-rays have shorter wavelengths than visible light', true),
    q5.createChoice('X-rays have longer wavelengths than visible light', false),
    q5.createChoice('X-rays have the same wavelength as visible light', false),
    q5.createChoice('Energy and wavelength are unrelated', false)
  ]);
  q5.setPoints(3);
  q5.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Higher energy = shorter wavelength. X-rays are shorter (more energetic) than visible light.')
      .build()
  );
  q5.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Energy and wavelength are inversely related: higher energy = shorter wavelength. X-rays have more energy, so shorter wavelength.')
      .build()
  );

  logFormInfo_(form, 'G8 C5 W3 Part 2A Wave Properties', 15);
  return form;
}

// ============================================================================
// FORM 3: CUMULATIVE PART B - MATERIAL INTERACTIONS (15 points)
// ============================================================================

function createG8C5W3PartB_() {
  const form = FormApp.create('G8.C5.W3: Part 2B - Material Interactions');

  form.setDescription(
    'PART 2B: MATERIAL INTERACTIONS\n\n' +
    'Review of Week 2 content: how materials affect wave transmission.\n\n' +
    '---\n' +
    'Time: About 10 minutes | Points: 15'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Part 2B Complete!\n\n' +
    'Continue to Part 2C/D: Information Transfer & Model Development'
  );

  // Q1: Metal reflection (3 pts auto)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('Why do metals effectively block cell phone signals?')
    .setRequired(true);

  q1.setChoices([
    q1.createChoice('Free electrons in metals reflect radio waves', true),
    q1.createChoice('Metals absorb all electromagnetic waves', false),
    q1.createChoice('Metals are darker than other materials', false),
    q1.createChoice('Metals are heavier than other materials', false)
  ]);
  q1.setPoints(3);
  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Metals have free electrons that oscillate with incoming radio waves, causing reflection. This is why elevators block signals!')
      .build()
  );
  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Metals reflect radio waves because of their free electrons. Color and weight don\'t affect radio wave interactions!')
      .build()
  );

  // Q2: Transmission calculation (3 pts auto)
  const q2 = form.addMultipleChoiceItem()
    .setTitle('Light passes through Material A (60% transmission) then Material B (50% transmission). What percentage reaches the end?')
    .setRequired(true);

  q2.setChoices([
    q2.createChoice('30% (60% × 50% = 30%)', true),
    q2.createChoice('110% (60% + 50% = 110%)', false),
    q2.createChoice('55% ((60% + 50%) ÷ 2 = 55%)', false),
    q2.createChoice('10% (60% - 50% = 10%)', false)
  ]);
  q2.setPoints(3);
  q2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Transmission percentages MULTIPLY. 0.60 × 0.50 = 0.30 = 30%. Each layer reduces what\'s already transmitted.')
      .build()
  );
  q2.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Transmission MULTIPLIES, not adds! First material passes 60%, then second passes 50% of THAT. 60% × 50% = 30%.')
      .build()
  );

  // Q3: Material classification (3 pts auto)
  const q3 = form.addMultipleChoiceItem()
    .setTitle('A material transmits 20% of light. How would you classify this material?')
    .setRequired(true);

  q3.setChoices([
    q3.createChoice('Translucent (10-75% transmission)', true),
    q3.createChoice('Transparent (>75% transmission)', false),
    q3.createChoice('Opaque (<10% transmission)', false),
    q3.createChoice('Reflective (0% transmission)', false)
  ]);
  q3.setPoints(3);
  q3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! 20% is in the translucent range (10-75%). Light gets through but not clearly—like frosted glass.')
      .build()
  );
  q3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Definitions: Transparent >75%, Translucent 10-75%, Opaque <10%. At 20%, this material is translucent.')
      .build()
  );

  // Q4: Wavelength-material relationship (3 pts auto)
  const q4 = form.addMultipleChoiceItem()
    .setTitle('WiFi signals (wavelength ~12 cm) pass through walls, but visible light (wavelength ~500 nm) doesn\'t. What principle explains this?')
    .setRequired(true);

  q4.setChoices([
    q4.createChoice('Longer wavelengths can diffract through gaps that shorter wavelengths cannot', true),
    q4.createChoice('WiFi has more energy and pushes through materials', false),
    q4.createChoice('Light is heavier than WiFi signals', false),
    q4.createChoice('WiFi signals are invisible so they can sneak through', false)
  ]);
  q4.setPoints(3);
  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! WiFi wavelength is 240,000× longer than light. It diffracts through gaps in wall materials that are invisible to the much smaller light waves.')
      .build()
  );
  q4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Wavelength determines transmission! Longer waves (WiFi: 12 cm) can pass through gaps that block shorter waves (light: 500 nm).')
      .build()
  );

  // Q5: Application (3 pts auto)
  const q5 = form.addMultipleChoiceItem()
    .setTitle('An architect wants maximum cell signal inside a building. Which wall material should they avoid?')
    .setRequired(true);

  q5.setChoices([
    q5.createChoice('Solid metal panels', true),
    q5.createChoice('Glass windows', false),
    q5.createChoice('Drywall (paper over gypsum)', false),
    q5.createChoice('Wooden panels', false)
  ]);
  q5.setPoints(3);
  q5.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Metal reflects radio waves, blocking cell signals. Glass, drywall, and wood all transmit radio waves reasonably well.')
      .build()
  );
  q5.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Metal is the signal killer! Its free electrons reflect radio waves. Glass, drywall, and wood are relatively transparent to cell signals.')
      .build()
  );

  logFormInfo_(form, 'G8 C5 W3 Part 2B Material Interactions', 15);
  return form;
}

// ============================================================================
// FORM 4: CUMULATIVE PART C/D - INFORMATION TRANSFER & MODEL (30 points)
// ============================================================================

function createG8C5W3PartCD_() {
  const form = FormApp.create('G8.C5.W3: Part 2C/D - Information & Models');

  form.setDescription(
    'PART 2C: INFORMATION TRANSFER (15 pts)\n' +
    'PART 2D: MODEL DEVELOPMENT (15 pts)\n\n' +
    'How waves carry information + Creating scientific models.\n\n' +
    '---\n' +
    'Time: About 20 minutes | Points: 30'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Parts 2C/D Complete!\n\n' +
    'Continue to Part 3: Misconception Check'
  );

  // PART 2C: Information Transfer
  form.addPageBreakItem()
    .setTitle('Part 2C: Information Transfer')
    .setHelpText('How waves encode and carry digital information');

  // Q1: Digital encoding (3 pts auto)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('Digital signals use binary (1s and 0s). What makes binary more reliable than analog?')
    .setRequired(true);

  q1.setChoices([
    q1.createChoice('Binary only needs to distinguish "high" vs "low"—noise affects but doesn\'t flip values', true),
    q1.createChoice('Binary travels faster than analog', false),
    q1.createChoice('Binary uses more electricity so it\'s stronger', false),
    q1.createChoice('Analog signals can\'t travel through wires', false)
  ]);
  q1.setPoints(3);
  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Binary only needs to tell "high" from "low." A 20% weaker "high" is still obviously "high." Analog loses exact values with any noise.')
      .build()
  );
  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Binary\'s strength: only need to distinguish two states. Noise that reduces signal 20% doesn\'t change 1 to 0!')
      .build()
  );

  // Q2: Encoding method (3 pts auto)
  const q2 = form.addMultipleChoiceItem()
    .setTitle('A signal encodes data by alternating between loud and quiet. Which encoding method is this?')
    .setRequired(true);

  q2.setChoices([
    q2.createChoice('Amplitude Shift Keying (ASK) - loudness represents data', true),
    q2.createChoice('Frequency Shift Keying (FSK) - pitch represents data', false),
    q2.createChoice('Phase Shift Keying (PSK) - timing represents data', false),
    q2.createChoice('Volume Modulation (VM)', false)
  ]);
  q2.setPoints(3);
  q2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Amplitude = loudness. Loud = 1, Quiet = 0 is Amplitude Shift Keying (ASK).')
      .build()
  );
  q2.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Loudness = amplitude. Frequency = pitch. Phase = timing offset. This is Amplitude Shift Keying.')
      .build()
  );

  // Q3: Information comparison (3 pts auto)
  const q3 = form.addMultipleChoiceItem()
    .setTitle('How is information transfer in waves SIMILAR to information transfer in DNA (from Cycle 3)?')
    .setRequired(true);

  q3.setChoices([
    q3.createChoice('Both use a code (binary for waves, genetic code for DNA) to represent information', true),
    q3.createChoice('Both require electricity to function', false),
    q3.createChoice('Both transfer matter from one place to another', false),
    q3.createChoice('Both require living organisms', false)
  ]);
  q3.setPoints(3);
  q3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Excellent connection! Both are coded information systems. Waves use binary (1s and 0s); DNA uses genetic code (A, T, C, G). Information encoded in patterns!')
      .build()
  );
  q3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Think about CODING: Waves use binary (1, 0); DNA uses bases (A, T, C, G). Both are coded information systems!')
      .build()
  );

  // Q4: Binary decoding (3 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 4: Decode Binary (3 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '3: Correct answer (10) with calculation shown\n' +
      '2: Correct process but arithmetic error\n' +
      '1: Attempted but incorrect method\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('The binary number 1010 represents what decimal number? Show your work using place values (8, 4, 2, 1).')
    .setHelpText(
      'Place values from left to right: 8, 4, 2, 1\n' +
      '1010 = (1×8) + (0×4) + (1×2) + (0×1) = ?'
    )
    .setRequired(true);

  // Q5: Application (3 pts auto)
  const q5 = form.addMultipleChoiceItem()
    .setTitle('Why do modern phones use Phase Shift Keying (PSK) instead of Amplitude Shift Keying (ASK)?')
    .setRequired(true);

  q5.setChoices([
    q5.createChoice('Interference easily changes amplitude but rarely shifts phase—PSK is more reliable', true),
    q5.createChoice('PSK uses less battery power', false),
    q5.createChoice('ASK doesn\'t work with modern frequencies', false),
    q5.createChoice('PSK is newer technology', false)
  ]);
  q5.setPoints(3);
  q5.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Interference affects amplitude (loudness) easily but rarely changes phase (timing). PSK is more noise-resistant!')
      .build()
  );
  q5.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Think about what noise does: it mostly affects loudness (amplitude). Phase (timing relationship) is much more stable.')
      .build()
  );

  // PART 2D: Model Development
  form.addPageBreakItem()
    .setTitle('Part 2D: Model Development')
    .setHelpText('SEP-2: Develop and use models to describe phenomena');

  // Q6: Model description (5 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 6: Describe a Wave Model (5 points)')
    .setHelpText(
      'RUBRIC - SEP-2:\n' +
      '5: Complete model with all components labeled, wave behavior shown, wavelength comparison\n' +
      '4: Good model missing one element\n' +
      '3: Basic model with partial explanation\n' +
      '2: Incomplete model\n' +
      '1: Minimal attempt\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Describe a model you would draw to explain why WiFi passes through walls but visible light doesn\'t. Include:\n• What the wall structure would look like\n• How you\'d represent WiFi waves (with wavelength)\n• How you\'d represent light waves (with wavelength)\n• What labels you\'d include')
    .setRequired(true);

  // Q7: Model application (5 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 7: Apply Your Model (5 points)')
    .setHelpText(
      'RUBRIC - SEP-2:\n' +
      '5: Correctly applies model to new scenario with reasoning\n' +
      '4: Good application with minor gaps\n' +
      '3: Basic application\n' +
      '2: Partial response\n' +
      '1: Minimal attempt\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Using your model from Question 6, predict: Would a metal mesh with 1mm holes block WiFi (λ~12cm) or visible light (λ~500nm)? Explain your reasoning using wavelength comparison.')
    .setRequired(true);

  // Q8: Model evaluation (5 pts auto)
  const q8 = form.addMultipleChoiceItem()
    .setTitle('A student draws a model showing waves as balls bouncing off walls. What is the MAIN problem with this model?')
    .setRequired(true);

  q8.setChoices([
    q8.createChoice('Waves transfer energy without transferring matter—balls show matter transfer', true),
    q8.createChoice('Balls are round but waves are not', false),
    q8.createChoice('Balls can\'t bounce off walls', false),
    q8.createChoice('The model is perfectly accurate', false)
  ]);
  q8.setPoints(5);
  q8.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! The ball model incorrectly suggests matter transfer. Waves transfer ENERGY through oscillation, not by moving particles from A to B.')
      .build()
  );
  q8.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('The key problem: balls are matter that moves from one place to another. Waves transfer ENERGY, not matter. A cork bobs but doesn\'t travel!')
      .build()
  );

  logFormInfo_(form, 'G8 C5 W3 Part 2C/D Information & Models', 30);
  return form;
}

// ============================================================================
// FORM 5: MISCONCEPTION CHECK (20 points)
// ============================================================================

function createG8C5W3Misconception_() {
  const form = FormApp.create('G8.C5.W3: Part 3 - Misconception Check');

  form.setDescription(
    'PART 3: MISCONCEPTION CHECK\n\n' +
    'These questions test common mistakes students make about waves.\n' +
    'Think carefully—each question includes a common wrong answer!\n\n' +
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
    'CYCLE 5 ASSESSMENT COMPLETE!\n\n' +
    'Congratulations on completing the Waves & Information Transfer cycle!\n\n' +
    'Key takeaways:\n' +
    '• Waves transfer ENERGY, not matter\n' +
    '• Wavelength determines material interaction\n' +
    '• Different materials transmit/absorb/reflect differently\n' +
    '• Digital encoding is more noise-resistant than analog\n\n' +
    'NEXT: Cycle 6 - Electromagnetic Fields'
  );

  // Q1: Matter transfer misconception (5 pts auto)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('MISCONCEPTION CHECK: A student says "Ocean waves carry water from the middle of the ocean to the beach." Is this correct?')
    .setRequired(true);

  q1.setChoices([
    q1.createChoice('No—waves transfer energy, not water. Water particles oscillate but don\'t travel with the wave.', true),
    q1.createChoice('Yes—the water clearly moves toward the beach with each wave.', false),
    q1.createChoice('Yes—that\'s how waves work, they push things forward.', false),
    q1.createChoice('Partially—some water moves but not all of it.', false)
  ]);
  q1.setPoints(5);
  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('CORRECT! This is a MAJOR misconception. Waves transfer ENERGY. Water particles move in circles (up, forward, down, back) but don\'t travel horizontally. The wave pattern moves; the water stays!')
      .build()
  );
  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('MISCONCEPTION ALERT: Waves transfer ENERGY, not matter! Watch a cork in water—it bobs up and down but doesn\'t travel. The wave pattern moves; the water stays in place.')
      .build()
  );

  // Q2: Light speed misconception (5 pts auto)
  const q2 = form.addMultipleChoiceItem()
    .setTitle('MISCONCEPTION CHECK: How long does it take light from the Sun to reach Earth (150 million km away)?')
    .setRequired(true);

  q2.setChoices([
    q2.createChoice('About 8 minutes—light is fast but not instant', true),
    q2.createChoice('Instantly (0 seconds)—light travels infinitely fast', false),
    q2.createChoice('About 8 hours—light is relatively slow', false),
    q2.createChoice('1 second—light is extremely fast', false)
  ]);
  q2.setPoints(5);
  q2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('CORRECT! Light travels at 3×10⁸ m/s—incredibly fast, but NOT instant. 150 million km ÷ 300,000 km/s ≈ 500 seconds ≈ 8.3 minutes.')
      .build()
  );
  q2.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('MISCONCEPTION ALERT: Light is NOT instant! It travels at 3×10⁸ m/s. Over astronomical distances, this delay matters. Sunlight is 8 minutes old when it reaches your eyes!')
      .build()
  );

  // Q3: All waves same misconception (5 pts auto)
  const q3 = form.addMultipleChoiceItem()
    .setTitle('MISCONCEPTION CHECK: A student says "All electromagnetic waves behave the same because they\'re all made of the same stuff." Is this correct?')
    .setRequired(true);

  q3.setChoices([
    q3.createChoice('No—wavelength causes different behaviors even though all EM waves are the same type of energy', true),
    q3.createChoice('Yes—all EM waves are identical in behavior', false),
    q3.createChoice('Yes—the only difference is color', false),
    q3.createChoice('No—some EM waves are made of different particles', false)
  ]);
  q3.setPoints(5);
  q3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('CORRECT! All EM waves are the same TYPE of energy, but wavelength creates different BEHAVIORS. Radio diffracts around buildings; X-rays pass through skin. Same family, different properties!')
      .build()
  );
  q3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('MISCONCEPTION ALERT: Wavelength determines behavior! WiFi passes through walls because of long wavelength. Light doesn\'t because of short wavelength. Same type of wave, different properties!')
      .build()
  );

  // Q4: Blocking is binary misconception (5 pts auto)
  const q4 = form.addMultipleChoiceItem()
    .setTitle('MISCONCEPTION CHECK: A student says "Materials either block waves completely or let them through—there\'s nothing in between." Is this correct?')
    .setRequired(true);

  q4.setChoices([
    q4.createChoice('No—transmission is a SPECTRUM. Materials transmit different percentages from 0% to 100%.', true),
    q4.createChoice('Yes—materials are either opaque or transparent', false),
    q4.createChoice('Yes—waves can\'t be partially blocked', false),
    q4.createChoice('It depends on the wave type', false)
  ]);
  q4.setPoints(5);
  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('CORRECT! Transmission is a spectrum! Glass ~90%, frosted glass ~70%, paper ~25%, cardboard ~10%, metal ~0%. Materials don\'t just "block" or "pass"—they transmit a percentage.')
      .build()
  );
  q4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('MISCONCEPTION ALERT: Transmission is NOT all-or-nothing! Frosted glass transmits ~70%—not transparent, not opaque. Translucent materials exist between the extremes.')
      .build()
  );

  logFormInfo_(form, 'G8 C5 W3 Part 3 Misconception Check', 20);
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
function testG8C5W3Synthesis() { createG8C5W3Synthesis_(); }
function testG8C5W3PartA() { createG8C5W3PartA_(); }
function testG8C5W3PartB() { createG8C5W3PartB_(); }
function testG8C5W3PartCD() { createG8C5W3PartCD_(); }
function testG8C5W3Misconception() { createG8C5W3Misconception_(); }
