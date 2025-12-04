/**
 * ============================================================================
 * GRADE 8 - CYCLE 3 WEEK 2: EVIDENCE OF EVOLUTION
 * 5 Forms | 100 Points Total | ~75 Minutes
 * ============================================================================
 *
 * NGSS ALIGNMENT:
 *   Primary: MS-LS4-4 - Construct an explanation based on evidence that
 *            describes how genetic variations of traits in a population
 *            increase some individuals' probability of surviving
 *   Secondary: MS-LS4-2 - Apply scientific ideas to construct an explanation
 *              for the anatomical similarities among modern organisms
 *   Spiral: MS-LS4-4 from Week 1 (natural selection mechanism)
 *           MS-PS2-1/2 from Cycle 2 (forces - optional connection)
 *
 * 3-DIMENSIONAL LEARNING:
 *   SEP-6: Constructing Explanations - Use evidence to explain common ancestry
 *   DCI LS4.A: Evidence of Common Ancestry - Anatomical and fossil evidence
 *   CCC Patterns: Identify patterns in anatomy that suggest relationships
 *
 * LEARNING TARGETS:
 *   1. Distinguish between homologous and analogous structures
 *   2. Use anatomical evidence to infer evolutionary relationships
 *   3. Interpret fossil evidence including transitional forms
 *   4. Predict features of transitional organisms based on evidence
 *
 * SPIRAL FROM WEEK 1:
 *   - Natural selection mechanism (Station 1 Q5)
 *   - Populations evolve, not individuals (Exit Q4 - Lamarckian check)
 *   - Variation is pre-existing (Exit Q2)
 *
 * FORMS:
 *   1. Hook - The Whale Finger Mystery (12 pts, ~10 min)
 *   2. Station 1 - Comparative Anatomy Analysis (20 pts, ~18 min)
 *   3. Station 2 - Fossil Record Investigation (20 pts, ~15 min)
 *   4. Station 3 - Design a Transitional Form (25 pts, ~20 min)
 *   5. Exit Ticket - Evidence Integration (23 pts, ~15 min)
 *
 * ============================================================================
 */

// ============================================================================
// MAIN FUNCTION
// ============================================================================

function createAllG8C3W2Forms() {
  Logger.log('================================================');
  Logger.log('G8 CYCLE 3 WEEK 2: EVIDENCE OF EVOLUTION');
  Logger.log('================================================\n');

  const forms = {
    hook: createG8W2Hook_(),
    station1: createG8W2Station1_(),
    station2: createG8W2Station2_(),
    station3: createG8W2Station3_(),
    exitTicket: createG8W2ExitTicket_()
  };

  Logger.log('\n================================================');
  Logger.log('ALL 5 FORMS CREATED - 100 POINTS TOTAL');
  Logger.log('================================================');

  return forms;
}

// ============================================================================
// HOOK - THE WHALE FINGER MYSTERY (12 points, ~10 min)
// Homologous structures introduction
// ============================================================================

