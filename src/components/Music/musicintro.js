
const MusicIntro = () => {
  return (
    <div className=" flex lg:flex-col flex-col mb-20 gap-10">
      <div className=" lg:w-full w-full lg:px-10 font-inter text-sm flex lg:flex-row flex-col lg:mb-0 mb-10 gap-10">
        <p className="text-justify">
          Music has been the focal point of my life forever. I
          started playing music about 8 years ago with guitar, and have never
          stopped since. I love learning new instruments, new skills, and new
          areas of music I have never explored before.{" "}
        </p>
        <p className="text-justify">
          I am motivated by and interested in all areas of music. I have dabbled
          in and explored performance, being a multi-instrumentalist, a
          vocalist, mixing, mastering, composing, arranging, producing...
        </p>
      </div>
      <div className=" grow flex lg:flex-row flex-col lg:space-y-0 space-y-5 justify-evenly lg:space-x-6 lg:mx-6 lg:h-52 dark:text-black">
        <div className="h-full border-1 border-black bg-emerald-300 block-shadow rounded-xl overflow-clip flex flex-col lg:w-1/3 w-full justify-start lg:mb-0">
          {/* <div className="w-1/4 aspect-square group lg:flex absolute lg:relative">
              <div className="absolute mt-[-120px] lg:mt-[-70px] lg:ml-[-10px] ml-[-150px] group-hover:animate-pulse lg:scale-[120%] scale-100 lg:opacity-60 opacity-20">
                {svg1}
              </div>
              <img
                className="absolute mt-[-0px] ml-[70px] lg:scale-[70%] scale-[40%] lg:flex hidden"
                src={guitar}
                alt="comp-prod"
              />
            </div> */}
          <div className="flex flex-col grow justify-start  ">
            <h2 className="lg:text-base p-2 bg-white border-b-[1px] border-black font-inter font-bold z-40 flex flex-row justify-start">
              <div className="flex flex-row justify-evenly items-center px-2 space-x-2">
                <div className="h-3 w-3 border-1 rounded-full pressable border-black bg-green-500"></div>
                <div className="h-3 w-3 border-1 rounded-full pressable border-black bg-yellow-500"></div>
                <div className="h-3 w-3 border-1 rounded-full pressable border-black bg-rose-500"></div>
              </div>
              Performance
            </h2>
            <ul className=" z-40  lg:text-base p-5">
              <li>
                <div className="flex flex-row justify-start items-center">
                  acoustic & Electric guitar{" "}
                </div>
              </li>
              <li>
                <div className="flex flex-row justify-start items-center">
                  Electric bass{" "}
                </div>
              </li>
              <li>
                <div className="flex flex-row justify-start items-center">
                  Vocalist{" "}
                </div>
              </li>
              <li>
                <div className="flex flex-row justify-start items-center">
                  DJ
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="h-full border-1 border-black  bg-teal-300 block-shadow rounded-xl overflow-clip flex flex-col w-full  lg:w-1/3 justify-center">
          <div className="flex flex-col grow justify-start">
            <h2 className="lg:text-sm p-2 bg-white border-b-[1px] border-black text-base font-inter font-bold z-40 flex flex-row justify-start">
              <div className="flex flex-row justify-evenly items-center px-2 space-x-2">
                <div className="h-3 w-3 border-1 rounded-full pressable border-black bg-green-500"></div>
                <div className="h-3 w-3 border-1 rounded-full pressable border-black bg-yellow-500"></div>
                <div className="h-3 w-3 border-1 rounded-full pressable border-black bg-rose-500"></div>
              </div>
              Composition / Production
            </h2>
            <ul className=" flex flex-col p-5">
              <li>
                <div className="">House production - FL Studio & Ableton </div>
              </li>
              <li>
                <div className="">Solo choir covers using Ableton </div>
              </li>
              <li>
                <div className="">Composition of OST for animated series </div>
              </li>
              <li>
                <div className="">Arrangements for SATB choir </div>
              </li>
            </ul>
          </div>
          {/* <div className=" w-1/4 aspect-square group lg:flex absolute lg:relative">
              <div className="absolute mt-[-70px] lg:ml-[-190px] ml-[-100px] group-hover:animate-pulse lg:scale-[150%] scale-[75%] lg:opacity-50 opacity-50 hidden lg:flex">
                {svg2}
              </div>
              <img
                className="absolute mt-[-0px] ml-[-100px] lg:scale-[40%] scale-[40%] lg:flex hidden"
                src={disc}
                alt="comp-prod"
              />
            </div> */}
        </div>
        <div className="h-full border-1 border-black  bg-sky-300 rounded-xl overflow-clip block-shadow flex flex-col w-full lg:w-1/3 justify-center">
          {/* <div className="w-1/4 aspect-square lg:flex lg:relative absolute">
              <div className="absolute mt-[-70px] lg:ml-[0px] ml-[-200px] hover:animate-pulse lg:scale-[150%] opacity-50 lg:opacity-50 ">
                {svg3}
              </div>
              <img
                className="absolute mt-[-0px] ml-[-0px] lg:scale-[60%] scale-[25%] lg:ml-10 lg:mt-10 lg:flex hidden"
                src={pc}
                alt="comp-prod"
              />
            </div> */}
          <div className="flex flex-col  grow justify-start">
            <h2 className="lg:text-base p-2 bg-white border-b-[1px] border-black text-base font-inter font-bold z-40 flex flex-row justify-start">
              <div className="flex flex-row justify-evenly items-center px-3 space-x-3">
                <div className="h-3 w-3 border-1 rounded-full pressable border-black bg-green-500"></div>
                <div className="h-3 w-3 border-1 rounded-full pressable border-black bg-yellow-500"></div>
                <div className="h-3 w-3 border-1 rounded-full pressable border-black bg-rose-500"></div>
              </div>
              Mixing / Mastering
            </h2>
            <ul className=" p-5 ">
              <li>
                <div className="flex flex-row justify-start items-center">
                  Mixing of 4 24-track orchestral albums
                </div>
              </li>
              <li>
                <div className="flex flex-row justify-start items-center">
                  Mastering of said albums
                </div>
              </li>
              <li>
                <div className="flex flex-row justify-start items-center">
                  Mix & Mastering of my own tracks
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export { MusicIntro };
