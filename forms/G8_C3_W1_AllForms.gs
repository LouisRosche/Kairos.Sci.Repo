/**
 * ============================================================================
 * GRADE 8 - CYCLE 3 WEEK 1: THE CHEETAH-GAZELLE ARMS RACE
 * 5 Forms | 100 Points Total | MS-LS4-4 + Spiral MS-PS2-1, MS-PS2-2
 * ============================================================================
 *
 * FORMS CREATED:
 *   1. Hook - The Cheetah-Gazelle Mystery (15 pts)
 *   2. Station 1 - Predator-Prey Force Analysis (20 pts)
 *   3. Station 2 - Trait Variation Simulation (20 pts)
 *   4. Station 3 - Design a Survivor (25 pts)
 *   5. Exit Ticket - Forces & Evolution (20 pts)
 *
 * DEPLOYMENT:
 *   1. Open script.google.com, create new project
 *   2. Paste this entire script
 *   3. Run: createAllG8C3W1Forms()
 *   4. Authorize when prompted
 *   5. Check Logger for form URLs (View > Logs)
 *
 * FEATURES UTILIZED:
 *   - Quiz mode with auto-grading
 *   - Progress bar for student pacing
 *   - NOTE: Enable "Shuffle option order" manually in Forms UI for anti-cheating
 *   - Response validation on calculations
 *   - Page breaks for clear sections
 *   - Help text scaffolding
 */

// ============================================================================
// MAIN FUNCTION - Creates all 5 G8 forms
// ============================================================================

function createAllG8C3W1Forms() {
  Logger.log('========================================');
  Logger.log('GRADE 8 CYCLE 3 WEEK 1 - FORM GENERATOR');
  Logger.log('========================================\n');

  const forms = {
    hook: createG8Hook_(),
    station1: createG8Station1_(),
    station2: createG8Station2_(),
    station3: createG8Station3_(),
    exitTicket: createG8ExitTicket_()
  };

  Logger.log('\n========================================');
  Logger.log('ALL 5 FORMS CREATED SUCCESSFULLY');
  Logger.log('Total Points: 100');
  Logger.log('========================================');

  return forms;
}

// ============================================================================
// FORM 1: HOOK - THE CHEETAH-GAZELLE MYSTERY (15 points)
// ============================================================================

