/**
 * ============================================================================
 * GRADE 8 - CYCLE 6 WEEK 2: ELECTROMAGNETISM & ENERGY TRANSFER
 * 5 Forms | 100 Points Total | ~75 Minutes
 * ============================================================================
 *
 * NGSS ALIGNMENT:
 *   Primary: MS-PS2-3 - Ask questions about data to determine factors that
 *            affect the strength of electric and magnetic forces
 *   Spiral:  MS-PS4-2 - Wave behavior through materials (Cycle 5)
 *            MS-LS2-3 - Energy flow in ecosystems (Cycle 4)
 *
 * 3-DIMENSIONAL LEARNING:
 *   SEP-3: Planning and Carrying Out Investigations - Test electromagnet variables
 *   SEP-6: Constructing Explanations - Explain electromagnetic induction
 *   DCI PS2.B: Types of Interactions - Electric currents create magnetic fields
 *   DCI PS3.A: Energy Transfer - Electromagnetic induction transfers energy
 *   CCC-2: Cause and Effect - Current causes magnetic field; motion causes current
 *   CCC-5: Energy and Matter - Energy transforms between electrical and mechanical
 *
 * LEARNING TARGETS:
 *   1. Explain how electric current creates magnetic fields
 *   2. Describe electromagnetic induction
 *   3. Identify factors affecting induced current
 *   4. Design devices that convert between electricity and motion
 *
 * FORMS:
 *   1. Hook - The Generator Mystery (12 pts, ~10 min)
 *   2. Station 1 - Electromagnet Construction (20 pts, ~18 min)
 *   3. Station 2 - Electromagnetic Induction Lab (20 pts, ~15 min)
 *   4. Station 3 - Design an Electric Motor (25 pts, ~20 min)
 *   5. Exit Ticket - Electromagnetism Integration (23 pts, ~15 min)
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
 *   3. Run: createAllG8C6W2Forms()
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

function createAllG8C6W2Forms() {
  Logger.log('================================================');
  Logger.log('G8 CYCLE 6 WEEK 2: ELECTROMAGNETISM & ENERGY TRANSFER');
  Logger.log('================================================\n');

  const forms = {
    hook: createG8C6W2Hook_(),
    station1: createG8C6W2Station1_(),
    station2: createG8C6W2Station2_(),
    station3: createG8C6W2Station3_(),
    exitTicket: createG8C6W2ExitTicket_()
  };

  Logger.log('\n================================================');
  Logger.log('ALL 5 FORMS CREATED - 100 POINTS TOTAL');
  Logger.log('================================================');

  return forms;
}

// ============================================================================
// HOOK - THE GENERATOR MYSTERY (12 points, ~10 min)
// Introduces the connection between magnetism and electricity
// ============================================================================

function createG8C6W2Hook_() {
  const form = FormApp.create('G8.C6.W2: Hook - The Generator Mystery');

  form.setDescription(
    'THE GENERATOR MYSTERY\n\n' +
    'At a science museum, you crank a handle and a light bulb glows.\n' +
    'There are no batteries—just spinning magnets inside the handle.\n\n' +
    'At a power plant, giant turbines spin day and night, and somehow\n' +
    'this motion becomes electricity in your home 100 miles away.\n\n' +
    'What\'s the connection between spinning and electricity?\n\n' +
    '---\n' +
    'Time: About 10 minutes | Points: 12\n' +
    'Connect this to Week 1—we studied magnetic fields. Can they create electricity?'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Hook submitted! You\'re ready for Station 1.\n\n' +
    'Next: Build electromagnets and discover what makes them stronger!\n' +
    'You\'ll test variables like number of coils and current strength.'
  );

  // --- PART 1: THE PHENOMENON ---
  form.addPageBreakItem()
    .setTitle('Part 1: The Phenomenon')
    .setHelpText('Think about what you observe when generators work.');

  // Q1: Initial observation (3 pts auto)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('A hand-crank generator lights an LED when you spin it. When you STOP spinning, the light goes out immediately. What does this suggest?')
    .setHelpText('Think about what\'s needed to keep the light on.')
    .setRequired(true);

  q1.setChoices([
    q1.createChoice('The motion of the magnets is directly creating the electricity', true),
    q1.createChoice('The generator stores electricity like a battery', false),
    q1.createChoice('The light stays on even after you stop', false),
    q1.createChoice('The magnets have nothing to do with the electricity', false)
  ]);
  q1.setPoints(3);
  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! The electricity is being generated by the motion. No motion = no electricity. This is electromagnetic induction!')
      .build()
  );
  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Think: If the light goes out when you stop cranking, where was the electricity coming from?')
      .build()
  );

  // --- MTSS FLAG: Check for Week 1 understanding ---
  const mtss1 = form.addMultipleChoiceItem()
    .setTitle('QUICK CHECK (Week 1 Review): What creates a magnetic field?')
    .setHelpText('This checks your Week 1 understanding. Your answer does NOT affect your grade.')
    .setRequired(true);

  mtss1.setChoices([
    mtss1.createChoice('Magnets create magnetic fields that extend through space', true),
    mtss1.createChoice('Only iron creates magnetic fields', false),
    mtss1.createChoice('Magnetic fields don\'t really exist', false),
    mtss1.createChoice('Only the North Pole of Earth creates fields', false)
  ]);
  // No setPoints() - diagnostic only

  // Q2: Prediction (3 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 2 (3 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '3: Proposes connection between magnetic fields and electricity with reasoning\n' +
      '2: Mentions magnets or motion but incomplete connection\n' +
      '1: Guess without reasoning\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Last week we learned that magnets create fields. This week we see that spinning magnets can create electricity. What do you think is happening INSIDE the generator to turn motion into electricity?')
    .setHelpText(
      'Sentence starters:\n' +
      '• "I think the spinning magnet affects the ___ in the wire..." \n' +
      '• "Maybe the magnetic field causes ___ to move..." \n' +
      '• "The connection might be that..."'
    )
    .setRequired(true);

  // --- PART 2: WEEK 1 CONNECTION ---
  form.addPageBreakItem()
    .setTitle('Part 2: Connecting to Week 1')
    .setHelpText('Build on what you learned about magnetic fields.');

  // Q3: Week 1 connection (3 pts auto)
  const q3 = form.addMultipleChoiceItem()
    .setTitle('In Week 1, we learned that magnets create fields. Today\'s big question: Can we create magnetic fields WITHOUT permanent magnets?')
    .setRequired(true);

  q3.setChoices([
    q3.createChoice('Yes—electric current flowing through a wire creates a magnetic field', true),
    q3.createChoice('No—only permanent magnets can create magnetic fields', false),
    q3.createChoice('Magnetic fields cannot be created, only discovered', false),
    q3.createChoice('Electric current destroys magnetic fields', false)
  ]);
  q3.setPoints(3);
  q3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! This is the key discovery: MOVING CHARGES (electric current) create magnetic fields. Electricity and magnetism are connected!')
      .build()
  );
  q3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('This is the big idea for today: Electric current creates magnetic fields. It\'s called electromagnetism!')
      .build()
  );

  // Q4: Real-world connection (3 pts auto)
  const q4 = form.addMultipleChoiceItem()
    .setTitle('If motion can create electricity, and electricity can create magnetic fields, what does this suggest about the relationship between electricity and magnetism?')
    .setRequired(true);

  q4.setChoices([
    q4.createChoice('They are deeply connected—two sides of the same phenomenon', true),
    q4.createChoice('They are completely separate and unrelated', false),
    q4.createChoice('Magnetism is more powerful than electricity', false),
    q4.createChoice('Electricity existed before magnetism', false)
  ]);
  q4.setPoints(3);
  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Scientists call this unified phenomenon ELECTROMAGNETISM. Changing magnetic fields create electricity, and electricity creates magnetic fields!')
      .build()
  );
  q4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Think about the pattern: magnets → fields, current → fields, motion + magnets → current. These are all connected!')
      .build()
  );

  // Q5: Confidence (0 pts - diagnostic only)
  form.addScaleItem()
    .setTitle('Self-Assessment: How confident are you that you can explain how electricity and magnetism are related?')
    .setHelpText('FOR REFLECTION ONLY - This does NOT affect your grade. Be honest!')
    .setBounds(1, 5)
    .setLabels('Still learning', 'Got it!')
    .setRequired(true);

  logFormInfo_(form, 'G8 C6 W2 Hook', 12);
  return form;
}

// ============================================================================
// STATION 1 - ELECTROMAGNET CONSTRUCTION (20 points, ~18 min)
// Build and test electromagnets, identify variables
// ============================================================================

function createG8C6W2Station1_() {
  const form = FormApp.create('G8.C6.W2: Station 1 - Electromagnet Construction');

  form.setDescription(
    'YOUR MISSION: BUILD AN ELECTROMAGNET\n\n' +
    'An electromagnet is a magnet created by electric current flowing through a coil.\n' +
    'Unlike permanent magnets, you can turn them ON and OFF!\n\n' +
    'KEY VOCABULARY:\n' +
    '• Electromagnet - magnet created by current in a coil\n' +
    '• Solenoid - coil of wire that acts as a magnet when current flows\n' +
    '• Core - iron or steel center that strengthens the field\n' +
    '• Coil/turns - loops of wire; more turns = stronger field\n\n' +
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
    'KEY INSIGHT: Electric current creates magnetic fields!\n' +
    'More current + more coils + iron core = stronger electromagnet.\n\n' +
    'Continue to Station 2: Electromagnetic Induction'
  );

  // --- INVESTIGATION REFERENCE ---
  form.addPageBreakItem()
    .setTitle('Reference: Electromagnet Variables')
    .setHelpText(
      'INVESTIGATION PROTOCOL:\n' +
      '1. Wind wire around iron nail (start with 10 turns)\n' +
      '2. Connect to battery BRIEFLY (wire heats up!)\n' +
      '3. Test strength: How many paper clips can it pick up?\n' +
      '4. Change ONE variable, test again\n\n' +
      'VARIABLES TO TEST:\n' +
      '┌────────────────────────────────────────────────────┐\n' +
      '│ Variable          │ How to Test    │ Expected     │\n' +
      '├────────────────────────────────────────────────────┤\n' +
      '│ Number of turns   │ 10, 20, 30     │ More = stronger│\n' +
      '│ Current (batteries)│ 1, 2, 3 cells │ More = stronger│\n' +
      '│ Core material     │ Iron, Al, air  │ Iron strongest │\n' +
      '│ Wire gauge        │ Thin vs thick  │ Thicker better │\n' +
      '└────────────────────────────────────────────────────┘\n\n' +
      'SAFETY: Only connect briefly! Wire gets HOT with current.'
    );

  // Q1: Why electromagnets work (4 pts auto)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('Hans Christian Oersted discovered in 1820 that a compass needle deflects when placed near a wire with current flowing through it. What does this prove?')
    .setHelpText('Think about what makes compass needles move.')
    .setRequired(true);

  q1.setChoices([
    q1.createChoice('Electric current creates a magnetic field around the wire', true),
    q1.createChoice('Compasses are attracted to all wires', false),
    q1.createChoice('Current has nothing to do with magnetism', false),
    q1.createChoice('Only permanent magnets affect compasses', false)
  ]);
  q1.setPoints(4);
  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! This was a revolutionary discovery—MOVING CHARGES create magnetic fields. This unified electricity and magnetism into one phenomenon!')
      .build()
  );
  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('A compass responds to magnetic fields. If it deflects near a current-carrying wire, what must the current be creating?')
      .build()
  );

  // Q2: Variable testing (4 pts auto)
  const q2 = form.addMultipleChoiceItem()
    .setTitle('You\'re testing what makes electromagnets stronger. If you want to test the effect of NUMBER OF COILS, what should you keep the same?')
    .setRequired(true);

  q2.setChoices([
    q2.createChoice('Battery voltage, core material, and wire type (only change coil number)', true),
    q2.createChoice('Change everything at once to see maximum effect', false),
    q2.createChoice('The number of coils should also change', false),
    q2.createChoice('Nothing needs to stay the same', false)
  ]);
  q2.setPoints(4);
  q2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! This is controlled experimentation—change only ONE variable at a time to know what caused the result.')
      .build()
  );
  q2.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Fair test principle: To know if coil number matters, everything ELSE must stay the same. Otherwise, you can\'t tell what caused any change.')
      .build()
  );

  // Q3: Core material effect (4 pts auto)
  const q3 = form.addMultipleChoiceItem()
    .setTitle('An electromagnet with an IRON core picks up 15 paper clips. The same coil with an ALUMINUM core picks up only 2. With AIR (no core), it picks up 0. Why does the core material matter so much?')
    .setRequired(true);

  q3.setChoices([
    q3.createChoice('Iron is ferromagnetic—it amplifies and concentrates the magnetic field', true),
    q3.createChoice('Iron is heavier so it attracts more', false),
    q3.createChoice('Aluminum blocks magnetic fields', false),
    q3.createChoice('The core material doesn\'t actually matter', false)
  ]);
  q3.setPoints(4);
  q3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Iron is ferromagnetic—its domains align with the field, multiplying the effect. This is why real electromagnets use iron/steel cores.')
      .build()
  );
  q3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Think about magnetic materials: iron, nickel, cobalt. These materials respond to magnetic fields by becoming magnetized themselves, strengthening the total field.')
      .build()
  );

  // Q4: Prediction (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 4: Make a Prediction (4 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '4: Predicts correctly (stronger) with clear reasoning about field concentration\n' +
      '3: Correct prediction with partial reasoning\n' +
      '2: Prediction without reasoning\n' +
      '1: Incorrect prediction\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('If you double both the number of coils AND the battery voltage, predict how the electromagnet strength will change. Explain your reasoning.')
    .setHelpText(
      'Sentence starters:\n' +
      '• "I predict the strength will ___ because..." \n' +
      '• "More coils means ___ and more voltage means..." \n' +
      '• "Together, these changes should..."'
    )
    .setRequired(true);

  // Q5: On/Off advantage (4 pts auto)
  const q5 = form.addMultipleChoiceItem()
    .setTitle('Electromagnets can be turned ON and OFF, unlike permanent magnets. What is a real-world advantage of this?')
    .setRequired(true);

  q5.setChoices([
    q5.createChoice('Scrapyard cranes can pick up metal cars and release them on command', true),
    q5.createChoice('Electromagnets are always stronger than permanent magnets', false),
    q5.createChoice('Electromagnets don\'t need any energy to work', false),
    q5.createChoice('There is no practical advantage', false)
  ]);
  q5.setPoints(4);
  q5.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Controllability is the key advantage. MRI machines, maglev trains, electric motors—all use electromagnets because you can control the field strength!')
      .build()
  );
  q5.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Think: permanent magnets are always "on." When would you WANT a magnet you can switch off?')
      .build()
  );

  logFormInfo_(form, 'G8 C6 W2 Station 1', 20);
  return form;
}

// ============================================================================
// STATION 2 - ELECTROMAGNETIC INDUCTION LAB (20 points, ~15 min)
// Investigate factors affecting induced current
// ============================================================================

function createG8C6W2Station2_() {
  const form = FormApp.create('G8.C6.W2: Station 2 - Electromagnetic Induction Lab');

  form.setDescription(
    'YOUR MISSION: CREATE ELECTRICITY WITH MAGNETS\n\n' +
    'Michael Faraday discovered in 1831 that a CHANGING magnetic field\n' +
    'can create (induce) an electric current in a wire.\n\n' +
    'This is called ELECTROMAGNETIC INDUCTION.\n' +
    'It\'s how all power plants generate electricity!\n\n' +
    '---\n' +
    'Time: About 15 minutes | Points: 20\n' +
    'You\'ll discover why motion is essential for generating electricity.'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Station 2 complete!\n\n' +
    'KEY INSIGHT: Changing magnetic fields create electric current!\n' +
    'More change = more current (faster motion, stronger magnet, more coils).\n\n' +
    'Continue to Station 3: Design an Electric Motor'
  );

  // --- INVESTIGATION REFERENCE ---
  form.addPageBreakItem()
    .setTitle('Reference: Induction Observations')
    .setHelpText(
      'INVESTIGATION PROTOCOL:\n' +
      '1. Connect coil to galvanometer (measures small currents)\n' +
      '2. Push magnet INTO the coil—observe needle deflection\n' +
      '3. Pull magnet OUT—observe needle deflection\n' +
      '4. Hold magnet STILL inside coil—observe\n' +
      '5. Try faster/slower motion\n' +
      '6. Try different numbers of coil turns\n\n' +
      'TYPICAL OBSERVATIONS:\n' +
      '┌────────────────────────────────────────────────────┐\n' +
      '│ Action              │ Galvanometer │ Current      │\n' +
      '├────────────────────────────────────────────────────┤\n' +
      '│ Push magnet IN      │ Deflects RIGHT│ Positive    │\n' +
      '│ Pull magnet OUT     │ Deflects LEFT │ Negative    │\n' +
      '│ Hold magnet STILL   │ No deflection │ Zero!       │\n' +
      '│ Fast motion         │ Large deflect │ More current│\n' +
      '│ Slow motion         │ Small deflect │ Less current│\n' +
      '│ More coil turns     │ Larger effect │ More current│\n' +
      '│ Stronger magnet     │ Larger effect │ More current│\n' +
      '└────────────────────────────────────────────────────┘\n\n' +
      'KEY DISCOVERY: Current only flows when there\'s CHANGE!'
    );

  // Q1: Key discovery (4 pts auto)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('When you hold a magnet perfectly STILL inside a coil, the galvanometer shows zero current. What does this tell you about electromagnetic induction?')
    .setHelpText('Think about what\'s different between moving and holding still.')
    .setRequired(true);

  q1.setChoices([
    q1.createChoice('A CHANGING magnetic field is required to induce current—not just a field', true),
    q1.createChoice('Magnets don\'t work inside coils', false),
    q1.createChoice('The galvanometer is broken', false),
    q1.createChoice('You need to hold the magnet still longer', false)
  ]);
  q1.setPoints(4);
  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! This is Faraday\'s key insight: it\'s not the magnetic field itself, but CHANGE in the field that creates current. No motion = no change = no current!')
      .build()
  );
  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Compare: pushing magnet → current. Holding still → no current. What\'s the difference? Change!')
      .build()
  );

  // Q2: Direction of current (4 pts auto)
  const q2 = form.addMultipleChoiceItem()
    .setTitle('When you push the magnet IN, the needle deflects right. When you pull it OUT, the needle deflects left. What does this tell you?')
    .setRequired(true);

  q2.setChoices([
    q2.createChoice('The direction of the induced current depends on the direction of motion', true),
    q2.createChoice('The galvanometer is malfunctioning', false),
    q2.createChoice('Current can only flow in one direction', false),
    q2.createChoice('Pushing and pulling do the same thing', false)
  ]);
  q2.setPoints(4);
  q2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! The induced current direction depends on how the field is changing. This is why generators produce AC (alternating current)—the magnet keeps reversing direction!')
      .build()
  );
  q2.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('The needle deflects opposite ways for opposite motions. The direction of change affects the direction of current.')
      .build()
  );

  // Q3: Increasing induced current (4 pts auto)
  const q3 = form.addMultipleChoiceItem()
    .setTitle('A power plant needs to generate MORE electricity. Based on your observations, which change would increase the induced current?')
    .setRequired(true);

  q3.setChoices([
    q3.createChoice('All of: spin faster, use stronger magnets, add more coil turns', true),
    q3.createChoice('Spin the turbine more slowly', false),
    q3.createChoice('Use weaker magnets to save money', false),
    q3.createChoice('Use fewer coils for simplicity', false)
  ]);
  q3.setPoints(4);
  q3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! More change = more current. Faster motion, stronger magnets, and more coils all increase the rate of field change through the wire.')
      .build()
  );
  q3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Review your data: what factors increased the galvanometer deflection? Those same factors would increase power plant output.')
      .build()
  );

  // Q4: Explaining induction (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 4: Explain Induction (4 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '4: Explains that changing field pushes/pulls on electrons in wire, creating current\n' +
      '3: Mentions field affecting electrons but incomplete\n' +
      '2: Basic idea of field-current connection\n' +
      '1: Vague response\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('In your own words, explain WHY a changing magnetic field creates current in a wire. What\'s happening to the charges in the wire?')
    .setHelpText(
      'Sentence starters:\n' +
      '• "When the magnetic field changes, it ___ the electrons in the wire..." \n' +
      '• "The changing field exerts a ___ on the charges..." \n' +
      '• "This causes electrons to ___, which is current."'
    )
    .setRequired(true);

  // Q5: Spiral - Week 1 (4 pts auto)
  const q5 = form.addMultipleChoiceItem()
    .setTitle('WEEK 1 CONNECTION: We learned that magnetic force decreases with distance. How does this relate to electromagnetic induction?')
    .setRequired(true);

  q5.setChoices([
    q5.createChoice('Moving the magnet closer/farther changes the field strength at the coil, inducing current', true),
    q5.createChoice('Distance has nothing to do with induction', false),
    q5.createChoice('Induction only works at exactly 1 cm distance', false),
    q5.createChoice('Week 1 concepts don\'t apply here', false)
  ]);
  q5.setPoints(4);
  q5.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! When you push the magnet in, the field at the coil gets STRONGER. When you pull out, it gets WEAKER. This change in field strength is what induces current!')
      .build()
  );
  q5.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Remember the force-distance relationship: closer = stronger field. Moving the magnet changes the field strength at the coil location.')
      .build()
  );

  logFormInfo_(form, 'G8 C6 W2 Station 2', 20);
  return form;
}

// ============================================================================
// STATION 3 - DESIGN AN ELECTRIC MOTOR (25 points, ~20 min)
// Engineering design challenge applying electromagnetism
// ============================================================================

function createG8C6W2Station3_() {
  const form = FormApp.create('G8.C6.W2: Station 3 - Design an Electric Motor');

  form.setDescription(
    'ENGINEERING CHALLENGE: DESIGN A MOTOR\n\n' +
    'A motor converts electrical energy into mechanical motion.\n' +
    'It\'s the OPPOSITE of a generator!\n\n' +
    'Generator: motion → electricity\n' +
    'Motor: electricity → motion\n\n' +
    '---\n' +
    'Time: About 20 minutes | Points: 25 (highest value!)\n\n' +
    'CHALLENGE: Design a simple motor that spins continuously when connected to a battery.'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Station 3 complete!\n\n' +
    'You\'ve designed an electric motor!\n' +
    'KEY INSIGHT: Motors use the force between electromagnets and permanent magnets.\n' +
    'The commutator switches poles at just the right time to keep it spinning.\n\n' +
    'Continue to Exit Ticket'
  );

  // --- DESIGN REFERENCE ---
  form.addPageBreakItem()
    .setTitle('Reference: Motor Design Elements')
    .setHelpText(
      'MOTOR COMPONENTS:\n' +
      '1. ARMATURE - The spinning part (coil of wire)\n' +
      '2. PERMANENT MAGNETS - Create stationary field\n' +
      '3. COMMUTATOR - Switches current direction each half-turn\n' +
      '4. BRUSHES - Deliver current to spinning armature\n' +
      '5. POWER SOURCE - Battery or power supply\n\n' +
      'HOW IT WORKS:\n' +
      '┌────────────────────────────────────────────────────┐\n' +
      '│ 1. Current flows through armature coil            │\n' +
      '│ 2. Coil becomes an electromagnet                  │\n' +
      '│ 3. Electromagnet is attracted/repelled by         │\n' +
      '│    permanent magnets → starts to rotate           │\n' +
      '│ 4. Commutator REVERSES current at half-turn       │\n' +
      '│ 5. Reversed field keeps pushing in same direction │\n' +
      '│ 6. Continuous rotation!                           │\n' +
      '└────────────────────────────────────────────────────┘\n\n' +
      'THE KEY INSIGHT:\n' +
      'Without the commutator, the motor would rotate halfway,\n' +
      'then stop (or oscillate). The commutator makes it SPIN!'
    );

  // Q1: Motor principle (5 pts auto)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('A motor uses the interaction between two magnetic fields. What creates these two fields?')
    .setHelpText('Think about what we learned in Station 1.')
    .setRequired(true);

  q1.setChoices([
    q1.createChoice('Permanent magnets create one field; electric current in the armature creates the other', true),
    q1.createChoice('Two permanent magnets interact', false),
    q1.createChoice('The battery creates both fields', false),
    q1.createChoice('Only one magnetic field is needed', false)
  ]);
  q1.setPoints(5);
  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! The permanent magnets provide a stationary field. Current through the armature creates a second field. These fields interact (attract/repel) to create rotation!')
      .build()
  );
  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Remember Station 1: current through a coil creates a magnetic field (electromagnet). This interacts with permanent magnets.')
      .build()
  );

  // Q2: Commutator purpose (6 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 2: Explain the Commutator (6 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '6: Explains that commutator reverses current to maintain rotation, with clear reasoning\n' +
      '5: Good explanation with minor gaps\n' +
      '4: Understands reversal but incomplete explanation\n' +
      '2-3: Partial understanding\n' +
      '1: Vague response\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('The commutator reverses the current direction every half-turn. WHY is this necessary for continuous rotation? What would happen without it?')
    .setHelpText(
      'Sentence starters:\n' +
      '• "Without the commutator, after half a turn the motor would..." \n' +
      '• "The commutator reverses current so that the electromagnet..." \n' +
      '• "This keeps the motor spinning because..."'
    )
    .setRequired(true);

  // Q3: Energy transformation (6 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 3: Energy Transformation (6 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '6: Traces energy from battery → electrical → magnetic interaction → mechanical with clear chain\n' +
      '5: Good energy chain with minor gaps\n' +
      '4: Identifies key transformations but incomplete\n' +
      '2-3: Partial understanding\n' +
      '1: Vague response\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Trace the energy transformation in a motor from battery to spinning motion. What forms does the energy take along the way?')
    .setHelpText(
      'Sentence starters:\n' +
      '• "Energy starts as ___ energy in the battery..." \n' +
      '• "Current flowing creates ___ energy in the magnetic field..." \n' +
      '• "The field interaction produces ___ energy (motion)..."'
    )
    .setRequired(true);

  // Q4: Generator vs Motor (4 pts auto)
  const q4 = form.addMultipleChoiceItem()
    .setTitle('A generator and a motor are essentially the same device run in opposite directions. What\'s the key difference in how they\'re used?')
    .setRequired(true);

  q4.setChoices([
    q4.createChoice('Generator: input motion, output electricity. Motor: input electricity, output motion.', true),
    q4.createChoice('They are completely different devices with nothing in common', false),
    q4.createChoice('Generators are always bigger than motors', false),
    q4.createChoice('Motors can only use AC power', false)
  ]);
  q4.setPoints(4);
  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! They\'re inverses of each other. In fact, an electric car uses the motor as a generator during braking (regenerative braking) to recapture energy!')
      .build()
  );
  q4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Think about input and output: Generator receives mechanical energy (spinning) and outputs electrical energy. What does a motor receive and output?')
      .build()
  );

  // Q5: Design sketch description (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 5: Your Motor Design (4 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '4: Describes all 5 components (armature, magnets, commutator, brushes, power) with arrangement\n' +
      '3: Describes most components with arrangement\n' +
      '2: Basic components but missing key elements\n' +
      '1: Vague description\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Describe your motor design. Include: arrangement of magnets, position of the armature coil, how the commutator works, and how electricity reaches the spinning part.')
    .setHelpText(
      'Sentence starters:\n' +
      '• "My motor has permanent magnets positioned..." \n' +
      '• "The armature coil is mounted so it can..." \n' +
      '• "The commutator is attached to ___ and switches current when..." \n' +
      '• "Brushes deliver current by..."'
    )
    .setRequired(true);

  logFormInfo_(form, 'G8 C6 W2 Station 3', 25);
  return form;
}

// ============================================================================
// EXIT TICKET - ELECTROMAGNETISM INTEGRATION (23 points, ~15 min)
// 2 NEW + 2 SPIRAL + 1 INTEGRATION + 1 SEP
// ============================================================================

function createG8C6W2ExitTicket_() {
  const form = FormApp.create('G8.C6.W2: Exit Ticket - Electromagnetism Integration');

  form.setDescription(
    'EXIT TICKET: SHOW WHAT YOU LEARNED\n\n' +
    'This tests your understanding of electromagnetism and induction.\n\n' +
    '---\n' +
    'Time: About 15 minutes | Points: 23\n\n' +
    'QUESTION TYPES:\n' +
    '- 2 NEW questions (Cycle 6 Week 2 - electromagnetism)\n' +
    '- 2 SPIRAL questions (Week 1 fields; Cycle 5 EM waves)\n' +
    '- 1 INTEGRATION question (motor/generator connection)\n' +
    '- 1 SEP-3 question (planning investigations)'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'WEEK 2 COMPLETE! Congratulations!\n\n' +
    'You learned about electromagnetism.\n\n' +
    'Key takeaways:\n' +
    '• Electric current creates magnetic fields (electromagnets)\n' +
    '• Changing magnetic fields create electric current (induction)\n' +
    '• Motors convert electricity to motion; generators do the opposite\n' +
    '• The commutator enables continuous rotation\n\n' +
    'NEXT WEEK: Synthesis & Assessment - putting it all together!'
  );

  // --- NEW CONTENT ---
  form.addPageBreakItem()
    .setTitle('NEW CONTENT (Questions 1 & 2)')
    .setHelpText('These test what you learned TODAY about electromagnetism.');

  // Q1: NEW - Electromagnet strength (4 pts auto)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('To make an electromagnet stronger, you could:')
    .setRequired(true);

  q1.setChoices([
    q1.createChoice('Increase current, add more coil turns, use an iron core', true),
    q1.createChoice('Decrease current and remove the core', false),
    q1.createChoice('Use fewer coils and an aluminum core', false),
    q1.createChoice('Electromagnet strength cannot be changed', false)
  ]);
  q1.setPoints(4);
  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! All three factors increase field strength: more current = more field, more turns = more concentrated field, iron core = amplified field.')
      .build()
  );
  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Review Station 1: What variables increased the number of paper clips the electromagnet could lift?')
      .build()
  );

  // Q2: NEW - Induction application (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 2: NEW - Apply Induction (4 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '4: Explains need for changing field + method to create change (motion or varying current)\n' +
      '3: Mentions change needed with partial explanation\n' +
      '2: Basic understanding but incomplete\n' +
      '1: Vague response\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('A wireless phone charger transfers energy without wires. Using electromagnetic induction, explain how this might work. (Hint: the charger has a coil, and so does the phone.)')
    .setHelpText(
      'Sentence starters:\n' +
      '• "The charger must create a ___ magnetic field because..." \n' +
      '• "This changing field induces ___ in the phone\'s coil..." \n' +
      '• "The phone converts this into ___ to charge the battery."'
    )
    .setRequired(true);

  // --- SPIRAL CONTENT ---
  form.addPageBreakItem()
    .setTitle('SPIRAL CONTENT (Questions 3 & 4)')
    .setHelpText('These review concepts from Week 1 and Cycle 5.');

  // Q3: SPIRAL - Week 1 Fields (4 pts auto)
  const q3 = form.addMultipleChoiceItem()
    .setTitle('WEEK 1 REVIEW: How are the magnetic fields from a permanent magnet and an electromagnet similar?')
    .setRequired(true);

  q3.setChoices([
    q3.createChoice('Both extend through space, have N/S poles, and decrease in strength with distance', true),
    q3.createChoice('They are completely different types of fields', false),
    q3.createChoice('Electromagnets don\'t have poles', false),
    q3.createChoice('Permanent magnet fields don\'t extend through space', false)
  ]);
  q3.setPoints(4);
  q3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! The fields are identical in nature—both are magnetic fields with the same properties. The only difference is the source (permanent vs. electric current).')
      .build()
  );
  q3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Think about Week 1: all magnetic fields share the same properties (extend through space, N-S poles, force decreases with distance).')
      .build()
  );

  // Q4: SPIRAL - Cycle 5 EM Waves (4 pts auto)
  const q4 = form.addMultipleChoiceItem()
    .setTitle('CYCLE 5 REVIEW: Electromagnetic waves (light, radio, etc.) are made of oscillating electric and magnetic fields. How does this connect to what we learned today?')
    .setRequired(true);

  q4.setChoices([
    q4.createChoice('Changing electric fields create magnetic fields and vice versa—this self-sustaining cycle IS an EM wave', true),
    q4.createChoice('EM waves have nothing to do with electromagnetism', false),
    q4.createChoice('Only permanent magnets can create EM waves', false),
    q4.createChoice('EM waves are made of matter, not fields', false)
  ]);
  q4.setPoints(4);
  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Changing E-field → creates B-field → creates E-field → ... This self-propagating cycle IS light! Maxwell unified electricity, magnetism, and optics.')
      .build()
  );
  q4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Today we learned: changing magnetic fields create electric effects. Changing electric fields create magnetic effects. What happens if they keep changing each other?')
      .build()
  );

  // --- INTEGRATION ---
  form.addPageBreakItem()
    .setTitle('INTEGRATION (Question 5)')
    .setHelpText('This requires connecting multiple concepts.');

  // Q5: Integration (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 5: INTEGRATION (4 points)')
    .setHelpText(
      '3D ASSESSMENT RUBRIC:\n' +
      '4: Explains motor-generator symmetry with clear energy transformation chain\n' +
      '   SEP-6: Constructs explanation using cause-effect\n' +
      '   DCI: Applies PS3.A energy transformation\n' +
      '   CCC: Uses energy and matter flow reasoning\n' +
      '3: Good explanation with minor gaps\n' +
      '2: Identifies connection but doesn\'t fully explain\n' +
      '1: Vague connection\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Electric cars use regenerative braking: when slowing down, the motor runs BACKWARD as a generator, creating electricity to recharge the battery. Explain how this works using electromagnetism concepts.')
    .setHelpText(
      'Sentence starters:\n' +
      '• "Normally, the motor uses electricity to create..." \n' +
      '• "During braking, the wheels\' motion causes the armature to..." \n' +
      '• "This changing field induces ___ which flows back to..."'
    )
    .setRequired(true);

  // --- SEP-3: PLANNING INVESTIGATIONS ---
  form.addPageBreakItem()
    .setTitle('SEP-3: Plan an Investigation (Question 6)')
    .setHelpText(
      'NGSS Practice: Planning and Carrying Out Investigations\n' +
      'Scientists design experiments to test hypotheses!'
    );

  form.addSectionHeaderItem()
    .setTitle('Question 6: Design an Investigation (3 points)')
    .setHelpText(
      'RUBRIC - SEP-3: Planning Investigations\n' +
      '3 pts: Identifies IV, DV, controls, and measurement method\n' +
      '2 pts: Identifies variables but missing controls or method\n' +
      '1 pt: Vague investigation plan\n' +
      '0 pts: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Design an investigation to test: "Does spinning speed affect how much electricity a generator produces?" Include: what you\'d change, what you\'d measure, and what you\'d keep the same.')
    .setHelpText(
      'Format:\n' +
      '• Independent variable (what I change): \n' +
      '• Dependent variable (what I measure): \n' +
      '• Controlled variables (what stays the same): \n' +
      '• How I\'d measure the output: '
    )
    .setRequired(true);

  logFormInfo_(form, 'G8 C6 W2 Exit Ticket', 23);
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
function testG8C6W2Hook() { createG8C6W2Hook_(); }
function testG8C6W2Station1() { createG8C6W2Station1_(); }
function testG8C6W2Station2() { createG8C6W2Station2_(); }
function testG8C6W2Station3() { createG8C6W2Station3_(); }
function testG8C6W2ExitTicket() { createG8C6W2ExitTicket_(); }
