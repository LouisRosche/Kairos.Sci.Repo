/**
 * ============================================================================
 * GRADE 7 - CYCLE 1 WEEK 5: Introduction to Heredity
 * 5 Forms | 100 Points Total | ~75 Minutes
 * ============================================================================
 *
 * Phenomenon: "Why do some siblings look alike while others look completely different?"
 *
 * NGSS Standards:
 * - MS-LS3-2: Develop and use a model to describe why asexual reproduction
 *             results in offspring with identical genetic information and
 *             sexual reproduction results in offspring with genetic variation
 *
 * Three-Dimensional Learning:
 * - SEP-2: Developing and Using Models (Punnett squares)
 * - DCI: LS3.A Inheritance of Traits, LS3.B Variation of Traits
 * - CCC-2: Cause and Effect (genes → traits)
 *
 * Spiral Review: W3 gene expression (transition from cells to heredity)
 *
 * ============================================================================
 */

// ============================================================================
// CONFIGURATION
// ============================================================================

const G7_C1_W5_CONFIG = {
  grade: 7,
  cycle: 1,
  week: 5,
  topic: 'Introduction to Heredity',
  phenomenon: 'Why do some siblings look alike while others look completely different?',

  points: {
    hook: 12,
    station1: 20,
    station2: 20,
    station3: 25,
    exitTicket: 23,
    total: 100
  },

  misconceptions: [
    {
      id: 'traits-blend',
      description: 'Traits from parents blend like mixing paint',
      correctUnderstanding: 'Genes are discrete units; dominant/recessive patterns determine expression',
      targetedIn: ['s2_q3', 'exit_q2']
    },
    {
      id: 'one-gene-one-trait',
      description: 'Each trait is controlled by exactly one gene',
      correctUnderstanding: 'Many traits are influenced by multiple genes; some genes affect multiple traits',
      targetedIn: ['s1_q5', 'exit_q4']
    }
  ],

  spiralTargets: {
    w3: 'Gene expression and cell signaling'
  }
};

// ============================================================================
// MAIN FUNCTION
// ============================================================================

/**
 * Creates all 5 forms for G7 C1 W5
 * @returns {Object} Map of form names to Form objects
 */
function createAllG7C1W5Forms() {
  const forms = {
    hook: createG7C1W5Hook_(),
    station1: createG7C1W5Station1_(),
    station2: createG7C1W5Station2_(),
    station3: createG7C1W5Station3_(),
    exitTicket: createG7C1W5ExitTicket_()
  };

  Logger.log('G7 C1 W5 Forms created successfully');
  Logger.log('Total points: ' + G7_C1_W5_CONFIG.points.total);

  return forms;
}

// ============================================================================
// HOOK: The Sibling Similarity Mystery (12 points, ~10 minutes)
// ============================================================================

/**
 * Hook form exploring family trait patterns
 * Focus: Why do siblings share some but not all traits?
 */
