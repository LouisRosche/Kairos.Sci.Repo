/**
 * ═══════════════════════════════════════════════════════════════════════════
 * GRADE 8 CYCLE 7 WEEK 2: REACTION TYPES & CONSERVATION
 * The Disappearing Solid Mystery - Chemical Reactions & Conservation
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * NGSS Standards: MS-PS1-2 (Primary), MS-PS2-3 & MS-PS4-2 (Spiral)
 * Duration: 2 days (~75 min each)
 * Total Points: 100
 *
 * Station Structure:
 * - Hook: 12 pts (The Disappearing Solid Mystery)
 * - Station 1: 20 pts (Reaction Type Classification)
 * - Station 2: 20 pts (Balancing Equations Lab)
 * - Station 3: 25 pts (Design a Chemical Process)
 * - Exit Ticket: 23 pts (Reaction Patterns Integration)
 *
 * ═══════════════════════════════════════════════════════════════════════════
 */

// ═══════════════════════════════════════════════════════════════════════════
// MAIN ORCHESTRATION FUNCTION
// ═══════════════════════════════════════════════════════════════════════════

function createAllG8C7W2Forms() {
  const forms = [];

  try {
    Logger.log('Creating G8 C7 W2 Forms: Reaction Types & Conservation');

    forms.push(createG8C7W2Hook_());
    Logger.log('✓ Hook created');

    forms.push(createG8C7W2Station1_());
    Logger.log('✓ Station 1 created');

    forms.push(createG8C7W2Station2_());
    Logger.log('✓ Station 2 created');

    forms.push(createG8C7W2Station3_());
    Logger.log('✓ Station 3 created');

    forms.push(createG8C7W2ExitTicket_());
    Logger.log('✓ Exit Ticket created');

    Logger.log('═══════════════════════════════════════════════════');
    Logger.log('All G8 C7 W2 forms created successfully!');
    Logger.log('Total forms: ' + forms.length);
    Logger.log('Total points: 100');
    Logger.log('═══════════════════════════════════════════════════');

    return forms;

  } catch (error) {
    Logger.log('ERROR creating forms: ' + error.message);
    throw error;
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// HOOK: THE DISAPPEARING SOLID MYSTERY (12 pts)
// ═══════════════════════════════════════════════════════════════════════════

function createG8C7W2Hook_() {
  const form = FormApp.create('G8.C7.W2: Hook - The Disappearing Solid Mystery');
  form.setDescription(
    'The Disappearing Solid Mystery\n\n' +
    'Pour one clear liquid into another clear liquid—nothing special, right? ' +
    'But suddenly, a white solid appears out of nowhere! Where did it come from?\n\n' +
    'Total Points: 12\n' +
    'Driving Question: How can mixing two clear liquids make something solid appear?'
  );
  form.setIsQuiz(true);
  form.setShuffleQuestions(false);

  // Q1: Phenomenon Observation (2 pts)
  const q1 = form.addMultipleChoiceItem();
  q1.setTitle('Q1. Two clear liquids are mixed, and a white solid suddenly appears. This solid is evidence of:');
  q1.setHelpText('Question ID: g8_c7_w2_hook_q1 | Points: 2 | DCI: PS1.B');
  q1.setChoices([
    q1.createChoice('A physical change - the liquids are just separating', false),
    q1.createChoice('A chemical reaction - a new substance has formed', true),
    q1.createChoice('Evaporation - water is leaving the mixture', false),
    q1.createChoice('Condensation - air is turning into solid', false)
  ]);
  q1.setPoints(2);
  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! The solid wasn\'t in either liquid before mixing. It formed when atoms from both liquids rearranged into a new compound that doesn\'t dissolve - a precipitate. This is a chemical reaction!')
      .build()
  );
  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Neither liquid contained a solid before mixing. When a new substance appears that wasn\'t there before, it\'s evidence of a chemical reaction. The atoms have rearranged to form something new - a precipitate.')
      .build()
  );

  // Q2: Origin of Atoms (3 pts)
  const q2 = form.addMultipleChoiceItem();
  q2.setTitle('Q2. The white solid wasn\'t in either liquid before mixing. Where did the atoms that make up the solid come from?');
  q2.setHelpText('Question ID: g8_c7_w2_hook_q2 | Points: 3 | DCI: PS1.B');
  q2.setChoices([
    q2.createChoice('They were created by the chemical reaction', false),
    q2.createChoice('They came from the atoms already in both liquids', true),
    q2.createChoice('They came from the air around the beaker', false),
    q2.createChoice('They came from energy being converted to matter', false)
  ]);
  q2.setPoints(3);
  q2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Exactly! Chemical reactions rearrange existing atoms - they don\'t create new ones. The atoms in the solid precipitate came from the dissolved substances in both liquids. They simply recombined in a new way.')
      .build()
  );
  q2.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Remember conservation of mass: atoms are never created or destroyed in chemical reactions! The precipitate atoms came from the dissolved substances in both liquids. The atoms rearranged into a new combination.')
      .build()
  );

  // Q3: Week 1 Connection (2 pts)
  const q3 = form.addMultipleChoiceItem();
  q3.setTitle('Q3. From Week 1, what type of reaction evidence does a solid appearing from liquids represent?');
  q3.setHelpText('Question ID: g8_c7_w2_hook_q3 | Points: 2 | Spiral: Week 1');
  q3.setChoices([
    q3.createChoice('Color change', false),
    q3.createChoice('Gas production', false),
    q3.createChoice('Precipitate formation', true),
    q3.createChoice('Temperature change', false)
  ]);
  q3.setPoints(2);
  q3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Great connection to Week 1! Precipitate formation - when a solid appears from mixing liquids - is one of the five types of chemical reaction evidence. The solid is insoluble (won\'t dissolve) in the liquid.')
      .build()
  );
  q3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('From Week 1, precipitate formation is when a solid appears from mixing liquids. The new compound that forms is insoluble (doesn\'t dissolve), so it appears as a solid even though the reactants were dissolved.')
      .build()
  );

  // Q4: Reaction Type Prediction (3 pts)
  const q4 = form.addMultipleChoiceItem();
  q4.setTitle('Q4. In this reaction, two dissolved substances swap partners to form new compounds. This type of reaction is called:');
  q4.setHelpText('Question ID: g8_c7_w2_hook_q4 | Points: 3 | DCI: PS1.B');
  q4.setChoices([
    q4.createChoice('Synthesis - two things combining', false),
    q4.createChoice('Decomposition - one thing breaking apart', false),
    q4.createChoice('Double replacement - partners swapping', true),
    q4.createChoice('Combustion - burning with oxygen', false)
  ]);
  q4.setPoints(3);
  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Double replacement (also called double displacement) is when two compounds "swap partners." AB + CD → AD + CB. In our case, one of the new compounds is insoluble, so it forms a precipitate.')
      .build()
  );
  q4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('When two compounds swap their components (AB + CD → AD + CB), it\'s called double replacement. Think of it like dance partners switching - each compound exchanges a part with the other.')
      .build()
  );

  // Q5: Conservation Check (2 pts)
  const q5 = form.addMultipleChoiceItem();
  q5.setTitle('Q5. If you weighed all the liquids before mixing and all the products after (including the precipitate), what would you expect?');
  q5.setHelpText('Question ID: g8_c7_w2_hook_q5 | Points: 2 | DCI: PS1.B');
  q5.setChoices([
    q5.createChoice('Mass after would be greater because a solid formed', false),
    q5.createChoice('Mass after would be less because energy was released', false),
    q5.createChoice('Mass before and after would be equal', true),
    q5.createChoice('Cannot determine without knowing the chemicals', false)
  ]);
  q5.setPoints(2);
  q5.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Conservation of mass: all the atoms that were in the liquids are still there, just rearranged. The precipitate mass came from atoms that were dissolved before. Total mass stays the same!')
      .build()
  );
  q5.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Remember conservation of mass from Week 1! Atoms are rearranged, not created or destroyed. The solid precipitate is made of atoms that were already dissolved in the liquids. Total mass is conserved.')
      .build()
  );

  return form;
}

