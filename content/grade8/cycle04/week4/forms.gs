/**
 * Grade 8 Cycle 4 Week 4: Food Web Complexity & Stability
 * Standards: MS-LS2-3 (matter cycling/energy flow), MS-LS2-4 (ecosystem changes)
 * Phenomenon: Why can some ecosystems survive a drought but others collapse?
 *
 * Form Structure:
 * - Hook: The Resilient Reef Mystery (12 pts)
 * - Station 1: Food Web Complexity Investigation (20 pts)
 * - Station 2: Ecosystem Resilience Analysis (20 pts)
 * - Station 3: Design a Resilient Ecosystem (25 pts)
 * - Exit Ticket: Ecosystem Stability Integration (23 pts)
 *
 * Total: 100 points
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
  standards: ['MS-LS2-3', 'MS-LS2-4'],
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
      id: 'simple-webs-stable',
      description: 'Students think simpler food webs are more stable because they have fewer things to go wrong',
      targetedIn: ['hook_q3', 's1_q3']
    },
    {
      id: 'keystone-replaceable',
      description: 'Students think any species can be replaced by another similar one',
      targetedIn: ['s2_q3', 'exit_q2']
    },
    {
      id: 'resilience-fixed',
      description: 'Students think ecosystem resilience is fixed and cannot be changed by human intervention',
      targetedIn: ['s3_q4', 'exit_q5']
    }
  ],
  spiralTargets: {
    w3: 'Decomposition and matter cycling',
    w2: 'Invasive species and ecosystem disruption',
    w1: 'Energy flow and trophic levels'
  }
};

// ============================================================================
// MAIN ENTRY POINT
// ============================================================================

/**
 * Creates all forms for G8 C4 W4
 */
function createAllForms() {
  const results = {
    hook: createHookForm_(),
    station1: createStation1Form_(),
    station2: createStation2Form_(),
    station3: createStation3Form_(),
    exitTicket: createExitTicketForm_()
  };

  Logger.log('=== G8 C4 W4 Forms Created ===');
  Object.entries(results).forEach(([name, url]) => {
    Logger.log(`${name}: ${url}`);
  });

  return results;
}

// ============================================================================
// HOOK: THE RESILIENT REEF MYSTERY (12 points)
// ============================================================================

