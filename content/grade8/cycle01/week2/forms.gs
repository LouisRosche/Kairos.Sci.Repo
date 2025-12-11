/**
 * ============================================================================
 * GRADE 8 - CYCLE 1 WEEK 2: HEAT TRANSFER MECHANISMS
 * 5 Forms | 100 Points Total | ~75 Minutes
 * ============================================================================
 *
 * NGSS ALIGNMENT:
 *   Primary: MS-PS3-3 - Apply scientific principles to design, construct,
 *            and test a device that minimizes or maximizes thermal energy transfer
 *   Building from: MS-PS1-4 - Particle motion and thermal energy (Week 1)
 *
 * 3-DIMENSIONAL LEARNING:
 *   SEP-3: Planning and Carrying Out Investigations
 *          ↳ Students investigate heat transfer through different materials
 *   SEP-6: Constructing Explanations
 *          ↳ Students explain heat transfer at particle level
 *   DCI PS3.B: Conservation of Energy and Energy Transfer
 *   CCC Energy and Matter: Energy flows from hot to cold
 *
 * LEARNING TARGETS:
 *   1. Explain conduction as particle-to-particle energy transfer
 *   2. Compare conduction, convection, and radiation
 *   3. Explain why some materials feel colder at room temperature
 *   4. Design a device to minimize or maximize heat transfer
 *
 * PHENOMENON: Why do some materials feel cold to touch even at room temperature?
 *
 * SPIRAL: Particle motion and thermal energy from Week 1
 *
 * ============================================================================
 */

// ============================================================================
// MAIN FUNCTION
// ============================================================================

function createAllG8C1W2Forms() {
  Logger.log('================================================');
  Logger.log('G8 CYCLE 1 WEEK 2: HEAT TRANSFER MECHANISMS');
  Logger.log('================================================\n');

  const forms = {
    hook: createG8C1W2Hook_(),
    station1: createG8C1W2Station1_(),
    station2: createG8C1W2Station2_(),
    station3: createG8C1W2Station3_(),
    exitTicket: createG8C1W2ExitTicket_()
  };

  Logger.log('\n================================================');
  Logger.log('ALL 5 FORMS CREATED - 100 POINTS TOTAL');
  Logger.log('================================================');

  return forms;
}

// ============================================================================
// HOOK - THE METAL SPOON MYSTERY (12 points + diagnostic, ~10 min)
// ============================================================================