function createG7C1W5Hook_() {
  const form = FormApp.create('G7.C1.W5: Hook - The Sibling Similarity Mystery');
  form.setDescription(
    'Phenomenon: Why do some siblings look alike while others look completely different?\n\n' +
    'Consider these observations:\n' +
    '• Identical twins look exactly alike\n' +
    '• Some siblings look very similar (same hair color, eye color)\n' +
    '• Other siblings look quite different from each other\n' +
    '• All siblings have the SAME two parents\n\n' +
    'How can children from the same parents end up so different?'
  );

  // Q1: Connecting to prior knowledge (2 pts)
  const q1 = form.addMultipleChoiceItem();
  q1.setTitle('From earlier lessons: Where is genetic information stored in cells?')
    .setHelpText('ID: g7_c1_w5_hook_q1 | Points: 2')
    .setRequired(true)
    .setChoices([
      q1.createChoice('In DNA, located in the nucleus', true),
      q1.createChoice('In the cell membrane', false),
      q1.createChoice('In the cytoplasm only', false),
      q1.createChoice('Genetic information floats freely in blood', false)
    ]);
  q1.setPoints(2);

  // Q2: Initial reasoning (3 pts)
  const q2 = form.addMultipleChoiceItem();
  q2.setTitle('Identical twins develop from ONE fertilized egg that splits. Non-identical siblings develop from DIFFERENT fertilized eggs. What does this suggest about why identical twins look the same?')
    .setHelpText('ID: g7_c1_w5_hook_q2 | Points: 3')
    .setRequired(true)
    .setChoices([
      q2.createChoice('Identical twins have exactly the same DNA; other siblings have different DNA combinations', true),
      q2.createChoice('Identical twins share a womb, which makes them look alike', false),
      q2.createChoice('Non-identical siblings have different parents', false),
      q2.createChoice('Twins are always identical', false)
    ]);
  q2.setPoints(3);

  // Q3: Parent contribution (3 pts)
  const q3 = form.addMultipleChoiceItem();
  q3.setTitle('Each parent contributes genetic information to their children. How much does each parent contribute?')
    .setHelpText('ID: g7_c1_w5_hook_q3 | Points: 3')
    .setRequired(true)
    .setChoices([
      q3.createChoice('50% from each parent (half from mom, half from dad)', true),
      q3.createChoice('100% from the mother only', false),
      q3.createChoice('Whichever parent is "stronger" contributes more', false),
      q3.createChoice('It varies randomly between 0-100%', false)
    ]);
  q3.setPoints(3);

  // Q4: Prediction (2 pts)
  const q4 = form.addParagraphTextItem();
  q4.setTitle('If both parents have brown eyes but their child has blue eyes, what might explain this? Use your knowledge of genes from earlier lessons.')
    .setHelpText('ID: g7_c1_w5_hook_q4 | Points: 2 | Rubric: 2=Mentions hidden/recessive genes, 1=Mentions genes generally, 0=No gene reference')
    .setRequired(true);

  // Q5: Phenomenon focus (2 pts)
  const q5 = form.addMultipleChoiceItem();
  q5.setTitle('Today we\'ll learn about HEREDITY - how traits pass from parents to children. The key question is:')
    .setHelpText('ID: g7_c1_w5_hook_q5 | Points: 2')
    .setRequired(true)
    .setChoices([
      q5.createChoice('How do genes from two parents combine to create unique individuals?', true),
      q5.createChoice('How do children choose which traits to have?', false),
      q5.createChoice('Why do all siblings look exactly the same?', false),
      q5.createChoice('How do traits skip from grandparents to grandchildren?', false)
    ]);
  q5.setPoints(2);

  configFormSettings_(form, 'hook');
  return form;
}

// ============================================================================
// STATION 1: Chromosome Investigation (20 points, ~15 minutes)
// ============================================================================

/**
 * Station 1: Chromosome pairing simulation + karyotype analysis
 * Focus: Understand chromosomes carry genetic information
 * Spiral: Gene expression from W3
 */
