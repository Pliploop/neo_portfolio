import React from 'react';
import DitherBlob from '../../fx/DitherBlob';
import Twinkle from '../../ui/Twinkle';
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
          <div className="flex items-start gap-3">
            <DropCapHeading level={1} text="Music" caps={['zighead']} accentWord={0} className="display text-[clamp(3.6rem,12vw,9.5rem)]" />
            <Twinkle size="md" className="mt-3" />
          </div>
          <p className="mt-10 max-w-[40ch] text-[1.2rem] leading-snug tracking-[-0.015em] text-ink/80">{music.intro}</p>
        </div>
        <div aria-hidden="true" className="relative col-span-7 col-start-4 md:col-span-4 md:col-start-auto aspect-square">
          <DitherBlob seed={17} />
          <Twinkle className="absolute top-[10%] left-[8%]" />
          <Twinkle size="md" className="absolute bottom-[10%] right-[6%]" />
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
