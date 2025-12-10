/**
 * KAMS Science Curriculum - Alert System
 * Centralized notification and alert management for MTSS pipeline
 *
 * @fileoverview Sends email notifications for critical alerts and provides
 *               configurable alert thresholds and recipient management
 * @version 1.0.0
 * @author KAMS Science Team
 *
 * ============================================================================
 * PURPOSE
 * ============================================================================
 *
 * This module provides:
 *   1. Email notifications for critical alerts (misconceptions, MTSS thresholds)
 *   2. Configurable alert thresholds and recipients
 *   3. Alert history tracking and deduplication
 *   4. Digest emails for non-critical notifications
 *   5. Health check alerts for system monitoring
 *
 * ============================================================================
 */

/**
 * Alert configuration - uses Config module when available
 */
var AlertConfig = {
  /**
   * Get alert configuration from master config or defaults
   */
  get: function() {
    try {
      if (typeof Config !== 'undefined' && Config.getMTSS) {
        const mtss = Config.getMTSS();
        return {
          thresholds: {
            misconception: mtss.alerts?.misconceptionThreshold || 30,
            wholeClassReteach: mtss.alerts?.wholeClassReteachThreshold || 40,
            spiralEffectiveness: mtss.alerts?.spiralEffectivenessMin || 60,
            tier3Count: 5,  // Alert if >5 Tier 3 students
            tier3Percentage: 10  // Alert if >10% are Tier 3
          },
          enabled: true
        };
      }
    } catch (e) {
      Logger.log('AlertConfig: Using defaults - ' + e.message);
    }

    // Default configuration
    return {
      thresholds: {
        misconception: 30,
        wholeClassReteach: 40,
        spiralEffectiveness: 60,
        tier3Count: 5,
        tier3Percentage: 10
      },
      enabled: true
    };
  },

  /**
   * Get alert recipients from script properties
   */
  getRecipients: function() {
    try {
      const props = PropertiesService.getScriptProperties();
      const recipients = props.getProperty('ALERT_RECIPIENTS');
      if (recipients) {
        return recipients.split(',').map(e => e.trim()).filter(e => e.length > 0);
      }
    } catch (e) {
      Logger.log('AlertConfig.getRecipients error: ' + e.message);
    }
    return [];
  },

  /**
   * Set alert recipients
   * @param {Array<string>} emails - Array of email addresses
   */
  setRecipients: function(emails) {
    const props = PropertiesService.getScriptProperties();
    props.setProperty('ALERT_RECIPIENTS', emails.join(','));
    Logger.log('Alert recipients set: ' + emails.join(', '));
  },

  /**
   * Check if alerts are enabled
   */
  isEnabled: function() {
    try {
      const props = PropertiesService.getScriptProperties();
      const disabled = props.getProperty('ALERTS_DISABLED');
      return disabled !== 'true';
    } catch (e) {
      return true;
    }
  },

  /**
   * Enable or disable alerts
   */
  setEnabled: function(enabled) {
    const props = PropertiesService.getScriptProperties();
    props.setProperty('ALERTS_DISABLED', enabled ? 'false' : 'true');
    Logger.log('Alerts ' + (enabled ? 'enabled' : 'disabled'));
  }
};

/**
 * Alert levels
 */
var AlertLevel = {
  CRITICAL: 'CRITICAL',   // Requires immediate action
  WARNING: 'WARNING',     // Attention needed soon
  INFO: 'INFO',           // Informational
  SUCCESS: 'SUCCESS'      // Positive notification
};

/**
 * Alert types
 */
var AlertType = {
  MISCONCEPTION: 'misconception',
  MTSS: 'mtss',
  SPIRAL: 'spiral',
  HEALTH: 'health',
  SEATING: 'seating',
  INTERVENTION: 'intervention',
  SYSTEM: 'system'
};

/**
 * ============================================================================
 * CORE ALERT FUNCTIONS
 * ============================================================================
 */

