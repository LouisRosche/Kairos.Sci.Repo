/**
 * ============================================================================
 * GRADE 7 - CYCLE 1 WEEK 1: INTRODUCTION TO CELLS
 * 5 Forms | 100 Points Total | ~75 Minutes
 * ============================================================================
 *
 * NGSS ALIGNMENT:
 *   Primary: MS-LS1-1 - Conduct an investigation to provide evidence that
 *            living things are made of cells; either one cell or many
 *            different numbers and types of cells.
 *   Primary: MS-LS1-2 - Develop and use a model to describe the function
 *            of a cell as a whole and ways the parts of cells contribute
 *            to the function.
 *
 * 3-DIMENSIONAL LEARNING:
 *   SEP-3: Planning and Carrying Out Investigations
 *          ↳ Students investigate cell structures across organisms
 *   SEP-2: Developing and Using Models
 *          ↳ Students create cell models with functional analogies
 *   DCI LS1.A: Structure and Function - Cell parts have specific functions
 *   CCC Structure & Function: Cell structure relates to cell function
 *
 * LEARNING TARGETS:
 *   1. Explain that all living things are made of cells
 *   2. Identify major cell organelles and their functions
 *   3. Compare plant and animal cell structures
 *   4. Create a functional analogy model for a cell
 *
 * PHENOMENON: How can a single cell become a whole human being?
 *
 * FORMS:
 *   1. Hook - The One Cell Wonder (12 pts + diagnostic, ~10 min)
 *   2. Station 1 - Cell Discovery Lab (20 pts, ~18 min)
 *   3. Station 2 - Cell Structure Investigation (20 pts, ~15 min)
 *   4. Station 3 - Design a Cell Model (25 pts, ~20 min)
 *   5. Exit Ticket - Cell Basics Integration (23 pts, ~15 min)
 *
 * ============================================================================
 * NOTE: This is Week 1 of Cycle 1 - the FOUNDATION cycle.
 * No spiral questions yet - establishing baseline knowledge.
 * Exit Ticket: 4 NEW + 1 INTEGRATION + 1 SEP-1
 * ============================================================================
 */

// ============================================================================
// MAIN FUNCTION
// ============================================================================

function createAllG7C1W1Forms() {
  Logger.log('================================================');
  Logger.log('G7 CYCLE 1 WEEK 1: INTRODUCTION TO CELLS');
  Logger.log('================================================\n');

  const forms = {
    hook: createG7C1W1Hook_(),
    station1: createG7C1W1Station1_(),
    station2: createG7C1W1Station2_(),
    station3: createG7C1W1Station3_(),
    exitTicket: createG7C1W1ExitTicket_()
  };

  Logger.log('\n================================================');
  Logger.log('ALL 5 FORMS CREATED - 100 POINTS TOTAL');
  Logger.log('================================================');

  return forms;
}

// ============================================================================
// HOOK - THE ONE CELL WONDER (12 points + diagnostic, ~10 min)
// ============================================================================

