/**
 * KAMS Science Curriculum - Spiral Content Advisor
 * Feedback loop connecting misconception analysis to spiral content recommendations
 *
 * @fileoverview Analyzes misconception patterns and spiral effectiveness to
 *               recommend which concepts should be included in future spiral questions
 * @version 1.0.0
 * @author KAMS Science Team
 *
 * ============================================================================
 * PURPOSE
 * ============================================================================
 *
 * This module creates a feedback loop:
 *   1. MisconceptionTracker identifies persistent misconceptions
 *   2. SpiralEffectiveness measures retention of spiral questions
 *   3. SpiralContentAdvisor recommends:
 *      - Concepts to add to spiral questions
 *      - Concepts to increase spiral frequency
 *      - Concepts to celebrate (strong retention)
 *      - Question suggestions for exit tickets
 *
 * ============================================================================
 */

/**
 * Configuration for spiral content recommendations
 */
var SpiralAdvisorConfig = {
  // Misconception frequency threshold to trigger spiral recommendation
  MISCONCEPTION_THRESHOLD: 25,

  // Spiral retention threshold below which more spiral is needed
  WEAK_RETENTION_THRESHOLD: 60,

  // Strong retention threshold (celebration worthy)
  STRONG_RETENTION_THRESHOLD: 85,

  // Minimum weeks of data before making recommendations
  MIN_DATA_WEEKS: 2,

  // Maximum concepts to recommend per week
  MAX_RECOMMENDATIONS_PER_WEEK: 4,

  // Spiral frequency targets
  FREQUENCY_TARGETS: {
    weak: 'Every exit ticket for 2 weeks',
    moderate: 'Every other exit ticket',
    maintenance: 'Once per cycle'
  }
};

/**
 * ============================================================================
 * MAIN ANALYSIS FUNCTIONS
 * ============================================================================
 */

/**
 * Generate spiral content recommendations based on misconception and retention data
 * Main entry point for the feedback loop
 *
 * @param {number} grade - Grade level
 * @param {number} cycle - Current cycle
 * @param {number} week - Current week
 * @param {Object} misconceptionReport - Output from MisconceptionTracker
 * @param {Object} spiralReport - Output from SpiralEffectiveness
 * @returns {Object} Comprehensive spiral recommendations
 */
function generateSpiralRecommendations(grade, cycle, week, misconceptionReport, spiralReport) {
  const recommendations = {
    generated: new Date().toISOString(),
    grade: grade,
    cycle: cycle,
    week: week,
    forNextWeek: [],
    forNextCycle: [],
    celebrating: [],
    questionSuggestions: [],
    summary: {}
  };

  // Get misconception patterns for this grade
  const gradeKey = `grade${grade}`;
  const misconceptions = misconceptionReport?.[gradeKey]?.patterns || [];
  const spiralData = spiralReport?.[gradeKey] || {};

  // Step 1: Identify concepts needing immediate spiral (high misconception frequency)
  const urgentConcepts = identifyUrgentSpiralNeeds(misconceptions);
  recommendations.forNextWeek.push(...urgentConcepts);

  // Step 2: Identify concepts with weak retention from spiral analysis
  const weakRetention = identifyWeakRetentionConcepts(spiralData);
  recommendations.forNextWeek.push(...weakRetention.filter(w =>
    !recommendations.forNextWeek.some(u => u.conceptId === w.conceptId)
  ));

  // Step 3: Identify concepts for next cycle spiral (moderate concern)
  const moderateConcerns = identifyModerateConcepts(misconceptions, spiralData);
  recommendations.forNextCycle.push(...moderateConcerns);

  // Step 4: Identify concepts with strong retention (celebrate!)
  const strongRetention = identifyStrongRetention(spiralData);
  recommendations.celebrating.push(...strongRetention);

  // Step 5: Generate specific question suggestions
  recommendations.questionSuggestions = generateQuestionSuggestions(
    recommendations.forNextWeek,
    grade,
    cycle,
    week
  );

  // Step 6: Create summary
  recommendations.summary = {
    urgentCount: urgentConcepts.length,
    weakRetentionCount: weakRetention.length,
    moderateConcernCount: moderateConcerns.length,
    celebratingCount: strongRetention.length,
    totalRecommendations: recommendations.forNextWeek.length + recommendations.forNextCycle.length,
    recommendedAction: determineOverallAction(recommendations)
  };

  // Save recommendations
  saveSpiralRecommendations(recommendations, grade, cycle, week);

  Logger.log(`SpiralContentAdvisor: Generated ${recommendations.summary.totalRecommendations} recommendations for G${grade}`);

  return recommendations;
}

