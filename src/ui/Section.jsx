import React from 'react';

// Asymmetric grid section: heading in a left column that stays put while the content scrolls.
export default function Section({ title, id, className = '', children, ...rest }) {
  return (
    <section id={id} className={`mx-auto max-w-6xl px-5 sm:px-8 grid grid-cols-12 gap-x-6 gap-y-8 ${className}`} {...rest}>
      {title ? (
        <div className="col-span-12 md:col-span-4 md:sticky md:top-24 md:self-start">{title}</div>
      ) : null}
      <div className={`col-span-12 min-w-0 ${title ? 'md:col-span-8' : ''}`}>{children}</div>
    </section>
  );
}

export const SECTION_HEADING = 'heading text-[clamp(2rem,3.4vw,2.6rem)]';
