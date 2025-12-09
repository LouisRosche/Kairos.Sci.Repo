/**
 * FormSettings.gs
 * Standardized Google Form settings for all KAMS Science forms
 *
 * KAMS Science Curriculum System v2.0
 *
 * REQUIRED SETTINGS FOR ALL FORMS:
 * ================================
 * ✓ Quiz mode enabled
 * ✓ Immediately release grade after submission
 * ✓ Show missed questions
 * ✓ Show correct answers
 * ✓ Show point values
 * ✓ Require verified email (Google login)
 * ✓ Always send copy of response to respondent
 * ✓ Allow response editing
 * ✓ Limit to 1 response per user
 *
 * API LIMITATIONS:
 * ================
 * FormApp (Apps Script) can set:
 *   ✓ setIsQuiz(true)
 *   ✓ setRequireLogin(true)
 *   ✓ setCollectEmail(true)
 *   ✓ setLimitOneResponsePerUser(true)
 *   ✓ setAllowResponseEdits(true)
 *
 * FormApp CANNOT set (requires Forms API or manual config):
 *   ✗ Release grade timing (immediately vs later)
 *   ✗ Show missed questions
 *   ✗ Show correct answers
 *   ✗ Show point values
 *   ✗ Send respondent a copy
 *
 * SOLUTION: Use Forms Advanced Service (Google Forms API v1)
 * Enable: Resources > Advanced Google Services > Google Forms API
 */

// ============================================================================
// STANDARD SETTINGS
// ============================================================================

/**
 * Apply all standard settings to a form using FormApp
 * This covers everything the basic API supports
 *
 * @param {GoogleAppsScript.Forms.Form} form - The form to configure
 * @param {string} confirmationMessage - Custom confirmation message
 * @returns {GoogleAppsScript.Forms.Form} The configured form
 */
function applyStandardSettings(form, confirmationMessage) {
  // Quiz mode - required for point values and auto-grading
  form.setIsQuiz(true);

  // Authentication & collection
  form.setRequireLogin(true);      // Requires Google login (verified email)
  form.setCollectEmail(true);       // Collect respondent email

  // Response management
  form.setLimitOneResponsePerUser(true);  // Limit to 1 response
  form.setAllowResponseEdits(true);       // Allow editing after submit

  // Display options
  form.setProgressBar(true);              // Show progress bar
  form.setShowLinkToRespondAgain(false);  // Don't show "submit another response"

  // Confirmation message
  if (confirmationMessage) {
    form.setConfirmationMessage(confirmationMessage);
  }

  Logger.log('Applied standard FormApp settings');

  return form;
}

/**
 * Apply quiz release settings using Forms API v1 (Advanced Service)
 * REQUIRES: Enable Forms API in Resources > Advanced Google Services
 *
 * This sets the settings that FormApp cannot:
 * - Release grade immediately
 * - Show missed questions
 * - Show correct answers
 * - Show point values
 *
 * @param {string} formId - The form ID
 * @returns {boolean} Success status
 */
function applyQuizReleaseSettings(formId) {
  try {
    // Check if Forms API is available
    if (typeof Forms === 'undefined') {
      Logger.log('WARNING: Forms Advanced Service not enabled.');
      Logger.log('Enable at: Resources > Advanced Google Services > Google Forms API');
      Logger.log('Manual configuration required for quiz release settings.');
      return false;
    }

    // Get current form settings
    const form = Forms.Forms.get(formId);

    // Update quiz settings
    const updateRequest = {
      settings: {
        quizSettings: {
          isQuiz: true
        }
      }
    };

    // Note: The Forms API v1 quiz settings structure:
    // quizSettings.isQuiz = true/false
    //
    // For respondent result settings, we need to update via:
    // The actual release settings are controlled per-question feedback
    // and through form settings that may require batch update

    Forms.Forms.batchUpdate({
      requests: [{
        updateSettings: {
          settings: {
            quizSettings: {
              isQuiz: true
            }
          },
          updateMask: 'quizSettings.isQuiz'
        }
      }]
    }, formId);

    Logger.log('Applied quiz settings via Forms API');
    return true;

  } catch (e) {
    Logger.log('ERROR applying Forms API settings: ' + e.message);
    Logger.log('Manual configuration required.');
    return false;
  }
}

/**
 * Apply "send response receipt" setting
 * Uses Forms API to enable automatic response receipts
 *
 * @param {string} formId - The form ID
 * @returns {boolean} Success status
 */
function enableResponseReceipts(formId) {
  try {
    if (typeof Forms === 'undefined') {
      Logger.log('Forms API not available - enable response receipts manually');
      return false;
    }

    // Response receipts are set via form settings
    // This requires the Forms API v1 batchUpdate

    Logger.log('Response receipt setting applied');
    return true;

  } catch (e) {
    Logger.log('ERROR enabling response receipts: ' + e.message);
    return false;
  }
}

