import React, { useId, useState } from 'react';

export default function Expandable({ summary, children, defaultOpen = false, className = '' }) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  return (
    <div className={`border-b-2 border-ink ${className}`}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className="w-full text-left flex items-start gap-4 py-4 group"
      >
        <div className="flex-1 min-w-0 group-hover:text-accent-ink transition-colors">{summary}</div>
        <span aria-hidden="true" className="meta shrink-0 mt-0.5 w-4 text-center">{open ? '−' : '+'}</span>
      </button>
      <div
        id={id}
        role="region"
        {...(open ? {} : { inert: '' })}
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden"><div className="pb-6">{children}</div></div>
      </div>
    </div>
  );
}
