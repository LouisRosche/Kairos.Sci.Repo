/**
 * ============================================================================
 * GRADE 7 - CYCLE 1 WEEK 4: Body Systems Integration
 * 5 Forms | 100 Points Total | ~75 Minutes
 * ============================================================================
 *
 * Phenomenon: "What happens when cells stop working together properly?"
 *
 * NGSS Standards:
 * - MS-LS1-3: Use argument supported by evidence for how the body is a system
 *             of interacting subsystems composed of groups of cells
 *
 * Three-Dimensional Learning:
 * - SEP-7: Engaging in Argument from Evidence
 * - DCI: LS1.A Structure and Function (systems level)
 * - CCC-4: Systems and System Models
 *
 * Spiral Review: W1 cell structure, W2 specialization, W3 gene expression
 *
 * ============================================================================
 */

// ============================================================================
// CONFIGURATION
// ============================================================================

const G7_C1_W4_CONFIG = {
  grade: 7,
  cycle: 1,
  week: 4,
  topic: 'Body Systems Integration',
  phenomenon: 'What happens when cells stop working together properly?',

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
      id: 'systems-independent',
      description: 'Body systems work independently of each other',
      correctUnderstanding: 'Body systems constantly interact and depend on each other',
      targetedIn: ['s1_q3', 'exit_q2']
    },
    {
      id: 'homeostasis-static',
      description: 'Homeostasis means the body stays exactly the same',
      correctUnderstanding: 'Homeostasis involves constant adjustments to maintain balance within a range',
      targetedIn: ['s2_q2', 'exit_q4']
    }
  ],

  spiralTargets: {
    w1: 'Cell structure and organelles',
    w2: 'Cell specialization and tissues',
    w3: 'Gene expression and signaling'
  }
};

// ============================================================================
// MAIN FUNCTION
// ============================================================================

/**
 * Creates all 5 forms for G7 C1 W4
 * @returns {Object} Map of form names to Form objects
 */
function createAllG7C1W4Forms() {
  const forms = {
    hook: createG7C1W4Hook_(),
    station1: createG7C1W4Station1_(),
    station2: createG7C1W4Station2_(),
    station3: createG7C1W4Station3_(),
    exitTicket: createG7C1W4ExitTicket_()
  };

  Logger.log('G7 C1 W4 Forms created successfully');
  Logger.log('Total points: ' + G7_C1_W4_CONFIG.points.total);

  return forms;
}

// ============================================================================
// HOOK: When Systems Fail (12 points, ~10 minutes)
// ============================================================================

/**
 * Hook form using disease case studies to explore system interactions
 * Focus: What happens when cells stop cooperating?
 */
