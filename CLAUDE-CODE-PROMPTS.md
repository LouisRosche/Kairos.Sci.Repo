# Claude Code Agent Prompts for KAMS Science
## Focused, Chainable, Quality-Driven
---

## Usage Pattern

```
1. Copy prompt → Paste in Claude Code
2. Replace {{VARIABLES}} with values
3. Agent executes with built-in validation
4. Chain next prompt as needed
```

---

# PART 1: GENESIS (Create New Content)

## G1: Initialize Week

```
Read ARCHITECTURE.md, CONTENT-DESIGN-GUIDE.md, and config/cycles/cycle{{CYCLE}}.json.

Create scaffold for Grade {{GRADE}}, Cycle {{CYCLE}}, Week {{WEEK}}:
- Topic: {{TOPIC}}
- Phenomenon: {{PHENOMENON}}
- NGSS: {{NGSS_PRIMARY}}

Output empty structure files with headers only. I will fill content next.
```

---

## G2: Generate Forms.gs

```
Generate forms.gs for G{{GRADE}}.C{{CYCLE}}.W{{WEEK}}.

INPUTS:
- Topic: {{TOPIC}}
- Phenomenon: {{PHENOMENON}}  
- NGSS Primary: {{NGSS_PRIMARY}}
- Spiral: {{NGSS_SPIRAL}}
- Misconceptions: {{MISCONCEPTIONS}}

HARD RULES (from technical-reference.md):
- Points: Hook=12, S1=20, S2=20, S3=25, Exit=23 (MUST=100)
- NEVER setPoints(0)—omit setPoints() for ungraded
- NEVER setShuffleOrder/setRandomize—don't exist
- Exit structure: 2 NEW + 2 SPIRAL + 1 INTEGRATION + 1 SEP-1

QUALITY RULES:
- Every MCQ: misconception-trap distractor with corrective feedback
- Every open response: sentence starters in helpText
- Question IDs: g{{GRADE}}_c{{CYCLE}}_w{{WEEK}}_{station}_q{n}

Read templates/forms/*.gs first. Output to content/grade{{GRADE}}/cycle{{CYCLE}}/week{{WEEK}}/forms.gs.

After generating, sum all setPoints() and confirm total=100.
```

---

## G3: Generate Student Page

```
Generate student-page.html for G{{GRADE}}.C{{CYCLE}}.W{{WEEK}}.

INPUTS:
- Topic: {{TOPIC}}
- Read forms.gs first for alignment

STRUCTURE:
1. Skip-to-content link + ARIA landmarks
2. Header (grade, cycle, week, topic)
3. Learning targets (3-4, student language)
4. Vocabulary table
5. Station sections with form iframes
6. Tier 2/3 <details> supports per station
7. Self-check section

CSS: Use design-system.css classes only—no inline styles.

ACCESSIBILITY:
- Alt text all images
- iframe titles
- Touch targets ≥48px
- Print stylesheet hides iframes

For each physical activity, add async-alternative div with simulation link.

Read templates/html/student-page-template.html first. Output to content/grade{{GRADE}}/cycle{{CYCLE}}/week{{WEEK}}/student-page.html.
```

---

## G4: Generate Lesson Plan

```
Generate lesson-plan.md for G{{GRADE}}.C{{CYCLE}}.W{{WEEK}}.

Read forms.gs and student-page.html first for alignment.

SECTIONS:
1. Overview (topic, targets, NGSS, materials)
2. Day-by-day pacing table (Day 1: Hook+S1+S2, Day 2: S3, Day 3: Exit)
3. Station facilitation notes (setup, key questions, common struggles, Tier 2/3 mods)
4. Formative checkpoints (what to watch, pause triggers at 30% miss)
5. Differentiation matrix (Tier 1/2/3 supports)

TEACHER MOVES to embed:
- Probing questions (not leading)
- 5-7 second wait time
- Misconception protocol: Identify→Probe→Redirect→Confirm

Read templates/docs/lesson-plan-template.md first. Output to content/grade{{GRADE}}/cycle{{CYCLE}}/week{{WEEK}}/lesson-plan.md.
```

---

## G5: Generate Simulation

```
Generate interactive HTML5 simulation for G{{GRADE}}.C{{CYCLE}}.W{{WEEK}}.

SPECS:
- Name: {{SIM_NAME}}
- Concept: {{CONCEPT}}
- Variables: {{VARIABLES}}
- Outcomes: {{OUTCOMES}}

DESIGN (PhET-informed):
- 5-10 min unguided exploration first
- Light guidance > heavy (implicit scaffolding)
- Reset button prominent
- Mobile-responsive, touch-friendly
- Keyboard accessible
- NO external dependencies (inline CSS/JS)

STRUCTURE:
- Header with title + instructions toggle + reset
- Main simulation area
- Key concepts section
- Reflection questions (Predict→Observe→Explain)

Output to content/grade{{GRADE}}/cycle{{CYCLE}}/week{{WEEK}}/simulations/{{SIM_NAME}}.html.
```

