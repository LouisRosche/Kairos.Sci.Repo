/**
 * IntegrationValidator.gs
 * Validation and testing utilities for KAMS Science Integration System
 * Validates all integration components and data flows
 *
 * @version 1.0.0
 * @lastUpdated 2025-12-10
 */

// ============================================================================
// MAIN VALIDATION ENTRY POINTS
// ============================================================================

/**
 * Run complete integration validation suite
 * @returns {Object} Comprehensive validation results
 */
function runFullIntegrationValidation() {
  Logger.log('═══════════════════════════════════════════════════════');
  Logger.log('       KAMS Science Integration Validation Suite');
  Logger.log('═══════════════════════════════════════════════════════');
  Logger.log('Started: ' + new Date().toISOString());
  Logger.log('');

  var results = {
    timestamp: new Date().toISOString(),
    overall: 'PASS',
    summary: {
      passed: 0,
      failed: 0,
      warnings: 0,
      skipped: 0
    },
    sections: {}
  };

  // Run all validation sections
  var validationSections = [
    { name: 'config', fn: validateConfiguration },
    { name: 'modules', fn: validateModuleAvailability },
    { name: 'dataFlow', fn: validateDataFlow },
    { name: 'alertSystem', fn: validateAlertSystem },
    { name: 'interventionTracker', fn: validateInterventionTracker },
    { name: 'seatingBridge', fn: validateSeatingDataBridge },
    { name: 'spiralAdvisor', fn: validateSpiralContentAdvisor },
    { name: 'insightsDashboard', fn: validateInsightsDashboard },
    { name: 'canvasSync', fn: validateCanvasSync },
    { name: 'orchestration', fn: validateOrchestration }
  ];

  validationSections.forEach(function(section) {
    Logger.log('─────────────────────────────────────────────────────');
    Logger.log('Validating: ' + section.name.toUpperCase());
    Logger.log('─────────────────────────────────────────────────────');

    try {
      var sectionResult = section.fn();
      results.sections[section.name] = sectionResult;

      // Update summary counts
      results.summary.passed += sectionResult.passed || 0;
      results.summary.failed += sectionResult.failed || 0;
      results.summary.warnings += sectionResult.warnings || 0;
      results.summary.skipped += sectionResult.skipped || 0;

      Logger.log('Result: ' + sectionResult.status);
      Logger.log('');
    } catch (e) {
      results.sections[section.name] = {
        status: 'ERROR',
        error: e.toString(),
        failed: 1
      };
      results.summary.failed++;
      Logger.log('ERROR: ' + e.toString());
      Logger.log('');
    }
  });

  // Determine overall status
  if (results.summary.failed > 0) {
    results.overall = 'FAIL';
  } else if (results.summary.warnings > 0) {
    results.overall = 'PASS_WITH_WARNINGS';
  }

  Logger.log('═══════════════════════════════════════════════════════');
  Logger.log('                 VALIDATION COMPLETE');
  Logger.log('═══════════════════════════════════════════════════════');
  Logger.log('Overall: ' + results.overall);
  Logger.log('Passed: ' + results.summary.passed);
  Logger.log('Failed: ' + results.summary.failed);
  Logger.log('Warnings: ' + results.summary.warnings);
  Logger.log('Skipped: ' + results.summary.skipped);

  return results;
}

/**
 * Quick health check - minimal validation for daily use
 */
function runQuickValidation() {
  var results = {
    timestamp: new Date().toISOString(),
    checks: []
  };

  // Check 1: Config accessible
  try {
    if (typeof Config !== 'undefined') {
      var config = Config.getMasterConfig();
      results.checks.push({ name: 'Config', status: config ? 'OK' : 'MISSING' });
    } else {
      results.checks.push({ name: 'Config', status: 'MODULE_NOT_LOADED' });
    }
  } catch (e) {
    results.checks.push({ name: 'Config', status: 'ERROR', error: e.message });
  }

  // Check 2: Integration config exists
  try {
    var config = Config.getMasterConfig();
    var hasIntegrations = config && config.integrations;
    results.checks.push({
      name: 'Integration Config',
      status: hasIntegrations ? 'OK' : 'MISSING'
    });
  } catch (e) {
    results.checks.push({ name: 'Integration Config', status: 'ERROR' });
  }

  // Check 3: Key functions available
  var keyFunctions = [
    'runEnhancedOrchestration',
    'processAndSendAlerts',
    'generateWeeklyInsights',
    'evaluateInterventionProgress'
  ];

  keyFunctions.forEach(function(fn) {
    results.checks.push({
      name: 'Function: ' + fn,
      status: typeof this[fn] === 'function' ? 'OK' : 'MISSING'
    });
  });

  // Determine overall status
  var hasFailure = results.checks.some(function(c) {
    return c.status !== 'OK';
  });
  results.status = hasFailure ? 'ISSUES_DETECTED' : 'OK';

  Logger.log('Quick Validation: ' + results.status);
  results.checks.forEach(function(check) {
    Logger.log('  ' + check.name + ': ' + check.status);
  });

  return results;
}

