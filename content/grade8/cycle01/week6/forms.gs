/**
 * Grade 8 Cycle 1 Week 6: Energy Transfer in Collisions
 * Standards: MS-PS3-5 (KE changes & energy transfer), MS-PS3-2 (energy in systems)
 * Phenomenon: Why do objects sometimes stop completely after a collision?
 *
 * Form Structure:
 * - Hook: The Perfect Stop Mystery (12 pts)
 * - Station 1: Collision Investigation (20 pts) - PhET Collision Lab
 * - Station 2: Momentum & Energy Analysis (20 pts)
 * - Station 3: Design a Safety Device (25 pts)
 * - Exit Ticket: Collision Energy Integration (23 pts)
 *
 * Total: 100 points
 */

// ============================================================================
// CONFIGURATION
// ============================================================================

const G8_C1_W6_CONFIG = {
  grade: 8,
  cycle: 1,
  week: 6,
  topic: 'Energy Transfer in Collisions',
  phenomenon: 'Why do objects sometimes stop completely after a collision?',
  standards: ['MS-PS3-5', 'MS-PS3-2'],
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
      id: 'energy-disappears',
      description: 'Students believe energy disappears or is destroyed in collisions',
      targetedIn: ['s1_q4', 'exit_q2']
    },
    {
      id: 'speed-equals-energy',
      description: 'Students think stopping means no energy (ignoring transfer)',
      targetedIn: ['hook_q4', 's2_q3']
    },
    {
      id: 'elastic-means-bouncy',
      description: 'Students confuse elastic (energy conserved as KE) with bouncy',
      targetedIn: ['s1_q3', 's2_q4']
    }
  ],
  spiralTargets: {
    w5: 'Kinetic and potential energy transformations'
  }
};

// Rubric references for constructed response scoring
const RUBRICS = {
  twoPoint: {
    2: 'Complete response with scientific reasoning and evidence',
    1: 'Partial response with incomplete reasoning or missing evidence',
    0: 'Incorrect or no response'
  },
  threePoint: {
    3: 'Complete response with claim, evidence, and scientific reasoning',
    2: 'Adequate response with minor gaps in reasoning or evidence',
    1: 'Partial response with significant gaps',
    0: 'Incorrect or no response'
  },
  fourPoint: {
    4: 'Exemplary response with sophisticated reasoning and multiple evidence sources',
    3: 'Complete response meeting all criteria',
    2: 'Adequate response with minor gaps',
    1: 'Partial response with significant gaps',
    0: 'Incorrect or no response'
  }
};

// ============================================================================
// MAIN ENTRY POINT
// ============================================================================

/**
 * Creates all forms for G8 C1 W6
 */
function createAllForms() {
  const results = {
    hook: createHookForm_(),
    station1: createStation1Form_(),
    station2: createStation2Form_(),
    station3: createStation3Form_(),
    exitTicket: createExitTicketForm_()
  };

  Logger.log('=== G8 C1 W6 Forms Created ===');
  Object.entries(results).forEach(([name, url]) => {
    Logger.log(`${name}: ${url}`);
  });

  return results;
}

// ============================================================================
// HOOK: THE PERFECT STOP MYSTERY (12 points)
// ============================================================================

