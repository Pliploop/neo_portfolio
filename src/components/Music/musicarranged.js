import { IoMusicalNotesSharp } from "react-icons/io5";

import ReactPlayer from "react-player";

const MusicArranged = () => {
  return (
    <div className="h-auto w-full flex lg:flex-row flex-col lg:justify-between gap-6 lg:gap-10 lg:px-10">
      
      <div className="lg:w-1/3 h-full rounded-3xl flex flex-col  p-5 transition-all duration-75">
        <h2 className=" text-xl font-inter font-bold  mb-3">
          Santiana - solo choir
        </h2>
        <div className="flex flex-col align-top items-start content-start h-full grow mb-10 rounded-b-xl overflow-clip block-shadow">
          <div className="rounded-t-xl border-1 border-black bg-white h-10 w-full flex flex-row justify-start items-center ">
            <div className="items-center px-3 space-x-2 flex flex-row mr-10">
              <div className="h-3 w-3 border-1 rounded-full pressable border-black bg-green-500"></div>
              <div className="h-3 w-3 border-1 rounded-full pressable border-black bg-yellow-500"></div>
              <div className="h-3 w-3 border-1 rounded-full pressable border-black bg-rose-500"></div>
            </div>
          </div>
          <ReactPlayer
            width={"100%"}
            height={"100%"}
            url="https://www.youtube.com/watch?v=wOYzFccbHPg"
          />
        </div>
        
        <p className="  text-sm font-inter   text-justify mb-6">
          During the second lockdown, sea shanties were all the rage. I wanted
          to perform a choir cover of santiano - a french sea shanty - with
          friends, but none of us could meet up and only I had a microphone.
          Most of them gave up rather quickly, but I figured - why not perform
          all the parts myself? And so I did. I arranged the track, recorded it,
          and mixed-mastered it in FL Studio. Though my register is naturally
          bass, I decided to give myself some rather high tenor lines to push
          myself on this one.
        </p>
      </div>
      <div className="lg:w-1/3 h-full rounded-3xl flex flex-col p-5 transition-all duration-75 ">
        <h2 className=" text-xl font-inter font-bold mb-3">
          Misty mountains - solo choir
        </h2>
        
        <div className="flex flex-col align-top items-start content-start h-full grow mb-10 rounded-b-xl overflow-clip block-shadow">
          <div className="rounded-t-xl border-1 border-black bg-white h-10 w-full flex flex-row justify-start items-center ">
            <div className="items-center px-3 space-x-2 flex flex-row mr-10">
              <div className="h-3 w-3 border-1 rounded-full pressable border-black bg-green-500"></div>
              <div className="h-3 w-3 border-1 rounded-full pressable border-black bg-yellow-500"></div>
              <div className="h-3 w-3 border-1 rounded-full pressable border-black bg-rose-500"></div>
            </div>
          </div>
          <ReactPlayer
            width={"100%"}
            height={"100%"}
            url="https://soundcloud.com/jujgui/misty-moutains?si=7f2aff6b73ba4b6a87195593ef93508e&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing"
          />
        </div>
        <p className="  text-sm font-inter   text-justify mb-6">
          I love singing low - I am a bass after all - and wanted to try myself
          at subharmonics and solo choir arrangements. So, I arranged this track
          from the hobbit - Misty mountains - into a solo bass/baritone choir
          for which I performed all the parts. I mixed it using ableton and
          remastered it a few months later. I specifically loved learning
          subharmonic singing for this one!
        </p>
      </div>
      <div className="lg:w-1/3 h-full rounded-3xl flex flex-col  p-5 transition-all duration-75 ">
        <h2 className=" text-xl font-inter font-bold mb-3">
          Let it snow - SATB arrangement
        </h2>
        <div className="flex flex-col align-top items-start content-start h-full grow mb-10 rounded-b-xl overflow-clip block-shadow">
          <div className="rounded-t-xl border-1 border-black bg-white h-10 w-full flex flex-row justify-start items-center ">
            <div className="items-center px-3 space-x-2 flex flex-row mr-10">
              <div className="h-3 w-3 border-1 rounded-full pressable border-black bg-green-500"></div>
              <div className="h-3 w-3 border-1 rounded-full pressable border-black bg-yellow-500"></div>
              <div className="h-3 w-3 border-1 rounded-full pressable border-black bg-rose-500"></div>
            </div>
          </div>
          <ReactPlayer
            width={"100%"}
            height={"100%"}
            url="https://www.youtube.com/watch?v=rV-yjLLGi6U"
          />
        </div>
        
        <p className="  text-sm font-inter   text-justify mb-6">
          As choir lead in my final year at Commuz' (see previous section), my
          colead and I decided it would be nice to film a christmas video to
          wish the rest of the team a merry christmas. So, we arranged an
          original cover of let it snow for SSATBB choir. I performed one of two
          bass harmonies - as well as a solo passage. I also mixed and mastered
          the audio, and created the youtube video from scratch. This project
          was a lot of fun, and you can find the sheet music below.
        </p>
        <a className="rounded-full border-black text-black border-[1px] border-b-2 shadow-md bg-white p-3 justify-center flex flex-row gap-5 items-center hover:scale-[101%] hover:shadow-lg transition-all duration-[40ms] cursor-pointer active:scale-[97%] active:text-gray-700 active:border-gray-600"
        href="/LIS.pdf"
        target="_blank"
        rel="noopener noreferrer">
          <IoMusicalNotesSharp />
          <p className="  text-base ">Sheet Music</p>
        </a>
      </div>
    </div>
  );
};

export { MusicArranged };
