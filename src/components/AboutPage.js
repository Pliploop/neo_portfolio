import React, { useState, useEffect } from "react";
import { useThemeToggle } from '../hooks/useThemeToggle';
import { useMeshGradient } from '../hooks/useMeshGradient';
import AllHeader from "./subcomponents/header";
import ContactFooter from "./subcomponents/contactfooter";
import { HiOutlineArrowUpRight } from "react-icons/hi2";
import { HiSun, HiMoon } from "react-icons/hi";
import { default as EducationExperience } from "./About/EducationExperience";
import { default as Infinitescroll } from "./About/infinitescroll";
import image from "../content/images/propic.jpg";
import { useNavigate } from "react-router-dom";
import ContactForm from "./About/ContactForm";

const scrollto = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

const GRADIENT_COLORS = ["#FEA4B0", "#FECC96", "#FFFFFF", "#FFFFFF", "#FFF2B8"];

const AboutPage = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const { isDark, toggle } = useThemeToggle();
  const { MeshGradientRenderer, showGradient } = useMeshGradient();

  useEffect(() => {
    document.fonts.ready.then(() => setFontsLoaded(true)).catch(() => {
      setTimeout(() => setFontsLoaded(true), 1000);
    });
  }, []);

  if (!fontsLoaded) {
    return (
      <div className="relative overflow-hidden bg-cover dark:bg-gray-950 lg:py-12 lg:px-32 p-6">
        <AllHeader pagename={"About"} hoveraccent={"orange-200"} clickaccent={"rose-300"} />
        <div className="flex items-center justify-center h-64">
          <div className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-bounce [animation-delay:0ms]" />
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-bounce [animation-delay:150ms]" />
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-bounce [animation-delay:300ms]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden bg-cover dark:bg-gray-950 lg:py-12 lg:px-32 p-6">
      {MeshGradientRenderer && (
        <div className={`transition-opacity duration-1000 ease-in-out ${showGradient ? 'opacity-70' : 'opacity-0'}`}>
          <MeshGradientRenderer
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}
            colors={GRADIENT_COLORS}
            speed={0.01}
          />
        </div>
      )}

      <div className="relative h-full w-full flex flex-col justify-between align-middle">
        <AllHeader pagename={"About"} hoveraccent={"orange-200"} clickaccent={"rose-300"} />
        <div id="all">
          <Intro />
          <Separator />
          <AboutSection />
          <Separator />
          <SectionHeading label="Background" title="Education & Experience" />
          <EducationExperience />
          <Separator />
          <SectionHeading label="Contact" title="Get in touch" />
          <ContactForm />
          <ContactFooter />
        </div>
      </div>

      {/* Mobile Theme Toggle */}
      <div className="fixed bottom-6 right-6 z-[100] lg:hidden">
        <button
          onClick={toggle}
          className="h-12 w-12 rounded-full backdrop-blur-md bg-white/40 dark:bg-black/40 flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-200 shadow-lg"
        >
          {isDark ? <HiSun size={24} className="text-yellow-500" /> : <HiMoon size={24} className="text-gray-700" />}
        </button>
      </div>
    </div>
  );
};

const Separator = () => (
  <div className="w-full h-px bg-black/6 dark:bg-white/8 lg:my-14 my-10" />
);

const SectionHeading = ({ label, title }) => (
  <div className="lg:px-14 mb-8">
    <p className="text-xs font-semibold uppercase tracking-widest text-rose-500 dark:text-orange-400 mb-2">{label}</p>
    <h2 className="font-bold lg:text-3xl text-2xl dark:text-rose-50">{title}</h2>
  </div>
);

const Intro = () => {
  const nav = useNavigate();
  return (
    <div
      id="presentation"
      className="lg:px-14 lg:mt-10 mt-4 w-full flex flex-col items-center text-center dark:text-rose-50"
    >
      <p className="font-bold font-grande text-black/45 dark:text-white/45 mb-1 lg:text-xl text-base">Hey, I'm</p>
      <p className="lg:text-6xl text-4xl font-grande font-bold mb-5">
        <span className="font-zighead text-rose-700 dark:text-orange-300 lg:text-9xl text-5xl">J</span>ulien{" "}
        <span className="lg:text-9xl text-5xl text-rose-500 dark:text-orange-200 font-saint">G</span>uinot
      </p>

      <p className="lg:text-xl text-base font-semibold text-rose-700 dark:text-orange-200 mb-3 max-w-2xl leading-snug">
        AI & music researcher building foundation models for controllable retrieval and multimodal music understanding.
      </p>

      <p className="lg:text-sm text-xs dark:text-rose-50/65 text-black/55 max-w-xl mb-10 leading-relaxed">
        Musician, producer, and mixing engineer — I'm fascinated by what happens when machines learn to understand music the way people do.
      </p>

      {/* CTA hierarchy */}
      <div className="flex flex-row items-center justify-center gap-3 flex-wrap">
        <button
          type="button"
          onClick={() => nav("/academia")}
          className="h-11 px-6 rounded-xl bg-gradient-to-r from-rose-500 to-orange-400 text-white font-bold text-sm shadow-lg hover:shadow-rose-300/40 hover:from-rose-400 hover:to-orange-300 active:scale-[0.98] transition-all duration-200 flex items-center gap-2 cursor-pointer"
        >
          View Research <HiOutlineArrowUpRight size={14} />
        </button>
        <button
          type="button"
          onClick={() => nav("/music")}
          className="h-11 px-6 rounded-xl backdrop-blur-md bg-white/30 dark:bg-white/8 text-black dark:text-white font-semibold text-sm shadow-md hover:shadow-lg hover:bg-white/50 dark:hover:bg-white/15 active:scale-[0.98] transition-all duration-200 flex items-center gap-2 cursor-pointer"
        >
          Listen to Music <HiOutlineArrowUpRight size={14} />
        </button>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="h-11 px-4 text-sm text-black/50 dark:text-white/50 hover:text-rose-600 dark:hover:text-orange-300 font-medium transition-colors duration-150 flex items-center gap-1"
        >
          Resume <HiOutlineArrowUpRight size={12} />
        </a>
        <button
          type="button"
          onClick={() => scrollto("contactform")}
          className="h-11 px-4 text-sm text-black/50 dark:text-white/50 hover:text-rose-600 dark:hover:text-orange-300 font-medium transition-colors duration-150 flex items-center gap-1 cursor-pointer"
        >
          Get in touch <HiOutlineArrowUpRight size={12} />
        </button>
      </div>
    </div>
  );
};

