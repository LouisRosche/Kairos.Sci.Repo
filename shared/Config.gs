/**
 * ============================================================================
 * CENTRALIZED CONFIGURATION MODULE
 * ============================================================================
 *
 * SINGLE SOURCE OF TRUTH for all system configuration.
 * All modules MUST use this module to access configuration values.
 *
 * This module loads configuration from config/master-config.json and provides
 * validated, type-safe access to all configuration values.
 *
 * USAGE:
 *   const mtss = Config.getMTSS();
 *   const assessment = Config.getAssessment();
 *   const currentCycle = Config.getCurrentCycle();
 *
 * DO NOT:
 *   - Define local const MTSS_TIERS = {...}
 *   - Define local const POINTS = {...}
 *   - Define local const HUB_CONFIG = {...}
 *   - Duplicate any values from master-config.json
 *
 * Version: 3.0.0
 * Last Updated: December 2025
 * ============================================================================
 */

/**
 * Cached configuration (loaded once per execution)
 * @private
 */
var _configCache = null;

/**
 * Runtime configuration (can be set programmatically)
 * @private
 */
var _runtimeConfig = {
  currentCycle: null,
  currentWeek: null,
  hubSheetId: null,
  outputFolderId: null
};

/**
 * Configuration namespace
 */
var Config = {

  // ==========================================================================
  // CORE CONFIGURATION LOADERS
  // ==========================================================================

  /**
   * Load and cache the master configuration
   * @returns {Object} The complete master configuration
   */
  load: function() {
    if (_configCache) {
      return _configCache;
    }

    try {
      // Try to load from Drive
      const configFiles = DriveApp.getFilesByName('master-config.json');
      if (configFiles.hasNext()) {
        const file = configFiles.next();
        _configCache = JSON.parse(file.getBlob().getDataAsString());
        Logger.log('Config: Loaded from master-config.json');
      } else {
        // Fallback to embedded defaults
        _configCache = this._getDefaults();
        Logger.log('Config: Using embedded defaults');
      }

      // Validate configuration
      const validation = this.validate(_configCache);
      if (!validation.valid) {
        Logger.log('Config validation errors: ' + validation.errors.join(', '));
      }

      return _configCache;
    } catch (e) {
      Logger.log('Config load error: ' + e.message);
      _configCache = this._getDefaults();
      return _configCache;
    }
  },

  /**
   * Force reload configuration (clears cache)
   */
  reload: function() {
    _configCache = null;
    return this.load();
  },

  /**
   * Validate configuration structure
   * @param {Object} config - Configuration to validate
   * @returns {Object} {valid: boolean, errors: string[]}
   */
  validate: function(config) {
    const errors = [];

    // Required top-level keys
    const required = ['version', 'school', 'grades', 'cycles', 'assessment', 'mtss'];
    required.forEach(key => {
      if (!config[key]) {
        errors.push('Missing required key: ' + key);
      }
    });

    // Validate MTSS thresholds
    if (config.mtss && config.mtss.tiers) {
      ['1', '2', '3'].forEach(tier => {
        if (!config.mtss.tiers[tier]) {
          errors.push('Missing MTSS tier: ' + tier);
        } else if (!config.mtss.tiers[tier].scoreRange) {
          errors.push('Missing scoreRange for tier ' + tier);
        }
      });
    }

    // Validate assessment structure
    if (config.assessment && config.assessment.formStructure) {
      const forms = ['hook', 'station1', 'station2', 'station3', 'exitTicket'];
      forms.forEach(form => {
        if (!config.assessment.formStructure[form]) {
          errors.push('Missing form structure: ' + form);
        }
      });
    }

    return {
      valid: errors.length === 0,
      errors: errors
    };
  },

  // ==========================================================================
  // MTSS CONFIGURATION
  // ==========================================================================

  /**
   * Get MTSS configuration
   * @returns {Object} MTSS tiers and thresholds
   */
  getMTSS: function() {
    const config = this.load();
    return config.mtss;
  },

  /**
   * Get MTSS tier thresholds as simple numbers
   * @returns {Object} {tier1Min, tier2Min, tier2Max, tier3Max}
   */
  getMTSSThresholds: function() {
    const mtss = this.getMTSS();
    return {
      tier1Min: mtss.tiers['1'].scoreRange.min,
      tier1Max: mtss.tiers['1'].scoreRange.max,
      tier2Min: mtss.tiers['2'].scoreRange.min,
      tier2Max: mtss.tiers['2'].scoreRange.max,
      tier3Min: mtss.tiers['3'].scoreRange.min,
      tier3Max: mtss.tiers['3'].scoreRange.max,
      misconceptionAlert: mtss.alerts.misconceptionThreshold,
      wholeClassReteach: mtss.alerts.wholeClassReteachThreshold,
      spiralEffectivenessMin: mtss.alerts.spiralEffectivenessMin
    };
  },

  /**
   * Determine tier for a given percentage score
   * @param {number} percentage - Score as percentage (0-100)
   * @returns {number} Tier number (1, 2, or 3)
   */
  getTierForScore: function(percentage) {
    const thresholds = this.getMTSSThresholds();
    if (percentage >= thresholds.tier1Min) return 1;
    if (percentage >= thresholds.tier2Min) return 2;
    return 3;
  },

  // ==========================================================================
  // ASSESSMENT CONFIGURATION
  // ==========================================================================

  /**
   * Get assessment configuration
   * @returns {Object} Assessment structure and settings
   */
  getAssessment: function() {
    const config = this.load();
    return config.assessment;
  },

  /**
   * Get point values for all form types
   * @returns {Object} {hook, station1, station2, station3, exitTicket}
   */
  getFormPoints: function() {
    const assessment = this.getAssessment();
    const formStructure = assessment.formStructure;

    return {
      hook: formStructure.hook.points,
      station1: formStructure.station1.points,
      station2: formStructure.station2.points,
      station3: formStructure.station3.points,
      exitTicket: formStructure.exitTicket.points,
      total: formStructure.hook.points +
             formStructure.station1.points +
             formStructure.station2.points +
             formStructure.station3.points +
             formStructure.exitTicket.points
    };
  },

  /**
   * Get form durations in minutes
   * @returns {Object} {hook, station1, station2, station3, exitTicket}
   */
  getFormDurations: function() {
    const assessment = this.getAssessment();
    const formStructure = assessment.formStructure;

    return {
      hook: formStructure.hook.duration,
      station1: formStructure.station1.duration,
      station2: formStructure.station2.duration,
      station3: formStructure.station3.duration,
      exitTicket: formStructure.exitTicket.duration
    };
  },

  // ==========================================================================
  // CYCLE CONFIGURATION
  // ==========================================================================

  /**
   * Get cycles configuration
   * @returns {Object} Cycle range and structure
   */
  getCycles: function() {
    const config = this.load();
    return config.cycles;
  },

  /**
   * Get current active cycle (can be set at runtime)
   * @returns {number} Current cycle number
   */
  getCurrentCycle: function() {
    if (_runtimeConfig.currentCycle !== null) {
      return _runtimeConfig.currentCycle;
    }

    const config = this.load();
    // Default to first active cycle
    if (config.activeCycles && config.activeCycles.length > 0) {
      const cycleName = config.activeCycles[0];
      return parseInt(cycleName.replace('cycle', ''));
    }
    return 3; // Default fallback
  },

  /**
   * Get current week (can be set at runtime)
   * @returns {number} Current week number (1-3)
   */
  getCurrentWeek: function() {
    if (_runtimeConfig.currentWeek !== null) {
      return _runtimeConfig.currentWeek;
    }
    return 1; // Default fallback
  },

  /**
   * Set current cycle and week (for runtime override)
   * @param {number} cycle - Cycle number
   * @param {number} week - Week number (1-3)
   */
  setCurrentPeriod: function(cycle, week) {
    _runtimeConfig.currentCycle = cycle;
    _runtimeConfig.currentWeek = week;
  },

  /**
   * Get list of active cycles
   * @returns {number[]} Array of active cycle numbers
   */
  getActiveCycles: function() {
    const config = this.load();
    if (!config.activeCycles) return [3];

    return config.activeCycles.map(name =>
      parseInt(name.replace('cycle', ''))
    );
  },

  /**
   * Get all form types for a week
   * @returns {string[]} Array of form type names
   */
  getFormTypes: function() {
    return ['hook', 'station1', 'station2', 'station3', 'exitTicket'];
  },

  // ==========================================================================
  // GRADE CONFIGURATION
  // ==========================================================================

  /**
   * Get grades configuration
   * @returns {Object} Grade definitions
   */
  getGrades: function() {
    const config = this.load();
    return config.grades;
  },

  /**
   * Get list of active grades as numbers
   * @returns {number[]} Array of grade numbers [7, 8]
   */
  getActiveGrades: function() {
    const grades = this.getGrades();
    return Object.keys(grades).map(g => parseInt(g));
  },

  // ==========================================================================
  // PLATFORM CONFIGURATION
  // ==========================================================================

  /**
   * Get platform integrations configuration
   * @returns {Object} Platform settings
   */
  getPlatforms: function() {
    const config = this.load();
    return config.platforms || {};
  },

  /**
   * Get form security settings
   * @returns {Object} Form security configuration
   */
  getFormSettings: function() {
    const config = this.load();
    return config.formSettings || {};
  },

  // ==========================================================================
  // RUNTIME CONFIGURATION
  // ==========================================================================

  /**
   * Set hub sheet ID (runtime)
   * @param {string} sheetId - Google Sheets ID
   */
  setHubSheetId: function(sheetId) {
    _runtimeConfig.hubSheetId = sheetId;
  },

  /**
   * Get hub sheet ID
   * @returns {string|null} Hub sheet ID
   */
  getHubSheetId: function() {
    return _runtimeConfig.hubSheetId;
  },

  /**
   * Set output folder ID (runtime)
   * @param {string} folderId - Google Drive folder ID
   */
  setOutputFolderId: function(folderId) {
    _runtimeConfig.outputFolderId = folderId;
  },

  /**
   * Get output folder ID
   * @returns {string|null} Output folder ID
   */
  getOutputFolderId: function() {
    return _runtimeConfig.outputFolderId;
  },

  // ==========================================================================
  // NAMING CONVENTIONS
  // ==========================================================================

  /**
   * Get file naming conventions
   * @returns {Object} Naming patterns
   */
  getNaming: function() {
    const config = this.load();
    return {
      file: config.fileNaming || {},
      form: config.formNaming || {},
      question: config.questionIds || {}
    };
  },

  /**
   * Generate form name following convention
   * @param {number} grade - Grade number
   * @param {number} cycle - Cycle number
   * @param {number} week - Week number
   * @param {string} station - Station type
   * @param {string} title - Form title
   * @returns {string} Formatted form name
   */
  formatFormName: function(grade, cycle, week, station, title) {
    const points = this.getFormPoints()[station] || 0;
    return 'G' + grade + '.C' + cycle + '.W' + week + ': ' +
           this._formatStationName(station) + ' - ' + title +
           ' [' + points + ' pts]';
  },

  /**
   * Generate question ID following convention
   * @param {number} grade - Grade number
   * @param {number} cycle - Cycle number
   * @param {number} week - Week number
   * @param {string} station - Station type
   * @param {number} questionNum - Question number
   * @returns {string} Formatted question ID
   */
  formatQuestionId: function(grade, cycle, week, station, questionNum) {
    return 'g' + grade + '_c' + cycle + '_w' + week + '_' +
           station + '_q' + questionNum;
  },

  // ==========================================================================
  // PRIVATE HELPERS
  // ==========================================================================

  /**
   * Format station name for display
   * @private
   */
  _formatStationName: function(station) {
    const names = {
      hook: 'Hook',
      station1: 'Station 1',
      station2: 'Station 2',
      station3: 'Station 3',
      exitTicket: 'Exit Ticket'
    };
    return names[station] || station;
  },

  /**
   * Get embedded default configuration
   * @private
   */
  _getDefaults: function() {
    return {
      version: '3.0.0',
      school: {
        name: 'KAMS',
        fullName: 'Knowledge Academy Middle School',
        academicYear: '2025-2026'
      },
      grades: {
        '7': { name: 'Grade 7', subject: 'Life & Earth Science' },
        '8': { name: 'Grade 8', subject: 'Physical Science' }
      },
      cycles: {
        range: { start: 3, end: 10 },
        weeksPerCycle: 3,
        pointsPerWeek: 100,
        formsPerWeek: 5
      },
      assessment: {
        formStructure: {
          hook: { points: 12, duration: 10 },
          station1: { points: 20, duration: 18 },
          station2: { points: 20, duration: 15 },
          station3: { points: 25, duration: 20 },
          exitTicket: { points: 23, duration: 15 }
        }
      },
      mtss: {
        tiers: {
          '1': { name: 'Universal', scoreRange: { min: 70, max: 100 } },
          '2': { name: 'Targeted', scoreRange: { min: 50, max: 69 } },
          '3': { name: 'Intensive', scoreRange: { min: 0, max: 49 } }
        },
        alerts: {
          misconceptionThreshold: 30,
          wholeClassReteachThreshold: 40,
          spiralEffectivenessMin: 60
        }
      },
      activeCycles: ['cycle03', 'cycle04']
    };
  }
};

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Config: Config };
}
