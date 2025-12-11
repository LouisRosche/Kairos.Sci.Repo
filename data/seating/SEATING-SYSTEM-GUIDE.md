# Seat Assignment & Social Optimization System

A data-driven approach to understanding and optimizing classroom seating arrangements based on student performance correlations.

## Overview

Middle school social dynamics are complex. This system helps you:

1. **Track** who sits where each day
2. **Correlate** seating proximity with academic performance
3. **Identify** catalyst pairs (students who elevate each other) and distraction vectors (students who should be separated)
4. **Optimize** seating arrangements over time

## Quick Start

### Week 1-2: Setup & Data Collection

1. **Print Sign-In Cards**
   - Open `archive/experimental/printables/seat-signin-card.html` in a browser
   - Configure: Period, Week, Cycle, Total Seats
   - Print on cardstock (landscape, 4 cards per page)
   - Cut and post at each perimeter seat

2. **Daily Routine**
   - Students sign their name when they arrive (full first name, last initial)
   - Note any seat movements on the card
   - Cards stay up all week

3. **End of Week**
   - Collect all sign-in cards
   - Scan or photograph each card
   - Input data to Claude for processing

### Week 3+: Analysis & Optimization

After 3+ weeks of data:

1. **Run Correlation Analysis**
   - Use `SeatingAnalyzer.gs` functions
   - Pass scanned data through `inputSignInData()`
   - Run `analyzeSeatingCorrelations()` for insights

2. **Review Insights Report**
   - Open `archive/experimental/printables/seating-insights-report.html`
   - Paste analysis JSON output
   - Review catalyst pairs and distraction vectors

3. **Adjust Seating**
   - Use `classroom-seating-map.html` to plan new arrangement
   - Run `generateOptimizedSeating()` for AI-suggested layout
   - Implement changes, print new sign-in cards

## File Structure

```
data/seating/
├── SeatingAnalyzer.gs       # Core analysis engine (Apps Script)
├── SEATING-SYSTEM-GUIDE.md  # This guide
└── output/                  # Generated reports & data

archive/experimental/printables/
├── seat-signin-card.html         # Weekly sign-in cards
├── classroom-seating-map.html    # Visual seating chart
└── seating-insights-report.html  # Analysis dashboard
```

## How the Analysis Works

### Correlation Engine

The system tracks:

1. **Adjacency**: Who sat within 2 seats of whom each day
2. **Performance**: Form scores (hooks, stations, exit tickets)
3. **Correlation**: Performance difference when students are near vs. far from each other

### Classification

| Category | Correlation | Meaning |
|----------|-------------|---------|
| **Catalyst Pair** | ≥ +0.5 | Both students perform significantly better together |
| **Mild Positive** | +0.2 to +0.5 | Slight positive effect |
| **Neutral** | -0.2 to +0.2 | No significant effect |
| **Mild Negative** | -0.2 to -0.4 | Slight negative effect |
| **Distraction Vector** | ≤ -0.4 | Both students perform significantly worse together |

### Data Requirements

- **Minimum 3 weeks** for initial analysis
- **5+ weeks** for high-confidence recommendations
- Need variation: some days near each other, some days apart

## Inputting Scanned Data

Format your scanned sign-in data as JSON:

```json
{
  "seats": {
    "1": {
      "monday": { "studentName": "Emma S.", "movedFrom": null },
      "tuesday": { "studentName": "Emma S.", "movedFrom": null },
      "wednesday": { "studentName": "Emma S.", "movedFrom": null },
      "thursday": { "studentName": "Jacob M.", "movedFrom": 5 },
      "friday": { "studentName": "Emma S.", "movedFrom": null }
    },
    "2": {
      "monday": { "studentName": "Liam K.", "movedFrom": null },
      ...
    }
  }
}
```

**Tip**: When sharing scanned cards with Claude, you can describe them naturally:
- "Seat 1: Emma S. signed in Mon-Wed and Fri. Jacob M. signed in Thursday (moved from seat 5)."
- Claude will help format the data.

## Optimization Strategy

The algorithm considers:

1. **MTSS Tiers**: Tier 3 students near teacher (front)
2. **Peer Tutoring**: Tier 1 near Tier 2 for natural support
3. **Catalyst Pairs**: Keep high-correlation pairs together
4. **Distraction Vectors**: Separate negative-correlation pairs
5. **Tier Clustering**: Avoid grouping all Tier 3 students together

## Tips for Success

### Establishing the Routine

- Make signing in part of the entry procedure
- Post cards at eye level, near where students put backpacks
- Use a consistent spot so students develop the habit

### Maximizing Data Quality

- Remind students to write legibly
- Check cards mid-week for blank spots
- Note absences vs. unsigned (different information)

### Implementing Changes

- Don't change everything at once
- Move 2-3 students, observe for 2 weeks
- Explain to students: "We're trying different arrangements to help everyone learn better"

### Privacy Considerations

- Data is about learning patterns, not surveillance
- Share aggregate insights with students: "We found some seating arrangements work better!"
- Never publicly identify "distraction" pairs

## Integration with MTSS

This system feeds into the existing MTSS framework:

- **Tier assignments** inform initial placement
- **Peer tutoring pairs** (from `InterventionGrouping.gs`) get seated together
- **Intervention groups** can be co-located
- **Performance data** from `DataAggregator.gs` powers correlations

## Sample Weekly Workflow

| Day | Action |
|-----|--------|
| **Monday** | Post new sign-in cards, students sign in |
| **Tue-Thu** | Daily sign-ins continue |
| **Friday** | Collect cards, scan/photograph |
| **Weekend** | Input data, run analysis (or do with Claude Monday morning) |
| **Next Monday** | Review insights, make any seating adjustments |

## Troubleshooting

**Q: Students forget to sign in**
A: Use a "sign-in monitor" student role, or incorporate into bell-ringer routine

**Q: Handwriting is illegible**
A: Have students write initials in the small box, full name on the line

**Q: Not enough data variance**
A: Occasionally shuffle seats temporarily for "lab day" or "collaboration day"

**Q: Analysis shows no strong patterns**
A: This is actually good news - no major social interference! Focus on MTSS tier placement.

---

*"The complexity of human nature and middle school psychology" - now data-informed.*
