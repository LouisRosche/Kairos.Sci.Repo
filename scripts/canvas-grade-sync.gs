// ============================================================================
// CANVAS GRADE SYNC - Production Version with Full Control
// Syncs Google Sheets formative assessments to Canvas LMS gradebook
// ============================================================================
//
// SETUP INSTRUCTIONS:
// 1. In Google Apps Script, go to Project Settings > Script Properties
// 2. Add the following properties:
//    - CANVAS_DOMAIN        (e.g., 'gradientlearning.instructure.com')
//    - CANVAS_API_KEY       (your Canvas API token)
//    - GRADE_7_COURSE_ID    (Canvas course ID for Grade 7)
//    - GRADE_8_COURSE_ID    (Canvas course ID for Grade 8)
//
// See SETUP-INSTRUCTIONS.md for detailed deployment steps.
// ============================================================================

// === CONFIGURATION (loaded from Script Properties) ===

/**
 * Load configuration from Script Properties (secure storage)
 * Falls back to empty strings if not configured
 */
function getCanvasConfig() {
  const props = PropertiesService.getScriptProperties();

  return {
    domain: props.getProperty('CANVAS_DOMAIN') || '',
    apiKey: props.getProperty('CANVAS_API_KEY') || '',
    grade7CourseId: props.getProperty('GRADE_7_COURSE_ID') || '',
    grade8CourseId: props.getProperty('GRADE_8_COURSE_ID') || ''
  };
}

/**
 * Validate that required configuration is present
 */
function validateConfig() {
  const config = getCanvasConfig();
  const missing = [];

  if (!config.domain) missing.push('CANVAS_DOMAIN');
  if (!config.apiKey) missing.push('CANVAS_API_KEY');
  if (!config.grade7CourseId) missing.push('GRADE_7_COURSE_ID');
  if (!config.grade8CourseId) missing.push('GRADE_8_COURSE_ID');

  if (missing.length > 0) {
    throw new Error('Missing Script Properties: ' + missing.join(', ') +
      '\n\nGo to Project Settings > Script Properties to configure.');
  }

  return config;
}

// Grade 7 Configuration (built dynamically from Script Properties)
function getGrade7Config() {
  const config = getCanvasConfig();
  return {
    domain: config.domain,
    apiKey: config.apiKey,
    courseId: config.grade7CourseId,
    sheetName: '7th Live Dashboard',
    mappingSheet: '7th Assignment Mapping',
    trackingSheet: '7th Sync Tracker',
    testStudentEmails: getTestStudentEmails('GRADE_7_TEST_EMAILS')
  };
}

// Grade 8 Configuration (built dynamically from Script Properties)
function getGrade8Config() {
  const config = getCanvasConfig();
  return {
    domain: config.domain,
    apiKey: config.apiKey,
    courseId: config.grade8CourseId,
    sheetName: '8th Live Dashboard',
    mappingSheet: '8th Assignment Mapping',
    trackingSheet: '8th Sync Tracker',
    testStudentEmails: getTestStudentEmails('GRADE_8_TEST_EMAILS')
  };
}

/**
 * Get test student emails from Script Properties (comma-separated)
 */
function getTestStudentEmails(propertyName) {
  const props = PropertiesService.getScriptProperties();
  const emailsStr = props.getProperty(propertyName) || '';
  return emailsStr ? emailsStr.split(',').map(e => e.trim()) : [];
}

// Auto-Sync Schedule Configuration
const AUTO_SYNC_CONFIG = {
  schoolStartHour: 7,   // 7am
  schoolEndHour: 16,    // 4pm
  eveningSyncHour: 17,  // 5pm
  nightSyncHour: 20     // 8pm
};

// Performance & Reliability Settings
const PERFORMANCE_CONFIG = {
  batchSize: 50,                    // Submissions per batch (Canvas supports up to 100)
  maxRetries: 3,                    // API retry attempts
  retryBaseDelay: 1000,             // Initial retry delay (ms)
  apiDelay: 100,                    // Delay between API calls (ms)
  batchDelay: 2000,                 // Delay between batches (ms)
  scalabilityWarningThreshold: 30   // Warn if >30 assignments
};

/**
 * Get dry run state from persistent storage
 */
function isDryRunMode() {
  const props = PropertiesService.getScriptProperties();
  const dryRunValue = props.getProperty('DRY_RUN_MODE');
  return dryRunValue === 'true';
}

/**
 * Check if system is locked (prevents accidental auto-sync during maintenance)
 */
function isSystemLocked() {
  const props = PropertiesService.getScriptProperties();
  return props.getProperty('SYSTEM_LOCKED') === 'true';
}

const LOG_SHEET_NAME = 'Sync Log';

// === COLUMN CONVERSION UTILITIES ===

/**
 * Convert column number (0-indexed) to letter (A, B, ..., Z, AA, AB, ...)
 */
function columnToLetter(column) {
  let letter = '';
  let col = column + 1;

  while (col > 0) {
    const remainder = (col - 1) % 26;
    letter = String.fromCharCode(65 + remainder) + letter;
    col = Math.floor((col - 1) / 26);
  }

  return letter;
}

/**
 * Convert column letter to number (0-indexed)
 */
function letterToColumn(letter) {
  if (!letter || typeof letter !== 'string' || !/^[A-Za-z]+$/.test(letter)) {
    Logger.log(`Invalid column letter: "${letter}"`);
    return -1;
  }

  let column = 0;
  for (let i = 0; i < letter.length; i++) {
    column = column * 26 + (letter.toUpperCase().charCodeAt(i) - 64);
  }
  return column - 1;
}

// === SETUP FUNCTIONS ===

function setupGrade7Mapping() {
  validateConfig();
  const config = getGrade7Config();
  setupAssignmentMapping(config, 'Grade 7');
  initializeTrackingSheet(config);
  initializeLogSheet();
}

function setupGrade8Mapping() {
  validateConfig();
  const config = getGrade8Config();
  setupAssignmentMapping(config, 'Grade 8');
  initializeTrackingSheet(config);
  initializeLogSheet();
}

