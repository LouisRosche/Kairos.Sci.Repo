# CLAUDE.md - KAMS Science Curriculum System

## Project Overview

This is the **KAMS (Kairos Academy Middle School) Science Curriculum System** - a digital-first, NGSS-aligned middle school science curriculum for Grades 7 and 8 covering School Year 2025-26.

**Scale:** 6 active cycles (C3-C8), 2 grades, 19 instructional weeks, up to 360 Google Forms

## Critical Compliance Requirements

**MANDATORY - Read Before Making Changes:**

1. **Digital-First Policy:** ONLY physical material allowed = ONE notecard (3x5 or 4x6) per student per class. NO worksheets, NO physical labs, NO textbooks.

2. **Research Alignment:** All content must align with effect sizes from `Scholarly Foundations for NGSS-Aligned Middle School Science Curriculum Development.md`:
   - Interleaving: d = 0.83 → 2 spiral questions per exit ticket
   - High-info feedback: d = 0.99 → Refutational text structure
   - Active learning: 33-45% gap reduction → >67% active learning time
   - Virtual labs: g = 0.686 → PhET/HTML5 simulations for all hands-on concepts

3. **Point Structure (Must = 100/week):**
   - Hook: 12 pts
   - Station 1: 20 pts
   - Station 2: 20 pts
   - Station 3: 25 pts
   - Exit Ticket: 23 pts

## Key Files to Read First

| File | Purpose |
|------|---------|
| `LESSONS-LEARNED.md` | Institutional knowledge - **read before making changes** |
| `framework/CONTENT-DESIGN-GUIDE.md` | SST for content creation (v3.0) |
| `framework/technical-reference.md` | Forms API rules, troubleshooting |
| `config/master-config.json` | Central configuration |

## Repository Structure

```
content/grade{7,8}/cycle{03-08}/week{1-5}/
  ├── forms.gs           # Google Apps Script for forms
  ├── student-page.html  # Canvas page for students
  ├── lesson-plan.md     # Teacher guide
  └── simulations/       # Custom HTML5 sims

config/cycles/cycle{03-08}.json  # Cycle configurations
shared/                          # Utilities (Config.gs, Constants.gs)
data/                            # Data aggregation & MTSS
framework/                       # Pedagogical documentation
```

## Common Tasks

### Creating Content for a Week
1. Read `config/cycles/cycle{XX}.json` for topic/standards
2. Follow `framework/CONTENT-DESIGN-GUIDE.md`
3. Use templates from `templates/`
4. Update `cycle-status.json` when done

### Forms.gs Rules (Google Apps Script)
- **NEVER** use `setPoints(0)` on content questions - omit `setPoints()` for ungraded items
  - Exception: `setPoints(0)` is allowed for diagnostic-only items (confidence scales, MTSS metacognition)
- **NEVER** use `setShuffleOrder` or `setRandomize` - they don't exist
- Exit ticket structure: 2 NEW + 2 SPIRAL + 1 INTEGRATION + 1 SEP
- Question IDs: `g{grade}_c{cycle}_w{week}_{station}_q{N}`

### Student Page HTML Rules
- Use `shared/styles/design-system.css` classes - NO inline styles
- Include skip-to-content link + ARIA landmarks
- Tier 2/3 supports in `<details>` elements
- `iframe` titles required for accessibility

## Read-Only Content

**DO NOT EDIT** content marked as deployed/read-only:
- Cycle 3 (all weeks, both grades) - PRODUCTION
- Check `cycle-status.json` in each cycle folder for current deployment status

## Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Directories | lowercase with leading zeros | `cycle03`, `week1` |
| Scripts | PascalCase.gs | `FormUtils.gs` |
| HTML/Content | lowercase-hyphenated | `student-page.html` |
| Form names | `G{grade}.C{cycle}.W{week}: {Type} - {Title}` | `G7.C3.W1: Hook - Hot Car Mystery` |

## Build/Validation Commands

```bash
node scripts/validate-config.js  # Validate cycle configs
```

## MTSS Tiers

| Tier | Score Range | Support Level |
|------|-------------|---------------|
| 1 | 70-100% | Standard differentiation |
| 2 | 50-69% | Small group reteach |
| 3 | 0-49% | 1:1 intervention |

## Single Sources of Truth

- **Configuration:** `config/master-config.json` → `shared/Config.gs`
- **Constants:** `shared/Constants.gs` (API limits, NGSS codes)
- **Styling:** `shared/styles/design-system.css`
- **Triggers:** `scripts/TriggerManager.gs`

## Current Status (Dec 2025)

- **Active:** Cycle 3 (deployed)
- **Ready:** Cycle 4 (ready for deployment)
- **Complete:** Cycles 5-8 (lesson plans done, forms scaffolded)
- **Legacy:** Cycle 2 (pre-architecture, reference only)
- **Archived:** C9 & C10 configs moved to `archive/config/cycles/` (standards integrated into C8)
