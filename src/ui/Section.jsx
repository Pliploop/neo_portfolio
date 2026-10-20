import React from 'react';

// Swiss grid section: a numbered caption column and a content column.
export default function Section({ index, label, id, className = '', children, ...rest }) {
  return (
    <section id={id} className={`mx-auto max-w-6xl px-5 sm:px-8 grid grid-cols-12 gap-x-6 gap-y-6 ${className}`} {...rest}>
      <p className="meta text-ink/70 col-span-12 md:col-span-3 md:pt-2">
        <span className="tabular-nums">{index}</span>
        <span className="inline-block h-2.5 w-px bg-ink/30 mx-2.5 align-[-1px]" aria-hidden="true" />
        {label}
      </p>
      <div className="col-span-12 md:col-span-9 min-w-0">{children}</div>
    </section>
  );
}