function setupAssignmentMapping(config, gradeName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let mappingSheet = ss.getSheetByName(config.mappingSheet);

  if (!mappingSheet) {
    mappingSheet = ss.insertSheet(config.mappingSheet);
    mappingSheet.getRange('A1:C1').setValues([['Column Letter', 'Assignment Name', 'Canvas Assignment ID']]);
    mappingSheet.getRange('A1:C1').setFontWeight('bold');
  }

  const allAssignments = getAllCanvasAssignments(config);
  Logger.log(`Total assignments fetched for ${gradeName}: ${allAssignments.length}`);

  const targetAssignments = allAssignments.filter(a =>
    a.name.includes(gradeName) &&
    a.published
  );

  Logger.log(`\nFound ${targetAssignments.length} matching ${gradeName} assignments`);
  targetAssignments.forEach(a => Logger.log(`"${a.name}" (ID: ${a.id})`));

  if (targetAssignments.length === 0) {
    SpreadsheetApp.getUi().alert(`No matching assignments found for ${gradeName}. Check execution log.`);
    return;
  }

  const dataSheet = ss.getSheetByName(config.sheetName);
  const headers = dataSheet.getRange(1, 1, 1, dataSheet.getLastColumn()).getValues()[0];

  const mappingData = [];
  targetAssignments.forEach(assignment => {
    const colIndex = headers.findIndex(h => h.includes(assignment.name.split(' (Responses)')[0]));
    if (colIndex !== -1) {
      const colLetter = columnToLetter(colIndex);
      mappingData.push([colLetter, assignment.name, assignment.id]);
    }
  });

  if (mappingData.length > 0) {
    mappingSheet.getRange(2, 1, mappingData.length, 3).setValues(mappingData);
    SpreadsheetApp.getUi().alert(`${gradeName}: Mapped ${mappingData.length} assignments!`);
  } else {
    SpreadsheetApp.getUi().alert(`${gradeName}: Could not auto-map. Manually fill the mapping sheet.`);
  }
}

function initializeTrackingSheet(config) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let trackingSheet = ss.getSheetByName(config.trackingSheet);

  if (!trackingSheet) {
    trackingSheet = ss.insertSheet(config.trackingSheet);
    trackingSheet.hideSheet();
  }

  trackingSheet.clear();
  trackingSheet.getRange('A1:D1').setValues([['Email', 'Assignment ID', 'Last Score', 'Sync Time']]);
}

function initializeLogSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let logSheet = ss.getSheetByName(LOG_SHEET_NAME);

  if (!logSheet) {
    logSheet = ss.insertSheet(LOG_SHEET_NAME);
    logSheet.getRange('A1:H1').setValues([['Timestamp', 'Grade', 'Email', 'Assignment', 'Action', 'Old Value', 'New Value', 'Notes']]);
    logSheet.getRange('A1:H1').setFontWeight('bold').setBackground('#4285F4').setFontColor('#FFFFFF');
    logSheet.setFrozenRows(1);
  }
}

function logSyncEvent(grade, email, assignmentName, action, oldValue, newValue, notes) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let logSheet = ss.getSheetByName(LOG_SHEET_NAME);

  if (!logSheet) {
    initializeLogSheet();
    logSheet = ss.getSheetByName(LOG_SHEET_NAME);
  }

  const timestamp = new Date();
  logSheet.appendRow([timestamp, grade, email, assignmentName, action, oldValue, newValue, notes]);
}

// === SYNC FUNCTIONS ===

function syncGrade7ToCanvas() {
  validateConfig();
  const config = getGrade7Config();

  const lock = LockService.getScriptLock();
  try {
    if (!lock.tryLock(5000)) {
      SpreadsheetApp.getUi().alert('Sync already in progress. Please wait and try again.');
      return;
    }

    if (isSystemLocked()) {
      SpreadsheetApp.getUi().alert('SYSTEM LOCKED\n\nSync is disabled. Use "Unlock System" to re-enable.');
      return;
    }

    const result = syncGradesToCanvas(config, 'Grade 7');
    SpreadsheetApp.getUi().alert(result);
  } finally {
    lock.releaseLock();
  }
}

function syncGrade8ToCanvas() {
  validateConfig();
  const config = getGrade8Config();

  const lock = LockService.getScriptLock();
  try {
    if (!lock.tryLock(5000)) {
      SpreadsheetApp.getUi().alert('Sync already in progress. Please wait and try again.');
      return;
    }

    if (isSystemLocked()) {
      SpreadsheetApp.getUi().alert('SYSTEM LOCKED\n\nSync is disabled. Use "Unlock System" to re-enable.');
      return;
    }

    const result = syncGradesToCanvas(config, 'Grade 8');
    SpreadsheetApp.getUi().alert(result);
  } finally {
    lock.releaseLock();
  }
}

function syncBothGradesToCanvas() {
  validateConfig();

  const lock = LockService.getScriptLock();
  try {
    if (!lock.tryLock(5000)) {
      SpreadsheetApp.getUi().alert('Sync already in progress. Please wait and try again.');
      return;
    }

    if (isSystemLocked()) {
      SpreadsheetApp.getUi().alert('SYSTEM LOCKED\n\nSync is disabled. Use "Unlock System" to re-enable.');
      return;
    }

    const msg1 = syncGradesToCanvas(getGrade7Config(), 'Grade 7');
    Utilities.sleep(2000);
    const msg2 = syncGradesToCanvas(getGrade8Config(), 'Grade 8');
    SpreadsheetApp.getUi().alert(msg1 + '\n\n' + msg2);
  } finally {
    lock.releaseLock();
  }
}

