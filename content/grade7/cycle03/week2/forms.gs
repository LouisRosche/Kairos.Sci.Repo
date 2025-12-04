/**
 * ============================================================================
 * GRADE 7 - CYCLE 3 WEEK 2: FEEDBACK LOOPS & TIPPING POINTS
 * 5 Forms | 100 Points Total | ~75 Minutes
 * ============================================================================
 *
 * NGSS ALIGNMENT:
 *   Primary: MS-ESS3-5 - Ask questions to clarify evidence of factors
 *            causing rise in global temperatures over past century
 *   Spiral:  MS-PS1-5 - Atoms conserved in reactions (Week 1 + Cycle 2)
 *            MS-PS1-6 - Chemical reactions release or absorb thermal energy
 *
 * 3-DIMENSIONAL LEARNING:
 *   SEP-2: Developing Models - Model positive feedback loops
 *   DCI ESS3.D: Human Impacts - Understand how feedback amplifies change
 *   CCC Stability & Change: Identify when systems shift to new equilibria
 *
 * LEARNING TARGETS:
 *   1. Explain how albedo affects Earth's energy balance
 *   2. Model a positive feedback loop using ice-albedo as example
 *   3. Analyze carbon sink data and predict consequences of saturation
 *   4. Design a carbon capture system using scientific principles
 *
 * SPIRAL FROM WEEK 1:
 *   - CO2 molecular absorption (Station 1 Q4)
 *   - Carbon cycle conservation (Station 2 Q3)
 *   - Greenhouse effect mechanism (Exit Q2)
 *
 * FORMS:
 *   1. Hook - The Melting Ice Mystery (12 pts, ~10 min)
 *   2. Station 1 - Albedo Effect Investigation (20 pts, ~18 min)
 *   3. Station 2 - Carbon Sink Analysis (20 pts, ~15 min)
 *   4. Station 3 - Engineering Carbon Capture (25 pts, ~20 min)
 *   5. Exit Ticket - Feedback Loop Integration (23 pts, ~15 min)
 *
 * ============================================================================
 * API CONSTRAINTS (Same as Week 1 - see forms.gs for details)
 * ============================================================================
 */

// ============================================================================
// MAIN FUNCTION
// ============================================================================

function createAllG7C3W2Forms() {
  Logger.log('================================================');
  Logger.log('G7 CYCLE 3 WEEK 2: FEEDBACK LOOPS & TIPPING POINTS');
  Logger.log('================================================\n');

  const forms = {
    hook: createG7W2Hook_(),
    station1: createG7W2Station1_(),
    station2: createG7W2Station2_(),
    station3: createG7W2Station3_(),
    exitTicket: createG7W2ExitTicket_()
  };

  Logger.log('\n================================================');
  Logger.log('ALL 5 FORMS CREATED - 100 POINTS TOTAL');
  Logger.log('================================================');

  return forms;
}

// ============================================================================
// HOOK - THE MELTING ICE MYSTERY (12 points, ~10 min)
// Phenomenon introduction + feedback loop preview
// ============================================================================

