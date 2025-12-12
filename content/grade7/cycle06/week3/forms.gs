/**
 * ═══════════════════════════════════════════════════════════════════════════
 * GRADE 7 CYCLE 6 WEEK 3: Volcanic Eruption Styles & Magma Properties
 * STATUS: ✅ COMPLETE - READY FOR REVIEW
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Driving Phenomenon: Why do some volcanoes explode violently while others ooze slowly?
 *
 * Students investigate the dramatic contrast between explosive volcanic eruptions
 * (like Mt. St. Helens) and effusive eruptions (like Hawaiian volcanoes). They
 * discover that magma composition, especially silica content, determines viscosity
 * and therefore eruption style.
 *
 * Weekly Structure:
 * - Hook: The Explosive vs Oozing Mystery (12 pts)
 * - Station 1: Magma Viscosity Investigation (20 pts)
 * - Station 2: Eruption Type Analysis (20 pts)
 * - Station 3: Design a Volcano Monitoring System (25 pts)
 * - Exit Ticket: Volcanic Systems Integration (23 pts)
 *
 * Standards Alignment:
 * - MS-ESS2-2: Geoscience processes changing Earth's surface
 * - MS-ESS3-2: Natural hazards and human activity
 *
 * Spiral Integration:
 * - From C6W1: Plate boundaries and boundary types
 * - From C6W2: Seafloor spreading and divergent boundaries
 *
 * ═══════════════════════════════════════════════════════════════════════════
 */

// ═══════════════════════════════════════════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════

const G7_C6_W3_CONFIG = {
  grade: 7,
  cycle: 6,
  week: 3,
  topic: 'Volcanic Eruption Styles & Magma Properties',
  phenomenon: 'Why do some volcanoes explode violently while others ooze slowly?',

  standards: {
    primary: ['MS-ESS2-2', 'MS-ESS3-2'],
    spiral: ['MS-ESS2-2', 'MS-ESS2-3']
  },

  points: {
    hook: 12,
    station1: 20,
    station2: 20,
    station3: 25,
    exitTicket: 23,
    total: 100
  },

  misconceptions: {
    allVolcanoesExplosive: {
      id: 'volcanoes-always-explosive',
      wrong: 'All volcanoes erupt explosively with ash clouds and pyroclastic flows',
      correct: 'Eruption style depends on magma viscosity; some volcanoes have gentle lava flows',
      targetedIn: ['hook_q2', 's2_q2', 'exit_q1']
    },
    lavaMainHazard: {
      id: 'lava-most-dangerous',
      wrong: 'Lava flows are the most dangerous volcanic hazard',
      correct: 'Pyroclastic flows, lahars, and ash fall often cause more damage and deaths than lava',
      targetedIn: ['s2_q4', 's3_q2']
    },
    volcanoesRandom: {
      id: 'volcanoes-form-randomly',
      wrong: 'Volcanoes form randomly across Earth',
      correct: 'Volcanoes cluster at plate boundaries and hot spots due to magma access to surface',
      targetedIn: ['s1_q5', 'exit_q3']
    }
  },

  spiralTargets: {
    cycle6Week1: {
      topic: 'Plate boundaries',
      connection: 'Connect volcano locations to convergent and divergent boundaries'
    },
    cycle6Week2: {
      topic: 'Seafloor spreading',
      connection: 'Link mid-ocean ridge volcanism to divergent boundary processes'
    }
  },

  formIds: {
    hook: null,
    station1: null,
    station2: null,
    station3: null,
    exitTicket: null
  }
};

// ═══════════════════════════════════════════════════════════════════════════
// HOOK: THE EXPLOSIVE VS OOZING MYSTERY (12 points)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Creates the Hook form introducing volcanic eruption style differences
 * Resource: Comparison videos: Mt. St. Helens vs Hawaiian volcanoes
 */
