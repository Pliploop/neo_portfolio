import { FaGraduationCap, FaLinkedinIn, FaMicroscope } from "react-icons/fa";
import { GiSuitcase } from "react-icons/gi";
import { BsGlobe, BsMedium } from "react-icons/bs";
import { VscGithub } from "react-icons/vsc";
import { HiMagnifyingGlassCircle } from "react-icons/hi2";
import { Academiatag2 } from "./UnitComponents";

export function HeroSection() {
  return (
    <div className="flex flex-col  lg:mt-0 mt-10">
      <div className="w-full flex lg:flex-row justify-between">
        <div className="grow flex flex-col justify-between gap-5 lg:px-12 lg:text-base text-sm">
          <div className="w-full">
            <p className=" text-black text-justify mb-3">
              {" "}
              I'm currently a PhD student at Queen Mary University of London in
              collaboration with Universal Music Group. <span className="font-bold">My PhD project focuses
              on refining self-supervised learning techniques for musical audio,
              to create interpretable, navigable and explainable learned
              representations.</span> 
            </p>

            <p className=" text-black text-justify mb-10">
              {" "}
              The research questions I'm interested in answering are:
            </p>
            <ul className="font-bold mb-6 dark:text-violet-200 text-violet-600 list-decimal list-inside">
              <li>
                How can we leverage domain knowledge to create so far
                underexplored music-specific tasks to disentangle learned
                representations?
              </li>
              <li>
                How can weak supervision from outside modalities further
                disentangle latent spaces and provide intuitive navigation means
                for users?
              </li>
              <li>
                Can human feedback improve the intuitive navigation of latent
                music representations?
              </li>
            </ul>

            <p>
              Through these questions I aim to create navigable, interpretable
              and multimodal latent spaces to help musicians create musicians
              and to further our understanding of music as a whole.
            </p>
            <br />
            <br />
          </div>
        </div>
      </div>
      <div className="grow w-full flex flex-col lg:flex-row justify-between mb-20">
        <ResearchSection />
      </div>
    </div>
  );
}

const ResearchIdeasSection = () => {
  return (
    <div className="h-auto lg:mb-0  lg:w-full lg:px-4">
      <div className="flex flex-row align-middle mb-5">
        <h2 className="font-inter text-lg font-semibold text-blue-400">
          {" "}
          Research projects
        </h2>
        <div className="mx-3 h-px grow bg-blue-400 self-center"></div>
        <HiMagnifyingGlassCircle
          size={24}
          className="self-center text-blue-400"
        />
      </div>
      <div className="flex flex-col gap-10">
        <p className="w-full font-inter text-gray-800 text-justify text-base">
          {" "}
          Recently, the surge in interest for AI generative creativity in the
          image and video (DALL-E, Stable Diffusion) domain has fascinated me
          and I would love to emulate the self-supervised multi-modal methods
          and meta-learning studies in these domains to the field of music. Here
          are a list of potential research projects I have - related to
          diffusion
        </p>
        <div className="lg:flex flex-row gap-10 font-inter text-blue-500 justify-center mb-5 flex-wrap hidden">
          <Academiatag2
            text={
              "(Text prompt / style) conditioned music / drum samples and grooves generation."
            }
          />
          <Academiatag2
            text={"Audio-informed time domain melody inpainting."}
          />

          <Academiatag2
            text={"context-informed time domain chord inpainting."}
          />
          <Academiatag2
            text={
              "source separation on similar monophonic sources, e.g. separating harmony lines from backing vocals."
            }
          />
          <Academiatag2 text={"Singing voice cloning"} />
          <Academiatag2 text={"Vocal register Segmentation"} />

          <Academiatag2 text={"Video classification for music tagging   "} />

          <Academiatag2
            text={"Melody-conditioned harmony line generation with diffusion"}
          />
        </div>
        <div className="w-full lg:hidden flex flex-col divide-y divide-blue-500 font-inter text-gray-800">
          <div className="py-3">
            {" "}
            (Text prompt / style) conditioned music / drum samples and grooves
            generation.
          </div>

          <div className="py-3">
            {" "}
            Audio-informed time domain melody inpainting.
          </div>
          <div className="py-3">
            {" "}
            context-informed time domain chord inpainting.
          </div>
          <div className="py-3">
            {" "}
            source separation on similar monophonic sources, e.g. separating
            harmony lines from backing vocals.
          </div>
          <div className="py-3"> Singing voice cloning</div>
          <div className="py-3"> Video classification for music tagging </div>
          <div className="py-3">
            {" "}
            Melody-conditioned harmony line generation with diffusion
          </div>
        </div>
        {/* <ul className="flex flex-row mb-5">
          <li className="text-base text-blue-500 font-inter justify-center">
            Research ideas
            <div className="grow h-px bg-blue-500 my-3"></div>
            <ul className="font-inter font-base text-sm text-gray-800  flex flex-col gap-2">
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li>Vocal Register Segmentation</li>
            </ul>
          </li>
        </ul> */}
      </div>
    </div>
  );
};

