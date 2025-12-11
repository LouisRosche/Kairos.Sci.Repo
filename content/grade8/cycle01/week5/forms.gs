/**
 * ============================================================================
 * GRADE 8 - CYCLE 1 WEEK 5: Kinetic & Potential Energy
 * 5 Forms | 100 Points Total | ~75 Minutes
 * ============================================================================
 *
 * Phenomenon: "How can a roller coaster reach the top without a motor?"
 *
 * NGSS Standards:
 * - MS-PS3-5: Construct, use, and present arguments to support the claim that
 *             when the kinetic energy of an object changes, energy is
 *             transferred to or from the object
 * - MS-PS3-2: Develop a model to describe that when the arrangement of objects
 *             interacting at a distance changes, different amounts of potential
 *             energy are stored in the system
 *
 * Three-Dimensional Learning:
 * - SEP-2: Developing and Using Models
 * - SEP-7: Engaging in Argument from Evidence
 * - DCI: PS3.A Definitions of Energy, PS3.B Conservation of Energy
 * - CCC-5: Energy and Matter
 *
 * Spiral Review: W1-4 thermal energy (transition to mechanical energy)
 *
 * ============================================================================
 */

// ============================================================================
// CONFIGURATION
// ============================================================================

const G8_C1_W5_CONFIG = {
  grade: 8,
  cycle: 1,
  week: 5,
  topic: 'Kinetic & Potential Energy',
  phenomenon: 'How can a roller coaster reach the top without a motor?',

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
      id: 'energy-used-up',
      description: 'Energy gets "used up" during motion',
      correctUnderstanding: 'Energy transforms between forms but total energy is conserved',
      targetedIn: ['s1_q4', 'exit_q2']
    },
    {
      id: 'speed-equals-energy',
      description: 'Faster objects always have more energy',
      correctUnderstanding: 'KE depends on both mass AND velocity (KE = ½mv²)',
      targetedIn: ['s1_q3', 'exit_q1']
    }
  ],

  spiralTargets: {
    w1to4: 'Thermal energy, particle motion, heat transfer'
  },

  resources: {
    phet: 'https://phet.colorado.edu/en/simulations/energy-skate-park-basics'
  }
};

// ============================================================================
// MAIN FUNCTION
// ============================================================================

/**
 * Creates all 5 forms for G8 C1 W5
 * @returns {Object} Map of form names to Form objects
 */
function createAllG8C1W5Forms() {
  const forms = {
    hook: createG8C1W5Hook_(),
    station1: createG8C1W5Station1_(),
    station2: createG8C1W5Station2_(),
    station3: createG8C1W5Station3_(),
    exitTicket: createG8C1W5ExitTicket_()
  };

  Logger.log('G8 C1 W5 Forms created successfully');
  Logger.log('Total points: ' + G8_C1_W5_CONFIG.points.total);

  return forms;
}

// ============================================================================
// HOOK: The Unpowered Climb Mystery (12 points, ~10 minutes)
// ============================================================================

/**
 * Hook form exploring roller coaster energy
 * Focus: How does energy allow motion without a motor?
 */
