# Portfolio Refactor Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Refactor the neo_portfolio React app to fix security vulnerabilities, improve performance, and clean up code quality without changing the visual design.

**Architecture:** Security fixes first (credentials, sanitization, localStorage), then shared hooks extraction (theme, mesh gradient), then code splitting and dependency cleanup, then data extraction, then bug fixes, then accessibility.

**Tech Stack:** React 18, Tailwind CSS 3, framer-motion, emailjs (v4), react-router-dom v6, Formik + Yup

---

## Task 1: Security — EmailJS environment variables

**Files:**
- Create: `.env.local`
- Create: `.env.example`
- Modify: `src/components/About/ContactForm.js:6,32-36`

**Step 1: Create `.env.local`** (never commit this file)

```
REACT_APP_EMAILJS_SERVICE_ID=service_02y1b2a
REACT_APP_EMAILJS_TEMPLATE_ID=template_0lpcm0l
REACT_APP_EMAILJS_PUBLIC_KEY=QDMo21gqwu5H1QJj2
```

**Step 2: Create `.env.example`** (safe to commit)

```
REACT_APP_EMAILJS_SERVICE_ID=your_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key
```

**Step 3: Verify `.gitignore` already ignores `.env.local`**

Run: `grep env .gitignore`
Expected: `.env.local` or `.env*.local` is listed

**Step 4: Update `ContactForm.js`** — replace hardcoded values

Change line 6 import from `emailjs-com` → `@emailjs/browser` (wait — we uninstall emailjs-com in Task 7; for now just move credentials to env vars, keep the same import):

Replace lines 32-36:
```js
emailjs.send('service_02y1b2a', 'template_0lpcm0l', {
    from_name: name,
    reply_to: email,
    message: message,
  }, 'QDMo21gqwu5H1QJj2')
```
With:
```js
emailjs.send(
  process.env.REACT_APP_EMAILJS_SERVICE_ID,
  process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
  { from_name: name, reply_to: email, message: message },
  process.env.REACT_APP_EMAILJS_PUBLIC_KEY
)
```

**Step 5: Verify**

Run: `grep -r "service_02y1b2a\|QDMo21gqwu5H1QJj2\|template_0lpcm0l" src/`
Expected: no output (no hardcoded credentials in source)

**Step 6: Commit**

```bash
git add .env.example src/components/About/ContactForm.js
git commit -m "fix: move EmailJS credentials to environment variables"
```

---

## Task 2: Security — Input sanitization and form rate limiting

**Files:**
- Modify: `src/components/About/ContactForm.js`

**Step 1: Add `stripHtml` helper and cooldown state at top of component**

After the existing imports, add a helper function before the component:

```js
const stripHtml = (str) => str.replace(/<[^>]*>/g, '').trim();
```

Add inside `ContactForm` component, after existing state:
```js
const [lastSubmit, setLastSubmit] = useState(0);
const [cooldownMsg, setCooldownMsg] = useState('');
```

**Step 2: Update `onSubmit` handler** to sanitize and enforce cooldown

Replace the existing `onSubmit`:
```js
onSubmit: (values, { resetForm }) => {
  const now = Date.now();
  if (now - lastSubmit < 30000) {
    setCooldownMsg('Please wait 30 seconds before sending another message.');
    return;
  }
  const sanitized = {
    name: stripHtml(values.name),
    email: values.email,
    message: stripHtml(values.message),
  };
  setLastSubmit(now);
  setCooldownMsg('');
  sendEmail(sanitized);
  resetForm();
},
```

**Step 3: Remove `console.log(values)` from `onSubmit`** (line 23)

**Step 4: Display cooldown message** — add below the submit button:

```jsx
{cooldownMsg && (
  <p className="text-amber-500 text-sm mt-2" role="alert">{cooldownMsg}</p>
)}
```

**Step 5: Verify**

Start the app and try submitting the form twice quickly — second attempt should show the cooldown message.

**Step 6: Commit**

```bash
git add src/components/About/ContactForm.js
git commit -m "fix: sanitize contact form inputs and add submission rate limiting"
```

