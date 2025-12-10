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
    .setTitle('Step 1: Investigate')
    .setHelpText('Follow the simulation/activity instructions, then answer the questions below.');

  // Q1: Data/Observation (5 pts auto)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('Using the [SIMULATION/DATA SOURCE], what do you observe when [VARIABLE] changes?')
    .setHelpText('Run the simulation at least 3 times to confirm your observation.')
    .setPoints(5)
    .setChoices([
      form.createChoice('[Correct observation of relationship]', true),
      form.createChoice('[Incorrect - reversed relationship]'),
      form.createChoice('[Incorrect - no relationship perceived]'),
      form.createChoice('[Incorrect - common misconception]')
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! The data shows [explanation of pattern].')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Try again with the simulation. Notice what happens when you [specific instruction].')
      .build())
    .setRequired(true);

  // Q2: Analysis (4 pts auto)
  const q2 = form.addCheckboxItem()
    .setTitle('Based on your data, which of the following are TRUE? (Select ALL that apply)')
    .setHelpText('You may select multiple answers. Points are awarded for each correct selection.')
    .setPoints(4)
    .setChoices([
      form.createChoice('[Correct statement 1]'),
      form.createChoice('[Correct statement 2]'),
      form.createChoice('[Incorrect statement - common error]'),
      form.createChoice('[Incorrect statement - misconception]')
    ])
    .setRequired(true);
    // Note: Set correct answers using .setCorrectAnswer() with the correct choices

  // --- STEP 2: ANALYZE ---
  form.addPageBreakItem()
    .setTitle('Step 2: Explain Your Findings');

  // Q3: Explanation (5 pts manual)
  form.addParagraphTextItem()
    .setTitle('Explain WHY the pattern you observed occurs. What is the mechanism?')
    .setHelpText(
      'SENTENCE STARTERS:\n' +
      '• The pattern occurs because...\n' +
      '• When [variable] increases, [result] happens because...\n' +
      '• The mechanism that causes this is...\n\n' +
      'RUBRIC: 5=Mechanism + cause-effect + evidence, 4=Mechanism + cause-effect, 3=Partial mechanism, 2=Description only, 1=Vague, 0=No response'
    )
    .setRequired(true);

  // Q4: Misconception check (3 pts auto)
  const q4 = form.addMultipleChoiceItem()
    .setTitle('A student claims: "[COMMON MISCONCEPTION STATEMENT]". Is this correct?')
    .setHelpText('Use evidence from your investigation to evaluate this claim.')
    .setPoints(3)
    .setChoices([
      form.createChoice('No, because [correct reasoning]', true),
      form.createChoice('Yes, because [reasoning that supports misconception]'),
      form.createChoice('Partially correct - [partial explanation]'),
      form.createChoice('I\'m not sure')
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! [Refutational explanation of why misconception is wrong and what\'s actually true]')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Think again: [Refutational text]. The evidence shows [correct understanding] because [reason].')
      .build())
    .setRequired(true);

  // Q5: Spiral connection (3 pts manual)
  form.addParagraphTextItem()
    .setTitle('[SPIRAL] How does what you learned today connect to [CONCEPT FROM PREVIOUS WEEK/CYCLE]?')
    .setHelpText(
      'SENTENCE STARTERS:\n' +
      '• Today\'s concept connects to [prior concept] because...\n' +
      '• Both [today] and [prior week] involve [common principle]...\n' +
      '• Understanding [prior concept] helped me understand [today] because...\n\n' +
      'RUBRIC: 3=Clear connection with reasoning, 2=Connection stated, 1=Vague, 0=No response'
    )
    .setRequired(true);

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
    'ENGINEERING CHALLENGE: [CHALLENGE DESCRIPTION]\n\n' +
    'Your task: Design a solution to [PROBLEM] using what you\'ve learned.\n\n' +
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
  form.setConfirmationMessage(
    'Station 3 complete! Great engineering work.\n\n' +
    'Final step: Complete your Exit Ticket to wrap up the week.'
  );

  // --- DESIGN CHALLENGE ---
  form.addPageBreakItem()
    .setTitle('Engineering Design Challenge')
    .setHelpText('Apply your knowledge to solve a real-world problem.');

  // Q1: Design/Apply (5 pts manual)
  form.addParagraphTextItem()
    .setTitle('DEFINE: What is the problem you need to solve? What constraints must your solution meet?')
    .setHelpText(
      'SENTENCE STARTERS:\n' +
      '• The problem I need to solve is...\n' +
      '• My solution must...\n' +
      '• The constraints I need to consider are...\n\n' +
      'RUBRIC: 5=Problem + 3+ constraints, 4=Problem + 2 constraints, 3=Problem + 1 constraint, 2=Problem only, 1=Vague, 0=No response'
    )
    .setRequired(true);

  // Q2: Design/Apply (5 pts manual)
  form.addParagraphTextItem()
    .setTitle('DESIGN: Describe your solution. How does it work? Include a sketch or diagram description.')
    .setHelpText(
      'SENTENCE STARTERS:\n' +
      '• My design includes...\n' +
      '• It works by...\n' +
      '• The key features are... because they...\n\n' +
      'RUBRIC: 5=Detailed design + mechanism + justification, 4=Design + mechanism, 3=Design description, 2=Partial design, 1=Vague, 0=No response'
    )
    .setRequired(true);

  // Q3: Design/Apply (5 pts manual)
  form.addParagraphTextItem()
    .setTitle('EVALUATE: What are the strengths and weaknesses of your design? How could you improve it?')
    .setHelpText(
      'SENTENCE STARTERS:\n' +
      '• The strengths of my design are...\n' +
      '• One weakness is... which I could improve by...\n' +
      '• To make it better, I would...\n\n' +
      'RUBRIC: 5=2+ strengths + 2+ weaknesses + improvements, 4=Strengths + weaknesses + improvement, 3=Strengths + weaknesses, 2=One category, 1=Vague, 0=No response'
    )
    .setRequired(true);

  // --- MECHANISM ---
  form.addPageBreakItem()
    .setTitle('Scientific Explanation')
    .setHelpText('Explain the science behind your design.');

  // Q4: Mechanism explanation (7 pts manual) - highest value question
  form.addParagraphTextItem()
    .setTitle('EXPLAIN: Why does your design work? Use scientific concepts from this cycle to explain the mechanism.')
    .setHelpText(
      'SENTENCE STARTERS:\n' +
      '• My design works because of [scientific principle]...\n' +
      '• The mechanism involves [concept 1] and [concept 2]...\n' +
      '• According to what we learned about [topic], [explanation]...\n\n' +
      'RUBRIC (7 pts): \n' +
      '7: Multiple concepts + clear mechanism + evidence from cycle\n' +
      '5-6: One concept + mechanism\n' +
      '3-4: Partial scientific explanation\n' +
      '1-2: Vague reference to science\n' +
      '0: No scientific explanation'
    )
    .setRequired(true);

  // Q5: Misconception check (3 pts auto)
  const q5 = form.addMultipleChoiceItem()
    .setTitle('Which scientific principle is MOST important for making your design work?')
    .setHelpText('Select the concept that is central to your solution.')
    .setPoints(3)
    .setChoices([
      form.createChoice('[Correct core concept from cycle]', true),
      form.createChoice('[Related but secondary concept]'),
      form.createChoice('[Common misconception]'),
      form.createChoice('[Unrelated concept]')
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! [Explanation of why this principle is key to the design]')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Consider: [Correct principle] is actually most important because [explanation]. [Refutational text if misconception selected]')
      .build())
    .setRequired(true);

  return form;
}

// Export for testing
function testStationTemplate() {
  Logger.log('Station Templates: Ready for customization');
  Logger.log('Station 1: 20 pts, ~18 min (Investigation)');
  Logger.log('Station 2: 20 pts, ~15 min (Analysis)');
  Logger.log('Station 3: 25 pts, ~20 min (Application)');
}