/**
 * Send alerts via email
 * Main entry point for alert delivery
 *
 * @param {Array<Object>} alerts - Array of alert objects
 * @param {Object} options - Optional settings (skipDedupe, forceEmail)
 * @returns {Object} Send results
 */
function sendAlertNotifications(alerts, options = {}) {
  const result = {
    timestamp: new Date().toISOString(),
    alertsReceived: alerts.length,
    alertsSent: 0,
    emailsSent: 0,
    errors: [],
    skipped: []
  };

  if (!AlertConfig.isEnabled()) {
    result.status = 'DISABLED';
    result.message = 'Alert system is disabled';
    Logger.log('AlertSystem: Alerts disabled, skipping send');
    return result;
  }

  const recipients = AlertConfig.getRecipients();
  if (recipients.length === 0) {
    result.status = 'NO_RECIPIENTS';
    result.message = 'No alert recipients configured';
    Logger.log('AlertSystem: No recipients configured');
    return result;
  }

  // Filter and deduplicate alerts
  let filteredAlerts = alerts;
  if (!options.skipDedupe) {
    filteredAlerts = deduplicateAlerts(alerts);
    result.skipped = alerts.filter(a =>
      !filteredAlerts.some(f => f.id === a.id || (f.type === a.type && f.message === a.message))
    );
  }

  if (filteredAlerts.length === 0) {
    result.status = 'NO_NEW_ALERTS';
    result.message = 'All alerts have been sent previously';
    return result;
  }

  // Categorize alerts by level
  const critical = filteredAlerts.filter(a => a.level === AlertLevel.CRITICAL);
  const warnings = filteredAlerts.filter(a => a.level === AlertLevel.WARNING);
  const info = filteredAlerts.filter(a => a.level === AlertLevel.INFO);

  // Send critical alerts immediately
  if (critical.length > 0) {
    try {
      sendCriticalAlertEmail(critical, recipients);
      result.emailsSent++;
      result.alertsSent += critical.length;
    } catch (e) {
      result.errors.push({ type: 'critical_email', error: e.message });
    }
  }

  // Batch warnings and info into digest (unless forced individual)
  if ((warnings.length > 0 || info.length > 0) && !options.forceIndividual) {
    try {
      sendDigestEmail(warnings, info, recipients);
      result.emailsSent++;
      result.alertsSent += warnings.length + info.length;
    } catch (e) {
      result.errors.push({ type: 'digest_email', error: e.message });
    }
  }

  // Record sent alerts
  recordSentAlerts(filteredAlerts);

  result.status = result.errors.length > 0 ? 'PARTIAL' : 'SUCCESS';
  result.message = `Sent ${result.alertsSent} alerts in ${result.emailsSent} emails`;

  Logger.log(`AlertSystem: ${result.message}`);
  return result;
}

/**
 * Send critical alert email
 * @private
 */
function sendCriticalAlertEmail(alerts, recipients) {
  const subject = `[KAMS Science] CRITICAL: ${alerts.length} Alert(s) Require Immediate Attention`;

  let body = 'CRITICAL ALERTS - IMMEDIATE ACTION REQUIRED\n';
  body += '='.repeat(60) + '\n\n';
  body += `Generated: ${new Date().toLocaleString()}\n\n`;

  alerts.forEach((alert, idx) => {
    body += `--- ALERT ${idx + 1} ---\n`;
    body += `Type: ${alert.type || 'Unknown'}\n`;
    body += `Level: ${alert.level}\n`;
    body += `Message: ${alert.message}\n`;
    if (alert.action) {
      body += `Action Required: ${alert.action}\n`;
    }
    if (alert.grade) {
      body += `Grade: ${alert.grade}\n`;
    }
    if (alert.affectedStudents) {
      body += `Affected Students: ${alert.affectedStudents}\n`;
    }
    body += '\n';
  });

  body += '='.repeat(60) + '\n';
  body += 'This is an automated message from the KAMS Science MTSS system.\n';
  body += 'Do not reply to this email.\n';

  MailApp.sendEmail({
    to: recipients.join(','),
    subject: subject,
    body: body
  });

  Logger.log(`AlertSystem: Sent critical alert email to ${recipients.length} recipients`);
}

