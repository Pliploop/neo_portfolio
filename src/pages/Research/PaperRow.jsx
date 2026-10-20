import React from 'react';
import Expandable from '../../ui/Expandable';
import Authors from './Authors';
import { Badges, PaperLinks } from './PaperCard';
import { Awards } from './Award';

export default function PaperRow({ paper }) {
  return (
    <li>
      <Expandable
        summary={(
          <div className="grid grid-cols-[3.5rem_1fr] sm:grid-cols-[4rem_1fr_9rem] gap-x-4 items-baseline">
            <span className="meta text-ink/70">{paper.year}</span>
            <span className="text-[16px] leading-snug tracking-[-0.01em]">{paper.title}<Awards paper={paper} className="ml-2.5 align-[2px]" /></span>
            <span className="meta text-ink/70 hidden sm:block text-right">{paper.venue}</span>
          </div>
        )}
      >
        <div className="sm:ml-[5rem] grid gap-3 max-w-[70ch]">
          <Badges paper={paper} />
          <Authors authors={paper.authors} />
          <p className="text-[15px] leading-relaxed text-ink/75">{paper.abstract}</p>
          <PaperLinks paper={paper} />
        </div>
      </Expandable>
    </li>
  );
}