// ═══════════════════════════════════════════════════════════════════════════
// STATION 1: REACTION TYPE CLASSIFICATION (20 pts)
// ═══════════════════════════════════════════════════════════════════════════

function createG8C7W2Station1_() {
  const form = FormApp.create('G8.C7.W2: Station 1 - Reaction Type Classification');
  form.setDescription(
    'Reaction Type Classification\n\n' +
    'Learn to identify the five main types of chemical reactions based on ' +
    'how atoms rearrange from reactants to products.\n\n' +
    'Total Points: 20\n' +
    'Time: ~18 minutes'
  );
  form.setIsQuiz(true);
  form.setShuffleQuestions(false);

  // Q1: Synthesis Recognition (3 pts)
  const q1 = form.addMultipleChoiceItem();
  q1.setTitle('Q1. 2H₂ + O₂ → 2H₂O. In this reaction, simpler substances combine to form a more complex substance. This is a:');
  q1.setHelpText('Question ID: g8_c7_w2_s1_q1 | Points: 3 | DCI: PS1.B');
  q1.setChoices([
    q1.createChoice('Synthesis reaction', true),
    q1.createChoice('Decomposition reaction', false),
    q1.createChoice('Single replacement reaction', false),
    q1.createChoice('Double replacement reaction', false)
  ]);
  q1.setPoints(3);
  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Synthesis (also called combination) is when two or more simple substances combine to form a more complex product: A + B → AB. Hydrogen and oxygen combine to form water.')
      .build()
  );
  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('When simpler substances combine to form a more complex substance (A + B → AB), it\'s synthesis. Think "synthesize" = "put together." Water is formed from hydrogen and oxygen combining.')
      .build()
  );

  // Q2: Decomposition Recognition (3 pts)
  const q2 = form.addMultipleChoiceItem();
  q2.setTitle('Q2. 2H₂O → 2H₂ + O₂. In this reaction, a complex substance breaks down into simpler substances. This is a:');
  q2.setHelpText('Question ID: g8_c7_w2_s1_q2 | Points: 3 | DCI: PS1.B');
  q2.setChoices([
    q2.createChoice('Synthesis reaction', false),
    q2.createChoice('Decomposition reaction', true),
    q2.createChoice('Single replacement reaction', false),
    q2.createChoice('Combustion reaction', false)
  ]);
  q2.setPoints(3);
  q2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Decomposition is when a complex substance breaks down into simpler substances: AB → A + B. Water decomposes into hydrogen and oxygen. This is the opposite of synthesis!')
      .build()
  );
  q2.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('When a complex substance breaks apart into simpler substances (AB → A + B), it\'s decomposition. Think "decompose" = "break down." Water splits into hydrogen and oxygen gases.')
      .build()
  );

  // Q3: Single Replacement (4 pts)
  const q3 = form.addMultipleChoiceItem();
  q3.setTitle('Q3. Zn + CuSO₄ → ZnSO₄ + Cu. Zinc takes copper\'s place in the compound. This is a:');
  q3.setHelpText('Question ID: g8_c7_w2_s1_q3 | Points: 4 | DCI: PS1.B');
  q3.setChoices([
    q3.createChoice('Synthesis reaction', false),
    q3.createChoice('Decomposition reaction', false),
    q3.createChoice('Single replacement reaction', true),
    q3.createChoice('Double replacement reaction', false)
  ]);
  q3.setPoints(4);
  q3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Single replacement is when an element replaces another element in a compound: A + BC → AC + B. Zinc replaces copper, freeing copper metal from the solution.')
      .build()
  );
  q3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('When a single element "kicks out" another element from a compound (A + BC → AC + B), it\'s single replacement. Zinc is more reactive than copper, so it takes copper\'s place.')
      .build()
  );

  // Q4: Double Replacement (4 pts)
  const q4 = form.addMultipleChoiceItem();
  q4.setTitle('Q4. NaCl + AgNO₃ → NaNO₃ + AgCl. The sodium and silver swap partners. This is a:');
  q4.setHelpText('Question ID: g8_c7_w2_s1_q4 | Points: 4 | DCI: PS1.B');
  q4.setChoices([
    q4.createChoice('Synthesis reaction', false),
    q4.createChoice('Single replacement reaction', false),
    q4.createChoice('Double replacement reaction', true),
    q4.createChoice('Combustion reaction', false)
  ]);
  q4.setPoints(4);
  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Double replacement is when two compounds exchange partners: AB + CD → AD + CB. Sodium chloride and silver nitrate swap to form sodium nitrate and silver chloride (the white precipitate!).')
      .build()
  );
  q4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('When two compounds swap their partners (AB + CD → AD + CB), it\'s double replacement. Think of switching dance partners - each compound trades one part with the other.')
      .build()
  );

  // Q5: Combustion (3 pts)
  const q5 = form.addMultipleChoiceItem();
  q5.setTitle('Q5. CH₄ + 2O₂ → CO₂ + 2H₂O. Methane burns in oxygen to produce carbon dioxide and water. This is a:');
  q5.setHelpText('Question ID: g8_c7_w2_s1_q5 | Points: 3 | DCI: PS1.B');
  q5.setChoices([
    q5.createChoice('Synthesis reaction', false),
    q5.createChoice('Decomposition reaction', false),
    q5.createChoice('Double replacement reaction', false),
    q5.createChoice('Combustion reaction', true)
  ]);
  q5.setPoints(3);
  q5.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Combustion is when a substance reacts rapidly with oxygen, releasing energy. Hydrocarbon fuels like methane (CH₄) always produce CO₂ and H₂O when they burn completely.')
      .build()
  );
  q5.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Combustion = burning with oxygen. When hydrocarbons (compounds of C and H) burn completely, they ALWAYS produce carbon dioxide (CO₂) and water (H₂O). This releases a lot of energy as heat and light.')
      .build()
  );

  // Q6: Classification Application (3 pts)
  const q6 = form.addMultipleChoiceItem();
  q6.setTitle('Q6. Which reaction type is the OPPOSITE of decomposition?');
  q6.setHelpText('Question ID: g8_c7_w2_s1_q6 | Points: 3 | SEP-6: Constructing Explanations');
  q6.setChoices([
    q6.createChoice('Synthesis - combining instead of breaking apart', true),
    q6.createChoice('Combustion - using oxygen instead of releasing it', false),
    q6.createChoice('Single replacement - one element instead of all', false),
    q6.createChoice('Double replacement - swapping partners', false)
  ]);
  q6.setPoints(3);
  q6.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Synthesis (A + B → AB) and decomposition (AB → A + B) are exact opposites. Synthesis combines; decomposition breaks apart. Same equation, opposite directions!')
      .build()
  );
  q6.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Think about what decomposition does (AB → A + B: breaks apart). The opposite would be combining (A + B → AB: synthesis). These are reverse reactions of each other!')
      .build()
  );

  return form;
}

