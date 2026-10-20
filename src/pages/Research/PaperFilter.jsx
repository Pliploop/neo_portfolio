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
          className="pill pill-sm"
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
