/**
 * DataPersistence.gs
 * Centralized data persistence layer for KAMS Science Integration System
 * Handles storage, archival, and retrieval of alerts, interventions, and insights
 *
 * @version 1.0.0
 * @lastUpdated 2025-12-10
 */

// ============================================================================
// STORAGE CONFIGURATION
// ============================================================================

var DataStorage = {
  // Property Service keys
  KEYS: {
    ALERT_HISTORY: 'alert_history_index',
    INTERVENTION_INDEX: 'intervention_student_index',
    INSIGHTS_INDEX: 'insights_index',
    ARCHIVE_MANIFEST: 'archive_manifest'
  },

  // Size limits
  LIMITS: {
    MAX_PROPERTY_SIZE: 9000, // Safe limit (9KB per property, max is ~9.2KB)
    MAX_ALERTS_IN_MEMORY: 50,
    MAX_INTERVENTIONS_PER_STUDENT: 10,
    MAX_INSIGHTS_IN_PROPERTIES: 6
  },

  // Output paths (relative to data folder)
  PATHS: {
    ALERTS: 'hub/output/alerts/',
    INTERVENTIONS: 'mtss/output/interventions/',
    INSIGHTS: 'hub/output/insights/',
    ARCHIVE: 'archive/'
  }
};

// ============================================================================
// ALERT DATA PERSISTENCE
// ============================================================================

