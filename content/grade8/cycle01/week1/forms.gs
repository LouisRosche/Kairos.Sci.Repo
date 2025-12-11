/**
 * ============================================================================
 * GRADE 8 - CYCLE 1 WEEK 1: THERMAL ENERGY & PARTICLE MOTION
 * 5 Forms | 100 Points Total | ~75 Minutes
 * ============================================================================
 *
 * NGSS ALIGNMENT:
 *   Primary: MS-PS1-4 - Develop a model that predicts and describes changes
 *            in particle motion, temperature, and state of a pure substance
 *            when thermal energy is added or removed.
 *
 * 3-DIMENSIONAL LEARNING:
 *   SEP-2: Developing and Using Models
 *          ↳ Students model particle motion at different temperatures
 *   DCI PS1.A: Structure and Properties of Matter
 *   CCC Energy and Matter: Thermal energy relates to particle motion
 *
 * LEARNING TARGETS:
 *   1. Explain thermal energy as the total kinetic energy of particles
 *   2. Model particle motion in solids, liquids, and gases
 *   3. Distinguish temperature from thermal energy
 *   4. Predict particle behavior when thermal energy changes
 *
 * PHENOMENON: Why does ice melt faster in a drink than in a cooler?
 *
 * FORMS:
 *   1. Hook - The Melting Ice Race (12 pts + diagnostic, ~10 min)
 *   2. Station 1 - Particle Motion Investigation (20 pts, ~18 min)
 *   3. Station 2 - Temperature vs Thermal Energy (20 pts, ~15 min)
 *   4. Station 3 - Design a Temperature Experiment (25 pts, ~20 min)
 *   5. Exit Ticket - Thermal Energy Basics (23 pts, ~15 min)
 *
 * ============================================================================
 * NOTE: This is Week 1 of Cycle 1 - the FOUNDATION cycle.
 * No spiral questions yet - establishing baseline knowledge.
 * Exit Ticket: 4 NEW + 1 INTEGRATION + 1 SEP-1
 * ============================================================================
 */

// ============================================================================
// MAIN FUNCTION
// ============================================================================

function createAllG8C1W1Forms() {
  Logger.log('================================================');
  Logger.log('G8 CYCLE 1 WEEK 1: THERMAL ENERGY & PARTICLE MOTION');
  Logger.log('================================================\n');

  const forms = {
    hook: createG8C1W1Hook_(),
    station1: createG8C1W1Station1_(),
    station2: createG8C1W1Station2_(),
    station3: createG8C1W1Station3_(),
    exitTicket: createG8C1W1ExitTicket_()
  };

  Logger.log('\n================================================');
  Logger.log('ALL 5 FORMS CREATED - 100 POINTS TOTAL');
  Logger.log('================================================');

  return forms;
}

// ============================================================================
// HOOK - THE MELTING ICE RACE (12 points + diagnostic, ~10 min)
// ============================================================================

