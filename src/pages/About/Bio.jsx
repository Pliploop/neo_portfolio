import React from 'react';
import DitherField from '../../fx/DitherField';
import DropCapHeading from '../../ui/DropCapHeading';
import Section, { SECTION_HEADING } from '../../ui/Section';
import portrait from '../../assets/portrait.jpg';
import { about } from '../../data/about';

export default function Bio() {
  return (
    <Section id="bio" title={<DropCapHeading level={2} text="About me" caps={['zighead', 'saint']} className={SECTION_HEADING} />}>
      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12 items-start">
        <div>
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