const EducationSubSection = () => {
  return (
    <div className="h-auto lg:mb-0  lg:w-full lg:px-4">
      <div className="flex flex-row align-middle">
        <h2 className="font-inter text-lg font-semibold text-blue-400">
          {" "}
          Education
        </h2>
        <div className="mx-3 h-px grow bg-blue-400 self-center"></div>
        <FaGraduationCap size={18} className="self-center text-blue-400" />
      </div>

      <ul className="relative border-l border-gray-200  mt-3">
        <li className="mb-3 ml-4">
          <div className="absolute w-3 h-3 bg-gray-200 rounded-full -left-1.5 border border-white   kbg-gray-700"></div>
          <time className="mb-1 text-sm font-normal leading-none text-gray-400  ktext-gray-500">
            2018-2022
          </time>
          <h3 className="text-sm font-semibold text-gray-900  ktext-white">
            MSc Engineering
          </h3>
          <h3 className="text-sm font-semibold text-gray-900  mb-2">
            BSc Engineering
          </h3>

          <p className="text-sm font-normal text-gray-500  ktext-gray-400">
            Ecole Centrale de Lyon - France
          </p>
          <p className="font-mono text-blue-500 text-sm mt-2">GPA: 3.6/4.0</p>
        </li>
        <li className="mb-3 ml-4">
          <div className="absolute w-3 h-3 bg-gray-200 rounded-full -left-1.5 border border-white   kbg-gray-700"></div>
          <time className="mb-1 text-sm font-normal leading-none text-gray-400  ktext-gray-500">
            2021-2022 - Abroad
          </time>
          <h3 className="text-sm font-semibold text-gray-900  ktext-white">
            MSc Engineering - Acoustics, Data Science
          </h3>
          <p className="text-sm font-normal text-gray-500  ktext-gray-400">
            University of Adelaide - Australia
          </p>
          <p className="font-mono text-blue-500 text-sm mt-2">GPA: 5.9/7</p>
        </li>
      </ul>
    </div>
  );
};

const ProfessionalSubsection = () => {
  return (
    <div className="h-auto lg:w-full lg:px-4 lg:ml-0">
      <div className="flex flex-row align-middle">
        <h2 className="font-inter text-lg font-semibold text-blue-400">
          {" "}
          Professional
        </h2>
        <div className="mx-3 h-px grow bg-blue-400 self-center"></div>
        <GiSuitcase size={18} className="self-center text-blue-400" />
      </div>
      <ul className="relative border-l border-gray-200  mt-3">
        <li className="mb-3 ml-4">
          <div className="absolute w-3 h-3 bg-gray-200 rounded-full -left-1.5 border border-white   kbg-gray-700"></div>
          <time className="mb-1 text-sm font-normal leading-none text-gray-400  ktext-gray-500">
            Oct 2022-Present
          </time>
          <h3 className="text-sm font-semibold text-gray-900  ktext-white">
            Data Scientist
          </h3>
          <p className="text-sm font-normal text-gray-500  ktext-gray-400">
            Believe
          </p>
        </li>
        <li className="mb-3 ml-4">
          <div className="absolute w-3 h-3 bg-gray-200 rounded-full -left-1.5 border border-white   kbg-gray-700"></div>
          <time className="mb-1 text-sm font-normal leading-none text-gray-400  ktext-gray-500">
            Apr 2022- Oct 2022
          </time>
          <h3 className="text-sm font-semibold text-gray-900  ktext-white">
            MIR Scientist / Data Scientist intern
          </h3>
          <p className="text-sm font-normal text-gray-500  ktext-gray-400">
            Groover
          </p>
        </li>
        <li className="mb-3 ml-4">
          <div className="absolute w-3 h-3 bg-gray-200 rounded-full -left-1.5 border border-white   kbg-gray-700"></div>
          <time className="mb-1 text-sm font-normal leading-none text-gray-400  ktext-gray-500">
            Mar 2021- Oct 2021
          </time>
          <h3 className="text-sm font-semibold text-gray-900  ktext-white">
            Data Scientist intern
          </h3>
          <p className="text-sm font-normal text-gray-500  ktext-gray-400">
            Artefact
          </p>
        </li>
        <li className="mb-3 ml-4">
          <div className="absolute w-3 h-3 bg-gray-200 rounded-full -left-1.5 border border-white"></div>
          <time className="mb-1 text-sm font-normal leading-none text-gray-400">
            Mar 2020- Oct 2020
          </time>
          <h3 className="text-sm font-semibold text-gray-900">
            Research Intern
          </h3>
          <p className="text-sm font-normal text-gray-500">IRCAM</p>
        </li>
      </ul>
    </div>
  );
};

