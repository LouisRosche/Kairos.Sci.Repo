/**
 * ============================================================================
 * GRADE 8 - CYCLE 5 WEEK 1: WAVE PROPERTIES & BEHAVIOR
 * 5 Forms | 100 Points Total | ~75 Minutes
 * ============================================================================
 *
 * NGSS ALIGNMENT:
 *   Primary: MS-PS4-2 - Develop and use a model to describe that waves are
 *            reflected, absorbed, or transmitted through various materials
 *            depending on the wave type and material.
 *   Spiral:  MS-LS2-3 - Energy flow in ecosystems (Cycle 4)
 *            MS-LS4-4 - Natural selection (Cycle 3)
 *
 * 3-DIMENSIONAL LEARNING:
 *   SEP-2: Developing Models - Model wave behavior (reflection, absorption, transmission)
 *   SEP-3: Planning Investigations - Design experiments to test wave-material interactions
 *   SEP-4: Analyzing Data - Interpret transmission/absorption data
 *   DCI PS4.A: Wave Properties - Energy transfer through oscillations
 *   DCI PS4.B: Electromagnetic Radiation - EM spectrum and material interactions
 *   CCC-1: Patterns - Wavelength creates predictable interaction patterns
 *   CCC-2: Cause and Effect - Wavelength causes different transmission effects
 *   CCC-6: Structure and Function - Material structure determines wave interaction
 *
 * LEARNING TARGETS:
 *   1. Explain that waves transfer energy without transferring matter
 *   2. Describe how wavelength affects wave-material interactions
 *   3. Model reflection, refraction, absorption, and transmission
 *   4. Design investigations to test wave behavior with different materials
 *
 * FORMS:
 *   1. Hook - The WiFi vs Flashlight Mystery (12 pts, ~10 min)
 *   2. Station 1 - Wave Tank Investigation (20 pts, ~18 min)
 *   3. Station 2 - Electromagnetic Spectrum Exploration (20 pts, ~15 min)
 *   4. Station 3 - Design a Wave Barrier (25 pts, ~20 min)
 *   5. Exit Ticket - Wave Behavior Integration (23 pts, ~15 min)
 *
 * TARGET MISCONCEPTIONS:
 *   - "Waves carry matter from one place to another" (60% frequency)
 *   - "All waves behave the same way" (50% frequency)
 *   - "Light travels instantly" (40% frequency)
 *
 * SCHOLARLY FOUNDATIONS COMPLIANCE:
 *   - Refutational text structure (g = 0.41) for misconception targeting
 *   - High-information feedback (d = 0.99) on all items
 *   - Interleaving (d = 0.83) via 2 spiral questions per exit ticket
 *   - Digital-first design with PhET simulation integration
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
 * DEPLOYMENT CHECKLIST
 * ============================================================================
 *   1. Open script.google.com, create new project
 *   2. Paste this entire script
 *   3. Run: createAllG8C5W1Forms()
 *   4. Check Logger (View > Logs) for form URLs
 *   5. MANUAL CONFIG REQUIRED (Settings > Quizzes in each form):
 *      - Release grade: "Immediately after each submission"
 *      - Respondent can see: Check ALL boxes
 *      - Shuffle option order: ON
 *   6. Embed forms in LMS using the embed URLs from Logger
 */

// ============================================================================
// MAIN FUNCTION
// ============================================================================

function createAllG8C5W1Forms() {
  Logger.log('================================================');
  Logger.log('G8 CYCLE 5 WEEK 1: WAVE PROPERTIES & BEHAVIOR');
  Logger.log('================================================\n');

  const forms = {
    hook: createG8C5W1Hook_(),
    station1: createG8C5W1Station1_(),
    station2: createG8C5W1Station2_(),
    station3: createG8C5W1Station3_(),
    exitTicket: createG8C5W1ExitTicket_()
  };

  Logger.log('\n================================================');
  Logger.log('ALL 5 FORMS CREATED - 100 POINTS TOTAL');
  Logger.log('================================================');

  return forms;
}

// ============================================================================
// HOOK - THE WIFI VS FLASHLIGHT MYSTERY (12 points, ~10 min)
// Connects to energy concepts and introduces wave behavior differences
// ============================================================================

