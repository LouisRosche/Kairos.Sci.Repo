# KAMS Science Curriculum Deployment Checklist
## Step-by-Step Guide for Production Deployment

**Version 1.0** | December 2025

---

## Overview

This checklist guides you through deploying the KAMS Science Curriculum system to production. Complete each section in order.

**Estimated Time:** 2-4 hours (first-time setup)
**Prerequisites:** Google Workspace admin access, Canvas LMS admin access

---

## Phase 1: Google Infrastructure Setup

### 1.1 Create Required Google Sheets

- [ ] **Form Registry Sheet**
  - Create new Google Sheet named `KAMS-Form-Registry`
  - Copy Sheet ID to `scripts/deploy-forms.gs` → `DEPLOYMENT_CONFIG.registrySheetId`
  - Add header row: `FormID | Grade | Cycle | Week | Station | FormURL | ResponseSheetID | DeployedDate | Status`

- [ ] **Hub Gradebook Sheet**
  - Create new Google Sheet named `KAMS-Science-Hub`
  - Follow setup guide: `data/hub/hub-setup-guide.md`
  - Copy Sheet ID to `scripts/nightly-aggregation.gs` → `AGGREGATION_CONFIG.hubSheetId`

- [ ] **Log Sheet**
  - Create new Google Sheet named `KAMS-Deployment-Logs`
  - Copy Sheet ID to:
    - `scripts/deploy-forms.gs` → `DEPLOYMENT_CONFIG.logSheetId`
    - `scripts/nightly-aggregation.gs` → `AGGREGATION_CONFIG.logSheetId`
  - Add tabs: `FormDeployment`, `Aggregation`, `Errors`

### 1.2 Create Required Google Drive Folders

- [ ] **Config Folder**
  - Create folder: `KAMS-Science/Config`
  - Copy Folder ID to `scripts/deploy-forms.gs` → `DEPLOYMENT_CONFIG.configFolderId`
  - Upload all `config/cycles/*.json` files

- [ ] **Forms Folder**
  - Create folder: `KAMS-Science/Forms`
  - Subfolders: `Grade7/`, `Grade8/`
  - Copy Folder ID to `scripts/deploy-forms.gs` → `DEPLOYMENT_CONFIG.formFolderId`

- [ ] **Output Folder**
  - Create folder: `KAMS-Science/Output`
  - Subfolders: `responses/`, `analysis/`, `mtss/`
  - Copy Folder ID to `scripts/nightly-aggregation.gs` → `AGGREGATION_CONFIG.outputFolderId`

---

## Phase 2: Apps Script Deployment

### 2.1 Deploy Shared Modules

- [ ] Create Apps Script project: `KAMS-Science-Core`
- [ ] Add files from `shared/`:
  - `Config.gs`
  - `Constants.gs`
  - `FormUtils.gs`
  - `DataUtils.gs`
  - `ValidationUtils.gs`
- [ ] Save and note Script ID

### 2.2 Deploy Form Generator

- [ ] Create Apps Script project: `KAMS-Form-Generator`
- [ ] Add files from `templates/forms/`:
  - `FormTemplate.gs`
  - `HookTemplate.gs`
  - `StationTemplate.gs`
  - `ExitTicketTemplate.gs`
- [ ] Add from `scripts/`:
  - `deploy-forms.gs`
- [ ] Configure `DEPLOYMENT_CONFIG` values (from Phase 1)
- [ ] Test: Run `testDeployment()` function
- [ ] Verify: Check Form Registry Sheet for test entry

### 2.3 Deploy Data Pipeline

- [ ] Create Apps Script project: `KAMS-Data-Pipeline`
- [ ] Add files from `data/aggregation/`:
  - `ResponseCollector.gs`
  - `DataAggregator.gs`
- [ ] Add from `data/mtss/`:
  - `InterventionGenerator.gs`
- [ ] Add from `scripts/`:
  - `nightly-aggregation.gs`
  - `TriggerManager.gs`
- [ ] Configure `AGGREGATION_CONFIG` values (from Phase 1)
- [ ] Test: Run `runManualAggregation()` function
- [ ] Verify: Check Output folder for JSON files

### 2.4 Set Up Triggers

- [ ] Open `KAMS-Data-Pipeline` project
- [ ] Run `TriggerManager.setupAllTriggers()`
- [ ] Verify triggers created:
  - 5:30 PM daily - Response Collection
  - 6:00 PM daily - Daily Orchestration
  - Friday 4:00 PM - Weekly Summary
- [ ] Check Edit > Current project's triggers to confirm

---

## Phase 3: Canvas LMS Integration

> **STATUS: AUTOMATED**
> Canvas grade sync is handled by `scripts/canvas-grade-sync.gs`. See `scripts/CANVAS-SYNC-SETUP.md`
> for complete deployment instructions.

### 3.1 Canvas Grade Sync Setup

- [ ] Deploy `scripts/canvas-grade-sync.gs` to Google Apps Script
- [ ] Configure Script Properties (see CANVAS-SYNC-SETUP.md):
  - `CANVAS_DOMAIN` - Your Canvas instance domain
  - `CANVAS_API_KEY` - Canvas API token
  - `GRADE_7_COURSE_ID` - Canvas course ID for Grade 7
  - `GRADE_8_COURSE_ID` - Canvas course ID for Grade 8
- [ ] Run initial setup: Grade 7 Sync → Setup Mapping
- [ ] Test with dry run mode before enabling live sync
- [ ] Enable auto-sync for automated grade updates

### 3.2 Manual Fallback (If Needed)

If automated sync is unavailable:

- [ ] Export student scores from Hub Gradebook (Google Sheets)
- [ ] Format for Canvas import (CSV with Student ID, Assignment, Grade)
- [ ] Import grades via Canvas → Gradebook → Import
- [ ] Verify import success, check for missing students

