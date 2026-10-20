import React from 'react';
import DitherField from '../../fx/DitherField';
import DropCapHeading from '../../ui/DropCapHeading';
import Divider from '../../ui/Divider';
import Fonkey from './Fonkey';
import Productions from './Productions';
import Commuz from './Commuz';
import { music } from '../../data/music';

export default function Music() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-5 sm:px-8 grid grid-cols-12 gap-x-6 gap-y-10 items-end">
        <div className="col-span-12 md:col-span-8">
          <DropCapHeading level={1} text="Music" caps={['zighead']} accentWord={0} className="display text-[clamp(3.6rem,12vw,9.5rem)]" />
          <p className="mt-10 max-w-[40ch] text-[1.2rem] leading-snug tracking-[-0.015em] text-ink/80">{music.intro}</p>
        </div>
        <div aria-hidden="true" className="col-span-7 col-start-4 md:col-span-4 md:col-start-auto aspect-square">
          <DitherField seed={17} fg="--accent" cell={2} gain={0.9} fade speed={2.2} />
        </div>
      </section>
      <Divider />
      <Fonkey />
      <Divider />
      <Productions />
      <Divider />
      <Commuz />
    </>
  );
}
