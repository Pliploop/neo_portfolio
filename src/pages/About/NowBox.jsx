import React from 'react';
import Section from '../../ui/Section';
import { about } from '../../data/about';

export default function NowBox() {
  return (
    <Section index="02" label="Now" aria-label="Now" className="mt-24">
      <dl className="border-t rule">
        {about.now.map(([k, v]) => (
          <div key={k} className="grid grid-cols-[7.5rem_1fr] sm:grid-cols-[10rem_1fr] gap-x-6 py-3 border-b rule">
            <dt className="meta text-ink/60 pt-0.5">{k}</dt>
            <dd className="text-[15px]">{v}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
