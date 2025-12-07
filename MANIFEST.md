# KAMS Science Curriculum Repository Manifest
## Complete Content Inventory

**Last Updated:** 2025-12-06
**Repository:** C3.Repo
**Maintainer:** Louis Rosche

---

## Repository Structure Overview

```
C3.Repo/
├── README.md                    # Quick start guide
├── ARCHITECTURE.md              # System design documentation
├── MANIFEST.md                  # This file - content inventory
│
├── config/                      # Configuration system
│   ├── master-config.json       # Global settings
│   ├── cycles/                  # Per-cycle configuration
│   │   ├── cycle03.json         # ✅ Active
│   │   ├── cycle04.json         # 🟡 In Progress
│   │   ├── cycle05.json         # 📋 Planned
│   │   ├── cycle06.json         # 📋 Planned
│   │   ├── cycle07.json         # 📋 Planned
│   │   ├── cycle08.json         # 📋 Planned
│   │   ├── cycle09.json         # 📋 Planned
│   │   └── cycle10.json         # 📋 Planned
│   └── schema/                  # Validation schemas
│       ├── cycle-schema.json    # ✅ Cycle config validation
│       ├── form-schema.json     # Form validation
│       └── mtss-schema.json     # MTSS validation
│
├── content/                     # All instructional content
│   ├── grade7/                  # Grade 7: Life & Earth Science
│   │   ├── cycle02/             # 📦 Legacy (4 weeks, pre-architecture)
│   │   ├── cycle03/             # ✅ Complete
│   │   ├── cycle04/             # 🟡 In Progress
│   │   ├── cycle05-10/          # 📋 Placeholder
│   ├── grade8/                  # Grade 8: Physical Science
│   │   ├── cycle02/             # 📦 Legacy (4 weeks, pre-architecture)
│   │   ├── cycle03/             # ✅ Complete
│   │   ├── cycle04/             # 📋 Placeholder
│   │   ├── cycle05-10/          # 📋 Placeholder
│   └── resources/               # Cross-grade resources
│
├── data/                        # Data aggregation & analysis
│   ├── FormRegistry.gs
│   ├── hub/                     # Central data hub
│   │   ├── KAMS-Science-Hub.xlsx
│   │   ├── HubOrchestrator.gs   # ✅ Orchestration script
│   │   └── hub-setup-guide.md
│   ├── aggregation/
│   │   ├── ResponseCollector.gs
│   │   ├── DataAggregator.gs
│   │   └── output/
│   │       ├── responses/
│   │       ├── analysis/
│   │       └── mtss/
│   ├── analysis/
│   │   ├── ThreeDimensionalAnalyzer.gs
│   │   ├── MisconceptionTracker.gs
│   │   ├── SpiralEffectiveness.gs
│   │   └── templates/
│   │       └── analysis-dashboard.json
│   └── mtss/
│       ├── InterventionGenerator.gs
│       ├── InterventionGrouping.gs  # ✅ Student grouping engine
│       ├── tier-definitions.json
│       └── output/
│           ├── tier2-students.json
│           └── tier3-students.json
│
├── framework/                   # Pedagogical documentation
│   ├── mtss-framework.md
│   ├── pedagogical-approach.md
│   ├── standards-alignment.md   # ✅ NGSS mapping
│   └── technical-reference.md
├── scripts/                     # Automation scripts
│   ├── generate-cycle.js        # Config generation
│   └── validate-config.js       # Cycle validation
├── shared/                      # Cross-grade utilities
│   ├── FormUtils.gs             # Form creation helpers
│   ├── DataUtils.gs             # Data retrieval utilities
│   └── ValidationUtils.gs       # Config validation
├── templates/                   # Content generation templates
└── archive/                     # Legacy/backup files
```

---

## Content Status Dashboard

### Overall Progress