// ============================================================================
// INDIVIDUAL VALIDATION FUNCTIONS
// ============================================================================

/**
 * Validate configuration structure
 */
function validateConfiguration() {
  var result = {
    status: 'PASS',
    passed: 0,
    failed: 0,
    warnings: 0,
    details: []
  };

  // Check Config module exists
  if (typeof Config === 'undefined') {
    result.details.push({ check: 'Config module', status: 'FAIL', message: 'Config module not loaded' });
    result.failed++;
    result.status = 'FAIL';
    return result;
  }
  result.details.push({ check: 'Config module', status: 'PASS' });
  result.passed++;

  // Check master config loads
  var config;
  try {
    config = Config.getMasterConfig();
    if (!config) throw new Error('Config returned null');
    result.details.push({ check: 'Master config loads', status: 'PASS' });
    result.passed++;
  } catch (e) {
    result.details.push({ check: 'Master config loads', status: 'FAIL', message: e.message });
    result.failed++;
    result.status = 'FAIL';
    return result;
  }

  // Check integrations section exists
  if (!config.integrations) {
    result.details.push({ check: 'Integrations section', status: 'FAIL', message: 'Missing integrations config' });
    result.failed++;
    result.status = 'FAIL';
    return result;
  }
  result.details.push({ check: 'Integrations section', status: 'PASS' });
  result.passed++;

  // Validate each integration config
  var integrations = [
    'alertSystem',
    'spiralContentAdvisor',
    'insightsDashboard',
    'interventionTracker',
    'canvasSync',
    'seatingDataBridge',
    'autoCycleDetection'
  ];

  integrations.forEach(function(name) {
    if (config.integrations[name]) {
      result.details.push({ check: 'Config: ' + name, status: 'PASS' });
      result.passed++;
    } else {
      result.details.push({ check: 'Config: ' + name, status: 'WARNING', message: 'Not configured' });
      result.warnings++;
    }
  });

  // Check orchestration config
  if (config.orchestration && config.orchestration.enhancedPipeline) {
    result.details.push({ check: 'Orchestration config', status: 'PASS' });
    result.passed++;
  } else {
    result.details.push({ check: 'Orchestration config', status: 'WARNING', message: 'Not configured' });
    result.warnings++;
  }

  if (result.failed > 0) {
    result.status = 'FAIL';
  } else if (result.warnings > 0) {
    result.status = 'PASS_WITH_WARNINGS';
  }

  return result;
}

/**
 * Validate all integration modules are available
 */
