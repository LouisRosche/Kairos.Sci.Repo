/**
 * DataAggregator.gs
 * Aggregates response data for analysis and MTSS intervention
 *
 * KAMS Science Curriculum System
 * Version: 3.0.0
 *
 * MIGRATION NOTE (v3.0):
 * Previously, POINTS, MTSS_TIERS, and thresholds were duplicated here.
 * Now all config flows from:
 *   config/master-config.json -> shared/Config.gs -> this module
 *
 * To get thresholds: Config.getMTSSThresholds()
 * To get points: Config.getFormPoints()
 * To determine tier: Config.getTierForScore(percentage)
 */

/**
 * Get aggregation configuration from centralized Config module
 * @returns {Object} Aggregation configuration
 */
function getAggregatorConfig() {
  const points = Config.getFormPoints();
  const thresholds = Config.getMTSSThresholds();

  return {
    points: points,
    totalPointsPerWeek: points.total,
    thresholds: thresholds,
    misconceptionAlertThreshold: thresholds.misconceptionAlert
  };
}

/**
 * Main aggregation function
 * @param {Object} rawResponses - Output from ResponseCollector
 * @param {number} grade - Grade to analyze
 * @param {number} cycle - Cycle to analyze
 * @param {number} week - Week to analyze
 */
function aggregateWeekData(rawResponses, grade, cycle, week) {
  const weekKey = `week${week}`;
  const cycleKey = `cycle${String(cycle).padStart(2, '0')}`;

  const weekData = rawResponses.grades[grade]?.[cycleKey]?.weeks?.[weekKey];
  if (!weekData) {
    Logger.log(`No data found for G${grade} C${cycle} W${week}`);
    return null;
  }

  // Build student-level data
  const students = buildStudentScores(weekData);

  // Calculate class-level statistics
  const classStats = calculateClassStats(students);

  // Identify misconception patterns
  const patterns = identifyMisconceptionPatterns(weekData);

  // Generate MTSS report
  const mtssReport = generateMTSSReport(students, patterns, grade, cycle, week);

  return {
    grade: grade,
    cycle: cycle,
    week: week,
    generated: new Date().toISOString(),
    classStats: classStats,
    patterns: patterns,
    mtss: mtssReport
  };
}

/**
 * Build student scores from week data
 */
function buildStudentScores(weekData) {
  const config = getAggregatorConfig();
  const students = {};

  Object.keys(weekData.forms).forEach(formType => {
    const formData = weekData.forms[formType];
    if (!formData.responses) return;

    formData.responses.forEach(response => {
      const email = response.email;

      if (!students[email]) {
        students[email] = {
          email: email,
          forms: {},
          totalEarned: 0,
          totalPossible: 0,
          questionDetails: []
        };
      }

      // Calculate form score
      let formEarned = 0;
      let formPossible = config.points[formType] || 0;

      Object.keys(response.answers).forEach(qKey => {
        const answer = response.answers[qKey];
        if (answer.points !== null) {
          // Auto-graded question
          formEarned += answer.points;
        }

        students[email].questionDetails.push({
          form: formType,
          question: qKey,
          title: answer.question,
          response: answer.response,
          points: answer.points
        });
      });

      students[email].forms[formType] = {
        earned: formEarned,
        possible: formPossible,
        percentage: formPossible > 0 ? (formEarned / formPossible) * 100 : 0
      };

      students[email].totalEarned += formEarned;
      students[email].totalPossible += formPossible;
    });
  });

  // Calculate overall percentage for each student
  Object.keys(students).forEach(email => {
    students[email].overallPercentage =
      students[email].totalPossible > 0
        ? (students[email].totalEarned / students[email].totalPossible) * 100
        : 0;

    // Assign MTSS tier using centralized Config
    students[email].tier = Config.getTierForScore(students[email].overallPercentage);
  });

  return students;
}

/**
 * Calculate class-level statistics
 */
function calculateClassStats(students) {
  const emails = Object.keys(students);
  const n = emails.length;

  if (n === 0) return { error: 'No students' };

  const percentages = emails.map(e => students[e].overallPercentage);
  const tierCounts = { tier1: 0, tier2: 0, tier3: 0 };

  emails.forEach(email => {
    tierCounts[`tier${students[email].tier}`]++;
  });

  return {
    totalStudents: n,
    average: percentages.reduce((a, b) => a + b, 0) / n,
    median: calculateMedian(percentages),
    min: Math.min(...percentages),
    max: Math.max(...percentages),
    standardDeviation: calculateStdDev(percentages),
    tierDistribution: tierCounts,
    tier1Percent: (tierCounts.tier1 / n) * 100,
    tier2Percent: (tierCounts.tier2 / n) * 100,
    tier3Percent: (tierCounts.tier3 / n) * 100
  };
}

/**
 * Identify misconception patterns from class responses
 */
