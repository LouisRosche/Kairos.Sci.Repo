/**
 * ═══════════════════════════════════════════════════════════════════════════
 * GRADE 8 CYCLE 6 WEEK 4: Electric Motors & Mechanical Advantage
 * STATUS: ✅ COMPLETE - READY FOR REVIEW
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Driving Phenomenon: How can a tiny electric motor lift a car?
 *
 * Students explore how electric motors convert electrical energy to mechanical
 * energy, and how mechanical advantage systems (gears, pulleys) allow small
 * motors to accomplish large tasks like lifting vehicles.
 *
 * Weekly Structure:
 * - Hook: The Tiny Motor Mystery (12 pts)
 * - Station 1: Motor Efficiency Investigation (20 pts)
 * - Station 2: Mechanical Advantage Analysis (20 pts)
 * - Station 3: Design a Lifting System (25 pts)
 * - Exit Ticket: Motor Systems Integration (23 pts)
 *
 * Standards Alignment:
 * - MS-PS2-3: Electric and magnetic forces
 * - MS-PS3-5: Energy transfer in mechanical systems
 *
 * Spiral Integration:
 * - From C6W3: Circuit power and energy calculations
 * - From C6W2: Electromagnetism principles
 *
 * ═══════════════════════════════════════════════════════════════════════════
 */

// ═══════════════════════════════════════════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════

const G8_C6_W4_CONFIG = {
  grade: 8,
  cycle: 6,
  week: 4,
  topic: 'Electric Motors & Mechanical Advantage',
  phenomenon: 'How can a tiny electric motor lift a car?',

  standards: {
    primary: ['MS-PS2-3', 'MS-PS3-5'],
    spiral: ['MS-PS2-3', 'MS-PS3-2']
  },

  points: {
    hook: 12,
    station1: 20,
    station2: 20,
    station3: 25,
    exitTicket: 23,
    total: 100
  },

  misconceptions: {
    motorsCreateForce: {
      id: 'motors-create-force',
      wrong: 'Motors create force from nothing',
      correct: 'Motors convert electrical energy to mechanical energy; energy is conserved but transformed',
      targetedIn: ['hook_q3', 's1_q3', 'exit_q1']
    },
    gearsMakeFreeEnergy: {
      id: 'gears-free-energy',
      wrong: 'Gears and pulleys create extra force for free',
      correct: 'Mechanical advantage trades force for distance; work in = work out (minus friction)',
      targetedIn: ['s2_q2', 's2_q4', 'exit_q2']
    },
    biggerMotorBetter: {
      id: 'bigger-always-better',
      wrong: 'A bigger motor is always better for any task',
      correct: 'Motor selection depends on required torque, speed, and efficiency for the specific application',
      targetedIn: ['s1_q5', 's3_q3']
    }
  },

  spiralTargets: {
    cycle6Week3: {
      topic: 'Circuit power calculations',
      connection: 'Apply P=IV to motor power requirements and energy consumption'
    },
    cycle6Week2: {
      topic: 'Electromagnetism',
      connection: 'Connect electromagnetic principles to motor operation'
    }
  },

  formIds: {
    hook: null,
    station1: null,
    station2: null,
    station3: null,
    exitTicket: null
  }
};

// ═══════════════════════════════════════════════════════════════════════════
// HOOK: THE TINY MOTOR MYSTERY (12 points)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Creates the Hook form introducing the motor mystery
 * Resource: Car jack demonstration + motor specifications
 */
