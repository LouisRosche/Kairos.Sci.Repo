/**
 * ============================================================================
 * GRADE 7 - CYCLE 1 WEEK 2: CELL SPECIALIZATION & TISSUES
 * 5 Forms | 100 Points Total | ~75 Minutes
 * ============================================================================
 *
 * NGSS ALIGNMENT:
 *   Primary: MS-LS1-2 - Develop and use a model to describe the function
 *            of a cell as a whole and ways the parts of cells contribute
 *            to the function.
 *   Building toward: MS-LS1-3 - Body systems as interacting subsystems
 *
 * 3-DIMENSIONAL LEARNING:
 *   SEP-2: Developing and Using Models
 *          ↳ Students model cell specialization and tissue organization
 *   DCI LS1.A: Structure and Function - Specialized cells have specific jobs
 *   CCC Structure & Function: Cell structure relates to specialized function
 *
 * LEARNING TARGETS:
 *   1. Explain that cells with the same DNA can become different types
 *   2. Identify how cell structure relates to specialized function
 *   3. Describe the hierarchy: cells → tissues → organs → systems
 *   4. Design a specialized cell for a specific function
 *
 * PHENOMENON: Why do different body parts look and act so differently
 *             if they all came from one cell?
 *
 * SPIRAL: Basic cell structure from Week 1
 *
 * ============================================================================
 */

// ============================================================================
// MAIN FUNCTION
// ============================================================================

function createAllG7C1W2Forms() {
  Logger.log('================================================');
  Logger.log('G7 CYCLE 1 WEEK 2: CELL SPECIALIZATION & TISSUES');
  Logger.log('================================================\n');

  const forms = {
    hook: createG7C1W2Hook_(),
    station1: createG7C1W2Station1_(),
    station2: createG7C1W2Station2_(),
    station3: createG7C1W2Station3_(),
    exitTicket: createG7C1W2ExitTicket_()
  };

  Logger.log('\n================================================');
  Logger.log('ALL 5 FORMS CREATED - 100 POINTS TOTAL');
  Logger.log('================================================');

  return forms;
}

// ============================================================================
// HOOK - SAME DNA, DIFFERENT JOBS (12 points + diagnostic, ~10 min)
// ============================================================================

