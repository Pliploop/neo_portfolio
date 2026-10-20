import React, { useEffect, useState } from 'react';
import { grainBits } from './grainBits';

const SIZE = 96;

function makeGrainUrl() {
  const c = document.createElement('canvas');
  c.width = c.height = SIZE;
  const ctx = c.getContext('2d');
  if (!ctx) return null;
  const bits = grainBits(SIZE, 11);
  const img = ctx.createImageData(SIZE, SIZE);
  bits.forEach((on, i) => { img.data[i * 4 + 3] = on ? 255 : 0; });
  ctx.putImageData(img, 0, 0);
  return c.toDataURL('image/png');
}

export default function Grain({ opacity = 0.014 }) {
  const [url, setUrl] = useState(null);
  useEffect(() => { setUrl(makeGrainUrl()); }, []);
  if (!url) return null;
  return (
    <div
      data-grain
      aria-hidden="true"
      className="fixed inset-0 z-[60] pointer-events-none bg-ink"
      style={{
        opacity,
        WebkitMaskImage: `url(${url})`, maskImage: `url(${url})`,
        WebkitMaskSize: `${SIZE}px`, maskSize: `${SIZE}px`,
        imageRendering: 'pixelated',
      }}
    />
  );
}