function createG8C6W4Hook() {
  const form = FormApp.create('G8.C6.W4: Hook - The Tiny Motor Mystery');
  form.setDescription(
    '🚗 THE TINY MOTOR MYSTERY ⚡\n\n' +
    'A typical car weighs about 1,500 kg (3,300 lbs). Yet a small electric car jack with a motor ' +
    'smaller than your fist can lift that entire car! The motor runs on 12 volts from the car battery ' +
    'and draws only about 15 amps.\n\n' +
    'How can such a small motor lift something thousands of times heavier than itself? ' +
    'Today we\'ll investigate motors, energy, and mechanical advantage.'
  );
  form.setIsQuiz(true);
  form.setShuffleQuestions(false);

  // Q1: Initial observation (2 pts)
  const q1 = form.addMultipleChoiceItem();
  q1.setTitle('Watch the demonstration of the electric car jack lifting a vehicle. What do you observe about HOW the car is lifted?')
  q1.setHelpText('Pay attention to the speed and mechanism of lifting.')
  q1.setPoints(2)
  q1.setChoices([
    q1.createChoice('The car shoots up instantly in one quick motion', false),
    q1.createChoice('The car rises slowly through a screw mechanism, taking several minutes', true),
    q1.createChoice('The car is lifted by the motor pushing directly upward', false),
    q1.createChoice('The car floats upward magnetically', false)
  ])
  q1.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Great observation! The slow speed is a critical clue—the jack trades speed for force through its mechanical design.').build())
  q1.setFeedbackForIncorrect(FormApp.createFeedback().setText('Watch again—does the car shoot up quickly or rise gradually? How long does it take?').build());

  // Q2: Power calculation (3 pts)
  const q2 = form.addMultipleChoiceItem();
  q2.setTitle('The motor uses 12 volts and 15 amps. Using P = I × V, calculate the motor\'s power consumption.')
  q2.setHelpText('Remember: Power (watts) = Current (amps) × Voltage (volts)')
  q2.setPoints(3)
  q2.setChoices([
    q2.createChoice('27 watts (12 + 15)', false),
    q2.createChoice('180 watts (12 × 15)', true),
    q2.createChoice('0.8 watts (12 ÷ 15)', false),
    q2.createChoice('1500 watts', false)
  ])
  q2.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Correct! P = 12V × 15A = 180W. That\'s about the same as two incandescent light bulbs—not much power to lift a car!').build())
  q2.setFeedbackForIncorrect(FormApp.createFeedback().setText('Use P = I × V. Substitute: P = 15 amps × 12 volts = ? watts').build());

  // Q3: Energy source question - targets motors-create-force misconception (3 pts)
  const q3 = form.addMultipleChoiceItem();
  q3.setTitle('A student says the motor "creates" the force to lift the car. What\'s a more accurate description?')
  q3.setHelpText('Think about energy conservation.')
  q3.setPoints(3)
  q3.setChoices([
    q3.createChoice('The motor does create force from nothing—that\'s how motors work', false),
    q3.createChoice('The motor converts electrical energy from the battery into mechanical energy (motion)', true),
    q3.createChoice('The motor borrows force from the ground', false),
    q3.createChoice('The motor uses heat from the engine to lift the car', false)
  ])
  q3.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Energy transformation, not creation! The battery\'s chemical energy → electrical energy → mechanical energy. Energy is conserved, just converted.').build())
  q3.setFeedbackForIncorrect(FormApp.createFeedback().setText('Remember the law of energy conservation: Energy cannot be created or destroyed, only transformed. Where does the lifting energy originally come from?').build());

  // Q4: Prediction (2 pts)
  const q4 = form.addParagraphTextItem();
  q4.setTitle('How do you think a 180-watt motor can lift a 1,500 kg car? Propose at least one idea about what allows this seemingly impossible task.')
  q4.setHelpText('Think about: What are you trading off when you lift something slowly?')
  q4.setPoints(2);

  // Q5: Question generation (2 pts)
  const q5 = form.addParagraphTextItem();
  q5.setTitle('What questions do you have about how motors, gears, or mechanical systems can multiply force?')
  q5.setHelpText('Think about what you\'d want to investigate to understand this phenomenon.')
  q5.setPoints(2);

  Logger.log('G8.C6.W4 Hook created: ' + form.getEditUrl());
  return form;
}

// ═══════════════════════════════════════════════════════════════════════════
// STATION 1: MOTOR EFFICIENCY INVESTIGATION (20 points)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Creates Station 1 form on motor efficiency and energy transfer
 * Resource: Motor simulation + torque/speed data + efficiency calculations
 * Spiral: Circuit power from Week 3
 */