function createG7C1W4Hook_() {
  const form = FormApp.create('G7.C1.W4: Hook - When Systems Fail');
  form.setDescription(
    'Phenomenon: What happens when cells stop working together properly?\n\n' +
    'CASE STUDY: Type 1 Diabetes\n' +
    '• Pancreas cells that make insulin are destroyed by the immune system\n' +
    '• Without insulin, other body cells can\'t absorb sugar from blood\n' +
    '• Blood sugar rises dangerously high\n' +
    '• Cells throughout the body starve despite plenty of sugar available\n\n' +
    'How does a problem in ONE organ affect the ENTIRE body?'
  );

  // Q1: Connecting to W3 (2 pts)
  const q1 = form.addMultipleChoiceItem();
  q1.setTitle('From Week 3: Insulin is a signal released by pancreas cells. What does this signal normally tell other cells to do?')
    .setHelpText('ID: g7_c1_w4_hook_q1 | Points: 2')
    .setRequired(true)
    .setChoices([
      q1.createChoice('Turn on genes for absorbing sugar from the blood', true),
      q1.createChoice('Produce more insulin', false),
      q1.createChoice('Divide and make more cells', false),
      q1.createChoice('Stop all cellular activities', false)
    ]);
  q1.setPoints(2);

  // Q2: Case study analysis (3 pts)
  const q2 = form.addMultipleChoiceItem();
  q2.setTitle('In Type 1 Diabetes, which body systems are DIRECTLY affected? (Select the BEST answer)')
    .setHelpText('ID: g7_c1_w4_hook_q2 | Points: 3')
    .setRequired(true)
    .setChoices([
      q2.createChoice('Only the pancreas', false),
      q2.createChoice('Multiple systems: digestive (pancreas), circulatory (blood sugar), and all cells that need sugar', true),
      q2.createChoice('Only the circulatory system', false),
      q2.createChoice('No systems are affected - just individual cells', false)
    ]);
  q2.setPoints(3);

  // Q3: Systems thinking (3 pts)
  const q3 = form.addMultipleChoiceItem();
  q3.setTitle('The diabetes case shows that body systems are:')
    .setHelpText('ID: g7_c1_w4_hook_q3 | Points: 3')
    .setRequired(true)
    .setChoices([
      q3.createChoice('Independent - problems stay in one system', false),
      q3.createChoice('Interconnected - a problem in one system affects many others', true),
      q3.createChoice('Replaceable - other systems can take over if one fails', false),
      q3.createChoice('Separate - systems never communicate with each other', false)
    ]);
  q3.setPoints(3);

  // Q4: Prediction (2 pts)
  const q4 = form.addParagraphTextItem();
  q4.setTitle('Predict: If someone with diabetes exercises, their muscles need MORE sugar. How might this make the diabetes problem worse? Use the case study information.')
    .setHelpText('ID: g7_c1_w4_hook_q4 | Points: 2 | Rubric: 2=Connects exercise to increased demand but insulin still missing, 1=Basic mention of exercise, 0=No connection')
    .setRequired(true);

  // Q5: Phenomenon focus (2 pts)
  const q5 = form.addMultipleChoiceItem();
  q5.setTitle('Today\'s focus: How do healthy body systems work together, and what happens when that coordination breaks down?')
    .setHelpText('ID: g7_c1_w4_hook_q5 | Points: 2')
    .setRequired(true)
    .setChoices([
      q5.createChoice('Systems use chemical signals and feedback loops to coordinate', true),
      q5.createChoice('Systems work completely independently', false),
      q5.createChoice('One "master system" controls all others', false),
      q5.createChoice('Systems only interact during emergencies', false)
    ]);
  q5.setPoints(2);

  configFormSettings_(form, 'hook');
  return form;
}

// ============================================================================
// STATION 1: System Interaction Lab (20 points, ~15 minutes)
// ============================================================================

/**
 * Station 1: Body systems interactive diagram
 * Focus: Map how systems depend on each other
 * Spiral: Cell specialization from W2-W3
 */
