import { bayerThreshold } from './bayer';

export function ditherMaskBits(level, n = 8) {
  const bits = [];
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) bits.push(level > bayerThreshold(x, y, n) ? 1 : 0);
  return bits;
}

export function installDitherMasks(levels = [0.2, 0.4, 0.6, 0.8], cell = 4) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 8 * cell;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const root = document.documentElement;
  levels.forEach((level, i) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#000';
    ditherMaskBits(level).forEach((on, k) => {
      if (on) ctx.fillRect((k % 8) * cell, Math.floor(k / 8) * cell, cell, cell);
    });
    root.style.setProperty(`--dither-${i + 1}`, `url(${canvas.toDataURL('image/png')})`);
  });
}