function createG7W2Hook_() {
  const form = FormApp.create('G7.C3.W2: Hook - The Melting Ice Mystery');

  form.setDescription(
    'THE MELTING ICE MYSTERY\n\n' +
    'Scientists have discovered something strange:\n' +
    '- When Arctic ice starts melting, it doesn\'t just melt at a steady rate\n' +
    '- Instead, melting SPEEDS UP over time\n' +
    '- The more ice that melts, the FASTER the remaining ice melts\n\n' +
    'This seems backwards! You would expect less ice = less to melt = slower melting.\n' +
    'But the opposite is happening. WHY?\n\n' +
    '---\n' +
    'Time: About 10 minutes | Points: 12\n' +
    'Connect to what you learned about the greenhouse effect in Week 1!'
  );

  // Quiz and response settings
  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Hook submitted! You\'re ready for Station 1.\n\n' +
    'Next: Investigate the albedo effect - why white surfaces stay cool.\n' +
    'Get ready to test different surfaces under a heat lamp!'
  );

  // --- MTSS: CYCLE 2 MISCONCEPTION CHECK (0 pts - diagnostic only) ---
  form.addPageBreakItem()
    .setTitle('Quick Review: Week 1 Check')
    .setHelpText('Let\'s make sure you remember key concepts from Week 1 and Cycle 2.');

  // MTSS FLAG: Bond energy misconception (60% frequency)
  const mtss1 = form.addMultipleChoiceItem()
    .setTitle('QUICK CHECK (Cycle 2 Review): When chemical bonds BREAK, what happens to energy?')
    .setHelpText('This is a review question - think carefully! This is one of the most common mistakes.')
    .setRequired(true);

  mtss1.setChoices([
    mtss1.createChoice('Breaking bonds RELEASES energy', false),  // FLAG: bond-break-release misconception
    mtss1.createChoice('Breaking bonds REQUIRES (uses up) energy', true),
    mtss1.createChoice('Breaking bonds has no effect on energy', false),
    mtss1.createChoice('It depends on the type of bond', false)
  ]);
  mtss1.setPoints(0);  // Diagnostic only - doesn't affect grade
  mtss1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('✓ CORRECT! Breaking bonds REQUIRES energy. Forming bonds RELEASES energy. You remembered this from Cycle 2!')
      .build()
  );
  mtss1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('⚠️ COMMON MISTAKE! Breaking bonds requires energy (you have to PUT energy IN to break them). ' +
               'Forming bonds releases energy. This is important for understanding how molecules absorb heat!')
      .build()
  );

  // --- PART 1: OBSERVATIONS ---
  form.addPageBreakItem()
    .setTitle('Part 1: What You Notice')
    .setHelpText('Look at the phenomenon carefully before making predictions.');

  // Q1: Color observation (3 pts auto)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('Look at these two surfaces in sunlight: white snow vs. dark ocean water. Which one would feel hotter if you touched it?')
    .setHelpText('Think about your experience with different colored surfaces in the sun.')
    .setRequired(true);

  q1.setChoices([
    q1.createChoice('White snow would feel hotter', false),
    q1.createChoice('Dark ocean water would feel hotter', true),
    q1.createChoice('They would feel the same temperature', false),
    q1.createChoice('Cannot predict without measuring', false)
  ]);
  q1.setPoints(3);
  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Dark surfaces absorb more light energy, so they get hotter. White/light surfaces reflect more light away.')
      .build()
  );
  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Think about wearing a black shirt vs. a white shirt on a sunny day. Which makes you hotter?')
      .build()
  );

  // Q2: Prediction (3 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 2 (3 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '3: Connects color to absorption/reflection with temperature consequence\n' +
      '2: Mentions color difference with partial explanation\n' +
      '1: Vague response\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('When ice melts, it exposes dark ocean water underneath. How might this affect the temperature of the area?')
    .setHelpText('Think about what happens to sunlight when it hits white ice vs. dark water.')
    .setRequired(true);

  // --- PART 2: FEEDBACK CONCEPT ---
  form.addPageBreakItem()
    .setTitle('Part 2: The Feedback Loop')
    .setHelpText('A feedback loop is when the OUTPUT of a process becomes a new INPUT that affects the process.');

  // Q3: Feedback identification (3 pts auto)
  const q3 = form.addMultipleChoiceItem()
    .setTitle('Ice melts → Dark water exposed → More heat absorbed → Temperature rises → More ice melts\n\nThis is called a:')
    .setRequired(true);

  q3.setChoices([
    q3.createChoice('Positive feedback loop - change amplifies itself', true),
    q3.createChoice('Negative feedback loop - change reduces itself', false),
    q3.createChoice('No feedback - just a one-time change', false),
    q3.createChoice('Random variation with no pattern', false)
  ]);
  q3.setPoints(3);
  q3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! This is a POSITIVE feedback loop - the change (melting) causes MORE of the same change. "Positive" doesn\'t mean good - it means amplifying!')
      .build()
  );
  q3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('When melting causes more melting (same direction), that\'s positive feedback. It amplifies the original change.')
      .build()
  );

  // Q4: Week 1 connection (3 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 4 (3 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '3: Correctly connects to CO2/greenhouse effect from Week 1\n' +
      '2: Mentions Week 1 concepts but unclear connection\n' +
      '1: Vague connection\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('WEEK 1 CONNECTION: How does the greenhouse effect (CO2 trapping heat) connect to this ice-melting feedback loop?')
    .setHelpText('Think: What starts the melting? How does CO2 fit into this cycle?')
    .setRequired(true);

  // Q5: Confidence (0 pts - diagnostic)
  form.addScaleItem()
    .setTitle('Self-Assessment: How well do you understand feedback loops right now?')
    .setHelpText('FOR REFLECTION ONLY - Does NOT affect your grade. Be honest!')
    .setBounds(1, 5)
    .setLabels('Still confused', 'I get it!')
    .setRequired(true);

  logFormInfo_(form, 'G7 W2 Hook', 12);
  return form;
}

