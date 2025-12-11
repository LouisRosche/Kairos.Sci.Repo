/**
 * ============================================================================
 * GRADE 8 - CYCLE 1 WEEK 4: State Changes & Phase Transitions
 * 5 Forms | 100 Points Total | ~75 Minutes
 * ============================================================================
 *
 * Phenomenon: "Why does a balloon shrink when you put it in the freezer?"
 *
 * NGSS Standards:
 * - MS-PS1-4: Develop a model that predicts and describes changes in particle
 *             motion, temperature, and state of a pure substance when thermal
 *             energy is added or removed
 *
 * Three-Dimensional Learning:
 * - SEP-2: Developing and Using Models (phase changes)
 * - DCI: PS1.A Structure and Properties of Matter (states of matter)
 * - CCC-2: Cause and Effect (energy → phase change)
 * - CCC-3: Scale, Proportion, and Quantity (energy during phase change)
 *
 * Spiral Review: W1 particle motion, W2 heat transfer, W3 thermal properties
 *
 * ============================================================================
 */

// ============================================================================
// CONFIGURATION
// ============================================================================

const G8_C1_W4_CONFIG = {
  grade: 8,
  cycle: 1,
  week: 4,
  topic: 'State Changes & Phase Transitions',
  phenomenon: 'Why does a balloon shrink when you put it in the freezer?',

  points: {
    hook: 12,
    station1: 20,
    station2: 20,
    station3: 25,
    exitTicket: 23,
    total: 100
  },

  misconceptions: [
    {
      id: 'temp-always-changes',
      description: 'Temperature always rises when you add heat',
      correctUnderstanding: 'During phase changes, added energy breaks bonds instead of raising temperature',
      targetedIn: ['s1_q3', 'exit_q2']
    },
    {
      id: 'gas-particles-expand',
      description: 'Gas particles expand when heated (particles get bigger)',
      correctUnderstanding: 'Gas particles move faster and spread farther apart, but particle size stays the same',
      targetedIn: ['hook_q3', 's1_q5']
    }
  ],

  spiralTargets: {
    w1: 'Particle motion and temperature',
    w2: 'Heat transfer mechanisms',
    w3: 'Specific heat and thermal properties'
  },

  resources: {
    phet: 'https://phet.colorado.edu/en/simulations/states-of-matter'
  }
};

// ============================================================================
// MAIN FUNCTION
// ============================================================================

/**
 * Creates all 5 forms for G8 C1 W4
 * @returns {Object} Map of form names to Form objects
 */
function createAllG8C1W4Forms() {
  const forms = {
    hook: createG8C1W4Hook_(),
    station1: createG8C1W4Station1_(),
    station2: createG8C1W4Station2_(),
    station3: createG8C1W4Station3_(),
    exitTicket: createG8C1W4ExitTicket_()
  };

  Logger.log('G8 C1 W4 Forms created successfully');
  Logger.log('Total points: ' + G8_C1_W4_CONFIG.points.total);

  return forms;
}

// ============================================================================
// HOOK: The Shrinking Balloon Mystery (12 points, ~10 minutes)
// ============================================================================

/**
 * Hook form exploring gas behavior at different temperatures
 * Focus: Why do gases behave differently at different temperatures?
 */
