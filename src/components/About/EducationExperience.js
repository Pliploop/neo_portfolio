import React, { useState, useEffect, useRef } from "react";
import {
  SiPython,
  SiPytorch,
  SiTensorflow,
  SiMicrosoftazure,
  SiApplemusic,
  SiJupyter,
  SiPandas,
} from "react-icons/si";
import { GiPencil, GiNotebook, GiSoundWaves } from "react-icons/gi";
import { FaGitAlt } from "react-icons/fa";
import { BsGrid3X3 } from "react-icons/bs";
import { CiWavePulse1 } from "react-icons/ci";
import { BiLogoAws } from "react-icons/bi";


const educationData = [
  {
    title: "PhD student - AI and music",
    company: "@Queen Mary University of London (QMUL)",
    dates: "September 2023 - present",
    description: ["Item 1", "Item 2"],
    skills: [
      <SiPytorch size={26} />,
      <SiPython size={26} />,
      <GiNotebook size={26} />,
      <GiPencil size={26} />,
    ],
    skillnames: ["Pytorch", "Python", "Research", "Writing"],
  },
  {
    title: "MSc Engineering - Acoustics, Data Science",
    company: "@University of Adelaide",
    dates: "June 2021 - December 2022",
    description: ["Item 1", "Item 2"],
    skills: [
      <SiPytorch size={26} />,
      <SiPython size={26} />,
      <GiNotebook size={26} />,
      <GiPencil size={26} />,
    ],
    skillnames: ["Pytorch", "Python", "Research", "Writing"],
  },
  {
    title: "MSc Engineering, Diplôme d'ingénieur",
    company: "@Ecole Centrale de Lyon",
    dates: "September 2020 - December 2022",
    description: ["Item 1", "Item 2"],
    skills: [
      <SiPytorch size={26} />,
      <SiPython size={26} />,
      <GiNotebook size={26} />,
      <GiPencil size={26} />,
    ],
    skillnames: ["Pytorch", "Python", "Research", "Writing"],
  },
  {
    title: "BSc Engineering, Diplôme d'ingénieur",
    company: "@Ecole Centrale de Lyon",
    dates: "September 2018 - September 2020",
    description: ["Item 1", "Item 2"],
    skills: [
      <SiPytorch size={26} />,
      <SiPython size={26} />,
      <GiNotebook size={26} />,
      <GiPencil size={26} />,
    ],
    skillnames: ["Pytorch", "Python", "Research", "Writing"],
  },
  // Add more education entries if needed
];

const experienceData = [
  {
    title: "PhD student",
    company: "@Universal Music Group",
    dates: "September 2023 - Present",
    description: [
      "Pursuing my PhD under the cosupervision of Queen Mary University of London and Elio Quinton from Universal Music Group",
      "Within the Music and Audio Machine Learning team, I will be working on leveraging the potential of self-supervised learning for musical audio.",
      "To this end, I'll be devising music-specific architectures and training techniques, leveraging domain knowledge and human-in-the-loop, and building multiscale and hierarchical models for music understanding.",
    ],
    skills: [
      <SiPytorch size={26} />,
      <SiPython size={26} />,
      <GiNotebook size={26} />,
      <GiPencil size={26} />,
    ],
    skillnames: ["Pytorch", "Python", "Research", "Writing"],
  },
  {
    title: "Research Scientist Intern",
    company: "@Sony CSL Paris",
    dates: "February 2023 - September 2023",
    description: [
      "Under the superivision of Stefan Lattner, I researched audio-conditioned symbolic music generation for live jamming and producing",
      "Wrote a yet-to-be-published paper with conclusive results and interesting contributions beyond symbolic music.",
    ],
    skills: [
      <SiPytorch size={26} />,
      <SiPython size={26} />,
      <GiNotebook size={26} />,
      <GiPencil size={26} />,
    ],
    skillnames: ["Pytorch", "Python", "Research", "Writing"],
  },
  {
    title: "Data Scientist",
    company: "@Believe",
    dates: "October 2022 - January 2023",
    description: [
      "Built a bad revenue copyright strike identification pipeline from user consumption metrics",
      "Implemented data ingestion pipelines using Snowflake, PySpark, and machine learning models, reaching 93% accuracy on fraudulent revenue prediction with potential tripling of weekly processed claim by supporting the labelling team’s efforts",
    ],
    skills: [
      <SiPython size={26} />,
      <BiLogoAws size={26} />,
      <SiJupyter size={26} />,
      <SiPandas size={26} />,
    ],
    skillnames: ["Python", "AWS", "Jupyter", "Pandas"],
  },
  {
    title: "Data Scientist / MIR R&D Intern",
    company: "@Groover",
    dates: "March 2022 - September 2022",
    description: [
      "Masters' thesis : Automatic Music Tagging at scale towards better musical recommendations",
      "Built a full data wrangling/preprocessing pipeline for open source audio datasets (MTAT, MTG-Jamendo, GTZAN, FMA) towards large-scale training of music tagging models",
      "Benchmarked, selected and fine-tuned state of the art audio tagging models for at-scale integration into a recommendation system for independent artists.",
      "Developed research culture at Groover via bi-weekly synthesis of state of the art papers in the MIR field & writing vulgarization articles for Medium.",
    ],
    skills: [
      <SiPython size={26} />,
      <SiTensorflow size={26} />,
      <GiNotebook size={26} />,
      <SiApplemusic size={26} />,
    ],
    skillnames: ["Python", "Tensorflow", "Research", "MIR"],
  },
  {
    title: "Data Science Consultant Intern",
    company: "@Artefact",
    dates: "March 2021 - September 2021",
    description: [
      "Worked as a data science consultant with various clients, implementing and testing machine learning algorithms",
      "Created a bulk labelling web app towards greatly reducing the amount of time spent labelling data samples in NLP appplications",
      "Participated in the creation of a sentiment analysis pipeline for an ENGIE internal call desk: implemented sentiment analysis on speech-to-text generated dialog from phone calls.",
      "Worked with Mecanicus, a car pricing company towards implementing a custom layer-structured fuzzy matcher algorithm to match market listings to their clean database",
    ],
    skills: [
      <SiPython size={26} />,
      <SiTensorflow size={26} />,
      <SiMicrosoftazure size={26} />,
      <FaGitAlt size={26} />,
    ],
    skillnames: ["Python", "Tensorflow", "Azure", "Git"],
  },
  {
    title: "Musical Acoustics Research Intern",
    company: "@IRCAM",
    dates: "March 2020 - June 2020",
    description: [
      "Worked with a research team towards implementing active modal control of the first vibrational modes of a cello.",
      "Used matlab to simulate the sound produced by a struck or bowed cello string with coupling to the body. with state of the art error rate for plucked strings",
      "Conducted thorough bibliography analysis of state of the art simulation methods.",
    ],
    skills: [
      <GiSoundWaves size={26} />,
      <BsGrid3X3 size={26} />,
      <CiWavePulse1 size={26} />,
      <GiPencil size={26} />,
    ],
    skillnames: ["Acoustics", "Matlab", "DSP", "Research"],
  },
  // Add more experience entries if needed
];