var AlertDataStore = {
  /**
   * Save alert to persistent storage
   * @param {Object} alert - Alert object with type, level, message, etc.
   * @returns {Object} Result with id and status
   */
  saveAlert: function(alert) {
    var timestamp = new Date().toISOString();
    var alertId = 'alert_' + timestamp.replace(/[:\-\.]/g, '') + '_' + Math.random().toString(36).substr(2, 6);

    alert.id = alertId;
    alert.savedAt = timestamp;
    alert.archived = false;

    // Get current alerts from properties
    var props = PropertiesService.getScriptProperties();
    var alertsJson = props.getProperty(DataStorage.KEYS.ALERT_HISTORY) || '[]';
    var alerts = [];

    try {
      alerts = JSON.parse(alertsJson);
    } catch (e) {
      Logger.log('Error parsing alert history, starting fresh: ' + e.toString());
      alerts = [];
    }

    // Add new alert
    alerts.unshift(alert);

    // Archive if exceeds limit
    if (alerts.length > DataStorage.LIMITS.MAX_ALERTS_IN_MEMORY) {
      this._archiveOldAlerts(alerts);
      alerts = alerts.slice(0, DataStorage.LIMITS.MAX_ALERTS_IN_MEMORY);
    }

    // Save back to properties
    props.setProperty(DataStorage.KEYS.ALERT_HISTORY, JSON.stringify(alerts));

    return { id: alertId, status: 'saved', count: alerts.length };
  },

  /**
   * Get recent alerts from memory
   * @param {number} limit - Maximum number to return
   * @returns {Array} Array of alert objects
   */
  getRecentAlerts: function(limit) {
    limit = limit || 50;
    var props = PropertiesService.getScriptProperties();
    var alertsJson = props.getProperty(DataStorage.KEYS.ALERT_HISTORY) || '[]';

    try {
      var alerts = JSON.parse(alertsJson);
      return alerts.slice(0, limit);
    } catch (e) {
      Logger.log('Error reading alerts: ' + e.toString());
      return [];
    }
  },

  /**
   * Archive old alerts to file storage
   * @private
   */
  _archiveOldAlerts: function(alerts) {
    var toArchive = alerts.slice(DataStorage.LIMITS.MAX_ALERTS_IN_MEMORY);
    if (toArchive.length === 0) return;

    var now = new Date();
    var archiveFile = 'alerts-archive-' + now.getFullYear() + '-' +
      String(now.getMonth() + 1).padStart(2, '0') + '-' +
      String(now.getDate()).padStart(2, '0') + '.json';

    // Mark as archived
    toArchive.forEach(function(alert) {
      alert.archived = true;
      alert.archivedAt = now.toISOString();
    });

    // Save to Drive (append to existing or create new)
    this._appendToArchiveFile(DataStorage.PATHS.ALERTS + archiveFile, toArchive);

    Logger.log('Archived ' + toArchive.length + ' alerts to ' + archiveFile);
  },

  /**
   * Append data to archive file in Drive
   * @private
   */
  _appendToArchiveFile: function(path, data) {
    try {
      var folder = getOrCreateFolder_(path.substring(0, path.lastIndexOf('/')));
      var filename = path.substring(path.lastIndexOf('/') + 1);

      var existingFiles = folder.getFilesByName(filename);
      var existingData = [];

      if (existingFiles.hasNext()) {
        var file = existingFiles.next();
        try {
          existingData = JSON.parse(file.getBlob().getDataAsString());
        } catch (e) {
          existingData = [];
        }
        // Append and save
        existingData = existingData.concat(data);
        file.setContent(JSON.stringify(existingData, null, 2));
      } else {
        // Create new file
        folder.createFile(filename, JSON.stringify(data, null, 2), MimeType.PLAIN_TEXT);
      }
    } catch (e) {
      Logger.log('Error archiving to ' + path + ': ' + e.toString());
    }
  },

  /**
   * Get alert history including archived alerts
   * @param {Object} options - Filter options (grade, type, dateRange)
   * @returns {Array} Array of all matching alerts
   */
  getAlertHistory: function(options) {
    options = options || {};
    var allAlerts = [];

    // Get recent from properties
    allAlerts = allAlerts.concat(this.getRecentAlerts(100));

    // Get archived if date range extends beyond recent
    if (options.includeArchived) {
      var archivedAlerts = this._loadArchivedAlerts(options.startDate, options.endDate);
      allAlerts = allAlerts.concat(archivedAlerts);
    }

    // Apply filters
    if (options.type) {
      allAlerts = allAlerts.filter(function(a) { return a.type === options.type; });
    }
    if (options.level) {
      allAlerts = allAlerts.filter(function(a) { return a.level === options.level; });
    }
    if (options.grade) {
      allAlerts = allAlerts.filter(function(a) { return a.grade === options.grade; });
    }

    return allAlerts;
  },

  /**
   * Load archived alerts from file storage
   * @private
   */
  _loadArchivedAlerts: function(startDate, endDate) {
    var alerts = [];
    try {
      var folder = getOrCreateFolder_(DataStorage.PATHS.ALERTS);
      var files = folder.getFiles();

      while (files.hasNext()) {
        var file = files.next();
        if (file.getName().indexOf('alerts-archive-') === 0) {
          try {
            var data = JSON.parse(file.getBlob().getDataAsString());
            alerts = alerts.concat(data);
          } catch (e) {
            Logger.log('Error reading archive file: ' + e.toString());
          }
        }
      }
    } catch (e) {
      Logger.log('Error loading archived alerts: ' + e.toString());
    }

    return alerts;
  },

  /**
   * Clear processed alerts from pending digest
   * @param {Array} alertIds - IDs of alerts to clear
   */
  clearProcessedAlerts: function(alertIds) {
    var props = PropertiesService.getScriptProperties();
    var pendingJson = props.getProperty('pending_alert_digest') || '[]';

    try {
      var pending = JSON.parse(pendingJson);
      pending = pending.filter(function(alert) {
        return alertIds.indexOf(alert.id) === -1;
      });
      props.setProperty('pending_alert_digest', JSON.stringify(pending));
    } catch (e) {
      Logger.log('Error clearing processed alerts: ' + e.toString());
    }
  }
};

// ============================================================================
// INTERVENTION DATA PERSISTENCE
// ============================================================================

