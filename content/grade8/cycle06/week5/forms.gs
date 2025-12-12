/**
 * ═══════════════════════════════════════════════════════════════════════════
 * GRADE 8 CYCLE 6 WEEK 5: Synthesis & Assessment
 * STATUS: ✅ COMPLETE - READY FOR REVIEW
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * ASSESSMENT WEEK: Electricity & Magnetism
 *
 * This week synthesizes and assesses student learning across the entire
 * Cycle 6 unit on electricity, magnetism, electromagnetism, and motors.
 * Students demonstrate mastery through multi-part assessment while addressing
 * persistent misconceptions.
 *
 * Assessment Structure:
 * - Part 1: Synthesis Review (20 pts, 15 min)
 * - Part 2: Cumulative Assessment (60 pts, 40 min)
 *   - Section A: Magnetic Fields (15 pts)
 *   - Section B: Electromagnetism (15 pts)
 *   - Section C: Electric Circuits (15 pts)
 *   - Section D: Motors & Generators (15 pts)
 * - Part 3: Misconception Check (20 pts, 20 min)
 *
 * Standards Alignment:
 * - MS-PS2-3: Electric and magnetic forces
 * - MS-PS2-5: Conducting materials in circuits
 * - MS-PS3-2: Energy transformation
 *
 * Misconception Targets:
 * - magnets-unlimited: Magnetic strength decreases with distance
 * - electricity-consumed: Energy is transformed, not consumed
 * - em-unrelated: Electricity and magnetism are unified
 *
 * ═══════════════════════════════════════════════════════════════════════════
 */

// ═══════════════════════════════════════════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════

const G8_C6_W5_CONFIG = {
  grade: 8,
  cycle: 6,
  week: 5,
  topic: 'Synthesis & Assessment: Electricity & Magnetism',
  isAssessmentWeek: true,

  standards: {
    assessed: ['MS-PS2-3', 'MS-PS2-5', 'MS-PS3-2']
  },

  points: {
    part1SynthesisReview: 20,
    part2Assessment: 60,
    part3MisconceptionCheck: 20,
    total: 100
  },

  assessmentSections: {
    A: 'Magnetic Fields',
    B: 'Electromagnetism',
    C: 'Electric Circuits',
    D: 'Motors & Generators'
  },

  misconceptionTargets: [
    'magnets-unlimited',
    'electricity-consumed',
    'em-unrelated'
  ],

  formIds: {
    part1: null,
    part2: null,
    part3: null
  }
};

// ═══════════════════════════════════════════════════════════════════════════
// PART 1: SYNTHESIS REVIEW (20 points)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Creates Part 1: Synthesis Review connecting all electricity & magnetism concepts
 * Time: 15 minutes
 */
