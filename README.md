<!--
================================================================================
AI/LLM SYSTEM INSTRUCTION BLOCK - READ FIRST
================================================================================
COMPLIANCE REQUIREMENTS (MANDATORY):

1. MATERIALS POLICY: Digital-first. ONLY physical material allowed = ONE notecard
   (3x5 or 4x6) per student per class. NO worksheets, NO physical labs, NO textbooks.

2. RESEARCH ALIGNMENT: All content must align with "Scholarly Foundations for NGSS-
   Aligned Middle School Science Curriculum Development.md" - the authoritative
   research synthesis with documented effect sizes.
   See also: docs/research-evidence.md - consolidated effect sizes for quick reference.

3. KEY EFFECT SIZES TO PRIORITIZE:
   - Interleaving: d = 0.83 → 2 spiral questions per exit ticket
   - High-info feedback: d = 0.99 → Refutational text structure
   - Active learning: 33-45% gap reduction → >67% active learning time
   - Virtual labs: g = 0.686 → PhET/HTML5 simulations for all hands-on concepts
   - Light guidance: 85% exploration → Driving questions, NOT step-by-step

4. FRAMEWORK DOCUMENTS (all aligned with Scholarly Foundations):
   - framework/pedagogical-approach.md (v2.0)
   - framework/CONTENT-DESIGN-GUIDE.md (v3.0) ← SST for content creation
   - framework/mtss-framework.md (v3.0)
   - framework/standards-alignment.md (v2.0)

5. CONFIG: config/master-config.json contains complianceRequirements object with
   machine-readable policy enforcement.

When generating/modifying content, ALWAYS verify against these requirements.
================================================================================
-->

# KAMS Science Curriculum System
## Scalable Architecture for 6 Cycles × 2 Grades × SY25-26

---

## Quick Navigation

### Currently Active: Cycle 3 (Dec 1-19, 2025)

| Resource | Grade 7 | Grade 8 |
|----------|---------|---------|
| **Lesson Plans** | [W1](content/grade7/cycle03/week1/lesson-plan.md) · [W2](content/grade7/cycle03/week2/lesson-plan.md) · [W3](content/grade7/cycle03/week3/lesson-plan.md) | [W1](content/grade8/cycle03/week1/lesson-plan.md) · [W2](content/grade8/cycle03/week2/lesson-plan.md) · [W3](content/grade8/cycle03/week3/lesson-plan.md) |
| **Student Pages** | [W1](content/grade7/cycle03/week1/student-page.html) · [W2](content/grade7/cycle03/week2/student-page.html) · [W3](content/grade7/cycle03/week3/student-page.html) | [W1](content/grade8/cycle03/week1/student-page.html) · [W2](content/grade8/cycle03/week2/student-page.html) · [W3](content/grade8/cycle03/week3/student-page.html) |
| **Forms Scripts** | [W1](content/grade7/cycle03/week1/forms.gs) · [W2](content/grade7/cycle03/week2/forms.gs) · [W3](content/grade7/cycle03/week3/forms.gs) | [W1](content/grade8/cycle03/week1/forms.gs) · [W2](content/grade8/cycle03/week2/forms.gs) · [W3](content/grade8/cycle03/week3/forms.gs) |
| **Curriculum Design** | [G7 C3](content/grade7/cycle03/curriculum-design.md) | [G8 C3](content/grade8/cycle03/curriculum-design.md) |

### Ready for Deployment: Cycle 4

| Resource | Grade 7 | Grade 8 |
|----------|---------|---------|
| **Lesson Plans** | [W1](content/grade7/cycle04/week1/lesson-plan.md) · [W2](content/grade7/cycle04/week2/lesson-plan.md) · [W3](content/grade7/cycle04/week3/lesson-plan.md) | [W1](content/grade8/cycle04/week1/lesson-plan.md) · [W2](content/grade8/cycle04/week2/lesson-plan.md) · [W3](content/grade8/cycle04/week3/lesson-plan.md) |
| **Student Pages** | [W1](content/grade7/cycle04/week1/student-page.html) · [W2](content/grade7/cycle04/week2/student-page.html) · [W3](content/grade7/cycle04/week3/student-page.html) | [W1](content/grade8/cycle04/week1/student-page.html) · [W2](content/grade8/cycle04/week2/student-page.html) · [W3](content/grade8/cycle04/week3/student-page.html) |
| **Curriculum Design** | [G7 C4](content/grade7/cycle04/curriculum-design.md) | [G8 C4](content/grade8/cycle04/curriculum-design.md) |

