/**
 * sync-to-canvas.gs
 *
 * DEPRECATED - This file has been superseded by canvas-grade-sync.gs
 *
 * The full Canvas grade sync implementation is now in:
 *   scripts/canvas-grade-sync.gs
 *
 * This file is kept for reference but should not be used.
 * See SETUP-INSTRUCTIONS.md for deployment steps.
 *
 * Migration Notes:
 * - All functionality from this placeholder has been implemented
 * - Credentials are now stored in Script Properties (not hardcoded)
 * - Email roster sync functions have been added
 * - Full auto-sync, dry-run mode, and system locking available
 */

// Redirect to new implementation
function syncWeekGrades(grade, cycle, week) {
  throw new Error('This file is deprecated. Use canvas-grade-sync.gs instead.');
}

function syncCycleGrades(grade, cycle) {
  throw new Error('This file is deprecated. Use canvas-grade-sync.gs instead.');
}
