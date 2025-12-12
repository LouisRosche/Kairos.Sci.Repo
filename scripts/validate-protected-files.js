#!/usr/bin/env node
/**
 * validate-protected-files.js
 * Validates that protected production files have not been modified
 *
 * Usage:
 *   node scripts/validate-protected-files.js [--staged]
 *
 * Options:
 *   --staged    Only check staged files (for pre-commit hook)
 *
 * Exit codes:
 *   0 - No protected files modified
 *   1 - Protected files were modified (blocks commit)
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Load protected files configuration
const CONFIG_PATH = path.join(__dirname, '..', 'config', 'protected-files.json');

function loadConfig() {
  try {
    const content = fs.readFileSync(CONFIG_PATH, 'utf8');
    return JSON.parse(content);
  } catch (e) {
    console.error('ERROR: Could not load protected-files.json');
    console.error(e.message);
    process.exit(1);
  }
}

/**
 * Convert glob pattern to regex
 */
function globToRegex(pattern) {
  return new RegExp(
    '^' +
    pattern
      .replace(/\./g, '\\.')
      .replace(/\*\*/g, '<<<GLOBSTAR>>>')
      .replace(/\*/g, '[^/]*')
      .replace(/<<<GLOBSTAR>>>/g, '.*') +
    '$'
  );
}

/**
 * Check if a file path matches any protected pattern
 */
function isProtected(filePath, config) {
  // Check exact file matches
  if (config.protectedFiles && config.protectedFiles.includes(filePath)) {
    return {
      protected: true,
      reason: 'Listed in protectedFiles',
      pattern: filePath
    };
  }

  // Check pattern matches
  if (config.protectedPaths) {
    for (const entry of config.protectedPaths) {
      const regex = globToRegex(entry.pattern);
      if (regex.test(filePath)) {
        return {
          protected: true,
          reason: entry.reason,
          pattern: entry.pattern,
          since: entry.protectedSince
        };
      }
    }
  }

  return { protected: false };
}

/**
 * Get list of modified files
 */
function getModifiedFiles(stagedOnly) {
  try {
    const cmd = stagedOnly
      ? 'git diff --cached --name-only --diff-filter=ACMR'
      : 'git diff --name-only HEAD';

    const output = execSync(cmd, { encoding: 'utf8' });
    return output.trim().split('\n').filter(f => f.length > 0);
  } catch (e) {
    // Not in a git repo or no changes
    return [];
  }
}

/**
 * Check commit message for emergency override
 */
function hasEmergencyOverride(config) {
  if (!config.exceptions || !config.exceptions.emergencyOverride) {
    return false;
  }

  if (!config.exceptions.emergencyOverride.enabled) {
    return false;
  }

  try {
    // Get the commit message being prepared
    const commitMsgFile = path.join(__dirname, '..', '.git', 'COMMIT_EDITMSG');
    if (fs.existsSync(commitMsgFile)) {
      const msg = fs.readFileSync(commitMsgFile, 'utf8');
      const pattern = config.exceptions.emergencyOverride.commentPattern || 'EMERGENCY:';
      return msg.includes(pattern);
    }
  } catch (e) {
    // Ignore - probably not in commit context
  }

  return false;
}

/**
 * Main validation function
 */
function validate(stagedOnly = false) {
  const config = loadConfig();
  const modifiedFiles = getModifiedFiles(stagedOnly);

  if (modifiedFiles.length === 0) {
    console.log('✓ No modified files to check');
    return 0;
  }

  // Check for emergency override
  if (hasEmergencyOverride(config)) {
    console.log('⚠️  EMERGENCY OVERRIDE detected - allowing protected file modifications');
    return 0;
  }

  const violations = [];

  for (const file of modifiedFiles) {
    const result = isProtected(file, config);
    if (result.protected) {
      violations.push({
        file,
        ...result
      });
    }
  }

  if (violations.length === 0) {
    console.log(`✓ Checked ${modifiedFiles.length} files - no protected files modified`);
    return 0;
  }

  // Report violations
  console.error('\n❌ PROTECTED FILE VIOLATION');
  console.error('═'.repeat(60));
  console.error('The following production files cannot be modified:\n');

  for (const v of violations) {
    console.error(`  📁 ${v.file}`);
    console.error(`     Pattern: ${v.pattern}`);
    console.error(`     Reason:  ${v.reason}`);
    if (v.since) {
      console.error(`     Protected since: ${v.since}`);
    }
    console.error('');
  }

  console.error('═'.repeat(60));
  console.error('OPTIONS:');
  console.error('  1. Revert changes: git checkout -- <file>');
  console.error('  2. Emergency fix:  Add "EMERGENCY:" to commit message');
  console.error('  3. Update config:  Remove from config/protected-files.json');
  console.error('');

  return 1;
}

// Run validation
const args = process.argv.slice(2);
const stagedOnly = args.includes('--staged');
const exitCode = validate(stagedOnly);
process.exit(exitCode);
