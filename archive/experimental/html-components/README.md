# HTML Components - Archived

**Archived:** December 2025
**Reason:** Never adopted in student pages; use outdated v2.0 inline styles

## Files

| File | Purpose | Lines |
|------|---------|-------|
| header.html | Page header with gradient | 40 |
| footer.html | Page footer | ~30 |
| navigation.html | Navigation menu | ~40 |
| resources.html | Resource links section | ~35 |

## Why Archived

These component templates were created for the v2.0 student page pattern but:

1. **Never imported** - No student pages actually use these components
2. **Outdated style** - Use inline CSS instead of v3.0 CSS class pattern
3. **Template variables** - Use {{PLACEHOLDER}} syntax that isn't processed

## Current Approach

Student pages now use:
- `shared/styles/design-system.css` for all styling
- Full page templates (`templates/html/student-page-template.html`) instead of components
- CSS classes instead of inline styles

## If Restoration Needed

These could be modernized by:
1. Replacing inline styles with CSS classes from `design-system.css`
2. Converting to a proper template engine or static includes
3. Adding to the build pipeline

---

*Archived as part of December 2025 redundancy cleanup.*
