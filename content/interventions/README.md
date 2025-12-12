# MTSS Intervention Resources

This directory contains tier-specific intervention materials for students identified through the MTSS data pipeline.

## Directory Structure

```
interventions/
├── README.md                    # This file
├── tier2/                       # Targeted support (50-69%)
│   ├── templates/               # Reusable intervention templates
│   │   ├── reteach-template.html
│   │   ├── practice-template.html
│   │   └── vocabulary-support.html
│   ├── grade7/                  # Grade-specific materials
│   │   └── cycle{03-08}/        # Cycle-specific interventions
│   └── grade8/
│       └── cycle{03-08}/
├── tier3/                       # Intensive support (0-49%)
│   ├── templates/
│   │   ├── prerequisite-review.html
│   │   ├── visual-scaffold.html
│   │   └── guided-practice.html
│   ├── grade7/
│   └── grade8/
└── shared/                      # Resources used across tiers
    ├── sentence-frames.md
    ├── vocabulary-strategies.md
    └── self-assessment.html
```

## How Interventions Connect to Data

1. **Data Pipeline** identifies students below threshold (via `data/mtss/`)
2. **Hub Dashboard** shows tier assignments by student
3. **Intervention Tracker** (`config/master-config.json` → `integrations.interventionTracker`) monitors progress
4. **Student Pages** should link to relevant interventions via `<details>` elements

## Creating New Intervention Content

### For Tier 2 (Targeted - 50-69%)

Focus: Small group reteach, peer tutoring scaffolds, modified practice

1. Copy `tier2/templates/reteach-template.html`
2. Fill in concept-specific content
3. Save to `tier2/grade{N}/cycle{NN}/`
4. Update corresponding student-page.html with link

### For Tier 3 (Intensive - 0-49%)

Focus: 1:1 support, prerequisite review, alternative representations

1. Copy `tier3/templates/prerequisite-review.html`
2. Identify prerequisite skills from prior cycles
3. Create visual-first explanations
4. Save to `tier3/grade{N}/cycle{NN}/`

## Linking Interventions to Student Pages

Add to student-page.html `<details>` sections:

```html
<details class="tier2-support">
  <summary>📚 Need extra help with this concept?</summary>
  <p>Complete this <a href="../../../interventions/tier2/grade7/cycle03/energy-reteach.html">
     Energy Flow Reteach Activity</a></p>
  <p>Then try the <a href="../../../interventions/tier2/grade7/cycle03/energy-practice.html">
     Practice Problems</a></p>
</details>

<details class="tier3-support">
  <summary>🔄 Let's review the basics first</summary>
  <p>Start with <a href="../../../interventions/tier3/grade7/cycle03/prerequisite-heat.html">
     Understanding Heat Transfer</a> (prerequisite from Cycle 2)</p>
</details>
```

## Research Alignment

Per `framework/CONTENT-DESIGN-GUIDE.md` and master-config.json:

- **Sustained scaffolding** (g = 0.46): Students need support longer than expected
- **Backward fading**: Remove support from END of procedures first
- **Refutational text** (g = 0.41): Address misconceptions explicitly

## Intervention Effectiveness Tracking

The data pipeline tracks intervention effectiveness via:

```json
// master-config.json → integrations.interventionTracker
{
  "evaluationCriteria": {
    "graduateThreshold": 70,
    "minimumWeeksBeforeGraduation": 2,
    "consecutiveWeeksRequired": 2,
    "minimumImprovementPercent": 10
  }
}
```

Students "graduate" from Tier 2/3 when they maintain ≥70% for 2 consecutive weeks.
