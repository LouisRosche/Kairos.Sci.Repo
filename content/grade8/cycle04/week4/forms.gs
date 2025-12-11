/**
 * G8.C4.W4 Forms - Food Web Complexity & Stability
 *
 * Phenomenon: Why can some ecosystems survive a drought but others collapse?
 * Standards: MS-LS2-3 (Ecosystem Dynamics)
 *
 * This week explores how food web complexity affects ecosystem resilience,
 * examining why diverse ecosystems tend to recover from disturbances while
 * simpler ones may collapse entirely.
 *
 * Forms Structure (100 pts total):
 * - Hook: The Resilient Reef Mystery (12 pts)
 * - Station 1: Food Web Complexity Investigation (20 pts)
 * - Station 2: Ecosystem Resilience Analysis (20 pts)
 * - Station 3: Design a Resilient Ecosystem (25 pts)
 * - Exit Ticket: Ecosystem Stability Integration (23 pts)
 *
 * @version 1.0.0
 * @lastUpdated 2025-12-11
 */

// ============================================================================
// CONFIGURATION
// ============================================================================

const G8_C4_W4_CONFIG = {
  grade: 8,
  cycle: 4,
  week: 4,
  topic: 'Food Web Complexity & Stability',
  phenomenon: 'Why can some ecosystems survive a drought but others collapse?',
  standards: ['MS-LS2-3'],
  threeDimensional: {
    sep: 'SEP-2: Developing and Using Models',
    dci: 'LS2.C: Ecosystem Dynamics, Functioning, and Resilience',
    ccc: 'CCC-7: Stability and Change'
  },
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
      id: 'ecosystem-complexity-bad',
      description: 'More complex ecosystems are harder to maintain and more fragile',
      correctUnderstanding: 'Complex food webs with multiple connections provide redundancy - if one species declines, others can fill similar roles, making the system more stable',
      targetedIn: ['hook_q3', 's1_q4', 'exit_q1']
    },
    {
      id: 'all-species-equally-important',
      description: 'All species are equally important to ecosystem stability',
      correctUnderstanding: 'Keystone species have disproportionately large effects on ecosystem structure; losing them causes cascading changes',
      targetedIn: ['s1_q5', 's2_q3', 'exit_q2']
    },
    {
      id: 'ecosystems-recover-automatically',
      description: 'Damaged ecosystems will always recover on their own',
      correctUnderstanding: 'Ecosystems have tipping points beyond which recovery is not possible without intervention; some damage is irreversible',
      targetedIn: ['s2_q4', 's3_q3', 'exit_q5']
    }
  ],
  spiralTargets: {
    w2: 'Invasive species and ecosystem disruption',
    w3: 'Matter cycling and decomposition'
  }
};

// ============================================================================
// MAIN ENTRY POINT
// ============================================================================

/**
 * Creates all forms for G8 C4 W4.
 * Validates configuration and creates 5 forms.
 */
function createG8C4W4Forms() {
  const config = G8_C4_W4_CONFIG;
  console.log(`Creating forms for G${config.grade} C${config.cycle} W${config.week}: ${config.topic}`);

  const forms = {
    hook: createG8C4W4Hook(),
    station1: createG8C4W4Station1(),
    station2: createG8C4W4Station2(),
    station3: createG8C4W4Station3(),
    exitTicket: createG8C4W4ExitTicket()
  };

  // Validate total points
  const actualTotal = Object.values(config.points).reduce((a, b) => a + b, 0) - config.points.total;
  if (actualTotal !== config.points.total) {
    console.warn(`Point mismatch: expected ${config.points.total}, got ${actualTotal}`);
  }

  console.log('All G8 C4 W4 forms created successfully');
  return forms;
}

// ============================================================================
// HOOK: THE RESILIENT REEF MYSTERY (12 pts)
// ============================================================================

/**
 * Creates Hook form - The Resilient Reef Mystery
 * Students explore why some ecosystems survive disturbances while others collapse.
 *
 * Resource: Drought impact comparison data for diverse vs. simple ecosystems
 */
