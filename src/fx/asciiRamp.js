import { blobPositions, fieldAt } from './blobs';

export const RAMP = ' .:-=+*#%@';
// Occasional stray glyphs: the "digital naive" flicker.
const GLINTS = '·+×*∙°';
const SHIMMER_RATE = 8; // noise re-rolls per second
const GLINT_CHANCE = 0.015;

export function rampChar(v, ramp = RAMP) {
  const c = Math.min(1, Math.max(0, v));
  return ramp[Math.min(ramp.length - 1, Math.floor(c * ramp.length))];
}

// Cheap integer hash noise per cell and time step, in [0,1).
export function cellNoise(x, y, step) {
  let h = Math.imul(x | 0, 374761393) ^ Math.imul(y | 0, 668265263) ^ Math.imul(step | 0, 2246822519);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
}

function shimmerChar(v, x, y, step, jitter, ramp) {
  if (!jitter) return rampChar(v, ramp);
  const n = cellNoise(x, y, step);
  if (v > 0.08 && n < GLINT_CHANCE) return GLINTS[Math.floor(cellNoise(y, x, step) * GLINTS.length)];
  return rampChar(v + (n - 0.5) * jitter, ramp);
}

export function asciiFrame({ cols, rows, t, blobs, cellAspect = 0.55, ramp = RAMP, jitter = 0 }) {
  const positions = blobPositions(blobs, t);
  const aspect = (cols * cellAspect) / rows;
  const step = Math.floor(t * SHIMMER_RATE);
  const lines = new Array(rows);
  for (let y = 0; y < rows; y++) {
    let line = '';
    for (let x = 0; x < cols; x++) {
      const v = fieldAt((x + 0.5) / cols, (y + 0.5) / rows, aspect, positions);
      line += shimmerChar(v, x, y, step, jitter, ramp);
    }
    lines[y] = line;
  }
  return lines;
}

export function waveFrame({ cols, rows, t, ramp = RAMP, jitter = 0 }) {
  const step = Math.floor(t * SHIMMER_RATE);
  const lines = new Array(rows);
  for (let y = 0; y < rows; y++) {
    let line = '';
    for (let x = 0; x < cols; x++) {
      const a = Math.sin(x * 0.18 - t * 1.6 + y * 0.9);
      const b = Math.sin(x * 0.05 + t * 0.7);
      line += shimmerChar(0.5 + 0.35 * a * (0.6 + 0.4 * b), x, y, step, jitter, ramp);
    }
    lines[y] = line;
  }
  return lines;
}
