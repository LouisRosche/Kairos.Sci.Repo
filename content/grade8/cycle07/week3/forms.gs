/**
 * ═══════════════════════════════════════════════════════════════════════════
 * GRADE 8 CYCLE 7 WEEK 3: SYNTHESIS & ASSESSMENT
 * Chemical Reactions & Conservation - Cumulative Assessment
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * NGSS Standards: MS-PS1-2 (Primary), MS-PS2-3, MS-PS4-2 (Spiral)
 * Duration: 2 days (~75 min each)
 * Total Points: 100
 *
 * Assessment Structure:
 * - Part 1: Synthesis (20 pts) - Connect W1 evidence + W2 reaction types
 * - Part 2: Cumulative Assessment (60 pts) - All cycle content
 * - Part 3: Misconception Check (20 pts) - Target persistent errors
 *
 * ═══════════════════════════════════════════════════════════════════════════
 */

// ═══════════════════════════════════════════════════════════════════════════
// MAIN ORCHESTRATION FUNCTION
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Creates all Week 3 Assessment forms
 * Run this function to generate all forms for the assessment week
 */
function createAllG8C7W3Forms() {
  const forms = [];

  try {
    Logger.log('Creating G8 C7 W3 Assessment Forms...');

    forms.push(createG8C7W3Part1Synthesis_());
    Logger.log('✓ Part 1: Synthesis created');

    forms.push(createG8C7W3Part2CumulativeAssessment_());
    Logger.log('✓ Part 2: Cumulative Assessment created');

    forms.push(createG8C7W3Part3MisconceptionCheck_());
    Logger.log('✓ Part 3: Misconception Check created');

    Logger.log('═══════════════════════════════════════════════════');
    Logger.log('All G8 C7 W3 forms created successfully!');
    Logger.log('Total forms: ' + forms.length);
    Logger.log('Total points: 100 (20 + 60 + 20)');
    Logger.log('═══════════════════════════════════════════════════');

    return forms;

  } catch (error) {
    Logger.log('ERROR creating forms: ' + error.message);
    throw error;
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// PART 1: SYNTHESIS (20 pts)
// Focus: Connect W1 reaction evidence + W2 reaction types & conservation
// ═══════════════════════════════════════════════════════════════════════════

function createG8C7W3Part1Synthesis_() {
  const form = FormApp.create('G8.C7.W3: Part 1 - Synthesis');
  form.setDescription(
    'Synthesis Assessment: Connecting Evidence, Types, and Conservation\n\n' +
    'This assessment tests your ability to connect concepts from Weeks 1 and 2.\n' +
    'Total Points: 20\n' +
    'Time: ~15 minutes\n\n' +
    'Show your understanding of how chemical reactions work at the molecular level.'
  );
  form.setIsQuiz(true);
  form.setShuffleQuestions(false);

  // Question 1: Evidence + Reaction Type Connection (4 pts)
  const q1 = form.addMultipleChoiceItem();
  q1.setTitle('Q1. When sodium chloride solution is mixed with silver nitrate solution, a white solid instantly appears. What type of reaction is this, and what evidence proves it?');
  q1.setHelpText('Question ID: g8_c7_w3_syn_q1 | Points: 4 | SEP-6: Constructing Explanations');
  q1.setChoices([
    q1.createChoice('Synthesis reaction; evidence is color change', false),
    q1.createChoice('Double replacement reaction; evidence is precipitate formation', true),
    q1.createChoice('Decomposition reaction; evidence is gas production', false),
    q1.createChoice('Single replacement reaction; evidence is temperature change', false)
  ]);
  q1.setPoints(4);
  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! This is a double replacement (double displacement) reaction: NaCl + AgNO₃ → NaNO₃ + AgCl. The precipitate (solid) formation is the evidence - silver chloride is insoluble and appears as a white solid when the ions combine.')
      .build()
  );
  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('In this reaction, two compounds swap partners: Na⁺ leaves Cl⁻ and pairs with NO₃⁻, while Ag⁺ leaves NO₃⁻ and pairs with Cl⁻. This is double replacement. The white solid appearing is the precipitate AgCl - one of the five types of evidence for chemical reactions.')
      .build()
  );

  // Question 2: Mass Conservation with Reaction Type (4 pts)
  const q2 = form.addMultipleChoiceItem();
  q2.setTitle('Q2. In the synthesis reaction 2H₂ + O₂ → 2H₂O, 4 grams of hydrogen reacts with 32 grams of oxygen. What is the total mass of water produced?');
  q2.setHelpText('Question ID: g8_c7_w3_syn_q2 | Points: 4 | DCI: PS1.B');
  q2.setChoices([
    q2.createChoice('4 grams', false),
    q2.createChoice('32 grams', false),
    q2.createChoice('36 grams', true),
    q2.createChoice('28 grams', false)
  ]);
  q2.setPoints(4);
  q2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! The Law of Conservation of Mass states that mass cannot be created or destroyed. The total mass of reactants (4g + 32g = 36g) must equal the total mass of products (36g of water). This applies to ALL reaction types!')
      .build()
  );
  q2.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Remember the Law of Conservation of Mass: atoms are not created or destroyed, just rearranged. The total mass before the reaction (4g hydrogen + 32g oxygen = 36g) must equal the total mass after the reaction. So water produced = 36g.')
      .build()
  );

  // Question 3: Balancing + Reaction Type Identification (4 pts)
  const q3 = form.addMultipleChoiceItem();
  q3.setTitle('Q3. Look at this unbalanced equation: Fe + O₂ → Fe₂O₃. What are the correct coefficients to balance it, and what reaction type is this?');
  q3.setHelpText('Question ID: g8_c7_w3_syn_q3 | Points: 4 | CCC: Energy and Matter');
  q3.setChoices([
    q3.createChoice('2Fe + 3O₂ → 2Fe₂O₃; Synthesis reaction', false),
    q3.createChoice('4Fe + 3O₂ → 2Fe₂O₃; Synthesis reaction', true),
    q3.createChoice('4Fe + 3O₂ → 2Fe₂O₃; Combustion reaction', false),
    q3.createChoice('2Fe + O₂ → Fe₂O₃; Decomposition reaction', false)
  ]);
  q3.setPoints(4);
  q3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Balancing: We need 4 Fe atoms (4Fe on left, 2×2=4 in 2Fe₂O₃). We need 6 O atoms (3O₂ on left, 2×3=6 in 2Fe₂O₃). This is synthesis (A + B → AB) because two elements combine to form one compound.')
      .build()
  );
  q3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('To balance: Fe₂O₃ has 2 Fe and 3 O per formula unit. With 2Fe₂O₃, we need 4 Fe atoms and 6 O atoms. So 4Fe + 3O₂ → 2Fe₂O₃. Pattern A + B → AB (elements combining) = synthesis reaction.')
      .build()
  );

  // Question 4: Evidence Connecting to Conservation (4 pts)
  const q4 = form.addMultipleChoiceItem();
  q4.setTitle('Q4. A student burns 5 grams of magnesium ribbon in air. The white powder produced weighs 8.3 grams. Did this reaction violate conservation of mass? Explain.');
  q4.setHelpText('Question ID: g8_c7_w3_syn_q4 | Points: 4 | SEP-7: Engaging in Argument');
  q4.setChoices([
    q4.createChoice('Yes - mass was created, which is impossible', false),
    q4.createChoice('No - the extra 3.3 grams came from oxygen in the air combining with the magnesium', true),
    q4.createChoice('Yes - burning destroys mass, so the product should weigh less', false),
    q4.createChoice('No - the mass difference is due to measurement error', false)
  ]);
  q4.setPoints(4);
  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Excellent! The synthesis reaction 2Mg + O₂ → 2MgO adds oxygen from the air. The "extra" mass (3.3g) is oxygen that combined with the magnesium. Total mass is conserved: 5g Mg + 3.3g O₂ = 8.3g MgO. This is why sealed containers are important in mass experiments!')
      .build()
  );
  q4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Mass seems to increase because the magnesium combined with oxygen from the air (which we didn\'t weigh at the start). The reaction is: 2Mg + O₂ → 2MgO. If we measured ALL reactants (including air), mass would be perfectly conserved.')
      .build()
  );

  // Question 5: Constructed Response - System Connection (4 pts)
  const q5 = form.addParagraphTextItem();
  q5.setTitle('Q5. A sealed container holds iron filings and copper sulfate solution. Before mixing, the total mass is 150 grams. After mixing (a single replacement reaction occurs), what will the total mass be? Explain your reasoning using the concept of conservation of mass AND identify what evidence you would observe.');
  q5.setHelpText(
    'Question ID: g8_c7_w3_syn_q5 | Points: 4 | SEP-6: Constructing Explanations\n\n' +
    'Rubric:\n' +
    '4 pts: States mass = 150g, explains conservation of mass applies to sealed systems, identifies correct evidence (color change from blue to colorless as copper plates out)\n' +
    '3 pts: Correct mass and conservation explanation but incomplete evidence description\n' +
    '2 pts: Correct mass but lacks clear explanation\n' +
    '1 pt: Mentions conservation but application incomplete\n' +
    '0 pts: No attempt or completely incorrect'
  );
  // Paragraph text items cannot have points set directly - graded manually

  return form;
}

