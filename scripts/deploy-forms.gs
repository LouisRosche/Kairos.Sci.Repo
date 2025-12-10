/**
 * deploy-forms.gs
 * Batch deployment orchestrator for Google Forms
 *
 * KAMS Science Curriculum System v3.0
 *
 * ============================================================================
 * DEPLOYMENT WORKFLOW - READ FIRST
 * ============================================================================
 *
 * There are TWO deployment approaches:
 *
 * APPROACH 1: Content-Based Deployment (CURRENT - Recommended)
 * -------------------------------------------------------------
 * Each week's forms.gs contains ready-to-run form creation functions.
 * To deploy forms for Grade 7, Cycle 3, Week 1:
 *
 *   1. Open content/grade7/cycle03/week1/forms.gs in Apps Script
 *   2. Run: createAllG7C3W1Forms()  (or individual createG7C3W1Hook_(), etc.)
 *   3. Form URLs are logged - copy to student-page.html
 *   4. Update cycle-status.json: deployed: true
 *
 * Why this approach: Form content is embedded in forms.gs for version control,
 * NGSS alignment tracking, and full customization per week.
 *
 * APPROACH 2: Config-Driven Deployment (FUTURE)
 * ----------------------------------------------
 * This script orchestrates deployment from cycle JSON configs.
 * Requires: FormTemplate.gs integration, registry setup.
 * See DEPLOYMENT-CHECKLIST.md for full setup instructions.
 *
 * ============================================================================
 * USAGE
 * ============================================================================
 *
 * Get current cycle/week (auto-detected from dates):
 *   getCurrentDeploymentTarget()
 *
 * Deploy specific week (stub mode until configured):
 *   deployWeek(grade, cycle, week)
 *
 * Deploy full cycle:
 *   deployCycle(grade, cycle)
 *
 * ============================================================================
 */

// ============================================================================
// CONFIGURATION - Set these after creating Google infrastructure
// ============================================================================

const DEPLOYMENT_CONFIG = {
  // Set after creating registry spreadsheet (see DEPLOYMENT-CHECKLIST.md Phase 1.1)
  registrySheetId: '',

  // Google Drive folder containing cycle configs (Phase 1.2)
  configFolderId: '',

  // Destination folder for created forms (Phase 1.2)
  formFolderId: '',

  // Deployment log spreadsheet (Phase 1.1)
  logSheetId: ''
};

// ============================================================================
// AUTO-DETECTION FUNCTIONS (Integrated with Config.gs)
// ============================================================================

/**
 * Get current deployment target based on dates
 * Uses Config.gs auto-detection for cycle/week
 * @returns {Object} {grade, cycle, week, status}
 */
function getCurrentDeploymentTarget() {
  try {
    const period = Config.getAutoCycleWeek();
    const grades = Config.getActiveGrades();

    return {
      grades: grades,
      cycle: period.cycle,
      week: period.week,
      source: period.source,
      detectedAt: new Date().toISOString(),
      status: 'detected',
      hint: `To deploy: Run content/grade{7,8}/cycle${String(period.cycle).padStart(2,'0')}/week${period.week}/forms.gs`
    };
  } catch (e) {
    // Fallback if Config.gs not available
    return {
      grades: [7, 8],
      cycle: 3,
      week: 1,
      source: 'fallback',
      status: 'config_unavailable',
      error: e.message,
      hint: 'Config.gs not loaded. Using defaults.'
    };
  }
}

/**
 * Show deployment status and recommendations
 * Run this to see what should be deployed next
 */
function showDeploymentStatus() {
  const target = getCurrentDeploymentTarget();

  Logger.log('=== DEPLOYMENT STATUS ===');
  Logger.log(`Current Period: Cycle ${target.cycle}, Week ${target.week}`);
  Logger.log(`Detection Source: ${target.source}`);
  Logger.log(`Active Grades: ${target.grades.join(', ')}`);
  Logger.log('');
  Logger.log('RECOMMENDED ACTION:');
  Logger.log(target.hint);
  Logger.log('');
  Logger.log('For full deployment instructions, see: DEPLOYMENT-CHECKLIST.md');

  return target;
}

// ============================================================================
// DEPLOYMENT FUNCTIONS
// ============================================================================

/**
 * Deploy all forms for a specific week
 * @param {number} grade - 7 or 8
 * @param {number} cycle - 3-8
 * @param {number} week - 1-3
 * @returns {Object} Deployment results with form URLs
 */