function createG8W2Hook_() {
  const form = FormApp.create('G8.C3.W2: Hook - The Whale Finger Mystery');

  form.setDescription(
    'THE WHALE FINGER MYSTERY\n\n' +
    'Look at this X-ray of a whale\'s flipper.\n' +
    'Inside that smooth flipper, there are BONES that look exactly like:\n' +
    '- Upper arm bone (humerus)\n' +
    '- Two forearm bones (radius and ulna)\n' +
    '- Wrist bones (carpals)\n' +
    '- FIVE FINGERS with knuckles!\n\n' +
    'But whales don\'t have hands. They swim. They don\'t grab things.\n' +
    'So why would a whale have finger bones inside its flipper?\n\n' +
    '---\n' +
    'Time: About 10 minutes | Points: 12\n' +
    'Connect to what you learned about natural selection in Week 1!'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Hook submitted! You\'re ready for Station 1.\n\n' +
    'Next: Compare bone structures across different animals.\n' +
    'Look for patterns that reveal evolutionary relationships!'
  );

  // --- MTSS FLAG: Lamarckian misconception (45% frequency per cycle config) ---
  const mtss1 = form.addMultipleChoiceItem()
    .setTitle('QUICK CHECK (Week 1 Review): Which statement correctly describes how evolution works?')
    .setHelpText('This checks a common misconception from Week 1. Your answer does NOT affect your grade.')
    .setRequired(true);

  mtss1.setChoices([
    mtss1.createChoice('Individual organisms change their bodies during their lifetime, then pass those changes to offspring', false),  // FLAG: Lamarckian misconception
    mtss1.createChoice('Individuals with helpful traits survive better and have more offspring, so the trait becomes common in the population', true),
    mtss1.createChoice('All organisms evolve at the same rate', false),
    mtss1.createChoice('Evolution only happens to small organisms', false)
  ]);
  mtss1.setPoints(0);  // Diagnostic only - doesn't affect grade
  mtss1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Natural selection acts on EXISTING variation. Individuals don\'t change their genes - populations change over generations.')
      .build()
  );
  mtss1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('IMPORTANT: This is a common misconception! You CANNOT change your genes by your actions. Evolution happens to POPULATIONS, not individuals.')
      .build()
  );

  // --- PART 1: OBSERVATION ---
  form.addPageBreakItem()
    .setTitle('Part 1: Observe the Evidence')
    .setHelpText('Study the whale flipper bone structure before answering.');

  // Q1: Bone identification (3 pts auto)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('The bones inside a whale\'s flipper most closely resemble the bones in which human body part?')
    .setHelpText('Think about the bone arrangement: 1 upper bone, 2 lower bones, then smaller bones, then 5 "fingers"')
    .setRequired(true);

  q1.setChoices([
    q1.createChoice('Human hand and arm', true),
    q1.createChoice('Human leg and foot', false),
    q1.createChoice('Human spine', false),
    q1.createChoice('Human ribcage', false)
  ]);
  q1.setPoints(3);
  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! The whale flipper has the same bone pattern as a human arm and hand: humerus → radius/ulna → carpals → 5 fingers!')
      .build()
  );
  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Look at the pattern: 1 bone, then 2 bones, then small bones, then 5 "branches." That matches an arm/hand!')
      .build()
  );

  // Q2: Initial hypothesis (3 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 2 (3 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '3: Proposes common ancestor or evolutionary origin\n' +
      '2: Reasonable hypothesis with some logic\n' +
      '1: Vague guess\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Why might a whale have finger bones inside its flipper? Propose a hypothesis.')
    .setHelpText(
      'Think: Whales don\'t use fingers. So why would they have this structure?\n\n' +
      '--- SENTENCE STARTERS (choose one to begin your answer) ---\n' +
      '• "I think whales have finger bones because their ancestors..."\n' +
      '• "The finger bones might be there because whales evolved from..."\n' +
      '• "This structure could be evidence that whales used to..."\n\n' +
      'WORD BANK: ancestors, evolved, inherited, common ancestor, land mammals, modified'
    )
    .setRequired(true);

  // --- PART 2: COMPARING ORGANISMS ---
  form.addPageBreakItem()
    .setTitle('Part 2: Compare to Other Animals')
    .setHelpText('This same bone pattern appears in MANY animals...');

  // Q3: Pattern recognition (3 pts auto)
  const q3 = form.addCheckboxItem()
    .setTitle('Which of these animals ALSO have the same bone pattern (humerus → radius/ulna → carpals → 5 digits)?')
    .setHelpText('Select ALL that have this pattern.')
    .setRequired(true);

  q3.setChoices([
    q3.createChoice('Bats (wing)', true),
    q3.createChoice('Dogs (front leg)', true),
    q3.createChoice('Humans (arm)', true),
    q3.createChoice('Fish (fin)', false),
    q3.createChoice('Insects (leg)', false)
  ]);
  q3.setPoints(3);
  q3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Bats, dogs, and humans all have this same bone pattern - they\'re all mammals with a common ancestor!')
      .build()
  );
  q3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Fish fins and insect legs have DIFFERENT bone structures. The arm pattern is found in mammals - animals with a common ancestor.')
      .build()
  );

  // Q4: Week 1 connection (3 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 4 (3 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '3: Connects to natural selection AND population-level change\n' +
      '2: Mentions Week 1 concepts but unclear connection\n' +
      '1: Vague response\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('WEEK 1 CONNECTION: How does natural selection explain why whale flippers look different from human hands, even though they have the same bones?')
    .setHelpText(
      'Think: Different environments = different selection pressures = different shapes over time\n\n' +
      '--- SENTENCE STARTERS (choose one to begin your answer) ---\n' +
      '• "Natural selection shaped the bones differently because whales needed to _____ while humans needed to _____."\n' +
      '• "Even though they share the same bone pattern, selection pressures in water vs. land caused..."\n' +
      '• "The flippers became _____ shaped because whales that could _____ survived better and had more offspring."\n\n' +
      'WORD BANK: selection pressure, survive, reproduce, environment, adapted, modified, generations, population'
    )
    .setRequired(true);

  // Q5: Confidence (0 pts)
  form.addScaleItem()
    .setTitle('Self-Assessment: How well do you understand why similar bones appear in different animals?')
    .setHelpText('FOR REFLECTION ONLY - Does NOT affect your grade.')
    .setBounds(1, 5)
    .setLabels('Still confused', 'I get it!')
    .setRequired(true);

  logFormInfo_(form, 'G8 W2 Hook', 12);
  return form;
}

// ============================================================================
// STATION 1 - COMPARATIVE ANATOMY ANALYSIS (20 points, ~18 min)
// Homologous vs analogous structures
// ============================================================================

