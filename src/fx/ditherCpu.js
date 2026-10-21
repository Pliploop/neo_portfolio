import { ditherBit } from './bayer';

export function ditherPixels({ width, height, valueAt, fg, bg, bgAlpha = 255 }) {
  const out = new Uint8ClampedArray(width * height * 4);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const on = ditherBit(valueAt(x, y), x, y);
      const c = on ? fg : bg;
      const i = (y * width + x) * 4;
      out[i] = c[0]; out[i + 1] = c[1]; out[i + 2] = c[2]; out[i + 3] = on ? 255 : bgAlpha;
    }
  }
  return out;
}
