# KAMS Science Hub Setup Guide
## Data Aggregation and Analysis Configuration

---

## Overview

The KAMS Science Hub (`KAMS-Science-Hub.xlsx`) serves as the central data aggregation point for all student performance data across both grades and all cycles. This guide covers setup, configuration, and maintenance.

---

## Initial Setup

### Step 1: Copy the Hub Template

1. Open `KAMS-Science-Hub.xlsx` in Google Sheets (or Excel Online)
2. Make a copy: File → Make a copy
3. Name it: `KAMS-Science-Hub-[Year]` (e.g., `KAMS-Science-Hub-2025-2026`)
4. Save to shared Google Drive folder accessible by all science teachers

### Step 2: Configure School Information

Update the **Settings** tab:

| Field | Value |
|-------|-------|
| School Name | KAMS |
| Academic Year | 2025-2026 |
| Grade 7 Periods | Period 2, Period 7 |
| Grade 8 Periods | Period 3, Period 5 |
| Current Cycle | 3 |

### Step 3: Import Student Rosters

1. Navigate to the **Roster** tab
2. Import student data from PowerSchool or SIS:
   - Column A: Student ID
   - Column B: Last Name
   - Column C: First Name
   - Column D: Email
   - Column E: Grade Level (7 or 8)
   - Column F: Period
   - Column G: IEP (Y/N)
   - Column H: 504 (Y/N)
   - Column I: ELL Level

### Step 4: Link Form Response Sheets

For each cycle/week, link the Google Form response sheets:

1. Go to **Data Connections** tab
2. For each form, enter:
   - Form ID (from Google Forms URL)
   - Response Sheet ID
   - Form Type (Hook, S1, S2, S3, Exit)

---

## Tab Structure

### Overview Tab
- Current cycle summary
- Class averages by period
- MTSS tier distribution charts

### Grade 7 / Grade 8 Tabs
- Student-level performance matrix
- Conditional formatting for tier identification
- Weekly score columns

### Analysis Tab
- Misconception tracking
- Spiral effectiveness metrics
- Question-level analysis

### MTSS Tab
- Tier 2 student list with interventions
- Tier 3 student list with action items
- Progress monitoring logs

### Settings Tab
- Configuration values
- Threshold settings
- Data refresh controls

---

## Data Import Methods

### Method 1: IMPORTRANGE (Recommended)

Use `IMPORTRANGE` to pull data from individual response sheets:

```
=IMPORTRANGE("sheet_id", "Form Responses 1!A:Z")
```

**Setup:**
1. Grant access when prompted
2. Set up once per response sheet
3. Data updates automatically

### Method 2: Apps Script Automation

Use the provided `ResponseCollector.gs` script:

1. Open Apps Script (Extensions → Apps Script)
2. Create new script file
3. Paste contents from `/data/aggregation/ResponseCollector.gs`
4. Set up daily trigger for automatic collection

### Method 3: Manual Export

For troubleshooting or backup:

1. Open each Google Form
2. Responses → Download responses (.csv)
3. Import into Hub manually

---

## Calculated Fields

### Overall Score Calculation

```
=ROUND((Hook + S1 + S2 + S3 + Exit) / 100 * 100, 1)
```

### MTSS Tier Assignment

```
=IF(Score >= 70, "Tier 1", IF(Score >= 50, "Tier 2", "Tier 3"))
```

### Spiral Effectiveness

```
=ROUND(AVERAGE(SpiralQ1, SpiralQ2) / MaxSpiralPoints * 100, 1)
```

---

## Conditional Formatting Rules

### Score-Based Coloring

| Range | Color | Meaning |
|-------|-------|---------|
| 70-100% | Green (#c6efce) | Tier 1 - Meeting expectations |
| 50-69% | Yellow (#ffeb9c) | Tier 2 - Needs support |
| 0-49% | Red (#ffc7ce) | Tier 3 - Intensive intervention |

### Missing Data

| Condition | Color | Meaning |
|-----------|-------|---------|
| Blank cell | Gray (#d9d9d9) | No submission |
| 0 score | Orange (#f4b183) | Submitted but zero points |

---

## Weekly Workflow

### Monday
1. Verify previous week's data imported correctly
2. Check for missing submissions
3. Generate MTSS tier lists

### Wednesday
1. Mid-week progress check
2. Update intervention notes

### Friday
1. Run weekly analysis script
2. Export tier reports
3. Archive weekly snapshot

---

## Troubleshooting

### Issue: IMPORTRANGE Not Updating

**Solution:**
1. Check if source sheet permissions changed
2. Re-authorize: Delete formula, re-enter, grant access
3. Verify sheet ID is correct

### Issue: Student Missing from Data

**Solution:**
1. Verify student email matches roster
2. Check if student submitted with different email
3. Manually add if needed

### Issue: Scores Not Calculating

**Solution:**
1. Check for text in numeric fields
2. Verify column references are correct
3. Clear and re-enter formulas

---

## Backup and Archiving

### Weekly Backup
- Export Hub as .xlsx every Friday
- Save to `archive/weekly-snapshots/`

### Cycle Archive
- At cycle end, create complete copy
- Name: `Hub-C[X]-Archive-[Date].xlsx`
- Store in `archive/cycle-archives/`

### Annual Archive
- Full export at year end
- Include all response sheets
- Document any special circumstances

---

## Security and Permissions

### Access Levels

| Role | Permissions |
|------|-------------|
| Lead Teacher | Edit all, manage sharing |
| Co-Teacher | Edit grade-specific tabs |
| Admin | View only |
| Students | No access |

### Data Protection

- Student data is FERPA protected
- Do not share publicly
- Limit download permissions
- Audit access quarterly

---

## Support

For technical issues:
1. Check this guide first
2. Review Apps Script logs
3. Contact curriculum coordinator

---

*Hub Setup Guide Version 1.0 | December 2025*
