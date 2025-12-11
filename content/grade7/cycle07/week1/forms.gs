/**
 * ============================================================================
 * GRADE 7 - CYCLE 7 WEEK 1: ROCK TYPES & THE ROCK CYCLE
 * 5 Forms | 100 Points Total | ~75 Minutes
 * ============================================================================
 *
 * NGSS ALIGNMENT:
 *   Primary: MS-ESS1-4 - Construct a scientific explanation based on evidence
 *            from rock strata for how the geologic time scale is used to organize
 *            Earth's history.
 *   Spiral:  MS-ESS2-2 - Geoscience processes (Cycle 6)
 *            MS-ESS2-5 - Weather and climate systems (Cycle 5)
 *
 * 3-DIMENSIONAL LEARNING:
 *   SEP-6: Constructing Explanations - Explain rock formation sequences
 *   SEP-4: Analyzing and Interpreting Data - Rock classification
 *   DCI ESS1.C: The History of Planet Earth
 *   DCI ESS2.A: Earth's Materials and Systems
 *   CCC-3: Scale, Proportion, and Quantity - Geologic time scales
 *   CCC-1: Patterns - Rock characteristics and formation patterns
 *
 * LEARNING TARGETS:
 *   1. Classify rocks as igneous, sedimentary, or metamorphic based on characteristics
 *   2. Explain how rocks transform from one type to another
 *   3. Connect the rock cycle to plate tectonic processes
 *   4. Construct explanations for rock formation sequences
 *
 * FORMS:
 *   1. Hook - The Mountaintop Seashell Mystery (12 pts, ~10 min)
 *   2. Station 1 - Rock Classification Lab (20 pts, ~18 min)
 *   3. Station 2 - Rock Cycle Modeling (20 pts, ~15 min)
 *   4. Station 3 - Design a Rock Formation Timeline (25 pts, ~20 min)
 *   5. Exit Ticket - Rock Cycle Integration (23 pts, ~15 min)
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
 *   3. Run: createAllG7C7W1Forms()
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

function createAllG7C7W1Forms() {
  Logger.log('================================================');
  Logger.log('G7 CYCLE 7 WEEK 1: ROCK TYPES & THE ROCK CYCLE');
  Logger.log('================================================\n');

  const forms = {
    hook: createG7C7W1Hook_(),
    station1: createG7C7W1Station1_(),
    station2: createG7C7W1Station2_(),
    station3: createG7C7W1Station3_(),
    exitTicket: createG7C7W1ExitTicket_()
  };

  Logger.log('\n================================================');
  Logger.log('ALL 5 FORMS CREATED - 100 POINTS TOTAL');
  Logger.log('================================================');

  return forms;
}

// ============================================================================
// HOOK - THE MOUNTAINTOP SEASHELL MYSTERY (12 points, ~10 min)
// Connects Cycle 6 plate tectonics to new rock cycle phenomenon
// ============================================================================

function createG7C7W1Hook_() {
  const form = FormApp.create('G7.C7.W1: Hook - The Mountaintop Seashell Mystery');

  form.setDescription(
    'THE MOUNTAINTOP SEASHELL MYSTERY\n\n' +
    'Scientists exploring near the summit of Mount Everest made an incredible discovery:\n' +
    '- Fossils of marine organisms (trilobites, brachiopods, crinoids) at 29,000 feet elevation\n' +
    '- These creatures lived in an ancient ocean over 450 million years ago\n' +
    '- The fossils are embedded in limestone - a sedimentary rock\n\n' +
    'How did ocean creatures end up on top of the world\'s tallest mountain?\n\n' +
    '---\n' +
    'Time: About 10 minutes | Points: 12\n' +
    'Use what you learned in Cycle 6 about plate tectonics!'
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
    'Next: Learn to classify rocks and understand how they transform!\n' +
    'You\'ll discover the rock cycle that recycles Earth\'s materials.'
  );

  // --- PART 1: CYCLE 6 RETRIEVAL (PLATE TECTONICS CONNECTION) ---
  form.addPageBreakItem()
    .setTitle('Part 1: What You Already Know from Cycle 6')
    .setHelpText('These questions check what you remember about plate tectonics.');

  // Q1: Plate tectonics connection (3 pts auto)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('In Cycle 6, we learned about plate boundaries. What happens when two continental plates collide?')
    .setHelpText('Think back to convergent boundaries and mountain formation.')
    .setRequired(true);

  q1.setChoices([
    q1.createChoice('Mountains form as the crust is pushed upward', true),
    q1.createChoice('The plates slide past each other horizontally', false),
    q1.createChoice('New oceanic crust forms between them', false),
    q1.createChoice('One plate sinks under the other into the mantle', false)
  ]);
  q1.setPoints(3);
  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! When continental plates collide, neither subducts - instead, the crust crumples and pushes upward, forming mountain ranges like the Himalayas.')
      .build()
  );
  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Review Cycle 6: Continental-continental convergence creates mountains because neither plate can subduct. The crust is pushed upward.')
      .build()
  );

  // --- MTSS FLAG: Check for Cycle 6 misconception ---
  const mtss1 = form.addMultipleChoiceItem()
    .setTitle('QUICK CHECK (Cycle 6 Review): Where do sedimentary rocks typically form?')
    .setHelpText('This checks understanding from Cycle 6. Your answer does NOT affect your grade.')
    .setRequired(true);

  mtss1.setChoices([
    mtss1.createChoice('Deep in Earth\'s mantle where it\'s very hot', false),
    mtss1.createChoice('In areas where sediments accumulate: ocean floors, river deltas, lake beds', true),
    mtss1.createChoice('Only inside volcanoes during eruptions', false),
    mtss1.createChoice('Rocks don\'t actually form - they\'ve always existed', false) // FLAG: Major misconception
  ]);
  // Diagnostic only - omit setPoints() for ungraded items

  // --- PART 2: PHENOMENON ---
  form.addPageBreakItem()
    .setTitle('Part 2: The Phenomenon')
    .setHelpText('Observe the evidence and form your initial explanation.');

  // Q2: Observation (3 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 2 (3 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '3: Identifies all key evidence: marine fossils + high elevation + embedded in rock\n' +
      '2: Identifies 2 of 3 elements\n' +
      '1: Basic description only\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('What THREE pieces of evidence make this discovery surprising? List what scientists found and why each is unexpected.')
    .setHelpText(
      'Sentence starters:\n' +
      '• "The first surprising piece of evidence is..." \n' +
      '• "It\'s unexpected because..." \n' +
      '• "This suggests that..."'
    )
    .setRequired(true);

  // Q3: Initial hypothesis (3 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 3 (3 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '3: Connects plate tectonics (collision/uplift) to moving rock from ocean to mountain\n' +
      '2: Mentions plate movement but mechanism incomplete\n' +
      '1: Guess without scientific reasoning\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Based on what you learned in Cycle 6 about plate tectonics, how might ocean creatures have ended up on a mountaintop? What process could move them from the ocean floor to 29,000 feet?')
    .setHelpText(
      'Sentence starters:\n' +
      '• "I think the fossils got there because..." \n' +
      '• "Using what I know about plate tectonics..." \n' +
      '• "The rock containing the fossils was probably..."'
    )
    .setRequired(true);

  // Q4: Rock type identification (3 pts auto)
  const q4 = form.addMultipleChoiceItem()
    .setTitle('The fossils are found in LIMESTONE, which is made of compressed shells and marine sediments. What type of rock is limestone?')
    .setRequired(true);

  q4.setChoices([
    q4.createChoice('Igneous - formed from cooled magma or lava', false),
    q4.createChoice('Sedimentary - formed from compressed sediments over time', true),
    q4.createChoice('Metamorphic - formed from existing rocks changed by heat/pressure', false),
    q4.createChoice('Volcanic - formed during volcanic eruptions', false)
  ]);
  q4.setPoints(3);
  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Limestone is sedimentary rock formed when shells and marine sediments are compressed over millions of years. This tells us the rock formed in an ocean environment!')
      .build()
  );
  q4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Think about how limestone forms: shells and sediments slowly accumulating and being compressed. This is the process that creates SEDIMENTARY rock.')
      .build()
  );

  // Q5: Confidence (0 pts - diagnostic only)
  form.addScaleItem()
    .setTitle('Self-Assessment: How confident are you that you can explain how fossils end up in mountains?')
    .setHelpText('FOR REFLECTION ONLY - This does NOT affect your grade. Be honest!')
    .setBounds(1, 5)
    .setLabels('Still learning', 'Got it!')
    .setRequired(true);

  logFormInfo_(form, 'G7 C7 W1 Hook', 12);
  return form;
}

// ============================================================================
// STATION 1 - ROCK CLASSIFICATION LAB (20 points, ~18 min)
// Classify rocks and identify formation processes
// ============================================================================

function createG7C7W1Station1_() {
  const form = FormApp.create('G7.C7.W1: Station 1 - Rock Classification Lab');

  form.setDescription(
    'YOUR MISSION: CLASSIFY ROCKS BY TYPE\n\n' +
    'Earth has THREE main rock types:\n' +
    '• IGNEOUS - Formed from cooled magma/lava\n' +
    '• SEDIMENTARY - Formed from compressed sediments\n' +
    '• METAMORPHIC - Formed when existing rocks change due to heat/pressure\n\n' +
    'Each type has distinct characteristics you can observe!\n\n' +
    '---\n' +
    'Time: About 18 minutes | Points: 20\n' +
    'Use the Rock Cycle Explorer simulation to help classify samples.'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Station 1 complete!\n\n' +
    'KEY INSIGHT: Rock type tells us WHERE and HOW the rock formed.\n' +
    '• Igneous = volcanic/magma activity\n' +
    '• Sedimentary = water/accumulation areas\n' +
    '• Metamorphic = deep burial or mountain building\n\n' +
    'Continue to Station 2: Rock Cycle Modeling'
  );

  // --- DATA REFERENCE ---
  form.addPageBreakItem()
    .setTitle('Reference: Rock Classification Guide')
    .setHelpText(
      'ROCK TYPE CHARACTERISTICS:\n\n' +
      '┌─────────────┬────────────────────────┬─────────────────────────┐\n' +
      '│ Type        │ How It Forms           │ Key Features            │\n' +
      '├─────────────┼────────────────────────┼─────────────────────────┤\n' +
      '│ IGNEOUS     │ Magma/lava cools       │ Crystals, no layers     │\n' +
      '│             │ Slow = large crystals  │ Glassy or grainy        │\n' +
      '│             │ Fast = small crystals  │ Ex: Granite, Basalt     │\n' +
      '├─────────────┼────────────────────────┼─────────────────────────┤\n' +
      '│ SEDIMENTARY │ Sediments compressed   │ Visible layers          │\n' +
      '│             │ Over millions of years │ May contain fossils     │\n' +
      '│             │ In water environments  │ Ex: Sandstone, Limestone│\n' +
      '├─────────────┼────────────────────────┼─────────────────────────┤\n' +
      '│ METAMORPHIC │ Heat + pressure        │ Wavy/banded patterns    │\n' +
      '│             │ Changes existing rock  │ Foliated (layered)      │\n' +
      '│             │ Without melting        │ Ex: Marble, Slate       │\n' +
      '└─────────────┴────────────────────────┴─────────────────────────┘'
    );

  // Q1: Rock identification (4 pts auto)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('Sample A has visible crystals, no layers, and a grainy texture. It looks like it could be granite. What type of rock is this?')
    .setRequired(true);

  q1.setChoices([
    q1.createChoice('Igneous - the crystals formed as magma cooled slowly', true),
    q1.createChoice('Sedimentary - the crystals are compressed sand particles', false),
    q1.createChoice('Metamorphic - the crystals formed under pressure', false),
    q1.createChoice('Cannot be determined without more information', false)
  ]);
  q1.setPoints(4);
  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Visible crystals without layers indicate igneous rock. Large crystals mean the magma cooled SLOWLY underground (intrusive igneous).')
      .build()
  );
  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Crystals form when magma cools. Large, visible crystals = slow cooling. No layers = not sedimentary. This is igneous rock!')
      .build()
  );

  // Q2: Fossil clue (4 pts auto)
  const q2 = form.addMultipleChoiceItem()
    .setTitle('Sample B contains visible fossil shells and has horizontal layers. What type of rock is this?')
    .setRequired(true);

  q2.setChoices([
    q2.createChoice('Igneous - some igneous rocks contain fossils', false),
    q2.createChoice('Sedimentary - fossils and layers indicate compressed sediments', true),
    q2.createChoice('Metamorphic - the fossils were compressed by heat', false),
    q2.createChoice('All rock types can contain fossils equally', false)
  ]);
  q2.setPoints(4);
  q2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Fossils are almost exclusively found in SEDIMENTARY rock. The organisms were buried in sediment that later compressed into rock.')
      .build()
  );
  q2.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Fossils only form when organisms are buried in sediment. Igneous rock (from magma) would destroy any organisms. Fossils = sedimentary.')
      .build()
  );

  // Q3: Misconception check - fossils (5 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 3: Misconception Check (5 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '5: Correctly explains fossils are NOT only bones + gives 2+ examples of other fossil types\n' +
      '4: Correct concept with 1 example\n' +
      '3: Partially correct understanding\n' +
      '2: Major misconception present\n' +
      '1: Vague response\n' +
      '0: No response\n\n' +
      'MISCONCEPTION TARGET: "Fossils are only bones or shells"'
    );

  form.addParagraphTextItem()
    .setTitle('COMMON MISCONCEPTION: Many people think fossils are ONLY bones or shells. Explain why this is incorrect and give at least TWO examples of other types of fossils.')
    .setHelpText(
      'Sentence starters:\n' +
      '• "This misconception is incorrect because..." \n' +
      '• "Fossils can also be..." \n' +
      '• "Examples include... and..."'
    )
    .setRequired(true);

  // Q4: Connection to environment (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 4: Rock-Environment Connection (4 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '4: Correctly identifies marine/ocean environment + explains how sedimentary rock forms there\n' +
      '3: Correct environment, partial explanation\n' +
      '2: General understanding without specifics\n' +
      '1: Incorrect environment\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('SPIRAL - Cycle 6 Connection: If you find limestone full of marine fossils on a mountaintop, what does this tell you about the ORIGINAL environment where the rock formed?')
    .setHelpText(
      'Sentence starters:\n' +
      '• "The rock originally formed in..." \n' +
      '• "I know this because..." \n' +
      '• "This connects to plate tectonics because..."'
    )
    .setRequired(true);

  // Q5: Crystal size (3 pts auto)
  const q5 = form.addMultipleChoiceItem()
    .setTitle('Basalt (volcanic rock) has very tiny crystals, while granite has large visible crystals. Both are igneous. What explains this difference?')
    .setRequired(true);

  q5.setChoices([
    q5.createChoice('Basalt cooled quickly (at surface), granite cooled slowly (underground)', true),
    q5.createChoice('Basalt is older than granite', false),
    q5.createChoice('Granite was under more pressure', false),
    q5.createChoice('They are made of different minerals', false)
  ]);
  q5.setPoints(3);
  q5.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Cooling rate determines crystal size. Fast cooling (like lava at surface) = tiny crystals. Slow cooling (magma underground) = large crystals.')
      .build()
  );
  q5.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Crystal size depends on cooling rate, not age or pressure. Slow cooling gives crystals time to grow large.')
      .build()
  );

  // Q6: Self-assessment (0 pts - reflection)
  form.addScaleItem()
    .setTitle('Self-Assessment: How confident are you in classifying rocks by their characteristics?')
    .setHelpText('FOR REFLECTION ONLY - This does NOT affect your grade.')
    .setBounds(1, 5)
    .setLabels('Need more practice', 'Confident')
    .setRequired(true);

  logFormInfo_(form, 'G7 C7 W1 Station 1', 20);
  return form;
}

// ============================================================================
// STATION 2 - ROCK CYCLE MODELING (20 points, ~15 min)
// Model transformations between rock types
// ============================================================================

function createG7C7W1Station2_() {
  const form = FormApp.create('G7.C7.W1: Station 2 - Rock Cycle Modeling');

  form.setDescription(
    'YOUR MISSION: TRACE ROCK TRANSFORMATIONS\n\n' +
    'Rocks don\'t stay the same forever - they CYCLE through different forms!\n' +
    'The ROCK CYCLE shows how rocks transform from one type to another.\n\n' +
    'Use the Rock Cycle Explorer simulation to trace different pathways.\n\n' +
    '---\n' +
    'Time: About 15 minutes | Points: 20\n' +
    'Follow the pathways in the simulation!'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Station 2 complete!\n\n' +
    'KEY INSIGHT: The rock cycle has NO beginning or end!\n' +
    'Any rock can become any other type given enough time.\n' +
    'Plate tectonics and the water cycle DRIVE the rock cycle.\n\n' +
    'Continue to Station 3: Design a Rock Formation Timeline'
  );

  // --- DATA REFERENCE ---
  form.addPageBreakItem()
    .setTitle('Reference: Rock Cycle Pathways')
    .setHelpText(
      'ROCK CYCLE TRANSFORMATIONS:\n\n' +
      'IGNEOUS → SEDIMENTARY\n' +
      '  Process: Weathering → Erosion → Deposition → Compaction\n' +
      '  Time: ~50 million years\n\n' +
      'SEDIMENTARY → METAMORPHIC\n' +
      '  Process: Burial + Heat + Pressure (without melting)\n' +
      '  Time: ~200 million years\n\n' +
      'METAMORPHIC → IGNEOUS\n' +
      '  Process: Melting → Cooling\n' +
      '  Time: ~50 million years (via magma)\n\n' +
      'ANY ROCK → MAGMA\n' +
      '  Process: Extreme heat (subduction zones)\n' +
      '  All atoms rearrange when rock melts!\n\n' +
      'ENERGY SOURCES:\n' +
      '• Sun: Drives weathering and water cycle\n' +
      '• Earth\'s interior: Drives heat, pressure, melting'
    );

  // Q1: Pathway identification (4 pts auto)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('Granite (igneous) is exposed at Earth\'s surface. Over millions of years, wind and rain break it down. The pieces wash into a river and eventually settle at the bottom of a lake. What rock type will form?')
    .setRequired(true);

  q1.setChoices([
    q1.createChoice('Sedimentary - the granite pieces will be compressed into new rock', true),
    q1.createChoice('A new type of igneous rock', false),
    q1.createChoice('Metamorphic - pressure from the water will change it', false),
    q1.createChoice('It will remain as granite pieces forever', false)
  ]);
  q1.setPoints(4);
  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Weathered rock pieces become sediments. When compacted and cemented together, they form SEDIMENTARY rock (like sandstone or conglomerate).')
      .build()
  );
  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('When rock breaks down, the pieces become sediments. Sediments that accumulate and compress become SEDIMENTARY rock.')
      .build()
  );

  // Q2: Metamorphic formation (4 pts auto)
  const q2 = form.addMultipleChoiceItem()
    .setTitle('Limestone (sedimentary) is buried deep underground near a magma chamber. What will likely happen?')
    .setRequired(true);

  q2.setChoices([
    q2.createChoice('Nothing - limestone is stable at all conditions', false),
    q2.createChoice('It will become marble (metamorphic) due to heat and pressure', true),
    q2.createChoice('It will immediately melt and become igneous', false),
    q2.createChoice('It will turn back into sediments', false)
  ]);
  q2.setPoints(4);
  q2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Limestone + heat/pressure (without melting) = MARBLE. This is metamorphism - the rock changes form while staying solid.')
      .build()
  );
  q2.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Near magma chambers, rocks experience heat and pressure. If they don\'t melt completely, they become METAMORPHIC. Limestone → Marble!')
      .build()
  );

  // Q3: Misconception check - rock permanence (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 3: Misconception Check (4 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '4: Correctly refutes misconception + explains continuous cycling + gives example pathway\n' +
      '3: Correct refutation with partial explanation\n' +
      '2: General understanding without detail\n' +
      '1: Misconception still present\n' +
      '0: No response\n\n' +
      'MISCONCEPTION TARGET: "Rocks don\'t change once formed"'
    );

  form.addParagraphTextItem()
    .setTitle('COMMON MISCONCEPTION: Some people think rocks stay the same forever once they form. Explain why this is incorrect using the rock cycle.')
    .setHelpText(
      'Sentence starters:\n' +
      '• "This is incorrect because rocks can..." \n' +
      '• "For example, granite can become... by..." \n' +
      '• "The rock cycle shows that..."'
    )
    .setRequired(true);

  // Q4: Energy sources (4 pts auto)
  const q4 = form.addMultipleChoiceItem()
    .setTitle('What provides the ENERGY to drive the rock cycle? (Select the BEST answer)')
    .setRequired(true);

  q4.setChoices([
    q4.createChoice('Only the Sun', false),
    q4.createChoice('Only Earth\'s internal heat', false),
    q4.createChoice('Both the Sun (weathering) AND Earth\'s internal heat (melting, metamorphism)', true),
    q4.createChoice('The rock cycle doesn\'t require energy', false)
  ]);
  q4.setPoints(4);
  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! The Sun drives weathering and erosion through the water cycle. Earth\'s internal heat drives melting, metamorphism, and volcanism.')
      .build()
  );
  q4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('The rock cycle needs BOTH energy sources: Sun for surface processes (weathering) AND Earth\'s heat for deep processes (melting, metamorphism).')
      .build()
  );

  // Q5: Spiral - Plate tectonics connection (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 5: SPIRAL - Cycle 6 Connection (4 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '4: Explains specific connection (subduction/volcanism/mountain building) + how it drives rock cycle\n' +
      '3: Mentions plate tectonics with partial explanation\n' +
      '2: General connection without mechanism\n' +
      '1: Vague reference\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('CYCLE 6 CONNECTION: Explain how plate tectonics DRIVES the rock cycle. Give at least ONE specific example of how plate movement causes rocks to transform.')
    .setHelpText(
      'Sentence starters:\n' +
      '• "Plate tectonics drives the rock cycle by..." \n' +
      '• "For example, at subduction zones..." \n' +
      '• "When plates collide, rocks can..."'
    )
    .setRequired(true);

  logFormInfo_(form, 'G7 C7 W1 Station 2', 20);
  return form;
}

// ============================================================================
// STATION 3 - DESIGN A ROCK FORMATION TIMELINE (25 points, ~20 min)
// Apply cycle understanding to construct explanations - SEP-6
// ============================================================================

function createG7C7W1Station3_() {
  const form = FormApp.create('G7.C7.W1: Station 3 - Design a Rock Formation Timeline');

  form.setDescription(
    'ENGINEERING CHALLENGE: CONSTRUCT A ROCK\'S JOURNEY\n\n' +
    'Your task: Create a scientific timeline explaining how a rock got where it is today.\n\n' +
    'THE SCENARIO:\n' +
    'You find a sample of MARBLE on a mountainside.\n' +
    'The marble contains fossils of ancient sea creatures.\n' +
    'Your job: Construct a timeline showing this rock\'s complete journey.\n\n' +
    '---\n' +
    'Time: About 20 minutes | Points: 25 (highest value!)\n\n' +
    'CONSTRAINTS:\n' +
    '• Timeline must include ALL rock types this material passed through\n' +
    '• Must explain the transformation process at each step\n' +
    '• Must include approximate time scales\n' +
    '• Must explain how it ended up on a mountain'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Station 3 complete!\n\n' +
    'You\'ve traced a rock\'s journey through millions of years!\n' +
    'Real geologists do this work to understand Earth\'s history.\n\n' +
    'Continue to Exit Ticket'
  );

  // --- REFERENCE DATA ---
  form.addPageBreakItem()
    .setTitle('Reference: Key Information')
    .setHelpText(
      'IMPORTANT CLUES:\n' +
      '• Marble is METAMORPHIC rock\n' +
      '• Marble forms from LIMESTONE (sedimentary)\n' +
      '• Limestone forms from marine shells/sediments\n' +
      '• Fossils can only survive in sedimentary rock\n' +
      '• Metamorphism doesn\'t destroy all fossils if mild\n\n' +
      'TYPICAL TIME SCALES:\n' +
      '• Sediment accumulation: 1-10 million years\n' +
      '• Compression into rock: 10-50 million years\n' +
      '• Metamorphism: 50-200 million years\n' +
      '• Mountain building: 50-100 million years\n' +
      '• Erosion/exposure: 10-50 million years\n\n' +
      'PLATE TECTONIC PROCESSES:\n' +
      '• Collision → mountains + metamorphism\n' +
      '• Subduction → melting → volcanism\n' +
      '• Uplift → exposure at surface'
    );

  // Q1: Timeline construction (7 pts manual) - highest value question
  form.addSectionHeaderItem()
    .setTitle('Question 1: Construct the Timeline (7 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '7: Complete timeline: organism → sediment → limestone → marble → mountain\n' +
      '   + correct sequence + all transformations explained + time estimates\n' +
      '5-6: Most steps present with explanations\n' +
      '3-4: Correct sequence but missing explanations\n' +
      '1-2: Partial timeline, major gaps\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Create a timeline showing how the marble with fossils formed and reached the mountainside.\n\nYour timeline should include:\n• The original environment and organism\n• Formation of the first rock type\n• Transformation to the final rock type\n• How it reached the mountain')
    .setHelpText(
      'Timeline structure:\n' +
      '• Step 1: "_____ million years ago: Organisms lived in... The environment was..."\n' +
      '• Step 2: "After the organisms died, their shells..."\n' +
      '• Step 3: "Over _____ million years, the sediments became..."\n' +
      '• Step 4: "Then, due to... the rock changed to..."\n' +
      '• Step 5: "Finally, the marble reached the surface when..."'
    )
    .setRequired(true);

  // Q2: Process justification (6 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 2: Justify Each Transformation (6 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '6: Correctly explains: compaction → metamorphism → uplift with scientific reasoning\n' +
      '4-5: Explains most processes correctly\n' +
      '2-3: Partial explanations\n' +
      '1: Vague or incorrect\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('For EACH rock transformation in your timeline, explain:\n• What PROCESS caused the change?\n• What CONDITIONS were required?\n• How long did it take?')
    .setHelpText(
      'Sentence starters:\n' +
      '• "The sediment became limestone through the process of... which requires..." \n' +
      '• "The limestone became marble when... because..." \n' +
      '• "The marble reached the surface because..."'
    )
    .setRequired(true);

  // Q3: Evidence explanation (5 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 3: Explain the Evidence (5 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '5: Correctly explains why fossils survived metamorphism + why they prove marine origin\n' +
      '4: Correct explanation of one aspect\n' +
      '2-3: Partial understanding\n' +
      '1: Misconception present\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('How is it possible that marble (a metamorphic rock) still contains recognizable fossils? What does this tell us about the CONDITIONS during metamorphism?')
    .setHelpText(
      'Sentence starters:\n' +
      '• "Fossils can survive metamorphism if..." \n' +
      '• "The presence of fossils tells us the heat and pressure were..." \n' +
      '• "If metamorphism had been more intense..."'
    )
    .setRequired(true);

  // Q4: Alternative pathway (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 4: Alternative Pathway (4 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '4: Describes valid alternative pathway through the rock cycle\n' +
      '3: Mostly correct alternative\n' +
      '2: Possible but unlikely pathway\n' +
      '1: Impossible pathway\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Could the rock have taken a DIFFERENT path through the rock cycle and still ended up as marble on a mountain? Describe one alternative pathway.')
    .setHelpText(
      'Sentence starters:\n' +
      '• "An alternative pathway could be..." \n' +
      '• "Instead of forming directly from limestone, the rock could have..." \n' +
      '• "This pathway would require..."'
    )
    .setRequired(true);

  // Q5: Time scale (3 pts auto)
  const q5 = form.addMultipleChoiceItem()
    .setTitle('Approximately how long would the COMPLETE journey from living organism to marble on a mountaintop take?')
    .setRequired(true);

  q5.setChoices([
    q5.createChoice('About 1,000 years', false),
    q5.createChoice('About 1 million years', false),
    q5.createChoice('About 100-500 million years', true),
    q5.createChoice('About 10 billion years', false)
  ]);
  q5.setPoints(3);
  q5.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! The complete journey - organism → sediment → limestone → marble → mountain exposure - takes hundreds of millions of years.')
      .build()
  );
  q5.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Add up the time scales: sediment formation (10M) + rock formation (50M) + metamorphism (200M) + mountain building (100M) = hundreds of millions of years!')
      .build()
  );

  logFormInfo_(form, 'G7 C7 W1 Station 3', 25);
  return form;
}

// ============================================================================
// EXIT TICKET - ROCK CYCLE INTEGRATION (23 points, ~15 min)
// 2 NEW + 2 SPIRAL + 1 INTEGRATION + 1 SEP
// ============================================================================

function createG7C7W1ExitTicket_() {
  const form = FormApp.create('G7.C7.W1: Exit Ticket - Rock Cycle Integration');

  form.setDescription(
    'EXIT TICKET: SHOW WHAT YOU LEARNED\n\n' +
    'This tests whether you can explain rock types, the rock cycle, and Earth\'s history.\n\n' +
    '---\n' +
    'Time: About 15 minutes | Points: 23\n\n' +
    'QUESTION TYPES:\n' +
    '- 2 NEW questions (rock types and rock cycle)\n' +
    '- 2 SPIRAL questions (Cycle 6 review - plate tectonics)\n' +
    '- 1 INTEGRATION question (connects rock cycle to plate tectonics)\n' +
    '- 1 SEP-6 question (constructing explanations)'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'WEEK 1 COMPLETE! Congratulations!\n\n' +
    'You learned about rock types and the rock cycle.\n\n' +
    'Key takeaways:\n' +
    '• Three rock types: igneous, sedimentary, metamorphic\n' +
    '• Rocks continuously cycle through all three forms\n' +
    '• Rock type tells us WHERE and HOW the rock formed\n' +
    '• Plate tectonics drives the rock cycle\n\n' +
    'NEXT WEEK: Geologic time and fossil evidence!'
  );

  // --- NEW CONTENT ---
  form.addPageBreakItem()
    .setTitle('NEW CONTENT (Questions 1 & 2)')
    .setHelpText('These test what you learned TODAY about rocks.');

  // Q1: NEW - Rock classification (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 1: NEW - Rock Classification (4 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '4: Correctly identifies all 3 rock types + formation process for each\n' +
      '3: All 3 types correct, some processes missing\n' +
      '2: 2 types correct\n' +
      '1: 1 type correct\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Name the THREE types of rocks and explain how EACH type forms.')
    .setHelpText(
      'Format your answer:\n' +
      '• "Type 1: _____ forms when..." \n' +
      '• "Type 2: _____ forms when..." \n' +
      '• "Type 3: _____ forms when..."'
    )
    .setRequired(true);

  // Q2: NEW - Rock cycle understanding (4 pts auto)
  const q2 = form.addMultipleChoiceItem()
    .setTitle('Which statement about the rock cycle is CORRECT?')
    .setRequired(true);

  q2.setChoices([
    q2.createChoice('Rocks can only transform in one direction: igneous → sedimentary → metamorphic', false),
    q2.createChoice('Once a rock forms, it stays that type forever', false),
    q2.createChoice('Any rock type can eventually become any other rock type given enough time and the right conditions', true),
    q2.createChoice('Only sedimentary rocks can become other types', false)
  ]);
  q2.setPoints(4);
  q2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! The rock cycle has no beginning or end. Any rock can transform into any other type - even back to magma and start over.')
      .build()
  );
  q2.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('The rock cycle is not one-way! Rocks continuously transform. Igneous can become sedimentary OR metamorphic. Metamorphic can become igneous OR sedimentary. It\'s a CYCLE.')
      .build()
  );

  // --- SPIRAL CONTENT ---
  form.addPageBreakItem()
    .setTitle('SPIRAL CONTENT (Questions 3 & 4)')
    .setHelpText('These review concepts from Cycle 6.');

  // Q3: SPIRAL - Plate boundaries (4 pts auto)
  const q3 = form.addMultipleChoiceItem()
    .setTitle('CYCLE 6 REVIEW: At which plate boundary type would you expect to find volcanoes and NEW igneous rock forming?')
    .setRequired(true);

  q3.setChoices([
    q3.createChoice('Transform boundary (plates sliding past each other)', false),
    q3.createChoice('Divergent boundary (plates moving apart) and convergent subduction zones', true),
    q3.createChoice('Only at the center of continents', false),
    q3.createChoice('Volcanoes form randomly with no connection to plate boundaries', false)
  ]);
  q3.setPoints(4);
  q3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Volcanoes form at divergent boundaries (magma rises to fill gap) and subduction zones (melted plate material rises).')
      .build()
  );
  q3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Review Cycle 6: Volcanoes form where magma can reach the surface - at divergent boundaries and above subduction zones.')
      .build()
  );

  // Q4: SPIRAL - Earth layers (4 pts auto)
  const q4 = form.addMultipleChoiceItem()
    .setTitle('CYCLE 6 REVIEW: Where does magma that forms igneous rocks come from?')
    .setRequired(true);

  q4.setChoices([
    q4.createChoice('The atmosphere', false),
    q4.createChoice('The inner core', false),
    q4.createChoice('The upper mantle and lower crust where rock melts', true),
    q4.createChoice('The ocean floor', false)
  ]);
  q4.setPoints(4);
  q4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Review Cycle 6: Magma forms in the upper mantle where temperatures are high enough to melt rock. It rises toward the surface.')
      .build()
  );
  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Magma forms in the upper mantle and lower crust where heat is intense enough to melt rock.')
      .build()
  );

  // --- INTEGRATION ---
  form.addPageBreakItem()
    .setTitle('INTEGRATION (Question 5)')
    .setHelpText('This requires knowledge from BOTH Cycle 6 AND Cycle 7.');

  // Q5: Integration (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 5: INTEGRATION (4 points)')
    .setHelpText(
      '3D ASSESSMENT RUBRIC:\n' +
      '4: Explains complete connection: subduction → melting → volcanism → new igneous\n' +
      '   OR collision → heat/pressure → metamorphism\n' +
      '   Uses correct terminology from both cycles\n' +
      '3: Correct connection with partial explanation\n' +
      '2: General connection without mechanism\n' +
      '1: Vague reference\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('INTEGRATION: Explain how PLATE TECTONICS (Cycle 6) drives the ROCK CYCLE (Cycle 7). Give a specific example of a plate boundary process that creates new rock.')
    .setHelpText(
      'Sentence starters:\n' +
      '• "Plate tectonics drives the rock cycle because..." \n' +
      '• "At [type] plate boundaries, ..." \n' +
      '• "This creates new [rock type] rock because..."'
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
      '3 pts: Uses Claim-Evidence-Reasoning with rock cycle knowledge + specific example\n' +
      '2 pts: Has claim and evidence but weak reasoning\n' +
      '1 pt: Claim only or vague response\n' +
      '0 pts: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Return to our phenomenon: Fossils of marine creatures found on top of Mount Everest.\n\nConstruct a scientific explanation using the Claim-Evidence-Reasoning format:\n• CLAIM: How did marine fossils end up on a mountain?\n• EVIDENCE: What rock type and formation evidence supports this?\n• REASONING: What processes made this possible?')
    .setHelpText(
      'Sentence starters:\n' +
      '• "CLAIM: The fossils reached the mountain because..." \n' +
      '• "EVIDENCE: The rock is... which forms in..." \n' +
      '• "REASONING: This shows that... because..."'
    )
    .setRequired(true);

  logFormInfo_(form, 'G7 C7 W1 Exit Ticket', 23);
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
function testG7C7W1Hook() { createG7C7W1Hook_(); }
function testG7C7W1Station1() { createG7C7W1Station1_(); }
function testG7C7W1Station2() { createG7C7W1Station2_(); }
function testG7C7W1Station3() { createG7C7W1Station3_(); }
function testG7C7W1ExitTicket() { createG7C7W1ExitTicket_(); }
