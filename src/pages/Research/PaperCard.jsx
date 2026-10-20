import React, { useId, useState } from 'react';
import AsciiField from '../../fx/AsciiField';
import Authors from './Authors';
import { ArrowUpRight } from '../../ui/icons';
import { badgesFor } from '../../data/paperUtils';
import { Awards } from './Award';

export function Badges({ paper }) {
  return (
    <p className="meta flex flex-wrap gap-x-3">
      {badgesFor(paper).filter((b) => !b.accent).map((b) => <span key={b.label} className="text-ink/70">{b.label}</span>)}
    </p>
  );
}

export function PaperLinks({ paper }) {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1">
      {paper.arxiv ? <a href={paper.arxiv} target="_blank" rel="noopener noreferrer" className="meta link inline-flex items-center gap-1">arXiv <ArrowUpRight width={12} height={12} /></a> : null}
      {paper.github ? <a href={paper.github} target="_blank" rel="noopener noreferrer" className="meta link inline-flex items-center gap-1">GitHub <ArrowUpRight width={12} height={12} /></a> : null}
      {paper.project ? <a href={paper.project} target="_blank" rel="noopener noreferrer" className="meta link inline-flex items-center gap-1">Project <ArrowUpRight width={12} height={12} /></a> : null}
      {paper.demo ? <a href={paper.demo} target="_blank" rel="noopener noreferrer" className="meta link inline-flex items-center gap-1">Demo <ArrowUpRight width={12} height={12} /></a> : null}
    </div>
  );
}

export default function PaperCard({ paper, seed }) {
  const [hover, setHover] = useState(false);
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <article
      className="relative border-t rule pt-6 flex flex-col gap-4"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div aria-hidden="true" className={`absolute right-0 top-6 w-32 h-16 pointer-events-none transition-opacity duration-700 ${hover ? 'opacity-100' : 'opacity-0'}`}>
        <AsciiField seed={seed} fontSize={8} color="--accent" alpha={0.8} fps={15} active={hover} />
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <Badges paper={paper} />
        <Awards paper={paper} />
      </div>
      <h3 className="heading text-[1.45rem] sm:text-[1.6rem] max-w-[24ch]">{paper.title}</h3>
      <Authors authors={paper.authors} />
      <p className="text-[15px] text-ink/80 max-w-[52ch]">{paper.summary}</p>
      <div className="relative flex flex-wrap items-center gap-5 mt-auto pt-2">
        <PaperLinks paper={paper} />
        <button type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)} className="meta link">
          abstract {open ? '−' : '+'}
        </button>
      </div>
      <div id={id} hidden={!open} className="text-[14px] leading-relaxed text-ink/75 max-w-[62ch]">{paper.abstract}</div>
    </article>
  );
}