function validateModuleAvailability() {
  var result = {
    status: 'PASS',
    passed: 0,
    failed: 0,
    warnings: 0,
    skipped: 0,
    details: []
  };

  // Required functions by module
  var moduleChecks = {
    'AlertSystem': ['generateAllAlerts', 'processAndSendAlerts', 'sendAlertNotifications'],
    'SpiralContentAdvisor': ['generateSpiralRecommendations', 'analyzeCrossCycleSpiralNeeds'],
    'InsightsDashboard': ['generateWeeklyInsights', 'formatInsightsForDisplay'],
    'InterventionTracker': ['recordInterventionAssignment', 'evaluateInterventionProgress', 'generateEffectivenessReport'],
    'SeatingDataBridge': ['getStudentsWithTiersForSeating', 'applyPeerTutoringToSeating', 'generateOptimizedSeatingWithConstraints'],
    'HubOrchestrator': ['runEnhancedOrchestration', 'runWeeklyFullOrchestration', 'checkIntegratedSystemHealth'],
    'Config': ['getMasterConfig', 'getCurrentCycle', 'getCurrentWeek']
  };

  Object.keys(moduleChecks).forEach(function(moduleName) {
    var functions = moduleChecks[moduleName];
    var allFound = true;
    var missing = [];

    functions.forEach(function(fn) {
      if (typeof this[fn] !== 'function') {
        allFound = false;
        missing.push(fn);
      }
    });

    if (allFound) {
      result.details.push({ check: moduleName, status: 'PASS', functions: functions.length });
      result.passed++;
    } else {
      result.details.push({
        check: moduleName,
        status: 'FAIL',
        message: 'Missing functions: ' + missing.join(', ')
      });
      result.failed++;
    }
  });

  // Optional modules
  var optionalChecks = {
    'CanvasDataSync': ['pullCanvasRoster', 'pullCanvasAssignments', 'getMissingWorkReport']
  };

  Object.keys(optionalChecks).forEach(function(moduleName) {
    var functions = optionalChecks[moduleName];
    var found = functions.filter(function(fn) {
      return typeof this[fn] === 'function';
    }).length;

    if (found === functions.length) {
      result.details.push({ check: moduleName + ' (optional)', status: 'PASS' });
      result.passed++;
    } else if (found > 0) {
      result.details.push({
        check: moduleName + ' (optional)',
        status: 'WARNING',
        message: 'Partially available (' + found + '/' + functions.length + ')'
      });
      result.warnings++;
    } else {
      result.details.push({ check: moduleName + ' (optional)', status: 'SKIPPED', message: 'Not loaded' });
      result.skipped++;
    }
  });

  if (result.failed > 0) {
    result.status = 'FAIL';
  } else if (result.warnings > 0) {
    result.status = 'PASS_WITH_WARNINGS';
  }

  return result;
}

/**
 * Validate data flow between modules
 */
function validateDataFlow() {
  var result = {
    status: 'PASS',
    passed: 0,
    failed: 0,
    warnings: 0,
    details: []
  };

  // Check data flow: MTSS → Interventions
  try {
    if (typeof getMtssReport === 'function' && typeof recordInterventionAssignment === 'function') {
      result.details.push({ check: 'MTSS → Interventions flow', status: 'PASS' });
      result.passed++;
    } else {
      result.details.push({
        check: 'MTSS → Interventions flow',
        status: 'WARNING',
        message: 'Functions not available for testing'
      });
      result.warnings++;
    }
  } catch (e) {
    result.details.push({ check: 'MTSS → Interventions flow', status: 'WARNING', message: e.message });
    result.warnings++;
  }

  // Check data flow: Misconceptions → Spiral
  try {
    if (typeof getMisconceptionReport === 'function' && typeof generateSpiralRecommendations === 'function') {
      result.details.push({ check: 'Misconceptions → Spiral flow', status: 'PASS' });
      result.passed++;
    } else {
      result.details.push({
        check: 'Misconceptions → Spiral flow',
        status: 'WARNING',
        message: 'Functions not available for testing'
      });
      result.warnings++;
    }
  } catch (e) {
    result.details.push({ check: 'Misconceptions → Spiral flow', status: 'WARNING', message: e.message });
    result.warnings++;
  }

  // Check data flow: MTSS → Seating
  try {
    if (typeof getStudentsWithTiersForSeating === 'function') {
      result.details.push({ check: 'MTSS → Seating flow', status: 'PASS' });
      result.passed++;
    } else {
      result.details.push({
        check: 'MTSS → Seating flow',
        status: 'WARNING',
        message: 'SeatingDataBridge not loaded'
      });
      result.warnings++;
    }
  } catch (e) {
    result.details.push({ check: 'MTSS → Seating flow', status: 'WARNING', message: e.message });
    result.warnings++;
  }

  // Check data flow: All → Dashboard
  try {
    if (typeof generateWeeklyInsights === 'function') {
      result.details.push({ check: 'All → Dashboard flow', status: 'PASS' });
      result.passed++;
    } else {
      result.details.push({
        check: 'All → Dashboard flow',
        status: 'WARNING',
        message: 'InsightsDashboard not loaded'
      });
      result.warnings++;
    }
  } catch (e) {
    result.details.push({ check: 'All → Dashboard flow', status: 'WARNING', message: e.message });
    result.warnings++;
  }

  if (result.failed > 0) {
    result.status = 'FAIL';
  } else if (result.warnings > 0) {
    result.status = 'PASS_WITH_WARNINGS';
  }

  return result;
}

