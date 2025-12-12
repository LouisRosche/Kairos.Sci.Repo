#!/usr/bin/env node
/**
 * validate-cycle-status.js
 * Validates all cycle-status.json files against the schema
 *
 * Usage:
 *   node scripts/validate-cycle-status.js
 *
 * Exit codes:
 *   0 - All files valid
 *   1 - Validation errors found
 */

const fs = require('fs');
const path = require('path');

// Simple JSON Schema validator (subset of draft-07)
function validateSchema(data, schema, dataPath = '') {
  const errors = [];

  // Type validation
  if (schema.type) {
    const actualType = Array.isArray(data) ? 'array' : typeof data;
    const expectedTypes = Array.isArray(schema.type) ? schema.type : [schema.type];

    if (!expectedTypes.includes(actualType) && !(actualType === 'number' && expectedTypes.includes('integer'))) {
      errors.push(`${dataPath || 'root'}: expected ${schema.type}, got ${actualType}`);
      return errors; // Stop checking if type is wrong
    }
  }

  // Required properties
  if (schema.required && typeof data === 'object' && !Array.isArray(data)) {
    for (const prop of schema.required) {
      if (!(prop in data)) {
        errors.push(`${dataPath || 'root'}: missing required property '${prop}'`);
      }
    }
  }

  // Enum validation
  if (schema.enum && !schema.enum.includes(data)) {
    errors.push(`${dataPath || 'root'}: value '${data}' not in enum [${schema.enum.join(', ')}]`);
  }

  // Min/max for numbers
  if (typeof data === 'number') {
    if (schema.minimum !== undefined && data < schema.minimum) {
      errors.push(`${dataPath || 'root'}: ${data} < minimum ${schema.minimum}`);
    }
    if (schema.maximum !== undefined && data > schema.maximum) {
      errors.push(`${dataPath || 'root'}: ${data} > maximum ${schema.maximum}`);
    }
  }

  // Object properties
  if (schema.properties && typeof data === 'object' && !Array.isArray(data)) {
    for (const [prop, propSchema] of Object.entries(schema.properties)) {
      if (prop in data) {
        const propPath = dataPath ? `${dataPath}.${prop}` : prop;
        errors.push(...validateSchema(data[prop], propSchema, propPath));
      }
    }
  }

  return errors;
}

/**
 * Find all cycle-status.json files
 */
function findCycleStatusFiles(baseDir) {
  const files = [];
  const contentDir = path.join(baseDir, 'content');

  if (!fs.existsSync(contentDir)) {
    return files;
  }

  // Walk content directory
  function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.name === 'cycle-status.json') {
        files.push(fullPath);
      }
    }
  }

  walk(contentDir);
  return files;
}

/**
 * Load and parse JSON file
 */
function loadJson(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return { data: JSON.parse(content), error: null };
  } catch (e) {
    return { data: null, error: e.message };
  }
}

/**
 * Main validation function
 */
function validate() {
  const baseDir = path.join(__dirname, '..');

  // Load schema
  const schemaPath = path.join(baseDir, 'config', 'schema', 'cycle-status-schema.json');
  const schemaResult = loadJson(schemaPath);

  if (schemaResult.error) {
    console.error(`ERROR: Could not load schema: ${schemaResult.error}`);
    return 1;
  }

  const schema = schemaResult.data;

  // Find all cycle-status.json files
  const files = findCycleStatusFiles(baseDir);

  if (files.length === 0) {
    console.log('No cycle-status.json files found');
    return 0;
  }

  console.log(`Validating ${files.length} cycle-status.json files...\n`);

  let hasErrors = false;
  const results = [];

  for (const file of files) {
    const relativePath = path.relative(baseDir, file);
    const result = loadJson(file);

    if (result.error) {
      results.push({
        file: relativePath,
        valid: false,
        errors: [`Parse error: ${result.error}`]
      });
      hasErrors = true;
      continue;
    }

    const errors = validateSchema(result.data, schema);

    // Additional custom validations
    const data = result.data;

    // Check completion percentages are valid
    if (data.completion && data.completion.overall !== undefined) {
      const overall = data.completion.overall;
      if (overall < 0 || overall > 100) {
        errors.push(`completion.overall: ${overall} is not a valid percentage (0-100)`);
      }
    }

    // Check deployed/readonly consistency
    if (data.status === 'deployed' && data.deployed) {
      const hasDeployedWeek = Object.entries(data.deployed)
        .some(([key, value]) => !key.includes('_date') && value === true);

      if (!hasDeployedWeek) {
        errors.push('status is "deployed" but no weeks have deployed: true');
      }
    }

    // Check readonly requires deployed
    if (data.readonly) {
      for (const [week, isReadonly] of Object.entries(data.readonly)) {
        if (week.includes('_reason')) continue;
        if (isReadonly && data.deployed && !data.deployed[week]) {
          errors.push(`${week} is readonly but not deployed`);
        }
      }
    }

    results.push({
      file: relativePath,
      valid: errors.length === 0,
      errors,
      data: {
        cycle: data.cycle,
        grade: data.grade,
        status: data.status
      }
    });

    if (errors.length > 0) {
      hasErrors = true;
    }
  }

  // Print results
  for (const result of results) {
    const icon = result.valid ? '✓' : '✗';
    const label = result.data
      ? `G${result.data.grade} C${result.data.cycle} (${result.data.status})`
      : 'Unknown';

    console.log(`${icon} ${result.file}`);
    console.log(`  ${label}`);

    if (!result.valid) {
      for (const err of result.errors) {
        console.log(`  ❌ ${err}`);
      }
    }
    console.log('');
  }

  // Summary
  const validCount = results.filter(r => r.valid).length;
  console.log('─'.repeat(60));
  console.log(`Summary: ${validCount}/${results.length} files valid`);

  return hasErrors ? 1 : 0;
}

// Run validation
const exitCode = validate();
process.exit(exitCode);
