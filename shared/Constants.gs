/**
 * ============================================================================
 * SYSTEM CONSTANTS MODULE
 * ============================================================================
 *
 * Immutable constants that do not change based on configuration.
 * For configurable values, use Config.gs instead.
 *
 * This module contains:
 * - API constraints (Google Forms limitations)
 * - Validation patterns
 * - Error codes
 * - Pipeline status values
 *
 * Version: 3.0.0
 * Last Updated: December 2025
 * ============================================================================
 */

var Constants = {

  // ==========================================================================
  // VERSION INFORMATION
  // ==========================================================================

  VERSION: '3.0.0',
  ARCHITECTURE_VERSION: '3.0',
  LAST_AUDIT: '2025-12-07',

  // ==========================================================================
  // GOOGLE FORMS API CONSTRAINTS
  // These are hard limits from the Google Forms API, NOT configurable
  // ==========================================================================

  FORMS_API: {
    // Items that support setPoints()
    GRADEABLE_TYPES: [
      'MULTIPLE_CHOICE',
      'CHECKBOX',
      'SCALE',
      'DROPDOWN',
      'GRID'
    ],

    // Items that require manual grading
    MANUAL_GRADE_TYPES: [
      'PARAGRAPH_TEXT',
      'TEXT',
      'FILE_UPLOAD'
    ],

    // Methods that don't exist (common mistakes)
    NON_EXISTENT_METHODS: [
      'setShuffleOrder',           // Must configure in UI
      'requireTextLengthGreaterThan' // Use requireTextLengthGreaterThanOrEqualTo
    ],

    // Maximum values
    MAX_CHOICES: 50,
    MAX_QUESTIONS_PER_FORM: 200,
    MAX_TITLE_LENGTH: 500,
    MAX_DESCRIPTION_LENGTH: 500,

    // Settings that require manual UI configuration
    MANUAL_UI_SETTINGS: [
      'Release grade timing',
      'Feedback visibility',
      'Shuffle option order'
    ]
  },

  // ==========================================================================
  // VALIDATION PATTERNS
  // ==========================================================================

  PATTERNS: {
    // Email validation (basic)
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

    // Question ID format: g7_c3_w1_hook_q1
    QUESTION_ID: /^g[78]_c\d{1,2}_w[123]_(hook|station[123]|exit)_q\d+$/,

    // Form name format: G7.C3.W1: Hook - Title [12 pts]
    FORM_NAME: /^G[78]\.C\d{1,2}\.W[123]: .+ \[\d+ pts\]$/,

    // Numeric answer (for validation)
    CONTAINS_NUMBER: /.*[0-9].*/,

    // NGSS standard code
    NGSS_CODE: /^MS-[A-Z]{2,3}\d-\d+$/,

    // SEP code (Science & Engineering Practices)
    SEP_CODE: /^SEP-[1-8]$/,

    // CCC code (Crosscutting Concepts)
    CCC_CODE: /^CCC-[1-7]$/
  },

  // ==========================================================================
  // STATUS VALUES
  // ==========================================================================

  STATUS: {
    // Cycle status
    CYCLE: {
      COMPLETE: 'complete',
      IN_PROGRESS: 'in_progress',
      NOT_STARTED: 'not_started',
      LEGACY: 'legacy'
    },

    // Pipeline execution status
    PIPELINE: {
      PENDING: 'pending',
      RUNNING: 'running',
      COMPLETED: 'completed',
      FAILED: 'failed',
      PARTIAL: 'partial'
    },

    // Alert severity levels
    ALERT: {
      INFO: 'info',
      WARNING: 'warning',
      CRITICAL: 'critical'
    }
  },

  // ==========================================================================
  // ERROR CODES
  // ==========================================================================

  ERRORS: {
    // Configuration errors (1xx)
    CONFIG_NOT_FOUND: { code: 101, message: 'Configuration file not found' },
    CONFIG_INVALID: { code: 102, message: 'Configuration validation failed' },
    CONFIG_MISSING_KEY: { code: 103, message: 'Required configuration key missing' },

    // Form errors (2xx)
    FORM_NOT_FOUND: { code: 201, message: 'Google Form not found' },
    FORM_ACCESS_DENIED: { code: 202, message: 'No access to form' },
    FORM_INVALID_TYPE: { code: 203, message: 'Invalid form item type' },
    FORM_POINTS_ERROR: { code: 204, message: 'Cannot set points on this item type' },

    // Data errors (3xx)
    DATA_EMPTY: { code: 301, message: 'No data available' },
    DATA_CORRUPTED: { code: 302, message: 'Data structure invalid' },
    DATA_FETCH_FAILED: { code: 303, message: 'Failed to fetch data' },

    // Pipeline errors (4xx)
    PIPELINE_ABORTED: { code: 401, message: 'Pipeline execution aborted' },
    PIPELINE_DEPENDENCY: { code: 402, message: 'Pipeline dependency failed' },
    PIPELINE_TIMEOUT: { code: 403, message: 'Pipeline execution timed out' },

    // Trigger errors (5xx)
    TRIGGER_CONFLICT: { code: 501, message: 'Trigger scheduling conflict' },
    TRIGGER_LIMIT: { code: 502, message: 'Trigger limit exceeded' }
  },

  // ==========================================================================
  // TRIGGER CONFIGURATION
  // ==========================================================================

  TRIGGERS: {
    // Staggered schedule to prevent conflicts
    RESPONSE_COLLECTION: {
      handler: 'collectAllResponses',
      hour: 17,  // 5:00 PM
      minute: 30
    },
    DAILY_ORCHESTRATION: {
      handler: 'runDailyOrchestration',
      hour: 18,  // 6:00 PM (30 min after collection)
      minute: 0
    },
    WEEKLY_SUMMARY: {
      handler: 'generateWeeklySummary',
      dayOfWeek: 5,  // Friday
      hour: 16
    }
  },

  // ==========================================================================
  // UI CONSTANTS
  // ==========================================================================

  UI: {
    // Minimum touch target size (accessibility)
    MIN_TOUCH_SIZE: 48,

    // Form validation minimum lengths
    MIN_EXPLANATION_LENGTH: 50,
    MIN_QUESTION_LENGTH: 30,

    // Timeout values (milliseconds)
    FORM_TIMEOUT: 30000,
    DATA_FETCH_TIMEOUT: 60000,
    PIPELINE_TIMEOUT: 300000
  },

  // ==========================================================================
  // PEDAGOGICAL CONSTANTS
  // ==========================================================================

  PEDAGOGY: {
    // NGSS Three Dimensions
    THREE_DIMENSIONS: {
      SEP: 'Science & Engineering Practices',
      DCI: 'Disciplinary Core Ideas',
      CCC: 'Crosscutting Concepts'
    },

    // SEP codes and names
    SEP: {
      'SEP-1': 'Asking Questions',
      'SEP-2': 'Developing Models',
      'SEP-3': 'Planning Investigations',
      'SEP-4': 'Analyzing Data',
      'SEP-5': 'Using Math',
      'SEP-6': 'Constructing Explanations',
      'SEP-7': 'Engaging in Argument',
      'SEP-8': 'Obtaining Information'
    },

    // CCC codes and names
    CCC: {
      'CCC-1': 'Patterns',
      'CCC-2': 'Cause and Effect',
      'CCC-3': 'Scale, Proportion, Quantity',
      'CCC-4': 'Systems and Models',
      'CCC-5': 'Energy and Matter',
      'CCC-6': 'Structure and Function',
      'CCC-7': 'Stability and Change'
    },

    // Exit ticket structure
    EXIT_TICKET_STRUCTURE: {
      NEW_QUESTIONS: 2,
      SPIRAL_QUESTIONS: 2,
      INTEGRATION_QUESTIONS: 1,
      SEP1_QUESTIONS: 1
    }
  },

  // ==========================================================================
  // FILE STRUCTURE
  // ==========================================================================

  PATHS: {
    CONFIG: 'config/',
    TEMPLATES: 'templates/',
    CONTENT: 'content/',
    DATA: 'data/',
    SHARED: 'shared/',
    SCRIPTS: 'scripts/',

    // Output subdirectories
    OUTPUT_RESPONSES: 'data/aggregation/output/responses/',
    OUTPUT_ANALYSIS: 'data/aggregation/output/analysis/',
    OUTPUT_MTSS: 'data/mtss/output/'
  },

  // ==========================================================================
  // HELPER METHODS
  // ==========================================================================

  /**
   * Check if a form item type is auto-gradeable
   * @param {string} itemType - The form item type
   * @returns {boolean} True if auto-gradeable
   */
  isAutoGradeable: function(itemType) {
    return this.FORMS_API.GRADEABLE_TYPES.includes(itemType);
  },

  /**
   * Get error by code
   * @param {number} code - Error code
   * @returns {Object|null} Error object or null
   */
  getError: function(code) {
    for (var key in this.ERRORS) {
      if (this.ERRORS[key].code === code) {
        return this.ERRORS[key];
      }
    }
    return null;
  },

  /**
   * Validate question ID format
   * @param {string} id - Question ID to validate
   * @returns {boolean} True if valid
   */
  isValidQuestionId: function(id) {
    return this.PATTERNS.QUESTION_ID.test(id);
  },

  /**
   * Get SEP name by code
   * @param {string} code - SEP code (e.g., 'SEP-1')
   * @returns {string} SEP name or empty string
   */
  getSEPName: function(code) {
    return this.PEDAGOGY.SEP[code] || '';
  },

  /**
   * Get CCC name by code
   * @param {string} code - CCC code (e.g., 'CCC-1')
   * @returns {string} CCC name or empty string
   */
  getCCCName: function(code) {
    return this.PEDAGOGY.CCC[code] || '';
  }
};

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Constants: Constants };
}