### 3.3 Student Mapping (For Future Automation)

- [ ] Export Canvas roster (CSV) for each course
- [ ] Create student mapping sheet:
  - Columns: `StudentEmail | CanvasStudentID | Grade | Section`
- [ ] Document mapping in `config/canvas-mapping.json` (to be created)

### 3.4 Assignment Setup (Manual)

- [ ] Create Canvas assignments for each week:
  - Name format: `G{grade}.C{cycle}.W{week}: Science Lab`
  - Points: 100
  - Due date: End of week
- [ ] Record Assignment IDs for reference

---

## Phase 4: Form Deployment

### 4.1 Deploy Cycle 3 Forms (Validation)

- [ ] Run: `deployWeek(7, 3, 1)` - Grade 7, Cycle 3, Week 1
- [ ] Verify in Form Registry:
  - 5 forms created (Hook, S1, S2, S3, Exit)
  - URLs populated
  - Response Sheet IDs populated
- [ ] Open each form and verify:
  - Questions load correctly
  - Points visible
  - Quiz mode enabled
- [ ] Repeat for G7 C3 W2-W3 and G8 C3 W1-W3

### 4.2 Embed Forms in Student Pages

- [ ] For each week's `student-page.html`:
  - Update `{{FORM_URL}}` placeholders with actual URLs
  - Test iframe embedding
  - Verify forms submit correctly
- [ ] Upload student pages to Canvas modules

### 4.3 Deploy Remaining Cycles

- [ ] Cycle 4: `deployFullCycle(7, 4)`, `deployFullCycle(8, 4)`
- [ ] Cycle 5: `deployFullCycle(7, 5)`, `deployFullCycle(8, 5)`
- [ ] Cycle 6: `deployFullCycle(7, 6)`, `deployFullCycle(8, 6)`
- [ ] Cycle 7: `deployFullCycle(7, 7)`, `deployFullCycle(8, 7)`
- [ ] Cycle 8: `deployFullCycle(7, 8)`, `deployFullCycle(8, 8)`
- [ ] Update all student pages with form URLs
- [ ] Update `cycle-status.json` files: `deployed: true`

---

## Phase 5: Testing & Validation

### 5.1 End-to-End Test

- [ ] Create test student account
- [ ] Complete one full week as test student:
  - Navigate to Canvas module
  - Open student page
  - Complete all 5 forms
  - Submit responses
- [ ] Verify data flows:
  - [ ] Responses appear in Response Sheets
  - [ ] Nightly aggregation captures data
  - [ ] Hub gradebook updates
  - [ ] MTSS tiers generate correctly

### 5.2 Grade Entry Test (Manual Process)

- [ ] Export one week's grades from Hub Gradebook
- [ ] Import to Canvas using CSV import
- [ ] Verify in Canvas gradebook:
  - Test student score appears
  - Points correct (out of 100)
- [ ] Document any issues for future automation

### 5.3 MTSS Pipeline Test

- [ ] Create test responses at various score levels
- [ ] Run: `generateMTSSReports()`
- [ ] Verify output files:
  - `tier2-students.json` - Students 50-69%
  - `tier3-students.json` - Students <50%
  - Recommendations generated

---

## Phase 6: Go-Live Checklist

### Pre-Launch (1 week before)

- [ ] All Cycle 3-4 forms deployed and tested
- [ ] All student pages uploaded to Canvas
- [ ] Triggers verified running (check last execution dates)
- [ ] Hub gradebook accessible to teachers
- [ ] MTSS reports generating to output folder

### Launch Day

- [ ] Verify forms accessible (test as student)
- [ ] Confirm trigger ran previous night
- [ ] Brief teachers on:
  - Where to find student pages
  - How to access Hub gradebook
  - MTSS report locations
- [ ] Set up monitoring:
  - Check error logs daily first week
  - Monitor response counts

### Post-Launch (First Week)

- [ ] Daily: Check aggregation ran successfully
- [ ] Daily: Review error logs
- [ ] Day 3: Verify Canvas grade sync working
- [ ] Day 5: Generate first MTSS report
- [ ] End of week: Review data quality, address issues

---

## Troubleshooting Quick Reference

### Form Not Creating
1. Check Form Registry for existing entry (may already exist)
2. Verify FormTemplate.gs syntax
3. Check Google Forms API quotas
4. Review error logs

### Aggregation Failing
1. Check trigger is set (Edit > Current project's triggers)
2. Verify Response Sheet IDs are correct
3. Check output folder permissions
4. Review execution logs

### Canvas Sync Failing
1. Verify API token hasn't expired
2. Check student ID mapping
3. Verify assignment IDs correct
4. Review Canvas API rate limits

### Data Missing in Hub
1. Check form responses exist
2. Verify IMPORTJSON formulas
3. Check JSON output files generated
4. Review aggregation logs

---

## Maintenance Schedule

| Task | Frequency | Script/Location |
|------|-----------|-----------------|
| Check error logs | Daily (first month) → Weekly | Logs Sheet |
| Verify trigger execution | Weekly | Apps Script > Triggers |
| Review MTSS reports | Weekly | output/mtss/ |
| Update `currentCycle` config | Per cycle | nightly-aggregation.gs |
| Refresh Canvas API token | Annually | Canvas settings |
| Archive old response data | End of semester | Manual |
| Update cycle configs | Before each cycle | config/cycles/ |

---

## Support Contacts

- **Technical Issues:** [Your IT contact]
- **Canvas Support:** [Canvas admin contact]
- **Curriculum Questions:** [Curriculum coordinator]

---

## Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-12-09 | Claude | Initial checklist |

---

*DEPLOYMENT-CHECKLIST.md | v1.0 | KAMS Science Curriculum*