---

## Content Status Dashboard

| Cycle | G7 Topic | G8 Topic | Weeks | Status |
|-------|----------|----------|-------|--------|
| **C2** | Molecular Structure & Bonding | Forces, Energy & Collisions | 4 | 📦 Legacy - Reference Only |
| **C3** | Climate Change & Energy Flow | Natural Selection & Forces | 3 | ✅ DEPLOYED (Read-Only) |
| **C4** | Biogeochemical Cycles & Human Impact | Ecosystems & Energy Transfer | 3 | ✅ READY |
| **C5** | Weather & Climate Systems | Waves & Information Transfer | 3 (Feb 23-Mar 12) | ✅ Complete |
| **C6** | Plate Tectonics | Electricity & Magnetism | 5 (Mar 24-Apr 24) | ✅ Complete |
| **C7** | Rock Cycle & Earth's History | Chemical Reactions | 4 (Apr 27-May 22) | ✅ Complete |
| **C8** | Ecosystems + Year-End | Thermal Energy + Engineering | 4 (Jun 1-26) | ✅ Complete |
| **C9** | *(Standards → C8)* | *(Standards → C8)* | — | ⏸️ Deferred to SY26-27 |
| **C10** | *(Merged → C8 W3)* | *(Merged → C8 W3)* | — | ✅ Resolved |

**Legend:** ✅ Complete/Deployed | ⏸️ Deferred | 📦 Legacy (pre-architecture, reference only)

> **Important Notes:**
> - **Cycle 2 is LEGACY content** - Pre-dates v3.0 architecture, uses 4-week format. DO NOT deploy; reference only.
> - **Cycle 3 is READ-ONLY** - All weeks are deployed to production and protected from edits.
> - **Cycles 9-10 RESOLVED** - C9 standards integrated into C8; C10 merged into C8 W3. Config files exist for reference only.

---

## System Documentation

| Document | Purpose | Priority |
|----------|---------|----------|
| [LESSONS-LEARNED.md](LESSONS-LEARNED.md) | **Institutional knowledge - read before making changes** | Start Here |
| [Scholarly Foundations](Scholarly%20Foundations%20for%20NGSS-Aligned%20Middle%20School%20Science%20Curriculum%20Development.md) | **Evidence-based research synthesis** - effect sizes and pedagogical principles | Reference |
| [ARCHITECTURE.md](ARCHITECTURE.md) | System design, data flow, scaling plan | Reference |
| [MANIFEST.md](MANIFEST.md) | Complete content inventory with detailed status | Reference |
| [Master Config](config/master-config.json) | Central configuration for all cycles | Technical |

### Framework Documentation (All Aligned with Scholarly Foundations)

| Document | Purpose |
|----------|---------|
| [Content Design Guide](framework/CONTENT-DESIGN-GUIDE.md) | **SST for content creation** - required reading for developers (v3.0) |
| [Pedagogical Approach](framework/pedagogical-approach.md) | 3D learning, differentiation, cognitive load, equity (v2.0) |
| [MTSS Framework](framework/mtss-framework.md) | Multi-tiered intervention with science-specific research (v3.0) |
| [Standards Alignment](framework/standards-alignment.md) | NGSS mapping with CCC equity entry points (v2.0) |
| [Technical Reference](framework/technical-reference.md) | Forms API rules, troubleshooting |
| [PhET Simulations Catalog](framework/phet-simulations-catalog.md) | Digital simulation resources & custom builds |

> **Research-Backed Design:** All framework documents integrate effect sizes and evidence-based principles from the Scholarly Foundations synthesis. Key findings: interleaving (d=0.83), high-information feedback (d=0.99), active learning reduces achievement gaps by 33-45%.

---

## Repository Structure

