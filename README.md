# KAMS Science Curriculum System
## Scalable Architecture for 8 Cycles × 2 Grades × 3 Weeks

---

## Quick Navigation

### Active Cycle Resources (Cycles 3-4)

| Task | Grade 7 | Grade 8 |
|------|---------|---------|
| **Week 1 Lesson** | [Lesson Plan](content/grade7/cycle03/week1/lesson-plan.md) | [Lesson Plan](content/grade8/cycle03/week1/lesson-plan.md) |
| **Week 2 Lesson** | [Lesson Plan](content/grade7/cycle03/week2/lesson-plan.md) | [Lesson Plan](content/grade8/cycle03/week2/lesson-plan.md) |
| **Week 3 Lesson** | [Lesson Plan](content/grade7/cycle03/week3/lesson-plan.md) | [Lesson Plan](content/grade8/cycle03/week3/lesson-plan.md) |
| **Student Pages** | [W1](content/grade7/cycle03/week1/student-page.html) · [W2](content/grade7/cycle03/week2/student-page.html) · [W3](content/grade7/cycle03/week3/student-page.html) | [W1](content/grade8/cycle03/week1/student-page.html) · [W2](content/grade8/cycle03/week2/student-page.html) · [W3](content/grade8/cycle03/week3/student-page.html) |
| **Forms Scripts** | [Week 1](content/grade7/cycle03/week1/forms.gs) · [Week 2](content/grade7/cycle03/week2/forms.gs) · [Week 3](content/grade7/cycle03/week3/forms.gs) | [Week 1](content/grade8/cycle03/week1/forms.gs) · [Week 2](content/grade8/cycle03/week2/forms.gs) · [Week 3](content/grade8/cycle03/week3/forms.gs) |

### For Planning & Assessment

| Resource | Grade 7 | Grade 8 |
|----------|---------|---------|
| **Curriculum Design** | [G7 Cycle 3](content/grade7/cycle03/curriculum-design.md) | [G8 Cycle 3](content/grade8/cycle03/curriculum-design.md) |
| **Rubrics** | [G7 Rubrics](content/grade7/cycle03/rubrics.md) | [G8 Rubrics](content/grade8/cycle03/rubrics.md) |
| **Exemplars** | [C3W2 Model Responses](content/resources/exemplars-cycle03-week2.md) | Same file |

### System Documentation

| Document | Purpose |
|----------|---------|
| [ARCHITECTURE.md](ARCHITECTURE.md) | Complete system design, data flow, scaling plan |
| [LESSONS-LEARNED.md](LESSONS-LEARNED.md) | **Institutional knowledge - read before making changes** |
| [MANIFEST.md](MANIFEST.md) | Complete content inventory with status |
| [Master Config](config/master-config.json) | Central configuration for all cycles |
| [MTSS Framework](framework/mtss-framework.md) | Multi-tiered intervention system |
| [Pedagogical Approach](framework/pedagogical-approach.md) | 3D learning, differentiation |
| [Technical Reference](framework/technical-reference.md) | Forms API rules, troubleshooting |
| [Content Design Guide](framework/CONTENT-DESIGN-GUIDE.md) | SST for content creation standards |

---

## Content Status Dashboard

| Cycle | G7 Topic | G8 Topic | Status |
|-------|----------|----------|--------|
| **C3** | Climate Change & Energy Flow | Natural Selection & Forces | ✅ Complete |
| **C4** | Biogeochemical Cycles & Human Impact | Ecosystems & Energy Transfer | ✅ Complete |
| **C5** | Weather & Climate Systems | Waves & Information Transfer | ✅ Config Complete |
| **C6** | Plate Tectonics & Earth's Interior | Electricity & Magnetism | ✅ Config Complete |
| **C7** | Rock Cycle & Earth's History | Chemical Reactions & Conservation | ✅ Config Complete |
| **C8** | Ecosystems & Biodiversity + Year-End | Thermal Energy + Engineering | ✅ Config Complete |
| **C9** | *(Standards → C8)* | *(Standards → C8)* | ⚠️ Deferred to SY26-27 |
| **C10** | *(Merged → C8 W3)* | *(Merged → C8 W3)* | ✅ Resolved |

---

## Repository Structure