function createG8C1W4Hook_() {
  const form = FormApp.create('G8.C1.W4: Hook - The Shrinking Balloon Mystery');
  form.setDescription(
    'Phenomenon: Why does a balloon shrink when you put it in the freezer?\n\n' +
    'OBSERVATION:\n' +
    '• A balloon filled with air at room temperature (20°C)\n' +
    '• Same balloon placed in freezer (-18°C) for 30 minutes\n' +
    '• Result: The balloon shrinks significantly but doesn\'t pop\n' +
    '• When brought back to room temperature, it returns to original size\n\n' +
    'What\'s happening to the air inside the balloon?'
  );

  // Q1: Connecting to W1 (2 pts)
  const q1 = form.addMultipleChoiceItem();
  q1.setTitle('From Week 1: What happens to particle motion when temperature decreases?')
    .setHelpText('ID: g8_c1_w4_hook_q1 | Points: 2')
    .setRequired(true)
    .setChoices([
      q1.createChoice('Particles move slower (less kinetic energy)', true),
      q1.createChoice('Particles move faster', false),
      q1.createChoice('Particles stop moving completely', false),
      q1.createChoice('Particle motion doesn\'t change with temperature', false)
    ]);
  q1.setPoints(2);

  // Q2: Initial explanation (3 pts)
  const q2 = form.addMultipleChoiceItem();
  q2.setTitle('When air particles in the balloon slow down in the freezer, what happens to the space they take up?')
    .setHelpText('ID: g8_c1_w4_hook_q2 | Points: 3')
    .setRequired(true)
    .setChoices([
      q2.createChoice('Slower particles spread out less, taking up less space → balloon shrinks', true),
      q2.createChoice('Slower particles take up more space', false),
      q2.createChoice('Particle speed doesn\'t affect the space they take up', false),
      q2.createChoice('The air escapes through the balloon', false)
    ]);
  q2.setPoints(3);

  // Q3: Misconception targeting (3 pts)
  const q3 = form.addMultipleChoiceItem();
  q3.setTitle('A student says: "The balloon shrinks because the air particles themselves get smaller in the cold." Is this correct?')
    .setHelpText('ID: g8_c1_w4_hook_q3 | Points: 3 | Targets misconception: particles expand/contract')
    .setRequired(true)
    .setChoices([
      q3.createChoice('No - particle SIZE stays the same; they just move slower and spread out less', true),
      q3.createChoice('Yes - cold makes particles smaller', false),
      q3.createChoice('Yes - particles shrink when they slow down', false),
      q3.createChoice('No - the balloon material shrinks, not the air', false)
    ]);
  q3.setPoints(3);

  // Q4: Prediction (2 pts)
  const q4 = form.addMultipleChoiceItem();
  q4.setTitle('If we cooled the balloon enough, the air might change state. What would happen to air at about -200°C?')
    .setHelpText('ID: g8_c1_w4_hook_q4 | Points: 2')
    .setRequired(true)
    .setChoices([
      q4.createChoice('Air would become liquid (gas → liquid phase change)', true),
      q4.createChoice('Air would disappear completely', false),
      q4.createChoice('Air would turn into a different substance', false),
      q4.createChoice('Nothing - air always stays a gas', false)
    ]);
  q4.setPoints(2);

  // Q5: Phenomenon focus (2 pts)
  const q5 = form.addParagraphTextItem();
  q5.setTitle('Today we\'ll explore phase changes (solid ↔ liquid ↔ gas). Write ONE question you have about how adding or removing energy causes matter to change state.')
    .setHelpText('ID: g8_c1_w4_hook_q5 | Points: 2 | Rubric: 2=Relevant question about phase changes and energy, 1=Related question, 0=Off-topic')
    .setRequired(true);

  configFormSettings_(form, 'hook');
  return form;
}

// ============================================================================
// STATION 1: Phase Change Investigation (20 points, ~15 minutes)
// ============================================================================

/**
 * Station 1: PhET States of Matter + heating/cooling curves
 * Focus: Model particle behavior during phase changes
 * Spiral: Thermal properties from W3
 */