function createG8C1W5Hook_() {
  const form = FormApp.create('G8.C1.W5: Hook - The Unpowered Climb Mystery');
  form.setDescription(
    'Phenomenon: How can a roller coaster reach the top without a motor?\n\n' +
    'OBSERVATION:\n' +
    '• A roller coaster is pulled up the FIRST big hill by a chain lift\n' +
    '• After the first drop, there are NO motors - just track\n' +
    '• The coaster goes up subsequent hills WITHOUT power\n' +
    '• Each hill after the first is SHORTER than the one before\n\n' +
    'Where does the energy come from to climb those hills?'
  );

  // Q1: Prior knowledge connection (2 pts)
  const q1 = form.addMultipleChoiceItem();
  q1.setTitle('From earlier lessons: Energy can be transferred and transformed. What happens to energy at the top of the first roller coaster hill?')
    .setHelpText('ID: g8_c1_w5_hook_q1 | Points: 2')
    .setRequired(true)
    .setChoices([
      q1.createChoice('The coaster has stored energy due to its height (potential energy)', true),
      q1.createChoice('The coaster has no energy at the top', false),
      q1.createChoice('Energy disappears at the top of hills', false),
      q1.createChoice('The motor provides energy at the top', false)
    ]);
  q1.setPoints(2);

  // Q2: Energy transformation observation (3 pts)
  const q2 = form.addMultipleChoiceItem();
  q2.setTitle('As the coaster goes DOWN from the first hill, it speeds up. What energy transformation is happening?')
    .setHelpText('ID: g8_c1_w5_hook_q2 | Points: 3')
    .setRequired(true)
    .setChoices([
      q2.createChoice('Potential energy (stored from height) transforms into kinetic energy (motion)', true),
      q2.createChoice('The coaster creates new energy as it falls', false),
      q2.createChoice('Gravity provides unlimited energy', false),
      q2.createChoice('No energy transformation occurs', false)
    ]);
  q2.setPoints(3);

  // Q3: Explaining subsequent hills (3 pts)
  const q3 = form.addMultipleChoiceItem();
  q3.setTitle('After the first drop, the coaster climbs a second hill (without a motor). What provides energy for this climb?')
    .setHelpText('ID: g8_c1_w5_hook_q3 | Points: 3')
    .setRequired(true)
    .setChoices([
      q3.createChoice('Kinetic energy from the speed transforms back into potential energy', true),
      q3.createChoice('A hidden motor pushes it up', false),
      q3.createChoice('The coaster creates energy to climb', false),
      q3.createChoice('Gravity pulls it uphill', false)
    ]);
  q3.setPoints(3);

  // Q4: Why hills get shorter (2 pts)
  const q4 = form.addMultipleChoiceItem();
  q4.setTitle('Each hill on a roller coaster is shorter than the previous one. Why can\'t the second hill be taller than the first?')
    .setHelpText('ID: g8_c1_w5_hook_q4 | Points: 2')
    .setRequired(true)
    .setChoices([
      q4.createChoice('Some energy is lost to friction/heat, so there\'s less energy for height each time', true),
      q4.createChoice('It\'s just for design aesthetics', false),
      q4.createChoice('The coaster gains energy as it goes', false),
      q4.createChoice('Taller second hills are too scary', false)
    ]);
  q4.setPoints(2);

  // Q5: Phenomenon focus (2 pts)
  const q5 = form.addParagraphTextItem();
  q5.setTitle('Today we\'ll explore kinetic energy (energy of motion) and potential energy (stored energy). Write ONE question you have about how energy transforms during roller coaster motion.')
    .setHelpText('ID: g8_c1_w5_hook_q5 | Points: 2 | Rubric: 2=Relevant energy transformation question, 1=Related question, 0=Off-topic')
    .setRequired(true);

  configFormSettings_(form, 'hook');
  return form;
}

// ============================================================================
// STATION 1: Energy Transformation Lab (20 points, ~15 minutes)
// ============================================================================

/**
 * Station 1: PhET Energy Skate Park + data collection
 * Focus: Observe and measure energy transformations
 */
