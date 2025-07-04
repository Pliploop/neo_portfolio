import React, { useState, useEffect } from "react";
import AllHeader from "./subcomponents/header";
import ContactFooter from "./subcomponents/contactfooter";
import { HiOutlineArrowUpRight } from "react-icons/hi2";
import { default as EducationExperience } from "./About/EducationExperience";
import { default as Infinitescroll } from "./About/infinitescroll";
import image from "../content/images/propic.jpg";
import { useNavigate } from "react-router-dom";
import ContactForm from "./About/ContactForm";

const scrollto = (id) => {
  console.log("scrolling to " + id);
  let element = document.getElementById(id);
  element.scrollIntoView({ behavior: "smooth" });
};

const AboutPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [showGradient, setShowGradient] = useState(false);
  const [MeshGradientRenderer, setMeshGradientRenderer] = useState(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const navigate = useNavigate();

  const animate = () => {
    
  };

  useEffect(() => {
    console.log(localStorage.theme);
    const timeout = setTimeout(() => setIsMounted(true), 10);
    animate();
    return () => clearTimeout(timeout);
  }, []);

  // Load fonts
  useEffect(() => {
    const loadFonts = async () => {
      try {
        // Wait for fonts to be ready
        await document.fonts.ready;
        setFontsLoaded(true);
      } catch (error) {
        console.error('Failed to load fonts:', error);
        // Fallback: set fonts as loaded after a timeout
        setTimeout(() => setFontsLoaded(true), 1000);
      }
    };

    loadFonts();
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

  // Show loading state while fonts and gradient are loading
  if (!fontsLoaded) {
    return (
      <div className="relative overflow-hidden bg-cover dark:bg-gray-950 lg:py-12 lg:px-32 p-6 scrollbar-width:none">
        <div className="relative h-full w-full flex flex-col justify-between align-middle">
          <AllHeader
            pagename={"About"}
            hoveraccent={"orange-200"}
            clickaccent={"rose-300"}
          />
          <div className="flex items-center justify-center h-64">
            <div className="text-lg">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden bg-cover dark:bg-gray-950 lg:py-12 lg:px-32 p-6 scrollbar-width:none">
      {/* Animated mesh gradient background with fade-in */}
      {MeshGradientRenderer && (
        <div 
          className={`transition-opacity duration-1000 ease-in-out ${
            showGradient ? 'opacity-70' : 'opacity-0'
          }`}
        >
          <MeshGradientRenderer
            className="about-mesh-gradient-bg"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              zIndex: 0,
              pointerEvents: 'none',
            }}
            colors={["#FEA4B0", "#FECC96", "#FFFFFF", "#FFFFFF", "#FFF2B8"]}
            speed={0.01}
          />
        </div>
      )}
      
      <div className="relative h-full w-full flex flex-col justify-between align-middle">
        <AllHeader
          pagename={"About"}
          hoveraccent={"orange-200"}
          clickaccent={"rose-300"}
        />
        <div id="all">
          <Intro />
          <Separator></Separator>

          <AboutSection />
          <Separator></Separator>

          <div className="lg:px-14 lg:p-16 pt-2 font-bold lg:text-3xl text-2xl first-letter:text-5xl lg:first-letter:text-7xl first-letter:font-zighead first-letter:text-rose-700 dark:first-letter:text-orange-300 dark:text-rose-50">
            Education /{" "}
            <span className="lg:text-7xl text-5xl font-saint text-rose-400">
              E
            </span>
            xperience
          </div>
          <EducationExperience />
          <div className="lg:px-14 mt-10  lg:p-16 pt-2 lg:mb-0 mb-8 lg:text-3xl text-2xl first-letter:text-7xl font-bold first-letter:font-zighead first-letter:text-rose-700 dark:first-letter:text-orange-200 dark:text-rose-50">
            Get in touch!{" "}
          </div>
          <ContactForm></ContactForm>
          <ContactFooter />
        </div>
      </div>
    </div>
  );
};

const Separator = () => {
  return <div className="w-1/2 h-[2px] lg:my-16 my-10 self-center"></div>;
};

const AboutSection = () => {
  return (
    <div className="lg:px-14 lg:mt-2 w-full h-auto flex flex-col dark:text-rose-50 justify-start">
      <div className="flex flex-row w-full justify-between space-x-10">
        <div className="lg:w-1/2 w-full flex flex-col text-justify">
          <div className="lg:text-3xl text-3xl first-letter:font-semibold first-letter:text-5xl font-bold mb-6 lg:first-letter:text-7xl first-letter:font-saint first-letter:text-rose-700 dark:first-letter:text-orange-500 dark:text-rose-50">
            About{" "}
            <span className="lg:text-7xl text-5xl  font-roboto text-rose-400 dark:text-orange-300">
              M
            </span>
            e
          </div>
          <p className="first-letter:text-rose-600 text-sm mb-6">
            Hello! I'm Julien, music nut and AI adfficionado. As a musician, producer, mixing engineer, and DJ, I'm passionate about what technology can bring to
            musical creation and undertanding. I'm interested in finding out what
            AI can learn about music and how it can help producers
            and musicians move forward in the discovery of new ways of making
            music.
          </p>
          <p className="first-letter:text-rose-600 text-sm mb-8">
            I'm a first year PhD student at Queen Mary University of London at the AI
            and Music Centre for Doctoral Training under the supervision of Pr.
            George Fazekas and Elio Quinton, sponsored by universal music group.
            Before this, I've obtained two Masters degrees, with a focus on
            Musical acoustics and deep learning in France and Australia, with professional experiences at
            Sony CSL, Believe, Groover, Artefact and IRCAM.
          </p>
          <Infinitescroll></Infinitescroll>
        </div>

        <div className="grow flex-row justify-end lg:pr-10 py-6 lg:flex hidden">
          <div className="aspect-square w-3/5 rounded-[50px] flex flex-row p-4 backdrop-blur-md bg-white/20 dark:bg-black/20 shadow-lg">
            <div className="h-full w-full rounded-[50px] overflow-clip">
              <img
                src={image}
                alt=""
                className=" object-cover w-full h-full hover:scale-105 transition-transform duration-300"
              ></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Intro = () => {
  const nav = useNavigate();
  return (
    <div
      id="presentation"
      className="lg:px-14 lg:mt-10 w-full h-auto flex flex-col dark:text-rose-50 justify-start"
    >
      <div className="lg:w-2/3 flex flex-col justify-start mb-12">
        <p className="lg:text-2xl text-lg font-bold font-grande">Hey! I'm</p>
        <p className="lg:text-6xl text-[35px] font-grande font-bold ">
          {" "}
          <span className="font-zighead text-rose-700  dark:text-orange-300 lg:text-9xl text-[50px]">
            J
          </span>
          ulien{" "}
          <span className="lg:text-9xl text-[50px] text-rose-500 dark:text-orange-200 font-saint">
            G
          </span>
          uinot
        </p>

        <p className="lg:text-2xl text-rose-700 dark:text-orange-200 mb-8 font-bold">
          Music Nut, AI enthusiast, Researcher @QMUL
        </p>

        <p className="lg:text-base text-sm dark:text-rose-50 lg:w-5/6 text-justify">
          I'm passionate about marrying the technicality and creativity of music
          and AI. Helping musicians make music and machines understand
          it drives me. I'm currently a PhD student @Queen Mary University of
          London, in the AI and Music Doctoral Training Center, under the
          supervision of Both QMUL and Universal Music Group
        </p>
      </div>

      <div className="flex flex-row lg:justify-start justify-center">
        <div
          className="lg:h-12 lg:mr-16 mr-4 lg:w-32 w-1/2 rounded-full backdrop-blur-md bg-white/20 dark:bg-black/20 pressable hover:bg-white/30 dark:hover:bg-black/30 transition-all duration-200 flex flex-row justify-evenly items-center shadow-lg hover:shadow-xl"
          onClick={() => {
            scrollto("contactform");
          }}
        >
          {" "}
          <p className="lg:text-md text-sm font-medium text-black dark:text-white">Reach out!</p>{" "}
          <HiOutlineArrowUpRight
            className="lg:scale-100 scale-50 lg:flex hidden text-black dark:text-white"
            size={16}
          ></HiOutlineArrowUpRight>{" "}
        </div>
        <div
          className="lg:h-12 lg:mr-16 mr-4 lg:w-32 w-1/2 rounded-full backdrop-blur-md bg-white/20 dark:bg-black/20 pressable hover:bg-white/30 dark:hover:bg-black/30 transition-all duration-200 flex flex-row justify-evenly items-center shadow-lg hover:shadow-xl"
          onClick={() => nav("/music")}
        >
          <p className="lg:text-md text-sm font-medium text-black dark:text-white">My Music</p>{" "}
          <HiOutlineArrowUpRight
            className="lg:scale-100 scale-50 lg:flex hidden text-black dark:text-white"
            size={16}
          ></HiOutlineArrowUpRight>
        </div>
        <a
          className="lg:h-12 lg:mr-16 lg:w-32 w-1/2 lg:p-0 p-1 rounded-full backdrop-blur-md bg-white/20 dark:bg-black/20 pressable hover:bg-white/30 dark:hover:bg-black/30 transition-all duration-200 flex flex-row justify-evenly items-center shadow-lg hover:shadow-xl"
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className="lg:text-md text-sm font-medium text-black dark:text-white">Resume</p>{" "}
          <HiOutlineArrowUpRight
            className="lg:scale-100 scale-50 lg:flex hidden text-black dark:text-white"
            size={16}
          ></HiOutlineArrowUpRight>
        </a>
      </div>
    </div>
  );
};

export default AboutPage; 