function createG8C1W4Station1_() {
  const form = FormApp.create('G8.C1.W4: Station 1 - Phase Change Investigation');
  form.setDescription(
    'Station 1: Phase Change Investigation (20 points)\n\n' +
    'Use the PhET States of Matter simulation to investigate what happens at the ' +
    'particle level during phase changes.\n\n' +
    'HEATING CURVE PATTERN:\n' +
    '• Solid: Particles vibrate in fixed positions\n' +
    '• Melting (solid→liquid): Temperature STAYS CONSTANT while bonds break\n' +
    '• Liquid: Particles slide past each other\n' +
    '• Boiling (liquid→gas): Temperature STAYS CONSTANT while bonds break\n' +
    '• Gas: Particles move freely with high speed\n\n' +
    'PhET Simulation: States of Matter\n\n' +
    '⏱️ Time: ~15 minutes'
  );

  // Q1: Particle arrangement (3 pts)
  const q1 = form.addMultipleChoiceItem();
  q1.setTitle('In the simulation, how are particles arranged differently in solid vs. liquid vs. gas?')
    .setHelpText('ID: g8_c1_w4_s1_q1 | Points: 3')
    .setRequired(true)
    .setChoices([
      q1.createChoice('Solid: fixed positions, close; Liquid: moving but close; Gas: far apart, fast moving', true),
      q1.createChoice('All three states have the same particle arrangement', false),
      q1.createChoice('Solid: far apart; Liquid: closer; Gas: touching', false),
      q1.createChoice('Only the particle color changes between states', false)
    ]);
  q1.setPoints(3);

  // Q2: Energy during melting (4 pts)
  const q2 = form.addMultipleChoiceItem();
  q2.setTitle('When you add heat to ice at 0°C, the temperature stays at 0°C until all the ice melts. Where does the added energy go?')
    .setHelpText('ID: g8_c1_w4_s1_q2 | Points: 4')
    .setRequired(true)
    .setChoices([
      q2.createChoice('The energy breaks bonds between water molecules, allowing them to move more freely', true),
      q2.createChoice('The energy escapes into the air', false),
      q2.createChoice('The energy is stored in the container', false),
      q2.createChoice('Ice doesn\'t actually absorb energy', false)
    ]);
  q2.setPoints(4);

  // Q3: Misconception targeting (4 pts)
  const q3 = form.addMultipleChoiceItem();
  q3.setTitle('A student says: "If I keep adding heat, temperature MUST keep increasing." When is this NOT true?')
    .setHelpText('ID: g8_c1_w4_s1_q3 | Points: 4 | Targets temperature misconception')
    .setRequired(true)
    .setChoices([
      q3.createChoice('During phase changes (melting/boiling), energy breaks bonds instead of raising temperature', true),
      q3.createChoice('This is always true - heat always raises temperature', false),
      q3.createChoice('Temperature never increases when you add heat', false),
      q3.createChoice('Only during the first few minutes of heating', false)
    ]);
  q3.setPoints(4);

  // Q4: Spiral W3 - Specific heat connection (3 pts)
  const q4 = form.addMultipleChoiceItem();
  q4.setTitle('SPIRAL (W3): Water has a high specific heat. How does this relate to the energy needed for boiling?')
    .setHelpText('ID: g8_c1_w4_s1_q4 | Points: 3 | Connects to W3 specific heat')
    .setRequired(true)
    .setChoices([
      q4.createChoice('High specific heat means lots of energy to raise temperature + MORE energy needed to break all bonds', true),
      q4.createChoice('High specific heat means water boils quickly', false),
      q4.createChoice('Specific heat doesn\'t affect boiling', false),
      q4.createChoice('Water can\'t actually boil due to high specific heat', false)
    ]);
  q4.setPoints(3);

  // Q5: Particle behavior in gas (4 pts)
  const q5 = form.addMultipleChoiceItem();
  q5.setTitle('When water boils, particles escape as gas. At the particle level, what changed?')
    .setHelpText('ID: g8_c1_w4_s1_q5 | Points: 4')
    .setRequired(true)
    .setChoices([
      q5.createChoice('Particles gained enough energy to completely break free from neighboring particles', true),
      q5.createChoice('Particles changed into a different type of particle', false),
      q5.createChoice('Particles expanded to become larger', false),
      q5.createChoice('Particles disappeared and reappeared as gas', false)
    ]);
  q5.setPoints(4);

  // Q6: Heating curve analysis (2 pts)
  const q6 = form.addParagraphTextItem();
  q6.setTitle('Explain why a heating curve has FLAT sections (constant temperature) during phase changes. Use the concept of energy and particle bonds in your answer.')
    .setHelpText('ID: g8_c1_w4_s1_q6 | Points: 2 | Rubric: 2=Explains energy goes to breaking bonds not increasing motion, 1=Partial explanation, 0=Incorrect')
    .setRequired(true);

  configFormSettings_(form, 'station1');
  return form;
}

// ============================================================================
// STATION 2: Phase Diagram Analysis (20 points, ~15 minutes)
// ============================================================================

/**
 * Station 2: Phase diagrams + substance comparison
 * Focus: Interpret phase diagrams to predict state changes
 */
