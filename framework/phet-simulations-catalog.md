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
| C4 W1 | Ocean Acidification | ✅ | ocean-acidification-simulator.html | - |
| C4 W2 | Eutrophication | ✅ | eutrophication-cascade-simulator.html | - |
| C4 W3 | Synthesis | N/A | - | - |
| C5 W1 | Air Masses & Fronts | ✅ | air-mass-collision-simulator.html | - |
| C5 W2 | Weather Prediction | ✅ | weather-prediction-simulator.html | - |
| C5 W3 | Synthesis | N/A | - | - |
| C6 W1 | Plate Tectonics | ✅ plate-tectonics | - | Use PhET |
| C6 W2 | Seafloor Spreading | ❌ | pangaea-puzzle.html | ✅ |
| C6 W3 | Synthesis | N/A | - | - |
| C7 W1 | Rock Cycle | ❌ | rock-cycle-explorer.html | ✅ |
| C7 W2 | Geologic Time | ❌ | geologic-time-explorer.html | ✅ |
| C7 W3 | Synthesis | N/A | - | - |
| C8 W1 | Ecosystems & Food Webs | ❌ | trophic-cascade-simulator.html | ✅ |
| C8 W2 | Biodiversity Value | ❌ | biodiversity-resilience-simulator.html | ✅ |
| C8 W3 | Year-End Integration | N/A | - | - |

### Grade 8 Alignment

| Cycle | Topic | PhET Available | Custom Built | Gap |
|-------|-------|----------------|--------------|-----|
| C3 W1 | Natural Selection | ✅ natural-selection | population-genetics, predator-prey-physics | - |
| C3 W2 | Evidence of Evolution | ❌ | bone-homology-explorer, transitional-form-designer | - |
| C3 W3 | Synthesis | N/A | - | - |
| C4 W1 | Energy Pyramids | ✅ eating-and-exercise | energy-pyramid-calculator | - |
| C4 W2 | Invasive Species | ❌ | trophic-cascade-simulator | - |
| C4 W3 | Synthesis | N/A | - | - |
| C5 W1 | Newton's Laws | ✅ forces-and-motion-basics | - | Use PhET |
| C5 W2 | Forces in Motion | ✅ forces-and-motion-basics | - | Use PhET |
| C5 W3 | Synthesis | N/A | - | - |
| C6 W1 | Magnetism | ✅ magnets-and-electromagnets | - | Use PhET |
| C6 W2 | Electromagnetism | ✅ faradays-law | - | Use PhET |
| C6 W3 | Synthesis | N/A | - | - |
| C7 W1 | Chemical Reactions | ✅ reactants-products-and-leftovers | - | Use PhET |
| C7 W2 | Reaction Types | ✅ balancing-chemical-equations | - | Use PhET |
| C7 W3 | Synthesis | N/A | - | - |
| C8 W1 | Waves | ✅ wave-on-a-string | - | Use PhET |
| C8 W2 | Light & Sound | ✅ bending-light | - | Use PhET |
| C8 W3 | Year-End Integration | N/A | - | - |

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
| G7 | C4 | W1 | Ocean Acidification | ✅ COMPLETE |
| G7 | C4 | W2 | Eutrophication | ✅ COMPLETE |

> **Updated Dec 2025:** C4 custom simulations completed.
> - `ocean-acidification-simulator.html` - pH changes, carbonate chemistry, marine life effects
> - `eutrophication-cascade-simulator.html` - nutrient cascade, dead zones, remediation testing

### Medium Priority (G7 C6-C8 Custom Simulations)

> **Completed Dec 2025:** All G7 C6-C8 custom simulations have been built!

| Grade | Cycle | Week | Topic | Simulation | Status |
|-------|-------|------|-------|------------|--------|
| G7 | C6 | W2 | Seafloor Spreading | pangaea-puzzle.html | ✅ COMPLETE |
| G7 | C7 | W1 | Rock Cycle | rock-cycle-explorer.html | ✅ COMPLETE |
| G7 | C7 | W2 | Geologic Time | geologic-time-explorer.html | ✅ COMPLETE |
| G7 | C8 | W1 | Ecosystems | trophic-cascade-simulator.html | ✅ COMPLETE |
| G7 | C8 | W2 | Biodiversity | biodiversity-resilience-simulator.html | ✅ COMPLETE |

**Simulation Details:**
- `pangaea-puzzle.html` - Drag-and-drop continental reconstruction with fossil/rock evidence
- `rock-cycle-explorer.html` - Interactive rock type transformation with process visualization
- `geologic-time-explorer.html` - Draggable timeline with eras, fossils, and extinction events
- `trophic-cascade-simulator.html` - Yellowstone wolves food web with cascade scenarios
- `biodiversity-resilience-simulator.html` - Diverse vs. monoculture ecosystem comparison

**G8 Status:** All C5-C8 topics have PhET coverage (forces, magnetism, chemistry, waves).

### Low Priority (Future Enhancements)

---

## Resources

- **PhET Website**: https://phet.colorado.edu
- **All Simulations**: https://phet.colorado.edu/en/simulations
- **Biology Filter**: https://phet.colorado.edu/en/simulations/filter?subjects=biology
- **Teacher Activities**: https://phet.colorado.edu/en/teaching-resources
- **License**: CC BY 4.0 (free to use with attribution)

---

*PhET Simulations Catalog v1.0 | December 2025 | KAMS Science Curriculum*
