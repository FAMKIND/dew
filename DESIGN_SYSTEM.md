# Dew Icon Design System

> The canonical rules for every icon in the Dew library.
> Every contributor — human or LLM — must follow this document.

---

## Philosophy

Dew icons are **tool icons**, not illustrations. They exist to label actions, describe states, and guide navigation — never to decorate. They should:

- **Express a single concept** — if you need two metaphors, you need two icons
- **Be recognizable at 16px** — if it doesn't read at 16×16, simplify it
- **Feel like a family** — every icon in the set should look like it belongs with the others
- **Use familiar metaphors** — surprise is the enemy of usability

---

## Canvas & Grid

| Property | Value |
|---|---|
| Viewbox | `0 0 24 24` |
| Active area | 20×20px (2px padding on all sides) |
| Keyline grid | 4px base grid |

Every icon lives within the `0 0 24 24` viewbox. The active drawing area is **20×20px**, leaving a 2px padding on all sides. Snap to the 4px grid wherever possible.

---

## Keyline Shapes

All icons are based on one of four keyline shapes. These ensure optical consistency across the set — a circle icon and a square icon appear to be the same visual weight even though they have different areas.

| Shape | Dimensions | Use for |
|---|---|---|
| Circle | 20×20px (r=10, cx=12, cy=12) | Circular concepts: search, gear, user, info |
| Square | 18×18px (centered in canvas) | Symmetric concepts: home, plus, x, heart |
| Landscape | 20×14px (centered in canvas) | Wide concepts: menu, sidebar, arrow |
| Portrait | 14×20px (centered in canvas) | Tall concepts: chevron, trash, bell, filter |

---

## Stroke Specification

| Property | Value |
|---|---|
| `stroke` | `currentColor` |
| `stroke-width` | `1.5` |
| `stroke-linecap` | `round` |
| `stroke-linejoin` | `round` |
| `fill` | `none` (outline variant) |

**Never hardcode a color.** Every path, circle, and line must use `currentColor` for stroke and fill. This ensures icons work on any background and in any theme.

---

## File Format

Each icon is a single `.svg` file named in `kebab-case`. The file contains **both variants** — outline and fill — wrapped in groups with `id="outline"` and `id="fill"`.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
  <!-- Icon Name -->
  <!-- Keyline: [circle|square|landscape|portrait] -->
  <!-- Construction: [describe the geometric primitives] -->

  <g id="outline" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <!-- outline paths -->
  </g>

  <g id="fill" style="display:none">
    <!-- fill paths — closed shapes use fill="currentColor" stroke="none" -->
    <!-- open paths retain stroke="currentColor" stroke-width="1.5" -->
  </g>
</svg>
```

### Default state

By default, `#outline` is visible and `#fill` is hidden (`display:none`). Users or the CSS class system toggle between variants.

---

## Outline → Fill Conversion Rules

The fill variant is **not** a flood-fill of the outline. Follow these rules:

1. **Closed paths** → change to `fill="currentColor" stroke="none"`
2. **Open paths** (lines, arcs that don't form a closed shape) → keep as `stroke="currentColor" stroke-width="1.5"`, remove fill
3. **Interior details** (lines inside a shape, like slats in a trash can) → convert to **negative space** using a filled white shape, or omit if they won't read
4. **Silhouette must match** — the outer boundary of fill must be identical to outline
5. **Holes** (like the axle of a gear) → use a filled shape with `fill="currentColor"` that has a hole cut via `fill-rule="evenodd"` or a compound path

---

## Angle Conventions

| Use | Angle |
|---|---|
| Diagonal lines (search handle, pencil, x) | 45° |
| Shallow diagonals (checkmark right arm) | ~25–30° |
| Steep diagonals (checkmark left arm) | ~60–65° |
| Arrow or chevron opening angle | ~90° total (45° each arm) |

---

## Optical Balance Rules

These are corrections that must be applied even though they break mathematical symmetry:

- **Circles appear smaller than squares** at the same bounding box — scale circles up ~5% relative to squares
- **Diagonal lines appear thinner** than horizontal/vertical lines — no correction needed with round caps
- **Top-heavy shapes** (bell, house roof) need their visual center of mass nudged ~1px downward
- **Fine interior details** at sizes below 20×20px should be **omitted or simplified**, not scaled down

---

## Naming Convention

| Pattern | Example |
|---|---|
| Single concept | `home`, `search`, `bell` |
| Compound (noun-modifier) | `sidebar-left`, `sidebar-right` |
| Compound (noun-action) | `arrow-left` |
| Avoid | `ic_home`, `homeIcon`, `nav_back` |

---

## Quality Checklist

Before submitting any icon, verify:

- [ ] Uses `viewBox="0 0 24 24"`
- [ ] All colors are `currentColor` — no hardcoded hex, rgb, or named colors
- [ ] Outline variant: `fill="none"`, `stroke="currentColor"`, `stroke-width="1.5"`, `stroke-linecap="round"`, `stroke-linejoin="round"`
- [ ] Fill variant: closed paths use `fill="currentColor" stroke="none"`, open paths keep stroke
- [ ] Both `#outline` and `#fill` groups present; fill group has `style="display:none"`
- [ ] Icon is recognizable at 16×16px
- [ ] Icon uses the correct keyline shape
- [ ] Icon follows the angle conventions
- [ ] No decorative detail — every line serves the concept
- [ ] File is named in `kebab-case.svg`
- [ ] Construction comments included in the SVG file

---

## Don'ts

- **Don't add drop shadows, gradients, or effects** — icons must be flat
- **Don't mix stroke and fill in the outline variant** — outline is strokes only
- **Don't hardcode sizes in the SVG** — use `width="24" height="24"` as defaults only; CSS controls display size
- **Don't create icons with more than ~15 path segments** — complexity kills small-size legibility
- **Don't copy-paste from icon libraries without redesigning** — icons must be original
