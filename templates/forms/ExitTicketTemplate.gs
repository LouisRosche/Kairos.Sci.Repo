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

  form.addParagraphTextItem()
    .setTitle('Explain [KEY CONCEPT FROM THIS WEEK] in your own words.')
    .setHelpText(
      'SENTENCE STARTERS:\n' +
      '• [Concept] is when...\n' +
      '• An example of [concept] is... because...\n' +
      '• This matters because...\n\n' +
      'Include: definition, example, and why it matters.'
    )
    .setRequired(true);

  // Q2: SPIRAL (4 pts auto)
  form.addSectionHeaderItem().setTitle('Question 2: SPIRAL - Week [X-1]');

  const q2 = form.addMultipleChoiceItem()
    .setTitle('[SPIRAL] Last week you learned about [PRIOR TOPIC]. Which is correct?')
    .setHelpText('Think back to Week [X-1] content.')
    .setPoints(4)
    .setChoices([
      form.createChoice('[Correct answer demonstrating retention]', true),
      form.createChoice('[Near-miss - partial understanding]'),
      form.createChoice('[Common confusion with current week]'),
      form.createChoice('[Misconception from prior week]')
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Excellent retention! [Brief reinforcement]')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review: [Key concept from Week X-1]. Remember that [explanation].')
      .build())
    .setRequired(true);

  // Q3: NEW (4 pts auto)
  const q3 = form.addMultipleChoiceItem()
    .setTitle('Based on today\'s lesson about [CURRENT TOPIC], which statement is TRUE?')
    .setHelpText('Apply what you learned in this week\'s stations.')
    .setPoints(4)
    .setChoices([
      form.createChoice('[Correct application of new content]', true),
      form.createChoice('[Common error in applying concept]'),
      form.createChoice('[Overgeneralization]'),
      form.createChoice('[Misconception]')
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! [Explanation of why this demonstrates understanding]')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('[Refutational text]: You might think [misconception], but actually [correct understanding] because [evidence].')
      .build())
    .setRequired(true);

  // Q4: SPIRAL - Misconception Check (4 pts auto)
  form.addSectionHeaderItem().setTitle('Question 4: SPIRAL - Misconception Check');

  const q4 = form.addMultipleChoiceItem()
    .setTitle('[SPIRAL] A common mistake is thinking [MISCONCEPTION]. Why is this incorrect?')
    .setHelpText('This targets a common error from Week [X-1].')
    .setPoints(4)
    .setChoices([
      form.createChoice('[Correct explanation of why misconception is wrong]', true),
      form.createChoice('[Restates misconception as fact]'),
      form.createChoice('[Partially correct but missing key point]'),
      form.createChoice('[Different misconception]')
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('You avoided the misconception trap! [Reinforcement of correct understanding]')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('IMPORTANT: [Refutational explanation]. The evidence shows [correct understanding] because [reason].')
      .build())
    .setRequired(true);

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

  form.addParagraphTextItem()
    .setTitle('How do [CONCEPT FROM WEEK X-1] and [CONCEPT FROM WEEK X] work together in [REAL-WORLD SCENARIO]?')
    .setHelpText(
      'SENTENCE STARTERS:\n' +
      '• [Week X-1 concept] affects [Week X concept] by...\n' +
      '• In [scenario], first [concept 1] happens, then [concept 2] causes...\n' +
      '• The connection between [X-1] and [X] explains why...\n\n' +
      'You must reference BOTH weeks to get full credit.'
    )
    .setRequired(true);

  // --- SEP ---
  form.addPageBreakItem()
    .setTitle('SEP: Analyzing & Interpreting Data (Question 6)')
    .setHelpText('NGSS Practice: Construct explanations supported by multiple sources of evidence.');

  // Q6: SEP (3 pts manual)
  form.addParagraphTextItem()
    .setTitle('SEP TASK: Using the data from Station 2, explain [PHENOMENON] by identifying a pattern and explaining what causes it.')
    .setHelpText(
      'SENTENCE STARTERS:\n' +
      '• The data shows a pattern of...\n' +
      '• This pattern is caused by...\n' +
      '• My evidence for this explanation is...\n\n' +
      'RUBRIC: 3=Pattern + cause + evidence, 2=Pattern + partial cause, 1=Pattern only, 0=No response'
    )
    .setRequired(true);

  return form;
}

// Export for testing
function testExitTicketTemplate() {
  Logger.log('Exit Ticket Template: Ready for customization');
  Logger.log('Points: 23 | Time: ~15 min');
  Logger.log('Structure: 2 NEW + 2 SPIRAL + 1 INTEGRATION + 1 SEP');
}
