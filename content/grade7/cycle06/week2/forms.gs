/**
 * ═══════════════════════════════════════════════════════════════════════════
 * GRADE 7 CYCLE 6 WEEK 2: Seafloor Spreading & Continental Drift
 * STATUS: ✅ COMPLETE - READY FOR REVIEW
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Driving Phenomenon: How can mountains exist on the ocean floor?
 *
 * The Mid-Atlantic Ridge presents a compelling mystery: an underwater mountain
 * range taller than many land mountains. Students explore seafloor spreading
 * evidence and continental drift theory to understand Earth's dynamic surface.
 *
 * Weekly Structure:
 * - Hook: The Underwater Mountain Mystery (12 pts)
 * - Station 1: Seafloor Spreading Evidence (20 pts)
 * - Station 2: Pangaea Puzzle Investigation (20 pts)
 * - Station 3: Design a Plate Movement Detector (25 pts)
 * - Exit Ticket: Earth's Dynamic Surface Integration (23 pts)
 *
 * Standards Alignment:
 * - MS-ESS2-2: Geoscience processes changing Earth's surface
 * - MS-ESS2-3: Evidence for plate motion
 *
 * Spiral Integration:
 * - From C4: Human impact on ocean systems (biogeochemical cycles)
 * - From C6W1: Plate boundaries and convection
 *
 * ═══════════════════════════════════════════════════════════════════════════
 */

// ═══════════════════════════════════════════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════