function createG8C1W2Hook_() {
  const form = FormApp.create('G8.C1.W2: Hook - The Metal Spoon Mystery [12 pts]');

  form.setDescription(
    'THE METAL SPOON MYSTERY\n\n' +
    'You touch three objects that have been sitting in the same room\n' +
    'for hours:\n' +
    '- A metal spoon\n' +
    '- A wooden cutting board\n' +
    '- A plastic cup\n\n' +
    'They have ALL been at room temperature (about 70F/21C) for hours.\n' +
    'A thermometer confirms they are the SAME temperature.\n\n' +
    'But the metal spoon feels COLD, while the wood and plastic\n' +
    'feel room temperature. Why?\n\n' +
    '---\n' +
    'Time: About 10 minutes | Points: 12 (+ 1 self-reflection)\n' +
    'Build on what you learned about thermal energy last week!'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Hook submitted! You are ready for Station 1.\n\n' +
    'Next: Investigate how heat transfers through different materials.'
  );

  // Q1: Week 1 spiral (3 pts - auto)
  form.addPageBreakItem()
    .setTitle('Part 1: Quick Review from Week 1')
    .setHelpText('Let\'s check what you remember about thermal energy.');

  const q1 = form.addMultipleChoiceItem()
    .setTitle('[SPIRAL - Week 1] What is HEAT?')
    .setRequired(true)
    .setPoints(3);

  q1.setChoices([
    q1.createChoice('Thermal energy being transferred from a warmer object to a cooler object', true),
    q1.createChoice('A type of substance that flows from hot to cold', false),
    q1.createChoice('The same thing as temperature', false),
    q1.createChoice('Cold leaving an object', false)
  ]);

  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Great memory! Heat is thermal ENERGY in TRANSFER - it always flows from warmer to cooler objects.')
      .build()
  );

  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Remember from Week 1: Heat is NOT a substance - it\'s thermal ENERGY being transferred from warmer to cooler objects.')
      .build()
  );

  // Q2: Observation (3 pts - manual)
  form.addPageBreakItem()
    .setTitle('Part 2: The Mystery')
    .setHelpText('Think about why materials feel different temperatures.');

  form.addSectionHeaderItem()
    .setTitle('Question 2 [3 points - teacher graded]')
    .setHelpText('RUBRIC:\n' +
      '3 pts: Clear description of the paradox + mentions heat transfer\n' +
      '2 pts: Notes the phenomenon\n' +
      '1 pt: Minimal');

  const q2 = form.addParagraphTextItem()
    .setTitle('Describe the mystery: The metal, wood, and plastic are all the SAME temperature, but they feel different. What is confusing about this?')
    .setRequired(true);

  q2.setValidation(
    FormApp.createParagraphTextValidation()
      .requireTextLengthGreaterThanOrEqualTo(30)
      .build()
  );

  // Q3: Prediction (3 pts - manual)
  form.addSectionHeaderItem()
    .setTitle('Question 3 [3 points - teacher graded]')
    .setHelpText('RUBRIC:\n' +
      '3 pts: Hypothesis mentions heat transfer between hand and object\n' +
      '2 pts: Basic prediction\n' +
      '1 pt: Minimal');

  const q3 = form.addParagraphTextItem()
    .setTitle('What\'s your hypothesis? Why might the metal FEEL colder even though it\'s the same temperature as the wood?')
    .setHelpText('Think about what\'s happening between your hand and the object.')
    .setRequired(true);

  // Q4: Misconception check (3 pts - auto)
  const q4 = form.addMultipleChoiceItem()
    .setTitle('Which statement is TRUE about metals at room temperature?')
    .setRequired(true)
    .setPoints(3);

  q4.setChoices([
    q4.createChoice('Metals conduct heat away from your hand faster, making them FEEL colder', true),
    q4.createChoice('Metals are naturally colder than other materials', false),
    q4.createChoice('Metals absorb cold from the air', false),
    q4.createChoice('Metals have less thermal energy than wood at the same temperature', false)
  ]);

  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Exactly! The metal isn\'t colder - it\'s better at CONDUCTING heat away from your hand. Your hand loses heat faster, making it FEEL cold.')
      .build()
  );

  q4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Common misconception! Metals are NOT naturally colder. They just transfer heat FASTER than wood or plastic. The metal pulls heat from your hand quickly, making it feel cold.')
      .build()
  );

  // Q5: Confidence (0 pts)
  form.addScaleItem()
    .setTitle('How confident are you about understanding heat transfer?')
    .setHelpText('FOR REFLECTION ONLY - does NOT affect your grade.')
    .setBounds(1, 5)
    .setLabels('Not confident', 'Very confident');

  Logger.log('Hook created: ' + form.getEditUrl());
  return { form: form, editUrl: form.getEditUrl(), publishedUrl: form.getPublishedUrl() };
}

// ============================================================================
// STATION 1 - CONDUCTION INVESTIGATION (20 points, ~18 min)
// ============================================================================