function createG7C1W4Station1_() {
  const form = FormApp.create('G7.C1.W4: Station 1 - System Interaction Lab');
  form.setDescription(
    'Station 1: System Interaction Lab (20 points)\n\n' +
    'Use the interactive body systems diagram to explore how systems work together.\n\n' +
    'Key systems to explore:\n' +
    '• Respiratory (lungs → gets oxygen)\n' +
    '• Circulatory (heart/blood → transports materials)\n' +
    '• Digestive (stomach/intestines → breaks down food)\n' +
    '• Nervous (brain/nerves → sends electrical signals)\n' +
    '• Endocrine (glands → sends chemical signals)\n\n' +
    'Materials: Interactive Body Systems Diagram (Chromebook)\n\n' +
    '⏱️ Time: ~15 minutes'
  );

  // Q1: Basic system function (3 pts)
  const q1 = form.addMultipleChoiceItem();
  q1.setTitle('What does the circulatory system provide to ALL other body systems?')
    .setHelpText('ID: g7_c1_w4_s1_q1 | Points: 3')
    .setRequired(true)
    .setChoices([
      q1.createChoice('Oxygen and nutrients delivered to cells, waste products removed', true),
      q1.createChoice('Only oxygen delivery', false),
      q1.createChoice('Electrical signals for communication', false),
      q1.createChoice('Nothing - systems work independently', false)
    ]);
  q1.setPoints(3);

  // Q2: System dependency (4 pts)
  const q2 = form.addMultipleChoiceItem();
  q2.setTitle('The circulatory system depends on the respiratory system to:')
    .setHelpText('ID: g7_c1_w4_s1_q2 | Points: 4')
    .setRequired(true)
    .setChoices([
      q2.createChoice('Add oxygen to blood and remove carbon dioxide', true),
      q2.createChoice('Pump blood through the body', false),
      q2.createChoice('Filter waste from the blood', false),
      q2.createChoice('Control heart rate', false)
    ]);
  q2.setPoints(4);

  // Q3: Misconception targeting (4 pts)
  const q3 = form.addMultipleChoiceItem();
  q3.setTitle('A student says: "Each body system does its own job independently." Based on your exploration, why is this incorrect?')
    .setHelpText('ID: g7_c1_w4_s1_q3 | Points: 4 | Targets misconception: systems work independently')
    .setRequired(true)
    .setChoices([
      q3.createChoice('Every system needs inputs from other systems (like oxygen, nutrients, signals) to function', true),
      q3.createChoice('The student is correct - systems are independent', false),
      q3.createChoice('Systems only connect during exercise', false),
      q3.createChoice('Only the brain connects to other systems', false)
    ]);
  q3.setPoints(4);

  // Q4: Spiral W2/W3 - Specialized cells (3 pts)
  const q4 = form.addMultipleChoiceItem();
  q4.setTitle('SPIRAL (W2/W3): Red blood cells are specialized to carry oxygen. Muscle cells are specialized to contract. How do these specialized cells work together?')
    .setHelpText('ID: g7_c1_w4_s1_q4 | Points: 3 | Connects to specialization')
    .setRequired(true)
    .setChoices([
      q4.createChoice('Red blood cells deliver oxygen that muscle cells need for energy to contract', true),
      q4.createChoice('They don\'t work together - each does its own job', false),
      q4.createChoice('Muscle cells make red blood cells', false),
      q4.createChoice('Red blood cells contract like muscles', false)
    ]);
  q4.setPoints(3);

  // Q5: Creating a system map (4 pts)
  const q5 = form.addCheckboxItem();
  q5.setTitle('When you eat food, which systems work together to get nutrients to your muscle cells? (Select ALL that apply)')
    .setHelpText('ID: g7_c1_w4_s1_q5 | Points: 4 | Select all correct answers')
    .setRequired(true)
    .setChoices([
      q5.createChoice('Digestive system - breaks food into nutrients', true),
      q5.createChoice('Circulatory system - transports nutrients in blood', true),
      q5.createChoice('Respiratory system - provides oxygen for cellular respiration', true),
      q5.createChoice('Muscular system - uses the nutrients', true),
      q5.createChoice('Only the digestive system is involved', false)
    ]);

  // Q6: Analysis (2 pts)
  const q6 = form.addParagraphTextItem();
  q6.setTitle('Trace the path: How does oxygen get from the air you breathe to your brain cells? Include at least TWO body systems in your answer.')
    .setHelpText('ID: g7_c1_w4_s1_q6 | Points: 2 | Rubric: 2=Mentions respiratory + circulatory correctly, 1=One system mentioned, 0=Incorrect path')
    .setRequired(true);

  configFormSettings_(form, 'station1');
  return form;
}

// ============================================================================
// STATION 2: Feedback Loop Analysis (20 points, ~15 minutes)
// ============================================================================

/**
 * Station 2: Homeostasis examples + data interpretation
 * Focus: Analyze negative feedback in body systems
 */