function createG7C6W3Hook() {
  const form = FormApp.create('G7.C6.W3: Hook - The Explosive vs Oozing Mystery');
  form.setDescription(
    '🌋 THE EXPLOSIVE VS OOZING MYSTERY 💥\n\n' +
    'On May 18, 1980, Mount St. Helens in Washington State exploded with the force of a nuclear bomb, ' +
    'blasting away an entire mountainside and killing 57 people. Meanwhile, in Hawaii, tourists ' +
    'safely watch lava flows from Kilauea within a few hundred meters!\n\n' +
    'Why do some volcanoes explode violently while others peacefully ooze lava? ' +
    'Today we\'ll investigate what controls eruption style.'
  );
  form.setIsQuiz(true);
  form.setShuffleQuestions(false);

  // Q1: Initial observation (2 pts)
  const q1 = form.addMultipleChoiceItem();
  q1.setTitle('Watch the video clips of Mt. St. Helens and Kilauea erupting. What is the most obvious difference between these two eruptions?')
  q1.setHelpText('Focus on how the lava/material moves and behaves.')
  q1.setPoints(2)
  q1.setChoices([
    q1.createChoice('Mt. St. Helens erupts at night while Kilauea erupts during the day', false),
    q1.createChoice('Mt. St. Helens explodes outward with ash clouds while Kilauea has flowing rivers of lava', true),
    q1.createChoice('Both volcanoes erupt exactly the same way', false),
    q1.createChoice('Kilauea is much larger than Mt. St. Helens', false)
  ])
  q1.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Great observation! The explosive vs effusive (flowing) difference is dramatic and has a scientific explanation.').build())
  q1.setFeedbackForIncorrect(FormApp.createFeedback().setText('Watch again—focus on HOW the volcanic material moves. Does it blast outward or flow gently?').build());

  // Q2: Challenging misconception about all volcanoes being explosive (3 pts)
  const q2 = form.addMultipleChoiceItem();
  q2.setTitle('Before today, what did you think ALL volcanic eruptions looked like? Most people picture which type?')
  q2.setHelpText('This question explores common assumptions about volcanoes.')
  q2.setPoints(3)
  q2.setChoices([
    q2.createChoice('Gentle lava flows like rivers', false),
    q2.createChoice('Explosive blasts with ash clouds and flying rocks', true),
    q2.createChoice('Steam vents with no lava at all', false),
    q2.createChoice('Underwater eruptions only', false)
  ])
  q2.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Most movies and news show explosive eruptions because they\'re dramatic! But many eruptions are actually gentle lava flows. Today we\'ll learn why the difference exists.').build())
  q2.setFeedbackForIncorrect(FormApp.createFeedback().setText('Think about volcano scenes in movies or news coverage. Which type of eruption gets the most attention? That shapes our mental image of "volcano."').build());

  // Q3: Lava flow observation (3 pts)
  const q3 = form.addMultipleChoiceItem();
  q3.setTitle('The Kilauea video shows lava flowing like a river. Based on how it moves, how would you describe this lava compared to honey vs water?')
  q3.setHelpText('Think about how thick or thin the lava appears based on its flow rate.')
  q3.setPoints(3)
  q3.setChoices([
    q3.createChoice('Flows like water—very thin and fast', false),
    q3.createChoice('Flows like warm honey—thick but still moves smoothly', true),
    q3.createChoice('Doesn\'t flow at all—completely solid', false),
    q3.createChoice('Flows upward against gravity', false)
  ])
  q3.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Good comparison! Hawaiian lava has a consistency similar to warm honey. This "thickness" is called viscosity—a key concept today!').build())
  q3.setFeedbackForIncorrect(FormApp.createFeedback().setText('Watch how fast the lava moves and how it piles up. Water flows very quickly and spreads thin. Does lava behave the same way?').build());

  // Q4: Hypothesis generation (2 pts)
  const q4 = form.addParagraphTextItem();
  q4.setTitle('Based on your observations, what do you think might cause some volcanoes to explode while others ooze? Propose at least one possible explanation.')
  q4.setHelpText('Think about: What properties of the lava/magma might be different? What conditions at the volcano might matter?')
  q4.setPoints(2);

  // Q5: Question generation (2 pts)
  const q5 = form.addParagraphTextItem();
  q5.setTitle('What questions do you have about why volcanoes behave so differently? What would you want to investigate?')
  q5.setHelpText('Think about: What information would help you understand eruption styles better?')
  q5.setPoints(2);

  Logger.log('G7.C6.W3 Hook created: ' + form.getEditUrl());
  return form;
}

// ═══════════════════════════════════════════════════════════════════════════
// STATION 1: MAGMA VISCOSITY INVESTIGATION (20 points)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Creates Station 1 form on magma viscosity and composition
 * Resource: Viscosity simulation + composition data
 * Spiral: Plate boundaries from Week 1
 */
