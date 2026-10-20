import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useFxCanvas } from './useFxCanvas';
import { useCssColors } from '../hooks/useCssColors';
import { useImage } from '../hooks/useImage';
import { makeBlobs, blobPositions, fieldAt, radialFade } from './blobs';
import { coverTransform } from './cover';
import { renderDither, hasWebGL, PENDING } from './glRenderer';
import { ditherPixels } from './ditherCpu';

function imageLuma(image, w, h, cover) {
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

const NOISE_RATE = 10; // edge shimmer re-rolls per second
const PENDING_RETRY_MS = 60;

export default function DitherField({
  seed = 1, blobs = 5, cell = 2, gain = 0.85, fade = false, speed = 1, noise = 0.12, fg = '--accent', bg = '--paper',
  image = null, contrast = 1, fps = 24, active = true, className = '',
}) {
  const ref = useRef(null);
  const [fgRgb, bgRgb] = useCssColors([fg, bg]);
  const field = useMemo(() => makeBlobs(seed, blobs), [seed, blobs]);
  const img = useImage(image);
  const [gpu, setGpu] = useState(hasWebGL);
  const [retry, setRetry] = useState(0);
  const retryTimer = useRef(null);

  const draw = (t, size) => {
    const canvas = ref.current;
    if (!canvas) return;
    const w = Math.max(1, Math.ceil(size.width / cell));
    const h = Math.max(1, Math.ceil(size.height / cell));
    if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.imageSmoothingEnabled = false;
    const aspect = w / h;
    const isImage = Boolean(image);
    if (isImage && !img) return;
    const cover = isImage ? coverTransform(w, h, img.naturalWidth, img.naturalHeight) : null;
    const positions = isImage ? [] : blobPositions(field, t * speed);
    const gl = gpu && renderDither({
      width: w, height: h, mode: isImage ? 'image' : 'blobs', positions, aspect, image: img, cover, fg: fgRgb, bg: bgRgb, contrast, gain, fade, noise: isImage ? 0 : noise, step: Math.floor(t * NOISE_RATE),
    });
    if (gl === PENDING) {
      // Shader still compiling in the background: redraw shortly (static fields have no loop).
      if (!retryTimer.current) {
        retryTimer.current = setTimeout(() => { retryTimer.current = null; setRetry((n) => n + 1); }, PENDING_RETRY_MS);
      }
      return;
    }
    if (gl) { ctx.drawImage(gl, 0, 0); return; }
    if (gpu) setGpu(false);
    const valueAt = isImage
      ? (() => { const luma = imageLuma(img, w, h, cover); return (x, y) => Math.min(1, Math.max(0, (luma(x, y) - 0.5) * contrast + 0.5)); })()
      : (x, y) => {
        const nx = (x + 0.5) / w; const ny = (y + 0.5) / h;
        return gain * fieldAt(nx, ny, aspect, positions) * (fade ? radialFade(nx, ny) : 1);
      };
    ctx.putImageData(new ImageData(ditherPixels({ width: w, height: h, valueAt, fg: fgRgb, bg: bgRgb }), w, h), 0, 0);
  };

  useFxCanvas(ref, draw, {
    fps,
    animate: !image && gpu,
    active,
    deps: [fgRgb, bgRgb, img, cell, contrast, gain, fade, speed, noise, gpu, retry],
  });

  useEffect(() => () => clearTimeout(retryTimer.current), []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`block w-full h-full ${className}`}
      style={{ imageRendering: 'pixelated' }}
    />
  );
}
