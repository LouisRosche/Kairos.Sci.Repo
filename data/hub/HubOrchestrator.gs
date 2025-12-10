/**
 * KAMS Science Hub Orchestrator
 * Central brain coordinating all data collection, analysis, and intervention systems
 *
 * @fileoverview Master orchestration for MTSS data pipeline
 * @version 1.0.0
 * @author KAMS Science Team
 */

/**
 * Hub configuration - Now uses centralized Config module
 *
 * MIGRATION NOTE (v3.0):
 * Previously, configuration was duplicated here. Now all config flows from:
 *   config/master-config.json -> shared/Config.gs -> this module
 *
 * To set runtime values:
 *   Config.setHubSheetId('your-sheet-id');
 *   Config.setOutputFolderId('your-folder-id');
 *   Config.setCurrentPeriod(4, 1);  // cycle 4, week 1
 */

// Tab names in hub sheet (structural, not configurable)
const HUB_TABS = {
  overview: 'Overview',
  grade7: 'Grade 7',
  grade8: 'Grade 8',
  analysis: 'Analysis',
  mtss: 'MTSS',
  settings: 'Settings',
  dataConnections: 'Data Connections'
};

/**
 * Get hub configuration from centralized Config module
 * @returns {Object} Hub configuration
 */
function getHubConfig() {
  return {
    hubSheetId: Config.getHubSheetId(),
    outputFolderId: Config.getOutputFolderId(),
    grades: Config.getActiveGrades(),
    currentCycle: Config.getCurrentCycle(),
    currentWeek: Config.getCurrentWeek(),
    tabs: HUB_TABS,
    thresholds: Config.getMTSSThresholds()
  };
}

/**
 * Master orchestration function - runs complete data pipeline
 * Includes comprehensive error handling with step-level recovery
 * Recommended trigger: Daily at 6 PM
 */
function runDailyOrchestration() {
  const startTime = new Date();
  let hubConfig;

  try {
    hubConfig = getHubConfig();
  } catch (configError) {
    Logger.log(`CRITICAL: Failed to load hub config: ${configError.message}`);
    return {
      started: startTime.toISOString(),
      success: false,
      error: `Configuration load failed: ${configError.message}`,
      steps: []
    };
  }

  Logger.log('=== KAMS Science Hub Orchestration Started ===');
  Logger.log(`Date: ${startTime.toISOString()}`);
  Logger.log(`Cycle: ${hubConfig.currentCycle}, Week: ${hubConfig.currentWeek}`);

  const results = {
    started: startTime.toISOString(),
    config: {
      cycle: hubConfig.currentCycle,
      week: hubConfig.currentWeek,
      grades: hubConfig.grades
    },
    steps: [],
    warnings: []
  };

  // Helper to run a step with error handling
  function runStep(stepName, stepFn, critical = true) {
    const stepResult = {
      step: stepName,
      status: 'started',
      timestamp: new Date().toISOString()
    };
    results.steps.push(stepResult);

    try {
      const output = stepFn();
      stepResult.status = 'complete';
      stepResult.duration = ((new Date() - new Date(stepResult.timestamp)) / 1000).toFixed(2) + 's';
      return output;
    } catch (e) {
      stepResult.status = 'failed';
      stepResult.error = e.message;
      stepResult.stack = e.stack;
      Logger.log(`ERROR in ${stepName}: ${e.message}`);

      if (critical) {
        throw e; // Re-throw to stop pipeline
      } else {
        results.warnings.push({ step: stepName, error: e.message });
        return null; // Continue with null result
      }
    }
  }

  let responses, aggregatedData, mtssReports, misconceptionReport, spiralReport, interventionGroups;

  try {
    // Step 1: Collect form responses (CRITICAL)
    responses = runStep('Response Collection', () => {
      const resp = collectAllResponses();
      results.steps[results.steps.length - 1].responseCount = countResponses(resp);
      results.steps[results.steps.length - 1].errorCount = resp.errors?.length || 0;
      return resp;
    }, true);

    // Step 2: Aggregate data by student (CRITICAL)
    aggregatedData = runStep('Data Aggregation', () => {
      return aggregateAllGrades(responses);
    }, true);

    // Step 3: Run MTSS analysis (CRITICAL)
    mtssReports = runStep('MTSS Analysis', () => {
      const reports = generateAllMTSSReports(aggregatedData);
      results.steps[results.steps.length - 1].tier2Count = countTier2Students(reports);
      results.steps[results.steps.length - 1].tier3Count = countTier3Students(reports);
      return reports;
    }, true);

    // Step 4: Analyze misconceptions (NON-CRITICAL - can continue without)
    misconceptionReport = runStep('Misconception Analysis', () => {
      if (typeof analyzeMisconceptions === 'function') {
        const report = analyzeMisconceptions(hubConfig.currentCycle, hubConfig.currentWeek);
        results.steps[results.steps.length - 1].alertCount = countAlerts(report);
        return report;
      }
      return {};
    }, false);

    // Step 5: Calculate spiral effectiveness (NON-CRITICAL)
    spiralReport = runStep('Spiral Effectiveness', () => {
      if (typeof analyzeSpiralEffectiveness === 'function') {
        return analyzeSpiralEffectiveness(hubConfig.currentCycle, hubConfig.currentWeek);
      }
      return {};
    }, false);

    // Step 6: Generate intervention groups (NON-CRITICAL)
    interventionGroups = runStep('Intervention Grouping', () => {
      const groups = generateAllInterventionGroups(mtssReports);
      results.steps[results.steps.length - 1].groupCount = countGroups(groups);
      return groups;
    }, false);

    // Step 7: Update hub spreadsheet (NON-CRITICAL - data is still saved)
    runStep('Hub Update', () => {
      updateHubSheet(aggregatedData, mtssReports, interventionGroups || {});
    }, false);

    // Step 8: Send alerts if needed (NON-CRITICAL)
    runStep('Alert Generation', () => {
      sendAlerts(misconceptionReport || {}, mtssReports);
    }, false);

    results.completed = new Date().toISOString();
    results.success = true;
    results.duration = ((new Date() - startTime) / 1000).toFixed(2) + 's';

  } catch (error) {
    results.error = error.message;
    results.errorStack = error.stack;
    results.success = false;
    results.failedAt = results.steps[results.steps.length - 1]?.step || 'Unknown';
    Logger.log(`CRITICAL Orchestration Error at ${results.failedAt}: ${error.message}`);
  }

  // Always log summary
  logOrchestrationSummary(results);

  // Save orchestration log
  try {
    const logFilename = `orchestration-${startTime.toISOString().split('T')[0]}.json`;
    if (typeof saveToJson === 'function') {
      saveToJson(logFilename, results);
    }
  } catch (logError) {
    Logger.log(`Warning: Could not save orchestration log: ${logError.message}`);
  }

  return results;
}