// ═══════════════════════════════════════════════════════════════════════════
// STATION 2: BALANCING EQUATIONS LAB (20 pts)
// ═══════════════════════════════════════════════════════════════════════════

function createG8C7W2Station2_() {
  const form = FormApp.create('G8.C7.W2: Station 2 - Balancing Equations Lab');
  form.setDescription(
    'Balancing Equations Lab\n\n' +
    'Chemical equations must be balanced to show that atoms are conserved. ' +
    'The same atoms that go in must come out - just rearranged!\n\n' +
    'Total Points: 20\n' +
    'Time: ~15 minutes'
  );
  form.setIsQuiz(true);
  form.setShuffleQuestions(false);

  // Q1: Why Balance? (3 pts)
  const q1 = form.addMultipleChoiceItem();
  q1.setTitle('Q1. Why must chemical equations be balanced?');
  q1.setHelpText('Question ID: g8_c7_w2_s2_q1 | Points: 3 | DCI: PS1.B');
  q1.setChoices([
    q1.createChoice('To make the equation look symmetrical', false),
    q1.createChoice('To show that atoms are conserved - same number on each side', true),
    q1.createChoice('To show how fast the reaction happens', false),
    q1.createChoice('To show the energy released or absorbed', false)
  ]);
  q1.setPoints(3);
  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Balancing equations proves conservation of mass at the atomic level. The same number of each type of atom must appear on both sides - atoms are rearranged, not created or destroyed!')
      .build()
  );
  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Balanced equations show conservation of mass. Every atom that enters a reaction must exit in a product. If the equation isn\'t balanced, it would suggest atoms appeared or disappeared - which violates conservation of mass.')
      .build()
  );

  // Q2: Coefficient vs Subscript (4 pts)
  const q2 = form.addMultipleChoiceItem();
  q2.setTitle('Q2. In the formula 2H₂O, what does the "2" in front mean versus the "2" in the subscript?');
  q2.setHelpText('Question ID: g8_c7_w2_s2_q2 | Points: 4 | DCI: PS1.B');
  q2.setChoices([
    q2.createChoice('Both mean there are 2 water molecules', false),
    q2.createChoice('The coefficient (2 in front) means 2 molecules; the subscript (₂) means 2 H atoms per molecule', true),
    q2.createChoice('The coefficient is for solids; the subscript is for liquids', false),
    q2.createChoice('They can be changed interchangeably when balancing', false)
  ]);
  q2.setPoints(4);
  q2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Excellent! Coefficients tell how many molecules; subscripts tell how many atoms of each element in ONE molecule. So 2H₂O = 2 molecules, each with 2 H and 1 O = 4 H total and 2 O total.')
      .build()
  );
  q2.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Key distinction: Coefficients (numbers in front) = how many molecules. Subscripts (small numbers below) = atoms per molecule. NEVER change subscripts when balancing - that changes the substance itself!')
      .build()
  );

  // Q3: Simple Balancing (4 pts)
  const q3 = form.addMultipleChoiceItem();
  q3.setTitle('Q3. Balance this equation: H₂ + O₂ → H₂O. What coefficients make it balanced?');
  q3.setHelpText('Question ID: g8_c7_w2_s2_q3 | Points: 4 | SEP-5: Using Mathematics');
  q3.setChoices([
    q3.createChoice('1 H₂ + 1 O₂ → 1 H₂O', false),
    q3.createChoice('2 H₂ + 1 O₂ → 2 H₂O', true),
    q3.createChoice('1 H₂ + 2 O₂ → 2 H₂O', false),
    q3.createChoice('2 H₂ + 2 O₂ → 4 H₂O', false)
  ]);
  q3.setPoints(4);
  q3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! 2H₂ + O₂ → 2H₂O gives us: Left side: 4 H atoms, 2 O atoms. Right side: 4 H atoms, 2 O atoms. Balanced! Always count atoms on both sides to verify.')
      .build()
  );
  q3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Count atoms on each side! We need: Left = Right for each element. Start with O: O₂ has 2 O atoms, so we need 2 H₂O (giving 2 O). Now count H: 2 H₂O has 4 H, so we need 2 H₂. Answer: 2H₂ + O₂ → 2H₂O')
      .build()
  );

  // Q4: Medium Balancing (5 pts)
  const q4 = form.addMultipleChoiceItem();
  q4.setTitle('Q4. Balance: Fe + O₂ → Fe₂O₃. What coefficients work?');
  q4.setHelpText('Question ID: g8_c7_w2_s2_q4 | Points: 5 | SEP-5: Using Mathematics');
  q4.setChoices([
    q4.createChoice('2 Fe + 3 O₂ → 2 Fe₂O₃', false),
    q4.createChoice('4 Fe + 3 O₂ → 2 Fe₂O₃', true),
    q4.createChoice('3 Fe + 2 O₂ → Fe₂O₃', false),
    q4.createChoice('4 Fe + 2 O₂ → 2 Fe₂O₃', false)
  ]);
  q4.setPoints(5);
  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! 4Fe + 3O₂ → 2Fe₂O₃. Check: Left: 4 Fe, 6 O. Right: 2×2=4 Fe, 2×3=6 O. Balanced! This is iron rusting - the same reaction from the steel wool example.')
      .build()
  );
  q4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('This is tricky! Fe₂O₃ has 2 Fe and 3 O per molecule. Start with O: O₂ has even atoms, but Fe₂O₃ has odd (3). Try 2 Fe₂O₃ (6 O). That needs 3 O₂. Now Fe: 2×2=4 Fe needed. Answer: 4Fe + 3O₂ → 2Fe₂O₃')
      .build()
  );

  // Q5: Atom Counting (4 pts)
  const q5 = form.addMultipleChoiceItem();
  q5.setTitle('Q5. In the balanced equation 2CO + O₂ → 2CO₂, how many oxygen atoms are on each side?');
  q5.setHelpText('Question ID: g8_c7_w2_s2_q5 | Points: 4 | SEP-5: Using Mathematics');
  q5.setChoices([
    q5.createChoice('Left: 3 O, Right: 4 O', false),
    q5.createChoice('Left: 4 O, Right: 4 O', true),
    q5.createChoice('Left: 2 O, Right: 2 O', false),
    q5.createChoice('Left: 4 O, Right: 2 O', false)
  ]);
  q5.setPoints(4);
  q5.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Left: 2CO has 2 O + O₂ has 2 O = 4 O total. Right: 2CO₂ has 2×2 = 4 O total. Same on both sides - it\'s balanced!')
      .build()
  );
  q5.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Count carefully: Left side has 2CO (2 oxygen atoms) + O₂ (2 oxygen atoms) = 4 oxygen atoms total. Right side has 2CO₂ (2 × 2 = 4 oxygen atoms). Both sides have 4 oxygen atoms!')
      .build()
  );

  return form;
}