function createG7C1W5Station1_() {
  const form = FormApp.create('G7.C1.W5: Station 1 - Chromosome Investigation');
  form.setDescription(
    'Station 1: Chromosome Investigation (20 points)\n\n' +
    'KEY VOCABULARY:\n' +
    '• CHROMOSOME: A structure containing DNA with many genes\n' +
    '• Humans have 46 chromosomes (23 PAIRS)\n' +
    '• Each pair has one chromosome from mom, one from dad\n' +
    '• GENE: A segment of DNA that codes for a specific trait\n' +
    '• ALLELE: Different versions of the same gene (e.g., brown eye allele, blue eye allele)\n\n' +
    'Use the chromosome simulation to explore how genetic information is organized.\n\n' +
    '⏱️ Time: ~15 minutes'
  );

  // Q1: Chromosome basics (3 pts)
  const q1 = form.addMultipleChoiceItem();
  q1.setTitle('Humans have 46 chromosomes arranged in 23 pairs. Why are chromosomes in PAIRS?')
    .setHelpText('ID: g7_c1_w5_s1_q1 | Points: 3')
    .setRequired(true)
    .setChoices([
      q1.createChoice('One chromosome in each pair comes from the mother, one from the father', true),
      q1.createChoice('Chromosomes need partners to function', false),
      q1.createChoice('Half the chromosomes are used, half are backup', false),
      q1.createChoice('Pairs are just how scientists count them', false)
    ]);
  q1.setPoints(3);

  // Q2: Genes and chromosomes (4 pts)
  const q2 = form.addMultipleChoiceItem();
  q2.setTitle('A single chromosome contains about 1,000 genes. What does this tell you about the relationship between chromosomes and traits?')
    .setHelpText('ID: g7_c1_w5_s1_q2 | Points: 4')
    .setRequired(true)
    .setChoices([
      q2.createChoice('Each chromosome affects many different traits (contains many genes)', true),
      q2.createChoice('Each chromosome controls exactly one trait', false),
      q2.createChoice('Chromosomes don\'t affect traits at all', false),
      q2.createChoice('1,000 is too many - chromosomes must be smaller', false)
    ]);
  q2.setPoints(4);

  // Q3: Alleles (4 pts)
  const q3 = form.addMultipleChoiceItem();
  q3.setTitle('For the eye color gene, a person might have: Brown allele from mom, Blue allele from dad. What does this mean?')
    .setHelpText('ID: g7_c1_w5_s1_q3 | Points: 4')
    .setRequired(true)
    .setChoices([
      q3.createChoice('The person has TWO different versions of the eye color gene - one on each chromosome of the pair', true),
      q3.createChoice('The person will have one brown eye and one blue eye', false),
      q3.createChoice('The eye colors will blend to make green', false),
      q3.createChoice('The person has no eye color', false)
    ]);
  q3.setPoints(4);

  // Q4: Spiral W3 - Gene expression connection (3 pts)
  const q4 = form.addMultipleChoiceItem();
  q4.setTitle('SPIRAL (W3): Remember that cells express certain genes. If someone has both brown and blue eye alleles, but their eyes are brown, what does this tell us?')
    .setHelpText('ID: g7_c1_w5_s1_q4 | Points: 3 | Connects to gene expression')
    .setRequired(true)
    .setChoices([
      q4.createChoice('Only the brown allele is being expressed (turned on) - it\'s DOMINANT', true),
      q4.createChoice('The blue allele was destroyed', false),
      q4.createChoice('Both alleles are always expressed equally', false),
      q4.createChoice('Eye color has nothing to do with genes', false)
    ]);
  q4.setPoints(3);

  // Q5: Complexity note (4 pts)
  const q5 = form.addMultipleChoiceItem();
  q5.setTitle('Skin color is influenced by at least 8 different genes. Height is influenced by hundreds of genes. Why might this be important to know?')
    .setHelpText('ID: g7_c1_w5_s1_q5 | Points: 4 | Addresses one-gene-one-trait misconception')
    .setRequired(true)
    .setChoices([
      q5.createChoice('Most traits are influenced by MANY genes working together, not just one', true),
      q5.createChoice('These traits don\'t follow inheritance patterns', false),
      q5.createChoice('Only simple traits are inherited', false),
      q5.createChoice('Complex traits can\'t be predicted', false)
    ]);
  q5.setPoints(4);

  // Q6: Karyotype analysis (2 pts)
  const q6 = form.addParagraphTextItem();
  q6.setTitle('Looking at a karyotype (image of all chromosomes), you can see chromosome pair #7 has the same genes in the same locations on both chromosomes, but different alleles. Explain why having two copies of each gene (one from each parent) creates variation in offspring.')
    .setHelpText('ID: g7_c1_w5_s1_q6 | Points: 2 | Rubric: 2=Explains combination creates unique mix, 1=Mentions two copies, 0=Incorrect')
    .setRequired(true);

  configFormSettings_(form, 'station1');
  return form;
}

// ============================================================================
// STATION 2: Trait Inheritance Patterns (20 points, ~15 minutes)
// ============================================================================

/**
 * Station 2: Punnett square introduction + practice problems
 * Focus: Model dominant/recessive trait inheritance
 */