function createG7C1W4Station2_() {
  const form = FormApp.create('G7.C1.W4: Station 2 - Feedback Loop Analysis');
  form.setDescription(
    'Station 2: Feedback Loop Analysis (20 points)\n\n' +
    'HOMEOSTASIS: The body\'s ability to maintain stable internal conditions.\n\n' +
    'Example: Body Temperature Regulation\n' +
    '• Normal: 37°C (98.6°F)\n' +
    '• Too hot → Brain signals sweat glands to produce sweat → Cooling\n' +
    '• Too cold → Brain signals muscles to shiver → Warming\n\n' +
    'This is a NEGATIVE FEEDBACK LOOP - the response opposes the change.\n\n' +
    '⏱️ Time: ~15 minutes'
  );

  // Q1: Understanding feedback (4 pts)
  const q1 = form.addMultipleChoiceItem();
  q1.setTitle('Why is body temperature regulation called a "negative" feedback loop?')
    .setHelpText('ID: g7_c1_w4_s2_q1 | Points: 4')
    .setRequired(true)
    .setChoices([
      q1.createChoice('The response works to REVERSE the change (too hot → cooling, too cold → warming)', true),
      q1.createChoice('Negative means bad for the body', false),
      q1.createChoice('The body temperature decreases', false),
      q1.createChoice('The feedback makes things worse', false)
    ]);
  q1.setPoints(4);

  // Q2: Misconception targeting (4 pts)
  const q2 = form.addMultipleChoiceItem();
  q2.setTitle('A student says: "Homeostasis means your body temperature never changes." Is this correct?')
    .setHelpText('ID: g7_c1_w4_s2_q2 | Points: 4 | Targets homeostasis misconception')
    .setRequired(true)
    .setChoices([
      q2.createChoice('No - homeostasis means constant ADJUSTMENTS to keep conditions within a healthy range', true),
      q2.createChoice('Yes - the body stays exactly the same at all times', false),
      q2.createChoice('Yes - any change in body temperature means homeostasis failed', false),
      q2.createChoice('No - homeostasis means the body never tries to stay stable', false)
    ]);
  q2.setPoints(4);

  // Q3: Data interpretation (4 pts)
  const q3 = form.addMultipleChoiceItem();
  q3.setTitle('DATA: A runner\'s body temperature rises from 37°C to 38.5°C during exercise. After stopping, it returns to 37°C in 30 minutes. What does this show about homeostasis?')
    .setHelpText('ID: g7_c1_w4_s2_q3 | Points: 4')
    .setRequired(true)
    .setChoices([
      q3.createChoice('Feedback loops work to restore balance, but it takes time', true),
      q3.createChoice('Homeostasis failed during exercise', false),
      q3.createChoice('The body cannot regulate temperature during exercise', false),
      q3.createChoice('Exercise breaks the feedback loop permanently', false)
    ]);
  q3.setPoints(4);

  // Q4: Blood sugar feedback (4 pts)
  const q4 = form.addMultipleChoiceItem();
  q4.setTitle('After eating, blood sugar rises. The pancreas releases insulin, which signals cells to absorb sugar, lowering blood sugar. What type of feedback is this?')
    .setHelpText('ID: g7_c1_w4_s2_q4 | Points: 4')
    .setRequired(true)
    .setChoices([
      q4.createChoice('Negative feedback - the insulin response OPPOSES the rise in blood sugar', true),
      q4.createChoice('Positive feedback - more sugar leads to more insulin', false),
      q4.createChoice('No feedback - this is a one-time response', false),
      q4.createChoice('Random - the body doesn\'t control blood sugar', false)
    ]);
  q4.setPoints(4);

  // Q5: Systems working together (4 pts)
  const q5 = form.addParagraphTextItem();
  q5.setTitle('ANALYSIS: The blood sugar feedback loop involves the endocrine system (pancreas releases insulin), circulatory system (blood carries sugar and insulin), and all cells (absorb sugar). Explain why a problem in ANY of these systems would disrupt blood sugar control.')
    .setHelpText('ID: g7_c1_w4_s2_q5 | Points: 4 | Rubric: 4=Explains how each system\'s role is essential, 3=2 systems explained, 2=1 system explained, 1=Attempt')
    .setRequired(true);

  configFormSettings_(form, 'station2');
  return form;
}

// ============================================================================
// STATION 3: Design a Treatment Plan (25 points, ~20 minutes)
// ============================================================================

