/**
 * ============================================================================
 * GRADE 7 - CYCLE 3 WEEK 1: THE GREENHOUSE EFFECT MYSTERY
 * 5 Forms | 100 Points Total | ~75 Minutes
 * ============================================================================
 *
 * NGSS ALIGNMENT:
 *   Primary: MS-ESS3-5 - Ask questions to clarify evidence of factors
 *            causing rise in global temperatures over past century
 *   Spiral:  MS-PS1-5 - Atoms conserved in reactions (mass in = mass out)
 *            MS-PS1-6 - Chemical reactions release or absorb thermal energy
 *
 * 3-DIMENSIONAL LEARNING:
 *   SEP-1: Asking Questions - Ask questions about why CO2 traps heat
 *   DCI ESS3.D: Human Impacts - Explain how human activities affect climate
 *   CCC Cause & Effect: Connect molecular behavior to temperature change
 *
 * LEARNING TARGETS:
 *   1. Explain why CO2 absorbs heat but N2 doesn't
 *   2. Trace carbon atoms through the carbon cycle
 *   3. Design a structure that traps thermal energy
 *   4. Connect bond energy concepts to the greenhouse effect
 *
 * FORMS:
 *   1. Hook - The Hot Car Mystery (15 pts, ~10 min)
 *   2. Station 1 - Molecular Vibration & IR (20 pts, ~18 min)
 *   3. Station 2 - Carbon Cycle Conservation (20 pts, ~15 min)
 *   4. Station 3 - Design a Thermal Trap (25 pts, ~20 min)
 *   5. Exit Ticket - Chemistry & Climate (20 pts, ~15 min)
 *
 * DEPLOYMENT:
 *   1. Open script.google.com, create new project
 *   2. Paste this entire script
 *   3. Run: createAllG7C3W1Forms()
 *   4. Check Logger (View > Logs) for form URLs
 *   5. MANUAL CONFIG REQUIRED (Settings > Quizzes in each form):
 *      - Release grade: "Immediately after each submission"
 *      - Respondent can see: Check ALL boxes (Missed questions, Correct answers, Point values)
 *
 * FORM SETTINGS (set via API):
 *   - Quiz mode enabled
 *   - Requires Google sign-in (verified email, no manual entry)
 *   - Limit 1 response per user
 *   - Allow response editing after submit
 *   - Progress bar enabled
 */

// ============================================================================
// MAIN FUNCTION
// ============================================================================

function createAllG7C3W1Forms() {
  Logger.log('================================================');
  Logger.log('G7 CYCLE 3 WEEK 1: THE GREENHOUSE EFFECT MYSTERY');
  Logger.log('================================================\n');

  const forms = {
    hook: createG7Hook_(),
    station1: createG7Station1_(),
    station2: createG7Station2_(),
    station3: createG7Station3_(),
    exitTicket: createG7ExitTicket_()
  };

  Logger.log('\n================================================');
  Logger.log('ALL 5 FORMS CREATED - 100 POINTS TOTAL');
  Logger.log('================================================');

  return forms;
}

// ============================================================================
// HOOK - THE HOT CAR MYSTERY (15 points, ~10 min)
// Prior knowledge activation + predictions
// ============================================================================

