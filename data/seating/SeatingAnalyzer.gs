/**
 * KAMS Science Curriculum - Seating Correlation Analyzer
 * Analyzes seating patterns and correlates with student performance
 *
 * @fileoverview Processes seat sign-in data and identifies optimal social arrangements
 * @version 1.0.0
 * @author KAMS Science Team
 *
 * ============================================================================
 * THEORY OF OPERATION
 * ============================================================================
 *
 * Middle school social dynamics are complex. This system:
 *
 * 1. COLLECTS seating data (who sat where, when)
 * 2. CORRELATES with performance data (form scores)
 * 3. IDENTIFIES patterns:
 *    - "Catalyst pairs" - students who elevate each other
 *    - "Distraction vectors" - proximity that hurts productivity
 *    - "Silent supporters" - unexpected positive influences
 * 4. RECOMMENDS optimal seating arrangements
 *
 * Over time, the algorithm learns what works for YOUR specific students.
 */

/**
 * Configuration for seating analysis
 */
const SEATING_CONFIG = {
  // Minimum weeks of data needed for reliable correlations
  MIN_WEEKS_FOR_ANALYSIS: 3,

  // Correlation thresholds
  STRONG_POSITIVE_CORRELATION: 0.5,  // Catalyst pair threshold
  STRONG_NEGATIVE_CORRELATION: -0.4, // Distraction vector threshold

  // Performance change thresholds (percentage points)
  SIGNIFICANT_IMPROVEMENT: 10,
  SIGNIFICANT_DECLINE: -10,

  // Adjacency definition (seats within this distance considered "near")
  ADJACENCY_DISTANCE: 2,

  // Weight factors for optimization
  WEIGHTS: {
    peerTutoring: 1.5,      // Tier 1 near Tier 2 bonus
    tierClusteringPenalty: 2.0, // Penalty for Tier 3 clustering
    catalystBonus: 2.0,     // Bonus for known catalyst pairs
    distractionPenalty: 3.0 // Penalty for known distraction vectors
  }
};

/**
 * Main entry point: Process weekly seating data
 * Call this after scanning and inputting sign-in cards
 *
 * @param {Object} signInData - Parsed sign-in card data
 * @param {number} grade - Grade level
 * @param {number} cycle - Cycle number
 * @param {number} week - Week number
 * @param {number} period - Class period
 * @returns {Object} Processing results
 */
function processWeeklySeating(signInData, grade, cycle, week, period) {
  const results = {
    processed: new Date().toISOString(),
    grade,
    cycle,
    week,
    period,
    dailyAttendance: {},
    seatOccupancy: {},
    movements: [],
    warnings: []
  };

  // Process each seat's sign-in data
  Object.entries(signInData.seats).forEach(([seatId, seatData]) => {
    const seatNum = parseInt(seatId);

    // Track who sat in this seat each day
    ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].forEach(day => {
      const signIn = seatData[day];
      if (signIn && signIn.studentName) {
        // Normalize student name
        const normalizedName = normalizeStudentName(signIn.studentName);

        // Record attendance
        if (!results.dailyAttendance[day]) {
          results.dailyAttendance[day] = {};
        }
        results.dailyAttendance[day][normalizedName] = seatNum;

        // Record seat occupancy
        if (!results.seatOccupancy[seatNum]) {
          results.seatOccupancy[seatNum] = {};
        }
        results.seatOccupancy[seatNum][day] = normalizedName;

        // Track movements
        if (signIn.movedFrom) {
          results.movements.push({
            student: normalizedName,
            day,
            from: signIn.movedFrom,
            to: seatNum
          });
        }
      }
    });
  });

  // Validate and warn about inconsistencies
  validateSeatingData(results);

  // Store the processed data
  storeSeatingData(results);

  return results;
}

// Note: normalizeStudentName() is now available from shared/DataUtils.gs
// The function below delegates to the shared version when deployed together.

/**
 * Normalize student name for matching
 * @param {string} name - Raw name from sign-in
 * @returns {string} Normalized name
 * @deprecated Use DataUtils.normalizeStudentName() directly
 */