function createG7C1W5Station2_() {
  const form = FormApp.create('G7.C1.W5: Station 2 - Trait Inheritance Patterns');
  form.setDescription(
    'Station 2: Trait Inheritance Patterns (20 points)\n\n' +
    'DOMINANT vs RECESSIVE:\n' +
    '• DOMINANT allele (capital letter, e.g., B): Shows its trait even with only one copy\n' +
    '• RECESSIVE allele (lowercase letter, e.g., b): Only shows its trait with TWO copies\n\n' +
    'GENOTYPE vs PHENOTYPE:\n' +
    '• GENOTYPE: The actual alleles you have (BB, Bb, or bb)\n' +
    '• PHENOTYPE: The trait you can see (brown eyes or blue eyes)\n\n' +
    'A PUNNETT SQUARE predicts possible offspring combinations.\n\n' +
    '⏱️ Time: ~15 minutes'
  );

  // Q1: Dominant/Recessive understanding (4 pts)
  const q1 = form.addMultipleChoiceItem();
  q1.setTitle('Brown eye color (B) is dominant over blue (b). A person with genotype Bb has:')
    .setHelpText('ID: g7_c1_w5_s2_q1 | Points: 4')
    .setRequired(true)
    .setChoices([
      q1.createChoice('Brown eyes - the dominant B allele is expressed', true),
      q1.createChoice('Blue eyes - b is expressed', false),
      q1.createChoice('One brown eye and one blue eye', false),
      q1.createChoice('Green eyes - the colors mix', false)
    ]);
  q1.setPoints(4);

  // Q2: Punnett square basics (4 pts)
  const q2 = form.addMultipleChoiceItem();
  q2.setTitle('Parent 1: Bb (brown eyes). Parent 2: bb (blue eyes). What are the possible genotypes for their children?')
    .setHelpText('ID: g7_c1_w5_s2_q2 | Points: 4 | Draw a Punnett square to help')
    .setRequired(true)
    .setChoices([
      q2.createChoice('50% Bb (brown), 50% bb (blue)', true),
      q2.createChoice('100% Bb (all brown)', false),
      q2.createChoice('100% bb (all blue)', false),
      q2.createChoice('25% BB, 50% Bb, 25% bb', false)
    ]);
  q2.setPoints(4);

  // Q3: Misconception targeting - traits don't blend (4 pts)
  const q3 = form.addMultipleChoiceItem();
  q3.setTitle('A student says: "If one parent has brown eyes and one has blue, the child should have in-between colored eyes." Why is this incorrect?')
    .setHelpText('ID: g7_c1_w5_s2_q3 | Points: 4 | Targets blending misconception')
    .setRequired(true)
    .setChoices([
      q3.createChoice('Genes don\'t blend - the dominant allele is expressed OR both recessive alleles are needed', true),
      q3.createChoice('The student is correct - traits always blend', false),
      q3.createChoice('Eye color can\'t be inherited', false),
      q3.createChoice('Children always have the mother\'s eye color', false)
    ]);
  q3.setPoints(4);

  // Q4: Two brown-eyed parents (4 pts)
  const q4 = form.addMultipleChoiceItem();
  q4.setTitle('Two brown-eyed parents (both Bb) have a child with blue eyes. How is this possible?')
    .setHelpText('ID: g7_c1_w5_s2_q4 | Points: 4')
    .setRequired(true)
    .setChoices([
      q4.createChoice('Each parent passed their recessive b allele, giving the child bb (blue)', true),
      q4.createChoice('The child isn\'t really their biological child', false),
      q4.createChoice('Eye color changes over time', false),
      q4.createChoice('This is impossible - brown-eyed parents can only have brown-eyed children', false)
    ]);
  q4.setPoints(4);

  // Q5: Probability (4 pts)
  const q5 = form.addParagraphTextItem();
  q5.setTitle('Using a Punnett square, cross two Bb parents. List all four possible offspring genotypes and calculate the probability of having a blue-eyed (bb) child.')
    .setHelpText('ID: g7_c1_w5_s2_q5 | Points: 4 | Rubric: 4=Correct square (BB, Bb, Bb, bb) and 25% probability, 3=Correct genotypes OR probability, 2=Partial square, 1=Attempt')
    .setRequired(true);

  configFormSettings_(form, 'station2');
  return form;
}

// ============================================================================
// STATION 3: Design a Breeding Plan (25 points, ~20 minutes)
// ============================================================================

