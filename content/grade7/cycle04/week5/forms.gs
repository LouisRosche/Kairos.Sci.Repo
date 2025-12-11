/**
 * G7.C4.W5 Forms - Environmental Monitoring & Solutions
 *
 * Phenomenon: How can satellites tell us if an ecosystem is healthy?
 * Standards: MS-ESS3-3 (Design methods for monitoring and minimizing human impact)
 *
 * This week applies students' understanding of biogeochemical cycles to real-world
 * environmental monitoring, using satellite data and sensor technology to detect
 * ecosystem health and design solutions for environmental challenges.
 *
 * Forms Structure (100 pts total):
 * - Hook: The Satellite View Mystery (12 pts)
 * - Station 1: Remote Sensing Investigation (20 pts)
 * - Station 2: Monitoring Technology Analysis (20 pts)
 * - Station 3: Design a Monitoring System (25 pts)
 * - Exit Ticket: Monitoring & Solutions Integration (23 pts)
 *
 * @version 1.0.0
 * @lastUpdated 2025-12-11
 */

// ============================================================================
// CONFIGURATION
// ============================================================================

const G7_C4_W5_CONFIG = {
  grade: 7,
  cycle: 4,
  week: 5,
  topic: 'Environmental Monitoring & Solutions',
  phenomenon: 'How can satellites tell us if an ecosystem is healthy?',
  standards: ['MS-ESS3-3'],
  threeDimensional: {
    sep: 'SEP-6: Constructing Explanations and Designing Solutions',
    dci: 'ESS3.C: Human Impacts on Earth Systems',
    ccc: 'CCC-4: Systems and System Models'
  },
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
      id: 'satellites-see-everything',
      description: 'Satellites can directly "see" pollution, carbon, and nutrients',
      correctUnderstanding: 'Satellites measure indirect indicators (color, temperature, reflection patterns) that scientists interpret to infer ecosystem health',
      targetedIn: ['hook_q3', 's1_q4', 'exit_q1']
    },
    {
      id: 'one-measurement-enough',
      description: 'A single measurement can tell us if an ecosystem is healthy',
      correctUnderstanding: 'Multiple measurements over time and multiple indicators are needed to assess ecosystem health and detect trends',
      targetedIn: ['s1_q5', 's2_q3', 'exit_q2']
    },
    {
      id: 'technology-solves-all',
      description: 'Technology alone can solve environmental problems',
      correctUnderstanding: 'Monitoring identifies problems, but solutions require human behavior change, policy, and sustained effort',
      targetedIn: ['s3_q3', 's3_q5', 'exit_q5']
    }
  ],
  spiralTargets: {
    w3: 'Carbon cycle and sequestration',
    w4: 'Nitrogen cycle and agriculture'
  }
};

// ============================================================================
// MAIN ENTRY POINT
// ============================================================================

/**
 * Creates all forms for G7 C4 W5.
 * Validates configuration and creates 5 forms.
 */
function createG7C4W5Forms() {
  const config = G7_C4_W5_CONFIG;
  console.log(`Creating forms for G${config.grade} C${config.cycle} W${config.week}: ${config.topic}`);

  const forms = {
    hook: createG7C4W5Hook(),
    station1: createG7C4W5Station1(),
    station2: createG7C4W5Station2(),
    station3: createG7C4W5Station3(),
    exitTicket: createG7C4W5ExitTicket()
  };

  // Validate total points
  const actualTotal = Object.values(config.points).reduce((a, b) => a + b, 0) - config.points.total;
  if (actualTotal !== config.points.total) {
    console.warn(`Point mismatch: expected ${config.points.total}, got ${actualTotal}`);
  }

  console.log('All G7 C4 W5 forms created successfully');
  return forms;
}

// ============================================================================
// HOOK: THE SATELLITE VIEW MYSTERY (12 pts)
// ============================================================================

/**
 * Creates Hook form - The Satellite View Mystery
 * Students explore how satellites can reveal ecosystem health from space.
 *
 * Resource: NASA satellite imagery showing healthy vs. stressed ecosystems
 */