function createG7Hook_() {
  const form = FormApp.create('G7.C3.W1: Hook - The Hot Car Mystery');

  form.setDescription(
    'THE HOT CAR MYSTERY\n\n' +
    'It is a sunny 75 degrees F (24 degrees C) day. You park your car for 30 minutes. When you come back:\n' +
    '- The dashboard is over 150 degrees F (65 degrees C) - too hot to touch!\n' +
    '- The steering wheel burns your hands\n' +
    '- But the air outside is still just 75 degrees F\n\n' +
    'The car is not generating any heat. It is just sitting there.\n' +
    'So where is all this extra heat coming from?\n\n' +
    '---\n' +
    'Time: About 10 minutes | Points: 15\n' +
    'Use what you learned in Cycle 2 about energy and reactions!'
  );

  // Quiz and response settings
  form.setIsQuiz(true);
  form.setRequireLogin(true);  // Forces Google sign-in for verified email
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  // NOTE: After creation, manually set in Forms UI (Settings > Quizzes):
  // - Release grade: "Immediately after each submission"
  // - Respondent can see: Missed questions, Correct answers, Point values
  form.setConfirmationMessage(
    'Hook submitted! You are ready for Station 1.\n\n' +
    'Next: Use the PhET simulation to discover WHY CO2 traps heat.\n' +
    'Link: https://phet.colorado.edu/en/simulations/molecules-and-light'
  );

  // --- PART 1: CYCLE 2 RETRIEVAL ---
  form.addPageBreakItem()
    .setTitle('Part 1: What You Already Know from Cycle 2')
    .setHelpText('These questions check what you remember about energy in chemical reactions.');

  // Q1: Energy in reactions (3 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 1 (3 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '3: Both correct - energy released when forming bonds, absorbed when breaking bonds\n' +
      '2: One correct or both without detail\n' +
      '1: Shows some understanding with misconceptions\n' +
      '0: No response or completely incorrect'
    );

  form.addParagraphTextItem()
    .setTitle('In a chemical reaction, when is energy RELEASED? When is energy ABSORBED?')
    .setHelpText('Hint: Think about endothermic vs exothermic reactions. What happens when bonds break? When bonds form?')
    .setRequired(true);

  // --- PART 2: PHENOMENON ---
  form.addPageBreakItem()
    .setTitle('Part 2: The Phenomenon')
    .setHelpText('Describe what you have observed or know about hot cars.');

  // Q2: Temperature observation (3 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 2 (3 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '3: Describes temperature difference clearly, notes inside is much hotter\n' +
      '2: Partial description\n' +
      '1: Vague response\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Describe what happens to the temperature inside a car on a sunny day compared to outside.')
    .setHelpText('Be specific about what you have experienced or know happens.')
    .setRequired(true);

  // Q3: Initial hypothesis (3 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 3 (3 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '3: Scientific reasoning about energy, light, or heat transfer\n' +
      '2: Reasonable guess with some logic\n' +
      '1: Guess without reasoning\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Why do you think the inside of the car gets hotter than the outside?')
    .setHelpText('This is a prediction - there is no wrong answer yet! Just explain your thinking.')
    .setRequired(true);

  // --- PART 3: CYCLE 2 CONNECTION ---
  form.addPageBreakItem()
    .setTitle('Part 3: Connect to Cycle 2')
    .setHelpText('Apply what you learned about energy.');

  // Q4: Energy type MCQ (3 pts auto)
  const q4 = form.addMultipleChoiceItem()
    .setTitle('When the car interior absorbs sunlight, what type of energy change is happening?')
    .setHelpText('Think about whether energy is going INTO or OUT OF the materials.')
    .setRequired(true);

  q4.setChoices([
    q4.createChoice('Endothermic - the materials absorb energy', true),
    q4.createChoice('Exothermic - the materials release energy', false),
    q4.createChoice('Neither - no energy change occurs', false),
    q4.createChoice('Both at the same time', false)
  ]);
  // NOTE: Shuffle choices manually in Forms UI (setShuffleOrder not available in API)
  q4.setPoints(3);
  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Absorbing sunlight is endothermic - energy goes INTO the materials, making them hotter.')
      .build()
  );
  q4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('When materials absorb energy from sunlight, energy goes IN. That is an endothermic process.')
      .build()
  );

  // Q5: Confidence (3 pts auto)
  const q5 = form.addScaleItem()
    .setTitle('How confident are you in your explanation of why cars get hot inside?')
    .setHelpText('Be honest - this helps us know where to focus learning!')
    .setBounds(1, 5)
    .setLabels('Just guessing', 'Very confident')
    .setRequired(true);
  q5.setPoints(3);

  logFormInfo_(form, 'G7 Hook', 15);
  return form;
}

// ============================================================================
// STATION 1 - MOLECULAR VIBRATION & IR ABSORPTION (20 points, ~18 min)
// PhET simulation + misconception check (INTERLEAVED RETRIEVAL)
// ============================================================================