/**
 * Identify concepts needing urgent spiral attention
 * @private
 */
function identifyUrgentSpiralNeeds(misconceptions) {
  const urgent = [];

  misconceptions.forEach(pattern => {
    if (pattern.frequency >= SpiralAdvisorConfig.MISCONCEPTION_THRESHOLD) {
      urgent.push({
        conceptId: pattern.id,
        conceptName: pattern.description,
        correctUnderstanding: pattern.correctUnderstanding,
        reason: 'high_misconception_frequency',
        frequency: pattern.frequency,
        trend: pattern.trend,
        priority: pattern.frequency >= 40 ? 'CRITICAL' : 'HIGH',
        recommendedFrequency: pattern.frequency >= 40 ?
          SpiralAdvisorConfig.FREQUENCY_TARGETS.weak :
          SpiralAdvisorConfig.FREQUENCY_TARGETS.moderate,
        existingQuestions: pattern.targetedQuestions || [],
        suggestedAction: generateMisconceptionAction(pattern)
      });
    }
  });

  // Sort by frequency descending
  urgent.sort((a, b) => b.frequency - a.frequency);

  // Limit to max recommendations
  return urgent.slice(0, SpiralAdvisorConfig.MAX_RECOMMENDATIONS_PER_WEEK);
}

/**
 * Identify concepts with weak retention from spiral effectiveness data
 * @private
 */
function identifyWeakRetentionConcepts(spiralData) {
  const weak = [];

  // Check cycle comparisons
  (spiralData.cycleComparisons || []).forEach(comparison => {
    if (comparison.retentionRate < SpiralAdvisorConfig.WEAK_RETENTION_THRESHOLD) {
      weak.push({
        conceptId: comparison.concept,
        conceptName: comparison.concept,
        reason: 'weak_retention',
        originalCycle: comparison.originalCycle,
        originalScore: comparison.originalScore,
        spiralScore: comparison.spiralScore,
        retentionRate: comparison.retentionRate,
        improvement: comparison.improvement,
        priority: comparison.retentionRate < 40 ? 'CRITICAL' : 'HIGH',
        recommendedFrequency: SpiralAdvisorConfig.FREQUENCY_TARGETS.weak,
        suggestedAction: `Increase spiral frequency. Original score: ${comparison.originalScore}%, ` +
                         `current retention: ${comparison.retentionRate}%`
      });
    }
  });

  // Check concepts needing reinforcement
  (spiralData.conceptRetention?.needsReinforcement || []).forEach(concept => {
    if (!weak.some(w => w.conceptId === concept)) {
      weak.push({
        conceptId: concept,
        conceptName: concept,
        reason: 'flagged_for_reinforcement',
        priority: 'MEDIUM',
        recommendedFrequency: SpiralAdvisorConfig.FREQUENCY_TARGETS.moderate,
        suggestedAction: 'Include in upcoming spiral questions'
      });
    }
  });

  return weak;
}

/**
 * Identify concepts of moderate concern for next cycle
 * @private
 */
function identifyModerateConcepts(misconceptions, spiralData) {
  const moderate = [];

  // Misconceptions below threshold but trending worse
  misconceptions.forEach(pattern => {
    if (pattern.frequency >= 15 && pattern.frequency < SpiralAdvisorConfig.MISCONCEPTION_THRESHOLD) {
      if (pattern.trend === 'worsening') {
        moderate.push({
          conceptId: pattern.id,
          conceptName: pattern.description,
          reason: 'trending_worse',
          frequency: pattern.frequency,
          trend: pattern.trend,
          priority: 'MEDIUM',
          recommendedFrequency: SpiralAdvisorConfig.FREQUENCY_TARGETS.moderate,
          suggestedAction: 'Monitor and include in next cycle spiral planning'
        });
      }
    }
  });

  // Spiral effectiveness declining
  if (spiralData.weeklyTrend?.trend === 'declining') {
    moderate.push({
      conceptId: 'overall_spiral',
      conceptName: 'Overall Spiral Effectiveness',
      reason: 'declining_effectiveness',
      priority: 'MEDIUM',
      trend: 'declining',
      suggestedAction: 'Review spiral question difficulty and explicit connections to prior content'
    });
  }

  return moderate;
}