function createG8C1W1Hook_() {
  const form = FormApp.create('G8.C1.W1: Hook - The Melting Ice Race [12 pts]');

  form.setDescription(
    'THE MELTING ICE RACE\n\n' +
    'You take three identical ice cubes and place them:\n' +
    '- One in a glass of room-temperature water\n' +
    '- One on a metal spoon at room temperature\n' +
    '- One on a wooden cutting board at room temperature\n\n' +
    'All three start at the same temperature (frozen). The room, water,\n' +
    'spoon, and board are all at the same temperature (about 70F/21C).\n\n' +
    'But they melt at VERY different rates. Why?\n\n' +
    '---\n' +
    'Time: About 10 minutes | Points: 12 (+ 1 self-reflection question)\n' +
    'This is CYCLE 1 - We are building your foundation knowledge!'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Hook submitted! You are ready for Station 1.\n\n' +
    'Next: Use the PhET States of Matter simulation to explore particle motion.\n' +
    'Link: https://phet.colorado.edu/en/simulations/states-of-matter'
  );

  // Q1: Prior knowledge (3 pts - manual grading)
  form.addSectionHeaderItem()
    .setTitle('Question 1 [3 points - teacher graded]')
    .setHelpText('RUBRIC:\n' +
      '3 pts: Mentions heat/energy transfer + materials\n' +
      '2 pts: Basic understanding\n' +
      '1 pt: Minimal response');

  const q1 = form.addParagraphTextItem()
    .setTitle('What do you already know about why things melt at different rates? Why might metal feel colder than wood even at the same temperature?')
    .setHelpText('Share what you know from experience or previous learning.')
    .setRequired(true);

  q1.setValidation(
    FormApp.createParagraphTextValidation()
      .requireTextLengthGreaterThanOrEqualTo(20)
      .build()
  );

  // Q2: Prediction (3 pts - manual grading)
  form.addSectionHeaderItem()
    .setTitle('Question 2 [3 points - teacher graded]')
    .setHelpText('RUBRIC:\n' +
      '3 pts: Clear ranking with reasoning\n' +
      '2 pts: Ranking with basic reasoning\n' +
      '1 pt: Ranking only');

  const q2 = form.addParagraphTextItem()
    .setTitle('Predict: Which ice cube will melt FASTEST and which will melt SLOWEST? Explain your reasoning.')
    .setHelpText('Rank: water, metal spoon, wooden board. Then explain WHY.')
    .setRequired(true);

  // Q3: Observation question (3 pts - manual)
  form.addSectionHeaderItem()
    .setTitle('Question 3 [3 points - teacher graded]')
    .setHelpText('RUBRIC:\n' +
      '3 pts: Detailed observation + curiosity\n' +
      '2 pts: Basic observation\n' +
      '1 pt: Minimal');

  const q3 = form.addParagraphTextItem()
    .setTitle('Watch the video comparing ice melting on different surfaces. Describe what you observe. What surprises you?')
    .setRequired(true);

  // Q4: Prior concept check (3 pts - auto-graded)
  const q4 = form.addMultipleChoiceItem()
    .setTitle('Which statement best describes what HEAT is?')
    .setRequired(true)
    .setPoints(3);

  q4.setChoices([
    q4.createChoice('Heat is energy moving from a warmer object to a cooler object', true),
    q4.createChoice('Heat is a substance that flows from hot to cold', false),
    q4.createChoice('Heat is the same thing as temperature', false),
    q4.createChoice('Heat is cold leaving an object', false)
  ]);

  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Heat is thermal energy in TRANSFER - it flows from warmer objects to cooler ones.')
      .build()
  );

  q4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Common misconception! Heat is not a substance and is not the same as temperature. Heat is ENERGY being transferred from warmer to cooler objects.')
      .build()
  );

  // Q5: Confidence (0 pts - diagnostic)
  form.addScaleItem()
    .setTitle('How confident are you about your understanding of heat and temperature?')
    .setHelpText('FOR REFLECTION ONLY - does NOT affect your grade. Be honest!')
    .setBounds(1, 5)
    .setLabels('Not confident', 'Very confident');

  Logger.log('Hook created: ' + form.getEditUrl());
  return { form: form, editUrl: form.getEditUrl(), publishedUrl: form.getPublishedUrl() };
}

// ============================================================================
// STATION 1 - PARTICLE MOTION INVESTIGATION (20 points, ~18 min)
// ============================================================================

