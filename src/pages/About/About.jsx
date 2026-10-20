import React from 'react';
import Hero from './Hero';
import Bio from './Bio';
import NowBox from './NowBox';
import SkillsStrip from './SkillsStrip';
import Timeline from './Timeline';
import Divider from '../../ui/Divider';
import Contact from './Contact';

export default function About() {
  return (
    <>
      <Hero />
      <Divider />
      <Bio />
      <NowBox />
      <SkillsStrip />
      <Divider />
      <Timeline />
      <Divider />
      <Contact />
    </>
  );
}
