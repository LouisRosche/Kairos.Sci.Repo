/**
 * ============================================================================
 * GRADE 7 - CYCLE 1 WEEK 6: Genetic Variation
 * 5 Forms | 100 Points Total | ~75 Minutes
 * ============================================================================
 *
 * Phenomenon: "Why are no two people (except identical twins) exactly alike?"
 *
 * NGSS Standards:
 * - MS-LS3-2: Develop and use a model to describe why asexual reproduction
 *             results in offspring with identical genetic information and
 *             sexual reproduction results in offspring with genetic variation
 *
 * Three-Dimensional Learning:
 * - SEP-2: Developing and Using Models (meiosis)
 * - SEP-4: Analyzing and Interpreting Data (trait frequencies)
 * - DCI: LS3.B Variation of Traits
 * - CCC-2: Cause and Effect (meiosis → variation)
 *
 * Spiral Review: W5 Punnett squares and inheritance patterns
 *
 * ============================================================================
 */

// ============================================================================
// CONFIGURATION
// ============================================================================

const G7_C1_W6_CONFIG = {
  grade: 7,
  cycle: 1,
  week: 6,
  topic: 'Genetic Variation',
  phenomenon: 'Why are no two people (except identical twins) exactly alike?',

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
      id: 'siblings-should-match',
      description: 'Siblings should look more similar since they have the same parents',
      correctUnderstanding: 'Each sibling gets a DIFFERENT random combination of parent alleles',
      targetedIn: ['s1_q4', 'exit_q2']
    },
    {
      id: 'mutation-always-bad',
      description: 'All mutations are harmful',
      correctUnderstanding: 'Mutations can be harmful, neutral, or beneficial depending on environment',
      targetedIn: ['s2_q4', 'exit_q4']
    }
  ],

  spiralTargets: {
    w5: 'Punnett squares and inheritance patterns'
  }
};

// ============================================================================
// MAIN FUNCTION
// ============================================================================

function createAllG7C1W6Forms() {
  const forms = {
    hook: createG7C1W6Hook_(),
    station1: createG7C1W6Station1_(),
    station2: createG7C1W6Station2_(),
    station3: createG7C1W6Station3_(),
    exitTicket: createG7C1W6ExitTicket_()
  };

  Logger.log('G7 C1 W6 Forms created successfully');
  Logger.log('Total points: ' + G7_C1_W6_CONFIG.points.total);

  return forms;
}

// ============================================================================
// HOOK: The Fingerprint Mystery (12 points, ~10 minutes)
// ============================================================================

