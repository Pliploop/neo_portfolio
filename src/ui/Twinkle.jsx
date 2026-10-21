import React, { useMemo } from 'react';
import AsciiField from '../fx/AsciiField';

export const STAR_SIZES = { xs: 18, sm: 40, md: 64, lg: 88 };

// A four-point star drawn purely in ASCII: dense at the core, thinning to nothing at the points.
// It breathes, wobbles, shimmers and parts around the pointer like the blobs.
export default function Twinkle({ size = 'sm', className = '' }) {
  const px = STAR_SIZES[size] ?? STAR_SIZES.sm;
  const fontSize = Math.max(3, Math.round(px / 10));
  const phase = useMemo(() => Math.random() * Math.PI * 2, []);
  return (
    <span
      data-twinkle
      aria-hidden="true"
      className={`inline-block shrink-0 align-middle pointer-events-none ${className}`}
      style={{ width: `${px}px`, height: `${px}px` }}
    >
      <AsciiField mode="star" fontSize={fontSize} color="--accent" alpha={1} jitter={0.3} speed={1.4} phase={phase} fps={14} />
    </span>
  );
}
