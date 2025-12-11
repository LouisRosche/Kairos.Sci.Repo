/**
 * ============================================================================
 * GRADE 7 - CYCLE 7 WEEK 2: GEOLOGIC TIME & FOSSIL EVIDENCE
 * 5 Forms | 100 Points Total | ~75 Minutes
 * ============================================================================
 *
 * NGSS ALIGNMENT:
 *   Primary: MS-ESS1-4 - Construct a scientific explanation based on evidence
 *            from rock strata for how the geologic time scale is used to organize
 *            Earth's history.
 *   Spiral:  MS-ESS2-2 - Geoscience processes (Cycle 6)
 *            C7W1 - Rock types and rock cycle (Week 1)
 *
 * 3-DIMENSIONAL LEARNING:
 *   SEP-6: Constructing Explanations - Explain geologic history from evidence
 *   SEP-7: Engaging in Argument from Evidence - Support claims about Earth's past
 *   DCI ESS1.C: The History of Planet Earth
 *   CCC-3: Scale, Proportion, and Quantity - Geologic time scales
 *   CCC-1: Patterns - Fossil distribution and extinction events
 *
 * LEARNING TARGETS:
 *   1. Use superposition and fossils to determine relative ages
 *   2. Interpret the fossil record to identify major events in Earth's history
 *   3. Explain how index fossils help correlate rock layers
 *   4. Design investigations to determine geologic history
 *
 * FORMS:
 *   1. Hook - The Deep Time Mystery (12 pts, ~10 min)
 *   2. Station 1 - Stratigraphy Investigation (20 pts, ~18 min)
 *   3. Station 2 - Fossil Record Analysis (20 pts, ~15 min)
 *   4. Station 3 - Design a Geologic Investigation (25 pts, ~20 min)
 *   5. Exit Ticket - Geologic Time Integration (23 pts, ~15 min)
 *
 * ============================================================================
 * GOOGLE FORMS API CONSTRAINTS - NON-NEGOTIABLE RULES
 * ============================================================================
 * RULE 1: setPoints() ONLY on auto-gradable items (MCQ, Checkbox, Scale)
 * RULE 2: setShuffleOrder() does NOT exist - configure manually in UI
 * RULE 3: Use requireTextLengthGreaterThanOrEqualTo(), NOT requireTextLengthGreaterThan()
 * RULE 4: setRequireLogin(true) for verified email collection
 * RULE 5: Feedback requires FormApp.createFeedback().setText().build()
 * RULE 6: Scale items support setPoints() but use 0 for diagnostics
 * RULE 7: Checkbox grading is all-or-nothing
 *
 * ============================================================================
 * DEPLOYMENT CHECKLIST
 * ============================================================================
 *   1. Open script.google.com, create new project
 *   2. Paste this entire script
 *   3. Run: createAllG7C7W2Forms()
 *   4. Check Logger (View > Logs) for form URLs
 *   5. MANUAL CONFIG REQUIRED (Settings > Quizzes in each form):
 *      - Release grade: "Immediately after each submission"
 *      - Respondent can see: Check ALL boxes
 *      - Shuffle option order: ON
 *   6. Embed forms in LMS using the embed URLs from Logger
 */

// ============================================================================
// MAIN FUNCTION
// ============================================================================

function createAllG7C7W2Forms() {
  Logger.log('================================================');
  Logger.log('G7 CYCLE 7 WEEK 2: GEOLOGIC TIME & FOSSIL EVIDENCE');
  Logger.log('================================================\n');

  const forms = {
    hook: createG7C7W2Hook_(),
    station1: createG7C7W2Station1_(),
    station2: createG7C7W2Station2_(),
    station3: createG7C7W2Station3_(),
    exitTicket: createG7C7W2ExitTicket_()
  };

  Logger.log('\n================================================');
  Logger.log('ALL 5 FORMS CREATED - 100 POINTS TOTAL');
  Logger.log('================================================');

  return forms;
}

// ============================================================================
// HOOK - THE DEEP TIME MYSTERY (12 points, ~10 min)
// Connects Week 1 rock/fossil concepts to geologic time
// ============================================================================