const G7_C6_W2_CONFIG = {
  grade: 7,
  cycle: 6,
  week: 2,
  topic: 'Seafloor Spreading & Continental Drift',
  phenomenon: 'How can mountains exist on the ocean floor?',

  standards: {
    primary: ['MS-ESS2-2', 'MS-ESS2-3'],
    spiral: ['MS-ESS3-3', 'MS-ESS2-2']
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
    continentsMoveSlowly: {
      id: 'continents-move-fast',
      wrong: 'Continents move fast enough to notice or measure without special equipment',
      correct: 'Plates move 1-10 cm/year (fingernail growth rate); changes visible over millions of years',
      targetedIn: ['s1_q4', 'exit_q2']
    },
    earthquakesNotRandom: {
      id: 'earthquakes-random',
      wrong: 'Earthquakes happen randomly across Earth',
      correct: 'Earthquakes cluster at plate boundaries where stress accumulates',
      targetedIn: ['s2_q3']
    },
    platesFloatOnMagma: {
      id: 'plates-float-magma',
      wrong: 'Plates float on liquid magma like boats on water',
      correct: 'Plates rest on the asthenosphere (plastic solid, not liquid); convection drives movement',
      targetedIn: ['s1_q2']
    }
  },

  spiralTargets: {
    cycle4: {
      topic: 'Human impact on ocean systems',
      connection: 'Connect seafloor resources to human impacts on biogeochemical cycles'
    },
    cycle6Week1: {
      topic: 'Plate boundaries and convection',
      connection: 'Apply plate boundary types to explain seafloor features'
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
// HOOK: THE UNDERWATER MOUNTAIN MYSTERY (12 points)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Creates the Hook form introducing the underwater mountain mystery
 * Resource: Mid-Atlantic Ridge bathymetry + volcanic footage
 */
function createG7C6W2Hook() {
  const form = FormApp.create('G7.C6.W2: Hook - The Underwater Mountain Mystery');
  form.setDescription(
    '🏔️ THE UNDERWATER MOUNTAIN MYSTERY 🌊\n\n' +
    'Deep beneath the Atlantic Ocean lies a mountain range that stretches for over 10,000 miles. ' +
    'Some of these underwater peaks are taller than the Rocky Mountains! But how can mountains ' +
    'exist where there\'s no land—only water?\n\n' +
    'Today we\'ll investigate what creates these mysterious underwater mountains and what they ' +
    'can tell us about how our planet works.'
  );
  form.setIsQuiz(true);
  form.setShuffleQuestions(false);

  // Q1: Initial observation (2 pts)
  const q1 = form.addMultipleChoiceItem();
  q1.setTitle('Look at the bathymetric map of the Atlantic Ocean floor. The Mid-Atlantic Ridge runs down the center. What pattern do you notice about the ridge compared to the coastlines?')
  q1.setHelpText('Examine the shape of the ridge and compare it to Africa and South America.')
  q1.setPoints(2)
  q1.setChoices([
    q1.createChoice('The ridge runs in a straight line from north to south', false),
    q1.createChoice('The ridge curves in a pattern that roughly matches the coastlines of Africa and South America', true),
    q1.createChoice('The ridge is shaped like a circle around a central point', false),
    q1.createChoice('The ridge has no consistent pattern', false)
  ])
  q1.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Excellent observation! The ridge mirrors the coastlines, suggesting a connection between these features.').build())
  q1.setFeedbackForIncorrect(FormApp.createFeedback().setText('Look more carefully—the ridge has an S-curve shape. Compare this to the coastlines of the continents on either side.').build());

  // Q2: Volcanic activity connection (3 pts)
  const q2 = form.addMultipleChoiceItem();
  q2.setTitle('The video shows volcanic activity along the Mid-Atlantic Ridge. What does the presence of volcanoes underwater suggest about these mountains?')
  q2.setHelpText('Think about what causes volcanic activity based on what you learned about plate boundaries.')
  q2.setPoints(3)
  q2.setChoices([
    q2.createChoice('The mountains formed from sediment piling up over millions of years', false),
    q2.createChoice('New rock is being created as magma rises and cools at this location', true),
    q2.createChoice('Underwater explosions pushed existing rock upward', false),
    q2.createChoice('Ocean currents deposited material to build the mountains', false)
  ])
  q2.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Correct! Volcanic activity creates new rock—this is key evidence for seafloor spreading.').build())
  q2.setFeedbackForIncorrect(FormApp.createFeedback().setText('Volcanoes produce molten rock (magma) that cools into solid rock. What would happen if this occurred continuously at the same location?').build());

  // Q3: Height comparison engagement (2 pts)
  const q3 = form.addMultipleChoiceItem();
  q3.setTitle('Mount Everest is about 8,850 meters tall. The Mid-Atlantic Ridge rises about 2,500 meters from the seafloor, but it sits on ocean floor that\'s about 4,000 meters deep. If you could drain the ocean, how would the ridge compare to Everest?')
  q3.setHelpText('Consider the total elevation change from the deepest point to the peak.')
  q3.setPoints(2)
  q3.setChoices([
    q3.createChoice('Much shorter than Everest because 2,500 meters is less than 8,850 meters', false),
    q3.createChoice('About the same height as Everest when measured from the surrounding ocean floor', false),
    q3.createChoice('Shorter from base to peak, but the base starts much lower than Everest\'s base', true),
    q3.createChoice('Taller than Everest because underwater mountains are always bigger', false)
  ])
  q3.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Good thinking! Context matters—the ridge rises from a floor that\'s already deep below sea level.').build())
  q3.setFeedbackForIncorrect(FormApp.createFeedback().setText('Compare the measurements: the ridge peak is 2,500m above a floor that\'s 4,000m deep. Everest is 8,850m above sea level. What\'s the total rise from the deepest point?').build());

  // Q4: Prediction/hypothesis (3 pts)
  const q4 = form.addParagraphTextItem();
  q4.setTitle('Based on your observations, propose a hypothesis: Why might there be a mountain range in the middle of the ocean? What process could create mountains underwater?')
  q4.setHelpText('Use evidence from the map patterns and volcanic activity. Connect to what you know about plate boundaries.')
  q4.setPoints(3);

  // Q5: Question generation (2 pts)
  const q5 = form.addParagraphTextItem();
  q5.setTitle('What questions do you have about how underwater mountains form or what evidence scientists use to study the ocean floor?')
  q5.setHelpText('Think about: What data would help test your hypothesis? What tools would scientists need?')
  q5.setPoints(2);

  Logger.log('G7.C6.W2 Hook created: ' + form.getEditUrl());
  return form;
}

// ═══════════════════════════════════════════════════════════════════════════
// STATION 1: SEAFLOOR SPREADING EVIDENCE (20 points)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Creates Station 1 form on seafloor spreading evidence
 * Resource: Magnetic stripe data + age maps + spreading model
 * Spiral: Human impact on ocean systems from Cycle 4
 */
function createG7C6W2Station1() {
  const form = FormApp.create('G7.C6.W2: Station 1 - Seafloor Spreading Evidence');
  form.setDescription(
    '🧲 SEAFLOOR SPREADING EVIDENCE\n\n' +
    'In the 1960s, scientists discovered something remarkable: the ocean floor has magnetic stripes! ' +
    'These stripes alternate between normal and reversed polarity, and they\'re symmetrical on both ' +
    'sides of the Mid-Atlantic Ridge. This discovery was crucial evidence for understanding how ' +
    'oceans and continents change over time.\n\n' +
    'Use the magnetic stripe data and age maps to uncover evidence for seafloor spreading.'
  );
  form.setIsQuiz(true);
  form.setShuffleQuestions(false);

  // Q1: Magnetic stripe pattern (3 pts)
  const q1 = form.addMultipleChoiceItem();
  q1.setTitle('Examine the magnetic stripe map of the Atlantic Ocean floor. The stripes show alternating magnetic polarity recorded in the rock. What pattern do you observe about the stripes on either side of the Mid-Atlantic Ridge?')
  q1.setHelpText('Look at the colors/patterns on the left side of the ridge compared to the right side.')
  q1.setPoints(3)
  q1.setChoices([
    q1.createChoice('The stripes are random on both sides with no clear pattern', false),
    q1.createChoice('The stripes are symmetrical—the same pattern appears on both sides like a mirror', true),
    q1.createChoice('The stripes only appear on one side of the ridge', false),
    q1.createChoice('The stripes get darker as you move away from the ridge', false)
  ])
  q1.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Excellent! This symmetry is key evidence—new rock forms at the ridge and moves outward equally in both directions.').build())
  q1.setFeedbackForIncorrect(FormApp.createFeedback().setText('Focus on comparing the left and right sides of the ridge. Do the patterns match each other like a mirror image?').build());

  // Q2: Mechanism of spreading - targets plates-float-magma misconception (4 pts)
  const q2 = form.addMultipleChoiceItem();
  q2.setTitle('The spreading model shows new rock being created at the ridge. Which statement BEST explains why the seafloor spreads apart?')
  q2.setHelpText('Think about what\'s happening beneath the plates and what drives their movement.')
  q2.setPoints(4)
  q2.setChoices([
    q2.createChoice('The plates float on liquid magma like boats on water, drifting apart randomly', false),
    q2.createChoice('Convection currents in the plastic-like asthenosphere push plates apart as magma rises at ridges', true),
    q2.createChoice('Gravity pulls the plates toward the deep ocean trenches', false),
    q2.createChoice('Wind and ocean currents push the continents apart', false)
  ])
  q2.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Correct! Convection in the asthenosphere (which behaves like thick plastic, not liquid) drives plate movement. Magma rises at ridges where plates diverge.').build())
  q2.setFeedbackForIncorrect(FormApp.createFeedback().setText('Common misconception: Plates don\'t float on liquid magma. The asthenosphere is solid rock that flows very slowly like thick plastic. Convection currents in this layer drive plate motion.').build());

  // Q3: Age data interpretation (4 pts)
  const q3 = form.addMultipleChoiceItem();
  q3.setTitle('The seafloor age map shows rock ages across the Atlantic. Rock at the Mid-Atlantic Ridge is very young (0-10 million years old), while rock near the continents is older (150-200 million years old). What does this age pattern tell us?')
  q3.setHelpText('Think about where new rock would form and how it would move over time.')
  q3.setPoints(4)
  q3.setChoices([
    q3.createChoice('The ocean formed starting from the edges and filling toward the middle', false),
    q3.createChoice('Rock is being destroyed at the ridge and created near the continents', false),
    q3.createChoice('New rock forms at the ridge and moves outward, so the oldest rock is farthest from the ridge', true),
    q3.createChoice('The rock near continents is the same age as the rock at the ridge', false)
  ])
  q3.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Exactly! The age pattern confirms seafloor spreading: new crust forms at the ridge and moves away over millions of years.').build())
  q3.setFeedbackForIncorrect(FormApp.createFeedback().setText('If new rock is created at the ridge and the plates move apart, where would you expect to find the youngest rock? The oldest?').build());

  // Q4: Rate of spreading - targets continents-move-fast misconception (3 pts)
  const q4 = form.addMultipleChoiceItem();
  q4.setTitle('Scientists calculated that the Atlantic Ocean widens by about 2.5 cm per year. Which comparison BEST helps you understand this rate?')
  q4.setHelpText('Consider: Could you notice this movement during your lifetime?')
  q4.setPoints(3)
  q4.setChoices([
    q4.createChoice('About the same rate as a car driving slowly—you could watch it happen', false),
    q4.createChoice('About the same rate as a plant growing—you could see changes over weeks', false),
    q4.createChoice('About the same rate as your fingernails grow—not noticeable day to day but measurable with precise instruments', true),
    q4.createChoice('So fast that the Atlantic will disappear in our lifetime', false)
  ])
  q4.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Perfect analogy! Plate movement is extremely slow—fingernail growth rate. Over millions of years, this adds up to thousands of kilometers!').build())
  q4.setFeedbackForIncorrect(FormApp.createFeedback().setText('2.5 cm/year = about 1 inch per year. Your fingernails grow about 3-4 cm per year. This motion is far too slow to see, but over millions of years, it creates oceans!').build());

  // Q5: Spiral - Human impact on ocean systems (3 pts)
  const q5 = form.addMultipleChoiceItem();
  q5.setTitle('SPIRAL FROM CYCLE 4: The seafloor contains valuable minerals formed at spreading ridges. Mining these resources would disturb deep-sea ecosystems. How does this connect to what you learned about human impacts on biogeochemical cycles?')
  q5.setHelpText('Think about how extracting resources affects nutrient cycling in ocean systems.')
  q5.setPoints(3)
  q5.setChoices([
    q5.createChoice('Mining has no effect because the deep ocean has no living things', false),
    q5.createChoice('Mining would only affect the area being mined, with no wider impacts', false),
    q5.createChoice('Mining could disrupt nutrient cycling and release stored materials, similar to how deforestation affects carbon cycles', true),
    q5.createChoice('Ocean mining would speed up biogeochemical cycles and improve ecosystems', false)
  ])
  q5.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Great connection! Just like land-based resource extraction, seafloor mining can disrupt ecosystems and release stored materials, affecting nutrient cycles.').build())
  q5.setFeedbackForIncorrect(FormApp.createFeedback().setText('Remember from Cycle 4: Extracting resources from ecosystems often disrupts the cycling of matter. The deep sea has unique ecosystems that depend on specific conditions.').build());

  // Q6: Evidence synthesis (3 pts)
  const q6 = form.addCheckboxItem();
  q6.setTitle('Which pieces of evidence support the theory of seafloor spreading? Select ALL that apply.')
  q6.setHelpText('Think about all the data patterns you\'ve examined.')
  q6.setPoints(3)
  q6.setChoices([
    q6.createChoice('Symmetrical magnetic stripes on both sides of ocean ridges', true),
    q6.createChoice('Ocean floor rock gets older with distance from ridges', true),
    q6.createChoice('Volcanic activity at mid-ocean ridges creates new rock', true),
    q6.createChoice('Ocean water gets saltier near the ridges', false),
    q6.createChoice('Fish populations are highest at spreading ridges', false)
  ])
  q6.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ You identified all three key pieces of evidence: magnetic stripes, age patterns, and volcanic activity at ridges.').build())
  q6.setFeedbackForIncorrect(FormApp.createFeedback().setText('Review the data we examined: magnetic patterns, rock ages, and ridge activity. Which directly relate to how new seafloor forms and moves?').build());

  Logger.log('G7.C6.W2 Station 1 created: ' + form.getEditUrl());
  return form;
}

// ═══════════════════════════════════════════════════════════════════════════
// STATION 2: PANGAEA PUZZLE INVESTIGATION (20 points)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Creates Station 2 form on continental drift evidence
 * Resource: Continental cutouts + fossil distribution maps
 */
function createG7C6W2Station2() {
  const form = FormApp.create('G7.C6.W2: Station 2 - Pangaea Puzzle Investigation');
  form.setDescription(
    '🌍 PANGAEA PUZZLE INVESTIGATION 🧩\n\n' +
    'In 1912, Alfred Wegener proposed that continents were once joined together in a supercontinent ' +
    'called Pangaea. He was ridiculed because he couldn\'t explain HOW continents could move. ' +
    'Today, we have the mechanism (seafloor spreading!), but Wegener\'s original evidence is still ' +
    'powerful.\n\n' +
    'Examine multiple lines of evidence to reconstruct Earth\'s past and support continental drift.'
  );
  form.setIsQuiz(true);
  form.setShuffleQuestions(false);

  // Q1: Coastline matching (4 pts)
  const q1 = form.addMultipleChoiceItem();
  q1.setTitle('When you fit the continental puzzle pieces together, which coastlines fit together most precisely?')
  q1.setHelpText('Try matching the edges of different continents. Which connection is most convincing?')
  q1.setPoints(4)
  q1.setChoices([
    q1.createChoice('North America and Europe', false),
    q1.createChoice('South America and Africa', true),
    q1.createChoice('Australia and Antarctica', false),
    q1.createChoice('Asia and North America', false)
  ])
  q1.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Correct! The eastern coast of South America and western coast of Africa fit together remarkably well—this was Wegener\'s first clue!').build())
  q1.setFeedbackForIncorrect(FormApp.createFeedback().setText('Look at the shapes carefully. One pair of continents fits together almost like puzzle pieces, especially when you use the continental shelf boundaries.').build());

  // Q2: Fossil evidence (4 pts)
  const q2 = form.addMultipleChoiceItem();
  q2.setTitle('The fossil map shows Mesosaurus (a freshwater reptile) fossils found ONLY in Brazil and South Africa. What does this distribution suggest?')
  q2.setHelpText('Think: Could Mesosaurus swim across the Atlantic Ocean? What other explanation works?')
  q2.setPoints(4)
  q2.setChoices([
    q2.createChoice('Mesosaurus could swim across the Atlantic Ocean between the continents', false),
    q2.createChoice('Mesosaurus fossils haven\'t been found in other locations yet', false),
    q2.createChoice('Brazil and Africa were once connected, allowing Mesosaurus to live across both regions', true),
    q2.createChoice('Mesosaurus evolved separately on both continents at the same time', false)
  ])
  q2.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Excellent reasoning! A freshwater reptile couldn\'t survive an ocean crossing. The only explanation is that these landmasses were once connected.').build())
  q2.setFeedbackForIncorrect(FormApp.createFeedback().setText('Mesosaurus was a freshwater reptile—it couldn\'t survive in salt water. The Atlantic Ocean is thousands of kilometers wide. What\'s the most logical explanation?').build());

  // Q3: Pattern connection - targets earthquakes-random misconception (4 pts)
  const q3 = form.addMultipleChoiceItem();
  q3.setTitle('Looking at the fossil distribution patterns across continents, how does this evidence help explain why earthquakes occur in specific patterns rather than randomly?')
  q3.setHelpText('Connect the evidence for continental drift to what you know about plate boundaries.')
  q3.setPoints(4)
  q3.setChoices([
    q3.createChoice('Fossils cause earthquakes when they are disturbed by construction', false),
    q3.createChoice('Earthquakes happen randomly, so there\'s no connection to fossil patterns', false),
    q3.createChoice('The same forces that separated continents continue today, causing earthquakes where plates interact at boundaries', true),
    q3.createChoice('Earthquakes only happen where fossils are found', false)
  ])
  q3.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Great connection! The forces that split Pangaea continue today. Earthquakes cluster at plate boundaries where these forces cause stress—not randomly across the globe.').build())
  q3.setFeedbackForIncorrect(FormApp.createFeedback().setText('Continental drift shows that Earth\'s surface is dynamic. The forces that moved continents apart are still active today. Where would stress build up?').build());

  // Q4: Rock evidence (4 pts)
  const q4 = form.addMultipleChoiceItem();
  q4.setTitle('Geologists found identical rock formations and mountain chains that match across continents when you push them together (like the Appalachian Mountains in North America matching the Caledonian Mountains in Europe). Why is this strong evidence for Pangaea?')
  q4.setHelpText('Think about how mountains form and what it would mean if the same mountain chain appears on two continents.')
  q4.setPoints(4)
  q4.setChoices([
    q4.createChoice('Similar rocks form everywhere on Earth, so this is just coincidence', false),
    q4.createChoice('The mountain chains were once a single continuous range that was split apart as continents separated', true),
    q4.createChoice('Mountains can form underwater and move to different continents', false),
    q4.createChoice('Scientists must have made measurement errors', false)
  ])
  q4.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Exactly! Matching rock types, ages, and structures across ocean basins strongly support that these areas were once connected.').build())
  q4.setFeedbackForIncorrect(FormApp.createFeedback().setText('Mountain chains form through specific geological processes. If the same chain appears on two continents with matching rock types and ages, what\'s the simplest explanation?').build());

  // Q5: Synthesis - multiple lines of evidence (4 pts)
  const q5 = form.addParagraphTextItem();
  q5.setTitle('Why do scientists consider multiple lines of evidence (coastline fit, fossils, rock formations, climate clues) stronger than a single piece of evidence? Use the Pangaea evidence as an example in your explanation.')
  q5.setHelpText('Think about: Could any single piece of evidence have another explanation? What happens when multiple pieces point to the same conclusion?')
  q5.setPoints(4);

  Logger.log('G7.C6.W2 Station 2 created: ' + form.getEditUrl());
  return form;
}

