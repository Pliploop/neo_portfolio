import React from 'react';
import DitherField from '../../fx/DitherField';
import DropCapHeading from '../../ui/DropCapHeading';
import Button from '../../ui/Button';
import { ArrowUpRight, ArrowDown } from '../../ui/icons';
import { about } from '../../data/about';
import { links } from '../../data/site';

export default function Hero() {
  return (
    <section className="relative mx-auto max-w-6xl px-4 sm:px-8 min-h-[72svh] flex flex-col justify-end pb-6">
      <div aria-hidden="true" className="absolute right-0 top-0 w-[78vw] sm:w-[52vw] max-w-[600px] aspect-square blob-1">
        <DitherField seed={11} fg="--accent" cell={4} />
      </div>
      <DropCapHeading level={1} text="Julien Guinot" caps={['zighead', 'saint']} accentWord={0} stack className="relative text-[clamp(4rem,15vw,12rem)] leading-[0.82]" />
      <p className="relative mt-8 max-w-[34ch] text-xl sm:text-2xl font-medium leading-snug">{about.tagline}</p>
      <div className="relative mt-8 flex flex-wrap items-center gap-3">
        <Button to="/academia">Research</Button>
        <Button to="/music" variant="outline">Music</Button>
        <a href={links.cv} target="_blank" rel="noopener noreferrer" className="meta link inline-flex items-center gap-1 px-2">CV <ArrowUpRight width={12} height={12} /></a>
        <a href="#contact" className="meta link inline-flex items-center gap-1 px-2">Contact <ArrowDown width={12} height={12} /></a>
      </div>
    </section>
  );
}