function createG8C5W1Hook_() {
  const form = FormApp.create('G8.C5.W1: Hook - The WiFi vs Flashlight Mystery');

  form.setDescription(
    'THE WIFI VS FLASHLIGHT MYSTERY\n\n' +
    'Your home WiFi signal passes through walls, floors, and furniture to reach your devices in any room.\n' +
    'But if you try to shine a flashlight through those same walls, no light gets through.\n\n' +
    'Here\'s the weird part: BOTH WiFi and visible light are electromagnetic waves!\n' +
    'They\'re part of the same family—so why do they behave so differently?\n\n' +
    '---\n' +
    'Time: About 10 minutes | Points: 12\n' +
    'Use what you learned in Cycle 4 about energy transfer!'
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
    'Next: Investigate wave behaviors like reflection, refraction, and diffraction!\n' +
    'You\'ll discover why wavelength matters so much.'
  );

  // --- PART 1: OBSERVATION ---
  form.addPageBreakItem()
    .setTitle('Part 1: The Phenomenon')
    .setHelpText('Think about what you observe about waves in everyday life.');

  // Q1: Initial observation (3 pts auto)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('Which statement about waves is TRUE based on everyday observations?')
    .setHelpText('Think about sound, light, water waves, and radio signals.')
    .setRequired(true);

  q1.setChoices([
    q1.createChoice('Different types of waves can interact differently with the same material', true),
    q1.createChoice('All waves pass through all materials equally', false),
    q1.createChoice('Waves can only travel through air, not solids or liquids', false),
    q1.createChoice('Waves always travel in straight lines and never bend', false)
  ]);
  q1.setPoints(3);
  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! WiFi passes through walls but light doesn\'t—same material, different wave behavior. This week we\'ll discover why!')
      .build()
  );
  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Think about it: WiFi goes through walls, but light doesn\'t. X-rays go through skin but not bone. The same material can block some waves and let others pass!')
      .build()
  );

  // --- MTSS FLAG: Check for wave misconception ---
  const mtss1 = form.addMultipleChoiceItem()
    .setTitle('QUICK CHECK (Prior Knowledge): What do waves transfer from one place to another?')
    .setHelpText('This checks a common misconception. Your answer does NOT affect your grade.')
    .setRequired(true);

  mtss1.setChoices([
    mtss1.createChoice('Waves transfer matter (stuff moves from point A to point B)', false),  // FLAG: Matter misconception
    mtss1.createChoice('Waves transfer energy (the stuff stays in place but energy moves)', true),
    mtss1.createChoice('Waves transfer both matter and energy equally', false),
    mtss1.createChoice('Waves don\'t transfer anything—they\'re just patterns', false)
  ]);
  // Diagnostic only - omit setPoints() for ungraded items

  // Q2: Prediction (3 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 2 (3 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '3: Mentions wavelength, energy, or material properties with reasoning\n' +
      '2: Mentions waves being different but incomplete explanation\n' +
      '1: Guess without scientific reasoning\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('WHY do you think WiFi signals can pass through walls but visible light cannot? Both are electromagnetic waves—what might be different about them?')
    .setHelpText(
      'Sentence starters:\n' +
      '• "I think WiFi passes through walls because..." \n' +
      '• "Light might be blocked because..." \n' +
      '• "The difference between WiFi and light could be..."'
    )
    .setRequired(true);

  // --- PART 2: CYCLE 4 CONNECTION ---
  form.addPageBreakItem()
    .setTitle('Part 2: Cycle 4 Connection')
    .setHelpText('Connect this to what you learned about energy transfer.');

  // Q3: Energy transfer connection (3 pts auto)
  const q3 = form.addMultipleChoiceItem()
    .setTitle('In Cycle 4, we learned about energy transfer in ecosystems. How does this connect to waves?')
    .setRequired(true);

  q3.setChoices([
    q3.createChoice('Waves transfer energy from one place to another without moving matter', true),
    q3.createChoice('Waves create new energy from nothing', false),
    q3.createChoice('Waves destroy energy when they hit objects', false),
    q3.createChoice('Waves and energy are completely unrelated', false)
  ]);
  q3.setPoints(3);
  q3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Just like energy flows through food chains, waves carry energy through space—but they don\'t carry matter along with them.')
      .build()
  );
  q3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Remember from Cycle 4: energy is conserved and flows from one place to another. Waves are one way energy travels without the actual stuff moving!')
      .build()
  );

  // Q4: Wave behavior prediction (3 pts auto)
  const q4 = form.addMultipleChoiceItem()
    .setTitle('When a wave encounters a barrier (like a wall), which outcome is NOT possible?')
    .setRequired(true);

  q4.setChoices([
    q4.createChoice('The wave is destroyed and its energy disappears', true),
    q4.createChoice('The wave is reflected (bounces back)', false),
    q4.createChoice('The wave is absorbed (energy transfers to the material)', false),
    q4.createChoice('The wave is transmitted (passes through)', false)
  ]);
  q4.setPoints(3);
  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Energy is conserved—waves can\'t just disappear. They can reflect, absorb, or transmit, but the energy goes SOMEWHERE.')
      .build()
  );
  q4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Energy is conserved! When a wave hits something, it must reflect, absorb, or transmit—it can\'t just vanish.')
      .build()
  );

  // Q5: Confidence (0 pts - diagnostic only)
  form.addScaleItem()
    .setTitle('Self-Assessment: How confident are you that you can explain why different waves behave differently with the same material?')
    .setHelpText('FOR REFLECTION ONLY - This does NOT affect your grade. Be honest!')
    .setBounds(1, 5)
    .setLabels('Still learning', 'Got it!')
    .setRequired(true);

  logFormInfo_(form, 'G8 C5 W1 Hook', 12);
  return form;
}

// ============================================================================
// STATION 1 - WAVE TANK INVESTIGATION (20 points, ~18 min)
// Understanding fundamental wave behaviors
// ============================================================================