// ============================================================================
// STATION 1 - ALBEDO EFFECT INVESTIGATION (20 points, ~18 min)
// Hands-on testing + data analysis
// ============================================================================

function createG7W2Station1_() {
  const form = FormApp.create('G7.C3.W2: Station 1 - Albedo Effect Investigation');

  form.setDescription(
    'YOUR MISSION: INVESTIGATE THE ALBEDO EFFECT\n\n' +
    'ALBEDO = the fraction of light that a surface REFLECTS (0 = absorbs all, 1 = reflects all)\n\n' +
    'You will test different surfaces under a heat lamp to discover:\n' +
    '- Why ice-covered areas stay cool\n' +
    '- Why dark ocean water heats up\n' +
    '- How this creates a feedback loop\n\n' +
    '---\n' +
    'Time: About 18 minutes | Points: 20\n\n' +
    'MATERIALS: Heat lamp, thermometers, white paper, black paper, aluminum foil, water'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Station 1 complete!\n\n' +
    'KEY INSIGHT: High albedo (white/reflective) = stays cool, Low albedo (dark) = heats up.\n' +
    'This is why melting ice creates a feedback loop!\n\n' +
    'Continue to Station 2: Carbon Sink Analysis'
  );

  // --- DATA COLLECTION ---
  form.addPageBreakItem()
    .setTitle('Step 1: Collect Data')
    .setHelpText(
      'PROCEDURE:\n' +
      '1. Place thermometer under each surface\n' +
      '2. Turn on heat lamp for 3 minutes\n' +
      '3. Record final temperature\n' +
      '4. Calculate temperature change (final - starting)'
    );

  // Q1: Data recording (5 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 1: Record Your Data (5 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '5: All 4 surfaces with clear starting temp, ending temp, and change\n' +
      '4: All 4 surfaces but missing one measurement\n' +
      '3: 3 surfaces complete\n' +
      '2: 2 surfaces complete\n' +
      '1: Incomplete data\n' +
      '0: No data'
    );

  form.addParagraphTextItem()
    .setTitle(
      'Record your temperature data for each surface after 3 minutes under the heat lamp.\n\n' +
      'Format: Surface | Start Temp | End Temp | Change\n' +
      'Example: Black paper | 22°C | 35°C | +13°C'
    )
    .setHelpText('Test: white paper, black paper, aluminum foil, and water (if available)')
    .setRequired(true);

  // Q2: Rank surfaces (4 pts auto)
  const q2 = form.addMultipleChoiceItem()
    .setTitle('Based on your data, rank the surfaces from HIGHEST temperature change to LOWEST:')
    .setRequired(true);

  q2.setChoices([
    q2.createChoice('Black paper > White paper > Aluminum foil', false),
    q2.createChoice('Black paper > Aluminum foil > White paper', false),
    q2.createChoice('White paper > Black paper > Aluminum foil', false),
    q2.createChoice('Black paper > Water > White paper > Aluminum foil', true)
  ]);
  q2.setPoints(4);
  q2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Black absorbs most (heats fastest), aluminum reflects most (heats slowest). White is in between.')
      .build()
  );
  q2.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Check your data: dark colors should heat most, reflective surfaces (foil) should heat least.')
      .build()
  );

  // --- ANALYSIS ---
  form.addPageBreakItem()
    .setTitle('Step 2: Analyze the Pattern')
    .setHelpText('Connect your data to the albedo concept.');

  // Q3: Albedo explanation (5 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 3: Explain the Pattern (5 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '5: Explains that dark surfaces absorb more light energy → more heating + light surfaces reflect → less heating\n' +
      '4: Correct explanation but missing one element\n' +
      '3: Partially correct\n' +
      '2: Vague explanation\n' +
      '1: Incorrect\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Using the concept of ALBEDO, explain WHY some surfaces heated more than others.')
    .setHelpText(
      'Remember: Albedo = fraction reflected.\n' +
      'High albedo (like snow) = reflects most light\n' +
      'Low albedo (like ocean) = absorbs most light\n\n' +
      '--- SENTENCE STARTERS (choose one to begin your answer) ---\n' +
      '• "Black paper heated the most because its albedo is low, which means it..."\n' +
      '• "Surfaces with high albedo, like aluminum foil, stayed cool because..."\n' +
      '• "My data shows that [surface] had a [small/large] temperature change because its albedo..."\n\n' +
      'WORD BANK: reflects, absorbs, albedo, light energy, temperature, molecules, vibrate'
    )
    .setRequired(true);

  // Q4: Week 1 spiral - molecular connection (3 pts auto)
  form.addSectionHeaderItem().setTitle('Question 4: SPIRAL - Week 1 Connection');

  const q4 = form.addMultipleChoiceItem()
    .setTitle('WEEK 1 REVIEW: When a dark surface absorbs light energy, what happens to the molecules in that surface?')
    .setHelpText('Remember what you learned about molecular vibration in Week 1!')
    .setRequired(true);

  q4.setChoices([
    q4.createChoice('Molecules vibrate faster (temperature increases)', true),
    q4.createChoice('Molecules break apart into atoms', false),
    q4.createChoice('Molecules slow down', false),
    q4.createChoice('Nothing happens to the molecules', false)
  ]);
  q4.setPoints(3);
  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Absorbed light energy makes molecules vibrate faster. Faster vibration = higher temperature. Same concept from Week 1!')
      .build()
  );
  q4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Remember Week 1: energy absorption makes molecules move/vibrate faster. That IS temperature!')
      .build()
  );

  // Q5: Feedback loop application (3 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 5: Apply to Ice-Albedo Feedback (3 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '3: Correctly traces full feedback loop with albedo change\n' +
      '2: Partial feedback loop\n' +
      '1: Missing feedback concept\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle(
      'Use your albedo data to explain the ice-albedo feedback loop:\n\n' +
      'Start: Ice (high albedo) → Ice melts → Ocean exposed (low albedo) → ???\n\n' +
      'Complete the chain and explain how this creates a feedback loop.'
    )
    .setHelpText(
      '--- SENTENCE STARTERS ---\n' +
      '• "When ice melts, it exposes dark ocean water. Ocean water has low albedo, so it..."\n' +
      '• "This creates a positive feedback loop because more heat causes more _____, which causes more..."\n' +
      '• "My albedo data supports this because [dark surface] absorbed ___ more degrees than [light surface]..."\n\n' +
      'COMPLETE THE CHAIN:\n' +
      'Ice melts → Ocean exposed → Ocean absorbs more heat → Temperature rises → More ice melts → MORE ocean exposed → ...'
    )
    .setRequired(true);

  logFormInfo_(form, 'G7 W2 Station 1', 20);
  return form;
}

