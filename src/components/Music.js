import React, { useState, useEffect } from "react";
import AllHeader from "./subcomponents/header";
import { GrDown } from "react-icons/gr";
import { SiSpotify } from "react-icons/si";
import { BsArrowRightShort, BsArrowLeftShort } from "react-icons/bs";
import { BiLogoInstagramAlt } from "react-icons/bi";
import ReactPlayer from "react-player";
import { MusicIntro } from "../components/Music/musicintro";
import { MusicArranged } from "../components/Music/musicarranged";
import { MusicMixMaster } from "../components/Music/musicmixmaster";
import image from "../content/images/logo_countour.png";

const MusicSection = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [showGradient, setShowGradient] = useState(false);
  const [MeshGradientRenderer, setMeshGradientRenderer] = useState(null);

  const animate = () => {
    
  };

  useEffect(() => {
    console.log(localStorage.theme);
    const timeout = setTimeout(() => setIsMounted(true), 10);
    animate();
    return () => clearTimeout(timeout);
  }, []);

  // Lazy load the MeshGradientRenderer
  useEffect(() => {
    const loadMeshGradient = async () => {
      try {
        const { MeshGradientRenderer } = await import('@johnn-e/react-mesh-gradient');
        setMeshGradientRenderer(() => MeshGradientRenderer);
        // Show gradient after a short delay for smooth fade-in
        setTimeout(() => setShowGradient(true), 100);
      } catch (error) {
        console.error('Failed to load mesh gradient:', error);
      }
    };

    loadMeshGradient();
  }, []);

  return (
    // <div className="dark:bg-black  bg-gradient-to-b   from-emerald-100 to-sky-100 to-35% lg:py-12 lg:px-32 p-6  scrollbar-hide select-none">

    <div className="dark:bg-gray-900 relative float-left bg-cover dark:text-white lg:py-12 lg:px-32 p-6  scrollbar-hide select-none">
      {/* Animated mesh gradient background with fade-in */}
      {MeshGradientRenderer && (
        <div 
          className={`transition-opacity duration-1000 ease-in-out ${
            showGradient ? 'opacity-70' : 'opacity-0'
          }`}
        >
          <MeshGradientRenderer
            className="music-mesh-gradient-bg"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              zIndex: 0,
              pointerEvents: 'none',
              opacity: 0.3,
            }}
            colors={["#ffffff", "#5eead4", "#6ee7b7", "#a7f3d0", "#ffffff"]}
            speed={0.01}
          />
        </div>
      )}
      <div className="h-full w-screen absolute top-0 right-0 z-0 dark:opacity-70 opacity-0 transition-opacity duration-200 bg-black show" />
      <div className="z-10 relative">
        <div className="h-full  flex flex-col justify-between align-middle">
          <AllHeader
            pagename={"Music"}
            hoveraccent={"emerald-200"}
            clickaccent={"sky-300"}
          />
          <div className="w-full" id="all">
            <MusicHeader text="My Music" />
            <MusicNav />
            {/* <MusicIntro /> */}
            {/* </div> */}
            <div className="flex flex-col w-full  mb-20">
              <div
                className="absolute show -mt-40 h-10 w-10 invisible"
                id="featured"
              />
              <MusicHeader text={"Featured"} />
              <MusicFeatured />
            </div>
            <div className="flex flex-col w-full  mb-20">
              <div
                className="absolute show -mt-40 h-10 w-10 invisible"
                id="mixmaster"
              />
              <MusicHeader text={"Mix & Mastering"} />
              <MusicMixMaster />
            </div>
            <div className="flex flex-col w-full  mb-20">
              <div
                className="absolute show -mt-40 h-10 w-10 invisible"
                id="arrangements"
              />
              <MusicHeader text={"Arrangements"} />
              <MusicArranged />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const scrollto = (id) => {
  console.log("scrolling to " + id);
  let element = document.getElementById(id);
  element.scrollIntoView({ behavior: "smooth" });
};

