/**
 * ============================================================================
 * SHARED FORM UTILITIES - Use for both G7 and G8 Forms
 * Version: 1.0 | Last Updated: Cycle 3 Week 1
 * ============================================================================
 *
 * This library provides standardized helper functions for creating
 * Google Forms with consistent settings, validation, and rubrics.
 *
 * ============================================================================
 * GOOGLE FORMS API CONSTRAINTS - NON-NEGOTIABLE RULES
 * ============================================================================
 * These constraints were discovered through testing. Violating them causes errors.
 *
 * RULE 1: setPoints() ONLY on auto-gradable items
 *   ✓ WORKS: MultipleChoiceItem, CheckboxItem, ScaleItem
 *   ✗ FAILS: ParagraphTextItem, TextItem (causes "cannot set points" error)
 *   → Use manual grading rubrics in section headers for paragraph/text items
 *
 * RULE 2: setShuffleOrder() does NOT exist
 *   ✗ FAILS: form.setShuffleOrder() or item.setShuffleOrder()
 *   → Must configure manually in Forms UI: Settings > Quizzes > Shuffle option order
 *
 * RULE 3: Use requireTextLengthGreaterThanOrEqualTo(), NOT requireTextLengthGreaterThan()
 *   ✗ FAILS: .requireTextLengthGreaterThan(100) - method does not exist
 *   ✓ WORKS: .requireTextLengthGreaterThanOrEqualTo(100)
 *
 * RULE 4: setRequireLogin(true) for verified email collection
 *   → Prevents students from typing any email; forces Google account sign-in
 *   → Critical for Canvas gradebook sync and preventing impersonation
 *
 * RULE 5: Validation builder pattern
 *   ✓ WORKS: FormApp.createTextValidation().requireTextMatchesPattern('.*[0-9].*').build()
 *   ✓ WORKS: FormApp.createParagraphTextValidation().requireTextLengthGreaterThanOrEqualTo(50).build()
 *
 * RULE 6: Feedback requires FormApp.createFeedback().setText().build()
 *   → Cannot pass plain string to setFeedbackForCorrect/Incorrect
 *
 * RULE 7: Scale items support setPoints() but don't measure content mastery
 *   → RECOMMENDATION: Use 0-point diagnostics for confidence/reflection items
 *   → Prevents grade inflation from non-academic responses
 *
 * RULE 8: Checkbox grading is all-or-nothing
 *   → Student must select EXACTLY the correct choices to earn points
 *   → For partial credit, use manual grading with rubric in section header
 *
 * RULE 9: Form configuration that MUST be done manually in UI:
 *   - Release grade timing: Settings > Quizzes > "Immediately after each submission"
 *   - Visible feedback: Settings > Quizzes > Check all boxes for what respondent can see
 *   - Shuffle options: Settings > Quizzes > "Shuffle option order"
 *
 * ============================================================================
 * CROSS-POLLINATION BEST PRACTICES (from Hierarchical Audit)
 * ============================================================================
 *
 * AUTO:MANUAL RATIO:
 *   - G7: 5:10 (33% auto-graded) - better for scaling
 *   - G8: 4:17 (19% auto-graded) - more rigorous but time-intensive
 *   → Target: 30-40% auto-graded for balance of rigor and efficiency
 *
 * SENSITIVITY (detecting learning gains):
 *   - HIGH: Open calculations with rubric tiers
 *   - MODERATE: Checkbox with 4+ options
 *   - LOW: Binary MCQ with no partial credit
 *   → Use graduated rubrics for key conceptual questions
 *
 * SPECIFICITY (distinguishing misconceptions):
 *   - Include explicit misconception distractors in MCQs
 *   - G7 targets: "Bonds break when absorbing IR"
 *   - G8 targets: "Bigger = more force", "Individuals evolve"
 *   → Use setFeedbackForIncorrect to address the specific misconception
 *
 * CONFIDENCE ITEMS:
 *   - Convert to 0-point diagnostics (don't inflate grades)
 *   - Label: "FOR REFLECTION ONLY - does NOT affect your grade"
 *   - Still valuable for metacognition and identifying struggling students
 *
 * SEP-1 COMPLIANCE (Asking Questions):
 *   - Both MS-ESS3-5 and MS-LS4-4 require students to generate questions
 *   - Exit Ticket Q6 addresses this via question generator
 *   - Rubric: HOW/WHY questions with testable variables = full credit
 *
 * SPIRAL INTEGRATION:
 *   - Explicitly label spiral questions with "SPIRAL - Cycle 2"
 *   - Connect to prior learning in help text
 *   - Exit Ticket structure: 2 NEW + 2 SPIRAL + 1 INTEGRATION + 1 SEP-1
 *
 * CONCEPTUAL COHERENCE:
 *   - G8 threads F=ma through every station (strength to emulate)
 *   - G7 could reorder Station 2/3 for better energy flow (noted for future)
 *
 * RUBRIC PRECISION:
 *   - Use observable behaviors, not subjective terms ("clear", "vague")
 *   - Include graduated descriptors (5/4/3/2/1/0)
 *   - Pattern: [Correct elements] + [Mechanism explained] + [Connection made]
 *
 * ============================================================================
 * USAGE EXAMPLES
 * ============================================================================
 *
 * // Security configuration (call on every form)
 * FormUtils.configSecurity(form);
 *
 * // Calculation with numeric validation
 * FormUtils.addCalcItem(form, 'Calculate F=ma', 'Show your work', 4, rubricString);
 *
 * // Explanation with minimum length
 * FormUtils.addExplainItem(form, 'Explain why...', 'Use vocabulary', 5, rubric, 100);
 *
 * // Misconception MCQ with feedback
 * FormUtils.addMisconceptionMCQ(form, 'Which is true?', 'Correct', ['Wrong1','Wrong2'], 4,
 *   'Correct! Here is why...', 'Common misconception! Here is the truth...');
 *
 * // 0-point confidence diagnostic
 * FormUtils.addConfidenceDiagnostic(form, 'explaining forces in collisions');
 *
 * // SEP-1 question generator
 * FormUtils.addQuestionGenerator(form, 'natural selection',
 *   'How would survival change if...', 'Why do some species...', 3);
 */

