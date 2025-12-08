# PhET Interactive Simulations Catalog
## Reference for Digital-First Science Instruction

**Version 1.0** | December 2025

---

## Overview

PhET Interactive Simulations (University of Colorado Boulder) provides free, research-based simulations for science education. This catalog documents simulations relevant to G7/G8 NGSS-aligned curriculum.

**Usage Priority:**
1. Use PhET when a high-quality simulation exists for the topic
2. Build custom simulations when PhET lacks coverage or specificity
3. Custom simulations live in `content/grade*/cycle*/week*/simulations/`

---

## Embed Format

### Standard Iframe Code
```html
<iframe
    src="https://phet.colorado.edu/sims/html/[simulation-name]/latest/[simulation-name]_en.html"
    width="100%"
    height="600"
    style="border: 1px solid #E2E8F0; border-radius: 8px;"
    loading="lazy"
    allowfullscreen>
</iframe>
```

### URL Parameters
- **Language**: Replace `_en.html` with language code (e.g., `_es.html` for Spanish)
- **Screen selection**: Add `?screens=1,2` to limit visible screens
- **Always use HTTPS** for LMS compatibility

---

## Biology/Life Science Simulations

### Evolution & Genetics (G8 C3)

| Simulation | Topics | Embed URL | Custom Alternative |
|------------|--------|-----------|-------------------|
| **Natural Selection** | Mutation, selection, population change | `natural-selection` | population-genetics.html |
| **Gene Expression Essentials** | DNA, transcription, translation | `gene-expression-essentials` | - |

### Ecology & Ecosystems (G8 C4+)

| Simulation | Topics | Embed URL | Custom Alternative |
|------------|--------|-----------|-------------------|
| **Eating and Exercise** | Energy, calories, metabolism | `eating-and-exercise` | energy-pyramid-calculator.html |

---

## Earth Science Simulations

### Climate & Atmosphere (G7 C3)

| Simulation | Topics | Embed URL | Custom Alternative |
|------------|--------|-----------|-------------------|
| **The Greenhouse Effect** | Radiation, absorption, climate | `greenhouse-effect` | thermal-trap-designer.html |
| **Blackbody Spectrum** | Thermal radiation, temperature | `blackbody-spectrum` | - |

### Carbon & Biogeochemical Cycles (G7 C3-C4)

| Simulation | Topics | Embed URL | Custom Alternative |
|------------|--------|-----------|-------------------|
| (No direct PhET match) | Carbon cycle | - | carbon-cycle-tracer.html |
| (No direct PhET match) | Carbon sinks | - | carbon-sink-simulator.html |

---

## Physics Simulations

### Forces & Motion (G7/G8)

| Simulation | Topics | Embed URL | Notes |
|------------|--------|-----------|-------|
| **Forces and Motion: Basics** | Newton's Laws, friction | `forces-and-motion-basics` | Good for intro |
| **Projectile Motion** | Kinematics, vectors | `projectile-motion` | - |
| **Energy Skate Park: Basics** | KE, PE, conservation | `energy-skate-park-basics` | Middle school version |

### Energy (G7/G8)

| Simulation | Topics | Embed URL | Notes |
|------------|--------|-----------|-------|
| **Energy Forms and Changes** | Heat transfer, energy types | `energy-forms-and-changes` | Good for energy units |
| **States of Matter** | Solid, liquid, gas, phase change | `states-of-matter` | - |
| **Gas Properties** | Pressure, volume, temperature | `gas-properties` | Ideal gas law |

### Waves & Light (G7/G8)

| Simulation | Topics | Embed URL | Notes |
|------------|--------|-----------|-------|
| **Wave Interference** | Waves, interference, diffraction | `wave-interference` | - |
| **Bending Light** | Refraction, reflection, Snell's Law | `bending-light` | - |
| **Color Vision** | Light, colors, vision | `color-vision` | - |

### Electricity & Circuits (G8)