function createG7C6W3Station1() {
  const form = FormApp.create('G7.C6.W3: Station 1 - Magma Viscosity Investigation');
  form.setDescription(
    '🧪 MAGMA VISCOSITY INVESTIGATION\n\n' +
    'Viscosity is a liquid\'s resistance to flow—how "thick" it is. Honey has high viscosity (flows slowly), ' +
    'while water has low viscosity (flows quickly). Magma viscosity is the KEY to understanding why ' +
    'volcanoes behave differently!\n\n' +
    'Use the viscosity simulation to discover what controls how thick or thin magma is.'
  );
  form.setIsQuiz(true);
  form.setShuffleQuestions(false);

  // Q1: Viscosity definition (3 pts)
  const q1 = form.addMultipleChoiceItem();
  q1.setTitle('In the simulation, you can adjust magma viscosity. When you set viscosity to HIGH, how does the magma behave?')
  q1.setHelpText('Observe how the simulated magma flows at different viscosity settings.')
  q1.setPoints(3)
  q1.setChoices([
    q1.createChoice('It flows quickly like water', false),
    q1.createChoice('It flows slowly and tends to pile up rather than spread out', true),
    q1.createChoice('It becomes a gas and floats away', false),
    q1.createChoice('It flows upward instead of downward', false)
  ])
  q1.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Correct! High viscosity magma resists flow—it moves slowly and piles up. This is crucial for eruption style!').build())
  q1.setFeedbackForIncorrect(FormApp.createFeedback().setText('Viscosity = resistance to flow. HIGH viscosity means MORE resistance, so the liquid moves... faster or slower?').build());

  // Q2: Silica content relationship (4 pts)
  const q2 = form.addMultipleChoiceItem();
  q2.setTitle('The composition data shows that magma can have different amounts of silica (SiO₂). As silica content increases from 50% to 70%, what happens to viscosity?')
  q2.setHelpText('Compare the viscosity values for basalt (50% silica) vs rhyolite (70% silica).')
  q2.setPoints(4)
  q2.setChoices([
    q2.createChoice('Viscosity decreases—more silica makes magma runnier', false),
    q2.createChoice('Viscosity increases dramatically—more silica makes magma much thicker', true),
    q2.createChoice('Viscosity stays the same regardless of silica content', false),
    q2.createChoice('Silica has no effect on viscosity', false)
  ])
  q2.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Exactly! Silica molecules form chains that make magma sticky and thick. High-silica magma can be 10,000× more viscous than low-silica magma!').build())
  q2.setFeedbackForIncorrect(FormApp.createFeedback().setText('Look at the data: Basalt (50% silica) vs Rhyolite (70% silica). Which has higher viscosity? What pattern do you see?').build());

  // Q3: Gas behavior in viscous magma (4 pts)
  const q3 = form.addMultipleChoiceItem();
  q3.setTitle('Magma contains dissolved gases (like water vapor and CO₂). In the simulation, what happens to gas bubbles in HIGH viscosity magma vs LOW viscosity magma?')
  q3.setHelpText('Watch how gas bubbles move in thick vs thin magma.')
  q3.setPoints(4)
  q3.setChoices([
    q3.createChoice('Gas escapes easily from both types of magma', false),
    q3.createChoice('Gas gets trapped in high-viscosity magma but escapes easily from low-viscosity magma', true),
    q3.createChoice('Gas only forms in low-viscosity magma', false),
    q3.createChoice('Gas makes all magma more viscous', false)
  ])
  q3.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ This is the key! Trapped gas builds pressure until... BOOM! In runny magma, gas escapes gently, allowing peaceful lava flows.').build())
  q3.setFeedbackForIncorrect(FormApp.createFeedback().setText('Think about bubbles in thick honey vs thin water. In which can bubbles rise and escape more easily?').build());

  // Q4: Temperature effect (3 pts)
  const q4 = form.addMultipleChoiceItem();
  q4.setTitle('The simulation also lets you change temperature. How does temperature affect viscosity?')
  q4.setHelpText('Test what happens when you heat up or cool down magma in the simulation.')
  q4.setPoints(3)
  q4.setChoices([
    q4.createChoice('Higher temperature increases viscosity (thicker)', false),
    q4.createChoice('Higher temperature decreases viscosity (runnier)', true),
    q4.createChoice('Temperature has no effect on viscosity', false),
    q4.createChoice('Temperature only affects color, not viscosity', false)
  ])
  q4.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Correct! Heat makes molecules move faster and slide past each other more easily. This is why Hawaiian basalt (very hot) flows so well!').build())
  q4.setFeedbackForIncorrect(FormApp.createFeedback().setText('Think about honey: Does cold honey or warm honey pour more easily? The same principle applies to magma.').build());

  // Q5: Spiral - Plate boundary connection (3 pts)
  const q5 = form.addMultipleChoiceItem();
  q5.setTitle('SPIRAL FROM WEEK 1: Hawaiian volcanoes produce low-silica basalt, while Cascade Range volcanoes (like Mt. St. Helens) produce high-silica magma. How does plate boundary type explain this difference?')
  q5.setHelpText('Think about what types of material melt at different boundary types.')
  q5.setPoints(3)
  q5.setChoices([
    q5.createChoice('Plate boundaries have no effect on magma composition', false),
    q5.createChoice('Hawaii sits over a hot spot melting mantle rock (low silica), while the Cascades involve subducting oceanic plate melting continental crust (high silica)', true),
    q5.createChoice('All volcanoes produce the same type of magma regardless of location', false),
    q5.createChoice('Continental volcanoes always produce basalt', false)
  ])
  q5.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Excellent connection! The source material determines silica content. Mantle rock = basalt (low silica). Continental crust = rhyolite/andesite (high silica).').build())
  q5.setFeedbackForIncorrect(FormApp.createFeedback().setText('Remember: Different rocks have different compositions. Mantle rock has different silica content than continental crust. Which melts at which boundary type?').build());

  // Q6: Eruption prediction (3 pts)
  const q6 = form.addMultipleChoiceItem();
  q6.setTitle('Based on everything you\'ve learned, which combination would most likely produce a violent explosive eruption?')
  q6.setHelpText('Consider silica content, viscosity, gas content, and what happens when gas can\'t escape.')
  q6.setPoints(3)
  q6.setChoices([
    q6.createChoice('Low silica, low viscosity, high gas content', false),
    q6.createChoice('High silica, high viscosity, high gas content', true),
    q6.createChoice('Low silica, high temperature, no gas', false),
    q6.createChoice('Any magma can explode equally regardless of properties', false)
  ])
  q6.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Perfect! High silica → high viscosity → gas gets trapped → pressure builds → EXPLOSION! This is exactly why Mt. St. Helens was so violent.').build())
  q6.setFeedbackForIncorrect(FormApp.createFeedback().setText('For an explosion, you need: (1) trapped gas to build pressure, and (2) thick magma that won\'t let gas escape. Which combination gives you both?').build());

  Logger.log('G7.C6.W3 Station 1 created: ' + form.getEditUrl());
  return form;
}

