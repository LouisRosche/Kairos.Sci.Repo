/**
 * ═══════════════════════════════════════════════════════════════════════════
 * GRADE 8 CYCLE 8 WEEK 2: Insulation Engineering & Energy Conservation
 * STATUS: ✅ COMPLETE
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Target Date: June 2026
 * Topic: Insulation Engineering & Energy Conservation
 * Primary Standard: MS-PS3-4, MS-ETS1-2
 *
 * Phenomenon: "The Super-Insulator Mystery"
 * Your friend brings hot coffee in a cheap cup—it's cold within 30 minutes.
 * You bring the same coffee in a vacuum-insulated bottle—it stays hot for 12 hours.
 *
 * Forms Structure:
 * - Hook: The Super-Insulator Mystery (12 pts, ~10 min)
 * - Station 1: Insulation Material Analysis (20 pts, ~18 min)
 * - Station 2: Energy Conservation Calculations (20 pts, ~15 min)
 * - Station 3: Design an Insulated Container (25 pts, ~20 min)
 * - Exit Ticket: Insulation Engineering Integration (23 pts, ~15 min)
 *
 * Total: 100 points | ~78 minutes
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * GOOGLE FORMS API RULES (NON-NEGOTIABLE):
 * 1. setPoints() ONLY on auto-gradable items (MCQ, Checkbox, Scale)
 * 2. setShuffleOrder() does NOT exist - configure manually in UI
 * 3. Use requireTextLengthGreaterThanOrEqualTo(), NOT requireTextLengthGreaterThan()
 * 4. setRequireLogin(true) for verified email collection
 * 5. Feedback requires FormApp.createFeedback().setText().build()
 * 6. Scale items - omit setPoints() for diagnostics (ungraded)
 * 7. Checkbox grading is all-or-nothing
 * ═══════════════════════════════════════════════════════════════════════════
 */

/**
 * Main entry point - creates all Week 2 forms
 */
function createAllG8C8W2Forms() {
  const forms = {
    hook: createG8C8W2Hook_(),
    station1: createG8C8W2Station1_(),
    station2: createG8C8W2Station2_(),
    station3: createG8C8W2Station3_(),
    exitTicket: createG8C8W2ExitTicket_()
  };

  Logger.log('=== G8 C8 Week 2 Forms Created ===');
  Logger.log('Hook: ' + forms.hook.getEditUrl());
  Logger.log('Station 1: ' + forms.station1.getEditUrl());
  Logger.log('Station 2: ' + forms.station2.getEditUrl());
  Logger.log('Station 3: ' + forms.station3.getEditUrl());
  Logger.log('Exit Ticket: ' + forms.exitTicket.getEditUrl());

  return forms;
}

// ═══════════════════════════════════════════════════════════════════════════
// HOOK: The Super-Insulator Mystery (12 pts)
// ═══════════════════════════════════════════════════════════════════════════