// ═══════════════════════════════════════════════════════════════════════════
// STATION 3: DESIGN A CHEMICAL PROCESS (25 pts)
// ═══════════════════════════════════════════════════════════════════════════

function createG8C7W2Station3_() {
  const form = FormApp.create('G8.C7.W2: Station 3 - Design a Chemical Process');
  form.setDescription(
    'Design a Chemical Process\n\n' +
    'Apply your knowledge of reaction types to solve a real-world problem: ' +
    'removing lead from contaminated water using precipitation reactions.\n\n' +
    'Total Points: 25\n' +
    'Time: ~20 minutes'
  );
  form.setIsQuiz(true);
  form.setShuffleQuestions(false);

  // Q1: Problem Understanding (4 pts)
  const q1 = form.addMultipleChoiceItem();
  q1.setTitle('Q1. A water treatment plant needs to remove dissolved lead ions (Pb²⁺) from water. Which reaction type would be most useful?');
  q1.setHelpText('Question ID: g8_c7_w2_s3_q1 | Points: 4 | SEP-6: Constructing Explanations');
  q1.setChoices([
    q1.createChoice('Synthesis - combine lead with something', false),
    q1.createChoice('Decomposition - break down the lead compound', false),
    q1.createChoice('Double replacement - make lead form an insoluble precipitate', true),
    q1.createChoice('Combustion - burn off the lead', false)
  ]);
  q1.setPoints(4);
  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Double replacement can turn dissolved lead ions into an insoluble solid (precipitate) that can be filtered out. Example: Pb²⁺(aq) + 2Cl⁻(aq) → PbCl₂(s). The solid lead chloride can be removed!')
      .build()
  );
  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('To remove something dissolved, we need to make it undissolved (solid). Double replacement can form precipitates - new compounds that are insoluble. If we react lead ions with the right partner, lead becomes a solid we can filter out!')
      .build()
  );

  // Q2: Reaction Selection (5 pts)
  const q2 = form.addMultipleChoiceItem();
  q2.setTitle('Q2. Which compound could be added to precipitate lead as lead chloride (PbCl₂)?');
  q2.setHelpText('Question ID: g8_c7_w2_s3_q2 | Points: 5 | SEP-3: Planning Investigations');
  q2.setChoices([
    q2.createChoice('Sodium chloride (NaCl) - provides chloride ions', true),
    q2.createChoice('Sodium nitrate (NaNO₃) - provides nitrate ions', false),
    q2.createChoice('Water (H₂O) - provides hydrogen and oxygen', false),
    q2.createChoice('Carbon dioxide (CO₂) - provides carbon and oxygen', false)
  ]);
  q2.setPoints(5);
  q2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! We need chloride ions (Cl⁻) to combine with lead (Pb²⁺) to form PbCl₂. Sodium chloride (NaCl) dissolves to provide Cl⁻ ions. The reaction: Pb²⁺ + 2Cl⁻ → PbCl₂(s)')
      .build()
  );
  q2.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('To make PbCl₂, we need a source of chloride ions (Cl⁻). NaCl dissolves in water to give Na⁺ and Cl⁻ ions. The Cl⁻ ions can then combine with Pb²⁺ to form insoluble PbCl₂.')
      .build()
  );

  // Q3: Process Design (5 pts)
  const q3 = form.addMultipleChoiceItem();
  q3.setTitle('Q3. After adding NaCl to water containing Pb²⁺, what would you observe and what should you do next?');
  q3.setHelpText('Question ID: g8_c7_w2_s3_q3 | Points: 5 | SEP-3: Planning Investigations');
  q3.setChoices([
    q3.createChoice('Observe bubbles; collect the gas', false),
    q3.createChoice('Observe a white solid forming; filter it out', true),
    q3.createChoice('Observe the water getting hot; cool it down', false),
    q3.createChoice('Observe color change; let it sit overnight', false)
  ]);
  q3.setPoints(5);
  q3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Lead chloride (PbCl₂) is a white solid precipitate. Once it forms, you can filter the water to remove the solid. The filtered water should have significantly less lead! This is real water treatment chemistry.')
      .build()
  );
  q3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Precipitation reactions form solids! PbCl₂ is a white solid that will appear in the water. The next step is filtration - passing the mixture through a filter catches the solid while clean water flows through.')
      .build()
  );

  // Q4: Safety Consideration (5 pts)
  const q4 = form.addMultipleChoiceItem();
  q4.setTitle('Q4. The precipitate (PbCl₂) contains lead, which is toxic. What must be done with this precipitate?');
  q4.setHelpText('Question ID: g8_c7_w2_s3_q4 | Points: 5 | SEP-6: Constructing Explanations');
  q4.setChoices([
    q4.createChoice('Dump it down the drain - it\'s a solid now', false),
    q4.createChoice('Dispose of it as hazardous waste to prevent environmental contamination', true),
    q4.createChoice('Burn it to destroy the lead', false),
    q4.createChoice('Dissolve it again in a different location', false)
  ]);
  q4.setPoints(5);
  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! We\'ve concentrated the lead into a solid, but it\'s still toxic. Hazardous waste disposal ensures the lead is safely contained rather than released into the environment. Real treatment plants do exactly this.')
      .build()
  );
  q4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('We\'ve removed lead from the water, but the lead still exists in the precipitate! It must be disposed of properly as hazardous waste so it doesn\'t contaminate soil, groundwater, or other water sources.')
      .build()
  );

  // Q5: Design Explanation (6 pts)
  const q5 = form.addParagraphTextItem();
  q5.setTitle('Q5. Write the complete balanced equation for removing lead using sodium chloride. Then explain why this process works, using concepts of reaction types and conservation of mass.');
  q5.setHelpText(
    'Question ID: g8_c7_w2_s3_q5 | Points: 6 | SEP-6: Constructing Explanations\n\n' +
    'Rubric:\n' +
    '6 pts: Correct balanced equation (Pb(NO₃)₂ + 2NaCl → PbCl₂ + 2NaNO₃ or similar) + explains double replacement + explains how precipitate removes lead + mentions conservation of mass\n' +
    '5 pts: Correct equation + 2 of 3 explanation elements\n' +
    '4 pts: Nearly correct equation + partial explanation\n' +
    '3 pts: Shows understanding but equation has errors\n' +
    '2 pts: Partial understanding of process\n' +
    '1 pt: Minimal relevant content\n' +
    '0 pts: No response'
  );

  return form;
}