function syncGradesToCanvas(config, gradeName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const dataSheet = ss.getSheetByName(config.sheetName);
  const mappingSheet = ss.getSheetByName(config.mappingSheet);
  let trackingSheet = ss.getSheetByName(config.trackingSheet);

  // ========================================================================
  // CRITICAL: This script NEVER writes to the dashboard sheet (dataSheet)
  // It ONLY READS from dashboard to sync grades to Canvas
  // Writes only occur to: tracking sheet, log sheet, mapping sheet
  // This preserves all formulas in the dashboard that pull from Google Forms
  // ========================================================================

  // === VALIDATION CHECKS ===

  if (!dataSheet) {
    throw new Error(`${gradeName}: Dashboard sheet "${config.sheetName}" not found!`);
  }

  if (!mappingSheet) {
    throw new Error(`${gradeName}: Mapping sheet not found. Run "Setup Mapping" first!`);
  }

  if (!trackingSheet) {
    Logger.log(`${gradeName}: Creating tracking sheet...`);
    initializeTrackingSheet(config);
    trackingSheet = ss.getSheetByName(config.trackingSheet);
  }

  // Warn if test students not configured
  if (config.testStudentEmails.length === 0) {
    Logger.log(`WARNING: No test students configured for ${gradeName}. All students will be synced.`);
  }

  const mappingData = mappingSheet.getDataRange().getValues().slice(1);
  if (mappingData.length === 0) {
    throw new Error(`${gradeName}: Mapping sheet is empty. Run "Setup Mapping" first!`);
  }

  // Scalability warning
  if (mappingData.length > PERFORMANCE_CONFIG.scalabilityWarningThreshold) {
    Logger.log(`WARNING: ${mappingData.length} assignments for ${gradeName} may cause execution timeout (>6 min limit)`);
  }

  // Get tracking data
  const trackingData = trackingSheet.getDataRange().getValues().slice(1);
  const trackingMap = {};
  trackingData.forEach(row => {
    if (row.length >= 4 && row[0] && row[1] !== null && row[1] !== undefined) {
      const key = `${row[0]}|${row[1]}`;
      const rawScore = row[2];
      const score = (rawScore !== null && rawScore !== undefined) ? Number(rawScore) : null;
      trackingMap[key] = {
        score: isNaN(score) ? null : score,
        time: row[3] || null
      };
    }
  });

  // Fetch assignments with due dates
  const allAssignments = getAllCanvasAssignments(config);
  const assignmentInfo = {};
  allAssignments.forEach(a => assignmentInfo[a.id] = {
    due_at: a.due_at,
    points_possible: a.points_possible,
    name: a.name
  });

  const data = dataSheet.getDataRange().getValues();
  const canvasUsers = getCanvasUsersByEmail(config);

  const startTime = new Date();
  let syncedCount = 0;
  let skippedCount = 0;
  let zerosSyncedCount = 0;
  let unchangedCount = 0;
  let errorCount = 0;
  const errors = [];
  const missingStudents = new Set();
  const newTrackingData = [['Email', 'Assignment ID', 'Last Score', 'Sync Time']];

  // Batch submission queue
  const submissionQueue = [];

  // Process all students and assignments
  for (let i = 1; i < data.length; i++) {
    const email = data[i][0];

    // Skip empty rows and test students
    if (!email || config.testStudentEmails.some(testEmail => email.toLowerCase().includes(testEmail.toLowerCase()))) {
      continue;
    }

    const canvasUserId = canvasUsers[email.toLowerCase()];
    if (!canvasUserId) {
      missingStudents.add(email);
      logSyncEvent(gradeName, email, 'N/A', 'ERROR', '', '', 'Student not found in Canvas');
      errorCount++;
      continue;
    }

    for (const mapping of mappingData) {
      const colLetter = mapping[0];
      const assignmentId = mapping[2];
      const assignmentName = mapping[1];

      if (!colLetter || !assignmentId) continue;

      const colIndex = letterToColumn(colLetter);
      if (colIndex < 0) {
        errors.push(`Invalid column letter "${colLetter}" for ${assignmentName}`);
        logSyncEvent(gradeName, 'N/A', assignmentName, 'ERROR', '', '', `Invalid column letter: ${colLetter}`);
        errorCount++;
        continue;
      }

      if (colIndex >= data[i].length) {
        errors.push(`Column ${colLetter} out of bounds for ${assignmentName}`);
        logSyncEvent(gradeName, email, assignmentName, 'ERROR', '', '', `Column out of bounds: ${colLetter}`);
        errorCount++;
        continue;
      }

      let cellValue = data[i][colIndex];
      const isBlank = (cellValue === '' || cellValue === null || cellValue === undefined);
      let score = isBlank ? null : Number(cellValue);

      if (!isBlank && isNaN(score)) score = 0;

      const trackingKey = `${email}|${assignmentId}`;
      const lastSynced = trackingMap[trackingKey];
      const assignmentData = assignmentInfo[assignmentId];

      if (!assignmentData) {
        Logger.log(`WARNING: Assignment ID ${assignmentId} ("${assignmentName}") not found in Canvas`);
        errors.push(`Assignment not in Canvas: ${assignmentName}`);
        logSyncEvent(gradeName, email, assignmentName, 'WARNING', '', '', 'Assignment not found in Canvas');
        continue;
      }

      // Check due date
      const hasDueDate = assignmentData?.due_at && assignmentData.due_at !== null;
      let isPastDue = false;

      if (hasDueDate) {
        const dueDate = new Date(assignmentData.due_at);
        if (!isNaN(dueDate.getTime())) {
          isPastDue = new Date() > dueDate;
        }
      }

      // === SYNC LOGIC ===

      // Case 1: Blank + not past due -> SKIP
      if (isBlank && !isPastDue) {
        skippedCount++;
        const reason = hasDueDate ? 'Before due date, no submission' : 'No due date set, no submission';
        logSyncEvent(gradeName, email, assignmentName, 'SKIPPED', 'blank', 'blank', reason);
        if (lastSynced) {
          newTrackingData.push([email, assignmentId, lastSynced.score, lastSynced.time]);
        }
        continue;
      }

      // Case 2: Blank + past due -> Sync 0
      if (isBlank && isPastDue) {
        if (lastSynced && lastSynced.score === 0) {
          unchangedCount++;
          newTrackingData.push([email, assignmentId, lastSynced.score, lastSynced.time]);
          continue;
        }

        score = 0;
        submissionQueue.push({
          assignmentId: assignmentId,
          userId: canvasUserId,
          score: 0,
          email: email,
          assignmentName: assignmentName,
          lastSynced: lastSynced,
          isZero: true,
          isPastDue: isPastDue,
          hasDueDate: hasDueDate
        });
        continue;
      }

      // Case 3: Has value - check if changed
      const hasChanged = !lastSynced || lastSynced.score !== score;

      if (!hasChanged) {
        unchangedCount++;
        newTrackingData.push([email, assignmentId, lastSynced.score, lastSynced.time]);
        continue;
      }

      // Case 4: Value changed - queue for sync
      const maxPoints = assignmentData?.points_possible || 100;
      const cappedScore = Math.min(score, maxPoints);

      submissionQueue.push({
        assignmentId: assignmentId,
        userId: canvasUserId,
        score: cappedScore,
        email: email,
        assignmentName: assignmentName,
        lastSynced: lastSynced,
        isZero: false,
        isPastDue: isPastDue,
        hasDueDate: hasDueDate
      });
    }
  }

  // === BATCH SUBMISSION ===

  if (submissionQueue.length > 0) {
    Logger.log(`Processing ${submissionQueue.length} grade changes in batches of ${PERFORMANCE_CONFIG.batchSize}`);

    const batchResults = submitGradesBatch(config, submissionQueue, gradeName);

    // Process batch results
    batchResults.forEach(result => {
      if (result.success) {
        if (result.isZero) {
          zerosSyncedCount++;
          logSyncEvent(gradeName, result.email, result.assignmentName, 'ZERO_SYNCED',
            result.lastSynced?.score || 'blank', '0 (Canvas only)', 'Past due, sheet cell preserved');
        } else {
          syncedCount++;
          const oldVal = result.lastSynced ? result.lastSynced.score : 'none';
          const dueStatus = result.isPastDue ? 'Past due' : (result.hasDueDate ? 'Before due' : 'No due date');
          logSyncEvent(gradeName, result.email, result.assignmentName, 'SYNCED', oldVal, result.score, dueStatus);
        }
        newTrackingData.push([result.email, result.assignmentId, result.score, new Date()]);
      } else {
        errorCount++;
        errors.push(`Failed: ${result.assignmentName} for ${result.email}`);
        logSyncEvent(gradeName, result.email, result.assignmentName, 'ERROR',
          result.lastSynced?.score || '', result.score, result.error || 'Sync failed');
        if (result.lastSynced) {
          newTrackingData.push([result.email, result.assignmentId, result.lastSynced.score, result.lastSynced.time]);
        }
      }
    });
  }

  // Update tracking sheet atomically
  if (newTrackingData.length > 1) {
    trackingSheet.getRange(1, 1, newTrackingData.length, 4).setValues(newTrackingData);
    const currentRows = trackingSheet.getMaxRows();
    if (currentRows > newTrackingData.length) {
      trackingSheet.deleteRows(newTrackingData.length + 1, currentRows - newTrackingData.length);
    }
  } else {
    trackingSheet.clear();
    trackingSheet.getRange('A1:D1').setValues([newTrackingData[0]]);
  }

  // Report missing students
  if (missingStudents.size > 0) {
    Logger.log(`Grade ${gradeName} Errors: Invalid email format in row(s): ${Array.from(missingStudents).join(', ')}`);
  }

  // Performance metrics
  const endTime = new Date();
  const durationSeconds = ((endTime - startTime) / 1000).toFixed(1);
  const totalItems = syncedCount + zerosSyncedCount + unchangedCount + skippedCount + errorCount;

  const dryRunPrefix = isDryRunMode() ? '[DRY RUN] ' : '';
  const message = `${dryRunPrefix}${gradeName}: ${syncedCount} synced | ${zerosSyncedCount} zeros | ${unchangedCount} unchanged | ${skippedCount} skipped | ${errorCount} errors | ${totalItems} items in ${durationSeconds}s`;

  if (errors.length > 0) Logger.log(`${gradeName} Errors:\n` + errors.slice(0, 10).join('\n'));
  Logger.log(message);

  logSyncEvent(gradeName, 'SUMMARY', 'All', 'COMPLETE', '', '', message);

  return message;
}

