/**
 * ============================================================================
 * GRADE 8 - CYCLE 1 WEEK 3: Thermal Properties of Materials
 * 5 Forms | 100 Points Total | ~75 Minutes
 * ============================================================================
 *
 * Phenomenon: "How can we design materials with specific thermal properties?"
 *
 * NGSS Standards:
 * - MS-PS3-3: Apply scientific principles to design, construct, and test a device
 *             that minimizes or maximizes thermal energy transfer
 * - MS-PS3-4: Plan an investigation to determine relationships among energy
 *             transferred, type of matter, mass, and change in kinetic energy
 *
 * Three-Dimensional Learning:
 * - SEP-3: Planning and Carrying Out Investigations
 * - SEP-6: Constructing Explanations and Designing Solutions
 * - DCI: PS3.A Definitions of Energy, PS3.B Conservation of Energy
 * - CCC-5: Energy and Matter (thermal energy and material properties)
 *
 * Spiral Review: W1 particle motion, W2 heat transfer mechanisms
 *
 * ============================================================================
 */

// ============================================================================
// CONFIGURATION
// ============================================================================

const G8_C1_W3_CONFIG = {
  grade: 8,
  cycle: 1,
  week: 3,
  topic: 'Thermal Properties of Materials',
  phenomenon: 'How can we design materials with specific thermal properties?',

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
      id: 'metals-cold',
      description: 'Metals are naturally colder than other materials',
      correctUnderstanding: 'Metals conduct heat faster, so they feel cold by drawing heat from your hand',
      targetedIn: ['hook_q3', 's1_q4']
    },
    {
      id: 'specific-heat-confusion',
      description: 'Materials with high specific heat get hot quickly',
      correctUnderstanding: 'High specific heat means MORE energy needed to raise temperature - heats SLOWLY',
      targetedIn: ['s1_q2', 'exit_q2']
    }
  ],

  spiralTargets: {
    w1: 'Particle motion and temperature',
    w2: 'Conduction, convection, radiation'
  },

  resources: {
    phet: 'https://phet.colorado.edu/en/simulations/energy-forms-and-changes'
  }
};

// ============================================================================
// MAIN FUNCTION
// ============================================================================

/**
 * Creates all 5 forms for G8 C1 W3
 * @returns {Object} Map of form names to Form objects
 */
function createAllG8C1W3Forms() {
  const forms = {
    hook: createG8C1W3Hook_(),
    station1: createG8C1W3Station1_(),
    station2: createG8C1W3Station2_(),
    station3: createG8C1W3Station3_(),
    exitTicket: createG8C1W3ExitTicket_()
  };

  Logger.log('G8 C1 W3 Forms created successfully');
  Logger.log('Total points: ' + G8_C1_W3_CONFIG.points.total);

  return forms;
}

// ============================================================================
// HOOK: Engineering the Perfect Cooler (12 points, ~10 minutes)
// ============================================================================

/**
 * Hook form connecting to engineering context
 * Focus: How do engineers choose materials for thermal applications?
 */