// ═══════════════════════════════════════════════════════════════════════════
// STATION 2: ERUPTION TYPE ANALYSIS (20 points)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Creates Station 2 form on eruption types and hazards
 * Resource: Volcanic eruption case studies + hazard maps
 */
function createG7C6W3Station2() {
  const form = FormApp.create('G7.C6.W3: Station 2 - Eruption Type Analysis');
  form.setDescription(
    '🔥 ERUPTION TYPE ANALYSIS 📊\n\n' +
    'Volcanologists classify eruptions into several types based on their characteristics. ' +
    'Each type produces different hazards and affects communities differently.\n\n' +
    'Analyze case studies of real volcanic eruptions to understand eruption types and their hazards.'
  );
  form.setIsQuiz(true);
  form.setShuffleQuestions(false);

  // Q1: Hawaiian eruption type (4 pts)
  const q1 = form.addMultipleChoiceItem();
  q1.setTitle('Examine the Hawaiian eruption case study. Kilauea produces fluid lava flows that can travel many kilometers. What characteristics define a "Hawaiian-style" eruption?')
  q1.setHelpText('Look at the lava flow patterns, fountain heights, and gas behavior.')
  q1.setPoints(4)
  q1.setChoices([
    q1.createChoice('Massive ash clouds, pyroclastic flows, and widespread destruction', false),
    q1.createChoice('Gentle lava fountains, fluid lava flows, and gas escaping continuously', true),
    q1.createChoice('No visible activity—all underground', false),
    q1.createChoice('Only steam and no lava', false)
  ])
  q1.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Correct! Hawaiian eruptions are relatively gentle because low-viscosity basalt lets gas escape without building pressure.').build())
  q1.setFeedbackForIncorrect(FormApp.createFeedback().setText('Hawaiian eruptions involve low-viscosity basalt. What would happen if gas can escape easily? Would pressure build up?').build());

  // Q2: Plinian eruption type - targets all-volcanoes-explosive misconception (4 pts)
  const q2 = form.addMultipleChoiceItem();
  q2.setTitle('The Mt. St. Helens case study shows a "Plinian" eruption. How do Plinian eruptions differ from Hawaiian eruptions, and why?')
  q2.setHelpText('Compare the magma type, gas behavior, and resulting eruption style.')
  q2.setPoints(4)
  q2.setChoices([
    q2.createChoice('No real difference—all eruptions are the same', false),
    q2.createChoice('Plinian eruptions have high-viscosity magma that traps gas, causing violent explosions and huge ash columns', true),
    q2.createChoice('Plinian eruptions have less gas so they\'re quieter', false),
    q2.createChoice('Plinian eruptions only occur underwater', false)
  ])
  q2.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Exactly! Plinian eruptions are named after Pliny the Younger who described Vesuvius in 79 CE. High viscosity + trapped gas = catastrophic explosion.').build())
  q2.setFeedbackForIncorrect(FormApp.createFeedback().setText('Think about viscosity and gas: What happens when high-viscosity magma has lots of dissolved gas that can\'t escape?').build());

  // Q3: Volcano shape connection (4 pts)
  const q3 = form.addMultipleChoiceItem();
  q3.setTitle('The case studies show that Hawaiian volcanoes are broad and gently sloped (shield volcanoes), while Cascade volcanoes like Mt. St. Helens are steep and cone-shaped (stratovolcanoes). Why does eruption style affect volcano shape?')
  q3.setHelpText('Think about how runny vs thick lava would behave when it erupts and flows down the volcano.')
  q3.setPoints(4)
  q3.setChoices([
    q3.createChoice('Volcano shape is random and unrelated to eruption type', false),
    q3.createChoice('Runny lava spreads far and wide (flat shield), while thick lava piles up steeply near the vent (steep cone)', true),
    q3.createChoice('Wind determines volcano shape', false),
    q3.createChoice('All volcanoes start flat and become steeper over time', false)
  ])
  q3.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Perfect reasoning! Viscosity controls how far lava travels, which determines the slope angle. Shield = flat (runny lava); Stratovolcano = steep (thick lava + ash layers).').build())
  q3.setFeedbackForIncorrect(FormApp.createFeedback().setText('Imagine pouring honey vs water on a plate. Which spreads farther? Which piles up more? The same principle applies to lava flows.').build());

  // Q4: Hazard comparison - targets lava-most-dangerous misconception (4 pts)
  const q4 = form.addMultipleChoiceItem();
  q4.setTitle('The hazard maps show different dangers from each eruption type. Which volcanic hazard typically causes the MOST deaths during explosive eruptions?')
  q4.setHelpText('Review the hazard data for Plinian eruptions. Consider speed and temperature of different hazards.')
  q4.setPoints(4)
  q4.setChoices([
    q4.createChoice('Lava flows, which move slowly but are unstoppable', false),
    q4.createChoice('Pyroclastic flows—superheated clouds of gas and rock moving at 100+ km/hr', true),
    q4.createChoice('Volcanic lightning', false),
    q4.createChoice('Loud noises from the eruption', false)
  ])
  q4.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Pyroclastic flows are the deadliest! They move too fast to outrun (up to 700 km/hr) and can be 700°C. Lava flows are actually survivable because they move slowly.').build())
  q4.setFeedbackForIncorrect(FormApp.createFeedback().setText('Common misconception: Movies focus on lava, but pyroclastic flows (superheated gas + rock avalanches) are much faster and killed 30,000+ at Mt. Pelée in 1902.').build());

  // Q5: Risk assessment (4 pts)
  const q5 = form.addParagraphTextItem();
  q5.setTitle('A town is located 50 km from a dormant stratovolcano with high-silica magma. Based on the hazard maps and case studies, what THREE specific hazards should emergency planners prepare for, and why?')
  q5.setHelpText('Consider: What hazards travel far from the volcano? What does the magma composition tell you about eruption style?')
  q5.setPoints(4);

  Logger.log('G7.C6.W3 Station 2 created: ' + form.getEditUrl());
  return form;
}