function createG8Hook_() {
  const form = FormApp.create('G8.C3.W1: Hook - The Cheetah-Gazelle Mystery');

  form.setDescription(
    'THE CHEETAH-GAZELLE MYSTERY\n\n' +
    'Cheetahs can run 70 mph - the fastest land animal.\n' +
    'Gazelles can only reach about 60 mph.\n\n' +
    'If cheetahs are faster, why have gazelles not gone extinct?\n\n' +
    '---\n' +
    'Time: About 10 minutes\n' +
    'Points: 15 total\n' +
    'Tip: Use what you learned about forces in Cycle 2!'
  );

  form.setIsQuiz(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Hook submitted! You are ready for Station 1.\n\n' +
    'Next step: Analyze the forces between predator and prey using Newton\'s Laws.'
  );

  // === PAGE 1: Prior Knowledge ===
  form.addPageBreakItem()
    .setTitle('Part 1: Cycle 2 Physics Review')
    .setHelpText('Let us see what you remember about forces.');

  // Q1: Newton's Third Law (3 pts - manual)
  form.addSectionHeaderItem()
    .setTitle('Question 1: Newton\'s Third Law (3 points)')
    .setHelpText(
      'MANUAL GRADING - 3 points\n' +
      '3 pts: Accurate statement of N3L (equal and opposite forces)\n' +
      '2 pts: Partial understanding\n' +
      '1 pt: Attempt with misconceptions\n' +
      '0 pts: No response'
    );

  form.addParagraphTextItem()
    .setTitle('State Newton\'s Third Law in your own words.')
    .setHelpText(
      'Hint: What happens when two objects push on each other?\n' +
      'Think about action and reaction forces.'
    )
    .setRequired(true);

  // === PAGE 2: The Mystery ===
  form.addPageBreakItem()
    .setTitle('Part 2: The Phenomenon')
    .setHelpText('Think about why slower prey can survive against faster predators.');

  // Q2: Survival explanation (3 pts - manual)
  form.addSectionHeaderItem()
    .setTitle('Question 2: The Mystery (3 points)')
    .setHelpText(
      'MANUAL GRADING - 3 points\n' +
      '3 pts: Multiple valid scientific reasons\n' +
      '2 pts: One valid reason with explanation\n' +
      '1 pt: Vague response\n' +
      '0 pts: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Cheetahs run 70 mph. Gazelles max out at 60 mph.\n\nWhy have gazelles NOT gone extinct?')
    .setHelpText('Think about factors beyond just top speed: endurance, agility, reaction time, numbers...')
    .setRequired(true);

  // Q3: Gazelle advantages (3 pts - manual)
  form.addSectionHeaderItem()
    .setTitle('Question 3: Advantages (3 points)')
    .setHelpText(
      'MANUAL GRADING - 3 points\n' +
      '3 pts: Multiple physics-based advantages (acceleration, mass, agility)\n' +
      '2 pts: One clear advantage\n' +
      '1 pt: Vague\n' +
      '0 pts: No response'
    );

  form.addParagraphTextItem()
    .setTitle('What advantages might gazelles have despite being slower at top speed?')
    .setHelpText(
      'Consider physics concepts:\n' +
      '- Mass and acceleration (a = F/m)\n' +
      '- Turning and agility\n' +
      '- Endurance vs sprint speed\n' +
      '- Reaction time'
    )
    .setRequired(true);

  // Q4: Forces in chase MCQ (3 pts)
  const q4 = form.addMultipleChoiceItem()
    .setTitle('When a cheetah chases a gazelle and they collide, which statement about forces is TRUE?')
    .setHelpText('Apply Newton\'s Third Law to this situation.')
    .setRequired(true);

  q4.setChoices([
    q4.createChoice('The cheetah exerts more force because it is bigger and stronger', false),
    q4.createChoice('The gazelle exerts more force because it is trying to escape', false),
    q4.createChoice('They exert equal forces on each other (Newton\'s Third Law)', true),
    q4.createChoice('Only the cheetah exerts a force during the collision', false)
  ]);
  // NOTE: Shuffle choices manually in Forms UI (setShuffleOrder not available in API)
  q4.setPoints(3);
  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Newton\'s Third Law: when two objects interact, the forces are always equal and opposite.')
      .build()
  );
  q4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Review Newton\'s Third Law: forces between two objects are ALWAYS equal, regardless of size or speed.')
      .build()
  );

  // Q5: Confidence (3 pts)
  const q5 = form.addScaleItem()
    .setTitle('How confident are you in explaining forces in predator-prey interactions?')
    .setHelpText('Be honest - this helps us know where to focus!')
    .setBounds(1, 5)
    .setLabels('1 = Just guessing', '5 = Very confident')
    .setRequired(true);
  q5.setPoints(3);

  logFormInfo_(form, 'G8 Hook', 15);
  return form;
}

// ============================================================================
// FORM 2: STATION 1 - PREDATOR-PREY FORCE ANALYSIS (20 points)
// ============================================================================

