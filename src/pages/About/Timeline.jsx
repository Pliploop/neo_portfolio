import React, { useState } from 'react';
import DropCapHeading from '../../ui/DropCapHeading';
import Section, { SECTION_HEADING } from '../../ui/Section';
import Expandable from '../../ui/Expandable';
import { educationData, experienceData } from '../../data/education';
import { ArrowUpRight } from '../../ui/icons';
import DitherField from '../../fx/DitherField';
import { logoFor } from '../../data/logos';

const TABS = [
  { id: 'education', label: 'Education', items: educationData },
  { id: 'experience', label: 'Experience', items: experienceData },
];

// Organisation mark, dithered in ink with the same slow wave as the portrait.
function OrgLogo({ logo }) {
  const src = logoFor(logo);
  return (
    <span data-testid="org-logo" aria-hidden="true" className="block w-16 h-11 shrink-0">
      {src ? <DitherField image={src} fg="--ink" bg="--paper" cell={1} contrast={1.6} fps={12} /> : null}
    </span>
  );
}

function Row({ item }) {
  return (
    <Expandable
      summary={(
        <div className="grid grid-cols-[4rem_1fr] sm:grid-cols-[4rem_10rem_1fr] gap-x-4 gap-y-1 sm:gap-x-5 items-center">
          <OrgLogo logo={item.logo} />
          <span className="meta text-ink/70 col-start-2 sm:col-start-auto row-start-2 sm:row-start-auto">{item.dates}</span>
          <span>
            <span className="font-medium text-[16px] tracking-[-0.01em]">{item.title}</span>{' '}
            <span className="text-ink/70">{item.company.replace(/^@/, '')}</span>
          </span>
        </div>
      )}
    >
      <ul className="sm:ml-[15.5rem] space-y-2 max-w-[62ch] list-disc pl-5 marker:text-accent text-[15px] text-ink/80">
        {item.description.map((d) => <li key={d.slice(0, 32)}>{d}</li>)}
      </ul>
      {item.links?.length ? (
        <div className="sm:ml-[15.5rem] mt-3 flex flex-wrap gap-4">
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
    <Section id="background" title={<DropCapHeading level={2} text="Background" caps={['saint']} className={SECTION_HEADING} />}>
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
