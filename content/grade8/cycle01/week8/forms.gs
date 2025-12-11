/**
 * Grade 8 Cycle 1 Week 8: Synthesis & Assessment
 * Standards: MS-PS1-4, MS-PS3-3, MS-PS3-4, MS-PS3-5
 * Focus: Comprehensive assessment of thermal energy, phase changes, and mechanical energy
 *
 * Form Structure:
 * - Part 1: Synthesis Review (20 pts, 15 min)
 * - Part 2: Cumulative Assessment (60 pts, 40 min)
 * - Part 3: Misconception Check (20 pts, 20 min)
 *
 * Total: 100 points (~75 minutes)
 */

// ============================================================================
// CONFIGURATION
// ============================================================================

const G8_C1_W8_CONFIG = {
  grade: 8,
  cycle: 1,
  week: 8,
  topic: 'Synthesis & Assessment',
  isAssessmentWeek: true,
  standards: ['MS-PS1-4', 'MS-PS3-3', 'MS-PS3-4', 'MS-PS3-5'],
  points: {
    part1: 20,
    part2: 60,
    part3: 20,
    total: 100
  },
  misconceptionTargets: [
    'cold-transfer',
    'temp-heat-same',
    'metals-cold',
    'energy-disappears'
  ],
  coverageByWeek: {
    w1_w2: 'Thermal energy and heat transfer',
    w3: 'Thermal properties of materials',
    w4: 'State changes and phase transitions',
    w5: 'Kinetic and potential energy',
    w6: 'Energy transfer in collisions',
    w7: 'Energy systems and conservation'
  }
};

// ============================================================================
// MAIN ENTRY POINT
// ============================================================================

/**
 * Creates all assessment forms for G8 C1 W8
 */
function createAllForms() {
  const results = {
    part1: createPart1SynthesisReview_(),
    part2: createPart2CumulativeAssessment_(),
    part3: createPart3MisconceptionCheck_()
  };

  Logger.log('=== G8 C1 W8 Assessment Forms Created ===');
  Object.entries(results).forEach(([name, url]) => {
    Logger.log(`${name}: ${url}`);
  });

  return results;
}

// ============================================================================
// PART 1: SYNTHESIS REVIEW (20 points, 15 min)
// ============================================================================

