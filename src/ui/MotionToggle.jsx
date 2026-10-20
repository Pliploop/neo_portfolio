import React from 'react';
import { useMotion } from '../hooks/useMotion';
import { Play, Pause } from './icons';

export default function MotionToggle() {
  const { paused, togglePaused } = useMotion();
  return (
    <button
      type="button"
      onClick={togglePaused}
      aria-pressed={paused}
      aria-label={paused ? 'Play animations' : 'Pause animations'}
      title={paused ? 'Play animations' : 'Pause animations'}
      className="dot-btn h-8 w-8 shrink-0"
    >
      {paused ? <Play width={11} height={11} /> : <Pause width={11} height={11} />}
    </button>
  );
}
