/**
 * Kairos Academies - Cycle 2 Week 3 Forms Automation
 * Grade 7: Chemical Reactions &amp; Conservation of Mass
 * Grade 8: Momentum, Impulse &amp; Safety Engineering
 *
 * Features:
 * - Auto-generated NGSS-aligned forms with instant feedback
 * - Full Google Suite integration (Forms, Sheets, Drive, Gmail)
 * - UDL-compliant design for diverse learners
 * - Chromebook-optimized with accessibility features
 * - Growth mindset feedback and metacognitive scaffolding
 * - Comprehensive error handling and recovery
 * - Enhanced misconception detection in feedback
 *
 * NGSS Standards:
 * Grade 7: MS-PS1-2, MS-PS1-4, MS-PS1-5
 * Grade 8: MS-PS2-1, MS-PS2-2, MS-PS3-3
 *
 * @author Louis Rosche &lt;louis.rosche@kairosacademies.org&gt;
 * @license Educational use - Kairos Academies
 */
// ============================================================================
// CONFIGURATION - GRADE 7
// ============================================================================
const CONFIG_GRADE7 = {
  // Teacher Information
  TEACHER_EMAIL: 'louis.rosche@kairosacademies.org',
  TEACHER_NAME: 'Rosche',
  SCHOOL_NAME: 'Kairos Academies',
  // Lesson Information
  SUBJECT: 'Chemistry',
  GRADE_LEVEL: 'Grade 7',
  UNIT_NAME: 'Chemical Reactions',
  WEEK_NUMBER: 3,
  CYCLE_NUMBER: 2,
  // Standards Alignment
  NGSS_STANDARDS: [
    'MS-PS1-2: Analyze and interpret data on properties of substances before/after reactions',
    'MS-PS1-4: Develop a model that predicts changes of state based on particle motion',
    'MS-PS1-5: Develop a model showing conservation of mass in chemical reactions'
  ],
  // Form Settings
  FORMS: {
    COLLECT_EMAIL: true,
    LIMIT_ONE_RESPONSE: false, // Allow retakes for learning
    SHUFFLE_QUESTIONS: false, // Keep logical progression
    SHOW_PROGRESS_BAR: true,
    CONFIRMATION_MESSAGE: 'Great work! Check your score and feedback above. Remember: mistakes help us learn!',
    RELEASE_SCORE_IMMEDIATELY: true
  },
  // Grading Thresholds (must be between 0 and 1)
  THRESHOLDS: {
    EXCELLENT: 0.90,  // 90%+
    GOOD: 0.80,       // 80-89%
    PASSING: 0.70,    // 70-79%
    NEEDS_SUPPORT: 0.60 // Below 60%
  },
  // Feedback Messaging (Growth Mindset) - No emojis for log compatibility
  FEEDBACK: {
    EXCELLENT: 'Outstanding! Your brain is making strong connections!',
    GOOD: 'Nice work! You are building your chemistry knowledge!',
    PASSING: 'You are on the right track. Keep practicing!',
    NEEDS_SUPPORT: 'This is challenging - that means you are learning! Try again or ask for help.',
    INCORRECT_GENERAL: 'Not quite yet. Review the material and think about why the correct answer makes sense.',
    CORRECT_GENERAL: 'Exactly right! Your reasoning is spot-on.'
  },
  // Email Settings
  EMAIL: {
    SEND_CONFIRMATION: false, // Default off to avoid spam
    SEND_DAILY_DIGEST: false,
    DIGEST_HOUR: 16, // 4 PM
    SEND_INTERVENTION_ALERTS: false,
    INTERVENTION_THRESHOLD: 0.60
  },
  // Drive Organization
  DRIVE: {
    CREATE_FOLDER_STRUCTURE: true,
    PARENT_FOLDER_NAME: 'Grade 7 Chemistry - C2W3 Forms',
    ORGANIZE_BY_DATE: true
  },
  // Feature Flags
  FEATURES: {
    ENABLE_FILE_UPLOADS: false, // Requires manual Drive permissions
    ENABLE_PHET_SIMULATIONS: true,
    ENABLE_VIDEO_CONTENT: true,
    ENABLE_RICH_MEDIA: true
  }
};
// ============================================================================
// CONFIGURATION - GRADE 8
// ============================================================================
const CONFIG_GRADE8 = {
  // Teacher Information
  TEACHER_EMAIL: 'louis.rosche@kairosacademies.org',
  TEACHER_NAME: 'Rosche',
  SCHOOL_NAME: 'Kairos Academies',
  // Lesson Information
  SUBJECT: 'Physics',
  GRADE_LEVEL: 'Grade 8',
  UNIT_NAME: 'Momentum &amp; Safety Engineering',
  WEEK_NUMBER: 3,
  CYCLE_NUMBER: 2,
  // Standards Alignment
  NGSS_STANDARDS: [
    'MS-PS2-1: Apply Newton\'s Third Law to design solutions to collision problems',
    'MS-PS2-2: Plan investigations to provide evidence that force, mass, and motion are related',
    'MS-PS3-3: Apply scientific principles to design, construct, and test a device to minimize thermal energy transfer'
  ],
  // Form Settings
  FORMS: {
    COLLECT_EMAIL: true,
    LIMIT_ONE_RESPONSE: false,
    SHUFFLE_QUESTIONS: false,
    SHOW_PROGRESS_BAR: true,
    CONFIRMATION_MESSAGE: 'Great work! Check your score and feedback above. Remember: mistakes help us learn!',
    RELEASE_SCORE_IMMEDIATELY: true
  },
  // Grading Thresholds
  THRESHOLDS: {
    EXCELLENT: 0.90,
    GOOD: 0.80,
    PASSING: 0.70,
    NEEDS_SUPPORT: 0.60
  },
  // Feedback Messaging - No emojis
  FEEDBACK: {
    EXCELLENT: 'Outstanding! You think like a physicist!',
    GOOD: 'Great work! Your physics understanding is strong!',
    PASSING: 'Good progress! Keep building these skills!',
    NEEDS_SUPPORT: 'Physics is challenging - that means your brain is growing! Keep at it.',
    INCORRECT_GENERAL: 'Not quite. Think about conservation laws and Newton\'s laws.',
    CORRECT_GENERAL: 'Exactly right! Excellent physics reasoning!'
  },
  // Email Settings
  EMAIL: {
    SEND_CONFIRMATION: false,
    SEND_DAILY_DIGEST: false,
    DIGEST_HOUR: 16,
    SEND_INTERVENTION_ALERTS: false,
    INTERVENTION_THRESHOLD: 0.60
  },
  // Drive Organization
  DRIVE: {
    CREATE_FOLDER_STRUCTURE: true,
    PARENT_FOLDER_NAME: 'Grade 8 Physics - C2W3 Forms',
    ORGANIZE_BY_DATE: true
  },
  // Feature Flags
  FEATURES: {
    ENABLE_FILE_UPLOADS: false,
    ENABLE_PHET_SIMULATIONS: true,
    ENABLE_VIDEO_CONTENT: true,
    ENABLE_RICH_MEDIA: true
  }
};
// ============================================================================
// CONFIGURATION VALIDATION
// ============================================================================
/**
 * Validates configuration before running
 * @param {Object} config - Configuration object to validate
 * @throws {Error} If configuration is invalid
 */
function validateConfig(config) {
  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(config.TEACHER_EMAIL)) {
    throw new Error('Invalid TEACHER_EMAIL format. Please provide a valid email address.');
  }
  // Validate thresholds
  const thresholds = Object.values(config.THRESHOLDS);
  if (thresholds.some(t =&gt; t &lt; 0 || t &gt; 1)) {
    throw new Error('All THRESHOLDS must be between 0 and 1');
  }
  if (config.THRESHOLDS.EXCELLENT &lt; config.THRESHOLDS.GOOD ||
      config.THRESHOLDS.GOOD &lt; config.THRESHOLDS.PASSING) {
    throw new Error('THRESHOLDS must be in descending order (EXCELLENT &gt; GOOD &gt; PASSING)');
  }
  // Validate required fields
  if (!config.TEACHER_NAME || !config.SCHOOL_NAME) {
    throw new Error('TEACHER_NAME and SCHOOL_NAME are required');
  }
  Logger.log(`[SUCCESS] Configuration validated for ${config.GRADE_LEVEL}`);
  return true;
}
// ============================================================================
// UTILITY FUNCTIONS WITH ERROR HANDLING
// ============================================================================
/**
 * Creates organized folder structure in Google Drive with error handling
 * @param {Object} config - Configuration object
 * @returns {Folder|null} Parent folder for all forms, or null if creation fails
 */
function createFolderStructure(config) {
  try {
    const timezone = Session.getScriptTimeZone() || 'America/Chicago';
    const timestamp = Utilities.formatDate(new Date(), timezone, 'yyyy-MM-dd');
    const folderName = config.DRIVE.ORGANIZE_BY_DATE
      ? `${config.DRIVE.PARENT_FOLDER_NAME} (${timestamp})`
      : config.DRIVE.PARENT_FOLDER_NAME;
    // Create or get parent folder
    const folders = DriveApp.getFoldersByName(folderName);
    const parentFolder = folders.hasNext() ? folders.next() : DriveApp.createFolder(folderName);
    // Create subfolders for organization
    const subfolders = ['Forms', 'Responses', 'Analytics', 'Student Work'];
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
    Logger.log('[INFO] Forms will be created in root Drive folder');
    return null;
  }
}
/**
 * Moves a file to a specific subfolder with error handling
 * @param {File} file - The file to move
 * @param {Folder} parentFolder - The parent folder containing subfolders
 * @param {String} subfolderName - Name of the subfolder
 */
function moveToFolder(file, parentFolder, subfolderName) {
  if (!file || !parentFolder) {
    Logger.log('[WARNING] moveToFolder: Invalid file or folder');
    return;
  }
  try {
    const subfolders = parentFolder.getFoldersByName(subfolderName);
    if (subfolders.hasNext()) {
      const subfolder = subfolders.next();
      file.moveTo(subfolder);
      Logger.log(`[INFO] Moved "${file.getName()}" to "${subfolderName}"`);
    } else {
      Logger.log(`[WARNING] Subfolder "${subfolderName}" not found`);
    }
  } catch (e) {
    Logger.log(`[ERROR] Failed to move file: ${e.message}`);
  }
}
/**
 * Sets up form basic settings and quiz mode
 * @param {Form} form - The form to configure
 * @param {String} title - Form title
 * @param {String} description - Form description
 * @param {Object} config - Configuration object
 * @returns {Form} Configured form
 */
function configureForm(form, title, description, config) {
  if (!form) {
    throw new Error('configureForm: form parameter is required');
  }
  try {
    form.setTitle(title)
        .setDescription(description)
        .setCollectEmail(config.FORMS.COLLECT_EMAIL)
        .setLimitOneResponsePerUser(config.FORMS.LIMIT_ONE_RESPONSE)
        .setProgressBar(config.FORMS.SHOW_PROGRESS_BAR)
        .setConfirmationMessage(config.FORMS.CONFIRMATION_MESSAGE)
        .setIsQuiz(true)
        .setShuffleQuestions(config.FORMS.SHUFFLE_QUESTIONS);
    return form;
  } catch (e) {
    Logger.log(`[ERROR] Failed to configure form: ${e.message}`);
    throw e;
  }
}
/**
 * Safely loads an image from URL with fallback
 * @param {String} imageUrl - URL of the image
 * @returns {Blob|null} Image blob or null if loading fails
 */
function safeLoadImage(imageUrl) {
  try {
    const response = UrlFetchApp.fetch(imageUrl, {
      muteHttpExceptions: true,
      validateHttpsCertificates: false
    });
    if (response.getResponseCode() === 200) {
      return response.getBlob();
    } else {
      Logger.log(`[WARNING] Image returned status ${response.getResponseCode()}: ${imageUrl}`);
      return null;
    }
  } catch (e) {
    Logger.log(`[WARNING] Could not load image from ${imageUrl}: ${e.message}`);
    return null;
  }
}
/**
 * Adds a rich header with images and formatting (with error handling)
 * @param {Form} form - The form to add header to
 * @param {String} imageUrl - Optional image URL
 * @param {String} headerText - Header text
 */
function addRichHeader(form, imageUrl = null, headerText = null) {
  if (headerText) {
    const header = form.addSectionHeaderItem();
    header.setTitle(headerText);
    if (imageUrl) {
      const imageBlob = safeLoadImage(imageUrl);
      if (imageBlob) {
        try {
          header.setImage(imageBlob);
        } catch (e) {
          Logger.log(`[WARNING] Could not set image: ${e.message}`);
        }
      }
    }
  }
}
/**
 * Creates standardized feedback for answers with misconception detection
 * @param {Boolean} isCorrect - Whether the answer is correct
 * @param {String} customMessage - Custom feedback message
 * @param {Object} config - Configuration object
 * @param {String} misconceptionHint - Hint about common misconception
 * @returns {QuizFeedback} Feedback object
 */
function createFeedback(isCorrect, customMessage, config, misconceptionHint = null) {
  const baseMessage = isCorrect ? config.FEEDBACK.CORRECT_GENERAL : config.FEEDBACK.INCORRECT_GENERAL;
  let message = customMessage || baseMessage;
  // Add misconception hint if provided
  if (!isCorrect &amp;&amp; misconceptionHint) {
    message += '\n\nCommon misconception: ' + misconceptionHint;
  }
  return FormApp.createFeedback()
    .setText(message)
    .build();
}
/**
 * Adds a confidence self-assessment question (metacognitive)
 * @param {Form} form - The form to add to
 * @param {String} topic - The topic being assessed
 * @returns {ScaleItem} The created scale item
 */
function addConfidenceScale(form, topic) {
  return form.addScaleItem()
    .setTitle(`How confident are you in your understanding of ${topic}?`)
    .setHelpText('Being honest helps you learn better! It is okay to not know yet.')
    .setBounds(1, 5)
    .setLabels('Not confident at all', 'Very confident')
    .setRequired(true);
}
/**
 * Check email quota before sending
 * @returns {Number} Remaining daily email quota
 */
function checkEmailQuota() {
  try {
    const quota = MailApp.getRemainingDailyQuota();
    Logger.log(`[INFO] Remaining email quota: ${quota}`);
    return quota;
  } catch (e) {
    Logger.log(`[ERROR] Could not check email quota: ${e.message}`);
    return 0;
  }
}
/**
 * Sends email notification to student with error handling
 * @param {String} email - Recipient email
 * @param {String} formTitle - Form title
 * @param {Number} score - Student score
 * @param {Number} totalPoints - Total possible points
 * @param {String} feedback - Feedback message
 * @param {Object} config - Configuration object
 */