function createG8C4W4Hook() {
  const form = FormApp.create('G8.C4.W4: Hook - The Resilient Reef Mystery');
  const config = G8_C4_W4_CONFIG;

  // Form settings
  form.setDescription(
    'PHENOMENON: Why can some ecosystems survive a drought but others collapse?\n\n' +
    'The 2012 drought devastated farmland across the Midwest, but native prairies ' +
    'nearby survived with minimal damage. Similarly, some coral reefs recover from ' +
    'bleaching events while others die completely. What makes the difference?\n\n' +
    'Study the ecosystem comparison data to investigate ecosystem resilience.'
  );
  form.setIsQuiz(true);
  form.setShuffleQuestions(false);

  // Instructions section
  form.addSectionHeaderItem()
    .setTitle('🔍 The Resilient Ecosystem Mystery')
    .setHelpText(
      'ECOSYSTEM COMPARISON DATA:\n\n' +
      '┌─────────────────────────────────────────────────────────────────┐\n' +
      '│ GRASSLAND A (Monoculture Farm)                                  │\n' +
      '│ • Species: 3 (corn, 2 pest species)                            │\n' +
      '│ • Food web connections: 4                                       │\n' +
      '│ • After drought: 95% plant death, complete crop failure        │\n' +
      '│ • Recovery time: Must replant (no natural recovery)            │\n' +
      '├─────────────────────────────────────────────────────────────────┤\n' +
      '│ GRASSLAND B (Native Prairie)                                    │\n' +
      '│ • Species: 150+ (grasses, forbs, insects, birds, mammals)      │\n' +
      '│ • Food web connections: 500+                                    │\n' +
      '│ • After drought: 30% plant death, deep-rooted plants survived  │\n' +
      '│ • Recovery time: 2-3 years to full productivity                │\n' +
      '└─────────────────────────────────────────────────────────────────┘\n\n' +
      'Why did the prairie survive while the farm collapsed?'
    );

  // Q1: Initial observation (2 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q1: Based on the data, what is the most significant difference between Grassland A and Grassland B?')
    .setHelpText('g8_c4_w4_hook_q1 | Observation')
    .setPoints(2)
    .setChoices([
      form.createChoice('Grassland B has only slightly more species than Grassland A', false),
      form.createChoice('Grassland B has many more species AND many more food web connections', true),
      form.createChoice('Grassland A is located in a different climate zone', false),
      form.createChoice('Grassland B receives more rainfall than Grassland A', false)
    ])
    .setRequired(true);

  // Q2: Pattern recognition (2 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q2: What pattern do you notice about plant death rates and the number of food web connections?')
    .setHelpText('g8_c4_w4_hook_q2 | Pattern recognition')
    .setPoints(2)
    .setChoices([
      form.createChoice('More connections = more plant death during drought', false),
      form.createChoice('More connections = less plant death during drought', true),
      form.createChoice('Number of connections has no relationship to plant survival', false),
      form.createChoice('All ecosystems lose the same percentage of plants', false)
    ])
    .setRequired(true);

  // Q3: Explanation - targets misconception (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q3: Why might having MORE species and connections help an ecosystem survive a disturbance like drought?')
    .setHelpText('g8_c4_w4_hook_q3 | Explanation | Targets misconception: ecosystem-complexity-bad')
    .setPoints(3)
    .setChoices([
      form.createChoice('More species compete for resources, making them all stronger', false),
      form.createChoice('Complex systems are harder for nature to damage because they are "protected"', false),
      form.createChoice('If some species die, others can fill similar roles and keep the system functioning', true),
      form.createChoice('More species attract more rainfall to the area', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! This is called functional redundancy - when multiple species can perform similar roles in an ecosystem, losing one doesn\'t collapse the whole system.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Not quite. Complex ecosystems survive better because of redundancy - multiple species can fill similar roles. If drought kills one type of grass, other drought-resistant species continue providing food and shelter for animals.')
      .build())
    .setRequired(true);

  // Q4: Prediction (2 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q4: Based on this pattern, which coral reef would you predict would recover better from a bleaching event?')
    .setHelpText('g8_c4_w4_hook_q4 | Prediction')
    .setPoints(2)
    .setChoices([
      form.createChoice('A reef with 50 coral species and 200 fish species', true),
      form.createChoice('A reef with 5 coral species and 20 fish species', false),
      form.createChoice('Both would recover equally since they are both coral reefs', false),
      form.createChoice('The simpler reef because it has less to repair', false)
    ])
    .setRequired(true);

  // Q5: Connection to phenomenon (3 pts)
  form.addParagraphTextItem()
    .setTitle('Q5: Based on the ecosystem comparison data, propose an initial explanation for why some ecosystems survive droughts while others collapse. What role does food web complexity play?')
    .setHelpText('g8_c4_w4_hook_q5 | Open response | 2-3 sentences')
    .setRequired(true);

  console.log(`Created Hook form: ${form.getId()}`);
  return form;
}

// ============================================================================
// STATION 1: FOOD WEB COMPLEXITY INVESTIGATION (20 pts)
// ============================================================================

/**
 * Creates Station 1 form - Food Web Complexity Investigation
 * Students model how biodiversity affects energy flow stability.
 *
 * Resource: Food web simulation with varying connections
 * Spiral: Decomposition and matter cycling from W3
 */
function createG8C4W4Station1() {
  const form = FormApp.create('G8.C4.W4: Station 1 - Food Web Complexity Investigation');
  const config = G8_C4_W4_CONFIG;

  form.setDescription(
    'INVESTIGATION: Modeling Food Web Stability\n\n' +
    'Use the food web simulation to test how the number of connections ' +
    'affects ecosystem stability when species are removed.\n\n' +
    'Simulation URL: [Food Web Stability Simulator]\n\n' +
    'SPIRAL CONNECTION: Remember how decomposers cycle matter through ecosystems? ' +
    'Today we\'ll see how they also contribute to ecosystem stability.'
  );
  form.setIsQuiz(true);
  form.setShuffleQuestions(false);

  // Simulation data section
  form.addSectionHeaderItem()
    .setTitle('📊 Simulation Instructions')
    .setHelpText(
      'Run the food web simulator with these two scenarios:\n\n' +
      'SCENARIO A - Simple Food Web:\n' +
      '• 5 species: grass → rabbit → fox → decomposer → back to grass\n' +
      '• 4 direct connections (linear chain)\n' +
      '• Remove the rabbit - observe what happens\n\n' +
      'SCENARIO B - Complex Food Web:\n' +
      '• 15 species including multiple producers, herbivores, predators, decomposers\n' +
      '• 40+ connections (web structure)\n' +
      '• Remove a herbivore species - observe what happens\n\n' +
      'Record your observations in the questions below.'
    );

  // Q1: Simple food web observation (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q1: In Scenario A (simple food web), what happened when you removed the rabbit?')
    .setHelpText('g8_c4_w4_s1_q1 | Observation')
    .setPoints(3)
    .setChoices([
      form.createChoice('Nothing changed - the ecosystem continued normally', false),
      form.createChoice('Only the fox population declined slightly', false),
      form.createChoice('The fox population crashed because it had no prey; grass overgrew', true),
      form.createChoice('The decomposer population increased immediately', false)
    ])
    .setRequired(true);

  // Q2: Complex food web observation (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q2: In Scenario B (complex food web), what happened when you removed a herbivore species?')
    .setHelpText('g8_c4_w4_s1_q2 | Observation')
    .setPoints(3)
    .setChoices([
      form.createChoice('The entire ecosystem collapsed like in Scenario A', false),
      form.createChoice('Predators switched to other herbivore species; system remained stable', true),
      form.createChoice('All herbivores went extinct in a chain reaction', false),
      form.createChoice('The producers all died without that herbivore to eat them', false)
    ])
    .setRequired(true);

  // Q3: Spiral - decomposer role (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q3: SPIRAL from W3: How do decomposers contribute to food web stability beyond just recycling matter?')
    .setHelpText('g8_c4_w4_s1_q3 | Spiral: W3 matter cycling')
    .setPoints(3)
    .setChoices([
      form.createChoice('They only break down dead material and don\'t affect food web stability', false),
      form.createChoice('They connect to many species and provide nutrients that support multiple food chains', true),
      form.createChoice('They compete with producers for sunlight and water', false),
      form.createChoice('They are always the first species to go extinct during disturbances', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! Decomposers are connected to virtually every other species through their role in nutrient cycling, making them critical for food web stability.')
      .build())
    .setRequired(true);

  // Q4: Analysis - targets misconception (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q4: Based on your simulation results, why does ecosystem complexity increase stability rather than making systems more fragile?')
    .setHelpText('g8_c4_w4_s1_q4 | Analysis | Targets misconception: ecosystem-complexity-bad')
    .setPoints(4)
    .setChoices([
      form.createChoice('Complex ecosystems are actually more fragile, but recover faster after collapse', false),
      form.createChoice('Complexity provides "backup plans" - if one connection fails, others can maintain energy flow', true),
      form.createChoice('Complex ecosystems prevent any species from ever going extinct', false),
      form.createChoice('Complexity only matters for large ecosystems, not small ones', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! This is called redundancy. In a complex web, if one pathway is disrupted, energy and matter can still flow through alternative pathways.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Reconsider: Think about what happened in your simulations. In the complex web, losing one species didn\'t crash the system because other species could fill similar roles. This "redundancy" is what makes complexity stabilizing rather than destabilizing.')
      .build())
    .setRequired(true);

  // Q5: Keystone species - targets misconception (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q5: In your complex food web simulation, which species removal caused the MOST disruption? What does this tell you about species importance?')
    .setHelpText('g8_c4_w4_s1_q5 | Critical thinking | Targets misconception: all-species-equally-important')
    .setPoints(4)
    .setChoices([
      form.createChoice('All species caused equal disruption when removed because all species are equally important', false),
      form.createChoice('Only top predators caused major disruption; herbivores and producers don\'t matter', false),
      form.createChoice('Species with the most connections (like decomposers or certain predators) caused the most disruption', true),
      form.createChoice('Only producers caused disruption because they provide all the energy', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! Species with many connections (called keystone species) have disproportionately large effects on ecosystems. Examples include sea otters, wolves, and decomposers.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Not all species affect an ecosystem equally. Species with many connections to others (keystone species) cause much larger disruptions when removed. This is why conservation often focuses on protecting keystone species.')
      .build())
    .setRequired(true);

  // Q6: Model explanation (3 pts)
  form.addParagraphTextItem()
    .setTitle('Q6: Draw or describe a food web model that would be MORE stable than a simple chain. Include at least 8 species and explain why your design would be more stable.')
    .setHelpText('g8_c4_w4_s1_q6 | SEP-2: Developing Models | 3-4 sentences')
    .setRequired(true);

  console.log(`Created Station 1 form: ${form.getId()}`);
  return form;
}

// ============================================================================
// STATION 2: ECOSYSTEM RESILIENCE ANALYSIS (20 pts)
// ============================================================================

/**
 * Creates Station 2 form - Ecosystem Resilience Analysis
 * Students analyze patterns in ecosystem recovery after disturbances.
 *
 * Resource: Before/after disturbance data from multiple ecosystems
 */
function createG8C4W4Station2() {
  const form = FormApp.create('G8.C4.W4: Station 2 - Ecosystem Resilience Analysis');
  const config = G8_C4_W4_CONFIG;

  form.setDescription(
    'DATA ANALYSIS: Comparing Ecosystem Recovery\n\n' +
    'Analyze data from four different ecosystems that experienced major ' +
    'disturbances. Look for patterns in which ones recovered and which didn\'t.\n\n' +
    'Your goal: Identify what factors predict ecosystem resilience.'
  );
  form.setIsQuiz(true);
  form.setShuffleQuestions(false);

  // Data section
  form.addSectionHeaderItem()
    .setTitle('📈 Ecosystem Disturbance Data')
    .setHelpText(
      '┌──────────────────────────────────────────────────────────────────────────┐\n' +
      '│ ECOSYSTEM DATA: Recovery After Major Disturbance                         │\n' +
      '├─────────────┬─────────┬────────────┬────────────┬───────────────────────┤\n' +
      '│ Ecosystem   │ Species │ Connections│ Disturbance│ Recovery Status       │\n' +
      '├─────────────┼─────────┼────────────┼────────────┼───────────────────────┤\n' +
      '│ Coral Reef A│ 500+    │ 2000+      │ Bleaching  │ 80% recovered (5 yr)  │\n' +
      '│ Coral Reef B│ 50      │ 150        │ Bleaching  │ 30% recovered, stable │\n' +
      '│ Forest A    │ 300+    │ 1500+      │ Wildfire   │ 95% recovered (10 yr) │\n' +
      '│ Forest B    │ 30      │ 80         │ Wildfire   │ Converted to grassland│\n' +
      '│ Grassland A │ 200+    │ 800+       │ Drought    │ Full recovery (3 yr)  │\n' +
      '│ Grassland B │ 15      │ 40         │ Drought    │ Soil erosion, no recov│\n' +
      '└─────────────┴─────────┴────────────┴────────────┴───────────────────────┘\n\n' +
      '* Note: "Connections" = feeding relationships in the food web'
    );

  // Q1: Pattern identification (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q1: What pattern do you observe when comparing ecosystems with high vs. low species diversity after disturbance?')
    .setHelpText('g8_c4_w4_s2_q1 | Pattern recognition')
    .setPoints(4)
    .setChoices([
      form.createChoice('High-diversity ecosystems take longer to show any recovery', false),
      form.createChoice('Low-diversity ecosystems always recover faster because they\'re simpler', false),
      form.createChoice('High-diversity ecosystems show better recovery rates across all disturbance types', true),
      form.createChoice('Diversity doesn\'t affect recovery - only the type of disturbance matters', false)
    ])
    .setRequired(true);

  // Q2: Quantitative analysis (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q2: Calculate the average recovery rate for high-diversity ecosystems (A sites) vs. low-diversity ecosystems (B sites). Which statement is most accurate?')
    .setHelpText('g8_c4_w4_s2_q2 | Data analysis')
    .setPoints(4)
    .setChoices([
      form.createChoice('A sites averaged about 90% recovery; B sites averaged about 15% recovery (including failed recoveries as 0%)', true),
      form.createChoice('Both A and B sites averaged about 50% recovery', false),
      form.createChoice('B sites actually recovered better when you include all the data', false),
      form.createChoice('Recovery rates were identical across all sites', false)
    ])
    .setRequired(true);

  // Q3: Keystone concept - targets misconception (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q3: Forest B converted to grassland after the fire and never recovered. What does this suggest about the lost species?')
    .setHelpText('g8_c4_w4_s2_q3 | Analysis | Targets misconception: all-species-equally-important')
    .setPoints(4)
    .setChoices([
      form.createChoice('The fire was simply too hot for any forest to recover', false),
      form.createChoice('Some lost species were likely keystone species necessary for forest regeneration', true),
      form.createChoice('Grassland is always the final stage of any ecosystem after disturbance', false),
      form.createChoice('The exact same species need to survive for any ecosystem to recover', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! When keystone species like certain seed-dispersing animals or nitrogen-fixing plants are lost, the ecosystem may shift to an entirely different state that cannot support forest regrowth.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Consider that Forest A recovered from the same disturbance. Forest B likely lost key species that perform irreplaceable functions - perhaps seed-dispersing animals or nitrogen-fixing plants that help trees reestablish.')
      .build())
    .setRequired(true);

  // Q4: Tipping points - targets misconception (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q4: Grassland B experienced severe soil erosion and "no recovery." What does this reveal about ecosystem resilience?')
    .setHelpText('g8_c4_w4_s2_q4 | Critical thinking | Targets misconception: ecosystems-recover-automatically')
    .setPoints(4)
    .setChoices([
      form.createChoice('All ecosystems will eventually recover if given enough time', false),
      form.createChoice('Grassland B just needs human intervention to recover fully', false),
      form.createChoice('Ecosystems can cross "tipping points" beyond which natural recovery is impossible', true),
      form.createChoice('Only grassland ecosystems can experience permanent damage', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! Tipping points represent thresholds beyond which an ecosystem cannot return to its original state. Once soil erodes away, for example, there\'s nothing for plants to root in - the damage is essentially permanent without massive intervention.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Think about what "no recovery" means. The soil erosion represents a tipping point - a threshold beyond which natural recovery becomes impossible. Without soil, plants cannot grow, and without plants, the ecosystem cannot rebuild.')
      .build())
    .setRequired(true);

  // Q5: Application (4 pts)
  form.addParagraphTextItem()
    .setTitle('Q5: A conservation organization has limited funds and must choose between protecting Coral Reef A (already diverse) or trying to restore Coral Reef B (low diversity). Based on the data, which investment would likely lead to better long-term outcomes? Explain your reasoning using evidence from the data.')
    .setHelpText('g8_c4_w4_s2_q5 | Evidence-based reasoning | 3-4 sentences')
    .setRequired(true);

  console.log(`Created Station 2 form: ${form.getId()}`);
  return form;
}

// ============================================================================
// STATION 3: DESIGN A RESILIENT ECOSYSTEM (25 pts)
// ============================================================================

/**
 * Creates Station 3 form - Design a Resilient Ecosystem
 * Engineering challenge: Apply food web knowledge to maximize ecosystem stability.
 *
 * Resource: Degraded habitat scenario + restoration options
 */
function createG8C4W4Station3() {
  const form = FormApp.create('G8.C4.W4: Station 3 - Design a Resilient Ecosystem');
  const config = G8_C4_W4_CONFIG;

  form.setDescription(
    'ENGINEERING CHALLENGE: Ecosystem Restoration Design\n\n' +
    'You are an ecosystem restoration ecologist working on a degraded wetland. ' +
    'Using your knowledge of food web complexity and ecosystem stability, design ' +
    'a restoration plan that will create a resilient ecosystem capable of ' +
    'surviving future disturbances.\n\n' +
    'Budget: $500,000 | Timeline: 5 years | Goal: Create a self-sustaining ecosystem'
  );
  form.setIsQuiz(true);
  form.setShuffleQuestions(false);

  // Scenario section
  form.addSectionHeaderItem()
    .setTitle('🔧 Restoration Scenario')
    .setHelpText(
      'DEGRADED WETLAND STATUS:\n' +
      '• Location: Former agricultural land, now abandoned\n' +
      '• Current state: Mostly bare soil, invasive grasses, polluted water\n' +
      '• Threats: Periodic flooding, potential drought, nearby development\n' +
      '• Goal: Create a wetland ecosystem that can persist without ongoing management\n\n' +
      'SPECIES OPTIONS (choose your restoration strategy):\n' +
      '┌────────────────────────────────────────────────────────────────────────┐\n' +
      '│ OPTION A - Simple Approach ($200K)                                     │\n' +
      '│ • 5 plant species (fast-growing wetland plants)                       │\n' +
      '│ • 3 fish species (common, hardy)                                      │\n' +
      '│ • 2 bird species (widespread, adaptable)                              │\n' +
      '│ • Remaining budget: $300K for maintenance                             │\n' +
      '├────────────────────────────────────────────────────────────────────────┤\n' +
      '│ OPTION B - Complex Approach ($450K)                                    │\n' +
      '│ • 25 plant species (diverse native wetland community)                 │\n' +
      '│ • 15 fish/amphibian species (including predators and prey)           │\n' +
      '│ • 20 bird species (specialists and generalists)                       │\n' +
      '│ • 10 invertebrate groups (decomposers, pollinators, filter feeders)  │\n' +
      '│ • Remaining budget: $50K for monitoring                               │\n' +
      '├────────────────────────────────────────────────────────────────────────┤\n' +
      '│ OPTION C - Keystone-Focused ($350K)                                    │\n' +
      '│ • 15 plant species (including nitrogen-fixers and sediment stabilizers)│\n' +
      '│ • 8 keystone animal species (beavers, herons, native mussels)         │\n' +
      '│ • 5 decomposer groups (bacteria, fungi, detritivores)                 │\n' +
      '│ • Allow natural colonization for other species                        │\n' +
      '│ • Remaining budget: $150K for adaptive management                     │\n' +
      '└────────────────────────────────────────────────────────────────────────┘'
    );

  // Q1: Design choice (5 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q1: Which restoration option would you recommend to create the most RESILIENT ecosystem? Consider what you\'ve learned about food web complexity and stability.')
    .setHelpText('g8_c4_w4_s3_q1 | Design decision')
    .setPoints(5)
    .setChoices([
      form.createChoice('Option A - Simple Approach: Fewer species are easier to establish and maintain', false),
      form.createChoice('Option B - Complex Approach: Maximum diversity provides maximum stability', false),
      form.createChoice('Option C - Keystone-Focused: Strategic species selection with room for natural processes', true),
      form.createChoice('None - the budget is insufficient for any successful restoration', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Excellent choice! Option C strategically introduces keystone species that will shape the ecosystem and allow for natural colonization of additional species. The budget for adaptive management acknowledges that ecosystems are dynamic.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Consider the tradeoffs: Option A lacks the redundancy needed for resilience. Option B provides maximum diversity but leaves almost no budget for addressing problems. Option C balances strategic species introduction with budget for adaptive management, and allows natural processes to fill in additional species over time.')
      .build())
    .setRequired(true);

  // Q2: Justification (5 pts)
  form.addParagraphTextItem()
    .setTitle('Q2: Explain why your chosen option would create a more resilient ecosystem than the other two options. Reference specific concepts from this week\'s lessons (redundancy, keystone species, tipping points, food web connections).')
    .setHelpText('g8_c4_w4_s3_q2 | Design justification | 4-5 sentences')
    .setRequired(true);

  // Q3: Risk analysis - targets misconception (5 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q3: A colleague argues that we should just let the wetland recover naturally since "ecosystems always recover on their own eventually." How would you respond?')
    .setHelpText('g8_c4_w4_s3_q3 | Critical evaluation | Targets misconception: ecosystems-recover-automatically')
    .setPoints(5)
    .setChoices([
      form.createChoice('Agree - natural recovery is always best because it\'s how ecosystems work', false),
      form.createChoice('Disagree - the land is too damaged to recover without intervention; invasive species and degraded soil prevent natural succession', true),
      form.createChoice('Agree - spending money on restoration is wasteful when nature will fix it', false),
      form.createChoice('Disagree - but only because natural recovery would take too long for our timeline', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! When ecosystems are severely degraded with invasive species established and soil structure damaged, they often cannot recover naturally. This is why restoration ecology exists - some situations require intervention to move the ecosystem past tipping points that block natural recovery.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Remember the tipping points concept: degraded ecosystems with invasive species and damaged soil cannot simply recover on their own. The invasives will outcompete native species, and degraded soil cannot support the original plant community. Active restoration is needed to push the ecosystem toward a healthier state.')
      .build())
    .setRequired(true);

  // Q4: Prioritization (5 pts)
  form.addCheckboxItem()
    .setTitle('Q4: If you had to cut $100K from your budget, which species groups would you prioritize KEEPING in your restoration plan? Select the THREE most important for long-term ecosystem stability.')
    .setHelpText('g8_c4_w4_s3_q4 | Prioritization | Select 3')
    .setPoints(5)
    .setChoices([
      form.createChoice('Fast-growing ornamental plants (aesthetic value)'),
      form.createChoice('Native decomposer communities (nutrient cycling)'),
      form.createChoice('Large predatory fish (sport fishing value)'),
      form.createChoice('Keystone species like beavers (ecosystem engineering)'),
      form.createChoice('Nitrogen-fixing plants (soil fertility)'),
      form.createChoice('Rare butterfly species (conservation status)')
    ])
    .setRequired(true);

  // Q5: Long-term planning (5 pts)
  form.addParagraphTextItem()
    .setTitle('Q5: Your restoration will face future disturbances (drought, flooding, invasive species). Describe TWO specific design features you would include to help your ecosystem survive these challenges. Explain how each feature increases resilience.')
    .setHelpText('g8_c4_w4_s3_q5 | Engineering design | 4-5 sentences')
    .setRequired(true);

  console.log(`Created Station 3 form: ${form.getId()}`);
  return form;
}

// ============================================================================
// EXIT TICKET: ECOSYSTEM STABILITY INTEGRATION (23 pts)
// ============================================================================

/**
 * Creates Exit Ticket form - Ecosystem Stability Integration
 * Structure: 2 NEW + 2 SPIRAL + 1 INTEGRATION + 1 SEP
 *
 * Spiral targets: W2 (invasive species), W3 (decomposition/matter cycling)
 */
function createG8C4W4ExitTicket() {
  const form = FormApp.create('G8.C4.W4: Exit Ticket - Ecosystem Stability Integration');
  const config = G8_C4_W4_CONFIG;

  form.setDescription(
    'EXIT TICKET: Demonstrating Your Understanding\n\n' +
    'Complete all questions. This assessment checks your understanding of ' +
    'food web complexity, ecosystem resilience, and connects to previous lessons.\n\n' +
    'Time: ~10 minutes | Total: 23 points'
  );
  form.setIsQuiz(true);
  form.setShuffleQuestions(false);

  // NEW Q1: Core concept - targets misconception (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('NEW Q1: Why does having multiple species that can perform similar functions (like several herbivore species) make an ecosystem more stable?')
    .setHelpText('g8_c4_w4_exit_q1 | NEW | Targets misconception: ecosystem-complexity-bad')
    .setPoints(4)
    .setChoices([
      form.createChoice('Similar species compete more, making survivors stronger', false),
      form.createChoice('If one species declines, others can maintain the same ecological function', true),
      form.createChoice('Multiple species use up resources faster, preventing overpopulation', false),
      form.createChoice('Similar species always evolve to become one super-species', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! This functional redundancy means the loss of one species doesn\'t create a gap in the food web. Other species can continue providing that ecological role.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Think about redundancy - having "backup" species means if one declines, others can fill the same role and keep energy and matter flowing through the ecosystem.')
      .build())
    .setRequired(true);

  // NEW Q2: Keystone species - targets misconception (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('NEW Q2: Wolves were reintroduced to Yellowstone and caused changes throughout the entire ecosystem, from elk behavior to river patterns. What does this demonstrate?')
    .setHelpText('g8_c4_w4_exit_q2 | NEW | Targets misconception: all-species-equally-important')
    .setPoints(4)
    .setChoices([
      form.createChoice('All predators cause this level of ecosystem change when introduced', false),
      form.createChoice('Wolves are a keystone species with disproportionately large effects on the ecosystem', true),
      form.createChoice('The changes were random and would have happened without wolves', false),
      form.createChoice('Only mammal species can be keystone species', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! Wolves are a keystone species - their presence affects many other species and even physical features of the landscape through trophic cascades.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('The Yellowstone example shows that some species (keystone species) have effects far beyond what their numbers would suggest. Not all species cause ecosystem-wide changes - wolves are special because they influence so many other populations and processes.')
      .build())
    .setRequired(true);

  // SPIRAL Q3: W2 connection - invasive species (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('SPIRAL Q3: (From W2) Invasive species like the cane toad in Australia disrupted ecosystems by eliminating predators that tried to eat them. How does food web complexity affect an ecosystem\'s ability to survive invasive species?')
    .setHelpText('g8_c4_w4_exit_q3 | SPIRAL: W2 invasive species')
    .setPoints(4)
    .setChoices([
      form.createChoice('Complex food webs collapse faster because more species are affected', false),
      form.createChoice('Simple food webs are more resistant because there are fewer pathways for invasives to spread', false),
      form.createChoice('Complex food webs can better absorb invasive impacts because alternative food sources exist', true),
      form.createChoice('Food web complexity doesn\'t affect invasive species impact', false)
    ])
    .setRequired(true);

  // SPIRAL Q4: W3 connection - decomposition (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('SPIRAL Q4: (From W3) Decomposers connect to nearly every species in a food web through matter cycling. How does this make them critical for ecosystem stability?')
    .setHelpText('g8_c4_w4_exit_q4 | SPIRAL: W3 decomposition')
    .setPoints(3)
    .setChoices([
      form.createChoice('Decomposers prevent disease by eliminating dead material quickly', false),
      form.createChoice('Their many connections mean disrupting decomposition affects nutrients available to all species', true),
      form.createChoice('Decomposers are easy to replace if they decline', false),
      form.createChoice('Decomposers only affect soil organisms, not the rest of the food web', false)
    ])
    .setRequired(true);

  // INTEGRATION Q5: Synthesis - targets misconception (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('INTEGRATION Q5: A coral reef loses 50% of its species due to a bleaching event but maintains all its trophic levels (producers, herbivores, predators, decomposers). What is its likely recovery outlook?')
    .setHelpText('g8_c4_w4_exit_q5 | INTEGRATION | Targets misconception: ecosystems-recover-automatically')
    .setPoints(4)
    .setChoices([
      form.createChoice('Guaranteed recovery since all trophic levels remain', false),
      form.createChoice('Cannot recover because too many species were lost', false),
      form.createChoice('Possible recovery if remaining species provide functional redundancy and no tipping points were crossed', true),
      form.createChoice('The reef will transition to a different ecosystem type like a kelp forest', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! Recovery depends on whether remaining species can fill the roles of lost ones AND whether critical thresholds were crossed. Some species loss is survivable; crossing tipping points is not.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Consider the key factors: Maintaining trophic levels is good, but recovery also depends on functional redundancy (can surviving species fill the roles of lost ones?) and tipping points (has damage exceeded the ecosystem\'s ability to recover?).')
      .build())
    .setRequired(true);

  // SEP Q6: Modeling (4 pts)
  form.addParagraphTextItem()
    .setTitle('SEP Q6: Describe how you would model the stability of a pond ecosystem. What components would your model include, and how would you test whether the ecosystem is resilient to disturbances?')
    .setHelpText('g8_c4_w4_exit_q6 | SEP-2: Developing and Using Models | 3-4 sentences')
    .setRequired(true);

  console.log(`Created Exit Ticket form: ${form.getId()}`);
  return form;
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Gets the configuration object for this week.
 * Used by other scripts that need to reference this week's settings.
 */
function getG8C4W4Config() {
  return G8_C4_W4_CONFIG;
}

/**
 * Validates that all forms have correct point totals.
 * Run this after creating forms to check for errors.
 */
function validateG8C4W4Points() {
  const config = G8_C4_W4_CONFIG;
  console.log('Validating G8 C4 W4 point totals...');
  console.log(`Expected: Hook=${config.points.hook}, S1=${config.points.station1}, S2=${config.points.station2}, S3=${config.points.station3}, Exit=${config.points.exitTicket}`);
  console.log(`Total should equal: ${config.points.total}`);

  // Note: Actual validation would require reading form items
  // This is a placeholder for the validation logic
  return true;
}

/**
 * Creates a summary of misconceptions targeted in this week's forms.
 */
function getG8C4W4MisconceptionSummary() {
  const config = G8_C4_W4_CONFIG;
  console.log('=== G8 C4 W4 Misconception Targeting Summary ===');

  config.misconceptions.forEach(m => {
    console.log(`\n${m.id}:`);
    console.log(`  Description: ${m.description}`);
    console.log(`  Correct understanding: ${m.correctUnderstanding}`);
    console.log(`  Targeted in: ${m.targetedIn.join(', ')}`);
  });

  return config.misconceptions;
}