/**
 * Aggregates data for all grades
 * @param {Object} responses - Raw response data
 * @returns {Object} Aggregated data by grade
 */
function aggregateAllGrades(responses) {
  const hubConfig = getHubConfig();
  const aggregated = {};

  hubConfig.grades.forEach(grade => {
    aggregated[grade] = aggregateWeekData(
      responses,
      grade,
      hubConfig.currentCycle,
      hubConfig.currentWeek
    );
  });

  return aggregated;
}

/**
 * Generates MTSS reports for all grades
 * @param {Object} aggregatedData - Aggregated student data
 * @returns {Object} MTSS reports by grade
 */
function generateAllMTSSReports(aggregatedData) {
  const hubConfig = getHubConfig();
  const reports = {};

  hubConfig.grades.forEach(grade => {
    if (aggregatedData[grade]) {
      reports[grade] = aggregatedData[grade].mtss;
    }
  });

  return reports;
}

/**
 * Generates intervention groups for all grades
 * @param {Object} mtssReports - MTSS reports by grade
 * @returns {Object} Intervention groups by grade
 */
function generateAllInterventionGroups(mtssReports) {
  const hubConfig = getHubConfig();
  const groups = {};

  hubConfig.grades.forEach(grade => {
    if (mtssReports[grade]) {
      groups[grade] = generateInterventionGroups(
        mtssReports[grade],
        grade,
        hubConfig.currentCycle
      );
    }
  });

  return groups;
}

/**
 * Updates the hub spreadsheet with latest data
 * Includes granular error handling for each tab update
 * @param {Object} aggregatedData - Aggregated student data
 * @param {Object} mtssReports - MTSS reports
 * @param {Object} interventionGroups - Intervention groups
 */
function updateHubSheet(aggregatedData, mtssReports, interventionGroups) {
  let hubConfig;
  try {
    hubConfig = getHubConfig();
  } catch (e) {
    Logger.log(`ERROR: Cannot load hub config for sheet update: ${e.message}`);
    throw e;
  }

  if (!hubConfig.hubSheetId) {
    Logger.log('Hub sheet ID not configured - skipping update');
    return { skipped: true, reason: 'No hubSheetId configured' };
  }

  const updateResults = {
    hubSheetId: hubConfig.hubSheetId,
    tabs: {},
    errors: []
  };

  let ss;
  try {
    ss = SpreadsheetApp.openById(hubConfig.hubSheetId);
  } catch (e) {
    Logger.log(`ERROR: Cannot open hub spreadsheet ${hubConfig.hubSheetId}: ${e.message}`);
    throw new Error(`Cannot access hub spreadsheet: ${e.message}`);
  }

  // Update Overview tab
  try {
    updateOverviewTab(ss, aggregatedData, mtssReports);
    updateResults.tabs.overview = 'success';
  } catch (e) {
    Logger.log(`Warning: Failed to update Overview tab: ${e.message}`);
    updateResults.tabs.overview = 'failed';
    updateResults.errors.push({ tab: 'Overview', error: e.message });
  }

  // Update Grade-specific tabs
  (hubConfig.grades || []).forEach(grade => {
    try {
      updateGradeTab(ss, grade, aggregatedData?.[grade], mtssReports?.[grade]);
      updateResults.tabs[`grade${grade}`] = 'success';
    } catch (e) {
      Logger.log(`Warning: Failed to update Grade ${grade} tab: ${e.message}`);
      updateResults.tabs[`grade${grade}`] = 'failed';
      updateResults.errors.push({ tab: `Grade ${grade}`, error: e.message });
    }
  });

  // Update MTSS tab
  try {
    updateMTSSTab(ss, mtssReports, interventionGroups);
    updateResults.tabs.mtss = 'success';
  } catch (e) {
    Logger.log(`Warning: Failed to update MTSS tab: ${e.message}`);
    updateResults.tabs.mtss = 'failed';
    updateResults.errors.push({ tab: 'MTSS', error: e.message });
  }

  // Update Analysis tab
  try {
    updateAnalysisTab(ss, aggregatedData);
    updateResults.tabs.analysis = 'success';
  } catch (e) {
    Logger.log(`Warning: Failed to update Analysis tab: ${e.message}`);
    updateResults.tabs.analysis = 'failed';
    updateResults.errors.push({ tab: 'Analysis', error: e.message });
  }

  const successCount = Object.values(updateResults.tabs).filter(s => s === 'success').length;
  const totalCount = Object.keys(updateResults.tabs).length;

  Logger.log(`Hub sheet updated: ${successCount}/${totalCount} tabs successful`);
  if (updateResults.errors.length > 0) {
    Logger.log(`Tab update errors: ${JSON.stringify(updateResults.errors)}`);
  }

  return updateResults;
}

/**
 * Updates the Overview tab
 * @param {Spreadsheet} ss - Spreadsheet object
 * @param {Object} aggregatedData - Aggregated data
 * @param {Object} mtssReports - MTSS reports
 */
function updateOverviewTab(ss, aggregatedData, mtssReports) {
  const hubConfig = getHubConfig();
  const sheet = ss.getSheetByName(hubConfig.tabs.overview);
  if (!sheet) return;

  // Update last refresh timestamp
  const refreshCell = sheet.getRange('B1');
  refreshCell.setValue(new Date().toISOString());

  // Update tier distribution summary
  hubConfig.grades.forEach((grade, idx) => {
    const row = 5 + idx;
    const report = mtssReports[grade];

    if (report) {
      sheet.getRange(row, 2).setValue(report.tier1Students.length);
      sheet.getRange(row, 3).setValue(report.tier2Students.length);
      sheet.getRange(row, 4).setValue(report.tier3Students.length);
    }
  });
}