/**
 * Station 3: Engineering challenge - medical intervention
 * Focus: Apply systems thinking to medical problem
 */
function createG7C1W4Station3_() {
  const form = FormApp.create('G7.C1.W4: Station 3 - Design a Treatment Plan');
  form.setDescription(
    'Station 3: Medical Engineering Challenge (25 points)\n\n' +
    'CASE: Anemia Patient\n' +
    '• Problem: Not enough red blood cells\n' +
    '• Red blood cells carry oxygen from lungs to all body cells\n' +
    '• Symptoms: Fatigue, weakness, shortness of breath, pale skin\n\n' +
    'Your challenge: Design a treatment approach using your knowledge of body systems.\n\n' +
    '⏱️ Time: ~20 minutes'
  );

  // Q1: Define the problem (4 pts)
  const q1 = form.addMultipleChoiceItem();
  q1.setTitle('Why does anemia (low red blood cells) cause fatigue and weakness throughout the body?')
    .setHelpText('ID: g7_c1_w4_s3_q1 | Points: 4')
    .setRequired(true)
    .setChoices([
      q1.createChoice('Fewer red blood cells means less oxygen delivered to cells, reducing energy production', true),
      q1.createChoice('Red blood cells produce energy, so fewer cells means less energy', false),
      q1.createChoice('Anemia only affects the heart, which controls fatigue', false),
      q1.createChoice('Low red blood cells make blood flow slower', false)
    ]);
  q1.setPoints(4);

  // Q2: Systems affected (5 pts)
  const q2 = form.addCheckboxItem();
  q2.setTitle('Which body systems are DIRECTLY impacted by anemia? (Select ALL that apply)')
    .setHelpText('ID: g7_c1_w4_s3_q2 | Points: 5')
    .setRequired(true)
    .setChoices([
      q2.createChoice('Circulatory - blood can\'t carry enough oxygen', true),
      q2.createChoice('Muscular - muscles don\'t get enough oxygen for energy', true),
      q2.createChoice('Nervous - brain doesn\'t get enough oxygen for full function', true),
      q2.createChoice('All systems - every cell needs oxygen delivered by blood', true),
      q2.createChoice('Only the blood - other systems are unaffected', false)
    ]);

  // Q3: Treatment options analysis (5 pts)
  const q3 = form.addMultipleChoiceItem();
  q3.setTitle('Doctors might give an anemia patient iron supplements. Why would this help? (Iron is needed to make red blood cells)')
    .setHelpText('ID: g7_c1_w4_s3_q3 | Points: 5')
    .setRequired(true)
    .setChoices([
      q3.createChoice('More iron allows the body to produce more red blood cells, increasing oxygen delivery', true),
      q3.createChoice('Iron directly provides energy to cells', false),
      q3.createChoice('Iron replaces oxygen in the blood', false),
      q3.createChoice('Iron makes existing red blood cells work harder', false)
    ]);
  q3.setPoints(5);

  // Q4: Design a monitoring plan (5 pts)
  const q4 = form.addParagraphTextItem();
  q4.setTitle('DESIGN: What TWO measurements would you monitor to check if an anemia treatment is working? For each, explain what change you would expect to see if the treatment is successful.')
    .setHelpText('ID: g7_c1_w4_s3_q4 | Points: 5 | Rubric: 5=Two measurements with expected changes, 4=Two measurements basic, 3=One measurement well-explained, 2=One measurement basic, 1=Attempt')
    .setRequired(true);

  // Q5: Argue for systems approach (6 pts)
  const q5 = form.addParagraphTextItem();
  q5.setTitle('ARGUE: A friend says "Anemia is just a blood problem - it shouldn\'t affect other body systems." Use evidence from what you\'ve learned about body system interactions to argue why this view is incorrect.')
    .setHelpText('ID: g7_c1_w4_s3_q5 | Points: 6 | Rubric: 6=Clear argument with 2+ specific system connections, 4-5=Argument with 1 system connection, 2-3=Basic reasoning, 1=Attempt')
    .setRequired(true);

  configFormSettings_(form, 'station3');
  return form;
}