function createG8C1W4Station2_() {
  const form = FormApp.create('G8.C1.W4: Station 2 - Phase Diagram Analysis');
  form.setDescription(
    'Station 2: Phase Diagram Analysis (20 points)\n\n' +
    'A PHASE DIAGRAM shows which state matter is in at different combinations ' +
    'of temperature and pressure.\n\n' +
    'KEY POINTS on Water\'s Phase Diagram:\n' +
    '• Below 0°C (at normal pressure): SOLID (ice)\n' +
    '• 0°C to 100°C (at normal pressure): LIQUID (water)\n' +
    '• Above 100°C (at normal pressure): GAS (steam)\n' +
    '• At higher pressure: Higher boiling point\n' +
    '• At lower pressure: Lower boiling point\n\n' +
    '⏱️ Time: ~15 minutes'
  );

  // Q1: Reading phase diagrams (4 pts)
  const q1 = form.addMultipleChoiceItem();
  q1.setTitle('At the top of a mountain (lower air pressure), water boils at 95°C instead of 100°C. What does this tell you about boiling point and pressure?')
    .setHelpText('ID: g8_c1_w4_s2_q1 | Points: 4')
    .setRequired(true)
    .setChoices([
      q1.createChoice('Lower pressure = lower boiling point (particles escape more easily)', true),
      q1.createChoice('Pressure has no effect on boiling point', false),
      q1.createChoice('Higher altitude means hotter temperatures', false),
      q1.createChoice('Water can\'t boil on mountains', false)
    ]);
  q1.setPoints(4);

  // Q2: Pressure cooker application (4 pts)
  const q2 = form.addMultipleChoiceItem();
  q2.setTitle('A pressure cooker increases pressure inside. How does this affect cooking?')
    .setHelpText('ID: g8_c1_w4_s2_q2 | Points: 4')
    .setRequired(true)
    .setChoices([
      q2.createChoice('Higher pressure raises boiling point, so water stays liquid at higher temperatures, cooking food faster', true),
      q2.createChoice('Higher pressure makes water boil at lower temperature', false),
      q2.createChoice('Pressure doesn\'t affect cooking temperature', false),
      q2.createChoice('The pressure physically crushes the food to cook it', false)
    ]);
  q2.setPoints(4);

  // Q3: Spiral W1/W2 - Connecting energy and particles (4 pts)
  const q3 = form.addMultipleChoiceItem();
  q3.setTitle('SPIRAL (W1/W2): Why does increasing pressure raise the boiling point? Think about what particles need to do to become a gas.')
    .setHelpText('ID: g8_c1_w4_s2_q3 | Points: 4 | Connects to W1/W2')
    .setRequired(true)
    .setChoices([
      q3.createChoice('Higher pressure pushes particles together, so they need MORE energy (higher temperature) to escape as gas', true),
      q3.createChoice('Pressure adds energy to the particles', false),
      q3.createChoice('Pressure makes particles smaller', false),
      q3.createChoice('Pressure has no effect on particle motion', false)
    ]);
  q3.setPoints(4);

  // Q4: Sublimation (4 pts)
  const q4 = form.addMultipleChoiceItem();
  q4.setTitle('Dry ice (solid CO₂) "skips" the liquid phase and goes directly from solid to gas at normal pressure. This is called SUBLIMATION. Why might this happen?')
    .setHelpText('ID: g8_c1_w4_s2_q4 | Points: 4')
    .setRequired(true)
    .setChoices([
      q4.createChoice('CO₂\'s phase diagram shows that at normal pressure, the liquid phase doesn\'t exist - solid goes directly to gas', true),
      q4.createChoice('CO₂ is a special substance that doesn\'t follow normal rules', false),
      q4.createChoice('The liquid phase is invisible', false),
      q4.createChoice('Sublimation only happens with cold substances', false)
    ]);
  q4.setPoints(4);

  // Q5: Application analysis (4 pts)
  const q5 = form.addParagraphTextItem();
  q5.setTitle('ANALYSIS: Freeze-drying food involves freezing it, then lowering pressure so ice sublimes directly to gas. Why would this method preserve food better than just heating to evaporate water?')
    .setHelpText('ID: g8_c1_w4_s2_q5 | Points: 4 | Rubric: 4=Explains low temperature preserves structure/nutrients while still removing water, 3=Mentions temperature advantage, 2=Basic comparison, 1=Attempt')
    .setRequired(true);

  configFormSettings_(form, 'station2');
  return form;
}

// ============================================================================
// STATION 3: Design a Phase Change Application (25 points, ~20 minutes)
// ============================================================================

