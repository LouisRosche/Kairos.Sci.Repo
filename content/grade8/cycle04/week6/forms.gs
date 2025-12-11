/**
 * G8.C4.W6 Forms - Synthesis & Assessment
 *
 * Assessment Week: Ecosystems & Energy Transfer
 * Standards: MS-LS2-3 (Cycling of matter and flow of energy in ecosystems)
 *
 * This is a culminating assessment week that evaluates student mastery of:
 * - Energy pyramids and trophic levels (W1)
 * - Ecosystem disruption and invasive species (W2)
 * - Matter cycling and decomposition (W3)
 * - Food web complexity and stability (W4)
 * - Ecosystem services and human dependence (W5)
 *
 * Assessment Structure (100 pts total):
 * - Part 1: Synthesis Review (20 pts) - 15 min
 * - Part 2: Cumulative Assessment (60 pts) - 40 min
 * - Part 3: Misconception Check (20 pts) - 20 min
 *
 * @version 1.0.0
 * @lastUpdated 2025-12-11
 */

// ============================================================================
// CONFIGURATION
// ============================================================================

const G8_C4_W6_CONFIG = {
  grade: 8,
  cycle: 4,
  week: 6,
  topic: 'Synthesis & Assessment',
  isAssessmentWeek: true,
  standards: ['MS-LS2-3'],
  points: {
    part1: 20,
    part2: 60,
    part3: 20,
    total: 100
  },
  cycleTopics: {
    w1: 'Energy Pyramids & Trophic Levels',
    w2: 'Ecosystem Disruption & Invasive Species',
    w3: 'Matter Cycling & Decomposition',
    w4: 'Food Web Complexity & Stability',
    w5: 'Ecosystem Services & Human Dependence'
  },
  targetedMisconceptions: [
    'energy-recycled',
    'pyramid-stability',
    'matter-disappears',
    'ecosystem-services-free',
    'technology-can-replace-nature'
  ]
};

// ============================================================================
// MAIN ENTRY POINT
// ============================================================================

/**
 * Creates all assessment forms for G8 C4 W6.
 */
function createG8C4W6Forms() {
  const config = G8_C4_W6_CONFIG;
  console.log(`Creating assessment forms for G${config.grade} C${config.cycle} W${config.week}: ${config.topic}`);

  const forms = {
    part1: createG8C4W6Part1(),
    part2: createG8C4W6Part2(),
    part3: createG8C4W6Part3()
  };

  console.log('All G8 C4 W6 assessment forms created successfully');
  return forms;
}

// ============================================================================
// PART 1: SYNTHESIS REVIEW (20 pts, 15 min)
// ============================================================================

/**
 * Creates Part 1 - Synthesis Review
 * Focus: Connect energy flow, matter cycling, and ecosystem services
 */
