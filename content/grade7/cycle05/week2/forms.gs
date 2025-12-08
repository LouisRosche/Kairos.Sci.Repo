/**
 * ============================================================================
 * GRADE 7 - CYCLE 5 WEEK 2: SEVERE WEATHER PREDICTION & DATA ANALYSIS
 * 5 Forms | 100 Points Total | ~75 Minutes
 * ============================================================================
 *
 * NGSS ALIGNMENT:
 *   Primary: MS-ESS2-5 - Collect data to provide evidence for how the motions
 *            and complex interactions of air masses result in changes in
 *            weather conditions
 *   Spiral:  MS-ESS2-6 - Role of water cycle in weather (Cycle 4)
 *            MS-ESS3-5 - Climate change factors (Cycle 3)
 *
 * 3-DIMENSIONAL LEARNING:
 *   SEP-4: Analyzing and Interpreting Data - Use weather data to make predictions
 *   SEP-2: Developing and Using Models - Create forecasting models
 *   DCI ESS2.D: Weather and Climate
 *   CCC-1: Patterns - Identify patterns in weather data
 *   CCC-2: Cause and Effect - Connect data patterns to weather outcomes
 *
 * LEARNING TARGETS:
 *   1. Collect and organize weather data from multiple sources
 *   2. Identify patterns in temperature, pressure, and humidity data
 *   3. Use data evidence to support weather predictions
 *   4. Evaluate the reliability of weather forecasts
 *
 * FORMS:
 *   1. Hook - The 48-Hour Forecast Challenge (12 pts, ~10 min)
 *   2. Station 1 - Weather Data Collection (20 pts, ~18 min)
 *   3. Station 2 - Pattern Recognition (20 pts, ~15 min)
 *   4. Station 3 - Build Your Own Forecast (25 pts, ~20 min)
 *   5. Exit Ticket - Prediction Synthesis (23 pts, ~15 min)
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
 */

// ============================================================================
// MAIN FUNCTION
// ============================================================================

function createAllG7C5W2Forms() {
  Logger.log('================================================');
  Logger.log('G7 CYCLE 5 WEEK 2: SEVERE WEATHER PREDICTION & DATA ANALYSIS');
  Logger.log('================================================\n');

  const forms = {
    hook: createG7C5W2Hook_(),
    station1: createG7C5W2Station1_(),
    station2: createG7C5W2Station2_(),
    station3: createG7C5W2Station3_(),
    exitTicket: createG7C5W2ExitTicket_()
  };

  Logger.log('\n================================================');
  Logger.log('ALL 5 FORMS CREATED - 100 POINTS TOTAL');
  Logger.log('================================================');

  return forms;
}

// ============================================================================
// HOOK - THE 48-HOUR FORECAST CHALLENGE (12 points, ~10 min)
// Students explore how meteorologists make predictions
// ============================================================================

