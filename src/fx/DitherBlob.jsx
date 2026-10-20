import React from 'react';
import DitherField from './DitherField';
import AsciiField from './AsciiField';

const BLOBS = 5;

// Dithered blob with an animated ASCII layer tracing the same field, drawn in the paper
// colour so the characters read as a knock-out inside the blob and vanish outside it.
export default function DitherBlob({ seed, speed = 2.2, gain = 0.9, fontSize = 9, className = '' }) {
  return (
    <div className={`relative w-full h-full ${className}`}>
      <DitherField seed={seed} blobs={BLOBS} fg="--accent" cell={2} gain={gain} fade speed={speed} />
      <div className="absolute inset-0">
        <AsciiField seed={seed} blobs={BLOBS} fontSize={fontSize} color="--paper" alpha={0.9} fps={14} gain={gain * 0.85} fade speed={speed} />
      </div>
    </div>
  );
}
