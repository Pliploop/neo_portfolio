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