// ═══════════════════════════════════════════════════════════════════════════
// PART 2: CUMULATIVE ASSESSMENT (60 pts)
// Sections: Reaction Evidence (15), Mass Conservation (15), Reaction Types (15), Data Analysis (15)
// ═══════════════════════════════════════════════════════════════════════════

function createG8C7W3Part2CumulativeAssessment_() {
  const form = FormApp.create('G8.C7.W3: Part 2 - Cumulative Assessment');
  form.setDescription(
    'Cumulative Assessment: Chemical Reactions & Conservation\n\n' +
    'This assessment covers all content from Cycle 7.\n' +
    'Total Points: 60\n' +
    'Time: ~40 minutes\n\n' +
    'Sections:\n' +
    '• Section A: Reaction Evidence (15 pts)\n' +
    '• Section B: Mass Conservation (15 pts)\n' +
    '• Section C: Reaction Types (15 pts)\n' +
    '• Section D: Data Analysis (15 pts)'
  );
  form.setIsQuiz(true);
  form.setShuffleQuestions(false);

  // ─────────────────────────────────────────────────────────────────────────
  // SECTION A: REACTION EVIDENCE (15 pts)
  // ─────────────────────────────────────────────────────────────────────────

  form.addSectionHeaderItem()
    .setTitle('Section A: Reaction Evidence')
    .setHelpText('15 points | 4 questions | Focus: Identifying evidence of chemical reactions');

  // A1: Evidence Identification (4 pts)
  const a1 = form.addMultipleChoiceItem();
  a1.setTitle('A1. When baking soda is added to vinegar, bubbles form rapidly. What type of evidence for a chemical reaction is this?');
  a1.setHelpText('Question ID: g8_c7_w3_cum_a1 | Points: 4 | DCI: PS1.B');
  a1.setChoices([
    a1.createChoice('Color change', false),
    a1.createChoice('Precipitate formation', false),
    a1.createChoice('Gas production', true),
    a1.createChoice('Temperature change', false)
  ]);
  a1.setPoints(4);
  a1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! The bubbles are carbon dioxide gas produced by the reaction: NaHCO₃ + CH₃COOH → NaCH₃COO + H₂O + CO₂. Gas production (bubbling, fizzing) is one of the five main types of evidence for chemical reactions.')
      .build()
  );
  a1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Bubbles indicate gas is being produced. The five types of evidence are: color change, precipitate formation, gas production, temperature change, and light emission. Bubbles = gas production.')
      .build()
  );

  // A2: Chemical vs Physical (4 pts)
  const a2 = form.addMultipleChoiceItem();
  a2.setTitle('A2. Which of the following is a CHEMICAL change rather than a physical change?');
  a2.setHelpText('Question ID: g8_c7_w3_cum_a2 | Points: 4 | DCI: PS1.B');
  a2.setChoices([
    a2.createChoice('Ice melting into water', false),
    a2.createChoice('Sugar dissolving in tea', false),
    a2.createChoice('Iron rusting when exposed to air and water', true),
    a2.createChoice('Cutting a piece of paper into smaller pieces', false)
  ]);
  a2.setPoints(4);
  a2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Rusting is a chemical change because new substances form (iron oxide). The iron atoms combine with oxygen atoms to form a completely different substance with different properties. Physical changes (melting, dissolving, cutting) don\'t form new substances.')
      .build()
  );
  a2.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Chemical changes form NEW substances with different properties. Rusting creates iron oxide (Fe₂O₃), which has different color, texture, and properties than iron. Physical changes (melting, dissolving, cutting) keep the same substances - no new molecules form.')
      .build()
  );

  // A3: Evidence Interpretation (4 pts)
  const a3 = form.addMultipleChoiceItem();
  a3.setTitle('A3. A student mixes two colorless solutions and the mixture becomes warm. Which conclusion is BEST supported?');
  a3.setHelpText('Question ID: g8_c7_w3_cum_a3 | Points: 4 | SEP-6');
  a3.setChoices([
    a3.createChoice('An exothermic chemical reaction has occurred', true),
    a3.createChoice('An endothermic chemical reaction has occurred', false),
    a3.createChoice('No chemical reaction has occurred', false),
    a3.createChoice('The solutions were at different starting temperatures', false)
  ]);
  a3.setPoints(4);
  a3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Temperature change is evidence of a chemical reaction. When the mixture gets warmer, energy is being released - this is an exothermic reaction. The chemical bonds being formed release more energy than it took to break the original bonds.')
      .build()
  );
  a3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Temperature change indicates a chemical reaction. Getting warmer = exothermic (energy released). Getting cooler = endothermic (energy absorbed). Since the mixture became warm, energy was released, indicating an exothermic reaction.')
      .build()
  );

  // A4: Molecular-Level Explanation (3 pts)
  const a4 = form.addMultipleChoiceItem();
  a4.setTitle('A4. At the molecular level, what happens during a chemical reaction?');
  a4.setHelpText('Question ID: g8_c7_w3_cum_a4 | Points: 3 | DCI: PS1.B');
  a4.setChoices([
    a4.createChoice('Atoms are created and destroyed', false),
    a4.createChoice('Atoms are rearranged to form new molecules', true),
    a4.createChoice('Molecules simply change size', false),
    a4.createChoice('Atoms disappear and reappear in new locations', false)
  ]);
  a4.setPoints(3);
  a4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Chemical reactions involve breaking bonds in reactant molecules and forming new bonds to create product molecules. The atoms themselves are conserved - the same atoms exist before and after, just arranged differently.')
      .build()
  );
  a4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Atoms are NEVER created or destroyed in chemical reactions. They are rearranged: bonds between atoms break, and atoms form new bonds with different partners. This rearrangement creates new substances with new properties.')
      .build()
  );

  // ─────────────────────────────────────────────────────────────────────────
  // SECTION B: MASS CONSERVATION (15 pts)
  // ─────────────────────────────────────────────────────────────────────────

  form.addSectionHeaderItem()
    .setTitle('Section B: Mass Conservation')
    .setHelpText('15 points | 4 questions | Focus: Conservation of mass in chemical reactions');

  // B1: Basic Conservation (4 pts)
  const b1 = form.addMultipleChoiceItem();
  b1.setTitle('B1. In a sealed container, 10 grams of calcium carbonate decomposes into calcium oxide and carbon dioxide gas. What is the total mass of products?');
  b1.setHelpText('Question ID: g8_c7_w3_cum_b1 | Points: 4 | DCI: PS1.B');
  b1.setChoices([
    b1.createChoice('Less than 10 grams because gas escapes', false),
    b1.createChoice('Exactly 10 grams because mass is conserved', true),
    b1.createChoice('More than 10 grams because two products are formed', false),
    b1.createChoice('Cannot be determined without more information', false)
  ]);
  b1.setPoints(4);
  b1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! In a sealed container, the Law of Conservation of Mass applies perfectly. No matter can enter or leave, so total mass remains 10 grams. The gas stays inside the container.')
      .build()
  );
  b1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Key word: SEALED container. Nothing can enter or leave. The carbon dioxide gas is still inside the container, so total mass = 10 grams. Conservation of mass always applies - we just need to account for all products.')
      .build()
  );

  // B2: Apparent Mass Loss (4 pts)
  const b2 = form.addMultipleChoiceItem();
  b2.setTitle('B2. When wood burns in an open fire, the ash left behind weighs much less than the original wood. Why does this seem to violate conservation of mass?');
  b2.setHelpText('Question ID: g8_c7_w3_cum_b2 | Points: 4 | DCI: PS1.B');
  b2.setChoices([
    b2.createChoice('Mass is actually destroyed during burning', false),
    b2.createChoice('The "missing" mass escaped as gases (CO₂ and H₂O vapor)', true),
    b2.createChoice('Heat energy accounts for the missing mass', false),
    b2.createChoice('Some atoms were converted to energy', false)
  ]);
  b2.setPoints(4);
  b2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! When wood burns, carbon and hydrogen in the wood combine with oxygen to form CO₂ and H₂O vapor, which escape into the air. If we captured all the gases, the total mass of ash + gases would equal the original wood + oxygen used.')
      .build()
  );
  b2.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Mass is never destroyed! When wood burns, most of its mass becomes invisible gases (CO₂ and water vapor) that float away. We only see the non-combustible ash left behind. In a sealed container, all mass would be accounted for.')
      .build()
  );

  // B3: System Analysis (4 pts)
  const b3 = form.addMultipleChoiceItem();
  b3.setTitle('B3. A chemical reaction produces 20 grams of product. If 8 grams of oxygen reacted, how much of the other reactant was used?');
  b3.setHelpText('Question ID: g8_c7_w3_cum_b3 | Points: 4 | DCI: PS1.B');
  b3.setChoices([
    b3.createChoice('8 grams', false),
    b3.createChoice('12 grams', true),
    b3.createChoice('20 grams', false),
    b3.createChoice('28 grams', false)
  ]);
  b3.setPoints(4);
  b3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Conservation of mass: Reactant 1 + Reactant 2 = Products. So: Other reactant + 8g = 20g. Other reactant = 12 grams.')
      .build()
  );
  b3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Use conservation of mass as an equation: mass of all reactants = mass of all products. If products = 20g and one reactant = 8g, then the other reactant = 20g - 8g = 12g.')
      .build()
  );

  // B4: Application (3 pts)
  const b4 = form.addMultipleChoiceItem();
  b4.setTitle('B4. A scientist wants to prove that mass is conserved in a reaction that produces gas. What is the BEST experimental design?');
  b4.setHelpText('Question ID: g8_c7_w3_cum_b4 | Points: 3 | SEP-3');
  b4.setChoices([
    b4.createChoice('Measure the mass of reactants in an open beaker before and after', false),
    b4.createChoice('Conduct the reaction in a sealed flask on a balance', true),
    b4.createChoice('Estimate the mass of gas produced by its volume', false),
    b4.createChoice('Only measure the solid products left behind', false)
  ]);
  b4.setPoints(3);
  b4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! A sealed flask prevents gas from escaping, so all products remain in the system. Placing it on a balance shows the mass remains constant throughout the reaction - perfect evidence for conservation of mass.')
      .build()
  );
  b4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('To demonstrate conservation with gas-producing reactions, you need a sealed container so gas can\'t escape. An open beaker would show apparent mass loss as gas leaves. A sealed flask on a balance captures everything.')
      .build()
  );

  // ─────────────────────────────────────────────────────────────────────────
  // SECTION C: REACTION TYPES (15 pts)
  // ─────────────────────────────────────────────────────────────────────────

  form.addSectionHeaderItem()
    .setTitle('Section C: Reaction Types')
    .setHelpText('15 points | 4 questions | Focus: Classifying and predicting reaction types');

  // C1: Synthesis Identification (4 pts)
  const c1 = form.addMultipleChoiceItem();
  c1.setTitle('C1. Which equation represents a synthesis (combination) reaction?');
  c1.setHelpText('Question ID: g8_c7_w3_cum_c1 | Points: 4 | DCI: PS1.B');
  c1.setChoices([
    c1.createChoice('2H₂O → 2H₂ + O₂', false),
    c1.createChoice('Zn + 2HCl → ZnCl₂ + H₂', false),
    c1.createChoice('N₂ + 3H₂ → 2NH₃', true),
    c1.createChoice('NaCl + AgNO₃ → NaNO₃ + AgCl', false)
  ]);
  c1.setPoints(4);
  c1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Synthesis reactions have the pattern A + B → AB (two or more reactants combine into one product). N₂ + 3H₂ → 2NH₃ shows nitrogen and hydrogen combining to form ammonia.')
      .build()
  );
  c1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Synthesis pattern: A + B → AB (combining to form one product). Look for reactions where multiple reactants form a single product. N₂ + 3H₂ → 2NH₃ combines two elements into one compound - synthesis!')
      .build()
  );

  // C2: Decomposition Identification (4 pts)
  const c2 = form.addMultipleChoiceItem();
  c2.setTitle('C2. When hydrogen peroxide (H₂O₂) breaks down into water and oxygen gas, what type of reaction is this?');
  c2.setHelpText('Question ID: g8_c7_w3_cum_c2 | Points: 4 | DCI: PS1.B');
  c2.setChoices([
    c2.createChoice('Synthesis', false),
    c2.createChoice('Decomposition', true),
    c2.createChoice('Single replacement', false),
    c2.createChoice('Combustion', false)
  ]);
  c2.setPoints(4);
  c2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Decomposition reactions have the pattern AB → A + B (one reactant breaks into multiple products). 2H₂O₂ → 2H₂O + O₂ shows one compound breaking down into simpler substances.')
      .build()
  );
  c2.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('When ONE reactant breaks into TWO or more products, it\'s decomposition (AB → A + B). Hydrogen peroxide (one compound) breaks into water and oxygen (two products) = decomposition.')
      .build()
  );

  // C3: Single Replacement (4 pts)
  const c3 = form.addMultipleChoiceItem();
  c3.setTitle('C3. In the reaction Zn + CuSO₄ → ZnSO₄ + Cu, what happens at the atomic level?');
  c3.setHelpText('Question ID: g8_c7_w3_cum_c3 | Points: 4 | DCI: PS1.B');
  c3.setChoices([
    c3.createChoice('Zinc and copper atoms trade places with sulfate', false),
    c3.createChoice('Zinc replaces copper in the compound, and copper is released as a metal', true),
    c3.createChoice('The compounds break down into their elements', false),
    c3.createChoice('Zinc and copper combine to form a new metal', false)
  ]);
  c3.setPoints(4);
  c3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! In single replacement, a more reactive element (Zn) replaces a less reactive element (Cu) in a compound. Zinc "kicks out" copper and takes its place bonded to sulfate. The copper is released as pure metal.')
      .build()
  );
  c3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Single replacement (A + BC → AC + B): One element replaces another in a compound. Zinc is more reactive than copper, so it displaces copper from the sulfate compound. Copper metal deposits out as zinc takes its place.')
      .build()
  );

  // C4: Combustion (3 pts)
  const c4 = form.addMultipleChoiceItem();
  c4.setTitle('C4. What are the products of a complete combustion reaction of a hydrocarbon (like methane, CH₄)?');
  c4.setHelpText('Question ID: g8_c7_w3_cum_c4 | Points: 3 | DCI: PS1.B');
  c4.setChoices([
    c4.createChoice('Carbon and hydrogen', false),
    c4.createChoice('Carbon monoxide and water', false),
    c4.createChoice('Carbon dioxide and water', true),
    c4.createChoice('Oxygen and heat', false)
  ]);
  c4.setPoints(3);
  c4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Complete combustion of hydrocarbons always produces CO₂ and H₂O. CH₄ + 2O₂ → CO₂ + 2H₂O. The carbon becomes carbon dioxide, the hydrogen becomes water vapor.')
      .build()
  );
  c4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Combustion = fuel + O₂ → products. For hydrocarbons (compounds with C and H), complete combustion always produces carbon dioxide (CO₂) and water (H₂O). These are oxidized forms of carbon and hydrogen.')
      .build()
  );

  // ─────────────────────────────────────────────────────────────────────────
  // SECTION D: DATA ANALYSIS (15 pts)
  // ─────────────────────────────────────────────────────────────────────────

  form.addSectionHeaderItem()
    .setTitle('Section D: Data Analysis')
    .setHelpText('15 points | 3 questions | Focus: Balancing equations and analyzing reaction data');

  // D1: Balancing Equations (5 pts)
  const d1 = form.addMultipleChoiceItem();
  d1.setTitle('D1. Balance this equation: __Al + __O₂ → __Al₂O₃. What are the correct coefficients (in order)?');
  d1.setHelpText('Question ID: g8_c7_w3_cum_d1 | Points: 5 | DCI: PS1.B');
  d1.setChoices([
    d1.createChoice('2, 3, 1', false),
    d1.createChoice('4, 3, 2', true),
    d1.createChoice('2, 1, 1', false),
    d1.createChoice('4, 2, 3', false)
  ]);
  d1.setPoints(5);
  d1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! 4Al + 3O₂ → 2Al₂O₃. Check: Left side has 4 Al and 6 O atoms. Right side has 4 Al (2×2) and 6 O atoms (2×3). Balanced!')
      .build()
  );
  d1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Balance step by step: Al₂O₃ has 2 Al and 3 O per formula. With 2Al₂O₃, you need 4 Al and 6 O. So: 4Al + 3O₂ → 2Al₂O₃. Verify: 4 Al on each side, 6 O on each side. ✓')
      .build()
  );

  // D2: Data Interpretation (5 pts)
  const d2 = form.addParagraphTextItem();
  d2.setTitle('D2. A student conducts three trials of the same reaction in sealed containers:\n\nTrial 1: Reactants = 25.0g, Products = 25.0g\nTrial 2: Reactants = 25.0g, Products = 24.8g\nTrial 3: Reactants = 25.0g, Products = 25.1g\n\nAnalyze this data. Does it support conservation of mass? What might explain the small differences in Trials 2 and 3?');
  d2.setHelpText(
    'Question ID: g8_c7_w3_cum_d2 | Points: 5 | SEP-4: Analyzing Data\n\n' +
    'Rubric:\n' +
    '5 pts: States data supports conservation (within measurement error), explains small differences as measurement uncertainty, notes Trial 1 shows perfect conservation\n' +
    '4 pts: Correctly interprets data but explanation of variation incomplete\n' +
    '3 pts: States conservation is supported but lacks analysis of variations\n' +
    '2 pts: Basic interpretation with limited analysis\n' +
    '1 pt: Attempts analysis but conclusions unclear\n' +
    '0 pts: No attempt or incorrect conclusion'
  );

  // D3: Spiral Integration - Energy + Reactions (5 pts)
  const d3 = form.addMultipleChoiceItem();
  d3.setTitle('D3. In an exothermic reaction, energy is released to the surroundings. How does this relate to conservation of mass? Select the BEST answer.');
  d3.setHelpText('Question ID: g8_c7_w3_cum_d3 | Points: 5 | Spiral: Cycle 6 - Energy');
  d3.setChoices([
    d3.createChoice('Energy release means some mass is converted to energy', false),
    d3.createChoice('Energy and mass are separate; mass is always conserved regardless of energy changes', true),
    d3.createChoice('Exothermic reactions violate conservation of mass', false),
    d3.createChoice('The released energy adds to the mass of products', false)
  ]);
  d3.setPoints(5);
  d3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Excellent! In ordinary chemical reactions, mass and energy are independent. Energy can be released or absorbed without affecting mass conservation. Mass is always conserved - atoms are not converted to energy in chemical reactions (only in nuclear reactions at E=mc² levels).')
      .build()
  );
  d3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('In chemical reactions, mass and energy are separate quantities. Energy changes (exothermic/endothermic) don\'t affect mass conservation. All atoms that enter a reaction exit it - just rearranged. Energy comes from bond changes, not from destroying atoms.')
      .build()
  );

  return form;
}