// ═══════════════════════════════════════════════════════════════════════════
// STATION 3: DESIGN A VOLCANO MONITORING SYSTEM (25 points)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Creates Station 3 form on volcano monitoring design
 * Resource: Monitoring tools + volcano scenario + risk constraints
 */
function createG7C6W3Station3() {
  const form = FormApp.create('G7.C6.W3: Station 3 - Design a Volcano Monitoring System');
  form.setDescription(
    '📡 DESIGN A VOLCANO MONITORING SYSTEM 🌋\n\n' +
    'CHALLENGE: You\'re a volcanologist designing a monitoring system for Mount Rainier, a potentially ' +
    'dangerous stratovolcano near Seattle. Over 3 million people live in the surrounding region.\n\n' +
    'Your system must detect warning signs of an eruption in time to evacuate residents. ' +
    'Consider: What signals indicate an eruption is coming? Where should sensors be placed? ' +
    'What data is most critical?'
  );
  form.setIsQuiz(true);
  form.setShuffleQuestions(false);

  // Q1: Warning sign identification (5 pts)
  const q1 = form.addCheckboxItem();
  q1.setTitle('Review the monitoring tools catalog. Which signals indicate a volcano may be preparing to erupt? Select ALL that would be important to monitor.')
  q1.setHelpText('Think about what happens underground as magma rises toward the surface.')
  q1.setPoints(5)
  q1.setChoices([
    q1.createChoice('Increased small earthquakes (magma breaking rock as it rises)', true),
    q1.createChoice('Ground swelling/deformation (magma pushing up from below)', true),
    q1.createChoice('Changes in gas emissions (sulfur dioxide, CO₂)', true),
    q1.createChoice('Temperature changes in hot springs and fumaroles', true),
    q1.createChoice('Number of tourists visiting the area', false),
    q1.createChoice('Changes in stock market prices', false)
  ])
  q1.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Excellent! All four geological signals are monitored by volcanologists: seismicity, ground deformation, gas emissions, and thermal changes.').build())
  q1.setFeedbackForIncorrect(FormApp.createFeedback().setText('Focus on what happens UNDERGROUND as magma moves: rock breaks (earthquakes), ground bulges (deformation), gases escape, and temperatures rise.').build());

  // Q2: Hazard-specific monitoring - targets lava-danger misconception (5 pts)
  const q2 = form.addMultipleChoiceItem();
  q2.setTitle('Mount Rainier\'s greatest hazard isn\'t lava—it\'s LAHARS (volcanic mudflows). Lahars occur when volcanic heat melts glaciers or when heavy rain mobilizes volcanic debris. What monitoring would be MOST critical for lahar warning?')
  q2.setHelpText('Consider: What would tell you a lahar is forming and heading toward populated areas?')
  q2.setPoints(5)
  q2.setChoices([
    q2.createChoice('Monitoring lava temperature at the summit only', false),
    q2.createChoice('Flow detectors in river valleys + acoustic sensors + rainfall monitors', true),
    q2.createChoice('Counting the number of glaciers on the mountain', false),
    q2.createChoice('Monitoring ocean tides', false)
  ])
  q2.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Perfect! Lahars travel through river valleys at 60+ km/hr. Acoustic flow monitors (AFMs) in valleys can detect lahars and trigger warnings, giving people 30-60 minutes to evacuate.').build())
  q2.setFeedbackForIncorrect(FormApp.createFeedback().setText('Lahars flow through river valleys toward communities. What sensors would detect a fast-moving mudflow in a valley? What triggers lahars (rain, glacier melt)?').build());

  // Q3: Sensor placement strategy (5 pts)
  const q3 = form.addMultipleChoiceItem();
  q3.setTitle('You have a limited budget for seismometers. Where should you prioritize placing them for the BEST eruption warning coverage?')
  q3.setHelpText('Consider: Where does magma move, and where can you detect it earliest?')
  q3.setPoints(5)
  q3.setChoices([
    q3.createChoice('All sensors in Seattle to protect the largest population', false),
    q3.createChoice('A network around the volcano at varying distances to triangulate earthquake locations and depths', true),
    q3.createChoice('One sensor at the summit only', false),
    q3.createChoice('Sensors only in river valleys', false)
  ])
  q3.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Correct! A network lets you triangulate earthquake locations and track magma movement. Patterns of earthquakes getting shallower indicate rising magma!').build())
  q3.setFeedbackForIncorrect(FormApp.createFeedback().setText('To locate an earthquake precisely, you need multiple sensors at different positions. Why would spreading sensors around the volcano (not in one place) be valuable?').build());

  // Q4: Data interpretation (5 pts)
  const q4 = form.addMultipleChoiceItem();
  q4.setTitle('Your monitoring system detects: (1) earthquake swarm with locations getting shallower, (2) 5 cm ground uplift at the summit, (3) tripling of sulfur dioxide emissions. What does this combination suggest?')
  q4.setHelpText('Think about what each signal means and what they indicate together.')
  q4.setPoints(5)
  q4.setChoices([
    q4.createChoice('Normal volcanic activity—nothing to worry about', false),
    q4.createChoice('Magma is rising toward the surface and an eruption may be imminent', true),
    q4.createChoice('The volcano is becoming dormant', false),
    q4.createChoice('An earthquake occurred far from the volcano', false)
  ])
  q4.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Exactly right! This combination of signals is classic pre-eruption activity. Rising magma breaks rock (shallow earthquakes), pushes up ground (deformation), and releases gases. Time to alert authorities!').build())
  q4.setFeedbackForIncorrect(FormApp.createFeedback().setText('Each signal tells part of the story: shallow earthquakes = breaking rock, ground uplift = something pushing from below, increased gas = fresh magma reaching higher levels. What does this pattern indicate?').build());

  // Q5: Communication system design (5 pts)
  const q5 = form.addParagraphTextItem();
  q5.setTitle('Your monitoring system has detected warning signs and you need to alert 3 million people. Design a warning communication system: (1) What alert levels would you use? (2) How would warnings reach people? (3) What actions should people take at each level?')
  q5.setHelpText('Consider: People need clear instructions, not just "danger." Multiple communication channels ensure everyone gets the message.')
  q5.setPoints(5);

  Logger.log('G7.C6.W3 Station 3 created: ' + form.getEditUrl());
  return form;
}

