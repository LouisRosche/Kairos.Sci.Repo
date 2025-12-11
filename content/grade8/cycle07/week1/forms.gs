/**
 * ═══════════════════════════════════════════════════════════════════════════
 * GRADE 8 CYCLE 7 WEEK 1: EVIDENCE OF CHEMICAL REACTIONS
 * The Fading Glow Mystery - Chemical Reactions & Conservation
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * NGSS Standards: MS-PS1-2 (Primary), MS-PS2-3 & MS-PS4-2 (Spiral)
 * Duration: 2 days (~75 min each)
 * Total Points: 100
 *
 * Station Structure:
 * - Hook: 12 pts (The Fading Glow Mystery)
 * - Station 1: 20 pts (Reaction Evidence Lab)
 * - Station 2: 20 pts (Mass Conservation Investigation)
 * - Station 3: 25 pts (Design a Reaction Detector)
 * - Exit Ticket: 23 pts (Reaction Evidence Integration)
 *
 * ═══════════════════════════════════════════════════════════════════════════
 */

// ═══════════════════════════════════════════════════════════════════════════
// MAIN ORCHESTRATION FUNCTION
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Creates all Week 1 forms for Grade 8 Cycle 7
 * Run this function to generate all forms for the week
 */
function createAllG8C7W1Forms() {
  const forms = [];

  try {
    Logger.log('Creating G8 C7 W1 Forms: Evidence of Chemical Reactions');

    forms.push(createG8C7W1Hook_());
    Logger.log('✓ Hook created');

    forms.push(createG8C7W1Station1_());
    Logger.log('✓ Station 1 created');

    forms.push(createG8C7W1Station2_());
    Logger.log('✓ Station 2 created');

    forms.push(createG8C7W1Station3_());
    Logger.log('✓ Station 3 created');

    forms.push(createG8C7W1ExitTicket_());
    Logger.log('✓ Exit Ticket created');

    Logger.log('═══════════════════════════════════════════════════');
    Logger.log('All G8 C7 W1 forms created successfully!');
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
// HOOK: THE FADING GLOW MYSTERY (12 pts)
// ═══════════════════════════════════════════════════════════════════════════

function createG8C7W1Hook_() {
  const form = FormApp.create('G8.C7.W1: Hook - The Fading Glow Mystery');
  form.setDescription(
    'The Fading Glow Mystery\n\n' +
    'Crack a glow stick and it lights up—no batteries, no electricity, just a bright glow ' +
    'that slowly fades over hours until it\'s completely dark. What\'s happening inside?\n\n' +
    'Total Points: 12\n' +
    'Driving Question: Why do glow sticks eventually stop glowing?'
  );
  form.setIsQuiz(true);
  form.setShuffleQuestions(false);

  // Q1: Phenomenon Observation (2 pts)
  const q1 = form.addMultipleChoiceItem();
  q1.setTitle('Q1. When you crack a glow stick, light appears immediately. Based on this observation, which statement is most likely TRUE?');
  q1.setHelpText('Question ID: g8_c7_w1_hook_q1 | Points: 2 | DCI: PS1.B');
  q1.setChoices([
    q1.createChoice('The light comes from a battery hidden inside', false),
    q1.createChoice('A chemical reaction is releasing energy as light', true),
    q1.createChoice('The plastic tube is heating up and glowing', false),
    q1.createChoice('The glow stick is reflecting light from the room', false)
  ]);
  q1.setPoints(2);
  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Glow sticks use chemiluminescence - a chemical reaction that releases energy directly as light without heat. When you crack the stick, you mix two chemicals that react and release light energy.')
      .build()
  );
  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Think about what happens when you crack the stick. You feel something break inside and liquids mix. The light appears from a chemical reaction releasing energy, not from batteries or heat.')
      .build()
  );

  // Q2: Why Fading? (3 pts)
  const q2 = form.addMultipleChoiceItem();
  q2.setTitle('Q2. After several hours, a glow stick becomes dim and eventually dark. What is the best explanation for this?');
  q2.setHelpText('Question ID: g8_c7_w1_hook_q2 | Points: 3 | DCI: PS1.B');
  q2.setChoices([
    q2.createChoice('The chemicals that react to produce light have been used up', true),
    q2.createChoice('The battery inside has run out of charge', false),
    q2.createChoice('The light is escaping through holes in the plastic', false),
    q2.createChoice('The glow stick has cooled down too much', false)
  ]);
  q2.setPoints(3);
  q2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Exactly! The reactants - the chemicals that react together - are being converted into products. Once the reactants are used up, the reaction stops and no more light is produced. This is a key property of chemical reactions.')
      .build()
  );
  q2.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Glow sticks don\'t have batteries! The light comes from a chemical reaction. When a reaction stops, it usually means the reactants (starting materials) have been converted into products (new substances).')
      .build()
  );

  // Q3: Prior Knowledge - Energy (2 pts)
  const q3 = form.addMultipleChoiceItem();
  q3.setTitle('Q3. We studied energy transformation in Cycle 6. In a glow stick, what energy transformation is occurring?');
  q3.setHelpText('Question ID: g8_c7_w1_hook_q3 | Points: 2 | Spiral: Cycle 6 - Energy');
  q3.setChoices([
    q3.createChoice('Electrical energy → light energy', false),
    q3.createChoice('Chemical potential energy → light energy', true),
    q3.createChoice('Heat energy → light energy', false),
    q3.createChoice('Kinetic energy → light energy', false)
  ]);
  q3.setPoints(2);
  q3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Great spiral connection! Chemical potential energy stored in the molecular bonds of the reactants is transformed into light energy during the reaction. This is different from incandescent bulbs (electrical → heat → light).')
      .build()
  );
  q3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Remember from Cycle 6: energy can be stored in chemical bonds (chemical potential energy). When bonds break and new ones form in a reaction, this stored energy can be released as light, heat, or other forms.')
      .build()
  );

  // Q4: Cannot Recharge (3 pts)
  const q4 = form.addMultipleChoiceItem();
  q4.setTitle('Q4. Unlike a rechargeable battery, you cannot "recharge" a glow stick to make it glow again. Why not?');
  q4.setHelpText('Question ID: g8_c7_w1_hook_q4 | Points: 3 | SEP-6: Constructing Explanations');
  q4.setChoices([
    q4.createChoice('The plastic container is damaged after use', false),
    q4.createChoice('The chemicals have been permanently changed into different substances', true),
    q4.createChoice('The light escapes and cannot be put back', false),
    q4.createChoice('Glow sticks are designed to be disposable for safety', false)
  ]);
  q4.setPoints(3);
  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! In a chemical reaction, reactants are converted into products - completely different substances. The original chemicals are gone and have been transformed into new molecules that don\'t glow. This is irreversible.')
      .build()
  );
  q4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('The key is understanding chemical reactions: the original substances (reactants) are permanently changed into new substances (products). Once the glow stick chemicals react, they form new molecules. You can\'t "un-react" them.')
      .build()
  );

  // Q5: Prediction (2 pts)
  const q5 = form.addMultipleChoiceItem();
  q5.setTitle('Q5. If you put a glow stick in the freezer right after cracking it, what would you expect to happen?');
  q5.setHelpText('Question ID: g8_c7_w1_hook_q5 | Points: 2 | SEP-6: Constructing Explanations');
  q5.setChoices([
    q5.createChoice('It would glow brighter because cold makes reactions faster', false),
    q5.createChoice('It would stop glowing completely and never work again', false),
    q5.createChoice('It would glow dimmer but last much longer', true),
    q5.createChoice('Nothing would change because it\'s already activated', false)
  ]);
  q5.setPoints(2);
  q5.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct prediction! Cold temperatures slow down chemical reactions. The glow stick would be dimmer (reaction happening slower) but would last much longer (reactants used up more slowly). This is a testable hypothesis!')
      .build()
  );
  q5.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Temperature affects reaction rate! Cold temperatures slow reactions (molecules move slower, collide less often). The glow would be dimmer but last longer. Heat would make it brighter but burn out faster.')
      .build()
  );

  return form;
}