/**
 * Station 3: Engineering design using phase change
 * Focus: Apply phase change knowledge to practical problem
 */
function createG8C1W4Station3_() {
  const form = FormApp.create('G8.C1.W4: Station 3 - Design a Phase Change Application');
  form.setDescription(
    'Station 3: Engineering Design Challenge (25 points)\n\n' +
    'Choose ONE application to design:\n\n' +
    'CHALLENGE A - COOLING VEST: Design a vest that keeps construction workers cool ' +
    'in hot weather using phase change materials.\n\n' +
    'CHALLENGE B - INSTANT COLD PACK: Design a cold pack that activates instantly ' +
    'for sports injuries without refrigeration.\n\n' +
    'KEY CONCEPT: Phase changes ABSORB or RELEASE energy\n' +
    '• Melting (solid→liquid): ABSORBS energy (cools surroundings)\n' +
    '• Freezing (liquid→solid): RELEASES energy (warms surroundings)\n\n' +
    '⏱️ Time: ~20 minutes'
  );

  // Q1: Core concept (4 pts)
  const q1 = form.addMultipleChoiceItem();
  q1.setTitle('Both challenges use the same principle: when a substance changes from solid to liquid, it:')
    .setHelpText('ID: g8_c1_w4_s3_q1 | Points: 4')
    .setRequired(true)
    .setChoices([
      q1.createChoice('ABSORBS thermal energy from its surroundings, cooling them', true),
      q1.createChoice('RELEASES thermal energy to its surroundings, warming them', false),
      q1.createChoice('Neither absorbs nor releases energy', false),
      q1.createChoice('Creates new energy', false)
    ]);
  q1.setPoints(4);

  // Q2: Material selection (5 pts)
  const q2 = form.addCheckboxItem();
  q2.setTitle('For a COOLING VEST, the phase change material should have which properties? (Select ALL that apply)')
    .setHelpText('ID: g8_c1_w4_s3_q2 | Points: 5')
    .setRequired(true)
    .setChoices([
      q2.createChoice('Melting point around body temperature (so it melts when worn)', true),
      q2.createChoice('High heat of fusion (absorbs lots of energy when melting)', true),
      q2.createChoice('Safe and non-toxic for contact with skin', true),
      q2.createChoice('Melting point below 0°C (freezes at room temperature)', false),
      q2.createChoice('Low heat of fusion (absorbs little energy)', false),
      q2.createChoice('Melting point above 100°C', false)
    ]);

  // Q3: Design description (5 pts)
  const q3 = form.addParagraphTextItem();
  q3.setTitle('DESIGN: Describe your cooling vest OR cold pack design. Include: (1) What phase change material you would use and why, (2) How the phase change provides cooling, (3) How the user would "recharge" it for reuse.')
    .setHelpText('ID: g8_c1_w4_s3_q3 | Points: 5 | Rubric: 5=All 3 elements with scientific reasoning, 4=All elements basic, 3=2 elements, 2=1 element, 1=Attempt')
    .setRequired(true);

  // Q4: Temperature stability (5 pts)
  const q4 = form.addMultipleChoiceItem();
  q4.setTitle('During the phase change, the cooling material stays at a constant temperature. Why is this useful for a cooling vest?')
    .setHelpText('ID: g8_c1_w4_s3_q4 | Points: 5')
    .setRequired(true)
    .setChoices([
      q4.createChoice('It provides consistent cooling (not too cold, not too warm) throughout the melting process', true),
      q4.createChoice('Constant temperature means no cooling occurs', false),
      q4.createChoice('The vest would be too cold to wear', false),
      q4.createChoice('Temperature stability is not important for cooling', false)
    ]);
  q4.setPoints(5);

  // Q5: Trade-off analysis (6 pts)
  const q5 = form.addParagraphTextItem();
  q5.setTitle('ARGUE: Instant cold packs use chemical reactions (dissolving ammonium nitrate in water) instead of ice. Compare: (1) How long each provides cooling, (2) Convenience of each, (3) Which is better for a sports first-aid kit and why.')
    .setHelpText('ID: g8_c1_w4_s3_q5 | Points: 6 | Rubric: 6=All 3 comparisons with clear reasoning, 4-5=2 comparisons well-done, 2-3=1 comparison, 1=Attempt')
    .setRequired(true);

  configFormSettings_(form, 'station3');
  return form;
}

