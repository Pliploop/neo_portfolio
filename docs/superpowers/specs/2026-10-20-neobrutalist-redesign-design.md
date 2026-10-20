# Neobrutalist redesign — design spec

Date: 2026-10-20
Branch: `redesign`
Status: approved in conversation, pending written review

## Goal

Full revamp of julienguinot.com. Same content, far less clutter, graphic-design oriented.
Neobrutalist structure, one accent colour, rounded organic shapes, digital (ordered/Bayer)
dither, grain and animated ASCII. Sleek, minimal, fast. Developed locally; nothing is pushed
or deployed until the owner approves.

### Success criteria

- Every fact currently rendered on About, Research and Music is still present.
- Palette is exactly paper / ink / vermilion (plus opacity of ink/paper).
- No glass/blur, soft shadows, gradient buttons, tag-pill clouds, or uppercase eyebrow labels.
- Copy contains no em-dash asides or stock phrasing ("fascinated by", "at the intersection of",
  "passionate", "journey"). Short declarative sentences.
- Lighthouse mobile: Performance ≥ 95, Accessibility = 100.
- Initial JS ≤ 90 KB gzipped; routes code-split.
- Effects pause offscreen and are static under `prefers-reduced-motion`.

### Non-goals

- Projects and Blog pages (removed from nav until they exist).
- New content. Copy is rewritten, never extended with invented facts.
- CMS, i18n, analytics.

## 1. Visual system

### Colour tokens (`src/styles/tokens.css`)

| token      | light     | dark      |
|------------|-----------|-----------|
| `--paper`  | `#EFEBE3` | `#141414` |
| `--ink`    | `#141414` | `#EFEBE3` |
| `--accent` | `#FF4A1C` | `#FF4A1C` |
| `--muted`  | ink @ 55% | paper @ 55% |

Dark mode is the inversion, toggled by a `.dark` class on `<html>`, persisted in
`localStorage` (wrapped in try/catch), defaulting to `prefers-color-scheme`. Applied before
first paint by an inline script in `index.html` to avoid a flash.

Accent budget: at most one or two uses per viewport (active nav, a hover, some drop-caps,
one dither field).

### Shape language

- Ink borders: 2px default, 3px on primary objects (player, featured cards, footer).
- Hard shadow `4px 4px 0 var(--ink)`, no blur. Press/hover: translate 2px, shadow 2px.
- Radius 24px on cards, full pill on buttons/nav.
- Dither fields always sit inside organic SVG blob masks, never plain rectangles.

### Type

- Display: Archivo Black, up to ~12vw on heroes, tracking −0.04em, leading 0.9.
- Body: Archivo 400/500, 17px, max ~60ch.
- Meta: JetBrains Mono 12–13px. Badges are bracketed text: `[ISMIR 2025] [ORAL]`.
- Drop-caps: Zighead / Saint on the first letter of page titles and section headings only,
  some in vermilion.
- All fonts self-hosted woff2, `font-display: swap`, Archivo Black + Archivo 400 preloaded.
  Zighead and Saint converted to woff2. All other font files deleted.

### Texture

- **Grain:** fixed full-page static 1-bit noise layer, very low opacity, no animation.
- **DitherField:** animated simplex-noise blobs → 8×8 Bayer ordered threshold → two colours
  (from CSS vars). Uses: player cover, page hero blobs, profile photo (dithered image,
  real photo revealed on hover).
- **AsciiField:** Canvas 2D grid of JetBrains Mono glyphs; cell brightness from the same
  noise, mapped through ramp ` .:-=+*#%@`. ~15–20 fps. Uses: section dividers (3-row
  travelling wave), behind page titles, hover reveal in featured paper cards, footer top edge.
- Motion is slow and low amplitude.

## 2. Pages

### Shared shell

- **Nav:** single bordered pill, fixed top. Mono name left · `About  Research  Music` ·
  square theme switch. Active item = vermilion fill. Mobile: same pill, compact.
- **Footer:** big ink-bordered block, AsciiField wave on top edge, large Archivo links:
  email, LinkedIn, GitHub, Scholar, CV.
- **Divider:** 3-row AsciiField strip.
- **Route transition:** ~300ms 1-bit dither wipe via View Transitions API; instant
  switch where unsupported or under reduced motion.

### `/` — Player

- One centred object, 3px border, 24px radius, hard shadow.
- Cover: DitherField (ink + vermilion); while playing it crossfades into an AsciiField of the
  same noise.
- `JULIEN GUINOT` in Archivo Black; current line in mono (same line sequence as today);
  stepped/blocky progress bar; prev / play / next / like as square bordered buttons.
- On track end → navigate to `/about` (unchanged). Add a mono `skip →` link.

### `/about`

1. **Hero:** name huge on two lines, J/G drop-caps (one vermilion). One sentence:
   "PhD researcher at QMUL and Universal Music Group, working on music representation
   learning. Also a musician, producer and mixing engineer." Pill buttons `Research`,
   `Music`; text links `CV`, `Contact`. Dither blob behind the right side.
2. **Bio:** two short paragraphs (current facts, plainer). Photo dithered to 1-bit in a blob
   mask, real photo on hover.
3. **Now:** bordered box, mono lines: role, institutions, supervisors, focus areas.
4. **Skills:** existing marquee recast as a mono strip between two ink rules.
5. **Education / Experience:** two square tabs; list rows `dates | role | institution`,
   click to expand description in place.