| Simulation | Topics | Embed URL | Notes |
|------------|--------|-----------|-------|
| **Circuit Construction Kit: DC** | Series, parallel, Ohm's Law | `circuit-construction-kit-dc-virtual-lab` | Virtual lab version |
| **Ohm's Law** | V, I, R relationships | `ohms-law` | Simpler than CCK |
| **Balloons and Static Electricity** | Static charge, attraction | `balloons-and-static-electricity` | Good intro |

---

## Curriculum Mapping

### Grade 7 Alignment

| Cycle | Topic | PhET Available | Custom Built | Gap |
|-------|-------|----------------|--------------|-----|
| C3 W1 | Greenhouse Effect | ✅ greenhouse-effect | thermal-trap-designer | - |
| C3 W2 | Feedback Loops | ❌ | ice-albedo-feedback, carbon-sink-simulator | - |
| C3 W3 | Synthesis | N/A | - | - |
| C4 W1 | Ocean Acidification | ❌ | - | **NEEDS SIM** |
| C4 W2 | Eutrophication | ❌ | - | **NEEDS SIM** |
| C4 W3 | Synthesis | N/A | - | - |
| C5-C10 | TBD | ? | - | **AUDIT NEEDED** |

### Grade 8 Alignment

| Cycle | Topic | PhET Available | Custom Built | Gap |
|-------|-------|----------------|--------------|-----|
| C3 W1 | Natural Selection | ✅ natural-selection | population-genetics, predator-prey-physics | - |
| C3 W2 | Evidence of Evolution | ❌ | bone-homology-explorer, transitional-form-designer | - |
| C3 W3 | Synthesis | N/A | - | - |
| C4 W1 | Energy Pyramids | ✅ eating-and-exercise | energy-pyramid-calculator | - |
| C4 W2 | Invasive Species | ❌ | trophic-cascade-simulator | - |
| C4 W3 | Synthesis | N/A | - | - |
| C5-C10 | TBD | ? | - | **AUDIT NEEDED** |

---

## Custom Simulation Standards

When building custom simulations (no PhET available):

### File Location
```
content/grade{7,8}/cycle{XX}/week{1-3}/simulations/
├── simulation-name.html    # Self-contained HTML5
└── ...
```

### Required Features
1. **Mobile-responsive** - Works on Chromebooks (1366×768 minimum)
2. **Accessible** - Keyboard navigation, ARIA labels, color-blind safe
3. **Self-contained** - No external dependencies (inline CSS/JS)
4. **Instructional scaffolding** - Built-in hints, feedback, learning checks
5. **Standards header** - Include cycle/week/topic metadata

### Header Template
```html
<!--
================================================================================
Grade {X} Cycle {XX} Week {X} - {Simulation Name}
================================================================================
100% DIGITAL/SIMULATION-BASED INSTRUCTION
Interactive simulation for {topic description}.
Updated: {Month} 2025 | Material-Free Audit Complete
================================================================================
-->
```

---

## Gap Analysis: Simulations Needed

### High Priority (C3-C4, in production soon)

| Grade | Cycle | Week | Topic | Status |
|-------|-------|------|-------|--------|
| G7 | C4 | W1 | Ocean Acidification | **NEEDS CUSTOM SIM** |
| G7 | C4 | W2 | Eutrophication | **NEEDS CUSTOM SIM** |

### Medium Priority (C5-C10, future development)

Audit lesson-plan.md files in C5-C10 to identify hands-on activities requiring simulation replacements.

---

## Resources

- **PhET Website**: https://phet.colorado.edu
- **All Simulations**: https://phet.colorado.edu/en/simulations
- **Biology Filter**: https://phet.colorado.edu/en/simulations/filter?subjects=biology
- **Teacher Activities**: https://phet.colorado.edu/en/teaching-resources
- **License**: CC BY 4.0 (free to use with attribution)

---

*PhET Simulations Catalog v1.0 | December 2025 | KAMS Science Curriculum*
