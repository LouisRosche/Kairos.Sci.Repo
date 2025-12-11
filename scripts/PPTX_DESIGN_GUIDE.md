# PPTX Design Best Practices

Single source of truth for KAMS Science presentation design patterns.

## Cycle Structure

All cycles follow this pattern:

| Week | Structure | Points |
|------|-----------|--------|
| **Week 1 (Intro)** | Hook + Station 1 + Station 2 + Station 3 + Exit Ticket | 12 + 20 + 20 + 25 + 23 = 100 |
| **Week 2 (Deep Dive)** | Same as W1, builds on W1 concepts | 100 |
| **Week 3 (Assessment)** | Part 1 Synthesis + Part 2 Assessment + Part 3 Misconceptions | 20 + 60 + 20 = 100 |

**Exception:** Cycle 2 has Week 4 (extended cycle)

## Slide Structure Patterns

### W1/W2 Standard (16 slides)

1. Title slide
2. Phenomenon slide
3. Driving Question slide
4. Prior Knowledge slide
5. Learning Targets slide
6. Vocabulary slide
7. Hook intro slide
8. Hook support slide
9. Station 1 intro slide
10. Station 1 support slide
11. Station 2 intro slide
12. Station 2 support slide
13. Station 3 intro slide
14. Station 3 support slide
15. Exit Ticket intro slide
16. Summary/What You Learned slide

### W3 Assessment (11-12 slides)

1. Title slide
2. Assessment overview slide
3. What you'll be assessed on slide
4. Part 1 intro slide
5. Part 1 support slide
6. Part 2 intro slide
7. Part 2 support slide
8. Part 3 intro slide
9. Part 3 support slide
10. Tips for success slide
11. Summary slide

## Design Best Practices

### 1. Text Box Positioning

- Text boxes do NOT visually show actual text boundaries
- Always add PADDING between text box edges and shape edges
- Use vertical anchor (`MSO_ANCHOR.MIDDLE`) for centering in constrained heights
- Horizontal centering via `PP_ALIGN.CENTER` affects text within box, not box position

### 2. Title + Metadata Pattern

- Title text should NEVER share horizontal space with points/time indicators
- Pattern: Title on one line, metadata (points, mins) on SEPARATE line below
- OR: Place metadata as small text at far right of header bar, vertically centered

### 3. Text Wrapping Prevention

- Calculate approximate text width: `chars * font_size * 0.6` (rough estimate)
- For long titles, either reduce font size OR split into multiple lines manually
- Never let critical numbered items (1), 2), etc.) wrap to hidden positions

### 4. Vertical Centering in Shapes

- Set `text_frame.paragraphs[0].alignment` for horizontal
- Set `text_frame.anchor = MSO_ANCHOR.MIDDLE` for vertical centering
- Critical for small height boxes where text must appear centered

### 5. Color Contrast

- Dark text on light backgrounds, white text on dark backgrounds
- Always test: purple/blue text on purple/blue backgrounds = BAD

### 6. Standard Layout Measurements

| Element | Dimension |
|---------|-----------|
| Slide | 10" × 5.625" (16:9) |
| Header bar height | 0.6" - 0.75" |
| Standard margin | 0.15" - 0.3" |
| Standard padding inside shapes | 0.1" - 0.2" |
| Footer/notecard bar height | 0.55" - 0.7" |

### 7. Table Row Text Alignment (CRITICAL)

- ALWAYS use `anchor=MSO_ANCHOR.MIDDLE` for text in table rows
- Text box height should be ~0.45-0.5" for 0.55-0.65" row heights
- Position text box with small top offset (0.05-0.08") from row top
- This ensures text is vertically centered in each row cell
- Without vertical anchoring, text sits at TOP of box causing misalignment

### 8. Stat/Number Display Boxes

- Large numbers (24pt+) need `anchor=MSO_ANCHOR.MIDDLE`
- Labels below numbers also need vertical centering
- This prevents numbers appearing offset within their containers

## Using pptx_common.py

Import the shared module to reduce boilerplate:

```python
from pptx_common import (
    COLORS,
    create_base_presentation,
    add_colored_shape,
    add_text_box,
    add_title_bar,
    add_notecard_bar,
    Inches, Pt, PP_ALIGN, MSO_ANCHOR
)

def create_presentation():
    prs = create_base_presentation()
    # Add your slides...
    return prs
```

---

*KAMS Science Curriculum | December 2025*