function createG8C1W3Hook_() {
  const form = FormApp.create('G8.C1.W3: Hook - Engineering the Perfect Cooler');
  form.setDescription(
    'Phenomenon: How can we design materials with specific thermal properties?\n\n' +
    'Examine the cooler design comparison data showing:\n' +
    '• Cooler A: Thin plastic walls, cheap, ice lasts 12 hours\n' +
    '• Cooler B: Thick foam walls, medium price, ice lasts 3 days\n' +
    '• Cooler C: Vacuum-insulated walls, expensive, ice lasts 7 days\n\n' +
    'Why does the same amount of ice last different amounts of time in different coolers?'
  );

  // Q1: Activation - connecting to W2 (2 pts)
  const q1 = form.addMultipleChoiceItem();
  q1.setTitle('From Week 2: What causes ice to melt inside a cooler?')
    .setHelpText('ID: g8_c1_w3_hook_q1 | Points: 2')
    .setRequired(true)
    .setChoices([
      q1.createChoice('Cold escapes from inside the cooler', false),
      q1.createChoice('Thermal energy transfers from the warm outside to the cold inside', true),
      q1.createChoice('The ice naturally transforms into water over time', false),
      q1.createChoice('Air inside the cooler makes the ice melt', false)
    ]);
  q1.setPoints(2);

  // Q2: Observation from data (3 pts)
  const q2 = form.addMultipleChoiceItem();
  q2.setTitle('Based on the cooler comparison, what property of the wall material most affects how long ice lasts?')
    .setHelpText('ID: g8_c1_w3_hook_q2 | Points: 3')
    .setRequired(true)
    .setChoices([
      q2.createChoice('How well the material blocks thermal energy transfer', true),
      q2.createChoice('The color of the cooler walls', false),
      q2.createChoice('How heavy the cooler is', false),
      q2.createChoice('The price of the materials', false)
    ]);
  q2.setPoints(3);

  // Q3: Misconception targeting (3 pts)
  const q3 = form.addMultipleChoiceItem();
  q3.setTitle('A student says: "Metal coolers would keep ice frozen longest because metal feels cold." Why is this reasoning incorrect?')
    .setHelpText('ID: g8_c1_w3_hook_q3 | Points: 3 | Targets misconception: metals are cold')
    .setRequired(true)
    .setChoices([
      q3.createChoice('Metal feels cold because it conducts heat AWAY from your hand quickly - it would also conduct heat INTO the cooler quickly', true),
      q3.createChoice('Metal is actually at a higher temperature than other materials', false),
      q3.createChoice('Metals don\'t come in contact with ice', false),
      q3.createChoice('The student is correct - metal would keep ice coldest', false)
    ]);
  q3.setPoints(3);

  // Q4: Connecting to phenomenon (2 pts)
  const q4 = form.addMultipleChoiceItem();
  q4.setTitle('Today we\'ll learn about "specific heat" - a property that describes how much energy it takes to change a material\'s temperature. Which prediction makes sense?')
    .setHelpText('ID: g8_c1_w3_hook_q4 | Points: 2')
    .setRequired(true)
    .setChoices([
      q4.createChoice('Good insulators have high specific heat and require lots of energy to change temperature', true),
      q4.createChoice('All materials have the same specific heat', false),
      q4.createChoice('Specific heat doesn\'t affect cooler design', false),
      q4.createChoice('Materials with low specific heat are best for coolers', false)
    ]);
  q4.setPoints(2);

  // Q5: Engineering question (2 pts)
  const q5 = form.addParagraphTextItem();
  q5.setTitle('Engineering Question: If you were designing a cooler for a camping trip, what TWO properties would you want the wall material to have? Explain your reasoning.')
    .setHelpText('ID: g8_c1_w3_hook_q5 | Points: 2 | Rubric: 2=Two properties with reasoning, 1=One property or weak reasoning, 0=No relevant properties')
    .setRequired(true);

  configFormSettings_(form, 'hook');
  return form;
}

// ============================================================================
// STATION 1: Specific Heat Investigation (20 points, ~15 minutes)
// ============================================================================

/**
 * Station 1: Heating curve simulation + material comparison
 * Focus: Understand why different materials heat differently
 * Spiral: Heat transfer mechanisms from W2
 */