---

# PART 2: VALIDATE (Quality Assurance)

## V1: Validate Points

```
Audit point totals in G{{GRADE}}.C{{CYCLE}}.W{{WEEK}}/forms.gs.

REQUIRED:
- Hook: 12
- S1: 20
- S2: 20  
- S3: 25
- Exit: 23
- TOTAL: 100

Extract all setPoints() calls. Sum by station. Report discrepancies.

If total ≠ 100, propose specific adjustments to fix.
```

---

## V2: Validate Cross-File Alignment

```
Validate alignment across G{{GRADE}}.C{{CYCLE}}.W{{WEEK}} files.

CHECK:
1. Station titles match in forms.gs, student-page.html, lesson-plan.md
2. Question counts match across files
3. Point displays in HTML match forms.gs
4. Learning targets consistent
5. NGSS codes identical

OUTPUT:
✅ [Check]: Aligned
❌ [Check]: Mismatch → [specific difference] → [fix needed]
```

---

## V3: Validate Accessibility

```
Audit accessibility in G{{GRADE}}.C{{CYCLE}}.W{{WEEK}}/student-page.html.

WCAG 2.1 AA CHECKS:
□ Skip-to-content link present
□ ARIA landmarks on nav, main, sections
□ All images have alt text
□ All iframes have title attribute
□ No inline CSS (uses design-system.css)
□ Heading hierarchy logical (h1→h2→h3)
□ Tables have <th scope="">
□ Color contrast ≥4.5:1
□ Touch targets ≥48px
□ Print stylesheet present

Report failures with line numbers and fixes.
```

---

## V4: Validate Misconception Coverage

```
Audit misconception targeting in G{{GRADE}}.C{{CYCLE}}.W{{WEEK}}/forms.gs.

TARGET MISCONCEPTIONS: {{MISCONCEPTIONS}}

FOR EACH:
1. Find MCQ with trap distractor for this misconception
2. Verify feedback explains WHY incorrect (not just "wrong")
3. Check if two-tier (reasoning) follow-up exists

REPORT:
- [Misconception]: [Question ID] → [Status: Targeted/Missing/Weak feedback]

If missing, propose specific distractor + feedback to add.
```

---

## V5: Validate Spiral Spacing

```
Audit spiral spacing for Grade {{GRADE}}, Cycles {{START}}-{{END}}.

For each exit ticket Q3-Q4 (spiral questions):
1. Identify referenced prior concept
2. Calculate weeks since initial teaching
3. Flag if <2 weeks (too soon) or >6 weeks (too long)

Optimal: 10-20% of retention interval (2-3 weeks for semester).

OUTPUT TABLE:
| Cycle | Week | Spiral Q | References | Gap (wks) | Status |
```

---

# PART 3: REFINE (Targeted Fixes)

## R1: Fix Point Allocation

```
Fix point misalignment in G{{GRADE}}.C{{CYCLE}}.W{{WEEK}}/forms.gs.

CURRENT ISSUE: {{ISSUE}} (e.g., "Total is 97, need 100")

CONSTRAINTS:
- Maintain Hook=12, S1=20, S2=20, S3=25, Exit=23 distribution
- Prioritize adjusting auto-graded items (easier to rebalance)
- Keep open responses weighted appropriately

Make minimal changes. Update forms.gs. Confirm new total=100.

Then update student-page.html point displays to match.
```

---

## R2: Enhance Scaffolding

```
Add Tier 2/3 scaffolding to G{{GRADE}}.C{{CYCLE}}.W{{WEEK}}/student-page.html.

FOR EACH STATION, add:

TIER 2 (green border):
<details class="tier2-support">
  <summary>💡 Need a hint?</summary>
  <p><strong>Hint:</strong> [conceptual nudge]</p>
  <p><strong>Word bank:</strong> [key terms]</p>
</details>

TIER 3 (red border):
<details class="tier3-support">
  <summary>📚 Step-by-step guide</summary>
  <ol><li>[concrete step]</li>...</ol>
</details>

Also add self-check at end of each station:
<details class="self-check">
  <summary>✓ Check understanding</summary>
  <p>Can you explain: [key concept]?</p>
</details>

Research: Sustained scaffolding as effective as faded (Belland 2017, g=0.46).
```

---

## R3: Strengthen Misconception Traps