function createG8Station1_() {
  const form = FormApp.create('G8.C3.W1: Station 1 - Predator-Prey Force Analysis');

  form.setDescription(
    'ANALYZE FORCES IN PREDATOR-PREY INTERACTIONS\n\n' +
    'Apply Newton\'s Third Law and F=ma to understand survival advantages.\n\n' +
    '---\n' +
    'Time: About 18 minutes\n' +
    'Points: 20 total\n\n' +
    'SCENARIO DATA:\n' +
    '- Cheetah mass: 50 kg\n' +
    '- Gazelle mass: 25 kg\n' +
    '- During collision: Gazelle accelerates at 20 m/s squared\n\n' +
    'You will need a calculator!'
  );

  form.setIsQuiz(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Station 1 complete!\n\n' +
    'KEY INSIGHT: Newton\'s Third Law means forces are equal.\n' +
    'But smaller mass = greater acceleration = survival advantage!\n\n' +
    'Continue to Station 2: Trait Variation Simulation'
  );

  // === PAGE 1: Force Pairs ===
  form.addPageBreakItem()
    .setTitle('Part 1: Action-Reaction Force Pairs')
    .setHelpText('Identify the forces when objects interact.');

  // Q1: Ground force pair (4 pts - manual)
  form.addSectionHeaderItem()
    .setTitle('Question 1: Force Pair Identification (4 points)')
    .setHelpText(
      'MANUAL GRADING - 4 points\n' +
      '4 pts: Correct force pair with clear N3L explanation\n' +
      '3 pts: Correct force pair identified\n' +
      '2 pts: Partial understanding\n' +
      '1 pt: Incorrect\n' +
      '0 pts: No response'
    );

  form.addParagraphTextItem()
    .setTitle('When a cheetah\'s paw pushes off the ground to run, identify the action-reaction force pair.')
    .setHelpText(
      'Format your answer as:\n' +
      '"The [object A] exerts a force on [object B], and [object B] exerts an equal and opposite force on [object A]."'
    )
    .setRequired(true);

  // Q2: N3L collision MCQ (4 pts)
  const q2 = form.addMultipleChoiceItem()
    .setTitle('When a 50 kg cheetah contacts a 25 kg gazelle during a chase, compare the forces they exert on each other:')
    .setHelpText('What does Newton\'s Third Law tell us about these forces?')
    .setRequired(true);

  q2.setChoices([
    q2.createChoice('Cheetah exerts more force (bigger animal)', false),
    q2.createChoice('Gazelle exerts more force (trying to escape)', false),
    q2.createChoice('Forces are equal (Newton\'s Third Law)', true),
    q2.createChoice('Cannot determine without knowing their speeds', false)
  ]);
  // NOTE: Shuffle choices manually in Forms UI (setShuffleOrder not available in API)
  q2.setPoints(4);
  q2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Newton\'s Third Law: the forces are ALWAYS equal and opposite, regardless of mass difference.')
      .build()
  );
  q2.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Newton\'s Third Law: forces between interacting objects are always equal. Mass affects acceleration, not force.')
      .build()
  );

  // === PAGE 2: Calculations ===
  form.addPageBreakItem()
    .setTitle('Part 2: Force and Acceleration Calculations')
    .setHelpText(
      'Use F = ma\n\n' +
      'Given:\n' +
      '- Gazelle mass = 25 kg\n' +
      '- Gazelle acceleration = 20 m/s squared\n' +
      '- Cheetah mass = 50 kg'
    );

  // Q3: Force on gazelle (3 pts - manual)
  form.addSectionHeaderItem()
    .setTitle('Question 3: Force on Gazelle (3 points)')
    .setHelpText(
      'MANUAL GRADING - 3 points\n' +
      '3 pts: Correct answer (500 N) with F=ma shown\n' +
      '2 pts: Correct answer only\n' +
      '1 pt: Wrong calculation with some correct setup\n' +
      '0 pts: No response\n\n' +
      'ANSWER: F = 25 kg x 20 m/s^2 = 500 N'
    );

  form.addTextItem()
    .setTitle('The gazelle (25 kg) accelerates at 20 m/s^2.\n\nWhat force does the cheetah exert on the gazelle?\n\nUse F = ma. Show your work and include units.')
    .setHelpText('F = m x a = ? kg x ? m/s^2 = ? N')
    .setRequired(true);

  // Q4: Force on cheetah (3 pts - manual)
  form.addSectionHeaderItem()
    .setTitle('Question 4: Force on Cheetah (3 points)')
    .setHelpText(
      'MANUAL GRADING - 3 points\n' +
      '3 pts: 500 N with N3L reasoning explained\n' +
      '2 pts: 500 N only\n' +
      '1 pt: Incorrect answer\n' +
      '0 pts: No response\n\n' +
      'ANSWER: 500 N (Newton\'s Third Law - equal and opposite)'
    );

  form.addTextItem()
    .setTitle('Using Newton\'s Third Law, what force does the gazelle exert ON the cheetah?\n\nExplain your reasoning.')
    .setHelpText('Newton\'s Third Law says that when two objects interact...')
    .setRequired(true);

  // Q5: Acceleration comparison (3 pts - manual)
  form.addSectionHeaderItem()
    .setTitle('Question 5: Compare Accelerations (3 points)')
    .setHelpText(
      'MANUAL GRADING - 3 points\n' +
      '3 pts: Both correct (cheetah 10 m/s^2, gazelle 20 m/s^2) with work\n' +
      '2 pts: One correct with work\n' +
      '1 pt: Attempt with errors\n' +
      '0 pts: No response\n\n' +
      'ANSWERS:\n' +
      'Cheetah: a = 500N / 50kg = 10 m/s^2\n' +
      'Gazelle: a = 500N / 25kg = 20 m/s^2'
    );

  form.addParagraphTextItem()
    .setTitle('Both animals experience 500 N of force.\n\nCheetah mass = 50 kg, Gazelle mass = 25 kg\n\nCalculate each animal\'s acceleration using a = F/m.\n\nShow your work for BOTH.')
    .setHelpText(
      'Use a = F / m for each animal:\n' +
      'Cheetah: a = 500 N / 50 kg = ?\n' +
      'Gazelle: a = 500 N / 25 kg = ?'
    )
    .setRequired(true);

  // === PAGE 3: Evolutionary Insight ===
  form.addPageBreakItem()
    .setTitle('Part 3: Connect to Survival');

  // Q6: Survival advantage (3 pts - manual)
  form.addSectionHeaderItem()
    .setTitle('Question 6: Evolutionary Advantage (3 points)')
    .setHelpText(
      'MANUAL GRADING - 3 points\n' +
      '3 pts: Lower mass leads to higher acceleration leads to escape advantage\n' +
      '2 pts: Mentions acceleration advantage\n' +
      '1 pt: Vague connection\n' +
      '0 pts: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Based on your calculations, why might being SMALLER give prey an advantage when a predator makes contact?')
    .setHelpText(
      'Connect your F=ma calculations to survival:\n' +
      '- Which animal accelerates more when the same force is applied?\n' +
      '- What does this mean for escaping after contact?'
    )
    .setRequired(true);

  logFormInfo_(form, 'G8 Station 1', 20);
  return form;
}

