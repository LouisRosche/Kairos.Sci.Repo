/**
 * KAMS Science Curriculum - Seating Data Bridge
 * Connects seating analyzer with performance data pipeline
 *
 * @fileoverview Bridges seating data with existing aggregation system
 * @version 1.0.0
 * @author KAMS Science Team
 *
 * This module:
 * 1. Stores student roster with name-to-email mapping
 * 2. Bridges performance data for seating analysis
 * 3. Orchestrates weekly seating-performance correlation
 */

/**
 * ============================================================================
 * STUDENT ROSTER MANAGEMENT
 * ============================================================================
 * Maps student display names (from sign-in cards) to email addresses
 * (used in performance data)
 */

/**
 * Get or initialize student roster for a class period
 * @param {number} grade - Grade level
 * @param {number} period - Class period
 * @returns {Object} Roster keyed by normalized name
 */
function getStudentRoster(grade, period) {
  const key = `roster-g${grade}-p${period}`;
  const stored = PropertiesService.getScriptProperties().getProperty(key);

  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      Logger.log(`Failed to parse roster: ${e.message}`);
    }
  }

  return {};
}

/**
 * Save student roster
 * @param {number} grade - Grade level
 * @param {number} period - Class period
 * @param {Object} roster - Roster object
 */
function saveStudentRoster(grade, period, roster) {
  const key = `roster-g${grade}-p${period}`;
  PropertiesService.getScriptProperties().setProperty(key, JSON.stringify(roster));
  Logger.log(`Saved roster for G${grade} P${period}: ${Object.keys(roster).length} students`);
}

/**
 * Add or update a student in the roster
 * @param {number} grade - Grade level
 * @param {number} period - Class period
 * @param {string} displayName - Name as written on sign-in cards (e.g., "Emma S.")
 * @param {string} email - Student email address
 * @param {Object} metadata - Optional: tier, seatPreference, notes
 */
function addStudentToRoster(grade, period, displayName, email, metadata = {}) {
  const roster = getStudentRoster(grade, period);
  const normalizedName = normalizeNameForRoster(displayName);

  roster[normalizedName] = {
    displayName: displayName,
    email: email.toLowerCase().trim(),
    ...metadata,
    addedAt: new Date().toISOString()
  };

  saveStudentRoster(grade, period, roster);
  return roster[normalizedName];
}

/**
 * Bulk import roster from array
 * @param {number} grade - Grade level
 * @param {number} period - Class period
 * @param {Array} students - Array of {name, email, tier?} objects
 */
function importRoster(grade, period, students) {
  const roster = getStudentRoster(grade, period);

  students.forEach(student => {
    const normalizedName = normalizeNameForRoster(student.name);
    roster[normalizedName] = {
      displayName: student.name,
      email: student.email.toLowerCase().trim(),
      tier: student.tier || null,
      addedAt: new Date().toISOString()
    };
  });

  saveStudentRoster(grade, period, roster);
  Logger.log(`Imported ${students.length} students to G${grade} P${period}`);
  return roster;
}

// Note: normalizeStudentName() is available from shared/DataUtils.gs
// normalizeNameForRoster() is functionally equivalent, kept for API compatibility.

/**
 * Normalize a name for consistent matching
 * Handles variations like "Emma S.", "Emma Smith", "emma s"
 * @param {string} name - Raw name input
 * @returns {string} Normalized name key
 * @see DataUtils.normalizeStudentName() - equivalent function
 */
