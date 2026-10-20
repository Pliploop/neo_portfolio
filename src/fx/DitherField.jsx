import React, { useMemo, useRef, useState } from 'react';
import { useFxCanvas } from './useFxCanvas';
import { useCssColors } from '../hooks/useCssColors';
import { useImage } from '../hooks/useImage';
import { makeBlobs, blobPositions, fieldAt } from './blobs';
import { coverTransform } from './cover';
import { renderDither, hasWebGL } from './glRenderer';
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

export default function DitherField({
  seed = 1, blobs = 5, cell = 4, fg = '--accent', bg = '--paper',
  image = null, contrast = 1, fps = 24, active = true, className = '',
}) {
  const ref = useRef(null);
  const [fgRgb, bgRgb] = useCssColors([fg, bg]);
  const field = useMemo(() => makeBlobs(seed, blobs), [seed, blobs]);
  const img = useImage(image);
  const [gpu, setGpu] = useState(hasWebGL);

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
    const positions = isImage ? [] : blobPositions(field, t);
    const gl = gpu && renderDither({
      width: w, height: h, mode: isImage ? 'image' : 'blobs', positions, aspect, image: img, cover, fg: fgRgb, bg: bgRgb, contrast,
    });
    if (gl) { ctx.drawImage(gl, 0, 0); return; }
    if (gpu) setGpu(false);
    const valueAt = isImage
      ? (() => { const luma = imageLuma(img, w, h, cover); return (x, y) => Math.min(1, Math.max(0, (luma(x, y) - 0.5) * contrast + 0.5)); })()
      : (x, y) => fieldAt((x + 0.5) / w, (y + 0.5) / h, aspect, positions);
    ctx.putImageData(new ImageData(ditherPixels({ width: w, height: h, valueAt, fg: fgRgb, bg: bgRgb }), w, h), 0, 0);
  };

  useFxCanvas(ref, draw, {
    fps,
    animate: !image && gpu,
    active,
    deps: [fgRgb, bgRgb, img, cell, contrast, gpu],
  });

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`block w-full h-full ${className}`}
      style={{ imageRendering: 'pixelated' }}
    />
  );
}
