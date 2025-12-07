/**
 * KAMS Science Hub Orchestrator
 * Central brain coordinating all data collection, analysis, and intervention systems
 *
 * @fileoverview Master orchestration for MTSS data pipeline
 * @version 1.0.0
 * @author KAMS Science Team
 */

/**
 * Hub configuration - IDs populated after Google Sheets creation
 */
const HUB_CONFIG = {
  hubSheetId: '', // Master hub spreadsheet ID
  outputFolderId: '', // Drive folder for JSON outputs
  grades: [7, 8],
  currentCycle: 4,
  currentWeek: 1,

  // Tab names in hub sheet
  tabs: {
    overview: 'Overview',
    grade7: 'Grade 7',
    grade8: 'Grade 8',
    analysis: 'Analysis',
    mtss: 'MTSS',
    settings: 'Settings',
    dataConnections: 'Data Connections'
  },

  // Thresholds (loaded from tier-definitions.json)
  thresholds: {
    tier1Min: 70,
    tier2Min: 50,
    tier3Max: 49,
    misconceptionAlert: 30,
    wholeClassReteach: 40,
    spiralEffectivenessMin: 60
  }
};

/**
 * Master orchestration function - runs complete data pipeline
 * Recommended trigger: Daily at 6 PM
 */
function runDailyOrchestration() {
  Logger.log('=== KAMS Science Hub Orchestration Started ===');
  Logger.log(`Date: ${new Date().toISOString()}`);
  Logger.log(`Cycle: ${HUB_CONFIG.currentCycle}, Week: ${HUB_CONFIG.currentWeek}`);

  const results = {
    started: new Date().toISOString(),
    steps: []
  };

  try {
    // Step 1: Collect form responses
    results.steps.push({
      step: 'Response Collection',
      status: 'started',
      timestamp: new Date().toISOString()
    });
    const responses = collectAllResponses();
    results.steps[results.steps.length - 1].status = 'complete';
    results.steps[results.steps.length - 1].responseCount = countResponses(responses);

    // Step 2: Aggregate data by student
    results.steps.push({
      step: 'Data Aggregation',
      status: 'started',
      timestamp: new Date().toISOString()
    });
    const aggregatedData = aggregateAllGrades(responses);
    results.steps[results.steps.length - 1].status = 'complete';

    // Step 3: Run MTSS analysis
    results.steps.push({
      step: 'MTSS Analysis',
      status: 'started',
      timestamp: new Date().toISOString()
    });
    const mtssReports = generateAllMTSSReports(aggregatedData);
    results.steps[results.steps.length - 1].status = 'complete';
    results.steps[results.steps.length - 1].tier2Count = countTier2Students(mtssReports);
    results.steps[results.steps.length - 1].tier3Count = countTier3Students(mtssReports);

    // Step 4: Analyze misconceptions
    results.steps.push({
      step: 'Misconception Analysis',
      status: 'started',
      timestamp: new Date().toISOString()
    });
    const misconceptionReport = analyzeMisconceptions(
      HUB_CONFIG.currentCycle,
      HUB_CONFIG.currentWeek
    );
    results.steps[results.steps.length - 1].status = 'complete';
    results.steps[results.steps.length - 1].alertCount = countAlerts(misconceptionReport);

    // Step 5: Calculate spiral effectiveness
    results.steps.push({
      step: 'Spiral Effectiveness',
      status: 'started',
      timestamp: new Date().toISOString()
    });
    const spiralReport = analyzeSpiralEffectiveness(
      HUB_CONFIG.currentCycle,
      HUB_CONFIG.currentWeek
    );
    results.steps[results.steps.length - 1].status = 'complete';

    // Step 6: Generate intervention groups
    results.steps.push({
      step: 'Intervention Grouping',
      status: 'started',
      timestamp: new Date().toISOString()
    });
    const interventionGroups = generateAllInterventionGroups(mtssReports);
    results.steps[results.steps.length - 1].status = 'complete';
    results.steps[results.steps.length - 1].groupCount = countGroups(interventionGroups);

    // Step 7: Update hub spreadsheet
    results.steps.push({
      step: 'Hub Update',
      status: 'started',
      timestamp: new Date().toISOString()
    });
    updateHubSheet(aggregatedData, mtssReports, interventionGroups);
    results.steps[results.steps.length - 1].status = 'complete';

    // Step 8: Send alerts if needed
    results.steps.push({
      step: 'Alert Generation',
      status: 'started',
      timestamp: new Date().toISOString()
    });
    sendAlerts(misconceptionReport, mtssReports);
    results.steps[results.steps.length - 1].status = 'complete';

    results.completed = new Date().toISOString();
    results.success = true;

  } catch (error) {
    results.error = error.message;
    results.success = false;
    Logger.log('Orchestration Error: ' + error.message);
  }

  // Log summary
  logOrchestrationSummary(results);
  return results;
}

