/**
 * update-student-page-forms.gs
 * Utility to generate form embed URLs and update student page placeholders
 *
 * KAMS Science Curriculum System v2.0
 *
 * WORKFLOW:
 * 1. Run createAllGXCXWXForms() from the week's forms.gs
 * 2. Copy the published URLs from Logger output
 * 3. Run updateFormUrls() with those URLs to get the HTML replacements
 * 4. Or use generateEmbedCode() to get individual iframe snippets
 *
 * This script helps bridge the gap between form creation (in Apps Script)
 * and student page updates (in the HTML files).
 */

// ============================================================================
// CONFIGURATION - Set these after running form creation scripts
// ============================================================================

/**
 * Store form URLs after creation
 * Update these values after running the forms.gs scripts
 */
const FORM_URLS = {
  // Grade 7 Cycle 4 Week 2 (Example - update after deployment)
  'g7_c4_w2': {
    hook: '',
    station1: '',
    station2: '',
    station3: '',
    exitTicket: ''
  },
  // Add more as needed...
};

// ============================================================================
// EMBED CODE GENERATORS
// ============================================================================

/**
 * Generate iframe embed code for a Google Form
 * @param {string} publishedUrl - The form's published URL
 * @param {string} title - Accessible title for the iframe
 * @param {number} height - Optional height (default 900)
 * @returns {string} HTML iframe code
 */
function generateEmbedCode(publishedUrl, title, height) {
  if (!publishedUrl) {
    return '<!-- Form URL not configured -->';
  }

  height = height || 900;
  const embedUrl = publishedUrl.replace('/viewform', '/viewform?embedded=true');

  return `<iframe title="${title}" src="${embedUrl}" width="640" height="${height}" loading="lazy"></iframe>`;
}

/**
 * Generate all embed codes for a week
 * @param {number} grade - 7 or 8
 * @param {number} cycle - Cycle number
 * @param {number} week - Week number
 * @returns {Object} Embed codes for all form types
 */
function generateWeekEmbedCodes(grade, cycle, week) {
  const key = `g${grade}_c${cycle}_w${week}`;
  const urls = FORM_URLS[key];

  if (!urls) {
    Logger.log(`No URLs configured for ${key}`);
    return null;
  }

  const codes = {};

  codes.hook = generateEmbedCode(
    urls.hook,
    'Hook Form',
    900
  );

  codes.station1 = generateEmbedCode(
    urls.station1,
    'Station 1 Form',
    900
  );

  codes.station2 = generateEmbedCode(
    urls.station2,
    'Station 2 Form',
    900
  );

  codes.station3 = generateEmbedCode(
    urls.station3,
    'Station 3 Form',
    900
  );

  codes.exitTicket = generateEmbedCode(
    urls.exitTicket,
    'Exit Ticket Form',
    900
  );

  return codes;
}

// ============================================================================
// URL PLACEHOLDER REPLACEMENTS
// ============================================================================

/**
 * Generate find/replace pairs for student-page.html
 * These can be used in any text editor to update placeholders
 *
 * @param {number} grade
 * @param {number} cycle
 * @param {number} week
 * @returns {Array} Array of {find, replace} objects
 */
function generateReplacements(grade, cycle, week) {
  const key = `g${grade}_c${cycle}_w${week}`;
  const urls = FORM_URLS[key];

  if (!urls) {
    Logger.log(`No URLs configured for ${key}`);
    return [];
  }

  const replacements = [];

  // Standard placeholder patterns
  const placeholders = {
    hook: ['#FORM_URL_HOOK', 'href="#FORM_URL_HOOK"'],
    station1: ['#FORM_URL_S1', 'href="#FORM_URL_S1"'],
    station2: ['#FORM_URL_S2', 'href="#FORM_URL_S2"'],
    station3: ['#FORM_URL_S3', 'href="#FORM_URL_S3"'],
    exitTicket: ['#FORM_URL_EXIT', 'href="#FORM_URL_EXIT"']
  };

  Object.keys(placeholders).forEach(formType => {
    if (urls[formType]) {
      const embedUrl = urls[formType].replace('/viewform', '/viewform?embedded=true');

      placeholders[formType].forEach(placeholder => {
        replacements.push({
          find: placeholder,
          replace: placeholder.startsWith('href')
            ? `href="${urls[formType]}" target="_blank"`
            : embedUrl
        });
      });
    }
  });

  return replacements;
}

/**
 * Print replacements for manual copy/paste
 */
function printReplacements(grade, cycle, week) {
  const replacements = generateReplacements(grade, cycle, week);

  Logger.log(`\n=== REPLACEMENTS FOR G${grade} C${cycle} W${week} ===\n`);

  replacements.forEach(r => {
    Logger.log(`FIND: ${r.find}`);
    Logger.log(`REPLACE: ${r.replace}`);
    Logger.log('---');
  });
}

