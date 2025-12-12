/**
 * ═══════════════════════════════════════════════════════════════════════════
 * GRADE 7 CYCLE 6 WEEK 5: Synthesis & Assessment
 * STATUS: ✅ COMPLETE - READY FOR REVIEW
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * ASSESSMENT WEEK: Plate Tectonics & Earth's Interior
 *
 * This week synthesizes and assesses student learning across the entire
 * Cycle 6 unit on plate tectonics, volcanic activity, and Earth's interior.
 * Students demonstrate mastery through multi-part assessment while addressing
 * persistent misconceptions.
 *
 * Assessment Structure:
 * - Part 1: Synthesis Review (20 pts, 15 min)
 * - Part 2: Cumulative Assessment (60 pts, 40 min)
 *   - Section A: Plate Boundaries (15 pts)
 *   - Section B: Seafloor Evidence (15 pts)
 *   - Section C: Volcanic Systems (15 pts)
 *   - Section D: Earth's Interior (15 pts)
 * - Part 3: Misconception Check (20 pts, 20 min)
 *
 * Standards Alignment:
 * - MS-ESS2-1: Earth's internal processes
 * - MS-ESS2-2: Geoscience processes changing Earth's surface
 * - MS-ESS2-3: Distribution of fossils and rocks as evidence
 * - MS-ESS3-2: Natural hazards
 *
 * Misconception Targets:
 * - plates-float-magma: Plates rest on plastic asthenosphere, not liquid
 * - continents-move-fast: Plate movement is fingernail-growth speed
 * - earthquakes-random: Earthquakes cluster at plate boundaries
 *
 * ═══════════════════════════════════════════════════════════════════════════
 */

// ═══════════════════════════════════════════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════

const G7_C6_W5_CONFIG = {
  grade: 7,
  cycle: 6,
  week: 5,
  topic: 'Synthesis & Assessment: Plate Tectonics & Earth\'s Interior',
  isAssessmentWeek: true,

  standards: {
    assessed: ['MS-ESS2-1', 'MS-ESS2-2', 'MS-ESS2-3', 'MS-ESS3-2']
  },

  points: {
    part1SynthesisReview: 20,
    part2Assessment: 60,
    part3MisconceptionCheck: 20,
    total: 100
  },

  assessmentSections: {
    A: 'Plate Boundaries',
    B: 'Seafloor Evidence',
    C: 'Volcanic Systems',
    D: 'Earth\'s Interior'
  },

  misconceptionTargets: [
    'plates-float-magma',
    'continents-move-fast',
    'earthquakes-random'
  ],

  formIds: {
    part1: null,
    part2: null,
    part3: null
  }
};

// ═══════════════════════════════════════════════════════════════════════════
// PART 1: SYNTHESIS REVIEW (20 points)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Creates Part 1: Synthesis Review connecting all plate tectonics concepts
 * Time: 15 minutes
 */