// ============================================================================
// FORM 3: STATION 2 - TRAIT VARIATION SIMULATION (20 points)
// ============================================================================

function createG8Station2_() {
  const form = FormApp.create('G8.C3.W1: Station 2 - Trait Variation Simulation');

  form.setDescription(
    'NATURAL SELECTION SIMULATION\n\n' +
    'Use a bean simulation to model how trait variation affects survival.\n' +
    'Different colored beans represent prey with different camouflage traits.\n\n' +
    '---\n' +
    'Time: About 15 minutes\n' +
    'Points: 20 total\n\n' +
    'SIMULATION RULES:\n' +
    '- Scatter beans on a background\n' +
    '- Hunt (grab beans) for 10 seconds\n' +
    '- Count survivors by color\n' +
    '- Survivors reproduce (add more of that color)\n' +
    '- Repeat for 3+ generations'
  );

  form.setIsQuiz(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Station 2 complete!\n\n' +
    'KEY INSIGHT: Selection pressure changes trait frequency over time.\n' +
    'The population changes - individuals do NOT change their traits.\n\n' +
    'Continue to Station 3: Design a Survivor'
  );

  // === PAGE 1: Data Collection ===
  form.addPageBreakItem()
    .setTitle('Part 1: Record Your Data')
    .setHelpText('Enter the results from your bean simulation.');

  // Q1: Data table (4 pts - manual)
  form.addSectionHeaderItem()
    .setTitle('Question 1: Simulation Data (4 points)')
    .setHelpText(
      'MANUAL GRADING - 4 points\n' +
      '4 pts: Complete data for 3+ generations with all colors\n' +
      '3 pts: Data for 2+ generations\n' +
      '2 pts: Partial data\n' +
      '1 pt: Minimal data\n' +
      '0 pts: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Record your data: How many of each color bean survived each round?\n\nFormat: Round 1: Brown=__, Green=__, White=__\nRound 2: Brown=__, Green=__, White=__\n(etc.)')
    .setHelpText('Enter all your data - we need at least 3 rounds to see patterns.')
    .setRequired(true);

  // === PAGE 2: Analysis ===
  form.addPageBreakItem()
    .setTitle('Part 2: Analyze Your Results');

  // Q2: Pattern identification (4 pts - manual)
  form.addSectionHeaderItem()
    .setTitle('Question 2: Identify Patterns (4 points)')
    .setHelpText(
      'MANUAL GRADING - 4 points\n' +
      '4 pts: Both traits identified + clear explanation of why\n' +
      '3 pts: Both traits identified\n' +
      '2 pts: One trait identified\n' +
      '1 pt: Vague response\n' +
      '0 pts: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Which trait (color) became MORE common over generations?\nWhich became LESS common?\n\nExplain why this happened.')
    .setRequired(true);

  // Q3: Selection pressure (4 pts - manual)
  form.addSectionHeaderItem()
    .setTitle('Question 3: Selection Pressure (4 points)')
    .setHelpText(
      'MANUAL GRADING - 4 points\n' +
      '4 pts: Identifies predation/visibility as pressure + explains mechanism\n' +
      '3 pts: Identifies the pressure clearly\n' +
      '2 pts: Partial understanding\n' +
      '1 pt: Wrong pressure identified\n' +
      '0 pts: No response'
    );

  form.addParagraphTextItem()
    .setTitle('What was the "selection pressure" in this simulation?\n\n(What factor determined which beans survived and which were caught?)')
    .setHelpText('Think about: What made some beans easier to catch than others?')
    .setRequired(true);

  // Q4: Physics analogy (4 pts - manual)
  form.addSectionHeaderItem()
    .setTitle('Question 4: Physics Connection (4 points)')
    .setHelpText(
      'MANUAL GRADING - 4 points\n' +
      '4 pts: Selection pressure changes trait frequency like force changes motion\n' +
      '3 pts: Reasonable analogy made\n' +
      '2 pts: Weak connection\n' +
      '1 pt: No meaningful connection\n' +
      '0 pts: No response'
    );

  form.addParagraphTextItem()
    .setTitle('In physics, a FORCE changes the motion of an object.\n\nIn evolution, what does "selection pressure" change?')
    .setHelpText('Think about what changed in your bean population over generations...')
    .setRequired(true);

  // Q5: Prediction (4 pts - manual)
  form.addSectionHeaderItem()
    .setTitle('Question 5: New Environment Prediction (4 points)')
    .setHelpText(
      'MANUAL GRADING - 4 points\n' +
      '4 pts: Specific prediction + clear reasoning based on simulation\n' +
      '3 pts: Prediction with partial reasoning\n' +
      '2 pts: Prediction without clear reasoning\n' +
      '1 pt: Vague prediction\n' +
      '0 pts: No response'
    );

  form.addParagraphTextItem()
    .setTitle('If the environment changed (for example, a different colored background), predict how the trait frequency would shift over 5 generations.\n\nExplain your reasoning.')
    .setHelpText(
      'Think about:\n' +
      '- Which color would now be hardest to see?\n' +
      '- How would survival rates change?\n' +
      '- What would happen to the population over time?'
    )
    .setRequired(true);

  logFormInfo_(form, 'G8 Station 2', 20);
  return form;
}

