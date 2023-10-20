import { useState } from "react";
import { BsFileEarmarkPdf } from "react-icons/bs";
import {
  Timelinedot2,
  FillerBar,
  Academiatag,
  Tocitem,
  ShowMore,
  DeployGradient,
} from "./UnitComponents";

function ThesisSection() {
  // const [lang, setlang] = useState("english");
  const [abstractdeployed, setabstractdeployed] = useState(true);

  return (
    <div className="w-full flex flex-row justify-evenly lg:gap-16 gap-8 -mt-2">
      <div className="absolute show -mt-40 h-10 w-10 invisible" id="thesis" />
      <div className="w-1/2 flex flex-col justify-start content-end items-center mb-20">
        <div className="flex flex-row justify-between items-center gap-3 w-full mb-5">
          <div className="h-px grow bg-violet-500"></div>
          <div className="font-inter font-bold text-lg text-gray-800">
            Abstract
          </div>
          <div className="h-px grow bg-violet-500"></div>
        </div>
        <div
          className={`relative font-inter text-sm text-justify flex flex-col gap-3 text-gray-800 overflow-hidden transition-transform duration-200 ease-linear ${
            abstractdeployed ? "h-32" : "h-auto"
          }`}
        >
          <DeployGradient abstractdeployed={abstractdeployed} />
          <p>
            Recommendation systems have a notable and growing importance in the
            music industry. Be it music streaming platforms, music creation
            tools or music-related social network recommendations, recommender
            systems are part of our everyday music life. Groover specifically is
            a tech company aiming to create opportunities for independent music
            artists by allowing them to send tracks to industry professionnals
            to expand their network, receive feedback, or be promoted by said
            curator. This puts Groover in a specific spot in the recommender
            system space : recommending professionals, who are both users and
            products, to users.
          </p>
          <p>
            As a motivation to improve their current recommendation system, the
            R&D team at Groover wants to include audio features within the
            pipeline to 1. Denoise artist-chosen characteristics by basing
            artist tags on deterministic representation extraction models and 2.
            Providing a new feature of recommending relevant tags to artists
            based on their sample tracks. It is in this context that this
            master’s internship takes place. The goal is to research state of
            the art of music audio preprocessing techniques and automatic music
            tagging models for later implementation at scale into the
            recommendation system. Music tagging is the task of teaching
            learnable models to label music tracks with relevant labels, such as
            acoustic characteristics, genres, subgenres, instruments, etc.
          </p>
          <p>
            A comprehensive study of the state of the art is conducted,
            researching common audio preprocessing techniques in the context of
            machine learning applied to audio, audio tagging models and their
            performance on canonical datasets, and the available datasets to
            construct our own tagging task based in the state of the art.
          </p>
          <p>
            three datasets are exhibited that can be of use to this specific
            tagging task. After model selection based on multiple considerations
            3-4 models are selected to be benchmarked on a custom dataset. Four
            tagging types are isolated to be benchmarked upon : Genres,
            Subgenres, Mood/theme/instruments and All tags combined. A custom
            dataset and split is built for all four of these tagging types. .
            Trained models show competitive results with state of the art on
            appropriate metrics with room for improvement based on the novel
            task of music tagging proposed in this thesis. The interest of
            models as frozen representation learners and standalone learnable
            preprocessing blocks is argued. . Finally, the issue of multi
            instance classification is tackled and it is shown using song-level
            aggregation on the selected datasets that mean pooling results in
            better performance overall on song-level evaluation.
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
          <div className="text-lg font-inter font-bold text-gray-800 text-left mb-3">
            {" "}
            Masters' thesis : Automatic Music Tagging at Scale towards better
            Musical recommendations
          </div>
          <div className="flex flex-row gap-3 text-[10px] font-inter text-violet-700 justify-start mb-5 flex-wrap">
            <Academiatag text={"Music Information Retrieval"} />
            <Academiatag text={"Music Tagging"} />
            <Academiatag text={"Machine Learning"} />
            <Academiatag text={"Music technology"} />
          </div>
          <div className="flex flex-row gap-5 items-center justify-start">
            <a
              href="/TFE.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className=" rounded-full px-6 py-2 block-shadow bg-white flex flex-row gap-3 active:bg-red-500 active:scale-95 active:text-white select-none border-[1px] border-red-500 hover:border-red-400 text-red-500 hover:text-red-600 transition-all duration-[20ms] items-center shadow-sm shadow-gray-400 group hover:bg-gray-100 cursor-pointer"
            >
              <BsFileEarmarkPdf size={18} />
              <div className="font-inter text-red-500 text-xs group-hover:text-red-600 group-active:text-white">
                Open full pdf
              </div>
            </a>
          </div>

          {/* <div className="flex flex-col mt-6 items-start gap-3">
            <div className="text-base font-inter text-violet-500 font-bold text-left mb-3">
              Table of contents
            </div>
            <Tocitem
              num={"1."}
              text={"Context & recommender systems"}
              href={"./tfe1.pdf"}
            />
            <Tocitem
              num={"2."}
              text={"State of the art - audio preprocessing"}
              href={"./tfe2.pdf"}
            />
            <Tocitem
              num={"3."}
              text={"State of the art - Music Tagging Models"}
              href={"./tfe3.pdf"}
            />
            <Tocitem num={"4."} text={"Implementation"} href={"./tfe4.pdf"} />
            <Tocitem
              num={"5."}
              text={"Pipeline design & Model selection"}
              href={"./tfe5.pdf"}
            />
            <Tocitem num={"6."} text={"Results"} href={"./tfe6.pdf"} />
          </div> */}
        </div>
      </div>
    </div>
  );
}