function createG8W2Station1_() {
  const form = FormApp.create('G8.C3.W2: Station 1 - Comparative Anatomy Analysis');

  form.setDescription(
    'YOUR MISSION: ANALYZE COMPARATIVE ANATOMY\n\n' +
    'KEY TERMS:\n' +
    '- HOMOLOGOUS structures: Same bone pattern, different function (from common ancestor)\n' +
    '  Example: whale flipper, bat wing, human arm - same bones, different uses\n\n' +
    '- ANALOGOUS structures: Different structure, same function (NOT from common ancestor)\n' +
    '  Example: bird wing vs. insect wing - both fly, but totally different anatomy\n\n' +
    '---\n' +
    'Time: About 18 minutes | Points: 20\n\n' +
    'You will analyze bone diagrams to determine evolutionary relationships.'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Station 1 complete!\n\n' +
    'KEY INSIGHT: Homologous structures = evidence of common ancestry.\n' +
    'Same bones, different shapes = modified over time by natural selection.\n\n' +
    'Continue to Station 2: Fossil Record Investigation'
  );

  // --- CLASSIFICATION ---
  form.addPageBreakItem()
    .setTitle('Step 1: Classify Structures')
    .setHelpText(
      'REMEMBER:\n' +
      'Homologous = SAME STRUCTURE (bones), DIFFERENT FUNCTION\n' +
      'Analogous = DIFFERENT STRUCTURE, SAME FUNCTION'
    );

  // Q1: Classification (5 pts auto)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('A bat wing and a human arm have the same bone pattern (humerus, radius, ulna, carpals, digits). This is an example of:')
    .setRequired(true);

  q1.setChoices([
    q1.createChoice('Homologous structures - same bones, different function', true),
    q1.createChoice('Analogous structures - different bones, same function', false),
    q1.createChoice('Neither - they are unrelated', false),
    q1.createChoice('Both homologous and analogous', false)
  ]);
  q1.setPoints(5);
  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Same bone STRUCTURE (pattern) but different FUNCTION (flying vs. grabbing) = HOMOLOGOUS. This suggests a common ancestor!')
      .build()
  );
  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Same bones = homologous. The bat wing and human arm have the SAME bone pattern, even though they do different things.')
      .build()
  );

  // Q2: Another classification (4 pts auto)
  const q2 = form.addMultipleChoiceItem()
    .setTitle('A bird wing and a butterfly wing both allow flight, but have completely DIFFERENT internal structures. This is an example of:')
    .setRequired(true);

  q2.setChoices([
    q2.createChoice('Homologous structures', false),
    q2.createChoice('Analogous structures - same function, different structure', true),
    q2.createChoice('Evidence of common ancestry', false),
    q2.createChoice('Natural selection doesn\'t apply', false)
  ]);
  q2.setPoints(4);
  q2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Same function (flight) but DIFFERENT structure = ANALOGOUS. This does NOT suggest common ancestry - they evolved flight independently!')
      .build()
  );
  q2.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Different structure = not homologous. Bird wings have bones; butterfly wings are made of chitin. They evolved flight separately.')
      .build()
  );

  // --- ANALYSIS ---
  form.addPageBreakItem()
    .setTitle('Step 2: Analyze Evidence')
    .setHelpText('Use comparative anatomy to make evolutionary inferences.');

  // Q3: Evidence interpretation (5 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 3: Interpret the Evidence (5 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '5: Explains common ancestor with bone pattern modification over time\n' +
      '4: Mentions common ancestor correctly\n' +
      '3: Partial explanation\n' +
      '2: Vague response\n' +
      '1: Incorrect\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle(
      'Whales, bats, dogs, and humans all have the same bone pattern in their front limbs.\n\n' +
      'What does this suggest about the evolutionary history of these animals?\n' +
      'Why would animals that live in such different environments have the same bone structure?'
    )
    .setHelpText(
      '--- SENTENCE STARTERS (choose one to begin your answer) ---\n' +
      '• "The shared bone pattern suggests that these animals share a common _____ that lived millions of years ago."\n' +
      '• "Even though they live in different environments, the same bone structure shows that they..."\n' +
      '• "Natural selection modified the original limb pattern into different shapes because each species needed to..."\n\n' +
      'WORD BANK: common ancestor, inherited, modified, natural selection, homologous, environment, adaptation'
    )
    .setRequired(true);

  // Q4: Lamarckian check (3 pts auto) - MISCONCEPTION TARGET
  const q4 = form.addMultipleChoiceItem()
    .setTitle(
      'IMPORTANT: Which statement correctly explains how whales got flippers?\n\n' +
      'A: An ancient whale decided to swim more, so its arms gradually changed into flippers during its lifetime.\n' +
      'B: Some ancient whales were born with limbs that were slightly better for swimming; they survived better and passed this trait to offspring.'
    )
    .setRequired(true);

  q4.setChoices([
    q4.createChoice('Statement A - the individual whale changed', false),
    q4.createChoice('Statement B - the population changed over generations', true)
  ]);
  q4.setPoints(3);
  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! POPULATIONS evolve over generations through natural selection. Individual organisms do NOT change their traits during their lifetime!')
      .build()
  );
  q4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('CRITICAL MISCONCEPTION! Individuals don\'t evolve. The POPULATION changes over generations because individuals with helpful traits survive better and reproduce more.')
      .build()
  );

  // Q5: Week 1 spiral - natural selection (3 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 5: SPIRAL - Week 1 Natural Selection (3 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '3: Correctly applies natural selection mechanism from Week 1\n' +
      '2: Mentions selection but incomplete mechanism\n' +
      '1: Vague connection\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle(
      'WEEK 1 REVIEW: Use natural selection to explain:\n' +
      'How did the same ancestral arm bone pattern become a flipper (in whales), a wing (in bats), and a digging claw (in moles)?'
    )
    .setHelpText(
      'Remember from Week 1: Variation exists → Selection pressure → Survival/reproduction → Trait becomes common\n\n' +
      '--- SENTENCE STARTERS (choose one to begin your answer) ---\n' +
      '• "Variation in limb shape already existed in the population. In water environments, individuals with more _____ limbs survived better because..."\n' +
      '• "Natural selection shaped the same bones differently: whales with _____ limbs caught more fish, while bats with _____ limbs caught more insects."\n' +
      '• "Over many generations, each population\'s limbs became more specialized for their environment because individuals that could _____ better had more offspring."\n\n' +
      'WORD BANK: variation, selection pressure, survival, reproduction, population, generations, specialized, adapted, environment'
    )
    .setRequired(true);

  logFormInfo_(form, 'G8 W2 Station 1', 20);
  return form;
}