// ============================================================================
// FORM URL PARSER
// ============================================================================

/**
 * Parse Logger output from form creation script
 * Extracts form URLs from the standard log format
 *
 * @param {string} logOutput - Raw Logger output text
 * @returns {Object} Parsed URLs by form type
 */
function parseFormLogOutput(logOutput) {
  const urls = {
    hook: null,
    station1: null,
    station2: null,
    station3: null,
    exitTicket: null
  };

  // Patterns to match different log formats
  const patterns = {
    hook: /Hook.*?Embed:\s*(https:\/\/docs\.google\.com\/forms\/d\/e\/[^\s]+)/i,
    station1: /Station\s*1.*?Embed:\s*(https:\/\/docs\.google\.com\/forms\/d\/e\/[^\s]+)/i,
    station2: /Station\s*2.*?Embed:\s*(https:\/\/docs\.google\.com\/forms\/d\/e\/[^\s]+)/i,
    station3: /Station\s*3.*?Embed:\s*(https:\/\/docs\.google\.com\/forms\/d\/e\/[^\s]+)/i,
    exitTicket: /Exit\s*Ticket.*?Embed:\s*(https:\/\/docs\.google\.com\/forms\/d\/e\/[^\s]+)/i
  };

  Object.keys(patterns).forEach(formType => {
    const match = logOutput.match(patterns[formType]);
    if (match) {
      urls[formType] = match[1];
    }
  });

  return urls;
}

/**
 * Quick utility - paste log output and get embed codes
 * Run this in Apps Script, paste log in prompt
 */
function parseAndGenerateEmbeds() {
  const ui = SpreadsheetApp.getUi();
  const response = ui.prompt(
    'Paste Form Creation Log',
    'Paste the Logger output from running createAllGXCXWXForms():',
    ui.ButtonSet.OK_CANCEL
  );

  if (response.getSelectedButton() === ui.Button.OK) {
    const logText = response.getResponseText();
    const urls = parseFormLogOutput(logText);

    Logger.log('\n=== PARSED URLS ===\n');
    Object.keys(urls).forEach(type => {
      if (urls[type]) {
        Logger.log(`${type}: ${urls[type]}`);
        Logger.log(`EMBED: ${generateEmbedCode(urls[type], type + ' Form', 900)}\n`);
      }
    });
  }
}

// ============================================================================
// REGISTRY INTEGRATION
// ============================================================================

/**
 * Get form URLs from FormRegistry sheet
 * @param {number} grade
 * @param {number} cycle
 * @param {number} week
 * @returns {Object} URLs by form type
 */
function getUrlsFromRegistry(grade, cycle, week) {
  const registryName = 'KAMS Science Form Registry';
  const files = DriveApp.getFilesByName(registryName);

  if (!files.hasNext()) {
    Logger.log('Registry not found. Run FormRegistry.createFormRegistry() first.');
    return null;
  }

  const ss = SpreadsheetApp.openById(files.next().getId());
  const sheet = ss.getSheetByName('Forms');
  const data = sheet.getDataRange().getValues();

  const urls = {};

  for (let i = 1; i < data.length; i++) {
    if (data[i][1] == grade && data[i][2] == cycle && data[i][3] == week) {
      const formType = data[i][4];
      const publishedUrl = data[i][8]; // Column I

      if (publishedUrl) {
        urls[formType] = publishedUrl;
      }
    }
  }

  return urls;
}

/**
 * Generate embed codes from registry
 */
function generateEmbedsFromRegistry(grade, cycle, week) {
  const urls = getUrlsFromRegistry(grade, cycle, week);

  if (!urls || Object.keys(urls).length === 0) {
    Logger.log(`No forms found in registry for G${grade} C${cycle} W${week}`);
    return;
  }

  Logger.log(`\n=== EMBED CODES FOR G${grade} C${cycle} W${week} ===\n`);

  Object.keys(urls).forEach(formType => {
    const embedCode = generateEmbedCode(urls[formType], `${formType} Form`, 900);
    Logger.log(`--- ${formType.toUpperCase()} ---`);
    Logger.log(embedCode);
    Logger.log('');
  });
}

// ============================================================================
// QUICK ACCESS FUNCTIONS
// ============================================================================

function generateG7C4W2Embeds() {
  generateEmbedsFromRegistry(7, 4, 2);
}

function generateG8C3W2Embeds() {
  generateEmbedsFromRegistry(8, 3, 2);
}

/**
 * Print all deployed form embed codes for a cycle
 */
function printCycleEmbeds(grade, cycle) {
  for (let week = 1; week <= 3; week++) {
    generateEmbedsFromRegistry(grade, cycle, week);
  }
}
