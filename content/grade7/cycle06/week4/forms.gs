/**
 * ═══════════════════════════════════════════════════════════════════════════
 * GRADE 7 CYCLE 6 WEEK 4: Earth's Interior Structure & Evidence
 * STATUS: ✅ COMPLETE - READY FOR REVIEW
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Driving Phenomenon: How do we know what's inside Earth if no one has ever been there?
 *
 * Students explore one of science's greatest detective stories: how scientists
 * used indirect evidence—particularly seismic waves—to determine Earth's layered
 * structure without ever seeing it directly. This demonstrates the power of
 * scientific inference and modeling.
 *
 * Weekly Structure:
 * - Hook: The Unreachable Mystery (12 pts)
 * - Station 1: Seismic Wave Investigation (20 pts)
 * - Station 2: Earth's Layers Analysis (20 pts)
 * - Station 3: Design an Earth Model (25 pts)
 * - Exit Ticket: Earth's Interior Integration (23 pts)
 *
 * Standards Alignment:
 * - MS-ESS2-1: Earth's geoscience processes
 * - MS-ESS2-3: Distribution of Earth's materials
 *
 * Spiral Integration:
 * - From C6W3: Volcanic magma properties and their sources
 * - From C6W1-W2: Plate tectonics and convection
 *
 * ═══════════════════════════════════════════════════════════════════════════
 */

// ═══════════════════════════════════════════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════