```
Kairos.Sci.Repo/
├── README.md                              # You are here
├── ARCHITECTURE.md                        # System design document
├── LESSONS-LEARNED.md                     # Institutional knowledge
├── MANIFEST.md                            # Complete content inventory
│
├── config/                                # Master configuration
│   ├── master-config.json                 # Global settings
│   ├── cycles/                            # Per-cycle configuration
│   │   ├── cycle03.json                   # ✅ Active (Production)
│   │   ├── cycle04.json                   # ✅ Complete (Ready)
│   │   ├── cycle05.json                   # 🟡 In Progress (3 wks)
│   │   ├── cycle06.json                   # 🟡 In Progress (5 wks)
│   │   ├── cycle07.json                   # 🟡 In Progress (4 wks)
│   │   ├── cycle08.json                   # 🟡 In Progress (4 wks + Year-End)
│   │   ├── cycle09.json                   # ⚠️ Deferred (standards → C8)
│   │   └── cycle10.json                   # ⚠️ Merged (→ C8 W3)
│   └── schema/                            # Validation schemas
│
├── content/                               # All instructional content
│   ├── grade7/
│   │   ├── cycle02/                       # 📦 Legacy (4-week format)
│   │   ├── cycle03/                       # ✅ Complete (W2 READ-ONLY)
│   │   │   ├── cycle-status.json          # Status tracking
│   │   │   ├── curriculum-design.md
│   │   │   ├── rubrics.md
│   │   │   └── week{1,2,3}/
│   │   │       ├── forms.gs
│   │   │       ├── lesson-plan.md
│   │   │       ├── student-page.html
│   │   │       └── simulations/           # Custom HTML5 simulations
│   │   ├── cycle04/                       # ✅ Complete (100%)
│   │   ├── cycle05/                       # 🟡 85% (lessons complete, slides pending)
│   │   ├── cycle06/                       # 🟡 60% (lessons + Pangaea sim)
│   │   ├── cycle07/                       # 🟡 65% (lessons + 2 sims)
│   │   └── cycle08/                       # 🟡 65% (lessons + 2 sims)
│   ├── grade8/
│   │   └── ... (same structure)
│   └── resources/                         # Cross-grade materials
│       ├── audit-w2-content.md            # Accessibility audit
│       └── exemplars-cycle03-week2.md     # Model responses
│
├── data/                                  # Data aggregation & MTSS
│   ├── hub/
│   │   ├── KAMS-Science-Hub.xlsx          # Master data hub
│   │   ├── HubOrchestrator.gs             # Pipeline coordination
│   │   └── hub-setup-guide.md
│   ├── aggregation/
│   │   ├── ResponseCollector.gs
│   │   ├── DataAggregator.gs
│   │   └── output/
│   ├── analysis/
│   │   ├── ThreeDimensionalAnalyzer.gs
│   │   ├── MisconceptionTracker.gs
│   │   └── SpiralEffectiveness.gs
│   ├── mtss/
│   │   ├── InterventionGenerator.gs
│   │   ├── InterventionGrouping.gs
│   │   └── tier-definitions.json
│   └── FormRegistry.gs
│
├── framework/                             # Pedagogical documentation
│   ├── CONTENT-DESIGN-GUIDE.md            # Content creation SST
│   ├── pedagogical-approach.md
│   ├── technical-reference.md
│   ├── mtss-framework.md
│   ├── standards-alignment.md
│   └── phet-simulations-catalog.md        # Digital resources
│
├── shared/                                # Cross-grade utilities
│   ├── Config.gs                          # Centralized configuration
│   ├── Constants.gs                       # Immutable system values
│   ├── FormUtils.gs
│   ├── DataUtils.gs
│   ├── ValidationUtils.gs
│   └── styles/
│       └── design-system.css              # CSS design tokens
│
├── scripts/                               # Automation
│   ├── TriggerManager.gs                  # Centralized trigger coordination
│   ├── generate-cycle.js
│   ├── validate-config.js
│   ├── deploy-forms.gs
│   └── nightly-aggregation.gs
│
├── templates/                             # Content generation
│   ├── forms/
│   ├── html/
│   └── docs/
│
└── archive/                               # Historical reference
```

---

## System Overview

