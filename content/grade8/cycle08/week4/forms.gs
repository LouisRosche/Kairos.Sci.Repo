/**
 * G8.C8.W4 Forms - Year-End Integration & Assessment: Thermal Energy & Engineering Design
 *
 * YEAR-END ASSESSMENT WEEK - Special format for final cycle
 * Topic: Thermal Energy, Heat Transfer & Year-End Integration
 * Dates: June 22-26, 2026
 *
 * Assessment Structure (100 pts total):
 * - Part 1: Cycle 8 Synthesis (25 pts, 20 min)
 * - Part 2: Engineering Design Showcase (35 pts, 30 min)
 * - Part 3: CCC Year-End Synthesis (25 pts, 20 min)
 * - Part 4: Year-End Reflection (15 pts, 15 min)
 *
 * Standards: MS-PS3-4 (Thermal Energy), MS-ETS1-2 (Engineering Design)
 * Spiral: MS-PS1-2 (Chemical reactions from C7), MS-LS4-4 (Natural selection from C3), MS-LS2-3 (Energy flow from C4)
 */

const G8_C8_W4_CONFIG = {
  grade: 8,
  cycle: 8,
  week: 4,
  topic: 'Year-End Integration & Assessment: Thermal Energy & Engineering',
  isAssessmentWeek: true,
  isYearEndIntegration: true,
  points: {
    part1CycleSynthesis: 25,
    part2DesignShowcase: 35,
    part3CCCSynthesis: 25,
    part4Reflection: 15,
    total: 100
  },
  cccs: ['Patterns', 'Cause/Effect', 'Scale/Proportion', 'Systems', 'Energy/Matter', 'Structure/Function', 'Stability/Change'],
  misconceptionTargets: ['cold-transfers', 'temp-heat-same', 'insulators-create-heat'],
  standards: {
    primary: 'MS-PS3-4',
    secondary: 'MS-ETS1-2',
    spiral: ['MS-PS1-2', 'MS-LS4-4', 'MS-LS2-3']
  }
};

/**
 * Main entry point - creates all Year-End assessment forms
 */
function createG8C8W4Forms() {
  const forms = {
    part1: createPart1CycleSynthesis(),
    part2: createPart2DesignShowcase(),
    part3: createPart3CCCSynthesis(),
    part4: createPart4YearEndReflection()
  };

  Logger.log('G8.C8.W4 Year-End Assessment forms created successfully');
  Logger.log('Part 1 (Cycle Synthesis): ' + forms.part1.getPublishedUrl());
  Logger.log('Part 2 (Design Showcase): ' + forms.part2.getPublishedUrl());
  Logger.log('Part 3 (CCC Synthesis): ' + forms.part3.getPublishedUrl());
  Logger.log('Part 4 (Reflection): ' + forms.part4.getPublishedUrl());

  return forms;
}

/**
 * Part 1: Cycle 8 Synthesis (25 pts, 20 min)
 * Focus: Connect heat transfer, energy conservation, and urban thermal systems
 */