const G7_C6_W4_CONFIG = {
  grade: 7,
  cycle: 6,
  week: 4,
  topic: 'Earth\'s Interior Structure & Evidence',
  phenomenon: 'How do we know what\'s inside Earth if no one has ever been there?',

  standards: {
    primary: ['MS-ESS2-1', 'MS-ESS2-3'],
    spiral: ['MS-ESS2-2', 'MS-ESS3-2']
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
    earthHollow: {
      id: 'earth-hollow-inside',
      wrong: 'Earth is hollow or has large empty caves inside',
      correct: 'Earth is composed of increasingly dense layers; the core is solid iron/nickel under immense pressure',
      targetedIn: ['hook_q3', 's2_q3', 'exit_q1']
    },
    uniformInterior: {
      id: 'earth-uniform',
      wrong: 'Earth is the same material all the way through',
      correct: 'Earth has distinct layers (crust, mantle, outer core, inner core) with different compositions and properties',
      targetedIn: ['s1_q4', 's2_q1', 'exit_q2']
    },
    mantleLiquid: {
      id: 'mantle-is-liquid',
      wrong: 'The mantle is liquid magma that plates float on',
      correct: 'The mantle is mostly solid rock that flows very slowly like plastic; only small pockets melt to form magma',
      targetedIn: ['s1_q3', 's2_q4']
    }
  },

  spiralTargets: {
    cycle6Week3: {
      topic: 'Volcanic magma sources',
      connection: 'Connect magma generation to specific depth layers and conditions'
    },
    cycle6Week1: {
      topic: 'Plate tectonics and convection',
      connection: 'Link mantle convection to Earth\'s internal heat and layer structure'
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
// HOOK: THE UNREACHABLE MYSTERY (12 points)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Creates the Hook form introducing Earth's interior mystery
 * Resource: Deepest hole drilled vs Earth's radius comparison + core diagram
 */
function createG7C6W4Hook() {
  const form = FormApp.create('G7.C6.W4: Hook - The Unreachable Mystery');
  form.setDescription(
    '🌍 THE UNREACHABLE MYSTERY 🔬\n\n' +
    'The deepest hole ever drilled is the Kola Superdeep Borehole in Russia—about 12 kilometers deep. ' +
    'It took 24 years to drill! But here\'s the problem: Earth\'s radius is about 6,371 kilometers. ' +
    'That means we\'ve only scratched 0.2% of the way to the center!\n\n' +
    'Yet scientists confidently describe Earth\'s interior layers, their composition, and even ' +
    'their temperatures. How is this possible if no one has ever been there?'
  );
  form.setIsQuiz(true);
  form.setShuffleQuestions(false);

  // Q1: Scale comparison (2 pts)
  const q1 = form.addMultipleChoiceItem();
  q1.setTitle('Look at the diagram comparing the Kola Borehole depth (12 km) to Earth\'s radius (6,371 km). If Earth were an apple, how deep would the borehole be?')
  q1.setHelpText('Think about what fraction 12 km is of 6,371 km.')
  q1.setPoints(2)
  q1.setChoices([
    q1.createChoice('About halfway through the apple', false),
    q1.createChoice('About as deep as the apple\'s skin (peel)', true),
    q1.createChoice('All the way to the core of the apple', false),
    q1.createChoice('About as deep as the apple\'s seeds', false)
  ])
  q1.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Perfect analogy! The Kola Borehole only penetrated through the equivalent of Earth\'s "skin"—we\'ve never directly sampled anything deeper.').build())
  q1.setFeedbackForIncorrect(FormApp.createFeedback().setText('Calculate: 12 ÷ 6,371 = 0.002 or 0.2%. That\'s like scratching just the thin outer layer of an apple—barely breaking the skin!').build());

  // Q2: Scientific challenge (3 pts)
  const q2 = form.addMultipleChoiceItem();
  q2.setTitle('Why can\'t we just drill deeper to directly observe Earth\'s interior?')
  q2.setHelpText('Consider what conditions would be like deeper inside Earth.')
  q2.setPoints(3)
  q2.setChoices([
    q2.createChoice('Scientists haven\'t tried hard enough', false),
    q2.createChoice('Increasing temperature and pressure would destroy any drill equipment; at depth, rock becomes too hot and pressure too extreme', true),
    q2.createChoice('There\'s nothing interesting below 12 km', false),
    q2.createChoice('The government won\'t allow deeper drilling', false)
  ])
  q2.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Exactly! At the bottom of the Kola Borehole, temperature reached 180°C and rock started flowing. Deeper, temperatures exceed 1000°C with crushing pressure.').build())
  q2.setFeedbackForIncorrect(FormApp.createFeedback().setText('Think about physics: What happens to temperature as you go deeper? What about pressure from the weight of rock above? How would equipment handle these conditions?').build());

  // Q3: Prediction about interior - targets earth-hollow misconception (3 pts)
  const q3 = form.addMultipleChoiceItem();
  q3.setTitle('Some old stories describe Earth as hollow with underground civilizations. Based on what you know about pressure and density, why is this impossible?')
  q3.setHelpText('Think about gravity, pressure, and what holds Earth together.')
  q3.setPoints(3)
  q3.setChoices([
    q3.createChoice('A hollow Earth could exist if it had thick enough walls', false),
    q3.createChoice('Gravity would cause a hollow Earth to collapse; the immense pressure forces material to compress, not create empty space', true),
    q3.createChoice('Earth could be hollow because we\'ve never proven otherwise', false),
    q3.createChoice('Underground civilizations might exist in small caves', false)
  ])
  q3.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Correct! Pressure at Earth\'s center is about 360 GPa (3.6 million atmospheres). This crushes atoms closer together—no empty space could survive.').build())
  q3.setFeedbackForIncorrect(FormApp.createFeedback().setText('Consider: What happens when you stack heavy books? The bottom books get compressed. Now imagine the weight of 6,371 km of rock pressing down!').build());

  // Q4: Indirect evidence introduction (2 pts)
  const q4 = form.addMultipleChoiceItem();
  q4.setTitle('Doctors use X-rays to see inside your body without surgery. What method might scientists use to "see" inside Earth without drilling?')
  q4.setHelpText('Think about: What travels through the Earth that we can detect?')
  q4.setPoints(2)
  q4.setChoices([
    q4.createChoice('Giant X-ray machines', false),
    q4.createChoice('Satellite photography from space', false),
    q4.createChoice('Earthquake waves (seismic waves) that travel through Earth\'s interior', true),
    q4.createChoice('Sending cameras down volcanoes', false)
  ])
  q4.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Exactly! Seismic waves travel through Earth and change speed/direction based on what they encounter. Like an ultrasound for the planet!').build())
  q4.setFeedbackForIncorrect(FormApp.createFeedback().setText('When earthquakes occur, energy waves travel through Earth\'s entire interior. By studying how these waves behave, we can infer what\'s inside.').build());

  // Q5: Question generation (2 pts)
  const q5 = form.addParagraphTextItem();
  q5.setTitle('What questions do you have about how scientists figure out what\'s inside Earth? What evidence would convince YOU that we know Earth\'s interior structure?')
  q5.setHelpText('Think about: What would prove the model is correct? What other evidence might exist?')
  q5.setPoints(2);

  Logger.log('G7.C6.W4 Hook created: ' + form.getEditUrl());
  return form;
}

// ═══════════════════════════════════════════════════════════════════════════
// STATION 1: SEISMIC WAVE INVESTIGATION (20 points)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Creates Station 1 form on seismic wave behavior
 * Resource: Seismic wave simulation + wave travel time data
 * Spiral: Volcanic magma properties from Week 3
 */