function createG7Station1_() {
  const form = FormApp.create('G7.C3.W1: Station 1 - Molecular Vibration & IR');

  form.setDescription(
    'YOUR MISSION: DISCOVER WHY CO2 TRAPS HEAT\n\n' +
    'Use the PhET simulation to test different molecules and discover why\n' +
    'carbon dioxide (CO2) absorbs infrared radiation while nitrogen (N2) does not.\n' +
    'This is the molecular-level secret to the greenhouse effect!\n\n' +
    'SIMULATION LINK (open in new tab):\n' +
    'https://phet.colorado.edu/en/simulations/molecules-and-light\n\n' +
    '---\n' +
    'Time: About 18 minutes | Points: 20\n\n' +
    'CRITICAL QUESTION: Do molecules BREAK or just VIBRATE when absorbing IR?'
  );

  // Quiz and response settings
  form.setIsQuiz(true);
  form.setRequireLogin(true);  // Forces Google sign-in for verified email
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  // NOTE: After creation, manually set in Forms UI (Settings > Quizzes):
  // - Release grade: "Immediately after each submission"
  // - Respondent can see: Missed questions, Correct answers, Point values
  form.setConfirmationMessage(
    'Station 1 complete!\n\n' +
    'KEY INSIGHT: CO2 vibrates when absorbing IR - it does NOT break apart.\n' +
    'This is why CO2 is a greenhouse gas.\n\n' +
    'Continue to Station 2: Carbon Cycle Conservation'
  );

  // --- SIMULATION INSTRUCTIONS ---
  form.addPageBreakItem()
    .setTitle('Step 1: Run the PhET Simulation')
    .setHelpText(
      'BEFORE answering questions:\n\n' +
      '1. Open PhET in new tab: https://phet.colorado.edu/en/simulations/molecules-and-light\n' +
      '2. Set light source to INFRARED (red waves)\n' +
      '3. Test each molecule: N2, O2, CO2, H2O\n' +
      '4. Watch carefully - does the molecule break apart or just vibrate?\n\n' +
      'Time: 0-12 minutes for simulation testing'
    );

  // Q1: Which molecules absorb (5 pts) - uses checkbox for partial credit
  const q1 = form.addCheckboxItem()
    .setTitle('Which molecules ABSORB infrared radiation in the simulation? (Select ALL that apply)')
    .setHelpText('Test each molecule and observe which ones react to IR.')
    .setRequired(true);

  q1.setChoices([
    q1.createChoice('N2 (nitrogen)', false),
    q1.createChoice('O2 (oxygen)', false),
    q1.createChoice('CO2 (carbon dioxide)', true),
    q1.createChoice('H2O (water)', true)
  ]);
  q1.setPoints(5);
  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! CO2 and H2O absorb IR. N2 and O2 let IR pass through.')
      .build()
  );
  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Check again: molecules with 3+ atoms (CO2, H2O) absorb IR. N2 and O2 do not.')
      .build()
  );

  // Q2: What happens - vibration vs breaking (5 pts auto)
  const q2 = form.addMultipleChoiceItem()
    .setTitle('When CO2 absorbs infrared radiation, what happens to the molecule?')
    .setHelpText('Watch the CO2 molecule VERY carefully when IR hits it.')
    .setRequired(true);

  q2.setChoices([
    q2.createChoice('It breaks apart into separate C and O atoms', false),
    q2.createChoice('It vibrates faster - stretches and bends but stays together', true),
    q2.createChoice('It slows down and stops moving', false),
    q2.createChoice('Nothing happens - the IR passes right through', false)
  ]);
  // NOTE: Shuffle choices manually in Forms UI (setShuffleOrder not available in API)
  q2.setPoints(5);
  q2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! CO2 VIBRATES when absorbing IR. The molecule stays together - bonds do NOT break.')
      .build()
  );
  q2.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Look again: the CO2 molecule stays in one piece but moves more. That is vibration, not breaking.')
      .build()
  );

  // --- CRITICAL THINKING ---
  form.addPageBreakItem()
    .setTitle('Step 2: Critical Analysis')
    .setHelpText('This is the most important part - think carefully about WHY!');

  // Q3: WHY structure matters (5 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 3: Explain WHY (5 points)')
    .setHelpText(
      'RUBRIC - Explain WHY CO2 absorbs IR but N2 does not:\n' +
      '5: Mentions molecular structure (3+ atoms, can bend/stretch asymmetrically)\n' +
      '4: Mentions number of atoms or shape difference\n' +
      '3: Notes a difference but unclear connection\n' +
      '2: Vague response\n' +
      '1: Incorrect explanation\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('WHY does CO2 absorb infrared but N2 does not? Use molecular structure to explain.')
    .setHelpText(
      'Compare:\n' +
      '- N2 has 2 identical atoms: N-N (linear, symmetric)\n' +
      '- CO2 has 3 atoms: O=C=O (can bend and stretch)\n' +
      '- H2O has 3 atoms: H-O-H (bent shape)\n' +
      'What pattern do you notice about molecules that absorb IR?'
    )
    .setRequired(true);

  // Q4: Cycle 2 connection - bond energy (5 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 4: Cycle 2 Connection (5 points)')
    .setHelpText(
      'RUBRIC - Connect to Cycle 2 bond energy:\n' +
      '5: Explains breaking bonds requires energy + IR provides insufficient energy to break\n' +
      '4: Mentions bond energy correctly\n' +
      '3: Partial connection to Cycle 2\n' +
      '2: Mentions Cycle 2 vaguely\n' +
      '1: No real connection\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle(
      'CRITICAL: In Cycle 2, we learned that BREAKING bonds REQUIRES energy.\n\n' +
      'Student A says: "When CO2 absorbs energy, it breaks the bonds."\n' +
      'Student B says: "The bonds do not break, they just vibrate."\n\n' +
      'Who is correct? Use your Cycle 2 knowledge about bond energy to explain WHY.'
    )
    .setHelpText(
      'Remember from Cycle 2:\n' +
      '- Breaking bonds = endothermic (requires energy input)\n' +
      '- IR radiation has relatively low energy\n' +
      '- CO2 has strong double bonds (O=C=O)'
    )
    .setRequired(true);

  logFormInfo_(form, 'G7 Station 1', 20);
  return form;
}

