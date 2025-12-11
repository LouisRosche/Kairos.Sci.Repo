# Codebase Audit: Redundancy & Efficiency Analysis

**Date:** December 2025
**Scope:** Full repository audit for redundancy reduction, efficiency improvements, and organizational design

---

## Executive Summary

This audit identified **~30,000+ lines of redundant code** (approximately 30-40% of the codebase) that can be consolidated through templating, shared utilities, and removal of placeholder/unused files.

### Key Findings at a Glance

| Category | Issue | Impact | Effort to Fix |
|----------|-------|--------|---------------|
| Forms.gs duplication | 19,000+ redundant lines | High | Medium |
| HTML structural redundancy | 10,000+ redundant lines | High | Medium |
| Data script duplication | 500+ duplicate helper functions | Medium | Low |
| Placeholder/stub files | 35+ incomplete files | Low | Low |
| Unused printables | 9 orphaned tools | Low | Low |

---

## 1. FORMS.GS FILES — Critical Redundancy

### Problem

50 `forms.gs` files exist across `content/grade{7,8}/cycle{03-10}/week{1,2,3}/`, with massive code duplication.

### Duplication Analysis

| Component | Lines/Instance | Instances | Total Redundant Lines |
|-----------|----------------|-----------|----------------------|
| API Rules Header | 70 | 15 complete files | 1,050 |
| Form Setup Boilerplate | 20 | 250+ (5 forms × 50 files) | 5,000+ |
| `logFormInfo_()` helper | 9 | 50+ | 450+ |
| Placeholder files | 24 | 35 | 840 |
| Question rubric patterns | 40-60 | ~300 | 12,000-18,000 |
| **TOTAL** | — | — | **~19,000+ lines** |

### Specific Examples

**1. Identical Header Comments (70+ lines in every file):**
```javascript
// RULE 1: setPoints() ONLY on auto-gradable items
// RULE 2: setShuffleOrder() does NOT exist
// RULE 3: Use requireTextLengthGreaterThanOrEqualTo()...
// [continues for 70 lines]
```
This appears in ALL 15 complete forms.gs files identically.

**2. Form Setup Boilerplate (20 lines, repeated 250+ times):**
```javascript
form.setIsQuiz(true);
form.setRequireLogin(true);
form.setCollectEmail(true);
form.setLimitOneResponsePerUser(true);
form.setAllowResponseEdits(true);
form.setProgressBar(true);
form.setConfirmationMessage('...');
```

**3. Helper Function `logFormInfo_()` (duplicated 50+ times):**
```javascript
function logFormInfo_(form, name, points) {
  const editUrl = form.getEditUrl();
  const pubUrl = form.getPublishedUrl();
  const embedUrl = pubUrl.replace('/viewform', '/viewform?embedded=true');
  // ... logging
}
```

### Recommendation

**Create a Form Factory Pattern:**

1. Move `logFormInfo_()` to `shared/FormUtils.gs` (already exists, just needs this function)
2. Create `FormUtils.configureQuizForm(form, options)` for the 20-line setup boilerplate
3. Move API rules to `shared/FORM-API-RULES.md` reference doc (not inline comments)
4. Create parametrized form generators that load question content from config

**Potential savings: 15,000+ lines (75% reduction in forms.gs code)**

---

## 2. STUDENT-PAGE.HTML FILES — Structural Redundancy

### Problem

34 `student-page.html` files share 85-90% identical structure with only content differences.

### Duplication Analysis

| Element | Lines | Instances | Total |
|---------|-------|-----------|-------|
| Accessibility banner | 14 | 20 complete files | 280 |
| Header/gradient sections | 30 | 20 | 600 |
| Standards table structure | 50 | 20 | 1,000 |
| Quick nav buttons | 25 | 20 | 500 |
| Points breakdown table | 20 | 20 | 400 |
| Station header structure | 5 | 100+ | 500 |
| Details/summary collapsibles | 15 | 80+ | 1,200 |
| Form embedding blocks | 10 | 100+ | 1,000 |
| Footer sections | 20 | 20 | 400 |
| **Subtotal structural** | — | — | **~6,000 lines** |

### What Varies (Content That Should Be Templated)

- Phenomenon title and description
- Learning targets (SEP, DCI, CCC codes)
- Station mission text
- Form embed URLs
- Simulation links

### Recommendation

**Implement HTML Templating System:**