```
C3.Repo/
├── README.md                              # You are here
├── ARCHITECTURE.md                        # System design document
├── MANIFEST.md                            # Complete content inventory
│
├── config/                                # Master configuration
│   ├── master-config.json                 # Global settings
│   ├── cycles/                            # Per-cycle configuration
│   │   ├── cycle03.json                   # ✅ Complete (Production)
│   │   ├── cycle04.json                   # ✅ Complete
│   │   ├── cycle05-08.json                # ✅ Config Complete
│   │   └── cycle09-10.json                # ⚠️ Deferred/Merged
│   └── schema/                            # Validation schemas
│
├── content/                               # All instructional content
│   ├── grade7/
│   │   ├── cycle03/                       # ✅ Complete (W2 READ-ONLY)
│   │   │   ├── cycle-status.json          # Status tracking
│   │   │   ├── curriculum-design.md
│   │   │   ├── rubrics.md
│   │   │   └── week{1,2,3}/
│   │   ├── cycle04/                       # ✅ Complete
│   │   └── cycle05-08/                    # 🟡 Content In Progress
│   ├── grade8/
│   │   └── ... (same structure)
│   └── resources/                         # Cross-grade materials
│       ├── audit-w2-content.md            # Accessibility audit
│       └── exemplars-cycle03-week2.md     # Model responses
│
├── data/                                  # Data aggregation & MTSS
│   ├── hub/
│   │   ├── KAMS-Science-Hub.xlsx          # Master data hub
│   │   └── HubOrchestrator.gs
│   ├── aggregation/
│   │   ├── ResponseCollector.gs
│   │   ├── DataAggregator.gs
│   │   └── output/
│   ├── analysis/
│   │   ├── ThreeDimensionalAnalyzer.gs
│   │   └── templates/
│   ├── mtss/
│   │   ├── InterventionGenerator.gs
│   │   └── InterventionGrouping.gs
│   └── FormRegistry.gs
│
├── framework/                             # Pedagogical documentation
│   ├── pedagogical-approach.md
│   ├── technical-reference.md
│   └── mtss-framework.md
│
├── shared/                                # Cross-grade utilities
│   ├── FormUtils.gs
│   ├── DataUtils.gs
│   └── ValidationUtils.gs
│
├── templates/                             # Content generation
│   ├── forms/
│   ├── html/
│   └── docs/
│
├── scripts/                               # Automation
│   ├── generate-cycle.js
│   ├── validate-config.js
│   ├── deploy-forms.gs
│   └── nightly-aggregation.gs
│
└── archive/                               # Historical reference
```

---

## System Overview

### Scale
- **8 Cycles** (Cycle 3-10, academic year)
- **2 Grades** (7 & 8, expandable)
- **3 Weeks per Cycle** (24 instructional weeks)
- **5 Forms per Week** (up to 480 total forms)
- **100 Points per Week** (consistent structure)

### Point Structure (Per Week = 100 pts)

| Form | Points | Auto-Graded | Focus |
|------|--------|-------------|-------|
| Hook | 12 | ~25% | Phenomenon engagement, prior knowledge |
| Station 1 | 20 | ~50% | Core concept with spiral retrieval |
| Station 2 | 20 | ~40% | Application with manipulatives |
| Station 3 | 25 | 0% | Engineering design (rubric-scored) |
| Exit Ticket | 23 | ~35% | 2 new + 2 spiral + 1 integration + 1 SEP-1 |

### MTSS Tiers

| Tier | Range | Population | Support |
|------|-------|------------|---------|
| **1** | 70-100% | ~80% target | Standard differentiation |
| **2** | 50-69% | ~15% target | Small group reteach, peer tutoring |
| **3** | 0-49% | ~5% target | 1:1 intervention, alternative assessment |

---

## Quick Start

### For Teachers

1. **Find your content:** `content/grade{7|8}/cycle03/week{1|2|3}/`
2. **Check status:** `cat content/grade7/cycle03/cycle-status.json`
3. **Deploy forms:** Run `forms.gs` in Google Apps Script
4. **Get student page:** Upload `student-page.html` to Canvas
5. **Follow lesson plan:** `lesson-plan.md` has daily schedules

### For Content Development

1. **Check what exists:** Review [MANIFEST.md](MANIFEST.md)
2. **Find placeholders:** Look for `📋` status in cycle-status.json
3. **Use templates:** `templates/` for consistent formatting
4. **Update tracking:** Modify `cycle-status.json` when adding content

---

## Infrastructure Status

- ✅ Configuration system (JSON-based, all cycles)
- ✅ Data aggregation scripts
- ✅ 3D learning analyzer
- ✅ MTSS intervention framework
- ✅ Complete cycle configs (C5-C8)
- ✅ Status tracking (cycle-status.json)
- ⬜ Automated form deployment
- ⬜ Canvas gradebook sync
- ⬜ Teacher dashboard

---

## Version History

| Date | Change |
|------|--------|
| 2025-12-07 | Complete codebase audit: fixed schemas, NGSS standards, stubs, status tracking, added C2 config |
| 2025-12-05 | Organizational audit: standardized structure, added C5-C10 placeholders, cycle-status.json tracking |
| 2025-12-04 | Added scalable architecture, config system, MTSS framework, 3D analysis |
| 2025-12-04 | Initial reorganization for teaching/learning utility |
| 2025-12-01 | Cross-pollination improvements from audit |
| 2025-11-30 | Initial Cycle 3 curriculum design |

---

*KAMS Science Curriculum System | Version 3.0.0 | December 2025*