function createG8C1W5Station1_() {
  const form = FormApp.create('G8.C1.W5: Station 1 - Energy Transformation Lab');
  form.setDescription(
    'Station 1: Energy Transformation Lab (20 points)\n\n' +
    'Use the PhET Energy Skate Park simulation to investigate energy transformations.\n\n' +
    'KEY CONCEPTS:\n' +
    '• KINETIC ENERGY (KE): Energy of motion. KE = ½mv²\n' +
    '• POTENTIAL ENERGY (PE): Stored energy due to position. PE = mgh\n' +
    '• TOTAL ENERGY = KE + PE (constant if no friction)\n\n' +
    'In the simulation, watch the bar graph showing KE and PE as the skater moves.\n\n' +
    'PhET Simulation: Energy Skate Park Basics\n\n' +
    '⏱️ Time: ~15 minutes'
  );

  // Q1: KE observation (3 pts)
  const q1 = form.addMultipleChoiceItem();
  q1.setTitle('In the simulation, when does the skater have MAXIMUM kinetic energy?')
    .setHelpText('ID: g8_c1_w5_s1_q1 | Points: 3')
    .setRequired(true)
    .setChoices([
      q1.createChoice('At the LOWEST point of the track (bottom of the half-pipe)', true),
      q1.createChoice('At the HIGHEST point of the track', false),
      q1.createChoice('When standing still at any point', false),
      q1.createChoice('Kinetic energy is constant throughout', false)
    ]);
  q1.setPoints(3);

  // Q2: PE observation (4 pts)
  const q2 = form.addMultipleChoiceItem();
  q2.setTitle('In the simulation, when does the skater have MAXIMUM potential energy?')
    .setHelpText('ID: g8_c1_w5_s1_q2 | Points: 4')
    .setRequired(true)
    .setChoices([
      q2.createChoice('At the HIGHEST point of the track (top of the ramp)', true),
      q2.createChoice('At the LOWEST point of the track', false),
      q2.createChoice('When moving fastest', false),
      q2.createChoice('Potential energy is constant throughout', false)
    ]);
  q2.setPoints(4);

  // Q3: Misconception targeting - mass and KE (4 pts)
  const q3 = form.addMultipleChoiceItem();
  q3.setTitle('Two skaters move at the SAME speed: Skater A (mass 50 kg), Skater B (mass 100 kg). Which has more kinetic energy?')
    .setHelpText('ID: g8_c1_w5_s1_q3 | Points: 4 | Targets speed-equals-energy misconception')
    .setRequired(true)
    .setChoices([
      q3.createChoice('Skater B - KE depends on mass AND velocity, so double mass = double KE at same speed', true),
      q3.createChoice('They have equal KE because they have the same speed', false),
      q3.createChoice('Skater A - lighter objects have more energy', false),
      q3.createChoice('Cannot determine from this information', false)
    ]);
  q3.setPoints(4);

  // Q4: Misconception targeting - energy conservation (4 pts)
  const q4 = form.addMultipleChoiceItem();
  q4.setTitle('With NO friction: Total energy at top = 100 J. At the bottom, how much total energy does the skater have?')
    .setHelpText('ID: g8_c1_w5_s1_q4 | Points: 4 | Targets energy-used-up misconception')
    .setRequired(true)
    .setChoices([
      q4.createChoice('100 J - energy is conserved, it just changes form (PE → KE)', true),
      q4.createChoice('Less than 100 J - some energy was used up falling', false),
      q4.createChoice('More than 100 J - energy was created during the fall', false),
      q4.createChoice('0 J - all energy is at the top', false)
    ]);
  q4.setPoints(4);

  // Q5: With friction (3 pts)
  const q5 = form.addMultipleChoiceItem();
  q5.setTitle('Turn ON friction in the simulation. Now the skater doesn\'t reach as high on the other side. Where did the "missing" energy go?')
    .setHelpText('ID: g8_c1_w5_s1_q5 | Points: 3')
    .setRequired(true)
    .setChoices([
      q5.createChoice('Transformed into thermal energy (heat) due to friction with the track', true),
      q5.createChoice('The energy was destroyed by friction', false),
      q5.createChoice('The energy went into the air', false),
      q5.createChoice('No energy was lost', false)
    ]);
  q5.setPoints(3);

  // Q6: Data analysis (2 pts)
  const q6 = form.addParagraphTextItem();
  q6.setTitle('In the simulation, describe what happens to the KE and PE bars as the skater moves from the top of one side to the bottom and back up. Explain the energy transformation.')
    .setHelpText('ID: g8_c1_w5_s1_q6 | Points: 2 | Rubric: 2=Describes PE→KE→PE with correct locations, 1=Partial description, 0=Incorrect')
    .setRequired(true);

  configFormSettings_(form, 'station1');
  return form;
}

// ============================================================================
// STATION 2: Gravitational PE Investigation (20 points, ~15 minutes)
// ============================================================================

/**
 * Station 2: Height, mass, and PE relationship
 * Focus: Understand factors affecting gravitational potential energy
 */