const MusicNav = () => {
  return (
    <nav class=" border-black dark:border-white text-sm lg:text-base  dark:text-white backdrop-filter backdrop-blur-2xl bg-opacity-70 border-[1px]  sticky grow z-50 lg:top-24 top-20 mb-16 flex flex-row justify-center select-none">
      <div class="flex flex-row items-center w-full">
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

        <div class=" w-full flex  " id="navbar-sticky">
          <ul class="flex justify-evenly md:font-medium grow">
            <li class="  border-black grow cursor-pointer dark:hover:bg-white dark:hover:text-emerald-600 active:text-white transition-colors duration-100 hover:bg-black hover:text-emerald-300 p-2 text-center">
              <div
                onClick={() => {
                  scrollto("featured");
                }}
              >
                Featured
              </div>
            </li>
            <li class="  border-black grow cursor-pointer dark:hover:bg-white dark:hover:text-emerald-600 active:text-white transition-colors duration-100 hover:bg-black hover:text-emerald-300 p-2 text-center">
              <div
                class=" "
                onClick={() => {
                  scrollto("mixmaster");
                }}
              >
                Mix-mastering
              </div>
            </li>
            <li class=" border-blackA  grow cursor-pointer dark:hover:bg-white dark:hover:text-emerald-600 active:text-white transition-colors duration-100 hover:bg-black hover:text-emerald-300 p-2 text-center">
              <div
                class=" "
                onClick={() => {
                  scrollto("arrangements");
                }}
              >
                Arrangements
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

const SectionHeader = ({ text }) => {
  return (
    <div className="h-auto lg:w-full lg:px-10">
      <div className="flex flex-row align-middle">
        <h2 className="font-inter text-2xl lg:text-4xl font-semibold first-letter:text-7xl first-letter:font-zighead first-letter:text-emerald-600">
          {" "}
          {text}
        </h2>
        <div className="mx-6 h-[1px] grow bg-black dark:bg-white self-center"></div>
      </div>
    </div>
  );
};

const MusicHeader = ({ text }) => {
  return (
    <div className="lg:mb-16 mb-10 first-letter:font-saint first-letter:text-3xl first-letter:text-emerald-700">
      <SectionHeader text={text} />
    </div>
  );
};

const MusicFeatured = () => {
  function toggleAztecText() {
    var gradient = document.getElementById("aztecreadmoregradient");
    var text = document.getElementById("aztecreadmoretext");
    var readmore = document.getElementById("readmore");
    var icon = document.getElementById("readmoreicon");

    if (icon.classList.contains("rotate-0")) {
      // Show the dots

      readmore.innerHTML = "read less";
      icon.classList.add("rotate-180");

      icon.classList.remove("rotate-0");

      text.classList.remove("h-44");
      text.classList.add("h-[400px]");

      gradient.classList.add("hidden");
    } else {
      icon.classList.add("rotate-0");
      icon.classList.remove("rotate-180");

      readmore.innerHTML = "read more";

      text.classList.add("h-44");

      text.classList.remove("h-[400px]");

      gradient.classList.remove("hidden");
    }
  }

  function toggleFonkeyText() {
    var gradient = document.getElementById("fonkeyreadmoregradient");
    var text = document.getElementById("fonkeyreadmoretext");
    var readmore = document.getElementById("fonkeyreadmore");
    var icon = document.getElementById("fonkeyreadmoreicon");

    if (icon.classList.contains("rotate-0")) {
      // Show the dots

      readmore.innerHTML = "read less";
      icon.classList.add("rotate-180");

      icon.classList.remove("rotate-0");

      text.classList.remove("h-44");
      text.classList.add("h-[400px]");

      gradient.classList.add("hidden");
    } else {
      icon.classList.add("rotate-0");
      icon.classList.remove("rotate-180");

      readmore.innerHTML = "read more";

      text.classList.add("h-44");

      text.classList.remove("h-[400px]");

      gradient.classList.remove("hidden");
    }
  }

  var [activeTabFonkey, setActiveTabFonkey] = useState(0);

  const geturl = () => {
    switch (activeTabFonkey) {
      default :
        return ""
      case 0:
        return "https://youtu.be/bPJmExJGmmU?si=fmyTaD-uRQMCqCqc";
      case 1:
        return "https://www.youtube.com/watch?v=MUyIXcaW89s&ab_channel=FonkeyBusiness";
      case 2:
        return "https://youtu.be/sIvH9gapjvc?si=MeHXO4TSO0XmGfcq";
      case 3:
        return "https://www.youtube.com/watch?v=9fj4GnkUb2o";
    }
  };

  const nexturl = (skip) => {
    console.log(skip);
    console.log(activeTabFonkey);
    var tempactive = activeTabFonkey + skip;
    if (tempactive === -1) {
      tempactive = 2;
    }
    if (tempactive === 4) {
      tempactive = 0;
    }
    setActiveTabFonkey(tempactive);
  };

  return (
    <div className=" flex lg:flex-col flex-col gap-14 w-full lg:px-10 justify-center">
      <div className="flex lg:flex-row flex-col w-full h-auto lg:gap-10 hover:border-black transition-all duration-100  rounded-3xl">
        <div className="lg:h-2/3 grow lg:m-10 mb-0 lg:mr-5  flex flex-col">
          <div className="rounded-t-xl border-1 border-black bg-white lg:h-10 h-auto block-shadow flex lg:flex-row flex-col justify-start lg:items-center items-start ">
            <div className="items-center px-3 lg:py-0 py-3 space-x-2 flex flex-row mr-10">
              <div className="h-3 w-3 border-1 rounded-full pressable border-black bg-green-500"></div>
              <div className="h-3 w-3 border-1 rounded-full pressable border-black bg-yellow-500"></div>
              <div className="h-3 w-3 border-1 rounded-full pressable border-black bg-rose-500"></div>
            </div>
            <div className="flex flex-row lg:w-auto  w-full h-full items-center dark:text-black">
              <div>
                <BsArrowLeftShort
                  size={30}
                  className="hover:text-gray-600 cursor-pointer pressable  hidden lg:flex"
                  onClick={() => {
                    nexturl(-1);
                  }}
                />
              </div>
              <div
                className={`h-full lg:border-t-0 border-t-[1px]  p-3 lg:grow-0 grow text-sm flex flex-row text-center items-center px-3 hover:bg-black hover:text-purple-100 transition-colors duration-300 lg:border-x-[1px] border-r-[1px] border-black ${
                  activeTabFonkey === 0 ? "bg-purple-100" : "bg-white"
                }`}
                onClick={() => {
                  setActiveTabFonkey(0);
                }}
              >
                Colors
              </div>
              <div
                className={`h-full lg:border-t-0 border-t-[1px]  lg:grow-0 grow p-3 text-sm flex flex-row text-center items-center px-3 hover:bg-black hover:text-orange-100 transition-colors duration-300 border-r-[1px] border-black ${
                  activeTabFonkey === 1 ? "bg-orange-100" : "bg-white"
                }`}
                onClick={() => {
                  setActiveTabFonkey(1);
                }}
              >
                Lover Boy
              </div>
              <div
                className={`h-full lg:border-t-0 border-t-[1px]  p-3 lg:grow-0 grow text-sm flex flex-row text-center items-center px-3 hover:bg-black hover:text-lime-100 transition-colors duration-300 lg:border-r-[1px] border-black ${
                  activeTabFonkey === 2 ? "bg-lime-100" : "bg-white"
                }`}
                onClick={() => {
                  setActiveTabFonkey(2);
                }}
              >
                Don't stop the music
              </div>
              <div className={`h-full lg:border-t-0 border-t-[1px]  p-3 lg:grow-0 grow text-sm flex flex-row text-center items-center px-3 hover:bg-black hover:text-rose-100 transition-colors duration-300 lg:border-r-[1px] border-black bg-white ${
                activeTabFonkey === 3 ? "bg-rose-100" : "bg-white"}`}
                onClick={() => {
                  setActiveTabFonkey(3);
                }}
                >
                Redbone
              </div>
              <div>
                <BsArrowRightShort
                  size={30}
                  className="hover:text-gray-600 cursor-pointer pressable  lg:flex hidden"
                  onClick={() => {
                    nexturl(1);
                  }}
                />
              </div>
            </div>
          </div>
          <div className=" rounded-b-xl overflow-clip shadow-md aspect-video border-1 block-shadow border-black">
            <ReactPlayer
              width={"100%"}
              height={"100%"}
              url={geturl(activeTabFonkey)}
              controls={true}
            />
          </div>
          <div className="flex flex-row  justify-items-start gap-3 flex-wrap mb-0 mt-5">
            <div className=" text-black text-sm flex flex-row items-center justify-center border-black bg-white block-shadow border-1 px-3 py-1 pressable rounded-full">
              Performance
            </div>
            <div className=" text-black text-sm flex flex-row items-center justify-center border-black bg-white block-shadow border-1 px-3 py-1 pressable rounded-full">
              Mixing
            </div>
            <div className=" text-black text-sm flex flex-row items-center justify-center border-black bg-white block-shadow border-1 px-3 py-1 pressable rounded-full">
              Mastering
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:w-1/3 h-full ">
          <div className="lg:h-full w-full p-3">
            <div className="w-full grow flex flex-row lg:justify-start justify-evenly gap-6">
              <img
                src={image}
                alt=""
                className="w-2/3 mb-6 filter grayscale opacity-75  mt-3"
              />
              <div className="flex flex-col justify-start gap-3 py-3 mt-6 overflow-visible">
                <div className="pressable">
                  <SiSpotify
                    size={20}
                    className=" overflow-visible pressable hover:text-emerald-500 hover:stroke-[1px] stroke-black hover:block-shadow"
                  ></SiSpotify>
                </div>
                <div className="pressable">
                  <BiLogoInstagramAlt
                    size={22}
                    className=" pressable  overflow-visible pressable hover:text-rose-500 hover:stroke-[1px] stroke-black hover:block-shadow"
                  ></BiLogoInstagramAlt>
                </div>
              </div>
            </div>
            <div
              className="h-44 lg:h-auto  lg:overflow-visible overflow-hidden flex flex-col gap-6 relative transition-all duration-200"
              id="fonkeyreadmoretext"
            >
              <div
                className="absolute h-full w-full  lg:hidden"
                id="fonkeyreadmoregradient"
              ></div>
              <p className="font-inter  text-sm">
                I'm also part of a funk-soul-RnB band for which I am bassist,
                mixing engineer and mastering engineer. We mostly record live studio versions of covers (so far!).
              </p>
              <div>
                <div className="flex flex-row items-center gap-2 p-2">
                  Black Pumas - Colors
                  <SiSpotify
                    size={20}
                    className="pressable hover:text-emerald-500 hover:stroke-[1px] stroke-black hover:block-shadow"
                  ></SiSpotify>
                </div>

                <div className="flex flex-row items-center gap-2 p-2">
                  Phum Vifurit - Lover Boy
                  <SiSpotify
                    size={20}
                    className="pressable hover:text-emerald-500 hover:stroke-[1px] stroke-black hover:block-shadow"
                  ></SiSpotify>
                </div>

                <div className="flex flex-row items-center gap-2 p-2">
                  Jamie Cullum - Don't stop the music
                  <SiSpotify
                    size={20}
                    className="pressable hover:text-emerald-500 hover:stroke-[1px] stroke-black hover:block-shadow"
                  ></SiSpotify>
                </div>
                <div className="flex flex-row items-center gap-2 p-2">
                  Childish Gambino - Redbone
                  <SiSpotify
                    size={20}
                    className="pressable hover:text-emerald-500 hover:stroke-[1px] stroke-black hover:block-shadow"
                  ></SiSpotify>
                </div>
              </div>
            </div>
            <div
              className="flex flex-col items-center justify-center mt-5 lg:hidden"
              onClick={() => toggleFonkeyText()}
            >
              <p className="text-gray-600 dark:text-white font-mono z-40" id="fonkeyreadmore">
                read more
              </p>
              <GrDown
                className="rotate-0 transition-all duration-300"
                id="fonkeyreadmoreicon"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-1px border-t-[1px] border-black dark:border-white"></div>
      <div className="flex lg:flex-row flex-col w-full h-auto gap-10 ">
        <div className="flex flex-col lg:w-3/4 h-full pb-0 ">
          <div className="lg:h-full w-full   p-5">
            <h2 className="font-inter  text-xl mb-3 font-bold">
              Aztecs : original composition
            </h2>
            <div
              className="h-44 lg:h-auto overflow-hidden relative transition-all duration-200"
              id="aztecreadmoretext"
            >
              <div
                className="absolute h-full w-full  text-sm lg:hidden"
                id="aztecreadmoregradient"
              ></div>
              <p className=" mb-3 text-sm">
                This is an OST I composed, produced and mix-mastered for the
                trailer of an animated series on ancient Aztecs.
              </p>
              <p className="mb-10 text-sm">
                I used samples of traditional drums from south america, samples
                of aztec death whistles and my own voice to create a "tribal
                chant" following a lush rainforest-ish soundscape.
              </p>
              <p className="font-mono text-xs text-gray-500  mb-3">
                The album cover was generated using stable
                diffusion!
              </p>
            </div>
            <div
              className="flex flex-col items-center justify-center mt-5 lg:hidden"
              onClick={() => toggleAztecText()}
            >
              <p className="text-gray-600 dark:text-white font-mono z-40" id="readmore">
                read more
              </p>
              <GrDown
                className="rotate-0 transition-all duration-300"
                id="readmoreicon"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col align-top items-start content-start h-full grow lg:pr-20 p-5">
          <div className="rounded-t-xl border-1 border-black bg-white h-10 w-full block-shadow flex flex-row justify-start items-center ">
            <div className="items-center px-3 space-x-2 flex flex-row mr-10">
              <div className="h-3 w-3 border-1 rounded-full pressable border-black bg-green-500"></div>
              <div className="h-3 w-3 border-1 rounded-full pressable border-black bg-yellow-500"></div>
              <div className="h-3 w-3 border-1 rounded-full pressable border-black bg-rose-500"></div>
            </div>
          </div>
          <div className="w-full rounded-b-xl  overflow-clip mb-5 block-shadow border-[1px] border-black border-t-0">
            <ReactPlayer
              width={"100%"}
              height={"100%"}
              url="https://soundcloud.com/jujgui/aztecs"
              config={{
                soundcloud: {
                  options: {
                    show_artwork: false,
                    show_user: false,
                  },
                },
              }}
            />
          </div>
          <div className="flex flex-row justify-items-start gap-3 flex-wrap">
            <div className=" border-black text-black text-sm flex flex-row items-center justify-center bg-white block-shadow border-1 px-3 py-1 pressable rounded-full">
              Composition
            </div>
            <div className=" border-black text-black text-sm flex flex-row items-center justify-center bg-white block-shadow border-1 px-3 py-1 pressable rounded-full">
              Arrangement
            </div>
            <div className=" border-black text-black text-sm flex flex-row items-center justify-center bg-white block-shadow border-1 px-3 py-1 pressable rounded-full">
              Mixing
            </div>
            <div className=" border-black text-black text-sm flex flex-row items-center justify-center bg-white block-shadow border-1 px-3 py-1 pressable rounded-full">
              Mastering
            </div>
            <div className=" border-black text-black text-sm flex flex-row items-center justify-center bg-white block-shadow border-1 px-3 py-1 pressable rounded-full">
              production
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-1px border-t-[1px] border-black dark:border-white"></div>
      <div className="flex lg:flex-row flex-col w-full gap-10">
        <div className="flex flex-col lg:w-1/2 w-full h-full">
          <div className="lg:h-full w-full">
            <h2 className="font-inter  text-xl mb-8 font-bold ">
              LikeTHAT : disco house production
            </h2>
            <div
              className="h-auto lg:h-auto relative transition-all duration-200"
              id="likethatreadmoretext"
            >
              <div
                className="absolute h-full w-full bg-gradient-to-b from-transparent to-white lg:hidden hidden"
                id="likethatreadmoregradient"
              ></div>

              <div className="flex lg:flex-row flex-col gap-5 w-full">
                <div className="lg:w-1/2 rounded-2xl overflow-clip block-shadow mb-5 flex flex-col border-1 border-black">
                  <div className="h-12 border-b-[1px] border-black flex flex-row items-center bg-white">
                    <div className="items-center px-3 space-x-2 flex flex-row mr-10">
                      <div className="h-3 w-3 border-1 rounded-full pressable border-black bg-green-500"></div>
                      <div className="h-3 w-3 border-1 rounded-full pressable border-black bg-yellow-500"></div>
                      <div className="h-3 w-3 border-1 rounded-full pressable border-black bg-rose-500"></div>
                    </div>
                  </div>
                  <ReactPlayer
                    className=""
                    height={"100%"}
                    width={"100%"}
                    url="https://soundcloud.com/jujgui/likethat-remastered"
                  />
                </div>
                <div className="flex flex-col lg:w-1/2">
                  <div className="flex flex-row justify-items-start gap-3 flex-wrap mb-6">
                    <div className="text-black text-sm flex flex-row items-center justify-center border-black bg-white block-shadow border-1 px-3 py-1 pressable rounded-full">
                      Production
                    </div>
                    <div className="text-black text-sm flex flex-row items-center justify-center border-black bg-white block-shadow border-1 px-3 py-1 pressable rounded-full">
                      Mixing
                    </div>
                    <div className="text-black text-sm flex flex-row items-center justify-center border-black bg-white block-shadow border-1 px-3 py-1 pressable rounded-full">
                      Mastering
                    </div>
                  </div>
                  <p className="font-inter  text-sm  mb-3  text-justify">
                    I produced this disco house track during the first lockdown
                    (2020) to integrate into my DJ sets.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:w-1/2 h-full">
          <div className="lg:h-full w-full ">
            <h2 className="font-inter  text-xl mb-8 font-bold">
              Feeling good : orchestral mix
            </h2>
            <div
              className="h-auto  lg:h-auto overflow-hidden relative transition-all duration-200"
              id="likethatreadmoretext"
            >
              <div
                className="absolute h-full w-full bg-gradient-to-b from-transparent to-white lg:hidden hidden"
                id="likethatreadmoregradient"
              ></div>

              <div className="flex lg:flex-row flex-col gap-5 w-full">
                <div className="aspect-square lg:w-1/2 rounded-2xl block-shadow overflow-clip border-1 border-black mb-10 shadow-md">
                  <div className="flex flex-row bg-white h-12 border-b-[1px] border-black items-center">
                    <div className="items-center px-3 space-x-2 flex flex-row mr-10">
                      <div className="h-3 w-3 border-1 rounded-full pressable border-black bg-green-500"></div>
                      <div className="h-3 w-3 border-1 rounded-full pressable border-black bg-yellow-500"></div>
                      <div className="h-3 w-3 border-1 rounded-full pressable border-black bg-rose-500"></div>
                    </div>
                  </div>
                  <ReactPlayer
                    height={"100%"}
                    width={"100%"}
                    url="https://soundcloud.com/jujgui/feeling-good?si=b5c13b28cb4e4332b8c69a01fea99cfa&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing"
                  />
                </div>
                <div className="flex flex-col lg:w-1/2">
                  <div className="flex flex-row justify-items-start gap-3 mb-6 flex-wrap">
                    <div className="text-black text-sm flex flex-row items-center justify-center border-black bg-white block-shadow border-1 px-3 py-1 pressable rounded-full">
                      Mixing
                    </div>
                    <div className="text-black text-sm flex flex-row items-center justify-center border-black bg-white block-shadow border-1 px-3 py-1 pressable rounded-full">
                      Mastering
                    </div>
                  </div>

                  <p className="font-inter  text-sm  mb-3 text-justify">
                    This is the latest mix I produced from
                    the album of the last edition of the student musical I was part of for 4
                    years (See mix/mastering).
                  </p>
                  <p className="font-inter  text-sm  mb-5 text-justify">
                    I am also proud of this track as I was the
                    vocal coach for the main performer.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicSection;
