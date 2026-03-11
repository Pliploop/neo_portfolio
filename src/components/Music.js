import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeToggle } from '../hooks/useThemeToggle';
import { useMeshGradient } from '../hooks/useMeshGradient';
import AllHeader from "./subcomponents/header";
import ContactFooter from "./subcomponents/contactfooter";
import NoiseOverlay from "./subcomponents/NoiseOverlay";
import { SiSpotify } from "react-icons/si";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { HiSun, HiMoon } from "react-icons/hi";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import ReactPlayer from "react-player";
import { MusicMixMaster } from "../components/Music/musicmixmaster";
import { tracks } from "../data/music";
import image from "../content/images/logo_countour.png";

const GRADIENT_COLORS = ["#FEA4B0", "#FECC96", "#FFFFFF", "#FFFFFF", "#FFF2B8"];
const GRADIENT_STYLE = { position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' };

const FONKEY_TRACKS = [
  { title: 'Colors',              url: 'https://youtu.be/bPJmExJGmmU?si=fmyTaD-uRQMCqCqc',                    original: 'Black Pumas' },
  { title: 'Lover Boy',           url: 'https://www.youtube.com/watch?v=MUyIXcaW89s&ab_channel=FonkeyBusiness', original: 'Phum Vifurit' },
  { title: "Don't Stop the Music",url: 'https://youtu.be/sIvH9gapjvc?si=MeHXO4TSO0XmGfcq',                    original: 'Jamie Cullum' },
  { title: 'Redbone',             url: 'https://www.youtube.com/watch?v=9fj4GnkUb2o',                          original: 'Childish Gambino' },
];

// ─── Shared section heading ───────────────────────────────────────────────────

const SectionLabel = ({ label, title }) => (
  <div className="lg:px-14 mb-8">
    <p className="text-xs font-semibold uppercase tracking-widest text-rose-500 dark:text-orange-400 mb-2">{label}</p>
    <h2 className="font-bold lg:text-2xl text-xl dark:text-rose-50">{title}</h2>
  </div>
);

const Separator = () => (
  <div className="w-full h-px bg-black/6 dark:bg-white/8 lg:my-14 my-10" />
);

// ─── Fonkey Business ──────────────────────────────────────────────────────────

const FonkeySection = () => {
  const [activeTrack, setActiveTrack] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const prev = () => setActiveTrack(i => (i - 1 + FONKEY_TRACKS.length) % FONKEY_TRACKS.length);
  const next = () => setActiveTrack(i => (i + 1) % FONKEY_TRACKS.length);

  return (
    <div className="lg:px-14">
      {/* Title block */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-6 gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-rose-500 dark:text-orange-400 mb-2">The Band</p>
          <h2 className="font-grande font-bold lg:text-4xl text-2xl dark:text-rose-50">
            <span className="font-zighead text-rose-700 dark:text-orange-300 lg:text-6xl text-4xl">F</span>onkey{" "}
            <span className="font-saint text-rose-400 dark:text-orange-200 lg:text-5xl text-3xl">B</span>usiness
          </h2>
        </div>
        <div className="flex gap-2">
          {['Funk', 'Soul', 'RnB', 'Live'].map(tag => (
            <span key={tag} className="px-2.5 py-1 rounded-full text-xs bg-rose-400/10 dark:bg-orange-400/8 text-rose-700 dark:text-orange-300 font-medium">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex lg:flex-row flex-col gap-8">
        {/* Left: player + tabs */}
        <div className="lg:flex-1 flex flex-col">
          {/* Tab bar */}
          <div className="flex items-center gap-2 mb-3">
            <button type="button" onClick={prev}
              className="h-7 w-7 rounded-full bg-white/30 dark:bg-white/8 flex items-center justify-center hover:bg-white/50 dark:hover:bg-white/15 transition-colors duration-150 cursor-pointer">
              <HiChevronLeft size={14} className="text-black/60 dark:text-white/60" />
            </button>
            <div className="flex gap-1 overflow-x-auto scrollbar-hide">
              {FONKEY_TRACKS.map((t, i) => (
                <button key={i} type="button" onClick={() => setActiveTrack(i)}
                  className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-150 cursor-pointer ${
                    activeTrack === i
                      ? 'bg-rose-500 text-white shadow-sm'
                      : 'bg-white/30 dark:bg-white/8 text-black/55 dark:text-white/55 hover:bg-white/50 dark:hover:bg-white/15'
                  }`}>
                  {t.title}
                </button>
              ))}
            </div>
            <button type="button" onClick={next}
              className="h-7 w-7 rounded-full bg-white/30 dark:bg-white/8 flex items-center justify-center hover:bg-white/50 dark:hover:bg-white/15 transition-colors duration-150 cursor-pointer">
              <HiChevronRight size={14} className="text-black/60 dark:text-white/60" />
            </button>
          </div>

          {/* Video */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTrack}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full aspect-video rounded-2xl overflow-hidden shadow-lg"
            >
              <ReactPlayer width="100%" height="100%" url={FONKEY_TRACKS[activeTrack].url} controls />
            </motion.div>
          </AnimatePresence>

          {/* Credit line */}
          <p className="mt-2.5 text-xs text-black/35 dark:text-white/30">
            Cover of <span className="font-medium text-black/50 dark:text-white/45">{FONKEY_TRACKS[activeTrack].original}</span>
            {" "}· Bass, mixing & mastering by Julien Guinot
          </p>
        </div>

        {/* Right: info panel */}
        <div className="lg:w-72 flex flex-col gap-5">
          {/* Logo + socials */}
          <div className="rounded-2xl bg-white/30 dark:bg-black/20 backdrop-blur-sm shadow-sm p-4 flex flex-row items-center gap-4">
            <img src={image} alt="Fonkey Business" className="w-20 filter grayscale opacity-60 dark:opacity-40 flex-shrink-0" />
            <div className="flex flex-col gap-2">
              <p className="text-xs text-black/40 dark:text-white/35 leading-snug">Funk-soul-RnB band. Live studio versions, original covers.</p>
              <div className="flex gap-3">
                <a href="https://open.spotify.com/artist/fonkeybusiness" target="_blank" rel="noreferrer"
                  className="text-black/40 dark:text-white/40 hover:text-rose-500 dark:hover:text-orange-300 transition-colors duration-150">
                  <SiSpotify size={18} />
                </a>
                <a href="https://www.instagram.com/fonkeybusiness" target="_blank" rel="noreferrer"
                  className="text-black/40 dark:text-white/40 hover:text-rose-500 dark:hover:text-orange-300 transition-colors duration-150">
                  <BiLogoInstagramAlt size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* My roles */}
          <div className="rounded-2xl bg-white/25 dark:bg-black/15 backdrop-blur-sm p-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-rose-500 dark:text-orange-400 mb-3">My roles</p>
            <div className="flex flex-wrap gap-1.5">
              {['Bassist', 'Mixing Engineer', 'Mastering Engineer', 'Choir lead'].map(r => (
                <span key={r} className="px-2 py-0.5 rounded-full text-xs bg-black/5 dark:bg-white/8 text-black/60 dark:text-white/55 font-medium">{r}</span>
              ))}
            </div>
          </div>

          {/* Tracklist */}
          <div className="rounded-2xl bg-white/25 dark:bg-black/15 backdrop-blur-sm p-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-rose-500 dark:text-orange-400 mb-3">Setlist</p>
            <ul className="flex flex-col gap-1.5">
              {FONKEY_TRACKS.map((t, i) => (
                <li key={i}>
                  <button type="button" onClick={() => setActiveTrack(i)}
                    className={`w-full text-left flex items-center gap-2 text-xs py-1 transition-colors duration-150 cursor-pointer ${
                      activeTrack === i ? 'text-rose-600 dark:text-orange-300 font-semibold' : 'text-black/50 dark:text-white/45 hover:text-rose-500 dark:hover:text-orange-300'
                    }`}>
                    <span className={`w-1 h-1 rounded-full flex-shrink-0 ${activeTrack === i ? 'bg-rose-500' : 'bg-black/20 dark:bg-white/20'}`} />
                    {t.title}
                    <span className="ml-auto text-black/25 dark:text-white/20">{t.original}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Original productions ─────────────────────────────────────────────────────

const TracksSection = () => (
  <div className="lg:px-14">
    <SectionLabel label="Solo Work" title="Original Productions" />
    <div className="grid lg:grid-cols-3 grid-cols-1 gap-5">
      {tracks.map((track, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.08, ease: 'easeOut' }}
          className="flex flex-col gap-3"
        >
          <div className="aspect-square rounded-2xl overflow-hidden shadow-md">
            <iframe
              width="100%" height="100%"
              scrolling="no" frameBorder="no" allow="autoplay"
              title={track.title}
              src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(track.url)}&color=%23111111&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true`}
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-black/80 dark:text-white leading-snug">{track.title}</p>
            <div className="flex flex-wrap gap-1 mt-1.5">
              {track.tags.map(tag => (
                <span key={tag} className="px-2 py-0.5 rounded-full text-[11px] bg-black/5 dark:bg-white/8 text-black/50 dark:text-white/45 font-medium">{tag}</span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

// ─── Main page ────────────────────────────────────────────────────────────────

const MusicSection = () => {
  const { isDark, toggle } = useThemeToggle();
  const { MeshGradientRenderer, showGradient } = useMeshGradient();

  return (
    <div className="dark:bg-gray-900 relative dark:text-white lg:py-12 lg:px-32 p-6 min-h-screen overflow-x-hidden">
      {MeshGradientRenderer && (
        <div className={`absolute inset-0 w-full h-full z-0 pointer-events-none transition-opacity duration-1000 ease-in-out ${showGradient ? 'opacity-100' : 'opacity-0'}`}>
          <MeshGradientRenderer style={GRADIENT_STYLE} colors={GRADIENT_COLORS} speed={0.008} />
          <NoiseOverlay opacity={0.45} blendMode="overlay" baseFrequency="0.5" />
        </div>
      )}
      <div className="h-full w-full absolute top-0 left-0 z-0 dark:opacity-50 opacity-0 transition-opacity duration-200 bg-black pointer-events-none" />

      <div className="relative z-10">
        <AllHeader pagename="Music" hoveraccent="rose-200" clickaccent="rose-300" />

        {/* Intro */}
        <div className="lg:px-14 lg:mt-10 mt-6 mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-rose-500 dark:text-orange-400 mb-2">Sound</p>
          <h2 className="font-grande font-bold lg:text-5xl text-3xl dark:text-rose-50 mb-4">
            <span className="font-zighead text-rose-700 dark:text-orange-300 lg:text-8xl text-5xl">M</span>y{" "}
            <span className="font-saint text-rose-400 dark:text-orange-200 lg:text-7xl text-4xl">M</span>usic
          </h2>
          <p className="lg:text-base text-sm text-black/60 dark:text-rose-50/65 lg:w-1/2 leading-relaxed">
            Musician, producer, mixing engineer, and DJ. I make funk, soul, and electronic music — mostly to feel things, sometimes to make others feel things too.
          </p>
        </div>

        <FonkeySection />
        <Separator />
        <TracksSection />
        <Separator />

        {/* Mix & Mastering */}
        <div className="lg:px-14">
          <SectionLabel label="Mix & Mastering" title="Commuz' Musical Theatre" />
          <MusicMixMaster />
        </div>

        <div className="mt-14">
          <ContactFooter />
        </div>
      </div>

      {/* Mobile theme toggle */}
      <div className="fixed bottom-6 right-6 z-[100] lg:hidden">
        <button onClick={toggle}
          className="h-12 w-12 rounded-full backdrop-blur-md bg-white/40 dark:bg-black/40 flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-200 shadow-lg">
          {isDark ? <HiSun size={24} className="text-yellow-500" /> : <HiMoon size={24} className="text-gray-700" />}
        </button>
      </div>
    </div>
  );
};

export default MusicSection;
