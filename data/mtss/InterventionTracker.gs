/**
 * KAMS Science Curriculum - Intervention Effectiveness Tracker
 * Monitors intervention outcomes and tracks student progress
 *
 * @fileoverview Tracks whether interventions are working by monitoring
 *               student tier movements and targeted improvement
 * @version 1.0.0
 * @author KAMS Science Team
 *
 * ============================================================================
 * PURPOSE
 * ============================================================================
 *
 * This module creates a feedback loop for interventions:
 *   1. Records when interventions are assigned to students
 *   2. Tracks student performance on targeted concepts over time
 *   3. Evaluates intervention effectiveness
 *   4. Recommends tier adjustments (graduation, escalation)
 *   5. Generates effectiveness reports for MTSS review
 *
 * ============================================================================
 */

/**
 * Configuration for intervention tracking
 */
var InterventionTrackerConfig = {
  // Minimum weeks before evaluating intervention effectiveness
  MIN_WEEKS_FOR_EVALUATION: 2,

  // Score improvement threshold to consider intervention effective
  IMPROVEMENT_THRESHOLD: 10,  // 10 percentage points

  // Score threshold for tier graduation consideration
  TIER1_THRESHOLD: 70,
  TIER2_THRESHOLD: 50,

  // Escalation trigger - no improvement after N weeks
  ESCALATION_WEEKS: 4,

  // Celebration trigger - significant improvement
  CELEBRATION_THRESHOLD: 15  // 15+ point improvement
};

/**
 * ============================================================================
 * INTERVENTION ASSIGNMENT TRACKING
 * ============================================================================
 */

/**
 * Record a new intervention assignment
 *
 * @param {string} studentEmail - Student email
 * @param {number} grade - Grade level
 * @param {Object} intervention - Intervention details
 * @returns {Object} Assignment record
 */
function recordInterventionAssignment(studentEmail, grade, intervention) {
  var record = {
    studentEmail: studentEmail.toLowerCase(),
    grade: grade,
    assignedAt: new Date().toISOString(),
    tier: intervention.tier || 2,
    type: intervention.type || 'small_group',
    focusArea: intervention.focusArea || 'general',
    targetedMisconceptions: intervention.targetedMisconceptions || [],
    targetedQuestions: intervention.targetedQuestions || [],
    groupId: intervention.groupId || null,
    peerTutor: intervention.peerTutor || null,
    baselineScore: intervention.baselineScore || null,
    status: 'ACTIVE',
    evaluations: [],
    outcome: null
  };

  // Store the record
  var key = generateInterventionKey(studentEmail, grade);
  var existing = loadStudentInterventions(studentEmail, grade);

  existing.push(record);

  PropertiesService.getScriptProperties().setProperty(key, JSON.stringify(existing));

  Logger.log('InterventionTracker: Recorded intervention for ' + studentEmail +
             ' (Tier ' + record.tier + ', ' + record.focusArea + ')');

  return record;
}

/**
 * Record bulk intervention assignments from InterventionGrouping output
 *
 * @param {Object} interventionGroups - Output from generateInterventionGroups()
 * @param {number} grade - Grade level
 * @param {number} cycle - Current cycle
 * @param {number} week - Current week
 */
function recordInterventionsFromGroups(interventionGroups, grade, cycle, week) {
  var recorded = 0;

  // Record Tier 2 group interventions
  (interventionGroups.tier2Groups || []).forEach(function(group) {
    (group.students || []).forEach(function(student) {
      recordInterventionAssignment(student.email, grade, {
        tier: 2,
        type: 'small_group',
        focusArea: group.focusArea,
        groupId: group.id,
        baselineScore: student.score,
        targetedQuestions: [group.focusQuestion],
        assignedCycle: cycle,
        assignedWeek: week
      });
      recorded++;
    });
  });

  // Record Tier 3 group interventions
  (interventionGroups.tier3Groups || []).forEach(function(group) {
    (group.students || []).forEach(function(student) {
      recordInterventionAssignment(student.email, grade, {
        tier: 3,
        type: 'intensive',
        focusArea: group.focusArea,
        groupId: group.id,
        baselineScore: student.score,
        assignedCycle: cycle,
        assignedWeek: week
      });
      recorded++;
    });
  });

  // Record peer tutoring assignments
  (interventionGroups.peerTutoringPairs || []).forEach(function(pair) {
    recordInterventionAssignment(pair.tutee.email, grade, {
      tier: 2,
      type: 'peer_tutoring',
      focusArea: pair.focusAreas ? pair.focusAreas[0] : 'general',
      peerTutor: pair.tutor.email,
      assignedCycle: cycle,
      assignedWeek: week
    });
    recorded++;
  });

  Logger.log('InterventionTracker: Recorded ' + recorded + ' interventions for Grade ' + grade);

  return { recorded: recorded };
}