function createG7C1W6Hook_() {
  const form = FormApp.create('G7.C1.W6: Hook - The Fingerprint Mystery');
  form.setDescription(
    'Phenomenon: Why are no two people (except identical twins) exactly alike?\n\n' +
    'OBSERVATION:\n' +
    '• Every person has unique fingerprints - even identical twins have slight differences\n' +
    '• There are 8 billion people on Earth, yet no two share the same fingerprints\n' +
    '• Siblings from the same parents look different from each other\n' +
    '• Even traits controlled by the same genes show variation\n\n' +
    'How does nature create so much diversity from the same genetic "alphabet"?'
  );

  // Q1: Connecting to W5 (2 pts)
  const q1 = form.addMultipleChoiceItem();
  q1.setTitle('From Week 5: Each parent contributes half their genetic information. If you have 2 siblings, do they get the SAME half from each parent?')
    .setHelpText('ID: g7_c1_w6_hook_q1 | Points: 2')
    .setRequired(true)
    .setChoices([
      q1.createChoice('No - each sibling gets a DIFFERENT random half from each parent', true),
      q1.createChoice('Yes - siblings get identical genetic information', false),
      q1.createChoice('Only identical twins get the same half', false),
      q1.createChoice('Siblings don\'t share any genetic information', false)
    ]);
  q1.setPoints(2);

  // Q2: Scale of variation (3 pts)
  const q2 = form.addMultipleChoiceItem();
  q2.setTitle('Humans have about 20,000 genes, each with multiple possible alleles. How many unique genetic combinations are theoretically possible?')
    .setHelpText('ID: g7_c1_w6_hook_q2 | Points: 3')
    .setRequired(true)
    .setChoices([
      q2.createChoice('Trillions upon trillions - far more than all humans who ever lived', true),
      q2.createChoice('About 20,000 different combinations', false),
      q2.createChoice('Only a few hundred possible combinations', false),
      q2.createChoice('Exactly 8 billion - one per person currently alive', false)
    ]);
  q2.setPoints(3);

  // Q3: Identical twins (3 pts)
  const q3 = form.addMultipleChoiceItem();
  q3.setTitle('Identical twins have the SAME DNA. Why don\'t they have identical fingerprints?')
    .setHelpText('ID: g7_c1_w6_hook_q3 | Points: 3')
    .setRequired(true)
    .setChoices([
      q3.createChoice('Some traits are affected by random developmental processes, not just genes', true),
      q3.createChoice('Their DNA mutated after they split', false),
      q3.createChoice('Fingerprints aren\'t controlled by genes at all', false),
      q3.createChoice('Identical twins actually have different DNA', false)
    ]);
  q3.setPoints(3);

  // Q4: Prediction (2 pts)
  const q4 = form.addParagraphTextItem();
  q4.setTitle('Today we\'ll learn about MEIOSIS - the cell division that creates sex cells (eggs and sperm). Predict: How might this process create genetic variation?')
    .setHelpText('ID: g7_c1_w6_hook_q4 | Points: 2 | Rubric: 2=Mentions shuffling/mixing of genes, 1=Mentions cell division, 0=Off-topic')
    .setRequired(true);

  // Q5: Phenomenon focus (2 pts)
  const q5 = form.addMultipleChoiceItem();
  q5.setTitle('Genetic variation is important because it:')
    .setHelpText('ID: g7_c1_w6_hook_q5 | Points: 2')
    .setRequired(true)
    .setChoices([
      q5.createChoice('Allows populations to adapt to changing environments through natural selection', true),
      q5.createChoice('Makes people look more interesting', false),
      q5.createChoice('Is just random noise with no purpose', false),
      q5.createChoice('Only affects appearance, not survival', false)
    ]);
  q5.setPoints(2);

  configFormSettings_(form, 'hook');
  return form;
}

// ============================================================================
// STATION 1: Meiosis Simulation (20 points, ~15 minutes)
// ============================================================================

