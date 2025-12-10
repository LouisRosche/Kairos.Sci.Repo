#!/usr/bin/env node
/**
 * embed-forms-in-student-page.js
 * Automatically embeds Google Form URLs into student-page.html files
 *
 * USAGE:
 *   node scripts/embed-forms-in-student-page.js <grade> <cycle> <week> [options]
 *
 * EXAMPLES:
 *   # Interactive mode - prompts for URLs
 *   node scripts/embed-forms-in-student-page.js 7 4 2
 *
 *   # From JSON file (output from forms.gs)
 *   node scripts/embed-forms-in-student-page.js 7 4 2 --from-json forms-output.json
 *
 *   # Direct URLs via arguments
 *   node scripts/embed-forms-in-student-page.js 7 4 2 \
 *     --hook "https://docs.google.com/forms/d/e/xxx/viewform" \
 *     --station1 "https://docs.google.com/forms/d/e/yyy/viewform"
 *
 *   # Parse Logger output from clipboard/file
 *   node scripts/embed-forms-in-student-page.js 7 4 2 --parse-log logger-output.txt
 *
 * KAMS Science Curriculum System v2.0
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// ============================================================================
// CONFIGURATION
// ============================================================================

const CONTENT_BASE = path.join(__dirname, '..', 'content');

const FORM_TYPES = ['hook', 'station1', 'station2', 'station3', 'exitTicket'];

const FORM_TITLES = {
  hook: 'Hook Form',
  station1: 'Station 1 Form',
  station2: 'Station 2 Form',
  station3: 'Station 3 Form',
  exitTicket: 'Exit Ticket Form'
};

// Patterns to find in student-page.html for replacement
const PLACEHOLDER_PATTERNS = {
  hook: [
    /#FORM_URL_HOOK/g,
    /href="#FORM_URL_HOOK"/g,
    /src="[^"]*#FORM_URL_HOOK[^"]*"/g
  ],
  station1: [
    /#FORM_URL_S1/g,
    /href="#FORM_URL_S1"/g,
    /src="[^"]*#FORM_URL_S1[^"]*"/g
  ],
  station2: [
    /#FORM_URL_S2/g,
    /href="#FORM_URL_S2"/g,
    /src="[^"]*#FORM_URL_S2[^"]*"/g
  ],
  station3: [
    /#FORM_URL_S3/g,
    /href="#FORM_URL_S3"/g,
    /src="[^"]*#FORM_URL_S3[^"]*"/g
  ],
  exitTicket: [
    /#FORM_URL_EXIT/g,
    /href="#FORM_URL_EXIT"/g,
    /src="[^"]*#FORM_URL_EXIT[^"]*"/g
  ]
};

// ============================================================================
// MAIN FUNCTIONS
// ============================================================================

/**
 * Get the path to student-page.html for a given grade/cycle/week
 */
function getStudentPagePath(grade, cycle, week) {
  const cycleStr = String(cycle).padStart(2, '0');
  return path.join(
    CONTENT_BASE,
    `grade${grade}`,
    `cycle${cycleStr}`,
    `week${week}`,
    'student-page.html'
  );
}

/**
 * Convert published URL to embed URL
 */
function toEmbedUrl(publishedUrl) {
  if (!publishedUrl) return null;
  return publishedUrl.replace('/viewform', '/viewform?embedded=true');
}

/**
 * Generate iframe HTML for a form
 * Note: Dimensions are controlled by CSS (.form-embed iframe in design-system.css)
 * to enable responsive sizing. Only set inline dimensions if CSS is unavailable.
 */
function generateIframe(url, title) {
  const embedUrl = toEmbedUrl(url);
  return `<iframe title="${title}" src="${embedUrl}" loading="lazy"></iframe>`;
}

/**
 * Update student-page.html with form URLs
 */