/**
 * ============================================================================
 * PROGRESS EVALUATION
 * ============================================================================
 */

/**
 * Evaluate a student's intervention progress
 *
 * @param {string} studentEmail - Student email
 * @param {number} grade - Grade level
 * @param {number} currentScore - Current overall score
 * @param {Object} currentFormScores - Current form-level scores
 * @returns {Object} Evaluation result
 */
function evaluateInterventionProgress(studentEmail, grade, currentScore, currentFormScores) {
  var interventions = loadStudentInterventions(studentEmail, grade);
  var activeIntervention = interventions.find(function(i) { return i.status === 'ACTIVE'; });

  if (!activeIntervention) {
    return { evaluated: false, reason: 'No active intervention' };
  }

  var evaluation = {
    date: new Date().toISOString(),
    currentScore: currentScore,
    formScores: currentFormScores,
    improvement: null,
    focusAreaImprovement: null,
    recommendation: null,
    details: {}
  };

  // Calculate overall improvement
  if (activeIntervention.baselineScore !== null) {
    evaluation.improvement = currentScore - activeIntervention.baselineScore;
  }

  // Calculate focus area improvement
  if (activeIntervention.focusArea && currentFormScores && currentFormScores[activeIntervention.focusArea]) {
    var currentFocusScore = currentFormScores[activeIntervention.focusArea].percentage || 0;
    var baselineFocusScore = activeIntervention.baselineFocusScore || activeIntervention.baselineScore;

    if (baselineFocusScore !== null) {
      evaluation.focusAreaImprovement = currentFocusScore - baselineFocusScore;
    }
  }

  // Determine recommendation
  evaluation.recommendation = determineRecommendation(activeIntervention, evaluation, currentScore);
  evaluation.details = {
    weeksInIntervention: calculateWeeksInIntervention(activeIntervention),
    previousEvaluations: activeIntervention.evaluations.length,
    tier: activeIntervention.tier
  };

  // Store evaluation
  activeIntervention.evaluations.push(evaluation);
  saveStudentInterventions(studentEmail, grade, interventions);

  // Update intervention status if recommendation is to exit
  if (evaluation.recommendation.action === 'GRADUATE' ||
      evaluation.recommendation.action === 'ESCALATE') {
    activeIntervention.status = 'COMPLETED';
    activeIntervention.outcome = evaluation.recommendation.action;
    activeIntervention.completedAt = new Date().toISOString();
    saveStudentInterventions(studentEmail, grade, interventions);
  }

  Logger.log('InterventionTracker: Evaluated ' + studentEmail +
             ' - ' + evaluation.recommendation.action);

  return {
    evaluated: true,
    studentEmail: studentEmail,
    evaluation: evaluation
  };
}

/**
 * Determine recommendation based on progress
 * @private
 */
