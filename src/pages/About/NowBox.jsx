import React from 'react';
import Frame from '../../ui/Frame';
import { about } from '../../data/about';

export default function NowBox() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-8 mt-16">
      <Frame as="section" aria-label="Now" className="p-6 sm:p-8">
        <h2 className="meta mb-5">[now]</h2>
        <dl className="grid sm:grid-cols-[9rem_1fr] gap-x-6 gap-y-2.5">
          {about.now.map(([k, v]) => (
            <React.Fragment key={k}>
              <dt className="meta text-ink/55">{k}</dt>
              <dd className="font-medium">{v}</dd>
            </React.Fragment>
          ))}
        </dl>
      </Frame>
    </div>
  );
}