function updateStudentPage(filePath, formUrls) {
  if (!fs.existsSync(filePath)) {
    console.error(`ERROR: File not found: ${filePath}`);
    return false;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let changes = 0;

  FORM_TYPES.forEach(formType => {
    const url = formUrls[formType];
    if (!url) return;

    const embedUrl = toEmbedUrl(url);
    const iframe = generateIframe(url, FORM_TITLES[formType]);

    // Find existing iframes with placeholder or old URLs and replace src
    const iframeSrcPattern = new RegExp(
      `(<iframe[^>]*title="${FORM_TITLES[formType]}"[^>]*src=")[^"]*("[^>]*>)`,
      'gi'
    );

    if (iframeSrcPattern.test(content)) {
      content = content.replace(iframeSrcPattern, `$1${embedUrl}$2`);
      changes++;
      console.log(`  ✓ Updated ${formType} iframe src`);
    }

    // Also replace any href placeholders (for "Start X" buttons)
    PLACEHOLDER_PATTERNS[formType].forEach(pattern => {
      if (pattern.test(content)) {
        if (pattern.source.includes('href=')) {
          content = content.replace(pattern, `href="${url}" target="_blank"`);
        } else if (pattern.source.includes('src=')) {
          content = content.replace(pattern, `src="${embedUrl}"`);
        } else {
          content = content.replace(pattern, embedUrl);
        }
        changes++;
        console.log(`  ✓ Replaced placeholder for ${formType}`);
      }
    });
  });

  if (changes > 0) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`\n✅ Updated ${filePath} with ${changes} changes`);
    return true;
  } else {
    console.log(`\nℹ️  No placeholders found to replace in ${filePath}`);
    return false;
  }
}

/**
 * Parse Logger output from forms.gs to extract URLs
 */
function parseLoggerOutput(logText) {
  const urls = {};

  // Pattern: "Embed: https://docs.google.com/forms/d/e/.../viewform?embedded=true"
  const patterns = {
    hook: /Hook[^]*?(?:Embed|Published):\s*(https:\/\/docs\.google\.com\/forms\/d\/e\/[^\s]+)/i,
    station1: /Station\s*1[^]*?(?:Embed|Published):\s*(https:\/\/docs\.google\.com\/forms\/d\/e\/[^\s]+)/i,
    station2: /Station\s*2[^]*?(?:Embed|Published):\s*(https:\/\/docs\.google\.com\/forms\/d\/e\/[^\s]+)/i,
    station3: /Station\s*3[^]*?(?:Embed|Published):\s*(https:\/\/docs\.google\.com\/forms\/d\/e\/[^\s]+)/i,
    exitTicket: /Exit\s*Ticket[^]*?(?:Embed|Published):\s*(https:\/\/docs\.google\.com\/forms\/d\/e\/[^\s]+)/i
  };

  Object.keys(patterns).forEach(formType => {
    const match = logText.match(patterns[formType]);
    if (match) {
      // Clean up the URL - remove embedded=true if present, we'll add it ourselves
      urls[formType] = match[1].replace('?embedded=true', '').replace('&embedded=true', '');
    }
  });

  return urls;
}

/**
 * Parse JSON output from forms.gs
 */
function parseJsonOutput(jsonData) {
  const urls = {};

  if (typeof jsonData === 'string') {
    jsonData = JSON.parse(jsonData);
  }

  // Handle different JSON structures
  if (jsonData.forms) {
    // Direct week output: { forms: { hook: { publishedUrl: ... } } }
    Object.keys(jsonData.forms).forEach(formType => {
      if (jsonData.forms[formType].publishedUrl) {
        urls[formType] = jsonData.forms[formType].publishedUrl;
      }
    });
  } else if (jsonData.hook || jsonData.station1) {
    // Simple mapping: { hook: "url", station1: "url" }
    FORM_TYPES.forEach(formType => {
      if (jsonData[formType]) {
        urls[formType] = jsonData[formType];
      }
    });
  }

  return urls;
}

/**
 * Interactive prompt for URLs
 */
async function promptForUrls() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const question = (prompt) => new Promise(resolve => rl.question(prompt, resolve));

  console.log('\nEnter form URLs (press Enter to skip):\n');

  const urls = {};

  for (const formType of FORM_TYPES) {
    const url = await question(`  ${FORM_TITLES[formType]} URL: `);
    if (url.trim()) {
      urls[formType] = url.trim();
    }
  }

  rl.close();
  return urls;
}

/**
 * Main CLI handler
 */
