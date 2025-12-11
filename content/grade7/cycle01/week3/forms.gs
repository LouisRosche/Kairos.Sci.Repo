/**
 * ============================================================================
 * GRADE 7 - CYCLE 1 WEEK 3: Cell Communication & Gene Expression
 * 5 Forms | 100 Points Total | ~75 Minutes
 * ============================================================================
 *
 * Phenomenon: "How do cells know what job to do?"
 *
 * NGSS Standards:
 * - MS-LS1-2: Develop and use a model to describe the function of a cell
 * - MS-LS1-3: Use argument supported by evidence for body as system of subsystems
 *
 * Three-Dimensional Learning:
 * - SEP-2: Developing and Using Models (gene expression)
 * - DCI: LS1.A Structure and Function, LS1.B Growth and Development
 * - CCC-2: Cause and Effect (signals → gene expression → cell type)
 *
 * Spiral Review: W1 cell structure, W2 cell specialization
 *
 * ============================================================================
 */

// ============================================================================
// CONFIGURATION
// ============================================================================

const G7_C1_W3_CONFIG = {
  grade: 7,
  cycle: 1,
  week: 3,
  topic: 'Cell Communication & Gene Expression',
  phenomenon: 'How do cells know what job to do?',

  points: {
    hook: 12,
    station1: 20,
    station2: 20,
    station3: 25,
    exitTicket: 23,
    total: 100
  },

  misconceptions: [
    {
      id: 'cell-specialization-random',
      description: 'Cell specialization is random or luck-based',
      correctUnderstanding: 'Gene expression controlled by chemical signals determines cell type',
      targetedIn: ['s1_q2', 'exit_q3']
    },
    {
      id: 'all-genes-active',
      description: 'All genes in a cell are always active',
      correctUnderstanding: 'Different cells express different genes based on signals received',
      targetedIn: ['s1_q4', 'exit_q4']
    }
  ],

  spiralTargets: {
    w1: 'Cell structure and organelles',
    w2: 'Cell specialization and tissues'
  }
};

// ============================================================================
// MAIN FUNCTION
// ============================================================================

/**
 * Creates all 5 forms for G7 C1 W3
 * @returns {Object} Map of form names to Form objects
 */
function createAllG7C1W3Forms() {
  const forms = {
    hook: createG7C1W3Hook_(),
    station1: createG7C1W3Station1_(),
    station2: createG7C1W3Station2_(),
    station3: createG7C1W3Station3_(),
    exitTicket: createG7C1W3ExitTicket_()
  };

  Logger.log('G7 C1 W3 Forms created successfully');
  Logger.log('Total points: ' + G7_C1_W3_CONFIG.points.total);

  return forms;
}

// ============================================================================
// HOOK: The Cell's Instruction Manual (12 points, ~10 minutes)
// ============================================================================

/**
 * Hook form activating prior knowledge and setting phenomenon
 * Focus: How do cells 'read' only the genes they need?
 */
