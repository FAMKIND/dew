# Dew Icons

**Dew** is the icon library for [Seed](https://github.com/FAMKIND/seed) — FAMKIND's open-source CSS framework. 52 essential SVG icons for 0-to-1 products.

Like morning dew activates a seed, these tiny icons bring the framework to life.

---

## Quick Start

### Copy-Paste SVG (inline)

The simplest usage — copy any icon from `src/icons/` and paste it directly into your HTML:

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true">
  <!-- paste path from src/icons/ here -->
</svg>
```

Icons use `currentColor`, so they inherit the text color of their parent element automatically.

### CSS Classes (via dist file)

Link the built CSS file, then apply classes to a `<span>` or `<i>` element:

```html
<link rel="stylesheet" href="dist/dew.css">

<!-- Outline variant (default) -->
<span class="dew dew-home"></span>

<!-- Fill variant -->
<span class="dew dew-home-fill"></span>
```

The `.dew` base class sets `display: inline-block`, sizes the icon to `1.5em`, and uses `mask-image` so the icon inherits `currentColor` via `background-color`.

**Control size and color with CSS:**

```css
/* Size via font-size on parent or directly */
.my-icon { font-size: 32px; }

/* Color via color property */
.icon-primary { color: #007aff; }
.icon-danger  { color: #ff3b30; }
```

### Chevrons

All four directional chevrons are included as separate icons:

```html
<span class="dew dew-chevron-right"></span>
<span class="dew dew-chevron-left"></span>
<span class="dew dew-chevron-up"></span>
<span class="dew dew-chevron-down"></span>
```

---

## Integration with Seed

Dew is designed to work alongside [Seed CSS](https://github.com/FAMKIND/seed). Icons naturally respect Seed's color tokens via `currentColor`:

```html
<!-- Seed utility classes control color; Dew inherits it -->
<span class="text-primary dew dew-bell"></span>
<span class="text-danger  dew dew-trash"></span>
<span class="text-muted   dew dew-info"></span>
```

---

## Framework Usage

Dew ships raw SVG files and a CSS file — no framework wrappers in v0.1. Use the patterns below until framework packages are published.

### React

```jsx
// Option 1: inline SVG component (copy path from src/icons/)
function HomeIcon({ size = 24, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" aria-hidden="true" {...props}>
      {/* paste path here */}
    </svg>
  );
}

// Option 2: CSS class (after importing dew.css)
import '@famkind/dew/dist/dew.css';
<span className="dew dew-home" aria-hidden="true" />
```

### Vue

```vue
<!-- Option 1: inline SVG (copy path from src/icons/) -->
<template>
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true">
    <!-- paste path here -->
  </svg>
</template>

<!-- Option 2: CSS class -->
<script setup>
import '@famkind/dew/dist/dew.css'
</script>
<template>
  <span class="dew dew-home" aria-hidden="true" />
</template>
```

---

## The Icons

| Name | Category |
|---|---|
| `home` | Navigation |
| `search` | Navigation |
| `menu-lines` | Navigation |
| `ellipsis-menu` | Navigation |
| `chevron-right` | Navigation |
| `chevron-left` | Navigation |
| `chevron-up` | Navigation |
| `chevron-down` | Navigation |
| `chevron-up-down` | Navigation |
| `sidebar-left-open` | Navigation |
| `sidebar-left-closed` | Navigation |
| `sidebar-right-open` | Navigation |
| `sidebar-right-closed` | Navigation |
| `plus` | Actions |
| `close` | Actions |
| `negative` | Actions |
| `pencil` | Actions |
| `trash` | Actions |
| `gear` | Actions |
| `share` | Actions |
| `filter-horizontal` | Actions |
| `link` | Actions |
| `undo` | Actions |
| `download` | Actions |
| `play` | Actions |
| `person` | People |
| `people` | People |
| `bell-on` | Notifications |
| `bell-off` | Notifications |
| `bell-ringing` | Notifications |
| `check` | Status |
| `alert-triangle` | Status |
| `information-circle` | Status |
| `question-mark-circle` | Status |
| `shield-check` | Status |
| `flag` | Status |
| `heart` | Status |
| `star` | Status |
| `eye-open` | Status |
| `eye-closed` | Status |
| `archive` | Content |
| `folder` | Content |
| `folder-open` | Content |
| `calendar` | Content |
| `chat` | Content |
| `camera-on` | Media |
| `camera-off` | Media |
| `microphone` | Media |
| `speaker-on` | Media |
| `music-note` | Media |
| `moon` | Utility |
| `sun` | Utility |

---

## Building

```bash
node scripts/build.js
```

Generates `dist/dew.css` and `preview/index.html`.

```bash
npm run preview
```

Opens the visual catalog in your browser.

---

## Links

- **FAMKIND** — [famkind.com](https://famkind.com)
- **Seed CSS Framework** — [github.com/FAMKIND/seed](https://github.com/FAMKIND/seed)
- **Design System** — [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)
- **Contributing** — [CONTRIBUTING.md](./CONTRIBUTING.md)
- **Issues** — [github.com/FAMKIND/dew/issues](https://github.com/FAMKIND/dew/issues)

---

## License

MIT © [FAMKIND](https://famkind.com)
