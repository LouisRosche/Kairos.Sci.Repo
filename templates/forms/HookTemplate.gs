/**
 * ============================================================================
 * HOOK FORM TEMPLATE
 * ============================================================================
 *
 * PURPOSE: Template for generating Hook forms (12 points, ~10 min)
 * USAGE: Copy and customize for each cycle/week
 *
 * STANDARD STRUCTURE:
 *   - Part 1: Phenomenon Observation (1-2 questions)
 *   - Part 2: Initial Hypothesis (open response)
 *   - Part 3: Prior Knowledge Connection (spiral question)
 *   - Self-Assessment Scale (0 pts)
 *
 * MTSS FEATURES:
 *   - Diagnostic question at start (0 pts, flags misconceptions)
 *   - Sentence starters in helpText for open responses
 *   - Word banks provided
 *
 * ACCESSIBILITY:
 *   - Clear, concise language (8th grade reading level)
 *   - Specific feedback for correct/incorrect answers
 *   - Progress bar enabled
 *
 * ============================================================================
 */

/**
 * Template function for creating Hook forms
 * @param {Object} config - Configuration object with cycle/week/grade details
 * @returns {Form} - Created Google Form
 */
function createHookFromTemplate(config) {
  // TEMPLATE: Replace these placeholder values
  const formTitle = `G${config.grade}.C${config.cycle}.W${config.week}: Hook - [PHENOMENON NAME]`;

  const form = FormApp.create(formTitle);

  form.setDescription(
    '[PHENOMENON DESCRIPTION]\n\n' +
    '---\n' +
    'Time: About 10 minutes | Points: 12\n' +
    '[PRIOR WEEK CONNECTION REMINDER]'
  );

  // Standard form settings
  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Hook submitted! You\'re ready for Station 1.\n\n' +
    '[NEXT STATION PREVIEW]'
  );

  // --- MTSS DIAGNOSTIC (0 pts) ---
  // TODO: Add misconception check question

  // --- PART 1: OBSERVATION ---
  form.addPageBreakItem()
    .setTitle('Part 1: Observe the Evidence')
    .setHelpText('[OBSERVATION INSTRUCTIONS]');

  // Q1: Observation (3 pts auto)
  // TODO: Add observation question

  // Q2: Hypothesis (3 pts manual)
  // TODO: Add hypothesis question with sentence starters

  // --- PART 2: PRIOR KNOWLEDGE ---
  form.addPageBreakItem()
    .setTitle('Part 2: Connect to Prior Learning');

  // Q3: Pattern/Connection (3 pts)
  // TODO: Add connection question

  // Q4: Spiral question (3 pts)
  // TODO: Add spiral question from previous week/cycle

  // Q5: Self-assessment (0 pts)
  form.addScaleItem()
    .setTitle('Self-Assessment: How confident are you about the phenomenon?')
    .setHelpText('FOR REFLECTION ONLY - Does NOT affect your grade.')
    .setBounds(1, 5)
    .setLabels('Still confused', 'I get it!')
    .setRequired(true);

  return form;
}

// Export for testing
function testHookTemplate() {
  Logger.log('Hook Template: Ready for customization');
  Logger.log('Points: 12 | Time: ~10 min');
  Logger.log('Structure: MTSS Check → Observation → Hypothesis → Connection → Self-Assessment');
}
