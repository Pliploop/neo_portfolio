import React from 'react';
import AsciiField from '../fx/AsciiField';

export default function Divider({ className = '' }) {
  return (
    <div aria-hidden="true" className={`mx-auto max-w-6xl px-4 sm:px-8 my-20 sm:my-28 ${className}`}>
      <div className="h-10"><AsciiField mode="wave" fontSize={12} alpha={0.7} fps={12} /></div>
    </div>
  );
}