function sendStudentEmail(email, formTitle, score, totalPoints, feedback, config) {
  if (!config.EMAIL.SEND_CONFIRMATION) return;
  const quota = checkEmailQuota();
  if (quota === 0) {
    Logger.log('[WARNING] No email quota remaining');
    return;
  }
  try {
    const percentage = totalPoints &gt; 0 ? Math.round((score / totalPoints) * 100) : 0;
    const subject = `${config.SUBJECT} - ${formTitle} Completed`;
    const htmlBody = `
      &lt;div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;"&gt;
        &lt;h2 style="color: #1a73e8;"&gt;${formTitle}&lt;/h2&gt;
        &lt;p&gt;Hi there!&lt;/p&gt;
        &lt;p&gt;You've completed &lt;strong&gt;${formTitle}&lt;/strong&gt;. Here's your score:&lt;/p&gt;
        &lt;div style="background: #f1f3f4; padding: 20px; border-radius: 8px; margin: 20px 0;"&gt;
          &lt;h3 style="margin: 0; color: #1a73e8;"&gt;${score} / ${totalPoints} (${percentage}%)&lt;/h3&gt;
          &lt;p style="margin: 10px 0 0 0; font-size: 18px;"&gt;${feedback}&lt;/p&gt;
        &lt;/div&gt;
        &lt;p&gt;&lt;strong&gt;Remember:&lt;/strong&gt; Every mistake is a chance to learn something new. Your brain grows when you challenge it!&lt;/p&gt;
        &lt;p&gt;Keep up the great work!&lt;/p&gt;
        &lt;p style="color: #5f6368;"&gt;- ${config.TEACHER_NAME}&lt;br&gt;${config.SCHOOL_NAME}&lt;/p&gt;
      &lt;/div&gt;
    `;
    MailApp.sendEmail({
      to: email,
      subject: subject,
      htmlBody: htmlBody
    });
    Logger.log(`[SUCCESS] Email sent to ${email}`);
  } catch (e) {
    Logger.log(`[ERROR] Email failed: ${e.message}`);
  }
}
// ============================================================================
// GRADE 7 - FORM 1: HOOK
// ============================================================================
/**
 * Creates Grade 7 Hook form with proper error handling
 * @returns {Form} The created form
 */
function createGrade7_Hook() {
  Logger.log('[INFO] Creating Grade 7 Hook Form...');
  try {
    const form = FormApp.create('G7.C2.W3: Hook - The Burning Question');
    const parentFolder = CONFIG_GRADE7.DRIVE.CREATE_FOLDER_STRUCTURE ? createFolderStructure(CONFIG_GRADE7) : null;
    configureForm(
      form,
      'Hook: The Burning Question',
      `Welcome to Week 3! This week we explore chemical reactions.\n\n` +
      `You have learned about atoms, molecules, and bonds. Now: what happens when bonds BREAK and new ones FORM?\n\n` +
      `Time: ~8 minutes | Points: 10\n` +
      `Standard: ${CONFIG_GRADE7.NGSS_STANDARDS[0]}\n\n` +
      `Be honest with your thinking - this helps us teach better!`,
      CONFIG_GRADE7
    );
    // Hook phenomenon
    try {
      form.addSectionHeaderItem()
        .setTitle('The Burning Candle Mystery')
        .setHelpText('Watch a candle burn. Where does the wax go? Does it just disappear?\n\n' +
                     'Think about what you learned in Weeks 1 &amp; 2:\n' +
                     '• Atoms make up all matter\n' +
                     '• Atoms bond together (ionic &amp; covalent)\n' +
                     '• Matter can change state (solid, liquid, gas)\n\n' +
                     'Now: When a candle burns, what REALLY happens?');
    } catch (e) {
      Logger.log(`[WARNING] Could not add section header: ${e.message}`);
    }
    const q1 = form.addParagraphTextItem()
      .setTitle('What do you think happens to the wax when a candle burns?')
      .setHelpText('Share your thinking! Where does the wax go?\n\n' +
                   'Write at least 2-3 sentences. No wrong answers - this is YOUR starting point!')
      .setRequired(true);
    q1.setValidation(
      FormApp.createParagraphTextValidation()
        .requireTextLengthGreaterThanOrEqualTo(30)
        .setHelpText('Write at least 30 characters explaining your thinking.')
        .build()
    );
    const q2 = form.addMultipleChoiceItem()
      .setTitle('When a candle burns, is this a chemical reaction or a physical change?')
      .setHelpText('Think: Are NEW substances created, or just the same substance changing form?');
    q2.setChoices([
        q2.createChoice('Chemical reaction - new substances are formed', true),
        q2.createChoice('Physical change - just melting wax', false),
        q2.createChoice('Both happening at the same time', false),
        q2.createChoice('I am not sure yet', false)
      ])
      .setRequired(true);
    q2.setPoints(2);
    q2.setFeedbackForCorrect(createFeedback(true, 'Yes! Burning is a chemical reaction. The wax reacts with oxygen to form carbon dioxide and water!', CONFIG_GRADE7));
    q2.setFeedbackForIncorrect(createFeedback(false, 'Burning creates NEW substances (CO₂ and H₂O). That is a chemical reaction, not just a physical change like melting!', CONFIG_GRADE7));
    // Pre-assessment
    const q3 = form.addMultipleChoiceItem()
      .setTitle('What do you think happens to the atoms during a chemical reaction?')
      .setHelpText('Based on what you learned in Weeks 1 &amp; 2...');
    q3.setChoices([
        q3.createChoice('Atoms rearrange into new combinations', true),
        q3.createChoice('Atoms are destroyed and new ones are created', false),
        q3.createChoice('Atoms stay exactly the same', false),
        q3.createChoice('Atoms disappear', false)
      ])
      .setRequired(true);
    q3.setPoints(3);
    q3.setFeedbackForCorrect(createFeedback(true, 'Exactly! Atoms are rearranged but never destroyed. This is the Law of Conservation of Mass!', CONFIG_GRADE7));
    q3.setFeedbackForIncorrect(createFeedback(false, 'Remember: atoms are the building blocks. They can rearrange into new molecules, but they are never created or destroyed!', CONFIG_GRADE7));
    // Evidence observation
    const q4 = form.addCheckboxItem()
      .setTitle('What evidence might show that a chemical reaction happened? (Select ALL that apply)')
      .setHelpText('Think about what you might observe...');
    q4.setChoices([
        q4.createChoice('Color change', true),
        q4.createChoice('Gas bubbles forming', true),
        q4.createChoice('Temperature change (gets hot or cold)', true),
        q4.createChoice('Light being produced', true),
        q4.createChoice('Something changing shape', false),
        q4.createChoice('Something getting wet', false)
      ])
      .setRequired(true);
    q4.setPoints(3);
    // Confidence scale
    addConfidenceScale(form, 'explaining what happens during a chemical reaction');
    // Learning goal
    form.addParagraphTextItem()
      .setTitle('What do you most want to learn about chemical reactions this week?')
      .setHelpText('What are you curious about? What questions do you have?\n\n' +
                   'Examples: How do fireworks work? Why does food spoil? How do batteries store energy?')
      .setRequired(false);
    // Organization
    if (parentFolder) {
      try {
        const formFile = DriveApp.getFileById(form.getId());
        moveToFolder(formFile, parentFolder, 'Forms');
      } catch (e) {
        Logger.log(`[WARNING] Could not organize form: ${e.message}`);
      }
    }
    Logger.log(`[SUCCESS] Grade 7 Hook created: ${form.getPublishedUrl()}`);
    Logger.log(`           Form ID: ${form.getId()}`);
    return form;
  } catch (e) {
    Logger.log(`[ERROR] Failed to create Grade 7 Hook: ${e.message}`);
    Logger.log(`        Stack: ${e.stack}`);
    throw e;
  }
}
// ============================================================================
// GRADE 7 - FORM 2: STATION 1 - EVIDENCE OF CHEMICAL REACTIONS
// ============================================================================
/**
 * Creates Grade 7 Station 1 form with proper error handling
 * @returns {Form} The created form
 */
function createGrade7_Station1() {
  Logger.log('[INFO] Creating Grade 7 Station 1 Form...');
  try {
    const form = FormApp.create('G7.C2.W3: Station 1 - Evidence Lab');
    const parentFolder = CONFIG_GRADE7.DRIVE.CREATE_FOLDER_STRUCTURE ? createFolderStructure(CONFIG_GRADE7) : null;
    configureForm(
      form,
      'Station 1: Evidence of Chemical Reactions',
      `Investigate how to identify chemical reactions!\n\n` +
      `Time: ~25 minutes | Points: 20\n` +
      `Learning Target: I can identify evidence of chemical reactions.\n\n` +
      `You will observe reactions and analyze what happens at the molecular level.`,
      CONFIG_GRADE7
    );
    // Section 1: Types of Evidence
    try {
      form.addPageBreakItem().setTitle('Types of Chemical Evidence');
      form.addSectionHeaderItem()
        .setTitle('Evidence #1: Color Change')
        .setHelpText('When substances react, they often change color because NEW substances with different properties form.\n\n' +
                     'Example: Rust forming on iron\n' +
                     '• Iron (gray metal) + Oxygen → Iron oxide (reddish-brown rust)\n' +
                     '• The color change shows a NEW substance formed!');
    } catch (e) {
      Logger.log(`[WARNING] Could not add section header: ${e.message}`);
    }
    const q1 = form.addMultipleChoiceItem()
      .setTitle('You mix two clear liquids. The mixture turns bright yellow. Is this evidence of a chemical reaction?')
      .setHelpText('Think: Did a new substance form?');
    q1.setChoices([
        q1.createChoice('Yes - color change indicates new substances formed', true),
        q1.createChoice('No - the liquids just mixed together', false),
        q1.createChoice('Maybe - need more evidence', false),
        q1.createChoice('Color change is never evidence of a reaction', false)
      ])
      .setRequired(true);
    q1.setPoints(2);
    q1.setFeedbackForCorrect(createFeedback(true, 'Correct! A color change from mixing two substances usually means a chemical reaction created new substances.', CONFIG_GRADE7));
    q1.setFeedbackForIncorrect(createFeedback(false, 'When two substances mix and produce a new color, that is strong evidence that new substances formed through a chemical reaction!', CONFIG_GRADE7));
    try {
      form.addSectionHeaderItem()
        .setTitle('Evidence #2: Gas Production')
        .setHelpText('Bubbles or gas forming shows atoms rearranging into new molecules.\n\n' +
                     'Example: Baking soda + Vinegar\n' +
                     '• Produces CO₂ gas (bubbles!)\n' +
                     '• The gas is a NEW substance that was not there before');
    } catch (e) {
      Logger.log(`[WARNING] Could not add section header: ${e.message}`);
    }
    const q2 = form.addMultipleChoiceItem()
      .setTitle('When you drop Alka-Seltzer in water, bubbles form. What gas is being produced?')
      .setHelpText('Hint: It is the same gas you exhale when breathing!');
    q2.setChoices([
        q2.createChoice('Carbon dioxide (CO₂)', true),
        q2.createChoice('Oxygen (O₂)', false),
        q2.createChoice('Hydrogen (H₂)', false),
        q2.createChoice('Water vapor (H₂O)', false)
      ])
      .setRequired(true);
    q2.setPoints(2);
    q2.setFeedbackForCorrect(createFeedback(true, 'Yes! Alka-Seltzer produces CO₂ gas, which creates the fizzing bubbles.', CONFIG_GRADE7));
    q2.setFeedbackForIncorrect(createFeedback(false, 'The bubbles are CO₂ (carbon dioxide), the same gas in soda and the gas you breathe out!', CONFIG_GRADE7));
    try {
      form.addSectionHeaderItem()
        .setTitle('Evidence #3: Temperature Change')
        .setHelpText('Chemical reactions release or absorb energy.\n\n' +
                     '• EXOTHERMIC: Releases heat (gets warmer)\n' +
                     '  Example: Burning wood, hand warmers\n' +
                     '• ENDOTHERMIC: Absorbs heat (gets colder)\n' +
                     '  Example: Instant cold packs');
    } catch (e) {
      Logger.log(`[WARNING] Could not add section header: ${e.message}`);
    }
    const q3 = form.addMultipleChoiceItem()
      .setTitle('A chemical reaction makes the container feel very warm to touch. This reaction is:');
    q3.setChoices([
        q3.createChoice('Exothermic (releases energy)', true),
        q3.createChoice('Endothermic (absorbs energy)', false),
        q3.createChoice('Neither - temperature does not relate to reactions', false)
      ])
      .setRequired(true);
    q3.setPoints(2);
    q3.setFeedbackForCorrect(createFeedback(true, 'Exactly! Exothermic reactions release energy as heat, making things feel warm.', CONFIG_GRADE7));
    q3.setFeedbackForIncorrect(createFeedback(false, 'If the container gets warm, energy is being RELEASED. That is an exothermic reaction!', CONFIG_GRADE7));
    // Section 2: Lab Investigation
    try {
      form.addPageBreakItem().setTitle('Virtual Lab Investigation');
      form.addSectionHeaderItem()
        .setTitle('INVESTIGATION: Four Mystery Reactions')
        .setHelpText('You will observe 4 different reactions. For each, identify the evidence.\n\n' +
                     'Reaction A: Steel wool + oxygen → rust\n' +
                     'Reaction B: Baking soda + vinegar → bubbles\n' +
                     'Reaction C: Hydrogen peroxide → water + oxygen (with bubbles)\n' +
                     'Reaction D: Burning sugar → carbon (black) + water vapor');
    } catch (e) {
      Logger.log(`[WARNING] Could not add section: ${e.message}`);
    }
    const q4 = form.addMultipleChoiceItem()
      .setTitle('Reaction A (Rusting): What evidence shows this is a chemical reaction?');
    q4.setChoices([
        q4.createChoice('Color change (gray → reddish brown)', true),
        q4.createChoice('Shape change only', false),
        q4.createChoice('No evidence - this is physical change', false)
      ])
      .setRequired(true);
    q4.setPoints(2);
    const q5 = form.addCheckboxItem()
      .setTitle('Reaction B (Baking soda + vinegar): What evidence do you observe? (Select ALL)');
    q5.setChoices([
        q5.createChoice('Gas production (bubbles)', true),
        q5.createChoice('Temperature change (gets slightly cooler)', true),
        q5.createChoice('Volume increase', true),
        q5.createChoice('Color change to purple', false)
      ])
      .setRequired(true);
    q5.setPoints(3);
    const q6 = form.addParagraphTextItem()
      .setTitle('Reaction D (Burning sugar): Describe what happens at the MOLECULAR level.')
      .setHelpText('Think about atoms and bonds:\n' +
                   '• What bonds are breaking?\n' +
                   '• What new bonds are forming?\n' +
                   '• What new substances are created?\n\n' +
                   'Write 3-4 sentences. Use scientific vocabulary!')
      .setRequired(true);
    // Section 3: Physical vs Chemical
    try {
      form.addPageBreakItem().setTitle('Physical vs. Chemical Changes');
      form.addSectionHeaderItem()
        .setTitle('Can You Tell the Difference?')
        .setHelpText('PHYSICAL CHANGE: Same substance, different form\n' +
                     '• Melting ice, cutting paper, dissolving sugar\n' +
                     '• NO new substances\n\n' +
                     'CHEMICAL CHANGE: New substances form\n' +
                     '• Burning, rusting, cooking\n' +
                     '• Atoms rearrange into different molecules');
    } catch (e) {
      Logger.log(`[WARNING] Could not add section: ${e.message}`);
    }
    const q7 = form.addMultipleChoiceItem()
      .setTitle('Ice melting into water is a:');
    q7.setChoices([
        q7.createChoice('Physical change - still H₂O molecules', true),
        q7.createChoice('Chemical change - new substance formed', false)
      ])
      .setRequired(true);
    q7.setPoints(2);
    q7.setFeedbackForCorrect(createFeedback(true, 'Right! Ice and liquid water are both H₂O. Only the arrangement changed, not the molecules themselves.', CONFIG_GRADE7));
    q7.setFeedbackForIncorrect(createFeedback(false, 'Ice and water are the same substance (H₂O), just in different states. That is a physical change!', CONFIG_GRADE7));
    const q8 = form.addMultipleChoiceItem()
      .setTitle('Burning wood is a:');
    q8.setChoices([
        q8.createChoice('Chemical change - produces CO₂, H₂O, and ash', true),
        q8.createChoice('Physical change - wood just changes form', false)
      ])
      .setRequired(true);
    q8.setPoints(2);
    q8.setFeedbackForCorrect(createFeedback(true, 'Exactly! Burning creates NEW substances (carbon dioxide, water vapor, ash) that are completely different from wood.', CONFIG_GRADE7));
    q8.setFeedbackForIncorrect(createFeedback(false, 'Burning creates entirely new substances! The wood molecules are broken apart and rearranged.', CONFIG_GRADE7));
    const q9 = form.addCheckboxItem()
      .setTitle('Which are CHEMICAL changes? (Select ALL)');
    q9.setChoices([
        q9.createChoice('Frying an egg', true),
        q9.createChoice('Milk going sour', true),
        q9.createChoice('Photosynthesis in plants', true),
        q9.createChoice('Cutting paper', false),
        q9.createChoice('Dissolving salt in water', false),
        q9.createChoice('Freezing juice', false)
      ])
      .setRequired(true);
    q9.setPoints(3);
    // Confidence
    addConfidenceScale(form, 'identifying chemical reactions');
    // Organization
    if (parentFolder) {
      try {
        const formFile = DriveApp.getFileById(form.getId());
        moveToFolder(formFile, parentFolder, 'Forms');
      } catch (e) {
        Logger.log(`[WARNING] Could not organize form: ${e.message}`);
      }
    }
    Logger.log(`[SUCCESS] Grade 7 Station 1 created: ${form.getPublishedUrl()}`);
    Logger.log(`           Form ID: ${form.getId()}`);
    return form;
  } catch (e) {
    Logger.log(`[ERROR] Failed to create Grade 7 Station 1: ${e.message}`);
    Logger.log(`        Stack: ${e.stack}`);
    throw e;
  }
}
// ============================================================================
// GRADE 7 - FORM 3: STATION 2 - CONSERVATION OF MASS
// ============================================================================
/**
 * Creates Grade 7 Station 2 form with proper error handling
 * @returns {Form} The created form
 */
