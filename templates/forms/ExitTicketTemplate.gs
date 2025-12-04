/**
 * ============================================================================
 * EXIT TICKET FORM TEMPLATE
 * ============================================================================
 *
 * PURPOSE: Template for generating Exit Ticket forms (23 points, ~15 min)
 * USAGE: Copy and customize for each cycle/week
 *
 * STANDARD STRUCTURE (6 questions):
 *   - 2 NEW questions (current week content)
 *   - 2 SPIRAL questions (prior week/cycle review)
 *   - 1 INTEGRATION question (connects multiple weeks)
 *   - 1 SEP question (Science & Engineering Practice)
 *
 * POINT DISTRIBUTION:
 *   - Q1 NEW: 4 pts (manual)
 *   - Q2 SPIRAL: 4 pts (auto)
 *   - Q3 NEW: 4 pts (auto)
 *   - Q4 SPIRAL: 4 pts (auto) - misconception check
 *   - Q5 INTEGRATION: 4 pts (manual)
 *   - Q6 SEP: 3 pts (manual)
 *   Total: 23 pts
 *
 * MTSS FEATURES:
 *   - Scaffolded sentence starters
 *   - 3D assessment rubrics
 *   - Lamarckian/major misconception checks
 *
 * ============================================================================
 */

/**
 * Template function for creating Exit Ticket forms
 * @param {Object} config - Configuration object
 * @returns {Form} - Created Google Form
 */
function createExitTicketFromTemplate(config) {
  const form = FormApp.create(
    `G${config.grade}.C${config.cycle}.W${config.week}: Exit Ticket - [ASSESSMENT NAME]`
  );

  form.setDescription(
    'EXIT TICKET: SHOW WHAT YOU LEARNED\n\n' +
    '---\n' +
    'Time: About 15 minutes | Points: 23\n\n' +
    'QUESTION TYPES:\n' +
    '- 2 NEW questions (Week [X] content)\n' +
    '- 2 SPIRAL questions (Week [X-1] review)\n' +
    '- 1 INTEGRATION question (connects both weeks)\n' +
    '- 1 SEP question (Science Practice)'
  );

  // Standard settings
  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'WEEK [X] COMPLETE! Great work!\n\n' +
    'Key takeaways:\n' +
    '- [KEY CONCEPT 1]\n' +
    '- [KEY CONCEPT 2]\n\n' +
    'NEXT WEEK: [PREVIEW]'
  );

  // --- NEW CONTENT ---
  form.addPageBreakItem()
    .setTitle('NEW CONTENT (Questions 1 & 3)')
    .setHelpText('These test what you learned TODAY.');

  // Q1: NEW - Define/Explain (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 1: NEW (4 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '4: Correct definition + example + explanation\n' +
      '3: Correct definition + example\n' +
      '2: Partial definition\n' +
      '1: Incorrect\n' +
      '0: No response'
    );
  // TODO: Add question with sentence starters

  // Q2: SPIRAL (4 pts auto)
  form.addSectionHeaderItem().setTitle('Question 2: SPIRAL - Week [X-1]');
  // TODO: Add spiral question

  // Q3: NEW (4 pts auto)
  // TODO: Add auto-graded new content question

  // Q4: SPIRAL - Misconception Check (4 pts auto)
  form.addSectionHeaderItem().setTitle('Question 4: SPIRAL - Misconception Check');
  // TODO: Add targeted misconception question

  // --- INTEGRATION ---
  form.addPageBreakItem()
    .setTitle('INTEGRATION (Question 5)')
    .setHelpText('This requires knowledge from BOTH weeks.');

  // Q5: INTEGRATION (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 5: INTEGRATION (4 points)')
    .setHelpText(
      '3D ASSESSMENT RUBRIC:\n' +
      '4: Uses Week [X-1] + Week [X] evidence together\n' +
      '3: Uses one type of evidence well\n' +
      '2: Mentions both but doesn\'t connect\n' +
      '1: Vague response\n' +
      '0: No response'
    );
  // TODO: Add integration question with multi-week sentence starters

  // --- SEP ---
  form.addPageBreakItem()
    .setTitle('SEP: [PRACTICE NAME] (Question 6)')
    .setHelpText('NGSS Practice: [Practice description]');

  // Q6: SEP (3 pts manual)
  // TODO: Add SEP question

  return form;
}

// Export for testing
function testExitTicketTemplate() {
  Logger.log('Exit Ticket Template: Ready for customization');
  Logger.log('Points: 23 | Time: ~15 min');
  Logger.log('Structure: 2 NEW + 2 SPIRAL + 1 INTEGRATION + 1 SEP');
}
