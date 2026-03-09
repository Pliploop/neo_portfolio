# Refactor Design: Code Quality, Performance & Security
**Date**: 2026-03-09
**Scope**: Full sweep — security → performance → code quality → accessibility
**Stack**: React 18, Tailwind CSS, JavaScript (no TypeScript migration)

---

## 1. Security

- Move EmailJS credentials (`serviceId`, `templateId`, `publicKey`) to `.env.local` as `REACT_APP_EMAILJS_*` variables; commit `.env.example` documenting required vars
- Strip HTML tags from `name` and `message` fields in `ContactForm.js` before sending via emailjs (prevent script injection in email body)
- Wrap all `localStorage` reads/writes in `try/catch` across all components
- Add 30-second client-side cooldown between contact form submissions to reduce spam

---

## 2. Performance

- **Route-based code splitting**: Wrap `AboutPage`, `Academia`, `Music`, `Loading` in `React.lazy()` with `<Suspense>` fallback in `App.js`
- **`useMeshGradient()` hook**: Extract duplicated dynamic-import + lazy-render pattern shared by `AboutPage`, `Academia`, `Music` into one custom hook
- **`useThemeToggle()` hook**: Extract duplicated theme switching logic shared by `AboutPage`, `Music`, `Academia`, `header` into one custom hook
- **Dependency cleanup**: Remove `anime.js`, `emailjs-com`, `react-transition-group`; keep `framer-motion` as sole animation library
- **Font loading**: Add `font-display: swap` to all `@font-face` declarations in `index.css`
- **Migrate `Loading.js` animation**: Replace `anime.js` timeline with `framer-motion` equivalents

---

## 3. Code Quality

- **Extract data files** to `src/data/`:
  - `papers.js` — from `Academia.js`
  - `education.js` — from `EducationExperience.js`
  - `music.js` — from `Music.js` and `musicmixmaster.js`
- **Remove all `console.log` statements** (~15+ across `Loading.js`, `AboutPage.js`, `Music.js`, `Academia.js`, `ContactForm.js`, `musicmixmaster.js`, `contactfooter.js`)
- **Fix `ScrollToTop.js`**: Add missing `return null`
- **Fix `Loading.js` state mutation**: Replace direct `Liked` array mutation with `useState`
- **Fix carousel magic numbers** (`Music.js`): Derive bounds from actual array length instead of hardcoded `0`/`4`/`-1`
- **Remove `AnimationLayout`** from `App.js` (defined but never used)
- **"Coming Soon" stubs**: Replace empty `Blog.js`, `Projects.js`, `About.js` with minimal placeholder component
- **Tailwind config**: Add brand colors and repeated arbitrary values to `tailwind.config.js`

---

## 4. Accessibility

- Add descriptive `alt` text to all `<img>` elements
- Replace interactive `<div onClick>` elements with `<button>` elements throughout
- Add `role="tab"`, `role="tablist"`, `role="tabpanel"`, `aria-selected`, `aria-controls` to tab interfaces in `EducationExperience.js` and `Music.js`
- Add keyboard (arrow key) navigation to album carousel in `musicmixmaster.js`
- Link form validation errors to inputs via `aria-describedby` in `ContactForm.js`

---

## Out of Scope

- Visual/aesthetic redesign
- TypeScript migration
- CMS integration or API data fetching
- End-to-end tests
- Removing `Blog.js`, `Projects.js`, `About.js` stubs (kept for future use)