function createG7C7W2Hook_() {
  const form = FormApp.create('G7.C7.W2: Hook - The Deep Time Mystery');

  form.setDescription(
    'THE DEEP TIME MYSTERY\n\n' +
    'Earth is 4.5 billion years old. That\'s REALLY hard to imagine.\n\n' +
    'Try this: If all of Earth\'s history were compressed into a 24-hour day:\n' +
    '- First life appears at 4:00 AM\n' +
    '- Fish appear at 9:30 PM\n' +
    '- Dinosaurs appear at 10:45 PM and go extinct at 11:40 PM\n' +
    '- Modern humans appear at 11:59:59 PM (less than 1 second!)\n' +
    '- All of recorded human history is a fraction of a second before midnight\n\n' +
    'We can\'t travel back in time. So how do scientists figure out what Earth looked like?\n\n' +
    '---\n' +
    'Time: About 10 minutes | Points: 12\n' +
    'Build on what you learned last week about rocks and fossils!'
  );

  // Quiz and response settings
  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Hook submitted! You\'re ready for Station 1.\n\n' +
    'Next: Learn to "read" rock layers like pages in a history book!\n' +
    'You\'ll use fossils and rock patterns to date ancient events.'
  );

  // --- PART 1: WEEK 1 RETRIEVAL ---
  form.addPageBreakItem()
    .setTitle('Part 1: What You Already Know from Week 1')
    .setHelpText('These questions check what you remember about rocks and fossils.');

  // Q1: Rock type connection (3 pts auto)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('Last week, we learned that fossils are almost exclusively found in which rock type?')
    .setHelpText('Think back to how fossils form.')
    .setRequired(true);

  q1.setChoices([
    q1.createChoice('Igneous - formed from cooled magma', false),
    q1.createChoice('Sedimentary - formed from compressed sediments', true),
    q1.createChoice('Metamorphic - formed from heat and pressure', false),
    q1.createChoice('All rock types contain fossils equally', false)
  ]);
  q1.setPoints(3);
  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Fossils form when organisms are buried in sediment. Igneous and metamorphic processes would destroy fossils.')
      .build()
  );
  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Review Week 1: Fossils only form in SEDIMENTARY rock because organisms are buried in sediment that later compresses into rock.')
      .build()
  );

  // --- MTSS FLAG: Check for Week 1 understanding ---
  const mtss1 = form.addMultipleChoiceItem()
    .setTitle('QUICK CHECK (Week 1 Review): What does a fossil in a rock tell us about WHERE that rock formed?')
    .setHelpText('This checks your Week 1 understanding. Your answer does NOT affect your grade.')
    .setRequired(true);

  mtss1.setChoices([
    mtss1.createChoice('Nothing - fossils don\'t tell us anything about the environment', false),
    mtss1.createChoice('The rock formed where the organism lived (e.g., marine fossil = ocean environment)', true),
    mtss1.createChoice('The rock formed deep underground near magma', false),
    mtss1.createChoice('The fossil moved to the rock after it formed', false)
  ]);
  // Diagnostic only - omit setPoints() for ungraded items

  // --- PART 2: PHENOMENON ---
  form.addPageBreakItem()
    .setTitle('Part 2: The Deep Time Challenge')
    .setHelpText('Think about how scientists figure out Earth\'s history.');

  // Q2: Scale comprehension (3 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 2 (3 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '3: Demonstrates understanding of vast time scale with specific example or calculation\n' +
      '2: Shows general understanding of deep time\n' +
      '1: Basic response without scale awareness\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('In the "24-hour Earth" model, humans appear in the last second. What does this tell you about the importance of studying Earth\'s history BEFORE humans existed?')
    .setHelpText(
      'Sentence starters:\n' +
      '• "This shows that Earth\'s history is mostly..." \n' +
      '• "If we only studied human history, we would miss..." \n' +
      '• "The 24-hour model helps me understand..."'
    )
    .setRequired(true);

  // Q3: Evidence types (3 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 3 (3 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '3: Identifies 2+ valid evidence types (fossils, rock layers, etc.) with reasoning\n' +
      '2: Identifies 1 evidence type with reasoning\n' +
      '1: Vague response without specific evidence\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Scientists can\'t travel back in time. Based on what you learned in Week 1, what evidence do you think they use to figure out what Earth looked like millions of years ago?')
    .setHelpText(
      'Sentence starters:\n' +
      '• "Scientists can use... because..." \n' +
      '• "Week 1 taught me that rocks can show..." \n' +
      '• "Evidence like... can reveal..."'
    )
    .setRequired(true);

  // Q4: Prediction (3 pts auto)
  const q4 = form.addMultipleChoiceItem()
    .setTitle('If you dig down through rock layers, what pattern would you expect to find in the fossils?')
    .setRequired(true);

  q4.setChoices([
    q4.createChoice('Deeper layers contain OLDER fossils; shallower layers contain YOUNGER fossils', true),
    q4.createChoice('Deeper layers contain YOUNGER fossils; shallower layers contain OLDER fossils', false),
    q4.createChoice('All layers contain the same types of fossils', false),
    q4.createChoice('Fossils are randomly distributed with no pattern', false)
  ]);
  q4.setPoints(3);
  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! This is the Law of Superposition - older layers are deposited first (bottom), younger layers on top.')
      .build()
  );
  q4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Think about how sedimentary layers form: new sediment piles ON TOP of old sediment. So deeper = older, shallower = younger.')
      .build()
  );

  // Q5: Confidence (0 pts - diagnostic only)
  form.addScaleItem()
    .setTitle('Self-Assessment: How confident are you that you can use rock layers to determine relative ages?')
    .setHelpText('FOR REFLECTION ONLY - This does NOT affect your grade. Be honest!')
    .setBounds(1, 5)
    .setLabels('Still learning', 'Got it!')
    .setRequired(true);

  logFormInfo_(form, 'G7 C7 W2 Hook', 12);
  return form;
}

