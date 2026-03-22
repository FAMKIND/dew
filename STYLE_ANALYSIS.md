# Dew Icon Style Analysis

> Extracted from the designer's 45 reference icons drawn in Penpot.
> This document supersedes any theoretical rules in DESIGN_SYSTEM.md.
> All future icons — generated or hand-drawn — must match these patterns.

---

## Stroke Properties

### Universal

| Property | Value |
|---|---|
| `stroke-width` | `1.5` — applied to every visible path without exception |
| `stroke-linejoin` | `round` — applied universally; corners always round |
| `stroke` | `currentColor` (converted from Penpot's `rgb(0, 0, 0)`) |
| `fill` | `none` — all icons are outline/stroke-only (except `download`) |

### `stroke-linecap`: Conditional, not universal

The designer sets `stroke-linecap: round` **only on paths with exposed endpoints** (open strokes). It is **not set** on closed paths where endpoints are invisible.

| Has `stroke-linecap="round"` | Does NOT have it |
|---|---|
| `close` — two line segments with open ends | `bell-on` — three continuous curves, all ends visually loop back |
| `check` — V-shape with two open ends | `search` — closed circle + connected handle (endpoints hidden) |
| `negative` — single horizontal line | `heart` — closed bezier path |
| `plus` (generated) | `star` — closed polygon path |
| `calendar` — lines with exposed pin ends | `ellipsis-menu` — three closed circle sub-paths |
| `shield-check` — both outer and inner strokes open | `microphone` — closed capsule shape |
| `menu-open`, `menu-closed` | `person` — both paths close naturally |
| `chevron` — open angle bracket | `eye-open` — both lens and pupil are closed paths |
| `flag` — pole and fabric with open ends | `camera-on` — all paths close |
| `home` — multiple open path segments | `play` — closed triangle path |

**Rule:** If you draw the icon as a continuous closed curve, omit `stroke-linecap`. If any path ends are visually exposed (the stroke has a visible tip), add `stroke-linecap="round"`.

---

## Path Construction Technique

### Single-path construction with multiple M subpaths

The designer consolidates multiple shapes into one `<path>` element wherever possible, using multiple `M` (moveTo) commands within a single `d` attribute. Examples:

```
close:   M6,18L18,6M6,6L18,18          ← two crossed lines in one path
menu-open: M9,6L9,18M5.25,20.25L...    ← divider line + rect outline in one path
check:   M19.5,4.5L9.027...L4.5,14.021 ← single continuous V-shape
negative: M19.5,12L4.5,12              ← single horizontal line
```

When shapes cannot share a path (separate closed sub-shapes), the designer uses two `<path>` elements. Example:

```
eye-open: two <path> elements
  Path 1: eye lens (large outer shape)
  Path 2: pupil circle (inner shape)
```

**Rule:** One `<path>` element per visual concept when possible. Use multiple `M` subpaths for compound strokes. Use separate `<path>` elements only when shapes are truly independent closed loops (like eye iris + outer lens, or gear body + center hole).

### Command usage

| Command | Used for |
|---|---|
| `L` | Straight lines — chevrons, close, check, menu, star |
| `C` | Cubic bezier curves — organic shapes (bell, heart, person, moon, microphone, flag) |
| `M` | Sub-path separator within a single `d` attribute |
| `Z` | Close path — all closed shapes |
| `A` | Arcs — circles drawn as two arcs (ellipsis-menu dots, gear center hole) |

### No `Q` (quadratic bezier)

The designer uses `C` (cubic bezier) for all curves, never `Q` (quadratic). When generating new icons, use `C` beziers or `L` lines only.

---

## Coordinate Precision

Coordinates are **high-precision decimals** as output by Penpot's export. Do not round or simplify them.

Examples of exact coordinates to preserve:
- `9.0277099609375` — not `9.03` or `9`
- `19.242645263671875` — not `19.24` or `19`
- `14.85693359375` — not `14.86` or `15`
- `17.082048416137695` — not `17.08` or `17`

**Why:** These precise control points define the designer's curves. Rounding changes the visual output.

**Exception for generated icons:** When drawing new icons without a Penpot source, use 2-decimal precision (e.g., `9.78`, `10.40`) which is accurate enough and readable. Do NOT round to whole integers — icon paths at 24px are sensitive to sub-pixel differences.

---

## Canvas Usage

Icons use a 24×24 viewBox. The designer does NOT enforce a strict padding zone. Usage follows optical judgment:

| Icon type | Typical coordinate range |
|---|---|
| Minimal line icons (close, check, negative) | `4.5 – 19.5` |
| Geometric shapes (calendar, archive, menu) | `3.0 – 21.0` (using 1.5px corner radii) |
| Organic shapes (bell, search circle, heart) | `2.25 – 21.75` |
| Full-bleed (eye, microphone, person) | `1.5 – 22.5` |

**Rule:** Let the icon breathe optically. A small icon like a checkmark or minus sign sits comfortably in the 4.5–19.5 range. A circle (search lens, bell) can extend to 3.0 or beyond. Don't force shapes into an artificial safe zone.

**Exception:** `download.svg` uses a 20×20 viewBox (not 24×24). It was drawn at a different size in Penpot. Preserve this as-is.

---

## Icon Complexity Levels

| Level | Icons | Characteristic |
|---|---|---|
| **Minimal** | `close`, `check`, `negative`, `chevron`, `chevron-up-down`, `menu-lines` | Pure line segments, `L` commands only |
| **Simple** | `home`, `share`, `calendar`, `flag`, `filter-horizontal`, `archive`, `negative`, `play`, `menu-open`, `menu-closed` | Mix of lines and simple shapes, minimal curves |
| **Moderate** | `bell-on`, `search`, `heart`, `person`, `pencil`, `star`, `moon`, `undo`, `link`, `shield-check` | Bezier curves defining recognizable silhouettes |
| **Complex** | `bell-off`, `bell-ringing`, `eye-open`, `eye-closed`, `camera-on`, `camera-off`, `music-note`, `speaker-on`, `microphone`, `people` | Multiple sub-paths, compound curves, overlapping shapes |

---

## Special Cases

### `download.svg` — filled icon (not stroked)

`download.svg` is the **only** filled icon in the set. It uses:
- `fill="currentColor"` instead of stroke
- `viewBox="0 0 20 20"` (not 24×24)
- No stroke properties at all

This was an intentional designer choice — the download action uses solid/filled paths for the arrow and tray bar. Do not force it into the stroke pattern.

### `ellipsis-menu.svg` — circles as path arcs

The three dots in `ellipsis-menu` are drawn as closed `M...C...Z` paths (Penpot's internal circle representation), not as `<circle>` elements. This is an artifact of Penpot's pen tool. The paths render identically to circles.

### Icons with `stroke-linejoin` only (no `stroke-linecap`)

When a path has visible angle joins (corners) but no exposed endpoints (e.g., `star`, `play`, `ellipsis-menu`), the Penpot export sets `stroke-linejoin="round"` but NOT `stroke-linecap`. Follow this pattern precisely.

---

## Rounded Rectangles

The designer draws rounded rectangles using `C` bezier commands (Penpot's internal representation), not SVG `rx`/`ry` attributes. The corner radius is consistently **1.5** design units (matching `stroke-width`), which maps to the following bezier control point offset: `~1.992` units.

Used in: `calendar`, `archive`, `menu-open`, `menu-closed`, `folder`, `camera-on`, `camera-off`, `sidebar-left` (generated), `sidebar-right` (generated).

---

## What the Designer Does NOT Do

- No `Q` (quadratic bezier) commands
- No `rx`/`ry` on `<rect>` elements — rounded rectangles are always paths
- No `<circle>` elements — circles are drawn as `M...A...Z` arc paths
- No hardcoded colors — always `rgb(0, 0, 0)` in Penpot (→ `currentColor` in clean output)
- No decorative detail beyond what defines the concept
- No icon exceeds ~15–20 path commands (except highly complex icons like `bell-off`)
- No gradients, filters, or effects

---

## Reference Icons for Style Matching

When generating new icons, study these three as the style anchors:

| Icon | File | Why study it |
|---|---|---|
| **Minimal** | `close.svg` | Simplest possible construction: two L commands in one path, round linecap |
| **Moderate** | `bell-on.svg` | Complex curves with multiple M subpaths, no linecap, shows bezier style |
| **Simple** | `home.svg` | Mix of L and C commands, round linecap, architectural precision |
