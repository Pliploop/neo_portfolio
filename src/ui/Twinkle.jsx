import React from 'react';
import AsciiField from '../fx/AsciiField';

// The hand-drawn sparkle, filled with a live ASCII field and traced with a thin outline.
// Plump four-point sparkle: gently concave sides leave room for the ASCII texture.
const STAR_PATH = 'M12 1C13.9 7.4 16.6 10.1 23 12C16.6 13.9 13.9 16.6 12 23C10.1 16.6 7.4 13.9 1 12C7.4 10.1 10.1 7.4 12 1Z';
const STAR_MASK = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='${STAR_PATH}'/></svg>")`;

export const STAR_SIZES = { xs: 15, sm: 26, md: 40, lg: 56 };
// No blank glyph: every cell inside the star carries a character.
const STAR_RAMP = '*#%@&8$';

const maskStyle = {
  WebkitMaskImage: STAR_MASK, maskImage: STAR_MASK,
  WebkitMaskSize: '100% 100%', maskSize: '100% 100%',
  WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat',
};

export default function Twinkle({ size = 'sm', className = '' }) {
  const px = STAR_SIZES[size] ?? STAR_SIZES.sm;
  const fontSize = Math.max(3, Math.round(px / 10));
  return (
    <span
      data-twinkle
      aria-hidden="true"
      className={`inline-grid shrink-0 align-middle text-accent pointer-events-none ${className}`}
      style={{ width: `${px}px`, height: `${px}px` }}
    >
      <span data-star-fill className="col-start-1 row-start-1 w-full h-full" style={maskStyle}>
        <AsciiField mode="wave" fontSize={fontSize} color="--accent" alpha={1} jitter={0.7} ramp={STAR_RAMP} fps={12} />
      </span>
      <svg viewBox="0 0 24 24" className="col-start-1 row-start-1 w-full h-full" fill="none" stroke="currentColor" strokeWidth={px < 20 ? 1.3 : 0.8} strokeLinejoin="round">
        <path d={STAR_PATH} />
      </svg>
    </span>
  );
}
