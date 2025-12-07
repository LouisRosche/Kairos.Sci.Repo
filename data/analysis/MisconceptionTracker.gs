/**
 * KAMS Science Curriculum - Misconception Tracker
 * Identifies and tracks high-frequency misconception patterns
 *
 * @fileoverview Analyzes student responses to flag persistent misconceptions
 * @version 1.0.0
 * @author KAMS Science Team
 */

/**
 * Configuration constants
 */
const MISCONCEPTION_CONFIG = {
  ALERT_THRESHOLD: 30, // Flag when 30%+ miss same concept
  CRITICAL_THRESHOLD: 50, // Critical alert at 50%+
  TRACKING_WINDOW: 3 // Number of weeks to track patterns
};

/**
 * Tracked misconception structure per cycle config
 */
const KNOWN_MISCONCEPTIONS = {
  'cycle03': {
    'grade7': [
      { id: 'bond-break-release', description: 'Breaking bonds RELEASES energy', correct: 'Breaking bonds REQUIRES energy' },
      { id: 'mass-disappear', description: 'Mass disappears in reactions', correct: 'Mass is conserved' },
      { id: 'energy-not-measurable', description: 'Energy is not measurable', correct: 'Energy is quantifiable' }
    ],
    'grade8': [
      { id: 'bigger-more-force', description: 'Larger objects exert more force', correct: 'Forces are equal and opposite' },
      { id: 'lamarckian', description: 'Individual organisms evolve', correct: 'Populations evolve' },
      { id: 'fma-weak', description: 'F=ma conceptual weakness', correct: 'Apply F=ma to novel scenarios' }
    ]
  },
  'cycle04': {
    'grade7': [
      { id: 'ocean-acid-co2-only', description: 'Ocean acidification is only from CO2', correct: 'Multiple sources contribute; CO2 is primary but not sole cause', targetedIn: ['w1_s1_q3', 'w1_exit_q2'] },
      { id: 'ph-linear', description: '0.1 pH change is tiny/insignificant', correct: 'pH is logarithmic; 0.1 = 26% more acidic', targetedIn: ['w1_s1_q4', 'w1_exit_q1'] },
      { id: 'carbon-destroyed', description: 'Carbon is destroyed when dissolved', correct: 'Matter is conserved; carbon changes form', targetedIn: ['w1_s2_q2', 'w1_exit_q5'] },
      { id: 'nutrients-always-good', description: 'More nutrients are always better for ecosystems', correct: 'Excess nutrients cause eutrophication and dead zones', targetedIn: ['w2_s1_q4', 'w2_exit_q2'] },
      { id: 'dead-zones-permanent', description: 'Dead zones are permanent', correct: 'Dead zones can recover with intervention', targetedIn: ['w2_s3_q3'] },
      { id: 'energy-recycled', description: 'Energy is recycled like matter', correct: 'Energy flows one-way; matter cycles', targetedIn: ['w3_part3_q1'] }
    ],
    'grade8': [
      { id: 'energy-recycled', description: 'Energy is recycled like matter in ecosystems', correct: 'Energy flows through (lost as heat); matter cycles', targetedIn: ['w1_s1_q2', 'w1_exit_q1', 'w3_part3_q1'] },
      { id: 'pyramid-stability', description: 'Energy pyramids are always stable', correct: 'Pyramids can be disrupted by invasives, disease, or climate', targetedIn: ['w2_s2_q4', 'w2_exit_q3'] },
      { id: 'ecosystems-always-recover', description: 'Ecosystems always return to normal after disturbance', correct: 'Some changes are irreversible; extinctions are permanent', targetedIn: ['w2_s1_q4', 'w3_part3_q2'] },
      { id: 'removal-local-only', description: 'Removing one species only affects direct connections', correct: 'Keystone removal causes trophic cascades through entire web', targetedIn: ['w2_s1_q2', 'w2_exit_q2'] },
      { id: 'bigger-more-energy', description: 'Bigger predators have more energy', correct: 'Apex predators have LEAST energy available (10% rule)', targetedIn: ['w1_s1_q3', 'w1_s2_q4'] },
      { id: 'biocontrol-always-safe', description: 'Biocontrol (introducing predators) is always safe', correct: 'Biocontrol agents can become invasive themselves', targetedIn: ['w2_s3_q3'] }
    ]
  }
};

/**
 * Main function to analyze misconception patterns
 * @param {number} cycle - Current cycle number
 * @param {number} week - Current week number
 */
function analyzeMisconceptions(cycle, week) {
  const grades = [7, 8];
  const results = {};

  grades.forEach(grade => {
    const responses = collectResponses(grade, cycle, week);
    const patterns = identifyPatterns(responses, grade, cycle);
    const alerts = generateAlerts(patterns);

    results[`grade${grade}`] = {
      patterns: patterns,
      alerts: alerts,
      recommendations: generateRecommendations(patterns, alerts)
    };
  });

  saveAnalysis(results, cycle, week);
  return results;
}

/**
 * Collects student responses for analysis
 * @param {number} grade - Grade level
 * @param {number} cycle - Cycle number
 * @param {number} week - Week number
 * @returns {Array<Object>} Response data
 */
function collectResponses(grade, cycle, week) {
  // In production, this would fetch from response sheets
  return [];
}

/**
 * Identifies misconception patterns in responses
 * @param {Array<Object>} responses - Student responses
 * @param {number} grade - Grade level
 * @param {number} cycle - Cycle number
 * @returns {Array<Object>} Pattern analysis
 */