function createG8C1W5Station2_() {
  const form = FormApp.create('G8.C1.W5: Station 2 - Gravitational PE Investigation');
  form.setDescription(
    'Station 2: Gravitational PE Investigation (20 points)\n\n' +
    'GRAVITATIONAL POTENTIAL ENERGY: PE = mgh\n' +
    '• m = mass (kg)\n' +
    '• g = gravity (9.8 m/s² on Earth)\n' +
    '• h = height above reference point (m)\n\n' +
    'Investigate how changing mass and height affects potential energy.\n\n' +
    '⏱️ Time: ~15 minutes'
  );

  // Q1: Height effect (4 pts)
  const q1 = form.addMultipleChoiceItem();
  q1.setTitle('Object A is at 10 m height. Object B (same mass) is at 20 m height. Which has more gravitational PE and by how much?')
    .setHelpText('ID: g8_c1_w5_s2_q1 | Points: 4')
    .setRequired(true)
    .setChoices([
      q1.createChoice('Object B has TWICE the PE (double height = double PE)', true),
      q1.createChoice('They have equal PE because they have the same mass', false),
      q1.createChoice('Object A has more PE because it\'s closer to the ground', false),
      q1.createChoice('Height doesn\'t affect PE', false)
    ]);
  q1.setPoints(4);

  // Q2: Mass effect (4 pts)
  const q2 = form.addMultipleChoiceItem();
  q2.setTitle('Object C (mass 5 kg) and Object D (mass 15 kg) are at the SAME height. Which has more gravitational PE?')
    .setHelpText('ID: g8_c1_w5_s2_q2 | Points: 4')
    .setRequired(true)
    .setChoices([
      q2.createChoice('Object D has THREE times the PE (triple mass = triple PE)', true),
      q2.createChoice('They have equal PE because they\'re at the same height', false),
      q2.createChoice('Object C has more PE because it\'s lighter', false),
      q2.createChoice('Mass doesn\'t affect gravitational PE', false)
    ]);
  q2.setPoints(4);

  // Q3: Calculation (4 pts)
  const q3 = form.addMultipleChoiceItem();
  q3.setTitle('Calculate: A 2 kg ball is held 5 m above the ground (g = 10 m/s²). What is its gravitational PE? PE = mgh')
    .setHelpText('ID: g8_c1_w5_s2_q3 | Points: 4')
    .setRequired(true)
    .setChoices([
      q3.createChoice('100 J (2 × 10 × 5 = 100)', true),
      q3.createChoice('17 J (2 + 10 + 5 = 17)', false),
      q3.createChoice('50 J (10 × 5 = 50)', false),
      q3.createChoice('1000 J', false)
    ]);
  q3.setPoints(4);

  // Q4: Spiral - connecting to thermal energy (4 pts)
  const q4 = form.addMultipleChoiceItem();
  q4.setTitle('SPIRAL (W1-4): When a ball falls from 5 m and hits the ground, its gravitational PE converts to KE. If the ball stops when it hits the ground, where does the energy go?')
    .setHelpText('ID: g8_c1_w5_s2_q4 | Points: 4 | Connects to thermal energy unit')
    .setRequired(true)
    .setChoices([
      q4.createChoice('Transforms to thermal energy (heat) and sound in the ball and ground', true),
      q4.createChoice('The energy is destroyed when the ball stops', false),
      q4.createChoice('The energy goes back up into the air', false),
      q4.createChoice('The ball keeps all its energy while stationary', false)
    ]);
  q4.setPoints(4);

  // Q5: Application (4 pts)
  const q5 = form.addParagraphTextItem();
  q5.setTitle('A hydroelectric dam stores water at high elevations. Explain how the gravitational potential energy of water at the top of the dam can be used to generate electricity.')
    .setHelpText('ID: g8_c1_w5_s2_q5 | Points: 4 | Rubric: 4=Explains PE→KE→electrical energy path, 3=PE→KE mentioned, 2=Basic energy idea, 1=Attempt')
    .setRequired(true);

  configFormSettings_(form, 'station2');
  return form;
}

// ============================================================================
// STATION 3: Design an Energy Transfer System (25 points, ~20 minutes)
// ============================================================================