| Cycle | Grade 7 | Grade 8 | Status |
|-------|---------|---------|--------|
| **C2** | 75% 📦 | 75% 📦 | **LEGACY** (pre-architecture) |
| **C3** | 100% ✅ | 100% ✅ | **DEPLOYED** |
| **C4** | 45% 🟡 | 10% 📋 | In Progress |
| **C5** | 0% 📋 | 0% 📋 | Placeholder |
| **C6** | 0% 📋 | 0% 📋 | Placeholder |
| **C7** | 0% 📋 | 0% 📋 | Placeholder |
| **C8** | 0% 📋 | 0% 📋 | Placeholder |
| **C9** | 0% 📋 | 0% 📋 | Placeholder |
| **C10** | 0% 📋 | 0% 📋 | Placeholder |

**Legend:** ✅ Complete | 🟡 In Progress | 📋 Placeholder | 📦 Legacy | ❌ Not Started

---

## Cycle 2 - LEGACY CONTENT 📦

> **Note:** Cycle 2 is pre-architecture legacy content with 4 weeks instead of 3. See ARCHITECTURE.md for details.

### Grade 7: Molecular Structure, Bonding & Reactions (4 weeks)

| Week | forms.gs | student-page.html | lesson-plan.md | curriculum-design.md | Status |
|------|----------|-------------------|----------------|----------------------|--------|
| W1 | ❌ | ✅ | ❌ | ✅ (shared) | **HTML READY** |
| W2 | ❌ | ✅ | ❌ | ✅ (shared) | **HTML READY** |
| W3 | ✅ | ✅ | ❌ | ✅ (shared) | **CONTENT READY** |
| W4 | ❌ | ✅ | ❌ | ✅ (shared) | **HTML READY** |

### Grade 8: Forces, Energy & Collisions (4 weeks)

| Week | forms.gs | student-page.html | lesson-plan.md | curriculum-design.md | Status |
|------|----------|-------------------|----------------|----------------------|--------|
| W1 | ❌ | ✅ | ❌ | ✅ (shared) | **HTML READY** |
| W2 | ❌ | ✅ | ❌ | ✅ (shared) | **HTML READY** |
| W3 | ✅ | ✅ | ❌ | ✅ (shared) | **CONTENT READY** |
| W4 | ❌ | ✅ | ❌ | ✅ (shared) | **HTML READY** |

---

## Cycle 3 (ACTIVE) - 100% COMPLETE ✅

### Grade 7: Climate Change & Energy Flow

| Week | forms.gs | student-page.html | lesson-plan.md | slides.pptx | Status |
|------|----------|-------------------|----------------|-------------|--------|
| W1 | ✅ 1,021 lines | ✅ | ✅ | ✅ | **COMPLETE** |
| W2 | ✅ 960 lines | ✅ | ✅ | ✅ | **COMPLETE** |
| W3 | ✅ | ✅ | ✅ | ✅ | **COMPLETE** |

### Grade 8: Natural Selection & Forces

| Week | forms.gs | student-page.html | lesson-plan.md | slides.pptx | Status |
|------|----------|-------------------|----------------|-------------|--------|
| W1 | ✅ | ✅ | ✅ | ✅ | **COMPLETE** |
| W2 | ✅ | ✅ | ✅ | ✅ | **COMPLETE** |
| W3 | ✅ | ✅ | ✅ | ✅ | **COMPLETE** |

---

## Cycle 4 (IN PROGRESS)

### Grade 7: Biogeochemical Cycles & Human Impact (45%)

| Week | forms.gs | student-page.html | lesson-plan.md | slides.pptx | Status |
|------|----------|-------------------|----------------|-------------|--------|
| W1 | ✅ | ✅ | ✅ | ❌ | **CONTENT COMPLETE** |
| W2 | 📋 | 📋 | 📋 | ❌ | Placeholder |
| W3 | 📋 | 📋 | 📋 | ❌ | Placeholder |

### Grade 8: Ecosystems & Energy Transfer (10%)

| Week | forms.gs | student-page.html | lesson-plan.md | slides.pptx | Status |
|------|----------|-------------------|----------------|-------------|--------|
| W1 | 📋 | 📋 | 📋 | ❌ | Placeholder |
| W2 | 📋 | 📋 | 📋 | ❌ | Placeholder |
| W3 | 📋 | 📋 | 📋 | ❌ | Placeholder |

---

## Cycles 5-10 (PLACEHOLDER STRUCTURE READY)