function createG7C1W6Station1_() {
  const form = FormApp.create('G7.C1.W6: Station 1 - Meiosis Simulation');
  form.setDescription(
    'Station 1: Meiosis Simulation (20 points)\n\n' +
    'MEIOSIS: Cell division that produces sex cells (gametes)\n\n' +
    'KEY EVENTS creating variation:\n' +
    '1. INDEPENDENT ASSORTMENT: Chromosome pairs line up randomly\n' +
    '   → Each gamete gets a random mix of maternal/paternal chromosomes\n\n' +
    '2. CROSSING OVER: Homologous chromosomes exchange segments\n' +
    '   → Creates NEW allele combinations on chromosomes\n\n' +
    'Result: Each gamete is genetically UNIQUE\n\n' +
    'Use the meiosis simulation to visualize these processes.\n\n' +
    '⏱️ Time: ~15 minutes'
  );

  // Q1: Basic meiosis outcome (3 pts)
  const q1 = form.addMultipleChoiceItem();
  q1.setTitle('A cell with 46 chromosomes undergoes meiosis. How many chromosomes does each resulting gamete have?')
    .setHelpText('ID: g7_c1_w6_s1_q1 | Points: 3')
    .setRequired(true)
    .setChoices([
      q1.createChoice('23 - half the original number (one from each pair)', true),
      q1.createChoice('46 - the same number', false),
      q1.createChoice('92 - double the number', false),
      q1.createChoice('12 - one quarter', false)
    ]);
  q1.setPoints(3);

  // Q2: Independent assortment (4 pts)
  const q2 = form.addMultipleChoiceItem();
  q2.setTitle('With 23 chromosome pairs, how many different combinations are possible from independent assortment alone?')
    .setHelpText('ID: g7_c1_w6_s1_q2 | Points: 4')
    .setRequired(true)
    .setChoices([
      q2.createChoice('2²³ = over 8 million different combinations', true),
      q2.createChoice('23 combinations', false),
      q2.createChoice('46 combinations', false),
      q2.createChoice('Only 2 combinations', false)
    ]);
  q2.setPoints(4);

  // Q3: Crossing over (4 pts)
  const q3 = form.addMultipleChoiceItem();
  q3.setTitle('During crossing over, homologous chromosomes exchange segments. How does this increase variation?')
    .setHelpText('ID: g7_c1_w6_s1_q3 | Points: 4')
    .setRequired(true)
    .setChoices([
      q3.createChoice('It creates NEW combinations of alleles that didn\'t exist on either parent chromosome', true),
      q3.createChoice('It destroys genetic information', false),
      q3.createChoice('It doesn\'t affect variation', false),
      q3.createChoice('It makes chromosomes identical', false)
    ]);
  q3.setPoints(4);

  // Q4: Misconception targeting (4 pts)
  const q4 = form.addMultipleChoiceItem();
  q4.setTitle('A student asks: "If siblings have the same parents, why don\'t they look identical?" Which is the BEST explanation?')
    .setHelpText('ID: g7_c1_w6_s1_q4 | Points: 4 | Targets sibling similarity misconception')
    .setRequired(true)
    .setChoices([
      q4.createChoice('Each sperm and egg is genetically unique due to meiosis - siblings get different combinations', true),
      q4.createChoice('Parents give different amounts of DNA to each child', false),
      q4.createChoice('Siblings should look identical - something went wrong', false),
      q4.createChoice('Environment changes their appearance', false)
    ]);
  q4.setPoints(4);

  // Q5: Spiral W5 - Connecting to inheritance (3 pts)
  const q5 = form.addMultipleChoiceItem();
  q5.setTitle('SPIRAL (W5): A parent is Bb for eye color. What alleles could their gametes contain?')
    .setHelpText('ID: g7_c1_w6_s1_q5 | Points: 3 | Connects to Punnett squares')
    .setRequired(true)
    .setChoices([
      q5.createChoice('Some gametes get B, some get b (50/50 chance of each)', true),
      q5.createChoice('All gametes get Bb', false),
      q5.createChoice('All gametes get B only', false),
      q5.createChoice('Gametes don\'t contain alleles', false)
    ]);
  q5.setPoints(3);

  // Q6: Model explanation (2 pts)
  const q6 = form.addParagraphTextItem();
  q6.setTitle('Explain why sexual reproduction produces more genetic variation than asexual reproduction. Use the terms "meiosis" and "unique combinations" in your answer.')
    .setHelpText('ID: g7_c1_w6_s1_q6 | Points: 2 | Rubric: 2=Explains meiosis creates unique gametes + fertilization combines them, 1=Mentions one concept, 0=Incorrect')
    .setRequired(true);

  configFormSettings_(form, 'station1');
  return form;
}

// ============================================================================
// STATION 2: Variation Analysis (20 points, ~15 minutes)
// ============================================================================

