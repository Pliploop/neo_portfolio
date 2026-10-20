import React from 'react';
import DitherField from '../../fx/DitherField';
import DropCapHeading from '../../ui/DropCapHeading';
import Section from '../../ui/Section';
import portrait from '../../assets/portrait.jpg';
import { about } from '../../data/about';

export default function Bio() {
  return (
    <Section id="bio" index="01" label="About">
      <div className="grid md:grid-cols-[1.3fr_1fr] gap-12 items-start">
        <div>
          <DropCapHeading level={2} text="About me" caps={['zighead', 'saint']} className="heading text-[clamp(2.2rem,5vw,3.25rem)] mb-8" />
          <div className="space-y-5 text-[17px] leading-relaxed max-w-[56ch] text-ink/80">
            {about.bio.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
          </div>
        </div>
        <figure className="relative w-full max-w-[300px] justify-self-start md:justify-self-end aspect-[3/4] blob-2 group" tabIndex={0}>
          <DitherField image={portrait} fg="--ink" bg="--paper" cell={2} contrast={1.15} />
          <img
            src={portrait}
            alt="Julien Guinot"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-700"
          />
        </figure>
      </div>
    </Section>
  );
}
