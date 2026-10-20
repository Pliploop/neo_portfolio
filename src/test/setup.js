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
