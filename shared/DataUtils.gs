/**
 * DataUtils.gs
 * Utility functions for data retrieval and manipulation
 *
 * KAMS Science Curriculum System v2.0
 * Status: Placeholder - implement as needed
 */

// ============================================================================
// DATA RETRIEVAL
// ============================================================================

/**
 * Get response data from a form's linked spreadsheet
 * @param {string} formId - The Google Form ID
 * @returns {Object[]} Array of response objects
 */
function getFormResponses(formId) {
  if (!formId) {
    Logger.log('DataUtils.getFormResponses: No formId provided');
    return [];
  }

  try {
    const form = FormApp.openById(formId);
    const responses = form.getResponses();

    return responses.map(response => ({
      timestamp: response.getTimestamp(),
      email: response.getRespondentEmail(),
      itemResponses: response.getItemResponses().map(item => ({
        question: item.getItem().getTitle(),
        response: item.getResponse(),
        score: item.getScore ? item.getScore() : null
      }))
    }));
  } catch (e) {
    Logger.log('DataUtils.getFormResponses error: ' + e.message);
    return [];
  }
}

/**
 * Get all responses for a specific week
 * @param {number} grade - 7 or 8
 * @param {number} cycle - 3-10
 * @param {number} week - 1-3
 * @returns {Object} Structured response data by form type
 */
function getWeekResponses(grade, cycle, week) {
  const formTypes = ['hook', 'station1', 'station2', 'station3', 'exitTicket'];
  const weekData = {
    grade: grade,
    cycle: cycle,
    week: week,
    forms: {}
  };

  // Load form IDs from registry (requires FormRegistry.gs)
  formTypes.forEach(formType => {
    const formId = getFormId_(grade, cycle, week, formType);
    if (formId) {
      weekData.forms[formType] = getFormResponses(formId);
    } else {
      weekData.forms[formType] = [];
    }
  });

  return weekData;
}

/**
 * Helper: Get form ID from registry
 * @private
 */
function getFormId_(grade, cycle, week, formType) {
  // Override in production with actual form registry lookup
  // Returns null if form not registered
  return null;
}

/**
 * Get student scores across all forms
 * @param {string} email - Student email
 * @param {number} cycle - Optional cycle filter
 * @returns {Object[]} Score history
 */
function getStudentHistory(email, cycle) {
  if (!email) {
    Logger.log('DataUtils.getStudentHistory: No email provided');
    return [];
  }

  // Returns empty array - implement with actual data source in production
  // Expected structure: [{cycle, week, form, score, maxScore, percentage}]
  return [];
}

// ============================================================================
// DATA TRANSFORMATION
// ============================================================================

/**
 * Convert raw form responses to analysis format
 * @param {Object[]} responses - Raw response data
 * @returns {Object} Transformed analysis-ready data
 */
function transformForAnalysis(responses) {
  if (!responses || !Array.isArray(responses) || responses.length === 0) {
    return {
      totalResponses: 0,
      students: [],
      questions: [],
      summary: {}
    };
  }

  const students = {};
  const questions = {};

  responses.forEach(response => {
    const email = response.email || 'anonymous';
    if (!students[email]) {
      students[email] = { email, responses: [] };
    }

    response.itemResponses.forEach(item => {
      students[email].responses.push({
        question: item.question,
        response: item.response,
        score: item.score
      });

      if (!questions[item.question]) {
        questions[item.question] = { question: item.question, responses: [], scores: [] };
      }
      questions[item.question].responses.push(item.response);
      if (item.score !== null) {
        questions[item.question].scores.push(item.score);
      }
    });
  });

  return {
    totalResponses: responses.length,
    students: Object.values(students),
    questions: Object.values(questions),
    summary: {
      studentCount: Object.keys(students).length,
      questionCount: Object.keys(questions).length
    }
  };
}

/**
 * Calculate statistics for a set of scores
 * @param {number[]} scores - Array of numeric scores
 * @returns {Object} Statistics object {mean, median, stdDev, min, max}
 */