function createG7C1W2Hook_() {
  const form = FormApp.create('G7.C1.W2: Hook - Same DNA, Different Jobs [12 pts]');

  form.setDescription(
    'SAME DNA, DIFFERENT JOBS\n\n' +
    'Look at these three images:\n' +
    '- A brain neuron (nerve cell) with long extensions\n' +
    '- A red blood cell (round disc shape, no nucleus)\n' +
    '- A muscle cell (long, striped fibers)\n\n' +
    'These three cells came from the SAME person.\n' +
    'They all have IDENTICAL DNA.\n\n' +
    'So why do they look completely different?\n' +
    'Why do they have different jobs?\n\n' +
    '---\n' +
    'Time: About 10 minutes | Points: 12 (+ 1 self-reflection)\n' +
    'Build on what you learned about cells last week!'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Hook submitted! You are ready for Station 1.\n\n' +
    'Next: Explore different specialized cells and discover what makes them unique.'
  );

  // Q1: Week 1 spiral - cell basics (3 pts - auto)
  form.addPageBreakItem()
    .setTitle('Part 1: Quick Review from Week 1')
    .setHelpText('Let\'s make sure you remember what you learned about cells.');

  const q1 = form.addMultipleChoiceItem()
    .setTitle('[SPIRAL - Week 1] What do ALL cells have in common?')
    .setRequired(true)
    .setPoints(3);

  q1.setChoices([
    q1.createChoice('Cell membrane, cytoplasm, and genetic material (DNA)', true),
    q1.createChoice('Cell wall, chloroplasts, and a nucleus', false),
    q1.createChoice('Only a nucleus - that\'s the only required part', false),
    q1.createChoice('Nothing - all cells are completely different', false)
  ]);

  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Great memory! All cells share these basic structures, even though they can look very different.')
      .build()
  );

  // Q2: Observation (3 pts - manual)
  form.addPageBreakItem()
    .setTitle('Part 2: New Observations')
    .setHelpText('Look carefully at the specialized cell images.');

  form.addSectionHeaderItem()
    .setTitle('Question 2 [3 points - teacher graded]')
    .setHelpText('RUBRIC:\n' +
      '3 pts: Describes 2+ structural differences with detail\n' +
      '2 pts: Notes basic differences\n' +
      '1 pt: Minimal observation');

  const q2 = form.addParagraphTextItem()
    .setTitle('Look at the neuron, red blood cell, and muscle cell images. What STRUCTURAL differences do you notice? (shape, size, features)')
    .setRequired(true);

  q2.setValidation(
    FormApp.createParagraphTextValidation()
      .requireTextLengthGreaterThanOrEqualTo(30)
      .build()
  );

  // Q3: Prediction (3 pts - manual)
  form.addSectionHeaderItem()
    .setTitle('Question 3 [3 points - teacher graded]')
    .setHelpText('RUBRIC:\n' +
      '3 pts: Logical prediction connecting structure to function\n' +
      '2 pts: Basic prediction\n' +
      '1 pt: Minimal');

  const q3 = form.addParagraphTextItem()
    .setTitle('Why do you think these cells have different shapes if they all have the same DNA? What\'s your hypothesis?')
    .setRequired(true);

  // Q4: Prior knowledge check (3 pts - auto)
  const q4 = form.addMultipleChoiceItem()
    .setTitle('Which statement best explains why cells with the same DNA can look different?')
    .setRequired(true)
    .setPoints(3);

  q4.setChoices([
    q4.createChoice('Different genes are turned "on" or "off" in different cells', true),
    q4.createChoice('The DNA changes as the cell develops', false),
    q4.createChoice('Different cells receive different DNA from parents', false),
    q4.createChoice('Cell shape is random and not related to DNA', false)
  ]);

  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Exactly! This is called GENE EXPRESSION - cells use chemical signals to "turn on" only the genes they need for their specific job.')
      .build()
  );

  q4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Think about it: if DNA changed, how would your body make new copies of the same type of cell? The secret is GENE EXPRESSION - turning genes on/off without changing the DNA.')
      .build()
  );

  // Q5: Confidence (0 pts)
  form.addScaleItem()
    .setTitle('How confident are you about understanding cell specialization?')
    .setHelpText('FOR REFLECTION ONLY - does NOT affect your grade.')
    .setBounds(1, 5)
    .setLabels('Not confident', 'Very confident');

  Logger.log('Hook created: ' + form.getEditUrl());
  return { form: form, editUrl: form.getEditUrl(), publishedUrl: form.getPublishedUrl() };
}

// ============================================================================
// STATION 1 - CELL TYPE INVESTIGATION (20 points, ~18 min)
// ============================================================================

