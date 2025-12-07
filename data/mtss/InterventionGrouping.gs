/**
 * KAMS Science Curriculum - Intervention Grouping Engine
 * Creates optimal intervention groups based on student needs and misconceptions
 *
 * @fileoverview Generates intervention groups for Tier 2/3 students
 * @version 1.0.0
 * @author KAMS Science Team
 */

/**
 * Configuration constants
 */
const GROUPING_CONFIG = {
  MAX_TIER2_GROUP_SIZE: 5,
  MAX_TIER3_GROUP_SIZE: 3,
  MIN_GROUP_SIZE: 2,
  SIMILARITY_THRESHOLD: 0.6, // Minimum struggle overlap to group together
  PRIORITY_STANDARDS: ['SEP-2', 'SEP-4', 'DCI-LS2.B', 'DCI-ESS3.C'] // Priority for grouping
};

/**
 * Main function to generate intervention groups
 * @param {Object} mtssReport - Output from DataAggregator
 * @param {number} grade - Grade level
 * @param {number} cycle - Cycle number
 * @returns {Object} Intervention groups with assignments
 */
function generateInterventionGroups(mtssReport, grade, cycle) {
  const groups = {
    generated: new Date().toISOString(),
    grade: grade,
    cycle: cycle,
    tier2Groups: [],
    tier3Groups: [],
    peerTutoringPairs: [],
    wholeClassTopics: []
  };

  // Group Tier 2 students by common struggles
  if (mtssReport.tier2Students.length > 0) {
    groups.tier2Groups = clusterByStruggles(
      mtssReport.tier2Students,
      GROUPING_CONFIG.MAX_TIER2_GROUP_SIZE,
      grade,
      cycle
    );
  }

  // Group Tier 3 students by intensive needs
  if (mtssReport.tier3Students.length > 0) {
    groups.tier3Groups = clusterByIntensiveNeeds(
      mtssReport.tier3Students,
      GROUPING_CONFIG.MAX_TIER3_GROUP_SIZE,
      grade,
      cycle
    );
  }

  // Create peer tutoring pairs (Tier 1 + Tier 2)
  if (mtssReport.tier1Students.length > 0 && mtssReport.tier2Students.length > 0) {
    groups.peerTutoringPairs = createPeerPairs(
      mtssReport.tier1Students,
      mtssReport.tier2Students
    );
  }

  // Identify whole-class reteach topics
  groups.wholeClassTopics = identifyWholeClassTopics(mtssReport, grade, cycle);

  return groups;
}

/**
 * Clusters Tier 2 students by common struggle areas
 * @param {Array} students - Tier 2 students
 * @param {number} maxSize - Maximum group size
 * @param {number} grade - Grade level
 * @param {number} cycle - Cycle number
 * @returns {Array} Intervention groups
 */
function clusterByStruggles(students, maxSize, grade, cycle) {
  const groups = [];
  const ungrouped = [...students];

  while (ungrouped.length >= GROUPING_CONFIG.MIN_GROUP_SIZE) {
    // Find the most common struggle among remaining students
    const struggleCounts = {};
    ungrouped.forEach(student => {
      student.struggles.forEach(struggle => {
        const key = `${struggle.form}_${struggle.question}`;
        if (!struggleCounts[key]) {
          struggleCounts[key] = { count: 0, students: [], question: struggle.question };
        }
        struggleCounts[key].count++;
        struggleCounts[key].students.push(student.email);
      });
    });

    // Find struggle with most students
    const topStruggle = Object.entries(struggleCounts)
      .sort((a, b) => b[1].count - a[1].count)[0];

    if (!topStruggle || topStruggle[1].count < GROUPING_CONFIG.MIN_GROUP_SIZE) {
      break; // No more groupable struggles
    }

    // Create group with students sharing this struggle
    const groupStudents = ungrouped.filter(s =>
      topStruggle[1].students.includes(s.email)
    ).slice(0, maxSize);

    const group = {
      id: `tier2-${groups.length + 1}`,
      focusArea: topStruggle[0],
      focusQuestion: topStruggle[1].question,
      students: groupStudents.map(s => ({
        email: s.email,
        score: s.overallScore,
        specificStruggles: s.struggles
      })),
      intervention: generateTier2Intervention(topStruggle[0], grade, cycle),
      schedule: suggestSchedule('tier2'),
      materials: suggestMaterials(topStruggle[0], grade, cycle)
    };

    groups.push(group);

    // Remove grouped students
    groupStudents.forEach(gs => {
      const idx = ungrouped.findIndex(u => u.email === gs.email);
      if (idx >= 0) ungrouped.splice(idx, 1);
    });
  }

  // Handle remaining ungrouped students (individual intervention)
  ungrouped.forEach(student => {
    groups.push({
      id: `tier2-individual-${groups.length + 1}`,
      focusArea: 'mixed',
      students: [{ email: student.email, score: student.overallScore }],
      intervention: {
        type: 'individual-support',
        actions: ['Flexible check-in during independent work', 'Extended time on assignments']
      },
      schedule: suggestSchedule('tier2-individual')
    });
  });

  return groups;
}