/**
 * Aggregates data for all grades
 * @param {Object} responses - Raw response data
 * @returns {Object} Aggregated data by grade
 */
function aggregateAllGrades(responses) {
  const aggregated = {};

  HUB_CONFIG.grades.forEach(grade => {
    aggregated[grade] = aggregateWeekData(
      responses,
      grade,
      HUB_CONFIG.currentCycle,
      HUB_CONFIG.currentWeek
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
  const reports = {};

  HUB_CONFIG.grades.forEach(grade => {
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
  const groups = {};

  HUB_CONFIG.grades.forEach(grade => {
    if (mtssReports[grade]) {
      groups[grade] = generateInterventionGroups(
        mtssReports[grade],
        grade,
        HUB_CONFIG.currentCycle
      );
    }
  });

  return groups;
}

/**
 * Updates the hub spreadsheet with latest data
 * @param {Object} aggregatedData - Aggregated student data
 * @param {Object} mtssReports - MTSS reports
 * @param {Object} interventionGroups - Intervention groups
 */
function updateHubSheet(aggregatedData, mtssReports, interventionGroups) {
  if (!HUB_CONFIG.hubSheetId) {
    Logger.log('Hub sheet ID not configured - skipping update');
    return;
  }

  try {
    const ss = SpreadsheetApp.openById(HUB_CONFIG.hubSheetId);

    // Update Overview tab
    updateOverviewTab(ss, aggregatedData, mtssReports);

    // Update Grade-specific tabs
    HUB_CONFIG.grades.forEach(grade => {
      updateGradeTab(ss, grade, aggregatedData[grade], mtssReports[grade]);
    });

    // Update MTSS tab
    updateMTSSTab(ss, mtssReports, interventionGroups);

    // Update Analysis tab
    updateAnalysisTab(ss, aggregatedData);

    Logger.log('Hub sheet updated successfully');

  } catch (error) {
    Logger.log('Hub update error: ' + error.message);
  }
}

/**
 * Updates the Overview tab
 * @param {Spreadsheet} ss - Spreadsheet object
 * @param {Object} aggregatedData - Aggregated data
 * @param {Object} mtssReports - MTSS reports
 */
function updateOverviewTab(ss, aggregatedData, mtssReports) {
  const sheet = ss.getSheetByName(HUB_CONFIG.tabs.overview);
  if (!sheet) return;

  // Update last refresh timestamp
  const refreshCell = sheet.getRange('B1');
  refreshCell.setValue(new Date().toISOString());

  // Update tier distribution summary
  HUB_CONFIG.grades.forEach((grade, idx) => {
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
  const sheet = ss.getSheetByName(HUB_CONFIG.tabs[`grade${grade}`]);
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
  const sheet = ss.getSheetByName(HUB_CONFIG.tabs.mtss);
  if (!sheet) return;

  // Clear existing intervention data
  const lastRow = sheet.getLastRow();
  if (lastRow > 3) {
    sheet.getRange(4, 1, lastRow - 3, 8).clearContent();
  }

  let currentRow = 4;

  HUB_CONFIG.grades.forEach(grade => {
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
  const sheet = ss.getSheetByName(HUB_CONFIG.tabs.analysis);
  if (!sheet) return;

  // Update class statistics
  HUB_CONFIG.grades.forEach((grade, idx) => {
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
  HUB_CONFIG.grades.forEach(grade => {
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
 */
function setupOrchestrationTrigger() {
  // Delete existing triggers
  ScriptApp.getProjectTriggers().forEach(trigger => {
    if (trigger.getHandlerFunction() === 'runDailyOrchestration') {
      ScriptApp.deleteTrigger(trigger);
    }
  });

  // Create new trigger at 6 PM daily
  ScriptApp.newTrigger('runDailyOrchestration')
    .timeBased()
    .atHour(18)
    .everyDays(1)
    .create();

  Logger.log('Daily orchestration trigger set for 6 PM');
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
