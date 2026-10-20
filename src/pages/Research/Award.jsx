import React from 'react';
import { Sparkle } from '../../ui/Doodle';

export default function Award({ label }) {
  return (
    <span data-testid="award" className="inline-flex items-center gap-1.5 h-6 pl-2 pr-2.5 rounded-full border border-accent/40 text-accent-ink text-[12px] font-medium tracking-[-0.005em] whitespace-nowrap">
      <Sparkle size={11} />
      {label}
    </span>
  );
}

export function Awards({ paper, className = '' }) {
  if (!paper.awards?.length) return null;
  return (
    <span className={`inline-flex flex-wrap gap-1.5 ${className}`}>
      {paper.awards.map((a) => <Award key={a} label={a} />)}
    </span>
  );
}
