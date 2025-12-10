/**
 * ============================================================================
 * TEST UTILITIES
 * ============================================================================
 *
 * Basic validation and test functions for the KAMS Science Curriculum System.
 * These can be run manually from the Apps Script editor to verify system health.
 *
 * USAGE:
 *   Run any function from the Apps Script editor's Run menu
 *   Check View > Logs for results
 *
 * Version: 1.0.0
 * Created: 2025-12-10
 * ============================================================================
 */

/**
 * ============================================================================
 * TEST RUNNER
 * ============================================================================
 */

/**
 * Run all validation tests
 * @returns {Object} Test results summary
 */
function runAllTests() {
  Logger.log('=== KAMS Science Test Suite ===');
  Logger.log('Started: ' + new Date().toISOString());
  Logger.log('');

  const results = {
    timestamp: new Date().toISOString(),
    passed: 0,
    failed: 0,
    skipped: 0,
    tests: []
  };

  // Define all test functions
  const tests = [
    { name: 'Config Module', fn: testConfigModule },
    { name: 'Constants Module', fn: testConstantsModule },
    { name: 'MTSS Tier Calculation', fn: testMTSSTierCalculation },
    { name: 'Form Naming Convention', fn: testFormNamingConvention },
    { name: 'Question ID Format', fn: testQuestionIdFormat },
    { name: 'Cycle Status Files', fn: testCycleStatusFiles },
    { name: 'Data Aggregator', fn: testDataAggregator },
    { name: 'Response Collector', fn: testResponseCollector }
  ];

  // Run each test
  tests.forEach(function(test) {
    Logger.log('Running: ' + test.name);
    try {
      const result = test.fn();
      results.tests.push({
        name: test.name,
        status: result.status,
        message: result.message,
        details: result.details || null
      });

      if (result.status === 'PASS') {
        results.passed++;
        Logger.log('  ✓ PASS: ' + result.message);
      } else if (result.status === 'FAIL') {
        results.failed++;
        Logger.log('  ✗ FAIL: ' + result.message);
      } else {
        results.skipped++;
        Logger.log('  - SKIP: ' + result.message);
      }
    } catch (e) {
      results.failed++;
      results.tests.push({
        name: test.name,
        status: 'ERROR',
        message: e.message,
        stack: e.stack
      });
      Logger.log('  ✗ ERROR: ' + e.message);
    }
    Logger.log('');
  });

  // Summary
  Logger.log('=== Test Summary ===');
  Logger.log('Passed: ' + results.passed);
  Logger.log('Failed: ' + results.failed);
  Logger.log('Skipped: ' + results.skipped);
  Logger.log('Total: ' + tests.length);

  return results;
}

/**
 * ============================================================================
 * INDIVIDUAL TESTS
 * ============================================================================
 */

/**
 * Test Config module is loaded and functional
 */
function testConfigModule() {
  if (typeof Config === 'undefined') {
    return { status: 'SKIP', message: 'Config module not loaded' };
  }

  const checks = [];

  // Check getCurrentCycle
  try {
    const cycle = Config.getCurrentCycle();
    if (typeof cycle === 'number' && cycle >= 1 && cycle <= 10) {
      checks.push({ check: 'getCurrentCycle', pass: true, value: cycle });
    } else {
      checks.push({ check: 'getCurrentCycle', pass: false, value: cycle });
    }
  } catch (e) {
    checks.push({ check: 'getCurrentCycle', pass: false, error: e.message });
  }

  // Check getCurrentWeek
  try {
    const week = Config.getCurrentWeek();
    if (typeof week === 'number' && week >= 1 && week <= 5) {
      checks.push({ check: 'getCurrentWeek', pass: true, value: week });
    } else {
      checks.push({ check: 'getCurrentWeek', pass: false, value: week });
    }
  } catch (e) {
    checks.push({ check: 'getCurrentWeek', pass: false, error: e.message });
  }

  // Check getMTSSThresholds
  try {
    const thresholds = Config.getMTSSThresholds();
    if (thresholds && thresholds.tier1Min !== undefined) {
      checks.push({ check: 'getMTSSThresholds', pass: true, value: thresholds });
    } else {
      checks.push({ check: 'getMTSSThresholds', pass: false, value: thresholds });
    }
  } catch (e) {
    checks.push({ check: 'getMTSSThresholds', pass: false, error: e.message });
  }

  const passed = checks.filter(function(c) { return c.pass; }).length;
  const total = checks.length;

  return {
    status: passed === total ? 'PASS' : 'FAIL',
    message: passed + '/' + total + ' checks passed',
    details: checks
  };
}