// === BATCH SUBMISSION HELPER ===

/**
 * Submit grades in batches with retry logic
 */
function submitGradesBatch(config, submissionQueue, gradeName) {
  const results = [];
  const batchSize = PERFORMANCE_CONFIG.batchSize;

  for (let i = 0; i < submissionQueue.length; i += batchSize) {
    const batch = submissionQueue.slice(i, i + batchSize);

    Logger.log(`Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(submissionQueue.length / batchSize)} (${batch.length} submissions)`);

    batch.forEach(submission => {
      if (isDryRunMode()) {
        results.push({
          ...submission,
          success: true
        });
        Logger.log(`[DRY RUN] Would sync: ${submission.email} - ${submission.assignmentName}: ${submission.score}`);
      } else {
        const success = submitGradeToCanvasWithRetry(
          config,
          submission.assignmentId,
          submission.userId,
          submission.score
        );

        results.push({
          ...submission,
          success: success,
          error: success ? null : 'API call failed after retries'
        });
      }

      Utilities.sleep(PERFORMANCE_CONFIG.apiDelay);
    });

    if (i + batchSize < submissionQueue.length) {
      Utilities.sleep(PERFORMANCE_CONFIG.batchDelay);
    }
  }

  return results;
}

// === AUTO-SYNC ===