function createG8C1W2Station1_() {
  const form = FormApp.create('G8.C1.W2: Station 1 - Conduction Investigation [20 pts]');

  form.setDescription(
    'CONDUCTION INVESTIGATION\n\n' +
    'Resource: Thermal conductivity simulation showing particle collisions\n\n' +
    'Investigate how heat transfers through CONDUCTION:\n' +
    '- Watch particles collide and transfer energy\n' +
    '- Compare conductors (metals) vs insulators (wood, plastic)\n' +
    '- Measure how fast heat moves through different materials\n\n' +
    '---\n' +
    'Time: About 18 minutes | Points: 20\n' +
    'Focus: Model how particle collisions transfer thermal energy'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Station 1 complete! Move to Station 2.\n\n' +
    'Next: Compare conduction, convection, and radiation.'
  );

  // Q1: Conduction mechanism (4 pts - auto)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('Based on the simulation, how does heat transfer through CONDUCTION?')
    .setRequired(true)
    .setPoints(4);

  q1.setChoices([
    q1.createChoice('Fast-moving particles collide with slower particles, transferring kinetic energy', true),
    q1.createChoice('Heat particles flow through the material like a liquid', false),
    q1.createChoice('The entire material moves from hot to cold regions', false),
    q1.createChoice('Light waves carry the heat through the material', false)
  ]);

  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Conduction happens when vibrating particles bump into neighboring particles, passing along their kinetic energy. No particles actually move from place to place!')
      .build()
  );

  // Q2: Conductor vs insulator (4 pts - auto)
  const q2 = form.addMultipleChoiceItem()
    .setTitle('Why do metals conduct heat FASTER than wood or plastic?')
    .setRequired(true)
    .setPoints(4);

  q2.setChoices([
    q2.createChoice('Metal particles are arranged so they transfer energy between neighbors more efficiently', true),
    q2.createChoice('Metal particles move faster than wood particles', false),
    q2.createChoice('Metals have more heat inside them', false),
    q2.createChoice('Wood and plastic absorb heat but metals don\'t', false)
  ]);

  q2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Exactly! Metals have free electrons that can quickly transfer energy between atoms. Wood and plastic don\'t have this, so energy transfers more slowly between their particles.')
      .build()
  );

  // Q3: Particle-level explanation (5 pts - manual)
  form.addSectionHeaderItem()
    .setTitle('Question 3 [5 points - teacher graded]')
    .setHelpText('RUBRIC:\n' +
      '5 pts: Describes particle collision + energy transfer + flow direction\n' +
      '4 pts: Good particle-level explanation\n' +
      '3 pts: Basic understanding\n' +
      '2-1 pts: Incomplete');

  const q3 = form.addParagraphTextItem()
    .setTitle('Explain at the PARTICLE LEVEL: When you touch a hot pan, how does heat transfer from the pan to your hand through conduction?')
    .setRequired(true);

  q3.setValidation(
    FormApp.createParagraphTextValidation()
      .requireTextLengthGreaterThanOrEqualTo(50)
      .build()
  );

  // Q4: Spiral - particle motion (4 pts - auto)
  const q4 = form.addMultipleChoiceItem()
    .setTitle('[SPIRAL - Week 1] In the simulation, the particles at the HOT end are:')
    .setRequired(true)
    .setPoints(4);

  q4.setChoices([
    q4.createChoice('Moving faster (more kinetic energy) than particles at the cold end', true),
    q4.createChoice('Moving slower than particles at the cold end', false),
    q4.createChoice('Moving at the same speed as particles at the cold end', false),
    q4.createChoice('Not moving at all', false)
  ]);

  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Great connection to Week 1! Higher temperature = faster particle motion = more kinetic energy.')
      .build()
  );

  // Q5: Application (3 pts - manual)
  form.addSectionHeaderItem()
    .setTitle('Question 5 [3 points - teacher graded]');

  const q5 = form.addParagraphTextItem()
    .setTitle('Using what you learned about conduction, explain why pot handles are often made of wood or plastic instead of metal.')
    .setRequired(true);

  // Q6: Self-assessment (0 pts)
  form.addScaleItem()
    .setTitle('How well do you understand conduction at the particle level?')
    .setHelpText('FOR REFLECTION ONLY')
    .setBounds(1, 5)
    .setLabels('Still confused', 'I get it!');

  Logger.log('Station 1 created: ' + form.getEditUrl());
  return { form: form, editUrl: form.getEditUrl(), publishedUrl: form.getPublishedUrl() };
}

// ============================================================================
// STATION 2 - THREE HEAT TRANSFER METHODS (20 points, ~15 min)
// ============================================================================

