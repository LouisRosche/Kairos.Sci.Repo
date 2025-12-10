/**
 * sync-to-canvas.gs
 *
 * ⚠️ DEPRECATED - Use canvas-grades-sync.gs instead
 *
 * This file is kept for backwards compatibility only.
 * The actual implementation is in: scripts/canvas-grades-sync.gs
 *
 * See scripts/CANVAS-SYNC-SETUP.md for deployment instructions.
 */

// Redirect to new implementation
function syncToCanvas() {
  throw new Error(
    'This script is deprecated.\n\n' +
    'Use canvas-grades-sync.gs instead.\n' +
    'See CANVAS-SYNC-SETUP.md for instructions.'
  );
}
