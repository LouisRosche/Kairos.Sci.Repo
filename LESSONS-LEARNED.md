# Lessons Learned

**Single Source of Truth for Institutional Knowledge**

This living document captures patterns, anti-patterns, and insights discovered through iteration. Future work should consult this before making changes.

**Last Updated:** December 2025 | **Maintainer:** Development Team

---

## How to Use This Document

1. **Before starting work:** Scan relevant sections for applicable lessons
2. **After completing work:** Add new insights discovered
3. **Format for new entries:**
   ```
   ### [YYYY-MM-DD] Brief Title
   **Context:** What were you trying to do?
   **Lesson:** What did you learn?
   **Action:** What should be done differently?
   ```

---

## Table of Contents

1. [Architecture & Configuration](#architecture--configuration)
2. [Google Apps Script](#google-apps-script)
3. [CSS & Styling](#css--styling)
4. [Content Development](#content-development)
5. [Data Pipeline](#data-pipeline)
6. [Content Lifecycle & Protection](#content-lifecycle--protection)
7. [Common Pitfalls](#common-pitfalls)

---

## Architecture & Configuration

### [2025-12] Never Duplicate Configuration
**Context:** Multiple modules (HubOrchestrator, ResponseCollector, DataAggregator) each defined their own `HUB_CONFIG`, `RESPONSE_CONFIG`, `MTSS_TIERS` constants with identical or conflicting values.

**Lesson:** Configuration duplication leads to drift. When thresholds change, some modules get updated while others don't, causing subtle bugs.

**Action:**
- All configuration flows from `config/master-config.json` → `shared/Config.gs` → individual modules
- Modules call `Config.getXxx()` methods, never define local constants
- If you need a new config value, add it to master-config.json first

### [2025-12] Centralize Immutable Constants Separately
**Context:** API limits (max 30 choices per question) and pedagogical standards (NGSS codes) were scattered across files or not documented at all.

**Lesson:** Constants that never change at runtime (API constraints, standards lists) are different from configuration (thresholds that admins might adjust).

**Action:**
- Use `shared/Constants.gs` for immutable values
- Use `shared/Config.gs` for configurable values
- When unsure: if it would require code changes to update, it's a constant

### [2025-12] Document Module Boundaries
**Context:** It was unclear which modules were responsible for what, leading to overlapping functionality.

**Lesson:** Clear module boundaries prevent duplicate code and make the system easier to reason about.

**Action:**
- Each module should have a header comment explaining its single responsibility
- Reference the `ARCHITECTURE.md` data flow diagram when adding new functionality
- Ask: "Does this belong here, or does another module already handle this?"

---

## Google Apps Script

### [2025-12] Stagger Time-Based Triggers
**Context:** Both ResponseCollector and HubOrchestrator set up 6 PM daily triggers independently, causing race conditions and lock contention.

**Lesson:** Apps Script triggers that run at the same time compete for resources. One may fail silently.

**Action:**
- All triggers managed by `scripts/TriggerManager.gs`
- Current schedule: 5:30 PM (collection) → 6:00 PM (orchestration) → Friday 4 PM (summary)
- Individual modules must NOT set up their own triggers
- Deprecated trigger functions should delegate to TriggerManager

### [2025-12] Apps Script Hourly Precision Only
**Context:** Tried to set triggers for specific minutes (5:30 PM) but Apps Script only supports hour-level precision for daily triggers.

**Lesson:** `atHour(17)` means "sometime during the 5 PM hour," not exactly 5:00 PM.

**Action:**
- Use different hours to stagger triggers, not different minutes
- Plan for ±30 minute execution windows
- If precise timing needed, use a single trigger that dispatches to subtasks

### [2025-12] Use var for GAS Global Objects
**Context:** Using `const` for module-level objects can cause issues with Apps Script's execution model.

**Lesson:** Apps Script executes files in unpredictable order. `const` and `let` can cause reference errors.

**Action:**
- Use `var` for top-level module objects (e.g., `var Config = { ... }`)
- Use `const`/`let` inside functions where scope is clear

---

## CSS & Styling

### [2025-12] Inline Styles Are Technical Debt
**Context:** HTML templates had 100% inline styles, making design updates require editing every file.

**Lesson:** Inline styles seem faster initially but create massive maintenance burden at scale.

**Action:**
- Use `shared/styles/design-system.css` for all styling
- Templates use CSS classes, not inline styles
- CSS variables (custom properties) for theme values
- Only exception: truly one-off, file-specific styles

### [2025-12] 8px Baseline Grid
**Context:** Spacing was inconsistent across templates (10px here, 15px there, 12px elsewhere).

**Lesson:** Arbitrary spacing values create visual inconsistency and make the design feel "off."

**Action:**
- Use spacing tokens: 4px, 8px, 16px, 24px, 32px, 48px
- Available as CSS variables: `--space-xs`, `--space-sm`, `--space-md`, etc.
- When something "doesn't look right," check if spacing follows the baseline

### [2025-12] Semantic Color Names
**Context:** Colors were defined by their hex values (`#34a853`) rather than their purpose.

**Lesson:** When you need to change "success green," you have to find every instance of the hex code.

**Action:**
- Name by purpose: `--color-success`, `--color-error`, `--support-tier1-bg`
- Never use hex codes directly in templates
- Changing a color means updating one CSS variable

### [2025-12-10] Canvas-Compatible Embedded CSS Pattern
**Context:** Attempted to use `shared/styles/design-system.css` via external link in student pages, but Canvas LTI embeds strip external CSS references.

**Lesson:** Canvas security model blocks external stylesheets. All CSS must be embedded in `<style>` tags within the HTML file itself.

**Action:**
- Embed all CSS in `<style>` tags at the top of each student-page.html
- Use CSS custom properties (variables) in `:root` for theming consistency
- Define station-specific gradient classes: `.header-hook`, `.header-station1`, `.header-station2`, `.header-station3`, `.header-exit`
- Reference `templates/html/student-page-template.html` v3.1 for canonical pattern
- design-system.css remains the source of truth for values; copy relevant portions to embedded styles

### [2025-12-10] Station Header Color System
**Context:** Station headers used inconsistent colors/gradients across different student pages.

**Lesson:** Consistent visual identity helps students quickly orient to which station they're viewing.

**Action:**
- Use standardized gradients per station type:
  - Hook: Indigo gradient (`#6366F1` → `#4F46E5`)
  - Station 1: Green gradient (`#10B981` → `#059669`)
  - Station 2: Orange gradient (`#F59E0B` → `#D97706`)
  - Station 3: Purple gradient (`#8B5CF6` → `#7C3AED`)
  - Exit Ticket: Pink gradient (`#EC4899` → `#DB2777`)
- Always use white text (`#FFFFFF`) on gradient backgrounds
- Include subtle text shadow for legibility

---

## Content Development

### [2025-12] Reference CONTENT-DESIGN-GUIDE.md
**Context:** Content was created with inconsistent structure, missing required elements.

**Lesson:** `framework/CONTENT-DESIGN-GUIDE.md` exists as the SST for content creation but wasn't consistently referenced.

**Action:**
- Always start content work by reviewing CONTENT-DESIGN-GUIDE.md
- The guide specifies required sections, pedagogical patterns, and quality criteria
- If the guide is missing something, update the guide first

### [2025-12] Validate Against NGSS 3D Structure
**Context:** Some content claimed NGSS alignment but only addressed content (DCI) without practices (SEP) or crosscutting concepts (CCC).

**Lesson:** True NGSS alignment requires all three dimensions working together.

**Action:**
- Every form/lesson must identify: SEP (practice), DCI (content), CCC (crosscutting concept)
- Use `Constants.NGSS` for valid codes
- Review `framework/standards-alignment.md` for proper alignment patterns

---

## Data Pipeline

### [2025-12] Collection Before Aggregation
**Context:** Data aggregation failed when response collection hadn't completed.

**Lesson:** Pipeline stages have dependencies. Aggregation needs collection output.

**Action:**
- TriggerManager enforces ordering: collection (5:30 PM) → aggregation (6 PM)
- If running manually, always run `collectAllResponses()` before `aggregateWeekData()`
- Check for data existence before processing

### [2025-12] Tier Assignment Uses Centralized Logic
**Context:** Different modules calculated MTSS tiers differently, causing students to be in different tiers depending on which report you viewed.

**Lesson:** Business logic must live in one place.

**Action:**
- Use `Config.getTierForScore(percentage)` for all tier assignments
- Never write `if (score >= 70)` checks directly
- Threshold values live in master-config.json

---

## Content Lifecycle & Protection

### [2025-12] Legacy Content Handling (Cycle 02)
**Context:** Cycle 02 was created before the v3.0 architecture with 4 weeks instead of 3, and incomplete content.

**Lesson:** Legacy content requires special handling - it can't be fully deprecated (has historical value) but shouldn't be actively maintained.

**Action:**
- Mark legacy cycles with `"status": "legacy"` and `"isLegacy": true` in config
- Use `"weeksOverride": 4` for non-standard week counts
- Keep content in place but document it's reference-only
- Do NOT attempt to "fix" legacy content to match new architecture
- See `config/cycles/cycle02.json` for proper legacy marking pattern

### [2025-12] Production Content Protection
**Context:** Deployed content (C3.W2) was at risk of accidental modification.

**Lesson:** Once content is in production with students, it becomes legacy documentation and must be protected.

**Action:**
- Add `readonly` flags to `cycle-status.json` for deployed content
- Add read-only header comments to all protected files (HTML, GS, MD)
- Use `Constants.STATUS.CONTENT.READONLY` status for protected content
- Document protection reason in `readonly.[week]_reason` field
- Pattern: `⛔ READ-ONLY PRODUCTION CONTENT - DO NOT EDIT ⛔`

### [2025-12] Deployment Status vs Completion Status
**Context:** Confusion between "100% complete" and "deployed to students."

**Lesson:** A file can be 100% complete but not yet deployed, or deployed but needing protection.

**Action:**
- Use `completion` object for development progress (0-100%)
- Use `deployed` object for deployment state (true/false per week)
- Use `readonly` object for protection state (true/false per week)
- These are independent: deployed content should eventually become readonly

---

## Common Pitfalls

### Don't...

| Pitfall | Why It's Bad | Do This Instead |
|---------|--------------|-----------------|
| Hardcode configuration values | Creates drift, hard to update | Use `Config.getXxx()` methods |
| Create triggers in individual modules | Race conditions, duplicates | Use `TriggerManager` exclusively |
| Use inline CSS in templates | Maintenance nightmare | Use `design-system.css` classes |
| Define MTSS thresholds locally | Inconsistent tier assignments | Use `Config.getMTSSThresholds()` |
| Skip reading architecture docs | Duplicate/conflicting code | Read ARCHITECTURE.md first |
| Assume Apps Script execution order | Reference errors | Use `var` for globals |

### Do...

| Practice | Why It Helps | Where It's Documented |
|----------|--------------|----------------------|
| Check this file before starting | Avoid repeating mistakes | You're reading it! |
| Update this file after learning | Preserve institutional knowledge | Add entries below |
| Use Config module for all config | Single source of truth | `shared/Config.gs` |
| Follow 8px spacing grid | Visual consistency | `design-system.css` |
| Reference CONTENT-DESIGN-GUIDE | Content quality | `framework/CONTENT-DESIGN-GUIDE.md` |

---

## Adding New Lessons

When you discover something worth documenting:

1. Add it to the appropriate section above
2. Use the standard format:
   ```
   ### [YYYY-MM-DD] Brief Title
   **Context:** What were you trying to do?
   **Lesson:** What did you learn?
   **Action:** What should be done differently?
   ```
3. Update the "Last Updated" date at the top
4. If it's a new category, add to Table of Contents
5. Consider if it should also be added to:
   - `ARCHITECTURE.md` (if architectural)
   - `CONTENT-DESIGN-GUIDE.md` (if content-related)
   - `Constants.gs` (if it's an immutable value)

---

## Session History

| Date | Session Focus | Key Lessons Added |
|------|---------------|-------------------|
| 2025-12-07 | Repository Audit & Production Protection | Content lifecycle, legacy handling (C2), production content protection (C3.W2), version synchronization |
| 2025-12-07 | Architectural Refactor v3.0 | Configuration centralization, trigger management, CSS design system |
| 2025-12-10 | Tech Debt Audit & Remediation | setPoints(0) violations fixed, orphaned cycles archived, deploy-forms.gs documented, DataUtils duplicate functions removed |
| 2025-12-10 | CSS Styling Migration | Canvas-compatible embedded CSS pattern, station header color system, template v3.1 update, G7 C4 migration complete |

## Known Tech Debt (Tracking)

### HTML Inline Styles Migration (MEDIUM PRIORITY)
**Status:** Partially Complete | **Effort:** ~4-6 hours remaining | **Files:** 11 student-page.html files remaining

**Issue:** Some student-page.html files use extensive inline styles instead of design-system.css classes.

**Impact:**
- Design changes require editing every file
- Inconsistent styling across pages
- Larger file sizes

**Migration Plan:**
1. ✅ Audit design-system.css for missing component classes
2. ✅ Add missing classes (card, banner, nav-grid, etc.)
3. ✅ Migrate one cycle's pages as template (G7 C4 W1-W3 complete)
4. ✅ Added techDebt tracking to cycle-status.json files
5. ⏳ Batch migrate remaining pages
6. ⏳ Validate visual consistency

**Progress (2025-12-12):**

**COMPLETE (CSS Design System v3.1):**
| Grade | Cycle | Weeks | Pattern | Status |
|-------|-------|-------|---------|--------|
| G7 | C3 | W1-W5 | embedded | DEPLOYED (read-only) |
| G7 | C4 | W1-W3 | embedded | Complete |
| G7 | C6 | W1-W5 | embedded | Complete |
| G7 | C7 | W1-W4 | embedded | Complete |
| G7 | C8 | W1-W4 | embedded | Complete |
| G8 | C3 | W1-W5 | embedded | DEPLOYED (read-only) |
| G8 | C4 | W1-W3 | embedded | Complete |
| G8 | C7 | W1-W4 | embedded | Complete |
| G8 | C8 | W1-W4 | embedded | Complete |

**PENDING (Inline Styles - functional but not DRY):**
| Grade | Cycle | Files | Status |
|-------|-------|-------|--------|
| G7 | C5 | 3 files | techDebt.cssMigration.status: "pending" |
| G8 | C5 | 3 files | techDebt.cssMigration.status: "pending" |
| G8 | C6 | 5 files | techDebt.cssMigration.status: "pending" |

**Note:** All content is functional. CSS migration is a maintainability improvement, not a functional requirement.

---

## Enforcement & Automation

### [2025-12-12] Documentation Without Enforcement Is Theater
**Context:** Extensive documentation existed (CONTENT-DESIGN-GUIDE.md, technical-reference.md) but implementation drifted significantly (5,047 inline styles vs. "100% CSS classes" documented).

**Lesson:** Documentation alone doesn't prevent drift. Automated enforcement is required.

**Action:**
- Created `config/protected-files.json` to list production content
- Created `.githooks/pre-commit` hook to block protected file edits
- Created `scripts/validate-protected-files.js` for CI/CD integration
- Created `scripts/validate-cycle-status.js` for schema validation
- Enable hooks: `git config core.hooksPath .githooks`

### [2025-12-12] Config.gs Was Documented But Missing
**Context:** LESSONS-LEARNED.md stated "All configuration flows from master-config.json → shared/Config.gs → modules" but Config.gs didn't exist.

**Lesson:** Document AND implement. Check that documented SST files actually exist.

**Action:**
- Created `shared/Config.gs` with centralized configuration methods
- Use `Config.getPointsForStation('hook')` instead of hardcoding `12`
- Use `Config.getTierForScore(percentage)` instead of inline thresholds
- Use `Config.getMTSSThresholds()` for tier boundaries

### [2025-12-12] MTSS Tiers Without Interventions Are Useless
**Context:** Data pipeline assigned students to tiers (70%/50% thresholds) but no tier-specific intervention materials existed.

**Lesson:** Diagnosis without treatment provides no value. Tiers must connect to actionable resources.

**Action:**
- Created `content/interventions/` directory structure
- Created `tier2/templates/reteach-template.html` for targeted support
- Created `tier3/templates/prerequisite-review.html` for intensive support
- Created `shared/sentence-frames.md` for scaffolding across all tiers
- Link interventions from student pages via `<details class="tier2-support">`

### [2025-12-12] Cycle Status Schema Drift
**Context:** cycle-status.json files used inconsistent schemas (some had `readonly`, others didn't; some used different `deployed` formats).

**Lesson:** JSON without schema validation drifts. Define and enforce schemas.

**Action:**
- Created `config/schema/cycle-status-schema.json` defining canonical structure
- Required fields: `cycle`, `grade`, `status`, `lastUpdated`, `completion`
- Optional but standardized: `deployed`, `readonly`, `formUrls`
- Validation script: `node scripts/validate-cycle-status.js`

---

## Session History

| Date | Session Focus | Key Lessons Added |
|------|---------------|-------------------|
| 2025-12-07 | Repository Audit & Production Protection | Content lifecycle, legacy handling (C2), production content protection (C3.W2), version synchronization |
| 2025-12-07 | Architectural Refactor v3.0 | Configuration centralization, trigger management, CSS design system |
| 2025-12-10 | Tech Debt Audit & Remediation | setPoints(0) violations fixed, orphaned cycles archived, deploy-forms.gs documented, DataUtils duplicate functions removed |
| 2025-12-10 | CSS Styling Migration | Canvas-compatible embedded CSS pattern, station header color system, template v3.1 update, G7 C4 migration complete |
| 2025-12-12 | UX Infrastructure Overhaul | Config.gs created, protected-files enforcement, pre-commit hooks, MTSS intervention templates, cycle-status schema |
| 2025-12-12 | Curriculum Status Audit | CSS migration tracking added to cycle-status.json, tech debt documentation updated, migration status clarified |

---

*This document is the institutional memory of the project. Keep it current.*