// ============================================================================
// STATION 2 - CARBON SINK ANALYSIS (20 points, ~15 min)
// Data analysis + system thinking
// ============================================================================

function createG7W2Station2_() {
  const form = FormApp.create('G7.C3.W2: Station 2 - Carbon Sink Analysis');

  form.setDescription(
    'YOUR MISSION: ANALYZE EARTH\'S CARBON SINKS\n\n' +
    'A CARBON SINK is a reservoir that absorbs more carbon than it releases.\n' +
    'Earth\'s main carbon sinks are:\n' +
    '- Oceans (absorb CO2 from atmosphere)\n' +
    '- Forests (absorb CO2 through photosynthesis)\n' +
    '- Soil (stores carbon in organic matter)\n\n' +
    'But here\'s the problem: Carbon sinks can become SOURCES if they get overwhelmed.\n' +
    'What happens when a sink reaches its limit?\n\n' +
    '---\n' +
    'Time: About 15 minutes | Points: 20\n' +
    'You will need a calculator!'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Station 2 complete!\n\n' +
    'KEY INSIGHT: Carbon sinks can saturate - when they do, CO2 accumulates faster.\n' +
    'This is another positive feedback: more CO2 → warmer oceans → less absorption → more CO2.\n\n' +
    'Continue to Station 3: Engineering Carbon Capture'
  );

  // --- DATA ANALYSIS ---
  form.addPageBreakItem()
    .setTitle('Carbon Sink Data')
    .setHelpText(
      'GLOBAL CARBON BUDGET (approximate, in gigatons CO2 per year):\n\n' +
      'SOURCES:\n' +
      '- Fossil fuels: +36 Gt/year\n' +
      '- Deforestation: +5 Gt/year\n' +
      'TOTAL EMITTED: 41 Gt/year\n\n' +
      'SINKS:\n' +
      '- Ocean absorption: -10 Gt/year\n' +
      '- Land/forest absorption: -12 Gt/year\n' +
      'TOTAL ABSORBED: 22 Gt/year\n\n' +
      'REMAINING IN ATMOSPHERE: 41 - 22 = 19 Gt/year'
    );

  // Q1: Carbon budget calculation (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 1: Calculate the Imbalance (4 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '4: Correct calculation (19 Gt) with work shown AND interpretation\n' +
      '3: Correct answer with work\n' +
      '2: Correct setup but calculation error\n' +
      '1: Attempted but incorrect\n' +
      '0: No response\n\n' +
      'ANSWER: 41 - 22 = 19 Gt/year remains in atmosphere'
    );

  form.addParagraphTextItem()
    .setTitle(
      'Using the data above:\n' +
      '1. Calculate: How many gigatons of CO2 remain in the atmosphere each year?\n' +
      '2. Explain: What does this number mean for atmospheric CO2 levels over time?\n\n' +
      'SHOW YOUR WORK!'
    )
    .setRequired(true);

  // Q2: Sink saturation (4 pts auto)
  const q2 = form.addMultipleChoiceItem()
    .setTitle('If the ocean becomes warmer, it absorbs LESS CO2 (warm water holds less gas). What would happen to atmospheric CO2?')
    .setRequired(true);

  q2.setChoices([
    q2.createChoice('Atmospheric CO2 would decrease', false),
    q2.createChoice('Atmospheric CO2 would increase faster', true),
    q2.createChoice('Atmospheric CO2 would stay the same', false),
    q2.createChoice('Ocean temperature doesn\'t affect CO2 absorption', false)
  ]);
  q2.setPoints(4);
  q2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Warmer ocean = weaker sink = more CO2 stays in atmosphere. This is another positive feedback loop!')
      .build()
  );
  q2.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('If the ocean absorbs LESS CO2, where does that extra CO2 go? It stays in the atmosphere!')
      .build()
  );

  // Q3: Week 1 spiral - conservation (4 pts auto)
  form.addSectionHeaderItem().setTitle('Question 3: SPIRAL - Week 1 & Cycle 2');

  const q3 = form.addMultipleChoiceItem()
    .setTitle('REVIEW: When trees absorb CO2 and convert it to wood, what happens to the carbon atoms?')
    .setHelpText('Remember conservation of mass from Week 1 and Cycle 2!')
    .setRequired(true);

  q3.setChoices([
    q3.createChoice('Carbon atoms are destroyed', false),
    q3.createChoice('Carbon atoms are created', false),
    q3.createChoice('Carbon atoms are rearranged into new molecules (glucose, cellulose)', true),
    q3.createChoice('Carbon atoms disappear', false)
  ]);
  q3.setPoints(4);
  q3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Conservation of mass: carbon atoms are REARRANGED from CO2 into glucose/cellulose. Never created or destroyed!')
      .build()
  );
  q3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Remember Week 1: atoms cannot be created or destroyed. The carbon in CO2 becomes carbon in wood molecules.')
      .build()
  );

  // Q4: Feedback identification (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 4: Identify the Feedback (4 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '4: Correctly identifies positive feedback with complete chain\n' +
      '3: Identifies positive feedback with partial chain\n' +
      '2: Identifies feedback but wrong type\n' +
      '1: No feedback concept\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle(
      'Complete this feedback chain and identify if it\'s positive or negative:\n\n' +
      'More CO2 → Warmer climate → Ocean absorbs LESS CO2 → ??? → ???\n\n' +
      'Is this positive feedback (amplifying) or negative feedback (stabilizing)? Explain.'
    )
    .setRequired(true);

  // Q5: System prediction (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 5: Predict the Outcome (4 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '4: Predicts acceleration with correct reasoning from feedback\n' +
      '3: Correct prediction with partial reasoning\n' +
      '2: Prediction without feedback reasoning\n' +
      '1: Incorrect prediction\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle(
      'Based on what you learned about feedback loops:\n\n' +
      'Will climate change happen at a CONSTANT rate, or will it ACCELERATE over time?\n' +
      'Explain using at least ONE feedback loop from this week.'
    )
    .setRequired(true);

  logFormInfo_(form, 'G7 W2 Station 2', 20);
  return form;
}