function createG8C1W2Station2_() {
  const form = FormApp.create('G8.C1.W2: Station 2 - Three Heat Transfer Methods [20 pts]');

  form.setDescription(
    'THREE HEAT TRANSFER METHODS\n\n' +
    'Resource: Heat transfer comparison cards and diagrams\n\n' +
    'Compare the three ways heat can transfer:\n' +
    '1. CONDUCTION - particles bump into each other (requires contact)\n' +
    '2. CONVECTION - hot fluid rises, cold sinks (requires fluid)\n' +
    '3. RADIATION - electromagnetic waves (no medium needed)\n\n' +
    '---\n' +
    'Time: About 15 minutes | Points: 20\n' +
    'Focus: Compare and contrast heat transfer mechanisms'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Station 2 complete! Move to Station 3.\n\n' +
    'Next: Design your own heat transfer device!'
  );

  // Q1: Convection definition (4 pts - auto)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('How does heat transfer through CONVECTION?')
    .setRequired(true)
    .setPoints(4);

  q1.setChoices([
    q1.createChoice('Hot fluid rises (less dense) and cold fluid sinks (more dense), creating circulation', true),
    q1.createChoice('Particles bump into each other passing energy along', false),
    q1.createChoice('Electromagnetic waves carry energy through space', false),
    q1.createChoice('Heat flows directly from hot to cold without any movement', false)
  ]);

  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Convection happens in fluids (liquids and gases) when hot material rises and cold material sinks, creating circular currents.')
      .build()
  );

  // Q2: Radiation definition (4 pts - auto)
  const q2 = form.addMultipleChoiceItem()
    .setTitle('How can the Sun warm the Earth across the vacuum of space?')
    .setRequired(true)
    .setPoints(4);

  q2.setChoices([
    q2.createChoice('RADIATION - electromagnetic waves can travel through empty space', true),
    q2.createChoice('CONDUCTION - particles in space pass energy along', false),
    q2.createChoice('CONVECTION - hot air rises from the Sun to Earth', false),
    q2.createChoice('The Sun actually can\'t warm Earth through space', false)
  ]);

  q2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Exactly! Radiation is the only heat transfer that works through empty space. The Sun\'s infrared radiation travels 93 million miles through the vacuum to warm Earth!')
      .build()
  );

  // Q3: Identify transfer type (4 pts - auto checkbox)
  const q3 = form.addCheckboxItem()
    .setTitle('Select ALL examples of CONDUCTION:')
    .setRequired(true)
    .setPoints(4);

  q3.setChoices([
    q3.createChoice('A metal spoon getting hot in a pot of soup', true),
    q3.createChoice('Your feet getting cold on a tile floor', true),
    q3.createChoice('Hot air rising from a heater', false),
    q3.createChoice('Feeling warmth from a campfire without touching it', false)
  ]);

  // Q4: Compare methods (5 pts - manual)
  form.addSectionHeaderItem()
    .setTitle('Question 4 [5 points - teacher graded]')
    .setHelpText('RUBRIC:\n' +
      '5 pts: All 3 methods correctly explained with clear differences\n' +
      '4 pts: Most differences identified\n' +
      '3 pts: Basic comparison\n' +
      '2-1 pts: Incomplete');

  const q4 = form.addParagraphTextItem()
    .setTitle('Fill in this comparison: "Conduction requires ___, convection requires ___, but radiation can travel through ___."')
    .setHelpText('Think about what medium (if any) each type needs.')
    .setRequired(true);

  // Q5: Real-world application (3 pts - manual)
  form.addSectionHeaderItem()
    .setTitle('Question 5 [3 points - teacher graded]');

  const q5 = form.addParagraphTextItem()
    .setTitle('A thermos bottle keeps drinks hot (or cold) for hours. Explain how a thermos reduces ALL THREE types of heat transfer.')
    .setRequired(true);

  Logger.log('Station 2 created: ' + form.getEditUrl());
  return { form: form, editUrl: form.getEditUrl(), publishedUrl: form.getPublishedUrl() };
}

// ============================================================================
// STATION 3 - DESIGN A HEAT BARRIER (25 points, ~20 min)
// ============================================================================