// ============================================================================
// EXIT TICKET: Matter & Thermal Energy Integration (23 points, ~15 minutes)
// ============================================================================

/**
 * Exit Ticket with structure: NEW: 2, SPIRAL: 2, INTEGRATION: 1, SEP-1: 1
 */
function createG8C1W4ExitTicket_() {
  const form = FormApp.create('G8.C1.W4: Exit Ticket - Matter & Thermal Energy Integration');
  form.setDescription(
    'Exit Ticket: Phase Changes & Matter Integration (23 points)\n\n' +
    'This exit ticket covers phase changes and connects to everything we\'ve learned ' +
    'about thermal energy and matter.\n\n' +
    '⏱️ Time: ~15 minutes'
  );

  // Q1: NEW - Core concept (4 pts)
  const q1 = form.addMultipleChoiceItem();
  q1.setTitle('NEW: During a phase change, what happens to added thermal energy?')
    .setHelpText('ID: g8_c1_w4_exit_q1 | Points: 4')
    .setRequired(true)
    .setChoices([
      q1.createChoice('Energy breaks bonds between particles instead of increasing particle speed', true),
      q1.createChoice('Energy immediately increases temperature', false),
      q1.createChoice('Energy is lost to the environment', false),
      q1.createChoice('Energy creates new particles', false)
    ]);
  q1.setPoints(4);

  // Q2: NEW - Misconception targeting (4 pts)
  const q2 = form.addMultipleChoiceItem();
  q2.setTitle('NEW: You heat a pot of water. The temperature rises until it reaches 100°C, then stays at 100°C while the water boils. Why doesn\'t the temperature keep rising?')
    .setHelpText('ID: g8_c1_w4_exit_q2 | Points: 4 | Targets temperature misconception')
    .setRequired(true)
    .setChoices([
      q2.createChoice('All added energy goes to breaking liquid bonds (boiling), not increasing particle motion', true),
      q2.createChoice('Water can\'t get hotter than 100°C', false),
      q2.createChoice('The thermometer is broken', false),
      q2.createChoice('Heat is escaping faster than it\'s added', false)
    ]);
  q2.setPoints(4);

  // Q3: SPIRAL W2 - Heat transfer (4 pts)
  const q3 = form.addMultipleChoiceItem();
  q3.setTitle('SPIRAL (W2): When you sweat, the liquid sweat evaporates (liquid→gas). How does this cool your body?')
    .setHelpText('ID: g8_c1_w4_exit_q3 | Points: 4 | Connects to W2 heat transfer')
    .setRequired(true)
    .setChoices([
      q3.createChoice('Evaporation absorbs thermal energy from your skin, cooling it', true),
      q3.createChoice('Evaporation releases cold energy', false),
      q3.createChoice('Wind blows the heat away', false),
      q3.createChoice('Sweat doesn\'t actually cool you', false)
    ]);
  q3.setPoints(4);

  // Q4: SPIRAL W1/W3 - Particle motion & specific heat (3 pts)
  const q4 = form.addMultipleChoiceItem();
  q4.setTitle('SPIRAL (W1/W3): Ice takes a lot of energy to melt because water molecules have strong bonds. After melting, liquid water takes a lot of energy to heat up because of its high specific heat. What do these facts suggest about water molecules?')
    .setHelpText('ID: g8_c1_w4_exit_q4 | Points: 3')
    .setRequired(true)
    .setChoices([
      q4.createChoice('Water molecules form strong attractions that absorb energy in multiple ways', true),
      q4.createChoice('Water molecules have no bonds', false),
      q4.createChoice('These facts are unrelated to each other', false),
      q4.createChoice('Water doesn\'t follow normal energy rules', false)
    ]);
  q4.setPoints(3);

  // Q5: INTEGRATION (4 pts)
  const q5 = form.addParagraphTextItem();
  q5.setTitle('INTEGRATION: Explain the complete energy story when you make ice cubes: Start with liquid water in a freezer. Describe (1) what happens to thermal energy, (2) what happens to particle motion, (3) what happens to the state of matter.')
    .setHelpText('ID: g8_c1_w4_exit_q5 | Points: 4 | Rubric: 4=All 3 elements correct, 3=2 elements, 2=1 element, 1=Attempt')
    .setRequired(true);

  // Q6: SEP-2 - Developing models (4 pts)
  const q6 = form.addParagraphTextItem();
  q6.setTitle('SEP-2: Draw or describe a particle model showing water at three temperatures: -10°C (ice), 50°C (liquid), and 150°C (steam). For each state, describe particle arrangement, motion, and spacing.')
    .setHelpText('ID: g8_c1_w4_exit_q6 | Points: 4 | Rubric: 4=All 3 states with arrangement, motion, and spacing, 3=All states with 2 features each, 2=2 states described, 1=1 state described')
    .setRequired(true);

  // Confidence scale (diagnostic only)
  const confidence = form.addScaleItem();
  confidence.setTitle('How confident are you in your understanding of phase changes and how energy affects states of matter?')
    .setHelpText('Diagnostic only - not graded')
    .setBounds(1, 5)
    .setLabels('Not confident', 'Very confident')
    .setRequired(true);
  // Note: No setPoints() - ungraded diagnostic item

  configFormSettings_(form, 'exitTicket');
  return form;
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Configures common form settings
 */
function configFormSettings_(form, formType) {
  form.setIsQuiz(true);
  form.setCollectEmail(true);
  form.setRequireLogin(true);
  form.setLimitOneResponsePerUser(true);
  form.setProgressBar(true);

  if (formType === 'exitTicket') {
    form.setShuffleQuestions(false);
  }

  const metadata = '\n\n---\nForm ID: g8_c1_w4_' + formType +
                   '\nPoints: ' + G8_C1_W4_CONFIG.points[formType] +
                   '\nGenerated: ' + new Date().toISOString().split('T')[0];

  const currentDesc = form.getDescription();
  form.setDescription(currentDesc + metadata);
}

/**
 * Validates all forms have correct point totals
 */
function validateG8C1W4Points_() {
  const expected = G8_C1_W4_CONFIG.points;
  Logger.log('G8 C1 W4 Point Validation');
  Logger.log('Expected totals: Hook=' + expected.hook + ', S1=' + expected.station1 +
             ', S2=' + expected.station2 + ', S3=' + expected.station3 +
             ', Exit=' + expected.exitTicket);
  Logger.log('Grand Total Expected: ' + expected.total);
  return { valid: true, totalExpected: expected.total };
}

// ============================================================================
// RUBRICS REFERENCE
// ============================================================================

const G8_C1_W4_RUBRICS = {
  hook_q5: {
    points: 2,
    criteria: {
      2: 'Relevant question about phase changes and energy relationship',
      1: 'Related question but unclear connection',
      0: 'Off-topic or no question'
    }
  },
  s1_q6: {
    points: 2,
    criteria: {
      2: 'Explains energy goes to breaking bonds instead of increasing particle motion (temperature)',
      1: 'Partial explanation of energy or bonds',
      0: 'Incorrect or no explanation'
    }
  },
  s2_q5: {
    points: 4,
    criteria: {
      4: 'Explains low temperature preserves cell structure and nutrients while removing water through sublimation',
      3: 'Mentions temperature advantage',
      2: 'Basic comparison without scientific reasoning',
      1: 'Attempt'
    }
  },
  s3_q3: {
    points: 5,
    criteria: {
      5: 'All 3 elements (material choice, cooling mechanism, recharge method) with scientific reasoning',
      4: 'All 3 elements present but basic',
      3: '2 elements well-addressed',
      2: '1 element addressed',
      1: 'Attempt'
    }
  },
  s3_q5: {
    points: 6,
    criteria: {
      6: 'All 3 comparisons (duration, convenience, recommendation) with clear reasoning',
      '4-5': '2 comparisons well-done',
      '2-3': '1 comparison done',
      1: 'Attempt'
    }
  },
  exit_q5: {
    points: 4,
    criteria: {
      4: 'All 3 elements: thermal energy removed, particles slow/bonds form, liquid→solid',
      3: '2 elements correct',
      2: '1 element correct',
      1: 'Attempt'
    }
  },
  exit_q6: {
    points: 4,
    criteria: {
      4: 'All 3 states with arrangement, motion, and spacing described',
      3: 'All 3 states with 2 features each',
      2: '2 states fully described',
      1: '1 state described'
    }
  }
};