// ═══════════════════════════════════════════════════════════════════════════
// STATION 1: REACTION EVIDENCE LAB (20 pts)
// ═══════════════════════════════════════════════════════════════════════════

function createG8C7W1Station1_() {
  const form = FormApp.create('G8.C7.W1: Station 1 - Reaction Evidence Lab');
  form.setDescription(
    'Reaction Evidence Lab\n\n' +
    'Scientists identify chemical reactions by looking for specific types of evidence. ' +
    'In this station, you\'ll learn to identify the five main types of evidence that indicate ' +
    'a chemical reaction has occurred.\n\n' +
    'Total Points: 20\n' +
    'Time: ~18 minutes'
  );
  form.setIsQuiz(true);
  form.setShuffleQuestions(false);

  // Q1: Evidence Types (3 pts)
  const q1 = form.addMultipleChoiceItem();
  q1.setTitle('Q1. Which of the following is NOT typically evidence of a chemical reaction?');
  q1.setHelpText('Question ID: g8_c7_w1_s1_q1 | Points: 3 | DCI: PS1.B');
  q1.setChoices([
    q1.createChoice('Color change', false),
    q1.createChoice('Gas bubbles produced', false),
    q1.createChoice('Change in shape only', true),
    q1.createChoice('Temperature change', false)
  ]);
  q1.setPoints(3);
  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! A change in shape alone (like crushing a can) is a physical change - the substance is still the same material. Chemical reactions produce new substances, evidenced by: color change, gas production, temperature change, precipitate formation, or light production.')
      .build()
  );
  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('The five types of chemical reaction evidence are: (1) Color change, (2) Gas production (bubbles), (3) Temperature change (hot/cold), (4) Precipitate formation (solid appears), (5) Light production. Shape change alone is physical.')
      .build()
  );

  // Q2: Color Change Evidence (3 pts)
  const q2 = form.addMultipleChoiceItem();
  q2.setTitle('Q2. A clear liquid is added to another clear liquid and the mixture turns pink. This color change indicates:');
  q2.setHelpText('Question ID: g8_c7_w1_s1_q2 | Points: 3 | DCI: PS1.A');
  q2.setChoices([
    q2.createChoice('The liquids are mixing (physical change)', false),
    q2.createChoice('A new substance with different properties is forming (chemical change)', true),
    q2.createChoice('Light is being absorbed differently', false),
    q2.createChoice('Temperature is changing in the mixture', false)
  ]);
  q2.setPoints(3);
  q2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! When a new color appears that wasn\'t present in either original substance, it suggests a new substance with new properties has formed. The pink color indicates a chemical reaction has produced a new compound.')
      .build()
  );
  q2.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('When neither original liquid was pink, but the mixture becomes pink, a new substance must have formed with different light-absorbing properties. This is evidence of a chemical reaction, not just mixing.')
      .build()
  );

  // Q3: Chemical vs Physical (4 pts)
  const q3 = form.addMultipleChoiceItem();
  q3.setTitle('Q3. You observe bubbles forming when you add a substance to water. How can you tell if this is a chemical reaction (producing gas) or just air escaping?');
  q3.setHelpText('Question ID: g8_c7_w1_s1_q3 | Points: 4 | SEP-4: Analyzing Data');
  q3.setChoices([
    q3.createChoice('Chemical reaction bubbles always rise faster than air bubbles', false),
    q3.createChoice('Chemical reaction bubbles continue over time; trapped air escapes quickly and stops', true),
    q3.createChoice('Air bubbles are larger than chemical reaction bubbles', false),
    q3.createChoice('There is no way to distinguish between them', false)
  ]);
  q3.setPoints(4);
  q3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Excellent analysis! Trapped air escapes quickly when dissolved, then stops. Chemical reactions continuously produce gas as long as reactants remain. Other clues: chemical reactions may also show temperature change, color change, or smell.')
      .build()
  );
  q3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('The key difference is duration and pattern: trapped air bubbles escape quickly then stop. Chemical reactions produce gas continuously as new molecules form. Also, chemical reactions often show other evidence (heat, color change).')
      .build()
  );

  // Q4: Precipitate Formation (3 pts)
  const q4 = form.addMultipleChoiceItem();
  q4.setTitle('Q4. Two clear solutions are mixed and a white solid suddenly appears in the liquid. This solid is called a:');
  q4.setHelpText('Question ID: g8_c7_w1_s1_q4 | Points: 3 | DCI: PS1.B');
  q4.setChoices([
    q4.createChoice('Solute', false),
    q4.createChoice('Precipitate', true),
    q4.createChoice('Catalyst', false),
    q4.createChoice('Reactant', false)
  ]);
  q4.setPoints(3);
  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! A precipitate is a solid that forms from a solution during a chemical reaction. The dissolved substances react to form a new compound that is insoluble (doesn\'t dissolve), so it appears as a solid.')
      .build()
  );
  q4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('When a solid suddenly appears from clear liquids, it\'s called a precipitate. This is strong evidence of a chemical reaction - two dissolved substances have reacted to form a new, insoluble compound.')
      .build()
  );

  // Q5: Exothermic/Endothermic (4 pts)
  const q5 = form.addMultipleChoiceItem();
  q5.setTitle('Q5. When baking soda is added to vinegar, the mixture feels cold to the touch. This type of reaction is called:');
  q5.setHelpText('Question ID: g8_c7_w1_s1_q5 | Points: 4 | DCI: PS1.B + CCC-5: Energy');
  q5.setChoices([
    q5.createChoice('Exothermic - releasing heat energy', false),
    q5.createChoice('Endothermic - absorbing heat energy', true),
    q5.createChoice('Isothermic - no energy change', false),
    q5.createChoice('Chemothermic - converting to chemical energy', false)
  ]);
  q5.setPoints(4);
  q5.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Endothermic reactions absorb energy from their surroundings (the heat from your hand), making things feel cold. The reaction needs more energy to break bonds than it releases when forming new bonds.')
      .build()
  );
  q5.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('When a reaction feels cold, it\'s absorbing heat energy from the surroundings - this is endothermic (endo = in). Exothermic reactions release heat and feel warm (exo = out).')
      .build()
  );

  // Q6: Applying Evidence (3 pts)
  const q6 = form.addMultipleChoiceItem();
  q6.setTitle('Q6. You\'re testing if a mystery powder is baking soda. You add vinegar and observe: bubbles form, the mixture gets cold, and no color change occurs. How many types of chemical reaction evidence did you observe?');
  q6.setHelpText('Question ID: g8_c7_w1_s1_q6 | Points: 3 | SEP-4: Analyzing Data');
  q6.setChoices([
    q6.createChoice('1 type (bubbles)', false),
    q6.createChoice('2 types (bubbles and temperature change)', true),
    q6.createChoice('3 types (bubbles, temperature, and no color change)', false),
    q6.createChoice('0 types (vinegar always bubbles)', false)
  ]);
  q6.setPoints(3);
  q6.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! You observed: (1) gas production (bubbles) and (2) temperature change (cold = endothermic). "No color change" is the absence of evidence, not evidence itself. Two types of evidence is sufficient to confirm a chemical reaction.')
      .build()
  );
  q6.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Count only the evidence you observed: bubbles = gas production (1 type), cold feeling = temperature change (1 type). No color change is absence of evidence, not a third type. Total = 2 types of evidence.')
      .build()
  );

  return form;
}