function createG8C8W2Hook_() {
  const form = FormApp.create('G8.C8.W2: Hook - The Super-Insulator Mystery');
  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setDescription(
    'Grade 8 | Cycle 8 Week 2 | Insulation Engineering\n\n' +
    'PHENOMENON: Your friend brings hot coffee in a cheap cup—it\'s cold within 30 minutes. ' +
    'You bring the same coffee in a vacuum-insulated bottle—it stays hot for 12 hours. ' +
    'How can one container be 24 times better at keeping things hot?\n\n' +
    'DRIVING QUESTION: How can some containers keep drinks cold for 24+ hours?\n\n' +
    'Time: ~10 minutes | Points: 12'
  );

  // Q1: Phenomenon Observation (2 pts)
  const q1 = form.addMultipleChoiceItem();
  q1.setTitle('Q1. In the phenomenon, a vacuum-insulated bottle keeps coffee hot for 12 hours while a regular cup loses heat in 30 minutes. What does this tell us about the vacuum bottle?')
    .setHelpText('ID: g8_c8_w2_hook_q1 | DOK: 2 | Standard: MS-PS3-4')
    .setPoints(2)
    .setRequired(true)
    .setChoices([
      q1.createChoice('It produces heat to keep the coffee warm', false),
      q1.createChoice('It blocks or minimizes all three heat transfer mechanisms', true),
      q1.createChoice('It uses electricity to maintain temperature', false),
      q1.createChoice('It chemically reacts with the coffee to prevent cooling', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('✓ Correct! A vacuum bottle is engineered to minimize conduction, convection, AND radiation—all three mechanisms.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('✗ Consider what you learned last week: heat transfers by conduction, convection, and radiation. An effective insulator must address ALL three.')
      .build());

  // Q2: Week 1 Connection - Mechanisms Review (2 pts)
  const q2 = form.addMultipleChoiceItem();
  q2.setTitle('Q2. Last week we learned about heat transfer mechanisms. Which mechanism is BLOCKED by creating a vacuum (removing air)?')
    .setHelpText('ID: g8_c8_w2_hook_q2 | DOK: 2 | Standard: MS-PS3-4')
    .setPoints(2)
    .setRequired(true)
    .setChoices([
      q2.createChoice('Conduction only', false),
      q2.createChoice('Convection only', false),
      q2.createChoice('Both conduction and convection', true),
      q2.createChoice('Radiation only', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('✓ Correct! A vacuum removes air molecules, so there\'s nothing to conduct heat through or circulate (convect). Radiation can still pass through a vacuum.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('✗ Think about what each mechanism needs: Conduction needs particles touching. Convection needs fluid circulation. Radiation travels as waves. Which need matter to work?')
      .build());

  // Q3: Prior Knowledge - Engineering Design (2 pts)
  const q3 = form.addMultipleChoiceItem();
  q3.setTitle('Q3. Engineers designing insulated containers face trade-offs. Which is a real trade-off they must consider?')
    .setHelpText('ID: g8_c8_w2_hook_q3 | DOK: 2 | Standard: MS-ETS1-2')
    .setPoints(2)
    .setRequired(true)
    .setChoices([
      q3.createChoice('Better insulation always costs exactly the same', false),
      q3.createChoice('More insulation means bigger size and higher cost', true),
      q3.createChoice('Vacuum insulation has no disadvantages', false),
      q3.createChoice('All insulation materials work equally well', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('✓ Correct! Engineering involves trade-offs. Better insulation often means more material (bigger, heavier) and higher manufacturing costs.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('✗ Engineers must balance performance against constraints like cost, size, weight, and practicality. There\'s rarely a perfect solution.')
      .build());

  // Q4: Prediction (3 pts)
  const q4 = form.addParagraphTextItem();
  q4.setTitle('Q4. PREDICT: You\'re designing an insulated container to keep ice frozen for 24 hours. What THREE things would you include in your design, and how does EACH address a specific heat transfer mechanism?')
    .setHelpText('ID: g8_c8_w2_hook_q4 | DOK: 3 | Standard: MS-PS3-4, MS-ETS1-2 | Points: 3\n\nRUBRIC:\n3 pts: Names 3 design features AND correctly connects each to conduction, convection, or radiation\n2 pts: Names 3 features but only correctly connects 2 to mechanisms\n1 pt: Names features but connections are vague or incorrect\n0 pts: Incomplete or no connection to mechanisms')
    .setRequired(true)
    .setValidation(FormApp.createParagraphTextValidation()
      .requireTextLengthGreaterThanOrEqualTo(50)
      .build());

  // Q5: MTSS Diagnostic - Confidence (0 pts)
  const q5 = form.addScaleItem();
  q5.setTitle('Q5. How confident are you that you can design an effective insulated container?')
    .setHelpText('ID: g8_c8_w2_hook_q5 | MTSS Diagnostic | 0 pts')
    .setBounds(1, 5)
    .setLabels('Not confident at all', 'Very confident')
    .setRequired(true);
  // Note: No setPoints() - diagnostic only

  // Q6: Engagement (3 pts)
  const q6 = form.addMultipleChoiceItem();
  q6.setTitle('Q6. Think about real-world applications. Which product would MOST benefit from understanding all three heat transfer mechanisms?')
    .setHelpText('ID: g8_c8_w2_hook_q6 | DOK: 3 | Standard: MS-PS3-4')
    .setPoints(3)
    .setRequired(true)
    .setChoices([
      q6.createChoice('A paper towel roll', false),
      q6.createChoice('A spacecraft heat shield', true),
      q6.createChoice('A plastic ruler', false),
      q6.createChoice('A glass window pane', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('✓ Correct! Spacecraft heat shields must manage extreme radiation from the sun, conduction from re-entry heating, and convection from hot gases—all three mechanisms!')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('✗ Think about which product operates in extreme thermal conditions where ALL three mechanisms matter significantly.')
      .build());

  return form;
}

// ═══════════════════════════════════════════════════════════════════════════
// STATION 1: Insulation Material Analysis (20 pts)
// ═══════════════════════════════════════════════════════════════════════════

function createG8C8W2Station1_() {
  const form = FormApp.create('G8.C8.W2: Station 1 - Insulation Material Analysis');
  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setDescription(
    'Grade 8 | Cycle 8 Week 2 | Station 1\n\n' +
    'FOCUS: Test and compare insulation effectiveness of different materials.\n\n' +
    'KEY VOCABULARY: Insulation, R-value, thermal resistance, heat loss rate\n\n' +
    'Time: ~18 minutes | Points: 20'
  );

  // Q1: Material Testing Concept (3 pts)
  const q1 = form.addMultipleChoiceItem();
  q1.setTitle('Q1. You\'re testing insulation materials by wrapping identical containers and measuring temperature over time. What should you keep CONSTANT to make it a fair test?')
    .setHelpText('ID: g8_c8_w2_s1_q1 | DOK: 2 | Standard: MS-ETS1-2')
    .setPoints(3)
    .setRequired(true)
    .setChoices([
      q1.createChoice('The type of insulation material', false),
      q1.createChoice('Starting water temperature, water amount, room temperature, and container type', true),
      q1.createChoice('The final temperature after testing', false),
      q1.createChoice('The color of the container', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('✓ Correct! Controlled variables ensure a fair test. Only the insulation material should vary; everything else stays constant.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('✗ In a fair test, we change ONE variable (insulation type) and keep everything else the same. What factors could affect cooling rate besides insulation?')
      .build());

  // Q2: Data Interpretation (4 pts)
  const q2 = form.addMultipleChoiceItem();
  q2.setTitle('Q2. DATA: After 15 minutes, containers with different insulation show these temperatures:\n• No insulation: 45°C\n• Newspaper: 55°C\n• Foam: 65°C\n• Foil + foam: 70°C\n\nAll started at 80°C. Which conclusion is BEST supported by this data?')
    .setHelpText('ID: g8_c8_w2_s1_q2 | DOK: 3 | Standard: MS-PS3-4')
    .setPoints(4)
    .setRequired(true)
    .setChoices([
      q2.createChoice('Foam is the best insulator because it costs less', false),
      q2.createChoice('Combining materials (foil + foam) provides better insulation than single materials alone', true),
      q2.createChoice('Newspaper is useless as insulation', false),
      q2.createChoice('The room temperature affected only the foil + foam container', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('✓ Correct! The data shows foil + foam retained the most heat (70°C vs 65°C for foam alone). Layering addresses multiple mechanisms: foam blocks conduction, foil reflects radiation.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('✗ Compare the temperatures carefully. Which container retained the most heat? What does that tell us about combining insulation strategies?')
      .build());

  // Q3: Rate of Heat Loss Calculation (4 pts)
  const q3 = form.addMultipleChoiceItem();
  q3.setTitle('Q3. CALCULATE: The no-insulation container dropped from 80°C to 45°C in 15 minutes. What is the rate of temperature loss in °C per minute?')
    .setHelpText('ID: g8_c8_w2_s1_q3 | DOK: 2 | Standard: MS-PS3-4')
    .setPoints(4)
    .setRequired(true)
    .setChoices([
      q3.createChoice('35°C/min', false),
      q3.createChoice('2.33°C/min', true),
      q3.createChoice('45°C/min', false),
      q3.createChoice('0.43°C/min', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('✓ Correct! Rate = Change ÷ Time = (80°C - 45°C) ÷ 15 min = 35°C ÷ 15 min = 2.33°C/min')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('✗ Rate of change = (Start - End) ÷ Time. The temperature dropped 35°C over 15 minutes. What\'s 35 ÷ 15?')
      .build());

  // Q4: Why Layering Works (3 pts)
  const q4 = form.addMultipleChoiceItem();
  q4.setTitle('Q4. Why does combining aluminum foil with foam insulation work better than foam alone?')
    .setHelpText('ID: g8_c8_w2_s1_q4 | DOK: 3 | Standard: MS-PS3-4')
    .setPoints(3)
    .setRequired(true)
    .setChoices([
      q4.createChoice('Foil makes the foam stronger', false),
      q4.createChoice('Foam blocks conduction while foil reflects radiation—addressing two mechanisms', true),
      q4.createChoice('The foil traps cold air inside', false),
      q4.createChoice('Foil conducts heat away faster', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('✓ Correct! Each material addresses a different mechanism: foam\'s air pockets reduce conduction, while shiny foil reflects infrared radiation. Together they\'re more effective.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('✗ Think about what each material does: Foam has air pockets (affects which mechanism?). Foil is shiny (affects which mechanism?). How do they complement each other?')
      .build());

  // Q5: Vacuum Bottle Analysis (3 pts)
  const q5 = form.addMultipleChoiceItem();
  q5.setTitle('Q5. A vacuum-insulated bottle has: (1) a vacuum between double walls, and (2) a reflective silver coating on the inner wall. How does this address all three mechanisms?')
    .setHelpText('ID: g8_c8_w2_s1_q5 | DOK: 3 | Standard: MS-PS3-4')
    .setPoints(3)
    .setRequired(true)
    .setChoices([
      q5.createChoice('Vacuum blocks radiation; silver blocks conduction and convection', false),
      q5.createChoice('Vacuum blocks conduction and convection (no air); silver reflects radiation', true),
      q5.createChoice('Vacuum blocks convection only; silver blocks conduction only', false),
      q5.createChoice('Both features only block radiation', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('✓ Correct! Without air, there\'s nothing to conduct heat or circulate (no conduction/convection). The silver coating reflects infrared radiation, blocking the third mechanism.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('✗ Review: Conduction needs particle contact. Convection needs fluid movement. Radiation travels as EM waves. A vacuum has no particles. Silver is reflective. Match each feature to what it blocks.')
      .build());

  // Q6: Application Analysis (3 pts)
  const q6 = form.addParagraphTextItem();
  q6.setTitle('Q6. ANALYZE: A cooler company claims their product "blocks all heat transfer." Based on your understanding of the three mechanisms, is this claim possible? Explain what they likely mean and what a more accurate claim would be.')
    .setHelpText('ID: g8_c8_w2_s1_q6 | DOK: 4 | Standard: MS-PS3-4 | Points: 3\n\nRUBRIC:\n3 pts: Correctly states 100% blocking is impossible AND explains why (2nd Law, some transfer always occurs) AND suggests accurate alternative claim (e.g., "minimizes" or "reduces by X%")\n2 pts: Identifies claim as exaggerated but explanation incomplete OR alternative claim missing\n1 pt: Basic understanding shown but significant gaps in reasoning\n0 pts: Accepts claim at face value or no scientific reasoning')
    .setRequired(true)
    .setValidation(FormApp.createParagraphTextValidation()
      .requireTextLengthGreaterThanOrEqualTo(75)
      .build());

  return form;
}

// ═══════════════════════════════════════════════════════════════════════════
// STATION 2: Energy Conservation Calculations (20 pts)
// ═══════════════════════════════════════════════════════════════════════════

function createG8C8W2Station2_() {
  const form = FormApp.create('G8.C8.W2: Station 2 - Energy Conservation Calculations');
  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setDescription(
    'Grade 8 | Cycle 8 Week 2 | Station 2\n\n' +
    'FOCUS: Calculate heat energy transfer using Q = m × c × ΔT\n\n' +
    'KEY FORMULA: Energy (Q) = mass (m) × specific heat (c) × temperature change (ΔT)\n' +
    'For water: c = 4.18 J/g°C\n\n' +
    'Time: ~15 minutes | Points: 20'
  );

  // Q1: Formula Understanding (3 pts)
  const q1 = form.addMultipleChoiceItem();
  q1.setTitle('Q1. The formula Q = m × c × ΔT calculates heat energy. In this formula, what does "c" represent?')
    .setHelpText('ID: g8_c8_w2_s2_q1 | DOK: 1 | Standard: MS-PS3-4')
    .setPoints(3)
    .setRequired(true)
    .setChoices([
      q1.createChoice('The speed of light', false),
      q1.createChoice('The specific heat capacity—energy needed to raise 1 gram by 1°C', true),
      q1.createChoice('The Celsius temperature', false),
      q1.createChoice('The container volume', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('✓ Correct! Specific heat capacity (c) tells us how much energy it takes to heat that substance. Water has a high specific heat (4.18 J/g°C), making it excellent for thermal storage.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('✗ In Q = m × c × ΔT: Q = energy (Joules), m = mass (grams), ΔT = temperature change (°C). What\'s left must be specific heat!')
      .build());

  // Q2: Basic Calculation (4 pts)
  const q2 = form.addMultipleChoiceItem();
  q2.setTitle('Q2. CALCULATE: 500g of water cools from 80°C to 40°C. How much energy was lost?\n\n(Use c = 4.18 J/g°C)')
    .setHelpText('ID: g8_c8_w2_s2_q2 | DOK: 2 | Standard: MS-PS3-4')
    .setPoints(4)
    .setRequired(true)
    .setChoices([
      q2.createChoice('83,600 J', true),
      q2.createChoice('8,360 J', false),
      q2.createChoice('167,200 J', false),
      q2.createChoice('20,900 J', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('✓ Correct! Q = m × c × ΔT = 500g × 4.18 J/g°C × (80-40)°C = 500 × 4.18 × 40 = 83,600 J')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('✗ Step by step: ΔT = 80°C - 40°C = 40°C. Then Q = 500 × 4.18 × 40. Try the calculation again.')
      .build());

  // Q3: Reverse Calculation (4 pts)
  const q3 = form.addMultipleChoiceItem();
  q3.setTitle('Q3. CALCULATE: A container loses 84,000 J of heat energy. If it contained 500g of water starting at 90°C, what is the final temperature?\n\n(Use c = 4.18 J/g°C)')
    .setHelpText('ID: g8_c8_w2_s2_q3 | DOK: 3 | Standard: MS-PS3-4')
    .setPoints(4)
    .setRequired(true)
    .setChoices([
      q3.createChoice('50°C', false),
      q3.createChoice('70°C', false),
      q3.createChoice('Approximately 50°C (about 49.8°C)', true),
      q3.createChoice('30°C', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('✓ Correct! Rearrange: ΔT = Q ÷ (m × c) = 84,000 ÷ (500 × 4.18) = 84,000 ÷ 2,090 ≈ 40.2°C. Final = 90°C - 40.2°C ≈ 49.8°C ≈ 50°C')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('✗ Rearrange the formula: Q = m × c × ΔT becomes ΔT = Q ÷ (m × c). Calculate ΔT, then subtract from starting temperature.')
      .build());

  // Q4: Comparison Problem (4 pts)
  const q4 = form.addMultipleChoiceItem();
  q4.setTitle('Q4. COMPARE: Which lost MORE energy?\nA) 100g of water cooling from 90°C to 40°C (a 50°C drop)\nB) 300g of water cooling from 70°C to 50°C (a 20°C drop)')
    .setHelpText('ID: g8_c8_w2_s2_q4 | DOK: 3 | Standard: MS-PS3-4')
    .setPoints(4)
    .setRequired(true)
    .setChoices([
      q4.createChoice('A lost more energy (larger temperature drop)', false),
      q4.createChoice('B lost more energy (larger mass)', true),
      q4.createChoice('They lost the same energy', false),
      q4.createChoice('Cannot determine without knowing container type', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('✓ Correct! A: Q = 100 × 4.18 × 50 = 20,900 J. B: Q = 300 × 4.18 × 20 = 25,080 J. The larger mass in B compensates for the smaller temperature change.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('✗ Calculate both: Q = m × c × ΔT for each. A has smaller mass but bigger ΔT. B has bigger mass but smaller ΔT. Which product is larger?')
      .build());

  // Q5: Energy Conservation Concept (2 pts)
  const q5 = form.addMultipleChoiceItem();
  q5.setTitle('Q5. When a cup of hot water cools down, energy is "lost" from the water. Where does this energy actually go?')
    .setHelpText('ID: g8_c8_w2_s2_q5 | DOK: 2 | Standard: MS-PS3-4 | Spiral: Cycle 7')
    .setPoints(2)
    .setRequired(true)
    .setChoices([
      q5.createChoice('It is destroyed—energy disappears when things cool', false),
      q5.createChoice('It transfers to the surrounding air and container—energy is conserved', true),
      q5.createChoice('It converts to mass inside the cup', false),
      q5.createChoice('It stays in the water but becomes invisible', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('✓ Correct! Law of Conservation of Energy: energy cannot be created or destroyed, only transferred. The "lost" heat went to the surroundings.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('✗ Remember from Cycle 7: Energy is conserved! It doesn\'t disappear—it transfers to something else. What\'s around the cup that could receive heat energy?')
      .build());

  // Q6: Real-World Application (3 pts)
  const q6 = form.addParagraphTextItem();
  q6.setTitle('Q6. APPLY: A homeowner notices their 200L hot water heater (200,000g of water) cools from 60°C to 50°C overnight, losing 8,360,000 J of energy. If electricity costs $0.10 per 1,000,000 J, how much money is wasted per night? How could better insulation help?')
    .setHelpText('ID: g8_c8_w2_s2_q6 | DOK: 4 | Standard: MS-PS3-4, MS-ETS1-2 | Points: 3\n\nRUBRIC:\n3 pts: Correctly calculates cost ($0.84/night) AND explains how insulation reduces heat loss AND connects to heat transfer mechanisms\n2 pts: Correct calculation but incomplete insulation explanation\n1 pt: Calculation attempted with errors OR only vague mention of insulation\n0 pts: No calculation or connection to insulation')
    .setRequired(true)
    .setValidation(FormApp.createParagraphTextValidation()
      .requireTextLengthGreaterThanOrEqualTo(50)
      .build());

  return form;
}

// ═══════════════════════════════════════════════════════════════════════════
// STATION 3: Design an Insulated Container (25 pts)
// ═══════════════════════════════════════════════════════════════════════════

function createG8C8W2Station3_() {
  const form = FormApp.create('G8.C8.W2: Station 3 - Design an Insulated Container');
  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setDescription(
    'Grade 8 | Cycle 8 Week 2 | Station 3\n\n' +
    'ENGINEERING CHALLENGE: Design an insulated container to keep ice frozen as long as possible.\n\n' +
    'CONSTRAINTS:\n' +
    '• Maximum material cost: $5\n' +
    '• Size limit: 20cm × 20cm × 20cm\n' +
    '• Must be able to open/close to check ice\n' +
    '• No active cooling (ice packs, electricity)\n\n' +
    'Time: ~20 minutes | Points: 25'
  );

  // Q1: Constraint Understanding (3 pts)
  const q1 = form.addMultipleChoiceItem();
  q1.setTitle('Q1. The design challenge has a $5 budget constraint. Why do engineers work with budget constraints instead of unlimited resources?')
    .setHelpText('ID: g8_c8_w2_s3_q1 | DOK: 2 | Standard: MS-ETS1-2')
    .setPoints(3)
    .setRequired(true)
    .setChoices([
      q1.createChoice('Constraints are just for school projects, not real engineering', false),
      q1.createChoice('Constraints force creative solutions and ensure practical, affordable designs', true),
      q1.createChoice('Engineers prefer simple solutions that don\'t work well', false),
      q1.createChoice('Budget constraints only matter for cheap products', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('✓ Correct! Real engineers always face constraints. Budget limits encourage innovation—finding the BEST solution within limitations, not just ANY solution.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('✗ Think about real products: Why aren\'t all coolers vacuum-insulated? Why aren\'t all houses built like spacecraft? Constraints shape practical design.')
      .build());

  // Q2: Material Selection - Conduction (4 pts)
  const q2 = form.addCheckboxItem();
  q2.setTitle('Q2. Which materials would BEST reduce CONDUCTION in your design? Select all that apply.')
    .setHelpText('ID: g8_c8_w2_s3_q2 | DOK: 2 | Standard: MS-PS3-4 | Select ALL correct answers')
    .setPoints(4)
    .setRequired(true)
    .setChoices([
      q2.createChoice('Foam sheet ($1.00) - contains trapped air pockets', true),
      q2.createChoice('Aluminum foil ($0.25) - shiny metal surface', false),
      q2.createChoice('Cotton batting ($0.50) - fluffy material with air gaps', true),
      q2.createChoice('Cardboard ($0.50) - rigid paper material', true),
      q2.createChoice('Plastic wrap ($0.25) - thin flexible film', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('✓ Correct! Foam, cotton batting, and cardboard all have low thermal conductivity because they contain air pockets or have porous structures. Air is a poor conductor!')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('✗ Conduction is blocked by materials with LOW thermal conductivity. Air is a great insulator. Which materials trap air or have poor heat conduction? Foil reflects (radiation) but conducts well.')
      .build());

  // Q3: Material Selection - Radiation (3 pts)
  const q3 = form.addMultipleChoiceItem();
  q3.setTitle('Q3. Which material would BEST reduce RADIATION heat transfer in your design?')
    .setHelpText('ID: g8_c8_w2_s3_q3 | DOK: 2 | Standard: MS-PS3-4')
    .setPoints(3)
    .setRequired(true)
    .setChoices([
      q3.createChoice('Foam sheet - thick and insulating', false),
      q3.createChoice('Aluminum foil - reflective surface bounces infrared waves', true),
      q3.createChoice('Cotton batting - fluffy and soft', false),
      q3.createChoice('Cardboard - rigid structure', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('✓ Correct! Radiation transfers heat as infrared waves. Shiny, reflective surfaces like aluminum foil reflect these waves rather than absorbing them.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('✗ Radiation is electromagnetic waves (like light). What happens when light hits a mirror vs. a dark surface? Shiny surfaces REFLECT radiation.')
      .build());

  // Q4: Design Plan (5 pts)
  const q4 = form.addParagraphTextItem();
  q4.setTitle('Q4. DESIGN PLAN: Create your insulated container design. Include:\n1. List of materials with costs (must total ≤$5)\n2. How you\'ll arrange the layers\n3. How EACH material addresses a specific mechanism (conduction, convection, or radiation)')
    .setHelpText('ID: g8_c8_w2_s3_q4 | DOK: 4 | Standard: MS-ETS1-2, MS-PS3-4 | Points: 5\n\nRUBRIC:\n5 pts: Materials listed with costs ≤$5 AND logical layer arrangement AND all three mechanisms addressed with correct explanations\n4 pts: Budget met, good arrangement, but one mechanism incorrectly addressed\n3 pts: Budget met but only 2 mechanisms clearly addressed\n2 pts: Budget exceeded OR only 1 mechanism addressed\n1 pt: Attempt made but significant gaps in design logic\n0 pts: No meaningful design or way over budget')
    .setRequired(true)
    .setValidation(FormApp.createParagraphTextValidation()
      .requireTextLengthGreaterThanOrEqualTo(100)
      .build());

  // Q5: Prediction with Reasoning (5 pts)
  const q5 = form.addParagraphTextItem();
  q5.setTitle('Q5. PREDICT: How long do you think your design will keep an ice cube frozen (in hours)? Explain your reasoning by referencing which mechanism you think is your design\'s STRENGTH and which is its WEAKNESS.')
    .setHelpText('ID: g8_c8_w2_s3_q5 | DOK: 4 | Standard: MS-PS3-4, MS-ETS1-2 | Points: 5\n\nRUBRIC:\n5 pts: Reasonable time prediction AND correctly identifies strongest mechanism with explanation AND acknowledges specific weakness with explanation\n4 pts: Good prediction and reasoning but strength/weakness analysis incomplete\n3 pts: Prediction made with partial reasoning about mechanisms\n2 pts: Prediction without mechanism connection OR unrealistic prediction\n1 pt: Minimal attempt\n0 pts: No prediction or reasoning')
    .setRequired(true)
    .setValidation(FormApp.createParagraphTextValidation()
      .requireTextLengthGreaterThanOrEqualTo(75)
      .build());

  // Q6: Trade-off Analysis (5 pts)
  const q6 = form.addParagraphTextItem();
  q6.setTitle('Q6. TRADE-OFF ANALYSIS: If you had $10 instead of $5, what would you add or change? Explain how this would improve performance and which mechanism it would better address.')
    .setHelpText('ID: g8_c8_w2_s3_q6 | DOK: 4 | Standard: MS-ETS1-2 | Points: 5\n\nRUBRIC:\n5 pts: Specific material/design change with cost AND clear performance improvement explanation AND correct mechanism connection\n4 pts: Good improvement idea but cost or mechanism explanation incomplete\n3 pts: Reasonable improvement but weak connection to mechanisms\n2 pts: Vague improvement without cost consideration or mechanism link\n1 pt: Minimal response\n0 pts: No response or irrelevant')
    .setRequired(true)
    .setValidation(FormApp.createParagraphTextValidation()
      .requireTextLengthGreaterThanOrEqualTo(50)
      .build());

  return form;
}

// ═══════════════════════════════════════════════════════════════════════════
// EXIT TICKET: Insulation Engineering Integration (23 pts)
// ═══════════════════════════════════════════════════════════════════════════

function createG8C8W2ExitTicket_() {
  const form = FormApp.create('G8.C8.W2: Exit Ticket - Insulation Engineering Integration');
  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setDescription(
    'Grade 8 | Cycle 8 Week 2 | Exit Ticket\n\n' +
    'Structure: 2 NEW + 2 SPIRAL + 1 INTEGRATION + 1 SEP-3\n\n' +
    'Time: ~15 minutes | Points: 23'
  );

  // Q1: NEW - Insulation Effectiveness (4 pts)
  const q1 = form.addMultipleChoiceItem();
  q1.setTitle('Q1. NEW: A company tests two insulation designs:\n• Design A: Single thick layer of foam (3 cm)\n• Design B: Three thin layers—foam (1 cm) + air gap + foil\n\nBoth use the same amount of material. Which will likely perform better and why?')
    .setHelpText('ID: g8_c8_w2_exit_q1 | DOK: 3 | Standard: MS-PS3-4')
    .setPoints(4)
    .setRequired(true)
    .setChoices([
      q1.createChoice('Design A—thicker foam means better insulation', false),
      q1.createChoice('Design B—layering addresses multiple mechanisms (conduction, convection, radiation)', true),
      q1.createChoice('They will perform equally—same material amount', false),
      q1.createChoice('Design A—air gaps reduce insulation effectiveness', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('✓ Correct! Design B addresses all three mechanisms: foam reduces conduction, air gap reduces conduction/convection, and foil reflects radiation. Multi-mechanism blocking beats single-mechanism insulation.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('✗ Think about what each design blocks: Design A addresses mainly conduction. Design B addresses conduction (foam), convection (air gap), AND radiation (foil). Which is more comprehensive?')
      .build());

  // Q2: NEW - Energy Calculation Application (4 pts)
  const q2 = form.addMultipleChoiceItem();
  q2.setTitle('Q2. NEW: Two thermos bottles each contain 400g of water. Bottle A loses 50,000 J overnight. Bottle B loses 15,000 J. Using Q = mcΔT (c = 4.18), approximately how much MORE did Bottle A\'s water temperature drop?')
    .setHelpText('ID: g8_c8_w2_exit_q2 | DOK: 3 | Standard: MS-PS3-4')
    .setPoints(4)
    .setRequired(true)
    .setChoices([
      q2.createChoice('About 10°C more', false),
      q2.createChoice('About 21°C more', true),
      q2.createChoice('About 35°C more', false),
      q2.createChoice('About 5°C more', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('✓ Correct! ΔT = Q/(mc). Bottle A: 50,000/(400×4.18) ≈ 30°C drop. Bottle B: 15,000/(400×4.18) ≈ 9°C drop. Difference: 30 - 9 = 21°C more.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('✗ Calculate each: ΔT = Q ÷ (m × c). For Bottle A: 50,000 ÷ (400 × 4.18). For Bottle B: 15,000 ÷ (400 × 4.18). Find the difference.')
      .build());

  // Q3: SPIRAL - Week 1 Heat Transfer (4 pts)
  const q3 = form.addMultipleChoiceItem();
  q3.setTitle('Q3. SPIRAL (Week 1): A pot of boiling water transfers heat to a wooden spoon handle. Which statement is correct about this heat transfer?')
    .setHelpText('ID: g8_c8_w2_exit_q3 | DOK: 2 | Standard: MS-PS3-4 | Spiral: Week 1')
    .setPoints(4)
    .setRequired(true)
    .setChoices([
      q3.createChoice('Heat transfers by convection through the wood', false),
      q3.createChoice('Heat transfers by conduction—particles pass energy through contact', true),
      q3.createChoice('Heat transfers by radiation through the spoon', false),
      q3.createChoice('Cold transfers from the handle to the water', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('✓ Correct! Conduction occurs through direct particle contact. Energy transfers from fast-moving water particles to wood particles, which then pass energy along the spoon handle.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('✗ Review from Week 1: Conduction = through direct contact. Convection = fluid circulation. Radiation = EM waves. Which describes particle-to-particle energy transfer through a solid?')
      .build());

  // Q4: SPIRAL - Cycle 7 Energy Conservation (4 pts)
  const q4 = form.addMultipleChoiceItem();
  q4.setTitle('Q4. SPIRAL (Cycle 7): When a chemical reaction releases heat (exothermic), what happens to the total energy in the system?')
    .setHelpText('ID: g8_c8_w2_exit_q4 | DOK: 2 | Standard: MS-PS1-2 | Spiral: Cycle 7')
    .setPoints(4)
    .setRequired(true)
    .setChoices([
      q4.createChoice('Energy is created during the reaction', false),
      q4.createChoice('Energy is destroyed and converted to heat', false),
      q4.createChoice('Total energy remains constant—chemical potential energy converts to thermal energy', true),
      q4.createChoice('Energy disappears from the reactants', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('✓ Correct! Conservation of energy: Energy transforms between forms but is never created or destroyed. Chemical bonds break (energy in) and form (energy out), with net release as heat.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('✗ Law of Conservation of Energy from Cycle 7: Energy cannot be created or destroyed, only transformed. Exothermic reactions convert chemical energy to thermal energy.')
      .build());

  // Q5: INTEGRATION - All Three Mechanisms (4 pts)
  const q5 = form.addParagraphTextItem();
  q5.setTitle('Q5. INTEGRATION: A homeowner wants to reduce heating costs. Their house loses heat through: (1) thin windows, (2) air leaks around doors, and (3) an uninsulated attic facing the sun. For EACH problem, identify the PRIMARY mechanism involved and suggest a specific solution.')
    .setHelpText('ID: g8_c8_w2_exit_q5 | DOK: 4 | Standard: MS-PS3-4, MS-ETS1-2 | Points: 4\n\nRUBRIC:\n4 pts: All three problems correctly matched to mechanisms (conduction, convection, radiation) AND appropriate solutions for each\n3 pts: Two problems correctly matched with solutions\n2 pts: One correct match with solution OR three matches without appropriate solutions\n1 pt: Shows understanding of mechanisms but poor application\n0 pts: No correct mechanism identification')
    .setRequired(true)
    .setValidation(FormApp.createParagraphTextValidation()
      .requireTextLengthGreaterThanOrEqualTo(100)
      .build());

  // Q6: SEP-3 - Design Investigation (3 pts)
  const q6 = form.addParagraphTextItem();
  q6.setTitle('Q6. SEP-3: You want to test whether adding a second layer of foil improves your container design. Describe the investigation you would design, including: (1) What you would measure, (2) What you would keep constant, and (3) How you would know if the second layer helped.')
    .setHelpText('ID: g8_c8_w2_exit_q6 | DOK: 3 | Standard: MS-ETS1-2, SEP-3 | Points: 3\n\nRUBRIC:\n3 pts: Clear measurement described AND at least 2 controlled variables AND valid comparison method (e.g., temperature after same time, OR time to melt)\n2 pts: Measurement and comparison clear but controlled variables weak\n1 pt: Basic investigation idea but missing key elements\n0 pts: No valid investigation described')
    .setRequired(true)
    .setValidation(FormApp.createParagraphTextValidation()
      .requireTextLengthGreaterThanOrEqualTo(75)
      .build());

  return form;
}