```
Strengthen misconception targeting in G{{GRADE}}.C{{CYCLE}}.W{{WEEK}}/forms.gs.

TARGET: {{MISCONCEPTION}}

FIND all MCQs related to this concept. For each:

1. AUDIT distractor quality:
   - Is trap based on documented student thinking?
   - Does feedback explain mechanism (not just "incorrect")?

2. UPGRADE weak traps:
   BEFORE: .createChoice('None of the above', false)
   AFTER: .createChoice('[Misconception-embodying answer]', false)
          // Feedback: "This reflects common thinking that [X]. 
          // Actually, [correct mechanism] because [evidence]."

3. ADD two-tier if missing:
   - Tier 1: Content question
   - Tier 2: "I chose this because:" with reasoning options

Report all changes made.
```

---

## R4: Add Async Alternatives

```
Add async alternatives to G{{GRADE}}.C{{CYCLE}}.W{{WEEK}}/student-page.html.

For EVERY physical/hands-on activity, add:

<div class="async-alternative">
  <h4>🏠 Completing at Home?</h4>
  <p><strong>Option 1:</strong> Use this simulation: [PhET/Gizmo link]</p>
  <p><strong>Option 2:</strong> Watch this demonstration: [video link]</p>
  <p><strong>Option 3:</strong> Use pre-recorded data:</p>
  [data table]
</div>

Check framework/phet-simulations-catalog.md for relevant sims.
Report all activities modified.
```

---

## R5: Enhance Feedback Quality

```
Upgrade feedback in G{{GRADE}}.C{{CYCLE}}.W{{WEEK}}/forms.gs.

For each MCQ incorrect choice, ensure feedback includes:

1. ACKNOWLEDGE the error pattern
2. EXPLAIN correct mechanism
3. CONNECT to observable evidence

BEFORE:
.setFeedbackForIncorrect(FormApp.createFeedback()
  .setText('Incorrect.')
  .build())

AFTER:
.setFeedbackForIncorrect(FormApp.createFeedback()
  .setText('Not quite. Many students think [X] because [Y]. However, [correct explanation]. We can see this because [observable evidence].')
  .build())

Research: Elaborated feedback d=0.99 vs simple verification d=0.24 (Wisniewski 2020).
```

---

# PART 4: EXTEND (Add Features)

## E1: Add PhET Integration

```
Integrate PhET simulation into G{{GRADE}}.C{{CYCLE}}.W{{WEEK}}.

SIM: {{PHET_NAME}}
URL: {{PHET_URL}}
TARGET STATION: {{STATION}}

IN student-page.html, add:
<div class="simulation-container">
  <h4>🔬 {{PHET_NAME}}</h4>
  <iframe src="{{PHET_URL}}" width="100%" height="600" 
          title="{{PHET_NAME}}" allowfullscreen></iframe>
  <details class="sim-instructions">
    <summary>How to Use</summary>
    <ol>[steps]</ol>
  </details>
  <div class="sim-tasks">
    <p><strong>Predict:</strong> [question]</p>
    <p><strong>Explore:</strong> [task]</p>
    <p><strong>Explain:</strong> [question]</p>
  </div>
</div>

IN forms.gs, add question requiring simulation data.
IN lesson-plan.md, add facilitation notes for sim.
```

---

## E2: Add Assessment Item

```
Add assessment item to G{{GRADE}}.C{{CYCLE}}.W{{WEEK}} {{STATION}}.

SPECS:
- Type: {{TYPE}} (MCQ/Short/Paragraph)
- Points: {{POINTS}}
- Target: {{LEARNING_TARGET}}
- Misconception: {{MISCONCEPTION}}
- Question: {{QUESTION}}

FOR MCQ, include:
- 4 choices with one misconception trap
- Feedback for each incorrect explaining WHY

FOR OPEN RESPONSE, include:
- Sentence starters in helpText
- Add rubric to rubrics.md

AFTER ADDING:
1. Rebalance points to maintain station total
2. Update question count in lesson-plan.md
3. Assign ID: g{{GRADE}}_c{{CYCLE}}_w{{WEEK}}_{{STATION}}_q{{N}}
```

---

## E3: Add Language Supports

```
Add ELL supports to G{{GRADE}}.C{{CYCLE}}.W{{WEEK}}/student-page.html.

ADD throughout:

1. VOCABULARY PRE-TEACH (5-7 terms max):
<div class="vocab-support">
  <table>
    <tr><th>Term</th><th>Definition</th><th>En Español</th><th>Visual</th></tr>
    <tr><td>[term]</td><td>[definition]</td><td>[translation]</td><td>[icon/image]</td></tr>
  </table>
</div>

2. SENTENCE FRAMES per station:
<div class="sentence-frames">
  <h4>📝 Writing Help</h4>
  <ul>
    <li>"The evidence shows _____ because _____."</li>
    <li>"I observed _____, which means _____."</li>
  </ul>
</div>

3. COGNATES callout where applicable:
<p class="cognate-note">💡 <em>Fotosíntesis</em> = photosynthesis</p>

Research: Pre-teach vocabulary + sentence stems + visual supports (Lee & Buxton).
```