function createG8C6W5Part1SynthesisReview() {
  const form = FormApp.create('G8.C6.W5: Part 1 - Synthesis Review');
  form.setDescription(
    '🔗 SYNTHESIS REVIEW: Connecting Electricity & Magnetism\n\n' +
    'This review connects all the concepts you\'ve learned in Cycle 6:\n' +
    '• Week 1: Magnetic Fields & Properties\n' +
    '• Week 2: Electromagnetism & Induction\n' +
    '• Week 3: Electric Circuits & Power\n' +
    '• Week 4: Electric Motors & Mechanical Advantage\n\n' +
    'Time: 15 minutes\n' +
    'Points: 20'
  );
  form.setIsQuiz(true);
  form.setShuffleQuestions(false);

  // Q1: Connecting electricity and magnetism (4 pts)
  const q1 = form.addMultipleChoiceItem();
  q1.setTitle('How are electricity and magnetism fundamentally connected? Identify the key relationships.')
  q1.setHelpText('Think about what you learned about electromagnetism in Weeks 2 and 4.')
  q1.setPoints(4)
  q1.setChoices([
    q1.createChoice('They are completely separate phenomena with no relationship', false),
    q1.createChoice('Moving electric charges create magnetic fields; changing magnetic fields induce electric currents—they are two aspects of one force (electromagnetism)', true),
    q1.createChoice('Magnetism can exist only with electricity present', false),
    q1.createChoice('Electricity is stronger than magnetism, so they don\'t interact', false)
  ])
  q1.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ This is one of physics\' greatest discoveries! Maxwell unified electricity and magnetism in the 1860s. Motors use current→magnetism; generators use magnetism→current.').build())
  q1.setFeedbackForIncorrect(FormApp.createFeedback().setText('Remember: Current through a wire creates a magnetic field (electromagnets). Moving a magnet near a wire creates current (generators). They\'re intimately connected!').build());

  // Q2: Energy transformation chain (4 pts)
  const q2 = form.addMultipleChoiceItem();
  q2.setTitle('Trace the energy transformations in an electric car: battery → motor → wheels. What forms does energy take at each stage?')
  q2.setHelpText('Think about what type of energy exists at each point in the chain.')
  q2.setPoints(4)
  q2.setChoices([
    q2.createChoice('Chemical → heat → motion', false),
    q2.createChoice('Chemical → electrical → mechanical (with some heat loss at each stage)', true),
    q2.createChoice('Electrical → chemical → mechanical', false),
    q2.createChoice('Energy is created new at each stage', false)
  ])
  q2.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Perfect energy tracking! Battery stores chemical energy → releases as electrical → motor converts to mechanical. Some becomes heat at each transformation (efficiency losses).').build())
  q2.setFeedbackForIncorrect(FormApp.createFeedback().setText('Follow the energy: What type is stored in a battery? What flows through wires? What makes the wheels turn? Energy transforms at each step.').build());

  // Q3: Circuit-motor connection (4 pts)
  const q3 = form.addMultipleChoiceItem();
  q3.setTitle('A motor draws 10A at 12V. Using circuit principles, calculate the power consumption. Then explain why the motor gets warm.')
  q3.setHelpText('Use P = I × V. Think about energy conservation.')
  q3.setPoints(4)
  q3.setChoices([
    q3.createChoice('120W; the motor gets warm because some electrical energy converts to heat instead of mechanical energy', true),
    q3.createChoice('22W; the motor gets warm because electricity is hot', false),
    q3.createChoice('1.2W; the motor gets warm from friction with air', false),
    q3.createChoice('120W; the motor doesn\'t actually get warm if working properly', false)
  ])
  q3.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Excellent integration! P = 10A × 12V = 120W. Heat represents energy that didn\'t become useful mechanical work—this is why efficiency is never 100%.').build())
  q3.setFeedbackForIncorrect(FormApp.createFeedback().setText('P = I × V = 10 × 12 = 120W. Energy that doesn\'t become mechanical motion must go somewhere. Where? (Hint: feel a motor after it runs)').build());

  // Q4: Magnetic field applications (4 pts)
  const q4 = form.addMultipleChoiceItem();
  q4.setTitle('Both MRI machines (medical imaging) and electric motors use magnetic fields, but for very different purposes. What determines how a magnetic field is USED in a technology?')
  q4.setHelpText('Think about what properties of magnetic fields each application exploits.')
  q4.setPoints(4)
  q4.setChoices([
    q4.createChoice('Magnetic fields only have one possible use', false),
    q4.createChoice('The application determines which magnetic properties are exploited: MRI uses field interactions with atoms, motors use force on current-carrying conductors', true),
    q4.createChoice('MRI and motors use completely different types of magnetism', false),
    q4.createChoice('Technology just randomly uses magnets wherever convenient', false)
  ])
  q4.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Great systems thinking! Same fundamental force, different applications. Understanding the underlying physics enables innovation.').build())
  q4.setFeedbackForIncorrect(FormApp.createFeedback().setText('Magnetic fields have multiple properties: they exert forces on moving charges, interact with atomic nuclei, and can be shaped by geometry. Different applications use different properties.').build());

  // Q5: System design reflection (4 pts)
  const q5 = form.addParagraphTextItem();
  q5.setTitle('Design a simple system that uses ALL of the following: a power source, a circuit with resistance, an electromagnet, and mechanical advantage. Describe what the system does and how each component contributes.')
  q5.setHelpText('Think about real devices that combine these elements, or invent your own application.')
  q5.setPoints(4);

  Logger.log('G8.C6.W5 Part 1 created: ' + form.getEditUrl());
  return form;
}

