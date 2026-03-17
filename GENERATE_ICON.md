# Generate a New Dew Icon

## Instructions for Claude / Claude Code

Read `DESIGN_SYSTEM.md` for all rules. Study these reference icons for style:
- `src/icons/home.svg` (tests basic shapes, square keyline)
- `src/icons/search.svg` (tests circles + angled lines, circle keyline)
- `src/icons/chevron-right.svg` (tests minimal geometry, portrait keyline)

---

## Icon Request

**Name:** [kebab-case-name]
**Description:** [what the icon represents]
**Metaphor:** [the real-world object or visual concept]
**Suggested keyline:** [circle / square / landscape / portrait]

---

## Before writing SVG, state:

1. **Keyline:** Which shape template and why
2. **Construction:** What geometric primitives make up this icon
3. **Optical adjustments:** Anything that needs nudging for visual balance
4. **Fill strategy:** How the outline converts to fill — which paths become solid, which become negative space, what gets omitted

---

## Then output:

A single SVG file saved to `src/icons/[name].svg`, following the format below:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
  <!-- Icon Name: [name] -->
  <!-- Keyline: [circle|square|landscape|portrait] -->
  <!-- Construction: [describe what was drawn] -->

  <g id="outline" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <!-- outline paths -->
  </g>

  <g id="fill" style="display:none">
    <!-- fill paths -->
  </g>
</svg>
```

After generating the SVG, run:

```bash
node scripts/build.js
open preview/index.html
```

And verify the icon at 16px, 24px, 32px, and 48px in both light and dark mode.

---

## Quality Checklist

- [ ] `viewBox="0 0 24 24"`
- [ ] All colors are `currentColor` — no hardcoded values
- [ ] Outline: `fill="none"`, `stroke="currentColor"`, `stroke-width="1.5"`, round linecap and linejoin
- [ ] Fill: closed paths `fill="currentColor" stroke="none"`, open paths keep stroke
- [ ] Both `#outline` and `#fill` groups present; fill group hidden
- [ ] Recognizable at 16×16px
- [ ] Correct keyline used
- [ ] No decorative detail — every line serves the concept
- [ ] File named `kebab-case.svg` in `src/icons/`
- [ ] Construction comments in file
