import React, { useState } from 'react';
import AsciiField from '../../fx/AsciiField';
import DropCapHeading from '../../ui/DropCapHeading';
import Divider from '../../ui/Divider';
import PaperCard from './PaperCard';
import PaperRow from './PaperRow';
import PaperFilter from './PaperFilter';
import { ArrowUpRight } from '../../ui/icons';
import { papers } from '../../data/papers';
import { filterPapers, featuredPapers } from '../../data/paperUtils';
import { research } from '../../data/about';
import { links } from '../../data/site';

const ELSEWHERE = [
  { label: 'Google Scholar', href: links.scholar },
  { label: 'arXiv', href: links.arxiv },
  { label: 'GitHub', href: links.github },
  { label: 'CV', href: links.cv },
];

export default function Research() {
  const [filter, setFilter] = useState('all');
  const list = filterPapers(papers, filter);
  return (
    <>
      <section className="relative mx-auto max-w-6xl px-4 sm:px-8 pt-6">
        <div aria-hidden="true" className="absolute inset-x-4 sm:inset-x-8 top-0 h-full max-h-[22rem] opacity-60">
          <AsciiField seed={21} blobs={5} fontSize={13} alpha={0.35} fps={12} />
        </div>
        <DropCapHeading level={1} text="Research" caps={['zighead']} accentWord={0} className="relative text-[clamp(3rem,15vw,11rem)]" />
        <p className="relative mt-8 max-w-[52ch] text-xl leading-snug font-medium">{research.intro}</p>
        <p className="relative meta mt-5 text-ink/60">{research.topics.join(' · ')}</p>
      </section>

      <section aria-labelledby="featured" className="mx-auto max-w-6xl px-4 sm:px-8 mt-20">
        <h2 id="featured" className="meta mb-5">[featured]</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {featuredPapers(papers).map((p, i) => <PaperCard key={p.title} paper={p} seed={30 + i} />)}
        </div>
      </section>

      <Divider />

      <section aria-labelledby="all-work" className="mx-auto max-w-6xl px-4 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-5 mb-6">
          <DropCapHeading level={2} text="Publications" caps={['saint']} className="text-[clamp(2.4rem,10vw,3.75rem)]" />
          <PaperFilter value={filter} onChange={setFilter} />
        </div>
        <span id="all-work" className="sr-only">All publications</span>
        <ul aria-label="Publications" className="border-t-2 border-ink">
          {list.map((p) => <PaperRow key={p.title} paper={p} />)}
        </ul>
        {list.length === 0 ? <p className="meta py-6 text-ink/55">No publications match this filter.</p> : null}
      </section>

      <section aria-label="Elsewhere" className="mx-auto max-w-6xl px-4 sm:px-8 mt-24 grid sm:grid-cols-2 gap-x-10">
        {ELSEWHERE.map((l) => (
          <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between border-b-2 border-ink py-4 text-2xl sm:text-3xl font-extrabold tracking-tight hover:text-accent-ink">
            {l.label} <ArrowUpRight width={22} height={22} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        ))}
      </section>
    </>
  );
}