/**
 * Updates a grade-specific tab
 * @param {Spreadsheet} ss - Spreadsheet object
 * @param {number} grade - Grade level
 * @param {Object} gradeData - Grade-specific data
 * @param {Object} mtssReport - MTSS report
 */
function updateGradeTab(ss, grade, gradeData, mtssReport) {
  const hubConfig = getHubConfig();
  const sheet = ss.getSheetByName(hubConfig.tabs[`grade${grade}`]);
  if (!sheet || !gradeData) return;

  // Clear existing data (preserve headers)
  const lastRow = sheet.getLastRow();
  if (lastRow > 1) {
    sheet.getRange(2, 1, lastRow - 1, 10).clearContent();
  }

  // Write student data
  const students = Object.values(gradeData.students || {});
  students.forEach((student, idx) => {
    const row = idx + 2;
    sheet.getRange(row, 1).setValue(student.email);
    sheet.getRange(row, 2).setValue(student.overallPercentage);
    sheet.getRange(row, 3).setValue(student.tier);
    sheet.getRange(row, 4).setValue(student.forms.hook?.percentage || '');
    sheet.getRange(row, 5).setValue(student.forms.station1?.percentage || '');
    sheet.getRange(row, 6).setValue(student.forms.station2?.percentage || '');
    sheet.getRange(row, 7).setValue(student.forms.station3?.percentage || '');
    sheet.getRange(row, 8).setValue(student.forms.exitTicket?.percentage || '');
  });
}

/**
 * Updates the MTSS tab
 * @param {Spreadsheet} ss - Spreadsheet object
 * @param {Object} mtssReports - MTSS reports
 * @param {Object} interventionGroups - Intervention groups
 */
function updateMTSSTab(ss, mtssReports, interventionGroups) {
  const hubConfig = getHubConfig();
  const sheet = ss.getSheetByName(hubConfig.tabs.mtss);
  if (!sheet) return;

  // Clear existing intervention data
  const lastRow = sheet.getLastRow();
  if (lastRow > 3) {
    sheet.getRange(4, 1, lastRow - 3, 8).clearContent();
  }

  let currentRow = 4;

  hubConfig.grades.forEach(grade => {
    const groups = interventionGroups[grade];
    if (!groups) return;

    // Write Tier 2 groups
    groups.tier2Groups.forEach(group => {
      sheet.getRange(currentRow, 1).setValue(`G${grade}`);
      sheet.getRange(currentRow, 2).setValue('Tier 2');
      sheet.getRange(currentRow, 3).setValue(group.id);
      sheet.getRange(currentRow, 4).setValue(group.students.length);
      sheet.getRange(currentRow, 5).setValue(group.focusArea);
      sheet.getRange(currentRow, 6).setValue(group.intervention.type);
      sheet.getRange(currentRow, 7).setValue(group.students.map(s => s.email).join(', '));
      currentRow++;
    });

    // Write Tier 3 groups
    groups.tier3Groups.forEach(group => {
      sheet.getRange(currentRow, 1).setValue(`G${grade}`);
      sheet.getRange(currentRow, 2).setValue('Tier 3');
      sheet.getRange(currentRow, 3).setValue(group.id);
      sheet.getRange(currentRow, 4).setValue(group.students.length);
      sheet.getRange(currentRow, 5).setValue(group.focusArea);
      sheet.getRange(currentRow, 6).setValue('intensive');
      sheet.getRange(currentRow, 7).setValue(group.students.map(s => s.email).join(', '));
      currentRow++;
    });
  });
}

/**
 * Updates the Analysis tab
 * @param {Spreadsheet} ss - Spreadsheet object
 * @param {Object} aggregatedData - Aggregated data
 */
function updateAnalysisTab(ss, aggregatedData) {
  const hubConfig = getHubConfig();
  const sheet = ss.getSheetByName(hubConfig.tabs.analysis);
  if (!sheet) return;

  // Update class statistics
  hubConfig.grades.forEach((grade, idx) => {
    const row = 3 + idx;
    const stats = aggregatedData[grade]?.classStats;

    if (stats) {
      sheet.getRange(row, 2).setValue(stats.average);
      sheet.getRange(row, 3).setValue(stats.median);
      sheet.getRange(row, 4).setValue(stats.standardDeviation);
      sheet.getRange(row, 5).setValue(stats.tier1Percent);
      sheet.getRange(row, 6).setValue(stats.tier2Percent);
      sheet.getRange(row, 7).setValue(stats.tier3Percent);
    }
  });
}

/**
 * Sends alerts for critical issues
 * @param {Object} misconceptionReport - Misconception analysis
 * @param {Object} mtssReports - MTSS reports
 */
function sendAlerts(misconceptionReport, mtssReports) {
  const alerts = [];

  // Check for critical misconceptions
  Object.values(misconceptionReport).forEach(gradeData => {
    if (gradeData.alerts) {
      gradeData.alerts.filter(a => a.level === 'CRITICAL').forEach(alert => {
        alerts.push({
          type: 'misconception',
          level: 'critical',
          message: alert.message,
          action: alert.action
        });
      });
    }
  });

  // Check for high Tier 3 counts
  const hubConfig = getHubConfig();
  hubConfig.grades.forEach(grade => {
    const report = mtssReports[grade];
    if (report && report.tier3Students.length > 5) {
      alerts.push({
        type: 'mtss',
        level: 'warning',
        message: `Grade ${grade} has ${report.tier3Students.length} Tier 3 students`,
        action: 'Review intervention capacity and SST pipeline'
      });
    }
  });

  if (alerts.length > 0) {
    Logger.log('ALERTS GENERATED:');
    alerts.forEach(alert => {
      Logger.log(`[${alert.level.toUpperCase()}] ${alert.type}: ${alert.message}`);
    });
  }

  return alerts;
}

/**
 * Logs orchestration summary
 * @param {Object} results - Orchestration results
 */