function enableAutoSync() {
  if (isSystemLocked()) {
    SpreadsheetApp.getUi().alert('SYSTEM LOCKED\n\nCannot enable auto-sync while system is locked.\nUse "Unlock System" first.');
    return;
  }

  if (isDryRunMode()) {
    const ui = SpreadsheetApp.getUi();
    const response = ui.alert(
      'DRY RUN MODE IS ACTIVE',
      'Auto-sync will run in DRY RUN mode (no Canvas changes).\n\n' +
      'This will waste trigger quota without syncing grades.\n\n' +
      'Do you want to:\n' +
      '- Disable Dry Run and enable auto-sync?\n' +
      '- Cancel and manually disable dry run first?',
      ui.ButtonSet.YES_NO
    );

    if (response == ui.Button.YES) {
      disableDryRunMode();
      Utilities.sleep(1000);
    } else {
      return;
    }
  }

  // Delete all existing triggers to prevent duplicates
  deleteAllSyncTriggers();

  // Create fresh trigger
  ScriptApp.newTrigger('smartSync')
    .timeBased()
    .everyMinutes(15)
    .create();

  const scheduleMsg = `School hours: ${AUTO_SYNC_CONFIG.schoolStartHour}:00-${AUTO_SYNC_CONFIG.schoolEndHour}:00 (every 15 min)\nEvening: ${AUTO_SYNC_CONFIG.eveningSyncHour}:00 and ${AUTO_SYNC_CONFIG.nightSyncHour}:00\n\nTo change schedule, edit AUTO_SYNC_CONFIG at top of script.`;

  SpreadsheetApp.getUi().alert(`Auto-sync enabled for BOTH grades!\n\n${scheduleMsg}\n\n- Only syncs CHANGED grades\n- Syncs zeros to Canvas after due date\n- NEVER writes to dashboard sheets\n- Full logging enabled\n- Batch processing with retry logic`);
}

function disableAutoSync() {
  deleteAllSyncTriggers();
  SpreadsheetApp.getUi().alert('Auto-sync disabled for both grades');
}

function smartSync() {
  // Check if system is locked
  if (isSystemLocked()) {
    Logger.log('System locked - auto-sync skipped');
    return;
  }

  // Validate config before proceeding
  try {
    validateConfig();
  } catch (e) {
    Logger.log('Config validation failed: ' + e.message);
    return;
  }

  // Prevent concurrent execution
  const lock = LockService.getScriptLock();
  try {
    if (!lock.tryLock(5000)) {
      Logger.log('Sync already in progress, skipping this run');
      return;
    }
  } catch (e) {
    Logger.log(`Failed to acquire lock: ${e.message}`);
    return;
  }

  try {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();

    // Weekends: only sync at evening hour
    if (day === 0 || day === 6) {
      if (hour !== AUTO_SYNC_CONFIG.eveningSyncHour) return;
    } else {
      // Weekdays: sync during school hours, or at evening/night hours
      if (hour < AUTO_SYNC_CONFIG.schoolStartHour || hour >= AUTO_SYNC_CONFIG.schoolEndHour) {
        if (hour !== AUTO_SYNC_CONFIG.eveningSyncHour && hour !== AUTO_SYNC_CONFIG.nightSyncHour) return;
      }
    }

    syncGradesToCanvas(getGrade7Config(), 'Grade 7');
    Utilities.sleep(2000);
    syncGradesToCanvas(getGrade8Config(), 'Grade 8');
  } finally {
    lock.releaseLock();
  }
}

// === SYSTEM CONTROL FUNCTIONS ===

/**
 * NUCLEAR OPTION: Clear all triggers and lock system
 * Use when updating script, troubleshooting, or during maintenance
 */
function clearAllAndLock() {
  const ui = SpreadsheetApp.getUi();
  const response = ui.alert(
    'CLEAR ALL TRIGGERS AND LOCK SYSTEM',
    'This will:\n' +
    '- Delete ALL auto-sync triggers\n' +
    '- Lock the system (prevent all syncs)\n' +
    '- Require manual unlock to resume\n\n' +
    'Use this when:\n' +
    '- Updating the script\n' +
    '- Troubleshooting issues\n' +
    '- Performing maintenance\n\n' +
    'Continue?',
    ui.ButtonSet.YES_NO
  );

  if (response != ui.Button.YES) return;

  // Delete all triggers
  deleteAllSyncTriggers();

  // Lock system
  const props = PropertiesService.getScriptProperties();
  props.setProperty('SYSTEM_LOCKED', 'true');
  props.setProperty('LOCK_TIMESTAMP', new Date().toISOString());

  ui.alert(
    'SYSTEM LOCKED\n\n' +
    'All auto-sync triggers deleted\n' +
    'System locked - no syncs will run\n' +
    'Manual syncs are disabled\n\n' +
    'Use "Unlock System" when ready to resume.\n\n' +
    'Current state:\n' +
    '- Auto-sync: DISABLED\n' +
    '- Manual sync: DISABLED\n' +
    '- Dry run: ' + (isDryRunMode() ? 'ENABLED' : 'DISABLED')
  );

  logSyncEvent('SYSTEM', 'ADMIN', 'All', 'LOCKED', '', '', 'System locked via clearAllAndLock()');
}

/**
 * Unlock system to allow syncs
 */
function unlockSystem() {
  const props = PropertiesService.getScriptProperties();
  const lockTime = props.getProperty('LOCK_TIMESTAMP');

  props.deleteProperty('SYSTEM_LOCKED');
  props.deleteProperty('LOCK_TIMESTAMP');

  const lockMsg = lockTime ? `\nLocked since: ${lockTime}` : '';

  SpreadsheetApp.getUi().alert(
    'SYSTEM UNLOCKED\n\n' +
    'System unlocked - syncs re-enabled\n' +
    'Manual syncs now allowed\n' +
    'Auto-sync can be re-enabled' +
    lockMsg + '\n\n' +
    'Current state:\n' +
    '- Manual sync: ENABLED\n' +
    '- Auto-sync: Use "Enable Auto-Sync" to activate\n' +
    '- Dry run: ' + (isDryRunMode() ? 'ENABLED' : 'DISABLED')
  );

  logSyncEvent('SYSTEM', 'ADMIN', 'All', 'UNLOCKED', '', '', 'System unlocked');
}

/**
 * Delete all sync-related triggers (helper function)
 */
function deleteAllSyncTriggers() {
  const triggers = ScriptApp.getProjectTriggers();
  let deletedCount = 0;

  triggers.forEach(trigger => {
    if (trigger.getHandlerFunction() === 'smartSync') {
      ScriptApp.deleteTrigger(trigger);
      deletedCount++;
    }
  });

  if (deletedCount > 0) {
    Logger.log(`Deleted ${deletedCount} auto-sync trigger(s)`);
  }

  return deletedCount;
}