function determineRecommendation(intervention, evaluation, currentScore) {
  var weeksInIntervention = calculateWeeksInIntervention(intervention);
  var improvement = evaluation.improvement || 0;

  // Check for graduation (moved to Tier 1)
  if (currentScore >= InterventionTrackerConfig.TIER1_THRESHOLD) {
    return {
      action: 'GRADUATE',
      reason: 'Student now meets Tier 1 threshold (' + currentScore + '%)',
      celebrate: improvement >= InterventionTrackerConfig.CELEBRATION_THRESHOLD
    };
  }

  // Check for tier movement (Tier 3 -> Tier 2)
  if (intervention.tier === 3 && currentScore >= InterventionTrackerConfig.TIER2_THRESHOLD) {
    return {
      action: 'TIER_CHANGE',
      newTier: 2,
      reason: 'Student improved to Tier 2 threshold (' + currentScore + '%)',
      celebrate: improvement >= InterventionTrackerConfig.CELEBRATION_THRESHOLD
    };
  }

  // Check for escalation (no progress after threshold)
  if (weeksInIntervention >= InterventionTrackerConfig.ESCALATION_WEEKS &&
      improvement < InterventionTrackerConfig.IMPROVEMENT_THRESHOLD) {
    if (intervention.tier === 2) {
      return {
        action: 'ESCALATE',
        newTier: 3,
        reason: 'Insufficient progress after ' + weeksInIntervention + ' weeks',
        additionalActions: ['Consider SST referral', 'Increase intervention intensity']
      };
    } else {
      // Already Tier 3
      return {
        action: 'SST_REFERRAL',
        reason: 'Tier 3 intervention not showing progress after ' + weeksInIntervention + ' weeks',
        additionalActions: ['Initiate SST process', 'Consider diagnostic assessment']
      };
    }
  }

  // Check minimum evaluation period
  if (weeksInIntervention < InterventionTrackerConfig.MIN_WEEKS_FOR_EVALUATION) {
    return {
      action: 'CONTINUE',
      reason: 'Insufficient time for evaluation (' + weeksInIntervention + ' weeks)',
      note: 'Evaluate after ' + InterventionTrackerConfig.MIN_WEEKS_FOR_EVALUATION + ' weeks'
    };
  }

  // Check for positive progress
  if (improvement >= InterventionTrackerConfig.IMPROVEMENT_THRESHOLD / 2) {
    return {
      action: 'CONTINUE',
      reason: 'Positive progress observed (+' + improvement.toFixed(1) + '%)',
      celebrate: false
    };
  }

  // No clear direction
  return {
    action: 'CONTINUE',
    reason: 'Monitoring progress',
    concerns: improvement < 0 ? ['Score declining'] : []
  };
}

/**
 * Calculate weeks since intervention started
 * @private
 */
function calculateWeeksInIntervention(intervention) {
  var startDate = new Date(intervention.assignedAt);
  var now = new Date();
  var diffDays = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
  return Math.floor(diffDays / 7);
}

/**
 * ============================================================================
 * BULK EVALUATION
 * ============================================================================
 */

/**
 * Evaluate all active interventions for a grade
 *
 * @param {number} grade - Grade level
 * @param {Object} mtssReport - Current MTSS report with student scores
 * @returns {Object} Evaluation results
 */
function evaluateAllInterventions(grade, mtssReport) {
  var results = {
    evaluated: 0,
    graduations: [],
    tierChanges: [],
    escalations: [],
    continuing: [],
    errors: []
  };

  // Build score lookup
  var scoreMap = {};
  var allStudents = [
    ...(mtssReport.tier1Students || []),
    ...(mtssReport.tier2Students || []),
    ...(mtssReport.tier3Students || [])
  ];

  allStudents.forEach(function(student) {
    scoreMap[student.email.toLowerCase()] = {
      score: student.overallScore,
      formScores: student.formScores
    };
  });

  // Get all students with active interventions
  var activeStudents = getStudentsWithActiveInterventions(grade);

  activeStudents.forEach(function(studentEmail) {
    var studentData = scoreMap[studentEmail];

    if (!studentData) {
      results.errors.push({
        student: studentEmail,
        error: 'No current score data found'
      });
      return;
    }

    try {
      var evalResult = evaluateInterventionProgress(
        studentEmail,
        grade,
        studentData.score,
        studentData.formScores
      );

      if (evalResult.evaluated) {
        results.evaluated++;

        var rec = evalResult.evaluation.recommendation;
        switch (rec.action) {
          case 'GRADUATE':
            results.graduations.push({
              student: studentEmail,
              score: studentData.score,
              improvement: evalResult.evaluation.improvement,
              celebrate: rec.celebrate
            });
            break;
          case 'TIER_CHANGE':
            results.tierChanges.push({
              student: studentEmail,
              fromTier: 3,
              toTier: rec.newTier,
              score: studentData.score
            });
            break;
          case 'ESCALATE':
          case 'SST_REFERRAL':
            results.escalations.push({
              student: studentEmail,
              action: rec.action,
              reason: rec.reason,
              additionalActions: rec.additionalActions
            });
            break;
          default:
            results.continuing.push({
              student: studentEmail,
              score: studentData.score,
              improvement: evalResult.evaluation.improvement,
              reason: rec.reason
            });
        }
      }
    } catch (e) {
      results.errors.push({
        student: studentEmail,
        error: e.message
      });
    }
  });

  Logger.log('InterventionTracker: Evaluated ' + results.evaluated + ' interventions for Grade ' + grade +
             ' (' + results.graduations.length + ' graduations, ' +
             results.escalations.length + ' escalations)');

  return results;
}