---

## E4: Add Extension Pathway

```
Add extension pathway to G{{GRADE}}.C{{CYCLE}}.W{{WEEK}}/student-page.html.

TARGET: Advanced learners ready for deeper challenge

ADD after each station:
<details class="extension-pathway">
  <summary>⭐ Challenge Yourself</summary>
  <h4>{{EXTENSION_TITLE}}</h4>
  <p>{{DESCRIPTION}}</p>
  <ol>
    <li>[Advanced task 1]</li>
    <li>[Advanced task 2]</li>
    <li>[Connection to real-world application]</li>
  </ol>
  <p><em>Share findings with class or submit for enrichment credit.</em></p>
</details>

Extensions should:
- Require application, not just more of same
- Connect to authentic science practices
- Be completable independently
```

---

# PART 5: CHAINS (Common Sequences)

## Chain A: New Week (Full Build)

```
Execute in order, pausing after each for my review:

1. G2 (forms.gs) → pause
2. V1 (validate points) → fix if needed
3. G3 (student-page.html) → pause  
4. V3 (validate accessibility) → fix if needed
5. G4 (lesson-plan.md) → pause
6. V2 (cross-file alignment) → fix if needed

Report status after each step.
```

---

## Chain B: Quality Sprint

```
Run full quality audit on G{{GRADE}}.C{{CYCLE}}.W{{WEEK}}:

1. V1 (points)
2. V2 (alignment)
3. V3 (accessibility)
4. V4 (misconceptions)

Compile single report. Prioritize fixes by impact.
Then execute R-prompts as needed.
```

---

## Chain C: Accessibility Remediation

```
Full accessibility pass on G{{GRADE}}.C{{CYCLE}}.W{{WEEK}}/student-page.html:

1. V3 (audit)
2. Fix all failures
3. R2 (add scaffolding)
4. R4 (add async alternatives)
5. E3 (add language supports)
6. V3 (re-audit)

Confirm all checks pass.
```

---

## Chain D: Spiral Curriculum Review

```
Audit spiral curriculum for Grade {{GRADE}}:

1. V5 (spacing analysis for cycles {{START}}-{{END}})
2. Identify gaps (concepts not spiraled)
3. Identify bunching (concepts spiraled too frequently)
4. Propose rebalancing recommendations

Output spiral-audit-g{{GRADE}}.md with findings.
```

---

# Quick Variable Templates

## Grade 7 Example
```
GRADE=7
CYCLE=05
WEEK=2
TOPIC=Weather Systems & Air Masses
PHENOMENON=Why did the temperature drop 30°F in 2 hours yesterday?
NGSS_PRIMARY=MS-ESS2-5
NGSS_SPIRAL=MS-ESS2-6, MS-ESS3-5
MISCONCEPTIONS=cold-front-brings-cold-air (55%), air-mass-instant-change (40%)
```

## Grade 8 Example
```
GRADE=8
CYCLE=06
WEEK=1
TOPIC=Natural Selection & Adaptation
PHENOMENON=Why are some bacteria no longer killed by antibiotics?
NGSS_PRIMARY=MS-LS4-4
NGSS_SPIRAL=MS-LS4-1, MS-LS3-1
MISCONCEPTIONS=intentional-adaptation (65%), inheritance-of-acquired (45%), survival-of-strongest (50%)
```

---

# Prompt Selection Guide

| I need to... | Use prompt |
|--------------|------------|
| Start new week from scratch | Chain A |
| Generate just forms.gs | G2 |
| Generate just student page | G3 |
| Generate just lesson plan | G4 |
| Build a simulation | G5 |
| Check if points total 100 | V1 |
| Check file consistency | V2 |
| Audit accessibility | V3 |
| Check misconception traps | V4 |
| Analyze spiral spacing | V5 |
| Fix point totals | R1 |
| Add scaffolding | R2 |
| Improve misconception traps | R3 |
| Add home-learning options | R4 |
| Improve feedback quality | R5 |
| Add PhET simulation | E1 |
| Add new question | E2 |
| Add ELL supports | E3 |
| Add challenge activities | E4 |
| Full quality audit | Chain B |
| Full accessibility fix | Chain C |
| Review spiral curriculum | Chain D |

---

*CLAUDE-CODE-PROMPTS.md | v2.0 | December 2025*