function logOrchestrationSummary(results) {
  Logger.log('=== Orchestration Summary ===');
  Logger.log(`Started: ${results.started}`);
  Logger.log(`Completed: ${results.completed || 'N/A'}`);
  Logger.log(`Success: ${results.success}`);

  if (results.error) {
    Logger.log(`Error: ${results.error}`);
  }

  Logger.log('Steps:');
  results.steps.forEach(step => {
    Logger.log(`  - ${step.step}: ${step.status}`);
  });

  Logger.log('=== End Summary ===');
}

/**
 * Helper: Count total responses
 */
function countResponses(responses) {
  let count = 0;
  try {
    Object.values(responses.grades).forEach(gradeData => {
      Object.values(gradeData).forEach(cycleData => {
        if (cycleData.weeks) {
          Object.values(cycleData.weeks).forEach(weekData => {
            count += weekData.totalResponses || 0;
          });
        }
      });
    });
  } catch (e) {}
  return count;
}

/**
 * Helper: Count Tier 2 students
 */
function countTier2Students(mtssReports) {
  let count = 0;
  Object.values(mtssReports).forEach(report => {
    if (report && report.tier2Students) {
      count += report.tier2Students.length;
    }
  });
  return count;
}

/**
 * Helper: Count Tier 3 students
 */
function countTier3Students(mtssReports) {
  let count = 0;
  Object.values(mtssReports).forEach(report => {
    if (report && report.tier3Students) {
      count += report.tier3Students.length;
    }
  });
  return count;
}

/**
 * Helper: Count alerts
 */
function countAlerts(misconceptionReport) {
  let count = 0;
  Object.values(misconceptionReport).forEach(gradeData => {
    if (gradeData && gradeData.alerts) {
      count += gradeData.alerts.length;
    }
  });
  return count;
}

/**
 * Helper: Count intervention groups
 */
function countGroups(interventionGroups) {
  let count = 0;
  Object.values(interventionGroups).forEach(gradeGroups => {
    if (gradeGroups) {
      count += (gradeGroups.tier2Groups?.length || 0);
      count += (gradeGroups.tier3Groups?.length || 0);
    }
  });
  return count;
}

/**
 * Setup daily trigger for orchestration
 *
 * DEPRECATED: Use TriggerManager.setupOrchestrationTrigger() instead
 * This function is kept for backwards compatibility but delegates to TriggerManager.
 *
 * @deprecated Use scripts/TriggerManager.gs
 */
function setupOrchestrationTrigger() {
  Logger.log('DEPRECATED: Use TriggerManager.setupOrchestrationTrigger() instead');
  Logger.log('Delegating to TriggerManager...');

  // Delegate to TriggerManager if available
  if (typeof TriggerManager !== 'undefined') {
    TriggerManager.setupOrchestrationTrigger();
  } else {
    // Fallback for backwards compatibility
    ScriptApp.getProjectTriggers().forEach(trigger => {
      if (trigger.getHandlerFunction() === 'runDailyOrchestration') {
        ScriptApp.deleteTrigger(trigger);
      }
    });

    ScriptApp.newTrigger('runDailyOrchestration')
      .timeBased()
      .atHour(18)
      .everyDays(1)
      .create();

    Logger.log('Daily orchestration trigger set for 6 PM (legacy method)');
  }
}

/**
 * Manual run for testing
 */
function testOrchestration() {
  Logger.log('Running manual orchestration test...');
  const results = runDailyOrchestration();
  Logger.log('Test complete. Check logs for details.');
  return results;
}

/**
 * ============================================================================
 * SEATING SYSTEM INTEGRATION
 * ============================================================================
 */

/**
 * Update performance data for seating analysis
 * Stores data in format needed by SeatingAnalyzer
 *
 * @param {Object} aggregatedData - Aggregated student data by grade
 * @param {Object} hubConfig - Hub configuration
 * @returns {Object} Results summary
 */
function updateSeatingPerformanceData(aggregatedData, hubConfig) {
  const results = {
    periodsUpdated: 0,
    errors: []
  };

  // Check if seating system is enabled
  try {
    const seatingConfig = Config.getSeatingConfig ? Config.getSeatingConfig() : null;
    if (!seatingConfig || !seatingConfig.enabled) {
      Logger.log('Seating system not enabled - skipping performance data bridge');
      return results;
    }
  } catch (e) {
    Logger.log('Could not check seating config: ' + e.message);
  }

  // Get grade-to-period mapping from config
  const gradeConfig = Config.getGradeConfig ? Config.getGradeConfig() : null;

  hubConfig.grades.forEach(grade => {
    const gradeData = aggregatedData[grade];
    if (!gradeData || !gradeData.mtss) return;

    // Get periods for this grade
    const periods = gradeConfig?.[grade]?.periods || [];

    periods.forEach(periodStr => {
      // Extract period number from string like "Period 2"
      const periodMatch = periodStr.match(/\d+/);
      if (!periodMatch) return;

      const period = parseInt(periodMatch[0]);

      try {
        // Call SeatingDataBridge to store performance data
        if (typeof storePerformanceForSeating === 'function') {
          storePerformanceForSeating(gradeData, grade, period);
          results.periodsUpdated++;
          Logger.log(`Updated seating performance data: G${grade} P${period}`);
        }
      } catch (e) {
        results.errors.push({
          grade,
          period,
          error: e.message
        });
        Logger.log(`Error updating seating data for G${grade} P${period}: ${e.message}`);
      }
    });
  });

  return results;
}

/**
 * Run seating analysis for all classes
 * Call this weekly after sign-in data is entered
 *
 * @returns {Object} Analysis results by grade/period
 */
function runAllSeatingAnalysis() {
  const hubConfig = getHubConfig();
  const gradeConfig = Config.getGradeConfig ? Config.getGradeConfig() : null;
  const results = {};

  hubConfig.grades.forEach(grade => {
    const periods = gradeConfig?.[grade]?.periods || [];

    periods.forEach(periodStr => {
      const periodMatch = periodStr.match(/\d+/);
      if (!periodMatch) return;

      const period = parseInt(periodMatch[0]);
      const key = `g${grade}p${period}`;

      try {
        if (typeof runWeeklySeatingAnalysis === 'function') {
          results[key] = runWeeklySeatingAnalysis(
            grade,
            period,
            hubConfig.currentCycle,
            hubConfig.currentWeek
          );
        }
      } catch (e) {
        results[key] = { error: e.message };
      }
    });
  });

  Logger.log('Seating analysis complete for all classes');
  return results;
}