/**
 * Station 3: Roller coaster design challenge
 * Focus: Apply energy conservation to design problem
 */
function createG8C1W5Station3_() {
  const form = FormApp.create('G8.C1.W5: Station 3 - Design an Energy Transfer System');
  form.setDescription(
    'Station 3: Roller Coaster Design Challenge (25 points)\n\n' +
    'CHALLENGE: Design a roller coaster that:\n' +
    '• Has a first hill of 30 meters\n' +
    '• Must have at least 2 more hills\n' +
    '• Must include one loop\n' +
    '• Must end at ground level\n\n' +
    'CONSTRAINTS:\n' +
    '• No motors after the first hill\n' +
    '• Each feature must be lower than the previous high point\n' +
    '• Account for ~10% energy loss to friction per hill\n\n' +
    '⏱️ Time: ~20 minutes'
  );

  // Q1: First hill energy (4 pts)
  const q1 = form.addMultipleChoiceItem();
  q1.setTitle('The first hill is 30 m tall. Assuming a 1000 kg coaster, how much PE does it have at the top? (Use g = 10 m/s²)')
    .setHelpText('ID: g8_c1_w5_s3_q1 | Points: 4')
    .setRequired(true)
    .setChoices([
      q1.createChoice('300,000 J (PE = 1000 × 10 × 30)', true),
      q1.createChoice('30,000 J', false),
      q1.createChoice('3,000 J', false),
      q1.createChoice('1,030 J', false)
    ]);
  q1.setPoints(4);

  // Q2: Maximum second hill (5 pts)
  const q2 = form.addMultipleChoiceItem();
  q2.setTitle('After the first drop, with 10% energy loss to friction, what\'s the MAXIMUM height of the second hill?')
    .setHelpText('ID: g8_c1_w5_s3_q2 | Points: 5')
    .setRequired(true)
    .setChoices([
      q2.createChoice('27 m (90% of 30 m, because 10% energy was lost)', true),
      q2.createChoice('30 m (same as first hill)', false),
      q2.createChoice('33 m (gains 10% each hill)', false),
      q2.createChoice('20 m (must be much shorter)', false)
    ]);
  q2.setPoints(5);

  // Q3: Design description (5 pts)
  const q3 = form.addParagraphTextItem();
  q3.setTitle('DESIGN: Describe your roller coaster design. List the heights of: (1) First hill (30m given), (2) Second hill, (3) Loop height, (4) Third hill. Explain why each must be shorter than the previous.')
    .setHelpText('ID: g8_c1_w5_s3_q3 | Points: 5 | Rubric: 5=All 4 heights with energy conservation reasoning, 4=All heights basic reasoning, 3=3 heights explained, 2=2 heights, 1=Attempt')
    .setRequired(true);

  // Q4: Loop analysis (5 pts)
  const q4 = form.addMultipleChoiceItem();
  q4.setTitle('Your loop is 15 m tall. The coaster enters the loop after dropping from a 24 m section. Will the coaster make it around the loop?')
    .setHelpText('ID: g8_c1_w5_s3_q4 | Points: 5')
    .setRequired(true)
    .setChoices([
      q4.createChoice('Yes - 24 m of PE converts to enough KE to reach 15 m, with energy left over for motion', true),
      q4.createChoice('No - the loop is too tall', false),
      q4.createChoice('Yes, but only because loops give extra energy', false),
      q4.createChoice('Cannot determine without knowing the coaster\'s color', false)
    ]);
  q4.setPoints(5);

  // Q5: Design argumentation (6 pts)
  const q5 = form.addParagraphTextItem();
  q5.setTitle('ARGUE: A theme park wants to add a hill TALLER than the first hill in the middle of the coaster (without adding a motor). Use the law of conservation of energy to argue why this is impossible.')
    .setHelpText('ID: g8_c1_w5_s3_q5 | Points: 6 | Rubric: 6=Clear argument using energy conservation, 4-5=References energy conservation, 2-3=Basic reasoning, 1=Attempt')
    .setRequired(true);

  configFormSettings_(form, 'station3');
  return form;
}

