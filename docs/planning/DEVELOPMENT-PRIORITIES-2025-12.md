# Development Priorities — December 2025

**Created:** 2025-12-10
**Status:** Active Roadmap

---

## Executive Summary

**Critical Gap Identified:** Grade 8 has zero content for Cycles 6-8 (9 weeks, Mar-Jun 2026). This is the highest priority development need.

### Actual Completion State

| Cycle | Launch Date | G7 Status | G8 Status | Risk |
|-------|-------------|-----------|-----------|------|
| C3 | Dec 1, 2025 | ✅ 100% deployed | ✅ 100% deployed | None |
| C4 | Jan 6, 2026 | ✅ 100% ready | ✅ 100% ready | **Deploy now** |
| C5 | Feb 23, 2026 | 🟡 85% (no slides) | 🟡 95% (no slides) | Low |
| C6 | Mar 24, 2026 | 🟡 60% (templates) | 🔴 **0%** | **HIGH** |
| C7 | Apr 27, 2026 | 🟡 65% (templates) | 🔴 **0%** | **HIGH** |
| C8 | Jun 1, 2026 | 🟡 65% (templates) | 🔴 **0%** | **HIGH** |

**Grade 7:** Lesson plans complete for all cycles; forms/pages are templates
**Grade 8:** Cycles 6-8 have NO content — curriculum design, lesson plans, forms, everything at 0%

---

## Priority 1: Deploy Cycle 4 (Immediate)

**Deadline:** Jan 6, 2026 (< 4 weeks)
**Status:** Content 100% complete, needs deployment only

### Blocking Tasks
1. Run form deployment scripts for G7 C4 W1-W3
2. Run form deployment scripts for G8 C4 W1-W3
3. Integrate form URLs into student pages (replace `{{FORM_URL}}` placeholders)
4. Upload student pages to Canvas modules
5. Create Canvas assignments (100 pts each week)
6. End-to-end test with sample student

### Effort Estimate
- Form deployment: 1-2 hours (scripted)
- URL integration: 1 hour
- Canvas setup: 2 hours
- Testing: 1 hour

**Total: ~6 hours**

---

## Priority 2: Complete Cycle 5 Slides (Quick Win)

**Deadline:** Feb 23, 2026
**Status:** 85-95% complete, only slides missing

### Tasks
| Grade | Topic | Weeks | Missing |
|-------|-------|-------|---------|
| G7 | Weather & Climate Systems | W1-W3 | Slides, rubrics |
| G8 | Waves & Information Transfer | W1-W3 | Slides only |

### Effort Estimate
- 6 slide decks total (3 per grade)
- ~2-3 hours per deck = 12-18 hours total
- G7 rubrics: 2-3 hours

**Total: ~15-20 hours**

---

## Priority 3: Grade 8 Cycles 6-8 (Critical Gap)

**Deadline:** C6 Mar 24, C7 Apr 27, C8 Jun 1
**Status:** 0% — Nothing exists

This is the **highest-effort, highest-risk** item. Grade 8 students have no content for the final 9 weeks of the school year.

### Scope per Cycle (×3 cycles = ×3 effort)
- Curriculum design & NGSS alignment
- 3 weeks × 5 lesson plans = 15 lesson plans
- 3 weeks × 5 forms = 15 forms
- 3 weeks × student pages = 3 student pages
- Slides (optional but recommended)
- Rubrics

### Topics
| Cycle | G8 Topic | Weeks | NGSS Focus |
|-------|----------|-------|------------|
| C6 | Electricity & Magnetism | 5 | PS2, PS3 |
| C7 | Chemical Reactions & Conservation | 4 | PS1 |
| C8 | Thermal Energy & Heat Transfer | 4 | PS3 |

### Recommended Approach
**Option A: Sequential (Lower risk, slower)**
- Complete C6 fully before starting C7
- Ensures quality but tight on timeline

**Option B: Parallel Foundation (Faster, more coordination)**
- Create all curriculum designs first
- Then all lesson plans
- Then all forms
- Enables batching and pattern reuse

