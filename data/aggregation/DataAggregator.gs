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
 * Main aggregation function with comprehensive error handling
 * @param {Object} rawResponses - Output from ResponseCollector
 * @param {number} grade - Grade to analyze
 * @param {number} cycle - Cycle to analyze
 * @param {number} week - Week to analyze
 * @returns {Object|null} Aggregated data or null if no data found
 */
function aggregateWeekData(rawResponses, grade, cycle, week) {
  const startTime = new Date();
  Logger.log(`Aggregating G${grade} C${cycle} W${week}...`);

  // Input validation
  if (!rawResponses) {
    Logger.log(`ERROR: rawResponses is null or undefined`);
    return { error: 'No response data provided', grade, cycle, week };
  }

  if (!rawResponses.grades) {
    Logger.log(`ERROR: rawResponses.grades is missing`);
    return { error: 'Invalid response data structure', grade, cycle, week };
  }

  const weekKey = `week${week}`;
  const cycleKey = `cycle${String(cycle).padStart(2, '0')}`;

  const weekData = rawResponses.grades[grade]?.[cycleKey]?.weeks?.[weekKey];
  if (!weekData) {
    Logger.log(`No data found for G${grade} C${cycle} W${week}`);
    return null;
  }

  const result = {
    grade: grade,
    cycle: cycle,
    week: week,
    generated: new Date().toISOString(),
    errors: []
  };

  // Build student-level data
  let students;
  try {
    students = buildStudentScores(weekData);
    result.students = students;
  } catch (e) {
    Logger.log(`ERROR building student scores: ${e.message}`);
    result.errors.push({ step: 'buildStudentScores', error: e.message });
    students = {};
  }

  // Calculate class-level statistics
  try {
    result.classStats = calculateClassStats(students);
  } catch (e) {
    Logger.log(`ERROR calculating class stats: ${e.message}`);
    result.errors.push({ step: 'calculateClassStats', error: e.message });
    result.classStats = { error: e.message };
  }

  // Identify misconception patterns
  try {
    result.patterns = identifyMisconceptionPatterns(weekData);
  } catch (e) {
    Logger.log(`ERROR identifying misconception patterns: ${e.message}`);
    result.errors.push({ step: 'identifyMisconceptionPatterns', error: e.message });
    result.patterns = { error: e.message };
  }

  // Generate MTSS report
  try {
    result.mtss = generateMTSSReport(students, result.patterns, grade, cycle, week);
  } catch (e) {
    Logger.log(`ERROR generating MTSS report: ${e.message}`);
    result.errors.push({ step: 'generateMTSSReport', error: e.message });
    result.mtss = { error: e.message };
  }

  const duration = (new Date() - startTime) / 1000;
  Logger.log(`Aggregation complete for G${grade} C${cycle} W${week} (${duration.toFixed(2)}s, ${result.errors.length} errors)`);

  return result;
}

/**
 * Build student scores from week data with error handling
 * @param {Object} weekData - Week data containing form responses
 * @returns {Object} Student scores keyed by email
 */
function buildStudentScores(weekData) {
  if (!weekData || !weekData.forms) {
    Logger.log('WARNING: weekData or weekData.forms is missing');
    return {};
  }

  let config;
  try {
    config = getAggregatorConfig();
  } catch (e) {
    Logger.log(`WARNING: Could not load aggregator config, using defaults: ${e.message}`);
    config = { points: { hook: 12, station1: 20, station2: 20, station3: 25, exitTicket: 23 } };
  }

  const students = {};

  Object.keys(weekData.forms).forEach(formType => {
    try {
      const formData = weekData.forms[formType];
      if (!formData || !formData.responses) return;

      formData.responses.forEach((response, responseIndex) => {
        try {
          const email = response.email || `unknown_${responseIndex}`;

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

          if (response.answers) {
            Object.keys(response.answers).forEach(qKey => {
              try {
                const answer = response.answers[qKey];
                if (answer && answer.points !== null && answer.points !== undefined && !isNaN(answer.points)) {
                  formEarned += Number(answer.points);
                }

                students[email].questionDetails.push({
                  form: formType,
                  question: qKey,
                  title: answer?.question || 'Unknown',
                  response: answer?.response,
                  points: answer?.points
                });
              } catch (answerError) {
                Logger.log(`Warning: Error processing answer ${qKey}: ${answerError.message}`);
              }
            });
          }

          students[email].forms[formType] = {
            earned: formEarned,
            possible: formPossible,
            percentage: formPossible > 0 ? (formEarned / formPossible) * 100 : 0
          };

          students[email].totalEarned += formEarned;
          students[email].totalPossible += formPossible;
        } catch (responseError) {
          Logger.log(`Warning: Error processing response ${responseIndex} in ${formType}: ${responseError.message}`);
        }
      });
    } catch (formError) {
      Logger.log(`Warning: Error processing form ${formType}: ${formError.message}`);
    }
  });

  // Calculate overall percentage for each student
  Object.keys(students).forEach(email => {
    try {
      students[email].overallPercentage =
        students[email].totalPossible > 0
          ? (students[email].totalEarned / students[email].totalPossible) * 100
          : 0;

      // Assign MTSS tier using centralized Config
      if (typeof Config !== 'undefined' && Config.getTierForScore) {
        students[email].tier = Config.getTierForScore(students[email].overallPercentage);
      } else {
        // Fallback tier calculation
        const pct = students[email].overallPercentage;
        students[email].tier = pct >= 70 ? 1 : (pct >= 50 ? 2 : 3);
      }
    } catch (tierError) {
      Logger.log(`Warning: Error calculating tier for ${email}: ${tierError.message}`);
      students[email].tier = 2; // Default to Tier 2
    }
  });

  Logger.log(`Built scores for ${Object.keys(students).length} students`);
  return students;
}

/**
 * Calculate class-level statistics with error handling
 * @param {Object} students - Student data keyed by email
 * @returns {Object} Class statistics
 */
function calculateClassStats(students) {
  if (!students || typeof students !== 'object') {
    Logger.log('WARNING: Invalid students object for class stats');
    return { error: 'Invalid student data', totalStudents: 0 };
  }

  const emails = Object.keys(students);
  const n = emails.length;

  if (n === 0) {
    return {
      error: 'No students',
      totalStudents: 0,
      tierDistribution: { tier1: 0, tier2: 0, tier3: 0 }
    };
  }

  try {
    const percentages = emails
      .map(e => students[e]?.overallPercentage)
      .filter(p => p !== undefined && p !== null && !isNaN(p));

    if (percentages.length === 0) {
      return { error: 'No valid percentages', totalStudents: n };
    }

    const tierCounts = { tier1: 0, tier2: 0, tier3: 0 };

    emails.forEach(email => {
      const tier = students[email]?.tier;
      if (tier >= 1 && tier <= 3) {
        tierCounts[`tier${tier}`]++;
      }
    });

    return {
      totalStudents: n,
      studentsWithScores: percentages.length,
      average: percentages.reduce((a, b) => a + b, 0) / percentages.length,
      median: calculateMedian(percentages),
      min: Math.min(...percentages),
      max: Math.max(...percentages),
      standardDeviation: calculateStdDev(percentages),
      tierDistribution: tierCounts,
      tier1Percent: (tierCounts.tier1 / n) * 100,
      tier2Percent: (tierCounts.tier2 / n) * 100,
      tier3Percent: (tierCounts.tier3 / n) * 100
    };
  } catch (e) {
    Logger.log(`ERROR in calculateClassStats: ${e.message}`);
    return { error: e.message, totalStudents: n };
  }
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
