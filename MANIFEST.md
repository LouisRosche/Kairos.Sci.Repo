# KAMS Science Curriculum Repository Manifest
## Complete Content Inventory

**Last Updated:** 2025-12-09
**Repository:** Kairos.Sci.Repo
**Maintainer:** Louis Rosche

---

## Repository Structure Overview

```
Kairos.Sci.Repo/
├── README.md                    # Quick start guide & navigation
├── ARCHITECTURE.md              # System design documentation
├── LESSONS-LEARNED.md           # Institutional knowledge
├── MANIFEST.md                  # This file - content inventory
│
├── config/                      # Configuration system
│   ├── master-config.json       # Global settings
│   ├── cycles/                  # Per-cycle configuration
│   │   ├── cycle03.json         # ✅ Active (Production)
│   │   ├── cycle04.json         # ✅ Complete (Ready for Deployment)
│   │   ├── cycle05.json         # ✅ Complete (3 weeks: Feb 23-Mar 12)
│   │   ├── cycle06.json         # ✅ Complete (5 weeks: Mar 24-Apr 24)
│   │   ├── cycle07.json         # ✅ Complete (4 weeks: Apr 27-May 22)
│   │   └── cycle08.json         # ✅ Complete (4 weeks: Jun 1-26 + Year-End + C9/C10)
│   #  (cycle09.json & cycle10.json archived to archive/deferred-cycles/)
│   └── schema/                  # Validation schemas
│       ├── cycle-schema.json    # ✅ Cycle config validation
│       ├── form-schema.json     # Form validation
│       └── mtss-schema.json     # MTSS validation
│
├── content/                     # All instructional content
│   ├── grade7/                  # Grade 7: Life & Earth Science
│   │   ├── cycle02/             # 📦 Legacy (4 weeks, pre-architecture)
│   │   ├── cycle03/             # ✅ Complete (W2 READ-ONLY)
│   │   ├── cycle04/             # ✅ Complete (100%)
│   │   ├── cycle05/             # ✅ Complete (3 weeks: Feb 23-Mar 12)
│   │   ├── cycle06/             # ✅ Complete (5 weeks: Mar 24-Apr 24)
│   │   ├── cycle07/             # ✅ Complete (4 weeks: Apr 27-May 22)
│   │   ├── cycle08/             # ✅ Complete (4 weeks: Jun 1-26 + Year-End)
│   ├── grade8/                  # Grade 8: Physical Science
│   │   ├── cycle02/             # 📦 Legacy (4 weeks, pre-architecture)
│   │   ├── cycle03/             # ✅ Complete (W2 READ-ONLY)
│   │   ├── cycle04/             # ✅ Complete (100%)
│   │   ├── cycle05/             # ✅ Complete (3 weeks)
│   │   ├── cycle06/             # ✅ Complete (5 weeks)
│   │   ├── cycle07/             # ✅ Complete (4 weeks)
│   │   ├── cycle08/             # ✅ Complete (4 weeks + Year-End)
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
│   ├── CONTENT-DESIGN-GUIDE.md  # ⭐ SST for content creation
│   ├── mtss-framework.md
│   ├── pedagogical-approach.md
│   ├── phet-simulations-catalog.md  # Digital resources catalog
│   ├── standards-alignment.md   # ✅ NGSS mapping
│   └── technical-reference.md
│
├── scripts/                     # Automation scripts
│   ├── TriggerManager.gs        # ⭐ Centralized trigger coordination
│   ├── generate-cycle.js        # Config generation
│   └── validate-config.js       # Cycle validation
│
├── shared/                      # Cross-grade utilities
│   ├── FormUtils.gs             # Form creation helpers
│   ├── FormSettings.gs          # Standard form settings
│   ├── DataUtils.gs             # Data retrieval utilities
│   ├── ValidationUtils.gs       # Config validation
│   └── styles/
│       └── design-system.css    # ⭐ CSS design tokens
│
├── templates/                   # Content generation templates
└── archive/                     # Legacy/backup files
```

---

## Content Status Dashboard

### Overall Progress

