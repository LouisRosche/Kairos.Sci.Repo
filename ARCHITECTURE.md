# KAMS Science Curriculum System Architecture
## Scalable Design for 8 Cycles × 2 Grades × 3 Weeks

---

## Overview

This document defines the organizational architecture for a complete middle school science curriculum system supporting:
- **8 Cycles** (Cycle 3-10, academic year progression)
- **2 Grades** (7 & 8, expandable to 6-9)
- **3 Weeks per Cycle** (24 total weeks of instruction)
- **5 Forms per Week** (480 total Google Forms)
- **Data-driven MTSS** (Multi-Tiered System of Supports)

---

## Directory Structure

```
C3.Repo/
├── README.md                          # Quick navigation & teacher workflow
├── ARCHITECTURE.md                    # This document
│
├── config/                            # Master configuration (JSON)
│   ├── master-config.json             # All cycles, grades, standards
│   ├── schema/
│   │   ├── cycle-schema.json          # Validation schema for cycles
│   │   ├── form-schema.json           # Question/form structure
│   │   └── mtss-schema.json           # Intervention thresholds
│   └── cycles/
│       ├── cycle03.json               # ✅ Active
│       ├── cycle04.json               # 🟡 In Progress
│       ├── cycle05.json               # 📋 Placeholder
│       ├── cycle06.json               # 📋 Placeholder
│       ├── cycle07.json               # 📋 Placeholder
│       ├── cycle08.json               # 📋 Placeholder
│       ├── cycle09.json               # 📋 Placeholder
│       └── cycle10.json               # 📋 Placeholder
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
│   ├── pedagogical-approach.md        # Teaching philosophy
│   ├── technical-reference.md         # Forms API constraints
│   ├── mtss-framework.md              # Intervention tiers & triggers
│   └── standards-alignment.md         # NGSS mapping across cycles
│
├── content/                           # All cycle/grade/week content
│   ├── grade7/
│   │   ├── cycle03/                   # ✅ Complete
│   │   │   ├── cycle-status.json      # Tracking file
│   │   │   ├── curriculum-design.md
│   │   │   ├── rubrics.md
│   │   │   ├── week1/
│   │   │   │   ├── forms.gs
│   │   │   │   ├── lesson-plan.md
│   │   │   │   └── student-page.html
│   │   │   ├── week2/
│   │   │   └── week3/
│   │   ├── cycle04/                   # 🟡 In Progress
│   │   ├── cycle05-10/                # 📋 Placeholder
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
│   └── ValidationUtils.gs             # Config validation
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
    "range": [3, 10],
    "weeksPerCycle": 3,
    "pointsPerWeek": 100
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
│                                                                   │
│  Students complete forms, responses auto-captured                 │
└──────────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────────┐
│                    DATA AGGREGATION                               │
├──────────────────────────────────────────────────────────────────┤
│  nightly-aggregation.gs → ResponseCollector.gs → DataAggregator   │
│                                                                   │
│  Fetches all response sheets, converts to JSON,                   │
│  outputs: data/aggregation/output/responses/*.json                │
└──────────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────────┐
│                    ANALYSIS & MTSS                                │
├──────────────────────────────────────────────────────────────────┤
│  MisconceptionTracker.gs → InterventionGenerator.gs               │
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
| Weeks per cycle | 3 | 4 |
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

### Phase 3: Content Build-out (In Progress) 🟡
- ✅ Cycle 3: Complete (G7 & G8)
- 🟡 Cycle 4: G7 Week 1 complete, remainder placeholder
- 📋 Cycles 5-10: Placeholder structure with TODO checklists

### Phase 4: Automation (Pending)
- Deploy nightly aggregation
- Implement MTSS alerts
- Create teacher dashboard

---

## Cycle Status Tracking

Each cycle now includes a `cycle-status.json` file for tracking development progress:

```json
{
  "cycle": 4,
  "grade": 7,
  "status": "in_progress",
  "lastUpdated": "2025-12-07",
  "topic": "Biogeochemical Cycles & Human Impact",
  "completion": {
    "overall": 75,
    "curriculumDesign": 100,
    "rubrics": 100,
    "week1": { "forms": 100, "lessonPlan": 100, "studentPage": 100, "slides": 0 },
    "week2": { "forms": 100, "lessonPlan": 50, "studentPage": 50, "slides": 0 },
    "week3": { "forms": 100, "lessonPlan": 50, "studentPage": 50, "slides": 0 }
  },
  "deployed": {
    "week1": false,
    "week2": false,
    "week3": false
  }
}
```

Status values:
- `complete` - Fully developed and deployed
- `in_progress` - Active development
- `not_started` - Placeholder only
- `legacy` - Pre-architecture content, functional but not fully compliant

---

*Architecture Version 2.2 | December 2025 | Hierarchical Compliance Audit Complete*
