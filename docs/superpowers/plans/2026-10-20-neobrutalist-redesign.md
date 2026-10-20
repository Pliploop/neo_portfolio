# Neobrutalist Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild julienguinot.com as a minimal neobrutalist site (paper / ink / vermilion, Archivo + JetBrains Mono, Zighead/Saint drop-caps) with an in-house Bayer-dither WebGL shader and animated canvas ASCII, on Vite, keeping all current content.

**Architecture:** Vite + React 18 + React Router 6 + Tailwind 3. A small `src/fx/` engine (pure maths modules + one shared rAF loop + one shared offscreen WebGL context) feeds two decorative components, `DitherField` and `AsciiField`. Pages are layout only; all copy and lists live in `src/data/`. Route changes run through the View Transitions API with a dithered mask wipe.

**Tech Stack:** Vite, React 18, React Router 6, Tailwind CSS 3, @fontsource-variable (Archivo, JetBrains Mono), @emailjs/browser, Vitest + Testing Library + jsdom, Playwright.

**Spec:** `docs/superpowers/specs/2026-10-20-neobrutalist-redesign-design.md`

## Global Constraints

- Palette: `--paper` `239 235 227` (#EFEBE3), `--ink` `20 20 20` (#141414), `--accent` `255 74 28` (#FF4A1C); dark mode swaps paper/ink, accent shared. Greys only via opacity of ink/paper.
- Accent text on paper uses `--accent-ink` `230 59 15` (#E63B0F) in light mode so large text meets 3:1; in dark mode `--accent-ink` = `--accent`. Text on an accent fill is always `--on-accent` `20 20 20`.
- Borders 2px default, 3px on primary objects. Shadow `4px 4px 0 rgb(var(--ink))`, no blur. Radius 24px cards, full pill buttons.
- No glass/backdrop-blur, soft shadows, gradient fills, tag-pill clouds, uppercase eyebrow labels.
- Copy: no em dashes (—) anywhere in user-facing text, no "fascinated", "at the intersection of", "passionate", "journey". Short declarative sentences. No new facts.
- Fonts: Archivo (variable, `"Archivo Variable"`), JetBrains Mono (variable, `"JetBrains Mono Variable"`), Zighead + Saint as woff2 drop-caps only.
- Theme key in localStorage: `theme` (`'light' | 'dark'`). Class `dark` on `<html>`. All storage access wrapped in try/catch.
- Env vars keep names `REACT_APP_EMAILJS_SERVICE_ID`, `REACT_APP_EMAILJS_TEMPLATE_ID`, `REACT_APP_EMAILJS_PUBLIC_KEY`, read via `import.meta.env` with `envPrefix: ['VITE_', 'REACT_APP_']`.
- Build output dir: `build/` (Netlify unchanged). `public/_redirects` kept.
- All fx canvases `aria-hidden="true"`. Effects pause offscreen; static single frame under `prefers-reduced-motion: reduce`.
- New source files are `.jsx` for components, `.js` for logic; each ≤ ~200 lines.
- Targets: Lighthouse mobile Performance ≥ 95, Accessibility = 100; initial JS ≤ 90 KB gzip.
- Nothing is pushed to the remote. Commit on branch `redesign` only.

## Review Focus

1. **WebGL unavailable or context lost** → every DitherField still shows a static dithered frame (CPU path) and nothing throws. Pinned in Task 5.
2. **Navigating away mid-playback / rapid nav clicks** → Player timers are cleared on unmount, `/about` navigation fires exactly once, no state updates after unmount. Pinned in Task 10.
3. **Theme toggled while effects animate** → dither/ASCII colours update on the next frame without reload. Pinned in Task 4 (`useCssColors`).
4. **320px-wide phone** → nav pill fits, no horizontal page scroll on any page. Pinned in Task 15 (e2e).
5. **Contact form: missing EmailJS env, double submit, send failure** → visible message, never silent; second send within 30s blocked with a message. Pinned in Task 12.

---

## File map

```
index.html                         Vite entry, inline pre-paint theme script
vite.config.mjs                    Vite + Vitest config
postcss.config.cjs                 tailwind + autoprefixer
tailwind.config.js                 tokens → utilities
playwright.config.mjs              e2e config
e2e/site.spec.js                   e2e tests
src/main.jsx                       mount, fonts, dither masks install
src/App.jsx                        Router + Layout + routes
src/routes.js                      route table, preload, PageFor
src/test/setup.js                  jsdom polyfills (matchMedia, IO, RO, canvas)
src/styles/index.css               imports tokens/base/fonts/blobs/transitions
src/styles/tokens.css              CSS vars light/dark
src/styles/base.css                tailwind layers, .brut, .display, .meta
src/styles/fonts.css               Zighead/Saint @font-face
src/styles/blobs.css               .blob-1/2/3 masks
src/styles/transitions.css         view-transition dither wipe, marquee
src/fonts/zighead.woff2 saint.woff2
src/fx/random.js                   mulberry32
src/fx/bayer.js                    bayerMatrix, bayerThreshold, ditherBit
src/fx/blobs.js                    makeBlobs, blobPositions, fieldAt
src/fx/asciiRamp.js                RAMP, rampChar, asciiFrame, waveFrame
src/fx/color.js                    parseRgbVar, readCssColor
src/fx/cover.js                    coverTransform
src/fx/ditherCpu.js                ditherPixels (CPU fallback)
src/fx/ditherMasks.js              ditherMaskBits, installDitherMasks
src/fx/grain.js                    grainBits
src/fx/fxLoop.js                   subscribe (shared rAF)
src/fx/glRenderer.js               renderDither (shared WebGL)
src/fx/useFxCanvas.js              ties loop + visibility + size + motion
src/fx/DitherField.jsx  AsciiField.jsx  Grain.jsx
src/hooks/useTheme.js useReducedMotion.js useInView.js useElementSize.js useCssColors.js useImage.js
src/ui/icons.jsx Button.jsx Frame.jsx DropCapHeading.jsx Divider.jsx Expandable.jsx Embed.jsx
src/ui/embeds.js TLink.jsx navigation.js ThemeToggle.jsx Nav.jsx Footer.jsx Layout.jsx
src/data/site.js about.js papers.js(kept) paperUtils.js education.js(kept, cleaned) music.js
src/pages/Player/Player.jsx playerState.js ProgressBar.jsx
src/pages/About/About.jsx Hero.jsx Bio.jsx NowBox.jsx SkillsStrip.jsx Timeline.jsx Contact.jsx contactLogic.js
src/pages/Research/Research.jsx PaperCard.jsx PaperRow.jsx PaperFilter.jsx Authors.jsx
src/pages/Music/Music.jsx Fonkey.jsx Productions.jsx Commuz.jsx
```

Deleted at the end (Task 15): `src/App.js src/index.js src/index.css src/App.css src/App.test.js src/setupTests.js src/reportWebVitals.js src/logo.svg src/*.png src/Gradient4.svg src/components/** src/hooks/useThemeToggle.js src/hooks/useMeshGradient.js src/utils/** public/index.html`, unused fonts.

---

### Task 1: Vite migration and test harness

**Files:**
- Create: `index.html`, `vite.config.mjs`, `postcss.config.cjs`, `src/main.jsx`, `src/App.jsx`, `src/styles/index.css`, `src/test/setup.js`, `src/App.test.jsx`
- Modify: `package.json`, `tailwind.config.js`, `.gitignore`
- Delete: `public/index.html`, `src/index.js`, `src/App.test.js`, `src/setupTests.js`, `src/reportWebVitals.js`

**Interfaces:**
- Produces: `npm start` (Vite dev on :3000), `npm test` (Vitest), `npm run build` → `build/`. Test setup globals: `matchMedia`, `IntersectionObserver`, `ResizeObserver`, `HTMLCanvasElement.prototype.getContext` → `null`, helper `globalThis.__setReducedMotion(bool)`.

- [ ] **Step 1: Install tooling**

```bash
npm install --save-dev vite @vitejs/plugin-react vitest @vitest/coverage-v8 jsdom @testing-library/react@^16 @testing-library/dom @testing-library/jest-dom@^6 @testing-library/user-event@^14 autoprefixer postcss
npm install @fontsource-variable/archivo @fontsource-variable/jetbrains-mono
```

- [ ] **Step 2: Rewrite `package.json` scripts and drop CRA config**

Set `"scripts"` to:

```json
{
  "start": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "test": "vitest run",
  "test:watch": "vitest",
  "coverage": "vitest run --coverage",
  "e2e": "playwright test"
}
```

Remove the `eslintConfig`, `browserslist` and `main` keys. Leave dependencies alone (removed in Task 15).

- [ ] **Step 3: Create `vite.config.mjs`**

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  envPrefix: ['VITE_', 'REACT_APP_'],
  server: { port: 3000 },
  build: { outDir: 'build', target: 'es2020' },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.js'],
    include: ['src/**/*.test.{js,jsx}'],
    css: false,
    coverage: {
      provider: 'v8',
      include: ['src/fx/**', 'src/hooks/**', 'src/ui/**', 'src/data/**', 'src/pages/**'],
      exclude: ['src/fx/glRenderer.js', '**/*.test.*'],
    },
  },
});
```

- [ ] **Step 4: Create `postcss.config.cjs`**

```js
module.exports = { plugins: { tailwindcss: {}, autoprefixer: {} } };
```

- [ ] **Step 5: Replace `tailwind.config.js`**

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}', '!./src/components/**'],
  theme: {
    extend: {
      colors: {
        paper: 'rgb(var(--paper) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        'accent-ink': 'rgb(var(--accent-ink) / <alpha-value>)',
        'on-accent': 'rgb(var(--on-accent) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['"Archivo Variable"', 'Archivo', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono Variable"', 'ui-monospace', 'monospace'],
        zighead: ['zighead', 'serif'],
        saint: ['saint', 'serif'],
      },
      borderRadius: { card: '24px' },
      boxShadow: {
        hard: '4px 4px 0 0 rgb(var(--ink))',
        'hard-sm': '2px 2px 0 0 rgb(var(--ink))',
      },
    },
  },
  plugins: [],
};
```

- [ ] **Step 6: Create `index.html` at repo root**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="Julien Guinot. PhD researcher in AI and music at Queen Mary University of London, musician, producer and mixing engineer." />
    <meta name="theme-color" content="#EFEBE3" media="(prefers-color-scheme: light)" />
    <meta name="theme-color" content="#141414" media="(prefers-color-scheme: dark)" />
    <link rel="icon" href="/favicon.ico" />
    <link rel="apple-touch-icon" href="/logo192.png" />
    <link rel="manifest" href="/manifest.json" />
    <title>Julien Guinot</title>
    <script>
      (function () {
        try {
          var t = localStorage.getItem('theme');
          var dark = t === 'dark' || (t !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches);
          if (dark) document.documentElement.classList.add('dark');
        } catch (e) {}
      })();
    </script>
  </head>
  <body>
    <noscript>This site needs JavaScript.</noscript>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 7: Create `src/styles/index.css` (expanded in Task 2)**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- [ ] **Step 8: Create `src/test/setup.js`**

```js
import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => cleanup());

let reducedMotion = false;
const mqListeners = new Set();
globalThis.__setReducedMotion = (value) => {
  reducedMotion = value;
  mqListeners.forEach((fn) => fn({ matches: value }));
};

window.matchMedia = (query) => ({
  get matches() {
    return query.includes('prefers-reduced-motion') ? reducedMotion : false;
  },
  media: query,
  addEventListener: (_, fn) => mqListeners.add(fn),
  removeEventListener: (_, fn) => mqListeners.delete(fn),
  addListener: (fn) => mqListeners.add(fn),
  removeListener: (fn) => mqListeners.delete(fn),
});

class MockIO {
  constructor(cb) { this.cb = cb; }
  observe(el) { this.cb([{ target: el, isIntersecting: true }]); }
  unobserve() {}
  disconnect() {}
}
globalThis.IntersectionObserver = MockIO;

class MockRO {
  constructor(cb) { this.cb = cb; }
  observe(el) { this.cb([{ target: el, contentRect: { width: 320, height: 160 } }]); }
  unobserve() {}
  disconnect() {}
}
globalThis.ResizeObserver = MockRO;

HTMLCanvasElement.prototype.getContext = () => null;
window.scrollTo = () => {};
```

- [ ] **Step 9: Write the failing smoke test `src/App.test.jsx`**

```jsx
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the app shell', () => {
  render(<App />);
  expect(screen.getByTestId('app-root')).toBeInTheDocument();
});
```

- [ ] **Step 10: Delete CRA entry files and run test to verify it fails**

```bash
git rm -q public/index.html src/index.js src/App.js src/App.test.js src/setupTests.js src/reportWebVitals.js
npx vitest run src/App.test.jsx
```

Expected: FAIL, cannot resolve `./App`.

- [ ] **Step 11: Create `src/App.jsx` and `src/main.jsx`**

```jsx
// src/App.jsx
import React from 'react';

export default function App() {
  return <div data-testid="app-root" />;
}
```

```jsx
// src/main.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import App from './App';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

- [ ] **Step 12: Run tests and build**

Run: `npx vitest run && npx vite build`
Expected: 1 test PASS; build writes `build/index.html`.

- [ ] **Step 13: Ignore Playwright output** — append to `.gitignore`:

```
/test-results
/playwright-report
```

- [ ] **Step 14: Commit**

```bash
git add -A index.html vite.config.mjs postcss.config.cjs tailwind.config.js package.json package-lock.json .gitignore src/main.jsx src/App.jsx src/App.test.jsx src/styles src/test
git commit -m "chore: migrate from CRA to Vite with Vitest harness"
```

---

### Task 2: Tokens, fonts, base styles, theme hook and toggle

**Files:**
- Create: `src/styles/tokens.css`, `src/styles/base.css`, `src/styles/fonts.css`, `src/fonts/zighead.woff2`, `src/fonts/saint.woff2`, `src/hooks/useTheme.js`, `src/hooks/useTheme.test.jsx`, `src/ui/ThemeToggle.jsx`
- Modify: `src/styles/index.css`, `src/main.jsx`

**Interfaces:**
- Produces: `useTheme(): { theme: 'light'|'dark', isDark: boolean, toggle(): void }`; `initialTheme(): 'light'|'dark'`; `<ThemeToggle />`. CSS classes `.brut`, `.brut-thick`, `.brut-press`, `.display`, `.meta`, `.dropcap`, `.link`.

- [ ] **Step 1: Write failing tests `src/hooks/useTheme.test.jsx`**

```jsx
import { renderHook, act } from '@testing-library/react';
import { useTheme, initialTheme } from './useTheme';

beforeEach(() => {
  localStorage.clear();
  document.documentElement.classList.remove('dark');
});

test('defaults to light when nothing stored and system is light', () => {
  expect(initialTheme()).toBe('light');
});

test('uses stored theme', () => {
  localStorage.setItem('theme', 'dark');
  expect(initialTheme()).toBe('dark');
});

test('toggle flips html class and persists', () => {
  const { result } = renderHook(() => useTheme());
  act(() => result.current.toggle());
  expect(result.current.isDark).toBe(true);
  expect(document.documentElement).toHaveClass('dark');
  expect(localStorage.getItem('theme')).toBe('dark');
  act(() => result.current.toggle());
  expect(document.documentElement).not.toHaveClass('dark');
  expect(localStorage.getItem('theme')).toBe('light');
});

test('survives localStorage throwing', () => {
  const get = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('blocked'); });
  const set = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('blocked'); });
  const { result } = renderHook(() => useTheme());
  expect(result.current.theme).toBe('light');
  act(() => result.current.toggle());
  expect(document.documentElement).toHaveClass('dark');
  get.mockRestore();
  set.mockRestore();
});
```

- [ ] **Step 2: Run to verify failure**

Run: `npx vitest run src/hooks/useTheme.test.jsx`
Expected: FAIL, module `./useTheme` not found.

- [ ] **Step 3: Implement `src/hooks/useTheme.js`**

```js
import { useCallback, useEffect, useState } from 'react';

const KEY = 'theme';

