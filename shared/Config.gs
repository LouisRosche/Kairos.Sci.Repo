/**
 * ============================================================================
 * CONFIG.GS - Centralized Configuration Management
 * ============================================================================
 *
 * SINGLE SOURCE OF TRUTH for all runtime configuration values.
 *
 * This module reads from master-config.json and provides accessor methods
 * for all configurable values. Individual modules MUST use these methods
 * instead of defining local constants.
 *
 * DOCUMENTED IN: LESSONS-LEARNED.md (2025-12)
 *
 * Usage:
 *   var points = Config.getPointsForStation('hook');  // Returns 12
 *   var tier = Config.getTierForScore(65);            // Returns 2
 *   var thresholds = Config.getMTSSThresholds();      // Returns {tier1: 70, tier2: 50}
 *
 * ============================================================================
 */

var Config = (function() {

  // Cache for loaded configuration
  var _configCache = null;
  var _cacheTimestamp = null;
  var CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

  /**
   * Load master configuration from JSON
   * Uses caching to avoid repeated file reads
   * @private
   */
  function loadConfig_() {
    var now = new Date().getTime();

    // Return cached config if still valid
    if (_configCache && _cacheTimestamp && (now - _cacheTimestamp < CACHE_TTL_MS)) {
      return _configCache;
    }

    try {
      // In Apps Script context, we embed critical config values directly
      // This avoids file system dependencies in Google Apps Script
      _configCache = getEmbeddedConfig_();
      _cacheTimestamp = now;
      return _configCache;
    } catch (e) {
      Logger.log('Config load error: ' + e.message);
      // Return minimal fallback config
      return getFallbackConfig_();
    }
  }

  /**
   * Embedded configuration values from master-config.json
   * These are the SST values that should not be duplicated elsewhere
   * @private
   */
  function getEmbeddedConfig_() {
    return {
      version: '3.1.0',

      // Assessment structure - CANONICAL VALUES
      assessment: {
        formStructure: {
          hook:       { points: 12, duration: 10, questions: 5 },
          station1:   { points: 20, duration: 18, questions: 6 },
          station2:   { points: 20, duration: 15, questions: 5 },
          station3:   { points: 25, duration: 20, questions: 5 },
          exitTicket: { points: 23, duration: 15, questions: 6 }
        },
        totalPointsPerWeek: 100,
        targetAutoGradedPercent: { min: 30, max: 40 },
        spiralStructure: {
          questionsPerExit: 2,
          integrationQuestions: 1,
          sep1Questions: 1
        }
      },

      // MTSS tiers - CANONICAL THRESHOLDS
      mtss: {
        tiers: {
          1: { name: 'Universal',  min: 70, max: 100 },
          2: { name: 'Targeted',   min: 50, max: 69 },
          3: { name: 'Intensive',  min: 0,  max: 49 }
        },
        alerts: {
          misconceptionThreshold: 30,
          criticalMisconceptionThreshold: 50,
          wholeClassReteachThreshold: 40,
          spiralEffectivenessMin: 60
        },
        grouping: {
          maxTier2GroupSize: 5,
          maxTier3GroupSize: 3
        }
      },

      // Cycle configuration
      cycles: {
        active: ['cycle03', 'cycle04'],
        planned: ['cycle01', 'cycle05', 'cycle06', 'cycle07', 'cycle08'],
        legacy: ['cycle02'],
        weeksPerCycle: {
          cycle01: 8, cycle02: 5, cycle03: 3, cycle04: 6,
          cycle05: 3, cycle06: 5, cycle07: 4, cycle08: 4
        }
      },

      // Form settings - CANONICAL VALUES
      formSettings: {
        security: {
          requireLogin: true,
          collectEmail: true,
          limitOneResponse: true,
          allowEdits: true
        },
        display: {
          progressBar: true,
          shuffleQuestions: false
        }
      },

      // Grades configuration
      grades: {
        7: { subject: 'Life & Earth Science', periods: ['Period 2', 'Period 7'] },
        8: { subject: 'Physical Science', periods: ['Period 3', 'Period 5'] }
      }
    };
  }

  /**
   * Fallback configuration if loading fails
   * @private
   */
  function getFallbackConfig_() {
    Logger.log('WARNING: Using fallback configuration');
    return {
      version: 'fallback',
      assessment: {
        formStructure: {
          hook: { points: 12 }, station1: { points: 20 },
          station2: { points: 20 }, station3: { points: 25 },
          exitTicket: { points: 23 }
        },
        totalPointsPerWeek: 100
      },
      mtss: {
        tiers: { 1: { min: 70 }, 2: { min: 50 }, 3: { min: 0 } }
      }
    };
  }

  // ============================================================================
  // PUBLIC API
  // ============================================================================

  return {

    /**
     * Get version string
     */
    getVersion: function() {
      return loadConfig_().version;
    },

    // ------------------------------------------------------------------------
    // ASSESSMENT CONFIGURATION
    // ------------------------------------------------------------------------

    /**
     * Get point value for a station type
     * @param {string} stationType - hook, station1, station2, station3, exitTicket
     * @returns {number} Point value
     */
    getPointsForStation: function(stationType) {
      var config = loadConfig_();
      var station = config.assessment.formStructure[stationType];
      if (!station) {
        Logger.log('WARNING: Unknown station type: ' + stationType);
        return 0;
      }
      return station.points;
    },

    /**
     * Get all station point allocations
     * @returns {Object} {hook: 12, station1: 20, ...}
     */
    getPointAllocations: function() {
      var config = loadConfig_();
      var allocations = {};
      var structure = config.assessment.formStructure;
      for (var key in structure) {
        allocations[key] = structure[key].points;
      }
      return allocations;
    },

    /**
     * Get total points per week (should always be 100)
     * @returns {number}
     */
    getTotalPointsPerWeek: function() {
      return loadConfig_().assessment.totalPointsPerWeek;
    },

    /**
     * Get question count for a station type
     * @param {string} stationType
     * @returns {number}
     */
    getQuestionCount: function(stationType) {
      var config = loadConfig_();
      var station = config.assessment.formStructure[stationType];
      return station ? station.questions : 5;
    },

    /**
     * Get duration (minutes) for a station type
     * @param {string} stationType
     * @returns {number}
     */
    getDuration: function(stationType) {
      var config = loadConfig_();
      var station = config.assessment.formStructure[stationType];
      return station ? station.duration : 15;
    },

    /**
     * Get spiral structure requirements
     * @returns {Object} {questionsPerExit: 2, integrationQuestions: 1, sep1Questions: 1}
     */
    getSpiralStructure: function() {
      return loadConfig_().assessment.spiralStructure;
    },

    // ------------------------------------------------------------------------
    // MTSS CONFIGURATION
    // ------------------------------------------------------------------------

    /**
     * Get MTSS tier thresholds
     * @returns {Object} {tier1: 70, tier2: 50, tier3: 0}
     */
    getMTSSThresholds: function() {
      var tiers = loadConfig_().mtss.tiers;
      return {
        tier1: tiers[1].min,
        tier2: tiers[2].min,
        tier3: tiers[3].min
      };
    },

    /**
     * Get tier number for a given percentage score
     * @param {number} percentage - Score as percentage (0-100)
     * @returns {number} Tier number (1, 2, or 3)
     */
    getTierForScore: function(percentage) {
      var thresholds = this.getMTSSThresholds();
      if (percentage >= thresholds.tier1) return 1;
      if (percentage >= thresholds.tier2) return 2;
      return 3;
    },

    /**
     * Get tier name for a given tier number
     * @param {number} tier - 1, 2, or 3
     * @returns {string} 'Universal', 'Targeted', or 'Intensive'
     */
    getTierName: function(tier) {
      var tiers = loadConfig_().mtss.tiers;
      return tiers[tier] ? tiers[tier].name : 'Unknown';
    },

    /**
     * Get MTSS alert thresholds
     * @returns {Object}
     */
    getMTSSAlerts: function() {
      return loadConfig_().mtss.alerts;
    },

    /**
     * Get MTSS grouping limits
     * @returns {Object} {maxTier2GroupSize: 5, maxTier3GroupSize: 3}
     */
    getMTSSGrouping: function() {
      return loadConfig_().mtss.grouping;
    },

    // ------------------------------------------------------------------------
    // CYCLE CONFIGURATION
    // ------------------------------------------------------------------------

    /**
     * Get active cycles
     * @returns {Array} ['cycle03', 'cycle04']
     */
    getActiveCycles: function() {
      return loadConfig_().cycles.active;
    },

    /**
     * Get weeks per cycle
     * @param {string|number} cycle - 'cycle03' or 3
     * @returns {number}
     */
    getWeeksForCycle: function(cycle) {
      var config = loadConfig_();
      var key = typeof cycle === 'number' ?
        'cycle' + String(cycle).padStart(2, '0') : cycle;
      return config.cycles.weeksPerCycle[key] || 3;
    },

    /**
     * Check if a cycle is legacy (pre-v3.0 architecture)
     * @param {string|number} cycle
     * @returns {boolean}
     */
    isLegacyCycle: function(cycle) {
      var key = typeof cycle === 'number' ?
        'cycle' + String(cycle).padStart(2, '0') : cycle;
      return loadConfig_().cycles.legacy.indexOf(key) !== -1;
    },

    // ------------------------------------------------------------------------
    // FORM SETTINGS
    // ------------------------------------------------------------------------

    /**
     * Get form security settings
     * @returns {Object}
     */
    getFormSecuritySettings: function() {
      return loadConfig_().formSettings.security;
    },

    /**
     * Get form display settings
     * @returns {Object}
     */
    getFormDisplaySettings: function() {
      return loadConfig_().formSettings.display;
    },

    // ------------------------------------------------------------------------
    // GRADE CONFIGURATION
    // ------------------------------------------------------------------------

    /**
     * Get active grades
     * @returns {Array} [7, 8]
     */
    getActiveGrades: function() {
      return [7, 8];
    },

    /**
     * Get subject for a grade
     * @param {number} grade - 7 or 8
     * @returns {string}
     */
    getSubjectForGrade: function(grade) {
      var grades = loadConfig_().grades;
      return grades[grade] ? grades[grade].subject : 'Science';
    },

    // ------------------------------------------------------------------------
    // UTILITY
    // ------------------------------------------------------------------------

    /**
     * Force reload of configuration (clears cache)
     */
    reload: function() {
      _configCache = null;
      _cacheTimestamp = null;
      loadConfig_();
    },

    /**
     * Get full configuration (for debugging)
     * @returns {Object}
     */
    getFullConfig: function() {
      return loadConfig_();
    },

    /**
     * Validate that a point total equals expected weekly total
     * @param {Object} points - {hook: 12, station1: 20, ...}
     * @returns {Object} {valid: boolean, actual: number, expected: number}
     */
    validatePointTotal: function(points) {
      var total = 0;
      for (var key in points) {
        total += points[key];
      }
      var expected = this.getTotalPointsPerWeek();
      return {
        valid: total === expected,
        actual: total,
        expected: expected
      };
    }
  };
})();

// ============================================================================
// GLOBAL FUNCTION ALIASES (for backwards compatibility)
// ============================================================================

/**
 * Get tier for a score percentage
 * @deprecated Use Config.getTierForScore()
 */
function getTierForScore(percentage) {
  return Config.getTierForScore(percentage);
}

/**
 * Get MTSS thresholds
 * @deprecated Use Config.getMTSSThresholds()
 */
function getMTSSThresholds() {
  return Config.getMTSSThresholds();
}