function createG7C6W4Station1() {
  const form = FormApp.create('G7.C6.W4: Station 1 - Seismic Wave Investigation');
  form.setDescription(
    '🌊 SEISMIC WAVE INVESTIGATION\n\n' +
    'Earthquakes generate two main types of seismic waves:\n' +
    '• P-waves (Primary/Pressure): Travel fastest, can move through solids AND liquids\n' +
    '• S-waves (Secondary/Shear): Travel slower, can ONLY move through solids\n\n' +
    'By studying how these waves travel through Earth, scientists discovered Earth\'s layered structure. ' +
    'Use the simulation to see how seismic waves reveal Earth\'s interior.'
  );
  form.setIsQuiz(true);
  form.setShuffleQuestions(false);

  // Q1: Wave behavior basics (3 pts)
  const q1 = form.addMultipleChoiceItem();
  q1.setTitle('In the simulation, trigger an earthquake and observe P-waves and S-waves. Which statement correctly describes their behavior?')
  q1.setHelpText('Watch both wave types travel through the simulated Earth interior.')
  q1.setPoints(3)
  q1.setChoices([
    q1.createChoice('P-waves and S-waves travel at the same speed through all materials', false),
    q1.createChoice('P-waves arrive first and travel through everything; S-waves are slower and stop at the outer core', true),
    q1.createChoice('S-waves travel faster than P-waves', false),
    q1.createChoice('Both waves stop at the mantle boundary', false)
  ])
  q1.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Correct! This difference is KEY evidence: S-waves disappearing at the outer core proves it\'s LIQUID (S-waves can\'t travel through liquid).').build())
  q1.setFeedbackForIncorrect(FormApp.createFeedback().setText('"P" = Primary (first to arrive). S-waves can\'t travel through liquids. Watch where each wave type goes and where it stops.').build());

  // Q2: Shadow zone explanation (4 pts)
  const q2 = form.addMultipleChoiceItem();
  q2.setTitle('The simulation shows "shadow zones" where no direct S-waves arrive after an earthquake. What causes these shadow zones?')
  q2.setHelpText('Consider what would block S-waves but not completely block P-waves.')
  q2.setPoints(4)
  q2.setChoices([
    q2.createChoice('Mountains blocking the waves at the surface', false),
    q2.createChoice('Earth\'s liquid outer core, which S-waves cannot pass through', true),
    q2.createChoice('The waves simply run out of energy', false),
    q2.createChoice('Interference from ocean waves', false)
  ])
  q2.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Exactly! S-wave shadow zones were the key evidence that Earth has a liquid outer core. This discovery came in 1906 from seismologist Richard Oldham.').build())
  q2.setFeedbackForIncorrect(FormApp.createFeedback().setText('Remember: S-waves only travel through solids. If there\'s a region where no S-waves arrive, what does that tell you about what\'s blocking them?').build());

  // Q3: Mantle state - targets mantle-is-liquid misconception (4 pts)
  const q3 = form.addMultipleChoiceItem();
  q3.setTitle('S-waves DO travel through the mantle. What does this tell us about the mantle\'s physical state?')
  q3.setHelpText('Remember: S-waves can only travel through solids.')
  q3.setPoints(4)
  q3.setChoices([
    q3.createChoice('The mantle is completely liquid, like the outer core', false),
    q3.createChoice('The mantle is mostly solid, even though it flows very slowly over time', true),
    q3.createChoice('The mantle doesn\'t exist—it\'s just a theory', false),
    q3.createChoice('S-waves can actually travel through liquids too', false)
  ])
  q3.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Critical understanding! The mantle is SOLID rock that flows plastically over millions of years (like very thick tar). It\'s NOT a liquid sea of magma!').build())
  q3.setFeedbackForIncorrect(FormApp.createFeedback().setText('Common misconception alert! S-waves ONLY travel through solids. If S-waves pass through the mantle, the mantle must be... solid or liquid?').build());

  // Q4: Wave speed changes - targets earth-uniform misconception (4 pts)
  const q4 = form.addMultipleChoiceItem();
  q4.setTitle('The simulation shows seismic waves changing speed at layer boundaries. What causes these speed changes?')
  q4.setHelpText('Think about what properties affect how fast waves travel through material.')
  q4.setPoints(4)
  q4.setChoices([
    q4.createChoice('Waves get tired and slow down over distance', false),
    q4.createChoice('Changes in density and composition cause waves to speed up or slow down at layer boundaries', true),
    q4.createChoice('Temperature changes don\'t affect wave speed', false),
    q4.createChoice('Waves travel at constant speed throughout Earth', false)
  ])
  q4.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Excellent! Waves travel faster through denser, stiffer material. Speed changes reveal where Earth\'s composition changes—that\'s how we identify layer boundaries!').build())
  q4.setFeedbackForIncorrect(FormApp.createFeedback().setText('Think about sound: Does it travel at the same speed through air, water, and steel? Changes in material = changes in wave speed.').build());

  // Q5: Spiral - Magma source connection (3 pts)
  const q5 = form.addMultipleChoiceItem();
  q5.setTitle('SPIRAL FROM WEEK 3: You learned that magma forms when mantle rock melts. Based on seismic evidence that the mantle is mostly solid, where does the heat come from to melt rock and create magma?')
  q5.setHelpText('Think about what conditions cause solid rock to melt.')
  q5.setPoints(3)
  q5.setChoices([
    q5.createChoice('The sun heats Earth\'s interior', false),
    q5.createChoice('Earth\'s internal heat (from radioactive decay and original formation) plus pressure reduction at plate boundaries allows small portions of mantle to melt', true),
    q5.createChoice('Ocean water creates magma when it touches hot rock', false),
    q5.createChoice('The mantle is actually all liquid magma', false)
  ])
  q5.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Great connection! Earth\'s internal heat is always close to melting temperature. At spreading ridges or subduction zones, pressure changes or water addition causes selective melting.').build())
  q5.setFeedbackForIncorrect(FormApp.createFeedback().setText('The mantle is solid but HOT. At certain locations (plate boundaries), conditions change just enough to melt SOME rock—not all of it.').build());

  // Q6: Evidence interpretation (2 pts)
  const q6 = form.addMultipleChoiceItem();
  q6.setTitle('How does seismic wave data provide evidence for Earth\'s layered structure?')
  q6.setHelpText('Synthesize what you\'ve learned about wave behavior and Earth\'s interior.')
  q6.setPoints(2)
  q6.setChoices([
    q6.createChoice('It doesn\'t—layers are just a guess', false),
    q6.createChoice('Wave speed changes and shadow zones reveal distinct layers with different properties', true),
    q6.createChoice('Scientists see the layers directly using seismic waves like cameras', false),
    q6.createChoice('Only P-waves provide useful information', false)
  ])
  q6.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Perfect synthesis! Multiple seismic observations (speed changes, shadow zones, reflection patterns) all point to the same layered model—strong converging evidence.').build())
  q6.setFeedbackForIncorrect(FormApp.createFeedback().setText('Think about ALL the patterns: waves changing speed, S-waves stopping at certain depths, waves bending at boundaries. What do these patterns reveal?').build());

  Logger.log('G7.C6.W4 Station 1 created: ' + form.getEditUrl());
  return form;
}