// ═══════════════════════════════════════════════════════════════════════════
// EXIT TICKET: VOLCANIC SYSTEMS INTEGRATION (23 points)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Creates Exit Ticket assessing week's learning
 * Structure: 2 New + 2 Spiral + 1 Integration + 1 SEP
 */
function createG7C6W3ExitTicket() {
  const form = FormApp.create('G7.C6.W3: Exit Ticket - Volcanic Systems Integration');
  form.setDescription(
    '🎯 EXIT TICKET: Volcanic Systems\n\n' +
    'Demonstrate your understanding of volcanic eruption styles, magma properties, and hazard assessment.\n\n' +
    'This is an individual assessment—complete it on your own.'
  );
  form.setIsQuiz(true);
  form.setShuffleQuestions(false);

  // NEW Q1: Eruption style prediction - targets all-volcanoes-explosive misconception (4 pts)
  const q1 = form.addMultipleChoiceItem();
  q1.setTitle('NEW CONTENT: A volcano has magma with 70% silica content and high dissolved gas content. What eruption style would you predict?')
  q1.setHelpText('Connect silica content to viscosity, and viscosity + gas to eruption style.')
  q1.setPoints(4)
  q1.setChoices([
    q1.createChoice('Gentle Hawaiian-style lava flows', false),
    q1.createChoice('Violent explosive Plinian-style eruption', true),
    q1.createChoice('No eruption at all—the volcano is dormant', false),
    q1.createChoice('Underwater eruption only', false)
  ])
  q1.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Correct! High silica (70%) = very high viscosity. Trapped gas + high viscosity = explosive eruption. This is why stratovolcanoes are so dangerous!').build())
  q1.setFeedbackForIncorrect(FormApp.createFeedback().setText('Remember: High silica → high viscosity → gas trapped → pressure builds. What happens when that pressure releases?').build());

  // NEW Q2: Hazard ranking (4 pts)
  const q2 = form.addMultipleChoiceItem();
  q2.setTitle('NEW CONTENT: Rank these volcanic hazards from MOST to LEAST dangerous for human life during a Plinian eruption.')
  q2.setHelpText('Consider speed, temperature, and ability to escape each hazard.')
  q2.setPoints(4)
  q2.setChoices([
    q2.createChoice('Lava flows > Ash fall > Pyroclastic flows', false),
    q2.createChoice('Pyroclastic flows > Lahars > Ash fall > Lava flows', true),
    q2.createChoice('Ash fall > Pyroclastic flows > Lava flows', false),
    q2.createChoice('All hazards are equally dangerous', false)
  ])
  q2.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Pyroclastic flows are deadliest (too fast to escape, extremely hot). Lahars are next (fast, can travel far). Ash fall and lava flows allow more time to evacuate.').build())
  q2.setFeedbackForIncorrect(FormApp.createFeedback().setText('Think about speed and temperature: Pyroclastic flows move at 100-700 km/hr at 700°C. Lava flows move at walking pace. Which gives you less time to escape?').build());

  // SPIRAL Q3: Plate boundary connection - targets volcanoes-form-randomly misconception (4 pts)
  const q3 = form.addMultipleChoiceItem();
  q3.setTitle('SPIRAL FROM WEEK 1: The "Ring of Fire" contains 75% of Earth\'s volcanoes. Why do volcanoes concentrate at plate boundaries rather than appearing randomly across Earth?')
  q3.setHelpText('Connect volcano formation to the plate tectonic processes you learned about.')
  q3.setPoints(4)
  q3.setChoices([
    q3.createChoice('Volcanoes form randomly—the Ring of Fire is just a coincidence', false),
    q3.createChoice('Plate boundaries provide pathways for magma to reach the surface through subduction, spreading, and rifting processes', true),
    q3.createChoice('Ocean water causes all volcanoes to form at coastlines', false),
    q3.createChoice('Volcanoes only form where mountains already exist', false)
  ])
  q3.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Excellent connection! Plate boundaries create the conditions for magma generation and provide pathways to the surface. That\'s why volcano distribution is NOT random.').build())
  q3.setFeedbackForIncorrect(FormApp.createFeedback().setText('Remember from Week 1: Volcanoes need (1) a source of magma and (2) a pathway to the surface. Where do plate tectonics provide both?').build());

  // SPIRAL Q4: Seafloor spreading connection (4 pts)
  const q4 = form.addMultipleChoiceItem();
  q4.setTitle('SPIRAL FROM WEEK 2: Mid-ocean ridge volcanoes (like those creating new seafloor) have a different eruption style than Mt. St. Helens. Based on what you know about seafloor spreading, why?')
  q4.setHelpText('Think about where the magma comes from at mid-ocean ridges vs subduction zones.')
  q4.setPoints(4)
  q4.setChoices([
    q4.createChoice('Water pressure makes all underwater eruptions explosive', false),
    q4.createChoice('Mid-ocean ridges tap mantle rock (low silica basalt), producing gentler eruptions than continental subduction zones (high silica)', true),
    q4.createChoice('Underwater volcanoes don\'t actually erupt', false),
    q4.createChoice('All volcanoes erupt the same way regardless of location', false)
  ])
  q4.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Perfect integration! Mid-ocean ridge magma = mantle basalt (low silica, low viscosity, gentle). Subduction zone magma = melted crust (high silica, high viscosity, explosive).').build())
  q4.setFeedbackForIncorrect(FormApp.createFeedback().setText('At mid-ocean ridges, what rock is melting? (Hint: mantle) At subduction zones, what melts? (Hint: oceanic plate + continental crust) How does source rock affect silica content?').build());

  // INTEGRATION Q5: Complete explanation (4 pts)
  const q5 = form.addMultipleChoiceItem();
  q5.setTitle('INTEGRATION: Explain why the same volcano can have different eruption styles over time.')
  q5.setHelpText('Think about what factors control eruption style and whether they can change.')
  q5.setPoints(4)
  q5.setChoices([
    q5.createChoice('Volcanoes always erupt the same way—their style never changes', false),
    q5.createChoice('Changes in magma composition, gas content, or pathway to surface can alter viscosity and eruption style over time', true),
    q5.createChoice('Weather determines eruption style', false),
    q5.createChoice('Eruption style is completely random and unpredictable', false)
  ])
  q5.setFeedbackForCorrect(FormApp.createFeedback().setText('✓ Excellent understanding! A single volcano can have explosive AND effusive eruptions depending on the magma batch\'s composition and gas content. Monitoring tracks these changes!').build())
  q5.setFeedbackForIncorrect(FormApp.createFeedback().setText('Eruption style depends on magma properties. If a new batch of magma has different silica content or gas content, would it erupt the same way?').build());

  // SEP Q6: Analyzing volcanic hazard data (3 pts)
  const q6 = form.addParagraphTextItem();
  q6.setTitle('SEP - ANALYZING DATA: Mount Rainier has erupted with lava flows 13 times, explosive eruptions 4 times, and produced lahars over 60 times in the past 10,000 years. Use this data to: (1) Identify the MOST LIKELY hazard, (2) Explain why lahars are so frequent compared to eruptions, and (3) Recommend which hazard emergency planners should prioritize.')
  q6.setHelpText('Consider: What triggers lahars? Why might they happen without an eruption?')
  q6.setPoints(3);

  Logger.log('G7.C6.W3 Exit Ticket created: ' + form.getEditUrl());
  return form;
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN EXECUTION & UTILITIES
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Creates all forms for G7.C6.W3
 */
function createAllG7C6W3Forms() {
  Logger.log('═══════════════════════════════════════════════════════════════');
  Logger.log('Creating G7.C6.W3: Volcanic Eruption Styles & Magma Properties');
  Logger.log('═══════════════════════════════════════════════════════════════');

  const hook = createG7C6W3Hook();
  const station1 = createG7C6W3Station1();
  const station2 = createG7C6W3Station2();
  const station3 = createG7C6W3Station3();
  const exitTicket = createG7C6W3ExitTicket();

  Logger.log('═══════════════════════════════════════════════════════════════');
  Logger.log('G7.C6.W3 Forms Creation Complete!');
  Logger.log('Total Points: ' + validateG7C6W3Points());
  Logger.log('═══════════════════════════════════════════════════════════════');

  return {
    hook: hook,
    station1: station1,
    station2: station2,
    station3: station3,
    exitTicket: exitTicket
  };
}

/**
 * Validates that total points equal 100
 */
function validateG7C6W3Points() {
  const points = G7_C6_W3_CONFIG.points;
  const total = points.hook + points.station1 + points.station2 + points.station3 + points.exitTicket;

  if (total !== 100) {
    Logger.log('⚠️ WARNING: Total points = ' + total + ', expected 100');
  }

  return total;
}
