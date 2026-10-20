import React from 'react';
import DitherField from '../../fx/DitherField';
import DropCapHeading from '../../ui/DropCapHeading';
import Button from '../../ui/Button';
import { ArrowUpRight, ArrowDown } from '../../ui/icons';
import { Sparkle } from '../../ui/Doodle';
import { about } from '../../data/about';
import { links } from '../../data/site';

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-5 sm:px-8 grid grid-cols-12 gap-x-6 gap-y-10 items-end min-h-[68svh] pb-4">
      <div className="col-span-12 md:col-span-8 relative">
        <Sparkle size={18} className="text-accent mb-6" />
        <DropCapHeading level={1} text="Julien Guinot" caps={['zighead', 'saint']} accentWord={0} stack className="display text-[clamp(3.6rem,11vw,9rem)]" />
        <p className="mt-10 max-w-[36ch] text-[1.2rem] sm:text-[1.35rem] leading-snug tracking-[-0.015em] text-ink/80">{about.tagline}</p>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Button to="/academia">Research</Button>
          <Button to="/music" variant="outline">Music</Button>
          <a href={links.cv} target="_blank" rel="noopener noreferrer" className="link meta inline-flex items-center gap-1 ml-2">CV <ArrowUpRight width={11} height={11} /></a>
          <a href="#contact" className="link meta inline-flex items-center gap-1 ml-2">Contact <ArrowDown width={11} height={11} /></a>
        </div>
      </div>
      <div aria-hidden="true" className="col-span-8 col-start-3 md:col-span-4 md:col-start-auto aspect-square self-center">
        <DitherField seed={11} fg="--accent" cell={2} gain={0.9} fade speed={2.2} />
      </div>
    </section>
  );
}