function createG7C1W6Station2_() {
  const form = FormApp.create('G7.C1.W6: Station 2 - Variation Analysis');
  form.setDescription(
    'Station 2: Variation Analysis (20 points)\n\n' +
    'Analyze trait frequency data from a population:\n\n' +
    'TRAIT DATA (sample of 100 students):\n' +
    '• Eye color: Brown (55%), Blue (25%), Green (15%), Hazel (5%)\n' +
    '• Hair texture: Straight (40%), Wavy (45%), Curly (15%)\n' +
    '• Attached earlobes: 35% attached, 65% free\n' +
    '• Tongue rolling: 70% can roll, 30% cannot\n\n' +
    'Analyze patterns and sources of this variation.\n\n' +
    '⏱️ Time: ~15 minutes'
  );

  // Q1: Data interpretation (4 pts)
  const q1 = form.addMultipleChoiceItem();
  q1.setTitle('Why might brown eyes be the most common (55%) while green is rare (15%)?')
    .setHelpText('ID: g7_c1_w6_s2_q1 | Points: 4')
    .setRequired(true)
    .setChoices([
      q1.createChoice('Brown is dominant - you only need one allele; green requires specific recessive combinations', true),
      q1.createChoice('Brown eyes work better', false),
      q1.createChoice('People prefer brown eyes', false),
      q1.createChoice('This data is incorrect', false)
    ]);
  q1.setPoints(4);

  // Q2: Continuous vs discrete traits (4 pts)
  const q2 = form.addMultipleChoiceItem();
  q2.setTitle('Height shows continuous variation (many values from short to tall) rather than discrete categories. What does this suggest?')
    .setHelpText('ID: g7_c1_w6_s2_q2 | Points: 4')
    .setRequired(true)
    .setChoices([
      q2.createChoice('Height is influenced by MANY genes plus environment, creating a range of values', true),
      q2.createChoice('Height is controlled by exactly one gene', false),
      q2.createChoice('Height isn\'t genetic at all', false),
      q2.createChoice('Everyone should be the same height', false)
    ]);
  q2.setPoints(4);

  // Q3: Sources of variation (4 pts)
  const q3 = form.addCheckboxItem();
  q3.setTitle('Which of the following contribute to genetic variation in a population? (Select ALL that apply)')
    .setHelpText('ID: g7_c1_w6_s2_q3 | Points: 4')
    .setRequired(true)
    .setChoices([
      q3.createChoice('Meiosis (crossing over and independent assortment)', true),
      q3.createChoice('Random fertilization (which sperm meets which egg)', true),
      q3.createChoice('Mutations (changes in DNA sequence)', true),
      q3.createChoice('Immigration (new individuals joining population)', true),
      q3.createChoice('Everyone exercising the same amount', false)
    ]);

  // Q4: Mutation misconception (4 pts)
  const q4 = form.addMultipleChoiceItem();
  q4.setTitle('A student says: "All mutations are bad and cause disease." Why is this incorrect?')
    .setHelpText('ID: g7_c1_w6_s2_q4 | Points: 4 | Targets mutation misconception')
    .setRequired(true)
    .setChoices([
      q4.createChoice('Mutations can be harmful, neutral, OR beneficial - many have no effect or help survival', true),
      q4.createChoice('The student is correct - all mutations cause problems', false),
      q4.createChoice('Mutations don\'t actually happen', false),
      q4.createChoice('Only mutations in certain genes are real', false)
    ]);
  q4.setPoints(4);

  // Q5: Population analysis (4 pts)
  const q5 = form.addParagraphTextItem();
  q5.setTitle('ANALYSIS: If a population had NO genetic variation (everyone was genetically identical), what would happen if a new disease appeared? Explain why variation is important for population survival.')
    .setHelpText('ID: g7_c1_w6_s2_q5 | Points: 4 | Rubric: 4=Explains variation provides survival options, 3=Mentions disease resistance, 2=Basic connection, 1=Attempt')
    .setRequired(true);

  configFormSettings_(form, 'station2');
  return form;
}

// ============================================================================
// STATION 3: Design a Genetic Test (25 points, ~20 minutes)
// ============================================================================