// ============================================================================
// STATION 2 - CARBON CYCLE CONSERVATION (20 points, ~15 min)
// Atom tracking + calculations (INTERLEAVED RETRIEVAL)
// ============================================================================

function createG7Station2_() {
  const form = FormApp.create('G7.C3.W1: Station 2 - Carbon Cycle Conservation');

  form.setDescription(
    'YOUR MISSION: TRACE CARBON ATOMS THROUGH EARTH\'S SYSTEMS\n\n' +
    'Prove that carbon atoms are NEVER created or destroyed - just rearranged.\n' +
    'This is your Cycle 2 conservation of mass applied to Earth\'s climate!\n\n' +
    '---\n' +
    'Time: About 15 minutes | Points: 20\n\n' +
    'KEY FORMULA: CO2 is 27% carbon by mass\n' +
    'You will need a calculator!'
  );

  // Quiz and response settings
  form.setIsQuiz(true);
  form.setRequireLogin(true);  // Forces Google sign-in for verified email
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  // NOTE: After creation, manually set in Forms UI (Settings > Quizzes):
  // - Release grade: "Immediately after each submission"
  // - Respondent can see: Missed questions, Correct answers, Point values
  form.setConfirmationMessage(
    'Station 2 complete!\n\n' +
    'KEY INSIGHT: Carbon cycles through Earth - never created or destroyed.\n' +
    'Burning fossil fuels RELEASES ancient carbon, it does not CREATE new carbon.\n\n' +
    'Continue to Station 3: Design a Thermal Trap'
  );

  // --- REFERENCE ---
  form.addPageBreakItem()
    .setTitle('Reference: Photosynthesis Equation')
    .setHelpText(
      '6CO2 + 6H2O --> C6H12O6 + 6O2\n\n' +
      'COUNT THE ATOMS:\n' +
      'Left side: 6C + 12H + 18O = 36 atoms\n' +
      'Right side: 6C + 12H + 18O = 36 atoms\n' +
      'BALANCED - same atoms, just rearranged!'
    );

  // Q1: Carbon calculation (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 1: Calculate Carbon Storage (4 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '4: Correct (12.9-13.1 lbs) with work shown (48 x 0.27 = 12.96)\n' +
      '3: Correct answer without clear work\n' +
      '2: Correct setup but calculation error\n' +
      '1: Wrong setup\n' +
      '0: No response\n\n' +
      'ANSWER: 48 x 0.27 = 12.96 lbs (accept ~13 lbs)'
    );

  form.addParagraphTextItem()
    .setTitle(
      'A tree absorbs 48 lbs of CO2 per year.\n' +
      'CO2 is 27% carbon by mass.\n\n' +
      'How many pounds of CARBON does one tree store per year?\n' +
      'SHOW YOUR WORK!'
    )
    .setHelpText('Steps: 1) Convert 27% to 0.27  2) Multiply 48 x 0.27  3) Include units')
    .setRequired(true);

  // Q2: Atom counting (4 pts auto)
  const q2 = form.addMultipleChoiceItem()
    .setTitle(
      'In photosynthesis: 6CO2 + 6H2O --> C6H12O6 + 6O2\n\n' +
      'Count the atoms. Are there more, fewer, or the same on each side?'
    )
    .setHelpText('Left: 6C + 12H + 18O = 36 total. Count the right side!')
    .setRequired(true);

  q2.setChoices([
    q2.createChoice('More atoms on the left side', false),
    q2.createChoice('More atoms on the right side', false),
    q2.createChoice('Same number on both sides (36 atoms each)', true),
    q2.createChoice('Cannot tell without more information', false)
  ]);
  // NOTE: Shuffle choices manually in Forms UI (setShuffleOrder not available in API)
  q2.setPoints(4);
  q2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! 36 atoms on each side. Conservation of mass - atoms rearrange, never created or destroyed.')
      .build()
  );
  q2.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Count again! Left: 6C+12H+18O=36. Right: 6C+12H+18O=36. Equal - atoms are conserved.')
      .build()
  );

  // Q3: Where carbon goes (4 pts auto)
  const q3 = form.addCheckboxItem()
    .setTitle('When you burn wood, where does the carbon GO? (Select ALL correct answers)')
    .setHelpText('Conservation of mass: atoms cannot just disappear!')
    .setRequired(true);

  q3.setChoices([
    q3.createChoice('Destroyed completely - carbon disappears', false),
    q3.createChoice('Released into the air as CO2 gas', true),
    q3.createChoice('Some remains in the ash', true),
    q3.createChoice('Converted to pure energy', false)
  ]);
  q3.setPoints(4);
  q3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Carbon becomes CO2 gas AND some stays in ash. Never destroyed - just moved!')
      .build()
  );
  q3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Carbon cannot be destroyed. When wood burns, carbon becomes CO2 and some stays in ash.')
      .build()
  );

  // Q4: Misconception check (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 4: Evaluate This Claim (4 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '4: Correctly refutes + uses conservation + explains carbon origin (fossil fuels = ancient plants)\n' +
      '3: Refutes + mentions conservation OR carbon origin\n' +
      '2: Refutes but weak explanation\n' +
      '1: Incorrect or accepts the claim\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle(
      'A student says: "When we burn fossil fuels, we are creating new carbon that goes into the atmosphere."\n\n' +
      'Is this correct? Explain using conservation of mass.'
    )
    .setHelpText('Think: Can atoms be created? Where did fossil fuel carbon originally come from?')
    .setRequired(true);

  // Q5: Carbon balance (4 pts auto)
  const q5 = form.addMultipleChoiceItem()
    .setTitle(
      'If ALL carbon absorbed by trees in one year was released by burning those same trees,\n' +
      'would atmospheric carbon increase, decrease, or stay the same?'
    )
    .setRequired(true);

  q5.setChoices([
    q5.createChoice('Increase - burning adds more than trees absorbed', false),
    q5.createChoice('Decrease - some carbon stays in ash', false),
    q5.createChoice('Stay the same - carbon in equals carbon out', true),
    q5.createChoice('Cannot determine', false)
  ]);
  // NOTE: Shuffle choices manually in Forms UI (setShuffleOrder not available in API)
  q5.setPoints(4);
  q5.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Conservation: carbon absorbed = carbon released. Same atoms, different location.')
      .build()
  );
  q5.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Conservation of mass: atoms in = atoms out. Same carbon just moves to a different place.')
      .build()
  );

  logFormInfo_(form, 'G7 Station 2', 20);
  return form;
}