// ═══════════════════════════════════════════════════════════════════════════
// STATION 3: DESIGN A PLATE MOVEMENT DETECTOR (25 points)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Creates Station 3 form on measuring plate movement
 * Resource: GPS data + sensor constraints + location maps
 */
function createG7C6W2Station3() {
  const form = FormApp.create('G7.C6.W2: Station 3 - Design a Plate Movement Detector');
  form.setDescription(
    '📡 DESIGN A PLATE MOVEMENT DETECTOR 🛰️\n\n' +
    'CHALLENGE: Modern GPS technology can measure plate movement with incredible precision—detecting ' +
    'movements of just a few millimeters per year! Your challenge is to design a monitoring system ' +
    'to track plate movement across a plate boundary.\n\n' +
    'Consider: Where should sensors be placed? What data should they collect? How would you confirm ' +
    'that continents are actually moving?'
  );
  form.setIsQuiz(true);
  form.setShuffleQuestions(false);

  // Q1: Sensor placement (5 pts)
  const q1 = form.addMultipleChoiceItem();
  q1.setTitle('You want to measure how fast the Atlantic Ocean is widening. Where should you place GPS monitoring stations to get the most useful data?')
  q1.setHelpText('Think about what you\'re trying to measure and what locations would show the change.')
  q1.setPoints(5)
  q1.setChoices([
    q1.createChoice('All stations in the same city to ensure accuracy', false),
    q1.createChoice('One station on each side of the Mid-Atlantic Ridge (e.g., one in Brazil, one in Africa)', true),
    q1.createChoice('Only at the deepest part of the ocean', false),
    q1.createChoice('Stations only in landlocked countries away from oceans', false)
  ])
  q1.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Perfect! By placing stations on different plates, you can measure how the distance between them changes over time.').build())
  q1.setFeedbackForIncorrect(FormApp.createFeedback().setText('To measure how the ocean is widening, you need to track points on BOTH sides. Stations on the same plate would show no relative movement.').build());

  // Q2: Data requirements (5 pts)
  const q2 = form.addCheckboxItem();
  q2.setTitle('What measurements would your GPS monitoring system need to record? Select ALL that would be necessary for tracking plate movement.')
  q2.setHelpText('Consider what data would show that plates are moving and how fast.')
  q2.setPoints(5)
  q2.setChoices([
    q2.createChoice('Precise position (latitude, longitude, elevation) of each station', true),
    q2.createChoice('Time stamps for each measurement', true),
    q2.createChoice('Temperature at each station', false),
    q2.createChoice('Changes in position over time (displacement rate)', true),
    q2.createChoice('Direction of movement', true),
    q2.createChoice('Number of birds near the station', false)
  ])
  q2.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Excellent! Position, time, displacement rate, and direction are all essential for tracking plate movement.').build())
  q2.setFeedbackForIncorrect(FormApp.createFeedback().setText('Focus on what directly measures movement: Where is the station now? When was this measured? How has position changed? Which direction?').build());

  // Q3: Precision challenge (5 pts)
  const q3 = form.addMultipleChoiceItem();
  q3.setTitle('Plates move only 1-10 cm per year. Why does measuring such small movements require extremely precise GPS equipment rather than a regular smartphone GPS?')
  q3.setHelpText('Consider: How accurate is your phone\'s GPS? Could it detect a 2 cm change?')
  q3.setPoints(5)
  q3.setChoices([
    q3.createChoice('Smartphone GPS is accurate to about 5 meters; we need millimeter accuracy to detect yearly plate movement', true),
    q3.createChoice('Smartphones can\'t connect to GPS satellites over oceans', false),
    q3.createChoice('Scientific GPS and smartphone GPS use completely different satellite systems', false),
    q3.createChoice('Smartphones only work in cities with cell service', false)
  ])
  q3.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Exactly! A 5-meter error would completely hide a 2-cm yearly movement. Scientific GPS uses multiple techniques to achieve millimeter precision.').build())
  q3.setFeedbackForIncorrect(FormApp.createFeedback().setText('Your phone\'s GPS has an accuracy of about 3-5 meters. Plate movement is about 2-10 cm per year. If your measurement error is larger than the actual movement, can you detect it?').build());

  // Q4: Confirmation approach (5 pts)
  const q4 = form.addMultipleChoiceItem();
  q4.setTitle('After 5 years, your GPS stations show that a station in South America has moved 15 cm away from a station in Africa. How would you confirm this measurement is real and not an equipment error?')
  q4.setHelpText('Think like a scientist: How do you verify surprising results?')
  q4.setPoints(5)
  q4.setChoices([
    q4.createChoice('Accept the data immediately since GPS is always accurate', false),
    q4.createChoice('Discard the data because 15 cm is too small to matter', false),
    q4.createChoice('Compare with multiple independent stations, check equipment calibration, and see if the rate matches expected spreading rates', true),
    q4.createChoice('Only accept the data if it matches what you predicted exactly', false)
  ])
  q4.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Great scientific thinking! Multiple data sources, equipment checks, and comparison with expected values all help confirm measurements.').build())
  q4.setFeedbackForIncorrect(FormApp.createFeedback().setText('Scientists don\'t automatically trust single measurements. They use multiple stations, check equipment, and compare with independent data sources to confirm results.').build());

  // Q5: Design reflection (5 pts)
  const q5 = form.addParagraphTextItem();
  q5.setTitle('You\'ve been asked to present your plate monitoring system design to city planners in San Francisco (on the San Andreas Fault). Explain: (1) How your system works, (2) What data it provides, and (3) Why this information is valuable for earthquake preparedness.')
  q5.setHelpText('Connect your GPS monitoring design to real-world applications for earthquake-prone regions.')
  q5.setPoints(5);

  Logger.log('G7.C6.W2 Station 3 created: ' + form.getEditUrl());
  return form;
}