/**
 * Clusters Tier 3 students by intensive needs
 * @param {Array} students - Tier 3 students
 * @param {number} maxSize - Maximum group size
 * @param {number} grade - Grade level
 * @param {number} cycle - Cycle number
 * @returns {Array} Intervention groups
 */
function clusterByIntensiveNeeds(students, maxSize, grade, cycle) {
  const groups = [];

  // Tier 3 typically needs more individualized attention
  // Group by similar score range and primary struggle area
  const sorted = [...students].sort((a, b) => a.overallScore - b.overallScore);

  for (let i = 0; i < sorted.length; i += maxSize) {
    const groupStudents = sorted.slice(i, i + maxSize);

    const primaryStruggles = groupStudents
      .flatMap(s => s.struggles.slice(0, 2).map(str => str.form));
    const mostCommonForm = findMode(primaryStruggles);

    const group = {
      id: `tier3-${groups.length + 1}`,
      focusArea: mostCommonForm || 'foundation',
      intensity: 'high',
      students: groupStudents.map(s => ({
        email: s.email,
        score: s.overallScore,
        sstRecommended: s.overallScore < 30,
        parentContactRequired: true
      })),
      intervention: generateTier3Intervention(mostCommonForm, grade, cycle),
      schedule: suggestSchedule('tier3'),
      progressMonitoring: {
        frequency: 'daily',
        checkpoints: ['vocabulary', 'core-concept', 'application'],
        escalationTrigger: 'No improvement after 1 week'
      }
    };

    groups.push(group);
  }

  return groups;
}

/**
 * Creates peer tutoring pairs matching Tier 1 strengths with Tier 2 needs
 * @param {Array} tier1Students - Students meeting expectations
 * @param {Array} tier2Students - Students needing support
 * @returns {Array} Peer pairs
 */
function createPeerPairs(tier1Students, tier2Students) {
  const pairs = [];
  const availableTutors = [...tier1Students];
  const needsTutor = [...tier2Students];

  needsTutor.forEach(tutee => {
    if (availableTutors.length === 0) return;

    // Find tutor with strength in tutee's struggle area
    const tuteeStruggles = tutee.struggles.map(s => s.form);

    let bestTutor = null;
    let bestScore = -1;

    availableTutors.forEach((tutor, idx) => {
      const tutorStrengths = Object.entries(tutor.formScores || {})
        .filter(([form, score]) => score.percentage >= 80)
        .map(([form]) => form);

      const matchScore = tutorStrengths.filter(s => tuteeStruggles.includes(s)).length;

      if (matchScore > bestScore) {
        bestScore = matchScore;
        bestTutor = { tutor, idx };
      }
    });

    if (bestTutor) {
      pairs.push({
        tutor: {
          email: bestTutor.tutor.email,
          strengths: Object.entries(bestTutor.tutor.formScores || {})
            .filter(([, s]) => s.percentage >= 80)
            .map(([form]) => form)
        },
        tutee: {
          email: tutee.email,
          struggles: tuteeStruggles
        },
        focusAreas: tuteeStruggles.slice(0, 2),
        suggestedActivities: [
          'Collaborative problem-solving during station work',
          'Peer explanation practice',
          'Study guide creation together'
        ]
      });

      availableTutors.splice(bestTutor.idx, 1);
    }
  });

  return pairs;
}

/**
 * Identifies topics requiring whole-class intervention
 * @param {Object} mtssReport - MTSS report data
 * @param {number} grade - Grade level
 * @param {number} cycle - Cycle number
 * @returns {Array} Topics for whole-class reteach
 */