/**
 * Send digest email for warnings and info
 * @private
 */
function sendDigestEmail(warnings, info, recipients) {
  const subject = `[KAMS Science] Alert Digest: ${warnings.length} Warning(s), ${info.length} Notice(s)`;

  let body = 'KAMS SCIENCE ALERT DIGEST\n';
  body += '='.repeat(60) + '\n\n';
  body += `Generated: ${new Date().toLocaleString()}\n\n`;

  if (warnings.length > 0) {
    body += 'WARNINGS (Action Recommended)\n';
    body += '-'.repeat(40) + '\n';
    warnings.forEach((alert, idx) => {
      body += `${idx + 1}. [${alert.type || 'Warning'}] ${alert.message}\n`;
      if (alert.action) {
        body += `   Action: ${alert.action}\n`;
      }
    });
    body += '\n';
  }

  if (info.length > 0) {
    body += 'NOTICES (For Your Information)\n';
    body += '-'.repeat(40) + '\n';
    info.forEach((alert, idx) => {
      body += `${idx + 1}. [${alert.type || 'Info'}] ${alert.message}\n`;
    });
    body += '\n';
  }

  body += '='.repeat(60) + '\n';
  body += 'This is an automated digest from the KAMS Science MTSS system.\n';

  MailApp.sendEmail({
    to: recipients.join(','),
    subject: subject,
    body: body
  });

  Logger.log(`AlertSystem: Sent digest email to ${recipients.length} recipients`);
}

/**
 * ============================================================================
 * ALERT GENERATION FUNCTIONS
 * ============================================================================
 */

/**
 * Generate MTSS-related alerts from reports
 *
 * @param {Object} mtssReports - MTSS reports by grade
 * @returns {Array<Object>} Generated alerts
 */
function generateMTSSAlerts(mtssReports) {
  const alerts = [];
  const config = AlertConfig.get();

  Object.entries(mtssReports).forEach(([gradeKey, report]) => {
    if (!report) return;

    const grade = gradeKey.replace('grade', '');
    const totalStudents = (report.tier1Students?.length || 0) +
                          (report.tier2Students?.length || 0) +
                          (report.tier3Students?.length || 0);

    if (totalStudents === 0) return;

    const tier3Count = report.tier3Students?.length || 0;
    const tier3Percent = Math.round((tier3Count / totalStudents) * 100);

    // Alert: High Tier 3 count
    if (tier3Count > config.thresholds.tier3Count) {
      alerts.push({
        id: `mtss-tier3-count-g${grade}-${Date.now()}`,
        type: AlertType.MTSS,
        level: tier3Count > config.thresholds.tier3Count * 2 ? AlertLevel.CRITICAL : AlertLevel.WARNING,
        grade: grade,
        message: `Grade ${grade} has ${tier3Count} Tier 3 students (${tier3Percent}% of class)`,
        action: 'Review intervention capacity and consider SST pipeline',
        affectedStudents: tier3Count,
        data: { tier3Count, tier3Percent, totalStudents }
      });
    }

    // Alert: High Tier 3 percentage
    if (tier3Percent > config.thresholds.tier3Percentage && tier3Count <= config.thresholds.tier3Count) {
      alerts.push({
        id: `mtss-tier3-pct-g${grade}-${Date.now()}`,
        type: AlertType.MTSS,
        level: AlertLevel.WARNING,
        grade: grade,
        message: `Grade ${grade} Tier 3 percentage (${tier3Percent}%) exceeds threshold`,
        action: 'Monitor closely; may indicate curriculum gaps',
        data: { tier3Percent, threshold: config.thresholds.tier3Percentage }
      });
    }

    // Alert: Whole-class reteach trigger
    const nonTier1Count = (report.tier2Students?.length || 0) + tier3Count;
    const nonTier1Percent = Math.round((nonTier1Count / totalStudents) * 100);

    if (nonTier1Percent >= config.thresholds.wholeClassReteach) {
      alerts.push({
        id: `mtss-reteach-g${grade}-${Date.now()}`,
        type: AlertType.MTSS,
        level: AlertLevel.CRITICAL,
        grade: grade,
        message: `Grade ${grade}: ${nonTier1Percent}% of students below Tier 1 - Whole-class reteach triggered`,
        action: 'PAUSE new content. Review common misconceptions and reteach core concepts.',
        affectedStudents: nonTier1Count,
        data: { nonTier1Count, nonTier1Percent, threshold: config.thresholds.wholeClassReteach }
      });
    }
  });

  return alerts;
}