// ============================================================================
// FORM 4: STATION 3 - DESIGN A SURVIVOR (25 points)
// ============================================================================

function createG8Station3_() {
  const form = FormApp.create('G8.C3.W1: Station 3 - Design a Survivor');

  form.setDescription(
    'ENGINEERING CHALLENGE: DESIGN A SURVIVOR\n\n' +
    'Design an organism optimized to survive predation pressure.\n' +
    'You MUST use physics principles (F=ma, momentum) to justify your choices!\n\n' +
    '---\n' +
    'Time: About 20 minutes\n' +
    'Points: 25 total (highest value station!)\n\n' +
    'CONSTRAINTS:\n' +
    '- Your organism lives in open grassland\n' +
    '- Main predator: wolves (can run 35 mph)\n' +
    '- You must choose a mass for your organism\n' +
    '- You must calculate the force needed to escape'
  );

  form.setIsQuiz(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Station 3 complete!\n\n' +
    'Excellent work! You used physics to explain biological adaptations.\n' +
    'Real organisms evolved under similar constraints!\n\n' +
    'Continue to Exit Ticket'
  );

  // === PAGE 1: Environment Analysis ===
  form.addPageBreakItem()
    .setTitle('Part 1: Analyze the Environment')
    .setHelpText(
      'Your organism lives in an open grassland.\n' +
      'Main threats: wolves (35 mph, hunt in packs)\n' +
      'Additional challenges: little cover, hot summers, cold winters'
    );

  // Q1: Habitat dangers (5 pts - manual)
  form.addSectionHeaderItem()
    .setTitle('Question 1: Identify Survival Challenges (5 points)')
    .setHelpText(
      'MANUAL GRADING - 5 points\n' +
      '5 pts: Multiple dangers identified + predator details + environmental factors\n' +
      '4 pts: Main dangers with some detail\n' +
      '3 pts: Basic danger analysis\n' +
      '2 pts: Vague list\n' +
      '1 pt: Minimal attempt\n' +
      '0 pts: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Your organism lives in an open grassland with wolves as the main predator.\n\nList all the main dangers and survival challenges your organism faces.')
    .setHelpText(
      'Consider:\n' +
      '- Predator characteristics (speed, hunting style)\n' +
      '- Environment (open space, weather)\n' +
      '- Resource availability'
    )
    .setRequired(true);

  // === PAGE 2: Design Choices ===
  form.addPageBreakItem()
    .setTitle('Part 2: Design Your Organism');

  // Q2: Mass selection (5 pts - manual)
  form.addSectionHeaderItem()
    .setTitle('Question 2: Choose and Justify Mass (5 points)')
    .setHelpText(
      'MANUAL GRADING - 5 points\n' +
      '5 pts: Specific mass + F=ma justification + trade-off analysis\n' +
      '4 pts: Specific mass + physics justification\n' +
      '3 pts: Mass with weak reasoning\n' +
      '2 pts: Mass only, no reasoning\n' +
      '1 pt: No clear choice\n' +
      '0 pts: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Design your organism\'s mass.\n\nState a SPECIFIC number (in kg) and justify your choice using F=ma.\n\nExample: "My organism is ___ kg because..."')
    .setHelpText(
      'Remember from Station 1:\n' +
      '- Smaller mass = higher acceleration (for same force)\n' +
      '- Larger mass = more momentum, harder to stop\n' +
      '- What is the optimal balance for survival?'
    )
    .setRequired(true);

  // Q3: Force calculation (5 pts - manual)
  form.addSectionHeaderItem()
    .setTitle('Question 3: Calculate Escape Force (5 points)')
    .setHelpText(
      'MANUAL GRADING - 5 points\n' +
      '5 pts: Correct F=ma calculation with clear work and units\n' +
      '4 pts: Correct answer with work shown\n' +
      '3 pts: Correct setup, minor errors\n' +
      '2 pts: Attempt with significant errors\n' +
      '1 pt: Wrong approach\n' +
      '0 pts: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Your organism needs to accelerate at 15 m/s^2 to escape a wolf.\n\nUsing your chosen mass, what force must its legs generate?\n\nShow your work: F = m x a')
    .setHelpText(
      'Use F = m x a\n' +
      'F = (your mass in kg) x 15 m/s^2\n' +
      'Include units in your answer (Newtons)'
    )
    .setRequired(true);

  // === PAGE 3: Trade-offs and Integration ===
  form.addPageBreakItem()
    .setTitle('Part 3: Engineering Analysis');

  // Q4: Trade-offs (5 pts - manual)
  form.addSectionHeaderItem()
    .setTitle('Question 4: Design Trade-offs (5 points)')
    .setHelpText(
      'MANUAL GRADING - 5 points\n' +
      '5 pts: Multiple trade-offs with physics reasoning\n' +
      '4 pts: Trade-offs with some physics\n' +
      '3 pts: One clear trade-off explained\n' +
      '2 pts: Vague trade-off mentioned\n' +
      '1 pt: No trade-off thinking\n' +
      '0 pts: No response'
    );

  form.addParagraphTextItem()
    .setTitle('What did you sacrifice to optimize for survival?\n\nExample: "A larger body provides more strength but reduces acceleration because..."')
    .setHelpText(
      'Trade-offs to consider:\n' +
      '- Mass vs acceleration\n' +
      '- Speed vs endurance\n' +
      '- Size vs agility\n' +
      '- Strength vs energy cost'
    )
    .setRequired(true);

  // Q5: Integration paragraph (5 pts - manual)
  form.addSectionHeaderItem()
    .setTitle('Question 5: Connect Physics to Biology (5 points)')
    .setHelpText(
      'MANUAL GRADING - 5 points\n' +
      '5 pts: Clear physics-biology connection with multiple concepts integrated\n' +
      '4 pts: Good connection made\n' +
      '3 pts: Partial connection\n' +
      '2 pts: Weak connection\n' +
      '1 pt: No meaningful connection\n' +
      '0 pts: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Write a paragraph explaining how physics principles (force, acceleration, mass) influenced your biological design choices.')
    .setHelpText(
      'Connect concepts like:\n' +
      '- F = ma and escape ability\n' +
      '- Newton\'s Third Law and predator-prey contact\n' +
      '- Mass trade-offs and survival\n' +
      '- How physics drives natural selection'
    )
    .setRequired(true)
    .setValidation(FormApp.createParagraphTextValidation()
      .requireTextLengthGreaterThan(100)
      .build());

  logFormInfo_(form, 'G8 Station 3', 25);
  return form;
}