function normalizeStudentName_Seating(name) {
  // Delegate to shared DataUtils if available
  if (typeof normalizeStudentName === 'function' && normalizeStudentName !== normalizeStudentName_Seating) {
    return normalizeStudentName(name);
  }

  if (!name) return '';

  // Trim, lowercase, handle common variations
  return name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')  // Normalize spaces
    .replace(/[^\w\s]/g, '') // Remove punctuation
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Validate seating data for inconsistencies
 * @param {Object} results - Processing results to validate
 */
function validateSeatingData(results) {
  // Check for students in multiple seats same day
  Object.entries(results.dailyAttendance).forEach(([day, attendance]) => {
    const studentSeats = {};
    Object.entries(attendance).forEach(([student, seat]) => {
      if (studentSeats[student]) {
        results.warnings.push({
          type: 'DUPLICATE_SIGNIN',
          day,
          student,
          seats: [studentSeats[student], seat],
          message: `${student} signed in at both seat ${studentSeats[student]} and ${seat} on ${day}`
        });
      }
      studentSeats[student] = seat;
    });
  });

  // Check for empty seats that should be occupied
  const totalSeats = Object.keys(results.seatOccupancy).length;
  Object.entries(results.dailyAttendance).forEach(([day, attendance]) => {
    const occupiedCount = Object.keys(attendance).length;
    if (occupiedCount < totalSeats * 0.7) {
      results.warnings.push({
        type: 'LOW_ATTENDANCE',
        day,
        occupied: occupiedCount,
        total: totalSeats,
        message: `Only ${occupiedCount}/${totalSeats} seats occupied on ${day}`
      });
    }
  });
}

/**
 * ============================================================================
 * CORRELATION ANALYSIS ENGINE
 * ============================================================================
 */

/**
 * Analyze correlations between seating proximity and performance
 * This is the heart of the system - finding who works well near whom
 *
 * @param {number} grade - Grade level
 * @param {number} period - Class period
 * @returns {Object} Correlation analysis results
 */
function analyzeSeatingCorrelations(grade, period) {
  const analysis = {
    generated: new Date().toISOString(),
    grade,
    period,
    weeksAnalyzed: 0,
    studentPairs: [],
    catalystPairs: [],
    distractionVectors: [],
    neutralPairs: [],
    recommendations: []
  };

  // Load all historical seating data
  const seatingHistory = loadSeatingHistory(grade, period);
  if (seatingHistory.length < SEATING_CONFIG.MIN_WEEKS_FOR_ANALYSIS) {
    analysis.error = `Need ${SEATING_CONFIG.MIN_WEEKS_FOR_ANALYSIS} weeks of data. Have ${seatingHistory.length}.`;
    return analysis;
  }

  analysis.weeksAnalyzed = seatingHistory.length;

  // Load performance data for the same period
  const performanceData = loadPerformanceData(grade, period);

  // Build adjacency history: who sat near whom, when
  const adjacencyHistory = buildAdjacencyHistory(seatingHistory);

  // Get unique students
  const students = getUniqueStudents(seatingHistory);

  // Analyze each pair of students
  for (let i = 0; i < students.length; i++) {
    for (let j = i + 1; j < students.length; j++) {
      const studentA = students[i];
      const studentB = students[j];

      const pairAnalysis = analyzePair(
        studentA,
        studentB,
        adjacencyHistory,
        performanceData
      );

      if (pairAnalysis) {
        analysis.studentPairs.push(pairAnalysis);

        // Categorize the pair
        if (pairAnalysis.correlation >= SEATING_CONFIG.STRONG_POSITIVE_CORRELATION) {
          analysis.catalystPairs.push(pairAnalysis);
        } else if (pairAnalysis.correlation <= SEATING_CONFIG.STRONG_NEGATIVE_CORRELATION) {
          analysis.distractionVectors.push(pairAnalysis);
        } else {
          analysis.neutralPairs.push(pairAnalysis);
        }
      }
    }
  }

  // Sort by impact
  analysis.catalystPairs.sort((a, b) => b.correlation - a.correlation);
  analysis.distractionVectors.sort((a, b) => a.correlation - b.correlation);

  // Generate recommendations
  analysis.recommendations = generateRecommendations(analysis);

  return analysis;
}

/**
 * Build history of which students sat near each other
 * @param {Array} seatingHistory - Array of weekly seating data
 * @returns {Object} Adjacency history by student pair
 */
function buildAdjacencyHistory(seatingHistory) {
  const adjacency = {};

  seatingHistory.forEach(weekData => {
    const { cycle, week } = weekData;

    // For each day
    ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].forEach(day => {
      if (!weekData.dailyAttendance[day]) return;

      const attendance = weekData.dailyAttendance[day];

      // Check each pair of students present that day
      const presentStudents = Object.entries(attendance);

      for (let i = 0; i < presentStudents.length; i++) {
        for (let j = i + 1; j < presentStudents.length; j++) {
          const [studentA, seatA] = presentStudents[i];
          const [studentB, seatB] = presentStudents[j];

          // Are they adjacent?
          const distance = calculateSeatDistance(seatA, seatB);
          const isAdjacent = distance <= SEATING_CONFIG.ADJACENCY_DISTANCE;

          // Create pair key (alphabetically sorted for consistency)
          const pairKey = [studentA, studentB].sort().join('|');

          if (!adjacency[pairKey]) {
            adjacency[pairKey] = {
              students: [studentA, studentB].sort(),
              adjacentDays: [],
              nonAdjacentDays: []
            };
          }

          const dayKey = `c${cycle}w${week}-${day}`;
          if (isAdjacent) {
            adjacency[pairKey].adjacentDays.push({
              day: dayKey,
              seats: [seatA, seatB],
              distance
            });
          } else {
            adjacency[pairKey].nonAdjacentDays.push({
              day: dayKey,
              seats: [seatA, seatB],
              distance
            });
          }
        }
      }
    });
  });

  return adjacency;
}

