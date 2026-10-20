import React, { useState } from 'react';
import Embed from '../../ui/Embed';
import Section from '../../ui/Section';
import { soundcloudEmbed } from '../../ui/embeds';
import { commuz } from '../../data/music';
import title from '../../assets/commuz-title.svg';

export default function Commuz() {
  const [year, setYear] = useState(commuz.plays[0].year);
  const play = commuz.plays.find((p) => p.year === year);
  const titleMask = { WebkitMaskImage: `url(${title})`, maskImage: `url(${title})`, WebkitMaskSize: 'contain', maskSize: 'contain', WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat' };
  return (
    <Section index="03" label="Commuz'" className="mt-32">
      <h2 className="sr-only">Commuz' musical theatre: mixing and mastering</h2>
      <div aria-hidden="true" className="h-16 sm:h-20 w-full max-w-md bg-ink" style={titleMask} />
      <p className="meta mt-4 text-ink/60">Mixing and mastering</p>
      <div className="mt-8 grid md:grid-cols-2 gap-8 text-[15px] leading-relaxed text-ink/80">
        {commuz.intro.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}
      </div>

      <div className="mt-10 grid sm:grid-cols-2 gap-6 max-w-4xl">
        {commuz.featuredMixes.map((m, i) => (
          <div key={m.url}>
            <p className="meta mb-2">{m.title}</p>
            <Embed src={soundcloudEmbed(m.url)} title={`${m.title}, Commuz 2022 mix`} height={166} href={m.url} seed={60 + i} />
          </div>
        ))}
      </div>

      <div role="tablist" aria-label="Commuz years" className="mt-16 flex flex-wrap gap-2">
        {commuz.plays.map((p) => (
          <button
            key={p.year}
            type="button"
            role="tab"
            id={`commuz-${p.year}`}
            aria-selected={p.year === year}
            aria-controls="commuz-panel"
            onClick={() => setYear(p.year)}
            className="pill pill-sm"
          >
            {p.year}
          </button>
        ))}
      </div>
      <div role="tabpanel" id="commuz-panel" aria-labelledby={`commuz-${year}`} className="mt-10 grid lg:grid-cols-[1fr_20rem] gap-10">
        <div>
          <h3 className="heading text-[2.25rem]">{play.title}</h3>
          <p className="meta mt-3 text-ink/60">{play.roles.join(' · ')}</p>
          <p className="mt-5 text-[15px] leading-relaxed text-ink/80 max-w-[52ch]">{play.description}</p>
          <ol className="mt-6 meta grid grid-cols-2 gap-x-6 gap-y-1 max-w-md">
            {play.tracks.map((t, i) => <li key={t}><span className="text-ink/60">{String(i + 1).padStart(2, '0')}</span> {t}</li>)}
          </ol>
        </div>
        <Embed key={play.spotify} src={play.spotify} title={`${play.title} album`} height={352} seed={70} label="Load album" />
      </div>
    </Section>
  );
}
