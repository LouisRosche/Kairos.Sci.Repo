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

  /**
   * Get misconception tracking configuration
   * Replaces local MISCONCEPTION_CONFIG in data/analysis/MisconceptionTracker.gs
   * @returns {Object} {alertThreshold, criticalThreshold, trackingWindow}
   */
  getMisconceptionConfig: function() {
    const mtss = this.getMTSS();
    return {
      alertThreshold: mtss.alerts.misconceptionThreshold,
      criticalThreshold: mtss.alerts.criticalMisconceptionThreshold || 50,
      trackingWindow: mtss.misconceptionTracking ? mtss.misconceptionTracking.trackingWindowWeeks : 3
    };
  },

  /**
   * Get spiral effectiveness configuration
   * Replaces local SPIRAL_CONFIG in data/analysis/SpiralEffectiveness.gs
   * @returns {Object} {minEffectiveness, improvementTarget, questionsPerExit}
   */
  getSpiralConfig: function() {
    const mtss = this.getMTSS();
    const assessment = this.getAssessment();
    return {
      minEffectiveness: mtss.alerts.spiralEffectivenessMin || 60,
      improvementTarget: mtss.spiral ? mtss.spiral.improvementTarget : 10,
      questionsPerExit: assessment.spiralStructure ? assessment.spiralStructure.questionsPerExit : 2
    };
  },

  /**
   * Get intervention grouping configuration
   * Replaces local GROUPING_CONFIG in data/mtss/InterventionGrouping.gs
   * @returns {Object} {maxTier2GroupSize, maxTier3GroupSize, minGroupSize, similarityThreshold, priorityStandards}
   */
  getGroupingConfig: function() {
    const mtss = this.getMTSS();
    const grouping = mtss.grouping || {};
    return {
      maxTier2GroupSize: grouping.maxTier2GroupSize || 5,
      maxTier3GroupSize: grouping.maxTier3GroupSize || 3,
      minGroupSize: grouping.minGroupSize || 2,
      similarityThreshold: grouping.similarityThreshold || 0.6,
      priorityStandards: grouping.priorityStandards || ['SEP-2', 'SEP-4']
    };
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
  // SEATING CONFIGURATION
  // ==========================================================================

  /**
   * Get seating system configuration
   * @returns {Object|null} Seating configuration or null if not defined
   */
  getSeatingConfig: function() {
    const config = this.load();
    return config.seating || null;
  },

  /**
   * Check if seating system is enabled
   * @returns {boolean} True if enabled
   */
  isSeatingEnabled: function() {
    const seating = this.getSeatingConfig();
    return seating && seating.enabled === true;
  },

  /**
   * Get grade configuration (periods, student count, etc.)
   * @returns {Object} Grade configuration keyed by grade number
   */
  getGradeConfig: function() {
    const config = this.load();
    return config.grades || {};
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
        range: { start: 3, end: 8 },
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
  },

  // ==========================================================================
  // AUTO CYCLE/WEEK DETECTION
  // ==========================================================================

  /**
   * Automatically detect current cycle and week from dates
   * Uses cycle configuration files to determine current period
   * @returns {Object} {cycle, week, found, source}
   */
  getCurrentPeriodFromDates: function() {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to start of day

    const result = {
      cycle: null,
      week: null,
      found: false,
      source: 'date_detection'
    };

    // Try to load cycle configurations
    const activeCycles = this.getActiveCycles();

    for (var i = 0; i < activeCycles.length; i++) {
      var cycleNum = activeCycles[i];
      var cycleConfig = this._loadCycleConfig(cycleNum);

      if (!cycleConfig || !cycleConfig.dates) continue;

      var startDate = this._parseDate(cycleConfig.dates.start);
      var endDate = this._parseDate(cycleConfig.dates.end);

      if (!startDate || !endDate) continue;

      // Check if today is within this cycle
      if (today >= startDate && today <= endDate) {
        result.cycle = cycleNum;
        result.found = true;

        // Determine which week within the cycle
        var daysSinceStart = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
        var weeksPerCycle = cycleConfig.weeksPerCycle || this.getCycles().weeksPerCycle || 3;
        var daysPerWeek = 7;

        // Calculate week number (1-indexed)
        result.week = Math.min(
          Math.floor(daysSinceStart / daysPerWeek) + 1,
          weeksPerCycle
        );

        Logger.log('Config: Auto-detected C' + result.cycle + 'W' + result.week + ' from dates');
        break;
      }
    }

    // Fallback to manual config if not found
    if (!result.found) {
      result.cycle = this.getCurrentCycle();
      result.week = this.getCurrentWeek();
      result.source = 'manual_config';
      Logger.log('Config: Using manual config C' + result.cycle + 'W' + result.week);
    }

    return result;
  },

  /**
   * Get cycle and week, preferring auto-detection
   * @returns {Object} {cycle, week}
   */
  getAutoCycleWeek: function() {
    // Check if runtime override is set
    if (_runtimeConfig.currentCycle !== null && _runtimeConfig.currentWeek !== null) {
      return {
        cycle: _runtimeConfig.currentCycle,
        week: _runtimeConfig.currentWeek,
        source: 'runtime_override'
      };
    }

    // Try auto-detection
    return this.getCurrentPeriodFromDates();
  },

  /**
   * Load cycle configuration file
   * @private
   */
  _loadCycleConfig: function(cycleNum) {
    try {
      // Try to load from Drive
      var paddedNum = cycleNum.toString().padStart(2, '0');
      var filename = 'cycle' + paddedNum + '.json';
      var files = DriveApp.getFilesByName(filename);

      if (files.hasNext()) {
        var file = files.next();
        return JSON.parse(file.getBlob().getDataAsString());
      }

      // Try loading from embedded config
      var config = this.load();
      if (config.cycleConfigs && config.cycleConfigs['cycle' + paddedNum]) {
        return config.cycleConfigs['cycle' + paddedNum];
      }

    } catch (e) {
      Logger.log('Config: Could not load cycle ' + cycleNum + ' config: ' + e.message);
    }

    return null;
  },

  /**
   * Parse date string to Date object
   * Handles formats: "YYYY-MM-DD", "Month DD, YYYY", etc.
   * @private
   */
  _parseDate: function(dateStr) {
    if (!dateStr) return null;

    try {
      // If it's already a Date object
      if (dateStr instanceof Date) return dateStr;

      // Try standard parsing
      var parsed = new Date(dateStr);
      if (!isNaN(parsed.getTime())) {
        return parsed;
      }

      // Try ISO format explicitly
      if (/^\d{4}-\d{2}-\d{2}/.test(dateStr)) {
        var parts = dateStr.split('-');
        return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
      }

    } catch (e) {
      Logger.log('Config: Could not parse date "' + dateStr + '": ' + e.message);
    }

    return null;
  },

  /**
   * Get upcoming cycle/week transitions
   * @returns {Array} Array of upcoming transitions
   */
  getUpcomingTransitions: function() {
    var transitions = [];
    var today = new Date();
    today.setHours(0, 0, 0, 0);

    var lookAheadDays = 14; // Look 2 weeks ahead
    var lookAhead = new Date(today.getTime() + lookAheadDays * 24 * 60 * 60 * 1000);

    var activeCycles = this.getActiveCycles();

    for (var i = 0; i < activeCycles.length; i++) {
      var cycleNum = activeCycles[i];
      var cycleConfig = this._loadCycleConfig(cycleNum);
      if (!cycleConfig || !cycleConfig.dates) continue;

      var startDate = this._parseDate(cycleConfig.dates.start);
      var endDate = this._parseDate(cycleConfig.dates.end);

      // Cycle start
      if (startDate && startDate > today && startDate <= lookAhead) {
        transitions.push({
          type: 'CYCLE_START',
          cycle: cycleNum,
          date: startDate,
          daysUntil: Math.ceil((startDate - today) / (1000 * 60 * 60 * 24))
        });
      }

      // Cycle end
      if (endDate && endDate > today && endDate <= lookAhead) {
        transitions.push({
          type: 'CYCLE_END',
          cycle: cycleNum,
          date: endDate,
          daysUntil: Math.ceil((endDate - today) / (1000 * 60 * 60 * 24))
        });
      }

      // Week transitions within current cycle
      if (startDate && endDate && today >= startDate && today <= endDate) {
        var weeksPerCycle = cycleConfig.weeksPerCycle || 3;
        var totalCycleDays = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
        var daysPerWeek = Math.floor(totalCycleDays / weeksPerCycle);

        for (var w = 1; w < weeksPerCycle; w++) {
          var weekTransition = new Date(startDate.getTime() + w * daysPerWeek * 24 * 60 * 60 * 1000);
          if (weekTransition > today && weekTransition <= lookAhead) {
            transitions.push({
              type: 'WEEK_TRANSITION',
              cycle: cycleNum,
              fromWeek: w,
              toWeek: w + 1,
              date: weekTransition,
              daysUntil: Math.ceil((weekTransition - today) / (1000 * 60 * 60 * 24))
            });
          }
        }
      }
    }

    // Sort by date
    transitions.sort(function(a, b) { return a.date - b.date; });

    return transitions;
  },

  /**
   * Check if we're in a cycle/week transition period
   * @returns {Object|null} Transition info if within 2 days of transition
   */
  checkTransitionPeriod: function() {
    var transitions = this.getUpcomingTransitions();
    var imminentTransition = null;

    for (var i = 0; i < transitions.length; i++) {
      if (transitions[i].daysUntil <= 2) {
        imminentTransition = transitions[i];
        break;
      }
    }

    if (imminentTransition) {
      return {
        inTransition: true,
        type: imminentTransition.type,
        cycle: imminentTransition.cycle,
        date: imminentTransition.date,
        daysUntil: imminentTransition.daysUntil,
        message: imminentTransition.type.replace(/_/g, ' ') + ' in ' + imminentTransition.daysUntil + ' day(s)'
      };
    }

    return { inTransition: false };
  }
};

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Config: Config };
}