function normalizeNameForRoster(name) {
  // Delegate to shared normalizeStudentName if available
  if (typeof normalizeStudentName === 'function') {
    return normalizeStudentName(name);
  }

  if (!name) return '';

  return name
    .trim()
    .toLowerCase()
    // Remove punctuation except spaces
    .replace(/[.,'"!?]/g, '')
    // Normalize whitespace
    .replace(/\s+/g, ' ')
    // Capitalize each word
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

/**
 * Find student email by name (fuzzy matching)
 * @param {string} name - Name from sign-in card
 * @param {number} grade - Grade level
 * @param {number} period - Class period
 * @returns {Object|null} Student record or null
 */
function findStudentByName(name, grade, period) {
  const roster = getStudentRoster(grade, period);
  const normalized = normalizeNameForRoster(name);

  // Exact match
  if (roster[normalized]) {
    return roster[normalized];
  }

  // Try first name + last initial match
  const nameParts = normalized.split(' ');
  if (nameParts.length >= 1) {
    const firstName = nameParts[0];
    const lastInitial = nameParts.length > 1 ? nameParts[nameParts.length - 1][0] : '';

    for (const [key, student] of Object.entries(roster)) {
      const studentParts = key.split(' ');
      const studentFirst = studentParts[0];
      const studentLastInitial = studentParts.length > 1 ?
        studentParts[studentParts.length - 1][0] : '';

      // Match "Emma S" to "Emma Smith"
      if (studentFirst === firstName) {
        if (!lastInitial || studentLastInitial === lastInitial.toUpperCase()) {
          return student;
        }
      }
    }
  }

  Logger.log(`Could not find student: "${name}" in G${grade} P${period}`);
  return null;
}

/**
 * ============================================================================
 * PERFORMANCE DATA BRIDGE
 * ============================================================================
 * Converts aggregated performance data to seating analyzer format
 */

/**
 * Store performance data in seating analyzer format
 * Call this after DataAggregator runs
 *
 * @param {Object} aggregatedData - Output from DataAggregator.aggregateWeekData()
 * @param {number} grade - Grade level
 * @param {number} period - Class period
 */
function storePerformanceForSeating(aggregatedData, grade, period) {
  const performanceData = loadPerformanceDataForSeating(grade, period) || {};

  // Get MTSS report from aggregated data
  const mtssReport = aggregatedData.mtss;
  const cycle = aggregatedData.cycle;
  const week = aggregatedData.week;
  const weekKey = `c${cycle}w${week}`;

  // Get roster for name mapping
  const roster = getStudentRoster(grade, period);
  const emailToName = {};
  Object.entries(roster).forEach(([name, data]) => {
    emailToName[data.email] = name;
  });

  // Process all tiers
  const allStudents = [
    ...mtssReport.tier1Students,
    ...mtssReport.tier2Students,
    ...mtssReport.tier3Students
  ];

  allStudents.forEach(student => {
    // Try to find display name from roster
    let displayName = emailToName[student.email];

    if (!displayName) {
      // Fallback: generate name from email
      const emailParts = student.email.split('@')[0].split('.');
      displayName = emailParts
        .map(p => p.charAt(0).toUpperCase() + p.slice(1))
        .join(' ');
    }

    if (!performanceData[displayName]) {
      performanceData[displayName] = {
        email: student.email,
        weeklyScores: {},
        currentTier: student.tier
      };
    }

    // Store weekly data
    performanceData[displayName].weeklyScores[weekKey] = {
      average: student.overallScore,
      forms: student.formScores || {},
      tier: student.tier,
      struggles: student.struggles || []
    };

    // Update current tier
    performanceData[displayName].currentTier = student.tier;
  });

  // Save
  const key = `seating-perf-g${grade}-p${period}`;
  PropertiesService.getScriptProperties().setProperty(key, JSON.stringify(performanceData));

  Logger.log(`Stored performance data for seating: G${grade} P${period}, ${allStudents.length} students, week ${weekKey}`);
  return performanceData;
}

/**
 * Load performance data in seating analyzer format
 * This is called by SeatingAnalyzer.loadPerformanceData()
 *
 * @param {number} grade - Grade level
 * @param {number} period - Class period
 * @returns {Object} Performance data keyed by student name
 */
function loadPerformanceDataForSeating(grade, period) {
  const key = `seating-perf-g${grade}-p${period}`;
  const stored = PropertiesService.getScriptProperties().getProperty(key);

  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      Logger.log(`Failed to parse performance data: ${e.message}`);
    }
  }

  return {};
}

/**
 * ============================================================================
 * WEEKLY ORCHESTRATION
 * ============================================================================
 * Runs the complete seating analysis pipeline
 */

/**
 * Run weekly seating analysis after data is collected
 * Call this after processing sign-in cards and aggregating performance
 *
 * @param {number} grade - Grade level
 * @param {number} period - Class period
 * @param {number} cycle - Current cycle
 * @param {number} week - Current week
 * @returns {Object} Analysis results
 */
function runWeeklySeatingAnalysis(grade, period, cycle, week) {
  const results = {
    timestamp: new Date().toISOString(),
    grade,
    period,
    cycle,
    week,
    steps: [],
    analysis: null,
    recommendations: []
  };

  // Step 1: Check for seating data
  results.steps.push('Checking seating data...');
  const seatingHistory = loadSeatingHistoryForBridge(grade, period);

  if (seatingHistory.length === 0) {
    results.status = 'NO_SEATING_DATA';
    results.message = 'No seating sign-in data found. Please input sign-in cards first.';
    return results;
  }

  results.steps.push(`Found ${seatingHistory.length} weeks of seating data`);

  // Step 2: Check for performance data
  results.steps.push('Checking performance data...');
  const performanceData = loadPerformanceDataForSeating(grade, period);
  const studentCount = Object.keys(performanceData).length;

  if (studentCount === 0) {
    results.status = 'NO_PERFORMANCE_DATA';
    results.message = 'No performance data found. Run data aggregation first.';
    return results;
  }

  results.steps.push(`Found performance data for ${studentCount} students`);

  // Step 3: Check minimum data threshold
  const MIN_WEEKS = 3;
  if (seatingHistory.length < MIN_WEEKS) {
    results.status = 'INSUFFICIENT_DATA';
    results.message = `Need ${MIN_WEEKS} weeks of seating data. Have ${seatingHistory.length}.`;
    results.steps.push(`Waiting for more data (${MIN_WEEKS - seatingHistory.length} more weeks needed)`);
    return results;
  }

  // Step 4: Run correlation analysis
  results.steps.push('Running correlation analysis...');

  try {
    // Call the main seating analyzer
    results.analysis = analyzeSeatingCorrelationsWithData(
      seatingHistory,
      performanceData,
      grade,
      period
    );

    results.steps.push(`Found ${results.analysis.catalystPairs?.length || 0} catalyst pairs`);
    results.steps.push(`Found ${results.analysis.distractionVectors?.length || 0} distraction vectors`);

    // Step 5: Generate recommendations
    results.recommendations = results.analysis.recommendations || [];
    results.status = 'SUCCESS';
    results.message = 'Analysis complete. See recommendations.';

  } catch (e) {
    results.status = 'ANALYSIS_ERROR';
    results.message = `Analysis failed: ${e.message}`;
    Logger.log(`Seating analysis error: ${e.message}`);
  }

  // Save results
  const outputKey = `seating-analysis-g${grade}-p${period}-c${cycle}w${week}`;
  PropertiesService.getScriptProperties().setProperty(outputKey, JSON.stringify(results));

  return results;
}

/**
 * Load seating history (wrapper for bridge compatibility)
 */
function loadSeatingHistoryForBridge(grade, period) {
  // Use the function from SeatingAnalyzer.gs
  const scriptProperties = PropertiesService.getScriptProperties();
  const allKeys = scriptProperties.getKeys();
  const prefix = `seating-g${grade}-p${period}`;

  const history = [];
  allKeys.filter(k => k.startsWith(prefix) && !k.includes('perf') && !k.includes('analysis')).forEach(key => {
    try {
      const data = JSON.parse(scriptProperties.getProperty(key));
      if (data && data.dailyAttendance) {
        history.push(data);
      }
    } catch (e) {
      Logger.log(`Failed to parse seating data ${key}: ${e.message}`);
    }
  });

  // Sort by cycle/week
  history.sort((a, b) => {
    if (a.cycle !== b.cycle) return a.cycle - b.cycle;
    return a.week - b.week;
  });

  return history;
}

/**
 * Run correlation analysis with provided data
 * (Extracted logic from SeatingAnalyzer for bridge compatibility)
 */
function analyzeSeatingCorrelationsWithData(seatingHistory, performanceData, grade, period) {
  // Build adjacency history
  const adjacencyHistory = {};

  seatingHistory.forEach(weekData => {
    const { cycle, week } = weekData;

    ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].forEach(day => {
      if (!weekData.dailyAttendance || !weekData.dailyAttendance[day]) return;

      const attendance = weekData.dailyAttendance[day];
      const presentStudents = Object.entries(attendance);

      for (let i = 0; i < presentStudents.length; i++) {
        for (let j = i + 1; j < presentStudents.length; j++) {
          const [studentA, seatA] = presentStudents[i];
          const [studentB, seatB] = presentStudents[j];

          const distance = Math.abs(seatA - seatB);
          const isAdjacent = distance <= 2;

          const pairKey = [studentA, studentB].sort().join('|');

          if (!adjacencyHistory[pairKey]) {
            adjacencyHistory[pairKey] = {
              students: [studentA, studentB].sort(),
              adjacentDays: [],
              nonAdjacentDays: []
            };
          }

          const dayKey = `c${cycle}w${week}-${day}`;
          if (isAdjacent) {
            adjacencyHistory[pairKey].adjacentDays.push({ day: dayKey, seats: [seatA, seatB], distance });
          } else {
            adjacencyHistory[pairKey].nonAdjacentDays.push({ day: dayKey, seats: [seatA, seatB], distance });
          }
        }
      }
    });
  });

  // Analyze pairs
  const catalystPairs = [];
  const distractionVectors = [];
  const allPairs = [];

  Object.entries(adjacencyHistory).forEach(([pairKey, pairHistory]) => {
    const [studentA, studentB] = pairHistory.students;

    if (pairHistory.adjacentDays.length < 3 || pairHistory.nonAdjacentDays.length < 3) {
      return; // Not enough variance
    }

    const perfA = performanceData[studentA];
    const perfB = performanceData[studentB];

    if (!perfA || !perfB) return;

    // Calculate performance difference when adjacent vs not
    const adjacentScoresA = getScoresForDaysBridge(perfA, pairHistory.adjacentDays.map(d => d.day));
    const adjacentScoresB = getScoresForDaysBridge(perfB, pairHistory.adjacentDays.map(d => d.day));
    const nonAdjacentScoresA = getScoresForDaysBridge(perfA, pairHistory.nonAdjacentDays.map(d => d.day));
    const nonAdjacentScoresB = getScoresForDaysBridge(perfB, pairHistory.nonAdjacentDays.map(d => d.day));

    if (adjacentScoresA.length === 0 || nonAdjacentScoresA.length === 0) return;

    const avgAdjacentA = average(adjacentScoresA);
    const avgNonAdjacentA = average(nonAdjacentScoresA);
    const avgAdjacentB = average(adjacentScoresB);
    const avgNonAdjacentB = average(nonAdjacentScoresB);

    const effectA = avgAdjacentA - avgNonAdjacentA;
    const effectB = avgAdjacentB - avgNonAdjacentB;
    const combinedEffect = (effectA + effectB) / 2;

    const correlation = Math.max(-1, Math.min(1, combinedEffect / 20));

    const pair = {
      students: [studentA, studentB],
      adjacentDays: pairHistory.adjacentDays.length,
      nonAdjacentDays: pairHistory.nonAdjacentDays.length,
      combinedEffect,
      correlation,
      confidence: calculateConfidenceBridge(pairHistory.adjacentDays.length, pairHistory.nonAdjacentDays.length)
    };

    allPairs.push(pair);

    if (correlation >= 0.5) {
      catalystPairs.push(pair);
    } else if (correlation <= -0.4) {
      distractionVectors.push(pair);
    }
  });

  // Sort by impact
  catalystPairs.sort((a, b) => b.correlation - a.correlation);
  distractionVectors.sort((a, b) => a.correlation - b.correlation);

  // Generate recommendations
  const recommendations = [];

  catalystPairs.forEach(pair => {
    if (pair.confidence !== 'LOW') {
      recommendations.push({
        type: 'KEEP_TOGETHER',
        priority: pair.correlation >= 0.7 ? 'HIGH' : 'MEDIUM',
        students: pair.students,
        reason: `${pair.students[0]} and ${pair.students[1]} both perform ${Math.round(pair.combinedEffect)}% better when seated near each other`,
        effect: pair.combinedEffect,
        confidence: pair.confidence
      });
    }
  });

  distractionVectors.forEach(pair => {
    if (pair.confidence !== 'LOW') {
      recommendations.push({
        type: 'SEPARATE',
        priority: pair.correlation <= -0.6 ? 'HIGH' : 'MEDIUM',
        students: pair.students,
        reason: `${pair.students[0]} and ${pair.students[1]} both perform ${Math.abs(Math.round(pair.combinedEffect))}% worse when seated near each other`,
        effect: pair.combinedEffect,
        confidence: pair.confidence
      });
    }
  });

  recommendations.sort((a, b) => {
    const priorityOrder = { HIGH: 0, MEDIUM: 1, LOW: 2 };
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return Math.abs(b.effect) - Math.abs(a.effect);
  });

  return {
    generated: new Date().toISOString(),
    grade,
    period,
    weeksAnalyzed: seatingHistory.length,
    totalPairsAnalyzed: allPairs.length,
    catalystPairs,
    distractionVectors,
    recommendations
  };
}

