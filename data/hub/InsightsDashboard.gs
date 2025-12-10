/**
 * KAMS Science Curriculum - Insights Dashboard
 * Unified cross-analysis dashboard synthesizing all data sources
 *
 * @fileoverview Generates comprehensive weekly insights reports combining
 *               MTSS, misconceptions, spiral effectiveness, seating, and interventions
 * @version 1.0.0
 * @author KAMS Science Team
 *
 * ============================================================================
 * PURPOSE
 * ============================================================================
 *
 * This module creates a unified view of all analyses:
 *   - MTSS tier distribution and changes
 *   - Misconception patterns and trends
 *   - Spiral effectiveness metrics
 *   - Seating recommendations
 *   - Intervention group status
 *   - Action items prioritized by impact
 *
 * Designed for teacher consumption - clear, actionable, concise.
 *
 * ============================================================================
 */

/**
 * ============================================================================
 * MAIN DASHBOARD GENERATION
 * ============================================================================
 */

/**
 * Generate comprehensive weekly insights dashboard
 * Main entry point - called by HubOrchestrator
 *
 * @param {Object} data - All analysis outputs from orchestration
 * @param {number} cycle - Current cycle
 * @param {number} week - Current week
 * @returns {Object} Complete insights dashboard
 */
function generateWeeklyInsights(data, cycle, week) {
  const insights = {
    generated: new Date().toISOString(),
    cycle: cycle,
    week: week,
    grades: {},
    crossGradePatterns: [],
    prioritizedActions: [],
    celebrations: [],
    dataQuality: {}
  };

  const grades = [7, 8];

  // Generate insights for each grade
  grades.forEach(grade => {
    const gradeKey = `grade${grade}`;
    insights.grades[gradeKey] = generateGradeInsights(
      grade, cycle, week,
      data.mtssReports?.[gradeKey] || data.mtssReports?.[grade],
      data.misconceptionReport?.[gradeKey],
      data.spiralReport?.[gradeKey],
      data.interventionGroups?.[gradeKey] || data.interventionGroups?.[grade],
      data.seatingAnalysis?.[gradeKey]
    );
  });

  // Identify cross-grade patterns
  insights.crossGradePatterns = identifyCrossGradePatterns(insights.grades);

  // Prioritize all action items
  insights.prioritizedActions = prioritizeAllActions(insights.grades, insights.crossGradePatterns);

  // Collect celebrations
  insights.celebrations = collectCelebrations(insights.grades);

  // Assess data quality
  insights.dataQuality = assessDataQuality(data);

  // Save insights
  saveInsights(insights, cycle, week);

  Logger.log(`InsightsDashboard: Generated insights for C${cycle}W${week}`);

  return insights;
}

/**
 * Generate insights for a single grade
 * @private
 */
function generateGradeInsights(grade, cycle, week, mtss, misconceptions, spiral, interventions, seating) {
  const gradeInsights = {
    grade: grade,
    mtss: generateMTSSInsights(mtss, grade),
    misconceptions: generateMisconceptionInsights(misconceptions, grade),
    spiral: generateSpiralInsights(spiral, grade),
    interventions: generateInterventionInsights(interventions, grade),
    seating: generateSeatingInsights(seating, grade),
    actionItems: [],
    highlights: []
  };

  // Compile action items from all sources
  gradeInsights.actionItems = compileActionItems(gradeInsights);

  // Identify highlights (good news)
  gradeInsights.highlights = identifyHighlights(gradeInsights);

  return gradeInsights;
}

/**
 * ============================================================================
 * MTSS INSIGHTS
 * ============================================================================
 */

