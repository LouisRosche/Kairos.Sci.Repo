# KAMS Science Content Design Guide
## Single Source of Truth for Curriculum Development
## Version 3.0 | December 2025

> **Research Reference:** For consolidated effect sizes and citations, see [docs/research-evidence.md](../docs/research-evidence.md) - the single source of truth for all research evidence.

---

## Purpose

This document aggregates ALL learnings from curriculum development across G7 and G8, Cycles 2-10, grounded in the *Scholarly Foundations for NGSS-Aligned Middle School Science Curriculum Development* research synthesis. Every design principle is backed by empirical evidence with documented effect sizes.

**Use this guide when:**
- Creating new cycle/week content
- Auditing existing content
- Training new curriculum developers
- Troubleshooting assessment issues

---

## Materials Policy: Digital-First Requirement

> **CRITICAL:** All instructional materials must be digital-hosted in this repository. The ONLY permitted physical material is **one 3×5 or 4×6 notecard per student per class period**.

**Rationale (Research-Backed):**
- Digital science notebooks produce **γ = 0.34** learning improvement regardless of reading/writing proficiency (Rappolt-Schlichtmann et al., 2013)
- Virtual labs produce **g = 0.686** for positive learning outcomes (2024 PLOS ONE meta-analysis)
- Ensures 100% asynchronous accessibility for absent/remote learners
- Enables UDL supports: text-to-speech, adjustable fonts, embedded scaffolding
- Enables data-driven MTSS monitoring through digital assessment

**What This Means for Content Development:**
- NO lab activities requiring physical materials beyond a notecard
- All simulations, visuals, and resources embedded in student pages
- Async alternatives REQUIRED for any referenced physical demonstrations
- PhET simulations or custom HTML5 simulations for all hands-on concepts

---

## Table of Contents

