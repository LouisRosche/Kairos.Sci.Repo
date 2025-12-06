# W2 Content Audit Report
## Rigor, Accessibility, Pedagogy, MTSS-Readiness

---

## EXECUTIVE SUMMARY

| Category | Current | Target | Gap |
|----------|---------|--------|-----|
| Accessibility (WCAG 2.1) | ~70% | 95% | Medium |
| Async-Readiness | ~50% | 90% | **High** |
| MTSS Data Points | ~40% | 85% | **High** |
| UDL Compliance | ~60% | 90% | Medium |
| Research Alignment | ~65% | 85% | Medium |

---

## 1. ACCESSIBILITY AUDIT

### ✅ What's Working
- ARIA labels on major sections (`role="region"`, `aria-labelledby`)
- Semantic HTML (proper heading hierarchy, `<table>` with `<th scope>`)
- `clamp()` for responsive font sizing
- High contrast color combinations (mostly)
- Link text is descriptive

### ❌ Gaps to Address

| Issue | Location | Fix |
|-------|----------|-----|
| No skip-to-content link | All HTML pages | Add `<a href="#main-content" class="skip-link">` |
| Color-only feedback distinction | Forms feedback | Add icons (✓/✗) alongside color |
| No text-to-speech guidance | HTML pages | Add "Use browser Read Aloud (Ctrl+Shift+U)" instruction |
| Missing alt text placeholders | Where images will be embedded | Add `alt=""` or descriptive text |
| Reading level not verified | All content | Target Lexile 900-1000 for G7, 950-1050 for G8 |
| No print-friendly stylesheet | HTML pages | Add `@media print` styles |
| Form timeout not addressed | Google Forms | Add "Your work saves automatically" + explicit timing |

### 🔧 Recommended Additions to HTML

```html
<!-- Add to top of each page -->
<a href="#main-content" class="skip-link"
   style="position:absolute;left:-9999px;focus:position:static;">
   Skip to main content
</a>

<!-- Add accessibility tip box -->
<div style="background:#E6FFFA;border-left:4px solid #319795;padding:15px;margin:15px 0;">
  <p><strong>🔊 Need text read aloud?</strong></p>
  <ul>
    <li>Chrome: Right-click → "Read aloud" or install "Read Aloud" extension</li>
    <li>Edge: Click "Read aloud" button in address bar</li>
    <li>Ask Mr. Rosche for headphones if needed</li>
  </ul>
</div>
```

---

## 2. ASYNC-READINESS AUDIT

### ❌ Critical Gaps

**Problem 1: Lab-dependent instructions assume teacher presence**

Current (Station 1):
> "MATERIALS: Heat lamp, thermometers, white paper, black paper, aluminum foil, water"

Students at home cannot do this.

**Fix: Add ASYNC ALTERNATIVE section**

```
### 🏠 COMPLETING THIS AT HOME?

If you don't have lab materials, use this virtual simulation instead:
→ [PhET Energy Forms and Changes](https://phet.colorado.edu/en/simulations/energy-forms-and-changes)

Or watch this 4-minute video demonstration:
→ [Albedo Experiment Video] - EMBED LINK

Then answer the questions using the data provided below:
| Surface | Start Temp | End Temp | Change |
|---------|------------|----------|--------|
| Black paper | 22°C | 38°C | +16°C |
| White paper | 22°C | 27°C | +5°C |
| Aluminum foil | 22°C | 24°C | +2°C |
```

**Problem 2: No "What to do if stuck" pathway**

**Fix: Add to each station**

```html
<div style="background:#FED7D7;border-left:4px solid #C53030;padding:15px;margin:15px 0;">
  <p><strong>🆘 Stuck? Try these in order:</strong></p>
  <ol>
    <li>Re-read the question and the vocabulary table above</li>
    <li>Check your Week 1 notes on greenhouse effect</li>
    <li>Watch the 2-min review video: [LINK]</li>
    <li>Post in Canvas Discussion: "W2 Help Thread"</li>
    <li>Email Mr. Rosche with your specific question</li>
  </ol>
</div>
```

**Problem 3: No sentence starters for open response**