function createG8C6W4Station1() {
  const form = FormApp.create('G8.C6.W4: Station 1 - Motor Efficiency Investigation');
  form.setDescription(
    '⚡ MOTOR EFFICIENCY INVESTIGATION\n\n' +
    'Electric motors convert electrical energy to mechanical energy, but not perfectly. ' +
    'Some energy is always "lost" to heat due to friction and electrical resistance.\n\n' +
    'Motor Efficiency = (Mechanical Output Power ÷ Electrical Input Power) × 100%\n\n' +
    'Use the motor simulation to explore how motors balance torque (rotational force) and speed.'
  );
  form.setIsQuiz(true);
  form.setShuffleQuestions(false);

  // Q1: Efficiency calculation (3 pts)
  const q1 = form.addMultipleChoiceItem();
  q1.setTitle('A motor draws 200W of electrical power and produces 150W of mechanical power. What is its efficiency?')
  q1.setHelpText('Efficiency = (Output ÷ Input) × 100%')
  q1.setPoints(3)
  q1.setChoices([
    q1.createChoice('50W', false),
    q1.createChoice('75%', true),
    q1.createChoice('133%', false),
    q1.createChoice('350W', false)
  ])
  q1.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Correct! Efficiency = (150W ÷ 200W) × 100% = 75%. The other 50W (25%) becomes heat.').build())
  q1.setFeedbackForIncorrect(FormApp.createFeedback().setText('Efficiency = Output ÷ Input × 100%. Substitute: (150W ÷ 200W) × 100% = ?').build());

  // Q2: Torque-speed tradeoff (4 pts)
  const q2 = form.addMultipleChoiceItem();
  q2.setTitle('In the simulation, when you increase the load on the motor (make it work harder), what happens to its speed and torque?')
  q2.setHelpText('Observe the motor behavior under different loads.')
  q2.setPoints(4)
  q2.setChoices([
    q2.createChoice('Both speed and torque increase', false),
    q2.createChoice('Speed decreases but torque increases to handle the load', true),
    q2.createChoice('Speed increases but torque decreases', false),
    q2.createChoice('Both remain constant regardless of load', false)
  ])
  q2.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ This is the torque-speed tradeoff! At fixed power, increasing torque means decreasing speed: Power = Torque × Angular Speed.').build())
  q2.setFeedbackForIncorrect(FormApp.createFeedback().setText('Think about the power equation: Power = Torque × Speed. If power is constant and torque must increase for a heavier load, what must speed do?').build());

  // Q3: Energy transformation - targets motors-create-force misconception (4 pts)
  const q3 = form.addMultipleChoiceItem();
  q3.setTitle('The simulation shows that motor output power is always LESS than input power. Why can\'t a motor produce MORE mechanical power than the electrical power it receives?')
  q3.setHelpText('Think about the fundamental law of energy conservation.')
  q3.setPoints(4)
  q3.setChoices([
    q3.createChoice('Motors just aren\'t advanced enough yet—future motors might exceed 100% efficiency', false),
    q3.createChoice('Energy conservation: you can\'t get more energy out than you put in; some is always lost to heat', true),
    q3.createChoice('The motor company designed it poorly', false),
    q3.createChoice('Electricity is weaker than mechanical energy', false)
  ])
  q3.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Fundamental physics! The first law of thermodynamics says energy can\'t be created. Motors transform energy with some inevitable losses to heat (friction, resistance).').build())
  q3.setFeedbackForIncorrect(FormApp.createFeedback().setText('If motors could exceed 100% efficiency, they\'d be creating energy from nothing—violating a fundamental law of physics. Why is this impossible?').build());

  // Q4: Spiral - Power calculation from circuits (3 pts)
  const q4 = form.addMultipleChoiceItem();
  q4.setTitle('SPIRAL FROM WEEK 3: A car jack motor runs at 12V and draws 15A. If it runs for 5 minutes (300 seconds), how much energy does it consume?')
  q4.setHelpText('Remember: Power = V × I, and Energy = Power × Time')
  q4.setPoints(3)
  q4.setChoices([
    q4.createChoice('180 joules', false),
    q4.createChoice('54,000 joules (180W × 300s)', true),
    q4.createChoice('900 joules', false),
    q4.createChoice('36 joules', false)
  ])
  q4.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Great circuit application! P = 12V × 15A = 180W. Energy = 180W × 300s = 54,000J = 54 kJ.').build())
  q4.setFeedbackForIncorrect(FormApp.createFeedback().setText('Step by step: (1) P = V × I = 12 × 15 = 180W. (2) E = P × t = 180W × 300s = ?').build());

  // Q5: Motor selection - targets bigger-always-better misconception (3 pts)
  const q5 = form.addMultipleChoiceItem();
  q5.setTitle('A drone needs a motor that\'s lightweight and spins very fast. A car jack needs a motor with high torque that spins slowly. Why wouldn\'t you use the same motor for both?')
  q5.setHelpText('Consider the specific requirements of each application.')
  q5.setPoints(3)
  q5.setChoices([
    q5.createChoice('The same motor could work for both—just change the settings', false),
    q5.createChoice('Different applications require motors optimized for different torque-speed combinations; one size doesn\'t fit all', true),
    q5.createChoice('Bigger motors are always better', false),
    q5.createChoice('Motor selection doesn\'t matter as long as it has enough power', false)
  ])
  q5.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Motor selection is application-specific! Drones need high-speed, low-torque motors for propellers. Car jacks need high-torque, low-speed motors for lifting.').build())
  q5.setFeedbackForIncorrect(FormApp.createFeedback().setText('Think about what each device needs: A drone needs fast propeller spin (speed). A jack needs to lift heavy weight (torque). Are these the same requirement?').build());

  // Q6: Heat and efficiency (3 pts)
  const q6 = form.addMultipleChoiceItem();
  q6.setTitle('Why do motors get hot during operation, and why does this matter for efficiency?')
  q6.setHelpText('Consider where the "lost" energy goes.')
  q6.setPoints(3)
  q6.setChoices([
    q6.createChoice('Motors get hot because they absorb heat from the surroundings', false),
    q6.createChoice('Heat represents energy that wasn\'t converted to useful mechanical work—higher heat means lower efficiency', true),
    q6.createChoice('Heat makes motors work better', false),
    q6.createChoice('Motors don\'t actually get hot during normal operation', false)
  ])
  q6.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Exactly! Heat = wasted energy. If a 200W motor produces 50W of heat, only 150W becomes useful mechanical output (75% efficiency).').build())
  q6.setFeedbackForIncorrect(FormApp.createFeedback().setText('Energy that doesn\'t become mechanical motion must go somewhere. Heat is the form that "lost" energy takes. More heat = more energy lost = lower efficiency.').build());

  Logger.log('G8.C6.W4 Station 1 created: ' + form.getEditUrl());
  return form;
}

