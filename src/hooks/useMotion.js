import { useCallback, useSyncExternalStore } from 'react';
import { useReducedMotion } from './useReducedMotion';

const KEY = 'motion';
const listeners = new Set();
let paused = readStored();

function readStored() {
  try {
    return localStorage.getItem(KEY) === 'paused';
  } catch {
    return false;
  }
}

function apply(next) {
  paused = next;
  document.documentElement.classList.toggle('motion-paused', next);
  try {
    localStorage.setItem(KEY, next ? 'paused' : 'on');
  } catch {
    // storage blocked: the choice still holds for this visit
  }
  listeners.forEach((fn) => fn());
}

function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function __resetMotion() {
  paused = readStored();
  listeners.forEach((fn) => fn());
}

// paused: the visitor stopped all decorative motion (nav button).
// calm: the OS asks for reduced motion, so effects run slower instead of freezing.
export function useMotion() {
  const isPaused = useSyncExternalStore(subscribe, () => paused);
  const calm = useReducedMotion();
  const togglePaused = useCallback(() => apply(!paused), []);
  return { paused: isPaused, calm, togglePaused };
}