---

## Task 3: Security — Safe localStorage wrapper

**Files:**
- Create: `src/utils/storage.js`
- Modify: `src/components/Loading.js:47`
- Modify: `src/components/subcomponents/header.js:8,13`
- Modify: `src/components/AboutPage.js:28-36,49`
- Modify: `src/components/Music.js:22-31,43`
- Modify: `src/components/Academia.js` (wherever localStorage is accessed)

**Step 1: Create `src/utils/storage.js`**

```js
export const getTheme = () => {
  try {
    return localStorage.getItem('theme') ?? 'light';
  } catch {
    return 'light';
  }
};

export const setTheme = (value) => {
  try {
    localStorage.setItem('theme', value);
  } catch {
    // localStorage unavailable (private browsing, etc.)
  }
};
```

**Step 2: Replace all `localStorage.theme` reads/writes** in every file

Pattern to find: `grep -rn "localStorage.theme" src/`

In each file, replace:
- `localStorage.theme = "light"` → `setTheme('light')`
- `localStorage.theme = "dark"` → `setTheme('dark')`
- `localStorage.theme === "light"` → `getTheme() === 'light'`
- `localStorage.theme === "dark"` → `getTheme() === 'dark'`

Add `import { getTheme, setTheme } from '../utils/storage';` (adjust relative path per file) to each modified file.

**Step 3: Verify**

Run: `grep -rn "localStorage.theme" src/`
Expected: no output

**Step 4: Commit**

```bash
git add src/utils/storage.js src/components/Loading.js src/components/AboutPage.js src/components/Music.js src/components/Academia.js src/components/subcomponents/header.js
git commit -m "fix: wrap localStorage access in try/catch for private browsing safety"
```

---

## Task 4: Performance — `useThemeToggle` custom hook

**Files:**
- Create: `src/hooks/useThemeToggle.js`
- Modify: `src/components/subcomponents/header.js:6-17`
- Modify: `src/components/AboutPage.js:23,26-38`
- Modify: `src/components/Music.js:18,20-32`
- Modify: `src/components/Academia.js` (theme toggle logic)

**Step 1: Create `src/hooks/useThemeToggle.js`**

```js
import { useState, useEffect } from 'react';
import { getTheme, setTheme } from '../utils/storage';

export const useThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(getTheme() === 'dark');
  }, []);

  const toggle = () => {
    const element = document.body;
    if (getTheme() === 'light') {
      element.classList.add('dark');
      setTheme('dark');
      setIsDark(true);
    } else {
      element.classList.remove('dark');
      setTheme('light');
      setIsDark(false);
    }
  };

  return { isDark, toggle };
};
```

**Step 2: Update `header.js`**

Remove the `switchLightDark` function (lines 6-17) and `console.log` call.
Add import: `import { useThemeToggle } from '../../hooks/useThemeToggle';`
Inside component: `const { toggle } = useThemeToggle();`
Replace `onClick={switchLightDark}` with `onClick={toggle}`

**Step 3: Update `AboutPage.js`**

Remove `isDark` state, `switchLightDark` function, `setIsDark(localStorage.theme === 'dark')` call.
Add import: `import { useThemeToggle } from '../hooks/useThemeToggle';`
Inside component: `const { isDark, toggle } = useThemeToggle();`
Replace any `onClick={switchLightDark}` with `onClick={toggle}`

**Step 4: Update `Music.js`** — same pattern as AboutPage.js

**Step 5: Update `Academia.js`** — same pattern

**Step 6: Verify**

Run the app. Toggle light/dark mode on each page. State should persist on navigation.

**Step 7: Commit**

```bash
git add src/hooks/useThemeToggle.js src/components/subcomponents/header.js src/components/AboutPage.js src/components/Music.js src/components/Academia.js
git commit -m "refactor: extract useThemeToggle hook, remove duplicated theme logic"
```

---

## Task 5: Performance — `useMeshGradient` custom hook

**Files:**
- Create: `src/hooks/useMeshGradient.js`
- Modify: `src/components/AboutPage.js`
- Modify: `src/components/Music.js:16-17,47-61`
- Modify: `src/components/Academia.js`

