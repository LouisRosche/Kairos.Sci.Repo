# KAMS Science Curriculum System Architecture
## Scalable Design for 6 Cycles × 2 Grades × SY25-26

**Version 3.1.0** | December 2025

---

## Overview

This document defines the organizational architecture for a complete middle school science curriculum system supporting:
- **6 Cycles in SY25-26** (Cycles 3-8 per Kairos_SY25-26_Calendar.md; cycles 9-10 deferred)
- **2 Grades** (7 & 8, expandable to 6-9)
- **Variable Weeks per Cycle** (3-5 weeks per school calendar; 19 total weeks in SY25-26)
- **5 Forms per Week** (360 total Google Forms in SY25-26)
- **Data-driven MTSS** (Multi-Tiered System of Supports)

> **Calendar Alignment Note (Dec 2025):** The school calendar only accommodates cycles 3-8 within SY25-26. Cycles 9-10 exist in the config system but have been marked as "deferred" pending a decision on whether to consolidate their topics into cycles 3-8 or defer to SY26-27.

### v3.0 Architectural Principles

1. **Single Source of Truth** - All configuration in `config/master-config.json` and `config/cycles/*.json`
2. **Unified Trigger Management** - No race conditions via `scripts/TriggerManager.gs`
3. **Design Token System** - CSS variables in `shared/styles/design-system.css`
4. **Semantic HTML** - Accessible, well-structured templates

---

## Directory Structure

```
Kairos.Sci.Repo/
├── README.md                          # Quick navigation & teacher workflow
├── ARCHITECTURE.md                    # This document
├── LESSONS-LEARNED.md                 # ⭐ Institutional knowledge - read first!
│
├── config/                            # Master configuration (JSON)
│   ├── master-config.json             # All cycles, grades, standards
│   ├── schema/
│   │   ├── cycle-schema.json          # Validation schema for cycles
│   │   ├── form-schema.json           # Question/form structure
│   │   └── mtss-schema.json           # Intervention thresholds
│   └── cycles/
│       ├── cycle03.json               # ✅ Active
│       ├── cycle04.json               # ✅ Complete
│       ├── cycle05.json               # ✅ Complete (2/23-3/12)
│       ├── cycle06.json               # ✅ Complete (3/24-4/24)
│       ├── cycle07.json               # ✅ Complete (4/27-5/22)
│       └── cycle08.json               # ✅ Complete (6/1-6/26, includes Year-End + merged C9/C10)
│       # Note: cycle09.json & cycle10.json archived to archive/deferred-cycles/
│
├── templates/                         # Reusable generation templates
│   ├── forms/
│   │   ├── FormTemplate.gs            # Master form generation script
│   │   ├── HookTemplate.gs            # Hook-specific patterns
│   │   ├── StationTemplate.gs         # Station 1-3 patterns
│   │   └── ExitTicketTemplate.gs      # Exit ticket patterns
│   ├── html/
│   │   ├── student-page-template.html # Canvas page boilerplate
│   │   └── components/                # Reusable HTML components
│   │       ├── header.html
│   │       ├── navigation.html
│   │       ├── resources.html
│   │       └── footer.html
│   └── docs/
│       ├── curriculum-template.md     # Curriculum design template
│       ├── rubrics-template.md        # Rubrics template
│       └── lesson-plan-template.md    # Lesson plan template
│
├── framework/                         # Foundational documentation
│   ├── CONTENT-DESIGN-GUIDE.md        # ⭐ SINGLE SOURCE OF TRUTH for content creation
│   ├── pedagogical-approach.md        # Teaching philosophy
│   ├── technical-reference.md         # Forms API constraints
│   ├── mtss-framework.md              # Intervention tiers & triggers
│   ├── standards-alignment.md         # NGSS mapping across cycles
│   └── phet-simulations-catalog.md    # Digital resources & custom simulations
│
├── content/                           # All cycle/grade/week content
│   ├── grade7/
│   │   ├── cycle03/                   # ✅ Complete (Deployed)
│   │   │   ├── cycle-status.json      # Tracking file
│   │   │   ├── curriculum-design.md
│   │   │   ├── rubrics.md
│   │   │   ├── week1/
│   │   │   │   ├── forms.gs
│   │   │   │   ├── lesson-plan.md
│   │   │   │   ├── student-page.html
│   │   │   │   └── simulations/       # Custom HTML5 simulations
│   │   │   ├── week2/
│   │   │   └── week3/
│   │   ├── cycle04/                   # ✅ Complete (100%)
│   │   ├── cycle05/                   # ✅ Complete (3 weeks)
│   │   ├── cycle06/                   # ✅ Complete (5 weeks)
│   │   ├── cycle07/                   # ✅ Complete (4 weeks)
│   │   ├── cycle08/                   # ✅ Complete (4 weeks + Year-End)
│   │   └── ...
│   ├── grade8/
│   │   └── ... (same structure)
│   └── resources/                     # Cross-grade resources
│       ├── audit-w2-content.md
│       └── exemplars-cycle03-week2.md
│
├── shared/                            # Cross-grade utilities
│   ├── FormUtils.gs                   # Form creation helpers
│   ├── DataUtils.gs                   # Data retrieval helpers
│   ├── ValidationUtils.gs             # Config validation
│   └── styles/
│       └── design-system.css          # ⭐ CSS design tokens & components
│
├── data/                              # Data aggregation & analysis
│   ├── hub/
│   │   ├── KAMS-Science-Hub.xlsx      # Master gradebook
│   │   └── hub-setup-guide.md         # Configuration instructions
│   ├── aggregation/
│   │   ├── ResponseCollector.gs       # Fetches all form responses
│   │   ├── DataAggregator.gs          # Combines into analysis format
│   │   └── output/                    # Generated JSON files
│   │       ├── responses/             # Raw response JSON
│   │       ├── analysis/              # Aggregated analysis
│   │       └── mtss/                  # Intervention data
│   ├── analysis/
│   │   ├── MisconceptionTracker.gs    # Flags high-error patterns
│   │   ├── SpiralEffectiveness.gs     # Tracks spiral question gains
│   │   └── templates/
│   │       └── analysis-dashboard.json
│   └── mtss/
│       ├── InterventionGenerator.gs   # Creates intervention lists
│       ├── tier-definitions.json      # Tier 1/2/3 thresholds
│       └── output/
│           ├── tier2-students.json    # Students needing Tier 2
│           └── tier3-students.json    # Students needing Tier 3
│
├── scripts/                           # Build & deployment automation
│   ├── TriggerManager.gs              # ⭐ Centralized trigger coordination
│   ├── generate-cycle.js              # Creates all files for a cycle
│   ├── validate-config.js             # Checks config completeness
│   ├── deploy-forms.gs                # Batch creates Google Forms
│   ├── sync-to-canvas.gs              # Pushes grades to Canvas
│   └── nightly-aggregation.gs         # Scheduled data collection
│
└── archive/                           # Historical reference
    ├── legacy/                        # Original flat structure files
    └── migrations/                    # Structure change logs
```

