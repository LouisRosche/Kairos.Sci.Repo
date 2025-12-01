\# Google Forms Apps Script API: Mandatory Constraints for Error-Free Code

\*\*Version:\*\* 1.0    
\*\*Purpose:\*\* Technical ruleset to prevent runtime errors when generating Google Forms via Apps Script    
\*\*Use Case:\*\* Copy these rules into AI prompts or developer guidelines before writing form creation code

\---

\#\# CRITICAL: Point Assignment Rules

\#\#\# ❌ NEVER DO:

\`\`\`javascript  
// ILLEGAL: Setting points to 0 \- throws "Invalid data updating form"  
item.setPoints(0);

// ILLEGAL: Setting points on paragraph text items  
form.addParagraphTextItem().setPoints(5);

// ILLEGAL: Setting points on short answer text items    
form.addTextItem().setPoints(3);

// ILLEGAL: Negative point values  
item.setPoints(-1);  
\`\`\`

\#\#\# ✅ ALWAYS DO:

\`\`\`javascript  
// CORRECT: Positive integers only (≥1) for auto-gradable items  
item.setPoints(1);  
item.setPoints(5);  
item.setPoints(10);

// CORRECT: Omit setPoints() entirely for ungraded items  
const item \= form.addMultipleChoiceItem();  
item.setTitle('Survey question');  
// No setPoints() call \= ungraded item

// CORRECT: Document manual grading in adjacent section header  
const essay \= form.addParagraphTextItem();  
essay.setTitle('Write your response');  
form.addSectionHeaderItem()  
    .setTitle('RUBRIC (Manual Grading \- 10 points)')  
    .setHelpText('Grade criteria here');  
\`\`\`

\*\*RULE 1:\*\* If \`setPoints()\` is called, value MUST be integer ≥ 1    
\*\*RULE 2:\*\* If item is ungraded, NEVER call \`setPoints()\` \- omit the method entirely    
\*\*RULE 3:\*\* Text response items (paragraph/short answer) CANNOT use \`setPoints()\`

\---

\#\# CRITICAL: Question Type Capabilities

\#\#\# Auto-Gradable Types (CAN use setPoints and setFeedback):  
\- \`addMultipleChoiceItem()\`  
\- \`addCheckboxItem()\`  
\- \`addDropdownItem()\`  
\- \`addLinearScaleItem()\`  
\- \`addMultipleChoiceGridItem()\`  
\- \`addCheckboxGridItem()\`

\#\#\# Manual-Only Types (CANNOT use setPoints or setFeedback):  
\- \`addParagraphTextItem()\`  
\- \`addTextItem()\`  
\- \`addFileUploadItem()\`

\#\#\# Non-Gradable Types:  
\- \`addSectionHeaderItem()\`  
\- \`addPageBreakItem()\`  
\- \`addImageItem()\`  
\- \`addVideoItem()\`  
\- \`addDateItem()\`  
\- \`addTimeItem()\`  
\- \`addDateTimeItem()\`  
\- \`addDurationItem()\`

\*\*RULE 4:\*\* Check item type before calling \`setPoints()\` or \`setFeedback()\` methods
\*\*RULE 5:\*\* Manual-grading items require separate documentation (section headers with rubrics)

\---

\#\# CRITICAL: Form Settings - API vs Manual UI

\#\#\# ✅ AVAILABLE VIA API:

\`\`\`javascript
// Quiz mode
form.setIsQuiz(true);

// Authentication - forces Google sign-in for verified email (no manual input)
form.setRequireLogin(true);

// Email collection
form.setCollectEmail(true);

// Response limits
form.setLimitOneResponsePerUser(true);
form.setAllowResponseEdits(true);

// UI enhancements
form.setProgressBar(true);
form.setConfirmationMessage('Your message here');
\`\`\`

\#\#\# ❌ NOT AVAILABLE VIA API (Must configure in Forms UI):

The following settings CANNOT be set programmatically and MUST be configured manually after form creation:

\`\`\`
Settings > Quizzes:
- "Release grade": Choose "Immediately after each submission" vs "Later, after manual review"
- "Respondent can see":
  - [ ] Missed questions
  - [ ] Correct answers
  - [ ] Point values

Settings > Responses:
- Shuffle question order (per-form level)
\`\`\`

\*\*RULE 5d:\*\* Always use \`setRequireLogin(true)\` for verified email collection without manual entry
\*\*RULE 5e:\*\* After form creation, manually configure quiz feedback settings in Forms UI
\*\*RULE 5f:\*\* Add code comments noting required manual UI configuration

\---

\#\# CRITICAL: Methods That DO NOT EXIST in FormApp API

\#\#\# ❌ THESE METHODS DO NOT EXIST:

\`\`\`javascript
// ILLEGAL: setShuffleOrder() does NOT exist on any item type
item.setShuffleOrder(true);  // TypeError: item.setShuffleOrder is not a function

// ILLEGAL: setRandomize() does NOT exist
item.setRandomize(true);  // TypeError: item.setRandomize is not a function

// ILLEGAL: shuffleChoices() does NOT exist
item.shuffleChoices();  // TypeError: item.shuffleChoices is not a function

// ILLEGAL: requireTextLengthGreaterThan() does NOT exist
FormApp.createParagraphTextValidation()
    .requireTextLengthGreaterThan(100);  // TypeError: not a function
\`\`\`

\#\#\# ✅ TEXT VALIDATION - CORRECT METHODS:

\`\`\`javascript
// CORRECT: Use requireTextLengthGreaterThanOrEqualTo (note: "OrEqualTo")
.setValidation(FormApp.createParagraphTextValidation()
    .requireTextLengthGreaterThanOrEqualTo(100)
    .build());

// CORRECT: Use requireTextLengthLessThanOrEqualTo
.setValidation(FormApp.createParagraphTextValidation()
    .requireTextLengthLessThanOrEqualTo(500)
    .build());
\`\`\`

\#\#\# ✅ SHUFFLE CHOICES WORKAROUND:

\`\`\`javascript
// OPTION 1: Teacher manually enables shuffle in Google Forms UI
// Forms > Settings > Presentation > Shuffle question order

// OPTION 2: Randomize choices array BEFORE creating the item
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() \* (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const choices = ['Option A', 'Option B', 'Option C'];
const shuffled = shuffleArray([...choices]);
// Then use shuffled array when creating choices
\`\`\`

\*\*RULE 5a:\*\* The Google Forms UI has shuffle options, but the Apps Script API does NOT expose them programmatically
\*\*RULE 5b:\*\* If shuffle is needed, either: (1) enable manually in Forms UI, or (2) randomize the choices array before item creation
\*\*RULE 5c:\*\* Add code comments noting where manual UI configuration is required

\---

\#\# CRITICAL: Feedback Method Usage

\#\#\# ❌ NEVER DO:

\`\`\`javascript  
// ILLEGAL: Feedback on text items (method doesn't exist)  
const paragraph \= form.addParagraphTextItem();  
paragraph.setFeedbackForCorrect(...);  // Error: method undefined

// ILLEGAL: String instead of Feedback object  
item.setFeedbackForCorrect("Just a string");  // Must be Feedback object

// ILLEGAL: Feedback without setting as quiz  
form.setIsQuiz(false);  
item.setFeedbackForCorrect(...);  // Feedback won't display  
\`\`\`

\#\#\# ✅ ALWAYS DO:

\`\`\`javascript  
// CORRECT: Feedback only on auto-gradable items  
const mc \= form.addMultipleChoiceItem();  
mc.setFeedbackForCorrect(  
    FormApp.createFeedback()  
        .setText("Your feedback text")  
        .build()  
);

// CORRECT: Enable quiz mode for feedback to display  
form.setIsQuiz(true);

// CORRECT: Use FormApp.createFeedback() builder pattern  
const feedback \= FormApp.createFeedback()  
    .setText("Feedback message")  
    .addLink("https://example.com", "Learn more")  
    .build();  
item.setFeedbackForCorrect(feedback);  
\`\`\`

\*\*RULE 6:\*\* Only call \`setFeedbackForCorrect()\` or \`setFeedbackForIncorrect()\` on auto-gradable types    
\*\*RULE 7:\*\* Always use \`FormApp.createFeedback().setText().build()\` pattern    
\*\*RULE 8:\*\* Set \`form.setIsQuiz(true)\` if using any feedback

\---

\#\# Implementation Pattern: Conditional Method Calls

\`\`\`javascript  
/\*\*  
 \* SAFE: Check before calling methods that might fail  
 \*/  
function addQuestionSafely(form, config) {  
    let item;  
      
    // Create appropriate item type  
    if (config.type \=== 'MULTIPLE\_CHOICE') {  
        item \= form.addMultipleChoiceItem();  
    } else if (config.type \=== 'PARAGRAPH') {  
        item \= form.addParagraphTextItem();  
    } else if (config.type \=== 'CHECKBOX') {  
        item \= form.addCheckboxItem();  
    }  
      
    // Universal properties (work on all types)  
    item.setTitle(config.title);  
    if (config.helpText) item.setHelpText(config.helpText);  
    if (config.required \!== undefined) item.setRequired(config.required);  
      
    // Conditional: Points only for auto-gradable types with valid values  
    const autoGradableTypes \= \['MULTIPLE\_CHOICE', 'CHECKBOX', 'DROPDOWN', 'LINEAR\_SCALE'\];  
    if (autoGradableTypes.includes(config.type) &&   
        config.points \!== undefined &&   
        config.points \> 0\) {  
        item.setPoints(config.points);  
    }  
      
    // Conditional: Feedback only for auto-gradable types  
    if (autoGradableTypes.includes(config.type)) {  
        if (config.correctFeedback) {  
            item.setFeedbackForCorrect(config.correctFeedback);  
        }  
        if (config.incorrectFeedback) {  
            item.setFeedbackForIncorrect(config.incorrectFeedback);  
        }  
    }  
      
    return item;  
}  
\`\`\`

\*\*RULE 9:\*\* Use conditional logic to check item type before calling type-specific methods    
\*\*RULE 10:\*\* Validate point values (\>0 check) before calling \`setPoints()\`

\---

\#\# Pre-Flight Validation Checklist

Before executing any form creation code, validate:

\`\`\`javascript  
function validateBeforeCreation(config) {  
    const errors \= \[\];  
      
    // Check 1: Points validation  
    if (config.points \!== undefined) {  
        if (config.points \=== 0\) {  
            errors.push('ERROR: setPoints(0) is illegal \- omit setPoints() for ungraded items');  
        }  
        if (config.points \< 0\) {  
            errors.push('ERROR: Negative points not allowed');  
        }  
        if (\['PARAGRAPH', 'TEXT', 'FILE\_UPLOAD'\].includes(config.type)) {  
            errors.push('ERROR: Cannot set points on text/file upload items');  
        }  
    }  
      
    // Check 2: Feedback validation  
    if (config.feedback) {  
        if (\['PARAGRAPH', 'TEXT', 'FILE\_UPLOAD'\].includes(config.type)) {  
            errors.push('ERROR: Cannot set feedback on text/file upload items');  
        }  
        if (typeof config.feedback \=== 'string') {  
            errors.push('ERROR: Feedback must be FormApp.createFeedback() object, not string');  
        }  
    }  
      
    // Check 3: Choices validation for choice-based items  
    if (\['MULTIPLE\_CHOICE', 'CHECKBOX', 'DROPDOWN'\].includes(config.type)) {  
        if (\!config.choices || config.choices.length \=== 0\) {  
            errors.push('ERROR: Choice-based items require at least one choice');  
        }  
    }  
      
    return {  
        valid: errors.length \=== 0,  
        errors: errors  
    };  
}  
\`\`\`

\*\*RULE 11:\*\* Validate all configurations before calling FormApp methods    
\*\*RULE 12:\*\* Throw descriptive errors during validation, not during form creation

\---

\#\# Error Handling Pattern

\`\`\`javascript  
/\*\*  
 \* DEFENSIVE: Wrap risky operations in try-catch with specific error messages  
 \*/  
function createFormWithErrorHandling() {  
    try {  
        const form \= FormApp.create('My Form');  
          
        // Step 1: Basic form config (safe operations)  
        form.setTitle('Form Title');  
        form.setDescription('Description');  
        form.setIsQuiz(true);  
          
        // Step 2: Add items with validation  
        const item \= form.addMultipleChoiceItem();  
        item.setTitle('Question 1');  
        item.setChoices(\[  
            item.createChoice('Option A', true),  
            item.createChoice('Option B', false)  
        \]);  
          
        // Step 3: Only set points if valid  
        const points \= 5;  // Must be \> 0  
        if (points \> 0\) {  
            item.setPoints(points);  
        } else {  
            Logger.log('SKIP: Points value invalid, leaving ungraded');  
        }  
          
        // Step 4: Only set feedback if item supports it  
        try {  
            item.setFeedbackForCorrect(  
                FormApp.createFeedback().setText('Correct\!').build()  
            );  
        } catch (e) {  
            Logger.log('WARN: Could not set feedback \- ' \+ e.message);  
            // Continue execution \- feedback is optional  
        }  
          
        return form;  
          
    } catch (e) {  
        Logger.log('ERROR: Form creation failed');  
        Logger.log('Message: ' \+ e.message);  
        Logger.log('Stack: ' \+ e.stack);  
        throw e;  // Re-throw for caller to handle  
    }  
}  
\`\`\`

\*\*RULE 13:\*\* Wrap \`setPoints()\` calls in validation checks    
\*\*RULE 14:\*\* Wrap \`setFeedback()\` calls in try-catch (graceful degradation)    
\*\*RULE 15:\*\* Log errors with context before re-throwing

\---

\#\# Quick Decision Tree

\`\`\`  
Is this a text response item (paragraph/short answer)?  
├─ YES → NEVER call setPoints() or setFeedback()  
│         Document grading rubric in section header  
│  
└─ NO → Is this an auto-gradable item (MC/checkbox/dropdown)?  
        ├─ YES → Can use setPoints() and setFeedback()  
        │         ├─ Points value \> 0? → Use setPoints(value)  
        │         ├─ Points value \= 0? → DON'T call setPoints()  
        │         └─ No points needed? → DON'T call setPoints()  
        │  
        └─ NO → Neither points nor feedback supported  
                (section headers, page breaks, media items)  
\`\`\`

\---

\#\# Testing Strategy for AI-Generated Code

\`\`\`javascript  
/\*\*  
 \* RUN THIS FIRST: Test all patterns before deploying  
 \*/  
function testAllPatterns() {  
    Logger.log('=== Testing Form Creation Patterns \===');  
      
    // Test 1: Multiple choice with points (should work)  
    try {  
        const form1 \= FormApp.create('TEST: MC with points');  
        const item1 \= form1.addMultipleChoiceItem();  
        item1.setTitle('Test Question');  
        item1.setChoices(\[item1.createChoice('A', true)\]);  
        item1.setPoints(5);  
        DriveApp.getFileById(form1.getId()).setTrashed(true);  
        Logger.log('✓ Test 1 passed: MC with points');  
    } catch (e) {  
        Logger.log('✗ Test 1 FAILED: ' \+ e.message);  
    }  
      
    // Test 2: Points \= 0 (should fail)  
    try {  
        const form2 \= FormApp.create('TEST: Zero points');  
        const item2 \= form2.addMultipleChoiceItem();  
        item2.setTitle('Test');  
        item2.setChoices(\[item2.createChoice('A', true)\]);  
        item2.setPoints(0);  // This should throw error  
        DriveApp.getFileById(form2.getId()).setTrashed(true);  
        Logger.log('✗ Test 2 FAILED: Should have thrown error for 0 points');  
    } catch (e) {  
        if (e.message.includes('Invalid data')) {  
            Logger.log('✓ Test 2 passed: Correctly rejected 0 points');  
        } else {  
            Logger.log('✗ Test 2 FAILED: Wrong error \- ' \+ e.message);  
        }  
    }  
      
    // Test 3: Paragraph with points (should fail)  
    try {  
        const form3 \= FormApp.create('TEST: Paragraph with points');  
        const item3 \= form3.addParagraphTextItem();  
        item3.setTitle('Test');  
        item3.setPoints(10);  // This should throw error  
        DriveApp.getFileById(form3.getId()).setTrashed(true);  
        Logger.log('✗ Test 3 FAILED: Should have thrown error for paragraph points');  
    } catch (e) {  
        if (e.message.includes('Invalid data')) {  
            Logger.log('✓ Test 3 passed: Correctly rejected paragraph points');  
        } else {  
            Logger.log('✗ Test 3 FAILED: Wrong error \- ' \+ e.message);  
        }  
    }  
      
    // Test 4: Ungraded item (no setPoints call)  
    try {  
        const form4 \= FormApp.create('TEST: Ungraded');  
        const item4 \= form4.addMultipleChoiceItem();  
        item4.setTitle('Survey Question');  
        item4.setChoices(\[item4.createChoice('A')\]);  
        // No setPoints() call  
        DriveApp.getFileById(form4.getId()).setTrashed(true);  
        Logger.log('✓ Test 4 passed: Ungraded item');  
    } catch (e) {  
        Logger.log('✗ Test 4 FAILED: ' \+ e.message);  
    }  
      
    Logger.log('=== Testing Complete \===');  
}  
\`\`\`

\*\*RULE 16:\*\* Test edge cases before deploying generated code    
\*\*RULE 17:\*\* Verify error handling works as expected    
\*\*RULE 18:\*\* Clean up test forms (set trashed) to avoid clutter

\---

\#\# Summary: The 9 Non-Negotiable Rules

\`\`\`
1\. NEVER call setPoints(0) \- omit setPoints() instead
2\. NEVER call setPoints() on paragraph/text items
3\. NEVER call setFeedback() on paragraph/text items
4\. ALWAYS validate points \> 0 before calling setPoints()
5\. ALWAYS use FormApp.createFeedback().build() pattern for feedback
6\. NEVER use setShuffleOrder() \- it does NOT exist in the API (use Forms UI instead)
7\. ALWAYS use setRequireLogin(true) for verified email without manual entry
8\. ALWAYS document manual UI config required (grade release, feedback visibility)
9\. NEVER use requireTextLengthGreaterThan() \- use requireTextLengthGreaterThanOrEqualTo() instead
\`\`\`

\---

\#\# Copy-Paste Template for AI Prompts

\`\`\`
When generating Google Forms Apps Script code, STRICTLY follow these rules:

1\. Check item type before using setPoints() or setFeedback() methods
2\. Only auto-gradable items (multiple choice, checkbox, dropdown, linear scale, grids) support setPoints() and setFeedback()
3\. Paragraph text items and short answer items CANNOT use setPoints() or setFeedback()
4\. Point values must be positive integers (≥1) \- NEVER use setPoints(0)
5\. For ungraded items, omit setPoints() entirely \- don't call it with 0
6\. Always use FormApp.createFeedback().setText().build() pattern for feedback
7\. Validate all configurations before calling FormApp methods
8\. Use try-catch around setFeedback() calls for graceful degradation
9\. Document manual grading rubrics in adjacent section headers
10\. Set form.setIsQuiz(true) if using any feedback features
11\. NEVER use setShuffleOrder() \- this method does NOT exist in the FormApp API
12\. For shuffle functionality: either enable in Forms UI manually, or randomize choices array before creating item

Test pattern before deployment:
\- Verify auto-gradable items work with setPoints(5)
\- Verify text items work WITHOUT setPoints()
\- Verify validation catches setPoints(0) before runtime
\- Verify NO calls to setShuffleOrder(), setRandomize(), or shuffleChoices()
\- Verify setRequireLogin(true) is present for verified email collection
\- After deployment: manually configure quiz feedback in Forms UI
\`\`\`

\---

\#\# Version History

| Version | Date | Change |
|---------|------|--------|
| 1.0 | 2025-11-04 | Initial documentation from systematic debugging |
| 1.1 | 2025-12-01 | Added CRITICAL section: Methods that DO NOT EXIST (setShuffleOrder, setRandomize, shuffleChoices). Added Rules 5a-5c, 11-12. Updated summary to 6 rules. |
| 1.2 | 2025-12-01 | Added CRITICAL section: Form Settings API vs Manual UI. Documented setRequireLogin(true) for verified email. Added Rules 5d-5f, 7-8. Updated summary to 8 rules. |
| 1.3 | 2025-12-01 | Added requireTextLengthGreaterThan() to non-existent methods. Correct method is requireTextLengthGreaterThanOrEqualTo(). Added Rule 9. Updated summary to 9 rules. |
| 1.4 | 2025-12-01 | Added Hierarchical Audit findings. Cross-pollination best practices for G7/G8. Psychometric guidelines for sensitivity, specificity, and rubric precision. |

\---

\#\# Hierarchical Audit: Cross-Pollination Best Practices

The following practices were identified through a comprehensive audit of G7 and G8 form scripts and should be applied consistently across all future forms.

\#\#\# Assessment Architecture Summary

| Dimension | G7 (Greenhouse) | G8 (Cheetah-Gazelle) | Best Practice |
|-----------|-----------------|---------------------|---------------|
| Auto:Manual Ratio | 5:10 (33%) | 4:17 (19%) | Target 30-40% for balance |
| Question Types | MCQ, checkbox, scale, paragraph | MCQ, checkbox, scale, paragraph, short text | Use variety for accessibility |
| Cognitive Demand | Recall 20%, Apply 45%, Analyze 35% | Recall 15%, Apply 50%, Analyze 35% | Balance across levels |
| Point Weighting | Station 3 highest (25 pts) | Station 3 highest (25 pts) | Highest points for synthesis |

\#\#\# Psychometric Best Practices

\*\*SENSITIVITY (detecting learning gains):\*\*
\`\`\`
HIGH sensitivity:
- Open calculations with rubric tiers (G8 Station 1 Q3-Q4)
- Multi-step calculations with work shown
- Paragraph responses with graduated rubrics

MODERATE sensitivity:
- Checkbox with 4+ options and partial credit rubric

LOW sensitivity:
- Binary MCQ with no partial credit (G7 Hook Q4)
→ For key concepts, prefer open-response with graduated rubrics
\`\`\`

\*\*SPECIFICITY (distinguishing misconceptions):\*\*
\`\`\`
G7 Misconception Targets:
- "Bonds break when absorbing IR" → Station 1 Q2, Q4
- "Carbon is destroyed" → Station 2 Q3, Q4

G8 Misconception Targets:
- "Bigger = more force" → Station 1 Q2, Exit Q2
- "Individuals evolve" (Lamarckian) → Station 2 Q5 (auto-graded MCQ)

BEST PRACTICE: Include explicit misconception distractors in MCQs
Use setFeedbackForIncorrect() to address the specific error
\`\`\`

\*\*RUBRIC PRECISION:\*\*
\`\`\`
❌ AVOID subjective language:
- "Clear explanation"
- "Vague response"
- "Good understanding"

✅ USE observable behaviors:
- "Uses [KEY_TERM_1] AND [KEY_TERM_2]"
- "Explains mechanism connecting X to Y"
- "Includes numerical calculation with units"

RUBRIC PATTERN:
5 pts: [Correct elements] + [Mechanism explained] + [Connection made]
4 pts: [Correct elements] + [Mechanism OR connection]
3 pts: [Correct elements] without mechanism
2 pts: [Partial elements] without scientific vocabulary
1 pt: [Attempt] with major misconceptions
0 pts: No response or completely irrelevant
\`\`\`

\#\#\# Implemented Cross-Pollination Features

\*\*From G8 → G7:\*\*
- setRequireLogin(true) for verified email ✓
- Character validation on paragraph items (minimum length)
- Consistent calculation threading (F=ma pattern to emulate)

\*\*From G7 → G8:\*\*
- Explicit misconception targeting with distractors
- Detailed feedback for incorrect answers
- Strong vocabulary scaffolding in help text

\*\*Both Scripts Now Include:\*\*
1. \*\*SEP-1 Question Generator:\*\* Exit Ticket Q6 - students generate HOW/WHY questions
2. \*\*0-Point Confidence Diagnostics:\*\* No grade inflation, labeled "FOR REFLECTION ONLY"
3. \*\*Lamarckian Misconception Check:\*\* G8 Station 2 Q5 (auto-graded with detailed feedback)
4. \*\*Standardized Rubrics:\*\* Observable behaviors, graduated descriptors (5/4/3/2/1/0)
5. \*\*Spiral Integration Labels:\*\* Explicit "SPIRAL - Cycle 2" tags on review questions

\#\#\# Point Allocation After Cross-Pollination

\*\*G7 Final Totals (100 pts):\*\*
\`\`\`
Hook:        12 pts (confidence → 0-pt diagnostic, -3 from original 15)
Station 1:   20 pts (unchanged)
Station 2:   20 pts (unchanged)
Station 3:   25 pts (unchanged)
Exit Ticket: 23 pts (SEP-1 question generator added, +3)
TOTAL:      100 pts ✓
\`\`\`

\*\*G8 Final Totals (100 pts):\*\*
\`\`\`
Hook:        12 pts (confidence → 0-pt diagnostic, -3 from original 15)
Station 1:   20 pts (unchanged)
Station 2:   21 pts (Lamarckian MCQ +4, prediction reduced -3)
Station 3:   25 pts (unchanged)
Exit Ticket: 22 pts (SEP-1 +3, Integration reduced -1)
TOTAL:      100 pts ✓
\`\`\`

\#\#\# Exit Ticket Structure (Both Grades)

\`\`\`
Questions 1-2: NEW content (Cycle 3)
Questions 3-4: SPIRAL content (Cycle 2)
Question 5:   INTEGRATION (connects both cycles)
Question 6:   SEP-1 Question Generator (2 HOW/WHY questions)

Rubric for Q6 (SEP-1):
3 pts: 2 testable HOW/WHY questions with specific variables
2 pts: 2 questions, at least 1 testable
1 pt: 1 question OR yes/no style questions
0 pts: No response
\`\`\`

\#\#\# Future Improvements Noted (Not Yet Implemented)

1. \*\*G7 Station Reordering:\*\* Station 2 (carbon cycle) disrupts energy thread from Station 1. Consider swapping Station 2 and Station 3 for better conceptual flow.

2. \*\*Numerical Validation:\*\* Add \`requireTextMatchesPattern('.*[0-9].*')\` to all calculation items to ensure students include numbers.

3. \*\*Partial Credit for Checkboxes:\*\* Current checkbox grading is all-or-nothing. Consider converting key checkboxes to manual grading with graduated rubrics.

4. \*\*Enhanced Feedback Pattern:\*\*
\`\`\`javascript
// Pattern for rich feedback
correct: "✓ [Why correct] | NEXT STEP: [Preview next concept]"
incorrect: "✗ [Common error] | KEY CONCEPT: [Correct info] | TRY THIS: [Remediation]"
\`\`\`

\---

\*\*This document contains the MINIMUM REQUIRED KNOWLEDGE to generate error-free Google Forms via Apps Script.\*\*

Copy the rules into your AI prompt or development checklist before generating any form creation code.