**Step 1: Create `src/hooks/useMeshGradient.js`**

```js
import { useState, useEffect } from 'react';

export const useMeshGradient = () => {
  const [MeshGradientRenderer, setMeshGradientRenderer] = useState(null);
  const [showGradient, setShowGradient] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const mod = await import('@johnn-e/react-mesh-gradient');
        if (!cancelled) {
          setMeshGradientRenderer(() => mod.MeshGradientRenderer);
          setTimeout(() => setShowGradient(true), 100);
        }
      } catch {
        // gradient unavailable — page still works without it
      }
    };
    load();
    return () => { cancelled = true; };
  }, []);

  return { MeshGradientRenderer, showGradient };
};
```

**Step 2: Update `AboutPage.js`**

Remove `showGradient`, `MeshGradientRenderer` state and the `loadMeshGradient` useEffect.
Add import: `import { useMeshGradient } from '../hooks/useMeshGradient';`
Inside component: `const { MeshGradientRenderer, showGradient } = useMeshGradient();`

**Step 3: Update `Music.js`** — same pattern

**Step 4: Update `Academia.js`** — same pattern

**Step 5: Verify**

Load each page — gradient should fade in smoothly. Disabling JS modules should not crash the page.

**Step 6: Commit**

```bash
git add src/hooks/useMeshGradient.js src/components/AboutPage.js src/components/Music.js src/components/Academia.js
git commit -m "refactor: extract useMeshGradient hook, remove duplicated lazy-load logic"
```

---

## Task 6: Performance — Route-based code splitting

**Files:**
- Modify: `src/App.js:1-13,53-60`

**Step 1: Update `App.js`** — replace static imports with lazy imports

Replace lines 5-10:
```js
import Loader from './components/Loading';
import AboutPage from './components/AboutPage';
import Projects from './components/Projects';
import AcademiaSection from './components/Academia';
import MusicSection from './components/Music';
import Blog from './components/Blog';
```
With:
```js
const Loader = React.lazy(() => import('./components/Loading'));
const AboutPage = React.lazy(() => import('./components/AboutPage'));
const Projects = React.lazy(() => import('./components/Projects'));
const AcademiaSection = React.lazy(() => import('./components/Academia'));
const MusicSection = React.lazy(() => import('./components/Music'));
const Blog = React.lazy(() => import('./components/Blog'));
```

**Step 2: Wrap Routes in Suspense**

Wrap the `<Routes>` block:
```jsx
<React.Suspense fallback={<div className="h-screen w-screen bg-white dark:bg-gray-900" />}>
  <Routes>
    ...
  </Routes>
</React.Suspense>
```

**Step 3: Remove the unused `AnimationLayout` component** (lines 33-46) and its `pageVariants`/`pageTransition` constants (lines 15-31). Remove `{ Outlet }` from the react-router-dom import if it's no longer used.

**Step 4: Verify**

Run `npm run build` and check the output — you should see multiple chunk files instead of one large bundle. In the browser, opening Network tab and navigating between pages should show lazy chunks loading on demand.

**Step 5: Commit**

```bash
git add src/App.js
git commit -m "perf: add route-based code splitting with React.lazy and Suspense"
```

---

## Task 7: Performance — Remove unused dependencies

**Files:**
- Modify: `package.json`
- Modify: `src/components/Loading.js:3` (remove anime import — handled in Task 9)

**Step 1: Uninstall unused packages**

```bash
npm uninstall animejs emailjs-com react-transition-group
```

**Step 2: Verify `emailjs` (v4) is still installed**

Run: `grep '"emailjs"' package.json`
Expected: `"emailjs": "^4.0.3"` still present

**Step 3: Update `ContactForm.js`** — change import to use the v4 package

Replace:
```js
import emailjs from 'emailjs-com';
```
With:
```js
import emailjs from 'emailjs/browser';
```

**Step 4: Verify app still builds**

Run: `npm run build`
Expected: Build succeeds with no import errors.

**Step 5: Commit**

