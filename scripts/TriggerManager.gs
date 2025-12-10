/**
 * ============================================================================
 * TRIGGER MANAGER
 * ============================================================================
 *
 * CENTRALIZED TRIGGER COORDINATION (CONSOLIDATED)
 *
 * This module manages all time-based triggers with MINIMIZED RUNS:
 * - Only 2 triggers instead of 5
 * - Aggregated notifications in single daily/weekly digest
 * - All related tasks run sequentially in one execution
 *
 * CONSOLIDATED TRIGGER SCHEDULE:
 *   6:00 PM Daily   - runDailyPipeline (collection + orchestration + health check)
 *   Friday 4:00 PM  - runWeeklyDigest (seating analysis + weekly summary)
 *
 * USAGE:
 *   TriggerManager.setupAllTriggers();      // Set up all triggers
 *   TriggerManager.clearAllTriggers();      // Remove all triggers
 *   TriggerManager.listTriggers();          // View current triggers
 *
 * Version: 4.0.0 (Consolidated)
 * Last Updated: December 2025
 * ============================================================================
 */

var TriggerManager = {

  // ==========================================================================
  // TRIGGER DEFINITIONS (CONSOLIDATED - Only 2 triggers!)
  // ==========================================================================

  /**
   * Consolidated triggers for minimal runs
   */
  TRIGGERS: {
    dailyPipeline: {
      handler: 'runDailyPipeline',
      description: 'Daily pipeline: collection + orchestration + health check',
      schedule: {
        type: 'daily',
        hour: 18,    // 6:00 PM
        minute: 0
      },
      priority: 1,
      includes: ['Response Collection', 'Data Orchestration', 'Health Check']
    },

    weeklyDigest: {
      handler: 'runWeeklyDigest',
      description: 'Weekly digest: seating analysis + summary + notifications',
      schedule: {
        type: 'weekly',
        dayOfWeek: ScriptApp.WeekDay.FRIDAY,
        hour: 16     // 4:00 PM Friday
      },
      priority: 2,
      includes: ['Seating Analysis', 'Weekly Summary', 'Aggregated Notifications']
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
  // HELPER METHODS
  // ==========================================================================

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

    // Check for time conflicts within daily triggers
    var dailySchedules = [];
    Object.keys(this.TRIGGERS).forEach(function(name) {
      var config = TriggerManager.TRIGGERS[name];
      if (config.schedule.type === 'daily') {
        dailySchedules.push({
          name: name,
          hour: config.schedule.hour,
          minute: config.schedule.minute || 0
        });
      }
    });

    // With consolidated triggers, we should have minimal conflicts
    // Just verify the configuration is valid
    Object.keys(this.TRIGGERS).forEach(function(name) {
      var config = TriggerManager.TRIGGERS[name];
      if (!config.handler || !config.schedule) {
        issues.push('Invalid trigger configuration: ' + name);
      }
    });

    return {
      valid: issues.length === 0,
      issues: issues,
      triggerCount: Object.keys(this.TRIGGERS).length,
      note: 'Consolidated to ' + Object.keys(this.TRIGGERS).length + ' triggers for minimal runs'
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

// ==========================================================================
// CONSOLIDATED PIPELINE HANDLERS
// ==========================================================================

/**
 * Notification aggregator - collects all notifications to send in one batch
 */
var NotificationAggregator = {
  _notifications: [],

  add: function(category, message, severity) {
    this._notifications.push({
      category: category,
      message: message,
      severity: severity || 'info',
      timestamp: new Date().toISOString()
    });
  },

  clear: function() {
    this._notifications = [];
  },

  getAll: function() {
    return this._notifications.slice();
  },

  formatDigest: function() {
    if (this._notifications.length === 0) {
      return 'No notifications to report.';
    }

    var grouped = {};
    this._notifications.forEach(function(n) {
      if (!grouped[n.category]) grouped[n.category] = [];
      grouped[n.category].push(n);
    });

    var lines = ['=== KAMS Science Notification Digest ===', ''];
    Object.keys(grouped).forEach(function(category) {
      lines.push('📌 ' + category.toUpperCase());
      grouped[category].forEach(function(n) {
        var prefix = n.severity === 'error' ? '❌' :
                     n.severity === 'warning' ? '⚠️' : '✓';
        lines.push('  ' + prefix + ' ' + n.message);
      });
      lines.push('');
    });

    return lines.join('\n');
  }
};

/**
 * DAILY PIPELINE (6:00 PM)
 * Consolidates: Response Collection + Data Orchestration + Health Check
 * Single run instead of 3 separate triggers
 */
function runDailyPipeline() {
  Logger.log('═══════════════════════════════════════════════════════════');
  Logger.log('  DAILY PIPELINE STARTED - ' + new Date().toISOString());
  Logger.log('═══════════════════════════════════════════════════════════');

  var startTime = new Date();
  NotificationAggregator.clear();

  var results = {
    timestamp: startTime.toISOString(),
    steps: {},
    errors: [],
    duration: null
  };

  // Step 1: Response Collection
  Logger.log('\n[1/3] RESPONSE COLLECTION');
  Logger.log('─────────────────────────');
  try {
    if (typeof collectAllResponses === 'function') {
      var collectionResult = collectAllResponses();
      results.steps.collection = {
        status: 'SUCCESS',
        formsProcessed: collectionResult.formsProcessed || 0,
        responsesCollected: collectionResult.responsesCollected || 0
      };
      NotificationAggregator.add('Collection',
        'Collected ' + (collectionResult.responsesCollected || 0) + ' responses from ' +
        (collectionResult.formsProcessed || 0) + ' forms');
      Logger.log('  ✓ Collected responses from ' + (collectionResult.formsProcessed || 0) + ' forms');
    } else {
      results.steps.collection = { status: 'SKIPPED', reason: 'collectAllResponses not available' };
      Logger.log('  ⊘ Skipped: collectAllResponses not available');
    }
  } catch (e) {
    results.steps.collection = { status: 'ERROR', error: e.message };
    results.errors.push('Collection: ' + e.message);
    NotificationAggregator.add('Collection', 'Failed: ' + e.message, 'error');
    Logger.log('  ✗ Error: ' + e.message);
  }

  // Step 2: Data Orchestration
  Logger.log('\n[2/3] DATA ORCHESTRATION');
  Logger.log('─────────────────────────');
  try {
    if (typeof runDailyOrchestration === 'function') {
      var orchResult = runDailyOrchestration();
      results.steps.orchestration = {
        status: orchResult.status || 'SUCCESS',
        stepsCompleted: orchResult.completedSteps || []
      };
      NotificationAggregator.add('Orchestration',
        'Completed ' + (orchResult.completedSteps || []).length + ' processing steps');
      Logger.log('  ✓ Orchestration completed');
    } else {
      results.steps.orchestration = { status: 'SKIPPED', reason: 'runDailyOrchestration not available' };
      Logger.log('  ⊘ Skipped: runDailyOrchestration not available');
    }
  } catch (e) {
    results.steps.orchestration = { status: 'ERROR', error: e.message };
    results.errors.push('Orchestration: ' + e.message);
    NotificationAggregator.add('Orchestration', 'Failed: ' + e.message, 'error');
    Logger.log('  ✗ Error: ' + e.message);
  }

  // Step 3: Health Check
  Logger.log('\n[3/3] HEALTH CHECK');
  Logger.log('─────────────────────────');
  try {
    var healthResult = runSystemHealthCheck();
    results.steps.healthCheck = {
      status: healthResult.overall,
      warnings: healthResult.warnings.length,
      errors: healthResult.errors.length
    };

    if (healthResult.overall !== 'HEALTHY') {
      NotificationAggregator.add('Health',
        'System status: ' + healthResult.overall + ' (' + healthResult.warnings.length + ' warnings)',
        healthResult.overall === 'UNHEALTHY' ? 'error' : 'warning');
    }
    Logger.log('  ✓ Health: ' + healthResult.overall);
  } catch (e) {
    results.steps.healthCheck = { status: 'ERROR', error: e.message };
    results.errors.push('Health check: ' + e.message);
    Logger.log('  ✗ Error: ' + e.message);
  }

  // Complete
  var duration = (new Date() - startTime) / 1000;
  results.duration = duration.toFixed(2) + 's';

  Logger.log('\n═══════════════════════════════════════════════════════════');
  Logger.log('  DAILY PIPELINE COMPLETE - ' + results.duration);
  Logger.log('  Errors: ' + results.errors.length);
  Logger.log('═══════════════════════════════════════════════════════════');

  // Log aggregated notifications
  if (NotificationAggregator.getAll().length > 0) {
    Logger.log('\n' + NotificationAggregator.formatDigest());
  }

  return results;
}

/**
 * WEEKLY DIGEST (Friday 4:00 PM)
 * Consolidates: Seating Analysis + Weekly Summary + Email Notification
 * Single run instead of 2 separate triggers
 */
function runWeeklyDigest() {
  Logger.log('═══════════════════════════════════════════════════════════');
  Logger.log('  WEEKLY DIGEST STARTED - ' + new Date().toISOString());
  Logger.log('═══════════════════════════════════════════════════════════');

  var startTime = new Date();
  NotificationAggregator.clear();

  var results = {
    timestamp: startTime.toISOString(),
    steps: {},
    errors: [],
    duration: null
  };

  // Step 1: Seating Analysis
  Logger.log('\n[1/3] SEATING ANALYSIS');
  Logger.log('─────────────────────────');
  try {
    var seatingResult = runWeeklySeatingAnalysis();
    results.steps.seating = {
      status: seatingResult.skipped ? 'SKIPPED' : 'SUCCESS',
      reportsGenerated: (seatingResult.reports || []).length,
      errors: (seatingResult.errors || []).length
    };

    if (!seatingResult.skipped) {
      NotificationAggregator.add('Seating',
        'Generated ' + (seatingResult.reports || []).length + ' seating reports');
    }
    Logger.log('  ✓ Seating analysis: ' + (seatingResult.reports || []).length + ' reports');
  } catch (e) {
    results.steps.seating = { status: 'ERROR', error: e.message };
    results.errors.push('Seating: ' + e.message);
    NotificationAggregator.add('Seating', 'Failed: ' + e.message, 'error');
    Logger.log('  ✗ Error: ' + e.message);
  }

  // Step 2: Weekly Summary
  Logger.log('\n[2/3] WEEKLY SUMMARY');
  Logger.log('─────────────────────────');
  try {
    if (typeof generateWeeklySummary === 'function') {
      var summaryResult = generateWeeklySummary();
      results.steps.summary = {
        status: 'SUCCESS',
        details: summaryResult
      };
      NotificationAggregator.add('Summary',
        'Weekly summary generated for current cycle');
      Logger.log('  ✓ Weekly summary generated');
    } else {
      results.steps.summary = { status: 'SKIPPED', reason: 'generateWeeklySummary not available' };
      Logger.log('  ⊘ Skipped: generateWeeklySummary not available');
    }
  } catch (e) {
    results.steps.summary = { status: 'ERROR', error: e.message };
    results.errors.push('Summary: ' + e.message);
    NotificationAggregator.add('Summary', 'Failed: ' + e.message, 'error');
    Logger.log('  ✗ Error: ' + e.message);
  }

  // Step 3: Send Aggregated Digest Email
  Logger.log('\n[3/3] NOTIFICATION DIGEST');
  Logger.log('─────────────────────────');
  try {
    var digest = NotificationAggregator.formatDigest();

    // Get current cycle/week for subject
    var cycleInfo = '';
    if (typeof Config !== 'undefined' && typeof Config.getCurrentCycle === 'function') {
      cycleInfo = 'C' + Config.getCurrentCycle() + ' W' + Config.getCurrentWeek();
    }

    var subject = 'KAMS Science Weekly Digest' + (cycleInfo ? ' - ' + cycleInfo : '');

    // Log the digest (email sending would go here if configured)
    Logger.log('Digest generated:');
    Logger.log(digest);

    results.steps.notification = {
      status: 'GENERATED',
      subject: subject,
      notificationCount: NotificationAggregator.getAll().length
    };

    // Uncomment to enable email sending:
    // var recipientEmail = Session.getEffectiveUser().getEmail();
    // MailApp.sendEmail(recipientEmail, subject, digest);
    // Logger.log('  ✓ Digest emailed to: ' + recipientEmail);

    Logger.log('  ✓ Digest ready (' + NotificationAggregator.getAll().length + ' items)');
  } catch (e) {
    results.steps.notification = { status: 'ERROR', error: e.message };
    results.errors.push('Notification: ' + e.message);
    Logger.log('  ✗ Error: ' + e.message);
  }

  // Complete
  var duration = (new Date() - startTime) / 1000;
  results.duration = duration.toFixed(2) + 's';

  Logger.log('\n═══════════════════════════════════════════════════════════');
  Logger.log('  WEEKLY DIGEST COMPLETE - ' + results.duration);
  Logger.log('  Errors: ' + results.errors.length);
  Logger.log('═══════════════════════════════════════════════════════════');

  return results;
}

// ==========================================================================
// SEATING ANALYSIS HANDLER
// ==========================================================================

/**
 * Weekly seating analysis - triggered Friday 3 PM
 * Analyzes seating patterns and generates recommendations for all periods
 */
function runWeeklySeatingAnalysis() {
  Logger.log('=== Weekly Seating Analysis Started ===');
  const startTime = new Date();

  const results = {
    timestamp: startTime.toISOString(),
    grades: [7, 8],
    periods: [1, 2, 3, 4, 5, 6],
    reports: [],
    errors: []
  };

  // Check if seating analyzer is available
  if (typeof generateSeatingReport !== 'function') {
    Logger.log('SeatingAnalyzer not available - skipping');
    results.skipped = true;
    results.reason = 'SeatingAnalyzer module not loaded';
    return results;
  }

  results.grades.forEach(function(grade) {
    results.periods.forEach(function(period) {
      try {
        const report = generateSeatingReport(grade, period);
        results.reports.push({
          grade: grade,
          period: period,
          status: report.status,
          summary: report.summary || null,
          topRecommendations: (report.topRecommendations || []).slice(0, 3)
        });

        if (report.status === 'SUCCESS') {
          Logger.log('G' + grade + ' P' + period + ': ' +
            report.summary.catalystPairsFound + ' catalyst pairs, ' +
            report.summary.distractionVectorsFound + ' distraction vectors');
        }
      } catch (e) {
        Logger.log('Error analyzing G' + grade + ' P' + period + ': ' + e.message);
        results.errors.push({
          grade: grade,
          period: period,
          error: e.message
        });
      }
    });
  });

  const duration = (new Date() - startTime) / 1000;
  Logger.log('=== Seating Analysis Complete (' + duration.toFixed(2) + 's) ===');
  Logger.log('Reports: ' + results.reports.length + ', Errors: ' + results.errors.length);

  // Save results
  try {
    if (typeof saveToJson === 'function') {
      saveToJson('seating-analysis-' + startTime.toISOString().split('T')[0] + '.json', results);
    }
  } catch (e) {
    Logger.log('Warning: Could not save seating analysis: ' + e.message);
  }

  return results;
}

// ==========================================================================
// HEALTH CHECK HANDLER
// ==========================================================================

/**
 * System health check - triggered daily at 7 AM
 * Verifies all components of the data pipeline are functioning
 */
function runSystemHealthCheck() {
  Logger.log('=== System Health Check Started ===');
  const startTime = new Date();

  const health = {
    timestamp: startTime.toISOString(),
    overall: 'HEALTHY',
    components: {},
    warnings: [],
    errors: []
  };

  // Check 1: Config module
  try {
    if (typeof Config !== 'undefined') {
      const currentCycle = Config.getCurrentCycle();
      const currentWeek = Config.getCurrentWeek();
      health.components.config = {
        status: 'OK',
        currentCycle: currentCycle,
        currentWeek: currentWeek
      };
      Logger.log('Config: OK (C' + currentCycle + ' W' + currentWeek + ')');
    } else {
      health.components.config = { status: 'MISSING' };
      health.warnings.push('Config module not loaded');
    }
  } catch (e) {
    health.components.config = { status: 'ERROR', error: e.message };
    health.errors.push('Config check failed: ' + e.message);
  }

  // Check 2: Form Registry
  try {
    if (typeof getFormRegistry === 'function') {
      const registry = getFormRegistry();
      const formCount = Object.keys(registry || {}).length;
      health.components.formRegistry = {
        status: formCount > 0 ? 'OK' : 'EMPTY',
        formCount: formCount
      };
      Logger.log('Form Registry: ' + (formCount > 0 ? 'OK (' + formCount + ' forms)' : 'EMPTY'));
    } else {
      health.components.formRegistry = { status: 'MISSING' };
      health.warnings.push('Form Registry not available');
    }
  } catch (e) {
    health.components.formRegistry = { status: 'ERROR', error: e.message };
    health.errors.push('Form Registry check failed: ' + e.message);
  }

  // Check 3: Hub Spreadsheet Access
  try {
    if (typeof getHubConfig === 'function') {
      const hubConfig = getHubConfig();
      if (hubConfig.hubSheetId) {
        // Try to open it
        const ss = SpreadsheetApp.openById(hubConfig.hubSheetId);
        health.components.hubSpreadsheet = {
          status: 'OK',
          name: ss.getName(),
          sheetCount: ss.getSheets().length
        };
        Logger.log('Hub Spreadsheet: OK (' + ss.getName() + ')');
      } else {
        health.components.hubSpreadsheet = { status: 'NOT_CONFIGURED' };
        health.warnings.push('Hub spreadsheet ID not configured');
      }
    } else {
      health.components.hubSpreadsheet = { status: 'MISSING' };
      health.warnings.push('Hub config not available');
    }
  } catch (e) {
    health.components.hubSpreadsheet = { status: 'ERROR', error: e.message };
    health.errors.push('Hub spreadsheet check failed: ' + e.message);
  }

  // Check 4: Trigger Status (consolidated triggers)
  try {
    const triggers = ScriptApp.getProjectTriggers();
    // Only 2 consolidated triggers needed: runDailyPipeline and runWeeklyDigest
    const managedCount = triggers.filter(function(t) {
      return ['runDailyPipeline', 'runWeeklyDigest'].includes(t.getHandlerFunction());
    }).length;

    health.components.triggers = {
      status: managedCount >= 2 ? 'OK' : 'INCOMPLETE',
      totalTriggers: triggers.length,
      managedTriggers: managedCount,
      expected: 2,
      note: 'Consolidated: runDailyPipeline (6PM) + runWeeklyDigest (Fri 4PM)'
    };
    Logger.log('Triggers: ' + (managedCount >= 2 ? 'OK' : 'INCOMPLETE') +
      ' (' + managedCount + '/2 managed, ' + triggers.length + ' total)');
  } catch (e) {
    health.components.triggers = { status: 'ERROR', error: e.message };
    health.errors.push('Trigger check failed: ' + e.message);
  }

  // Check 5: Recent Data (check if yesterday's orchestration ran)
  try {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const expectedFile = 'orchestration-' + yesterday.toISOString().split('T')[0] + '.json';

    // This is a basic check - in production you'd check if the file exists
    health.components.recentData = {
      status: 'CHECK_MANUALLY',
      note: 'Verify ' + expectedFile + ' exists in output folder'
    };
    Logger.log('Recent Data: Check ' + expectedFile + ' manually');
  } catch (e) {
    health.components.recentData = { status: 'ERROR', error: e.message };
  }

  // Determine overall health
  const errorCount = health.errors.length;
  const warningCount = health.warnings.length;

  if (errorCount > 0) {
    health.overall = 'UNHEALTHY';
  } else if (warningCount > 2) {
    health.overall = 'DEGRADED';
  } else if (warningCount > 0) {
    health.overall = 'HEALTHY_WITH_WARNINGS';
  }

  const duration = (new Date() - startTime) / 1000;
  Logger.log('=== Health Check Complete (' + duration.toFixed(2) + 's) ===');
  Logger.log('Overall: ' + health.overall + ' (' + errorCount + ' errors, ' + warningCount + ' warnings)');

  // Send alert if unhealthy
  if (health.overall === 'UNHEALTHY') {
    try {
      // Could send email alert here
      Logger.log('ALERT: System health check failed!');
    } catch (e) {
      Logger.log('Could not send health alert: ' + e.message);
    }
  }

  return health;
}