/**
 * ============================================================================
 * ENHANCED ORCHESTRATION WITH ALL INTEGRATIONS
 * ============================================================================
 */

/**
 * Enhanced daily orchestration with all integrated systems
 * Includes: MTSS, Misconceptions, Spiral, Interventions, Alerts, Insights
 *
 * This is the recommended daily orchestration function that wires all systems.
 * Recommended trigger: Daily at 6 PM
 */
function runEnhancedOrchestration() {
  const startTime = new Date();

  // Use auto cycle/week detection
  let cycleWeek;
  try {
    cycleWeek = Config.getAutoCycleWeek ? Config.getAutoCycleWeek() : {
      cycle: Config.getCurrentCycle(),
      week: Config.getCurrentWeek(),
      source: 'fallback'
    };
  } catch (e) {
    cycleWeek = { cycle: 4, week: 1, source: 'default' };
  }

  Logger.log('=== KAMS Science Enhanced Orchestration ===');
  Logger.log('Date: ' + startTime.toISOString());
  Logger.log('Auto-detected: C' + cycleWeek.cycle + 'W' + cycleWeek.week + ' (source: ' + cycleWeek.source + ')');

  const results = {
    started: startTime.toISOString(),
    cycle: cycleWeek.cycle,
    week: cycleWeek.week,
    source: cycleWeek.source,
    steps: [],
    data: {},
    alerts: [],
    insights: null,
    success: false
  };

  // Helper to run a step
  function runStep(name, fn, critical) {
    var stepResult = {
      step: name,
      status: 'running',
      startedAt: new Date().toISOString()
    };
    results.steps.push(stepResult);

    try {
      var output = fn();
      stepResult.status = 'complete';
      stepResult.duration = ((new Date() - new Date(stepResult.startedAt)) / 1000).toFixed(2) + 's';
      return output;
    } catch (e) {
      stepResult.status = 'failed';
      stepResult.error = e.message;
      Logger.log('ERROR in ' + name + ': ' + e.message);

      if (critical) {
        throw e;
      }
      return null;
    }
  }

  try {
    // Override runtime config with detected values
    if (Config.setCurrentPeriod) {
      Config.setCurrentPeriod(cycleWeek.cycle, cycleWeek.week);
    }

    var hubConfig = getHubConfig();

    // ===== CORE DATA PIPELINE (CRITICAL) =====

    // Step 1: Collect form responses
    var responses = runStep('Response Collection', function() {
      return collectAllResponses();
    }, true);
    results.data.responses = { collected: true };

    // Step 2: Aggregate data
    var aggregatedData = runStep('Data Aggregation', function() {
      return aggregateAllGrades(responses);
    }, true);
    results.data.aggregated = { grades: Object.keys(aggregatedData) };

    // Step 3: Generate MTSS reports
    var mtssReports = runStep('MTSS Analysis', function() {
      return generateAllMTSSReports(aggregatedData);
    }, true);
    results.data.mtssReports = mtssReports;

    // ===== ANALYSIS PIPELINE (NON-CRITICAL) =====

    // Step 4: Misconception analysis
    var misconceptionReport = runStep('Misconception Analysis', function() {
      if (typeof analyzeMisconceptions === 'function') {
        return analyzeMisconceptions(cycleWeek.cycle, cycleWeek.week);
      }
      return {};
    }, false);
    results.data.misconceptionReport = misconceptionReport;

    // Step 5: Spiral effectiveness
    var spiralReport = runStep('Spiral Effectiveness', function() {
      if (typeof analyzeSpiralEffectiveness === 'function') {
        return analyzeSpiralEffectiveness(cycleWeek.cycle, cycleWeek.week);
      }
      return {};
    }, false);
    results.data.spiralReport = spiralReport;

    // Step 6: Generate intervention groups
    var interventionGroups = runStep('Intervention Grouping', function() {
      return generateAllInterventionGroups(mtssReports);
    }, false);
    results.data.interventionGroups = interventionGroups;

    // ===== INTEGRATION PIPELINE =====

    // Step 7: Spiral Content Recommendations
    var spiralRecommendations = runStep('Spiral Recommendations', function() {
      if (typeof generateAllSpiralRecommendations === 'function') {
        return generateAllSpiralRecommendations(
          { misconceptionReport: misconceptionReport, spiralReport: spiralReport },
          cycleWeek.cycle,
          cycleWeek.week
        );
      }
      return {};
    }, false);
    results.data.spiralRecommendations = spiralRecommendations;

    // Step 8: Record interventions for tracking
    runStep('Record Interventions', function() {
      if (typeof recordInterventionsFromGroups === 'function') {
        hubConfig.grades.forEach(function(grade) {
          if (interventionGroups && interventionGroups[grade]) {
            recordInterventionsFromGroups(
              interventionGroups[grade],
              grade,
              cycleWeek.cycle,
              cycleWeek.week
            );
          }
        });
      }
    }, false);

    // Step 9: Evaluate existing interventions
    var interventionEvaluations = runStep('Intervention Evaluation', function() {
      if (typeof evaluateAllInterventions === 'function') {
        var evals = {};
        hubConfig.grades.forEach(function(grade) {
          if (mtssReports[grade]) {
            evals[grade] = evaluateAllInterventions(grade, mtssReports[grade]);
          }
        });
        return evals;
      }
      return {};
    }, false);
    results.data.interventionEvaluations = interventionEvaluations;

    // Step 9b: Act on intervention evaluations (graduations, escalations)
    runStep('Process Evaluation Results', function() {
      var evalAlerts = [];

      Object.keys(interventionEvaluations || {}).forEach(function(grade) {
        var evals = interventionEvaluations[grade];
        if (!evals) return;

        // Process graduations
        if (evals.graduations && evals.graduations.length > 0) {
          evals.graduations.forEach(function(graduation) {
            // Update intervention status in data store
            if (typeof InterventionDataStore !== 'undefined') {
              InterventionDataStore.updateIntervention(
                graduation.studentEmail,
                parseInt(grade),
                graduation.interventionId,
                {
                  status: 'GRADUATED',
                  improvementPercent: graduation.improvement,
                  graduatedAt: new Date().toISOString()
                }
              );
            }

            // Generate success alert
            evalAlerts.push({
              type: 'intervention',
              level: 'INFO',
              grade: parseInt(grade),
              message: 'Student graduated from intervention',
              details: graduation.studentName + ' improved by ' +
                graduation.improvement + '% and can return to Tier 1',
              action: 'Update MTSS documentation'
            });
          });

          Logger.log('Grade ' + grade + ': ' + evals.graduations.length + ' students graduated');
        }

        // Process escalations
        if (evals.escalations && evals.escalations.length > 0) {
          evals.escalations.forEach(function(escalation) {
            // Update intervention status
            if (typeof InterventionDataStore !== 'undefined') {
              InterventionDataStore.updateIntervention(
                escalation.studentEmail,
                parseInt(grade),
                escalation.interventionId,
                {
                  status: 'ESCALATED',
                  escalationReason: escalation.reason,
                  escalatedAt: new Date().toISOString()
                }
              );
            }

            // Generate critical alert for escalation
            evalAlerts.push({
              type: 'intervention',
              level: 'CRITICAL',
              grade: parseInt(grade),
              message: 'Student needs intervention escalation',
              details: escalation.studentName + ': ' + escalation.reason,
              action: 'Schedule SST meeting or parent conference'
            });
          });

          Logger.log('Grade ' + grade + ': ' + evals.escalations.length + ' students need escalation');
        }

        // Process tier changes
        if (evals.tierChanges && evals.tierChanges.length > 0) {
          evals.tierChanges.forEach(function(change) {
            var direction = change.newTier > change.oldTier ? 'escalated' : 'improved';
            evalAlerts.push({
              type: 'intervention',
              level: change.newTier === 3 ? 'CRITICAL' : 'WARNING',
              grade: parseInt(grade),
              message: 'Student tier change: ' + direction,
              details: change.studentName + ' moved from Tier ' +
                change.oldTier + ' to Tier ' + change.newTier,
              action: direction === 'escalated' ?
                'Update intervention plan' : 'Consider reducing supports'
            });
          });
        }
      });

      // Add evaluation alerts to main alerts
      if (evalAlerts.length > 0) {
        results.alerts = (results.alerts || []).concat(evalAlerts);
      }

      return {
        processed: true,
        alertsGenerated: evalAlerts.length
      };
    }, false);

    // Step 9c: Persist intervention groups
    runStep('Persist Intervention Groups', function() {
      if (!interventionGroups) return { status: 'skipped', reason: 'No groups' };

      Object.keys(interventionGroups).forEach(function(grade) {
        var groups = interventionGroups[grade];
        if (!groups) return;

        var filename = 'intervention-groups-g' + grade + '-c' +
          cycleWeek.cycle + 'w' + cycleWeek.week + '.json';

        var data = {
          grade: grade,
          cycle: cycleWeek.cycle,
          week: cycleWeek.week,
          savedAt: new Date().toISOString(),
          tier2Groups: groups.tier2Groups || [],
          tier3Groups: groups.tier3Groups || [],
          peerTutoringPairs: groups.peerTutoringPairs || [],
          reteachGroups: groups.reteachGroups || []
        };

        if (typeof saveToJson === 'function') {
          saveToJson(filename, data);
        }
      });

      return { status: 'saved' };
    }, false);

    // Step 10: Update seating performance data
    runStep('Seating Data Bridge', function() {
      return updateSeatingPerformanceData(aggregatedData, hubConfig);
    }, false);

    // Step 11: Apply peer tutoring to seating constraints
    runStep('Seating Constraints', function() {
      if (typeof applyPeerTutoringToSeating === 'function') {
        var gradeConfig = Config.getGradeConfig ? Config.getGradeConfig() : {};
        hubConfig.grades.forEach(function(grade) {
          var groups = interventionGroups ? interventionGroups[grade] : null;
          if (groups && groups.peerTutoringPairs) {
            var periods = gradeConfig[grade] && gradeConfig[grade].periods ? gradeConfig[grade].periods : [];
            periods.forEach(function(periodStr) {
              var match = periodStr.match(/\d+/);
              if (match) {
                var period = parseInt(match[0]);
                applyPeerTutoringToSeating(groups.peerTutoringPairs, grade, period);
              }
            });
          }
        });
      }
    }, false);

    // Step 12: Update hub spreadsheet
    runStep('Hub Update', function() {
      return updateHubSheet(aggregatedData, mtssReports, interventionGroups || {});
    }, false);

    // Step 13: Generate alerts
    var alertResult = runStep('Alert System', function() {
      if (typeof processAndSendAlerts === 'function') {
        return processAndSendAlerts({
          mtssReports: mtssReports,
          misconceptionReport: misconceptionReport,
          spiralReport: spiralReport
        });
      } else if (typeof sendAlerts === 'function') {
        return { alerts: sendAlerts(misconceptionReport || {}, mtssReports) };
      }
      return { alerts: [] };
    }, false);
    results.alerts = alertResult ? alertResult.alerts || [] : [];

    // Step 14: Generate weekly insights dashboard
    results.insights = runStep('Insights Dashboard', function() {
      if (typeof generateWeeklyInsights === 'function') {
        var insights = generateWeeklyInsights(
          {
            mtssReports: mtssReports,
            misconceptionReport: misconceptionReport,
            spiralReport: spiralReport,
            interventionGroups: interventionGroups,
            interventionEvaluations: interventionEvaluations
          },
          cycleWeek.cycle,
          cycleWeek.week
        );

        // Persist insights to data store
        if (insights && typeof InsightsDataStore !== 'undefined') {
          InsightsDataStore.saveInsights(cycleWeek.cycle, cycleWeek.week, insights);
          Logger.log('Insights saved to persistent storage');
        }

        return insights;
      }
      return null;
    }, false);

    // Step 14b: Deliver spiral recommendations
    runStep('Deliver Spiral Recommendations', function() {
      if (!spiralRecommendations || Object.keys(spiralRecommendations).length === 0) {
        return { status: 'skipped', reason: 'No recommendations' };
      }

      // Include in insights if available
      if (results.insights) {
        results.insights.spiralRecommendations = spiralRecommendations;
      }

      // Generate alert for urgent spiral needs
      var urgentConcepts = [];
      Object.keys(spiralRecommendations).forEach(function(grade) {
        var recs = spiralRecommendations[grade];
        if (recs && recs.urgentConcepts) {
          recs.urgentConcepts.forEach(function(concept) {
            urgentConcepts.push({
              grade: grade,
              concept: concept.name || concept.concept,
              frequency: concept.frequency,
              weeksLow: concept.weeksLow || concept.persistentWeeks
            });
          });
        }
      });

      if (urgentConcepts.length > 0) {
        results.alerts = results.alerts || [];
        results.alerts.push({
          type: 'spiral',
          level: 'WARNING',
          message: urgentConcepts.length + ' concepts need spiral reinforcement',
          details: urgentConcepts.map(function(c) {
            return 'G' + c.grade + ': ' + c.concept + ' (' + c.frequency + '% miss rate)';
          }).join('; '),
          action: 'Include in next week\'s exit ticket spiral questions'
        });
      }

      // Save recommendations to file
      var filename = 'spiral-recommendations-c' + cycleWeek.cycle + 'w' + cycleWeek.week + '.json';
      if (typeof saveToJson === 'function') {
        saveToJson(filename, {
          cycle: cycleWeek.cycle,
          week: cycleWeek.week,
          generatedAt: new Date().toISOString(),
          recommendations: spiralRecommendations
        });
      }

      return { status: 'delivered', urgentCount: urgentConcepts.length };
    }, false);

    // Step 15: Generate intervention effectiveness report
    runStep('Effectiveness Report', function() {
      if (typeof generateEffectivenessReport === 'function') {
        hubConfig.grades.forEach(function(grade) {
          generateEffectivenessReport(grade);
        });
      }
    }, false);

    results.success = true;
    results.completed = new Date().toISOString();
    results.duration = ((new Date() - startTime) / 1000).toFixed(2) + 's';

  } catch (error) {
    results.error = error.message;
    results.errorStack = error.stack;
    results.failedAt = results.steps.length > 0 ?
      results.steps[results.steps.length - 1].step : 'Unknown';
  }

  // Log summary
  logEnhancedOrchestrationSummary(results);

  // Save orchestration log
  try {
    var logFilename = 'orchestration-enhanced-' + startTime.toISOString().split('T')[0] + '.json';
    if (typeof saveToJson === 'function') {
      saveToJson(logFilename, results);
    }
  } catch (e) {
    Logger.log('Warning: Could not save orchestration log: ' + e.message);
  }

  return results;
}

