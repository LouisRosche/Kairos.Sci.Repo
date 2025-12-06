/**
 * ValidationUtils.gs
 * Utility functions for configuration and data validation
 *
 * KAMS Science Curriculum System v2.0
 * Status: Placeholder - implement as needed
 */

// ============================================================================
// CONFIG VALIDATION
// ============================================================================

/**
 * Validate a cycle configuration against schema
 * @param {Object} cycleConfig - The cycle configuration object
 * @returns {Object} {valid: boolean, errors: string[]}
 */
function validateCycleConfig(cycleConfig) {
  const errors = [];

  // Required top-level fields
  const requiredFields = ['cycle', 'name', 'status', 'dates', 'grades'];
  requiredFields.forEach(field => {
    if (!cycleConfig[field]) {
      errors.push(`Missing required field: ${field}`);
    }
  });

  // Validate cycle number
  if (cycleConfig.cycle && (cycleConfig.cycle < 2 || cycleConfig.cycle > 10)) {
    errors.push(`Cycle number must be between 2 and 10, got: ${cycleConfig.cycle}`);
  }

  // Validate status
  const validStatuses = ['not_started', 'in_progress', 'complete', 'deployed'];
  if (cycleConfig.status && !validStatuses.includes(cycleConfig.status)) {
    errors.push(`Invalid status: ${cycleConfig.status}. Must be one of: ${validStatuses.join(', ')}`);
  }

  // Validate dates
  if (cycleConfig.dates) {
    if (!cycleConfig.dates.start || !isValidDate(cycleConfig.dates.start)) {
      errors.push('Invalid or missing dates.start');
    }
    if (!cycleConfig.dates.end || !isValidDate(cycleConfig.dates.end)) {
      errors.push('Invalid or missing dates.end');
    }
  }

  // Validate grades
  if (cycleConfig.grades) {
    ['7', '8'].forEach(grade => {
      if (cycleConfig.grades[grade]) {
        const gradeErrors = validateGradeConfig(cycleConfig.grades[grade], grade);
        errors.push(...gradeErrors);
      }
    });
  }

  return {
    valid: errors.length === 0,
    errors: errors
  };
}

/**
 * Validate grade-specific configuration
 * @param {Object} gradeConfig - Grade configuration object
 * @param {string} grade - Grade identifier ('7' or '8')
 * @returns {string[]} Array of error messages
 */
function validateGradeConfig(gradeConfig, grade) {
  const errors = [];

  if (!gradeConfig.topic) {
    errors.push(`Grade ${grade}: Missing topic`);
  }

  if (!gradeConfig.ngss || !gradeConfig.ngss.primary) {
    errors.push(`Grade ${grade}: Missing primary NGSS standard`);
  }

  if (gradeConfig.weeks) {
    [1, 2, 3].forEach(week => {
      if (!gradeConfig.weeks[String(week)]) {
        errors.push(`Grade ${grade}: Missing week ${week} configuration`);
      }
    });
  }

  return errors;
}

/**
 * Validate a question configuration
 * @param {Object} question - Question configuration object
 * @returns {Object} {valid: boolean, errors: string[]}
 */
function validateQuestion(question) {
  const errors = [];

  // Required fields
  if (!question.id) errors.push('Missing question ID');
  if (!question.type) errors.push('Missing question type');
  if (question.points === undefined) errors.push('Missing points value');
  if (!question.title) errors.push('Missing question title');

  // Validate ID format
  if (question.id && !isValidQuestionId(question.id)) {
    errors.push(`Invalid question ID format: ${question.id}. Expected: g{grade}_c{cycle}_w{week}_{station}_q{number}`);
  }

  // Validate question type
  const validTypes = ['multipleChoice', 'checkbox', 'paragraph', 'shortAnswer',
                      'scale', 'grid', 'dropdown', 'number'];
  if (question.type && !validTypes.includes(question.type)) {
    errors.push(`Invalid question type: ${question.type}`);
  }

  // Validate points
  if (question.points !== undefined && (question.points < 0 || question.points > 25)) {
    errors.push(`Invalid points value: ${question.points}. Must be 0-25.`);
  }

  return {
    valid: errors.length === 0,
    errors: errors
  };
}

// ============================================================================
// FORMAT VALIDATION
// ============================================================================

/**
 * Check if a string is a valid date in YYYY-MM-DD format
 * @param {string} dateStr - Date string to validate
 * @returns {boolean}
 */
function isValidDate(dateStr) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateStr)) return false;

  const date = new Date(dateStr);
  return date instanceof Date && !isNaN(date);
}

/**
 * Check if a question ID follows the standard format
 * @param {string} id - Question ID to validate
 * @returns {boolean}
 */
function isValidQuestionId(id) {
  // Format: g{grade}_c{cycle}_w{week}_{station}_q{number}
  const regex = /^g[78]_c(10|[2-9])_w[1-3]_(hook|s[1-3]|exit)_q\d+$/;
  return regex.test(id);
}

/**
 * Check if an email is valid
 * @param {string} email - Email to validate
 * @returns {boolean}
 */
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// ============================================================================
// DATA VALIDATION
// ============================================================================

/**
 * Validate student score data
 * @param {Object} scoreData - Student score object
 * @returns {Object} {valid: boolean, errors: string[]}
 */
function validateScoreData(scoreData) {
  const errors = [];

  if (!scoreData.email || !isValidEmail(scoreData.email)) {
    errors.push('Invalid or missing student email');
  }

  if (scoreData.score === undefined || scoreData.score < 0 || scoreData.score > 100) {
    errors.push('Score must be between 0 and 100');
  }

  if (!scoreData.timestamp) {
    errors.push('Missing timestamp');
  }

  return {
    valid: errors.length === 0,
    errors: errors
  };
}

/**
 * Validate MTSS tier assignment
 * @param {number} score - Student score percentage
 * @returns {number} Tier assignment (1, 2, or 3)
 */
function validateTierAssignment(score) {
  if (score >= 70) return 1;
  if (score >= 50) return 2;
  return 3;
}
