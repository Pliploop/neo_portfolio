import React, { useState } from "react";
import { useThemeToggle } from '../hooks/useThemeToggle';
import { useMeshGradient } from '../hooks/useMeshGradient';
import AllHeader from "./subcomponents/header";
import { GrDown } from "react-icons/gr";
import { SiSpotify } from "react-icons/si";
import { BsArrowRightShort, BsArrowLeftShort } from "react-icons/bs";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { HiSun, HiMoon } from "react-icons/hi";
import ReactPlayer from "react-player";
import { MusicMixMaster } from "../components/Music/musicmixmaster";
import { tracks } from "../data/music";
import image from "../content/images/logo_countour.png";

const MusicSection = () => {
  const { isDark, toggle } = useThemeToggle();
  const { MeshGradientRenderer, showGradient } = useMeshGradient();

  return (
    // <div className="dark:bg-black  bg-gradient-to-b   from-emerald-100 to-sky-100 to-35% lg:py-12 lg:px-32 p-6  scrollbar-hide select-none">

    <div className="dark:bg-gray-900 relative bg-cover dark:text-white lg:py-12 lg:px-32 p-6 scrollbar-hide select-none overflow-x-hidden lg:overflow-x-visible w-full">
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
            colors={["#ffffff", "#3b82f6", "#1e40af", "#0ea5e9", "#ffffff"]}
            speed={0.01}
          />
        </div>
      )}
      <div className="h-full w-screen absolute top-0 right-0 z-0 dark:opacity-70 opacity-0 transition-opacity duration-200 bg-black show" />
      <div className="z-10 relative">
        <div className="h-full  flex flex-col justify-between align-middle">
          <AllHeader
            pagename={"Music"}
            hoveraccent={"blue-200"}
            clickaccent={"blue-300"}
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
          </div>
        </div>
      </div>
      
      {/* Mobile Theme Toggle */}
      <div className="fixed bottom-6 right-6 z-[100] lg:hidden">
        <button
          onClick={toggle}
          className="h-12 w-12 rounded-full border border-black dark:border-white backdrop-blur-md bg-white/40 dark:bg-black/40 flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-200 shadow-lg"
        >
          {isDark ? (
            <HiSun size={24} className="text-yellow-500" />
          ) : (
            <HiMoon size={24} className="text-gray-700" />
          )}
        </button>
      </div>
    </div>
  );
};

const scrollto = (id) => {
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
            <li class="  border-black grow cursor-pointer dark:hover:bg-white dark:hover:text-blue-600 active:text-white transition-colors duration-100 hover:bg-black hover:text-blue-300 p-2 text-center">
              <button
                type="button"
                onClick={() => {
                  scrollto("featured");
                }}
              >
                Featured
              </button>
            </li>
            <li class="  border-black grow cursor-pointer dark:hover:bg-white dark:hover:text-blue-600 active:text-white transition-colors duration-100 hover:bg-black hover:text-blue-300 p-2 text-center">
              <button
                type="button"
                onClick={() => {
                  scrollto("mixmaster");
                }}
              >
                Mix-mastering
              </button>
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
        <h2 className="font-inter text-2xl lg:text-4xl font-semibold first-letter:text-7xl first-letter:font-zighead first-letter:text-blue-600">
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
    <div className="lg:mb-16 mb-10 first-letter:font-saint first-letter:text-3xl first-letter:text-blue-700">
      <SectionHeader text={text} />
    </div>
  );
};

