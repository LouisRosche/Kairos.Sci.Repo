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
 */
function collectAllResponses() {
  const config = getResponseConfig();
  const results = {
    collected: new Date().toISOString(),
    grades: {}
  };

  config.grades.forEach(grade => {
    results.grades[grade] = {};

    config.activeCycles.forEach(cycle => {
      results.grades[grade][`cycle${String(cycle).padStart(2, '0')}`] =
        collectCycleResponses(grade, cycle);
    });
  });

  // Save master JSON
  saveToJson('all-responses.json', results);

  Logger.log('Response collection complete: ' + JSON.stringify(Object.keys(results.grades)));
  return results;
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
 * Fetch all responses from a Google Form
 */
function getFormResponses(formId) {
  const form = FormApp.openById(formId);
  const responses = form.getResponses();
  const items = form.getItems();

  return responses.map(response => {
    const itemResponses = response.getItemResponses();
    const data = {
      timestamp: response.getTimestamp().toISOString(),
      email: response.getRespondentEmail(),
      answers: {}
    };

    itemResponses.forEach((itemResponse, index) => {
      const item = itemResponse.getItem();
      data.answers[`q${index + 1}`] = {
        question: item.getTitle(),
        type: item.getType().toString(),
        response: itemResponse.getResponse(),
        points: getItemPoints(item)
      };
    });

    return data;
  });
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
 * Save data to JSON file in Drive
 */
function saveToJson(filename, data) {
  const config = getResponseConfig();
  const jsonString = JSON.stringify(data, null, 2);
  const folder = config.outputFolderId
    ? DriveApp.getFolderById(config.outputFolderId)
    : DriveApp.getRootFolder();

  // Check if file exists
  const existingFiles = folder.getFilesByName(filename);
  if (existingFiles.hasNext()) {
    existingFiles.next().setContent(jsonString);
  } else {
    folder.createFile(filename, jsonString, MimeType.PLAIN_TEXT);
  }

  Logger.log(`Saved ${filename} (${jsonString.length} bytes)`);
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
