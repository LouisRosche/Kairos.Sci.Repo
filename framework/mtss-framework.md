# MTSS Framework: Multi-Tiered System of Supports
## Data-Driven Intervention for KAMS Science
## Version 3.0 | December 2025

---

## Overview

This framework defines how the KAMS science curriculum system uses assessment data to identify students needing additional support and generate actionable intervention plans, grounded in the *Scholarly Foundations for NGSS-Aligned Middle School Science Curriculum Development*.

**Key Principles:**
- Data-driven decision making (not gut feelings)
- Proactive intervention (before students fall behind)
- Tiered approach (universal → targeted → intensive)
- Progress monitoring (weekly data cycles)

---

## Research Foundation: Critical Gap in Science MTSS

> **Important:** A critical research gap exists—**no validated science-specific progress monitoring tools** exist with documented technical adequacy. The Learning Disabilities Association notes "much less research-based information" is available for science compared to reading and mathematics.

**However, evidence supports tiered intervention in science:**
- Richards & Omdal (2007) found tiered instruction produced **d = 1.06** (large effect) for low-background learners in secondary science, effectively closing achievement gaps
- Vocabulary-matching CBMs show the most promise (Conoyer et al., 2022), though reliability varies (.21-.89) compared to reading (.78-.99)

**Our Approach:** Adapts best practices from reading/math MTSS while acknowledging the need for science-specific validation. Weekly assessment data serves as our primary progress monitoring tool.

---

## Tier Definitions

### Tier 1: Universal Instruction (70-100%)

**Population:** ~80% of students (target)

**Characteristics:**
- Meeting grade-level expectations
- Responding to core instruction
- Minimal gaps in prerequisite knowledge

**Supports:**
- Standard differentiation (built into lesson plans)
- Regular formative assessment
- Small group work during stations
- Peer collaboration

**Teacher Actions:**
- Deliver core instruction with fidelity
- Monitor engagement during stations
- Provide enrichment for early finishers

---

### Tier 2: Targeted Intervention (50-69%)

**Population:** ~15% of students (target)

**Research-Based Parameters (National Center on Intensive Intervention):**
- **Duration:** 20-30 minutes per session
- **Frequency:** 3-4 times weekly
- **Group Size:** 3-5 students
- **Progress Monitoring:** 2x per month minimum

**Characteristics:**
- Below grade-level expectations
- Specific skill gaps identified
- Needs additional practice or reteaching

**Supports:**
- Small group reteaching (3-5 students)
- Peer tutoring with Tier 1 partner
- Modified assignments (reduced load, scaffolded)
- Extended time on forms (async completion)
- Additional practice problems
- Vocabulary support for ELL students (pre-teach 5-7 key terms with visuals)
- Sentence stems for scientific argumentation

**Teacher Actions:**
- Pull small groups during Station 3 or catch-up time (20-30 min, 3-4x weekly)
- Assign peer tutors from Tier 1
- Provide sentence frames and calculation scaffolds
- Contact family with specific feedback
- Monitor weekly for tier movement
- Use vocabulary-matching probes for progress monitoring

**Trigger:** Student scores 50-69% on weekly total

---

### Tier 3: Intensive Intervention (0-49%)

**Population:** ~5% of students (target)

**Research-Based Parameters:**
- **Duration:** Individualized based on need
- **Frequency:** Weekly minimum
- **Group Size:** 1-3 students (ideally 1:1)
- **Progress Monitoring:** Weekly
- **Framework:** Data-Based Individualization (DBI) — g = 0.57 for teacher outcomes

**Characteristics:**
- Significantly below grade-level
- Multiple skill gaps
- Not responding to Tier 2 supports
- May have learning differences (IEP/504)

**Supports:**
- 1:1 intervention sessions
- Alternative assessment formats (oral, visual)
- Modified curriculum (prerequisite focus)
- Extended time + reduced questions
- Assistive technology
- Coordination with SpEd/intervention specialists
- Family partnership plan
- Bridging analogies for persistent misconceptions (Clement, 1993)
- Explicit vocabulary instruction with multiple representations

**Teacher Actions:**
- Schedule 1:1 time (before/after school or during prep)
- Review IEP/504 for additional accommodations
- Contact intervention specialist
- Document interventions and response using DBI framework
- Consider referral if not progressing
- Use vocabulary-matching probes 2x weekly for progress monitoring

**Trigger:** Student scores <50% OR 2+ consecutive weeks at Tier 2 without improvement

---

## Data Flow for MTSS

```
Weekly Assessment (Exit Ticket)
         ↓
Automatic Score Aggregation (DataAggregator.gs)
         ↓
Tier Assignment (based on thresholds)
         ↓
MTSS Report Generation (mtss-g7-c3-w1.json)
         ↓
Teacher Dashboard Review
         ↓
Intervention Planning
         ↓
Implementation
         ↓
Progress Monitoring (next week's data)
```

---

## Misconception Alerts

### Threshold-Based Alerts

When ≥30% of students miss a specific question:

1. **Automatic Flag:** Question appears in `highMissQuestions` array
2. **Misconception Link:** System identifies which misconception the question targets
3. **Reteach Recommendation:** Suggested strategy based on question type

### Whole-Class Reteach Trigger

When ≥40% of students miss any single question:

- `wholeClassReteachNeeded: true` flag set
- Teacher should pause forward progress
- Implement 10-15 minute targeted reteach
- Use alternative explanation or representation

### Sample Alert Output

