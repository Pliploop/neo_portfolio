import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const tokens = readFileSync(join(__dirname, 'tokens.css'), 'utf8');

function block(selector) {
  const m = tokens.match(new RegExp(`${selector.replace('.', '\\.')}\\s*{([^}]*)}`));
  return Object.fromEntries([...m[1].matchAll(/--([\w-]+):\s*([\d\s]+);/g)].map(([, k, v]) => [k, v.trim().split(/\s+/).map(Number)]));
}

const light = block(':root');
const dark = { ...light, ...block('.dark') };

const lin = (c) => { const s = c / 255; return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4; };
const lum = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
const blend = (fg, bg, alpha) => fg.map((c, i) => c * alpha + bg[i] * (1 - alpha));

function walk(dir) {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : /\.(jsx?)$/.test(f) && !f.includes('.test.') ? [p] : [];
  });
}

const TEXT_OPACITIES = [...new Set(walk(join(__dirname, '..'))
  .flatMap((f) => [...readFileSync(f, 'utf8').matchAll(/text-ink\/(\d+)/g)].map((m) => Number(m[1]))))];

// Tailwind 3.3 default opacity scale: other values compile to nothing.
const TAILWIND_OPACITY_SCALE = [0, 5, 10, 20, 25, 30, 40, 50, 60, 70, 75, 80, 90, 95, 100];

describe.each([['light', light], ['dark', dark]])('%s theme contrast', (_, t) => {
  test('accent text meets 4.5:1 on paper', () => {
    expect(ratio(t['accent-ink'], t.paper)).toBeGreaterThanOrEqual(4.5);
  });

  test('every muted ink opacity used for text meets 4.5:1', () => {
    TEXT_OPACITIES.forEach((o) => {
      expect({ o, r: ratio(blend(t.ink, t.paper, o / 100), t.paper) >= 4.5 }).toEqual({ o, r: true });
    });
  });
});

test('every text-ink opacity used exists in the Tailwind scale', () => {
  TEXT_OPACITIES.forEach((o) => expect(TAILWIND_OPACITY_SCALE).toContain(o));
});
