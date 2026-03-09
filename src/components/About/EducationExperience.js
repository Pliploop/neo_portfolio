import React, { useState, useEffect, useRef } from "react";
import { educationData, experienceData, jobtitles, educationtitles } from '../../data/education';


const EducationExperience = () => {
  const [educationExp, setEducationExp] = useState("education");

  const [activeTabId, setActiveTabId] = useState(0);

  const [updateKey, setUpdateKey] = useState(0);
  const [tabFocus, setTabFocus] = useState(null);
  const tabs = useRef([]);
  const translateY = activeTabId * 48;
  const [content, setContent] = useState(educationData[0]);

  const focusTab = () => {
    if (tabs.current[tabFocus]) {
      tabs.current[tabFocus].focus();
      return;
    }
    // If we're at the end, go to the start
    if (tabFocus >= tabs.current.length) {
      setTabFocus(0);
    }
    // If we're at the start, move to the end
    if (tabFocus < 0) {
      setTabFocus(tabs.current.length - 1);
    }
  };

  const toggleTab = () => {
    setContent(activeTabId, educationExp);
  };

  // Only re-run the effect if tabFocus changes
  useEffect(() => focusTab(), [tabFocus]);

  useEffect(() => {
    setActiveTabId(0);
    changecontent(0, educationExp);
  }, [educationExp]);


  const changecontent = (i, educationExp) => {
    educationExp === "education"
      ? setContent(educationData[i])
      : setContent(experienceData[i]);
  };

  const navigateToPrevious = () => {
    const currentData = educationExp === "education" ? educationData : experienceData;
    const newIndex = activeTabId === 0 ? currentData.length - 1 : activeTabId - 1;
    setActiveTabId(newIndex);
    changecontent(newIndex, educationExp);
  };

  const navigateToNext = () => {
    const currentData = educationExp === "education" ? educationData : experienceData;
    const newIndex = activeTabId === currentData.length - 1 ? 0 : activeTabId + 1;
    setActiveTabId(newIndex);
    changecontent(newIndex, educationExp);
  };

  return (
    <div className="w-full lg:px-14 flex flex-col jusitfy-center select-none lg:mt-2 mt-6">
      <div className="backdrop-blur-md bg-white/40 dark:bg-black/40 shadow-lg border border-black dark:border-white">
        <div
          className="w-full h-full flex lg:flex-row flex-col justify-start backdrop-blur-md bg-white/20 dark:bg-black/20 border-b border-black dark:border-white"
          id="folder-view-top"
        >

          <div className="h-16 w-10 lg:flex hidden"></div>
          <div className="flex flex-row h-12 lg:h-auto">
            <div className="flex flex-col justify-end">
              <div
                className={`lg:w-32 lg:px-0 px-6 ${
                  educationExp == "education"
                    ? "backdrop-blur-md bg-white/40 dark:bg-black/40 text-black dark:text-white lg:h-[90%] h-8 border-t border-l border-r border-black dark:border-white"
                    : "backdrop-blur-md bg-black/30 dark:bg-white/30 text-white dark:text-black lg:h-8 h-6 border-t border-l border-r border-black dark:border-white"
                } flex flex-col text-center justify-center lg:text-base transition-all duration-200`}
                id="EducationTab"
                onClick={() => {
                  setEducationExp(
                    educationExp === "education" ? "experience" : "education"
                  );
                }}
              >
                Education
              </div>
            </div>
            <div className="h-16 w-2 lg:flex hidden"></div>
            <div className="flex flex-col justify-end">
              <div
                className={`hover:cursor-pointer lg:w-32 lg:px-0 px-6 ${
                  educationExp == "experience"
                    ? "backdrop-blur-md bg-white/40 dark:bg-black/40 text-black dark:text-white lg:h-[90%] h-8 border-t border-l border-r border-black dark:border-white"
                    : "backdrop-blur-md bg-black/30 dark:bg-white/30 text-white dark:text-black lg:h-8 h-6 border-t border-l border-r border-black dark:border-white"
                } flex flex-col text-center justify-center lg:text-base transition-all duration-200`}
                id="ExperienceTab"
                onClick={() => {
                  setEducationExp(
                    educationExp === "education" ? "experience" : "education"
                  );
                }}
              >
                {" "}
                Experience
              </div>
            </div>
            <div className="w-full lg:hidden flex"></div>
          </div>

          <div
            className="h-16 grow lg:flex hidden"
            id="EducationTab"
          ></div>
        </div>
        <div className="h-full w-full p-6 pt-2 flex flex-col transition-all duration-200 min-h-[600px]">
          <div className="w-full mb-2">
            <div
              className={`flex transition-opacity transition-visibility duration-500 flex-row ${
                educationExp === "experience"
                  ? "opacity-100 flex"
                  : "opacity-0 hidden"
              }`}
            >
              {/* Desktop Navigation */}
              <nav className="w-full border-black dark:border-white backdrop-filter backdrop-blur-lg bg-opacity-90 border-[1px] bg-transparent flex flex-row justify-center select-none mb-4 lg:flex hidden">
                <div className="w-full flex items-center" id="navbar-sticky">
                  {/* Previous Button */}
                  <button
                    onClick={navigateToPrevious}
                    className="flex items-center justify-center w-8 h-8 mx-2 rounded-full bg-white/20 dark:bg-black/20 hover:bg-white/40 dark:hover:bg-black/40 border border-white/30 dark:border-black/30 hover:border-white/50 dark:hover:border-black/50 transition-all duration-200 hover:scale-110 active:scale-95 group"
                    aria-label="Previous tab"
                  >
                    <svg 
                      className="w-4 h-4 text-black dark:text-white group-hover:text-rose-600 dark:group-hover:text-orange-300 transition-colors duration-200" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                    </svg>
                  </button>
                  
                  <ul className="flex w-full justify-evenly lg:text-base text-sm md:font-medium">
                    {jobtitles &&
                      jobtitles.map((job, i) => {
                        return (
                          <li
                            className={`lg:text-base text-sm border-black dark:border-white h-full grow cursor-pointer transition-colors duration-100 p-2 text-center ${
                              activeTabId === i
                                ? "bg-white text-black border-x border-black dark:bg-white dark:text-black dark:border-white font-bold"
                                : "hover:bg-white hover:bg-opacity-20 hover:text-black dark:hover:bg-white dark:hover:text-black"
                            }`}
                            key={i}
                            isActive={activeTabId === i}
                            onClick={() => {
                              setActiveTabId(i);
                              changecontent(i, educationExp);
                            }}
                            ref={(el) => (tabs.current[i] = el)}
                            id={`tab-${i}`}
                            role="tab"
                            tabIndex={activeTabId === i ? "0" : "-1"}
                            aria-selected={activeTabId === i ? true : false}
                            aria-controls={`panel-${i}`}
                          >
                            <div className="subnav-tag">{job}</div>
                          </li>
                        );
                      })}
                  </ul>
                  
                  {/* Next Button */}
                  <button
                    onClick={navigateToNext}
                    className="flex items-center justify-center w-8 h-8 mx-2 rounded-full bg-white/20 dark:bg-black/20 hover:bg-white/40 dark:hover:bg-black/40 border border-white/30 dark:border-black/30 hover:border-white/50 dark:hover:border-black/50 transition-all duration-200 hover:scale-110 active:scale-95 group"
                    aria-label="Next tab"
                  >
                    <svg 
                      className="w-4 h-4 text-black dark:text-white group-hover:text-rose-600 dark:group-hover:text-orange-300 transition-colors duration-200" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
                    </svg>
                  </button>
                </div>
              </nav>

              {/* Mobile Navigation */}
              <nav className="w-full border-black dark:border-white backdrop-filter backdrop-blur-lg bg-opacity-90 border-[1px] bg-transparent flex flex-row justify-center select-none mb-4 lg:hidden flex">
                <div className="w-full flex items-center justify-between px-4" id="navbar-sticky">
                  {/* Previous Button */}
                  <button
                    onClick={navigateToPrevious}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 dark:bg-black/20 hover:bg-white/40 dark:hover:bg-black/40 border border-white/30 dark:border-black/30 hover:border-white/50 dark:hover:border-black/50 transition-all duration-200 hover:scale-110 active:scale-95 group"
                    aria-label="Previous tab"
                  >
                    <svg 
                      className="w-5 h-5 text-black dark:text-white group-hover:text-rose-600 dark:group-hover:text-orange-300 transition-colors duration-200" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                    </svg>
                  </button>
                  
                  {/* Current Item Name */}
                  <div className="flex-1 text-center px-4">
                    <span className="text-sm font-medium text-black dark:text-white">
                      {jobtitles[activeTabId]}
                    </span>
                  </div>
                  
                  {/* Next Button */}
                  <button
                    onClick={navigateToNext}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 dark:bg-black/20 hover:bg-white/40 dark:hover:bg-black/40 border border-white/30 dark:border-black/30 hover:border-white/50 dark:hover:border-black/50 transition-all duration-200 hover:scale-110 active:scale-95 group"
                    aria-label="Next tab"
                  >
                    <svg 
                      className="w-5 h-5 text-black dark:text-white group-hover:text-rose-600 dark:group-hover:text-orange-300 transition-colors duration-200" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
                    </svg>
                  </button>
                </div>
              </nav>
            </div>

            <div
              className={`flex transition-opacity transition-display duration-500 flex-row ${
                educationExp === "education"
                  ? "opacity-100 flex"
                  : "opacity-0 hidden"
              }`}
            >
              {/* Desktop Navigation */}
              <nav className="w-full border-black dark:border-white backdrop-filter backdrop-blur-lg bg-opacity-90 border-[1px] bg-transparent flex flex-row justify-center select-none mb-4 lg:flex hidden">
                <div className="w-full flex items-center" id="navbar-sticky">
                  {/* Previous Button */}
                  <button
                    onClick={navigateToPrevious}
                    className="flex items-center justify-center w-8 h-8 mx-2 rounded-full bg-white/20 dark:bg-black/20 hover:bg-white/40 dark:hover:bg-black/40 border border-white/30 dark:border-black/30 hover:border-white/50 dark:hover:border-black/50 transition-all duration-200 hover:scale-110 active:scale-95 group"
                    aria-label="Previous tab"
                  >
                    <svg 
                      className="w-4 h-4 text-black dark:text-white group-hover:text-rose-600 dark:group-hover:text-orange-300 transition-colors duration-200" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                    </svg>
                  </button>
                  
                  <ul className="flex w-full justify-evenly lg:text-base text-sm md:font-medium">
                    {educationtitles &&
                      educationtitles.map((education, i) => {
                        return (
                          <li
                            className={`lg:text-base text-sm border-black dark:border-white h-full grow cursor-pointer transition-colors duration-100 p-2 text-center ${
                              activeTabId === i
                                ? "bg-white text-black border-x border-black dark:bg-white dark:text-black dark:border-white font-bold"
                                : "hover:bg-white hover:bg-opacity-20 hover:text-black dark:hover:bg-white dark:hover:text-black"
                            }`}
                            key={i}
                            isActive={activeTabId === i}
                            onClick={() => {
                              setActiveTabId(i);
                              changecontent(i, educationExp);
                            }}
                            ref={(el) => (tabs.current[i] = el)}
                            id={`tab-${i}`}
                            role="tab"
                            tabIndex={activeTabId === i ? "0" : "-1"}
                            aria-selected={activeTabId === i ? true : false}
                            aria-controls={`panel-${i}`}
                          >
                            <div className="subnav-tag">{education}</div>
                          </li>
                        );
                      })}
                  </ul>
                  
                  {/* Next Button */}
                  <button
                    onClick={navigateToNext}
                    className="flex items-center justify-center w-8 h-8 mx-2 rounded-full bg-white/20 dark:bg-black/20 hover:bg-white/40 dark:hover:bg-black/40 border border-white/30 dark:border-black/30 hover:border-white/50 dark:hover:border-black/50 transition-all duration-200 hover:scale-110 active:scale-95 group"
                    aria-label="Next tab"
                  >
                    <svg 
                      className="w-4 h-4 text-black dark:text-white group-hover:text-rose-600 dark:group-hover:text-orange-300 transition-colors duration-200" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
                    </svg>
                  </button>
                </div>
              </nav>

              {/* Mobile Navigation */}
              <nav className="w-full border-black dark:border-white backdrop-filter backdrop-blur-lg bg-opacity-90 border-[1px] bg-transparent flex flex-row justify-center select-none mb-4 lg:hidden flex">
                <div className="w-full flex items-center justify-between px-4" id="navbar-sticky">
                  {/* Previous Button */}
                  <button
                    onClick={navigateToPrevious}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 dark:bg-black/20 hover:bg-white/40 dark:hover:bg-black/40 border border-white/30 dark:border-black/30 hover:border-white/50 dark:hover:border-black/50 transition-all duration-200 hover:scale-110 active:scale-95 group"
                    aria-label="Previous tab"
                  >
                    <svg 
                      className="w-5 h-5 text-black dark:text-white group-hover:text-rose-600 dark:group-hover:text-orange-300 transition-colors duration-200" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                    </svg>
                  </button>
                  
                  {/* Current Item Name */}
                  <div className="flex-1 text-center px-4">
                    <span className="text-sm font-medium text-black dark:text-white">
                      {educationtitles[activeTabId]}
                    </span>
                  </div>
                  
                  {/* Next Button */}
                  <button
                    onClick={navigateToNext}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 dark:bg-black/20 hover:bg-white/40 dark:hover:bg-black/40 border border-white/30 dark:border-black/30 hover:border-white/50 dark:hover:border-black/50 transition-all duration-200 hover:scale-110 active:scale-95 group"
                    aria-label="Next tab"
                  >
                    <svg 
                      className="w-5 h-5 text-black dark:text-white group-hover:text-rose-600 dark:group-hover:text-orange-300 transition-colors duration-200" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
                    </svg>
                  </button>
                </div>
              </nav>
            </div>
          </div>
          <div
            className="w-full flex flex-col items-left space-y-4 pt-4"
            id="description"
            key={updateKey}
          >
            <div id="title" className="w-full text-lg">
              <span className="mr-2">{content.title}</span>
              <span>
                <a
                  className="hover:cursor-pointer font-bold active:text-rose-300 duration-150 text-rose-600 dark:text-orange-300 hover:underline-offset-6 hover:underline"
                  href={content.companyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {content.company}
                </a>
              </span>
            </div>
            <div id="dates" className="text-sm text-rose-600 dark:text-orange-300">
              <span>{content.dates}</span>
            </div>
            <div id="description">
              <ul className="list-disc marker:text-orange-600 dark:marker:text-orange-400 text-sm list-inside flex flex-col gap-3 mb-10">
                {content.description.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <div className="flex flex-row gap-3">
              {content.links.map((item, i) => (
                  <a href={item} target="_blank" className="show px-4 py-2 text-rose-600 dark:text-orange-300 pressable rounded-lg border border-white/30 dark:border-black/30 text-sm backdrop-blur-md bg-white/20 dark:bg-black/20 hover:bg-white/30 dark:hover:bg-black/30 hover:border-white/50 dark:hover:border-black/50 transition-all duration-200 shadow-sm">{content.linktexts[i]}</a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationExperience;