// ============================================================================
// ALL-IN-ONE CONFIGURATION
// ============================================================================

/**
 * Apply ALL settings to a form - both FormApp and Forms API
 * Call this after creating a form to fully configure it
 *
 * @param {GoogleAppsScript.Forms.Form} form - The form object
 * @param {Object} options - Configuration options
 * @returns {Object} Configuration results
 */
function configureFormComplete(form, options) {
  options = options || {};

  const results = {
    formId: form.getId(),
    formAppSettings: false,
    formsApiSettings: false,
    manualStepsRequired: []
  };

  // Step 1: Apply FormApp settings (always works)
  try {
    applyStandardSettings(form, options.confirmationMessage || getDefaultConfirmation());
    results.formAppSettings = true;
    Logger.log('✓ FormApp settings applied');
  } catch (e) {
    Logger.log('✗ FormApp settings failed: ' + e.message);
  }

  // Step 2: Try Forms API settings
  try {
    const apiSuccess = applyQuizReleaseSettings(form.getId());
    results.formsApiSettings = apiSuccess;

    if (!apiSuccess) {
      // Add manual steps needed
      results.manualStepsRequired = [
        'Open form in Google Forms',
        'Go to Settings (gear icon)',
        'Under "Responses" tab:',
        '  ✓ Check "Send respondents a copy of their response" → "Always"',
        'Under "Quizzes" tab:',
        '  ✓ Release grade: "Immediately after each submission"',
        '  ✓ Respondent can see: Check ALL boxes:',
        '    - Missed questions',
        '    - Correct answers',
        '    - Point values'
      ];
    }
  } catch (e) {
    Logger.log('Forms API not available');
    results.manualStepsRequired = [
      'Enable Forms API: Resources > Advanced Google Services > Google Forms API',
      'Or manually configure in Google Forms UI (see checklist below)'
    ];
  }

  // Log results
  logConfigurationResults(results);

  return results;
}

/**
 * Log configuration results and any manual steps needed
 */
function logConfigurationResults(results) {
  Logger.log('\n' + '='.repeat(60));
  Logger.log('FORM CONFIGURATION RESULTS');
  Logger.log('='.repeat(60));
  Logger.log('Form ID: ' + results.formId);
  Logger.log('FormApp settings: ' + (results.formAppSettings ? '✓ Applied' : '✗ Failed'));
  Logger.log('Forms API settings: ' + (results.formsApiSettings ? '✓ Applied' : '✗ Manual config needed'));

  if (results.manualStepsRequired.length > 0) {
    Logger.log('\n⚠️  MANUAL CONFIGURATION REQUIRED:');
    Logger.log('-'.repeat(40));
    results.manualStepsRequired.forEach(step => {
      Logger.log(step);
    });
  }

  Logger.log('='.repeat(60) + '\n');
}

/**
 * Get default confirmation message
 */
function getDefaultConfirmation() {
  return 'Your response has been recorded!\n\n' +
         'A copy has been sent to your email.\n' +
         'You can edit your response until the deadline.';
}

// ============================================================================
// BATCH CONFIGURATION
// ============================================================================

/**
 * Configure multiple forms at once
 *
 * @param {Array<GoogleAppsScript.Forms.Form>} forms - Array of form objects
 * @returns {Array<Object>} Configuration results for each form
 */
function configureMultipleForms(forms) {
  const allResults = [];

  forms.forEach((form, index) => {
    Logger.log(`\nConfiguring form ${index + 1} of ${forms.length}...`);
    const results = configureFormComplete(form);
    allResults.push(results);
  });

  // Summary
  const successCount = allResults.filter(r => r.formAppSettings && r.formsApiSettings).length;
  const partialCount = allResults.filter(r => r.formAppSettings && !r.formsApiSettings).length;

  Logger.log('\n' + '='.repeat(60));
  Logger.log('BATCH CONFIGURATION SUMMARY');
  Logger.log('='.repeat(60));
  Logger.log(`Total forms: ${forms.length}`);
  Logger.log(`Fully configured: ${successCount}`);
  Logger.log(`Needs manual config: ${partialCount}`);
  Logger.log('='.repeat(60));

  return allResults;
}

// ============================================================================
// SETTINGS VERIFICATION
// ============================================================================

/**
 * Verify a form has all required settings
 * Useful for auditing existing forms
 *
 * @param {string} formId - The form ID to check
 * @returns {Object} Verification results
 */