function createG8C5W1Station1_() {
  const form = FormApp.create('G8.C5.W1: Station 1 - Wave Tank Investigation');

  form.setDescription(
    'YOUR MISSION: DISCOVER WAVE BEHAVIORS\n\n' +
    'When waves encounter barriers, boundaries, or gaps, they do interesting things!\n' +
    'Today you\'ll explore the four main wave behaviors:\n\n' +
    '• REFLECTION - Wave bounces off a barrier\n' +
    '• REFRACTION - Wave bends when entering a new medium\n' +
    '• DIFFRACTION - Wave spreads around obstacles or through gaps\n' +
    '• TRANSMISSION - Wave passes through material\n\n' +
    '---\n' +
    'Time: About 18 minutes | Points: 20\n' +
    'Use the PhET Wave Interference simulation or wave tank to make observations.'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Station 1 complete!\n\n' +
    'KEY INSIGHT: Waves transfer energy, not matter.\n' +
    'How waves interact with materials depends on wavelength and material properties.\n\n' +
    'Continue to Station 2: Electromagnetic Spectrum Exploration'
  );

  // --- DATA REFERENCE ---
  form.addPageBreakItem()
    .setTitle('Reference: Wave Behaviors')
    .setHelpText(
      'WAVE BEHAVIOR SUMMARY:\n\n' +
      '┌────────────────────────────────────────────────────────┐\n' +
      '│ REFLECTION                                              │\n' +
      '│ Wave bounces off barrier                                │\n' +
      '│ Angle in = Angle out                                    │\n' +
      '│ Example: Echo, mirror                                   │\n' +
      '├────────────────────────────────────────────────────────┤\n' +
      '│ REFRACTION                                              │\n' +
      '│ Wave bends when changing medium                         │\n' +
      '│ Speed change causes direction change                    │\n' +
      '│ Example: Straw looks bent in water                      │\n' +
      '├────────────────────────────────────────────────────────┤\n' +
      '│ DIFFRACTION                                             │\n' +
      '│ Wave spreads around obstacles or through gaps           │\n' +
      '│ More spreading with longer wavelengths                  │\n' +
      '│ Example: Sound bends around corners                     │\n' +
      '├────────────────────────────────────────────────────────┤\n' +
      '│ TRANSMISSION                                            │\n' +
      '│ Wave passes through material                            │\n' +
      '│ Some energy may be absorbed                             │\n' +
      '│ Example: Light through glass                            │\n' +
      '└────────────────────────────────────────────────────────┘\n\n' +
      'KEY PRINCIPLE: Waves transfer ENERGY, not matter!\n' +
      'A floating cork bobs up and down but doesn\'t travel with the wave.'
    );

  // Q1: Wave energy transfer (4 pts auto)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('A floating cork is in a pond. When a wave passes by, what happens to the cork?')
    .setHelpText('Think about whether waves transfer matter or energy.')
    .setRequired(true);

  q1.setChoices([
    q1.createChoice('The cork bobs up and down but stays in roughly the same place', true),
    q1.createChoice('The cork travels with the wave across the pond', false),
    q1.createChoice('The cork sinks when the wave hits it', false),
    q1.createChoice('The cork doesn\'t move at all', false)
  ]);
  q1.setPoints(4);
  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Waves transfer ENERGY, not matter. The cork moves up and down (oscillates) but doesn\'t travel—the energy passes through!')
      .build()
  );
  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('MISCONCEPTION ALERT: Waves don\'t carry matter with them. The water (and cork) oscillate up and down, but the wave\'s energy is what travels forward.')
      .build()
  );

  // Q2: Reflection understanding (4 pts auto)
  const q2 = form.addMultipleChoiceItem()
    .setTitle('A wave hits a flat barrier at a 30° angle. At what angle will it reflect?')
    .setHelpText('Think about the law of reflection.')
    .setRequired(true);

  q2.setChoices([
    q2.createChoice('30° (angle in = angle out)', true),
    q2.createChoice('60° (double the angle)', false),
    q2.createChoice('90° (straight back)', false),
    q2.createChoice('15° (half the angle)', false)
  ]);
  q2.setPoints(4);
  q2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! The angle of incidence equals the angle of reflection. This is why mirrors work and why you can bounce a ball off a wall predictably!')
      .build()
  );
  q2.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Law of reflection: angle in = angle out. A wave hitting at 30° will bounce off at 30° on the other side of the perpendicular.')
      .build()
  );

  // Q3: Diffraction explanation (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 3: Explain Diffraction (4 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '4: Explains wave spreading through gap + mentions wavelength comparison + gives example\n' +
      '3: Explains spreading with partial wavelength connection\n' +
      '2: Mentions spreading but vague mechanism\n' +
      '1: Incorrect or minimal response\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('You can hear someone talking around a corner, but you can\'t see them. Explain this using the concept of diffraction and wavelength.')
    .setHelpText(
      'Sentence starters:\n' +
      '• "Sound waves can bend around corners because..." \n' +
      '• "Sound has a wavelength that is ___ compared to a doorway..." \n' +
      '• "Light waves have wavelengths that are ___, so they..."'
    )
    .setRequired(true);

  // Q4: Wave behavior identification (4 pts auto)
  const q4 = form.addMultipleChoiceItem()
    .setTitle('A straw in a glass of water appears "bent" at the surface. Which wave behavior causes this?')
    .setRequired(true);

  q4.setChoices([
    q4.createChoice('Refraction - light bends when changing speed between air and water', true),
    q4.createChoice('Reflection - light bounces off the water surface', false),
    q4.createChoice('Diffraction - light spreads through the glass', false),
    q4.createChoice('Absorption - the water absorbs the light', false)
  ]);
  q4.setPoints(4);
  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Light changes speed when moving from air to water. This speed change causes the direction to bend—we call this refraction!')
      .build()
  );
  q4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('The straw looks bent because light REFRACTS (bends) when it changes speed going from water to air. Reflection would bounce it back; refraction bends its path.')
      .build()
  );

  // Q5: Spiral - Cycle 4 energy (4 pts auto)
  const q5 = form.addMultipleChoiceItem()
    .setTitle('CYCLE 4 CONNECTION: In Cycle 4, we learned energy can\'t be created or destroyed. When a wave is absorbed by a material, where does the wave\'s energy go?')
    .setRequired(true);

  q5.setChoices([
    q5.createChoice('The energy is converted to heat in the material', true),
    q5.createChoice('The energy is destroyed completely', false),
    q5.createChoice('The energy teleports to another location', false),
    q5.createChoice('The energy stays in the wave forever', false)
  ]);
  q5.setPoints(4);
  q5.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Energy is conserved. When a material absorbs a wave, the wave\'s energy becomes thermal energy (heat) in the material.')
      .build()
  );
  q5.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Remember Cycle 4: energy can\'t be destroyed! When absorbed, wave energy transforms into heat. That\'s why dark surfaces get hot in sunlight—they absorb light energy.')
      .build()
  );

  logFormInfo_(form, 'G8 C5 W1 Station 1', 20);
  return form;
}