// ============================================================================
// STATION 1 - STRATIGRAPHY INVESTIGATION (20 points, ~18 min)
// Use superposition and fossils to date layers
// ============================================================================

function createG7C7W2Station1_() {
  const form = FormApp.create('G7.C7.W2: Station 1 - Stratigraphy Investigation');

  form.setDescription(
    'YOUR MISSION: READ ROCK LAYERS LIKE A HISTORY BOOK\n\n' +
    'Stratigraphy is the study of rock layers (strata).\n' +
    'Scientists use several principles to determine the ages of rock layers.\n\n' +
    'KEY PRINCIPLES:\n' +
    '• SUPERPOSITION: In undisturbed layers, older rocks are on the bottom\n' +
    '• ORIGINAL HORIZONTALITY: Layers form horizontally (tilted = disturbed later)\n' +
    '• CROSS-CUTTING: Features that cut across layers are younger than the layers\n\n' +
    '---\n' +
    'Time: About 18 minutes | Points: 20\n' +
    'Use the Geologic Time Explorer simulation!'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Station 1 complete!\n\n' +
    'KEY INSIGHT: Rock layers are like pages in Earth\'s history book!\n' +
    'Bottom = oldest, Top = youngest (usually)\n' +
    'Fossils tell us what lived at each time.\n\n' +
    'Continue to Station 2: Fossil Record Analysis'
  );

  // --- DATA REFERENCE ---
  form.addPageBreakItem()
    .setTitle('Reference: Stratigraphy Principles')
    .setHelpText(
      'STRATIGRAPHIC PRINCIPLES:\n\n' +
      '┌──────────────────────┬────────────────────────────────────────┐\n' +
      '│ Principle            │ What It Tells Us                       │\n' +
      '├──────────────────────┼────────────────────────────────────────┤\n' +
      '│ Superposition        │ Deeper layers = older (if undisturbed) │\n' +
      '│ Original Horizontality│ Tilted layers were disturbed later    │\n' +
      '│ Cross-cutting        │ Intrusions/faults are younger than     │\n' +
      '│                      │ layers they cut through                │\n' +
      '│ Fossil Succession    │ Same fossils = same age (even in       │\n' +
      '│                      │ distant locations)                     │\n' +
      '└──────────────────────┴────────────────────────────────────────┘\n\n' +
      'INDEX FOSSILS:\n' +
      '• Widespread geographically\n' +
      '• Lived for a short time period\n' +
      '• Easily identified\n' +
      '• Examples: Trilobites (Paleozoic), Ammonites (Mesozoic)'
    );

  // Q1: Superposition application (4 pts auto)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('A core sample shows Layer A at the bottom, Layer B in the middle, and Layer C on top. The layers are horizontal and undisturbed. Which layer is OLDEST?')
    .setRequired(true);

  q1.setChoices([
    q1.createChoice('Layer A (bottom) - deposited first', true),
    q1.createChoice('Layer B (middle) - sandwiched between', false),
    q1.createChoice('Layer C (top) - most weathered', false),
    q1.createChoice('Cannot determine without radioactive dating', false)
  ]);
  q1.setPoints(4);
  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Law of Superposition: In undisturbed layers, the bottom layer formed first (oldest) and the top layer formed last (youngest).')
      .build()
  );
  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Apply superposition: sediment layers stack on top of each other. The first layer deposited is at the BOTTOM.')
      .build()
  );

  // Q2: Index fossil application (4 pts auto)
  const q2 = form.addMultipleChoiceItem()
    .setTitle('You find the same index fossil (Ammonite A) in rock layers in Europe and South America. What can you conclude?')
    .setRequired(true);

  q2.setChoices([
    q2.createChoice('The layers are approximately the same age', true),
    q2.createChoice('The continents were never connected', false),
    q2.createChoice('The fossils moved between continents recently', false),
    q2.createChoice('The European layer must be older', false)
  ]);
  q2.setPoints(4);
  q2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Index fossils lived during specific time periods. Finding the same fossil means those rock layers formed around the same time, even if far apart today.')
      .build()
  );
  q2.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Index fossils are used for CORRELATION - the same fossil in distant locations = same age. They were widespread but lived for a short time.')
      .build()
  );

  // Q3: Relative vs absolute age (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 3: Relative vs. Absolute Age (4 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '4: Correctly distinguishes relative (order) from absolute (number) + explains when each is useful\n' +
      '3: Correct distinction without application\n' +
      '2: Partial understanding\n' +
      '1: Confusion between terms\n' +
      '0: No response\n\n' +
      'KEY DISTINCTION:\n' +
      '• RELATIVE age: Layer A is OLDER than Layer B\n' +
      '• ABSOLUTE age: Layer A is 250 million years old'
    );

  form.addParagraphTextItem()
    .setTitle('Explain the difference between RELATIVE age and ABSOLUTE age. Give an example of when stratigraphy gives you relative age but NOT absolute age.')
    .setHelpText(
      'Sentence starters:\n' +
      '• "Relative age tells us... while absolute age tells us..." \n' +
      '• "Stratigraphy can show that Layer X is older than Layer Y, but..." \n' +
      '• "To get an exact age in years, scientists would need..."'
    )
    .setRequired(true);

  // Q4: Misconception - disturbed layers (4 pts auto)
  const q4 = form.addMultipleChoiceItem()
    .setTitle('MISCONCEPTION CHECK: A student says "Older rocks are ALWAYS deeper underground." Why might this be incorrect?')
    .setRequired(true);

  q4.setChoices([
    q4.createChoice('Folding, faulting, or intrusions can put older rocks on top of younger ones', true),
    q4.createChoice('The student is correct - older rocks are always deeper', false),
    q4.createChoice('Rocks don\'t have ages - they\'ve always existed', false),
    q4.createChoice('Deeper rocks are actually always younger', false)
  ]);
  q4.setPoints(4);
  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Superposition only works for UNDISTURBED layers. Folding, faulting, and intrusions can flip or scramble the order.')
      .build()
  );
  q4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Superposition has a key caveat: layers must be UNDISTURBED. Tectonic forces can fold, fault, or flip layers.')
      .build()
  );

  // Q5: Spiral - Week 1 rock cycle connection (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 5: SPIRAL - Week 1 Connection (4 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '4: Correctly explains how rock cycle disrupts stratigraphy (metamorphism destroys fossils, intrusions cut layers, etc.)\n' +
      '3: Mentions rock cycle with partial explanation\n' +
      '2: General connection without mechanism\n' +
      '1: Vague reference\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('WEEK 1 CONNECTION: How might the ROCK CYCLE (from Week 1) disrupt the neat order of rock layers? Give a specific example.')
    .setHelpText(
      'Sentence starters:\n' +
      '• "The rock cycle can disrupt layers when..." \n' +
      '• "For example, if magma intrudes into sedimentary layers..." \n' +
      '• "Metamorphism would affect the fossil record by..."'
    )
    .setRequired(true);

  logFormInfo_(form, 'G7 C7 W2 Station 1', 20);
  return form;
}