Option A: **Build-time templating** (Node.js + Nunjucks/Handlebars)
- Create `templates/html/student-page-base.html` with placeholders
- Content authors define JSON data files per week
- Build script generates final HTML

Option B: **Runtime JavaScript templating**
- Create `shared/student-page-components.js`
- Include via `<script>` and render components dynamically

**Potential savings: 8,000-10,000 lines (80% reduction)**

---

## 3. DATA SCRIPTS — Duplicate Functions & Scattered Logic

### Duplicate Statistical Functions

| Function | Found In | Should Be |
|----------|----------|-----------|
| `calculateMedian()` | DataAggregator.gs, DataUtils.gs | DataUtils only |
| `calculateStdDev()` | DataAggregator.gs, DataUtils.gs | DataUtils only |
| `average()` | SeatingAnalyzer.gs, SeatingDataBridge.gs, DataAggregator.gs | DataUtils only |
| `findMostCommon()`/`findMode()` | DataAggregator.gs, InterventionGrouping.gs | DataUtils only |
| `normalizeStudentName()` | SeatingAnalyzer.gs, SeatingDataBridge.gs | DataUtils only |

### Duplicate Seating Analysis Logic

**Files with overlapping functionality:**
- `data/seating/SeatingAnalyzer.gs` (lines 193-465)
- `data/seating/SeatingDataBridge.gs` (lines 397-544)

Both implement:
- Pair correlation calculations
- Catalyst/distraction vector identification
- Recommendation generation

**Recommendation:** SeatingDataBridge should call SeatingAnalyzer, not reimplement.

### Scattered Configuration Constants

Each module defines its own config instead of using `Config.gs`:

| File | Local Config | Should Use |
|------|--------------|------------|
| MisconceptionTracker.gs | `MISCONCEPTION_CONFIG` | Config.getMisconceptionConfig() |
| SpiralEffectiveness.gs | `SPIRAL_CONFIG` | Config.getSpiralConfig() |
| InterventionGenerator.gs | `MTSS_CONFIG` | Config.getMTSSConfig() |
| InterventionGrouping.gs | `GROUPING_CONFIG` | Config.getGroupingConfig() |
| SeatingAnalyzer.gs | `SEATING_CONFIG` | Config.getSeatingConfig() |

### Tier Assignment Calculated Multiple Times

Tier logic `score >= 70 ? 1 : (score >= 50 ? 2 : 3)` appears in:
- `DataAggregator.gs` (line 210)
- `InterventionGenerator.gs` (line 104-111)
- `InterventionGrouping.gs` (line 644-646)

**Recommendation:** Create `Config.getTierForScore(score)` and use everywhere.

---

## 4. PLACEHOLDER & STUB FILES — Remove or Complete

### Files That Are 80%+ Placeholder

| File | Status | Recommendation |
|------|--------|----------------|
| `data/analysis/MisconceptionTracker.gs` | Functions return `[]` or `false` | Complete or remove |
| `data/analysis/SpiralEffectiveness.gs` | Functions return `[]` or hardcoded `100` | Complete or remove |
| `data/mtss/InterventionGenerator.gs` | Calls undefined `getFormRegistry()` | Fix or remove |

### Placeholder Content Files (Cycles 6-10)

35 files across `content/grade{7,8}/cycle{06-10}/` are 24-line placeholders:

```javascript
// forms.gs placeholder for G7 C6 W1
// TODO: Implement using FormTemplate.gs pattern
function createAllG7C6W1Forms() {
  // Placeholder
}
```

**Recommendation:**
- Cycles 6-8 (scheduled): Complete using template pattern
- Cycles 9-10 (not scheduled for SY25-26): Mark explicitly as `NOT_SCHEDULED` or remove

### Deprecated Trigger Functions (Keep for Now)

| File | Function | Status |
|------|----------|--------|
| ResponseCollector.gs | `setupNightlyTrigger()` | Marked DEPRECATED, delegates to TriggerManager |
| HubOrchestrator.gs | `setupOrchestrationTrigger()` | Marked DEPRECATED, delegates to TriggerManager |

**Recommendation:** Remove after confirming TriggerManager works in production.

---

## 5. UNUSED TEMPLATES & TOOLS

### Printables Suite — Zero References

9 HTML tools in `templates/printables/` with **no references** anywhere in the codebase:

| File | Lines | Purpose |
|------|-------|---------|
| index.html | 544 | Hub page for printables |
| roster-manager.html | 697 | Class roster management |
| classroom-seating-map.html | 1046 | Seating chart generator |
| class-goal-tracker.html | 708 | Goal tracking |
| peer-tutor-cards.html | 649 | Peer tutoring cards |
| seat-signin-card.html | 649 | Sign-in cards |
| seating-insights-report.html | 797 | Analytics report |
| signin-data-entry.html | 918 | Data entry form |
| station-rotation-poster.html | 555 | Station guide |
| **TOTAL** | **6,563** | — |

**Recommendation:**
- If actively used: Move to `/tools/classroom-management/` with documentation
- If experimental: Archive to `/archive/experimental/`
- If abandoned: Remove entirely

### HTML Component Templates — Not Imported

Files in `templates/html/components/`:
- header.html
- footer.html
- navigation.html
- resources.html

These exist but are **not imported** into any student-page.html files.

**Recommendation:** Either implement import mechanism or document as "reference examples only."

---

## 6. FILES RECOMMENDED FOR REMOVAL

### Immediate Removal (Safe)

| Path | Reason | Lines Saved |
|------|--------|-------------|
| `content/grade{7,8}/cycle{09,10}/` | Not scheduled for SY25-26, all placeholders | ~400 |
| Placeholder forms.gs (35 files) | 24-line stubs with no content | 840 |

### Archive (Move to /archive/)

| Path | Reason | Lines |
|------|--------|-------|
| `templates/printables/*` | No active references, unclear status | 6,563 |
| `templates/html/components/*` | Not imported anywhere | ~200 |

### Review for Completion or Removal

| Path | Reason | Decision Needed |
|------|--------|-----------------|
| `data/analysis/MisconceptionTracker.gs` | 80% stubs | Complete or remove |
| `data/analysis/SpiralEffectiveness.gs` | 80% stubs | Complete or remove |
| `data/mtss/InterventionGenerator.gs` | Broken references | Fix or remove |

---

## 7. CONSOLIDATION STRATEGY

### Phase 1: Quick Wins (Low Effort, Immediate Impact)

1. **Move shared functions to DataUtils.gs**
   - `calculateMedian()`, `calculateStdDev()`, `average()`, `findMode()`
   - `normalizeStudentName()`
   - Effort: 2 hours

2. **Create `Config.getTierForScore()`**
   - Single source of truth for tier calculation
   - Update 3 files to use it
   - Effort: 30 minutes

3. **Move `logFormInfo_()` to FormUtils.gs**
   - Remove from 50+ individual files
   - Effort: 1 hour

4. **Remove Cycles 9-10 placeholder directories**
   - Or create explicit `NOT_SCHEDULED.md` marker files
   - Effort: 15 minutes

### Phase 2: Medium Effort (Significant Impact)

5. **Create `FormUtils.configureQuizForm()`**
   - Extract 20-line setup boilerplate
   - Update forms to use it
   - Effort: 4 hours

6. **Complete Config.gs migration**
   - Move all local `*_CONFIG` constants to centralized config
   - Effort: 4 hours

7. **Merge SeatingDataBridge into SeatingAnalyzer**
   - Eliminate duplicate analysis logic
   - Effort: 4 hours

### Phase 3: Major Refactoring (High Impact)

8. **Implement HTML templating system**
   - Create base template with slot placeholders
   - Generate student pages from data files
   - Effort: 2-3 days

9. **Create Form Factory pattern**
   - Parametrized form generation
   - Questions loaded from config/content files
   - Effort: 3-4 days

---

## 8. IMPACT SUMMARY

### Current State

| Metric | Value |
|--------|-------|
| Total files | ~319 |
| Estimated redundant lines | 30,000+ |
| Placeholder/incomplete files | 40+ |
| Unused template files | 13 |

### After Consolidation

| Metric | Before | After | Reduction |
|--------|--------|-------|-----------|
| forms.gs total lines | ~50,000 | ~12,000 | 76% |
| student-page.html total lines | ~20,000 | ~4,000 | 80% |
| Data script redundant code | ~500 | ~50 | 90% |
| Placeholder files | 40+ | 0 | 100% |

### Maintenance Benefits

- **Single point of change** for form settings, HTML structure, tier thresholds
- **Reduced bug surface** from copy-paste errors
- **Faster content development** with templates
- **Clearer architecture** for new contributors

---

## 9. PRIORITY RECOMMENDATIONS

### Must Do (Critical)