```json
{
  "questionId": "g7_c3_w1_s1_q3",
  "question": "Student A says bonds break when absorbing energy...",
  "missRate": 42,
  "totalResponses": 58,
  "misconceptionId": "bond-break-release",
  "commonIncorrect": {
    "value": "Student A is correct",
    "count": 24
  },
  "suggestedReteach": "PhET demo: Show CO2 vibrating without breaking"
}
```

---

## Intervention Strategies by Misconception

### Grade 7 Misconceptions

| ID | Misconception | Tier 2 Intervention | Tier 3 Intervention |
|----|---------------|---------------------|---------------------|
| `bond-break-release` | Breaking bonds releases energy | PhET review with guided questions; Energy diagram scaffolds | 1:1 manipulative work; Start from particle level |
| `mass-disappear` | Mass disappears in reactions | Carbon atom tracking with physical manipulatives | Simpler system (baking soda + vinegar with balance) |
| `energy-not-measurable` | Energy isn't measurable | Calculator practice with thermal calculations | Concrete examples (food calories, electricity bills) |

### Grade 8 Misconceptions

| ID | Misconception | Tier 2 Intervention | Tier 3 Intervention |
|----|---------------|---------------------|---------------------|
| `bigger-more-force` | Bigger = more force | Paired object demos (push against wall); Math verification | Interactive simulation with varied masses |
| `lamarckian` | Individuals evolve | Bean simulation review; Population vs individual discussion | "Before and after" organism gallery; no change in individual |
| `fma-weak` | F=ma conceptual gap | Additional calculation practice with scaffolds | Start from definitions; build up to multi-step |

---

## Progress Monitoring Protocol

### Weekly Cycle

| Day | Action |
|-----|--------|
| Friday PM | Data aggregation runs automatically |
| Friday PM | MTSS report generated |
| Monday AM | Teacher reviews dashboard |
| Monday | Tier 3 students identified for 1:1 |
| Tue-Thu | Tier 2 small groups during stations |
| Friday | Next data cycle begins |

### Tier Movement Criteria

**Move UP (e.g., Tier 2 → Tier 1):**
- Score ≥70% for 2 consecutive weeks
- Shows consistent improvement trend
- Demonstrates understanding of previously-missed concepts

**Move DOWN (e.g., Tier 1 → Tier 2):**
- Score <70% for current week
- Immediate placement in appropriate tier

**Extend Support:**
- Student at same tier for 3+ weeks without improvement
- Consider Tier 3 referral or specialist consultation

---

## Reporting

### Automated Reports

| Report | Frequency | Contents |
|--------|-----------|----------|
| `mtss-gX-cX-wX.json` | Weekly | Full MTSS data for grade/cycle/week |
| `tier2-gX-cX-wX.json` | Weekly | Tier 2 student list with interventions |
| `tier3-gX-cX-wX.json` | Weekly | Tier 3 student list with interventions |
| `misconception-alerts.json` | Weekly | High-miss questions with reteach suggestions |

### Dashboard Metrics

- Class average by week (trend line)
- Tier distribution pie chart
- Misconception resolution rate (are spiral questions improving?)
- Individual student sparklines (6-week trend)

---

## Family Communication Templates

### Tier 2 Notification

> Dear [Family],
>
> [Student] is currently performing in the 50-69% range in our Cycle [X] science unit on [Topic]. This places them in our "Targeted Support" tier.
>
> **What this means:** [Student] would benefit from additional practice and support to strengthen their understanding.
>
> **What we're doing:**
> - Small group reteaching during class
> - Peer tutoring with a classmate
> - Extended time on assignments
>
> **How you can help:**
> - Ask [Student] to explain their learning from today
> - Review vocabulary terms together (glossary attached)
> - Ensure completed work is submitted by deadline
>
> Please contact me if you have questions.

### Tier 3 Notification

> Dear [Family],
>
> [Student] is currently performing below 50% in our science unit. We'd like to schedule a brief meeting to discuss additional support strategies.
>
> [Student] has specific struggles with:
> - [Concept 1]
> - [Concept 2]
>
> Please respond with your availability for a 15-minute phone or in-person meeting.

---

## Integration with Existing Systems

### Canvas Gradebook
- Weekly scores synced after MTSS processing
- Comments field populated with tier status
- Assignment modifications reflected in gradebook

### IEP/504 Compliance
- MTSS data informs annual review meetings
- Progress monitoring documentation available
- Tier 3 interventions aligned with IEP goals

### School Intervention Team
- Tier 3 students flagged for team review
- Data shared with specialists
- Coordinated intervention plans

---

---

## References

- Richards, S. B., & Omdal, S. N. (2007). Effects of tiered instruction on science achievement. *Remedial and Special Education, 28*, 227-241.
- Conoyer, S. J., et al. (2022). Science curriculum-based measures meta-analysis. *Journal of School Psychology, 93*, 1-22.
- Espin, C. A., Shin, J., & Busch, T. W. (2005). Vocabulary-matching CBMs for secondary science. *Journal of Special Education, 38*, 220-231.
- National Center on Intensive Intervention. (2023). *Data-Based Individualization framework.*
- Clement, J. (1993). Using bridging analogies and anchoring intuitions. *Journal of Research in Science Teaching, 30*, 1241-1257.

---

*MTSS Framework Version 3.0 | December 2025 | KAMS Science*
*Aligned with Scholarly Foundations for NGSS-Aligned Middle School Science Curriculum Development*
