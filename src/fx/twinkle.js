import { subscribe } from './fxLoop';

// ASCII twinkle frames: a star that swells to a peak and fades back to a dot.
const SM = ['.', '.', '·', '+', '*', '+', '·', '.', ' ', ' '];
// Inline variant for badges: same rhythm, never blank.
const XS = ['·', '·', '+', '+', '*', '*', '+', '+', '·', '·'];
const MD = [
  '   \n . \n   ',
  '   \n · \n   ',
  ' . \n.+.\n . ',
  ' | \n-*-\n | ',
  " ' \n-*-\n . ",
  ' . \n.+.\n . ',
  '   \n · \n   ',
  '   \n . \n   ',
  '   \n   \n   ',
  '   \n . \n   ',
];

export const TWINKLE_STEPS = SM.length;
export const TWINKLE_PEAK = 4; // the brightest frame, used when motion is paused

export function twinkleFrame(size, step) {
  const frames = size === 'md' ? MD : size === 'xs' ? XS : SM;
  const i = ((Math.floor(step) % frames.length) + frames.length) % frames.length;
  return frames[i];
}

// One loop for every twinkle on the page: each writes its own text node, no React re-render.
const RATE = 7; // frames per second of the twinkle cycle
const stars = new Set();
let unsubscribe = null;

function tick(t) {
  stars.forEach((s) => {
    const next = twinkleFrame(s.size, t * RATE * s.speed + s.phase);
    if (s.el.textContent !== next) s.el.textContent = next;
  });
}

export function addTwinkle(star) {
  stars.add(star);
  if (!unsubscribe) unsubscribe = subscribe(tick, RATE * 2);
  return () => {
    stars.delete(star);
    if (!stars.size && unsubscribe) {
      unsubscribe();
      unsubscribe = null;
    }
  };
}