const MusicFeatured = () => {
  const [activeCard, setActiveCard] = useState(null);
  const [activeTabFonkey, setActiveTabFonkey] = useState(0);

  function toggleFonkeyText() {
    var gradient = document.getElementById("fonkeyreadmoregradient");
    var text = document.getElementById("fonkeyreadmoretext");
    var readmore = document.getElementById("fonkeyreadmore");
    var icon = document.getElementById("fonkeyreadmoreicon");

    if (icon.classList.contains("rotate-0")) {
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

  const geturl = () => {
    switch (activeTabFonkey) {
      default:
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

  const FONKEY_COUNT = 4; // number of Fonkey Business video tabs (cases 0-3 in geturl)

  const nexturl = (skip) => {
    var tempactive = activeTabFonkey + skip;
    if (tempactive < 0) { tempactive = FONKEY_COUNT - 1; }
    if (tempactive >= FONKEY_COUNT) { tempactive = 0; }
    setActiveTabFonkey(tempactive);
  };

  return (
    <div className="flex flex-col gap-14 w-full lg:px-10 justify-center">
      {/* Fonkey Business Section - Keep Original */}
      <div className="flex lg:flex-row flex-col w-full h-auto lg:gap-10 hover:border-black transition-all duration-100 rounded-3xl">
        <div className="lg:h-2/3 grow lg:m-10 mb-0 lg:mr-5 flex flex-col">
          <div className="border border-black dark:border-white backdrop-blur-md bg-white/40 dark:bg-black/40 lg:h-10 h-auto flex lg:flex-row flex-col justify-start lg:items-center items-start">
            {/* Desktop Navigation */}
            <div className="flex flex-row lg:w-auto w-full h-full items-center dark:text-black lg:flex hidden" role="tablist" aria-label="Fonkey Business videos">
              <div>
                <BsArrowLeftShort
                  size={30}
                  className="hover:text-gray-600 cursor-pointer pressable"
                  onClick={() => {
                    nexturl(-1);
                  }}
                />
              </div>
              <button
                type="button"
                role="tab"
                id="tab-fonkey-0"
                aria-selected={activeTabFonkey === 0}
                aria-controls="panel-fonkey"
                className={`h-full lg:border-t-0 border-t-[1px] p-3 lg:grow-0 grow text-sm flex flex-row text-center items-center px-3 hover:bg-black hover:text-purple-100 transition-colors duration-300 lg:border-x-[1px] border-r-[1px] border-black cursor-pointer ${
                  activeTabFonkey === 0 ? "bg-purple-100" : "bg-white"
                }`}
                onClick={() => {
                  setActiveTabFonkey(0);
                }}
              >
                Colors
              </button>
              <button
                type="button"
                role="tab"
                id="tab-fonkey-1"
                aria-selected={activeTabFonkey === 1}
                aria-controls="panel-fonkey"
                className={`h-full lg:border-t-0 border-t-[1px] lg:grow-0 grow p-3 text-sm flex flex-row text-center items-center px-3 hover:bg-black hover:text-orange-100 transition-colors duration-300 border-r-[1px] border-black cursor-pointer ${
                  activeTabFonkey === 1 ? "bg-orange-100" : "bg-white"
                }`}
                onClick={() => {
                  setActiveTabFonkey(1);
                }}
              >
                Lover Boy
              </button>
              <button
                type="button"
                role="tab"
                id="tab-fonkey-2"
                aria-selected={activeTabFonkey === 2}
                aria-controls="panel-fonkey"
                className={`h-full lg:border-t-0 border-t-[1px] p-3 lg:grow-0 grow text-sm flex flex-row text-center items-center px-3 hover:bg-black hover:text-lime-100 transition-colors duration-300 lg:border-r-[1px] border-black cursor-pointer ${
                  activeTabFonkey === 2 ? "bg-lime-100" : "bg-white"
                }`}
                onClick={() => {
                  setActiveTabFonkey(2);
                }}
              >
                Don't stop the music
              </button>
              <button
                type="button"
                role="tab"
                id="tab-fonkey-3"
                aria-selected={activeTabFonkey === 3}
                aria-controls="panel-fonkey"
                className={`h-full lg:border-t-0 border-t-[1px] p-3 lg:grow-0 grow text-sm flex flex-row text-center items-center px-3 hover:bg-black hover:text-rose-100 transition-colors duration-300 lg:border-r-[1px] border-black cursor-pointer bg-white ${
                activeTabFonkey === 3 ? "bg-rose-100" : "bg-white"}`}
                onClick={() => {
                  setActiveTabFonkey(3);
                }}
                >
                Redbone
              </button>
              <div>
                <BsArrowRightShort
                  size={30}
                  className="hover:text-gray-600 cursor-pointer pressable"
                  onClick={() => {
                    nexturl(1);
                  }}
                />
              </div>
            </div>

            {/* Mobile Navigation */}
            <div className="flex flex-row w-full h-full items-center dark:text-black lg:hidden flex">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 dark:bg-black/20 hover:bg-white/40 dark:hover:bg-black/40 border border-white/30 dark:border-black/30 hover:border-white/50 dark:hover:border-black/50 transition-all duration-200 hover:scale-110 active:scale-95 group">
                <BsArrowLeftShort
                  size={20}
                  className="text-black dark:text-white group-hover:text-blue-500 transition-colors duration-200"
                  onClick={() => {
                    nexturl(-1);
                  }}
                />
              </div>
              
              {/* Current Item Name */}
              <div className="flex-1 text-center px-4">
                <span className="text-sm font-medium text-black dark:text-white">
                  {activeTabFonkey === 0 ? "Colors" : 
                   activeTabFonkey === 1 ? "Lover Boy" : 
                   activeTabFonkey === 2 ? "Don't stop the music" : "Redbone"}
                </span>
              </div>
              
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 dark:bg-black/20 hover:bg-white/40 dark:hover:bg-black/40 border border-white/30 dark:border-black/30 hover:border-white/50 dark:hover:border-black/50 transition-all duration-200 hover:scale-110 active:scale-95 group">
                <BsArrowRightShort
                  size={20}
                  className="text-black dark:text-white group-hover:text-blue-500 transition-colors duration-200"
                  onClick={() => {
                    nexturl(1);
                  }}
                />
              </div>
            </div>
          </div>
          <div
            className="overflow-clip aspect-video border border-black dark:border-white border-t-0"
            id="panel-fonkey"
            role="tabpanel"
            aria-labelledby={`tab-fonkey-${activeTabFonkey}`}
            tabIndex={0}
          >
            <ReactPlayer
              width={"100%"}
              height={"100%"}
              url={geturl(activeTabFonkey)}
              controls={true}
            />
          </div>
          <div className="flex flex-row justify-items-start gap-3 flex-wrap mb-0 mt-5">
            <div className="text-black text-sm flex flex-row items-center justify-center backdrop-blur-md bg-white/50 dark:bg-black/50 px-3 py-1 pressable rounded-full hover:shadow-lg transition-shadow duration-200 cursor-pointer">
              Performance
            </div>
            <div className="text-black text-sm flex flex-row items-center justify-center backdrop-blur-md bg-white/50 dark:bg-black/50 px-3 py-1 pressable rounded-full hover:shadow-lg transition-shadow duration-200 cursor-pointer">
              Mixing
            </div>
            <div className="text-black text-sm flex flex-row items-center justify-center backdrop-blur-md bg-white/50 dark:bg-black/50 px-3 py-1 pressable rounded-full hover:shadow-lg transition-shadow duration-200 cursor-pointer">
              Mastering
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:w-1/3 h-full">
          <div className="lg:h-full w-full p-3">
            <div className="w-full grow flex flex-row lg:justify-start justify-evenly gap-6">
              <img
                src={image}
                alt="Julien Guinot logo"
                className="w-2/3 mb-6 filter grayscale opacity-75 mt-3"
              />
              <div className="flex flex-col justify-start gap-3 py-3 mt-6 overflow-visible">
                <div className="pressable">
                  <SiSpotify
                    size={20}
                    className="overflow-visible pressable hover:text-blue-500 hover:stroke-[1px] stroke-black hover:block-shadow"
                  ></SiSpotify>
                </div>
                <div className="pressable">
                  <BiLogoInstagramAlt
                    size={22}
                    className="pressable overflow-visible pressable hover:text-rose-500 hover:stroke-[1px] stroke-black hover:block-shadow"
                  ></BiLogoInstagramAlt>
                </div>
              </div>
            </div>
            <div
              className="h-44 lg:h-auto lg:overflow-visible overflow-hidden flex flex-col gap-6 relative transition-all duration-200"
              id="fonkeyreadmoretext"
            >
              <div
                className="absolute h-full w-full lg:hidden"
                id="fonkeyreadmoregradient"
              ></div>
              <p className="font-inter text-sm">
                I'm also part of a funk-soul-RnB band for which I am bassist,
                mixing engineer and mastering engineer. We mostly record live studio versions of covers (so far!).
              </p>
              <div>
                <div className="flex flex-row items-center gap-2 p-2">
                  Black Pumas - Colors
                  <SiSpotify
                    size={20}
                    className="pressable hover:text-blue-500 hover:stroke-[1px] stroke-black hover:block-shadow"
                  ></SiSpotify>
                </div>
                <div className="flex flex-row items-center gap-2 p-2">
                  Phum Vifurit - Lover Boy
                  <SiSpotify
                    size={20}
                    className="pressable hover:text-blue-500 hover:stroke-[1px] stroke-black hover:block-shadow"
                  ></SiSpotify>
                </div>
                <div className="flex flex-row items-center gap-2 p-2">
                  Jamie Cullum - Don't stop the music
                  <SiSpotify
                    size={20}
                    className="pressable hover:text-blue-500 hover:stroke-[1px] stroke-black hover:block-shadow"
                  ></SiSpotify>
                </div>
                <div className="flex flex-row items-center gap-2 p-2">
                  Childish Gambino - Redbone
                  <SiSpotify
                    size={20}
                    className="pressable hover:text-blue-500 hover:stroke-[1px] stroke-black hover:block-shadow"
                  ></SiSpotify>
                </div>
              </div>
            </div>
            <button
              type="button"
              className="flex flex-col items-center justify-center mt-5 lg:hidden cursor-pointer"
              onClick={() => toggleFonkeyText()}
            >
              <p className="text-gray-600 dark:text-white font-mono z-40" id="fonkeyreadmore">
                read more
              </p>
              <GrDown
                className="rotate-0 transition-all duration-300"
                id="fonkeyreadmoreicon"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <div className="w-full h-1px border-t-[1px] border-black dark:border-white"></div>
      <div className="flex flex-row gap-12 w-full justify-between">
        {tracks.map((track, index) => (
          <div key={index} className="flex flex-col w-48">
            {/* Card */}
            <button
              type="button"
              className={`aspect-square border border-black dark:border-white backdrop-blur-md bg-white/40 dark:bg-black/40 cursor-pointer transition-all duration-200 ${
                activeCard === index
                  ? 'scale-105 shadow-lg'
                  : 'hover:scale-105 hover:shadow-md'
              }`}
              onClick={() => setActiveCard(activeCard === index ? null : index)}
            >
              {/* Player - ReactPlayer commented out */}
              {/* <div className="h-full w-full overflow-clip">
                <ReactPlayer
                  width="100%"
                  height="100%"
                  url={track.url}
                  config={{
                    soundcloud: {
                      options: {
                        show_artwork: false,
                        show_user: false,
                      },
                    },
                  }}
                />
              </div> */}
              
              {/* SoundCloud Embed */}
              <div className="h-full w-full overflow-clip">
                <iframe
                  width="100%"
                  height="100%"
                  scrolling="no"
                  frameBorder="no"
                  allow="autoplay"
                  title={track.title}
                  src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(track.url)}&color=%23111111&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`}
                ></iframe>
              </div>
            </button>
            
            {/* Title */}
            <h3 className="font-inter text-sm font-bold mt-3 text-center">
              {track.title}
            </h3>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-1 mt-2 justify-center">
              {track.tags.map((tag, tagIndex) => (
                <div 
                  key={tagIndex}
                  className="text-xs px-2 py-1 backdrop-blur-md bg-white/50 dark:bg-black/50 text-black dark:text-white hover:shadow-lg transition-shadow duration-200 cursor-pointer rounded-full"
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MusicSection;
