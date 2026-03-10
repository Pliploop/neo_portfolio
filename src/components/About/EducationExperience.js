import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { educationData, experienceData, jobtitles, educationtitles } from '../../data/education';

const EducationExperience = () => {
  // Single compound state — section + tabId always change atomically,
  // so content = currentData[tabId] can never be undefined.
  const [selection, setSelection] = useState({ section: "education", tabId: 0 });
  const chipRefs = useRef([]);
  const didMountRef = useRef(false);

  const isEducation = selection.section === "education";
  const currentTitles = isEducation ? educationtitles : jobtitles;
  const currentData = isEducation ? educationData : experienceData;
  const content = currentData[selection.tabId];

  useEffect(() => {
    if (!didMountRef.current) { didMountRef.current = true; return; }
    const el = chipRefs.current[selection.tabId];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [selection]);

  return (
    <div className="w-full lg:px-14 flex flex-col lg:mt-2 mt-6 select-none">

      {/* Segmented pill toggle */}
      <div className="flex mb-8">
        <div className="flex bg-black/5 dark:bg-white/8 rounded-full p-1 shadow-inner gap-1">
          {["education", "experience"].map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={selection.section === tab}
              onClick={() => setSelection({ section: tab, tabId: 0 })}
              className={`px-6 py-2 rounded-full text-sm capitalize font-medium transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 ${
                selection.section === tab
                  ? "bg-white dark:bg-black/60 shadow-md text-rose-600 dark:text-orange-300 font-bold"
                  : "text-black/50 dark:text-white/40 hover:text-black dark:hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Item chips — horizontal scroll on mobile */}
      <div
        className="flex gap-2 overflow-x-auto pb-2 mb-6"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        role="tablist"
        aria-label={isEducation ? "Education items" : "Experience items"}
      >
        {currentTitles.map((title, i) => (
          <button
            key={`${selection.section}-${i}`}
            type="button"
            role="tab"
            aria-selected={selection.tabId === i}
            ref={(el) => (chipRefs.current[i] = el)}
            onClick={() => setSelection(prev => ({ ...prev, tabId: i }))}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 ${
              selection.tabId === i
                ? "bg-rose-400/20 dark:bg-orange-400/15 text-rose-700 dark:text-orange-300 font-semibold shadow-sm"
                : "bg-white/20 dark:bg-black/20 backdrop-blur-sm text-black/70 dark:text-white/60 hover:bg-white/40 dark:hover:bg-white/10 hover:text-black dark:hover:text-white"
            }`}
          >
            {title}
          </button>
        ))}
      </div>

      {/* Content card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${selection.section}-${selection.tabId}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="rounded-2xl bg-white/30 dark:bg-black/20 backdrop-blur-sm shadow-lg p-6 lg:p-8 min-h-[360px]"
          role="tabpanel"
          aria-label={currentTitles[selection.tabId]}
          tabIndex={0}
        >
          {/* Title + company */}
          <div className="flex flex-col gap-1 mb-4">
            <h3 className="text-lg font-semibold dark:text-white">
              {content.title}{" "}
              <a
                className="font-bold text-rose-600 dark:text-orange-300 hover:underline underline-offset-4 transition-all duration-150 active:text-rose-300"
                href={content.companyLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {content.company}
              </a>
            </h3>
            <span className="text-sm font-medium text-rose-500 dark:text-orange-400">
              {content.dates}
            </span>
          </div>

          {/* Divider */}
          <div className="h-px bg-black/8 dark:bg-white/10 mb-5 rounded-full" />

          {/* Description */}
          <ul className="flex flex-col gap-3 mb-6">
            {content.description.map((item, i) => (
              <li key={i} className="flex gap-3 text-sm dark:text-rose-50 leading-relaxed">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-rose-400 dark:bg-orange-400 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {/* Links */}
          {content.links && content.links.length > 0 && (
            <div className="flex flex-row flex-wrap gap-3">
              {content.links.map((link, i) => (
                <a
                  key={i}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-sm font-medium text-rose-600 dark:text-orange-300 rounded-xl bg-white/40 dark:bg-black/30 backdrop-blur-sm shadow-sm hover:shadow-md hover:bg-white/60 dark:hover:bg-white/10 transition-all duration-200"
                >
                  {content.linktexts[i]}
                </a>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default EducationExperience;