// ============================================================================
// STATION 2 - ELECTROMAGNETIC SPECTRUM EXPLORATION (20 points, ~15 min)
// Comparing wave types across the EM spectrum
// ============================================================================

function createG8C5W1Station2_() {
  const form = FormApp.create('G8.C5.W1: Station 2 - Electromagnetic Spectrum Exploration');

  form.setDescription(
    'YOUR MISSION: EXPLORE THE ELECTROMAGNETIC SPECTRUM\n\n' +
    'All electromagnetic waves travel at the speed of light in a vacuum.\n' +
    'So what makes radio waves different from gamma rays?\n\n' +
    'The answer: WAVELENGTH and FREQUENCY!\n' +
    '• Longer wavelength = lower frequency = lower energy\n' +
    '• Shorter wavelength = higher frequency = higher energy\n\n' +
    '---\n' +
    'Time: About 15 minutes | Points: 20\n' +
    'Use the EM spectrum reference to answer questions.'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Station 2 complete!\n\n' +
    'KEY INSIGHT: Wavelength determines how waves interact with materials.\n' +
    'Longer wavelengths (like radio/WiFi) can pass through materials that block shorter wavelengths (like visible light).\n\n' +
    'Continue to Station 3: Design a Wave Barrier'
  );

  // --- EM SPECTRUM REFERENCE ---
  form.addPageBreakItem()
    .setTitle('Reference: Electromagnetic Spectrum')
    .setHelpText(
      'THE ELECTROMAGNETIC SPECTRUM (from longest to shortest wavelength):\n\n' +
      '┌─────────────────────────────────────────────────────────────────┐\n' +
      '│ WAVE TYPE    │ WAVELENGTH      │ ENERGY │ COMMON USE            │\n' +
      '├─────────────────────────────────────────────────────────────────┤\n' +
      '│ Radio        │ 1 km - 1 m      │ LOW    │ AM/FM radio, WiFi     │\n' +
      '│ Microwave    │ 1 m - 1 mm      │ ↓      │ Cell phones, cooking  │\n' +
      '│ Infrared     │ 1 mm - 700 nm   │ ↓      │ Remote controls, heat │\n' +
      '│ VISIBLE      │ 700 - 400 nm    │ ↓      │ Human eyes can see    │\n' +
      '│ Ultraviolet  │ 400 - 10 nm     │ ↓      │ Sunburn, sterilization│\n' +
      '│ X-ray        │ 10 - 0.01 nm    │ ↓      │ Medical imaging       │\n' +
      '│ Gamma        │ < 0.01 nm       │ HIGH   │ Cancer treatment      │\n' +
      '└─────────────────────────────────────────────────────────────────┘\n\n' +
      'KEY INSIGHT - WiFi vs Light:\n' +
      '• WiFi wavelength: ~12 cm (120,000,000 nm)\n' +
      '• Visible light wavelength: ~500 nm\n' +
      '• WiFi waves are 240,000× LONGER than visible light!\n' +
      '• Longer waves can diffract around obstacles and pass through gaps in materials.'
    );

  // Q1: Wavelength-material interaction (4 pts auto)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('WiFi signals (wavelength ~12 cm) pass through walls, but visible light (wavelength ~500 nm) doesn\'t. Why?')
    .setHelpText('Think about how wavelength affects wave behavior.')
    .setRequired(true);

  q1.setChoices([
    q1.createChoice('Longer wavelengths can diffract around and through gaps in materials that shorter wavelengths cannot', true),
    q1.createChoice('WiFi has more energy and can punch through walls', false),
    q1.createChoice('Light is too heavy to pass through solid objects', false),
    q1.createChoice('WiFi and light are completely different things, not both waves', false)
  ]);
  q1.setPoints(4);
  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! WiFi waves are ~240,000× longer than light waves. They can diffract through gaps in wall materials (between molecules) that are tiny compared to their wavelength.')
      .build()
  );
  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('It\'s about wavelength! Longer waves diffract more easily around obstacles. WiFi wavelengths are HUGE compared to visible light, so they bend around the gaps in wall materials.')
      .build()
  );

  // Q2: EM spectrum energy (4 pts auto)
  const q2 = form.addMultipleChoiceItem()
    .setTitle('Which list correctly orders EM waves from LOWEST to HIGHEST energy?')
    .setRequired(true);

  q2.setChoices([
    q2.createChoice('Radio → Infrared → Visible → X-ray → Gamma', true),
    q2.createChoice('Gamma → X-ray → Visible → Radio → Infrared', false),
    q2.createChoice('Visible → Radio → X-ray → Gamma → Infrared', false),
    q2.createChoice('Infrared → Radio → Gamma → X-ray → Visible', false)
  ]);
  q2.setPoints(4);
  q2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Longer wavelength = lower energy. Radio waves have the longest wavelength (lowest energy), gamma rays have the shortest (highest energy).')
      .build()
  );
  q2.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Remember: wavelength and energy are inversely related. Longest wavelength (radio) = lowest energy. Shortest wavelength (gamma) = highest energy.')
      .build()
  );

  // Q3: X-ray application (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 3: Explain X-ray Imaging (4 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '4: Explains transmission through soft tissue + absorption by dense bone + resulting image\n' +
      '3: Mentions different interactions with two explanations\n' +
      '2: General statement about X-rays passing through\n' +
      '1: Incorrect or minimal response\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('X-rays can pass through your skin but not through your bones. Explain how this property allows doctors to take images of broken bones.')
    .setHelpText(
      'Sentence starters:\n' +
      '• "X-rays are transmitted through ___ because..." \n' +
      '• "X-rays are absorbed by ___ because..." \n' +
      '• "This creates an image because..."'
    )
    .setRequired(true);

  // Q4: Speed of light misconception (4 pts auto)
  const q4 = form.addMultipleChoiceItem()
    .setTitle('MISCONCEPTION CHECK: How long does it take for light from your phone screen to reach your eyes (distance ~30 cm)?')
    .setRequired(true);

  q4.setChoices([
    q4.createChoice('About 1 nanosecond (0.000000001 seconds) - incredibly fast but NOT instant', true),
    q4.createChoice('Zero seconds - light travels instantly', false),
    q4.createChoice('About 1 second - light is pretty slow', false),
    q4.createChoice('Light doesn\'t actually travel - it\'s just "there"', false)
  ]);
  q4.setPoints(4);
  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Light travels at 3×10⁸ m/s—incredibly fast, but NOT instant. Over short distances the delay is unmeasurable to humans, but over cosmic distances it matters (sunlight takes 8 minutes to reach Earth)!')
      .build()
  );
  q4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('MISCONCEPTION ALERT: Light is NOT instant! It travels at 300,000 km/s—fast enough that we can\'t notice over short distances, but measurable over long distances. Sunlight takes 8 minutes to reach us!')
      .build()
  );

  // Q5: Application (4 pts auto)
  const q5 = form.addMultipleChoiceItem()
    .setTitle('Why do TV remotes use infrared light instead of visible light?')
    .setRequired(true);

  q5.setChoices([
    q5.createChoice('Infrared is invisible so it doesn\'t distract users, and electronic sensors can still detect it', true),
    q5.createChoice('Infrared has more energy and travels farther', false),
    q5.createChoice('Visible light can\'t travel through air', false),
    q5.createChoice('Infrared is the only type of light that exists', false)
  ]);
  q5.setPoints(4);
  q5.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Infrared is just beyond what our eyes can see, so the remote doesn\'t flash annoyingly. Electronic sensors in the TV can detect IR easily. It\'s the perfect choice!')
      .build()
  );
  q5.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Think about user experience: visible light would mean the remote flashes every time you press a button! Infrared is invisible to humans but detectable by electronics.')
      .build()
  );

  logFormInfo_(form, 'G8 C5 W1 Station 2', 20);
  return form;
}