function getScoresForDaysBridge(studentPerf, days) {
  const scores = [];

  days.forEach(dayKey => {
    const match = dayKey.match(/c(\d+)w(\d+)/);
    if (!match) return;

    const weekKey = `c${match[1]}w${match[2]}`;

    if (studentPerf.weeklyScores && studentPerf.weeklyScores[weekKey]) {
      scores.push(studentPerf.weeklyScores[weekKey].average || 0);
    }
  });

  return scores;
}

// Note: average() is now available from shared/DataUtils.gs
// This local version delegates to the shared one when deployed together.
function average_Bridge(arr) {
  if (typeof average === 'function' && average !== average_Bridge) {
    return average(arr);
  }
  if (!arr || arr.length === 0) return 0;
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

function calculateConfidenceBridge(adjacentDays, nonAdjacentDays) {
  const total = adjacentDays + nonAdjacentDays;
  const balance = Math.min(adjacentDays, nonAdjacentDays) / Math.max(adjacentDays, nonAdjacentDays);

  if (total >= 20 && balance >= 0.5) return 'HIGH';
  if (total >= 10 && balance >= 0.3) return 'MEDIUM';
  return 'LOW';
}

/**
 * ============================================================================
 * UTILITY FUNCTIONS
 * ============================================================================
 */

/**
 * Get summary of current data state for a class
 * @param {number} grade - Grade level
 * @param {number} period - Class period
 */
function getSeatingDataSummary(grade, period) {
  const roster = getStudentRoster(grade, period);
  const seatingHistory = loadSeatingHistoryForBridge(grade, period);
  const performanceData = loadPerformanceDataForSeating(grade, period);

  return {
    grade,
    period,
    rosterCount: Object.keys(roster).length,
    seatingWeeks: seatingHistory.length,
    performanceStudents: Object.keys(performanceData).length,
    readyForAnalysis: seatingHistory.length >= 3 && Object.keys(performanceData).length > 0,
    lastSeatingWeek: seatingHistory.length > 0 ?
      `C${seatingHistory[seatingHistory.length - 1].cycle}W${seatingHistory[seatingHistory.length - 1].week}` :
      'None'
  };
}

/**
 * Export all seating data for a class (for backup/debugging)
 */
function exportSeatingData(grade, period) {
  return {
    exportedAt: new Date().toISOString(),
    grade,
    period,
    roster: getStudentRoster(grade, period),
    seatingHistory: loadSeatingHistoryForBridge(grade, period),
    performanceData: loadPerformanceDataForSeating(grade, period),
    latestAnalysis: getLatestAnalysis(grade, period)
  };
}

function getLatestAnalysis(grade, period) {
  const allKeys = PropertiesService.getScriptProperties().getKeys();
  const analysisKeys = allKeys.filter(k => k.startsWith(`seating-analysis-g${grade}-p${period}`));

  if (analysisKeys.length === 0) return null;

  // Sort to get most recent
  analysisKeys.sort().reverse();

  try {
    return JSON.parse(PropertiesService.getScriptProperties().getProperty(analysisKeys[0]));
  } catch (e) {
    return null;
  }
}

/**
 * ============================================================================
 * INTERVENTION INTEGRATION
 * ============================================================================
 * Bridges seating analysis with intervention grouping
 */

/**
 * Get students with tiers for seating optimization
 * This is used by SeatingAnalyzer.generateOptimizedSeating()
 *
 * @param {number} grade - Grade level
 * @param {number} period - Class period
 * @returns {Array} Array of student objects with tier info
 */
function getStudentsWithTiersForSeating(grade, period) {
  const performanceData = loadPerformanceDataForSeating(grade, period);

  return Object.entries(performanceData).map(([name, data]) => ({
    name: name,
    email: data.email,
    tier: data.currentTier || 1,
    averageScore: calculateStudentAverage(data.weeklyScores),
    trend: calculateStudentTrend(data.weeklyScores)
  }));
}

/**
 * Calculate average score from weekly scores object
 * @private
 */
function calculateStudentAverage(weeklyScores) {
  if (!weeklyScores) return 0;
  const scores = Object.values(weeklyScores).map(w => w.average).filter(s => s != null);
  if (scores.length === 0) return 0;
  return scores.reduce((a, b) => a + b, 0) / scores.length;
}

/**
 * Calculate trend from weekly scores object
 * @private
 */
function calculateStudentTrend(weeklyScores) {
  if (!weeklyScores) return 'stable';
  const scores = Object.values(weeklyScores).map(w => w.average).filter(s => s != null);
  if (scores.length < 2) return 'stable';

  const firstHalf = scores.slice(0, Math.floor(scores.length / 2));
  const secondHalf = scores.slice(Math.floor(scores.length / 2));

  const firstAvg = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length;
  const secondAvg = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;

  const diff = secondAvg - firstAvg;
  if (diff > 5) return 'improving';
  if (diff < -5) return 'declining';
  return 'stable';
}

/**
 * Apply peer tutoring pairs as seating constraints
 * Takes intervention grouping output and converts to seating keepTogether constraints
 *
 * @param {Array} peerTutoringPairs - From InterventionGrouping.createPeerPairs()
 * @param {number} grade - Grade level
 * @param {number} period - Class period
 * @returns {Object} Seating constraints
 */
function applyPeerTutoringToSeating(peerTutoringPairs, grade, period) {
  const constraints = {
    keepTogether: [],
    peerTutoringPairs: []
  };

  const roster = getStudentRoster(grade, period);
  const emailToName = {};
  Object.entries(roster).forEach(([name, data]) => {
    emailToName[data.email] = name;
  });

  peerTutoringPairs.forEach(pair => {
    const tutorName = emailToName[pair.tutor.email] || pair.tutor.email;
    const tuteeName = emailToName[pair.tutee.email] || pair.tutee.email;

    constraints.keepTogether.push({
      students: [tutorName, tuteeName],
      reason: 'peer_tutoring',
      priority: 'HIGH',
      focusAreas: pair.focusAreas
    });

    constraints.peerTutoringPairs.push({
      tutor: tutorName,
      tutee: tuteeName,
      focusAreas: pair.focusAreas
    });
  });

  // Store constraints for later retrieval
  const key = `seating-constraints-g${grade}-p${period}`;
  PropertiesService.getScriptProperties().setProperty(key, JSON.stringify(constraints));

  Logger.log(`Applied ${constraints.keepTogether.length} peer tutoring pairs as seating constraints for G${grade} P${period}`);
  return constraints;
}

/**
 * Get seating constraints (peer tutoring pairs + catalyst pairs)
 *
 * @param {number} grade - Grade level
 * @param {number} period - Class period
 * @returns {Object} Combined constraints
 */
function getSeatingConstraints(grade, period) {
  const key = `seating-constraints-g${grade}-p${period}`;
  const stored = PropertiesService.getScriptProperties().getProperty(key);

  let constraints = {
    keepTogether: [],
    keepApart: [],
    peerTutoringPairs: []
  };

  if (stored) {
    try {
      constraints = JSON.parse(stored);
    } catch (e) {
      Logger.log(`Failed to parse constraints: ${e.message}`);
    }
  }

  // Add catalyst pairs and distraction vectors from latest analysis
  const analysis = getLatestAnalysis(grade, period);
  if (analysis && analysis.analysis) {
    // Add catalyst pairs as keepTogether
    (analysis.analysis.catalystPairs || []).forEach(pair => {
      if (pair.confidence !== 'LOW') {
        constraints.keepTogether.push({
          students: pair.students,
          reason: 'catalyst_pair',
          priority: pair.correlation >= 0.7 ? 'HIGH' : 'MEDIUM',
          correlation: pair.correlation
        });
      }
    });

    // Add distraction vectors as keepApart
    (analysis.analysis.distractionVectors || []).forEach(pair => {
      if (pair.confidence !== 'LOW') {
        constraints.keepApart.push({
          students: pair.students,
          reason: 'distraction_vector',
          priority: pair.correlation <= -0.6 ? 'HIGH' : 'MEDIUM',
          correlation: pair.correlation
        });
      }
    });
  }

  return constraints;
}

/**
 * Generate optimized seating with all constraints applied
 *
 * @param {number} grade - Grade level
 * @param {number} period - Class period
 * @returns {Object} Optimized seating assignment
 */
function generateOptimizedSeatingWithConstraints(grade, period) {
  const students = getStudentsWithTiersForSeating(grade, period);
  const constraints = getSeatingConstraints(grade, period);

  const result = {
    generated: new Date().toISOString(),
    grade,
    period,
    studentCount: students.length,
    constraintsApplied: {
      keepTogether: constraints.keepTogether.length,
      keepApart: constraints.keepApart.length,
      peerTutoringPairs: constraints.peerTutoringPairs.length
    },
    assignments: {},
    reasoning: [],
    score: 0
  };

  // Build constraint maps
  const keepTogetherMap = new Map();
  const keepApartMap = new Map();

  constraints.keepTogether.forEach(constraint => {
    const key = constraint.students.sort().join('|');
    keepTogetherMap.set(key, constraint.priority === 'HIGH' ? 2.0 : 1.5);
  });

  constraints.keepApart.forEach(constraint => {
    const key = constraint.students.sort().join('|');
    keepApartMap.set(key, constraint.priority === 'HIGH' ? 3.0 : 2.0);
  });

  // Define seat zones (same as in SeatingAnalyzer)
  const seatZones = {
    front: [1, 2, 3, 4, 5, 6],
    sideLeft: [22, 23, 24],
    sideRight: [7, 8, 9],
    middleLeft: [20, 21],
    middleRight: [10, 11],
    backCorners: [12, 19],
    back: [13, 14, 15, 16, 17, 18]
  };

  // Sort students by tier (Tier 3 first for priority placement)
  const tier3 = students.filter(s => s.tier === 3);
  const tier2 = students.filter(s => s.tier === 2);
  const tier1 = students.filter(s => s.tier === 1);

  const availableSeats = new Set([...Array(24).keys()].map(i => i + 1));

  // Phase 1: Place Tier 3 students in front
  result.reasoning.push('Phase 1: Placing Tier 3 students near teacher (front seats)');
  tier3.forEach(student => {
    const bestSeat = findBestSeatWithConstraints(
      student, seatZones.front, availableSeats, result.assignments,
      keepTogetherMap, keepApartMap, students
    );
    if (bestSeat) {
      result.assignments[bestSeat] = student;
      availableSeats.delete(bestSeat);
      result.reasoning.push(`  ${student.name} -> Seat ${bestSeat} (front for teacher proximity)`);
    }
  });

  // Phase 2: Place Tier 2 students near peer tutors
  result.reasoning.push('Phase 2: Placing Tier 2 students near peer tutors');
  tier2.forEach(student => {
    // Check if this student has a peer tutor assigned
    const peerTutorConstraint = constraints.peerTutoringPairs.find(
      p => p.tutee === student.name
    );

    let preferredZone = [...seatZones.sideLeft, ...seatZones.sideRight,
                         ...seatZones.middleLeft, ...seatZones.middleRight];

    if (peerTutorConstraint) {
      // Find tutor's seat and prefer adjacent seats
      const tutorSeat = Object.entries(result.assignments).find(
        ([seat, s]) => s.name === peerTutorConstraint.tutor
      )?.[0];

      if (tutorSeat) {
        preferredZone = getAdjacentSeatsBridge(parseInt(tutorSeat));
        result.reasoning.push(`  (Prioritizing seats near peer tutor ${peerTutorConstraint.tutor})`);
      }
    }

    const bestSeat = findBestSeatWithConstraints(
      student, preferredZone, availableSeats, result.assignments,
      keepTogetherMap, keepApartMap, students
    );
    if (bestSeat) {
      result.assignments[bestSeat] = student;
      availableSeats.delete(bestSeat);
      result.reasoning.push(`  ${student.name} -> Seat ${bestSeat}`);
    }
  });

  // Phase 3: Place Tier 1 students
  result.reasoning.push('Phase 3: Placing Tier 1 students');
  tier1.forEach(student => {
    if (Object.values(result.assignments).some(s => s.name === student.name)) {
      return; // Already placed
    }

    const remainingSeats = Array.from(availableSeats);
    const bestSeat = findBestSeatWithConstraints(
      student, remainingSeats, availableSeats, result.assignments,
      keepTogetherMap, keepApartMap, students
    );
    if (bestSeat) {
      result.assignments[bestSeat] = student;
      availableSeats.delete(bestSeat);
      result.reasoning.push(`  ${student.name} -> Seat ${bestSeat}`);
    }
  });

  // Calculate final score
  result.score = calculateArrangementScoreBridge(
    result.assignments, keepTogetherMap, keepApartMap
  );
  result.reasoning.push(`Final arrangement score: ${result.score.toFixed(2)}`);

  // Save result
  const outputKey = `seating-optimized-g${grade}-p${period}`;
  PropertiesService.getScriptProperties().setProperty(outputKey, JSON.stringify(result));

  return result;
}

/**
 * Find best seat considering all constraints
 * @private
 */
function findBestSeatWithConstraints(student, preferredSeats, availableSeats,
                                     currentAssignments, keepTogetherMap, keepApartMap, allStudents) {
  let bestSeat = null;
  let bestScore = -Infinity;

  const candidateSeats = preferredSeats.filter(s => availableSeats.has(s));

  candidateSeats.forEach(seat => {
    let score = 0;
    const adjacent = getAdjacentSeatsBridge(seat);

    adjacent.forEach(adjSeat => {
      const neighbor = currentAssignments[adjSeat];
      if (!neighbor) return;

      const pairKey = [student.name, neighbor.name].sort().join('|');

      // Bonus for keepTogether constraints
      if (keepTogetherMap.has(pairKey)) {
        score += keepTogetherMap.get(pairKey) * 2.0;
      }

      // Penalty for keepApart constraints
      if (keepApartMap.has(pairKey)) {
        score -= keepApartMap.get(pairKey) * 3.0;
      }

      // Peer tutoring bonus (Tier 1 near Tier 2/3)
      if ((student.tier === 1 && neighbor.tier >= 2) ||
          (student.tier >= 2 && neighbor.tier === 1)) {
        score += 1.5;
      }

      // Tier 3 clustering penalty
      if (student.tier === 3 && neighbor.tier === 3) {
        score -= 2.0;
      }
    });

    if (score > bestScore) {
      bestScore = score;
      bestSeat = seat;
    }
  });

  // If no scored seat found, take first available
  if (!bestSeat && candidateSeats.length > 0) {
    bestSeat = candidateSeats[0];
  }

  return bestSeat;
}

/**
 * Get adjacent seats (same logic as SeatingAnalyzer)
 * @private
 */
function getAdjacentSeatsBridge(seatNum) {
  const adjacent = [];

  // Same wall neighbors
  if (seatNum > 1 && Math.ceil((seatNum - 1) / 6) === Math.ceil(seatNum / 6)) {
    adjacent.push(seatNum - 1);
  }
  if (seatNum < 24 && Math.ceil((seatNum + 1) / 6) === Math.ceil(seatNum / 6)) {
    adjacent.push(seatNum + 1);
  }

  // Corner connections
  const corners = [
    [6, 7],   // NE corner
    [12, 13], // SE corner
    [18, 19], // SW corner
    [24, 1]   // NW corner
  ];

  corners.forEach(([a, b]) => {
    if (seatNum === a) adjacent.push(b);
    if (seatNum === b) adjacent.push(a);
  });

  return adjacent;
}

/**
 * Calculate arrangement score
 * @private
 */
function calculateArrangementScoreBridge(assignments, keepTogetherMap, keepApartMap) {
  let score = 0;
  const seats = Object.keys(assignments).map(Number);

  seats.forEach(seat => {
    const student = assignments[seat];
    const adjacent = getAdjacentSeatsBridge(seat);

    adjacent.forEach(adjSeat => {
      if (!assignments[adjSeat]) return;

      const neighbor = assignments[adjSeat];
      const pairKey = [student.name, neighbor.name].sort().join('|');

      if (keepTogetherMap.has(pairKey)) {
        score += keepTogetherMap.get(pairKey);
      }
      if (keepApartMap.has(pairKey)) {
        score -= keepApartMap.get(pairKey);
      }
    });
  });

  return score;
}