function ThesisSectionSmall() {
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
            <div className="text-lg font-inter font-bold text-gray-800 text-left mb-3">
              {" "}
              Masters' thesis : Automatic Music Tagging at Scale towards better
              Musical recommendations
            </div>
            <div className="flex flex-row gap-3 text-[10px] font-inter text-violet-700 justify-start mb-5 flex-wrap">
              <Academiatag text={"Music Information Retrieval"} />
              <Academiatag text={"Music Tagging"} />
              <Academiatag text={"Machine Learning"} />
              <Academiatag text={"Music technology"} />
            </div>
            <div className="flex flex-row gap-5 items-center justify-start">
              <a
                href="/TFE.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className=" rounded-full px-6 py-2 bg-white flex block-shadow flex-row gap-3 active:bg-red-500 active:scale-95 active:text-white select-none border-[1px] border-red-500 hover:border-red-400 text-red-500 hover:text-red-600 transition-all duration-[20ms] items-center shadow-sm shadow-gray-400 group hover:bg-gray-100 cursor-pointer"
              >
                <BsFileEarmarkPdf size={18} />
                <div className="font-inter text-red-500 text-xs group-hover:text-red-600 group-active:text-white">
                  Open full pdf
                </div>
              </a>
            </div>

            {/* <div className="flex flex-col mt-6 items-start gap-3">
              <div className="text-base font-inter text-violet-500 font-bold text-left mb-3">
                Table of contents
              </div>
              <Tocitem
                num={"1."}
                text={"Context & recommender systems"}
                href={"./tfe1.pdf"}
              />
              <Tocitem
                num={"2."}
                text={"State of the art - audio preprocessing"}
                href={"./tfe2.pdf"}
              />
              <Tocitem
                num={"3."}
                text={"State of the art - Music Tagging Models"}
                href={"./tfe3.pdf"}
              />
              <Tocitem num={"4."} text={"Implementation"} href={"./tfe4.pdf"} />
              <Tocitem
                num={"5."}
                text={"Pipeline design & Model selection"}
                href={"./tfe5.pdf"}
              />
              <Tocitem num={"6."} text={"Results"} href={"./tfe6.pdf"} />
            </div> */}
          </div>
        </div>
        <div className="w-full flex flex-col justify-start content-end items-center mb-20">
          <div className="flex flex-row justify-between items-center gap-3 w-full mb-5">
            <div className="h-px grow bg-violet-500"></div>
            <div className="font-inter font-bold text-lg text-black">
              Abstract
            </div>
            <div className="h-px grow bg-violet-500"></div>
          </div>
          <div
            className={`relative font-inter text-sm text-justify flex flex-col gap-3 text-black overflow-hidden transition-transform duration-200 ease-linear ${
              abstractdeployed ? "h-20" : "h-auto"
            }`}
          >
            <DeployGradient abstractdeployed={abstractdeployed} />
            <p>
              Recommendation systems have a notable and growing importance in
              the music industry. Be it music streaming platforms, music
              creation tools or music-related social network recommendations,
              recommender systems are part of our everyday music life. Groover
              specifically is a tech company aiming to create opportunities for
              independent music artists by allowing them to send tracks to
              industry professionnals to expand their network, receive feedback,
              or be promoted by said curator. This puts Groover in a specific
              spot in the recommender system space : recommending professionals,
              who are both users and products, to users.
            </p>
            <p>
              As a motivation to improve their current recommendation system,
              the R&D team at Groover wants to include audio features within the
              pipeline to 1. Denoise artist-chosen characteristics by basing
              artist tags on deterministic representation extraction models and
              2. Providing a new feature of recommending relevant tags to
              artists based on their sample tracks. It is in this context that
              this master’s internship takes place. The goal is to research
              state of the art of music audio preprocessing techniques and
              automatic music tagging models for later implementation at scale
              into the recommendation system. Music tagging is the task of
              teaching learnable models to label music tracks with relevant
              labels, such as acoustic characteristics, genres, subgenres,
              instruments, etc.
            </p>
            <p>
              A comprehensive study of the state of the art is conducted,
              researching common audio preprocessing techniques in the context
              of machine learning applied to audio, audio tagging models and
              their performance on canonical datasets, and the available
              datasets to construct our own tagging task based in the state of
              the art.
            </p>
            <p>
              three datasets are exhibited that can be of use to this specific
              tagging task. After model selection based on multiple
              considerations 3-4 models are selected to be benchmarked on a
              custom dataset. Four tagging types are isolated to be benchmarked
              upon : Genres, Subgenres, Mood/theme/instruments and All tags
              combined. A custom dataset and split is built for all four of
              these tagging types. . Trained models show competitive results
              with state of the art on appropriate metrics with room for
              improvement based on the novel task of music tagging proposed in
              this thesis. The interest of models as frozen representation
              learners and standalone learnable preprocessing blocks is argued.
              . Finally, the issue of multi instance classification is tackled
              and it is shown using song-level aggregation on the selected
              datasets that mean pooling results in better performance overall
              on song-level evaluation.
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

export { ThesisSection, ThesisSectionSmall };
