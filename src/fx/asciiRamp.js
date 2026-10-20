import { blobPositions, fieldAt } from './blobs';

export const RAMP = ' .:-=+*#%@';

export function rampChar(v, ramp = RAMP) {
  const c = Math.min(1, Math.max(0, v));
  return ramp[Math.min(ramp.length - 1, Math.floor(c * ramp.length))];
}

export function asciiFrame({ cols, rows, t, blobs, cellAspect = 0.55, ramp = RAMP }) {
  const positions = blobPositions(blobs, t);
  const aspect = (cols * cellAspect) / rows;
  const lines = new Array(rows);
  for (let y = 0; y < rows; y++) {
    let line = '';
    for (let x = 0; x < cols; x++) {
      line += rampChar(fieldAt((x + 0.5) / cols, (y + 0.5) / rows, aspect, positions), ramp);
    }
    lines[y] = line;
  }
  return lines;
}

export function waveFrame({ cols, rows, t, ramp = RAMP }) {
  const lines = new Array(rows);
  for (let y = 0; y < rows; y++) {
    let line = '';
    for (let x = 0; x < cols; x++) {
      const a = Math.sin(x * 0.18 - t * 1.6 + y * 0.9);
      const b = Math.sin(x * 0.05 + t * 0.7);
      line += rampChar(0.5 + 0.35 * a * (0.6 + 0.4 * b), ramp);
    }
    lines[y] = line;
  }
  return lines;
}