/**
 * Calculate distance between two seats
 * @param {number} seatA - First seat number
 * @param {number} seatB - Second seat number
 * @returns {number} Distance (seats between)
 */
function calculateSeatDistance(seatA, seatB) {
  // Seat positions (from classroom map - 24 perimeter seats)
  const seatPositions = {
    // North wall: 1-6
    1: { wall: 'north', index: 0 },
    2: { wall: 'north', index: 1 },
    3: { wall: 'north', index: 2 },
    4: { wall: 'north', index: 3 },
    5: { wall: 'north', index: 4 },
    6: { wall: 'north', index: 5 },
    // East wall: 7-12
    7: { wall: 'east', index: 0 },
    8: { wall: 'east', index: 1 },
    9: { wall: 'east', index: 2 },
    10: { wall: 'east', index: 3 },
    11: { wall: 'east', index: 4 },
    12: { wall: 'east', index: 5 },
    // South wall: 13-18
    13: { wall: 'south', index: 0 },
    14: { wall: 'south', index: 1 },
    15: { wall: 'south', index: 2 },
    16: { wall: 'south', index: 3 },
    17: { wall: 'south', index: 4 },
    18: { wall: 'south', index: 5 },
    // West wall: 19-24
    19: { wall: 'west', index: 0 },
    20: { wall: 'west', index: 1 },
    21: { wall: 'west', index: 2 },
    22: { wall: 'west', index: 3 },
    23: { wall: 'west', index: 4 },
    24: { wall: 'west', index: 5 }
  };

  const posA = seatPositions[seatA];
  const posB = seatPositions[seatB];

  if (!posA || !posB) return Infinity;

  // Same wall: simple index difference
  if (posA.wall === posB.wall) {
    return Math.abs(posA.index - posB.index);
  }

  // Different walls: check if corner-adjacent
  const corners = {
    'north-east': { seat1: 6, seat2: 7 },
    'east-south': { seat1: 12, seat2: 13 },
    'south-west': { seat1: 18, seat2: 19 },
    'west-north': { seat1: 24, seat2: 1 }
  };

  // Check corner adjacency
  for (const corner of Object.values(corners)) {
    if ((seatA === corner.seat1 && seatB === corner.seat2) ||
        (seatA === corner.seat2 && seatB === corner.seat1)) {
      return 1; // Corner adjacent
    }
  }

  // Not adjacent walls = far apart
  return Infinity;
}

/**
 * Analyze a specific pair of students
 * @param {string} studentA - First student name
 * @param {string} studentB - Second student name
 * @param {Object} adjacencyHistory - Adjacency history data
 * @param {Object} performanceData - Performance data
 * @returns {Object|null} Pair analysis or null if insufficient data
 */