function generateMTSSInsights(mtss, grade) {
  const insights = {
    available: false,
    tierDistribution: { tier1: 0, tier2: 0, tier3: 0 },
    percentages: { tier1: 0, tier2: 0, tier3: 0 },
    totalStudents: 0,
    alerts: [],
    trend: 'stable'
  };

  if (!mtss) return insights;

  insights.available = true;

  // Calculate distribution
  const t1 = mtss.tier1Students?.length || 0;
  const t2 = mtss.tier2Students?.length || 0;
  const t3 = mtss.tier3Students?.length || 0;
  const total = t1 + t2 + t3;

  insights.tierDistribution = { tier1: t1, tier2: t2, tier3: t3 };
  insights.totalStudents = total;

  if (total > 0) {
    insights.percentages = {
      tier1: Math.round((t1 / total) * 100),
      tier2: Math.round((t2 / total) * 100),
      tier3: Math.round((t3 / total) * 100)
    };
  }

  // Generate alerts
  if (insights.percentages.tier3 > 10) {
    insights.alerts.push({
      level: insights.percentages.tier3 > 20 ? 'CRITICAL' : 'WARNING',
      message: `${insights.percentages.tier3}% of students in Tier 3`,
      action: 'Review intervention capacity'
    });
  }

  if (insights.percentages.tier1 < 60) {
    insights.alerts.push({
      level: 'WARNING',
      message: `Only ${insights.percentages.tier1}% meeting expectations (Tier 1)`,
      action: 'Consider whole-class reteach'
    });
  }

  // Compare to previous week if available
  const previousMTSS = loadPreviousMTSS(grade);
  if (previousMTSS) {
    const prevT1Pct = previousMTSS.percentages?.tier1 || 0;
    const diff = insights.percentages.tier1 - prevT1Pct;

    if (diff > 5) insights.trend = 'improving';
    else if (diff < -5) insights.trend = 'declining';
    else insights.trend = 'stable';

    insights.weekOverWeekChange = diff;
  }

  return insights;
}

/**
 * ============================================================================
 * MISCONCEPTION INSIGHTS
 * ============================================================================
 */

function generateMisconceptionInsights(misconceptions, grade) {
  const insights = {
    available: false,
    topMisconceptions: [],
    alerts: [],
    trend: 'stable'
  };

  if (!misconceptions || !misconceptions.patterns) return insights;

  insights.available = true;

  // Get top 3 misconceptions by frequency
  insights.topMisconceptions = (misconceptions.patterns || [])
    .filter(p => p.frequency >= 20)
    .sort((a, b) => b.frequency - a.frequency)
    .slice(0, 3)
    .map(p => ({
      id: p.id,
      description: p.description,
      frequency: p.frequency,
      trend: p.trend,
      correctUnderstanding: p.correctUnderstanding
    }));

  // Generate alerts from misconceptions
  insights.topMisconceptions.forEach(m => {
    if (m.frequency >= 40) {
      insights.alerts.push({
        level: 'CRITICAL',
        message: `${m.frequency}% exhibit: "${m.description}"`,
        action: 'Use refutational text approach',
        misconceptionId: m.id
      });
    } else if (m.frequency >= 30) {
      insights.alerts.push({
        level: 'WARNING',
        message: `${m.frequency}% exhibit: "${m.description}"`,
        action: 'Include in spiral questions',
        misconceptionId: m.id
      });
    }
  });

  // Calculate overall trend
  const worseningCount = insights.topMisconceptions.filter(m => m.trend === 'worsening').length;
  const improvingCount = insights.topMisconceptions.filter(m => m.trend === 'improving').length;

  if (worseningCount > improvingCount) insights.trend = 'worsening';
  else if (improvingCount > worseningCount) insights.trend = 'improving';

  return insights;
}

/**
 * ============================================================================
 * SPIRAL INSIGHTS
 * ============================================================================
 */

function generateSpiralInsights(spiral, grade) {
  const insights = {
    available: false,
    currentEffectiveness: null,
    trend: 'stable',
    weakConcepts: [],
    strongConcepts: [],
    alerts: []
  };

  if (!spiral) return insights;

  insights.available = true;

  // Get current effectiveness from weekly trend
  if (spiral.weeklyTrend?.scores?.length > 0) {
    const latest = spiral.weeklyTrend.scores[spiral.weeklyTrend.scores.length - 1];
    insights.currentEffectiveness = latest.averageScore;
    insights.trend = spiral.weeklyTrend.trend;

    if (insights.currentEffectiveness < 60) {
      insights.alerts.push({
        level: 'WARNING',
        message: `Spiral effectiveness at ${insights.currentEffectiveness}% (below 60% target)`,
        action: 'Increase explicit connections to prior content'
      });
    }

    if (insights.trend === 'declining') {
      insights.alerts.push({
        level: 'WARNING',
        message: 'Spiral effectiveness is declining',
        action: 'Review spiral question difficulty'
      });
    }
  }

  // Weak and strong concepts
  insights.weakConcepts = (spiral.conceptRetention?.weakRetention || []).slice(0, 3);
  insights.strongConcepts = (spiral.conceptRetention?.strongRetention || []).slice(0, 3);

  return insights;
}

