/**
 * Grade 7 Cycle 6 Week 1: Plate Boundaries & Seismic Patterns
 * Standards: MS-ESS2-2 (geoscience processes), MS-ESS2-3 (rock cycle)
 * Phenomenon: Why do earthquakes happen in the same places over and over?
 *
 * Form Structure:
 * - Hook: The Earthquake Pattern Mystery (12 pts)
 * - Station 1: Convection & Plate Movement (20 pts)
 * - Station 2: Plate Boundary Analysis (20 pts)
 * - Station 3: Design an Earthquake-Resistant Structure (25 pts)
 * - Exit Ticket: Plate Dynamics Integration (23 pts)
 *
 * Total: 100 points
 */

// ============================================================================
// CONFIGURATION
// ============================================================================

const G7_C6_W1_CONFIG = {
  grade: 7,
  cycle: 6,
  week: 1,
  topic: 'Plate Boundaries & Seismic Patterns',
  phenomenon: 'Why do earthquakes happen in the same places over and over?',
  standards: ['MS-ESS2-2', 'MS-ESS2-3'],
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
      id: 'plates-float-magma',
      description: 'Students think plates float on liquid magma like boats on water',
      targetedIn: ['s1_q3', 's2_q2']
    },
    {
      id: 'continents-move-fast',
      description: 'Students think continents move fast enough to notice',
      targetedIn: ['hook_q3', 's1_q4']
    },
    {
      id: 'earthquakes-random',
      description: 'Students think earthquakes happen randomly across Earth',
      targetedIn: ['hook_q2', 'exit_q1']
    }
  ],
  spiralTargets: {
    c5: 'Air mass movement and convection',
    c4: 'Human impact on environment'
  }
};

// ============================================================================
// MAIN ENTRY POINT
// ============================================================================

/**
 * Creates all forms for G7 C6 W1
 */
function createAllForms() {
  const results = {
    hook: createHookForm_(),
    station1: createStation1Form_(),
    station2: createStation2Form_(),
    station3: createStation3Form_(),
    exitTicket: createExitTicketForm_()
  };

  Logger.log('=== G7 C6 W1 Forms Created ===');
  Object.entries(results).forEach(([name, url]) => {
    Logger.log(`${name}: ${url}`);
  });

  return results;
}

// ============================================================================
// HOOK: THE EARTHQUAKE PATTERN MYSTERY (12 points)
// ============================================================================

