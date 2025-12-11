/**
 * ═══════════════════════════════════════════════════════════════════════════
 * GRADE 8 CYCLE 8 WEEK 3: Year-End Integration & Engineering Showcase
 * STATUS: ✅ COMPLETE
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Target Date: June 2026
 * Topic: Year-End Integration & Engineering Showcase
 * Primary Standard: MS-PS3-4, MS-ETS1-2
 *
 * SPECIAL STRUCTURE: Year-End Integration Week
 * This week combines Cycle 8 content assessment with Year-End Integration:
 * - Day 1: Engineering Showcase Preparation (20 pts)
 * - Day 2: Engineering Showcase Presentations (40 pts)
 * - Day 3: Cycle 8 Assessment (25 pts) + CCC Synthesis (10 pts) + Reflection (5 pts)
 *
 * Forms Structure (NOT standard Hook/Station):
 * - Day 1: Engineering Showcase Preparation (20 pts)
 * - Day 2: Engineering Showcase Evaluation (40 pts)
 * - Day 3a: Cycle 8 Cumulative Assessment (25 pts)
 * - Day 3b: CCC Synthesis & Year-End Reflection (15 pts)
 *
 * Total: 100 points
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
 * Main entry point - creates all Week 3 forms
 */
function createAllG8C8W3Forms() {
  const forms = {
    day1: createG8C8W3Day1_(),
    day2: createG8C8W3Day2_(),
    day3Assessment: createG8C8W3Day3Assessment_(),
    day3Reflection: createG8C8W3Day3Reflection_()
  };

  Logger.log('=== G8 C8 Week 3 Forms Created ===');
  Logger.log('Day 1 (Showcase Prep): ' + forms.day1.getEditUrl());
  Logger.log('Day 2 (Showcase Evaluation): ' + forms.day2.getEditUrl());
  Logger.log('Day 3a (Assessment): ' + forms.day3Assessment.getEditUrl());
  Logger.log('Day 3b (Reflection): ' + forms.day3Reflection.getEditUrl());

  return forms;
}

// ═══════════════════════════════════════════════════════════════════════════
// DAY 1: Engineering Showcase Preparation (20 pts)
// ═══════════════════════════════════════════════════════════════════════════

