import React from 'react';

// Small hand-drawn marks: the "digital naive" layer. Decorative only.
const base = {
  fill: 'none', stroke: 'currentColor', strokeWidth: 1.4, strokeLinecap: 'round', strokeLinejoin: 'round',
  'aria-hidden': true, focusable: false,
};

export function Sparkle({ size = 18, className = '' }) {
  return (
    <svg {...base} width={size} height={size} viewBox="0 0 24 24" className={className}>
      <path d="M12 2.5c.7 4.6 2.6 7.3 8.8 9.6-6.1 2.4-8.2 5.1-8.9 9.4-.6-4.4-2.6-7.1-8.7-9.5 6.2-2.2 8.2-5 8.8-9.5z" />
    </svg>
  );
}

export function Squiggle({ width = 44, className = '' }) {
  return (
    <svg {...base} width={width} height={10} viewBox="0 0 44 10" className={className} preserveAspectRatio="none">
      <path d="M1.5 6.2c2.8-3.6 4.6 2.9 7.6-.2s4.7 3.3 7.6.1 4.9 3 7.8-.2 4.6 3.4 7.7.2 4.8 2.7 9.3-1" />
    </svg>
  );
}

export function Smile({ size = 18, className = '' }) {
  return (
    <svg {...base} width={size} height={size} viewBox="0 0 24 24" className={className}>
      <path d="M12.3 2.8c5.2.1 8.9 4 8.8 9.3-.1 5-4.1 9-9.2 8.9-5.1-.1-9-4.2-8.9-9.4.2-4.9 4.2-8.9 9.3-8.8z" />
      <path d="M8.6 9.6v.6M15.2 9.4v.6M8.2 14.2c2 2.3 5.6 2.4 7.7.1" />
    </svg>
  );
}

export function Asterisk({ size = 14, className = '' }) {
  return (
    <svg {...base} width={size} height={size} viewBox="0 0 24 24" className={className}>
      <path d="M12 3.2v17.4M4.6 7.6l14.9 8.7M19.3 7.4 4.8 16.4" />
    </svg>
  );
}