/**
 * ============================================================================
 * EFFECTIVENESS REPORTING
 * ============================================================================
 */

/**
 * Generate intervention effectiveness report for a grade
 *
 * @param {number} grade - Grade level
 * @returns {Object} Effectiveness report
 */
function generateEffectivenessReport(grade) {
  var report = {
    generated: new Date().toISOString(),
    grade: grade,
    summary: {
      totalInterventions: 0,
      activeInterventions: 0,
      completedInterventions: 0,
      graduations: 0,
      escalations: 0,
      averageImprovement: 0
    },
    byType: {},
    byFocusArea: {},
    successStories: [],
    concerns: []
  };

  // Load all interventions for the grade
  var allInterventions = loadAllInterventionsForGrade(grade);

  report.summary.totalInterventions = allInterventions.length;

  var improvements = [];

  allInterventions.forEach(function(record) {
    // Count by status
    if (record.status === 'ACTIVE') {
      report.summary.activeInterventions++;
    } else {
      report.summary.completedInterventions++;
      if (record.outcome === 'GRADUATE') report.summary.graduations++;
      if (record.outcome === 'ESCALATE') report.summary.escalations++;
    }

    // Group by type
    var type = record.type || 'unknown';
    if (!report.byType[type]) {
      report.byType[type] = { count: 0, improvements: [], graduates: 0 };
    }
    report.byType[type].count++;
    if (record.outcome === 'GRADUATE') report.byType[type].graduates++;

    // Group by focus area
    var focus = record.focusArea || 'general';
    if (!report.byFocusArea[focus]) {
      report.byFocusArea[focus] = { count: 0, improvements: [], graduates: 0 };
    }
    report.byFocusArea[focus].count++;
    if (record.outcome === 'GRADUATE') report.byFocusArea[focus].graduates++;

    // Calculate improvement
    if (record.evaluations && record.evaluations.length > 0) {
      var lastEval = record.evaluations[record.evaluations.length - 1];
      if (lastEval.improvement !== null) {
        improvements.push(lastEval.improvement);
        report.byType[type].improvements.push(lastEval.improvement);
        report.byFocusArea[focus].improvements.push(lastEval.improvement);
      }
    }

    // Identify success stories
    if (record.outcome === 'GRADUATE' && record.evaluations && record.evaluations.length > 0) {
      var finalEval = record.evaluations[record.evaluations.length - 1];
      if (finalEval.improvement >= InterventionTrackerConfig.CELEBRATION_THRESHOLD) {
        report.successStories.push({
          student: record.studentEmail,
          improvement: finalEval.improvement,
          focusArea: record.focusArea,
          weeksToGraduate: calculateWeeksInIntervention(record)
        });
      }
    }

    // Identify concerns
    if (record.status === 'ACTIVE') {
      var weeks = calculateWeeksInIntervention(record);
      if (weeks >= InterventionTrackerConfig.ESCALATION_WEEKS) {
        var latestEval = record.evaluations && record.evaluations.length > 0 ?
          record.evaluations[record.evaluations.length - 1] : null;

        if (!latestEval || latestEval.improvement < InterventionTrackerConfig.IMPROVEMENT_THRESHOLD) {
          report.concerns.push({
            student: record.studentEmail,
            tier: record.tier,
            weeksInIntervention: weeks,
            improvement: latestEval ? latestEval.improvement : 0
          });
        }
      }
    }
  });

  // Calculate average improvement
  if (improvements.length > 0) {
    report.summary.averageImprovement = improvements.reduce(function(a, b) { return a + b; }, 0) / improvements.length;
  }

  // Calculate effectiveness by type
  Object.keys(report.byType).forEach(function(type) {
    var typeData = report.byType[type];
    if (typeData.improvements.length > 0) {
      typeData.averageImprovement = typeData.improvements.reduce(function(a, b) { return a + b; }, 0) / typeData.improvements.length;
    }
    typeData.graduationRate = typeData.count > 0 ? (typeData.graduates / typeData.count * 100) : 0;
    delete typeData.improvements; // Remove raw data
  });

  // Calculate effectiveness by focus area
  Object.keys(report.byFocusArea).forEach(function(focus) {
    var focusData = report.byFocusArea[focus];
    if (focusData.improvements.length > 0) {
      focusData.averageImprovement = focusData.improvements.reduce(function(a, b) { return a + b; }, 0) / focusData.improvements.length;
    }
    focusData.graduationRate = focusData.count > 0 ? (focusData.graduates / focusData.count * 100) : 0;
    delete focusData.improvements;
  });

  // Sort success stories by improvement
  report.successStories.sort(function(a, b) { return b.improvement - a.improvement; });

  // Save report
  var key = 'intervention-report-g' + grade;
  PropertiesService.getScriptProperties().setProperty(key, JSON.stringify(report));

  return report;
}