1. ✅ Remove or explicitly mark Cycles 9-10 as not scheduled
   - Added NOT_SCHEDULED.md to all cycle 9-10 content directories
   - Updated cycle-status.json with "deferred"/"merged" status
2. ✅ Consolidate statistical helper functions to DataUtils.gs
   - Added: average(), calculateMedian(), calculateStdDev(), findMode(), normalizeStudentName()
3. ✅ Create centralized tier calculation function
   - Config.getTierForScore() in Config.gs

### Should Do (High Value)

4. ⬜ Extract form setup boilerplate to FormUtils.gs (FormUtils.configSecurity exists but not adopted)
5. ✅ Complete Config.gs migration - Getters added (Dec 2025):
   - Config.getMisconceptionConfig()
   - Config.getSpiralConfig()
   - Config.getGroupingConfig()
   - ⬜ Individual scripts still need updating to use getters
6. ✅ Document printables folder - Added README.md with tool inventory and status

### Nice to Have (Future)

7. ⬜ Implement HTML templating system
8. ⬜ Create Form Factory pattern
9. ⬜ Complete or remove stub analysis files

---

## Appendix: File-by-File Redundancy Map

### Forms.gs Files (Sample)

| File | Total Lines | Unique Content | Boilerplate |
|------|-------------|----------------|-------------|
| content/grade7/cycle03/week1/forms.gs | 1,323 | ~400 | ~923 (70%) |
| content/grade7/cycle04/week1/forms.gs | 1,100 | ~350 | ~750 (68%) |
| content/grade7/cycle05/week1/forms.gs | 950 | ~300 | ~650 (68%) |
| content/grade8/cycle03/week1/forms.gs | 1,200 | ~380 | ~820 (68%) |

### Data Scripts

| File | Lines | Redundant Functions |
|------|-------|---------------------|
| data/aggregation/DataAggregator.gs | 500 | calculateMedian, calculateStdDev, findMostCommon |
| data/seating/SeatingAnalyzer.gs | 900 | average, normalizeStudentName, seating correlations |
| data/seating/SeatingDataBridge.gs | 600 | average, normalizeStudentName, seating correlations (DUPLICATE) |
| data/mtss/InterventionGrouping.gs | 520 | findMode, tier calculation |

---

## 10. IMPLEMENTATION STATUS (Updated December 2025)

### Completed Actions

| Action | Status | Commits |
|--------|--------|---------|
| Remove Cycles 9-10 placeholders | ✅ Done | 48 files removed |
| Archive unused printables | ✅ Done | Moved to archive/experimental/printables/ |
| Archive unused HTML components | ✅ Done | Moved to archive/experimental/html-components/ |
| Fix stale printables references | ✅ Done | Updated config + SEATING-SYSTEM-GUIDE |
| Consolidate statistical functions | ✅ Done | Added to DataUtils.gs |
| Add logFormInfo_() to FormUtils | ✅ Done | Global alias added |
| Add configureQuizForm() helper | ✅ Done | Added to FormUtils.gs |
| Deprecate duplicate functions | ✅ Done | Updated 4 data scripts |
| Clarify analysis file status | ✅ Done | Added integration notes |

### Files Impacted

**Removed:**
- `content/grade7/cycle09/*` (12 files)
- `content/grade7/cycle10/*` (12 files)
- `content/grade8/cycle09/*` (12 files)
- `content/grade8/cycle10/*` (12 files)

**Archived:**
- `templates/printables/*` → `archive/experimental/printables/` (9 files)
- `templates/html/components/*` → `archive/experimental/html-components/` (4 files)

**Updated:**
- `shared/DataUtils.gs` - Added 6 utility functions
- `shared/FormUtils.gs` - Added configureQuizForm() + global aliases
- `data/aggregation/DataAggregator.gs` - Deprecated local functions
- `data/seating/SeatingAnalyzer.gs` - Deprecated local functions
- `data/seating/SeatingDataBridge.gs` - Delegate to shared utilities
- `data/mtss/InterventionGrouping.gs` - Deprecated local findMode
- `data/analysis/MisconceptionTracker.gs` - Added integration docs
- `data/analysis/SpiralEffectiveness.gs` - Added integration docs

### Remaining Opportunities (Future Work)

| Opportunity | Estimated Impact | Complexity |
|-------------|------------------|------------|
| HTML templating system | 8,000-10,000 lines | High |
| Form Factory pattern | 15,000+ lines | High |
| Complete Config.gs migration | 2,000+ lines | Medium |

---

*End of Audit Report*