const ContactLinks = () => {
  return (
    <div className="w-full grow flex lg:gap-5 flex-row align-middle content-center md:justify-start justify-evenly ">
      <a
        className="show pressable rounded-xl px-6 py-2"
        href="/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="lg:text-sm text-sm">My Resume</span>
      </a>
      <a
        href="https://www.github.com/Pliploop"
        className="contact-button group"
      >
        <VscGithub className="self-center" size={20} />
      </a>
      <a
        href="https://www.linkedin.com/in/julien-guinot"
        className="contact-button group"
      >
        <FaLinkedinIn className="self-center" size={16} />
      </a>
    </div>
  );
};

const ResearchSection = () => {
  return (
    <div className="h-auto lg:mb-0 mb-10 lg:w-2/3 grow lg:px-10">
      <div className="flex flex-row align-middle mb-6">
        <h2 className="font-inter text-lg font-semibold text-violet-500">
          {" "}
          Other research interests
        </h2>
        <div className="mx-3 h-px grow bg-black self-center"></div>
      </div>
      <div className="text-sm text-gray-800 font-inter text-justify">
        <p className="lg:mb-6 mb-10">
          {" "}
          My research interests lie at the intersection of music and Artificial
          Intelligence / Machine Learning. <span className="font-bold"> Self-Supervised learning for Musical
          Audio, Representation Learning. Multimodal learning. Human-in-the-loop
          for music. Music retrieval, Foley retrieval. Text-to-Music generation
          and understanding. Music Automatic Captioning. Music Information
          Retrieval. Audio effects with machine learning. Disentangled latent
          spaces for music </span>. I believe that advances in music technology powered
          by artficial intelligence can be powerful catalysts for creative
          musical outlets. As a vocalist, multiinstrumentalist, producer, mixing
          and mastering aficionado, my interests span a large range of current
          domains in sound and music computing.
        </p>
        {/* <ul className="flex lg:flex-row flex-col lg:gap-0 gap-10 justify-evenly mb-5 lg:px-0 px-10">
          <li className="text-base text-violet-500 font-inter text-center">
            {" "}
            Music Information Retrieval
            <div className="w-full h-px bg-violet-500 my-3"></div>
            <ul className="font-inter font-base text-sm text-gray-800 flex flex-col gap-2">
              <li> Music generation</li>
              <li> Automatic Music Transcription</li>
              <li> F0 estimation</li>
              <li> Source Separation</li>
              <li> Neural Audio Effects</li>
            </ul>
          </li>
          <li className="text-base text-blue-500 font-inter text-center">
            Methods
            <div className="w-full h-px bg-violet-500 my-3"></div>
            <ul className="font-inter font-base text-sm text-gray-800  flex flex-col gap-2">
              <li>Representation learning</li>
              <li>Self-supervised learning</li>
              <li>Multimodal representations</li>
              <li>Few-shot learning</li>
            </ul>
          </li>
        </ul> */}
      </div>
    </div>
  );
};

export default <HeroSection />;