// ============================================================================
// FORM 5: EXIT TICKET - FORCES & EVOLUTION (20 points)
// ============================================================================

function createG8ExitTicket_() {
  const form = FormApp.create('G8.C3.W1: Exit Ticket - Forces & Evolution');

  form.setDescription(
    'EXIT TICKET: CONNECT PHYSICS TO EVOLUTION\n\n' +
    'Show you can apply Cycle 2 physics to understand natural selection.\n\n' +
    '---\n' +
    'Time: About 15 minutes\n' +
    'Points: 20 total\n\n' +
    'QUESTION TYPES:\n' +
    '- 2 questions on NEW content (natural selection)\n' +
    '- 2 questions SPIRALING back (forces)\n' +
    '- 1 INTEGRATION question (connects both)'
  );

  form.setIsQuiz(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'WEEK 1 COMPLETE! Congratulations!\n\n' +
    'You connected physics to evolutionary biology.\n\n' +
    'Key takeaways:\n' +
    '- Newton\'s Third Law: forces are always equal between interacting objects\n' +
    '- F=ma: smaller mass means greater acceleration (escape advantage)\n' +
    '- Natural selection changes population trait frequencies over time\n\n' +
    'NEXT WEEK: Why do whales have finger bones? Evidence of evolution!'
  );

  // === PAGE 1: New Content ===
  form.addPageBreakItem()
    .setTitle('NEW CONTENT: Natural Selection')
    .setHelpText('These questions test what you learned today about variation and selection.');

  // Q1: Natural selection explanation (4 pts - manual)
  form.addSectionHeaderItem()
    .setTitle('Question 1: Explain Natural Selection (4 points)')
    .setHelpText(
      'MANUAL GRADING - 4 points\n' +
      '4 pts: Variation + differential survival + frequency change over time\n' +
      '3 pts: Key concepts present but incomplete\n' +
      '2 pts: Partial understanding\n' +
      '1 pt: Vague or mostly incorrect\n' +
      '0 pts: No response'
    );

  form.addParagraphTextItem()
    .setTitle('Explain how variation in a population leads to natural selection in 2-3 sentences.')
    .setHelpText(
      'Include these ideas:\n' +
      '- Variation exists in populations\n' +
      '- Some traits help survival better than others\n' +
      '- Survivors reproduce more\n' +
      '- Population changes over time'
    )
    .setRequired(true);

  // === PAGE 2: Spiral ===
  form.addPageBreakItem()
    .setTitle('SPIRAL: Cycle 2 Forces Review')
    .setHelpText('These questions check that you still remember Newton\'s Laws.');

  // Q2: N3L MCQ (4 pts)
  const q2 = form.addMultipleChoiceItem()
    .setTitle('A 100 kg predator tackles a 50 kg prey. Compare the forces:')
    .setHelpText('Apply Newton\'s Third Law.')
    .setRequired(true);

  q2.setChoices([
    q2.createChoice('Predator exerts more force because it is bigger', false),
    q2.createChoice('Prey exerts more force because it is trying to escape', false),
    q2.createChoice('Forces are equal, but accelerations are different', true),
    q2.createChoice('Cannot compare forces without knowing velocities', false)
  ]);
  // NOTE: Shuffle choices manually in Forms UI (setShuffleOrder not available in API)
  q2.setPoints(4);
  q2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Newton\'s 3rd Law: forces are equal. The smaller prey has greater acceleration (a=F/m).')
      .build()
  );
  q2.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Newton\'s Third Law: forces are always equal. Mass determines acceleration (a = F/m), not force.')
      .build()
  );

  // Q3: Population math (4 pts - manual)
  form.addSectionHeaderItem()
    .setTitle('Question 3: Population Calculation (4 points)')
    .setHelpText(
      'MANUAL GRADING - 4 points\n' +
      '4 pts: Correct answer (about 88%) with clear work shown\n' +
      '3 pts: Correct answer\n' +
      '2 pts: Correct setup with calculation error\n' +
      '1 pt: Attempt with major errors\n' +
      '0 pts: No response\n\n' +
      'ANSWER KEY:\n' +
      'Fast survivors: 800 x 0.90 = 720\n' +
      'Slow survivors: 200 x 0.50 = 100\n' +
      'Total survivors: 820\n' +
      'Fast percentage: 720/820 = 87.8% (accept 88%)'
    );

  form.addParagraphTextItem()
    .setTitle(
      'A prey population has:\n' +
      '- 800 "fast" individuals (80%)\n' +
      '- 200 "slow" individuals (20%)\n\n' +
      'Each generation, predators kill:\n' +
      '- 10% of fast prey\n' +
      '- 50% of slow prey\n\n' +
      'After one generation, what percentage of SURVIVORS are fast?\n\nShow your work!'
    )
    .setHelpText(
      'Steps:\n' +
      '1. Calculate survivors of each type\n' +
      '2. Add to get total survivors\n' +
      '3. Calculate percentage that are fast'
    )
    .setRequired(true);

  // Q4: F=ma calculation (4 pts - manual)
  form.addSectionHeaderItem()
    .setTitle('Question 4: Force Calculation (4 points)')
    .setHelpText(
      'MANUAL GRADING - 4 points\n' +
      '4 pts: Correct answer (5 m/s^2) with work and units\n' +
      '3 pts: Correct answer\n' +
      '2 pts: Correct setup\n' +
      '1 pt: Attempt\n' +
      '0 pts: No response\n\n' +
      'ANSWER: a = F/m = 20N / 4kg = 5 m/s^2'
    );

  form.addTextItem()
    .setTitle('A 20 N force is applied to a 4 kg object.\n\nWhat is its acceleration?\n\nShow your work and include units.')
    .setHelpText('Use a = F / m')
    .setRequired(true);

  // === PAGE 3: Integration ===
  form.addPageBreakItem()
    .setTitle('INTEGRATION: Connect Physics and Evolution')
    .setHelpText('This question requires knowledge from BOTH Cycle 2 AND Cycle 3.');

  // Q5: Integration (4 pts - manual)
  form.addSectionHeaderItem()
    .setTitle('Question 5: Predict Population Change (4 points)')
    .setHelpText(
      'MANUAL GRADING - 4 points (3D Assessment)\n' +
      '4 pts: Natural selection mechanism + physics concepts + prediction over time\n' +
      '3 pts: Selection + physics OR detailed prediction\n' +
      '2 pts: One concept applied well\n' +
      '1 pt: Vague or Lamarckian thinking (individuals change)\n' +
      '0 pts: No response\n\n' +
      '3D Scoring:\n' +
      '- SEP: Does response use evidence-based prediction?\n' +
      '- DCI: Does response correctly apply natural selection?\n' +
      '- CCC: Does response identify cause-effect relationships?'
    );

  form.addParagraphTextItem()
    .setTitle(
      'A population of insects lives on tree bark. Some are brown, some are green.\n' +
      'A new predator (a bird that hunts by sight) arrives in the habitat.\n\n' +
      'Predict what happens to this population over 100 generations.\n\n' +
      'Explain using BOTH:\n' +
      '1. Natural selection concepts\n' +
      '2. Physics concepts (force, acceleration, escape)'
    )
    .setHelpText(
      'Consider:\n' +
      '- Which color is better camouflaged on bark?\n' +
      '- How does visibility affect survival?\n' +
      '- How might body size/mass affect escape ability?\n' +
      '- What happens to trait frequency over generations?'
    )
    .setRequired(true)
    .setValidation(FormApp.createParagraphTextValidation()
      .requireTextLengthGreaterThan(80)
      .build());

  logFormInfo_(form, 'G8 Exit Ticket', 20);
  return form;
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Logs form information to the console
 */
function logFormInfo_(form, name, points) {
  const editUrl = form.getEditUrl();
  const publishedUrl = form.getPublishedUrl();
  const embedUrl = publishedUrl.replace('/viewform', '/viewform?embedded=true');

  Logger.log('----------------------------------------');
  Logger.log(name + ' (' + points + ' points)');
  Logger.log('----------------------------------------');
  Logger.log('Edit URL:  ' + editUrl);
  Logger.log('View URL:  ' + publishedUrl);
  Logger.log('Embed URL: ' + embedUrl);
  Logger.log('');
}

/**
 * Test function - creates just the Hook form
 */
function testG8Hook() {
  const form = createG8Hook_();
  Logger.log('Test complete. Check the form in your Google Drive.');
}

/**
 * Delete all G8 forms created by this script (use with caution!)
 */
function deleteAllG8C3W1Forms() {
  const files = DriveApp.getFilesByName('G8.C3.W1:');
  while (files.hasNext()) {
    const file = files.next();
    Logger.log('Found: ' + file.getName());
    // Uncomment to actually delete:
    // file.setTrashed(true);
  }
}