// ============================================================================
// STATION 3 - DESIGN A WAVE BARRIER (25 points, ~20 min)
// Engineering design challenge applying wave property concepts
// ============================================================================

function createG8C5W1Station3_() {
  const form = FormApp.create('G8.C5.W1: Station 3 - Design a Wave Barrier');

  form.setDescription(
    'ENGINEERING CHALLENGE: DESIGN A WAVE BARRIER SYSTEM\n\n' +
    'Your task: Design a barrier system for a hospital that:\n' +
    '• BLOCKS cell phone signals (microwaves) to prevent interference\n' +
    '• ALLOWS emergency radio communication\n' +
    '• ALLOWS patient monitoring infrared sensors\n\n' +
    '---\n' +
    'Time: About 20 minutes | Points: 25 (highest value!)\n\n' +
    'CONSTRAINTS:\n' +
    '• Must use realistic materials\n' +
    '• Must justify choices using wave properties\n' +
    '• Must consider practical installation'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Station 3 complete!\n\n' +
    'You\'ve designed a wave management system using physics principles!\n' +
    'Key insight: Material properties and wave characteristics determine interactions.\n\n' +
    'Continue to Exit Ticket'
  );

  // --- DESIGN OPTIONS REFERENCE ---
  form.addPageBreakItem()
    .setTitle('Reference: Materials and Wave Interactions')
    .setHelpText(
      'WAVE-MATERIAL INTERACTION GUIDE:\n\n' +
      '┌────────────────────────────────────────────────────────────────────┐\n' +
      '│ MATERIAL        │ RADIO (λ~m) │ MICROWAVE (λ~cm) │ IR (λ~μm)      │\n' +
      '├────────────────────────────────────────────────────────────────────┤\n' +
      '│ Metal (solid)   │ REFLECTS    │ REFLECTS         │ REFLECTS       │\n' +
      '│ Metal mesh      │ TRANSMITS*  │ REFLECTS         │ TRANSMITS      │\n' +
      '│ Glass           │ TRANSMITS   │ TRANSMITS        │ ABSORBS some   │\n' +
      '│ Concrete        │ ABSORBS     │ ABSORBS          │ ABSORBS        │\n' +
      '│ Fabric          │ TRANSMITS   │ TRANSMITS        │ TRANSMITS      │\n' +
      '│ Water           │ TRANSMITS   │ ABSORBS          │ ABSORBS        │\n' +
      '└────────────────────────────────────────────────────────────────────┘\n' +
      '* If mesh holes are larger than wavelength\n\n' +
      'KEY PRINCIPLE: A mesh blocks waves with wavelengths LARGER than its holes!\n' +
      '• Cell phone microwaves: λ ~ 10-30 cm\n' +
      '• Emergency radio: λ ~ 1-10 m\n' +
      '• Infrared: λ ~ 1-100 μm (micrometers)\n\n' +
      'MESH DESIGN INSIGHT:\n' +
      'A mesh with 20 cm holes would:\n' +
      '• BLOCK radio waves (wavelength too big to fit)\n' +
      '• ALLOW microwaves (wavelength fits through)\n' +
      'A mesh with 5 cm holes would:\n' +
      '• BLOCK both radio AND microwaves (both too big)\n' +
      '• ALLOW infrared (wavelength much smaller)'
    );

  // Q1: System design (7 pts manual) - highest value question
  form.addSectionHeaderItem()
    .setTitle('Question 1: Design Your Barrier System (7 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '7: Specifies material + mesh size + justifies each choice with wavelength reasoning + addresses all 3 wave types\n' +
      '5-6: Good design with most requirements, minor gaps\n' +
      '3-4: Viable design but missing wavelength justification\n' +
      '1-2: Basic attempt, major gaps\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Design your hospital barrier system. Specify:\n• What material(s) you would use\n• What mesh hole size (if using mesh)\n• How your design BLOCKS cell phone microwaves\n• How your design ALLOWS radio AND infrared')
    .setHelpText(
      'Sentence starters:\n' +
      '• "My barrier uses ___ material because..." \n' +
      '• "The mesh holes are ___ cm because microwaves have wavelength..." \n' +
      '• "Radio waves can pass through because..."'
    )
    .setRequired(true);

  // Q2: Wavelength justification (6 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 2: Justify Your Design Using Wavelength (6 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '6: Explicitly compares wavelengths to mesh/material properties for all 3 wave types\n' +
      '4-5: Compares wavelengths for 2 wave types with reasoning\n' +
      '2-3: Mentions wavelength without specific comparisons\n' +
      '1: Vague response\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Explain WHY your material choices work by comparing the WAVELENGTHS of each wave type to the properties of your barrier.')
    .setHelpText(
      'Sentence starters:\n' +
      '• "Microwave wavelengths (~10-30 cm) are ___ compared to my mesh holes, so..." \n' +
      '• "Radio wavelengths (~1-10 m) are ___ than my mesh holes, so..." \n' +
      '• "Infrared wavelengths (~1-100 μm) are much ___ than the mesh, so..."'
    )
    .setRequired(true);

  // Q3: Trade-off analysis (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 3: Analyze Trade-offs (4 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '4: Identifies specific trade-off (cost vs. effectiveness, visibility vs. blocking) with explanation\n' +
      '3: Identifies trade-off with partial explanation\n' +
      '2: General mention without specifics\n' +
      '1: Vague response\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('What trade-offs did you consider in your design? (For example: cost, visibility, maintenance, or blocking accuracy)')
    .setHelpText(
      'Sentence starters:\n' +
      '• "I traded off ___ for ___ because..." \n' +
      '• "A limitation of my design is..." \n' +
      '• "If budget wasn\'t an issue, I would change..."'
    )
    .setRequired(true);

  // Q4: Problem-solving (4 pts auto)
  const q4 = form.addMultipleChoiceItem()
    .setTitle('A hospital discovers their current barrier is blocking emergency radio signals. The barrier uses a solid metal sheet. What modification would FIX this?')
    .setRequired(true);

  q4.setChoices([
    q4.createChoice('Replace the solid metal with a metal mesh with holes larger than radio wavelengths (~1-10 m)', true),
    q4.createChoice('Make the metal sheet thicker', false),
    q4.createChoice('Paint the metal sheet a different color', false),
    q4.createChoice('Add another solid metal layer', false)
  ]);
  q4.setPoints(4);
  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! A mesh with holes larger than radio wavelengths will let those waves through while potentially still blocking shorter wavelengths. This is how Faraday cages work!')
      .build()
  );
  q4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Think about what allows waves through: holes bigger than the wavelength! A mesh lets you selectively block based on wavelength.')
      .build()
  );

  // Q5: Real-world connection (4 pts auto)
  const q5 = form.addMultipleChoiceItem()
    .setTitle('The metal mesh on a microwave oven door has tiny holes. Why can you see your food (visible light passes through) but the microwaves stay inside?')
    .setRequired(true);

  q5.setChoices([
    q5.createChoice('Visible light wavelength (~500 nm) is much smaller than the holes; microwave wavelength (~12 cm) is much larger', true),
    q5.createChoice('The glass blocks microwaves and passes light', false),
    q5.createChoice('Microwaves are magnetic and get pulled back by the metal', false),
    q5.createChoice('The holes are painted with special microwave-blocking paint', false)
  ]);
  q5.setPoints(4);
  q5.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! The mesh holes are ~1-2 mm—HUGE compared to visible light (~500 nm) but TINY compared to microwaves (~12 cm = 120 mm). Light passes easily; microwaves can\'t fit!')
      .build()
  );
  q5.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('It\'s all about wavelength vs hole size! The mesh holes are smaller than microwave wavelengths (blocked) but much larger than light wavelengths (transmitted).')
      .build()
  );

  logFormInfo_(form, 'G8 C5 W1 Station 3', 25);
  return form;
}

