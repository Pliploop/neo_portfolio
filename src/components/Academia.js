import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeToggle } from '../hooks/useThemeToggle';
import { useMeshGradient } from '../hooks/useMeshGradient';
import AllHeader from "./subcomponents/header";
import ContactFooter from "./subcomponents/contactfooter";
import NoiseOverlay from "./subcomponents/NoiseOverlay";
import { HiSun, HiMoon } from "react-icons/hi";
import { VscGithub } from "react-icons/vsc";
import { SiArxiv, SiGooglescholar } from "react-icons/si";
import { FaTrophy } from "react-icons/fa";
import { MdRecordVoiceOver } from "react-icons/md";
import { IoNewspaperSharp } from "react-icons/io5";
import { FaBook } from "react-icons/fa";
import { HiOutlineArrowUpRight, HiChevronDown, HiChevronUp } from "react-icons/hi2";
import { AiFillGithub } from "react-icons/ai";
import { papers } from '../data/papers';

const GRADIENT_COLORS = ["#FEA4B0", "#FECC96", "#FFFFFF", "#FFFFFF", "#FFF2B8"];
const GRADIENT_STYLE = { position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' };

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: '2025', label: '2025' },
  { id: '2024', label: '2024' },
  { id: 'oral', label: 'Oral' },
  { id: 'award', label: 'Award' },
  { id: 'journal', label: 'Journal' },
];

const TOPICS = [
  'Music AI', 'Multimodal Learning', 'Retrieval',
  'Self-supervised Learning', 'Representation Learning', 'Generative Models', 'Controllability',
];

// ─── Badges ───────────────────────────────────────────────────────────────────