/**
 * Log enhanced orchestration summary
 */
function logEnhancedOrchestrationSummary(results) {
  Logger.log('');
  Logger.log('=== Enhanced Orchestration Summary ===');
  Logger.log('Period: C' + results.cycle + 'W' + results.week + ' (source: ' + results.source + ')');
  Logger.log('Started: ' + results.started);
  Logger.log('Completed: ' + (results.completed || 'N/A'));
  Logger.log('Success: ' + results.success);
  Logger.log('Duration: ' + (results.duration || 'N/A'));

  if (results.error) {
    Logger.log('');
    Logger.log('ERROR: ' + results.error);
    Logger.log('Failed at: ' + results.failedAt);
  }

  Logger.log('');
  Logger.log('Steps:');
  results.steps.forEach(function(step) {
    var status = step.status === 'complete' ? '[OK]' :
                 step.status === 'failed' ? '[FAIL]' : '[???]';
    Logger.log('  ' + status + ' ' + step.step + (step.duration ? ' (' + step.duration + ')' : ''));
    if (step.error) {
      Logger.log('      Error: ' + step.error);
    }
  });

  if (results.alerts && results.alerts.length > 0) {
    Logger.log('');
    Logger.log('Alerts Generated: ' + results.alerts.length);
  }

  if (results.insights) {
    Logger.log('');
    Logger.log('Insights Dashboard: Generated');
    if (results.insights.prioritizedActions) {
      Logger.log('Top Actions: ' + results.insights.prioritizedActions.length);
    }
  }

  Logger.log('');
  Logger.log('=== End Summary ===');
}