/**
 * ============================================================================
 * STORAGE HELPERS
 * ============================================================================
 */

function generateInterventionKey(studentEmail, grade) {
  return 'interventions-' + studentEmail.toLowerCase() + '-g' + grade;
}

function loadStudentInterventions(studentEmail, grade) {
  var key = generateInterventionKey(studentEmail, grade);
  var stored = PropertiesService.getScriptProperties().getProperty(key);

  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      Logger.log('InterventionTracker: Failed to parse interventions for ' + studentEmail);
    }
  }

  return [];
}

function saveStudentInterventions(studentEmail, grade, interventions) {
  var key = generateInterventionKey(studentEmail, grade);
  PropertiesService.getScriptProperties().setProperty(key, JSON.stringify(interventions));
}

function getStudentsWithActiveInterventions(grade) {
  var allKeys = PropertiesService.getScriptProperties().getKeys();
  var prefix = 'interventions-';
  var suffix = '-g' + grade;
  var students = [];

  allKeys.forEach(function(key) {
    if (key.startsWith(prefix) && key.endsWith(suffix)) {
      var data = PropertiesService.getScriptProperties().getProperty(key);
      try {
        var interventions = JSON.parse(data);
        var hasActive = interventions.some(function(i) { return i.status === 'ACTIVE'; });
        if (hasActive) {
          var email = key.replace(prefix, '').replace(suffix, '');
          students.push(email);
        }
      } catch (e) {}
    }
  });

  return students;
}

function loadAllInterventionsForGrade(grade) {
  var allKeys = PropertiesService.getScriptProperties().getKeys();
  var prefix = 'interventions-';
  var suffix = '-g' + grade;
  var allInterventions = [];

  allKeys.forEach(function(key) {
    if (key.startsWith(prefix) && key.endsWith(suffix)) {
      var data = PropertiesService.getScriptProperties().getProperty(key);
      try {
        var interventions = JSON.parse(data);
        allInterventions = allInterventions.concat(interventions);
      } catch (e) {}
    }
  });

  return allInterventions;
}

/**
 * Clear intervention data (for testing)
 */
function clearInterventionData(grade) {
  var allKeys = PropertiesService.getScriptProperties().getKeys();
  var suffix = '-g' + grade;

  allKeys.forEach(function(key) {
    if (key.startsWith('interventions-') && key.endsWith(suffix)) {
      PropertiesService.getScriptProperties().deleteProperty(key);
    }
  });

  PropertiesService.getScriptProperties().deleteProperty('intervention-report-g' + grade);
  Logger.log('InterventionTracker: Cleared all intervention data for Grade ' + grade);
}