| Cycle | Grade 7 | Grade 8 | Weeks | Status |
|-------|---------|---------|-------|--------|
| **C2** | 75% 📦 | 75% 📦 | 4 | **LEGACY** (pre-architecture) |
| **C3** | 100% ✅ | 100% ✅ | 3 | **DEPLOYED** |
| **C4** | 100% ✅ | 100% ✅ | 3 | **READY FOR DEPLOYMENT** |
| **C5** | 100% ✅ | 100% ✅ | 3 | **COMPLETE** (Feb 23-Mar 12) |
| **C6** | 100% ✅ | 100% ✅ | 5 | **COMPLETE** (Mar 24-Apr 24) |
| **C7** | 100% ✅ | 100% ✅ | 4 | **COMPLETE** (Apr 27-May 22) |
| **C8** | 100% ✅ | 100% ✅ | 4 | **COMPLETE** (Jun 1-26, **Year-End**) |
| **C9** | — | — | — | Standards → C8; Topics deferred to SY26-27 |
| **C10** | — | — | — | **MERGED** → C8 Week 3 |

**Legend:** ✅ Complete | 🟡 In Progress | 📋 Placeholder | 📦 Legacy | ❌ Not Started | ⛔ Read-Only (Production)

---

## Cycle 2 - LEGACY CONTENT 📦

> **Note:** Cycle 2 is pre-architecture legacy content with 4 weeks instead of 3. See ARCHITECTURE.md for details.

### Grade 7: Molecular Structure, Bonding & Reactions (4 weeks)

| Week | forms.gs | student-page.html | lesson-plan.md | curriculum-design.md | simulations | Status |
|------|----------|-------------------|----------------|----------------------|-------------|--------|
| W1 | ❌ | ✅ | ❌ | ✅ (shared) | ✅ molecule-structure-explorer.html | **HTML READY** |
| W2 | ❌ | ✅ | ❌ | ✅ (shared) | — | **HTML READY** |
| W3 | ✅ | ✅ | ❌ | ✅ (shared) | — | **CONTENT READY** |
| W4 | ❌ | ✅ | ❌ | ✅ (shared) | — | **HTML READY** |

### Grade 8: Forces, Energy & Collisions (4 weeks)

| Week | forms.gs | student-page.html | lesson-plan.md | curriculum-design.md | simulations | Status |
|------|----------|-------------------|----------------|----------------------|-------------|--------|
| W1 | ❌ | ✅ | ❌ | ✅ (shared) | ✅ collision-force-simulator.html | **HTML READY** |
| W2 | ❌ | ✅ | ❌ | ✅ (shared) | — | **HTML READY** |
| W3 | ✅ | ✅ | ❌ | ✅ (shared) | — | **CONTENT READY** |
| W4 | ❌ | ✅ | ❌ | ✅ (shared) | — | **HTML READY** |

---

## Cycle 3 (ACTIVE) - 100% COMPLETE ✅

> **⛔ READ-ONLY NOTICE:** Week 2 content for both grades is **PRODUCTION** and must NOT be edited.
> It serves as legacy documentation. See `cycle-status.json` for details.

### Grade 7: Climate Change & Energy Flow

| Week | forms.gs | student-page.html | lesson-plan.md | slides.pptx | simulations | Status |
|------|----------|-------------------|----------------|-------------|-------------|--------|
| W1 | ✅ 1,021 lines | ✅ | ✅ | ✅ | ✅ carbon-cycle-tracer, thermal-trap-designer | **COMPLETE** |
| W2 | ✅ 960 lines | ✅ | ✅ | ✅ | ✅ ice-albedo-feedback, carbon-sink-simulator, ice-melt-mystery | **⛔ READONLY** |
| W3 | ✅ | ✅ | ✅ | ✅ | — | **COMPLETE** |

### Grade 8: Natural Selection & Forces

| Week | forms.gs | student-page.html | lesson-plan.md | slides.pptx | simulations | Status |
|------|----------|-------------------|----------------|-------------|-------------|--------|
| W1 | ✅ | ✅ | ✅ | ✅ | ✅ population-genetics, predator-prey-physics | **COMPLETE** |
| W2 | ✅ | ✅ | ✅ | ✅ | ✅ bone-homology-explorer, transitional-form-designer | **⛔ READONLY** |
| W3 | ✅ | ✅ | ✅ | ✅ | — | **COMPLETE** |

---

## Cycle 4 (READY FOR DEPLOYMENT) - 100% COMPLETE ✅

### Grade 7: Biogeochemical Cycles & Human Impact (100%)

| Week | forms.gs | student-page.html | lesson-plan.md | slides.pptx | simulations | Status |
|------|----------|-------------------|----------------|-------------|-------------|--------|
| W1 | ✅ 979 lines | ✅ 524 lines | ✅ 246 lines | ✅ | ✅ ocean-acidification-simulator | **COMPLETE** |
| W2 | ✅ 662 lines | ✅ 292 lines | ✅ 182 lines | ✅ | ✅ eutrophication-cascade-simulator | **COMPLETE** |
| W3 | ✅ 463 lines | ✅ 497 lines | ✅ 239 lines | ✅ | — | **COMPLETE** |

