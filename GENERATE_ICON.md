# Generate a New Dew Icon

## Instructions for Claude / Claude Code

Read both `DESIGN_SYSTEM.md` and `STYLE_ANALYSIS.md` before starting. Study these three reference icons as style anchors — they represent the range from minimal to complex:

- `src/icons/close.svg` — minimal: two `L` commands in one path, `stroke-linecap="round"`
- `src/icons/bell-on.svg` — moderate: multiple `M` subpaths, cubic beziers, no `stroke-linecap`
- `src/icons/home.svg` — simple: mix of `L` and `C` commands, `stroke-linecap="round"`, architectural shape

---

## Icon Request

**Name:** [kebab-case-name]
**Description:** [what the icon represents]
**Metaphor:** [the real-world object or visual concept]
**Similar to:** [which existing icon in src/icons/ is closest in construction]

---

## Before writing SVG, state:

1. **Construction:** What geometric primitives (lines, arcs, bezier curves) make up this icon? Can they be combined into a single `<path>` with multiple `M` subpaths, or do they need separate `<path>` elements?
2. **Path commands:** Will you use `L` (lines), `C` (cubic bezier), `A` (arcs)? Never `Q`.
3. **`stroke-linecap`:** Does the path have exposed endpoints? If yes, add `stroke-linecap="round"`. If all paths close back to their origin, omit it.
4. **Coordinate range:** Where does this icon sit on the 24×24 canvas? Reference the ranges in STYLE_ANALYSIS.md.

---

## Output format

A single SVG file saved to `src/icons/[name].svg`:

```xml
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="..." stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/>
</svg>
```

For icons with no exposed endpoints (closed paths):

```xml
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="...Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
</svg>
```

For icons with two independent closed shapes (like `eye-open`):

```xml
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="...Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
  <path d="...Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
</svg>
```

---

## After generating

Run:

```bash
node scripts/build.js
open preview/index.html
```

Check the icon at 16px, 24px, 32px, and 48px in both light and dark mode.

---

## Quality Checklist

- [ ] `viewBox="0 0 24 24"` and `fill="none"` on `<svg>`
- [ ] `stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"` on all stroke paths
- [ ] `stroke-linecap="round"` only on paths with exposed endpoints
- [ ] No `<circle>`, `<rect>`, `<line>`, `<polyline>` — use `<path>` only
- [ ] No `Q` bezier commands — use `C` for curves
- [ ] No hardcoded colors
- [ ] No wrapper `<g>` groups
- [ ] Multiple sub-shapes in one `<path>` using multiple `M` commands where possible
- [ ] Coordinates use 2+ decimal places (not whole integers)
- [ ] Recognizable at 16px
- [ ] Filename is `kebab-case.svg` in `src/icons/`