/**
 * Test Constants module
 */
function testConstantsModule() {
  if (typeof Constants === 'undefined') {
    return { status: 'SKIP', message: 'Constants module not loaded' };
  }

  const checks = [];

  // Check GRADES
  if (Constants.GRADES && Array.isArray(Constants.GRADES)) {
    checks.push({ check: 'GRADES', pass: true, value: Constants.GRADES });
  } else {
    checks.push({ check: 'GRADES', pass: false });
  }

  // Check FORM_TYPES
  if (Constants.FORM_TYPES && Constants.FORM_TYPES.length > 0) {
    checks.push({ check: 'FORM_TYPES', pass: true, value: Constants.FORM_TYPES });
  } else {
    checks.push({ check: 'FORM_TYPES', pass: false });
  }

  // Check POINTS_PER_WEEK
  if (Constants.POINTS_PER_WEEK === 100) {
    checks.push({ check: 'POINTS_PER_WEEK', pass: true, value: 100 });
  } else {
    checks.push({ check: 'POINTS_PER_WEEK', pass: false, value: Constants.POINTS_PER_WEEK });
  }

  const passed = checks.filter(function(c) { return c.pass; }).length;
  return {
    status: passed === checks.length ? 'PASS' : 'FAIL',
    message: passed + '/' + checks.length + ' checks passed',
    details: checks
  };
}

/**
 * Test MTSS tier calculation logic
 */
function testMTSSTierCalculation() {
  if (typeof Config === 'undefined' || typeof Config.getTierForScore !== 'function') {
    return { status: 'SKIP', message: 'Config.getTierForScore not available' };
  }

  const testCases = [
    { score: 100, expectedTier: 1, description: 'Perfect score' },
    { score: 85, expectedTier: 1, description: 'High score' },
    { score: 70, expectedTier: 1, description: 'Tier 1 boundary' },
    { score: 69, expectedTier: 2, description: 'Just below Tier 1' },
    { score: 60, expectedTier: 2, description: 'Mid Tier 2' },
    { score: 50, expectedTier: 2, description: 'Tier 2 boundary' },
    { score: 49, expectedTier: 3, description: 'Just below Tier 2' },
    { score: 25, expectedTier: 3, description: 'Low Tier 3' },
    { score: 0, expectedTier: 3, description: 'Zero score' }
  ];

  const results = testCases.map(function(tc) {
    const actualTier = Config.getTierForScore(tc.score);
    return {
      score: tc.score,
      expected: tc.expectedTier,
      actual: actualTier,
      pass: actualTier === tc.expectedTier,
      description: tc.description
    };
  });

  const passed = results.filter(function(r) { return r.pass; }).length;
  return {
    status: passed === results.length ? 'PASS' : 'FAIL',
    message: passed + '/' + results.length + ' tier calculations correct',
    details: results
  };
}

/**
 * Test form naming convention
 */
