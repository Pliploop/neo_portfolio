import React from 'react';
import Section, { SECTION_HEADING } from '../../ui/Section';
import DropCapHeading from '../../ui/DropCapHeading';
import { about } from '../../data/about';

export default function NowBox() {
  return (
    <Section className="mt-28" title={<DropCapHeading level={2} text="Now" caps={['saint']} className={SECTION_HEADING} />}>
      <dl className="border-t rule">
        {about.now.map(([k, v]) => (
          <div key={k} className="grid grid-cols-[7.5rem_1fr] sm:grid-cols-[10rem_1fr] gap-x-6 py-3 border-b rule">
            <dt className="meta text-ink/70 pt-0.5">{k}</dt>
            <dd className="text-[15px]">{v}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
