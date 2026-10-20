import React from 'react';
import AsciiField from '../fx/AsciiField';

export default function Divider({ className = '' }) {
  return (
    <div aria-hidden="true" className={`mx-auto max-w-6xl px-5 sm:px-8 my-24 sm:my-32 ${className}`}>
      <div className="border-t rule" />
      <div className="h-3 mt-1.5 w-1/3 opacity-60"><AsciiField mode="wave" fontSize={9} alpha={0.45} fps={10} /></div>
    </div>
  );
}