1. [Proven Patterns](#1-proven-patterns-what-works)
2. [Anti-Patterns](#2-anti-patterns-what-doesnt-work)
3. [Content Architecture](#3-content-architecture)
4. [Assessment Design](#4-assessment-design)
5. [Form Generation Rules](#5-form-generation-rules-google-apps-script)
6. [HTML Student Pages](#6-html-student-pages)
7. [Simulations](#7-interactive-simulations)
8. [Scaffolding & Differentiation](#8-scaffolding--differentiation)
9. [Quality Checklist](#9-pre-deployment-checklist)
10. [Version History](#10-version-history)

---

## 1. Proven Patterns (What Works) — Evidence-Based

### 1.1 Phenomenon-Driven Instruction

**Pattern:** Start every week with an engaging, real-world phenomenon that creates cognitive dissonance.

**Research Foundation:** Reiser et al. (2021) established that anchoring phenomena must drive authentic student questioning—not serve as mere "hooks." Lowell, Cherbow, & McNeill (2021) found many curricula "relabel" rather than "redesign"—phenomena must require all three NGSS dimensions to explain.

```
EFFECTIVE PHENOMENA (meet all criteria):
- G8.C3.W1: "If cheetahs are the fastest land animal, why haven't gazelles gone extinct?"
- G8.C3.W2: "Why do whale flippers have finger bones?"
- G7.C3.W1: "Why does a car get hot inside but not outside?"
- G7.C3.W2: "Why might melting ice cause MORE melting?"

PHENOMENON CRITERIA:
✓ Requires all three dimensions (SEP-DCI-CCC) to explain
✓ Observable and puzzling to students
✓ Connects to students' lived experiences
✓ Sustains investigation across a full week/unit

WHY IT WORKS:
- Creates genuine curiosity (SEP-1)
- Provides anchor for all subsequent learning
- Makes abstract concepts concrete
- Students remember the phenomenon long after facts fade
- CCCs serve as entry points for historically marginalized students (Lee et al., 2014)
```

### 1.2 Strategic Interleaving (Spiral Curriculum)

**Pattern:** Every Exit Ticket includes 2 spiral questions from previous cycles + 1 integration question connecting old and new.

**Research Foundation (Effect Sizes):**
- **Interleaved vs. blocked practice: d = 0.83** (Rohrer et al., 2020 RCT with 787 7th graders)
- **Retrieval practice vs. restudy: g = 0.50-0.61** (Rowland, 2014; Adesope, 2017)
- **Optimal spacing: 10-20% of desired retention interval** (Cepeda et al., 2008)
- For semester-long retention (4-5 months), revisit concepts every 2-3 weeks

```
EXIT TICKET STRUCTURE:
Q1-Q2: NEW content (current week)
Q3-Q4: SPIRAL content (previous cycle, 2-3 weeks prior)
Q5: INTEGRATION (requires both — builds discrimination)
Q6: SEP-1 Question Generator (student-generated HOW/WHY)

TARGET SUCCESS RATE: 50-80% (Yang et al., 2021)
- If above 80%, increase difficulty
- If below 50%, add scaffolding

WHY IT WORKS:
- Retrieval practice > re-study: d = 0.50-0.61
- Interleaving forces discrimination: d = 0.83
- Integration reveals transfer capabilities
- Mixed test formats produce strongest effects (Adesope et al., 2017)
- Overt retrieval (writing) > covert (mental) for adolescents (2025 study)
```

### 1.3 Misconception Targeting

**Pattern:** Explicitly identify common misconceptions, create "trap" distractors, and provide corrective feedback using refutational text structure.

**Research Foundation:**
- **Refutational text: g = 0.41** (Schroeder & Kucera, 2022; Danielson et al., 2025)
- Three frameworks explain persistent misconceptions:
  - **Chi's Ontological Categories:** Students miscategorize processes as matter (heat as substance)
  - **diSessa's P-prims:** Intuitions like "closer is stronger" misapplied
  - **Vosniadou's Framework Theory:** "Synthetic models" form through incompatible assimilation
- **Two-tier diagnostic tests** (Treagust, 1986) combine content + reasoning tiers

```
EFFECTIVE MISCONCEPTION DESIGN:

1. IDENTIFY: Research or pre-test to find common errors
   - G8: "Individuals evolve" (Lamarckian) - 45% frequency
   - G7: "Breaking bonds releases energy" - 60% frequency (ontological error)
   - G7: "Summer = Earth closer to Sun" - 40% frequency (p-prim misapplication)

2. TRAP: Create MCQ distractors that embody the misconception (Gierl et al., 2017)
   .createChoice('The whale evolved its flippers by swimming more', false)
   // This IS what students believe; catching it triggers remediation

3. FEEDBACK: Use REFUTATIONAL TEXT structure (g = 0.41):
   a) State the misconception explicitly
   b) Directly refute it
   c) Provide the correct scientific explanation
   d) Connect to evidence

   Example: "Many people think individual organisms evolve—this is incorrect.
   Individual organisms do NOT change during their lifetime. POPULATIONS change
   over generations because individuals with certain traits survive and reproduce
   more. The whale's ancestor with slightly better swimming limbs had more offspring."

4. BRIDGING ANALOGIES (Clement, 1993): For difficult conceptual shifts, build
   from anchoring intuitions through intermediate cases to target concept
   - Example: Tables exert force → springs → flexible boards → rigid surfaces

5. REPEAT: Spiral the same misconception in later weeks/cycles
```

### 1.4 Tiered Support (Progressive Disclosure)

**Pattern:** Use collapsible `<details>` elements to provide support without overwhelming advanced learners.

**Research Foundation:**
- **Sustained scaffolding (g = 0.46):** Contrary to assumptions, students need scaffolding longer than anticipated (Belland et al., 2017)
- **Backward fading:** Remove support from END of procedures first, not beginning (Renkl & Atkinson, 2003)
- **Working memory limit:** 4-7 elements max (Sweller, 1988)

```html
<!-- EFFECTIVE TIERED SUPPORT -->
<details class="tier2-support">
  <summary>Need a hint? Click here</summary>
  <p><strong>Hint 1:</strong> Homologous means "same structure"</p>
  <p><strong>Word Bank:</strong> common ancestor, natural selection, population</p>
</details>

<details class="tier3-support">
  <summary>Need more help? Step-by-step guide</summary>
  <ol>
    <li>First, look at the bone diagram</li>
    <li>Count: How many main arm bones does each animal have?</li>
    <li>If they're the same, they might share an ancestor</li>
  </ol>
</details>
```

### 1.5 Sentence Starters for Open Response

**Pattern:** Provide sentence starters in form helpText to reduce cognitive load and support ELL students.

```
SENTENCE STARTERS (choose one):
• "The evidence suggests... because..."
• "This supports the idea that... because..."
• "Based on the pattern, I predict... because..."

WHY IT WORKS:
- Reduces cognitive load for struggling writers
- Scaffolds scientific argumentation structure
- Supports ELL students with academic language
- Maintains rigor while increasing accessibility
```

### 1.6 0-Point Confidence Diagnostics

**Pattern:** Include ungraded confidence scales to detect overconfidence and provide MTSS data without grade inflation.

```javascript
// EFFECTIVE CONFIDENCE DIAGNOSTIC
form.addLinearScaleItem()
  .setTitle('How confident are you in your understanding of common ancestry?')
  .setHelpText('FOR REFLECTION ONLY - This is not graded')
  .setRequired(false)
  .setBounds(1, 5)
  .setLeftLabel('Very unsure')
  .setRightLabel('Very confident');
// Note: NO setPoints() call - ungraded by design
```

### 1.7 Worked Examples with Annotation

**Pattern:** Show exemplar responses with explicit annotation of what makes them strong.

```html
<div class="worked-example">
  <p><strong>WORKED EXAMPLE:</strong></p>
  <blockquote>
    "Whales probably evolved from land mammals that had arms with fingers.
    <span class="annotation">[claim]</span>
    Over millions of years, natural selection favored individuals with limbs
    better suited for swimming.
    <span class="annotation">[mechanism]</span>
    The basic bone pattern was passed down from the land-dwelling ancestor.
    <span class="annotation">[evidence connection]</span>"
  </blockquote>
  <p><em>Notice: claim → mechanism → evidence connection</em></p>
</div>
```

---

## 2. Anti-Patterns (What Doesn't Work)

### 2.1 NEVER: Set Points to Zero

```javascript
// ILLEGAL - Throws "Invalid data updating form"
item.setPoints(0);

// CORRECT - Omit setPoints() entirely for ungraded items
// (No setPoints call)
```

### 2.2 NEVER: Use Subjective Rubric Language

```
BAD RUBRIC:
- 4 pts: "Excellent understanding"
- 3 pts: "Good response"
- 2 pts: "Vague explanation"

GOOD RUBRIC:
- 4 pts: Uses [TERM_1] AND [TERM_2] + explains mechanism + cites evidence
- 3 pts: Uses [TERM_1] OR [TERM_2] + explains mechanism
- 2 pts: Correct conclusion without mechanism
- 1 pt: Attempt with misconception present
- 0 pts: No response or irrelevant
```

### 2.3 NEVER: Use Lamarckian Language in Content

```
BAD (Lamarckian):
"Whales evolved flippers because they needed to swim"
"The population adapted to become better swimmers"

GOOD (Darwinian):
"Whale ancestors with limbs better suited for swimming survived and reproduced more"
"The population changed over generations as individuals with flipper-like limbs left more offspring"
```

### 2.4 NEVER: Create Lab-Only Content Without Async Alternatives

```
BAD:
"Station 1: Use the heat lamp to measure temperature changes"
(Students at home cannot complete this)

GOOD:
"Station 1: Use the heat lamp to measure temperature changes

🏠 COMPLETING THIS AT HOME?
Use this simulation instead: [PhET Link]
OR use this pre-recorded data:
| Surface | Start Temp | End Temp | Change |
|---------|------------|----------|--------|
| Black   | 22°C       | 38°C     | +16°C  |"
```

### 2.5 NEVER: Call Non-Existent API Methods

```javascript
// THESE METHODS DO NOT EXIST:
item.setShuffleOrder(true);      // TypeError
item.setRandomize(true);         // TypeError
item.shuffleChoices();           // TypeError
FormApp.createParagraphTextValidation()
    .requireTextLengthGreaterThan(100);  // Use ...OrEqualTo instead
```

### 2.6 NEVER: Skip Cross-File Alignment Verification

```
COMMON ALIGNMENT ERRORS:
- forms.gs has 5 questions, config says 6
- student-page.html shows 20 pts, forms.gs has 25 pts
- lesson-plan.md has different station titles

ALWAYS VERIFY:
1. Point totals match across ALL files (100 pts total)
2. Question counts match config
3. Station titles are consistent
4. NGSS standards are correctly cited
```

### 2.7 NEVER: Omit MTSS Data Points

```
BAD: Assessment with no MTSS hooks
(No way to identify struggling students or misconceptions)

GOOD: Every assessment includes:
1. Auto-graded misconception check (flagged distractor)
2. Confidence scale (overconfidence detection)
3. Open response with graduated rubric
4. Clear tier thresholds: 70%+ Tier 1, 50-69% Tier 2, <50% Tier 3
```

---

## 3. Content Architecture

### 3.1 Required Files per Week

```
content/grade{7,8}/cycle{03-10}/week{1-3}/
├── forms.gs              # Google Apps Script for all 5 forms
├── student-page.html     # Canvas-embeddable HTML page
├── lesson-plan.md        # Teacher implementation guide
└── simulations/          # Optional: Interactive HTML tools
    ├── {simulation-1}.html
    └── {simulation-2}.html
```

### 3.2 Point Distribution (100 pts/week)

| Component | Points | Questions | Time | Focus |
|-----------|--------|-----------|------|-------|
| Hook | 12 | 5 | 10 min | Phenomenon intro, prior knowledge |
| Station 1 | 20 | 5-6 | 18 min | Core concept, misconception targeting |
| Station 2 | 20 | 5 | 15 min | Evidence/data analysis, application |
| Station 3 | 25 | 5 | 20 min | Design challenge, highest synthesis |
| Exit Ticket | 23 | 6 | 15 min | Integration, spiral, SEP-1 |
| **TOTAL** | **100** | **26-27** | **~78 min** | |

### 3.3 Naming Conventions

```
FORMS:
G{grade}.C{cycle}.W{week}: {Station} - {Title}
Example: G8.C3.W2: Hook - The Whale Finger Mystery

QUESTION IDs:
g{grade}_c{cycle}_w{week}_{station}_q{number}
Example: g8_c3_w2_s1_q3

FILES:
lowercase-hyphenated.{ext}
Example: student-page.html, lesson-plan.md
```

---

## 4. Assessment Design

### 4.1 Question Type Distribution

| Type | Target % | Best For |
|------|----------|----------|
| Multiple Choice | 20-25% | Misconception checks, quick recall |
| Checkbox | 10-15% | Multi-select identification |
| Paragraph | 40-50% | Explanations, evidence integration |
| Linear Scale | 5-10% | Confidence, self-assessment |
| Short Text | 10-15% | Calculations, brief answers |

### 4.2 Bloom's Taxonomy Distribution

| Level | Target % | Question Stems |
|-------|----------|----------------|
| Remember | 10-15% | List, define, identify |
| Understand | 15-20% | Explain, describe, compare |
| Apply | 30-35% | Calculate, demonstrate, use |
| Analyze | 25-30% | Differentiate, examine, pattern |
| Evaluate | 5-10% | Judge, critique, support |
| Create | 5-10% | Design, construct, predict |

### 4.3 Auto-Graded vs Manual Grading

**Target: 30-40% auto-graded**

```
AUTO-GRADABLE (use setPoints):
- Multiple choice
- Checkbox
- Dropdown
- Linear scale
- Multiple choice grid

MANUAL GRADING (no setPoints):
- Paragraph text
- Short answer text
- File upload

DOCUMENT MANUAL RUBRICS:
Add section header with rubric before each paragraph item
```

### 4.4 Rubric Template

```
QUESTION: [Open response question]
POINTS: X pts | MANUAL GRADING

RUBRIC:
X pts: [All required elements] + [mechanism explained] + [evidence cited]
X-1 pts: [Required elements] + [mechanism OR evidence]
X-2 pts: [Partial elements] without mechanism
X-3 pts: [Attempt] with misconception present
0 pts: No response or completely irrelevant

LOOK FOR:
- Key term 1: [term]
- Key term 2: [term]
- Mechanism: [what connects cause to effect]
- Evidence: [specific data, observation, or example]

RED FLAGS (misconceptions):
- [Lamarckian language]
- [Confusion of terms]
```

---

## 5. Form Generation Rules (Google Apps Script)

### 5.1 Mandatory Rules

```
RULE 1: setPoints(value) → value MUST be integer ≥ 1
RULE 2: NEVER call setPoints() on paragraph/text items
RULE 3: NEVER call setFeedback() on paragraph/text items
RULE 4: ALWAYS use FormApp.createFeedback().setText().build() pattern
RULE 5: Set form.setIsQuiz(true) for any feedback
RULE 6: Use setRequireLogin(true) for verified email
RULE 7: NEVER use setShuffleOrder() - it doesn't exist
RULE 8: Character validation: requireTextLengthGreaterThanOrEqualTo()
RULE 9: After creation, manually configure quiz feedback in Forms UI
```

### 5.2 Standard Form Header

```javascript
function createHookForm() {
  const form = FormApp.create('G8.C3.W2: Hook - The Whale Finger Mystery');

  // Required settings
  form.setIsQuiz(true);
  form.setRequireLogin(true);  // Verified email, no manual entry
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage('Your responses have been recorded. Great scientific thinking!');

  form.setDescription(`
⏱️ TIME: ~10 minutes | 📊 POINTS: 12

📋 INSTRUCTIONS:
1. Answer each question carefully
2. Use complete sentences for written responses
3. Your work saves automatically
4. Click SUBMIT when finished
  `);

  // Form content here...
}
```

### 5.3 Safe Question Adding Pattern

```javascript
function addQuestion(form, config) {
  let item;

  // Create appropriate type
  switch(config.type) {
    case 'MULTIPLE_CHOICE':
      item = form.addMultipleChoiceItem();
      break;
    case 'PARAGRAPH':
      item = form.addParagraphTextItem();
      break;
    case 'CHECKBOX':
      item = form.addCheckboxItem();
      break;
    case 'SCALE':
      item = form.addLinearScaleItem();
      break;
  }

  // Universal properties
  item.setTitle(config.title);
  if (config.helpText) item.setHelpText(config.helpText);
  if (config.required !== undefined) item.setRequired(config.required);

  // Points ONLY for auto-gradable types with valid value
  const autoGradable = ['MULTIPLE_CHOICE', 'CHECKBOX', 'DROPDOWN', 'SCALE'];
  if (autoGradable.includes(config.type) && config.points > 0) {
    item.setPoints(config.points);
  }

  // Feedback ONLY for auto-gradable types
  if (autoGradable.includes(config.type) && config.correctFeedback) {
    item.setFeedbackForCorrect(
      FormApp.createFeedback().setText(config.correctFeedback).build()
    );
    item.setFeedbackForIncorrect(
      FormApp.createFeedback().setText(config.incorrectFeedback).build()
    );
  }

  return item;
}
```

---

## 6. HTML Student Pages

### 6.1 Required Components

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>G8.C3.W2: Evidence of Evolution</title>
</head>
<body>
  <!-- 1. Skip link for accessibility -->
  <a href="#main-content" class="skip-link">Skip to main content</a>

  <!-- 2. Header with standards -->
  <header role="banner">
    <h1>Week 2: Evidence of Evolution</h1>
    <p>MS-LS4-2 & MS-LS4-4 | 100 Points Total | ~75 Minutes</p>
  </header>

  <!-- 3. Quick navigation -->
  <nav role="navigation" aria-label="Station navigation">
    <a href="#hook">Hook (12 pts)</a>
    <a href="#station1">Station 1 (20 pts)</a>
    <!-- etc -->
  </nav>

  <!-- 4. Accessibility tip -->
  <aside class="accessibility-tip">
    <strong>Need text read aloud?</strong>
    Chrome: Right-click → "Read aloud"
  </aside>

  <!-- 5. Learning targets -->
  <section id="learning-targets">
    <h2>What You'll Learn</h2>
    <ul>
      <li>I can identify homologous structures as evidence of common ancestry</li>
      <!-- etc -->
    </ul>
  </section>

  <!-- 6. Vocabulary table -->
  <section id="vocabulary">
    <h2>Key Terms</h2>
    <table>
      <tr><th>Term</th><th>Definition</th><th>Example</th></tr>
      <!-- etc -->
    </table>
  </section>

  <!-- 7. Station sections with forms -->
  <main id="main-content">
    <section id="hook">
      <h2>Hook: The Whale Finger Mystery</h2>
      <iframe src="GOOGLE_FORM_URL" height="800"></iframe>
    </section>
    <!-- etc -->
  </main>

  <!-- 8. Resources section -->
  <section id="resources">
    <h2>Additional Resources</h2>
    <!-- Simulations, videos, etc -->
  </section>

  <!-- 9. Self-assessment -->
  <section id="self-check">
    <h2>Check Your Understanding</h2>
    <details>
      <summary>Can I explain the difference between homologous and analogous structures?</summary>
      <p>Review: Homologous = same structure, different function...</p>
    </details>
  </section>
</body>
</html>
```

### 6.2 Required CSS Patterns

```css
/* Accessibility: Skip link */
.skip-link {
  position: absolute;
  left: -9999px;
}
.skip-link:focus {
  position: static;
  background: #000;
  color: #fff;
  padding: 10px;
}

/* Responsive fonts */
h1 { font-size: clamp(1.5rem, 5vw, 2.5rem); }
p { font-size: clamp(0.9rem, 2vw, 1.1rem); }

/* Tiered support */
details.tier2-support {
  background: #F0FFF4;
  border-left: 4px solid #48BB78;
  padding: 15px;
  margin: 10px 0;
}

details.tier3-support {
  background: #FED7D7;
  border-left: 4px solid #F56565;
  padding: 15px;
  margin: 10px 0;
}

/* Touch targets (min 48px) */
a, button, summary {
  min-height: 48px;
  min-width: 48px;
  padding: 12px 20px;
}

/* Print styles */
@media print {
  nav, iframe, .no-print { display: none; }
  body { font-size: 12pt; }
}
```

---

## 7. Interactive Simulations

### Research Foundation

Virtual labs produce **g = 0.686** for positive learning outcomes (2024 PLOS ONE meta-analysis), with particularly strong effects for motivation (**g = 3.571**) and engagement (**g = 2.888**). Finkelstein et al. (2005) found PhET simulations **outperform** real equipment on conceptual understanding.

**Critical finding on guidance:** Chamberlain et al. (2014) showed:
- **Light guidance:** 85% feature exploration, better retention at 1 week
- **Heavy guidance:** Only 9% feature exploration

**Implication:** Use driving questions, NOT step-by-step instructions.

### 7.1 When to Create Simulations

```
CREATE A SIMULATION WHEN:
✓ Concept is highly visual (bone structures, fossil sequences)
✓ Students need to manipulate/explore (not just observe)
✓ Multiple "what if" scenarios enhance understanding
✓ Existing PhET/external sims don't fit your phenomenon
✓ Physical lab is impossible in digital-first environment

DON'T CREATE A SIMULATION WHEN:
✗ A video demonstration suffices
✗ A static diagram is clear enough
✗ An existing simulation covers the content
✗ Development time exceeds learning benefit

REMEMBER: All materials must be digital-hosted (notecard-only physical materials policy)
```

### 7.2 Required Simulation Features

```html
<!-- Every simulation MUST include: -->

<!-- 1. Clear instructions -->
<details id="instructions">
  <summary>How to Use This Simulation</summary>
  <ol>
    <li>Step one...</li>
    <li>Step two...</li>
  </ol>
</details>

<!-- 2. Key concepts section -->
<section id="key-concepts">
  <h2>Key Concepts</h2>
  <p>This simulation demonstrates...</p>
</section>

<!-- 3. Reset button -->
<button onclick="reset()">Reset Simulation</button>

<!-- 4. Mobile-responsive design -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- 5. Accessibility: Keyboard navigation -->
<script>
  // All interactive elements must be keyboard-accessible
  document.addEventListener('keydown', handleKeyboard);
</script>

<!-- 6. NO external dependencies -->
<!-- All CSS and JS should be inline or local -->
```

---

## 8. Scaffolding & Differentiation

### 8.1 UDL Implementation Matrix

| Principle | Implementation |
|-----------|----------------|
| **Multiple Means of Engagement** | Choice in expression (written/drawn/verbal), real-world phenomena, self-assessment |
| **Multiple Means of Representation** | Text + visuals + video, vocabulary support, worked examples |
| **Multiple Means of Action/Expression** | Typed + drawn + recorded responses, varied question types |

### 8.2 ELL Supports

```
REQUIRED FOR ALL CONTENT:
1. Vocabulary table with definitions AND examples
2. Sentence starters for open responses
3. Visual supports for abstract concepts
4. Spanish translations for key terms (where applicable)
5. Partner reading protocol in lesson plans
```

### 8.3 MTSS Integration

```
TIER 1 (Universal - 70%+):
- Core instruction with built-in differentiation
- Standard vocabulary support
- Peer collaboration during stations

TIER 2 (Targeted - 50-69%):
- Small group reteaching during Station 3
- Extended time (async completion allowed)
- Sentence frames and calculation scaffolds
- Peer tutoring with Tier 1 partner
- Additional practice problems

TIER 3 (Intensive - <50%):
- 1:1 intervention sessions
- Alternative assessment formats (oral, visual)
- Modified curriculum (prerequisite focus)
- IEP/504 accommodation implementation
- Family communication and partnership
```

---

## 9. Pre-Deployment Checklist

### 9.1 Content Validation

```
[ ] Scientific accuracy verified (current research consensus)
[ ] No Lamarckian language in evolution content
[ ] NGSS standards correctly cited
[ ] Phenomenon is engaging and grade-appropriate
[ ] Misconceptions explicitly targeted with distractors
```

### 9.2 Assessment Validation

```
[ ] Total points = 100
[ ] Point values consistent across ALL files (forms.gs, html, md, json)
[ ] Question counts match config
[ ] Auto-graded items: 30-40% of total
[ ] Rubrics use observable criteria (no subjective language)
[ ] Sentence starters provided for open responses
[ ] Confidence diagnostics are 0-point
```

### 9.3 Accessibility Validation

```
[ ] Skip-to-content link present
[ ] ARIA labels on major sections
[ ] Alt text for all images
[ ] Color contrast meets WCAG 2.1 AA
[ ] Touch targets ≥ 48px
[ ] Text-to-speech guidance provided
[ ] Print stylesheet included
```

### 9.4 Async-Readiness Validation

```
[ ] All lab activities have async alternatives
[ ] Video/simulation links for home learners
[ ] Pre-recorded data available for physical labs
[ ] "Stuck?" pathways for independent learners
[ ] Clear submission deadlines noted
```

### 9.5 Cross-File Alignment

```
[ ] forms.gs question count matches config
[ ] student-page.html point totals match forms.gs
[ ] lesson-plan.md station titles match student-page.html
[ ] rubrics.md criteria match forms.gs helpText
[ ] exemplars.md responses align with rubrics.md
```

### 9.6 Google Forms Settings

```
[ ] setIsQuiz(true) called
[ ] setRequireLogin(true) for verified email
[ ] setCollectEmail(true)
[ ] setLimitOneResponsePerUser(true)
[ ] setAllowResponseEdits(true)
[ ] setProgressBar(true)
[ ] Confirmation message set
[ ] AFTER DEPLOY: Manually configure feedback visibility in Forms UI
```

---

## 10. Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-11-15 | Initial framework from C3 development |
| 1.1 | 2025-12-01 | Added Google Forms API rules from debugging |
| 1.2 | 2025-12-03 | Added cross-pollination best practices from G7/G8 audit |
| 1.3 | 2025-12-05 | Added UDL and async-readiness requirements |
| 2.0 | 2025-12-07 | Comprehensive consolidation of all learnings; designated single source of truth |
| **3.0** | **2025-12-09** | **Scholarly Foundations integration:** Added evidence-based effect sizes to all patterns; Materials Policy (digital-first, notecard-only physical materials); Research-backed misconception remediation (refutational text g=0.41, bridging analogies); Interleaving research (d=0.83); Cognitive load theory (4-7 element limit, backward fading); Spacing optimization (10-20% of retention interval) |

---

## Related Documents

| Document | Purpose |
|----------|---------|
| `ARCHITECTURE.md` | System structure and data flow |
| `framework/pedagogical-approach.md` | Teaching philosophy and learning science |
| `framework/mtss-framework.md` | Intervention tiers and protocols |
| `framework/technical-reference.md` | Google Forms API detailed constraints |
| `framework/standards-alignment.md` | NGSS mapping across cycles |

---

*This is the SINGLE SOURCE OF TRUTH for content design decisions.*
*All new content development should reference this guide.*
*Update this guide when new patterns are discovered.*

---

*CONTENT-DESIGN-GUIDE.md | Version 3.0 | December 2025 | KAMS Science*
*Aligned with Scholarly Foundations for NGSS-Aligned Middle School Science Curriculum Development*
