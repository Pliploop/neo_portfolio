import React, { useMemo, useRef } from 'react';
import { useFxCanvas } from './useFxCanvas';
import { useCssColors } from '../hooks/useCssColors';
import { makeBlobs } from './blobs';
import { asciiFrame, waveFrame, starFrame, RAMP } from './asciiRamp';
import { usePointerField } from '../hooks/usePointerField';
import { nextMouse } from './pointerStrength';

const LINE = 1.15;

export default function AsciiField({
  seed = 3, blobs = 4, mode = 'blobs', fontSize = 12, color = '--ink',
  alpha = 1, fps = 15, active = true, ramp = RAMP, jitter = 0.22, fade = false, speed = 1, gain = 1, phase = 0, className = '',
}) {
  const ref = useRef(null);
  const [rgb] = useCssColors([color]);
  const field = useMemo(() => makeBlobs(seed, blobs), [seed, blobs]);
  const pointer = usePointerField(ref);

  const draw = (t, size) => {
    const canvas = ref.current;
    const ctx = canvas && canvas.getContext('2d');
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const pw = Math.round(size.width * dpr);
    const ph = Math.round(size.height * dpr);
    if (canvas.width !== pw || canvas.height !== ph) { canvas.width = pw; canvas.height = ph; }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.font = `${fontSize}px "JetBrains Mono Variable", ui-monospace, monospace`;
    ctx.textBaseline = 'top';
    const charW = ctx.measureText('M').width || fontSize * 0.6;
    const lineH = fontSize * LINE;
    const cols = Math.max(1, Math.floor(size.width / charW));
    const rows = Math.max(1, Math.floor(size.height / lineH));
    const mouse = nextMouse(pointer);
    let lines;
    if (mode === 'wave') lines = waveFrame({ cols, rows, t, ramp, jitter });
    else if (mode === 'star') lines = starFrame({ cols, rows, t: t * speed, ramp, jitter, mouse, phase });
    else lines = asciiFrame({ cols, rows, t, blobs: field, cellAspect: charW / lineH, ramp, jitter, fade, speed, gain, mouse });
    ctx.clearRect(0, 0, size.width, size.height);
    ctx.fillStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`;
    for (let y = 0; y < lines.length; y++) ctx.fillText(lines[y], 0, y * lineH);
  };

  useFxCanvas(ref, draw, { fps, active, deps: [rgb, fontSize, mode, alpha, jitter, fade, speed, gain, phase] });

  return <canvas ref={ref} aria-hidden="true" className={`block w-full h-full ${className}`} />;
}
