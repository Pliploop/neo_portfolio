import React, { useState } from 'react';
import DropCapHeading from '../../ui/DropCapHeading';
import Embed from '../../ui/Embed';
import { youtubeEmbed } from '../../ui/embeds';
import { ChevronLeft, ChevronRight, ArrowUpRight } from '../../ui/icons';
import { fonkey } from '../../data/music';
import logo from '../../assets/fonkey.png';

const square = 'brut brut-press h-10 w-10 rounded-xl bg-paper grid place-items-center';

export default function Fonkey() {
  const [active, setActive] = useState(0);
  const n = fonkey.tracks.length;
  const track = fonkey.tracks[active];
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-8">
      <DropCapHeading level={2} text={fonkey.name} caps={['zighead', 'saint']} className="text-5xl sm:text-7xl mb-10" />
      <div className="grid md:grid-cols-[1fr_17rem] gap-10">
        <div>
          <Embed key={track.url} src={youtubeEmbed(track.url)} title={`${track.title} by Fonkey Business`} href={track.url} seed={40 + active} />
          <div className="mt-4 flex items-center gap-3">
            <button type="button" aria-label="Previous video" className={square} onClick={() => setActive((i) => (i - 1 + n) % n)}><ChevronLeft /></button>
            <button type="button" aria-label="Next video" className={square} onClick={() => setActive((i) => (i + 1) % n)}><ChevronRight /></button>
            <p className="meta ml-2">
              <span className="text-ink/55">{String(active + 1).padStart(2, '0')}/{String(n).padStart(2, '0')}</span>{' '}
              {track.title} <span className="text-ink/55">({track.original} cover)</span>
            </p>
          </div>
          <p className="meta mt-2 text-ink/55">{fonkey.credit}</p>
        </div>
        <aside className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Fonkey Business logo" className="w-20 grayscale dark:invert" loading="lazy" />
            <p className="text-ink/75 leading-snug">{fonkey.blurb}</p>
          </div>
          <div className="flex gap-4">
            <a href={fonkey.spotify} target="_blank" rel="noopener noreferrer" className="meta link inline-flex items-center gap-1">Spotify <ArrowUpRight width={12} height={12} /></a>
            <a href={fonkey.instagram} target="_blank" rel="noopener noreferrer" className="meta link inline-flex items-center gap-1">Instagram <ArrowUpRight width={12} height={12} /></a>
          </div>
          <div>
            <h3 className="meta mb-2">[roles]</h3>
            <ul className="meta text-ink/75 space-y-0.5">{fonkey.roles.map((r) => <li key={r}>{r}</li>)}</ul>
          </div>
          <div>
            <h3 className="meta mb-2">[setlist]</h3>
            <ul className="border-t-2 border-ink">
              {fonkey.tracks.map((t, i) => (
                <li key={t.url}>
                  <button
                    type="button"
                    aria-pressed={i === active}
                    onClick={() => setActive(i)}
                    className={`w-full flex justify-between gap-3 py-2 border-b-2 border-ink text-left ${i === active ? 'text-accent-ink font-semibold' : 'hover:text-accent-ink'}`}
                  >
                    <span>{t.title}</span><span className="meta text-ink/55">{t.original}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}