/**
 * View all active triggers
 */
function viewAllTriggers() {
  const triggers = ScriptApp.getProjectTriggers();
  const syncTriggers = triggers.filter(t => t.getHandlerFunction() === 'smartSync');

  let message = 'ACTIVE TRIGGERS\n\n';

  if (syncTriggers.length === 0) {
    message += 'No auto-sync triggers active\n';
  } else {
    message += `Found ${syncTriggers.length} auto-sync trigger(s):\n\n`;
    syncTriggers.forEach((trigger, index) => {
      const triggerSource = trigger.getTriggerSource();
      const eventType = trigger.getEventType();
      message += `${index + 1}. ${trigger.getHandlerFunction()}\n`;
      message += `   Source: ${triggerSource}\n`;
      message += `   Type: ${eventType}\n\n`;
    });

    if (syncTriggers.length > 1) {
      message += 'WARNING: Multiple triggers detected!\n';
      message += 'This may cause duplicate syncs.\n';
      message += 'Recommend: "Clear All & Lock", then re-enable auto-sync.\n\n';
    }
  }

  message += '\nSystem Status:\n';
  message += '- Locked: ' + (isSystemLocked() ? 'YES' : 'NO') + '\n';
  message += '- Dry Run: ' + (isDryRunMode() ? 'YES' : 'NO') + '\n';
  message += '- Auto-Sync: ' + (syncTriggers.length > 0 ? 'ENABLED' : 'DISABLED');

  SpreadsheetApp.getUi().alert(message);
}

// === API HELPER FUNCTIONS ===

function getAllCanvasAssignments(config) {
  let allAssignments = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const url = `https://${config.domain}/api/v1/courses/${config.courseId}/assignments?per_page=100&page=${page}`;
    const options = {
      method: 'get',
      headers: { 'Authorization': 'Bearer ' + config.apiKey },
      muteHttpExceptions: true
    };

    try {
      const response = UrlFetchApp.fetch(url, options);
      const statusCode = response.getResponseCode();

      if (statusCode !== 200) {
        Logger.log(`Canvas API error (assignments page ${page}): Status ${statusCode}`);
        Logger.log(`Response: ${response.getContentText()}`);
        throw new Error(`Canvas API returned status ${statusCode}`);
      }

      const assignments = JSON.parse(response.getContentText());

      if (assignments.length === 0) {
        hasMore = false;
      } else {
        allAssignments = allAssignments.concat(assignments);
        page++;
      }
    } catch (e) {
      Logger.log(`Error fetching assignments: ${e.message}`);
      throw new Error(`Failed to fetch assignments from Canvas: ${e.message}`);
    }

    Utilities.sleep(200);
  }

  return allAssignments;
}

function getCanvasUsersByEmail(config) {
  let allUsers = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const url = `https://${config.domain}/api/v1/courses/${config.courseId}/users?enrollment_type[]=student&per_page=100&page=${page}`;
    const options = {
      method: 'get',
      headers: { 'Authorization': 'Bearer ' + config.apiKey },
      muteHttpExceptions: true
    };

    try {
      const response = UrlFetchApp.fetch(url, options);
      const statusCode = response.getResponseCode();

      if (statusCode !== 200) {
        Logger.log(`Canvas API error (users page ${page}): Status ${statusCode}`);
        Logger.log(`Response: ${response.getContentText()}`);
        throw new Error(`Canvas API returned status ${statusCode}`);
      }

      const users = JSON.parse(response.getContentText());

      if (users.length === 0) {
        hasMore = false;
      } else {
        allUsers = allUsers.concat(users);
        page++;
      }
    } catch (e) {
      Logger.log(`Error fetching users: ${e.message}`);
      throw new Error(`Failed to fetch users from Canvas: ${e.message}`);
    }

    Utilities.sleep(200);
  }

  const emailMap = {};
  for (const user of allUsers) {
    if (user.login_id) {
      emailMap[user.login_id.toLowerCase()] = user.id;
    }
  }

  return emailMap;
}

/**
 * Submit grade with exponential backoff retry logic
 */
function submitGradeToCanvasWithRetry(config, assignmentId, userId, score) {
  const maxRetries = PERFORMANCE_CONFIG.maxRetries;
  const baseDelay = PERFORMANCE_CONFIG.retryBaseDelay;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const result = submitGradeToCanvas(config, assignmentId, userId, score);

    if (result.success) {
      if (attempt > 1) {
        Logger.log(`Success on retry ${attempt - 1} for assignment ${assignmentId}`);
      }
      return true;
    }

    if (attempt < maxRetries && result.shouldRetry) {
      const delay = baseDelay * Math.pow(2, attempt - 1);
      Logger.log(`Retry ${attempt}/${maxRetries} for assignment ${assignmentId} after ${delay}ms (reason: ${result.error})`);
      Utilities.sleep(delay);
    } else {
      Logger.log(`Failed after ${attempt} attempts for assignment ${assignmentId}: ${result.error}`);
      return false;
    }
  }

  return false;
}

