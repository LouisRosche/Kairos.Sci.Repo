/**
 * ResponseCollector.gs
 * Fetches form responses from all cycles and exports to JSON
 *
 * KAMS Science Curriculum System
 * Version: 3.0.0
 *
 * MIGRATION NOTE (v3.0):
 * Previously, configuration was duplicated here. Now all config flows from:
 *   config/master-config.json -> shared/Config.gs -> this module
 *
 * TRIGGER NOTE:
 * This module previously set up a 6 PM trigger which conflicted with
 * HubOrchestrator. Now triggers are managed by scripts/TriggerManager.gs
 * Response collection runs at 5:30 PM (before orchestration at 6 PM).
 */

/**
 * Get response collection configuration from centralized Config module
 * @returns {Object} Response collection configuration
 */
function getResponseConfig() {
  return {
    outputFolderId: Config.getOutputFolderId(),
    grades: Config.getActiveGrades(),
    activeCycles: Config.getActiveCycles(),
    formsPerWeek: Config.getFormTypes()
  };
}

/**
 * Main entry point - collect all responses and export to JSON
 * Includes comprehensive error handling and logging
 */
function collectAllResponses() {
  const startTime = new Date();
  Logger.log('=== Response Collection Started ===');
  Logger.log(`Start time: ${startTime.toISOString()}`);

  let config;
  try {
    config = getResponseConfig();
  } catch (e) {
    Logger.log(`CRITICAL ERROR: Failed to load config: ${e.message}`);
    Logger.log(`Stack trace: ${e.stack}`);
    throw new Error(`Configuration load failed: ${e.message}`);
  }

  const results = {
    collected: new Date().toISOString(),
    grades: {},
    errors: [],
    stats: {
      gradesProcessed: 0,
      cyclesProcessed: 0,
      formsCollected: 0,
      totalResponses: 0
    }
  };

  config.grades.forEach(grade => {
    try {
      results.grades[grade] = {};

      config.activeCycles.forEach(cycle => {
        try {
          const cycleData = collectCycleResponses(grade, cycle);
          results.grades[grade][`cycle${String(cycle).padStart(2, '0')}`] = cycleData;
          results.stats.cyclesProcessed++;

          // Count responses
          if (cycleData && cycleData.weeks) {
            Object.values(cycleData.weeks).forEach(weekData => {
              results.stats.totalResponses += weekData.totalResponses || 0;
              results.stats.formsCollected += Object.keys(weekData.forms || {}).length;
            });
          }
        } catch (cycleError) {
          const errorMsg = `Error collecting G${grade} C${cycle}: ${cycleError.message}`;
          Logger.log(errorMsg);
          results.errors.push({ grade, cycle, error: cycleError.message, timestamp: new Date().toISOString() });
          results.grades[grade][`cycle${String(cycle).padStart(2, '0')}`] = { error: cycleError.message };
        }
      });

      results.stats.gradesProcessed++;
    } catch (gradeError) {
      const errorMsg = `Error processing grade ${grade}: ${gradeError.message}`;
      Logger.log(errorMsg);
      results.errors.push({ grade, error: gradeError.message, timestamp: new Date().toISOString() });
    }
  });

  // Save master JSON with retry logic
  try {
    saveToJsonWithRetry('all-responses.json', results, 3);
  } catch (saveError) {
    Logger.log(`CRITICAL: Failed to save results after retries: ${saveError.message}`);
    results.errors.push({ type: 'save', error: saveError.message, timestamp: new Date().toISOString() });
  }

  const endTime = new Date();
  const duration = (endTime - startTime) / 1000;

  Logger.log('=== Response Collection Summary ===');
  Logger.log(`Duration: ${duration.toFixed(2)}s`);
  Logger.log(`Grades processed: ${results.stats.gradesProcessed}`);
  Logger.log(`Cycles processed: ${results.stats.cyclesProcessed}`);
  Logger.log(`Forms collected: ${results.stats.formsCollected}`);
  Logger.log(`Total responses: ${results.stats.totalResponses}`);
  Logger.log(`Errors: ${results.errors.length}`);
  if (results.errors.length > 0) {
    Logger.log(`Error details: ${JSON.stringify(results.errors)}`);
  }

  return results;
}