function calculateStats(scores) {
  if (!scores || scores.length === 0) {
    return { mean: 0, median: 0, stdDev: 0, min: 0, max: 0 };
  }

  const sorted = [...scores].sort((a, b) => a - b);
  const sum = scores.reduce((a, b) => a + b, 0);
  const mean = sum / scores.length;
  const median = sorted.length % 2 === 0
    ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
    : sorted[Math.floor(sorted.length / 2)];
  const squaredDiffs = scores.map(s => Math.pow(s - mean, 2));
  const stdDev = Math.sqrt(squaredDiffs.reduce((a, b) => a + b, 0) / scores.length);

  return {
    mean: Math.round(mean * 100) / 100,
    median: median,
    stdDev: Math.round(stdDev * 100) / 100,
    min: sorted[0],
    max: sorted[sorted.length - 1]
  };
}

// ============================================================================
// ADDITIONAL STATISTICAL UTILITIES
// ============================================================================

/**
 * Calculate average of an array
 * @param {number[]} arr - Array of numbers
 * @returns {number} Average value
 */
function average(arr) {
  if (!arr || arr.length === 0) return 0;
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

/**
 * Calculate median of an array
 * @param {number[]} arr - Array of numbers
 * @returns {number} Median value
 */
function calculateMedian(arr) {
  if (!arr || arr.length === 0) return 0;
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

/**
 * Calculate standard deviation of an array
 * @param {number[]} arr - Array of numbers
 * @returns {number} Standard deviation
 */
function calculateStdDev(arr) {
  if (!arr || arr.length === 0) return 0;
  const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
  const squareDiffs = arr.map(value => Math.pow(value - mean, 2));
  return Math.sqrt(squareDiffs.reduce((a, b) => a + b, 0) / arr.length);
}

/**
 * Find most common value in an array (mode)
 * @param {Array} arr - Array of values
 * @returns {Object|null} {value, count} or null if empty
 */
function findMostCommon(arr) {
  if (!arr || arr.length === 0) return null;

  const counts = {};
  arr.forEach(item => {
    const key = JSON.stringify(item);
    counts[key] = (counts[key] || 0) + 1;
  });

  const maxKey = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
  return { value: JSON.parse(maxKey), count: counts[maxKey] };
}

/**
 * Find mode of an array (returns most common value directly)
 * @param {Array} arr - Array of values
 * @returns {*} Most common value or null
 */
function findMode(arr) {
  if (!arr || arr.length === 0) return null;
  const counts = {};
  arr.forEach(item => { counts[item] = (counts[item] || 0) + 1; });
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
}

// ============================================================================
// STRING NORMALIZATION UTILITIES
// ============================================================================

/**
 * Normalize student name for consistent matching
 * Handles variations like "Emma S.", "Emma Smith", "emma s"
 * @param {string} name - Raw name input
 * @returns {string} Normalized name
 */
function normalizeStudentName(name) {
  if (!name) return '';

  return name
    .trim()
    .toLowerCase()
    .replace(/[.,'"!?]/g, '')  // Remove punctuation
    .replace(/\s+/g, ' ')      // Normalize whitespace
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

// ============================================================================
// DATA EXPORT
// ============================================================================

/**
 * Export data to JSON format
 * @param {Object} data - Data to export
 * @param {string} filename - Target filename
 * @returns {string} JSON string
 */
function exportToJson(data, filename) {
  return JSON.stringify(data, null, 2);
}

/**
 * Export data to CSV format
 * @param {Object[]} data - Array of objects to export
 * @param {string[]} headers - Column headers
 * @returns {string} CSV string
 */
function exportToCsv(data, headers) {
  const csvRows = [headers.join(',')];

  data.forEach(row => {
    const values = headers.map(header => {
      const value = row[header] || '';
      // Escape commas and quotes
      return typeof value === 'string' && (value.includes(',') || value.includes('"'))
        ? `"${value.replace(/"/g, '""')}"`
        : value;
    });
    csvRows.push(values.join(','));
  });

  return csvRows.join('\n');
}