Current form prompt:
> "Using the concept of ALBEDO, explain WHY some surfaces heated more than others."

**Fix: Add scaffold to form description**

```
SENTENCE STARTERS (choose one):
• "Surfaces with high albedo, like _____, heat up slowly because..."
• "The black paper heated most because its albedo is _____, which means..."
• "I observed that _____ had the biggest temperature change. This is because albedo measures..."
```

---

## 3. MTSS/INTERVENTION READINESS AUDIT

### ❌ Critical Gaps

**Problem 1: No tiered scaffolding**

Current: One version for all students

**Fix: Add Tier 2/3 scaffolds embedded in page**

```html
<details style="background:#F0FFF4;padding:15px;margin:10px 0;border-radius:8px;">
  <summary style="cursor:pointer;font-weight:bold;color:#276749;">
    📗 Need extra support? Click here for hints
  </summary>
  <div style="margin-top:10px;">
    <p><strong>Hint 1:</strong> Albedo is about REFLECTION. Snow reflects. Ocean absorbs.</p>
    <p><strong>Hint 2:</strong> When something absorbs light, it gets warmer.</p>
    <p><strong>Word Bank:</strong> reflects, absorbs, albedo, feedback, amplify, temperature</p>
  </div>
</details>
```

**Problem 2: No misconception flags for data collection**

Current: Teacher manually grades and identifies misconceptions

**Fix: Add auto-flagging questions**

```javascript
// In forms.gs, add diagnostic items that flag for MTSS
form.addMultipleChoiceItem()
  .setTitle('QUICK CHECK: Does breaking chemical bonds release energy or require energy?')
  .setHelpText('This checks a common misconception from Cycle 2')
  .setChoices([
    q.createChoice('Breaking bonds RELEASES energy', false),  // FLAG: bond-break-release misconception
    q.createChoice('Breaking bonds REQUIRES energy', true),
    q.createChoice('It depends on the bond', false)
  ]);
// Tag incorrect responses for MTSS intervention grouping
```

**Problem 3: No mastery-based gating**

Current: Students proceed linearly regardless of understanding

**Fix: Add checkpoint system**

```
After Hook:
→ Score ≥ 10/12: Proceed to Station 1
→ Score 6-9/12: Review "Feedback Loop Basics" video first
→ Score < 6/12: Schedule 1:1 with Mr. Rosche before continuing
```

---

## 4. UDL (Universal Design for Learning) AUDIT

### Multiple Means of ENGAGEMENT
| Principle | Present? | Enhancement |
|-----------|----------|-------------|
| Relevance | ✅ Climate change is relevant | Add local connection (St. Louis weather data) |
| Choice | ❌ No choice | Add: "Choose ONE to complete: written explanation OR labeled diagram OR voice recording" |
| Self-regulation | ⚠️ Self-assessment present | Add goal-setting at start: "My goal for today is..." |

### Multiple Means of REPRESENTATION
| Principle | Present? | Enhancement |
|-----------|----------|-------------|
| Visual | ⚠️ Tables only | Add diagrams, concept maps, video explanations |
| Auditory | ❌ None | Add video walkthroughs, text-to-speech guidance |
| Vocabulary support | ✅ Vocab tables | Add pronunciation guides, Spanish translations |

### Multiple Means of ACTION/EXPRESSION
| Principle | Present? | Enhancement |
|-----------|----------|-------------|
| Written response | ✅ Primary mode | - |
| Verbal response | ❌ Not available | Add Flipgrid option for oral explanation |
| Drawing/diagramming | ⚠️ Optional | Add explicit "draw the feedback loop" option |
| Physical manipulation | ✅ In-class only | Add virtual manipulatives for async |

---

## 5. RESEARCH-ALIGNED PRACTICES AUDIT

### Retrieval Practice (Roediger & Karpicke, 2006)
- ✅ Spiral questions from Week 1 present
- ❌ No low-stakes retrieval at START of each station
- **Fix:** Add "Quick Recall" prompt before each new section

### Elaborative Interrogation (Pressley et al., 1987)
- ⚠️ "Why" questions present but could be stronger
- **Fix:** Add "Explain WHY this makes sense" after every correct answer