function createG7C5W2Hook_() {
  const form = FormApp.create('G7.C5.W2: Hook - The 48-Hour Forecast Challenge');

  form.setDescription(
    'THE 48-HOUR FORECAST CHALLENGE\n\n' +
    'In 1900, a hurricane killed over 8,000 people in Galveston, Texas.\n' +
    'Residents had almost no warning because weather forecasting was primitive.\n\n' +
    'Today, meteorologists can predict hurricanes 5+ days in advance!\n\n' +
    'YOUR CHALLENGE:\n' +
    'You\'ll analyze weather data to predict tomorrow\'s weather.\n' +
    'Can you do as well as a professional forecaster?\n\n' +
    'Here\'s today\'s data for Chicago:\n' +
    '• Temperature: 42°F (falling from 55°F yesterday)\n' +
    '• Pressure: 29.8 inches (falling)\n' +
    '• Humidity: 78% (rising)\n' +
    '• Wind: NW at 15 mph (increasing)\n' +
    '• Radar: Precipitation approaching from the west\n\n' +
    '---\n' +
    'Time: About 10 minutes | Points: 12'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Hook submitted! You\'re ready for Station 1.\n\n' +
    'Next: Learn how to collect and interpret weather data like a pro!'
  );

  // Q1: Week 1 connection - falling pressure (3 pts auto)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('From Week 1: Falling barometric pressure typically indicates:')
    .setHelpText('Remember what you learned about pressure systems.')
    .setRequired(true);

  q1.setChoices([
    q1.createChoice('A low pressure system approaching, likely bringing clouds or storms', true),
    q1.createChoice('A high pressure system bringing clear skies', false),
    q1.createChoice('The temperature is about to rise sharply', false),
    q1.createChoice('Pressure changes don\'t affect weather', false)
  ]);
  q1.setPoints(3);
  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Falling pressure = low approaching = unsettled weather likely.')
      .build()
  );
  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Review Week 1: Low pressure systems are associated with rising air and often bring clouds and precipitation.')
      .build()
  );

  // Q2: Interpret multiple data points (3 pts auto)
  const q2 = form.addMultipleChoiceItem()
    .setTitle('Based on ALL the data provided (falling temperature, falling pressure, rising humidity, precipitation approaching), what weather would you predict for tomorrow?')
    .setRequired(true);

  q2.setChoices([
    q2.createChoice('Rain or snow likely, colder temperatures', true),
    q2.createChoice('Sunny and warm', false),
    q2.createChoice('Hot and humid', false),
    q2.createChoice('Dry with no clouds', false)
  ]);
  q2.setPoints(3);
  q2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Great data interpretation! All indicators point to an approaching storm system.')
      .build()
  );
  q2.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Consider all data: falling pressure + rising humidity + precipitation approaching = storm likely. Falling temperature = colder.')
      .build()
  );

  // Q3: Data importance (3 pts auto)
  const q3 = form.addMultipleChoiceItem()
    .setTitle('Why is it better to use MULTIPLE types of weather data (temperature, pressure, humidity, radar) rather than just one?')
    .setRequired(true);

  q3.setChoices([
    q3.createChoice('Different data types confirm each other and create more reliable predictions', true),
    q3.createChoice('Meteorologists are paid by how much data they collect', false),
    q3.createChoice('One type of data is too hard to read', false),
    q3.createChoice('Weather satellites only work with multiple data types', false)
  ]);
  q3.setPoints(3);
  q3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Exactly! Multiple data sources provide cross-confirmation. If they all point the same direction, confidence increases.')
      .build()
  );
  q3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Scientists use multiple data sources to verify findings. When multiple independent measurements agree, the prediction is more reliable.')
      .build()
  );

  // Q4: Prediction reasoning (3 pts, open response)
  const q4 = form.addParagraphTextItem()
    .setTitle('PREDICT: If the pressure continues falling and humidity keeps rising overnight, describe what you think the weather will be like at 7:00 AM tomorrow. Include at least TWO pieces of data as evidence.')
    .setHelpText('Make a specific prediction and support it with the data. (3 points)')
    .setRequired(true);

  q4.setValidation(
    FormApp.createParagraphTextValidation()
      .requireTextLengthGreaterThanOrEqualTo(50)
      .build()
  );

  Logger.log('Hook form created: ' + form.getEditUrl());
  return form;
}

// ============================================================================
// STATION 1 - WEATHER DATA COLLECTION (20 points, ~18 min)
// Students learn about different weather measurement tools and data sources
// ============================================================================

