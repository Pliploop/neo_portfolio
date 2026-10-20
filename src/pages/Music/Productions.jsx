import React from 'react';
import DropCapHeading from '../../ui/DropCapHeading';
import Section, { SECTION_HEADING } from '../../ui/Section';
import Expandable from '../../ui/Expandable';
import Embed from '../../ui/Embed';
import { soundcloudEmbed } from '../../ui/embeds';
import { productions } from '../../data/music';

export default function Productions() {
  return (
    <Section className="mt-32" title={<DropCapHeading level={2} text="Original productions" caps={['saint']} className={SECTION_HEADING} />}>
      <div className="border-t rule">
        {productions.map((p, i) => (
          <Expandable
            key={p.url}
            summary={(
              <div className="grid grid-cols-[2.5rem_1fr] sm:grid-cols-[3rem_1fr_auto] gap-x-4 items-baseline">
                <span className="meta text-ink/70">{String(i + 1).padStart(2, '0')}</span>
                <span><span className="heading text-[1.5rem]">{p.title}</span> <span className="text-[14px] text-ink/70 ml-1">{p.kind}</span></span>
                <span className="meta text-ink/70 col-start-2 sm:col-start-auto">{p.tags.join(' · ')}</span>
              </div>
            )}
          >
            <div className="sm:ml-[4rem] max-w-xl">
              <Embed src={soundcloudEmbed(p.url)} title={p.title} ratio="1/1" href={p.url} seed={50 + i} />
            </div>
          </Expandable>
        ))}
      </div>
    </Section>
  );
}
