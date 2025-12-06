/**
 * FormGenerator.gs
 * Generates Google Forms from cycle configuration JSON
 *
 * This is the core scalability engine - reads config, outputs forms
 *
 * KAMS Science Curriculum System v2.0
 */

// ============================================================================
// CONFIGURATION
// ============================================================================

/**
 * Registry of all created forms - populated after deployment
 * Stored in a Google Sheet for persistence
 */
const REGISTRY_SHEET_ID = ''; // Set after creating registry sheet

/**
 * Load cycle configuration from Drive
 */
function loadCycleConfig(cycle) {
  const filename = `cycle${String(cycle).padStart(2, '0')}.json`;
  const files = DriveApp.getFilesByName(filename);

  if (!files.hasNext()) {
    throw new Error(`Config not found: ${filename}. Upload to Drive first.`);
  }

  return JSON.parse(files.next().getBlob().getDataAsString());
}

/**
 * Load master configuration
 */
function loadMasterConfig() {
  const files = DriveApp.getFilesByName('master-config.json');

  if (!files.hasNext()) {
    throw new Error('master-config.json not found in Drive');
  }

  return JSON.parse(files.next().getBlob().getDataAsString());
}

// ============================================================================
// MAIN GENERATION FUNCTIONS
// ============================================================================

/**
 * Generate all forms for a specific grade, cycle, and week
 * @param {number} grade - 7 or 8
 * @param {number} cycle - 3-10
 * @param {number} week - 1-3
 * @returns {Object} Created form IDs and URLs
 */
function generateWeekForms(grade, cycle, week) {
  const cycleConfig = loadCycleConfig(cycle);
  const masterConfig = loadMasterConfig();
  const gradeConfig = cycleConfig.grades[String(grade)];

  if (!gradeConfig) {
    throw new Error(`Grade ${grade} not found in cycle ${cycle} config`);
  }

  const weekConfig = gradeConfig.weeks[String(week)];
  if (!weekConfig) {
    throw new Error(`Week ${week} not found for grade ${grade} cycle ${cycle}`);
  }

  const results = {
    grade: grade,
    cycle: cycle,
    week: week,
    created: new Date().toISOString(),
    forms: {}
  };

  // Generate each form type
  const formTypes = ['hook', 'station1', 'station2', 'station3', 'exitTicket'];

  formTypes.forEach(formType => {
    const stationConfig = weekConfig.stations[formType];
    if (!stationConfig) {
      Logger.log(`Skipping ${formType} - no config found`);
      return;
    }

    try {
      const formResult = generateForm(grade, cycle, week, formType, stationConfig, gradeConfig, masterConfig);
      results.forms[formType] = formResult;
      Logger.log(`Created: ${formResult.name}`);
    } catch (e) {
      Logger.log(`ERROR creating ${formType}: ${e.message}`);
      results.forms[formType] = { error: e.message };
    }
  });

  // Save to registry
  saveToRegistry(results);

  return results;
}

/**
 * Generate a single form from configuration
 */
function generateForm(grade, cycle, week, formType, stationConfig, gradeConfig, masterConfig) {
  const points = masterConfig.assessment.formStructure[formType]?.points || 0;
  const formName = `G${grade}.C${cycle}.W${week}: ${formatFormType(formType)} - ${stationConfig.title} [${points} pts]`;

  // Create form
  const form = FormApp.create(formName);

  // Apply standard settings
  applyFormSettings(form, masterConfig);

  // Set description with context
  form.setDescription(buildFormDescription(grade, cycle, week, formType, stationConfig, gradeConfig));

  // Add questions based on form type
  addQuestionsFromConfig(form, grade, cycle, week, formType, stationConfig, gradeConfig);

  return {
    name: formName,
    formId: form.getId(),
    editUrl: form.getEditUrl(),
    publishedUrl: form.getPublishedUrl(),
    responseSheetId: null, // Set after first response or manual link
    points: points,
    questionCount: form.getItems().length
  };
}

/**
 * Apply standard form settings from master config
 */