/**
 * Validate Alert System
 */
function validateAlertSystem() {
  var result = {
    status: 'PASS',
    passed: 0,
    failed: 0,
    warnings: 0,
    details: []
  };

  // Check functions exist
  var requiredFunctions = ['generateAllAlerts', 'processAndSendAlerts', 'sendAlertNotifications'];
  requiredFunctions.forEach(function(fn) {
    if (typeof this[fn] === 'function') {
      result.details.push({ check: 'Function: ' + fn, status: 'PASS' });
      result.passed++;
    } else {
      result.details.push({ check: 'Function: ' + fn, status: 'FAIL', message: 'Not found' });
      result.failed++;
    }
  });

  // Check config
  try {
    var config = Config.getMasterConfig();
    if (config.integrations && config.integrations.alertSystem) {
      var alertConfig = config.integrations.alertSystem;
      if (alertConfig.enabled) {
        result.details.push({ check: 'Alert System enabled', status: 'PASS' });
        result.passed++;

        // Check thresholds configured
        if (alertConfig.alertThresholds) {
          result.details.push({ check: 'Alert thresholds configured', status: 'PASS' });
          result.passed++;
        } else {
          result.details.push({ check: 'Alert thresholds configured', status: 'WARNING' });
          result.warnings++;
        }
      } else {
        result.details.push({ check: 'Alert System enabled', status: 'WARNING', message: 'Disabled in config' });
        result.warnings++;
      }
    } else {
      result.details.push({ check: 'Alert System config', status: 'FAIL', message: 'Missing' });
      result.failed++;
    }
  } catch (e) {
    result.details.push({ check: 'Alert System config', status: 'FAIL', message: e.message });
    result.failed++;
  }

  if (result.failed > 0) {
    result.status = 'FAIL';
  } else if (result.warnings > 0) {
    result.status = 'PASS_WITH_WARNINGS';
  }

  return result;
}

/**
 * Validate Intervention Tracker
 */
function validateInterventionTracker() {
  var result = {
    status: 'PASS',
    passed: 0,
    failed: 0,
    warnings: 0,
    details: []
  };

  var requiredFunctions = [
    'recordInterventionAssignment',
    'evaluateInterventionProgress',
    'generateEffectivenessReport'
  ];

  requiredFunctions.forEach(function(fn) {
    if (typeof this[fn] === 'function') {
      result.details.push({ check: 'Function: ' + fn, status: 'PASS' });
      result.passed++;
    } else {
      result.details.push({ check: 'Function: ' + fn, status: 'FAIL', message: 'Not found' });
      result.failed++;
    }
  });

  // Validate config
  try {
    var config = Config.getMasterConfig();
    if (config.integrations && config.integrations.interventionTracker) {
      var itConfig = config.integrations.interventionTracker;

      if (itConfig.evaluationCriteria) {
        result.details.push({ check: 'Evaluation criteria configured', status: 'PASS' });
        result.passed++;
      } else {
        result.details.push({ check: 'Evaluation criteria configured', status: 'WARNING' });
        result.warnings++;
      }

      if (itConfig.interventionTypes) {
        result.details.push({
          check: 'Intervention types',
          status: 'PASS',
          count: Object.keys(itConfig.interventionTypes).length
        });
        result.passed++;
      }
    }
  } catch (e) {
    result.details.push({ check: 'Config validation', status: 'WARNING', message: e.message });
    result.warnings++;
  }

  if (result.failed > 0) {
    result.status = 'FAIL';
  } else if (result.warnings > 0) {
    result.status = 'PASS_WITH_WARNINGS';
  }

  return result;
}

/**
 * Validate Seating Data Bridge
 */