// ============================================================================
// STATION 2 - FOSSIL RECORD ANALYSIS (20 points, ~15 min)
// Interpret fossil patterns and major events
// ============================================================================

function createG7C7W2Station2_() {
  const form = FormApp.create('G7.C7.W2: Station 2 - Fossil Record Analysis');

  form.setDescription(
    'YOUR MISSION: DECODE EARTH\'S HISTORY FROM FOSSILS\n\n' +
    'The fossil record isn\'t just about individual organisms.\n' +
    'It reveals PATTERNS that tell us about major events in Earth\'s history.\n\n' +
    'WHAT FOSSILS REVEAL:\n' +
    '• When new types of organisms appeared\n' +
    '• When mass extinctions wiped out most life\n' +
    '• How climate and environments changed\n' +
    '• How continents moved over time\n\n' +
    '---\n' +
    'Time: About 15 minutes | Points: 20\n' +
    'Analyze the data to find patterns!'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Station 2 complete!\n\n' +
    'KEY INSIGHT: The fossil record shows that life has changed dramatically!\n' +
    'Mass extinctions reset the stage, allowing new types of life to dominate.\n\n' +
    'Continue to Station 3: Design a Geologic Investigation'
  );

  // --- DATA REFERENCE ---
  form.addPageBreakItem()
    .setTitle('Reference: Major Events in Earth\'s History')
    .setHelpText(
      'GEOLOGIC TIME SCALE (Major Events):\n\n' +
      '┌─────────────────────┬──────────┬────────────────────────────────┐\n' +
      '│ Event               │ Time     │ Evidence in Fossil Record      │\n' +
      '├─────────────────────┼──────────┼────────────────────────────────┤\n' +
      '│ Cambrian Explosion  │ 540 Ma   │ Sudden appearance of complex   │\n' +
      '│                     │          │ animals with hard parts        │\n' +
      '├─────────────────────┼──────────┼────────────────────────────────┤\n' +
      '│ Great Dying (P-T)   │ 252 Ma   │ 96% of marine species extinct  │\n' +
      '│                     │          │ Trilobites disappear forever   │\n' +
      '├─────────────────────┼──────────┼────────────────────────────────┤\n' +
      '│ K-Pg Extinction     │ 66 Ma    │ Dinosaurs go extinct, mammals  │\n' +
      '│                     │          │ diversify rapidly              │\n' +
      '├─────────────────────┼──────────┼────────────────────────────────┤\n' +
      '│ Ice Ages            │ 2.6 Ma   │ Large mammals, climate cycles  │\n' +
      '│                     │ -present │ Human evolution                │\n' +
      '└─────────────────────┴──────────┴────────────────────────────────┘\n\n' +
      'Ma = Million years ago'
    );

  // Q1: Pattern recognition (4 pts auto)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('The fossil record shows that 96% of marine species went extinct at the end of the Permian Period. What would you expect to find in rock layers AFTER this event?')
    .setRequired(true);

  q1.setChoices([
    q1.createChoice('Very few fossils at first, then gradual increase of NEW species', true),
    q1.createChoice('The same species as before, just fewer of them', false),
    q1.createChoice('No fossils at all in any layers after this time', false),
    q1.createChoice('Immediate appearance of all modern species', false)
  ]);
  q1.setPoints(4);
  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! After mass extinctions, surviving species diversify to fill empty ecological niches. It takes time, and the NEW species are different from what existed before.')
      .build()
  );
  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('After a mass extinction, most species are gone. Life doesn\'t instantly recover - it takes millions of years for new species to evolve and diversify.')
      .build()
  );

  // Q2: Using extinctions as markers (4 pts auto)
  const q2 = form.addMultipleChoiceItem()
    .setTitle('Geologists use mass extinctions to divide the geologic time scale. Why are extinctions useful as "markers" between time periods?')
    .setRequired(true);

  q2.setChoices([
    q2.createChoice('They create clear "before and after" changes in the fossil record worldwide', true),
    q2.createChoice('Extinctions happen at regular, predictable intervals', false),
    q2.createChoice('All extinctions are caused by the same event', false),
    q2.createChoice('Extinctions leave visible marks on rock layers', false)
  ]);
  q2.setPoints(4);
  q2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Mass extinctions create clear boundaries: fossils BELOW are different from fossils ABOVE. This works globally, making them perfect dividers.')
      .build()
  );
  q2.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Mass extinctions create sudden, global changes in the fossil record. Fossils before an extinction are very different from fossils after.')
      .build()
  );

  // Q3: Evidence interpretation (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 3: Interpret the Evidence (4 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '4: Uses evidence from table to construct explanation + identifies at least 2 patterns\n' +
      '3: Identifies patterns but explanation incomplete\n' +
      '2: Basic observation without pattern recognition\n' +
      '1: Vague response\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Using the Major Events table, what PATTERNS do you notice in the history of life on Earth? What do these patterns tell us about how life changes over time?')
    .setHelpText(
      'Sentence starters:\n' +
      '• "I notice a pattern of..." \n' +
      '• "After extinctions, the fossil record shows..." \n' +
      '• "This suggests that life on Earth..."'
    )
    .setRequired(true);

  // Q4: Spiral - Plate tectonics and fossil distribution (4 pts auto)
  const q4 = form.addMultipleChoiceItem()
    .setTitle('SPIRAL - Cycle 6 Connection: The same fossil species are found on continents that are now separated by oceans. What does this tell us?')
    .setRequired(true);

  q4.setChoices([
    q4.createChoice('The continents were once connected when those organisms lived', true),
    q4.createChoice('The fossils swam across the ocean', false),
    q4.createChoice('Scientists made errors in identification', false),
    q4.createChoice('The fossils formed independently on each continent', false)
  ]);
  q4.setPoints(4);
  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! This is evidence for continental drift! Fossils like Mesosaurus are found on both South America and Africa because these continents were once joined.')
      .build()
  );
  q4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Review Cycle 6: The distribution of identical fossils across now-separated continents is KEY evidence that continents were once connected (Pangaea).')
      .build()
  );

  // Q5: Prediction (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 5: Make a Prediction (4 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '4: Prediction is logical, based on established patterns, with clear reasoning\n' +
      '3: Logical prediction with partial reasoning\n' +
      '2: Prediction without pattern-based reasoning\n' +
      '1: Illogical or unsupported prediction\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Based on the patterns in the fossil record, what do you predict would happen to life on Earth if another mass extinction occurred? Use evidence from the data.')
    .setHelpText(
      'Sentence starters:\n' +
      '• "Based on past extinctions, I predict..." \n' +
      '• "The fossil record shows that after extinctions, life typically..." \n' +
      '• "However, this time might be different because..."'
    )
    .setRequired(true);

  logFormInfo_(form, 'G7 C7 W2 Station 2', 20);
  return form;
}

