/**
 * G7.C8.W4 Forms - Year-End Integration & Assessment: Ecosystems, Biodiversity & CCC Synthesis
 *
 * YEAR-END ASSESSMENT WEEK - Special format for final cycle
 * Topic: Ecosystems, Biodiversity & Year-End Integration
 * Dates: June 22-26, 2026
 *
 * Assessment Structure (100 pts total):
 * - Part 1: Cycle 8 Synthesis (25 pts, 20 min)
 * - Part 2: Student Investigation Presentation (35 pts, 30 min)
 * - Part 3: CCC Year-End Synthesis (25 pts, 20 min)
 * - Part 4: Year-End Reflection (15 pts, 15 min)
 *
 * Standards: MS-LS2-4 (Ecosystem Changes)
 * Spiral: MS-ESS1-4 (Geologic time from C7), MS-ESS3-5 (Climate change from C3), MS-ESS3-3 (Human impact from C4)
 */

const G7_C8_W4_CONFIG = {
  grade: 7,
  cycle: 8,
  week: 4,
  topic: 'Year-End Integration & Assessment: Ecosystems & Biodiversity',
  isAssessmentWeek: true,
  isYearEndIntegration: true,
  points: {
    part1CycleSynthesis: 25,
    part2Presentation: 35,
    part3CCCSynthesis: 25,
    part4Reflection: 15,
    total: 100
  },
  cccs: ['Patterns', 'Cause/Effect', 'Scale/Proportion', 'Systems', 'Energy/Matter', 'Structure/Function', 'Stability/Change'],
  misconceptionTargets: ['ecosystem-static', 'food-chain-linear', 'biodiversity-nice'],
  standards: {
    primary: 'MS-LS2-4',
    spiral: ['MS-ESS1-4', 'MS-ESS3-5', 'MS-ESS3-3']
  }
};

/**
 * Main entry point - creates all Year-End assessment forms
 */
function createG7C8W4Forms() {
  const forms = {
    part1: createPart1CycleSynthesis(),
    part2: createPart2InvestigationPresentation(),
    part3: createPart3CCCSynthesis(),
    part4: createPart4YearEndReflection()
  };

  Logger.log('G7.C8.W4 Year-End Assessment forms created successfully');
  Logger.log('Part 1 (Cycle Synthesis): ' + forms.part1.getPublishedUrl());
  Logger.log('Part 2 (Presentation): ' + forms.part2.getPublishedUrl());
  Logger.log('Part 3 (CCC Synthesis): ' + forms.part3.getPublishedUrl());
  Logger.log('Part 4 (Reflection): ' + forms.part4.getPublishedUrl());

  return forms;
}

/**
 * Part 1: Cycle 8 Synthesis (25 pts, 20 min)
 * Focus: Connect trophic cascades, biodiversity, and climate impacts
 */