/**
 * Identify concepts with strong retention (success stories)
 * @private
 */
function identifyStrongRetention(spiralData) {
  const strong = [];

  // Strong retention from cycle comparisons
  (spiralData.cycleComparisons || []).forEach(comparison => {
    if (comparison.retentionRate >= SpiralAdvisorConfig.STRONG_RETENTION_THRESHOLD) {
      strong.push({
        conceptId: comparison.concept,
        conceptName: comparison.concept,
        retentionRate: comparison.retentionRate,
        improvement: comparison.improvement,
        message: comparison.improvement > 10 ?
          `Students improved ${comparison.improvement}% from original learning!` :
          `Strong retention at ${comparison.retentionRate}%`
      });
    }
  });

  // Strong retention from explicit tracking
  (spiralData.conceptRetention?.strongRetention || []).forEach(concept => {
    if (!strong.some(s => s.conceptId === concept)) {
      strong.push({
        conceptId: concept,
        conceptName: concept,
        retentionRate: 85, // Assume threshold
        message: 'Consistently strong performance on spiral questions'
      });
    }
  });

  return strong;
}

/**
 * Generate specific question suggestions for upcoming exit tickets
 * @private
 */
function generateQuestionSuggestions(forNextWeek, grade, cycle, week) {
  const suggestions = [];
  const nextWeek = week < 3 ? week + 1 : 1;
  const nextCycle = week < 3 ? cycle : cycle + 1;

  forNextWeek.slice(0, 2).forEach((concept, idx) => {
    // Suggest spiral question for exit ticket
    suggestions.push({
      targetForm: 'exitTicket',
      targetWeek: nextWeek,
      targetCycle: nextCycle,
      questionSlot: `spiral_q${idx + 1}`,
      conceptId: concept.conceptId,
      conceptName: concept.conceptName,
      questionType: 'spiral',
      suggestedFormat: determineSuggestedFormat(concept),
      rationale: `Address ${concept.reason.replace(/_/g, ' ')}: ${concept.frequency || concept.retentionRate}%`,
      priority: concept.priority
    });
  });

  // Add integration question suggestion if multiple concepts
  if (forNextWeek.length >= 2) {
    suggestions.push({
      targetForm: 'exitTicket',
      targetWeek: nextWeek,
      targetCycle: nextCycle,
      questionSlot: 'integration_q1',
      conceptId: 'integration',
      conceptName: `Integration: ${forNextWeek[0].conceptName} + current week content`,
      questionType: 'integration',
      suggestedFormat: 'scenario-based',
      rationale: 'Connect struggling concept to new learning for deeper integration',
      priority: 'HIGH'
    });
  }

  return suggestions;
}

/**
 * Generate action recommendation for a misconception
 * @private
 */
function generateMisconceptionAction(pattern) {
  if (pattern.frequency >= 50) {
    return 'CRITICAL: Use refutational text approach. Start next class with phenomenon ' +
           'that directly challenges this misconception. Include in next 3 exit tickets.';
  } else if (pattern.frequency >= 35) {
    return 'Include targeted spiral question in next exit ticket. Use "bridging analogy" ' +
           'to connect misconception to correct understanding.';
  } else {
    return 'Add to spiral rotation. Include explicit comparison between misconception ' +
           'and correct understanding.';
  }
}

/**
 * Determine suggested question format based on concept
 * @private
 */
function determineSuggestedFormat(concept) {
  if (concept.reason === 'high_misconception_frequency') {
    return 'refutational-choice'; // True/false with explanation
  } else if (concept.reason === 'weak_retention') {
    return 'scaffolded-recall'; // Fill-in or matching
  }
  return 'application'; // Apply concept to new scenario
}

/**
 * Determine overall recommended action
 * @private
 */
function determineOverallAction(recommendations) {
  const urgentCount = recommendations.forNextWeek.filter(r => r.priority === 'CRITICAL').length;
  const highCount = recommendations.forNextWeek.filter(r => r.priority === 'HIGH').length;

  if (urgentCount >= 2) {
    return 'PAUSE new content. Address critical misconceptions before proceeding.';
  } else if (urgentCount === 1 || highCount >= 3) {
    return 'Prioritize spiral review. Allocate extra time for targeted intervention.';
  } else if (recommendations.forNextWeek.length > 0) {
    return 'Include recommended concepts in regular spiral rotation.';
  } else if (recommendations.celebrating.length > 0) {
    return 'Continue current approach. Acknowledge student success!';
  }
  return 'Monitor and maintain current spiral strategy.';
}