function createG7C5W2Station1_() {
  const form = FormApp.create('G7.C5.W2: Station 1 - Weather Data Collection');

  form.setDescription(
    'STATION 1: WEATHER DATA COLLECTION\n\n' +
    'Meteorologists gather data from many sources:\n\n' +
    'GROUND STATIONS:\n' +
    '• Thermometer - measures temperature\n' +
    '• Barometer - measures atmospheric pressure\n' +
    '• Hygrometer - measures humidity\n' +
    '• Anemometer - measures wind speed\n' +
    '• Rain gauge - measures precipitation\n\n' +
    'REMOTE SENSING:\n' +
    '• Weather satellites - view clouds from space\n' +
    '• Doppler radar - detects precipitation location and intensity\n' +
    '• Weather balloons - measure conditions high in atmosphere\n\n' +
    'DATA NETWORKS:\n' +
    '• NOAA (National Oceanic and Atmospheric Administration)\n' +
    '• NWS (National Weather Service)\n' +
    '• METAR (airport weather reports)\n\n' +
    '---\n' +
    'Time: About 18 minutes | Points: 20'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Station 1 complete! You know how weather data is collected.\n\n' +
    'Next at Station 2: Learn to find patterns in weather data!'
  );

  // Q1: Barometer purpose (3 pts auto)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('A barometer measures:')
    .setRequired(true);

  q1.setChoices([
    q1.createChoice('Atmospheric pressure', true),
    q1.createChoice('Wind speed', false),
    q1.createChoice('Humidity', false),
    q1.createChoice('Temperature', false)
  ]);
  q1.setPoints(3);
  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Barometers measure pressure. Rising pressure = fair weather; falling pressure = storms approaching.')
      .build()
  );
  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('A barometer measures atmospheric pressure. The word "bar" relates to pressure (like in "bar" of pressure).')
      .build()
  );

  // Q2: Doppler radar function (4 pts auto)
  const q2 = form.addMultipleChoiceItem()
    .setTitle('Doppler radar is especially useful for detecting:')
    .setHelpText('Doppler radar sends out radio waves that bounce off precipitation.')
    .setRequired(true);

  q2.setChoices([
    q2.createChoice('Location and movement of rain, snow, and severe storms', true),
    q2.createChoice('Air temperature at ground level', false),
    q2.createChoice('Humidity inside clouds', false),
    q2.createChoice('Wind direction only', false)
  ]);
  q2.setPoints(4);
  q2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Right! Doppler radar shows where precipitation is, how intense it is, and which direction it\'s moving.')
      .build()
  );
  q2.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Doppler radar sends radio waves that bounce off precipitation. It shows storms in real-time on a map.')
      .build()
  );

  // Q3: Satellite advantage (3 pts auto)
  const q3 = form.addMultipleChoiceItem()
    .setTitle('What is the main advantage of weather satellites over ground-based stations?')
    .setRequired(true);

  q3.setChoices([
    q3.createChoice('Satellites can view large areas including oceans where there are no ground stations', true),
    q3.createChoice('Satellites are cheaper to operate', false),
    q3.createChoice('Satellites can measure temperature more accurately', false),
    q3.createChoice('Satellites can control the weather', false)
  ]);
  q3.setPoints(3);
  q3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Satellites provide a "big picture" view, especially important over oceans where most weather systems develop.')
      .build()
  );
  q3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Ground stations only measure conditions at specific points. Satellites can view entire continents and oceans at once.')
      .build()
  );

  // Q4: Data table reading (4 pts auto)
  form.addTextItem()
    .setTitle('Reference the following data table:')
    .setHelpText(
      'CHICAGO WEATHER DATA - February 3, 2026:\n' +
      '6 AM:  Temp 34°F | Pressure 30.1" | Humidity 65% | Wind N 5 mph\n' +
      '12 PM: Temp 38°F | Pressure 29.9" | Humidity 72% | Wind NE 10 mph\n' +
      '6 PM:  Temp 35°F | Pressure 29.6" | Humidity 85% | Wind E 15 mph\n' +
      '(Use this data for the next question)'
    );

  const q4 = form.addMultipleChoiceItem()
    .setTitle('Based on the data table above, which statement is TRUE?')
    .setRequired(true);

  q4.setChoices([
    q4.createChoice('Pressure is falling and humidity is rising throughout the day', true),
    q4.createChoice('Temperature is rising steadily', false),
    q4.createChoice('Pressure is rising and humidity is falling', false),
    q4.createChoice('Wind direction remains constant', false)
  ]);
  q4.setPoints(4);
  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Pressure: 30.1→29.9→29.6 (falling). Humidity: 65%→72%→85% (rising). This suggests a storm approaching.')
      .build()
  );
  q4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Read each column: Pressure goes from 30.1 to 29.9 to 29.6 (falling). Humidity goes from 65% to 72% to 85% (rising).')
      .build()
  );

  // Q5: Jet stream connection (3 pts auto)
  const q5 = form.addMultipleChoiceItem()
    .setTitle('Weather balloons that measure conditions high in the atmosphere help forecasters track:')
    .setHelpText('These measurements are crucial for understanding large-scale weather patterns.')
    .setRequired(true);

  q5.setChoices([
    q5.createChoice('The jet stream and upper-level winds that steer weather systems', true),
    q5.createChoice('Ground-level fog', false),
    q5.createChoice('Individual raindrops', false),
    q5.createChoice('Underground water tables', false)
  ]);
  q5.setPoints(3);
  q5.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! The jet stream at 30,000+ feet steers surface weather systems. Weather balloons help track it.')
      .build()
  );
  q5.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Upper-atmosphere conditions (tracked by weather balloons) include the jet stream, which guides weather systems across continents.')
      .build()
  );

  // Q6: Data collection reasoning (3 pts, open response)
  const q6 = form.addParagraphTextItem()
    .setTitle('EXPLAIN: Why do meteorologists collect weather data every hour (or more often) rather than just once a day? How does this help with forecasting?')
    .setHelpText('Think about how quickly weather can change. (3 points)')
    .setRequired(true);

  q6.setValidation(
    FormApp.createParagraphTextValidation()
      .requireTextLengthGreaterThanOrEqualTo(50)
      .build()
  );

  Logger.log('Station 1 form created: ' + form.getEditUrl());
  return form;
}