// ═══════════════════════════════════════════════════════════════════════════
// PART 2: CUMULATIVE ASSESSMENT (60 points)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Creates Part 2: Cumulative Assessment covering all unit content
 * Time: 40 minutes
 * Sections: A (Magnetic Fields), B (Electromagnetism), C (Electric Circuits), D (Motors & Generators)
 */
function createG8C6W5Part2Assessment() {
  const form = FormApp.create('G8.C6.W5: Part 2 - Cumulative Assessment');
  form.setDescription(
    '📝 CUMULATIVE ASSESSMENT: Electricity & Magnetism\n\n' +
    'This assessment covers all content from Cycle 6.\n\n' +
    'Section A: Magnetic Fields (15 pts)\n' +
    'Section B: Electromagnetism (15 pts)\n' +
    'Section C: Electric Circuits (15 pts)\n' +
    'Section D: Motors & Generators (15 pts)\n\n' +
    'Time: 40 minutes\n' +
    'Total Points: 60\n\n' +
    'This is an individual assessment—complete it on your own.'
  );
  form.setIsQuiz(true);
  form.setShuffleQuestions(false);

  // ═══════════════════════════════════════════════════════════════════════
  // SECTION A: MAGNETIC FIELDS (15 pts)
  // ═══════════════════════════════════════════════════════════════════════

  form.addSectionHeaderItem().setTitle('SECTION A: Magnetic Fields (15 points)');

  // A1: Magnetic poles (3 pts)
  const a1 = form.addMultipleChoiceItem();
  a1.setTitle('A1. What happens when you bring two north poles of different magnets close together?')
  a1.setPoints(3)
  a1.setChoices([
    a1.createChoice('They attract each other strongly', false),
    a1.createChoice('They repel each other', true),
    a1.createChoice('Nothing happens—poles don\'t interact', false),
    a1.createChoice('They create a spark', false)
  ])
  a1.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Correct! Like poles repel, opposite poles attract. This is fundamental to magnetic behavior.').build())
  a1.setFeedbackForIncorrect(FormApp.createFeedback().setText('Remember the basic rule: Like poles (N-N or S-S) repel. Opposite poles (N-S) attract.').build());

  // A2: Magnetic field strength (4 pts)
  const a2 = form.addMultipleChoiceItem();
  a2.setTitle('A2. How does magnetic field strength change as you move away from a magnet?')
  a2.setPoints(4)
  a2.setChoices([
    a2.createChoice('It stays constant at all distances', false),
    a2.createChoice('It increases with distance', false),
    a2.createChoice('It decreases rapidly (inverse cube relationship) with distance', true),
    a2.createChoice('It only exists at the poles, not in between', false)
  ])
  a2.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Magnetic field strength decreases rapidly with distance! At twice the distance, the field is about 1/8 as strong (for a dipole).').build())
  a2.setFeedbackForIncorrect(FormApp.createFeedback().setText('Think about your experience: Can a magnet attract things from across the room? Why does it only work when close?').build());

  // A3: Magnetic field lines (4 pts)
  const a3 = form.addMultipleChoiceItem();
  a3.setTitle('A3. Magnetic field lines around a bar magnet flow from:')
  a3.setPoints(4)
  a3.setChoices([
    a3.createChoice('South pole to north pole outside the magnet', false),
    a3.createChoice('North pole to south pole outside the magnet, forming closed loops through the magnet', true),
    a3.createChoice('Both poles outward in straight lines', false),
    a3.createChoice('Only inside the magnet, not outside', false)
  ])
  a3.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Field lines exit the north pole, curve around, enter the south pole, and continue through the magnet—forming closed loops. No magnetic field line has an end!').build())
  a3.setFeedbackForIncorrect(FormApp.createFeedback().setText('Magnetic field lines form closed loops (unlike electric field lines). They exit from N, curve through space, enter S, and continue through the magnet back to N.').build());

  // A4: Earth's magnetic field (4 pts)
  const a4 = form.addMultipleChoiceItem();
  a4.setTitle('A4. A compass needle always points north because:')
  a4.setPoints(4)
  a4.setChoices([
    a4.createChoice('The needle is attracted to Earth\'s geographic north pole', false),
    a4.createChoice('The compass\'s north pole is attracted to Earth\'s magnetic south pole, which is located near geographic north', true),
    a4.createChoice('Compasses are programmed to point north', false),
    a4.createChoice('Earth has no magnetic field—compasses use GPS', false)
  ])
  a4.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Tricky but important! Earth\'s magnetic "north" pole is actually a magnetic south pole (attracting compass north poles). That\'s why compasses point north!').build())
  a4.setFeedbackForIncorrect(FormApp.createFeedback().setText('Opposite poles attract. If a compass\'s north pole points north, Earth must have a magnetic south pole near geographic north. Earth\'s field is like a giant bar magnet tilted ~11° from the axis.').build());

  // ═══════════════════════════════════════════════════════════════════════
  // SECTION B: ELECTROMAGNETISM (15 pts)
  // ═══════════════════════════════════════════════════════════════════════

  form.addSectionHeaderItem().setTitle('SECTION B: Electromagnetism (15 points)');

  // B1: Current and magnetic field (4 pts)
  const b1 = form.addMultipleChoiceItem();
  b1.setTitle('B1. When electric current flows through a wire, what happens around the wire?')
  b1.setPoints(4)
  b1.setChoices([
    b1.createChoice('The wire becomes permanently magnetic', false),
    b1.createChoice('A magnetic field is created around the wire, which disappears when current stops', true),
    b1.createChoice('The wire repels all nearby objects', false),
    b1.createChoice('Nothing happens—wires don\'t create magnetic fields', false)
  ])
  b1.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ This is Oersted\'s discovery from 1820! Moving charges (current) create magnetic fields. Stop the current, and the magnetic field disappears.').build())
  b1.setFeedbackForIncorrect(FormApp.createFeedback().setText('Electric current = moving charges. Moving charges create magnetic fields. This temporary magnetism is the basis for electromagnets!').build());

  // B2: Electromagnet strength (4 pts)
  const b2 = form.addMultipleChoiceItem();
  b2.setTitle('B2. How can you make an electromagnet stronger? Select the BEST answer.')
  b2.setPoints(4)
  b2.setChoices([
    b2.createChoice('Use less current and fewer coils', false),
    b2.createChoice('Increase current, add more coil turns, and use an iron core', true),
    b2.createChoice('Use copper wire instead of iron wire', false),
    b2.createChoice('Make the coil larger in diameter', false)
  ])
  b2.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Three ways to strengthen: (1) More current = stronger field, (2) More coils = concentrated field, (3) Iron core = amplifies field ~1000×.').build())
  b2.setFeedbackForIncorrect(FormApp.createFeedback().setText('Electromagnet strength depends on current (more = stronger), coil turns (more = concentrated), and core material (iron amplifies the field dramatically).').build());

  // B3: Electromagnetic induction (4 pts)
  const b3 = form.addMultipleChoiceItem();
  b3.setTitle('B3. Faraday discovered that moving a magnet through a coil of wire produces:')
  b3.setPoints(4)
  b3.setChoices([
    b3.createChoice('Heat in the wire', false),
    b3.createChoice('An electric current in the wire (electromagnetic induction)', true),
    b3.createChoice('A permanent magnet in the coil', false),
    b3.createChoice('Nothing—magnets can\'t affect wires', false)
  ])
  b3.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Faraday\'s discovery (1831) is the basis for generators! Changing magnetic field → induced current. This is the reverse of what happens in motors.').build())
  b3.setFeedbackForIncorrect(FormApp.createFeedback().setText('Just as current creates magnetic fields, changing magnetic fields create current. This reciprocal relationship is electromagnetic induction—the basis for generators!').build());

  // B4: Motor vs generator (3 pts)
  const b4 = form.addMultipleChoiceItem();
  b4.setTitle('B4. What is the main difference between an electric motor and a generator?')
  b4.setPoints(3)
  b4.setChoices([
    b4.createChoice('Motors use magnetism; generators don\'t', false),
    b4.createChoice('Motors convert electrical energy to mechanical; generators convert mechanical to electrical', true),
    b4.createChoice('Generators are always bigger than motors', false),
    b4.createChoice('There is no difference—they\'re the same device', false)
  ])
  b4.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Opposite energy conversions! Motor: electrical→mechanical (current + magnet = rotation). Generator: mechanical→electrical (rotation + magnet = current).').build())
  b4.setFeedbackForIncorrect(FormApp.createFeedback().setText('Think about energy flow: In a motor, you put in electricity and get motion. In a generator, you put in motion and get electricity. Opposite directions!').build());

  // ═══════════════════════════════════════════════════════════════════════
  // SECTION C: ELECTRIC CIRCUITS (15 pts)
  // ═══════════════════════════════════════════════════════════════════════

  form.addSectionHeaderItem().setTitle('SECTION C: Electric Circuits (15 points)');

  // C1: Ohm's Law calculation (4 pts)
  const c1 = form.addMultipleChoiceItem();
  c1.setTitle('C1. A circuit has a 9V battery and a 3Ω resistor. What current flows through the circuit?')
  c1.setPoints(4)
  c1.setChoices([
    c1.createChoice('27 A (9 × 3)', false),
    c1.createChoice('3 A (9 ÷ 3)', true),
    c1.createChoice('6 A (9 - 3)', false),
    c1.createChoice('0.33 A (3 ÷ 9)', false)
  ])
  c1.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Using Ohm\'s Law: I = V/R = 9V ÷ 3Ω = 3A. Current equals voltage divided by resistance.').build())
  c1.setFeedbackForIncorrect(FormApp.createFeedback().setText('Ohm\'s Law: V = IR, so I = V/R. Substitute: I = 9V ÷ 3Ω = ?').build());

  // C2: Power calculation (4 pts)
  const c2 = form.addMultipleChoiceItem();
  c2.setTitle('C2. A device draws 2A from a 120V outlet. How much power does it use?')
  c2.setPoints(4)
  c2.setChoices([
    c2.createChoice('60 W (120 ÷ 2)', false),
    c2.createChoice('240 W (120 × 2)', true),
    c2.createChoice('122 W (120 + 2)', false),
    c2.createChoice('118 W (120 - 2)', false)
  ])
  c2.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ P = IV = 2A × 120V = 240W. This device uses about as much power as 4 standard incandescent light bulbs.').build())
  c2.setFeedbackForIncorrect(FormApp.createFeedback().setText('P = I × V. Substitute: P = 2A × 120V = ?').build());

  // C3: Series vs parallel (4 pts)
  const c3 = form.addMultipleChoiceItem();
  c3.setTitle('C3. If one bulb burns out in a series circuit, what happens to the other bulbs? What about in a parallel circuit?')
  c3.setPoints(4)
  c3.setChoices([
    c3.createChoice('Both: all bulbs go out', false),
    c3.createChoice('Series: all bulbs go out (broken path); Parallel: other bulbs stay on (independent paths)', true),
    c3.createChoice('Series: other bulbs get brighter; Parallel: all go out', false),
    c3.createChoice('Circuit type doesn\'t affect what happens', false)
  ])
  c3.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Key difference! Series = one path (break anywhere stops everything). Parallel = multiple paths (each branch is independent).').build())
  c3.setFeedbackForIncorrect(FormApp.createFeedback().setText('In series, current has ONE path—break it anywhere and all current stops. In parallel, current has MULTIPLE paths—breaking one doesn\'t affect others.').build());

  // C4: Energy vs power (3 pts)
  const c4 = form.addMultipleChoiceItem();
  c4.setTitle('C4. A 100W light bulb runs for 10 hours. How much energy does it use?')
  c4.setPoints(3)
  c4.setChoices([
    c4.createChoice('1000 W', false),
    c4.createChoice('1000 Wh or 1 kWh (100W × 10h)', true),
    c4.createChoice('10 W (100 ÷ 10)', false),
    c4.createChoice('110 Wh (100 + 10)', false)
  ])
  c4.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Energy = Power × Time = 100W × 10h = 1000 Wh = 1 kWh. This is how electric companies bill you—for energy used, not power!').build())
  c4.setFeedbackForIncorrect(FormApp.createFeedback().setText('Energy = Power × Time. Units: Watts × hours = Watt-hours (Wh). 100W × 10h = 1000 Wh = 1 kWh.').build());

  // ═══════════════════════════════════════════════════════════════════════
  // SECTION D: MOTORS & GENERATORS (15 pts)
  // ═══════════════════════════════════════════════════════════════════════

  form.addSectionHeaderItem().setTitle('SECTION D: Motors & Generators (15 points)');

  // D1: Motor operation (4 pts)
  const d1 = form.addMultipleChoiceItem();
  d1.setTitle('D1. How does an electric motor produce rotation?')
  d1.setPoints(4)
  d1.setChoices([
    d1.createChoice('Electric current heats the motor, causing expansion and rotation', false),
    d1.createChoice('Current through coils creates magnetic fields that interact with permanent magnets, producing force that causes rotation', true),
    d1.createChoice('Electricity flows in a circle, making the motor spin in a circle', false),
    d1.createChoice('Motors spin due to the weight of the spinning parts', false)
  ])
  d1.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Motors = practical electromagnetism! Current in coils → magnetic field → interaction with permanent magnets → force → rotation. Switch current direction → continuous spin.').build())
  d1.setFeedbackForIncorrect(FormApp.createFeedback().setText('Remember: Current creates magnetic fields. Magnetic fields exert forces on each other. In a motor, these forces are arranged to produce continuous rotation.').build());

  // D2: Efficiency calculation (4 pts)
  const d2 = form.addMultipleChoiceItem();
  d2.setTitle('D2. A motor draws 500W of electrical power and produces 400W of mechanical power. What is its efficiency?')
  d2.setPoints(4)
  d2.setChoices([
    d2.createChoice('125% (500 ÷ 400)', false),
    d2.createChoice('80% (400 ÷ 500)', true),
    d2.createChoice('900 W (400 + 500)', false),
    d2.createChoice('100 W (500 - 400)', false)
  ])
  d2.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Efficiency = Output/Input × 100% = 400/500 × 100% = 80%. The other 100W (20%) becomes heat.').build())
  d2.setFeedbackForIncorrect(FormApp.createFeedback().setText('Efficiency = (Output ÷ Input) × 100% = (400W ÷ 500W) × 100% = ?').build());

  // D3: Mechanical advantage (4 pts)
  const d3 = form.addMultipleChoiceItem();
  d3.setTitle('D3. A gear system has mechanical advantage of 10. If you apply 5 Nm of torque to the input, what torque is produced at the output?')
  d3.setPoints(4)
  d3.setChoices([
    d3.createChoice('0.5 Nm (5 ÷ 10)', false),
    d3.createChoice('50 Nm (5 × 10)', true),
    d3.createChoice('15 Nm (5 + 10)', false),
    d3.createChoice('5 Nm (unchanged)', false)
  ])
  d3.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ MA = Output/Input, so Output = Input × MA = 5 Nm × 10 = 50 Nm. But remember: the output shaft spins 10× slower!').build())
  d3.setFeedbackForIncorrect(FormApp.createFeedback().setText('Mechanical Advantage multiplies force (or torque): Output = Input × MA = 5 Nm × 10 = ?').build());

  // D4: Energy conservation in machines (3 pts)
  const d4 = form.addMultipleChoiceItem();
  d4.setTitle('D4. A machine has MA = 20, meaning you apply 1/20 the force. Why don\'t machines give us "free" force multiplication?')
  d4.setPoints(3)
  d4.setChoices([
    d4.createChoice('Machines DO give free force—that\'s why we use them', false),
    d4.createChoice('To apply 1/20 the force, you must move 20× the distance; total work (force × distance) is conserved', true),
    d4.createChoice('Force multiplication only works in theory, not in real machines', false),
    d4.createChoice('Machines actually reduce the work needed', false)
  ])
  d4.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ No free lunch in physics! Work In = Work Out (minus friction losses). MA trades force for distance, not create energy from nothing.').build())
  d4.setFeedbackForIncorrect(FormApp.createFeedback().setText('Conservation of energy: Work = Force × Distance. If force is divided by 20, distance must be multiplied by 20 to keep work constant.').build());

  Logger.log('G8.C6.W5 Part 2 created: ' + form.getEditUrl());
  return form;
}