function analyzePair(studentA, studentB, adjacencyHistory, performanceData) {
  const pairKey = [studentA, studentB].sort().join('|');
  const pairHistory = adjacencyHistory[pairKey];

  if (!pairHistory) return null;

  // Need sufficient data points in both conditions
  const adjacentDays = pairHistory.adjacentDays.length;
  const nonAdjacentDays = pairHistory.nonAdjacentDays.length;

  if (adjacentDays < 3 || nonAdjacentDays < 3) {
    // Not enough variance to analyze
    return null;
  }

  // Calculate average performance when adjacent vs not
  const perfA = performanceData[studentA];
  const perfB = performanceData[studentB];

  if (!perfA || !perfB) return null;

  // Get scores for adjacent days
  const adjacentScoresA = getScoresForDays(perfA, pairHistory.adjacentDays.map(d => d.day));
  const adjacentScoresB = getScoresForDays(perfB, pairHistory.adjacentDays.map(d => d.day));

  // Get scores for non-adjacent days
  const nonAdjacentScoresA = getScoresForDays(perfA, pairHistory.nonAdjacentDays.map(d => d.day));
  const nonAdjacentScoresB = getScoresForDays(perfB, pairHistory.nonAdjacentDays.map(d => d.day));

  // Calculate average performance difference
  const avgAdjacentA = average(adjacentScoresA);
  const avgNonAdjacentA = average(nonAdjacentScoresA);
  const avgAdjacentB = average(adjacentScoresB);
  const avgNonAdjacentB = average(nonAdjacentScoresB);

  // Combined effect: how much better/worse do BOTH students do when near each other?
  const effectA = avgAdjacentA - avgNonAdjacentA;
  const effectB = avgAdjacentB - avgNonAdjacentB;
  const combinedEffect = (effectA + effectB) / 2;

  // Normalize to correlation-like scale (-1 to 1)
  const correlation = Math.max(-1, Math.min(1, combinedEffect / 20));

  return {
    students: [studentA, studentB],
    adjacentDays,
    nonAdjacentDays,
    effectOnA: {
      student: studentA,
      adjacentAvg: avgAdjacentA,
      nonAdjacentAvg: avgNonAdjacentA,
      effect: effectA
    },
    effectOnB: {
      student: studentB,
      adjacentAvg: avgAdjacentB,
      nonAdjacentAvg: avgNonAdjacentB,
      effect: effectB
    },
    combinedEffect,
    correlation,
    classification: classifyRelationship(correlation),
    confidence: calculateConfidence(adjacentDays, nonAdjacentDays)
  };
}

/**
 * Get scores for specific days
 * @param {Object} studentPerf - Student's performance data
 * @param {Array} days - Array of day keys
 * @returns {Array} Scores for those days
 */
function getScoresForDays(studentPerf, days) {
  const scores = [];

  days.forEach(dayKey => {
    // Parse day key (e.g., "c4w2-monday")
    const match = dayKey.match(/c(\d+)w(\d+)-(\w+)/);
    if (!match) return;

    const [, cycle, week, day] = match;
    const weekKey = `c${cycle}w${week}`;

    if (studentPerf.weeklyScores && studentPerf.weeklyScores[weekKey]) {
      // Use the weekly average (or daily if available)
      scores.push(studentPerf.weeklyScores[weekKey].average || 0);
    }
  });

  return scores;
}

// Note: average() is now available from shared/DataUtils.gs
// The function below delegates to the shared version when deployed together.

/**
 * Calculate average of array
 * @param {Array} arr - Numbers to average
 * @returns {number} Average
 * @deprecated Use DataUtils.average() directly
 */
