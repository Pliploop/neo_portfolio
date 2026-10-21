import { fieldAt, radialFade } from './blobs';
import { repel } from './repel';

// Slow luminance wave that runs through the dithered portrait.
export const WAVE_AMP = 0.07;
export function imageWave(nx, ny, t) {
  return WAVE_AMP * Math.sin(ny * 9 - t * 1.3 + nx * 3);
}

export function imageLuma(image, w, h, cover) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const ctx = c.getContext('2d');
  if (!ctx) return () => 0;
  const sx = cover.offset[0] * image.naturalWidth;
  const sy = cover.offset[1] * image.naturalHeight;
  ctx.drawImage(image, sx, sy, cover.scale[0] * image.naturalWidth, cover.scale[1] * image.naturalHeight, 0, 0, w, h);
  const d = ctx.getImageData(0, 0, w, h).data;
  return (x, y) => {
    const i = (y * w + x) * 4;
    return 1 - (0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2]) / 255;
  };
}

export function blobValue({ w, h, aspect, positions, gain, fade, mouse = null }) {
  return (x, y) => {
    const r = repel((x + 0.5) / w, (y + 0.5) / h, aspect, mouse);
    return gain * r.k * fieldAt(r.x, r.y, aspect, positions) * (fade ? radialFade(r.x, r.y) : 1);
  };
}

export function imageValue({ luma, w, h, contrast, t, wave = WAVE_AMP, mouse = null }) {
  return (x, y) => {
    const nx = (x + 0.5) / w; const ny = (y + 0.5) / h;
    const r = repel(nx, ny, w / h, mouse);
    const sx = Math.min(w - 1, Math.max(0, Math.floor(r.x * w)));
    const sy = Math.min(h - 1, Math.max(0, Math.floor(r.y * h)));
    const v = ((luma(sx, sy) - 0.5) * contrast + 0.5) * r.k + (wave / WAVE_AMP) * imageWave(nx, ny, t);
    return Math.min(1, Math.max(0, v));
  };
}
