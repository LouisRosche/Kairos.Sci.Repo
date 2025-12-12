/**
 * ═══════════════════════════════════════════════════════════════════════════
 * GRADE 7 CYCLE 7 WEEK 4: Synthesis & Assessment
 * STATUS: ✅ COMPLETE - READY FOR REVIEW
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * ASSESSMENT WEEK: Rock Cycle & Earth's History
 *
 * This week synthesizes and assesses student learning across the entire
 * Cycle 7 unit on rock types, the rock cycle, geologic time, and dating methods.
 * Students demonstrate mastery through multi-part assessment while addressing
 * persistent misconceptions.
 *
 * Assessment Structure:
 * - Part 1: Synthesis Review (20 pts, 15 min)
 * - Part 2: Cumulative Assessment (60 pts, 40 min)
 *   - Section A: Rock Types & Cycle (15 pts)
 *   - Section B: Geologic Time (15 pts)
 *   - Section C: Dating Methods (15 pts)
 *   - Section D: Evidence-Based Explanations (15 pts)
 * - Part 3: Misconception Check (20 pts, 20 min)
 *
 * Standards Alignment:
 * - MS-ESS1-4: Geologic time scale and Earth's history
 * - MS-ESS2-2: Geoscience processes
 *
 * Misconception Targets:
 * - fossils-bones-only: Fossils include traces, molds, casts, preserved organisms
 * - rock-permanent: Rocks continuously cycle through different forms
 * - older-deeper-always: Tectonic forces can flip, fold, or intrude layers
 *
 * ═══════════════════════════════════════════════════════════════════════════
 */

// ═══════════════════════════════════════════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════