function applyFormSettings(form, masterConfig) {
  const settings = masterConfig.formSettings;

  form.setIsQuiz(true);

  if (settings.security.requireLogin) {
    form.setRequireLogin(true);
  }
  if (settings.security.collectEmail) {
    form.setCollectEmail(true);
  }
  if (settings.security.limitOneResponse) {
    form.setLimitOneResponsePerUser(true);
  }
  if (settings.security.allowEdits) {
    form.setAllowResponseEdits(true);
  }
  if (settings.display.progressBar) {
    form.setProgressBar(true);
  }
  if (settings.display.confirmationMessage) {
    form.setConfirmationMessage(settings.display.confirmationMessage);
  }
}

/**
 * Build form description with learning context
 */
function buildFormDescription(grade, cycle, week, formType, stationConfig, gradeConfig) {
  const lines = [
    `Grade ${grade} | Cycle ${cycle} | Week ${week}`,
    `Topic: ${gradeConfig.topic}`,
    ''
  ];

  if (stationConfig.focus) {
    lines.push(`Focus: ${stationConfig.focus}`);
  }

  if (stationConfig.spiralTarget) {
    lines.push(`Spiral Review: ${stationConfig.spiralTarget}`);
  }

  if (stationConfig.resource) {
    lines.push(`Resource: ${stationConfig.resource}`);
  }

  return lines.join('\n');
}

/**
 * Add questions to form based on configuration
 * This is where question templates are applied
 */
function addQuestionsFromConfig(form, grade, cycle, week, formType, stationConfig, gradeConfig) {
  // Load question definitions from the forms.gs file or config
  // For now, generate standard structure based on form type

  const questionTemplates = getQuestionTemplates(formType, gradeConfig);

  questionTemplates.forEach((template, index) => {
    const qNum = index + 1;
    const questionId = `g${grade}_c${cycle}_w${week}_${formType}_q${qNum}`;

    addQuestionFromTemplate(form, template, questionId, stationConfig);
  });
}

/**
 * Get question templates for a form type
 * These define the STRUCTURE - content comes from config
 */
function getQuestionTemplates(formType, gradeConfig) {
  const templates = {
    hook: [
      { type: 'paragraph', purpose: 'prior_knowledge', points: 3, manual: true },
      { type: 'paragraph', purpose: 'phenomenon_observation', points: 3, manual: true },
      { type: 'paragraph', purpose: 'initial_hypothesis', points: 3, manual: true },
      { type: 'multipleChoice', purpose: 'prior_knowledge_check', points: 3, manual: false },
      { type: 'scale', purpose: 'confidence', points: 0, manual: false }
    ],
    station1: [
      { type: 'multipleChoice', purpose: 'observation', points: 4, manual: false },
      { type: 'multipleChoice', purpose: 'concept_check', points: 4, manual: false },
      { type: 'paragraph', purpose: 'misconception_check', points: 5, manual: true, required: true },
      { type: 'paragraph', purpose: 'connection', points: 4, manual: true },
      { type: 'paragraph', purpose: 'application', points: 3, manual: true },
      { type: 'scale', purpose: 'self_assessment', points: 0, manual: false }
    ],
    station2: [
      { type: 'number', purpose: 'calculation', points: 4, manual: false },
      { type: 'multipleChoice', purpose: 'conservation_check', points: 4, manual: false },
      { type: 'checkbox', purpose: 'multi_select', points: 4, manual: false },
      { type: 'paragraph', purpose: 'misconception_check', points: 4, manual: true, required: true },
      { type: 'multipleChoice', purpose: 'application', points: 4, manual: false }
    ],
    station3: [
      { type: 'paragraph', purpose: 'material_selection', points: 5, manual: true },
      { type: 'paragraph', purpose: 'design_plan', points: 6, manual: true },
      { type: 'paragraph', purpose: 'connection', points: 5, manual: true },
      { type: 'paragraph', purpose: 'constraints', points: 4, manual: true },
      { type: 'number', purpose: 'prediction', points: 5, manual: true }
    ],
    exitTicket: [
      { type: 'paragraph', purpose: 'new_content_1', points: 5, manual: true, tag: 'NEW' },
      { type: 'multipleChoice', purpose: 'spiral_1', points: 5, manual: false, tag: 'SPIRAL' },
      { type: 'paragraph', purpose: 'new_content_2', points: 5, manual: true, tag: 'NEW' },
      { type: 'multipleChoice', purpose: 'spiral_2', points: 3, manual: false, tag: 'SPIRAL' },
      { type: 'paragraph', purpose: 'integration', points: 5, manual: true, tag: 'INTEGRATION' },
      { type: 'paragraph', purpose: 'sep1_generator', points: 3, manual: true, tag: 'SEP-1' }
    ]
  };

  return templates[formType] || [];
}