var InterventionDataStore = {
  /**
   * Save intervention for a student with archival support
   * @param {string} studentEmail - Student's email
   * @param {number} grade - Grade level
   * @param {Object} intervention - Intervention details
   * @returns {Object} Result with status
   */
  saveIntervention: function(studentEmail, grade, intervention) {
    var timestamp = new Date().toISOString();
    var key = this._getStudentKey(studentEmail, grade);

    intervention.id = intervention.id || 'int_' + timestamp.replace(/[:\-\.]/g, '') + '_' + Math.random().toString(36).substr(2, 4);
    intervention.savedAt = timestamp;
    intervention.status = intervention.status || 'ACTIVE';

    // Load existing interventions for student
    var props = PropertiesService.getScriptProperties();
    var existingJson = props.getProperty(key) || '{"active":[],"completed":[]}';

    var data;
    try {
      data = JSON.parse(existingJson);
    } catch (e) {
      data = { active: [], completed: [] };
    }

    // Add to active list
    data.active.push(intervention);

    // Archive if too many completed
    if (data.completed.length > DataStorage.LIMITS.MAX_INTERVENTIONS_PER_STUDENT) {
      this._archiveCompletedInterventions(studentEmail, grade, data.completed);
      data.completed = data.completed.slice(-5); // Keep last 5
    }

    // Check size and archive if needed
    var jsonStr = JSON.stringify(data);
    if (jsonStr.length > DataStorage.LIMITS.MAX_PROPERTY_SIZE) {
      this._archiveOldInterventions(studentEmail, grade, data);
      data.completed = [];
      jsonStr = JSON.stringify(data);
    }

    props.setProperty(key, jsonStr);

    // Update index
    this._updateStudentIndex(studentEmail, grade);

    return { id: intervention.id, status: 'saved' };
  },

  /**
   * Get active interventions for a student
   * @param {string} studentEmail - Student's email
   * @param {number} grade - Grade level
   * @returns {Array} Array of active interventions
   */
  getActiveInterventions: function(studentEmail, grade) {
    var key = this._getStudentKey(studentEmail, grade);
    var props = PropertiesService.getScriptProperties();
    var dataJson = props.getProperty(key);

    if (!dataJson) return [];

    try {
      var data = JSON.parse(dataJson);
      return data.active || [];
    } catch (e) {
      return [];
    }
  },

  /**
   * Update intervention status (complete, escalate, etc.)
   * @param {string} studentEmail - Student's email
   * @param {number} grade - Grade level
   * @param {string} interventionId - ID of intervention to update
   * @param {Object} updates - Fields to update
   * @returns {Object} Result with status
   */
  updateIntervention: function(studentEmail, grade, interventionId, updates) {
    var key = this._getStudentKey(studentEmail, grade);
    var props = PropertiesService.getScriptProperties();
    var dataJson = props.getProperty(key);

    if (!dataJson) {
      return { status: 'error', message: 'No interventions found for student' };
    }

    try {
      var data = JSON.parse(dataJson);
      var found = false;

      // Find and update intervention
      for (var i = 0; i < data.active.length; i++) {
        if (data.active[i].id === interventionId) {
          // Apply updates
          Object.keys(updates).forEach(function(key) {
            data.active[i][key] = updates[key];
          });
          data.active[i].lastUpdated = new Date().toISOString();

          // If completed, move to completed list
          if (updates.status === 'COMPLETED' || updates.status === 'GRADUATED' || updates.status === 'ESCALATED') {
            data.active[i].completedAt = new Date().toISOString();
            data.completed.push(data.active[i]);
            data.active.splice(i, 1);
          }

          found = true;
          break;
        }
      }

      if (!found) {
        return { status: 'error', message: 'Intervention not found' };
      }

      props.setProperty(key, JSON.stringify(data));
      return { status: 'updated', interventionId: interventionId };
    } catch (e) {
      return { status: 'error', message: e.toString() };
    }
  },

  /**
   * Get intervention history for a student (including archived)
   * @param {string} studentEmail - Student's email
   * @param {number} grade - Grade level
   * @returns {Object} Object with active and completed interventions
   */
  getInterventionHistory: function(studentEmail, grade) {
    var key = this._getStudentKey(studentEmail, grade);
    var props = PropertiesService.getScriptProperties();
    var dataJson = props.getProperty(key);

    var result = { active: [], completed: [], archived: [] };

    if (dataJson) {
      try {
        var data = JSON.parse(dataJson);
        result.active = data.active || [];
        result.completed = data.completed || [];
      } catch (e) {
        Logger.log('Error parsing intervention data: ' + e.toString());
      }
    }

    // Load archived
    result.archived = this._loadArchivedInterventions(studentEmail, grade);

    return result;
  },

  /**
   * Get all students with active interventions for a grade
   * @param {number} grade - Grade level
   * @returns {Array} Array of student objects with intervention summary
   */
  getActiveInterventionsByGrade: function(grade) {
    var props = PropertiesService.getScriptProperties();
    var indexJson = props.getProperty(DataStorage.KEYS.INTERVENTION_INDEX) || '{}';

    try {
      var index = JSON.parse(indexJson);
      var gradeKey = 'g' + grade;
      var students = index[gradeKey] || [];
      var result = [];

      students.forEach(function(email) {
        var active = InterventionDataStore.getActiveInterventions(email, grade);
        if (active.length > 0) {
          result.push({
            email: email,
            grade: grade,
            activeCount: active.length,
            interventions: active
          });
        }
      });

      return result;
    } catch (e) {
      Logger.log('Error getting interventions by grade: ' + e.toString());
      return [];
    }
  },

  /**
   * Generate effectiveness report for a grade
   * @param {number} grade - Grade level
   * @returns {Object} Effectiveness report with statistics
   */
  generateEffectivenessReport: function(grade) {
    var allStudents = this.getActiveInterventionsByGrade(grade);
    var props = PropertiesService.getScriptProperties();

    var report = {
      timestamp: new Date().toISOString(),
      grade: grade,
      activeCount: 0,
      completedCount: 0,
      graduatedCount: 0,
      escalatedCount: 0,
      byType: {},
      successStories: [],
      concerns: []
    };

    allStudents.forEach(function(student) {
      report.activeCount += student.activeCount;

      // Get full history
      var history = InterventionDataStore.getInterventionHistory(student.email, grade);

      history.completed.forEach(function(intervention) {
        report.completedCount++;
        if (intervention.status === 'GRADUATED') {
          report.graduatedCount++;
          if (intervention.improvementPercent > 20) {
            report.successStories.push({
              student: student.email,
              intervention: intervention.type,
              improvement: intervention.improvementPercent
            });
          }
        } else if (intervention.status === 'ESCALATED') {
          report.escalatedCount++;
          report.concerns.push({
            student: student.email,
            intervention: intervention.type,
            reason: intervention.escalationReason
          });
        }

        // Track by type
        var type = intervention.type || 'unknown';
        if (!report.byType[type]) {
          report.byType[type] = { total: 0, graduated: 0, escalated: 0 };
        }
        report.byType[type].total++;
        if (intervention.status === 'GRADUATED') report.byType[type].graduated++;
        if (intervention.status === 'ESCALATED') report.byType[type].escalated++;
      });
    });

    return report;
  },

  // Helper methods

  _getStudentKey: function(email, grade) {
    return 'interventions_' + email.replace(/[^a-zA-Z0-9]/g, '_') + '_g' + grade;
  },

  _updateStudentIndex: function(email, grade) {
    var props = PropertiesService.getScriptProperties();
    var indexJson = props.getProperty(DataStorage.KEYS.INTERVENTION_INDEX) || '{}';

    try {
      var index = JSON.parse(indexJson);
      var gradeKey = 'g' + grade;
      if (!index[gradeKey]) index[gradeKey] = [];
      if (index[gradeKey].indexOf(email) === -1) {
        index[gradeKey].push(email);
      }
      props.setProperty(DataStorage.KEYS.INTERVENTION_INDEX, JSON.stringify(index));
    } catch (e) {
      Logger.log('Error updating student index: ' + e.toString());
    }
  },

  _archiveCompletedInterventions: function(email, grade, completed) {
    var archiveFile = 'interventions-' + email.replace(/[^a-zA-Z0-9]/g, '_') + '-g' + grade + '-archive.json';
    var path = DataStorage.PATHS.INTERVENTIONS + archiveFile;

    try {
      var folder = getOrCreateFolder_(DataStorage.PATHS.INTERVENTIONS);
      var files = folder.getFilesByName(archiveFile);
      var existingData = [];

      if (files.hasNext()) {
        var file = files.next();
        try {
          existingData = JSON.parse(file.getBlob().getDataAsString());
        } catch (e) {
          existingData = [];
        }
        existingData = existingData.concat(completed);
        file.setContent(JSON.stringify(existingData, null, 2));
      } else {
        folder.createFile(archiveFile, JSON.stringify(completed, null, 2), MimeType.PLAIN_TEXT);
      }
    } catch (e) {
      Logger.log('Error archiving interventions: ' + e.toString());
    }
  },

  _archiveOldInterventions: function(email, grade, data) {
    this._archiveCompletedInterventions(email, grade, data.completed);
  },

  _loadArchivedInterventions: function(email, grade) {
    var archiveFile = 'interventions-' + email.replace(/[^a-zA-Z0-9]/g, '_') + '-g' + grade + '-archive.json';

    try {
      var folder = getOrCreateFolder_(DataStorage.PATHS.INTERVENTIONS);
      var files = folder.getFilesByName(archiveFile);

      if (files.hasNext()) {
        var file = files.next();
        return JSON.parse(file.getBlob().getDataAsString());
      }
    } catch (e) {
      Logger.log('Error loading archived interventions: ' + e.toString());
    }

    return [];
  }
};

