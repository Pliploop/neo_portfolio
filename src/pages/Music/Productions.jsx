import React from 'react';
import DropCapHeading from '../../ui/DropCapHeading';
import Expandable from '../../ui/Expandable';
import Embed from '../../ui/Embed';
import { soundcloudEmbed } from '../../ui/embeds';
import { productions } from '../../data/music';

export default function Productions() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-8">
      <DropCapHeading level={2} text="Original productions" caps={['saint']} className="text-[clamp(2.4rem,10vw,3.75rem)] mb-8" />
      <div className="border-t-2 border-ink">
        {productions.map((p, i) => (
          <Expandable
            key={p.url}
            summary={(
              <div className="grid grid-cols-[2.5rem_1fr] sm:grid-cols-[3rem_1fr_auto] gap-x-4 items-baseline">
                <span className="meta text-ink/55">{String(i + 1).padStart(2, '0')}</span>
                <span><span className="text-2xl font-extrabold tracking-tight">{p.title}</span> <span className="text-ink/60">{p.kind}</span></span>
                <span className="meta text-ink/55 col-start-2 sm:col-start-auto">{p.tags.join(' · ')}</span>
              </div>
            )}
          >
            <div className="sm:ml-[4rem] max-w-xl">
              <Embed src={soundcloudEmbed(p.url)} title={p.title} ratio="1/1" href={p.url} seed={50 + i} />
            </div>
          </Expandable>
        ))}
      </div>
    </section>
  );
}
