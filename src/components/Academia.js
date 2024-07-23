import {
  SpectrogramSection,
  SpectrogramSectionSmall,
} from "../components/academiacomponents/SpectrogramSection";
import {
  ThesisSection,
  ThesisSectionSmall,
} from "../components/academiacomponents/ThesisSection";

import {
  IRCAMSection,
  IRCAMSectionSmall,
} from "../components/academiacomponents/ircamSection";
import {
  AssignmentSection,
  AssignmentSectionSmall,
} from "../components/academiacomponents/assignments";

import AllHeader from "./subcomponents/header";

import { HeroSection } from "./academiacomponents/academiaHero";

import { useEffect, useState } from "react";

import { VscGithub } from "react-icons/vsc";
import { SiArxiv } from "react-icons/si";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";


const scrollto = (id) => {
  console.log("scrolling to " + id);
  let element = document.getElementById(id);
  element.scrollIntoView({ behavior: "smooth" });
};

const SectionHeader = ({ text }) => {
  return (
    <div className="h-auto lg:w-full lg:px-10">
      <div className="flex flex-row align-middle">
        <h2 className="font-inter text-2xl lg:text-4xl font-semibold first-letter:text-7xl first-letter:font-zighead first-letter:text-violet-600 dark:first-letter:text-violet-400">
          {" "}
          {text}
        </h2>
        <div className="mx-6 h-[1px] grow bg-black dark:bg-violet-300 self-center"></div>
      </div>
    </div>
  );
};

