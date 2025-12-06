#!/usr/bin/env node
/**
 * validate-cycle.js
 * Validates that a cycle configuration is complete and ready for deployment
 *
 * Usage: node validate-cycle.js <cycle_number>
 * Example: node validate-cycle.js 3
 *
 * Checks:
 * 1. Config file exists and is valid JSON
 * 2. All required fields are filled (no [PLACEHOLDERS])
 * 3. Content directories exist
 * 4. All content files exist
 * 5. Point totals are correct (100 per week)
 * 6. NGSS codes are valid format
 */

const fs = require('fs');
const path = require('path');

const GRADES = [7, 8];
const WEEKS = [1, 2, 3];
const FORM_TYPES = ['hook', 'station1', 'station2', 'station3', 'exitTicket'];
const EXPECTED_POINTS = { hook: 12, station1: 20, station2: 20, station3: 25, exitTicket: 23 };

let errors = [];
let warnings = [];

function log(msg) {
  console.log(msg);
}

function error(msg) {
  errors.push(msg);
  console.log(`❌ ERROR: ${msg}`);
}

function warn(msg) {
  warnings.push(msg);
  console.log(`⚠️  WARNING: ${msg}`);
}

function ok(msg) {
  console.log(`✅ ${msg}`);
}

function validateConfig(cycleNum) {
  const padded = String(cycleNum).padStart(2, '0');
  const configPath = path.join(__dirname, '..', 'config', 'cycles', `cycle${padded}.json`);

  log(`\n=== Validating Cycle ${cycleNum} ===\n`);

  // Check config exists
  if (!fs.existsSync(configPath)) {
    error(`Config file not found: ${configPath}`);
    return false;
  }
  ok(`Config file exists: cycle${padded}.json`);

  // Parse JSON
  let config;
  try {
    config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    ok('Config is valid JSON');
  } catch (e) {
    error(`Invalid JSON: ${e.message}`);
    return false;
  }

  // Check for placeholders
  const configStr = JSON.stringify(config);
  const placeholderMatches = configStr.match(/\[([A-Z_\s]+)\]/g);
  if (placeholderMatches) {
    error(`Found ${placeholderMatches.length} unfilled placeholders: ${placeholderMatches.slice(0, 5).join(', ')}...`);
  } else {
    ok('No unfilled placeholders found');
  }

  // Check dates
  if (config.dates) {
    if (config.dates.start === 'YYYY-MM-DD') {
      error('Dates not filled in');
    } else {
      ok(`Dates configured: ${config.dates.start} to ${config.dates.end}`);
    }
  }

  // Validate each grade
  GRADES.forEach(grade => {
    log(`\n--- Grade ${grade} ---`);
    const gradeConfig = config.grades?.[String(grade)];

    if (!gradeConfig) {
      error(`Grade ${grade} configuration missing`);
      return;
    }

    // Check topic
    if (!gradeConfig.topic || gradeConfig.topic.startsWith('[')) {
      error(`Grade ${grade} topic not set`);
    } else {
      ok(`Topic: ${gradeConfig.topic}`);
    }

    // Check NGSS
    if (gradeConfig.ngss?.primary?.code) {
      const code = gradeConfig.ngss.primary.code;
      if (/^MS-[A-Z]{2,3}\d?-\d+$/.test(code)) {
        ok(`NGSS Primary: ${code}`);
      } else if (code.includes('[')) {
        error(`NGSS code not set for grade ${grade}`);
      } else {
        warn(`NGSS code format unusual: ${code}`);
      }
    }

    // Check misconceptions
    if (gradeConfig.misconceptions?.length > 0) {
      const filled = gradeConfig.misconceptions.filter(m => !m.id.startsWith('['));
      ok(`Misconceptions defined: ${filled.length}`);
    } else {
      warn(`No misconceptions defined for grade ${grade}`);
    }

    // Check weeks
    WEEKS.forEach(week => {
      const weekConfig = gradeConfig.weeks?.[String(week)];
      if (!weekConfig) {
        error(`Grade ${grade} Week ${week} configuration missing`);
        return;
      }

      // Assessment week is simpler
      if (weekConfig.isAssessmentWeek) {
        ok(`Week ${week}: Assessment week (simplified config OK)`);
        return;
      }

      // Check point totals
      let totalPoints = 0;
      FORM_TYPES.forEach(formType => {
        const station = weekConfig.stations?.[formType];
        if (station) {
          totalPoints += station.points || 0;
          if (station.points !== EXPECTED_POINTS[formType]) {
            warn(`G${grade}W${week} ${formType}: ${station.points} pts (expected ${EXPECTED_POINTS[formType]})`);
          }
        } else {
          error(`G${grade}W${week} missing ${formType} config`);
        }
      });

      if (totalPoints === 100) {
        ok(`Week ${week}: Point total correct (${totalPoints})`);
      } else {
        error(`Week ${week}: Point total is ${totalPoints}, expected 100`);
      }

      // Check content files exist
      validateContentFiles(grade, cycleNum, week, weekConfig);
    });
  });

  return errors.length === 0;
}

function validateContentFiles(grade, cycle, week, weekConfig) {
  const padded = String(cycle).padStart(2, '0');
  const basePath = path.join(__dirname, '..', 'content', `grade${grade}`, `cycle${padded}`, `week${week}`);

  // Check directory
  if (!fs.existsSync(basePath)) {
    warn(`Content directory missing: ${basePath}`);
    return;
  }

  // Check files
  const requiredFiles = ['forms.gs', 'student-page.html', 'lesson-plan.md'];
  requiredFiles.forEach(file => {
    const filePath = path.join(basePath, file);
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      if (stats.size < 100) {
        warn(`File exists but appears empty: ${file}`);
      } else {
        ok(`  ${file} (${(stats.size / 1024).toFixed(1)} KB)`);
      }
    } else {
      warn(`  Missing: ${file}`);
    }
  });
}

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Usage: node validate-cycle.js <cycle_number>');
    console.log('       node validate-cycle.js all');
    process.exit(1);
  }

  if (args[0] === 'all') {
    // Validate all configured cycles
    for (let c = 3; c <= 10; c++) {
      const configPath = path.join(__dirname, '..', 'config', 'cycles', `cycle${String(c).padStart(2, '0')}.json`);
      if (fs.existsSync(configPath)) {
        validateConfig(c);
      }
    }
  } else {
    const cycleNum = parseInt(args[0], 10);
    if (isNaN(cycleNum) || cycleNum < 3 || cycleNum > 10) {
      console.error('Error: Cycle number must be between 3 and 10');
      process.exit(1);
    }
    validateConfig(cycleNum);
  }

  // Summary
  log('\n=== VALIDATION SUMMARY ===');
  if (errors.length === 0 && warnings.length === 0) {
    log('✅ All checks passed! Ready for deployment.');
  } else {
    if (errors.length > 0) {
      log(`❌ ${errors.length} error(s) found - must fix before deployment`);
    }
    if (warnings.length > 0) {
      log(`⚠️  ${warnings.length} warning(s) - review recommended`);
    }
  }

  process.exit(errors.length > 0 ? 1 : 0);
}

main();