### Dual Coding (Paivio, 1986)
- ❌ Text-heavy, few visuals
- **Fix:** Every concept needs both text AND visual representation

### Worked Examples (Sweller, 1988)
- ⚠️ Exemplars in slides but not in student page
- **Fix:** Add annotated examples directly in HTML:

```html
<div style="background:#E6FFFA;padding:20px;border-radius:8px;margin:15px 0;">
  <p><strong>📝 WORKED EXAMPLE: Feedback Loop Explanation</strong></p>
  <p style="background:#fff;padding:15px;border-left:4px solid #38B2AC;margin:10px 0;">
    "When Arctic ice melts, it exposes dark ocean water.
    <span style="background:#C6F6D5;padding:2px 4px;">[observation]</span>
    Ocean water has low albedo (about 0.06), so it absorbs 94% of sunlight instead of reflecting it.
    <span style="background:#BEE3F8;padding:2px 4px;">[mechanism with data]</span>
    This absorbed energy heats the water, which melts more ice nearby.
    <span style="background:#FEEBC8;padding:2px 4px;">[consequence]</span>
    This creates a positive feedback loop where melting causes more melting.
    <span style="background:#FED7E2;padding:2px 4px;">[scientific term]</span>"
  </p>
  <p><em>Notice: observation → mechanism → consequence → term</em></p>
</div>
```

### Spaced Practice (Cepeda et al., 2006)
- ✅ 3-week cycle structure supports spacing
- ❌ No explicit "last week you learned" retrieval prompt in forms
- **Fix:** Add "RECALL FROM LAST WEEK" section at form start

---

## 6. SPECIFIC FIXES NEEDED

### Priority 1: Async-Critical (Do First)

1. **Add async alternatives to all lab-dependent stations**
   - Virtual simulation links
   - Pre-recorded data for students without materials
   - Video demonstrations

2. **Add sentence starters to ALL open-response questions**
   - Reduces cognitive load
   - Supports ELL students
   - Provides scaffold for struggling writers

3. **Add "stuck?" pathway to every section**

### Priority 2: MTSS-Critical

4. **Add tiered support collapsibles (`<details>` elements)**
   - Tier 1: Standard instruction (current)
   - Tier 2: Hints, word banks, sentence starters
   - Tier 3: Simplified language, step-by-step breakdown

5. **Add misconception-flagging questions**
   - Auto-identify students for intervention groups
   - Tag responses with misconception IDs for data pull

6. **Add mastery checkpoints**
   - Gate Station 2 behind Station 1 understanding
   - Provide remediation pathway for below-threshold scores

### Priority 3: UDL Enhancement

7. **Add choice in expression**
   - Written explanation OR diagram OR voice recording
   - Same rubric, different modalities

8. **Add visual representations**
   - Feedback loop diagrams
   - Annotated worked examples
   - Concept maps

9. **Add Spanish vocabulary support**
   - Dual-language vocabulary tables
   - Key terms with translations

---

## 7. IMPLEMENTATION CHECKLIST

### HTML Page Updates
- [ ] Add skip-to-content link
- [ ] Add text-to-speech instruction box
- [ ] Add async alternative sections per station
- [ ] Add "stuck?" help pathway
- [ ] Add tiered support collapsibles
- [ ] Add worked examples with annotations
- [ ] Add choice in expression options
- [ ] Add Spanish vocabulary column

### Forms.gs Updates
- [ ] Add sentence starters to open response helpText
- [ ] Add misconception-flag questions with tags
- [ ] Add retrieval practice question at form start
- [ ] Add "why does this make sense?" follow-up prompts

### Slides Updates
- [ ] Add visual diagrams for every key concept
- [ ] Add worked example slides
- [ ] Add "check for understanding" pause points

---

## 8. SAMPLE ENHANCED STATION (Station 1)

See: `content/shared/enhanced-station-template.html` (to be created)

This template will demonstrate all fixes applied to one station.

---

*Audit completed: December 2024*
*Next steps: Implement Priority 1 fixes, then iterate*
