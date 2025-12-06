/**
 * sync-to-canvas.gs
 * Synchronize grades from Google Forms to Canvas LMS
 *
 * KAMS Science Curriculum System v2.0
 * Status: Placeholder - implement when Canvas API access is configured
 *
 * Prerequisites:
 * - Canvas API token with grade write permissions
 * - Course and assignment IDs mapped in configuration
 * - Student email → Canvas ID mapping
 */

// ============================================================================
// CONFIGURATION
// ============================================================================

const CANVAS_CONFIG = {
  baseUrl: 'https://canvas.instructure.com/api/v1', // Update with school Canvas URL
  apiToken: '', // Store securely - do not commit!
  courseIds: {
    grade7: {
      period2: '',
      period7: ''
    },
    grade8: {
      period3: '',
      period5: ''
    }
  }
};

// ============================================================================
// SYNC FUNCTIONS
// ============================================================================

/**
 * Sync grades for a specific week
 * @param {number} grade - 7 or 8
 * @param {number} cycle - 3-10
 * @param {number} week - 1-3
 * @returns {Object} Sync results
 */
function syncWeekGrades(grade, cycle, week) {
  Logger.log(`Syncing grades: G${grade} C${cycle} W${week}`);

  // TODO: Implement Canvas sync
  // 1. Get aggregated scores from DataAggregator
  // 2. Map students to Canvas IDs
  // 3. Update Canvas gradebook via API
  // 4. Log results

  throw new Error('sync-to-canvas.syncWeekGrades not implemented');
}

/**
 * Sync all grades for a cycle
 * @param {number} grade - 7 or 8
 * @param {number} cycle - 3-10
 * @returns {Object} Sync results for all weeks
 */
function syncCycleGrades(grade, cycle) {
  const results = {
    grade: grade,
    cycle: cycle,
    synced: new Date().toISOString(),
    weeks: {}
  };

  for (let week = 1; week <= 3; week++) {
    try {
      results.weeks[week] = syncWeekGrades(grade, cycle, week);
    } catch (e) {
      results.weeks[week] = { error: e.message };
    }
  }

  return results;
}

// ============================================================================
// CANVAS API FUNCTIONS
// ============================================================================

/**
 * Make authenticated request to Canvas API
 * @param {string} endpoint - API endpoint path
 * @param {string} method - HTTP method
 * @param {Object} payload - Request body (optional)
 * @returns {Object} API response
 */
function canvasRequest(endpoint, method, payload) {
  if (!CANVAS_CONFIG.apiToken) {
    throw new Error('Canvas API token not configured');
  }

  const options = {
    method: method,
    headers: {
      'Authorization': `Bearer ${CANVAS_CONFIG.apiToken}`,
      'Content-Type': 'application/json'
    },
    muteHttpExceptions: true
  };

  if (payload) {
    options.payload = JSON.stringify(payload);
  }

  const response = UrlFetchApp.fetch(CANVAS_CONFIG.baseUrl + endpoint, options);
  const code = response.getResponseCode();

  if (code >= 400) {
    throw new Error(`Canvas API error ${code}: ${response.getContentText()}`);
  }

  return JSON.parse(response.getContentText());
}

/**
 * Get assignment ID for a specific form
 * @param {number} courseId - Canvas course ID
 * @param {string} assignmentName - Expected assignment name
 * @returns {number|null} Assignment ID or null
 */
function getAssignmentId(courseId, assignmentName) {
  // TODO: Implement assignment lookup or use configuration mapping
  throw new Error('sync-to-canvas.getAssignmentId not implemented');
}

/**
 * Submit grade for a student
 * @param {number} courseId - Canvas course ID
 * @param {number} assignmentId - Canvas assignment ID
 * @param {number} studentId - Canvas student ID
 * @param {number} score - Grade to submit
 * @returns {Object} Submission result
 */
function submitGrade(courseId, assignmentId, studentId, score) {
  const endpoint = `/courses/${courseId}/assignments/${assignmentId}/submissions/${studentId}`;
  const payload = {
    submission: {
      posted_grade: score
    }
  };

  return canvasRequest(endpoint, 'PUT', payload);
}

// ============================================================================
// STUDENT MAPPING
// ============================================================================

/**
 * Get Canvas student ID from email
 * @param {string} email - Student email
 * @param {number} courseId - Canvas course ID
 * @returns {number|null} Canvas student ID or null
 */
function getCanvasStudentId(email, courseId) {
  // TODO: Implement student lookup
  // Option 1: Search Canvas users by email
  // Option 2: Use pre-built mapping spreadsheet
  throw new Error('sync-to-canvas.getCanvasStudentId not implemented');
}

/**
 * Build student mapping from roster
 * @param {number} courseId - Canvas course ID
 * @returns {Object} Email → Canvas ID mapping
 */
function buildStudentMapping(courseId) {
  // Get all students enrolled in course
  const endpoint = `/courses/${courseId}/users?enrollment_type=student`;
  const students = canvasRequest(endpoint, 'GET');

  const mapping = {};
  students.forEach(student => {
    if (student.email) {
      mapping[student.email.toLowerCase()] = student.id;
    }
  });

  return mapping;
}

// ============================================================================
// MENU & UI FUNCTIONS
// ============================================================================

/**
 * Add custom menu
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Canvas Sync')
    .addItem('Sync Current Week', 'syncCurrentWeekUI')
    .addItem('Sync Full Cycle', 'syncCurrentCycleUI')
    .addSeparator()
    .addItem('Test Connection', 'testCanvasConnection')
    .addToUi();
}

/**
 * Test Canvas API connection
 */
function testCanvasConnection() {
  try {
    const result = canvasRequest('/users/self', 'GET');
    SpreadsheetApp.getUi().alert(`Connected as: ${result.name}`);
  } catch (e) {
    SpreadsheetApp.getUi().alert(`Connection failed: ${e.message}`);
  }
}

/**
 * UI wrapper for week sync
 */
function syncCurrentWeekUI() {
  SpreadsheetApp.getUi().alert('Not implemented. Configure Canvas API settings first.');
}

/**
 * UI wrapper for cycle sync
 */
function syncCurrentCycleUI() {
  SpreadsheetApp.getUi().alert('Not implemented. Configure Canvas API settings first.');
}