function createG7C1W2Station1_() {
  const form = FormApp.create('G7.C1.W2: Station 1 - Cell Type Investigation [20 pts]');

  form.setDescription(
    'CELL TYPE INVESTIGATION\n\n' +
    'Resource: Virtual histology slides showing specialized cells\n\n' +
    'Explore these specialized human cells:\n' +
    '- Neurons (nerve cells) - for sending signals\n' +
    '- Red blood cells - for carrying oxygen\n' +
    '- White blood cells - for fighting disease\n' +
    '- Muscle cells - for movement\n' +
    '- Epithelial cells - for protection/lining\n' +
    '- Fat cells - for energy storage\n\n' +
    '---\n' +
    'Time: About 18 minutes | Points: 20\n' +
    'Focus: Connect cell STRUCTURE to cell FUNCTION'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Station 1 complete! Move to Station 2.\n\n' +
    'Next: Learn how cells organize into tissues, organs, and systems.'
  );

  // Q1: Neuron structure-function (4 pts - auto)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('Neurons have LONG extensions (axons) that can be over a meter long. How does this structure help their function?')
    .setRequired(true)
    .setPoints(4);

  q1.setChoices([
    q1.createChoice('Long extensions allow signals to travel quickly across long distances in the body', true),
    q1.createChoice('Long extensions help neurons absorb more nutrients', false),
    q1.createChoice('Long extensions store more DNA for the cell', false),
    q1.createChoice('The length is random and has no purpose', false)
  ]);

  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Neurons need to send electrical signals from your brain to your toes - that\'s why they have long axons. Structure matches function!')
      .build()
  );

  // Q2: Red blood cell structure (4 pts - auto)
  const q2 = form.addMultipleChoiceItem()
    .setTitle('Red blood cells are shaped like flattened discs AND have NO nucleus. How do both of these features help with carrying oxygen?')
    .setRequired(true)
    .setPoints(4);

  q2.setChoices([
    q2.createChoice('More surface area for oxygen + more room inside for hemoglobin', true),
    q2.createChoice('The flat shape helps them move faster', false),
    q2.createChoice('They lost their nucleus due to a mutation', false),
    q2.createChoice('Red blood cells don\'t actually carry oxygen', false)
  ]);

  q2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Excellent! The disc shape increases surface area for gas exchange, and removing the nucleus makes more room for hemoglobin (the oxygen-carrying protein). Perfect example of structure-function!')
      .build()
  );

  // Q3: Structure-function analysis (5 pts - manual)
  form.addSectionHeaderItem()
    .setTitle('Question 3 [5 points - teacher graded]')
    .setHelpText('RUBRIC:\n' +
      '5 pts: Describes structure + explains HOW it helps function + uses specific example\n' +
      '4 pts: Structure and function connected with reasoning\n' +
      '3 pts: Basic structure-function connection\n' +
      '2-1 pts: Incomplete');

  const q3 = form.addParagraphTextItem()
    .setTitle('Choose ONE specialized cell type (muscle, fat, white blood cell, or epithelial). Describe its structure and explain HOW that structure helps it do its job.')
    .setRequired(true);

  q3.setValidation(
    FormApp.createParagraphTextValidation()
      .requireTextLengthGreaterThanOrEqualTo(50)
      .build()
  );

  // Q4: Spiral - organelle function (4 pts - auto)
  const q4 = form.addMultipleChoiceItem()
    .setTitle('[SPIRAL - Week 1] Muscle cells need A LOT of energy. Which organelle would you expect them to have many of?')
    .setRequired(true)
    .setPoints(4);

  q4.setChoices([
    q4.createChoice('Mitochondria - the "powerhouse" that makes ATP energy', true),
    q4.createChoice('Nucleus - the control center', false),
    q4.createChoice('Cell membrane - the boundary', false),
    q4.createChoice('Ribosomes - the protein makers', false)
  ]);

  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Great connection! Muscle cells can have THOUSANDS of mitochondria because they need so much energy for movement.')
      .build()
  );

  // Q5: Reflection (3 pts - manual)
  form.addSectionHeaderItem()
    .setTitle('Question 5 [3 points - teacher graded]');

  const q5 = form.addParagraphTextItem()
    .setTitle('What pattern do you notice about specialized cells? How does structure relate to function?')
    .setRequired(true);

  // Q6: Self-assessment (0 pts)
  form.addScaleItem()
    .setTitle('How well do you understand how cell structure relates to function?')
    .setHelpText('FOR REFLECTION ONLY')
    .setBounds(1, 5)
    .setLabels('Still confused', 'I get it!');

  Logger.log('Station 1 created: ' + form.getEditUrl());
  return { form: form, editUrl: form.getEditUrl(), publishedUrl: form.getPublishedUrl() };
}

// ============================================================================
// STATION 2 - TISSUE ORGANIZATION (20 points, ~15 min)
// ============================================================================