function createG7C1W1Hook_() {
  const form = FormApp.create('G7.C1.W1: Hook - The One Cell Wonder [12 pts]');

  form.setDescription(
    'THE ONE CELL WONDER\n\n' +
    'You started as a single cell - smaller than a period at the end of a sentence.\n' +
    'Now you have over 37 TRILLION cells!\n\n' +
    'Watch the video showing how a single fertilized egg cell divides and\n' +
    'eventually becomes a complete human baby.\n\n' +
    'How is this possible? How can ONE tiny cell become trillions of cells\n' +
    'that work together to make you?\n\n' +
    '---\n' +
    'Time: About 10 minutes | Points: 12 (+ 1 self-reflection question)\n' +
    'This is CYCLE 1 - We are building your foundation knowledge!'
  );

  // Quiz and response settings
  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Hook submitted! You are ready for Station 1.\n\n' +
    'Next: Use the PhET simulation to explore cells and their structures.\n' +
    'Resource: Virtual microscope images of different cell types'
  );

  // --- PART 1: PRIOR KNOWLEDGE ---
  form.addPageBreakItem()
    .setTitle('Part 1: What You Already Know')
    .setHelpText('Tell us what you already know about cells. There are no wrong answers here!');

  // Q1: Prior knowledge (3 pts - manual grading)
  form.addSectionHeaderItem()
    .setTitle('Question 1 [3 points - teacher graded]')
    .setHelpText('RUBRIC:\n• 3 pts: Mentions cells as building blocks + gives example\n• 2 pts: Basic understanding of cells\n• 1 pt: Minimal response\n• 0 pts: No response or off-topic');

  const q1 = form.addParagraphTextItem()
    .setTitle('What do you already know about cells? What are cells and why do living things need them?')
    .setHelpText('Share anything you know - from other classes, TV, books, or life experience.')
    .setRequired(true);

  q1.setValidation(
    FormApp.createParagraphTextValidation()
      .requireTextLengthGreaterThanOrEqualTo(20)
      .build()
  );

  // Q2: Observation (3 pts - manual grading)
  form.addSectionHeaderItem()
    .setTitle('Question 2 [3 points - teacher graded]')
    .setHelpText('RUBRIC:\n• 3 pts: Detailed observation + curiosity question\n• 2 pts: Basic observation\n• 1 pt: Minimal response\n• 0 pts: No response');

  const q2 = form.addParagraphTextItem()
    .setTitle('Watch the cell division video. Describe what you see happening. What questions come to mind?')
    .setHelpText('Describe the process you observe. What makes you curious?')
    .setRequired(true);

  q2.setValidation(
    FormApp.createParagraphTextValidation()
      .requireTextLengthGreaterThanOrEqualTo(30)
      .build()
  );

  // --- PART 2: INITIAL PREDICTIONS ---
  form.addPageBreakItem()
    .setTitle('Part 2: Your Predictions')
    .setHelpText('Make your best guesses based on what you observed.');

  // Q3: Prediction about cell division (3 pts - manual grading)
  form.addSectionHeaderItem()
    .setTitle('Question 3 [3 points - teacher graded]')
    .setHelpText('RUBRIC:\n• 3 pts: Logical prediction with reasoning\n• 2 pts: Reasonable prediction, limited reasoning\n• 1 pt: Prediction only, no reasoning\n• 0 pts: No response');

  const q3 = form.addParagraphTextItem()
    .setTitle('How do you think a single cell "knows" how to divide and eventually create different types of cells (brain cells, muscle cells, skin cells)?')
    .setHelpText('This is your hypothesis - explain your thinking.')
    .setRequired(true);

  // Q4: Prior concept check (3 pts - auto-graded)
  const q4 = form.addMultipleChoiceItem()
    .setTitle('Which of the following is TRUE about living things and cells?')
    .setHelpText('Select the best answer based on what you know.')
    .setRequired(true)
    .setPoints(3);

  q4.setChoices([
    q4.createChoice('All living things are made of cells', true),
    q4.createChoice('Only animals have cells; plants do not', false),
    q4.createChoice('Cells are only found in large organisms like humans', false),
    q4.createChoice('Cells are a type of tiny animal that lives inside us', false)
  ]);

  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! This is one of the fundamental principles of biology - the Cell Theory states that ALL living things are made of cells.')
      .build()
  );

  q4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Not quite. The Cell Theory states that ALL living things - plants, animals, fungi, bacteria - are made of cells. Even tiny bacteria are cells!')
      .build()
  );

  // Q5: Confidence (0 pts - diagnostic only)
  const q5 = form.addScaleItem()
    .setTitle('How confident are you about your knowledge of cells right now?')
    .setHelpText('FOR REFLECTION ONLY - This does NOT affect your grade. Be honest!')
    .setBounds(1, 5)
    .setLabels('Not confident at all', 'Very confident');

  Logger.log('Hook created: ' + form.getEditUrl());
  return { form: form, editUrl: form.getEditUrl(), publishedUrl: form.getPublishedUrl() };
}

// ============================================================================
// STATION 1 - CELL DISCOVERY LAB (20 points, ~18 min)
// ============================================================================

