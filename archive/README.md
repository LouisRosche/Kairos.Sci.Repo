# Archive Directory

**Purpose:** Historical reference files and migration artifacts from pre-v3.0 architecture.

---

## Directory Structure

```
archive/
├── README.md              # This file
├── legacy/                # Pre-architecture backup files
│   ├── KAMS_Cycle3_Hub_Additions.xlsx    # Original data hub additions
│   ├── KAMS Instructional Tracker.xlsx   # Legacy tracking spreadsheet
│   └── htmls-scripts-contents-holder.docx # Original HTML/Scripts reference
└── migrations/            # Migration scripts and artifacts
    └── .gitkeep           # Placeholder for future migrations
```

---

## Contents

### `/legacy/` - Pre-Architecture Files

| File | Description | Status |
|------|-------------|--------|
| `KAMS_Cycle3_Hub_Additions.xlsx` | Original data hub configuration for Cycle 3 | Reference only |
| `KAMS Instructional Tracker.xlsx` | Legacy tracking spreadsheet (replaced by cycle-status.json) | Reference only |
| `htmls-scripts-contents-holder.docx` | Original HTML templates and script drafts | Reference only |

**Note:** These files are kept for historical reference. They do NOT reflect current system state. Use `content/grade{7,8}/cycle{XX}/` for current content.

### `/migrations/` - Migration Artifacts

Reserved for migration scripts when major version upgrades occur. Currently empty.

---

## Usage Guidelines

1. **DO NOT EDIT** files in this directory unless archiving new legacy content
2. **DO NOT REFERENCE** these files for current development - use `content/` instead
3. **DO ADD** files here when deprecating content that may have historical value
4. When adding files, update this README with file descriptions

---

## Related Documentation

- [ARCHITECTURE.md](../ARCHITECTURE.md) - Current system architecture
- [LESSONS-LEARNED.md](../LESSONS-LEARNED.md) - Institutional knowledge
- [MANIFEST.md](../MANIFEST.md) - Complete content inventory

---

*Last updated: 2025-12-07*
