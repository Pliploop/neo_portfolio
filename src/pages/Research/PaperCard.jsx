import React, { useId, useState } from 'react';
import Frame from '../../ui/Frame';
import AsciiField from '../../fx/AsciiField';
import Authors from './Authors';
import { ArrowUpRight } from '../../ui/icons';
import { badgesFor } from '../../data/paperUtils';

export function Badges({ paper }) {
  return (
    <p className="meta flex flex-wrap gap-x-2">
      {badgesFor(paper).map((b) => <span key={b.label} className={b.accent ? 'text-accent-ink' : ''}>[{b.label}]</span>)}
    </p>
  );
}

export function PaperLinks({ paper }) {
  return (
    <div className="flex gap-4">
      {paper.arxiv ? <a href={paper.arxiv} target="_blank" rel="noopener noreferrer" className="meta link inline-flex items-center gap-1">arXiv <ArrowUpRight width={12} height={12} /></a> : null}
      {paper.github ? <a href={paper.github} target="_blank" rel="noopener noreferrer" className="meta link inline-flex items-center gap-1">GitHub <ArrowUpRight width={12} height={12} /></a> : null}
    </div>
  );
}

export default function PaperCard({ paper, seed }) {
  const [hover, setHover] = useState(false);
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <Frame
      as="article"
      thick
      className="relative p-6 sm:p-8 flex flex-col gap-4 overflow-hidden"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div aria-hidden="true" className={`absolute right-0 bottom-0 w-48 h-28 pointer-events-none transition-opacity duration-500 ${hover ? 'opacity-100' : 'opacity-0'}`}>
        <AsciiField seed={seed} fontSize={10} color="--accent" fps={15} active={hover} />
      </div>
      <Badges paper={paper} />
      <h3 className="text-2xl sm:text-[1.7rem] font-extrabold leading-tight tracking-tight">{paper.title}</h3>
      <Authors authors={paper.authors} />
      <p className="text-ink/80 max-w-[55ch]">{paper.summary}</p>
      <div className="relative flex flex-wrap items-center gap-5 mt-auto pt-2">
        <PaperLinks paper={paper} />
        <button type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)} className="meta link">
          abstract {open ? '−' : '+'}
        </button>
      </div>
      <div id={id} hidden={!open} className="text-[15px] leading-relaxed text-ink/75 max-w-[65ch]">{paper.abstract}</div>
    </Frame>
  );
}