const Badge = ({ icon, label, color }) => (
  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium ${color}`}>
    {icon}
    {label}
  </span>
);

const PaperBadges = ({ presentationType, awards, isJournal }) => {
  const badges = [];
  if (isJournal) badges.push(<Badge key="journal" icon={<FaBook size={10} />} label="Journal" color="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300" />);
  if (presentationType?.includes('oral')) badges.push(<Badge key="oral" icon={<MdRecordVoiceOver size={10} />} label="Oral" color="bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300" />);
  if (presentationType?.includes('poster')) badges.push(<Badge key="poster" icon={<IoNewspaperSharp size={10} />} label="Poster" color="bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300" />);
  if (awards) awards.forEach((a, i) => badges.push(<Badge key={i} icon={<FaTrophy size={10} />} label={a} color="bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300" />));
  return badges.length ? <div className="flex flex-wrap gap-1.5">{badges}</div> : null;
};

// ─── Authors ──────────────────────────────────────────────────────────────────

const Authors = ({ authors, affiliations, affiliations_indices, compact }) => {
  const myName = "Julien Guinot";
  return (
    <div className="flex flex-col gap-1">
      <p className={`${compact ? 'text-xs' : 'text-sm'} text-black/60 dark:text-white/55 leading-snug`}>
        {authors.map((author, i) => {
          const isMe = author === myName;
          const isFirst = i === 0;
          return (
            <span key={i}>
              <span className={`${isMe ? 'font-semibold text-rose-600 dark:text-orange-300' : ''} ${isFirst && !isMe ? 'font-medium text-black/80 dark:text-white/80' : ''}`}>
                {author}
              </span>
              <sup className="text-rose-400 dark:text-orange-400 text-[9px] ml-px">{affiliations_indices[i]}</sup>
              {i < authors.length - 1 ? <span className="text-black/25 dark:text-white/25"> · </span> : ''}
            </span>
          );
        })}
      </p>
      {!compact && (
        <p className="text-[10px] text-black/35 dark:text-white/30 leading-snug">
          {affiliations.map((a, i) => (
            <span key={i}><sup className="text-rose-400/70 dark:text-orange-400/70">{i + 1}</sup>{a}{i < affiliations.length - 1 ? '  ' : ''}</span>
          ))}
        </p>
      )}
    </div>
  );
};

// ─── Abstract toggle ──────────────────────────────────────────────────────────

const AbstractToggle = ({ abstract }) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-1 text-xs font-medium text-black/45 dark:text-white/40 hover:text-rose-500 dark:hover:text-orange-300 transition-colors duration-150 cursor-pointer"
      >
        Abstract
        {open ? <HiChevronUp size={13} /> : <HiChevronDown size={13} />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="mt-2.5 text-xs text-black/55 dark:text-white/50 leading-relaxed bg-black/3 dark:bg-white/4 rounded-lg px-3 py-2.5 italic">
              {abstract}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Links ────────────────────────────────────────────────────────────────────

const PaperLinks = ({ arxiv, github }) => (
  <div className="flex items-center gap-3">
    {arxiv && (
      <a href={arxiv} target="_blank" rel="noopener noreferrer"
        className="flex items-center gap-1.5 text-xs font-medium text-black/50 dark:text-white/45 hover:text-rose-600 dark:hover:text-orange-300 transition-colors duration-150">
        <SiArxiv size={13} /> arXiv <HiOutlineArrowUpRight size={10} />
      </a>
    )}
    {github && (
      <a href={github} target="_blank" rel="noopener noreferrer"
        className="flex items-center gap-1.5 text-xs font-medium text-black/50 dark:text-white/45 hover:text-rose-600 dark:hover:text-orange-300 transition-colors duration-150">
        <AiFillGithub size={13} /> GitHub <HiOutlineArrowUpRight size={10} />
      </a>
    )}
  </div>
);

// ─── Featured card ────────────────────────────────────────────────────────────

const FeaturedPaper = ({ paper }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35, ease: 'easeOut' }}
    className="relative rounded-2xl bg-white/35 dark:bg-black/20 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden group"
  >
    {/* Left accent bar */}
    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-rose-400 to-orange-300 opacity-70 group-hover:opacity-100 transition-opacity duration-200" />

    <div className="pl-5 pr-5 pt-4 pb-4 flex flex-col gap-3">
      {/* Top row: venue + badges */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-orange-400">{paper.venue}</span>
        <span className="text-black/15 dark:text-white/15 text-xs">·</span>
        <PaperBadges presentationType={paper.presentationType} awards={paper.awards} isJournal={paper.isJournal} />
      </div>

      {/* Title */}
      <h3 className="font-bold text-base lg:text-lg text-black/90 dark:text-white leading-snug">
        {paper.title}
      </h3>

      {/* One-line summary */}
      <p className="text-sm text-rose-700 dark:text-orange-200/80 leading-snug">
        {paper.summary}
      </p>

      {/* Authors */}
      <Authors authors={paper.authors} affiliations={paper.affiliations} affiliations_indices={paper.affiliations_indices} compact={false} />

      {/* Footer: links + abstract */}
      <div className="flex items-center justify-between pt-1 border-t border-black/5 dark:border-white/6">
        <PaperLinks arxiv={paper.arxiv} github={paper.github} />
        <AbstractToggle abstract={paper.abstract} />
      </div>
    </div>
  </motion.div>
);

// ─── Compact card ─────────────────────────────────────────────────────────────

const CompactPaper = ({ paper, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.25, ease: 'easeOut', delay: index * 0.04 }}
    className="rounded-xl bg-white/25 dark:bg-black/15 backdrop-blur-sm hover:bg-white/40 dark:hover:bg-black/25 transition-all duration-200 px-4 py-3 flex flex-col gap-2"
  >
    {/* Venue + badges */}
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="text-[11px] font-bold uppercase tracking-wider text-rose-500 dark:text-orange-400">{paper.venue}</span>
      {(paper.presentationType || paper.awards || paper.isJournal) && (
        <span className="text-black/15 dark:text-white/15 text-xs">·</span>
      )}
      <PaperBadges presentationType={paper.presentationType} awards={paper.awards} isJournal={paper.isJournal} />
    </div>

    {/* Title */}
    <h3 className="font-semibold text-sm text-black/85 dark:text-white leading-snug">
      {paper.title}
    </h3>

    {/* Summary */}
    <p className="text-xs text-black/50 dark:text-white/50 leading-snug">
      {paper.summary}
    </p>

    {/* Authors compact */}
    <Authors authors={paper.authors} affiliations={paper.affiliations} affiliations_indices={paper.affiliations_indices} compact />

    {/* Links + abstract */}
    <div className="flex items-center justify-between pt-0.5">
      <PaperLinks arxiv={paper.arxiv} github={paper.github} />
      <AbstractToggle abstract={paper.abstract} />
    </div>
  </motion.div>
);

// ─── Main page ────────────────────────────────────────────────────────────────

const AcademiaSection = () => {
  const { isDark, toggle } = useThemeToggle();
  const { MeshGradientRenderer, showGradient } = useMeshGradient();
  const [activeFilter, setActiveFilter] = useState('all');

  const featuredPapers = papers.filter(p => p.featured);

  const filteredPapers = papers.filter(p => {
    if (p.featured) return false;
    if (activeFilter === 'all') return true;
    if (activeFilter === '2025') return p.year === 2025;
    if (activeFilter === '2024') return p.year === 2024;
    if (activeFilter === 'oral') return p.presentationType?.includes('oral');
    if (activeFilter === 'award') return p.awards?.length > 0;
    if (activeFilter === 'journal') return p.isJournal;
    return true;
  });

  const years = [...new Set(filteredPapers.map(p => p.year))].sort((a, b) => b - a);

  return (
    <div className="relative dark:bg-gray-900 dark:text-rose-50 lg:py-12 lg:px-32 p-6 min-h-screen">
      {MeshGradientRenderer && (
        <div className={`transition-opacity duration-1000 ease-in-out ${showGradient ? 'opacity-60' : 'opacity-0'}`}>
          <MeshGradientRenderer style={GRADIENT_STYLE} colors={GRADIENT_COLORS} speed={0.01} />
          <NoiseOverlay opacity={0.45} blendMode="overlay" baseFrequency="0.5" />
        </div>
      )}

      <div className="relative z-10">
        <AllHeader pagename="Research" hoveraccent="orange-200" clickaccent="rose-300" />

        {/* ── Research statement ──────────────────────────── */}
        <div className="lg:px-14 lg:mt-10 mt-6 mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-rose-500 dark:text-orange-400 mb-2">Research</p>
          <h2 className="font-grande font-bold lg:text-4xl text-2xl dark:text-rose-50 mb-5">
            <span className="font-zighead text-rose-700 dark:text-orange-300 lg:text-6xl text-4xl">R</span>esearch
          </h2>
          <p className="lg:text-base text-sm text-black/70 dark:text-rose-50/75 lg:w-3/4 leading-relaxed mb-5">
            I work on controllable music AI — building foundation models for text-music retrieval, multimodal understanding, and steerable generation. My research focuses on what it means for a machine to understand music the way a musician does: semantically, expressively, and with intent.
          </p>
          <div className="flex flex-wrap gap-2 mb-2">
            {TOPICS.map(t => (
              <span key={t} className="px-2.5 py-1 rounded-full text-xs bg-rose-400/10 dark:bg-orange-400/8 text-rose-700 dark:text-orange-300 font-medium">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* ── Featured publications ──────────────────────── */}
        <div className="lg:px-14 mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-rose-500 dark:text-orange-400 mb-2">Highlighted</p>
          <h2 className="font-bold lg:text-2xl text-xl dark:text-rose-50 mb-6">Featured Publications</h2>
          <div className="flex flex-col gap-4">
            {featuredPapers.map((paper, i) => (
              <FeaturedPaper key={i} paper={paper} />
            ))}
          </div>
        </div>

        {/* ── Selected publications ──────────────────────── */}
        <div className="lg:px-14 mb-24">
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-rose-500 dark:text-orange-400 mb-1">All work</p>
              <h2 className="font-bold lg:text-2xl text-xl dark:text-rose-50">Selected Publications</h2>
            </div>
          </div>

          {/* Filter chips */}
          <div className="flex flex-wrap gap-2 mb-8">
            {FILTERS.map(f => (
              <button
                key={f.id}
                type="button"
                onClick={() => setActiveFilter(f.id)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-150 cursor-pointer ${
                  activeFilter === f.id
                    ? 'bg-rose-500 text-white shadow-sm shadow-rose-300/40'
                    : 'bg-black/6 dark:bg-white/8 text-black/55 dark:text-white/55 hover:bg-black/10 dark:hover:bg-white/14'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex flex-col gap-6"
            >
              {years.map(year => {
                const yearPapers = filteredPapers.filter(p => p.year === year);
                if (!yearPapers.length) return null;
                return (
                  <div key={year}>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-bold text-black/30 dark:text-white/25 uppercase tracking-wider">{year}</span>
                      <div className="h-px flex-1 bg-black/8 dark:bg-white/8" />
                    </div>
                    <div className="flex flex-col gap-2">
                      {yearPapers.map((paper, i) => (
                        <CompactPaper key={i} paper={paper} index={i} />
                      ))}
                    </div>
                  </div>
                );
              })}

              {filteredPapers.length === 0 && (
                <p className="text-sm text-black/35 dark:text-white/30 py-4">No publications match this filter.</p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Academic profiles ──────────────────────────── */}
        <div className="lg:px-14 mb-20">
          <div className="h-px bg-black/6 dark:bg-white/8 mb-8" />
          <p className="text-xs font-semibold uppercase tracking-widest text-rose-500 dark:text-orange-400 mb-4">Find me on</p>
          <div className="flex flex-wrap gap-3">
            <a href="https://scholar.google.com/citations?user=pk3boQEAAAAJ&hl=en" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/30 dark:bg-white/6 backdrop-blur-sm text-sm font-medium text-black/65 dark:text-white/60 hover:text-rose-600 dark:hover:text-orange-300 hover:bg-white/50 dark:hover:bg-white/12 transition-all duration-150">
              <SiGooglescholar size={15} /> Google Scholar <HiOutlineArrowUpRight size={12} />
            </a>
            <a href="https://arxiv.org/search/?searchtype=author&query=Guinot%2C+J" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/30 dark:bg-white/6 backdrop-blur-sm text-sm font-medium text-black/65 dark:text-white/60 hover:text-rose-600 dark:hover:text-orange-300 hover:bg-white/50 dark:hover:bg-white/12 transition-all duration-150">
              <SiArxiv size={15} /> arXiv <HiOutlineArrowUpRight size={12} />
            </a>
            <a href="https://github.com/Pliploop" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/30 dark:bg-white/6 backdrop-blur-sm text-sm font-medium text-black/65 dark:text-white/60 hover:text-rose-600 dark:hover:text-orange-300 hover:bg-white/50 dark:hover:bg-white/12 transition-all duration-150">
              <AiFillGithub size={15} /> GitHub <HiOutlineArrowUpRight size={12} />
            </a>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/30 dark:bg-white/6 backdrop-blur-sm text-sm font-medium text-black/65 dark:text-white/60 hover:text-rose-600 dark:hover:text-orange-300 hover:bg-white/50 dark:hover:bg-white/12 transition-all duration-150">
              CV <HiOutlineArrowUpRight size={12} />
            </a>
          </div>
        </div>

        <ContactFooter />
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

export default AcademiaSection;