function identifyMisconceptionPatterns(weekData) {
  const questionStats = {};

  Object.keys(weekData.forms).forEach(formType => {
    const formData = weekData.forms[formType];
    if (!formData.responses) return;

    // Aggregate by question
    formData.responses.forEach(response => {
      Object.keys(response.answers).forEach(qKey => {
        const answer = response.answers[qKey];
        const questionId = `${formType}_${qKey}`;

        if (!questionStats[questionId]) {
          questionStats[questionId] = {
            id: questionId,
            form: formType,
            question: answer.question,
            type: answer.type,
            totalResponses: 0,
            correctCount: 0,
            incorrectResponses: []
          };
        }

        questionStats[questionId].totalResponses++;

        // Check if correct (for auto-graded items)
        if (answer.points !== null && answer.points > 0) {
          questionStats[questionId].correctCount++;
        } else if (answer.points === 0) {
          // Track incorrect response for pattern analysis
          questionStats[questionId].incorrectResponses.push(answer.response);
        }
      });
    });
  });

  // Calculate miss rates and flag high-miss questions
  const patterns = {
    highMissQuestions: [],
    misconceptionAlerts: []
  };

  Object.keys(questionStats).forEach(qId => {
    const stat = questionStats[qId];
    stat.missRate = stat.totalResponses > 0
      ? ((stat.totalResponses - stat.correctCount) / stat.totalResponses) * 100
      : 0;

    const config = getAggregatorConfig();
    if (stat.missRate >= config.misconceptionAlertThreshold) {
      patterns.highMissQuestions.push({
        questionId: qId,
        question: stat.question,
        missRate: stat.missRate,
        totalResponses: stat.totalResponses,
        commonIncorrect: findMostCommon(stat.incorrectResponses)
      });
    }
  });

  // Sort by miss rate
  patterns.highMissQuestions.sort((a, b) => b.missRate - a.missRate);

  // Flag if whole-class reteach needed
  patterns.wholeClassReteachNeeded = patterns.highMissQuestions.some(q => q.missRate >= 40);

  return patterns;
}

/**
 * Generate MTSS intervention report
 */
function generateMTSSReport(students, patterns, grade, cycle, week) {
  const report = {
    generated: new Date().toISOString(),
    grade: grade,
    cycle: cycle,
    week: week,
    tier1Students: [],
    tier2Students: [],
    tier3Students: [],
    interventionRecommendations: []
  };

  Object.keys(students).forEach(email => {
    const student = students[email];
    const studentReport = {
      email: email,
      tier: student.tier,
      overallScore: student.overallPercentage,
      formScores: student.forms,
      struggles: [],
      recommendedActions: []
    };

    // Identify specific struggles
    student.questionDetails.forEach(detail => {
      if (detail.points === 0) {
        studentReport.struggles.push({
          form: detail.form,
          question: detail.title,
          response: detail.response
        });
      }
    });

    // Generate recommendations based on tier
    if (student.tier === 2) {
      studentReport.recommendedActions = [
        'Small group reteach during office hours',
        'Pair with Tier 1 student for peer tutoring',
        'Provide additional practice problems'
      ];
      report.tier2Students.push(studentReport);
    } else if (student.tier === 3) {
      studentReport.recommendedActions = [
        'Schedule 1:1 intervention session',
        'Provide alternative assessment format',
        'Contact family regarding support resources',
        'Review IEP/504 accommodations'
      ];
      report.tier3Students.push(studentReport);
    } else {
      report.tier1Students.push(studentReport);
    }
  });

  // Add class-wide interventions
  if (patterns.wholeClassReteachNeeded) {
    report.interventionRecommendations.push({
      type: 'whole-class',
      priority: 'high',
      action: 'Reteach high-miss concepts',
      questions: patterns.highMissQuestions.slice(0, 3).map(q => q.question)
    });
  }

  return report;
}

/**
 * Helper: Calculate median
 */
function calculateMedian(arr) {
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

/**
 * Helper: Calculate standard deviation
 */
function calculateStdDev(arr) {
  const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
  const squareDiffs = arr.map(value => Math.pow(value - mean, 2));
  return Math.sqrt(squareDiffs.reduce((a, b) => a + b, 0) / arr.length);
}

/**
 * Helper: Find most common value in array
 */
function findMostCommon(arr) {
  if (arr.length === 0) return null;

  const counts = {};
  arr.forEach(item => {
    const key = JSON.stringify(item);
    counts[key] = (counts[key] || 0) + 1;
  });

  const maxKey = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
  return { value: JSON.parse(maxKey), count: counts[maxKey] };
}

/**
 * Export MTSS report to JSON
 */
function exportMTSSReport(report) {
  const filename = `mtss-g${report.grade}-c${report.cycle}-w${report.week}.json`;
  saveToJson(filename, report);

  // Also export tier-specific files
  if (report.tier2Students.length > 0) {
    saveToJson(`tier2-g${report.grade}-c${report.cycle}-w${report.week}.json`, {
      generated: report.generated,
      students: report.tier2Students
    });
  }

  if (report.tier3Students.length > 0) {
    saveToJson(`tier3-g${report.grade}-c${report.cycle}-w${report.week}.json`, {
      generated: report.generated,
      students: report.tier3Students
    });
  }

  Logger.log(`MTSS report exported for G${report.grade} C${report.cycle} W${report.week}`);
}