function createG8C1W3Station1_() {
  const form = FormApp.create('G8.C1.W3: Station 1 - Specific Heat Investigation');
  form.setDescription(
    'Station 1: Specific Heat Investigation (20 points)\n\n' +
    'Use the PhET Energy Forms and Changes simulation to investigate how different ' +
    'materials respond to the same amount of thermal energy.\n\n' +
    'Specific Heat Capacity: The amount of energy needed to raise 1 gram of a ' +
    'material by 1°C.\n\n' +
    'Compare: Water (4.18 J/g°C) vs. Iron (0.45 J/g°C) vs. Copper (0.39 J/g°C)\n\n' +
    'Materials: PhET simulation + data recording table\n\n' +
    '⏱️ Time: ~15 minutes'
  );

  // Q1: Basic observation (3 pts)
  const q1 = form.addMultipleChoiceItem();
  q1.setTitle('In the simulation, when you add the same amount of thermal energy to equal masses of water and iron, which heats up MORE (larger temperature change)?')
    .setHelpText('ID: g8_c1_w3_s1_q1 | Points: 3')
    .setRequired(true)
    .setChoices([
      q1.createChoice('Water heats up more', false),
      q1.createChoice('Iron heats up more', true),
      q1.createChoice('Both heat up equally', false),
      q1.createChoice('Neither heats up', false)
    ]);
  q1.setPoints(3);

  // Q2: Misconception targeting (4 pts)
  const q2 = form.addMultipleChoiceItem();
  q2.setTitle('A student says: "Water has high specific heat, so it gets hot quickly." Is this correct?')
    .setHelpText('ID: g8_c1_w3_s1_q2 | Points: 4 | Targets specific heat misconception')
    .setRequired(true)
    .setChoices([
      q2.createChoice('Yes - high specific heat means quick heating', false),
      q2.createChoice('No - high specific heat means water needs MORE energy to heat up, so it heats SLOWLY', true),
      q2.createChoice('Yes - specific heat determines how fast something heats', false),
      q2.createChoice('No - water can\'t actually be heated', false)
    ]);
  q2.setPoints(4);

  // Q3: Data interpretation (4 pts)
  const q3 = form.addMultipleChoiceItem();
  q3.setTitle('Given: Water = 4.18 J/g°C, Iron = 0.45 J/g°C. To raise 100g of each by 10°C, which requires MORE energy?')
    .setHelpText('ID: g8_c1_w3_s1_q3 | Points: 4 | Use Q = mcΔT reasoning')
    .setRequired(true)
    .setChoices([
      q3.createChoice('Water requires more energy (4,180 J vs 450 J)', true),
      q3.createChoice('Iron requires more energy', false),
      q3.createChoice('Both require the same energy', false),
      q3.createChoice('Cannot determine from this information', false)
    ]);
  q3.setPoints(4);

  // Q4: Spiral W2 - connecting to heat transfer (3 pts)
  const q4 = form.addMultipleChoiceItem();
  q4.setTitle('SPIRAL (W2): A metal spoon and wooden spoon are both at room temperature. Why does the metal feel colder?')
    .setHelpText('ID: g8_c1_w3_s1_q4 | Points: 3 | Connects to W2 conduction')
    .setRequired(true)
    .setChoices([
      q4.createChoice('Metal is actually at a lower temperature than wood', false),
      q4.createChoice('Metal conducts heat away from your hand faster, making it feel cold', true),
      q4.createChoice('Wood generates heat but metal doesn\'t', false),
      q4.createChoice('Your hand temperature changes near metal', false)
    ]);
  q4.setPoints(3);

  // Q5: Application (4 pts)
  const q5 = form.addMultipleChoiceItem();
  q5.setTitle('Engineers use water-based coolants in car engines. Based on water\'s specific heat, why is this a good choice?')
    .setHelpText('ID: g8_c1_w3_s1_q5 | Points: 4')
    .setRequired(true)
    .setChoices([
      q5.createChoice('Water can absorb lots of thermal energy without its temperature rising much', true),
      q5.createChoice('Water heats up quickly to match engine temperature', false),
      q5.createChoice('Water is cheaper than other liquids', false),
      q5.createChoice('Water freezes easily to cool the engine', false)
    ]);
  q5.setPoints(4);

  // Q6: Particle-level explanation (2 pts)
  const q6 = form.addParagraphTextItem();
  q6.setTitle('Explain at the particle level WHY water needs more energy than iron to raise its temperature by the same amount. Think about what happens to particles when energy is added.')
    .setHelpText('ID: g8_c1_w3_s1_q6 | Points: 2 | Rubric: 2=Mentions energy spreading among more/different particle bonds, 1=Basic particle mention, 0=No particle connection')
    .setRequired(true);

  configFormSettings_(form, 'station1');
  return form;
}

// ============================================================================
// STATION 2: Material Property Analysis (20 points, ~15 minutes)
// ============================================================================

/**
 * Station 2: Thermal property data tables + application matching
 * Focus: Match material properties to engineering needs
 */