function createG7C1W2Station2_() {
  const form = FormApp.create('G7.C1.W2: Station 2 - Tissue Organization [20 pts]');

  form.setDescription(
    'TISSUE ORGANIZATION\n\n' +
    'Resource: Organization hierarchy diagram and tissue type cards\n\n' +
    'Learn the levels of organization:\n' +
    'CELLS → TISSUES → ORGANS → ORGAN SYSTEMS → ORGANISM\n\n' +
    'Four main tissue types:\n' +
    '1. Epithelial (covering/lining)\n' +
    '2. Connective (support/connect)\n' +
    '3. Muscle (movement)\n' +
    '4. Nervous (communication)\n\n' +
    '---\n' +
    'Time: About 15 minutes | Points: 20\n' +
    'Focus: How cells organize into tissues and organs'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Station 2 complete! Move to Station 3.\n\n' +
    'Next: Design your own specialized cell!'
  );

  // Q1: Organization levels (4 pts - auto)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('Put these in order from SMALLEST to LARGEST: tissue, organ system, cell, organ, organism')
    .setRequired(true)
    .setPoints(4);

  q1.setChoices([
    q1.createChoice('Cell → Tissue → Organ → Organ System → Organism', true),
    q1.createChoice('Tissue → Cell → Organ → Organ System → Organism', false),
    q1.createChoice('Organ → Tissue → Cell → Organ System → Organism', false),
    q1.createChoice('Cell → Organ → Tissue → Organ System → Organism', false)
  ]);

  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Cells are the building blocks. Similar cells form tissues. Different tissues form organs. Organs work together in systems. All systems make up the organism (you!).')
      .build()
  );

  // Q2: Tissue type identification (4 pts - auto)
  const q2 = form.addMultipleChoiceItem()
    .setTitle('The tissue that lines your mouth, covers your skin, and lines your intestines is called:')
    .setRequired(true)
    .setPoints(4);

  q2.setChoices([
    q2.createChoice('Epithelial tissue - it covers and lines surfaces', true),
    q2.createChoice('Connective tissue - it connects things', false),
    q2.createChoice('Muscle tissue - it moves things', false),
    q2.createChoice('Nervous tissue - it sends signals', false)
  ]);

  // Q3: Organ composition (4 pts - auto)
  const q3 = form.addMultipleChoiceItem()
    .setTitle('The heart is an ORGAN. Which statement is TRUE about the heart?')
    .setRequired(true)
    .setPoints(4);

  q3.setChoices([
    q3.createChoice('The heart contains multiple tissue types (muscle, connective, nervous, epithelial)', true),
    q3.createChoice('The heart is made of only one type of cell', false),
    q3.createChoice('The heart is a tissue, not an organ', false),
    q3.createChoice('The heart does not contain nervous tissue', false)
  ]);

  q3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Exactly! Organs are made of MULTIPLE tissue types working together. The heart has muscle tissue (to pump), nervous tissue (to control rhythm), connective tissue (for structure), and epithelial tissue (lining blood vessels).')
      .build()
  );

  // Q4: Application (5 pts - manual)
  form.addSectionHeaderItem()
    .setTitle('Question 4 [5 points - teacher graded]')
    .setHelpText('RUBRIC:\n' +
      '5 pts: Identifies all levels correctly with specific tissue types\n' +
      '4 pts: Most levels correct\n' +
      '3 pts: Basic understanding shown\n' +
      '2-1 pts: Incomplete');

  const q4 = form.addParagraphTextItem()
    .setTitle('Trace the organization from a MUSCLE CELL up to the WHOLE BODY. Name each level and give an example. (Cell → Tissue → Organ → System → Organism)')
    .setRequired(true);

  q4.setValidation(
    FormApp.createParagraphTextValidation()
      .requireTextLengthGreaterThanOrEqualTo(50)
      .build()
  );

  // Q5: Why multiple tissues? (3 pts - manual)
  form.addSectionHeaderItem()
    .setTitle('Question 5 [3 points - teacher graded]');

  const q5 = form.addParagraphTextItem()
    .setTitle('Why do organs need MULTIPLE types of tissues? Why can\'t they be made of just one type?')
    .setRequired(true);

  Logger.log('Station 2 created: ' + form.getEditUrl());
  return { form: form, editUrl: form.getEditUrl(), publishedUrl: form.getPublishedUrl() };
}

// ============================================================================
// STATION 3 - DESIGN A SPECIALIZED CELL (25 points, ~20 min)
// ============================================================================