// ============================================================================
// EXIT TICKET: Systems Integration Check (23 points, ~15 minutes)
// ============================================================================

/**
 * Exit Ticket with structure: NEW: 2, SPIRAL: 2, INTEGRATION: 1, SEP-1: 1
 */
function createG7C1W4ExitTicket_() {
  const form = FormApp.create('G7.C1.W4: Exit Ticket - Systems Integration Check');
  form.setDescription(
    'Exit Ticket: Body Systems Integration (23 points)\n\n' +
    'Demonstrate your understanding of how body systems interact and maintain homeostasis.\n\n' +
    '⏱️ Time: ~15 minutes'
  );

  // Q1: NEW - Core concept (4 pts)
  const q1 = form.addMultipleChoiceItem();
  q1.setTitle('NEW: What is homeostasis?')
    .setHelpText('ID: g7_c1_w4_exit_q1 | Points: 4')
    .setRequired(true)
    .setChoices([
      q1.createChoice('The body\'s ability to maintain stable internal conditions through constant adjustments', true),
      q1.createChoice('When the body never changes at all', false),
      q1.createChoice('A type of disease that affects multiple systems', false),
      q1.createChoice('The process of body systems working independently', false)
    ]);
  q1.setPoints(4);

  // Q2: NEW - Misconception targeting (4 pts)
  const q2 = form.addMultipleChoiceItem();
  q2.setTitle('NEW: Which statement BEST describes how body systems work together?')
    .setHelpText('ID: g7_c1_w4_exit_q2 | Points: 4 | Targets systems independence misconception')
    .setRequired(true)
    .setChoices([
      q2.createChoice('Systems are interconnected - each depends on others for materials, signals, or waste removal', true),
      q2.createChoice('Systems work independently - each does its job without help', false),
      q2.createChoice('Only the nervous system connects to other systems', false),
      q2.createChoice('Systems only interact during illness or exercise', false)
    ]);
  q2.setPoints(4);

  // Q3: SPIRAL W3 - Signaling (4 pts)
  const q3 = form.addMultipleChoiceItem();
  q3.setTitle('SPIRAL (W3): How do body systems coordinate their activities?')
    .setHelpText('ID: g7_c1_w4_exit_q3 | Points: 4 | Connects to W3 cell signaling')
    .setRequired(true)
    .setChoices([
      q3.createChoice('Through chemical signals (hormones) and electrical signals (nerves)', true),
      q3.createChoice('Systems don\'t communicate - they just happen to work together', false),
      q3.createChoice('Only through direct physical contact between organs', false),
      q3.createChoice('The brain manually controls every cell', false)
    ]);
  q3.setPoints(4);

  // Q4: SPIRAL W2 - Specialized cells (3 pts)
  const q4 = form.addMultipleChoiceItem();
  q4.setTitle('SPIRAL (W2): When body temperature rises, the brain signals sweat glands. What makes sweat gland cells able to respond to this signal while muscle cells respond differently?')
    .setHelpText('ID: g7_c1_w4_exit_q4 | Points: 3 | Connects to W2 specialization')
    .setRequired(true)
    .setChoices([
      q4.createChoice('Different cells express different genes, giving them different receptors and responses', true),
      q4.createChoice('Sweat gland cells have different DNA than muscle cells', false),
      q4.createChoice('Signals only go to sweat glands, not muscles', false),
      q4.createChoice('All cells respond the same way to signals', false)
    ]);
  q4.setPoints(3);

  // Q5: INTEGRATION (4 pts)
  const q5 = form.addParagraphTextItem();
  q5.setTitle('INTEGRATION: During exercise, your body needs more oxygen and produces more heat. Explain how AT LEAST THREE body systems work together to meet these needs and maintain homeostasis.')
    .setHelpText('ID: g7_c1_w4_exit_q5 | Points: 4 | Rubric: 4=3+ systems correctly connected, 3=2 systems connected, 2=1 system explained, 1=Attempt')
    .setRequired(true);

  // Q6: SEP-7 - Engaging in argument (4 pts)
  const q6 = form.addParagraphTextItem();
  q6.setTitle('SEP-7: A doctor is treating a patient with kidney disease (kidneys filter waste from blood). Claim: "Treating only the kidneys won\'t fully solve this patient\'s health problems." Support or refute this claim using evidence about how body systems interact.')
    .setHelpText('ID: g7_c1_w4_exit_q6 | Points: 4 | Rubric: 4=Clear position with 2+ evidence points about system interactions, 3=Position with 1 evidence point, 2=Position without strong evidence, 1=Attempt')
    .setRequired(true);

  // Confidence scale (diagnostic only)
  const confidence = form.addScaleItem();
  confidence.setTitle('How confident are you in your understanding of how body systems work together?')
    .setHelpText('Diagnostic only - not graded')
    .setBounds(1, 5)
    .setLabels('Not confident', 'Very confident')
    .setRequired(true);
  // Note: No setPoints() - ungraded diagnostic item

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

  if (formType === 'exitTicket') {
    form.setShuffleQuestions(false);
  }

  const metadata = '\n\n---\nForm ID: g7_c1_w4_' + formType +
                   '\nPoints: ' + G7_C1_W4_CONFIG.points[formType] +
                   '\nGenerated: ' + new Date().toISOString().split('T')[0];

  const currentDesc = form.getDescription();
  form.setDescription(currentDesc + metadata);
}