function createPart1CycleSynthesis() {
  const form = FormApp.create('G8.C8.W4: Part 1 - Cycle 8 Synthesis');
  form.setDescription(
    'Cycle 8 Synthesis: Thermal Energy & Heat Transfer\n\n' +
    'Time: 20 minutes | Points: 25\n\n' +
    'Demonstrate your understanding of how heat transfer methods, energy conservation, and thermal systems connect.'
  );
  form.setIsQuiz(true);

  // Instructions
  form.addSectionHeaderItem()
    .setTitle('Thermal Energy Synthesis')
    .setHelpText('Show how the concepts from this cycle work together in real-world applications.');

  // Q1: Heat Transfer Methods (5 pts)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('A thermos keeps coffee hot for hours. It uses a vacuum between two walls and a reflective coating. Which heat transfer methods does each feature address?')
    .setHelpText('Question ID: g8_c8_w4_syn_q1')
    .setPoints(5)
    .setChoices([
      q1.createChoice('Vacuum: stops conduction and convection; Reflective coating: stops radiation', true),
      q1.createChoice('Vacuum: stops radiation; Reflective coating: stops conduction', false),
      q1.createChoice('Both features stop all three methods equally', false),
      q1.createChoice('Vacuum: creates cold; Reflective coating: creates heat', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! A vacuum contains no molecules, so heat can\'t transfer by conduction (molecule-to-molecule contact) or convection (fluid movement). The reflective coating bounces infrared radiation back, reducing radiative heat loss. Together, they minimize all three transfer methods.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Think about what each feature does: Conduction needs molecule contact, convection needs fluid movement, radiation travels through empty space. A vacuum eliminates molecules (stopping conduction/convection), while reflective surfaces bounce radiation back.')
      .build());

  // Q2: Energy Conservation Understanding (5 pts)
  const q2 = form.addMultipleChoiceItem()
    .setTitle('A pot of water is heated on a stove from 20°C to 100°C. The same amount of energy is added to equal masses of water and aluminum. Why does aluminum reach a higher temperature?')
    .setHelpText('Question ID: g8_c8_w4_syn_q2')
    .setPoints(5)
    .setChoices([
      q2.createChoice('Aluminum conducts heat better than water', false),
      q2.createChoice('Aluminum has a lower specific heat capacity, so less energy is needed per degree change', true),
      q2.createChoice('Aluminum is a metal and metals are always hotter', false),
      q2.createChoice('Water absorbs some energy to evaporate', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! Specific heat capacity measures how much energy is needed to raise 1 gram of a substance by 1°C. Water has a high specific heat (4.18 J/g°C) while aluminum is lower (0.90 J/g°C). Same energy input → more temperature change in aluminum.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Specific heat capacity is the key concept. It measures energy needed to change temperature. Water\'s high specific heat (4.18 J/g°C) means it takes lots of energy to warm up. Aluminum\'s lower value (0.90 J/g°C) means the same energy causes more temperature change.')
      .build());

  // Q3: Urban Heat Island Application (5 pts)
  const q3 = form.addMultipleChoiceItem()
    .setTitle('Cities are often several degrees warmer than surrounding rural areas (urban heat island effect). Which combination of factors best explains this?')
    .setHelpText('Question ID: g8_c8_w4_syn_q3')
    .setPoints(5)
    .setChoices([
      q3.createChoice('Dark surfaces absorb more radiation; lack of vegetation reduces cooling; buildings trap heat', true),
      q3.createChoice('More people create more body heat; buildings block wind', false),
      q3.createChoice('City air contains more oxygen which holds heat better', false),
      q3.createChoice('Concrete creates its own heat through chemical reactions', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! Multiple factors combine: (1) Dark asphalt/roofs have low albedo and absorb solar radiation, (2) Vegetation provides evaporative cooling that\'s missing in cities, (3) Building geometry traps heat and reduces airflow. Engineering solutions address these factors.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('The urban heat island effect comes from: (1) Surface properties - dark surfaces absorb more sunlight than vegetation, (2) Lack of evaporative cooling without plants/water, (3) Building geometry that traps heat. Human body heat is negligible compared to solar energy.')
      .build());

  // Q4: Synthesis Integration (10 pts)
  form.addParagraphTextItem()
    .setTitle('Design Challenge: A company wants to build a "passive cooling" warehouse that stays cool without air conditioning. Using your knowledge of all three heat transfer methods (conduction, convection, radiation), specific heat capacity, and urban heat island principles, describe at least 4 specific design features and explain the science behind each.')
    .setHelpText('Question ID: g8_c8_w4_syn_q4 | 10 points: Four valid features (4), Scientific explanations for each (4), Integration of concepts (2)')
    .setRequired(true);

  return form;
}

/**
 * Part 2: Engineering Design Showcase (35 pts, 30 min)
 * Focus: Present best Station 3 project from year
 */
function createPart2DesignShowcase() {
  const form = FormApp.create('G8.C8.W4: Part 2 - Engineering Design Showcase');
  form.setDescription(
    'Engineering Design Showcase Rubric\n\n' +
    'Time: 30 minutes | Points: 35\n\n' +
    'This form is used to evaluate your engineering design presentation. ' +
    'Present your best Station 3 project from this year.'
  );
  form.setIsQuiz(true);

  // Self-Assessment Section
  form.addSectionHeaderItem()
    .setTitle('Design Showcase Self-Assessment')
    .setHelpText('Complete this before your presentation.');

  // Project Selection
  form.addTextItem()
    .setTitle('Which Station 3 design project are you presenting? Include the cycle and topic.')
    .setHelpText('Question ID: g8_c8_w4_des_project')
    .setRequired(true);

  // Design Problem
  form.addTextItem()
    .setTitle('What problem was your design trying to solve?')
    .setHelpText('Question ID: g8_c8_w4_des_problem')
    .setRequired(true);

  // Design Process
  form.addParagraphTextItem()
    .setTitle('Describe your design process. What constraints did you face? What iterations or improvements did you make?')
    .setHelpText('Question ID: g8_c8_w4_des_process')
    .setRequired(true);

  // Scientific Principles
  form.addParagraphTextItem()
    .setTitle('What scientific principles does your design apply? Explain how your design uses science to solve the problem.')
    .setHelpText('Question ID: g8_c8_w4_des_science')
    .setRequired(true);

  // Testing and Results
  form.addParagraphTextItem()
    .setTitle('How did you test your design? What were the results? If you could improve it further, what would you change?')
    .setHelpText('Question ID: g8_c8_w4_des_testing')
    .setRequired(true);

  // Teacher Rubric Section
  form.addSectionHeaderItem()
    .setTitle('Teacher Evaluation Rubric')
    .setHelpText('This section is completed by the teacher during the presentation.');

  // Design Process (10 pts)
  const processRubric = form.addScaleItem()
    .setTitle('Design Process: Does the presentation demonstrate iterative design thinking and problem-solving?')
    .setHelpText('1-2: No process evident | 3-4: Basic process | 5-6: Clear iteration | 7-8: Sophisticated process | 9-10: Exemplary engineering thinking')
    .setBounds(1, 10)
    .setLabels('No process', 'Exemplary process');

  // Scientific Principles (10 pts)
  const scienceRubric = form.addScaleItem()
    .setTitle('Scientific Principles: Are relevant scientific concepts correctly identified and applied?')
    .setHelpText('1-2: No science | 3-4: Vague connections | 5-6: Correct but basic | 7-8: Well-integrated | 9-10: Deep scientific understanding')
    .setBounds(1, 10)
    .setLabels('No science', 'Deep understanding');

  // Testing/Iteration (10 pts)
  const testingRubric = form.addScaleItem()
    .setTitle('Testing/Iteration: Is there evidence of testing, data collection, and design improvement?')
    .setHelpText('1-2: No testing | 3-4: Minimal testing | 5-6: Basic testing | 7-8: Systematic testing | 9-10: Rigorous testing with iteration')
    .setBounds(1, 10)
    .setLabels('No testing', 'Rigorous testing');

  // Communication (5 pts)
  const commRubric = form.addScaleItem()
    .setTitle('Communication: Is the presentation clear, organized, and professionally delivered?')
    .setHelpText('1: Unclear | 2: Needs improvement | 3: Adequate | 4: Good | 5: Excellent')
    .setBounds(1, 5)
    .setLabels('Unclear', 'Excellent');

  // Teacher Comments
  form.addParagraphTextItem()
    .setTitle('Teacher Comments and Feedback')
    .setHelpText('Provide specific feedback on the engineering design process and presentation.');

  return form;
}

/**
 * Part 3: CCC Year-End Synthesis (25 pts, 20 min)
 * Focus: Apply all 7 CCCs to novel physical science scenario
 */
function createPart3CCCSynthesis() {
  const form = FormApp.create('G8.C8.W4: Part 3 - CCC Year-End Synthesis');
  form.setDescription(
    'Cross-Cutting Concepts Year-End Synthesis\n\n' +
    'Time: 20 minutes | Points: 25\n\n' +
    'Demonstrate your ability to apply all 7 Cross-Cutting Concepts (CCCs) to analyze a scientific scenario. ' +
    'CCCs are the thinking tools scientists and engineers use across all disciplines.'
  );
  form.setIsQuiz(true);

  // Instructions
  form.addSectionHeaderItem()
    .setTitle('The Mars Habitat Challenge')
    .setHelpText(
      'Scenario: Engineers are designing habitats for humans on Mars. The Martian environment presents extreme challenges: ' +
      'temperatures swing from -60°C at night to 20°C during the day, the thin atmosphere provides almost no insulation, ' +
      'and solar radiation is intense. The habitat must maintain a stable 22°C inside using limited energy. ' +
      'Apply each CCC to analyze this engineering challenge.'
    );

  // CCC 1: Patterns (3 pts)
  form.addParagraphTextItem()
    .setTitle('CCC 1 - PATTERNS: What patterns in Martian temperature data would engineers need to study? What patterns from Earth-based thermal systems might apply?')
    .setHelpText('Question ID: g8_c8_w4_ccc_q1 | 3 points: Identify relevant patterns in the problem')
    .setRequired(true);

  // CCC 2: Cause and Effect (4 pts)
  form.addParagraphTextItem()
    .setTitle('CCC 2 - CAUSE AND EFFECT: Explain the cause-and-effect relationships in Martian temperature extremes. What causes the dramatic temperature swings? What would cause heat loss from the habitat?')
    .setHelpText('Question ID: g8_c8_w4_ccc_q2 | 4 points: Clear causal relationships with mechanisms')
    .setRequired(true);

  // CCC 3: Scale, Proportion, and Quantity (3 pts)
  form.addParagraphTextItem()
    .setTitle('CCC 3 - SCALE, PROPORTION, AND QUANTITY: How do quantitative factors (temperature range, insulation thickness, energy requirements) constrain the design? What calculations might engineers need?')
    .setHelpText('Question ID: g8_c8_w4_ccc_q3 | 3 points: Address quantitative constraints and proportional relationships')
    .setRequired(true);

  // CCC 4: Systems and System Models (4 pts)
  form.addParagraphTextItem()
    .setTitle('CCC 4 - SYSTEMS AND SYSTEM MODELS: Describe the habitat as a thermal system. What are the inputs, outputs, and components? How do they interact to maintain stable temperature?')
    .setHelpText('Question ID: g8_c8_w4_ccc_q4 | 4 points: System components, interactions, and feedback identified')
    .setRequired(true);

  // CCC 5: Energy and Matter (4 pts)
  form.addParagraphTextItem()
    .setTitle('CCC 5 - ENERGY AND MATTER: Trace energy flow through the Mars habitat system. Where does heating energy come from? How is it conserved or lost? How could waste heat be captured?')
    .setHelpText('Question ID: g8_c8_w4_ccc_q5 | 4 points: Energy flow and conservation principles applied')
    .setRequired(true);

  // CCC 6: Structure and Function (3 pts)
  form.addParagraphTextItem()
    .setTitle('CCC 6 - STRUCTURE AND FUNCTION: What structural features would the habitat need, and what function would each serve? Consider walls, windows, airlocks, etc.')
    .setHelpText('Question ID: g8_c8_w4_ccc_q6 | 3 points: Structure-function connections for design elements')
    .setRequired(true);

  // CCC 7: Stability and Change (4 pts)
  form.addParagraphTextItem()
    .setTitle('CCC 7 - STABILITY AND CHANGE: What factors would help maintain stable internal temperature? What disruptions might cause dangerous temperature changes? How would the system respond to change?')
    .setHelpText('Question ID: g8_c8_w4_ccc_q7 | 4 points: Stability factors, potential disruptions, and response mechanisms')
    .setRequired(true);

  return form;
}

/**
 * Part 4: Year-End Reflection (15 pts, 15 min)
 * Focus: Growth mindset, engineering identity, favorite design challenge
 */
function createPart4YearEndReflection() {
  const form = FormApp.create('G8.C8.W4: Part 4 - Year-End Reflection');
  form.setDescription(
    'Year-End Reflection: Your Growth as a Scientist and Engineer\n\n' +
    'Time: 15 minutes | Points: 15\n\n' +
    'Reflect on your learning journey this year. There are no wrong answers—be honest and thoughtful.'
  );
  form.setIsQuiz(true);

  // Instructions
  form.addSectionHeaderItem()
    .setTitle('Reflecting on Your Year')
    .setHelpText('Take a moment to think about how you\'ve grown as a scientist and engineer this year.');

  // Growth Mindset Reflection (5 pts)
  form.addParagraphTextItem()
    .setTitle('Describe a specific moment this year when a design or experiment didn\'t work as expected. What did you learn from the failure? How did you iterate or improve? How has this experience changed how you approach problems?')
    .setHelpText('Question ID: g8_c8_w4_ref_q1 | 5 points: Specific example, learning from failure, growth mindset reflection')
    .setRequired(true);

  // Engineering Identity (5 pts)
  form.addParagraphTextItem()
    .setTitle('Engineers solve problems using science and creativity. Do you see yourself as someone who can "think like an engineer"? Explain why or why not. What engineering skills are you most proud of developing this year?')
    .setHelpText('Question ID: g8_c8_w4_ref_q2 | 5 points: Thoughtful self-assessment, specific skills identified')
    .setRequired(true);

  // Favorite Design Challenge (3 pts)
  form.addParagraphTextItem()
    .setTitle('What was your favorite design challenge or engineering problem from this year? What made it engaging? What did you discover while working on it?')
    .setHelpText('Question ID: g8_c8_w4_ref_q3 | 3 points: Specific challenge identified with meaningful explanation')
    .setRequired(true);

  // Looking Ahead (2 pts)
  form.addParagraphTextItem()
    .setTitle('As you move to high school, what science or engineering topics are you curious to explore? How might you continue developing your problem-solving skills?')
    .setHelpText('Question ID: g8_c8_w4_ref_q4 | 2 points: Curiosity and forward-looking response')
    .setRequired(true);

  // Optional: Feedback
  form.addSectionHeaderItem()
    .setTitle('Optional Feedback')
    .setHelpText('This section helps us improve the course for future students.');

  form.addParagraphTextItem()
    .setTitle('[Optional] What suggestions do you have for improving this science class? What Station 3 design challenges worked well? What could be better?')
    .setHelpText('Not graded - your honest feedback helps us improve');

  return form;
}
