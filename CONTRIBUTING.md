# Contributing to Dew Icons

Thank you for contributing to Dew. This guide covers how to add icons manually or with an LLM, and the quality bar every icon must meet.

---

## Before You Start

Read [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) in full. It defines the canvas, stroke spec, file format, keyline shapes, and quality checklist that every icon must follow.

---

## The Design System in 60 Seconds

- **Canvas:** `viewBox="0 0 24 24"`, active area 20×20px (2px padding)
- **Stroke:** `stroke="currentColor"`, `stroke-width="1.5"`, `stroke-linecap="round"`, `stroke-linejoin="round"`
- **Color:** Always `currentColor` — never hardcode hex, rgb, or named colors
- **Variants:** Every icon ships with both `#outline` and `#fill` groups in one file
- **Default:** `#outline` visible, `#fill` has `style="display:none"`
- **File name:** `kebab-case.svg`

---

## Adding an Icon Manually

### 1. Choose the right keyline

Before drawing, identify which keyline shape your icon belongs to:

| Shape | Dimensions | Examples |
|---|---|---|
| Circle | 20×20 | search, gear, user, info |
| Square | 18×18 | home, plus, x, heart |
| Landscape | 20×14 | menu, sidebar-left, arrow-left |
| Portrait | 14×20 | chevron-right, trash, bell, filter |

### 2. Sketch the construction

Write down the geometric primitives before opening an SVG editor:
- What basic shapes compose this icon? (circles, lines, rectangles, arcs)
- What angles do the diagonals use? (follow the angle conventions in DESIGN_SYSTEM.md)
- What optical adjustments are needed?

### 3. Create the SVG file

Create `src/icons/[icon-name].svg` using this template:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
  <!-- Icon Name: [name] -->
  <!-- Keyline: [circle|square|landscape|portrait] -->
  <!-- Construction: [describe what you drew] -->

  <g id="outline" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <!-- your outline paths here -->
  </g>

  <g id="fill" style="display:none">
    <!-- your fill paths here -->
    <!-- closed shapes: fill="currentColor" stroke="none" -->
    <!-- open paths: keep stroke="currentColor" stroke-width="1.5" fill="none" -->
  </g>
</svg>
```

### 4. Design the fill variant

The fill variant is not a flood-fill. Follow the conversion rules:

1. **Closed paths** → `fill="currentColor" stroke="none"`
2. **Open paths** (lines that don't close) → keep `stroke="currentColor"`, no fill
3. **Interior details** → convert to negative space or omit
4. **Outer silhouette** must be identical to the outline variant

### 5. Run through the quality checklist

From DESIGN_SYSTEM.md — check every item:

- [ ] `viewBox="0 0 24 24"`
- [ ] All colors are `currentColor`
- [ ] Outline: `fill="none"`, `stroke="currentColor"`, `stroke-width="1.5"`, round linecap and linejoin
- [ ] Fill: closed paths use `fill="currentColor" stroke="none"`, open paths keep stroke
- [ ] Both `#outline` and `#fill` groups present; fill group is hidden
- [ ] Recognizable at 16×16px
- [ ] Correct keyline shape used
- [ ] Angle conventions followed
- [ ] No decorative detail
- [ ] File is named `kebab-case.svg`
- [ ] Construction comments in the file

### 6. Rebuild and preview

```bash
node scripts/build.js
open preview/index.html
```

Inspect your icon at 16px, 24px, 32px, and 48px. Check it in both light and dark modes.

### 7. Submit

Open a PR. The PR description should include:
- The icon name and category
- Which keyline shape it uses
- A screenshot of the icon at 24px (both variants)
- Confirmation that you've run through the quality checklist

---

## Adding an Icon with an LLM

Use the template in [GENERATE_ICON.md](./GENERATE_ICON.md). Copy the template, fill in the icon request section, and paste it into Claude or another LLM that has read access to this repository.

The template instructs the LLM to:
1. State the keyline and construction before drawing
2. Write both outline and fill variants
3. Run through the quality checklist
4. Produce a properly formatted SVG file

After generating the SVG:
1. Drop it into `src/icons/`
2. Run `node scripts/build.js`
3. Inspect in `preview/index.html`
4. Make any corrections needed
5. Submit a PR

---

## Style Guidelines

**Do:**
- Study the reference icons (`home.svg`, `search.svg`, `chevron-right.svg`) before drawing
- Use round caps and joins — they are a defining characteristic of the Dew family
- Test at 16px — if it's ambiguous at that size, simplify
- Keep icons within the 20×20px active area (2px padding on all sides)
- Follow the 4px grid when possible

**Don't:**
- Copy paths from other icon libraries without redesigning
- Add decorative elements — every line must serve the concept
- Hardcode colors
- Add gradients, shadows, or effects
- Create icons with more than ~15 path segments

---

## Icon Categories

When proposing a new icon, suggest which category it belongs to:

| Category | Description |
|---|---|
| Navigation | Moving between places, revealing/hiding panels |
| Actions | Things users do to content |
| Status & Feedback | States, notifications, confirmations |
| Content | Representing content types |
| Commerce | Transaction and e-commerce |
| Media | Playback and media controls |

---

## Questions?

Open an issue at [github.com/FAMKIND/dew/issues](https://github.com/FAMKIND/dew/issues) or reach out via [famkind.com](https://famkind.com).