// ============================================================================
// STATION 3 - ENGINEERING CARBON CAPTURE (25 points, ~20 min)
// Design challenge + scientific justification
// ============================================================================

function createG7W2Station3_() {
  const form = FormApp.create('G7.C3.W2: Station 3 - Engineering Carbon Capture');

  form.setDescription(
    'ENGINEERING CHALLENGE: DESIGN A CARBON CAPTURE SYSTEM\n\n' +
    'Scientists are developing ways to remove CO2 from the atmosphere.\n' +
    'Your challenge: Design a system that could capture carbon at your school!\n\n' +
    '---\n' +
    'Time: About 20 minutes | Points: 25 (highest value!)\n\n' +
    'CONSTRAINTS:\n' +
    '- Must work at school scale (not industrial)\n' +
    '- Must be sustainable (low energy input)\n' +
    '- Must store carbon for at least 10 years\n' +
    '- Budget: $500 maximum'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Station 3 complete!\n\n' +
    'Carbon capture approaches:\n' +
    '- Biological: Trees, algae, soil enhancement\n' +
    '- Technological: Direct air capture, mineralization\n' +
    '- Behavioral: Reduce emissions at source\n\n' +
    'Continue to Exit Ticket'
  );

  // --- OPTIONS REFERENCE ---
  form.addPageBreakItem()
    .setTitle('Carbon Capture Options')
    .setHelpText(
      'BIOLOGICAL APPROACHES:\n' +
      '1. Tree planting - 1 tree absorbs ~48 lbs CO2/year, costs ~$10-50\n' +
      '2. Algae cultivation - Absorbs CO2 10x faster than trees, needs equipment\n' +
      '3. Soil enhancement - Adding biochar stores carbon underground\n\n' +
      'TECHNOLOGICAL APPROACHES:\n' +
      '4. Direct air capture - Machines filter CO2 from air, high energy cost\n' +
      '5. Mineralization - Convert CO2 to rock (permanent), slow process\n\n' +
      'BEHAVIORAL APPROACHES:\n' +
      '6. Solar panels - Reduce fossil fuel use, prevents new emissions\n' +
      '7. Composting - Keeps carbon in soil instead of landfill methane'
    );

  // Q1: Design description (5 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 1: Describe Your Design (5 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '5: Specific design with clear components and location\n' +
      '4: Clear design with minor gaps\n' +
      '3: General design concept\n' +
      '2: Vague description\n' +
      '1: Minimal attempt\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle(
      'Describe your carbon capture system for our school.\n\n' +
      'Include:\n' +
      '- What approach(es) you will use\n' +
      '- Where it will be located\n' +
      '- What materials/equipment you need'
    )
    .setRequired(true);

  // Q2: Carbon calculation (5 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 2: Calculate Your Impact (5 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '5: Correct calculation with clear work and units\n' +
      '4: Correct answer with partial work shown\n' +
      '3: Setup correct but calculation error\n' +
      '2: Attempted calculation\n' +
      '1: No calculation attempted\n' +
      '0: No response\n\n' +
      'EXAMPLE: 10 trees × 48 lbs/tree = 480 lbs CO2/year'
    );

  form.addParagraphTextItem()
    .setTitle(
      'Estimate how much CO2 your system would capture per year.\n\n' +
      'REFERENCE: One tree ≈ 48 lbs CO2/year\n' +
      'Average American produces ≈ 36,000 lbs CO2/year\n\n' +
      'SHOW YOUR CALCULATION!'
    )
    .setRequired(true);

  // Q3: Scientific justification (8 pts manual) - highest value question
  form.addSectionHeaderItem()
    .setTitle('Question 3: Scientific Justification (8 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '8: Explains HOW carbon is captured at molecular level + WHERE it goes + HOW LONG stored\n' +
      '6: Explains 2 of 3 elements well\n' +
      '4: Explains 1 element well\n' +
      '2: General explanation without molecular detail\n' +
      '0: No response\n\n' +
      'KEY: Connect to photosynthesis equation and carbon cycle from Week 1!'
    );

  form.addParagraphTextItem()
    .setTitle(
      'Explain the SCIENCE behind your design:\n\n' +
      '1. HOW does your system capture CO2? (What happens to the molecules?)\n' +
      '2. WHERE does the carbon go after capture?\n' +
      '3. How LONG will the carbon stay stored?\n\n' +
      'Use scientific vocabulary from Weeks 1-2!'
    )
    .setHelpText(
      'Vocabulary to use: photosynthesis, absorb, glucose, cellulose, carbon sink, molecular'
    )
    .setRequired(true);

  // Q4: Limitations (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 4: Acknowledge Limitations (4 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '4: Identifies 2+ real limitations with thoughtful analysis\n' +
      '3: Identifies 2+ limitations\n' +
      '2: Identifies 1 limitation\n' +
      '1: Vague limitation\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle(
      'What are the LIMITATIONS of your design?\n\n' +
      'Consider:\n' +
      '- How much land/space is needed?\n' +
      '- What maintenance is required?\n' +
      '- Could it be overwhelmed by too much CO2?\n' +
      '- What happens if trees burn or die?'
    )
    .setRequired(true);

  // Q5: Feedback consideration (3 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 5: Feedback Connection (3 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '3: Correctly identifies how design relates to feedback loops\n' +
      '2: Partial connection\n' +
      '1: No feedback concept\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle(
      'How does your carbon capture system relate to the feedback loops we studied?\n\n' +
      'Could it help break a positive feedback loop? Or create a negative (stabilizing) feedback?'
    )
    .setRequired(true);

  logFormInfo_(form, 'G7 W2 Station 3', 25);
  return form;
}