// ============================================================================
// INSIGHTS DATA PERSISTENCE
// ============================================================================

var InsightsDataStore = {
  /**
   * Save insights for a cycle/week
   * @param {number} cycle - Cycle number
   * @param {number} week - Week number
   * @param {Object} insights - Insights data
   * @returns {Object} Result with status
   */
  saveInsights: function(cycle, week, insights) {
    var timestamp = new Date().toISOString();
    var key = this._getInsightsKey(cycle, week);

    insights.savedAt = timestamp;
    insights.cycle = cycle;
    insights.week = week;

    // Save to file storage (primary)
    var filename = 'insights-c' + cycle + 'w' + week + '.json';
    this._saveInsightsToFile(filename, insights);

    // Save to properties for quick access (secondary, limited)
    var props = PropertiesService.getScriptProperties();
    var indexJson = props.getProperty(DataStorage.KEYS.INSIGHTS_INDEX) || '[]';

    try {
      var index = JSON.parse(indexJson);

      // Keep only recent in properties
      if (index.length >= DataStorage.LIMITS.MAX_INSIGHTS_IN_PROPERTIES) {
        // Remove oldest from properties (but keep in files)
        var oldest = index.shift();
        props.deleteProperty(this._getInsightsKey(oldest.cycle, oldest.week));
      }

      // Add to index
      index.push({ cycle: cycle, week: week, savedAt: timestamp });
      props.setProperty(DataStorage.KEYS.INSIGHTS_INDEX, JSON.stringify(index));

      // Save insights to properties
      props.setProperty(key, JSON.stringify(insights));
    } catch (e) {
      Logger.log('Error saving insights to properties: ' + e.toString());
    }

    return { status: 'saved', cycle: cycle, week: week };
  },

  /**
   * Get insights for a specific cycle/week
   * @param {number} cycle - Cycle number
   * @param {number} week - Week number
   * @returns {Object|null} Insights data or null if not found
   */
  getInsights: function(cycle, week) {
    var key = this._getInsightsKey(cycle, week);
    var props = PropertiesService.getScriptProperties();

    // Try properties first (fast)
    var insightsJson = props.getProperty(key);
    if (insightsJson) {
      try {
        return JSON.parse(insightsJson);
      } catch (e) {
        Logger.log('Error parsing insights from properties: ' + e.toString());
      }
    }

    // Fall back to file storage
    var filename = 'insights-c' + cycle + 'w' + week + '.json';
    return this._loadInsightsFromFile(filename);
  },

  /**
   * Get previous week's insights for comparison
   * @param {number} cycle - Current cycle
   * @param {number} week - Current week
   * @returns {Object|null} Previous insights or null
   */
  getPreviousInsights: function(cycle, week) {
    var prevCycle = cycle;
    var prevWeek = week - 1;

    if (prevWeek < 1) {
      prevCycle = cycle - 1;
      prevWeek = 3; // Assuming 3 weeks per cycle
    }

    if (prevCycle < 1) return null;

    return this.getInsights(prevCycle, prevWeek);
  },

  /**
   * Get all insights for a cycle
   * @param {number} cycle - Cycle number
   * @returns {Array} Array of insights for all weeks in cycle
   */
  getCycleInsights: function(cycle) {
    var insights = [];
    for (var week = 1; week <= 3; week++) {
      var weekInsights = this.getInsights(cycle, week);
      if (weekInsights) {
        insights.push(weekInsights);
      }
    }
    return insights;
  },

  /**
   * Get insights index (all available insights)
   * @returns {Array} Array of {cycle, week, savedAt} objects
   */
  getInsightsIndex: function() {
    // Combine properties index with file scan
    var index = [];
    var props = PropertiesService.getScriptProperties();

    try {
      var propsIndex = JSON.parse(props.getProperty(DataStorage.KEYS.INSIGHTS_INDEX) || '[]');
      index = propsIndex;
    } catch (e) {
      Logger.log('Error loading insights index: ' + e.toString());
    }

    // Scan files for additional entries
    try {
      var folder = getOrCreateFolder_(DataStorage.PATHS.INSIGHTS);
      var files = folder.getFiles();

      while (files.hasNext()) {
        var file = files.next();
        var name = file.getName();
        var match = name.match(/insights-c(\d+)w(\d+)\.json/);
        if (match) {
          var cycle = parseInt(match[1]);
          var week = parseInt(match[2]);
          var exists = index.some(function(i) { return i.cycle === cycle && i.week === week; });
          if (!exists) {
            index.push({
              cycle: cycle,
              week: week,
              savedAt: file.getLastUpdated().toISOString()
            });
          }
        }
      }
    } catch (e) {
      Logger.log('Error scanning insights files: ' + e.toString());
    }

    // Sort by cycle/week
    index.sort(function(a, b) {
      if (a.cycle !== b.cycle) return a.cycle - b.cycle;
      return a.week - b.week;
    });

    return index;
  },

  // Helper methods

  _getInsightsKey: function(cycle, week) {
    return 'insights_c' + cycle + 'w' + week;
  },

  _saveInsightsToFile: function(filename, insights) {
    try {
      var folder = getOrCreateFolder_(DataStorage.PATHS.INSIGHTS);
      var files = folder.getFilesByName(filename);

      if (files.hasNext()) {
        var file = files.next();
        file.setContent(JSON.stringify(insights, null, 2));
      } else {
        folder.createFile(filename, JSON.stringify(insights, null, 2), MimeType.PLAIN_TEXT);
      }
    } catch (e) {
      Logger.log('Error saving insights to file: ' + e.toString());
    }
  },

  _loadInsightsFromFile: function(filename) {
    try {
      var folder = getOrCreateFolder_(DataStorage.PATHS.INSIGHTS);
      var files = folder.getFilesByName(filename);

      if (files.hasNext()) {
        var file = files.next();
        return JSON.parse(file.getBlob().getDataAsString());
      }
    } catch (e) {
      Logger.log('Error loading insights from file: ' + e.toString());
    }

    return null;
  }
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get or create a folder by path
 * @param {string} path - Folder path relative to data folder
 * @returns {Folder} Google Drive folder
 */
function getOrCreateFolder_(path) {
  var parts = path.split('/').filter(function(p) { return p.length > 0; });
  var folder = DriveApp.getRootFolder();

  // Start from a known base folder if configured
  try {
    var config = Config.getMasterConfig();
    if (config.dataFolderId) {
      folder = DriveApp.getFolderById(config.dataFolderId);
    }
  } catch (e) {
    // Use root if no config
  }

  parts.forEach(function(part) {
    var folders = folder.getFoldersByName(part);
    if (folders.hasNext()) {
      folder = folders.next();
    } else {
      folder = folder.createFolder(part);
    }
  });

  return folder;
}

/**
 * Clean up old data from properties service
 * Run this periodically to prevent hitting limits
 */
function cleanupOldData() {
  var props = PropertiesService.getScriptProperties();
  var allProps = props.getProperties();
  var totalSize = 0;
  var cleaned = [];

  // Calculate current usage
  Object.keys(allProps).forEach(function(key) {
    totalSize += key.length + allProps[key].length;
  });

  Logger.log('Current properties size: ' + totalSize + ' bytes');

  // If approaching limit (500KB), clean up old data
  if (totalSize > 400000) {
    Logger.log('Approaching property limit, cleaning up...');

    // Archive and remove old trigger history
    Object.keys(allProps).forEach(function(key) {
      if (key.indexOf('trigger_lastRun_') === 0) {
        var value = allProps[key];
        var date = new Date(value);
        var daysSince = (new Date() - date) / (1000 * 60 * 60 * 24);
        if (daysSince > 30) {
          props.deleteProperty(key);
          cleaned.push(key);
        }
      }
    });

    Logger.log('Cleaned up ' + cleaned.length + ' old properties');
  }

  return {
    beforeSize: totalSize,
    cleanedCount: cleaned.length,
    cleaned: cleaned
  };
}

/**
 * Get data storage health report
 */
function getDataStorageHealth() {
  var props = PropertiesService.getScriptProperties();
  var allProps = props.getProperties();
  var totalSize = 0;
  var breakdown = {
    alerts: 0,
    interventions: 0,
    insights: 0,
    triggers: 0,
    other: 0
  };

  Object.keys(allProps).forEach(function(key) {
    var size = key.length + allProps[key].length;
    totalSize += size;

    if (key.indexOf('alert') !== -1) {
      breakdown.alerts += size;
    } else if (key.indexOf('intervention') !== -1) {
      breakdown.interventions += size;
    } else if (key.indexOf('insight') !== -1) {
      breakdown.insights += size;
    } else if (key.indexOf('trigger') !== -1) {
      breakdown.triggers += size;
    } else {
      breakdown.other += size;
    }
  });

  return {
    totalSize: totalSize,
    maxSize: 500000,
    usagePercent: Math.round((totalSize / 500000) * 100),
    breakdown: breakdown,
    status: totalSize > 400000 ? 'WARNING' : (totalSize > 450000 ? 'CRITICAL' : 'OK')
  };
}
