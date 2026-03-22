# Dew Icon Design System

> The canonical rules for every icon in the Dew library.
> Derived from the designer's 45 reference icons. See also STYLE_ANALYSIS.md.

---

## Philosophy

Dew icons are **tool icons**, not illustrations. They express a single concept, are recognizable at 16px, and feel like a family. Every line serves the concept — none decorate.

---

## Canvas

| Property | Value |
|---|---|
| `viewBox` | `0 0 24 24` |
| `width` / `height` | `24` (override via CSS — these are defaults only) |
| Coordinate range | Optical — typically `3.0–21.0` for geometric shapes, `4.5–19.5` for minimal line icons |

There is no rigid padding zone. The designer uses optical judgment: simple line icons (checkmark, minus) sit in the 4.5–19.5 range; organic shapes (circles, bells, hearts) extend closer to the canvas edges.

**Exception:** `download.svg` uses `0 0 20 20`. Preserve it as-is.

---

## Stroke Specification

```xml
stroke="currentColor"
stroke-width="1.5"
stroke-linejoin="round"
```

These three attributes apply to **every** stroke path in every icon.

### `stroke-linecap`

`stroke-linecap="round"` is added **only when a path has visually exposed endpoints** — the stroke tip is visible. It is omitted on closed paths and on paths whose endpoints connect back to the shape.

```xml
<!-- Add stroke-linecap: endpoints are exposed (the line just ends) -->
<path d="M19.5,12L4.5,12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>

<!-- Omit stroke-linecap: path closes, no exposed endpoint -->
<path d="M21,21L15.8,15.8...Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
```

---

## Fill

All icons are `fill="none"` — stroke only.

Set `fill="none"` on the `<svg>` element as the default. Individual paths inherit this.

**Exception:** `download.svg` uses `fill="currentColor"` with no stroke. It is the only filled icon.

---

## Color

Always `currentColor`. Never hardcode hex, rgb, or named colors.

---

## File Format

```xml
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="..." stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/>
</svg>
```

- No `version="1.1"` attribute
- No `xmlns:xlink` attribute
- No wrapper `<g>` elements unless structurally necessary
- No Penpot IDs, class names, or inline `style` attributes
- No `<defs>`, `<clipPath>`, or `<mask>` (not needed for outline icons)

---

## Path Construction

### Single-path, multiple sub-shapes

Combine multiple shapes into one `<path>` using multiple `M` (moveTo) commands when they share the same stroke style:

```xml
<!-- Two lines in one path — close icon -->
<path d="M6,18L18,6M6,6L18,18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>

<!-- Divider + outer frame in one path — menu-open icon -->
<path d="M9,6L9,18M5.25,20.25L18.75,20.25C..." stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
```

Use **separate `<path>` elements** only when sub-shapes are independent closed loops that can't share stroke settings (e.g., the outer lens and inner pupil of `eye-open`).

### Path commands

| Command | Use |
|---|---|
| `L` | Straight lines |
| `C` | Cubic bezier curves (all curves — never use `Q`) |
| `A` | Arcs (for circles drawn as two arcs) |
| `M` | Sub-path separator |
| `Z` | Close path |

### Coordinate precision

Preserve Penpot's decimal precision exactly. For generated icons (no Penpot source), use 2-decimal precision minimum — **do not round to whole integers**.

---

## Rounded Rectangles

Draw as `<path>` with `C` bezier corners, not as `<rect rx="...">`. Corner radius is 1.5 units throughout the set.

---

## SVG Elements

| Element | Used for |
|---|---|
| `<path>` | Everything — lines, curves, polygons, compound shapes |
| (none) | No `<circle>`, `<rect>`, `<line>`, `<polyline>` — these are Penpot artifacts |

When you see `<circle>` in a generated icon, convert it to an arc path:

```xml
<!-- Instead of: -->
<circle cx="12" cy="12" r="3.5"/>

<!-- Use: -->
<path d="M15.5,12A3.5,3.5,0,1,0,8.5,12A3.5,3.5,0,1,0,15.5,12Z" stroke="currentColor" stroke-width="1.5"/>
```

---

## Naming

| Pattern | Examples |
|---|---|
| Single concept | `home`, `search`, `bell-on` |
| Noun-state | `bell-on`, `bell-off`, `bell-ringing`, `camera-on`, `camera-off` |
| Noun-modifier | `sidebar-left`, `sidebar-right`, `chevron-up-down` |
| Noun-adjective | `eye-open`, `eye-closed`, `folder-open` |
| Noun-noun | `menu-lines`, `filter-horizontal`, `ellipsis-menu`, `information-circle`, `question-mark-circle` |

---

## Quality Checklist

Before committing any icon:

- [ ] `viewBox="0 0 24 24"` and `fill="none"` on `<svg>`
- [ ] All colors are `currentColor` — no hardcoded values
- [ ] `stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"` on every stroke path
- [ ] `stroke-linecap="round"` present only on paths with exposed endpoints
- [ ] No Penpot wrapper groups or class attributes
- [ ] No `version`, `xmlns:xlink`, or inline `style` attributes
- [ ] Uses `<path>` elements only (no `<circle>`, `<rect>`, `<line>`)
- [ ] Multiple sub-shapes consolidated into one `<path>` where possible
- [ ] Coordinate precision: 2+ decimal places for generated icons; exact Penpot values for cleaned reference icons
- [ ] Recognizable at 16×16px
- [ ] Filename is `kebab-case.svg`

---

## Don'ts

- **Don't use `Q`** — always `C` for curves
- **Don't use `<rect rx>`** — always path-based rounded rectangles
- **Don't use `<circle>`** — always arc paths
- **Don't round coordinates to whole integers** — preserve decimal precision
- **Don't add `stroke-linecap` to closed paths** — it has no effect and creates noise
- **Don't add decorative detail** — every line must serve the concept
- **Don't add fill variants yet** — the designer hasn't reviewed fills; hold off until confirmed
