/**
 * ============================================================================
 * STATION FORM TEMPLATE
 * ============================================================================
 *
 * PURPOSE: Template for generating Station forms (20-25 points, 15-20 min)
 * USAGE: Copy and customize for each station
 *
 * STATION TYPES:
 *   - Station 1: Investigation/Data Collection (20 pts, ~18 min)
 *   - Station 2: Analysis/Comparison (20 pts, ~15 min)
 *   - Station 3: Application/Design (25 pts, ~20 min) - Highest value
 *
 * STANDARD STRUCTURE:
 *   - Step 1: Task Introduction
 *   - Step 2: Data/Analysis Questions (2-3 auto-graded)
 *   - Step 3: Explanation/Application (1-2 manual)
 *   - Spiral Question: Prior week/cycle connection
 *
 * MTSS FEATURES:
 *   - Sentence starters for open responses
 *   - Tiered rubrics in helpText
 *   - Misconception-targeted answer choices
 *
 * ============================================================================
 */

/**
 * Template for Station 1 (Investigation)
 * @param {Object} config - Configuration object
 * @returns {Form} - Created Google Form
 */
function createStation1FromTemplate(config) {
  const form = FormApp.create(
    `G${config.grade}.C${config.cycle}.W${config.week}: Station 1 - [INVESTIGATION NAME]`
  );

  form.setDescription(
    'YOUR MISSION: [STATION OBJECTIVE]\n\n' +
    'KEY TERMS:\n' +
    '- [TERM 1]: [definition]\n' +
    '- [TERM 2]: [definition]\n\n' +
    '---\n' +
    'Time: About 18 minutes | Points: 20'
  );

  // Standard settings
  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);

  // --- STEP 1: TASK ---
  form.addPageBreakItem()
    .setTitle('Step 1: [TASK NAME]')
    .setHelpText('[TASK INSTRUCTIONS]');

  // Q1: Auto-graded (5 pts)
  // TODO: Add data/observation question

  // Q2: Auto-graded (4 pts)
  // TODO: Add analysis question

  // --- STEP 2: ANALYZE ---
  form.addPageBreakItem()
    .setTitle('Step 2: Analyze');

  // Q3: Manual (5 pts)
  // TODO: Add explanation question with sentence starters

  // Q4: Misconception check (3 pts auto)
  // TODO: Add misconception-targeted question

  // Q5: Spiral (3 pts manual)
  // TODO: Add prior week connection

  return form;
}

/**
 * Template for Station 3 (Application/Design) - Highest Value
 * @param {Object} config - Configuration object
 * @returns {Form} - Created Google Form
 */
function createStation3FromTemplate(config) {
  const form = FormApp.create(
    `G${config.grade}.C${config.cycle}.W${config.week}: Station 3 - [APPLICATION NAME]`
  );

  form.setDescription(
    '[CHALLENGE DESCRIPTION]\n\n' +
    '---\n' +
    'Time: About 20 minutes | Points: 25 (highest value!)'
  );

  // Standard settings
  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);

  // Higher-point questions for application station
  // Q1: Design/Apply (5 pts manual)
  // Q2: Design/Apply (5 pts manual)
  // Q3: Design/Apply (5 pts manual)
  // Q4: Mechanism explanation (7 pts manual) - highest value question
  // Q5: Misconception check (3 pts auto)

  return form;
}

// Export for testing
function testStationTemplate() {
  Logger.log('Station Templates: Ready for customization');
  Logger.log('Station 1: 20 pts, ~18 min (Investigation)');
  Logger.log('Station 2: 20 pts, ~15 min (Analysis)');
  Logger.log('Station 3: 25 pts, ~20 min (Application)');
}
