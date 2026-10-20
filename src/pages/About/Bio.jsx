import React from 'react';
import DitherField from '../../fx/DitherField';
import DropCapHeading from '../../ui/DropCapHeading';
import portrait from '../../assets/portrait.jpg';
import { about } from '../../data/about';

export default function Bio() {
  return (
    <section id="bio" className="mx-auto max-w-6xl px-4 sm:px-8 grid md:grid-cols-[1.25fr_1fr] gap-12 items-start">
      <div>
        <DropCapHeading level={2} text="About me" caps={['zighead', 'saint']} className="text-[clamp(2.4rem,10vw,3.75rem)] mb-8" />
        <div className="space-y-5 text-lg max-w-[58ch]">
          {about.bio.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
        </div>
      </div>
      <figure className="relative w-full max-w-sm justify-self-center md:justify-self-end aspect-[3/4] blob-2 group" tabIndex={0}>
        <DitherField image={portrait} fg="--ink" bg="--paper" cell={3} contrast={1.35} />
        <img
          src={portrait}
          alt="Julien Guinot"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-500"
        />
      </figure>
    </section>
  );
}