```bash
git add package.json package-lock.json src/components/About/ContactForm.js
git commit -m "perf: remove unused dependencies (animejs, emailjs-com, react-transition-group)"
```

---

## Task 8: Performance — Font `font-display: swap`

**Files:**
- Modify: `src/index.css:5-47`

**Step 1: Add `font-display: swap` to every `@font-face` block**

Also remove the duplicate `@font-face` for `poker` (declared twice at lines 23-25 and 32-34).

Each block should look like:
```css
@font-face {
  font-family: "mowera";
  src: url("fonts/mowera.regular.otf");
  font-display: swap;
}
```

Apply to: mowera, grande, gothic, poker (once), saint, swomun, zighead, helvetica.

**Step 2: Verify**

Run: `grep -c "font-display: swap" src/index.css`
Expected: `8` (one per unique font face)

Run: `grep -c 'font-family: "poker"' src/index.css`
Expected: `1` (duplicate removed)

**Step 3: Commit**

```bash
git add src/index.css
git commit -m "perf: add font-display: swap to @font-face, remove duplicate poker declaration"
```

---

## Task 9: Performance — Migrate `Loading.js` from anime.js to framer-motion

**Files:**
- Modify: `src/components/Loading.js`

This is the most complex task. The anime.js animations in Loading.js do three things:
1. **`playref`** — morphs SVG polygon points to animate play ▶ ↔ pause ⏸ icon
2. **`barref`** — animates the progress bar width from 0→100%, updating a time counter
3. **`prevnext`** (in `replies()`) — slides the song title text out, swaps it, slides in

We'll replace each with framer-motion equivalents. For (1), instead of morphing SVG points, we'll swap between the play and pause icons using `AnimatePresence`.

**Step 1: Remove anime.js import and refs**

Remove:
```js
import anime from "animejs";
import PropTypes from "prop-types"; // unused
```

Remove `playref` and `barref` refs entirely.

**Step 2: Add framer-motion imports**

```js
import { motion, AnimatePresence, useAnimate } from "framer-motion";
```

**Step 3: Replace `playref` animation — icon swap approach**

Instead of morphing SVG points, show play or pause icon based on `isplaying` state:

Remove the `playref` useEffect entirely (lines 52-167).

In the JSX where the play/pause SVG is rendered, replace with:
```jsx
<AnimatePresence mode="wait">
  {isplaying ? (
    <motion.span
      key="pause"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.6 }}
      transition={{ duration: 0.1 }}
    >
      <IoPauseSharp size={32} className="self-center dark:text-white" />
    </motion.span>
  ) : (
    <motion.span
      key="play"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.6 }}
      transition={{ duration: 0.1 }}
    >
      <IoPlaySharp size={32} className="self-center dark:text-white" />
    </motion.span>
  )}
</AnimatePresence>
```

**Step 4: Replace `barref` animation — progress bar**

Remove the `barref` useEffect entirely (lines 170-287).

Add state:
```js
const [barScope, barAnimate] = useAnimate();
const [isAnimatingBar, setIsAnimatingBar] = useState(false);
```

Replace `playanimation` function:
```js
function playanimation() {
  if (paused === false) {
    // Start/resume progress bar
    const duration = Math.floor(Math.random() * (ANIMATION_DURATION_MAX - ANIMATION_DURATION_MIN) + ANIMATION_DURATION_MIN) / 1000;
    setIsAnimatingBar(true);
    barAnimate(barScope.current, { width: '100%' }, {
      duration,
      ease: 'linear',
      onUpdate: (latest) => {
        const progress = parseFloat(latest) / 100;
        const time_seconds = Math.round(progress * musictime);
        const timestring = Math.floor(time_seconds / 60) + ':' + ('0' + (time_seconds % 60)).slice(-2);
        setProgressTime(timestring);
      },
      onComplete: () => {
        setIsTransitioning(true);
        setTimeout(() => navigate('/about'), 500);
      },
    });
    setisplaying(true);
  } else {
    // Pause/reset
    if (barScope.current) {
      barAnimate(barScope.current, { width: '0%' }, { duration: 0 });
    }
    setIsAnimatingBar(false);
    setisplaying(false);
    setProgressTime('0:00');
  }
}
```