const G7_C7_W4_CONFIG = {
  grade: 7,
  cycle: 7,
  week: 4,
  topic: 'Synthesis & Assessment: Rock Cycle & Earth\'s History',
  isAssessmentWeek: true,

  standards: {
    assessed: ['MS-ESS1-4', 'MS-ESS2-2', 'MS-ESS2-5']
  },

  points: {
    part1SynthesisReview: 20,
    part2Assessment: 60,
    part3MisconceptionCheck: 20,
    total: 100
  },

  assessmentSections: {
    A: 'Rock Types & Cycle',
    B: 'Geologic Time',
    C: 'Dating Methods',
    D: 'Evidence-Based Explanations'
  },

  misconceptionTargets: [
    'fossils-bones-only',
    'rock-permanent',
    'older-deeper-always'
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
 * Creates Part 1: Synthesis Review connecting all rock cycle and Earth history concepts
 * Time: 15 minutes
 */
function createG7C7W4Part1SynthesisReview() {
  const form = FormApp.create('G7.C7.W4: Part 1 - Synthesis Review');
  form.setDescription(
    '🔗 SYNTHESIS REVIEW: Connecting Rock Cycle & Earth\'s History\n\n' +
    'This review connects all the concepts you\'ve learned in Cycle 7:\n' +
    '• Week 1: Rock Types & the Rock Cycle\n' +
    '• Week 2: Geologic Time & Fossil Evidence\n' +
    '• Week 3: Radiometric Dating & Absolute Age\n\n' +
    'Time: 15 minutes\n' +
    'Points: 20'
  );
  form.setIsQuiz(true);
  form.setShuffleQuestions(false);

  // Q1: Rock cycle and plate tectonics connection (4 pts)
  const q1 = form.addMultipleChoiceItem();
  q1.setTitle('How does plate tectonics drive the rock cycle? Connect subduction zones, mid-ocean ridges, and mountain building to rock transformations.')
  q1.setHelpText('Think about where each rock type forms and what processes transform them.')
  q1.setPoints(4)
  q1.setChoices([
    q1.createChoice('Plate tectonics has no effect on the rock cycle', false),
    q1.createChoice('Subduction melts rock (→igneous), ridges create new crust (→igneous), mountain building creates pressure (→metamorphic), weathering produces sediment (→sedimentary)', true),
    q1.createChoice('Only volcanoes affect the rock cycle', false),
    q1.createChoice('Plate tectonics only affects igneous rocks', false)
  ])
  q1.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ The rock cycle is driven by plate tectonics! Different tectonic settings create the conditions for each rock transformation.').build())
  q1.setFeedbackForIncorrect(FormApp.createFeedback().setText('Think about each tectonic process: What happens to rock at subduction zones? At spreading ridges? When continents collide? Each process transforms rocks differently.').build());

  // Q2: Geologic time and fossils integration (4 pts)
  const q2 = form.addMultipleChoiceItem();
  q2.setTitle('How do fossils help scientists organize geologic time? What makes certain fossils better "index fossils" than others?')
  q2.setHelpText('Think about what characteristics make a fossil useful for dating rocks.')
  q2.setPoints(4)
  q2.setChoices([
    q2.createChoice('Any fossil can be used equally well for dating rocks', false),
    q2.createChoice('Good index fossils are widespread geographically, existed for a short time period, and are easily recognizable—allowing precise correlation of rock layers', true),
    q2.createChoice('Only dinosaur fossils can be used to date rocks', false),
    q2.createChoice('Fossils cannot actually help with dating—only radiometric methods work', false)
  ])
  q2.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Index fossils are like time stamps! Trilobites, ammonites, and certain brachiopods are excellent because they evolved rapidly and spread widely.').build())
  q2.setFeedbackForIncorrect(FormApp.createFeedback().setText('For a fossil to be useful for dating, it needs to: (1) be found in many places, (2) have existed for a limited time, and (3) be easy to identify. Why do these matter?').build());

  // Q3: Dating methods integration (4 pts)
  const q3 = form.addMultipleChoiceItem();
  q3.setTitle('Why do scientists use BOTH relative dating (superposition, fossils) AND absolute dating (radiometric) to determine rock ages?')
  q3.setHelpText('Consider the strengths and limitations of each method.')
  q3.setPoints(4)
  q3.setChoices([
    q3.createChoice('They only use radiometric dating—relative dating is outdated', false),
    q3.createChoice('Relative dating provides sequence and correlation; absolute dating provides actual ages in years—together they give a complete picture', true),
    q3.createChoice('Scientists pick whichever method is cheaper', false),
    q3.createChoice('The methods give the same information, so using both is redundant', false)
  ])
  q3.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Each method provides different information! Relative dating: "A is older than B." Absolute dating: "A is 350 million years old." Both are needed for complete understanding.').build())
  q3.setFeedbackForIncorrect(FormApp.createFeedback().setText('Relative dating tells us ORDER but not specific ages. Radiometric dating gives NUMBERS but requires the right rock types. How do they complement each other?').build());

  // Q4: Evidence-based explanation (4 pts)
  const q4 = form.addMultipleChoiceItem();
  q4.setTitle('A geologist finds marine fossils in rock layers at the top of the Himalayas. Using your knowledge of the rock cycle and plate tectonics, what\'s the best explanation?')
  q4.setHelpText('Connect fossil evidence to tectonic processes and rock formation.')
  q4.setPoints(4)
  q4.setChoices([
    q4.createChoice('The fossils are fake and were placed there', false),
    q4.createChoice('Ancient oceans once covered the Himalayas; these sedimentary rocks (with fossils) were uplifted when India collided with Asia, pushing former seafloor to mountaintop heights', true),
    q4.createChoice('Marine animals lived on top of mountains millions of years ago', false),
    q4.createChoice('Flood waters carried the fossils up the mountains', false)
  ])
  q4.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ This is one of the most powerful pieces of evidence for plate tectonics! The Tethys Sea floor became the Himalayan peaks through continental collision.').build())
  q4.setFeedbackForIncorrect(FormApp.createFeedback().setText('Marine fossils form in sedimentary rocks underwater. How could sedimentary rock that formed on the ocean floor end up at 8,000+ meters elevation?').build());

  // Q5: System thinking (4 pts)
  const q5 = form.addParagraphTextItem();
  q5.setTitle('Describe how a single grain of sand could travel through the entire rock cycle over hundreds of millions of years. Include at least THREE different rock types in your explanation and connect them to specific geologic processes.')
  q5.setHelpText('Trace the journey: What processes transform the sand? What rock types form? How does it return to sand?')
  q5.setPoints(4);

  Logger.log('G7.C7.W4 Part 1 created: ' + form.getEditUrl());
  return form;
}

// ═══════════════════════════════════════════════════════════════════════════
// PART 2: CUMULATIVE ASSESSMENT (60 points)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Creates Part 2: Cumulative Assessment covering all unit content
 * Time: 40 minutes
 * Sections: A (Rock Types & Cycle), B (Geologic Time), C (Dating Methods), D (Evidence-Based Explanations)
 */
function createG7C7W4Part2Assessment() {
  const form = FormApp.create('G7.C7.W4: Part 2 - Cumulative Assessment');
  form.setDescription(
    '📝 CUMULATIVE ASSESSMENT: Rock Cycle & Earth\'s History\n\n' +
    'This assessment covers all content from Cycle 7.\n\n' +
    'Section A: Rock Types & Cycle (15 pts)\n' +
    'Section B: Geologic Time (15 pts)\n' +
    'Section C: Dating Methods (15 pts)\n' +
    'Section D: Evidence-Based Explanations (15 pts)\n\n' +
    'Time: 40 minutes\n' +
    'Total Points: 60\n\n' +
    'This is an individual assessment—complete it on your own.'
  );
  form.setIsQuiz(true);
  form.setShuffleQuestions(false);

  // ═══════════════════════════════════════════════════════════════════════
  // SECTION A: ROCK TYPES & CYCLE (15 pts)
  // ═══════════════════════════════════════════════════════════════════════

  form.addSectionHeaderItem().setTitle('SECTION A: Rock Types & Cycle (15 points)');

  // A1: Rock types (3 pts)
  const a1 = form.addMultipleChoiceItem();
  a1.setTitle('A1. What process forms IGNEOUS rocks?')
  a1.setPoints(3)
  a1.setChoices([
    a1.createChoice('Compaction and cementation of sediments', false),
    a1.createChoice('Cooling and crystallization of molten rock (magma/lava)', true),
    a1.createChoice('Heat and pressure changing existing rock', false),
    a1.createChoice('Weathering and erosion of mountains', false)
  ])
  a1.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Igneous = "from fire." Magma cooling underground = intrusive igneous (granite). Lava cooling at surface = extrusive igneous (basalt).').build())
  a1.setFeedbackForIncorrect(FormApp.createFeedback().setText('Igneous rocks form from molten material. The word "igneous" comes from Latin for "fire." Think: where does molten rock come from?').build());

  // A2: Metamorphic rock formation (4 pts)
  const a2 = form.addMultipleChoiceItem();
  a2.setTitle('A2. Limestone (a sedimentary rock) can transform into marble (a metamorphic rock). What causes this transformation?')
  a2.setPoints(4)
  a2.setChoices([
    a2.createChoice('The limestone melts completely and recrystallizes', false),
    a2.createChoice('Heat and pressure reorganize the minerals without melting the rock', true),
    a2.createChoice('Water dissolves the limestone and deposits marble', false),
    a2.createChoice('Fossils in the limestone turn into marble', false)
  ])
  a2.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Metamorphism = change without melting! Heat and pressure rearrange atoms into new mineral structures. Limestone → marble, shale → slate, granite → gneiss.').build())
  a2.setFeedbackForIncorrect(FormApp.createFeedback().setText('Metamorphic rocks form when existing rocks are subjected to heat and/or pressure—but NOT enough to melt them. If they melted, what type of rock would form instead?').build());

  // A3: Sedimentary rock formation (4 pts)
  const a3 = form.addMultipleChoiceItem();
  a3.setTitle('A3. What sequence of processes forms SEDIMENTARY rock?')
  a3.setPoints(4)
  a3.setChoices([
    a3.createChoice('Melting → cooling → crystallization', false),
    a3.createChoice('Weathering → erosion → deposition → compaction → cementation', true),
    a3.createChoice('Heat → pressure → recrystallization', false),
    a3.createChoice('Deposition → melting → cooling', false)
  ])
  a3.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Sedimentary = "from sediment." Rock breaks down (weathering) → moves (erosion) → settles (deposition) → gets buried and squeezed (compaction/cementation) = sedimentary rock!').build())
  a3.setFeedbackForIncorrect(FormApp.createFeedback().setText('Sedimentary rocks form from fragments of other rocks. What processes break rock into fragments? What happens to those fragments over time?').build());

  // A4: Rock cycle pathways (4 pts)
  const a4 = form.addMultipleChoiceItem();
  a4.setTitle('A4. Can an igneous rock become a sedimentary rock WITHOUT first becoming metamorphic?')
  a4.setPoints(4)
  a4.setChoices([
    a4.createChoice('No—all rocks must pass through all three types', false),
    a4.createChoice('Yes—igneous rock can weather, erode, and become sediment that forms sedimentary rock directly', true),
    a4.createChoice('No—igneous rocks cannot become sedimentary rocks', false),
    a4.createChoice('Only if the igneous rock is very old', false)
  ])
  a4.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ The rock cycle has many pathways! Any rock type can transform into any other through the right processes. There\'s no required sequence.').build())
  a4.setFeedbackForIncorrect(FormApp.createFeedback().setText('Think about granite mountains: They weather and erode. Where does that material go? What happens to it? Does it need to become metamorphic first?').build());

  // ═══════════════════════════════════════════════════════════════════════
  // SECTION B: GEOLOGIC TIME (15 pts)
  // ═══════════════════════════════════════════════════════════════════════

  form.addSectionHeaderItem().setTitle('SECTION B: Geologic Time (15 points)');

  // B1: Superposition principle (4 pts)
  const b1 = form.addMultipleChoiceItem();
  b1.setTitle('B1. According to the principle of superposition, in an undisturbed sequence of rock layers:')
  b1.setPoints(4)
  b1.setChoices([
    b1.createChoice('Older layers are on top, younger layers are on bottom', false),
    b1.createChoice('Older layers are on bottom, younger layers are on top', true),
    b1.createChoice('Age cannot be determined from layer position', false),
    b1.createChoice('All layers are the same age', false)
  ])
  b1.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Like stacking books—the first book down (oldest) is at the bottom. Later books (younger) stack on top. Same with sedimentary layers!').build())
  b1.setFeedbackForIncorrect(FormApp.createFeedback().setText('Think about how layers form: Sediment settles and accumulates over time. Which layer had to form first—the one on top or the one on bottom?').build());

  // B2: Geologic time scale (4 pts)
  const b2 = form.addMultipleChoiceItem();
  b2.setTitle('B2. The geologic time scale divides Earth\'s 4.6 billion year history into eons, eras, periods, and epochs. What major events typically define the boundaries between these divisions?')
  b2.setPoints(4)
  b2.setChoices([
    b2.createChoice('Changes in rock color', false),
    b2.createChoice('Mass extinctions, evolution of new life forms, or major environmental changes recorded in fossils and rocks', true),
    b2.createChoice('Random dates chosen by scientists', false),
    q2.createChoice('The time when humans first appeared', false)
  ])
  b2.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Time boundaries mark major changes! The K-Pg boundary (dinosaur extinction), the P-T boundary (largest mass extinction), and others record dramatic changes in Earth\'s life.').build())
  b2.setFeedbackForIncorrect(FormApp.createFeedback().setText('Scientists noticed that certain fossils disappear and new ones appear at specific rock layers worldwide. What could cause such dramatic changes?').build());

  // B3: Deep time comprehension (3 pts)
  const b3 = form.addMultipleChoiceItem();
  b3.setTitle('B3. If Earth\'s 4.6 billion year history were compressed into a 24-hour day (starting at midnight), when would humans first appear?')
  b3.setPoints(3)
  b3.setChoices([
    b3.createChoice('Around noon (halfway through Earth\'s history)', false),
    b3.createChoice('Around 6 PM (three-quarters through)', false),
    b3.createChoice('In the last minute before midnight (humans are extremely recent)', true),
    b3.createChoice('At midnight exactly when Earth formed', false)
  ])
  b3.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Humans appeared about 300,000 years ago. On a 24-hour scale, that\'s the last ~6 seconds before midnight! Dinosaurs would appear around 10:40 PM.').build())
  b3.setFeedbackForIncorrect(FormApp.createFeedback().setText('Modern humans: ~300,000 years. Earth: 4,600,000,000 years. Humans represent 0.0065% of Earth\'s history—an incredibly thin slice of time!').build());

  // B4: Eras and life (4 pts)
  const b4 = form.addMultipleChoiceItem();
  b4.setTitle('B4. The Mesozoic Era is known as the "Age of Dinosaurs." What ended this era approximately 66 million years ago?')
  b4.setPoints(4)
  b4.setChoices([
    b4.createChoice('Dinosaurs evolved into birds and simply disappeared', false),
    b4.createChoice('An asteroid impact and volcanic activity caused mass extinction, ending dinosaur dominance', true),
    b4.createChoice('Humans hunted dinosaurs to extinction', false),
    b4.createChoice('A global flood killed all dinosaurs', false)
  ])
  b4.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ The Chicxulub impact plus Deccan Traps volcanism caused the K-Pg extinction. 75% of species died, including non-avian dinosaurs. Birds (avian dinosaurs) survived!').build())
  b4.setFeedbackForIncorrect(FormApp.createFeedback().setText('Evidence includes: iridium layer worldwide (asteroid signature), shocked quartz, Chicxulub crater in Mexico. Combined with massive volcanic activity in India.').build());

  // ═══════════════════════════════════════════════════════════════════════
  // SECTION C: DATING METHODS (15 pts)
  // ═══════════════════════════════════════════════════════════════════════

  form.addSectionHeaderItem().setTitle('SECTION C: Dating Methods (15 points)');

  // C1: Relative vs absolute dating (4 pts)
  const c1 = form.addMultipleChoiceItem();
  c1.setTitle('C1. What is the key difference between relative dating and absolute dating?')
  c1.setPoints(4)
  c1.setChoices([
    c1.createChoice('Relative dating is more accurate than absolute dating', false),
    c1.createChoice('Relative dating determines order/sequence; absolute dating determines actual age in years', true),
    c1.createChoice('Absolute dating only works on very young rocks', false),
    c1.createChoice('There is no real difference—they give the same information', false)
  ])
  c1.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Relative: "Layer A is older than Layer B." Absolute: "Layer A is 245 million years old." Both are valuable and complement each other!').build())
  c1.setFeedbackForIncorrect(FormApp.createFeedback().setText('Relative dating tells us which is older/younger (like "your sibling is older than you"). Absolute dating gives specific numbers (like "your sibling is 16 years old").').build());

  // C2: Half-life concept (4 pts)
  const c2 = form.addMultipleChoiceItem();
  c2.setTitle('C2. A radioactive isotope has a half-life of 1,000 years. If you start with 100 grams, how much parent isotope remains after 3,000 years?')
  c2.setPoints(4)
  c2.setChoices([
    c2.createChoice('0 grams (completely decayed)', false),
    c2.createChoice('12.5 grams (three half-lives: 100→50→25→12.5)', true),
    c2.createChoice('50 grams (only one half-life passed)', false),
    c2.createChoice('33.3 grams (divided by 3)', false)
  ])
  c2.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ After each half-life, half remains. 3,000 years = 3 half-lives. 100 → 50 (1,000 yrs) → 25 (2,000 yrs) → 12.5 (3,000 yrs).').build())
  c2.setFeedbackForIncorrect(FormApp.createFeedback().setText('Half-life = time for half to decay. After 1 half-life: 50g. After 2: 25g. After 3: 12.5g. Each time, divide by 2.').build());

  // C3: Dating method selection (4 pts)
  const c3 = form.addMultipleChoiceItem();
  c3.setTitle('C3. Carbon-14 has a half-life of 5,730 years. Why can\'t C-14 dating be used on dinosaur bones (66+ million years old)?')
  c3.setPoints(4)
  c3.setChoices([
    c3.createChoice('Dinosaurs didn\'t have carbon in their bones', false),
    c3.createChoice('After ~50,000 years, virtually no C-14 remains—too many half-lives have passed for accurate measurement', true),
    c3.createChoice('C-14 dating only works on plants, not animals', false),
    c3.createChoice('Dinosaur bones are too hard for C-14 dating', false)
  ])
  c3.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ After ~9 half-lives (~50,000 years), less than 0.2% of original C-14 remains—undetectable! For dinosaurs, scientists use isotopes with longer half-lives (U-238, K-40).').build())
  c3.setFeedbackForIncorrect(FormApp.createFeedback().setText('C-14 half-life = 5,730 years. After 50,000 years (about 9 half-lives), almost no C-14 remains. Dinosaurs lived 66+ million years ago—way beyond C-14\'s range.').build());

  // C4: Dating limitations (3 pts)
  const c4 = form.addMultipleChoiceItem();
  c4.setTitle('C4. Why can fossils (which are often found in sedimentary rock) typically NOT be directly dated using radiometric methods?')
  c4.setPoints(3)
  c4.setChoices([
    c4.createChoice('Sedimentary rocks form from fragments of other rocks, so their minerals don\'t record a single crystallization event', true),
    c4.createChoice('Sedimentary rocks are too young for radiometric dating', false),
    c4.createChoice('Fossils absorb radiation and mess up the dating', false),
    c4.createChoice('Radiometric dating only works on bones, not rocks', false)
  ])
  c4.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Sedimentary rocks contain minerals from many sources and ages, mixed together. Scientists date igneous layers above/below to bracket fossil ages.').build())
  c4.setFeedbackForIncorrect(FormApp.createFeedback().setText('Radiometric dating measures when minerals crystallized from magma/lava. Sedimentary rocks are made of recycled fragments—when did those minerals crystallize? It\'s complicated!').build());

  // ═══════════════════════════════════════════════════════════════════════
  // SECTION D: EVIDENCE-BASED EXPLANATIONS (15 pts)
  // ═══════════════════════════════════════════════════════════════════════

  form.addSectionHeaderItem().setTitle('SECTION D: Evidence-Based Explanations (15 points)');

  // D1: Fossil distribution (4 pts)
  const d1 = form.addMultipleChoiceItem();
  d1.setTitle('D1. The same species of ancient fern fossils are found in South America, Africa, India, Australia, and Antarctica. What does this distribution suggest about Earth\'s past?')
  d1.setPoints(4)
  d1.setChoices([
    d1.createChoice('Fern seeds could float across all oceans', false),
    d1.createChoice('These continents were once joined together (Gondwana/Pangaea), allowing the fern to spread across connected landmasses', true),
    d1.createChoice('Scientists made errors identifying the fossils', false),
    d1.createChoice('The fern evolved separately on each continent', false)
  ])
  d1.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Glossopteris fern fossils are key evidence for continental drift! They couldn\'t spread across oceans, so the continents must have been connected.').build())
  d1.setFeedbackForIncorrect(FormApp.createFeedback().setText('Consider: This fern couldn\'t survive salt water or spread across thousands of miles of ocean. What\'s the simplest explanation for identical fossils on multiple continents?').build());

  // D2: Unconformity interpretation (4 pts)
  const d2 = form.addMultipleChoiceItem();
  d2.setTitle('D2. Geologists find horizontal sedimentary layers lying directly on top of tilted, eroded metamorphic rock. What does this "angular unconformity" indicate?')
  d2.setPoints(4)
  d2.setChoices([
    d2.createChoice('The metamorphic rock is younger than the sedimentary layers', false),
    d2.createChoice('A gap in the geologic record: the metamorphic rock was tilted and eroded before new sediment was deposited on top', true),
    d2.createChoice('Both rock types formed at the same time', false),
    d2.createChoice('The sedimentary layers caused the tilting', false)
  ])
  d2.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Unconformities represent missing time! Original rock → tilting → erosion → new deposition. Millions of years can be "missing" at unconformity surfaces.').build())
  d2.setFeedbackForIncorrect(FormApp.createFeedback().setText('The tilted rocks must have formed first, then been tilted by tectonic forces, then eroded flat, THEN new sediment deposited on top. What events happened during that gap?').build());

  // D3: Cross-cutting relationships (4 pts)
  const d3 = form.addMultipleChoiceItem();
  d3.setTitle('D3. An igneous dike cuts through several sedimentary layers. According to the principle of cross-cutting relationships, which is older?')
  d3.setPoints(4)
  d3.setChoices([
    d3.createChoice('The igneous dike is older because igneous rocks form first', false),
    d3.createChoice('The sedimentary layers are older—the dike had to intrude through pre-existing rock', true),
    d3.createChoice('They are the same age', false),
    d3.createChoice('Age cannot be determined from this relationship', false)
  ])
  d3.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ You can\'t cut through something that doesn\'t exist yet! The sedimentary layers had to be there first, then the magma intruded through them.').build())
  d3.setFeedbackForIncorrect(FormApp.createFeedback().setText('If magma intrudes through rock layers, which had to exist first—the magma or the layers it cut through? Think about the sequence of events.').build());

  // D4: Evidence synthesis (3 pts)
  const d4 = form.addParagraphTextItem();
  d4.setTitle('D4. A rock layer contains: (1) trilobite fossils (extinct 250 million years ago), (2) ripple marks suggesting shallow water, and (3) the rock is sandstone. Write a brief explanation of the environment where this rock formed, using ALL three pieces of evidence.')
  d4.setHelpText('Combine all evidence to reconstruct the ancient environment.')
  d4.setPoints(3);

  Logger.log('G7.C7.W4 Part 2 created: ' + form.getEditUrl());
  return form;
}