// ============================================================================
// STATION 3 - DESIGN A GEOLOGIC INVESTIGATION (25 points, ~20 min)
// Apply dating methods to design an investigation - SEP-6, SEP-7
// ============================================================================

function createG7C7W2Station3_() {
  const form = FormApp.create('G7.C7.W2: Station 3 - Design a Geologic Investigation');

  form.setDescription(
    'ENGINEERING CHALLENGE: DESIGN AN INVESTIGATION TO DECODE ROCK HISTORY\n\n' +
    'THE SCENARIO:\n' +
    'You\'ve discovered a new rock formation with three distinct layers:\n' +
    '- Layer A (top): Red sandstone with footprints\n' +
    '- Layer B (middle): Gray limestone with seashells\n' +
    '- Layer C (bottom): Black shale with plant fossils\n\n' +
    'Your task: Design a complete investigation to determine:\n' +
    '1. The relative ages of the layers\n' +
    '2. What environment each layer formed in\n' +
    '3. Approximately when each layer formed\n\n' +
    '---\n' +
    'Time: About 20 minutes | Points: 25 (highest value!)'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Station 3 complete!\n\n' +
    'You\'ve designed a real geologic investigation!\n' +
    'This is exactly what geologists do in the field.\n\n' +
    'Continue to Exit Ticket'
  );

  // --- REFERENCE DATA ---
  form.addPageBreakItem()
    .setTitle('Reference: Investigation Tools')
    .setHelpText(
      'AVAILABLE EVIDENCE TYPES:\n\n' +
      'ROCK TYPE CLUES:\n' +
      '• Sandstone → desert or beach (wind/water-deposited sand)\n' +
      '• Limestone → shallow marine (shells and coral)\n' +
      '• Shale → swamp or deep water (fine mud/clay)\n\n' +
      'FOSSIL CLUES:\n' +
      '• Footprints → terrestrial animals\n' +
      '• Seashells → marine environment\n' +
      '• Plant fossils → land vegetation\n' +
      '• Index fossils → specific time periods\n\n' +
      'DATING METHODS:\n' +
      '• Superposition → relative age (order)\n' +
      '• Index fossils → approximate age range\n' +
      '• Cross-cutting relationships → relative to intrusions'
    );

  // Q1: Investigation design (7 pts manual) - highest value question
  form.addSectionHeaderItem()
    .setTitle('Question 1: Design Your Investigation (7 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '7: Complete plan with: (1) methods for each question, (2) specific evidence to collect, (3) expected findings, (4) validation approach\n' +
      '5-6: Most elements present with good reasoning\n' +
      '3-4: Basic plan missing key elements\n' +
      '1-2: Incomplete plan with major gaps\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Design a complete investigation plan to determine the history of this rock formation.\n\nYour plan must include:\n1. How you will determine the RELATIVE AGES\n2. What EVIDENCE you will look for\n3. Your PREDICTIONS for each layer\n4. How you will CHECK your conclusions')
    .setHelpText(
      'Investigation structure:\n' +
      '• "To determine relative ages, I will..." \n' +
      '• "For environment clues, I will look for..." \n' +
      '• "I predict Layer A formed in... because..." \n' +
      '• "To validate my conclusions, I could..."'
    )
    .setRequired(true);

  // Q2: Environment reconstruction (6 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 2: Reconstruct the Environments (6 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '6: All 3 environments correctly identified with specific fossil/rock evidence for each\n' +
      '4-5: 2-3 environments correct with evidence\n' +
      '2-3: Partial identification without evidence\n' +
      '1: Guesses without reasoning\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Based on the clues in each layer, describe the environment where EACH layer formed. Use specific evidence from the rock type and fossils.')
    .setHelpText(
      'Format your answer:\n' +
      '• "Layer A (red sandstone + footprints): Formed in... Evidence:..." \n' +
      '• "Layer B (gray limestone + seashells): Formed in... Evidence:..." \n' +
      '• "Layer C (black shale + plant fossils): Formed in... Evidence:..."'
    )
    .setRequired(true);

  // Q3: Timeline construction (5 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 3: Construct a Timeline (5 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '5: Correct sequence (C oldest → A youngest) + explains environmental change over time\n' +
      '4: Correct sequence with partial explanation\n' +
      '3: Correct sequence only\n' +
      '1-2: Incorrect sequence or major gaps\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Put the layers in order from OLDEST to YOUNGEST and explain what the environmental CHANGE over time tells us about this location\'s geologic history.')
    .setHelpText(
      'Sentence starters:\n' +
      '• "From oldest to youngest, the order is..." \n' +
      '• "This tells us that over time, this area changed from... to... to..." \n' +
      '• "This environmental change could have been caused by..."'
    )
    .setRequired(true);

  // Q4: Evidence limitations (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 4: Identify Limitations (4 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '4: Identifies 2+ specific limitations + suggests how to address them\n' +
      '3: Identifies limitations with partial solutions\n' +
      '2: Lists limitations without solutions\n' +
      '1: Vague awareness of limitations\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('What evidence are you MISSING that would help you better understand this formation? What additional investigation would you need?')
    .setHelpText(
      'Sentence starters:\n' +
      '• "This investigation can\'t tell us... because..." \n' +
      '• "To get an exact age, I would need..." \n' +
      '• "Additional evidence I would want includes..."'
    )
    .setRequired(true);

  // Q5: Cross-cutting scenario (3 pts auto)
  const q5 = form.addMultipleChoiceItem()
    .setTitle('A magma intrusion cuts through all three layers. What does this tell you about the age of the intrusion?')
    .setRequired(true);

  q5.setChoices([
    q5.createChoice('The intrusion is YOUNGER than all three layers', true),
    q5.createChoice('The intrusion is OLDER than all three layers', false),
    q5.createChoice('The intrusion is the same age as Layer B', false),
    q5.createChoice('We cannot determine the intrusion\'s relative age', false)
  ]);
  q5.setPoints(3);
  q5.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Cross-cutting principle: Any feature that cuts through rock layers must be YOUNGER than all the layers it cuts.')
      .build()
  );
  q5.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Apply cross-cutting: The intrusion cuts through the layers, so it must have happened AFTER the layers formed (therefore younger).')
      .build()
  );

  logFormInfo_(form, 'G7 C7 W2 Station 3', 25);
  return form;
}

