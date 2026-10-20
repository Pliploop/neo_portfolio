import React from 'react';
import { about } from '../../data/about';

export default function SkillsStrip() {
  const line = about.skills.join('   ·   ');
  return (
    <section aria-label="Skills and tools" className="mt-24 border-y rule py-3.5 overflow-hidden">
      <p className="sr-only">{about.skills.join(', ')}</p>
      <div aria-hidden="true" className="marquee flex w-max whitespace-pre meta text-ink/70">
        <span className="pr-8">{line}   ·   </span>
        <span className="pr-8">{line}   ·   </span>
      </div>
    </section>
  );
}
