# Student Pages & Forms.gs Audit Report
**Date:** 2025-12-11
**Auditor:** Claude Code
**Branch:** claude/audit-student-pages-forms-01ULJXUfSaMkDT2563MTkSYs

## Scope
- **68 forms.gs files** across Grade 7 & 8, Cycles 01-08
- **58 student-page.html files** across Grade 7 & 8, Cycles 02-08

## Standards Referenced
- `framework/CONTENT-DESIGN-GUIDE.md` v3.0
- `framework/technical-reference.md` v1.4
- `LESSONS-LEARNED.md`

---

## CRITICAL ISSUES (Runtime Errors)

### 1. `setPoints(0)` Violations - 8 Files
**Severity:** CRITICAL
**Impact:** Will throw "Invalid data updating form" at runtime
**Standard Violated:** CONTENT-DESIGN-GUIDE.md §2.1, technical-reference.md Rule 1

| File | Line | Context |
|------|------|---------|
| `content/grade8/cycle07/week3/forms.gs` | 678 | `meta.setPoints(0);` - metacognition scale |
| `content/grade8/cycle01/week5/forms.gs` | 521 | `confidence.setPoints(0);` |
| `content/grade8/cycle01/week3/forms.gs` | 525 | `confidence.setPoints(0);` |
| `content/grade8/cycle01/week4/forms.gs` | 527 | `confidence.setPoints(0);` |
| `content/grade7/cycle01/week5/forms.gs` | 514 | `confidence.setPoints(0);` |
| `content/grade7/cycle01/week3/forms.gs` | 511 | `confidence.setPoints(0);` |
| `content/grade7/cycle01/week4/forms.gs` | 513 | `confidence.setPoints(0);` |
| `content/grade7/cycle01/week6/forms.gs` | 491 | `confidence.setPoints(0);` |

**Required Fix:** Remove `setPoints(0)` calls entirely - omit `setPoints()` for ungraded diagnostic items

```javascript
// WRONG - throws error
confidence.setPoints(0);

// CORRECT - omit setPoints() entirely
// (No setPoints call = ungraded item)
```

---

## HIGH PRIORITY ISSUES

### 2. Missing `setRequireLogin(true)` - 7 Files
**Severity:** HIGH
**Impact:** Students can submit without verified Google account email
**Standard Violated:** technical-reference.md Rule 5d

| File | Status |
|------|--------|
| `content/grade7/cycle01/week7/forms.gs` | Has `setCollectEmail(true)` but missing `setRequireLogin(true)` |
| `content/grade7/cycle01/week8/forms.gs` | Has `setCollectEmail(true)` but missing `setRequireLogin(true)` |
| `content/grade7/cycle04/week3/forms.gs` | Has `setCollectEmail(true)` but missing `setRequireLogin(true)` |
| `content/grade8/cycle01/week6/forms.gs` | Has `setCollectEmail(true)` but missing `setRequireLogin(true)` |
| `content/grade8/cycle01/week7/forms.gs` | Has `setCollectEmail(true)` but missing `setRequireLogin(true)` |
| `content/grade8/cycle01/week8/forms.gs` | Has `setCollectEmail(true)` but missing `setRequireLogin(true)` |
| `content/grade8/cycle04/week3/forms.gs` | Has `setCollectEmail(true)` but missing `setRequireLogin(true)` |

**Required Fix:** Add `form.setRequireLogin(true);` after `form.setCollectEmail(true);`

---

### 3. Missing Skip-to-Content Accessibility Link - 34 Files
**Severity:** HIGH
**Impact:** WCAG 2.1 AA compliance failure - keyboard users cannot bypass navigation
**Standard Violated:** CONTENT-DESIGN-GUIDE.md §6.1

**Files Missing Skip Link:**

#### Grade 7 (17 files)
- `content/grade7/cycle02/week1/student-page.html`
- `content/grade7/cycle02/week2/student-page.html`
- `content/grade7/cycle02/week3/student-page.html`
- `content/grade7/cycle02/week4/student-page.html`
- `content/grade7/cycle03/week1/student-page.html` **[READ-ONLY]**
- `content/grade7/cycle03/week2/student-page.html` **[READ-ONLY]**
- `content/grade7/cycle03/week3/student-page.html` **[READ-ONLY]**
- `content/grade7/cycle05/week1/student-page.html`
- `content/grade7/cycle05/week2/student-page.html`
- `content/grade7/cycle05/week3/student-page.html`
- `content/grade7/cycle06/week1/student-page.html`
- `content/grade7/cycle06/week2/student-page.html`
- `content/grade7/cycle06/week3/student-page.html`
- `content/grade7/cycle08/week2/student-page.html`
- `content/grade7/cycle08/week3/student-page.html`

#### Grade 8 (17 files)
- `content/grade8/cycle02/week1/student-page.html`
- `content/grade8/cycle02/week2/student-page.html`
- `content/grade8/cycle02/week3/student-page.html`
- `content/grade8/cycle02/week4/student-page.html`
- `content/grade8/cycle03/week1/student-page.html` **[READ-ONLY]**
- `content/grade8/cycle03/week2/student-page.html` **[READ-ONLY]**
- `content/grade8/cycle03/week3/student-page.html` **[READ-ONLY]**
- `content/grade8/cycle04/week1/student-page.html`
- `content/grade8/cycle04/week2/student-page.html`
- `content/grade8/cycle04/week3/student-page.html`
- `content/grade8/cycle05/week1/student-page.html`
- `content/grade8/cycle05/week2/student-page.html`
- `content/grade8/cycle05/week3/student-page.html`
- `content/grade8/cycle06/week1/student-page.html`
- `content/grade8/cycle06/week2/student-page.html`
- `content/grade8/cycle06/week3/student-page.html`
- `content/grade8/cycle08/week1/student-page.html`
- `content/grade8/cycle08/week2/student-page.html`
- `content/grade8/cycle08/week3/student-page.html`