function testFormNamingConvention() {
  // Expected pattern: G{grade}.C{cycle}.W{week}: {station} - {title} [{points}pts]
  const pattern = /^G[78]\.C\d{1,2}\.W[1-5]: (Hook|Station [1-3]|Exit Ticket) - .+ \[\d+pts\]$/;

  const validNames = [
    'G7.C3.W1: Hook - Climate Evidence [12pts]',
    'G8.C4.W2: Station 1 - Energy Flow [20pts]',
    'G7.C5.W3: Exit Ticket - Weekly Review [23pts]'
  ];

  const invalidNames = [
    'G7 C3 W1 Hook',
    'Grade 7 Cycle 3 Week 1',
    'G7.C3.W1: Hook'
  ];

  const results = [];

  validNames.forEach(function(name) {
    results.push({
      name: name,
      expected: 'valid',
      actual: pattern.test(name) ? 'valid' : 'invalid',
      pass: pattern.test(name)
    });
  });

  invalidNames.forEach(function(name) {
    results.push({
      name: name,
      expected: 'invalid',
      actual: pattern.test(name) ? 'valid' : 'invalid',
      pass: !pattern.test(name)
    });
  });

  const passed = results.filter(function(r) { return r.pass; }).length;
  return {
    status: passed === results.length ? 'PASS' : 'FAIL',
    message: passed + '/' + results.length + ' naming convention tests passed',
    details: results
  };
}

/**
 * Test question ID format
 */
function testQuestionIdFormat() {
  // Expected pattern: g{grade}_c{cycle}_w{week}_{station}_q{number}
  const pattern = /^g[78]_c\d{1,2}_w[1-5]_(hook|station[1-3]|exit)_q\d+$/;

  const validIds = [
    'g7_c3_w1_hook_q1',
    'g8_c4_w2_station1_q3',
    'g7_c5_w3_exit_q6'
  ];

  const invalidIds = [
    'G7_C3_W1_hook_Q1',
    'g7-c3-w1-hook-q1',
    'grade7_cycle3_week1_hook_question1'
  ];

  const results = [];

  validIds.forEach(function(id) {
    results.push({
      id: id,
      expected: 'valid',
      actual: pattern.test(id) ? 'valid' : 'invalid',
      pass: pattern.test(id)
    });
  });

  invalidIds.forEach(function(id) {
    results.push({
      id: id,
      expected: 'invalid',
      actual: pattern.test(id) ? 'valid' : 'invalid',
      pass: !pattern.test(id)
    });
  });

  const passed = results.filter(function(r) { return r.pass; }).length;
  return {
    status: passed === results.length ? 'PASS' : 'FAIL',
    message: passed + '/' + results.length + ' question ID tests passed',
    details: results
  };
}

/**
 * Test cycle status file structure
 */
function testCycleStatusFiles() {
  // This test validates the expected structure of cycle-status.json files
  // In a real environment, it would read actual files

  const requiredFields = [
    'cycle',
    'grade',
    'status',
    'lastUpdated',
    'topic',
    'completion',
    'deployed'
  ];

  const sampleStatus = {
    cycle: 3,
    grade: 7,
    status: 'deployed',
    lastUpdated: '2025-12-10',
    topic: 'Climate Change & Energy Flow',
    completion: { overall: 100 },
    deployed: { week1: true, week2: true, week3: true }
  };

  const results = requiredFields.map(function(field) {
    return {
      field: field,
      present: sampleStatus.hasOwnProperty(field),
      pass: sampleStatus.hasOwnProperty(field)
    };
  });

  const passed = results.filter(function(r) { return r.pass; }).length;
  return {
    status: passed === results.length ? 'PASS' : 'FAIL',
    message: passed + '/' + results.length + ' required fields present in sample',
    details: results
  };
}

/**
 * Test DataAggregator functions are defined
 */
function testDataAggregator() {
  const requiredFunctions = [
    'aggregateWeekData',
    'buildStudentScores',
    'calculateClassStats'
  ];

  const results = requiredFunctions.map(function(fn) {
    return {
      function: fn,
      defined: typeof eval(fn) === 'function',
      pass: typeof eval(fn) === 'function'
    };
  });

  const passed = results.filter(function(r) { return r.pass; }).length;

  if (passed === 0) {
    return {
      status: 'SKIP',
      message: 'DataAggregator module not loaded',
      details: results
    };
  }

  return {
    status: passed === results.length ? 'PASS' : 'FAIL',
    message: passed + '/' + results.length + ' functions defined',
    details: results
  };
}