---

## Configuration System

### Master Config (`config/master-config.json`)

Central source of truth for the entire system:

```json
{
  "version": "2.1.0",
  "school": "KAMS",
  "academicYear": "2025-2026",
  "grades": {
    "7": { "name": "Grade 7", "subject": "Life/Earth Science" },
    "8": { "name": "Grade 8", "subject": "Physical Science" }
  },
  "cycles": {
    "range": [3, 8],
    "weeksPerCycle": "variable (3-5 per cycle config)",
    "pointsPerWeek": 100,
    "_note": "SY25-26 supports cycles 3-8 only per official calendar"
  },
  "assessment": {
    "formStructure": {
      "hook": { "points": 12, "duration": 10 },
      "station1": { "points": 20, "duration": 18 },
      "station2": { "points": 20, "duration": 15 },
      "station3": { "points": 25, "duration": 20 },
      "exitTicket": { "points": 23, "duration": 15 }
    },
    "autoGradedTarget": "30-40%",
    "spiralQuestions": 2,
    "integrationQuestions": 1
  },
  "mtss": {
    "tier1Threshold": 70,
    "tier2Threshold": 50,
    "tier3Threshold": 30,
    "misconceptionAlertThreshold": 30
  }
}
```

### Cycle Config (`config/cycles/cycle03.json`)

Detailed configuration for each cycle:

```json
{
  "cycle": 3,
  "name": "Cycle 3: December 2025",
  "dates": {
    "start": "2025-12-01",
    "end": "2025-12-19"
  },
  "grades": {
    "7": {
      "topic": "Climate Change & Energy Flow",
      "phenomenon": "Why does a car get hot inside but not outside?",
      "ngss": {
        "primary": "MS-ESS3-5",
        "spiral": ["MS-PS1-5", "MS-PS1-6"]
      },
      "misconceptions": [
        { "id": "bond-break", "description": "Breaking bonds releases energy", "frequency": 60 },
        { "id": "mass-disappear", "description": "Mass disappears in reactions", "frequency": 40 }
      ],
      "weeks": {
        "1": {
          "title": "The Greenhouse Effect Mystery",
          "stations": {
            "hook": { "title": "The Hot Car Mystery" },
            "station1": { "title": "Molecular Vibration & IR", "resource": "PhET" },
            "station2": { "title": "Carbon Cycle Conservation", "resource": "manipulatives" },
            "station3": { "title": "Engineering Thermal Trap", "resource": "materials" }
          }
        },
        "2": { "title": "Feedback Loops & Tipping Points" },
        "3": { "title": "Synthesis & Assessment" }
      }
    },
    "8": {
      "topic": "Natural Selection & Forces",
      "phenomenon": "If cheetahs are fastest, why haven't gazelles gone extinct?",
      "ngss": {
        "primary": "MS-LS4-4",
        "spiral": ["MS-PS2-1", "MS-PS2-2"]
      }
    }
  }
}
```

---

## v3.0 Core Modules

### TriggerManager.gs - Unified Trigger Coordination

Prevents race conditions by managing all time-based triggers centrally.

```javascript
// Schedule (staggered to prevent conflicts):
//   5:30 PM - Response Collection
//   6:00 PM - Daily Orchestration (after collection completes)
//   Friday 4:00 PM - Weekly Summary

// Setup all triggers
TriggerManager.setupAllTriggers();

// Clear all managed triggers
TriggerManager.clearAllTriggers();

// Query current status
TriggerManager.getStatus();

// Validate schedule for conflicts
TriggerManager.validateSchedule();
```

**Important:** Individual modules (ResponseCollector, HubOrchestrator) no longer set up their own triggers. They delegate to TriggerManager.

### design-system.css - CSS Design Tokens

Centralized design tokens eliminate inline styles and ensure visual consistency.

```css
/* Usage in HTML templates */
<link rel="stylesheet" href="../../shared/styles/design-system.css">

/* Or embed via Apps Script HtmlService */
<?!= include('shared/styles/design-system.css'); ?>

/* Available tokens */
:root {
  /* Colors */
  --color-primary: #1a73e8;
  --color-success: #34a853;
  --color-warning: #fbbc04;
  --color-error: #ea4335;

  /* Support tiers */
  --support-tier1-bg: #e8f5e9;
  --support-tier2-bg: #fff3e0;
  --support-tier3-bg: #ffebee;

  /* Spacing (8px baseline) */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
}

/* Component classes */
.btn, .btn-primary, .btn-secondary
.card, .card-header, .card-body
.alert-success, .alert-warning, .alert-error
.support-tier1, .support-tier2, .support-tier3
```

---

## Form Question Schema

Each question in the system follows this schema:

```json
{
  "id": "g7_c3_w1_s1_q2",
  "grade": 7,
  "cycle": 3,
  "week": 1,
  "station": "station1",
  "questionNumber": 2,
  "type": "multipleChoice",
  "autoGraded": true,
  "points": 4,
  "title": "The CO₂ molecule absorbing IR energy is an example of what type of process?",
  "choices": [
    { "text": "Endothermic (absorbs energy)", "correct": true },
    { "text": "Exothermic (releases energy)", "correct": false },
    { "text": "Neither", "correct": false }
  ],
  "feedback": {
    "correct": "Correct! Absorption of energy = endothermic.",
    "incorrect": "Remember: Absorbing energy from surroundings = endothermic."
  },
  "metadata": {
    "spiral": false,
    "cycleOrigin": 3,
    "misconceptionTarget": "bond-break",
    "bloomLevel": "apply",
    "sep": "SEP-6",
    "dci": "PS1.B",
    "ccc": "Energy and Matter"
  }
}
```

---

## Data Flow Architecture

### Configuration Hierarchy

```
┌─────────────────────────────────────────────────────────────────────┐
│                    CONFIGURATION LAYER                               │
├─────────────────────────────────────────────────────────────────────┤
│  config/master-config.json (Global settings)                         │
│           │                                                          │
│           ↓                                                          │
│  config/cycles/*.json (Per-cycle configuration)                      │
│           │                                                          │
│           └──→ Used directly by forms.gs scripts                     │
│                                                                      │
│  Note: Config values are accessed directly from JSON files.          │
│  Each forms.gs defines its own constants as needed.                  │
└─────────────────────────────────────────────────────────────────────┘
```

### Data Pipeline Flow

