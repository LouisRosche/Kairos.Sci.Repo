# Deprecated Shared Modules

**Archived:** December 2025

## Why These Files Were Archived

### Config.gs (827 lines) and Constants.gs (327 lines)

These modules were created as "Single Source of Truth" abstractions intended to centralize configuration access across all forms and scripts. However, they were **never adopted in practice**:

- Zero references found in any `content/` forms.gs files
- Each form independently defines its own constants
- The `master-config.json` file serves the actual configuration needs

### What Happened

The modules were well-designed but the adoption never occurred:
1. Forms were created before the abstraction layer
2. No migration effort to refactor existing forms
3. Forms work correctly without these modules

### Data Scripts

Some data scripts (`data/aggregation/`, `data/hub/`, etc.) DO reference `Config.*` but all have defensive fallback code:

```javascript
if (typeof Config !== 'undefined' && Config.getTierForScore) {
  tier = Config.getTierForScore(score);
} else {
  // Fallback tier calculation
  tier = score >= 70 ? 1 : (score >= 50 ? 2 : 3);
}
```

These scripts work correctly without Config.gs - the fallback calculations match the centralized config values.

### If You Need This Functionality

The configuration values these modules provided are available directly in:
- `config/master-config.json` - All configuration values
- `config/cycles/*.json` - Per-cycle configuration

Consider whether adopting centralized configuration is worth the refactoring effort before re-implementing.

---

*Archived as part of codebase redundancy cleanup - December 2025*