**Option C: Hybrid (Recommended)**
- Curriculum design for C6-C8 together (see patterns)
- Complete C6 forms/pages (nearest deadline)
- Then C7, then C8

### Effort Estimate
- Curriculum design: 4-6 hours per cycle × 3 = 12-18 hours
- Lesson plans: 1-2 hours each × 15 per cycle × 3 = 45-90 hours
- Forms: 2-3 hours each × 15 per cycle × 3 = 90-135 hours
- Student pages: 2 hours each × 3 per cycle × 3 = 18 hours

**Total: ~165-260 hours** (substantial)

---

## Priority 4: Complete Grade 7 Cycles 6-8 Forms/Pages

**Status:** Lesson plans done, forms/pages at 10% (templates)

Lower priority than G8 because the foundation exists. Can proceed in calendar order after G8 gaps are addressed.

### Scope per Cycle
- Convert lesson plan content → forms (5 per week)
- Build out student pages from templates
- Already have: curriculum design, lesson plans, simulations

### Effort Estimate
- Forms: 2-3 hours × 15 per cycle × 3 = 90-135 hours
- Student pages: 1-2 hours × 3 per cycle × 3 = 9-18 hours

**Total: ~100-150 hours**

---

## Priority 5: Slides for Cycles 6-8 (All Grades)

**Status:** 0% across all remaining cycles
**Deadline:** Respective launch dates

Slides are the lowest priority because:
- Teachers can teach from lesson plans alone
- Students interact primarily with forms/pages
- Can be created week-by-week as cycles approach

**Defer until core content complete.**

---

## Deferred Items

### Technical Debt (Do Not Prioritize Now)
- ~~HTML Templating System~~ — ROI diminishes as content completes
- ~~Form Factory Pattern~~ — Same reasoning
- ~~Canvas Automation~~ — Manual process works, not blocking

### Nice-to-Have
- Teacher Dashboard — Would help but not blocking instruction
- Automated deployment scripts — Current semi-manual process works

---

## Recommended Development Sequence

```
Week of Dec 9:   [P1] Deploy C4 ─────────────────────► C4 LIVE
                 [P3] Start G8 C6 curriculum design

Week of Dec 16:  [P3] G8 C6 lesson plans (W1-W5)
                 [P2] C5 slides (begin)

Week of Dec 23:  [P3] G8 C6 forms (W1-W2)
                 [P2] C5 slides (continue)

Jan 6:           ════════════════════════════════════► C4 LAUNCHES

Jan 6-24:        [P3] G8 C6 forms (W3-W5)
                 [P3] G8 C6 student pages
                 [P2] C5 slides (complete)

Feb 23:          ════════════════════════════════════► C5 LAUNCHES

Feb 23-Mar 21:   [P3] G8 C7 full development
                 [P4] G7 C6 forms/pages

Mar 24:          ════════════════════════════════════► C6 LAUNCHES

Mar 24-Apr 24:   [P3] G8 C8 full development
                 [P4] G7 C7 forms/pages

Apr 27:          ════════════════════════════════════► C7 LAUNCHES

Apr 27-May 30:   [P4] G7 C8 forms/pages
                 [P5] Remaining slides as needed

Jun 1:           ════════════════════════════════════► C8 LAUNCHES
```

---

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| G8 C6-C8 not ready | Medium | Critical | Start immediately, parallel curriculum design |
| C4 deployment delayed | Low | Medium | Already 100% ready, just needs execution |
| Teacher confusion without slides | Low | Low | Lesson plans are comprehensive |
| Form bugs in production | Medium | Medium | End-to-end testing before each launch |

---

## Decision Points

1. **G8 C6-C8 Development Approach:** Sequential vs. Parallel vs. Hybrid?
2. **Slide Priority:** Create during development or defer entirely?
3. **Resource Allocation:** Can additional help be brought in for G8 content?

---

## Metrics to Track

- Weeks until each cycle launch
- % completion by grade/cycle (update `cycle-status.json`)
- Forms deployed vs. total needed
- Student page URLs integrated

---

*DEVELOPMENT-PRIORITIES-2025-12.md | Active Roadmap*
