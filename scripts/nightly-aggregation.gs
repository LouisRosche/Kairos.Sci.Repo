/**
 * nightly-aggregation.gs
 * Scheduled data collection and aggregation
 *
 * KAMS Science Curriculum System v2.0
 *
 * STATUS: FUNCTIONAL STUB
 * ========================
 * Core orchestration logic is complete. Individual processing functions
 * return stub data until AGGREGATION_CONFIG is populated.
 *
 * To enable production mode:
 * 1. Set outputFolderId, hubSheetId, logSheetId in AGGREGATION_CONFIG
 * 2. Deploy ResponseCollector.gs and DataAggregator.gs
 * 3. Ensure form registry is populated with form IDs
 *
 * Setup:
 * 1. Deploy as standalone Apps Script project
 * 2. Set up time-based trigger (Edit > Triggers)
 * 3. Recommended: Run daily at 11 PM or 6 AM
 */

// ============================================================================
// CONFIGURATION
// ============================================================================

const AGGREGATION_CONFIG = {
  // Output locations
  outputFolderId: '',           // Google Drive folder for JSON output
  hubSheetId: '',               // KAMS-Science-Hub spreadsheet ID
  logSheetId: '',               // Execution log spreadsheet

  // Processing settings
  includeIncomplete: false,     // Include incomplete responses?
  anonymizeForExport: false,    // Remove PII from exported JSON?

  // Alert settings
  emailAlerts: true,
  alertRecipients: [],          // Email addresses for alerts

  // Active configuration
  currentCycle: 3,
  activeForms: {
    grade7: { week1: true, week2: true, week3: false },
    grade8: { week1: true, week2: true, week3: false }
  }
};

// ============================================================================
// MAIN ENTRY POINT
// ============================================================================

/**
 * Main aggregation function - called by time trigger
 */
function runNightlyAggregation() {
  const startTime = new Date();
  Logger.log(`=== NIGHTLY AGGREGATION START: ${startTime.toISOString()} ===`);

  const results = {
    timestamp: startTime.toISOString(),
    cycle: AGGREGATION_CONFIG.currentCycle,
    grades: {}
  };

  try {
    // Process each grade
    [7, 8].forEach(grade => {
      Logger.log(`Processing Grade ${grade}...`);
      results.grades[grade] = processGrade(grade);
    });

    // Generate MTSS reports
    Logger.log('Generating MTSS reports...');
    const mtssResults = generateMTSSReports(results);
    results.mtss = mtssResults;

    // Update hub spreadsheet
    Logger.log('Updating hub spreadsheet...');
    updateHubSheet(results);

    // Save JSON output
    Logger.log('Saving JSON output...');
    saveJsonOutput(results);

    // Send alerts if needed
    if (AGGREGATION_CONFIG.emailAlerts) {
      checkAndSendAlerts(results);
    }

    results.success = true;
    results.duration = (new Date() - startTime) / 1000;

  } catch (e) {
    Logger.log(`ERROR: ${e.message}`);
    results.success = false;
    results.error = e.message;

    // Send error alert
    if (AGGREGATION_CONFIG.emailAlerts) {
      sendErrorAlert(e);
    }
  }

  // Log execution
  logExecution(results);

  Logger.log(`=== AGGREGATION COMPLETE: ${results.duration}s ===`);
  return results;
}

// ============================================================================
// PROCESSING FUNCTIONS
// ============================================================================

/**
 * Process all active forms for a grade
 * @param {number} grade - 7 or 8
 * @returns {Object} Aggregated grade data
 */
function processGrade(grade) {
  const gradeKey = `grade${grade}`;
  const activeWeeks = AGGREGATION_CONFIG.activeForms[gradeKey];
  const cycle = AGGREGATION_CONFIG.currentCycle;

  const results = {
    grade: grade,
    cycle: cycle,
    weeks: {}
  };

  Object.keys(activeWeeks).forEach(weekKey => {
    if (activeWeeks[weekKey]) {
      const week = parseInt(weekKey.replace('week', ''));
      Logger.log(`  Processing G${grade} C${cycle} W${week}...`);

      try {
        results.weeks[week] = processWeek(grade, cycle, week);
      } catch (e) {
        results.weeks[week] = { error: e.message };
        Logger.log(`    ERROR: ${e.message}`);
      }
    }
  });

  return results;
}

/**
 * Process all forms for a specific week
 * @param {number} grade
 * @param {number} cycle
 * @param {number} week
 * @returns {Object} Week aggregation data
 */