/**
 * ============================================================================
 * INTERVENTION INSIGHTS
 * ============================================================================
 */

function generateInterventionInsights(interventions, grade) {
  const insights = {
    available: false,
    tier2GroupCount: 0,
    tier3GroupCount: 0,
    peerPairCount: 0,
    wholeClassTopics: [],
    capacityStatus: 'OK'
  };

  if (!interventions) return insights;

  insights.available = true;
  insights.tier2GroupCount = interventions.tier2Groups?.length || 0;
  insights.tier3GroupCount = interventions.tier3Groups?.length || 0;
  insights.peerPairCount = interventions.peerTutoringPairs?.length || 0;
  insights.wholeClassTopics = (interventions.wholeClassTopics || []).map(t => t.topic);

  // Assess capacity
  const totalGroups = insights.tier2GroupCount + insights.tier3GroupCount;
  if (totalGroups > 6) {
    insights.capacityStatus = 'OVER_CAPACITY';
    insights.alerts = [{
      level: 'WARNING',
      message: `${totalGroups} intervention groups - may exceed teacher capacity`,
      action: 'Consider prioritization or additional support'
    }];
  } else if (totalGroups > 4) {
    insights.capacityStatus = 'HIGH';
  }

  return insights;
}

/**
 * ============================================================================
 * SEATING INSIGHTS
 * ============================================================================
 */

function generateSeatingInsights(seating, grade) {
  const insights = {
    available: false,
    catalystPairsFound: 0,
    distractionVectorsFound: 0,
    topRecommendations: [],
    weeksOfData: 0
  };

  // Try to load from SeatingDataBridge if not provided
  if (!seating) {
    try {
      const periods = [1, 2, 3, 4, 5, 6, 7];
      for (const period of periods) {
        const summary = getSeatingDataSummary(grade, period);
        if (summary && summary.seatingWeeks > 0) {
          const analysis = getLatestAnalysis(grade, period);
          if (analysis && analysis.analysis) {
            seating = analysis;
            break;
          }
        }
      }
    } catch (e) {
      // Seating data bridge not available
    }
  }

  if (!seating) return insights;

  insights.available = true;

  if (seating.analysis) {
    insights.catalystPairsFound = seating.analysis.catalystPairs?.length || 0;
    insights.distractionVectorsFound = seating.analysis.distractionVectors?.length || 0;
    insights.weeksOfData = seating.analysis.weeksAnalyzed || 0;

    // Top 3 recommendations
    insights.topRecommendations = (seating.analysis.recommendations || [])
      .slice(0, 3)
      .map(r => ({
        type: r.type,
        students: r.students?.join(' & '),
        reason: r.reason,
        priority: r.priority
      }));
  }

  return insights;
}

/**
 * ============================================================================
 * CROSS-ANALYSIS FUNCTIONS
 * ============================================================================
 */

/**
 * Identify patterns that appear across grades
 */