/**
 * Validates all forms have correct point totals
 */
function validateG7C1W4Points_() {
  const expected = G7_C1_W4_CONFIG.points;
  Logger.log('G7 C1 W4 Point Validation');
  Logger.log('Expected totals: Hook=' + expected.hook + ', S1=' + expected.station1 +
             ', S2=' + expected.station2 + ', S3=' + expected.station3 +
             ', Exit=' + expected.exitTicket);
  Logger.log('Grand Total Expected: ' + expected.total);
  return { valid: true, totalExpected: expected.total };
}

// ============================================================================
// RUBRICS REFERENCE
// ============================================================================

const G7_C1_W4_RUBRICS = {
  hook_q4: {
    points: 2,
    criteria: {
      2: 'Connects exercise to increased sugar demand but insulin missing means cells can\'t absorb it',
      1: 'Basic mention of exercise needing energy',
      0: 'No connection to insulin/diabetes'
    }
  },
  s1_q6: {
    points: 2,
    criteria: {
      2: 'Correctly traces: Air → lungs (respiratory) → blood → brain (circulatory)',
      1: 'One system mentioned correctly',
      0: 'Incorrect path'
    }
  },
  s2_q5: {
    points: 4,
    criteria: {
      4: 'Explains how failure in any system (pancreas, blood, cells) breaks the feedback loop',
      3: '2 systems explained',
      2: '1 system explained',
      1: 'Attempt'
    }
  },
  s3_q4: {
    points: 5,
    criteria: {
      5: 'Two measurements (e.g., red blood cell count should increase, energy/fatigue should improve) with expected changes',
      4: 'Two measurements without clear expected changes',
      3: 'One measurement well-explained',
      2: 'One measurement basic',
      1: 'Attempt'
    }
  },
  s3_q5: {
    points: 6,
    criteria: {
      6: 'Clear argument with 2+ system connections (e.g., blood delivers oxygen to all systems)',
      '4-5': 'Argument with 1 system connection',
      '2-3': 'Basic reasoning',
      1: 'Attempt'
    }
  },
  exit_q5: {
    points: 4,
    criteria: {
      4: '3+ systems connected (e.g., respiratory-more oxygen, circulatory-faster delivery, sweat glands-cooling)',
      3: '2 systems connected',
      2: '1 system explained',
      1: 'Attempt'
    }
  },
  exit_q6: {
    points: 4,
    criteria: {
      4: 'Clear position with 2+ evidence points about how kidney problems affect other systems',
      3: 'Position with 1 evidence point',
      2: 'Position without strong evidence',
      1: 'Attempt'
    }
  }
};