// ============================================================================
// STATION 2 - PATTERN RECOGNITION (20 points, ~15 min)
// Students identify patterns in weather data to make predictions
// ============================================================================

function createG7C5W2Station2_() {
  const form = FormApp.create('G7.C5.W2: Station 2 - Pattern Recognition');

  form.setDescription(
    'STATION 2: PATTERN RECOGNITION\n\n' +
    'Weather follows PATTERNS that help us make predictions.\n\n' +
    'KEY PATTERNS TO WATCH:\n\n' +
    '1. PRESSURE TRENDS:\n' +
    '   • Rapid drop (3+ mb in 3 hours) = severe weather likely\n' +
    '   • Slow steady drop = approaching front\n' +
    '   • Rising pressure = clearing weather\n\n' +
    '2. TEMPERATURE + HUMIDITY PATTERNS:\n' +
    '   • Rising humidity + steady temperature = precipitation likely\n' +
    '   • Dew point approaching temperature = fog or rain possible\n\n' +
    '3. WIND PATTERNS:\n' +
    '   • Wind shift from S to N = cold front passage\n' +
    '   • Increasing wind speed = strengthening storm\n\n' +
    '4. HISTORICAL PATTERNS:\n' +
    '   • Similar conditions in the past = similar outcomes likely\n\n' +
    '---\n' +
    'Time: About 15 minutes | Points: 20'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Station 2 complete! You can now spot weather patterns.\n\n' +
    'Next at Station 3: Build your own weather forecast!'
  );

  // Q1: Rapid pressure drop (4 pts auto)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('If barometric pressure drops rapidly (more than 3 millibars in 3 hours), you should expect:')
    .setRequired(true);

  q1.setChoices([
    q1.createChoice('A strong storm with possible severe weather', true),
    q1.createChoice('Calm, clear conditions', false),
    q1.createChoice('Gradually warming temperatures', false),
    q1.createChoice('No significant weather change', false)
  ]);
  q1.setPoints(4);
  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Rapid pressure drops indicate an intensifying low pressure system, which often brings severe weather.')
      .build()
  );
  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Rapid pressure drops mean a strong low is developing quickly. Strong lows = intense storms.')
      .build()
  );

  // Q2: Wind shift interpretation (4 pts auto)
  const q2 = form.addMultipleChoiceItem()
    .setTitle('In the morning, wind was from the south. By afternoon, wind shifted to the northwest. This pattern suggests:')
    .setHelpText('Think about which air masses come from which directions.')
    .setRequired(true);

  q2.setChoices([
    q2.createChoice('A cold front has passed through', true),
    q2.createChoice('A warm front is approaching', false),
    q2.createChoice('A hurricane is forming', false),
    q2.createChoice('No front activity', false)
  ]);
  q2.setPoints(4);
  q2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Right! South winds bring warm air. When winds shift to NW, cold air has replaced warm air = cold front passage.')
      .build()
  );
  q2.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('South = warm air source. Northwest = cold air source. When wind shifts from S to NW, cold air has replaced warm = cold front passed.')
      .build()
  );

  // Q3: Multi-day pattern analysis (4 pts auto)
  form.addTextItem()
    .setTitle('Reference this 3-day pressure trend:')
    .setHelpText(
      'Day 1: 30.2" → Day 2: 30.0" → Day 3: 29.7"\n' +
      '(Pressure measured at noon each day)'
    );

  const q3 = form.addMultipleChoiceItem()
    .setTitle('Based on the 3-day pressure trend above, what is the BEST prediction for Day 4?')
    .setRequired(true);

  q3.setChoices([
    q3.createChoice('Continued stormy conditions as low pressure arrives', true),
    q3.createChoice('Hot, dry weather', false),
    q3.createChoice('Pressure will suddenly rise to 31.0"', false),
    q3.createChoice('No precipitation is possible', false)
  ]);
  q3.setPoints(4);
  q3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Steady pressure drop over multiple days indicates an approaching low pressure system. Expect clouds and precipitation.')
      .build()
  );
  q3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('The pattern shows steadily falling pressure (30.2 → 30.0 → 29.7). This trend points toward approaching low pressure and likely precipitation.')
      .build()
  );

  // Q4: Historical pattern value (3 pts auto)
  const q4 = form.addMultipleChoiceItem()
    .setTitle('Meteorologists compare current conditions to similar situations in the past. Why is this useful?')
    .setRequired(true);

  q4.setChoices([
    q4.createChoice('Similar atmospheric conditions tend to produce similar weather outcomes', true),
    q4.createChoice('Old weather patterns repeat exactly every year', false),
    q4.createChoice('It helps them predict weather 100 years in the future', false),
    q4.createChoice('Historical data is required by law', false)
  ]);
  q4.setPoints(3);
  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! While no two weather events are identical, similar conditions often lead to similar results. History is a useful guide.')
      .build()
  );
  q4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Patterns in science repeat! When conditions match past scenarios, meteorologists can predict likely outcomes based on what happened before.')
      .build()
  );

  // Q5: Pattern application (5 pts, open response)
  const q5 = form.addParagraphTextItem()
    .setTitle('ANALYZE: Here is 6 hours of data:\n\nNoon: Temp 52°F, Pressure 30.1", Wind S 8 mph, Clouds: few\n3 PM: Temp 58°F, Pressure 29.9", Wind SW 12 mph, Clouds: increasing\n6 PM: Temp 55°F, Pressure 29.7", Wind W 18 mph, Clouds: overcast\n\nIdentify at least THREE patterns in this data and predict what weather will occur by midnight.')
    .setHelpText('Look for trends in each variable. What do all trends together suggest? (5 points)')
    .setRequired(true);

  q5.setValidation(
    FormApp.createParagraphTextValidation()
      .requireTextLengthGreaterThanOrEqualTo(80)
      .build()
  );

  Logger.log('Station 2 form created: ' + form.getEditUrl());
  return form;
}

