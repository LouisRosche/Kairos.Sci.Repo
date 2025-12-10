/**
 * KAMS Science Curriculum - Canvas Data Sync
 * Bidirectional sync capabilities between Canvas LMS and Hub
 *
 * @fileoverview Pulls data FROM Canvas to enrich Hub analysis
 *               (Complements canvas-grade-sync.gs which pushes TO Canvas)
 * @version 1.0.0
 * @author KAMS Science Team
 *
 * ============================================================================
 * PURPOSE
 * ============================================================================
 *
 * This module provides bidirectional Canvas integration:
 *   1. Pull roster data from Canvas (name, email, enrollment status)
 *   2. Pull assignment due dates and completion status
 *   3. Cross-reference Canvas submissions with form responses
 *   4. Identify students with missing work
 *   5. Sync Canvas due dates for zero-fill automation
 *
 * ============================================================================
 */

/**
 * ============================================================================
 * CANVAS API CONFIGURATION
 * ============================================================================
 */

/**
 * Get Canvas API configuration from Script Properties
 */
function getCanvasApiConfig() {
  var props = PropertiesService.getScriptProperties();

  return {
    domain: props.getProperty('CANVAS_DOMAIN') || '',
    apiKey: props.getProperty('CANVAS_API_KEY') || '',
    grade7CourseId: props.getProperty('GRADE_7_COURSE_ID') || '',
    grade8CourseId: props.getProperty('GRADE_8_COURSE_ID') || ''
  };
}

/**
 * Validate Canvas API configuration
 */
function validateCanvasApiConfig() {
  var config = getCanvasApiConfig();
  var missing = [];

  if (!config.domain) missing.push('CANVAS_DOMAIN');
  if (!config.apiKey) missing.push('CANVAS_API_KEY');
  if (!config.grade7CourseId) missing.push('GRADE_7_COURSE_ID');
  if (!config.grade8CourseId) missing.push('GRADE_8_COURSE_ID');

  return {
    valid: missing.length === 0,
    missing: missing,
    config: config
  };
}

/**
 * ============================================================================
 * ROSTER SYNC
 * ============================================================================
 */

/**
 * Pull complete roster from Canvas for a grade
 *
 * @param {number} grade - Grade level (7 or 8)
 * @returns {Object} Roster data with students and metadata
 */
function pullCanvasRoster(grade) {
  var validation = validateCanvasApiConfig();
  if (!validation.valid) {
    Logger.log('Canvas API not configured: ' + validation.missing.join(', '));
    return { success: false, error: 'API not configured', missing: validation.missing };
  }

  var config = validation.config;
  var courseId = grade === 7 ? config.grade7CourseId : config.grade8CourseId;

  var result = {
    success: false,
    grade: grade,
    courseId: courseId,
    students: [],
    activeCount: 0,
    inactiveCount: 0,
    timestamp: new Date().toISOString()
  };

  try {
    var page = 1;
    var hasMore = true;

    while (hasMore) {
      var url = 'https://' + config.domain + '/api/v1/courses/' + courseId +
                '/users?enrollment_type[]=student&include[]=enrollments&per_page=100&page=' + page;

      var options = {
        method: 'get',
        headers: { 'Authorization': 'Bearer ' + config.apiKey },
        muteHttpExceptions: true
      };

      var response = UrlFetchApp.fetch(url, options);
      var statusCode = response.getResponseCode();

      if (statusCode !== 200) {
        result.error = 'API returned status ' + statusCode;
        Logger.log('Canvas roster pull failed: ' + statusCode);
        return result;
      }

      var users = JSON.parse(response.getContentText());

      if (users.length === 0) {
        hasMore = false;
      } else {
        users.forEach(function(user) {
          var enrollment = (user.enrollments || [])[0];
          var isActive = enrollment && enrollment.enrollment_state === 'active';

          result.students.push({
            id: user.id,
            name: user.name || user.sortable_name,
            sortableName: user.sortable_name,
            email: (user.login_id || user.email || '').toLowerCase(),
            enrollmentState: enrollment ? enrollment.enrollment_state : 'unknown',
            isActive: isActive,
            section: enrollment ? enrollment.course_section_id : null
          });

          if (isActive) {
            result.activeCount++;
          } else {
            result.inactiveCount++;
          }
        });

        page++;
      }

      Utilities.sleep(200); // Rate limiting
    }

    result.success = true;
    Logger.log('Canvas roster pulled for Grade ' + grade + ': ' + result.students.length + ' students');

  } catch (e) {
    result.error = e.message;
    Logger.log('Canvas roster pull error: ' + e.message);
  }

  return result;
}