/**
 * Generate misconception-related alerts
 *
 * @param {Object} misconceptionReport - Output from MisconceptionTracker
 * @returns {Array<Object>} Generated alerts
 */
function generateMisconceptionAlerts(misconceptionReport) {
  const alerts = [];
  const config = AlertConfig.get();

  Object.entries(misconceptionReport).forEach(([gradeKey, gradeData]) => {
    if (!gradeData || !gradeData.patterns) return;

    const grade = gradeKey.replace('grade', '');

    // Check each misconception pattern
    gradeData.patterns.forEach(pattern => {
      if (pattern.frequency >= config.thresholds.misconception) {
        const isCritical = pattern.frequency >= 50;

        alerts.push({
          id: `misconception-${pattern.id}-g${grade}-${Date.now()}`,
          type: AlertType.MISCONCEPTION,
          level: isCritical ? AlertLevel.CRITICAL : AlertLevel.WARNING,
          grade: grade,
          message: `Grade ${grade}: ${pattern.frequency}% of students exhibit "${pattern.description}"`,
          action: isCritical ?
            'IMMEDIATE intervention required. Use refutational text and hands-on activities.' :
            'Plan targeted small-group intervention for next week.',
          misconceptionId: pattern.id,
          correctUnderstanding: pattern.correctUnderstanding,
          affectedStudents: pattern.affectedStudents?.length || 0,
          data: {
            frequency: pattern.frequency,
            trend: pattern.trend,
            targetedQuestions: pattern.targetedQuestions
          }
        });
      }
    });
  });

  return alerts;
}

/**
 * Generate spiral effectiveness alerts
 *
 * @param {Object} spiralReport - Output from SpiralEffectiveness
 * @returns {Array<Object>} Generated alerts
 */
function generateSpiralAlerts(spiralReport) {
  const alerts = [];
  const config = AlertConfig.get();

  Object.entries(spiralReport).forEach(([gradeKey, gradeData]) => {
    if (!gradeData) return;

    const grade = gradeKey.replace('grade', '');

    // Check weekly trend
    if (gradeData.weeklyTrend) {
      const trend = gradeData.weeklyTrend;

      if (trend.trend === 'declining') {
        alerts.push({
          id: `spiral-trend-g${grade}-${Date.now()}`,
          type: AlertType.SPIRAL,
          level: AlertLevel.WARNING,
          grade: grade,
          message: `Grade ${grade}: Spiral effectiveness is declining`,
          action: 'Increase explicit connections between new and previous content. Add visual anchors.',
          data: { trend: trend.trend, scores: trend.scores }
        });
      }

      // Check if below minimum
      const latestScore = trend.scores?.[trend.scores.length - 1]?.averageScore;
      if (latestScore && latestScore < config.thresholds.spiralEffectiveness) {
        alerts.push({
          id: `spiral-low-g${grade}-${Date.now()}`,
          type: AlertType.SPIRAL,
          level: AlertLevel.WARNING,
          grade: grade,
          message: `Grade ${grade}: Spiral effectiveness (${latestScore}%) below ${config.thresholds.spiralEffectiveness}% threshold`,
          action: 'Add scaffolded spiral questions before independent practice.',
          data: { score: latestScore, threshold: config.thresholds.spiralEffectiveness }
        });
      }
    }

    // Check concept retention
    if (gradeData.conceptRetention?.weakRetention?.length > 0) {
      const weakConcepts = gradeData.conceptRetention.weakRetention;
      alerts.push({
        id: `spiral-retention-g${grade}-${Date.now()}`,
        type: AlertType.SPIRAL,
        level: AlertLevel.INFO,
        grade: grade,
        message: `Grade ${grade}: ${weakConcepts.length} concept(s) showing weak retention`,
        action: 'Include these concepts in upcoming spiral questions.',
        data: { concepts: weakConcepts }
      });
    }
  });

  return alerts;
}