function createG7C1W6Station3_() {
  const form = FormApp.create('G7.C1.W6: Station 3 - Design a Genetic Test');
  form.setDescription(
    'Station 3: Genetic Screening Challenge (25 points)\n\n' +
    'SCENARIO: A couple wants genetic counseling before having children.\n\n' +
    'CONDITION: Cystic Fibrosis (CF)\n' +
    '• Caused by recessive allele (cc)\n' +
    '• Carriers (Cc) are healthy but can pass the allele\n' +
    '• About 1 in 25 people of European descent are carriers\n\n' +
    'Your task: Design a genetic counseling approach and calculate risks.\n\n' +
    '⏱️ Time: ~20 minutes'
  );

  // Q1: Carrier identification (4 pts)
  const q1 = form.addMultipleChoiceItem();
  q1.setTitle('Genetic testing shows: Father = Cc (carrier), Mother = Cc (carrier). What\'s the probability their child will have CF?')
    .setHelpText('ID: g7_c1_w6_s3_q1 | Points: 4 | Use a Punnett square')
    .setRequired(true)
    .setChoices([
      q1.createChoice('25% (1 in 4) - from Punnett square: CC, Cc, Cc, cc', true),
      q1.createChoice('50% (1 in 2)', false),
      q1.createChoice('100% - both parents carry the allele', false),
      q1.createChoice('0% - carriers can\'t have affected children', false)
    ]);
  q1.setPoints(4);

  // Q2: Carrier probability (5 pts)
  const q2 = form.addMultipleChoiceItem();
  q2.setTitle('From the same Cc × Cc cross, what\'s the probability a child will be a CARRIER (Cc) like the parents?')
    .setHelpText('ID: g7_c1_w6_s3_q2 | Points: 5')
    .setRequired(true)
    .setChoices([
      q2.createChoice('50% (2 in 4) - two of the four outcomes are Cc', true),
      q2.createChoice('25% (1 in 4)', false),
      q2.createChoice('75% (3 in 4)', false),
      q2.createChoice('100%', false)
    ]);
  q2.setPoints(5);

  // Q3: Counseling approach (5 pts)
  const q3 = form.addParagraphTextItem();
  q3.setTitle('DESIGN: The couple asks "Should we have children?" As a genetic counselor, what information would you provide? Include: (1) The probabilities calculated, (2) That carriers are healthy, (3) Options they might consider.')
    .setHelpText('ID: g7_c1_w6_s3_q3 | Points: 5 | Rubric: 5=All 3 elements with sensitivity, 4=All elements basic, 3=2 elements, 2=1 element, 1=Attempt')
    .setRequired(true);

  // Q4: Extended family (5 pts)
  const q4 = form.addMultipleChoiceItem();
  q4.setTitle('The father\'s brother wants to know his chance of being a carrier. The father is Cc, and their parents must have been Cc × Cc (since they had a carrier child). What\'s the brother\'s probability of being a carrier?')
    .setHelpText('ID: g7_c1_w6_s3_q4 | Points: 5 | Think carefully - we know he\'s NOT affected')
    .setRequired(true)
    .setChoices([
      q4.createChoice('2/3 (about 67%) - of the 3 non-affected outcomes (CC, Cc, Cc), 2 are carriers', true),
      q4.createChoice('50%', false),
      q4.createChoice('25%', false),
      q4.createChoice('100% - it runs in the family', false)
    ]);
  q4.setPoints(5);

  // Q5: Ethical considerations (6 pts)
  const q5 = form.addParagraphTextItem();
  q5.setTitle('ARGUE: Some people say genetic testing is "playing God" and we shouldn\'t do it. Others say it helps families make informed decisions. Present ONE argument FOR genetic testing and ONE argument someone might make AGAINST it.')
    .setHelpText('ID: g7_c1_w6_s3_q5 | Points: 6 | Rubric: 6=Both sides with reasoning, 4-5=Both sides basic, 2-3=One side only, 1=Attempt')
    .setRequired(true);

  configFormSettings_(form, 'station3');
  return form;
}

// ============================================================================
// EXIT TICKET: Genetic Variation Integration (23 points, ~15 minutes)
// ============================================================================