function createG8C8W3Day1_() {
  const form = FormApp.create('G8.C8.W3: Day 1 - Engineering Showcase Preparation');
  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setDescription(
    'Grade 8 | Cycle 8 Week 3 | Day 1\n\n' +
    'YEAR-END INTEGRATION: Engineering Showcase Preparation\n\n' +
    'Today you will:\n' +
    '• Complete final testing of your insulated container\n' +
    '• Record performance data\n' +
    '• Prepare your presentation explaining your design decisions\n\n' +
    'Time: ~60 minutes | Points: 20'
  );

  // ===== Design Finalization Section (10 pts) =====
  form.addSectionHeaderItem()
    .setTitle('Part A: Design Finalization & Testing')
    .setHelpText('Record your final test results (10 pts)');

  // Q1: Design Summary (2 pts)
  const q1 = form.addParagraphTextItem();
  q1.setTitle('Q1. DESIGN SUMMARY: List your final materials, their costs, and your total budget usage.')
    .setHelpText('ID: g8_c8_w3_d1_q1 | Points: 2\n\nRUBRIC:\n2 pts: All materials listed with costs, total ≤$5, organized clearly\n1 pt: Materials listed but costs missing or budget exceeded\n0 pts: Incomplete or significantly over budget')
    .setRequired(true)
    .setValidation(FormApp.createParagraphTextValidation()
      .requireTextLengthGreaterThanOrEqualTo(30)
      .build());

  // Q2: Test Data - Starting Mass (1 pt)
  const q2 = form.addTextItem();
  q2.setTitle('Q2. TEST DATA: Record your starting ice cube mass (in grams).')
    .setHelpText('ID: g8_c8_w3_d1_q2 | Points: 1 | Enter a number (e.g., 25)')
    .setRequired(true)
    .setValidation(FormApp.createTextValidation()
      .requireNumber()
      .build());

  // Q3: Test Data - Mass at Intervals (2 pts)
  const q3 = form.addParagraphTextItem();
  q3.setTitle('Q3. TEST DATA: Record the remaining ice mass at each interval:\n• 30 minutes: ___g\n• 60 minutes: ___g\n• 120 minutes (2 hours): ___g')
    .setHelpText('ID: g8_c8_w3_d1_q3 | Points: 2\n\nRUBRIC:\n2 pts: All three measurements recorded with realistic progression\n1 pt: Only 1-2 measurements OR unrealistic data\n0 pts: No data recorded')
    .setRequired(true)
    .setValidation(FormApp.createParagraphTextValidation()
      .requireTextLengthGreaterThanOrEqualTo(20)
      .build());

  // Q4: Performance Score Calculation (2 pts)
  const q4 = form.addMultipleChoiceItem();
  q4.setTitle('Q4. CALCULATE: If you started with 30g of ice and had 18g remaining after 2 hours, what is your performance score (% remaining)?')
    .setHelpText('ID: g8_c8_w3_d1_q4 | DOK: 2 | Points: 2')
    .setPoints(2)
    .setRequired(true)
    .setChoices([
      q4.createChoice('40%', false),
      q4.createChoice('60%', true),
      q4.createChoice('67%', false),
      q4.createChoice('18%', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('✓ Correct! Performance = (Remaining ÷ Starting) × 100 = (18 ÷ 30) × 100 = 60%')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('✗ Performance = (Remaining mass ÷ Starting mass) × 100. Try: (18 ÷ 30) × 100')
      .build());

  // Q5: Your Performance Score (1 pt)
  const q5 = form.addTextItem();
  q5.setTitle('Q5. YOUR DATA: Calculate YOUR performance score (% of ice remaining after 2 hours). Enter just the number.')
    .setHelpText('ID: g8_c8_w3_d1_q5 | Points: 1 | Enter a percentage as a number (e.g., 65)')
    .setRequired(true)
    .setValidation(FormApp.createTextValidation()
      .requireNumberBetween(0, 100)
      .build());

  // Q6: Mechanism Analysis (2 pts)
  const q6 = form.addParagraphTextItem();
  q6.setTitle('Q6. ANALYSIS: Based on your test results, which heat transfer mechanism do you think your design blocked BEST? Which did it block LEAST effectively? Provide evidence from your data or observations.')
    .setHelpText('ID: g8_c8_w3_d1_q6 | DOK: 4 | Points: 2\n\nRUBRIC:\n2 pts: Identifies strongest AND weakest mechanism with specific evidence or reasoning\n1 pt: Identifies mechanisms but evidence unclear\n0 pts: No mechanism identification or pure guessing')
    .setRequired(true)
    .setValidation(FormApp.createParagraphTextValidation()
      .requireTextLengthGreaterThanOrEqualTo(75)
      .build());

  // ===== Presentation Preparation Section (10 pts) =====
  form.addSectionHeaderItem()
    .setTitle('Part B: Presentation Preparation')
    .setHelpText('Prepare your 4-minute presentation (10 pts)');

  // Q7: Problem Statement Draft (2 pts)
  const q7 = form.addParagraphTextItem();
  q7.setTitle('Q7. PRESENTATION ELEMENT 1: Write your problem statement and constraints (this should take ~30 seconds to present).')
    .setHelpText('ID: g8_c8_w3_d1_q7 | Points: 2\n\nRUBRIC:\n2 pts: Clear problem statement AND mentions key constraints (budget, size, no active cooling)\n1 pt: Problem stated but constraints missing or unclear\n0 pts: No clear problem statement')
    .setRequired(true)
    .setValidation(FormApp.createParagraphTextValidation()
      .requireTextLengthGreaterThanOrEqualTo(50)
      .build());

  // Q8: Design Explanation Draft (3 pts)
  const q8 = form.addParagraphTextItem();
  q8.setTitle('Q8. PRESENTATION ELEMENT 2: Write your design explanation. Include how each material addresses a specific heat transfer mechanism. (This should take ~1 minute to present).')
    .setHelpText('ID: g8_c8_w3_d1_q8 | DOK: 3 | Points: 3\n\nRUBRIC:\n3 pts: All materials explained with correct mechanism connections (conduction, convection, radiation)\n2 pts: Most materials explained but 1 mechanism incorrect or missing\n1 pt: Basic explanation without mechanism connections\n0 pts: No meaningful explanation')
    .setRequired(true)
    .setValidation(FormApp.createParagraphTextValidation()
      .requireTextLengthGreaterThanOrEqualTo(100)
      .build());

  // Q9: Results Summary (2 pts)
  const q9 = form.addParagraphTextItem();
  q9.setTitle('Q9. PRESENTATION ELEMENT 3: Summarize your test results with specific data. What claim can you make about your design\'s effectiveness? (~1 minute)')
    .setHelpText('ID: g8_c8_w3_d1_q9 | DOK: 3 | Points: 2\n\nRUBRIC:\n2 pts: Includes specific data AND makes evidence-based claim about effectiveness\n1 pt: Data or claim present but not both\n0 pts: No data or claim')
    .setRequired(true)
    .setValidation(FormApp.createParagraphTextValidation()
      .requireTextLengthGreaterThanOrEqualTo(50)
      .build());

  // Q10: Improvement Ideas (3 pts)
  const q10 = form.addParagraphTextItem();
  q10.setTitle('Q10. PRESENTATION ELEMENT 4: What would you improve if you did this again? Be specific about which mechanism you would address differently and why. (~30 seconds)')
    .setHelpText('ID: g8_c8_w3_d1_q10 | DOK: 4 | Points: 3\n\nRUBRIC:\n3 pts: Specific improvement AND correct mechanism connection AND reasoning based on test results\n2 pts: Good improvement idea but weak mechanism connection\n1 pt: Vague improvement without mechanism reasoning\n0 pts: No improvement idea or "nothing"')
    .setRequired(true)
    .setValidation(FormApp.createParagraphTextValidation()
      .requireTextLengthGreaterThanOrEqualTo(50)
      .build());

  return form;
}

// ═══════════════════════════════════════════════════════════════════════════
// DAY 2: Engineering Showcase Evaluation (40 pts)
// ═══════════════════════════════════════════════════════════════════════════

function createG8C8W3Day2_() {
  const form = FormApp.create('G8.C8.W3: Day 2 - Engineering Showcase Evaluation');
  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setDescription(
    'Grade 8 | Cycle 8 Week 3 | Day 2\n\n' +
    'YEAR-END INTEGRATION: Engineering Showcase\n\n' +
    'Today you will:\n' +
    '• Present your thermal container design (4 minutes)\n' +
    '• Evaluate your own presentation\n' +
    '• Provide feedback to peers\n\n' +
    'Time: ~75 minutes | Points: 40'
  );

  // ===== Self-Evaluation Section (20 pts) =====
  form.addSectionHeaderItem()
    .setTitle('Part A: Self-Evaluation (After Your Presentation)')
    .setHelpText('Evaluate your own presentation using the MS-ETS1-2 criteria (20 pts)');

  // Q1: Problem Definition (4 pts)
  const q1 = form.addMultipleChoiceItem();
  q1.setTitle('Q1. SELF-EVAL: Problem Definition - How clearly did you state the problem and constraints?')
    .setHelpText('ID: g8_c8_w3_d2_q1 | MS-ETS1-2 | Points: 4')
    .setPoints(4)
    .setRequired(true)
    .setChoices([
      q1.createChoice('4 - Excellent: Clearly stated problem with ALL constraints (budget, size, no active cooling)', true),
      q1.createChoice('3 - Good: Stated problem with MOST constraints mentioned', false),
      q1.createChoice('2 - Developing: Basic problem statement, constraints unclear', false),
      q1.createChoice('1 - Beginning: Problem unclear or constraints missing', false)
    ]);

  // Q2: Design Explanation (4 pts)
  const q2 = form.addMultipleChoiceItem();
  q2.setTitle('Q2. SELF-EVAL: Design Explanation - How well did you connect your design to thermal principles?')
    .setHelpText('ID: g8_c8_w3_d2_q2 | MS-PS3-4 | Points: 4')
    .setPoints(4)
    .setRequired(true)
    .setChoices([
      q2.createChoice('4 - Excellent: Connected ALL materials to specific mechanisms with clear explanations', true),
      q2.createChoice('3 - Good: Connected MOST materials to mechanisms correctly', false),
      q2.createChoice('2 - Developing: Some mechanism connections but gaps in explanation', false),
      q2.createChoice('1 - Beginning: Little connection between design and thermal principles', false)
    ]);

  // Q3: Evidence Presentation (4 pts)
  const q3 = form.addMultipleChoiceItem();
  q3.setTitle('Q3. SELF-EVAL: Evidence Presentation - How well did you use data to support claims?')
    .setHelpText('ID: g8_c8_w3_d2_q3 | SEP-7 | Points: 4')
    .setPoints(4)
    .setRequired(true)
    .setChoices([
      q3.createChoice('4 - Excellent: Specific data cited, clear evidence-claim connection', true),
      q3.createChoice('3 - Good: Data presented but connection to claims could be clearer', false),
      q3.createChoice('2 - Developing: Some data but weak connection to claims', false),
      q3.createChoice('1 - Beginning: Little or no data, claims unsupported', false)
    ]);

  // Q4: Mechanism Coverage (4 pts)
  const q4 = form.addMultipleChoiceItem();
  q4.setTitle('Q4. SELF-EVAL: Mechanism Coverage - How thoroughly did you address all THREE heat transfer mechanisms?')
    .setHelpText('ID: g8_c8_w3_d2_q4 | MS-PS3-4 | Points: 4')
    .setPoints(4)
    .setRequired(true)
    .setChoices([
      q4.createChoice('4 - Excellent: All three mechanisms addressed with specific design features', true),
      q4.createChoice('3 - Good: Three mechanisms mentioned but one less thoroughly explained', false),
      q4.createChoice('2 - Developing: Only two mechanisms clearly addressed', false),
      q4.createChoice('1 - Beginning: One or no mechanisms clearly addressed', false)
    ]);

  // Q5: Reflection/Improvement (4 pts)
  const q5 = form.addMultipleChoiceItem();
  q5.setTitle('Q5. SELF-EVAL: Reflection & Improvement - How honestly and specifically did you assess your design?')
    .setHelpText('ID: g8_c8_w3_d2_q5 | MS-ETS1-2 | Points: 4')
    .setPoints(4)
    .setRequired(true)
    .setChoices([
      q5.createChoice('4 - Excellent: Honest assessment with specific, mechanism-based improvements', true),
      q5.createChoice('3 - Good: Good reflection but improvements could be more specific', false),
      q5.createChoice('2 - Developing: Basic reflection, vague improvements', false),
      q5.createChoice('1 - Beginning: Little reflection or "everything was perfect"', false)
    ]);

  // ===== Peer Evaluation Section (20 pts) =====
  form.addSectionHeaderItem()
    .setTitle('Part B: Peer Evaluation')
    .setHelpText('Evaluate THREE peer presentations (20 pts total)');

  // Peer 1 Evaluation
  form.addSectionHeaderItem()
    .setTitle('Peer 1 Evaluation')
    .setHelpText('Evaluate your first peer\'s presentation');

  // Q6: Peer 1 Name
  const q6 = form.addTextItem();
  q6.setTitle('Q6. Peer 1: Enter the presenter\'s name.')
    .setHelpText('ID: g8_c8_w3_d2_q6')
    .setRequired(true);

  // Q7: Peer 1 - Best Feature (3 pts)
  const q7 = form.addParagraphTextItem();
  q7.setTitle('Q7. Peer 1 STRENGTH: What was the strongest aspect of this design? Which mechanism did they address most effectively?')
    .setHelpText('ID: g8_c8_w3_d2_q7 | Points: 3\n\nRUBRIC:\n3 pts: Identifies specific strength AND connects to correct mechanism\n2 pts: Identifies strength but mechanism connection weak\n1 pt: Generic praise without specifics\n0 pts: No meaningful feedback')
    .setRequired(true)
    .setValidation(FormApp.createParagraphTextValidation()
      .requireTextLengthGreaterThanOrEqualTo(30)
      .build());

  // Q8: Peer 1 - Suggestion (3 pts)
  const q8 = form.addParagraphTextItem();
  q8.setTitle('Q8. Peer 1 SUGGESTION: What specific improvement would help this design? Which mechanism would it address?')
    .setHelpText('ID: g8_c8_w3_d2_q8 | Points: 3\n\nRUBRIC:\n3 pts: Specific, actionable suggestion AND correct mechanism connection\n2 pts: Good suggestion but mechanism unclear\n1 pt: Vague suggestion\n0 pts: No meaningful suggestion')
    .setRequired(true)
    .setValidation(FormApp.createParagraphTextValidation()
      .requireTextLengthGreaterThanOrEqualTo(30)
      .build());

  // Peer 2 Evaluation
  form.addSectionHeaderItem()
    .setTitle('Peer 2 Evaluation')
    .setHelpText('Evaluate your second peer\'s presentation');

  // Q9: Peer 2 Name
  const q9 = form.addTextItem();
  q9.setTitle('Q9. Peer 2: Enter the presenter\'s name.')
    .setHelpText('ID: g8_c8_w3_d2_q9')
    .setRequired(true);

  // Q10: Peer 2 - Best Feature (3 pts)
  const q10 = form.addParagraphTextItem();
  q10.setTitle('Q10. Peer 2 STRENGTH: What was the strongest aspect of this design? Which mechanism did they address most effectively?')
    .setHelpText('ID: g8_c8_w3_d2_q10 | Points: 3\n\nRUBRIC:\n3 pts: Identifies specific strength AND connects to correct mechanism\n2 pts: Identifies strength but mechanism connection weak\n1 pt: Generic praise without specifics\n0 pts: No meaningful feedback')
    .setRequired(true)
    .setValidation(FormApp.createParagraphTextValidation()
      .requireTextLengthGreaterThanOrEqualTo(30)
      .build());

  // Q11: Peer 2 - Suggestion (3 pts)
  const q11 = form.addParagraphTextItem();
  q11.setTitle('Q11. Peer 2 SUGGESTION: What specific improvement would help this design? Which mechanism would it address?')
    .setHelpText('ID: g8_c8_w3_d2_q11 | Points: 3\n\nRUBRIC:\n3 pts: Specific, actionable suggestion AND correct mechanism connection\n2 pts: Good suggestion but mechanism unclear\n1 pt: Vague suggestion\n0 pts: No meaningful suggestion')
    .setRequired(true)
    .setValidation(FormApp.createParagraphTextValidation()
      .requireTextLengthGreaterThanOrEqualTo(30)
      .build());

  // Peer 3 Evaluation
  form.addSectionHeaderItem()
    .setTitle('Peer 3 Evaluation')
    .setHelpText('Evaluate your third peer\'s presentation');

  // Q12: Peer 3 Name
  const q12 = form.addTextItem();
  q12.setTitle('Q12. Peer 3: Enter the presenter\'s name.')
    .setHelpText('ID: g8_c8_w3_d2_q12')
    .setRequired(true);

  // Q13: Peer 3 - Best Feature (2 pts)
  const q13 = form.addParagraphTextItem();
  q13.setTitle('Q13. Peer 3 STRENGTH: What was the strongest aspect of this design? Which mechanism did they address most effectively?')
    .setHelpText('ID: g8_c8_w3_d2_q13 | Points: 2\n\nRUBRIC:\n2 pts: Identifies specific strength AND connects to correct mechanism\n1 pt: Identifies strength but mechanism connection weak\n0 pts: No meaningful feedback')
    .setRequired(true)
    .setValidation(FormApp.createParagraphTextValidation()
      .requireTextLengthGreaterThanOrEqualTo(30)
      .build());

  // Q14: Peer 3 - Suggestion (3 pts)
  const q14 = form.addParagraphTextItem();
  q14.setTitle('Q14. Peer 3 SUGGESTION: What specific improvement would help this design? Which mechanism would it address?')
    .setHelpText('ID: g8_c8_w3_d2_q14 | Points: 3\n\nRUBRIC:\n3 pts: Specific, actionable suggestion AND correct mechanism connection\n2 pts: Good suggestion but mechanism unclear\n1 pt: Vague suggestion\n0 pts: No meaningful suggestion')
    .setRequired(true)
    .setValidation(FormApp.createParagraphTextValidation()
      .requireTextLengthGreaterThanOrEqualTo(30)
      .build());

  return form;
}

// ═══════════════════════════════════════════════════════════════════════════
// DAY 3a: Cycle 8 Cumulative Assessment (25 pts)
// ═══════════════════════════════════════════════════════════════════════════

function createG8C8W3Day3Assessment_() {
  const form = FormApp.create('G8.C8.W3: Day 3 - Cycle 8 Cumulative Assessment');
  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setDescription(
    'Grade 8 | Cycle 8 Week 3 | Day 3 - Assessment\n\n' +
    'CYCLE 8 CUMULATIVE ASSESSMENT\n\n' +
    'Sections:\n' +
    '• Section A: Thermal Conductivity (8 pts)\n' +
    '• Section B: Heat Transfer Mechanisms (8 pts)\n' +
    '• Section C: Engineering Application (9 pts)\n\n' +
    'Time: ~35 minutes | Points: 25'
  );

  // ===== Section A: Thermal Conductivity (8 pts) =====
  form.addSectionHeaderItem()
    .setTitle('Section A: Thermal Conductivity')
    .setHelpText('8 points | Compare conductors and insulators');

  // Q1: Conductor vs Insulator (3 pts)
  const q1 = form.addMultipleChoiceItem();
  q1.setTitle('Q1. A metal pot handle and a wooden pot handle are both at room temperature (20°C). The metal handle feels cold while the wooden handle feels room temperature. What explains this difference?')
    .setHelpText('ID: g8_c8_w3_d3a_q1 | DOK: 3 | Standard: MS-PS3-4')
    .setPoints(3)
    .setRequired(true)
    .setChoices([
      q1.createChoice('The metal is actually colder than the wood', false),
      q1.createChoice('Metal conducts heat away from your hand faster, making you sense heat loss', true),
      q1.createChoice('Wood absorbs heat from your hand faster', false),
      q1.createChoice('Your hand is not accurate at measuring temperature', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('✓ Correct! Both are at room temperature, but metal\'s high thermal conductivity pulls heat from your hand rapidly, making it FEEL cold. This is a common misconception!')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('✗ Both handles are at the same temperature. The difference is HOW FAST each material transfers heat from your hand. High conductivity = heat leaves your hand fast = feels cold.')
      .build());

  // Q2: Particle Motion Explanation (2 pts)
  const q2 = form.addMultipleChoiceItem();
  q2.setTitle('Q2. At the particle level, why does copper conduct heat better than plastic?')
    .setHelpText('ID: g8_c8_w3_d3a_q2 | DOK: 2 | Standard: MS-PS3-4')
    .setPoints(2)
    .setRequired(true)
    .setChoices([
      q2.createChoice('Copper particles are heavier and carry more heat', false),
      q2.createChoice('Copper has free electrons that transfer energy rapidly between particles', true),
      q2.createChoice('Plastic particles don\'t move', false),
      q2.createChoice('Copper is shinier so it absorbs more heat', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('✓ Correct! Metals have free electrons (a "sea of electrons") that can move throughout the material, quickly transferring kinetic energy. This is why metals conduct heat so well.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('✗ Think about what makes metals special: they have freely moving electrons that can rapidly transfer energy throughout the material, unlike plastics where electrons are bound in place.')
      .build());

  // Q3: Material Prediction (3 pts)
  const q3 = form.addParagraphTextItem();
  q3.setTitle('Q3. A spacecraft needs a material that prevents heat from reaching the interior during re-entry. Should this material have HIGH or LOW thermal conductivity? Explain in terms of particle energy transfer.')
    .setHelpText('ID: g8_c8_w3_d3a_q3 | DOK: 3 | Standard: MS-PS3-4 | Points: 3\n\nRUBRIC:\n3 pts: Correctly identifies LOW conductivity AND explains using particle energy transfer language\n2 pts: Correct answer but particle explanation incomplete\n1 pt: Correct answer without explanation\n0 pts: Incorrect or no particle-level reasoning')
    .setRequired(true)
    .setValidation(FormApp.createParagraphTextValidation()
      .requireTextLengthGreaterThanOrEqualTo(50)
      .build());

  // ===== Section B: Heat Transfer Mechanisms (8 pts) =====
  form.addSectionHeaderItem()
    .setTitle('Section B: Heat Transfer Mechanisms')
    .setHelpText('8 points | Identify and apply the three mechanisms');

  // Q4: Mechanism Identification (3 pts)
  const q4 = form.addCheckboxItem();
  q4.setTitle('Q4. The sun heats Earth from 93 million miles away through empty space. Which mechanism(s) are involved? Select ALL that apply.')
    .setHelpText('ID: g8_c8_w3_d3a_q4 | DOK: 2 | Standard: MS-PS3-4 | Select ALL correct')
    .setPoints(3)
    .setRequired(true)
    .setChoices([
      q4.createChoice('Conduction - particles passing energy through contact', false),
      q4.createChoice('Convection - hot air rising and circulating', false),
      q4.createChoice('Radiation - electromagnetic waves traveling through vacuum', true)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('✓ Correct! Only radiation can travel through the vacuum of space. Conduction and convection both require matter (particles or fluid) to transfer heat.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('✗ Think about what each mechanism needs: Conduction needs touching particles. Convection needs fluid movement. Space is a vacuum—no particles! Which mechanism works without matter?')
      .build());

  // Q5: Real-World Application (3 pts)
  const q5 = form.addMultipleChoiceItem();
  q5.setTitle('Q5. A homeowner adds weather stripping around their door to stop cold drafts. Which heat transfer mechanism are they primarily addressing?')
    .setHelpText('ID: g8_c8_w3_d3a_q5 | DOK: 2 | Standard: MS-PS3-4')
    .setPoints(3)
    .setRequired(true)
    .setChoices([
      q5.createChoice('Conduction - heat moving through the door material', false),
      q5.createChoice('Convection - air circulation carrying heat in/out', true),
      q5.createChoice('Radiation - heat waves passing through gaps', false),
      q5.createChoice('All three equally', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('✓ Correct! Drafts are moving air—convection currents. Sealing gaps prevents warm air from escaping and cold air from entering, addressing convective heat loss.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('✗ A "draft" is moving air. What type of heat transfer involves the circulation of air or other fluids?')
      .build());

  // Q6: Mechanism Connection (2 pts)
  const q6 = form.addMultipleChoiceItem();
  q6.setTitle('Q6. Which statement correctly connects all THREE mechanisms to their requirements?')
    .setHelpText('ID: g8_c8_w3_d3a_q6 | DOK: 3 | Standard: MS-PS3-4')
    .setPoints(2)
    .setRequired(true)
    .setChoices([
      q6.createChoice('Conduction needs particles; Convection needs fluid motion; Radiation needs no medium', true),
      q6.createChoice('All three mechanisms require matter to transfer heat', false),
      q6.createChoice('Conduction and radiation work the same way but at different speeds', false),
      q6.createChoice('Convection only occurs in gases, not liquids', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('✓ Correct! Conduction = particle-to-particle contact. Convection = fluid (liquid/gas) circulation. Radiation = EM waves that can travel through vacuum.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('✗ Review: Conduction requires touching particles. Convection requires moving fluid. Radiation is unique—it can travel through empty space as electromagnetic waves.')
      .build());

  // ===== Section C: Engineering Application (9 pts) =====
  form.addSectionHeaderItem()
    .setTitle('Section C: Engineering Application')
    .setHelpText('9 points | Apply thermal principles to engineering decisions');

  // Q7: Design Analysis (3 pts)
  const q7 = form.addMultipleChoiceItem();
  q7.setTitle('Q7. Two cooler designs both keep ice frozen for 12 hours:\n• Cooler A: 10 cm thick foam walls, costs $80\n• Cooler B: 3 cm foam + reflective lining + air gap, costs $50\n\nFrom an engineering perspective, which design is BETTER and why?')
    .setHelpText('ID: g8_c8_w3_d3a_q7 | DOK: 3 | Standard: MS-ETS1-2')
    .setPoints(3)
    .setRequired(true)
    .setChoices([
      q7.createChoice('Cooler A - thicker foam is always better', false),
      q7.createChoice('Cooler B - same performance with lower cost, smaller size, and multi-mechanism approach', true),
      q7.createChoice('They are equal - same performance means equal engineering value', false),
      q7.createChoice('Neither - both designs are too simple', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('✓ Correct! Engineering evaluates TRADE-OFFS. Cooler B achieves the same performance with lower cost, smaller size, AND addresses multiple mechanisms—better engineering!')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('✗ Engineering isn\'t just about performance—it\'s about achieving goals within constraints. Compare cost, size, and HOW each design achieves its insulation.')
      .build());

  // Q8: Trade-off Analysis (3 pts)
  const q8 = form.addParagraphTextItem();
  q8.setTitle('Q8. A company wants to make the "ultimate" cooler with vacuum insulation like a thermos bottle. However, they decide against it. What TRADE-OFFS might have influenced this decision? Identify at least TWO factors.')
    .setHelpText('ID: g8_c8_w3_d3a_q8 | DOK: 4 | Standard: MS-ETS1-2 | Points: 3\n\nRUBRIC:\n3 pts: Two valid trade-offs identified (cost, fragility, weight, size, repairability, etc.) with clear reasoning\n2 pts: Two factors mentioned but reasoning incomplete\n1 pt: Only one valid trade-off\n0 pts: No valid trade-offs identified')
    .setRequired(true)
    .setValidation(FormApp.createParagraphTextValidation()
      .requireTextLengthGreaterThanOrEqualTo(50)
      .build());

  // Q9: Novel Scenario (3 pts)
  const q9 = form.addParagraphTextItem();
  q9.setTitle('Q9. SCENARIO: A food delivery company needs containers to keep pizza hot during 30-minute deliveries. Design a solution that addresses at least TWO heat transfer mechanisms. Explain your material choices and how each addresses a specific mechanism.')
    .setHelpText('ID: g8_c8_w3_d3a_q9 | DOK: 4 | Standard: MS-PS3-4, MS-ETS1-2 | Points: 3\n\nRUBRIC:\n3 pts: Practical design AND correctly addresses 2+ mechanisms with appropriate materials AND explains mechanism connections\n2 pts: Good design but only one mechanism clearly addressed\n1 pt: Basic idea without mechanism reasoning\n0 pts: No valid design or mechanism connection')
    .setRequired(true)
    .setValidation(FormApp.createParagraphTextValidation()
      .requireTextLengthGreaterThanOrEqualTo(75)
      .build());

  return form;
}

// ═══════════════════════════════════════════════════════════════════════════
// DAY 3b: CCC Synthesis & Year-End Reflection (15 pts)
// ═══════════════════════════════════════════════════════════════════════════

function createG8C8W3Day3Reflection_() {
  const form = FormApp.create('G8.C8.W3: Day 3 - CCC Synthesis & Year-End Reflection');
  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setDescription(
    'Grade 8 | Cycle 8 Week 3 | Day 3 - Reflection\n\n' +
    'YEAR-END INTEGRATION: CCC Synthesis & Reflection\n\n' +
    '• Part A: Apply Cross-Cutting Concepts to Thermal Systems (10 pts)\n' +
    '• Part B: Year-End Reflection on Scientific Growth (5 pts)\n\n' +
    'Time: ~20 minutes | Points: 15'
  );

  // ===== Part A: CCC Synthesis (10 pts) =====
  form.addSectionHeaderItem()
    .setTitle('Part A: Cross-Cutting Concept Synthesis')
    .setHelpText('Apply CCCs to thermal energy systems (10 pts)');

  form.addSectionHeaderItem()
    .setTitle('The 7 Cross-Cutting Concepts')
    .setHelpText('1. Patterns | 2. Cause & Effect | 3. Scale, Proportion, Quantity | 4. Systems & System Models | 5. Energy & Matter | 6. Structure & Function | 7. Stability & Change');

  // Q1: CCC - Patterns (2 pts)
  const q1 = form.addMultipleChoiceItem();
  q1.setTitle('Q1. CCC: PATTERNS - What pattern did you observe in the temperature data when objects cool down?')
    .setHelpText('ID: g8_c8_w3_d3b_q1 | DOK: 2 | CCC: Patterns')
    .setPoints(2)
    .setRequired(true)
    .setChoices([
      q1.createChoice('Temperature drops at a constant rate (straight line)', false),
      q1.createChoice('Temperature drops fastest at first, then slows as it approaches room temperature', true),
      q1.createChoice('Temperature drops slowly at first, then speeds up', false),
      q1.createChoice('Temperature drops randomly with no pattern', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('✓ Correct! This exponential cooling pattern occurs because heat transfer rate depends on the temperature DIFFERENCE. As the object approaches room temp, the difference shrinks, so cooling slows.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('✗ Think about your cooling data: did it drop the same amount each minute, or did the rate change? The pattern relates to HOW heat transfer rate depends on temperature difference.')
      .build());

  // Q2: CCC - Cause & Effect (2 pts)
  const q2 = form.addParagraphTextItem();
  q2.setTitle('Q2. CCC: CAUSE & EFFECT - Explain the cause-and-effect relationship: Why does adding aluminum foil to an insulated container improve its performance? Be specific about the mechanism.')
    .setHelpText('ID: g8_c8_w3_d3b_q2 | DOK: 3 | CCC: Cause & Effect | Points: 2\n\nRUBRIC:\n2 pts: Correctly identifies cause (reflective surface) AND effect (reduced radiation heat transfer) with mechanism explanation\n1 pt: Identifies cause or effect but not both, or mechanism unclear\n0 pts: No valid cause-effect relationship')
    .setRequired(true)
    .setValidation(FormApp.createParagraphTextValidation()
      .requireTextLengthGreaterThanOrEqualTo(40)
      .build());

  // Q3: CCC - Scale, Proportion, Quantity (2 pts)
  const q3 = form.addMultipleChoiceItem();
  q3.setTitle('Q3. CCC: SCALE, PROPORTION, QUANTITY - How does the Q = mcΔT formula demonstrate this concept?')
    .setHelpText('ID: g8_c8_w3_d3b_q3 | DOK: 3 | CCC: Scale')
    .setPoints(2)
    .setRequired(true)
    .setChoices([
      q3.createChoice('Energy transfer is random and cannot be quantified', false),
      q3.createChoice('Energy transfer is directly proportional to both mass AND temperature change', true),
      q3.createChoice('Temperature is the only factor that matters', false),
      q3.createChoice('Mass and temperature change are inversely related', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('✓ Correct! The formula shows proportional relationships: double the mass = double the energy; double the ΔT = double the energy. Mathematics reveals the SCALE of thermal energy.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('✗ Look at the formula Q = m × c × ΔT. What happens to Q if you double m? What if you double ΔT? The formula shows how quantities SCALE together.')
      .build());

  // Q4: CCC - Energy & Matter (2 pts)
  const q4 = form.addMultipleChoiceItem();
  q4.setTitle('Q4. CCC: ENERGY & MATTER - When ice melts in your insulated container, where does the energy that melted it come from?')
    .setHelpText('ID: g8_c8_w3_d3b_q4 | DOK: 2 | CCC: Energy & Matter')
    .setPoints(2)
    .setRequired(true)
    .setChoices([
      q4.createChoice('Energy was created when the ice started melting', false),
      q4.createChoice('Energy transferred from the warmer surroundings through the insulation', true),
      q4.createChoice('Energy came from inside the ice itself', false),
      q4.createChoice('The insulation produced energy that melted the ice', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('✓ Correct! Energy is conserved—it flows from warm surroundings (high energy) to cold ice (low energy) until equilibrium. The insulation slows but cannot stop this flow.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('✗ Energy cannot be created or destroyed (conservation!). Heat ALWAYS flows from hot to cold. Where is the "hot" in this system compared to the ice?')
      .build());

  // Q5: CCC Connection to Previous Cycle (2 pts)
  const q5 = form.addParagraphTextItem();
  q5.setTitle('Q5. CCC CONNECTION: Choose ONE cross-cutting concept (Patterns, Cause & Effect, Scale, Systems, Energy & Matter, Structure & Function, or Stability & Change) and explain how it connects BOTH thermal energy (Cycle 8) AND a topic from an earlier cycle this year.')
    .setHelpText('ID: g8_c8_w3_d3b_q5 | DOK: 4 | CCC Synthesis | Points: 2\n\nRUBRIC:\n2 pts: Names specific CCC AND correctly applies to Cycle 8 thermal content AND connects to specific earlier cycle content\n1 pt: CCC named with partial application or weak earlier cycle connection\n0 pts: No valid CCC application or connection')
    .setRequired(true)
    .setValidation(FormApp.createParagraphTextValidation()
      .requireTextLengthGreaterThanOrEqualTo(75)
      .build());

  // ===== Part B: Year-End Reflection (5 pts) =====
  form.addSectionHeaderItem()
    .setTitle('Part B: Year-End Reflection')
    .setHelpText('Reflect on your scientific growth this year (5 pts)');

  // Q6: Most Surprising Learning (1 pt)
  const q6 = form.addParagraphTextItem();
  q6.setTitle('Q6. What was the most SURPRISING thing you learned in science this year? Why did it surprise you?')
    .setHelpText('ID: g8_c8_w3_d3b_q6 | Points: 1\n\nRUBRIC:\n1 pt: Identifies specific learning AND explains why it was surprising\n0 pts: Vague or no explanation of surprise')
    .setRequired(true)
    .setValidation(FormApp.createParagraphTextValidation()
      .requireTextLengthGreaterThanOrEqualTo(30)
      .build());

  // Q7: SEP Growth (2 pts)
  const q7 = form.addParagraphTextItem();
  q7.setTitle('Q7. Which Science & Engineering Practice (SEP) did you improve the MOST this year? Provide specific EVIDENCE of your growth.\n\nSEPs: 1-Asking Questions, 2-Developing Models, 3-Planning Investigations, 4-Analyzing Data, 5-Using Math, 6-Constructing Explanations, 7-Arguing from Evidence, 8-Obtaining Information')
    .setHelpText('ID: g8_c8_w3_d3b_q7 | Points: 2\n\nRUBRIC:\n2 pts: Names specific SEP AND provides concrete evidence of growth (example of before/after OR specific work showing improvement)\n1 pt: SEP named but evidence vague\n0 pts: No SEP identified or no evidence')
    .setRequired(true)
    .setValidation(FormApp.createParagraphTextValidation()
      .requireTextLengthGreaterThanOrEqualTo(50)
      .build());

  // Q8: Energy Understanding Growth (1 pt)
  const q8 = form.addParagraphTextItem();
  q8.setTitle('Q8. How has your understanding of ENERGY changed from the beginning of the year to now? What do you understand now that you didn\'t before?')
    .setHelpText('ID: g8_c8_w3_d3b_q8 | Points: 1\n\nRUBRIC:\n1 pt: Identifies specific change in understanding about energy\n0 pts: Vague or no growth identified')
    .setRequired(true)
    .setValidation(FormApp.createParagraphTextValidation()
      .requireTextLengthGreaterThanOrEqualTo(30)
      .build());

  // Q9: Remaining Questions (1 pt)
  const q9 = form.addParagraphTextItem();
  q9.setTitle('Q9. What scientific questions do you STILL want to explore? What topics would you like to learn more about in high school science?')
    .setHelpText('ID: g8_c8_w3_d3b_q9 | Points: 1\n\nRUBRIC:\n1 pt: Identifies specific scientific question or topic for future exploration\n0 pts: No question identified or "nothing"')
    .setRequired(true)
    .setValidation(FormApp.createParagraphTextValidation()
      .requireTextLengthGreaterThanOrEqualTo(20)
      .build());

  return form;
}