function createG8C1W1Station1_() {
  const form = FormApp.create('G8.C1.W1: Station 1 - Particle Motion Investigation [20 pts]');

  form.setDescription(
    'PARTICLE MOTION INVESTIGATION\n\n' +
    'Resource: PhET States of Matter Simulation\n' +
    'https://phet.colorado.edu/en/simulations/states-of-matter\n\n' +
    'Your Mission: Discover how particle motion changes with temperature.\n' +
    'Observe particles in solids, liquids, and gases.\n\n' +
    '---\n' +
    'Time: About 18 minutes | Points: 20\n' +
    'Focus: Model particle behavior at different temperatures'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Station 1 complete! Move to Station 2.\n\n' +
    'Next: Distinguish between temperature and thermal energy.'
  );

  // Q1: Solid particle motion (4 pts - auto)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('In the simulation, how do particles move in a SOLID?')
    .setRequired(true)
    .setPoints(4);

  q1.setChoices([
    q1.createChoice('They vibrate in place but stay in fixed positions', true),
    q1.createChoice('They move freely in all directions', false),
    q1.createChoice('They do not move at all', false),
    q1.createChoice('They slide past each other easily', false)
  ]);

  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! In solids, particles vibrate in fixed positions. They have kinetic energy but are held in place by strong forces between particles.')
      .build()
  );

  // Q2: Temperature increase effect (4 pts - auto)
  const q2 = form.addMultipleChoiceItem()
    .setTitle('When you INCREASE the temperature in the simulation, what happens to particle motion?')
    .setRequired(true)
    .setPoints(4);

  q2.setChoices([
    q2.createChoice('Particles move faster (more kinetic energy)', true),
    q2.createChoice('Particles move slower', false),
    q2.createChoice('Particles stop moving', false),
    q2.createChoice('The number of particles increases', false)
  ]);

  q2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Exactly! Temperature measures the AVERAGE kinetic energy of particles. Higher temperature = faster particle motion.')
      .build()
  );

  // Q3: Model explanation (5 pts - manual)
  form.addSectionHeaderItem()
    .setTitle('Question 3 [5 points - teacher graded]')
    .setHelpText('RUBRIC:\n' +
      '5 pts: All 3 states + motion differences + energy explanation\n' +
      '4 pts: All 3 states with motion differences\n' +
      '3 pts: Basic comparison\n' +
      '2 pts: Partial\n' +
      '1 pt: Minimal');

  const q3 = form.addParagraphTextItem()
    .setTitle('Compare particle motion in solids, liquids, and gases. How does the motion relate to the energy of the particles?')
    .setRequired(true);

  q3.setValidation(
    FormApp.createParagraphTextValidation()
      .requireTextLengthGreaterThanOrEqualTo(50)
      .build()
  );

  // Q4: Absolute zero concept (4 pts - auto)
  const q4 = form.addMultipleChoiceItem()
    .setTitle('What happens to particle motion at "absolute zero" (the coldest possible temperature)?')
    .setRequired(true)
    .setPoints(4);

  q4.setChoices([
    q4.createChoice('Particles have minimum possible motion (nearly stop vibrating)', true),
    q4.createChoice('Particles move fastest at absolute zero', false),
    q4.createChoice('Particles disappear at absolute zero', false),
    q4.createChoice('There is no such thing as absolute zero', false)
  ]);

  // Q5: Reflection (3 pts - manual)
  form.addSectionHeaderItem()
    .setTitle('Question 5 [3 points - teacher graded]');

  const q5 = form.addParagraphTextItem()
    .setTitle('How does this simulation help you understand why ice melts at different rates on different materials?')
    .setRequired(true);

  // Q6: Self-assessment (0 pts)
  form.addScaleItem()
    .setTitle('How well do you understand the relationship between temperature and particle motion?')
    .setHelpText('FOR REFLECTION ONLY')
    .setBounds(1, 5)
    .setLabels('Still confused', 'I get it!');

  Logger.log('Station 1 created: ' + form.getEditUrl());
  return { form: form, editUrl: form.getEditUrl(), publishedUrl: form.getPublishedUrl() };
}

// ============================================================================
// STATION 2 - TEMPERATURE VS THERMAL ENERGY (20 points, ~15 min)
// ============================================================================