### Grade 8: Ecosystems & Energy Transfer (100%)

| Week | forms.gs | student-page.html | lesson-plan.md | slides.pptx | simulations | Status |
|------|----------|-------------------|----------------|-------------|-------------|--------|
| W1 | ✅ 991 lines | ✅ 501 lines | ✅ 357 lines | ✅ | ✅ energy-pyramid-calculator | **COMPLETE** |
| W2 | ✅ 982 lines | ✅ 502 lines | ✅ 203 lines | ✅ | ✅ trophic-cascade-simulator | **COMPLETE** |
| W3 | ✅ 482 lines | ✅ 490 lines | ✅ 240 lines | ✅ | — | **COMPLETE** |

> **Note:** All C4 content complete. Forms have placeholder URLs pending deployment.

---

## Cycles 5-8 (CONTENT COMPLETE - SY25-26)

Cycles 5-8 have complete content including curriculum designs, lesson plans, and rubrics for both grades:

| Cycle | Calendar Dates | Weeks | G7 Topic | G8 Topic | Status |
|-------|----------------|-------|----------|----------|--------|
| C5 | 2/23-3/12/2026 | 3 | Weather & Climate Systems | Waves & Information Transfer | ✅ Complete |
| C6 | 3/24-4/24/2026 | 5 | Plate Tectonics & Earth's Interior | Electricity & Magnetism | ✅ Complete |
| C7 | 4/27-5/22/2026 | 4 | Rock Cycle & Earth's History | Chemical Reactions & Conservation | ✅ Complete |
| C8 | 6/1-6/26/2026 | 4 | Ecosystems + **Year-End Integration** | Thermal Energy + **Engineering Showcase** | ✅ Complete |

**Note:** Cycle durations vary based on the official SY25-26 school calendar (not 3 weeks each).

## Cycles 9-10 (RESOLVED - Dec 2025)

> ✅ **Resolution:** Cycle 9 standards (MS-ESS1-2, MS-ETS1-2) integrated as secondary standards in Cycle 8. Cycle 10 Year-End Integration merged into Cycle 8 Week 3.

| Cycle | G7 Topic | G8 Topic | Resolution |
|-------|----------|----------|------------|
| C9 | Space Systems & Earth's Place | Engineering Design & Systems | **Standards integrated → C8 secondary**; Topics deferred to SY26-27 |
| C10 | Year-End Integration & Review | Year-End Integration & Review | **MERGED → Cycle 8 Week 3** |

Each cycle config (JSON) includes:
- Complete driving phenomena for all weeks
- Detailed misconceptions with targeting
- Full station structures (Hook, S1, S2, S3, Exit Ticket)
- Spiral standards and 3D learning components
- Materials lists and assessment structure

Content files completed (Dec 2025):
- ✅ `curriculum-design.md` - Complete for all C5-C8
- ✅ `rubrics.md` - Complete with exemplar responses
- ✅ `week{1,2,3}/lesson-plan.md` - Complete lesson plans
- ⬜ `week{1,2,3}/forms.gs` - Pending deployment
- ⬜ `week{1,2,3}/student-page.html` - Pending deployment

---

## Custom Simulations Inventory

### By Grade and Cycle

| Grade | Cycle | Week | Simulation | Purpose |
|-------|-------|------|------------|---------|
| G7 | C2 | W1 | molecule-structure-explorer.html | Molecular bonding visualization |
| G7 | C3 | W1 | carbon-cycle-tracer.html | Carbon atom tracking through systems |
| G7 | C3 | W1 | thermal-trap-designer.html | Greenhouse effect engineering |
| G7 | C3 | W2 | ice-albedo-feedback.html | Feedback loop visualization |
| G7 | C3 | W2 | carbon-sink-simulator.html | Carbon sink dynamics |
| G7 | C3 | W2 | ice-melt-mystery.html | Ice melt investigation |
| G7 | C4 | W1 | ocean-acidification-simulator.html | pH and carbonate chemistry |
| G7 | C4 | W2 | eutrophication-cascade-simulator.html | Nutrient cascade effects |
| G7 | C5 | W1 | air-mass-collision-simulator.html | Weather front formation |
| G7 | C5 | W2 | weather-prediction-simulator.html | Forecasting challenges |
| G8 | C2 | W1 | collision-force-simulator.html | Newton's laws in collisions |
| G8 | C3 | W1 | population-genetics.html | Allele frequency changes |
| G8 | C3 | W1 | predator-prey-physics.html | Force analysis in predation |
| G8 | C3 | W2 | bone-homology-explorer.html | Comparative anatomy |
| G8 | C3 | W2 | transitional-form-designer.html | Evolutionary predictions |
| G8 | C4 | W1 | energy-pyramid-calculator.html | Trophic level energy transfer |
| G8 | C4 | W2 | trophic-cascade-simulator.html | Ecosystem disruption modeling |

