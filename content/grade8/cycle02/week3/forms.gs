// ============================================================================
// GRADE 8 PHYSICS - WEEK 3: FORCE, MASS &amp; ACCELERATION (F=ma)
// NGSS-ALIGNED: MS-PS2-2 Investigation Planning
// Research-Based Assessment Design (2024 Evidence-Based Practices)
// ============================================================================
//
// CORRECT STANDARD FOR WEEK 3:
// MS-PS2-2: Plan an investigation to provide evidence that the change in
// an object's motion depends on the sum of the forces on the object and
// the mass of the object.
//
// WHY THIS STANDARD (Not Momentum):
// - Audit finding: Momentum (p=mv) is HIGH SCHOOL content, not MS
// - CSV lists momentum as "Future" learning
// - MS-PS2-2 is required standard currently MISSING from unit
// - DOK 3 (investigation planning) appropriate for Week 3 complexity
//
// RESEARCH PRINCIPLES MAINTAINED:
// ✅ Spaced retrieval practice (Weeks 1-2 review)
// ✅ 3D NGSS assessment (DCI + SEP + CCC)
// ✅ Enhanced feedback (4-6 sentences)
// ✅ Open-ended questions valued (8-10 points with rubrics)
// ✅ Metacognitive reflection
// ✅ Cognitive load optimization (10-15 min forms)
//
// ============================================================================
// CONFIGURATION
// ============================================================================
const CONFIG_GRADE8_WEEK3 = {
  // Teacher Information
  TEACHER_EMAIL: 'louis.rosche@kairosacademies.org',
  TEACHER_NAME: 'Rosche',
  SCHOOL_NAME: 'Kairos Academies',
  // Lesson Information
  SUBJECT: 'Physics',
  GRADE_LEVEL: 'Grade 8',
  UNIT_NAME: 'Investigating Force, Mass &amp; Acceleration',
  WEEK_NUMBER: 3,
  CYCLE_NUMBER: 2,
  // Standards Alignment (CORRECTED)
  NGSS_STANDARDS: [
    'MS-PS2-2: Plan an investigation to provide evidence that the change in an object\'s motion depends on the sum of the forces on the object and the mass of the object'
  ],
  // Crosscutting Concepts (CSV-Specified)
  CROSSCUTTING_CONCEPTS: [
    'CCC7: Stability and Change - Changes in force or mass affect acceleration/motion',
    'CCC3: Scale, Proportion, Quantity - Relationships among F, m, and a',
    'CCC4: Systems - Object as system responding to forces'
  ],
  // Science &amp; Engineering Practices (CSV-Specified)
  SCIENCE_PRACTICES: [
    'SEP3: Planning and Carrying Out Investigations (PRIMARY)',
    'SEP4: Analyzing and Interpreting Data',
    'SEP5: Using Mathematical and Computational Thinking',
    'SEP6: Constructing Explanations'
  ],
  // Disciplinary Core Ideas
  CORE_IDEAS: [
    'PS2.A: The motion of an object is determined by the sum of the forces acting on it',
    'PS2.A: If the forces are unbalanced, the object accelerates',
    'PS2.A: For a given force, acceleration is inversely proportional to mass (F=ma, or a=F/m)'
  ],
  // Form Settings (Research-Based)
  FORMS: {
    COLLECT_EMAIL: true,
    LIMIT_ONE_RESPONSE: true,
    ALLOW_RESPONSE_EDITS: true,
    SHUFFLE_QUESTIONS: false,
    SHOW_PROGRESS_BAR: true,
    SHOW_LINK_TO_RESPOND_AGAIN: false,
    PUBLISH_SUMMARY: true,
    CONFIRMATION_MESSAGE: 'Excellent work! Review your feedback - it shows what you understand well and where to focus next.',
    RELEASE_SCORE_IMMEDIATELY: true,
    TARGET_TIME_MINUTES: 12
  },
  // Grading &amp; Feedback
  THRESHOLDS: {
    EXCELLENT: 0.90,
    GOOD: 0.80,
    PASSING: 0.70,
    NEEDS_SUPPORT: 0.60
  },
  // Research-Based Feedback Structure
  FEEDBACK: {
    EXCELLENT: 'Outstanding scientific thinking! You\'re planning investigations like a real scientist.',
    GOOD: 'Strong work! Your investigation planning shows solid understanding.',
    PASSING: 'Good progress. Focus on the feedback to strengthen your investigation skills.',
    NEEDS_SUPPORT: 'Investigation planning takes practice - review the feedback and ask for help!'
  },
  // Spaced Retrieval Settings
  RETRIEVAL: {
    WEEK1_QUESTIONS_PER_FORM: 2,  // Review N3L
    WEEK2_QUESTIONS_PER_FORM: 1,  // Review KE/Energy
    INTERLEAVE: true
  },
  // Point Allocation (10-20-20-20-20 structure)
  POINTS: {
    PARAGRAPH_ITEMS: 6,           // Investigation planning
    MULTIPLE_CHOICE_3D: 2,
    MULTIPLE_CHOICE_SIMPLE: 1,
    RETRIEVAL_QUESTIONS: 2,
    METACOGNITIVE: 0
  },
  // Drive Organization
  DRIVE: {
    CREATE_FOLDER_STRUCTURE: true,
    PARENT_FOLDER_NAME: 'Grade 8 Physics - C2W3 MS-PS2-2 NGSS-ALIGNED',
    ORGANIZE_BY_DATE: true
  }
};
// ============================================================================
// UTILITY FUNCTIONS (Same as before - API compliant)
// ============================================================================
function validateConfig(config) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(config.TEACHER_EMAIL)) {
    throw new Error('Invalid TEACHER_EMAIL format.');
  }
  Logger.log(`[SUCCESS] Configuration validated for ${config.GRADE_LEVEL}`);
  return true;
}
function createFolderStructure(config) {
  try {
    const timezone = Session.getScriptTimeZone() || 'America/Chicago';
    const timestamp = Utilities.formatDate(new Date(), timezone, 'yyyy-MM-dd');
    const folderName = config.DRIVE.ORGANIZE_BY_DATE
      ? `${config.DRIVE.PARENT_FOLDER_NAME} (${timestamp})`
      : config.DRIVE.PARENT_FOLDER_NAME;
    const folders = DriveApp.getFoldersByName(folderName);
    const parentFolder = folders.hasNext() ? folders.next() : DriveApp.createFolder(folderName);
    const subfolders = ['Forms', 'Responses', 'Analytics', 'Rubrics'];
    subfolders.forEach(name =&gt; {
      try {
        const existing = parentFolder.getFoldersByName(name);
        if (!existing.hasNext()) {
          parentFolder.createFolder(name);
        }
      } catch (e) {
        Logger.log(`[WARNING] Could not create subfolder "${name}": ${e.message}`);
      }
    });
    Logger.log(`[SUCCESS] Folder structure created: ${folderName}`);
    return parentFolder;
  } catch (e) {
    Logger.log(`[ERROR] Failed to create folder structure: ${e.message}`);
    return null;
  }
}
function moveToFolder(file, parentFolder, subfolderName) {
  if (!file || !parentFolder) return;
  try {
    const subfolders = parentFolder.getFoldersByName(subfolderName);
    if (subfolders.hasNext()) {
      const subfolder = subfolders.next();
      file.moveTo(subfolder);
      Logger.log(`[INFO] Moved "${file.getName()}" to "${subfolderName}"`);
    }
  } catch (e) {
    Logger.log(`[ERROR] Failed to move file: ${e.message}`);
  }
}
function configureForm(form, title, description, config) {
  if (!form) throw new Error('configureForm: form parameter is required');
  try {
    form.setTitle(title)
        .setDescription(description)
        .setCollectEmail(config.FORMS.COLLECT_EMAIL)
        .setLimitOneResponsePerUser(config.FORMS.LIMIT_ONE_RESPONSE)
        .setAllowResponseEdits(config.FORMS.ALLOW_RESPONSE_EDITS)
        .setProgressBar(config.FORMS.SHOW_PROGRESS_BAR)
        .setShowLinkToRespondAgain(config.FORMS.SHOW_LINK_TO_RESPOND_AGAIN)
        .setPublishingSummary(config.FORMS.PUBLISH_SUMMARY)
        .setConfirmationMessage(config.FORMS.CONFIRMATION_MESSAGE)
        .setIsQuiz(true)
        .setShuffleQuestions(config.FORMS.SHUFFLE_QUESTIONS);
    return form;
  } catch (e) {
    Logger.log(`[ERROR] Failed to configure form: ${e.message}`);
    throw e;
  }
}
function createEnhancedFeedback(isCorrect, components, config) {
  let feedback = '';
  if (isCorrect) {
    if (components.confirmation) feedback += components.confirmation + ' ';
    if (components.elaboration) feedback += components.elaboration + '\n\n';
    if (components.conceptConnection) feedback += 'BIG IDEA: ' + components.conceptConnection + '\n\n';
    if (components.nextStep) feedback += 'NEXT: ' + components.nextStep;
    if (components.resource) feedback += '\n\nLEARN MORE: ' + components.resource;
  } else {
    if (components.gentleCorrection) feedback += components.gentleCorrection + ' ';
    if (components.explanation) feedback += components.explanation + '\n\n';
    if (components.misconception) feedback += 'COMMON MISTAKE: ' + components.misconception + '\n\n';
    if (components.hint) feedback += 'HINT: ' + components.hint;
    if (components.resource) feedback += '\n\nREVIEW: ' + components.resource;
  }
  return FormApp.createFeedback().setText(feedback.trim()).build();
}
/**
 * Validates and truncates help text to safe limits
 * @param {string} text - The help text to validate
 * @param {number} maxLength - Maximum safe length (default 800)
 * @returns {string} - Validated/truncated text
 */
function validateHelpText(text, maxLength) {
  maxLength = maxLength || 800; // Conservative limit
  // Remove problematic Unicode characters (emojis, special chars)
  const cleaned = text.replace(/[^\x00-\x7F]/g, ''); // ASCII only
  if (cleaned.length &gt; maxLength) {
    Logger.log('[WARNING] Help text truncated from ' + cleaned.length + ' to ' + maxLength + ' chars');
    return cleaned.substring(0, maxLength - 3) + '...';
  }
  return text; // Return original if within limits and no issues
}
/**
 * Removes all emojis and non-ASCII characters from text
 * @param {string} text - The text to clean
 * @returns {string} - ASCII-only text
 */
