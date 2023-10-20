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

const About = () => {
  const [isMounted, setIsMounted] = useState(false);
  

  const animate = () => {
    
  };

  useEffect(() => {
    console.log(localStorage.theme);
    const timeout = setTimeout(() => setIsMounted(true), 10);
    animate();
    return () => clearTimeout(timeout);
  }, []);

  return (
    // <div className="dark:bg-black select-none  bg-gradient-to-b   from-orange-200 to-rose-100 to-35% lg:py-8 lg:px-32 p-6  scrollbar-hide">

    <div className="relative select-none bg-cover  bg-[url('Gradient2.png')]  lg:py-12 lg:px-32 p-6 scrollbar-width:none">
      <div className="absolute top-0 left-0 bg-[url('Gradient2.png')] bg-contain blur-3xl w-full h-full lg:hidden"></div>
      <div className="h-full w-screen absolute top-0 right-0 z-0 dark:opacity-50 opacity-0 transition-opacity duration-200 bg-black show" />
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
            Hello! I’m Julien, a music afficionado with a vivid interest for
            machine learning - researching both is my career! I’ve always loved
            music. As a 10-year guitarist, bassist, producer, mixing engineer,
            DJ, and vocalist, I'm passionate about what technology can bring to
            music creation and undertanding! I'm interested in finding out what
            machine learning can learn about music and how it can help producers
            and musicians move forward in the discovery of new ways of making
            music.
          </p>
          <p className="first-letter:text-rose-600 text-sm mb-8">
            I've just started a PhD at Queen Mary University of London at the AI
            and Music doctoral training center under the supervision of Pr.
            George Fazekas and Elio Quinton, sponsored by universal music group.
            Before this, I’ve obtained two Masters degrees, with a focus on
            Musical acoustics and deep learning in France and Australia.
            Throughout my internships and experiences at Sony CSL, Believe,
            Groover, Artefact and IRCAM, I've worked with the following
            technologies:
          </p>
          <Infinitescroll></Infinitescroll>
        </div>

        <div className="grow flex-row justify-end lg:pr-10 py-6 lg:flex hidden">
          <div className="aspect-square w-3/5 show rounded-t-full flex flex-row p-4 block-shadow-md bg-rose-200 dark:bg-orange-300">
            <div className="h-full  w-full show rounded-t-full overflow-clip ">
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
          and AI together. Helping musicians make music and machines understand
          it drives me. I'm currently a PhD student @Queen Mary University of
          London, in the AI and Music Doctoral Training Center, under the
          supervision of Both QMUL and Universal Music Group
        </p>
      </div>

      <div className="flex flex-row dark:text-black lg:justify-start justify-center">
        <div
          className="lg:h-12 lg:rounded-xl rounded-full  lg:mr-16 mr-4 lg:w-32 w-1/2 border-[1px] lg:border-[1px]  border-black lg:block-shadow block-shadow pressable dark:bg-orange-200  home-accent-bg flex flex-row justify-evenly items-center"
          onClick={() => {
            scrollto("contactform");
          }}
        >
          {" "}
          <p className="lg:text-md  text-sm">Reach out!</p>{" "}
          <HiOutlineArrowUpRight
            className="lg:scale-100 scale-50 lg:flex hidden"
            size={16}
          ></HiOutlineArrowUpRight>{" "}
        </div>
        <div
          className="lg:h-12 lg:rounded-xl rounded-full lg:mr-16 mr-4 lg:w-32 w-1/2 border-[1px] lg:border-[1px]  border-black lg:block-shadow block-shadow pressable  home-accent-bg dark:bg-orange-200 flex flex-row justify-evenly items-center"
          onClick={() => nav("/music")}
        >
          <p className="lg:text-md  text-sm">My Music</p>{" "}
          <HiOutlineArrowUpRight
            className="lg:scale-100 scale-50 lg:flex hidden"
            size={16}
          ></HiOutlineArrowUpRight>
        </div>
        <a
          className="lg:h-12 lg:rounded-xl rounded-full lg:mr-16 lg:w-32 w-1/2 lg:p-0 p-1 border-[1px] lg:border-[1px]  border-black lg:block-shadow block-shadow pressable  home-accent-bg dark:bg-orange-200 flex flex-row justify-evenly items-center"
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className="lg:text-md  text-sm">Resume</p>{" "}
          <HiOutlineArrowUpRight
            className="lg:scale-100 scale-50 lg:flex hidden"
            size={16}
          ></HiOutlineArrowUpRight>
        </a>
      </div>
    </div>
  );
};
export default <About />;