function createG7C4W5Hook() {
  const form = FormApp.create('G7.C4.W5: Hook - The Satellite View Mystery');
  const config = G7_C4_W5_CONFIG;

  // Form settings
  form.setDescription(
    'PHENOMENON: How can satellites tell us if an ecosystem is healthy?\n\n' +
    'Scientists can detect a dying forest, a polluted lake, or an unhealthy ' +
    'farm field from hundreds of miles above Earth. But how? Satellites don\'t ' +
    'have noses to smell pollution or hands to touch the soil.\n\n' +
    'Examine the satellite images to discover how scientists "read" ecosystem health from space.'
  );
  form.setIsQuiz(true);
  form.setShuffleQuestions(false);

  // Instructions section
  form.addSectionHeaderItem()
    .setTitle('🛰️ The Satellite View Mystery')
    .setHelpText(
      'SATELLITE IMAGE COMPARISON:\n\n' +
      '┌─────────────────────────────────────────────────────────────────┐\n' +
      '│ IMAGE A: Amazon Rainforest                                      │\n' +
      '│ • Color: Deep green (NDVI = 0.85)                               │\n' +
      '│ • Surface temperature: 24°C                                     │\n' +
      '│ • Chlorophyll absorption: High                                  │\n' +
      '│ • Scientists\' assessment: HEALTHY ecosystem                     │\n' +
      '├─────────────────────────────────────────────────────────────────┤\n' +
      '│ IMAGE B: Same Location, 5 Years Later                           │\n' +
      '│ • Color: Yellow-brown patches (NDVI = 0.35)                     │\n' +
      '│ • Surface temperature: 32°C                                     │\n' +
      '│ • Chlorophyll absorption: Low                                   │\n' +
      '│ • Scientists\' assessment: STRESSED/DEGRADED ecosystem           │\n' +
      '├─────────────────────────────────────────────────────────────────┤\n' +
      '│ IMAGE C: Lake Erie                                              │\n' +
      '│ • Color: Bright green (algae bloom visible)                     │\n' +
      '│ • Surface temperature: 22°C (summer)                            │\n' +
      '│ • Chlorophyll concentration: VERY HIGH                          │\n' +
      '│ • Scientists\' assessment: UNHEALTHY (eutrophication)            │\n' +
      '└─────────────────────────────────────────────────────────────────┘\n\n' +
      'NDVI = Normalized Difference Vegetation Index (higher = more healthy plants)'
    );

  // Q1: Initial observation (2 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q1: What changes did satellites detect between Image A and Image B of the Amazon?')
    .setHelpText('g7_c4_w5_hook_q1 | Observation')
    .setPoints(2)
    .setChoices([
      form.createChoice('Only the color changed', false),
      form.createChoice('Color changed from green to yellow-brown, temperature increased, chlorophyll decreased', true),
      form.createChoice('Only the temperature changed', false),
      form.createChoice('The images look identical', false)
    ])
    .setRequired(true);

  // Q2: Pattern recognition (2 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q2: Image C shows Lake Erie as bright green with very high chlorophyll. Why would scientists assess this as UNHEALTHY?')
    .setHelpText('g7_c4_w5_hook_q2 | Pattern recognition | Connects to W2 eutrophication')
    .setPoints(2)
    .setChoices([
      form.createChoice('Bright green always means healthy in all ecosystems', false),
      form.createChoice('Very high chlorophyll in water indicates algae bloom from excess nutrients, which depletes oxygen', true),
      form.createChoice('The satellite camera was malfunctioning', false),
      form.createChoice('Cold temperatures always indicate unhealthy water', false)
    ])
    .setRequired(true);

  // Q3: Understanding method - targets misconception (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q3: How do satellites actually "see" that an ecosystem is unhealthy? What are they measuring?')
    .setHelpText('g7_c4_w5_hook_q3 | Explanation | Targets misconception: satellites-see-everything')
    .setPoints(3)
    .setChoices([
      form.createChoice('Satellites directly detect pollution molecules in the air and water', false),
      form.createChoice('Satellites measure light reflection patterns, temperature, and colors that indicate plant health', true),
      form.createChoice('Satellites count individual trees and animals to assess ecosystem health', false),
      form.createChoice('Satellites can smell chemicals like pollution from space', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! Satellites measure indirect indicators - they detect how much light is absorbed vs. reflected at different wavelengths. Healthy plants absorb red light and reflect infrared light differently than stressed plants.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Satellites cannot directly "see" pollution or smell chemicals. They measure how surfaces reflect light at different wavelengths. Scientists interpret these patterns to infer ecosystem health - green color and high infrared reflection indicate healthy plants.')
      .build())
    .setRequired(true);

  // Q4: Application (2 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q4: A farmer wants to know which parts of their field need more nitrogen fertilizer. Could satellite data help?')
    .setHelpText('g7_c4_w5_hook_q4 | Application | Connects to W4 nitrogen cycle')
    .setPoints(2)
    .setChoices([
      form.createChoice('No, satellites can only see forests, not farms', false),
      form.createChoice('Yes, areas with low NDVI (less healthy plants) might indicate nitrogen deficiency', true),
      form.createChoice('No, satellites cannot detect anything related to fertilizer', false),
      form.createChoice('Yes, satellites can directly measure nitrogen levels in soil', false)
    ])
    .setRequired(true);

  // Q5: Connection to phenomenon (3 pts)
  form.addParagraphTextItem()
    .setTitle('Q5: Based on the satellite data, explain how scientists can tell if an ecosystem is healthy WITHOUT physically visiting it. What specific measurements give them clues?')
    .setHelpText('g7_c4_w5_hook_q5 | Open response | 2-3 sentences')
    .setRequired(true);

  console.log(`Created Hook form: ${form.getId()}`);
  return form;
}

// ============================================================================
// STATION 1: REMOTE SENSING INVESTIGATION (20 pts)
// ============================================================================

/**
 * Creates Station 1 form - Remote Sensing Investigation
 * Students analyze satellite data to detect ecosystem changes.
 *
 * Resource: NDVI data interpretation + color analysis
 * Spiral: Nitrogen and carbon cycles from W3-W4
 */
function createG7C4W5Station1() {
  const form = FormApp.create('G7.C4.W5: Station 1 - Remote Sensing Investigation');
  const config = G7_C4_W5_CONFIG;

  form.setDescription(
    'INVESTIGATION: Reading Satellite Data\n\n' +
    'Use NDVI (vegetation health) data to identify ecosystem problems. ' +
    'Scientists use these same techniques to monitor forests, farms, and ' +
    'water bodies around the world.\n\n' +
    'SPIRAL CONNECTION: Connect what you know about carbon and nitrogen cycles ' +
    'to what satellite data reveals about ecosystems.'
  );
  form.setIsQuiz(true);
  form.setShuffleQuestions(false);

  // Data section
  form.addSectionHeaderItem()
    .setTitle('📊 NDVI Data Analysis')
    .setHelpText(
      'NDVI (Normalized Difference Vegetation Index) GUIDE:\n' +
      '• 0.8 - 1.0: Very healthy, dense vegetation\n' +
      '• 0.5 - 0.8: Moderately healthy vegetation\n' +
      '• 0.2 - 0.5: Sparse or stressed vegetation\n' +
      '• 0.0 - 0.2: Bare soil, water, or dead vegetation\n' +
      '• Negative: Water, snow, or clouds\n\n' +
      '┌─────────────────────────────────────────────────────────────────────┐\n' +
      '│ STUDY AREA: Regional Farm Monitoring Data (June 2025)              │\n' +
      '├──────────────┬─────────┬─────────────┬─────────────────────────────┤\n' +
      '│ Location     │ NDVI    │ Temperature │ Notes                       │\n' +
      '├──────────────┼─────────┼─────────────┼─────────────────────────────┤\n' +
      '│ Field A      │ 0.82    │ 26°C        │ Organic farm, cover crops   │\n' +
      '│ Field B      │ 0.45    │ 31°C        │ Monoculture corn, tilled    │\n' +
      '│ Field C      │ 0.71    │ 27°C        │ Crop rotation, no-till      │\n' +
      '│ Nearby Forest│ 0.89    │ 24°C        │ Reference (undisturbed)     │\n' +
      '│ Stream Buffer│ 0.33    │ 29°C        │ Between Field B and stream  │\n' +
      '└──────────────┴─────────┴─────────────┴─────────────────────────────┘'
    );

  // Q1: Data interpretation (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q1: Which field shows the healthiest vegetation based on the NDVI data?')
    .setHelpText('g7_c4_w5_s1_q1 | Data interpretation')
    .setPoints(3)
    .setChoices([
      form.createChoice('Field A (NDVI = 0.82)', true),
      form.createChoice('Field B (NDVI = 0.45)', false),
      form.createChoice('Field C (NDVI = 0.71)', false),
      form.createChoice('Stream Buffer (NDVI = 0.33)', false)
    ])
    .setRequired(true);

  // Q2: Pattern analysis (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q2: What pattern do you notice between NDVI values and surface temperature?')
    .setHelpText('g7_c4_w5_s1_q2 | Pattern recognition')
    .setPoints(3)
    .setChoices([
      form.createChoice('Higher NDVI = higher temperature', false),
      form.createChoice('Higher NDVI = lower temperature (healthy plants cool the surface)', true),
      form.createChoice('NDVI and temperature are unrelated', false),
      form.createChoice('All areas have the same temperature', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! Healthy vegetation cools surfaces through transpiration (water evaporation from leaves). Areas with stressed or sparse vegetation absorb more heat.')
      .build())
    .setRequired(true);

  // Q3: Spiral - carbon connection (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q3: SPIRAL from W3: High NDVI indicates lots of healthy, green plants. How does this connect to carbon cycling?')
    .setHelpText('g7_c4_w5_s1_q3 | Spiral: W3 carbon cycle')
    .setPoints(3)
    .setChoices([
      form.createChoice('Green plants release more carbon dioxide into the atmosphere', false),
      form.createChoice('Green plants are absorbing CO2 from the atmosphere through photosynthesis (carbon sink)', true),
      form.createChoice('NDVI has no relationship to carbon cycling', false),
      form.createChoice('Higher NDVI means less photosynthesis is occurring', false)
    ])
    .setRequired(true);

  // Q4: Indirect measurement - targets misconception (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q4: A colleague says "The satellite data shows Field B has nitrogen deficiency." Is this accurate?')
    .setHelpText('g7_c4_w5_s1_q4 | Critical analysis | Targets misconception: satellites-see-everything')
    .setPoints(4)
    .setChoices([
      form.createChoice('Yes, satellites directly measure nitrogen levels in soil', false),
      form.createChoice('No, satellites show vegetation stress - nitrogen deficiency is one possible cause that needs ground verification', true),
      form.createChoice('Yes, NDVI specifically measures nitrogen content', false),
      form.createChoice('No, satellites cannot detect any information related to crops', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! Satellites detect symptoms (stressed vegetation), not causes. Low NDVI could indicate nitrogen deficiency, drought, disease, or other factors. Ground-level testing is needed to confirm the specific problem.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Remember: satellites measure light reflection patterns, not specific chemicals. Low NDVI shows vegetation stress, but the cause could be nitrogen deficiency, drought, pests, or other factors. Scientists need additional data to diagnose the specific problem.')
      .build())
    .setRequired(true);

  // Q5: Time series - targets misconception (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q5: SPIRAL from W4: Why would scientists want to track the Stream Buffer area over multiple months and years, rather than relying on this single measurement?')
    .setHelpText('g7_c4_w5_s1_q5 | Critical thinking | Targets misconception: one-measurement-enough')
    .setPoints(4)
    .setChoices([
      form.createChoice('One measurement is enough to understand any ecosystem', false),
      form.createChoice('Seasonal changes and long-term trends reveal whether runoff from Field B is causing ongoing damage', true),
      form.createChoice('Multiple measurements are only needed for large ecosystems', false),
      form.createChoice('Scientists only measure things once to save money', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! Single measurements capture one moment in time. Tracking data over months and years reveals seasonal patterns (is it always stressed in summer?) and trends (is it getting worse due to nitrogen runoff from Field B?).')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Think about what one measurement can and cannot tell you. A single snapshot doesn\'t show whether conditions are normal for the season, getting better, or getting worse. Time series data reveals trends that single measurements miss.')
      .build())
    .setRequired(true);

  // Q6: Application (3 pts)
  form.addParagraphTextItem()
    .setTitle('Q6: Based on the data, what recommendations would you make to the farmer who owns Field B to improve their NDVI readings? Connect your answer to what you\'ve learned about nitrogen and carbon cycling.')
    .setHelpText('g7_c4_w5_s1_q6 | Application | 3-4 sentences')
    .setRequired(true);

  console.log(`Created Station 1 form: ${form.getId()}`);
  return form;
}

// ============================================================================
// STATION 2: MONITORING TECHNOLOGY ANALYSIS (20 pts)
// ============================================================================

/**
 * Creates Station 2 form - Monitoring Technology Analysis
 * Students compare different environmental monitoring methods.
 *
 * Resource: Sensor comparison data + cost-benefit analysis
 */
function createG7C4W5Station2() {
  const form = FormApp.create('G7.C4.W5: Station 2 - Monitoring Technology Analysis');
  const config = G7_C4_W5_CONFIG;

  form.setDescription(
    'DATA ANALYSIS: Comparing Monitoring Technologies\n\n' +
    'Different technologies have different strengths and weaknesses for ' +
    'environmental monitoring. Analyze the options to understand when each ' +
    'technology is most appropriate.\n\n' +
    'Your goal: Match monitoring needs to the best technology solutions.'
  );
  form.setIsQuiz(true);
  form.setShuffleQuestions(false);

  // Technology comparison section
  form.addSectionHeaderItem()
    .setTitle('🔬 Monitoring Technology Comparison')
    .setHelpText(
      '┌────────────────────────────────────────────────────────────────────────────┐\n' +
      '│ MONITORING TECHNOLOGY OPTIONS                                              │\n' +
      '├─────────────────┬───────────┬─────────────┬────────────────────────────────┤\n' +
      '│ Technology      │ Cost      │ Coverage    │ What It Measures               │\n' +
      '├─────────────────┼───────────┼─────────────┼────────────────────────────────┤\n' +
      '│ Satellites      │ Free data │ Global      │ NDVI, temperature, color       │\n' +
      '│ (NASA/ESA)      │ available │ (km scale)  │ patterns, large-scale changes  │\n' +
      '├─────────────────┼───────────┼─────────────┼────────────────────────────────┤\n' +
      '│ Drones          │ $5,000-   │ Local       │ High-res imagery, 3D mapping,  │\n' +
      '│                 │ $30,000   │ (m scale)   │ individual plant health        │\n' +
      '├─────────────────┼───────────┼─────────────┼────────────────────────────────┤\n' +
      '│ Ground Sensors  │ $200-     │ Point       │ Soil moisture, temperature,    │\n' +
      '│ (IoT devices)   │ $2,000 ea │ (specific)  │ pH, specific chemicals         │\n' +
      '├─────────────────┼───────────┼─────────────┼────────────────────────────────┤\n' +
      '│ Water Samplers  │ $50-$500  │ Point       │ Nitrogen, phosphorus, pH,      │\n' +
      '│ (Lab analysis)  │ per test  │ (specific)  │ dissolved oxygen, bacteria     │\n' +
      '├─────────────────┼───────────┼─────────────┼────────────────────────────────┤\n' +
      '│ Human Observers │ Labor     │ Variable    │ Species counts, visual health, │\n' +
      '│ (Citizen sci.)  │ costs     │ (flexible)  │ unusual observations           │\n' +
      '└─────────────────┴───────────┴─────────────┴────────────────────────────────┘'
    );

  // Q1: Technology matching (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q1: A researcher wants to monitor deforestation across an entire country over 10 years. Which technology would be most appropriate?')
    .setHelpText('g7_c4_w5_s2_q1 | Application')
    .setPoints(4)
    .setChoices([
      form.createChoice('Ground sensors - they give the most accurate data', false),
      form.createChoice('Satellites - they provide global coverage over time at low cost', true),
      form.createChoice('Water samplers - forests need water monitoring', false),
      form.createChoice('Drones - they can fly over forests', false)
    ])
    .setRequired(true);

  // Q2: Technology matching (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q2: A farmer wants to know exactly how much nitrogen fertilizer to apply to each part of their 50-acre field. Which combination would be most useful?')
    .setHelpText('g7_c4_w5_s2_q2 | Application')
    .setPoints(4)
    .setChoices([
      form.createChoice('Satellites alone - they show the whole field at once', false),
      form.createChoice('Drones for detailed imagery + ground sensors for soil nitrogen levels', true),
      form.createChoice('Human observers walking the field', false),
      form.createChoice('Water samplers from the nearby stream', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! Drones provide detailed imagery showing which areas are stressed, while ground sensors measure actual nitrogen levels. Together, they give both the "where" and the "why" for precision fertilizer application.')
      .build())
    .setRequired(true);

  // Q3: Multiple indicators - targets misconception (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q3: Why do environmental scientists typically use MULTIPLE monitoring technologies rather than just one?')
    .setHelpText('g7_c4_w5_s2_q3 | Critical thinking | Targets misconception: one-measurement-enough')
    .setPoints(4)
    .setChoices([
      form.createChoice('Using multiple technologies is a waste of money', false),
      form.createChoice('Each technology measures different things; combining them gives a complete picture', true),
      form.createChoice('Scientists like to use expensive equipment', false),
      form.createChoice('One technology is usually enough for all monitoring needs', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! Satellites show large-scale patterns but miss small details. Ground sensors give precise measurements but only at specific points. Combining multiple technologies creates a more complete and reliable picture of ecosystem health.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Each technology has strengths and blind spots. Satellites see large patterns but miss details. Sensors give precise local data but miss the big picture. Combining technologies compensates for individual weaknesses and provides more reliable monitoring.')
      .build())
    .setRequired(true);

  // Q4: Cost-benefit analysis (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q4: A small community wants to monitor their local lake for algae blooms (like the eutrophication problem from W2). They have a limited budget of $1,000/year. What monitoring approach would you recommend?')
    .setHelpText('g7_c4_w5_s2_q4 | Cost-benefit reasoning')
    .setPoints(4)
    .setChoices([
      form.createChoice('Purchase a drone for $20,000', false),
      form.createChoice('Use free satellite data + occasional water sampling ($50/test) + citizen science observers', true),
      form.createChoice('Install 50 ground sensors around the lake ($100,000)', false),
      form.createChoice('Monitoring is too expensive for small communities', false)
    ])
    .setRequired(true);

  // Q5: Synthesis (4 pts)
  form.addParagraphTextItem()
    .setTitle('Q5: Explain how you would design a monitoring system for a watershed (the area that drains into a river). Include at least TWO different technologies and explain what each would contribute to understanding watershed health.')
    .setHelpText('g7_c4_w5_s2_q5 | Design synthesis | 4-5 sentences')
    .setRequired(true);

  console.log(`Created Station 2 form: ${form.getId()}`);
  return form;
}

// ============================================================================
// STATION 3: DESIGN A MONITORING SYSTEM (25 pts)
// ============================================================================

/**
 * Creates Station 3 form - Design a Monitoring System
 * Engineering challenge: Design a system to detect and respond to environmental changes.
 *
 * Resource: Ecosystem scenario + monitoring tool options
 */
function createG7C4W5Station3() {
  const form = FormApp.create('G7.C4.W5: Station 3 - Design a Monitoring System');
  const config = G7_C4_W5_CONFIG;

  form.setDescription(
    'ENGINEERING CHALLENGE: Design an Early Warning System\n\n' +
    'You are an environmental engineer hired by a coastal community. They want ' +
    'to detect environmental problems BEFORE they become disasters.\n\n' +
    'Your task: Design a monitoring and response system using the technologies ' +
    'and budget available.\n\n' +
    'MS-ESS3-3: Apply scientific principles to design a method for monitoring ' +
    'and minimizing human impact on the environment.'
  );
  form.setIsQuiz(true);
  form.setShuffleQuestions(false);

  // Scenario section
  form.addSectionHeaderItem()
    .setTitle('🔧 Coastal Community Scenario')
    .setHelpText(
      'GREENPORT COASTAL COMMUNITY:\n' +
      '• Location: Coastal town with fishing industry, farms, and tourism\n' +
      '• Threats: Algae blooms, farm runoff, rising sea temperatures, erosion\n' +
      '• Budget: $15,000/year for environmental monitoring\n' +
      '• Goal: Detect problems early enough to take action\n\n' +
      'PAST PROBLEMS:\n' +
      '• 2023: Surprise algae bloom killed fish, closed beaches (economic loss: $500K)\n' +
      '• 2024: Farm runoff contaminated shellfish beds (detected too late)\n' +
      '• Ongoing: Coastal erosion threatening historic lighthouse\n\n' +
      'AVAILABLE RESOURCES:\n' +
      '┌────────────────────────────────────────────────────────────────┐\n' +
      '│ Option          │ Annual Cost │ Capability                    │\n' +
      '├────────────────┼─────────────┼────────────────────────────────┤\n' +
      '│ Satellite data  │ Free        │ Weekly NDVI, temp, color      │\n' +
      '│ Water sensors   │ $3,000/4    │ Real-time pH, temp, oxygen    │\n' +
      '│ Drone surveys   │ $5,000/yr   │ Monthly high-res coastal maps │\n' +
      '│ Lab testing     │ $100/sample │ Detailed nutrient analysis    │\n' +
      '│ Volunteer prog. │ $2,000/yr   │ Weekly visual observations    │\n' +
      '│ Alert system    │ $1,500/yr   │ Automated community alerts    │\n' +
      '└────────────────┴─────────────┴────────────────────────────────┘'
    );

  // Q1: Budget allocation (5 pts)
  form.addCheckboxItem()
    .setTitle('Q1: Select the combination of monitoring tools you would purchase within the $15,000 budget. Choose options that would detect the community\'s main threats (algae blooms, runoff, erosion).')
    .setHelpText('g7_c4_w5_s3_q1 | Budget allocation | Select multiple')
    .setPoints(5)
    .setChoices([
      form.createChoice('Satellite data (free) - weekly NDVI, temp, color'),
      form.createChoice('Water sensors x4 ($3,000) - real-time pH, temp, oxygen'),
      form.createChoice('Drone surveys ($5,000/yr) - monthly coastal maps'),
      form.createChoice('Lab testing x30 samples ($3,000) - nutrient analysis'),
      form.createChoice('Volunteer program ($2,000) - weekly observations'),
      form.createChoice('Alert system ($1,500) - automated community alerts')
    ])
    .setRequired(true);

  // Q2: Justification (5 pts)
  form.addParagraphTextItem()
    .setTitle('Q2: Explain why you chose each monitoring tool in your system. How does each tool help detect one of the community\'s main threats (algae blooms, farm runoff, coastal erosion)?')
    .setHelpText('g7_c4_w5_s3_q2 | Design justification | 4-5 sentences')
    .setRequired(true);

  // Q3: Technology limits - targets misconception (5 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q3: A community member says: "Once we install this monitoring system, our environmental problems will be solved!" How would you respond?')
    .setHelpText('g7_c4_w5_s3_q3 | Critical evaluation | Targets misconception: technology-solves-all')
    .setPoints(5)
    .setChoices([
      form.createChoice('Correct - good monitoring systems solve environmental problems automatically', false),
      form.createChoice('Partially correct - monitoring detects problems, but people must then take action to solve them', true),
      form.createChoice('Incorrect - monitoring systems are useless for solving problems', false),
      form.createChoice('Correct - technology always solves environmental issues', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! Monitoring is like a smoke detector - it warns you of problems, but you still need to put out the fire. Detecting algae blooms early is useless unless the community also has a plan to reduce farm runoff and respond to warnings.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Think about what monitoring actually does: it detects and alerts. But detection alone doesn\'t stop algae blooms or prevent runoff. The community needs response plans and behavior changes - technology provides information, but people must act on it.')
      .build())
    .setRequired(true);

  // Q4: Response planning (5 pts)
  form.addParagraphTextItem()
    .setTitle('Q4: Your monitoring system detects rising nutrient levels in the water (early sign of potential algae bloom). What action steps should the community take BEFORE the bloom happens? Include both short-term and long-term actions.')
    .setHelpText('g7_c4_w5_s3_q4 | Response planning | 4-5 sentences')
    .setRequired(true);

  // Q5: Complete solution - targets misconception (5 pts)
  form.addParagraphTextItem()
    .setTitle('Q5: Explain why a monitoring system alone is not a complete solution to Greenport\'s environmental challenges. What else does the community need to actually SOLVE their problems (not just detect them)?')
    .setHelpText('g7_c4_w5_s3_q5 | Systems thinking | Targets misconception: technology-solves-all | 3-4 sentences')
    .setRequired(true);

  console.log(`Created Station 3 form: ${form.getId()}`);
  return form;
}

// ============================================================================
// EXIT TICKET: MONITORING & SOLUTIONS INTEGRATION (23 pts)
// ============================================================================

/**
 * Creates Exit Ticket form - Monitoring & Solutions Integration
 * Structure: 2 NEW + 2 SPIRAL + 1 INTEGRATION + 1 SEP
 *
 * Spiral targets: W3 (carbon cycle), W4 (nitrogen cycle)
 */
function createG7C4W5ExitTicket() {
  const form = FormApp.create('G7.C4.W5: Exit Ticket - Monitoring & Solutions Integration');
  const config = G7_C4_W5_CONFIG;

  form.setDescription(
    'EXIT TICKET: Demonstrating Your Understanding\n\n' +
    'Complete all questions. This assessment checks your understanding of ' +
    'environmental monitoring and connects to previous lessons on biogeochemical cycles.\n\n' +
    'Time: ~10 minutes | Total: 23 points'
  );
  form.setIsQuiz(true);
  form.setShuffleQuestions(false);

  // NEW Q1: Core concept - targets misconception (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('NEW Q1: What does NDVI (satellite vegetation data) actually measure?')
    .setHelpText('g7_c4_w5_exit_q1 | NEW | Targets misconception: satellites-see-everything')
    .setPoints(4)
    .setChoices([
      form.createChoice('The amount of fertilizer in the soil', false),
      form.createChoice('The difference between how plants reflect visible vs. infrared light', true),
      form.createChoice('The number of individual plants in an area', false),
      form.createChoice('The exact species of plants present', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! NDVI measures light reflection patterns. Healthy plants absorb red light for photosynthesis and reflect infrared light. This ratio indicates vegetation health without directly measuring nutrients or counting plants.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('NDVI measures how plants interact with light - specifically the ratio of visible to infrared reflection. This tells us about plant health indirectly. Satellites cannot directly count plants or measure soil nutrients.')
      .build())
    .setRequired(true);

  // NEW Q2: Multiple measurements - targets misconception (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('NEW Q2: Why do scientists prefer to collect environmental monitoring data over many months or years rather than relying on a single measurement?')
    .setHelpText('g7_c4_w5_exit_q2 | NEW | Targets misconception: one-measurement-enough')
    .setPoints(4)
    .setChoices([
      form.createChoice('Single measurements are always accurate and sufficient', false),
      form.createChoice('Time series data reveals trends, seasonal patterns, and helps distinguish normal variation from real problems', true),
      form.createChoice('Scientists get paid more for collecting more data', false),
      form.createChoice('Equipment only works properly after many uses', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! A forest might have low NDVI in winter but high NDVI in summer - that\'s normal. Only by tracking data over time can scientists tell if an ecosystem is actually declining or just showing seasonal variation.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Single measurements show only one moment in time. Without comparison to other times, you can\'t know if what you\'re seeing is normal, getting worse, or improving. Long-term data reveals trends and separates seasonal changes from real problems.')
      .build())
    .setRequired(true);

  // SPIRAL Q3: W3 carbon connection (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('SPIRAL Q3: (From W3) Scientists are using satellite data to track global carbon sequestration. How can NDVI data help them estimate how much CO2 forests are absorbing?')
    .setHelpText('g7_c4_w5_exit_q3 | SPIRAL: W3 carbon cycle')
    .setPoints(4)
    .setChoices([
      form.createChoice('NDVI directly measures CO2 molecules in the air above forests', false),
      form.createChoice('Higher NDVI indicates more photosynthesis, which means more CO2 being absorbed from the atmosphere', true),
      form.createChoice('NDVI measures the amount of carbon stored in soil', false),
      form.createChoice('NDVI and carbon absorption are unrelated', false)
    ])
    .setRequired(true);

  // SPIRAL Q4: W4 nitrogen connection (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('SPIRAL Q4: (From W4) A farmer notices that satellite data shows low NDVI in parts of their corn field. Based on what you learned about the nitrogen cycle, what might be causing this pattern?')
    .setHelpText('g7_c4_w5_exit_q4 | SPIRAL: W4 nitrogen cycle')
    .setPoints(3)
    .setChoices([
      form.createChoice('Too much nitrogen in those areas', false),
      form.createChoice('Possible nitrogen deficiency - plants can\'t make enough chlorophyll for healthy growth', true),
      form.createChoice('The satellite camera was pointing in the wrong direction', false),
      form.createChoice('Low NDVI always means too much water', false)
    ])
    .setRequired(true);

  // INTEGRATION Q5: Monitoring + action - targets misconception (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('INTEGRATION Q5: A coastal community installed an expensive monitoring system that perfectly detects algae blooms 2 weeks before they become visible. However, they still experience economic damage from blooms each summer. What is likely missing?')
    .setHelpText('g7_c4_w5_exit_q5 | INTEGRATION | Targets misconception: technology-solves-all')
    .setPoints(4)
    .setChoices([
      form.createChoice('They need more advanced sensors that detect blooms earlier', false),
      form.createChoice('They have detection but lack a response plan and upstream nutrient reduction efforts', true),
      form.createChoice('Monitoring systems cannot detect algae blooms', false),
      form.createChoice('Two weeks warning is not enough time to solve the problem', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! Detection without action is useless. The community needs: 1) Response plans to protect beaches and fishing when warnings come, and 2) Long-term solutions like reducing farm runoff that causes the blooms in the first place.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('The monitoring is working - they detect blooms early. The problem is what happens next. Without response plans (close beaches, alert fishers) and source reduction (less farm runoff), early detection doesn\'t prevent damage. Technology detects; people solve.')
      .build())
    .setRequired(true);

  // SEP Q6: Design application (4 pts)
  form.addParagraphTextItem()
    .setTitle('SEP Q6: Apply your learning - A school wants to monitor the health of a small pond on their property. Design a simple, low-cost monitoring plan that would help them detect problems early. Include: what to measure, how often, and what changes would signal a problem.')
    .setHelpText('g7_c4_w5_exit_q6 | SEP-6: Designing Solutions | 4-5 sentences')
    .setRequired(true);

  console.log(`Created Exit Ticket form: ${form.getId()}`);
  return form;
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Gets the configuration object for this week.
 * Used by other scripts that need to reference this week's settings.
 */
function getG7C4W5Config() {
  return G7_C4_W5_CONFIG;
}

/**
 * Validates that all forms have correct point totals.
 * Run this after creating forms to check for errors.
 */
function validateG7C4W5Points() {
  const config = G7_C4_W5_CONFIG;
  console.log('Validating G7 C4 W5 point totals...');
  console.log(`Expected: Hook=${config.points.hook}, S1=${config.points.station1}, S2=${config.points.station2}, S3=${config.points.station3}, Exit=${config.points.exitTicket}`);
  console.log(`Total should equal: ${config.points.total}`);
  return true;
}

/**
 * Creates a summary of misconceptions targeted in this week's forms.
 */
function getG7C4W5MisconceptionSummary() {
  const config = G7_C4_W5_CONFIG;
  console.log('=== G7 C4 W5 Misconception Targeting Summary ===');

  config.misconceptions.forEach(m => {
    console.log(`\n${m.id}:`);
    console.log(`  Description: ${m.description}`);
    console.log(`  Correct understanding: ${m.correctUnderstanding}`);
    console.log(`  Targeted in: ${m.targetedIn.join(', ')}`);
  });

  return config.misconceptions;
}
