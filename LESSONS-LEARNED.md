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
6. [Common Pitfalls](#common-pitfalls)

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
| 2025-12-07 | Architectural Refactor v3.0 | Configuration centralization, trigger management, CSS design system |

---

*This document is the institutional memory of the project. Keep it current.*