/**
 * ============================================================================
 * WEEKLY SUMMARY GENERATION
 * ============================================================================
 */

/**
 * Generate and send weekly summary email
 * Recommended trigger: Friday 4 PM
 */
function generateAndSendWeeklySummary() {
  var cycleWeek = Config.getAutoCycleWeek ? Config.getAutoCycleWeek() : {
    cycle: Config.getCurrentCycle(),
    week: Config.getCurrentWeek()
  };

  Logger.log('Generating weekly summary for C' + cycleWeek.cycle + 'W' + cycleWeek.week);

  var results = {
    generated: new Date().toISOString(),
    cycle: cycleWeek.cycle,
    week: cycleWeek.week
  };

  try {
    // Load insights
    var insights = null;
    if (typeof loadInsights === 'function') {
      insights = loadInsights(cycleWeek.cycle, cycleWeek.week);
    } else if (typeof loadLatestInsights === 'function') {
      insights = loadLatestInsights();
    }

    if (!insights) {
      Logger.log('No insights available - running orchestration first');
      runEnhancedOrchestration();
      if (typeof loadLatestInsights === 'function') {
        insights = loadLatestInsights();
      }
    }

    // Generate intervention effectiveness reports
    var effectivenessReports = {};
    if (typeof generateEffectivenessReport === 'function') {
      var grades = Config.getActiveGrades ? Config.getActiveGrades() : [7, 8];
      grades.forEach(function(grade) {
        effectivenessReports[grade] = generateEffectivenessReport(grade);
      });
    }

    // Format summary
    var summaryContent = formatWeeklySummaryContent(
      insights,
      effectivenessReports,
      cycleWeek
    );

    results.summary = summaryContent;

    // Send email
    if (typeof AlertConfig !== 'undefined' && AlertConfig.getRecipients) {
      var recipients = AlertConfig.getRecipients();
      if (recipients.length > 0) {
        MailApp.sendEmail({
          to: recipients.join(','),
          subject: '[KAMS Science] Weekly Summary - Cycle ' + cycleWeek.cycle + ' Week ' + cycleWeek.week,
          body: summaryContent
        });
        results.emailSent = true;
        results.recipients = recipients.length;
        Logger.log('Weekly summary emailed to ' + recipients.length + ' recipients');
      }
    }

    results.success = true;

  } catch (e) {
    results.error = e.message;
    results.success = false;
    Logger.log('Weekly summary error: ' + e.message);
  }

  return results;
}