function removeEmojis(text) {
  return text.replace(/[^\x00-\x7F]/g, '');
}
function addMetacognitiveReflection(form, topic) {
  try {
    form.addSectionHeaderItem()
      .setTitle('🧠 Metacognitive Reflection')
      .setHelpText('Research shows: thinking ABOUT your thinking improves learning!');
  } catch (e) {
    Logger.log(`[WARNING] Could not add metacognitive header: ${e.message}`);
  }
  const q1 = form.addMultipleChoiceItem()
    .setTitle(`What strategy helped you MOST when ${topic}?`)
    .setHelpText('Knowing your strategies helps you learn more effectively.');
  q1.setChoices([
    q1.createChoice('Drew diagrams showing forces and motion'),
    q1.createChoice('Made a data table to organize variables'),
    q1.createChoice('Thought of similar investigations from class'),
    q1.createChoice('Asked myself: What am I changing? What am I measuring?'),
    q1.createChoice('Used multiple strategies together')
  ]);
  q1.setRequired(true);
  form.addParagraphTextItem()
    .setTitle('What part of investigation planning is MOST confusing to you, and WHY?')
    .setHelpText('Example: "I understand changing force, but I\'m confused about how to measure acceleration."')
    .setRequired(true);
  const q2 = form.addMultipleChoiceItem()
    .setTitle('How will you prepare to plan investigations in the future?')
    .setHelpText('Planning your study strategies');
  q2.setChoices([
    q2.createChoice('Practice identifying independent and dependent variables'),
    q2.createChoice('Review examples of well-designed investigations'),
    q2.createChoice('Ask my teacher for feedback on my investigation plans'),
    q2.createChoice('Study how to control variables'),
    q2.createChoice('Combination of these strategies')
  ]);
  q2.setRequired(true);
  Logger.log('[INFO] Added metacognitive reflection questions');
}
// ============================================================================
// GRADE 8 - FORM 1: HOOK - INTRODUCING F=ma RELATIONSHIP
// ============================================================================
function createGrade8_Hook_NGSS() {
  Logger.log('[INFO] Creating Grade 8 Hook Form (NGSS MS-PS2-2)...');
  try {
    const form = FormApp.create('G8.C2.W3: Hook - The F=ma Investigation Question');
    const parentFolder = CONFIG_GRADE8_WEEK3.DRIVE.CREATE_FOLDER_STRUCTURE
      ? createFolderStructure(CONFIG_GRADE8_WEEK3)
      : null;
    configureForm(
      form,
      'Hook: What Affects How Objects Accelerate?',
      `Welcome to Week 3! This week you'll plan REAL investigations.\n\n` +
      `Building on:\n` +
      `• Week 1: Newton's 3rd Law - forces come in pairs\n` +
      `• Week 2: Kinetic Energy - motion and energy relate\n` +
      `• Week 3: How do FORCE and MASS affect ACCELERATION?\n\n` +
      `⏱️ Time: ~${CONFIG_GRADE8_WEEK3.FORMS.TARGET_TIME_MINUTES} minutes | 📊 Points: 32\n` +
      `🎯 Standard: ${CONFIG_GRADE8_WEEK3.NGSS_STANDARDS[0]}\n\n` +
      `INVESTIGATION QUESTION:\n` +
      `If you push objects with different forces or different masses, how does their acceleration change?`,
      CONFIG_GRADE8_WEEK3
    );
    // SPACED RETRIEVAL: Week 1
    try {
      form.addSectionHeaderItem()
        .setTitle('📚 Review: Week 1 - Newton\'s Third Law')
        .setHelpText('Start by retrieving what you learned about forces...');
    } catch (e) {}
    const r1 = form.addMultipleChoiceItem()
      .setTitle('[WEEK 1 REVIEW] Two students push on each other while ice skating. Student A (50 kg) and Student B (80 kg) push with equal force. According to N3L, what happens?')
      .setHelpText('🔗 CCC: Systems | Remember: action-reaction pairs');
    r1.setChoices([
      r1.createChoice('Both experience equal force, but Student A accelerates MORE (less mass)', true),
      r1.createChoice('Student B accelerates more because they\'re heavier', false),
      r1.createChoice('Both accelerate equally', false),
      r1.createChoice('Cannot determine without knowing the force value', false)
    ]);
    r1.setRequired(true);
    r1.setPoints(2);
    r1.setFeedbackForCorrect(createEnhancedFeedback(true, {
      confirmation: 'Excellent recall!',
      elaboration: 'N3L: Equal forces. But you recognized that MASS affects the result! Student A (50 kg) experiences greater acceleration than Student B (80 kg) under the same force.',
      conceptConnection: 'This hints at Week 3\'s focus: How does mass affect acceleration when force is constant? You\'ll investigate this scientifically!',
      nextStep: 'Today you\'ll learn to PLAN investigations to test exactly this relationship.',
      resource: 'Week 1 Exit Ticket explored this same scenario.'
    }, CONFIG_GRADE8_WEEK3));
    r1.setFeedbackForIncorrect(createEnhancedFeedback(false, {
      gentleCorrection: 'Think about two things:',
      explanation: '(1) N3L: forces are equal. (2) But mass matters! If F is same but m is different, then a must be different (from F=ma).',
      misconception: 'Many think heavier objects accelerate more under equal force, but it\'s the opposite: smaller mass = bigger acceleration when F is constant.',
      hint: 'Which is easier to push and speed up: a 50 kg person or an 80 kg person?',
      resource: 'Review Week 1 Station 2 where you compared accelerations.'
    }, CONFIG_GRADE8_WEEK3));
    // SPACED RETRIEVAL: Week 2
    const r2 = form.addMultipleChoiceItem()
      .setTitle('[WEEK 2 REVIEW] A 1000 kg car accelerates from 0 to 20 m/s. Its KE changes from 0 to 200,000 J. What caused this change in KE?')
      .setHelpText('🔗 CCC: Energy and Matter | Connect energy to motion');
    r2.setChoices([
      r2.createChoice('A net FORCE acted on the car, causing acceleration and increasing KE', true),
      r2.createChoice('The car\'s mass increased', false),
      r2.createChoice('Time passing naturally increases KE', false),
      r2.createChoice('Friction created the energy', false)
    ]);
    r2.setRequired(true);
    r2.setPoints(2);
    r2.setFeedbackForCorrect(createEnhancedFeedback(true, {
      confirmation: 'Perfect connection!',
      elaboration: 'Force causes acceleration -&gt; velocity increases -&gt; KE increases (KE = ½mv²). This week you\'ll investigate HOW MUCH force is needed for specific accelerations.',
      conceptConnection: 'ENERGY-FORCE CONNECTION: Forces do work, transferring energy and changing motion. Week 3 focuses on the force-acceleration relationship.',
      nextStep: 'Next: Explore what variables affect acceleration.',
      resource: 'Week 2 Station 2 showed energy changes in collisions - same principle!'
    }, CONFIG_GRADE8_WEEK3));
    r2.setFeedbackForIncorrect(createEnhancedFeedback(false, {
      gentleCorrection: 'What causes acceleration?',
      explanation: 'Objects don\'t speed up on their own. A NET FORCE must act to cause acceleration. That acceleration increases velocity, which increases KE.',
      misconception: 'Energy doesn\'t appear spontaneously. Forces transfer energy by doing work on objects.',
      hint: 'Week 2: Energy changes when forces act. What makes a car speed up?',
      resource: 'Review Week 2 Do Now about what causes motion changes.'
    }, CONFIG_GRADE8_WEEK3));
    // NEW CONTENT: Investigation Preview
    try {
      form.addPageBreakItem().setTitle('Week 3: Investigation Planning');
      form.addSectionHeaderItem()
        .setTitle('🔬 This Week: Planning Scientific Investigations')
        .setHelpText('MS-PS2-2: Plan an investigation to provide evidence that force and mass affect motion.\n\n' +
                     'You\'ll learn to design experiments testing:\n' +
                     '• How changing FORCE affects acceleration (when mass is constant)\n' +
                     '• How changing MASS affects acceleration (when force is constant)\n\n' +
                     'This is how real scientists work!');
    } catch (e) {}
    // 3D QUESTION: Pre-assessment
    const q1 = form.addMultipleChoiceItem()
      .setTitle('PREDICTION: If you double the force on an object (keeping mass constant), what happens to its acceleration?')
      .setHelpText('🧪 SEP: Asking Questions | Make a prediction before investigating!');
    q1.setChoices([
      q1.createChoice('Acceleration doubles (if F↑2×, then a↑2× when m is constant)', true),
      q1.createChoice('Acceleration stays the same', false),
      q1.createChoice('Acceleration quadruples', false),
      q1.createChoice('Cannot predict without more information', false)
    ]);
    q1.setRequired(true);
    q1.setPoints(1);
    q1.setFeedbackForCorrect(createEnhancedFeedback(true, {
      confirmation: 'Great scientific prediction!',
      elaboration: 'You predicted a PROPORTIONAL relationship: F and a change together. This is what F=ma suggests (when m is constant, F ∝ a).',
      conceptConnection: 'PROPORTIONAL RELATIONSHIPS: When one variable increases, the other increases by the same factor. This is a key pattern in physics.',
      nextStep: 'Station 1 will have you PLAN an investigation to TEST this prediction!',
      resource: 'Math class: direct proportions show this y = kx relationship.'
    }, CONFIG_GRADE8_WEEK3));
    q1.setFeedbackForIncorrect(createEnhancedFeedback(false, {
      gentleCorrection: 'Think about proportional relationships...',
      explanation: 'From F = ma, if m stays constant: F₁ = ma₁ and F₂ = ma₂. If F₂ = 2F₁, then 2F₁ = ma₂, so a₂ = 2a₁. Acceleration doubles!',
      misconception: 'Force and acceleration have a DIRECT relationship when mass is constant. They change together proportionally.',
      hint: 'If you push twice as hard, does the object speed up twice as fast?',
      resource: 'This is similar to Week 2 graphs showing proportional relationships.'
    }, CONFIG_GRADE8_WEEK3));
    // INVESTIGATION PLANNING INTRO (High Points)
    const q2 = form.addParagraphTextItem()
      .setTitle('INVESTIGATION BRAINSTORM: You want to test how MASS affects acceleration.\n\n' +
                'Describe a simple investigation you could do. Include:\n' +
                '1. What would you CHANGE (independent variable)?\n' +
                '2. What would you MEASURE (dependent variable)?\n' +
                '3. What would you KEEP THE SAME (controlled variables)?\n' +
                '4. How would you measure acceleration?')
      .setHelpText('🧪 SEP: Planning Investigations\n' +
                   '🔗 CCC: Stability and Change - How does changing mass affect motion?\n\n' +
                   'Be specific! Example equipment: carts, ramps, stopwatches, masses.\n' +
                   'Write 4-6 sentences.');
    q2.setRequired(true);
    q2.setValidation(
      FormApp.createParagraphTextValidation()
        .requireTextLengthGreaterThanOrEqualTo(120)
        .build()
    );
    q2.setPoints(5); // Highest value - investigation planning is core skill
    try {
      form.addSectionHeaderItem()
        .setTitle('⚖️ RUBRIC (Teacher Grading):')
        .setHelpText('10pts: Identifies IV (mass), DV (acceleration), controls (force, surface), measurement method + clear procedure\n' +
                     '8pts: Has IV/DV/controls but measurement unclear\n' +
                     '6pts: Missing controls or measurement method\n' +
                     '4pts: Vague variables\n' +
                     '0pts: Off-topic');
    } catch (e) {}
    // Metacognition
    addMetacognitiveReflection(form, 'thinking about investigation planning');
    if (parentFolder) {
      try {
        moveToFolder(DriveApp.getFileById(form.getId()), parentFolder, 'Forms');
      } catch (e) {}
    }
    Logger.log(`[SUCCESS] Hook created: ${form.getPublishedUrl()}`);
    return form;
  } catch (e) {
    Logger.log(`[ERROR] Failed to create Hook: ${e.message}`);
    throw e;
  }
}
// ============================================================================
// GRADE 8 - FORM 2: STATION 1 - PLAN FORCE INVESTIGATION
// ============================================================================
function createGrade8_Station1_NGSS() {
  Logger.log('[INFO] Creating Grade 8 Station 1 (MS-PS2-2)...');
  try {
    const form = FormApp.create('G8.C2.W3: Station 1 - Plan Force Investigation');
    const parentFolder = CONFIG_GRADE8_WEEK3.DRIVE.CREATE_FOLDER_STRUCTURE
      ? createFolderStructure(CONFIG_GRADE8_WEEK3)
      : null;
    configureForm(
      form,
      'Station 1: How Does Force Affect Acceleration?',
      `Design an investigation to test: What happens to acceleration when force changes?\n\n` +
      `⏱️ Time: ~14 minutes | 📊 Points: 40\n` +
      `🎯 SEP3: Planning and Carrying Out Investigations\n\n` +
      `YOUR TASK: Plan a detailed investigation where you VARY FORCE and measure how acceleration changes.\n\n` +
      `EQUIPMENT OPTIONS (Choose one):\n` +
      `• Physical: carts, ramps, masses, spring scales OR force sensors, metersticks, stopwatches\n` +
      `• Digital: PhET "Forces and Motion: Basics" simulation\n\n` +
      `You'll justify your equipment choice!`,
      CONFIG_GRADE8_WEEK3
    );
    // SPACED RETRIEVAL
    try {
      form.addSectionHeaderItem()
        .setTitle('📚 Warm-Up: Retrieve Prior Knowledge')
        .setHelpText('Start by connecting to what you already know...');
    } catch (e) {}
    const r1 = form.addMultipleChoiceItem()
      .setTitle('[WEEK 1 REVIEW] Newton\'s 3rd Law states forces come in pairs. In an investigation with carts, if you PUSH a cart with 10 N of force, how much force does the cart push BACK on you?')
      .setHelpText('🔗 CCC: Systems');
    r1.setChoices([
      r1.createChoice('10 N (action-reaction pairs are always equal)', true),
      r1.createChoice('0 N (the cart doesn\'t push back)', false),
      r1.createChoice('Less than 10 N (the cart is lighter)', false),
      r1.createChoice('More than 10 N (depends on cart mass)', false)
    ]);
    r1.setRequired(true);
    r1.setPoints(2);
    r1.setFeedbackForCorrect(createEnhancedFeedback(true, {
      confirmation: 'Perfect recall!',
      elaboration: 'N3L: Forces ALWAYS come in equal pairs. This is true regardless of mass. The cart pushes back with exactly 10 N.',
      conceptConnection: 'This matters for investigations: When you apply force to an object, it applies equal force back. But the EFFECTS (acceleration) depend on mass!',
      nextStep: 'Today you\'ll investigate how changing the force affects acceleration.',
      resource: 'Week 1 Station 1 covered force pairs in detail.'
    }, CONFIG_GRADE8_WEEK3));
    r1.setFeedbackForIncorrect(createEnhancedFeedback(false, {
      gentleCorrection: 'Remember Newton\'s 3rd Law...',
      explanation: 'Action-reaction force pairs are ALWAYS equal in magnitude. The cart pushes back with the same 10 N you applied.',
      misconception: 'Mass affects ACCELERATION, not the force pairs themselves. N3L forces are always equal.',
      hint: 'If you push a wall with 50 N, how hard does the wall push back?',
      resource: 'Review Week 1 Hook question about N3L force pairs.'
    }, CONFIG_GRADE8_WEEK3));
    const r2 = form.addMultipleChoiceItem()
      .setTitle('[WEEK 2 REVIEW] A 500 kg cart accelerates from 0 to 4 m/s. Its kinetic energy increases from 0 to 4,000 J. What CAUSED this energy increase?')
      .setHelpText('🔗 CCC: Energy and Matter');
    r2.setChoices([
      r2.createChoice('A net FORCE acted on the cart, causing acceleration and increasing KE', true),
      r2.createChoice('The cart\'s mass increased', false),
      r2.createChoice('Time naturally increases energy', false),
      r2.createChoice('The cart converted PE to KE', false)
    ]);
    r2.setRequired(true);
    r2.setPoints(2);
    r2.setFeedbackForCorrect(createEnhancedFeedback(true, {
      confirmation: 'Excellent connection!',
      elaboration: 'Force causes acceleration -&gt; velocity increases -&gt; KE increases. Today you\'ll investigate HOW MUCH force is needed for specific accelerations.',
      conceptConnection: 'ENERGY-FORCE LINK: Forces transfer energy. This week focuses on the force-acceleration relationship (F=ma), which connects to energy (KE=½mv²).',
      nextStep: 'Your investigation will show the direct relationship between force and acceleration!',
      resource: 'Week 2 Station 1 showed KE calculations - same energy concept!'
    }, CONFIG_GRADE8_WEEK3));
    r2.setFeedbackForIncorrect(createEnhancedFeedback(false, {
      gentleCorrection: 'What makes objects speed up?',
      explanation: 'Objects need a NET FORCE to accelerate. That acceleration increases velocity, which increases KE. Energy doesn\'t appear spontaneously!',
      misconception: 'Time doesn\'t create energy. Mass changes weren\'t mentioned. PE conversion requires height difference (not mentioned).',
      hint: 'Week 2: What makes a car speed up from 0 to 4 m/s?',
      resource: 'Review Week 2 Do Now about forces causing motion changes.'
    }, CONFIG_GRADE8_WEEK3));
    // INVESTIGATION PLANNING - VARIABLES
    try {
      form.addPageBreakItem().setTitle('Investigation Design');
      form.addSectionHeaderItem()
        .setTitle('🔬 Planning Your Force Investigation')
        .setHelpText('SCENARIO: You have equipment to test how force affects acceleration.\n\n' +
                     'Your goal: Change FORCE, measure acceleration, keep everything else the SAME.\n\n' +
                     'Remember: Good investigations require clear IV, DV, and controlled variables!');
    } catch (e) {}
    const q1 = form.addMultipleChoiceItem()
      .setTitle('In an investigation testing "How does force affect acceleration?", identify the variables:\n\n' +
                'You will push a cart with different amounts of force (small push, medium push, hard push) and measure how fast it accelerates.')
      .setHelpText('🧪 SEP3: Planning Investigations\n🔗 CCC7: What changes? What stays stable?');
    q1.setChoices([
      q1.createChoice('IV: Force applied | DV: Acceleration | Controls: Mass, surface, ramp angle', true),
      q1.createChoice('IV: Acceleration | DV: Force applied | Controls: Mass', false),
      q1.createChoice('IV: Mass | DV: Acceleration | Controls: Force applied', false),
      q1.createChoice('IV: Force | DV: Mass | Controls: Acceleration', false)
    ]);
    q1.setRequired(true);
    q1.setPoints(2);
    q1.setFeedbackForCorrect(createEnhancedFeedback(true, {
      confirmation: 'Perfect variable identification!',
      elaboration: 'You correctly identified: CHANGE force (IV), MEASURE acceleration (DV), KEEP SAME mass, surface, angle (controls). This ensures a FAIR TEST!',
      conceptConnection: 'FAIR TESTING: Change ONE variable, measure the effect, control everything else. This isolates the force-acceleration relationship.',
      nextStep: 'Next: Write the detailed procedure for this investigation.',
      resource: 'Variable identification is a key skill in SEP3: Planning Investigations.'
    }, CONFIG_GRADE8_WEEK3));
    q1.setFeedbackForIncorrect(createEnhancedFeedback(false, {
      gentleCorrection: 'Think about what you CHANGE vs. what you MEASURE...',
      explanation: 'IV (Independent) = what YOU change. DV (Dependent) = what you MEASURE as a result. Controls = what you KEEP THE SAME. You change force, measure acceleration.',
      misconception: 'Mixing up IV and DV is common. Remember: "I change the IV to see how it affects the DV."',
      hint: 'What are you purposely changing? (That\'s IV) What are you measuring as a result? (That\'s DV)',
      resource: 'Review Hook question about variables in investigations.'
    }, CONFIG_GRADE8_WEEK3));
    // EQUIPMENT CHOICE
    const q2 = form.addMultipleChoiceItem()
      .setTitle('Which equipment setup is BEST for measuring acceleration of a cart?\n\n' +
                'Option A: Measure distance traveled and time with meterstick and stopwatch, calculate a = 2d/t²\n' +
                'Option B: Use motion sensor or photogate to directly measure velocity changes\n' +
                'Option C: Estimate acceleration by watching how fast cart moves\n' +
                'Option D: Use PhET simulation which shows acceleration value directly')
      .setHelpText('🧪 SEP3: Selecting appropriate tools | Think about accuracy and precision');
    q2.setChoices([
      q2.createChoice('Options A, B, or D are all acceptable (A/B = physical, D = digital; C is too vague)', true),
      q2.createChoice('Only Option A (most traditional method)', false),
      q2.createChoice('Only Option D (most accurate)', false),
      q2.createChoice('Option C is fine for middle school level', false)
    ]);
    q2.setRequired(true);
    q2.setPoints(2);
    q2.setFeedbackForCorrect(createEnhancedFeedback(true, {
      confirmation: 'Excellent scientific thinking!',
      elaboration: 'You recognized that MULTIPLE methods can work! Physical measurement (A/B) and digital simulation (D) both provide quantitative data. Option C (visual estimate) is too imprecise for science.',
      conceptConnection: 'TOOL SELECTION: Scientists choose tools based on: availability, precision needed, and context. Different tools, same investigation!',
      nextStep: 'You\'ll justify YOUR equipment choice in the procedure question.',
      resource: 'Authentic science allows multiple valid approaches - like real research!'
    }, CONFIG_GRADE8_WEEK3));
    q2.setFeedbackForIncorrect(createEnhancedFeedback(false, {
      gentleCorrection: 'Consider what makes a measurement scientific...',
      explanation: 'Scientific measurements must be QUANTITATIVE (numbers) and REPEATABLE. Option C (watching) is too vague. Options A, B, D all give numerical acceleration values.',
      misconception: 'There\'s not always ONE "best" method. Multiple approaches can work if they\'re precise and quantitative.',
      hint: 'Which options give you actual NUMBERS for acceleration?',
      resource: 'SEP3 involves selecting appropriate tools - consider precision and availability.'
    }, CONFIG_GRADE8_WEEK3));
    // PROCEDURE WRITING (12 POINTS - HIGHEST VALUE)
    const q3 = form.addParagraphTextItem()
      .setTitle('PROCEDURE WRITING: Write a detailed, numbered procedure (8-10 steps) for investigating how force affects acceleration.\n\n' +
                'Your procedure MUST include:\n' +
                '1. Materials list (specify physical equipment OR PhET simulation)\n' +
                '2. Setup description\n' +
                '3. How you will VARY force (IV) - be specific!\n' +
                '4. How you will MEASURE acceleration (DV) - be specific!\n' +
                '5. What you will CONTROL (controls)\n' +
                '6. Number of trials for each force level\n' +
                '7. How you will record data (table structure)\n' +
                '8. Safety considerations (if using physical equipment)\n\n' +
                'Write 8-10 numbered steps. Be precise enough that another student could follow your procedure!')
      .setHelpText('🧪 SEP3: Planning Investigations (CORE SKILL)\n' +
                   '🔗 CCC7: How will changing force show stability/change in motion?\n\n' +
                   'Example start: "1. Materials: Cart, ramp, 3 different masses to use as pushers (100g, 200g, 300g), meterstick, stopwatch..."');
    q3.setRequired(true);
    q3.setValidation(
      FormApp.createParagraphTextValidation()
        .requireTextLengthGreaterThanOrEqualTo(300)
        .setHelpText('Write at least 300 characters (8-10 detailed steps).')
        .build()
    );
    q3.setPoints(8); // Highest - this IS MS-PS2-2
    try {
      form.addSectionHeaderItem()
        .setTitle('⚖️ RUBRIC (Teacher Grading):')
        .setHelpText('12pts: All 8 components present + numbered steps + clear/precise + safe + another student could replicate\n' +
                     '10pts: 7/8 components + mostly clear\n' +
                     '8pts: 6/8 components + some vague steps\n' +
                     '6pts: 4-5 components + unclear procedure\n' +
                     '4pts: &lt;4 components OR not numbered\n' +
                     '0pts: Off-topic or missing');
    } catch (e) {}
    // DATA TABLE DESIGN
    const q4 = form.addMultipleChoiceItem()
      .setTitle('Which data table structure is BEST for recording your force investigation results?\n\n' +
                'A) Columns: Trial# | Force | Acceleration\n' +
                'B) Columns: Force Applied | Trial 1 Acceleration | Trial 2 Acceleration | Trial 3 Acceleration | Average Acceleration\n' +
                'C) Columns: Time | Distance | Acceleration\n' +
                'D) Just write observations in sentences')
      .setHelpText('🧪 SEP3: Planning data collection | Think about organization');
    q4.setChoices([
      q4.createChoice('Option B (shows all trials + average for each force level)', true),
      q4.createChoice('Option A (simple but doesn\'t show multiple trials clearly)', false),
      q4.createChoice('Option C (missing the IV: force applied)', false),
      q4.createChoice('Option D (qualitative, not quantitative)', false)
    ]);
    q4.setRequired(true);
    q4.setPoints(2);
    q4.setFeedbackForCorrect(createEnhancedFeedback(true, {
      confirmation: 'Excellent data organization!',
      elaboration: 'Option B shows: (1) Each force level, (2) All trials visible, (3) Average calculated. This makes patterns easy to see and shows your work!',
      conceptConnection: 'DATA ORGANIZATION: Good tables show IV clearly, all trials transparently, and calculated averages for analysis.',
      nextStep: 'Station 3 will give you sample data in this format to analyze!',
      resource: 'Data tables are essential for SEP4: Analyzing and Interpreting Data.'
    }, CONFIG_GRADE8_WEEK3));
    q4.setFeedbackForIncorrect(createEnhancedFeedback(false, {
      gentleCorrection: 'Think about what makes data easy to analyze...',
      explanation: 'Best tables show: (1) IV in first column (force), (2) Multiple trials visible (not hidden), (3) Averages calculated. Option B does all three!',
      misconception: 'Option A works but doesn\'t show multiple trials clearly. Option C is missing force. Option D isn\'t quantitative.',
      hint: 'Scientists run multiple trials and calculate averages - which table shows this best?',
      resource: 'Good data organization makes analysis easier in Station 3!'
    }, CONFIG_GRADE8_WEEK3));
    // PREDICTION WITH JUSTIFICATION
    const q5 = form.addMultipleChoiceItem()
      .setTitle('PREDICTION: If you triple the force on a cart (keeping mass constant), what will happen to acceleration? Use F=ma to explain.')
      .setHelpText('🔢 SEP5: Using Mathematics | 🔗 CCC3: Proportional relationships');
    q5.setChoices([
      q5.createChoice('Acceleration triples (F=ma: if F goes 3×, then a goes 3× when m is constant)', true),
      q5.createChoice('Acceleration stays the same (force doesn\'t affect acceleration)', false),
      q5.createChoice('Acceleration increases but not by 3× (relationship isn\'t linear)', false),
      q5.createChoice('Cannot predict without knowing the mass value', false)
    ]);
    q5.setRequired(true);
    q5.setPoints(1);
    q5.setFeedbackForCorrect(createEnhancedFeedback(true, {
      confirmation: 'Perfect mathematical reasoning!',
      elaboration: 'From F=ma: If F₁=ma₁ and F₂=3F₁, then 3F₁=ma₂, so a₂=3a₁. DIRECT PROPORTION: F and a change together proportionally when m is constant!',
      conceptConnection: 'PROPORTIONAL RELATIONSHIPS (CCC3): When variables have a direct relationship, they change by the same factor. This is a fundamental pattern in physics.',
      nextStep: 'Your investigation will TEST this prediction with real or simulated data!',
      resource: 'Math class: y=kx shows direct proportions. Here F=ma shows F∝a when m is constant.'
    }, CONFIG_GRADE8_WEEK3));
    q5.setFeedbackForIncorrect(createEnhancedFeedback(false, {
      gentleCorrection: 'Use F=ma to think through this...',
      explanation: 'F=ma can be written as F₁=ma₁ for first force and F₂=ma₂ for second force. If F₂=3F₁ and m stays same, then a₂ must equal 3a₁. They\'re proportional!',
      misconception: 'F and a DO have a direct linear relationship when m is constant. It\'s a proportion: doubling F doubles a, tripling F triples a.',
      hint: 'If you push 3× harder, does the cart speed up 3× faster (when mass stays the same)?',
      resource: 'This is the CORE relationship you\'ll investigate!'
    }, CONFIG_GRADE8_WEEK3));
    // SAFETY &amp; ETHICS
    const q6 = form.addMultipleChoiceItem()
      .setTitle('What safety considerations are important for a physical cart investigation? (Select the BEST answer)')
      .setHelpText('🧪 SEP3: Safety is part of investigation planning');
    q6.setChoices([
      q6.createChoice('Keep floor clear of trip hazards, prevent cart from rolling off table, don\'t apply excessive force that could damage equipment', true),
      q6.createChoice('Wear safety goggles and lab coat', false),
      q6.createChoice('No safety concerns - carts are safe', false),
      q6.createChoice('Only the teacher should handle the cart', false)
    ]);
    q6.setRequired(true);
    q6.setPoints(1);
    q6.setFeedbackForCorrect(createEnhancedFeedback(true, {
      confirmation: 'Good safety thinking!',
      elaboration: 'You identified realistic hazards: trip hazards (carts on floor), falling (cart off table), equipment damage (excessive force). These are appropriate precautions!',
      conceptConnection: 'SAFETY IN SCIENCE: Identify realistic hazards and take appropriate precautions. Not every lab needs goggles, but all need thought about potential risks.',
      nextStep: 'Include safety considerations in your procedure when appropriate.',
      resource: 'SEP3 includes safety planning as part of professional investigation design.'
    }, CONFIG_GRADE8_WEEK3));
    q6.setFeedbackForIncorrect(createEnhancedFeedback(false, {
      gentleCorrection: 'Think about realistic hazards...',
      explanation: 'Cart investigations don\'t involve chemicals (no goggles needed), but DO involve: moving objects (trip hazard), falling risks (off tables), and equipment damage (excessive force).',
      misconception: 'Not all labs need goggles. Safety should match the actual hazards. Students CAN handle carts safely with proper precautions.',
      hint: 'What could actually go wrong with carts rolling on ramps?',
      resource: 'Good safety planning is specific to the actual investigation hazards.'
    }, CONFIG_GRADE8_WEEK3));
    // METACOGNITION
    addMetacognitiveReflection(form, 'planning this force investigation');
    if (parentFolder) {
      try {
        moveToFolder(DriveApp.getFileById(form.getId()), parentFolder, 'Forms');
      } catch (e) {}
    }
    Logger.log(`[SUCCESS] Station 1 created: ${form.getPublishedUrl()}`);
    return form;
  } catch (e) {
    Logger.log(`[ERROR] Failed to create Station 1: ${e.message}`);
    throw e;
  }
}
// ============================================================================
// GRADE 8 - FORM 3: STATION 2 - PLAN MASS INVESTIGATION
// ============================================================================
function createGrade8_Station2_NGSS() {
  Logger.log('[INFO] Creating Grade 8 Station 2 (MS-PS2-2)...');
  try {
    const form = FormApp.create('G8.C2.W3: Station 2 - Plan Mass Investigation');
    const parentFolder = CONFIG_GRADE8_WEEK3.DRIVE.CREATE_FOLDER_STRUCTURE
      ? createFolderStructure(CONFIG_GRADE8_WEEK3)
      : null;
    configureForm(
      form,
      'Station 2: How Does Mass Affect Acceleration?',
      `Design an investigation to test: What happens to acceleration when mass changes?\n\n` +
      `⏱️ Time: ~14 minutes | 📊 Points: 38\n` +
      `🎯 SEP3: Planning and Carrying Out Investigations\n\n` +
      `YOUR TASK: Plan a detailed investigation where you VARY MASS and measure how acceleration changes.\n\n` +
      `EQUIPMENT OPTIONS (Choose one):\n` +
      `• Physical: carts, ramps, masses to add to cart, constant force (hanging mass or spring), metersticks, stopwatches\n` +
      `• Digital: PhET "Forces and Motion: Basics" simulation\n\n` +
      `CHALLENGE: You must keep FORCE CONSTANT while changing mass!`,
      CONFIG_GRADE8_WEEK3
    );
    // SPACED RETRIEVAL
    try {
      form.addSectionHeaderItem()
        .setTitle('📚 Warm-Up: Retrieve Prior Knowledge')
        .setHelpText('Connect to what you\'ve learned in previous weeks...');
    } catch (e) {}
    const r1 = form.addMultipleChoiceItem()
      .setTitle('[WEEK 1 REVIEW] Two ice skaters push off each other. Skater A (40 kg) and Skater B (80 kg). According to N3L, the forces are equal. Who accelerates MORE?')
      .setHelpText('🔗 CCC: Systems | Think about mass and acceleration');
    r1.setChoices([
      r1.createChoice('Skater A (40 kg) accelerates more - same force, less mass means greater acceleration', true),
      r1.createChoice('Skater B (80 kg) accelerates more - more mass means more acceleration', false),
      r1.createChoice('Both accelerate equally - forces are equal', false),
      r1.createChoice('Cannot determine without knowing the force value', false)
    ]);
    r1.setRequired(true);
    r1.setPoints(2);
    r1.setFeedbackForCorrect(createEnhancedFeedback(true, {
      confirmation: 'Perfect reasoning!',
      elaboration: 'N3L: Equal forces (action-reaction). But from F=ma, if F is same and m is smaller, then a must be LARGER. Skater A (40 kg) has less mass, so greater acceleration!',
      conceptConnection: 'INVERSE RELATIONSHIP: When force is constant, mass and acceleration are inversely proportional. Half the mass = double the acceleration. This is what you\'ll investigate today!',
      nextStep: 'Today\'s investigation: Test how changing mass affects acceleration when force stays constant.',
      resource: 'This connects to Week 1 Station 2 where you compared different mass accelerations.'
    }, CONFIG_GRADE8_WEEK3));
    r1.setFeedbackForIncorrect(createEnhancedFeedback(false, {
      gentleCorrection: 'Two key ideas here...',
      explanation: '(1) N3L: forces ARE equal. (2) But F=ma means a = F/m. Same F, smaller m = BIGGER a. Skater A (less mass) accelerates MORE!',
      misconception: 'More mass doesn\'t mean more acceleration - it\'s the opposite! Greater mass requires more force to achieve the same acceleration (F=ma).',
      hint: 'Which is easier to push and speed up: a 40 kg person or an 80 kg person?',
      resource: 'Review Week 1 where you learned mass affects how objects respond to forces.'
    }, CONFIG_GRADE8_WEEK3));
    const r2 = form.addMultipleChoiceItem()
      .setTitle('[WEEK 2 REVIEW] Two objects have the same kinetic energy (KE = 100 J). Object A has mass 2 kg, Object B has mass 8 kg. Which is moving FASTER?')
      .setHelpText('🔗 CCC: Energy and Matter | Use KE = ½mv²');
    r2.setChoices([
      r2.createChoice('Object A (2 kg) is moving faster - less mass needs higher velocity for same KE', true),
      r2.createChoice('Object B (8 kg) is moving faster - more mass means more velocity', false),
      r2.createChoice('Both moving at same speed - same KE means same velocity', false),
      r2.createChoice('Cannot determine without knowing the KE value', false)
    ]);
    r2.setRequired(true);
    r2.setPoints(2);
    r2.setFeedbackForCorrect(createEnhancedFeedback(true, {
      confirmation: 'Excellent mathematical thinking!',
      elaboration: 'From KE = ½mv²: If KE is same but m is smaller, then v² must be LARGER to compensate. Object A (2 kg) needs v=10 m/s. Object B (8 kg) only needs v=5 m/s. Less mass = more speed for same KE!',
      conceptConnection: 'INVERSE RELATIONSHIPS: KE depends on BOTH m and v². When one increases, the other must decrease to keep KE constant. Today you\'ll see: when F is constant, increasing m decreases a.',
      nextStep: 'Your investigation will show another inverse relationship: mass and acceleration!',
      resource: 'Week 2 Station 1 covered KE calculations - same inverse thinking!'
    }, CONFIG_GRADE8_WEEK3));
    r2.setFeedbackForIncorrect(createEnhancedFeedback(false, {
      gentleCorrection: 'Use the KE equation...',
      explanation: 'KE = ½mv². If KE is same (100 J) but m is different, then v must be different. Smaller m needs BIGGER v to reach same KE. So Object A (2 kg) moves faster!',
      misconception: 'Same KE doesn\'t mean same velocity. The lighter object must move faster to have the same energy as the heavier object.',
      hint: 'Plug into KE = ½mv²: Which needs higher v to reach 100 J: m=2 kg or m=8 kg?',
      resource: 'Review Week 2 Do Now where you compared KE for different masses.'
    }, CONFIG_GRADE8_WEEK3));
    // WEEK 3 RETRIEVAL: Station 1 concept
    const r3 = form.addMultipleChoiceItem()
      .setTitle('[STATION 1 REVIEW] In Station 1, you investigated how changing FORCE affects acceleration. What relationship did you predict?')
      .setHelpText('🔗 CCC3: Proportional relationships');
    r3.setChoices([
      r3.createChoice('Direct proportion: Double force -&gt; double acceleration (when mass constant)', true),
      r3.createChoice('Inverse proportion: Double force -&gt; half acceleration', false),
      r3.createChoice('No relationship: Force doesn\'t affect acceleration', false),
      r3.createChoice('Exponential: Force increases acceleration exponentially', false)
    ]);
    r3.setRequired(true);
    r3.setPoints(1);
    r3.setFeedbackForCorrect(createEnhancedFeedback(true, {
      confirmation: 'Perfect recall!',
      elaboration: 'Station 1: F ∝ a (direct proportion) when m is constant. Station 2 TODAY: a ∝ 1/m (inverse proportion) when F is constant. Both come from F=ma!',
      conceptConnection: 'COMPARING INVESTIGATIONS: Different investigations isolate different relationships. Together, they reveal the full F=ma relationship!',
      nextStep: 'Now you\'ll investigate the OTHER side: how mass affects acceleration.',
      resource: 'Both investigations together complete your understanding of F=ma.'
    }, CONFIG_GRADE8_WEEK3));
    r3.setFeedbackForIncorrect(createEnhancedFeedback(false, {
      gentleCorrection: 'Review Station 1...',
      explanation: 'Station 1 showed: If you double force (keeping mass constant), acceleration doubles. F and a have a DIRECT proportional relationship: F ∝ a when m is constant.',
      misconception: 'Force and acceleration DO have a relationship - it\'s direct/proportional, not inverse or exponential.',
      hint: 'If you push twice as hard, does the cart speed up twice as fast?',
      resource: 'Review Station 1 prediction question about tripling force.'
    }, CONFIG_GRADE8_WEEK3));
    // CRITICAL MISCONCEPTION QUESTION (User Required)
    try {
      form.addPageBreakItem().setTitle('Conceptual Understanding Check');
      form.addSectionHeaderItem()
        .setTitle('⚠️ Common Misconception About Motion and Forces')
        .setHelpText('Before planning your investigation, let\'s address a critical misconception that affects how we understand F=ma...');
    } catch (e) {}
    const misconception = form.addMultipleChoiceItem()
      .setTitle('MISCONCEPTION CHECK: A book is sliding across a table at constant velocity (no speeding up or slowing down). What can you conclude about the forces on the book?')
      .setHelpText('🧪 SEP: Constructing Explanations | 🔗 CCC: Cause and Effect\n\nThis is critical for understanding F=ma!');
    misconception.setChoices([
      misconception.createChoice('There IS a net force acting on the book', false),
      misconception.createChoice('There is NO net force - balanced forces (constant velocity means a=0, so F_net=0)', true),
      misconception.createChoice('There must be a force in the direction of motion to keep it moving', false),
      misconception.createChoice('The faster it moves, the more force is acting on it', false)
    ]);
    misconception.setRequired(true);
    misconception.setPoints(3);
    misconception.setFeedbackForCorrect(createEnhancedFeedback(true, {
      confirmation: 'EXCELLENT! You avoided the #1 motion misconception!',
      elaboration: 'KEY INSIGHT: Objects don\'t need force to MAINTAIN motion. They need force to CHANGE motion (accelerate). Constant velocity means a=0, so F_net=ma=0. Forces are BALANCED!',
      conceptConnection: 'NEWTON\'S 1ST LAW: Objects maintain constant velocity unless a NET force acts. Force causes ACCELERATION, not velocity. This is why F=ma (not F=mv)!',
      nextStep: 'This understanding is CRITICAL for your investigation: You\'re measuring how force and mass affect ACCELERATION (change in motion), not velocity itself.',
      resource: 'Week 1 covered N1L: Objects resist changes to their motion. No net force = no acceleration = constant velocity (or rest).'
    }, CONFIG_GRADE8_WEEK3));
    misconception.setFeedbackForIncorrect(createEnhancedFeedback(false, {
      gentleCorrection: 'This is the MOST COMMON misconception in physics. Let\'s fix it:',
      explanation: 'Objects DON\'T need force to keep moving at constant velocity. They need force to CHANGE their velocity (accelerate). Constant velocity means a=0, so from F=ma, F_net must be 0. Forces are balanced!',
      misconception: 'CRITICAL MISCONCEPTION: "Moving objects require force." NO! Force causes ACCELERATION (change in velocity), not velocity itself. This is why F=ma, not F=mv.',
      hint: 'Think: A hockey puck sliding on ice at constant speed. Is something continuously pushing it? No! It just maintains its motion (N1L) until friction eventually slows it.',
      resource: 'Week 1 Newton\'s 1st Law: Objects maintain their velocity (constant speed + direction) unless a NET force acts. Review Hook/Station 1 from Week 1.'
    }, CONFIG_GRADE8_WEEK3));
    // INVESTIGATION PLANNING - VARIABLES
    try {
      form.addPageBreakItem().setTitle('Investigation Design: Mass Variation');
      form.addSectionHeaderItem()
        .setTitle('🔬 Planning Your Mass Investigation')
        .setHelpText('SCENARIO: You have equipment to test how mass affects acceleration.\n\n' +
                     'Your goal: Change MASS, keep FORCE constant, measure acceleration.\n\n' +
                     'CHALLENGE: How do you keep force constant while adding mass to a cart?');
    } catch (e) {}
    const q1 = form.addMultipleChoiceItem()
      .setTitle('In an investigation testing "How does mass affect acceleration?", identify the variables:\n\n' +
                'You will add masses to a cart (100g, 200g, 300g) while applying the SAME force (using a hanging mass or constant spring) and measure acceleration.')
      .setHelpText('🧪 SEP3: Planning Investigations\n🔗 CCC7: What changes? What stays stable?');
    q1.setChoices([
      q1.createChoice('IV: Mass of cart | DV: Acceleration | Controls: Force applied, surface, ramp angle', true),
      q1.createChoice('IV: Acceleration | DV: Mass | Controls: Force', false),
      q1.createChoice('IV: Force | DV: Acceleration | Controls: Mass', false),
      q1.createChoice('IV: Mass | DV: Force | Controls: Acceleration', false)
    ]);
    q1.setRequired(true);
    q1.setPoints(2);
    q1.setFeedbackForCorrect(createEnhancedFeedback(true, {
      confirmation: 'Perfect variable identification!',
      elaboration: 'You correctly identified: CHANGE mass (IV), MEASURE acceleration (DV), KEEP SAME force, surface, angle (controls). This isolates the mass-acceleration relationship!',
      conceptConnection: 'FAIR TESTING: Change ONE variable (mass), measure the effect (acceleration), control everything else (especially force). This reveals the inverse relationship: a ∝ 1/m.',
      nextStep: 'Next: Write the detailed procedure, focusing on HOW to keep force constant.',
      resource: 'Variable control is essential for SEP3: Planning Investigations.'
    }, CONFIG_GRADE8_WEEK3));
    q1.setFeedbackForIncorrect(createEnhancedFeedback(false, {
      gentleCorrection: 'Remember: IV = what you CHANGE, DV = what you MEASURE...',
      explanation: 'You CHANGE mass (add masses to cart) - that\'s IV. You MEASURE acceleration as a result - that\'s DV. You KEEP SAME force (critical control!), surface, angle.',
      misconception: 'Acceleration and force are not IVs here - you\'re not changing them! You\'re changing mass to see how it affects acceleration.',
      hint: 'What are you purposely changing? (That\'s IV) What are you measuring as a result? (That\'s DV)',
      resource: 'Same variable logic as Station 1, but different IV/DV.'
    }, CONFIG_GRADE8_WEEK3));
    // KEEPING FORCE CONSTANT - KEY CHALLENGE
    const q2 = form.addMultipleChoiceItem()
      .setTitle('CHALLENGE: How can you keep FORCE constant while changing the cart\'s mass?\n\n' +
                'Option A: Use a hanging mass (constant weight = constant force pulling cart)\n' +
                'Option B: Use a spring compressed to the same distance each time (constant spring force)\n' +
                'Option C: Use PhET simulation and set force slider to same value for all trials\n' +
                'Option D: Just try to push with the same force each time (estimate)')
      .setHelpText('🧪 SEP3: Controlling Variables | This is the KEY to a valid investigation!');
    q2.setChoices([
      q2.createChoice('Options A, B, or C all work (A/B = physical methods, C = digital; D is too imprecise)', true),
      q2.createChoice('Only Option A (most traditional)', false),
      q2.createChoice('Only Option C (most accurate)', false),
      q2.createChoice('Option D is acceptable for middle school', false)
    ]);
    q2.setRequired(true);
    q2.setPoints(2);
    q2.setFeedbackForCorrect(createEnhancedFeedback(true, {
      confirmation: 'Excellent experimental design!',
      elaboration: 'You recognized MULTIPLE valid methods! Hanging mass (constant weight), compressed spring (Hooke\'s law), or simulation setting all keep force CONSTANT and MEASURABLE. Option D (pushing) is too imprecise!',
      conceptConnection: 'CONTROLLED EXPERIMENTS: The key is REPRODUCIBILITY. Any method that applies the same measurable force across all trials is valid. Different tools, same scientific principle!',
      nextStep: 'Choose one method for your procedure and explain WHY it keeps force constant.',
      resource: 'Real scientists use various methods - all valid if they control variables effectively!'
    }, CONFIG_GRADE8_WEEK3));
    q2.setFeedbackForIncorrect(createEnhancedFeedback(false, {
      gentleCorrection: 'Think about what makes force truly constant...',
      explanation: 'Scientific investigations need REPEATABLE, MEASURABLE force. Hanging mass (constant weight), spring (constant compression), or simulation (set value) all achieve this. Manual pushing (D) varies too much!',
      misconception: 'There\'s not one "best" method - multiple approaches work if they achieve constant, measurable force. But imprecise methods (pushing by feel) don\'t work for quantitative science.',
      hint: 'Which methods give you the SAME force value every single time?',
      resource: 'SEP3: Valid investigations require controlled, repeatable procedures.'
    }, CONFIG_GRADE8_WEEK3));
    // PROCEDURE WRITING (12 POINTS - HIGHEST VALUE)
    const q3 = form.addParagraphTextItem()
      .setTitle('PROCEDURE WRITING: Write a detailed, numbered procedure (8-10 steps) for investigating how mass affects acceleration.\n\n' +
                'Your procedure MUST include:\n' +
                '1. Materials list (specify physical equipment OR PhET simulation)\n' +
                '2. Setup description\n' +
                '3. How you will VARY mass (IV) - be specific about amounts!\n' +
                '4. How you will KEEP FORCE CONSTANT (critical!) - explain your method\n' +
                '5. How you will MEASURE acceleration (DV) - be specific!\n' +
                '6. What other variables you will CONTROL\n' +
                '7. Number of trials for each mass level\n' +
                '8. How you will record data (table structure)\n\n' +
                'Write 8-10 numbered steps. Be precise enough that another student could follow your procedure!')
      .setHelpText('🧪 SEP3: Planning Investigations (CORE SKILL)\n' +
                   '🔗 CCC7: How will changing mass show stability/change in acceleration?\n\n' +
                   'Example start: "1. Materials: Cart, 3 masses (100g, 200g, 300g), hanging mass holder, string, pulley, meterstick, stopwatch..."');
    q3.setRequired(true);
    q3.setValidation(
      FormApp.createParagraphTextValidation()
        .requireTextLengthGreaterThanOrEqualTo(300)
        .setHelpText('Write at least 300 characters (8-10 detailed steps).')
        .build()
    );
    q3.setPoints(6); // Highest - this IS MS-PS2-2 core skill
    try {
      form.addSectionHeaderItem()
        .setTitle('⚖️ RUBRIC (Teacher Grading):')
        .setHelpText('12pts: All 8 components + clearly explains HOW force stays constant + numbered steps + safe + replicable\n' +
                     '10pts: 7/8 components + method for constant force present but not fully clear\n' +
                     '8pts: 6/8 components + vague about keeping force constant\n' +
                     '6pts: 4-5 components + unclear procedure\n' +
                     '4pts: &lt;4 components OR doesn\'t address keeping force constant\n' +
                     '0pts: Off-topic or missing');
    } catch (e) {}
    // DATA TABLE DESIGN
    const q4 = form.addMultipleChoiceItem()
      .setTitle('Which data table is BEST for your mass investigation?\n\n' +
                'A) Columns: Cart Mass | Trial 1 a | Trial 2 a | Trial 3 a | Average a\n' +
                'B) Columns: Trial# | Mass | Acceleration\n' +
                'C) Columns: Force | Mass | Acceleration\n' +
                'D) Just write results in sentences')
      .setHelpText('🧪 SEP3: Planning data collection | Think about organization and analysis');
    q4.setChoices([
      q4.createChoice('Option A (shows all trials + average for each mass level)', true),
      q4.createChoice('Option B (works but doesn\'t show multiple trials clearly)', false),
      q4.createChoice('Option C (shows force but force is constant, so not needed in table)', false),
      q4.createChoice('Option D (qualitative, not quantitative)', false)
    ]);
    q4.setRequired(true);
    q4.setPoints(1);
    q4.setFeedbackForCorrect(createEnhancedFeedback(true, {
      confirmation: 'Perfect data organization!',
      elaboration: 'Option A shows: (1) IV (mass) clearly in first column, (2) All trials visible for each mass, (3) Average calculated. This makes the inverse pattern easy to see!',
      conceptConnection: 'DATA TABLES: Best format shows IV, all trials transparently, and averages. This lets you see: as mass doubles, does acceleration halve? (Inverse relationship)',
      nextStep: 'Station 3 will give you data in this format to analyze!',
      resource: 'Clear data organization is essential for SEP4: Analyzing and Interpreting Data.'
    }, CONFIG_GRADE8_WEEK3));
    q4.setFeedbackForIncorrect(createEnhancedFeedback(false, {
      gentleCorrection: 'Think about analyzing inverse relationships...',
      explanation: 'Best tables show: (1) IV (mass) in first column, (2) Multiple trials visible, (3) Averages calculated. Option A does all three! Option C includes force, but it\'s constant (not changing), so not needed in table.',
      misconception: 'Option B works but hides trials. Option C includes unnecessary constant. Option D isn\'t quantitative.',
      hint: 'You\'re looking for how acceleration changes AS mass changes - which table makes this clearest?',
      resource: 'Same table logic as Station 1, adapted for different IV.'
    }, CONFIG_GRADE8_WEEK3));
    // PREDICTION - INVERSE RELATIONSHIP
    const q5 = form.addMultipleChoiceItem()
      .setTitle('PREDICTION: If you double the mass of a cart (keeping force constant), what will happen to acceleration? Use F=ma to explain.')
      .setHelpText('🔢 SEP5: Using Mathematics | 🔗 CCC3: Inverse proportional relationships');
    q5.setChoices([
      q5.createChoice('Acceleration halves (F=ma -&gt; a=F/m: if m goes 2×, then a goes ÷2 when F is constant)', true),
      q5.createChoice('Acceleration doubles (mass and acceleration increase together)', false),
      q5.createChoice('Acceleration stays the same (mass doesn\'t affect acceleration)', false),
      q5.createChoice('Acceleration decreases but not by half (relationship isn\'t linear)', false)
    ]);
    q5.setRequired(true);
    q5.setPoints(1);
    q5.setFeedbackForCorrect(createEnhancedFeedback(true, {
      confirmation: 'Perfect mathematical reasoning!',
      elaboration: 'From F=ma -&gt; a=F/m. If F is constant and m doubles, then a halves. INVERSE PROPORTION: When one variable increases, the other decreases by the same factor!',
      conceptConnection: 'INVERSE RELATIONSHIPS (CCC3): Unlike Station 1 (direct: F↑-&gt;a↑), this is inverse: m↑-&gt;a↓. Both come from F=ma! This is a fundamental pattern in physics.',
      nextStep: 'Your investigation will TEST this prediction with real or simulated data!',
      resource: 'Math class: y = k/x shows inverse proportions. Here a = F/m shows a ∝ 1/m when F is constant.'
    }, CONFIG_GRADE8_WEEK3));
    q5.setFeedbackForIncorrect(createEnhancedFeedback(false, {
      gentleCorrection: 'Use F=ma rearranged as a=F/m...',
      explanation: 'From a=F/m: If F is constant and m₂=2m₁, then a₂=F/(2m₁)=½(F/m₁)=½a₁. Acceleration halves! Mass and acceleration are INVERSELY proportional.',
      misconception: 'More mass doesn\'t mean more acceleration - it\'s the OPPOSITE! Greater mass requires more force to achieve the same acceleration. With constant F, greater m means less a.',
      hint: 'If a cart is twice as heavy, is it easier or harder to speed up with the same force?',
      resource: 'Station 1: F↑-&gt;a↑ (direct). Station 2: m↑-&gt;a↓ (inverse). Both from F=ma!'
    }, CONFIG_GRADE8_WEEK3));
    // METACOGNITION
    addMetacognitiveReflection(form, 'planning this mass investigation');
    if (parentFolder) {
      try {
        moveToFolder(DriveApp.getFileById(form.getId()), parentFolder, 'Forms');
      } catch (e) {}
    }
    Logger.log(`[SUCCESS] Station 2 created: ${form.getPublishedUrl()}`);
    return form;
  } catch (e) {
    Logger.log(`[ERROR] Failed to create Station 2: ${e.message}`);
    throw e;
  }
}
// ============================================================================
// GRADE 8 - FORM 4: STATION 3 - ANALYZE INVESTIGATION DATA
// ============================================================================
function createGrade8_Station3_NGSS() {
  Logger.log('[INFO] Creating Grade 8 Station 3 (MS-PS2-2)...');
  try {
    const form = FormApp.create('G8.C2.W3: Station 3 - Analyze Investigation Data');
    const parentFolder = CONFIG_GRADE8_WEEK3.DRIVE.CREATE_FOLDER_STRUCTURE
      ? createFolderStructure(CONFIG_GRADE8_WEEK3)
      : null;
    configureForm(
      form,
      'Station 3: Analyze F=ma Investigation Data',
      `Analyze data from BOTH investigations: Force variation and Mass variation.\n\n` +
      `⏱️ Time: ~13 minutes | 📊 Points: 36\n` +
      `🎯 SEP4: Analyzing and Interpreting Data\n` +
      `🎯 SEP6: Constructing Explanations\n\n` +
      `YOUR TASK: Two student groups collected data. Use their results to explain how force and mass affect acceleration.\n\n` +
      `NOTE: Real data has measurement variation (±5-10%). Look for PATTERNS, not perfect numbers!`,
      CONFIG_GRADE8_WEEK3
    );
    // SPACED RETRIEVAL
    try {
      form.addSectionHeaderItem()
        .setTitle('📚 Warm-Up: Data Analysis Preparation')
        .setHelpText('Before analyzing new data, retrieve key concepts...');
    } catch (e) {}
    const r1 = form.addMultipleChoiceItem()
      .setTitle('[WEEK 1 REVIEW] Why do scientists run MULTIPLE TRIALS in investigations?')
      .setHelpText('🧪 SEP: Planning Investigations | Think about data reliability');
    r1.setChoices([
      r1.createChoice('To account for measurement error and calculate averages for more reliable results', true),
      r1.createChoice('To make the lab take longer', false),
      r1.createChoice('One trial is enough if you\'re careful', false),
      r1.createChoice('To get different results each time', false)
    ]);
    r1.setRequired(true);
    r1.setPoints(2);
    r1.setFeedbackForCorrect(createEnhancedFeedback(true, {
      confirmation: 'Excellent understanding of scientific practice!',
      elaboration: 'Multiple trials account for random errors. Averaging trials gives more reliable results than any single measurement. This is standard practice in all scientific investigations!',
      conceptConnection: 'DATA RELIABILITY: Real measurements always have variation. Multiple trials + averages reduce the impact of random errors and reveal true patterns.',
      nextStep: 'The data you\'ll analyze today includes multiple trials with realistic variation.',
      resource: 'This is why Stations 1 &amp; 2 required 3 trials for each condition!'
    }, CONFIG_GRADE8_WEEK3));
    r1.setFeedbackForIncorrect(createEnhancedFeedback(false, {
      gentleCorrection: 'Think about measurement uncertainty...',
      explanation: 'No measurement is PERFECT. Multiple trials let you calculate averages, which are more reliable than single measurements. This accounts for random errors (reaction time, slight setup differences, etc.).',
      misconception: 'One trial isn\'t enough - even careful scientists have measurement variation. Multiple trials aren\'t about getting different results, but about averaging to find the TRUE pattern.',
      hint: 'If you measure something 3 times and get 2.1, 2.3, 2.2 - is the average (2.2) more reliable than any single value?',
      resource: 'SEP3/SEP4: Multiple trials are standard practice in all experimental science.'
    }, CONFIG_GRADE8_WEEK3));
    const r2 = form.addMultipleChoiceItem()
      .setTitle('[STATIONS 1-2 REVIEW] What relationships did Stations 1 &amp; 2 investigate?')
      .setHelpText('🔗 CCC: Patterns | Connect the two investigations');
    r2.setChoices([
      r2.createChoice('Station 1: F↑-&gt;a↑ (direct proportion) | Station 2: m↑-&gt;a↓ (inverse proportion)', true),
      r2.createChoice('Station 1: F↑-&gt;a↓ (inverse) | Station 2: m↑-&gt;a↑ (direct)', false),
      r2.createChoice('Both investigated direct proportions', false),
      r2.createChoice('Both investigated inverse proportions', false)
    ]);
    r2.setRequired(true);
    r2.setPoints(2);
    r2.setFeedbackForCorrect(createEnhancedFeedback(true, {
      confirmation: 'Perfect recall of both investigations!',
      elaboration: 'Station 1: Increase force -&gt; acceleration increases proportionally (F∝a when m constant). Station 2: Increase mass -&gt; acceleration decreases inversely (a∝1/m when F constant). Both from F=ma!',
      conceptConnection: 'TWO SIDES OF F=ma: One equation reveals TWO relationships. Today you\'ll see BOTH patterns in real data and synthesize them into a complete explanation.',
      nextStep: 'Now analyze actual data showing these patterns!',
      resource: 'F=ma contains both relationships: a=F/m shows F↑-&gt;a↑ AND m↑-&gt;a↓.'
    }, CONFIG_GRADE8_WEEK3));
    r2.setFeedbackForIncorrect(createEnhancedFeedback(false, {
      gentleCorrection: 'Review the key findings...',
      explanation: 'Station 1 (changing force): Double F -&gt; double a (DIRECT proportion). Station 2 (changing mass): Double m -&gt; half a (INVERSE proportion). Different relationships!',
      misconception: 'The relationships are DIFFERENT, not the same. Force has a direct effect on acceleration, but mass has an inverse effect.',
      hint: 'Push harder -&gt; faster acceleration (direct). Heavier object -&gt; slower acceleration (inverse).',
      resource: 'Review Station 1 &amp; 2 prediction questions about doubling F or m.'
    }, CONFIG_GRADE8_WEEK3));
    // INVESTIGATION 1: FORCE VARIATION DATA (REALISTIC WITH VARIATION)
    try {
      form.addPageBreakItem().setTitle('Data Analysis: Force Investigation');
      form.addSectionHeaderItem()
        .setTitle('📊 Investigation 1: Force Variation (Mass Constant)')
        .setHelpText('GROUP A tested how changing force affects acceleration (mass = 0.5 kg constant).\n\n' +
                     'DATA TABLE 1:\n' +
                     'Force (N) | Trial 1 (m/s²) | Trial 2 (m/s²) | Trial 3 (m/s²) | Average (m/s²)\n' +
                     '2.0       | 3.8            | 4.1            | 4.0            | 4.0\n' +
                     '4.0       | 7.9            | 8.2            | 7.8            | 8.0\n' +
                     '6.0       | 11.8           | 12.3           | 12.1           | 12.1\n\n' +
                     'NOTE: Real measurements vary slightly (±5-10%). Focus on PATTERNS in averages!');
    } catch (e) {}
    const q1 = form.addMultipleChoiceItem()
      .setTitle('PATTERN ANALYSIS: Looking at the average accelerations, what pattern do you see when force doubles from 2.0 N to 4.0 N?')
      .setHelpText('🧪 SEP4: Analyzing Data | 🔗 CCC3: Proportional relationships');
    q1.setChoices([
      q1.createChoice('Acceleration approximately doubles (4.0-&gt;8.0 m/s²), showing direct proportion', true),
      q1.createChoice('Acceleration stays the same', false),
      q1.createChoice('Acceleration increases but not proportionally', false),
      q1.createChoice('Cannot determine - too much variation in data', false)
    ]);
    q1.setRequired(true);
    q1.setPoints(2);
    q1.setFeedbackForCorrect(createEnhancedFeedback(true, {
      confirmation: 'Perfect pattern recognition!',
      elaboration: 'You correctly identified: 2 N-&gt;4 m/s², 4 N-&gt;8 m/s², 6 N-&gt;12.1 m/s². Force and acceleration change by approximately the same factor. DIRECT PROPORTION confirmed by data!',
      conceptConnection: 'EVIDENCE-BASED SCIENCE: The data shows F∝a when m is constant. Small variations (3.8-4.1) are normal, but the PATTERN is clear: F doubles -&gt; a doubles.',
      nextStep: 'This confirms your Station 1 prediction!',
      resource: 'Real data always has variation, but patterns emerge when you look at averages.'
    }, CONFIG_GRADE8_WEEK3));
    q1.setFeedbackForIncorrect(createEnhancedFeedback(false, {
      gentleCorrection: 'Look at the pattern in averages...',
      explanation: 'Average accelerations: 4.0, 8.0, 12.1 m/s². When F goes 2-&gt;4 N (doubles), a goes 4-&gt;8 (doubles). When F goes 4-&gt;6 N (1.5×), a goes 8-&gt;12.1 (≈1.5×). DIRECT proportion!',
      misconception: 'The variation (3.8-4.1) is NORMAL measurement error. Look at AVERAGES to see patterns. The pattern is clear: F and a change together proportionally.',
      hint: 'Compare: 2 N gives 4 m/s². What does 4 N (double) give?',
      resource: 'SEP4: Look for patterns in averaged data, not individual trials.'
    }, CONFIG_GRADE8_WEEK3));
    const q2 = form.addMultipleChoiceItem()
      .setTitle('MATHEMATICAL RELATIONSHIP: Calculate the ratio a/F for each row using average values. What do you notice?')
      .setHelpText('🔢 SEP5: Using Mathematics | HINT: If a∝F, then a/F should be constant');
    q2.setChoices([
      q2.createChoice('The ratio a/F ≈ 2 for all rows (4/2=2, 8/4=2, 12.1/6≈2), confirming a=F/m with m=0.5 kg', true),
      q2.createChoice('The ratio a/F changes for each row (not constant)', false),
      q2.createChoice('The ratio a/F ≈ 0.5 for all rows', false),
      q2.createChoice('Cannot calculate without more information', false)
    ]);
    q2.setRequired(true);
    q2.setPoints(2);
    q2.setFeedbackForCorrect(createEnhancedFeedback(true, {
      confirmation: 'Outstanding mathematical analysis!',
      elaboration: 'You calculated: 4.0/2.0=2, 8.0/4.0=2, 12.1/6.0≈2.02. The ratio is CONSTANT! This proves a∝F. AND: a/F=2 matches a=F/m with m=0.5 kg (a=F/0.5=2F).',
      conceptConnection: 'MATHEMATICAL EVIDENCE: When a/F is constant, it proves direct proportion AND gives you the mass! This is how F=ma works: the constant ratio a/F equals 1/m.',
      nextStep: 'This is powerful: Data not only shows the pattern but reveals the mass value!',
      resource: 'This is SEP5: Using math to analyze relationships and extract physical quantities.'
    }, CONFIG_GRADE8_WEEK3));
    q2.setFeedbackForIncorrect(createEnhancedFeedback(false, {
      gentleCorrection: 'Calculate a/F for each row...',
      explanation: 'Row 1: 4.0/2.0=2. Row 2: 8.0/4.0=2. Row 3: 12.1/6.0≈2.02. The ratio is CONSTANT≈2! This proves a∝F. From F=ma-&gt;a=F/m, so a/F=1/m. Here a/F=2, so 1/m=2, meaning m=0.5 kg (matches given mass!).',
      misconception: 'The ratio IS constant. You have all needed information. Try dividing average a by F for each row.',
      hint: 'Divide: 4.0÷2.0=? Then 8.0÷4.0=? Then 12.1÷6.0≈?',
      resource: 'Constant ratios prove proportional relationships - key skill in SEP5.'
    }, CONFIG_GRADE8_WEEK3));
    // INVESTIGATION 2: MASS VARIATION DATA (REALISTIC WITH VARIATION)
    try {
      form.addPageBreakItem().setTitle('Data Analysis: Mass Investigation');
      form.addSectionHeaderItem()
        .setTitle('📊 Investigation 2: Mass Variation (Force Constant)')
        .setHelpText('GROUP B tested how changing mass affects acceleration (force = 3.0 N constant).\n\n' +
                     'DATA TABLE 2:\n' +
                     'Mass (kg) | Trial 1 (m/s²) | Trial 2 (m/s²) | Trial 3 (m/s²) | Average (m/s²)\n' +
                     '0.25      | 11.8           | 12.4           | 12.0           | 12.1\n' +
                     '0.50      | 5.9            | 6.1            | 6.2            | 6.1\n' +
                     '1.00      | 2.9            | 3.1            | 3.0            | 3.0\n\n' +
                     'NOTE: Same realistic measurement variation. Look for INVERSE pattern!');
    } catch (e) {}
    const q3 = form.addMultipleChoiceItem()
      .setTitle('PATTERN ANALYSIS: Looking at the average accelerations, what pattern do you see when mass doubles from 0.25 kg to 0.50 kg?')
      .setHelpText('🧪 SEP4: Analyzing Data | 🔗 CCC3: Inverse relationships');
    q3.setChoices([
      q3.createChoice('Acceleration approximately halves (12.1-&gt;6.1 m/s²), showing inverse proportion', true),
      q3.createChoice('Acceleration doubles', false),
      q3.createChoice('Acceleration stays the same', false),
      q3.createChoice('Acceleration decreases but not inversely', false)
    ]);
    q3.setRequired(true);
    q3.setPoints(2);
    q3.setFeedbackForCorrect(createEnhancedFeedback(true, {
      confirmation: 'Excellent inverse pattern recognition!',
      elaboration: 'You identified: 0.25 kg-&gt;12.1 m/s², 0.50 kg-&gt;6.1 m/s², 1.00 kg-&gt;3.0 m/s². As mass doubles, acceleration halves. INVERSE PROPORTION confirmed by data!',
      conceptConnection: 'INVERSE EVIDENCE: The data shows a∝1/m when F is constant. Mass doubles -&gt; acceleration halves. This is the opposite pattern from Investigation 1!',
      nextStep: 'This confirms your Station 2 prediction about the m-a relationship!',
      resource: 'Inverse relationships: when one variable doubles, the other halves.'
    }, CONFIG_GRADE8_WEEK3));
    q3.setFeedbackForIncorrect(createEnhancedFeedback(false, {
      gentleCorrection: 'Examine how acceleration changes as mass increases...',
      explanation: 'Average accelerations: 12.1, 6.1, 3.0 m/s². When m goes 0.25-&gt;0.50 kg (doubles), a goes 12.1-&gt;6.1 (halves). When m goes 0.50-&gt;1.00 kg (doubles again), a goes 6.1-&gt;3.0 (halves again). INVERSE!',
      misconception: 'It\'s not direct (both increasing) - it\'s INVERSE (one increases, other decreases). Mass doubles -&gt; acceleration halves.',
      hint: 'Compare: 0.25 kg gives 12.1 m/s². What does 0.50 kg (double) give?',
      resource: 'SEP4: Recognize both direct AND inverse patterns in data.'
    }, CONFIG_GRADE8_WEEK3));
    const q4 = form.addMultipleChoiceItem()
      .setTitle('MATHEMATICAL RELATIONSHIP: Calculate the product (a × m) for each row using average values. What do you notice?')
      .setHelpText('🔢 SEP5: Using Mathematics | HINT: If a∝1/m, then (a×m) should be constant');
    q4.setChoices([
      q4.createChoice('The product a×m ≈ 3 for all rows (12.1×0.25≈3, 6.1×0.50≈3, 3.0×1.00=3), confirming a=F/m with F=3.0 N', true),
      q4.createChoice('The product a×m changes for each row (not constant)', false),
      q4.createChoice('The product a×m ≈ 1 for all rows', false),
      q4.createChoice('Cannot calculate - need force value', false)
    ]);
    q4.setRequired(true);
    q4.setPoints(2);
    q4.setFeedbackForCorrect(createEnhancedFeedback(true, {
      confirmation: 'Brilliant mathematical analysis!',
      elaboration: 'You calculated: 12.1×0.25≈3.03, 6.1×0.50≈3.05, 3.0×1.00=3.0. The product is CONSTANT! This proves a∝1/m. AND: a×m=3 matches F=ma with F=3.0 N (ma=3).',
      conceptConnection: 'MATHEMATICAL EVIDENCE: When (a×m) is constant, it proves inverse proportion AND reveals the force! From F=ma, the constant product a×m equals F.',
      nextStep: 'Like Investigation 1, the data reveals the controlled variable (here: force=3 N)!',
      resource: 'SEP5: Mathematical analysis proves relationships and extracts physical values.'
    }, CONFIG_GRADE8_WEEK3));
    q4.setFeedbackForIncorrect(createEnhancedFeedback(false, {
      gentleCorrection: 'Calculate a×m for each row...',
      explanation: 'Row 1: 12.1×0.25≈3.03. Row 2: 6.1×0.50≈3.05. Row 3: 3.0×1.00=3.0. The product is CONSTANT≈3! From F=ma, if you rearrange to ma=F, then a×m=F. Here a×m=3, so F=3 N (matches given force!).',
      misconception: 'The product IS constant. You have all information. The constant product equals the force!',
      hint: 'Multiply: 12.1×0.25≈? Then 6.1×0.50≈? Then 3.0×1.00=?',
      resource: 'Inverse relationships: the product of inversely related variables is constant.'
    }, CONFIG_GRADE8_WEEK3));
    // SYNTHESIS QUESTION (10 POINTS - HIGHEST)
    try {
      form.addPageBreakItem().setTitle('Synthesis &amp; Explanation');
      form.addSectionHeaderItem()
        .setTitle('🔬 Constructing a Scientific Explanation')
        .setHelpText('Now synthesize BOTH investigations into a complete explanation of F=ma...');
    } catch (e) {}
    const q5 = form.addParagraphTextItem()
      .setTitle('EXPLANATION CONSTRUCTION: Using evidence from BOTH investigations, explain how force and mass affect an object\'s acceleration.\n\n' +
                'Your explanation MUST include:\n' +
                '1. How changing FORCE affects acceleration (cite Investigation 1 data)\n' +
                '2. How changing MASS affects acceleration (cite Investigation 2 data)\n' +
                '3. Why these patterns make sense using F=ma\n' +
                '4. How the two investigations together reveal the COMPLETE relationship\n\n' +
                'Write a complete explanation (8-12 sentences) using specific data as evidence.')
      .setHelpText('🧪 SEP6: Constructing Explanations\n' +
                   '🔗 CCC: Cause and Effect - How do F and m cause changes in a?\n\n' +
                   'Use CLAIM-EVIDENCE-REASONING structure!\n' +
                   'Example start: "Force and mass both affect acceleration, but in different ways. Investigation 1 showed..."');
    q5.setRequired(true);
    q5.setValidation(
      FormApp.createParagraphTextValidation()
        .requireTextLengthGreaterThanOrEqualTo(400)
        .setHelpText('Write at least 400 characters (8-12 complete sentences with data citations).')
        .build()
    );
    q5.setPoints(6); // Highest value - synthesis is most complex thinking
    try {
      form.addSectionHeaderItem()
        .setTitle('⚖️ RUBRIC (Teacher Grading):')
        .setHelpText('10pts: Complete explanation with BOTH patterns + specific data citations + F=ma connection + synthesis of how investigations complement each other\n' +
                     '8pts: Both patterns + data citations + F=ma connection, but weak synthesis\n' +
                     '6pts: Both patterns mentioned + some data, but vague F=ma connection\n' +
                     '4pts: Only one pattern OR no data citations\n' +
                     '2pts: Vague statements without data evidence\n' +
                     '0pts: Off-topic or missing');
    } catch (e) {}
    // REAL-WORLD APPLICATION
    const q6 = form.addMultipleChoiceItem()
      .setTitle('REAL-WORLD APPLICATION: Engineers designing a sports car want it to accelerate quickly (high acceleration). Based on F=ma, what TWO strategies should they use?')
      .setHelpText('🔗 CCC: Systems | Apply both relationships from F=ma');
    q6.setChoices([
      q6.createChoice('Increase engine force (large F) AND decrease car mass (small m) -&gt; both increase acceleration', true),
      q6.createChoice('Increase both engine force AND car mass equally', false),
      q6.createChoice('Decrease both engine force AND car mass equally', false),
      q6.createChoice('Only increase engine force (mass doesn\'t matter)', false)
    ]);
    q6.setRequired(true);
    q6.setPoints(2);
    q6.setFeedbackForCorrect(createEnhancedFeedback(true, {
      confirmation: 'Perfect engineering application!',
      elaboration: 'You applied BOTH sides of F=ma! From a=F/m: (1) Increase F (powerful engine) -&gt; increases a. (2) Decrease m (lightweight materials) -&gt; increases a. Engineers use BOTH strategies!',
      conceptConnection: 'REAL-WORLD F=ma: Sports cars have powerful engines (high F) AND lightweight carbon fiber bodies (low m). Both strategies maximize acceleration. This is F=ma in action!',
      nextStep: 'This is why race cars are powerful AND lightweight!',
      resource: 'Engineering design uses physics principles - F=ma guides vehicle performance optimization.'
    }, CONFIG_GRADE8_WEEK3));
    q6.setFeedbackForIncorrect(createEnhancedFeedback(false, {
      gentleCorrection: 'Think about a=F/m...',
      explanation: 'From a=F/m: To INCREASE a, you want LARGE F (numerator) and SMALL m (denominator). So: powerful engine (↑F) AND lightweight materials (↓m). Both strategies work together!',
      misconception: 'Mass DOES matter! Increasing F helps, but so does decreasing m. Increasing both equally cancels out (a=2F/2m=F/m). Real engineers optimize BOTH!',
      hint: 'If a=F/m, how do you make a as large as possible?',
      resource: 'This is why sports cars use both big engines AND carbon fiber (lightweight but strong).'
    }, CONFIG_GRADE8_WEEK3));
    // METACOGNITION
    addMetacognitiveReflection(form, 'analyzing investigation data and constructing explanations');
    if (parentFolder) {
      try {
        moveToFolder(DriveApp.getFileById(form.getId()), parentFolder, 'Forms');
      } catch (e) {}
    }
    Logger.log(`[SUCCESS] Station 3 created: ${form.getPublishedUrl()}`);
    return form;
  } catch (e) {
    Logger.log(`[ERROR] Failed to create Station 3: ${e.message}`);
    throw e;
  }
}
// ============================================================================
// GRADE 8 - FORM 5: EXIT TICKET - INVESTIGATION DESIGN TRANSFER
// ============================================================================
function createGrade8_ExitTicket_NGSS() {
  Logger.log('[INFO] Creating Grade 8 Exit Ticket (MS-PS2-2)...');
  try {
    const form = FormApp.create('G8.C2.W3: Exit Ticket - Design Your Investigation');
    const parentFolder = CONFIG_GRADE8_WEEK3.DRIVE.CREATE_FOLDER_STRUCTURE
      ? createFolderStructure(CONFIG_GRADE8_WEEK3)
      : null;
    configureForm(
      form,
      'Exit Ticket: Design Your Own F=ma Investigation',
      'Apply your investigation planning skills to a NEW context.\n\n' +
      'Time: 10 minutes | Points: 20\n' +
      'SEP3: Planning and Carrying Out Investigations\n\n' +
      'YOUR TASK: Design a complete investigation to test how force or mass affects acceleration.\n\n' +
      'Choose from suggested scenarios or propose your own.\n\n' +
      'This shows you can apply MS-PS2-2 skills beyond classroom examples.',
      CONFIG_GRADE8_WEEK3
    );
    // SPACED RETRIEVAL - CROSS-WEEK SYNTHESIS
    try {
      form.addSectionHeaderItem()
        .setTitle('3-Week Review: Connect Everything')
        .setHelpText('Before designing your own investigation, connect all three weeks...');
    } catch (e) {
      Logger.log('[WARNING] Could not add retrieval header: ' + e.message);
    }
    const r1 = form.addMultipleChoiceItem()
      .setTitle('[3-WEEK SYNTHESIS] How do Weeks 1, 2, and 3 connect to tell the complete story of forces and motion?')
      .setHelpText('CCC: Systems | Think about the progression');
    r1.setChoices([
      r1.createChoice('Week 1: Forces come in pairs, Week 2: Forces transfer energy, Week 3: F=ma shows how force and mass affect acceleration', true),
      r1.createChoice('All three weeks taught the same concepts in different ways', false),
      r1.createChoice('The weeks are unrelated topics', false),
      r1.createChoice('Week 1 was about energy, Week 2 about forces, Week 3 about motion', false)
    ]);
    r1.setRequired(true);
    r1.setPoints(3);
    r1.setFeedbackForCorrect(createEnhancedFeedback(true, {
      confirmation: 'Perfect synthesis across all three weeks!',
      elaboration: 'You connected the progression! Week 1: Forces always come in pairs (N3L). Week 2: Forces transfer energy and change motion (KE). Week 3: The QUANTITATIVE relationship - HOW MUCH force and mass affect acceleration (F=ma). Each builds on the last!',
      conceptConnection: 'UNIT COHERENCE: The three weeks tell a complete story about forces, energy, and motion. Week 3 quantifies what Weeks 1-2 introduced qualitatively.',
      nextStep: 'Now apply ALL three weeks\' concepts to your investigation design!',
      resource: 'This is how science builds: qualitative observations -&gt; relationships -&gt; quantitative equations.'
    }, CONFIG_GRADE8_WEEK3));
    r1.setFeedbackForIncorrect(createEnhancedFeedback(false, {
      gentleCorrection: 'Think about how each week builds on the previous...',
      explanation: 'Week 1: Forces exist in pairs (N3L). Week 2: Forces cause energy changes (KE). Week 3: HOW MUCH force and mass affect acceleration (F=ma). Each week adds depth!',
      misconception: 'The weeks aren\'t the same or unrelated - they BUILD on each other. Week 3 quantifies the force-acceleration relationship introduced in Weeks 1-2.',
      hint: 'Week 1: What are forces? Week 2: What do forces do? Week 3: HOW MUCH effect?',
      resource: 'Review each week\'s Hook to see the progression.'
    }, CONFIG_GRADE8_WEEK3));
    const r2 = form.addMultipleChoiceItem()
      .setTitle('[INVESTIGATION SKILLS] What are the THREE most important components when planning a scientific investigation?')
      .setHelpText('SEP3: Planning Investigations | Core skills from Stations 1-2');
    r2.setChoices([
      r2.createChoice('(1) Clearly identify IV, DV, and controls; (2) Write detailed, replicable procedure; (3) Plan data collection with multiple trials', true),
      r2.createChoice('(1) Have expensive equipment; (2) Get perfect data; (3) Prove your hypothesis correct', false),
      r2.createChoice('(1) Work quickly; (2) Skip trials to save time; (3) Only report data that matches predictions', false),
      r2.createChoice('(1) Memorize formulas; (2) Use calculators; (3) Make graphs', false)
    ]);
    r2.setRequired(true);
    r2.setPoints(3);
    r2.setFeedbackForCorrect(createEnhancedFeedback(true, {
      confirmation: 'Excellent understanding of investigation design!',
      elaboration: 'You identified the THREE critical elements: (1) Variable control (IV/DV/controls make it a FAIR test), (2) Clear procedure (so others can replicate), (3) Multiple trials (for reliable data). These are ESSENTIAL for all investigations!',
      conceptConnection: 'SCIENTIFIC METHOD: Good investigations are CONTROLLED (variables), CLEAR (procedures), and RELIABLE (multiple trials). These principles apply to ALL scientific investigations, not just F=ma!',
      nextStep: 'Apply these three elements to your own investigation design!',
      resource: 'These are universal investigation principles - used in all sciences!'
    }, CONFIG_GRADE8_WEEK3));
    r2.setFeedbackForIncorrect(createEnhancedFeedback(false, {
      gentleCorrection: 'Think about what makes investigations SCIENTIFIC...',
      explanation: 'Science requires: FAIR tests (control variables), REPLICABLE procedures (others can repeat), RELIABLE data (multiple trials). Equipment, speed, and proving yourself right aren\'t the priorities!',
      misconception: 'Science isn\'t about expensive equipment or perfect data - it\'s about CONTROLLED, CLEAR, REPEATABLE investigations. Real data has variation!',
      hint: 'What three things did Stations 1 &amp; 2 emphasize most?',
      resource: 'Review the 8 required components from Station 1 &amp; 2 procedure questions.'
    }, CONFIG_GRADE8_WEEK3));
    // SCENARIO SELECTION - SIMPLE
    try {
      form.addPageBreakItem().setTitle('Choose Your Investigation');
      form.addSectionHeaderItem()
        .setTitle('Choose Context')
        .setHelpText('A) Toy cars | B) Balls on ramps | C) Gym equipment | D) Your own');
    } catch (e) {}
    const q1 = form.addMultipleChoiceItem()
      .setTitle('Which investigation context will you design?')
      .setHelpText('Choose the scenario that interests you most');
    q1.setChoices([
      q1.createChoice('A) Toy cars on surfaces (testing friction force or car mass)'),
      q1.createChoice('B) Balls rolling down ramps (testing angle/gravity component or ball mass)'),
      q1.createChoice('C) Pushing gym equipment (testing push force or sled mass)'),
      q1.createChoice('D) My own proposal')
    ]);
    q1.setRequired(true);
    q1.setPoints(0);
    // INVESTIGATION DESIGN
    const q3 = form.addParagraphTextItem()
      .setTitle('INVESTIGATION DESIGN: Write a detailed plan for your chosen scenario.\n\n' +
                'Include:\n' +
                '1. Research question\n' +
                '2. Variables (IV, DV, controls)\n' +
                '3. Materials\n' +
                '4. Procedure (8-10 steps)\n' +
                '5. Prediction\n' +
                '6. Data table structure')
      .setHelpText('SEP3: Planning Investigations | Be specific and thorough!');
    q3.setRequired(true);
    q3.setValidation(
      FormApp.createParagraphTextValidation()
        .requireTextLengthGreaterThanOrEqualTo(300)
        .build()
    );
    q3.setPoints(10);
    try {
      form.addSectionHeaderItem()
        .setTitle('RUBRIC (Teacher Grading):')
        .setHelpText('10pts: All 6 components clear\n' +
                     '8pts: 5/6 components\n' +
                     '6pts: 4/6 components\n' +
                     '4pts: 3/6 components\n' +
                     '0pts: Incomplete');
    } catch (e) {}
    // REFLECTION
    const q4 = form.addMultipleChoiceItem()
      .setTitle('REFLECTION: How has your understanding of "what affects motion" changed over the three weeks?')
      .setHelpText('Metacognition | Think about your learning journey');
    q4.setChoices([
      q4.createChoice('Week 1: I learned forces exist in pairs -&gt; Week 2: Forces change motion/energy -&gt; Week 3: I can now QUANTIFY exactly how F and m affect a using F=ma', true),
      q4.createChoice('I already knew everything before Week 1', false),
      q4.createChoice('I\'m still confused about forces and motion', false),
      q4.createChoice('I understand formulas but not how they connect to real investigations', false)
    ]);
    q4.setRequired(true);
    q4.setPoints(2);
    q4.setFeedbackForCorrect(createEnhancedFeedback(true, {
      confirmation: 'Excellent reflection on your growth!',
      elaboration: 'You recognized the learning progression! You moved from qualitative understanding (forces exist, forces cause changes) to QUANTITATIVE mastery (F=ma lets you calculate and predict). This is how science works!',
      conceptConnection: 'SCIENTIFIC LITERACY: You\'ve developed the ability to plan investigations, collect data, analyze patterns, and construct explanations. These are LIFELONG skills beyond just physics!',
      nextStep: 'Apply these investigation skills to other science classes and real-world problems!',
      resource: 'You\'ve mastered SEP3 (planning investigations) - one of the most important science skills!'
    }, CONFIG_GRADE8_WEEK3));
    q4.setFeedbackForIncorrect(createEnhancedFeedback(false, {
      gentleCorrection: 'Think about your learning journey...',
      explanation: 'Week 1 introduced forces (N3L). Week 2 connected forces to energy (KE). Week 3 gave you the TOOLS to design investigations testing F=ma. You\'ve GROWN - from observation to quantitative investigation!',
      misconception: 'Learning takes time! If you\'re confused, review the feedback from this week\'s forms. You\'ve learned investigation planning skills that apply everywhere in science!',
      hint: 'Could you have designed Investigation 1 or 2 before this week? Now you can!',
      resource: 'Review your responses from Hook, Stations 1-3. See how much you\'ve learned!'
    }, CONFIG_GRADE8_WEEK3));
    // GROWTH &amp; CONFIDENCE
    const q5 = form.addMultipleChoiceItem()
      .setTitle('How confident are you in planning a scientific investigation to test how force or mass affects acceleration?')
      .setHelpText('Honest self-assessment');
    q5.setChoices([
      q5.createChoice('Very confident - I can identify variables, write procedures, design data tables, and make predictions'),
      q5.createChoice('Somewhat confident - I understand the process but need more practice'),
      q5.createChoice('Not very confident - I need more support with investigation planning'),
      q5.createChoice('Not confident at all - I\'m still very confused')
    ]);
    q5.setRequired(true);
    q5.setPoints(0); // Not graded - honest reflection
    const q6 = form.addParagraphTextItem()
      .setTitle('FINAL REFLECTION: What is ONE THING you\'re proud of learning this week, and ONE THING you want to improve or understand better?')
      .setHelpText('Example: "I\'m proud I can now identify IV/DV/controls clearly. I want to improve writing more detailed procedures."');
    q6.setRequired(true);
    q6.setValidation(
      FormApp.createParagraphTextValidation()
        .requireTextLengthGreaterThanOrEqualTo(50)
        .build()
    );
    q6.setPoints(2);
    try {
      form.addSectionHeaderItem()
        .setTitle('RUBRIC (Teacher Grading):')
        .setHelpText('2pts: Specific skill + growth area | 1pt: General statements | 0pts: Off-topic');
    } catch (e) {
      Logger.log('[WARNING] Could not add final rubric: ' + e.message);
    }
    // FINAL CELEBRATION - SIMPLE
    try {
      form.addPageBreakItem().setTitle('Week 3 Complete');
      form.addSectionHeaderItem()
        .setTitle('Congratulations!')
        .setHelpText('You mastered MS-PS2-2 investigation planning! These skills transfer to all sciences.');
    } catch (e) {
      Logger.log('[WARNING] Could not add celebration: ' + e.message);
    }
    if (parentFolder) {
      try {
        moveToFolder(DriveApp.getFileById(form.getId()), parentFolder, 'Forms');
      } catch (e) {
        Logger.log('[WARNING] Could not move file: ' + e.message);
      }
    }
    Logger.log('[SUCCESS] Exit Ticket created: ' + form.getPublishedUrl());
    return form;
  } catch (e) {
    Logger.log('[ERROR] Failed to create Exit Ticket: ' + e.message);
    throw e;
  }
}
// ============================================================================
// MASTER FUNCTION
// ============================================================================
function createGrade8_Week3_NGSS_Aligned() {
  Logger.log('===============================================');
  Logger.log('GRADE 8 WEEK 3 - NGSS MS-PS2-2 ALIGNED');
  Logger.log('===============================================');
  const startTime = new Date();
  const forms = [];
  const errors = [];
  try {
    validateConfig(CONFIG_GRADE8_WEEK3);
    Logger.log('[STEP 1/6] Creating Hook...');
    Utilities.sleep(500);
    try {
      forms.push({
        name: 'Hook: F=ma Investigation Question',
        form: createGrade8_Hook_NGSS(),
        points: 10,
        time: 12
      });
    } catch (e) {
      errors.push('Hook: ' + e.message);
    }
    Logger.log('[STEP 2/6] Creating Station 1: Plan Force Investigation...');
    Utilities.sleep(500);
    try {
      forms.push({
        name: 'Station 1: Plan Force Investigation',
        form: createGrade8_Station1_NGSS(),
        points: 20,
        time: 14
      });
    } catch (e) {
      errors.push('Station 1: ' + e.message);
    }
    Logger.log('[STEP 3/6] Creating Station 2: Plan Mass Investigation...');
    Utilities.sleep(500);
    try {
      forms.push({
        name: 'Station 2: Plan Mass Investigation',
        form: createGrade8_Station2_NGSS(),
        points: 20,
        time: 14
      });
    } catch (e) {
      errors.push('Station 2: ' + e.message);
    }
    Logger.log('[STEP 4/6] Creating Station 3: Analyze Investigation Data...');
    Utilities.sleep(500);
    try {
      forms.push({
        name: 'Station 3: Analyze Data &amp; Construct Explanations',
        form: createGrade8_Station3_NGSS(),
        points: 20,
        time: 13
      });
    } catch (e) {
      errors.push('Station 3: ' + e.message);
    }
    Logger.log('[STEP 5/6] Creating Exit Ticket: Design Your Own Investigation...');
    Utilities.sleep(500);
    try {
      forms.push({
        name: 'Exit Ticket: Investigation Design Transfer',
        form: createGrade8_ExitTicket_NGSS(),
        points: 20,
        time: 10
      });
    } catch (e) {
      errors.push('Exit Ticket: ' + e.message);
    }
    const endTime = new Date();
    const duration = ((endTime - startTime) / 1000).toFixed(1);
    Logger.log('===============================================');
    Logger.log(errors.length === 0 ? 'SUCCESS!' : 'PARTIAL SUCCESS');
    Logger.log('===============================================');
    Logger.log('Time: ' + duration + ' seconds');
    Logger.log('Forms created: ' + forms.length + '/5');
    if (forms.length &gt; 0) {
      Logger.log('');
      Logger.log('FORM DETAILS:');
      forms.forEach(function(f, i) {
        Logger.log((i + 1) + '. ' + f.name);
        Logger.log('   Points: ' + f.points + ' | Time: ~' + f.time + ' min');
        Logger.log('   URL: ' + f.form.getPublishedUrl());
      });
    }
    if (errors.length &gt; 0) {
      Logger.log('');
      Logger.log('ERRORS:');
      errors.forEach(function(err, i) {
        Logger.log((i + 1) + '. ' + err);
      });
    }
    Logger.log('===============================================');
    Logger.log('NOTE: This is NGSS-ALIGNED to MS-PS2-2 (NOT momentum/impulse)');
    Logger.log('Momentum is HIGH SCHOOL content per NGSS/CSV guidance');
    Logger.log('===============================================');
    return forms;
  } catch (error) {
    Logger.log('CRITICAL ERROR: ' + error.message);
    throw error;
  }
}