/**
 * Add a single question from template
 */
function addQuestionFromTemplate(form, template, questionId, stationConfig) {
  let item;

  // Add section header for tagged questions
  if (template.tag) {
    form.addSectionHeaderItem()
      .setTitle(`[${template.tag}]`)
      .setHelpText(`Question ID: ${questionId}`);
  }

  switch (template.type) {
    case 'paragraph':
      item = form.addParagraphTextItem();
      item.setTitle(getQuestionTitle(template.purpose, stationConfig));
      item.setHelpText(getQuestionHelp(template.purpose));
      if (template.required) {
        item.setRequired(true);
      }
      // Note: paragraph items cannot have points set via API
      // Add rubric info in section header
      if (template.points > 0) {
        form.addSectionHeaderItem()
          .setTitle(`RUBRIC: ${template.points} points`)
          .setHelpText(getRubricHelp(template.purpose, template.points));
      }
      break;

    case 'multipleChoice':
      item = form.addMultipleChoiceItem();
      item.setTitle(getQuestionTitle(template.purpose, stationConfig));
      item.setHelpText(getQuestionHelp(template.purpose));
      // Placeholder choices - should be populated from config
      item.setChoices([
        item.createChoice('Option A', true),
        item.createChoice('Option B', false),
        item.createChoice('Option C', false),
        item.createChoice('Option D', false)
      ]);
      if (template.points > 0) {
        item.setPoints(template.points);
      }
      break;

    case 'checkbox':
      item = form.addCheckboxItem();
      item.setTitle(getQuestionTitle(template.purpose, stationConfig));
      item.setChoices([
        item.createChoice('Option A'),
        item.createChoice('Option B'),
        item.createChoice('Option C'),
        item.createChoice('Option D')
      ]);
      if (template.points > 0) {
        item.setPoints(template.points);
      }
      break;

    case 'scale':
      item = form.addScaleItem();
      item.setTitle(getQuestionTitle(template.purpose, stationConfig));
      item.setBounds(1, 5);
      item.setLabels('Not confident', 'Very confident');
      // Diagnostic items: no points
      break;

    case 'number':
      item = form.addTextItem();
      item.setTitle(getQuestionTitle(template.purpose, stationConfig));
      item.setHelpText('Enter a number. Show your work in the next question if needed.');
      // Add numeric validation
      item.setValidation(FormApp.createTextValidation()
        .requireNumber()
        .build());
      break;
  }

  return item;
}

/**
 * Get question title based on purpose
 */
function getQuestionTitle(purpose, stationConfig) {
  const titles = {
    prior_knowledge: 'What do you already know about this topic?',
    phenomenon_observation: 'Describe what you observe in the phenomenon.',
    initial_hypothesis: 'What is your initial explanation or prediction?',
    prior_knowledge_check: 'Based on what you learned previously:',
    confidence: 'How confident are you in your understanding so far? (FOR REFLECTION ONLY - does NOT affect grade)',
    observation: 'Based on the simulation/activity, what do you observe?',
    concept_check: 'Which statement best describes what happened?',
    misconception_check: 'CRITICAL: Explain your reasoning.',
    connection: 'How does this connect to what you learned previously?',
    application: 'Apply this concept to a new situation:',
    self_assessment: 'Rate your understanding of this concept:',
    calculation: 'Calculate the following:',
    conservation_check: 'In this process, what happens to the total amount of matter/energy?',
    multi_select: 'Select ALL that apply:',
    material_selection: 'Explain your design choices:',
    design_plan: 'Describe your design plan:',
    constraints: 'What constraints or trade-offs did you consider?',
    prediction: 'Predict the outcome:',
    new_content_1: 'Explain the main concept from this week:',
    new_content_2: 'Apply what you learned to this scenario:',
    spiral_1: 'Review: From previous learning:',
    spiral_2: 'Review: Calculate the following:',
    integration: 'Connect concepts from this week AND previous weeks:',
    sep1_generator: 'Write 2 testable HOW or WHY questions about this topic:'
  };

  return titles[purpose] || 'Question';
}

/**
 * Get question help text based on purpose
 */