All cycles 5-10 have standardized placeholder structure created:

| Cycle | G7 Topic | G8 Topic | Status |
|-------|----------|----------|--------|
| C5 | Weather & Climate Systems | Waves & Information Transfer | 📋 |
| C6 | Plate Tectonics & Earth's Interior | Electricity & Magnetism | 📋 |
| C7 | Rock Cycle & Earth's History | Chemical Reactions & Conservation | 📋 |
| C8 | Ecosystems & Biodiversity | Thermal Energy & Heat Transfer | 📋 |
| C9 | Space Systems & Earth's Place | Engineering Design & Systems | 📋 |
| C10 | Year-End Integration & Review | Year-End Integration & Review | 📋 |

Each placeholder cycle includes:
- `curriculum-design.md` with TODO checklist
- `rubrics.md` with template structure
- `week{1,2,3}/` directories with placeholder files
- `cycle-status.json` for tracking progress

---

## File Inventory by Directory

### `/config/` - Configuration System

| File | Purpose | Status |
|------|---------|--------|
| `master-config.json` | Global settings, naming conventions | ✅ Complete |
| `cycles/cycle03.json` | C3 specs (active, 408 lines) | ✅ Complete |
| `cycles/cycle04.json` | C4 specs (337 lines) | ✅ Complete |
| `cycles/cycle05.json` | C5 specs placeholder | 📋 Placeholder |
| `cycles/cycle06.json` | C6 specs placeholder | 📋 Placeholder |
| `cycles/cycle07.json` | C7 specs placeholder | 📋 Placeholder |
| `cycles/cycle08.json` | C8 specs placeholder | 📋 Placeholder |
| `cycles/cycle09.json` | C9 specs placeholder | 📋 Placeholder |
| `cycles/cycle10.json` | C10 specs placeholder | 📋 Placeholder |
| `schema/cycle-schema.json` | Cycle config validation | ✅ Complete |
| `schema/form-schema.json` | Form validation | ✅ Complete |
| `schema/mtss-schema.json` | MTSS validation | ✅ Complete |

### `/content/resources/` - Cross-Grade Resources

| File | Purpose | Status |
|------|---------|--------|
| `audit-w2-content.md` | Accessibility/MTSS audit report | ✅ Complete |
| `exemplars-cycle03-week2.md` | Model student responses | ✅ Complete |

### `/data/` - Data Infrastructure

| File | Purpose | Status |
|------|---------|--------|
| `FormRegistry.gs` | Form ID management | ✅ Complete |
| `hub/KAMS-Science-Hub.xlsx` | Central data hub | ✅ Complete |
| `hub/hub-setup-guide.md` | Hub configuration guide | ✅ Complete |
| `aggregation/ResponseCollector.gs` | Response collection | ✅ Complete |
| `aggregation/DataAggregator.gs` | Data aggregation | ✅ Complete |
| `aggregation/output/responses/` | Raw response JSON | ✅ Ready |
| `aggregation/output/analysis/` | Aggregated analysis | ✅ Ready |
| `aggregation/output/mtss/` | Intervention data | ✅ Ready |
| `analysis/ThreeDimensionalAnalyzer.gs` | 3D assessment analysis | ✅ Complete |
| `analysis/MisconceptionTracker.gs` | Misconception pattern analysis | ✅ Complete |
| `analysis/SpiralEffectiveness.gs` | Spiral question tracking | ✅ Complete |
| `analysis/templates/analysis-dashboard.json` | Dashboard template | ✅ Complete |
| `mtss/InterventionGenerator.gs` | Intervention list generation | ✅ Complete |
| `mtss/tier-definitions.json` | MTSS tier thresholds | ✅ Complete |
| `mtss/output/tier2-students.json` | Tier 2 student list | ✅ Ready |
| `mtss/output/tier3-students.json` | Tier 3 student list | ✅ Ready |

### `/framework/` - Pedagogical Documentation

| File | Purpose | Status |
|------|---------|--------|
| `mtss-framework.md` | MTSS intervention system | ✅ Complete |
| `pedagogical-approach.md` | Teaching philosophy | ✅ Complete |
| `standards-alignment.md` | NGSS mapping across cycles | ✅ Complete |
| `technical-reference.md` | Technical specifications | ✅ Complete |