/**
 * Generate system health alerts
 *
 * @param {Object} healthReport - System health check results
 * @returns {Array<Object>} Generated alerts
 */
function generateHealthAlerts(healthReport) {
  const alerts = [];

  if (!healthReport) return alerts;

  if (healthReport.status === 'UNHEALTHY' || healthReport.status === 'DEGRADED') {
    alerts.push({
      id: `health-${healthReport.status.toLowerCase()}-${Date.now()}`,
      type: AlertType.HEALTH,
      level: healthReport.status === 'UNHEALTHY' ? AlertLevel.CRITICAL : AlertLevel.WARNING,
      message: `System health: ${healthReport.status}`,
      action: 'Check system logs and resolve failing components.',
      data: {
        status: healthReport.status,
        failedChecks: healthReport.checks?.filter(c => !c.passed)
      }
    });
  }

  // Check for stale data
  if (healthReport.dataAge && healthReport.dataAge > 24 * 60 * 60 * 1000) { // >24 hours
    alerts.push({
      id: `health-stale-data-${Date.now()}`,
      type: AlertType.HEALTH,
      level: AlertLevel.WARNING,
      message: 'Data has not been updated in over 24 hours',
      action: 'Check if triggers are running. Verify form response collection.',
      data: { lastUpdate: healthReport.lastUpdate }
    });
  }

  return alerts;
}

/**
 * ============================================================================
 * ALERT HISTORY AND DEDUPLICATION
 * ============================================================================
 */

/**
 * Deduplicate alerts against recently sent alerts
 * @private
 */
function deduplicateAlerts(alerts) {
  const recentAlerts = getRecentAlertHistory();
  const dedupeWindow = 24 * 60 * 60 * 1000; // 24 hours
  const now = Date.now();

  return alerts.filter(alert => {
    // Check if similar alert was sent recently
    const isDuplicate = recentAlerts.some(recent => {
      const age = now - recent.timestamp;
      if (age > dedupeWindow) return false;

      // Same type and message = duplicate
      if (recent.type === alert.type && recent.message === alert.message) {
        return true;
      }

      // Same misconception ID = duplicate
      if (alert.misconceptionId && recent.misconceptionId === alert.misconceptionId) {
        return true;
      }

      return false;
    });

    return !isDuplicate;
  });
}

/**
 * Record sent alerts for deduplication
 * @private
 */
function recordSentAlerts(alerts) {
  try {
    const props = PropertiesService.getScriptProperties();
    const historyKey = 'ALERT_HISTORY';

    let history = [];
    const stored = props.getProperty(historyKey);
    if (stored) {
      history = JSON.parse(stored);
    }

    // Add new alerts
    const now = Date.now();
    alerts.forEach(alert => {
      history.push({
        type: alert.type,
        message: alert.message,
        misconceptionId: alert.misconceptionId,
        level: alert.level,
        timestamp: now
      });
    });

    // Prune old entries (keep last 7 days)
    const pruneAge = 7 * 24 * 60 * 60 * 1000;
    history = history.filter(h => now - h.timestamp < pruneAge);

    // Keep only last 100 entries
    if (history.length > 100) {
      history = history.slice(-100);
    }

    props.setProperty(historyKey, JSON.stringify(history));
  } catch (e) {
    Logger.log('AlertSystem: Failed to record alert history - ' + e.message);
  }
}

/**
 * Get recent alert history
 * @private
 */
function getRecentAlertHistory() {
  try {
    const props = PropertiesService.getScriptProperties();
    const stored = props.getProperty('ALERT_HISTORY');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    Logger.log('AlertSystem: Failed to load alert history - ' + e.message);
  }
  return [];
}