function createG8C1W2Station3_() {
  const form = FormApp.create('G8.C1.W2: Station 3 - Design a Heat Barrier [25 pts]');

  form.setDescription(
    'DESIGN A HEAT BARRIER\n\n' +
    'Engineering Challenge: Design a device to MINIMIZE heat transfer\n\n' +
    'Scenario: You need to keep ice cream frozen for 2 hours during\n' +
    'a summer picnic without a cooler or refrigerator.\n\n' +
    'Available materials (choose any combination):\n' +
    '- Aluminum foil (good conductor, reflects radiation)\n' +
    '- Bubble wrap (air pockets, poor conductor)\n' +
    '- Newspaper (insulator, traps air)\n' +
    '- Cardboard box (structure, insulator)\n' +
    '- Plastic bags (waterproof, seals air)\n\n' +
    '---\n' +
    'Time: About 20 minutes | Points: 25\n' +
    'Focus: Apply heat transfer knowledge to engineering design'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Station 3 complete! You have finished all stations.\n\n' +
    'Final step: Complete the Exit Ticket.'
  );

  // Q1: Material selection (5 pts - manual)
  form.addSectionHeaderItem()
    .setTitle('Question 1 [5 points - teacher graded]')
    .setHelpText('RUBRIC:\n' +
      '5 pts: Lists materials + explains heat transfer properties of each\n' +
      '4 pts: Good material choices with reasoning\n' +
      '3 pts: Materials listed, basic reasoning\n' +
      '2-1 pts: Incomplete');

  const q1 = form.addParagraphTextItem()
    .setTitle('Which materials will you use? For EACH material, explain which type of heat transfer it will block (conduction, convection, or radiation).')
    .setRequired(true);

  // Q2: Design description (5 pts - manual)
  form.addSectionHeaderItem()
    .setTitle('Question 2 [5 points - teacher graded]')
    .setHelpText('RUBRIC:\n' +
      '5 pts: Clear layering with scientific reasoning for each layer\n' +
      '4 pts: Good design with reasoning\n' +
      '3 pts: Basic design\n' +
      '2-1 pts: Incomplete');

  const q2 = form.addParagraphTextItem()
    .setTitle('Describe how you will arrange your materials. What goes on the inside? Outside? Why does the order matter?')
    .setRequired(true);

  q2.setValidation(
    FormApp.createParagraphTextValidation()
      .requireTextLengthGreaterThanOrEqualTo(50)
      .build()
  );

  // Q3: Address all three transfer types (5 pts - manual)
  form.addSectionHeaderItem()
    .setTitle('Question 3 [5 points - teacher graded]')
    .setHelpText('RUBRIC:\n' +
      '5 pts: Addresses all 3 types with specific solutions\n' +
      '4 pts: Addresses 2-3 types\n' +
      '3 pts: Addresses 1-2 types\n' +
      '2-1 pts: Incomplete');

  const q3 = form.addParagraphTextItem()
    .setTitle('Explain how your design blocks: 1) Conduction from warm air, 2) Convection currents, 3) Radiation from sunlight.')
    .setRequired(true);

  // Q4: Trade-offs (5 pts - manual)
  form.addSectionHeaderItem()
    .setTitle('Question 4 [5 points - teacher graded]')
    .setHelpText('RUBRIC:\n' +
      '5 pts: Identifies specific trade-off + explains constraint reasoning\n' +
      '4 pts: Good trade-off identified\n' +
      '3 pts: Basic constraint mentioned\n' +
      '2-1 pts: Vague');

  const q4 = form.addParagraphTextItem()
    .setTitle('What TRADE-OFFS did you have to make? What constraints (size, weight, cost) affected your design choices?')
    .setRequired(true);

  // Q5: Prediction (5 pts - manual)
  form.addSectionHeaderItem()
    .setTitle('Question 5 [5 points - teacher graded]')
    .setHelpText('RUBRIC:\n' +
      '5 pts: Specific prediction + identifies potential weakness\n' +
      '4 pts: Good prediction with reasoning\n' +
      '3 pts: Basic prediction\n' +
      '2-1 pts: Incomplete');

  const q5 = form.addParagraphTextItem()
    .setTitle('How long do you predict your ice cream will stay frozen? What is the WEAKEST point of your design (where will heat get in first)?')
    .setRequired(true);

  Logger.log('Station 3 created: ' + form.getEditUrl());
  return { form: form, editUrl: form.getEditUrl(), publishedUrl: form.getPublishedUrl() };
}

// ============================================================================
// EXIT TICKET - HEAT TRANSFER INTEGRATION (23 points, ~15 min)
// Structure: 3 NEW + 2 SPIRAL + 1 INTEGRATION + 1 SEP-1 (23 pts)
// ============================================================================

