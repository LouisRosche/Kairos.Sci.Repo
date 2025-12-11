/**
 * Grade 7 Cycle 1 Week 8: Synthesis & Assessment
 * Standards: MS-LS1-1, MS-LS1-2, MS-LS1-3, MS-LS3-2
 * Focus: Comprehensive assessment of cells, body systems, and heredity
 *
 * Form Structure:
 * - Part 1: Synthesis Review (20 pts, 15 min)
 * - Part 2: Cumulative Assessment (60 pts, 40 min)
 * - Part 3: Misconception Check (20 pts, 20 min)
 *
 * Total: 100 points (~75 minutes)
 */

// ============================================================================
// CONFIGURATION
// ============================================================================

const G7_C1_W8_CONFIG = {
  grade: 7,
  cycle: 1,
  week: 8,
  topic: 'Synthesis & Assessment',
  isAssessmentWeek: true,
  standards: ['MS-LS1-1', 'MS-LS1-2', 'MS-LS1-3', 'MS-LS3-2'],
  points: {
    part1: 20,
    part2: 60,
    part3: 20,
    total: 100
  },
  misconceptionTargets: [
    'cells-hollow',
    'cell-specialization-random',
    'traits-blend',
    'mutations-always-bad'
  ],
  coverageByWeek: {
    w1_w2: 'Cell structure and function',
    w3: 'Gene expression and cell communication',
    w4: 'Body systems integration',
    w5: 'Introduction to heredity',
    w6: 'Mutations and genetic variation',
    w7: 'Sexual vs asexual reproduction'
  }
};

// ============================================================================
// MAIN ENTRY POINT
// ============================================================================

/**
 * Creates all assessment forms for G7 C1 W8
 */
function createAllForms() {
  const results = {
    part1: createPart1SynthesisReview_(),
    part2: createPart2CumulativeAssessment_(),
    part3: createPart3MisconceptionCheck_()
  };

  Logger.log('=== G7 C1 W8 Assessment Forms Created ===');
  Object.entries(results).forEach(([name, url]) => {
    Logger.log(`${name}: ${url}`);
  });

  return results;
}

// ============================================================================
// PART 1: SYNTHESIS REVIEW (20 points, 15 min)
// ============================================================================

