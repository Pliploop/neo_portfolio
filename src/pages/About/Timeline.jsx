import React, { useState } from 'react';
import DropCapHeading from '../../ui/DropCapHeading';
import Expandable from '../../ui/Expandable';
import { educationData, experienceData } from '../../data/education';
import { ArrowUpRight } from '../../ui/icons';

const TABS = [
  { id: 'education', label: 'Education', items: educationData },
  { id: 'experience', label: 'Experience', items: experienceData },
];

function Row({ item }) {
  return (
    <Expandable
      summary={(
        <div className="grid sm:grid-cols-[15rem_1fr] gap-1 sm:gap-6 items-baseline">
          <span className="meta text-ink/55">{item.dates}</span>
          <span>
            <span className="font-semibold text-lg">{item.title}</span>{' '}
            <span className="text-ink/60">{item.company.replace(/^@/, '')}</span>
          </span>
        </div>
      )}
    >
      <ul className="sm:ml-[16.5rem] space-y-2 max-w-[62ch] list-[square] pl-5 marker:text-accent-ink">
        {item.description.map((d) => <li key={d.slice(0, 32)}>{d}</li>)}
      </ul>
      {item.links?.length ? (
        <div className="sm:ml-[16.5rem] mt-3 flex flex-wrap gap-4">
          {item.links.map((href, i) => (
            <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="meta link inline-flex items-center gap-1">
              {item.linktexts?.[i] ?? 'link'} <ArrowUpRight width={12} height={12} />
            </a>
          ))}
        </div>
      ) : null}
    </Expandable>
  );
}

export default function Timeline() {
  const [tab, setTab] = useState('education');
  const current = TABS.find((t) => t.id === tab);
  return (
    <section id="background" className="mx-auto max-w-6xl px-4 sm:px-8">
      <DropCapHeading level={2} text="Background" caps={['saint']} className="text-[clamp(2.4rem,10vw,3.75rem)] mb-8" />
      <div role="tablist" aria-label="Background" className="flex gap-2 mb-6">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            id={`tab-${t.id}`}
            aria-selected={tab === t.id}
            aria-controls={`panel-${t.id}`}
            onClick={() => setTab(t.id)}
            className={`brut brut-press h-10 px-4 rounded-xl font-semibold ${tab === t.id ? 'bg-ink text-paper' : 'bg-paper'}`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} className="border-t-2 border-ink">
        {current.items.map((item) => <Row key={item.title + item.dates} item={item} />)}
      </div>
    </section>
  );
}