function createG8C1W2ExitTicket_() {
  const form = FormApp.create('G8.C1.W2: Exit Ticket - Heat Transfer Integration [23 pts]');

  form.setDescription(
    'EXIT TICKET: HEAT TRANSFER INTEGRATION\n\n' +
    'Show what you learned about heat transfer mechanisms!\n\n' +
    'This Exit Ticket covers:\n' +
    '- Conduction, convection, and radiation\n' +
    '- Particle-level explanations\n' +
    '- Real-world applications\n\n' +
    '---\n' +
    'Time: About 15 minutes | Points: 23'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Exit Ticket submitted! Great work on Week 2!\n\n' +
    'Next week: Thermal properties of materials - specific heat and phase changes!'
  );

  // NEW CONTENT
  form.addPageBreakItem()
    .setTitle('[NEW CONTENT] Today\'s Learning')
    .setHelpText('Questions about heat transfer mechanisms.');

  // Q1: Conduction at particle level (4 pts - manual)
  form.addSectionHeaderItem()
    .setTitle('[NEW] Question 1 [4 points - teacher graded]');

  const q1 = form.addParagraphTextItem()
    .setTitle('Explain why metals FEEL colder than wood at the same temperature. Use the word "conduction" and explain at the particle level.')
    .setRequired(true);

  // Q2: Three types (4 pts - auto)
  const q2 = form.addMultipleChoiceItem()
    .setTitle('[NEW] Which type of heat transfer does NOT require a medium (material) to travel through?')
    .setRequired(true)
    .setPoints(4);

  q2.setChoices([
    q2.createChoice('Radiation - electromagnetic waves travel through vacuum', true),
    q2.createChoice('Conduction - particles pass energy by contact', false),
    q2.createChoice('Convection - fluids circulate', false),
    q2.createChoice('All three require a medium', false)
  ]);

  // Q3: Convection (4 pts - auto)
  const q3 = form.addMultipleChoiceItem()
    .setTitle('[NEW] Why does hot air rise?')
    .setRequired(true)
    .setPoints(4);

  q3.setChoices([
    q3.createChoice('Hot air is less dense (particles spread apart), so it floats on denser cold air', true),
    q3.createChoice('Hot air is heavier and pushes cold air down', false),
    q3.createChoice('Hot air contains less matter than cold air', false),
    q3.createChoice('Heat always rises regardless of density', false)
  ]);

  // SPIRAL
  form.addPageBreakItem()
    .setTitle('[SPIRAL] Review from Week 1')
    .setHelpText('Connecting to particle motion and thermal energy.');

  // Q4: Spiral - thermal energy (3 pts - auto)
  const q4 = form.addMultipleChoiceItem()
    .setTitle('[SPIRAL - W1] Temperature measures:')
    .setRequired(true)
    .setPoints(3);

  q4.setChoices([
    q4.createChoice('The average kinetic energy of particles', true),
    q4.createChoice('The total thermal energy of an object', false),
    q4.createChoice('How much heat an object can hold', false),
    q4.createChoice('How cold or hot something feels', false)
  ]);

  // Q5: Spiral - particle motion (3 pts - auto)
  const q5 = form.addMultipleChoiceItem()
    .setTitle('[SPIRAL - W1] When thermal energy is added to a substance, its particles:')
    .setRequired(true)
    .setPoints(3);

  q5.setChoices([
    q5.createChoice('Move faster (gain kinetic energy)', true),
    q5.createChoice('Move slower', false),
    q5.createChoice('Stop moving', false),
    q5.createChoice('Increase in number', false)
  ]);

  // INTEGRATION
  form.addPageBreakItem()
    .setTitle('[INTEGRATION] Connecting Ideas');

  // Q6: Integration (4 pts - manual)
  form.addSectionHeaderItem()
    .setTitle('[INTEGRATION] Question 6 [4 points - teacher graded]');

  const q6 = form.addParagraphTextItem()
    .setTitle('Connect Week 1 and Week 2: How does PARTICLE MOTION explain why heat always flows from hot objects to cold objects (never the reverse)?')
    .setHelpText('Think about what happens when fast-moving particles meet slow-moving particles.')
    .setRequired(true);

  // SEP-1
  form.addPageBreakItem()
    .setTitle('[SEP-1] Asking Scientific Questions');

  // Q7: Question generator (1 pt - manual)
  form.addSectionHeaderItem()
    .setTitle('[SEP-1] Question 7 [1 point - teacher graded]');

  const q7 = form.addParagraphTextItem()
    .setTitle('Write 1 scientific question you have about heat transfer. Use "How does..." or "Why do..."')
    .setRequired(true);

  Logger.log('Exit Ticket created: ' + form.getEditUrl());
  return { form: form, editUrl: form.getEditUrl(), publishedUrl: form.getPublishedUrl() };
}

// ============================================================================
// UTILITY
// ============================================================================

function deployG8C1W2() {
  Logger.log('Starting G8 Cycle 1 Week 2 deployment...\n');
  const results = createAllG8C1W2Forms();
  Logger.log('\n=== DEPLOYMENT COMPLETE ===');
  return results;
}