```
┌──────────────────────────────────────────────────────────────────┐
│                    CONTENT GENERATION                             │
├──────────────────────────────────────────────────────────────────┤
│  config/cycles/*.json → templates/ → content/grade*/cycle*/      │
│                                                                   │
│  generate-cycle.js reads config, applies templates,               │
│  outputs: forms.gs, student-page.html, lesson-plan.md            │
└──────────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────────┐
│                    FORM DEPLOYMENT                                │
├──────────────────────────────────────────────────────────────────┤
│  deploy-forms.gs → Google Forms API                               │
│                                                                   │
│  Creates 5 forms per week, applies settings,                      │
│  returns: Form IDs, Response Sheet IDs                           │
└──────────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────────┐
│                    STUDENT INTERACTION                            │
├──────────────────────────────────────────────────────────────────┤
│  Canvas LMS ← student-page.html ← Google Forms (embedded)         │
│  (uses design-system.css for consistent styling)                  │
│                                                                   │
│  Students complete forms, responses auto-captured                 │
└──────────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────────┐
│                    TRIGGER COORDINATION                           │
├──────────────────────────────────────────────────────────────────┤
│  TriggerManager.gs coordinates all scheduled tasks:               │
│    5:30 PM → ResponseCollector (fetch responses)                  │
│    6:00 PM → HubOrchestrator (run pipeline)                       │
│    Friday 4 PM → Weekly summary                                   │
└──────────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────────┐
│                    DATA AGGREGATION                               │
├──────────────────────────────────────────────────────────────────┤
│  ResponseCollector.gs → DataAggregator.gs                         │
│  (both use Config module for thresholds & settings)               │
│                                                                   │
│  Fetches all response sheets, converts to JSON,                   │
│  outputs: data/aggregation/output/responses/*.json                │
└──────────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────────┐
│                    ANALYSIS & MTSS                                │
├──────────────────────────────────────────────────────────────────┤
│  MisconceptionTracker.gs → InterventionGenerator.gs               │
│  Tier assignment: Config.getTierForScore(percentage)              │
│                                                                   │
│  Identifies patterns, flags students by tier,                     │
│  outputs: data/mtss/output/tier*-students.json                   │
└──────────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────────┐
│                    TEACHER DASHBOARD                              │
├──────────────────────────────────────────────────────────────────┤
│  Hub spreadsheet with IMPORTJSON() or linked JSON                 │
│                                                                   │
│  Visualizes: Class averages, misconception rates,                 │
│              intervention lists, spiral effectiveness             │
└──────────────────────────────────────────────────────────────────┘
```

---

## MTSS Integration

### Tier Definitions

| Tier | Score Range | Trigger | Intervention |
|------|-------------|---------|--------------|
| **Tier 1** | 70-100% | Universal | Core instruction, standard differentiation |
| **Tier 2** | 50-69% | Targeted | Small group reteach, peer tutoring, modified assignments |
| **Tier 3** | 0-49% | Intensive | 1:1 intervention, alternative assessment, extended time |

### Misconception Alerts

When ≥30% of students miss a specific question, system flags:
- Which question
- Which misconception it targets
- Suggested re-teaching strategy
- Related spiral questions for next cycle

### Output Format (`data/mtss/output/tier2-students.json`)

```json
{
  "generated": "2025-12-05T18:00:00Z",
  "cycle": 3,
  "week": 1,
  "tier": 2,
  "students": [
    {
      "email": "student1@kams.edu",
      "name": "John Doe",
      "overallScore": 58,
      "struggles": [
        {
          "questionId": "g7_c3_w1_s1_q2",
          "misconception": "bond-break",
          "suggestedIntervention": "PhET review with guided questions"
        }
      ],
      "strengths": ["carbon-cycle", "calculation"],
      "recommendedActions": [
        "Small group reteach: bond energy",
        "Pair with strong partner for Station 3"
      ]
    }
  ],
  "classPatterns": {
    "highMissQuestions": ["g7_c3_w1_s1_q3", "g7_c3_w1_exit_q2"],
    "wholeClassReteach": true,
    "reteachTopic": "Endothermic vs Exothermic"
  }
}
```

---

## File Naming Conventions

### Consistent Patterns

| Element | Convention | Example |
|---------|------------|---------|
| **Directories** | lowercase-hyphenated | `cycle03`, `week1` |
| **Config files** | lowercase-hyphenated.json | `cycle03.json` |
| **Scripts** | PascalCase.gs | `FormUtils.gs`, `DataAggregator.gs` |
| **Templates** | PascalCase-template.ext | `StationTemplate.gs` |
| **Content docs** | lowercase-hyphenated.md | `curriculum-design.md` |
| **HTML pages** | lowercase-hyphenated.html | `student-page.html` |
| **Output JSON** | descriptive-lowercase.json | `tier2-students.json` |

### Form Naming