// ═══════════════════════════════════════════════════════════════════════════
// STATION 2: MECHANICAL ADVANTAGE ANALYSIS (20 points)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Creates Station 2 form on mechanical advantage
 * Resource: Gear ratios + pulley systems + force multiplication data
 */
function createG8C6W4Station2() {
  const form = FormApp.create('G8.C6.W4: Station 2 - Mechanical Advantage Analysis');
  form.setDescription(
    '⚙️ MECHANICAL ADVANTAGE ANALYSIS\n\n' +
    'Mechanical advantage (MA) is the factor by which a machine multiplies force.\n\n' +
    'MA = Output Force ÷ Input Force\n\n' +
    'Simple machines like gears, pulleys, and levers let you trade distance for force. ' +
    'With MA = 10, you can lift 1000N by applying only 100N of force—but you must move 10× farther!\n\n' +
    'Investigate how gear ratios and pulley systems create mechanical advantage.'
  );
  form.setIsQuiz(true);
  form.setShuffleQuestions(false);

  // Q1: Mechanical advantage calculation (4 pts)
  const q1 = form.addMultipleChoiceItem();
  q1.setTitle('A car jack allows you to lift a 15,000N car by applying 500N of force. What is the mechanical advantage?')
  q1.setHelpText('MA = Output Force ÷ Input Force')
  q1.setPoints(4)
  q1.setChoices([
    q1.createChoice('MA = 500 (input force)', false),
    q1.createChoice('MA = 30 (15,000 ÷ 500)', true),
    q1.createChoice('MA = 15,500 (15,000 + 500)', false),
    q1.createChoice('MA = 0.033 (500 ÷ 15,000)', false)
  ])
  q1.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Correct! MA = 15,000N ÷ 500N = 30. The jack multiplies your force by 30!').build())
  q1.setFeedbackForIncorrect(FormApp.createFeedback().setText('MA = Output Force ÷ Input Force = 15,000N ÷ 500N = ?').build());

  // Q2: Energy conservation - targets gears-free-energy misconception (4 pts)
  const q2 = form.addMultipleChoiceItem();
  q2.setTitle('If a jack has MA = 30, you only need 500N to lift 15,000N. Does this mean you\'re getting "free" force?')
  q2.setHelpText('Think about what you trade off when using mechanical advantage.')
  q2.setPoints(4)
  q2.setChoices([
    q2.createChoice('Yes, mechanical advantage creates extra force from nothing', false),
    q2.createChoice('No—you must push 30× farther to lift the car, so total work (Force × Distance) is the same', true),
    q2.createChoice('Yes, simple machines are perpetual motion devices', false),
    q2.createChoice('No, the extra force comes from gravity', false)
  ])
  q2.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ No free lunch! Work In = Work Out. If you apply 1/30 the force, you must move 30× the distance. Energy is conserved.').build())
  q2.setFeedbackForIncorrect(FormApp.createFeedback().setText('Work = Force × Distance. If MA multiplies force by 30, what must happen to distance to keep Work constant? (Hint: energy can\'t be created)').build());

  // Q3: Gear ratios (4 pts)
  const q3 = form.addMultipleChoiceItem();
  q3.setTitle('A small gear with 10 teeth drives a large gear with 50 teeth. What is the gear ratio, and how does it affect torque and speed?')
  q3.setHelpText('Gear ratio = Driven teeth ÷ Driver teeth. Think about the tradeoff.')
  q3.setPoints(4)
  q3.setChoices([
    q3.createChoice('Gear ratio = 5:1; the large gear has 5× more torque but 1/5 the speed', true),
    q3.createChoice('Gear ratio = 1:5; the large gear has 5× more speed but 1/5 the torque', false),
    q3.createChoice('Gear ratio = 60:1; the gears multiply everything', false),
    q3.createChoice('Gear ratio doesn\'t affect torque or speed', false)
  ])
  q3.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Gear ratio = 50÷10 = 5:1. The large gear turns slower (1/5 speed) but with more force (5× torque). Torque × Speed stays constant!').build())
  q3.setFeedbackForIncorrect(FormApp.createFeedback().setText('Gear ratio = Driven teeth ÷ Driver teeth = 50 ÷ 10 = 5. More teeth = slower rotation but more torque. This is the torque-speed tradeoff.').build());

  // Q4: Distance tradeoff - reinforces gears-free-energy misconception correction (4 pts)
  const q4 = form.addMultipleChoiceItem();
  q4.setTitle('To lift a car 30 cm, you must turn the jack handle many times, moving the handle a total distance of about 9 meters. Why is the handle distance so much greater than the lift distance?')
  q4.setHelpText('Think about the relationship between force, distance, and work.')
  q4.setPoints(4)
  q4.setChoices([
    q4.createChoice('The jack is inefficient and wastes most of your effort', false),
    q4.createChoice('Mechanical advantage trades distance for force; to apply less force, you must move farther', true),
    q4.createChoice('The extra movement creates extra energy', false),
    q4.createChoice('The jack handle is poorly designed', false)
  ])
  q4.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ The fundamental tradeoff! 9m ÷ 0.3m = 30 = the mechanical advantage. You moved 30× farther to apply 1/30 the force. Work in ≈ Work out.').build())
  q4.setFeedbackForIncorrect(FormApp.createFeedback().setText('Work = Force × Distance must be conserved. If you use 1/30 the force, you need 30× the distance. Calculate: 9m ÷ 0.3m = 30 = the MA!').build());

  // Q5: Pulley systems (4 pts)
  const q5 = form.addParagraphTextItem();
  q5.setTitle('A pulley system has MA = 4. You need to lift a 400N weight. Calculate: (1) How much force you need to apply, and (2) How far you must pull the rope to lift the weight 1 meter.')
  q5.setHelpText('Use MA for force calculation. Remember: distance is multiplied by MA.')
  q5.setPoints(4);

  Logger.log('G8.C6.W4 Station 2 created: ' + form.getEditUrl());
  return form;
}