function identifyCrossGradePatterns(gradeInsights) {
  const patterns = [];

  const grades = Object.keys(gradeInsights);
  if (grades.length < 2) return patterns;

  // Check if both grades have declining MTSS
  const bothDeclining = grades.every(g =>
    gradeInsights[g].mtss?.trend === 'declining'
  );
  if (bothDeclining) {
    patterns.push({
      type: 'MTSS_DECLINE',
      message: 'Both grades showing MTSS decline',
      severity: 'HIGH',
      suggestion: 'Review recent content complexity; may need school-wide adjustment'
    });
  }

  // Check if both grades have same misconception
  const g7Misconceptions = gradeInsights.grade7?.misconceptions?.topMisconceptions || [];
  const g8Misconceptions = gradeInsights.grade8?.misconceptions?.topMisconceptions || [];

  g7Misconceptions.forEach(m7 => {
    const matching = g8Misconceptions.find(m8 =>
      m8.id === m7.id || m8.description.toLowerCase().includes(m7.description.toLowerCase().split(' ')[0])
    );
    if (matching) {
      patterns.push({
        type: 'SHARED_MISCONCEPTION',
        message: `Similar misconception in both grades: "${m7.description}"`,
        severity: 'MEDIUM',
        suggestion: 'Consider vertical alignment discussion with science team'
      });
    }
  });

  // Check if spiral effectiveness is low across grades
  const bothLowSpiral = grades.every(g =>
    gradeInsights[g].spiral?.currentEffectiveness &&
    gradeInsights[g].spiral.currentEffectiveness < 60
  );
  if (bothLowSpiral) {
    patterns.push({
      type: 'LOW_SPIRAL',
      message: 'Spiral effectiveness below target in both grades',
      severity: 'MEDIUM',
      suggestion: 'Review spiral question alignment with instruction'
    });
  }

  return patterns;
}

/**
 * Compile action items from all sources for a grade
 */
function compileActionItems(gradeInsights) {
  const actions = [];

  // From MTSS
  (gradeInsights.mtss?.alerts || []).forEach(alert => {
    actions.push({
      source: 'MTSS',
      priority: alert.level === 'CRITICAL' ? 1 : 2,
      message: alert.message,
      action: alert.action
    });
  });

  // From Misconceptions
  (gradeInsights.misconceptions?.alerts || []).forEach(alert => {
    actions.push({
      source: 'Misconception',
      priority: alert.level === 'CRITICAL' ? 1 : 2,
      message: alert.message,
      action: alert.action,
      misconceptionId: alert.misconceptionId
    });
  });

  // From Spiral
  (gradeInsights.spiral?.alerts || []).forEach(alert => {
    actions.push({
      source: 'Spiral',
      priority: alert.level === 'CRITICAL' ? 1 : (alert.level === 'WARNING' ? 2 : 3),
      message: alert.message,
      action: alert.action
    });
  });

  // From Interventions
  if (gradeInsights.interventions?.alerts) {
    gradeInsights.interventions.alerts.forEach(alert => {
      actions.push({
        source: 'Intervention',
        priority: 2,
        message: alert.message,
        action: alert.action
      });
    });
  }

  // From Seating
  (gradeInsights.seating?.topRecommendations || []).forEach(rec => {
    if (rec.priority === 'HIGH') {
      actions.push({
        source: 'Seating',
        priority: 3,
        message: `${rec.type}: ${rec.students}`,
        action: rec.reason
      });
    }
  });

  // Sort by priority
  actions.sort((a, b) => a.priority - b.priority);

  return actions;
}

/**
 * Prioritize all actions across grades
 */
function prioritizeAllActions(gradeInsights, crossGradePatterns) {
  const allActions = [];

  // Add cross-grade patterns as high priority
  crossGradePatterns.forEach(pattern => {
    allActions.push({
      source: 'Cross-Grade',
      grade: 'Both',
      priority: pattern.severity === 'HIGH' ? 0 : 1,
      message: pattern.message,
      action: pattern.suggestion
    });
  });

  // Add grade-specific actions
  Object.entries(gradeInsights).forEach(([gradeKey, insights]) => {
    const grade = gradeKey.replace('grade', '');
    (insights.actionItems || []).forEach(action => {
      allActions.push({
        ...action,
        grade: grade
      });
    });
  });

  // Sort by priority, then by grade
  allActions.sort((a, b) => {
    if (a.priority !== b.priority) return a.priority - b.priority;
    return a.grade.localeCompare(b.grade);
  });

  return allActions.slice(0, 10); // Top 10 actions
}

/**
 * Identify positive highlights
 */