// ═══════════════════════════════════════════════════════════════════════════
// PART 3: MISCONCEPTION CHECK (20 points)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Creates Part 3: Misconception Check targeting common misconceptions
 * Time: 20 minutes
 * Targets: magnets-unlimited, electricity-consumed, em-unrelated
 */
function createG8C6W5Part3MisconceptionCheck() {
  const form = FormApp.create('G8.C6.W5: Part 3 - Misconception Check');
  form.setDescription(
    '🧠 MISCONCEPTION CHECK: Testing Scientific Understanding\n\n' +
    'This section specifically targets common misconceptions about electricity and magnetism. ' +
    'Read each question carefully—they\'re designed to reveal whether you truly understand these concepts ' +
    'or are relying on common (but incorrect) ideas.\n\n' +
    'Time: 20 minutes\n' +
    'Points: 20'
  );
  form.setIsQuiz(true);
  form.setShuffleQuestions(false);

  // M1: Magnets-unlimited misconception (4 pts)
  const m1 = form.addMultipleChoiceItem();
  m1.setTitle('M1. A student thinks magnets have unlimited strength that works at any distance. How would you correct this misconception?')
  m1.setHelpText('Think about how magnetic field strength varies with distance.')
  m1.setPoints(4)
  m1.setChoices([
    m1.createChoice('The student is correct—magnets work at any distance', false),
    m1.createChoice('Magnetic field strength decreases rapidly with distance (inverse cube); magnets can also lose strength over time if damaged or heated', true),
    m1.createChoice('Magnets only work when touching objects', false),
    m1.createChoice('Magnetic strength is constant everywhere', false)
  ])
  m1.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Two important limitations: (1) Field strength falls off rapidly with distance, (2) Magnets can demagnetize from heat, impact, or opposing fields over time.').build())
  m1.setFeedbackForIncorrect(FormApp.createFeedback().setText('Test it: Can a refrigerator magnet attract a paper clip from across the room? Why not? Field strength drops dramatically with distance.').build());

  // M2: Electricity-consumed misconception (4 pts)
  const m2 = form.addMultipleChoiceItem();
  m2.setTitle('M2. A student says "The light bulb uses up electricity—that\'s why the battery runs out." What\'s wrong with this statement?')
  m2.setHelpText('Think about what actually happens to electrical energy.')
  m2.setPoints(4)
  m2.setChoices([
    m2.createChoice('Nothing is wrong—electricity IS used up in circuits', false),
    m2.createChoice('Energy is transformed (to light and heat), not consumed; charges flow in a complete circuit and aren\'t "used up"—the battery\'s chemical energy is depleted', true),
    m2.createChoice('Bulbs don\'t actually use electricity', false),
    m2.createChoice('Batteries create new electricity, so nothing is used', false)
  ])
  m2.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Critical distinction! Electric charge flows in closed loops—same number of electrons return as leave. Energy is TRANSFORMED (chemical→electrical→light/heat), not destroyed.').build())
  m2.setFeedbackForIncorrect(FormApp.createFeedback().setText('Follow the charges: They leave the battery, flow through the bulb, and return to the battery. Same charges! What changes is the battery\'s stored chemical energy.').build());

  // M3: More on electricity-consumed (4 pts)
  const m3 = form.addMultipleChoiceItem();
  m3.setTitle('M3. If electric charges aren\'t "used up," why do we say a device "consumes" 100 watts?')
  m3.setHelpText('Think about what is actually being measured.')
  m3.setPoints(4)
  m3.setChoices([
    m3.createChoice('The charges ARE used up—the misconception correction is wrong', false),
    m3.createChoice('We\'re measuring the rate of energy transformation, not charge consumption; energy is transformed from one form to another at 100 joules per second', true),
    m3.createChoice('100 watts means 100 electrons are used per second', false),
    m3.createChoice('"Consumes" is just a figure of speech with no real meaning', false)
  ])
  m3.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Watts measure power = energy transfer rate. "100W" means 100 joules of energy are transformed each second. Charges carry the energy but aren\'t consumed themselves.').build())
  m3.setFeedbackForIncorrect(FormApp.createFeedback().setText('Power = Rate of energy transfer. 100W = 100 joules per second being transformed from electrical energy to other forms (light, heat, motion, etc.).').build());

  // M4: EM-unrelated misconception (4 pts)
  const m4 = form.addMultipleChoiceItem();
  m4.setTitle('M4. A student believes electricity and magnetism are completely separate, unrelated phenomena. How would you demonstrate they\'re connected?')
  m4.setHelpText('Think about what evidence shows the connection.')
  m4.setPoints(4)
  m4.setChoices([
    m4.createChoice('They ARE separate—the student is correct', false),
    m4.createChoice('Demonstrate: (1) Current through a wire deflects a compass (current→magnetic field), (2) Moving a magnet near a coil produces current (magnetic field→current)', true),
    m4.createChoice('Just tell them Maxwell said they\'re connected', false),
    m4.createChoice('Show them a battery and a magnet side by side', false)
  ])
  m4.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Two key demonstrations prove the connection: Oersted (1820) showed current creates magnetism; Faraday (1831) showed changing magnetism creates current. They\'re two aspects of one force!').build())
  m4.setFeedbackForIncorrect(FormApp.createFeedback().setText('The connection can be demonstrated: Place a compass near a current-carrying wire—it deflects! Move a magnet through a coil—current flows! These experiments prove the unified nature of electromagnetism.').build());

  // M5: Synthesis question (4 pts)
  const m5 = form.addParagraphTextItem();
  m5.setTitle('M5. Explain why understanding that electricity and magnetism are unified (electromagnetism) is essential for understanding how modern technology works. Give at least TWO examples of technologies that would be impossible to understand without this knowledge.')
  m5.setHelpText('Think about devices that depend on the interaction between electric and magnetic effects.')
  m5.setPoints(4);

  Logger.log('G8.C6.W5 Part 3 created: ' + form.getEditUrl());
  return form;
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN EXECUTION & UTILITIES
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Creates all forms for G8.C6.W5
 */
function createAllG8C6W5Forms() {
  Logger.log('═══════════════════════════════════════════════════════════════');
  Logger.log('Creating G8.C6.W5: Synthesis & Assessment');
  Logger.log('═══════════════════════════════════════════════════════════════');

  const part1 = createG8C6W5Part1SynthesisReview();
  const part2 = createG8C6W5Part2Assessment();
  const part3 = createG8C6W5Part3MisconceptionCheck();

  Logger.log('═══════════════════════════════════════════════════════════════');
  Logger.log('G8.C6.W5 Forms Creation Complete!');
  Logger.log('Total Points: ' + validateG8C6W5Points());
  Logger.log('═══════════════════════════════════════════════════════════════');

  return {
    part1: part1,
    part2: part2,
    part3: part3
  };
}

/**
 * Validates that total points equal 100
 */
function validateG8C6W5Points() {
  const points = G8_C6_W5_CONFIG.points;
  const total = points.part1SynthesisReview + points.part2Assessment + points.part3MisconceptionCheck;

  if (total !== 100) {
    Logger.log('⚠️ WARNING: Total points = ' + total + ', expected 100');
  }

  return total;
}
