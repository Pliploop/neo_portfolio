import React from 'react';
import { STEPS, formatTime } from './playerState';

export default function ProgressBar({ progress, total }) {
  const pct = (progress / STEPS) * 100;
  return (
    <div className="mt-5">
      <div
        role="progressbar"
        aria-label="Track progress"
        aria-valuemin={0}
        aria-valuemax={STEPS}
        aria-valuenow={progress}
        className="relative h-px bg-ink/20"
      >
        <span className="absolute inset-y-0 left-0 bg-ink" style={{ width: `${pct}%` }} />
        <span className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-accent" style={{ left: `${pct}%` }} />
      </div>
      <div className="meta flex justify-between mt-2.5 text-ink/60 tabular-nums">
        <span>{formatTime((progress / STEPS) * total)}</span>
        <span>{formatTime(total)}</span>
      </div>
    </div>
  );
}