/**
 * Station 3: Agricultural scenario + trait goals
 * Focus: Apply inheritance knowledge to predict offspring
 */
function createG7C1W5Station3_() {
  const form = FormApp.create('G7.C1.W5: Station 3 - Design a Breeding Plan');
  form.setDescription(
    'Station 3: Agricultural Engineering Challenge (25 points)\n\n' +
    'SCENARIO: You are a plant breeder working with tomatoes.\n\n' +
    'TRAITS:\n' +
    '• Red fruit (R) is DOMINANT over yellow fruit (r)\n' +
    '• Tall plants (T) is DOMINANT over short plants (t)\n\n' +
    'Your client wants: YELLOW fruit on TALL plants\n' +
    'Available plants: Red/Tall (RrTt), Yellow/Short (rrtt)\n\n' +
    'Design a breeding plan to achieve the goal!\n\n' +
    '⏱️ Time: ~20 minutes'
  );

  // Q1: Identify target genotype (4 pts)
  const q1 = form.addMultipleChoiceItem();
  q1.setTitle('What genotype do you need for YELLOW fruit on TALL plants?')
    .setHelpText('ID: g7_c1_w5_s3_q1 | Points: 4')
    .setRequired(true)
    .setChoices([
      q1.createChoice('rrTt or rrTT (must be rr for yellow, must have at least one T for tall)', true),
      q1.createChoice('RRtt (dominant for both)', false),
      q1.createChoice('Rrtt (one of each)', false),
      q1.createChoice('Any genotype will work', false)
    ]);
  q1.setPoints(4);

  // Q2: First cross analysis (5 pts)
  const q2 = form.addMultipleChoiceItem();
  q2.setTitle('Cross: RrTt × rrtt. Can you get a yellow/tall (rrT_) plant from this cross?')
    .setHelpText('ID: g7_c1_w5_s3_q2 | Points: 5')
    .setRequired(true)
    .setChoices([
      q2.createChoice('Yes - offspring can be rrTt if they get r from RrTt parent and rt from rrtt parent', true),
      q2.createChoice('No - you can never get yellow from this cross', false),
      q2.createChoice('No - all offspring will be short', false),
      q2.createChoice('Yes - all offspring will be yellow/tall', false)
    ]);
  q2.setPoints(5);

  // Q3: Design the breeding plan (5 pts)
  const q3 = form.addParagraphTextItem();
  q3.setTitle('DESIGN: Describe your step-by-step breeding plan. Include: (1) Which plants to cross first, (2) What offspring you\'re looking for, (3) How you would identify the yellow/tall plants.')
    .setHelpText('ID: g7_c1_w5_s3_q3 | Points: 5 | Rubric: 5=All 3 elements with genetic reasoning, 4=All elements basic, 3=2 elements, 2=1 element, 1=Attempt')
    .setRequired(true);

  // Q4: Probability calculation (5 pts)
  const q4 = form.addMultipleChoiceItem();
  q4.setTitle('From the cross RrTt × rrtt, what fraction of offspring would be expected to have yellow fruit (rr)?')
    .setHelpText('ID: g7_c1_w5_s3_q4 | Points: 5 | Think about just the R gene first')
    .setRequired(true)
    .setChoices([
      q4.createChoice('1/2 (50%) - half get R from parent, half get r', true),
      q4.createChoice('1/4 (25%)', false),
      q4.createChoice('All of them', false),
      q4.createChoice('None of them', false)
    ]);
  q4.setPoints(5);

  // Q5: Real-world application (6 pts)
  const q5 = form.addParagraphTextItem();
  q5.setTitle('ARGUE: A farmer wants to guarantee that ALL offspring from a cross will have yellow fruit. Is this possible? Explain what parent genotypes would be needed and why.')
    .setHelpText('ID: g7_c1_w5_s3_q5 | Points: 6 | Rubric: 6=Yes, both parents rr (explains reasoning), 4-5=Correct answer partial reasoning, 2-3=Attempts genetic reasoning, 1=Attempt')
    .setRequired(true);

  configFormSettings_(form, 'station3');
  return form;
}