function createG8C1W3Station2_() {
  const form = FormApp.create('G8.C1.W3: Station 2 - Material Property Analysis');
  form.setDescription(
    'Station 2: Material Property Analysis (20 points)\n\n' +
    'Analyze the thermal property data table:\n\n' +
    '| Material | Specific Heat (J/g°C) | Thermal Conductivity |\n' +
    '|----------|----------------------|---------------------|\n' +
    '| Water    | 4.18                 | Low                 |\n' +
    '| Iron     | 0.45                 | High                |\n' +
    '| Copper   | 0.39                 | Very High           |\n' +
    '| Air      | 1.01                 | Very Low            |\n' +
    '| Foam     | 1.30                 | Very Low            |\n' +
    '| Glass    | 0.84                 | Low                 |\n\n' +
    'Match materials to applications based on their properties.\n\n' +
    '⏱️ Time: ~15 minutes'
  );

  // Q1: Data interpretation (4 pts)
  const q1 = form.addMultipleChoiceItem();
  q1.setTitle('Which material would be BEST for a cooking pot that heats up quickly and evenly?')
    .setHelpText('ID: g8_c1_w3_s2_q1 | Points: 4')
    .setRequired(true)
    .setChoices([
      q1.createChoice('Copper - low specific heat (heats quickly) + very high conductivity (heats evenly)', true),
      q1.createChoice('Water - high specific heat', false),
      q1.createChoice('Foam - very low conductivity', false),
      q1.createChoice('Air - low specific heat', false)
    ]);
  q1.setPoints(4);

  // Q2: Application matching (4 pts)
  const q2 = form.addMultipleChoiceItem();
  q2.setTitle('A thermos bottle has two walls with a vacuum (like air but with no particles) between them. Why does this design keep drinks hot or cold?')
    .setHelpText('ID: g8_c1_w3_s2_q2 | Points: 4')
    .setRequired(true)
    .setChoices([
      q2.createChoice('A vacuum has no particles to transfer thermal energy by conduction or convection', true),
      q2.createChoice('Vacuums are naturally cold', false),
      q2.createChoice('The vacuum absorbs all the heat', false),
      q2.createChoice('The two walls reflect heat back and forth', false)
    ]);
  q2.setPoints(4);

  // Q3: Spiral W1 - Connecting to particle motion (4 pts)
  const q3 = form.addMultipleChoiceItem();
  q3.setTitle('SPIRAL (W1): When thermal energy is added to water, what happens at the particle level before the temperature rises significantly?')
    .setHelpText('ID: g8_c1_w3_s2_q3 | Points: 4 | Connects to W1 particle motion')
    .setRequired(true)
    .setChoices([
      q3.createChoice('Energy is absorbed by breaking bonds between water molecules before increasing motion', true),
      q3.createChoice('Particles immediately move faster', false),
      q3.createChoice('Particles stop moving completely', false),
      q3.createChoice('The water changes to a solid first', false)
    ]);
  q3.setPoints(4);

  // Q4: Design analysis (4 pts)
  const q4 = form.addMultipleChoiceItem();
  q4.setTitle('Compare two building materials: Brick (specific heat 0.84, low conductivity) vs. Steel (specific heat 0.50, high conductivity). Which would help keep a house cooler in summer?')
    .setHelpText('ID: g8_c1_w3_s2_q4 | Points: 4')
    .setRequired(true)
    .setChoices([
      q4.createChoice('Brick - higher specific heat absorbs more heat before warming, and low conductivity slows heat transfer', true),
      q4.createChoice('Steel - lower specific heat means it won\'t get as hot', false),
      q4.createChoice('Steel - high conductivity moves heat away faster', false),
      q4.createChoice('Both would work equally well', false)
    ]);
  q4.setPoints(4);

  // Q5: Synthesis (4 pts)
  const q5 = form.addParagraphTextItem();
  q5.setTitle('ANALYSIS: Scientists are designing a heat shield for a spacecraft re-entering Earth\'s atmosphere. What TWO thermal properties should the material have? Explain why each property matters.')
    .setHelpText('ID: g8_c1_w3_s2_q5 | Points: 4 | Rubric: 4=Two correct properties with explanations, 3=Two properties, partial explanations, 2=One property well-explained, 1=Attempt')
    .setRequired(true);

  configFormSettings_(form, 'station2');
  return form;
}

// ============================================================================
// STATION 3: Design a Thermal Device (25 points, ~20 minutes)
// ============================================================================

/**
 * Station 3: Engineering design challenge
 * Focus: Apply thermal properties to design problem
 */