/**
 * Sync Canvas roster to SeatingDataBridge
 *
 * @param {number} grade - Grade level
 * @param {number} period - Class period (optional, if Canvas has sections)
 */
function syncCanvasRosterToSeating(grade, period) {
  var roster = pullCanvasRoster(grade);

  if (!roster.success) {
    return { success: false, error: roster.error };
  }

  // Filter active students only
  var activeStudents = roster.students.filter(function(s) { return s.isActive; });

  // Import to SeatingDataBridge roster
  var importData = activeStudents.map(function(s) {
    return {
      name: s.name,
      email: s.email,
      canvasId: s.id,
      section: s.section
    };
  });

  // If period is provided, import to that specific period
  // Otherwise, this would need to be matched based on sections
  if (period && typeof importRoster === 'function') {
    importRoster(grade, period, importData);
    Logger.log('Imported ' + importData.length + ' students to G' + grade + ' P' + period + ' roster');
  }

  return {
    success: true,
    imported: importData.length,
    students: importData
  };
}

/**
 * ============================================================================
 * ASSIGNMENT SYNC
 * ============================================================================
 */

/**
 * Pull all assignments from Canvas for a grade
 *
 * @param {number} grade - Grade level (7 or 8)
 * @returns {Object} Assignments with due dates and submission info
 */
function pullCanvasAssignments(grade) {
  var validation = validateCanvasApiConfig();
  if (!validation.valid) {
    return { success: false, error: 'API not configured' };
  }

  var config = validation.config;
  var courseId = grade === 7 ? config.grade7CourseId : config.grade8CourseId;

  var result = {
    success: false,
    grade: grade,
    assignments: [],
    upcomingDueDates: [],
    pastDueDates: [],
    timestamp: new Date().toISOString()
  };

  try {
    var page = 1;
    var hasMore = true;
    var now = new Date();

    while (hasMore) {
      var url = 'https://' + config.domain + '/api/v1/courses/' + courseId +
                '/assignments?per_page=100&page=' + page;

      var options = {
        method: 'get',
        headers: { 'Authorization': 'Bearer ' + config.apiKey },
        muteHttpExceptions: true
      };

      var response = UrlFetchApp.fetch(url, options);

      if (response.getResponseCode() !== 200) {
        result.error = 'API returned status ' + response.getResponseCode();
        return result;
      }

      var assignments = JSON.parse(response.getContentText());

      if (assignments.length === 0) {
        hasMore = false;
      } else {
        assignments.forEach(function(assignment) {
          var dueDate = assignment.due_at ? new Date(assignment.due_at) : null;
          var isPastDue = dueDate && now > dueDate;

          var assignmentData = {
            id: assignment.id,
            name: assignment.name,
            dueAt: assignment.due_at,
            dueDate: dueDate,
            isPastDue: isPastDue,
            pointsPossible: assignment.points_possible,
            published: assignment.published,
            submissionTypes: assignment.submission_types,
            hasSubmittedSubmissions: assignment.has_submitted_submissions
          };

          result.assignments.push(assignmentData);

          if (dueDate) {
            if (isPastDue) {
              result.pastDueDates.push(assignmentData);
            } else {
              result.upcomingDueDates.push(assignmentData);
            }
          }
        });

        page++;
      }

      Utilities.sleep(200);
    }

    // Sort upcoming by due date
    result.upcomingDueDates.sort(function(a, b) {
      return a.dueDate - b.dueDate;
    });

    result.success = true;
    Logger.log('Canvas assignments pulled for Grade ' + grade + ': ' + result.assignments.length);

  } catch (e) {
    result.error = e.message;
    Logger.log('Canvas assignments pull error: ' + e.message);
  }

  return result;
}

/**
 * Get assignments due in the next N days
 *
 * @param {number} grade - Grade level
 * @param {number} days - Number of days to look ahead
 * @returns {Array} Upcoming assignments
 */
function getUpcomingAssignments(grade, days) {
  var assignments = pullCanvasAssignments(grade);

  if (!assignments.success) {
    return [];
  }

  var cutoff = new Date();
  cutoff.setDate(cutoff.getDate() + days);

  return assignments.upcomingDueDates.filter(function(a) {
    return a.dueDate && a.dueDate <= cutoff;
  });
}

/**
 * ============================================================================
 * SUBMISSION STATUS SYNC
 * ============================================================================
 */

/**
 * Pull submission status for all students on an assignment
 *
 * @param {number} grade - Grade level
 * @param {string} assignmentId - Canvas assignment ID
 * @returns {Object} Submission status by student
 */