var FormUtils = {

  /**
   * Configure standard security settings for all forms
   */
  configSecurity: function(form) {
    form.setIsQuiz(true);
    form.setRequireLogin(true);           // Forces verified Google account
    form.setCollectEmail(true);           // Captures email for gradebook
    form.setLimitOneResponsePerUser(true); // Prevents resubmission
    form.setAllowResponseEdits(true);      // Allows revision before deadline
    form.setProgressBar(true);             // Reduces abandonment
  },

  /**
   * Add a calculation item with numeric validation
   * Ensures students include a number in their answer
   */
  addCalcItem: function(form, title, helpText, points, rubric) {
    form.addSectionHeaderItem()
      .setTitle('Calculation (' + points + ' points)')
      .setHelpText('MANUAL GRADING\n' + rubric);

    var item = form.addTextItem()
      .setTitle(title)
      .setHelpText(helpText + '\n\nYour answer MUST include a number.')
      .setRequired(true);

    // Require at least one digit in the response
    item.setValidation(FormApp.createTextValidation()
      .requireTextMatchesPattern('.*[0-9].*')
      .setHelpText('Your answer must include a numerical value')
      .build());

    return item;
  },

  /**
   * Add a paragraph explanation item with minimum length validation
   */
  addExplainItem: function(form, title, helpText, points, rubric, minChars) {
    form.addSectionHeaderItem()
      .setTitle('Explanation (' + points + ' points)')
      .setHelpText('MANUAL GRADING\n' + rubric);

    var item = form.addParagraphTextItem()
      .setTitle(title)
      .setHelpText(helpText)
      .setRequired(true);

    // Minimum character requirement
    var minLength = minChars || 50;
    item.setValidation(FormApp.createParagraphTextValidation()
      .requireTextLengthGreaterThanOrEqualTo(minLength)
      .build());

    return item;
  },

  /**
   * Add a misconception-targeting MCQ with feedback
   */
  addMisconceptionMCQ: function(form, stem, correct, distractors, points, feedbackCorrect, feedbackIncorrect) {
    var item = form.addMultipleChoiceItem()
      .setTitle(stem)
      .setRequired(true);

    var choices = [item.createChoice(correct, true)];
    for (var i = 0; i < distractors.length; i++) {
      choices.push(item.createChoice(distractors[i], false));
    }

    item.setChoices(choices);
    item.setPoints(points);
    item.setFeedbackForCorrect(
      FormApp.createFeedback().setText(feedbackCorrect).build()
    );
    item.setFeedbackForIncorrect(
      FormApp.createFeedback().setText(feedbackIncorrect).build()
    );

    return item;
  },

  /**
   * Add a diagnostic confidence item (0 points - does not affect grade)
   * Use for student self-reflection only
   */
  addConfidenceDiagnostic: function(form, topic) {
    var item = form.addScaleItem()
      .setTitle('Self-Assessment: How confident are you about ' + topic + '?')
      .setHelpText('FOR REFLECTION ONLY - This does NOT affect your grade.')
      .setBounds(1, 5)
      .setLabels('Still learning', 'Got it!')
      .setRequired(true);
    // NO setPoints() - purely diagnostic
    return item;
  },

  /**
   * Add SEP-1 compliant question generator for Exit Tickets
   * NGSS SEP-1: Asking Questions
   */
  addQuestionGenerator: function(form, topic, example1, example2, points) {
    form.addSectionHeaderItem()
      .setTitle('Generate Scientific Questions (' + points + ' points)')
      .setHelpText(
        'RUBRIC - SEP-1: Asking Questions\n' +
        points + ' pts: 2 testable HOW/WHY questions with specific variables\n' +
        (points-1) + ' pts: 2 questions, at least 1 testable\n' +
        (points-2) + ' pts: 2 questions but yes/no style\n' +
        '1 pt: Only 1 question\n' +
        '0 pts: No response'
      );

    var item = form.addParagraphTextItem()
      .setTitle(
        'Write 2 scientific questions you still have about ' + topic + '.\n\n' +
        'Requirements:\n' +
        '- Start with HOW or WHY (not yes/no questions)\n' +
        '- Include specific variables that could be tested'
      )
      .setHelpText(
        'EXAMPLES of good scientific questions:\n' +
        '- ' + example1 + '\n' +
        '- ' + example2
      )
      .setRequired(true);

    return item;
  },

  /**
   * Add a section with question tagging (NEW, SPIRAL, INTEGRATION)
   */
  addTaggedSection: function(form, tag, title, points) {
    var tagLabels = {
      'NEW': 'NEW',
      'SPIRAL': 'SPIRAL (Cycle 2)',
      'INTEGRATION': 'INTEGRATION'
    };

    var label = tagLabels[tag] || tag;

    form.addSectionHeaderItem()
      .setTitle('Question: ' + label + ' - ' + title + ' (' + points + ' points)');
  },

  /**
   * Generate standardized rubric text
   */
  generateRubric: function(type, points, keyTerms) {
    var templates = {
      calculation: {
        full: 'Correct answer + correct formula shown + correct units',
        partial_high: 'Correct answer OR correct setup with minor arithmetic error',
        partial_mid: 'Correct formula, significant calculation error',
        partial_low: 'Relevant formula identified but not applied correctly',
        minimal: 'Attempt shows some relevant thinking',
        zero: 'No response or completely irrelevant'
      },
      explanation: {
        full: 'Uses KEY_TERM_1 AND KEY_TERM_2 + explains mechanism + connects to CONCEPT',
        partial_high: 'Uses key terms + explains mechanism OR connects to concept',
        partial_mid: 'Uses key terms without clear mechanism',
        partial_low: 'Relevant ideas without scientific vocabulary',
        minimal: 'Attempt with major misconceptions',
        zero: 'No response or completely irrelevant'
      },
      misconception: {
        full: 'Correctly identifies misconception + explains WHY wrong + states correct concept',
        partial_high: 'Identifies misconception + partial explanation',
        partial_mid: 'Identifies misconception without explanation',
        partial_low: 'Partially identifies issue',
        minimal: 'Accepts misconception but shows doubt',
        zero: 'Accepts misconception fully or no response'
      }
    };

    var template = templates[type];
    if (!template) return '';

    var pointScale = [
      points,
      Math.ceil(points * 0.8),
      Math.ceil(points * 0.6),
      Math.ceil(points * 0.4),
      Math.ceil(points * 0.2),
      0
    ];

    var rubric = 'RUBRIC (' + points + ' points):\n';
    var levels = ['full', 'partial_high', 'partial_mid', 'partial_low', 'minimal', 'zero'];

    for (var i = 0; i < levels.length; i++) {
      var description = template[levels[i]];

      // Replace placeholders with actual terms
      if (keyTerms) {
        for (var j = 0; j < keyTerms.length; j++) {
          description = description.replace('KEY_TERM_' + (j + 1), keyTerms[j]);
        }
      }

      rubric += pointScale[i] + ' pts: ' + description + '\n';
    }

    return rubric;
  },

  /**
   * Log form information consistently
   */
  logForm: function(form, name, points) {
    var editUrl = form.getEditUrl();
    var pubUrl = form.getPublishedUrl();
    var embedUrl = pubUrl.replace('/viewform', '/viewform?embedded=true');

    Logger.log('----------------------------------------');
    Logger.log(name + ' (' + points + ' pts)');
    Logger.log('----------------------------------------');
    Logger.log('Edit:  ' + editUrl);
    Logger.log('Embed: ' + embedUrl);
    Logger.log('');
  },

  /**
   * Create enhanced feedback with next-step guidance
   */
  createFeedback: function(isCorrect, concept, commonError, nextStep) {
    var text;

    if (isCorrect) {
      text = 'Correct! ' + concept;
      if (nextStep) {
        text += '\n\nNEXT STEP: ' + nextStep;
      }
    } else {
      text = 'Not quite.';
      if (commonError) {
        text += ' ' + commonError;
      }
      text += '\n\nKEY CONCEPT: ' + concept;
      if (nextStep) {
        text += '\n\nTRY THIS: ' + nextStep;
      }
    }

    return FormApp.createFeedback().setText(text).build();
  }
};

// Make FormUtils available globally
if (typeof exports !== 'undefined') {
  exports.FormUtils = FormUtils;
}