const AcademiaNav = () => {
  return (
    <nav class=" border-black md:flex  dark:border-white backdrop-filter backdrop-blur-2xl bg-opacity-70 border-[1px]  sticky grow z-50 lg:top-24 top-20 mb-16 hidden select-none">
      <div class="flex flex-wrap items-center justify-between w-full">
        {/* <div
              onClick={() => {
                scrollto("3");
              }}
              class="flex items-center cursor-pointer"
            >
              <span class="self-center text-xl font-semibold whitespace-nowrap hover:text-blue-500 active:scale-95 transition-all  duration-[20ms] active:text-blue-700">
                My Music
              </span>
            </div> */}

        <div class=" w-full flex " id="navbar-sticky">
          <ul class="flex w-full justify-evenly lg:text-base text-sm md:font-medium ">
            <li class=" lg:text-base text-sm border-black h-full grow cursor-pointer active:text-white dark:hover:bg-white dark:hover:text-violet-500 transition-colors duration-100 hover:bg-black hover:text-violet-300 p-2 text-center">
              <div
                class="subnav-tag"
                onClick={() => {
                  scrollto("thesis");
                }}
              >
                Masters' thesis
              </div>
            </li>
            <li class="  lg:text-base text-sm border-black h-full grow cursor-pointer dark:hover:bg-white dark:hover:text-violet-600 active:text-white transition-colors duration-100 hover:bg-black hover:text-violet-300 p-2 text-center">
              <div
                class="subnav-tag"
                onClick={() => {
                  scrollto("spectrogram");
                }}
              >
                Vocalist classification
              </div>
            </li>
            <li class=" lg:text-base text-sm border-black h-full grow cursor-pointer dark:hover:bg-white dark:hover:text-violet-600 active:text-white transition-colors duration-100 hover:bg-black hover:text-violet-300 p-2 text-center">
              <div
                class="subnav-tag"
                onClick={() => {
                  scrollto("ircam");
                }}
              >
                IRCAM research internship
              </div>
            </li>
            {/* <li class=" lg:text-base text-sm border-black h-full grow cursor-pointer dark:hover:bg-white dark:hover:text-violet-600 active:text-white transition-colors duration-100 hover:bg-black hover:text-violet-300 p-2 text-center">
              <div
                class="subnav-tag"
                onClick={() => {
                  scrollto("assignments");
                }}
              >
                Assignments
              </div>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

const AcademiaSection = () => {
  useEffect(() => {
    console.log(localStorage.theme);
    const timeout = setTimeout(() => setIsMounted(true), 10);
    animate();
    return () => clearTimeout(timeout);
  }, []);

  const [isMounted, setIsMounted] = useState(false);

  const animate = () => {};

  return (
    <div className="relative  dark:text-violet-50 lg:bg-cover bg-contain bg-repeat-round lg:bg-blur-3xl bg-blur-xl bg-opacity-25 lg:py-12 lg:px-32 p-6  scrollbar-hide">
      <AllHeader
        pagename={"Research"}
        hoveraccent={"emerald-200"}
        clickaccent={"sky-300"}
      />

      <div id="all">
        <div className="absolute top-0 left-0 bg-contain blur-3xl w-full h-full lg:hidden"></div>
        <div className="h-full w-screen absolute top-0 right-0 z-0 dark:opacity-50 opacity-0 transition-opacity duration-200 bg-black show" />
        <div className="relative">
          
          <AcademiaHeader text={"Publications"} />
          <div className="flex flex-col  lg:mt-0 mt-10 mb-10">
            <div className="w-full flex lg:flex-row justify-between">
              <div className="grow flex flex-col justify-between gap-5 lg:px-12 lg:text-base text-sm">
      
                <Paper
                  title={"Semi-Supervised Contrastive Learning of Musical Representations"}
                  authors={["Julien Guinot", "Elio Quinton", "George Fazekas"]}
                  affiliations={["Queen Mary University of London", "Universal Music Group"]}
                  affiliations_indices={["1,2", "2", "1"]}
                  venue={"25th International Society for Music Information Retrieval Conference (ISMIR 2024) "}
                  abstract={"Despite the success of contrastive learning in Music Information Retrieval, the inherent ambiguity of contrastive self-supervision presents a challenge. Relying solely on augmentation chains and self-supervised positive sampling strategies can lead to a pretraining objective that does not capture key musical information for downstream tasks. We introduce semi-supervised contrastive learning (SemiSupCon), a simple method for leveraging musically informed labeled data (supervision signals) in the contrastive learning of musical representations. Our approach introduces musically relevant supervision signals into self-supervised contrastive learning by combining supervised and self-supervised contrastive objectives in a simpler framework than previous approaches. This framework improves downstream performance and robustness to audio corruptions on a range of downstream MIR tasks with moderate amounts of labeled data. Our approach enables shaping the learned similarity metric through the choice of labeled data that (1) infuses the representations with musical domain knowledge and (2) improves out-of-domain performance with minimal general downstream performance loss. We show strong transfer learning performance on musically related yet not trivially similar tasks - such as pitch and key estimation. Additionally, our approach shows performance improvement on automatic tagging over self-supervised approaches with only 5\% of available labels included in pretraining."}
                  arxiv={"https://arxiv.org/abs/2407.13840"}
                  github={"https://github.com/Pliploop/SemiSupCon"}
                />
                </div>
              </div>
            </div>
          <AcademiaHeader text={"My Research"} />
          <HeroSection />
          <AcademiaHeader text={"Writing samples"} />

          <AcademiaNav />
          <div className="lg:px-10 w-full mb-0 lg:text-sm  text-sm text-black dark:text-white font-inter">
            <div className="w-full mb-20 text-justify">
              Some writing samples I've cooked up over the years through my studies and/or projects.
            </div>

            {/* <div className="w-full  mb-20 text-justify">
              Some of the other papers included in this section comprise{" "}
              <b>
                Research internships and project reports, assignments and
                practicals for classes in both France and Australia.
              </b>
              Unfortunately, some of the papers, specifically both of my
              research internship reports on{" "}
              <b>
                "Active control of the first vibrational modes of a cello" and
                "Impedance-based acoustic diode effect"{" "}
              </b>
              are in French. I've included translated abstracts for your
              convenience but have yet to translate the 120 pages. I hope to get
              to that soon. I've elected to include them in chronological order
              as it is also order of relevance to my research interests.
            </div> */}

            <div className="justify-center items-center lg:flex flex-col hidden">
              <ThesisSection />
              <SpectrogramSection />
              <IRCAMSection />
              {/* <AssignmentSection /> */}
            </div>

            <div className="justify-center items-center lg:hidden flex flex-col">
              {/* <ThesisSectionSmall /> */}
              <ThesisSectionSmall />
              <SpectrogramSectionSmall />
              <IRCAMSectionSmall />
              {/* <AssignmentSectionSmall /> */}
            </div>
            {/* <div className="justify-center items-center align-middle content-center lg:flex hidden">
          <div className=" flex flex-col content-center items-center justify-evenly w-6">
            <Timelinedot section={<ThesisSection />} />
            <FillerBar height={"500px"} />
            <Timelinedot section={<SpectrogramSection />} />
            <FillerBar height={"500px"} />
            <Timelinedot section={<></>} />
            <FillerBar height={"100px"} />
            <Timelinedot section={<></>} />
          </div>
        </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

const AcademiaHeader = ({ text }) => {
  return (
    <div className="lg:mb-16 mb-10">
      <SectionHeader text={text} />
    </div>
  );
};



// Write  a component for paper including fields for title, authors, venue, absract (default hidden), links to arxiv, github
// title, authors, venue and abstract should be vertically stacked
// arxiv and github badges should be on a div to the right of the abstract


const AuthorsAndAffiliations = ({ authors, affiliations, affiliations_indices }) => {
  // authors is an array of objects with name. The first author is always the first author
  // affiliations is an array of arrays with affiliations. one person can have multiple affiliations
  // authors and affiliations are the same length. affiliations are denoted with exponents. For example,
  // Julien Guinot ^1,2, George Fazekas^2, Elio Quinton^1
  // ^2Queen Mary University of London, ^1Universal Music Group
  // two vertically stacked divs, one for authors and one for affiliations
  return (
    <div className="flex flex-col gap-3">
      <div className="font-inter text-base text-gray-800 dark:text-white">
        {authors.map((author, index) => {
          return (
            <span key={index} className={`${index === 0 ? "font-black" : ""}`}>
              {author}<sup> {`${index == 0 ? "*" : ""}`}</sup><sup className="text-violet-500">{affiliations_indices[index]}</sup>
              {index < authors.length - 1 ? ", " : ""}
            </span>
          );
        })}

      </div>
      <div className="font-inter text-xs text-gray-600 dark:text-white">
        {affiliations.map((affiliation, index) => {
          return (
            <span key={index}>
              <sup className="text-violet-400">{index + 1}</sup>
              {affiliation}
              {index < affiliations.length - 1 ? ", " : ""}
            </span>
          );
        })}
      </div>
    </div>
  );
};

const Abstract = ({ abstract }) => {
  // expandable class that by default is hidden and can be expanded by clicking on it. Should contain 'show asbtract' button when hidden and 'hide abstract' when shown
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="flex flex-col gap-3">
      {/* create a div that expands and contracts with an animation based on isexanded */}
      <div

        className={`font-inter text-sm text-gray-500 ${
          isExpanded ? "h-auto" : "h-0"
        } overflow-hidden transition-all duration-200 dark:text-white italic`}
      >
        {abstract}
      </div>

      <div className="font-inter text-sm text-gray-800 dark:text-white cursor-pointer hover:text-violet-400 flex flex-row" onClick={() => setIsExpanded(!isExpanded)}>
        
        {/* down or up arrow depeding on expanded or no*/}
        {isExpanded ? "Hide abstract" : "Show abstract"}
        {isExpanded ? <IoIosArrowUp size={20} /> : <IoIosArrowDown size={20} />}
      </div>
    </div>
  );
};




