import React from 'react';
import { PAPER_FILTERS } from '../../data/paperUtils';

export default function PaperFilter({ value, onChange }) {
  return (
    <div role="group" aria-label="Filter publications" className="flex flex-wrap gap-2">
      {PAPER_FILTERS.map((f) => (
        <button
          key={f.id}
          type="button"
          aria-pressed={value === f.id}
          onClick={() => onChange(f.id)}
          className={`meta h-9 px-3.5 rounded-full border-2 border-ink transition-colors ${value === f.id ? 'bg-ink text-paper' : 'hover:bg-ink/10'}`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