function createG8C1W1Station2_() {
  const form = FormApp.create('G8.C1.W1: Station 2 - Temperature vs Thermal Energy [20 pts]');

  form.setDescription(
    'TEMPERATURE VS THERMAL ENERGY\n\n' +
    'Resource: Data tables comparing temperature and thermal energy\n\n' +
    'Key Question: A cup of hot coffee (200mL at 80C) and a bathtub\n' +
    'of warm water (200L at 40C) - which has more thermal energy?\n\n' +
    'The coffee is HOTTER, but which has more TOTAL energy?\n\n' +
    '---\n' +
    'Time: About 15 minutes | Points: 20\n' +
    'Focus: Distinguish temperature from thermal energy'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Station 2 complete! Move to Station 3.\n\n' +
    'Next: Design your own temperature investigation!'
  );

  // Q1: Coffee vs bathtub (4 pts - auto)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('Which has MORE THERMAL ENERGY: hot coffee (200mL at 80C) or a warm bathtub (200L at 40C)?')
    .setRequired(true)
    .setPoints(4);

  q1.setChoices([
    q1.createChoice('The warm bathtub - it has 1000x more water', true),
    q1.createChoice('The hot coffee - it has a higher temperature', false),
    q1.createChoice('They have the same thermal energy', false),
    q1.createChoice('Cannot be determined without more information', false)
  ]);

  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Thermal energy depends on BOTH temperature AND mass. The bathtub has 1000x more water, so it has much more total thermal energy despite being cooler.')
      .build()
  );

  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Remember: Thermal energy = total kinetic energy of ALL particles. Temperature measures AVERAGE energy per particle. The bathtub has way more particles!')
      .build()
  );

  // Q2: Temperature definition (4 pts - auto)
  const q2 = form.addMultipleChoiceItem()
    .setTitle('What does TEMPERATURE actually measure?')
    .setRequired(true)
    .setPoints(4);

  q2.setChoices([
    q2.createChoice('The average kinetic energy of particles', true),
    q2.createChoice('The total thermal energy of an object', false),
    q2.createChoice('How much heat an object contains', false),
    q2.createChoice('How hot or cold something feels', false)
  ]);

  // Q3: Thermal energy definition (4 pts - auto)
  const q3 = form.addMultipleChoiceItem()
    .setTitle('What does THERMAL ENERGY depend on?')
    .setRequired(true)
    .setPoints(4);

  q3.setChoices([
    q3.createChoice('Both the mass of the substance AND its temperature', true),
    q3.createChoice('Only the temperature of the substance', false),
    q3.createChoice('Only the mass of the substance', false),
    q3.createChoice('The type of material only', false)
  ]);

  // Q4: Application (5 pts - manual)
  form.addSectionHeaderItem()
    .setTitle('Question 4 [5 points - teacher graded]')
    .setHelpText('RUBRIC:\n' +
      '5 pts: Correct answer + explains using temperature vs thermal energy\n' +
      '4 pts: Correct with basic reasoning\n' +
      '3 pts: Partial understanding\n' +
      '2-1 pts: Incomplete');

  const q4 = form.addParagraphTextItem()
    .setTitle('An iceberg at 0C and an ice cube at 0C have the same temperature. Do they have the same thermal energy? Explain using what you learned about temperature and thermal energy.')
    .setRequired(true);

  q4.setValidation(
    FormApp.createParagraphTextValidation()
      .requireTextLengthGreaterThanOrEqualTo(50)
      .build()
  );

  // Q5: Misconception check (3 pts - auto)
  const q5 = form.addMultipleChoiceItem()
    .setTitle('A student says: "Temperature and heat are the same thing." Is this correct?')
    .setRequired(true)
    .setPoints(3);

  q5.setChoices([
    q5.createChoice('No - temperature measures particle energy; heat is energy being transferred', true),
    q5.createChoice('Yes - temperature and heat mean the same thing', false),
    q5.createChoice('No - heat is colder than temperature', false),
    q5.createChoice('Yes - they are different words for the same concept', false)
  ]);

  q5.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Temperature is a MEASUREMENT of average kinetic energy. Heat is thermal energy IN TRANSFER from hot to cold. They are related but NOT the same!')
      .build()
  );

  Logger.log('Station 2 created: ' + form.getEditUrl());
  return { form: form, editUrl: form.getEditUrl(), publishedUrl: form.getPublishedUrl() };
}

// ============================================================================
// STATION 3 - DESIGN A TEMPERATURE EXPERIMENT (25 points, ~20 min)
// ============================================================================

