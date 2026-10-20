import React, { useState } from 'react';
import DitherField from '../fx/DitherField';
import { Play, ArrowUpRight } from './icons';

export default function Embed({
  src, title, ratio = '16/9', height, href, label = 'Play', seed = 5,
  allow = 'autoplay; encrypted-media; fullscreen; picture-in-picture',
}) {
  const [loaded, setLoaded] = useState(false);
  const box = height ? { height } : { aspectRatio: ratio };
  return (
    <div>
      <div className="relative border rule rounded-soft overflow-hidden bg-paper" style={box}>
        {loaded ? (
          <iframe src={src} title={title} allow={allow} allowFullScreen className="absolute inset-0 w-full h-full" />
        ) : (
          <button type="button" onClick={() => setLoaded(true)} className="absolute inset-0 w-full h-full group" aria-label={`${label} ${title}`}>
            <span className="absolute inset-0 opacity-70 group-hover:opacity-100 transition-opacity duration-500">
              <DitherField seed={seed} fg="--ink" cell={2} gain={0.7} fade fps={12} />
            </span>
            <span className="relative pill bg-paper group-hover:bg-ink group-hover:text-paper">
              <Play width={12} height={12} /> {label}
            </span>
          </button>
        )}
      </div>
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="meta link inline-flex items-center gap-1 mt-2 text-ink/60">
          open <ArrowUpRight width={11} height={11} />
        </a>
      ) : null}
    </div>
  );
}
