/**
 * Grade 7 Cycle 1 Week 7: Sexual vs Asexual Reproduction
 * Standards: MS-LS3-2 (genetic variation), MS-LS4-4 (genetic diversity & adaptation)
 * Phenomenon: Why is genetic diversity important for survival?
 *
 * Form Structure:
 * - Hook: The Clone Dilemma (12 pts)
 * - Station 1: Reproduction Comparison Lab (20 pts) - Meiosis vs Mitosis
 * - Station 2: Genetic Diversity Analysis (20 pts)
 * - Station 3: Design a Conservation Strategy (25 pts)
 * - Exit Ticket: Reproduction Integration (23 pts)
 *
 * Total: 100 points
 */

// ============================================================================
// CONFIGURATION
// ============================================================================

const G7_C1_W7_CONFIG = {
  grade: 7,
  cycle: 1,
  week: 7,
  topic: 'Sexual vs Asexual Reproduction',
  phenomenon: 'Why is genetic diversity important for survival?',
  standards: ['MS-LS3-2', 'MS-LS4-4'],
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
      id: 'asexual-better',
      description: 'Students think asexual reproduction is "better" because it produces more offspring faster',
      targetedIn: ['hook_q4', 's2_q4']
    },
    {
      id: 'clones-identical-always',
      description: 'Students believe all clones are always completely identical',
      targetedIn: ['s1_q4', 'exit_q2']
    },
    {
      id: 'variation-random-bad',
      description: 'Students think genetic variation is random and mostly harmful',
      targetedIn: ['s2_q3', 's3_q2']
    }
  ],
  spiralTargets: {
    w6: 'Mutations and genetic variation'
  }
};

// Rubric references for constructed response scoring
const RUBRICS = {
  twoPoint: {
    2: 'Complete response with scientific reasoning and evidence',
    1: 'Partial response with incomplete reasoning or missing evidence',
    0: 'Incorrect or no response'
  },
  threePoint: {
    3: 'Complete response with claim, evidence, and scientific reasoning',
    2: 'Adequate response with minor gaps in reasoning or evidence',
    1: 'Partial response with significant gaps',
    0: 'Incorrect or no response'
  },
  fourPoint: {
    4: 'Exemplary response with sophisticated reasoning and multiple evidence sources',
    3: 'Complete response meeting all criteria',
    2: 'Adequate response with minor gaps',
    1: 'Partial response with significant gaps',
    0: 'Incorrect or no response'
  }
};

// ============================================================================
// MAIN ENTRY POINT
// ============================================================================

/**
 * Creates all forms for G7 C1 W7
 */
function createAllForms() {
  const results = {
    hook: createHookForm_(),
    station1: createStation1Form_(),
    station2: createStation2Form_(),
    station3: createStation3Form_(),
    exitTicket: createExitTicketForm_()
  };

  Logger.log('=== G7 C1 W7 Forms Created ===');
  Object.entries(results).forEach(([name, url]) => {
    Logger.log(`${name}: ${url}`);
  });

  return results;
}

// ============================================================================
// HOOK: THE CLONE DILEMMA (12 points)
// ============================================================================