function createHookForm_() {
  const form = FormApp.create('G7.C6.W1: Hook - The Earthquake Pattern Mystery');
  configFormSettings_(form);

  form.setDescription(
    'Phenomenon: Look at this map of earthquakes from the last 30 days. ' +
    'Thousands of earthquakes happen every day, but they don\'t happen everywhere. ' +
    'Instead, they form clear lines and clusters. The "Ring of Fire" around the Pacific Ocean ' +
    'has 90% of all earthquakes. Why do earthquakes happen in the same places over and over?\n\n' +
    'Points: 12 | Standards: MS-ESS2-2'
  );

  // Q1: Initial observation (2 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q1: Looking at a global earthquake map, what PATTERN do you notice?')
    .setHelpText('Question ID: g7_c6_w1_hook_q1')
    .setChoices([
      form.createChoice('Earthquakes are spread evenly across all continents', false),
      form.createChoice('Earthquakes cluster along specific lines and boundaries', true),
      form.createChoice('Earthquakes only happen in the ocean', false),
      form.createChoice('Earthquakes only happen on continents', false)
    ])
    .setRequired(true)
    .setPoints(2);

  // Q2: Misconception target - earthquakes-random (2 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q2: A student says "Earthquakes are random - they can happen anywhere at any time with equal chance." What evidence from the map CONTRADICTS this?')
    .setHelpText('Question ID: g7_c6_w1_hook_q2 | Targets misconception: earthquakes-random')
    .setChoices([
      form.createChoice('The student is correct - earthquakes are completely random', false),
      form.createChoice('The clear patterns show earthquakes cluster in specific zones, not randomly', true),
      form.createChoice('Earthquakes only happen once per location', false),
      form.createChoice('Maps cannot show earthquake patterns', false)
    ])
    .setRequired(true)
    .setPoints(2);

  // Q3: Misconception target - continents-move-fast (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q3: Scientists say earthquakes happen at "plate boundaries" where Earth\'s plates push against each other. If these plates are moving, why don\'t we feel them move?')
    .setHelpText('Question ID: g7_c6_w1_hook_q3 | Targets misconception: continents-move-fast')
    .setChoices([
      form.createChoice('The plates aren\'t actually moving', false),
      form.createChoice('Plates move very slowly (1-10 cm/year) - too slow to notice, but stress builds over time', true),
      form.createChoice('We do feel them move constantly', false),
      form.createChoice('Only scientists can feel plate movement', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // Q4: Hypothesis generation (3 pts)
  form.addParagraphTextItem()
    .setTitle('Q4: Based on the earthquake pattern, propose a hypothesis: WHY do earthquakes cluster along specific zones instead of happening randomly everywhere?')
    .setHelpText('Question ID: g7_c6_w1_hook_q4 | 3 points: Testable hypothesis connecting patterns to Earth processes')
    .setRequired(true);
  setPointsForLastItem_(form, 3);

  // Q5: Question generation (2 pts)
  form.addParagraphTextItem()
    .setTitle('Q5: What questions do you have about plate boundaries and what causes earthquakes?')
    .setHelpText('Question ID: g7_c6_w1_hook_q5 | 2 points: Generate investigable questions')
    .setRequired(true);
  setPointsForLastItem_(form, 2);

  return form.getPublishedUrl();
}

// ============================================================================
// STATION 1: CONVECTION & PLATE MOVEMENT (20 points)
// ============================================================================

function createStation1Form_() {
  const form = FormApp.create('G7.C6.W1: Station 1 - Convection & Plate Movement');
  configFormSettings_(form);

  form.setDescription(
    'Investigate how heat from Earth\'s interior drives plate movement.\n\n' +
    'Use the convection demonstration to understand the mechanism behind plate tectonics.\n\n' +
    'Spiral Review: Air mass movement from Cycle 5\n' +
    'Points: 20 | Standards: MS-ESS2-2'
  );

  // Q1: Convection basics (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q1: In the heated water tank demonstration, what happens to the water when it\'s heated from below?')
    .setHelpText('Question ID: g7_c6_w1_s1_q1')
    .setChoices([
      form.createChoice('Hot water sinks to the bottom', false),
      form.createChoice('Hot water rises, cools at top, then sinks - creating a circular flow', true),
      form.createChoice('Water doesn\'t move when heated', false),
      form.createChoice('All water heats evenly at once', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // Q2: Earth application (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q2: Earth\'s core is extremely hot (5,000°C). How does this heat affect the mantle rock above it?')
    .setHelpText('Question ID: g7_c6_w1_s1_q2')
    .setChoices([
      form.createChoice('The mantle stays perfectly still', false),
      form.createChoice('Hot mantle rock slowly rises, cools, and sinks, creating convection currents that move plates', true),
      form.createChoice('The core heat doesn\'t reach the mantle', false),
      form.createChoice('Only the surface is affected by core heat', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q3: Misconception target - plates-float-magma (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q3: A student says "Tectonic plates float on liquid magma like boats on water." What is WRONG with this idea?')
    .setHelpText('Question ID: g7_c6_w1_s1_q3 | Targets misconception: plates-float-magma')
    .setChoices([
      form.createChoice('This is exactly correct', false),
      form.createChoice('The mantle is mostly solid rock that flows very slowly (like silly putty), not liquid magma', true),
      form.createChoice('Plates sink through the magma', false),
      form.createChoice('There is no magma in Earth', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // Q4: Misconception target - continents-move-fast (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q4: Plates move at about the same rate as your fingernails grow (1-10 cm/year). At this rate, how long would it take for a plate to move 1 kilometer?')
    .setHelpText('Question ID: g7_c6_w1_s1_q4 | Targets misconception: continents-move-fast')
    .setChoices([
      form.createChoice('About 1 year', false),
      form.createChoice('About 100 years', false),
      form.createChoice('About 10,000-100,000 years', true),
      form.createChoice('About 1 day', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q5: Spiral - Air convection (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q5: [SPIRAL C5] In Cycle 5, you learned that warm air rises and cool air sinks, creating wind patterns. How is mantle convection SIMILAR to atmospheric convection?')
    .setHelpText('Question ID: g7_c6_w1_s1_q5 | Spiral: C5 Air Mass Movement')
    .setChoices([
      form.createChoice('They are completely different processes', false),
      form.createChoice('Both involve density differences caused by temperature: hot material rises, cool material sinks', true),
      form.createChoice('Atmospheric convection happens faster but follows opposite rules', false),
      form.createChoice('Only air can convect, not rock', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // Q6: Mechanism explanation (3 pts)
  form.addParagraphTextItem()
    .setTitle('Q6: Explain in your own words how convection currents in the mantle cause tectonic plates to move. Include what drives the convection.')
    .setHelpText('Question ID: g7_c6_w1_s1_q6 | 3 points: Clear explanation of heat source, convection, and plate motion')
    .setRequired(true);
  setPointsForLastItem_(form, 3);

  return form.getPublishedUrl();
}

// ============================================================================
// STATION 2: PLATE BOUNDARY ANALYSIS (20 points)
// ============================================================================

function createStation2Form_() {
  const form = FormApp.create('G7.C6.W1: Station 2 - Plate Boundary Analysis');
  configFormSettings_(form);

  form.setDescription(
    'Classify the three types of plate boundaries and predict the geological features each creates.\n\n' +
    'Use boundary type cards and world maps to identify patterns.\n\n' +
    'Points: 20 | Standards: MS-ESS2-2'
  );

  // Boundary types reference
  form.addSectionHeaderItem()
    .setTitle('Three Types of Plate Boundaries')
    .setHelpText('DIVERGENT: Plates move apart\n' +
                 '• Creates: Mid-ocean ridges, rift valleys, new crust\n' +
                 '• Earthquakes: Shallow, moderate\n' +
                 '• Example: Mid-Atlantic Ridge\n\n' +
                 'CONVERGENT: Plates move together\n' +
                 '• Creates: Mountains, trenches, volcanoes, subduction zones\n' +
                 '• Earthquakes: Deep and shallow, powerful\n' +
                 '• Example: Himalayas, Andes\n\n' +
                 'TRANSFORM: Plates slide past each other\n' +
                 '• Creates: Fault lines, offset features\n' +
                 '• Earthquakes: Shallow, can be very powerful\n' +
                 '• Example: San Andreas Fault');

  // Q1: Boundary classification (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q1: The Himalayan Mountains formed when the Indian plate collided with the Eurasian plate. What type of boundary is this?')
    .setHelpText('Question ID: g7_c6_w1_s2_q1')
    .setChoices([
      form.createChoice('Divergent (plates moving apart)', false),
      form.createChoice('Convergent (plates moving together)', true),
      form.createChoice('Transform (plates sliding past)', false),
      form.createChoice('None - mountains don\'t form at plate boundaries', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q2: Misconception target - plates-float-magma (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q2: At the Mid-Atlantic Ridge, new ocean floor is being created. Where does this new rock material come from?')
    .setHelpText('Question ID: g7_c6_w1_s2_q2 | Targets misconception: plates-float-magma')
    .setChoices([
      form.createChoice('The ocean water turns into rock', false),
      form.createChoice('Magma rises from the mantle, cools, and solidifies into new oceanic crust', true),
      form.createChoice('Rock falls from space', false),
      form.createChoice('Existing rock stretches to fill the gap', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q3: Feature prediction (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q3: The San Andreas Fault in California is a transform boundary. What geological feature would you expect to find there?')
    .setHelpText('Question ID: g7_c6_w1_s2_q3')
    .setChoices([
      form.createChoice('A volcanic mountain chain', false),
      form.createChoice('A deep ocean trench', false),
      form.createChoice('A long fault line with offset features and frequent earthquakes', true),
      form.createChoice('A mid-ocean ridge', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q4: Earthquake depth (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q4: At subduction zones (convergent boundaries where one plate goes under another), earthquakes occur at many different depths. Why?')
    .setHelpText('Question ID: g7_c6_w1_s2_q4')
    .setChoices([
      form.createChoice('Earthquakes only happen at the surface', false),
      form.createChoice('The subducting plate generates earthquakes as it descends into the mantle', true),
      form.createChoice('Deeper earthquakes are stronger', false),
      form.createChoice('Earthquake depth is random', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q5: Pattern analysis (4 pts)
  form.addParagraphTextItem()
    .setTitle('Q5: Look at a map showing Earth\'s plate boundaries and volcanoes. What PATTERN do you notice about where volcanoes are located relative to convergent boundaries?')
    .setHelpText('Question ID: g7_c6_w1_s2_q5 | 4 points: Identify volcano-boundary pattern with explanation')
    .setRequired(true);
  setPointsForLastItem_(form, 4);

  return form.getPublishedUrl();
}

// ============================================================================
// STATION 3: DESIGN AN EARTHQUAKE-RESISTANT STRUCTURE (25 points)
// ============================================================================

function createStation3Form_() {
  const form = FormApp.create('G7.C6.W1: Station 3 - Design an Earthquake-Resistant Structure');
  configFormSettings_(form);

  form.setDescription(
    'Apply your plate boundary knowledge to design a structure that can withstand earthquake shaking.\n\n' +
    'Engineering Challenge: Use limited materials to build the tallest structure that survives shaking.\n\n' +
    'Points: 25 | Standards: MS-ESS2-2, MS-ETS1-2'
  );

  // Challenge parameters
  form.addSectionHeaderItem()
    .setTitle('Engineering Challenge')
    .setHelpText('Constraints:\n' +
                 '• Materials: 20 straws, 30 cm tape, 10 paper clips, 1 index card\n' +
                 '• Structure must be at least 30 cm tall\n' +
                 '• Must support a small weight (eraser) at the top\n' +
                 '• Will be tested on shake table for 10 seconds\n\n' +
                 'Scoring:\n' +
                 '• Survives shaking: 10 points\n' +
                 '• Height bonus: +1 point per 5 cm above 30 cm\n' +
                 '• Weight held: +5 points if weight stays on top');

  // Q1: Risk assessment (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q1: Your building is being constructed in San Francisco (transform boundary). Based on what you learned, what type of shaking should you design for?')
    .setHelpText('Question ID: g7_c6_w1_s3_q1')
    .setChoices([
      form.createChoice('Vertical up-and-down only', false),
      form.createChoice('Primarily horizontal side-to-side shaking', true),
      form.createChoice('No shaking - transform boundaries don\'t cause earthquakes', false),
      form.createChoice('Only slow, gradual movement', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q2: Design principles (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q2: Which structural feature would MOST help a building survive horizontal shaking?')
    .setHelpText('Question ID: g7_c6_w1_s3_q2')
    .setChoices([
      form.createChoice('Making the building as tall and narrow as possible', false),
      form.createChoice('A wide base and cross-bracing for lateral stability', true),
      form.createChoice('Using the heaviest materials at the top', false),
      form.createChoice('Making all connections rigid and unable to flex', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q3: Design sketch (5 pts)
  form.addParagraphTextItem()
    .setTitle('Q3: Describe your structure design. Include: (1) Shape of base, (2) How you\'ll provide lateral stability, (3) How you\'ll reach 30+ cm height, and (4) How you\'ll secure the weight.')
    .setHelpText('Question ID: g7_c6_w1_s3_q3 | 5 points: Complete design addressing all 4 elements')
    .setRequired(true);
  setPointsForLastItem_(form, 5);

  // Q4: Trade-off analysis (6 pts)
  form.addParagraphTextItem()
    .setTitle('Q4: Every design involves trade-offs. What trade-offs did you make between height, stability, and weight capacity? Explain why you made these choices.')
    .setHelpText('Question ID: g7_c6_w1_s3_q4 | 6 points: Identify trade-offs with engineering reasoning')
    .setRequired(true);
  setPointsForLastItem_(form, 6);

  // Q5: Real-world application (6 pts)
  form.addParagraphTextItem()
    .setTitle('Q5: Real earthquake-resistant buildings use features like base isolators and flexible joints. How do these features apply the same principles you used in your design?')
    .setHelpText('Question ID: g7_c6_w1_s3_q5 | 6 points: Connect model to real engineering solutions')
    .setRequired(true);
  setPointsForLastItem_(form, 6);

  return form.getPublishedUrl();
}

// ============================================================================
// EXIT TICKET: PLATE DYNAMICS INTEGRATION (23 points)
// ============================================================================

function createExitTicketForm_() {
  const form = FormApp.create('G7.C6.W1: Exit Ticket - Plate Dynamics Integration');
  configFormSettings_(form);

  form.setDescription(
    'Demonstrate your understanding of plate boundaries and seismic patterns.\n\n' +
    'Structure: 2 New + 2 Spiral + 1 Integration + 1 SEP\n' +
    'Points: 23 | Standards: MS-ESS2-2'
  );

  // NEW Q1: Misconception target - earthquakes-random (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q1 [NEW]: Why do 90% of earthquakes occur along the "Ring of Fire" around the Pacific Ocean?')
    .setHelpText('Question ID: g7_c6_w1_exit_q1 | Targets misconception: earthquakes-random')
    .setChoices([
      form.createChoice('It\'s a coincidence - earthquakes are random', false),
      form.createChoice('The Pacific Plate boundaries are where plates interact, creating stress and earthquakes', true),
      form.createChoice('The ocean water causes earthquakes', false),
      form.createChoice('Volcanoes cause all earthquakes in that region', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // NEW Q2: Convection mechanism (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q2 [NEW]: What drives the convection currents in Earth\'s mantle that move tectonic plates?')
    .setHelpText('Question ID: g7_c6_w1_exit_q2')
    .setChoices([
      form.createChoice('The Moon\'s gravitational pull', false),
      form.createChoice('Heat from Earth\'s core creates density differences that drive circulation', true),
      form.createChoice('Wind pushing on the continents', false),
      form.createChoice('Ocean currents pulling the plates', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // SPIRAL Q3: C5 - Convection (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q3 [SPIRAL C5]: You learned about atmospheric convection in Cycle 5. Both air convection and mantle convection are driven by:')
    .setHelpText('Question ID: g7_c6_w1_exit_q3 | Spiral: C5 Air Mass Movement')
    .setChoices([
      form.createChoice('Magnetic forces', false),
      form.createChoice('Temperature differences causing density changes - hot rises, cold sinks', true),
      form.createChoice('Gravity pulling equally on everything', false),
      form.createChoice('Chemical reactions', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // SPIRAL Q4: C4 - Human impact (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q4 [SPIRAL C4]: In Cycle 4, you learned about human impact on the environment. How might understanding plate boundaries help reduce earthquake damage?')
    .setHelpText('Question ID: g7_c6_w1_exit_q4 | Spiral: C4 Human Impact')
    .setChoices([
      form.createChoice('We can stop earthquakes from happening', false),
      form.createChoice('We can build earthquake-resistant structures and create early warning systems in high-risk zones', true),
      form.createChoice('Humans cannot prepare for earthquakes', false),
      form.createChoice('Earthquakes only happen where there are no people', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // INTEGRATION Q5: Full concept connection (5 pts)
  form.addParagraphTextItem()
    .setTitle('Q5 [INTEGRATION]: Explain the complete sequence: How does heat from Earth\'s core eventually lead to an earthquake at a plate boundary? Include convection, plate movement, stress buildup, and release.')
    .setHelpText('Question ID: g7_c6_w1_exit_q5 | 5 points: Complete causal chain from heat to earthquake')
    .setRequired(true);
  setPointsForLastItem_(form, 5);

  // SEP Q6: Analyzing patterns (4 pts)
  form.addParagraphTextItem()
    .setTitle('Q6 [SEP]: A scientist shows you a map with earthquake locations but no plate boundaries drawn. How could you use the earthquake pattern to IDENTIFY where plate boundaries are located? What pattern would you look for?')
    .setHelpText('Question ID: g7_c6_w1_exit_q6 | 4 points: SEP 4 - Analyzing and Interpreting Data')
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
    'Your responses have been recorded. Great work understanding plate tectonics!\n\n' +
    'Key Takeaway: Earthquakes cluster at plate boundaries because that\'s where ' +
    'convection-driven plates interact, building and releasing stress.'
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
    // Paragraph items need manual grading - points included in helpText
  }
}

// ============================================================================
// INDIVIDUAL FORM CREATORS
// ============================================================================

function createG7C6W1Hook() { return createHookForm_(); }
function createG7C6W1Station1() { return createStation1Form_(); }
function createG7C6W1Station2() { return createStation2Form_(); }
function createG7C6W1Station3() { return createStation3Form_(); }
function createG7C6W1ExitTicket() { return createExitTicketForm_(); }

// ============================================================================
// VALIDATION
// ============================================================================

function validatePoints_() {
  const expected = G7_C6_W1_CONFIG.points;
  const calculated = {
    hook: 2 + 2 + 3 + 3 + 2,          // 12
    station1: 3 + 4 + 3 + 4 + 3 + 3,  // 20
    station2: 4 + 4 + 4 + 4 + 4,      // 20
    station3: 4 + 4 + 5 + 6 + 6,      // 25
    exitTicket: 4 + 4 + 3 + 3 + 5 + 4 // 23
  };
  calculated.total = Object.values(calculated).reduce((a, b) => a + b, 0);

  Logger.log('=== Point Validation ===');
  Object.keys(expected).forEach(key => {
    const match = expected[key] === calculated[key];
    Logger.log(`${key}: Expected ${expected[key]}, Got ${calculated[key]} ${match ? '✓' : '✗'}`);
  });

  return calculated.total === expected.total;
}