**Total Custom Simulations:** 17

---

## File Inventory by Directory

### `/config/` - Configuration System

| File | Purpose | Status |
|------|---------|--------|
| `master-config.json` | Global settings, naming conventions | ✅ Complete |
| `cycles/cycle03.json` | C3 specs (active, 408 lines) | ✅ Complete |
| `cycles/cycle04.json` | C4 specs (337 lines) | ✅ Complete |
| `cycles/cycle05.json` | C5 specs (Weather/Waves) | ✅ Complete |
| `cycles/cycle06.json` | C6 specs (Tectonics/E&M) | ✅ Complete |
| `cycles/cycle07.json` | C7 specs (Rock Cycle/Reactions) | ✅ Complete |
| `cycles/cycle08.json` | C8 specs (Ecosystems/Thermal + YE) | ✅ Complete |
| `cycles/cycle09.json` | C9 specs (standards → C8) | ✅ Resolved (deferred topics) |
| `cycles/cycle10.json` | C10 Year-End (merged → C8) | ✅ Resolved (merged) |
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
| `hub/HubOrchestrator.gs` | Pipeline orchestration | ✅ Complete |
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
| `mtss/InterventionGrouping.gs` | Student grouping engine | ✅ Complete |
| `mtss/tier-definitions.json` | MTSS tier thresholds | ✅ Complete |
| `mtss/output/tier2-students.json` | Tier 2 student list | ✅ Ready |
| `mtss/output/tier3-students.json` | Tier 3 student list | ✅ Ready |

### `/framework/` - Pedagogical Documentation

| File | Purpose | Status |
|------|---------|--------|
| `CONTENT-DESIGN-GUIDE.md` | **SST for content creation** | ✅ Complete |
| `mtss-framework.md` | MTSS intervention system | ✅ Complete |
| `pedagogical-approach.md` | Teaching philosophy | ✅ Complete |
| `phet-simulations-catalog.md` | Digital resources & custom builds | ✅ Complete |
| `standards-alignment.md` | NGSS mapping across cycles | ✅ Complete |
| `technical-reference.md` | Technical specifications | ✅ Complete |

### `/scripts/` - Automation

| File | Purpose | Status |
|------|---------|--------|
| `TriggerManager.gs` | **Centralized trigger coordination** | ✅ Complete |
| `generate-cycle.js` | Cycle config generation | ✅ Complete |
| `validate-config.js` | Config validation | ✅ Complete |
| `deploy-forms.gs` | Form deployment | ✅ Complete |
| `nightly-aggregation.gs` | Scheduled data collection | ✅ Complete |

### `/shared/` - Utilities

| File | Purpose | Status |
|------|---------|--------|
| `FormUtils.gs` | Form helpers (configSecurity, addCalcItem, rubrics) | ✅ Complete |
| `FormSettings.gs` | Standard Google Form settings & API constraints | ✅ Complete |
| `DataUtils.gs` | Statistical utilities (average, median, stdDev, findMode) | ✅ Complete |
| `ValidationUtils.gs` | Config validation | ✅ Complete |
| `styles/design-system.css` | **CSS design tokens** | ✅ Complete |

> **Note:** Config.gs and Constants.gs were designed but never adopted in production. They have been archived to `archive/deprecated-shared/` (Dec 2025).

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
| Simulations | `lowercase-hyphenated.html` | `air-mass-collision-simulator.html` |
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
| Total files | 180+ |
| Complete content files | 100+ |
| Placeholder files | 20+ |
| Custom simulations | 17 |
| Template files | 9 |
| Configuration files | 10 |
| Infrastructure files | 15 |
| Complete cycles | 7 (C2, C3, C4, C5, C6, C7, C8) |
| In-progress cycles | 0 |
| Placeholder cycles | 0 |
| Resolved cycles | 2 (C9 standards → C8, C10 merged → C8 W3) |

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
- [ ] `simulations/` (if applicable)
- [ ] Update `cycle-status.json`

---

*This manifest is maintained manually. Last update: 2025-12-09*