// ============================================================================
// EXIT TICKET - WAVE BEHAVIOR INTEGRATION (23 points, ~15 min)
// 2 NEW + 2 SPIRAL + 1 INTEGRATION + 1 SEP
// ============================================================================

function createG8C5W1ExitTicket_() {
  const form = FormApp.create('G8.C5.W1: Exit Ticket - Wave Behavior Integration');

  form.setDescription(
    'EXIT TICKET: SHOW WHAT YOU LEARNED\n\n' +
    'This tests whether you can apply wave behavior concepts.\n\n' +
    '---\n' +
    'Time: About 15 minutes | Points: 23\n\n' +
    'QUESTION TYPES:\n' +
    '- 2 NEW questions (Cycle 5 content - wave properties)\n' +
    '- 2 SPIRAL questions (Cycle 3 & 4 review)\n' +
    '- 1 INTEGRATION question (connects cycles)\n' +
    '- 1 SEP-2 question (developing models)'
  );

  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'WEEK 1 COMPLETE! Congratulations!\n\n' +
    'You learned about wave behaviors and the electromagnetic spectrum.\n\n' +
    'Key takeaways:\n' +
    '• Waves transfer ENERGY, not matter\n' +
    '• Wavelength determines how waves interact with materials\n' +
    '• Longer wavelengths can pass through materials that block shorter wavelengths\n' +
    '• Wave behaviors: reflection, refraction, diffraction, transmission\n\n' +
    'NEXT WEEK: How do waves carry information?'
  );

  // --- NEW CONTENT ---
  form.addPageBreakItem()
    .setTitle('NEW CONTENT (Questions 1 & 2)')
    .setHelpText('These test what you learned TODAY about wave properties.');

  // Q1: NEW - Wave behavior identification (4 pts auto)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('A submarine sends out a sound wave (sonar) that bounces off a nearby ship and returns. Which wave behavior is being used?')
    .setRequired(true);

  q1.setChoices([
    q1.createChoice('Reflection - the wave bounces off the ship and returns', true),
    q1.createChoice('Refraction - the wave bends around the ship', false),
    q1.createChoice('Diffraction - the wave spreads through the ship', false),
    q1.createChoice('Transmission - the wave passes through the ship', false)
  ]);
  q1.setPoints(4);
  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Sonar uses REFLECTION—the sound wave bounces off objects and returns, telling the submarine about distance and location.')
      .build()
  );
  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Sonar relies on waves bouncing BACK. That\'s reflection! The submarine measures the time for the wave to return to calculate distance.')
      .build()
  );

  // Q2: NEW - Wavelength and material (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 2: NEW - Explain Wavelength Effects (4 points)')
    .setHelpText(
      'RUBRIC:\n' +
      '4: Explains WiFi wavelength vs light wavelength + relates to material gaps + explains transmission/blocking\n' +
      '3: Compares wavelengths with partial material explanation\n' +
      '2: Mentions wavelength difference without material connection\n' +
      '1: Vague or incomplete\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Explain why WiFi signals pass through walls but visible light doesn\'t, using the concept of wavelength.')
    .setHelpText(
      'Sentence starters:\n' +
      '• "WiFi has a wavelength of about ___, which is..." \n' +
      '• "Visible light has a wavelength of about ___, which is..." \n' +
      '• "The gaps in wall materials are... compared to each wavelength."'
    )
    .setRequired(true);

  // --- SPIRAL CONTENT ---
  form.addPageBreakItem()
    .setTitle('SPIRAL CONTENT (Questions 3 & 4)')
    .setHelpText('These review concepts from Cycles 3 and 4.');

  // Q3: SPIRAL - Cycle 4 energy (4 pts auto)
  const q3 = form.addMultipleChoiceItem()
    .setTitle('CYCLE 4 REVIEW: According to the 10% rule, what happens to 90% of energy at each trophic level?')
    .setRequired(true);

  q3.setChoices([
    q3.createChoice('Lost as heat through metabolism, movement, and waste', true),
    q3.createChoice('Transferred to the next trophic level', false),
    q3.createChoice('Destroyed completely', false),
    q3.createChoice('Stored forever in the organism', false)
  ]);
  q3.setPoints(4);
  q3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Energy is conserved but converted to heat through life processes. Only ~10% is available for the next level.')
      .build()
  );
  q3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Review Cycle 4: Energy can\'t be destroyed (conservation). The 90% becomes heat through metabolism—it\'s still energy, just not usable by the next level.')
      .build()
  );

  // Q4: SPIRAL - Cycle 3 natural selection (4 pts auto)
  const q4 = form.addMultipleChoiceItem()
    .setTitle('CYCLE 3 REVIEW: Which statement best describes natural selection?')
    .setRequired(true);

  q4.setChoices([
    q4.createChoice('Individuals with traits better suited to their environment are more likely to survive and reproduce', true),
    q4.createChoice('Organisms choose to develop new traits when needed', false),
    q4.createChoice('All organisms in a population are exactly the same', false),
    q4.createChoice('Evolution happens instantly when the environment changes', false)
  ]);
  q4.setPoints(4);
  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Natural selection = differential survival and reproduction based on traits. Organisms don\'t "choose" to adapt.')
      .build()
  );
  q4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Review Cycle 3: Natural selection requires variation in a population. Individuals with advantageous traits survive and reproduce more—they don\'t choose to change.')
      .build()
  );

  // --- INTEGRATION ---
  form.addPageBreakItem()
    .setTitle('INTEGRATION (Question 5)')
    .setHelpText('This requires knowledge from multiple cycles.');

  // Q5: Integration (4 pts manual)
  form.addSectionHeaderItem()
    .setTitle('Question 5: INTEGRATION (4 points)')
    .setHelpText(
      '3D ASSESSMENT RUBRIC:\n' +
      '4: Connects wave energy transfer to ecosystem energy + gives specific example\n' +
      '   SEP-4: Analyzes energy patterns across systems\n' +
      '   DCI: Applies energy conservation\n' +
      '   CCC: Uses energy and matter flow concept\n' +
      '3: Makes connection with partial explanation\n' +
      '2: Mentions both concepts but doesn\'t connect\n' +
      '1: Vague connection\n' +
      '0: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Both waves AND food chains transfer energy. What do these two types of energy transfer have in common? What is different about them?')
    .setHelpText(
      'Sentence starters:\n' +
      '• "Both waves and food chains transfer energy by..." \n' +
      '• "A similarity is that energy is conserved in both cases because..." \n' +
      '• "A difference is that waves transfer energy ___, while food chains..."'
    )
    .setRequired(true);

  // --- SEP-2: DEVELOPING MODELS ---
  form.addPageBreakItem()
    .setTitle('SEP-2: Develop a Model (Question 6)')
    .setHelpText(
      'NGSS Practice: Developing and Using Models\n' +
      'Scientists use models to explain and predict phenomena!'
    );

  form.addSectionHeaderItem()
    .setTitle('Question 6: Develop a Model (3 points)')
    .setHelpText(
      'RUBRIC - SEP-2: Developing Models\n' +
      '3 pts: Describes model showing wave-material interaction with wavelength comparison, labels key components\n' +
      '2 pts: Describes model with some wave behavior details\n' +
      '1 pt: Basic description only\n' +
      '0 pts: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Describe a model you would create to explain why a metal mesh blocks microwaves but allows visible light through. Include:\n• What the model would show\n• How you would represent wavelength differences\n• What labels you would include')
    .setHelpText(
      'Sentence starters:\n' +
      '• "My model would show a mesh with holes of size..." \n' +
      '• "To represent microwaves, I would draw waves with wavelength..." \n' +
      '• "Visible light would be shown as... because..."'
    )
    .setRequired(true);

  logFormInfo_(form, 'G8 C5 W1 Exit Ticket', 23);
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
function testG8C5W1Hook() { createG8C5W1Hook_(); }
function testG8C5W1Station1() { createG8C5W1Station1_(); }
function testG8C5W1Station2() { createG8C5W1Station2_(); }
function testG8C5W1Station3() { createG8C5W1Station3_(); }
function testG8C5W1ExitTicket() { createG8C5W1ExitTicket_(); }