// ============================================================================
// STATION 3 - BUILD YOUR OWN FORECAST (25 points, ~20 min)
// Students create and justify a weather forecast
// ============================================================================

function createG7C5W2Station3_() {
  const form = FormApp.create('G7.C5.W2: Station 3 - Build Your Own Forecast');

  form.setDescription(
    'STATION 3: BUILD YOUR OWN FORECAST\n\n' +
    'Now you\'ll create a forecast like a real meteorologist!\n\n' +
    'SCENARIO: It\'s 6 PM on February 5, 2026 in Chicago.\n\n' +
    'CURRENT CONDITIONS:\n' +
    '• Temperature: 38°F\n' +
    '• Barometric Pressure: 29.6" (down from 30.1" this morning)\n' +
    '• Humidity: 88%\n' +
    '• Wind: NE at 20 mph, gusting to 30 mph\n' +
    '• Dew Point: 35°F\n' +
    '• Visibility: 3 miles (haze)\n\n' +
    'RADAR: Band of precipitation 100 miles west, moving east at 25 mph\n\n' +
    'SATELLITE: Large low pressure system centered over Iowa\n\n' +
    'Your task: Create a forecast for Chicago for the next 24 hours.\n\n' +
    '---\n' +
    'Time: About 20 minutes | Points: 25'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Station 3 complete! You\'ve created a professional-style forecast.\n\n' +
    'Next: Exit Ticket to wrap up your weather prediction learning!'
  );

  // Q1: When will precipitation arrive? (4 pts auto)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('The precipitation band is 100 miles west, moving east at 25 mph. When will it reach Chicago?')
    .setHelpText('Distance ÷ Speed = Time')
    .setRequired(true);

  q1.setChoices([
    q1.createChoice('About 4 hours (around 10 PM)', true),
    q1.createChoice('About 1 hour (around 7 PM)', false),
    q1.createChoice('About 10 hours (around 4 AM)', false),
    q1.createChoice('Never - it will miss Chicago', false)
  ]);
  q1.setPoints(4);
  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! 100 miles ÷ 25 mph = 4 hours. Precipitation should arrive around 10 PM.')
      .build()
  );
  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Use the formula: Time = Distance ÷ Speed. 100 miles ÷ 25 mph = 4 hours.')
      .build()
  );

  // Q2: Type of precipitation (4 pts auto)
  const q2 = form.addMultipleChoiceItem()
    .setTitle('Given that the temperature is 38°F and dew point is 35°F, what type of precipitation is most likely?')
    .setHelpText('Dew point near temperature = near saturation. Temperature determines rain vs. snow.')
    .setRequired(true);

  q2.setChoices([
    q2.createChoice('Rain, possibly changing to snow if temperatures drop', true),
    q2.createChoice('Only snow - it\'s cold enough', false),
    q2.createChoice('No precipitation - humidity is too low', false),
    q2.createChoice('Sleet only', false)
  ]);
  q2.setPoints(4);
  q2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Right! 38°F is above freezing so rain is likely. But if the temperature drops a few degrees (which is likely with the front), snow could follow.')
      .build()
  );
  q2.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('At 38°F, precipitation falls as rain (above 32°F freezing point). But with a low approaching and cold air behind it, temperatures may drop to cause snow later.')
      .build()
  );

  // Q3: Pressure trend meaning (3 pts auto)
  const q3 = form.addMultipleChoiceItem()
    .setTitle('Pressure dropped from 30.1" to 29.6" in 12 hours. This trend indicates:')
    .setRequired(true);

  q3.setChoices([
    q3.createChoice('A significant storm system is approaching and intensifying', true),
    q3.createChoice('Weather is improving', false),
    q3.createChoice('No significant change expected', false),
    q3.createChoice('The barometer is broken', false)
  ]);
  q3.setPoints(3);
  q3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! 0.5" drop in 12 hours is a significant decline, indicating an intensifying low pressure system.')
      .build()
  );
  q3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('A half-inch pressure drop in 12 hours is substantial. This means a strong low is developing - expect significant weather.')
      .build()
  );

  // Q4: Wind forecast (4 pts auto)
  const q4 = form.addMultipleChoiceItem()
    .setTitle('With current winds at 20 mph gusting to 30, and a strengthening low pressure system, what should the forecast say about tonight\'s winds?')
    .setRequired(true);

  q4.setChoices([
    q4.createChoice('Winds increasing overnight, possibly reaching 35-40 mph gusts', true),
    q4.createChoice('Winds will die down to calm', false),
    q4.createChoice('Winds will shift to the south and decrease', false),
    q4.createChoice('Wind speed cannot be predicted', false)
  ]);
  q4.setPoints(4);
  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! As the low intensifies and approaches, pressure gradients increase, driving stronger winds.')
      .build()
  );
  q4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Strengthening low pressure = tighter isobars = stronger winds. Current 20-30 mph winds will likely increase.')
      .build()
  );

  // Q5: Confidence level (3 pts auto)
  const q5 = form.addMultipleChoiceItem()
    .setTitle('How confident would a meteorologist be in a 4-hour forecast versus a 7-day forecast?')
    .setRequired(true);

  q5.setChoices([
    q5.createChoice('Much more confident in 4-hour; short-term forecasts are more accurate', true),
    q5.createChoice('Much more confident in 7-day; more data is available', false),
    q5.createChoice('Exactly the same confidence for both', false),
    q5.createChoice('Less confident in 4-hour because there\'s less time to prepare', false)
  ]);
  q5.setPoints(3);
  q5.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Right! Short-term forecasts are much more accurate. Accuracy decreases as you look further into the future.')
      .build()
  );
  q5.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Weather is easier to predict a few hours ahead than a week ahead. Small errors compound over time.')
      .build()
  );

  // Q6: Complete forecast (7 pts, open response)
  const q6 = form.addParagraphTextItem()
    .setTitle('FORECAST: Write a complete 24-hour forecast for Chicago based on all the data provided. Include:\n• Tonight\'s weather (6 PM - midnight)\n• Overnight conditions (midnight - 6 AM)\n• Tomorrow\'s weather (6 AM - 6 PM)\n• Expected high and low temperatures\n• Precipitation type and amounts if applicable\n• Wind conditions')
    .setHelpText('Write like a meteorologist! Be specific and cite the data patterns that support your predictions. (7 points)')
    .setRequired(true);

  q6.setValidation(
    FormApp.createParagraphTextValidation()
      .requireTextLengthGreaterThanOrEqualTo(150)
      .build()
  );

  Logger.log('Station 3 form created: ' + form.getEditUrl());
  return form;
}