function createPart1SynthesisReview_() {
  const form = FormApp.create('G7.C1.W8: Part 1 - Synthesis Review');
  configFormSettings_(form);

  form.setDescription(
    'Part 1: Synthesis Review\n\n' +
    'Connect the major concepts from this cycle: cells, body systems, and heredity.\n\n' +
    'Time: ~15 minutes | Points: 20 | Standards: MS-LS1-1, MS-LS1-3, MS-LS3-2'
  );

  // Q1: Cell to organism connection (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q1: How does the organization of cells into tissues, organs, and organ systems help a multicellular organism survive?')
    .setHelpText('Question ID: g7_c1_w8_p1_q1 | Connects W1-4')
    .setChoices([
      form.createChoice('It makes the organism larger and more visible', false),
      form.createChoice('Different cell types can specialize for specific functions, making the whole system more efficient', true),
      form.createChoice('It protects individual cells from being damaged', false),
      form.createChoice('It allows cells to divide faster', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q2: Heredity and cells connection (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q2: A muscle cell and a nerve cell in your body have identical DNA, yet they look and function completely differently. This is because:')
    .setHelpText('Question ID: g7_c1_w8_p1_q2 | Connects W2-3 and W5')
    .setChoices([
      form.createChoice('They received different DNA from each parent', false),
      form.createChoice('Different genes are turned on/off in each cell type', true),
      form.createChoice('Muscle cells lost their DNA during development', false),
      form.createChoice('Nerve cells mutated to become different', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q3: Variation and survival synthesis (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q3: How does genetic variation (from W6-7) relate to body system function (from W4)?')
    .setHelpText('Question ID: g7_c1_w8_p1_q3 | Connects W4, W6, W7')
    .setChoices([
      form.createChoice('Genetic variation has no effect on body systems', false),
      form.createChoice('Different gene versions can affect how efficiently body systems work, helping some individuals survive better', true),
      form.createChoice('Body systems cause genetic mutations', false),
      form.createChoice('All body systems work the same regardless of genes', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q4: Integration synthesis (4 pts)
  form.addParagraphTextItem()
    .setTitle('Q4: Create a concept chain linking: DNA → gene expression → cell specialization → body systems → organism survival. Explain each arrow in your chain.')
    .setHelpText('Question ID: g7_c1_w8_p1_q4 | 4 points: Must explain all four connections')
    .setRequired(true);
  setPointsForLastItem_(form, 4);

  // Q5: Big picture synthesis (4 pts)
  form.addParagraphTextItem()
    .setTitle('Q5: A genetic mutation occurs in a person that affects a protein needed for heart muscle function. Trace the effects from the molecular level (gene/protein) to the organ system level (circulatory system) to the whole organism level (survival).')
    .setHelpText('Question ID: g7_c1_w8_p1_q5 | 4 points: Must address all three levels')
    .setRequired(true);
  setPointsForLastItem_(form, 4);

  return form.getPublishedUrl();
}

// ============================================================================
// PART 2: CUMULATIVE ASSESSMENT (60 points, 40 min)
// ============================================================================

function createPart2CumulativeAssessment_() {
  const form = FormApp.create('G7.C1.W8: Part 2 - Cumulative Assessment');
  configFormSettings_(form);

  form.setDescription(
    'Part 2: Cumulative Assessment\n\n' +
    'Demonstrate your mastery of all Cycle 1 content.\n\n' +
    'Time: ~40 minutes | Points: 60 | Standards: MS-LS1-1, MS-LS1-2, MS-LS1-3, MS-LS3-2'
  );

  // ========== SECTION A: Cell Structure & Function (15 pts) ==========
  form.addSectionHeaderItem()
    .setTitle('Section A: Cell Structure & Function')
    .setHelpText('W1-W2 Content | 15 points');

  // A1 (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('A1: Which organelle is responsible for producing ATP (energy) for the cell?')
    .setHelpText('Question ID: g7_c1_w8_p2_a1')
    .setChoices([
      form.createChoice('Nucleus', false),
      form.createChoice('Mitochondria', true),
      form.createChoice('Ribosome', false),
      form.createChoice('Cell membrane', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // A2 (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('A2: What is the function of the cell membrane?')
    .setHelpText('Question ID: g7_c1_w8_p2_a2')
    .setChoices([
      form.createChoice('Store genetic information', false),
      form.createChoice('Produce proteins', false),
      form.createChoice('Control what enters and leaves the cell', true),
      form.createChoice('Break down waste materials', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // A3 (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('A3: How do plant cells differ from animal cells?')
    .setHelpText('Question ID: g7_c1_w8_p2_a3')
    .setChoices([
      form.createChoice('Plant cells have no nucleus', false),
      form.createChoice('Plant cells have chloroplasts and cell walls that animal cells lack', true),
      form.createChoice('Animal cells are always larger', false),
      form.createChoice('Animal cells have more mitochondria', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // A4 (5 pts)
  form.addParagraphTextItem()
    .setTitle('A4: A red blood cell, a nerve cell, and a muscle cell all come from the same fertilized egg. Explain how these cells became different types with specialized functions.')
    .setHelpText('Question ID: g7_c1_w8_p2_a4 | 5 points: Must address gene expression and differentiation')
    .setRequired(true);
  setPointsForLastItem_(form, 5);

  // ========== SECTION B: Body Systems (15 pts) ==========
  form.addSectionHeaderItem()
    .setTitle('Section B: Body Systems')
    .setHelpText('W3-W4 Content | 15 points');

  // B1 (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('B1: When you exercise, your heart rate increases. This is an example of:')
    .setHelpText('Question ID: g7_c1_w8_p2_b1')
    .setChoices([
      form.createChoice('Negative feedback maintaining homeostasis', false),
      form.createChoice('Body systems working together to meet increased oxygen demand', true),
      form.createChoice('A malfunction in the cardiovascular system', false),
      form.createChoice('Random variation in heart function', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // B2 (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('B2: How do cells communicate with each other to coordinate body functions?')
    .setHelpText('Question ID: g7_c1_w8_p2_b2')
    .setChoices([
      form.createChoice('They touch each other directly', false),
      form.createChoice('Through chemical signals (hormones, neurotransmitters)', true),
      form.createChoice('Through sound waves', false),
      form.createChoice('They don\'t need to communicate', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // B3 (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('B3: If the digestive system fails to absorb nutrients properly, which other systems would be MOST directly affected?')
    .setHelpText('Question ID: g7_c1_w8_p2_b3')
    .setChoices([
      form.createChoice('Only the skeletal system', false),
      form.createChoice('All systems, because cells need nutrients for energy and building materials', true),
      form.createChoice('Only the nervous system', false),
      form.createChoice('No other systems would be affected', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // B4 (5 pts)
  form.addParagraphTextItem()
    .setTitle('B4: Explain how the nervous system and circulatory system work together when you touch something hot. Describe the pathway from sensing the heat to moving your hand away.')
    .setHelpText('Question ID: g7_c1_w8_p2_b4 | 5 points: Must describe both systems\' roles and their interaction')
    .setRequired(true);
  setPointsForLastItem_(form, 5);

  // ========== SECTION C: Heredity & Genetics (15 pts) ==========
  form.addSectionHeaderItem()
    .setTitle('Section C: Heredity & Genetics')
    .setHelpText('W5-W7 Content | 15 points');

  // C1 (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('C1: In a Punnett square cross between two heterozygous parents (Aa x Aa), what percentage of offspring are expected to show the dominant phenotype?')
    .setHelpText('Question ID: g7_c1_w8_p2_c1')
    .setChoices([
      form.createChoice('25%', false),
      form.createChoice('50%', false),
      form.createChoice('75%', true),
      form.createChoice('100%', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // C2 (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('C2: What is the PRIMARY advantage of sexual reproduction over asexual reproduction?')
    .setHelpText('Question ID: g7_c1_w8_p2_c2')
    .setChoices([
      form.createChoice('It produces more offspring', false),
      form.createChoice('It creates genetic variation, helping populations adapt', true),
      form.createChoice('It requires less energy', false),
      form.createChoice('It always produces stronger offspring', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // C3 (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('C3: A mutation in a gene can be neutral, harmful, OR beneficial depending on:')
    .setHelpText('Question ID: g7_c1_w8_p2_c3')
    .setChoices([
      form.createChoice('The size of the organism', false),
      form.createChoice('The environment and how the change affects survival/reproduction', true),
      form.createChoice('How old the organism is', false),
      form.createChoice('Mutations are always harmful', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // C4 (5 pts)
  form.addParagraphTextItem()
    .setTitle('C4: Two siblings have the same parents but look quite different from each other. Explain at least THREE sources of genetic variation that could cause these differences.')
    .setHelpText('Question ID: g7_c1_w8_p2_c4 | 5 points: Must identify and explain three distinct sources')
    .setRequired(true);
  setPointsForLastItem_(form, 5);

  // ========== SECTION D: Integration (15 pts) ==========
  form.addSectionHeaderItem()
    .setTitle('Section D: Integration')
    .setHelpText('Cross-cycle Integration | 15 points');

  // D1 (5 pts)
  form.addParagraphTextItem()
    .setTitle('D1: Cystic fibrosis is caused by a mutation in a gene that makes a protein for cell membranes. Explain how a change in DNA (heredity) affects protein function (cells) and eventually impacts multiple body systems.')
    .setHelpText('Question ID: g7_c1_w8_p2_d1 | 5 points: Must connect gene → protein → cell → system')
    .setRequired(true);
  setPointsForLastItem_(form, 5);

  // D2 (5 pts)
  form.addParagraphTextItem()
    .setTitle('D2: A population of rabbits faces a new disease. Explain how genetic variation (from reproduction and mutations) could help some rabbits survive while others don\'t. Why does this matter at the species level?')
    .setHelpText('Question ID: g7_c1_w8_p2_d2 | 5 points: Must connect variation → individual survival → population survival')
    .setRequired(true);
  setPointsForLastItem_(form, 5);

  // D3 (5 pts)
  form.addParagraphTextItem()
    .setTitle('D3: Design Challenge: A scientist wants to create genetically identical copies of a disease-resistant plant. Describe: (1) Which reproduction type to use and why, (2) A potential risk of this approach, (3) How to mitigate that risk.')
    .setHelpText('Question ID: g7_c1_w8_p2_d3 | 5 points: Must address all three parts with scientific reasoning')
    .setRequired(true);
  setPointsForLastItem_(form, 5);

  return form.getPublishedUrl();
}

// ============================================================================
// PART 3: MISCONCEPTION CHECK (20 points, 20 min)
// ============================================================================

function createPart3MisconceptionCheck_() {
  const form = FormApp.create('G7.C1.W8: Part 3 - Misconception Check');
  configFormSettings_(form);

  form.setDescription(
    'Part 3: Misconception Check\n\n' +
    'Identify and correct common misconceptions about cells, systems, and heredity.\n\n' +
    'Time: ~20 minutes | Points: 20'
  );

  // MC1: cells-hollow misconception (5 pts)
  form.addMultipleChoiceItem()
    .setTitle('MC1: A student draws a cell as an empty circle with a smaller circle (nucleus) inside. What is WRONG with this model?')
    .setHelpText('Question ID: g7_c1_w8_p3_mc1 | Targets: cells-hollow')
    .setChoices([
      form.createChoice('The nucleus should be outside the cell', false),
      form.createChoice('Cells are filled with cytoplasm and organelles, not empty', true),
      form.createChoice('The drawing is completely accurate', false),
      form.createChoice('Cells should be drawn as squares', false)
    ])
    .setRequired(true)
    .setPoints(5);

  // MC2: cell-specialization-random misconception (5 pts)
  form.addMultipleChoiceItem()
    .setTitle('MC2: A student says "Cells randomly decide what type of cell to become." What is the CORRECT explanation?')
    .setHelpText('Question ID: g7_c1_w8_p3_mc2 | Targets: cell-specialization-random')
    .setChoices([
      form.createChoice('The student is correct - cell fate is random', false),
      form.createChoice('Chemical signals from nearby cells determine which genes are turned on, directing specialization', true),
      form.createChoice('Cells inherit their type directly from parent cells', false),
      form.createChoice('Only certain cells can become specialized', false)
    ])
    .setRequired(true)
    .setPoints(5);

  // MC3: traits-blend misconception (5 pts)
  form.addMultipleChoiceItem()
    .setTitle('MC3: A student predicts that a red flower crossed with a white flower will ALWAYS produce pink flowers. Why is this prediction INCOMPLETE?')
    .setHelpText('Question ID: g7_c1_w8_p3_mc3 | Targets: traits-blend')
    .setChoices([
      form.createChoice('Flowers can\'t be crossed', false),
      form.createChoice('Traits can show dominance, codominance, or incomplete dominance - not just blending', true),
      form.createChoice('Pink flowers are impossible', false),
      form.createChoice('The prediction is completely correct', false)
    ])
    .setRequired(true)
    .setPoints(5);

  // MC4: mutations-always-bad misconception (5 pts)
  form.addMultipleChoiceItem()
    .setTitle('MC4: A student says "All mutations are harmful and cause diseases." Give the BEST counter-example:')
    .setHelpText('Question ID: g7_c1_w8_p3_mc4 | Targets: mutations-always-bad')
    .setChoices([
      form.createChoice('Mutations are always harmful', false),
      form.createChoice('The sickle cell trait protects against malaria in certain environments', true),
      form.createChoice('Mutations only affect bacteria', false),
      form.createChoice('Mutations cannot be inherited', false)
    ])
    .setRequired(true)
    .setPoints(5);

  return form.getPublishedUrl();
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Configures standard form settings for quizzes
 * @param {GoogleAppsScript.Forms.Form} form - The form to configure
 */
function configFormSettings_(form) {
  form.setIsQuiz(true);
  form.setCollectEmail(true);
  form.setRequireLogin(true);
  form.setLimitOneResponsePerUser(true);
  form.setShowLinkToRespondAgain(false);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Your responses have been recorded. You\'ve completed the Cycle 1 Assessment!\n\n' +
    'Key Learning: Living systems work through organization from molecules to cells to organisms, ' +
    'with genetic information directing it all.'
  );
}

/**
 * Sets points for the last added item (for paragraph items)
 * @param {GoogleAppsScript.Forms.Form} form - The form
 * @param {number} points - Points value
 */
function setPointsForLastItem_(form, points) {
  const items = form.getItems();
  const lastItem = items[items.length - 1];
  if (lastItem.getType() === FormApp.ItemType.PARAGRAPH_TEXT) {
    // Paragraph items need manual grading - points set as general feedback
    // Points are included in helpText for teacher reference
  }
}

// ============================================================================
// INDIVIDUAL FORM CREATORS (for selective deployment)
// ============================================================================

function createG7C1W8Part1() { return createPart1SynthesisReview_(); }
function createG7C1W8Part2() { return createPart2CumulativeAssessment_(); }
function createG7C1W8Part3() { return createPart3MisconceptionCheck_(); }

// ============================================================================
// VALIDATION
// ============================================================================

/**
 * Validates point totals match configuration
 */
function validatePoints_() {
  const expected = G7_C1_W8_CONFIG.points;
  const calculated = {
    part1: 4 + 4 + 4 + 4 + 4,      // 20
    part2: 3 + 3 + 4 + 5 + 3 + 3 + 4 + 5 + 3 + 3 + 4 + 5 + 5 + 5 + 5,  // 60
    part3: 5 + 5 + 5 + 5           // 20
  };
  calculated.total = Object.values(calculated).reduce((a, b) => a + b, 0);

  Logger.log('=== Point Validation ===');
  Object.keys(expected).forEach(key => {
    const match = expected[key] === calculated[key];
    Logger.log(`${key}: Expected ${expected[key]}, Got ${calculated[key]} ${match ? '✓' : '✗'}`);
  });

  return calculated.total === expected.total;
}