// ═══════════════════════════════════════════════════════════════════════════
// STATION 2: MASS CONSERVATION INVESTIGATION (20 pts)
// ═══════════════════════════════════════════════════════════════════════════

function createG8C7W1Station2_() {
  const form = FormApp.create('G8.C7.W1: Station 2 - Mass Conservation Investigation');
  form.setDescription(
    'Mass Conservation Investigation\n\n' +
    'One of the most fundamental laws in chemistry is the Law of Conservation of Mass: ' +
    'mass is neither created nor destroyed in a chemical reaction. In this station, ' +
    'you\'ll investigate this law through experiments and data analysis.\n\n' +
    'Total Points: 20\n' +
    'Time: ~15 minutes'
  );
  form.setIsQuiz(true);
  form.setShuffleQuestions(false);

  // Q1: Conservation Principle (3 pts)
  const q1 = form.addMultipleChoiceItem();
  q1.setTitle('Q1. The Law of Conservation of Mass states that in a chemical reaction:');
  q1.setHelpText('Question ID: g8_c7_w1_s2_q1 | Points: 3 | DCI: PS1.B');
  q1.setChoices([
    q1.createChoice('Mass is converted to energy', false),
    q1.createChoice('Mass of reactants equals mass of products', true),
    q1.createChoice('Mass increases as new substances form', false),
    q1.createChoice('Mass decreases as energy is released', false)
  ]);
  q1.setPoints(3);
  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! The total mass of all reactants equals the total mass of all products. Atoms are rearranged, not created or destroyed, so the total mass remains constant.')
      .build()
  );
  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Conservation of mass means the total mass before a reaction equals the total mass after. No atoms are created or destroyed - they are just rearranged into new molecules.')
      .build()
  );

  // Q2: Data Analysis - Sealed System (4 pts)
  const q2 = form.addMultipleChoiceItem();
  q2.setTitle('Q2. A sealed container weighs 150.0 g before a chemical reaction. After the reaction (gas is produced inside but can\'t escape), what should the container weigh?');
  q2.setHelpText('Question ID: g8_c7_w1_s2_q2 | Points: 4 | SEP-4: Analyzing Data');
  q2.setChoices([
    q2.createChoice('Less than 150.0 g because energy was released', false),
    q2.createChoice('More than 150.0 g because a new substance formed', false),
    q2.createChoice('Exactly 150.0 g because mass is conserved', true),
    q2.createChoice('Cannot be determined without knowing the chemicals', false)
  ]);
  q2.setPoints(4);
  q2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Exactly! In a sealed system, mass is always conserved. Even though gas formed, it\'s still inside the container. No matter leaves, so the mass stays exactly the same.')
      .build()
  );
  q2.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('In a sealed container, nothing can enter or leave. The same atoms that were there before the reaction are still there after - just rearranged. Total mass must equal 150.0 g regardless of what reactions occur inside.')
      .build()
  );

  // Q3: Open vs Sealed Systems (4 pts)
  const q3 = form.addMultipleChoiceItem();
  q3.setTitle('Q3. Baking soda + vinegar in an open beaker weighs 50.0 g before mixing. After the reaction, the beaker weighs 48.5 g. What happened to the "missing" mass?');
  q3.setHelpText('Question ID: g8_c7_w1_s2_q3 | Points: 4 | SEP-6: Constructing Explanations');
  q3.setChoices([
    q3.createChoice('Mass was destroyed during the chemical reaction', false),
    q3.createChoice('The mass was converted to energy (heat and sound)', false),
    q3.createChoice('Carbon dioxide gas escaped into the air', true),
    q3.createChoice('Some of the liquid evaporated during the reaction', false)
  ]);
  q3.setPoints(4);
  q3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! The reaction produces CO₂ gas, which escapes into the air. If you weighed ALL the products (including the escaped gas), the total would still equal the original mass. Mass appears "lost" only because gas escaped the open system.')
      .build()
  );
  q3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Mass is never destroyed! In an open container, gas products can escape. The baking soda + vinegar reaction produces CO₂ gas (the bubbles you see). This gas has mass, and when it escapes, the remaining mass is less.')
      .build()
  );

  // Q4: Atomic Level Understanding (4 pts)
  const q4 = form.addMultipleChoiceItem();
  q4.setTitle('Q4. During a chemical reaction, atoms are:');
  q4.setHelpText('Question ID: g8_c7_w1_s2_q4 | Points: 4 | DCI: PS1.B');
  q4.setChoices([
    q4.createChoice('Created from energy', false),
    q4.createChoice('Destroyed and converted to energy', false),
    q4.createChoice('Rearranged into new combinations', true),
    q4.createChoice('Split into smaller particles', false)
  ]);
  q4.setPoints(4);
  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Exactly! Chemical reactions rearrange atoms - they break bonds between atoms and form new bonds in different arrangements. The same atoms that go in come out, just connected differently. This is why mass is conserved.')
      .build()
  );
  q4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('In chemical reactions (not nuclear reactions), atoms are never created or destroyed. They are rearranged - old bonds break and new bonds form, creating new molecules from the same atoms.')
      .build()
  );

  // Q5: Real-World Application (5 pts)
  const q5 = form.addMultipleChoiceItem();
  q5.setTitle('Q5. A log weighing 5 kg is burned in a fire. After burning, only 0.1 kg of ash remains. Based on conservation of mass, what can you conclude?');
  q5.setHelpText('Question ID: g8_c7_w1_s2_q5 | Points: 5 | SEP-6: Constructing Explanations');
  q5.setChoices([
    q5.createChoice('4.9 kg of mass was destroyed by the fire', false),
    q5.createChoice('4.9 kg of mass escaped as gases (CO₂, H₂O vapor, etc.)', true),
    q5.createChoice('4.9 kg of mass was converted entirely to heat energy', false),
    q5.createChoice('Conservation of mass doesn\'t apply to burning', false)
  ]);
  q5.setPoints(5);
  q5.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Excellent reasoning! When wood burns, carbon atoms combine with oxygen to form CO₂ gas, and hydrogen atoms combine with oxygen to form H₂O vapor. These gases escape into the air, carrying away mass. If you captured ALL products, they\'d weigh more than 5 kg (original wood + oxygen used)!')
      .build()
  );
  q5.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Mass cannot be destroyed! When wood burns, most of it combines with oxygen from the air and escapes as gases (CO₂ and water vapor). The ash is just the non-combustible minerals. If you weighed ALL products + gases, mass is conserved.')
      .build()
  );

  return form;
}