In the JSX, add `ref={barScope}` to the progress bar element (`#bar #progress`).

**Step 5: Replace `replies()` animation — song title slide**

Remove the `prevnext` anime call from `replies()`.

Wrap the song title element in a `motion.div` and use a key-based re-mount to trigger the transition:
```jsx
<AnimatePresence mode="wait">
  <motion.div
    key={replyindex}
    id="songtitle"
    initial={{ opacity: 0, x: 30 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -30 }}
    transition={{ duration: 0.15, ease: 'easeInOut' }}
  >
    {data[replyindex - 1]}
  </motion.div>
</AnimatePresence>
```

Remove the `document.getElementById("songtitle").innerHTML = ...` line since the text is now rendered declaratively.

**Step 6: Reset logic in `replies()`**

Remove:
```js
playref.current.reset();
barref.current.reset();
```

Replace with:
```js
if (barScope.current) {
  barAnimate(barScope.current, { width: '0%' }, { duration: 0 });
}
setIsAnimatingBar(false);
setPaused(true);
setProgressTime('0:00');
```

**Step 7: Verify**

Load `localhost:3000`. Click play — progress bar should animate. Click skip — title should slide. Click pause — bar stops.

**Step 8: Commit**

```bash
git add src/components/Loading.js
git commit -m "perf: replace anime.js with framer-motion in Loading.js"
```

---

## Task 10: Code quality — Extract data to `src/data/`

**Files:**
- Create: `src/data/papers.js`
- Create: `src/data/education.js`
- Create: `src/data/music.js`
- Modify: `src/components/Academia.js`
- Modify: `src/components/About/EducationExperience.js`
- Modify: `src/components/Music.js`
- Modify: `src/components/Music/musicmixmaster.js`

**Step 1: Create `src/data/papers.js`**

Find the `papers` array in `Academia.js` (around line 167). Cut the entire array declaration and paste into:
```js
export const papers = [
  // ... paste array contents here
];
```

**Step 2: Update `Academia.js`** — import from data file

Replace the inline array with:
```js
import { papers } from '../data/papers';
```

**Step 3: Create `src/data/education.js`**

Find `jobtitles`, `educationtitles`, and related arrays in `EducationExperience.js` (lines 3-132). Extract them:
```js
export const jobtitles = [ ... ];
export const educationtitles = [ ... ];
// any other data arrays
```

**Step 4: Update `EducationExperience.js`** — import from data file

```js
import { jobtitles, educationtitles } from '../../data/education';
```

**Step 5: Create `src/data/music.js`**

Extract the `tracks` array from `Music.js` (lines 215-231) and album data from `musicmixmaster.js`:
```js
export const tracks = [
  { title: 'Oolala - Original Composition', url: '...', tags: [...] },
  { title: 'Aztecs - Original Composition', url: '...', tags: [...] },
  { title: 'LikeTHAT - Disco House', url: '...', tags: [...] },
];

export const albums = [
  { id: 1, spotifyUrl: 'https://open.spotify.com/embed/album/4boTthC3VNuTVeBVcmJAED?utm_source=generator' },
  { id: 2, spotifyUrl: 'https://open.spotify.com/embed/album/75UGY5R9yFlqCxhYB91CLB?utm_source=generator' },
  { id: 3, spotifyUrl: 'https://open.spotify.com/embed/album/4vHXsNBT0GHheB2SSNk7u1?utm_source=generator' },
  { id: 4, spotifyUrl: 'https://open.spotify.com/embed/album/6ymtsIOKfk6TsKiHoGssp5?utm_source=generator' },
];
```

**Step 6: Update `Music.js` and `musicmixmaster.js`** — import from data file

```js
import { tracks, albums } from '../../data/music'; // adjust path
```

In `musicmixmaster.js`, replace the hardcoded `AlbumEmbed` list with a map over `albums`:
```jsx
{albums.map((album) => (
  <AlbumEmbed
    key={album.id}
    link={album.spotifyUrl}
    currentalbum={currentalbum}
    albumid={album.id}
  />
))}
```