function readStored() {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

function persist(theme) {
  try {
    localStorage.setItem(KEY, theme);
  } catch {
    // storage blocked: theme still applies for this session
  }
}

function systemPrefersDark() {
  return typeof window.matchMedia === 'function'
    && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function initialTheme() {
  const stored = readStored();
  if (stored === 'dark' || stored === 'light') return stored;
  return systemPrefersDark() ? 'dark' : 'light';
}

export function useTheme() {
  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((current) => {
      const next = current === 'dark' ? 'light' : 'dark';
      persist(next);
      return next;
    });
  }, []);

  return { theme, isDark: theme === 'dark', toggle };
}
```

- [ ] **Step 4: Run tests**

Run: `npx vitest run src/hooks/useTheme.test.jsx`
Expected: 4 PASS.

- [ ] **Step 5: Convert drop-cap fonts to subset woff2**

```bash
python3 -m pip install --user --quiet fonttools brotli
python3 -m fontTools.subset "src/fonts/Zighead.otf" --unicodes="U+0020-007E" --flavor=woff2 --output-file=src/fonts/zighead.woff2
python3 -m fontTools.subset "src/fonts/Saint Regular.ttf" --unicodes="U+0020-007E" --flavor=woff2 --output-file=src/fonts/saint.woff2
ls -la src/fonts/*.woff2
```

Expected: two files, each well under 30 KB.

- [ ] **Step 6: Create `src/styles/tokens.css`**

```css
:root {
  --paper: 239 235 227;
  --ink: 20 20 20;
  --accent: 255 74 28;
  --accent-ink: 230 59 15;
  --on-accent: 20 20 20;
  color-scheme: light;
}

.dark {
  --paper: 20 20 20;
  --ink: 239 235 227;
  --accent-ink: 255 74 28;
  color-scheme: dark;
}
```

- [ ] **Step 7: Create `src/styles/fonts.css`**

```css
@font-face {
  font-family: 'zighead';
  src: url('../fonts/zighead.woff2') format('woff2');
  font-display: swap;
}

@font-face {
  font-family: 'saint';
  src: url('../fonts/saint.woff2') format('woff2');
  font-display: swap;
}
```

- [ ] **Step 8: Create `src/styles/base.css`**

```css
@layer base {
  html {
    background: rgb(var(--paper));
    color: rgb(var(--ink));
    -webkit-text-size-adjust: 100%;
  }
  body {
    @apply font-sans antialiased;
    font-size: 17px;
    line-height: 1.5;
    background: rgb(var(--paper));
    overflow-x: hidden;
  }
  ::selection { background: rgb(var(--accent)); color: rgb(var(--on-accent)); }
  :focus-visible { outline: 3px solid rgb(var(--accent)); outline-offset: 3px; }
  h1, h2, h3 { text-wrap: balance; }
}

@layer components {
  .brut {
    border: 2px solid rgb(var(--ink));
    box-shadow: 4px 4px 0 0 rgb(var(--ink));
  }
  .brut-thick {
    border: 3px solid rgb(var(--ink));
    box-shadow: 4px 4px 0 0 rgb(var(--ink));
  }
  .brut-press {
    transition: transform 120ms ease, box-shadow 120ms ease;
  }
  .brut-press:hover { transform: translate(2px, 2px); box-shadow: 2px 2px 0 0 rgb(var(--ink)); }
  .brut-press:active { transform: translate(4px, 4px); box-shadow: 0 0 0 0 rgb(var(--ink)); }
  .display { font-weight: 900; letter-spacing: -0.04em; line-height: 0.9; }
  .meta { @apply font-mono; font-size: 13px; line-height: 1.5; letter-spacing: 0; }
  .dropcap { font-weight: 400; letter-spacing: 0; font-size: 1.12em; line-height: 0; }
  .link {
    text-decoration: underline;
    text-decoration-thickness: 2px;
    text-underline-offset: 0.2em;
  }
  .link:hover { color: rgb(var(--accent-ink)); }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { transition-duration: 0ms !important; scroll-behavior: auto !important; }
}
```

- [ ] **Step 9: Update `src/styles/index.css`**

```css
@import './tokens.css';
@import './fonts.css';

@tailwind base;
@tailwind components;
@tailwind utilities;

@import './base.css';
```

Note: Vite's PostCSS handles `@import` only before other rules, so move `@import './base.css';` above the `@tailwind` lines if the build warns; `@layer` inside base.css still attaches to Tailwind's layers.

- [ ] **Step 10: Load variable fonts in `src/main.jsx`** — add above the CSS import:

```jsx
import '@fontsource-variable/archivo';
import '@fontsource-variable/jetbrains-mono';
```

- [ ] **Step 11: Create `src/ui/ThemeToggle.jsx`**

```jsx
import React from 'react';
import { useTheme } from '../hooks/useTheme';

export default function ThemeToggle() {
  const { isDark, toggle } = useTheme();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="relative h-9 w-9 shrink-0 rounded-full border-2 border-ink overflow-hidden"
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-1/2 bg-ink transition-transform duration-300"
        style={{ transform: isDark ? 'translateX(100%)' : 'translateX(0)' }}
      />
    </button>
  );
}
```

- [ ] **Step 12: Verify build and tests**

Run: `npx vitest run && npx vite build`
Expected: all PASS, build succeeds, `build/assets` contains `zighead-*.woff2`? (only once referenced by used CSS — fine either way).

- [ ] **Step 13: Commit**

```bash
git add src/styles src/fonts/zighead.woff2 src/fonts/saint.woff2 src/hooks/useTheme.js src/hooks/useTheme.test.jsx src/ui/ThemeToggle.jsx src/main.jsx
git commit -m "feat: add design tokens, fonts, base styles and theme toggle"
```

---

### Task 3: Pure fx maths (random, Bayer, blobs, ASCII, colour, cover, CPU dither, grain, masks)

**Files:**
- Create: `src/fx/random.js`, `src/fx/bayer.js`, `src/fx/blobs.js`, `src/fx/asciiRamp.js`, `src/fx/color.js`, `src/fx/cover.js`, `src/fx/ditherCpu.js`, `src/fx/grain.js`, `src/fx/ditherMasks.js`
- Test: `src/fx/fxMath.test.js`

**Interfaces:**
- Produces:
  - `mulberry32(seed: number): () => number` in [0,1)
  - `bayerMatrix(n: 2|4|8): number[][]`, `bayerThreshold(x, y, n=8): number` in (0,1), `ditherBit(value, x, y, n=8): 0|1`
  - `makeBlobs(seed, count=5): Blob[]`, `blobPositions(blobs, t): {x,y,r}[]`, `fieldAt(x, y, aspect, positions): number` in [0,1]
  - `RAMP = ' .:-=+*#%@'`, `rampChar(v, ramp=RAMP): string`, `asciiFrame({cols, rows, t, blobs, cellAspect=0.55, ramp}): string[]`, `waveFrame({cols, rows, t, ramp}): string[]`
  - `parseRgbVar(str): [r,g,b]`, `readCssColor(name, el=document.documentElement): [r,g,b]`
  - `coverTransform(boxW, boxH, imgW, imgH): {scale:[sx,sy], offset:[ox,oy]}`
  - `ditherPixels({width, height, valueAt(x,y), fg, bg}): Uint8ClampedArray` (RGBA)
  - `grainBits(size, seed): Uint8Array` of 0/1
  - `ditherMaskBits(level, n=8): number[]` (n*n of 0/1), `installDitherMasks(levels=[0.2,0.4,0.6,0.8], cell=4): void`

- [ ] **Step 1: Write failing tests `src/fx/fxMath.test.js`**

```js
import { mulberry32 } from './random';
import { bayerMatrix, bayerThreshold, ditherBit } from './bayer';
import { makeBlobs, blobPositions, fieldAt } from './blobs';
import { RAMP, rampChar, asciiFrame, waveFrame } from './asciiRamp';
import { parseRgbVar } from './color';
import { coverTransform } from './cover';
import { ditherPixels } from './ditherCpu';
import { grainBits } from './grain';
import { ditherMaskBits } from './ditherMasks';

describe('random', () => {
  test('mulberry32 is deterministic and in [0,1)', () => {
    const a = mulberry32(42); const b = mulberry32(42);
    const xs = Array.from({ length: 100 }, () => a());
    expect(xs).toEqual(Array.from({ length: 100 }, () => b()));
    xs.forEach((x) => { expect(x).toBeGreaterThanOrEqual(0); expect(x).toBeLessThan(1); });
  });
});

describe('bayer', () => {
  test('2x2 matrix is the canonical one', () => {
    expect(bayerMatrix(2)).toEqual([[0, 2], [3, 1]]);
  });
  test('8x8 contains each of 0..63 exactly once', () => {
    const flat = bayerMatrix(8).flat().sort((a, b) => a - b);
    expect(flat).toEqual(Array.from({ length: 64 }, (_, i) => i));
  });
  test('threshold is strictly inside (0,1) and tiles', () => {
    expect(bayerThreshold(0, 0)).toBeCloseTo(0.5 / 64);
    expect(bayerThreshold(8, 8)).toBe(bayerThreshold(0, 0));
  });
  test('ditherBit extremes and mid density', () => {
    let on = 0;
    for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) {
      expect(ditherBit(0, x, y)).toBe(0);
      expect(ditherBit(1, x, y)).toBe(1);
      on += ditherBit(0.5, x, y);
    }
    expect(on).toBe(32);
  });
});

describe('blobs', () => {
  test('makeBlobs is deterministic per seed', () => {
    expect(makeBlobs(3, 4)).toEqual(makeBlobs(3, 4));
    expect(makeBlobs(3, 4)).not.toEqual(makeBlobs(4, 4));
  });
  test('positions stay inside the unit square', () => {
    const blobs = makeBlobs(1, 6);
    for (let t = 0; t < 60; t += 1.7) {
      blobPositions(blobs, t).forEach((p) => {
        expect(p.x).toBeGreaterThan(0); expect(p.x).toBeLessThan(1);
        expect(p.y).toBeGreaterThan(0); expect(p.y).toBeLessThan(1);
      });
    }
  });
  test('field is 1-capped and peaks at a blob centre', () => {
    const pos = [{ x: 0.5, y: 0.5, r: 0.2 }];
    expect(fieldAt(0.5, 0.5, 1, pos)).toBeCloseTo(1);
    expect(fieldAt(0.0, 0.0, 1, pos)).toBeLessThan(0.01);
    expect(fieldAt(0.5, 0.5, 1, [...pos, ...pos])).toBe(1);
  });
});

describe('ascii', () => {
  test('rampChar maps 0 to space and 1 to last glyph, clamps', () => {
    expect(rampChar(0)).toBe(' ');
    expect(rampChar(1)).toBe('@');
    expect(rampChar(-3)).toBe(' ');
    expect(rampChar(9)).toBe('@');
  });
  test('asciiFrame has the requested shape and only ramp glyphs', () => {
    const lines = asciiFrame({ cols: 20, rows: 6, t: 1, blobs: makeBlobs(2, 3) });
    expect(lines).toHaveLength(6);
    lines.forEach((l) => {
      expect(l).toHaveLength(20);
      [...l].forEach((c) => expect(RAMP).toContain(c));
    });
  });
  test('waveFrame shape and motion over time', () => {
    const a = waveFrame({ cols: 30, rows: 3, t: 0 });
    const b = waveFrame({ cols: 30, rows: 3, t: 1 });
    expect(a).toHaveLength(3);
    expect(a[0]).toHaveLength(30);
    expect(a).not.toEqual(b);
  });
});

describe('color', () => {
  test('parses space-separated and rgb() forms', () => {
    expect(parseRgbVar(' 239 235 227 ')).toEqual([239, 235, 227]);
    expect(parseRgbVar('rgb(20, 20, 20)')).toEqual([20, 20, 20]);
    expect(parseRgbVar('')).toEqual([0, 0, 0]);
  });
});

describe('cover', () => {
  test('wide image in square box crops horizontally', () => {
    const { scale, offset } = coverTransform(100, 100, 200, 100);
    expect(scale[0]).toBeCloseTo(0.5); expect(scale[1]).toBeCloseTo(1);
    expect(offset[0]).toBeCloseTo(0.25); expect(offset[1]).toBeCloseTo(0);
  });
  test('tall image in square box crops vertically', () => {
    const { scale, offset } = coverTransform(100, 100, 100, 400);
    expect(scale).toEqual([1, 0.25]);
    expect(offset[1]).toBeCloseTo(0.375);
  });
});

describe('cpu dither', () => {
  test('writes fg where value is 1 and bg where 0', () => {
    const px = ditherPixels({ width: 2, height: 1, valueAt: (x) => (x === 0 ? 1 : 0), fg: [1, 2, 3], bg: [9, 9, 9] });
    expect(Array.from(px)).toEqual([1, 2, 3, 255, 9, 9, 9, 255]);
  });
});

describe('grain', () => {
  test('deterministic and roughly half density', () => {
    const g = grainBits(64, 7);
    expect(g).toEqual(grainBits(64, 7));
    const on = g.reduce((s, v) => s + v, 0);
    expect(on / g.length).toBeGreaterThan(0.4);
    expect(on / g.length).toBeLessThan(0.6);
  });
});

describe('dither masks', () => {
  test('level controls the share of visible cells', () => {
    expect(ditherMaskBits(0).every((v) => v === 0)).toBe(true);
    expect(ditherMaskBits(1).every((v) => v === 1)).toBe(true);
    expect(ditherMaskBits(0.5).filter(Boolean)).toHaveLength(32);
  });
});
```

- [ ] **Step 2: Run to verify failure**

Run: `npx vitest run src/fx/fxMath.test.js`
Expected: FAIL, modules not found.

- [ ] **Step 3: Implement `src/fx/random.js`**

```js
export function mulberry32(seed) {
  let a = seed >>> 0;
  return function next() {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
```

- [ ] **Step 4: Implement `src/fx/bayer.js`**

```js
export function bayerMatrix(n) {
  if (n === 1) return [[0]];
  const half = bayerMatrix(n / 2);
  const size = n / 2;
  return Array.from({ length: n }, (_, y) => Array.from({ length: n }, (_, x) => {
    const base = 4 * half[y % size][x % size];
    const quadrant = (y < size ? 0 : 2) + (x < size ? 0 : 1);
    return base + [0, 2, 3, 1][quadrant];
  }));
}

const CACHE = new Map();

function matrix(n) {
  if (!CACHE.has(n)) CACHE.set(n, bayerMatrix(n));
  return CACHE.get(n);
}

export function bayerThreshold(x, y, n = 8) {
  const m = matrix(n);
  return (m[y % n][x % n] + 0.5) / (n * n);
}

export function ditherBit(value, x, y, n = 8) {
  return value > bayerThreshold(x, y, n) ? 1 : 0;
}
```

- [ ] **Step 5: Implement `src/fx/blobs.js`**

```js
import { mulberry32 } from './random';

const TAU = Math.PI * 2;

export function makeBlobs(seed, count = 5) {
  const rand = mulberry32(seed);
  return Array.from({ length: count }, () => ({
    ax: 0.12 + rand() * 0.28,
    ay: 0.12 + rand() * 0.28,
    fx: 0.03 + rand() * 0.07,
    fy: 0.03 + rand() * 0.07,
    phase: rand() * TAU,
    radius: 0.16 + rand() * 0.16,
  }));
}

export function blobPositions(blobs, t) {
  return blobs.map((b) => ({
    x: 0.5 + b.ax * Math.sin(TAU * b.fx * t + b.phase),
    y: 0.5 + b.ay * Math.cos(TAU * b.fy * t + b.phase * 1.7),
    r: b.radius,
  }));
}

export function fieldAt(x, y, aspect, positions) {
  let v = 0;
  for (let i = 0; i < positions.length; i++) {
    const p = positions[i];
    const dx = (x - p.x) * aspect;
    const dy = y - p.y;
    v += Math.exp(-(dx * dx + dy * dy) / (p.r * p.r));
  }
  return Math.min(1, v);
}
```

- [ ] **Step 6: Implement `src/fx/asciiRamp.js`**

```js
import { blobPositions, fieldAt } from './blobs';

export const RAMP = ' .:-=+*#%@';

export function rampChar(v, ramp = RAMP) {
  const c = Math.min(1, Math.max(0, v));
  return ramp[Math.min(ramp.length - 1, Math.floor(c * ramp.length))];
}

export function asciiFrame({ cols, rows, t, blobs, cellAspect = 0.55, ramp = RAMP }) {
  const positions = blobPositions(blobs, t);
  const aspect = (cols * cellAspect) / rows;
  const lines = new Array(rows);
  for (let y = 0; y < rows; y++) {
    let line = '';
    for (let x = 0; x < cols; x++) {
      line += rampChar(fieldAt((x + 0.5) / cols, (y + 0.5) / rows, aspect, positions), ramp);
    }
    lines[y] = line;
  }
  return lines;
}

export function waveFrame({ cols, rows, t, ramp = RAMP }) {
  const lines = new Array(rows);
  for (let y = 0; y < rows; y++) {
    let line = '';
    for (let x = 0; x < cols; x++) {
      const a = Math.sin(x * 0.18 - t * 1.6 + y * 0.9);
      const b = Math.sin(x * 0.05 + t * 0.7);
      line += rampChar(0.5 + 0.35 * a * (0.6 + 0.4 * b), ramp);
    }
    lines[y] = line;
  }
  return lines;
}
```

- [ ] **Step 7: Implement `src/fx/color.js`**

```js
export function parseRgbVar(str) {
  const nums = (str || '').match(/\d+(\.\d+)?/g);
  if (!nums || nums.length < 3) return [0, 0, 0];
  return nums.slice(0, 3).map((n) => Math.round(Number(n)));
}

export function readCssColor(name, el = document.documentElement) {
  return parseRgbVar(getComputedStyle(el).getPropertyValue(name));
}
```

- [ ] **Step 8: Implement `src/fx/cover.js`**

```js
export function coverTransform(boxW, boxH, imgW, imgH) {
  const boxRatio = boxW / boxH;
  const imgRatio = imgW / imgH;
  if (imgRatio > boxRatio) {
    const sx = boxRatio / imgRatio;
    return { scale: [sx, 1], offset: [(1 - sx) / 2, 0] };
  }
  const sy = imgRatio / boxRatio;
  return { scale: [1, sy], offset: [0, (1 - sy) / 2] };
}
```

- [ ] **Step 9: Implement `src/fx/ditherCpu.js`**

```js
import { ditherBit } from './bayer';

export function ditherPixels({ width, height, valueAt, fg, bg }) {
  const out = new Uint8ClampedArray(width * height * 4);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const c = ditherBit(valueAt(x, y), x, y) ? fg : bg;
      const i = (y * width + x) * 4;
      out[i] = c[0]; out[i + 1] = c[1]; out[i + 2] = c[2]; out[i + 3] = 255;
    }
  }
  return out;
}
```

- [ ] **Step 10: Implement `src/fx/grain.js`**

```js
import { mulberry32 } from './random';

export function grainBits(size, seed) {
  const rand = mulberry32(seed);
  return Uint8Array.from({ length: size * size }, () => (rand() > 0.5 ? 1 : 0));
}
```

- [ ] **Step 11: Implement `src/fx/ditherMasks.js`**

```js
import { bayerThreshold } from './bayer';

export function ditherMaskBits(level, n = 8) {
  const bits = [];
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) bits.push(level > bayerThreshold(x, y, n) ? 1 : 0);
  return bits;
}

export function installDitherMasks(levels = [0.2, 0.4, 0.6, 0.8], cell = 4) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 8 * cell;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const root = document.documentElement;
  levels.forEach((level, i) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#000';
    ditherMaskBits(level).forEach((on, k) => {
      if (on) ctx.fillRect((k % 8) * cell, Math.floor(k / 8) * cell, cell, cell);
    });
    root.style.setProperty(`--dither-${i + 1}`, `url(${canvas.toDataURL('image/png')})`);
  });
}
```

- [ ] **Step 12: Run tests**

Run: `npx vitest run src/fx/fxMath.test.js`
Expected: all PASS.

- [ ] **Step 13: Commit**

```bash
git add src/fx
git commit -m "feat: add pure fx maths for dither, blobs, ascii and masks"
```

---

### Task 4: Shared loop and visibility/motion/size/colour hooks

**Files:**
- Create: `src/fx/fxLoop.js`, `src/hooks/useReducedMotion.js`, `src/hooks/useInView.js`, `src/hooks/useElementSize.js`, `src/hooks/useCssColors.js`, `src/hooks/useImage.js`, `src/fx/useFxCanvas.js`
- Test: `src/fx/fxLoop.test.js`, `src/hooks/hooks.test.jsx`

**Interfaces:**
- Consumes: `readCssColor` (Task 3).
- Produces:
  - `subscribe(fn: (tSeconds:number)=>void, fps:number): () => void`; `__resetLoop()` (tests only)
  - `useReducedMotion(): boolean`
  - `useInView(ref, rootMargin='120px'): boolean`
  - `useElementSize(ref): {width:number, height:number}`
  - `useCssColors(names: string[]): number[][]` (re-reads when `<html>` class changes)
  - `useImage(src: string|null): HTMLImageElement|null`
  - `useFxCanvas(ref, draw(t, size), {fps=20, animate=true, active=true, deps=[]}): void`

- [ ] **Step 1: Write failing loop test `src/fx/fxLoop.test.js`**

```js
import { subscribe, __resetLoop } from './fxLoop';

let frames;
beforeEach(() => {
  __resetLoop();
  frames = [];
  vi.stubGlobal('requestAnimationFrame', (cb) => { frames.push(cb); return frames.length; });
  vi.stubGlobal('cancelAnimationFrame', () => {});
});
afterEach(() => vi.unstubAllGlobals());

function flush(now) {
  const pending = frames; frames = [];
  pending.forEach((cb) => cb(now));
}

test('calls subscribers at most at their fps', () => {
  const fn = vi.fn();
  subscribe(fn, 10);
  flush(0); flush(50); flush(100); flush(210);
  expect(fn).toHaveBeenCalledTimes(3);
  expect(fn).toHaveBeenLastCalledWith(0.21);
});

test('stops scheduling when the last subscriber leaves', () => {
  const off = subscribe(() => {}, 30);
  expect(frames).toHaveLength(1);
  off();
  flush(16);
  expect(frames).toHaveLength(0);
});
```

- [ ] **Step 2: Run to verify failure**

Run: `npx vitest run src/fx/fxLoop.test.js`
Expected: FAIL, module not found.

- [ ] **Step 3: Implement `src/fx/fxLoop.js`**

```js
const subs = new Set();
let rafId = null;

function tick(now) {
  subs.forEach((sub) => {
    if (now - sub.last >= sub.interval) {
      sub.last = now;
      sub.fn(now / 1000);
    }
  });
  rafId = subs.size ? requestAnimationFrame(tick) : null;
}

export function subscribe(fn, fps) {
  const sub = { fn, interval: 1000 / fps - 1, last: -Infinity };
  subs.add(sub);
  if (rafId === null) rafId = requestAnimationFrame(tick);
  return () => {
    subs.delete(sub);
    if (!subs.size && rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  };
}

export function __resetLoop() {
  subs.clear();
  rafId = null;
}
```

(The `- 1` on the interval absorbs rAF jitter so a 60 Hz display reliably hits 20/30 fps.)

- [ ] **Step 4: Run loop tests**

Run: `npx vitest run src/fx/fxLoop.test.js`
Expected: 2 PASS.

- [ ] **Step 5: Write failing hook tests `src/hooks/hooks.test.jsx`**

```jsx
import React, { useRef } from 'react';
import { render, renderHook, act } from '@testing-library/react';
import { useReducedMotion } from './useReducedMotion';
import { useCssColors } from './useCssColors';
import { useFxCanvas } from '../fx/useFxCanvas';
import * as loop from '../fx/fxLoop';

afterEach(() => { globalThis.__setReducedMotion(false); vi.restoreAllMocks(); });

test('useReducedMotion follows the media query', () => {
  const { result } = renderHook(() => useReducedMotion());
  expect(result.current).toBe(false);
  act(() => globalThis.__setReducedMotion(true));
  expect(result.current).toBe(true);
});

test('useCssColors re-reads when the html class changes', async () => {
  document.documentElement.style.setProperty('--ink', '20 20 20');
  const { result } = renderHook(() => useCssColors(['--ink']));
  expect(result.current[0]).toEqual([20, 20, 20]);
  document.documentElement.style.setProperty('--ink', '239 235 227');
  await act(async () => {
    document.documentElement.classList.add('dark');
    await Promise.resolve();
  });
  expect(result.current[0]).toEqual([239, 235, 227]);
  document.documentElement.classList.remove('dark');
});

function Probe({ draw, opts }) {
  const ref = useRef(null);
  useFxCanvas(ref, draw, opts);
  return <canvas ref={ref} />;
}

test('useFxCanvas subscribes when animating and in view', () => {
  const spy = vi.spyOn(loop, 'subscribe').mockImplementation(() => () => {});
  render(<Probe draw={() => {}} opts={{ fps: 12 }} />);
  expect(spy).toHaveBeenCalledWith(expect.any(Function), 12);
});

test('useFxCanvas draws one static frame under reduced motion', () => {
  globalThis.__setReducedMotion(true);
  const spy = vi.spyOn(loop, 'subscribe');
  const draw = vi.fn();
  render(<Probe draw={draw} opts={{}} />);
  expect(spy).not.toHaveBeenCalled();
  expect(draw).toHaveBeenCalledWith(0, { width: 320, height: 160 });
});

test('useFxCanvas draws once and does not loop when inactive', () => {
  const spy = vi.spyOn(loop, 'subscribe');
  const draw = vi.fn();
  render(<Probe draw={draw} opts={{ active: false }} />);
  expect(spy).not.toHaveBeenCalled();
  expect(draw).toHaveBeenCalledTimes(1);
});
```

- [ ] **Step 6: Run to verify failure**

Run: `npx vitest run src/hooks/hooks.test.jsx`
Expected: FAIL, modules not found.

- [ ] **Step 7: Implement `src/hooks/useReducedMotion.js`**

```js
import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

export function useReducedMotion() {
  const [reduced, setReduced] = useState(() => window.matchMedia(QUERY).matches);
  useEffect(() => {
    const mq = window.matchMedia(QUERY);
    const onChange = (e) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}
```

- [ ] **Step 8: Implement `src/hooks/useInView.js`**

```js
import { useEffect, useState } from 'react';

export function useInView(ref, rootMargin = '120px') {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return undefined;
    }
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin]);
  return inView;
}
```

- [ ] **Step 9: Implement `src/hooks/useElementSize.js`**

```js
import { useEffect, useState } from 'react';

export function useElementSize(ref) {
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize((prev) => (prev.width === Math.round(width) && prev.height === Math.round(height)
        ? prev
        : { width: Math.round(width), height: Math.round(height) }));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return size;
}
```

- [ ] **Step 10: Implement `src/hooks/useCssColors.js`**

```js
import { useEffect, useMemo, useState } from 'react';
import { readCssColor } from '../fx/color';

export function useCssColors(names) {
  const key = names.join('|');
  const [version, setVersion] = useState(0);

  useEffect(() => {
    const mo = new MutationObserver(() => setVersion((v) => v + 1));
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => mo.disconnect();
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => names.map((n) => readCssColor(n)), [key, version]);
}
```

- [ ] **Step 11: Implement `src/hooks/useImage.js`**

```js
import { useEffect, useState } from 'react';

export function useImage(src) {
  const [img, setImg] = useState(null);
  useEffect(() => {
    if (!src) return undefined;
    let alive = true;
    const el = new Image();
    el.decoding = 'async';
    el.onload = () => { if (alive) setImg(el); };
    el.onerror = () => { if (alive) setImg(null); };
    el.src = src;
    return () => { alive = false; };
  }, [src]);
  return img;
}
```

- [ ] **Step 12: Implement `src/fx/useFxCanvas.js`**

```js
import { useEffect, useRef } from 'react';
import { subscribe } from './fxLoop';
import { useInView } from '../hooks/useInView';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useElementSize } from '../hooks/useElementSize';

export function useFxCanvas(ref, draw, { fps = 20, animate = true, active = true, deps = [] } = {}) {
  const inView = useInView(ref);
  const reduced = useReducedMotion();
  const size = useElementSize(ref);
  const drawRef = useRef(draw);
  drawRef.current = draw;
  const lastT = useRef(0);

  const looping = animate && active && !reduced && inView;

  useEffect(() => {
    if (!size.width || !size.height) return undefined;
    if (!looping) {
      drawRef.current(reduced ? 0 : lastT.current, size);
      return undefined;
    }
    return subscribe((t) => {
      lastT.current = t;
      drawRef.current(t, size);
    }, fps);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [looping, reduced, size.width, size.height, fps, ...deps]);
}
```

- [ ] **Step 13: Run tests**

Run: `npx vitest run src/fx src/hooks`
Expected: all PASS.

- [ ] **Step 14: Commit**

```bash
git add src/fx/fxLoop.js src/fx/fxLoop.test.js src/fx/useFxCanvas.js src/hooks
git commit -m "feat: add shared fx loop and visibility, motion, size and colour hooks"
```

---

### Task 5: WebGL dither renderer and DitherField

**Files:**
- Create: `src/fx/glRenderer.js`, `src/fx/DitherField.jsx`, `src/styles/blobs.css`
- Test: `src/fx/DitherField.test.jsx`
- Modify: `src/styles/index.css` (import blobs.css)

**Interfaces:**
- Consumes: `bayerMatrix`, `blobPositions`, `makeBlobs`, `fieldAt`, `coverTransform`, `ditherPixels` (Task 3); `useFxCanvas`, `useCssColors`, `useImage` (Task 4).
- Produces:
  - `renderDither(opts): HTMLCanvasElement | null` where `opts = { width, height, mode: 'blobs'|'image', positions?, aspect, image?, cover?, fg:[r,g,b], bg:[r,g,b], contrast=1 }` (width/height in dither cells)
  - `<DitherField seed=1 blobs=5 cell=4 fg="--accent" bg="--paper" image={null} contrast={1} fps={24} active={true} className="" />`
  - CSS classes `.blob-1`, `.blob-2`, `.blob-3` (organic mask)

- [ ] **Step 1: Write failing tests `src/fx/DitherField.test.jsx`**

```jsx
import React from 'react';
import { render } from '@testing-library/react';
import DitherField from './DitherField';
import { renderDither } from './glRenderer';

test('renderDither returns null when WebGL is unavailable', () => {
  expect(renderDither({ width: 10, height: 10, mode: 'blobs', positions: [], aspect: 1, fg: [0, 0, 0], bg: [255, 255, 255] })).toBeNull();
});

test('DitherField renders a decorative canvas without throwing when no context exists', () => {
  const { container } = render(<DitherField seed={3} />);
  const canvas = container.querySelector('canvas');
  expect(canvas).toHaveAttribute('aria-hidden', 'true');
});

test('DitherField falls back to the CPU path when WebGL is missing', () => {
  const putImageData = vi.fn();
  const original = HTMLCanvasElement.prototype.getContext;
  HTMLCanvasElement.prototype.getContext = function getContext(type) {
    if (type === '2d') return { putImageData, imageSmoothingEnabled: true };
    return null;
  };
  globalThis.ImageData = class { constructor(data, w, h) { this.data = data; this.width = w; this.height = h; } };
  render(<DitherField seed={3} cell={4} />);
  expect(putImageData).toHaveBeenCalled();
  HTMLCanvasElement.prototype.getContext = original;
});
```

- [ ] **Step 2: Run to verify failure**

Run: `npx vitest run src/fx/DitherField.test.jsx`
Expected: FAIL, modules not found.

- [ ] **Step 3: Implement `src/fx/glRenderer.js`**

```js
import { bayerMatrix } from './bayer';

const MAX_BLOBS = 6;

const VERT = `attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }`;

const FRAG = `precision mediump float;
uniform vec2 u_res;
uniform vec4 u_blobs[${MAX_BLOBS}];
uniform int u_count;
uniform float u_aspect;
uniform int u_mode;
uniform sampler2D u_bayer;
uniform sampler2D u_image;
uniform vec2 u_imgScale;
uniform vec2 u_imgOffset;
uniform float u_contrast;
uniform vec3 u_fg;
uniform vec3 u_bg;
void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  uv.y = 1.0 - uv.y;
  float v = 0.0;
  if (u_mode == 0) {
    for (int i = 0; i < ${MAX_BLOBS}; i++) {
      if (i >= u_count) break;
      vec4 b = u_blobs[i];
      vec2 d = vec2((uv.x - b.x) * u_aspect, uv.y - b.y);
      v += exp(-dot(d, d) / (b.z * b.z));
    }
    v = min(v, 1.0);
  } else {
    vec3 c = texture2D(u_image, uv * u_imgScale + u_imgOffset).rgb;
    v = 1.0 - dot(c, vec3(0.299, 0.587, 0.114));
    v = clamp((v - 0.5) * u_contrast + 0.5, 0.0, 1.0);
  }
  float th = texture2D(u_bayer, gl_FragCoord.xy / 8.0).r;
  gl_FragColor = vec4(v > th ? u_fg : u_bg, 1.0);
}`;

let state;
const imageTextures = new WeakMap();

function compile(gl, type, src) {
  const sh = gl.createShader(type);
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(sh));
  return sh;
}

function bayerTexture(gl) {
  const m = bayerMatrix(8).flat();
  const data = new Uint8Array(m.map((v) => Math.round(((v + 0.5) / 64) * 255)));
  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, 8, 8, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, data);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
  return tex;
}

function init() {
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl', { antialias: false, premultipliedAlpha: false });
  if (!gl) return null;
  try {
    const prog = gl.createProgram();
    gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog));
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'a_pos');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const u = (name) => gl.getUniformLocation(prog, name);
    const uniforms = Object.fromEntries(['u_res', 'u_blobs', 'u_count', 'u_aspect', 'u_mode', 'u_bayer', 'u_image',
      'u_imgScale', 'u_imgOffset', 'u_contrast', 'u_fg', 'u_bg'].map((n) => [n, u(n)]));
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, bayerTexture(gl));
    gl.uniform1i(uniforms.u_bayer, 0);
    gl.uniform1i(uniforms.u_image, 1);
    canvas.addEventListener('webglcontextlost', (e) => { e.preventDefault(); state = undefined; });
    return { canvas, gl, uniforms };
  } catch (err) {
    console.error('[fx] WebGL init failed, using CPU dither', err);
    return null;
  }
}

function imageTexture(gl, image) {
  if (imageTextures.has(image)) return imageTextures.get(image);
  const tex = gl.createTexture();
  gl.activeTexture(gl.TEXTURE1);
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  imageTextures.set(image, tex);
  return tex;
}

export function renderDither(opts) {
  if (state === undefined) state = init();
  if (!state) return null;
  const { canvas, gl, uniforms: U } = state;
  const { width, height, mode, positions = [], aspect, image, cover, fg, bg, contrast = 1 } = opts;
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }
  gl.viewport(0, 0, width, height);
  gl.uniform2f(U.u_res, width, height);
  gl.uniform1f(U.u_aspect, aspect);
  gl.uniform3f(U.u_fg, fg[0] / 255, fg[1] / 255, fg[2] / 255);
  gl.uniform3f(U.u_bg, bg[0] / 255, bg[1] / 255, bg[2] / 255);
  if (mode === 'image' && image) {
    gl.uniform1i(U.u_mode, 1);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, imageTexture(gl, image));
    gl.uniform2f(U.u_imgScale, cover.scale[0], cover.scale[1]);
    gl.uniform2f(U.u_imgOffset, cover.offset[0], cover.offset[1]);
    gl.uniform1f(U.u_contrast, contrast);
  } else {
    gl.uniform1i(U.u_mode, 0);
    const flat = new Float32Array(MAX_BLOBS * 4);
    positions.slice(0, MAX_BLOBS).forEach((p, i) => flat.set([p.x, p.y, p.r, 0], i * 4));
    gl.uniform4fv(U.u_blobs, flat);
    gl.uniform1i(U.u_count, Math.min(positions.length, MAX_BLOBS));
  }
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  return canvas;
}
```

- [ ] **Step 4: Implement `src/fx/DitherField.jsx`**

```jsx
import React, { useMemo, useRef } from 'react';
import { useFxCanvas } from './useFxCanvas';
import { useCssColors } from '../hooks/useCssColors';
import { useImage } from '../hooks/useImage';
import { makeBlobs, blobPositions, fieldAt } from './blobs';
import { coverTransform } from './cover';
import { renderDither } from './glRenderer';
import { ditherPixels } from './ditherCpu';

function imageLuma(image, w, h, cover) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const ctx = c.getContext('2d');
  if (!ctx) return () => 0;
  const sx = cover.offset[0] * image.naturalWidth;
  const sy = cover.offset[1] * image.naturalHeight;
  ctx.drawImage(image, sx, sy, cover.scale[0] * image.naturalWidth, cover.scale[1] * image.naturalHeight, 0, 0, w, h);
  const d = ctx.getImageData(0, 0, w, h).data;
  return (x, y) => {
    const i = (y * w + x) * 4;
    return 1 - (0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2]) / 255;
  };
}

export default function DitherField({
  seed = 1, blobs = 5, cell = 4, fg = '--accent', bg = '--paper',
  image = null, contrast = 1, fps = 24, active = true, className = '',
}) {
  const ref = useRef(null);
  const [fgRgb, bgRgb] = useCssColors([fg, bg]);
  const field = useMemo(() => makeBlobs(seed, blobs), [seed, blobs]);
  const img = useImage(image);
  const gpuOk = useRef(true);

  const draw = (t, size) => {
    const canvas = ref.current;
    if (!canvas) return;
    const w = Math.max(1, Math.ceil(size.width / cell));
    const h = Math.max(1, Math.ceil(size.height / cell));
    if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.imageSmoothingEnabled = false;
    const aspect = w / h;
    const isImage = Boolean(image);
    if (isImage && !img) return;
    const cover = isImage ? coverTransform(w, h, img.naturalWidth, img.naturalHeight) : null;
    const positions = isImage ? [] : blobPositions(field, t);
    const gl = gpuOk.current && renderDither({
      width: w, height: h, mode: isImage ? 'image' : 'blobs', positions, aspect, image: img, cover, fg: fgRgb, bg: bgRgb, contrast,
    });
    if (gl) { ctx.drawImage(gl, 0, 0); return; }
    gpuOk.current = false;
    const valueAt = isImage
      ? (() => { const luma = imageLuma(img, w, h, cover); return (x, y) => Math.min(1, Math.max(0, (luma(x, y) - 0.5) * contrast + 0.5)); })()
      : (x, y) => fieldAt((x + 0.5) / w, (y + 0.5) / h, aspect, positions);
    ctx.putImageData(new ImageData(ditherPixels({ width: w, height: h, valueAt, fg: fgRgb, bg: bgRgb }), w, h), 0, 0);
  };

  useFxCanvas(ref, draw, {
    fps,
    animate: !image && gpuOk.current,
    active,
    deps: [fgRgb, bgRgb, img, cell, contrast],
  });

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`block w-full h-full ${className}`}
      style={{ imageRendering: 'pixelated' }}
    />
  );
}
```

- [ ] **Step 5: Create `src/styles/blobs.css`**

```css
.blob-1, .blob-2, .blob-3 {
  -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat;
  -webkit-mask-position: center; mask-position: center;
  -webkit-mask-size: 100% 100%; mask-size: 100% 100%;
}
.blob-1 {
  -webkit-mask-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='-80 -80 160 160' preserveAspectRatio='none'><path d='M43.3,-58.4C55.4,-49.7,63.9,-35.9,68.4,-20.6C72.9,-5.3,73.4,11.6,67.2,25.4C61,39.2,48.1,49.9,33.8,57.6C19.5,65.3,3.8,70,-12.6,69.1C-29,68.2,-46.1,61.7,-57.6,49.6C-69.1,37.5,-75,19.7,-74.6,2.2C-74.3,-15.4,-67.7,-32.7,-56,-41.9C-44.3,-51.1,-27.5,-52.2,-12.1,-56.9C3.3,-61.6,31.2,-67.1,43.3,-58.4Z'/></svg>");
  mask-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='-80 -80 160 160' preserveAspectRatio='none'><path d='M43.3,-58.4C55.4,-49.7,63.9,-35.9,68.4,-20.6C72.9,-5.3,73.4,11.6,67.2,25.4C61,39.2,48.1,49.9,33.8,57.6C19.5,65.3,3.8,70,-12.6,69.1C-29,68.2,-46.1,61.7,-57.6,49.6C-69.1,37.5,-75,19.7,-74.6,2.2C-74.3,-15.4,-67.7,-32.7,-56,-41.9C-44.3,-51.1,-27.5,-52.2,-12.1,-56.9C3.3,-61.6,31.2,-67.1,43.3,-58.4Z'/></svg>");
}
.blob-2 {
  -webkit-mask-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='-80 -80 160 160' preserveAspectRatio='none'><path d='M38.9,-52.1C50.1,-44.8,58.6,-33.1,63.5,-19.6C68.4,-6.1,69.7,9.2,64.6,22.1C59.5,35,48,45.5,35,53.8C22,62.1,7.5,68.2,-8.1,69.3C-23.7,70.4,-40.4,66.5,-51.6,56.2C-62.8,45.9,-68.5,29.2,-70.3,12.5C-72.1,-4.2,-70,-20.9,-61.6,-33.2C-53.2,-45.5,-38.5,-53.4,-24.6,-59.7C-10.7,-66,2.4,-70.7,14.6,-67.6C26.8,-64.5,27.7,-59.4,38.9,-52.1Z'/></svg>");
  mask-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='-80 -80 160 160' preserveAspectRatio='none'><path d='M38.9,-52.1C50.1,-44.8,58.6,-33.1,63.5,-19.6C68.4,-6.1,69.7,9.2,64.6,22.1C59.5,35,48,45.5,35,53.8C22,62.1,7.5,68.2,-8.1,69.3C-23.7,70.4,-40.4,66.5,-51.6,56.2C-62.8,45.9,-68.5,29.2,-70.3,12.5C-72.1,-4.2,-70,-20.9,-61.6,-33.2C-53.2,-45.5,-38.5,-53.4,-24.6,-59.7C-10.7,-66,2.4,-70.7,14.6,-67.6C26.8,-64.5,27.7,-59.4,38.9,-52.1Z'/></svg>");
}
.blob-3 {
  -webkit-mask-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='-80 -80 160 160' preserveAspectRatio='none'><path d='M47.7,-61.4C60.5,-53.3,68.5,-37.2,71.4,-20.6C74.3,-4,72.1,13.2,64.6,27.3C57.1,41.4,44.3,52.5,29.8,59.9C15.3,67.3,-0.9,71,-17.6,68.6C-34.3,66.2,-51.5,57.6,-61.2,44C-70.9,30.4,-73.1,11.8,-69.6,-4.9C-66.1,-21.6,-56.9,-36.4,-44.5,-44.7C-32.1,-53,-16.6,-54.8,0.6,-55.6C17.8,-56.4,34.9,-69.5,47.7,-61.4Z'/></svg>");
  mask-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='-80 -80 160 160' preserveAspectRatio='none'><path d='M47.7,-61.4C60.5,-53.3,68.5,-37.2,71.4,-20.6C74.3,-4,72.1,13.2,64.6,27.3C57.1,41.4,44.3,52.5,29.8,59.9C15.3,67.3,-0.9,71,-17.6,68.6C-34.3,66.2,-51.5,57.6,-61.2,44C-70.9,30.4,-73.1,11.8,-69.6,-4.9C-66.1,-21.6,-56.9,-36.4,-44.5,-44.7C-32.1,-53,-16.6,-54.8,0.6,-55.6C17.8,-56.4,34.9,-69.5,47.7,-61.4Z'/></svg>");
}
```

Add `@import './blobs.css';` to `src/styles/index.css` after `fonts.css`.

- [ ] **Step 6: Run tests**

Run: `npx vitest run src/fx/DitherField.test.jsx`
Expected: 3 PASS.

- [ ] **Step 7: Visual check** — temporarily render in `App.jsx`:

```jsx
import DitherField from './fx/DitherField';
export default function App() {
  return (
    <div data-testid="app-root" className="min-h-screen grid place-items-center">
      <div className="w-[480px] h-[480px] blob-1"><DitherField seed={7} /></div>
    </div>
  );
}
```

Run `npm start`, open `http://localhost:3000`. Expected: slowly moving vermilion 1-bit blob pattern with crisp square pixels inside an organic shape; toggling `document.documentElement.classList.toggle('dark')` in devtools changes the background to ink on the next frame. Keep `data-testid` so the smoke test still passes.

- [ ] **Step 8: Commit**

```bash
git add src/fx/glRenderer.js src/fx/DitherField.jsx src/fx/DitherField.test.jsx src/styles/blobs.css src/styles/index.css src/App.jsx
git commit -m "feat: add WebGL Bayer dither renderer with CPU fallback"
```

---

### Task 6: AsciiField and Grain

**Files:**
- Create: `src/fx/AsciiField.jsx`, `src/fx/Grain.jsx`
- Test: `src/fx/AsciiField.test.jsx`

**Interfaces:**
- Consumes: `asciiFrame`, `waveFrame`, `makeBlobs`, `grainBits`, `useFxCanvas`, `useCssColors`.
- Produces:
  - `<AsciiField seed=3 blobs=4 mode="blobs"|"wave" fontSize={12} color="--ink" alpha={1} fps={15} active={true} className="" />`
  - `<Grain opacity={0.06} />` (fixed full-page, pointer-events none)

- [ ] **Step 1: Write failing tests `src/fx/AsciiField.test.jsx`**

```jsx
import React from 'react';
import { render } from '@testing-library/react';
import AsciiField from './AsciiField';
import Grain from './Grain';

function fake2d() {
  return {
    setTransform: vi.fn(), clearRect: vi.fn(), fillText: vi.fn(),
    measureText: () => ({ width: 7 }), font: '', fillStyle: '', textBaseline: '',
  };
}

test('draws one fillText per row', () => {
  const ctx = fake2d();
  const original = HTMLCanvasElement.prototype.getContext;
  HTMLCanvasElement.prototype.getContext = () => ctx;
  render(<AsciiField mode="wave" fontSize={10} />);
  const rows = Math.floor(160 / (10 * 1.15));
  expect(ctx.fillText).toHaveBeenCalledTimes(rows);
  HTMLCanvasElement.prototype.getContext = original;
});

test('ascii canvas is decorative', () => {
  const { container } = render(<AsciiField />);
  expect(container.querySelector('canvas')).toHaveAttribute('aria-hidden', 'true');
});

test('grain renders nothing when canvas is unavailable', () => {
  const { container } = render(<Grain />);
  expect(container.querySelector('[data-grain]')).toBeNull();
});
```

- [ ] **Step 2: Run to verify failure**

Run: `npx vitest run src/fx/AsciiField.test.jsx`
Expected: FAIL, modules not found.

- [ ] **Step 3: Implement `src/fx/AsciiField.jsx`**

```jsx
import React, { useMemo, useRef } from 'react';
import { useFxCanvas } from './useFxCanvas';
import { useCssColors } from '../hooks/useCssColors';
import { makeBlobs } from './blobs';
import { asciiFrame, waveFrame, RAMP } from './asciiRamp';

const LINE = 1.15;

export default function AsciiField({
  seed = 3, blobs = 4, mode = 'blobs', fontSize = 12, color = '--ink',
  alpha = 1, fps = 15, active = true, ramp = RAMP, className = '',
}) {
  const ref = useRef(null);
  const [rgb] = useCssColors([color]);
  const field = useMemo(() => makeBlobs(seed, blobs), [seed, blobs]);

  const draw = (t, size) => {
    const canvas = ref.current;
    const ctx = canvas && canvas.getContext('2d');
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const pw = Math.round(size.width * dpr);
    const ph = Math.round(size.height * dpr);
    if (canvas.width !== pw || canvas.height !== ph) { canvas.width = pw; canvas.height = ph; }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.font = `${fontSize}px "JetBrains Mono Variable", ui-monospace, monospace`;
    ctx.textBaseline = 'top';
    const charW = ctx.measureText('M').width || fontSize * 0.6;
    const lineH = fontSize * LINE;
    const cols = Math.max(1, Math.floor(size.width / charW));
    const rows = Math.max(1, Math.floor(size.height / lineH));
    const lines = mode === 'wave'
      ? waveFrame({ cols, rows, t, ramp })
      : asciiFrame({ cols, rows, t, blobs: field, cellAspect: charW / lineH, ramp });
    ctx.clearRect(0, 0, size.width, size.height);
    ctx.fillStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`;
    for (let y = 0; y < lines.length; y++) ctx.fillText(lines[y], 0, y * lineH);
  };

  useFxCanvas(ref, draw, { fps, active, deps: [rgb, fontSize, mode, alpha] });

  return <canvas ref={ref} aria-hidden="true" className={`block w-full h-full ${className}`} />;
}
```

- [ ] **Step 4: Implement `src/fx/Grain.jsx`**

```jsx
import React, { useEffect, useState } from 'react';
import { grainBits } from './grain';

const SIZE = 96;

function makeGrainUrl() {
  const c = document.createElement('canvas');
  c.width = c.height = SIZE;
  const ctx = c.getContext('2d');
  if (!ctx) return null;
  const bits = grainBits(SIZE, 11);
  const img = ctx.createImageData(SIZE, SIZE);
  bits.forEach((on, i) => { img.data[i * 4 + 3] = on ? 255 : 0; });
  ctx.putImageData(img, 0, 0);
  return c.toDataURL('image/png');
}

export default function Grain({ opacity = 0.06 }) {
  const [url, setUrl] = useState(null);
  useEffect(() => { setUrl(makeGrainUrl()); }, []);
  if (!url) return null;
  return (
    <div
      data-grain
      aria-hidden="true"
      className="fixed inset-0 z-[60] pointer-events-none bg-ink"
      style={{
        opacity,
        WebkitMaskImage: `url(${url})`, maskImage: `url(${url})`,
        WebkitMaskSize: `${SIZE}px`, maskSize: `${SIZE}px`,
        imageRendering: 'pixelated',
      }}
    />
  );
}
```

- [ ] **Step 5: Run tests**

Run: `npx vitest run src/fx`
Expected: all PASS.

- [ ] **Step 6: Commit**

```bash
git add src/fx/AsciiField.jsx src/fx/Grain.jsx src/fx/AsciiField.test.jsx
git commit -m "feat: add animated ASCII field and static grain overlay"
```

---

### Task 7: UI primitives

**Files:**
- Create: `src/ui/icons.jsx`, `src/ui/Button.jsx`, `src/ui/Frame.jsx`, `src/ui/DropCapHeading.jsx`, `src/ui/Divider.jsx`, `src/ui/Expandable.jsx`, `src/ui/embeds.js`, `src/ui/Embed.jsx`
- Test: `src/ui/ui.test.jsx`

**Interfaces:**
- Consumes: `AsciiField`, `DitherField`.
- Produces:
  - icons: `ArrowUpRight, ArrowDown, Play, Pause, SkipBack, SkipForward, Heart({filled}), ChevronLeft, ChevronRight` (all `props` spread onto `<svg>`, `aria-hidden`)
  - `<Button as? to? href? variant="solid"|"outline"|"accent" external? className>`; when `to` set it renders `TLink` (Task 8) — Task 7 renders `<a href={to}>` and Task 8 swaps the import
  - `<Frame as="div" thick={false} className>`
  - `<DropCapHeading level={1|2|3} text caps={['zighead','saint']} accentWord={-1} stack={false} className>`
  - `<Divider />`
  - `<Expandable summary children defaultOpen={false} className>`
  - `youtubeId(url): string|null`, `youtubeEmbed(url): string`, `soundcloudEmbed(url): string`
  - `<Embed src title ratio="16/9" height? href? label="Play" seed={5} allow="autoplay; encrypted-media; fullscreen" />`

- [ ] **Step 1: Write failing tests `src/ui/ui.test.jsx`**

```jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DropCapHeading from './DropCapHeading';
import Expandable from './Expandable';
import Embed from './Embed';
import { youtubeId, youtubeEmbed, soundcloudEmbed } from './embeds';

test('DropCapHeading keeps the full accessible name', () => {
  render(<DropCapHeading level={1} text="Julien Guinot" caps={['zighead', 'saint']} accentWord={0} />);
  expect(screen.getByRole('heading', { level: 1, name: 'Julien Guinot' })).toBeInTheDocument();
});

test('Expandable toggles aria-expanded and inertness', async () => {
  render(<Expandable summary="Row">Body text</Expandable>);
  const btn = screen.getByRole('button', { name: /row/i });
  const region = document.getElementById(btn.getAttribute('aria-controls'));
  expect(btn).toHaveAttribute('aria-expanded', 'false');
  expect(region).toHaveAttribute('inert');
  await userEvent.click(btn);
  expect(btn).toHaveAttribute('aria-expanded', 'true');
  expect(region).not.toHaveAttribute('inert');
});

test('Embed loads its iframe only after a click', async () => {
  render(<Embed src="https://example.com/e" title="Clip" href="https://example.com" />);
  expect(document.querySelector('iframe')).toBeNull();
  await userEvent.click(screen.getByRole('button', { name: /play clip/i }));
  expect(document.querySelector('iframe')).toHaveAttribute('src', 'https://example.com/e');
  expect(screen.getByRole('link', { name: /open/i })).toHaveAttribute('href', 'https://example.com');
});

test('youtube helpers', () => {
  expect(youtubeId('https://youtu.be/bPJmExJGmmU?si=x')).toBe('bPJmExJGmmU');
  expect(youtubeId('https://www.youtube.com/watch?v=MUyIXcaW89s&ab_channel=F')).toBe('MUyIXcaW89s');
  expect(youtubeId('https://example.com')).toBeNull();
  expect(youtubeEmbed('https://youtu.be/bPJmExJGmmU')).toBe('https://www.youtube-nocookie.com/embed/bPJmExJGmmU?autoplay=1');
});

test('soundcloud helper encodes the track url', () => {
  const src = soundcloudEmbed('https://soundcloud.com/jujgui/aztecs');
  expect(src).toContain('url=https%3A%2F%2Fsoundcloud.com%2Fjujgui%2Faztecs');
  expect(src).toContain('auto_play=true');
});
```

- [ ] **Step 2: Run to verify failure**

Run: `npx vitest run src/ui/ui.test.jsx`
Expected: FAIL, modules not found.

- [ ] **Step 3: Implement `src/ui/icons.jsx`**

```jsx
import React from 'react';

const base = {
  width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
  strokeWidth: 2.5, strokeLinecap: 'square', strokeLinejoin: 'miter', 'aria-hidden': true, focusable: false,
};

const make = (paths) => function Icon(props) {
  return <svg {...base} {...props}>{paths}</svg>;
};

export const ArrowUpRight = make(<path d="M7 17 17 7M8 7h9v9" />);
export const ArrowDown = make(<path d="M12 4v15M6 13l6 6 6-6" />);
export const ChevronLeft = make(<path d="M15 5 8 12l7 7" />);
export const ChevronRight = make(<path d="m9 5 7 7-7 7" />);
export const SkipBack = make(<><path d="M6 5v14" /><path d="M19 5 9 12l10 7z" fill="currentColor" /></>);
export const SkipForward = make(<><path d="M18 5v14" /><path d="m5 5 10 7-10 7z" fill="currentColor" /></>);
export const Play = make(<path d="M7 4.5v15l12-7.5z" fill="currentColor" />);
export const Pause = make(<><path d="M7 5h3v14H7zM14 5h3v14h-3z" fill="currentColor" stroke="none" /></>);

export function Heart({ filled = false, ...props }) {
  return (
    <svg {...base} {...props}>
      <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" fill={filled ? 'currentColor' : 'none'} />
    </svg>
  );
}
```

- [ ] **Step 4: Implement `src/ui/Button.jsx`**

```jsx
import React from 'react';

const VARIANTS = {
  solid: 'bg-ink text-paper',
  outline: 'bg-paper text-ink',
  accent: 'bg-accent text-on-accent',
};

export default function Button({ to, href, external = false, variant = 'solid', className = '', children, ...rest }) {
  const cls = `brut brut-press inline-flex items-center gap-2 rounded-full h-11 px-5 font-semibold ${VARIANTS[variant]} ${className}`;
  const target = to ?? href;
  if (target) {
    const ext = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
    return <a href={target} className={cls} {...ext} {...rest}>{children}</a>;
  }
  return <button type="button" className={cls} {...rest}>{children}</button>;
}
```

- [ ] **Step 5: Implement `src/ui/Frame.jsx`**

```jsx
import React from 'react';

export default function Frame({ as: Tag = 'div', thick = false, className = '', children, ...rest }) {
  return (
    <Tag className={`${thick ? 'brut-thick' : 'brut'} rounded-card bg-paper ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
```

- [ ] **Step 6: Implement `src/ui/DropCapHeading.jsx`**

```jsx
import React from 'react';

export default function DropCapHeading({ level = 2, text, caps = ['zighead'], accentWord = -1, stack = false, className = '' }) {
  const Tag = `h${level}`;
  const words = text.split(' ');
  return (
    <Tag className={`display ${className}`}>
      {words.map((word, i) => {
        const cap = caps[i];
        const tone = i === accentWord ? 'text-accent-ink' : '';
        return (
          <React.Fragment key={`${word}-${i}`}>
            <span className={stack ? 'block' : 'inline'}>
              {cap ? <span className={`dropcap font-${cap} ${tone}`}>{word[0]}</span> : word[0]}
              {word.slice(1)}
            </span>
            {!stack && i < words.length - 1 ? ' ' : null}
          </React.Fragment>
        );
      })}
    </Tag>
  );
}
```

Tailwind needs to see `font-zighead` and `font-saint` literally: add `safelist: ['font-zighead', 'font-saint']` to `tailwind.config.js`.

- [ ] **Step 7: Implement `src/ui/Divider.jsx`**

```jsx
import React from 'react';
import AsciiField from '../fx/AsciiField';

export default function Divider({ className = '' }) {
  return (
    <div aria-hidden="true" className={`mx-auto max-w-6xl px-4 sm:px-8 my-20 sm:my-28 ${className}`}>
      <div className="h-10"><AsciiField mode="wave" fontSize={12} alpha={0.7} fps={12} /></div>
    </div>
  );
}
```

- [ ] **Step 8: Implement `src/ui/Expandable.jsx`**

```jsx
import React, { useId, useState } from 'react';

export default function Expandable({ summary, children, defaultOpen = false, className = '' }) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  return (
    <div className={`border-b-2 border-ink ${className}`}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className="w-full text-left flex items-start gap-4 py-4 group"
      >
        <div className="flex-1 min-w-0 group-hover:text-accent-ink transition-colors">{summary}</div>
        <span aria-hidden="true" className="meta shrink-0 mt-0.5 w-4 text-center">{open ? '−' : '+'}</span>
      </button>
      <div
        id={id}
        role="region"
        {...(open ? {} : { inert: '' })}
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden"><div className="pb-6">{children}</div></div>
      </div>
    </div>
  );
}
```

- [ ] **Step 9: Implement `src/ui/embeds.js`**

```js
export function youtubeId(url) {
  const m = url.match(/(?:youtu\.be\/|[?&]v=)([\w-]{11})/);
  return m ? m[1] : null;
}

export function youtubeEmbed(url) {
  return `https://www.youtube-nocookie.com/embed/${youtubeId(url)}?autoplay=1`;
}

export function soundcloudEmbed(url) {
  const params = new URLSearchParams({
    url, color: '#ff4a1c', auto_play: 'true', hide_related: 'true',
    show_comments: 'false', show_user: 'true', show_reposts: 'false', show_teaser: 'false', visual: 'true',
  });
  return `https://w.soundcloud.com/player/?${params.toString()}`;
}
```

- [ ] **Step 10: Implement `src/ui/Embed.jsx`**

```jsx
import React, { useState } from 'react';
import DitherField from '../fx/DitherField';
import { Play, ArrowUpRight } from './icons';

export default function Embed({
  src, title, ratio = '16/9', height, href, label = 'Play', seed = 5,
  allow = 'autoplay; encrypted-media; fullscreen; picture-in-picture',
}) {
  const [loaded, setLoaded] = useState(false);
  const box = height ? { height } : { aspectRatio: ratio };
  return (
    <div>
      <div className="relative brut rounded-card overflow-hidden bg-paper" style={box}>
        {loaded ? (
          <iframe src={src} title={title} allow={allow} allowFullScreen className="absolute inset-0 w-full h-full" />
        ) : (
          <button type="button" onClick={() => setLoaded(true)} className="absolute inset-0 w-full h-full group" aria-label={`${label} ${title}`}>
            <span className="absolute inset-0"><DitherField seed={seed} fg="--ink" cell={5} fps={12} /></span>
            <span className="relative inline-flex items-center gap-2 h-11 px-5 rounded-full brut bg-paper font-semibold group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform">
              <Play width={14} height={14} /> {label}
            </span>
          </button>
        )}
      </div>
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="meta link inline-flex items-center gap-1 mt-2">
          open <ArrowUpRight width={12} height={12} />
        </a>
      ) : null}
    </div>
  );
}
```

- [ ] **Step 11: Run tests**

Run: `npx vitest run src/ui`
Expected: all PASS.

- [ ] **Step 12: Commit**

```bash
git add src/ui tailwind.config.js
git commit -m "feat: add neobrutalist UI primitives and click-to-load embeds"
```

---

### Task 8: Routing, transitions, Nav, Footer, Layout

**Files:**
- Create: `src/routes.js`, `src/ui/navigation.js`, `src/ui/TLink.jsx`, `src/ui/Nav.jsx`, `src/ui/Footer.jsx`, `src/ui/Layout.jsx`, `src/styles/transitions.css`, `src/data/site.js`, placeholder pages `src/pages/Player/Player.jsx`, `src/pages/About/About.jsx`, `src/pages/Research/Research.jsx`, `src/pages/Music/Music.jsx`
- Modify: `src/App.jsx`, `src/App.test.jsx`, `src/main.jsx`, `src/ui/Button.jsx`, `src/styles/index.css`
- Test: `src/App.test.jsx`

**Interfaces:**
- Consumes: `useReducedMotion`, `installDitherMasks`, `Grain`, `AsciiField`, `ThemeToggle`.
- Produces:
  - `routes: {path, label|null, load}[]`, `preload(path): Promise`, `<PageFor path />`
  - `useTransitionNavigate(): (to: string) => Promise<void>`
  - `<TLink to className={string | ({active}) => string} />`
  - `site.links`, `site.footerLinks`, `site.name`
  - Page components each `export default function X()` rendering an `h1`.

- [ ] **Step 1: Create `src/data/site.js`**

```js
export const links = {
  github: 'https://www.github.com/Pliploop',
  scholar: 'https://scholar.google.com/citations?user=pk3boQEAAAAJ&hl=en',
  arxiv: 'https://arxiv.org/search/?searchtype=author&query=Guinot%2C+J',
  linkedin: 'https://www.linkedin.com/in/julien-guinot/',
  twitter: 'https://twitter.com/juj_gnt',
  medium: 'https://www.medium.com/juj_gnt',
  cv: '/resume.pdf',
};

export const footerLinks = [
  { label: 'GitHub', href: links.github },
  { label: 'Google Scholar', href: links.scholar },
  { label: 'LinkedIn', href: links.linkedin },
  { label: 'Twitter', href: links.twitter },
  { label: 'Medium', href: links.medium },
  { label: 'CV', href: links.cv },
];

export const site = { name: 'Julien Guinot', city: 'London', links, footerLinks };
```

- [ ] **Step 2: Create placeholder pages** (each replaced in Tasks 10, 11, 13, 14)

```jsx
// src/pages/About/About.jsx  (same shape for Research → "Research", Music → "Music", Player → "Player")
import React from 'react';
export default function About() {
  return <section className="px-4"><h1 className="display text-6xl">About</h1></section>;
}
```

- [ ] **Step 3: Write failing tests — replace `src/App.test.jsx`**

```jsx
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { AppRoutes } from './App';
import { preload } from './routes';

async function renderAt(path) {
  await act(async () => { await preload(path); });
  render(<MemoryRouter initialEntries={[path]}><AppRoutes /></MemoryRouter>);
}

test('about page renders nav with current page marked', async () => {
  await renderAt('/about');
  expect(screen.getByRole('heading', { level: 1, name: 'About' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('aria-current', 'page');
  expect(screen.queryByRole('link', { name: 'Projects' })).toBeNull();
});

test('nav link navigates without full reload', async () => {
  await renderAt('/about');
  await act(async () => { await preload('/academia'); });
  await userEvent.click(screen.getByRole('link', { name: 'Research' }));
  expect(await screen.findByRole('heading', { level: 1, name: 'Research' })).toBeInTheDocument();
});

test('player route hides nav and footer', async () => {
  await renderAt('/');
  expect(screen.queryByRole('navigation', { name: 'Main' })).toBeNull();
  expect(screen.queryByRole('contentinfo')).toBeNull();
});

test('unknown route falls back to about', async () => {
  await act(async () => { await preload('/about'); });
  render(<MemoryRouter initialEntries={['/nope']}><AppRoutes /></MemoryRouter>);
  expect(await screen.findByRole('heading', { level: 1, name: 'About' })).toBeInTheDocument();
});
```

- [ ] **Step 4: Run to verify failure**

Run: `npx vitest run src/App.test.jsx`
Expected: FAIL, `AppRoutes` / `./routes` not found.

- [ ] **Step 5: Implement `src/routes.js`**

```js
import React, { lazy, Suspense } from 'react';

export const routes = [
  { path: '/', label: null, load: () => import('./pages/Player/Player.jsx') },
  { path: '/about', label: 'About', load: () => import('./pages/About/About.jsx') },
  { path: '/academia', label: 'Research', load: () => import('./pages/Research/Research.jsx') },
  { path: '/music', label: 'Music', load: () => import('./pages/Music/Music.jsx') },
];

const loaded = new Map();
const pending = new Map();

export function preload(path) {
  const route = routes.find((r) => r.path === path);
  if (!route) return Promise.resolve();
  if (!pending.has(path)) {
    pending.set(path, route.load().then((mod) => { loaded.set(path, mod.default); return mod; }));
  }
  return pending.get(path);
}

const lazies = new Map(routes.map((r) => [r.path, lazy(() => preload(r.path))]));

export function PageFor({ path }) {
  const Ready = loaded.get(path);
  if (Ready) return <Ready />;
  const Lazy = lazies.get(path);
  return (
    <Suspense fallback={<div className="min-h-[100svh]" />}>
      <Lazy />
    </Suspense>
  );
}
```

- [ ] **Step 6: Implement `src/ui/navigation.js`**

```js
import { useCallback } from 'react';
import { flushSync } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { preload } from '../routes';

export function useTransitionNavigate() {
  const navigate = useNavigate();
  const reduced = useReducedMotion();
  return useCallback(async (to) => {
    try {
      await preload(to.split('#')[0]);
    } catch (err) {
      console.error('[nav] failed to preload route', to, err);
    }
    const canAnimate = !reduced && typeof document.startViewTransition === 'function';
    if (!canAnimate) {
      navigate(to);
      return;
    }
    document.startViewTransition(() => {
      flushSync(() => navigate(to));
    });
  }, [navigate, reduced]);
}
```

- [ ] **Step 7: Implement `src/ui/TLink.jsx`**

```jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTransitionNavigate } from './navigation';
import { preload } from '../routes';

function isModified(e) {
  return e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey;
}

export default function TLink({ to, className = '', children, ...rest }) {
  const go = useTransitionNavigate();
  const { pathname } = useLocation();
  const active = pathname === to;
  const cls = typeof className === 'function' ? className({ active }) : className;
  const warm = () => { preload(to).catch(() => {}); };
  return (
    <a
      href={to}
      aria-current={active ? 'page' : undefined}
      className={cls}
      onMouseEnter={warm}
      onFocus={warm}
      onClick={(e) => {
        if (isModified(e)) return;
        e.preventDefault();
        go(to);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
```

- [ ] **Step 8: Make `Button` use `TLink` for internal links** — in `src/ui/Button.jsx` add `import TLink from './TLink';` and before the `if (target)` block:

```jsx
  if (to) return <TLink to={to} className={cls} {...rest}>{children}</TLink>;
```

and change `const target = to ?? href;` to `const target = href;`.

- [ ] **Step 9: Implement `src/ui/Nav.jsx`**

```jsx
import React from 'react';
import TLink from './TLink';
import ThemeToggle from './ThemeToggle';
import { routes } from '../routes';

const items = routes.filter((r) => r.label);

export default function Nav() {
  return (
    <header className="fixed top-3 sm:top-5 inset-x-0 z-50 flex justify-center px-3 sm:px-4 pointer-events-none">
      <nav aria-label="Main" className="pointer-events-auto brut rounded-full bg-paper h-12 w-full max-w-3xl flex items-center gap-1 pl-4 pr-1.5">
        <TLink to="/" className="meta mr-auto whitespace-nowrap hover:text-accent-ink">
          <span className="hidden sm:inline">julien guinot</span>
          <span className="sm:hidden">jg</span>
        </TLink>
        <ul className="flex items-center gap-0.5 sm:gap-1">
          {items.map((item) => (
            <li key={item.path}>
              <TLink
                to={item.path}
                className={({ active }) => `inline-flex items-center h-9 px-3 sm:px-4 rounded-full text-[15px] font-semibold transition-colors ${
                  active ? 'bg-accent text-on-accent' : 'hover:bg-ink hover:text-paper'
                }`}
              >
                {item.label}
              </TLink>
            </li>
          ))}
        </ul>
        <ThemeToggle />
      </nav>
    </header>
  );
}
```

- [ ] **Step 10: Implement `src/ui/Footer.jsx`**

```jsx
import React from 'react';
import AsciiField from '../fx/AsciiField';
import TLink from './TLink';
import { ArrowUpRight } from './icons';
import { site } from '../data/site';

export default function Footer() {
  return (
    <footer className="px-4 sm:px-8 pb-6 mt-28">
      <div className="mx-auto max-w-6xl brut-thick rounded-card bg-paper overflow-hidden">
        <div className="h-16 border-b-2 border-ink"><AsciiField mode="wave" fontSize={12} fps={12} /></div>
        <div className="p-6 sm:p-10 grid gap-10 md:grid-cols-[1fr_auto] items-end">
          <TLink to="/about#contact" className="display text-[clamp(2.5rem,8vw,6rem)] hover:text-accent-ink">
            Get in touch
          </TLink>
          <ul className="flex flex-col gap-1.5">
            {site.footerLinks.map((l) => (
              <li key={l.label}>
                <a href={l.href} target="_blank" rel="noopener noreferrer" className="meta link inline-flex items-center gap-1">
                  {l.label} <ArrowUpRight width={12} height={12} />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="border-t-2 border-ink px-6 sm:px-10 py-3 meta flex justify-between">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <span>{site.city}</span>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 11: Implement `src/ui/Layout.jsx`**

```jsx
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Nav from './Nav';
import Footer from './Footer';
import Grain from '../fx/Grain';

export default function Layout({ children }) {
  const { pathname, hash } = useLocation();
  const bare = pathname === '/';

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView();
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] brut bg-paper rounded-full px-4 py-2 meta">
        Skip to content
      </a>
      <Grain />
      {bare ? null : <Nav />}
      <main id="main" className={bare ? '' : 'pt-28 sm:pt-36'}>{children}</main>
      {bare ? null : <Footer />}
    </>
  );
}
```

- [ ] **Step 12: Replace `src/App.jsx`**

```jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './ui/Layout';
import { routes, PageFor } from './routes';

export function AppRoutes() {
  return (
    <Layout>
      <Routes>
        {routes.map((r) => <Route key={r.path} path={r.path} element={<PageFor path={r.path} />} />)}
        <Route path="*" element={<Navigate to="/about" replace />} />
      </Routes>
    </Layout>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
```

- [ ] **Step 13: Create `src/styles/transitions.css`** and import it in `index.css` after `blobs.css`

```css
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-new(root) {
  animation: dither-in 360ms linear both;
  -webkit-mask-size: 32px 32px; mask-size: 32px 32px;
  -webkit-mask-repeat: repeat; mask-repeat: repeat;
}

@keyframes dither-in {
  0%   { -webkit-mask-image: var(--dither-1); mask-image: var(--dither-1); }
  25%  { -webkit-mask-image: var(--dither-2); mask-image: var(--dither-2); }
  50%  { -webkit-mask-image: var(--dither-3); mask-image: var(--dither-3); }
  75%  { -webkit-mask-image: var(--dither-4); mask-image: var(--dither-4); }
  100% { -webkit-mask-image: none; mask-image: none; }
}

@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

.marquee { animation: marquee 60s linear infinite; }
.marquee:hover { animation-play-state: paused; }

@media (prefers-reduced-motion: reduce) {
  .marquee { animation: none; }
}
```

- [ ] **Step 14: Install masks at startup** — in `src/main.jsx` add:

```jsx
import { installDitherMasks } from './fx/ditherMasks';
installDitherMasks();
```

- [ ] **Step 15: Run tests**

Run: `npx vitest run`
Expected: all PASS.

- [ ] **Step 16: Browser check** — `npm start`, visit `/about`, click Research/Music: dithered wipe (Chrome/Safari 18+), active pill turns vermilion, theme toggle flips the whole page, nav fits at 320px wide in devtools.

- [ ] **Step 17: Commit**

```bash
git add src/routes.js src/ui src/data/site.js src/pages src/App.jsx src/App.test.jsx src/main.jsx src/styles
git commit -m "feat: add routing shell with dither view transitions, nav and footer"
```

---

### Task 9: Data layer and copy

**Files:**
- Create: `src/data/about.js`, `src/data/paperUtils.js`, `src/data/data.test.js`
- Modify: `src/data/music.js`, `src/data/education.js`, `src/data/papers.js` (copy cleanup only)

**Interfaces:**
- Produces:
  - `about = { tagline, bio: string[], now: [label, value][], skills: string[] }`, `playerLines: string[]`
  - `research = { intro, topics: string[] }` (in `about.js`)
  - `PAPER_FILTERS: {id,label}[]`, `filterPapers(papers, filterId)`, `featuredPapers(papers)`, `badgesFor(paper): {label, accent}[]`, `isOwner(name): boolean`, `groupByYear(papers): [year, Paper[]][]`
  - `music = { intro }`, `fonkey = { name, blurb, roles, credit, spotify, instagram, tracks: {title, url, original}[] }`, `productions: {title, kind, url, tags}[]`, `commuz = { intro: string[], featuredMixes: {title,url}[], plays: {year,title,roles,description,tracks,spotify}[] }`

- [ ] **Step 1: Write failing tests `src/data/data.test.js`**

```js
import { papers } from './papers';
import { filterPapers, featuredPapers, badgesFor, isOwner, groupByYear } from './paperUtils';
import { about, playerLines, research } from './about';
import { music, fonkey, productions, commuz } from './music';
import { educationData, experienceData } from './education';

const EM_DASH = /—/;
const BANNED = /fascinat|intersection of|passionate|journey/i;

function allStrings(value) {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(allStrings);
  if (value && typeof value === 'object') return Object.values(value).flatMap(allStrings);
  return [];
}

test('copy has no em dashes or stock phrasing', () => {
  const strings = allStrings([about, playerLines, research, music, fonkey, productions, commuz, educationData, experienceData]);
  strings.forEach((s) => {
    expect(s).not.toMatch(EM_DASH);
    expect(s).not.toMatch(BANNED);
  });
});

test('featured papers are excluded from the filtered list', () => {
  const featured = featuredPapers(papers);
  expect(featured.length).toBeGreaterThan(0);
  filterPapers(papers, 'all').forEach((p) => expect(p.featured).toBeFalsy());
});

test('filters', () => {
  expect(filterPapers(papers, 'journal').every((p) => p.isJournal)).toBe(true);
  expect(filterPapers(papers, '2024').every((p) => p.year === 2024)).toBe(true);
  expect(filterPapers(papers, 'oral').every((p) => p.presentationType?.includes('oral'))).toBe(true);
  expect(filterPapers(papers, 'unknown')).toEqual(filterPapers(papers, 'all'));
});

test('badges are bracket-ready labels with only awards accented', () => {
  const b = badgesFor({ venue: 'ISMIR 2025', presentationType: 'oral,poster', awards: ['Best Paper Nominee'] });
  expect(b).toEqual([
    { label: 'ISMIR 2025', accent: false },
    { label: 'Oral', accent: false },
    { label: 'Poster', accent: false },
    { label: 'Best Paper Nominee', accent: true },
  ]);
});

test('owner detection and year grouping', () => {
  expect(isOwner('Julien Guinot')).toBe(true);
  expect(isOwner('Elio Quinton')).toBe(false);
  const groups = groupByYear([{ year: 2024 }, { year: 2025 }, { year: 2024 }]);
  expect(groups.map(([y, ps]) => [y, ps.length])).toEqual([[2025, 1], [2024, 2]]);
});

test('commuz plays each have a spotify album', () => {
  expect(commuz.plays).toHaveLength(4);
  commuz.plays.forEach((p) => expect(p.spotify).toMatch(/^https:\/\/open\.spotify\.com\/embed\/album\//));
});
```

- [ ] **Step 2: Run to verify failure**

Run: `npx vitest run src/data`
Expected: FAIL, modules/exports missing.

- [ ] **Step 3: Create `src/data/about.js`**

```js
export const playerLines = [
  'Hey!',
  'This page is interactive.',
  'just a fun little tweak',
  'click play to learn more about me!',
  'Go on!',
  '?',
  "there's not much more here",
  'you can keep going but...',
  'not going to find much more',
];

export const about = {
  tagline: 'PhD researcher at QMUL and Universal Music Group, working on music representation learning. Also a musician, producer and mixing engineer.',
  bio: [
    "I'm a musician, producer, mixing engineer and DJ. My research looks at how machine learning can help musicians find sounds, move through creative options and understand the music they make.",
    "I'm doing a PhD in the AI and Music CDT at Queen Mary University of London, supervised by Prof. George Fazekas and Elio Quinton and supported by Universal Music Group. I trained as an engineer in France and Australia, then worked in research and data science at Sony CSL, IRCAM, Believe, Groover and Artefact.",
  ],
  now: [
    ['role', 'PhD researcher, AI and Music'],
    ['where', 'Queen Mary University of London × Universal Music Group'],
    ['supervisors', 'Prof. George Fazekas, Elio Quinton'],
    ['focus', 'Foundation models, music retrieval, multimodal understanding, self-supervised learning'],
    ['before', 'Sony CSL, IRCAM, Believe, Groover, Artefact'],
    ['studied', 'École Centrale de Lyon, University of Adelaide'],
  ],
  skills: [
    'Python', 'PyTorch', 'PyTorch Lightning', 'TensorFlow', 'Keras', 'Jupyter', 'Pandas', 'C++',
    'Weights & Biases', 'LitData', 'PostgreSQL', 'Git', 'GitHub', 'Docker', 'Jenkins', 'AWS',
    'Claude Code', 'LaTeX', 'Zotero', 'React', 'HTML5', 'Node.js',
    'Ableton Live', 'Premiere Pro', 'Photoshop', 'Illustrator',
  ],
};

export const research = {
  intro: 'I build foundation models for text-music retrieval, multimodal understanding and controllable generation. The goal is models that represent music the way musicians think about it: by meaning, expression and intent.',
  topics: ['Music AI', 'Multimodal learning', 'Retrieval', 'Self-supervised learning', 'Representation learning', 'Generative models', 'Controllability'],
};
```

- [ ] **Step 4: Create `src/data/paperUtils.js`**

```js
export const PAPER_FILTERS = [
  { id: 'all', label: 'All' },
  { id: '2025', label: '2025' },
  { id: '2024', label: '2024' },
  { id: 'oral', label: 'Oral' },
  { id: 'award', label: 'Award' },
  { id: 'journal', label: 'Journal' },
];

const PREDICATES = {
  all: () => true,
  2025: (p) => p.year === 2025,
  2024: (p) => p.year === 2024,
  oral: (p) => Boolean(p.presentationType?.includes('oral')),
  award: (p) => (p.awards?.length ?? 0) > 0,
  journal: (p) => Boolean(p.isJournal),
};

export function featuredPapers(papers) {
  return papers.filter((p) => p.featured);
}

export function filterPapers(papers, filterId) {
  const test = PREDICATES[filterId] ?? PREDICATES.all;
  return papers.filter((p) => !p.featured && test(p));
}

export function badgesFor(paper) {
  const out = [{ label: paper.venue, accent: false }];
  if (paper.isJournal) out.push({ label: 'Journal', accent: false });
  if (paper.presentationType?.includes('oral')) out.push({ label: 'Oral', accent: false });
  if (paper.presentationType?.includes('poster')) out.push({ label: 'Poster', accent: false });
  (paper.awards ?? []).forEach((a) => out.push({ label: a, accent: true }));
  return out;
}

export function isOwner(name) {
  return /julien guinot/i.test(name);
}

export function groupByYear(papers) {
  const map = new Map();
  papers.forEach((p) => map.set(p.year, [...(map.get(p.year) ?? []), p]));
  return [...map.entries()].sort((a, b) => b[0] - a[0]);
}
```

- [ ] **Step 5: Replace `src/data/music.js`**

```js
export const music = {
  intro: 'Musician, producer, mixing engineer and DJ. I make funk, soul and electronic music, mostly to feel things and sometimes to make other people feel things too.',
};

export const fonkey = {
  name: 'Fonkey Business',
  blurb: 'Funk, soul and RnB band. Live studio versions and covers.',
  roles: ['Bassist', 'Mixing engineer', 'Mastering engineer', 'Choir lead'],
  credit: 'Bass, mixing and mastering by Julien Guinot',
  spotify: 'https://open.spotify.com/artist/fonkeybusiness',
  instagram: 'https://www.instagram.com/fonkeybusiness',
  tracks: [
    { title: 'Colors', url: 'https://youtu.be/bPJmExJGmmU?si=fmyTaD-uRQMCqCqc', original: 'Black Pumas' },
    { title: 'Lover Boy', url: 'https://www.youtube.com/watch?v=MUyIXcaW89s&ab_channel=FonkeyBusiness', original: 'Phum Viphurit' },
    { title: "Don't Stop the Music", url: 'https://youtu.be/sIvH9gapjvc?si=MeHXO4TSO0XmGfcq', original: 'Jamie Cullum' },
    { title: 'Redbone', url: 'https://www.youtube.com/watch?v=9fj4GnkUb2o', original: 'Childish Gambino' },
  ],
};

export const productions = [
  { title: 'Oolala', kind: 'Original composition', url: 'https://soundcloud.com/jujgui/bullshit', tags: ['Composition', 'Production', 'Mixing', 'Mastering'] },
  { title: 'Aztecs', kind: 'Original composition', url: 'https://soundcloud.com/jujgui/aztecs', tags: ['Composition', 'Arrangement', 'Mixing', 'Mastering', 'Production'] },
  { title: 'LikeTHAT', kind: 'Disco house', url: 'https://soundcloud.com/jujgui/likethat-remastered', tags: ['Production', 'Mixing', 'Mastering'] },
];

export const commuz = {
  intro: [
    "Commuz' is a student society at École Centrale de Lyon that writes and stages a new musical every year. Students do everything: script, arrangement, composition, recording, mixing, costumes, props and choreography. About 80 students take part each year.",
    'I took part in all four of my years at ECL. I started as a sound engineer and mixed the album every year after that, which is mostly how I learned to mix. Two of my mixes from the 2022 edition are below.',
  ],
  featuredMixes: [
    { title: 'Feeling Good', url: 'https://soundcloud.com/jujgui/feeling-good' },
    { title: 'Joga', url: 'https://soundcloud.com/jujgui/joga' },
  ],
  plays: [
    {
      year: '2022', title: 'En memoria', roles: ['Choir lead', 'Mix engineer', 'Mastering engineer'],
      description: 'My final year. I led the SATB choir, coached actors on stage, arranged vocal harmonies and did the full mix and master.',
      tracks: ['Treasure', 'Joga', 'Le rituel', 'Feeling Good', 'September', 'La légende'],
      spotify: 'https://open.spotify.com/embed/album/4boTthC3VNuTVeBVcmJAED?utm_source=generator',
    },
    {
      year: '2021', title: "Noces D'opium", roles: ['Bass vocalist', 'Mix engineer'],
      description: "Set in 1800s China. I was the choir's only bass vocalist. It was also the year I learned music theory and got hooked on Ableton.",
      tracks: ['Good Morning', 'Eternal Youth', 'I love you', 'Tango Amoroso'],
      spotify: 'https://open.spotify.com/embed/album/75UGY5R9yFlqCxhYB91CLB?utm_source=generator',
    },
    {
      year: '2020', title: 'Contretemps', roles: ['Graphic designer', 'Community manager', 'Mix engineer'],
      description: 'Set at Versailles under Louis XIV. I ran social media, made the official poster and trailer videos, and set the visual identity of the play.',
      tracks: ['Te Deum', 'A contretemps', 'La cour dérape'],
      spotify: 'https://open.spotify.com/embed/album/4vHXsNBT0GHheB2SSNk7u1?utm_source=generator',
    },
    {
      year: '2019', title: 'Désorientés', roles: ['Sound engineer'],
      description: 'My first year. I recorded, set up live sound and mixed the CD. The mixes were rough, but this is where I started.',
      tracks: ['Ali Babouche', 'Le bazar', 'La fête au palais'],
      spotify: 'https://open.spotify.com/embed/album/6ymtsIOKfk6TsKiHoGssp5?utm_source=generator',
    },
  ],
};
```

Note: the old file spelled the Lover Boy artist "Phum Vifurit"; the artist is Phum Viphurit. Flag this correction to the owner at review rather than silently keeping it.

- [ ] **Step 6: Clean `education.js` and `papers.js` copy**

Run: `grep -n "—" src/data/education.js src/data/papers.js`
For each hit in `education.js`, replace ` — ` with `. ` or `, ` so the sentence still reads correctly (no facts changed). Also fix the visible typos: `superivision` → `supervision`, `help musicians create musicians` → `help musicians create`, `.The` spacing issues. In `papers.js`, abstracts are verbatim from the papers: leave abstracts untouched. Run the test again; if an abstract contains an em dash, change the test helper to skip `abstract` keys:

```js
  if (value && typeof value === 'object') return Object.entries(value).filter(([k]) => k !== 'abstract').flatMap(([, v]) => allStrings(v));
```

(papers are not in the scanned list anyway; this only matters if you add them.)

- [ ] **Step 7: Run tests**

Run: `npx vitest run src/data`
Expected: all PASS.

- [ ] **Step 8: Commit**

```bash
git add src/data
git commit -m "feat: move copy into data modules and rewrite in plain voice"
```

---

### Task 10: Player page

**Files:**
- Create: `src/pages/Player/playerState.js`, `src/pages/Player/ProgressBar.jsx`, `src/pages/Player/Player.test.jsx`
- Modify: `src/pages/Player/Player.jsx` (replace placeholder)

**Interfaces:**
- Consumes: `playerLines`, `DitherField`, `AsciiField`, `DropCapHeading`, icons, `TLink`, `useTransitionNavigate`.
- Produces: `STEPS = 100`, `initialPlayerState(count)`, `playerReducer(state, action)` with actions `toggle|next|prev|like|tick`, `formatTime(seconds): string`, `randomBetween(min, max): number`.

- [ ] **Step 1: Write failing tests `src/pages/Player/Player.test.jsx`**

```jsx
import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Player from './Player';
import { initialPlayerState, playerReducer, formatTime, STEPS } from './playerState';

describe('reducer', () => {
  const s0 = initialPlayerState(3);
  test('toggle, next, prev, like', () => {
    let s = playerReducer(s0, { type: 'toggle' });
    expect(s.playing).toBe(true);
    s = playerReducer(s, { type: 'next' });
    expect(s).toMatchObject({ index: 1, playing: false, progress: 0 });
    s = playerReducer(s, { type: 'next' });
    s = playerReducer(s, { type: 'next' });
    expect(s.index).toBe(2);
    s = playerReducer(s, { type: 'like' });
    expect(s.liked).toEqual([false, false, true]);
    s = playerReducer(s, { type: 'prev' });
    expect(s.index).toBe(1);
    expect(s0.liked).toEqual([false, false, false]);
  });
  test('ticks only while playing and ends at STEPS', () => {
    let s = playerReducer(s0, { type: 'tick' });
    expect(s.progress).toBe(0);
    s = playerReducer(s0, { type: 'toggle' });
    for (let i = 0; i < STEPS + 5; i++) s = playerReducer(s, { type: 'tick' });
    expect(s).toMatchObject({ progress: STEPS, ended: true, playing: false });
    expect(playerReducer(s, { type: 'toggle' })).toBe(s);
  });
  test('formatTime', () => {
    expect(formatTime(0)).toBe('0:00');
    expect(formatTime(75.4)).toBe('1:15');
    expect(formatTime(-3)).toBe('0:00');
  });
});

describe('component', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  function renderPlayer() {
    return render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Player />} />
          <Route path="/about" element={<h1>About page</h1>} />
        </Routes>
      </MemoryRouter>,
    );
  }

  test('play runs to the end and navigates to /about exactly once', async () => {
    renderPlayer();
    fireEvent.click(screen.getByRole('button', { name: 'Play' }));
    await act(async () => { vi.advanceTimersByTime(2500); });
    await act(async () => { vi.advanceTimersByTime(600); await Promise.resolve(); });
    expect(await screen.findByText('About page')).toBeInTheDocument();
  });

  test('space toggles play, arrows change line', () => {
    renderPlayer();
    expect(screen.getByText('Hey!')).toBeInTheDocument();
    fireEvent.keyDown(window, { key: 'ArrowRight' });
    expect(screen.getByText('This page is interactive.')).toBeInTheDocument();
    fireEvent.keyDown(window, { key: ' ' });
    expect(screen.getByRole('button', { name: 'Pause' })).toBeInTheDocument();
  });

  test('unmounting mid-playback clears timers', () => {
    const { unmount } = renderPlayer();
    fireEvent.click(screen.getByRole('button', { name: 'Play' }));
    unmount();
    expect(vi.getTimerCount()).toBe(0);
  });
});
```

- [ ] **Step 2: Run to verify failure**

Run: `npx vitest run src/pages/Player`
Expected: FAIL, `./playerState` not found.

- [ ] **Step 3: Implement `src/pages/Player/playerState.js`**

```js
export const STEPS = 100;

export function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

export function initialPlayerState(count) {
  return { index: 0, count, playing: false, progress: 0, ended: false, liked: Array(count).fill(false) };
}

export function playerReducer(state, action) {
  switch (action.type) {
    case 'toggle':
      return state.ended ? state : { ...state, playing: !state.playing };
    case 'next':
      return { ...state, index: Math.min(state.count - 1, state.index + 1), playing: false, progress: 0 };
    case 'prev':
      return { ...state, index: Math.max(0, state.index - 1), playing: false, progress: 0 };
    case 'like':
      return { ...state, liked: state.liked.map((v, i) => (i === state.index ? !v : v)) };
    case 'tick': {
      if (!state.playing) return state;
      const progress = Math.min(STEPS, state.progress + 1);
      return { ...state, progress, ended: progress >= STEPS, playing: progress < STEPS };
    }
    default:
      return state;
  }
}

export function formatTime(seconds) {
  const s = Math.max(0, Math.round(seconds));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}
```

- [ ] **Step 4: Implement `src/pages/Player/ProgressBar.jsx`**

```jsx
import React from 'react';
import { STEPS, formatTime } from './playerState';

const BLOCKS = 24;

export default function ProgressBar({ progress, total }) {
  const filled = Math.round((progress / STEPS) * BLOCKS);
  return (
    <div className="mt-5">
      <div
        role="progressbar"
        aria-label="Track progress"
        aria-valuemin={0}
        aria-valuemax={STEPS}
        aria-valuenow={progress}
        className="flex gap-[3px] h-4 p-[3px] border-2 border-ink rounded-full"
      >
        {Array.from({ length: BLOCKS }, (_, i) => (
          <span key={i} className={`flex-1 rounded-[2px] ${i < filled ? 'bg-ink' : ''}`} />
        ))}
      </div>
      <div className="meta flex justify-between mt-1.5 text-ink/60">
        <span>{formatTime((progress / STEPS) * total)}</span>
        <span>{formatTime(total)}</span>
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Implement `src/pages/Player/Player.jsx`**

```jsx
import React, { useEffect, useMemo, useReducer } from 'react';
import DitherField from '../../fx/DitherField';
import AsciiField from '../../fx/AsciiField';
import DropCapHeading from '../../ui/DropCapHeading';
import TLink from '../../ui/TLink';
import ProgressBar from './ProgressBar';
import { Play, Pause, SkipBack, SkipForward, Heart } from '../../ui/icons';
import { useTransitionNavigate } from '../../ui/navigation';
import { playerLines } from '../../data/about';
import { initialPlayerState, playerReducer, randomBetween, STEPS } from './playerState';

const square = 'brut brut-press h-12 w-12 rounded-2xl bg-paper grid place-items-center';

export default function Player() {
  const [state, dispatch] = useReducer(playerReducer, playerLines.length, initialPlayerState);
  const go = useTransitionNavigate();
  const total = useMemo(() => randomBetween(180, 240), []);
  const started = state.playing || state.progress > 0;

  useEffect(() => {
    if (!state.playing) return undefined;
    const id = setInterval(() => dispatch({ type: 'tick' }), randomBetween(1200, 1800) / STEPS);
    return () => clearInterval(id);
  }, [state.playing, state.index]);

  useEffect(() => {
    if (!state.ended) return undefined;
    const id = setTimeout(() => go('/about'), 400);
    return () => clearTimeout(id);
  }, [state.ended, go]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.target instanceof HTMLElement && e.target.closest('input, textarea, button, a')) return;
      if (e.key === ' ') { e.preventDefault(); dispatch({ type: 'toggle' }); }
      if (e.key === 'ArrowRight') dispatch({ type: 'next' });
      if (e.key === 'ArrowLeft') dispatch({ type: 'prev' });
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const liked = state.liked[state.index];

  return (
    <div className="min-h-[100svh] flex flex-col items-center justify-center px-4 py-10">
      <article aria-label="Intro player" className="w-full max-w-[380px] brut-thick rounded-card bg-paper overflow-hidden">
        <div className="relative aspect-square border-b-[3px] border-ink">
          <div className={`absolute inset-0 transition-opacity duration-700 ${started ? 'opacity-0' : 'opacity-100'}`}>
            <DitherField seed={7} fg="--accent" cell={4} active={!started} />
          </div>
          <div className={`absolute inset-0 transition-opacity duration-700 ${started ? 'opacity-100' : 'opacity-0'}`}>
            <AsciiField seed={7} blobs={5} fontSize={11} fps={18} active={started} />
          </div>
        </div>
        <div className="p-5">
          <DropCapHeading level={1} text="Julien Guinot" caps={['zighead', 'saint']} accentWord={0} className="text-[2.6rem]" />
          <p className="meta mt-2 min-h-[3em] text-ink/70" aria-live="polite">{playerLines[state.index]}</p>
          <ProgressBar progress={state.progress} total={total} />
          <div className="mt-5 flex items-center justify-between">
            <button type="button" aria-label="Previous line" className={square} onClick={() => dispatch({ type: 'prev' })} disabled={state.index === 0}>
              <SkipBack />
            </button>
            <button
              type="button"
              aria-label={state.playing ? 'Pause' : 'Play'}
              className="brut brut-press h-16 w-16 rounded-full bg-accent text-on-accent grid place-items-center"
              onClick={() => dispatch({ type: 'toggle' })}
            >
              {state.playing ? <Pause width={24} height={24} /> : <Play width={24} height={24} />}
            </button>
            <button type="button" aria-label="Next line" className={square} onClick={() => dispatch({ type: 'next' })} disabled={state.index === state.count - 1}>
              <SkipForward />
            </button>
            <button type="button" aria-label={liked ? 'Unlike' : 'Like'} aria-pressed={liked} className={square} onClick={() => dispatch({ type: 'like' })}>
              <Heart filled={liked} className={liked ? 'text-accent-ink' : ''} />
            </button>
          </div>
        </div>
      </article>
      <TLink to="/about" className="meta mt-6 link">skip →</TLink>
    </div>
  );
}
```

- [ ] **Step 6: Run tests**

Run: `npx vitest run src/pages/Player`
Expected: all PASS. If the navigation test fails because `go` awaits `preload('/about')` (a real dynamic import under fake timers), add at the top of the test file:

```js
vi.mock('../../routes', () => ({ preload: () => Promise.resolve(), routes: [] }));
```

- [ ] **Step 7: Browser check** — `npm start` at `/`: dithered cover; Play turns it into ASCII; the bar fills in ~1.5s and the page wipes to `/about`; `skip →` works; Space/←/→ work.

- [ ] **Step 8: Commit**

```bash
git add src/pages/Player
git commit -m "feat: rebuild intro player with dither cover that turns to ASCII"
```

---

### Task 11: About page (hero, bio, now, skills, timeline)

**Files:**
- Create: `src/pages/About/Hero.jsx`, `Bio.jsx`, `NowBox.jsx`, `SkillsStrip.jsx`, `Timeline.jsx`, `About.test.jsx`, `src/assets/portrait.jpg`
- Modify: `src/pages/About/About.jsx`

**Interfaces:**
- Consumes: `about`, `educationData`, `experienceData`, `site.links`, `Button`, `DropCapHeading`, `DitherField`, `Frame`, `Divider`, `Expandable`.
- Produces: `<About />` with sections `#bio`, `#background`, `#contact` (contact added in Task 12; render a `<section id="contact" />` placeholder until then).

- [ ] **Step 1: Prepare the portrait**

```bash
mkdir -p src/assets
sips -Z 900 -s format jpeg -s formatOptions 78 src/content/images/propic.jpg --out src/assets/portrait.jpg
ls -la src/assets/portrait.jpg
```

Expected: file under ~150 KB.

- [ ] **Step 2: Write failing tests `src/pages/About/About.test.jsx`**

```jsx
import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import About from './About';
import { experienceData } from '../../data/education';

function renderAbout() {
  return render(<MemoryRouter><About /></MemoryRouter>);
}

test('hero shows the name as the only h1', () => {
  renderAbout();
  expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  expect(screen.getByRole('heading', { level: 1, name: 'Julien Guinot' })).toBeInTheDocument();
});

test('now box lists supervisors', () => {
  renderAbout();
  expect(screen.getByText('Prof. George Fazekas, Elio Quinton')).toBeInTheDocument();
});

test('timeline switches tabs and expands rows', async () => {
  renderAbout();
  const tabs = screen.getByRole('tablist', { name: 'Background' });
  await userEvent.click(within(tabs).getByRole('tab', { name: 'Experience' }));
  expect(within(tabs).getByRole('tab', { name: 'Experience' })).toHaveAttribute('aria-selected', 'true');
  const firstRole = experienceData[0].title;
  const row = screen.getByRole('button', { name: new RegExp(firstRole.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')) });
  await userEvent.click(row);
  expect(row).toHaveAttribute('aria-expanded', 'true');
});

test('portrait has alt text', () => {
  renderAbout();
  expect(screen.getByAltText('Julien Guinot')).toBeInTheDocument();
});
```

- [ ] **Step 3: Run to verify failure**

Run: `npx vitest run src/pages/About`
Expected: FAIL, heading `About` (placeholder) instead of the name.

- [ ] **Step 4: Implement `src/pages/About/Hero.jsx`**

```jsx
import React from 'react';
import DitherField from '../../fx/DitherField';
import DropCapHeading from '../../ui/DropCapHeading';
import Button from '../../ui/Button';
import { ArrowUpRight, ArrowDown } from '../../ui/icons';
import { about } from '../../data/about';
import { links } from '../../data/site';

export default function Hero() {
  return (
    <section className="relative mx-auto max-w-6xl px-4 sm:px-8 min-h-[72svh] flex flex-col justify-end pb-6">
      <div aria-hidden="true" className="absolute right-0 top-0 w-[78vw] sm:w-[52vw] max-w-[600px] aspect-square blob-1">
        <DitherField seed={11} fg="--accent" cell={4} />
      </div>
      <DropCapHeading level={1} text="Julien Guinot" caps={['zighead', 'saint']} accentWord={0} stack className="relative text-[clamp(4rem,15vw,12rem)] leading-[0.82]" />
      <p className="relative mt-8 max-w-[34ch] text-xl sm:text-2xl font-medium leading-snug">{about.tagline}</p>
      <div className="relative mt-8 flex flex-wrap items-center gap-3">
        <Button to="/academia">Research</Button>
        <Button to="/music" variant="outline">Music</Button>
        <a href={links.cv} target="_blank" rel="noopener noreferrer" className="meta link inline-flex items-center gap-1 px-2">CV <ArrowUpRight width={12} height={12} /></a>
        <a href="#contact" className="meta link inline-flex items-center gap-1 px-2">Contact <ArrowDown width={12} height={12} /></a>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Implement `src/pages/About/Bio.jsx`**

```jsx
import React from 'react';
import DitherField from '../../fx/DitherField';
import DropCapHeading from '../../ui/DropCapHeading';
import portrait from '../../assets/portrait.jpg';
import { about } from '../../data/about';

export default function Bio() {
  return (
    <section id="bio" className="mx-auto max-w-6xl px-4 sm:px-8 grid md:grid-cols-[1.25fr_1fr] gap-12 items-start">
      <div>
        <DropCapHeading level={2} text="About me" caps={['zighead', 'saint']} className="text-5xl sm:text-6xl mb-8" />
        <div className="space-y-5 text-lg max-w-[58ch]">
          {about.bio.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
        </div>
      </div>
      <figure className="relative w-full max-w-sm justify-self-center md:justify-self-end aspect-[3/4] blob-2 group" tabIndex={0}>
        <DitherField image={portrait} fg="--ink" bg="--paper" cell={3} contrast={1.35} />
        <img
          src={portrait}
          alt="Julien Guinot"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-500"
        />
      </figure>
    </section>
  );
}
```

- [ ] **Step 6: Implement `src/pages/About/NowBox.jsx`**

```jsx
import React from 'react';
import Frame from '../../ui/Frame';
import { about } from '../../data/about';

export default function NowBox() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-8 mt-16">
      <Frame as="section" aria-label="Now" className="p-6 sm:p-8">
        <h2 className="meta mb-5">[now]</h2>
        <dl className="grid sm:grid-cols-[9rem_1fr] gap-x-6 gap-y-2.5">
          {about.now.map(([k, v]) => (
            <React.Fragment key={k}>
              <dt className="meta text-ink/55">{k}</dt>
              <dd className="font-medium">{v}</dd>
            </React.Fragment>
          ))}
        </dl>
      </Frame>
    </div>
  );
}
```

- [ ] **Step 7: Implement `src/pages/About/SkillsStrip.jsx`**

```jsx
import React from 'react';
import { about } from '../../data/about';

export default function SkillsStrip() {
  const line = about.skills.join('  /  ');
  return (
    <section aria-label="Skills and tools" className="mt-16 border-y-2 border-ink py-4 overflow-hidden">
      <p className="sr-only">{about.skills.join(', ')}</p>
      <div aria-hidden="true" className="marquee flex w-max whitespace-nowrap meta text-[15px]">
        <span className="pr-8">{line}  /  </span>
        <span className="pr-8">{line}  /  </span>
      </div>
    </section>
  );
}
```

- [ ] **Step 8: Implement `src/pages/About/Timeline.jsx`**

```jsx
import React, { useState } from 'react';
import DropCapHeading from '../../ui/DropCapHeading';
import Expandable from '../../ui/Expandable';
import { educationData, experienceData } from '../../data/education';
import { ArrowUpRight } from '../../ui/icons';

const TABS = [
  { id: 'education', label: 'Education', items: educationData },
  { id: 'experience', label: 'Experience', items: experienceData },
];

function Row({ item }) {
  return (
    <Expandable
      summary={(
        <div className="grid sm:grid-cols-[15rem_1fr] gap-1 sm:gap-6 items-baseline">
          <span className="meta text-ink/55">{item.dates}</span>
          <span>
            <span className="font-semibold text-lg">{item.title}</span>{' '}
            <span className="text-ink/60">{item.company.replace(/^@/, '')}</span>
          </span>
        </div>
      )}
    >
      <ul className="sm:ml-[16.5rem] space-y-2 max-w-[62ch] list-[square] pl-5 marker:text-accent-ink">
        {item.description.map((d) => <li key={d.slice(0, 32)}>{d}</li>)}
      </ul>
      {item.links?.length ? (
        <div className="sm:ml-[16.5rem] mt-3 flex flex-wrap gap-4">
          {item.links.map((href, i) => (
            <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="meta link inline-flex items-center gap-1">
              {item.linktexts?.[i] ?? 'link'} <ArrowUpRight width={12} height={12} />
            </a>
          ))}
        </div>
      ) : null}
    </Expandable>
  );
}

export default function Timeline() {
  const [tab, setTab] = useState('education');
  const current = TABS.find((t) => t.id === tab);
  return (
    <section id="background" className="mx-auto max-w-6xl px-4 sm:px-8">
      <DropCapHeading level={2} text="Background" caps={['saint']} className="text-5xl sm:text-6xl mb-8" />
      <div role="tablist" aria-label="Background" className="flex gap-2 mb-6">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            id={`tab-${t.id}`}
            aria-selected={tab === t.id}
            aria-controls={`panel-${t.id}`}
            onClick={() => setTab(t.id)}
            className={`brut brut-press h-10 px-4 rounded-xl font-semibold ${tab === t.id ? 'bg-ink text-paper' : 'bg-paper'}`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} className="border-t-2 border-ink">
        {current.items.map((item) => <Row key={item.title + item.dates} item={item} />)}
      </div>
    </section>
  );
}
```

- [ ] **Step 9: Replace `src/pages/About/About.jsx`**

```jsx
import React from 'react';
import Hero from './Hero';
import Bio from './Bio';
import NowBox from './NowBox';
import SkillsStrip from './SkillsStrip';
import Timeline from './Timeline';
import Divider from '../../ui/Divider';

export default function About() {
  return (
    <>
      <Hero />
      <Divider />
      <Bio />
      <NowBox />
      <SkillsStrip />
      <Divider />
      <Timeline />
      <Divider />
      <section id="contact" />
    </>
  );
}
```

- [ ] **Step 10: Run tests**

Run: `npx vitest run`
Expected: `src/App.test.jsx` now fails where it looks for `getByRole('heading', { level: 1, name: 'About' })` / `findByRole('heading', { level: 1, name: 'About' })`, because the About h1 is the name. Change those two heading queries to `name: 'Julien Guinot'` (leave the nav `link` query for 'About' as is) and rerun: all PASS.

- [ ] **Step 11: Browser check** at `/about`, light and dark, 1440px and 375px wide. Expected: huge name with Zighead J in vermilion and Saint G; dithered vermilion blob top right; dithered portrait shows the photo on hover; marquee scrolls slowly and pauses on hover; tab + row expand animate smoothly.

- [ ] **Step 12: Commit**

```bash
git add src/pages/About src/assets src/App.test.jsx
git commit -m "feat: build About page with dithered hero and portrait"
```

---

### Task 12: Contact form

**Files:**
- Create: `src/pages/About/contactLogic.js`, `src/pages/About/Contact.jsx`, `src/pages/About/Contact.test.jsx`
- Modify: `src/pages/About/About.jsx` (replace the placeholder section with `<Contact />`)

**Interfaces:**
- Consumes: `@emailjs/browser`, `DropCapHeading`, `Frame`, `Button`.
- Produces: `validateContact({name,email,message}): Record<string,string>`, `stripHtml(s)`, `COOLDOWN_MS = 30000`, `emailConfig(env = import.meta.env): {serviceId, templateId, publicKey} | null`, `<Contact />` rendering `<section id="contact">`.

- [ ] **Step 1: Write failing tests `src/pages/About/Contact.test.jsx`**

```jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import emailjs from '@emailjs/browser';
import Contact from './Contact';
import { validateContact, stripHtml, emailConfig } from './contactLogic';

vi.mock('@emailjs/browser', () => ({ default: { send: vi.fn() } }));
vi.mock('./contactLogic', async (orig) => {
  const mod = await orig();
  return { ...mod, emailConfig: vi.fn(() => ({ serviceId: 's', templateId: 't', publicKey: 'k' })) };
});

afterEach(() => vi.clearAllMocks());

test('validation', () => {
  expect(validateContact({ name: '', email: '', message: '' })).toEqual({ email: 'Required', message: 'Required' });
  expect(validateContact({ name: '', email: 'nope', message: 'hi' })).toEqual({ email: 'Invalid email address' });
  expect(validateContact({ name: 'a', email: 'a@b.co', message: 'hi' })).toEqual({});
  expect(validateContact({ name: 'x'.repeat(101), email: 'a@b.co', message: 'hi' })).toEqual({ name: 'Too long' });
});

test('stripHtml', () => {
  expect(stripHtml(' <b>hi</b> there ')).toBe('hi there');
});

test('emailConfig is null when keys are missing', async () => {
  const real = (await vi.importActual('./contactLogic')).emailConfig;
  expect(real({})).toBeNull();
  expect(real({ REACT_APP_EMAILJS_SERVICE_ID: 's', REACT_APP_EMAILJS_TEMPLATE_ID: 't', REACT_APP_EMAILJS_PUBLIC_KEY: 'k' }))
    .toEqual({ serviceId: 's', templateId: 't', publicKey: 'k' });
});

async function fill() {
  await userEvent.type(screen.getByLabelText(/email/i), 'a@b.co');
  await userEvent.type(screen.getByLabelText(/message/i), 'hello <i>there</i>');
}

test('shows field errors on empty submit', async () => {
  render(<Contact />);
  await userEvent.click(screen.getByRole('button', { name: /send/i }));
  expect(screen.getAllByText('Required')).toHaveLength(2);
  expect(emailjs.send).not.toHaveBeenCalled();
});

test('sends sanitized params and shows success', async () => {
  emailjs.send.mockResolvedValue({});
  render(<Contact />);
  await fill();
  await userEvent.click(screen.getByRole('button', { name: /send/i }));
  expect(emailjs.send).toHaveBeenCalledWith('s', 't', { from_name: '', reply_to: 'a@b.co', message: 'hello there' }, 'k');
  expect(await screen.findByText(/message sent/i)).toBeInTheDocument();
});

test('shows an error when sending fails', async () => {
  emailjs.send.mockRejectedValue(new Error('down'));
  render(<Contact />);
  await fill();
  await userEvent.click(screen.getByRole('button', { name: /send/i }));
  expect(await screen.findByRole('alert')).toHaveTextContent(/could not be sent/i);
});

test('blocks a second send within the cooldown', async () => {
  emailjs.send.mockRejectedValue(new Error('down'));
  render(<Contact />);
  await fill();
  await userEvent.click(screen.getByRole('button', { name: /send/i }));
  await screen.findByRole('alert');
  await userEvent.click(screen.getByRole('button', { name: /send/i }));
  expect(emailjs.send).toHaveBeenCalledTimes(1);
  expect(screen.getByRole('alert')).toHaveTextContent(/wait 30 seconds/i);
});

test('missing configuration is reported, not silent', async () => {
  emailConfig.mockReturnValueOnce(null);
  render(<Contact />);
  await fill();
  await userEvent.click(screen.getByRole('button', { name: /send/i }));
  expect(screen.getByRole('alert')).toHaveTextContent(/not configured/i);
  expect(emailjs.send).not.toHaveBeenCalled();
});
```

- [ ] **Step 2: Run to verify failure**

Run: `npx vitest run src/pages/About/Contact.test.jsx`
Expected: FAIL, modules not found.

- [ ] **Step 3: Implement `src/pages/About/contactLogic.js`**

```js
export const COOLDOWN_MS = 30000;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function stripHtml(s) {
  return s.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

export function validateContact({ name, email, message }) {
  const errors = {};
  if (name.length > 100) errors.name = 'Too long';
  if (!email.trim()) errors.email = 'Required';
  else if (!EMAIL.test(email.trim())) errors.email = 'Invalid email address';
  if (!message.trim()) errors.message = 'Required';
  else if (message.length > 5000) errors.message = 'Too long';
  return errors;
}

export function emailConfig(env = import.meta.env) {
  const serviceId = env.REACT_APP_EMAILJS_SERVICE_ID;
  const templateId = env.REACT_APP_EMAILJS_TEMPLATE_ID;
  const publicKey = env.REACT_APP_EMAILJS_PUBLIC_KEY;
  if (!serviceId || !templateId || !publicKey) return null;
  return { serviceId, templateId, publicKey };
}
```

- [ ] **Step 4: Implement `src/pages/About/Contact.jsx`**

```jsx
import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import DropCapHeading from '../../ui/DropCapHeading';
import Frame from '../../ui/Frame';
import { ArrowUpRight } from '../../ui/icons';
import { validateContact, stripHtml, emailConfig, COOLDOWN_MS } from './contactLogic';

const EMPTY = { name: '', email: '', message: '' };
const input = 'w-full bg-paper border-2 border-ink rounded-2xl px-4 py-3 shadow-hard-sm focus:shadow-hard focus:outline-none transition-shadow placeholder:text-ink/35';

function Field({ id, label, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="meta">{label}</label>
      {children}
      {error ? <p id={`${id}-error`} className="meta text-accent-ink">{error}</p> : null}
    </div>
  );
}

export default function Contact() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ kind: 'idle', message: '' });
  const lastSend = useRef(0);

  const set = (key) => (e) => setValues((v) => ({ ...v, [key]: e.target.value }));
  const aria = (key) => (errors[key] ? { 'aria-invalid': true, 'aria-describedby': `${key}-error` } : {});

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = validateContact(values);
    setErrors(found);
    if (Object.keys(found).length) return;
    if (Date.now() - lastSend.current < COOLDOWN_MS) {
      setStatus({ kind: 'error', message: 'Please wait 30 seconds before sending another message.' });
      return;
    }
    const config = emailConfig();
    if (!config) {
      console.error('[contact] EmailJS environment variables are missing');
      setStatus({ kind: 'error', message: 'The contact form is not configured right now. Please reach me on LinkedIn instead.' });
      return;
    }
    lastSend.current = Date.now();
    setStatus({ kind: 'sending', message: '' });
    try {
      await emailjs.send(config.serviceId, config.templateId, {
        from_name: stripHtml(values.name), reply_to: values.email.trim(), message: stripHtml(values.message),
      }, config.publicKey);
      setValues(EMPTY);
      setStatus({ kind: 'success', message: '' });
    } catch (err) {
      console.error('[contact] send failed', err);
      setStatus({ kind: 'error', message: 'Your message could not be sent. Please try again in a moment.' });
    }
  };

  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 sm:px-8 scroll-mt-28">
      <DropCapHeading level={2} text="Get in touch" caps={['zighead']} className="text-5xl sm:text-6xl mb-8" />
      {status.kind === 'success' ? (
        <Frame className="p-8 max-w-2xl" role="status">
          <p className="display text-3xl">Message sent.</p>
          <p className="mt-3 text-ink/70">Thanks. I'll get back to you soon.</p>
          <button type="button" className="meta link mt-5" onClick={() => setStatus({ kind: 'idle', message: '' })}>send another</button>
        </Frame>
      ) : (
        <form noValidate onSubmit={onSubmit} className="max-w-2xl grid gap-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <Field id="name" label="name (optional)" error={errors.name}>
              <input id="name" name="name" autoComplete="name" className={input} value={values.name} onChange={set('name')} {...aria('name')} />
            </Field>
            <Field id="email" label="email" error={errors.email}>
              <input id="email" name="email" type="email" autoComplete="email" className={input} value={values.email} onChange={set('email')} {...aria('email')} />
            </Field>
          </div>
          <Field id="message" label="message" error={errors.message}>
            <textarea id="message" name="message" rows={6} className={`${input} resize-y`} value={values.message} onChange={set('message')} {...aria('message')} />
          </Field>
          {status.kind === 'error' ? <p role="alert" className="meta text-accent-ink">{status.message}</p> : null}
          <div>
            <button type="submit" disabled={status.kind === 'sending'} className="brut brut-press h-12 px-6 rounded-full bg-accent text-on-accent font-semibold inline-flex items-center gap-2 disabled:opacity-60">
              {status.kind === 'sending' ? 'Sending…' : 'Send'} <ArrowUpRight width={14} height={14} />
            </button>
          </div>
        </form>
      )}
    </section>
  );
}
```

- [ ] **Step 5: Wire into About** — in `About.jsx` replace `<section id="contact" />` with `<Contact />` and add `import Contact from './Contact';`.

- [ ] **Step 6: Run tests**

Run: `npx vitest run`
Expected: all PASS.

- [ ] **Step 7: Commit**

```bash
git add src/pages/About
git commit -m "feat: add contact form with explicit validation and send states"
```

---

### Task 13: Research page

**Files:**
- Create: `src/pages/Research/Authors.jsx`, `PaperCard.jsx`, `PaperRow.jsx`, `PaperFilter.jsx`, `Research.test.jsx`
- Modify: `src/pages/Research/Research.jsx`

**Interfaces:**
- Consumes: `papers`, `PAPER_FILTERS`, `filterPapers`, `featuredPapers`, `badgesFor`, `isOwner`, `research`, `links`, `AsciiField`, `DropCapHeading`, `Frame`, `Expandable`, `Divider`.
- Produces: `<Research />`.

- [ ] **Step 1: Write failing tests `src/pages/Research/Research.test.jsx`**

```jsx
import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Research from './Research';
import { papers } from '../../data/papers';
import { filterPapers, featuredPapers } from '../../data/paperUtils';

const renderPage = () => render(<MemoryRouter><Research /></MemoryRouter>);

test('h1 and featured cards', () => {
  renderPage();
  expect(screen.getByRole('heading', { level: 1, name: 'Research' })).toBeInTheDocument();
  featuredPapers(papers).forEach((p) => expect(screen.getByRole('heading', { level: 3, name: p.title })).toBeInTheDocument());
});

test('filter buttons change the list', async () => {
  renderPage();
  const list = screen.getByRole('list', { name: 'Publications' });
  expect(within(list).getAllByRole('listitem')).toHaveLength(filterPapers(papers, 'all').length);
  await userEvent.click(screen.getByRole('button', { name: 'Journal' }));
  expect(screen.getByRole('button', { name: 'Journal' })).toHaveAttribute('aria-pressed', 'true');
  expect(within(list).getAllByRole('listitem')).toHaveLength(filterPapers(papers, 'journal').length);
});

test('empty filter shows a message', async () => {
  renderPage();
  const empty = ['all', '2025', '2024', 'oral', 'award', 'journal'].find((f) => filterPapers(papers, f).length === 0);
  if (!empty) return;
  await userEvent.click(screen.getByRole('button', { name: new RegExp(`^${empty}$`, 'i') }));
  expect(screen.getByText(/no publications match/i)).toBeInTheDocument();
});

test('abstract toggle on featured card', async () => {
  renderPage();
  const [first] = screen.getAllByRole('button', { name: /abstract/i });
  await userEvent.click(first);
  expect(first).toHaveAttribute('aria-expanded', 'true');
});
```

- [ ] **Step 2: Run to verify failure**

Run: `npx vitest run src/pages/Research`
Expected: FAIL (placeholder has no featured cards).

- [ ] **Step 3: Implement `src/pages/Research/Authors.jsx`**

```jsx
import React from 'react';
import { isOwner } from '../../data/paperUtils';

export default function Authors({ authors }) {
  return (
    <p className="meta text-ink/55">
      {authors.map((a, i) => (
        <React.Fragment key={a}>
          <span className={isOwner(a) ? 'text-ink font-semibold' : ''}>{a}</span>
          {i < authors.length - 1 ? ', ' : ''}
        </React.Fragment>
      ))}
    </p>
  );
}
```

- [ ] **Step 4: Implement `src/pages/Research/PaperCard.jsx`**

```jsx
import React, { useId, useState } from 'react';
import Frame from '../../ui/Frame';
import AsciiField from '../../fx/AsciiField';
import Authors from './Authors';
import { ArrowUpRight } from '../../ui/icons';
import { badgesFor } from '../../data/paperUtils';

export function Badges({ paper }) {
  return (
    <p className="meta flex flex-wrap gap-x-2">
      {badgesFor(paper).map((b) => <span key={b.label} className={b.accent ? 'text-accent-ink' : ''}>[{b.label}]</span>)}
    </p>
  );
}

export function PaperLinks({ paper }) {
  return (
    <div className="flex gap-4">
      {paper.arxiv ? <a href={paper.arxiv} target="_blank" rel="noopener noreferrer" className="meta link inline-flex items-center gap-1">arXiv <ArrowUpRight width={12} height={12} /></a> : null}
      {paper.github ? <a href={paper.github} target="_blank" rel="noopener noreferrer" className="meta link inline-flex items-center gap-1">GitHub <ArrowUpRight width={12} height={12} /></a> : null}
    </div>
  );
}

export default function PaperCard({ paper, seed }) {
  const [hover, setHover] = useState(false);
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <Frame
      as="article"
      thick
      className="relative p-6 sm:p-8 flex flex-col gap-4 overflow-hidden"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div aria-hidden="true" className={`absolute right-0 bottom-0 w-48 h-28 pointer-events-none transition-opacity duration-500 ${hover ? 'opacity-100' : 'opacity-0'}`}>
        <AsciiField seed={seed} fontSize={10} color="--accent" fps={15} active={hover} />
      </div>
      <Badges paper={paper} />
      <h3 className="text-2xl sm:text-[1.7rem] font-extrabold leading-tight tracking-tight">{paper.title}</h3>
      <Authors authors={paper.authors} />
      <p className="text-ink/80 max-w-[55ch]">{paper.summary}</p>
      <div className="relative flex flex-wrap items-center gap-5 mt-auto pt-2">
        <PaperLinks paper={paper} />
        <button type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)} className="meta link">
          abstract {open ? '−' : '+'}
        </button>
      </div>
      <div id={id} hidden={!open} className="text-[15px] leading-relaxed text-ink/75 max-w-[65ch]">{paper.abstract}</div>
    </Frame>
  );
}
```

- [ ] **Step 5: Implement `src/pages/Research/PaperRow.jsx`**

```jsx
import React from 'react';
import Expandable from '../../ui/Expandable';
import Authors from './Authors';
import { Badges, PaperLinks } from './PaperCard';

export default function PaperRow({ paper }) {
  return (
    <li>
      <Expandable
        summary={(
          <div className="grid grid-cols-[3.5rem_1fr] sm:grid-cols-[4rem_1fr_9rem] gap-x-4 items-baseline">
            <span className="meta text-ink/55">{paper.year}</span>
            <span className="font-semibold leading-snug">{paper.title}</span>
            <span className="meta text-ink/55 hidden sm:block text-right">{paper.venue}</span>
          </div>
        )}
      >
        <div className="sm:ml-[5rem] grid gap-3 max-w-[70ch]">
          <Badges paper={paper} />
          <Authors authors={paper.authors} />
          <p className="text-[15px] leading-relaxed text-ink/75">{paper.abstract}</p>
          <PaperLinks paper={paper} />
        </div>
      </Expandable>
    </li>
  );
}
```

- [ ] **Step 6: Implement `src/pages/Research/PaperFilter.jsx`**

```jsx
import React from 'react';
import { PAPER_FILTERS } from '../../data/paperUtils';

export default function PaperFilter({ value, onChange }) {
  return (
    <div role="group" aria-label="Filter publications" className="flex flex-wrap gap-2">
      {PAPER_FILTERS.map((f) => (
        <button
          key={f.id}
          type="button"
          aria-pressed={value === f.id}
          onClick={() => onChange(f.id)}
          className={`meta h-9 px-3.5 rounded-full border-2 border-ink transition-colors ${value === f.id ? 'bg-ink text-paper' : 'hover:bg-ink/10'}`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
```

- [ ] **Step 7: Replace `src/pages/Research/Research.jsx`**

```jsx
import React, { useState } from 'react';
import AsciiField from '../../fx/AsciiField';
import DropCapHeading from '../../ui/DropCapHeading';
import Divider from '../../ui/Divider';
import PaperCard from './PaperCard';
import PaperRow from './PaperRow';
import PaperFilter from './PaperFilter';
import { ArrowUpRight } from '../../ui/icons';
import { papers } from '../../data/papers';
import { filterPapers, featuredPapers } from '../../data/paperUtils';
import { research } from '../../data/about';
import { links } from '../../data/site';

const ELSEWHERE = [
  { label: 'Google Scholar', href: links.scholar },
  { label: 'arXiv', href: links.arxiv },
  { label: 'GitHub', href: links.github },
  { label: 'CV', href: links.cv },
];

export default function Research() {
  const [filter, setFilter] = useState('all');
  const list = filterPapers(papers, filter);
  return (
    <>
      <section className="relative mx-auto max-w-6xl px-4 sm:px-8 pt-6">
        <div aria-hidden="true" className="absolute inset-x-4 sm:inset-x-8 top-0 h-full max-h-[22rem] opacity-60">
          <AsciiField seed={21} blobs={5} fontSize={13} alpha={0.35} fps={12} />
        </div>
        <DropCapHeading level={1} text="Research" caps={['zighead']} accentWord={0} className="relative text-[clamp(4rem,14vw,11rem)]" />
        <p className="relative mt-8 max-w-[52ch] text-xl leading-snug font-medium">{research.intro}</p>
        <p className="relative meta mt-5 text-ink/60">{research.topics.join(' · ')}</p>
      </section>

      <section aria-labelledby="featured" className="mx-auto max-w-6xl px-4 sm:px-8 mt-20">
        <h2 id="featured" className="meta mb-5">[featured]</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {featuredPapers(papers).map((p, i) => <PaperCard key={p.title} paper={p} seed={30 + i} />)}
        </div>
      </section>

      <Divider />

      <section aria-labelledby="all-work" className="mx-auto max-w-6xl px-4 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-5 mb-6">
          <DropCapHeading level={2} text="Publications" caps={['saint']} className="text-5xl sm:text-6xl" />
          <PaperFilter value={filter} onChange={setFilter} />
        </div>
        <span id="all-work" className="sr-only">All publications</span>
        <ul aria-label="Publications" className="border-t-2 border-ink">
          {list.map((p) => <PaperRow key={p.title} paper={p} />)}
        </ul>
        {list.length === 0 ? <p className="meta py-6 text-ink/55">No publications match this filter.</p> : null}
      </section>

      <section aria-label="Elsewhere" className="mx-auto max-w-6xl px-4 sm:px-8 mt-24 grid sm:grid-cols-2 gap-x-10">
        {ELSEWHERE.map((l) => (
          <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between border-b-2 border-ink py-4 text-2xl sm:text-3xl font-extrabold tracking-tight hover:text-accent-ink">
            {l.label} <ArrowUpRight width={22} height={22} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        ))}
      </section>
    </>
  );
}
```

- [ ] **Step 8: Run tests**

Run: `npx vitest run`
Expected: all PASS.

- [ ] **Step 9: Browser check** `/academia`: ASCII field drifts behind the giant "Research"; featured cards show vermilion ASCII in their corner on hover; filters animate rows; abstracts expand.

- [ ] **Step 10: Commit**

```bash
git add src/pages/Research
git commit -m "feat: build Research page with featured cards and filterable list"
```

---

### Task 14: Music page

**Files:**
- Create: `src/pages/Music/Fonkey.jsx`, `Productions.jsx`, `Commuz.jsx`, `Music.test.jsx`, `src/assets/fonkey.png`, `src/assets/commuz-title.svg`
- Modify: `src/pages/Music/Music.jsx`

**Interfaces:**
- Consumes: `music`, `fonkey`, `productions`, `commuz`, `Embed`, `youtubeEmbed`, `soundcloudEmbed`, `Expandable`, `DropCapHeading`, `DitherField`, `Divider`, icons.
- Produces: `<Music />`.

- [ ] **Step 1: Copy assets**

```bash
cp src/content/images/logo_countour.png src/assets/fonkey.png
cp src/content/images/Commuz_Titre.svg src/assets/commuz-title.svg
```

- [ ] **Step 2: Write failing tests `src/pages/Music/Music.test.jsx`**

```jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Music from './Music';
import { fonkey, commuz } from '../../data/music';

const renderPage = () => render(<MemoryRouter><Music /></MemoryRouter>);

test('h1 and no third-party iframes before interaction', () => {
  renderPage();
  expect(screen.getByRole('heading', { level: 1, name: 'Music' })).toBeInTheDocument();
  expect(document.querySelectorAll('iframe')).toHaveLength(0);
});

test('fonkey setlist switches the active track', async () => {
  renderPage();
  const second = screen.getByRole('button', { name: new RegExp(`^${fonkey.tracks[1].title}`) });
  await userEvent.click(second);
  expect(second).toHaveAttribute('aria-pressed', 'true');
  expect(screen.getByText(new RegExp(`${fonkey.tracks[1].original} cover`))).toBeInTheDocument();
});

test('fonkey next wraps around', async () => {
  renderPage();
  const next = screen.getByRole('button', { name: 'Next video' });
  for (let i = 0; i < fonkey.tracks.length; i++) await userEvent.click(next);
  expect(screen.getByRole('button', { name: new RegExp(`^${fonkey.tracks[0].title}`) })).toHaveAttribute('aria-pressed', 'true');
});

test('commuz year tabs show each play', async () => {
  renderPage();
  await userEvent.click(screen.getByRole('tab', { name: commuz.plays[3].year }));
  expect(screen.getByRole('heading', { level: 3, name: commuz.plays[3].title })).toBeInTheDocument();
});
```

- [ ] **Step 3: Run to verify failure**

Run: `npx vitest run src/pages/Music`
Expected: FAIL (placeholder).

- [ ] **Step 4: Implement `src/pages/Music/Fonkey.jsx`**

```jsx
import React, { useState } from 'react';
import DropCapHeading from '../../ui/DropCapHeading';
import Embed from '../../ui/Embed';
import { youtubeEmbed } from '../../ui/embeds';
import { ChevronLeft, ChevronRight, ArrowUpRight } from '../../ui/icons';
import { fonkey } from '../../data/music';
import logo from '../../assets/fonkey.png';

const square = 'brut brut-press h-10 w-10 rounded-xl bg-paper grid place-items-center';

export default function Fonkey() {
  const [active, setActive] = useState(0);
  const n = fonkey.tracks.length;
  const track = fonkey.tracks[active];
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-8">
      <DropCapHeading level={2} text={fonkey.name} caps={['zighead', 'saint']} className="text-5xl sm:text-7xl mb-10" />
      <div className="grid md:grid-cols-[1fr_17rem] gap-10">
        <div>
          <Embed key={track.url} src={youtubeEmbed(track.url)} title={`${track.title} by Fonkey Business`} href={track.url} seed={40 + active} />
          <div className="mt-4 flex items-center gap-3">
            <button type="button" aria-label="Previous video" className={square} onClick={() => setActive((i) => (i - 1 + n) % n)}><ChevronLeft /></button>
            <button type="button" aria-label="Next video" className={square} onClick={() => setActive((i) => (i + 1) % n)}><ChevronRight /></button>
            <p className="meta ml-2">
              <span className="text-ink/55">{String(active + 1).padStart(2, '0')}/{String(n).padStart(2, '0')}</span>{' '}
              {track.title} <span className="text-ink/55">({track.original} cover)</span>
            </p>
          </div>
          <p className="meta mt-2 text-ink/55">{fonkey.credit}</p>
        </div>
        <aside className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Fonkey Business logo" className="w-20 grayscale dark:invert" loading="lazy" />
            <p className="text-ink/75 leading-snug">{fonkey.blurb}</p>
          </div>
          <div className="flex gap-4">
            <a href={fonkey.spotify} target="_blank" rel="noopener noreferrer" className="meta link inline-flex items-center gap-1">Spotify <ArrowUpRight width={12} height={12} /></a>
            <a href={fonkey.instagram} target="_blank" rel="noopener noreferrer" className="meta link inline-flex items-center gap-1">Instagram <ArrowUpRight width={12} height={12} /></a>
          </div>
          <div>
            <h3 className="meta mb-2">[roles]</h3>
            <ul className="meta text-ink/75 space-y-0.5">{fonkey.roles.map((r) => <li key={r}>{r}</li>)}</ul>
          </div>
          <div>
            <h3 className="meta mb-2">[setlist]</h3>
            <ul className="border-t-2 border-ink">
              {fonkey.tracks.map((t, i) => (
                <li key={t.url}>
                  <button
                    type="button"
                    aria-pressed={i === active}
                    onClick={() => setActive(i)}
                    className={`w-full flex justify-between gap-3 py-2 border-b-2 border-ink text-left ${i === active ? 'text-accent-ink font-semibold' : 'hover:text-accent-ink'}`}
                  >
                    <span>{t.title}</span><span className="meta text-ink/55">{t.original}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Implement `src/pages/Music/Productions.jsx`**

```jsx
import React from 'react';
import DropCapHeading from '../../ui/DropCapHeading';
import Expandable from '../../ui/Expandable';
import Embed from '../../ui/Embed';
import { soundcloudEmbed } from '../../ui/embeds';
import { productions } from '../../data/music';

export default function Productions() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-8">
      <DropCapHeading level={2} text="Original productions" caps={['saint']} className="text-5xl sm:text-6xl mb-8" />
      <div className="border-t-2 border-ink">
        {productions.map((p, i) => (
          <Expandable
            key={p.url}
            summary={(
              <div className="grid grid-cols-[2.5rem_1fr] sm:grid-cols-[3rem_1fr_auto] gap-x-4 items-baseline">
                <span className="meta text-ink/55">{String(i + 1).padStart(2, '0')}</span>
                <span><span className="text-2xl font-extrabold tracking-tight">{p.title}</span> <span className="text-ink/60">{p.kind}</span></span>
                <span className="meta text-ink/55 col-start-2 sm:col-start-auto">{p.tags.join(' · ')}</span>
              </div>
            )}
          >
            <div className="sm:ml-[4rem] max-w-xl">
              <Embed src={soundcloudEmbed(p.url)} title={p.title} ratio="1/1" href={p.url} seed={50 + i} />
            </div>
          </Expandable>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Implement `src/pages/Music/Commuz.jsx`**

```jsx
import React, { useState } from 'react';
import Embed from '../../ui/Embed';
import { soundcloudEmbed } from '../../ui/embeds';
import { commuz } from '../../data/music';
import title from '../../assets/commuz-title.svg';

export default function Commuz() {
  const [year, setYear] = useState(commuz.plays[0].year);
  const play = commuz.plays.find((p) => p.year === year);
  const titleMask = { WebkitMaskImage: `url(${title})`, maskImage: `url(${title})`, WebkitMaskSize: 'contain', maskSize: 'contain', WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat' };
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-8">
      <h2 className="sr-only">Commuz' musical theatre: mixing and mastering</h2>
      <div aria-hidden="true" className="h-20 sm:h-28 w-full max-w-xl bg-ink" style={titleMask} />
      <p className="meta mt-4 text-ink/55">[mixing and mastering]</p>
      <div className="mt-8 grid md:grid-cols-2 gap-6 max-w-5xl text-lg">
        {commuz.intro.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}
      </div>

      <div className="mt-10 grid sm:grid-cols-2 gap-6 max-w-4xl">
        {commuz.featuredMixes.map((m, i) => (
          <div key={m.url}>
            <p className="meta mb-2">{m.title}</p>
            <Embed src={soundcloudEmbed(m.url)} title={`${m.title}, Commuz 2022 mix`} height={166} href={m.url} seed={60 + i} />
          </div>
        ))}
      </div>

      <div role="tablist" aria-label="Commuz years" className="mt-16 flex flex-wrap gap-2">
        {commuz.plays.map((p) => (
          <button
            key={p.year}
            type="button"
            role="tab"
            id={`commuz-${p.year}`}
            aria-selected={p.year === year}
            aria-controls="commuz-panel"
            onClick={() => setYear(p.year)}
            className={`brut brut-press h-10 px-4 rounded-xl meta ${p.year === year ? 'bg-ink text-paper' : 'bg-paper'}`}
          >
            {p.year}
          </button>
        ))}
      </div>
      <div role="tabpanel" id="commuz-panel" aria-labelledby={`commuz-${year}`} className="mt-8 grid md:grid-cols-[1fr_22rem] gap-10">
        <div>
          <h3 className="display text-4xl sm:text-5xl">{play.title}</h3>
          <p className="meta mt-3 text-ink/60">{play.roles.join(' · ')}</p>
          <p className="mt-5 text-lg max-w-[55ch]">{play.description}</p>
          <ol className="mt-6 meta grid grid-cols-2 gap-x-6 gap-y-1 max-w-md">
            {play.tracks.map((t, i) => <li key={t}><span className="text-ink/45">{String(i + 1).padStart(2, '0')}</span> {t}</li>)}
          </ol>
        </div>
        <Embed key={play.spotify} src={play.spotify} title={`${play.title} album`} height={352} seed={70} label="Load album" />
      </div>
    </section>
  );
}
```

- [ ] **Step 7: Replace `src/pages/Music/Music.jsx`**

```jsx
import React from 'react';
import DitherField from '../../fx/DitherField';
import DropCapHeading from '../../ui/DropCapHeading';
import Divider from '../../ui/Divider';
import Fonkey from './Fonkey';
import Productions from './Productions';
import Commuz from './Commuz';
import { music } from '../../data/music';

export default function Music() {
  return (
    <>
      <section className="relative mx-auto max-w-6xl px-4 sm:px-8 min-h-[52svh] flex flex-col justify-end">
        <div aria-hidden="true" className="absolute right-0 -top-6 w-[70vw] sm:w-[44vw] max-w-[520px] aspect-square blob-3">
          <DitherField seed={17} fg="--accent" cell={4} />
        </div>
        <DropCapHeading level={1} text="Music" caps={['zighead']} accentWord={0} className="relative text-[clamp(4.5rem,16vw,12rem)]" />
        <p className="relative mt-8 max-w-[44ch] text-xl font-medium leading-snug">{music.intro}</p>
      </section>
      <Divider />
      <Fonkey />
      <Divider />
      <Productions />
      <Divider />
      <Commuz />
    </>
  );
}
```

- [ ] **Step 8: Run tests**

Run: `npx vitest run`
Expected: all PASS.

- [ ] **Step 9: Browser check** `/music`: no network requests to youtube/soundcloud/spotify until a poster is clicked (devtools Network); Commuz title renders in ink and flips in dark mode.

- [ ] **Step 10: Commit**

```bash
git add src/pages/Music src/assets
git commit -m "feat: build Music page with click-to-load embeds"
```

---

### Task 15: Cleanup, e2e, performance pass

**Files:**
- Delete: listed in the File map "Deleted at the end" block; fonts `src/fonts/*.otf`, `src/fonts/*.ttf`
- Create: `playwright.config.mjs`, `e2e/site.spec.js`
- Modify: `package.json` (deps)

**Interfaces:**
- Consumes: the whole app.
- Produces: green unit + e2e suites, a build meeting size budgets, a Lighthouse report.

- [ ] **Step 1: Delete dead code and assets**

```bash
git rm -rq src/components src/utils src/hooks/useThemeToggle.js src/hooks/useMeshGradient.js \
  src/index.css src/App.css src/logo.svg src/Gradient.png src/Gradient2.png src/AcademiaGradient.png src/MusicGradient.png src/Gradient4.svg src/.DS_Store
git rm -q src/fonts/*.otf src/fonts/*.ttf
git rm -rq src/content/images
grep -rn "content/\|components/" src || echo "no stale imports"
```

Expected: `no stale imports`. Keep `src/content/education` and `src/content/experience` only if something imports them (`grep -rn "content/education\|content/experience" src`); otherwise `git rm -rq src/content`.

- [ ] **Step 2: Remove unused dependencies**

```bash
npm uninstall react-scripts web-vitals yarn @johnn-e/react-mesh-gradient framer-motion react-player react-icons formik yup react-swipeable tailwind-scrollbar prop-types
npx vitest run && npx vite build
```

Remove `"!./src/components/**"` from `tailwind.config.js` content. Expected: tests PASS, build OK.

- [ ] **Step 3: Check bundle budget**

Run: `npx vite build 2>&1 | grep -E "\.js|\.css"`
Expected: the entry `index-*.js` gzip ≤ 90 KB. If over, check for an accidentally eager import of a page (all pages must only be imported through `routes.js`).

- [ ] **Step 4: Install Playwright**

```bash
npm install --save-dev @playwright/test
npx playwright install chromium
```

- [ ] **Step 5: Create `playwright.config.mjs`**

```js
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'e2e',
  timeout: 30000,
  use: { baseURL: 'http://localhost:4173' },
  webServer: { command: 'npm run build && npx vite preview --port 4173 --strictPort', port: 4173, reuseExistingServer: true },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'phone', use: { ...devices['Pixel 7'], viewport: { width: 320, height: 640 } } },
  ],
});
```

- [ ] **Step 6: Write `e2e/site.spec.js`**

```js
import { test, expect } from '@playwright/test';

test('player plays through to about', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Play' }).click();
  await expect(page).toHaveURL(/\/about$/, { timeout: 6000 });
  await expect(page.getByRole('heading', { level: 1, name: 'Julien Guinot' })).toBeVisible();
});

test('nav moves between pages', async ({ page }) => {
  await page.goto('/about');
  const nav = page.getByRole('navigation', { name: 'Main' });
  await nav.getByRole('link', { name: 'Research' }).click();
  await expect(page.getByRole('heading', { level: 1, name: 'Research' })).toBeVisible();
  await nav.getByRole('link', { name: 'Music' }).click();
  await expect(page.getByRole('heading', { level: 1, name: 'Music' })).toBeVisible();
});

test('theme survives reload', async ({ page }) => {
  await page.goto('/about');
  const before = await page.evaluate(() => document.documentElement.classList.contains('dark'));
  await page.getByRole('button', { name: /switch to/i }).click();
  await page.reload();
  const after = await page.evaluate(() => document.documentElement.classList.contains('dark'));
  expect(after).toBe(!before);
});

test('publication filter', async ({ page }) => {
  await page.goto('/academia');
  await page.getByRole('button', { name: 'Journal' }).click();
  await expect(page.getByRole('list', { name: 'Publications' })).toContainText('TASLP');
});

test('contact validation messages', async ({ page }) => {
  await page.goto('/about#contact');
  await page.getByRole('button', { name: /send/i }).click();
  await expect(page.getByText('Required')).toHaveCount(2);
  await page.getByLabel('email').fill('nope');
  await page.getByRole('button', { name: /send/i }).click();
  await expect(page.getByText('Invalid email address')).toBeVisible();
});

for (const path of ['/', '/about', '/academia', '/music']) {
  test(`no horizontal scroll on ${path}`, async ({ page }) => {
    await page.goto(path);
    await page.waitForTimeout(300);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
}
```

- [ ] **Step 7: Run e2e**

Run: `npx playwright test`
Expected: all PASS on both projects. A phone failure on "no horizontal scroll" usually means a hero blob or a `text-[clamp…]` word wider than 320px: fix with `overflow-hidden` on the section or a smaller clamp minimum, then rerun.

- [ ] **Step 8: Lighthouse**

```bash
npx vite preview --port 4173 --strictPort &
sleep 2
for p in about academia music; do
  npx --yes lighthouse "http://localhost:4173/$p" --only-categories=performance,accessibility --quiet \
    --chrome-flags="--headless=new" --output=json --output-path="/tmp/lh-$p.json"
  node -e "const r=require('/tmp/lh-$p.json');console.log('$p',Object.fromEntries(Object.entries(r.categories).map(([k,v])=>[k,Math.round(v.score*100)])))"
done
kill %1
```

Expected: performance ≥ 95, accessibility 100 on each. For accessibility failures, read `audits` with `score === 0` in the JSON and fix them; for performance, the usual cause is the portrait or fonts: confirm the portrait is lazy and the hero has no large image.

- [ ] **Step 9: Full test run with coverage**

Run: `npx vitest run --coverage`
Expected: all PASS; statements ≥ 80% on `src/fx` (excluding `glRenderer.js`), `src/hooks`, `src/ui`, `src/data`, `src/pages`.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "chore: remove legacy code and deps, add e2e suite"
```

- [ ] **Step 11: Hand over for review** — run `npm start` and give the owner the local URL plus the list of copy changes (Task 9) and the artist-name correction. Do not push.