function createG8C1W3Station3_() {
  const form = FormApp.create('G8.C1.W3: Station 3 - Design a Thermal Device');
  form.setDescription(
    'Station 3: Engineering Design Challenge (25 points)\n\n' +
    'Choose ONE challenge to solve:\n\n' +
    'CHALLENGE A - HOT BOX: Design a container that KEEPS pizza hot for 30 minutes during delivery.\n' +
    'CHALLENGE B - COLD BOX: Design a container that KEEPS ice cream frozen for 30 minutes during delivery.\n\n' +
    'Available materials and their properties:\n' +
    '• Cardboard (low conductivity, medium specific heat)\n' +
    '• Aluminum foil (very high conductivity, reflects radiation)\n' +
    '• Foam insulation (very low conductivity)\n' +
    '• Air gaps (very low conductivity)\n' +
    '• Fabric (low conductivity, can trap air)\n\n' +
    '⏱️ Time: ~20 minutes'
  );

  // Q1: Define problem (4 pts)
  const q1 = form.addMultipleChoiceItem();
  q1.setTitle('Which challenge did you choose, and what is the MAIN thermal problem you need to solve?')
    .setHelpText('ID: g8_c1_w3_s3_q1 | Points: 4')
    .setRequired(true)
    .setChoices([
      q1.createChoice('Hot Box: MINIMIZE thermal energy loss from the pizza', true),
      q1.createChoice('Cold Box: MINIMIZE thermal energy transfer INTO the ice cream', true),
      q1.createChoice('Hot Box: MAXIMIZE thermal energy transfer to the pizza', false),
      q1.createChoice('Cold Box: ADD thermal energy to keep ice cream cold', false)
    ]);
  q1.setPoints(4);

  // Q2: Material selection (5 pts)
  const q2 = form.addCheckboxItem();
  q2.setTitle('Select ALL the materials you would use in your design and be ready to explain why (select all that apply):')
    .setHelpText('ID: g8_c1_w3_s3_q2 | Points: 5 | Multiple correct answers possible')
    .setRequired(true)
    .setChoices([
      q2.createChoice('Foam insulation - blocks conduction', true),
      q2.createChoice('Air gaps - reduces conduction (air is poor conductor)', true),
      q2.createChoice('Aluminum foil - reflects thermal radiation', true),
      q2.createChoice('Cardboard - provides structure + some insulation', true),
      q2.createChoice('Metal sheets - conducts heat quickly', false),
      q2.createChoice('Thin plastic alone - minimal insulation', false)
    ]);

  // Q3: Design description (5 pts)
  const q3 = form.addParagraphTextItem();
  q3.setTitle('DESIGN: Describe your container\'s structure layer by layer (inside to outside). For each layer, explain which heat transfer method it blocks (conduction, convection, or radiation).')
    .setHelpText('ID: g8_c1_w3_s3_q3 | Points: 5 | Rubric: 5=3+ layers each with heat transfer method, 4=3 layers with some methods, 3=2 layers explained, 2=1 layer, 1=Attempt')
    .setRequired(true);

  // Q4: Evaluate design (5 pts)
  const q4 = form.addMultipleChoiceItem();
  q4.setTitle('Your design needs to work in summer (hot outside) AND winter (cold outside). For a HOT BOX, which season is MORE challenging and why?')
    .setHelpText('ID: g8_c1_w3_s3_q4 | Points: 5')
    .setRequired(true)
    .setChoices([
      q4.createChoice('Winter - larger temperature difference means faster heat loss from pizza', true),
      q4.createChoice('Summer - heat flows into the pizza faster', false),
      q4.createChoice('Both seasons are equally challenging', false),
      q4.createChoice('Neither season affects the design', false)
    ]);
  q4.setPoints(5);

  // Q5: Trade-offs and argumentation (6 pts)
  const q5 = form.addParagraphTextItem();
  q5.setTitle('ARGUE: A company wants to use ONLY thin plastic for their delivery boxes because it\'s cheap. Use evidence from specific heat and thermal conductivity to argue why your multi-material design is worth the extra cost.')
    .setHelpText('ID: g8_c1_w3_s3_q5 | Points: 6 | Rubric: 6=Clear argument with 2+ specific property references, 4-5=Argument with 1 property reference, 2-3=Basic reasoning, 1=Attempt')
    .setRequired(true);

  configFormSettings_(form, 'station3');
  return form;
}

// ============================================================================
// EXIT TICKET: Thermal Properties Integration (23 points, ~15 minutes)
// ============================================================================

/**
 * Exit Ticket with structure: NEW: 2, SPIRAL: 2, INTEGRATION: 1, SEP-1: 1
 */