/**
 * ============================================================================
 * COMPREHENSIVE ALERT GENERATION
 * ============================================================================
 */

/**
 * Generate all alerts from orchestration data
 * Main entry point for alert generation
 *
 * @param {Object} orchestrationResults - Results from runDailyOrchestration
 * @returns {Array<Object>} All generated alerts
 */
function generateAllAlerts(orchestrationResults) {
  const allAlerts = [];

  // Generate MTSS alerts
  if (orchestrationResults.mtssReports) {
    const mtssAlerts = generateMTSSAlerts(orchestrationResults.mtssReports);
    allAlerts.push(...mtssAlerts);
  }

  // Generate misconception alerts
  if (orchestrationResults.misconceptionReport) {
    const misconceptionAlerts = generateMisconceptionAlerts(orchestrationResults.misconceptionReport);
    allAlerts.push(...misconceptionAlerts);
  }

  // Generate spiral alerts
  if (orchestrationResults.spiralReport) {
    const spiralAlerts = generateSpiralAlerts(orchestrationResults.spiralReport);
    allAlerts.push(...spiralAlerts);
  }

  Logger.log(`AlertSystem: Generated ${allAlerts.length} total alerts`);
  return allAlerts;
}

/**
 * Process and send all alerts from orchestration
 * Called by HubOrchestrator after analysis steps
 *
 * @param {Object} data - Object containing mtssReports, misconceptionReport, spiralReport
 * @returns {Object} Processing results
 */
function processAndSendAlerts(data) {
  // Generate alerts
  const alerts = generateAllAlerts(data);

  // Send notifications
  const result = sendAlertNotifications(alerts);

  // Log summary
  Logger.log(`AlertSystem: Processed ${alerts.length} alerts, sent ${result.alertsSent}`);

  return {
    generated: alerts.length,
    ...result,
    alerts: alerts
  };
}

/**
 * ============================================================================
 * UTILITY FUNCTIONS
 * ============================================================================
 */

/**
 * Send a test alert to verify configuration
 */
function sendTestAlert() {
  const testAlert = {
    id: 'test-' + Date.now(),
    type: AlertType.SYSTEM,
    level: AlertLevel.INFO,
    message: 'Test alert from KAMS Science Alert System',
    action: 'No action required. This is a test.'
  };

  const result = sendAlertNotifications([testAlert], { skipDedupe: true });

  if (result.status === 'SUCCESS') {
    Logger.log('Test alert sent successfully');
  } else {
    Logger.log('Test alert failed: ' + result.message);
  }

  return result;
}

/**
 * Get alert system status
 */
function getAlertSystemStatus() {
  const recipients = AlertConfig.getRecipients();
  const enabled = AlertConfig.isEnabled();
  const history = getRecentAlertHistory();

  const last24h = history.filter(h => Date.now() - h.timestamp < 24 * 60 * 60 * 1000);
  const criticalLast24h = last24h.filter(h => h.level === AlertLevel.CRITICAL);

  return {
    enabled: enabled,
    recipientCount: recipients.length,
    recipients: recipients,
    alertsLast24h: last24h.length,
    criticalAlertsLast24h: criticalLast24h.length,
    historySize: history.length
  };
}

/**
 * Clear alert history (for testing/reset)
 */
function clearAlertHistory() {
  const props = PropertiesService.getScriptProperties();
  props.deleteProperty('ALERT_HISTORY');
  Logger.log('Alert history cleared');
}

/**
 * Manual alert trigger for specific scenarios
 *
 * @param {string} type - Alert type
 * @param {string} level - Alert level
 * @param {string} message - Alert message
 * @param {string} action - Recommended action
 */
function sendManualAlert(type, level, message, action) {
  const alert = {
    id: `manual-${Date.now()}`,
    type: type || AlertType.SYSTEM,
    level: level || AlertLevel.INFO,
    message: message,
    action: action || ''
  };

  return sendAlertNotifications([alert], { skipDedupe: true });
}