// ═══════════════════════════════════════════════════════════════════════════
// EXIT TICKET: EARTH'S DYNAMIC SURFACE INTEGRATION (23 points)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Creates Exit Ticket assessing week's learning
 * Structure: 2 New + 2 Spiral + 1 Integration + 1 SEP
 */
function createG7C6W2ExitTicket() {
  const form = FormApp.create('G7.C6.W2: Exit Ticket - Earth\'s Dynamic Surface Integration');
  form.setDescription(
    '🎯 EXIT TICKET: Earth\'s Dynamic Surface\n\n' +
    'Demonstrate your understanding of seafloor spreading, continental drift, and the evidence ' +
    'that supports plate tectonics.\n\n' +
    'This is an individual assessment—complete it on your own.'
  );
  form.setIsQuiz(true);
  form.setShuffleQuestions(false);

  // NEW Q1: Seafloor spreading mechanism (4 pts)
  const q1 = form.addMultipleChoiceItem();
  q1.setTitle('NEW CONTENT: What happens at a mid-ocean ridge that causes the seafloor to spread apart?')
  q1.setHelpText('Think about the process occurring at divergent boundaries.')
  q1.setPoints(4)
  q1.setChoices([
    q1.createChoice('Ocean water pushes the plates apart as currents flow', false),
    q1.createChoice('Magma rises through the gap, cools into new rock, and pushes older rock outward', true),
    q1.createChoice('Earthquakes crack the seafloor and pull it apart', false),
    q1.createChoice('Sediments build up and overflow, pushing plates away', false)
  ])
  q1.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Correct! At ridges, magma rises through the gap between diverging plates, cools, and becomes new seafloor that moves away over time.').build())
  q1.setFeedbackForIncorrect(FormApp.createFeedback().setText('Review what\'s happening at divergent boundaries. What material rises up to fill the gap as plates move apart?').build());

  // NEW Q2: Plate movement rate - targets continents-move-fast misconception (4 pts)
  const q2 = form.addMultipleChoiceItem();
  q2.setTitle('NEW CONTENT: If the Atlantic Ocean is widening at about 2.5 cm per year, approximately how much wider was it when you were born than when your teacher was born (assume a 25-year age difference)?')
  q2.setHelpText('Calculate: 2.5 cm × number of years')
  q2.setPoints(4)
  q2.setChoices([
    q2.createChoice('About 62.5 cm (a little over 2 feet) wider', true),
    q2.createChoice('About 25 meters wider', false),
    q2.createChoice('About 2.5 kilometers wider', false),
    q2.createChoice('No measurable difference in just 25 years', false)
  ])
  q2.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Correct! 2.5 cm × 25 years = 62.5 cm. Plate movement is slow, but measurable over human lifetimes with precise equipment.').build())
  q2.setFeedbackForIncorrect(FormApp.createFeedback().setText('Do the math: 2.5 cm/year × 25 years = ? This shows why we need precise GPS to detect plate movement in a human lifetime.').build());

  // SPIRAL Q3: Plate boundaries from Week 1 (4 pts)
  const q3 = form.addMultipleChoiceItem();
  q3.setTitle('SPIRAL FROM WEEK 1: Mid-ocean ridges like the Mid-Atlantic Ridge are what type of plate boundary, and what geological features do they typically create?')
  q3.setHelpText('Connect today\'s learning about seafloor spreading to the plate boundary types from last week.')
  q3.setPoints(4)
  q3.setChoices([
    q3.createChoice('Convergent boundaries; deep ocean trenches', false),
    q3.createChoice('Divergent boundaries; underwater mountain ranges and volcanic activity', true),
    q3.createChoice('Transform boundaries; fault lines with horizontal movement', false),
    q3.createChoice('Subduction zones; volcanic island arcs', false)
  ])
  q3.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Excellent connection! Mid-ocean ridges are divergent boundaries where plates pull apart, creating volcanic mountains as magma fills the gap.').build())
  q3.setFeedbackForIncorrect(FormApp.createFeedback().setText('At mid-ocean ridges, plates are moving APART (diverging). What type of boundary is that? What happens when magma rises between them?').build());

  // SPIRAL Q4: Convection from Week 1 (4 pts)
  const q4 = form.addMultipleChoiceItem();
  q4.setTitle('SPIRAL FROM WEEK 1: How does convection in Earth\'s asthenosphere contribute to both the formation of new seafloor at ridges AND the movement of continents?')
  q4.setHelpText('Think about the convection model from last week and how it applies to seafloor spreading.')
  q4.setPoints(4)
  q4.setChoices([
    q4.createChoice('Convection has no connection to seafloor spreading or continental movement', false),
    q4.createChoice('Convection only affects volcanic activity, not plate movement', false),
    q4.createChoice('Rising hot material at ridges pushes plates apart, while sinking cool material at trenches pulls plates down, creating a cycle that moves continents', true),
    q4.createChoice('Convection in the ocean water is what moves the continents', false)
  ])
  q4.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Perfect integration! Mantle convection is the driving force—hot material rises at ridges and cool material sinks at trenches, moving plates and the continents on them.').build())
  q4.setFeedbackForIncorrect(FormApp.createFeedback().setText('Remember the convection model: hot material rises, spreads out, cools, and sinks. How does this apply to plate movement at ridges and trenches?').build());

  // INTEGRATION Q5: Connecting evidence (4 pts)
  const q5 = form.addMultipleChoiceItem();
  q5.setTitle('INTEGRATION: A student says "Continental drift is just a theory with no real proof." How would you respond using evidence from BOTH seafloor spreading AND continental matching?')
  q5.setHelpText('Combine multiple lines of evidence to build a strong argument.')
  q5.setPoints(4)
  q5.setChoices([
    q5.createChoice('The student is correct—we can\'t directly see continents move, so it\'s unproven', false),
    q5.createChoice('Only the fossil evidence proves continental drift; other evidence is weak', false),
    q5.createChoice('Multiple independent lines of evidence (magnetic stripes, rock ages, fossil distribution, coastline fit) all support the same conclusion, making it well-supported scientific theory', true),
    q5.createChoice('Scientists just believe in continental drift because it\'s popular', false)
  ])
  q5.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Excellent scientific reasoning! In science, "theory" means a well-supported explanation. Multiple independent lines of evidence converging on the same conclusion is very powerful.').build())
  q5.setFeedbackForIncorrect(FormApp.createFeedback().setText('Remember: scientific theories are supported by evidence. When multiple independent types of evidence all point to the same conclusion, that\'s strong support. What evidence have we examined?').build());

  // SEP Q6: Analyzing and interpreting data (3 pts)
  const q6 = form.addParagraphTextItem();
  q6.setTitle('SEP - ANALYZING DATA: Scientists find that seafloor rock near Africa is 150 million years old, while rock at the Mid-Atlantic Ridge is less than 1 million years old. The distance between them is about 3,000 km. Use this data to: (1) Calculate the approximate spreading rate, and (2) Explain how this data supports the theory of seafloor spreading.')
  q6.setHelpText('Show your calculation and reasoning. Rate = distance ÷ time.')
  q6.setPoints(3);

  Logger.log('G7.C6.W2 Exit Ticket created: ' + form.getEditUrl());
  return form;
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN EXECUTION & UTILITIES
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Creates all forms for G7.C6.W2
 */
function createAllG7C6W2Forms() {
  Logger.log('═══════════════════════════════════════════════════════════════');
  Logger.log('Creating G7.C6.W2: Seafloor Spreading & Continental Drift');
  Logger.log('═══════════════════════════════════════════════════════════════');

  const hook = createG7C6W2Hook();
  const station1 = createG7C6W2Station1();
  const station2 = createG7C6W2Station2();
  const station3 = createG7C6W2Station3();
  const exitTicket = createG7C6W2ExitTicket();

  Logger.log('═══════════════════════════════════════════════════════════════');
  Logger.log('G7.C6.W2 Forms Creation Complete!');
  Logger.log('Total Points: ' + validateG7C6W2Points());
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
function validateG7C6W2Points() {
  const points = G7_C6_W2_CONFIG.points;
  const total = points.hook + points.station1 + points.station2 + points.station3 + points.exitTicket;

  if (total !== 100) {
    Logger.log('⚠️ WARNING: Total points = ' + total + ', expected 100');
  }

  return total;
}
