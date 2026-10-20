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

const FADE_INNER = 0.18;
const FADE_OUTER = 0.5;

// 1 at the centre, easing to 0 at the edge circle: lets a field dissolve into the page.
export function radialFade(x, y) {
  const d = Math.hypot(x - 0.5, y - 0.5);
  const t = Math.min(1, Math.max(0, (d - FADE_INNER) / (FADE_OUTER - FADE_INNER)));
  return 1 - t * t * (3 - 2 * t);
}