### `/scripts/` - Automation

| File | Purpose | Status |
|------|---------|--------|
| `generate-cycle.js` | Cycle config generation | ✅ Complete |
| `validate-config.js` | Config validation | ✅ Complete |

### `/shared/` - Utilities

| File | Purpose | Status |
|------|---------|--------|
| `FormUtils.gs` | Form helper functions | ✅ Complete |

### `/templates/` - Content Generation

| File | Purpose | Status |
|------|---------|--------|
| `forms/FormTemplate.gs` | Master form generation | ✅ Complete |
| `forms/HookTemplate.gs` | Hook form pattern | ✅ Complete |
| `forms/StationTemplate.gs` | Station form pattern | ✅ Complete |
| `forms/ExitTicketTemplate.gs` | Exit ticket pattern | ✅ Complete |
| `html/student-page-template.html` | HTML page template | ✅ Complete |
| `html/components/.gitkeep` | Reusable HTML components | ✅ Ready |
| `docs/lesson-plan-template.md` | Lesson plan template | ✅ Complete |
| `docs/curriculum-design-template.md` | Curriculum template | ✅ Complete |
| `docs/rubrics-template.md` | Rubrics template | ✅ Complete |

### `/archive/` - Legacy Files

| File | Purpose | Status |
|------|---------|--------|
| `KAMS_Cycle3_Hub_Additions.xlsx` | Hub additions backup | ✅ Archived |
| `htmls-scripts-contents-holder.docx` | Legacy HTML/Scripts reference | ✅ Archived |

---

## Naming Conventions

### Directories
- Lowercase with leading zeros: `cycle03`, `week1`, `grade7`

### Files

| Type | Convention | Example |
|------|------------|---------|
| Config | `lowercase-hyphenated.json` | `master-config.json` |
| Scripts | `PascalCase.gs` | `FormRegistry.gs` |
| Content docs | `lowercase-hyphenated.md` | `curriculum-design.md` |
| HTML pages | `lowercase-hyphenated.html` | `student-page.html` |
| Presentations | `G{grade}_C{cycle}_W{week}_{Topic}_Slides.pptx` | `G7_C3_W2_Feedback_Loops_Slides.pptx` |
| Status tracking | `cycle-status.json` | Per-cycle tracking file |

### Forms (in Google Forms)
- `G{grade}.C{cycle}.W{week}: {Type} - {Title}`
- Example: `G7.C3.W2: Station 1 - Albedo Investigation`

### Question IDs
- `g{grade}_c{cycle}_w{week}_{station}_q{number}`
- Example: `g7_c3_w2_s1_q3`

---

## Statistics

| Metric | Count |
|--------|-------|
| Total files | 150+ |
| Complete content files | 50+ |
| Placeholder files | 90+ |
| Template files | 9 |
| Configuration files | 10 |
| Infrastructure files | 12 |
| Complete cycles | 2 (C2, C3) |
| In-progress cycles | 1 (C4) |
| Placeholder cycles | 6 (C5-C10) |

---

## Quick Reference

### To check cycle status:
```bash
cat content/grade{7,8}/cycle{03-10}/cycle-status.json
```

### To add content to a placeholder week:
1. Edit files in `content/grade{X}/cycle{X}/week{X}/`
2. Update `cycle-status.json` with new completion percentages
3. Run validation: `node scripts/validate-config.js`

### To add a new cycle:
1. Create `config/cycles/cycle{X}.json` (or update existing placeholder)
2. Content directory structure already exists for C5-C10
3. Replace placeholder content with actual content
4. Update `cycle-status.json`
5. Update this MANIFEST

### Content file checklist per week:
- [ ] `forms.gs` (5 forms, 100 pts)
- [ ] `student-page.html` (Canvas page)
- [ ] `lesson-plan.md` (Teacher guide)
- [ ] `slides.pptx` (Presentation)
- [ ] Update `cycle-status.json`

---

*This manifest is maintained manually. Last update: 2025-12-06*