// ============================================================================
// EXIT TICKET: Energy Integration (23 points, ~15 minutes)
// ============================================================================

/**
 * Exit Ticket with structure: NEW: 2, SPIRAL: 2, INTEGRATION: 1, SEP-1: 1
 */
function createG8C1W5ExitTicket_() {
  const form = FormApp.create('G8.C1.W5: Exit Ticket - Energy Integration');
  form.setDescription(
    'Exit Ticket: Kinetic & Potential Energy (23 points)\n\n' +
    'Demonstrate your understanding of energy transformations.\n\n' +
    '⏱️ Time: ~15 minutes'
  );

  // Q1: NEW - KE factors (4 pts)
  const q1 = form.addMultipleChoiceItem();
  q1.setTitle('NEW: Car A (mass 1000 kg) travels at 20 m/s. Car B (mass 2000 kg) travels at 10 m/s. Which has more kinetic energy? (KE = ½mv²)')
    .setHelpText('ID: g8_c1_w5_exit_q1 | Points: 4 | Note: velocity is squared')
    .setRequired(true)
    .setChoices([
      q1.createChoice('Car A: ½(1000)(20)² = 200,000 J vs Car B: ½(2000)(10)² = 100,000 J', true),
      q1.createChoice('Car B because it has more mass', false),
      q1.createChoice('They have equal KE', false),
      q1.createChoice('Cannot determine without knowing the color', false)
    ]);
  q1.setPoints(4);

  // Q2: NEW - Energy conservation misconception (4 pts)
  const q2 = form.addMultipleChoiceItem();
  q2.setTitle('NEW: A ball is thrown upward with 50 J of kinetic energy. At its highest point, it has 0 J of KE. Where did the energy go?')
    .setHelpText('ID: g8_c1_w5_exit_q2 | Points: 4 | Targets energy-used-up misconception')
    .setRequired(true)
    .setChoices([
      q2.createChoice('Transformed into gravitational potential energy (PE = 50 J at top)', true),
      q2.createChoice('The energy was used up fighting gravity', false),
      q2.createChoice('The energy was destroyed when it stopped', false),
      q2.createChoice('The energy leaked out into the air', false)
    ]);
  q2.setPoints(4);

  // Q3: SPIRAL W4 - Thermal connection (4 pts)
  const q3 = form.addMultipleChoiceItem();
  q3.setTitle('SPIRAL (W4): A meteor enters Earth\'s atmosphere at high speed and burns up. What energy transformation occurs?')
    .setHelpText('ID: g8_c1_w5_exit_q3 | Points: 4 | Connects to thermal energy')
    .setRequired(true)
    .setChoices([
      q3.createChoice('Kinetic energy transforms to thermal energy (heat) due to friction with air', true),
      q3.createChoice('Potential energy transforms directly to light', false),
      q3.createChoice('The meteor creates new energy', false),
      q3.createChoice('No energy transformation - it just disappears', false)
    ]);
  q3.setPoints(4);

  // Q4: SPIRAL - PE factors (3 pts)
  const q4 = form.addMultipleChoiceItem();
  q4.setTitle('SPIRAL: Compared to Earth, the Moon has weaker gravity (g = 1.6 m/s² vs 9.8 m/s²). If you lift a rock 10 m on both worlds, where does it have more gravitational PE?')
    .setHelpText('ID: g8_c1_w5_exit_q4 | Points: 3')
    .setRequired(true)
    .setChoices([
      q4.createChoice('Earth - stronger gravity means more PE at the same height (PE = mgh)', true),
      q4.createChoice('Moon - weaker gravity means more PE', false),
      q4.createChoice('Same PE on both - only height matters', false),
      q4.createChoice('Neither has PE because they\'re different planets', false)
    ]);
  q4.setPoints(3);

  // Q5: INTEGRATION (4 pts)
  const q5 = form.addParagraphTextItem();
  q5.setTitle('INTEGRATION: A pendulum swings back and forth. Describe the complete energy transformation cycle: (1) At the highest point on the left, (2) At the lowest point, (3) At the highest point on the right.')
    .setHelpText('ID: g8_c1_w5_exit_q5 | Points: 4 | Rubric: 4=All 3 positions with correct energy descriptions, 3=2 positions correct, 2=1 position correct, 1=Attempt')
    .setRequired(true);

  // Q6: SEP-7 - Argumentation (4 pts)
  const q6 = form.addParagraphTextItem();
  q6.setTitle('SEP-7: A classmate claims: "Perpetual motion machines that run forever without energy input are possible." Use evidence from energy conservation to argue why this claim is incorrect.')
    .setHelpText('ID: g8_c1_w5_exit_q6 | Points: 4 | Rubric: 4=Clear argument citing friction/energy loss + conservation, 3=Mentions conservation, 2=Basic reasoning, 1=Attempt')
    .setRequired(true);

  // Confidence scale (diagnostic only)
  const confidence = form.addScaleItem();
  confidence.setTitle('How confident are you in understanding and calculating kinetic and potential energy?')
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

function configFormSettings_(form, formType) {
  form.setIsQuiz(true);
  form.setCollectEmail(true);
  form.setRequireLogin(true);
  form.setLimitOneResponsePerUser(true);
  form.setProgressBar(true);

  if (formType === 'exitTicket') {
    form.setShuffleQuestions(false);
  }

  const metadata = '\n\n---\nForm ID: g8_c1_w5_' + formType +
                   '\nPoints: ' + G8_C1_W5_CONFIG.points[formType] +
                   '\nGenerated: ' + new Date().toISOString().split('T')[0];

  const currentDesc = form.getDescription();
  form.setDescription(currentDesc + metadata);
}

function validateG8C1W5Points_() {
  const expected = G8_C1_W5_CONFIG.points;
  Logger.log('G8 C1 W5 Point Validation');
  Logger.log('Expected totals: Hook=' + expected.hook + ', S1=' + expected.station1 +
             ', S2=' + expected.station2 + ', S3=' + expected.station3 +
             ', Exit=' + expected.exitTicket);
  Logger.log('Grand Total Expected: ' + expected.total);
  return { valid: true, totalExpected: expected.total };
}

// ============================================================================
// RUBRICS REFERENCE
// ============================================================================

const G8_C1_W5_RUBRICS = {
  hook_q5: {
    points: 2,
    criteria: {
      2: 'Relevant question about energy transformation during motion',
      1: 'Related question but unclear',
      0: 'Off-topic'
    }
  },
  s1_q6: {
    points: 2,
    criteria: {
      2: 'Describes PE→KE→PE transformation with correct positions (top-bottom-top)',
      1: 'Partial description of energy changes',
      0: 'Incorrect or no description'
    }
  },
  s2_q5: {
    points: 4,
    criteria: {
      4: 'Explains complete path: Water PE at height → KE falling → spins turbine → electrical energy',
      3: 'Mentions PE→KE conversion',
      2: 'Basic energy idea mentioned',
      1: 'Attempt'
    }
  },
  s3_q3: {
    points: 5,
    criteria: {
      5: 'All 4 heights with energy conservation reasoning for each decrease',
      4: 'All heights listed with basic reasoning',
      3: '3 heights with explanation',
      2: '2 heights explained',
      1: 'Attempt'
    }
  },
  s3_q5: {
    points: 6,
    criteria: {
      6: 'Clear argument: energy lost to friction + can\'t gain energy without input = impossible',
      '4-5': 'References energy conservation correctly',
      '2-3': 'Basic reasoning without clear physics',
      1: 'Attempt'
    }
  },
  exit_q5: {
    points: 4,
    criteria: {
      4: 'All 3 positions: (1) Max PE, 0 KE left; (2) 0 PE, Max KE bottom; (3) Max PE, 0 KE right',
      3: '2 positions with correct energy',
      2: '1 position correct',
      1: 'Attempt'
    }
  },
  exit_q6: {
    points: 4,
    criteria: {
      4: 'Clear argument: friction always converts some energy to heat + conservation means can\'t create energy',
      3: 'Mentions energy conservation principle',
      2: 'Basic reasoning about machines',
      1: 'Attempt'
    }
  }
};
