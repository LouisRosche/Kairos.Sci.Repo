#!/usr/bin/env node
/**
 * generate-cycle-config.js
 * Generates a new cycle configuration file from template
 *
 * Usage: node generate-cycle-config.js <cycle_number>
 * Example: node generate-cycle-config.js 4
 *
 * This creates config/cycles/cycle04.json with placeholders for content
 */

const fs = require('fs');
const path = require('path');

// Template structure for a new cycle
function generateCycleTemplate(cycleNum) {
  const padded = String(cycleNum).padStart(2, '0');

  return {
    "$schema": "../schema/cycle-schema.json",
    "cycle": cycleNum,
    "name": `Cycle ${cycleNum}: [MONTH YEAR]`,
    "status": "planned",
    "dates": {
      "start": "YYYY-MM-DD",
      "end": "YYYY-MM-DD",
      "week1": { "start": "YYYY-MM-DD", "end": "YYYY-MM-DD" },
      "week2": { "start": "YYYY-MM-DD", "end": "YYYY-MM-DD" },
      "week3": { "start": "YYYY-MM-DD", "end": "YYYY-MM-DD" }
    },

    "grades": {
      "7": {
        "topic": "[TOPIC NAME]",
        "phenomenon": {
          "week1": "[DRIVING QUESTION]",
          "week2": "[FOLLOW-UP QUESTION]",
          "week3": "Synthesis & Assessment"
        },
        "ngss": {
          "primary": {
            "code": "MS-[XXX]-[X]",
            "description": "[PERFORMANCE EXPECTATION]"
          },
          "spiral": [
            { "code": "MS-[XXX]-[X]", "description": "[FROM PREVIOUS CYCLE]", "fromCycle": cycleNum - 1 }
          ]
        },
        "threeDimensional": {
          "sep": ["[SEP-X: Practice Name]"],
          "dci": ["[X.X: Core Idea]"],
          "ccc": ["[CCC: Crosscutting Concept]"]
        },
        "misconceptions": [
          {
            "id": "[misconception-id]",
            "description": "[STUDENT BELIEF]",
            "correctUnderstanding": "[CORRECT CONCEPT]",
            "frequency": 0,
            "targetedIn": []
          }
        ],
        "weeks": {
          "1": generateWeekTemplate(7, cycleNum, 1),
          "2": generateWeekTemplate(7, cycleNum, 2),
          "3": {
            "title": "Synthesis & Assessment",
            "status": "planned",
            "isAssessmentWeek": true
          }
        },
        "materials": {
          "station1": ["[MATERIALS]"],
          "station2": ["[MATERIALS]"],
          "station3": ["[MATERIALS]"]
        }
      },

      "8": {
        "topic": "[TOPIC NAME]",
        "phenomenon": {
          "week1": "[DRIVING QUESTION]",
          "week2": "[FOLLOW-UP QUESTION]",
          "week3": "Synthesis & Assessment"
        },
        "ngss": {
          "primary": {
            "code": "MS-[XXX]-[X]",
            "description": "[PERFORMANCE EXPECTATION]"
          },
          "spiral": [
            { "code": "MS-[XXX]-[X]", "description": "[FROM PREVIOUS CYCLE]", "fromCycle": cycleNum - 1 }
          ]
        },
        "threeDimensional": {
          "sep": ["[SEP-X: Practice Name]"],
          "dci": ["[X.X: Core Idea]"],
          "ccc": ["[CCC: Crosscutting Concept]"]
        },
        "misconceptions": [
          {
            "id": "[misconception-id]",
            "description": "[STUDENT BELIEF]",
            "correctUnderstanding": "[CORRECT CONCEPT]",
            "frequency": 0,
            "targetedIn": []
          }
        ],
        "weeks": {
          "1": generateWeekTemplate(8, cycleNum, 1),
          "2": generateWeekTemplate(8, cycleNum, 2),
          "3": {
            "title": "Synthesis & Assessment",
            "status": "planned",
            "isAssessmentWeek": true
          }
        },
        "materials": {
          "station1": ["[MATERIALS]"],
          "station2": ["[MATERIALS]"],
          "station3": ["[MATERIALS]"]
        }
      }
    },

    "analytics": {
      "lastDataPull": null,
      "completionRates": {},
      "averageScores": {},
      "misconceptionFlags": []
    }
  };
}

function generateWeekTemplate(grade, cycle, week) {
  return {
    "title": `[WEEK ${week} TITLE]`,
    "status": "planned",
    "files": {
      "forms": `content/grade${grade}/cycle${String(cycle).padStart(2, '0')}/week${week}/forms.gs`,
      "studentPage": `content/grade${grade}/cycle${String(cycle).padStart(2, '0')}/week${week}/student-page.html`,
      "lessonPlan": `content/grade${grade}/cycle${String(cycle).padStart(2, '0')}/week${week}/lesson-plan.md`
    },
    "stations": {
      "hook": {
        "title": "[HOOK TITLE]",
        "points": 12,
        "resource": "[RESOURCE]",
        "questions": 5,
        "focus": "[LEARNING FOCUS]"
      },
      "station1": {
        "title": "[STATION 1 TITLE]",
        "points": 20,
        "resource": "[RESOURCE]",
        "resourceUrl": "",
        "questions": 6,
        "focus": "[LEARNING FOCUS]",
        "spiralTarget": "[PRIOR CONCEPT]"
      },
      "station2": {
        "title": "[STATION 2 TITLE]",
        "points": 20,
        "resource": "[RESOURCE]",
        "questions": 5,
        "focus": "[LEARNING FOCUS]"
      },
      "station3": {
        "title": "[STATION 3 TITLE]",
        "points": 25,
        "resource": "[RESOURCE]",
        "questions": 5,
        "focus": "[ENGINEERING CHALLENGE]"
      },
      "exitTicket": {
        "title": "[EXIT TICKET TITLE]",
        "points": 23,
        "questions": 6,
        "structure": {
          "new": 2,
          "spiral": 2,
          "integration": 1,
          "sep1": 1
        }
      }
    },
    "formIds": {},
    "responseSheetIds": {}
  };
}

// Main execution
function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Usage: node generate-cycle-config.js <cycle_number>');
    console.log('Example: node generate-cycle-config.js 4');
    process.exit(1);
  }

  const cycleNum = parseInt(args[0], 10);

  if (isNaN(cycleNum) || cycleNum < 3 || cycleNum > 10) {
    console.error('Error: Cycle number must be between 3 and 10');
    process.exit(1);
  }

  const config = generateCycleTemplate(cycleNum);
  const filename = `cycle${String(cycleNum).padStart(2, '0')}.json`;
  const filepath = path.join(__dirname, '..', 'config', 'cycles', filename);

  // Check if file exists
  if (fs.existsSync(filepath)) {
    console.error(`Error: ${filename} already exists. Delete it first if you want to regenerate.`);
    process.exit(1);
  }

  // Write file
  fs.writeFileSync(filepath, JSON.stringify(config, null, 2));
  console.log(`Created: ${filepath}`);
  console.log('');
  console.log('Next steps:');
  console.log('1. Fill in [PLACEHOLDERS] with actual content');
  console.log('2. Create content directories:');
  console.log(`   mkdir -p content/grade7/cycle${String(cycleNum).padStart(2, '0')}/week{1,2,3}`);
  console.log(`   mkdir -p content/grade8/cycle${String(cycleNum).padStart(2, '0')}/week{1,2,3}`);
  console.log('3. Run validation: node scripts/validate-cycle.js ' + cycleNum);
}

main();