function identifyPatterns(responses, grade, cycle) {
  const cycleKey = `cycle0${cycle}`;
  const gradeKey = `grade${grade}`;
  const knownMisconceptions = KNOWN_MISCONCEPTIONS[cycleKey]?.[gradeKey] || [];

  const patterns = knownMisconceptions.map(misconception => {
    const matchingResponses = responses.filter(r =>
      detectMisconception(r, misconception.id)
    );

    const frequency = responses.length > 0
      ? Math.round((matchingResponses.length / responses.length) * 100)
      : 0;

    return {
      id: misconception.id,
      description: misconception.description,
      correctUnderstanding: misconception.correct,
      frequency: frequency,
      affectedStudents: matchingResponses.map(r => r.email),
      trend: calculateTrend(misconception.id, grade, cycle),
      targetedQuestions: getTargetedQuestions(misconception.id)
    };
  });

  return patterns.sort((a, b) => b.frequency - a.frequency);
}

/**
 * Detects if a response exhibits a specific misconception
 * @param {Object} response - Student response
 * @param {string} misconceptionId - Misconception identifier
 * @returns {boolean} Whether misconception is present
 */
function detectMisconception(response, misconceptionId) {
  // In production, this would analyze actual response content
  return false;
}

/**
 * Calculates trend over time for a misconception
 * @param {string} misconceptionId - Misconception identifier
 * @param {number} grade - Grade level
 * @param {number} cycle - Cycle number
 * @returns {string} Trend direction
 */
function calculateTrend(misconceptionId, grade, cycle) {
  // Would analyze historical data
  return 'stable'; // Options: 'improving', 'worsening', 'stable'
}

/**
 * Gets questions targeting a specific misconception
 * @param {string} misconceptionId - Misconception identifier
 * @returns {Array<string>} Question IDs
 */
function getTargetedQuestions(misconceptionId) {
  // Would return from cycle config
  return [];
}

/**
 * Generates alerts based on patterns
 * @param {Array<Object>} patterns - Pattern analysis
 * @returns {Array<Object>} Alert list
 */
function generateAlerts(patterns) {
  const alerts = [];

  patterns.forEach(pattern => {
    if (pattern.frequency >= MISCONCEPTION_CONFIG.CRITICAL_THRESHOLD) {
      alerts.push({
        level: 'CRITICAL',
        misconceptionId: pattern.id,
        frequency: pattern.frequency,
        message: `Critical: ${pattern.frequency}% of students exhibit "${pattern.description}"`,
        action: 'IMMEDIATE whole-class intervention required'
      });
    } else if (pattern.frequency >= MISCONCEPTION_CONFIG.ALERT_THRESHOLD) {
      alerts.push({
        level: 'WARNING',
        misconceptionId: pattern.id,
        frequency: pattern.frequency,
        message: `Warning: ${pattern.frequency}% of students exhibit "${pattern.description}"`,
        action: 'Plan targeted small-group intervention'
      });
    }
  });

  return alerts;
}

/**
 * Generates intervention recommendations
 * @param {Array<Object>} patterns - Pattern analysis
 * @param {Array<Object>} alerts - Generated alerts
 * @returns {Array<Object>} Recommendations
 */
function generateRecommendations(patterns, alerts) {
  const recommendations = [];

  alerts.filter(a => a.level === 'CRITICAL').forEach(alert => {
    const pattern = patterns.find(p => p.id === alert.misconceptionId);
    recommendations.push({
      priority: 'HIGH',
      misconception: pattern.description,
      correctUnderstanding: pattern.correctUnderstanding,
      suggestedActions: [
        'Pause new content introduction',
        'Use phenomenon-based re-engagement',
        'Implement collaborative discourse with evidence',
        'Deploy targeted PhET simulation or hands-on activity'
      ],
      spiralInNextCycle: true
    });
  });

  return recommendations;
}

/**
 * Saves analysis results
 * @param {Object} results - Analysis results
 * @param {number} cycle - Cycle number
 * @param {number} week - Week number
 */
function saveAnalysis(results, cycle, week) {
  const output = {
    generated: new Date().toISOString(),
    cycle: cycle,
    week: week,
    analysis: results
  };

  Logger.log('Misconception Analysis: ' + JSON.stringify(output, null, 2));
}

/**
 * Generates weekly misconception report
 * @param {number} cycle - Cycle number
 * @param {number} week - Week number
 */
function generateWeeklyReport(cycle, week) {
  const analysis = analyzeMisconceptions(cycle, week);

  const report = {
    title: `Misconception Report: Cycle ${cycle} Week ${week}`,
    generated: new Date().toISOString(),
    summary: {
      grade7: summarizeGrade(analysis.grade7),
      grade8: summarizeGrade(analysis.grade8)
    },
    actionItems: extractActionItems(analysis)
  };

  Logger.log('Weekly Report: ' + JSON.stringify(report, null, 2));
  return report;
}

/**
 * Summarizes analysis for a grade
 * @param {Object} gradeAnalysis - Grade-level analysis
 * @returns {Object} Summary
 */
function summarizeGrade(gradeAnalysis) {
  return {
    totalPatterns: gradeAnalysis.patterns.length,
    criticalAlerts: gradeAnalysis.alerts.filter(a => a.level === 'CRITICAL').length,
    warnings: gradeAnalysis.alerts.filter(a => a.level === 'WARNING').length,
    topMisconception: gradeAnalysis.patterns[0]?.description || 'None identified'
  };
}

/**
 * Extracts action items from analysis
 * @param {Object} analysis - Full analysis
 * @returns {Array<string>} Action items
 */
function extractActionItems(analysis) {
  const actions = [];

  Object.values(analysis).forEach(gradeData => {
    gradeData.recommendations.forEach(rec => {
      actions.push(`[${rec.priority}] Address: ${rec.misconception}`);
    });
  });

  return actions;
}