function average_Seating(arr) {
  // Delegate to shared DataUtils if available
  if (typeof average === 'function' && average !== average_Seating) {
    return average(arr);
  }
  if (!arr || arr.length === 0) return 0;
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

/**
 * Classify the relationship based on correlation
 * @param {number} correlation - Correlation value
 * @returns {string} Classification
 */
function classifyRelationship(correlation) {
  if (correlation >= SEATING_CONFIG.STRONG_POSITIVE_CORRELATION) {
    return 'CATALYST_PAIR';
  } else if (correlation <= SEATING_CONFIG.STRONG_NEGATIVE_CORRELATION) {
    return 'DISTRACTION_VECTOR';
  } else if (correlation >= 0.2) {
    return 'MILD_POSITIVE';
  } else if (correlation <= -0.2) {
    return 'MILD_NEGATIVE';
  }
  return 'NEUTRAL';
}

/**
 * Calculate confidence in the analysis
 * @param {number} adjacentDays - Days sitting near
 * @param {number} nonAdjacentDays - Days sitting apart
 * @returns {string} Confidence level
 */
function calculateConfidence(adjacentDays, nonAdjacentDays) {
  const total = adjacentDays + nonAdjacentDays;
  const balance = Math.min(adjacentDays, nonAdjacentDays) / Math.max(adjacentDays, nonAdjacentDays);

  if (total >= 20 && balance >= 0.5) return 'HIGH';
  if (total >= 10 && balance >= 0.3) return 'MEDIUM';
  return 'LOW';
}

/**
 * ============================================================================
 * RECOMMENDATION ENGINE
 * ============================================================================
 */

/**
 * Generate seating recommendations based on analysis
 * @param {Object} analysis - Correlation analysis results
 * @returns {Array} Recommendations
 */
function generateRecommendations(analysis) {
  const recommendations = [];

  // Recommend keeping catalyst pairs together
  analysis.catalystPairs.forEach(pair => {
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

  // Recommend separating distraction vectors
  analysis.distractionVectors.forEach(pair => {
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

  // Sort by priority and effect magnitude
  recommendations.sort((a, b) => {
    const priorityOrder = { HIGH: 0, MEDIUM: 1, LOW: 2 };
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return Math.abs(b.effect) - Math.abs(a.effect);
  });

  return recommendations;
}

/**
 * ============================================================================
 * SEATING OPTIMIZATION ALGORITHM
 * ============================================================================
 */

/**
 * Generate optimized seating arrangement
 * Uses correlation data + MTSS tiers to suggest best arrangement
 *
 * @param {number} grade - Grade level
 * @param {number} period - Class period
 * @param {Array} students - Array of student objects with tier info
 * @returns {Object} Optimized seating assignments
 */
function generateOptimizedSeating(grade, period, students) {
  const result = {
    generated: new Date().toISOString(),
    grade,
    period,
    assignments: {},
    score: 0,
    reasoning: []
  };

  // Load correlation analysis
  const correlations = analyzeSeatingCorrelations(grade, period);

  // Build constraint matrices
  const keepTogether = new Map(); // Student pairs to keep near
  const keepApart = new Map();    // Student pairs to separate

  correlations.catalystPairs.forEach(pair => {
    const key = pair.students.sort().join('|');
    keepTogether.set(key, pair.correlation);
  });

  correlations.distractionVectors.forEach(pair => {
    const key = pair.students.sort().join('|');
    keepApart.set(key, Math.abs(pair.correlation));
  });

  // Define seat zones
  const seatZones = {
    front: [1, 2, 3, 4, 5, 6],           // Near teacher
    sideLeft: [22, 23, 24],               // West wall upper
    sideRight: [7, 8, 9],                 // East wall upper
    middleLeft: [20, 21],                 // West wall middle
    middleRight: [10, 11],                // East wall middle
    backCorners: [12, 19],                // Back corners
    back: [13, 14, 15, 16, 17, 18]        // South wall
  };

  // Sort students by tier (Tier 3 first for priority placement)
  const tier3 = students.filter(s => s.tier === 3);
  const tier2 = students.filter(s => s.tier === 2);
  const tier1 = students.filter(s => s.tier === 1);

  const availableSeats = new Set([...Array(24).keys()].map(i => i + 1));

  // Phase 1: Place Tier 3 students in front
  result.reasoning.push('Phase 1: Placing Tier 3 students near teacher (front seats)');
  tier3.forEach(student => {
    const bestSeat = findBestSeat(student, seatZones.front, availableSeats, result.assignments, keepTogether, keepApart, students);
    if (bestSeat) {
      result.assignments[bestSeat] = student;
      availableSeats.delete(bestSeat);
      result.reasoning.push(`  ${student.name} → Seat ${bestSeat} (front for teacher proximity)`);
    }
  });

  // Phase 2: Place Tier 2 students near their peer tutors
  result.reasoning.push('Phase 2: Placing Tier 2 students near potential peer tutors');
  tier2.forEach(student => {
    // Find potential peer tutor (Tier 1 with positive correlation)
    const potentialTutors = tier1.filter(t1 => {
      const key = [student.name, t1.name].sort().join('|');
      return keepTogether.has(key);
    });

    let preferredZone = [...seatZones.sideLeft, ...seatZones.sideRight, ...seatZones.middleLeft, ...seatZones.middleRight];

    // If there's a catalyst pair, try to sit near them
    if (potentialTutors.length > 0) {
      const tutorSeat = Object.entries(result.assignments).find(([seat, s]) =>
        potentialTutors.some(t => t.name === s.name)
      )?.[0];

      if (tutorSeat) {
        preferredZone = getAdjacentSeats(parseInt(tutorSeat));
      }
    }

    const bestSeat = findBestSeat(student, preferredZone, availableSeats, result.assignments, keepTogether, keepApart, students);
    if (bestSeat) {
      result.assignments[bestSeat] = student;
      availableSeats.delete(bestSeat);
      result.reasoning.push(`  ${student.name} → Seat ${bestSeat}`);
    }
  });

  // Phase 3: Place Tier 1 students in remaining seats
  result.reasoning.push('Phase 3: Placing Tier 1 students');
  tier1.forEach(student => {
    if (Object.values(result.assignments).some(s => s.name === student.name)) {
      return; // Already placed (if they were part of a catalyst pair)
    }

    const remainingSeats = Array.from(availableSeats);
    const bestSeat = findBestSeat(student, remainingSeats, availableSeats, result.assignments, keepTogether, keepApart, students);
    if (bestSeat) {
      result.assignments[bestSeat] = student;
      availableSeats.delete(bestSeat);
      result.reasoning.push(`  ${student.name} → Seat ${bestSeat}`);
    }
  });

  // Calculate final score
  result.score = calculateArrangementScore(result.assignments, keepTogether, keepApart);
  result.reasoning.push(`Final arrangement score: ${result.score.toFixed(2)}`);

  return result;
}

/**
 * Find best seat for a student given constraints
 */
function findBestSeat(student, preferredSeats, availableSeats, currentAssignments, keepTogether, keepApart, allStudents) {
  let bestSeat = null;
  let bestScore = -Infinity;

  const candidateSeats = preferredSeats.filter(s => availableSeats.has(s));

  candidateSeats.forEach(seat => {
    let score = 0;

    // Get adjacent seats
    const adjacent = getAdjacentSeats(seat);

    // Check each adjacent seat
    adjacent.forEach(adjSeat => {
      const neighbor = currentAssignments[adjSeat];
      if (!neighbor) return;

      const pairKey = [student.name, neighbor.name].sort().join('|');

      // Bonus for catalyst pairs
      if (keepTogether.has(pairKey)) {
        score += keepTogether.get(pairKey) * SEATING_CONFIG.WEIGHTS.catalystBonus;
      }

      // Penalty for distraction vectors
      if (keepApart.has(pairKey)) {
        score -= keepApart.get(pairKey) * SEATING_CONFIG.WEIGHTS.distractionPenalty;
      }

      // Peer tutoring bonus (Tier 1 near Tier 2/3)
      if ((student.tier === 1 && neighbor.tier >= 2) ||
          (student.tier >= 2 && neighbor.tier === 1)) {
        score += SEATING_CONFIG.WEIGHTS.peerTutoring;
      }

      // Tier 3 clustering penalty
      if (student.tier === 3 && neighbor.tier === 3) {
        score -= SEATING_CONFIG.WEIGHTS.tierClusteringPenalty;
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
 * Get seats adjacent to a given seat
 */
function getAdjacentSeats(seatNum) {
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
 * Calculate overall score for an arrangement
 */
function calculateArrangementScore(assignments, keepTogether, keepApart) {
  let score = 0;
  const seats = Object.keys(assignments).map(Number);

  seats.forEach(seat => {
    const student = assignments[seat];
    const adjacent = getAdjacentSeats(seat);

    adjacent.forEach(adjSeat => {
      if (!assignments[adjSeat]) return;

      const neighbor = assignments[adjSeat];
      const pairKey = [student.name, neighbor.name].sort().join('|');

      if (keepTogether.has(pairKey)) {
        score += keepTogether.get(pairKey);
      }
      if (keepApart.has(pairKey)) {
        score -= keepApart.get(pairKey);
      }
    });
  });

  return score;
}

/**
 * ============================================================================
 * DATA STORAGE & RETRIEVAL
 * ============================================================================
 */

/**
 * Store seating data
 */
function storeSeatingData(data) {
  const key = `seating-g${data.grade}-p${data.period}-c${data.cycle}w${data.week}`;
  const scriptProperties = PropertiesService.getScriptProperties();
  scriptProperties.setProperty(key, JSON.stringify(data));
  Logger.log(`Stored seating data: ${key}`);
}

/**
 * Load seating history for a grade/period
 */
function loadSeatingHistory(grade, period) {
  const scriptProperties = PropertiesService.getScriptProperties();
  const allKeys = scriptProperties.getKeys();
  const prefix = `seating-g${grade}-p${period}`;

  const history = [];
  allKeys.filter(k => k.startsWith(prefix)).forEach(key => {
    try {
      const data = JSON.parse(scriptProperties.getProperty(key));
      history.push(data);
    } catch (e) {
      Logger.log(`Failed to parse ${key}: ${e.message}`);
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
 * Load performance data (stub - integrate with existing aggregation)
 */
function loadPerformanceData(grade, period) {
  // TODO: Integrate with existing DataAggregator.gs
  // For now, return mock structure
  const scriptProperties = PropertiesService.getScriptProperties();
  const key = `performance-g${grade}-p${period}`;
  const stored = scriptProperties.getProperty(key);

  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      Logger.log(`Failed to load performance data: ${e.message}`);
    }
  }

  return {};
}

/**
 * Get unique students from seating history
 */
function getUniqueStudents(seatingHistory) {
  const students = new Set();

  seatingHistory.forEach(week => {
    Object.values(week.dailyAttendance || {}).forEach(day => {
      Object.keys(day).forEach(student => students.add(student));
    });
  });

  return Array.from(students);
}

/**
 * ============================================================================
 * UTILITY FUNCTIONS FOR TEACHER INTERACTION
 * ============================================================================
 */

/**
 * Input sign-in data from scanned cards
 * Call this function with parsed data from scanned sign-in cards
 *
 * @param {string} jsonData - JSON string of sign-in data
 * @param {number} grade - Grade level
 * @param {number} cycle - Cycle number
 * @param {number} week - Week number
 * @param {number} period - Class period
 */
function inputSignInData(jsonData, grade, cycle, week, period) {
  try {
    const data = JSON.parse(jsonData);
    const results = processWeeklySeating(data, grade, cycle, week, period);

    Logger.log('Sign-in data processed successfully');
    Logger.log(`Warnings: ${results.warnings.length}`);
    results.warnings.forEach(w => Logger.log(`  - ${w.message}`));

    return results;
  } catch (e) {
    Logger.log(`Error processing sign-in data: ${e.message}`);
    throw e;
  }
}

/**
 * Generate weekly seating report
 */
function generateSeatingReport(grade, period) {
  const analysis = analyzeSeatingCorrelations(grade, period);

  if (analysis.error) {
    return {
      status: 'INSUFFICIENT_DATA',
      message: analysis.error
    };
  }

  return {
    status: 'SUCCESS',
    summary: {
      weeksAnalyzed: analysis.weeksAnalyzed,
      catalystPairsFound: analysis.catalystPairs.length,
      distractionVectorsFound: analysis.distractionVectors.length,
      recommendationsCount: analysis.recommendations.length
    },
    topRecommendations: analysis.recommendations.slice(0, 10),
    catalystPairs: analysis.catalystPairs.slice(0, 5).map(p => ({
      students: p.students.join(' & '),
      effect: `+${Math.round(p.combinedEffect)}%`,
      confidence: p.confidence
    })),
    distractionVectors: analysis.distractionVectors.slice(0, 5).map(p => ({
      students: p.students.join(' & '),
      effect: `${Math.round(p.combinedEffect)}%`,
      confidence: p.confidence
    }))
  };
}