function createG8C1W3ExitTicket_() {
  const form = FormApp.create('G8.C1.W3: Exit Ticket - Thermal Properties Integration');
  form.setDescription(
    'Exit Ticket: Thermal Properties Integration (23 points)\n\n' +
    'Demonstrate your understanding of specific heat and thermal properties.\n\n' +
    '⏱️ Time: ~15 minutes'
  );

  // Q1: NEW - Core concept (4 pts)
  const q1 = form.addMultipleChoiceItem();
  q1.setTitle('NEW: What does "specific heat capacity" measure?')
    .setHelpText('ID: g8_c1_w3_exit_q1 | Points: 4')
    .setRequired(true)
    .setChoices([
      q1.createChoice('How much energy is needed to raise the temperature of 1 gram of material by 1°C', true),
      q1.createChoice('How hot a material can get', false),
      q1.createChoice('How fast heat travels through a material', false),
      q1.createChoice('The maximum temperature a material can reach', false)
    ]);
  q1.setPoints(4);

  // Q2: NEW - Application with misconception targeting (4 pts)
  const q2 = form.addMultipleChoiceItem();
  q2.setTitle('NEW: Sand has a low specific heat (0.84 J/g°C) compared to water (4.18 J/g°C). On a sunny beach day, which gets hotter by afternoon?')
    .setHelpText('ID: g8_c1_w3_exit_q2 | Points: 4 | Targets specific heat misconception')
    .setRequired(true)
    .setChoices([
      q2.createChoice('Sand gets hotter - it needs less energy to raise its temperature', true),
      q2.createChoice('Water gets hotter - it has higher specific heat', false),
      q2.createChoice('Both reach the same temperature', false),
      q2.createChoice('Water gets hotter because it absorbs more sunlight', false)
    ]);
  q2.setPoints(4);

  // Q3: SPIRAL W2 - Heat transfer (4 pts)
  const q3 = form.addMultipleChoiceItem();
  q3.setTitle('SPIRAL (W2): A double-paned window has two glass sheets with air between them. Which heat transfer method does the air gap primarily reduce?')
    .setHelpText('ID: g8_c1_w3_exit_q3 | Points: 4 | Connects to W2 heat transfer')
    .setRequired(true)
    .setChoices([
      q3.createChoice('Conduction - air is a poor conductor compared to glass', true),
      q3.createChoice('Radiation - air blocks all radiation', false),
      q3.createChoice('Convection - the air gap creates convection currents', false),
      q3.createChoice('All three methods equally', false)
    ]);
  q3.setPoints(4);

  // Q4: SPIRAL W1 - Particle motion (3 pts)
  const q4 = form.addMultipleChoiceItem();
  q4.setTitle('SPIRAL (W1): When you heat copper (low specific heat) and water (high specific heat) with the same energy, particles in both move faster. Why does copper\'s temperature rise more?')
    .setHelpText('ID: g8_c1_w3_exit_q4 | Points: 3 | Connects to W1 particle motion')
    .setRequired(true)
    .setChoices([
      q4.createChoice('Copper has fewer bonds to absorb energy, so more energy goes to particle motion (temperature)', true),
      q4.createChoice('Copper particles move faster than water particles', false),
      q4.createChoice('Water particles don\'t actually move when heated', false),
      q4.createChoice('Copper absorbs more energy from the heat source', false)
    ]);
  q4.setPoints(3);

  // Q5: INTEGRATION (4 pts)
  const q5 = form.addParagraphTextItem();
  q5.setTitle('INTEGRATION: A coastal city stays cooler in summer than an inland city at the same latitude. Use specific heat capacity AND heat transfer concepts to explain why the ocean moderates the coastal city\'s temperature.')
    .setHelpText('ID: g8_c1_w3_exit_q5 | Points: 4 | Rubric: 4=Links water\'s high specific heat to slower temperature change + heat transfer to/from land, 3=Mentions both concepts, 2=One concept well-explained, 1=Attempt')
    .setRequired(true);

  // Q6: SEP-3 - Planning investigations (4 pts)
  const q6 = form.addParagraphTextItem();
  q6.setTitle('SEP-3: You want to test which material makes the best insulation for a lunch box. Describe an investigation you could conduct. Include: (1) What you would measure, (2) What you would keep constant, and (3) How you would know which material is best.')
    .setHelpText('ID: g8_c1_w3_exit_q6 | Points: 4 | Rubric: 4=All 3 elements of investigation design, 3=2 elements, 2=1 element, 1=Attempt')
    .setRequired(true);

  // Confidence scale (diagnostic only)
  const confidence = form.addScaleItem();
  confidence.setTitle('How confident are you in your understanding of thermal properties and their applications?')
    .setHelpText('Diagnostic only - not graded')
    .setBounds(1, 5)
    .setLabels('Not confident', 'Very confident')
    .setRequired(true);
  confidence.setPoints(0);

  configFormSettings_(form, 'exitTicket');
  return form;
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Configures common form settings
 * @param {GoogleAppsScript.Forms.Form} form - The form to configure
 * @param {string} formType - Type of form (hook, station1, station2, station3, exitTicket)
 */
function configFormSettings_(form, formType) {
  form.setIsQuiz(true);
  form.setCollectEmail(true);
  form.setRequireLogin(true);
  form.setLimitOneResponsePerUser(true);
  form.setProgressBar(true);

  // Set shuffle based on form type
  if (formType === 'exitTicket') {
    form.setShuffleQuestions(false); // Keep exit ticket order
  }

  // Add form metadata as description suffix
  const metadata = '\n\n---\nForm ID: g8_c1_w3_' + formType +
                   '\nPoints: ' + G8_C1_W3_CONFIG.points[formType] +
                   '\nGenerated: ' + new Date().toISOString().split('T')[0];

  const currentDesc = form.getDescription();
  form.setDescription(currentDesc + metadata);
}

/**
 * Validates all forms have correct point totals
 * @returns {Object} Validation results
 */
function validateG8C1W3Points_() {
  const expected = G8_C1_W3_CONFIG.points;
  const results = {
    valid: true,
    details: {},
    totalExpected: expected.total
  };

  Logger.log('G8 C1 W3 Point Validation');
  Logger.log('Expected totals: Hook=' + expected.hook + ', S1=' + expected.station1 +
             ', S2=' + expected.station2 + ', S3=' + expected.station3 +
             ', Exit=' + expected.exitTicket);
  Logger.log('Grand Total Expected: ' + expected.total);

  return results;
}

// ============================================================================
// RUBRICS REFERENCE
// ============================================================================

/**
 * Rubric definitions for constructed response items
 * Used by teachers when manually grading paragraph responses
 */
const G8_C1_W3_RUBRICS = {
  hook_q5: {
    points: 2,
    criteria: {
      2: 'Two correct thermal properties (e.g., low conductivity + high specific heat) with reasoning',
      1: 'One property or weak reasoning',
      0: 'No relevant properties mentioned'
    }
  },
  s1_q6: {
    points: 2,
    criteria: {
      2: 'Explains energy spreading among more/different particle bonds in water',
      1: 'Basic particle mention without clear mechanism',
      0: 'No particle-level connection'
    }
  },
  s2_q5: {
    points: 4,
    criteria: {
      4: 'Two correct properties (high specific heat + low conductivity) with clear explanations',
      3: 'Two properties, partial explanations',
      2: 'One property well-explained',
      1: 'Attempt'
    }
  },
  s3_q3: {
    points: 5,
    criteria: {
      5: '3+ layers each labeled with heat transfer method blocked',
      4: '3 layers with some methods identified',
      3: '2 layers well-explained',
      2: '1 layer explained',
      1: 'Attempt'
    }
  },
  s3_q5: {
    points: 6,
    criteria: {
      6: 'Clear argument with 2+ specific property references (e.g., specific heat values, conductivity)',
      '4-5': 'Argument with 1 property reference',
      '2-3': 'Basic reasoning without specific data',
      1: 'Attempt'
    }
  },
  exit_q5: {
    points: 4,
    criteria: {
      4: 'Links water\'s high specific heat (absorbs energy without big temp change) + heat transfer to moderate land',
      3: 'Mentions both concepts with minor gaps',
      2: 'One concept well-explained',
      1: 'Attempt'
    }
  },
  exit_q6: {
    points: 4,
    criteria: {
      4: 'All 3 elements: measurement (temp over time), constants (mass, starting temp, etc.), success criteria (smallest temp change)',
      3: '2 elements complete',
      2: '1 element complete',
      1: 'Attempt'
    }
  }
};
