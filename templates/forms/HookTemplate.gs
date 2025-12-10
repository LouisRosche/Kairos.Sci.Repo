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
  // Misconception check - identifies common preconceptions
  form.addMultipleChoiceItem()
    .setTitle('Quick Check: What do you already think about [TOPIC]?')
    .setHelpText('This question helps us understand your starting point. It does NOT affect your grade.')
    .setChoices([
      form.createChoice('[Common correct understanding]'),
      form.createChoice('[Common misconception A]'),
      form.createChoice('[Common misconception B]'),
      form.createChoice('I\'m not sure yet')
    ])
    .setRequired(true);
    // Note: Do NOT set points - this is diagnostic only

  // --- PART 1: OBSERVATION ---
  form.addPageBreakItem()
    .setTitle('Part 1: Observe the Evidence')
    .setHelpText('Watch/read the phenomenon carefully. Look for patterns and details.');

  // Q1: Observation (3 pts auto)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('Based on [PHENOMENON], what pattern do you observe?')
    .setHelpText('Select the observation that best matches the evidence.')
    .setPoints(3)
    .setChoices([
      form.createChoice('[Correct observation]', true),
      form.createChoice('[Plausible but incorrect A]'),
      form.createChoice('[Plausible but incorrect B]'),
      form.createChoice('[Common misconception]')
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! [Brief explanation of why this observation is accurate]')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('[Refutational feedback]: Many people think [misconception], but the evidence shows [correct understanding] because [reason].')
      .build())
    .setRequired(true);

  // Q2: Hypothesis (3 pts manual)
  form.addParagraphTextItem()
    .setTitle('What do you think might explain this phenomenon?')
    .setHelpText(
      'SENTENCE STARTERS (choose one):\n' +
      '• I think this happens because...\n' +
      '• Based on what I observed, I predict that...\n' +
      '• My hypothesis is that [X] causes [Y] because...\n\n' +
      'RUBRIC: 3=Clear hypothesis with reasoning, 2=Hypothesis present, 1=Vague response, 0=No response'
    )
    .setRequired(true);
    // Note: Manual grading - points set in rubric

  // --- PART 2: PRIOR KNOWLEDGE ---
  form.addPageBreakItem()
    .setTitle('Part 2: Connect to Prior Learning');

  // Q3: Pattern/Connection (3 pts auto)
  const q3 = form.addMultipleChoiceItem()
    .setTitle('How does this phenomenon connect to [PRIOR CONCEPT from earlier in cycle]?')
    .setHelpText('Think about what you learned in [previous lesson/week].')
    .setPoints(3)
    .setChoices([
      form.createChoice('[Connection that demonstrates understanding]', true),
      form.createChoice('[Partial connection]'),
      form.createChoice('[Incorrect connection]'),
      form.createChoice('[No clear connection]')
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Excellent connection! [Explanation of how concepts relate]')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Consider this: [Hint about correct connection]. The key relationship is [explanation].')
      .build())
    .setRequired(true);

  // Q4: Spiral question (3 pts auto) - from previous week/cycle
  const q4 = form.addMultipleChoiceItem()
    .setTitle('[SPIRAL]: In Week [X-1], you learned about [PRIOR TOPIC]. Which statement is correct?')
    .setHelpText('SPIRAL REVIEW: This tests retention of earlier concepts.')
    .setPoints(3)
    .setChoices([
      form.createChoice('[Correct answer from prior week]', true),
      form.createChoice('[Incorrect - common confusion with current week]'),
      form.createChoice('[Incorrect - partial understanding]'),
      form.createChoice('[Incorrect - misconception]')
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Great memory! [Brief reinforcement of concept]')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review reminder: [Key concept from prior week]. Remember that [explanation].')
      .build())
    .setRequired(true);

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