**Step 7: Verify**

Run the app. All three pages (Academia, About, Music) should display data correctly.

**Step 8: Commit**

```bash
git add src/data/ src/components/Academia.js src/components/About/EducationExperience.js src/components/Music.js src/components/Music/musicmixmaster.js
git commit -m "refactor: extract hardcoded data to src/data/ files"
```

---

## Task 11: Code quality — Remove all console.log statements

**Files:** Multiple — find all occurrences

**Step 1: Find all console.log calls**

Run: `grep -rn "console\.log\|console\.error" src/`

**Step 2: Remove every `console.log` call** from these files:
- `Loading.js` (line 47 in theme setup)
- `AboutPage.js` (lines 13, 37, 45)
- `Music.js` (lines 31, 39)
- `Academia.js` (lines 37, 137, 177, 184)
- `About/ContactForm.js` (lines 23, 38 — but keep line 39 `console.error` as it's error handling, or replace with silent failure)
- `subcomponents/contactfooter.js` (line 19)
- `Music/musicmixmaster.js` (line 167)
- `Music.js` MusicFeatured (lines 272-273)

**Note:** Keep `console.error` calls in catch blocks — those are legitimate error logging.

**Step 3: Verify**

Run: `grep -rn "console\.log" src/`
Expected: no output

**Step 4: Commit**

```bash
git add src/
git commit -m "fix: remove all console.log statements from production code"
```

---

## Task 12: Code quality — Bug fixes and dead code removal

**Files:**
- Modify: `src/components/subcomponents/scrolltotop.js`
- Modify: `src/components/Loading.js`
- Modify: `src/components/Music.js`
- Modify: `src/App.js`

**Step 1: Fix `ScrollToTop.js` — missing return**

Add `return null;` before the closing brace of the component:
```js
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};
```

**Step 2: Fix `Loading.js` — `Liked` state mutation**

Remove module-level:
```js
const Liked = Array(maxreplies).fill(false);
```

Add inside the `Loader` component:
```js
const [liked, setLiked] = useState(Array(maxreplies).fill(false));
```

Update `setlike()`:
```js
function setlike() {
  setLiked(prev => {
    const next = [...prev];
    next[replyindex - 1] = !next[replyindex - 1];
    return next;
  });
  setisLiked(prev => !prev);
}
```

Update the heart state check in `replies()`:
```js
setisLiked(liked[replyindex - 1]);
```

**Step 3: Fix `Music.js` — carousel magic numbers and off-by-one bug**

The `nexturl` function in `MusicFeatured` has `geturl` with cases 0-3 (4 items). The current code wraps backwards to `2` instead of `3`.

Add a constant above the function:
```js
const FONKEY_COUNT = 4; // number of Fonkey Business video tabs
```

Replace:
```js
if (tempactive === -1) { tempactive = 2; }
if (tempactive === 4) { tempactive = 0; }
```
With:
```js
if (tempactive < 0) { tempactive = FONKEY_COUNT - 1; }
if (tempactive >= FONKEY_COUNT) { tempactive = 0; }
```

**Step 4: Fix `musicmixmaster.js` — derive album count from data**

After Task 10, `albums` is imported. Replace magic number bounds in `changealbum`:
```js
if (tempalbum > albums.length) { tempalbum = albums.length; }
if (tempalbum < 1) { tempalbum = 1; }
```

**Step 5: Verify**

Load the music page. Click through Fonkey Business tabs — going backwards from the first tab should now correctly go to the last tab (was broken before).

**Step 6: Commit**

```bash
git add src/components/subcomponents/scrolltotop.js src/components/Loading.js src/components/Music.js src/components/Music/musicmixmaster.js
git commit -m "fix: missing return null in ScrollToTop, Liked mutation, carousel off-by-one"
```

---

## Task 13: Code quality — Coming Soon stubs

**Files:**
- Create: `src/components/ComingSoon.js`
- Modify: `src/components/Blog.js`
- Modify: `src/components/Projects.js`
- Modify: `src/components/About.js`

**Step 1: Create `src/components/ComingSoon.js`**

```jsx
import React from 'react';
import AllHeader from './subcomponents/header';

const ComingSoon = ({ pagename }) => (
  <div className="dark:bg-gray-900 dark:text-white min-h-screen lg:py-12 lg:px-32 p-6">
    <AllHeader pagename={pagename} hoveraccent="" clickaccent="" />
    <div className="flex flex-col items-center justify-center h-64">
      <p className="text-4xl font-bold mb-4">{pagename}</p>
      <p className="text-gray-500 dark:text-gray-400">Coming soon.</p>
    </div>
  </div>
);

export default ComingSoon;
```

**Step 2: Update `Blog.js`**

```jsx
import ComingSoon from './ComingSoon';
const Blog = () => <ComingSoon pagename="Blog" />;
export default Blog;
```

**Step 3: Update `Projects.js`**

```jsx
import ComingSoon from './ComingSoon';
const Projects = () => <ComingSoon pagename="Projects" />;
export default Projects;
```

**Step 4: Update `About.js`**

```jsx
import ComingSoon from './ComingSoon';
const About = () => <ComingSoon pagename="About" />;
export default About;
```

**Step 5: Verify**

Navigate to `/blog`, `/projects` — should render the Coming Soon UI instead of a blank page.

**Step 6: Commit**

```bash
git add src/components/ComingSoon.js src/components/Blog.js src/components/Projects.js src/components/About.js
git commit -m "feat: add Coming Soon placeholder for Blog, Projects, About stubs"
```

---

## Task 14: Code quality — Tailwind config brand colors

**Files:**
- Modify: `tailwind.config.js`

**Step 1: Identify recurring arbitrary color values**

Scan the codebase:
```bash
grep -rh "text-\[#\|bg-\[#\|border-\[#" src/ | sort | uniq -c | sort -rn | head -20
```

**Step 2: Add brand colors to `tailwind.config.js`**

Based on the scan, add commonly used colors. The project uses rose/orange accents. Add:
```js
extend: {
  colors: {
    brand: {
      rose: '#FEA4B0',
      orange: '#FECC96',
    },
  },
  fontFamily: { /* existing */ },
}
```

**Step 3: Replace arbitrary color classes** with named classes where applicable (e.g. `text-[#FEA4B0]` → `text-brand-rose`).

**Step 4: Commit**

```bash
git add tailwind.config.js src/
git commit -m "refactor: add brand colors to Tailwind config, replace arbitrary values"
```

---

## Task 15: Accessibility — Alt text and button elements

**Files:**
- Modify: `src/components/Loading.js`
- Modify: `src/components/Music.js`
- Modify: `src/components/Music/musicmixmaster.js`
- Modify: `src/components/subcomponents/header.js`
- Modify: `src/components/AboutPage.js`

**Step 1: Fix all `<img>` alt attributes**

Find all images: `grep -rn "<img" src/`

- `Loading.js` profile image: `alt="Profile photo"`
- `Music.js` logo: `alt="Julien Guinot logo"`
- `musicmixmaster.js` album covers: `alt="Album cover"`
- Any other images with empty or vague alt text

**Step 2: Replace interactive `<div onClick>` with `<button>`**

Find all click handlers on divs: `grep -rn "div.*onClick\|onClick.*div" src/`

For each interactive div that acts as a button:
```jsx
// Before
<div onClick={handler} className="...">...</div>

// After
<button onClick={handler} className="... cursor-pointer" type="button">...</button>
```

Key locations:
- `header.js`: navigation items, theme toggle, scroll-to-top — all `<div onClick>`
- `Music.js`: MusicFeatured skip buttons
- `musicmixmaster.js` carousel left/right arrows
- `AboutPage.js`: any clickable divs

**Step 3: Verify**

Tab through each page with keyboard only — all interactive elements should be reachable and activatable with Enter/Space.

**Step 4: Commit**

```bash
git add src/
git commit -m "fix: add descriptive alt text, replace interactive divs with button elements"
```

---

## Task 16: Accessibility — ARIA tab interfaces

**Files:**
- Modify: `src/components/About/EducationExperience.js`
- Modify: `src/components/Music.js`

**Step 1: Add ARIA to `EducationExperience.js` tab interface**

The tab list container:
```jsx
<div role="tablist" aria-label="Experience and Education">
```

Each tab button:
```jsx
<button
  role="tab"
  id={`tab-${index}`}
  aria-selected={activeTab === index}
  aria-controls={`panel-${index}`}
  ...
>
```

Each tab panel:
```jsx
<div
  role="tabpanel"
  id={`panel-${activeTab}`}
  aria-labelledby={`tab-${activeTab}`}
  ...
>
```

**Step 2: Add ARIA to `Music.js` tab interface** (Fonkey Business tabs)

Same pattern — `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`, `aria-controls`.

**Step 3: Verify**

Screen reader or browser accessibility inspector should announce tabs correctly.

**Step 4: Commit**

```bash
git add src/components/About/EducationExperience.js src/components/Music.js
git commit -m "fix: add ARIA roles and attributes to tab interfaces"
```

---

## Task 17: Accessibility — Keyboard navigation for album carousel

**Files:**
- Modify: `src/components/Music/musicmixmaster.js`

**Step 1: Add `onKeyDown` handler to the swipeable container**

```jsx
const handleKeyDown = (e) => {
  if (e.key === 'ArrowRight') changealbum(true);
  if (e.key === 'ArrowLeft') changealbum(false);
};
```

**Step 2: Apply to the container div**

```jsx
<div
  {...handlers}
  onKeyDown={handleKeyDown}
  tabIndex={0}
  role="region"
  aria-label="Album carousel"
  className="... focus:outline-none"
>
```

**Step 3: Verify**

Click the carousel area, then use left/right arrow keys — albums should change.

**Step 4: Commit**

```bash
git add src/components/Music/musicmixmaster.js
git commit -m "fix: add keyboard arrow navigation to album carousel"
```

---

## Task 18: Accessibility — Form error `aria-describedby`

**Files:**
- Modify: `src/components/About/ContactForm.js`

**Step 1: Link error messages to inputs via `aria-describedby`**

For each field, add `aria-describedby` to the input pointing to the error div's id:

```jsx
<input
  id="name"
  aria-describedby={formik.touched.name && formik.errors.name ? "name-error" : undefined}
  ...
/>
{formik.touched.name && formik.errors.name && (
  <div id="name-error" className="text-red-500 text-sm" role="alert">
    {formik.errors.name}
  </div>
)}
```

Apply the same pattern to `email` and `message` fields.

**Step 2: Verify**

Use a screen reader or browser accessibility tool — submitting with an invalid email should announce the error message.

**Step 3: Commit**

```bash
git add src/components/About/ContactForm.js
git commit -m "fix: link form validation errors to inputs via aria-describedby"
```

---

## Summary of all changes

| Task | Category | Impact |
|------|----------|--------|
| 1 | Security | Credentials out of source code |
| 2 | Security | Input sanitization, spam protection |
| 3 | Security | Safe localStorage access |
| 4 | Performance | Remove ~60 lines of duplicated theme code |
| 5 | Performance | Remove ~45 lines of duplicated gradient code |
| 6 | Performance | Split bundle by route — major load time win |
| 7 | Performance | Remove 3 unused packages |
| 8 | Performance | Eliminate FOIT on custom fonts |
| 9 | Performance | Remove anime.js, consolidate on framer-motion |
| 10 | Code quality | Separate data from UI logic |
| 11 | Code quality | Remove 15+ debug logs |
| 12 | Code quality | Fix 4 bugs (return null, mutation, off-by-one) |
| 13 | Code quality | Useful stubs instead of blank pages |
| 14 | Code quality | Consistent design tokens in Tailwind |
| 15 | Accessibility | Keyboard access to all interactive elements |
| 16 | Accessibility | Screen reader support for tabs |
| 17 | Accessibility | Keyboard navigation for carousel |
| 18 | Accessibility | Screen reader support for form errors |