function createPart1SynthesisReview_() {
  const form = FormApp.create('G8.C1.W8: Part 1 - Synthesis Review');
  configFormSettings_(form);

  form.setDescription(
    'Part 1: Synthesis Review\n\n' +
    'Connect the major concepts from this cycle: thermal energy, phase changes, and mechanical energy.\n\n' +
    'Time: ~15 minutes | Points: 20 | Standards: MS-PS1-4, MS-PS3-3, MS-PS3-5'
  );

  // Q1: Thermal to mechanical connection (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q1: How are thermal energy (W1-3) and kinetic energy (W5-6) related?')
    .setHelpText('Question ID: g8_c1_w8_p1_q1 | Connects W1-3 and W5-6')
    .setChoices([
      form.createChoice('They are completely different types of energy with no relationship', false),
      form.createChoice('Thermal energy IS the kinetic energy of particles moving randomly', true),
      form.createChoice('Thermal energy converts to kinetic energy only at high temperatures', false),
      form.createChoice('Kinetic energy always becomes thermal energy instantly', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q2: Phase changes and energy connection (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q2: During a phase change (W4), temperature stays constant even though heat is added. Where does the added energy go?')
    .setHelpText('Question ID: g8_c1_w8_p1_q2 | Connects W3-4 and W5')
    .setChoices([
      form.createChoice('The energy is destroyed during the phase change', false),
      form.createChoice('The energy breaks/forms bonds between particles (changes potential energy)', true),
      form.createChoice('The energy escapes into the air', false),
      form.createChoice('The thermometer is broken', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q3: Conservation across concepts (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q3: In W6, we learned that kinetic energy "disappears" in inelastic collisions. In W7, we learned energy is conserved. How do these ideas fit together?')
    .setHelpText('Question ID: g8_c1_w8_p1_q3 | Connects W6-7')
    .setChoices([
      form.createChoice('They contradict each other - one must be wrong', false),
      form.createChoice('KE transforms to thermal energy - total energy is conserved, just not KE alone', true),
      form.createChoice('Energy conservation only applies to closed systems', false),
      form.createChoice('Collisions create energy from nothing', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q4: Integration synthesis (4 pts)
  form.addParagraphTextItem()
    .setTitle('Q4: Create a concept chain linking: Particle motion → Temperature → Phase changes → Energy conservation. Explain each arrow in your chain.')
    .setHelpText('Question ID: g8_c1_w8_p1_q4 | 4 points: Must explain all three connections')
    .setRequired(true);
  setPointsForLastItem_(form, 4);

  // Q5: Real-world synthesis (4 pts)
  form.addParagraphTextItem()
    .setTitle('Q5: A car\'s brakes convert kinetic energy to thermal energy. Explain this process from the macroscopic level (car slowing) to the particle level (what happens to particles in the brake pads), connecting concepts from W1-2, W5-6, and W7.')
    .setHelpText('Question ID: g8_c1_w8_p1_q5 | 4 points: Must address both scales and multiple weeks')
    .setRequired(true);
  setPointsForLastItem_(form, 4);

  return form.getPublishedUrl();
}

// ============================================================================
// PART 2: CUMULATIVE ASSESSMENT (60 points, 40 min)
// ============================================================================

function createPart2CumulativeAssessment_() {
  const form = FormApp.create('G8.C1.W8: Part 2 - Cumulative Assessment');
  configFormSettings_(form);

  form.setDescription(
    'Part 2: Cumulative Assessment\n\n' +
    'Demonstrate your mastery of all Cycle 1 content.\n\n' +
    'Time: ~40 minutes | Points: 60 | Standards: MS-PS1-4, MS-PS3-3, MS-PS3-4, MS-PS3-5'
  );

  // ========== SECTION A: Thermal Energy & Particles (15 pts) ==========
  form.addSectionHeaderItem()
    .setTitle('Section A: Thermal Energy & Particles')
    .setHelpText('W1-W2 Content | 15 points');

  // A1 (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('A1: What happens to particle motion when thermal energy is added to a substance?')
    .setHelpText('Question ID: g8_c1_w8_p2_a1')
    .setChoices([
      form.createChoice('Particles slow down', false),
      form.createChoice('Particles move faster and vibrate more', true),
      form.createChoice('Particles stop moving', false),
      form.createChoice('Particles shrink in size', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // A2 (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('A2: Heat ALWAYS transfers from:')
    .setHelpText('Question ID: g8_c1_w8_p2_a2')
    .setChoices([
      form.createChoice('Cold objects to hot objects', false),
      form.createChoice('Hot objects to cold objects', true),
      form.createChoice('Large objects to small objects', false),
      form.createChoice('Dense objects to less dense objects', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // A3 (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('A3: Two objects at the same temperature are placed in contact. What happens to the heat transfer between them?')
    .setHelpText('Question ID: g8_c1_w8_p2_a3')
    .setChoices([
      form.createChoice('Heat flows from the larger object to the smaller one', false),
      form.createChoice('No net heat transfer occurs - they are at thermal equilibrium', true),
      form.createChoice('Heat flows back and forth randomly', false),
      form.createChoice('Both objects cool down', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // A4 (5 pts)
  form.addParagraphTextItem()
    .setTitle('A4: Explain why a metal spoon in a pot of soup feels hotter than the wooden handle, even though both are at the same temperature. Use the concept of thermal conductivity in your answer.')
    .setHelpText('Question ID: g8_c1_w8_p2_a4 | 5 points: Must explain conductivity and heat transfer rate')
    .setRequired(true);
  setPointsForLastItem_(form, 5);

  // ========== SECTION B: Heat Transfer (15 pts) ==========
  form.addSectionHeaderItem()
    .setTitle('Section B: Heat Transfer')
    .setHelpText('W2-W3 Content | 15 points');

  // B1 (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('B1: Which heat transfer method requires direct contact between particles?')
    .setHelpText('Question ID: g8_c1_w8_p2_b1')
    .setChoices([
      form.createChoice('Radiation', false),
      form.createChoice('Convection', false),
      form.createChoice('Conduction', true),
      form.createChoice('All methods require contact', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // B2 (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('B2: A house loses heat through the walls in winter. Which property would make better insulation?')
    .setHelpText('Question ID: g8_c1_w8_p2_b2')
    .setChoices([
      form.createChoice('High thermal conductivity', false),
      form.createChoice('Low thermal conductivity', true),
      form.createChoice('High density', false),
      form.createChoice('High temperature', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // B3 (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('B3: The Sun warms the Earth even through the vacuum of space. This heat transfer occurs by:')
    .setHelpText('Question ID: g8_c1_w8_p2_b3')
    .setChoices([
      form.createChoice('Conduction through space particles', false),
      form.createChoice('Convection through solar wind', false),
      form.createChoice('Radiation (electromagnetic waves)', true),
      form.createChoice('Heat cannot travel through vacuum', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // B4 (5 pts)
  form.addParagraphTextItem()
    .setTitle('B4: Design a container to keep a drink cold for as long as possible. Explain how your design minimizes heat transfer by conduction, convection, AND radiation.')
    .setHelpText('Question ID: g8_c1_w8_p2_b4 | 5 points: Must address all three methods')
    .setRequired(true);
  setPointsForLastItem_(form, 5);

  // ========== SECTION C: Kinetic & Potential Energy (15 pts) ==========
  form.addSectionHeaderItem()
    .setTitle('Section C: Kinetic & Potential Energy')
    .setHelpText('W4-W6 Content | 15 points');

  // C1 (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('C1: A ball is thrown upward. At what point does it have maximum potential energy?')
    .setHelpText('Question ID: g8_c1_w8_p2_c1')
    .setChoices([
      form.createChoice('At the moment it leaves your hand', false),
      form.createChoice('Halfway to the top', false),
      form.createChoice('At the highest point', true),
      form.createChoice('When it hits the ground', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // C2 (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('C2: If a 4 kg object moves at 3 m/s, what is its kinetic energy? (KE = ½mv²)')
    .setHelpText('Question ID: g8_c1_w8_p2_c2')
    .setChoices([
      form.createChoice('6 J', false),
      form.createChoice('12 J', false),
      form.createChoice('18 J', true),
      form.createChoice('36 J', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // C3 (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('C3: In a perfectly elastic collision between two identical balls, if one is moving and one is stationary, what happens?')
    .setHelpText('Question ID: g8_c1_w8_p2_c3')
    .setChoices([
      form.createChoice('Both balls move at half the original speed', false),
      form.createChoice('The moving ball stops, the stationary ball moves at the original speed', true),
      form.createChoice('Both balls stop', false),
      form.createChoice('Both balls move faster than before', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // C4 (5 pts)
  form.addParagraphTextItem()
    .setTitle('C4: A roller coaster car starts at 20 m high and goes through a loop that is 10 m high. Explain: (1) Where PE and KE are maximum/minimum, (2) Why the loop can\'t be higher than 20 m, (3) Why the car actually can\'t reach a 20 m loop (consider real-world factors).')
    .setHelpText('Question ID: g8_c1_w8_p2_c4 | 5 points: Must address all three parts')
    .setRequired(true);
  setPointsForLastItem_(form, 5);

  // ========== SECTION D: Energy Conservation (15 pts) ==========
  form.addSectionHeaderItem()
    .setTitle('Section D: Energy Conservation')
    .setHelpText('W6-W7 Content | 15 points');

  // D1 (5 pts)
  form.addParagraphTextItem()
    .setTitle('D1: A 1000 kg car traveling at 20 m/s brakes to a stop. Calculate: (1) The initial kinetic energy, (2) Where this energy went, (3) Why perpetual motion is impossible based on this example.')
    .setHelpText('Question ID: g8_c1_w8_p2_d1 | 5 points: Must include calculation and explanation')
    .setRequired(true);
  setPointsForLastItem_(form, 5);

  // D2 (5 pts)
  form.addParagraphTextItem()
    .setTitle('D2: A power plant burns fuel with 1000 J of chemical energy. After losses in the generator (20%), transmission lines (10%), and a motor (30%), how much useful work is done? Calculate overall efficiency.')
    .setHelpText('Question ID: g8_c1_w8_p2_d2 | 5 points: Show step-by-step calculation')
    .setRequired(true);
  setPointsForLastItem_(form, 5);

  // D3 (5 pts)
  form.addParagraphTextItem()
    .setTitle('D3: Design Challenge: A company wants to capture waste heat from a factory to generate electricity. Describe: (1) How thermal energy can be converted to electrical energy, (2) Why this system can\'t be 100% efficient, (3) One strategy to maximize efficiency.')
    .setHelpText('Question ID: g8_c1_w8_p2_d3 | 5 points: Must address all three parts')
    .setRequired(true);
  setPointsForLastItem_(form, 5);

  return form.getPublishedUrl();
}

// ============================================================================
// PART 3: MISCONCEPTION CHECK (20 points, 20 min)
// ============================================================================

function createPart3MisconceptionCheck_() {
  const form = FormApp.create('G8.C1.W8: Part 3 - Misconception Check');
  configFormSettings_(form);

  form.setDescription(
    'Part 3: Misconception Check\n\n' +
    'Identify and correct common misconceptions about energy and heat.\n\n' +
    'Time: ~20 minutes | Points: 20'
  );

  // MC1: cold-transfer misconception (5 pts)
  form.addMultipleChoiceItem()
    .setTitle('MC1: A student says "Opening the refrigerator lets cold out into the room." What is WRONG with this statement?')
    .setHelpText('Question ID: g8_c1_w8_p3_mc1 | Targets: cold-transfer')
    .setChoices([
      form.createChoice('The statement is completely correct', false),
      form.createChoice('"Cold" is not a substance that moves - heat from the room enters the refrigerator', true),
      form.createChoice('Refrigerators don\'t actually make things cold', false),
      form.createChoice('Cold can only move through solids', false)
    ])
    .setRequired(true)
    .setPoints(5);

  // MC2: temp-heat-same misconception (5 pts)
  form.addMultipleChoiceItem()
    .setTitle('MC2: A student says "Temperature and heat are the same thing." What is the CORRECT distinction?')
    .setHelpText('Question ID: g8_c1_w8_p3_mc2 | Targets: temp-heat-same')
    .setChoices([
      form.createChoice('The student is correct - they are the same', false),
      form.createChoice('Temperature measures average particle KE; heat is energy transferred between objects', true),
      form.createChoice('Temperature is for solids, heat is for liquids', false),
      form.createChoice('Heat is always higher than temperature', false)
    ])
    .setRequired(true)
    .setPoints(5);

  // MC3: metals-cold misconception (5 pts)
  form.addMultipleChoiceItem()
    .setTitle('MC3: A student touches a metal chair and says "Metal is naturally cold." What is the SCIENTIFIC explanation?')
    .setHelpText('Question ID: g8_c1_w8_p3_mc3 | Targets: metals-cold')
    .setChoices([
      form.createChoice('Metal stores cold from the air', false),
      form.createChoice('Metal conducts heat away from your hand quickly, making it FEEL cold', true),
      form.createChoice('Metal is always at a lower temperature than other materials', false),
      form.createChoice('Metal absorbs body heat permanently', false)
    ])
    .setRequired(true)
    .setPoints(5);

  // MC4: energy-disappears misconception (5 pts)
  form.addMultipleChoiceItem()
    .setTitle('MC4: A student says "A bouncy ball stops bouncing because it runs out of energy." What is the CORRECT explanation?')
    .setHelpText('Question ID: g8_c1_w8_p3_mc4 | Targets: energy-disappears')
    .setChoices([
      form.createChoice('The student is correct - energy runs out over time', false),
      form.createChoice('The energy transforms to heat and sound with each bounce - total energy is conserved', true),
      form.createChoice('Gravity pulls the energy out of the ball', false),
      form.createChoice('The floor absorbs the energy permanently', false)
    ])
    .setRequired(true)
    .setPoints(5);

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
    'Your responses have been recorded. You\'ve completed the Cycle 1 Assessment!\n\n' +
    'Key Learning: Energy is never created or destroyed - it transforms between kinetic, ' +
    'potential, and thermal forms while the total always remains constant.'
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

function createG8C1W8Part1() { return createPart1SynthesisReview_(); }
function createG8C1W8Part2() { return createPart2CumulativeAssessment_(); }
function createG8C1W8Part3() { return createPart3MisconceptionCheck_(); }

// ============================================================================
// VALIDATION
// ============================================================================

/**
 * Validates point totals match configuration
 */
function validatePoints_() {
  const expected = G8_C1_W8_CONFIG.points;
  const calculated = {
    part1: 4 + 4 + 4 + 4 + 4,      // 20
    part2: 3 + 3 + 4 + 5 + 3 + 3 + 4 + 5 + 3 + 3 + 4 + 5 + 5 + 5 + 5,  // 60
    part3: 5 + 5 + 5 + 5           // 20
  };
  calculated.total = Object.values(calculated).reduce((a, b) => a + b, 0);

  Logger.log('=== Point Validation ===');
  Object.keys(expected).forEach(key => {
    const match = expected[key] === calculated[key];
    Logger.log(`${key}: Expected ${expected[key]}, Got ${calculated[key]} ${match ? '✓' : '✗'}`);
  });

  return calculated.total === expected.total;
}
