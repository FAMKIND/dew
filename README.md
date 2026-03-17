# Dew Icons

**Dew** is the icon library for [Seed](https://github.com/FAMKIND/seed) — FAMKIND's open-source CSS framework. 20 essential SVG icons for 0-to-1 products, each in outline and fill variants.

Like morning dew activates a seed, these tiny icons bring the framework to life.

---

## Quick Start

### Copy-Paste SVG (inline)

The simplest usage — copy any icon from `src/icons/` and paste it directly into your HTML:

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
  <g id="outline" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <!-- paths -->
  </g>
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

### Outline vs Fill Variants

Every icon ships in two variants:

| Variant | Class suffix | When to use |
|---|---|---|
| Outline | `.dew-[name]` | Default state, navigation, inactive |
| Fill | `.dew-[name]-fill` | Active state, selected, emphasized |

**Classic toggle pattern:**

```html
<button class="favorite-btn" aria-pressed="false">
  <span class="dew dew-heart" aria-hidden="true"></span>
  <span class="dew dew-heart-fill" aria-hidden="true" style="display:none"></span>
  <span class="sr-only">Favorite</span>
</button>
```

```js
btn.addEventListener('click', () => {
  const pressed = btn.getAttribute('aria-pressed') === 'true';
  btn.setAttribute('aria-pressed', String(!pressed));
  btn.querySelector('.dew-heart').style.display = pressed ? '' : 'none';
  btn.querySelector('.dew-heart-fill').style.display = pressed ? 'none' : '';
});
```

### Chevron Rotation

`chevron-right.svg` is the only directional chevron shipped. Rotate it via CSS for all four directions:

```html
<span class="dew dew-chevron-right"></span>                          <!-- → right  -->
<span class="dew dew-chevron-right" style="transform:rotate(90deg)"></span>  <!-- ↓ down   -->
<span class="dew dew-chevron-right" style="transform:rotate(180deg)"></span> <!-- ← left   -->
<span class="dew dew-chevron-right" style="transform:rotate(270deg)"></span> <!-- ↑ up     -->
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
// Option 1: inline SVG component (copy from src/icons/)
function HomeIcon({ size = 24, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" {...props}>
      <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {/* paste paths here */}
      </g>
    </svg>
  );
}

// Option 2: CSS class (after importing dew.css)
import '@famkind/dew/dist/dew.css';
<span className="dew dew-home" aria-hidden="true" />
```

### Vue

```vue
<!-- Option 1: inline SVG -->
<template>
  <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
    <g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <!-- paste paths here -->
    </g>
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

| Name | Variants | Category |
|---|---|---|
| `home` | outline, fill | Navigation |
| `search` | outline, fill | Navigation |
| `menu` | outline, fill | Navigation |
| `sidebar-left` | outline, fill | Navigation |
| `sidebar-right` | outline, fill | Navigation |
| `chevron-right` | outline, fill | Navigation |
| `arrow-left` | outline, fill | Navigation |
| `plus` | outline, fill | Actions |
| `x` | outline, fill | Actions |
| `pencil` | outline, fill | Actions |
| `trash` | outline, fill | Actions |
| `gear` | outline, fill | Actions |
| `share` | outline, fill | Actions |
| `filter` | outline, fill | Actions |
| `user` | outline, fill | Status |
| `bell` | outline, fill | Status |
| `check` | outline, fill | Status |
| `alert-triangle` | outline, fill | Status |
| `info` | outline, fill | Status |
| `heart` | outline, fill | Status |

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