// ============================================================================
// EXIT TICKET - PREDICTION SYNTHESIS (23 points, ~15 min)
// Bringing together all Week 2 concepts + spiral review
// ============================================================================

function createG7C5W2ExitTicket_() {
  const form = FormApp.create('G7.C5.W2: Exit Ticket - Prediction Synthesis');

  form.setDescription(
    'EXIT TICKET: PREDICTION SYNTHESIS\n\n' +
    'Show what you\'ve learned about weather data and prediction!\n\n' +
    'This ticket includes:\n' +
    '• 2 questions on Week 2 content (data collection, patterns, forecasting)\n' +
    '• 2 SPIRAL questions (Week 1 + Cycles 3-4)\n' +
    '• 1 INTEGRATION question connecting multiple concepts\n' +
    '• 1 SEP question (Science & Engineering Practices)\n\n' +
    '---\n' +
    'Time: About 15 minutes | Points: 23'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Week 2 Exit Ticket complete!\n\n' +
    'Excellent work learning to analyze weather data!\n' +
    'Next week: Synthesis assessment combining all your weather knowledge!'
  );

  // --- WEEK 2 CONTENT ---
  form.addPageBreakItem()
    .setTitle('Part 1: Today\'s Learning')
    .setHelpText('Questions about weather data and prediction.');

  // Q1: Data interpretation (4 pts auto)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('A forecaster notices: falling pressure, rising humidity, increasing cloud cover, and winds shifting from south to west. This data pattern most likely indicates:')
    .setRequired(true);

  q1.setChoices([
    q1.createChoice('An approaching cold front with precipitation', true),
    q1.createChoice('A high pressure system bringing clear skies', false),
    q1.createChoice('Stable, unchanging weather', false),
    q1.createChoice('Drought conditions developing', false)
  ]);
  q1.setPoints(4);
  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! All these signs point to an approaching front: falling pressure = low coming, rising humidity = moisture increase, wind shift = front passage.')
      .build()
  );
  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Look at the pattern: falling pressure + rising humidity + wind shift = classic signs of an approaching front.')
      .build()
  );

  // Q2: Forecast accuracy (4 pts auto)
  const q2 = form.addMultipleChoiceItem()
    .setTitle('Why are weather forecasts less accurate for Day 7 than for Day 1?')
    .setRequired(true);

  q2.setChoices([
    q2.createChoice('Small measurement errors and uncertainties compound over time', true),
    q2.createChoice('Meteorologists pay less attention to long-range forecasts', false),
    q2.createChoice('Weather patterns are completely random after 2 days', false),
    q2.createChoice('Satellites only work for 24 hours at a time', false)
  ]);
  q2.setPoints(4);
  q2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! The atmosphere is a chaotic system. Small errors grow larger over time, making long-range forecasts less reliable.')
      .build()
  );
  q2.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Weather is sensitive to initial conditions. Tiny measurement errors multiply as time goes on, reducing forecast accuracy.')
      .build()
  );

  // --- SPIRAL ---
  form.addPageBreakItem()
    .setTitle('Part 2: Spiral Review')
    .setHelpText('Connecting to Week 1 and previous cycles.');

  // Q3: Spiral - Week 1 air masses (3 pts auto)
  const q3 = form.addMultipleChoiceItem()
    .setTitle('SPIRAL (Week 1): Before making a forecast, a meteorologist identifies a cP air mass over Canada and an mT air mass over the Gulf. This information is important because:')
    .setRequired(true);

  q3.setChoices([
    q3.createChoice('It helps predict the type and intensity of weather when these air masses interact', true),
    q3.createChoice('Air masses have no effect on weather forecasts', false),
    q3.createChoice('It only matters for Canadian weather, not US weather', false),
    q3.createChoice('Air mass identification is outdated science', false)
  ]);
  q3.setPoints(3);
  q3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Knowing the air masses helps predict what happens when they meet - cold + warm + humid = potential for significant weather!')
      .build()
  );
  q3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Week 1 key concept: Air mass properties (temperature, humidity) determine what weather occurs when they collide.')
      .build()
  );

  // Q4: Spiral - Cycle 3-4 (3 pts auto)
  const q4 = form.addMultipleChoiceItem()
    .setTitle('SPIRAL (Cycles 3-4): Climate scientists predict that a warming planet will affect weather patterns. How might this relate to weather forecasting?')
    .setRequired(true);

  q4.setChoices([
    q4.createChoice('Warmer oceans add more moisture to air masses, potentially making storms stronger', true),
    q4.createChoice('Climate change has no connection to daily weather', false),
    q4.createChoice('Warmer temperatures make all storms weaker', false),
    q4.createChoice('Weather forecasting will become impossible due to climate change', false)
  ]);
  q4.setPoints(3);
  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Great connection! Warmer oceans = more evaporation = more moisture for air masses = potential for stronger precipitation events.')
      .build()
  );
  q4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Climate affects weather over time. Warmer oceans add more water vapor to the atmosphere, affecting storm intensity.')
      .build()
  );

  // --- INTEGRATION ---
  form.addPageBreakItem()
    .setTitle('Part 3: Integration')
    .setHelpText('Connecting multiple concepts.');

  // Q5: Integration (4 pts, open response)
  const q5 = form.addParagraphTextItem()
    .setTitle('INTEGRATE: Explain how these three things work together to create a weather forecast: (1) Data collection tools, (2) Pattern recognition, (3) Knowledge of air masses and fronts. Give a specific example.')
    .setHelpText('Show how each element contributes to accurate predictions. (4 points)')
    .setRequired(true);

  q5.setValidation(
    FormApp.createParagraphTextValidation()
      .requireTextLengthGreaterThanOrEqualTo(80)
      .build()
  );

  // --- SEP ---
  form.addPageBreakItem()
    .setTitle('Part 4: Science Practice')
    .setHelpText('Applying science and engineering practices.');

  // Q6: SEP - Analyzing data (5 pts, open response)
  const q6 = form.addParagraphTextItem()
    .setTitle('SEP - ANALYZING DATA: A student makes this claim: "Since the barometer reading went up today, it will definitely be sunny tomorrow."\n\nEvaluate this claim. Is it scientifically valid? What additional data would strengthen or weaken the prediction? Explain using what you learned about weather data and patterns.')
    .setHelpText('Critique the reasoning and suggest improvements. (5 points)')
    .setRequired(true);

  q6.setValidation(
    FormApp.createParagraphTextValidation()
      .requireTextLengthGreaterThanOrEqualTo(100)
      .build()
  );

  Logger.log('Exit Ticket form created: ' + form.getEditUrl());
  return form;
}