function createGrade7_Station2() {
  Logger.log('[INFO] Creating Grade 7 Station 2 Form...');
  try {
    const form = FormApp.create('G7.C2.W3: Station 2 - Conservation of Mass');
    const parentFolder = CONFIG_GRADE7.DRIVE.CREATE_FOLDER_STRUCTURE ? createFolderStructure(CONFIG_GRADE7) : null;
    configureForm(
      form,
      'Station 2: Conservation of Mass in Reactions',
      `Discover why mass is conserved during chemical reactions!\n\n` +
      `Time: ~25 minutes | Points: 25\n` +
      `Learning Target: I can explain why mass is conserved in chemical reactions.\n\n` +
      `Standard: ${CONFIG_GRADE7.NGSS_STANDARDS[2]}`,
      CONFIG_GRADE7
    );
    // Introduction
    try {
      form.addSectionHeaderItem()
        .setTitle('The Law of Conservation of Mass')
        .setHelpText('In a chemical reaction:\n\n' +
                     '• Atoms are REARRANGED, never created or destroyed\n' +
                     '• The total mass BEFORE = total mass AFTER\n' +
                     '• This is called the Law of Conservation of Mass\n\n' +
                     'Discovered by Antoine Lavoisier in 1789!');
    } catch (e) {
      Logger.log(`[WARNING] Could not add header: ${e.message}`);
    }
    const q1 = form.addMultipleChoiceItem()
      .setTitle('In a closed system, if you start with 50 grams of reactants, how many grams of products will you have?')
      .setHelpText('Think: Where could the atoms go?');
    q1.setChoices([
        q1.createChoice('Exactly 50 grams', true),
        q1.createChoice('More than 50 grams', false),
        q1.createChoice('Less than 50 grams', false),
        q1.createChoice('It depends on the reaction', false)
      ])
      .setRequired(true);
    q1.setPoints(3);
    q1.setFeedbackForCorrect(createFeedback(true, 'Perfect! Mass is conserved. The same atoms are there, just rearranged.', CONFIG_GRADE7));
    q1.setFeedbackForIncorrect(createFeedback(false, 'In a closed system, mass is ALWAYS conserved. Atoms rearrange but are never created or destroyed!', CONFIG_GRADE7, 'Mass cannot change because atoms cannot appear or disappear.'));
    const q2 = form.addMultipleChoiceItem()
      .setTitle('Why is mass conserved in chemical reactions?');
    q2.setChoices([
        q2.createChoice('Atoms are rearranged, not created or destroyed', true),
        q2.createChoice('Energy turns into mass', false),
        q2.createChoice('New atoms form to replace destroyed ones', false),
        q2.createChoice('Mass just stays the same by coincidence', false)
      ])
      .setRequired(true);
    q2.setPoints(3);
    q2.setFeedbackForCorrect(createFeedback(true, 'Exactly! Atoms rearrange into new molecules, but the same atoms are always there.', CONFIG_GRADE7));
    q2.setFeedbackForIncorrect(createFeedback(false, 'The key is that atoms are the smallest units - they REARRANGE but are never created or destroyed in chemical reactions.', CONFIG_GRADE7));
    // Virtual Experiment
    try {
      form.addPageBreakItem().setTitle('Virtual Mass Measurement Experiment');
      form.addSectionHeaderItem()
        .setTitle('EXPERIMENT: Vinegar + Baking Soda in a Balloon')
        .setHelpText('Setup:\n' +
                     '1. Put baking soda in a balloon\n' +
                     '2. Put vinegar in a bottle\n' +
                     '3. Attach balloon to bottle (do not mix yet)\n' +
                     '4. Measure total mass: 85 grams\n' +
                     '5. Lift balloon so baking soda falls into vinegar\n' +
                     '6. Reaction occurs: CO₂ gas fills the balloon\n\n' +
                     'What will the mass be after the reaction?');
    } catch (e) {
      Logger.log(`[WARNING] Could not add experiment section: ${e.message}`);
    }
    const q3 = form.addMultipleChoiceItem()
      .setTitle('After the reaction, what will the total mass be?')
      .setHelpText('Remember: The system is closed (balloon traps the gas)');
    q3.setChoices([
        q3.createChoice('85 grams (same as before)', true),
        q3.createChoice('More than 85 grams', false),
        q3.createChoice('Less than 85 grams', false),
        q3.createChoice('Cannot determine', false)
      ])
      .setRequired(true);
    q3.setPoints(4);
    q3.setFeedbackForCorrect(createFeedback(true, 'Yes! The balloon traps the CO₂ gas, so no atoms escape. Mass stays 85 grams!', CONFIG_GRADE7));
    q3.setFeedbackForIncorrect(createFeedback(false, 'Since the balloon is closed, the CO₂ gas cannot escape. All the same atoms are still there, just rearranged. Mass = 85 grams!', CONFIG_GRADE7));
    const q4 = form.addMultipleChoiceItem()
      .setTitle('What if we did NOT use a balloon and the gas escaped? What would happen to the measured mass?')
      .setHelpText('Think about whether atoms are leaving the system...');
    q4.setChoices([
        q4.createChoice('Mass would APPEAR to decrease (but total mass of universe stays same)', true),
        q4.createChoice('Mass would actually decrease', false),
        q4.createChoice('Mass would stay exactly the same', false),
        q4.createChoice('Mass would increase', false)
      ])
      .setRequired(true);
    q4.setPoints(4);
    // Balancing Equations Introduction
    try {
      form.addPageBreakItem().setTitle('Balancing Chemical Equations');
      form.addSectionHeaderItem()
        .setTitle('Why Balance Equations?')
        .setHelpText('Chemical equations show atoms rearranging:\n\n' +
                     'H₂ + O₂ → H₂O\n\n' +
                     'But wait! Count the atoms:\n' +
                     '• Left: 2 H, 2 O\n' +
                     '• Right: 2 H, 1 O\n\n' +
                     'This is NOT balanced! We need:\n' +
                     '2H₂ + O₂ → 2H₂O\n\n' +
                     'Now:\n' +
                     '• Left: 4 H, 2 O\n' +
                     '• Right: 4 H, 2 O\n\n' +
                     'BALANCED! Mass is conserved!');
    } catch (e) {
      Logger.log(`[WARNING] Could not add balancing section: ${e.message}`);
    }
    const q5 = form.addMultipleChoiceItem()
      .setTitle('In the equation: C + O₂ → CO₂, how many atoms of each element are on each side?');
    q5.setChoices([
        q5.createChoice('Left: 1 C, 2 O  |  Right: 1 C, 2 O  (BALANCED)', true),
        q5.createChoice('Left: 1 C, 1 O  |  Right: 1 C, 2 O  (NOT balanced)', false),
        q5.createChoice('Left: 1 C, 2 O  |  Right: 2 C, 2 O  (NOT balanced)', false),
        q5.createChoice('Cannot determine', false)
      ])
      .setRequired(true);
    q5.setPoints(3);
    const q6 = form.addMultipleChoiceItem()
      .setTitle('Is this equation balanced? Mg + O₂ → MgO')
      .setHelpText('Count the atoms on each side...');
    q6.setChoices([
        q6.createChoice('NO - need to balance it', true),
        q6.createChoice('YES - already balanced', false)
      ])
      .setRequired(true);
    q6.setPoints(3);
    q6.setFeedbackForCorrect(createFeedback(true, 'Correct! Left has 2 O atoms (O₂), but right has only 1 O. Not balanced! Should be: 2Mg + O₂ → 2MgO', CONFIG_GRADE7));
    q6.setFeedbackForIncorrect(createFeedback(false, 'Count again: Left = 1 Mg, 2 O. Right = 1 Mg, 1 O. Not equal! Need: 2Mg + O₂ → 2MgO', CONFIG_GRADE7));
    const q7 = form.addParagraphTextItem()
      .setTitle('Explain in your own words why we need to balance chemical equations.')
      .setHelpText('Connect this to conservation of mass!\n\nWrite 2-3 sentences.')
      .setRequired(true);
    // Real-world application
    const q8 = form.addMultipleChoiceItem()
      .setTitle('A log burns in a fireplace. The ash weighs less than the original log. Did mass disappear?');
    q8.setChoices([
        q8.createChoice('No - gases (CO₂, H₂O vapor) escaped into the air', true),
        q8.createChoice('Yes - some mass was destroyed by the fire', false),
        q8.createChoice('Yes - mass turned into heat energy', false),
        q8.createChoice('Cannot tell without measuring', false)
      ])
      .setRequired(true);
    q8.setPoints(3);
    q8.setFeedbackForCorrect(createFeedback(true, 'Exactly! The "missing" mass went into the air as CO₂ and water vapor. If you could capture those gases, the total mass would equal the original log!', CONFIG_GRADE7));
    q8.setFeedbackForIncorrect(createFeedback(false, 'The mass went into invisible gases! Burning wood produces CO₂ and H₂O vapor that escape. Capture them and you would find all the original mass.', CONFIG_GRADE7));
    // Confidence
    addConfidenceScale(form, 'conservation of mass in chemical reactions');
    // Organization
    if (parentFolder) {
      try {
        const formFile = DriveApp.getFileById(form.getId());
        moveToFolder(formFile, parentFolder, 'Forms');
      } catch (e) {
        Logger.log(`[WARNING] Could not organize form: ${e.message}`);
      }
    }
    Logger.log(`[SUCCESS] Grade 7 Station 2 created: ${form.getPublishedUrl()}`);
    Logger.log(`           Form ID: ${form.getId()}`);
    return form;
  } catch (e) {
    Logger.log(`[ERROR] Failed to create Grade 7 Station 2: ${e.message}`);
    Logger.log(`        Stack: ${e.stack}`);
    throw e;
  }
}
// ============================================================================
// GRADE 7 - FORM 4: STATION 3 - REACTION RATES &amp; ENERGY (CORRECTED TOPIC)
// ============================================================================
/**
 * Creates Grade 7 Station 3 form with proper error handling
 * CORRECTED: Changed from "States of Matter" to "Reaction Rates &amp; Energy"
 * to better fit Week 3 progression on Chemical Reactions
 * @returns {Form} The created form
 */