function processWeek(grade, cycle, week) {
  // Check if configuration is ready for production
  if (!AGGREGATION_CONFIG.hubSheetId) {
    Logger.log(`    Running in stub mode (no hubSheetId configured)`);
    return {
      grade: grade,
      cycle: cycle,
      week: week,
      status: 'stub',
      message: 'Configure AGGREGATION_CONFIG for production data',
      forms: {
        hook: { responses: 0, average: null },
        station1: { responses: 0, average: null },
        station2: { responses: 0, average: null },
        station3: { responses: 0, average: null },
        exitTicket: { responses: 0, average: null }
      },
      students: [],
      statistics: { mean: 0, median: 0, stdDev: 0 }
    };
  }

  // Production implementation:
  // 1. const formIds = FormRegistry.getWeekForms(grade, cycle, week);
  // 2. const responses = ResponseCollector.collectWeekResponses(formIds);
  // 3. const aggregated = DataAggregator.aggregateByStudent(responses);
  // 4. return DataAggregator.calculateStatistics(aggregated);

  return {
    grade: grade,
    cycle: cycle,
    week: week,
    status: 'pending_implementation',
    message: 'Config set - implement ResponseCollector integration'
  };
}

// ============================================================================
// MTSS FUNCTIONS
// ============================================================================

/**
 * Generate MTSS tier reports from aggregated data
 * @param {Object} results - Aggregated results
 * @returns {Object} MTSS report data
 */
function generateMTSSReports(results) {
  // Check if we have real data to process
  const hasRealData = Object.values(results.grades).some(g =>
    Object.values(g.weeks || {}).some(w => w.status !== 'stub')
  );

  if (!hasRealData) {
    Logger.log('  Running in stub mode (no real data available)');
    return {
      status: 'stub',
      tier1Count: 0,
      tier2Count: 0,
      tier3Count: 0,
      tier2Students: [],
      tier3Students: [],
      wholeClassReteach: false,
      reteachTopics: [],
      generatedAt: new Date().toISOString()
    };
  }

  // Production implementation:
  // 1. const tierData = InterventionGenerator.classifyStudents(results);
  // 2. const highMissQuestions = InterventionGenerator.findHighMissQuestions(results);
  // 3. const recommendations = InterventionGenerator.generateRecommendations(tierData);
  // 4. return { ...tierData, recommendations };

  return {
    status: 'pending_implementation',
    message: 'Real data detected - implement InterventionGenerator integration'
  };
}

// ============================================================================
// OUTPUT FUNCTIONS
// ============================================================================

/**
 * Update hub spreadsheet with latest data
 * @param {Object} results - Aggregation results
 */
function updateHubSheet(results) {
  if (!AGGREGATION_CONFIG.hubSheetId) {
    Logger.log('  No hub sheet configured - skipping');
    return { updated: false, reason: 'no_hub_configured' };
  }

  // Check for stub data
  if (results.grades && Object.values(results.grades).every(g =>
    Object.values(g.weeks || {}).every(w => w.status === 'stub')
  )) {
    Logger.log('  Stub data only - skipping hub update');
    return { updated: false, reason: 'stub_data_only' };
  }

  // Production implementation:
  // const sheet = SpreadsheetApp.openById(AGGREGATION_CONFIG.hubSheetId);
  // const dataSheet = sheet.getSheetByName('DailyData') || sheet.insertSheet('DailyData');
  // Write headers if needed, then append row for each student
  // Update summary/dashboard sheets

  Logger.log('  Hub update pending implementation');
  return { updated: false, reason: 'pending_implementation' };
}

/**
 * Save results as JSON to Drive
 * @param {Object} results - Aggregation results
 */
function saveJsonOutput(results) {
  if (!AGGREGATION_CONFIG.outputFolderId) {
    Logger.log('  No output folder configured - skipping');
    return;
  }

  const folder = DriveApp.getFolderById(AGGREGATION_CONFIG.outputFolderId);
  const filename = `aggregation-${results.timestamp.split('T')[0]}.json`;

  // Optionally anonymize
  const outputData = AGGREGATION_CONFIG.anonymizeForExport
    ? anonymizeData(results)
    : results;

  folder.createFile(filename, JSON.stringify(outputData, null, 2), 'application/json');
  Logger.log(`  Saved: ${filename}`);
}

/**
 * Remove PII from data for export
 * @param {Object} data - Data to anonymize
 * @returns {Object} Anonymized data
 */