function createG7C1W6ExitTicket_() {
  const form = FormApp.create('G7.C1.W6: Exit Ticket - Genetic Variation Integration');
  form.setDescription(
    'Exit Ticket: Genetic Variation (23 points)\n\n' +
    'Demonstrate your understanding of how genetic variation arises.\n\n' +
    '⏱️ Time: ~15 minutes'
  );

  // Q1: NEW - Meiosis outcome (4 pts)
  const q1 = form.addMultipleChoiceItem();
  q1.setTitle('NEW: What makes each gamete (sex cell) produced by meiosis genetically unique?')
    .setHelpText('ID: g7_c1_w6_exit_q1 | Points: 4')
    .setRequired(true)
    .setChoices([
      q1.createChoice('Random chromosome alignment (independent assortment) and crossing over', true),
      q1.createChoice('Gametes are all identical copies', false),
      q1.createChoice('Only crossing over creates variation', false),
      q1.createChoice('Gametes copy the parent cell exactly', false)
    ]);
  q1.setPoints(4);

  // Q2: NEW - Misconception targeting (4 pts)
  const q2 = form.addMultipleChoiceItem();
  q2.setTitle('NEW: Two siblings have the same biological parents but look quite different. This is because:')
    .setHelpText('ID: g7_c1_w6_exit_q2 | Points: 4 | Targets sibling misconception')
    .setRequired(true)
    .setChoices([
      q2.createChoice('Each sibling received a different random combination of parental alleles through meiosis', true),
      q2.createChoice('One sibling got more DNA than the other', false),
      q2.createChoice('This shouldn\'t happen - siblings should look identical', false),
      q2.createChoice('They must have different fathers', false)
    ]);
  q2.setPoints(4);

  // Q3: SPIRAL W5 - Punnett squares (4 pts)
  const q3 = form.addMultipleChoiceItem();
  q3.setTitle('SPIRAL (W5): Cross: Aa × Aa. How many DIFFERENT genotypes are possible in offspring?')
    .setHelpText('ID: g7_c1_w6_exit_q3 | Points: 4 | Connects to W5')
    .setRequired(true)
    .setChoices([
      q3.createChoice('3 different genotypes: AA, Aa, and aa', true),
      q3.createChoice('Only 1 genotype: Aa', false),
      q3.createChoice('4 different genotypes', false),
      q3.createChoice('2 different genotypes', false)
    ]);
  q3.setPoints(4);

  // Q4: SPIRAL - Mutations (3 pts)
  const q4 = form.addMultipleChoiceItem();
  q4.setTitle('SPIRAL: A mutation gives some bacteria resistance to an antibiotic. Is this mutation harmful, neutral, or beneficial?')
    .setHelpText('ID: g7_c1_w6_exit_q4 | Points: 3')
    .setRequired(true)
    .setChoices([
      q4.createChoice('Beneficial - it helps the bacteria survive when exposed to the antibiotic', true),
      q4.createChoice('Always harmful - all mutations are bad', false),
      q4.createChoice('Neutral - it doesn\'t affect survival', false),
      q4.createChoice('Mutations can\'t help survival', false)
    ]);
  q4.setPoints(3);

  // Q5: INTEGRATION (4 pts)
  const q5 = form.addParagraphTextItem();
  q5.setTitle('INTEGRATION: Explain the complete pathway from meiosis to genetic diversity in a population. Include: (1) How meiosis creates unique gametes, (2) How fertilization combines genetic information, (3) Why this matters for the species.')
    .setHelpText('ID: g7_c1_w6_exit_q5 | Points: 4 | Rubric: 4=All 3 elements connected, 3=2 elements, 2=1 element, 1=Attempt')
    .setRequired(true);

  // Q6: SEP-4 - Data analysis (4 pts)
  const q6 = form.addParagraphTextItem();
  q6.setTitle('SEP-4: A scientist finds that 84% of a plant population has green leaves and 16% has yellow leaves (yy genotype). If yellow is recessive, calculate the approximate percentage of plants that are carriers (Yy). Show your reasoning.')
    .setHelpText('ID: g7_c1_w6_exit_q6 | Points: 4 | Rubric: 4=Correct (about 48%) with reasoning from Hardy-Weinberg or Punnett, 3=Close answer, 2=Shows work but wrong, 1=Attempt')
    .setRequired(true);

  // Confidence scale (diagnostic only)
  const confidence = form.addScaleItem();
  confidence.setTitle('How confident are you in explaining how meiosis creates genetic variation?')
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

  const metadata = '\n\n---\nForm ID: g7_c1_w6_' + formType +
                   '\nPoints: ' + G7_C1_W6_CONFIG.points[formType] +
                   '\nGenerated: ' + new Date().toISOString().split('T')[0];

  form.setDescription(form.getDescription() + metadata);
}

function validateG7C1W6Points_() {
  const expected = G7_C1_W6_CONFIG.points;
  Logger.log('G7 C1 W6 Point Validation - Total: ' + expected.total);
  return { valid: true, totalExpected: expected.total };
}

// ============================================================================
// RUBRICS REFERENCE
// ============================================================================

const G7_C1_W6_RUBRICS = {
  hook_q4: { points: 2, criteria: { 2: 'Mentions shuffling/mixing of genes in meiosis', 1: 'Mentions cell division', 0: 'Off-topic' }},
  s1_q6: { points: 2, criteria: { 2: 'Explains meiosis creates unique gametes + fertilization combines them', 1: 'One concept', 0: 'Incorrect' }},
  s2_q5: { points: 4, criteria: { 4: 'Explains variation provides survival options against disease', 3: 'Mentions disease resistance', 2: 'Basic connection', 1: 'Attempt' }},
  s3_q3: { points: 5, criteria: { 5: 'All 3 elements (probabilities, carriers healthy, options) with sensitivity', 4: 'All elements basic', 3: '2 elements', 2: '1 element', 1: 'Attempt' }},
  s3_q5: { points: 6, criteria: { 6: 'Both FOR and AGAINST with reasoning', '4-5': 'Both sides basic', '2-3': 'One side only', 1: 'Attempt' }},
  exit_q5: { points: 4, criteria: { 4: 'All 3 elements (meiosis→gametes→fertilization→species benefit) connected', 3: '2 elements', 2: '1 element', 1: 'Attempt' }},
  exit_q6: { points: 4, criteria: { 4: 'Correct (~48% carriers) with Hardy-Weinberg or Punnett reasoning', 3: 'Close answer', 2: 'Shows work but wrong', 1: 'Attempt' }}
};