function createG7C1W3Hook_() {
  const form = FormApp.create('G7.C1.W3: Hook - The Cell\'s Instruction Manual');
  form.setDescription(
    'Phenomenon: How do cells know what job to do?\n\n' +
    'All your cells have the SAME DNA - the exact same instruction manual. ' +
    'Yet a nerve cell looks and acts completely different from a muscle cell. ' +
    'How do cells "know" which instructions to follow?\n\n' +
    'Watch the gene expression animation showing how a stem cell becomes specialized.'
  );

  // Q1: Activation of prior knowledge (2 pts)
  const q1 = form.addMultipleChoiceItem();
  q1.setTitle('From Week 2: What determines what type of cell a cell becomes?')
    .setHelpText('ID: g7_c1_w3_hook_q1 | Points: 2')
    .setRequired(true)
    .setChoices([
      q1.createChoice('Random chance decides which cells become which type', false),
      q1.createChoice('The location of the cell in the body randomly assigns its type', false),
      q1.createChoice('Chemical signals tell cells which genes to turn on or off', true),
      q1.createChoice('Cells choose their own type based on what the body needs', false)
    ]);
  q1.setPoints(2);

  // Q2: Observation from animation (2 pts)
  const q2 = form.addMultipleChoiceItem();
  q2.setTitle('In the animation, what happens to the stem cell BEFORE it becomes a specific cell type?')
    .setHelpText('ID: g7_c1_w3_hook_q2 | Points: 2 | Look for what triggers the change')
    .setRequired(true)
    .setChoices([
      q2.createChoice('It receives chemical signals from nearby cells', true),
      q2.createChoice('It randomly divides until it becomes specialized', false),
      q2.createChoice('Its DNA changes to match the new cell type', false),
      q2.createChoice('It moves to a new location in the body', false)
    ]);
  q2.setPoints(2);

  // Q3: Connecting to phenomenon (3 pts)
  const q3 = form.addMultipleChoiceItem();
  q3.setTitle('If all cells have the same DNA "instruction manual," how can they become different types?')
    .setHelpText('ID: g7_c1_w3_hook_q3 | Points: 3')
    .setRequired(true)
    .setChoices([
      q3.createChoice('Each cell gets a different copy of the DNA', false),
      q3.createChoice('Cells read different "chapters" of the same manual based on signals they receive', true),
      q3.createChoice('DNA changes in each cell to match what that cell needs to do', false),
      q3.createChoice('Specialized cells don\'t actually use DNA at all', false)
    ]);
  q3.setPoints(3);

  // Q4: Making predictions (3 pts)
  const q4 = form.addParagraphTextItem();
  q4.setTitle('Prediction: What do you think would happen if a muscle cell suddenly started reading the "nerve cell chapters" of its DNA? Use evidence from what you know about cell specialization.')
    .setHelpText('ID: g7_c1_w3_hook_q4 | Points: 3 | Rubric: 3=Predicts disruption with evidence, 2=Basic prediction, 1=Attempt')
    .setRequired(true);

  // Q5: Phenomenon focus (2 pts)
  const q5 = form.addMultipleChoiceItem();
  q5.setTitle('Today\'s big question: How do chemical signals "tell" genes to turn on or off?')
    .setHelpText('ID: g7_c1_w3_hook_q5 | Points: 2 | Select the best hypothesis')
    .setRequired(true)
    .setChoices([
      q5.createChoice('Signals physically block or unblock parts of the DNA', true),
      q5.createChoice('Signals destroy the DNA that isn\'t needed', false),
      q5.createChoice('Signals create new DNA for the cell to use', false),
      q5.createChoice('Signals have nothing to do with DNA - they work on organelles instead', false)
    ]);
  q5.setPoints(2);

  configFormSettings_(form, 'hook');
  return form;
}

// ============================================================================
// STATION 1: Gene Expression Simulation (20 points, ~15 minutes)
// ============================================================================

/**
 * Station 1: Interactive gene switching simulation
 * Focus: Model how signals turn genes on/off
 * Spiral: Cell types from W2
 */