async function main() {
  const args = process.argv.slice(2);

  if (args.length < 3 || args.includes('--help') || args.includes('-h')) {
    console.log(`
Usage: node embed-forms-in-student-page.js <grade> <cycle> <week> [options]

Arguments:
  grade     Grade number (7 or 8)
  cycle     Cycle number (3-10)
  week      Week number (1-3)

Options:
  --from-json <file>    Read URLs from JSON file
  --parse-log <file>    Parse URLs from Logger output file
  --hook <url>          Set hook form URL directly
  --station1 <url>      Set station 1 form URL directly
  --station2 <url>      Set station 2 form URL directly
  --station3 <url>      Set station 3 form URL directly
  --exitTicket <url>    Set exit ticket form URL directly
  --dry-run             Show what would be changed without modifying files

Examples:
  node scripts/embed-forms-in-student-page.js 7 4 2
  node scripts/embed-forms-in-student-page.js 7 4 2 --parse-log output.txt
  node scripts/embed-forms-in-student-page.js 8 3 2 --hook "https://..." --station1 "https://..."
`);
    process.exit(0);
  }

  const grade = parseInt(args[0], 10);
  const cycle = parseInt(args[1], 10);
  const week = parseInt(args[2], 10);

  // Validate inputs
  if (![7, 8].includes(grade)) {
    console.error('ERROR: Grade must be 7 or 8');
    process.exit(1);
  }
  if (cycle < 1 || cycle > 10) {
    console.error('ERROR: Cycle must be 1-10');
    process.exit(1);
  }
  if (![1, 2, 3].includes(week)) {
    console.error('ERROR: Week must be 1, 2, or 3');
    process.exit(1);
  }

  console.log(`\n📝 Embedding forms for Grade ${grade}, Cycle ${cycle}, Week ${week}\n`);

  let formUrls = {};

  // Parse options
  const fromJsonIdx = args.indexOf('--from-json');
  const parseLogIdx = args.indexOf('--parse-log');
  const dryRun = args.includes('--dry-run');

  if (fromJsonIdx !== -1 && args[fromJsonIdx + 1]) {
    // Read from JSON file
    const jsonPath = args[fromJsonIdx + 1];
    console.log(`Reading URLs from JSON: ${jsonPath}`);
    const jsonContent = fs.readFileSync(jsonPath, 'utf8');
    formUrls = parseJsonOutput(jsonContent);

  } else if (parseLogIdx !== -1 && args[parseLogIdx + 1]) {
    // Parse Logger output
    const logPath = args[parseLogIdx + 1];
    console.log(`Parsing Logger output: ${logPath}`);
    const logContent = fs.readFileSync(logPath, 'utf8');
    formUrls = parseLoggerOutput(logContent);

  } else {
    // Check for direct URL arguments
    FORM_TYPES.forEach(formType => {
      const idx = args.indexOf(`--${formType}`);
      if (idx !== -1 && args[idx + 1]) {
        formUrls[formType] = args[idx + 1];
      }
    });

    // If no URLs provided, prompt interactively
    if (Object.keys(formUrls).length === 0) {
      formUrls = await promptForUrls();
    }
  }

  // Show what we found
  console.log('\nURLs to embed:');
  FORM_TYPES.forEach(formType => {
    const url = formUrls[formType];
    console.log(`  ${formType}: ${url ? '✓ ' + url.substring(0, 60) + '...' : '✗ (not provided)'}`);
  });

  if (Object.keys(formUrls).length === 0) {
    console.log('\n⚠️  No URLs provided. Nothing to do.');
    process.exit(0);
  }

  // Get student page path
  const studentPagePath = getStudentPagePath(grade, cycle, week);
  console.log(`\nTarget file: ${studentPagePath}`);

  if (dryRun) {
    console.log('\n🔍 DRY RUN - No changes will be made');
    console.log('\nWould generate these iframes:');
    FORM_TYPES.forEach(formType => {
      if (formUrls[formType]) {
        console.log(`\n--- ${formType} ---`);
        console.log(generateIframe(formUrls[formType], FORM_TITLES[formType]));
      }
    });
  } else {
    // Actually update the file
    updateStudentPage(studentPagePath, formUrls);
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(err => {
    console.error('ERROR:', err.message);
    process.exit(1);
  });
}

// Export for use as module
module.exports = {
  updateStudentPage,
  parseLoggerOutput,
  parseJsonOutput,
  generateIframe,
  getStudentPagePath
};