// ═══════════════════════════════════════════════════════════════════════════
// STATION 3: DESIGN A REACTION DETECTOR (25 pts)
// ═══════════════════════════════════════════════════════════════════════════

function createG8C7W1Station3_() {
  const form = FormApp.create('G8.C7.W1: Station 3 - Design a Reaction Detector');
  form.setDescription(
    'Design a Reaction Detector\n\n' +
    'Apply your knowledge of chemical reaction evidence to solve a real-world problem. ' +
    'A food company needs your help designing a system to detect when food has spoiled.\n\n' +
    'Total Points: 25\n' +
    'Time: ~20 minutes'
  );
  form.setIsQuiz(true);
  form.setShuffleQuestions(false);

  // Q1: Understanding the Problem (4 pts)
  const q1 = form.addMultipleChoiceItem();
  q1.setTitle('Q1. Milk spoilage is caused by bacteria that convert lactose (milk sugar) into lactic acid. This is an example of:');
  q1.setHelpText('Question ID: g8_c7_w1_s3_q1 | Points: 4 | DCI: PS1.B');
  q1.setChoices([
    q1.createChoice('A physical change - the milk just gets thicker', false),
    q1.createChoice('A chemical reaction - a new substance (lactic acid) is produced', true),
    q1.createChoice('Phase change - liquid to solid', false),
    q1.createChoice('Evaporation - water leaves the milk', false)
  ]);
  q1.setPoints(4);
  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Bacteria chemically convert lactose (one substance) into lactic acid (a different substance with different properties). This is definitely a chemical reaction - new molecules with new properties are formed.')
      .build()
  );
  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('When lactose molecules are converted into lactic acid molecules, that\'s a chemical reaction - the original substance is transformed into a completely different substance with different properties (taste, pH, etc.).')
      .build()
  );

  // Q2: Selecting Evidence Type (5 pts)
  const q2 = form.addMultipleChoiceItem();
  q2.setTitle('Q2. Lactic acid production during spoilage changes the milk\'s pH from about 6.6 (fresh) to about 4.5 (spoiled). Which type of reaction evidence would be most useful for detecting spoilage?');
  q2.setHelpText('Question ID: g8_c7_w1_s3_q2 | Points: 5 | SEP-3: Planning Investigations');
  q2.setChoices([
    q2.createChoice('Temperature change', false),
    q2.createChoice('Gas production', false),
    q2.createChoice('Color change using a pH indicator', true),
    q2.createChoice('Precipitate formation', false)
  ]);
  q2.setPoints(5);
  q2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Excellent choice! pH indicators change color at specific pH values. A color-changing indicator that responds to the pH drop from 6.6 to 4.5 could visually show consumers when milk has spoiled. This is practical and easy to read.')
      .build()
  );
  q2.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Since the main measurable change is pH (acidity increase), we need something that responds to pH. pH indicators are chemicals that change color at specific pH values - perfect for this application!')
      .build()
  );

  // Q3: Design Constraints (5 pts)
  const q3 = form.addMultipleChoiceItem();
  q3.setTitle('Q3. A good spoilage detector for a milk carton should have all of the following properties EXCEPT:');
  q3.setHelpText('Question ID: g8_c7_w1_s3_q3 | Points: 5 | SEP-3: Planning Investigations');
  q3.setChoices([
    q3.createChoice('Food-safe materials that won\'t contaminate the milk', false),
    q3.createChoice('Clear visual change that consumers can easily see', false),
    q3.createChoice('Must touch and mix with the milk to work', true),
    q3.createChoice('Works reliably over the product\'s shelf life', false)
  ]);
  q3.setPoints(5);
  q3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! A good food safety indicator should NOT require contact with the food (contamination risk). Smart indicators often detect gases released by spoiled food or use sealed sensors that respond to conditions inside the package without direct contact.')
      .build()
  );
  q3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Food safety is critical! A detector that must mix with food could contaminate it. Better designs detect changes without direct contact - like sensing gases released through the container or using sealed pH sensors.')
      .build()
  );

  // Q4: Real Technology (5 pts)
  const q4 = form.addMultipleChoiceItem();
  q4.setTitle('Q4. Some real spoilage indicators use a sealed strip that changes from green to yellow as acid levels increase inside the container. This works because:');
  q4.setHelpText('Question ID: g8_c7_w1_s3_q4 | Points: 5 | SEP-6: Constructing Explanations');
  q4.setChoices([
    q4.createChoice('Yellow is the color of spoiled food', false),
    q4.createChoice('The strip contains a pH-sensitive dye that responds to acidic gases', true),
    q4.createChoice('Light from outside makes the strip change color over time', false),
    q4.createChoice('Temperature changes cause the color shift', false)
  ]);
  q4.setPoints(5);
  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Exactly! The strip contains a pH-sensitive dye (indicator). As spoilage produces acids, acidic gases or vapor inside the container reach the indicator strip and trigger a color change. The sealed barrier prevents contamination while allowing detection.')
      .build()
  );
  q4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('The key is pH-sensitive chemistry. Spoilage produces acids, which create acidic conditions (gases/vapors) inside the sealed container. A pH indicator in the strip responds to these conditions by changing color.')
      .build()
  );

  // Q5: Design Evaluation (6 pts)
  const q5 = form.addParagraphTextItem();
  q5.setTitle('Q5. Design your own milk spoilage detector. Your design must: (1) Use at least one type of reaction evidence, (2) Be food-safe, (3) Give a clear visual signal. Describe your design and explain how it works using chemistry concepts.');
  q5.setHelpText(
    'Question ID: g8_c7_w1_s3_q5 | Points: 6 | SEP-3 + SEP-6\n\n' +
    'Rubric:\n' +
    '6 pts: Complete design with evidence type, food safety solution, visual signal, and clear chemistry explanation\n' +
    '5 pts: Complete design with 3 of 4 elements well-explained\n' +
    '4 pts: Design addresses requirements but chemistry explanation incomplete\n' +
    '3 pts: Basic design idea with some scientific reasoning\n' +
    '2 pts: Partial design or significant gaps in explanation\n' +
    '1 pt: Attempt made but design unclear or missing key elements\n' +
    '0 pts: No response'
  );

  return form;
}