function submitGradeToCanvas(config, assignmentId, userId, score) {
  const url = `https://${config.domain}/api/v1/courses/${config.courseId}/assignments/${assignmentId}/submissions/${userId}`;
  const payload = { 'submission': { 'posted_grade': score } };

  const options = {
    method: 'put',
    headers: {
      'Authorization': 'Bearer ' + config.apiKey,
      'Content-Type': 'application/json'
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  try {
    const response = UrlFetchApp.fetch(url, options);
    const statusCode = response.getResponseCode();

    if (statusCode >= 200 && statusCode < 300) {
      return { success: true, shouldRetry: false };
    }

    // Rate limiting or server errors - retry
    if (statusCode === 429 || statusCode >= 500) {
      const errorBody = response.getContentText();
      return {
        success: false,
        shouldRetry: true,
        error: `HTTP ${statusCode}: ${errorBody.substring(0, 100)}`
      };
    }

    // Client errors (4xx) - don't retry
    const errorBody = response.getContentText();
    Logger.log(`Canvas submission failed (${statusCode}): ${errorBody}`);
    return {
      success: false,
      shouldRetry: false,
      error: `HTTP ${statusCode}: ${errorBody.substring(0, 100)}`
    };

  } catch (e) {
    Logger.log(`Submit error: ${e}`);
    return {
      success: false,
      shouldRetry: true,
      error: `Exception: ${e.message}`
    };
  }
}

// ============================================================================
// CANVAS ROSTER / EMAIL SYNC FUNCTIONS
// ============================================================================

/**
 * Update Grade 7 student emails from Canvas roster
 */
function updateGrade7() {
  validateConfig();
  const config = getGrade7Config();
  updateEmailsFromCanvas(config, 'Grade 7');
}

/**
 * Update Grade 8 student emails from Canvas roster
 */
function updateGrade8() {
  validateConfig();
  const config = getGrade8Config();
  updateEmailsFromCanvas(config, 'Grade 8');
}

/**
 * Update both grades' student emails from Canvas roster
 */
function updateBoth() {
  validateConfig();
  updateGrade7();
  Utilities.sleep(1000);
  updateGrade8();
  SpreadsheetApp.getUi().alert('Both Grade 7 and Grade 8 email rosters updated from Canvas.');
}

/**
 * Fetch student emails from Canvas and update the dashboard sheet
 * @param {Object} config - Grade configuration
 * @param {string} gradeName - Grade name for logging
 */
function updateEmailsFromCanvas(config, gradeName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const dataSheet = ss.getSheetByName(config.sheetName);

  if (!dataSheet) {
    SpreadsheetApp.getUi().alert(`${gradeName}: Dashboard sheet "${config.sheetName}" not found!`);
    return;
  }

  // Fetch users from Canvas
  const canvasUsers = getCanvasUsersWithDetails(config);

  if (canvasUsers.length === 0) {
    SpreadsheetApp.getUi().alert(`${gradeName}: No students found in Canvas course.`);
    return;
  }

  // Log fetched users
  Logger.log(`${gradeName}: Fetched ${canvasUsers.length} students from Canvas`);
  canvasUsers.forEach(u => Logger.log(`  - ${u.name} (${u.email})`));

  SpreadsheetApp.getUi().alert(
    `${gradeName} Roster Updated\n\n` +
    `Found ${canvasUsers.length} students in Canvas.\n\n` +
    'Check the execution log for details.\n' +
    'Note: This fetches the roster for reference. ' +
    'Email column in dashboard should already be populated from form responses.'
  );
}

/**
 * Get Canvas users with full details (name, email, id)
 * @param {Object} config - Grade configuration
 * @returns {Array} Array of user objects
 */
function getCanvasUsersWithDetails(config) {
  let allUsers = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const url = `https://${config.domain}/api/v1/courses/${config.courseId}/users?enrollment_type[]=student&per_page=100&page=${page}`;
    const options = {
      method: 'get',
      headers: { 'Authorization': 'Bearer ' + config.apiKey },
      muteHttpExceptions: true
    };

    try {
      const response = UrlFetchApp.fetch(url, options);
      const statusCode = response.getResponseCode();

      if (statusCode !== 200) {
        Logger.log(`Canvas API error (users page ${page}): Status ${statusCode}`);
        throw new Error(`Canvas API returned status ${statusCode}`);
      }

      const users = JSON.parse(response.getContentText());

      if (users.length === 0) {
        hasMore = false;
      } else {
        allUsers = allUsers.concat(users.map(u => ({
          id: u.id,
          name: u.name || u.sortable_name || 'Unknown',
          email: u.login_id || u.email || ''
        })));
        page++;
      }
    } catch (e) {
      Logger.log(`Error fetching users: ${e.message}`);
      throw e;
    }

    Utilities.sleep(200);
  }

  return allUsers;
}

// === MENU & UI ===

function onOpen() {
  const ui = SpreadsheetApp.getUi();

  // Canvas Roster Menu
  ui.createMenu('Canvas Roster')
    .addItem('Update Grade 7 Emails', 'updateGrade7')
    .addItem('Update Grade 8 Emails', 'updateGrade8')
    .addItem('Update Both Grades', 'updateBoth')
    .addToUi();

  // Grade Sync Menus
  ui.createMenu('Grade 7 Sync')
    .addItem('Setup Mapping', 'setupGrade7Mapping')
    .addItem('Sync to Canvas', 'syncGrade7ToCanvas')
    .addToUi();

  ui.createMenu('Grade 8 Sync')
    .addItem('Setup Mapping', 'setupGrade8Mapping')
    .addItem('Sync to Canvas', 'syncGrade8ToCanvas')
    .addToUi();

  ui.createMenu('Both Grades')
    .addItem('Sync Both to Canvas', 'syncBothGradesToCanvas')
    .addSeparator()
    .addItem('Enable Auto-Sync', 'enableAutoSync')
    .addItem('Disable Auto-Sync', 'disableAutoSync')
    .addSeparator()
    .addItem('View Sync Dashboard', 'showSyncDashboard')
    .addItem('Show Current Mode', 'showCurrentMode')
    .addSeparator()
    .addSubMenu(ui.createMenu('Dry Run Mode')
      .addItem('Enable Dry Run (Test Mode)', 'enableDryRunMode')
      .addItem('Disable Dry Run (Live Mode)', 'disableDryRunMode'))
    .addSeparator()
    .addSubMenu(ui.createMenu('System Control')
      .addItem('Clear All & Lock System', 'clearAllAndLock')
      .addItem('Unlock System', 'unlockSystem')
      .addItem('View All Triggers', 'viewAllTriggers'))
    .addToUi();
}

// === MONITORING & UTILITIES ===

function enableDryRunMode() {
  const props = PropertiesService.getScriptProperties();
  props.setProperty('DRY_RUN_MODE', 'true');

  SpreadsheetApp.getUi().alert(
    'DRY RUN MODE ENABLED\n\n' +
    'All syncs will be SIMULATED\n' +
    'No changes will be made to Canvas\n' +
    'Check execution log to see what WOULD happen\n\n' +
    'Perfect for testing new mappings or configurations.\n\n' +
    'Use "Disable Dry Run" when ready for live syncing.'
  );
}

function disableDryRunMode() {
  const props = PropertiesService.getScriptProperties();
  props.setProperty('DRY_RUN_MODE', 'false');

  SpreadsheetApp.getUi().alert(
    'DRY RUN MODE DISABLED\n\n' +
    'Syncs will now UPDATE Canvas grades\n' +
    'Normal production mode active\n\n' +
    'Grades will be synced to Canvas on next sync.'
  );
}

function showCurrentMode() {
  const dryRunStatus = isDryRunMode() ? 'DRY RUN (Safe Mode)' : 'LIVE MODE (Production)';
  const lockStatus = isSystemLocked() ? 'LOCKED' : 'UNLOCKED';
  const triggers = ScriptApp.getProjectTriggers();
  const autoSyncStatus = triggers.some(t => t.getHandlerFunction() === 'smartSync') ? 'ENABLED' : 'DISABLED';

  SpreadsheetApp.getUi().alert(
    'CURRENT SETTINGS\n\n' +
    `System: ${lockStatus}\n` +
    `Sync Mode: ${dryRunStatus}\n` +
    `Auto-Sync: ${autoSyncStatus}\n\n` +
    (isSystemLocked() ?
      'System is LOCKED - all syncs disabled\nUse "Unlock System" to resume.' :
      (isDryRunMode() ?
        'Syncs are being SIMULATED (no Canvas changes)\nUse "Disable Dry Run" to go live.' :
        'Syncs are LIVE (updating Canvas gradebook)\nUse "Enable Dry Run" to test safely.'))
  );
}

function showSyncDashboard() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const logSheet = ss.getSheetByName(LOG_SHEET_NAME);

  if (!logSheet) {
    SpreadsheetApp.getUi().alert('No sync log found. Run a sync first.');
    return;
  }

  const logData = logSheet.getDataRange().getValues();
  if (logData.length <= 1) {
    SpreadsheetApp.getUi().alert('No sync history yet. Run a sync first.');
    return;
  }

  const recentEvents = logData.slice(-50).reverse();

  const grade7Summary = recentEvents.find(row => row[1] === 'Grade 7' && row[4] === 'COMPLETE');
  const grade8Summary = recentEvents.find(row => row[1] === 'Grade 8' && row[4] === 'COMPLETE');

  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const recent24h = logData.filter(row => row[0] && new Date(row[0]) > oneDayAgo);

  const errorCount24h = recent24h.filter(row => row[4] === 'ERROR').length;
  const syncCount24h = recent24h.filter(row => row[4] === 'SYNCED').length;
  const zeroCount24h = recent24h.filter(row => row[4] === 'ZERO_SYNCED').length;

  let dashboard = 'SYNC MONITORING DASHBOARD\n';
  dashboard += '='.repeat(50) + '\n\n';

  dashboard += 'LAST 24 HOURS:\n';
  dashboard += `  - ${syncCount24h} grades synced\n`;
  dashboard += `  - ${zeroCount24h} zeros filled\n`;
  dashboard += `  - ${errorCount24h} errors\n\n`;

  if (grade7Summary) {
    dashboard += 'GRADE 7 (Last Sync):\n';
    dashboard += `  Time: ${grade7Summary[0]}\n`;
    dashboard += `  ${grade7Summary[6]}\n\n`;
  } else {
    dashboard += 'GRADE 7: No recent sync\n\n';
  }

  if (grade8Summary) {
    dashboard += 'GRADE 8 (Last Sync):\n';
    dashboard += `  Time: ${grade8Summary[0]}\n`;
    dashboard += `  ${grade8Summary[6]}\n\n`;
  } else {
    dashboard += 'GRADE 8: No recent sync\n\n';
  }

  const triggers = ScriptApp.getProjectTriggers();
  const autoSyncEnabled = triggers.some(t => t.getHandlerFunction() === 'smartSync');

  dashboard += 'SYSTEM: ' + (isSystemLocked() ? 'LOCKED' : 'UNLOCKED') + '\n';
  dashboard += 'AUTO-SYNC: ' + (autoSyncEnabled ? 'ENABLED' : 'DISABLED') + '\n';
  dashboard += 'DRY RUN: ' + (isDryRunMode() ? 'ON (Safe Mode)' : 'OFF (Live Mode)') + '\n';
  dashboard += '='.repeat(50) + '\n';
  dashboard += '\nView full log in "Sync Log" sheet';

  SpreadsheetApp.getUi().alert(dashboard);
}