function validateSeatingDataBridge() {
  var result = {
    status: 'PASS',
    passed: 0,
    failed: 0,
    warnings: 0,
    details: []
  };

  var requiredFunctions = [
    'getStudentsWithTiersForSeating',
    'applyPeerTutoringToSeating',
    'getSeatingConstraints',
    'generateOptimizedSeatingWithConstraints'
  ];

  requiredFunctions.forEach(function(fn) {
    if (typeof this[fn] === 'function') {
      result.details.push({ check: 'Function: ' + fn, status: 'PASS' });
      result.passed++;
    } else {
      result.details.push({ check: 'Function: ' + fn, status: 'FAIL', message: 'Not found' });
      result.failed++;
    }
  });

  // Check config
  try {
    var config = Config.getMasterConfig();
    if (config.integrations && config.integrations.seatingDataBridge) {
      if (config.integrations.seatingDataBridge.enabled) {
        result.details.push({ check: 'Seating bridge enabled', status: 'PASS' });
        result.passed++;
      }
      if (config.integrations.seatingDataBridge.optimizationWeights) {
        result.details.push({ check: 'Optimization weights', status: 'PASS' });
        result.passed++;
      }
    }
  } catch (e) {
    result.details.push({ check: 'Config', status: 'WARNING', message: e.message });
    result.warnings++;
  }

  if (result.failed > 0) {
    result.status = 'FAIL';
  } else if (result.warnings > 0) {
    result.status = 'PASS_WITH_WARNINGS';
  }

  return result;
}

/**
 * Validate Spiral Content Advisor
 */
function validateSpiralContentAdvisor() {
  var result = {
    status: 'PASS',
    passed: 0,
    failed: 0,
    warnings: 0,
    details: []
  };

  var requiredFunctions = [
    'generateSpiralRecommendations',
    'analyzeCrossCycleSpiralNeeds'
  ];

  requiredFunctions.forEach(function(fn) {
    if (typeof this[fn] === 'function') {
      result.details.push({ check: 'Function: ' + fn, status: 'PASS' });
      result.passed++;
    } else {
      result.details.push({ check: 'Function: ' + fn, status: 'FAIL', message: 'Not found' });
      result.failed++;
    }
  });

  // Check config
  try {
    var config = Config.getMasterConfig();
    if (config.integrations && config.integrations.spiralContentAdvisor) {
      var scaConfig = config.integrations.spiralContentAdvisor;
      if (scaConfig.enabled) {
        result.details.push({ check: 'Spiral advisor enabled', status: 'PASS' });
        result.passed++;
      }
      if (scaConfig.recommendationLimits) {
        result.details.push({ check: 'Recommendation limits', status: 'PASS' });
        result.passed++;
      }
      if (scaConfig.priorityWeights) {
        result.details.push({ check: 'Priority weights', status: 'PASS' });
        result.passed++;
      }
    }
  } catch (e) {
    result.details.push({ check: 'Config', status: 'WARNING', message: e.message });
    result.warnings++;
  }

  if (result.failed > 0) {
    result.status = 'FAIL';
  } else if (result.warnings > 0) {
    result.status = 'PASS_WITH_WARNINGS';
  }

  return result;
}

/**
 * Validate Insights Dashboard
 */
function validateInsightsDashboard() {
  var result = {
    status: 'PASS',
    passed: 0,
    failed: 0,
    warnings: 0,
    details: []
  };

  var requiredFunctions = [
    'generateWeeklyInsights',
    'formatInsightsForDisplay'
  ];

  requiredFunctions.forEach(function(fn) {
    if (typeof this[fn] === 'function') {
      result.details.push({ check: 'Function: ' + fn, status: 'PASS' });
      result.passed++;
    } else {
      result.details.push({ check: 'Function: ' + fn, status: 'FAIL', message: 'Not found' });
      result.failed++;
    }
  });

  // Check config
  try {
    var config = Config.getMasterConfig();
    if (config.integrations && config.integrations.insightsDashboard) {
      var idConfig = config.integrations.insightsDashboard;
      if (idConfig.enabled) {
        result.details.push({ check: 'Dashboard enabled', status: 'PASS' });
        result.passed++;
      }
      if (idConfig.sections) {
        var enabledSections = Object.keys(idConfig.sections).filter(function(s) {
          return idConfig.sections[s];
        }).length;
        result.details.push({
          check: 'Dashboard sections',
          status: 'PASS',
          enabled: enabledSections
        });
        result.passed++;
      }
    }
  } catch (e) {
    result.details.push({ check: 'Config', status: 'WARNING', message: e.message });
    result.warnings++;
  }

  if (result.failed > 0) {
    result.status = 'FAIL';
  } else if (result.warnings > 0) {
    result.status = 'PASS_WITH_WARNINGS';
  }

  return result;
}

