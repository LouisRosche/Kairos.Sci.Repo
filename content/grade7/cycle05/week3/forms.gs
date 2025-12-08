/**
 * ============================================================================
 * GRADE 7 - CYCLE 5 WEEK 3: SYNTHESIS & ASSESSMENT
 * 3 Forms | 100 Points Total | ~75 Minutes
 * ============================================================================
 *
 * ASSESSMENT WEEK STRUCTURE:
 *   Part 1: Synthesis Review (20 pts, ~15 min) - Connects W1+W2 concepts
 *   Part 2: Cumulative Assessment (60 pts, ~40 min) - All learning targets
 *   Part 3: Misconception Final Check (20 pts, ~20 min) - Targeted remediation
 *
 * LEARNING TARGETS ASSESSED (from W1 & W2):
 *   W1-1: Identify characteristics of different air mass types (mT, cT, mP, cP)
 *   W1-2: Explain how frontal boundaries form where air masses meet
 *   W1-3: Interpret weather maps showing pressure systems and fronts
 *   W1-4: Predict weather changes based on approaching fronts
 *   W2-1: Collect and organize weather data from multiple sources
 *   W2-2: Identify patterns in temperature, pressure, and humidity data
 *   W2-3: Use data evidence to support weather predictions
 *   W2-4: Evaluate the reliability of weather forecasts
 *
 * SPIRAL FROM CYCLES 3-4:
 *   MS-ESS3-5: Climate change factors, greenhouse effect (Cycle 3)
 *   MS-ESS2-6: Water cycle role in weather (Cycle 4)
 *
 * MISCONCEPTIONS TARGETED:
 *   1. "Weather predictions are just guesses"
 *   2. "Cold fronts only happen in winter"
 *   3. "Weather and climate are the same"
 *   4. "Low pressure means cold weather"
 *
 * ============================================================================
 * GOOGLE FORMS API CONSTRAINTS - NON-NEGOTIABLE RULES
 * ============================================================================
 * RULE 1: setPoints() ONLY on auto-gradable items (MCQ, Checkbox, Scale)
 * RULE 2: setShuffleOrder() does NOT exist - configure manually in UI
 * RULE 3: Use requireTextLengthGreaterThanOrEqualTo(), NOT requireTextLengthGreaterThan()
 * RULE 4: setRequireLogin(true) for verified email collection
 * RULE 5: Feedback requires FormApp.createFeedback().setText().build()
 * RULE 6: Scale items support setPoints() but use 0 for diagnostics
 * RULE 7: Checkbox grading is all-or-nothing
 *
 * ============================================================================
 */

// ============================================================================
// HELPER FUNCTION - Standardized logging for all forms
// ============================================================================

function logFormInfo_(form, name, points) {
  const editUrl = form.getEditUrl();
  const pubUrl = form.getPublishedUrl();
  const embedUrl = pubUrl.replace('/viewform', '/viewform?embedded=true');

  Logger.log('----------------------------------------');
  Logger.log(name + ' (' + points + ' pts)');
  Logger.log('Edit:  ' + editUrl);
  Logger.log('Embed: ' + embedUrl);
}

// ============================================================================
// MAIN FUNCTION
// ============================================================================

function createAllG7C5W3Forms() {
  Logger.log('================================================');
  Logger.log('G7 CYCLE 5 WEEK 3: SYNTHESIS & ASSESSMENT');
  Logger.log('================================================\n');

  const forms = {
    synthesis: createG7C5W3Synthesis_(),
    assessment: createG7C5W3Assessment_(),
    misconceptionCheck: createG7C5W3MisconceptionCheck_()
  };

  Logger.log('\n================================================');
  Logger.log('ALL 3 FORMS CREATED - 100 POINTS TOTAL');
  Logger.log('================================================');

  return forms;
}

// ============================================================================
// PART 1: SYNTHESIS REVIEW (20 points, ~15 min)
// Connects Week 1 (Air Masses/Fronts) with Week 2 (Data/Forecasting)
// ============================================================================

