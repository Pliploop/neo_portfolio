import React from 'react';
import DitherBlob from '../../fx/DitherBlob';
import { ArrowUpRight } from '../../ui/icons';

export default function ProjectCard({ project }) {
  return (
    <article className="group grid grid-cols-[5.5rem_1fr] sm:grid-cols-[7rem_1fr] gap-5 border-t rule pt-6">
      <div aria-hidden="true" className="aspect-square">
        <DitherBlob seed={project.seed} speed={1.6} fontSize={7} />
      </div>
      <div className="min-w-0">
        <h3 className="heading text-[1.35rem]">
          <a href={project.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-accent-ink transition-colors">
            {project.title}
            <ArrowUpRight width={15} height={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </h3>
        <p className="mt-2 text-[15px] leading-relaxed text-ink/80 max-w-[52ch]">{project.description}</p>
        {project.links.length ? (
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
            {project.links.map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="meta link inline-flex items-center gap-1">
                {l.label} <ArrowUpRight width={12} height={12} />
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}