/**
 * Validate Canvas Sync
 */
function validateCanvasSync() {
  var result = {
    status: 'PASS',
    passed: 0,
    failed: 0,
    warnings: 0,
    skipped: 0,
    details: []
  };

  // Check if Canvas sync is enabled
  var config;
  try {
    config = Config.getMasterConfig();
  } catch (e) {
    result.details.push({ check: 'Config load', status: 'FAIL', message: e.message });
    result.failed++;
    result.status = 'FAIL';
    return result;
  }

  var canvasConfig = config.integrations && config.integrations.canvasSync;
  if (!canvasConfig || !canvasConfig.enabled) {
    result.details.push({ check: 'Canvas sync', status: 'SKIPPED', message: 'Not enabled in config' });
    result.skipped++;
    result.status = 'SKIPPED';
    return result;
  }

  // Check functions
  var requiredFunctions = [
    'pullCanvasRoster',
    'pullCanvasAssignments',
    'crossReferenceSubmissions',
    'getMissingWorkReport'
  ];

  requiredFunctions.forEach(function(fn) {
    if (typeof this[fn] === 'function') {
      result.details.push({ check: 'Function: ' + fn, status: 'PASS' });
      result.passed++;
    } else {
      result.details.push({ check: 'Function: ' + fn, status: 'FAIL', message: 'Not found' });
      result.failed++;
    }
  });

  // Check API configuration
  if (canvasConfig.apiConfig) {
    if (canvasConfig.apiConfig.baseUrl) {
      result.details.push({ check: 'Canvas API URL', status: 'PASS' });
      result.passed++;
    } else {
      result.details.push({ check: 'Canvas API URL', status: 'FAIL', message: 'Not configured' });
      result.failed++;
    }

    // Check for API token (should be in Script Properties)
    try {
      var props = PropertiesService.getScriptProperties();
      var token = props.getProperty('CANVAS_API_TOKEN');
      if (token) {
        result.details.push({ check: 'Canvas API token', status: 'PASS' });
        result.passed++;
      } else {
        result.details.push({ check: 'Canvas API token', status: 'FAIL', message: 'Not set in Script Properties' });
        result.failed++;
      }
    } catch (e) {
      result.details.push({ check: 'Canvas API token', status: 'WARNING', message: 'Could not check: ' + e.message });
      result.warnings++;
    }
  }

  if (result.failed > 0) {
    result.status = 'FAIL';
  } else if (result.warnings > 0) {
    result.status = 'PASS_WITH_WARNINGS';
  }

  return result;
}

/**
 * Validate Orchestration
 */
function validateOrchestration() {
  var result = {
    status: 'PASS',
    passed: 0,
    failed: 0,
    warnings: 0,
    details: []
  };

  // Check main orchestration functions
  var requiredFunctions = [
    'runEnhancedOrchestration',
    'runWeeklyFullOrchestration',
    'checkIntegratedSystemHealth'
  ];

  requiredFunctions.forEach(function(fn) {
    if (typeof this[fn] === 'function') {
      result.details.push({ check: 'Function: ' + fn, status: 'PASS' });
      result.passed++;
    } else {
      result.details.push({ check: 'Function: ' + fn, status: 'FAIL', message: 'Not found' });
      result.failed++;
    }
  });

  // Check orchestration config
  try {
    var config = Config.getMasterConfig();
    if (config.orchestration && config.orchestration.enhancedPipeline) {
      var pipeline = config.orchestration.enhancedPipeline;
      if (pipeline.enabled) {
        result.details.push({ check: 'Enhanced pipeline enabled', status: 'PASS' });
        result.passed++;
      }
      if (pipeline.steps && pipeline.steps.length > 0) {
        result.details.push({
          check: 'Pipeline steps',
          status: 'PASS',
          count: pipeline.steps.length
        });
        result.passed++;
      }
    }

    if (config.orchestration && config.orchestration.scheduling) {
      result.details.push({ check: 'Scheduling config', status: 'PASS' });
      result.passed++;
    }
  } catch (e) {
    result.details.push({ check: 'Config', status: 'WARNING', message: e.message });
    result.warnings++;
  }

  // Check triggers
  try {
    var triggers = ScriptApp.getProjectTriggers();
    var orchestrationTriggers = triggers.filter(function(t) {
      var fn = t.getHandlerFunction();
      return fn === 'runEnhancedOrchestration' ||
             fn === 'runWeeklyFullOrchestration' ||
             fn === 'checkIntegratedSystemHealth';
    });

    if (orchestrationTriggers.length >= 2) {
      result.details.push({
        check: 'Orchestration triggers',
        status: 'PASS',
        count: orchestrationTriggers.length
      });
      result.passed++;
    } else {
      result.details.push({
        check: 'Orchestration triggers',
        status: 'WARNING',
        message: 'Only ' + orchestrationTriggers.length + ' triggers found. Run setupIntegrationTriggers()'
      });
      result.warnings++;
    }
  } catch (e) {
    result.details.push({ check: 'Triggers', status: 'WARNING', message: e.message });
    result.warnings++;
  }

  if (result.failed > 0) {
    result.status = 'FAIL';
  } else if (result.warnings > 0) {
    result.status = 'PASS_WITH_WARNINGS';
  }

  return result;
}