const AboutSection = () => (
  <div className="lg:px-14 w-full flex flex-col dark:text-rose-50">
    {/* Fun heading */}
    <h2 className="font-grande font-bold lg:text-4xl text-3xl dark:text-rose-50 mb-8">
      <span className="font-zighead text-rose-700 dark:text-orange-300 lg:text-6xl text-5xl">A</span>bout{" "}
      <span className="font-saint text-rose-400 dark:text-orange-200 lg:text-6xl text-5xl">M</span>e
    </h2>

    {/* Text + photo row */}
    <div className="flex flex-row w-full lg:gap-14 items-start mb-12">
      <div className="lg:w-3/5 w-full flex flex-col">
        <p className="text-sm text-black/80 dark:text-rose-50/85 mb-4 leading-relaxed">
          I'm Julien — musician, producer, mixing engineer, and DJ. I'm drawn to what happens at the intersection of music and machine intelligence: how AI can help musicians discover new sounds, navigate creative spaces, and understand the music they make.
        </p>
        <p className="text-sm text-black/80 dark:text-rose-50/85 leading-relaxed">
          Currently pursuing a PhD at Queen Mary University of London's AI and Music CDT, supervised by Prof. George Fazekas and Elio Quinton, with support from Universal Music Group. Before this, I trained as an engineer in France and Australia, and worked in research and data science at Sony CSL, IRCAM, Believe, Groover, and Artefact.
        </p>
      </div>

      {/* Photo — desktop */}
      <div className="grow lg:flex hidden flex-col items-end justify-start lg:pr-6">
        <div className="relative w-3/5 aspect-square">
          <div className="w-full h-full p-3 backdrop-blur-md bg-white/20 dark:bg-black/20 shadow-2xl rounded-2xl">
            <div className="h-full w-full overflow-clip rounded-xl">
              <img
                src={image}
                alt="Julien Guinot"
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
          <div className="absolute -bottom-2 -right-2 bg-white/85 dark:bg-gray-900/85 backdrop-blur-md shadow-lg rounded-xl px-3 py-2">
            <p className="text-xs font-bold text-rose-600 dark:text-orange-300 leading-tight">PhD student · London</p>
            <p className="text-xs text-black/45 dark:text-white/40 leading-tight">AI & Music · QMUL</p>
          </div>
        </div>
      </div>
    </div>

    {/* Two columns: Currently + Skills */}
    <div className="flex lg:flex-row flex-col gap-6">
      {/* Currently card */}
      <div className="lg:w-1/2 rounded-2xl bg-white/35 dark:bg-black/25 backdrop-blur-sm shadow-lg p-6 flex flex-col">
        <p className="text-xs font-semibold uppercase tracking-widest text-rose-500 dark:text-orange-400 mb-4">Currently</p>
        <p className="font-bold text-sm dark:text-white mb-0.5">PhD Researcher · AI & Music</p>
        <p className="text-xs text-black/55 dark:text-white/45 leading-snug mb-5">
          Queen Mary University of London<br />× Universal Music Group
        </p>
        <div className="h-px bg-black/8 dark:bg-white/10 mb-4" />
        <p className="text-xs font-semibold uppercase tracking-widest text-rose-500 dark:text-orange-400 mb-3">Research focus</p>
        <div className="flex flex-wrap gap-2">
          {["Foundation models", "Music retrieval", "Multimodal understanding", "Self-supervised learning"].map(tag => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-full text-xs bg-rose-400/12 dark:bg-orange-400/10 text-rose-700 dark:text-orange-300 font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="h-px bg-black/8 dark:bg-white/10 my-4" />
        <p className="text-xs font-semibold uppercase tracking-widest text-rose-500 dark:text-orange-400 mb-3">Previous experience</p>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-xs text-black/60 dark:text-white/50">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 flex-shrink-0" />
            Sony CSL · IRCAM · Believe · Groover · Artefact
          </div>
          <div className="flex items-center gap-2 text-xs text-black/60 dark:text-white/50">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-300 flex-shrink-0" />
            Ecole Centrale de Lyon · University of Adelaide
          </div>
        </div>
      </div>

      {/* Skills scrolling strip */}
      <div className="lg:w-1/2 rounded-2xl bg-white/25 dark:bg-black/15 backdrop-blur-sm shadow-sm overflow-hidden flex flex-col justify-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-rose-500 dark:text-orange-400 px-6 pt-5 pb-3">Skills & Tools</p>
        <Infinitescroll />
      </div>
    </div>
  </div>
);

export default AboutPage;
