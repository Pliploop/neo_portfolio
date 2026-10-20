import React, { useState } from 'react';
import DropCapHeading from '../../ui/DropCapHeading';
import Section from '../../ui/Section';
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
        <div className="grid sm:grid-cols-[12rem_1fr] gap-1 sm:gap-6 items-baseline">
          <span className="meta text-ink/70">{item.dates}</span>
          <span>
            <span className="font-medium text-[16px] tracking-[-0.01em]">{item.title}</span>{' '}
            <span className="text-ink/70">{item.company.replace(/^@/, '')}</span>
          </span>
        </div>
      )}
    >
      <ul className="sm:ml-[13.5rem] space-y-2 max-w-[62ch] list-disc pl-5 marker:text-accent text-[15px] text-ink/80">
        {item.description.map((d) => <li key={d.slice(0, 32)}>{d}</li>)}
      </ul>
      {item.links?.length ? (
        <div className="sm:ml-[13.5rem] mt-3 flex flex-wrap gap-4">
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
    <Section id="background" index="03" label="Background">
      <DropCapHeading level={2} text="Background" caps={['saint']} className="heading text-[clamp(2.2rem,5vw,3.25rem)] mb-8" />
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
            className="pill pill-sm"
          >
            {t.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} className="border-t rule">
        {current.items.map((item) => <Row key={item.title + item.dates} item={item} />)}
      </div>
    </Section>
  );
}