// ============================================================================
// TEST DATA GENERATORS
// ============================================================================

/**
 * Generate sample test data for integration testing
 */
function generateTestData() {
  return {
    mtssReport: {
      grade: 7,
      cycle: 3,
      week: 2,
      summary: {
        tier1Count: 45,
        tier2Count: 12,
        tier3Count: 3,
        tier1Percent: 75,
        tier2Percent: 20,
        tier3Percent: 5
      },
      studentsByTier: {
        tier1: [],
        tier2: [
          { email: 'student1@test.edu', name: 'Test Student 1', score: 62 },
          { email: 'student2@test.edu', name: 'Test Student 2', score: 55 }
        ],
        tier3: [
          { email: 'student3@test.edu', name: 'Test Student 3', score: 42 }
        ]
      }
    },
    misconceptionReport: {
      grade: 7,
      cycle: 3,
      week: 2,
      misconceptions: [
        { id: 'mc001', concept: 'Energy Transfer', frequency: 45, students: 12 },
        { id: 'mc002', concept: 'Cell Division', frequency: 32, students: 8 }
      ]
    },
    spiralReport: {
      grade: 7,
      cycle: 3,
      week: 2,
      overall: 68,
      byTopic: {
        'Photosynthesis': { score: 72, trend: 'stable' },
        'Ecosystems': { score: 58, trend: 'declining' }
      }
    }
  };
}

/**
 * Run integration test with sample data
 */
function runIntegrationTestWithSampleData() {
  Logger.log('Running integration test with sample data...');

  var testData = generateTestData();
  var results = {
    tests: [],
    passed: 0,
    failed: 0
  };

  // Test 1: Generate insights
  try {
    if (typeof generateWeeklyInsights === 'function') {
      var insights = generateWeeklyInsights(testData, 3, 2);
      results.tests.push({
        name: 'generateWeeklyInsights',
        status: insights ? 'PASS' : 'FAIL'
      });
      if (insights) results.passed++; else results.failed++;
    }
  } catch (e) {
    results.tests.push({ name: 'generateWeeklyInsights', status: 'ERROR', error: e.message });
    results.failed++;
  }

  // Test 2: Generate spiral recommendations
  try {
    if (typeof generateSpiralRecommendations === 'function') {
      var recs = generateSpiralRecommendations(
        7, 3, 2,
        testData.misconceptionReport,
        testData.spiralReport
      );
      results.tests.push({
        name: 'generateSpiralRecommendations',
        status: recs ? 'PASS' : 'FAIL'
      });
      if (recs) results.passed++; else results.failed++;
    }
  } catch (e) {
    results.tests.push({ name: 'generateSpiralRecommendations', status: 'ERROR', error: e.message });
    results.failed++;
  }

  Logger.log('Integration Test Results:');
  Logger.log('  Passed: ' + results.passed);
  Logger.log('  Failed: ' + results.failed);

  return results;
}