function createG7C5W3Synthesis_() {
  const form = FormApp.create('G7.C5.W3: Part 1 - Synthesis Review');

  form.setDescription(
    'CYCLE 5 SYNTHESIS: CONNECTING WEATHER CONCEPTS\n\n' +
    'Over the past two weeks, you learned:\n' +
    '- Week 1: Air masses and what happens when they collide (fronts)\n' +
    '- Week 2: How to use data to predict weather changes\n\n' +
    'Now connect these ideas to understand how meteorologists create forecasts.\n\n' +
    '---\n' +
    'Time: About 15 minutes | Points: 20\n' +
    'You may use your notes for this section.'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Synthesis Review complete! Take a 5-minute break, then continue to Part 2.'
  );

  // --- COMPARISON ---
  form.addPageBreakItem()
    .setTitle('Connecting Week 1 and Week 2')
    .setHelpText('Both weeks work together to explain weather prediction.');

  // Q1: Data sources for tracking fronts (4 pts auto)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('In Week 1, you learned about fronts. In Week 2, you learned about data tools. Which data source is MOST useful for tracking an approaching cold front?')
    .setRequired(true);

  q1.setChoices([
    q1.createChoice('Barometer (pressure) + Thermometer (temperature) showing falling pressure and dropping temperature', true),
    q1.createChoice('Only rain gauge measurements', false),
    q1.createChoice('Humidity data alone', false),
    q1.createChoice('Wind speed without direction', false)
  ]);
  q1.setPoints(4);
  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Cold fronts bring pressure drops AND temperature drops. Using multiple data sources confirms the front is approaching.')
      .build()
  );
  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Think about what a cold front does: brings cold air (temperature) and is associated with low pressure. Multiple data points confirm each other.')
      .build()
  );

  // Q2: Connection explanation (4 pts manual)
  const q2 = form.addParagraphTextItem()
    .setTitle('CONNECT: Explain how knowing the air mass types (Week 1) helps a meteorologist interpret the data patterns (Week 2) in a weather forecast.')
    .setHelpText(
      'Consider: How does knowing it\'s an mT vs cP air mass help you understand what the data means?\n\n' +
      'SENTENCE STARTERS:\n' +
      '• Knowing the air mass type helps because...\n' +
      '• For example, if the data shows ___, and I know it\'s a cP air mass, then...\n' +
      '• Without knowing air mass types, the data would be harder to interpret because...'
    )
    .setRequired(true);

  q2.setValidation(
    FormApp.createParagraphTextValidation()
      .requireTextLengthGreaterThanOrEqualTo(60)
      .build()
  );

  // Q3: Spiral - Cycle 3-4 connection (4 pts auto)
  const q3 = form.addMultipleChoiceItem()
    .setTitle('SPIRAL (Cycles 3-4): The water cycle powers weather. Which statement BEST explains how the water cycle connects to the air masses you learned about in Week 1?')
    .setRequired(true);

  q3.setChoices([
    q3.createChoice('Maritime air masses are humid because water evaporates from oceans and enters the air above them', true),
    q3.createChoice('All air masses have the same humidity', false),
    q3.createChoice('Water only exists in clouds, not in air masses', false),
    q3.createChoice('The water cycle only affects tropical regions', false)
  ]);
  q3.setPoints(4);
  q3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Excellent! The water cycle explains why maritime (m) air masses are humid - evaporation adds moisture to air over oceans.')
      .build()
  );
  q3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Review Cycle 4: Water evaporates from oceans → enters air → makes maritime air masses humid. Continental air masses over land are dry because there\'s less evaporation.')
      .build()
  );

  // Q4: Forecasting process (4 pts manual)
  const q4 = form.addParagraphTextItem()
    .setTitle('EXPLAIN: Describe the steps a meteorologist takes to create a 24-hour forecast, using concepts from BOTH Week 1 (air masses, fronts) and Week 2 (data collection, patterns).')
    .setHelpText(
      'Include at least 3 steps in your explanation.\n\n' +
      'SENTENCE STARTERS:\n' +
      '• First, the meteorologist would...\n' +
      '• Then, they would look at data patterns such as...\n' +
      '• They would use their knowledge of air masses and fronts to...\n' +
      '• Finally, they would make a prediction based on...'
    )
    .setRequired(true);

  q4.setValidation(
    FormApp.createParagraphTextValidation()
      .requireTextLengthGreaterThanOrEqualTo(80)
      .build()
  );

  // Q5: Integration question (4 pts manual)
  const q5 = form.addParagraphTextItem()
    .setTitle('INTEGRATE: A meteorologist sees this data:\n• Pressure: 30.1" → 29.6" (falling over 12 hours)\n• Temperature: 55°F → 48°F (falling)\n• Wind: S 10 mph → NW 25 mph (shifting)\n• Humidity: 65% → 85% (rising)\n\nUsing Week 1 concepts (air masses, fronts) AND Week 2 concepts (data patterns), explain what weather event is occurring and predict what happens next.')
    .setHelpText(
      'Identify the front type and predict the weather.\n\n' +
      'WORD BANK: cold front, warm front, cP, mT, low pressure, high pressure, precipitation, clearing'
    )
    .setRequired(true);

  q5.setValidation(
    FormApp.createParagraphTextValidation()
      .requireTextLengthGreaterThanOrEqualTo(80)
      .build()
  );

  logFormInfo_(form, 'G7.C5.W3 Part 1 - Synthesis', 20);
  return form;
}