// ============================================================================
// EXIT TICKET - FEEDBACK LOOP INTEGRATION (23 points, ~15 min)
// 2 NEW + 2 SPIRAL + 1 INTEGRATION + 1 SEP-2 (modeling)
// ============================================================================

function createG7W2ExitTicket_() {
  const form = FormApp.create('G7.C3.W2: Exit Ticket - Feedback Loop Integration');

  form.setDescription(
    'EXIT TICKET: SHOW WHAT YOU LEARNED\n\n' +
    'This tests whether you can explain feedback loops and connect Week 1 & 2 concepts.\n\n' +
    '---\n' +
    'Time: About 15 minutes | Points: 23\n\n' +
    'QUESTION TYPES:\n' +
    '- 2 NEW questions (Week 2 content)\n' +
    '- 2 SPIRAL questions (Week 1 review)\n' +
    '- 1 INTEGRATION question (connects both weeks)\n' +
    '- 1 SEP-2 question (create a model)'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'WEEK 2 COMPLETE! Great work!\n\n' +
    'Key takeaways:\n' +
    '- Albedo affects how much energy Earth absorbs\n' +
    '- Positive feedback loops can accelerate change\n' +
    '- Carbon sinks can become saturated\n' +
    '- Multiple feedback loops interact in climate systems\n\n' +
    'NEXT WEEK: Synthesis & Assessment - bringing it all together!'
  );

  // --- NEW CONTENT ---
  form.addPageBreakItem()
    .setTitle('NEW CONTENT (Questions 1 & 3)')
    .setHelpText('These test what you learned TODAY about feedback loops.');

  // Q1: NEW - Albedo explanation (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 1: NEW - Explain Albedo (4 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '4: Defines albedo correctly + gives ice/ocean example with temperature consequence\n' +
      '3: Correct definition with example\n' +
      '2: Partial definition\n' +
      '1: Vague response\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle(
      'Define ALBEDO and explain how it affects Earth\'s temperature.\n\n' +
      'Use ice and ocean as examples in your answer.'
    )
    .setRequired(true);

  // Q2: SPIRAL - Greenhouse effect (4 pts auto)
  form.addSectionHeaderItem().setTitle('Question 2: SPIRAL - Week 1');

  const q2 = form.addMultipleChoiceItem()
    .setTitle('WEEK 1 REVIEW: Why does CO2 trap heat in the atmosphere?')
    .setRequired(true);

  q2.setChoices([
    q2.createChoice('CO2 blocks visible light from entering', false),
    q2.createChoice('CO2 absorbs infrared radiation and re-emits it (vibrating molecules)', true),
    q2.createChoice('CO2 creates new heat energy', false),
    q2.createChoice('CO2 destroys cold energy', false)
  ]);
  q2.setPoints(4);
  q2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! CO2 molecules absorb IR and vibrate faster, then re-emit the energy. This is the greenhouse effect from Week 1!')
      .build()
  );
  q2.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Review Week 1: CO2 absorbs infrared radiation, vibrates, and re-emits energy. That\'s how it traps heat.')
      .build()
  );

  // Q3: NEW - Feedback type (4 pts auto)
  const q3 = form.addMultipleChoiceItem()
    .setTitle('Warmer temperatures → More evaporation → More water vapor (a greenhouse gas) → Even warmer temperatures\n\nThis is an example of:')
    .setRequired(true);

  q3.setChoices([
    q3.createChoice('Positive feedback - change amplifies itself', true),
    q3.createChoice('Negative feedback - change reduces itself', false),
    q3.createChoice('No feedback - one-time change', false),
    q3.createChoice('Random variation', false)
  ]);
  q3.setPoints(4);
  q3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Warming causes more warming - that\'s positive (amplifying) feedback. Water vapor is actually the most abundant greenhouse gas!')
      .build()
  );
  q3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('When change causes MORE of the same change (warming → more warming), that\'s positive feedback.')
      .build()
  );

  // Q4: SPIRAL - Conservation (4 pts auto)
  form.addSectionHeaderItem().setTitle('Question 4: SPIRAL - Week 1 & Cycle 2');

  const q4 = form.addMultipleChoiceItem()
    .setTitle('REVIEW: When a forest burns, what happens to the carbon that was stored in the trees?')
    .setRequired(true);

  q4.setChoices([
    q4.createChoice('The carbon is destroyed by the fire', false),
    q4.createChoice('The carbon is released as CO2 into the atmosphere', true),
    q4.createChoice('The carbon disappears', false),
    q4.createChoice('The carbon turns into new elements', false)
  ]);
  q4.setPoints(4);
  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Conservation of mass: the carbon atoms become CO2 gas. Same atoms, different location. Never destroyed!')
      .build()
  );
  q4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Remember: atoms cannot be destroyed. The carbon in wood combines with oxygen to form CO2 gas.')
      .build()
  );

  // Q5: INTEGRATION (4 pts manual)
  form.addPageBreakItem()
    .setTitle('INTEGRATION (Question 5)')
    .setHelpText('This requires knowledge from BOTH Week 1 AND Week 2.');

  form.addSectionHeaderItem()
    .setTitle('Question 5: INTEGRATION (4 points)')
    .setHelpText(
      '3D ASSESSMENT RUBRIC:\n' +
      '4: Connects greenhouse effect + ice-albedo feedback + carbon cycle correctly\n' +
      '3: Connects 2 of 3 concepts\n' +
      '2: Connects 1 concept to the scenario\n' +
      '1: No real integration\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle(
      'A climate scientist says: "Climate change is not just one problem - it\'s multiple feedback loops reinforcing each other."\n\n' +
      'Explain this statement using:\n' +
      '1. The greenhouse effect (CO2 trapping heat - Week 1)\n' +
      '2. The ice-albedo feedback (Week 2)\n' +
      '3. The carbon sink feedback (Week 2)\n\n' +
      'How do these three processes connect and amplify each other?'
    )
    .setRequired(true);

  // Q6: SEP-2 - Modeling (3 pts manual)
  form.addPageBreakItem()
    .setTitle('SEP-2: Developing Models (Question 6)')
    .setHelpText(
      'NGSS Practice: Developing and Using Models\n' +
      'Scientists use models to represent systems and predict behavior.'
    );

  form.addSectionHeaderItem()
    .setTitle('Question 6: Create a Feedback Model (3 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '3: Complete loop with arrows showing direction AND labels explaining each step\n' +
      '2: Loop with arrows OR labels (not both)\n' +
      '1: Incomplete loop\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle(
      'Draw a FEEDBACK LOOP MODEL in text format.\n\n' +
      'Create a loop for the ice-albedo feedback:\n' +
      'Use arrows (→) to show cause and effect\n' +
      'Label each step to explain what happens\n\n' +
      'EXAMPLE FORMAT:\n' +
      'Temperature rises → Ice melts → Dark ocean exposed → ???\n' +
      '↑________________________________↓'
    )
    .setHelpText('Make sure your model shows how the effect LOOPS BACK to amplify the original cause.')
    .setRequired(true);

  logFormInfo_(form, 'G7 W2 Exit Ticket', 23);
  return form;
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function logFormInfo_(form, name, points) {
  const editUrl = form.getEditUrl();
  const pubUrl = form.getPublishedUrl();
  const embedUrl = pubUrl.replace('/viewform', '/viewform?embedded=true');

  Logger.log('----------------------------------------');
  Logger.log(name + ' (' + points + ' pts)');
  Logger.log('----------------------------------------');
  Logger.log('Edit:  ' + editUrl);
  Logger.log('Embed: ' + embedUrl);
  Logger.log('');
}

// Individual test functions
function testG7W2Hook() { createG7W2Hook_(); }
function testG7W2Station1() { createG7W2Station1_(); }
function testG7W2Station2() { createG7W2Station2_(); }
function testG7W2Station3() { createG7W2Station3_(); }
function testG7W2ExitTicket() { createG7W2ExitTicket_(); }