### Scale (SY25-26)
- **6 Active Cycles** (Cycles 3-8)
- **2 Grades** (7 & 8)
- **Variable Weeks per Cycle** (3-5 weeks per school calendar; 19 total instructional weeks)
- **5 Forms per Week** (up to 360 Google Forms)
- **100 Points per Week** (consistent structure)

### Point Structure (Per Week = 100 pts)

| Form | Points | Auto-Graded | Focus |
|------|--------|-------------|-------|
| Hook | 12 | ~25% | Phenomenon engagement, prior knowledge |
| Station 1 | 20 | ~50% | Core concept with spiral retrieval |
| Station 2 | 20 | ~40% | Application with manipulatives/simulations |
| Station 3 | 25 | 0% | Engineering design (rubric-scored) |
| Exit Ticket | 23 | ~35% | 2 new + 2 spiral + 1 integration + 1 SEP |

### MTSS Tiers

| Tier | Range | Target | Support |
|------|-------|--------|---------|
| **1** | 70-100% | ~80% | Standard differentiation |
| **2** | 50-69% | ~15% | Small group reteach, peer tutoring |
| **3** | 0-49% | ~5% | 1:1 intervention, alternative assessment |

---

## Quick Start

### For Teachers

1. **Find your content:** Use Quick Navigation above or browse `content/grade{7|8}/cycle{03-08}/`
2. **Check cycle status:** Review `cycle-status.json` in each cycle folder
3. **Deploy forms:** Run `forms.gs` in Google Apps Script
4. **Get student page:** Upload `student-page.html` to Canvas
5. **Follow lesson plan:** Daily schedules and instructions in `lesson-plan.md`

### For Content Development

1. **Read first:** [LESSONS-LEARNED.md](LESSONS-LEARNED.md) and [Content Design Guide](framework/CONTENT-DESIGN-GUIDE.md)
2. **Check what exists:** Review [MANIFEST.md](MANIFEST.md) and `cycle-status.json` files
3. **Use templates:** `templates/` for consistent formatting
4. **Update tracking:** Modify `cycle-status.json` when adding content
5. **Run validation:** `node scripts/validate-config.js`

---

## Infrastructure Status

### Complete
- ✅ Configuration system (JSON-based, centralized via `Config.gs`)
- ✅ Cycle configs (C3-C10 with status tracking)
- ✅ Data aggregation pipeline (with comprehensive error handling)
- ✅ 3D learning analyzer
- ✅ MTSS intervention framework
- ✅ Complete cycle content (C3-C4 fully complete; C5-C8 lesson plans complete)
- ✅ Status tracking (cycle-status.json)
- ✅ Trigger management (centralized, staggered) - includes seating analysis & health check
- ✅ CSS design system
- ✅ Custom simulations (22 HTML5 sims across C2-C8)
- ✅ PhET integration catalog
- ✅ Seating correlation analyzer (integrated with weekly triggers)
- ✅ System health check (daily 7 AM diagnostic)
- ✅ Test utilities (`scripts/TestUtils.gs`)

### Pending
- ⬜ Automated form deployment
- ⬜ Canvas gradebook sync (currently manual - see DEPLOYMENT-CHECKLIST.md)
- ⬜ Teacher dashboard

---

## Known Limitations

| Limitation | Status | Workaround |
|------------|--------|------------|
| **Canvas Grade Sync** | Manual process | Export from Hub Gradebook, import CSV to Canvas |
| **Cycle 2 Content** | Legacy, incomplete | Reference only - do not deploy |
| **Cycles 9-10** | Deferred/merged | Standards integrated into C8; configs exist for reference |
| **Apps Script Triggers** | ±30 min precision | Triggers run at hour start, not exact minute |
| **Automated Tests** | Basic validation available | Run `runAllTests()` from `scripts/TestUtils.gs` |

See [LESSONS-LEARNED.md](LESSONS-LEARNED.md) for detailed institutional knowledge.

---

## Custom Simulations

Interactive HTML5 simulations built for digital-first instruction:

| Grade | Cycle | Simulation | Location |
|-------|-------|------------|----------|
| G7 | C2 | Molecule Structure Explorer | `grade7/cycle02/week1/simulations/` |
| G7 | C3 | Carbon Cycle Tracer, Thermal Trap Designer | `grade7/cycle03/week1/simulations/` |
| G7 | C3 | Ice Albedo Feedback, Carbon Sink Simulator | `grade7/cycle03/week2/simulations/` |
| G7 | C4 | Ocean Acidification, Eutrophication Cascade | `grade7/cycle04/week{1,2}/simulations/` |
| G7 | C5 | Air Mass Collision, Weather Prediction | `grade7/cycle05/week{1,2}/simulations/` |
| G7 | C6 | Pangaea Puzzle Reconstruction | `grade7/cycle06/week2/simulations/` |
| G7 | C7 | Rock Cycle Explorer, Geologic Time Explorer | `grade7/cycle07/week{1,2}/simulations/` |
| G7 | C8 | Trophic Cascade, Biodiversity Resilience | `grade7/cycle08/week{1,2}/simulations/` |
| G8 | C2 | Collision Force Simulator | `grade8/cycle02/week1/simulations/` |
| G8 | C3 | Population Genetics, Predator-Prey Physics | `grade8/cycle03/week1/simulations/` |
| G8 | C3 | Bone Homology Explorer, Transitional Form Designer | `grade8/cycle03/week2/simulations/` |
| G8 | C4 | Energy Pyramid Calculator, Trophic Cascade | `grade8/cycle04/week{1,2}/simulations/` |

See [PhET Simulations Catalog](framework/phet-simulations-catalog.md) for third-party simulation integration.

---

## Calendar Alignment (SY25-26)

| Cycle | Calendar Dates | Weeks | G7 Topic | G8 Topic |
|-------|----------------|-------|----------|----------|
| **C3** | Dec 1-19, 2025 | 3 | Climate Change & Energy Flow | Natural Selection & Forces |
| **C4** | Jan 6-24, 2026 | 3 | Biogeochemical Cycles | Ecosystems & Energy Transfer |
| **C5** | Feb 23 - Mar 12, 2026 | 3 | Weather & Climate Systems | Waves & Information Transfer |
| **C6** | Mar 24 - Apr 24, 2026 | 5 | Plate Tectonics | Electricity & Magnetism |
| **C7** | Apr 27 - May 22, 2026 | 4 | Rock Cycle & Earth's History | Chemical Reactions |
| **C8** | Jun 1-26, 2026 | 4 | Ecosystems + Year-End | Thermal Energy + Showcase |

---

## Materials Policy

> **Digital-First Requirement:** All instructional materials are digital-hosted in this repository. The ONLY permitted physical material is **one 3×5 or 4×6 notecard per student per class period**.

**Rationale (Research-Backed):**
- Digital notebooks: γ = 0.34 learning improvement (Rappolt-Schlichtmann et al., 2013)
- Virtual labs: g = 0.686 positive outcomes (2024 PLOS ONE)
- Enables 100% async accessibility, UDL supports, and MTSS monitoring

---

## Version History

| Date | Change |
|------|--------|
| **2025-12-10** | **Infrastructure Improvements:** Added comprehensive error handling to data pipeline; resolved C9-10 status; protected all deployed content as read-only; completed form templates with example implementations; clarified Canvas integration status; added Known Limitations section |
| 2025-12-09 | **Scholarly Foundations Integration:** All framework docs updated with research effect sizes; Materials Policy established (digital-first, notecard-only); CCC equity entry points; MTSS science-specific research |
| 2025-12-08 | Major update: C4 complete (100%), G7 C5 at 85%, C9-10 resolution documented, simulations catalog added |
| 2025-12-07 | Complete codebase audit: fixed schemas, NGSS standards, stubs, status tracking, added C2 config |
| 2025-12-05 | Organizational audit: standardized structure, added C5-C10 placeholders, cycle-status.json tracking |
| 2025-12-04 | Added scalable architecture, config system, MTSS framework, 3D analysis |
| 2025-12-04 | Initial reorganization for teaching/learning utility |
| 2025-12-01 | Cross-pollination improvements from audit |
| 2025-11-30 | Initial Cycle 3 curriculum design |

---

*KAMS Science Curriculum System | Version 3.3.0 | December 2025*
*Aligned with Scholarly Foundations for NGSS-Aligned Middle School Science Curriculum Development*