function deployWeek(grade, cycle, week) {
  Logger.log(`Deploying G${grade} C${cycle} W${week}...`);

  // Check configuration
  if (!DEPLOYMENT_CONFIG.configFolderId || !DEPLOYMENT_CONFIG.formFolderId) {
    Logger.log('INFO: DEPLOYMENT_CONFIG not set. Running in stub mode.');
    Logger.log('');
    Logger.log('RECOMMENDED: Use content-based deployment instead:');
    Logger.log(`  1. Open content/grade${grade}/cycle${String(cycle).padStart(2,'0')}/week${week}/forms.gs`);
    Logger.log('  2. Run the createAll... function');
    Logger.log('  3. Copy form URLs to student-page.html');
    Logger.log('');

    return {
      grade: grade,
      cycle: cycle,
      week: week,
      status: 'stub',
      message: 'Use content-based deployment (see logs for instructions)',
      contentPath: `content/grade${grade}/cycle${String(cycle).padStart(2,'0')}/week${week}/forms.gs`,
      forms: {
        hook: { id: null, url: null, status: 'use_content_forms.gs' },
        station1: { id: null, url: null, status: 'use_content_forms.gs' },
        station2: { id: null, url: null, status: 'use_content_forms.gs' },
        station3: { id: null, url: null, status: 'use_content_forms.gs' },
        exitTicket: { id: null, url: null, status: 'use_content_forms.gs' }
      }
    };
  }

  // Config-driven deployment (when configured)
  try {
    // Load configs
    const cycleConfig = loadCycleConfig_(cycle);
    const gradeConfig = cycleConfig.grades[String(grade)];

    if (!gradeConfig) {
      throw new Error(`Grade ${grade} not found in cycle ${cycle} config`);
    }

    const weekConfig = gradeConfig.weeks[String(week)];
    if (!weekConfig) {
      throw new Error(`Week ${week} not found in config`);
    }

    // Generate forms using FormTemplate.gs
    const results = {
      grade: grade,
      cycle: cycle,
      week: week,
      deployed: new Date().toISOString(),
      status: 'success',
      forms: {}
    };

    const formTypes = ['hook', 'station1', 'station2', 'station3', 'exitTicket'];

    formTypes.forEach(formType => {
      try {
        // This would call FormTemplate.gs functions
        // const form = FormTemplate.generateForm(grade, cycle, week, formType, weekConfig);
        // results.forms[formType] = { id: form.getId(), url: form.getEditUrl(), status: 'created' };

        results.forms[formType] = {
          status: 'pending_implementation',
          message: 'FormTemplate.gs integration needed'
        };
      } catch (e) {
        results.forms[formType] = { error: e.message, status: 'failed' };
      }
    });

    // Save to registry
    saveToRegistry_(results);

    return results;

  } catch (e) {
    Logger.log(`ERROR: ${e.message}`);
    return {
      grade: grade,
      cycle: cycle,
      week: week,
      status: 'error',
      error: e.message
    };
  }
}

/**
 * Deploy all forms for an entire cycle
 * @param {number} grade - 7 or 8
 * @param {number} cycle - 3-8
 * @returns {Object} Deployment results for all weeks
 */
function deployCycle(grade, cycle) {
  Logger.log(`Deploying full cycle: G${grade} C${cycle}`);

  const weeksPerCycle = Config ? Config.getCycles().weeksPerCycle : 3;

  const results = {
    grade: grade,
    cycle: cycle,
    deployed: new Date().toISOString(),
    weeks: {}
  };

  for (let week = 1; week <= weeksPerCycle; week++) {
    try {
      results.weeks[week] = deployWeek(grade, cycle, week);
      Logger.log(`Week ${week} complete`);
    } catch (e) {
      results.weeks[week] = { error: e.message };
      Logger.log(`ERROR deploying week ${week}: ${e.message}`);
    }
  }

  return results;
}

/**
 * Deploy all forms for both grades in a cycle
 * @param {number} cycle - 3-8
 * @returns {Object} Full deployment results
 */
function deployFullCycle(cycle) {
  Logger.log(`=== FULL CYCLE ${cycle} DEPLOYMENT ===`);

  const grades = Config ? Config.getActiveGrades() : [7, 8];

  const results = {
    cycle: cycle,
    deployed: new Date().toISOString(),
    grades: {}
  };

  grades.forEach(grade => {
    results.grades[`grade${grade}`] = deployCycle(grade, cycle);
  });

  return results;
}

// ============================================================================
// REGISTRY FUNCTIONS
// ============================================================================

/**
 * Save deployed form info to registry
 * @private
 */
function saveToRegistry_(formInfo) {
  if (!DEPLOYMENT_CONFIG.registrySheetId) {
    Logger.log('INFO: No registry configured. Form IDs logged only.');
    return { saved: false, reason: 'no_registry_configured' };
  }

  try {
    const sheet = SpreadsheetApp.openById(DEPLOYMENT_CONFIG.registrySheetId);
    const dataSheet = sheet.getSheetByName('FormRegistry') || sheet.insertSheet('FormRegistry');

    // Add header if empty
    if (dataSheet.getLastRow() === 0) {
      dataSheet.appendRow(['Grade', 'Cycle', 'Week', 'FormType', 'FormID', 'FormURL', 'DeployedAt']);
    }

    // Add form entries
    Object.entries(formInfo.forms || {}).forEach(([formType, data]) => {
      if (data.id) {
        dataSheet.appendRow([
          formInfo.grade,
          formInfo.cycle,
          formInfo.week,
          formType,
          data.id,
          data.url,
          formInfo.deployed
        ]);
      }
    });

    return { saved: true };
  } catch (e) {
    Logger.log(`Registry save error: ${e.message}`);
    return { saved: false, error: e.message };
  }
}