/**
 * Save to JSON with retry logic for transient failures
 * @param {string} filename - Name of file to save
 * @param {Object} data - Data to save
 * @param {number} maxRetries - Maximum number of retry attempts
 */
function saveToJsonWithRetry(filename, data, maxRetries) {
  let lastError;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      saveToJson(filename, data);
      return; // Success
    } catch (e) {
      lastError = e;
      Logger.log(`Save attempt ${attempt}/${maxRetries} failed: ${e.message}`);
      if (attempt < maxRetries) {
        // Exponential backoff: 2s, 4s, 8s
        Utilities.sleep(Math.pow(2, attempt) * 1000);
      }
    }
  }
  throw lastError;
}

/**
 * Collect responses for a specific grade and cycle
 */
function collectCycleResponses(grade, cycle) {
  const cycleData = {
    grade: grade,
    cycle: cycle,
    weeks: {}
  };

  // Assuming 3 weeks per cycle
  for (let week = 1; week <= 3; week++) {
    cycleData.weeks[`week${week}`] = collectWeekResponses(grade, cycle, week);
  }

  return cycleData;
}

/**
 * Collect responses for a specific week
 */
function collectWeekResponses(grade, cycle, week) {
  const config = getResponseConfig();
  const weekData = {
    forms: {},
    totalResponses: 0,
    completionRate: 0
  };

  config.formsPerWeek.forEach(formType => {
    const formId = getFormId(grade, cycle, week, formType);

    if (formId) {
      try {
        const responses = getFormResponses(formId);
        weekData.forms[formType] = {
          formId: formId,
          responseCount: responses.length,
          responses: responses
        };
        weekData.totalResponses += responses.length;
      } catch (e) {
        Logger.log(`Error fetching ${formType} for G${grade}C${cycle}W${week}: ${e.message}`);
        weekData.forms[formType] = { error: e.message };
      }
    }
  });

  return weekData;
}

/**
 * Get form ID from config (must be populated after form creation)
 */
function getFormId(grade, cycle, week, formType) {
  // Load from cycle config
  const configFile = DriveApp.getFilesByName(`cycle${String(cycle).padStart(2, '0')}.json`);
  if (!configFile.hasNext()) return null;

  try {
    const config = JSON.parse(configFile.next().getBlob().getDataAsString());
    return config.grades[String(grade)]?.weeks[String(week)]?.formIds?.[formType] || null;
  } catch (e) {
    return null;
  }
}

/**
 * Fetch all responses from a Google Form with error handling
 * @param {string} formId - Google Form ID
 * @returns {Array} Array of response objects
 */
function getFormResponses(formId) {
  if (!formId) {
    throw new Error('Form ID is required');
  }

  let form;
  try {
    form = FormApp.openById(formId);
  } catch (e) {
    Logger.log(`Failed to open form ${formId}: ${e.message}`);
    throw new Error(`Cannot access form ${formId}: ${e.message}`);
  }

  let responses;
  try {
    responses = form.getResponses();
  } catch (e) {
    Logger.log(`Failed to get responses from form ${formId}: ${e.message}`);
    throw new Error(`Cannot retrieve responses: ${e.message}`);
  }

  const processedResponses = [];

  responses.forEach((response, responseIndex) => {
    try {
      const itemResponses = response.getItemResponses();
      const data = {
        timestamp: response.getTimestamp().toISOString(),
        email: response.getRespondentEmail() || 'anonymous',
        answers: {}
      };

      itemResponses.forEach((itemResponse, index) => {
        try {
          const item = itemResponse.getItem();
          data.answers[`q${index + 1}`] = {
            question: item.getTitle(),
            type: item.getType().toString(),
            response: itemResponse.getResponse(),
            points: getItemPoints(item)
          };
        } catch (itemError) {
          Logger.log(`Error processing item ${index} in response ${responseIndex}: ${itemError.message}`);
          data.answers[`q${index + 1}`] = { error: itemError.message };
        }
      });

      processedResponses.push(data);
    } catch (responseError) {
      Logger.log(`Error processing response ${responseIndex}: ${responseError.message}`);
      // Continue processing other responses
    }
  });

  return processedResponses;
}

/**
 * Get points for a gradeable item
 */