function createG8C1W1Station3_() {
  const form = FormApp.create('G8.C1.W1: Station 3 - Design a Temperature Experiment [25 pts]');

  form.setDescription(
    'DESIGN A TEMPERATURE EXPERIMENT\n\n' +
    'Challenge: Design an investigation to test how a variable affects\n' +
    'how fast ice melts or how fast water heats up.\n\n' +
    'Possible variables to investigate:\n' +
    '- Mass of ice or water\n' +
    '- Surface area exposed\n' +
    '- Type of material in contact\n' +
    '- Starting temperature\n\n' +
    '---\n' +
    'Time: About 20 minutes | Points: 25\n' +
    'Focus: Design a controlled investigation'
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

  // Q1: Research question (5 pts - manual)
  form.addSectionHeaderItem()
    .setTitle('Question 1 [5 points - teacher graded]')
    .setHelpText('RUBRIC:\n' +
      '5 pts: Clear, testable question with IV and DV identified\n' +
      '4 pts: Good question, variables implied\n' +
      '3 pts: Basic testable question\n' +
      '2-1 pts: Question not fully testable');

  const q1 = form.addParagraphTextItem()
    .setTitle('Write your research question. What variable will you test (independent variable) and what will you measure (dependent variable)?')
    .setHelpText('Example: "How does the mass of ice affect how long it takes to melt completely?"')
    .setRequired(true);

  // Q2: Hypothesis (5 pts - manual)
  form.addSectionHeaderItem()
    .setTitle('Question 2 [5 points - teacher graded]')
    .setHelpText('RUBRIC:\n' +
      '5 pts: If-then-because format with scientific reasoning\n' +
      '4 pts: Good prediction with reasoning\n' +
      '3 pts: Basic prediction\n' +
      '2-1 pts: Incomplete');

  const q2 = form.addParagraphTextItem()
    .setTitle('Write your hypothesis. Use "If... then... because..." format.')
    .setHelpText('Include your reasoning based on what you learned about thermal energy.')
    .setRequired(true);

  // Q3: Procedure (5 pts - manual)
  form.addSectionHeaderItem()
    .setTitle('Question 3 [5 points - teacher graded]')
    .setHelpText('RUBRIC:\n' +
      '5 pts: Clear steps + identifies controlled variables\n' +
      '4 pts: Clear steps, some controls mentioned\n' +
      '3 pts: Basic procedure\n' +
      '2-1 pts: Incomplete');

  const q3 = form.addParagraphTextItem()
    .setTitle('List the steps of your experiment. What will you keep the SAME (controlled variables) and what will you CHANGE (independent variable)?')
    .setRequired(true);

  q3.setValidation(
    FormApp.createParagraphTextValidation()
      .requireTextLengthGreaterThanOrEqualTo(75)
      .build()
  );

  // Q4: Connection to particle motion (5 pts - manual)
  form.addSectionHeaderItem()
    .setTitle('Question 4 [5 points - teacher graded]')
    .setHelpText('RUBRIC:\n' +
      '5 pts: Connects design to particle motion concepts\n' +
      '4 pts: Basic connection made\n' +
      '3 pts: Mentions particles\n' +
      '2-1 pts: No connection');

  const q4 = form.addParagraphTextItem()
    .setTitle('How does your experiment connect to what you learned about particle motion and thermal energy?')
    .setRequired(true);

  // Q5: Prediction (5 pts - manual)
  form.addSectionHeaderItem()
    .setTitle('Question 5 [5 points - teacher graded]')
    .setHelpText('RUBRIC:\n' +
      '5 pts: Specific prediction with scientific reasoning\n' +
      '4 pts: Reasonable prediction with some reasoning\n' +
      '3 pts: Basic prediction\n' +
      '2-1 pts: Incomplete');

  const q5 = form.addParagraphTextItem()
    .setTitle('Predict your results. What do you expect to happen and why?')
    .setRequired(true);

  Logger.log('Station 3 created: ' + form.getEditUrl());
  return { form: form, editUrl: form.getEditUrl(), publishedUrl: form.getPublishedUrl() };
}

// ============================================================================
// EXIT TICKET - THERMAL ENERGY BASICS (23 points, ~15 min)
// ============================================================================

function createG8C1W1ExitTicket_() {
  const form = FormApp.create('G8.C1.W1: Exit Ticket - Thermal Energy Basics [23 pts]');

  form.setDescription(
    'EXIT TICKET: THERMAL ENERGY BASICS\n\n' +
    'Show what you learned today about thermal energy and particle motion!\n\n' +
    'This Exit Ticket covers:\n' +
    '- Particle motion in different states of matter\n' +
    '- Temperature vs thermal energy\n' +
    '- Energy transfer\n\n' +
    'NOTE: This is Week 1 - no spiral questions yet.\n' +
    'We are building your foundation!\n\n' +
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
    'Exit Ticket submitted! Great work on Week 1!\n\n' +
    'Next week: Heat transfer mechanisms - conduction, convection, radiation.\n' +
    'Why do some materials feel cold to touch even at room temperature?'
  );

  // Q1: Particle motion explanation (5 pts - manual)
  form.addSectionHeaderItem()
    .setTitle('[NEW] Question 1 [5 points - teacher graded]')
    .setHelpText('RUBRIC:\n' +
      '5 pts: Explains particles + motion + energy relationship\n' +
      '4 pts: Good explanation, some detail missing\n' +
      '3 pts: Basic understanding\n' +
      '2-1 pts: Incomplete');

  const q1 = form.addParagraphTextItem()
    .setTitle('Explain in your own words: What IS thermal energy? How is it related to particle motion?')
    .setRequired(true);

  q1.setValidation(
    FormApp.createParagraphTextValidation()
      .requireTextLengthGreaterThanOrEqualTo(50)
      .build()
  );

  // Q2: Temperature vs thermal energy (4 pts - auto)
  const q2 = form.addMultipleChoiceItem()
    .setTitle('[NEW] A swimming pool at 25C and a cup of water at 25C have the same temperature. Which has more thermal energy?')
    .setRequired(true)
    .setPoints(4);

  q2.setChoices([
    q2.createChoice('The swimming pool - it has much more mass', true),
    q2.createChoice('The cup of water - it is more concentrated', false),
    q2.createChoice('They have exactly the same thermal energy', false),
    q2.createChoice('Cannot be determined', false)
  ]);

  // Q3: Particle motion in states (4 pts - auto)
  const q3 = form.addMultipleChoiceItem()
    .setTitle('[NEW] In which state of matter do particles have the MOST kinetic energy (at the same temperature)?')
    .setRequired(true)
    .setPoints(4);

  q3.setChoices([
    q3.createChoice('Gas - particles move freely and rapidly', true),
    q3.createChoice('Liquid - particles slide past each other', false),
    q3.createChoice('Solid - particles are tightly packed', false),
    q3.createChoice('All states have the same kinetic energy at the same temperature', false)
  ]);

  // Q4: Application (5 pts - manual)
  form.addSectionHeaderItem()
    .setTitle('[NEW] Question 4 [5 points - teacher graded]')
    .setHelpText('RUBRIC:\n' +
      '5 pts: Correct answer with particle-level explanation\n' +
      '4 pts: Correct with basic reasoning\n' +
      '3 pts: Partial understanding\n' +
      '2-1 pts: Incomplete');

  const q4 = form.addParagraphTextItem()
    .setTitle('Ice at 0C is placed in water at 20C. Explain at the PARTICLE LEVEL what happens to the ice and why.')
    .setRequired(true);

  // Q5: Integration (3 pts - manual)
  form.addSectionHeaderItem()
    .setTitle('[INTEGRATION] Question 5 [3 points - teacher graded]');

  const q5 = form.addParagraphTextItem()
    .setTitle('Connect what you learned: How does understanding particle motion help explain why ice melts faster in water than in air, even if both are at the same temperature?')
    .setRequired(true);

  // Q6: SEP-1 Question generator (2 pts - manual)
  form.addSectionHeaderItem()
    .setTitle('[SEP-1] Question 6 [2 points - teacher graded]')
    .setHelpText('RUBRIC:\n' +
      '2 pts: 2 testable HOW/WHY questions\n' +
      '1 pt: 1 testable question\n' +
      '0 pts: No testable questions');

  const q6 = form.addParagraphTextItem()
    .setTitle('Write 2 scientific questions about thermal energy that you would like to investigate. Use "How does..." or "Why does..."')
    .setRequired(true);

  Logger.log('Exit Ticket created: ' + form.getEditUrl());
  return { form: form, editUrl: form.getEditUrl(), publishedUrl: form.getPublishedUrl() };
}

// ============================================================================
// UTILITY
// ============================================================================

function deployG8C1W1() {
  Logger.log('Starting G8 Cycle 1 Week 1 deployment...\n');
  const results = createAllG8C1W1Forms();
  Logger.log('\n=== DEPLOYMENT COMPLETE ===');
  return results;
}
