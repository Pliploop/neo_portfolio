import React from 'react';
import { STEPS, formatTime } from './playerState';

const BLOCKS = 24;

export default function ProgressBar({ progress, total }) {
  const filled = Math.round((progress / STEPS) * BLOCKS);
  return (
    <div className="mt-5">
      <div
        role="progressbar"
        aria-label="Track progress"
        aria-valuemin={0}
        aria-valuemax={STEPS}
        aria-valuenow={progress}
        className="flex gap-[3px] h-4 p-[3px] border-2 border-ink rounded-full"
      >
        {Array.from({ length: BLOCKS }, (_, i) => (
          <span key={i} className={`flex-1 rounded-[2px] ${i < filled ? 'bg-ink' : ''}`} />
        ))}
      </div>
      <div className="meta flex justify-between mt-1.5 text-ink/60">
        <span>{formatTime((progress / STEPS) * total)}</span>
        <span>{formatTime(total)}</span>
      </div>
    </div>
  );
}