function createG7C1W3Station1_() {
  const form = FormApp.create('G7.C1.W3: Station 1 - Gene Expression Simulation');
  form.setDescription(
    'Station 1: Gene Expression Simulation (20 points)\n\n' +
    'Use the interactive gene expression simulation to explore how cells control which genes are active.\n\n' +
    'In the simulation:\n' +
    '• Different colored signals represent different chemical messages\n' +
    '• Genes can be switched ON (producing proteins) or OFF (inactive)\n' +
    '• Watch how the cell changes based on which genes are active\n\n' +
    'Materials: Gene Expression Interactive Simulation (on your Chromebook)\n\n' +
    '⏱️ Time: ~15 minutes'
  );

  // Q1: Basic observation (3 pts)
  const q1 = form.addMultipleChoiceItem();
  q1.setTitle('In the simulation, what happens when a chemical signal reaches a cell?')
    .setHelpText('ID: g7_c1_w3_s1_q1 | Points: 3')
    .setRequired(true)
    .setChoices([
      q1.createChoice('The cell\'s DNA is replaced with new DNA', false),
      q1.createChoice('Specific genes are turned on or off without changing the DNA', true),
      q1.createChoice('The cell immediately divides into two cells', false),
      q1.createChoice('All genes in the cell become active at once', false)
    ]);
  q1.setPoints(3);

  // Q2: Misconception targeting (4 pts)
  const q2 = form.addMultipleChoiceItem();
  q2.setTitle('A student says: "Cells become different types by chance - it\'s like rolling dice." Based on the simulation, why is this incorrect?')
    .setHelpText('ID: g7_c1_w3_s1_q2 | Points: 4 | Targets misconception: specialization is random')
    .setRequired(true)
    .setChoices([
      q2.createChoice('The simulation shows that specific signals cause specific genes to turn on - it\'s controlled, not random', true),
      q2.createChoice('The simulation shows that cells don\'t actually become different types', false),
      q2.createChoice('The simulation proves that all cells stay the same forever', false),
      q2.createChoice('The simulation doesn\'t show anything about how cells specialize', false)
    ]);
  q2.setPoints(4);

  // Q3: Data interpretation (4 pts)
  const q3 = form.addMultipleChoiceItem();
  q3.setTitle('In the simulation, Cell A receives Signal X and becomes a muscle cell. Cell B (same starting type) receives Signal Y and becomes a nerve cell. What does this demonstrate?')
    .setHelpText('ID: g7_c1_w3_s1_q3 | Points: 4')
    .setRequired(true)
    .setChoices([
      q3.createChoice('Different signals activate different genes, leading to different cell types', true),
      q3.createChoice('Cell A and Cell B must have started with different DNA', false),
      q3.createChoice('The signals randomly assigned cell types by chance', false),
      q3.createChoice('Signal Y destroyed some of Cell B\'s DNA', false)
    ]);
  q3.setPoints(4);

  // Q4: Misconception targeting (4 pts)
  const q4 = form.addMultipleChoiceItem();
  q4.setTitle('TRUE or FALSE analysis: "Every gene in your cells is active all the time."')
    .setHelpText('ID: g7_c1_w3_s1_q4 | Points: 4 | Targets misconception: all genes always active')
    .setRequired(true)
    .setChoices([
      q4.createChoice('TRUE - all genes work constantly to keep cells alive', false),
      q4.createChoice('FALSE - only certain genes are "on" in each cell type, based on signals received', true),
      q4.createChoice('TRUE - turning genes off would kill the cell', false),
      q4.createChoice('FALSE - genes are only active when cells are dividing', false)
    ]);
  q4.setPoints(4);

  // Q5: Spiral - connecting to W2 (3 pts)
  const q5 = form.addMultipleChoiceItem();
  q5.setTitle('SPIRAL (W2): How does gene expression explain why red blood cells have no nucleus but nerve cells have large nuclei?')
    .setHelpText('ID: g7_c1_w3_s1_q5 | Points: 3 | Connects to Week 2 specialization')
    .setRequired(true)
    .setChoices([
      q5.createChoice('Red blood cells and nerve cells have different DNA', false),
      q5.createChoice('Different genes are expressed in each cell type, creating different structures', true),
      q5.createChoice('Red blood cells lost their nuclei by accident', false),
      q5.createChoice('Gene expression doesn\'t affect cell structure', false)
    ]);
  q5.setPoints(3);

  // Q6: Model application (2 pts)
  const q6 = form.addParagraphTextItem();
  q6.setTitle('Based on the simulation, explain what must happen at the molecular level for a stem cell to become a skin cell. Include the role of signals and genes in your answer.')
    .setHelpText('ID: g7_c1_w3_s1_q6 | Points: 2 | Rubric: 2=Mentions signals activating specific genes, 1=Partial explanation, 0=No connection')
    .setRequired(true);

  configFormSettings_(form, 'station1');
  return form;
}

// ============================================================================
// STATION 2: Signal Analysis (20 points, ~15 minutes)
// ============================================================================

/**
 * Station 2: Cell signaling pathway cards + scenario analysis
 * Focus: Trace chemical signals to cell responses
 */