// ═══════════════════════════════════════════════════════════════════════════
// STATION 2: EARTH'S LAYERS ANALYSIS (20 points)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Creates Station 2 form on Earth's layer properties
 * Resource: Density data + temperature gradient + layer diagrams
 */
function createG7C6W4Station2() {
  const form = FormApp.create('G7.C6.W4: Station 2 - Earth\'s Layers Analysis');
  form.setDescription(
    '🧅 EARTH\'S LAYERS ANALYSIS\n\n' +
    'Earth has four main layers, each with distinct properties:\n' +
    '• Crust (0-70 km): Thin, rocky outer shell\n' +
    '• Mantle (70-2,900 km): Thick, hot, slowly flowing rock\n' +
    '• Outer Core (2,900-5,150 km): Liquid iron and nickel\n' +
    '• Inner Core (5,150-6,371 km): Solid iron and nickel\n\n' +
    'Analyze the data to understand why each layer has different properties.'
  );
  form.setIsQuiz(true);
  form.setShuffleQuestions(false);

  // Q1: Layer identification - targets earth-uniform misconception (4 pts)
  const q1 = form.addMultipleChoiceItem();
  q1.setTitle('Examine the density data. Earth\'s average density is 5.5 g/cm³, but surface rocks average only 2.7 g/cm³. What does this tell you about Earth\'s interior?')
  q1.setHelpText('If the average is higher than the surface, what must be true about deeper layers?')
  q1.setPoints(4)
  q1.setChoices([
    q1.createChoice('Earth must be hollow inside to balance out the dense surface', false),
    q1.createChoice('Deeper layers must be much denser than surface rocks to raise the average', true),
    q1.createChoice('Surface rocks are denser than the core', false),
    q1.createChoice('Density is the same throughout Earth', false)
  ])
  q1.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Excellent reasoning! The core has density of 10-13 g/cm³ (mostly iron). This high-density interior pulls up Earth\'s average even though the crust is relatively light.').build())
  q1.setFeedbackForIncorrect(FormApp.createFeedback().setText('Average = (surface + interior) ÷ 2 ≈ 5.5. If surface = 2.7, what must interior be to get an average of 5.5? Much higher or lower?').build());

  // Q2: Density trend (4 pts)
  const q2 = form.addMultipleChoiceItem();
  q2.setTitle('Look at the density values for each layer. What pattern do you observe from the surface to the center?')
  q2.setHelpText('Compare crust density (2.7 g/cm³) to inner core density (13 g/cm³).')
  q2.setPoints(4)
  q2.setChoices([
    q2.createChoice('Density decreases toward the center', false),
    q2.createChoice('Density increases toward the center—denser materials sank during Earth\'s formation', true),
    q2.createChoice('Density stays constant throughout', false),
    q2.createChoice('Density randomly varies with no pattern', false)
  ])
  q2.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ This is called differentiation! Early Earth was molten, allowing dense iron to sink to the core while lighter rock floated to form the crust—like oil and water separating.').build())
  q2.setFeedbackForIncorrect(FormApp.createFeedback().setText('Compare the numbers: Crust ≈ 2.7, Mantle ≈ 4.5, Outer Core ≈ 10, Inner Core ≈ 13 g/cm³. What\'s the trend from surface to center?').build());

  // Q3: Inner vs outer core - targets earth-hollow misconception (4 pts)
  const q3 = form.addMultipleChoiceItem();
  q3.setTitle('Both the inner core and outer core are made of iron-nickel, but the inner core is SOLID while the outer core is LIQUID. Why?')
  q3.setHelpText('Consider both temperature and pressure at these depths.')
  q3.setPoints(4)
  q3.setChoices([
    q3.createChoice('The inner core is cooler than the outer core', false),
    q3.createChoice('The inner core is actually hollow', false),
    q3.createChoice('Extreme pressure at the inner core compresses atoms so tightly that iron becomes solid even at 5,000°C', true),
    q3.createChoice('The inner core is made of different material', false)
  ])
  q3.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Amazing fact! The inner core is actually HOTTER than the outer core, but pressure is so extreme (360 GPa) that atoms are forced into a solid crystal structure!').build())
  q3.setFeedbackForIncorrect(FormApp.createFeedback().setText('Counter-intuitive: The inner core is 5,000°C but solid! Pressure can force materials to stay solid even above their normal melting point. What\'s different about inner core pressure?').build());

  // Q4: Mantle behavior - targets mantle-is-liquid misconception (4 pts)
  const q4 = form.addMultipleChoiceItem();
  q4.setTitle('The mantle\'s temperature ranges from 500°C to 4,000°C. It\'s mostly solid rock, yet it\'s responsible for plate tectonics and convection. How is this possible?')
  q4.setHelpText('Think about materials that can be solid but still flow very slowly.')
  q4.setPoints(4)
  q4.setChoices([
    q4.createChoice('The mantle is actually liquid like the outer core', false),
    q4.createChoice('Solid rock cannot flow under any circumstances', false),
    q4.createChoice('At high temperature and pressure, solid rock becomes plastic and flows very slowly over millions of years', true),
    q4.createChoice('Convection only happens in the liquid outer core', false)
  ])
  q4.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Key concept! The asthenosphere (upper mantle) flows like thick tar—solid on short timescales but liquid on geological timescales. This drives plate tectonics!').build())
  q4.setFeedbackForIncorrect(FormApp.createFeedback().setText('Think of glacier ice: It\'s solid, but it flows! Or pitch (tar): solid enough to shatter if hit quickly, but flows over months. The mantle behaves similarly over millions of years.').build());

  // Q5: Layer synthesis (4 pts)
  const q5 = form.addParagraphTextItem();
  q5.setTitle('Using the density and temperature data, explain why Earth has distinct layers rather than being uniform throughout. What process during Earth\'s formation created this layered structure?')
  q5.setHelpText('Think about: What happens when you mix oil and water? What happened when early Earth was molten?')
  q5.setPoints(4);

  Logger.log('G7.C6.W4 Station 2 created: ' + form.getEditUrl());
  return form;
}