// === CONFIGURATION HELPER ===

/**
 * Show configuration status and help with setup
 */
function showConfigStatus() {
  const props = PropertiesService.getScriptProperties();
  const allProps = props.getProperties();

  const required = ['CANVAS_DOMAIN', 'CANVAS_API_KEY', 'GRADE_7_COURSE_ID', 'GRADE_8_COURSE_ID'];
  const optional = ['GRADE_7_TEST_EMAILS', 'GRADE_8_TEST_EMAILS', 'DRY_RUN_MODE', 'SYSTEM_LOCKED'];

  let status = 'CONFIGURATION STATUS\n';
  status += '='.repeat(50) + '\n\n';

  status += 'REQUIRED PROPERTIES:\n';
  required.forEach(prop => {
    const value = allProps[prop];
    const hasValue = value && value.length > 0;
    const displayValue = hasValue ? (prop.includes('API_KEY') ? '[SET - hidden]' : value) : '[NOT SET]';
    status += `  ${prop}: ${displayValue}\n`;
  });

  status += '\nOPTIONAL PROPERTIES:\n';
  optional.forEach(prop => {
    const value = allProps[prop] || '[NOT SET]';
    status += `  ${prop}: ${value}\n`;
  });

  status += '\n' + '='.repeat(50) + '\n';
  status += 'To configure: Project Settings > Script Properties';

  SpreadsheetApp.getUi().alert(status);
}