function createG7C1W1Station1_() {
  const form = FormApp.create('G7.C1.W1: Station 1 - Cell Discovery Lab [20 pts]');

  form.setDescription(
    'CELL DISCOVERY LAB\n\n' +
    'Resource: Virtual microscope images showing cells from different organisms\n' +
    '- Onion skin cells (plant)\n' +
    '- Cheek cells (animal/human)\n' +
    '- Bacteria cells\n' +
    '- Single-celled organisms (paramecium, amoeba)\n\n' +
    'Your Mission: Observe cells from different organisms and identify what they have in common.\n\n' +
    '---\n' +
    'Time: About 18 minutes | Points: 20\n' +
    'Focus: Observe cell structures and compare across organisms'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Station 1 complete! Move to Station 2.\n\n' +
    'Next: Dive deeper into cell structures and their functions.'
  );

  // Q1: Observation comparison (4 pts - auto-graded)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('Looking at the virtual microscope images, which structure do ALL cells have in common?')
    .setHelpText('Compare the onion cell, cheek cell, and bacteria cell.')
    .setRequired(true)
    .setPoints(4);

  q1.setChoices([
    q1.createChoice('A cell membrane (outer boundary)', true),
    q1.createChoice('A nucleus (control center)', false),
    q1.createChoice('Chloroplasts (green organelles)', false),
    q1.createChoice('A cell wall (rigid outer layer)', false)
  ]);

  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Excellent! ALL cells have a cell membrane that separates the inside of the cell from the outside. Not all cells have a nucleus (bacteria don\'t) or chloroplasts (only plants).')
      .build()
  );

  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Look again at the bacteria cell - it doesn\'t have a nucleus! The only structure that ALL cells share is the cell membrane, which acts as the boundary between the cell and its environment.')
      .build()
  );

  // Q2: Plant vs Animal (4 pts - auto-graded)
  const q2 = form.addMultipleChoiceItem()
    .setTitle('What structure do you see in the ONION cell that is NOT in the CHEEK cell?')
    .setHelpText('Compare the plant cell (onion) to the animal cell (cheek).')
    .setRequired(true)
    .setPoints(4);

  q2.setChoices([
    q2.createChoice('Cell wall - a rigid outer layer', true),
    q2.createChoice('Cell membrane - a flexible boundary', false),
    q2.createChoice('Cytoplasm - the gel-like interior', false),
    q2.createChoice('Genetic material - DNA', false)
  ]);

  q2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Plant cells have a rigid CELL WALL outside their cell membrane. Animal cells only have the flexible cell membrane. This is why plants can stand upright!')
      .build()
  );

  q2.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Both plant and animal cells have cell membranes, cytoplasm, and DNA. The key difference is that plant cells have a CELL WALL - a rigid structure outside the membrane that animal cells lack.')
      .build()
  );

  // Q3: Reasoning about cell parts (5 pts - manual grading)
  form.addSectionHeaderItem()
    .setTitle('Question 3 [5 points - teacher graded]')
    .setHelpText('RUBRIC:\n• 5 pts: Identifies structure + explains function + makes connection\n• 4 pts: Identifies structure + explains function\n• 3 pts: Basic identification and function\n• 2 pts: Partial understanding\n• 1 pt: Minimal response\n• 0 pts: No response');

  const q3 = form.addParagraphTextItem()
    .setTitle('Look at the paramecium (single-celled organism). It can move, eat, and respond to its environment - all with just ONE cell. How do you think one cell can do all these jobs?')
    .setHelpText('Think about what parts the cell might need to accomplish these tasks.')
    .setRequired(true);

  q3.setValidation(
    FormApp.createParagraphTextValidation()
      .requireTextLengthGreaterThanOrEqualTo(50)
      .build()
  );

  // Q4: Cell size concept (4 pts - auto-graded)
  const q4 = form.addMultipleChoiceItem()
    .setTitle('Why do you think cells are so small that we need a microscope to see them?')
    .setHelpText('Think about how materials get in and out of cells.')
    .setRequired(true)
    .setPoints(4);

  q4.setChoices([
    q4.createChoice('Small cells can exchange materials (food, oxygen, waste) more efficiently', true),
    q4.createChoice('Cells are small because there is not enough material to make them bigger', false),
    q4.createChoice('Cells are small so they can hide from diseases', false),
    q4.createChoice('Cells used to be big but evolved to be small over time', false)
  ]);

  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Exactly! Small cells have more surface area relative to their volume, which means nutrients can get in and waste can get out more efficiently. This is called the surface area to volume ratio!')
      .build()
  );

  // Q5: Reflection (3 pts - manual grading)
  form.addSectionHeaderItem()
    .setTitle('Question 5 [3 points - teacher graded]')
    .setHelpText('RUBRIC:\n• 3 pts: Specific discovery + why it surprised them\n• 2 pts: Basic response\n• 1 pt: Minimal response\n• 0 pts: No response');

  const q5 = form.addParagraphTextItem()
    .setTitle('What surprised you most about cells from your observations? Why?')
    .setRequired(true);

  // Q6: Self-assessment (0 pts - diagnostic)
  form.addScaleItem()
    .setTitle('How well do you understand that all living things are made of cells?')
    .setHelpText('FOR REFLECTION ONLY - does NOT affect your grade.')
    .setBounds(1, 5)
    .setLabels('Still confused', 'I get it!');

  Logger.log('Station 1 created: ' + form.getEditUrl());
  return { form: form, editUrl: form.getEditUrl(), publishedUrl: form.getPublishedUrl() };
}

