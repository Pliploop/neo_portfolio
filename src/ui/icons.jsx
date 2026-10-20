import React from 'react';

const base = {
  width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
  strokeWidth: 2.5, strokeLinecap: 'square', strokeLinejoin: 'miter', 'aria-hidden': true, focusable: false,
};

const make = (paths) => function Icon(props) {
  return <svg {...base} {...props}>{paths}</svg>;
};

export const ArrowUpRight = make(<path d="M7 17 17 7M8 7h9v9" />);
export const ArrowDown = make(<path d="M12 4v15M6 13l6 6 6-6" />);
export const ChevronLeft = make(<path d="M15 5 8 12l7 7" />);
export const ChevronRight = make(<path d="m9 5 7 7-7 7" />);
export const SkipBack = make(<><path d="M6 5v14" /><path d="M19 5 9 12l10 7z" fill="currentColor" /></>);
export const SkipForward = make(<><path d="M18 5v14" /><path d="m5 5 10 7-10 7z" fill="currentColor" /></>);
export const Play = make(<path d="M7 4.5v15l12-7.5z" fill="currentColor" />);
export const Pause = make(<><path d="M7 5h3v14H7zM14 5h3v14h-3z" fill="currentColor" stroke="none" /></>);

export function Heart({ filled = false, ...props }) {
  return (
    <svg {...base} {...props}>
      <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" fill={filled ? 'currentColor' : 'none'} />
    </svg>
  );
}