/**
 * ============================================================================
 * CROSS-CYCLE ANALYSIS
 * ============================================================================
 */

/**
 * Analyze spiral needs across multiple cycles
 * Identifies patterns and long-term retention issues
 *
 * @param {number} grade - Grade level
 * @returns {Object} Cross-cycle analysis
 */
function analyzeCrossCycleSpiralNeeds(grade) {
  const analysis = {
    generated: new Date().toISOString(),
    grade: grade,
    persistentMisconceptions: [],
    retentionTrends: [],
    recommendedCurriculumAdjustments: []
  };

  // Load historical recommendations
  const history = loadSpiralRecommendationHistory(grade);

  if (history.length < 2) {
    analysis.status = 'INSUFFICIENT_HISTORY';
    analysis.message = 'Need at least 2 cycles of data for cross-cycle analysis';
    return analysis;
  }

  // Identify persistent misconceptions (appeared in multiple cycles)
  const misconceptionCounts = {};
  history.forEach(rec => {
    rec.forNextWeek.forEach(item => {
      if (item.reason === 'high_misconception_frequency') {
        const key = item.conceptId;
        if (!misconceptionCounts[key]) {
          misconceptionCounts[key] = {
            conceptId: key,
            conceptName: item.conceptName,
            occurrences: [],
            frequencies: []
          };
        }
        misconceptionCounts[key].occurrences.push(`C${rec.cycle}W${rec.week}`);
        misconceptionCounts[key].frequencies.push(item.frequency);
      }
    });
  });

  // Flag persistent misconceptions (appeared 3+ times)
  Object.values(misconceptionCounts).forEach(mc => {
    if (mc.occurrences.length >= 3) {
      const avgFrequency = mc.frequencies.reduce((a, b) => a + b, 0) / mc.frequencies.length;
      const trend = mc.frequencies[mc.frequencies.length - 1] - mc.frequencies[0];

      analysis.persistentMisconceptions.push({
        ...mc,
        averageFrequency: Math.round(avgFrequency),
        trend: trend > 5 ? 'worsening' : trend < -5 ? 'improving' : 'stable',
        severity: mc.occurrences.length >= 5 ? 'CRITICAL' : 'HIGH',
        recommendation: 'Requires curriculum adjustment or alternative instructional approach'
      });
    }
  });

  // Generate curriculum adjustment recommendations
  analysis.persistentMisconceptions.forEach(pm => {
    analysis.recommendedCurriculumAdjustments.push({
      conceptId: pm.conceptId,
      issue: `Persistent misconception despite ${pm.occurrences.length} spiral interventions`,
      suggestion: generateCurriculumAdjustment(pm)
    });
  });

  // Save analysis
  const key = `spiral-cross-cycle-g${grade}`;
  PropertiesService.getScriptProperties().setProperty(key, JSON.stringify(analysis));

  return analysis;
}

/**
 * Generate curriculum adjustment suggestion
 * @private
 */
function generateCurriculumAdjustment(persistentMisconception) {
  const suggestions = [
    'Review initial instruction sequence for this concept',
    'Consider hands-on/manipulative approach instead of lecture',
    'Add bridging analogy that directly addresses the misconception',
    'Include explicit "what students often think vs. what scientists know" comparison',
    'Consider flipping the instruction order (start with correct understanding)',
    'Add phenomenon-based engagement that makes the misconception obviously fail'
  ];

  // Return top 3 based on severity
  return persistentMisconception.severity === 'CRITICAL' ?
    suggestions.slice(0, 4) : suggestions.slice(0, 2);
}

/**
 * ============================================================================
 * STORAGE AND RETRIEVAL
 * ============================================================================
 */

/**
 * Save spiral recommendations
 * @private
 */
function saveSpiralRecommendations(recommendations, grade, cycle, week) {
  const key = `spiral-rec-g${grade}-c${cycle}w${week}`;
  PropertiesService.getScriptProperties().setProperty(key, JSON.stringify(recommendations));

  // Also update the history index
  updateRecommendationIndex(grade, cycle, week);
}

/**
 * Update recommendation history index
 * @private
 */