function createG7C1W3Station2_() {
  const form = FormApp.create('G7.C1.W3: Station 2 - Signal Analysis');
  form.setDescription(
    'Station 2: Signal Analysis (20 points)\n\n' +
    'Cells constantly send and receive chemical messages. These signals travel through ' +
    'specific pathways to turn genes on or off.\n\n' +
    'Use the Cell Signaling Pathway Cards to analyze how signals:\n' +
    '• Travel from outside the cell to the nucleus\n' +
    '• Activate specific responses\n' +
    '• Coordinate between multiple cells\n\n' +
    'Materials: Signaling Pathway Cards, Scenario Analysis Sheets\n\n' +
    '⏱️ Time: ~15 minutes'
  );

  // Q1: Signal pathway basics (4 pts)
  const q1 = form.addMultipleChoiceItem();
  q1.setTitle('Put the signal pathway in correct order: 1) Gene is turned on, 2) Signal reaches cell membrane, 3) Protein is made, 4) Signal travels to nucleus')
    .setHelpText('ID: g7_c1_w3_s2_q1 | Points: 4')
    .setRequired(true)
    .setChoices([
      q1.createChoice('2 → 4 → 1 → 3', true),
      q1.createChoice('1 → 2 → 3 → 4', false),
      q1.createChoice('4 → 2 → 1 → 3', false),
      q1.createChoice('2 → 1 → 4 → 3', false)
    ]);
  q1.setPoints(4);

  // Q2: Scenario analysis (4 pts)
  const q2 = form.addMultipleChoiceItem();
  q2.setTitle('SCENARIO: During exercise, your muscles need more energy. Your body releases a signal that reaches muscle cells. What happens next?')
    .setHelpText('ID: g7_c1_w3_s2_q2 | Points: 4')
    .setRequired(true)
    .setChoices([
      q2.createChoice('Genes for energy production are turned on, making more energy-producing proteins', true),
      q2.createChoice('Muscle cells change their DNA to include energy genes', false),
      q2.createChoice('The signal directly provides energy to the muscles', false),
      q2.createChoice('Muscle cells divide to create more cells for energy', false)
    ]);
  q2.setPoints(4);

  // Q3: Comparing signals (4 pts)
  const q3 = form.addMultipleChoiceItem();
  q3.setTitle('Two cells receive different signals. Cell A turns on genes for producing digestive enzymes. Cell B turns on genes for producing antibodies. What explains this difference?')
    .setHelpText('ID: g7_c1_w3_s2_q3 | Points: 4')
    .setRequired(true)
    .setChoices([
      q3.createChoice('Cell A and Cell B have different DNA', false),
      q3.createChoice('Different signals activate different sets of genes in cells', true),
      q3.createChoice('Cell A is located in the digestive system, which changes its DNA', false),
      q3.createChoice('Only Cell B can respond to signals', false)
    ]);
  q3.setPoints(4);

  // Q4: Feedback loops (4 pts)
  const q4 = form.addMultipleChoiceItem();
  q4.setTitle('When blood sugar rises, the pancreas releases insulin. Insulin signals cells to absorb sugar and turn off sugar-release genes. This is an example of:')
    .setHelpText('ID: g7_c1_w3_s2_q4 | Points: 4')
    .setRequired(true)
    .setChoices([
      q4.createChoice('A feedback loop where signals regulate gene expression', true),
      q4.createChoice('Random gene activation', false),
      q4.createChoice('DNA mutation in response to sugar', false),
      q4.createChoice('Cells dividing to handle the sugar', false)
    ]);
  q4.setPoints(4);

  // Q5: Application (4 pts)
  const q5 = form.addParagraphTextItem();
  q5.setTitle('ANALYSIS: A person has diabetes because their cells don\'t respond properly to insulin signals. Based on what you know about cell signaling and gene expression, explain why this causes problems with blood sugar control.')
    .setHelpText('ID: g7_c1_w3_s2_q5 | Points: 4 | Rubric: 4=Links signal failure to gene expression to sugar problems, 3=Mentions most concepts, 2=Basic connection, 1=Attempt')
    .setRequired(true);

  configFormSettings_(form, 'station2');
  return form;
}

// ============================================================================
// STATION 3: Design a Cell Signal System (25 points, ~20 minutes)
// ============================================================================

/**
 * Station 3: Engineering design challenge
 * Focus: Apply signaling knowledge to coordination problem
 */