function createG7C6W5Part1SynthesisReview() {
  const form = FormApp.create('G7.C6.W5: Part 1 - Synthesis Review');
  form.setDescription(
    '🔗 SYNTHESIS REVIEW: Connecting Plate Tectonics & Earth\'s Interior\n\n' +
    'This review connects all the concepts you\'ve learned in Cycle 6:\n' +
    '• Week 1: Plate Boundaries & Seismic Patterns\n' +
    '• Week 2: Seafloor Spreading & Continental Drift\n' +
    '• Week 3: Volcanic Eruption Styles\n' +
    '• Week 4: Earth\'s Interior Structure\n\n' +
    'Time: 15 minutes\n' +
    'Points: 20'
  );
  form.setIsQuiz(true);
  form.setShuffleQuestions(false);

  // Q1: Connecting convection to plate movement (4 pts)
  const q1 = form.addMultipleChoiceItem();
  q1.setTitle('How does Earth\'s layered structure enable plate tectonics? Connect the core, mantle, and plates in your answer.')
  q1.setHelpText('Think about heat flow, convection, and the asthenosphere.')
  q1.setPoints(4)
  q1.setChoices([
    q1.createChoice('Plates float directly on the liquid outer core, which moves them around', false),
    q1.createChoice('Heat from the core drives convection in the plastic asthenosphere, which slowly moves the rigid plates above it', true),
    q1.createChoice('Earth\'s layers have no connection to plate movement', false),
    q1.createChoice('The inner core\'s rotation directly pushes the plates', false)
  ])
  q1.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Perfect integration! Core heat → mantle convection → asthenosphere flow → plate movement. Each layer plays a role in the system!').build())
  q1.setFeedbackForIncorrect(FormApp.createFeedback().setText('Review the connections: What generates heat? What layer convects? What do plates rest on? How does energy transfer from core to surface?').build());

  // Q2: Evidence chain for plate tectonics (4 pts)
  const q2 = form.addMultipleChoiceItem();
  q2.setTitle('A student claims "We can\'t PROVE plate tectonics because we can\'t see plates move." How would you respond using evidence from this unit?')
  q2.setHelpText('Consider multiple independent lines of evidence.')
  q2.setPoints(4)
  q2.setChoices([
    q2.createChoice('The student is right—we can only guess about plate movement', false),
    q2.createChoice('We CAN see plates move using GPS, and multiple lines of evidence (fossils, magnetic stripes, earthquake patterns, coastline fit) all confirm plate tectonics', true),
    q2.createChoice('Plate tectonics is just a popular theory with no supporting evidence', false),
    q2.createChoice('We only have evidence for continental drift, not plate tectonics', false)
  ])
  q2.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Strong scientific reasoning! GPS now measures plate movement directly (cm/year). Combined with geological evidence, plate tectonics is extremely well-supported.').build())
  q2.setFeedbackForIncorrect(FormApp.createFeedback().setText('Think about all the evidence: fossils matching across oceans, magnetic stripes, earthquake/volcano patterns, coastline fits, and now GPS measurements.').build());

  // Q3: Volcanic eruption style connection (4 pts)
  const q3 = form.addMultipleChoiceItem();
  q3.setTitle('Why do volcanoes at mid-ocean ridges (divergent boundaries) generally have gentler eruptions than volcanoes at subduction zones (convergent boundaries)?')
  q3.setHelpText('Connect plate boundary type to magma composition to eruption style.')
  q3.setPoints(4)
  q3.setChoices([
    q3.createChoice('Water pressure makes underwater volcanoes calmer', false),
    q3.createChoice('Mid-ocean ridge magma comes from mantle (low silica, low viscosity), while subduction zone magma includes melted crust (high silica, high viscosity, traps gas)', true),
    q3.createChoice('All volcanoes erupt the same way regardless of location', false),
    q3.createChoice('Scientists haven\'t studied mid-ocean ridge volcanoes enough to know', false)
  ])
  q3.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Excellent connection! Boundary type → magma source → composition → viscosity → eruption style. The system is interconnected!').build())
  q3.setFeedbackForIncorrect(FormApp.createFeedback().setText('Trace the chain: What rock melts at each boundary type? What\'s its silica content? How does that affect viscosity and gas behavior?').build());

  // Q4: Seismic evidence integration (4 pts)
  const q4 = form.addMultipleChoiceItem();
  q4.setTitle('A seismologist studies earthquake waves after a major quake. The P-waves arrive everywhere, but S-waves don\'t arrive at stations on the opposite side of Earth. What does this reveal about Earth\'s interior?')
  q4.setHelpText('Remember: S-waves only travel through solids.')
  q4.setPoints(4)
  q4.setChoices([
    q4.createChoice('Earth has no interior structure—all waves travel the same way', false),
    q4.createChoice('Earth must have a liquid layer (outer core) that blocks S-waves but allows P-waves to pass', true),
    q4.createChoice('S-waves just run out of energy before reaching the other side', false),
    q4.createChoice('The stations on the other side are broken', false)
  ])
  q4.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ This is exactly how scientists discovered the liquid outer core! S-wave shadow zones are key evidence for Earth\'s layered structure.').build())
  q4.setFeedbackForIncorrect(FormApp.createFeedback().setText('S-waves ONLY travel through solids. If they can\'t reach certain areas, something liquid must be blocking them. Where would that liquid layer be?').build());

  // Q5: System thinking (4 pts)
  const q5 = form.addParagraphTextItem();
  q5.setTitle('Explain how ONE change in Earth\'s interior (such as the core cooling significantly) would affect plate tectonics, volcanism, and Earth\'s magnetic field. Describe at least THREE connected effects.')
  q5.setHelpText('Think like a systems scientist—how are these processes connected?')
  q5.setPoints(4);

  Logger.log('G7.C6.W5 Part 1 created: ' + form.getEditUrl());
  return form;
}

