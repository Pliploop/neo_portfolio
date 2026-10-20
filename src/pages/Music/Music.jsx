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
      <section className="relative mx-auto max-w-6xl px-4 sm:px-8 min-h-[52svh] flex flex-col justify-end">
        <div aria-hidden="true" className="absolute right-0 -top-6 w-[70vw] sm:w-[44vw] max-w-[520px] aspect-square blob-3">
          <DitherField seed={17} fg="--accent" cell={4} />
        </div>
        <DropCapHeading level={1} text="Music" caps={['zighead']} accentWord={0} className="relative text-[clamp(4.5rem,16vw,12rem)]" />
        <p className="relative mt-8 max-w-[44ch] text-xl font-medium leading-snug">{music.intro}</p>
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
