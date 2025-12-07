/**
 * ============================================================================
 * TRIGGER MANAGER
 * ============================================================================
 *
 * CENTRALIZED TRIGGER COORDINATION
 *
 * This module manages all time-based triggers to prevent:
 * - Race conditions (multiple triggers at same time)
 * - Lock contention on shared resources
 * - Duplicate trigger registration
 *
 * TRIGGER SCHEDULE (staggered to prevent conflicts):
 *   5:30 PM - Response Collection
 *   6:00 PM - Daily Orchestration (after collection completes)
 *   Friday 4:00 PM - Weekly Summary
 *
 * USAGE:
 *   TriggerManager.setupAllTriggers();      // Set up all triggers
 *   TriggerManager.clearAllTriggers();      // Remove all triggers
 *   TriggerManager.listTriggers();          // View current triggers
 *
 * Version: 3.0.0
 * Last Updated: December 2025
 * ============================================================================
 */

var TriggerManager = {

  // ==========================================================================
  // TRIGGER DEFINITIONS
  // ==========================================================================

  /**
   * All managed triggers with their schedules
   * Staggered to prevent conflicts
   */
  TRIGGERS: {
    responseCollection: {
      handler: 'collectAllResponses',
      description: 'Fetch all form responses',
      schedule: {
        type: 'daily',
        hour: 17,    // 5:00 PM
        minute: 30   // :30
      },
      priority: 1    // Runs first
    },

    dailyOrchestration: {
      handler: 'runDailyOrchestration',
      description: 'Run complete data pipeline',
      schedule: {
        type: 'daily',
        hour: 18,    // 6:00 PM (30 min after collection)
        minute: 0
      },
      priority: 2    // Runs after collection
    },

    weeklySummary: {
      handler: 'generateWeeklySummary',
      description: 'Generate weekly analysis report',
      schedule: {
        type: 'weekly',
        dayOfWeek: ScriptApp.WeekDay.FRIDAY,
        hour: 16     // 4:00 PM Friday
      },
      priority: 3
    }
  },

  // ==========================================================================
  // SETUP METHODS
  // ==========================================================================

  /**
   * Set up all triggers with proper staggering
   * Clears existing triggers first to prevent duplicates
   */
  setupAllTriggers: function() {
    Logger.log('TriggerManager: Setting up all triggers...');

    // Clear existing managed triggers
    this.clearAllTriggers();

    var results = {
      success: [],
      failed: []
    };

    // Create triggers in priority order
    var triggerNames = Object.keys(this.TRIGGERS);
    triggerNames.sort(function(a, b) {
      return TriggerManager.TRIGGERS[a].priority - TriggerManager.TRIGGERS[b].priority;
    });

    triggerNames.forEach(function(name) {
      var config = TriggerManager.TRIGGERS[name];

      try {
        TriggerManager._createTrigger(config);
        results.success.push(name);
        Logger.log('  Created trigger: ' + name + ' (' + config.handler + ')');
      } catch (e) {
        results.failed.push({ name: name, error: e.message });
        Logger.log('  FAILED: ' + name + ' - ' + e.message);
      }
    });

    Logger.log('TriggerManager: Setup complete');
    Logger.log('  Success: ' + results.success.length);
    Logger.log('  Failed: ' + results.failed.length);

    return results;
  },

  /**
   * Clear all managed triggers
   */
  clearAllTriggers: function() {
    Logger.log('TriggerManager: Clearing existing triggers...');

    var handlers = Object.keys(this.TRIGGERS).map(function(name) {
      return TriggerManager.TRIGGERS[name].handler;
    });

    var triggers = ScriptApp.getProjectTriggers();
    var removed = 0;

    triggers.forEach(function(trigger) {
      if (handlers.includes(trigger.getHandlerFunction())) {
        ScriptApp.deleteTrigger(trigger);
        removed++;
      }
    });

    Logger.log('TriggerManager: Removed ' + removed + ' trigger(s)');
    return removed;
  },

  /**
   * Create a single trigger from configuration
   * @private
   */
  _createTrigger: function(config) {
    var builder = ScriptApp.newTrigger(config.handler)
      .timeBased();

    if (config.schedule.type === 'daily') {
      builder = builder
        .atHour(config.schedule.hour)
        .everyDays(1);

      // Note: Apps Script doesn't support minute-level precision for daily triggers
      // The trigger will run sometime during the specified hour
      // We use the hour offset to achieve staggering

    } else if (config.schedule.type === 'weekly') {
      builder = builder
        .onWeekDay(config.schedule.dayOfWeek)
        .atHour(config.schedule.hour);
    }

    builder.create();
  },

  // ==========================================================================
  // QUERY METHODS
  // ==========================================================================

  /**
   * List all current triggers
   * @returns {Object[]} Array of trigger info objects
   */
  listTriggers: function() {
    var triggers = ScriptApp.getProjectTriggers();
    var handlers = Object.keys(this.TRIGGERS).map(function(name) {
      return TriggerManager.TRIGGERS[name].handler;
    });

    var info = triggers.map(function(trigger) {
      return {
        handler: trigger.getHandlerFunction(),
        type: trigger.getTriggerSource().toString(),
        isManaged: handlers.includes(trigger.getHandlerFunction())
      };
    });

    Logger.log('Current triggers:');
    info.forEach(function(t) {
      Logger.log('  - ' + t.handler + ' (' + (t.isManaged ? 'managed' : 'external') + ')');
    });

    return info;
  },

  /**
   * Check if a specific trigger exists
   * @param {string} handlerName - Function name to check
   * @returns {boolean} True if trigger exists
   */
  triggerExists: function(handlerName) {
    var triggers = ScriptApp.getProjectTriggers();
    return triggers.some(function(trigger) {
      return trigger.getHandlerFunction() === handlerName;
    });
  },

  // ==========================================================================
  // INDIVIDUAL TRIGGER METHODS
  // ==========================================================================

  /**
   * Setup only the response collection trigger
   */
  setupResponseCollectionTrigger: function() {
    this._removeTriggerByHandler('collectAllResponses');
    this._createTrigger(this.TRIGGERS.responseCollection);
    Logger.log('Response collection trigger set for 5:30 PM daily');
  },

  /**
   * Setup only the daily orchestration trigger
   */
  setupOrchestrationTrigger: function() {
    this._removeTriggerByHandler('runDailyOrchestration');
    this._createTrigger(this.TRIGGERS.dailyOrchestration);
    Logger.log('Daily orchestration trigger set for 6:00 PM daily');
  },

  /**
   * Setup only the weekly summary trigger
   */
  setupWeeklySummaryTrigger: function() {
    this._removeTriggerByHandler('generateWeeklySummary');
    this._createTrigger(this.TRIGGERS.weeklySummary);
    Logger.log('Weekly summary trigger set for Friday 4:00 PM');
  },

  /**
   * Remove trigger by handler name
   * @private
   */
  _removeTriggerByHandler: function(handlerName) {
    ScriptApp.getProjectTriggers().forEach(function(trigger) {
      if (trigger.getHandlerFunction() === handlerName) {
        ScriptApp.deleteTrigger(trigger);
      }
    });
  },

  // ==========================================================================
  // VALIDATION
  // ==========================================================================

  /**
   * Validate trigger schedule for conflicts
   * @returns {Object} Validation result
   */
  validateSchedule: function() {
    var issues = [];

    // Check for time conflicts
    var schedules = [];
    Object.keys(this.TRIGGERS).forEach(function(name) {
      var config = TriggerManager.TRIGGERS[name];
      if (config.schedule.type === 'daily') {
        schedules.push({
          name: name,
          hour: config.schedule.hour,
          minute: config.schedule.minute || 0
        });
      }
    });

    // Check for same-hour conflicts
    var hourCounts = {};
    schedules.forEach(function(s) {
      hourCounts[s.hour] = (hourCounts[s.hour] || 0) + 1;
    });

    Object.keys(hourCounts).forEach(function(hour) {
      if (hourCounts[hour] > 1) {
        issues.push('Multiple triggers scheduled for hour ' + hour + ':00');
      }
    });

    // Check for dependency ordering
    var orchestrationConfig = this.TRIGGERS.dailyOrchestration;
    var collectionConfig = this.TRIGGERS.responseCollection;

    if (orchestrationConfig.schedule.hour <= collectionConfig.schedule.hour) {
      issues.push('Orchestration should run AFTER response collection');
    }

    return {
      valid: issues.length === 0,
      issues: issues
    };
  },

  // ==========================================================================
  // STATUS REPORTING
  // ==========================================================================

  /**
   * Get status report for all triggers
   * @returns {Object} Status report
   */
  getStatus: function() {
    var existingTriggers = ScriptApp.getProjectTriggers();
    var managed = this.TRIGGERS;

    var status = {
      timestamp: new Date().toISOString(),
      totalTriggers: existingTriggers.length,
      managedTriggers: {},
      unmanagedTriggers: []
    };

    var managedHandlers = Object.keys(managed).map(function(name) {
      return managed[name].handler;
    });

    existingTriggers.forEach(function(trigger) {
      var handler = trigger.getHandlerFunction();
      if (managedHandlers.includes(handler)) {
        // Find which managed trigger this is
        Object.keys(managed).forEach(function(name) {
          if (managed[name].handler === handler) {
            status.managedTriggers[name] = {
              handler: handler,
              active: true,
              schedule: managed[name].schedule
            };
          }
        });
      } else {
        status.unmanagedTriggers.push(handler);
      }
    });

    // Check for missing triggers
    Object.keys(managed).forEach(function(name) {
      if (!status.managedTriggers[name]) {
        status.managedTriggers[name] = {
          handler: managed[name].handler,
          active: false,
          schedule: managed[name].schedule
        };
      }
    });

    return status;
  }
};

// ==========================================================================
// STANDALONE FUNCTIONS (for trigger handlers)
// ==========================================================================

/**
 * Initialize all triggers (run once)
 */
function initializeTriggers() {
  return TriggerManager.setupAllTriggers();
}

/**
 * Remove all triggers
 */
function removeAllTriggers() {
  return TriggerManager.clearAllTriggers();
}

/**
 * Show trigger status
 */
function showTriggerStatus() {
  var status = TriggerManager.getStatus();
  Logger.log(JSON.stringify(status, null, 2));
  return status;
}