// ============================================================================
// STATION 2 - FOSSIL RECORD INVESTIGATION (20 points, ~15 min)
// Transitional fossils + patterns in the record
// ============================================================================

function createG8W2Station2_() {
  const form = FormApp.create('G8.C3.W2: Station 2 - Fossil Record Investigation');

  form.setDescription(
    'YOUR MISSION: INVESTIGATE THE FOSSIL RECORD\n\n' +
    'Fossils provide a timeline of life on Earth.\n' +
    'TRANSITIONAL FOSSILS show intermediate features between two groups.\n\n' +
    'KEY EXAMPLES:\n' +
    '- Tiktaalik: Fish with wrist bones (fish → tetrapod transition)\n' +
    '- Archaeopteryx: Dinosaur with feathers (dinosaur → bird transition)\n' +
    '- Ambulocetus: Whale with legs (land mammal → whale transition)\n\n' +
    '---\n' +
    'Time: About 15 minutes | Points: 20\n\n' +
    'You will analyze fossil data and make predictions.'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Station 2 complete!\n\n' +
    'KEY INSIGHT: Transitional fossils show evolution in action.\n' +
    'They have features of BOTH ancestral and descendant groups.\n\n' +
    'Continue to Station 3: Design a Transitional Form'
  );

  // --- FOSSIL ANALYSIS ---
  form.addPageBreakItem()
    .setTitle('Whale Evolution Fossil Sequence')
    .setHelpText(
      'WHALE ANCESTOR TIMELINE:\n\n' +
      '1. Pakicetus (50 mya): Land mammal, 4 legs, lived near water\n' +
      '2. Ambulocetus (49 mya): Could walk AND swim, webbed feet\n' +
      '3. Rodhocetus (47 mya): Short legs, large tail, mostly aquatic\n' +
      '4. Basilosaurus (40 mya): Tiny back legs, fully aquatic\n' +
      '5. Modern whales (today): No visible back legs, flippers\n\n' +
      'mya = million years ago'
    );

  // Q1: Sequence interpretation (4 pts auto)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('Based on the fossil sequence, what is the most likely evolutionary path for whales?')
    .setRequired(true);

  q1.setChoices([
    q1.createChoice('Fish → Whale (directly from fish)', false),
    q1.createChoice('Land mammal → Semi-aquatic → Fully aquatic (gradual transition)', true),
    q1.createChoice('Modern whale → Ancestors with legs (evolved backwards)', false),
    q1.createChoice('Whales have always been the same', false)
  ]);
  q1.setPoints(4);
  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! The fossils show a gradual transition: land mammal → amphibious → fully aquatic. Each fossil is a "snapshot" in this process.')
      .build()
  );
  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('The fossils show GRADUAL change: 4 legs → webbed feet → short legs → tiny legs → no legs. This happened over millions of years.')
      .build()
  );

  // Q2: Transitional fossil identification (4 pts auto)
  const q2 = form.addMultipleChoiceItem()
    .setTitle('Ambulocetus had both legs for walking AND adaptations for swimming. This makes it a:')
    .setRequired(true);

  q2.setChoices([
    q2.createChoice('Modern organism', false),
    q2.createChoice('Transitional fossil - shows features of both groups', true),
    q2.createChoice('Fake fossil - organisms can\'t have both', false),
    q2.createChoice('Unrelated species', false)
  ]);
  q2.setPoints(4);
  q2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Transitional fossils have features of BOTH ancestral (legs) and descendant (swimming adaptations) groups. They\'re evolution "caught in the act"!')
      .build()
  );
  q2.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Fossils with features of two groups are TRANSITIONAL - they show the intermediate stage between ancestors and descendants.')
      .build()
  );

  // Q3: Prediction (5 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 3: Make a Prediction (5 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '5: Predicts BOTH intermediate structure AND intermediate habitat/behavior\n' +
      '4: Predicts intermediate structure OR habitat\n' +
      '3: Reasonable prediction with less detail\n' +
      '2: Vague prediction\n' +
      '1: No scientific reasoning\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle(
      'Scientists discovered Pakicetus (land mammal, 50 mya) and Ambulocetus (semi-aquatic, 49 mya).\n\n' +
      'If you found a fossil from 49.5 million years ago, what features would you PREDICT it would have?\n' +
      'Describe its legs, feet, tail, and habitat.'
    )
    .setHelpText(
      '--- SENTENCE STARTERS (choose one to begin your answer) ---\n' +
      '• "Since this fossil is between Pakicetus and Ambulocetus, I predict it would have legs that are _____ and feet that are _____."\n' +
      '• "The 49.5 mya fossil would likely show intermediate features: it might have _____ legs with _____ feet for both walking and swimming."\n' +
      '• "I predict this organism lived in _____ habitat because it\'s transitional between a land mammal and a semi-aquatic one."\n\n' +
      'WORD BANK: intermediate, shorter, webbed, paddle-like, shallow water, coastline, transitional'
    )
    .setRequired(true);

  // Q4: Evidence evaluation (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 4: Evaluate the Evidence (4 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '4: Refutes claim with specific fossil evidence\n' +
      '3: Refutes with general fossil evidence\n' +
      '2: Recognizes claim is wrong but weak evidence\n' +
      '1: Accepts the claim\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle(
      'Someone claims: "There are no transitional fossils - evolution has no evidence."\n\n' +
      'Using what you learned about whale evolution, explain why this claim is incorrect.'
    )
    .setHelpText(
      '--- SENTENCE STARTERS (choose one to begin your answer) ---\n' +
      '• "This claim is incorrect because whale fossils like Ambulocetus show _____ features that are in-between land mammals and whales."\n' +
      '• "The whale fossil sequence proves this wrong because we can see how _____ changed over millions of years from Pakicetus to modern whales."\n' +
      '• "Transitional fossils DO exist. For example, _____ had both legs AND swimming adaptations, which shows evolution happening."\n\n' +
      'WORD BANK: transitional, intermediate, Pakicetus, Ambulocetus, Basilosaurus, legs, flippers, gradual change, millions of years'
    )
    .setRequired(true);

  // Q5: Vestigial structures (3 pts auto)
  const q5 = form.addMultipleChoiceItem()
    .setTitle('Modern whales have tiny, non-functional hip bones hidden inside their bodies. What does this suggest?')
    .setRequired(true);

  q5.setChoices([
    q5.createChoice('Whales were designed to walk but changed their minds', false),
    q5.createChoice('Whales evolved from ancestors that had legs - the bones are "leftover" structures', true),
    q5.createChoice('The bones have a hidden function we haven\'t discovered', false),
    q5.createChoice('This is evidence AGAINST evolution', false)
  ]);
  q5.setPoints(3);
  q5.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! These "vestigial" structures are evolutionary leftovers - they no longer function but show ancestry. Whale hip bones = evidence of land-dwelling ancestors.')
      .build()
  );
  q5.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Vestigial structures are "evolutionary leftovers" - they made sense in ancestors but are no longer needed. They\'re evidence OF evolution, not against it.')
      .build()
  );

  logFormInfo_(form, 'G8 W2 Station 2', 20);
  return form;
}