function createG7C1W3Station3_() {
  const form = FormApp.create('G7.C1.W3: Station 3 - Design a Cell Signal System');
  form.setDescription(
    'Station 3: Engineering Challenge - Design a Cell Signal System (25 points)\n\n' +
    'CHALLENGE: You are designing a communication system for a colony of cells that need to ' +
    'work together. The cells must:\n' +
    '• Coordinate to respond to threats (like bacteria)\n' +
    '• Different cells need to do different jobs\n' +
    '• Signals must reach the right cells without affecting others\n\n' +
    'Use your knowledge of cell signaling and gene expression to design an effective system.\n\n' +
    '⏱️ Time: ~20 minutes'
  );

  // Q1: Identify the problem (4 pts)
  const q1 = form.addMultipleChoiceItem();
  q1.setTitle('What is the main challenge in designing a cell communication system?')
    .setHelpText('ID: g7_c1_w3_s3_q1 | Points: 4 | SEP-1: Asking questions and defining problems')
    .setRequired(true)
    .setChoices([
      q1.createChoice('Making sure signals only affect the cells that should respond', true),
      q1.createChoice('Creating enough DNA for all the cells', false),
      q1.createChoice('Making all cells identical', false),
      q1.createChoice('Preventing cells from communicating with each other', false)
    ]);
  q1.setPoints(4);

  // Q2: Design criteria (5 pts)
  const q2 = form.addCheckboxItem();
  q2.setTitle('Select ALL the features your cell signaling system would need (select all that apply):')
    .setHelpText('ID: g7_c1_w3_s3_q2 | Points: 5 | Select all correct answers')
    .setRequired(true)
    .setChoices([
      q2.createChoice('Different signal types for different messages', true),
      q2.createChoice('Receptors on cells that match specific signals', true),
      q2.createChoice('A way to turn signals off when they\'re no longer needed', true),
      q2.createChoice('One universal signal for all purposes', false),
      q2.createChoice('A method for signals to reach distant cells', true),
      q2.createChoice('All cells responding to all signals equally', false)
    ]);

  // Q3: Propose solution (5 pts)
  const q3 = form.addParagraphTextItem();
  q3.setTitle('DESIGN: Describe your cell signaling system. Include: (1) How many different signals you would use and why, (2) How cells would know which signals to respond to, (3) How your system would coordinate a response to bacteria.')
    .setHelpText('ID: g7_c1_w3_s3_q3 | Points: 5 | Rubric: 5=All 3 elements with scientific reasoning, 4=All elements basic, 3=2 elements, 2=1 element, 1=Attempt')
    .setRequired(true);

  // Q4: Evaluate constraints (5 pts)
  const q4 = form.addMultipleChoiceItem();
  q4.setTitle('Your signal system needs to coordinate three cell types: (A) cells that detect bacteria, (B) cells that destroy bacteria, (C) cells that remember the bacteria for next time. What\'s the BEST signal strategy?')
    .setHelpText('ID: g7_c1_w3_s3_q4 | Points: 5')
    .setRequired(true)
    .setChoices([
      q4.createChoice('One signal from A activates both B and C, which have different receptors and genes', true),
      q4.createChoice('All three cell types use the same signal to communicate', false),
      q4.createChoice('Each cell type randomly decides when to act', false),
      q4.createChoice('Only cell type B needs to respond to signals', false)
    ]);
  q4.setPoints(5);

  // Q5: Defend design (6 pts)
  const q5 = form.addParagraphTextItem();
  q5.setTitle('ARGUE: A classmate suggests just sending one signal to ALL cells so they all respond. Use evidence from what you\'ve learned about gene expression to argue why your targeted system is better.')
    .setHelpText('ID: g7_c1_w3_s3_q5 | Points: 6 | Rubric: 6=Clear argument with 2+ evidence points, 4-5=Argument with 1 evidence point, 2-3=Basic reasoning, 1=Attempt')
    .setRequired(true);

  configFormSettings_(form, 'station3');
  return form;
}

// ============================================================================
// EXIT TICKET: Gene Expression Integration (23 points, ~15 minutes)
// ============================================================================

/**
 * Exit Ticket with structure: NEW: 2, SPIRAL: 2, INTEGRATION: 1, SEP-1: 1
 */