// ============================================================================
// STATION 2 - CELL STRUCTURE INVESTIGATION (20 points, ~15 min)
// ============================================================================

function createG7C1W1Station2_() {
  const form = FormApp.create('G7.C1.W1: Station 2 - Cell Structure Investigation [20 pts]');

  form.setDescription(
    'CELL STRUCTURE INVESTIGATION\n\n' +
    'Resource: Interactive cell diagram with clickable organelles\n' +
    'Each organelle shows its name and function when you click it.\n\n' +
    'Key organelles to explore:\n' +
    '- Nucleus (control center with DNA)\n' +
    '- Mitochondria (energy producers)\n' +
    '- Ribosomes (protein makers)\n' +
    '- Cell membrane (boundary)\n' +
    '- Cytoplasm (gel that holds everything)\n\n' +
    '---\n' +
    'Time: About 15 minutes | Points: 20\n' +
    'Focus: Learn what each cell part does'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Station 2 complete! Move to Station 3.\n\n' +
    'Next: Design your own cell model using an analogy!'
  );

  // Q1: Nucleus function (4 pts - auto-graded)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('The NUCLEUS contains the cell\'s DNA. What is the main job of the nucleus?')
    .setRequired(true)
    .setPoints(4);

  q1.setChoices([
    q1.createChoice('Control center - stores instructions and controls cell activities', true),
    q1.createChoice('Energy producer - makes energy for the cell', false),
    q1.createChoice('Protein maker - builds proteins', false),
    q1.createChoice('Waste remover - gets rid of cell waste', false)
  ]);

  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! The nucleus is like the "brain" or "control center" of the cell. It contains DNA, which has the instructions for everything the cell does.')
      .build()
  );

  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('The nucleus contains DNA - the instruction manual for the cell. Think of it as the "control center" or "brain" that tells all the other parts what to do.')
      .build()
  );

  // Q2: Mitochondria function (4 pts - auto-graded)
  const q2 = form.addMultipleChoiceItem()
    .setTitle('The MITOCHONDRIA are often called the "powerhouse of the cell." What do they do?')
    .setRequired(true)
    .setPoints(4);

  q2.setChoices([
    q2.createChoice('Convert food into energy (ATP) that the cell can use', true),
    q2.createChoice('Store DNA and genetic information', false),
    q2.createChoice('Build proteins for the cell', false),
    q2.createChoice('Control what enters and exits the cell', false)
  ]);

  q2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Exactly! Mitochondria take in glucose (from food) and oxygen, and convert them into ATP - the energy currency that powers all cell activities.')
      .build()
  );

  // Q3: Organelle matching (4 pts - auto-graded with checkbox)
  const q3 = form.addCheckboxItem()
    .setTitle('Select ALL the organelles that are found in BOTH plant and animal cells:')
    .setHelpText('Select all correct answers.')
    .setRequired(true)
    .setPoints(4);

  q3.setChoices([
    q3.createChoice('Nucleus', true),
    q3.createChoice('Mitochondria', true),
    q3.createChoice('Cell membrane', true),
    q3.createChoice('Cell wall', false),
    q3.createChoice('Chloroplasts', false)
  ]);

  // Q4: Structure-function connection (5 pts - manual grading)
  form.addSectionHeaderItem()
    .setTitle('Question 4 [5 points - teacher graded]')
    .setHelpText('RUBRIC:\n• 5 pts: Correct structure + function + explains WHY the structure helps the function\n• 4 pts: Structure + function, basic explanation\n• 3 pts: Identifies structure and function\n• 2 pts: Partial understanding\n• 1 pt: Minimal response');

  const q4 = form.addParagraphTextItem()
    .setTitle('Choose ONE organelle. Explain its structure (what it looks like) and how that structure helps it do its job.')
    .setHelpText('Example format: "The [organelle] has [structure description] which helps it [function] because..."')
    .setRequired(true);

  q4.setValidation(
    FormApp.createParagraphTextValidation()
      .requireTextLengthGreaterThanOrEqualTo(50)
      .build()
  );

  // Q5: Misconception check (3 pts - auto-graded)
  const q5 = form.addMultipleChoiceItem()
    .setTitle('A student says: "Cells are mostly empty space with a few floating parts." Is this correct?')
    .setRequired(true)
    .setPoints(3);

  q5.setChoices([
    q5.createChoice('No - cells are filled with cytoplasm, a gel-like substance that holds organelles and allows chemical reactions', true),
    q5.createChoice('Yes - cells are like empty rooms with furniture', false),
    q5.createChoice('Yes - most of a cell is water', false),
    q5.createChoice('No - cells are solid like a rock', false)
  ]);

  q5.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Cells are NOT hollow. They are filled with cytoplasm - a gel-like substance that holds all the organelles in place and is where many chemical reactions happen.')
      .build()
  );

  q5.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Common misconception! Cells are NOT empty - they are filled with CYTOPLASM, a thick gel-like substance. Think of it like Jell-O with fruit suspended in it - the cytoplasm holds all the organelles in place.')
      .build()
  );

  Logger.log('Station 2 created: ' + form.getEditUrl());
  return { form: form, editUrl: form.getEditUrl(), publishedUrl: form.getPublishedUrl() };
}

