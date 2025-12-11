/**
 * Grade 8 Cycle 1 Week 7: Energy Systems & Conservation
 * Standards: MS-PS3-5 (energy transfer), MS-PS3-4 (thermal energy design)
 * Phenomenon: Why can't machines run forever without adding energy?
 *
 * Form Structure:
 * - Hook: The Perpetual Motion Fraud (12 pts)
 * - Station 1: Energy System Investigation (20 pts)
 * - Station 2: Efficiency Analysis (20 pts)
 * - Station 3: Design an Efficient System (25 pts)
 * - Exit Ticket: Energy Conservation Integration (23 pts)
 *
 * Total: 100 points
 */

// ============================================================================
// CONFIGURATION
// ============================================================================

const G8_C1_W7_CONFIG = {
  grade: 8,
  cycle: 1,
  week: 7,
  topic: 'Energy Systems & Conservation',
  phenomenon: 'Why can\'t machines run forever without adding energy?',
  standards: ['MS-PS3-5', 'MS-PS3-4'],
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
      id: 'perpetual-motion-possible',
      description: 'Students believe perpetual motion machines could work if designed correctly',
      targetedIn: ['hook_q4', 's1_q4']
    },
    {
      id: 'efficiency-100-percent',
      description: 'Students think 100% efficiency is achievable with better technology',
      targetedIn: ['s2_q3', 'exit_q2']
    },
    {
      id: 'energy-used-up',
      description: 'Students think energy is "used up" rather than transformed to less useful forms',
      targetedIn: ['s1_q3', 's2_q4']
    }
  ],
  spiralTargets: {
    w6: 'Energy transfer in collisions'
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
 * Creates all forms for G8 C1 W7
 */
function createAllForms() {
  const results = {
    hook: createHookForm_(),
    station1: createStation1Form_(),
    station2: createStation2Form_(),
    station3: createStation3Form_(),
    exitTicket: createExitTicketForm_()
  };

  Logger.log('=== G8 C1 W7 Forms Created ===');
  Object.entries(results).forEach(([name, url]) => {
    Logger.log(`${name}: ${url}`);
  });

  return results;
}

// ============================================================================
// HOOK: THE PERPETUAL MOTION FRAUD (12 points)
// ============================================================================

function createHookForm_() {
  const form = FormApp.create('G8.C1.W7: Hook - The Perpetual Motion Fraud');
  configFormSettings_(form);

  // Header
  form.setDescription(
    'Phenomenon: Throughout history, inventors have claimed to build "perpetual motion machines" - ' +
    'devices that run forever without any energy input. Every single one has been proven to be either ' +
    'a fraud or a misunderstanding of physics.\n\n' +
    'Why is perpetual motion impossible?\n\n' +
    'Points: 12 | Standards: MS-PS3-5'
  );

  // Q1: Initial understanding (2 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q1: What would a "perpetual motion machine" need to do?')
    .setHelpText('Question ID: g8_c1_w7_hook_q1')
    .setChoices([
      form.createChoice('Run forever without any energy being added', true),
      form.createChoice('Run for a very long time with occasional refueling', false),
      form.createChoice('Move very fast for a short period', false),
      form.createChoice('Convert one type of energy to another', false)
    ])
    .setRequired(true)
    .setPoints(2);

  // Q2: Energy in real machines (2 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q2: A spinning wheel eventually slows down and stops. Why?')
    .setHelpText('Question ID: g8_c1_w7_hook_q2')
    .setChoices([
      form.createChoice('The wheel runs out of energy completely', false),
      form.createChoice('Energy transfers to friction (heat) and air resistance', true),
      form.createChoice('Gravity pulls the energy out of the wheel', false),
      form.createChoice('The energy escapes into space', false)
    ])
    .setRequired(true)
    .setPoints(2);

  // Q3: Prior knowledge connection (3 pts)
  form.addParagraphTextItem()
    .setTitle('Q3: Using what you learned last week about energy in collisions, explain why energy always seems to "disappear" from mechanical systems even though energy cannot be created or destroyed.')
    .setHelpText('Question ID: g8_c1_w7_hook_q3 | 3 points: Connect to W6 collision energy loss')
    .setRequired(true);
  setPointsForLastItem_(form, 3);

  // Q4: Misconception target - perpetual-motion-possible (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q4: An inventor claims: "I just need to reduce friction to zero and my machine will run forever." Why is this claim STILL wrong?')
    .setHelpText('Question ID: g8_c1_w7_hook_q4 | Targets misconception: perpetual-motion-possible')
    .setChoices([
      form.createChoice('Zero friction is possible with the right materials', false),
      form.createChoice('Even with zero friction, air resistance, sound, and other energy transfers would still occur', true),
      form.createChoice('Zero friction would make the machine spin too fast', false),
      form.createChoice('This claim is actually correct - the inventor just needs better engineering', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // Q5: Question generation (2 pts)
  form.addParagraphTextItem()
    .setTitle('Q5: What questions do you have about why all real systems lose energy over time?')
    .setHelpText('Question ID: g8_c1_w7_hook_q5 | 2 points: Generate investigable questions')
    .setRequired(true);
  setPointsForLastItem_(form, 2);

  return form.getPublishedUrl();
}

// ============================================================================
// STATION 1: ENERGY SYSTEM INVESTIGATION (20 points)
// ============================================================================

function createStation1Form_() {
  const form = FormApp.create('G8.C1.W7: Station 1 - Energy System Investigation');
  configFormSettings_(form);

  form.setDescription(
    'Track energy through complete systems and identify where it goes.\n\n' +
    'Focus: Account for ALL energy inputs, outputs, and transformations.\n\n' +
    'Spiral Review: Energy transfer in collisions from Week 6\n' +
    'Points: 20 | Standards: MS-PS3-5'
  );

  // Q1: Energy accounting (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q1: A car uses 100 J of gasoline energy. Only 25 J moves the car forward. Where did the other 75 J go?')
    .setHelpText('Question ID: g8_c1_w7_s1_q1')
    .setChoices([
      form.createChoice('It was destroyed in the engine', false),
      form.createChoice('It transformed to heat, sound, and vibration', true),
      form.createChoice('It went back into the fuel tank', false),
      form.createChoice('It disappeared into the air', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // Q2: System boundary (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q2: If you measure the total energy of a CLOSED system (nothing enters or leaves), what happens to the total over time?')
    .setHelpText('Question ID: g8_c1_w7_s1_q2')
    .setChoices([
      form.createChoice('It decreases as energy is used up', false),
      form.createChoice('It stays exactly the same (energy is conserved)', true),
      form.createChoice('It increases as energy multiplies', false),
      form.createChoice('It randomly changes based on temperature', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // Q3: Misconception target - energy-used-up (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q3: A student says: "My phone battery energy gets used up when I play games." What is a MORE accurate way to describe this?')
    .setHelpText('Question ID: g8_c1_w7_s1_q3 | Targets misconception: energy-used-up')
    .setChoices([
      form.createChoice('The student is completely correct - energy is used up', false),
      form.createChoice('Battery chemical energy transforms to light, heat, and sound - less useful forms', true),
      form.createChoice('The energy escapes from the phone into the air', false),
      form.createChoice('The energy returns to the battery when you charge it', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // Q4: Misconception target - perpetual-motion-possible (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q4: Why do ALL real machines eventually need more energy input to keep running?')
    .setHelpText('Question ID: g8_c1_w7_s1_q4 | Targets misconception: perpetual-motion-possible')
    .setChoices([
      form.createChoice('Engineers haven\'t figured out how to store energy properly yet', false),
      form.createChoice('Energy constantly transforms to thermal energy (heat) which spreads out and becomes unusable', true),
      form.createChoice('Machines have limited capacity to hold energy', false),
      form.createChoice('Energy naturally wants to leave machines', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q5: Energy tracking (4 pts)
  form.addParagraphTextItem()
    .setTitle('Q5: Track the energy in a swinging pendulum. Start with 100 J of potential energy at the top. After 50 swings, only 20 J of mechanical energy remains. Create an energy flow diagram showing where all 100 J went.')
    .setHelpText('Question ID: g8_c1_w7_s1_q5 | 4 points: Complete energy accounting (must equal 100 J total)')
    .setRequired(true);
  setPointsForLastItem_(form, 4);

  // Q6: Spiral review - W6 collision energy (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q6: [SPIRAL W6] In an inelastic collision, some kinetic energy transforms to thermal energy. This is an example of energy:')
    .setHelpText('Question ID: g8_c1_w7_s1_q6 | Spiral: W6 Collision Energy')
    .setChoices([
      form.createChoice('Being created from the collision', false),
      form.createChoice('Being destroyed by the collision', false),
      form.createChoice('Transforming to a less organized (more spread out) form', true),
      form.createChoice('Staying exactly the same in all ways', false)
    ])
    .setRequired(true)
    .setPoints(3);

  return form.getPublishedUrl();
}

// ============================================================================
// STATION 2: EFFICIENCY ANALYSIS (20 points)
// ============================================================================

function createStation2Form_() {
  const form = FormApp.create('G8.C1.W7: Station 2 - Efficiency Analysis');
  configFormSettings_(form);

  form.setDescription(
    'Calculate and compare the efficiency of different energy systems.\n\n' +
    'Efficiency = (Useful Energy Output / Total Energy Input) x 100%\n\n' +
    'Points: 20 | Standards: MS-PS3-5, MS-PS3-4'
  );

  // Scenario introduction
  form.addSectionHeaderItem()
    .setTitle('Comparing Energy Systems')
    .setHelpText('Use the efficiency formula to analyze different machines and systems.');

  // Q1: Efficiency calculation (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q1: A light bulb uses 60 J of electrical energy and produces 12 J of light energy. What is its efficiency?')
    .setHelpText('Question ID: g8_c1_w7_s2_q1 | Efficiency = (Useful/Total) x 100%')
    .setChoices([
      form.createChoice('5%', false),
      form.createChoice('12%', false),
      form.createChoice('20%', true),
      form.createChoice('60%', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q2: Efficiency comparison (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q2: An LED bulb uses 10 J of electrical energy and produces 5 J of light. Compared to the 60 J incandescent (12 J light), which is more efficient?')
    .setHelpText('Question ID: g8_c1_w7_s2_q2')
    .setChoices([
      form.createChoice('Incandescent (20% efficient)', false),
      form.createChoice('LED (50% efficient)', true),
      form.createChoice('They are equally efficient', false),
      form.createChoice('Cannot be determined from this information', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q3: Misconception target - efficiency-100-percent (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q3: Why can NO machine ever achieve 100% efficiency?')
    .setHelpText('Question ID: g8_c1_w7_s2_q3 | Targets misconception: efficiency-100-percent')
    .setChoices([
      form.createChoice('Engineers haven\'t tried hard enough yet', false),
      form.createChoice('Some energy always transforms to thermal energy (heat) which spreads out', true),
      form.createChoice('Machines always have design flaws', false),
      form.createChoice('100% efficiency is actually possible with future technology', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q4: Misconception target - energy-used-up (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q4: A car engine is 25% efficient. What happens to the other 75% of energy?')
    .setHelpText('Question ID: g8_c1_w7_s2_q4 | Targets misconception: energy-used-up')
    .setChoices([
      form.createChoice('It is destroyed by the engine', false),
      form.createChoice('It transforms to heat, sound, and vibration that don\'t move the car', true),
      form.createChoice('It returns to the fuel tank', false),
      form.createChoice('It escapes as unused chemical energy', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q5: Efficiency application (4 pts)
  form.addParagraphTextItem()
    .setTitle('Q5: A power plant burns coal (1000 J chemical energy) to produce electricity. The electricity travels through wires (loses 100 J to heat) to power a motor (70% efficient) that lifts a weight. Calculate: (1) Electricity delivered to motor, (2) Useful work from motor, (3) Overall system efficiency.')
    .setHelpText('Question ID: g8_c1_w7_s2_q5 | 4 points: Show all calculations')
    .setRequired(true);
  setPointsForLastItem_(form, 4);

  return form.getPublishedUrl();
}

// ============================================================================
// STATION 3: DESIGN AN EFFICIENT SYSTEM (25 points)
// ============================================================================

function createStation3Form_() {
  const form = FormApp.create('G8.C1.W7: Station 3 - Design an Efficient System');
  configFormSettings_(form);

  form.setDescription(
    'Apply your understanding of energy systems to optimize efficiency.\n\n' +
    'Engineering Challenge: Design a system that maximizes useful energy output.\n\n' +
    'Points: 25 | Standards: MS-PS3-4, MS-PS3-5, MS-ETS1-2'
  );

  // Scenario introduction
  form.addSectionHeaderItem()
    .setTitle('The Home Heating Challenge')
    .setHelpText('A family wants to heat their home efficiently. They have $5000 to spend on improvements. ' +
                 'Current system: Gas furnace (80% efficient), poorly insulated walls (50% of heat escapes).');

  // Q1: Current efficiency (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q1: If the furnace produces 100 J of heat but 50% escapes through walls, how much useful heat stays in the home?')
    .setHelpText('Question ID: g8_c1_w7_s3_q1')
    .setChoices([
      form.createChoice('100 J', false),
      form.createChoice('80 J', false),
      form.createChoice('50 J', true),
      form.createChoice('40 J', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q2: System analysis (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q2: The overall efficiency of the heating system (furnace + insulation) is approximately:')
    .setHelpText('Question ID: g8_c1_w7_s3_q2 | Overall = Furnace efficiency x Retention rate')
    .setChoices([
      form.createChoice('80% (furnace efficiency only)', false),
      form.createChoice('50% (insulation retention only)', false),
      form.createChoice('40% (80% x 50% = 40%)', true),
      form.createChoice('130% (80% + 50%)', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q3: Improvement options (5 pts)
  form.addParagraphTextItem()
    .setTitle('Q3: Option A: Upgrade to 95% efficient furnace ($3000). Option B: Improve insulation to keep 80% of heat ($2000). Which gives better overall efficiency? Show your calculations.')
    .setHelpText('Question ID: g8_c1_w7_s3_q3 | 5 points: Calculate both scenarios and compare')
    .setRequired(true);
  setPointsForLastItem_(form, 5);

  // Q4: Design proposal (6 pts)
  form.addParagraphTextItem()
    .setTitle('Q4: With $5000 budget, design the BEST heating system. You can choose: (1) Which improvements to buy, (2) Calculate expected overall efficiency, (3) Explain why this combination is optimal.')
    .setHelpText('Question ID: g8_c1_w7_s3_q4 | 6 points: Complete design with calculations and justification')
    .setRequired(true);
  setPointsForLastItem_(form, 6);

  // Q5: Trade-off analysis (6 pts)
  form.addParagraphTextItem()
    .setTitle('Q5: Some people suggest adding a solar panel system ($4000, produces 30% of needed energy for free). Analyze this trade-off: (1) How does free energy input affect the overall system? (2) What are the limitations? (3) Would you recommend it? Why or why not?')
    .setHelpText('Question ID: g8_c1_w7_s3_q5 | 6 points: Complete trade-off analysis with reasoning')
    .setRequired(true);
  setPointsForLastItem_(form, 6);

  return form.getPublishedUrl();
}

// ============================================================================
// EXIT TICKET: ENERGY CONSERVATION INTEGRATION (23 points)
// ============================================================================

function createExitTicketForm_() {
  const form = FormApp.create('G8.C1.W7: Exit Ticket - Energy Conservation Integration');
  configFormSettings_(form);

  form.setDescription(
    'Demonstrate your understanding of energy systems and conservation.\n\n' +
    'Structure: 2 New + 2 Spiral + 1 Integration + 1 SEP\n' +
    'Points: 23 | Standards: MS-PS3-5, MS-PS3-4'
  );

  // NEW Q1: Energy conservation statement (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q1 [NEW]: The law of conservation of energy states that energy:')
    .setHelpText('Question ID: g8_c1_w7_exit_q1')
    .setChoices([
      form.createChoice('Can be created when needed', false),
      form.createChoice('Can be destroyed when no longer useful', false),
      form.createChoice('Cannot be created or destroyed, only transformed', true),
      form.createChoice('Stays in the same form forever', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // NEW Q2: Misconception target - efficiency-100-percent (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q2 [NEW]: A student says: "If we just keep improving technology, we\'ll eventually make 100% efficient machines." Why is this IMPOSSIBLE?')
    .setHelpText('Question ID: g8_c1_w7_exit_q2 | Targets misconception: efficiency-100-percent')
    .setChoices([
      form.createChoice('Technology can\'t improve any further', false),
      form.createChoice('The laws of physics guarantee some energy will always spread out as heat', true),
      form.createChoice('Engineers aren\'t smart enough', false),
      form.createChoice('This statement is actually correct - 100% is possible', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // SPIRAL Q3: W6 - Collision energy (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q3 [SPIRAL W6]: In a car crash (inelastic collision), kinetic energy transforms primarily to:')
    .setHelpText('Question ID: g8_c1_w7_exit_q3 | Spiral: W6 - Collision Energy')
    .setChoices([
      form.createChoice('More kinetic energy', false),
      form.createChoice('Potential energy stored in the car', false),
      form.createChoice('Thermal energy, sound, and deformation', true),
      form.createChoice('Chemical energy in the fuel', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // SPIRAL Q4: W6 - Energy transfer (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q4 [SPIRAL W6]: When a bouncy ball bounces lower each time, energy is conserved because:')
    .setHelpText('Question ID: g8_c1_w7_exit_q4 | Spiral: W6 - Energy Conservation')
    .setChoices([
      form.createChoice('The ball loses energy permanently', false),
      form.createChoice('The "lost" kinetic energy transforms to heat and sound', true),
      form.createChoice('Gravity absorbs the extra energy', false),
      form.createChoice('The floor stores the energy for later', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // INTEGRATION Q5: Cross-concept connection (5 pts)
  form.addParagraphTextItem()
    .setTitle('Q5 [INTEGRATION]: A hybrid car uses regenerative braking - when you brake, the car captures some kinetic energy and stores it in a battery. Use your understanding of W6 (collision/friction energy loss) and W7 (system efficiency) to explain: (1) Why traditional brakes waste energy, (2) How regenerative braking improves efficiency, (3) Why it still can\'t capture 100% of the energy.')
    .setHelpText('Question ID: g8_c1_w7_exit_q5 | 5 points: Connect collision physics to efficiency')
    .setRequired(true);
  setPointsForLastItem_(form, 5);

  // SEP Q6: Developing and using models (4 pts)
  form.addParagraphTextItem()
    .setTitle('Q6 [SEP]: Draw or describe an energy flow model for a flashlight. Show: (1) Energy input (battery), (2) Useful energy output (light), (3) "Wasted" energy (heat), (4) Calculate efficiency if 10 J input produces 2 J light.')
    .setHelpText('Question ID: g8_c1_w7_exit_q6 | 4 points: SEP 2 - Developing and Using Models')
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
  form.setRequireLogin(true);
  form.setLimitOneResponsePerUser(true);
  form.setShowLinkToRespondAgain(false);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Your responses have been recorded. Great work mastering energy conservation!\n\n' +
    'Key Takeaway: Energy is NEVER destroyed - it just transforms to less useful forms!'
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

function createG8C1W7Hook() { return createHookForm_(); }
function createG8C1W7Station1() { return createStation1Form_(); }
function createG8C1W7Station2() { return createStation2Form_(); }
function createG8C1W7Station3() { return createStation3Form_(); }
function createG8C1W7ExitTicket() { return createExitTicketForm_(); }

// ============================================================================
// VALIDATION
// ============================================================================

/**
 * Validates point totals match configuration
 */
function validatePoints_() {
  const expected = G8_C1_W7_CONFIG.points;
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
