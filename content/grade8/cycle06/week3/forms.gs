/**
 * ============================================================================
 * GRADE 8 - CYCLE 6 WEEK 3: SYNTHESIS & ASSESSMENT
 * 3 Forms | 100 Points Total | ~75 Minutes
 * ============================================================================
 *
 * NGSS ALIGNMENT:
 *   Primary: MS-PS2-3 - Ask questions about data to determine factors that
 *            affect the strength of electric and magnetic forces
 *   Spiral:  MS-PS4-2 - Wave behavior (Cycle 5)
 *            MS-LS2-3 - Energy flow (Cycle 4)
 *
 * 3-DIMENSIONAL LEARNING:
 *   SEP-1: Asking Questions - Ask testable questions about EM phenomena
 *   SEP-4: Analyzing and Interpreting Data - Interpret force and field data
 *   SEP-6: Constructing Explanations - Explain electromagnetic relationships
 *   DCI PS2.B: Types of Interactions - Electric and magnetic forces
 *   DCI PS3.A: Energy - Energy transformation in EM systems
 *   CCC-2: Cause and Effect - Force factors and relationships
 *   CCC-5: Energy and Matter - Energy flow in motors/generators
 *
 * ASSESSMENT STRUCTURE:
 *   Part 1: Synthesis Review (20 pts, ~15 min) - Connect W1 + W2
 *   Part 2: Cumulative Assessment (60 pts, ~40 min) - Full cycle content
 *   Part 3: Misconception Check (20 pts, ~20 min) - Target persistent errors
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
 *   3. Run: createAllG8C6W3Forms()
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

function createAllG8C6W3Forms() {
  Logger.log('================================================');
  Logger.log('G8 CYCLE 6 WEEK 3: SYNTHESIS & ASSESSMENT');
  Logger.log('================================================\n');

  const forms = {
    synthesis: createG8C6W3Synthesis_(),
    cumulative: createG8C6W3Cumulative_(),
    misconceptions: createG8C6W3Misconceptions_()
  };

  Logger.log('\n================================================');
  Logger.log('ALL 3 FORMS CREATED - 100 POINTS TOTAL');
  Logger.log('================================================');

  return forms;
}

// ============================================================================
// PART 1: SYNTHESIS REVIEW (20 points, ~15 min)
// Connect Week 1 magnetic fields + Week 2 electromagnetism
// ============================================================================

function createG8C6W3Synthesis_() {
  const form = FormApp.create('G8.C6.W3: Part 1 - Synthesis Review');

  form.setDescription(
    'SYNTHESIS: CONNECTING ELECTRICITY & MAGNETISM\n\n' +
    'This review connects what you learned in Weeks 1 and 2:\n' +
    '• Week 1: Magnetic fields and force-distance relationships\n' +
    '• Week 2: Electromagnets, induction, motors, and generators\n\n' +
    'Show that you can connect these concepts!\n\n' +
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
    'Part 1 complete!\n\n' +
    'You\'ve shown how electricity and magnetism connect.\n\n' +
    'Continue to Part 2: Cumulative Assessment'
  );

  // --- SECTION 1: WEEK 1 → WEEK 2 CONNECTION ---
  form.addPageBreakItem()
    .setTitle('Connecting Weeks 1 & 2')
    .setHelpText('Show how the concepts from both weeks connect.');

  // Q1: Motor-generator relationship (5 pts auto)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('A generator and a motor are related. Which statement BEST describes their relationship?')
    .setRequired(true);

  q1.setChoices([
    q1.createChoice('They are the same device run in opposite directions: generator = motion→electricity, motor = electricity→motion', true),
    q1.createChoice('They are completely different devices with nothing in common', false),
    q1.createChoice('Motors can never work as generators', false),
    q1.createChoice('Generators only work with permanent magnets, motors only with electromagnets', false)
  ]);
  q1.setPoints(5);
  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Electric cars use this relationship—during braking, the motor becomes a generator (regenerative braking) to recapture energy.')
      .build()
  );
  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Think about input and output: What goes into a motor? What comes out? Now reverse it.')
      .build()
  );

  // Q2: Connection explanation (5 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 2: Explain the Connection (5 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '5: Explains both directions with clear mechanism (current→field, changing field→current)\n' +
      '4: Good explanation of both directions with minor gaps\n' +
      '3: Explains one direction well\n' +
      '2: Basic understanding but incomplete\n' +
      '1: Vague response\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('How are electromagnets (Week 2) related to the magnetic fields we studied in Week 1? Explain what creates the field in each case.')
    .setHelpText(
      'Sentence starters:\n' +
      '• "In Week 1, we learned that magnetic fields come from..." \n' +
      '• "In Week 2, we discovered that electromagnet fields come from..." \n' +
      '• "Both fields are similar because..."'
    )
    .setRequired(true);

  // Q3: Field comparison (5 pts auto)
  const q3 = form.addMultipleChoiceItem()
    .setTitle('The magnetic field around an electromagnet and the field around a permanent magnet are:')
    .setRequired(true);

  q3.setChoices([
    q3.createChoice('The same type of field with the same properties, just from different sources', true),
    q3.createChoice('Completely different types of fields', false),
    q3.createChoice('Electromagnet fields are much weaker than permanent magnet fields', false),
    q3.createChoice('Permanent magnet fields don\'t really exist', false)
  ]);
  q3.setPoints(5);
  q3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! A magnetic field is a magnetic field—it has N/S poles, field lines, and decreasing strength with distance regardless of whether a permanent magnet or current creates it.')
      .build()
  );
  q3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Think: Do electromagnet fields have N/S poles? Do they decrease with distance? Do field lines show the same patterns?')
      .build()
  );

  // Q4: Application (5 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 4: Apply Your Understanding (5 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '5: Explains induction requires change, connects to field strength changing with motion\n' +
      '4: Good explanation with minor gaps\n' +
      '3: Mentions change is needed but incomplete reasoning\n' +
      '2: Basic understanding\n' +
      '1: Vague response\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('In Week 1, you learned that magnetic force decreases with distance. In Week 2, you learned about induction. How does the force-distance relationship explain why MOVING a magnet causes induction?')
    .setHelpText(
      'Sentence starters:\n' +
      '• "When a magnet moves closer to a coil, the field at the coil..." \n' +
      '• "This change in field strength causes..." \n' +
      '• "Without motion, the field would be ___, so no current flows."'
    )
    .setRequired(true);

  logFormInfo_(form, 'G8 C6 W3 Synthesis', 20);
  return form;
}

// ============================================================================
// PART 2: CUMULATIVE ASSESSMENT (60 points, ~40 min)
// Full cycle content assessment
// ============================================================================

function createG8C6W3Cumulative_() {
  const form = FormApp.create('G8.C6.W3: Part 2 - Cumulative Assessment');

  form.setDescription(
    'CUMULATIVE ASSESSMENT: ELECTRICITY & MAGNETISM\n\n' +
    'This assessment covers all of Cycle 6:\n' +
    '• Section A: Magnetic Fields (15 pts)\n' +
    '• Section B: Force Relationships (15 pts)\n' +
    '• Section C: Electromagnetism (15 pts)\n' +
    '• Section D: Energy Transfer (15 pts)\n\n' +
    '---\n' +
    'Time: About 40 minutes | Points: 60\n\n' +
    'Read each question carefully. Use your notecard if you have one.'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Part 2 complete!\n\n' +
    'You\'ve completed the cumulative assessment.\n\n' +
    'Continue to Part 3: Misconception Check'
  );

  // =========================================================================
  // SECTION A: MAGNETIC FIELDS (15 points)
  // =========================================================================
  form.addPageBreakItem()
    .setTitle('Section A: Magnetic Fields (15 pts)')
    .setHelpText('Questions about magnetic field properties from Week 1.');

  // A1: Field line interpretation (4 pts auto)
  const a1 = form.addMultipleChoiceItem()
    .setTitle('A1. In a magnetic field diagram, areas where field lines are very close together indicate:')
    .setRequired(true);

  a1.setChoices([
    a1.createChoice('A stronger magnetic field', true),
    a1.createChoice('A weaker magnetic field', false),
    a1.createChoice('No magnetic field', false),
    a1.createChoice('A neutral zone', false)
  ]);
  a1.setPoints(4);
  a1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Denser field lines = stronger field. This is most noticeable near the poles of a magnet.')
      .build()
  );

  // A2: Pole interaction (4 pts auto)
  const a2 = form.addMultipleChoiceItem()
    .setTitle('A2. When two magnets are arranged with N facing N (or S facing S), the field lines between them:')
    .setRequired(true);

  a2.setChoices([
    a2.createChoice('Push apart and compress, creating repulsion', true),
    a2.createChoice('Connect and merge, creating attraction', false),
    a2.createChoice('Disappear completely', false),
    a2.createChoice('Pass through each other unchanged', false)
  ]);
  a2.setPoints(4);
  a2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Like poles repel because their field lines push against each other. Opposite poles (N-S) attract because their field lines connect.')
      .build()
  );

  // A3: Field explanation (7 pts manual)
  form.addSectionHeaderItem()
    .setTitle('A3. Explain Field Extent (7 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '7: Explains field extends in all 3D directions, gets weaker with distance, no sharp boundary\n' +
      '5-6: Good explanation with 2 of 3 elements\n' +
      '3-4: Partial explanation\n' +
      '1-2: Basic understanding\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Describe how far a magnetic field extends from a magnet. Does it have a definite edge? How does it change as you move away?')
    .setHelpText(
      'Include:\n' +
      '• Does the field extend in all directions?\n' +
      '• Does it have a sharp boundary or edge?\n' +
      '• How does field strength change with distance?'
    )
    .setRequired(true);

  // =========================================================================
  // SECTION B: FORCE RELATIONSHIPS (15 points)
  // =========================================================================
  form.addPageBreakItem()
    .setTitle('Section B: Force Relationships (15 pts)')
    .setHelpText('Questions about how magnetic force changes with distance.');

  // B1: Force-distance pattern (4 pts auto)
  const b1 = form.addMultipleChoiceItem()
    .setTitle('B1. When the distance between two magnets doubles, the magnetic force between them:')
    .setRequired(true);

  b1.setChoices([
    b1.createChoice('Decreases by more than half (approximately to 1/4)', true),
    b1.createChoice('Decreases by exactly half', false),
    b1.createChoice('Stays the same', false),
    b1.createChoice('Increases', false)
  ]);
  b1.setPoints(4);
  b1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Magnetic force follows an inverse relationship—doubling distance reduces force by approximately 4×, not 2×.')
      .build()
  );

  // B2: Graph shape (4 pts auto)
  const b2 = form.addMultipleChoiceItem()
    .setTitle('B2. A graph of magnetic force vs. distance would show:')
    .setRequired(true);

  b2.setChoices([
    b2.createChoice('A curved line that drops steeply at first, then levels off', true),
    b2.createChoice('A straight diagonal line', false),
    b2.createChoice('A straight horizontal line', false),
    b2.createChoice('A curve that goes up then down', false)
  ]);
  b2.setPoints(4);
  b2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! The inverse relationship produces a curve that drops rapidly at close distances and levels off (approaches zero) at large distances.')
      .build()
  );

  // B3: Application (7 pts manual)
  form.addSectionHeaderItem()
    .setTitle('B3. Apply the Force-Distance Relationship (7 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '7: Uses inverse relationship to explain why close = strong, far = weak, with example\n' +
      '5-6: Good explanation with reasoning\n' +
      '3-4: Mentions distance but incomplete reasoning\n' +
      '1-2: Vague response\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Explain why magnets on refrigerator doors only work when touching the fridge, but can\'t hold papers from 1 inch away. Use the force-distance relationship.')
    .setHelpText(
      'Consider:\n' +
      '• How strong is the force at contact (0 distance)?\n' +
      '• What happens to force at even 1 cm away?\n' +
      '• Is the weakened force enough to hold paper against gravity?'
    )
    .setRequired(true);

  // =========================================================================
  // SECTION C: ELECTROMAGNETISM (15 points)
  // =========================================================================
  form.addPageBreakItem()
    .setTitle('Section C: Electromagnetism (15 pts)')
    .setHelpText('Questions about electromagnets and induction from Week 2.');

  // C1: Electromagnet strength (4 pts auto)
  const c1 = form.addMultipleChoiceItem()
    .setTitle('C1. Which change would make an electromagnet STRONGER?')
    .setRequired(true);

  c1.setChoices([
    c1.createChoice('More coil turns, more current, AND an iron core', true),
    c1.createChoice('Fewer coil turns and an aluminum core', false),
    c1.createChoice('Less current and no core', false),
    c1.createChoice('Using thinner wire', false)
  ]);
  c1.setPoints(4);
  c1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! All three factors increase electromagnet strength: more turns concentrate the field, more current creates more field, and iron cores amplify the field.')
      .build()
  );

  // C2: Induction requirement (4 pts auto)
  const c2 = form.addMultipleChoiceItem()
    .setTitle('C2. Electromagnetic induction requires:')
    .setRequired(true);

  c2.setChoices([
    c2.createChoice('A CHANGING magnetic field (motion or varying current)', true),
    c2.createChoice('A constant, steady magnetic field', false),
    c2.createChoice('No magnetic field at all', false),
    c2.createChoice('Only permanent magnets, not electromagnets', false)
  ]);
  c2.setPoints(4);
  c2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Faraday discovered that it\'s the CHANGE in field that induces current. A stationary magnet in a coil produces no current.')
      .build()
  );

  // C3: Explanation (7 pts manual)
  form.addSectionHeaderItem()
    .setTitle('C3. Explain Electromagnetic Unification (7 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '7: Explains both directions (current→field AND changing field→current) with examples\n' +
      '5-6: Explains both directions with minor gaps\n' +
      '3-4: Explains one direction well\n' +
      '1-2: Basic understanding\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Explain how electricity and magnetism are unified. Describe what Oersted and Faraday each discovered, and how their discoveries are connected.')
    .setHelpText(
      'Include:\n' +
      '• What did Oersted discover about current and magnetic fields?\n' +
      '• What did Faraday discover about magnets and electric current?\n' +
      '• How do these discoveries show electricity and magnetism are connected?'
    )
    .setRequired(true);

  // =========================================================================
  // SECTION D: ENERGY TRANSFER (15 points)
  // =========================================================================
  form.addPageBreakItem()
    .setTitle('Section D: Energy Transfer (15 pts)')
    .setHelpText('Questions about energy transformation in EM systems.');

  // D1: Motor energy transformation (4 pts auto)
  const d1 = form.addMultipleChoiceItem()
    .setTitle('D1. In an electric motor, energy transforms from:')
    .setRequired(true);

  d1.setChoices([
    d1.createChoice('Electrical → magnetic field interaction → mechanical (motion)', true),
    d1.createChoice('Mechanical → electrical → heat', false),
    d1.createChoice('Light → electrical → sound', false),
    d1.createChoice('No transformation occurs', false)
  ]);
  d1.setPoints(4);
  d1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Battery provides electrical energy, which creates interacting magnetic fields, which produce rotational mechanical energy.')
      .build()
  );

  // D2: Generator energy transformation (4 pts auto)
  const d2 = form.addMultipleChoiceItem()
    .setTitle('D2. A generator converts:')
    .setRequired(true);

  d2.setChoices([
    d2.createChoice('Mechanical energy (motion) into electrical energy', true),
    d2.createChoice('Electrical energy into mechanical energy', false),
    d2.createChoice('Heat into light', false),
    d2.createChoice('Nothing—generators don\'t transform energy', false)
  ]);
  d2.setPoints(4);
  d2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Generators are the reverse of motors. Spinning motion creates changing magnetic fields in coils, which induces electric current.')
      .build()
  );

  // D3: Energy chain (7 pts manual)
  form.addSectionHeaderItem()
    .setTitle('D3. Trace an Energy Chain (7 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '7: Traces complete chain with all transformations: motion→induction→current→motor→motion\n' +
      '5-6: Good chain with minor gaps\n' +
      '3-4: Identifies key steps but incomplete\n' +
      '1-2: Basic understanding\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('A wind turbine generates electricity that powers an electric fan. Trace the complete energy transformation chain from the wind to the spinning fan blades.')
    .setHelpText(
      'Include these steps:\n' +
      '• What energy does the wind have?\n' +
      '• How does the turbine convert this to electricity?\n' +
      '• How does the fan motor convert electricity back to motion?'
    )
    .setRequired(true);

  logFormInfo_(form, 'G8 C6 W3 Cumulative', 60);
  return form;
}

// ============================================================================
// PART 3: MISCONCEPTION CHECK (20 points, ~20 min)
// Target persistent misconceptions from the cycle
// ============================================================================

function createG8C6W3Misconceptions_() {
  const form = FormApp.create('G8.C6.W3: Part 3 - Misconception Check');

  form.setDescription(
    'MISCONCEPTION CHECK\n\n' +
    'This assessment targets common misconceptions about electricity and magnetism.\n' +
    'Read each question carefully—some answers seem right but are actually wrong!\n\n' +
    '---\n' +
    'Time: About 20 minutes | Points: 20\n\n' +
    'These questions check for understanding, not just memorization.'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'CYCLE 6 COMPLETE! Congratulations!\n\n' +
    'You\'ve finished all assessments for Electricity & Magnetism.\n\n' +
    'Key takeaways:\n' +
    '• Magnetic fields extend through space and decrease with distance\n' +
    '• Electric current creates magnetic fields (electromagnets)\n' +
    '• Changing fields create current (induction)\n' +
    '• Motors and generators are reverse processes\n' +
    '• Electricity and magnetism are unified as electromagnetism'
  );

  // --- MISCONCEPTION 1: Magnets have unlimited strength ---
  form.addPageBreakItem()
    .setTitle('Misconception Check 1')
    .setHelpText('This targets the misconception that magnets have unlimited or constant strength.');

  // MC1a: True/False (3 pts auto)
  const mc1a = form.addMultipleChoiceItem()
    .setTitle('MC1a. TRUE or FALSE: A magnet\'s strength is the same no matter how far away you are from it.')
    .setRequired(true);

  mc1a.setChoices([
    mc1a.createChoice('FALSE - Magnetic field strength decreases rapidly with distance', true),
    mc1a.createChoice('TRUE - Magnets have constant strength everywhere', false)
  ]);
  mc1a.setPoints(3);
  mc1a.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Magnetic force follows an inverse relationship with distance. Double the distance = approximately 1/4 the force.')
      .build()
  );
  mc1a.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('MISCONCEPTION ALERT: Magnetic field strength decreases with distance. That\'s why magnets only pick up objects when very close.')
      .build()
  );

  // MC1b: Explanation (2 pts manual)
  form.addSectionHeaderItem()
    .setTitle('MC1b. Explain Why (2 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '2: Explains inverse relationship with specific example\n' +
      '1: Mentions decrease but no example\n' +
      '0: No response or incorrect'
    );

  form.addParagraphTextItem()
    .setTitle('Explain WHY magnets can pick up paper clips from 1 cm away but not from 10 cm away.')
    .setRequired(true);

  // --- MISCONCEPTION 2: Electricity is "used up" in devices ---
  form.addPageBreakItem()
    .setTitle('Misconception Check 2')
    .setHelpText('This targets the misconception that electricity is consumed rather than transformed.');

  // MC2a: Multiple choice (3 pts auto)
  const mc2a = form.addMultipleChoiceItem()
    .setTitle('MC2a. When a motor runs, what happens to the electrical energy it receives?')
    .setRequired(true);

  mc2a.setChoices([
    mc2a.createChoice('It\'s transformed into mechanical energy (motion) and some heat', true),
    mc2a.createChoice('It\'s used up and disappears', false),
    mc2a.createChoice('It\'s stored inside the motor', false),
    mc2a.createChoice('It becomes new electricity', false)
  ]);
  mc2a.setPoints(3);
  mc2a.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Energy is conserved—it transforms from one form to another. Electrical → magnetic field → mechanical motion (+ waste heat).')
      .build()
  );
  mc2a.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('MISCONCEPTION ALERT: Energy is never "used up"—it transforms. Conservation of energy means the total stays constant, just in different forms.')
      .build()
  );

  // MC2b: Diagram analysis (2 pts manual)
  form.addSectionHeaderItem()
    .setTitle('MC2b. Trace the Energy (2 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '2: Lists all transformations correctly (electrical→magnetic→mechanical+heat)\n' +
      '1: Partial list\n' +
      '0: Incorrect or no response'
    );

  form.addParagraphTextItem()
    .setTitle('List the energy transformations that occur when a battery powers a motor to spin a wheel.')
    .setHelpText('Format: _____ energy → _____ energy → _____ energy')
    .setRequired(true);

  // --- MISCONCEPTION 3: E&M are unrelated ---
  form.addPageBreakItem()
    .setTitle('Misconception Check 3')
    .setHelpText('This targets the misconception that electricity and magnetism are separate phenomena.');

  // MC3a: Evidence question (3 pts auto)
  const mc3a = form.addMultipleChoiceItem()
    .setTitle('MC3a. Which observation provides evidence that electricity and magnetism are connected?')
    .setRequired(true);

  mc3a.setChoices([
    mc3a.createChoice('All of these provide evidence of the connection', true),
    mc3a.createChoice('A compass deflects near a wire carrying current (Oersted)', false),
    mc3a.createChoice('Moving a magnet through a coil produces current (Faraday)', false),
    mc3a.createChoice('Electromagnets can be turned on/off with current', false)
  ]);
  mc3a.setPoints(3);
  mc3a.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! All three observations show the electricity-magnetism connection: current→field, changing field→current, and controllable magnetism.')
      .build()
  );
  mc3a.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('All three options are evidence! Oersted showed current makes fields, Faraday showed fields make current, and electromagnets combine both.')
      .build()
  );

  // MC3b: Synthesis (2 pts manual)
  form.addSectionHeaderItem()
    .setTitle('MC3b. Explain the Unity (2 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '2: Explains both directions (E→M and M→E) and that they\'re aspects of one phenomenon\n' +
      '1: Mentions connection but incomplete\n' +
      '0: No response or incorrect'
    );

  form.addParagraphTextItem()
    .setTitle('Explain in one sentence why scientists say electricity and magnetism are "unified" as electromagnetism.')
    .setRequired(true);

  // --- MISCONCEPTION 4: Only permanent magnets work ---
  form.addPageBreakItem()
    .setTitle('Misconception Check 4')
    .setHelpText('This targets the misconception that only permanent magnets can create magnetic effects.');

  // MC4a: Practical application (3 pts auto)
  const mc4a = form.addMultipleChoiceItem()
    .setTitle('MC4a. MRI machines, junkyard cranes, and maglev trains all use:')
    .setRequired(true);

  mc4a.setChoices([
    mc4a.createChoice('Electromagnets, because their strength can be controlled', true),
    mc4a.createChoice('Only permanent magnets', false),
    mc4a.createChoice('No magnets at all', false),
    mc4a.createChoice('Magnets that never turn off', false)
  ]);
  mc4a.setPoints(3);
  mc4a.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! These applications need controllable magnetic fields. Electromagnets can be turned on/off and adjusted—permanent magnets cannot.')
      .build()
  );
  mc4a.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Think about what these devices need: MRIs need precise field control, cranes need to release metal, maglev needs constant adjustment.')
      .build()
  );

  // MC4b: Advantage explanation (2 pts manual)
  form.addSectionHeaderItem()
    .setTitle('MC4b. Explain the Advantage (2 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '2: Explains controllability (on/off, variable strength)\n' +
      '1: Mentions one advantage but incomplete\n' +
      '0: No response or incorrect'
    );

  form.addParagraphTextItem()
    .setTitle('Why would a junkyard crane use an electromagnet instead of a permanent magnet to pick up cars?')
    .setRequired(true);

  logFormInfo_(form, 'G8 C6 W3 Misconceptions', 20);
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
function testG8C6W3Synthesis() { createG8C6W3Synthesis_(); }
function testG8C6W3Cumulative() { createG8C6W3Cumulative_(); }
function testG8C6W3Misconceptions() { createG8C6W3Misconceptions_(); }
