import React, { lazy, Suspense } from 'react';

export const routes = [
  { path: '/', label: null, load: () => import('./pages/Player/Player.jsx') },
  { path: '/about', label: 'About', load: () => import('./pages/About/About.jsx') },
  { path: '/academia', label: 'Research', load: () => import('./pages/Research/Research.jsx') },
  { path: '/music', label: 'Music', load: () => import('./pages/Music/Music.jsx') },
];

export function makePreloader(table) {
  const loaded = new Map();
  const pending = new Map();
  function preload(path) {
    const route = table.find((r) => r.path === path);
    if (!route) return Promise.resolve();
    if (!pending.has(path)) {
      const p = route.load().then(
        (mod) => { loaded.set(path, mod.default); return mod; },
        (err) => { pending.delete(path); throw err; },
      );
      pending.set(path, p);
    }
    return pending.get(path);
  }
  return { preload, loaded };
}

const preloader = makePreloader(routes);
const { loaded } = preloader;
export const { preload } = preloader;

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