// ═══════════════════════════════════════════════════════════════════════════
// PART 2: CUMULATIVE ASSESSMENT (60 points)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Creates Part 2: Cumulative Assessment covering all unit content
 * Time: 40 minutes
 * Sections: A (Plate Boundaries), B (Seafloor Evidence), C (Volcanic Systems), D (Earth's Interior)
 */
function createG7C6W5Part2Assessment() {
  const form = FormApp.create('G7.C6.W5: Part 2 - Cumulative Assessment');
  form.setDescription(
    '📝 CUMULATIVE ASSESSMENT: Plate Tectonics & Earth\'s Interior\n\n' +
    'This assessment covers all content from Cycle 6.\n\n' +
    'Section A: Plate Boundaries (15 pts)\n' +
    'Section B: Seafloor Evidence (15 pts)\n' +
    'Section C: Volcanic Systems (15 pts)\n' +
    'Section D: Earth\'s Interior (15 pts)\n\n' +
    'Time: 40 minutes\n' +
    'Total Points: 60\n\n' +
    'This is an individual assessment—complete it on your own.'
  );
  form.setIsQuiz(true);
  form.setShuffleQuestions(false);

  // ═══════════════════════════════════════════════════════════════════════
  // SECTION A: PLATE BOUNDARIES (15 pts)
  // ═══════════════════════════════════════════════════════════════════════

  form.addSectionHeaderItem().setTitle('SECTION A: Plate Boundaries (15 points)');

  // A1: Boundary types (3 pts)
  const a1 = form.addMultipleChoiceItem();
  a1.setTitle('A1. At a DIVERGENT plate boundary, what geological features would you expect to find?')
  a1.setPoints(3)
  a1.setChoices([
    a1.createChoice('Deep ocean trenches and volcanic island arcs', false),
    a1.createChoice('Mid-ocean ridges, rift valleys, and volcanic activity creating new crust', true),
    a1.createChoice('Tall mountain ranges formed by compression', false),
    a1.createChoice('No significant geological features', false)
  ])
  a1.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Correct! Divergent boundaries create new crust through volcanic activity, forming mid-ocean ridges and rift valleys.').build())
  a1.setFeedbackForIncorrect(FormApp.createFeedback().setText('Divergent = pulling apart. What forms in the gap? What geological features result from this spreading?').build());

  // A2: Convergent boundary types (4 pts)
  const a2 = form.addMultipleChoiceItem();
  a2.setTitle('A2. When oceanic crust meets continental crust at a convergent boundary, what happens and why?')
  a2.setPoints(4)
  a2.setChoices([
    a2.createChoice('The continental crust subducts because it\'s thinner', false),
    a2.createChoice('The oceanic crust subducts because it\'s denser, creating trenches and volcanic arcs', true),
    a2.createChoice('Both plates rise up to form mountains', false),
    a2.createChoice('The plates slide past each other horizontally', false)
  ])
  a2.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Density determines which plate subducts! Oceanic crust (basalt, ~3.0 g/cm³) sinks beneath continental crust (granite, ~2.7 g/cm³).').build())
  a2.setFeedbackForIncorrect(FormApp.createFeedback().setText('Compare densities: oceanic crust (basalt) vs continental crust (granite). Which is denser? Denser material sinks in a collision.').build());

  // A3: Transform boundary features (4 pts)
  const a3 = form.addMultipleChoiceItem();
  a3.setTitle('A3. The San Andreas Fault is a transform boundary. What type of motion occurs there, and what hazards does it produce?')
  a3.setPoints(4)
  a3.setChoices([
    a3.createChoice('Plates pull apart, causing volcanic eruptions', false),
    a3.createChoice('Plates slide horizontally past each other, causing earthquakes but little volcanism', true),
    a3.createChoice('Plates collide and form mountains', false),
    a3.createChoice('One plate subducts beneath the other', false)
  ])
  a3.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Transform boundaries involve horizontal sliding. Stress builds up until plates slip, causing earthquakes—like the 1906 San Francisco earthquake.').build())
  a3.setFeedbackForIncorrect(FormApp.createFeedback().setText('Transform = horizontal sliding motion. No plate is created or destroyed. What hazards would result from plates grinding past each other?').build());

  // A4: Pattern recognition (4 pts)
  const a4 = form.addMultipleChoiceItem();
  a4.setTitle('A4. Why do most earthquakes and volcanoes occur along plate boundaries rather than in the middle of plates?')
  a4.setPoints(4)
  a4.setChoices([
    a4.createChoice('Plate boundaries are closer to the sun\'s heat', false),
    a4.createChoice('Random chance—there\'s no real pattern', false),
    a4.createChoice('Plate boundaries are where stress accumulates and magma can access the surface through cracks', true),
    a4.createChoice('The middle of plates is too thick for earthquakes', false)
  ])
  a4.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Boundaries are active zones where plates interact! Stress from movement causes earthquakes; gaps and subduction create pathways for magma.').build())
  a4.setFeedbackForIncorrect(FormApp.createFeedback().setText('Think about what\'s happening at boundaries: plates colliding, separating, or sliding. Where would stress build? Where could magma escape?').build());

  // ═══════════════════════════════════════════════════════════════════════
  // SECTION B: SEAFLOOR EVIDENCE (15 pts)
  // ═══════════════════════════════════════════════════════════════════════

  form.addSectionHeaderItem().setTitle('SECTION B: Seafloor Evidence (15 points)');

  // B1: Magnetic stripes (4 pts)
  const b1 = form.addMultipleChoiceItem();
  b1.setTitle('B1. Scientists discovered symmetrical magnetic stripes on the ocean floor on either side of mid-ocean ridges. What does this pattern prove?')
  b1.setPoints(4)
  b1.setChoices([
    b1.createChoice('Magnets are scattered randomly across the ocean floor', false),
    b1.createChoice('New crust forms at ridges and spreads outward equally in both directions, recording magnetic reversals', true),
    b1.createChoice('Ocean water has magnetic properties', false),
    b1.createChoice('The ocean floor has never changed since Earth formed', false)
  ])
  b1.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Magnetic stripes are like a tape recorder! As new crust forms at ridges, it records Earth\'s magnetic field direction at that time, creating symmetrical patterns.').build())
  b1.setFeedbackForIncorrect(FormApp.createFeedback().setText('Stripes are SYMMETRICAL (mirror image) on both sides of ridges. What process would create identical patterns spreading away from a central point?').build());

  // B2: Seafloor age pattern (4 pts)
  const b2 = form.addMultipleChoiceItem();
  b2.setTitle('B2. Ocean floor rock near mid-ocean ridges is very young (< 10 million years), while rock near continents is much older (up to 200 million years). What does this age pattern demonstrate?')
  b2.setPoints(4)
  b2.setChoices([
    b2.createChoice('The ocean floor formed first near the continents', false),
    b2.createChoice('New ocean floor is continuously created at ridges and moves away, so the oldest floor is farthest from ridges', true),
    b2.createChoice('Ocean floor doesn\'t have a real age—dating methods are wrong', false),
    b2.createChoice('Rock ages are random across the ocean floor', false)
  ])
  b2.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Age increases with distance from ridges—exactly what seafloor spreading predicts! The Atlantic Ocean is still widening at ~2.5 cm/year.').build())
  b2.setFeedbackForIncorrect(FormApp.createFeedback().setText('If new rock forms at ridges and spreads outward, where would you find the youngest rock? The oldest? Does the data match this prediction?').build());

  // B3: Continental drift evidence (4 pts)
  const b3 = form.addMultipleChoiceItem();
  b3.setTitle('B3. Mesosaurus fossils (a freshwater reptile) are found ONLY in eastern South America and western Africa. What does this distribution suggest?')
  b3.setPoints(4)
  b3.setChoices([
    b3.createChoice('Mesosaurus could swim across the Atlantic Ocean', false),
    b3.createChoice('These continents were once joined, allowing Mesosaurus to live across both areas before they separated', true),
    b3.createChoice('Mesosaurus evolved independently on both continents', false),
    b3.createChoice('Scientists planted fossils to support their theory', false)
  ])
  b3.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ A freshwater reptile couldn\'t survive an ocean crossing. The only logical explanation is that South America and Africa were once connected—part of Pangaea!').build())
  b3.setFeedbackForIncorrect(FormApp.createFeedback().setText('Mesosaurus lived in freshwater and couldn\'t survive in the ocean. The Atlantic is thousands of km wide. What\'s the simplest explanation for fossils on both continents?').build());

  // B4: Rate of spreading (3 pts)
  const b4 = form.addMultipleChoiceItem();
  b4.setTitle('B4. The Atlantic Ocean widens at about 2.5 cm per year. Which analogy BEST describes this rate?')
  b4.setPoints(3)
  b4.setChoices([
    b4.createChoice('As fast as a car driving on the highway', false),
    b4.createChoice('About the rate your fingernails grow—too slow to see, but measurable with precise instruments', true),
    b4.createChoice('Fast enough to notice in your lifetime without instruments', false),
    b4.createChoice('So slow it can\'t be measured', false)
  ])
  b4.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ 2.5 cm/year ≈ fingernail growth rate! Unnoticeable daily, but over 200 million years, this adds up to 5,000+ km—the width of the Atlantic!').build())
  b4.setFeedbackForIncorrect(FormApp.createFeedback().setText('2.5 cm = about 1 inch per year. Your fingernails grow about 3-4 cm per year. Is this fast or slow compared to things you can observe changing?').build());

  // ═══════════════════════════════════════════════════════════════════════
  // SECTION C: VOLCANIC SYSTEMS (15 pts)
  // ═══════════════════════════════════════════════════════════════════════

  form.addSectionHeaderItem().setTitle('SECTION C: Volcanic Systems (15 points)');

  // C1: Viscosity and silica (4 pts)
  const c1 = form.addMultipleChoiceItem();
  c1.setTitle('C1. Why does high-silica magma (like rhyolite) tend to produce more explosive eruptions than low-silica magma (like basalt)?')
  c1.setPoints(4)
  c1.setChoices([
    c1.createChoice('High-silica magma is cooler and slower', false),
    c1.createChoice('High-silica magma is more viscous (thick), which traps gas; when pressure builds up enough, violent explosions occur', true),
    c1.createChoice('Silica has no effect on eruption style', false),
    c1.createChoice('Low-silica magma is actually more explosive', false)
  ])
  c1.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ The silica-viscosity-gas connection is key! High silica → thick magma → trapped gas → pressure buildup → BOOM!').build())
  c1.setFeedbackForIncorrect(FormApp.createFeedback().setText('Silica molecules form chains that make magma thicker (more viscous). In thick magma, can gas bubbles escape easily or do they get trapped?').build());

  // C2: Eruption type comparison (4 pts)
  const c2 = form.addMultipleChoiceItem();
  c2.setTitle('C2. Hawaiian volcanoes produce gentle lava flows, while Cascade volcanoes (like Mt. St. Helens) produce violent explosions. What plate tectonic setting explains this difference?')
  c2.setPoints(4)
  c2.setChoices([
    c2.createChoice('Both are at the same type of boundary', false),
    c2.createChoice('Hawaii is over a hot spot (melting mantle = low-silica basalt), while Cascades are at a subduction zone (melting crust = high-silica magma)', true),
    c2.createChoice('Cascade volcanoes are older so they explode more', false),
    c2.createChoice('Ocean water makes Hawaiian eruptions calmer', false)
  ])
  c2.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Tectonic setting → magma source → silica content → eruption style. Hawaii (hot spot, mantle basalt) vs Cascades (subduction, crustal material) = completely different behaviors!').build())
  c2.setFeedbackForIncorrect(FormApp.createFeedback().setText('What rock melts at each location? Mantle rock (basalt, low silica) vs crustal rock (high silica). How does source rock affect eruption style?').build());

  // C3: Volcanic hazards (4 pts)
  const c3 = form.addMultipleChoiceItem();
  c3.setTitle('C3. Which volcanic hazard typically causes the MOST deaths during explosive eruptions, and why?')
  c3.setPoints(4)
  c3.setChoices([
    c3.createChoice('Lava flows, because they are extremely hot', false),
    c3.createChoice('Pyroclastic flows, because they move too fast to escape (100-700 km/hr) and are superheated (700°C)', true),
    c3.createChoice('Volcanic earthquakes, because they destroy buildings', false),
    c3.createChoice('Ash clouds, because they block the sun', false)
  ])
  c3.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Pyroclastic flows are the deadliest! Unlike lava flows (which move at walking pace), pyroclastic flows are faster than cars and instantly lethal.').build())
  c3.setFeedbackForIncorrect(FormApp.createFeedback().setText('Compare speeds: Lava flows = walking pace (escapable). Pyroclastic flows = 100-700 km/hr (faster than any vehicle). Temperature: 700°C. Which allows escape?').build());

  // C4: Volcano monitoring (3 pts)
  const c4 = form.addMultipleChoiceItem();
  c4.setTitle('C4. Which combination of signals would suggest a volcanic eruption may be imminent?')
  c4.setPoints(3)
  c4.setChoices([
    c4.createChoice('Decreased seismic activity and stable gas emissions', false),
    c4.createChoice('Increased earthquakes getting shallower, ground swelling, and rising sulfur dioxide emissions', true),
    c4.createChoice('Decreasing ground temperature and no earthquakes', false),
    c4.createChoice('More tourists visiting the volcano', false)
  ])
  c4.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Classic pre-eruption signals! Rising magma breaks rock (shallow earthquakes), pushes up ground (deformation), and releases gases. These combined signals warrant evacuation warnings.').build())
  c4.setFeedbackForIncorrect(FormApp.createFeedback().setText('Think about what happens as magma rises: It breaks rock (earthquakes), pushes the surface up (deformation), and releases gases. What pattern would these create?').build());

  // ═══════════════════════════════════════════════════════════════════════
  // SECTION D: EARTH'S INTERIOR (15 pts)
  // ═══════════════════════════════════════════════════════════════════════

  form.addSectionHeaderItem().setTitle('SECTION D: Earth\'s Interior (15 points)');

  // D1: Seismic wave evidence (4 pts)
  const d1 = form.addMultipleChoiceItem();
  d1.setTitle('D1. S-waves from earthquakes travel through the mantle but NOT through the outer core. What does this tell us about these layers?')
  d1.setPoints(4)
  d1.setChoices([
    d1.createChoice('S-waves just run out of energy at the core', false),
    d1.createChoice('The mantle is solid (S-waves travel through it) while the outer core is liquid (S-waves cannot travel through liquids)', true),
    d1.createChoice('The outer core is denser so it blocks all waves', false),
    d1.createChoice('S-waves can travel through liquids too', false)
  ])
  d1.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ S-wave shadow zones were the key evidence for a liquid outer core! S-waves = shear waves, which only propagate through solids.').build())
  d1.setFeedbackForIncorrect(FormApp.createFeedback().setText('S-waves ONLY travel through solids. If they pass through the mantle, it must be... If they stop at the outer core, it must be...').build());

  // D2: Layer composition (4 pts)
  const d2 = form.addMultipleChoiceItem();
  d2.setTitle('D2. Earth\'s average density is 5.5 g/cm³, but surface rocks average only 2.7 g/cm³. What does this tell us about the core?')
  d2.setPoints(4)
  d2.setChoices([
    d2.createChoice('The core must be less dense than the surface', false),
    d2.createChoice('The core must be much denser (iron-nickel, ~10-13 g/cm³) to bring up the average', true),
    d2.createChoice('Earth must be hollow to balance the dense surface', false),
    d2.createChoice('Density is the same throughout Earth', false)
  ])
  d2.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Simple math! If average = 5.5 and surface = 2.7, the interior must be MUCH denser. Iron (7.9 g/cm³) under pressure reaches 10-13 g/cm³—perfect match!').build())
  d2.setFeedbackForIncorrect(FormApp.createFeedback().setText('Average = (all parts combined) ÷ total. If surface = 2.7 and average = 5.5, what must the interior be to pull up that average?').build());

  // D3: Inner vs outer core (4 pts)
  const d3 = form.addMultipleChoiceItem();
  d3.setTitle('D3. Both the inner and outer core are made of iron-nickel, but the inner core is SOLID while the outer core is LIQUID. Why?')
  d3.setPoints(4)
  d3.setChoices([
    d3.createChoice('The inner core is cooler so iron solidifies', false),
    d3.createChoice('Extreme pressure at the inner core raises iron\'s melting point above its temperature, forcing it to stay solid even at 5,000°C', true),
    d3.createChoice('The inner core is made of a different type of iron', false),
    d3.createChoice('Scientists can\'t explain this difference', false)
  ])
  d3.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Counter-intuitive but true! The inner core is HOTTER than the outer core, but extreme pressure (360 GPa) raises iron\'s melting point even higher.').build())
  d3.setFeedbackForIncorrect(FormApp.createFeedback().setText('Pressure affects melting point. Under extreme pressure, materials can stay solid at higher temperatures. Where is pressure greatest—inner or outer core?').build());

  // D4: Mantle properties (3 pts)
  const d4 = form.addMultipleChoiceItem();
  d4.setTitle('D4. The mantle is responsible for plate tectonics through convection, yet it\'s mostly SOLID rock. How is this possible?')
  d4.setPoints(3)
  d4.setChoices([
    d4.createChoice('The mantle is actually liquid like many people think', false),
    d4.createChoice('At high temperature and pressure, solid rock becomes plastic and flows very slowly over millions of years', true),
    d4.createChoice('Only the outer core convects, not the mantle', false),
    d4.createChoice('Convection doesn\'t require flow—it happens through heat radiation', false)
  ])
  d4.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ The asthenosphere flows like very thick tar—solid on human timescales, but "liquid" over geological time. This drives plate movement at cm/year speeds.').build())
  d4.setFeedbackForIncorrect(FormApp.createFeedback().setText('Think of glacier ice: solid, but it flows! Or pitch tar: solid if hit quickly, but flows over months. The mantle behaves similarly over millions of years.').build());

  Logger.log('G7.C6.W5 Part 2 created: ' + form.getEditUrl());
  return form;
}

