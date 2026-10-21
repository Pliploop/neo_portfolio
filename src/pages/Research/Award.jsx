import React from 'react';
import Twinkle from '../../ui/Twinkle';

export default function Award({ label }) {
  return (
    <span data-testid="award" className="inline-flex items-center gap-1.5 h-6 pl-2 pr-2.5 rounded-full border border-accent/40 text-accent-ink text-[12px] font-medium tracking-[-0.005em] whitespace-nowrap">
      <Twinkle size="xs" className="w-2.5 text-center" />
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

const TAGS = [
  { id: 'oral', label: 'Oral', test: (p) => p.presentationType?.includes('oral'), cls: 'bg-ink text-paper border-ink' },
  { id: 'poster', label: 'Poster', test: (p) => p.presentationType?.includes('poster'), cls: 'border-ink/40 text-ink' },
  { id: 'journal', label: 'Journal', test: (p) => p.isJournal, cls: 'border-ink/40 text-ink' },
];

// Presentation format as pills: oral solid, poster and journal outlined.
export function Tags({ paper, className = '' }) {
  const tags = TAGS.filter((t) => t.test(paper));
  if (!tags.length) return null;
  return (
    <span className={`inline-flex flex-wrap gap-1.5 ${className}`}>
      {tags.map((t) => (
        <span key={t.id} data-testid={`tag-${t.id}`} className={`inline-flex items-center h-6 px-2.5 rounded-full border text-[12px] font-medium tracking-[-0.005em] whitespace-nowrap ${t.cls}`}>
          {t.label}
        </span>
      ))}
    </span>
  );
}