// ============================================================================
// STATION 3 - DESIGN A THERMAL TRAP (25 points, ~20 min)
// Engineering design + scientific justification
// ============================================================================

function createG7Station3_() {
  const form = FormApp.create('G7.C3.W1: Station 3 - Design a Thermal Trap');

  form.setDescription(
    'ENGINEERING CHALLENGE: DESIGN A THERMAL TRAP\n\n' +
    'Apply what you learned about thermal energy to design a structure\n' +
    'that maximizes heat retention - like a mini greenhouse!\n\n' +
    '---\n' +
    'Time: About 20 minutes | Points: 25 (highest value!)\n\n' +
    'CONSTRAINTS:\n' +
    '- Size limit: 20cm x 20cm x 20cm\n' +
    '- Materials: Choose from 5 options below\n' +
    '- REQUIREMENT: Explain EVERY choice using thermal energy concepts!'
  );

  // Quiz and response settings
  form.setIsQuiz(true);
  form.setRequireLogin(true);  // Forces Google sign-in for verified email
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  // NOTE: After creation, manually set in Forms UI (Settings > Quizzes):
  // - Release grade: "Immediately after each submission"
  // - Respondent can see: Missed questions, Correct answers, Point values
  form.setConfirmationMessage(
    'Station 3 complete!\n\n' +
    'Your thermal trap uses the SAME physics as the greenhouse effect:\n' +
    '- Visible light enters through transparent top\n' +
    '- Dark surfaces absorb light, molecules vibrate faster, temperature rises\n' +
    '- IR radiation cannot escape easily, so heat is trapped\n\n' +
    'Continue to Exit Ticket'
  );

  // --- MATERIALS REFERENCE ---
  form.addPageBreakItem()
    .setTitle('Available Materials')
    .setHelpText(
      'Choose from these 5 materials:\n\n' +
      '1. BLACK PAPER - Absorbs light, converts to heat\n' +
      '   Best for: absorbing incoming radiation (bottom)\n\n' +
      '2. ALUMINUM FOIL - Reflects radiation, conducts heat\n' +
      '   Best for: reflecting heat back inward (sides)\n\n' +
      '3. BUBBLE WRAP - Traps air, poor conductor (insulator)\n' +
      '   Best for: reducing heat loss (sides)\n\n' +
      '4. CARDBOARD - Moderate insulator, structural\n' +
      '   Best for: structure + some insulation\n\n' +
      '5. PLASTIC WRAP - Transparent to visible, blocks some IR\n' +
      '   Best for: greenhouse effect on top'
    );

  // Q1: Design description (5 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 1: Describe Your Design (5 points)')
    .setHelpText(
      'RUBRIC - Clear description with specific material placement:\n' +
      '5: Specifies material for BOTTOM, SIDES, and TOP with clear reasoning\n' +
      '4: Specifies all locations but reasoning incomplete\n' +
      '3: Missing one location or unclear\n' +
      '2: Vague description\n' +
      '1: Minimal attempt\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle(
      'Describe your thermal trap design.\n\n' +
      'Be SPECIFIC:\n' +
      '- What material goes on the BOTTOM? Why?\n' +
      '- What material goes on the SIDES? Why?\n' +
      '- What material goes on the TOP? Why?'
    )
    .setRequired(true);

  // Q2: Material justification (10 pts manual) - highest value question
  form.addSectionHeaderItem()
    .setTitle('Question 2: Justify Each Material Choice (10 points)')
    .setHelpText(
      'RUBRIC - Each material choice justified with thermal energy concepts:\n' +
      '10: All choices justified with correct science (absorb, reflect, insulate, conduct)\n' +
      '8: Most choices justified correctly\n' +
      '6: Some correct justifications\n' +
      '4: Weak justifications\n' +
      '2: Justifications without science\n' +
      '0: No response\n\n' +
      'KEY VOCABULARY: absorb, reflect, conduct, insulate, radiate'
    );

  form.addParagraphTextItem()
    .setTitle(
      'Explain WHY you chose each material using thermal energy concepts from Cycle 2.\n\n' +
      'For EACH material, explain:\n' +
      '- What thermal property makes it good for that location?\n' +
      '- How does it help trap heat?\n\n' +
      'Use vocabulary: absorb, reflect, conduct, insulate'
    )
    .setHelpText(
      'EXAMPLE of good justification:\n' +
      '"I chose black paper for the bottom because dark colors absorb more light energy.\n' +
      'When particles absorb light, they vibrate faster - this IS thermal energy."'
    )
    .setRequired(true);

  // Q3: Molecular connection (5 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 3: Connect to Molecular Level (5 points)')
    .setHelpText(
      'RUBRIC - Connects to molecular-level energy:\n' +
      '5: Explains particles moving faster = higher temp + connects to vibration from Station 1\n' +
      '4: Mentions particle motion and temperature\n' +
      '3: Vague molecular reference\n' +
      '2: No molecular thinking\n' +
      '1: Incorrect\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle(
      'How does your design connect to what you learned about molecular vibration in Station 1?\n\n' +
      'Explain at the PARTICLE level: What happens to molecules when they absorb energy?'
    )
    .setHelpText('Remember: faster molecular motion = higher temperature!')
    .setRequired(true);

  // Q4: Greenhouse connection (5 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 4: Connect to Greenhouse Effect (5 points)')
    .setHelpText(
      'RUBRIC - Connection to greenhouse effect:\n' +
      '5: Clear parallel between design and atmosphere (visible in, IR trapped)\n' +
      '4: Makes connection but incomplete\n' +
      '3: Mentions greenhouse effect vaguely\n' +
      '2: No clear connection\n' +
      '1: Incorrect\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle(
      'How is your thermal trap design similar to the greenhouse effect in Earth\'s atmosphere?\n\n' +
      'Explain the parallel: How does visible light get IN and why does heat stay IN?'
    )
    .setHelpText(
      'Think about:\n' +
      '- Plastic wrap on top = atmosphere\n' +
      '- Visible light passes through both\n' +
      '- IR (heat) gets trapped by both'
    )
    .setRequired(true);

  logFormInfo_(form, 'G7 Station 3', 25);
  return form;
}