function pullSubmissionStatus(grade, assignmentId) {
  var validation = validateCanvasApiConfig();
  if (!validation.valid) {
    return { success: false, error: 'API not configured' };
  }

  var config = validation.config;
  var courseId = grade === 7 ? config.grade7CourseId : config.grade8CourseId;

  var result = {
    success: false,
    assignmentId: assignmentId,
    submissions: [],
    submitted: 0,
    missing: 0,
    graded: 0
  };

  try {
    var page = 1;
    var hasMore = true;

    while (hasMore) {
      var url = 'https://' + config.domain + '/api/v1/courses/' + courseId +
                '/assignments/' + assignmentId + '/submissions?per_page=100&page=' + page;

      var options = {
        method: 'get',
        headers: { 'Authorization': 'Bearer ' + config.apiKey },
        muteHttpExceptions: true
      };

      var response = UrlFetchApp.fetch(url, options);

      if (response.getResponseCode() !== 200) {
        result.error = 'API returned status ' + response.getResponseCode();
        return result;
      }

      var submissions = JSON.parse(response.getContentText());

      if (submissions.length === 0) {
        hasMore = false;
      } else {
        submissions.forEach(function(sub) {
          var hasSubmission = sub.workflow_state !== 'unsubmitted' &&
                              sub.submitted_at !== null;
          var isGraded = sub.workflow_state === 'graded';

          result.submissions.push({
            userId: sub.user_id,
            workflowState: sub.workflow_state,
            submittedAt: sub.submitted_at,
            gradedAt: sub.graded_at,
            score: sub.score,
            grade: sub.grade,
            late: sub.late,
            missing: sub.missing,
            hasSubmission: hasSubmission,
            isGraded: isGraded
          });

          if (hasSubmission) result.submitted++;
          if (sub.missing) result.missing++;
          if (isGraded) result.graded++;
        });

        page++;
      }

      Utilities.sleep(200);
    }

    result.success = true;

  } catch (e) {
    result.error = e.message;
  }

  return result;
}

/**
 * ============================================================================
 * CROSS-REFERENCE WITH FORM RESPONSES
 * ============================================================================
 */

/**
 * Identify students who submitted Canvas assignment but not Google Form
 *
 * @param {number} grade - Grade level
 * @param {string} canvasAssignmentId - Canvas assignment ID
 * @param {Array} formResponses - Email addresses from form responses
 * @returns {Object} Discrepancy report
 */
function crossReferenceSubmissions(grade, canvasAssignmentId, formResponses) {
  var roster = pullCanvasRoster(grade);
  var submissions = pullSubmissionStatus(grade, canvasAssignmentId);

  if (!roster.success || !submissions.success) {
    return {
      success: false,
      error: 'Could not fetch Canvas data'
    };
  }

  // Normalize form responses to lowercase
  var formEmails = formResponses.map(function(e) {
    return e.toLowerCase().trim();
  });

  var result = {
    success: true,
    canvasOnlySubmissions: [],   // Submitted to Canvas but not form
    formOnlySubmissions: [],      // Submitted to form but not Canvas
    bothSubmitted: [],            // Submitted to both
    neitherSubmitted: []          // Missing from both
  };

  // Create lookup maps
  var emailToCanvasUser = {};
  roster.students.forEach(function(student) {
    if (student.email) {
      emailToCanvasUser[student.email] = student;
    }
  });

  var userIdToSubmission = {};
  submissions.submissions.forEach(function(sub) {
    userIdToSubmission[sub.userId] = sub;
  });

  // Cross-reference
  roster.students.filter(function(s) { return s.isActive; }).forEach(function(student) {
    var canvasSubmission = userIdToSubmission[student.id];
    var hasCanvasSubmission = canvasSubmission && canvasSubmission.hasSubmission;
    var hasFormSubmission = formEmails.indexOf(student.email) >= 0;

    var record = {
      name: student.name,
      email: student.email,
      canvasId: student.id
    };

    if (hasCanvasSubmission && hasFormSubmission) {
      result.bothSubmitted.push(record);
    } else if (hasCanvasSubmission && !hasFormSubmission) {
      record.canvasSubmittedAt = canvasSubmission.submittedAt;
      result.canvasOnlySubmissions.push(record);
    } else if (!hasCanvasSubmission && hasFormSubmission) {
      result.formOnlySubmissions.push(record);
    } else {
      result.neitherSubmitted.push(record);
    }
  });

  Logger.log('Cross-reference: ' + result.bothSubmitted.length + ' both, ' +
             result.canvasOnlySubmissions.length + ' Canvas only, ' +
             result.formOnlySubmissions.length + ' Form only, ' +
             result.neitherSubmitted.length + ' neither');

  return result;
}

