# Teacher Quick Start Guide

**Deploy a new week in ~10 minutes**

---

## Before You Start (One-Time Setup)

1. Open [Google Apps Script](https://script.google.com/)
2. Create a new project named `KAMS-Forms`
3. Copy all `.gs` files from the `shared/` folder into the project
4. Save the project

---

## Deploying a Week's Forms

### Step 1: Open the Forms Script (2 min)

1. Navigate to: `content/grade{7 or 8}/cycle{NN}/week{N}/forms.gs`
2. Copy the entire file contents
3. Paste into your Apps Script project (replace existing or add new file)

### Step 2: Run the Creation Function (2 min)

1. In Apps Script, select function: `createAllG{grade}C{cycle}W{week}Forms`
   - Example: `createAllG7C4W1Forms`
2. Click ▶️ Run
3. Authorize if prompted (first time only)
4. Wait for completion (creates 5 forms)

### Step 3: Copy Form URLs (3 min)

1. Click **Execution log** to see output
2. You'll see 5 URLs like:
   ```
   G7.C4.W1: Hook - [Title] (12 pts)
   ----------------------------------------
   Edit:  https://docs.google.com/forms/d/xxx/edit
   Embed: https://docs.google.com/forms/d/xxx/viewform?embedded=true
   ```
3. Copy each **Embed** URL

### Step 4: Configure Form Settings (3 min per form)

**In each form's Settings (⚙️):**

- [ ] Quiz mode: **ON**
- [ ] Release grade: **Immediately after submission**
- [ ] Respondent can see: **Check all boxes**
- [ ] Shuffle option order: **ON** (if desired)

### Step 5: Add to Canvas (5 min)

1. Open your Canvas course
2. Navigate to the module for this week
3. For each station's iframe in `student-page.html`:
   - Replace `{{HOOK_FORM_URL}}` with the Hook embed URL
   - Replace `{{S1_FORM_URL}}` with Station 1 embed URL
   - etc.
4. Save and publish

---

## Quick Reference: Form Points

| Station | Points | Time |
|---------|--------|------|
| Hook | 12 | ~10 min |
| Station 1 | 20 | ~18 min |
| Station 2 | 20 | ~15 min |
| Station 3 | 25 | ~20 min |
| Exit Ticket | 23 | ~15 min |
| **Total** | **100** | **~78 min** |

---

## Troubleshooting

### "Cannot read property" error
→ Make sure you copied ALL shared files (FormUtils.gs, Config.gs, etc.)

### Form doesn't appear in Canvas
→ Check the URL is the **embed** version (contains `?embedded=true`)

### Students can't submit
→ Form Settings > Collect email > Make sure "Limit to 1 response" allows **editing**

### Need to change something after deploying?
→ Edit directly in Google Forms UI. Don't re-run the script (creates duplicates).

---

## Verification Checklist

After deploying, verify:

- [ ] All 5 forms load in Canvas
- [ ] Test submit as a student account
- [ ] Points match (12 + 20 + 20 + 25 + 23 = 100)
- [ ] Quiz mode shows immediate feedback

---

## Where to Get Help

- Full setup guide: `DEPLOYMENT-CHECKLIST.md`
- Form creation rules: `framework/CONTENT-DESIGN-GUIDE.md`
- Technical issues: Check execution logs first

---

*KAMS Science | Teacher Quick Start | Version 1.0*