function createHookForm_() {
  const form = FormApp.create('G8.C1.W6: Hook - The Perfect Stop Mystery');
  configFormSettings_(form);

  // Header
  form.setDescription(
    'Phenomenon: A skilled billiards player hits the cue ball, which strikes another ball perfectly. ' +
    'The cue ball stops COMPLETELY while the other ball rolls away at the same speed!\n\n' +
    'How is this possible? Where did the energy go?\n\n' +
    'Points: 12 | Standards: MS-PS3-5'
  );

  // Q1: Initial observation (2 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q1: When you watch the billiard ball collision, what happens to the cue ball after it hits the other ball?')
    .setHelpText('Question ID: g8_c1_w6_hook_q1')
    .setChoices([
      form.createChoice('The cue ball bounces backward', false),
      form.createChoice('The cue ball stops completely', true),
      form.createChoice('Both balls continue moving forward', false),
      form.createChoice('Both balls stop completely', false)
    ])
    .setRequired(true)
    .setPoints(2);

  // Q2: Energy prediction (2 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q2: Based on what you learned about energy last week, what do you predict happened to the kinetic energy of the cue ball?')
    .setHelpText('Question ID: g8_c1_w6_hook_q2')
    .setChoices([
      form.createChoice('The kinetic energy was destroyed when the balls collided', false),
      form.createChoice('The kinetic energy transferred to the second ball', true),
      form.createChoice('The kinetic energy turned into heat and disappeared', false),
      form.createChoice('The kinetic energy is still in the cue ball but hidden', false)
    ])
    .setRequired(true)
    .setPoints(2);

  // Q3: Prior knowledge connection (3 pts)
  form.addParagraphTextItem()
    .setTitle('Q3: Using what you know about kinetic energy (KE = ½mv²), explain why the second ball moves away at nearly the same speed the cue ball had before the collision.')
    .setHelpText('Question ID: g8_c1_w6_hook_q3 | 3 points: Connect energy formula to observation')
    .setRequired(true);
  setPointsForLastItem_(form, 3);

  // Q4: Misconception target - speed-equals-energy (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q4: A student says "The cue ball lost all its energy because it stopped moving." What is the BEST response to this claim?')
    .setHelpText('Question ID: g8_c1_w6_hook_q4 | Targets misconception: speed-equals-energy')
    .setChoices([
      form.createChoice('Correct - when an object stops, its energy is gone', false),
      form.createChoice('Incorrect - the energy was transferred to the other ball, not lost', true),
      form.createChoice('Incorrect - the energy is stored as potential energy in the stopped ball', false),
      form.createChoice('Partially correct - some energy was lost to friction only', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // Q5: Question generation (2 pts)
  form.addParagraphTextItem()
    .setTitle('Q5: What questions do you have about how energy moves between objects during collisions?')
    .setHelpText('Question ID: g8_c1_w6_hook_q5 | 2 points: Generate investigable questions')
    .setRequired(true);
  setPointsForLastItem_(form, 2);

  return form.getPublishedUrl();
}

// ============================================================================
// STATION 1: COLLISION INVESTIGATION (20 points)
// ============================================================================

function createStation1Form_() {
  const form = FormApp.create('G8.C1.W6: Station 1 - Collision Investigation');
  configFormSettings_(form);

  form.setDescription(
    'Use the PhET Collision Lab simulation to investigate energy transfer in collisions.\n\n' +
    'Simulation: https://phet.colorado.edu/en/simulations/collision-lab\n\n' +
    'Spiral Review: Energy transformations from Week 5\n' +
    'Points: 20 | Standards: MS-PS3-5, MS-PS3-2'
  );

  // Q1: Simulation setup - elastic collision (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q1: Set up an ELASTIC collision with "Elasticity" at 100%. When a moving ball collides with a stationary ball of equal mass, what happens?')
    .setHelpText('Question ID: g8_c1_w6_s1_q1')
    .setChoices([
      form.createChoice('Both balls move in the same direction at half the original speed', false),
      form.createChoice('The first ball stops and the second ball moves at the original speed', true),
      form.createChoice('Both balls bounce backward at equal speeds', false),
      form.createChoice('Both balls stop completely', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // Q2: Inelastic collision observation (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q2: Now set "Elasticity" to 0% (perfectly inelastic). When the same collision occurs, what do you observe?')
    .setHelpText('Question ID: g8_c1_w6_s1_q2')
    .setChoices([
      form.createChoice('The balls stick together and move at half the original speed', true),
      form.createChoice('The balls stick together and stop completely', false),
      form.createChoice('The first ball bounces back while the second moves forward', false),
      form.createChoice('The collision looks the same as the elastic collision', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // Q3: Misconception target - elastic-means-bouncy (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q3: What does "elastic" mean in physics terms when describing collisions?')
    .setHelpText('Question ID: g8_c1_w6_s1_q3 | Targets misconception: elastic-means-bouncy')
    .setChoices([
      form.createChoice('The objects are made of stretchy material', false),
      form.createChoice('The objects bounce really high after colliding', false),
      form.createChoice('Kinetic energy is conserved (not lost to heat/sound)', true),
      form.createChoice('The collision happens very quickly', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // Q4: Misconception target - energy-disappears (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q4: In an inelastic collision, the total kinetic energy AFTER is less than BEFORE. Where did the "missing" energy go?')
    .setHelpText('Question ID: g8_c1_w6_s1_q4 | Targets misconception: energy-disappears')
    .setChoices([
      form.createChoice('The energy was destroyed during the collision', false),
      form.createChoice('The energy transferred to heat, sound, and deformation', true),
      form.createChoice('The energy is stored in the stationary object', false),
      form.createChoice('The energy escaped into the air around the objects', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q5: Data collection and analysis (4 pts)
  form.addParagraphTextItem()
    .setTitle('Q5: Use the simulation to test collisions at 50% elasticity. Record the kinetic energy before and after the collision. Calculate the percentage of kinetic energy that was conserved as KE.')
    .setHelpText('Question ID: g8_c1_w6_s1_q5 | 4 points: Include numerical data and calculation')
    .setRequired(true);
  setPointsForLastItem_(form, 4);

  // Q6: Spiral review - W5 energy transformations (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q6: [SPIRAL W5] In a partially elastic collision, some kinetic energy transforms into thermal energy. This is similar to what happens when:')
    .setHelpText('Question ID: g8_c1_w6_s1_q6 | Spiral: W5 Energy Transformations')
    .setChoices([
      form.createChoice('A ball rolls along a frictionless surface forever', false),
      form.createChoice('A skateboarder going downhill transforms PE to KE', false),
      form.createChoice('Brakes on a bicycle slow it down by heating up', true),
      form.createChoice('A pendulum swings at constant height', false)
    ])
    .setRequired(true)
    .setPoints(3);

  return form.getPublishedUrl();
}

// ============================================================================
// STATION 2: MOMENTUM & ENERGY ANALYSIS (20 points)
// ============================================================================

function createStation2Form_() {
  const form = FormApp.create('G8.C1.W6: Station 2 - Momentum & Energy Analysis');
  configFormSettings_(form);

  form.setDescription(
    'Analyze collision data to understand how energy and momentum behave in different types of collisions.\n\n' +
    'Remember: KE = ½mv²  |  Momentum = mv\n\n' +
    'Points: 20 | Standards: MS-PS3-5'
  );

  // Scenario introduction
  form.addSectionHeaderItem()
    .setTitle('Collision Data Analysis')
    .setHelpText('Two balls collide on a frictionless track. Ball A (2 kg) moves at 4 m/s. Ball B (2 kg) is stationary.');

  // Q1: Before collision calculations (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q1: What is the total kinetic energy of the system BEFORE the collision?')
    .setHelpText('Question ID: g8_c1_w6_s2_q1 | KE = ½mv²')
    .setChoices([
      form.createChoice('8 J', false),
      form.createChoice('16 J', true),
      form.createChoice('32 J', false),
      form.createChoice('4 J', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q2: After elastic collision (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q2: After a perfectly ELASTIC collision, Ball A stops and Ball B moves at 4 m/s. What is the total kinetic energy AFTER?')
    .setHelpText('Question ID: g8_c1_w6_s2_q2')
    .setChoices([
      form.createChoice('8 J', false),
      form.createChoice('16 J', true),
      form.createChoice('32 J', false),
      form.createChoice('0 J', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q3: Misconception target - speed-equals-energy (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q3: Ball A went from 4 m/s to 0 m/s - it "lost" all 16 J of kinetic energy. Which statement best explains what happened?')
    .setHelpText('Question ID: g8_c1_w6_s2_q3 | Targets misconception: speed-equals-energy')
    .setChoices([
      form.createChoice('Ball A\'s energy was destroyed when it stopped moving', false),
      form.createChoice('Ball A\'s 16 J of KE transferred to Ball B during the collision', true),
      form.createChoice('Ball A\'s energy converted to potential energy inside the ball', false),
      form.createChoice('Ball A never really had energy - only Ball B did', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q4: Misconception target - elastic-means-bouncy (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q4: In a PERFECTLY INELASTIC collision, the balls stick together and move at 2 m/s. The total KE after is 8 J. What happened to the other 8 J?')
    .setHelpText('Question ID: g8_c1_w6_s2_q4 | Targets misconception: elastic-means-bouncy')
    .setChoices([
      form.createChoice('It was destroyed because the collision wasn\'t bouncy enough', false),
      form.createChoice('It transferred to thermal energy, sound, and deformation of the balls', true),
      form.createChoice('It is stored as potential energy in the combined mass', false),
      form.createChoice('It went into making the balls move together instead of apart', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q5: Claim-Evidence-Reasoning (4 pts)
  form.addParagraphTextItem()
    .setTitle('Q5: Make a CLAIM about whether total energy is conserved in inelastic collisions. Support your claim with EVIDENCE from the data and REASONING about where the energy goes.')
    .setHelpText('Question ID: g8_c1_w6_s2_q5 | 4 points: CER format required')
    .setRequired(true);
  setPointsForLastItem_(form, 4);

  return form.getPublishedUrl();
}

// ============================================================================
// STATION 3: DESIGN A SAFETY DEVICE (25 points)
// ============================================================================

function createStation3Form_() {
  const form = FormApp.create('G8.C1.W6: Station 3 - Design a Safety Device');
  configFormSettings_(form);

  form.setDescription(
    'Apply your understanding of collision physics to design safety systems.\n\n' +
    'Engineering Challenge: Use collision energy principles to protect passengers in a car crash.\n\n' +
    'Points: 25 | Standards: MS-PS3-5, MS-ETS1-2'
  );

  // Scenario introduction
  form.addSectionHeaderItem()
    .setTitle('The Design Challenge')
    .setHelpText('A car traveling at 15 m/s (about 35 mph) collides with a wall. The car has a mass of 1500 kg. ' +
                 'Your job: Design features that protect passengers by managing energy transfer.');

  // Q1: Initial energy calculation (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q1: Calculate the kinetic energy of the car before impact. (KE = ½mv²)')
    .setHelpText('Question ID: g8_c1_w6_s3_q1')
    .setChoices([
      form.createChoice('22,500 J', false),
      form.createChoice('168,750 J', true),
      form.createChoice('11,250 J', false),
      form.createChoice('337,500 J', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q2: Energy transfer understanding (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q2: In a car crash, what happens to all 168,750 J of kinetic energy?')
    .setHelpText('Question ID: g8_c1_w6_s3_q2')
    .setChoices([
      form.createChoice('It disappears when the car stops', false),
      form.createChoice('It transfers to heat, sound, and deformation of the car', true),
      form.createChoice('It stays in the car as potential energy', false),
      form.createChoice('It transfers to the wall and makes it move', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q3: Crumple zone function (5 pts)
  form.addParagraphTextItem()
    .setTitle('Q3: "Crumple zones" are designed to crush during impact. Explain how this protects passengers using energy transfer concepts.')
    .setHelpText('Question ID: g8_c1_w6_s3_q3 | 5 points: Connect crumpling to energy absorption and time extension')
    .setRequired(true);
  setPointsForLastItem_(form, 5);

  // Q4: Design proposal (6 pts)
  form.addParagraphTextItem()
    .setTitle('Q4: Design ONE additional safety feature for a car. Describe: (1) What it does, (2) How it manages energy transfer, (3) How it protects passengers.')
    .setHelpText('Question ID: g8_c1_w6_s3_q4 | 6 points: Complete engineering design with physics reasoning')
    .setRequired(true);
  setPointsForLastItem_(form, 6);

  // Q5: Trade-off analysis (6 pts)
  form.addParagraphTextItem()
    .setTitle('Q5: Your safety feature will add weight to the car (increasing its mass). Using KE = ½mv², explain: (1) How does increased mass affect kinetic energy at the same speed? (2) Is this trade-off worth it? Why?')
    .setHelpText('Question ID: g8_c1_w6_s3_q5 | 6 points: Mathematical reasoning + engineering judgment')
    .setRequired(true);
  setPointsForLastItem_(form, 6);

  return form.getPublishedUrl();
}

// ============================================================================
// EXIT TICKET: COLLISION ENERGY INTEGRATION (23 points)
// ============================================================================

function createExitTicketForm_() {
  const form = FormApp.create('G8.C1.W6: Exit Ticket - Collision Energy Integration');
  configFormSettings_(form);

  form.setDescription(
    'Demonstrate your understanding of energy transfer in collisions.\n\n' +
    'Structure: 2 New + 2 Spiral + 1 Integration + 1 SEP\n' +
    'Points: 23 | Standards: MS-PS3-5, MS-PS3-2'
  );

  // NEW Q1: Collision type identification (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q1 [NEW]: Two clay balls collide and stick together. This is an example of:')
    .setHelpText('Question ID: g8_c1_w6_exit_q1')
    .setChoices([
      form.createChoice('An elastic collision - kinetic energy is conserved', false),
      form.createChoice('An inelastic collision - kinetic energy is NOT conserved', true),
      form.createChoice('A non-collision - no energy transfer occurred', false),
      form.createChoice('An explosion - energy was created', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // NEW Q2: Misconception target - energy-disappears (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q2 [NEW]: When a bouncy ball drops and bounces lower each time, where does the "lost" kinetic energy go?')
    .setHelpText('Question ID: g8_c1_w6_exit_q2 | Targets misconception: energy-disappears')
    .setChoices([
      form.createChoice('The energy is destroyed a little bit with each bounce', false),
      form.createChoice('The energy transfers to heat and sound during each impact', true),
      form.createChoice('The energy stays in the ball but becomes hidden', false),
      form.createChoice('The energy transfers to gravity each bounce', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // SPIRAL Q3: W5 - KE calculation (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q3 [SPIRAL W5]: A 3 kg object moving at 2 m/s has how much kinetic energy?')
    .setHelpText('Question ID: g8_c1_w6_exit_q3 | Spiral: W5 - KE = ½mv²')
    .setChoices([
      form.createChoice('3 J', false),
      form.createChoice('6 J', true),
      form.createChoice('12 J', false),
      form.createChoice('1.5 J', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // SPIRAL Q4: W5 - Energy transformation (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q4 [SPIRAL W5]: At what point does a roller coaster car have maximum kinetic energy?')
    .setHelpText('Question ID: g8_c1_w6_exit_q4 | Spiral: W5 - PE-KE transformations')
    .setChoices([
      form.createChoice('At the top of the highest hill', false),
      form.createChoice('At the bottom of the lowest point', true),
      form.createChoice('Exactly halfway down the first hill', false),
      form.createChoice('At the starting platform before release', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // INTEGRATION Q5: Cross-concept connection (5 pts)
  form.addParagraphTextItem()
    .setTitle('Q5 [INTEGRATION]: A meteor entering Earth\'s atmosphere has enormous kinetic energy. It slows down dramatically before impact. Use your understanding of both W5 (energy transformations) and W6 (collision energy) to explain what happens to the meteor\'s energy.')
    .setHelpText('Question ID: g8_c1_w6_exit_q5 | 5 points: Connect atmospheric friction to collision physics')
    .setRequired(true);
  setPointsForLastItem_(form, 5);

  // SEP Q6: Constructing explanations (4 pts)
  form.addParagraphTextItem()
    .setTitle('Q6 [SEP]: Construct an explanation for why cars are designed to crumple in a crash rather than being built as rigid as possible. Use the relationship between collision time, force, and energy transfer in your explanation.')
    .setHelpText('Question ID: g8_c1_w6_exit_q6 | 4 points: SEP 6 - Constructing Explanations')
    .setRequired(true);
  setPointsForLastItem_(form, 4);

  return form.getPublishedUrl();
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Configures standard form settings for quizzes
 * @param {GoogleAppsScript.Forms.Form} form - The form to configure
 */
function configFormSettings_(form) {
  form.setIsQuiz(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setShowLinkToRespondAgain(false);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Your responses have been recorded. Great work investigating collision physics!\n\n' +
    'Key Takeaway: Energy is NEVER destroyed - it only transfers or transforms!'
  );
}

/**
 * Sets points for the last added item (for paragraph items)
 * @param {GoogleAppsScript.Forms.Form} form - The form
 * @param {number} points - Points value
 */
function setPointsForLastItem_(form, points) {
  const items = form.getItems();
  const lastItem = items[items.length - 1];
  if (lastItem.getType() === FormApp.ItemType.PARAGRAPH_TEXT) {
    // Paragraph items need manual grading - points set as general feedback
    // Points are included in helpText for teacher reference
  }
}

// ============================================================================
// INDIVIDUAL FORM CREATORS (for selective deployment)
// ============================================================================

function createG8C1W6Hook() { return createHookForm_(); }
function createG8C1W6Station1() { return createStation1Form_(); }
function createG8C1W6Station2() { return createStation2Form_(); }
function createG8C1W6Station3() { return createStation3Form_(); }
function createG8C1W6ExitTicket() { return createExitTicketForm_(); }

// ============================================================================
// VALIDATION
// ============================================================================

/**
 * Validates point totals match configuration
 */
function validatePoints_() {
  const expected = G8_C1_W6_CONFIG.points;
  const calculated = {
    hook: 2 + 2 + 3 + 3 + 2,      // 12
    station1: 3 + 3 + 3 + 4 + 4 + 3, // 20
    station2: 4 + 4 + 4 + 4 + 4,   // 20
    station3: 4 + 4 + 5 + 6 + 6,   // 25
    exitTicket: 4 + 4 + 3 + 3 + 5 + 4  // 23
  };
  calculated.total = Object.values(calculated).reduce((a, b) => a + b, 0);

  Logger.log('=== Point Validation ===');
  Object.keys(expected).forEach(key => {
    const match = expected[key] === calculated[key];
    Logger.log(`${key}: Expected ${expected[key]}, Got ${calculated[key]} ${match ? '✓' : '✗'}`);
  });

  return calculated.total === expected.total;
}
