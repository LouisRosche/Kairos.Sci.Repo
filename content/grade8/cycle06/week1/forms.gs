/**
 * ============================================================================
 * GRADE 8 - CYCLE 6 WEEK 1: MAGNETIC FORCES & FIELDS
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
 *   SEP-1: Asking Questions - Ask testable questions about magnetic forces
 *   SEP-3: Planning Investigations - Design force-distance experiments
 *   SEP-4: Analyzing Data - Interpret field and force data
 *   DCI PS2.B: Types of Interactions - Magnetic forces act at a distance
 *   CCC-2: Cause and Effect - Distance affects force strength
 *   CCC-3: Scale, Proportion, Quantity - Quantify force-distance relationship
 *
 * LEARNING TARGETS:
 *   1. Describe magnetic fields and how they extend through space
 *   2. Explain how distance affects magnetic force strength
 *   3. Identify factors that influence magnetic field strength
 *   4. Design investigations to test magnetic force relationships
 *
 * FORMS:
 *   1. Hook - The Invisible Force Mystery (12 pts, ~10 min)
 *   2. Station 1 - Magnetic Field Mapping (20 pts, ~18 min)
 *   3. Station 2 - Force-Distance Investigation (20 pts, ~15 min)
 *   4. Station 3 - Design a Magnetic Levitation Device (25 pts, ~20 min)
 *   5. Exit Ticket - Magnetic Force Integration (23 pts, ~15 min)
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
 *   3. Run: createAllG8C6W1Forms()
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

function createAllG8C6W1Forms() {
  Logger.log('================================================');
  Logger.log('G8 CYCLE 6 WEEK 1: MAGNETIC FORCES & FIELDS');
  Logger.log('================================================\n');

  const forms = {
    hook: createG8C6W1Hook_(),
    station1: createG8C6W1Station1_(),
    station2: createG8C6W1Station2_(),
    station3: createG8C6W1Station3_(),
    exitTicket: createG8C6W1ExitTicket_()
  };

  Logger.log('\n================================================');
  Logger.log('ALL 5 FORMS CREATED - 100 POINTS TOTAL');
  Logger.log('================================================');

  return forms;
}

// ============================================================================
// HOOK - THE INVISIBLE FORCE MYSTERY (12 points, ~10 min)
// Introduces magnetic forces and fields through phenomenon
// ============================================================================

function createG8C6W1Hook_() {
  const form = FormApp.create('G8.C6.W1: Hook - The Invisible Force Mystery');

  form.setDescription(
    'THE INVISIBLE FORCE MYSTERY\n\n' +
    'Hold a magnet above a table. Slowly move another magnet underneath.\n' +
    'At some point, the top magnet jumps or spins—the force acts right through solid wood!\n\n' +
    'But why do some magnets attract from inches away while others only work when touching?\n' +
    'And why does distance matter so much?\n\n' +
    '---\n' +
    'Time: About 10 minutes | Points: 12\n' +
    'Connect this to waves from Cycle 5—can forces move through materials like waves do?'
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
    'Next: Map magnetic fields with iron filings and compasses!\n' +
    'You\'ll visualize the invisible force field around magnets.'
  );

  // --- PART 1: OBSERVATION ---
  form.addPageBreakItem()
    .setTitle('Part 1: The Phenomenon')
    .setHelpText('Think about what you observe when magnets interact.');

  // Q1: Initial observation (3 pts auto)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('A strong magnet can attract another magnet through a wooden table. What does this tell us about magnetic forces?')
    .setHelpText('Think about what\'s happening in the space between the magnets.')
    .setRequired(true);

  q1.setChoices([
    q1.createChoice('Magnetic forces can act through space without touching (action at a distance)', true),
    q1.createChoice('The magnets must be physically touching to work', false),
    q1.createChoice('Wood has special magnetic properties', false),
    q1.createChoice('The force only works in air, not through solids', false)
  ]);
  q1.setPoints(3);
  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Magnets exert forces at a distance through their magnetic field. The field extends through space and most materials!')
      .build()
  );
  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Think: If the magnet through the table can attract something on top, can the force travel through the table?')
      .build()
  );

  // --- MTSS FLAG: Check for prior force misconceptions ---
  const mtss1 = form.addMultipleChoiceItem()
    .setTitle('QUICK CHECK (Prior Knowledge): What is a "field" in physics?')
    .setHelpText('This checks your understanding from previous units. Your answer does NOT affect your grade.')
    .setRequired(true);

  mtss1.setChoices([
    mtss1.createChoice('A region where a force can act on objects without direct contact', true),
    mtss1.createChoice('A type of farm where crops grow', false),  // Literal interpretation
    mtss1.createChoice('A force that only works at very short distances', false),
    mtss1.createChoice('Something that requires physical contact to work', false)
  ]);
  // No setPoints() - diagnostic only

  // Q2: Prediction (3 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 2 (3 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '3: Predicts that distance affects strength with reasoning about field/space\n' +
      '2: Mentions distance matters but incomplete reasoning\n' +
      '1: Guess without scientific reasoning\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('WHY do you think some magnets can attract through a thick table while weak magnets barely work through paper? What do you think is different?')
    .setHelpText(
      'Sentence starters:\n' +
      '• "I think strong magnets work through tables because..." \n' +
      '• "The difference might be in the ___ around the magnet..." \n' +
      '• "Distance might matter because..."'
    )
    .setRequired(true);

  // --- PART 2: CYCLE 5 CONNECTION ---
  form.addPageBreakItem()
    .setTitle('Part 2: Cycle 5 Connection')
    .setHelpText('Connect this to what you learned about waves.');

  // Q3: Wave-field connection (3 pts auto)
  const q3 = form.addMultipleChoiceItem()
    .setTitle('In Cycle 5, we studied how waves can travel through materials. How might magnetic fields be SIMILAR to waves?')
    .setRequired(true);

  q3.setChoices([
    q3.createChoice('Both can extend through space and affect things at a distance', true),
    q3.createChoice('Magnetic fields are identical to sound waves', false),
    q3.createChoice('Neither waves nor fields can travel through solids', false),
    q3.createChoice('There is no similarity between waves and fields', false)
  ]);
  q3.setPoints(3);
  q3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Both waves and fields can influence things at a distance. In fact, electromagnetic WAVES are oscillating electric and magnetic fields!')
      .build()
  );
  q3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Think about how both waves and magnetic forces can affect things without direct contact.')
      .build()
  );

  // Q4: Field visualization (3 pts auto)
  const q4 = form.addMultipleChoiceItem()
    .setTitle('If you sprinkle iron filings around a magnet, they arrange themselves in a pattern. What do these patterns show?')
    .setRequired(true);

  q4.setChoices([
    q4.createChoice('The shape and direction of the magnetic field', true),
    q4.createChoice('Random arrangement with no meaning', false),
    q4.createChoice('The temperature of the magnet', false),
    q4.createChoice('The weight of the magnet', false)
  ]);
  q4.setPoints(3);
  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Iron filings align with magnetic field lines, letting us "see" the invisible field. Denser lines = stronger field.')
      .build()
  );
  q4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Iron is magnetic, so the filings respond to the magnetic force. Their arrangement reveals the field\'s pattern.')
      .build()
  );

  // Q5: Confidence (0 pts - diagnostic only)
  form.addScaleItem()
    .setTitle('Self-Assessment: How confident are you that you can describe what a magnetic field is and how it affects objects?')
    .setHelpText('FOR REFLECTION ONLY - This does NOT affect your grade. Be honest!')
    .setBounds(1, 5)
    .setLabels('Still learning', 'Got it!')
    .setRequired(true);

  logFormInfo_(form, 'G8 C6 W1 Hook', 12);
  return form;
}

// ============================================================================
// STATION 1 - MAGNETIC FIELD MAPPING (20 points, ~18 min)
// Visualize and understand magnetic field patterns
// ============================================================================

function createG8C6W1Station1_() {
  const form = FormApp.create('G8.C6.W1: Station 1 - Magnetic Field Mapping');

  form.setDescription(
    'YOUR MISSION: VISUALIZE THE INVISIBLE\n\n' +
    'Magnetic fields surround every magnet, extending out into space.\n' +
    'Today you\'ll make these invisible fields VISIBLE using iron filings and compasses.\n\n' +
    'KEY VOCABULARY:\n' +
    '• Magnetic field - region where magnetic force acts\n' +
    '• Field lines - imaginary lines showing field direction\n' +
    '• Poles - the N and S ends where the field is strongest\n' +
    '• Magnetic domain - tiny regions inside magnetic materials\n\n' +
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
    'KEY INSIGHT: Magnetic fields extend in 3D around magnets.\n' +
    'Field lines show direction (N→S) and strength (denser = stronger).\n\n' +
    'Continue to Station 2: Measure how force changes with distance'
  );

  // --- OBSERVATION REFERENCE ---
  form.addPageBreakItem()
    .setTitle('Reference: Field Pattern Observations')
    .setHelpText(
      'WHAT YOU SHOULD OBSERVE WITH IRON FILINGS:\n\n' +
      '┌────────────────────────────────────────────────────┐\n' +
      '│ Magnet Arrangement  │ Field Pattern               │\n' +
      '├────────────────────────────────────────────────────┤\n' +
      '│ Single bar magnet   │ Lines curve from N to S     │\n' +
      '│ Two attracting (N-S)│ Lines connect between poles │\n' +
      '│ Two repelling (N-N) │ Lines push apart, compress  │\n' +
      '│ Horseshoe magnet    │ Strong field between poles  │\n' +
      '└────────────────────────────────────────────────────┘\n\n' +
      'KEY OBSERVATIONS:\n' +
      '• Lines are densest (closest together) near the poles\n' +
      '• Lines NEVER cross each other\n' +
      '• Field lines show direction: exit N pole, enter S pole\n' +
      '• The field extends in all directions, even where you can\'t see it'
    );

  // Q1: Field line interpretation (4 pts auto)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('When you observe iron filings around a bar magnet, the filings are densest (most crowded) near the poles. What does this indicate?')
    .setHelpText('Think about what the density of field lines represents.')
    .setRequired(true);

  q1.setChoices([
    q1.createChoice('The magnetic field is strongest near the poles', true),
    q1.createChoice('The magnetic field is weakest near the poles', false),
    q1.createChoice('There is no magnetic field at the poles', false),
    q1.createChoice('The poles have no effect on field strength', false)
  ]);
  q1.setPoints(4);
  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Denser field lines = stronger field. The magnetic force is most powerful near the poles.')
      .build()
  );
  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Think: If more iron filings are pulled to an area, is the force stronger or weaker there?')
      .build()
  );

  // Q2: Two magnet interaction (4 pts auto)
  const q2 = form.addMultipleChoiceItem()
    .setTitle('When two magnets are placed with opposite poles facing each other (N-S), what happens to the field lines between them?')
    .setRequired(true);

  q2.setChoices([
    q2.createChoice('The field lines connect and merge, creating a strong field between the magnets', true),
    q2.createChoice('The field lines disappear between the magnets', false),
    q2.createChoice('The field lines push apart and create an empty space', false),
    q2.createChoice('Nothing happens to the field lines', false)
  ]);
  q2.setPoints(4);
  q2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Opposite poles attract because their field lines connect. The merged field creates strong attraction.')
      .build()
  );
  q2.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Remember: N-S = attract. The fields work together when opposite poles face each other.')
      .build()
  );

  // Q3: Compass behavior (4 pts auto)
  const q3 = form.addMultipleChoiceItem()
    .setTitle('A compass needle always points in a specific direction near a magnet. What does this tell us about magnetic fields?')
    .setRequired(true);

  q3.setChoices([
    q3.createChoice('Magnetic fields have a specific direction at each point in space', true),
    q3.createChoice('Magnetic fields have no direction', false),
    q3.createChoice('Compasses don\'t respond to magnets', false),
    q3.createChoice('The direction is random and changes constantly', false)
  ]);
  q3.setPoints(4);
  q3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! At any point in a magnetic field, there\'s a specific direction. Compass needles align with this direction.')
      .build()
  );
  q3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('A compass needle is a small magnet. It aligns with the local field direction, showing you which way the field "points."')
      .build()
  );

  // Q4: Field extends through space (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 4: Explain Field Extent (4 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '4: Explains field extends in all directions, decreases with distance, with evidence from observations\n' +
      '3: Explains field extends outward with some detail\n' +
      '2: Basic understanding of field extent\n' +
      '1: Vague or incomplete\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Based on your observations, describe how far the magnetic field extends from a magnet. Does it stop at a certain distance? How do you know?')
    .setHelpText(
      'Sentence starters:\n' +
      '• "The magnetic field extends ___ from the magnet because I observed..." \n' +
      '• "The field doesn\'t have a sharp boundary because..." \n' +
      '• "As you move away from the magnet, the field..."'
    )
    .setRequired(true);

  // Q5: Misconception check (4 pts auto) - targets "fields only exist at poles"
  const q5 = form.addMultipleChoiceItem()
    .setTitle('COMMON MISCONCEPTION CHECK: Where does a magnet\'s field exist?')
    .setRequired(true);

  q5.setChoices([
    q5.createChoice('The field extends in all directions around the entire magnet, not just at the poles', true),
    q5.createChoice('The field only exists at the north and south poles', false),  // TARGET MISCONCEPTION
    q5.createChoice('The field only exists between two magnets', false),
    q5.createChoice('The field only exists inside the magnet', false)
  ]);
  q5.setPoints(4);
  q5.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! The field surrounds the entire magnet in 3D. It\'s STRONGEST at the poles, but extends everywhere around the magnet.')
      .build()
  );
  q5.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('MISCONCEPTION ALERT: The field exists everywhere around the magnet, not just at the poles. The poles are where it\'s strongest, but it extends in all directions.')
      .build()
  );

  logFormInfo_(form, 'G8 C6 W1 Station 1', 20);
  return form;
}

// ============================================================================
// STATION 2 - FORCE-DISTANCE INVESTIGATION (20 points, ~15 min)
// Quantify the relationship between distance and magnetic force
// ============================================================================

function createG8C6W1Station2_() {
  const form = FormApp.create('G8.C6.W1: Station 2 - Force-Distance Investigation');

  form.setDescription(
    'YOUR MISSION: MEASURE THE INVISIBLE FORCE\n\n' +
    'You\'ve seen that magnetic fields extend through space.\n' +
    'Now let\'s MEASURE how the force changes with distance.\n\n' +
    'You\'ll discover a mathematical pattern that scientists have used\n' +
    'to design everything from MRI machines to maglev trains!\n\n' +
    '---\n' +
    'Time: About 15 minutes | Points: 20\n' +
    'You\'ll need a calculator for some questions.'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Station 2 complete!\n\n' +
    'KEY INSIGHT: Magnetic force decreases RAPIDLY with distance.\n' +
    'Double the distance → much less than half the force!\n' +
    'This is called an "inverse" relationship.\n\n' +
    'Continue to Station 3: Design a Magnetic Levitation Device'
  );

  // --- DATA REFERENCE ---
  form.addPageBreakItem()
    .setTitle('Reference: Sample Force-Distance Data')
    .setHelpText(
      'FORCE VS. DISTANCE DATA (Spring Scale Measurements):\n\n' +
      '┌────────────────────────────────────────────────────┐\n' +
      '│ Distance (cm) │ Force (N) │ Notes                  │\n' +
      '├────────────────────────────────────────────────────┤\n' +
      '│ 0.5           │ 4.0       │ Closest position       │\n' +
      '│ 1.0           │ 1.0       │ Doubled distance       │\n' +
      '│ 2.0           │ 0.25      │ Doubled again          │\n' +
      '│ 4.0           │ 0.06      │ Doubled again          │\n' +
      '│ 8.0           │ 0.015     │ Very weak              │\n' +
      '└────────────────────────────────────────────────────┘\n\n' +
      'NOTICE THE PATTERN:\n' +
      '• When distance doubles, force drops by ~4× (not 2×)\n' +
      '• This is an INVERSE relationship\n' +
      '• The force decreases faster than you might expect!'
    );

  // Q1: Pattern recognition (4 pts auto)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('Looking at the data, what happens to the magnetic force when the distance DOUBLES (e.g., from 1 cm to 2 cm)?')
    .setHelpText('Compare the force values when distance goes from 1.0 to 2.0 cm.')
    .setRequired(true);

  q1.setChoices([
    q1.createChoice('The force decreases by about 4 times (not just 2 times)', true),
    q1.createChoice('The force decreases by exactly half', false),
    q1.createChoice('The force stays the same', false),
    q1.createChoice('The force increases', false)
  ]);
  q1.setPoints(4);
  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! 1.0 N → 0.25 N = decreased by 4×. This is called an "inverse square" relationship. Distance matters A LOT!')
      .build()
  );
  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Look at the data: At 1 cm, force = 1.0 N. At 2 cm, force = 0.25 N. How many times smaller is 0.25 than 1.0?')
      .build()
  );

  // Q2: Graph prediction (4 pts auto)
  const q2 = form.addMultipleChoiceItem()
    .setTitle('If you graphed Force vs. Distance, what shape would the graph have?')
    .setHelpText('Think about how the force changes as distance increases.')
    .setRequired(true);

  q2.setChoices([
    q2.createChoice('A steep curve that drops quickly then levels off (not a straight line)', true),
    q2.createChoice('A straight diagonal line going down', false),
    q2.createChoice('A straight horizontal line', false),
    q2.createChoice('A curve that goes up', false)
  ]);
  q2.setPoints(4);
  q2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Inverse relationships produce curved graphs. The force drops steeply at first, then levels off as you get farther away.')
      .build()
  );
  q2.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('A straight line would mean the force drops at a constant rate. Does the data show that? Look at how fast it drops from 0.5→1 cm vs 4→8 cm.')
      .build()
  );

  // Q3: Prediction (4 pts auto)
  const q3 = form.addMultipleChoiceItem()
    .setTitle('Based on the pattern, predict the approximate force at 16 cm distance.')
    .setHelpText('If distance doubles from 8 cm to 16 cm, the force should decrease by ~4×.')
    .setRequired(true);

  q3.setChoices([
    q3.createChoice('About 0.004 N (0.015 ÷ 4)', true),
    q3.createChoice('About 0.0075 N (0.015 ÷ 2)', false),
    q3.createChoice('About 0.03 N (0.015 × 2)', false),
    q3.createChoice('About 0.06 N (same as 4 cm)', false)
  ]);
  q3.setPoints(4);
  q3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Double the distance (8→16 cm) = divide force by ~4. So 0.015 ÷ 4 ≈ 0.004 N.')
      .build()
  );
  q3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Remember the pattern: when distance doubles, force drops by about 4×. So 0.015 N at 8 cm → ? at 16 cm.')
      .build()
  );

  // Q4: Real-world application (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 4: Explain the Pattern (4 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '4: Explains inverse relationship with example (magnets work best close up)\n' +
      '3: Describes pattern correctly without clear example\n' +
      '2: Partial understanding\n' +
      '1: Vague response\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Why do you think refrigerator magnets only work when very close to the fridge? Use what you learned about the force-distance relationship.')
    .setHelpText(
      'Sentence starters:\n' +
      '• "Refrigerator magnets only work close up because magnetic force..." \n' +
      '• "When the magnet is even a little bit away, the force..." \n' +
      '• "This shows that distance affects magnetic force by..."'
    )
    .setRequired(true);

  // Q5: Spiral - Cycle 4 Energy (4 pts auto)
  const q5 = form.addMultipleChoiceItem()
    .setTitle('CYCLE 4 CONNECTION: In ecosystems, energy transfers between levels. In magnetism, force "transfers" through fields. What do both have in common?')
    .setRequired(true);

  q5.setChoices([
    q5.createChoice('Both decrease/weaken as you move further from the source', true),
    q5.createChoice('Both stay constant regardless of distance', false),
    q5.createChoice('Both increase as you move away', false),
    q5.createChoice('There is no similarity between energy and magnetic force', false)
  ]);
  q5.setPoints(4);
  q5.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Energy decreases at each trophic level. Magnetic force decreases with distance. Both follow patterns of decrease from a source!')
      .build()
  );
  q5.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Think about the 10% rule: energy decreases as you go up levels. Does magnetic force stay the same or decrease with distance?')
      .build()
  );

  logFormInfo_(form, 'G8 C6 W1 Station 2', 20);
  return form;
}

// ============================================================================
// STATION 3 - DESIGN A MAGNETIC LEVITATION DEVICE (25 points, ~20 min)
// Engineering design challenge applying magnetic force concepts
// ============================================================================

function createG8C6W1Station3_() {
  const form = FormApp.create('G8.C6.W1: Station 3 - Design a Magnetic Levitation Device');

  form.setDescription(
    'ENGINEERING CHALLENGE: MAGNETIC LEVITATION\n\n' +
    'Can you make something float using only magnets?\n' +
    'Apply what you\'ve learned about magnetic fields and forces to design\n' +
    'a levitation system!\n\n' +
    '---\n' +
    'Time: About 20 minutes | Points: 25 (highest value!)\n\n' +
    'CHALLENGE: Design a display stand that uses magnetic repulsion\n' +
    'to suspend a small object (like a spinning globe) without touching any support.'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Station 3 complete!\n\n' +
    'You\'ve tackled a real engineering challenge!\n' +
    'KEY INSIGHT: Magnetic levitation is hard because repelling magnets are unstable.\n' +
    'Real maglev trains use electromagnets with feedback systems to stay stable.\n\n' +
    'Continue to Exit Ticket'
  );

  // --- DESIGN REQUIREMENTS ---
  form.addPageBreakItem()
    .setTitle('Design Requirements & Constraints')
    .setHelpText(
      'DESIGN REQUIREMENTS:\n' +
      '1. Object must levitate at least 1 cm above the base\n' +
      '2. System must be stable (not flip over or fall)\n' +
      '3. Must use magnetic repulsion (like poles facing)\n' +
      '4. Must account for the force-distance relationship\n\n' +
      'AVAILABLE MATERIALS:\n' +
      '• Neodymium magnets (various sizes)\n' +
      '• Ceramic magnets (weaker)\n' +
      '• Wooden/plastic base\n' +
      '• Guide rails or walls\n' +
      '• Object to levitate (~50 grams)\n\n' +
      'THE STABILITY PROBLEM:\n' +
      'Samuel Earnshaw proved in 1842 that static magnets alone\n' +
      'CANNOT create stable levitation! This is Earnshaw\'s Theorem.\n' +
      'Real levitation needs either:\n' +
      '• Spinning (gyroscopic stability)\n' +
      '• Diamagnetic materials (pyrolytic graphite)\n' +
      '• Active feedback (electromagnets that adjust)\n\n' +
      'Your goal: Understand WHY this is challenging and propose solutions.'
    );

  // Q1: Pole arrangement (5 pts auto)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('To make an object levitate using magnetic repulsion, which pole arrangement do you need?')
    .setHelpText('Think: To push something up against gravity, you need an upward force.')
    .setRequired(true);

  q1.setChoices([
    q1.createChoice('North facing North (or South facing South) - like poles repel', true),
    q1.createChoice('North facing South - opposite poles attract', false),
    q1.createChoice('The arrangement doesn\'t matter', false),
    q1.createChoice('You need alternating poles', false)
  ]);
  q1.setPoints(5);
  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Like poles repel, creating an upward force to oppose gravity. N-N or S-S arrangement is needed.')
      .build()
  );
  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Remember: To make something float, you need to PUSH it up. Which arrangement pushes magnets apart?')
      .build()
  );

  // Q2: Force calculation reasoning (6 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 2: Force Analysis (6 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '6: Explains that repulsion must equal gravity, and force changes with height\n' +
      '5: Good understanding of force balance with minor gaps\n' +
      '4: Mentions force balance but incomplete\n' +
      '2-3: Partial understanding\n' +
      '1: Vague attempt\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('For an object to levitate at 1 cm, the magnetic repulsion force must balance gravity. Using the force-distance relationship, explain why finding the right height is tricky.')
    .setHelpText(
      'Sentence starters:\n' +
      '• "At the levitation point, the magnetic force must equal..." \n' +
      '• "If the object moves up slightly, the force ___ because..." \n' +
      '• "If the object moves down slightly, the force ___ because..." \n' +
      '• "This makes stable levitation difficult because..."'
    )
    .setRequired(true);

  // Q3: Stability problem (6 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 3: The Stability Challenge (6 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '6: Identifies that magnets flip or slide, proposes solution (spinning, guides, feedback)\n' +
      '5: Identifies problem clearly with partial solution\n' +
      '4: Understands instability but no solution\n' +
      '2-3: Partial understanding\n' +
      '1: Vague response\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('When you try to balance one magnet above another using repulsion, it flips over or slides sideways. Why does this happen, and how might you prevent it?')
    .setHelpText(
      'Sentence starters:\n' +
      '• "The magnet flips because..." \n' +
      '• "It slides sideways because there\'s nothing to..." \n' +
      '• "To prevent this, I could use..." \n' +
      '• "Real maglev trains solve this by..."'
    )
    .setRequired(true);

  // Q4: Design sketch description (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 4: Your Design (4 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '4: Describes magnet positions, pole orientations, and stability mechanism\n' +
      '3: Describes design with some details missing\n' +
      '2: Basic concept but missing key elements\n' +
      '1: Vague description\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Describe your levitation device design. Include: magnet positions, pole orientations, how you\'ll keep it stable, and estimated levitation height.')
    .setHelpText(
      'Sentence starters:\n' +
      '• "My design has a base magnet with ___ pole facing up..." \n' +
      '• "The floating object has ___ pole facing down..." \n' +
      '• "To keep it stable, I would add..." \n' +
      '• "I estimate it would float at ___ cm because..."'
    )
    .setRequired(true);

  // Q5: Real-world connection (4 pts auto)
  const q5 = form.addMultipleChoiceItem()
    .setTitle('Maglev trains levitate using magnets. Based on what you learned, why do they need ELECTROMAGNETS (magnets powered by electricity) instead of permanent magnets?')
    .setRequired(true);

  q5.setChoices([
    q5.createChoice('Electromagnets can be adjusted instantly to maintain stable levitation', true),
    q5.createChoice('Permanent magnets are too expensive', false),
    q5.createChoice('Permanent magnets don\'t work on trains', false),
    q5.createChoice('Electromagnets are lighter', false)
  ]);
  q5.setPoints(4);
  q5.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Static magnets can\'t create stable levitation (Earnshaw\'s theorem). Electromagnets with sensors adjust strength constantly to keep the train stable!')
      .build()
  );
  q5.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Think about the stability problem: if the train dips slightly, it needs MORE force to push it back up. Permanent magnets can\'t adjust.')
      .build()
  );

  logFormInfo_(form, 'G8 C6 W1 Station 3', 25);
  return form;
}

// ============================================================================
// EXIT TICKET - MAGNETIC FORCE INTEGRATION (23 points, ~15 min)
// 2 NEW + 2 SPIRAL + 1 INTEGRATION + 1 SEP
// ============================================================================

function createG8C6W1ExitTicket_() {
  const form = FormApp.create('G8.C6.W1: Exit Ticket - Magnetic Force Integration');

  form.setDescription(
    'EXIT TICKET: SHOW WHAT YOU LEARNED\n\n' +
    'This tests your understanding of magnetic fields and forces.\n\n' +
    '---\n' +
    'Time: About 15 minutes | Points: 23\n\n' +
    'QUESTION TYPES:\n' +
    '- 2 NEW questions (Cycle 6 content - magnetic fields & forces)\n' +
    '- 2 SPIRAL questions (Cycle 4 & 5 review)\n' +
    '- 1 INTEGRATION question (connects multiple concepts)\n' +
    '- 1 SEP-1 question (asking testable questions)'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'WEEK 1 COMPLETE! Congratulations!\n\n' +
    'You learned about magnetic forces and fields.\n\n' +
    'Key takeaways:\n' +
    '• Magnetic fields extend through space around magnets\n' +
    '• Force decreases rapidly with distance (inverse relationship)\n' +
    '• Field lines show direction and strength\n' +
    '• Stable magnetic levitation requires active control\n\n' +
    'NEXT WEEK: How can spinning magnets create ELECTRICITY?'
  );

  // --- NEW CONTENT ---
  form.addPageBreakItem()
    .setTitle('NEW CONTENT (Questions 1 & 2)')
    .setHelpText('These test what you learned TODAY about magnetic fields and forces.');

  // Q1: NEW - Field interpretation (4 pts auto)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('In a diagram of magnetic field lines, what does it mean when the lines are very close together?')
    .setRequired(true);

  q1.setChoices([
    q1.createChoice('The magnetic field is stronger in that region', true),
    q1.createChoice('The magnetic field is weaker in that region', false),
    q1.createChoice('The field doesn\'t exist there', false),
    q1.createChoice('The lines being close has no meaning', false)
  ]);
  q1.setPoints(4);
  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Dense field lines = strong field. This is why the force is strongest near the poles where lines are most concentrated.')
      .build()
  );
  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Think about what the iron filings showed: where there are more filings (denser lines), the force must be pulling harder.')
      .build()
  );

  // Q2: NEW - Force-distance application (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 2: NEW - Apply Force-Distance Relationship (4 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '4: Explains inverse relationship with correct prediction (weaker force at greater distance)\n' +
      '3: Correct prediction with partial explanation\n' +
      '2: Mentions distance but reasoning unclear\n' +
      '1: Incorrect reasoning\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('A magnet can pick up a paper clip from 2 cm away. If you move the magnet to 4 cm away, will it still be able to pick up the paper clip? Explain using the force-distance relationship.')
    .setHelpText(
      'Sentence starters:\n' +
      '• "At 4 cm, the magnetic force will be ___ because..." \n' +
      '• "When distance doubles, the force..." \n' +
      '• "So the paper clip probably ___ because..."'
    )
    .setRequired(true);

  // --- SPIRAL CONTENT ---
  form.addPageBreakItem()
    .setTitle('SPIRAL CONTENT (Questions 3 & 4)')
    .setHelpText('These review concepts from Cycles 4 and 5.');

  // Q3: SPIRAL - Cycle 5 Waves (4 pts auto)
  const q3 = form.addMultipleChoiceItem()
    .setTitle('CYCLE 5 REVIEW: Both waves and magnetic fields can affect things at a distance. What\'s a key DIFFERENCE between them?')
    .setRequired(true);

  q3.setChoices([
    q3.createChoice('Waves transfer energy through oscillations; magnetic fields exert continuous force', true),
    q3.createChoice('Waves can\'t travel through solids but magnetic fields can', false),
    q3.createChoice('There are no differences; they\'re the same thing', false),
    q3.createChoice('Magnetic fields only exist in a vacuum', false)
  ]);
  q3.setPoints(4);
  q3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Waves oscillate and transfer energy. Magnetic fields exert a steady force at a distance. Fun fact: EM waves ARE oscillating magnetic and electric fields!')
      .build()
  );
  q3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Review: Waves are disturbances that travel. Magnetic fields create forces. Both act at a distance, but in different ways.')
      .build()
  );

  // Q4: SPIRAL - Cycle 4 Energy (4 pts auto)
  const q4 = form.addMultipleChoiceItem()
    .setTitle('CYCLE 4 REVIEW: The 10% rule describes how energy decreases at each trophic level. What similar pattern did you observe with magnetic force?')
    .setRequired(true);

  q4.setChoices([
    q4.createChoice('Magnetic force also decreases rapidly as you move away from the source', true),
    q4.createChoice('Magnetic force stays constant at all distances', false),
    q4.createChoice('Magnetic force increases with distance', false),
    q4.createChoice('There is no pattern in magnetic force with distance', false)
  ]);
  q4.setPoints(4);
  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Both follow patterns of rapid decrease from the source. Energy decreases by ~90% per level; magnetic force follows an inverse pattern.')
      .build()
  );
  q4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Look at the force-distance data: as distance increases, what happens to the force? Compare to how energy decreases in food chains.')
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
      '4: Connects field strength, distance, and practical applications with clear reasoning\n' +
      '   SEP-1: Identifies testable aspects of the question\n' +
      '   DCI: Applies PS2.B force concepts correctly\n' +
      '   CCC: Uses cause-effect reasoning\n' +
      '3: Makes connection with partial explanation\n' +
      '2: Mentions concepts but doesn\'t connect them\n' +
      '1: Vague connection\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Credit card magnetic strips can be damaged by strong magnets. Using what you learned about fields and distance, explain: (1) why you should keep magnets away from credit cards, and (2) how far away is "safe"?')
    .setHelpText(
      'Sentence starters:\n' +
      '• "Magnetic fields from strong magnets can ___ the data on credit cards..." \n' +
      '• "Using the force-distance relationship, at ___ distance the field becomes..." \n' +
      '• "To be safe, you should keep magnets at least ___ away because..."'
    )
    .setRequired(true);

  // --- SEP-1: ASKING QUESTIONS ---
  form.addPageBreakItem()
    .setTitle('SEP-1: Ask a Testable Question (Question 6)')
    .setHelpText(
      'NGSS Practice: Asking Questions and Defining Problems\n' +
      'Scientists design investigations to answer questions!'
    );

  form.addSectionHeaderItem()
    .setTitle('Question 6: Ask a Testable Question (3 points)')
    .setHelpText(
      'RUBRIC - SEP-1: Asking Questions\n' +
      '3 pts: Asks specific, testable question about magnetic force with variables identified\n' +
      '2 pts: Asks a question about magnets but not clearly testable\n' +
      '1 pt: Vague or not related to investigation\n' +
      '0 pts: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Write one testable question you could investigate about magnetic forces. A good question identifies variables (what you change, what you measure).')
    .setHelpText(
      'Example formats:\n' +
      '• "How does ___ affect ___?"\n' +
      '• "What is the relationship between ___ and ___?"\n' +
      '• "Does changing ___ increase or decrease ___?"'
    )
    .setRequired(true);

  logFormInfo_(form, 'G8 C6 W1 Exit Ticket', 23);
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
function testG8C6W1Hook() { createG8C6W1Hook_(); }
function testG8C6W1Station1() { createG8C6W1Station1_(); }
function testG8C6W1Station2() { createG8C6W1Station2_(); }
function testG8C6W1Station3() { createG8C6W1Station3_(); }
function testG8C6W1ExitTicket() { createG8C6W1ExitTicket_(); }