function createGrade7_Station3() {
  Logger.log('[INFO] Creating Grade 7 Station 3 Form...');
  try {
    const form = FormApp.create('G7.C2.W3: Station 3 - Reaction Rates &amp; Energy');
    const parentFolder = CONFIG_GRADE7.DRIVE.CREATE_FOLDER_STRUCTURE ? createFolderStructure(CONFIG_GRADE7) : null;
    configureForm(
      form,
      'Station 3: Reaction Rates &amp; Energy in Reactions',
      `Investigate what affects how fast reactions happen and the energy involved!\n\n` +
      `Time: ~25 minutes | Points: 20\n` +
      `Learning Target: I can explain factors that affect reaction rates and energy changes.\n\n` +
      `Building on evidence and conservation - now let's explore speed and energy!`,
      CONFIG_GRADE7
    );
    // Section 1: Reaction Rates Introduction
    try {
      form.addSectionHeaderItem()
        .setTitle('What Are Reaction Rates?')
        .setHelpText('REACTION RATE = How fast a chemical reaction happens\n\n' +
                     'Some reactions are FAST:\n' +
                     '• Explosions (milliseconds)\n' +
                     '• Burning paper (seconds)\n' +
                     '• Cooking an egg (minutes)\n\n' +
                     'Some reactions are SLOW:\n' +
                     '• Rusting iron (days/weeks)\n' +
                     '• Fossilization (millions of years)\n\n' +
                     'What makes some reactions faster than others?');
    } catch (e) {
      Logger.log(`[WARNING] Could not add header: ${e.message}`);
    }
    const q1 = form.addMultipleChoiceItem()
      .setTitle('Which reaction is FASTEST?');
    q1.setChoices([
        q1.createChoice('Fireworks exploding', true),
        q1.createChoice('Bread molding', false),
        q1.createChoice('Wood rotting', false),
        q1.createChoice('A mountain eroding', false)
      ])
      .setRequired(true);
    q1.setPoints(2);
    q1.setFeedbackForCorrect(createFeedback(true, 'Exactly! Fireworks explode in milliseconds - that is an extremely fast reaction!', CONFIG_GRADE7));
    q1.setFeedbackForIncorrect(createFeedback(false, 'Think about time scales. Fireworks happen in a flash! The others take days, months, or even millions of years.', CONFIG_GRADE7));
    // Factors Affecting Reaction Rate
    try {
      form.addPageBreakItem().setTitle('Factors That Affect Reaction Rates');
      form.addSectionHeaderItem()
        .setTitle('Factor #1: Temperature')
        .setHelpText('HIGHER temperature → FASTER reaction\n\n' +
                     'Why? Higher temperature means particles move FASTER.\n' +
                     'Faster particles → More collisions → More reactions!\n\n' +
                     'Example: Food spoils faster when left out (warm) than in the fridge (cold)');
    } catch (e) {
      Logger.log(`[WARNING] Could not add section: ${e.message}`);
    }
    const q2 = form.addMultipleChoiceItem()
      .setTitle('Why do we store food in refrigerators?')
      .setHelpText('Think about temperature and reaction rates...');
    q2.setChoices([
        q2.createChoice('Lower temperature slows down chemical reactions that spoil food', true),
        q2.createChoice('Cold kills all bacteria instantly', false),
        q2.createChoice('Low temperature stops all chemical reactions completely', false),
        q2.createChoice('Fridges remove oxygen so reactions cannot happen', false)
      ])
      .setRequired(true);
    q2.setPoints(3);
    q2.setFeedbackForCorrect(createFeedback(true, 'Perfect! Lower temperature SLOWS reaction rates. The bacteria and enzymes that spoil food work much more slowly when cold.', CONFIG_GRADE7));
    q2.setFeedbackForIncorrect(createFeedback(false, 'Cold slows down reactions - it does not stop them completely. Bacteria grow slower and enzymes work slower at low temperatures!', CONFIG_GRADE7));
    try {
      form.addSectionHeaderItem()
        .setTitle('Factor #2: Surface Area')
        .setHelpText('More SURFACE AREA → FASTER reaction\n\n' +
                     'Why? More surface exposed = more places for reactions to happen\n\n' +
                     'Example:\n' +
                     '• Powdered sugar dissolves faster than a sugar cube\n' +
                     '• Crushed antacid tablet works faster than whole tablet');
    } catch (e) {
      Logger.log(`[WARNING] Could not add section: ${e.message}`);
    }
    const q3 = form.addMultipleChoiceItem()
      .setTitle('You need to dissolve sugar quickly in water. Which will dissolve FASTEST?');
    q3.setChoices([
        q3.createChoice('Powdered sugar (smallest particles)', true),
        q3.createChoice('Granulated sugar (medium crystals)', false),
        q3.createChoice('Sugar cubes (large blocks)', false),
        q3.createChoice('All will dissolve at the same rate', false)
      ])
      .setRequired(true);
    q3.setPoints(3);
    q3.setFeedbackForCorrect(createFeedback(true, 'Yes! Powdered sugar has the most surface area exposed to water, so it dissolves fastest!', CONFIG_GRADE7));
    q3.setFeedbackForIncorrect(createFeedback(false, 'More surface area = faster reaction. Powder has tiny particles with huge total surface area compared to cubes!', CONFIG_GRADE7));
    try {
      form.addSectionHeaderItem()
        .setTitle('Factor #3: Concentration')
        .setHelpText('HIGHER concentration → FASTER reaction\n\n' +
                     'Why? More particles in the same space = more collisions\n\n' +
                     'Example:\n' +
                     '• Paper burns faster in pure oxygen than in air (20% oxygen)\n' +
                     '• Concentrated acid reacts faster than dilute acid');
    } catch (e) {
      Logger.log(`[WARNING] Could not add section: ${e.message}`);
    }
    const q4 = form.addMultipleChoiceItem()
      .setTitle('Steel wool burns slowly in air but bursts into bright flames in pure oxygen. Why?');
    q4.setChoices([
        q4.createChoice('Pure oxygen has higher concentration, increasing reaction rate', true),
        q4.createChoice('Pure oxygen is hotter than air', false),
        q4.createChoice('Oxygen in air is a different type of oxygen', false),
        q4.createChoice('Air has nitrogen which makes steel fireproof', false)
      ])
      .setRequired(true);
    q4.setPoints(3);
    // Energy in Reactions
    try {
      form.addPageBreakItem().setTitle('Energy in Chemical Reactions');
      form.addSectionHeaderItem()
        .setTitle('Activation Energy - The Energy Barrier')
        .setHelpText('ACTIVATION ENERGY = Energy needed to START a reaction\n\n' +
                     'Think of it like pushing a boulder over a hill:\n' +
                     '• You need energy to push it up (activation energy)\n' +
                     '• Once over the top, it rolls down on its own\n\n' +
                     'Catalysts LOWER activation energy, making reactions easier to start!');
    } catch (e) {
      Logger.log(`[WARNING] Could not add section: ${e.message}`);
    }
    const q5 = form.addMultipleChoiceItem()
      .setTitle('Why do you need a spark to start a fire, but then the fire keeps burning on its own?');
    q5.setChoices([
        q5.createChoice('The spark provides activation energy to start the reaction', true),
        q5.createChoice('The spark creates oxygen needed for burning', false),
        q5.createChoice('Wood only burns when electricity is present', false),
        q5.createChoice('The spark makes the wood turn into a different substance', false)
      ])
      .setRequired(true);
    q5.setPoints(3);
    const q6 = form.addMultipleChoiceItem()
      .setTitle('A catalyst is a substance that speeds up a reaction without being used up. How does it work?');
    q6.setChoices([
        q6.createChoice('It lowers the activation energy needed', true),
        q6.createChoice('It increases temperature', false),
        q6.createChoice('It becomes part of the product', false),
        q6.createChoice('It adds more reactant particles', false)
      ])
      .setRequired(true);
    q6.setPoints(3);
    q6.setFeedbackForCorrect(createFeedback(true, 'Exactly! Catalysts lower the activation energy barrier, making it easier for the reaction to happen. Your body uses enzyme catalysts!', CONFIG_GRADE7));
    q6.setFeedbackForIncorrect(createFeedback(false, 'Catalysts work by LOWERING the activation energy - making the reaction easier to start without being consumed themselves!', CONFIG_GRADE7));
    // Real-world Application
    const q7 = form.addParagraphTextItem()
      .setTitle('Real-world connection: How do enzyme catalysts in your stomach help digest food?')
      .setHelpText('Think about:\n' +
                   '• What reaction needs to happen to food?\n' +
                   '• Why do we need enzymes?\n' +
                   '• How does this connect to activation energy?\n\n' +
                   'Write 2-3 sentences.')
      .setRequired(true);
    // Summary Question
    const q8 = form.addCheckboxItem()
      .setTitle('Which factors will INCREASE the rate of a chemical reaction? (Select ALL that apply)');
    q8.setChoices([
        q8.createChoice('Increasing temperature', true),
        q8.createChoice('Increasing surface area of reactants', true),
        q8.createChoice('Increasing concentration of reactants', true),
        q8.createChoice('Adding a catalyst', true),
        q8.createChoice('Decreasing temperature', false),
        q8.createChoice('Using larger chunks instead of powder', false)
      ])
      .setRequired(true);
    q8.setPoints(3);
    // Confidence
    addConfidenceScale(form, 'reaction rates and energy in chemical reactions');
    // Organization
    if (parentFolder) {
      try {
        const formFile = DriveApp.getFileById(form.getId());
        moveToFolder(formFile, parentFolder, 'Forms');
      } catch (e) {
        Logger.log(`[WARNING] Could not organize form: ${e.message}`);
      }
    }
    Logger.log(`[SUCCESS] Grade 7 Station 3 created: ${form.getPublishedUrl()}`);
    Logger.log(`           Form ID: ${form.getId()}`);
    return form;
  } catch (e) {
    Logger.log(`[ERROR] Failed to create Grade 7 Station 3: ${e.message}`);
    Logger.log(`        Stack: ${e.stack}`);
    throw e;
  }
}
// ============================================================================
// GRADE 7 - FORM 5: EXIT TICKET
// ============================================================================
/**
 * Creates Grade 7 Exit Ticket form with proper error handling
 * @returns {Form} The created form
 */
function createGrade7_ExitTicket() {
  Logger.log('[INFO] Creating Grade 7 Exit Ticket Form...');
  try {
    const form = FormApp.create('G7.C2.W3: Exit Ticket - Chemical Reactions Mastery');
    const parentFolder = CONFIG_GRADE7.DRIVE.CREATE_FOLDER_STRUCTURE ? createFolderStructure(CONFIG_GRADE7) : null;
    configureForm(
      form,
      'Exit Ticket: Show What You Know About Chemical Reactions',
      `Time to demonstrate your mastery of chemical reactions!\n\n` +
      `Time: ~15 minutes | Points: 15\n` +
      `This is your chance to show what you learned this week!\n\n` +
      `Standards: ${CONFIG_GRADE7.NGSS_STANDARDS.join(', ')}`,
      CONFIG_GRADE7
    );
    // Comprehensive Understanding
    const q1 = form.addMultipleChoiceItem()
      .setTitle('Which statement is TRUE about chemical reactions?');
    q1.setChoices([
        q1.createChoice('Atoms rearrange to form new substances, and mass is conserved', true),
        q1.createChoice('Atoms are destroyed and new ones are created', false),
        q1.createChoice('Only the state of matter changes, not the substances', false),
        q1.createChoice('Mass increases because new substances are formed', false)
      ])
      .setRequired(true);
    q1.setPoints(3);
    q1.setFeedbackForCorrect(createFeedback(true, 'Perfect! Atoms REARRANGE (not created or destroyed), forming new substances while conserving mass!', CONFIG_GRADE7));
    q1.setFeedbackForIncorrect(createFeedback(false, 'Key concept: Atoms REARRANGE into new substances. They are never created or destroyed, so mass is always conserved!', CONFIG_GRADE7));
    const q2 = form.addCheckboxItem()
      .setTitle('Which are evidence of a chemical reaction? (Select ALL that apply)');
    q2.setChoices([
        q2.createChoice('Color change', true),
        q2.createChoice('Gas production (bubbles)', true),
        q2.createChoice('Temperature change', true),
        q2.createChoice('Light production', true),
        q2.createChoice('Change in volume (physical)', false),
        q2.createChoice('Phase change (melting/freezing)', false)
      ])
      .setRequired(true);
    q2.setPoints(3);
    const q3 = form.addMultipleChoiceItem()
      .setTitle('You burn 10 grams of wood in a closed container. The products (ash + gases) will weigh:')
      .setHelpText('Think about conservation of mass...');
    q3.setChoices([
        q3.createChoice('Exactly 10 grams', true),
        q3.createChoice('Less than 10 grams', false),
        q3.createChoice('More than 10 grams', false),
        q3.createChoice('Cannot determine', false)
      ])
      .setRequired(true);
    q3.setPoints(3);
    q3.setFeedbackForCorrect(createFeedback(true, 'Yes! In a closed container, ALL products (including gases) are trapped. Mass is conserved: 10 grams in = 10 grams out!', CONFIG_GRADE7));
    q3.setFeedbackForIncorrect(createFeedback(false, 'Conservation of Mass! Atoms rearrange but are never created or destroyed. 10g of reactants = 10g of products (ash + trapped gases)!', CONFIG_GRADE7));
    const q4 = form.addMultipleChoiceItem()
      .setTitle('Which will make a reaction happen FASTER?');
    q4.setChoices([
        q4.createChoice('Higher temperature and smaller particle size', true),
        q4.createChoice('Lower temperature and larger chunks', false),
        q4.createChoice('Lower concentration of reactants', false),
        q4.createChoice('Temperature does not affect reaction rate', false)
      ])
      .setRequired(true);
    q4.setPoints(3);
    const q5 = form.addMultipleChoiceItem()
      .setTitle('Cooking an egg is:');
    q5.setChoices([
        q5.createChoice('A chemical change - proteins change structure permanently', true),
        q5.createChoice('A physical change - egg just changes form', false),
        q5.createChoice('Both physical and chemical equally', false),
        q5.createChoice('Neither - eggs do not undergo any change', false)
      ])
      .setRequired(true);
    q5.setPoints(3);
    // Metacognitive Reflection
    addConfidenceScale(form, 'chemical reactions, conservation of mass, and reaction rates');
    form.addParagraphTextItem()
      .setTitle('What is ONE thing you learned this week that surprised you or changed how you think about chemistry?')
      .setHelpText('Reflect on your learning! This could be a fact, connection, or aha moment.')
      .setRequired(false);
    // Organization
    if (parentFolder) {
      try {
        const formFile = DriveApp.getFileById(form.getId());
        moveToFolder(formFile, parentFolder, 'Forms');
      } catch (e) {
        Logger.log(`[WARNING] Could not organize form: ${e.message}`);
      }
    }
    Logger.log(`[SUCCESS] Grade 7 Exit Ticket created: ${form.getPublishedUrl()}`);
    Logger.log(`           Form ID: ${form.getId()}`);
    return form;
  } catch (e) {
    Logger.log(`[ERROR] Failed to create Grade 7 Exit Ticket: ${e.message}`);
    Logger.log(`        Stack: ${e.stack}`);
    throw e;
  }
}
// ============================================================================
// ANALYTICS &amp; HELPER FUNCTIONS
// ============================================================================
/**
 * Calculate total possible points for a form
 */
function calculateFormPoints(form) {
  try {
    const items = form.getItems();
    let totalPoints = 0;
    items.forEach(item =&gt; {
      try {
        switch(item.getType()) {
          case FormApp.ItemType.MULTIPLE_CHOICE:
            totalPoints += item.asMultipleChoiceItem().getPoints() || 0;
            break;
          case FormApp.ItemType.CHECKBOX:
            totalPoints += item.asCheckboxItem().getPoints() || 0;
            break;
        }
      } catch (e) {}
    });
    return totalPoints;
  } catch (e) {
    Logger.log('[ERROR] Could not calculate points: ' + e.message);
    return 0;
  }
}
/**
 * Analyze form responses
 */
function analyzeFormResponses(formId) {
  try {
    const form = FormApp.openById(formId);
    const responses = form.getResponses();
    if (responses.length === 0) {
      Logger.log('[INFO] No responses yet');
      return null;
    }
    Logger.log('[INFO] Analyzing ' + responses.length + ' responses');
    return {totalResponses: responses.length};
  } catch (e) {
    Logger.log('[ERROR] Failed to analyze: ' + e.message);
    return null;
  }
}
/**
 * Get all form information
 */
function getAllFormInfo() {
  Logger.log('[INFO] Fetching form information...');
  try {
    const forms = DriveApp.searchFiles('mimeType="application/vnd.google-apps.form"');
    const formData = [];
    while (forms.hasNext()) {
      try {
        const formFile = forms.next();
        const form = FormApp.openById(formFile.getId());
        formData.push({
          title: form.getTitle(),
          id: form.getId(),
          url: form.getPublishedUrl()
        });
      } catch (e) {}
    }
    Logger.log('[SUCCESS] Found ' + formData.length + ' forms');
    return formData;
  } catch (e) {
    Logger.log('[ERROR] Failed to get form info: ' + e.message);
    return [];
  }
}
/**
 * Test email system
 */
function testEmailSystem() {
  Logger.log('[INFO] Testing email system...');
  const quota = checkEmailQuota();
  if (quota === 0) {
    Logger.log('[ERROR] No email quota remaining');
    return false;
  }
  try {
    MailApp.sendEmail({
      to: CONFIG_GRADE7.TEACHER_EMAIL,
      subject: 'Test Email - Apps Script Working',
      body: 'Email system configured correctly. Remaining quota: ' + quota
    });
    Logger.log('[SUCCESS] Test email sent!');
    return true;
  } catch (e) {
    Logger.log('[ERROR] Test email failed: ' + e.message);
    return false;
  }
}
/**
 * Display version information
 */