// ═══════════════════════════════════════════════════════════════════════════
// STATION 3: DESIGN A LIFTING SYSTEM (25 points)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Creates Station 3 form on designing a motor and gear system
 * Resource: Motor specs + mechanical components + lifting requirements
 */
function createG8C6W4Station3() {
  const form = FormApp.create('G8.C6.W4: Station 3 - Design a Lifting System');
  form.setDescription(
    '🏗️ DESIGN A LIFTING SYSTEM 🔧\n\n' +
    'CHALLENGE: Design a system to lift a 2,000N load using available components.\n\n' +
    'Available Motors:\n' +
    '• Motor A: 50W, high speed (3000 RPM), low torque (0.16 Nm)\n' +
    '• Motor B: 50W, medium speed (500 RPM), medium torque (0.96 Nm)\n' +
    '• Motor C: 50W, low speed (100 RPM), high torque (4.8 Nm)\n\n' +
    'Available Gear Sets: 2:1, 5:1, 10:1, 20:1 ratios\n\n' +
    'Select components and justify your design choices.'
  );
  form.setIsQuiz(true);
  form.setShuffleQuestions(false);

  // Q1: Motor selection (5 pts)
  const q1 = form.addMultipleChoiceItem();
  q1.setTitle('For a lifting application that requires high force but can accept slow speed, which motor is the best starting point?')
  q1.setHelpText('Consider what lifting heavy objects requires: more torque or more speed?')
  q1.setPoints(5)
  q1.setChoices([
    q1.createChoice('Motor A (high speed, low torque)—speed is always better', false),
    q1.createChoice('Motor C (low speed, high torque)—lifting needs force, not speed', true),
    q1.createChoice('Any motor works equally well—just add more gears', false),
    q1.createChoice('Motor A because it spins the fastest', false)
  ])
  q1.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Excellent engineering thinking! Starting with a high-torque motor means you need less gear reduction, which improves efficiency and reduces complexity.').build())
  q1.setFeedbackForIncorrect(FormApp.createFeedback().setText('Lifting = force against gravity = torque. You CAN add gears to increase torque, but starting with a torque-optimized motor is more efficient.').build());

  // Q2: Gear selection (5 pts)
  const q2 = form.addMultipleChoiceItem();
  q2.setTitle('Motor C produces 4.8 Nm of torque at 100 RPM. To lift the 2,000N load with a 0.05m radius drum, you need about 100 Nm of torque. What gear ratio should you select?')
  q2.setHelpText('Required torque ÷ Motor torque = Needed gear ratio')
  q2.setPoints(5)
  q2.setChoices([
    q2.createChoice('2:1 ratio (doubles torque to 9.6 Nm)', false),
    q2.createChoice('5:1 ratio (quintuples torque to 24 Nm)', false),
    q2.createChoice('20:1 ratio (multiplies torque to 96 Nm, close to required 100 Nm)', true),
    q2.createChoice('No gears needed—the motor has enough torque already', false)
  ])
  q2.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Great calculation! 100 Nm needed ÷ 4.8 Nm available ≈ 21:1 ratio needed. The 20:1 gear gets us close (96 Nm), with a small safety margin.').build())
  q2.setFeedbackForIncorrect(FormApp.createFeedback().setText('Needed ratio = Required torque ÷ Motor torque = 100 Nm ÷ 4.8 Nm ≈ 21. Which available ratio is closest?').build());

  // Q3: Trade-off analysis - targets bigger-always-better misconception (5 pts)
  const q3 = form.addMultipleChoiceItem();
  q3.setTitle('Using Motor A (high speed) with a 50:1 gear ratio could also produce enough torque. Why might this be WORSE than Motor C with 20:1 gears?')
  q3.setHelpText('Think about efficiency, complexity, and real-world limitations.')
  q3.setPoints(5)
  q3.setChoices([
    q3.createChoice('It would be exactly the same—power is power', false),
    q3.createChoice('More gear stages = more friction losses, more complexity, and lower overall efficiency', true),
    q3.createChoice('Motor A is cheaper so it\'s always better', false),
    q3.createChoice('Higher gear ratios are always more reliable', false)
  ])
  q3.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Real engineering consideration! Each gear stage adds friction losses (typically 2-5% per stage). A 50:1 reduction needs multiple stages = more losses.').build())
  q3.setFeedbackForIncorrect(FormApp.createFeedback().setText('Every gear interaction has friction. More gears = more friction points. If each stage loses 3% efficiency, 3 stages lose nearly 10%!').build());

  // Q4: Lifting speed calculation (5 pts)
  const q4 = form.addMultipleChoiceItem();
  q4.setTitle('With Motor C (100 RPM) and 20:1 gears, the drum spins at 5 RPM. If the drum radius is 0.05m, how fast does the load rise?')
  q4.setHelpText('Linear speed = RPM × 2π × radius ÷ 60')
  q4.setPoints(5)
  q4.setChoices([
    q4.createChoice('About 2.6 cm per second (relatively slow)', true),
    q4.createChoice('About 26 cm per second (moderately fast)', false),
    q4.createChoice('About 5 meters per second (very fast)', false),
    q4.createChoice('The load can\'t be lifted at this speed', false)
  ])
  q4.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Correct! v = 5 RPM × 2π × 0.05m ÷ 60s = 0.026 m/s ≈ 2.6 cm/s. Slow but steady lifting—exactly what\'s needed for heavy loads!').build())
  q4.setFeedbackForIncorrect(FormApp.createFeedback().setText('v = (5 revolutions/min × 2π × 0.05m radius) ÷ 60 seconds/min = 0.026 m/s = 2.6 cm/s. That\'s the tradeoff for high torque!').build());

  // Q5: System design presentation (5 pts)
  const q5 = form.addParagraphTextItem();
  q5.setTitle('Write a brief design report: (1) State your motor and gear choices, (2) Calculate the final torque and lifting speed, (3) Explain one advantage AND one limitation of your design.')
  q5.setHelpText('A good design report includes technical specifications and honest assessment of tradeoffs.')
  q5.setPoints(5);

  Logger.log('G8.C6.W4 Station 3 created: ' + form.getEditUrl());
  return form;
}