const Paper = ({ title, authors, affiliations, affiliations_indices, venue, abstract, arxiv, github }) => {
  return (
    <div className="flex flex-row justify-between items-start gap-5">
      <div className="flex flex-col gap-3">
        <div className="font-inter text-lg font-semibold text-gray-800 dark:text-white">{title}</div>
        {/* first author is bolded and starred, attributions are denoted by exponents in purple, with map */}
        <AuthorsAndAffiliations authors={authors} affiliations={affiliations} affiliations_indices={affiliations_indices}/>
        <div className="font-inter text-sm text-black italic dark:text-white">{venue}</div>
        <Abstract abstract={abstract} />
      </div>
      <div className="flex flex-col gap-3 dark:text-white">
        <div className="flex flex-row gap-3">
          <a

            href={arxiv}
            target="_blank"
            rel="noopener noreferrer"

            className="rounded-2xl px-3 py-1 flex flex-row gap-3 items-center hover:text-violet-400"
          >
            <SiArxiv size={20} />
            <div className="font-inter text-xs hover:text-violet-400">
              ArXiv
            </div>
          </a>
          <a  href={github}

            target="_blank"
            rel="noopener noreferrer"

            className="rounded-full px-3 py-2 flex flex-row gap-3 items-center hover:text-violet-400"
          >
            <VscGithub size={20} />
            <div className="font-inter text-xs group-active:text-white">
              Github
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};




// function SpectrogramSection() {
//   // const [lang, setlang] = useState("english");

//   return (
//     <div className="absolute lg:w-2/3 md:w-[calc(100%-10rem)] w-[calc(100%-3rem)] h-56 flex flex-row justify-evenly lg:gap-16 gap-8 -mt-2">
//       <div className="lg:w-1/2 w-full h-full flex flex-col justify-start content-end items-end">
//         <div className="flex flex-col content-start items-end gap-3 w-full h-full">
//           <div className="text-lg font-inter font-bold text-gray-800 text-right mb-3">
//             {" "}
//             Artist classification through spectrogram learning
//           </div>
//           <div className="flex flex-row gap-3 text-[10px] font-inter text-blue-700 justify-end mb-5">
//             <Academiatag text={"Music Information Retrieval"} />
//             <Academiatag text={"Music Tagging"} />
//             <Academiatag text={"Machine Learning"} />
//             <Academiatag text={"Singing voice"} />
//           </div>
//           <div className="flex flex-row justify-between items-center gap-3 w-3/4 mb-3">
//             <div className="h-px grow bg-gray-500"></div>
//             <div className="font-inter lg:text-base text-sm text-gray-600">Context</div>
//             <div className="h-px grow bg-gray-500"></div>
//           </div>

//           <div className="font-inter text-[10.5px] text-justify flex flex-col gap-3 text-gray-800 w-3/4 mb-5">
//             <p>
//               At the university of adelaide, I took a project-based course
//               titled <b className="text-blue-600">Applied machine learning</b>{" "}
//               from july 2021 to february 2022. The goal was to identify a
//               problem that could be solved with ML, research state of the art
//               and devise and implement a solution, including data sourcing and
//               processing. This was my first time combining machine learning and
//               music into what I didn't know at the time is essentially MIR.
//             </p>
//             <p>
//               In hindsight, the paper isn't innovative, and the method can
//               clearly be improved. High overfitting, too large of a test set,
//               questonably sourced data... My PC also broke down during training
//               so I couldn't iterate on models. But this is the project that
//               really made me want to pursue MIR.{" "}
//               <b className="font-bold text-blue-600">
//                 This report and project earned me a 99/100
//               </b>
//             </p>
//           </div>

//           <div className="flex flex-row gap-5 items-center justify-end">
//             <a
//               href="/RecoNet.pdf"
//               target="_blank"
//               rel="noopener noreferrer"
//               className=" rounded-full px-3 py-2 bg-white flex flex-row gap-3 active:bg-red-500 active:scale-95 active:text-white select-none border-[1px] border-red-500 hover:border-red-400 text-red-500 hover:text-red-600 transition-all duration-[20ms] items-center shadow-sm shadow-gray-400 group hover:bg-gray-100 cursor-pointer"
//             >
//               <BsFileEarmarkPdf size={18} />
//               <div className="font-inter text-red-500 text-xs group-hover:text-red-600 group-active:text-white">
//                 View pdf
//               </div>
//             </a>
//             <a
//               href="/Deck.pdf"
//               target="_blank"
//               rel="noopener noreferrer"
//               className=" rounded-full px-3 py-2 bg-white flex flex-row gap-3 active:bg-orange-500 active:scale-95 active:text-white select-none border-[1px] border-orange-500 hover:border-orange-400 text-orange-500 hover:text-orange-600 transition-all duration-[20ms] items-center shadow-sm shadow-gray-400 group hover:bg-gray-100 cursor-pointer"
//             >
//               <SiMicrosoftpowerpoint size={18} />
//               <div className="font-inter text-orange-500 text-xs group-hover:text-orange-600 group-active:text-white">
//                 View Slide Deck
//               </div>
//             </a>
//             <a
//               href="https://github.com/Pliploop/Spectrogram_Artist_Recognition"
//               target="_blank"
//               rel="noopener noreferrer"
//               className=" rounded-full px-3 py-2 bg-white flex flex-row gap-3 active:bg-purple-500 active:scale-95 active:text-white select-none border-[1px] border-purple-500 hover:border-purple-400 text-purple-500 hover:text-purple-600 transition-all duration-[20ms] items-center shadow-sm shadow-gray-400 group hover:bg-gray-100 cursor-pointer"
//             >
//               <VscGithub size={18} />
//               <div className="font-inter text-purple-500 text-xs group-hover:text-purple-600 group-active:text-white">
//                 Github
//               </div>
//             </a>
//           </div>
//         </div>
//       </div>
//       <div className="lg:w-1/2 w-full h-full flex flex-col justify-start content-end items-start">
//         <div className="flex flex-row justify-between items-center gap-3 w-full mb-5">
//           <div className="h-px grow bg-gray-500"></div>
//           <div className="font-inter font-bold text-lg text-gray-600">
//             Abstract
//           </div>
//           <div className="h-px grow bg-gray-500"></div>
//         </div>
//         <div className="font-inter text-[10.5px] text-justify flex flex-col gap-3 text-gray-500">
//           <p>
//             Shazam is a music-identifying app which functions through
//             deterministic fingerprinting of their immense database and
//             cross-correlating real-time audio buffers to identify an ambient
//             song. Despite the power of the algorithm, and the wide use, the
//             Shazam algorithm lacks robustness to real-life situa- tions such as
//             live performances or remixes. This prompts this project. This paper
//             focuses on the proceedings and results obtained over the course of
//             the project to replicate Shazam’s functionality through deep
//             learning and mel-spectrograms.
//           </p>
//           <p>
//             Through Literature overview, we isolate relevant Music Information
//             Retrieval methods and models, as well as pre-processing and
//             augmentation steps for audio data to be used in the project.
//             Accuracy comparison for these models allows us to zero in on a given
//             architecture, which presents both techni- cal novelty, and a basis
//             for relevant performance. Further- more, this allows us to establish
//             a baseline prediction for accuracy: 70%
//           </p>
//           <p>
//             Data sourcing and pre-processing is conducted to obtain
//             discographies for various artists, segmented audio clips of isolated
//             vocals are then fed to the aforementioned model. Through training,
//             the model obtains 68% accuracy on never-before seen test data,
//             despite technical difficulties The proposed model learns coherent
//             features, but not in- depth enough, which prompts thinking about
//             next steps for the project, which could have performed much better
//             with the necessary hindsight.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

export default <AcademiaSection />;