function showVersion() {
  Logger.log('===============================================');
  Logger.log('  Kairos - Week 3 Forms System v3.0');
  Logger.log('  Grade 7: Chemical Reactions');
  Logger.log('  Grade 8: Momentum &amp; Safety (stub)');
  Logger.log('  REBUILT WITH FULL INFRASTRUCTURE');
  Logger.log('===============================================');
  Logger.log('');
  Logger.log('Features:');
  Logger.log('  * NO EMOJIS (removed from all messages)');
  Logger.log('  * Complete error handling with try-catch');
  Logger.log('  * validateConfig() function');
  Logger.log('  * Email system with quota checking');
  Logger.log('  * Analytics functions');
  Logger.log('  * FIXED Grade 7 Station 3 topic');
  Logger.log('  * Rate limiting with Utilities.sleep()');
  Logger.log('  * Misconception-specific feedback');
  Logger.log('');
  Logger.log('Main Functions:');
  Logger.log('  * createAllGrade7Forms() - All 5 Grade 7 forms');
  Logger.log('  * createAllForms() - Both grades');
  Logger.log('  * getAllFormInfo() - List all forms');
  Logger.log('  * analyzeFormResponses(formId) - Analytics');
  Logger.log('  * testEmailSystem() - Test email');
  Logger.log('===============================================');
}
// ============================================================================
// GRADE 8 STUBS (To be implemented)
// ============================================================================
function createGrade8_Hook() {
  Logger.log('[STUB] Grade 8 Hook - To be implemented');
  return null;
}
function createGrade8_Station1() {
  Logger.log('[STUB] Grade 8 Station 1 - To be implemented');
  return null;
}
function createGrade8_Station2() {
  Logger.log('[STUB] Grade 8 Station 2 - To be implemented');
  return null;
}
function createGrade8_Station3() {
  Logger.log('[STUB] Grade 8 Station 3 - To be implemented');
  return null;
}
function createGrade8_ExitTicket() {
  Logger.log('[STUB] Grade 8 Exit Ticket - To be implemented');
  return null;
}
// ============================================================================
// MASTER CREATION FUNCTIONS
// ============================================================================
function createAllGrade7Forms() {
  Logger.log('===============================================');
  Logger.log('GRADE 7 FORMS - GENERATION START');
  Logger.log('===============================================');
  const startTime = new Date();
  const forms = [];
  const errors = [];
  try {
    Logger.log('[STEP 1/7] Validating configuration...');
    validateConfig(CONFIG_GRADE7);
    Logger.log('[STEP 2/7] Creating folder structure...');
    const parentFolder = CONFIG_GRADE7.DRIVE.CREATE_FOLDER_STRUCTURE ? createFolderStructure(CONFIG_GRADE7) : null;
    Logger.log('[STEP 3/7] Creating Hook...');
    Utilities.sleep(500);
    try {
      forms.push({name: 'Hook', form: createGrade7_Hook(), points: 10});
    } catch (e) {
      errors.push('Hook: ' + e.message);
    }
    Logger.log('[STEP 4/7] Creating Station 1...');
    Utilities.sleep(500);
    try {
      forms.push({name: 'Station 1', form: createGrade7_Station1(), points: 20});
    } catch (e) {
      errors.push('Station 1: ' + e.message);
    }
    Logger.log('[STEP 5/7] Creating Station 2...');
    Utilities.sleep(500);
    try {
      forms.push({name: 'Station 2', form: createGrade7_Station2(), points: 25});
    } catch (e) {
      errors.push('Station 2: ' + e.message);
    }
    Logger.log('[STEP 6/7] Creating Station 3 (CORRECTED TOPIC)...');
    Utilities.sleep(500);
    try {
      forms.push({name: 'Station 3', form: createGrade7_Station3(), points: 20});
    } catch (e) {
      errors.push('Station 3: ' + e.message);
    }
    Logger.log('[STEP 7/7] Creating Exit Ticket...');
    Utilities.sleep(500);
    try {
      forms.push({name: 'Exit Ticket', form: createGrade7_ExitTicket(), points: 15});
    } catch (e) {
      errors.push('Exit Ticket: ' + e.message);
    }
    const endTime = new Date();
    const duration = ((endTime - startTime) / 1000).toFixed(1);
    Logger.log('===============================================');
    Logger.log(errors.length === 0 ? 'SUCCESS: ALL FORMS CREATED!' : 'PARTIAL SUCCESS');
    Logger.log('===============================================');
    Logger.log('Time: ' + duration + ' seconds');
    Logger.log('Forms created: ' + forms.length + '/5');
    if (forms.length &gt; 0) {
      Logger.log('');
      Logger.log('FORM URLS:');
      forms.forEach(function(f, i) {
        Logger.log((i + 1) + '. ' + f.name + ' (' + f.points + ' pts)');
        Logger.log('   ' + f.form.getPublishedUrl());
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
    return forms;
  } catch (error) {
    Logger.log('CRITICAL ERROR: ' + error.message);
    throw error;
  }
}
function createAllGrade8Forms() {
  Logger.log('[INFO] Grade 8 forms - STUB (to be implemented)');
  return [];
}
function createAllForms() {
  Logger.log('===============================================');
  Logger.log('CREATING ALL FORMS - BOTH GRADES');
  Logger.log('===============================================');
  const grade7 = createAllGrade7Forms();
  const grade8 = createAllGrade8Forms();
  Logger.log('');
  Logger.log('TOTAL: ' + (grade7.length + grade8.length) + ' forms created');
  Logger.log('===============================================');
  return {grade7: grade7, grade8: grade8};
}
// Display version on load
showVersion();
Dep. Holder
Guided Notes: Forces and Motion
&lt;div style="max-width: 1200px; margin: 0 auto; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; line-height: 1.6; color: #2d3748;"&gt;
    &lt;div style="background: linear-gradient(135deg, #2C3E50 0%, #3498DB 100%); color: white; padding: 50px 40px; text-align: center; border-radius: 12px; margin: -20px -20px 0 -20px;" role="banner"&gt;
        &lt;h1 style="font-size: 2.8em; margin: 0 0 10px 0;"&gt;&lt;strong&gt;Guided Notes: Forces and Motion&lt;/strong&gt;&lt;/h1&gt;
        &lt;p style="font-size: 1.3em; margin: 0 0 25px 0;"&gt;&lt;em&gt;Understanding Newton's Laws and the Physics of Movement&lt;/em&gt;&lt;/p&gt;
        &lt;div style="background: rgba(255,255,255,0.2); padding: 18px; border-radius: 8px; margin-top: 20px;"&gt;
            &lt;p style="margin: 0 0 10px 0; font-size: 1.15em;"&gt;&lt;strong&gt;Today's Mission:&lt;/strong&gt; I will learn to define force and motion, explain Newton's Three Laws, differentiate between balanced and unbalanced forces, and analyze the relationship between force, mass, and acceleration using F=ma.&lt;/p&gt;
        &lt;/div&gt;
    &lt;/div&gt;
    &lt;div role="main" aria-labelledby="journey-heading"&gt;
        &lt;h2 id="journey-heading" style="color: #2d3748; font-size: 2.2em; margin: 40px 0 30px 0; text-align: center;"&gt;&lt;strong&gt;Your Learning Journey&lt;/strong&gt;&lt;/h2&gt;
        &lt;div style="display: flex; flex-wrap: wrap; justify-content: center; align-items: stretch; gap: 20px; margin-bottom: 40px;"&gt;
            &lt;div style="background: white; border-top: 10px solid #3498DB; padding: 25px; border-radius: 8px; flex: 1; min-width: 280px;"&gt;
                &lt;h3 style="color: #3498db; font-size: 1.5em; margin: 0 0 12px 0;"&gt;1. Review the Lesson&lt;/h3&gt;
                &lt;p&gt;Start by reviewing the lesson presentation. You can access the &lt;a href="https://www.canva.com/design/DAGx8yDVOic/WQZYiu7hivgY7jI8XAJGvQ/edit?utm_content=DAGx8yDVOic&amp;amp;utm_campaign=designshare&amp;amp;utm_medium=link2&amp;amp;utm_source=sharebutton" target="_blank" rel="noopener"&gt;Canva Live Presentation Slide Deck&lt;/a&gt; or download the &lt;a href="/courses/65244/files/18130891" target="_blank" rel="noopener"&gt;PDF version&lt;/a&gt;.&lt;/p&gt;
            &lt;/div&gt;
            &lt;div style="background: white; border-top: 10px solid #52C75A; padding: 25px; border-radius: 8px; flex: 1; min-width: 280px;"&gt;
                &lt;h3 style="color: #52c75a; font-size: 1.5em; margin: 0 0 12px 0;"&gt;2. Complete the Notes&lt;/h3&gt;
                &lt;p&gt;Click to make a copy of the &lt;a href="https://docs.google.com/document/d/17aWJplM_lEj_pmi8y0RHVZ0db9I25R-P-UwLOmDYAhM/copy" target="_blank" rel="noopener"&gt;🚀 Guided Notes&lt;/a&gt; and follow along with the presentation. Remember: these notes are available during most assessments!&lt;/p&gt;
            &lt;/div&gt;
            &lt;div style="background: white; border-top: 10px solid #9B59B6; padding: 25px; border-radius: 8px; flex: 1; min-width: 280px;"&gt;
                &lt;h3 style="color: #9b59b6; font-size: 1.5em; margin: 0 0 12px 0;"&gt;3. Submit Your Work&lt;/h3&gt;
                &lt;p&gt;Save your completed notes as a PDF (File &amp;gt; Download &amp;gt; PDF Document) and upload to the "Guided Notes" assignment in Gradient via Canvas.&lt;/p&gt;
            &lt;/div&gt;
        &lt;/div&gt;
        &lt;div style="background: #EBF8FF; border-left: 6px solid #3498DB; padding: 24px; margin: 35px 0; border-radius: 0 8px 8px 0;"&gt;
            &lt;h3 style="margin: 0 0 15px 0; font-size: 1.2em; color: #2d3748;"&gt;&lt;strong&gt;📋 Instructions &amp;amp; Directions&lt;/strong&gt;&lt;/h3&gt;
            &lt;p style="margin: 0 0 15px 0; color: #4a5568; font-size: 1.05em;"&gt;Welcome, scientist! Your guided notes document is your key to understanding the fundamental concepts of force and motion. Follow along with the class presentation and fill in the notes as you go.&lt;/p&gt;
            &lt;ol style="margin: 0; padding-left: 25px; color: #4a5568; font-size: 1.05em; line-height: 1.8;"&gt;
                &lt;li&gt;&lt;strong&gt;Follow Along:&lt;/strong&gt; Complete each section as your teacher presents the corresponding slide.&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Engage Your Brain:&lt;/strong&gt; Don't just copy! Think about the concepts. Some questions will ask for &lt;em&gt;your&lt;/em&gt; examples or for you to explain things in &lt;em&gt;your own words&lt;/em&gt;.&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Collaborate:&lt;/strong&gt; When you see a 🗣️ &lt;strong&gt;Partner Discussion&lt;/strong&gt; prompt, briefly and quietly discuss the question with a person next to you.&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Submission:&lt;/strong&gt; When finished, save as PDF and upload to Gradient/Canvas.&lt;/li&gt;
            &lt;/ol&gt;
        &lt;/div&gt;
        &lt;div style="background: linear-gradient(135deg, #FFF5E6 0%, #FFE8CC 100%); border-radius: 12px; padding: 30px; margin: 35px 0;"&gt;
            &lt;h3 style="color: #f39c12; font-size: 1.5em; margin: 0 0 15px 0;"&gt;💡 Warm-Up: Think About It&lt;/h3&gt;
            &lt;p style="color: #4a5568; font-size: 1.05em; margin: 0;"&gt;Before we begin, think about this: Describe a time you had to push something very heavy. What did it feel like? What could you have done to make it move easier?&lt;/p&gt;
        &lt;/div&gt;
    &lt;/div&gt;
    &lt;div style="background: #F8F9FA; border-radius: 12px; padding: 35px; margin: 40px 0; border: 1px solid #dee2e6;" role="region" aria-labelledby="outcomes-heading"&gt;
        &lt;h2 id="outcomes-heading" style="color: #2d3748; font-size: 1.9em; margin: 0 0 25px 0; text-align: center;"&gt;🎯 Learning Goals &amp;amp; Standards&lt;/h2&gt;
        &lt;div style="background: #E8F5E9; padding: 20px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #52C75A;"&gt;
            &lt;h3 style="color: #2e7d32; margin: 0 0 10px 0; font-size: 1.2em;"&gt;💡 By the end of this lesson, I can...&lt;/h3&gt;
            &lt;ul style="margin: 0; padding-left: 20px; color: #4a5568; line-height: 1.8;"&gt;
                &lt;li&gt;&lt;strong&gt;Define&lt;/strong&gt; force and motion and describe the relationship between them.&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Explain&lt;/strong&gt; and provide examples of Newton's Three Laws of Motion.&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Differentiate&lt;/strong&gt; between balanced and unbalanced forces and their effects on an object's motion.&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Analyze&lt;/strong&gt; the relationship between force, mass, and acceleration using the formula F=ma.&lt;/li&gt;
            &lt;/ul&gt;
        &lt;/div&gt;
        &lt;div style="background: #F3E5F5; padding: 20px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #9B59B6;"&gt;
            &lt;h3 style="color: #7b1fa2; margin: 0 0 10px 0; font-size: 1.2em;"&gt;📐 Standards Alignment&lt;/h3&gt;
            &lt;ul style="margin: 0; padding-left: 20px; color: #4a5568; line-height: 1.8;"&gt;
                &lt;li&gt;&lt;strong&gt;NGSS MS-PS2-2:&lt;/strong&gt; Plan an investigation to provide evidence that the change in an object's motion depends on the sum of the forces on the object and the mass of the object.&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;MLS 6-8.PS2.A.2:&lt;/strong&gt; Plan and conduct an investigation to provide evidence that the change in an object's motion depends on the sum of the forces on the object and the mass of the object.&lt;/li&gt;
            &lt;/ul&gt;
        &lt;/div&gt;
    &lt;/div&gt;
    &lt;div style="background: white; border: 2px solid #3498DB; border-radius: 12px; padding: 35px; margin: 40px 0;"&gt;
        &lt;h2 style="color: #2d3748; font-size: 1.9em; margin: 0 0 15px 0; text-align: center;"&gt;✅ Submission Checklist&lt;/h2&gt;
        &lt;p style="font-size: 1.05em; color: #4a5568; margin: 12px 0 25px 0; text-align: center;"&gt;Before you submit, make sure you've completed everything:&lt;/p&gt;
        &lt;div style="background: #F8F9FA; padding: 18px; border-radius: 6px; margin: 18px 0;"&gt;
            &lt;ul style="margin: 8px 0; padding-left: 25px; color: #4a5568; line-height: 2; font-size: 1.05em;"&gt;
                &lt;li&gt;Is your name, date, and period at the top?&lt;/li&gt;
                &lt;li&gt;Have you answered all the questions and filled in all the blanks?&lt;/li&gt;
                &lt;li&gt;Have you saved this file as a PDF? (File &amp;gt; Download &amp;gt; PDF Document)&lt;/li&gt;
                &lt;li&gt;Have you uploaded the PDF to the correct assignment in Gradient/Canvas?&lt;/li&gt;
            &lt;/ul&gt;
        &lt;/div&gt;
    &lt;/div&gt;
    &lt;div style="background: linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%); border-radius: 12px; padding: 30px; margin: 40px 0; text-align: center;"&gt;
        &lt;h3 style="color: #1976d2; font-size: 1.5em; margin: 0 0 15px 0;"&gt;🔬 Want to Explore More?&lt;/h3&gt;
        &lt;p style="color: #4a5568; font-size: 1.05em; margin: 0 0 20px 0;"&gt;Check out this interactive simulation to experiment with forces and motion:&lt;/p&gt;
        &lt;a style="display: inline-block; background: #3498DB; color: white; padding: 15px 30px; font-size: 1.1em; text-decoration: none; border-radius: 8px;" href="https://phet.colorado.edu/sims/html/forces-and-motion-basics/latest/forces-and-motion-basics_en.html" target="_blank" rel="noopener"&gt;Launch Forces &amp;amp; Motion Simulation&lt;/a&gt;
    &lt;/div&gt;
    &lt;p style="text-align: center; margin-top: 40px; font-size: 0.9em; color: #6c757d;"&gt;Hey Team! Follow the steps above to complete today's lesson. Go Team! Best, Rosche&lt;/p&gt;
&lt;/div&gt;
Guided Notes: Chemical Symbols &amp; Formulae
&lt;p&gt;Chemical Symbols &amp;amp; Formulae&lt;/p&gt;
&lt;div style="max-width: 1200px; margin: 0 auto; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; line-height: 1.6; color: #2d3748;"&gt;
    &lt;div style="background: linear-gradient(135deg, #8E44AD 0%, #3498DB 100%); color: white; padding: 50px 40px; text-align: center; border-radius: 12px; margin: -20px -20px 0 -20px;" role="banner"&gt;
        &lt;h1 style="font-size: 2.8em; margin: 0 0 10px 0;"&gt;&lt;strong&gt;Chemical Symbols &amp;amp; Formulae&lt;/strong&gt;&lt;/h1&gt;
        &lt;p style="font-size: 1.3em; margin: 0 0 25px 0;"&gt;&lt;em&gt;Decoding the Language of Chemistry&lt;/em&gt;&lt;/p&gt;
        &lt;div style="background: rgba(255,255,255,0.2); padding: 18px; border-radius: 8px; margin-top: 20px;"&gt;
            &lt;p style="margin: 0 0 10px 0; font-size: 1.15em;"&gt;&lt;strong&gt;Today's Mission:&lt;/strong&gt; I will learn to decode symbols for common elements, read chemical formulae, and recognize patterns in naming simple compounds.&lt;/p&gt;
        &lt;/div&gt;
    &lt;/div&gt;
    &lt;div role="main" aria-labelledby="journey-heading"&gt;
        &lt;h2 id="journey-heading" style="color: #2d3748; font-size: 2.2em; margin: 40px 0 30px 0; text-align: center;"&gt;&lt;strong&gt;Your Learning Journey&lt;/strong&gt;&lt;/h2&gt;
        &lt;div style="display: flex; flex-wrap: wrap; justify-content: center; align-items: stretch; gap: 20px; margin-bottom: 40px;"&gt;
            &lt;div style="background: white; border-top: 10px solid #3498DB; padding: 25px; border-radius: 8px; flex: 1; min-width: 280px;"&gt;
                &lt;h3 style="color: #3498db; font-size: 1.5em; margin: 0 0 12px 0;"&gt;1. Learn the Concepts&lt;/h3&gt;
                &lt;p&gt;Review the &lt;a href="https://www.canva.com/design/DAGx4igBK6A/7NbK3dFWuzYfOtR90T83jA/edit?utm_content=DAGx4igBK6A&amp;amp;utm_campaign=designshare&amp;amp;utm_medium=link2&amp;amp;utm_source=sharebutton" target="_blank" rel="noopener"&gt;lesson slides&lt;/a&gt; to get familiar with the key ideas for today's topic.&lt;/p&gt;
            &lt;/div&gt;
            &lt;div style="background: white; border-top: 10px solid #52C75A; padding: 25px; border-radius: 8px; flex: 1; min-width: 280px;"&gt;
                &lt;h3 style="color: #52c75a; font-size: 1.5em; margin: 0 0 12px 0;"&gt;2. Apply Your Knowledge&lt;/h3&gt;
                &lt;p&gt;Click to make a copy of the &lt;a href="https://docs.google.com/document/d/1MO10IDSyLoqHFn1xUgZUjvLKN4jQ4wAqlv5794z0xaU/copy" target="_blank" rel="noopener"&gt;🧪 Guided Notes&lt;/a&gt; and complete the assignment in your own Google Doc.&lt;/p&gt;
            &lt;/div&gt;
            &lt;div style="background: white; border-top: 10px solid #9B59B6; padding: 25px; border-radius: 8px; flex: 1; min-width: 280px;"&gt;
                &lt;h3 style="color: #9b59b6; font-size: 1.5em; margin: 0 0 12px 0;"&gt;3. Submit Your Work&lt;/h3&gt;
                &lt;p&gt;When you are finished, submit the link to your completed Google Doc in the text entry box on this page.&lt;/p&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
    &lt;div style="background: #F8F9FA; border-radius: 12px; padding: 35px; margin: 40px 0; border: 1px solid #dee2e6;" role="region" aria-labelledby="outcomes-heading"&gt;
        &lt;h2 id="outcomes-heading" style="color: #2d3748; font-size: 1.9em; margin: 0 0 25px 0; text-align: center;"&gt;🎯 Our Learning Outcomes&lt;/h2&gt;
        &lt;div style="background: #E8F8F5; padding: 20px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #1ABC9C;"&gt;
            &lt;h3 style="color: #16a085; margin: 0 0 10px 0; font-size: 1.2em;"&gt;💡 Today, I will learn to...&lt;/h3&gt;
            &lt;ul style="margin: 0; padding-left: 20px; color: #4a5568;"&gt;
                &lt;li&gt;I can decode the one or two-letter symbols for common elements.&lt;/li&gt;
                &lt;li&gt;I can read a chemical formula to figure out which elements are in a compound.&lt;/li&gt;
                &lt;li&gt;I can recognize the patterns used to name simple compounds.&lt;/li&gt;
            &lt;/ul&gt;
        &lt;/div&gt;
        &lt;p style="text-align: center; margin-top: 20px; font-size: 0.9em; color: #6c757d;"&gt;Hey Team! When you're ready, submit your Google Doc link below. Go Team! Best, Rosche&lt;/p&gt;
    &lt;/div&gt;
&lt;/div&gt;
Guided Notes: Engineering a Safer Landing
&lt;div style="max-width: 1200px; margin: 0 auto; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; line-height: 1.6; color: #2d3748;"&gt;
    &lt;div style="background: linear-gradient(135deg, #E74C3C 0%, #C0392B 100%); color: white; padding: 50px 40px; text-align: center; border-radius: 12px; margin: -20px -20px 0 -20px;" role="banner"&gt;
        &lt;h1 style="font-size: 2.8em; margin: 0 0 10px 0;"&gt;&lt;strong&gt;Collision Forces Lab&lt;/strong&gt;&lt;/h1&gt;
        &lt;p style="font-size: 1.3em; margin: 0 0 25px 0;"&gt;&lt;em&gt;Investigating Force and Motion in Collisions&lt;/em&gt;&lt;/p&gt;
        &lt;div style="background: rgba(255,255,255,0.2); padding: 18px; border-radius: 8px; margin-top: 20px;"&gt;
            &lt;p style="margin: 0 0 10px 0; font-size: 1.15em;"&gt;&lt;strong&gt;Today's Mission:&lt;/strong&gt; I will use an interactive simulation to explore how forces work during collisions and analyze the relationship between mass, velocity, and collision outcomes.&lt;/p&gt;
        &lt;/div&gt;
    &lt;/div&gt;
    &lt;div role="main" aria-labelledby="journey-heading"&gt;
        &lt;h2 id="journey-heading" style="color: #2d3748; font-size: 2.2em; margin: 40px 0 30px 0; text-align: center;"&gt;&lt;strong&gt;Your Learning Journey&lt;/strong&gt;&lt;/h2&gt;
        &lt;div style="display: flex; flex-wrap: wrap; justify-content: center; align-items: stretch; gap: 20px; margin-bottom: 40px;"&gt;
            &lt;div style="background: white; border-top: 10px solid #3498DB; padding: 25px; border-radius: 8px; flex: 1; min-width: 280px;"&gt;
                &lt;h3 style="color: #3498db; font-size: 1.5em; margin: 0 0 12px 0;"&gt;1. Open the Lab&lt;/h3&gt;
                &lt;p&gt;Launch the &lt;a href="https://louisrosche.github.io/8.1.Lab/" target="_blank" rel="noopener"&gt;Collision Forces Laboratory&lt;/a&gt; to begin your investigation. Experiment with the simulation to understand how collisions work.&lt;/p&gt;
            &lt;/div&gt;
            &lt;div style="background: white; border-top: 10px solid #52C75A; padding: 25px; border-radius: 8px; flex: 1; min-width: 280px;"&gt;
                &lt;h3 style="color: #52c75a; font-size: 1.5em; margin: 0 0 12px 0;"&gt;2. Complete the Worksheet&lt;/h3&gt;
                &lt;p&gt;Click to make a copy of the &lt;a href="https://docs.google.com/document/d/1ktBoL_dg6fb2wz_IMMIvku1YpjFbpJELpnCKhtOyW4o/copy" target="_blank" rel="noopener"&gt;📋 Collision Forces Lab 1 Worksheet&lt;/a&gt; and complete the assignment in your Google Doc.&lt;/p&gt;
            &lt;/div&gt;
            &lt;div style="background: white; border-top: 10px solid #9B59B6; padding: 25px; border-radius: 8px; flex: 1; min-width: 280px;"&gt;
                &lt;h3 style="color: #9b59b6; font-size: 1.5em; margin: 0 0 12px 0;"&gt;3. Save Your Work&lt;/h3&gt;
                &lt;p&gt;When you are finished, save your completed Google Doc to your &lt;a href="https://drive.google.com/drive/u/0/folders/1BQFrCISorvPsg1ByytVC0G3qdESNyIDD" target="_blank" rel="noopener"&gt;Google Drive Science Folder&lt;/a&gt;.&lt;/p&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
    &lt;div style="background: #F8F9FA; border-radius: 12px; padding: 35px; margin: 40px 0; border: 1px solid #dee2e6;" role="region" aria-labelledby="outcomes-heading"&gt;
        &lt;h2 id="outcomes-heading" style="color: #2d3748; font-size: 1.9em; margin: 0 0 25px 0; text-align: center;"&gt;🎯 Our Learning Outcomes&lt;/h2&gt;
        &lt;div style="background: #FFE8E8; padding: 20px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #E74C3C;"&gt;
            &lt;h3 style="color: #c0392b; margin: 0 0 10px 0; font-size: 1.2em;"&gt;💡 Today, I will learn to...&lt;/h3&gt;
            &lt;ul style="margin: 0; padding-left: 20px; color: #4a5568;"&gt;
                &lt;li&gt;Investigate the &lt;strong&gt;forces&lt;/strong&gt; involved in collisions using a simulation.&lt;/li&gt;
                &lt;li&gt;Analyze how &lt;strong&gt;mass and velocity&lt;/strong&gt; affect collision outcomes.&lt;/li&gt;
                &lt;li&gt;Apply scientific &lt;strong&gt;reasoning&lt;/strong&gt; to explain real-world collision scenarios.&lt;/li&gt;
            &lt;/ul&gt;
        &lt;/div&gt;
        &lt;p style="text-align: center; margin-top: 20px; font-size: 0.9em; color: #6c757d;"&gt;Hey Team! When you're ready, save your completed work to your Science Folder. Go Team! Best, Rosche&lt;/p&gt;
    &lt;/div&gt;
&lt;/div&gt;
Guided Notes: What Happens in a Chemical Reaction?
&lt;p&gt;Chemical Reactions&lt;/p&gt;
&lt;div style="max-width: 1200px; margin: 0 auto; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; line-height: 1.6; color: #2d3748;"&gt;
    &lt;div style="background: linear-gradient(135deg, #E74C3C 0%, #F39C12 100%); color: white; padding: 50px 40px; text-align: center; border-radius: 12px; margin: -20px -20px 0 -20px;" role="banner"&gt;
        &lt;h1 style="font-size: 2.8em; margin: 0 0 10px 0;"&gt;&lt;strong&gt;What Happens in a Chemical Reaction?&lt;/strong&gt;&lt;/h1&gt;
        &lt;p style="font-size: 1.3em; margin: 0 0 25px 0;"&gt;&lt;em&gt;Preparing for our upcoming IXL skills!&lt;/em&gt;&lt;/p&gt;
        &lt;div style="background: rgba(255,255,255,0.2); padding: 18px; border-radius: 8px; margin-top: 20px;"&gt;
            &lt;p style="margin: 0 0 10px 0; font-size: 1.15em;"&gt;&lt;strong&gt;Today's Mission:&lt;/strong&gt; I will learn about the law of conservation of mass, identify the parts of a chemical reaction, and classify different types of reactions.&lt;/p&gt;
        &lt;/div&gt;
    &lt;/div&gt;
    &lt;div role="main" aria-labelledby="journey-heading"&gt;
        &lt;h2 id="journey-heading" style="color: #2d3748; font-size: 2.2em; margin: 40px 0 30px 0; text-align: center;"&gt;&lt;strong&gt;Your Learning Journey&lt;/strong&gt;&lt;/h2&gt;
        &lt;div style="display: flex; flex-wrap: wrap; justify-content: center; align-items: stretch; gap: 20px; margin-bottom: 40px;"&gt;
            &lt;div style="background: white; border-top: 10px solid #3498DB; padding: 25px; border-radius: 8px; flex: 1; min-width: 280px;"&gt;
                &lt;h3 style="color: #3498db; font-size: 1.5em; margin: 0 0 12px 0;"&gt;1. Review the Lesson&lt;/h3&gt;
                &lt;p&gt;Start by reviewing the lesson presentation below to understand the key concepts. You can also open the &lt;a href="https://www.canva.com/design/DAGx4kYlWe8/5rzio0POs1cqgtnxnL3Dvw/watch" target="_blank" rel="noopener"&gt;Slides in a new tab&lt;/a&gt;.&lt;/p&gt;
            &lt;/div&gt;
            &lt;div style="background: white; border-top: 10px solid #52C75A; padding: 25px; border-radius: 8px; flex: 1; min-width: 280px;"&gt;
                &lt;h3 style="color: #52c75a; font-size: 1.5em; margin: 0 0 12px 0;"&gt;2. Complete the Notes&lt;/h3&gt;
                &lt;p&gt;Click to make a copy of the &lt;a href="https://docs.google.com/document/d/1GrJeEhB-_Gi_rYuI0vDTLAj-Cv3swYSp7rNWzFu4nyw/copy" target="_blank" rel="noopener"&gt;🧪Guided Notes&lt;/a&gt; and complete the assignment in your Google Doc.&lt;/p&gt;
            &lt;/div&gt;
            &lt;div style="background: white; border-top: 10px solid #9B59B6; padding: 25px; border-radius: 8px; flex: 1; min-width: 280px;"&gt;
                &lt;h3 style="color: #9b59b6; font-size: 1.5em; margin: 0 0 12px 0;"&gt;3. Submit Your Work&lt;/h3&gt;
                &lt;p&gt;When you are finished, submit the link to your completed Google Doc in the text entry box on this page.&lt;/p&gt;
            &lt;/div&gt;
        &lt;/div&gt;
        &lt;div style="position: relative; width: 100%; height: 0; padding-top: 56.25%; border-radius: 12px; overflow: hidden; margin: 40px 0;"&gt;&lt;iframe style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; border: none;" src="https://www.canva.com/design/DAGx4kYlWe8/rOglFDHhxFKSlrRxdCvqPw/view?embed" loading="lazy" allowfullscreen="allowfullscreen" allow="fullscreen"&gt;&lt;/iframe&gt;&lt;/div&gt;
    &lt;/div&gt;
    &lt;div style="background: #F8F9FA; border-radius: 12px; padding: 35px; margin: 40px 0; border: 1px solid #dee2e6;" role="region" aria-labelledby="outcomes-heading"&gt;
        &lt;h2 id="outcomes-heading" style="color: #2d3748; font-size: 1.9em; margin: 0 0 25px 0; text-align: center;"&gt;🎯 Our Learning Outcomes&lt;/h2&gt;
        &lt;div style="background: #FEF9E7; padding: 20px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #F1C40F;"&gt;
            &lt;h3 style="color: #f39c12; margin: 0 0 10px 0; font-size: 1.2em;"&gt;💡 Today, I will learn to...&lt;/h3&gt;
            &lt;ul style="margin: 0; padding-left: 20px; color: #4a5568;"&gt;
                &lt;li&gt;Explain the &lt;strong&gt;law of conservation of mass&lt;/strong&gt;.&lt;/li&gt;
                &lt;li&gt;Identify the parts of a &lt;strong&gt;chemical reaction&lt;/strong&gt;.&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Classify&lt;/strong&gt; chemical reactions.&lt;/li&gt;
            &lt;/ul&gt;
        &lt;/div&gt;
        &lt;p style="text-align: center; margin-top: 20px; font-size: 0.9em; color: #6c757d;"&gt;Hey Team! When you're ready, submit your Google Doc link below. Go Team! Best, Rosche&lt;/p&gt;
    &lt;/div&gt;
&lt;/div&gt;
CER Peer Feedback
&lt;div style="max-width: 1200px; margin: 0 auto; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; line-height: 1.6; color: #2d3748;" data-darkreader-inline-color=""&gt;
    &lt;div style="background: linear-gradient(135deg, #3498DB 0%, #52C75A 100%); color: white; padding: 50px 40px; text-align: center; border-radius: 12px; margin: -20px -20px 0 -20px;" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="" data-darkreader-inline-color=""&gt;
        &lt;h1 style="font-size: 2.8em; margin: 0 0 10px 0;"&gt;&lt;span style="color: #fbeeb8;" data-darkreader-inline-color=""&gt;&lt;strong&gt;Update: Submit Link to Your Google Sheet Here!&lt;/strong&gt;&lt;/span&gt;&lt;/h1&gt;
        &lt;h1 style="font-size: 2.8em; margin: 0 0 10px 0;"&gt;&lt;strong&gt;CER Peer Feedback&lt;/strong&gt;&lt;/h1&gt;
        &lt;p style="font-size: 1.3em; margin: 0 0 25px 0;"&gt;&lt;em&gt;A Team Approach to Building Stronger Arguments&lt;/em&gt;&lt;/p&gt;
        &lt;div style="background: rgba(255,255,255,0.2); padding: 18px; border-radius: 8px; margin-top: 20px;" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""&gt;
            &lt;p style="margin: 0; font-size: 1.15em;"&gt;&lt;strong&gt;Learning Target:&lt;/strong&gt; I can use a detailed rubric and peer feedback to improve my scientific arguments.&lt;/p&gt;
        &lt;/div&gt;
    &lt;/div&gt;
    &lt;div style="background-color: #f0fdf4; border-left: 6px solid #52C75A; padding: 24px; margin: 35px 0; border-radius: 0 8px 8px 0;" data-darkreader-inline-bgcolor="" data-darkreader-inline-border-left=""&gt;
        &lt;h3 style="margin: 0 0 S15px 0; font-size: 1.2em; color: #2d3748;" data-darkreader-inline-color=""&gt;&lt;strong&gt;⚙️ The Game Plan: Step-by-Step&lt;/strong&gt;&lt;/h3&gt;
        &lt;p style="margin: 0 0 25px 0; color: #4a5568; font-size: 1.05em;" data-darkreader-inline-color=""&gt;Your first step is to open the Google Sheet. Click the button below to make your own copy. Then, follow the steps to give and receive feedback.&lt;/p&gt;
        &lt;a style="display: inline-block; background: #52C75A; color: white; padding: 15px 30px; font-size: 1.2em; text-decoration: none; border-radius: 8px; margin-bottom: 20px;" href="https://docs.google.com/spreadsheets/d/1yUkoRSmnAPtPF6nINAOfVFMVaExwAUOJNqXS3p4aAH4/copy" target="_blank" rel="noopener" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="" data-darkreader-inline-color=""&gt;Click Here to Get the Google Sheet&lt;/a&gt;
        &lt;ol style="margin: 0; padding-left: 25px; color: #4a5568; font-size: 1.05em; line-height: 2;" data-darkreader-inline-color=""&gt;
            &lt;li&gt;&lt;strong&gt;Discuss &amp;amp; Rate.&lt;/strong&gt; As a team, use the detailed rubrics below to rate the &lt;strong&gt;Claim, Evidence, and Reasoning&lt;/strong&gt; on a 0-5 scale.&lt;/li&gt;
            &lt;li&gt;&lt;strong&gt;Give "Glow" &amp;amp; "Grow" Feedback.&lt;/strong&gt; Fill in the feedback columns with specific praise and one actionable step for improvement.&lt;/li&gt;
            &lt;li&gt;&lt;strong&gt;Revise the Reasoning.&lt;/strong&gt; Help the writer revise their original reasoning in the final column, using the "Because... Therefore..." stem as your guide.&lt;/li&gt;
        &lt;/ol&gt;
    &lt;/div&gt;
    &lt;h2 style="color: #2d3748; font-size: 2.2em; margin: 40px 0 30px 0; text-align: center;" data-darkreader-inline-color=""&gt;&lt;strong&gt;How to Rate Each Section (0-5)&lt;/strong&gt;&lt;/h2&gt;
    &lt;div style="display: grid; grid-template-columns: 1fr; gap: 25px; margin: 35px 0;"&gt;
        &lt;div style="background: white; border-left: 10px solid #3498DB; padding: 30px; border-radius: 0 8px 8px 0;" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="" data-darkreader-inline-border-left=""&gt;
            &lt;h2 style="color: #3498db; font-size: 1.7em; margin: 0 0 12px 0;" data-darkreader-inline-color=""&gt;&lt;strong&gt;Rating the CLAIM&lt;/strong&gt;&lt;/h2&gt;
            &lt;div style="background: #F0F8FF; padding: 18px; border-radius: 6px; margin: 18px 0;" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""&gt;
                &lt;ul style="margin: 8px 0; padding-left: 25px; color: #4a5568; line-height: 1.8;" data-darkreader-inline-color=""&gt;
                    &lt;li&gt;&lt;strong&gt;5 (The Bullseye):&lt;/strong&gt; A single, clear sentence that is precise and completely answers the question.&lt;/li&gt;
                    &lt;li&gt;&lt;strong&gt;4 (Solid Statement):&lt;/strong&gt; Answers the question but could be more specific or confident.&lt;/li&gt;
                    &lt;li&gt;&lt;strong&gt;3 (First Draft):&lt;/strong&gt; An attempt to answer, but may be vague, incomplete, or phrased with "I think..."&lt;/li&gt;
                    &lt;li&gt;&lt;strong&gt;2 (The Hint):&lt;/strong&gt; Doesn't answer the question directly but is on the right topic.&lt;/li&gt;
                    &lt;li&gt;&lt;strong&gt;1-0 (Off-Target / Missing):&lt;/strong&gt; The statement is unrelated to the question, or is missing entirely.&lt;/li&gt;
                &lt;/ul&gt;
            &lt;/div&gt;
        &lt;/div&gt;
        &lt;div style="background: white; border-left: 10px solid #52C75A; padding: 30px; border-radius: 0 8px 8px 0;" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="" data-darkreader-inline-border-left=""&gt;
            &lt;h2 style="color: #52c75a; font-size: 1.7em; margin: 0 0 12px 0;" data-darkreader-inline-color=""&gt;&lt;strong&gt;Rating the EVIDENCE&lt;/strong&gt;&lt;/h2&gt;
            &lt;div style="background: #F0FDF4; padding: 18px; border-radius: 6px; margin: 18px 0;" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""&gt;
                &lt;ul style="margin: 8px 0; padding-left: 25px; color: #4a5568; line-height: 1.8;" data-darkreader-inline-color=""&gt;
                    &lt;li&gt;&lt;strong&gt;5 (Airtight Case):&lt;/strong&gt; Multiple pieces of specific, relevant data/facts that strongly support the claim.&lt;/li&gt;
                    &lt;li&gt;&lt;strong&gt;4 (Good Support):&lt;/strong&gt; The evidence is relevant, but could be more specific or more plentiful.&lt;/li&gt;
                    &lt;li&gt;&lt;strong&gt;3 (Relevant Fact):&lt;/strong&gt; At least one piece of relevant evidence is present, but it's not enough to be convincing.&lt;/li&gt;
                    &lt;li&gt;&lt;strong&gt;2 (Weak Link):&lt;/strong&gt; The evidence is on-topic but doesn't directly support the specific claim being made.&lt;/li&gt;
                    &lt;li&gt;&lt;strong&gt;1-0 (Opinion / Missing):&lt;/strong&gt; The "evidence" is just an opinion, or it is missing entirely.&lt;/li&gt;
                &lt;/ul&gt;
            &lt;/div&gt;
        &lt;/div&gt;
        &lt;div style="background: white; border-left: 10px solid #F5A623; padding: 30px; border-radius: 0 8px 8px 0;" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="" data-darkreader-inline-border-left=""&gt;
            &lt;h2 style="color: #f5a623; font-size: 1.7em; margin: 0 0 12px 0;" data-darkreader-inline-color=""&gt;&lt;strong&gt;Rating the REASONING&lt;/strong&gt;&lt;/h2&gt;
            &lt;div style="background: #FFFBF0; padding: 18px; border-radius: 6px; margin: 18px 0;" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""&gt;
                &lt;ul style="margin: 8px 0; padding-left: 25px; color: #4a5568; line-height: 1.8;" data-darkreader-inline-color=""&gt;
                    &lt;li&gt;&lt;strong&gt;5 (All-Star):&lt;/strong&gt; Explains the WHY using a specific science principle or rule.&lt;/li&gt;
                    &lt;li&gt;&lt;strong&gt;4 (Pro-Connector):&lt;/strong&gt; Clearly explains HOW the evidence proves the claim.&lt;/li&gt;
                    &lt;li&gt;&lt;strong&gt;3 (Solid Starter):&lt;/strong&gt; States THAT the evidence supports the claim but doesn't explain the connection.&lt;/li&gt;
                    &lt;li&gt;&lt;strong&gt;2 (The Echo):&lt;/strong&gt; Just repeats the evidence or claim in different words.&lt;/li&gt;
                    &lt;li&gt;&lt;strong&gt;1-0 (Missing Link):&lt;/strong&gt; The reasoning is missing or does not connect to the evidence.&lt;/li&gt;
                &lt;/ul&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
    &lt;div style="background: linear-gradient(135deg, #FFF5F5 0%, #FFFBF0 100%); border-radius: 12px; padding: 35px; margin: 40px 0;" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""&gt;
        &lt;h2 style="color: #2d3748; font-size: 1.9em; margin: 0 0 25px 0; text-align: center;" data-darkreader-inline-color=""&gt;Giving "Glow" &amp;amp; "Grow" Feedback&lt;/h2&gt;
        &lt;div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 25px;"&gt;
            &lt;div style="background: white; padding: 25px; border-radius: 8px;" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""&gt;
                &lt;h3 style="color: #52c75a; margin: 0 0 15px 0; font-size: 1.3em;" data-darkreader-inline-color=""&gt;✅ The "GLOW"&lt;/h3&gt;
                &lt;p style="color: #4a5568; line-height: 1.8;" data-darkreader-inline-color=""&gt;Give specific praise. What did they do well that they should keep doing?&lt;/p&gt;
                &lt;p style="margin: 15px 0; background: #F0FDF4; padding: 10px; border-radius: 4px;" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""&gt;&lt;strong&gt;Example:&lt;/strong&gt; "Your claim is a perfect '5'. It's a clear, confident statement that answers the question directly."&lt;/p&gt;
            &lt;/div&gt;
            &lt;div style="background: white; padding: 25px; border-radius: 8px;" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""&gt;
                &lt;h3 style="color: #ff6b5a; margin: 0 0 15px 0; font-size: 1.3em;" data-darkreader-inline-color=""&gt;🚀 The "GROW"&lt;/h3&gt;
                &lt;p style="color: #4a5568; line-height: 1.8;" data-darkreader-inline-color=""&gt;Give one actionable suggestion. What is the single most important thing they can do to improve?&lt;/p&gt;
                &lt;p style="margin: 15px 0; background: #FFF5F5; padding: 10px; border-radius: 4px;" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""&gt;&lt;strong&gt;Example:&lt;/strong&gt; "To level up your reasoning from a 3 to a 4, try to explain the science rule that makes that evidence true."&lt;/p&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
    &lt;div style="background: white; border: 2px solid #F5A623; border-radius: 12px; padding: 35px; margin: 40px 0;" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="" data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""&gt;
        &lt;h2 style="color: #2d3748; font-size: 1.9em; margin: 0 0 15px 0; text-align: center;" data-darkreader-inline-color=""&gt;The Revision Tool&lt;/h2&gt;
        &lt;p style="font-size: 1.05em; color: #4a5568; margin: 12px 0 25px 0; text-align: center;" data-darkreader-inline-color=""&gt;Use this sentence stem to guide your team's rewrite in the "Revised REASONING" column.&lt;/p&gt;
        &lt;div style="background: #FFFBF0; padding: 18px; border-radius: 6px; margin: 18px 0;" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""&gt;
            &lt;h4 style="color: #2d3748; margin: 0 0 10px 0; font-size: 1.05em;" data-darkreader-inline-color=""&gt;The "Because... Therefore..." Method:&lt;/h4&gt;
            &lt;div style="background: white; padding: 15px; border-radius: 4px; margin: 10px 0; border: 1px solid #F5A623;" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="" data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""&gt;
                &lt;p style="margin: 5px 0; color: #4a5568; font-size: 0.95em;" data-darkreader-inline-color=""&gt;&lt;strong&gt;BECAUSE&lt;/strong&gt; [explain the science rule, concept, or principle]...&lt;br /&gt;&lt;strong&gt;THEREFORE&lt;/strong&gt; [connect this rule back to your specific evidence and claim]...&lt;/p&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;
Collaborative Learning Lab
&lt;
div 
style
="
max-width: 1200px; margin: 0 auto; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; line-height: 1.6; color: #2d3748;
"&gt;
&lt;
div 
style
="
background: linear-gradient(135deg, #8E44AD 0%, #3498DB 100%); color: white; padding: 50px 40px; text-align: center; border-radius: 12px; margin: -20px -20px 0 -20px;
"&gt;
&lt;
h1 
style
="
font-size: 2.8em; margin: 0 0 10px 0;
"&gt;&lt;
strong
&gt;Collaborative Learning Lab&lt;/
strong
&gt;&lt;/
h1
&gt;
&lt;
p 
style
="
font-size: 1.3em; margin: 0 0 25px 0;
"&gt;&lt;
em
&gt;Document your collaborative learning journey and help us understand how we can better support you!&lt;/
em
&gt;&lt;/
p
&gt;
&lt;
div 
style
="
background: rgba(255,255,255,0.2); padding: 18px; border-radius: 8px; margin-top: 20px;
"&gt;
&lt;
p 
style
="
margin: 0; font-size: 1.15em;
"&gt;&lt;
strong
&gt;Purpose:&lt;/
strong
&gt; This form is automatically collecting emails from all respondents.&lt;/
p
&gt;
&lt;/
div
&gt;
&lt;/
div
&gt;
&lt;
h2 
style
="
color: #2d3748; font-size: 2.2em; margin: 40px 0 30px 0; text-align: center;
"&gt;&lt;
strong
&gt;Understanding Collaborative Learning&lt;/
strong
&gt;&lt;/
h2
&gt;
&lt;
div 
style
="
background: #F8F9FA; border-radius: 12px; padding: 35px; margin: 40px 0; border: 1px solid #dee2e6;
"&gt;
&lt;
h3 
style
="
color: #2d3748; font-size: 1.5em; margin: 0 0 20px 0;
"&gt;💡 What Is Collaborative Learning?&lt;/
h3
&gt;
&lt;
p 
style
="
color: #4a5568; font-size: 1.05em; line-height: 1.8; margin: 0;
"&gt;Collaborative learning is when students work together in pairs or small groups to solve problems, complete tasks, or understand new concepts. Instead of working alone, you share ideas, discuss different approaches, and learn from each other's perspectives. This helps everyone understand the material more deeply and develop important teamwork skills.&lt;/
p
&gt;
&lt;/
div
&gt;
&lt;
h2 
style
="
color: #2d3748; font-size: 2.2em; margin: 40px 0 30px 0; text-align: center;
"&gt;&lt;
strong
&gt;Your Role in Collaboration&lt;/
strong
&gt;&lt;/
h2
&gt;
&lt;
div 
style
="
display: flex; flex-wrap: wrap; justify-content: center; align-items: stretch; gap: 20px; margin-bottom: 40px;
"&gt;
&lt;
div 
style
="
background: white; border-top: 10px solid #E74C3C; padding: 25px; border-radius: 8px; flex: 1; min-width: 280px;
"&gt;
&lt;
h3 
style
="
color: #e74c3c; font-size: 1.5em; margin: 0 0 12px 0;
"&gt;👁️ Monitor&lt;/
h3
&gt;
&lt;
p 
style
="
color: #4a5568; line-height: 1.8;
"&gt;I'm getting support on challenging work - I don't understand yet. I observe and listen carefully to learn.&lt;/
p
&gt;
&lt;/
div
&gt;
&lt;
div 
style
="
background: white; border-top: 10px solid #F39C12; padding: 25px; border-radius: 8px; flex: 1; min-width: 280px;
"&gt;
&lt;
h3 
style
="
color: #f39c12; font-size: 1.5em; margin: 0 0 12px 0;
"&gt;📝 Lead Editor&lt;/
h3
&gt;
&lt;
p 
style
="
color: #4a5568; line-height: 1.8;
"&gt;I did most of the work and changes. I take charge of organizing and finalizing our work.&lt;/
p
&gt;
&lt;/
div
&gt;
&lt;
div 
style
="
background: white; border-top: 10px solid #52C75A; padding: 25px; border-radius: 8px; flex: 1; min-width: 280px;
"&gt;
&lt;
h3 
style
="
color: #52c75a; font-size: 1.5em; margin: 0 0 12px 0;
"&gt;🤝 Co-Creator&lt;/
h3
&gt;
&lt;
p 
style
="
color: #4a5568; line-height: 1.8;
"&gt;We worked equally together. I contribute ideas and share the workload fairly.&lt;/
p
&gt;
&lt;/
div
&gt;
&lt;
div 
style
="
background: white; border-top: 10px solid #3498DB; padding: 25px; border-radius: 8px; flex: 1; min-width: 280px;
"&gt;
&lt;
h3 
style
="
color: #3498db; font-size: 1.5em; margin: 0 0 12px 0;
"&gt;🎯 Support Partner&lt;/
h3
&gt;
&lt;
p 
style
="
color: #4a5568; line-height: 1.8;
"&gt;I helped guide but they did the work. I provide encouragement and clarification when needed.&lt;/
p
&gt;
&lt;/
div
&gt;
&lt;
div 
style
="
background: white; border-top: 10px solid #9B59B6; padding: 25px; border-radius: 8px; flex: 1; min-width: 280px;
"&gt;
&lt;
h3 
style
="
color: #9b59b6; font-size: 1.5em; margin: 0 0 12px 0;
"&gt;👀 Observer&lt;/
h3
&gt;
&lt;
p 
style
="
color: #4a5568; line-height: 1.8;
"&gt;I mostly watched and learned. I'm building confidence to participate more actively.&lt;/
p
&gt;
&lt;/
div
&gt;
&lt;
div 
style
="
background: white; border-top: 10px solid #1ABC9C; padding: 25px; border-radius: 8px; flex: 1; min-width: 280px;
"&gt;
&lt;
h3 
style
="
color: #1abc9c; font-size: 1.5em; margin: 0 0 12px 0;
"&gt;💬 Reviewer&lt;/
h3
&gt;
&lt;
p 
style
="
color: #4a5568; line-height: 1.8;
"&gt;I gave feedback on completed work. I help improve quality through constructive suggestions.&lt;/
p
&gt;
&lt;/
div
&gt;
&lt;/
div
&gt;
&lt;
div 
style
="
background: linear-gradient(135deg, #FFF5E6 0%, #FFE8CC 100%); border-radius: 12px; padding: 30px; margin: 35px 0;
"&gt;
&lt;
h3 
style
="
color: #f39c12; font-size: 1.5em; margin: 0 0 15px 0;
"&gt;🧠 Effective Collaboration Strategies&lt;/
h3
&gt;
&lt;
p 
style
="
color: #4a5568; font-size: 1.05em; margin: 0 0 15px 0;
"&gt;Use these thinking strategies to make your collaboration more effective:&lt;/
p
&gt;
&lt;
ul 
style
="
color: #4a5568; font-size: 1.05em; line-height: 1.8; margin: 0; padding-left: 25px;
"&gt;
&lt;
li
&gt;&lt;
strong
&gt;Breaking the problem into smaller parts&lt;/
strong
&gt; (Checklist Method)&lt;/
li
&gt;
&lt;
li
&gt;&lt;
strong
&gt;Asking clarifying questions&lt;/
strong
&gt; (Why + How + What)&lt;/
li
&gt;
&lt;
li
&gt;&lt;
strong
&gt;Making connections to prior knowledge&lt;/
strong
&gt; (you already know that you know)&lt;/
li
&gt;
&lt;
li
&gt;&lt;
strong
&gt;Drawing or visualizing the problem&lt;/
strong
&gt;&lt;/
li
&gt;
&lt;
li
&gt;&lt;
strong
&gt;Talking through the problem out loud&lt;/
strong
&gt; (Think-Aloud Strategy)&lt;/
li
&gt;
&lt;
li
&gt;&lt;
strong
&gt;Search for additional resources&lt;/
strong
&gt;&lt;/
li
&gt;
&lt;
li
&gt;&lt;
strong
&gt;Trial and error&lt;/
strong
&gt; (STOP Technique: stop, take a breath, observe, proceed)&lt;/
li
&gt;
&lt;
li
&gt;&lt;
strong
&gt;Following a rubric&lt;/
strong
&gt;&lt;/
li
&gt;
&lt;
li
&gt;&lt;
strong
&gt;Comparing with examples&lt;/
strong
&gt;&lt;/
li
&gt;
&lt;/
ul
&gt;
&lt;/
div
&gt;
&lt;
div 
style
="
background: #E8F5E9; border-left: 6px solid #52C75A; padding: 24px; margin: 35px 0; border-radius: 0 8px 8px 0;
"&gt;
&lt;
h3 
style
="
margin: 0 0 15px 0; font-size: 1.2em; color: #2d3748;
"&gt;✅ What Makes Collaboration Successful?&lt;/
h3
&gt;
&lt;
p 
style
="
color: #4a5568; font-size: 1.05em; margin: 0 0 12px 0;
"&gt;Think about these elements as you reflect on your experience:&lt;/
p
&gt;
&lt;
ul 
style
="
margin: 0; padding-left: 25px; color: #4a5568; font-size: 1.05em; line-height: 1.8;
"&gt;
&lt;
li
&gt;&lt;
strong
&gt;Communication:&lt;/
strong
&gt; Clear, respectful dialogue between partners&lt;/
li
&gt;
&lt;
li
&gt;&lt;
strong
&gt;Equal participation:&lt;/
strong
&gt; Everyone contributes their ideas and effort&lt;/
li
&gt;
&lt;
li
&gt;&lt;
strong
&gt;Respectful interactions:&lt;/
strong
&gt; Listening carefully and valuing different perspectives&lt;/
li
&gt;
&lt;
li
&gt;&lt;
strong
&gt;Problem-solving together:&lt;/
strong
&gt; Working through challenges as a team&lt;/
li
&gt;
&lt;
li
&gt;&lt;
strong
&gt;Learning from each other:&lt;/
strong
&gt; Teaching and learning from your partner&lt;/
li
&gt;
&lt;/
ul
&gt;
&lt;/
div
&gt;
&lt;
h2 
style
="
color: #2d3748; font-size: 2.2em; margin: 40px 0 30px 0; text-align: center;
"&gt;&lt;
strong
&gt;Reflection Questions to Consider&lt;/
strong
&gt;&lt;/
h2
&gt;
&lt;
div 
style
="
background: white; border: 2px solid #3498DB; border-radius: 12px; padding: 35px; margin: 40px 0;
"&gt;
&lt;
h3 
style
="
color: #3498db; font-size: 1.5em; margin: 0 0 20px 0;
"&gt;About the Assignment&lt;/
h3
&gt;
&lt;
ul 
style
="
color: #4a5568; font-size: 1.05em; line-height: 1.8; margin: 0; padding-left: 25px;
"&gt;
&lt;
li
&gt;How confident do you feel using Gradient Canvas right now?&lt;/
li
&gt;
&lt;
li
&gt;What course did you find the assignment in?&lt;/
li
&gt;
&lt;
li
&gt;Who created the original assignment?&lt;/
li
&gt;
&lt;
li
&gt;What type of assignment was it? (Essay, Math Problem Set, Creative Project, Research Assignment, Discussion Post, Presentation, etc.)&lt;/
li
&gt;
&lt;
li
&gt;What state is the assignment in right now? (Blank, Template, Partially Complete, Mostly Complete, Complete, Exemplar)&lt;/
li
&gt;
&lt;/
ul
&gt;
&lt;/
div
&gt;
&lt;
div 
style
="
background: white; border: 2px solid #9B59B6; border-radius: 12px; padding: 35px; margin: 40px 0;
"&gt;
&lt;
h3 
style
="
color: #9b59b6; font-size: 1.5em; margin: 0 0 20px 0;
"&gt;About Your Strategies&lt;/
h3
&gt;
&lt;
ul 
style
="
color: #4a5568; font-size: 1.05em; line-height: 1.8; margin: 0; padding-left: 25px;
"&gt;
&lt;
li
&gt;Which thinking strategies will you try? (Check all that apply)&lt;/
li
&gt;
&lt;
li
&gt;What challenges did you encounter during your collaboration?&lt;/
li
&gt;
&lt;
li
&gt;Which thinking strategies worked best for you?&lt;/
li
&gt;
&lt;
li
&gt;Describe ONE specific problem you solved together&lt;/
li
&gt;
&lt;/
ul
&gt;
&lt;/
div
&gt;
&lt;
div 
style
="
background: white; border: 2px solid #52C75A; border-radius: 12px; padding: 35px; margin: 40px 0;
"&gt;
&lt;
h3 
style
="
color: #52c75a; font-size: 1.5em; margin: 0 0 20px 0;
"&gt;About Your Growth&lt;/
h3
&gt;
&lt;
ul 
style
="
color: #4a5568; font-size: 1.05em; line-height: 1.8; margin: 0; padding-left: 25px;
"&gt;
&lt;
li
&gt;How much time did you spend on this collaboration?&lt;/
li
&gt;
&lt;
li
&gt;Rate your collaboration experience in different areas (Communication, Equal participation, Respectful interactions, Problem-solving together, Learning from each other)&lt;/
li
&gt;
&lt;
li
&gt;What did you learn about the SUBJECT/CONTENT?&lt;/
li
&gt;
&lt;
li
&gt;What did you learn about WORKING WITH OTHERS?&lt;/
li
&gt;
&lt;
li
&gt;What did you learn about YOURSELF as a learner?&lt;/
li
&gt;
&lt;
li
&gt;Rate your growth in these areas (Technical skills, Communication skills, Problem-solving strategies, Patience and perseverance, Helping others learn, Accepting help from others)&lt;/
li
&gt;
&lt;/
ul
&gt;
&lt;/
div
&gt;
&lt;
div 
style
="
background: #FFF5F5; border-left: 6px solid #E74C3C; padding: 24px; margin: 35px 0; border-radius: 0 8px 8px 0;
"&gt;
&lt;
h3 
style
="
margin: 0 0 15px 0; font-size: 1.2em; color: #2d3748;
"&gt;🚀 Moving Forward&lt;/
h3
&gt;
&lt;
p 
style
="
color: #4a5568; font-size: 1.05em; margin: 0 0 12px 0;
"&gt;As you complete the form, think about:&lt;/
p
&gt;
&lt;
ul 
style
="
margin: 0; padding-left: 25px; color: #4a5568; font-size: 1.05em; line-height: 1.8;
"&gt;
&lt;
li
&gt;How would you improve this assignment for future students?&lt;/
li
&gt;
&lt;
li
&gt;What support would help you most?&lt;/
li
&gt;
&lt;
li
&gt;How interested are you in doing more collaborative work?&lt;/
li
&gt;
&lt;
li
&gt;Overall, how successful was this collaboration?&lt;/
li
&gt;
&lt;
li
&gt;Describe this experience in ONE word&lt;/
li
&gt;
&lt;
li
&gt;Rate your experience with an emoji&lt;/
li
&gt;
&lt;/
ul
&gt;
&lt;/
div
&gt;
&lt;
h2 
style
="
color: #2d3748; font-size: 2.2em; margin: 40px 0 30px 0; text-align: center;
"&gt;&lt;
strong
&gt;Now: Complete Your Reflection&lt;/
strong
&gt;&lt;/
h2
&gt;
&lt;
div 
style
="
background: #EBF8FF; border-left: 6px solid #3498DB; padding: 24px; margin: 35px 0; border-radius: 0 8px 8px 0;
"&gt;
&lt;
h3 
style
="
margin: 0 0 15px 0; font-size: 1.2em; color: #2d3748;
"&gt;📋 Ready to Share Your Experience?&lt;/
h3
&gt;
&lt;
p 
style
="
margin: 0; color: #4a5568; font-size: 1.05em;
"&gt;Use the form below to document your collaborative learning journey. Your honest feedback helps us understand how to better support you and improve future collaborative assignments. Take your time and be thoughtful - your insights matter!&lt;/
p
&gt;
&lt;/
div
&gt;
&lt;
div 
style
="
border-radius: 8px; overflow: hidden; margin: 40px 0;
"&gt;
&lt;
iframe 
style
="
width: 100%; height: 85vh; min-height: 750px; border: none;
"
 
title
="
Collaborative Learning Lab Form
"
 
src
="
https://docs.google.com/forms/d/e/1FAIpQLSeT9ifxYsnQh8KlwoMjDA5OVNF3y-dRGiCCp9XkNicBCfFBMg/viewform?embedded=true
"
 
loading
="
lazy
"&gt;&lt;/
iframe
&gt;
&lt;/
div
&gt;
&lt;
p 
style
="
text-align: center; margin-top: 40px; font-size: 0.9em; color: #6c757d;
"&gt;Hey Team! Thanks for sharing your collaborative learning experience. Your reflections help us support you better. Go Team! Best, Rosche&lt;/
p
&gt;
&lt;/
div
&gt;
&lt;SECRETS&gt;
Louis Rosche’s Personal Canvas Access Token:
23860~wG69aHfCrP2YvJyaFYRKuxkLUE7LfU7G9FE8JEARPNrVAMzCfUuHnJexQHVBMHfL
Auto ef game submit to sheet
https://script.google.com/macros/s/AKfycbxE-vGT-w54oINC2dOQT1hACpwxBCgRSSf5gHJ6JjUSf92bRYjgN3_Gy5jEaMVuCbyA/exec
Deployment id
AKfycbxE-vGT-w54oINC2dOQT1hACpwxBCgRSSf5gHJ6JjUSf92bRYjgN3_Gy5jEaMVuCbyA
—
New deployment
Deployment successfully updated.
Version 2 on Oct 23, 2025, 9:38 AM
Deployment ID
AKfycbxOUTAvF_uB6EshMAYLVHidXRGcftXEHqg5AiYPZ0jYEgF41UhV-0lzKeMPynNz7cb1
Web app
URL
https://script.google.com/macros/s/AKfycbxOUTAvF_uB6EshMAYLVHidXRGcftXEHqg5AiYPZ0jYEgF41UhV-0lzKeMPynNz7cb1/exec