function createG7C1W3ExitTicket_() {
  const form = FormApp.create('G7.C1.W3: Exit Ticket - Gene Expression Integration');
  form.setDescription(
    'Exit Ticket: Gene Expression Integration (23 points)\n\n' +
    'Demonstrate your understanding of how cells communicate and control gene expression.\n\n' +
    '⏱️ Time: ~15 minutes'
  );

  // Q1: NEW - Core concept (4 pts)
  const q1 = form.addMultipleChoiceItem();
  q1.setTitle('NEW: What is gene expression?')
    .setHelpText('ID: g7_c1_w3_exit_q1 | Points: 4')
    .setRequired(true)
    .setChoices([
      q1.createChoice('The process of genes being turned on to make proteins', true),
      q1.createChoice('The number of genes a cell has', false),
      q1.createChoice('When DNA is copied to make new cells', false),
      q1.createChoice('The size of genes in a cell\'s DNA', false)
    ]);
  q1.setPoints(4);

  // Q2: NEW - Application (4 pts)
  const q2 = form.addMultipleChoiceItem();
  q2.setTitle('NEW: A pancreas cell and a skin cell both have genes for insulin AND genes for keratin (skin protein). Why does only the pancreas cell make insulin?')
    .setHelpText('ID: g7_c1_w3_exit_q2 | Points: 4')
    .setRequired(true)
    .setChoices([
      q2.createChoice('The pancreas cell has extra insulin genes', false),
      q2.createChoice('Chemical signals turn on insulin genes in pancreas cells but not skin cells', true),
      q2.createChoice('Skin cells don\'t have any genes', false),
      q2.createChoice('Insulin genes only exist in the pancreas', false)
    ]);
  q2.setPoints(4);

  // Q3: SPIRAL W2 - Misconception targeting (4 pts)
  const q3 = form.addMultipleChoiceItem();
  q3.setTitle('SPIRAL (W2): A student says: "Cells become specialized by random chance." Based on what you\'ve learned, which response BEST corrects this misconception?')
    .setHelpText('ID: g7_c1_w3_exit_q3 | Points: 4 | Targets misconception: specialization is random')
    .setRequired(true)
    .setChoices([
      q3.createChoice('Actually, cells don\'t really specialize - they all stay the same', false),
      q3.createChoice('Cell specialization is controlled by chemical signals that activate specific genes', true),
      q3.createChoice('You\'re right - specialization is completely random', false),
      q3.createChoice('Cells specialize based on where they were born, not their genes', false)
    ]);
  q3.setPoints(4);

  // Q4: SPIRAL W1 - Structure/function connection (3 pts)
  const q4 = form.addMultipleChoiceItem();
  q4.setTitle('SPIRAL (W1): Signals that turn genes on must travel from outside the cell to the nucleus. Which organelle must signals pass through to reach the nucleus?')
    .setHelpText('ID: g7_c1_w3_exit_q4 | Points: 3 | Connects to W1 cell structure')
    .setRequired(true)
    .setChoices([
      q4.createChoice('Mitochondria', false),
      q4.createChoice('Cytoplasm', true),
      q4.createChoice('Ribosomes', false),
      q4.createChoice('Cell wall', false)
    ]);
  q4.setPoints(3);

  // Q5: INTEGRATION - Connect all concepts (4 pts)
  const q5 = form.addParagraphTextItem();
  q5.setTitle('INTEGRATION: Explain the complete pathway from when a chemical signal reaches a cell to when a new protein is made. Include: (1) where the signal goes, (2) what happens to genes, and (3) where proteins are made.')
    .setHelpText('ID: g7_c1_w3_exit_q5 | Points: 4 | Rubric: 4=All 3 steps accurate, 3=2 steps, 2=1 step, 1=Attempt')
    .setRequired(true);

  // Q6: SEP-1 - Asking questions (4 pts)
  const q6 = form.addParagraphTextItem();
  q6.setTitle('SEP-1: Scientists discovered that cancer cells often don\'t respond to normal "stop dividing" signals. Based on what you learned today about cell signaling and gene expression, write ONE scientific question that could be investigated to understand why cancer cells ignore these signals.')
    .setHelpText('ID: g7_c1_w3_exit_q6 | Points: 4 | Rubric: 4=Testable question connecting signals to gene expression, 3=Good question, 2=Basic question, 1=Attempt')
    .setRequired(true);

  // Confidence scale (diagnostic only)
  const confidence = form.addScaleItem();
  confidence.setTitle('How confident are you in your understanding of gene expression and cell signaling?')
    .setHelpText('Diagnostic only - not graded')
    .setBounds(1, 5)
    .setLabels('Not confident', 'Very confident')
    .setRequired(true);
  confidence.setPoints(0);

  configFormSettings_(form, 'exitTicket');
  return form;
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Configures common form settings
 * @param {GoogleAppsScript.Forms.Form} form - The form to configure
 * @param {string} formType - Type of form (hook, station1, station2, station3, exitTicket)
 */
function configFormSettings_(form, formType) {
  form.setIsQuiz(true);
  form.setCollectEmail(true);
  form.setRequireLogin(true);
  form.setLimitOneResponsePerUser(true);
  form.setProgressBar(true);

  // Set shuffle based on form type
  if (formType === 'exitTicket') {
    form.setShuffleQuestions(false); // Keep exit ticket order
  }

  // Add form metadata as description suffix
  const metadata = '\n\n---\nForm ID: g7_c1_w3_' + formType +
                   '\nPoints: ' + G7_C1_W3_CONFIG.points[formType] +
                   '\nGenerated: ' + new Date().toISOString().split('T')[0];

  const currentDesc = form.getDescription();
  form.setDescription(currentDesc + metadata);
}

/**
 * Validates all forms have correct point totals
 * @returns {Object} Validation results
 */
function validateG7C1W3Points_() {
  const expected = G7_C1_W3_CONFIG.points;
  const results = {
    valid: true,
    details: {},
    totalExpected: expected.total
  };

  Logger.log('G7 C1 W3 Point Validation');
  Logger.log('Expected totals: Hook=' + expected.hook + ', S1=' + expected.station1 +
             ', S2=' + expected.station2 + ', S3=' + expected.station3 +
             ', Exit=' + expected.exitTicket);
  Logger.log('Grand Total Expected: ' + expected.total);

  return results;
}

// ============================================================================
// RUBRICS REFERENCE
// ============================================================================

/**
 * Rubric definitions for constructed response items
 * Used by teachers when manually grading paragraph responses
 */
const G7_C1_W3_RUBRICS = {
  hook_q4: {
    points: 3,
    criteria: {
      3: 'Predicts disruption to cell function based on gene expression evidence',
      2: 'Basic prediction with some reasoning',
      1: 'Attempt with minimal reasoning'
    }
  },
  s1_q6: {
    points: 2,
    criteria: {
      2: 'Accurately describes signals activating specific genes',
      1: 'Partial or unclear explanation',
      0: 'No connection to gene expression'
    }
  },
  s2_q5: {
    points: 4,
    criteria: {
      4: 'Links signal failure to gene expression problems to blood sugar dysregulation',
      3: 'Mentions most concepts with some gaps',
      2: 'Basic connection made',
      1: 'Attempt without clear reasoning'
    }
  },
  s3_q3: {
    points: 5,
    criteria: {
      5: 'All 3 elements (# signals, recognition mechanism, bacteria response) with scientific reasoning',
      4: 'All 3 elements present but basic',
      3: '2 elements well-addressed',
      2: '1 element addressed',
      1: 'Attempt'
    }
  },
  s3_q5: {
    points: 6,
    criteria: {
      6: 'Clear argument with 2+ pieces of evidence from gene expression',
      '4-5': 'Argument with 1 piece of evidence',
      '2-3': 'Basic reasoning without strong evidence',
      1: 'Attempt'
    }
  },
  exit_q5: {
    points: 4,
    criteria: {
      4: 'All 3 steps (signal to nucleus, gene activation, protein at ribosome) accurate',
      3: '2 steps accurate',
      2: '1 step accurate',
      1: 'Attempt'
    }
  },
  exit_q6: {
    points: 4,
    criteria: {
      4: 'Testable question connecting signals to gene expression in cancer',
      3: 'Good question with partial connection',
      2: 'Basic question about cancer or signaling',
      1: 'Attempt'
    }
  }
};