/**
 * Format weekly summary content
 */
function formatWeeklySummaryContent(insights, effectivenessReports, cycleWeek) {
  var output = '';

  output += 'KAMS SCIENCE WEEKLY SUMMARY\n';
  output += '========================================\n\n';
  output += 'Cycle ' + cycleWeek.cycle + ', Week ' + cycleWeek.week + '\n';
  output += 'Generated: ' + new Date().toLocaleString() + '\n\n';

  // Insights section
  if (insights) {
    if (typeof formatInsightsForDisplay === 'function') {
      output += formatInsightsForDisplay(insights);
    } else {
      output += 'INSIGHTS AVAILABLE\n';
      output += 'See dashboard for details.\n\n';
    }
  }

  // Intervention effectiveness section
  output += '\n========================================\n';
  output += 'INTERVENTION EFFECTIVENESS\n';
  output += '========================================\n\n';

  Object.keys(effectivenessReports).forEach(function(grade) {
    var report = effectivenessReports[grade];
    if (!report) return;

    output += 'Grade ' + grade + ':\n';
    output += '  Active interventions: ' + (report.summary ? report.summary.activeInterventions : 0) + '\n';
    output += '  Graduations this period: ' + (report.summary ? report.summary.graduations : 0) + '\n';
    output += '  Average improvement: ' + (report.summary ? report.summary.averageImprovement.toFixed(1) : 0) + '%\n';

    if (report.successStories && report.successStories.length > 0) {
      output += '  Success stories:\n';
      report.successStories.slice(0, 3).forEach(function(story) {
        output += '    - ' + (story.student || 'Student') + ': +' + story.improvement + '% improvement\n';
      });
    }

    if (report.concerns && report.concerns.length > 0) {
      output += '  Concerns (need escalation review):\n';
      report.concerns.slice(0, 3).forEach(function(concern) {
        output += '    - ' + (concern.student || 'Student') + ': ' + concern.weeksInIntervention + ' weeks, minimal progress\n';
      });
    }

    output += '\n';
  });

  output += '========================================\n';
  output += 'End of Weekly Summary\n';

  return output;
}

/**
 * ============================================================================
 * CONVENIENCE FUNCTIONS
 * ============================================================================
 */

/**
 * Run complete enhanced orchestration with weekly summary
 * Use this for end-of-week comprehensive processing
 */
function runWeeklyFullOrchestration() {
  Logger.log('Running weekly full orchestration...');

  // Run enhanced orchestration
  var orchResults = runEnhancedOrchestration();

  // Run all seating analysis
  var seatingResults = runAllSeatingAnalysis();

  // Generate weekly summary
  var summaryResults = generateAndSendWeeklySummary();

  return {
    orchestration: orchResults,
    seating: seatingResults,
    summary: summaryResults
  };
}

/**
 * Check system health
 * Returns status of all integrated components
 */
function checkIntegratedSystemHealth() {
  var health = {
    timestamp: new Date().toISOString(),
    components: {},
    overall: 'HEALTHY'
  };

  // Check Config
  try {
    var config = getHubConfig();
    health.components.config = { status: 'OK', cycle: config.currentCycle, week: config.currentWeek };
  } catch (e) {
    health.components.config = { status: 'ERROR', error: e.message };
    health.overall = 'DEGRADED';
  }

  // Check AlertSystem
  try {
    if (typeof getAlertSystemStatus === 'function') {
      var alertStatus = getAlertSystemStatus();
      health.components.alerts = {
        status: alertStatus.enabled ? 'OK' : 'DISABLED',
        recipients: alertStatus.recipientCount
      };
    } else {
      health.components.alerts = { status: 'NOT_LOADED' };
    }
  } catch (e) {
    health.components.alerts = { status: 'ERROR', error: e.message };
  }

  // Check InsightsDashboard
  try {
    if (typeof loadLatestInsights === 'function') {
      var insights = loadLatestInsights();
      health.components.insights = {
        status: insights ? 'OK' : 'NO_DATA',
        lastGenerated: insights ? insights.generated : null
      };
    } else {
      health.components.insights = { status: 'NOT_LOADED' };
    }
  } catch (e) {
    health.components.insights = { status: 'ERROR', error: e.message };
  }

  // Check InterventionTracker
  try {
    if (typeof loadAllInterventionsForGrade === 'function') {
      var g7Interventions = loadAllInterventionsForGrade(7);
      var g8Interventions = loadAllInterventionsForGrade(8);
      health.components.interventionTracker = {
        status: 'OK',
        grade7Count: g7Interventions.length,
        grade8Count: g8Interventions.length
      };
    } else {
      health.components.interventionTracker = { status: 'NOT_LOADED' };
    }
  } catch (e) {
    health.components.interventionTracker = { status: 'ERROR', error: e.message };
  }

  // Check Canvas sync
  try {
    if (typeof getCanvasSyncStatus === 'function') {
      var canvasStatus = getCanvasSyncStatus();
      health.components.canvas = {
        status: canvasStatus.configured ? 'OK' : 'NOT_CONFIGURED',
        lastSync: canvasStatus.lastSync
      };
    } else {
      health.components.canvas = { status: 'NOT_LOADED' };
    }
  } catch (e) {
    health.components.canvas = { status: 'ERROR', error: e.message };
  }

  // Determine overall health
  var errorCount = Object.values(health.components).filter(function(c) {
    return c.status === 'ERROR';
  }).length;

  if (errorCount > 2) {
    health.overall = 'UNHEALTHY';
  } else if (errorCount > 0) {
    health.overall = 'DEGRADED';
  }

  Logger.log('System health check: ' + health.overall);

  return health;
}