// ═══════════════════════════════════════════════════════════════════════════
// STATION 3: DESIGN AN EARTH MODEL (25 points)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Creates Station 3 form on constructing Earth models from evidence
 * Resource: Seismic data + constraints + layer properties
 */
function createG7C6W4Station3() {
  const form = FormApp.create('G7.C6.W4: Station 3 - Design an Earth Model');
  form.setDescription(
    '🔬 DESIGN AN EARTH MODEL 🌍\n\n' +
    'CHALLENGE: You\'re a geophysicist in 1906. You have seismic data from earthquakes around the world, ' +
    'but no one has ever seen Earth\'s interior. Your job is to create a model that explains ALL the ' +
    'observed data.\n\n' +
    'Use the evidence to construct a model of Earth\'s interior and defend your design choices.'
  );
  form.setIsQuiz(true);
  form.setShuffleQuestions(false);

  // Q1: Evidence integration (5 pts)
  const q1 = form.addMultipleChoiceItem();
  q1.setTitle('Your seismic data shows: (1) P-waves arrive everywhere, (2) S-waves have a shadow zone on the opposite side of Earth, (3) Both wave types speed up and slow down at certain depths. What\'s the MINIMUM number of layers needed to explain this data?')
  q1.setHelpText('Each observation requires a different feature in your model.')
  q1.setPoints(5)
  q1.setChoices([
    q1.createChoice('One uniform layer', false),
    q1.createChoice('Two layers (solid outer, liquid inner)', false),
    q1.createChoice('Three or more layers with different properties (at least one liquid layer to create S-wave shadow)', true),
    q1.createChoice('No layers needed—Earth is the same throughout', false)
  ])
  q1.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Correct! You need: (1) solid outer layers (S-waves travel), (2) liquid layer (S-wave shadow), (3) distinct boundaries (wave speed changes). Modern models have 4+ main layers.').build())
  q1.setFeedbackForIncorrect(FormApp.createFeedback().setText('S-wave shadow = liquid layer exists. Wave speed changes = boundaries between different materials. How many distinct regions does this require?').build());

  // Q2: Density model (5 pts)
  const q2 = form.addMultipleChoiceItem();
  q2.setTitle('You know Earth\'s total mass and size. Surface rocks have density ~2.7 g/cm³, but average density must be ~5.5 g/cm³. How should you arrange densities in your model?')
  q2.setHelpText('Think about what arrangement would give the correct average density.')
  q2.setPoints(5)
  q2.setChoices([
    q2.createChoice('All layers should have equal density of 5.5 g/cm³', false),
    q2.createChoice('Dense material at the surface, light material at the center', false),
    q2.createChoice('Light materials (rock) at surface, progressively denser materials (metals) toward center', true),
    q2.createChoice('Density doesn\'t matter for the model', false)
  ])
  q2.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Perfect reasoning! This matches differentiation: when Earth was molten, dense iron sank to form the core while lighter silicates rose to form the mantle and crust.').build())
  q2.setFeedbackForIncorrect(FormApp.createFeedback().setText('To get average 5.5 from surface 2.7, the interior must be MUCH denser. What materials are denser than rock? Where would they end up in a molten Earth?').build());

  // Q3: Core composition prediction (5 pts)
  const q3 = form.addMultipleChoiceItem();
  q3.setTitle('Your model needs a dense core. Which material best fits the evidence of: (1) very high density ~10-13 g/cm³, (2) can be liquid at high temperature, (3) conducts electricity (Earth has a magnetic field)?')
  q3.setHelpText('Consider common elements and their properties.')
  q3.setPoints(5)
  q3.setChoices([
    q3.createChoice('Pure silicon (density 2.3 g/cm³)', false),
    q3.createChoice('Water ice under pressure', false),
    q3.createChoice('Iron-nickel alloy (density ~8-13 g/cm³, conducts electricity, liquid outer/solid inner)', true),
    q3.createChoice('Carbon dioxide', false)
  ])
  q3.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Exactly! Iron meteorites show us what planetary cores look like. Iron\'s density, electrical conductivity (for magnetic field), and abundance make it the perfect match!').build())
  q3.setFeedbackForIncorrect(FormApp.createFeedback().setText('Check each property: High density (10-13 g/cm³), electrical conductor (magnetic field), abundant element. Only one material matches ALL criteria.').build());

  // Q4: Model testing (5 pts)
  const q4 = form.addMultipleChoiceItem();
  q4.setTitle('Another scientist proposes Earth has five layers instead of four. How would you TEST whose model is correct?')
  q4.setHelpText('Think like a scientist: How do you choose between competing models?')
  q4.setPoints(5)
  q4.setChoices([
    q4.createChoice('The more famous scientist is automatically correct', false),
    q4.createChoice('Both models should be accepted equally', false),
    q4.createChoice('Test both models against new seismic data—the model that better explains ALL observations wins', true),
    q4.createChoice('Vote on which model sounds better', false)
  ])
  q4.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Scientific method! Models are judged by how well they explain evidence. Modern seismic data actually supports subdivisions (like inner core vs outer core)—evidence decides!').build())
  q4.setFeedbackForIncorrect(FormApp.createFeedback().setText('In science, models are not chosen by authority or opinion. They\'re tested against evidence. What data would help distinguish between a 4-layer and 5-layer model?').build());

  // Q5: Model presentation (5 pts)
  const q5 = form.addParagraphTextItem();
  q5.setTitle('Create a labeled description of your Earth model. Include: (1) The number and names of layers, (2) Whether each layer is solid or liquid, (3) What each layer is made of, and (4) ONE piece of seismic evidence that supports each layer\'s properties.')
  q5.setHelpText('Be specific about how evidence supports each feature of your model.')
  q5.setPoints(5);

  Logger.log('G7.C6.W4 Station 3 created: ' + form.getEditUrl());
  return form;
}