6. **Contact:** bordered inputs with hard shadows. Same EmailJS send; validation rewritten
   without Formik/Yup.

### `/academia` — Research

- Hero: `Research` with drop-cap, AsciiField behind, one line on the thesis topic.
- Featured papers (`featured: true`): large bordered cards. Title Archivo; authors mono, owner
  in ink, others muted; badges in brackets, only awards in vermilion; `arXiv ↗  GitHub ↗`;
  `Abstract +` toggle; ASCII texture appears in a card corner on hover.
- All papers: mono toggle filter row (All / 2025 / 2024 / Oral / Award / Journal); compact
  list rows (year · title · venue), expandable.
- Links block: Scholar / arXiv / GitHub / CV as large text links.

### `/music`

- Hero: `Music` with drop-cap, one intro line, dither blob.
- **Fonkey:** bordered video frame with square prev/next, roles and setlist as mono lists,
  Spotify / Instagram links.
- **Original productions:** numbered rows (`01  Oolala, original composition`), role tags in
  mono, expand to SoundCloud embed.
- **Commuz mix & mastering:** album embeds in bordered frames, grid; Commuz title SVG
  recoloured to ink (`currentColor`).
- All embeds are click-to-load posters; no third-party JS until requested.

### Copy rules

No em-dash asides, no stock phrasing, short declarative sentences, every fact kept, nothing
embellished. Rewritten copy lives in `src/data/` and is presented to the owner for review.

## 3. Architecture

### Stack

- CRA → **Vite** (React 18, React Router 6, Tailwind 3 retained). Scripts `start`, `build`,
  `preview`, `test`, `e2e`. Netlify `_redirects` kept in `public/`.
- Dependencies removed: `@johnn-e/react-mesh-gradient`, `framer-motion`, `react-player`,
  `react-icons`, `formik`, `yup`, `react-swipeable`, `tailwind-scrollbar`, `web-vitals`,
  `yarn`, `react-scripts`.
- Kept: `react`, `react-dom`, `react-router-dom`, `@emailjs/browser`. `prop-types` dropped.
- EmailJS keys keep their existing `REACT_APP_EMAILJS_*` names (`.env.local` locally, Netlify
  env in prod). Vite config sets `envPrefix: ['VITE_', 'REACT_APP_']` and the form reads
  `import.meta.env`, so no deploy-side config changes.

### File layout

```
src/
  main.jsx  App.jsx
  styles/   tokens.css  base.css  fonts.css
  fx/       noise.js  bayer.js  asciiRamp.js       pure functions, unit tested
            fxLoop.js                               shared rAF scheduler
            glRenderer.js                           single offscreen WebGL context
            DitherField.jsx  AsciiField.jsx  Grain.jsx
  ui/       Nav  Footer  Button  Frame  Divider  DropCapHeading  Embed  Expandable
            ThemeToggle  icons.jsx
  pages/    Player  About  Research  Music  (+ page-local subcomponents)
  hooks/    useTheme  useInView  useReducedMotion
  data/     papers  education  music  site
```

Files ≤ ~200 lines. Pages contain layout only; copy and lists come from `data/`.

### Effects engine

- `fxLoop`: one `requestAnimationFrame` loop. Fields register a draw callback plus a target
  fps; unregistered when unmounted or out of view (IntersectionObserver).
- `glRenderer`: one WebGL context on an offscreen canvas. Each visible DitherField sets
  uniforms (time, seed, scale, colours, pixel size), renders at its own size, and blits into
  its own 2D canvas via `drawImage`. Avoids the browser's ~16 active-context limit.
- Pixel size is fixed in CSS pixels (dither cells stay crisp, `image-rendering: pixelated`);
  DPR handled explicitly.
- Fallback: no WebGL → static pre-rendered dither PNG. Reduced motion → single frame drawn
  at t=0, loop not registered.
- Colours read from computed CSS vars; re-read on theme change (MutationObserver on `<html>`
  class).

### Error handling

- WebGL context creation/loss handled (fallback image; `webglcontextlost` listener).
- EmailJS send: explicit pending / success / error states with a user-facing message.
- Embeds: if iframe fails, the poster stays with a direct external link.
- localStorage access wrapped in try/catch.

### Accessibility

- All fx canvases `aria-hidden`; decorative.
- Semantic landmarks, one `h1` per page, visible focus ring (3px accent outline).
- Expandables are `<button aria-expanded>` controlling a region.
- Contrast: ink on paper, paper on ink; vermilion never used for body text on paper.
- Full keyboard operation of the player.

## 4. Testing

- **Vitest + Testing Library** (unit/integration): Bayer matrix values and thresholding,
  ascii ramp mapping, noise determinism, paper filter logic, contact validation, Expandable,
  theme toggle + persistence, Player state machine (play/pause/skip/like/end → navigate).
  Target ≥ 80% coverage on `fx/` pure modules, `hooks/`, `data` helpers, and `ui/`.
- **Playwright** (e2e): player → play → `/about`; nav across all pages; theme survives
  reload; paper filter; contact form validation errors; mobile viewport pass.
- Manual visual review in the browser at each milestone.

## 5. Delivery

Work on `redesign`, local `npm start`. Owner reviews in browser at milestones (fx engine +
tokens, Player, About, Research, Music, polish). Push/deploy only on explicit approval.
