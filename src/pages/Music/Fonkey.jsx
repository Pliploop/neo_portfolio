import React, { useState } from 'react';
import DropCapHeading from '../../ui/DropCapHeading';
import Section from '../../ui/Section';
import Embed from '../../ui/Embed';
import { youtubeEmbed } from '../../ui/embeds';
import { ChevronLeft, ChevronRight, ArrowUpRight } from '../../ui/icons';
import { fonkey } from '../../data/music';
import logo from '../../assets/fonkey.png';

const round = 'dot-btn h-9 w-9';

export default function Fonkey() {
  const [active, setActive] = useState(0);
  const n = fonkey.tracks.length;
  const track = fonkey.tracks[active];
  return (
    <Section index="01" label="Band">
      <DropCapHeading level={2} text={fonkey.name} caps={['zighead', 'saint']} className="heading text-[clamp(2.2rem,5vw,3.25rem)] mb-10" />
      <div className="grid lg:grid-cols-[1fr_15rem] gap-10">
        <div>
          <Embed key={track.url} src={youtubeEmbed(track.url)} title={`${track.title} by Fonkey Business`} href={track.url} seed={40 + active} />
          <div className="mt-4 flex items-center gap-3">
            <button type="button" aria-label="Previous video" className={round} onClick={() => setActive((i) => (i - 1 + n) % n)}><ChevronLeft width={15} height={15} /></button>
            <button type="button" aria-label="Next video" className={round} onClick={() => setActive((i) => (i + 1) % n)}><ChevronRight width={15} height={15} /></button>
            <p className="meta ml-2 text-ink/80">
              <span className="text-ink/70">{String(active + 1).padStart(2, '0')}/{String(n).padStart(2, '0')}</span>{' '}
              {track.title} <span className="text-ink/70">({track.original} cover)</span>
            </p>
          </div>
          <p className="meta mt-2 text-ink/70">{fonkey.credit}</p>
        </div>
        <aside className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Fonkey Business logo" className="w-16 grayscale opacity-80 dark:invert" loading="lazy" />
            <p className="text-[14px] text-ink/75 leading-snug">{fonkey.blurb}</p>
          </div>
          <div className="flex gap-4">
            <a href={fonkey.spotify} target="_blank" rel="noopener noreferrer" className="meta link inline-flex items-center gap-1">Spotify <ArrowUpRight width={12} height={12} /></a>
            <a href={fonkey.instagram} target="_blank" rel="noopener noreferrer" className="meta link inline-flex items-center gap-1">Instagram <ArrowUpRight width={12} height={12} /></a>
          </div>
          <div>
            <h3 className="meta text-ink/70 mb-2">Roles</h3>
            <ul className="text-[14px] space-y-0.5">{fonkey.roles.map((r) => <li key={r}>{r}</li>)}</ul>
          </div>
          <div>
            <h3 className="meta text-ink/70 mb-2">Setlist</h3>
            <ul className="border-t rule">
              {fonkey.tracks.map((t, i) => (
                <li key={t.url}>
                  <button
                    type="button"
                    aria-pressed={i === active}
                    onClick={() => setActive(i)}
                    className={`w-full flex justify-between gap-3 py-2.5 border-b rule text-left text-[14px] transition-colors ${i === active ? 'text-ink' : 'text-ink/70 hover:text-ink'}`}
                  >
                    <span className="inline-flex items-center gap-2">{i === active ? <span aria-hidden="true" className="h-1 w-1 rounded-full bg-accent" /> : null}{t.title}</span><span className="meta text-ink/70">{t.original}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </Section>
  );
}