// ============================================================================
// EXIT TICKET - GEOLOGIC TIME INTEGRATION (23 points, ~15 min)
// 2 NEW + 2 SPIRAL + 1 INTEGRATION + 1 SEP
// ============================================================================

function createG7C7W2ExitTicket_() {
  const form = FormApp.create('G7.C7.W2: Exit Ticket - Geologic Time Integration');

  form.setDescription(
    'EXIT TICKET: SHOW WHAT YOU LEARNED\n\n' +
    'This tests whether you can use fossils and rock layers to understand Earth\'s history.\n\n' +
    '---\n' +
    'Time: About 15 minutes | Points: 23\n\n' +
    'QUESTION TYPES:\n' +
    '- 2 NEW questions (stratigraphy and fossil evidence)\n' +
    '- 2 SPIRAL questions (Week 1 rock types; Cycle 6 plate tectonics)\n' +
    '- 1 INTEGRATION question (connects fossils, rock cycle, and geologic time)\n' +
    '- 1 SEP-6 question (constructing explanations)'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'WEEK 2 COMPLETE! Congratulations!\n\n' +
    'You learned about geologic time and the fossil record.\n\n' +
    'Key takeaways:\n' +
    '• Rock layers record Earth\'s history (superposition)\n' +
    '• Fossils tell us what lived and when\n' +
    '• Index fossils help correlate layers across continents\n' +
    '• Mass extinctions mark major boundaries in geologic time\n\n' +
    'NEXT WEEK: Cycle Assessment - Show what you\'ve learned!'
  );

  // --- NEW CONTENT ---
  form.addPageBreakItem()
    .setTitle('NEW CONTENT (Questions 1 & 2)')
    .setHelpText('These test what you learned TODAY about geologic time.');

  // Q1: NEW - Stratigraphy principle (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 1: NEW - Stratigraphy (4 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '4: Correctly explains superposition + gives example + notes exceptions\n' +
      '3: Explains principle with example\n' +
      '2: Basic explanation only\n' +
      '1: Incomplete understanding\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Explain the Law of Superposition. Why is it useful for determining the age of rock layers, and when does it NOT work?')
    .setHelpText(
      'Sentence starters:\n' +
      '• "The Law of Superposition says that..." \n' +
      '• "This is useful because..." \n' +
      '• "However, it doesn\'t work when..."'
    )
    .setRequired(true);

  // Q2: NEW - Index fossils (4 pts auto)
  const q2 = form.addMultipleChoiceItem()
    .setTitle('What makes a fossil useful as an "index fossil" for dating rock layers?')
    .setRequired(true);

  q2.setChoices([
    q2.createChoice('It lived for a short time but was widespread geographically', true),
    q2.createChoice('It lived for a very long time in one small area', false),
    q2.createChoice('It is extremely rare and difficult to find', false),
    q2.createChoice('It is the largest fossil in the rock layer', false)
  ]);
  q2.setPoints(4);
  q2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Index fossils are widespread (found in many places) but existed for a short time, so finding them gives you a specific age range.')
      .build()
  );
  q2.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Good index fossils: (1) widespread geographically, (2) existed for a SHORT time, (3) easily identified. This combo lets you date layers precisely.')
      .build()
  );

  // --- SPIRAL CONTENT ---
  form.addPageBreakItem()
    .setTitle('SPIRAL CONTENT (Questions 3 & 4)')
    .setHelpText('These review concepts from Week 1 and Cycle 6.');

  // Q3: SPIRAL - Week 1 rock types (4 pts auto)
  const q3 = form.addMultipleChoiceItem()
    .setTitle('WEEK 1 REVIEW: Why are fossils almost NEVER found in igneous rock?')
    .setRequired(true);

  q3.setChoices([
    q3.createChoice('Igneous rock forms from hot magma/lava, which would destroy any organisms', true),
    q3.createChoice('Igneous rock is too hard for organisms to live in', false),
    q3.createChoice('Igneous rock only forms deep underground', false),
    q3.createChoice('Fossils can actually be found commonly in igneous rock', false)
  ]);
  q3.setPoints(4);
  q3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Igneous rock forms from extremely hot molten material. Any organism or fossil would be destroyed by those temperatures.')
      .build()
  );
  q3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Review Week 1: Igneous rock forms from magma/lava at temperatures that would vaporize any organic material.')
      .build()
  );

  // Q4: SPIRAL - Cycle 6 plate tectonics (4 pts auto)
  const q4 = form.addMultipleChoiceItem()
    .setTitle('CYCLE 6 REVIEW: Finding identical fossils on Africa and South America supports which idea?')
    .setRequired(true);

  q4.setChoices([
    q4.createChoice('Continental drift - the continents were once connected', true),
    q4.createChoice('Fossils can swim across oceans', false),
    q4.createChoice('The same species evolved independently on each continent', false),
    q4.createChoice('Wind carried the fossils across the Atlantic', false)
  ]);
  q4.setPoints(4);
  q4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Review Cycle 6: Finding the SAME land-based fossils on different continents is evidence that those continents were once joined.')
      .build()
  );
  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Identical fossils on now-separated continents (like Mesosaurus) helped prove continental drift - they were once part of the same landmass.')
      .build()
  );

  // --- INTEGRATION ---
  form.addPageBreakItem()
    .setTitle('INTEGRATION (Question 5)')
    .setHelpText('This requires knowledge from Week 1, Week 2, AND Cycle 6.');

  // Q5: Integration (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 5: INTEGRATION (4 points)')
    .setHelpText(
      '3D ASSESSMENT RUBRIC:\n' +
      '4: Connects ALL three concepts: rock cycle affects fossil preservation + plate tectonics moves rocks + time scale shows changes\n' +
      '3: Connects 2 of 3 concepts correctly\n' +
      '2: Makes 1 connection\n' +
      '1: Vague integration attempt\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('INTEGRATION: A mountain in the Himalayas has marine fossils in limestone layers that are now tilted nearly vertical. Using what you know about:\n- Rock types (Week 1)\n- Geologic time (Week 2)\n- Plate tectonics (Cycle 6)\n\nExplain the complete history of how marine fossils ended up in a tilted layer on a mountaintop.')
    .setHelpText(
      'Sentence starters:\n' +
      '• "First, the fossils formed when... (Week 1)" \n' +
      '• "Then, plate tectonics... (Cycle 6)" \n' +
      '• "We can date this using... (Week 2)"'
    )
    .setRequired(true);

  // --- SEP-6: CONSTRUCTING EXPLANATIONS ---
  form.addPageBreakItem()
    .setTitle('SEP-6: Construct an Explanation (Question 6)')
    .setHelpText(
      'NGSS Practice: Constructing Explanations\n' +
      'Good scientists explain phenomena using evidence and reasoning!'
    );

  form.addSectionHeaderItem()
    .setTitle('Question 6: Construct an Explanation (3 points)')
    .setHelpText(
      'RUBRIC - SEP-6: Constructing Explanations\n' +
      '3 pts: Uses Claim-Evidence-Reasoning with specific geologic evidence\n' +
      '2 pts: Has claim and evidence but weak reasoning\n' +
      '1 pt: Claim only or vague response\n' +
      '0 pts: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Return to our phenomenon: Earth is 4.5 billion years old, but humans appeared only in the last "second" of a 24-hour Earth history.\n\nConstruct a scientific explanation using the Claim-Evidence-Reasoning format:\n• CLAIM: How do scientists know what happened in the billions of years before humans?\n• EVIDENCE: What specific evidence from this week\'s learning supports your claim?\n• REASONING: Why does this evidence allow scientists to reconstruct Earth\'s history?')
    .setHelpText(
      'Sentence starters:\n' +
      '• "CLAIM: Scientists can reconstruct ancient Earth history by..." \n' +
      '• "EVIDENCE: Rock layers show... and fossils reveal..." \n' +
      '• "REASONING: This works because..."'
    )
    .setRequired(true);

  logFormInfo_(form, 'G7 C7 W2 Exit Ticket', 23);
  return form;
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function logFormInfo_(form, name, points) {
  const editUrl = form.getEditUrl();
  const pubUrl = form.getPublishedUrl();
  const embedUrl = pubUrl.replace('/viewform', '/viewform?embedded=true');

  Logger.log('----------------------------------------');
  Logger.log(name + ' (' + points + ' pts)');
  Logger.log('----------------------------------------');
  Logger.log('Edit:  ' + editUrl);
  Logger.log('Embed: ' + embedUrl);
  Logger.log('');
}

// Individual test functions
function testG7C7W2Hook() { createG7C7W2Hook_(); }
function testG7C7W2Station1() { createG7C7W2Station1_(); }
function testG7C7W2Station2() { createG7C7W2Station2_(); }
function testG7C7W2Station3() { createG7C7W2Station3_(); }
function testG7C7W2ExitTicket() { createG7C7W2ExitTicket_(); }