// ═══════════════════════════════════════════════════════════════════════════
// PART 3: MISCONCEPTION CHECK (20 pts)
// Focus: Target persistent misconceptions from Cycle 7
// ═══════════════════════════════════════════════════════════════════════════

function createG8C7W3Part3MisconceptionCheck_() {
  const form = FormApp.create('G8.C7.W3: Part 3 - Misconception Check');
  form.setDescription(
    'Misconception Check Assessment\n\n' +
    'This section targets common misconceptions about chemical reactions and conservation.\n' +
    'Total Points: 20\n' +
    'Time: ~20 minutes\n\n' +
    'Read each question carefully - some contain common errors in thinking!'
  );
  form.setIsQuiz(true);
  form.setShuffleQuestions(false);

  // MC1: "Mass is lost in reactions" misconception (4 pts)
  const mc1 = form.addMultipleChoiceItem();
  mc1.setTitle('MC1. When a candle burns, it gets smaller and eventually disappears. A student concludes: "The candle\'s mass was destroyed by the flame." Is this conclusion correct?');
  mc1.setHelpText('Question ID: g8_c7_w3_misc_q1 | Points: 4 | Target: "Mass is destroyed in reactions"');
  mc1.setChoices([
    mc1.createChoice('Yes - the flame destroyed the mass by converting it to heat', false),
    mc1.createChoice('Yes - combustion is a special reaction where mass can be destroyed', false),
    mc1.createChoice('No - the mass became CO₂ and H₂O gases that floated away', true),
    mc1.createChoice('No - the mass is still in the wick', false)
  ]);
  mc1.setPoints(4);
  mc1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Mass is NEVER destroyed. The candle wax (hydrocarbon) reacted with oxygen to form CO₂ and H₂O vapor - invisible gases that floated away. If you burned a candle in a sealed container and captured all gases, the total mass would remain constant.')
      .build()
  );
  mc1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Common misconception! Mass seems to disappear because the products (CO₂ and water vapor) are invisible gases that escape into the air. The atoms from the candle wax are still there - just combined with oxygen and floating away as gas molecules.')
      .build()
  );

  // MC2: "Chemical = physical change" misconception (4 pts)
  const mc2 = form.addMultipleChoiceItem();
  mc2.setTitle('MC2. A student says: "When salt dissolves in water, the salt reacts with water to form a new substance - that\'s why it disappears." What\'s wrong with this statement?');
  mc2.setHelpText('Question ID: g8_c7_w3_misc_q2 | Points: 4 | Target: "Dissolving is a chemical change"');
  mc2.setChoices([
    mc2.createChoice('Nothing is wrong - dissolving is a chemical reaction', false),
    mc2.createChoice('Dissolving is physical, not chemical - NaCl molecules are still NaCl, just separated and surrounded by water', true),
    mc2.createChoice('Salt doesn\'t actually dissolve, it just becomes invisible', false),
    mc2.createChoice('The student is right, but the new substance is invisible', false)
  ]);
  mc2.setPoints(4);
  mc2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Dissolving is a PHYSICAL change. Salt (NaCl) separates into Na⁺ and Cl⁻ ions, but no new chemical bonds form with water. Proof: evaporate the water and the salt reappears unchanged. In chemical changes, you can\'t easily recover the original substances.')
      .build()
  );
  mc2.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Key distinction: In dissolving (physical change), molecules separate but don\'t change identity. In chemical reactions, molecules break apart and atoms form NEW bonds to create different substances. Salt dissolving can be reversed by evaporation - proving it\'s physical.')
      .build()
  );

  // MC3: "Atoms are destroyed" misconception (4 pts)
  const mc3 = form.addMultipleChoiceItem();
  mc3.setTitle('MC3. In the reaction 2H₂ + O₂ → 2H₂O, what happens to the original H₂ and O₂ molecules?');
  mc3.setHelpText('Question ID: g8_c7_w3_misc_q3 | Points: 4 | Target: "Atoms are destroyed in reactions"');
  mc3.setChoices([
    mc3.createChoice('They are destroyed and water molecules are created from nothing', false),
    mc3.createChoice('They merge to become water with no atoms left over', false),
    mc3.createChoice('The bonds between atoms break, and atoms rearrange to form water molecules', true),
    mc3.createChoice('They shrink until they become water molecules', false)
  ]);
  mc3.setPoints(4);
  mc3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! The H-H bonds and O=O bonds break, releasing individual atoms. These atoms then form new O-H bonds to create water molecules. The atoms themselves are unchanged - just rearranged into a new molecular structure.')
      .build()
  );
  mc3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Atoms are NEVER created or destroyed in chemical reactions. What changes is how atoms are bonded together. Bonds break in reactants, atoms rearrange, and new bonds form in products. Count atoms: 4 H and 2 O before = 4 H and 2 O after.')
      .build()
  );

  // MC4: "Reactions always need heat" misconception (4 pts)
  const mc4 = form.addMultipleChoiceItem();
  mc4.setTitle('MC4. TRUE or FALSE: All chemical reactions need heat to start.');
  mc4.setHelpText('Question ID: g8_c7_w3_misc_q4 | Points: 4 | Target: "Reactions require heat input"');
  mc4.setChoices([
    mc4.createChoice('TRUE - molecules need energy to react', false),
    mc4.createChoice('FALSE - many reactions occur spontaneously at room temperature or below', true)
  ]);
  mc4.setPoints(4);
  mc4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Many reactions occur without added heat: iron rusting (room temp), acids neutralizing bases, glow sticks (room temp), photosynthesis (no heat needed). Some reactions even occur below freezing. While all reactions need activation energy, this often comes from molecular motion at room temperature.')
      .build()
  );
  mc4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('This is a common misconception! Many reactions happen at room temperature or even cold temperatures: rusting, acid-base neutralization, bioluminescence, and many more. Not all reactions need external heat to start.')
      .build()
  );

  // MC5: Constructed Response - Diagram + Explanation (4 pts)
  const mc5 = form.addParagraphTextItem();
  mc5.setTitle('MC5. Your friend says: "If you burn 10 grams of magnesium, you should get 10 grams of magnesium oxide because mass is conserved." Explain why your friend\'s prediction is incorrect, even though conservation of mass IS true.');
  mc5.setHelpText(
    'Question ID: g8_c7_w3_misc_q5 | Points: 4 | SEP-6 + SEP-7\n\n' +
    'Rubric:\n' +
    '4 pts: Correctly explains that oxygen from air combines with Mg, so product mass > reactant mass when only measuring Mg; conservation applies to ALL reactants (Mg + O₂)\n' +
    '3 pts: Identifies oxygen involvement but explanation incomplete\n' +
    '2 pts: States answer will be different but reasoning unclear\n' +
    '1 pt: Partially addresses the misconception\n' +
    '0 pts: No attempt or agrees with the misconception'
  );

  // Metacognition Question (0 pts - diagnostic only)
  const meta = form.addScaleItem();
  meta.setTitle('After completing this assessment, how confident are you in your understanding of chemical reactions and conservation?');
  meta.setHelpText('Question ID: g8_c7_w3_misc_meta | Points: 0 | MTSS Metacognition Check');
  meta.setBounds(1, 5);
  meta.setLabels('Not confident at all', 'Very confident');
  // Note: No setPoints() - ungraded diagnostic item

  // Final reflection (0 pts - for teacher review)
  const reflect = form.addParagraphTextItem();
  reflect.setTitle('What topic from this cycle would you like to review more before the next unit? (Optional)');
  reflect.setHelpText('Question ID: g8_c7_w3_misc_reflect | Points: 0 | For teacher planning');
  reflect.setRequired(false);
  // No setPoints for optional reflection

  return form;
}

// ═══════════════════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Test function to validate form creation
 */
function testG8C7W3Forms_() {
  Logger.log('Testing G8 C7 W3 form creation...');

  // Create forms in test mode
  const forms = createAllG8C7W3Forms();

  // Log results
  forms.forEach((form, index) => {
    Logger.log('Form ' + (index + 1) + ': ' + form.getTitle());
    Logger.log('  URL: ' + form.getEditUrl());
  });

  Logger.log('Test complete - check forms in Google Drive');
}

/**
 * Get form URLs for embedding in student page
 */
function getG8C7W3FormUrls_() {
  // This would be populated after forms are created
  return {
    part1Synthesis: 'FORM_URL_HERE',
    part2Cumulative: 'FORM_URL_HERE',
    part3Misconception: 'FORM_URL_HERE'
  };
}