function updateRecommendationIndex(grade, cycle, week) {
  const indexKey = `spiral-rec-index-g${grade}`;
  const props = PropertiesService.getScriptProperties();

  let index = [];
  const stored = props.getProperty(indexKey);
  if (stored) {
    try {
      index = JSON.parse(stored);
    } catch (e) {}
  }

  const entry = { cycle, week, key: `spiral-rec-g${grade}-c${cycle}w${week}` };

  // Avoid duplicates
  if (!index.some(i => i.cycle === cycle && i.week === week)) {
    index.push(entry);
    // Keep last 12 entries
    if (index.length > 12) {
      index = index.slice(-12);
    }
    props.setProperty(indexKey, JSON.stringify(index));
  }
}

/**
 * Load spiral recommendation history
 * @private
 */
function loadSpiralRecommendationHistory(grade) {
  const indexKey = `spiral-rec-index-g${grade}`;
  const props = PropertiesService.getScriptProperties();

  const stored = props.getProperty(indexKey);
  if (!stored) return [];

  const index = JSON.parse(stored);
  const history = [];

  index.forEach(entry => {
    const recStored = props.getProperty(entry.key);
    if (recStored) {
      try {
        history.push(JSON.parse(recStored));
      } catch (e) {}
    }
  });

  return history;
}

/**
 * Load latest spiral recommendations for a grade
 */
function loadLatestSpiralRecommendations(grade) {
  const indexKey = `spiral-rec-index-g${grade}`;
  const props = PropertiesService.getScriptProperties();

  const stored = props.getProperty(indexKey);
  if (!stored) return null;

  const index = JSON.parse(stored);
  if (index.length === 0) return null;

  const latest = index[index.length - 1];
  const recStored = props.getProperty(latest.key);

  if (recStored) {
    try {
      return JSON.parse(recStored);
    } catch (e) {
      return null;
    }
  }

  return null;
}

/**
 * ============================================================================
 * INTEGRATION HELPERS
 * ============================================================================
 */

/**
 * Generate spiral recommendations from orchestration data
 * Called by HubOrchestrator after analysis steps
 *
 * @param {Object} orchestrationData - Contains misconceptionReport, spiralReport
 * @param {number} cycle - Current cycle
 * @param {number} week - Current week
 * @returns {Object} Recommendations by grade
 */
function generateAllSpiralRecommendations(orchestrationData, cycle, week) {
  const results = {};
  const grades = [7, 8];

  grades.forEach(grade => {
    results[`grade${grade}`] = generateSpiralRecommendations(
      grade,
      cycle,
      week,
      orchestrationData.misconceptionReport || {},
      orchestrationData.spiralReport || {}
    );
  });

  Logger.log('SpiralContentAdvisor: Generated recommendations for all grades');
  return results;
}

/**
 * Format recommendations for teacher display
 */
function formatRecommendationsForDisplay(recommendations) {
  let output = '';

  output += '=== SPIRAL CONTENT RECOMMENDATIONS ===\n';
  output += `Generated: ${recommendations.generated}\n`;
  output += `Grade ${recommendations.grade}, Cycle ${recommendations.cycle} Week ${recommendations.week}\n\n`;

  if (recommendations.forNextWeek.length > 0) {
    output += 'FOR NEXT WEEK (Priority Spiral):\n';
    output += '-'.repeat(40) + '\n';
    recommendations.forNextWeek.forEach((item, idx) => {
      output += `${idx + 1}. [${item.priority}] ${item.conceptName}\n`;
      output += `   Reason: ${item.reason.replace(/_/g, ' ')}\n`;
      output += `   Action: ${item.suggestedAction}\n`;
      output += `   Frequency: ${item.recommendedFrequency}\n\n`;
    });
  }

  if (recommendations.questionSuggestions.length > 0) {
    output += 'QUESTION SUGGESTIONS:\n';
    output += '-'.repeat(40) + '\n';
    recommendations.questionSuggestions.forEach((q, idx) => {
      output += `${idx + 1}. ${q.questionSlot}: ${q.conceptName}\n`;
      output += `   Format: ${q.suggestedFormat}\n`;
      output += `   Rationale: ${q.rationale}\n\n`;
    });
  }

  if (recommendations.celebrating.length > 0) {
    output += 'CELEBRATING SUCCESS:\n';
    output += '-'.repeat(40) + '\n';
    recommendations.celebrating.forEach((item, idx) => {
      output += `${idx + 1}. ${item.conceptName}: ${item.message}\n`;
    });
    output += '\n';
  }

  output += 'RECOMMENDED ACTION: ' + recommendations.summary.recommendedAction + '\n';

  return output;
}
