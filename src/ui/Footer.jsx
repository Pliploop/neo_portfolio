import React from 'react';
import AsciiField from '../fx/AsciiField';
import TLink from './TLink';
import { ArrowUpRight } from './icons';
import { site } from '../data/site';

export default function Footer() {
  return (
    <footer className="px-4 sm:px-8 pb-6 mt-28">
      <div className="mx-auto max-w-6xl brut-thick rounded-card bg-paper overflow-hidden">
        <div className="h-16 border-b-2 border-ink"><AsciiField mode="wave" fontSize={12} fps={12} /></div>
        <div className="p-6 sm:p-10 grid gap-10 md:grid-cols-[1fr_auto] items-end">
          <TLink to="/about#contact" className="display text-[clamp(2.5rem,8vw,6rem)] hover:text-accent-ink">
            Get in touch
          </TLink>
          <ul className="flex flex-col gap-1.5">
            {site.footerLinks.map((l) => (
              <li key={l.label}>
                <a href={l.href} target="_blank" rel="noopener noreferrer" className="meta link inline-flex items-center gap-1">
                  {l.label} <ArrowUpRight width={12} height={12} />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="border-t-2 border-ink px-6 sm:px-10 py-3 meta flex justify-between">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <span>{site.city}</span>
        </div>
      </div>
    </footer>
  );
}