**Required Fix:** Add after opening `<body>` tag:
```html
<a href="#main-content" class="skip-link">Skip to main content</a>
```

---

## MEDIUM PRIORITY ISSUES

### 4. Excessive Inline Styles - 34 Files
**Severity:** MEDIUM
**Impact:** Maintenance burden, inconsistent styling
**Standard Violated:** LESSONS-LEARNED.md §CSS & Styling

**Total Inline Styles:** 5,047+ `style=""` attributes across 34 files

**Worst Offenders:**
| File | Inline Style Count |
|------|-------------------|
| `content/grade7/cycle03/week1/student-page.html` | 577 |
| `content/grade8/cycle03/week1/student-page.html` | 433 |
| `content/grade8/cycle03/week2/student-page.html` | 352 |
| `content/grade8/cycle04/week1/student-page.html` | 282 |
| `content/grade8/cycle04/week2/student-page.html` | 311 |

**Required Fix:** Migrate to embedded `<style>` block per LESSONS-LEARNED.md §[2025-12-10] Canvas-Compatible Embedded CSS Pattern

---

### 5. Point Total Documentation Gaps - 32 Files
**Severity:** LOW
**Impact:** Unable to verify 100pt weekly total from HTML alone

Only 26 of 58 student-page.html files explicitly state "100 Points Total" or equivalent. Remaining 32 files either:
- Have points listed per station without explicit total
- Use different formatting that doesn't include total

---

## POSITIVE FINDINGS (Standards Met)

| Standard | Compliance | Notes |
|----------|------------|-------|
| No illegal API methods | ✅ 100% | Zero `setShuffleOrder()`, `setRandomize()`, `shuffleChoices()` calls |
| iframe title attributes | ✅ 100% | All iframes have descriptive `title=""` |
| `setIsQuiz(true)` | ✅ 100% | All 51 forms with paragraph items set quiz mode |
| ARIA landmarks | ✅ 83% | 48/58 student pages have proper roles |
| Feedback pattern | ✅ 100% | Correct `FormApp.createFeedback().setText().build()` |
| No setPoints on text items | ✅ 100% | No paragraph/text items have setPoints() |

---

## READ-ONLY CONTENT (Cannot Modify)

Per `cycle-status.json`, the following are **PRODUCTION READ-ONLY**:

| Cycle | Status | Notes |
|-------|--------|-------|
| Grade 7 Cycle 3 (W1-W3) | Deployed Dec 2025 | Cannot fix skip-link, inline styles |
| Grade 8 Cycle 3 (W1-W3) | Deployed Dec 2025 | Cannot fix skip-link, inline styles |

**Unfixable Issues in Production:**
- 6 student-page.html files missing skip-link (3 G7, 3 G8)
- High inline style counts in these files

---

## Remediation Priority

### Immediate (CRITICAL)
1. Fix 8 `setPoints(0)` violations - these will cause runtime errors
   - All in Cycle 01 and Cycle 07 (non-production)

### High Priority
2. Add `setRequireLogin(true)` to 7 forms
3. Add skip-link to 28 non-production student pages

### Medium Priority
4. CSS migration per existing tech debt plan (LESSONS-LEARNED.md)

### Deferred (Production)
5. Document 6 unfixable accessibility issues in production content for next major revision

---

## Files Requiring Changes (Editable Only)

### forms.gs fixes needed:
```
content/grade7/cycle01/week3/forms.gs  - setPoints(0), setRequireLogin
content/grade7/cycle01/week4/forms.gs  - setPoints(0), setRequireLogin
content/grade7/cycle01/week5/forms.gs  - setPoints(0)
content/grade7/cycle01/week6/forms.gs  - setPoints(0)
content/grade7/cycle01/week7/forms.gs  - setRequireLogin
content/grade7/cycle01/week8/forms.gs  - setRequireLogin
content/grade7/cycle04/week3/forms.gs  - setRequireLogin
content/grade8/cycle01/week3/forms.gs  - setPoints(0)
content/grade8/cycle01/week4/forms.gs  - setPoints(0)
content/grade8/cycle01/week5/forms.gs  - setPoints(0)
content/grade8/cycle01/week6/forms.gs  - setRequireLogin
content/grade8/cycle01/week7/forms.gs  - setRequireLogin
content/grade8/cycle01/week8/forms.gs  - setRequireLogin
content/grade8/cycle04/week3/forms.gs  - setRequireLogin
content/grade8/cycle07/week3/forms.gs  - setPoints(0)
```

### student-page.html fixes needed (skip-link):
28 files (see list above, excluding 6 READ-ONLY C3 files)

---

*Audit completed: 2025-12-11*
*Total issues found: 49+ (8 critical, 41+ high/medium)*
*Fixable issues: 43+ (excluding 6 production read-only)*