// ============================================================================
// STATION 3 - DESIGN A TRANSITIONAL FORM (25 points, ~20 min)
// Apply evolutionary principles to predict
// ============================================================================

function createG8W2Station3_() {
  const form = FormApp.create('G8.C3.W2: Station 3 - Design a Transitional Form');

  form.setDescription(
    'ENGINEERING CHALLENGE: DESIGN A TRANSITIONAL ORGANISM\n\n' +
    'Scientists discovered two fossils:\n' +
    '- ANCESTOR (100 mya): Fully land-dwelling mammal with fur, 4 legs, small ears\n' +
    '- DESCENDANT (present): Fully aquatic mammal with flippers, no visible ears, streamlined body\n\n' +
    'Your task: Design what the TRANSITIONAL form (60 mya) would look like.\n\n' +
    '---\n' +
    'Time: About 20 minutes | Points: 25 (highest value!)\n\n' +
    'Apply natural selection principles to predict intermediate features.'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Station 3 complete!\n\n' +
    'Transitional organisms have INTERMEDIATE features:\n' +
    '- Not fully land OR fully water adapted\n' +
    '- Some ancestral traits + some new adaptations\n' +
    '- Each generation is slightly better adapted than the last\n\n' +
    'Continue to Exit Ticket'
  );

  // --- REFERENCE ---
  form.addPageBreakItem()
    .setTitle('Reference: Ancestor vs. Descendant')
    .setHelpText(
      'ANCESTOR (100 million years ago):\n' +
      '- 4 legs with paws\n' +
      '- Fur coat\n' +
      '- Small external ears\n' +
      '- Long snout\n' +
      '- Lived on land near water\n\n' +
      'DESCENDANT (present day):\n' +
      '- Front flippers (no hind limbs visible)\n' +
      '- Smooth skin (no fur)\n' +
      '- No external ears\n' +
      '- Streamlined head\n' +
      '- Lives fully in water'
    );

  // Q1: Limb design (5 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 1: Design the Limbs (5 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '5: Intermediate limbs + explains selection pressure for change\n' +
      '4: Intermediate limbs with partial explanation\n' +
      '3: Reasonable intermediate design\n' +
      '2: Either fully land OR fully aquatic (not intermediate)\n' +
      '1: No scientific basis\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle(
      'Describe the LIMBS of your transitional organism (60 mya).\n\n' +
      'Think: The ancestor had 4 legs, the descendant has flippers.\n' +
      'What would the in-between stage look like? Why?'
    )
    .setHelpText(
      'Consider: webbed feet? Shortened legs? Mix of features?\n\n' +
      '--- SENTENCE STARTERS (choose one to begin your answer) ---\n' +
      '• "The limbs would be _____ because they need to be intermediate between legs and flippers."\n' +
      '• "My transitional organism has front limbs that are _____ with _____ for both walking and swimming."\n' +
      '• "Since the ancestor had 4 legs and the descendant has flippers, the 60 mya form probably had..."\n\n' +
      'WORD BANK: shortened, webbed, paddle-shaped, partially flipper-like, reduced back legs, intermediate'
    )
    .setRequired(true);

  // Q2: Body covering (5 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 2: Design the Body Covering (5 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '5: Intermediate covering + explains selective advantage\n' +
      '4: Intermediate covering with partial explanation\n' +
      '3: Reasonable intermediate design\n' +
      '2: Either fully furred OR fully smooth\n' +
      '1: No scientific basis\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle(
      'Describe the BODY COVERING of your transitional organism.\n\n' +
      'Think: Ancestor had fur, descendant has smooth skin.\n' +
      'What would the intermediate covering look like? Why would this be advantageous?'
    )
    .setHelpText(
      '--- SENTENCE STARTERS (choose one to begin your answer) ---\n' +
      '• "The body covering would be _____ because this is intermediate between fur and smooth skin."\n' +
      '• "My transitional organism has _____ fur/hair that would help it _____ while also allowing _____."\n' +
      '• "Since the ancestor had thick fur and the descendant has smooth skin, at 60 mya it probably had..."\n\n' +
      'WORD BANK: sparse, thin, reduced, patchy, short, streamlined, insulation, swimming, drag reduction'
    )
    .setRequired(true);

  // Q3: Behavior and habitat (5 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 3: Describe Behavior and Habitat (5 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '5: Intermediate habitat + specific behaviors + explains why\n' +
      '4: Intermediate habitat and behaviors\n' +
      '3: Reasonable intermediate lifestyle\n' +
      '2: Either fully land OR fully water\n' +
      '1: No scientific basis\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle(
      'Describe the HABITAT and BEHAVIOR of your transitional organism.\n\n' +
      'Where did it live? What did it eat? How did it move?\n' +
      'Think: The ancestor lived on land, the descendant lives in water.'
    )
    .setHelpText(
      '--- SENTENCE STARTERS (choose one to begin your answer) ---\n' +
      '• "My transitional organism lived in _____ habitat, spending time both _____ and _____."\n' +
      '• "It probably ate _____ because it could hunt in both water and on land."\n' +
      '• "For movement, it could _____ on land and _____ in water, making it well-adapted to..."\n\n' +
      'WORD BANK: coastal, shallow water, semi-aquatic, fish, small mammals, walk, swim, waddle, paddle, amphibious'
    )
    .setRequired(true);

  // Q4: Natural selection explanation (7 pts manual) - highest value
  form.addSectionHeaderItem()
    .setTitle('Question 4: Explain Using Natural Selection (7 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '7: Complete natural selection mechanism: variation → selection pressure → survival/reproduction → trait spread\n' +
      '5: Mentions most elements of natural selection\n' +
      '3: Partial mechanism\n' +
      '1: No mechanism, just "it evolved"\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle(
      'Using NATURAL SELECTION, explain how your transitional form would eventually become the fully aquatic descendant.\n\n' +
      'Include:\n' +
      '1. What variation existed in the population?\n' +
      '2. What selection pressure favored certain traits?\n' +
      '3. How did survival/reproduction change the population over time?'
    )
    .setHelpText(
      '--- SENTENCE STARTERS (use all three parts) ---\n\n' +
      'PART 1 - VARIATION:\n' +
      '• "Variation existed in the transitional population: some individuals had _____ while others had _____."\n\n' +
      'PART 2 - SELECTION PRESSURE:\n' +
      '• "The selection pressure was _____. Individuals with more _____ traits could _____ better."\n\n' +
      'PART 3 - CHANGE OVER TIME:\n' +
      '• "Over many generations, individuals with _____ survived and reproduced more, so the trait became common. Eventually, the population became fully _____."\n\n' +
      'WORD BANK: variation, selection pressure, aquatic traits, swimming ability, streamlined, reproduce, offspring, generations, population, fully aquatic'
    )
    .setRequired(true);

  // Q5: NOT Lamarckian (3 pts auto)
  const q5 = form.addMultipleChoiceItem()
    .setTitle(
      'Which statement correctly explains how the transitional population evolved?\n\n' +
      'A: Each generation of individuals changed their bodies to swim better, then passed those changes to offspring.\n' +
      'B: Individuals with traits that helped them swim survived better and had more offspring, so those traits became more common.'
    )
    .setRequired(true);

  q5.setChoices([
    q5.createChoice('Statement A', false),
    q5.createChoice('Statement B', true)
  ]);
  q5.setPoints(3);
  q5.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Individuals don\'t change during their lifetime. POPULATIONS change over generations because individuals with helpful traits survive and reproduce more.')
      .build()
  );
  q5.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Statement A describes Lamarckism (INCORRECT). You can\'t change your genes by exercising. Traits spread because individuals WITH those traits reproduce more.')
      .build()
  );

  logFormInfo_(form, 'G8 W2 Station 3', 25);
  return form;
}

