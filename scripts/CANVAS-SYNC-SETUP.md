# Canvas Grade Sync - Setup Instructions

This document provides step-by-step instructions for deploying the Canvas grade sync system from `canvas-grade-sync.gs` to your production Google Sheets environment.

## Overview

The Canvas Grade Sync script:
- Syncs grades from Google Sheets dashboards to Canvas LMS gradebook
- Supports Grade 7 and Grade 8 courses
- Features auto-sync during school hours
- Includes dry-run mode for safe testing
- Provides system locking for maintenance windows

---

## Step 1: Copy Script to Google Apps Script

1. Open your Google Sheet containing the grade dashboards
2. Go to **Extensions > Apps Script**
3. Create a new script file named `canvas-grade-sync.gs`
4. Copy the entire contents of `scripts/canvas-grade-sync.gs` into this file
5. Save the project (Ctrl+S / Cmd+S)

---

## Step 2: Configure Script Properties (Credentials)

The script uses Google Apps Script's **Script Properties** for secure credential storage. This keeps API keys out of the source code.

### To set up Script Properties:

1. In the Apps Script editor, click **Project Settings** (gear icon) in the left sidebar
2. Scroll down to **Script Properties**
3. Click **Add script property** for each of the following:

| Property Name | Description | Example Value |
|---------------|-------------|---------------|
| `CANVAS_DOMAIN` | Your Canvas instance domain | `gradientlearning.instructure.com` |
| `CANVAS_API_KEY` | Canvas API access token | `23860~L6GtXcezR...` |
| `GRADE_7_COURSE_ID` | Canvas course ID for Grade 7 | `65243` |
| `GRADE_8_COURSE_ID` | Canvas course ID for Grade 8 | `65244` |

### Optional Properties:

| Property Name | Description | Example Value |
|---------------|-------------|---------------|
| `GRADE_7_TEST_EMAILS` | Comma-separated test student emails to exclude | `test1@school.org,test2@school.org` |
| `GRADE_8_TEST_EMAILS` | Comma-separated test student emails to exclude | `test3@school.org` |

---

## Step 3: Verify Sheet Names

The script expects these sheets to exist (or will create mapping/tracking sheets):

| Config Property | Expected Sheet Name |
|-----------------|---------------------|
| Grade 7 Dashboard | `7th Live Dashboard` |
| Grade 7 Mapping | `7th Assignment Mapping` |
| Grade 7 Tracking | `7th Sync Tracker` |
| Grade 8 Dashboard | `8th Live Dashboard` |
| Grade 8 Mapping | `8th Assignment Mapping` |
| Grade 8 Tracking | `8th Sync Tracker` |
| Sync Log | `Sync Log` |

If your sheet names differ, update the `getGrade7Config()` and `getGrade8Config()` functions.

---

## Step 4: Initial Setup

Run these functions once to initialize the system:

1. **Refresh the page** to load the new menus
2. From the menu bar, select:
   - **Grade 7 Sync > Setup Mapping** - Creates assignment mapping sheet
   - **Grade 8 Sync > Setup Mapping** - Creates assignment mapping sheet

This will:
- Fetch all assignments from Canvas
- Create mapping sheets linking spreadsheet columns to Canvas assignment IDs
- Initialize tracking sheets

---

## Step 5: Test with Dry Run Mode

Before syncing real grades, test the system:

1. Go to **Both Grades > Dry Run Mode > Enable Dry Run (Test Mode)**
2. Run **Both Grades > Sync Both to Canvas**
3. Check the execution log (View > Execution log) to see what WOULD happen
4. Review the "Sync Log" sheet for detailed activity

When satisfied, disable dry run:
- **Both Grades > Dry Run Mode > Disable Dry Run (Live Mode)**

---

## Step 6: Enable Auto-Sync (Optional)

For automatic grade syncing:

1. Go to **Both Grades > Enable Auto-Sync**
2. The system will sync every 15 minutes during:
   - School hours: 7am - 4pm (weekdays)
   - Evening: 5pm and 8pm
   - Weekends: 5pm only

To disable: **Both Grades > Disable Auto-Sync**

---

## Menu Reference

After setup, these menus are available:

### Canvas Roster
- Update Grade 7 Emails - Fetch student roster from Canvas
- Update Grade 8 Emails - Fetch student roster from Canvas
- Update Both Grades - Fetch both rosters

### Grade 7 Sync / Grade 8 Sync
- Setup Mapping - Initialize assignment mapping
- Sync to Canvas - Manual sync for that grade

### Both Grades
- Sync Both to Canvas - Manual sync for both grades
- Enable/Disable Auto-Sync - Toggle automatic syncing
- View Sync Dashboard - See recent sync activity
- Show Current Mode - Display current system state
- Dry Run Mode submenu - Toggle test mode
- System Control submenu - Lock/unlock system, view triggers

---

## Migrating from Existing Production

If you already have the script running with hardcoded credentials:

1. **Lock the system first**: Both Grades > System Control > Clear All & Lock System
2. Set up Script Properties as described in Step 2
3. Replace the script code with the new version
4. Unlock the system: Both Grades > System Control > Unlock System
5. Test with dry run mode before enabling auto-sync

### Credential Migration

Your existing credentials from the original file:
```javascript
// These values need to go into Script Properties:
domain: 'gradientlearning.instructure.com'  -> CANVAS_DOMAIN
apiKey: '23860~...'                          -> CANVAS_API_KEY
courseId: '65243'                            -> GRADE_7_COURSE_ID
courseId: '65244'                            -> GRADE_8_COURSE_ID
```

---

## Troubleshooting

### "Missing Script Properties" Error
- Ensure all required properties are set in Project Settings > Script Properties
- Property names are case-sensitive

### "Dashboard sheet not found" Error
- Verify sheet names match configuration
- Check for typos or extra spaces in sheet names

### Sync Not Running
- Check if system is locked (Both Grades > Show Current Mode)
- Verify triggers are set (Both Grades > System Control > View All Triggers)
- Check execution log for errors

### Canvas API Errors
- Verify API key is valid and not expired
- Check course IDs are correct
- Ensure API key has grade write permissions

---

## File Reference

| File | Purpose |
|------|---------|
| `scripts/canvas-grade-sync.gs` | Main implementation (deploy this) |
| `scripts/sync-to-canvas.gs` | Deprecated placeholder (do not use) |
| `canvas.Grades&EmailsSync` | Original file with hardcoded creds (can be deleted after migration) |

---

## Support

For issues or questions:
1. Check the "Sync Log" sheet for error details
2. Review the Apps Script execution log
3. Run "Show Config Status" to verify configuration
