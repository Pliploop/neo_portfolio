import React from 'react';
import AsciiField from '../fx/AsciiField';
import TLink from './TLink';
import { ArrowUpRight } from './icons';
import { Squiggle } from './Doodle';
import Twinkle from './Twinkle';
import { site } from '../data/site';

export default function Footer() {
  return (
    <footer className="mt-40">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="border-t rule" />
        <div aria-hidden="true" className="h-3 mt-1.5 w-1/2 opacity-60"><AsciiField mode="wave" fontSize={9} alpha={0.45} fps={10} /></div>
        <div className="grid grid-cols-12 gap-x-6 gap-y-10 pt-14 pb-10">
          <div className="col-span-12 md:col-span-8">
            <TLink to="/about#contact" className="group inline-block display text-[clamp(2.4rem,7vw,5.5rem)] hover:text-accent-ink transition-colors">
              Get in touch
              <Twinkle size="md" className="ml-3 align-top" />
              <Squiggle width={120} className="block mt-2 text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </TLink>
          </div>
          <ul className="col-span-12 md:col-span-4 md:pt-10 grid grid-cols-2 gap-y-2 gap-x-6">
            {site.footerLinks.map((l) => (
              <li key={l.label}>
                <a href={l.href} target="_blank" rel="noopener noreferrer" className="link inline-flex items-center gap-1 text-[14px]">
                  {l.label} <ArrowUpRight width={11} height={11} />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="border-t rule py-5 meta text-ink/70 flex justify-between">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <span>{site.city}</span>
        </div>
      </div>
    </footer>
  );
}