function getItemPoints(item) {
  try {
    // Only works for quiz items
    if (item.getType() === FormApp.ItemType.MULTIPLE_CHOICE) {
      return item.asMultipleChoiceItem().getPoints();
    } else if (item.getType() === FormApp.ItemType.CHECKBOX) {
      return item.asCheckboxItem().getPoints();
    }
  } catch (e) {
    return null;
  }
  return null;
}

/**
 * Save data to JSON file in Drive with error handling
 * @param {string} filename - Name of file to create/update
 * @param {Object} data - Data to serialize as JSON
 */
function saveToJson(filename, data) {
  if (!filename) {
    throw new Error('Filename is required');
  }
  if (!data) {
    throw new Error('Data is required');
  }

  let config;
  try {
    config = getResponseConfig();
  } catch (e) {
    Logger.log(`Warning: Could not load config for output folder, using root: ${e.message}`);
    config = { outputFolderId: null };
  }

  let jsonString;
  try {
    jsonString = JSON.stringify(data, null, 2);
  } catch (e) {
    throw new Error(`Failed to serialize data to JSON: ${e.message}`);
  }

  let folder;
  try {
    folder = config.outputFolderId
      ? DriveApp.getFolderById(config.outputFolderId)
      : DriveApp.getRootFolder();
  } catch (e) {
    Logger.log(`Warning: Could not access output folder ${config.outputFolderId}, using root: ${e.message}`);
    folder = DriveApp.getRootFolder();
  }

  try {
    // Check if file exists
    const existingFiles = folder.getFilesByName(filename);
    if (existingFiles.hasNext()) {
      const file = existingFiles.next();
      file.setContent(jsonString);
      Logger.log(`Updated ${filename} (${jsonString.length} bytes)`);
    } else {
      folder.createFile(filename, jsonString, MimeType.PLAIN_TEXT);
      Logger.log(`Created ${filename} (${jsonString.length} bytes)`);
    }
  } catch (e) {
    throw new Error(`Failed to save file ${filename}: ${e.message}`);
  }
}

/**
 * Convert responses to student-centric format for MTSS
 */
function aggregateByStudent(responses) {
  const studentData = {};

  Object.keys(responses.grades).forEach(grade => {
    Object.keys(responses.grades[grade]).forEach(cycle => {
      const cycleData = responses.grades[grade][cycle];

      Object.keys(cycleData.weeks).forEach(week => {
        const weekData = cycleData.weeks[week];

        Object.keys(weekData.forms).forEach(formType => {
          const formData = weekData.forms[formType];
          if (formData.responses) {
            formData.responses.forEach(response => {
              const email = response.email;
              if (!studentData[email]) {
                studentData[email] = {
                  email: email,
                  responses: [],
                  totalPoints: 0,
                  possiblePoints: 0
                };
              }

              studentData[email].responses.push({
                grade: grade,
                cycle: cycle,
                week: week,
                form: formType,
                timestamp: response.timestamp,
                answers: response.answers
              });
            });
          }
        });
      });
    });
  });

  return studentData;
}

/**
 * Schedule nightly collection (run this once to set up trigger)
 *
 * DEPRECATED: Use TriggerManager.setupResponseCollectionTrigger() instead
 * This function is kept for backwards compatibility but delegates to TriggerManager.
 *
 * NOTE: Trigger now runs at 5:30 PM (not 6 PM) to avoid conflict with orchestration.
 *
 * @deprecated Use scripts/TriggerManager.gs
 */
function setupNightlyTrigger() {
  Logger.log('DEPRECATED: Use TriggerManager.setupResponseCollectionTrigger() instead');
  Logger.log('Delegating to TriggerManager...');

  // Delegate to TriggerManager if available
  if (typeof TriggerManager !== 'undefined') {
    TriggerManager.setupResponseCollectionTrigger();
  } else {
    // Fallback - use 5:30 PM (17:30) to avoid conflict with orchestration
    ScriptApp.getProjectTriggers().forEach(trigger => {
      if (trigger.getHandlerFunction() === 'collectAllResponses') {
        ScriptApp.deleteTrigger(trigger);
      }
    });

    // Note: Apps Script time triggers run at start of hour
    // Using hour 17 (5 PM) to ensure completion before 6 PM orchestration
    ScriptApp.newTrigger('collectAllResponses')
      .timeBased()
      .atHour(17)
      .everyDays(1)
      .create();

    Logger.log('Nightly trigger set for 5 PM (legacy method - before 6 PM orchestration)');
  }
}
