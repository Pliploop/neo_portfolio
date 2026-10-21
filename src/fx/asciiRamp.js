import { blobPositions, fieldAt, radialFade } from './blobs';
import { repel } from './repel';

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

export function asciiFrame({ cols, rows, t, blobs, cellAspect = 0.55, ramp = RAMP, jitter = 0, fade = false, speed = 1, gain = 1, mouse = null }) {
  const positions = blobPositions(blobs, t * speed);
  const aspect = (cols * cellAspect) / rows;
  const step = Math.floor(t * SHIMMER_RATE);
  const lines = new Array(rows);
  for (let y = 0; y < rows; y++) {
    let line = '';
    for (let x = 0; x < cols; x++) {
      const nx = (x + 0.5) / cols;
      const ny = (y + 0.5) / rows;
      const r = repel(nx, ny, aspect, mouse);
      const v = gain * r.k * fieldAt(r.x, r.y, aspect, positions) * (fade ? radialFade(r.x, r.y) : 1);
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

// Four-point sparkle as a density field: a superellipse with exponent < 1 pinches a circle into
// a star. It breathes and wobbles over time so ASCII stars move like the blobs.
const STAR_EXP = 0.62;
const STAR_RADIUS = 0.48;
const STAR_BREATH = 0.1;
const STAR_WOBBLE = 0.18;

export function starAt(x, y, t, phase = 0) {
  const r = STAR_RADIUS * (1 + STAR_BREATH * Math.sin(t * 1.8 + phase));
  const a = STAR_WOBBLE * Math.sin(t * 0.7 + phase * 1.3);
  const dx = x - 0.5;
  const dy = y - 0.5;
  const ux = dx * Math.cos(a) - dy * Math.sin(a);
  const uy = dx * Math.sin(a) + dy * Math.cos(a);
  const d = (Math.abs(ux) ** STAR_EXP + Math.abs(uy) ** STAR_EXP) ** (1 / STAR_EXP);
  const v = Math.max(0, 1 - d / r);
  return Math.min(1, 1.4 * v ** 0.6);
}

export function starFrame({ cols, rows, t, ramp = RAMP, jitter = 0, mouse = null, phase = 0 }) {
  const step = Math.floor(t * SHIMMER_RATE);
  const lines = new Array(rows);
  for (let y = 0; y < rows; y++) {
    let line = '';
    for (let x = 0; x < cols; x++) {
      const r = repel((x + 0.5) / cols, (y + 0.5) / rows, 1, mouse);
      const v = r.k * starAt(r.x, r.y, t, phase);
      // Outside the star stays blank: noise only shimmers characters that are already there.
      line += v > 0.02 ? shimmerChar(v, x, y, step, jitter, ramp) : ' ';
    }
    lines[y] = line;
  }
  return lines;
}