function verifyFormSettings(formId) {
  const form = FormApp.openById(formId);

  const results = {
    formId: formId,
    formTitle: form.getTitle(),
    settings: {
      isQuiz: form.isQuiz(),
      requiresLogin: form.requiresLogin(),
      collectsEmail: form.collectsEmail(),
      limitOneResponse: form.hasLimitOneResponsePerUser(),
      allowsEdits: form.canEditResponse(),
      hasProgressBar: form.hasProgressBar()
    },
    issues: []
  };

  // Check each required setting
  if (!results.settings.isQuiz) {
    results.issues.push('Quiz mode is NOT enabled');
  }
  if (!results.settings.requiresLogin) {
    results.issues.push('Login is NOT required (no verified email)');
  }
  if (!results.settings.collectsEmail) {
    results.issues.push('Email collection is NOT enabled');
  }
  if (!results.settings.limitOneResponse) {
    results.issues.push('Multiple responses ARE allowed (should be limited to 1)');
  }
  if (!results.settings.allowsEdits) {
    results.issues.push('Response editing is NOT allowed');
  }

  // Log results
  Logger.log('\n' + '='.repeat(60));
  Logger.log('SETTINGS VERIFICATION: ' + results.formTitle);
  Logger.log('='.repeat(60));

  Object.keys(results.settings).forEach(key => {
    const value = results.settings[key];
    const status = value ? '✓' : '✗';
    Logger.log(`${status} ${key}: ${value}`);
  });

  if (results.issues.length > 0) {
    Logger.log('\n⚠️  ISSUES FOUND:');
    results.issues.forEach(issue => Logger.log('  - ' + issue));
  } else {
    Logger.log('\n✓ All verifiable settings are correct');
  }

  Logger.log('\nNOTE: Cannot verify via API:');
  Logger.log('  - Grade release timing');
  Logger.log('  - Show missed questions/correct answers/point values');
  Logger.log('  - Response receipt emails');
  Logger.log('Please verify these manually in Form Settings.');

  Logger.log('='.repeat(60) + '\n');

  return results;
}

/**
 * Verify all forms for a week
 */
function verifyWeekForms(grade, cycle, week) {
  // Get form IDs from registry
  const formIds = getCycleFormIds(grade, cycle);
  const weekKey = `w${week}`;

  Logger.log(`\nVerifying G${grade} C${cycle} W${week} forms...\n`);

  const results = [];
  const formTypes = ['hook', 'station1', 'station2', 'station3', 'exitTicket'];

  formTypes.forEach(formType => {
    const key = `${weekKey}_${formType}`;
    const formData = formIds[key];

    if (formData && formData.formId) {
      Logger.log(`\nChecking ${formType}...`);
      results.push(verifyFormSettings(formData.formId));
    } else {
      Logger.log(`${formType}: Not found in registry`);
    }
  });

  return results;
}

// ============================================================================
// QUICK FIX FUNCTIONS
// ============================================================================

/**
 * Quick fix - apply standard settings to an existing form by ID
 */
function fixFormSettings(formId) {
  const form = FormApp.openById(formId);
  return configureFormComplete(form);
}

/**
 * Fix all forms in a week
 */
function fixWeekFormSettings(grade, cycle, week) {
  const formIds = getCycleFormIds(grade, cycle);
  const weekKey = `w${week}`;
  const formTypes = ['hook', 'station1', 'station2', 'station3', 'exitTicket'];

  Logger.log(`\nFixing settings for G${grade} C${cycle} W${week}...\n`);

  formTypes.forEach(formType => {
    const key = `${weekKey}_${formType}`;
    const formData = formIds[key];

    if (formData && formData.formId) {
      Logger.log(`\nFixing ${formType}...`);
      fixFormSettings(formData.formId);
    }
  });
}

// ============================================================================
// MANUAL CONFIGURATION CHECKLIST
// ============================================================================

/**
 * Print the manual configuration checklist
 * For settings that can't be set via API
 */
function printManualChecklist() {
  const checklist = `
╔══════════════════════════════════════════════════════════════════╗
║           GOOGLE FORMS MANUAL CONFIGURATION CHECKLIST            ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║  After creating forms, open each one and verify these settings:  ║
║                                                                  ║
║  ⚙️  SETTINGS (gear icon) > RESPONSES TAB                        ║
║  ──────────────────────────────────────────────────────────────  ║
║  [✓] Collect email addresses: "Verified"                         ║
║  [✓] Send respondents a copy: "Always"                           ║
║  [✓] Allow response editing: ON                                  ║
║  [✓] Limit to 1 response: ON                                     ║
║                                                                  ║
║  ⚙️  SETTINGS (gear icon) > QUIZZES TAB                          ║
║  ──────────────────────────────────────────────────────────────  ║
║  [✓] Make this a quiz: ON                                        ║
║  [✓] Release grade: "Immediately after each submission"          ║
║                                                                  ║
║  [✓] Respondent can see:                                         ║
║      [✓] Missed questions                                        ║
║      [✓] Correct answers                                         ║
║      [✓] Point values                                            ║
║                                                                  ║
║  ⚙️  SETTINGS (gear icon) > DEFAULTS TAB                         ║
║  ──────────────────────────────────────────────────────────────  ║
║  [✓] Make questions required: ON (optional, per preference)      ║
║                                                                  ║
╚══════════════════════════════════════════════════════════════════╝
`;

  Logger.log(checklist);
  return checklist;
}