// ============================================================================
// EXIT TICKET - CHEMISTRY & CLIMATE (20 points, ~15 min)
// 2 NEW + 2 SPIRAL + 1 INTEGRATION
// ============================================================================

function createG7ExitTicket_() {
  const form = FormApp.create('G7.C3.W1: Exit Ticket - Chemistry & Climate');

  form.setDescription(
    'EXIT TICKET: SHOW WHAT YOU LEARNED\n\n' +
    'This tests whether you can connect Cycle 2 chemistry to climate science.\n\n' +
    '---\n' +
    'Time: About 15 minutes | Points: 20\n\n' +
    'QUESTION TYPES:\n' +
    '- 2 NEW questions (Cycle 3 content)\n' +
    '- 2 SPIRAL questions (Cycle 2 review)\n' +
    '- 1 INTEGRATION question (connects both cycles)'
  );

  // Quiz and response settings
  form.setIsQuiz(true);
  form.setRequireLogin(true);  // Forces Google sign-in for verified email
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  // NOTE: After creation, manually set in Forms UI (Settings > Quizzes):
  // - Release grade: "Immediately after each submission"
  // - Respondent can see: Missed questions, Correct answers, Point values
  form.setConfirmationMessage(
    'WEEK 1 COMPLETE! Congratulations!\n\n' +
    'You connected chemistry to climate science.\n\n' +
    'Key takeaways:\n' +
    '- CO2 absorbs IR and vibrates (does not break)\n' +
    '- Carbon cycles through Earth - never created or destroyed\n' +
    '- The greenhouse effect works at the molecular level\n\n' +
    'NEXT WEEK: What happens when ice melts? Feedback loops!'
  );

  // --- NEW CONTENT ---
  form.addPageBreakItem()
    .setTitle('NEW CONTENT (Questions 1 & 3)')
    .setHelpText('These test what you learned TODAY about the greenhouse effect.');

  // Q1: NEW - Greenhouse effect explanation (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 1: NEW - Explain the Greenhouse Effect (4 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '4: Uses BOTH "absorb" AND "vibrate" with molecular explanation\n' +
      '3: Uses key vocabulary with basic explanation\n' +
      '2: Partial explanation, missing vocabulary\n' +
      '1: Vague or mostly incorrect\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle(
      'Explain the greenhouse effect in 2-3 sentences.\n\n' +
      'You MUST use the words "absorb" and "vibrate" in your answer.'
    )
    .setHelpText('Connect what you learned about CO2 molecules to how the atmosphere traps heat.')
    .setRequired(true);

  // Q2: SPIRAL - Bond energy reasoning (4 pts auto)
  form.addSectionHeaderItem().setTitle('Question 2: SPIRAL - Cycle 2');

  const q2 = form.addMultipleChoiceItem()
    .setTitle(
      'CYCLE 2 REVIEW: In the reaction CH4 + 2O2 --> CO2 + 2H2O + energy\n\n' +
      'This reaction RELEASES energy. What does this mean?'
    )
    .setHelpText('Think about what happens when bonds break vs. when bonds form.')
    .setRequired(true);

  q2.setChoices([
    q2.createChoice('More energy released forming bonds than absorbed breaking bonds (exothermic)', true),
    q2.createChoice('More energy absorbed breaking bonds than released forming bonds (endothermic)', false),
    q2.createChoice('Energy is created from nothing', false),
    q2.createChoice('Energy is destroyed', false)
  ]);
  // NOTE: Shuffle choices manually in Forms UI (setShuffleOrder not available in API)
  q2.setPoints(4);
  q2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Exothermic: forming product bonds releases MORE energy than breaking reactant bonds absorbs.')
      .build()
  );
  q2.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('When energy is released, it is exothermic. Forming bonds releases more than breaking absorbs.')
      .build()
  );

  // Q3: NEW - Carbon path (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 3: NEW - Trace the Carbon (4 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '4: Complete path with correct molecular form at each step\n' +
      '3: Complete path with some molecular details\n' +
      '2: Partial path\n' +
      '1: Vague or incorrect\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle(
      'Trace a carbon atom\'s path:\n' +
      'Gasoline --> Engine --> Atmosphere --> Plant --> You\n\n' +
      'Describe what happens at EACH step and what form the carbon takes.'
    )
    .setHelpText('Forms: hydrocarbons, CO2 gas, glucose (C6H12O6), proteins, etc.')
    .setRequired(true);

  // Q4: SPIRAL - Conservation (4 pts auto)
  form.addSectionHeaderItem().setTitle('Question 4: SPIRAL - Cycle 2');

  const q4 = form.addMultipleChoiceItem()
    .setTitle('CYCLE 2 REVIEW: What happens to the total mass in a closed chemical reaction?')
    .setRequired(true);

  q4.setChoices([
    q4.createChoice('Increases - new atoms created', false),
    q4.createChoice('Decreases - atoms destroyed', false),
    q4.createChoice('Stays the same - atoms conserved (rearranged, not created/destroyed)', true),
    q4.createChoice('Depends on the reaction type', false)
  ]);
  // NOTE: Shuffle choices manually in Forms UI (setShuffleOrder not available in API)
  q4.setPoints(4);
  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Conservation of mass: atoms rearrange but are never created or destroyed.')
      .build()
  );
  q4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Law of Conservation of Mass: atoms cannot be created or destroyed, only rearranged.')
      .build()
  );

  // Q5: INTEGRATION (4 pts manual) - 3D Assessment
  form.addPageBreakItem()
    .setTitle('INTEGRATION (Question 5)')
    .setHelpText('This requires knowledge from BOTH Cycle 2 AND Cycle 3.');

  form.addSectionHeaderItem()
    .setTitle('Question 5: INTEGRATION (4 points)')
    .setHelpText(
      '3D ASSESSMENT RUBRIC:\n' +
      '4: Refutes claim + explains conservation + suggests what product actually does\n' +
      '   SEP: Critiques claim using evidence\n' +
      '   DCI: Applies conservation of mass correctly\n' +
      '   CCC: Tracks matter flow through system\n' +
      '3: Refutes + uses conservation\n' +
      '2: Recognizes problem but weak explanation\n' +
      '1: Accepts claim or major misconceptions\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle(
      'A company claims their product "destroys carbon pollution."\n\n' +
      'Using what you know about:\n' +
      '1. Conservation of mass (Cycle 2)\n' +
      '2. The carbon cycle (Cycle 3)\n\n' +
      'Evaluate this claim:\n' +
      '- Is it scientifically possible to "destroy" carbon?\n' +
      '- What might the product ACTUALLY do to the carbon?'
    )
    .setHelpText('Can atoms be destroyed? If not, where could the carbon go instead?')
    .setRequired(true);

  logFormInfo_(form, 'G7 Exit Ticket', 20);
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
function testG7Hook() { createG7Hook_(); }
function testG7Station1() { createG7Station1_(); }
function testG7Station2() { createG7Station2_(); }
function testG7Station3() { createG7Station3_(); }
function testG7ExitTicket() { createG7ExitTicket_(); }
