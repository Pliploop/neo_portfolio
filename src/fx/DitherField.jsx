import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useFxCanvas } from './useFxCanvas';
import { useCssColors } from '../hooks/useCssColors';
import { useImage } from '../hooks/useImage';
import { makeBlobs, blobPositions } from './blobs';
import { coverTransform } from './cover';
import { renderDither, hasWebGL, PENDING } from './glRenderer';
import { ditherPixels } from './ditherCpu';
import { imageLuma, blobValue, imageValue, WAVE_AMP } from './cpuField';
import { usePointerField } from '../hooks/usePointerField';
import { nextMouse } from './pointerStrength';

const NOISE_RATE = 10; // edge shimmer re-rolls per second
const PENDING_RETRY_MS = 60;
const CPU_FPS = 10;
const CPU_FRAME_BUDGET_MS = 12;
const CPU_SLOW_FRAMES = 3;
const CPU_START_DELAY_MS = 1200; // keep CPU animation out of the page-load window

export default function DitherField({
  seed = 1, blobs = 5, cell = 2, gain = 0.85, fade = false, speed = 1, noise = 0.12, fg = '--accent', bg = '--paper',
  image = null, contrast = 1, wave = WAVE_AMP, transparent = false, fps = 24, active = true, className = '',
}) {
  const ref = useRef(null);
  const [fgRgb, bgRgb] = useCssColors([fg, bg]);
  const field = useMemo(() => makeBlobs(seed, blobs), [seed, blobs]);
  const img = useImage(image);
  const [gpu, setGpu] = useState(hasWebGL);
  const [cpuTooSlow, setCpuTooSlow] = useState(false);
  const [cpuReady, setCpuReady] = useState(false);
  const [retry, setRetry] = useState(0);
  const retryTimer = useRef(null);
  const slowFrames = useRef(0);
  const lumaCache = useRef({ key: null, fn: null });
  const pointer = usePointerField(ref);

  const lumaFor = (w, h, cover) => {
    const key = `${img.src}|${w}x${h}`;
    if (lumaCache.current.key !== key) lumaCache.current = { key, fn: imageLuma(img, w, h, cover) };
    return lumaCache.current.fn;
  };

  const drawCpu = (ctx, { w, h, aspect, positions, cover, t, mouse }) => {
    const start = performance.now();
    const valueAt = image
      ? imageValue({ luma: lumaFor(w, h, cover), w, h, contrast, t, wave, mouse })
      : blobValue({ w, h, aspect, positions, gain, fade, mouse });
    ctx.putImageData(new ImageData(ditherPixels({ width: w, height: h, valueAt, fg: fgRgb, bg: bgRgb, bgAlpha: transparent ? 0 : 255 }), w, h), 0, 0);
    // Weak devices protect themselves: a few slow frames in a row and the field goes still.
    slowFrames.current = performance.now() - start > CPU_FRAME_BUDGET_MS ? slowFrames.current + 1 : 0;
    if (slowFrames.current >= CPU_SLOW_FRAMES) setCpuTooSlow(true);
  };

  const draw = (t, size) => {
    const canvas = ref.current;
    if (!canvas) return;
    const w = Math.max(1, Math.ceil(size.width / cell));
    const h = Math.max(1, Math.ceil(size.height / cell));
    if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.imageSmoothingEnabled = false;
    if (image && !img) return;
    const aspect = w / h;
    const cover = image ? coverTransform(w, h, img.naturalWidth, img.naturalHeight) : null;
    const positions = image ? [] : blobPositions(field, t * speed);
    const mouse = nextMouse(pointer);
    const gl = gpu && renderDither({
      width: w, height: h, mode: image ? 'image' : 'blobs', positions, aspect, image: img, cover,
      fg: fgRgb, bg: bgRgb, contrast, gain, fade, noise: image ? noise * 0.5 : noise,
      step: Math.floor(t * NOISE_RATE), time: t, wave, mouse, transparent,
    });
    if (gl === PENDING) {
      // Shader still compiling in the background: redraw shortly (static fields have no loop).
      if (!retryTimer.current) {
        retryTimer.current = setTimeout(() => { retryTimer.current = null; setRetry((n) => n + 1); }, PENDING_RETRY_MS);
      }
      return;
    }
    if (gl) {
      if (transparent) ctx.clearRect(0, 0, w, h);
      ctx.drawImage(gl, 0, 0);
      return;
    }
    if (gpu) setGpu(false);
    drawCpu(ctx, { w, h, aspect, positions, cover, t, mouse });
  };

  useFxCanvas(ref, draw, {
    fps: gpu ? fps : Math.min(fps, CPU_FPS),
    animate: gpu || (cpuReady && !cpuTooSlow),
    active,
    deps: [fgRgb, bgRgb, img, cell, contrast, wave, transparent, gain, fade, speed, noise, gpu, cpuReady, cpuTooSlow, retry],
  });

  useEffect(() => () => clearTimeout(retryTimer.current), []);

  useEffect(() => {
    if (gpu) return undefined;
    const start = () => setCpuReady(true);
    const id = setTimeout(() => {
      if (typeof window.requestIdleCallback === 'function') window.requestIdleCallback(start, { timeout: 1000 });
      else start();
    }, CPU_START_DELAY_MS);
    return () => clearTimeout(id);
  }, [gpu]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`block w-full h-full ${className}`}
      style={{ imageRendering: 'pixelated' }}
    />
  );
}
