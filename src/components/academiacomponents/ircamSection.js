import { useState } from "react";
import { BsFileEarmarkPdf } from "react-icons/bs";
import {
  Timelinedot2,
  FillerBar,
  Academiatag,
  ShowMore,
  DeployGradient,
} from "./UnitComponents";

function IRCAMSection() {
  // const [lang, setlang] = useState("english");
  const [abstractdeployed, setabstractdeployed] = useState(true);

  return (
    <div className="w-full flex flex-row justify-evenly lg:gap-16 gap-8 -mt-2">
      <div className="absolute show -mt-40 h-10 w-10 invisible" id="ircam"/>
      <div className="w-1/2 flex flex-col justify-start content-end items-center mb-20">
        <div className="flex flex-row justify-between items-center gap-3 w-full mb-5">
          <div className="h-px grow bg-gray-500 dark:bg-violet-300"></div>
          <div className="font-inter font-bold text-lg  dark:text-violet-300  ">
            Abstract
          </div>
          <div className="h-px grow bg-gray-500 dark:bg-violet-300"></div>
        </div>
        <div
          className={`relative font-inter text-sm text-justify flex flex-col gap-3     overflow-hidden transition-transform duration-200 ease-linear ${
            abstractdeployed ? "h-32" : "h-auto"
          }`}
        >
          <DeployGradient abstractdeployed={abstractdeployed} />
          <p>
            This paper aims to exhibit theoretical implementation of active
            control of the first vibrational modes of cello strings via state
            representation, as well as simulation methods and simulation results
            for pizzicato-excited string vibrations coupled with the cello
            plate. Choosing a relevant physical model for the strings’ vibration
            allows bibliographical exploitation to achieve theoretical results.
            Time-domain and modal simulation results show convincing realism of
            string sounds, both damped and undamped, coupled with a soundboard
            and uncoupled, and a theoretical transfer function for active string
            control was achieved.
          </p>
          <p>
            While time-domain implicit and explicit resolution exhibits spectral
            accuracy divergence for higher frequencies, green-function modal
            synthesis holds well at high frequencies with less than 1% error on
            the significant modes. Modal synthesis proves to be the most
            accurate method of string simulation as well as the most prone to
            implementing the active control algorithm. In the specific case of
            the damped coupled string, the gain matrix for the transducer
            controller to be physically implemented was able to be formalized
            entirely. Additionally, a model for coupled string vibrations in the
            frequency domain was built based on previous biliographical work,
            and proved to fit well based on labmeasured cello mobilities. These
            simulation and theoretical findings pave the way towards numeric
            simulation verification of the theoretical results and experimental
            implementation while taking into account sensor and transducer
            transfer functions
          </p>
        </div>
        <ShowMore
          isdeployed={abstractdeployed}
          setdeployed={setabstractdeployed}
        />
      </div>
      <div className="flex flex-col items-center gap-0">
        <Timelinedot2 />
        <FillerBar />
      </div>
      <div className="w-1/2 h-full flex flex-col justify-end content-start items-start  mb-20">
        <div className="flex flex-col content-start gap-3 w-full h-full">
          <div className="text-lg font-inter font-bold     text-left mb-3">
            {" "}
            Research Internship{" "}
            <a href="https://www.IRCAM.fr" className="text-bold dark:text-sky-300 text-violet-500">
              @IRCAM
            </a>{" "}
            : Active control of the first vibrational modes of a cello.
          </div>
          <div className="flex flex-row justify-between items-center gap-3 w-full mb-3">
            <div className="h-px grow bg-gray-500"></div>
            <div className="font-inter text-base    ">Context</div>
            <div className="h-px grow bg-gray-500"></div>
          </div>

          <div className="font-inter text-sm text-justify flex flex-col gap-3     w-full mb-5">
            <p>
              In the second year of my masters at Ecole Centrale de Lyon, I
              undertook a research internship at IRCAM, Paris, in which I
              implemented active control of the first vibrational modes of a
              cello. Though very interesting, the experimental aspect was thrown
              off by covid which forced the internship into a remote setting.
            </p>
            <p>
              Though the paper is written in French, it should provide a
              relevant overview of my paper-writing capacities in the purely
              formatic sense. I have included a translated abstract here as
              well.
            </p>
          </div>
          <div className="flex flex-row gap-3 text-[10px] font-inter text-violet-700 justify-start mb-5 flex-wrap">
            <Academiatag text={"Musical Acoustics"} />
            <Academiatag text={"Research"} />
            <Academiatag text={"Applied Physics"} />
          </div>
          <div className="flex flex-row gap-5 items-center justify-start">
            <a
              href="/ircam.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className=" rounded-full px-6 py-2 bg-white block-shadow flex flex-row gap-3 active:bg-red-500 active:scale-95 active:text-white select-none border-[1px] border-red-500 hover:border-red-400 text-red-500 hover:text-red-600 transition-all duration-[20ms] items-center group hover:bg-gray-100 cursor-pointer"
            >
              <BsFileEarmarkPdf size={18} />
              <div className="font-inter text-red-500 text-xs  group-hover:text-red-600 group-active:text-white">
                Open full pdf
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function IRCAMSectionSmall() {
  // const [lang, setlang] = useState("english");
  const [abstractdeployed, setabstractdeployed] = useState(true);

  return (
    <div className="w-full flex flex-row justify-evenly lg:gap-16 gap-8 -mt-2">
      <div className="flex flex-col items-center gap-0">
        <Timelinedot2 />
        <FillerBar />
      </div>
      <div className="flex flex-col">
        <div className="w-full h-full flex flex-col justify-end content-start items-start  mb-20">
          <div className="flex flex-col content-start gap-3 w-full h-full">
            <div className="text-lg font-inter font-bold     text-left mb-3">
              {" "}
              Research Internship{" "}
              <a
                href="https://www.IRCAM.fr"
                className="text-bold dark:text-sky-300 text-violet-500"
              >
                @IRCAM
              </a>{" "}
              : Active control of the first vibrational modes of a cello.
            </div>
            <div className="font-inter text-sm text-justify flex flex-col gap-3     w-full mb-5">
              <p>
                In the second year of my masters at Ecole Centrale de Lyon, I
                undertook a research internship at IRCAM, Paris, in which I
                implemented active control of the first vibrational modes of a
                cello. Though very interesting, the experimental aspect was
                thrown off by covid which forced the internship into a remote
                setting.
              </p>
              <p>
                Though the paper is written in French, it should provide a
                relevant overview of my paper-writing capacities in the purely
                formatic sense. I have included a translated abstract here as
                well.
              </p>
            </div>
            <div className="flex flex-row gap-3 text-[10px] font-inter text-violet-700 justify-start mb-5 flex-wrap">
              <Academiatag text={"Musical Acoustics"} />
              <Academiatag text={"Research"} />
              <Academiatag text={"Applied Physics"} />
            </div>
            <div className="flex flex-row gap-5 items-center justify-start">
              <a
                href="/ircam.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className=" rounded-full px-6 py-2 bg-white block-shadow flex flex-row gap-3 active:bg-red-500 active:scale-95 active:text-white select-none border-[1px] border-red-500 hover:border-red-400 text-red-500 hover:text-red-600 transition-all duration-[20ms] items-center shadow-sm shadow-gray-400 group hover:bg-gray-100 cursor-pointer"
              >
                <BsFileEarmarkPdf size={18} />
                <div className="font-inter text-red-500 text-xs group-hover:text-red-600 group-active:text-white">
                  Open full pdf
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col justify-start content-end items-center mb-20">
          <div className="flex flex-row justify-between items-center gap-3 w-full mb-5">
            <div className="h-px grow bg-gray-500 dark:bg-violet-300"></div>
            <div className="font-inter font-bold text-lg  dark:text-violet-300  ">
              Abstract
            </div>
            <div className="h-px grow bg-gray-500 dark:bg-violet-300"></div>
          </div>

          <div
            className={`relative font-inter text-sm text-justify flex flex-col gap-3     overflow-hidden transition-transform duration-200 ease-linear ${
              abstractdeployed ? "h-56" : "h-auto"
            }`}
          >
            <DeployGradient abstractdeployed={abstractdeployed} />
            <p>
              This paper aims to exhibit theoretical implementation of active
              control of the first vibrational modes of cello strings via state
              representation, as well as simulation methods and simulation
              results for pizzicato-excited string vibrations coupled with the
              cello plate. Choosing a relevant physical model for the strings’
              vibration allows bibliographical exploitation to achieve
              theoretical results. Time-domain and modal simulation results show
              convincing realism of string sounds, both damped and undamped,
              coupled with a soundboard and uncoupled, and a theoretical
              transfer function for active string control was achieved.
            </p>
            <p>
              While time-domain implicit and explicit resolution exhibits
              spectral accuracy divergence for higher frequencies,
              green-function modal synthesis holds well at high frequencies with
              less than 1% error on the significant modes. Modal synthesis
              proves to be the most accurate method of string simulation as well
              as the most prone to implementing the active control algorithm. In
              the specific case of the damped coupled string, the gain matrix
              for the transducer controller to be physically implemented was
              able to be formalized entirely. Additionally, a model for coupled
              string vibrations in the frequency domain was built based on
              previous biliographical work, and proved to fit well based on
              labmeasured cello mobilities. These simulation and theoretical
              findings pave the way towards numeric simulation verification of
              the theoretical results and experimental implementation while
              taking into account sensor and transducer transfer functions
            </p>
          </div>
          <ShowMore
            isdeployed={abstractdeployed}
            setdeployed={setabstractdeployed}
          />
        </div>
      </div>
    </div>
  );
}

export { IRCAMSection, IRCAMSectionSmall };