function createG7C1W2Station3_() {
  const form = FormApp.create('G7.C1.W2: Station 3 - Design a Specialized Cell [25 pts]');

  form.setDescription(
    'DESIGN A SPECIALIZED CELL\n\n' +
    'Challenge: You are a cell engineer! Design a specialized cell\n' +
    'for a specific job in the body.\n\n' +
    'Choose ONE job for your cell:\n' +
    'A) A cell that absorbs nutrients from food (intestine)\n' +
    'B) A cell that detects light (eye)\n' +
    'C) A cell that produces a hormone (gland)\n' +
    'D) A cell that fights bacteria (immune system)\n\n' +
    'Your design must explain HOW the structure helps the function!\n\n' +
    '---\n' +
    'Time: About 20 minutes | Points: 25\n' +
    'Focus: Apply structure-function to cell design'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Station 3 complete! You have finished all stations.\n\n' +
    'Final step: Complete the Exit Ticket to show what you learned today.'
  );

  // Q1: Choose your cell job (5 pts - manual)
  form.addSectionHeaderItem()
    .setTitle('Question 1 [5 points - teacher graded]')
    .setHelpText('RUBRIC:\n' +
      '5 pts: Clear job choice + explains requirements in detail\n' +
      '4 pts: Good explanation of requirements\n' +
      '3 pts: Basic understanding\n' +
      '2-1 pts: Incomplete');

  const q1 = form.addParagraphTextItem()
    .setTitle('Which cell job did you choose (A, B, C, or D)? What does this cell need to be able to DO? List at least 3 requirements.')
    .setHelpText('Example: "I chose B (light detection). This cell needs to: 1) detect light, 2) send signals to the brain, 3) work with other cells in the eye..."')
    .setRequired(true);

  // Q2: Cell shape design (5 pts - manual)
  form.addSectionHeaderItem()
    .setTitle('Question 2 [5 points - teacher graded]')
    .setHelpText('RUBRIC:\n' +
      '5 pts: Describes shape + explains WHY this shape helps function\n' +
      '4 pts: Shape with reasoning\n' +
      '3 pts: Shape described\n' +
      '2-1 pts: Incomplete');

  const q2 = form.addParagraphTextItem()
    .setTitle('What SHAPE will your cell be? Explain HOW this shape helps your cell do its job.')
    .setHelpText('Think: long and thin? round? flat? with extensions? Why?')
    .setRequired(true);

  // Q3: Organelle selection (5 pts - manual)
  form.addSectionHeaderItem()
    .setTitle('Question 3 [5 points - teacher graded]')
    .setHelpText('RUBRIC:\n' +
      '5 pts: 2+ organelles named + explains why MORE of each\n' +
      '4 pts: Organelles with reasoning\n' +
      '3 pts: Organelles mentioned\n' +
      '2-1 pts: Incomplete');

  const q3 = form.addParagraphTextItem()
    .setTitle('Which organelles would your cell need MORE of than a typical cell? Why? (Think: energy needs, protein production, etc.)')
    .setRequired(true);

  // Q4: Special features (5 pts - manual)
  form.addSectionHeaderItem()
    .setTitle('Question 4 [5 points - teacher graded]')
    .setHelpText('RUBRIC:\n' +
      '5 pts: Creative feature + explains function connection\n' +
      '4 pts: Good feature with reasoning\n' +
      '3 pts: Feature described\n' +
      '2-1 pts: Incomplete');

  const q4 = form.addParagraphTextItem()
    .setTitle('What SPECIAL FEATURE would your cell have that typical cells don\'t? How would this help it do its job?')
    .setHelpText('Example: Intestinal cells have finger-like projections (villi) to increase surface area for absorption.')
    .setRequired(true);

  // Q5: Model limitation (5 pts - manual)
  form.addSectionHeaderItem()
    .setTitle('Question 5 [5 points - teacher graded]')
    .setHelpText('RUBRIC:\n' +
      '5 pts: Identifies specific limitation + explains what\'s missing\n' +
      '4 pts: Good limitation identified\n' +
      '3 pts: Basic limitation\n' +
      '2-1 pts: Vague response');

  const q5 = form.addParagraphTextItem()
    .setTitle('What is ONE thing your design cannot show about how real specialized cells work?')
    .setRequired(true);

  Logger.log('Station 3 created: ' + form.getEditUrl());
  return { form: form, editUrl: form.getEditUrl(), publishedUrl: form.getPublishedUrl() };
}

// ============================================================================
// EXIT TICKET - SPECIALIZATION INTEGRATION (23 points, ~15 min)
// Structure: 3 NEW + 2 SPIRAL + 1 INTEGRATION + 1 SEP-1 (23 pts)
// ============================================================================

