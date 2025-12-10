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
    },

    seatingAnalysis: {
      handler: 'runWeeklySeatingAnalysis',
      description: 'Analyze seating correlations and generate recommendations',
      schedule: {
        type: 'weekly',
        dayOfWeek: ScriptApp.WeekDay.FRIDAY,
        hour: 15     // 3:00 PM Friday (before weekly summary)
      },
      priority: 4
    },

    healthCheck: {
      handler: 'runSystemHealthCheck',
      description: 'Verify data pipeline is functioning correctly',
      schedule: {
        type: 'daily',
        hour: 7,     // 7:00 AM (before school day)
        minute: 0
      },
      priority: 5
    },

    // === INTEGRATION TRIGGERS ===

    enhancedOrchestration: {
      handler: 'runEnhancedOrchestration',
      description: 'Full 15-step integration pipeline',
      schedule: {
        type: 'daily',
        hour: 17,    // 5:00 PM
        minute: 0
      },
      priority: 6
    },

    weeklyFullOrchestration: {
      handler: 'runWeeklyFullOrchestration',
      description: 'Enhanced orchestration + seating + weekly summary',
      schedule: {
        type: 'weekly',
        dayOfWeek: ScriptApp.WeekDay.FRIDAY,
        hour: 15     // 3:00 PM Friday
      },
      priority: 7
    },

    integratedHealthCheck: {
      handler: 'checkIntegratedSystemHealth',
      description: 'Verify all integration components are functioning',
      schedule: {
        type: 'daily',
        hour: 8,     // 8:00 AM
        minute: 0
      },
      priority: 8
    },

    alertDigest: {
      handler: 'sendDailyAlertDigest',
      description: 'Send batched warning alerts as daily digest',
      schedule: {
        type: 'daily',
        hour: 16,    // 4:00 PM
        minute: 0
      },
      priority: 9
    },

    canvasRosterSync: {
      handler: 'runCanvasRosterSync',
      description: 'Sync student rosters from Canvas LMS',
      schedule: {
        type: 'weekly',
        dayOfWeek: ScriptApp.WeekDay.MONDAY,
        hour: 6      // 6:00 AM Monday
      },
      priority: 10,
      requiresConfig: 'canvasSync'
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

  // Check 4: Trigger Status
  try {
    const triggers = ScriptApp.getProjectTriggers();
    const managedCount = triggers.filter(function(t) {
      return ['collectAllResponses', 'runDailyOrchestration', 'generateWeeklySummary',
              'runWeeklySeatingAnalysis', 'runSystemHealthCheck'].includes(t.getHandlerFunction());
    }).length;

    health.components.triggers = {
      status: managedCount >= 3 ? 'OK' : 'INCOMPLETE',
      totalTriggers: triggers.length,
      managedTriggers: managedCount
    };
    Logger.log('Triggers: ' + (managedCount >= 3 ? 'OK' : 'INCOMPLETE') +
      ' (' + managedCount + ' managed, ' + triggers.length + ' total)');
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

// ==========================================================================
// INTEGRATION TRIGGER HANDLERS
// ==========================================================================

/**
 * Daily alert digest - triggered at 4 PM
 * Sends batched warning alerts as a single email
 */
function sendDailyAlertDigest() {
  Logger.log('=== Daily Alert Digest Started ===');
  recordTriggerExecution_('sendDailyAlertDigest');

  try {
    var properties = PropertiesService.getScriptProperties();
    var pendingAlertsJson = properties.getProperty('pending_alert_digest');

    if (!pendingAlertsJson) {
      Logger.log('No pending alerts for digest');
      return { status: 'no_alerts', count: 0 };
    }

    var pendingAlerts = JSON.parse(pendingAlertsJson);
    if (pendingAlerts.length === 0) {
      Logger.log('Pending alerts array is empty');
      return { status: 'no_alerts', count: 0 };
    }

    // Group alerts by type
    var alertsByType = {};
    pendingAlerts.forEach(function(alert) {
      var type = alert.type || 'general';
      if (!alertsByType[type]) {
        alertsByType[type] = [];
      }
      alertsByType[type].push(alert);
    });

    // Build email body
    var body = [];
    body.push('KAMS Science Daily Alert Digest');
    body.push('Generated: ' + new Date().toLocaleString());
    body.push('');
    body.push('═══════════════════════════════════════════════════════');

    Object.keys(alertsByType).forEach(function(type) {
      body.push('');
      body.push('▸ ' + type.toUpperCase() + ' ALERTS (' + alertsByType[type].length + ')');
      body.push('─────────────────────────────────────────────────────');

      alertsByType[type].forEach(function(alert) {
        body.push('  • ' + (alert.message || alert.title || 'Alert'));
        if (alert.details) {
          body.push('    ' + alert.details);
        }
      });
    });

    body.push('');
    body.push('═══════════════════════════════════════════════════════');
    body.push('Total Alerts: ' + pendingAlerts.length);

    // Send email
    var recipient = Session.getActiveUser().getEmail();
    if (recipient) {
      MailApp.sendEmail({
        to: recipient,
        subject: '[KAMS Science] Daily Alert Digest - ' + pendingAlerts.length + ' alerts',
        body: body.join('\n')
      });
      Logger.log('Digest sent to ' + recipient + ' with ' + pendingAlerts.length + ' alerts');
    }

    // Clear pending alerts
    properties.deleteProperty('pending_alert_digest');

    return {
      status: 'sent',
      count: pendingAlerts.length,
      recipient: recipient
    };
  } catch (e) {
    Logger.log('Error sending alert digest: ' + e.toString());
    return { status: 'error', error: e.toString() };
  }
}

/**
 * Canvas roster sync - triggered Monday 6 AM
 * Pulls roster updates from Canvas LMS
 */
function runCanvasRosterSync() {
  Logger.log('=== Canvas Roster Sync Started ===');
  recordTriggerExecution_('runCanvasRosterSync');

  try {
    // Check if Canvas sync is enabled
    var config = null;
    if (typeof Config !== 'undefined' && typeof Config.getMasterConfig === 'function') {
      config = Config.getMasterConfig();
    }

    var canvasConfig = config && config.integrations && config.integrations.canvasSync;
    if (!canvasConfig || !canvasConfig.enabled) {
      Logger.log('Canvas sync is not enabled in configuration');
      return { status: 'skipped', reason: 'Canvas sync not enabled' };
    }

    var results = {
      timestamp: new Date().toISOString(),
      grades: {}
    };

    // Pull rosters for each grade
    [7, 8].forEach(function(grade) {
      try {
        if (typeof pullCanvasRoster === 'function') {
          results.grades['grade' + grade] = pullCanvasRoster(grade);
          Logger.log('Grade ' + grade + ' roster synced');
        } else {
          results.grades['grade' + grade] = { status: 'skipped', reason: 'pullCanvasRoster not available' };
        }
      } catch (e) {
        results.grades['grade' + grade] = { status: 'error', error: e.toString() };
        Logger.log('Error syncing grade ' + grade + ': ' + e.toString());
      }
    });

    Logger.log('=== Canvas Roster Sync Complete ===');
    return results;
  } catch (e) {
    Logger.log('Error in Canvas roster sync: ' + e.toString());
    return { status: 'error', error: e.toString() };
  }
}

/**
 * Record trigger execution time for monitoring
 * @private
 */
function recordTriggerExecution_(functionName) {
  try {
    var properties = PropertiesService.getScriptProperties();
    properties.setProperty('trigger_lastRun_' + functionName, new Date().toISOString());
  } catch (e) {
    Logger.log('Could not record trigger execution: ' + e.toString());
  }
}

/**
 * Get last execution times for all triggers
 */
function getTriggerExecutionHistory() {
  var properties = PropertiesService.getScriptProperties();
  var allProps = properties.getProperties();
  var history = {};

  Object.keys(allProps).forEach(function(key) {
    if (key.indexOf('trigger_lastRun_') === 0) {
      var fnName = key.replace('trigger_lastRun_', '');
      history[fnName] = allProps[key];
    }
  });

  Logger.log('Trigger Execution History:');
  Logger.log(JSON.stringify(history, null, 2));

  return history;
}

// ==========================================================================
// INTEGRATION-SPECIFIC SETUP METHODS
// ==========================================================================

/**
 * Setup integration triggers only (leaves existing triggers intact)
 */
function setupIntegrationTriggers() {
  Logger.log('TriggerManager: Setting up integration triggers...');

  var integrationTriggers = [
    'enhancedOrchestration',
    'weeklyFullOrchestration',
    'integratedHealthCheck',
    'alertDigest',
    'canvasRosterSync'
  ];

  var results = {
    success: [],
    failed: [],
    skipped: []
  };

  // Remove existing integration triggers
  var handlers = integrationTriggers.map(function(name) {
    return TriggerManager.TRIGGERS[name].handler;
  });

  ScriptApp.getProjectTriggers().forEach(function(trigger) {
    if (handlers.indexOf(trigger.getHandlerFunction()) !== -1) {
      ScriptApp.deleteTrigger(trigger);
    }
  });

  // Check config for Canvas sync
  var config = null;
  try {
    if (typeof Config !== 'undefined' && typeof Config.getMasterConfig === 'function') {
      config = Config.getMasterConfig();
    }
  } catch (e) {
    Logger.log('Warning: Could not load config: ' + e.toString());
  }

  var canvasSyncEnabled = config && config.integrations &&
    config.integrations.canvasSync && config.integrations.canvasSync.enabled;

  integrationTriggers.forEach(function(name) {
    var triggerConfig = TriggerManager.TRIGGERS[name];

    // Skip Canvas sync if not configured
    if (name === 'canvasRosterSync' && !canvasSyncEnabled) {
      results.skipped.push({ name: name, reason: 'Canvas sync not enabled in config' });
      Logger.log('  Skipped: ' + name + ' (Canvas sync not enabled)');
      return;
    }

    try {
      TriggerManager._createTrigger(triggerConfig);
      results.success.push(name);
      Logger.log('  Created trigger: ' + name + ' (' + triggerConfig.handler + ')');
    } catch (e) {
      results.failed.push({ name: name, error: e.message });
      Logger.log('  FAILED: ' + name + ' - ' + e.message);
    }
  });

  Logger.log('Integration Trigger Setup Complete');
  Logger.log('  Success: ' + results.success.length);
  Logger.log('  Failed: ' + results.failed.length);
  Logger.log('  Skipped: ' + results.skipped.length);

  return results;
}

/**
 * Setup all triggers including integrations
 */
function setupAllTriggersWithIntegrations() {
  var coreResults = TriggerManager.setupAllTriggers();
  var integrationResults = setupIntegrationTriggers();

  return {
    core: coreResults,
    integrations: integrationResults,
    totalCreated: coreResults.success.length + integrationResults.success.length,
    totalFailed: coreResults.failed.length + integrationResults.failed.length
  };
}

/**
 * Get comprehensive trigger status including integration triggers
 */
function getComprehensiveTriggerStatus() {
  var status = TriggerManager.getStatus();
  var history = getTriggerExecutionHistory();

  // Add execution history to status
  status.executionHistory = history;

  // Check for stale executions (triggers that haven't run recently)
  var now = new Date();
  var staleThresholds = {
    daily: 26,  // hours
    weekly: 170 // hours (just over 7 days)
  };

  status.staleWarnings = [];

  Object.keys(TriggerManager.TRIGGERS).forEach(function(name) {
    var triggerConfig = TriggerManager.TRIGGERS[name];
    var lastRun = history[triggerConfig.handler];

    if (lastRun) {
      var lastRunDate = new Date(lastRun);
      var hoursSince = (now - lastRunDate) / (1000 * 60 * 60);
      var threshold = triggerConfig.schedule.type === 'weekly' ?
        staleThresholds.weekly : staleThresholds.daily;

      if (hoursSince > threshold) {
        status.staleWarnings.push({
          trigger: name,
          handler: triggerConfig.handler,
          lastRun: lastRun,
          hoursSince: Math.round(hoursSince),
          threshold: threshold
        });
      }
    }
  });

  Logger.log('Comprehensive Trigger Status:');
  Logger.log(JSON.stringify(status, null, 2));

  return status;
}