// ═══════════════════════════════════════════════════════════════════════════
// EXIT TICKET: REACTION EVIDENCE INTEGRATION (23 pts)
// ═══════════════════════════════════════════════════════════════════════════

function createG8C7W1ExitTicket_() {
  const form = FormApp.create('G8.C7.W1: Exit Ticket - Reaction Evidence Integration');
  form.setDescription(
    'Exit Ticket: Reaction Evidence Integration\n\n' +
    'This exit ticket assesses your understanding of chemical reaction evidence ' +
    'and mass conservation, with connections to previous cycles.\n\n' +
    'Total Points: 23\n' +
    'Time: ~15 minutes'
  );
  form.setIsQuiz(true);
  form.setShuffleQuestions(false);

  // NEW Q1: Reaction Evidence (4 pts)
  const q1 = form.addMultipleChoiceItem();
  q1.setTitle('Q1. (NEW) An antacid tablet dropped in water fizzes and the water gets cold. How many types of chemical reaction evidence are present?');
  q1.setHelpText('Question ID: g8_c7_w1_exit_q1 | Points: 4 | DCI: PS1.B | NEW');
  q1.setChoices([
    q1.createChoice('1 type', false),
    q1.createChoice('2 types', true),
    q1.createChoice('3 types', false),
    q1.createChoice('0 types - this is a physical change', false)
  ]);
  q1.setPoints(4);
  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Two types: (1) Gas production (fizzing/bubbles) and (2) Temperature change (cold = endothermic). These indicate a chemical reaction is occurring - the tablet\'s ingredients are reacting with water.')
      .build()
  );
  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Count the evidence types: Fizzing = gas production (type 1). Cold temperature = temperature change (type 2). That\'s 2 types of chemical reaction evidence.')
      .build()
  );

  // NEW Q2: Mass Conservation (4 pts)
  const q2 = form.addMultipleChoiceItem();
  q2.setTitle('Q2. (NEW) Steel wool weighs 5.0 g. After burning in air, the resulting rust weighs 7.0 g. Does this violate conservation of mass? Explain.');
  q2.setHelpText('Question ID: g8_c7_w1_exit_q2 | Points: 4 | DCI: PS1.B | NEW');
  q2.setChoices([
    q2.createChoice('Yes - mass was created during the reaction', false),
    q2.createChoice('No - oxygen from the air combined with the iron, adding mass', true),
    q2.createChoice('Yes - burning always creates new matter', false),
    q2.createChoice('No - the extra mass is from heat energy converting to matter', false)
  ]);
  q2.setPoints(4);
  q2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Excellent! The iron in steel wool combines with oxygen from the air: 4Fe + 3O₂ → 2Fe₂O₃. The "extra" 2.0 g is the mass of oxygen that combined with the iron. Total mass (iron + oxygen) is conserved!')
      .build()
  );
  q2.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Mass is always conserved! When steel wool rusts (burns slowly), iron atoms combine with oxygen atoms from the air. The increased mass comes from the oxygen that joined with the iron. Iron + Oxygen → Iron oxide (rust).')
      .build()
  );

  // SPIRAL Q3: Energy Transformation (4 pts)
  const q3 = form.addMultipleChoiceItem();
  q3.setTitle('Q3. (SPIRAL - Cycle 6) A hand warmer packet gets hot when activated. The energy transformation is:');
  q3.setHelpText('Question ID: g8_c7_w1_exit_q3 | Points: 4 | Spiral: Cycle 6 Energy');
  q3.setChoices([
    q3.createChoice('Kinetic energy → thermal energy', false),
    q3.createChoice('Chemical potential energy → thermal energy', true),
    q3.createChoice('Electrical energy → thermal energy', false),
    q3.createChoice('Nuclear energy → thermal energy', false)
  ]);
  q3.setPoints(4);
  q3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct spiral connection! Hand warmers use an exothermic chemical reaction (often iron oxidation). Chemical potential energy stored in molecular bonds is released as thermal (heat) energy during the reaction.')
      .build()
  );
  q3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Hand warmers work through chemical reactions! The reactants have stored chemical potential energy in their molecular bonds. During the reaction, this energy is released as heat (thermal energy).')
      .build()
  );

  // SPIRAL Q4: Light Waves (3 pts)
  const q4 = form.addMultipleChoiceItem();
  q4.setTitle('Q4. (SPIRAL - Cycle 5) A glow stick produces green light. This means the reaction releases energy in the form of:');
  q4.setHelpText('Question ID: g8_c7_w1_exit_q4 | Points: 3 | Spiral: Cycle 5 Waves');
  q4.setChoices([
    q4.createChoice('Sound waves with green frequency', false),
    q4.createChoice('Electromagnetic waves with a specific wavelength', true),
    q4.createChoice('Heat radiation that appears green', false),
    q4.createChoice('Particles of green color', false)
  ]);
  q4.setPoints(3);
  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Great connection to Cycle 5! Light is an electromagnetic wave. The green color corresponds to a specific wavelength (~520 nm). The chemical reaction releases energy at this exact wavelength - that\'s chemiluminescence!')
      .build()
  );
  q4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Remember from Cycle 5: light is an electromagnetic wave! Different colors correspond to different wavelengths. Green light has a specific wavelength. The chemical reaction releases energy exactly matching that wavelength.')
      .build()
  );

  // INTEGRATION Q5: Connect Evidence to Energy (4 pts)
  const q5 = form.addMultipleChoiceItem();
  q5.setTitle('Q5. (INTEGRATION) A chemical reaction produces light and the container feels warm. This tells us:');
  q5.setHelpText('Question ID: g8_c7_w1_exit_q5 | Points: 4 | Integration');
  q5.setChoices([
    q5.createChoice('Two different reactions are happening', false),
    q5.createChoice('Energy is released as both light and heat (exothermic)', true),
    q5.createChoice('Mass is being converted to energy', false),
    q5.createChoice('The reaction is both endothermic and exothermic', false)
  ]);
  q5.setPoints(4);
  q5.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Excellent integration! One exothermic reaction can release energy in multiple forms simultaneously - both light and heat. The chemical potential energy is transformed into different types of energy as bonds break and form.')
      .build()
  );
  q5.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Exothermic reactions release energy, which can take multiple forms. A single reaction can produce both light energy AND heat energy - like a burning candle or some chemiluminescent reactions that also release heat.')
      .build()
  );

  // SEP Q6: Analyze Data (4 pts)
  const q6 = form.addMultipleChoiceItem();
  q6.setTitle('Q6. (SEP-4) A student measures mass before and after a reaction in an open beaker: Before = 25.0 g, After = 24.2 g. They conclude "mass was destroyed." Evaluate this conclusion.');
  q6.setHelpText('Question ID: g8_c7_w1_exit_q6 | Points: 4 | SEP-4: Analyzing Data');
  q6.setChoices([
    q6.createChoice('The conclusion is correct - reactions can destroy mass', false),
    q6.createChoice('The conclusion is incorrect - gas likely escaped the open beaker', true),
    q6.createChoice('The conclusion is correct - energy release caused mass loss', false),
    q6.createChoice('More data is needed - the measurement might be wrong', false)
  ]);
  q6.setPoints(4);
  q6.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct analysis! Mass is never destroyed. In an open system, gas products can escape. The "missing" 0.8 g is gas that left the beaker. If the experiment used a sealed container, before and after masses would be equal.')
      .build()
  );
  q6.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('The Law of Conservation of Mass is never violated! When mass appears to decrease in an open container, gas products have escaped. A proper test would use a sealed container where no matter can leave.')
      .build()
  );

  return form;
}

// ═══════════════════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Test function to validate form creation
 */
function testG8C7W1Forms_() {
  Logger.log('Testing G8 C7 W1 form creation...');

  const forms = createAllG8C7W1Forms();

  forms.forEach((form, index) => {
    Logger.log('Form ' + (index + 1) + ': ' + form.getTitle());
    Logger.log('  URL: ' + form.getEditUrl());
  });

  Logger.log('Test complete - check forms in Google Drive');
}

/**
 * Get form URLs for embedding in student page
 */
function getG8C7W1FormUrls_() {
  return {
    hook: 'FORM_URL_HERE',
    station1: 'FORM_URL_HERE',
    station2: 'FORM_URL_HERE',
    station3: 'FORM_URL_HERE',
    exitTicket: 'FORM_URL_HERE'
  };
}