function createG7C1W2ExitTicket_() {
  const form = FormApp.create('G7.C1.W2: Exit Ticket - Specialization Integration [23 pts]');

  form.setDescription(
    'EXIT TICKET: SPECIALIZATION INTEGRATION\n\n' +
    'Show what you learned about cell specialization and tissue organization!\n\n' +
    'This Exit Ticket covers:\n' +
    '- How cells with same DNA become different types\n' +
    '- Structure-function relationships\n' +
    '- Levels of organization (cells → tissues → organs → systems)\n\n' +
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
    'Exit Ticket submitted! Great work on Week 2!\n\n' +
    'Next week: How do cells communicate? Gene expression and cell signaling!'
  );

  // NEW CONTENT
  form.addPageBreakItem()
    .setTitle('[NEW CONTENT] Today\'s Learning')
    .setHelpText('Questions about cell specialization and organization.');

  // Q1: Gene expression concept (4 pts - auto)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('[NEW] A muscle cell and a neuron in your body have:')
    .setRequired(true)
    .setPoints(4);

  q1.setChoices([
    q1.createChoice('The same DNA but different genes are "turned on"', true),
    q1.createChoice('Different DNA from each other', false),
    q1.createChoice('No DNA at all', false),
    q1.createChoice('The same genes turned on', false)
  ]);

  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! This is GENE EXPRESSION - all your cells have identical DNA, but different genes are activated in different cell types.')
      .build()
  );

  // Q2: Structure-function (4 pts - manual)
  form.addSectionHeaderItem()
    .setTitle('[NEW] Question 2 [4 points - teacher graded]');

  const q2 = form.addParagraphTextItem()
    .setTitle('Explain why red blood cells are shaped like flat discs AND have no nucleus. How do BOTH features help their function?')
    .setRequired(true);

  // Q3: Organization levels (4 pts - auto)
  const q3 = form.addMultipleChoiceItem()
    .setTitle('[NEW] Which is the correct sequence of organization?')
    .setRequired(true)
    .setPoints(4);

  q3.setChoices([
    q3.createChoice('Cells → Tissues → Organs → Organ Systems → Organism', true),
    q3.createChoice('Tissues → Cells → Organs → Organ Systems → Organism', false),
    q3.createChoice('Organs → Tissues → Cells → Organ Systems → Organism', false),
    q3.createChoice('Cells → Organs → Tissues → Organ Systems → Organism', false)
  ]);

  // SPIRAL
  form.addPageBreakItem()
    .setTitle('[SPIRAL] Review from Week 1')
    .setHelpText('Let\'s check your understanding from last week.');

  // Q4: Spiral - cell structures (3 pts - auto)
  const q4 = form.addMultipleChoiceItem()
    .setTitle('[SPIRAL - W1] Which organelle produces energy (ATP) for the cell?')
    .setRequired(true)
    .setPoints(3);

  q4.setChoices([
    q4.createChoice('Mitochondria', true),
    q4.createChoice('Nucleus', false),
    q4.createChoice('Cell membrane', false),
    q4.createChoice('Ribosome', false)
  ]);

  // Q5: Spiral - cell basics (3 pts - auto)
  const q5 = form.addMultipleChoiceItem()
    .setTitle('[SPIRAL - W1] Plant cells have TWO structures that animal cells do NOT have:')
    .setRequired(true)
    .setPoints(3);

  q5.setChoices([
    q5.createChoice('Cell wall and chloroplasts', true),
    q5.createChoice('Nucleus and mitochondria', false),
    q5.createChoice('Cell membrane and cytoplasm', false),
    q5.createChoice('Ribosomes and DNA', false)
  ]);

  // INTEGRATION
  form.addPageBreakItem()
    .setTitle('[INTEGRATION] Connecting Ideas');

  // Q6: Integration (4 pts - manual)
  form.addSectionHeaderItem()
    .setTitle('[INTEGRATION] Question 6 [4 points - teacher graded]');

  const q6 = form.addParagraphTextItem()
    .setTitle('Connect Week 1 and Week 2: How does the structure of ORGANELLES inside a cell relate to the structure of the WHOLE CELL and its specialized function?')
    .setHelpText('Example: A muscle cell has many mitochondria (organelle) AND long fibers (cell structure) - how do both help the cell function?')
    .setRequired(true);

  // SEP-1
  form.addPageBreakItem()
    .setTitle('[SEP-1] Asking Scientific Questions');

  // Q7: Question generator (1 pt - manual)
  form.addSectionHeaderItem()
    .setTitle('[SEP-1] Question 7 [1 point - teacher graded]');

  const q7 = form.addParagraphTextItem()
    .setTitle('Write 1 scientific question you have about how cells become specialized. Use "How does..." or "Why do..."')
    .setRequired(true);

  Logger.log('Exit Ticket created: ' + form.getEditUrl());
  return { form: form, editUrl: form.getEditUrl(), publishedUrl: form.getPublishedUrl() };
}

// ============================================================================
// UTILITY
// ============================================================================

function deployG7C1W2() {
  Logger.log('Starting G7 Cycle 1 Week 2 deployment...\n');
  const results = createAllG7C1W2Forms();
  Logger.log('\n=== DEPLOYMENT COMPLETE ===');
  return results;
}
