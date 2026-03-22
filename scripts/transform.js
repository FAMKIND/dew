#!/usr/bin/env node
/**
 * transform.js — strip Penpot export wrappers and produce clean Dew SVGs
 *
 * For stroke icons: extract <path> elements from the strokes group
 *   (style contains "stroke: rgb(0, 0, 0)")
 * For download (fill icon): extract <path> elements with fill: rgb(0, 0, 0)
 * Converts all colors to currentColor, preserves exact path data.
 */

const fs = require('fs');
const path = require('path');

const REF_DIR = path.join(__dirname, '../reference');
const OUT_DIR = path.join(__dirname, '../src/icons');

// Ensure output dir exists
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

// ── Filename normalisation ─────────────────────────────────────────────────
function toCleanName(filename) {
  return filename
    .replace(/\.svg\.svg$/, '.svg')  // double extension
    .replace(/-24x24\.svg$/, '.svg')
    .replace(/24x24\.svg$/, '.svg')  // menu_lines24x24.svg
    .replace(/_/g, '-')               // underscores → hyphens
    .toLowerCase();
}

// ── Extract individual paths from a single SVG string ────────────────────
function extractPaths(svgContent, filename) {
  const isDownload = filename.includes('download');

  // Find all <path ... /> or <path ...></path> elements
  const pathRegex = /<path\s([^>]*?)(?:\/>|><\/path>)/gs;
  const results = [];
  let match;

  while ((match = pathRegex.exec(svgContent)) !== null) {
    const attrs = match[1];

    // Extract d attribute
    const dMatch = attrs.match(/\bd="([^"]*)"/);
    if (!dMatch) continue;
    const d = dMatch[1];
    if (!d || d.length < 5) continue;

    if (isDownload) {
      // Download uses filled paths
      if (!attrs.includes('fill: rgb(0, 0, 0)') && !attrs.match(/style="[^"]*fill:\s*rgb\(0,\s*0,\s*0\)/)) continue;
      results.push({ d, type: 'fill' });
    } else {
      // Stroke icons: only paths from the strokes group
      if (!attrs.includes('stroke: rgb(0, 0, 0)') && !attrs.includes('stroke:rgb(0, 0, 0)')) continue;

      const styleMatch = attrs.match(/style="([^"]*)"/);
      const style = styleMatch ? styleMatch[1] : '';

      const hasLinecap = style.includes('stroke-linecap: round') || style.includes('stroke-linecap:round');
      const hasLinejoin = attrs.includes('stroke-linejoin="round"') || style.includes('stroke-linejoin: round');

      results.push({ d, type: 'stroke', hasLinecap, hasLinejoin });
    }
  }

  return results;
}

// ── Determine viewBox from source file ───────────────────────────────────
function getViewBox(svgContent) {
  const m = svgContent.match(/viewBox="([^"]*)"/);
  return m ? m[1] : '0 0 24 24';
}

// ── Build clean SVG from extracted paths ─────────────────────────────────
function buildCleanSVG(paths, viewBox) {
  if (paths.length === 0) return null;

  const vbDims = viewBox.split(' ');
  const w = vbDims[2] || '24';
  const h = vbDims[3] || '24';

  if (paths[0].type === 'fill') {
    // Download: filled icon
    const pathEls = paths.map(p =>
      `  <path d="${p.d}" fill="currentColor"/>`
    ).join('\n');
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="${viewBox}" fill="none">\n${pathEls}\n</svg>\n`;
  }

  // Stroke icon — build attribute string
  const pathEls = paths.map(p => {
    let attrs = `d="${p.d}" stroke="currentColor" stroke-width="1.5"`;
    if (p.hasLinejoin !== false) attrs += ` stroke-linejoin="round"`;
    if (p.hasLinecap) attrs += ` stroke-linecap="round"`;
    return `  <path ${attrs}/>`;
  }).join('\n');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="${viewBox}" fill="none">\n${pathEls}\n</svg>\n`;
}

// ── Main ──────────────────────────────────────────────────────────────────
const files = fs.readdirSync(REF_DIR).filter(f => f.endsWith('.svg'));
console.log(`Processing ${files.length} reference icons...\n`);

const results = { ok: [], skipped: [], errors: [] };

for (const filename of files) {
  const cleanName = toCleanName(filename);
  const content = fs.readFileSync(path.join(REF_DIR, filename), 'utf8');
  const viewBox = getViewBox(content);

  const paths = extractPaths(content, filename);

  if (paths.length === 0) {
    results.skipped.push(filename);
    console.warn(`  ⚠ SKIPPED (no paths found): ${filename}`);
    continue;
  }

  const svg = buildCleanSVG(paths, viewBox);
  if (!svg) {
    results.errors.push(filename);
    console.error(`  ✗ ERROR: ${filename}`);
    continue;
  }

  const outPath = path.join(OUT_DIR, cleanName);
  fs.writeFileSync(outPath, svg);
  console.log(`  ✓ ${filename.padEnd(38)} → ${cleanName}`);
  results.ok.push({ from: filename, to: cleanName });
}

console.log(`\n✓ ${results.ok.length} icons written to src/icons/`);
if (results.skipped.length) console.warn(`⚠ ${results.skipped.length} skipped: ${results.skipped.join(', ')}`);
if (results.errors.length) console.error(`✗ ${results.errors.length} errors: ${results.errors.join(', ')}`);

// Output icon manifest for use in style analysis
const manifest = results.ok.map(r => r.to).sort();
fs.writeFileSync(path.join(__dirname, '../src/icons/.manifest.json'), JSON.stringify(manifest, null, 2));
console.log('\nWrote src/icons/.manifest.json');
