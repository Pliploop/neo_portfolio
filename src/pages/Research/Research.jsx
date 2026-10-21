import React, { useState } from 'react';
import AsciiField from '../../fx/AsciiField';
import DropCapHeading from '../../ui/DropCapHeading';
import Divider from '../../ui/Divider';
import Section, { SECTION_HEADING } from '../../ui/Section';
import PaperCard from './PaperCard';
import PaperRow from './PaperRow';
import PaperFilter from './PaperFilter';
import ProjectCard from './ProjectCard';
import { projects } from '../../data/projects';
import { ArrowUpRight } from '../../ui/icons';
import { Asterisk } from '../../ui/Doodle';
import Twinkle from '../../ui/Twinkle';
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
      <section className="relative mx-auto max-w-6xl px-5 sm:px-8 grid grid-cols-12 gap-x-6">
        <div aria-hidden="true" className="absolute right-5 sm:right-8 top-0 w-[46%] h-56 opacity-70 hidden sm:block">
          <AsciiField seed={21} blobs={5} fontSize={8} alpha={0.4} fps={12} />
        </div>
        <div className="col-span-12 md:col-span-9 relative">
          <div className="flex items-start gap-3">
            <DropCapHeading level={1} text="Research" caps={['zighead']} accentWord={0} className="display text-[clamp(3.2rem,11vw,8.5rem)]" />
            <Twinkle size="md" className="mt-2" />
          </div>
          <p className="mt-10 max-w-[46ch] text-[1.2rem] leading-snug tracking-[-0.015em] text-ink/80">{research.intro}</p>
          <p className="meta mt-6 text-ink/70 max-w-[70ch]">{research.topics.join('  ·  ')}</p>
        </div>
      </section>

      <Divider />

      <Section title={<DropCapHeading level={2} text="Selected work" caps={['zighead']} className={SECTION_HEADING} />}>
        <div className="grid lg:grid-cols-2 gap-x-10 gap-y-14">
          {featuredPapers(papers).map((p, i) => <PaperCard key={p.title} paper={p} seed={30 + i} />)}
        </div>
      </Section>

      <Section className="mt-32" title={<DropCapHeading level={2} text="Publications" caps={['saint']} className={SECTION_HEADING} />}>
        <div className="mb-6">
          <PaperFilter value={filter} onChange={setFilter} />
        </div>
        <span id="all-work" className="sr-only">All publications</span>
        <ul aria-label="Publications" className="border-t rule">
          {list.map((p) => <PaperRow key={p.title} paper={p} />)}
        </ul>
        {list.length === 0 ? <p className="meta py-6 text-ink/70">No publications match this filter.</p> : null}
      </Section>

      <Section className="mt-32" title={<DropCapHeading level={2} text="Projects" caps={['zighead']} className={SECTION_HEADING} />}>
        <div className="grid gap-y-12">
          {projects.map((p) => <ProjectCard key={p.href} project={p} />)}
        </div>
      </Section>

      <Section className="mt-32" title={<DropCapHeading level={2} text="Elsewhere" caps={['zighead']} className={SECTION_HEADING} />}>
        <div className="grid sm:grid-cols-2 gap-x-10">
          {ELSEWHERE.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between border-b rule py-4 heading text-[1.6rem] hover:text-accent-ink transition-colors">
              <span className="inline-flex items-center gap-3">
                <Asterisk size={12} className="text-accent opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                {l.label}
              </span>
              <ArrowUpRight width={18} height={18} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          ))}
        </div>
      </Section>
    </>
  );
}
