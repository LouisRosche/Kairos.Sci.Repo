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