function getQuestionHelp(purpose) {
  const help = {
    misconception_check: 'Be specific. Explain WHY you think this, not just WHAT you think.',
    sep1_generator: 'Good science questions can be investigated. Use "How does X affect Y?" or "Why does Z happen?"',
    confidence: 'This helps us understand where to provide more support. Be honest!',
    integration: 'Show how ideas from different lessons connect.'
  };

  return help[purpose] || '';
}

/**
 * Get rubric help text for manual grading items
 */
function getRubricHelp(purpose, points) {
  return `Teacher grades this item using rubric (${points} pts max). See rubrics.md for criteria.`;
}

/**
 * Format form type for display
 */
function formatFormType(formType) {
  const names = {
    hook: 'Hook',
    station1: 'Station 1',
    station2: 'Station 2',
    station3: 'Station 3',
    exitTicket: 'Exit Ticket'
  };
  return names[formType] || formType;
}

// ============================================================================
// REGISTRY FUNCTIONS
// ============================================================================

/**
 * Save form creation results to registry sheet
 */
function saveToRegistry(results) {
  if (!REGISTRY_SHEET_ID) {
    Logger.log('WARNING: No registry sheet configured. Form IDs not saved.');
    return;
  }

  const sheet = SpreadsheetApp.openById(REGISTRY_SHEET_ID).getActiveSheet();

  Object.keys(results.forms).forEach(formType => {
    const formData = results.forms[formType];
    if (formData.formId) {
      sheet.appendRow([
        results.created,
        results.grade,
        results.cycle,
        results.week,
        formType,
        formData.name,
        formData.formId,
        formData.editUrl,
        formData.publishedUrl,
        formData.points,
        formData.questionCount,
        '' // Response sheet ID - filled in later
      ]);
    }
  });
}

/**
 * Get form ID from registry
 */
function getFormIdFromRegistry(grade, cycle, week, formType) {
  if (!REGISTRY_SHEET_ID) return null;

  const sheet = SpreadsheetApp.openById(REGISTRY_SHEET_ID).getActiveSheet();
  const data = sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {
    if (data[i][1] == grade && data[i][2] == cycle &&
        data[i][3] == week && data[i][4] == formType) {
      return data[i][6]; // Form ID column
    }
  }

  return null;
}

// ============================================================================
// BATCH GENERATION
// ============================================================================

/**
 * Generate all forms for an entire cycle
 */
function generateCycleForms(grade, cycle) {
  const results = {
    grade: grade,
    cycle: cycle,
    weeks: {}
  };

  for (let week = 1; week <= 3; week++) {
    Logger.log(`\n=== Generating G${grade} C${cycle} W${week} ===`);
    try {
      results.weeks[week] = generateWeekForms(grade, cycle, week);
    } catch (e) {
      Logger.log(`ERROR for week ${week}: ${e.message}`);
      results.weeks[week] = { error: e.message };
    }
  }

  return results;
}

/**
 * Generate all forms for both grades in a cycle
 */
function generateFullCycle(cycle) {
  Logger.log(`\n========================================`);
  Logger.log(`GENERATING FULL CYCLE ${cycle}`);
  Logger.log(`========================================\n`);

  const results = {
    cycle: cycle,
    generated: new Date().toISOString(),
    grade7: generateCycleForms(7, cycle),
    grade8: generateCycleForms(8, cycle)
  };

  Logger.log(`\n========================================`);
  Logger.log(`CYCLE ${cycle} COMPLETE`);
  Logger.log(`========================================`);

  return results;
}

// ============================================================================
// ENTRY POINTS
// ============================================================================

/**
 * Quick test - generate Hook form only
 */
function testGenerateHook() {
  const result = generateWeekForms(7, 3, 1);
  Logger.log(JSON.stringify(result, null, 2));
}

/**
 * Generate Cycle 3 Week 1 for Grade 7
 */
function generateG7C3W1() {
  return generateWeekForms(7, 3, 1);
}

/**
 * Generate Cycle 3 Week 1 for Grade 8
 */
function generateG8C3W1() {
  return generateWeekForms(8, 3, 1);
}

/**
 * Generate all of Cycle 3
 */
function generateCycle3() {
  return generateFullCycle(3);
}

/**
 * Generate all of Cycle 4
 */
function generateCycle4() {
  return generateFullCycle(4);
}