function identifyHighlights(gradeInsights) {
  const highlights = [];

  // Improving MTSS
  if (gradeInsights.mtss?.trend === 'improving') {
    highlights.push({
      type: 'MTSS',
      message: `Tier 1 percentage improving (+${gradeInsights.mtss.weekOverWeekChange || 'some'}%)`
    });
  }

  // Strong spiral retention
  if (gradeInsights.spiral?.strongConcepts?.length > 0) {
    highlights.push({
      type: 'Spiral',
      message: `Strong retention on: ${gradeInsights.spiral.strongConcepts.slice(0, 2).join(', ')}`
    });
  }

  // High Tier 1 percentage
  if (gradeInsights.mtss?.percentages?.tier1 >= 80) {
    highlights.push({
      type: 'MTSS',
      message: `${gradeInsights.mtss.percentages.tier1}% of students meeting expectations!`
    });
  }

  // Catalyst pairs found
  if (gradeInsights.seating?.catalystPairsFound > 0) {
    highlights.push({
      type: 'Seating',
      message: `${gradeInsights.seating.catalystPairsFound} catalyst pairs identified`
    });
  }

  return highlights;
}

/**
 * Collect all celebrations across grades
 */
function collectCelebrations(gradeInsights) {
  const celebrations = [];

  Object.entries(gradeInsights).forEach(([gradeKey, insights]) => {
    const grade = gradeKey.replace('grade', '');
    (insights.highlights || []).forEach(h => {
      celebrations.push({
        grade: grade,
        ...h
      });
    });
  });

  return celebrations;
}

/**
 * Assess overall data quality
 */
function assessDataQuality(data) {
  const quality = {
    overall: 'GOOD',
    details: [],
    missingData: []
  };

  // Check MTSS data
  if (!data.mtssReports || Object.keys(data.mtssReports).length === 0) {
    quality.missingData.push('MTSS Reports');
  }

  // Check misconception data
  if (!data.misconceptionReport || Object.keys(data.misconceptionReport).length === 0) {
    quality.missingData.push('Misconception Analysis');
  }

  // Check spiral data
  if (!data.spiralReport || Object.keys(data.spiralReport).length === 0) {
    quality.missingData.push('Spiral Effectiveness');
  }

  // Determine overall quality
  if (quality.missingData.length === 0) {
    quality.overall = 'COMPLETE';
    quality.details.push('All data sources available');
  } else if (quality.missingData.length <= 1) {
    quality.overall = 'GOOD';
    quality.details.push(`Missing: ${quality.missingData.join(', ')}`);
  } else {
    quality.overall = 'PARTIAL';
    quality.details.push(`Missing: ${quality.missingData.join(', ')}`);
  }

  return quality;
}

/**
 * ============================================================================
 * STORAGE AND RETRIEVAL
 * ============================================================================
 */

function saveInsights(insights, cycle, week) {
  const key = `insights-c${cycle}w${week}`;
  PropertiesService.getScriptProperties().setProperty(key, JSON.stringify(insights));
}

function loadInsights(cycle, week) {
  const key = `insights-c${cycle}w${week}`;
  const stored = PropertiesService.getScriptProperties().getProperty(key);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      return null;
    }
  }
  return null;
}

function loadLatestInsights() {
  const allKeys = PropertiesService.getScriptProperties().getKeys();
  const insightKeys = allKeys.filter(k => k.startsWith('insights-c'));

  if (insightKeys.length === 0) return null;

  // Sort to get most recent
  insightKeys.sort().reverse();

  try {
    return JSON.parse(PropertiesService.getScriptProperties().getProperty(insightKeys[0]));
  } catch (e) {
    return null;
  }
}

function loadPreviousMTSS(grade) {
  // This would load from previous week's stored data
  // For now, return null to indicate no comparison available
  return null;
}

/**
 * ============================================================================
 * OUTPUT FORMATTING
 * ============================================================================
 */

/**
 * Format insights for teacher display
 */