// ═══════════════════════════════════════════════════════════════════════════
// EXIT TICKET: EARTH'S INTERIOR INTEGRATION (23 points)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Creates Exit Ticket assessing week's learning
 * Structure: 2 New + 2 Spiral + 1 Integration + 1 SEP
 */
function createG7C6W4ExitTicket() {
  const form = FormApp.create('G7.C6.W4: Exit Ticket - Earth\'s Interior Integration');
  form.setDescription(
    '🎯 EXIT TICKET: Earth\'s Interior\n\n' +
    'Demonstrate your understanding of Earth\'s internal structure and the seismic evidence that reveals it.\n\n' +
    'This is an individual assessment—complete it on your own.'
  );
  form.setIsQuiz(true);
  form.setShuffleQuestions(false);

  // NEW Q1: Core composition - targets earth-hollow misconception (4 pts)
  const q1 = form.addMultipleChoiceItem();
  q1.setTitle('NEW CONTENT: Earth\'s core is made primarily of iron and nickel. What evidence supports this conclusion?')
  q1.setHelpText('Think about density, seismic waves, and Earth\'s magnetic field.')
  q1.setPoints(4)
  q1.setChoices([
    q1.createChoice('Scientists have drilled to the core and taken samples', false),
    q1.createChoice('Core density matches iron, iron meteorites show planetary cores are metallic, and only metals can generate Earth\'s magnetic field', true),
    q1.createChoice('The core is hollow so composition doesn\'t matter', false),
    q1.createChoice('Ancient texts describe an iron core', false)
  ])
  q1.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Multiple lines of evidence converge: density calculations, meteorite composition, and magnetic field requirements all point to iron-nickel core.').build())
  q1.setFeedbackForIncorrect(FormApp.createFeedback().setText('We\'ve never sampled the core directly. What indirect evidence tells us about its composition? (Hint: density, magnetism, meteorites)').build());

  // NEW Q2: Layer properties - targets earth-uniform misconception (4 pts)
  const q2 = form.addMultipleChoiceItem();
  q2.setTitle('NEW CONTENT: Why does the inner core remain SOLID even though it\'s hotter than the liquid outer core?')
  q2.setHelpText('Consider the effect of extreme pressure on matter.')
  q2.setPoints(4)
  q2.setChoices([
    q2.createChoice('The inner core is actually cooler than the outer core', false),
    q2.createChoice('Extreme pressure at Earth\'s center compresses iron so tightly it stays solid even at 5,000°C', true),
    q2.createChoice('The inner core is made of a different material that doesn\'t melt', false),
    q2.createChoice('Temperature has no effect on whether iron is solid or liquid', false)
  ])
  q2.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Pressure changes melting point! At 360 GPa (inner core pressure), iron\'s melting point exceeds 6,000°C. The 5,000°C inner core is below this elevated melting point.').build())
  q2.setFeedbackForIncorrect(FormApp.createFeedback().setText('Under extreme pressure, atoms are forced closer together. This raises the melting point. At what pressure does iron stay solid above 5,000°C?').build());

  // SPIRAL Q3: Plate tectonics connection (4 pts)
  const q3 = form.addMultipleChoiceItem();
  q3.setTitle('SPIRAL FROM WEEKS 1-2: How does Earth\'s layered structure enable plate tectonics?')
  q3.setHelpText('Think about which layer provides the mechanism for plate movement.')
  q3.setPoints(4)
  q3.setChoices([
    q3.createChoice('Plate tectonics is unrelated to Earth\'s layers', false),
    q3.createChoice('The plastic asthenosphere (upper mantle) allows rigid plates to move on top, driven by heat from the core and mantle convection', true),
    q3.createChoice('The liquid outer core directly moves the plates', false),
    q3.createChoice('Plates float on the crust, not the mantle', false)
  ])
  q3.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Perfect connection! The asthenosphere\'s "plastic" behavior (solid but flowing over time) is essential for plate movement. Core heat drives mantle convection.').build())
  q3.setFeedbackForIncorrect(FormApp.createFeedback().setText('Plates rest on the asthenosphere (upper mantle). What property of the asthenosphere allows solid plates to move? What provides the energy?').build());

  // SPIRAL Q4: Volcanic connection (4 pts)
  const q4 = form.addMultipleChoiceItem();
  q4.setTitle('SPIRAL FROM WEEK 3: Based on Earth\'s interior structure, at what depth does most magma originate?')
  q4.setHelpText('Think about where rock is hot enough to partially melt and how it reaches the surface.')
  q4.setPoints(4)
  q4.setChoices([
    q4.createChoice('The inner core (5,000+ km deep)', false),
    q4.createChoice('The upper mantle/asthenosphere (100-200 km deep) where pressure reduction or water allows partial melting', true),
    q4.createChoice('The crust (0-70 km deep)', false),
    q4.createChoice('The outer core (2,900+ km deep)', false)
  ])
  q4.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Excellent integration! Most magma forms in the upper mantle where conditions (temperature near melting + pressure changes at boundaries) allow rock to partially melt.').build())
  q4.setFeedbackForIncorrect(FormApp.createFeedback().setText('The mantle is hot but mostly solid. Where do conditions change enough to cause melting? (Hint: plate boundaries affect pressure)').build());

  // INTEGRATION Q5: Evidence synthesis (4 pts)
  const q5 = form.addMultipleChoiceItem();
  q5.setTitle('INTEGRATION: A student claims "Scientists just guessed about Earth\'s interior." How would you explain that the layered model is based on solid evidence?')
  q5.setHelpText('Think about multiple independent lines of evidence that all support the same model.')
  q5.setPoints(4)
  q5.setChoices([
    q5.createChoice('Scientists did guess—we can\'t know for sure', false),
    q5.createChoice('Multiple independent lines of evidence (seismic waves, density calculations, magnetic field, meteorites) all converge on the same model', true),
    q5.createChoice('One scientist\'s drill sample proved the model', false),
    q5.createChoice('The model is based on religious texts', false)
  ])
  q5.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Scientific reasoning! When seismic data, density calculations, magnetic field requirements, and meteorite studies all point to the same conclusion, the model is well-supported.').build())
  q5.setFeedbackForIncorrect(FormApp.createFeedback().setText('How many DIFFERENT types of evidence support the layered Earth model? When independent evidence agrees, confidence increases dramatically.').build());

  // SEP Q6: Developing and using models (3 pts)
  const q6 = form.addParagraphTextItem();
  q6.setTitle('SEP - USING MODELS: Scientists recently detected seismic anomalies suggesting the inner core might have an "innermost inner core" with slightly different properties. How would you modify the traditional 4-layer model to account for this evidence? What new predictions would your modified model make?')
  q6.setHelpText('Think about: What observations led to this idea? What would a 5th layer explain? How could you test it?')
  q6.setPoints(3);

  Logger.log('G7.C6.W4 Exit Ticket created: ' + form.getEditUrl());
  return form;
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN EXECUTION & UTILITIES
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Creates all forms for G7.C6.W4
 */
function createAllG7C6W4Forms() {
  Logger.log('═══════════════════════════════════════════════════════════════');
  Logger.log('Creating G7.C6.W4: Earth\'s Interior Structure & Evidence');
  Logger.log('═══════════════════════════════════════════════════════════════');

  const hook = createG7C6W4Hook();
  const station1 = createG7C6W4Station1();
  const station2 = createG7C6W4Station2();
  const station3 = createG7C6W4Station3();
  const exitTicket = createG7C6W4ExitTicket();

  Logger.log('═══════════════════════════════════════════════════════════════');
  Logger.log('G7.C6.W4 Forms Creation Complete!');
  Logger.log('Total Points: ' + validateG7C6W4Points());
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
function validateG7C6W4Points() {
  const points = G7_C6_W4_CONFIG.points;
  const total = points.hook + points.station1 + points.station2 + points.station3 + points.exitTicket;

  if (total !== 100) {
    Logger.log('⚠️ WARNING: Total points = ' + total + ', expected 100');
  }

  return total;
}