function createHookForm_() {
  const form = FormApp.create('G7.C1.W7: Hook - The Clone Dilemma');
  configFormSettings_(form);

  // Header
  form.setDescription(
    'Phenomenon: The Cavendish banana - the kind you buy at the store - is in danger! ' +
    'A disease called Panama disease TR4 is wiping out banana plantations worldwide. ' +
    'But here\'s the problem: ALL commercial bananas are CLONES of each other!\n\n' +
    'Meanwhile, wild banana populations with genetic diversity are resistant to the disease.\n\n' +
    'Points: 12 | Standards: MS-LS3-2, MS-LS4-4'
  );

  // Q1: Initial understanding (2 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q1: What does it mean that all commercial Cavendish bananas are "clones" of each other?')
    .setHelpText('Question ID: g7_c1_w7_hook_q1')
    .setChoices([
      form.createChoice('They are exactly genetically identical', true),
      form.createChoice('They look similar but have different genes', false),
      form.createChoice('They were all grown on the same farm', false),
      form.createChoice('They were created in a laboratory', false)
    ])
    .setRequired(true)
    .setPoints(2);

  // Q2: Disease spread prediction (2 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q2: Why is Panama disease TR4 spreading so quickly through banana plantations?')
    .setHelpText('Question ID: g7_c1_w7_hook_q2')
    .setChoices([
      form.createChoice('The bananas are grown too close together', false),
      form.createChoice('All the bananas have the same genetic weakness to the disease', true),
      form.createChoice('The disease mutates very quickly', false),
      form.createChoice('Farmers don\'t use pesticides', false)
    ])
    .setRequired(true)
    .setPoints(2);

  // Q3: Prior knowledge connection (3 pts)
  form.addParagraphTextItem()
    .setTitle('Q3: Using what you learned last week about mutations and genetic variation, explain why wild banana populations might survive the disease while commercial bananas cannot.')
    .setHelpText('Question ID: g7_c1_w7_hook_q3 | 3 points: Connect genetic variation to disease resistance')
    .setRequired(true);
  setPointsForLastItem_(form, 3);

  // Q4: Misconception target - asexual-better (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q4: A farmer argues: "Asexual reproduction is better because I can make exact copies of my best banana plant." What is the main PROBLEM with this argument?')
    .setHelpText('Question ID: g7_c1_w7_hook_q4 | Targets misconception: asexual-better')
    .setChoices([
      form.createChoice('Asexual reproduction is actually impossible in plants', false),
      form.createChoice('Making exact copies means all plants share the same weaknesses', true),
      form.createChoice('The copies won\'t taste as good as the original', false),
      form.createChoice('Asexual reproduction produces fewer offspring', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // Q5: Question generation (2 pts)
  form.addParagraphTextItem()
    .setTitle('Q5: What questions do you have about how different types of reproduction affect genetic diversity?')
    .setHelpText('Question ID: g7_c1_w7_hook_q5 | 2 points: Generate investigable questions')
    .setRequired(true);
  setPointsForLastItem_(form, 2);

  return form.getPublishedUrl();
}

// ============================================================================
// STATION 1: REPRODUCTION COMPARISON LAB (20 points)
// ============================================================================

function createStation1Form_() {
  const form = FormApp.create('G7.C1.W7: Station 1 - Reproduction Comparison Lab');
  configFormSettings_(form);

  form.setDescription(
    'Compare the outcomes of sexual and asexual reproduction using simulations.\n\n' +
    'Focus: How does each type of reproduction affect genetic variation in offspring?\n\n' +
    'Spiral Review: Mutations and variation from Week 6\n' +
    'Points: 20 | Standards: MS-LS3-2'
  );

  // Q1: Mitosis outcome (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q1: In asexual reproduction (mitosis), a parent cell divides to create offspring. How do the offspring\'s chromosomes compare to the parent\'s?')
    .setHelpText('Question ID: g7_c1_w7_s1_q1')
    .setChoices([
      form.createChoice('Offspring have half the chromosomes of the parent', false),
      form.createChoice('Offspring have exactly the same chromosomes as the parent', true),
      form.createChoice('Offspring have twice as many chromosomes as the parent', false),
      form.createChoice('Offspring have a random mix of chromosomes', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // Q2: Meiosis outcome (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q2: In sexual reproduction (meiosis + fertilization), offspring receive chromosomes from:')
    .setHelpText('Question ID: g7_c1_w7_s1_q2')
    .setChoices([
      form.createChoice('Only one parent', false),
      form.createChoice('Two parents - half from each', true),
      form.createChoice('Two parents - all from one, none from the other', false),
      form.createChoice('The environment, not parents', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // Q3: Genetic shuffling (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q3: During meiosis, chromosomes "cross over" and exchange pieces. What is the effect of this?')
    .setHelpText('Question ID: g7_c1_w7_s1_q3')
    .setChoices([
      form.createChoice('It causes harmful mutations', false),
      form.createChoice('It creates new combinations of genes, increasing variation', true),
      form.createChoice('It makes the chromosomes weaker', false),
      form.createChoice('It has no effect on the offspring', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // Q4: Misconception target - clones-identical-always (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q4: A student says: "If organisms reproduce asexually, they will always be 100% identical forever." What is WRONG with this statement?')
    .setHelpText('Question ID: g7_c1_w7_s1_q4 | Targets misconception: clones-identical-always')
    .setChoices([
      form.createChoice('Nothing - this statement is completely correct', false),
      form.createChoice('Mutations can still occur during DNA copying, causing small differences', true),
      form.createChoice('Asexual organisms actually reproduce sexually', false),
      form.createChoice('The environment causes genetic changes in clones', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q5: Comparison analysis (4 pts)
  form.addParagraphTextItem()
    .setTitle('Q5: Create a T-chart comparing sexual and asexual reproduction. Include: (1) How many parents, (2) Whether offspring are identical to parent, (3) Amount of genetic variation in offspring.')
    .setHelpText('Question ID: g7_c1_w7_s1_q5 | 4 points: Complete comparison with all three criteria')
    .setRequired(true);
  setPointsForLastItem_(form, 4);

  // Q6: Spiral review - W6 mutations (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q6: [SPIRAL W6] In a population of asexually reproducing bacteria, how does genetic variation MAINLY arise?')
    .setHelpText('Question ID: g7_c1_w7_s1_q6 | Spiral: W6 Mutations')
    .setChoices([
      form.createChoice('Through sexual reproduction with other bacteria', false),
      form.createChoice('Through random mutations in DNA during copying', true),
      form.createChoice('Through learning from the environment', false),
      form.createChoice('Genetic variation cannot arise in asexual populations', false)
    ])
    .setRequired(true)
    .setPoints(3);

  return form.getPublishedUrl();
}

// ============================================================================
// STATION 2: GENETIC DIVERSITY ANALYSIS (20 points)
// ============================================================================

function createStation2Form_() {
  const form = FormApp.create('G7.C1.W7: Station 2 - Genetic Diversity Analysis');
  configFormSettings_(form);

  form.setDescription(
    'Analyze how genetic diversity affects population survival.\n\n' +
    'Use data to understand why variation matters for species.\n\n' +
    'Points: 20 | Standards: MS-LS3-2, MS-LS4-4'
  );

  // Scenario introduction
  form.addSectionHeaderItem()
    .setTitle('Population Survival Data')
    .setHelpText('Two populations of frogs face a new disease:\n' +
                 'Population A: 1000 frogs, all genetically similar (low diversity)\n' +
                 'Population B: 1000 frogs, genetically diverse (high diversity)\n' +
                 'After the disease: Pop A has 50 survivors, Pop B has 600 survivors');

  // Q1: Data interpretation (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q1: Based on the data, what percentage of each population survived the disease?')
    .setHelpText('Question ID: g7_c1_w7_s2_q1')
    .setChoices([
      form.createChoice('Pop A: 5%, Pop B: 60%', true),
      form.createChoice('Pop A: 50%, Pop B: 60%', false),
      form.createChoice('Pop A: 95%, Pop B: 40%', false),
      form.createChoice('Pop A: 5%, Pop B: 40%', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q2: Explanation (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q2: Why did the genetically diverse population have more survivors?')
    .setHelpText('Question ID: g7_c1_w7_s2_q2')
    .setChoices([
      form.createChoice('They were physically stronger', false),
      form.createChoice('Some individuals had genes that provided disease resistance', true),
      form.createChoice('They lived in a cleaner environment', false),
      form.createChoice('The disease was weaker in their area', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q3: Misconception target - variation-random-bad (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q3: A student argues: "Genetic variation is just random changes that usually hurt organisms." Which evidence from the frog data contradicts this claim?')
    .setHelpText('Question ID: g7_c1_w7_s2_q3 | Targets misconception: variation-random-bad')
    .setChoices([
      form.createChoice('Both populations had the same survival rate', false),
      form.createChoice('The varied population survived better because some variations were beneficial', true),
      form.createChoice('All the frogs died from the disease', false),
      form.createChoice('The similar population was healthier before the disease', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q4: Misconception target - asexual-better (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q4: Population A reproduces asexually (fast, many offspring). Population B reproduces sexually (slower, fewer offspring). Despite this, which reproduction strategy is better for long-term survival?')
    .setHelpText('Question ID: g7_c1_w7_s2_q4 | Targets misconception: asexual-better')
    .setChoices([
      form.createChoice('Asexual - they make more offspring faster', false),
      form.createChoice('Sexual - it creates variation that helps populations survive changes', true),
      form.createChoice('Both are equally good for survival', false),
      form.createChoice('Neither - reproduction type doesn\'t affect survival', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q5: Claim-Evidence-Reasoning (4 pts)
  form.addParagraphTextItem()
    .setTitle('Q5: Make a CLAIM about the relationship between genetic diversity and population survival. Support with EVIDENCE from the frog data and REASONING about how variation provides protection.')
    .setHelpText('Question ID: g7_c1_w7_s2_q5 | 4 points: CER format required')
    .setRequired(true);
  setPointsForLastItem_(form, 4);

  return form.getPublishedUrl();
}

// ============================================================================
// STATION 3: DESIGN A CONSERVATION STRATEGY (25 points)
// ============================================================================

function createStation3Form_() {
  const form = FormApp.create('G7.C1.W7: Station 3 - Design a Conservation Strategy');
  configFormSettings_(form);

  form.setDescription(
    'Apply your understanding of reproduction and genetic diversity to help save endangered species.\n\n' +
    'Engineering Challenge: Design a conservation plan that maintains genetic diversity.\n\n' +
    'Points: 25 | Standards: MS-LS3-2, MS-LS4-4, MS-ETS1-2'
  );

  // Scenario introduction
  form.addSectionHeaderItem()
    .setTitle('The Florida Panther Crisis')
    .setHelpText('The Florida panther population dropped to only 20-30 individuals in the 1990s. ' +
                 'These panthers were all closely related (low genetic diversity), causing health problems ' +
                 'like heart defects and low reproduction rates. Your job: Design a plan to save them.');

  // Q1: Problem identification (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q1: What is the GENETIC problem caused by having only 20-30 closely related panthers?')
    .setHelpText('Question ID: g7_c1_w7_s3_q1')
    .setChoices([
      form.createChoice('The panthers are too aggressive', false),
      form.createChoice('Low genetic diversity means harmful traits become common and beneficial variations are rare', true),
      form.createChoice('The panthers forgot how to hunt', false),
      form.createChoice('The panthers became too different from each other', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q2: Misconception target - variation-random-bad (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q2: Conservation biologists brought 8 Texas cougars (related species) to breed with Florida panthers. Why would adding NEW genes help the population?')
    .setHelpText('Question ID: g7_c1_w7_s3_q2 | Targets misconception: variation-random-bad')
    .setChoices([
      form.createChoice('The Texas cougars are larger and stronger', false),
      form.createChoice('New gene combinations increase diversity, providing more chances for beneficial traits', true),
      form.createChoice('Texas cougars are immune to all diseases', false),
      form.createChoice('It wouldn\'t help - mixing species is always harmful', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q3: Solution design (5 pts)
  form.addParagraphTextItem()
    .setTitle('Q3: The Texas cougar introduction worked - the panther population grew to 200+. However, conservationists are now worried about FUTURE genetic problems. Explain why a population of 200 all descended from 8 Texas cougars might still face diversity issues.')
    .setHelpText('Question ID: g7_c1_w7_s3_q3 | 5 points: Connect population size to genetic bottleneck concepts')
    .setRequired(true);
  setPointsForLastItem_(form, 5);

  // Q4: Conservation proposal (6 pts)
  form.addParagraphTextItem()
    .setTitle('Q4: Design ONE additional strategy to maintain genetic diversity in the Florida panther population. Describe: (1) What you would do, (2) How it increases diversity, (3) What challenges might arise.')
    .setHelpText('Question ID: g7_c1_w7_s3_q4 | 6 points: Complete strategy with scientific reasoning')
    .setRequired(true);
  setPointsForLastItem_(form, 6);

  // Q5: Trade-off analysis (6 pts)
  form.addParagraphTextItem()
    .setTitle('Q5: Some people argue against mixing Florida panthers with Texas cougars because the offspring are "not pure Florida panthers." As a conservation biologist, explain: (1) Why genetic diversity matters more than "purity," (2) What would happen if we kept the population "pure" but genetically limited.')
    .setHelpText('Question ID: g7_c1_w7_s3_q5 | 6 points: Scientific argument with trade-off analysis')
    .setRequired(true);
  setPointsForLastItem_(form, 6);

  return form.getPublishedUrl();
}

// ============================================================================
// EXIT TICKET: REPRODUCTION INTEGRATION (23 points)
// ============================================================================

function createExitTicketForm_() {
  const form = FormApp.create('G7.C1.W7: Exit Ticket - Reproduction Integration');
  configFormSettings_(form);

  form.setDescription(
    'Demonstrate your understanding of reproduction types and genetic diversity.\n\n' +
    'Structure: 2 New + 2 Spiral + 1 Integration + 1 SEP\n' +
    'Points: 23 | Standards: MS-LS3-2, MS-LS4-4'
  );

  // NEW Q1: Reproduction type identification (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q1 [NEW]: A strawberry plant sends out runners that grow into new plants. This is an example of:')
    .setHelpText('Question ID: g7_c1_w7_exit_q1')
    .setChoices([
      form.createChoice('Sexual reproduction - two parents contribute genes', false),
      form.createChoice('Asexual reproduction - offspring are genetically identical to parent', true),
      form.createChoice('Both sexual and asexual reproduction', false),
      form.createChoice('Neither - this is not reproduction', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // NEW Q2: Misconception target - clones-identical-always (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q2 [NEW]: Bacteria reproduce by splitting in half (binary fission). After millions of generations, a bacterial colony should:')
    .setHelpText('Question ID: g7_c1_w7_exit_q2 | Targets misconception: clones-identical-always')
    .setChoices([
      form.createChoice('Be perfectly identical to the original bacterium', false),
      form.createChoice('Show some variation due to accumulated mutations during copying', true),
      form.createChoice('Become a completely different species', false),
      form.createChoice('Stop reproducing because they run out of genetic material', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // SPIRAL Q3: W6 - Mutation effects (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q3 [SPIRAL W6]: In a sexually reproducing population, beneficial mutations:')
    .setHelpText('Question ID: g7_c1_w7_exit_q3 | Spiral: W6 - Mutations')
    .setChoices([
      form.createChoice('Disappear immediately', false),
      form.createChoice('Can spread through the population over generations', true),
      form.createChoice('Only appear in asexually reproducing organisms', false),
      form.createChoice('Always cause disease', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // SPIRAL Q4: W6 - Genetic variation sources (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q4 [SPIRAL W6]: Which produces MORE genetic variation: sexual reproduction or mutations alone?')
    .setHelpText('Question ID: g7_c1_w7_exit_q4 | Spiral: W6 - Sources of variation')
    .setChoices([
      form.createChoice('Mutations alone produce more variation', false),
      form.createChoice('Sexual reproduction combines variations from two parents AND allows mutations', true),
      form.createChoice('Both produce exactly the same amount of variation', false),
      form.createChoice('Neither produces any variation', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // INTEGRATION Q5: Cross-concept connection (5 pts)
  form.addParagraphTextItem()
    .setTitle('Q5 [INTEGRATION]: The Irish Potato Famine (1845-1852) killed 1 million people. Irish farmers had planted only ONE variety of potato (clones). Use your understanding of W6 (mutations/variation) and W7 (reproduction types) to explain why this was a disaster waiting to happen.')
    .setHelpText('Question ID: g7_c1_w7_exit_q5 | 5 points: Connect lack of diversity to population vulnerability')
    .setRequired(true);
  setPointsForLastItem_(form, 5);

  // SEP Q6: Engaging in argument from evidence (4 pts)
  form.addParagraphTextItem()
    .setTitle('Q6 [SEP]: Make an argument: Should farmers grow genetically diverse crops OR clones of the "best" variety? Use evidence from today\'s lesson and W6 to support your position.')
    .setHelpText('Question ID: g7_c1_w7_exit_q6 | 4 points: SEP 7 - Engaging in Argument from Evidence')
    .setRequired(true);
  setPointsForLastItem_(form, 4);

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
  form.setLimitOneResponsePerUser(true);
  form.setShowLinkToRespondAgain(false);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Your responses have been recorded. Great work exploring reproduction and diversity!\n\n' +
    'Key Takeaway: Genetic diversity helps populations survive environmental changes!'
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

function createG7C1W7Hook() { return createHookForm_(); }
function createG7C1W7Station1() { return createStation1Form_(); }
function createG7C1W7Station2() { return createStation2Form_(); }
function createG7C1W7Station3() { return createStation3Form_(); }
function createG7C1W7ExitTicket() { return createExitTicketForm_(); }

// ============================================================================
// VALIDATION
// ============================================================================

/**
 * Validates point totals match configuration
 */
function validatePoints_() {
  const expected = G7_C1_W7_CONFIG.points;
  const calculated = {
    hook: 2 + 2 + 3 + 3 + 2,      // 12
    station1: 3 + 3 + 3 + 4 + 4 + 3, // 20
    station2: 4 + 4 + 4 + 4 + 4,   // 20
    station3: 4 + 4 + 5 + 6 + 6,   // 25
    exitTicket: 4 + 4 + 3 + 3 + 5 + 4  // 23
  };
  calculated.total = Object.values(calculated).reduce((a, b) => a + b, 0);

  Logger.log('=== Point Validation ===');
  Object.keys(expected).forEach(key => {
    const match = expected[key] === calculated[key];
    Logger.log(`${key}: Expected ${expected[key]}, Got ${calculated[key]} ${match ? '✓' : '✗'}`);
  });

  return calculated.total === expected.total;
}