// ============================================================================
// EXIT TICKET: Heredity Basics Integration (23 points, ~15 minutes)
// ============================================================================

/**
 * Exit Ticket with structure: NEW: 2, SPIRAL: 2, INTEGRATION: 1, SEP-1: 1
 */
function createG7C1W5ExitTicket_() {
  const form = FormApp.create('G7.C1.W5: Exit Ticket - Heredity Basics Integration');
  form.setDescription(
    'Exit Ticket: Introduction to Heredity (23 points)\n\n' +
    'Demonstrate your understanding of chromosomes, genes, and inheritance patterns.\n\n' +
    '⏱️ Time: ~15 minutes'
  );

  // Q1: NEW - Core vocabulary (4 pts)
  const q1 = form.addMultipleChoiceItem();
  q1.setTitle('NEW: What is the difference between a GENE and an ALLELE?')
    .setHelpText('ID: g7_c1_w5_exit_q1 | Points: 4')
    .setRequired(true)
    .setChoices([
      q1.createChoice('A gene is a section of DNA for a trait; alleles are different versions of that gene', true),
      q1.createChoice('They mean the same thing', false),
      q1.createChoice('Alleles are larger than genes', false),
      q1.createChoice('Genes are in DNA; alleles are in chromosomes', false)
    ]);
  q1.setPoints(4);

  // Q2: NEW - Misconception targeting (4 pts)
  const q2 = form.addMultipleChoiceItem();
  q2.setTitle('NEW: A red flower crossed with a white flower produces all PINK flowers. What does this tell us about dominance?')
    .setHelpText('ID: g7_c1_w5_exit_q2 | Points: 4 | Note: This is INCOMPLETE dominance - a special case')
    .setRequired(true)
    .setChoices([
      q2.createChoice('Neither allele is completely dominant - both are partially expressed (incomplete dominance)', true),
      q2.createChoice('Pink is always dominant over red and white', false),
      q2.createChoice('This proves all traits blend like paint', false),
      q2.createChoice('The flowers are a different species', false)
    ]);
  q2.setPoints(4);

  // Q3: SPIRAL W3 - Gene expression (4 pts)
  const q3 = form.addMultipleChoiceItem();
  q3.setTitle('SPIRAL (W3): How does gene expression connect to dominant/recessive alleles?')
    .setHelpText('ID: g7_c1_w5_exit_q3 | Points: 4 | Connects to W3 signaling')
    .setRequired(true)
    .setChoices([
      q3.createChoice('A dominant allele is expressed (turned on) even with only one copy; recessive needs two copies to be expressed', true),
      q3.createChoice('Gene expression and inheritance are completely separate concepts', false),
      q3.createChoice('All alleles are always expressed equally', false),
      q3.createChoice('Recessive alleles don\'t have genes', false)
    ]);
  q3.setPoints(4);

  // Q4: SPIRAL - Multiple genes (3 pts)
  const q4 = form.addMultipleChoiceItem();
  q4.setTitle('SPIRAL: Why do siblings from the same parents often look different from each other?')
    .setHelpText('ID: g7_c1_w5_exit_q4 | Points: 3')
    .setRequired(true)
    .setChoices([
      q4.createChoice('Each sibling receives a DIFFERENT combination of alleles from the same parents', true),
      q4.createChoice('Siblings actually have different DNA', false),
      q4.createChoice('Only identical twins are related', false),
      q4.createChoice('Parents give different amounts of DNA to each child', false)
    ]);
  q4.setPoints(3);

  // Q5: INTEGRATION (4 pts)
  const q5 = form.addParagraphTextItem();
  q5.setTitle('INTEGRATION: A couple wants to know the chance their child will have a genetic condition. The condition is recessive (cc). The father is a carrier (Cc). The mother is also a carrier (Cc). Use a Punnett square to determine: (1) The possible genotypes of children, (2) The chance of having an affected child (cc).')
    .setHelpText('ID: g7_c1_w5_exit_q5 | Points: 4 | Rubric: 4=Correct square and 25% probability, 3=Correct probability OR genotypes, 2=Partial answer, 1=Attempt')
    .setRequired(true);

  // Q6: SEP-2 - Using models (4 pts)
  const q6 = form.addParagraphTextItem();
  q6.setTitle('SEP-2: Punnett squares are models that help predict inheritance. What are the LIMITATIONS of this model? Name ONE thing a Punnett square can\'t predict accurately.')
    .setHelpText('ID: g7_c1_w5_exit_q6 | Points: 4 | Rubric: 4=Names valid limitation (e.g., multiple genes, environmental effects, mutations), 3=Mentions complexity, 2=Basic limitation, 1=Attempt')
    .setRequired(true);

  // Confidence scale (diagnostic only)
  const confidence = form.addScaleItem();
  confidence.setTitle('How confident are you in using Punnett squares to predict inheritance?')
    .setHelpText('Diagnostic only - not graded')
    .setBounds(1, 5)
    .setLabels('Not confident', 'Very confident')
    .setRequired(true);
  confidence.setPoints(0);

  configFormSettings_(form, 'exitTicket');
  return form;
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function configFormSettings_(form, formType) {
  form.setIsQuiz(true);
  form.setCollectEmail(true);
  form.setRequireLogin(true);
  form.setLimitOneResponsePerUser(true);
  form.setProgressBar(true);

  if (formType === 'exitTicket') {
    form.setShuffleQuestions(false);
  }

  const metadata = '\n\n---\nForm ID: g7_c1_w5_' + formType +
                   '\nPoints: ' + G7_C1_W5_CONFIG.points[formType] +
                   '\nGenerated: ' + new Date().toISOString().split('T')[0];

  const currentDesc = form.getDescription();
  form.setDescription(currentDesc + metadata);
}

function validateG7C1W5Points_() {
  const expected = G7_C1_W5_CONFIG.points;
  Logger.log('G7 C1 W5 Point Validation');
  Logger.log('Expected totals: Hook=' + expected.hook + ', S1=' + expected.station1 +
             ', S2=' + expected.station2 + ', S3=' + expected.station3 +
             ', Exit=' + expected.exitTicket);
  Logger.log('Grand Total Expected: ' + expected.total);
  return { valid: true, totalExpected: expected.total };
}

// ============================================================================
// RUBRICS REFERENCE
// ============================================================================

const G7_C1_W5_RUBRICS = {
  hook_q4: {
    points: 2,
    criteria: {
      2: 'Mentions hidden/recessive genes that both parents carry',
      1: 'Mentions genes but doesn\'t explain recessive',
      0: 'No gene reference'
    }
  },
  s1_q6: {
    points: 2,
    criteria: {
      2: 'Explains that combining different alleles from two parents creates unique combinations',
      1: 'Mentions two copies but doesn\'t explain variation',
      0: 'Incorrect explanation'
    }
  },
  s2_q5: {
    points: 4,
    criteria: {
      4: 'Correct Punnett square (BB, Bb, Bb, bb) AND 25% probability stated',
      3: 'Correct genotypes OR correct probability',
      2: 'Partial Punnett square',
      1: 'Attempt'
    }
  },
  s3_q3: {
    points: 5,
    criteria: {
      5: 'All 3 elements (cross plan, target offspring, identification method) with genetic reasoning',
      4: 'All 3 elements present but basic',
      3: '2 elements well-addressed',
      2: '1 element addressed',
      1: 'Attempt'
    }
  },
  s3_q5: {
    points: 6,
    criteria: {
      6: 'Yes, both parents must be rr (homozygous recessive) with clear explanation',
      '4-5': 'Correct answer with partial reasoning',
      '2-3': 'Attempts genetic reasoning',
      1: 'Attempt'
    }
  },
  exit_q5: {
    points: 4,
    criteria: {
      4: 'Correct Punnett square (CC, Cc, Cc, cc) AND 25% (1/4) chance stated',
      3: 'Correct probability OR correct genotypes',
      2: 'Partial answer',
      1: 'Attempt'
    }
  },
  exit_q6: {
    points: 4,
    criteria: {
      4: 'Names valid limitation (e.g., multiple genes for complex traits, environmental effects, mutations)',
      3: 'Mentions complexity of traits',
      2: 'Basic limitation mentioned',
      1: 'Attempt'
    }
  }
};