```
G{grade}.C{cycle}.W{week}: {Station} - {Title} [{points} pts]

Examples:
- G7.C3.W1: Hook - The Hot Car Mystery [12 pts]
- G8.C5.W2: Station 1 - Fossil Evidence Analysis [20 pts]
```

### Question IDs

```
g{grade}_c{cycle}_w{week}_{station}_q{number}

Examples:
- g7_c3_w1_hook_q1
- g8_c5_w2_s1_q3
- g7_c4_w3_exit_q5
```

---

## Legacy Content: Cycle 2

Cycle 2 exists as **pre-architecture legacy content** that was developed before the formal system was established. It is retained for reference and backward compatibility but does not follow all architecture conventions:

| Attribute | Standard (C3-C10) | Cycle 2 (Legacy) |
|-----------|-------------------|------------------|
| Weeks per cycle | 3-5 (variable) | 4 |
| Config file | `config/cycles/cycleXX.json` | None |
| Structure | Full architecture compliance | Partial |
| Status | Managed by cycle-status.json | Legacy tracking |

**Note:** Cycle 2 content is fully functional for teaching but is not part of the automated configuration system. Future updates may migrate C2 content to full compliance if needed.

Content locations:
- `content/grade7/cycle02/` - G7 Molecular Structure, Bonding & Reactions
- `content/grade8/cycle02/` - G8 Forces, Energy & Collisions

---

## Migration Path

### Phase 1: Foundation (Complete) ✅
- Cycle 3 fully implemented for both grades
- Directory structure standardized
- Configuration system established

### Phase 2: Infrastructure (Complete) ✅
- `config/` with master and all cycle configs (C3-C10)
- `templates/` with generation scripts
- `data/` with aggregation infrastructure
- `content/resources/` for cross-grade materials
- `cycle-status.json` tracking in every cycle

### Phase 3: Content Build-out (Complete) ✅
- ✅ Cycle 3: Complete (G7 & G8) - 3 weeks
- ✅ Cycle 4: Complete (G7 & G8) - 3 weeks
- ✅ Cycle 5: Complete (G7 & G8) - 3 weeks (Feb 23-Mar 12)
- ✅ Cycle 6: Complete (G7 & G8) - 5 weeks (Mar 24-Apr 24)
- ✅ Cycle 7: Complete (G7 & G8) - 4 weeks (Apr 27-May 22)
- ✅ Cycle 8: Complete (G7 & G8) - 4 weeks (Jun 1-26, includes Year-End Integration)
- ⚠️ Cycles 9-10: Deferred to SY26-27 (standards integrated into C8)

### Phase 4: Automation (Pending)
- Deploy nightly aggregation
- Implement MTSS alerts
- Create teacher dashboard

### Phase 5: Architectural Refactor v3.0 (Complete) ✅
Comprehensive refactoring to improve code organization:

**Key Changes:**
- `scripts/TriggerManager.gs` - Unified trigger coordination
- `shared/styles/design-system.css` - CSS design tokens
- `student-page-template.html` - Semantic HTML5 with CSS variables
- `scripts/pptx_common.py` - Shared PPTX generation utilities

**Issues Resolved:**
- Fixed trigger race condition (5:30 PM / 6:00 PM staggering)
- Removed ~80% inline CSS from templates
- Added semantic HTML structure for accessibility
- Consolidated PPTX generation boilerplate

**Note:** Config.gs and Constants.gs were designed but never adopted. They have been archived to `archive/deprecated-shared/` (Dec 2025).

---

## Cycle Status Tracking

Each cycle now includes a `cycle-status.json` file for tracking development progress:

```json
{
  "cycle": 4,
  "grade": 7,
  "status": "complete",
  "lastUpdated": "2025-12-08",
  "topic": "Biogeochemical Cycles & Human Impact",
  "completion": {
    "overall": 100,
    "curriculumDesign": 100,
    "rubrics": 100,
    "week1": { "forms": 100, "lessonPlan": 100, "studentPage": 100, "slides": 100 },
    "week2": { "forms": 100, "lessonPlan": 100, "studentPage": 100, "slides": 100 },
    "week3": { "forms": 100, "lessonPlan": 100, "studentPage": 100, "slides": 100 }
  },
  "deployed": {
    "week1": false,
    "week2": false,
    "week3": false
  },
  "readyForDeployment": true
}
```

Status values:
- `complete` - Fully developed and deployed
- `in_progress` - Active development
- `not_started` - Placeholder only
- `legacy` - Pre-architecture content, functional but not fully compliant

---

*Architecture Version 3.1.0 | December 2025 | Centralized Configuration Refactor Complete*