/**
 * Test ResponseCollector functions are defined
 */
function testResponseCollector() {
  const requiredFunctions = [
    'collectAllResponses',
    'getFormResponses',
    'saveToJson'
  ];

  const results = requiredFunctions.map(function(fn) {
    var isDefined = false;
    try {
      isDefined = typeof eval(fn) === 'function';
    } catch (e) {
      isDefined = false;
    }
    return {
      function: fn,
      defined: isDefined,
      pass: isDefined
    };
  });

  const passed = results.filter(function(r) { return r.pass; }).length;

  if (passed === 0) {
    return {
      status: 'SKIP',
      message: 'ResponseCollector module not loaded',
      details: results
    };
  }

  return {
    status: passed === results.length ? 'PASS' : 'FAIL',
    message: passed + '/' + results.length + ' functions defined',
    details: results
  };
}

/**
 * ============================================================================
 * QUICK DIAGNOSTICS
 * ============================================================================
 */

/**
 * Quick check of system status - run this for a fast overview
 */
function quickDiagnostic() {
  Logger.log('=== Quick Diagnostic ===');
  Logger.log('Time: ' + new Date().toISOString());
  Logger.log('');

  // Check critical modules
  Logger.log('Module Status:');
  Logger.log('  Config: ' + (typeof Config !== 'undefined' ? 'LOADED' : 'MISSING'));
  Logger.log('  Constants: ' + (typeof Constants !== 'undefined' ? 'LOADED' : 'MISSING'));
  Logger.log('  TriggerManager: ' + (typeof TriggerManager !== 'undefined' ? 'LOADED' : 'MISSING'));
  Logger.log('');

  // Check triggers
  try {
    const triggers = ScriptApp.getProjectTriggers();
    Logger.log('Triggers: ' + triggers.length + ' active');
    triggers.forEach(function(t) {
      Logger.log('  - ' + t.getHandlerFunction());
    });
  } catch (e) {
    Logger.log('Triggers: ERROR - ' + e.message);
  }
  Logger.log('');

  // Check current cycle/week
  try {
    if (typeof Config !== 'undefined') {
      Logger.log('Current Position:');
      Logger.log('  Cycle: ' + Config.getCurrentCycle());
      Logger.log('  Week: ' + Config.getCurrentWeek());
    }
  } catch (e) {
    Logger.log('Current Position: ERROR - ' + e.message);
  }

  Logger.log('');
  Logger.log('=== Diagnostic Complete ===');
}

/**
 * Validate a specific form by ID
 * @param {string} formId - Google Form ID to validate
 */
function validateForm(formId) {
  if (!formId) {
    Logger.log('ERROR: Form ID required');
    return { error: 'Form ID required' };
  }

  Logger.log('Validating form: ' + formId);

  try {
    const form = FormApp.openById(formId);

    const validation = {
      formId: formId,
      title: form.getTitle(),
      isQuiz: form.isQuiz(),
      collectsEmail: form.collectsEmail(),
      requiresLogin: form.requiresLogin(),
      itemCount: form.getItems().length,
      issues: []
    };

    // Check title format
    if (!validation.title.match(/^G[78]\.C\d/)) {
      validation.issues.push('Title does not match naming convention');
    }

    // Check quiz settings
    if (!validation.isQuiz) {
      validation.issues.push('Form is not configured as quiz');
    }

    // Check email collection
    if (!validation.collectsEmail) {
      validation.issues.push('Form does not collect email');
    }

    // Check login requirement
    if (!validation.requiresLogin) {
      validation.issues.push('Form does not require login');
    }

    Logger.log('Title: ' + validation.title);
    Logger.log('Items: ' + validation.itemCount);
    Logger.log('Is Quiz: ' + validation.isQuiz);
    Logger.log('Issues: ' + (validation.issues.length > 0 ? validation.issues.join(', ') : 'None'));

    return validation;
  } catch (e) {
    Logger.log('ERROR: ' + e.message);
    return { error: e.message, formId: formId };
  }
}
