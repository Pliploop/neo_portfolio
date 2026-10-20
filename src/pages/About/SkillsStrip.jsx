import React from 'react';
import { about } from '../../data/about';

export default function SkillsStrip() {
  const line = about.skills.join('  /  ');
  return (
    <section aria-label="Skills and tools" className="mt-16 border-y-2 border-ink py-4 overflow-hidden">
      <p className="sr-only">{about.skills.join(', ')}</p>
      <div aria-hidden="true" className="marquee flex w-max whitespace-nowrap meta text-[15px]">
        <span className="pr-8">{line}  /  </span>
        <span className="pr-8">{line}  /  </span>
      </div>
    </section>
  );
}
