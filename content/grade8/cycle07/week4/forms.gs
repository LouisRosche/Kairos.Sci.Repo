/**
 * G8.C7.W4 Forms - Synthesis & Assessment: Chemical Reactions & Conservation
 *
 * ASSESSMENT WEEK - 4-week cycle format
 * Topic: Chemical Reactions & Conservation
 * Dates: May 18-22, 2026
 *
 * Assessment Structure (100 pts total):
 * - Part 1: Synthesis Review (20 pts, 15 min)
 * - Part 2: Cumulative Assessment (60 pts, 40 min)
 * - Part 3: Misconception Check (20 pts, 20 min)
 *
 * Standards: MS-PS1-2 (Chemical Reactions)
 * Spiral: MS-PS2-3 (Electric/magnetic forces from C6), MS-PS4-2 (Wave interactions from C5)
 */

const G8_C7_W4_CONFIG = {
  grade: 8,
  cycle: 7,
  week: 4,
  topic: 'Synthesis & Assessment: Chemical Reactions & Conservation',
  isAssessmentWeek: true,
  points: {
    part1SynthesisReview: 20,
    part2Assessment: 60,
    part3MisconceptionCheck: 20,
    total: 100
  },
  assessmentSections: {
    A: 'Reaction Evidence',
    B: 'Mass Conservation',
    C: 'Reaction Types',
    D: 'Reaction Rates'
  },
  misconceptionTargets: ['mass-lost-reactions', 'chemical-physical-confused', 'reactions-destroy-atoms'],
  standards: {
    primary: 'MS-PS1-2',
    spiral: ['MS-PS2-3', 'MS-PS4-2']
  }
};

/**
 * Main entry point - creates all assessment forms
 */
function createG8C7W4Forms() {
  const forms = {
    part1: createPart1SynthesisReview(),
    part2: createPart2CumulativeAssessment(),
    part3: createPart3MisconceptionCheck()
  };

  Logger.log('G8.C7.W4 Assessment forms created successfully');
  Logger.log('Part 1 (Synthesis): ' + forms.part1.getPublishedUrl());
  Logger.log('Part 2 (Cumulative): ' + forms.part2.getPublishedUrl());
  Logger.log('Part 3 (Misconception): ' + forms.part3.getPublishedUrl());

  return forms;
}

/**
 * Part 1: Synthesis Review (20 pts, 15 min)
 * Focus: Connect reaction evidence, types, conservation, and rates
 */