function createPart1CycleSynthesis() {
  const form = FormApp.create('G7.C8.W4: Part 1 - Cycle 8 Synthesis');
  form.setDescription(
    'Cycle 8 Synthesis: Ecosystems & Biodiversity\n\n' +
    'Time: 20 minutes | Points: 25\n\n' +
    'Demonstrate your understanding of how trophic cascades, biodiversity, and climate change connect to shape ecosystems.'
  );
  form.setIsQuiz(true);

  // Instructions
  form.addSectionHeaderItem()
    .setTitle('Ecosystem Synthesis')
    .setHelpText('Show how the concepts from this cycle work together in real ecosystems.');

  // Q1: Trophic Cascade Understanding (5 pts)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('When wolves were reintroduced to Yellowstone, elk populations decreased. Surprisingly, this led to more trees growing along riverbanks and rivers changing course. This is an example of:')
    .setHelpText('Question ID: g7_c8_w4_syn_q1')
    .setPoints(5)
    .setChoices([
      q1.createChoice('A food chain with energy transfer', false),
      q1.createChoice('A trophic cascade where predators indirectly affect vegetation and physical environment', true),
      q1.createChoice('Natural selection improving the ecosystem', false),
      q1.createChoice('Climate change affecting river patterns', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! This is a classic trophic cascade: wolves (top predator) → reduced elk grazing → vegetation recovery → changed erosion patterns → river course changes. Effects cascade through multiple trophic levels to affect even non-living components.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('A trophic cascade is when changes at one level of a food web ripple through multiple levels. Wolves reduced elk, which reduced overgrazing, which allowed trees to grow, which changed erosion and river patterns. The effect "cascades" down through the ecosystem.')
      .build());

  // Q2: Biodiversity and Resilience Connection (5 pts)
  const q2 = form.addMultipleChoiceItem()
    .setTitle('A forest ecosystem with 50 different tree species is struck by a new disease that kills oak trees. A forest with only 5 tree species (including oaks) experiences the same disease. Which forest is more likely to collapse, and why?')
    .setHelpText('Question ID: g7_c8_w4_syn_q2')
    .setPoints(5)
    .setChoices([
      q2.createChoice('The diverse forest, because diseases spread faster with more species', false),
      q2.createChoice('The low-diversity forest, because oak loss represents a larger proportion of the ecosystem', true),
      q2.createChoice('Both will collapse equally because the disease is the same', false),
      q2.createChoice('Neither will collapse because forests are stable ecosystems', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! In a 5-species forest, oaks might represent 20% of trees—losing them causes massive disruption. In a 50-species forest, oaks might be only 2% of trees, and other species can fill their ecological role. Biodiversity provides resilience through redundancy.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Biodiversity provides insurance against collapse. When many species share ecological roles, losing one species has less impact—others compensate. Low-diversity systems are fragile because each species plays a larger, irreplaceable role.')
      .build());

  // Q3: Climate Impact Integration (5 pts)
  const q3 = form.addMultipleChoiceItem()
    .setTitle('Coral reefs in protected marine areas are still experiencing bleaching events. This demonstrates that:')
    .setHelpText('Question ID: g7_c8_w4_syn_q3')
    .setPoints(5)
    .setChoices([
      q3.createChoice('Marine protected areas don\'t work', false),
      q3.createChoice('Local protection cannot fully shield ecosystems from global climate stressors like ocean warming', true),
      q3.createChoice('Coral bleaching is caused by local pollution, not temperature', false),
      q3.createChoice('Coral reefs are not important ecosystems anyway', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! While marine protected areas help with local threats (overfishing, pollution), they cannot prevent ocean temperature rise from global climate change. This shows why addressing climate change requires global action—ecosystems cross political boundaries.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Coral bleaching occurs when water temperatures rise, causing corals to expel their symbiotic algae. This is a global climate effect that local protection cannot prevent. Effective conservation must address both local and global threats.')
      .build());

  // Q4: Synthesis Integration (10 pts)
  form.addParagraphTextItem()
    .setTitle('Imagine a coastal ecosystem with the following: kelp forests, sea otters, sea urchins, and various fish species. Sea otters eat sea urchins, which eat kelp. Climate change is warming the water.\n\nExplain: (1) What trophic cascade would occur if sea otters were removed? (2) How would biodiversity affect the ecosystem\'s response? (3) How might climate change interact with these effects?')
    .setHelpText('Question ID: g7_c8_w4_syn_q4 | 10 points: Trophic cascade explanation (3), Biodiversity role (3), Climate interaction (3), Scientific reasoning (1)')
    .setRequired(true);

  return form;
}

/**
 * Part 2: Student Investigation Presentation (35 pts, 30 min)
 * Focus: Present self-selected ecosystem investigation
 */
function createPart2InvestigationPresentation() {
  const form = FormApp.create('G7.C8.W4: Part 2 - Investigation Presentation');
  form.setDescription(
    'Student Investigation Presentation Rubric\n\n' +
    'Time: 30 minutes | Points: 35\n\n' +
    'This form is used to evaluate your ecosystem investigation presentation. ' +
    'Your teacher will complete the rubric portion.'
  );
  form.setIsQuiz(true);

  // Self-Assessment Section
  form.addSectionHeaderItem()
    .setTitle('Presentation Self-Assessment')
    .setHelpText('Complete this before your presentation.');

  // Investigation Topic
  form.addTextItem()
    .setTitle('What ecosystem or ecological phenomenon did you investigate?')
    .setHelpText('Question ID: g7_c8_w4_pres_topic')
    .setRequired(true);

  // Research Question
  form.addTextItem()
    .setTitle('What was your main research question?')
    .setHelpText('Question ID: g7_c8_w4_pres_question')
    .setRequired(true);

  // Evidence Sources
  form.addParagraphTextItem()
    .setTitle('List the evidence sources you used (at least 3 sources).')
    .setHelpText('Question ID: g7_c8_w4_pres_sources')
    .setRequired(true);

  // CCC Connection
  const cccItem = form.addCheckboxItem()
    .setTitle('Which Cross-Cutting Concepts (CCCs) did you apply in your investigation? Select all that apply.')
    .setHelpText('Question ID: g7_c8_w4_pres_ccc')
    .setChoices([
      cccItem.createChoice('Patterns - Identifying patterns in ecosystem data'),
      cccItem.createChoice('Cause and Effect - Explaining why changes occur'),
      cccItem.createChoice('Scale, Proportion, and Quantity - Using measurements and comparisons'),
      cccItem.createChoice('Systems and System Models - Viewing ecosystem as interconnected parts'),
      cccItem.createChoice('Energy and Matter - Tracking energy flow through system'),
      cccItem.createChoice('Structure and Function - Connecting organism features to roles'),
      cccItem.createChoice('Stability and Change - Analyzing what keeps/disrupts balance')
    ]);

  // Teacher Rubric Section
  form.addSectionHeaderItem()
    .setTitle('Teacher Evaluation Rubric')
    .setHelpText('This section is completed by the teacher during the presentation.');

  // Scientific Accuracy (10 pts)
  const accuracy = form.addScaleItem()
    .setTitle('Scientific Accuracy: Are the ecological concepts correctly explained and applied?')
    .setHelpText('1-2: Major misconceptions | 3-4: Some errors | 5-6: Mostly accurate | 7-8: Highly accurate | 9-10: Exceptional accuracy')
    .setBounds(1, 10)
    .setLabels('Major misconceptions', 'Exceptional accuracy');

  // Evidence Use (10 pts)
  const evidence = form.addScaleItem()
    .setTitle('Evidence Use: Is the argument supported by relevant, credible evidence?')
    .setHelpText('1-2: No evidence | 3-4: Weak evidence | 5-6: Adequate evidence | 7-8: Strong evidence | 9-10: Compelling, well-integrated evidence')
    .setBounds(1, 10)
    .setLabels('No evidence', 'Compelling evidence');

  // CCC Application (10 pts)
  const cccRubric = form.addScaleItem()
    .setTitle('CCC Application: Are Cross-Cutting Concepts explicitly and correctly applied?')
    .setHelpText('1-2: No CCCs | 3-4: CCCs mentioned | 5-6: CCCs applied | 7-8: CCCs well-integrated | 9-10: Sophisticated CCC application')
    .setBounds(1, 10)
    .setLabels('No CCCs applied', 'Sophisticated application');

  // Communication (5 pts)
  const communication = form.addScaleItem()
    .setTitle('Communication: Is the presentation clear, organized, and engaging?')
    .setHelpText('1: Unclear | 2: Needs improvement | 3: Adequate | 4: Good | 5: Excellent')
    .setBounds(1, 5)
    .setLabels('Unclear', 'Excellent');

  // Teacher Comments
  form.addParagraphTextItem()
    .setTitle('Teacher Comments and Feedback')
    .setHelpText('Provide specific feedback on strengths and areas for growth.');

  return form;
}

/**
 * Part 3: CCC Year-End Synthesis (25 pts, 20 min)
 * Focus: Apply all 7 CCCs to novel Earth science scenario
 */
function createPart3CCCSynthesis() {
  const form = FormApp.create('G7.C8.W4: Part 3 - CCC Year-End Synthesis');
  form.setDescription(
    'Cross-Cutting Concepts Year-End Synthesis\n\n' +
    'Time: 20 minutes | Points: 25\n\n' +
    'Demonstrate your ability to apply all 7 Cross-Cutting Concepts (CCCs) to analyze a scientific scenario. ' +
    'CCCs are the thinking tools scientists use across all disciplines.'
  );
  form.setIsQuiz(true);

  // Instructions
  form.addSectionHeaderItem()
    .setTitle('The Amazon Rainforest Challenge')
    .setHelpText(
      'Scenario: Scientists have discovered that deforestation in the Amazon is not only reducing biodiversity ' +
      'but also changing rainfall patterns across South America. As trees are removed, less water evaporates, ' +
      'leading to drier conditions even in areas far from the deforestation. Apply each CCC to analyze this phenomenon.'
    );

  // CCC 1: Patterns (3 pts)
  form.addParagraphTextItem()
    .setTitle('CCC 1 - PATTERNS: What patterns do scientists observe in the relationship between deforestation and rainfall? What patterns might help predict future impacts?')
    .setHelpText('Question ID: g7_c8_w4_ccc_q1 | 3 points: Identify relevant patterns in the data/phenomenon')
    .setRequired(true);

  // CCC 2: Cause and Effect (4 pts)
  form.addParagraphTextItem()
    .setTitle('CCC 2 - CAUSE AND EFFECT: Explain the cause-and-effect chain from cutting trees to reduced rainfall. Include at least two intermediate steps.')
    .setHelpText('Question ID: g7_c8_w4_ccc_q2 | 4 points: Clear causal chain with mechanism explanations')
    .setRequired(true);

  // CCC 3: Scale, Proportion, and Quantity (3 pts)
  form.addParagraphTextItem()
    .setTitle('CCC 3 - SCALE, PROPORTION, AND QUANTITY: How does scale matter in this scenario? Consider both the size of deforestation and the geographic scale of effects.')
    .setHelpText('Question ID: g7_c8_w4_ccc_q3 | 3 points: Address scale considerations and proportional relationships')
    .setRequired(true);

  // CCC 4: Systems and System Models (4 pts)
  form.addParagraphTextItem()
    .setTitle('CCC 4 - SYSTEMS AND SYSTEM MODELS: Describe the Amazon as a system. What are the components? How do they interact? What happens when one component (trees) is removed?')
    .setHelpText('Question ID: g7_c8_w4_ccc_q4 | 4 points: System components, interactions, and feedback identified')
    .setRequired(true);

  // CCC 5: Energy and Matter (4 pts)
  form.addParagraphTextItem()
    .setTitle('CCC 5 - ENERGY AND MATTER: Trace the flow of water (matter) through the Amazon system. How do trees move water from ground to atmosphere? What happens to this flow when trees are removed?')
    .setHelpText('Question ID: g7_c8_w4_ccc_q5 | 4 points: Matter/energy flow description with transformation points')
    .setRequired(true);

  // CCC 6: Structure and Function (3 pts)
  form.addParagraphTextItem()
    .setTitle('CCC 6 - STRUCTURE AND FUNCTION: How do the structures of trees (roots, leaves, trunk) relate to their function in the water cycle? Why can\'t other plants fully replace this function?')
    .setHelpText('Question ID: g7_c8_w4_ccc_q6 | 3 points: Structure-function connections for relevant features')
    .setRequired(true);

  // CCC 7: Stability and Change (4 pts)
  form.addParagraphTextItem()
    .setTitle('CCC 7 - STABILITY AND CHANGE: The Amazon has been stable for thousands of years. What factors maintained this stability? At what point might changes become irreversible (a "tipping point")?')
    .setHelpText('Question ID: g7_c8_w4_ccc_q7 | 4 points: Stability factors and change thresholds identified')
    .setRequired(true);

  return form;
}

/**
 * Part 4: Year-End Reflection (15 pts, 15 min)
 * Focus: Growth mindset, science identity, favorite learning moments
 */
function createPart4YearEndReflection() {
  const form = FormApp.create('G7.C8.W4: Part 4 - Year-End Reflection');
  form.setDescription(
    'Year-End Reflection: Your Growth as a Scientist\n\n' +
    'Time: 15 minutes | Points: 15\n\n' +
    'Reflect on your learning journey this year. There are no wrong answers—be honest and thoughtful.'
  );
  form.setIsQuiz(true);

  // Instructions
  form.addSectionHeaderItem()
    .setTitle('Reflecting on Your Year')
    .setHelpText('Take a moment to think about how you\'ve grown as a scientist this year.');

  // Growth Mindset Reflection (5 pts)
  form.addParagraphTextItem()
    .setTitle('Describe a specific moment this year when you struggled with a science concept but eventually understood it. What strategies helped you learn it? How did overcoming this challenge change how you approach difficult topics?')
    .setHelpText('Question ID: g7_c8_w4_ref_q1 | 5 points: Specific example, strategies identified, growth mindset reflection')
    .setRequired(true);

  // Science Identity (5 pts)
  form.addParagraphTextItem()
    .setTitle('Do you see yourself as someone who "does science"? Explain why or why not. Has this view changed during 7th grade? What scientific skills are you most proud of developing?')
    .setHelpText('Question ID: g7_c8_w4_ref_q2 | 5 points: Thoughtful self-assessment, specific skills identified')
    .setRequired(true);

  // Favorite Learning Moment (3 pts)
  form.addParagraphTextItem()
    .setTitle('What was your favorite science learning moment this year? It could be an experiment, a video, a concept that amazed you, or a question that made you think differently. Explain why it stands out.')
    .setHelpText('Question ID: g7_c8_w4_ref_q3 | 3 points: Specific moment identified with meaningful explanation')
    .setRequired(true);

  // Looking Ahead (2 pts)
  form.addParagraphTextItem()
    .setTitle('What science question do you still want to explore? What are you looking forward to learning in 8th grade science?')
    .setHelpText('Question ID: g7_c8_w4_ref_q4 | 2 points: Curiosity and forward-looking response')
    .setRequired(true);

  // Optional: Feedback
  form.addSectionHeaderItem()
    .setTitle('Optional Feedback')
    .setHelpText('This section helps us improve the course for future students.');

  form.addParagraphTextItem()
    .setTitle('[Optional] What suggestions do you have for improving this science class? What worked well? What could be better?')
    .setHelpText('Not graded - your honest feedback helps us improve');

  return form;
}