function identifyWholeClassTopics(mtssReport, grade, cycle) {
  const topics = [];

  // Check tier distribution - if >40% not Tier 1, whole-class intervention needed
  const totalStudents = mtssReport.tier1Students.length +
    mtssReport.tier2Students.length +
    mtssReport.tier3Students.length;

  const tier1Percent = (mtssReport.tier1Students.length / totalStudents) * 100;

  if (tier1Percent < 60) {
    // Identify most common struggles across all non-Tier-1 students
    const allStruggles = [...mtssReport.tier2Students, ...mtssReport.tier3Students]
      .flatMap(s => s.struggles.map(str => str.question));

    const struggleCounts = {};
    allStruggles.forEach(q => {
      struggleCounts[q] = (struggleCounts[q] || 0) + 1;
    });

    // Top 3 struggles become whole-class topics
    Object.entries(struggleCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .forEach(([question, count]) => {
        topics.push({
          topic: question,
          affectedPercent: (count / totalStudents) * 100,
          suggestedApproach: generateReteachApproach(question, grade, cycle),
          estimatedTime: '15-20 minutes',
          resources: suggestReteachResources(question, grade, cycle)
        });
      });
  }

  return topics;
}

/**
 * Generates Tier 2 intervention plan
 * @param {string} focusArea - Primary focus area
 * @param {number} grade - Grade level
 * @param {number} cycle - Cycle number
 * @returns {Object} Intervention details
 */
function generateTier2Intervention(focusArea, grade, cycle) {
  const interventions = {
    'hook': {
      type: 'pre-teaching',
      actions: [
        'Preview vocabulary before next lesson',
        'Connect to prior knowledge explicitly',
        'Provide advance organizer'
      ],
      duration: '10 minutes before class'
    },
    'station1': {
      type: 'concept-reteach',
      actions: [
        'Small group direct instruction on core concept',
        'Guided practice with immediate feedback',
        'Hands-on manipulation/visualization'
      ],
      duration: '15-20 minutes'
    },
    'station2': {
      type: 'skill-practice',
      actions: [
        'Step-by-step calculation guide',
        'Additional practice problems with scaffolding',
        'Error analysis of own work'
      ],
      duration: '15 minutes'
    },
    'station3': {
      type: 'application-support',
      actions: [
        'Design template with prompts',
        'Worked example analysis',
        'Peer collaboration on engineering challenge'
      ],
      duration: '20 minutes'
    },
    'exitTicket': {
      type: 'spiral-review',
      actions: [
        'Explicit connection to previous cycle content',
        'Visual anchor chart review',
        'Spaced practice on prior concepts'
      ],
      duration: '10 minutes'
    }
  };

  return interventions[focusArea] || interventions['station1'];
}

/**
 * Generates Tier 3 intervention plan
 * @param {string} focusArea - Primary focus area
 * @param {number} grade - Grade level
 * @param {number} cycle - Cycle number
 * @returns {Object} Intervention details
 */
function generateTier3Intervention(focusArea, grade, cycle) {
  return {
    type: 'intensive-foundation',
    format: '1:1 or 1:2',
    actions: [
      'Diagnostic assessment of prerequisite skills',
      'Explicit vocabulary instruction with visuals',
      'Manipulative-based concept building',
      'Frequent checks for understanding',
      'Modified assessment with reduced load'
    ],
    duration: '20-30 minutes daily',
    monitoring: {
      tool: 'Progress monitoring checklist',
      frequency: 'After each session',
      escalation: 'SST referral if no progress after 4 weeks'
    },
    accommodations: [
      'Extended time (1.5x)',
      'Reduced question sets',
      'Alternative response formats',
      'Preferential seating',
      'Chunked instructions'
    ]
  };
}

/**
 * Suggests schedule for intervention
 * @param {string} tier - Tier level
 * @returns {Object} Schedule suggestion
 */
function suggestSchedule(tier) {
  const schedules = {
    'tier2': {
      timing: 'During independent work or before/after class',
      frequency: '2-3 times per week',
      duration: '15-20 minutes per session'
    },
    'tier2-individual': {
      timing: 'Flexible check-ins during class',
      frequency: 'As needed',
      duration: '5-10 minutes'
    },
    'tier3': {
      timing: 'Daily dedicated intervention time',
      frequency: 'Daily',
      duration: '20-30 minutes'
    }
  };

  return schedules[tier] || schedules['tier2'];
}

/**
 * Suggests materials for intervention
 * @param {string} focusArea - Focus area
 * @param {number} grade - Grade level
 * @param {number} cycle - Cycle number
 * @returns {Array} Material suggestions
 */
function suggestMaterials(focusArea, grade, cycle) {
  const baseMaterials = [
    'Vocabulary flash cards',
    'Concept anchor chart',
    'Practice problems (scaffolded)'
  ];

  // Add cycle-specific materials
  if (cycle === 4) {
    if (grade === 7) {
      return [...baseMaterials,
        'pH scale visual',
        'Carbon budget diagram',
        'Eutrophication cascade flowchart'
      ];
    } else {
      return [...baseMaterials,
        'Energy pyramid template',
        '10% rule calculation guide',
        'Trophic cascade model'
      ];
    }
  }

  return baseMaterials;
}

/**
 * Generates reteach approach
 * @param {string} question - Question topic
 * @param {number} grade - Grade level
 * @param {number} cycle - Cycle number
 * @returns {string} Approach description
 */
function generateReteachApproach(question, grade, cycle) {
  return 'Phenomenon-based re-engagement with visual anchor, ' +
    'collaborative discourse, and formative check before new content';
}

/**
 * Suggests reteach resources
 * @param {string} question - Question topic
 * @param {number} grade - Grade level
 * @param {number} cycle - Cycle number
 * @returns {Array} Resource list
 */
function suggestReteachResources(question, grade, cycle) {
  return [
    'PhET simulation (if applicable)',
    'Worked example on board',
    'Think-pair-share protocol',
    'Exit ticket re-check'
  ];
}

/**
 * Helper: Find mode of array
 * @param {Array} arr - Input array
 * @returns {*} Most common value
 */
function findMode(arr) {
  if (arr.length === 0) return null;
  const counts = {};
  arr.forEach(item => { counts[item] = (counts[item] || 0) + 1; });
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
}

/**
 * Export intervention groups to JSON
 * @param {Object} groups - Intervention groups
 */
function exportInterventionGroups(groups) {
  const filename = `intervention-groups-g${groups.grade}-c${groups.cycle}.json`;

  const output = {
    ...groups,
    summary: {
      tier2GroupCount: groups.tier2Groups.length,
      tier3GroupCount: groups.tier3Groups.length,
      peerPairCount: groups.peerTutoringPairs.length,
      wholeClassTopicCount: groups.wholeClassTopics.length
    }
  };

  Logger.log('Intervention Groups: ' + JSON.stringify(output, null, 2));
  return output;
}

/**
 * Main entry point - generate groups from MTSS report
 * @param {number} grade - Grade level
 * @param {number} cycle - Cycle number
 * @param {number} week - Week number
 */
function runInterventionGrouping(grade, cycle, week) {
  // In production, load MTSS report from file
  const mtssReport = loadMTSSReport(grade, cycle, week);

  if (!mtssReport) {
    Logger.log('No MTSS report found');
    return null;
  }

  const groups = generateInterventionGroups(mtssReport, grade, cycle);
  exportInterventionGroups(groups);

  return groups;
}

/**
 * Load MTSS report from stored data
 * @param {number} grade - Grade level
 * @param {number} cycle - Cycle number
 * @param {number} week - Week number
 * @returns {Object|null} MTSS report with tier-grouped students
 */
function loadMTSSReport(grade, cycle, week) {
  // Build filename based on parameters
  const filename = `mtss-report-g${grade}-c${cycle}-w${week}.json`;

  // Attempt to load from Properties Service (Apps Script storage)
  const scriptProperties = PropertiesService.getScriptProperties();
  const storedData = scriptProperties.getProperty(filename);

  if (storedData) {
    try {
      return JSON.parse(storedData);
    } catch (e) {
      Logger.log('loadMTSSReport: Failed to parse stored data - ' + e.message);
    }
  }

  // Return empty structure if no data found
  Logger.log('loadMTSSReport: No MTSS report found for G' + grade + ' C' + cycle + ' W' + week);
  return {
    generated: null,
    grade: grade,
    cycle: cycle,
    week: week,
    tier1Students: [],
    tier2Students: [],
    tier3Students: [],
    dataAvailable: false
  };
}

/**
 * Save MTSS report to storage
 * @param {Object} report - MTSS report to save
 */
function saveMTSSReport(report) {
  if (!report || !report.grade || !report.cycle || !report.week) {
    Logger.log('saveMTSSReport: Invalid report structure');
    return false;
  }

  const filename = `mtss-report-g${report.grade}-c${report.cycle}-w${report.week}.json`;
  const scriptProperties = PropertiesService.getScriptProperties();

  try {
    report.generated = new Date().toISOString();
    report.dataAvailable = true;
    scriptProperties.setProperty(filename, JSON.stringify(report));
    Logger.log('saveMTSSReport: Saved ' + filename);
    return true;
  } catch (e) {
    Logger.log('saveMTSSReport: Failed to save - ' + e.message);
    return false;
  }
}