// ═══════════════════════════════════════════════════════════════════════════
// PART 3: MISCONCEPTION CHECK (20 points)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Creates Part 3: Misconception Check targeting common misconceptions
 * Time: 20 minutes
 * Targets: fossils-bones-only, rock-permanent, older-deeper-always
 */
function createG7C7W4Part3MisconceptionCheck() {
  const form = FormApp.create('G7.C7.W4: Part 3 - Misconception Check');
  form.setDescription(
    '🧠 MISCONCEPTION CHECK: Testing Scientific Understanding\n\n' +
    'This section specifically targets common misconceptions about rocks, fossils, and Earth\'s history. ' +
    'Read each question carefully—they\'re designed to reveal whether you truly understand these concepts ' +
    'or are relying on common (but incorrect) ideas.\n\n' +
    'Time: 20 minutes\n' +
    'Points: 20'
  );
  form.setIsQuiz(true);
  form.setShuffleQuestions(false);

  // M1: Fossils-bones-only misconception (4 pts)
  const m1 = form.addMultipleChoiceItem();
  m1.setTitle('M1. A student says "Fossils are just old bones and shells." How would you correct this misconception?')
  m1.setHelpText('Think about all the different types of evidence organisms leave behind.')
  m1.setPoints(4)
  m1.setChoices([
    m1.createChoice('The student is correct—fossils are only bones and shells', false),
    m1.createChoice('Fossils include trace fossils (footprints, burrows, coprolites), molds, casts, preserved organisms in amber/ice, and even chemical traces', true),
    m1.createChoice('Fossils also include living organisms', false),
    m1.createChoice('Only dinosaur bones count as fossils', false)
  ])
  m1.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Fossils = any preserved evidence of ancient life! This includes body fossils (bones, shells), trace fossils (tracks, burrows), and chemical fossils (organic compounds).').build())
  m1.setFeedbackForIncorrect(FormApp.createFeedback().setText('Think beyond bones: What about dinosaur footprints? Worm burrows? Insects in amber? Mammoth tissue in permafrost? All of these are fossils too!').build());

  // M2: More on fossils-bones-only (4 pts)
  const m2 = form.addMultipleChoiceItem();
  m2.setTitle('M2. Which of these is also considered a fossil?')
  m2.setHelpText('Remember the expanded definition of fossils.')
  m2.setPoints(4)
  m2.setChoices([
    m2.createChoice('A dinosaur footprint preserved in rock', true),
    m2.createChoice('A seashell found on a modern beach', false),
    m2.createChoice('A leaf that fell last autumn', false),
    m2.createChoice('A recently buried animal bone', false)
  ])
  m2.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Trace fossils like footprints, trackways, and burrows provide crucial information about behavior, movement, and ecology of extinct organisms!').build())
  m2.setFeedbackForIncorrect(FormApp.createFeedback().setText('Fossils are ancient—typically thousands to millions of years old. A footprint preserved in rock from millions of years ago tells us about extinct animals even without bones.').build());

  // M3: Rock-permanent misconception (4 pts)
  const m3 = form.addMultipleChoiceItem();
  m3.setTitle('M3. A student believes "Once a rock forms, it stays that type of rock forever." Why is this incorrect?')
  m3.setHelpText('Think about the rock cycle and geologic processes.')
  m3.setPoints(4)
  m3.setChoices([
    m3.createChoice('The student is correct—rocks are permanent', false),
    m3.createChoice('Rocks continuously cycle through igneous, sedimentary, and metamorphic forms as they experience weathering, melting, heat, and pressure over millions of years', true),
    m3.createChoice('Only some rocks can change—igneous rocks are permanent', false),
    m3.createChoice('Rocks can only change if humans dig them up', false)
  ])
  m3.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Nothing is permanent in geology! Mountains erode, ocean floors subduct and melt, metamorphic rocks can weather into sediment. The rock cycle never stops.').build())
  m3.setFeedbackForIncorrect(FormApp.createFeedback().setText('Consider the Himalayas: ancient seafloor (sedimentary) was compressed (metamorphic), now weathering (future sedimentary). Every rock is on a journey!').build());

  // M4: Older-deeper-always misconception (4 pts)
  const m4 = form.addMultipleChoiceItem();
  m4.setTitle('M4. A student assumes "Older rocks are ALWAYS deeper than younger rocks." When is this assumption incorrect?')
  m4.setHelpText('Think about tectonic forces and their effects on rock layers.')
  m4.setPoints(4)
  m4.setChoices([
    m4.createChoice('This is always true—there are no exceptions', false),
    m4.createChoice('Tectonic forces can fold layers (older on top), thrust older rocks over younger ones, or flip sequences completely through overturned folds', true),
    m4.createChoice('Older rocks are always deeper unless they\'re igneous', false),
    m4.createChoice('This is only incorrect in the ocean', false)
  ])
  m4.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Superposition only works for undisturbed layers! Folds, faults, and thrust sheets can put older rocks on top. Geologists must look for evidence of disturbance.').build())
  m4.setFeedbackForIncorrect(FormApp.createFeedback().setText('Think about what happens when continents collide: Rock layers can be folded, tilted, flipped upside down, or thrust over other layers. The "normal" sequence gets disrupted!').build());

  // M5: Synthesis question (4 pts)
  const m5 = form.addParagraphTextItem();
  m5.setTitle('M5. A classmate says: "The Grand Canyon layers prove that older rocks are always on the bottom, rocks never change type, and fossils are just bones." Using your knowledge, write a response that corrects ALL THREE misconceptions with specific examples or evidence.')
  m5.setHelpText('Address each misconception individually with scientific explanations.')
  m5.setPoints(4);

  Logger.log('G7.C7.W4 Part 3 created: ' + form.getEditUrl());
  return form;
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN EXECUTION & UTILITIES
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Creates all forms for G7.C7.W4
 */
function createAllG7C7W4Forms() {
  Logger.log('═══════════════════════════════════════════════════════════════');
  Logger.log('Creating G7.C7.W4: Synthesis & Assessment');
  Logger.log('═══════════════════════════════════════════════════════════════');

  const part1 = createG7C7W4Part1SynthesisReview();
  const part2 = createG7C7W4Part2Assessment();
  const part3 = createG7C7W4Part3MisconceptionCheck();

  Logger.log('═══════════════════════════════════════════════════════════════');
  Logger.log('G7.C7.W4 Forms Creation Complete!');
  Logger.log('Total Points: ' + validateG7C7W4Points());
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
function validateG7C7W4Points() {
  const points = G7_C7_W4_CONFIG.points;
  const total = points.part1SynthesisReview + points.part2Assessment + points.part3MisconceptionCheck;

  if (total !== 100) {
    Logger.log('⚠️ WARNING: Total points = ' + total + ', expected 100');
  }

  return total;
}