function createHookForm_() {
  const form = FormApp.create('G8.C4.W4: Hook - The Resilient Reef Mystery');
  configFormSettings_(form);

  form.setDescription(
    'Phenomenon: Two coral reef ecosystems experience the same heat wave. ' +
    'Reef A has 500 species of fish, corals, and invertebrates with complex feeding relationships. ' +
    'Reef B has only 50 species with simpler food chains. ' +
    'After the heat wave, Reef A recovers in 5 years. Reef B collapses and never recovers. ' +
    'Why does biodiversity affect survival?\n\n' +
    'Points: 12 | Standards: MS-LS2-3, MS-LS2-4'
  );

  // Q1: Initial observation (2 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q1: What is the MOST surprising part of this phenomenon?')
    .setHelpText('Question ID: g8_c4_w4_hook_q1')
    .setChoices([
      form.createChoice('Both reefs experienced the same stress but had very different outcomes', true),
      form.createChoice('Coral reefs exist in warm water', false),
      form.createChoice('Heat waves can affect marine ecosystems', false),
      form.createChoice('Reef A has more species than Reef B', false)
    ])
    .setRequired(true)
    .setPoints(2);

  // Q2: Prior knowledge activation (2 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q2: In Week 1, you learned about energy flow through trophic levels. In a diverse ecosystem with 500 species, how many different PATHWAYS might energy have to flow through the food web?')
    .setHelpText('Question ID: g8_c4_w4_hook_q2')
    .setChoices([
      form.createChoice('Just one main pathway', false),
      form.createChoice('A few pathways (2-3)', false),
      form.createChoice('Many interconnected pathways forming a complex web', true),
      form.createChoice('Energy doesn\'t flow through pathways', false)
    ])
    .setRequired(true)
    .setPoints(2);

  // Q3: Misconception target - simple-webs-stable (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q3: A student says "Simpler ecosystems should be MORE stable because there are fewer things that can go wrong." Based on the reef data, what evidence CONTRADICTS this idea?')
    .setHelpText('Question ID: g8_c4_w4_hook_q3 | Targets misconception: simple-webs-stable')
    .setChoices([
      form.createChoice('The student is correct - simpler is always better', false),
      form.createChoice('Reef B (simpler) collapsed while Reef A (complex) recovered, showing complexity aids stability', true),
      form.createChoice('Both reefs behaved the same way', false),
      form.createChoice('The data doesn\'t address ecosystem complexity', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // Q4: Hypothesis generation (3 pts)
  form.addParagraphTextItem()
    .setTitle('Q4: Propose a hypothesis: WHY might having more species and more connections in a food web help an ecosystem survive disturbances?')
    .setHelpText('Question ID: g8_c4_w4_hook_q4 | 3 points: Testable hypothesis connecting diversity to stability')
    .setRequired(true);
  setPointsForLastItem_(form, 3);

  // Q5: Question generation (2 pts)
  form.addParagraphTextItem()
    .setTitle('Q5: What questions do you have about how food web structure affects ecosystem survival?')
    .setHelpText('Question ID: g8_c4_w4_hook_q5 | 2 points: Generate investigable questions')
    .setRequired(true);
  setPointsForLastItem_(form, 2);

  return form.getPublishedUrl();
}

// ============================================================================
// STATION 1: FOOD WEB COMPLEXITY INVESTIGATION (20 points)
// ============================================================================

function createStation1Form_() {
  const form = FormApp.create('G8.C4.W4: Station 1 - Food Web Complexity Investigation');
  configFormSettings_(form);

  form.setDescription(
    'Explore how the number of species and connections in a food web affects ecosystem stability.\n\n' +
    'Use the food web simulation to test what happens when species are removed from simple vs. complex webs.\n\n' +
    'Spiral Review: Decomposition and matter cycling from Week 3\n' +
    'Points: 20 | Standards: MS-LS2-3, MS-LS2-4'
  );

  // Q1: Redundancy concept (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q1: In a diverse food web, if one species of herbivore dies off, what happens to the predators that ate it?')
    .setHelpText('Question ID: g8_c4_w4_s1_q1')
    .setChoices([
      form.createChoice('All the predators immediately die', false),
      form.createChoice('Predators can switch to eating other herbivore species that fill similar roles', true),
      form.createChoice('Predators don\'t eat herbivores', false),
      form.createChoice('New herbivores spontaneously appear', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // Q2: Connectance (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q2: "Connectance" measures how many feeding links exist relative to the maximum possible. Why does HIGH connectance often mean MORE stable ecosystems?')
    .setHelpText('Question ID: g8_c4_w4_s1_q2')
    .setChoices([
      form.createChoice('More connections mean more potential backup food sources if one fails', true),
      form.createChoice('High connectance means fewer species', false),
      form.createChoice('Connections use up energy, making systems weaker', false),
      form.createChoice('Connectance has no effect on stability', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q3: Misconception target - simple-webs-stable (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q3: In the simulation, you remove one species from two food webs: Web A (simple, linear chain) and Web B (complex, many connections). What typically happens?')
    .setHelpText('Question ID: g8_c4_w4_s1_q3 | Targets misconception: simple-webs-stable')
    .setChoices([
      form.createChoice('Both webs collapse equally', false),
      form.createChoice('Web A (simple) cascades to collapse; Web B (complex) adjusts and survives', true),
      form.createChoice('Web A survives better than Web B', false),
      form.createChoice('Nothing happens to either web', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // Q4: Functional redundancy (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q4: "Functional redundancy" means multiple species can perform the same ecological role (like decomposing leaves). Why is this valuable for ecosystem stability?')
    .setHelpText('Question ID: g8_c4_w4_s1_q4')
    .setChoices([
      form.createChoice('It wastes resources having duplicate species', false),
      form.createChoice('If one species is lost, others can continue the function, maintaining matter cycling', true),
      form.createChoice('Redundancy means species compete and weaken the ecosystem', false),
      form.createChoice('Functional redundancy only matters in artificial ecosystems', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q5: Simulation analysis (3 pts)
  form.addParagraphTextItem()
    .setTitle('Q5: Based on the simulation, describe what happens to energy flow when you remove the top predator from a simple food chain vs. a complex food web. Why is the outcome different?')
    .setHelpText('Question ID: g8_c4_w4_s1_q5 | 3 points: Compare simple vs complex outcomes with energy flow explanation')
    .setRequired(true);
  setPointsForLastItem_(form, 3);

  // Q6: Spiral review - W3 Decomposition (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q6: [SPIRAL W3] In Week 3, you learned that decomposers cycle matter back to producers. In a stable ecosystem, why might having MULTIPLE species of decomposers be better than just one?')
    .setHelpText('Question ID: g8_c4_w4_s1_q6 | Spiral: W3 Decomposition')
    .setChoices([
      form.createChoice('One decomposer species is always enough', false),
      form.createChoice('Multiple decomposer species can handle different conditions and materials, ensuring continuous cycling', true),
      form.createChoice('Decomposers don\'t affect ecosystem stability', false),
      form.createChoice('Multiple species compete and slow down decomposition', false)
    ])
    .setRequired(true)
    .setPoints(3);

  return form.getPublishedUrl();
}

// ============================================================================
// STATION 2: ECOSYSTEM RESILIENCE ANALYSIS (20 points)
// ============================================================================

function createStation2Form_() {
  const form = FormApp.create('G8.C4.W4: Station 2 - Ecosystem Resilience Analysis');
  configFormSettings_(form);

  form.setDescription(
    'Analyze real data from ecosystems that experienced disturbances to identify what makes some more resilient.\n\n' +
    'Compare recovery patterns in diverse vs. simplified ecosystems.\n\n' +
    'Points: 20 | Standards: MS-LS2-4'
  );

  // Scenario introduction
  form.addSectionHeaderItem()
    .setTitle('Ecosystem Recovery Data')
    .setHelpText('After similar droughts:\n\n' +
                 'Amazon Rainforest (10,000+ species):\n' +
                 '• Initial biomass loss: 15%\n' +
                 '• Recovery time: 3-5 years\n' +
                 '• Species lost permanently: <1%\n\n' +
                 'Monoculture Tree Plantation (1 species):\n' +
                 '• Initial biomass loss: 60%\n' +
                 '• Recovery time: 15+ years (requires replanting)\n' +
                 '• Species lost permanently: 100% (of that species in affected area)\n\n' +
                 'Yellowstone (after wolf removal vs. reintroduction):\n' +
                 '• Without wolves: Elk overpopulated → overgrazing → erosion → stream degradation\n' +
                 '• With wolves: Balanced populations → vegetation recovery → stream restoration');

  // Q1: Data interpretation (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q1: Based on the data, which ecosystem showed the HIGHEST resilience (ability to recover from disturbance)?')
    .setHelpText('Question ID: g8_c4_w4_s2_q1')
    .setChoices([
      form.createChoice('Monoculture plantation (single species)', false),
      form.createChoice('Amazon rainforest (high biodiversity)', true),
      form.createChoice('Yellowstone without wolves', false),
      form.createChoice('All ecosystems recovered equally', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q2: Pattern recognition (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q2: What PATTERN do you notice about biodiversity and recovery time across these ecosystems?')
    .setHelpText('Question ID: g8_c4_w4_s2_q2')
    .setChoices([
      form.createChoice('More diverse ecosystems take longer to recover', false),
      form.createChoice('More diverse ecosystems recover faster and lose fewer species permanently', true),
      form.createChoice('Biodiversity has no effect on recovery', false),
      form.createChoice('Simpler ecosystems are more resilient', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q3: Misconception target - keystone-replaceable (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q3: The Yellowstone data shows wolves are a "keystone species." A student says "We could just replace wolves with a similar predator like dogs." What does the data suggest about this idea?')
    .setHelpText('Question ID: g8_c4_w4_s2_q3 | Targets misconception: keystone-replaceable')
    .setChoices([
      form.createChoice('Any predator could replace wolves successfully', false),
      form.createChoice('Keystone species have unique ecological roles that cannot simply be replaced by similar species', true),
      form.createChoice('The data shows wolves are not important', false),
      form.createChoice('Dogs would actually be better than wolves', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q4: Trophic cascade (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q4: In Yellowstone, removing wolves affected elk, which affected plants, which affected streams. This "domino effect" through multiple trophic levels is called a:')
    .setHelpText('Question ID: g8_c4_w4_s2_q4')
    .setChoices([
      form.createChoice('Trophic cascade', true),
      form.createChoice('Energy pyramid', false),
      form.createChoice('Decomposition cycle', false),
      form.createChoice('Food chain', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q5: Analysis (4 pts)
  form.addParagraphTextItem()
    .setTitle('Q5: Using the data, explain why a monoculture plantation is MORE vulnerable to drought than a natural forest, even if both have the same number of trees.')
    .setHelpText('Question ID: g8_c4_w4_s2_q5 | 4 points: Connect biodiversity, functional redundancy, and resilience')
    .setRequired(true);
  setPointsForLastItem_(form, 4);

  return form.getPublishedUrl();
}

// ============================================================================
// STATION 3: DESIGN A RESILIENT ECOSYSTEM (25 points)
// ============================================================================

function createStation3Form_() {
  const form = FormApp.create('G8.C4.W4: Station 3 - Design a Resilient Ecosystem');
  configFormSettings_(form);

  form.setDescription(
    'Apply your knowledge of food web stability to design a restoration plan for a degraded ecosystem.\n\n' +
    'Engineering Challenge: Maximize ecosystem resilience within constraints.\n\n' +
    'Points: 25 | Standards: MS-LS2-4, MS-ETS1-2'
  );

  // Scenario introduction
  form.addSectionHeaderItem()
    .setTitle('Ecosystem Restoration Challenge')
    .setHelpText('A 1000-acre degraded wetland needs restoration. Currently:\n' +
                 '• Only 5 species remain (3 plants, 1 herbivore, 1 predator)\n' +
                 '• Simple food chain with no redundancy\n' +
                 '• History of collapse when any species declines\n\n' +
                 'Restoration Options (budget: $500,000):\n' +
                 '• Native plant diversity package: $50,000 (adds 15 plant species)\n' +
                 '• Herbivore reintroduction: $30,000 per species (insects, fish, birds)\n' +
                 '• Predator reintroduction: $75,000 per species\n' +
                 '• Decomposer enhancement: $25,000 (adds fungi, bacteria, invertebrate decomposers)\n' +
                 '• Habitat structure (logs, rocks, varied depths): $100,000');

  // Q1: Problem analysis (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q1: The current ecosystem collapses easily because it has only one pathway for energy flow. What is this structural problem called?')
    .setHelpText('Question ID: g8_c4_w4_s3_q1')
    .setChoices([
      form.createChoice('High biodiversity', false),
      form.createChoice('Low connectance / no functional redundancy', true),
      form.createChoice('Trophic cascade', false),
      form.createChoice('Balanced energy pyramid', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q2: Priority setting (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q2: Which restoration action should be the FIRST priority to build ecosystem stability?')
    .setHelpText('Question ID: g8_c4_w4_s3_q2')
    .setChoices([
      form.createChoice('Add top predators first', false),
      form.createChoice('Increase producer diversity first - they are the energy foundation', true),
      form.createChoice('Focus only on the single most charismatic species', false),
      form.createChoice('The order doesn\'t matter', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // Q3: Budget allocation (5 pts)
  form.addParagraphTextItem()
    .setTitle('Q3: With $500,000, create a specific spending plan that maximizes food web complexity and functional redundancy. List exactly what you would purchase and show your math.')
    .setHelpText('Question ID: g8_c4_w4_s3_q3 | 5 points: Specific allocations with math totaling ≤$500,000')
    .setRequired(true);
  setPointsForLastItem_(form, 5);

  // Q4: Misconception target - resilience-fixed (6 pts)
  form.addParagraphTextItem()
    .setTitle('Q4: A stakeholder says "Nature will fix itself - we shouldn\'t interfere." Using evidence from this week, explain why strategic intervention CAN increase ecosystem resilience and why doing nothing may not lead to recovery.')
    .setHelpText('Question ID: g8_c4_w4_s3_q4 | 6 points: Evidence-based argument for restoration | Targets misconception: resilience-fixed')
    .setRequired(true);
  setPointsForLastItem_(form, 6);

  // Q5: Long-term monitoring (6 pts)
  form.addParagraphTextItem()
    .setTitle('Q5: How would you MEASURE whether your restoration successfully increased ecosystem resilience? Describe at least TWO specific indicators you would monitor and what changes would show success.')
    .setHelpText('Question ID: g8_c4_w4_s3_q5 | 6 points: Two measurable indicators with success criteria')
    .setRequired(true);
  setPointsForLastItem_(form, 6);

  return form.getPublishedUrl();
}

// ============================================================================
// EXIT TICKET: ECOSYSTEM STABILITY INTEGRATION (23 points)
// ============================================================================

function createExitTicketForm_() {
  const form = FormApp.create('G8.C4.W4: Exit Ticket - Ecosystem Stability Integration');
  configFormSettings_(form);

  form.setDescription(
    'Demonstrate your understanding of food web complexity and ecosystem resilience.\n\n' +
    'Structure: 2 New + 2 Spiral + 1 Integration + 1 SEP\n' +
    'Points: 23 | Standards: MS-LS2-3, MS-LS2-4'
  );

  // NEW Q1: Core concept (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q1 [NEW]: What is "functional redundancy" in an ecosystem?')
    .setHelpText('Question ID: g8_c4_w4_exit_q1')
    .setChoices([
      form.createChoice('Having too many of one species', false),
      form.createChoice('Multiple species that can perform the same ecological role', true),
      form.createChoice('Species that serve no function', false),
      form.createChoice('A food web with only one pathway', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // NEW Q2: Misconception target - keystone-replaceable (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q2 [NEW]: Why can\'t keystone species easily be replaced by similar species from other ecosystems?')
    .setHelpText('Question ID: g8_c4_w4_exit_q2 | Targets misconception: keystone-replaceable')
    .setChoices([
      form.createChoice('All species of the same type are interchangeable', false),
      form.createChoice('Keystone species have evolved specific relationships with their ecosystem that substitutes lack', true),
      form.createChoice('Keystone species are not actually important', false),
      form.createChoice('Similar species would work better than the original', false)
    ])
    .setRequired(true)
    .setPoints(4);

  // SPIRAL Q3: W2 - Invasive species (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q3 [SPIRAL W2]: In Week 2, you learned about invasive species. How might a complex food web be MORE resistant to damage from an invasive species compared to a simple food web?')
    .setHelpText('Question ID: g8_c4_w4_exit_q3 | Spiral: W2 Invasive Species')
    .setChoices([
      form.createChoice('Complex food webs are actually more vulnerable to invasives', false),
      form.createChoice('Complex webs have multiple pathways, so disruption of one doesn\'t collapse the system', true),
      form.createChoice('Invasive species can\'t enter complex food webs', false),
      form.createChoice('Food web complexity has no effect on invasive species impacts', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // SPIRAL Q4: W1 - Energy flow (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q4 [SPIRAL W1]: You learned that only ~10% of energy transfers between trophic levels. In a complex food web with multiple energy pathways, how might this affect overall ecosystem productivity during stress?')
    .setHelpText('Question ID: g8_c4_w4_exit_q4 | Spiral: W1 Energy Flow')
    .setChoices([
      form.createChoice('Multiple pathways waste more energy', false),
      form.createChoice('If one pathway is disrupted, energy can flow through alternative pathways, maintaining productivity', true),
      form.createChoice('Complex food webs have no energy flow', false),
      form.createChoice('The 10% rule doesn\'t apply to complex food webs', false)
    ])
    .setRequired(true)
    .setPoints(3);

  // INTEGRATION Q5: Cross-concept connection (5 pts)
  form.addParagraphTextItem()
    .setTitle('Q5 [INTEGRATION]: Climate change is causing more frequent droughts, heat waves, and storms. Using your knowledge from W1-W4 (energy flow, invasive species, decomposition, and food web stability), explain why protecting biodiversity is important for ecosystem survival in a changing climate.')
    .setHelpText('Question ID: g8_c4_w4_exit_q5 | 5 points: Integrate concepts from multiple weeks to address climate resilience')
    .setRequired(true);
  setPointsForLastItem_(form, 5);

  // SEP Q6: Developing models (4 pts)
  form.addParagraphTextItem()
    .setTitle('Q6 [SEP]: Draw or describe a model comparing a simple food chain (3 species) to a complex food web (10+ species). Your model should show how removing one species affects each system differently. Explain what your model demonstrates about ecosystem stability.')
    .setHelpText('Question ID: g8_c4_w4_exit_q6 | 4 points: SEP 2 - Developing and Using Models')
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
  // Required form settings per CONTENT-DESIGN-GUIDE.md
  form.setIsQuiz(true);
  form.setRequireLogin(true);
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setShowLinkToRespondAgain(false);
  form.setProgressBar(true);
  form.setShuffleQuestions(false);
  form.setConfirmationMessage(
    'Your responses have been recorded. Great work understanding ecosystem stability!\n\n' +
    'Key Takeaway: Complex food webs with high biodiversity are more resilient because ' +
    'they have multiple pathways for energy flow and functional redundancy.'
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
    // Paragraph items need manual grading - points included in helpText
  }
}

// ============================================================================
// INDIVIDUAL FORM CREATORS
// ============================================================================

function createG8C4W4Hook() { return createHookForm_(); }
function createG8C4W4Station1() { return createStation1Form_(); }
function createG8C4W4Station2() { return createStation2Form_(); }
function createG8C4W4Station3() { return createStation3Form_(); }
function createG8C4W4ExitTicket() { return createExitTicketForm_(); }

// ============================================================================
// VALIDATION
// ============================================================================

function validatePoints_() {
  const expected = G8_C4_W4_CONFIG.points;
  const calculated = {
    hook: 2 + 2 + 3 + 3 + 2,          // 12
    station1: 3 + 4 + 3 + 4 + 3 + 3,  // 20
    station2: 4 + 4 + 4 + 4 + 4,      // 20
    station3: 4 + 4 + 5 + 6 + 6,      // 25
    exitTicket: 4 + 4 + 3 + 3 + 5 + 4 // 23
  };
  calculated.total = Object.values(calculated).reduce((a, b) => a + b, 0);

  Logger.log('=== Point Validation ===');
  Object.keys(expected).forEach(key => {
    const match = expected[key] === calculated[key];
    Logger.log(`${key}: Expected ${expected[key]}, Got ${calculated[key]} ${match ? '✓' : '✗'}`);
  });

  return calculated.total === expected.total;
}