const jobtitles = ["UMG", "SonyCSL", "Believe", "Groover", "Artefact", "IRCAM"];
const educationtitles = [
  "Queen Mary U of London (PhD)",
  "University of Adelaide (MSc)",
  "Ecole Centrale de Lyon (MSc)",
  "Ecole Centrale de Lyon (BSc)",
];

const SkillTab = ({ IconComponent, skillName }) => {
  return (
    <div className="w-full h-16 flex flex-col lg:flex-row justify-start items-center lg:space-x-6 mt-3 lg:mt-0">
      <div className="hover:text-rose-500 transition-colors duration-100  flex lg:scale-100 scale-75 flex-col justify-center h-full">
        {IconComponent}
      </div>
      <div className="lg:text-md text-sm flex lg:flex-col flex-row justify-center h-full">
        {skillName}
      </div>
    </div>
  );
};

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
    console.log(content);
    
    setActiveTabId(0);
    changecontent(0,educationExp)
  }, [educationExp]);

  useEffect(() => {
    console.log("");
  }, []);

  const changecontent = (i, educationExp) => {
    educationExp === "education"
      ? setContent(educationData[i])
      : setContent(experienceData[i]);
  };

  return (
    <div className="w-full lg:px-14 flex flex-col jusitfy-center select-none lg:mt-0 mt-6">
      <div
        className="w-full h-full flex justify-start border-x-[1px] border-t-[1px] border-black bg-rose-100  rounded-t-xl   block-shadow-md"
        id="folder-view-top"
      >
        <div className="flex flex-row justify-evenly items-center px-3 space-x-3 border-b-[1px] border-black">
          <div className="h-3 w-3 border-1 rounded-full pressable border-black bg-green-500"></div>
          <div className="h-3 w-3 border-1 rounded-full pressable border-black bg-yellow-500"></div>
          <div className="h-3 w-3 border-1 rounded-full pressable border-black bg-rose-500"></div>
        </div>

        <div className="h-16 w-10 border-b-[1px] border-black"></div>
        <div className="flex flex-col justify-end">
          <div
            className={`lg:w-32 lg:px-0 px-6 ${
              educationExp == "education"
                ? " bg-rose-50 border-t-0 lg:h-full h-8"
                : " bg-black text-rose-300 lg:h-8 h-6"
            } border-black border-[1px] lg:border-t-[0px] border-t-[1px] border-b-0 flex flex-col text-center rounded-t-xl justify-center lg:text-base transition-all duration-200`}
            id="EducationTab"
            onClick={() => {
              // toggleTab();

              // changecontent(activeTabId, educationExp);

              setEducationExp(
                educationExp === "education" ? "experience" : "education"
              );
            }}
          >
            Education
          </div>
        </div>
        <div className="h-16 w-2 border-b-[1px]  border-black"></div>
        <div className="flex flex-col justify-end">
          <div
            className={`hover:cursor-pointer lg:w-32 lg:px-0 px-6 ${
              educationExp == "experience"
                ? " bg-rose-50 border-t-0 text-black lg:h-full h-8 "
                : "bg-black text-rose-300 lg:h-8 h-6"
            } border-black border-x-[1px] lg:border-t-[0px] border-t-[1px] border-b-0  flex flex-col text-center rounded-t-xl justify-center lg:text-base transition-all duration-200`}
            id="ExperienceTab"
            onClick={() => {
              // toggleTab();
              // changecontent(activeTabId, educationExp);

              setEducationExp(
                educationExp === "education" ? "experience" : "education"
              );
            }}
          >
            {" "}
            Experience
          </div>
        </div>

        <div
          className="h-16 grow border-b-[1px]  border-black"
          id="EducationTab"
        ></div>
      </div>
      <div className="h-full w-full lg:p-12 p-6 block-shadow-md border-x-[1px] border-black rounded-b-xl bg-rose-50 flex lg:flex-row flex-col justify-between transition-all duration-200">
        <div className="lg:w-1/4">
          <div
            className={`lg:h-72 flex transition-opacity transition-visibility duration-500 flex-row ${
              educationExp === "experience"
                ? "opacity-100 flex"
                : "opacity-0 hidden"
            }`}
          >
            <div
              className={`h-full w-[1px] lg:flex hidden flex-row justify-center bg-black ${
                educationExp === "experience"
                  ? "opacity-100 flex"
                  : "opacity-0 hidden"
              }`}
            >
              <div
                className={`absolute w-[4px] z-50 h-12 lg:flex bg-black hidden`}
                style={{
                  transform: `translateY(${translateY}px)`,
                  transition: "transform 0.2s ease",
                }}
              ></div>
            </div>
            <div
              id="timeline"
              className={`lg:h-auto lg:mb-0 mb-6 w-full border-black lg:flex-col flex-row justify-start lg:overflow-auto overflow-scroll transition-opacity transition-display duration-500 ${
                educationExp === "experience"
                  ? "opacity-100 flex"
                  : "opacity-0 hidden"
              }`}
            >
              {jobtitles &&
                jobtitles.map((job, i) => {
                  return (
                    <div
                      className="tab"
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
                      {job}
                    </div>
                  );
                })}
            </div>
          </div>

          <div
            className={`flex transition-opacity transition-display duration-500 flex-row ${
              educationExp === "education"
                ? "opacity-100 flex"
                : "opacity-0 hidden"
            }`}
          >
            <div
              className={` w-[1px] justify-center lg:flex hidden bg-black ${
                educationExp === "education"
                  ? "opacity-100 flex"
                  : "opacity-0 hidden"
              }`}
            >
              <div
                className={`absolute w-[4px] z-50 h-12 bg-black lg:flex hidden`}
                style={{
                  transform: `translateY(${translateY}px)`,
                  transition: "transform 0.2s ease",
                }}
              ></div>
            </div>
            <div
              id="timeline"
              className={`lg:h-auto lg:mb-0 mb-6 lg:w-full  border-black lg:flex-col flex-row justify-start lg:overflow-auto overflow-scroll transition-opacity transition-display duration-500 ${
                educationExp === "education"
                  ? "opacity-100 flex"
                  : "opacity-0 hidden"
              }`}
            >
              {educationtitles &&
                educationtitles.map((education, i) => {
                  return (
                    <div
                      className={`tab`}
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
                      {education}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <div
          className="lg:w-1/2 lg:px-6 flex flex-col items-left space-y-4"
          id="description"
          key={updateKey}
        >
          <div id="title" className="w-full text-lg">
            <span className="mr-2">{content.title}</span>
            <span>
              <a
                className="hover:cursor-pointer font-bold active:text-rose-300 duration-150 text-rose-600 hover:underline-offset-6 hover:underline"
                href={content.companyLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {content.company}
              </a>
            </span>
          </div>
          <div id="dates" className="text-sm text-rose-600">
            <span>{content.dates}</span>
          </div>
          <div id="description">
            <ul className="list-disc marker:text-orange-600 text-justify text-sm list-inside flex flex-col gap-3">
              {content.description.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div
          className="lg:w-1/5 lg:px-10 w-full flex flex-row justify-evenly lg:flex-col lg:justify-start "
          id="skills"
        >
          {content.skills.map((skill, i) => (
            <SkillTab
              key={i}
              IconComponent={skill}
              skillName={content.skillnames[i]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EducationExperience;