// ============================================================================
// EXIT TICKET - EVIDENCE INTEGRATION (23 points, ~15 min)
// 2 NEW + 2 SPIRAL + 1 INTEGRATION + 1 SEP-6 (constructing explanations)
// ============================================================================

function createG8W2ExitTicket_() {
  const form = FormApp.create('G8.C3.W2: Exit Ticket - Evidence Integration');

  form.setDescription(
    'EXIT TICKET: SHOW WHAT YOU LEARNED\n\n' +
    'This tests whether you can use multiple lines of evidence to support evolution.\n\n' +
    '---\n' +
    'Time: About 15 minutes | Points: 23\n\n' +
    'QUESTION TYPES:\n' +
    '- 2 NEW questions (Week 2 evidence)\n' +
    '- 2 SPIRAL questions (Week 1 natural selection)\n' +
    '- 1 INTEGRATION question (connects both weeks)\n' +
    '- 1 SEP-6 question (construct an explanation)'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'WEEK 2 COMPLETE! Great work!\n\n' +
    'Key takeaways:\n' +
    '- Homologous structures = common ancestry (same bones, different functions)\n' +
    '- Analogous structures = convergent evolution (different structures, same function)\n' +
    '- Transitional fossils show evolution in progress\n' +
    '- Vestigial structures are evolutionary "leftovers"\n\n' +
    'NEXT WEEK: Synthesis & Assessment - bringing it all together!'
  );

  // --- NEW CONTENT ---
  form.addPageBreakItem()
    .setTitle('NEW CONTENT (Questions 1 & 3)')
    .setHelpText('These test what you learned TODAY about evidence for evolution.');

  // Q1: NEW - Homologous definition (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 1: NEW - Define Homologous Structures (4 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '4: Correct definition + example + explains why it\'s evidence for common ancestry\n' +
      '3: Correct definition + example\n' +
      '2: Partial definition\n' +
      '1: Confused with analogous\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle(
      'Define HOMOLOGOUS STRUCTURES and give an example.\n\n' +
      'Explain why homologous structures are evidence for evolution.'
    )
    .setHelpText(
      '--- SENTENCE STARTERS (use all three parts) ---\n\n' +
      'DEFINITION:\n' +
      '• "Homologous structures are body parts that have the same _____ but different _____."\n\n' +
      'EXAMPLE:\n' +
      '• "For example, a whale flipper and a human arm both have _____, even though one is used for _____ and the other for _____."\n\n' +
      'WHY IT\'S EVIDENCE:\n' +
      '• "This is evidence for evolution because the shared structure suggests these organisms have a common _____."\n\n' +
      'WORD BANK: bone structure, function, common ancestor, inherited, modified, humerus, radius, ulna, swimming, grabbing'
    )
    .setRequired(true);

  // Q2: SPIRAL - Variation (4 pts auto)
  form.addSectionHeaderItem().setTitle('Question 2: SPIRAL - Week 1');

  const q2 = form.addMultipleChoiceItem()
    .setTitle('WEEK 1 REVIEW: For natural selection to work, what must ALREADY exist in a population?')
    .setRequired(true);

  q2.setChoices([
    q2.createChoice('The desire to change', false),
    q2.createChoice('Variation in traits (differences between individuals)', true),
    q2.createChoice('A plan for evolution', false),
    q2.createChoice('The final evolved form', false)
  ]);
  q2.setPoints(4);
  q2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Variation must ALREADY exist. Natural selection doesn\'t create new traits - it selects from existing variation in the population.')
      .build()
  );
  q2.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Natural selection needs pre-existing variation. Without differences between individuals, there\'s nothing to "select"!')
      .build()
  );

  // Q3: NEW - Transitional fossil (4 pts auto)
  const q3 = form.addMultipleChoiceItem()
    .setTitle('Tiktaalik is a fossil with both fish features (gills, scales) AND tetrapod features (wrist bones, neck). This makes it:')
    .setRequired(true);

  q3.setChoices([
    q3.createChoice('A transitional fossil showing fish → land animal evolution', true),
    q3.createChoice('A fake because organisms can\'t have both features', false),
    q3.createChoice('Evidence against evolution', false),
    q3.createChoice('A completely separate species unrelated to anything', false)
  ]);
  q3.setPoints(4);
  q3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Tiktaalik is a classic transitional fossil - it has features of BOTH fish (ancestral) and tetrapods (descendant). Evolution caught in the act!')
      .build()
  );
  q3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Transitional fossils are EXPECTED by evolution - they show intermediate stages. Tiktaalik is one of the best examples!')
      .build()
  );

  // Q4: SPIRAL - Lamarckian check (4 pts auto) - CRITICAL MISCONCEPTION
  form.addSectionHeaderItem().setTitle('Question 4: SPIRAL - Week 1 Misconception Check');

  const q4 = form.addMultipleChoiceItem()
    .setTitle(
      'WEEK 1 REVIEW: A student says "Giraffes got long necks because they stretched to reach high leaves, and then passed on longer necks to their babies."\n\n' +
      'What is WRONG with this explanation?'
    )
    .setRequired(true);

  q4.setChoices([
    q4.createChoice('Nothing - this is how evolution works', false),
    q4.createChoice('Individuals can\'t change their genes by their actions; variation must already exist in the population', true),
    q4.createChoice('Giraffes don\'t eat leaves', false),
    q4.createChoice('Evolution doesn\'t happen to large animals', false)
  ]);
  q4.setPoints(4);
  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! This is the Lamarckian misconception. You can\'t change your DNA by exercising. Giraffes with longer necks ALREADY in the population survived better and reproduced more.')
      .build()
  );
  q4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('CRITICAL: An individual cannot change its genes by its actions. The variation (long vs. short necks) must ALREADY exist. Then selection acts on existing variation.')
      .build()
  );

  // Q5: INTEGRATION (4 pts manual)
  form.addPageBreakItem()
    .setTitle('INTEGRATION (Question 5)')
    .setHelpText('This requires knowledge from BOTH Week 1 AND Week 2.');

  form.addSectionHeaderItem()
    .setTitle('Question 5: INTEGRATION (4 points)')
    .setHelpText(
      '3D ASSESSMENT RUBRIC:\n' +
      '4: Uses Week 1 natural selection + Week 2 anatomical evidence together\n' +
      '3: Uses one type of evidence well\n' +
      '2: Mentions both but doesn\'t connect\n' +
      '1: Vague response\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle(
      'A classmate says: "Evolution is just a guess - there\'s no real evidence for it."\n\n' +
      'Using evidence from BOTH weeks, construct an argument that evolution is well-supported:\n' +
      '- Week 1: Natural selection in action (cheetah-gazelle, bean simulation)\n' +
      '- Week 2: Anatomical and fossil evidence\n\n' +
      'Give at least TWO specific pieces of evidence.'
    )
    .setHelpText(
      '--- SENTENCE STARTERS (include evidence from BOTH weeks) ---\n\n' +
      'WEEK 1 EVIDENCE:\n' +
      '• "In Week 1, we saw natural selection in action when... This shows that evolution is happening right now because..."\n\n' +
      'WEEK 2 EVIDENCE:\n' +
      '• "In Week 2, we learned that homologous structures like _____ prove common ancestry because..."\n' +
      '• "The fossil sequence of whale ancestors (Pakicetus → Ambulocetus → modern whales) shows _____."\n\n' +
      'CONCLUSION:\n' +
      '• "Therefore, evolution is well-supported by multiple lines of evidence including..."\n\n' +
      'WORD BANK: natural selection, variation, survival, homologous, transitional fossils, common ancestor, whale evolution, bean simulation'
    )
    .setRequired(true);

  // Q6: SEP-6 - Constructing Explanations (3 pts manual)
  form.addPageBreakItem()
    .setTitle('SEP-6: Constructing Explanations (Question 6)')
    .setHelpText(
      'NGSS Practice: Constructing Explanations\n' +
      'Scientists construct explanations using evidence and reasoning.'
    );

  form.addSectionHeaderItem()
    .setTitle('Question 6: Construct an Explanation (3 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '3: Clear explanation with evidence + mechanism\n' +
      '2: Explanation with partial evidence\n' +
      '1: Vague explanation\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle(
      'Construct a scientific explanation for this observation:\n\n' +
      'Dolphins and sharks have similar streamlined body shapes, but dolphins are mammals (warm-blooded, give live birth) and sharks are fish (cold-blooded, lay eggs).\n\n' +
      'How can two unrelated organisms look so similar?\n' +
      'What type of structures are their body shapes (homologous or analogous)? Explain.'
    )
    .setHelpText(
      '--- SENTENCE STARTERS (answer all parts) ---\n\n' +
      'CLASSIFY THE STRUCTURE:\n' +
      '• "The streamlined body shapes of dolphins and sharks are _____ structures because they have the same _____ but different underlying _____."\n\n' +
      'EXPLAIN WHY:\n' +
      '• "Even though dolphins and sharks are not closely related, they evolved similar shapes because both live in _____ and face the same _____."\n' +
      '• "This is called convergent evolution, which means..."\n\n' +
      'WORD BANK: analogous, function, structure, water, selection pressure, independently evolved, convergent evolution, streamlined, efficient swimming'
    )
    .setRequired(true);

  logFormInfo_(form, 'G8 W2 Exit Ticket', 23);
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
function testG8W2Hook() { createG8W2Hook_(); }
function testG8W2Station1() { createG8W2Station1_(); }
function testG8W2Station2() { createG8W2Station2_(); }
function testG8W2Station3() { createG8W2Station3_(); }
function testG8W2ExitTicket() { createG8W2ExitTicket_(); }