function anonymizeData(data) {
  // Deep clone to avoid modifying original
  const anonymized = JSON.parse(JSON.stringify(data));

  // Recursively find and hash email fields
  function processObject(obj) {
    if (!obj || typeof obj !== 'object') return;

    Object.keys(obj).forEach(key => {
      if (key === 'email' && typeof obj[key] === 'string') {
        // Simple hash - replace with anonymized ID
        obj[key] = 'student_' + Utilities.computeDigest(
          Utilities.DigestAlgorithm.MD5,
          obj[key]
        ).slice(0, 8).map(b => (b & 0xFF).toString(16)).join('');
      } else if (key === 'name' || key === 'studentName') {
        obj[key] = '[REDACTED]';
      } else if (Array.isArray(obj[key])) {
        obj[key].forEach(item => processObject(item));
      } else if (typeof obj[key] === 'object') {
        processObject(obj[key]);
      }
    });
  }

  processObject(anonymized);
  return anonymized;
}

// ============================================================================
// ALERT FUNCTIONS
// ============================================================================

/**
 * Check for alert conditions and send notifications
 * @param {Object} results - Aggregation results
 */
function checkAndSendAlerts(results) {
  const alerts = [];

  // Check for high-miss questions
  if (results.mtss && results.mtss.wholeClassReteach) {
    alerts.push({
      type: 'WHOLE_CLASS_RETEACH',
      message: `Whole-class reteach needed for: ${results.mtss.reteachTopic}`
    });
  }

  // Check for new Tier 3 students
  // TODO: Compare to previous day's data

  if (alerts.length > 0) {
    sendAlerts(alerts);
  }
}

/**
 * Send alert emails
 * @param {Object[]} alerts - Array of alert objects
 */
function sendAlerts(alerts) {
  if (!AGGREGATION_CONFIG.alertRecipients.length) {
    Logger.log('  No alert recipients configured');
    return;
  }

  const subject = `[KAMS Science] Data Alert - ${new Date().toLocaleDateString()}`;
  const body = alerts.map(a => `${a.type}: ${a.message}`).join('\n\n');

  AGGREGATION_CONFIG.alertRecipients.forEach(email => {
    MailApp.sendEmail(email, subject, body);
  });

  Logger.log(`  Sent ${alerts.length} alert(s) to ${AGGREGATION_CONFIG.alertRecipients.length} recipient(s)`);
}

/**
 * Send error alert
 * @param {Error} error - Error object
 */
function sendErrorAlert(error) {
  if (!AGGREGATION_CONFIG.alertRecipients.length) return;

  const subject = `[KAMS Science] Aggregation ERROR - ${new Date().toLocaleDateString()}`;
  const body = `Nightly aggregation failed:\n\n${error.message}\n\nStack:\n${error.stack}`;

  AGGREGATION_CONFIG.alertRecipients.forEach(email => {
    MailApp.sendEmail(email, subject, body);
  });
}

// ============================================================================
// LOGGING
// ============================================================================

/**
 * Log execution details
 * @param {Object} results - Execution results
 */
function logExecution(results) {
  if (!AGGREGATION_CONFIG.logSheetId) {
    Logger.log('  No log sheet configured');
    return;
  }

  const sheet = SpreadsheetApp.openById(AGGREGATION_CONFIG.logSheetId).getActiveSheet();
  sheet.appendRow([
    results.timestamp,
    results.success ? 'SUCCESS' : 'ERROR',
    results.duration || '',
    results.error || '',
    JSON.stringify(results)
  ]);
}

// ============================================================================
// MANUAL TRIGGERS
// ============================================================================

/**
 * Manual trigger for testing
 */
function testAggregation() {
  Logger.log('Running test aggregation...');
  const results = runNightlyAggregation();
  Logger.log(JSON.stringify(results, null, 2));
}

/**
 * Set up time-based trigger
 */
function createTrigger() {
  // Delete existing triggers
  ScriptApp.getProjectTriggers().forEach(trigger => {
    if (trigger.getHandlerFunction() === 'runNightlyAggregation') {
      ScriptApp.deleteTrigger(trigger);
    }
  });

  // Create new trigger - runs daily at 11 PM
  ScriptApp.newTrigger('runNightlyAggregation')
    .timeBased()
    .atHour(23)
    .everyDays(1)
    .create();

  Logger.log('Trigger created: Daily at 11 PM');
}