// ============================================================================
// PART 2: CUMULATIVE ASSESSMENT (60 points, ~40 min)
// Comprehensive assessment of all Week 1 and Week 2 learning targets
// ============================================================================

function createG7C5W3Assessment_() {
  const form = FormApp.create('G7.C5.W3: Part 2 - Cumulative Assessment');

  form.setDescription(
    'CYCLE 5 CUMULATIVE ASSESSMENT\n\n' +
    'This assessment covers all learning targets from Weeks 1 and 2.\n\n' +
    'Sections:\n' +
    'A: Air Masses & Classification (15 pts)\n' +
    'B: Fronts & Weather Changes (15 pts)\n' +
    'C: Pressure & Data Analysis (15 pts)\n' +
    'D: Forecasting & Prediction (15 pts)\n\n' +
    '---\n' +
    'Time: About 40 minutes | Points: 60\n' +
    'Read each question carefully. Show your best scientific thinking!'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Assessment complete! After a short break, complete Part 3: Misconception Check.'
  );

  // --- SECTION A: AIR MASSES & CLASSIFICATION (15 pts) ---
  form.addPageBreakItem()
    .setTitle('Section A: Air Masses & Classification')
    .setHelpText('Questions about Week 1 content on air mass types.');

  // A1: Air mass classification (4 pts auto)
  const a1 = form.addMultipleChoiceItem()
    .setTitle('An air mass forms over the Gulf of Mexico in summer. What would its classification be?')
    .setRequired(true);

  a1.setChoices([
    a1.createChoice('mT (maritime Tropical) - warm and humid', true),
    a1.createChoice('cP (continental Polar) - cold and dry', false),
    a1.createChoice('mP (maritime Polar) - cold and humid', false),
    a1.createChoice('cT (continental Tropical) - hot and dry', false)
  ]);
  a1.setPoints(4);
  a1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Gulf of Mexico = ocean (maritime/m) + tropical latitude (Tropical/T) = mT = warm and humid.')
      .build()
  );

  // A2: Source region identification (4 pts auto)
  const a2 = form.addMultipleChoiceItem()
    .setTitle('Which source region would produce the COLDEST and DRIEST air mass?')
    .setRequired(true);

  a2.setChoices([
    a2.createChoice('Northern Canada (cP)', true),
    a2.createChoice('Caribbean Sea (mT)', false),
    a2.createChoice('North Atlantic Ocean (mP)', false),
    a2.createChoice('Southwest Desert (cT)', false)
  ]);
  a2.setPoints(4);
  a2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Northern Canada is continental (dry) and polar (cold) = cP = coldest and driest.')
      .build()
  );

  // A3: Property explanation (4 pts manual)
  const a3 = form.addParagraphTextItem()
    .setTitle('EXPLAIN: Why does an air mass that forms over the ocean have different properties than one that forms over a continent? Use specific vocabulary (maritime, continental, humidity, evaporation).')
    .setRequired(true);

  a3.setValidation(
    FormApp.createParagraphTextValidation()
      .requireTextLengthGreaterThanOrEqualTo(60)
      .build()
  );

  // A4: mT vs cP comparison (3 pts auto)
  const a4 = form.addMultipleChoiceItem()
    .setTitle('If an mT air mass and a cP air mass collide, which statement is TRUE?')
    .setRequired(true);

  a4.setChoices([
    a4.createChoice('The mT provides moisture while the cP provides cold temperatures', true),
    a4.createChoice('Both air masses are dry, so no precipitation will occur', false),
    a4.createChoice('The cP air mass will warm up and rise over the mT', false),
    a4.createChoice('Both air masses have the same properties, so nothing happens', false)
  ]);
  a4.setPoints(3);
  a4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! mT (warm, humid) + cP (cold, dry) = moisture + cold = potential for significant precipitation.')
      .build()
  );

  // --- SECTION B: FRONTS & WEATHER CHANGES (15 pts) ---
  form.addPageBreakItem()
    .setTitle('Section B: Fronts & Weather Changes')
    .setHelpText('Questions about frontal boundaries and their effects.');

  // B1: Front type identification (4 pts auto)
  const b1 = form.addMultipleChoiceItem()
    .setTitle('A weather map shows a line with blue triangles pointing east. What does this represent?')
    .setRequired(true);

  b1.setChoices([
    b1.createChoice('A cold front moving east', true),
    b1.createChoice('A warm front moving east', false),
    b1.createChoice('A stationary front', false),
    b1.createChoice('A high pressure system', false)
  ]);
  b1.setPoints(4);
  b1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Blue triangles = cold front. The triangles point in the direction the front is moving.')
      .build()
  );

  // B2: Cold front mechanism (4 pts auto)
  const b2 = form.addMultipleChoiceItem()
    .setTitle('At a cold front, the cold air mass:')
    .setRequired(true);

  b2.setChoices([
    b2.createChoice('Wedges under the warm air, forcing it to rise rapidly', true),
    b2.createChoice('Rises over the warm air slowly', false),
    b2.createChoice('Mixes evenly with the warm air', false),
    b2.createChoice('Stays in place while warm air retreats', false)
  ]);
  b2.setPoints(4);
  b2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Cold air is denser, so it pushes under warm air like a wedge. This rapid uplift can create intense storms.')
      .build()
  );

  // B3: Weather prediction from front (4 pts manual)
  const b3 = form.addParagraphTextItem()
    .setTitle('PREDICT: A cold front is approaching your city. Describe the weather you would expect BEFORE, DURING, and AFTER the front passes.')
    .setHelpText(
      'Include changes in temperature, clouds, precipitation, and wind.\n\n' +
      'SENTENCE STARTERS:\n' +
      '• Before the front: The weather will be...\n' +
      '• During the front passage: Expect...\n' +
      '• After the front passes: The weather will change to...'
    )
    .setRequired(true);

  b3.setValidation(
    FormApp.createParagraphTextValidation()
      .requireTextLengthGreaterThanOrEqualTo(80)
      .build()
  );

  // B4: Front symbol interpretation (3 pts auto)
  const b4 = form.addMultipleChoiceItem()
    .setTitle('A weather map shows alternating blue triangles and red semicircles on a line. This represents:')
    .setRequired(true);

  b4.setChoices([
    b4.createChoice('A stationary front - neither air mass is advancing', true),
    b4.createChoice('A cold front moving very fast', false),
    b4.createChoice('Two separate fronts next to each other', false),
    b4.createChoice('A high pressure system', false)
  ]);
  b4.setPoints(3);
  b4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Alternating triangles and semicircles indicate a stationary front where neither air mass is moving.')
      .build()
  );

  // --- SECTION C: PRESSURE & DATA ANALYSIS (15 pts) ---
  form.addPageBreakItem()
    .setTitle('Section C: Pressure & Data Analysis')
    .setHelpText('Questions about weather data interpretation.');

  // C1: Pressure-weather relationship (4 pts auto)
  const c1 = form.addMultipleChoiceItem()
    .setTitle('A large "L" on a weather map indicates:')
    .setRequired(true);

  c1.setChoices([
    c1.createChoice('Low pressure with rising air, likely clouds and precipitation', true),
    c1.createChoice('Low temperature only', false),
    c1.createChoice('Clear, calm weather', false),
    c1.createChoice('The location of a lake', false)
  ]);
  c1.setPoints(4);
  c1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! L = Low pressure. Rising air in low pressure cools and condenses, forming clouds and precipitation.')
      .build()
  );

  // C2: Isobar interpretation (4 pts auto)
  const c2 = form.addMultipleChoiceItem()
    .setTitle('Isobars on a weather map are very close together. This indicates:')
    .setRequired(true);

  c2.setChoices([
    c2.createChoice('Strong winds due to a large pressure gradient', true),
    c2.createChoice('Light breezes', false),
    c2.createChoice('High temperatures', false),
    c2.createChoice('Heavy rainfall', false)
  ]);
  c2.setPoints(4);
  c2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Close isobars = rapid pressure change over short distance = air rushes from high to low = strong winds.')
      .build()
  );

  // C3: Multi-variable data analysis (4 pts manual)
  const c3 = form.addParagraphTextItem()
    .setTitle('ANALYZE: A weather station records this data over 6 hours:\n\n6 AM: Temp 45°F, Pressure 30.2", Wind S 8 mph\n12 PM: Temp 52°F, Pressure 29.9", Wind SW 15 mph\n6 PM: Temp 48°F, Pressure 29.5", Wind W 22 mph\n\nIdentify at least TWO patterns in the data and explain what weather is likely coming.')
    .setRequired(true);

  c3.setValidation(
    FormApp.createParagraphTextValidation()
      .requireTextLengthGreaterThanOrEqualTo(80)
      .build()
  );

  // C4: Trend identification (3 pts auto)
  const c4 = form.addMultipleChoiceItem()
    .setTitle('If pressure has been steadily rising over the past 24 hours, you would expect:')
    .setRequired(true);

  c4.setChoices([
    c4.createChoice('Improving weather with clearing skies', true),
    c4.createChoice('Worsening weather with approaching storms', false),
    c4.createChoice('No change in weather', false),
    c4.createChoice('Immediate thunderstorms', false)
  ]);
  c4.setPoints(3);
  c4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Rising pressure = high pressure approaching = sinking air = clear, fair weather.')
      .build()
  );

  // --- SECTION D: FORECASTING & PREDICTION (15 pts) ---
  form.addPageBreakItem()
    .setTitle('Section D: Forecasting & Prediction')
    .setHelpText('Questions about creating and evaluating forecasts.');

  // D1: Forecast timing calculation (4 pts auto)
  const d1 = form.addMultipleChoiceItem()
    .setTitle('Radar shows a storm system 150 miles west, moving east at 30 mph. When will it arrive?')
    .setHelpText('Use: Time = Distance ÷ Speed')
    .setRequired(true);

  d1.setChoices([
    d1.createChoice('In about 5 hours', true),
    d1.createChoice('In about 2 hours', false),
    d1.createChoice('In about 10 hours', false),
    d1.createChoice('It will not arrive', false)
  ]);
  d1.setPoints(4);
  d1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! 150 miles ÷ 30 mph = 5 hours.')
      .build()
  );

  // D2: Confidence evaluation (4 pts auto)
  const d2 = form.addMultipleChoiceItem()
    .setTitle('Why are weather forecasts more accurate for tomorrow than for next week?')
    .setRequired(true);

  d2.setChoices([
    d2.createChoice('Small uncertainties in data compound over time, reducing accuracy', true),
    d2.createChoice('Meteorologists don\'t try as hard on long-range forecasts', false),
    d2.createChoice('Weather patterns are completely random after 2 days', false),
    d2.createChoice('Satellites only work for 24-hour periods', false)
  ]);
  d2.setPoints(4);
  d2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! The atmosphere is chaotic - tiny measurement errors grow larger over time, making long-range forecasts less reliable.')
      .build()
  );

  // D3: Complete forecast creation (4 pts manual)
  const d3 = form.addParagraphTextItem()
    .setTitle('CREATE: Based on this scenario, write a forecast:\n\nCurrent conditions: 42°F, pressure 29.7" (falling), humidity 80%, wind NW 18 mph\nRadar: Heavy precipitation band 80 miles west, moving east at 20 mph\nAir masses: cP air moving in from Canada\n\nWrite a forecast for the next 8 hours including: precipitation type/timing, temperature changes, and wind.')
    .setRequired(true);

  d3.setValidation(
    FormApp.createParagraphTextValidation()
      .requireTextLengthGreaterThanOrEqualTo(100)
      .build()
  );

  // D4: Forecast accuracy factors (3 pts manual)
  const d4 = form.addParagraphTextItem()
    .setTitle('EVALUATE: A forecast said "sunny and warm" but it rained. List TWO possible scientific reasons why the forecast was wrong.')
    .setHelpText('Think about: data limitations, model errors, unexpected weather changes')
    .setRequired(true);

  d4.setValidation(
    FormApp.createParagraphTextValidation()
      .requireTextLengthGreaterThanOrEqualTo(50)
      .build()
  );

  logFormInfo_(form, 'G7.C5.W3 Part 2 - Assessment', 60);
  return form;
}