// ═══════════════════════════════════════════════════════════════════════════
// EXIT TICKET: MOTOR SYSTEMS INTEGRATION (23 points)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Creates Exit Ticket assessing week's learning
 * Structure: 2 New + 2 Spiral + 1 Integration + 1 SEP
 */
function createG8C6W4ExitTicket() {
  const form = FormApp.create('G8.C6.W4: Exit Ticket - Motor Systems Integration');
  form.setDescription(
    '🎯 EXIT TICKET: Motor Systems Integration\n\n' +
    'Demonstrate your understanding of electric motors, energy efficiency, and mechanical advantage.\n\n' +
    'This is an individual assessment—complete it on your own.'
  );
  form.setIsQuiz(true);
  form.setShuffleQuestions(false);

  // NEW Q1: Energy transformation - targets motors-create-force misconception (4 pts)
  const q1 = form.addMultipleChoiceItem();
  q1.setTitle('NEW CONTENT: A motor converts 200W of electrical power into 160W of mechanical power. Where does the other 40W go?')
  q1.setHelpText('Think about energy conservation and what happens to "lost" energy.')
  q1.setPoints(4)
  q1.setChoices([
    q1.createChoice('It disappears—some energy is always destroyed', false),
    q1.createChoice('It becomes heat due to friction and electrical resistance in the motor', true),
    q1.createChoice('It gets stored in the motor for later use', false),
    q1.createChoice('It goes back to the power source', false)
  ])
  q1.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Energy conservation! The 40W isn\'t destroyed—it\'s converted to heat. This motor is 80% efficient (160W ÷ 200W × 100%).').build())
  q1.setFeedbackForIncorrect(FormApp.createFeedback().setText('Energy cannot be destroyed (1st law of thermodynamics). Energy not converted to useful work must go somewhere. Where do you feel it when motors run?').build());

  // NEW Q2: Mechanical advantage - targets gears-free-energy misconception (4 pts)
  const q2 = form.addMultipleChoiceItem();
  q2.setTitle('NEW CONTENT: A pulley system has MA = 6. To lift a 600N weight 2 meters, you pull with 100N force. How far must you pull the rope?')
  q2.setHelpText('Remember: Work in = Work out. If force is divided by 6, distance is multiplied by 6.')
  q2.setPoints(4)
  q2.setChoices([
    q2.createChoice('2 meters (same as the lift height)', false),
    q2.createChoice('12 meters (6× the lift height)', true),
    q2.createChoice('0.33 meters (2 ÷ 6)', false),
    q2.createChoice('6 meters (equal to the MA)', false)
  ])
  q2.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Excellent! Work in = Work out. 100N × 12m = 1200J = 600N × 2m. MA trades force for distance proportionally.').build())
  q2.setFeedbackForIncorrect(FormApp.createFeedback().setText('Force is reduced by MA (600N ÷ 6 = 100N). Distance must INCREASE by the same factor: 2m × 6 = 12m. That keeps work constant.').build());

  // SPIRAL Q3: Electromagnetism connection (4 pts)
  const q3 = form.addMultipleChoiceItem();
  q3.setTitle('SPIRAL FROM WEEK 2: Electric motors work because electric current creates magnetic fields. What happens inside a motor to produce rotation?')
  q3.setHelpText('Think about electromagnets and how they interact with permanent magnets.')
  q3.setPoints(4)
  q3.setChoices([
    q3.createChoice('Electric current heats the motor shaft, making it expand and spin', false),
    q3.createChoice('Current through coils creates electromagnets that are attracted/repelled by permanent magnets, causing rotation', true),
    q3.createChoice('Electricity flows in a circle, which makes the motor spin in a circle', false),
    q3.createChoice('Motors work through chemical reactions, not electromagnetism', false)
  ])
  q3.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Perfect connection! Motor = practical application of electromagnetism. Alternating current in coils constantly flips magnetic poles, creating continuous rotation.').build())
  q3.setFeedbackForIncorrect(FormApp.createFeedback().setText('From Week 2: Current through wire creates a magnetic field. In motors, coils become electromagnets that interact with permanent magnets. This interaction creates rotation.').build());

  // SPIRAL Q4: Power calculation from circuits (4 pts)
  const q4 = form.addMultipleChoiceItem();
  q4.setTitle('SPIRAL FROM WEEK 3: A motor rated at 240W runs on 120V. How much current does it draw?')
  q4.setHelpText('Use P = I × V, rearranged to find I.')
  q4.setPoints(4)
  q4.setChoices([
    q4.createChoice('0.5 A (120 ÷ 240)', false),
    q4.createChoice('2 A (240 ÷ 120)', true),
    q4.createChoice('360 A (240 + 120)', false),
    q4.createChoice('28,800 A (240 × 120)', false)
  ])
  q4.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ I = P ÷ V = 240W ÷ 120V = 2A. This relationship is essential for sizing circuit breakers and wiring for motors!').build())
  q4.setFeedbackForIncorrect(FormApp.createFeedback().setText('P = I × V, so I = P ÷ V = 240W ÷ 120V = ?').build());

  // INTEGRATION Q5: Complete system analysis (4 pts)
  const q5 = form.addMultipleChoiceItem();
  q5.setTitle('INTEGRATION: An elevator motor is 85% efficient. The elevator lifts 1000kg (10,000N) up 20m in 10 seconds. What electrical power must the motor draw?')
  q5.setHelpText('Calculate mechanical power needed, then account for efficiency.')
  q5.setPoints(4)
  q5.setChoices([
    q5.createChoice('20,000W (mechanical power only)', false),
    q5.createChoice('23,529W (mechanical power ÷ efficiency)', true),
    q5.createChoice('17,000W (mechanical power × efficiency)', false),
    q5.createChoice('10,000W', false)
  ])
  q5.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Great integration! Mechanical power = Work ÷ Time = (10,000N × 20m) ÷ 10s = 20,000W. Electrical input = 20,000W ÷ 0.85 = 23,529W.').build())
  q5.setFeedbackForIncorrect(FormApp.createFeedback().setText('Step by step: (1) Work = 10,000N × 20m = 200,000J. (2) Mechanical Power = 200,000J ÷ 10s = 20,000W. (3) Input Power = Output ÷ Efficiency = 20,000 ÷ 0.85 = ?').build());

  // SEP Q6: Planning and designing solutions (3 pts)
  const q6 = form.addParagraphTextItem();
  q6.setTitle('SEP - DESIGNING SOLUTIONS: You need to design a small crane that can lift 500N using a 20W motor. Calculate the minimum gear ratio needed if the motor produces 0.2 Nm torque and the crane drum has a 0.04m radius. Then explain one design choice you\'d make to improve efficiency.')
  q6.setHelpText('Required torque = Force × Radius. Gear ratio = Required torque ÷ Motor torque.')
  q6.setPoints(3);

  Logger.log('G8.C6.W4 Exit Ticket created: ' + form.getEditUrl());
  return form;
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN EXECUTION & UTILITIES
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Creates all forms for G8.C6.W4
 */
function createAllG8C6W4Forms() {
  Logger.log('═══════════════════════════════════════════════════════════════');
  Logger.log('Creating G8.C6.W4: Electric Motors & Mechanical Advantage');
  Logger.log('═══════════════════════════════════════════════════════════════');

  const hook = createG8C6W4Hook();
  const station1 = createG8C6W4Station1();
  const station2 = createG8C6W4Station2();
  const station3 = createG8C6W4Station3();
  const exitTicket = createG8C6W4ExitTicket();

  Logger.log('═══════════════════════════════════════════════════════════════');
  Logger.log('G8.C6.W4 Forms Creation Complete!');
  Logger.log('Total Points: ' + validateG8C6W4Points());
  Logger.log('═══════════════════════════════════════════════════════════════');

  return {
    hook: hook,
    station1: station1,
    station2: station2,
    station3: station3,
    exitTicket: exitTicket
  };
}

/**
 * Validates that total points equal 100
 */
function validateG8C6W4Points() {
  const points = G8_C6_W4_CONFIG.points;
  const total = points.hook + points.station1 + points.station2 + points.station3 + points.exitTicket;

  if (total !== 100) {
    Logger.log('⚠️ WARNING: Total points = ' + total + ', expected 100');
  }

  return total;
}