/**
 * Get form URL from registry
 * @param {number} grade
 * @param {number} cycle
 * @param {number} week
 * @param {string} formType - hook, station1, station2, station3, exitTicket
 * @returns {string|null} Form URL or null if not found
 */
function getFormUrl(grade, cycle, week, formType) {
  if (!DEPLOYMENT_CONFIG.registrySheetId) {
    Logger.log('INFO: No registry configured.');
    return null;
  }

  try {
    const sheet = SpreadsheetApp.openById(DEPLOYMENT_CONFIG.registrySheetId);
    const dataSheet = sheet.getSheetByName('FormRegistry');
    if (!dataSheet) return null;

    const data = dataSheet.getDataRange().getValues();

    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      if (row[0] == grade && row[1] == cycle && row[2] == week && row[3] == formType) {
        return row[5]; // FormURL column
      }
    }
  } catch (e) {
    Logger.log(`Registry lookup error: ${e.message}`);
  }

  return null;
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Load cycle configuration from Drive
 * @private
 */
function loadCycleConfig_(cycle) {
  const filename = `cycle${String(cycle).padStart(2, '0')}.json`;

  // Try config folder first
  if (DEPLOYMENT_CONFIG.configFolderId) {
    const folder = DriveApp.getFolderById(DEPLOYMENT_CONFIG.configFolderId);
    const files = folder.getFilesByName(filename);
    if (files.hasNext()) {
      return JSON.parse(files.next().getBlob().getDataAsString());
    }
  }

  // Fallback to searching Drive
  const files = DriveApp.getFilesByName(filename);
  if (files.hasNext()) {
    return JSON.parse(files.next().getBlob().getDataAsString());
  }

  throw new Error(`Config not found: ${filename}`);
}

/**
 * Check if forms already exist for a week
 */
function formsExist(grade, cycle, week) {
  if (!DEPLOYMENT_CONFIG.registrySheetId) return false;

  // Check registry for any form entry
  return getFormUrl(grade, cycle, week, 'hook') !== null;
}

/**
 * Log deployment action
 */
function logDeployment_(action, details) {
  const timestamp = new Date().toISOString();
  Logger.log(`[${timestamp}] ${action}: ${JSON.stringify(details)}`);

  if (DEPLOYMENT_CONFIG.logSheetId) {
    try {
      const sheet = SpreadsheetApp.openById(DEPLOYMENT_CONFIG.logSheetId);
      const logSheet = sheet.getSheetByName('FormDeployment') || sheet.insertSheet('FormDeployment');
      logSheet.appendRow([timestamp, action, JSON.stringify(details)]);
    } catch (e) {
      Logger.log(`Log save error: ${e.message}`);
    }
  }
}

// ============================================================================
// MENU FUNCTIONS (for use when attached to a spreadsheet)
// ============================================================================

/**
 * Add custom menu to spreadsheet
 */
function onOpen() {
  try {
    const ui = SpreadsheetApp.getUi();
    ui.createMenu('Form Deployment')
      .addItem('Show Current Status', 'showDeploymentStatus')
      .addItem('Deploy Current Week', 'deployCurrentWeekMenu_')
      .addSeparator()
      .addItem('View Documentation', 'showDocumentation_')
      .addToUi();
  } catch (e) {
    // Not running in spreadsheet context
  }
}

/**
 * Deploy forms for current active week
 * @private
 */
function deployCurrentWeekMenu_() {
  const target = getCurrentDeploymentTarget();
  const ui = SpreadsheetApp.getUi();

  const response = ui.alert(
    'Deploy Current Week',
    `Deploy forms for Cycle ${target.cycle}, Week ${target.week}?\n\n` +
    `This will create forms for grades: ${target.grades.join(', ')}\n\n` +
    `Alternatively, run the forms.gs file directly:\n` +
    target.hint,
    ui.ButtonSet.YES_NO
  );

  if (response === ui.Button.YES) {
    target.grades.forEach(grade => {
      const result = deployWeek(grade, target.cycle, target.week);
      Logger.log(`G${grade} result: ${JSON.stringify(result)}`);
    });
    ui.alert('Deployment complete. Check execution logs for details.');
  }
}

/**
 * Show documentation link
 * @private
 */
function showDocumentation_() {
  SpreadsheetApp.getUi().alert(
    'Deployment Documentation',
    'See DEPLOYMENT-CHECKLIST.md in the repository root for:\n\n' +
    '• Phase 1: Google Infrastructure Setup\n' +
    '• Phase 2: Apps Script Deployment\n' +
    '• Phase 3: Canvas LMS Integration\n' +
    '• Phase 4: Form Deployment\n' +
    '• Phase 5: Testing & Validation\n\n' +
    'Quick Start: Run forms.gs files directly from content/ folders.',
    SpreadsheetApp.getUi().ButtonSet.OK
  );
}