function formatInsightsForDisplay(insights) {
  let output = '';

  output += '╔══════════════════════════════════════════════════════════════╗\n';
  output += '║           KAMS SCIENCE WEEKLY INSIGHTS DASHBOARD             ║\n';
  output += '╚══════════════════════════════════════════════════════════════╝\n\n';

  output += `Generated: ${new Date(insights.generated).toLocaleString()}\n`;
  output += `Period: Cycle ${insights.cycle}, Week ${insights.week}\n`;
  output += `Data Quality: ${insights.dataQuality?.overall || 'Unknown'}\n\n`;

  // Celebrations first (good news!)
  if (insights.celebrations && insights.celebrations.length > 0) {
    output += '🎉 CELEBRATIONS\n';
    output += '─'.repeat(60) + '\n';
    insights.celebrations.forEach(c => {
      output += `  Grade ${c.grade}: ${c.message}\n`;
    });
    output += '\n';
  }

  // Priority Actions
  if (insights.prioritizedActions && insights.prioritizedActions.length > 0) {
    output += '📋 PRIORITY ACTIONS\n';
    output += '─'.repeat(60) + '\n';
    insights.prioritizedActions.slice(0, 5).forEach((action, idx) => {
      const priorityLabel = action.priority === 0 ? '🔴' :
                           action.priority === 1 ? '🟠' : '🟡';
      output += `${idx + 1}. ${priorityLabel} [G${action.grade}] ${action.message}\n`;
      output += `   → ${action.action}\n\n`;
    });
  }

  // Grade Summaries
  Object.entries(insights.grades || {}).forEach(([gradeKey, gradeData]) => {
    const grade = gradeKey.replace('grade', '');
    output += `\n📊 GRADE ${grade} SUMMARY\n`;
    output += '─'.repeat(60) + '\n';

    // MTSS
    if (gradeData.mtss?.available) {
      const mtss = gradeData.mtss;
      output += `  MTSS: ${mtss.percentages.tier1}% Tier 1 | `;
      output += `${mtss.percentages.tier2}% Tier 2 | `;
      output += `${mtss.percentages.tier3}% Tier 3`;
      if (mtss.trend !== 'stable') {
        output += ` (${mtss.trend})`;
      }
      output += '\n';
    }

    // Misconceptions
    if (gradeData.misconceptions?.topMisconceptions?.length > 0) {
      output += `  Top Misconception: "${gradeData.misconceptions.topMisconceptions[0].description}" `;
      output += `(${gradeData.misconceptions.topMisconceptions[0].frequency}%)\n`;
    }

    // Spiral
    if (gradeData.spiral?.currentEffectiveness) {
      output += `  Spiral Effectiveness: ${gradeData.spiral.currentEffectiveness}%`;
      if (gradeData.spiral.trend !== 'stable') {
        output += ` (${gradeData.spiral.trend})`;
      }
      output += '\n';
    }

    // Interventions
    if (gradeData.interventions?.available) {
      const int = gradeData.interventions;
      output += `  Intervention Groups: ${int.tier2GroupCount} Tier 2 | ${int.tier3GroupCount} Tier 3\n`;
    }
  });

  // Cross-grade patterns
  if (insights.crossGradePatterns && insights.crossGradePatterns.length > 0) {
    output += '\n⚠️ CROSS-GRADE PATTERNS\n';
    output += '─'.repeat(60) + '\n';
    insights.crossGradePatterns.forEach(pattern => {
      output += `  ${pattern.message}\n`;
      output += `  → ${pattern.suggestion}\n\n`;
    });
  }

  output += '\n' + '═'.repeat(60) + '\n';
  output += 'End of Weekly Insights Report\n';

  return output;
}

/**
 * Generate and format weekly summary email
 */
function generateWeeklySummaryEmail(cycle, week) {
  const insights = loadInsights(cycle, week);

  if (!insights) {
    return {
      subject: `[KAMS Science] Weekly Summary - Cycle ${cycle} Week ${week}`,
      body: 'No insights data available for this week. Please run the daily orchestration first.'
    };
  }

  const subject = `[KAMS Science] Weekly Summary - Cycle ${cycle} Week ${week}`;
  const body = formatInsightsForDisplay(insights);

  return { subject, body };
}