// ============================================================================
// STATION 3 - DESIGN A CELL MODEL (25 points, ~20 min)
// ============================================================================

function createG7C1W1Station3_() {
  const form = FormApp.create('G7.C1.W1: Station 3 - Design a Cell Model [25 pts]');

  form.setDescription(
    'DESIGN A CELL MODEL: CELL AS A FACTORY\n\n' +
    'Your Challenge: Create an analogy comparing a cell to something familiar\n' +
    '(a factory, a city, a school, etc.)\n\n' +
    'The goal is to show how you understand what each cell part DOES\n' +
    'by comparing it to something with a similar function.\n\n' +
    'Example: "The nucleus is like the main office of a factory because\n' +
    'it contains all the instructions (DNA) for running the operation."\n\n' +
    '---\n' +
    'Time: About 20 minutes | Points: 25\n' +
    'Focus: Create a functional model/analogy for a cell'
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

  // Q1: Choose your analogy (5 pts - manual grading)
  form.addSectionHeaderItem()
    .setTitle('Question 1 [5 points - teacher graded]')
    .setHelpText('RUBRIC:\n• 5 pts: Clear analogy choice + explains WHY it works well\n• 4 pts: Good analogy with basic explanation\n• 3 pts: Analogy chosen, limited explanation\n• 2 pts: Basic response\n• 1 pt: Minimal response');

  const q1 = form.addParagraphTextItem()
    .setTitle('What will you compare the cell to? (Factory, city, school, restaurant, or your own idea) Explain why this is a good comparison.')
    .setRequired(true);

  q1.setValidation(
    FormApp.createParagraphTextValidation()
      .requireTextLengthGreaterThanOrEqualTo(30)
      .build()
  );

  // Q2: Nucleus analogy (5 pts - manual grading)
  form.addSectionHeaderItem()
    .setTitle('Question 2 [5 points - teacher graded]')
    .setHelpText('RUBRIC:\n• 5 pts: Names part of analogy + explains function match + why it works\n• 4 pts: Names part + explains function\n• 3 pts: Names part, basic function\n• 2 pts: Partial\n• 1 pt: Minimal');

  const q2 = form.addParagraphTextItem()
    .setTitle('In your analogy, what part represents the NUCLEUS (control center with DNA instructions)? Explain why.')
    .setHelpText('Example: "In a factory, the nucleus is like the main office because..."')
    .setRequired(true);

  // Q3: Mitochondria analogy (5 pts - manual grading)
  form.addSectionHeaderItem()
    .setTitle('Question 3 [5 points - teacher graded]')
    .setHelpText('RUBRIC: Same as Q2');

  const q3 = form.addParagraphTextItem()
    .setTitle('In your analogy, what part represents the MITOCHONDRIA (energy producers)? Explain why.')
    .setHelpText('Remember: Mitochondria convert food into energy the cell can use.')
    .setRequired(true);

  // Q4: Cell membrane analogy (5 pts - manual grading)
  form.addSectionHeaderItem()
    .setTitle('Question 4 [5 points - teacher graded]')
    .setHelpText('RUBRIC: Same as Q2');

  const q4 = form.addParagraphTextItem()
    .setTitle('In your analogy, what part represents the CELL MEMBRANE (controls what enters/exits)? Explain why.')
    .setHelpText('The cell membrane is selective - it lets some things in and keeps others out.')
    .setRequired(true);

  // Q5: Model limitation (5 pts - manual grading)
  form.addSectionHeaderItem()
    .setTitle('Question 5 [5 points - teacher graded]')
    .setHelpText('RUBRIC:\n• 5 pts: Identifies specific limitation + explains what doesn\'t match\n• 4 pts: Good limitation identified\n• 3 pts: Basic limitation\n• 2 pts: Vague response\n• 1 pt: Minimal');

  const q5 = form.addParagraphTextItem()
    .setTitle('All models have limitations. What is ONE way your analogy does NOT accurately represent a real cell?')
    .setHelpText('Think: What can real cells do that your analogy cannot show?')
    .setRequired(true);

  Logger.log('Station 3 created: ' + form.getEditUrl());
  return { form: form, editUrl: form.getEditUrl(), publishedUrl: form.getPublishedUrl() };
}

// ============================================================================
// EXIT TICKET - CELL BASICS INTEGRATION (23 points, ~15 min)
// Structure: 4 NEW + 1 INTEGRATION + 1 SEP-1 (no spiral for Week 1)
// ============================================================================

function createG7C1W1ExitTicket_() {
  const form = FormApp.create('G7.C1.W1: Exit Ticket - Cell Basics Integration [23 pts]');

  form.setDescription(
    'EXIT TICKET: CELL BASICS INTEGRATION\n\n' +
    'Show what you learned today about cells!\n\n' +
    'This Exit Ticket covers:\n' +
    '- Cell Theory (all living things are made of cells)\n' +
    '- Cell structures and their functions\n' +
    '- Comparing plant and animal cells\n' +
    '- Using models to explain science\n\n' +
    'NOTE: This is Week 1 - no spiral questions yet.\n' +
    'We are building your foundation!\n\n' +
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
    'Exit Ticket submitted! Great work on Week 1!\n\n' +
    'Next week: We\'ll explore how cells specialize to do different jobs.\n' +
    'How does a stem cell become a brain cell, muscle cell, or skin cell?'
  );

  // --- NEW CONTENT QUESTIONS ---
  form.addPageBreakItem()
    .setTitle('[NEW CONTENT] Today\'s Learning')
    .setHelpText('These questions check what you learned today.');

  // Q1: Cell Theory (5 pts - manual)
  form.addSectionHeaderItem()
    .setTitle('[NEW] Question 1 [5 points - teacher graded]')
    .setHelpText('RUBRIC:\n• 5 pts: All 3 parts of Cell Theory + own words\n• 4 pts: 2-3 parts correctly stated\n• 3 pts: Basic understanding\n• 2 pts: Partial\n• 1 pt: Minimal');

  const q1 = form.addParagraphTextItem()
    .setTitle('Explain the Cell Theory in your own words. What are the main ideas?')
    .setHelpText('Hint: There are 3 main parts to the Cell Theory.')
    .setRequired(true);

  q1.setValidation(
    FormApp.createParagraphTextValidation()
      .requireTextLengthGreaterThanOrEqualTo(50)
      .build()
  );

  // Q2: Organelle function (4 pts - auto)
  const q2 = form.addMultipleChoiceItem()
    .setTitle('[NEW] Which organelle converts food into energy (ATP) that the cell can use?')
    .setRequired(true)
    .setPoints(4);

  q2.setChoices([
    q2.createChoice('Mitochondria', true),
    q2.createChoice('Nucleus', false),
    q2.createChoice('Cell membrane', false),
    q2.createChoice('Ribosome', false)
  ]);

  q2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Mitochondria are the "powerhouse of the cell" - they convert glucose and oxygen into ATP energy.')
      .build()
  );

  // Q3: Plant vs Animal (4 pts - auto)
  const q3 = form.addMultipleChoiceItem()
    .setTitle('[NEW] Which structures are found ONLY in plant cells and NOT in animal cells?')
    .setRequired(true)
    .setPoints(4);

  q3.setChoices([
    q3.createChoice('Cell wall and chloroplasts', true),
    q3.createChoice('Nucleus and mitochondria', false),
    q3.createChoice('Cell membrane and cytoplasm', false),
    q3.createChoice('Ribosomes and DNA', false)
  ]);

  q3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Plant cells have a rigid cell wall (for support) and chloroplasts (for photosynthesis) that animal cells lack.')
      .build()
  );

  // Q4: Application scenario (5 pts - manual)
  form.addSectionHeaderItem()
    .setTitle('[NEW] Question 4 [5 points - teacher graded]')
    .setHelpText('RUBRIC:\n• 5 pts: Correct identification + explains reasoning using cell structure knowledge\n• 4 pts: Correct answer with basic reasoning\n• 3 pts: Correct answer, limited explanation\n• 2 pts: Partial\n• 1 pt: Minimal');

  const q4 = form.addParagraphTextItem()
    .setTitle('A scientist looks at a cell under a microscope and sees a cell wall and green chloroplasts. Is this cell from a plant or an animal? Explain your reasoning.')
    .setRequired(true);

  // --- INTEGRATION QUESTION ---
  form.addPageBreakItem()
    .setTitle('[INTEGRATION] Connecting Ideas')
    .setHelpText('Connect what you learned today.');

  // Q5: Integration (5 pts - manual)
  form.addSectionHeaderItem()
    .setTitle('[INTEGRATION] Question 5 [5 points - teacher graded]')
    .setHelpText('RUBRIC:\n• 5 pts: Connects structure to function AND explains relationship\n• 4 pts: Good connection, basic explanation\n• 3 pts: Identifies connection\n• 2 pts: Partial understanding\n• 1 pt: Minimal');

  const q5 = form.addParagraphTextItem()
    .setTitle('We learned that "structure determines function" in cells. Choose ONE organelle and explain how its STRUCTURE helps it perform its FUNCTION.')
    .setHelpText('Example: The mitochondria has folds that increase surface area for...')
    .setRequired(true);

  q5.setValidation(
    FormApp.createParagraphTextValidation()
      .requireTextLengthGreaterThanOrEqualTo(50)
      .build()
  );

  // --- SEP-1 QUESTION ---
  form.addPageBreakItem()
    .setTitle('[SEP-1] Asking Scientific Questions')
    .setHelpText('Scientists ask questions to guide their investigations.');

  // Q6: Question generator (3 pts - manual for SEP-1 compliance, MS-LS1 asks students to investigate)
  form.addSectionHeaderItem()
    .setTitle('[SEP-1] Question 6 [3 points - teacher graded]')
    .setHelpText('RUBRIC:\n• 3 pts: 2 testable HOW/WHY questions about cells\n• 2 pts: 1-2 questions, somewhat testable\n• 1 pt: Questions not testable\n• 0 pts: No questions');

  const q6 = form.addParagraphTextItem()
    .setTitle('Write 2 scientific questions about cells that you would like to investigate. Use "How does..." or "Why does..." to start each question.')
    .setHelpText('Good science questions can be tested! Example: "How does cell size affect how fast cells can exchange materials?"')
    .setRequired(true);

  Logger.log('Exit Ticket created: ' + form.getEditUrl());
  return { form: form, editUrl: form.getEditUrl(), publishedUrl: form.getPublishedUrl() };
}

// ============================================================================
// UTILITY: Deploy all forms at once
// ============================================================================

function deployG7C1W1() {
  Logger.log('Starting G7 Cycle 1 Week 1 deployment...\n');
  const results = createAllG7C1W1Forms();
  Logger.log('\n=== DEPLOYMENT COMPLETE ===');
  Logger.log('Hook: ' + results.hook.editUrl);
  Logger.log('Station 1: ' + results.station1.editUrl);
  Logger.log('Station 2: ' + results.station2.editUrl);
  Logger.log('Station 3: ' + results.station3.editUrl);
  Logger.log('Exit Ticket: ' + results.exitTicket.editUrl);
  return results;
}