function createPart1SynthesisReview() {
  const form = FormApp.create('G8.C7.W4: Part 1 - Synthesis Review');
  form.setDescription(
    'Synthesis Review: Chemical Reactions & Conservation\n\n' +
    'Time: 15 minutes | Points: 20\n\n' +
    'Connect your understanding of reaction evidence, mass conservation, reaction types, and reaction rates.'
  );
  form.setIsQuiz(true);

  // Instructions
  form.addSectionHeaderItem()
    .setTitle('Synthesis Review')
    .setHelpText('Demonstrate how the concepts from this cycle connect together.');

  // Q1: Connecting Evidence to Conservation (4 pts)
  const q1 = form.addMultipleChoiceItem()
    .setTitle('A student observes bubbling and a temperature increase when mixing two solutions. They weigh the sealed container before and after. What should they expect about the mass?')
    .setHelpText('Question ID: g8_c7_w4_syn_q1')
    .setPoints(4)
    .setChoices([
      q1.createChoice('Mass decreases because gas was produced and escaped', false),
      q1.createChoice('Mass increases because energy was released', false),
      q1.createChoice('Mass stays the same because atoms are conserved, and the container is sealed', true),
      q1.createChoice('Mass changes unpredictably during chemical reactions', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! Even when gases form or energy is released, mass is conserved. In a sealed system, the total mass remains constant because atoms rearrange but are never created or destroyed.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Consider conservation of mass: atoms are rearranged during reactions but never created or destroyed. In a sealed container, all atoms remain inside, so total mass stays constant regardless of phase changes or energy release.')
      .build());

  // Q2: Reaction Type and Rate Connection (4 pts)
  const q2 = form.addMultipleChoiceItem()
    .setTitle('In a decomposition reaction, a single compound breaks into simpler substances. Which factor would most increase the rate of this decomposition?')
    .setHelpText('Question ID: g8_c7_w4_syn_q2')
    .setPoints(4)
    .setChoices([
      q2.createChoice('Decreasing the temperature', false),
      q2.createChoice('Increasing the concentration of products', false),
      q2.createChoice('Adding a catalyst that lowers activation energy', true),
      q2.createChoice('Using a larger container', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! Catalysts increase reaction rates by lowering the activation energy barrier, allowing more molecular collisions to be successful. This works for all reaction types, including decomposition.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Reaction rates increase when more collisions occur with sufficient energy. Catalysts lower the activation energy needed, increasing the fraction of successful collisions. Temperature and concentration affect rates, but catalysts provide the most direct rate increase.')
      .build());

  // Q3: Evidence and Type Integration (4 pts)
  const q3 = form.addMultipleChoiceItem()
    .setTitle('Two clear solutions are mixed, producing a white solid that settles to the bottom. Which reaction type and evidence category best describes this?')
    .setHelpText('Question ID: g8_c7_w4_syn_q3')
    .setPoints(4)
    .setChoices([
      q3.createChoice('Synthesis reaction; temperature change evidence', false),
      q3.createChoice('Double replacement reaction; precipitate formation evidence', true),
      q3.createChoice('Decomposition reaction; color change evidence', false),
      q3.createChoice('Single replacement reaction; gas production evidence', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! When two ionic solutions exchange partners to form an insoluble product, it\'s a double replacement (precipitation) reaction. The white solid is a precipitate—a key evidence category for chemical change.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('When a solid forms from mixing two solutions, it\'s called a precipitate. This typically occurs in double replacement reactions where ions swap partners, and one combination forms an insoluble compound that falls out of solution.')
      .build());

  // Q4: Cycle Integration Short Response (8 pts)
  form.addParagraphTextItem()
    .setTitle('A chemistry teacher heats sugar (C₆H₁₂O₆) in a pan. The sugar melts, then turns brown and produces a smell. Explain: (1) Which part is a physical change and which is chemical? (2) What evidence indicates the chemical change? (3) Is mass conserved if the pan is open? Use specific concepts from our cycle.')
    .setHelpText('Question ID: g8_c7_w4_syn_q4 | 8 points: Physical/chemical distinction (2), Evidence identification (2), Conservation explanation (2), Scientific reasoning (2)')
    .setRequired(true);

  return form;
}

/**
 * Part 2: Cumulative Assessment (60 pts, 40 min)
 * Sections: A-Reaction Evidence, B-Mass Conservation, C-Reaction Types, D-Reaction Rates
 */
function createPart2CumulativeAssessment() {
  const form = FormApp.create('G8.C7.W4: Part 2 - Cumulative Assessment');
  form.setDescription(
    'Cumulative Assessment: Chemical Reactions & Conservation\n\n' +
    'Time: 40 minutes | Points: 60\n\n' +
    'This assessment covers all concepts from Cycle 7:\n' +
    '• Section A: Reaction Evidence (15 pts)\n' +
    '• Section B: Mass Conservation (15 pts)\n' +
    '• Section C: Reaction Types (15 pts)\n' +
    '• Section D: Reaction Rates (15 pts)'
  );
  form.setIsQuiz(true);

  // ===== SECTION A: Reaction Evidence (15 pts) =====
  form.addSectionHeaderItem()
    .setTitle('Section A: Reaction Evidence')
    .setHelpText('Identify and analyze evidence of chemical reactions. (15 points)');

  // A1: Evidence Categories (3 pts)
  const a1 = form.addMultipleChoiceItem()
    .setTitle('Which observation provides the STRONGEST evidence that a chemical reaction occurred rather than a physical change?')
    .setHelpText('Question ID: g8_c7_w4_a_q1')
    .setPoints(3)
    .setChoices([
      a1.createChoice('The mixture became warmer', false),
      a1.createChoice('Bubbles formed in the liquid', false),
      a1.createChoice('A new substance with different properties was produced', true),
      a1.createChoice('The substances mixed together completely', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! While temperature changes and gas production can indicate reactions, the definitive evidence is the formation of a new substance with different chemical properties. Physical changes don\'t create new substances.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Temperature changes and bubbles can occur in physical changes too (like boiling). The key distinction is whether new substances with different properties form—that\'s unique to chemical reactions.')
      .build());

  // A2: Multiple Evidence Analysis (3 pts)
  const a2 = form.addCheckboxItem()
    .setTitle('A student mixes baking soda and vinegar. Select ALL observations that indicate a chemical reaction occurred.')
    .setHelpText('Question ID: g8_c7_w4_a_q2 | Select all that apply')
    .setPoints(3)
    .setChoices([
      a2.createChoice('Vigorous bubbling (gas production)', true),
      a2.createChoice('Temperature drop (endothermic reaction)', true),
      a2.createChoice('The liquids combined into one mixture', false),
      a2.createChoice('Formation of water and CO₂ (new substances)', true),
      a2.createChoice('The mixture changed from solid+liquid to liquid+gas', false)
    ]);

  // A3: Distinguishing Changes (3 pts)
  const a3 = form.addMultipleChoiceItem()
    .setTitle('Which process represents a physical change only?')
    .setHelpText('Question ID: g8_c7_w4_a_q3')
    .setPoints(3)
    .setChoices([
      a3.createChoice('Iron rusting in moist air', false),
      a3.createChoice('Water evaporating from a puddle', true),
      a3.createChoice('Wood burning in a fireplace', false),
      a3.createChoice('Milk turning sour over time', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! Evaporation is a physical change—water molecules escape as gas but remain H₂O. No new substance forms. Rusting, burning, and souring all involve chemical reactions that produce new substances.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('In physical changes, substances change form but not composition. Water evaporating remains H₂O. In chemical changes, new substances form: rust (Fe₂O₃), ash/CO₂ from burning, and lactic acid from souring.')
      .build());

  // A4: Evidence Application (6 pts)
  form.addParagraphTextItem()
    .setTitle('A glow stick glows brightly at first, then dims over several hours. Explain what evidence categories indicate a chemical reaction is occurring, and why the glow eventually stops.')
    .setHelpText('Question ID: g8_c7_w4_a_q4 | 6 points: Evidence identification (2), Light as energy evidence (2), Reactant consumption explanation (2)')
    .setRequired(true);

  // ===== SECTION B: Mass Conservation (15 pts) =====
  form.addSectionHeaderItem()
    .setTitle('Section B: Mass Conservation')
    .setHelpText('Apply the law of conservation of mass to chemical reactions. (15 points)');

  // B1: Conservation Principle (3 pts)
  const b1 = form.addMultipleChoiceItem()
    .setTitle('When magnesium ribbon burns in air, the resulting ash weighs MORE than the original magnesium. This seems to violate conservation of mass. What\'s the correct explanation?')
    .setHelpText('Question ID: g8_c7_w4_b_q1')
    .setPoints(3)
    .setChoices([
      b1.createChoice('Mass is created during exothermic reactions', false),
      b1.createChoice('The burning process adds energy which has mass', false),
      b1.createChoice('Oxygen from the air combines with magnesium, adding mass', true),
      b1.createChoice('The scale is measuring incorrectly due to heat', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! Magnesium + Oxygen → Magnesium Oxide. The oxygen atoms from the air become part of the product, increasing the measured mass. If we weighed all reactants (including oxygen), total mass would be conserved.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Mass is always conserved—it seems to increase because we\'re not accounting for the oxygen that combined with the magnesium. The ash (MgO) contains atoms from both the metal AND the air.')
      .build());

  // B2: Conservation Calculation (3 pts)
  const b2 = form.addMultipleChoiceItem()
    .setTitle('In a sealed container, 10g of reactant A combines with 5g of reactant B. After the reaction, what is the total mass of products?')
    .setHelpText('Question ID: g8_c7_w4_b_q2')
    .setPoints(3)
    .setChoices([
      b2.createChoice('Less than 15g because some mass converted to energy', false),
      b2.createChoice('Exactly 15g because mass is conserved', true),
      b2.createChoice('More than 15g because new substances formed', false),
      b2.createChoice('It depends on the type of reaction', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! Conservation of mass means the total mass of products always equals the total mass of reactants. 10g + 5g = 15g of products, regardless of the reaction type or energy changes.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('The law of conservation of mass states that atoms are neither created nor destroyed. In a sealed system, 10g + 5g of reactants must yield exactly 15g of products. Energy changes don\'t affect mass at this scale.')
      .build());

  // B3: Atom Accounting (3 pts)
  const b3 = form.addMultipleChoiceItem()
    .setTitle('In the reaction 2H₂ + O₂ → 2H₂O, why does the total mass stay the same?')
    .setHelpText('Question ID: g8_c7_w4_b_q3')
    .setPoints(3)
    .setChoices([
      b3.createChoice('The hydrogen and oxygen atoms are destroyed and reformed as water', false),
      b3.createChoice('The same atoms are rearranged into new molecules, none are lost or gained', true),
      b3.createChoice('Energy is converted to mass during the reaction', false),
      b3.createChoice('Water molecules weigh the same as hydrogen molecules', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! The 4 hydrogen atoms and 2 oxygen atoms present before the reaction are simply rearranged into 2 water molecules. No atoms are created or destroyed—they just form new bonds.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Atoms are never destroyed in chemical reactions. The H and O atoms rearrange from separate molecules (H₂ and O₂) into combined molecules (H₂O). Count the atoms: 4H + 2O → 4H + 2O.')
      .build());

  // B4: Conservation Application (6 pts)
  form.addParagraphTextItem()
    .setTitle('A student burns 5g of wood and only collects 1g of ash. They conclude that 4g of mass was destroyed. Explain the error in their reasoning and where the "missing" mass actually went.')
    .setHelpText('Question ID: g8_c7_w4_b_q4 | 6 points: Error identification (2), Gas products explanation (2), Conservation principle application (2)')
    .setRequired(true);

  // ===== SECTION C: Reaction Types (15 pts) =====
  form.addSectionHeaderItem()
    .setTitle('Section C: Reaction Types')
    .setHelpText('Classify and predict products of different reaction types. (15 points)');

  // C1: Reaction Classification (3 pts)
  const c1 = form.addMultipleChoiceItem()
    .setTitle('Photosynthesis: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂. What type of reaction is this?')
    .setHelpText('Question ID: g8_c7_w4_c_q1')
    .setPoints(3)
    .setChoices([
      c1.createChoice('Decomposition - breaking down into simpler substances', false),
      c1.createChoice('Synthesis - combining simpler substances into a complex one', true),
      c1.createChoice('Single replacement - one element replacing another', false),
      c1.createChoice('Double replacement - two compounds exchanging parts', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! Photosynthesis is a synthesis reaction—simpler molecules (CO₂ and H₂O) combine to form a more complex molecule (glucose). Energy from sunlight drives this endothermic process.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('In synthesis reactions, smaller/simpler molecules combine to form larger/more complex ones. Photosynthesis builds glucose (C₆H₁₂O₆) from carbon dioxide and water.')
      .build());

  // C2: Predicting Products (3 pts)
  const c2 = form.addMultipleChoiceItem()
    .setTitle('When zinc metal is placed in copper sulfate solution (CuSO₄), zinc sulfate and copper metal form. This is classified as:')
    .setHelpText('Question ID: g8_c7_w4_c_q2')
    .setPoints(3)
    .setChoices([
      c2.createChoice('Synthesis reaction', false),
      c2.createChoice('Decomposition reaction', false),
      c2.createChoice('Single replacement reaction', true),
      c2.createChoice('Double replacement reaction', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! Zn + CuSO₄ → ZnSO₄ + Cu. The zinc atom replaces the copper in the compound. One element (Zn) replaces another element (Cu) in a compound—this defines single replacement.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('When one element replaces another in a compound, it\'s single replacement. Zinc is more reactive than copper, so it takes copper\'s place: Zn + CuSO₄ → ZnSO₄ + Cu.')
      .build());

  // C3: Balancing and Types (3 pts)
  const c3 = form.addMultipleChoiceItem()
    .setTitle('H₂O₂ → H₂O + O₂ (unbalanced). What type of reaction is this, and what coefficient goes in front of H₂O₂?')
    .setHelpText('Question ID: g8_c7_w4_c_q3')
    .setPoints(3)
    .setChoices([
      c3.createChoice('Synthesis; coefficient of 1', false),
      c3.createChoice('Decomposition; coefficient of 2', true),
      c3.createChoice('Single replacement; coefficient of 2', false),
      c3.createChoice('Decomposition; coefficient of 1', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! One compound (H₂O₂) breaks down into simpler substances—that\'s decomposition. Balanced: 2H₂O₂ → 2H₂O + O₂. Count: 4H and 4O on each side.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('When one compound breaks into simpler products, it\'s decomposition. To balance: 2H₂O₂ → 2H₂O + O₂ ensures equal atoms on both sides (4H, 4O).')
      .build());

  // C4: Reaction Type Application (6 pts)
  form.addParagraphTextItem()
    .setTitle('Antacid tablets (containing calcium carbonate, CaCO₃) react with stomach acid (HCl) to produce calcium chloride, water, and carbon dioxide. (1) Classify this reaction type. (2) Write the balanced equation. (3) Explain how you would verify mass is conserved.')
    .setHelpText('Question ID: g8_c7_w4_c_q4 | 6 points: Correct classification (2), Balanced equation (2), Conservation verification method (2)')
    .setRequired(true);

  // ===== SECTION D: Reaction Rates (15 pts) =====
  form.addSectionHeaderItem()
    .setTitle('Section D: Reaction Rates')
    .setHelpText('Analyze factors affecting how fast reactions occur. (15 points)');

  // D1: Temperature Effect (3 pts)
  const d1 = form.addMultipleChoiceItem()
    .setTitle('Why do reactions generally speed up when temperature increases?')
    .setHelpText('Question ID: g8_c7_w4_d_q1')
    .setPoints(3)
    .setChoices([
      d1.createChoice('Higher temperature creates more reactant molecules', false),
      d1.createChoice('Higher temperature makes molecules move faster with more energetic collisions', true),
      d1.createChoice('Higher temperature removes the need for activation energy', false),
      d1.createChoice('Higher temperature changes the type of reaction', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! Temperature is a measure of average kinetic energy. Higher temperature means faster-moving molecules that collide more frequently AND with more energy—more collisions exceed activation energy, so more reactions occur.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Temperature measures average kinetic energy of molecules. Higher temperature = faster molecules = more frequent collisions with greater energy. More collisions have enough energy to overcome activation energy and react.')
      .build());

  // D2: Surface Area Effect (3 pts)
  const d2 = form.addMultipleChoiceItem()
    .setTitle('Powdered sugar dissolves faster than a sugar cube in water because:')
    .setHelpText('Question ID: g8_c7_w4_d_q2')
    .setPoints(3)
    .setChoices([
      d2.createChoice('Powder has less mass than a cube', false),
      d2.createChoice('Powder has more surface area exposed to water molecules', true),
      d2.createChoice('Powder is chemically different from cube sugar', false),
      d2.createChoice('Powder raises the water temperature', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! More surface area means more contact points between reactants (sugar and water molecules), allowing more simultaneous interactions. This is why catalytic converters use fine mesh—maximum surface area.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Surface area affects rate because reactions occur at the interface between substances. More surface area = more contact = more simultaneous collisions = faster reaction.')
      .build());

  // D3: Catalyst Understanding (3 pts)
  const d3 = form.addMultipleChoiceItem()
    .setTitle('A catalyst speeds up a reaction by:')
    .setHelpText('Question ID: g8_c7_w4_d_q3')
    .setPoints(3)
    .setChoices([
      d3.createChoice('Providing additional reactant molecules', false),
      d3.createChoice('Increasing the temperature of the reaction', false),
      d3.createChoice('Providing an alternative pathway with lower activation energy', true),
      d3.createChoice('Being consumed to release extra energy', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! Catalysts provide an alternative reaction pathway with lower activation energy. This allows more molecular collisions to be successful. Importantly, catalysts are not consumed—they can be used repeatedly.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Catalysts lower the activation energy by providing an alternative reaction pathway. They\'re not consumed in the reaction—the same catalyst molecules can speed up millions of reactions.')
      .build());

  // D4: Rate Factors Application (6 pts)
  form.addParagraphTextItem()
    .setTitle('A food company wants to slow down the oxidation reaction that causes potato chips to go stale. Describe THREE different strategies they could use based on reaction rate factors, and explain why each would work.')
    .setHelpText('Question ID: g8_c7_w4_d_q4 | 6 points: Three valid strategies (3), Scientific explanations for each (3)')
    .setRequired(true);

  return form;
}

/**
 * Part 3: Misconception Check (20 pts, 20 min)
 * Targets: mass-lost-reactions, chemical-physical-confused, reactions-destroy-atoms
 */
function createPart3MisconceptionCheck() {
  const form = FormApp.create('G8.C7.W4: Part 3 - Misconception Check');
  form.setDescription(
    'Misconception Check: Chemical Reactions & Conservation\n\n' +
    'Time: 20 minutes | Points: 20\n\n' +
    'This section specifically addresses common misconceptions about chemical reactions. ' +
    'Read each scenario carefully and apply your understanding.'
  );
  form.setIsQuiz(true);

  // Instructions
  form.addSectionHeaderItem()
    .setTitle('Addressing Common Misconceptions')
    .setHelpText('These questions target ideas that many students initially find confusing. Think carefully about each one.');

  // M1: Mass Lost Misconception (5 pts)
  const m1 = form.addMultipleChoiceItem()
    .setTitle('MISCONCEPTION: "When you burn gasoline in a car engine, the gasoline is destroyed and converted into energy, which is why the fuel tank empties."\n\nWhat\'s wrong with this statement?')
    .setHelpText('Question ID: g8_c7_w4_mis_q1 | Target: mass-lost-reactions')
    .setPoints(5)
    .setChoices([
      m1.createChoice('Nothing is wrong—matter converts to energy in burning', false),
      m1.createChoice('The gasoline atoms aren\'t destroyed; they combine with oxygen to form CO₂ and H₂O gases that exit through the exhaust', true),
      m1.createChoice('The gasoline is destroyed, but it\'s replaced by air', false),
      m1.createChoice('Energy has mass, so the total mass is conserved', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Exactly right! The gasoline (hydrocarbon) atoms aren\'t destroyed—they combine with oxygen from air to form carbon dioxide and water vapor. These gas products exit through the exhaust. If you collected all inputs (gasoline + oxygen) and outputs (CO₂ + H₂O), mass would be conserved. The tank empties because the liquid is converted to gases that escape.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Matter is never destroyed in chemical reactions. When gasoline burns: CₓHᵧ + O₂ → CO₂ + H₂O. The carbon and hydrogen atoms from gasoline combine with oxygen atoms from air to form gas products that exit through the exhaust. Mass is conserved—it just changes form.')
      .build());

  // M2: Chemical-Physical Confusion (5 pts)
  const m2 = form.addMultipleChoiceItem()
    .setTitle('MISCONCEPTION: "Dissolving salt in water is a chemical change because the salt disappears."\n\nWhy is this reasoning incorrect?')
    .setHelpText('Question ID: g8_c7_w4_mis_q2 | Target: chemical-physical-confused')
    .setPoints(5)
    .setChoices([
      m2.createChoice('The salt doesn\'t actually disappear—it\'s still NaCl, just separated into invisible ions that can be recovered by evaporation', true),
      m2.createChoice('Disappearing is always evidence of a chemical change', false),
      m2.createChoice('Salt dissolving IS a chemical change because it mixes with water', false),
      m2.createChoice('The salt was destroyed when it dissolved', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! Dissolving is a physical change. The NaCl is still present as Na⁺ and Cl⁻ ions—it hasn\'t changed into a different substance. Proof: evaporate the water and you get your salt back. In chemical changes, new substances form that can\'t simply be recovered by physical separation.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('"Disappearing" to the eye doesn\'t mean chemical change. The salt particles separate but remain NaCl (as ions). Test: evaporate the water and salt crystals reform. Chemical changes produce NEW substances that can\'t be recovered by simple physical means.')
      .build());

  // M3: Atoms Destroyed Misconception (5 pts)
  const m3 = form.addMultipleChoiceItem()
    .setTitle('MISCONCEPTION: "In the reaction Fe + S → FeS, the iron and sulfur atoms are destroyed and new iron sulfide atoms are created."\n\nCorrect this misconception:')
    .setHelpText('Question ID: g8_c7_w4_mis_q3 | Target: reactions-destroy-atoms')
    .setPoints(5)
    .setChoices([
      m3.createChoice('The statement is correct—new atoms form in reactions', false),
      m3.createChoice('The original atoms remain but form new bonds; no atoms are created or destroyed, just rearranged', true),
      m3.createChoice('The iron is destroyed but the sulfur remains', false),
      m3.createChoice('Both atoms are converted to energy, then new atoms form', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Exactly! The iron atom (Fe) and sulfur atom (S) are the same atoms before and after—only the bonds between them change. An iron atom cannot be destroyed or created except in nuclear reactions (not chemical). Chemical reactions only rearrange existing atoms into new combinations.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Atoms are NEVER created or destroyed in chemical reactions—that would require nuclear processes. The same Fe and S atoms that existed before the reaction still exist after; they\'ve just bonded together. Chemical reactions only break and form bonds, rearranging atoms.')
      .build());

  // M4: Integrated Misconception Analysis (5 pts)
  form.addParagraphTextItem()
    .setTitle('A student makes these three claims about a rusting nail:\n\n1. "The iron is slowly being destroyed by oxygen."\n2. "Rust weighs less than the original iron because some iron was lost."\n3. "Rusting is physical change because the nail just changes color."\n\nIdentify which misconception each claim represents, and provide the correct scientific explanation for each.')
    .setHelpText('Question ID: g8_c7_w4_mis_q4 | 5 points: All three misconceptions correctly identified (2), Accurate corrections with scientific reasoning (3)')
    .setRequired(true);

  return form;
}