/**
 * ============================================================================
 * MISSING WORK IDENTIFICATION
 * ============================================================================
 */

/**
 * Get all students with missing work for a grade
 *
 * @param {number} grade - Grade level
 * @returns {Object} Missing work report by student
 */
function getMissingWorkReport(grade) {
  var assignments = pullCanvasAssignments(grade);
  var roster = pullCanvasRoster(grade);

  if (!assignments.success || !roster.success) {
    return { success: false, error: 'Could not fetch Canvas data' };
  }

  var result = {
    success: true,
    grade: grade,
    generatedAt: new Date().toISOString(),
    studentsMissingWork: [],
    assignmentsWithMissing: []
  };

  // Only check past due assignments
  var pastDueAssignments = assignments.pastDueDates.filter(function(a) {
    return a.published;
  });

  var studentMissingMap = {};

  pastDueAssignments.forEach(function(assignment) {
    var submissions = pullSubmissionStatus(grade, assignment.id);

    if (!submissions.success) return;

    var missingStudents = submissions.submissions.filter(function(s) {
      return s.missing || s.workflowState === 'unsubmitted';
    });

    if (missingStudents.length > 0) {
      result.assignmentsWithMissing.push({
        id: assignment.id,
        name: assignment.name,
        dueDate: assignment.dueAt,
        missingCount: missingStudents.length
      });

      missingStudents.forEach(function(sub) {
        var userId = sub.userId.toString();
        if (!studentMissingMap[userId]) {
          var student = roster.students.find(function(s) { return s.id === sub.userId; });
          studentMissingMap[userId] = {
            userId: sub.userId,
            name: student ? student.name : 'Unknown',
            email: student ? student.email : '',
            missingAssignments: []
          };
        }
        studentMissingMap[userId].missingAssignments.push({
          id: assignment.id,
          name: assignment.name
        });
      });
    }
  });

  // Convert map to array and sort by missing count
  result.studentsMissingWork = Object.values(studentMissingMap).sort(function(a, b) {
    return b.missingAssignments.length - a.missingAssignments.length;
  });

  Logger.log('Missing work report: ' + result.studentsMissingWork.length +
             ' students with missing work in Grade ' + grade);

  return result;
}

/**
 * ============================================================================
 * DUE DATE SYNC FOR ZERO-FILL
 * ============================================================================
 */

/**
 * Get assignments that are past due and need zero-fill consideration
 *
 * @param {number} grade - Grade level
 * @param {number} gracePeriodHours - Hours after due date before zero-fill
 * @returns {Array} Assignments ready for zero-fill
 */
function getAssignmentsForZeroFill(grade, gracePeriodHours) {
  gracePeriodHours = gracePeriodHours || 24; // Default 24 hour grace period

  var assignments = pullCanvasAssignments(grade);

  if (!assignments.success) {
    return [];
  }

  var now = new Date();
  var gracePeriodMs = gracePeriodHours * 60 * 60 * 1000;

  return assignments.pastDueDates.filter(function(a) {
    if (!a.dueDate || !a.published) return false;

    var timeSinceDue = now - a.dueDate;
    return timeSinceDue > gracePeriodMs;
  });
}

/**
 * ============================================================================
 * UNIFIED DATA EXPORT
 * ============================================================================
 */

/**
 * Export comprehensive Canvas data for a grade
 * Useful for dashboard integration
 *
 * @param {number} grade - Grade level
 * @returns {Object} Complete Canvas data export
 */
function exportCanvasData(grade) {
  return {
    exportedAt: new Date().toISOString(),
    grade: grade,
    roster: pullCanvasRoster(grade),
    assignments: pullCanvasAssignments(grade),
    missingWork: getMissingWorkReport(grade)
  };
}

/**
 * Get Canvas sync status summary
 */
function getCanvasSyncStatus() {
  var validation = validateCanvasApiConfig();

  return {
    configured: validation.valid,
    missing: validation.missing,
    lastSync: PropertiesService.getScriptProperties().getProperty('CANVAS_LAST_SYNC'),
    status: validation.valid ? 'READY' : 'NOT_CONFIGURED'
  };
}

/**
 * Record sync timestamp
 */
function recordCanvasSyncTime() {
  PropertiesService.getScriptProperties().setProperty(
    'CANVAS_LAST_SYNC',
    new Date().toISOString()
  );
}