function createG8C4W6Part1() {
  const form = FormApp.create('G8.C4.W6: Part 1 - Synthesis Review');
  const config = G8_C4_W6_CONFIG;

  form.setDescription(
    'PART 1: SYNTHESIS REVIEW\n\n' +
    'Time: 15 minutes | Points: 20\n\n' +
    'This section reviews the key connections between energy flow, matter cycling, ' +
    'food web complexity, and ecosystem services studied throughout Cycle 4.\n\n' +
    'Read each question carefully and select the best answer.'
  );
  form.setIsQuiz(true);
  form.setShuffleQuestions(false);

  // Q1: Energy-Matter connection (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q1: How do energy flow and matter cycling DIFFER in ecosystems?')
    .setHelpText('g8_c4_w6_p1_q1 | Connection: W1 + W3')
    .setPoints(4)
    .setChoices([
      form.createChoice('Both are recycled continuously through the ecosystem', false),
      form.createChoice('Energy flows through (lost as heat at each level), while matter cycles (used repeatedly)', true),
      form.createChoice('Matter flows through, while energy is recycled', false),
      form.createChoice('Neither energy nor matter cycles - both are used once and gone', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! This is the fundamental distinction: energy enters as sunlight, flows through trophic levels (losing ~90% at each level as heat), and exits. Matter cycles through decomposition - the same atoms can be reused indefinitely.')
      .build())
    .setRequired(true);

  // Q2: Complexity-Stability connection (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q2: A diverse prairie with 150+ species survived a drought with 30% plant death, while a corn monoculture experienced 95% plant death. How does this relate to ecosystem services?')
    .setHelpText('g8_c4_w6_p1_q2 | Connection: W4 + W5')
    .setPoints(4)
    .setChoices([
      form.createChoice('Ecosystem services are unrelated to biodiversity', false),
      form.createChoice('Complex food webs provide more stable ecosystem services because functional redundancy means if one species fails, others continue providing services', true),
      form.createChoice('Simple ecosystems always provide better services because they\'re easier to manage', false),
      form.createChoice('Only the prairie provides ecosystem services; farms do not', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! Ecosystem service stability depends on food web complexity. The prairie survived because multiple species could fill similar roles - if drought-sensitive grasses died, drought-tolerant ones continued providing habitat, soil retention, and carbon storage.')
      .build())
    .setRequired(true);

  // Q3: Decomposition-Services connection (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q3: Why is the "supporting service" of decomposition essential for ALL other ecosystem services?')
    .setHelpText('g8_c4_w6_p1_q3 | Connection: W3 + W5')
    .setPoints(4)
    .setChoices([
      form.createChoice('Decomposition only affects soil and is separate from other services', false),
      form.createChoice('Without decomposers cycling nutrients back to soil, plants couldn\'t grow, collapsing the foundation for all services', true),
      form.createChoice('Decomposition is a cultural service that humans appreciate aesthetically', false),
      form.createChoice('Decomposition provides food directly to humans', false)
    ])
    .setRequired(true);

  // Q4: Invasive species-Energy flow connection (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('Q4: When invasive cane toads entered Australia, native predators died trying to eat them. How does this connect to energy flow in the food web?')
    .setHelpText('g8_c4_w6_p1_q4 | Connection: W1 + W2')
    .setPoints(4)
    .setChoices([
      form.createChoice('Energy flow was unaffected because cane toads replaced the same role', false),
      form.createChoice('Removing predators disrupted energy flow to higher trophic levels and caused cascading imbalances throughout the web', true),
      form.createChoice('Only the cane toads\' energy flow changed', false),
      form.createChoice('Invasive species don\'t affect energy flow because they come from outside the system', false)
    ])
    .setRequired(true);

  // Q5: Synthesis application (4 pts)
  form.addParagraphTextItem()
    .setTitle('Q5: A wetland provides water filtration, flood control, and habitat for fish (all ecosystem services). Explain how the 10% rule (energy transfer between trophic levels), decomposition, and food web complexity ALL work together to maintain these services.')
    .setHelpText('g8_c4_w6_p1_q5 | Full synthesis | 4-5 sentences')
    .setRequired(true);

  console.log(`Created Part 1 form: ${form.getId()}`);
  return form;
}

// ============================================================================
// PART 2: CUMULATIVE ASSESSMENT (60 pts, 40 min)
// ============================================================================

/**
 * Creates Part 2 - Cumulative Assessment
 * Sections: A: Energy Flow, B: Matter Cycling, C: Ecosystem Stability, D: Ecosystem Services
 */
function createG8C4W6Part2() {
  const form = FormApp.create('G8.C4.W6: Part 2 - Cumulative Assessment');
  const config = G8_C4_W6_CONFIG;

  form.setDescription(
    'PART 2: CUMULATIVE ASSESSMENT\n\n' +
    'Time: 40 minutes | Points: 60\n\n' +
    'This assessment covers all topics from Cycle 4. ' +
    'Answer all questions in each section.\n\n' +
    'Sections:\n' +
    '• Section A: Energy Flow (15 pts)\n' +
    '• Section B: Matter Cycling (15 pts)\n' +
    '• Section C: Ecosystem Stability (15 pts)\n' +
    '• Section D: Ecosystem Services (15 pts)'
  );
  form.setIsQuiz(true);
  form.setShuffleQuestions(false);

  // ========== SECTION A: ENERGY FLOW (15 pts) ==========
  form.addSectionHeaderItem()
    .setTitle('Section A: Energy Flow')
    .setHelpText('Questions about energy pyramids, trophic levels, and the 10% rule');

  // A1 (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('A1: If producers in an ecosystem capture 10,000 kcal of energy from the sun, how much energy is available to secondary consumers (carnivores)?')
    .setHelpText('g8_c4_w6_p2_a1 | W1: 10% rule')
    .setPoints(3)
    .setChoices([
      form.createChoice('10,000 kcal - all energy transfers completely', false),
      form.createChoice('1,000 kcal - 10% passes to herbivores', false),
      form.createChoice('100 kcal - 10% of 10% (two transfers)', true),
      form.createChoice('0 kcal - carnivores don\'t get any energy', false)
    ])
    .setRequired(true);

  // A2 (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('A2: Why are there typically fewer top predators than herbivores in an ecosystem?')
    .setHelpText('g8_c4_w6_p2_a2 | W1: Energy pyramids')
    .setPoints(3)
    .setChoices([
      form.createChoice('Top predators reproduce less frequently', false),
      form.createChoice('Only 10% of energy transfers between levels, so less energy is available to support predators', true),
      form.createChoice('Herbivores are more intelligent and avoid predators', false),
      form.createChoice('Predators need less food than herbivores', false)
    ])
    .setRequired(true);

  // A3 (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('A3: What happens to the ~90% of energy that is NOT transferred between trophic levels?')
    .setHelpText('g8_c4_w6_p2_a3 | W1: Energy loss')
    .setPoints(4)
    .setChoices([
      form.createChoice('It is stored in the ecosystem for later use', false),
      form.createChoice('It is released as heat through metabolism and cellular respiration', true),
      form.createChoice('It cycles back to the producers', false),
      form.createChoice('It is absorbed by decomposers and recycled', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! Energy is lost as heat when organisms use it for life processes (movement, growth, reproduction). This is why energy flows THROUGH ecosystems rather than cycling - it ultimately escapes as thermal energy.')
      .build())
    .setRequired(true);

  // A4 (5 pts)
  form.addParagraphTextItem()
    .setTitle('A4: Explain why eating plants is more "energy efficient" than eating meat. Include the 10% rule in your explanation and calculate how many kcal of plant energy is needed to produce 100 kcal of beef vs. eating 100 kcal of plants directly.')
    .setHelpText('g8_c4_w6_p2_a4 | W1: Energy efficiency | 4-5 sentences')
    .setRequired(true);

  // ========== SECTION B: MATTER CYCLING (15 pts) ==========
  form.addSectionHeaderItem()
    .setTitle('Section B: Matter Cycling')
    .setHelpText('Questions about decomposition and nutrient cycles');

  // B1 (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('B1: Why don\'t dead leaves pile up forever in a forest?')
    .setHelpText('g8_c4_w6_p2_b1 | W3: Decomposition')
    .setPoints(3)
    .setChoices([
      form.createChoice('Wind blows them away each year', false),
      form.createChoice('Decomposers break them down and return nutrients to the soil', true),
      form.createChoice('Forest fires burn them all each decade', false),
      form.createChoice('Animals eat all the dead leaves', false)
    ])
    .setRequired(true);

  // B2 (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('B2: Unlike energy, matter can be "recycled" in ecosystems. What does this mean?')
    .setHelpText('g8_c4_w6_p2_b2 | W3: Matter cycling')
    .setPoints(3)
    .setChoices([
      form.createChoice('Humans can recycle ecosystem materials in factories', false),
      form.createChoice('The same atoms can be used repeatedly - carbon from decomposed leaves becomes carbon in new plants', true),
      form.createChoice('Matter disappears and new matter is created', false),
      form.createChoice('Only some materials can cycle, not all', false)
    ])
    .setRequired(true);

  // B3 (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('B3: What would happen to an ecosystem if all decomposers suddenly disappeared?')
    .setHelpText('g8_c4_w6_p2_b3 | W3: Decomposer importance')
    .setPoints(4)
    .setChoices([
      form.createChoice('Nothing - other organisms would take over decomposition', false),
      form.createChoice('Dead material would accumulate, nutrients wouldn\'t return to soil, and plant growth would eventually stop', true),
      form.createChoice('The ecosystem would improve because dead material is harmful', false),
      form.createChoice('Only insects would be affected', false)
    ])
    .setRequired(true);

  // B4 (5 pts)
  form.addParagraphTextItem()
    .setTitle('B4: Trace a carbon atom through a complete cycle: starting in atmospheric CO2, through a plant, an herbivore, a carnivore, decomposition, and back to the atmosphere. Name each process at each step.')
    .setHelpText('g8_c4_w6_p2_b4 | W3: Carbon cycle | 5-6 sentences')
    .setRequired(true);

  // ========== SECTION C: ECOSYSTEM STABILITY (15 pts) ==========
  form.addSectionHeaderItem()
    .setTitle('Section C: Ecosystem Stability')
    .setHelpText('Questions about food web complexity, resilience, and invasive species');

  // C1 (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('C1: What is "functional redundancy" in an ecosystem?')
    .setHelpText('g8_c4_w6_p2_c1 | W4: Stability concepts')
    .setPoints(3)
    .setChoices([
      form.createChoice('When the same species exists in multiple locations', false),
      form.createChoice('When multiple species can perform similar ecological roles, so losing one doesn\'t collapse the system', true),
      form.createChoice('When ecosystems produce more than they need', false),
      form.createChoice('When species duplicate unnecessarily', false)
    ])
    .setRequired(true);

  // C2 (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('C2: When wolves were removed from Yellowstone, elk overgrazed stream banks, causing erosion and affecting river patterns. This is an example of:')
    .setHelpText('g8_c4_w6_p2_c2 | W2: Trophic cascades')
    .setPoints(3)
    .setChoices([
      form.createChoice('A minor ecosystem adjustment', false),
      form.createChoice('A trophic cascade - removing a keystone species causes effects throughout the ecosystem', true),
      form.createChoice('Natural ecosystem variation', false),
      form.createChoice('An invasive species introduction', false)
    ])
    .setRequired(true);

  // C3 (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('C3: An ecosystem crosses a "tipping point" when:')
    .setHelpText('g8_c4_w6_p2_c3 | W4: Tipping points')
    .setPoints(4)
    .setChoices([
      form.createChoice('It temporarily changes then returns to normal', false),
      form.createChoice('Damage exceeds the threshold for natural recovery - it shifts to a different state that cannot recover without intervention', true),
      form.createChoice('An invasive species enters the ecosystem', false),
      form.createChoice('Any disturbance affects the ecosystem', false)
    ])
    .setRequired(true);

  // C4 (5 pts)
  form.addParagraphTextItem()
    .setTitle('C4: Explain why a coral reef with 500 species is more likely to survive a bleaching event than a reef with 50 species, even if both have the same types of organisms (producers, herbivores, predators, decomposers).')
    .setHelpText('g8_c4_w6_p2_c4 | W4: Complexity & resilience | 4-5 sentences')
    .setRequired(true);

  // ========== SECTION D: ECOSYSTEM SERVICES (15 pts) ==========
  form.addSectionHeaderItem()
    .setTitle('Section D: Ecosystem Services')
    .setHelpText('Questions about the value and types of ecosystem services');

  // D1 (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('D1: Pollination by bees is worth $235 billion per year globally, yet bees don\'t charge for their services. This means pollination:')
    .setHelpText('g8_c4_w6_p2_d1 | W5: Ecosystem service value')
    .setPoints(3)
    .setChoices([
      form.createChoice('Has no economic value since it\'s free', false),
      form.createChoice('Has enormous value equal to replacement cost, even though we don\'t pay for it directly', true),
      form.createChoice('Should be replaced with technology since it\'s unreliable', false),
      form.createChoice('Only benefits wild plants, not human food', false)
    ])
    .setRequired(true);

  // D2 (3 pts)
  form.addMultipleChoiceItem()
    .setTitle('D2: Which type of ecosystem service is "nutrient cycling by decomposers"?')
    .setHelpText('g8_c4_w6_p2_d2 | W5: Service types')
    .setPoints(3)
    .setChoices([
      form.createChoice('Provisioning - it provides nutrients as a product', false),
      form.createChoice('Regulating - it controls ecosystem processes', false),
      form.createChoice('Supporting - it\'s necessary for all other services to function', true),
      form.createChoice('Cultural - it has educational value', false)
    ])
    .setRequired(true);

  // D3 (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('D3: Why is a wetland worth $15 million/year in services even though it produces no sellable products?')
    .setHelpText('g8_c4_w6_p2_d3 | W5: Service value')
    .setPoints(4)
    .setChoices([
      form.createChoice('The estimate is incorrect - wetlands have no value', false),
      form.createChoice('It provides water filtration and flood control that would cost $15M+ to replace with technology', true),
      form.createChoice('People would pay $15M/year to visit it', false),
      form.createChoice('Wetlands produce hidden products worth $15M', false)
    ])
    .setRequired(true);

  // D4 (5 pts)
  form.addParagraphTextItem()
    .setTitle('D4: A developer proposes draining a wetland to build homes. Using the concept of ecosystem services, write a 3-point argument for why this might cost the community more than it saves. Include specific examples of services that would be lost.')
    .setHelpText('g8_c4_w6_p2_d4 | W5: Service analysis | 5-6 sentences')
    .setRequired(true);

  console.log(`Created Part 2 form: ${form.getId()}`);
  return form;
}

// ============================================================================
// PART 3: MISCONCEPTION CHECK (20 pts, 20 min)
// ============================================================================

/**
 * Creates Part 3 - Misconception Check
 * Targets key misconceptions from the cycle
 */
function createG8C4W6Part3() {
  const form = FormApp.create('G8.C4.W6: Part 3 - Misconception Check');
  const config = G8_C4_W6_CONFIG;

  form.setDescription(
    'PART 3: MISCONCEPTION CHECK\n\n' +
    'Time: 20 minutes | Points: 20\n\n' +
    'This section checks for common misconceptions about ecosystems. ' +
    'Read each statement and determine whether it is TRUE or FALSE, then explain why.'
  );
  form.setIsQuiz(true);
  form.setShuffleQuestions(false);

  // M1: Energy recycling misconception (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('M1: "Energy is recycled in ecosystems just like matter is recycled."')
    .setHelpText('g8_c4_w6_p3_m1 | Misconception: energy-recycled')
    .setPoints(4)
    .setChoices([
      form.createChoice('TRUE - Both energy and matter cycle continuously', false),
      form.createChoice('FALSE - Energy flows through and is lost as heat; only matter cycles', true),
      form.createChoice('TRUE - Decomposers recycle energy back to producers', false),
      form.createChoice('FALSE - Neither energy nor matter can be recycled', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! This is a key distinction: Matter cycles (carbon, nitrogen, water atoms are reused), but energy flows through and exits as heat. Ecosystems need constant energy input from the sun because energy cannot be recycled.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Energy and matter behave differently! Matter cycles - the same carbon atoms move from air to plants to animals to decomposers and back. Energy flows THROUGH - it enters as sunlight, is lost as heat at each trophic level, and cannot be recycled.')
      .build())
    .setRequired(true);

  // M2: Pyramid stability misconception (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('M2: "Energy pyramids are always stable and maintain the same shape over time."')
    .setHelpText('g8_c4_w6_p3_m2 | Misconception: pyramid-stability')
    .setPoints(4)
    .setChoices([
      form.createChoice('TRUE - The 10% rule guarantees stable pyramids', false),
      form.createChoice('FALSE - Pyramids can be disrupted by invasive species, disease, climate change, or human activity', true),
      form.createChoice('TRUE - Ecosystems automatically maintain pyramid stability', false),
      form.createChoice('FALSE - Pyramids don\'t actually exist in nature', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! While energy pyramids describe typical energy flow, they can be severely disrupted. Invasive species can eliminate trophic levels, disease can crash populations, and human activity can remove keystone species. Stability is not guaranteed.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Energy pyramids show typical patterns but are not automatically stable. When wolves were removed from Yellowstone, the pyramid collapsed at higher levels. Invasive cane toads killed predators in Australia. Pyramids require intact food webs to function.')
      .build())
    .setRequired(true);

  // M3: Matter disappearing misconception (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('M3: "When organisms decompose, their matter disappears from the ecosystem."')
    .setHelpText('g8_c4_w6_p3_m3 | Misconception: matter-disappears')
    .setPoints(4)
    .setChoices([
      form.createChoice('TRUE - Decomposition destroys matter', false),
      form.createChoice('FALSE - Decomposition transforms matter into nutrients that are reused by other organisms', true),
      form.createChoice('TRUE - Only gases escape during decomposition', false),
      form.createChoice('FALSE - Matter doesn\'t decompose, it stays the same forever', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! Matter cannot be created or destroyed (conservation of mass). Decomposition transforms complex molecules into simpler ones (CO2, nutrients, water) that cycle back into the ecosystem. The same atoms that were in a dinosaur could be in you today!')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Remember conservation of mass - matter is never destroyed. Decomposition breaks complex molecules into simpler ones (CO2, nutrients) that return to air, soil, and water. These are then reused by producers to build new organic matter.')
      .build())
    .setRequired(true);

  // M4: Free services misconception (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('M4: "Since ecosystem services like pollination are free, they have no real economic value."')
    .setHelpText('g8_c4_w6_p3_m4 | Misconception: ecosystem-services-free')
    .setPoints(4)
    .setChoices([
      form.createChoice('TRUE - If something is free, it has zero economic value', false),
      form.createChoice('FALSE - "Free" services have enormous value equal to their replacement cost', true),
      form.createChoice('TRUE - Only services we pay for have economic value', false),
      form.createChoice('FALSE - All ecosystem services cost money', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! Free ≠ valueless. Bee pollination is "free" but worth $235 billion globally because that\'s what it would cost to replace (actually impossible at scale). NYC\'s watershed provides "free" water filtration worth $10 billion. The value equals replacement cost.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Consider robot bees: replacing natural pollination would cost $40+ trillion and still wouldn\'t work at scale. "Free" means we don\'t pay directly, not that the service lacks value. Value = what it would cost to replace.')
      .build())
    .setRequired(true);

  // M5: Technology replacement misconception (4 pts)
  form.addMultipleChoiceItem()
    .setTitle('M5: "Technology can easily replace any ecosystem service if we invest enough money."')
    .setHelpText('g8_c4_w6_p3_m5 | Misconception: technology-can-replace-nature')
    .setPoints(4)
    .setChoices([
      form.createChoice('TRUE - Technology can solve any problem with enough funding', false),
      form.createChoice('FALSE - Natural systems operate at scales, efficiencies, and interconnections that technology cannot match', true),
      form.createChoice('TRUE - We already have technology to replace all ecosystem services', false),
      form.createChoice('FALSE - Technology is completely useless for environmental issues', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! Nature\'s systems evolved over millions of years to incredible efficiency. Robot bees would cost $40+ trillion and work at 30% efficiency. Direct air capture costs $600/ton vs. free forest carbon storage. The scale, efficiency, and interconnection of natural systems far exceeds our technology.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Consider the numbers: 400+ billion robot bees at $100 each, working 10 minutes per charge at 30% efficiency, vs. bees that work all day for free. Natural systems evolved for millions of years - our technology cannot match their scale, efficiency, or interconnections.')
      .build())
    .setRequired(true);

  console.log(`Created Part 3 form: ${form.getId()}`);
  return form;
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Gets the configuration object for this week.
 */
function getG8C4W6Config() {
  return G8_C4_W6_CONFIG;
}

/**
 * Validates that all forms have correct point totals.
 */
function validateG8C4W6Points() {
  const config = G8_C4_W6_CONFIG;
  console.log('Validating G8 C4 W6 point totals...');
  console.log(`Expected: Part1=${config.points.part1}, Part2=${config.points.part2}, Part3=${config.points.part3}`);
  console.log(`Total should equal: ${config.points.total}`);
  return true;
}

/**
 * Creates a summary of misconceptions targeted in this assessment.
 */
function getG8C4W6MisconceptionSummary() {
  const config = G8_C4_W6_CONFIG;
  console.log('=== G8 C4 W6 Assessment Misconception Targets ===');
  config.targetedMisconceptions.forEach(m => {
    console.log(`  - ${m}`);
  });
  return config.targetedMisconceptions;
}