// ============================================================================
// PART 3: MISCONCEPTION CHECK (20 points, ~20 min)
// Targets common misconceptions about weather and forecasting
// ============================================================================

function createG7C5W3MisconceptionCheck_() {
  const form = FormApp.create('G7.C5.W3: Part 3 - Misconception Check');

  form.setDescription(
    'MISCONCEPTION FINAL CHECK\n\n' +
    'This section targets common misconceptions from Cycle 5.\n' +
    'These are the ideas students often get wrong on the first try.\n\n' +
    'Take your time. Think carefully before answering.\n\n' +
    '---\n' +
    'Time: About 20 minutes | Points: 20'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Cycle 5 Assessment Complete!\n\n' +
    'Great work this cycle. You learned how air masses, fronts, and data analysis work together for weather prediction.\n\n' +
    'Next cycle: We\'ll explore more connections between weather patterns and climate.'
  );

  // --- MISCONCEPTION 1: Predictions are guesses ---
  form.addPageBreakItem()
    .setTitle('Check Your Understanding: Weather Prediction')
    .setHelpText('This targets a common misconception about forecasting.');

  const m1 = form.addMultipleChoiceItem()
    .setTitle('MISCONCEPTION CHECK: "Weather predictions are just educated guesses - meteorologists don\'t really know what will happen." Is this TRUE or FALSE?')
    .setRequired(true);

  m1.setChoices([
    m1.createChoice('TRUE - predictions are just guesses', false),
    m1.createChoice('FALSE - predictions are based on scientific data, patterns, and models', true)
  ]);
  m1.setPoints(5);
  m1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Weather predictions use massive amounts of data (temperature, pressure, humidity, radar, satellites) analyzed by computer models. They\'re scientific, not random guesses!')
      .build()
  );
  m1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('This is a common misconception! Modern forecasts use sophisticated data collection and analysis. While not perfect, they\'re based on science, not guessing.')
      .build()
  );

  const m1_explain = form.addParagraphTextItem()
    .setTitle('Explain at least TWO types of data or tools that meteorologists use to make scientific predictions.')
    .setRequired(true);

  m1_explain.setValidation(
    FormApp.createParagraphTextValidation()
      .requireTextLengthGreaterThanOrEqualTo(50)
      .build()
  );

  // --- MISCONCEPTION 2: Cold fronts only in winter ---
  form.addPageBreakItem()
    .setTitle('Check Your Understanding: Fronts')
    .setHelpText('Another common misconception.');

  const m2 = form.addMultipleChoiceItem()
    .setTitle('MISCONCEPTION CHECK: "Cold fronts only happen in winter when it\'s already cold outside." Is this TRUE or FALSE?')
    .setRequired(true);

  m2.setChoices([
    m2.createChoice('TRUE - cold fronts only occur in winter', false),
    m2.createChoice('FALSE - cold fronts can occur in any season', true)
  ]);
  m2.setPoints(5);
  m2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Cold fronts occur year-round. A summer cold front brings COOLER air (maybe 70°F instead of 90°F) - it\'s "cold" relative to what was there before.')
      .build()
  );
  m2.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Misconception! "Cold" front means colder air is REPLACING warmer air. This happens in summer too - bringing relief from heat waves!')
      .build()
  );

  const m2_explain = form.addParagraphTextItem()
    .setTitle('Give an example of what a summer cold front might look like (describe the temperature change).')
    .setRequired(true);

  m2_explain.setValidation(
    FormApp.createParagraphTextValidation()
      .requireTextLengthGreaterThanOrEqualTo(40)
      .build()
  );

  // --- MISCONCEPTION 3: Weather = Climate ---
  form.addPageBreakItem()
    .setTitle('Check Your Understanding: Weather vs Climate')
    .setHelpText('Common confusion between weather and climate.');

  const m3 = form.addMultipleChoiceItem()
    .setTitle('MISCONCEPTION CHECK: "Weather and climate are the same thing - they both describe the conditions outside." Is this TRUE or FALSE?')
    .setRequired(true);

  m3.setChoices([
    m3.createChoice('TRUE - weather and climate are the same', false),
    m3.createChoice('FALSE - weather is short-term conditions; climate is long-term patterns', true)
  ]);
  m3.setPoints(5);
  m3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Weather = what\'s happening now or in the next few days. Climate = average conditions over 30+ years. "Climate is what you expect; weather is what you get!"')
      .build()
  );
  m3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Important distinction! Weather changes day-to-day. Climate is the PATTERN of weather over decades. A single cold day doesn\'t disprove climate change!')
      .build()
  );

  const m3_explain = form.addParagraphTextItem()
    .setTitle('Give one example of weather and one example of climate for your region.')
    .setRequired(true);

  m3_explain.setValidation(
    FormApp.createParagraphTextValidation()
      .requireTextLengthGreaterThanOrEqualTo(40)
      .build()
  );

  // --- SPIRAL MISCONCEPTION: Water cycle + atmosphere ---
  form.addPageBreakItem()
    .setTitle('Cycle 3-4 Spiral Check')
    .setHelpText('Checking retention of previous cycle concepts.');

  const spiral = form.addMultipleChoiceItem()
    .setTitle('SPIRAL CHECK (Cycle 4): Maritime air masses are humid because:')
    .setRequired(true);

  spiral.setChoices([
    spiral.createChoice('Water evaporates from the ocean and enters the air above it', true),
    spiral.createChoice('Rain falls from clouds into the air mass', false),
    spiral.createChoice('The Sun heats the air and creates humidity', false),
    spiral.createChoice('Maritime air masses form over deserts', false)
  ]);
  spiral.setPoints(5);
  spiral.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! The water cycle explains air mass properties. Evaporation from oceans adds water vapor to maritime air masses.')
      .build()
  );
  spiral.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Review Cycle 4: Evaporation moves water from oceans into the air. This is why maritime (m) air masses are humid!')
      .build()
  );

  logFormInfo_(form, 'G7.C5.W3 Part 3 - Misconception Check', 20);
  return form;
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function getG7C5W3FormUrls() {
  const forms = createAllG7C5W3Forms();
  Logger.log('\n=== FORM URLS ===');
  Object.entries(forms).forEach(([name, form]) => {
    Logger.log(name + ': ' + form.getPublishedUrl());
  });
}

// Individual test functions
function testCreateSynthesis() {
  const form = createG7C5W3Synthesis_();
  Logger.log('Synthesis test complete. Check logs for URLs.');
  return form;
}

function testCreateAssessment() {
  const form = createG7C5W3Assessment_();
  Logger.log('Assessment test complete. Check logs for URLs.');
  return form;
}

function testCreateMisconceptionCheck() {
  const form = createG7C5W3MisconceptionCheck_();
  Logger.log('Misconception Check test complete. Check logs for URLs.');
  return form;
}