// ═══════════════════════════════════════════════════════════════════════════
// PART 3: MISCONCEPTION CHECK (20 points)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Creates Part 3: Misconception Check targeting common misconceptions
 * Time: 20 minutes
 * Targets: plates-float-magma, continents-move-fast, earthquakes-random
 */
function createG7C6W5Part3MisconceptionCheck() {
  const form = FormApp.create('G7.C6.W5: Part 3 - Misconception Check');
  form.setDescription(
    '🧠 MISCONCEPTION CHECK: Testing Scientific Understanding\n\n' +
    'This section specifically targets common misconceptions about plate tectonics and Earth\'s interior. ' +
    'Read each question carefully—they\'re designed to reveal whether you truly understand these concepts ' +
    'or are relying on common (but incorrect) ideas.\n\n' +
    'Time: 20 minutes\n' +
    'Points: 20'
  );
  form.setIsQuiz(true);
  form.setShuffleQuestions(false);

  // M1: Plates-float-magma misconception (4 pts)
  const m1 = form.addMultipleChoiceItem();
  m1.setTitle('M1. A student says "Tectonic plates float on liquid magma like boats on water." What\'s wrong with this statement?')
  m1.setHelpText('Think carefully about what you learned about the mantle\'s physical state.')
  m1.setPoints(4)
  m1.setChoices([
    m1.createChoice('Nothing—this is exactly how plate tectonics works', false),
    m1.createChoice('Plates rest on the asthenosphere, which is SOLID rock that flows very slowly (like plastic), not liquid magma', true),
    m1.createChoice('Plates don\'t float at all—they\'re fixed in place', false),
    m1.createChoice('The student is right, but should say "lava" instead of "magma"', false)
  ])
  m1.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Critical correction! The mantle is ~99% SOLID rock. The asthenosphere flows like thick plastic over millions of years—it\'s not a sea of liquid magma.').build())
  m1.setFeedbackForIncorrect(FormApp.createFeedback().setText('Key evidence: S-waves travel through the mantle. S-waves only travel through SOLIDS. What does this tell you about the mantle\'s state?').build());

  // M2: More plates-float-magma detail (4 pts)
  const m2 = form.addMultipleChoiceItem();
  m2.setTitle('M2. If the mantle were truly liquid magma (like the misconception suggests), what would happen to S-waves traveling through Earth?')
  m2.setHelpText('Remember what you learned about seismic wave behavior.')
  m2.setPoints(4)
  m2.setChoices([
    m2.createChoice('S-waves would travel faster through liquid', false),
    m2.createChoice('S-waves would be completely blocked by a liquid mantle and never reach the other side of Earth', true),
    m2.createChoice('S-waves would be unaffected by whether the mantle is solid or liquid', false),
    m2.createChoice('S-waves would convert to P-waves in liquid', false)
  ])
  m2.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Exactly! S-waves CAN\'T travel through liquids. The fact that S-waves DO pass through the mantle proves it\'s solid (even though it flows slowly).').build())
  m2.setFeedbackForIncorrect(FormApp.createFeedback().setText('S-waves = shear waves, which require particles connected in a solid to propagate. In a liquid, particles aren\'t connected enough. Result: S-waves stop.').build());

  // M3: Continents-move-fast misconception (4 pts)
  const m3 = form.addMultipleChoiceItem();
  m3.setTitle('M3. A TV show depicts continents racing across the globe, visibly moving in a matter of hours. Why is this scientifically inaccurate?')
  m3.setHelpText('Consider the actual rate of plate movement.')
  m3.setPoints(4)
  m3.setChoices([
    m3.createChoice('Continents used to move faster in the past', false),
    m3.createChoice('Plates move only 1-10 cm per year (fingernail growth rate)—far too slow to see without precise instruments', true),
    m3.createChoice('This could happen during major earthquakes', false),
    m3.createChoice('Some continents move fast while others move slowly', false)
  ])
  m3.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Hollywood exaggerates! At 2.5 cm/year, you\'d need 40 years to move 1 meter. The Atlantic took ~200 million years to form—definitely not visible in human timescales!').build())
  m3.setFeedbackForIncorrect(FormApp.createFeedback().setText('Calculate: 2.5 cm/year = about 1 inch per year. How long to move 1 km? 1,000 meters ÷ 0.025 m/year = 40,000 years! Is this "fast"?').build());

  // M4: Earthquakes-random misconception (4 pts)
  const m4 = form.addMultipleChoiceItem();
  m4.setTitle('M4. Someone claims "Earthquakes could happen anywhere—they\'re completely random." How would you correct this misconception using evidence?')
  m4.setHelpText('Think about earthquake distribution patterns.')
  m4.setPoints(4)
  m4.setChoices([
    m4.createChoice('This is true—earthquakes are unpredictable', false),
    m4.createChoice('Earthquakes cluster along plate boundaries where stress builds up; ~90% occur in the Ring of Fire around the Pacific Plate', true),
    m4.createChoice('Earthquakes only happen in places that have had earthquakes before', false),
    m4.createChoice('Earthquakes are random but only occur on continents', false)
  ])
  m4.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ While the TIMING is hard to predict, the LOCATION is not random at all! Plate boundaries are where stress accumulates, making earthquakes far more likely there.').build())
  m4.setFeedbackForIncorrect(FormApp.createFeedback().setText('Look at an earthquake map: Do earthquakes scatter randomly, or do they cluster in specific zones? What do those zones correspond to?').build());

  // M5: Synthesis question (4 pts)
  const m5 = form.addParagraphTextItem();
  m5.setTitle('M5. Explain how understanding that the mantle is SOLID (not liquid) actually makes plate tectonics MORE impressive, not less. Why is it remarkable that solid rock can flow and move continents?')
  m5.setHelpText('Think about timescales, temperature, pressure, and how our everyday experience with solids doesn\'t apply at geological scales.')
  m5.setPoints(4);

  Logger.log('G7.C6.W5 Part 3 created: ' + form.getEditUrl());
  return form;
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN EXECUTION & UTILITIES
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Creates all forms for G7.C6.W5
 */
function createAllG7C6W5Forms() {
  Logger.log('═══════════════════════════════════════════════════════════════');
  Logger.log('Creating G7.C6.W5: Synthesis & Assessment');
  Logger.log('═══════════════════════════════════════════════════════════════');

  const part1 = createG7C6W5Part1SynthesisReview();
  const part2 = createG7C6W5Part2Assessment();
  const part3 = createG7C6W5Part3MisconceptionCheck();

  Logger.log('═══════════════════════════════════════════════════════════════');
  Logger.log('G7.C6.W5 Forms Creation Complete!');
  Logger.log('Total Points: ' + validateG7C6W5Points());
  Logger.log('═══════════════════════════════════════════════════════════════');

  return {
    part1: part1,
    part2: part2,
    part3: part3
  };
}

/**
 * Validates that total points equal 100
 */
function validateG7C6W5Points() {
  const points = G7_C6_W5_CONFIG.points;
  const total = points.part1SynthesisReview + points.part2Assessment + points.part3MisconceptionCheck;

  if (total !== 100) {
    Logger.log('⚠️ WARNING: Total points = ' + total + ', expected 100');
  }

  return total;
}
