/**
 * ═══════════════════════════════════════════════════════════════════════════
 * GRADE 7 CYCLE 7 WEEK 3: SYNTHESIS & ASSESSMENT
 * Earth's History - Cumulative Assessment
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * NGSS Standards: MS-ESS1-4 (Primary), MS-ESS2-2, MS-ESS2-5 (Spiral)
 * Duration: 2 days (~75 min each)
 * Total Points: 100
 *
 * Assessment Structure:
 * - Part 1: Synthesis (20 pts) - Connect W1 rock cycle + W2 geologic time
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
function createAllG7C7W3Forms() {
  const forms = [];

  try {
    Logger.log('Creating G7 C7 W3 Assessment Forms...');

    forms.push(createG7C7W3Part1Synthesis_());
    Logger.log('✓ Part 1: Synthesis created');

    forms.push(createG7C7W3Part2CumulativeAssessment_());
    Logger.log('✓ Part 2: Cumulative Assessment created');

    forms.push(createG7C7W3Part3MisconceptionCheck_());
    Logger.log('✓ Part 3: Misconception Check created');

    Logger.log('═══════════════════════════════════════════════════');
    Logger.log('All G7 C7 W3 forms created successfully!');
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
// Focus: Connect W1 rock cycle + W2 geologic time
// ═══════════════════════════════════════════════════════════════════════════

function createG7C7W3Part1Synthesis_() {
  const form = FormApp.create('G7.C7.W3: Part 1 - Synthesis');
  form.setDescription(
    'Synthesis Assessment: Connecting Rock Cycle & Geologic Time\n\n' +
    'This assessment tests your ability to connect concepts from Weeks 1 and 2.\n' +
    'Total Points: 20\n' +
    'Time: ~15 minutes\n\n' +
    'Show your understanding of how rocks and fossils work together to tell Earth\'s story.'
  );
  form.setIsQuiz(true);
  form.setShuffleQuestions(false);

  // Question 1: Rock Cycle + Geologic Time Connection (4 pts)
  const q1 = form.addMultipleChoiceItem();
  q1.setTitle('Q1. A scientist finds a 500-million-year-old fossil in limestone. The limestone is later buried deep underground where heat and pressure transform it into marble. What happens to the fossil?');
  q1.setHelpText('Question ID: g7_c7_w3_syn_q1 | Points: 4 | SEP-6: Constructing Explanations');
  q1.setChoices([
    q1.createChoice('The fossil is preserved perfectly in the marble', false),
    q1.createChoice('The fossil is destroyed during metamorphism', true),
    q1.createChoice('The fossil becomes younger due to the new rock formation', false),
    q1.createChoice('The fossil moves to a different layer in the rock', false)
  ]);
  q1.setPoints(4);
  q1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Metamorphism destroys fossils because the heat and pressure that transform rock also destroy the delicate structures of fossils. This is why fossils are only found in sedimentary rocks.')
      .build()
  );
  q1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Not quite. Think about what happens during metamorphism - intense heat and pressure change the rock\'s mineral structure. These same conditions destroy fossils. This is why index fossils can only be found in sedimentary rocks that haven\'t been metamorphosed.')
      .build()
  );

  // Question 2: Rock Cycle Erasing Evidence (4 pts)
  const q2 = form.addMultipleChoiceItem();
  q2.setTitle('Q2. Why do scientists find fewer fossils from 3 billion years ago compared to 300 million years ago?');
  q2.setHelpText('Question ID: g7_c7_w3_syn_q2 | Points: 4 | DCI: ESS1.C');
  q2.setChoices([
    q2.createChoice('There was less life on Earth 3 billion years ago', false),
    q2.createChoice('Ancient rocks have been recycled through the rock cycle many times, destroying evidence', true),
    q2.createChoice('Scientists have not looked hard enough for ancient fossils', false),
    q2.createChoice('Fossils can only form in rocks younger than 1 billion years', false)
  ]);
  q2.setPoints(4);
  q2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Excellent! The rock cycle continuously recycles Earth\'s crust. Over billions of years, ancient sedimentary rocks containing fossils have been subducted, melted, metamorphosed, or eroded - destroying the fossil record. Only a tiny fraction of ancient rocks survive.')
      .build()
  );
  q2.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Think about the rock cycle over geologic time. Rocks don\'t stay the same forever - they are constantly being transformed. Over 3 billion years, most ancient sedimentary rocks have been recycled through the rock cycle, destroying any fossils they contained.')
      .build()
  );

  // Question 3: Diagram-Based Timeline (4 pts)
  const q3 = form.addMultipleChoiceItem();
  q3.setTitle('Q3. Imagine this sequence: (1) Marine organisms die and settle on ocean floor → (2) Sediments bury them, forming limestone → (3) Plate tectonics push the seafloor up, creating a mountain → (4) A hiker finds the fossil today. Which statement is TRUE about this fossil?');
  q3.setHelpText('Question ID: g7_c7_w3_syn_q3 | Points: 4 | CCC: Scale, Proportion, and Quantity');
  q3.setChoices([
    q3.createChoice('The fossil is the same age as the mountain', false),
    q3.createChoice('The fossil is older than the mountain but younger than the rock surrounding it', false),
    q3.createChoice('The fossil is the same age as the rock it\'s found in, but both are older than the mountain', true),
    q3.createChoice('The fossil formed when the mountain was created', false)
  ]);
  q3.setPoints(4);
  q3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! The fossil and its surrounding rock formed together on the ancient ocean floor - they\'re the same age. The mountain formed later when plate tectonics lifted these rocks. This is why we find marine fossils on mountaintops like the Himalayas!')
      .build()
  );
  q3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Let\'s trace the timeline: First, the organism lived and died in the ocean. It became a fossil as sediments buried it. Much later (perhaps hundreds of millions of years), plate tectonics pushed this rock upward to form a mountain. The fossil and rock are the same age, but both existed before the mountain formed.')
      .build()
  );

  // Question 4: Index Fossil Application (4 pts)
  const q4 = form.addMultipleChoiceItem();
  q4.setTitle('Q4. A geologist finds trilobite fossils in a rock layer in Ohio and similar trilobite fossils in a rock layer in Morocco. What can the geologist conclude?');
  q4.setHelpText('Question ID: g7_c7_w3_syn_q4 | Points: 4 | SEP-7: Engaging in Argument');
  q4.setChoices([
    q4.createChoice('The two rock layers formed at approximately the same time', true),
    q4.createChoice('The rock layers are made of the same minerals', false),
    q4.createChoice('Ohio and Morocco were always connected', false),
    q4.createChoice('Trilobites could swim across the Atlantic Ocean', false)
  ]);
  q4.setPoints(4);
  q4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! This is how index fossils work! Trilobites are excellent index fossils - they lived during specific time periods and were widespread. Finding the same species in distant locations tells us those rock layers formed during the same time period, even if the continents have moved since then.')
      .build()
  );
  q4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Index fossils help us correlate (match up) rock layers across the globe. If the same index fossil species appears in rocks on different continents, it tells us those rocks formed during the same time period - when that species was alive. This is one of the most powerful tools geologists use.')
      .build()
  );

  // Question 5: Constructed Response - System Connection (4 pts)
  const q5 = form.addParagraphTextItem();
  q5.setTitle('Q5. Explain why the rock cycle makes it difficult to study Earth\'s earliest history. Use specific examples of how different parts of the rock cycle destroy evidence of the past.');
  q5.setHelpText(
    'Question ID: g7_c7_w3_syn_q5 | Points: 4 | SEP-6: Constructing Explanations\n\n' +
    'Rubric:\n' +
    '4 pts: Explains how multiple rock cycle processes (e.g., melting, metamorphism, erosion) destroy ancient rocks/fossils with specific examples\n' +
    '3 pts: Explains 2 processes with some examples\n' +
    '2 pts: Identifies that the rock cycle recycles material but lacks specific processes\n' +
    '1 pt: Mentions rock cycle but connection to evidence destruction is unclear\n' +
    '0 pts: No attempt or completely incorrect'
  );
  // Paragraph text items cannot have points set directly - graded manually

  return form;
}

// ═══════════════════════════════════════════════════════════════════════════
// PART 2: CUMULATIVE ASSESSMENT (60 pts)
// Sections: Rock Types (15), Stratigraphy (15), Fossils (15), Systems (15)
// ═══════════════════════════════════════════════════════════════════════════

function createG7C7W3Part2CumulativeAssessment_() {
  const form = FormApp.create('G7.C7.W3: Part 2 - Cumulative Assessment');
  form.setDescription(
    'Cumulative Assessment: Earth\'s History\n\n' +
    'This assessment covers all content from Cycle 7.\n' +
    'Total Points: 60\n' +
    'Time: ~40 minutes\n\n' +
    'Sections:\n' +
    '• Section A: Rock Types & Cycle (15 pts)\n' +
    '• Section B: Stratigraphy & Dating (15 pts)\n' +
    '• Section C: Fossil Evidence (15 pts)\n' +
    '• Section D: System Explanations (15 pts)'
  );
  form.setIsQuiz(true);
  form.setShuffleQuestions(false);

  // ─────────────────────────────────────────────────────────────────────────
  // SECTION A: ROCK TYPES & CYCLE (15 pts)
  // ─────────────────────────────────────────────────────────────────────────

  form.addSectionHeaderItem()
    .setTitle('Section A: Rock Types & Rock Cycle')
    .setHelpText('15 points | 4 questions | Focus: Rock classification and cycle processes');

  // A1: Rock Classification (4 pts)
  const a1 = form.addMultipleChoiceItem();
  a1.setTitle('A1. A rock sample shows visible crystals of quartz and feldspar that interlocked as the rock cooled slowly underground. What type of rock is this?');
  a1.setHelpText('Question ID: g7_c7_w3_cum_a1 | Points: 4 | DCI: ESS2.A');
  a1.setChoices([
    a1.createChoice('Sedimentary - formed from compressed sediments', false),
    a1.createChoice('Igneous (intrusive) - formed from slowly cooling magma', true),
    a1.createChoice('Metamorphic - formed from heat and pressure', false),
    a1.createChoice('Igneous (extrusive) - formed from rapidly cooling lava', false)
  ]);
  a1.setPoints(4);
  a1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Large, visible, interlocking crystals indicate the rock cooled slowly underground, giving crystals time to grow. This is characteristic of intrusive igneous rocks like granite.')
      .build()
  );
  a1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('The key clues are: (1) crystals of quartz and feldspar (igneous minerals), (2) interlocking crystal structure, and (3) slow cooling underground. Slow cooling allows large crystals to form, which is why intrusive igneous rocks have visible crystals.')
      .build()
  );

  // A2: Rock Cycle Pathway (4 pts)
  const a2 = form.addMultipleChoiceItem();
  a2.setTitle('A2. A granite mountain is exposed to wind, rain, and ice over millions of years. The broken pieces wash into a river and are deposited in layers at the bottom of a lake. What will these sediments eventually become?');
  a2.setHelpText('Question ID: g7_c7_w3_cum_a2 | Points: 4 | DCI: ESS2.A');
  a2.setChoices([
    a2.createChoice('A new igneous rock', false),
    a2.createChoice('A sedimentary rock', true),
    a2.createChoice('A metamorphic rock', false),
    a2.createChoice('The same granite again', false)
  ]);
  a2.setPoints(4);
  a2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! This describes the weathering-erosion-deposition-compaction-cementation pathway. Sediments that settle in layers and are compressed over time form sedimentary rocks.')
      .build()
  );
  a2.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Follow the rock cycle pathway: weathering breaks down granite → erosion transports pieces → deposition in lake → burial and compaction → cementation. This sequence produces sedimentary rock from any parent material.')
      .build()
  );

  // A3: Formation Environment (4 pts)
  const a3 = form.addMultipleChoiceItem();
  a3.setTitle('A3. A rock sample contains fossilized seashells and is made of layers of tiny calcium carbonate particles. What environment did this rock most likely form in?');
  a3.setHelpText('Question ID: g7_c7_w3_cum_a3 | Points: 4 | DCI: ESS1.C');
  a3.setChoices([
    a3.createChoice('Deep inside Earth\'s crust', false),
    a3.createChoice('In a volcanic eruption', false),
    a3.createChoice('On a shallow ocean floor', true),
    a3.createChoice('In a mountain glacier', false)
  ]);
  a3.setPoints(4);
  a3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Seashells and calcium carbonate layers are characteristic of limestone, which forms in shallow marine environments where shell-bearing organisms live and their remains accumulate on the seafloor.')
      .build()
  );
  a3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('The clues point to a marine environment: (1) seashells indicate ocean-dwelling organisms, (2) calcium carbonate comes from marine shells and coral, (3) layered structure indicates sedimentary deposition. This describes limestone forming on a shallow ocean floor.')
      .build()
  );

  // A4: Rock Cycle Process (3 pts)
  const a4 = form.addMultipleChoiceItem();
  a4.setTitle('A4. What process transforms sedimentary rock into metamorphic rock?');
  a4.setHelpText('Question ID: g7_c7_w3_cum_a4 | Points: 3 | DCI: ESS2.A');
  a4.setChoices([
    a4.createChoice('Weathering and erosion', false),
    a4.createChoice('Melting and cooling', false),
    a4.createChoice('Heat and pressure without melting', true),
    a4.createChoice('Compaction and cementation', false)
  ]);
  a4.setPoints(3);
  a4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Metamorphism occurs when existing rocks are subjected to intense heat and pressure - enough to change their mineral structure but not enough to melt them completely.')
      .build()
  );
  a4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Metamorphism is the key: "meta" means change, "morph" means form. The rock changes form due to heat and pressure without melting. If it melted, it would become magma and eventually form igneous rock instead.')
      .build()
  );

  // ─────────────────────────────────────────────────────────────────────────
  // SECTION B: STRATIGRAPHY & DATING (15 pts)
  // ─────────────────────────────────────────────────────────────────────────

  form.addSectionHeaderItem()
    .setTitle('Section B: Stratigraphy & Dating')
    .setHelpText('15 points | 4 questions | Focus: Rock layer principles and relative dating');

  // B1: Superposition (4 pts)
  const b1 = form.addMultipleChoiceItem();
  b1.setTitle('B1. In an undisturbed sequence of rock layers, which layer is the oldest?');
  b1.setHelpText('Question ID: g7_c7_w3_cum_b1 | Points: 4 | DCI: ESS1.C');
  b1.setChoices([
    b1.createChoice('The layer at the top', false),
    b1.createChoice('The layer at the bottom', true),
    b1.createChoice('The thickest layer', false),
    b1.createChoice('The layer with the most fossils', false)
  ]);
  b1.setPoints(4);
  b1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! The Law of Superposition states that in an undisturbed sequence, older layers are at the bottom and younger layers are at the top. Each new layer is deposited on top of existing layers.')
      .build()
  );
  b1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('The Law of Superposition is fundamental to stratigraphy: sediments deposit in layers, with newer sediments always settling on top of older ones. So in an undisturbed sequence, the bottom layer was deposited first (oldest) and the top layer was deposited last (youngest).')
      .build()
  );

  // B2: Cross-Cutting Relationships (4 pts)
  const b2 = form.addMultipleChoiceItem();
  b2.setTitle('B2. A vertical igneous intrusion (dike) cuts through three horizontal sedimentary layers. What is the relative age of the dike?');
  b2.setHelpText('Question ID: g7_c7_w3_cum_b2 | Points: 4 | DCI: ESS1.C');
  b2.setChoices([
    b2.createChoice('Older than all three sedimentary layers', false),
    b2.createChoice('The same age as the middle layer', false),
    b2.createChoice('Younger than all three sedimentary layers', true),
    b2.createChoice('Between the ages of the top and bottom layers', false)
  ]);
  b2.setPoints(4);
  b2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! The Law of Cross-Cutting Relationships tells us that any feature that cuts through rock layers must be younger than the layers it cuts. The dike could only intrude through layers that already existed.')
      .build()
  );
  b2.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Think about what had to happen first: the sedimentary layers had to exist before anything could cut through them. The Law of Cross-Cutting Relationships states that features cutting through rocks are younger than the rocks they cut.')
      .build()
  );

  // B3: Disturbed Strata (4 pts)
  const b3 = form.addMultipleChoiceItem();
  b3.setTitle('B3. A geologist finds a sequence where older fossils appear ABOVE younger fossils. What is the most likely explanation?');
  b3.setHelpText('Question ID: g7_c7_w3_cum_b3 | Points: 4 | DCI: ESS1.C');
  b3.setChoices([
    b3.createChoice('The fossils were dated incorrectly', false),
    b3.createChoice('The rock layers were folded or overturned after formation', true),
    b3.createChoice('Older organisms lived at higher elevations', false),
    b3.createChoice('The Law of Superposition is wrong', false)
  ]);
  b3.setPoints(4);
  b3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! When older layers appear above younger layers, it indicates the strata have been disturbed - usually by folding or faulting that overturned the sequence. This is common in mountain-building regions.')
      .build()
  );
  b3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Superposition applies to undisturbed sequences. When fossils appear "out of order," it tells us the rock layers have been disturbed - folded, faulted, or overturned by tectonic forces. The original sequence was normal; later events flipped it.')
      .build()
  );

  // B4: Index Fossil Correlation (3 pts)
  const b4 = form.addMultipleChoiceItem();
  b4.setTitle('B4. Which characteristic makes a fossil useful as an index fossil for dating rock layers?');
  b4.setHelpText('Question ID: g7_c7_w3_cum_b4 | Points: 3 | DCI: ESS1.C');
  b4.setChoices([
    b4.createChoice('The organism lived in only one location', false),
    b4.createChoice('The organism existed for a short time period but was widespread', true),
    b4.createChoice('The organism was very large and easy to find', false),
    b4.createChoice('The organism lived for millions of years', false)
  ]);
  b4.setPoints(3);
  b4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Index fossils must be: (1) widespread geographically so they appear in many locations, and (2) limited to a short time period so they indicate a specific age range. This combination makes them perfect for dating and correlating rock layers.')
      .build()
  );
  b4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('The best index fossils have two key traits: they were geographically widespread (found in many places) AND existed for a short time period (narrow age range). Being widespread helps find them; being short-lived helps pinpoint the age.')
      .build()
  );

  // ─────────────────────────────────────────────────────────────────────────
  // SECTION C: FOSSIL EVIDENCE (15 pts)
  // ─────────────────────────────────────────────────────────────────────────

  form.addSectionHeaderItem()
    .setTitle('Section C: Fossil Evidence')
    .setHelpText('15 points | 4 questions | Focus: Fossil interpretation and Earth history');

  // C1: Fossil Distribution (4 pts)
  const c1 = form.addMultipleChoiceItem();
  c1.setTitle('C1. Fossils of the same land reptile species are found on both South America and Africa. What does this evidence support?');
  c1.setHelpText('Question ID: g7_c7_w3_cum_c1 | Points: 4 | DCI: ESS1.C | Spiral: Cycle 6');
  c1.setChoices([
    c1.createChoice('The reptiles could swim across the Atlantic Ocean', false),
    c1.createChoice('The continents were once connected', true),
    c1.createChoice('The fossils formed at different times', false),
    c1.createChoice('Scientists made identification errors', false)
  ]);
  c1.setPoints(4);
  c1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Identical land reptile fossils on separated continents is key evidence for continental drift. These organisms could not cross oceans, so the continents must have been connected when these animals lived. This connects to plate tectonics from Cycle 6!')
      .build()
  );
  c1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Think about what we learned in Cycle 6 about plate tectonics. Land reptiles cannot swim across oceans. Finding the same species on both continents tells us those landmasses were once joined - part of the supercontinent Pangaea.')
      .build()
  );

  // C2: Mass Extinction Evidence (4 pts)
  const c2 = form.addMultipleChoiceItem();
  c2.setTitle('C2. In rock layers worldwide, scientists find that 96% of marine species disappear suddenly at the boundary between the Permian and Triassic periods. What does this represent?');
  c2.setHelpText('Question ID: g7_c7_w3_cum_c2 | Points: 4 | DCI: ESS1.C');
  c2.setChoices([
    c2.createChoice('A gradual climate change over millions of years', false),
    c2.createChoice('A mass extinction event called the "Great Dying"', true),
    c2.createChoice('Normal evolution replacing old species with new ones', false),
    c2.createChoice('A gap in the fossil record due to erosion', false)
  ]);
  c2.setPoints(4);
  c2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! The Permian-Triassic extinction (252 million years ago) is called the "Great Dying" because it wiped out ~96% of marine species. This sudden disappearance of fossils in rock layers marks one of Earth\'s five major mass extinctions.')
      .build()
  );
  c2.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('When we see the sudden disappearance of most species across the globe at the same time in rock layers, it indicates a mass extinction event. The "Great Dying" at the Permian-Triassic boundary was the largest extinction in Earth\'s history.')
      .build()
  );

  // C3: Fossil Types (4 pts)
  const c3 = form.addMultipleChoiceItem();
  c3.setTitle('C3. A scientist finds ancient footprints, burrows, and plant root traces preserved in rock. What type of fossils are these?');
  c3.setHelpText('Question ID: g7_c7_w3_cum_c3 | Points: 4 | DCI: ESS1.C');
  c3.setChoices([
    c3.createChoice('Body fossils', false),
    c3.createChoice('Trace fossils', true),
    c3.createChoice('Cast fossils', false),
    c3.createChoice('Mold fossils', false)
  ]);
  c3.setPoints(4);
  c3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Trace fossils preserve evidence of organism activity rather than body parts. Footprints, burrows, trails, and root traces show us how organisms lived and behaved, even when no body parts were preserved.')
      .build()
  );
  c3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Fossils come in different types: body fossils preserve actual organism remains, while trace fossils preserve evidence of activity (footprints, burrows, trails). The examples given - footprints, burrows, and root traces - are all evidence of behavior, not body parts.')
      .build()
  );

  // C4: Environmental Reconstruction (3 pts)
  const c4 = form.addMultipleChoiceItem();
  c4.setTitle('C4. Coral reef fossils are found in rock layers in what is now the Sahara Desert. What can scientists conclude about this region\'s past?');
  c4.setHelpText('Question ID: g7_c7_w3_cum_c4 | Points: 3 | DCI: ESS1.C');
  c4.setChoices([
    c4.createChoice('Coral could once survive in desert conditions', false),
    c4.createChoice('The region was once covered by warm, shallow ocean water', true),
    c4.createChoice('The fossils were transported there by flooding', false),
    c4.createChoice('The dating of the fossils must be incorrect', false)
  ]);
  c4.setPoints(3);
  c4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Coral reefs only form in warm, shallow marine environments. Finding coral fossils in the desert tells us this region was once covered by tropical ocean - environments change dramatically over geologic time.')
      .build()
  );
  c4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Coral reefs require specific conditions: warm, shallow, clear ocean water. Finding coral fossils means those conditions once existed there. The Sahara hasn\'t always been a desert - fossils tell us about past environments.')
      .build()
  );

  // ─────────────────────────────────────────────────────────────────────────
  // SECTION D: SYSTEM EXPLANATIONS (15 pts)
  // ─────────────────────────────────────────────────────────────────────────

  form.addSectionHeaderItem()
    .setTitle('Section D: System Explanations')
    .setHelpText('15 points | 3 questions | Focus: Connecting Earth systems and constructed explanations');

  // D1: Integrated System Question (5 pts)
  const d1 = form.addMultipleChoiceItem();
  d1.setTitle('D1. Marine fossils are found high in the Himalayan mountains. Which sequence of events BEST explains this?');
  d1.setHelpText('Question ID: g7_c7_w3_cum_d1 | Points: 5 | SEP-6: Constructing Explanations');
  d1.setChoices([
    d1.createChoice('Marine organisms climbed the mountains and died there', false),
    d1.createChoice('Sediments with marine fossils formed on an ocean floor, then were uplifted by plate collision', true),
    d1.createChoice('Ancient floods carried ocean water to mountain heights', false),
    d1.createChoice('The fossils formed after the mountains were already high', false)
  ]);
  d1.setPoints(5);
  d1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Excellent! This integrates multiple concepts: (1) Marine organisms lived and died in the ocean, forming fossils in sedimentary rock on the seafloor. (2) The Indian plate collided with the Asian plate, pushing up the ancient seafloor to form the Himalayas. The fossils are older than the mountains!')
      .build()
  );
  d1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Connect the concepts: Marine fossils form on ocean floors in sedimentary rock. These rocks can later be uplifted by plate tectonics. The Himalayas formed when India collided with Asia, pushing ancient seafloor rocks (with their fossils) to mountain heights.')
      .build()
  );

  // D2: Constructed Response - Novel Scenario (5 pts)
  const d2 = form.addParagraphTextItem();
  d2.setTitle('D2. A scientist discovers a layer of metamorphic rock (marble) sandwiched between two layers of sedimentary rock (limestone above and shale below). Construct an explanation for how this sequence could have formed. Include at least 3 events in your explanation.');
  d2.setHelpText(
    'Question ID: g7_c7_w3_cum_d2 | Points: 5 | SEP-6: Constructing Explanations\n\n' +
    'Rubric:\n' +
    '5 pts: Explains complete sequence with 3+ events (shale deposition → limestone deposition → metamorphism of middle layer → new limestone deposition), correctly applying rock cycle and stratigraphy principles\n' +
    '4 pts: Identifies 3 events with minor errors or incomplete explanation\n' +
    '3 pts: Identifies 2 events correctly but sequence incomplete\n' +
    '2 pts: Shows understanding of rock cycle but sequence illogical\n' +
    '1 pt: Mentions relevant concepts but explanation unclear\n' +
    '0 pts: No attempt or completely incorrect'
  );

  // D3: Spiral Integration - Plate Tectonics + Rock Cycle (5 pts)
  const d3 = form.addMultipleChoiceItem();
  d3.setTitle('D3. How does the rock cycle at a subduction zone connect plate tectonics to Earth\'s history? Select the BEST answer.');
  d3.setHelpText('Question ID: g7_c7_w3_cum_d3 | Points: 5 | SEP-6 | Spiral: Cycle 6');
  d3.setChoices([
    d3.createChoice('Subduction creates new fossils deep underground', false),
    d3.createChoice('Subduction recycles oceanic crust, destroying ancient rock and fossil evidence while creating new igneous rock', true),
    d3.createChoice('Subduction stops the rock cycle from occurring', false),
    d3.createChoice('Subduction has no connection to rocks or Earth\'s history', false)
  ]);
  d3.setPoints(5);
  d3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Excellent integration! Subduction zones are where old oceanic crust (and any fossils it contains) is pushed down into the mantle and melted. This recycles rock material and destroys ancient evidence, while the melted rock eventually rises to form new igneous rock. This is why we have so little rock from Earth\'s earliest history.')
      .build()
  );
  d3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Connect Cycle 6 (plate tectonics) with Cycle 7 (rock cycle): At subduction zones, old oceanic crust dives into the mantle and melts. This destroys any fossils and recycles the rock material. The melted rock later rises and cools to form new igneous rock. This continuous recycling is why ancient rocks are rare.')
      .build()
  );

  return form;
}

// ═══════════════════════════════════════════════════════════════════════════
// PART 3: MISCONCEPTION CHECK (20 pts)
// Focus: Target persistent misconceptions from Cycle 7
// ═══════════════════════════════════════════════════════════════════════════

function createG7C7W3Part3MisconceptionCheck_() {
  const form = FormApp.create('G7.C7.W3: Part 3 - Misconception Check');
  form.setDescription(
    'Misconception Check Assessment\n\n' +
    'This section targets common misconceptions about rocks, fossils, and Earth\'s history.\n' +
    'Total Points: 20\n' +
    'Time: ~20 minutes\n\n' +
    'Read each question carefully - some contain common errors in thinking!'
  );
  form.setIsQuiz(true);
  form.setShuffleQuestions(false);

  // MC1: "Fossils are only bones" misconception (4 pts)
  const mc1 = form.addMultipleChoiceItem();
  mc1.setTitle('MC1. Which of the following can become a fossil? Select ALL that apply.');
  mc1.setHelpText('Question ID: g7_c7_w3_misc_q1 | Points: 4 | Target: "Fossils are only bones"');
  mc1.setChoices([
    mc1.createChoice('Bones and teeth', false),
    mc1.createChoice('Shells and exoskeletons', false),
    mc1.createChoice('Footprints and burrows', false),
    mc1.createChoice('All of the above - bones, shells, traces, and even soft tissues in rare cases', true)
  ]);
  mc1.setPoints(4);
  mc1.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Fossils include much more than bones: shells, teeth, exoskeletons, wood, leaves, footprints, burrows, coprolites (fossilized feces), and even soft tissue in exceptional preservation cases. The term "fossil" refers to any preserved evidence of ancient life.')
      .build()
  );
  mc1.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Common misconception alert! Many people think fossils are only bones, but fossils can be: body fossils (bones, shells, teeth, exoskeletons, leaves, wood) OR trace fossils (footprints, burrows, coprolites). Even soft tissue can fossilize under exceptional conditions!')
      .build()
  );

  // MC2: "Rocks don't change" misconception (4 pts)
  const mc2 = form.addMultipleChoiceItem();
  mc2.setTitle('MC2. TRUE or FALSE: A rock that forms today will remain the same type of rock forever.');
  mc2.setHelpText('Question ID: g7_c7_w3_misc_q2 | Points: 4 | Target: "Rocks don\'t change"');
  mc2.setChoices([
    mc2.createChoice('TRUE - once a rock forms, it stays that rock type', false),
    mc2.createChoice('FALSE - rocks continuously change through the rock cycle', true)
  ]);
  mc2.setPoints(4);
  mc2.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! The rock cycle is continuous. Any rock - igneous, sedimentary, or metamorphic - can be transformed into any other rock type given enough time and the right conditions. A granite forming today could become sediment, then sandstone, then quartzite over millions of years.')
      .build()
  );
  mc2.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('This is a common misconception! Rocks seem permanent in our lifetime, but over millions of years, they continuously change. The rock cycle transforms rocks: igneous can become sedimentary through weathering, sedimentary can become metamorphic through heat/pressure, and any rock can melt to form new igneous rock.')
      .build()
  );

  // MC3: "Older = always deeper" misconception (4 pts)
  const mc3 = form.addMultipleChoiceItem();
  mc3.setTitle('MC3. A student says: "The deepest rock layer is ALWAYS the oldest." Is this statement correct?');
  mc3.setHelpText('Question ID: g7_c7_w3_misc_q3 | Points: 4 | Target: "Older layers are always deeper"');
  mc3.setChoices([
    mc3.createChoice('Yes - superposition means deeper = older, always', false),
    mc3.createChoice('No - tectonic forces can fold or overturn rock layers, reversing their order', true),
    mc3.createChoice('Yes - because sediments always deposit with older material sinking', false),
    mc3.createChoice('No - because erosion removes all the old layers first', false)
  ]);
  mc3.setPoints(4);
  mc3.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Superposition applies to UNDISTURBED sequences. Tectonic forces can fold rock layers (like a rug being pushed), sometimes completely overturning them so older layers end up on top. This is common in mountain ranges. Geologists must look for clues like graded bedding to detect overturning.')
      .build()
  );
  mc3.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('Careful! Superposition only applies to undisturbed rock sequences. After rocks form, tectonic forces can fold them (bending layers), fault them (breaking and shifting), or even overturn them completely. In these cases, older layers might be on top! Geologists look for other clues to detect this.')
      .build()
  );

  // MC4: "Geologic time is short" misconception (4 pts)
  const mc4 = form.addMultipleChoiceItem();
  mc4.setTitle('MC4. If Earth\'s 4.5-billion-year history were compressed into a single 24-hour day, at what time would humans appear?');
  mc4.setHelpText('Question ID: g7_c7_w3_misc_q4 | Points: 4 | Target: "Geologic time is relatively short"');
  mc4.setChoices([
    mc4.createChoice('Around noon (halfway through the day)', false),
    mc4.createChoice('Around 6:00 PM (early evening)', false),
    mc4.createChoice('Around 10:00 PM (late evening)', false),
    mc4.createChoice('Less than one second before midnight', true)
  ]);
  mc4.setPoints(4);
  mc4.setFeedbackForCorrect(
    FormApp.createFeedback()
      .setText('Correct! Modern humans have existed for only about 300,000 years. Compared to Earth\'s 4.5 billion-year history, that\'s less than one second in a 24-hour day. Dinosaurs would appear around 10:41 PM and go extinct around 11:39 PM. Human history is incredibly short on the geologic timescale.')
      .build()
  );
  mc4.setFeedbackForIncorrect(
    FormApp.createFeedback()
      .setText('The scale of geologic time is hard to grasp! In a 24-hour Earth history: life appears around 4 AM, complex animals around 9 PM, dinosaurs at 10:41 PM, dinosaur extinction at 11:39 PM, and humans in the last second before midnight. Our entire species has existed for less than a blink on the geologic timescale.')
      .build()
  );

  // MC5: Constructed Response - Misconception Correction (4 pts)
  const mc5 = form.addParagraphTextItem();
  mc5.setTitle('MC5. Your friend says: "If we find a dinosaur fossil in sedimentary rock, and that rock later becomes metamorphic marble due to heat and pressure, the fossil would just be pressed flat but still visible." Explain why your friend\'s thinking is incorrect.');
  mc5.setHelpText(
    'Question ID: g7_c7_w3_misc_q5 | Points: 4 | SEP-6 + SEP-7\n\n' +
    'Rubric:\n' +
    '4 pts: Correctly explains that metamorphism destroys fossils because heat and pressure recrystallize minerals, erasing fossil structures; provides reasoning for why this happens\n' +
    '3 pts: Identifies that fossils are destroyed but explanation of mechanism incomplete\n' +
    '2 pts: States fossils don\'t survive but lacks scientific explanation\n' +
    '1 pt: Partially addresses the misconception\n' +
    '0 pts: No attempt or agrees with the misconception'
  );

  // Metacognition Question (0 pts - diagnostic only)
  const meta = form.addScaleItem();
  meta.setTitle('After completing this assessment, how confident are you in your understanding of Earth\'s history concepts?');
  meta.setHelpText('Question ID: g7_c7_w3_misc_meta | Points: 0 | MTSS Metacognition Check');
  meta.setBounds(1, 5);
  meta.setLabels('Not confident at all', 'Very confident');
  // No setPoints for diagnostic items

  // Final reflection (0 pts - for teacher review)
  const reflect = form.addParagraphTextItem();
  reflect.setTitle('What topic from this cycle would you like to review more before the next unit? (Optional)');
  reflect.setHelpText('Question ID: g7_c7_w3_misc_reflect | Points: 0 | For teacher planning');
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
function testG7C7W3Forms_() {
  Logger.log('Testing G7 C7 W3 form creation...');

  // Create forms in test mode
  const forms = createAllG7C7W3Forms();

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
function getG7C7W3FormUrls_() {
  // This would be populated after forms are created
  return {
    part1Synthesis: 'FORM_URL_HERE',
    part2Cumulative: 'FORM_URL_HERE',
    part3Misconception: 'FORM_URL_HERE'
  };
}