// ═══════════════════════════════════════════════════════════════════════════
// EXIT TICKET: REACTION PATTERNS INTEGRATION (23 pts)
// ═══════════════════════════════════════════════════════════════════════════

function createG8C7W2ExitTicket_() {
  const form = FormApp.create('G8.C7.W2: Exit Ticket - Reaction Patterns Integration');
  form.setDescription(
    'Exit Ticket: Reaction Patterns Integration\n\n' +
    'This exit ticket assesses your understanding of reaction types and balancing, ' +
    'with connections to Week 1 and previous cycles.\n\n' +
    'Total Points: 23\n' +
    'Time: ~15 minutes'
  );
  form.setIsQuiz(true);
  form.setShuffleQuestions(false);

  // NEW Q1: Reaction Type (4 pts)
  const q1 = form.addMultipleChoiceItem();
  q1.setTitle('Q1. (NEW) When calcium carbonate (CaCO₃) is heated, it breaks down into calcium oxide (CaO) and carbon dioxide (CO₂). This is a:');
  q1.setHelpText('Question ID: g8_c7_w2_exit_q1 | Points: 4 | DCI: PS1.B | NEW');
  q1.setChoices([
    q1.createChoice('Synthesis reaction', false),
    q1.createChoice('Decomposition reaction', true),
    q1.createChoice('Single replacement reaction', false),
    q1.createChoice('Combustion reaction', false)
  ]);
  q1.setPoints(4);
  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! One compound breaks down into simpler substances (AB → A + B). CaCO₃ → CaO + CO₂ is decomposition. This is how limestone is converted to quicklime in construction!')
      .build()
  );
  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('When ONE compound breaks apart into TWO or more simpler substances, it\'s decomposition. CaCO₃ → CaO + CO₂ follows the pattern AB → A + B.')
      .build()
  );

  // NEW Q2: Balancing Application (4 pts)
  const q2 = form.addMultipleChoiceItem();
  q2.setTitle('Q2. (NEW) In the balanced equation 2Al + 3CuCl₂ → 2AlCl₃ + 3Cu, what is the total number of chlorine atoms on each side?');
  q2.setHelpText('Question ID: g8_c7_w2_exit_q2 | Points: 4 | SEP-5 | NEW');
  q2.setChoices([
    q2.createChoice('3 on each side', false),
    q2.createChoice('6 on each side', true),
    q2.createChoice('2 on each side', false),
    q2.createChoice('9 on each side', false)
  ]);
  q2.setPoints(4);
  q2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Left: 3CuCl₂ = 3×2 = 6 Cl atoms. Right: 2AlCl₃ = 2×3 = 6 Cl atoms. The equation is balanced - same atoms on both sides!')
      .build()
  );
  q2.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Count carefully: Left has 3CuCl₂, which means 3 molecules × 2 Cl per molecule = 6 Cl. Right has 2AlCl₃, which means 2 molecules × 3 Cl per molecule = 6 Cl. Both sides = 6 chlorine atoms.')
      .build()
  );

  // SPIRAL Q3: Week 1 Evidence (4 pts)
  const q3 = form.addMultipleChoiceItem();
  q3.setTitle('Q3. (SPIRAL - Week 1) A double replacement reaction produces a precipitate. What type of reaction evidence is this?');
  q3.setHelpText('Question ID: g8_c7_w2_exit_q3 | Points: 4 | Spiral: Week 1');
  q3.setChoices([
    q3.createChoice('Color change', false),
    q3.createChoice('Gas production', false),
    q3.createChoice('Precipitate formation', true),
    q3.createChoice('Temperature change', false)
  ]);
  q3.setPoints(4);
  q3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Great spiral connection! A precipitate is a solid forming from liquids - one of the five types of reaction evidence from Week 1. Double replacement reactions often produce precipitates!')
      .build()
  );
  q3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('From Week 1: precipitate formation is when a solid appears from mixing liquids. A precipitate is an insoluble product of a reaction. Double replacement often forms precipitates.')
      .build()
  );

  // SPIRAL Q4: Energy (3 pts)
  const q4 = form.addMultipleChoiceItem();
  q4.setTitle('Q4. (SPIRAL - Cycle 6) Combustion reactions release a lot of energy. Where does this energy come from?');
  q4.setHelpText('Question ID: g8_c7_w2_exit_q4 | Points: 3 | Spiral: Cycle 6 Energy');
  q4.setChoices([
    q4.createChoice('The oxygen molecules breaking apart', false),
    q4.createChoice('The chemical bonds in the fuel storing potential energy', true),
    q4.createChoice('Heat from the environment', false),
    q4.createChoice('Friction between molecules', false)
  ]);
  q4.setPoints(3);
  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct spiral! Chemical potential energy is stored in the bonds of fuel molecules. When bonds break and new bonds form (CO₂, H₂O), the energy released is greater than energy needed, releasing excess as heat and light.')
      .build()
  );
  q4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('From Cycle 6: energy is stored in chemical bonds (chemical potential energy). Fuels like methane have bonds that store a lot of energy. During combustion, this stored energy is released as heat and light.')
      .build()
  );

  // INTEGRATION Q5: Connect Types to Conservation (4 pts)
  const q5 = form.addMultipleChoiceItem();
  q5.setTitle('Q5. (INTEGRATION) How does knowing the reaction type help verify that an equation is balanced correctly?');
  q5.setHelpText('Question ID: g8_c7_w2_exit_q5 | Points: 4 | Integration');
  q5.setChoices([
    q5.createChoice('Reaction types determine what coefficients to use', false),
    q5.createChoice('Each reaction type has a pattern (like A+B→AB) that shows what atoms must be accounted for on each side', true),
    q5.createChoice('Reaction types tell you if the equation needs to be balanced', false),
    q5.createChoice('Balanced equations determine the reaction type', false)
  ]);
  q5.setPoints(4);
  q5.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Excellent integration! Reaction types give you a template: synthesis (A+B→AB) tells you products will combine reactant atoms, decomposition (AB→A+B) tells you products will have the atoms from the original compound. This helps you predict and verify!')
      .build()
  );
  q5.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Reaction types provide patterns that help predict products. Synthesis combines atoms, decomposition separates them, replacement swaps them. Knowing the pattern helps you predict what atoms should appear where - making balancing easier!')
      .build()
  );

  // SEP Q6: Construct Explanation (4 pts)
  const q6 = form.addMultipleChoiceItem();
  q6.setTitle('Q6. (SEP-6) A student claims: "In single replacement, only one type of atom is conserved." Is this correct? Explain.');
  q6.setHelpText('Question ID: g8_c7_w2_exit_q6 | Points: 4 | SEP-6: Constructing Explanations');
  q6.setChoices([
    q6.createChoice('Correct - only the replaced element is conserved', false),
    q6.createChoice('Incorrect - ALL atoms are conserved in every chemical reaction', true),
    q6.createChoice('Correct - the other atoms are converted to energy', false),
    q6.createChoice('Incorrect - no atoms are conserved, they are all new', false)
  ]);
  q6.setPoints(4);
  q6.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Conservation of mass applies to ALL reactions - every atom that enters must exit. In single replacement A + BC → AC + B, count: atoms of A, B, and C are all conserved - just rearranged into new combinations.')
      .build()
  );
  q6.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Conservation of mass ALWAYS applies. In A + BC → AC + B, ALL atoms (A, B, and C) are conserved. "Single replacement" describes HOW atoms rearrange, not which ones are conserved. All atoms are always conserved.')
      .build()
  );

  return form;
}

// ═══════════════════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

function testG8C7W2Forms_() {
  Logger.log('Testing G8 C7 W2 form creation...');
  const forms = createAllG8C7W2Forms();
  forms.forEach((form, index) => {
    Logger.log('Form ' + (index + 1) + ': ' + form.getTitle());
    Logger.log('  URL: ' + form.getEditUrl());
  });
  Logger.log('Test complete');
}

function getG8C7W2FormUrls_() {
  return {
    hook: 'FORM_URL_HERE',
    station1: 'FORM_URL_HERE',
    station2: 'FORM_URL_HERE',
    station3: 'FORM_URL_HERE',
    exitTicket: 'FORM_URL_HERE'
  };
}
