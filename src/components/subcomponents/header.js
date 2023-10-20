import { IoPlaySharp } from "react-icons/io5";

import { useNavigate } from "react-router-dom";

const AllHeader = ({ pagename, hoveraccent, clickaccent }) => {
  const switchLightDark = () => {
    var element = document.body;
    if (localStorage.theme === "light") {
      element.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      element.classList.remove("dark");
      localStorage.theme = "light";
    }

    console.log(localStorage.theme);
  };

  const nav = useNavigate();

  return (
    <div
      className="lg:h-16 z-50 select-none h-12 w-full sticky mb-12 lg:top-8 top-6 backdrop-filter backdrop-blur-lg lg:backdrop-blur-xl bg-opacity-90 border-black dark:border-white lg:border-2 border-[1px] bg-transparent flex flex-row justify-between"
      id="all_about"
    >
      <div
        className={`lg:flex hidden h-full aspect-square group text-black flex-row align-middle justify-center border-r-[2px] border-black dark:border-white hover:bg-black hover:text-white hover:font-bold hover:home-accent-text transition-all duration-100 hover:cursor-pointer` } onClick={() => nav("/")}
      >
        <IoPlaySharp
          size={32}
          className={`self-center lg:scale-100 scale-50 lg:group-active:scale-90 transition-all duration-100  dark:text-white`}
        ></IoPlaySharp>
      </div>
      <div className="lg:w-2/3 w-full h-full flex flex-row lg:justify-center justify-around lg:space-x-8 ">
        <div
          className={`dark:text-white  dark:hover:text-black h-full lg:w-32 grow lg:grow-0 lg:text-lg text-sm flex flex-col active:bg-opacity-30 hover:bg-opacity-60 hover:bg-white hover:font-bold hover:cursor-pointer hover:border-black hover:border-x-[1px] dark:hover:border-white transition-all duration-100 p-auto text-center justify-center`}
          onClick={() => nav("/about")}
        >
          About
        </div>
        <div
          className={`dark:text-white  dark:hover:text-black h-full lg:w-32  grow lg:grow-0 lg:text-lg text-sm flex flex-col active:bg-opacity-30 hover:bg-opacity-60 hover:bg-white hover:font-bold hover:cursor-pointer hover:border-black hover:border-x-[1px] dark:hover:border-white transition-all duration-100 p-auto text-center justify-center`}
          onClick={() => nav("/academia")}
        >
          Academia
        </div>
        <div
          className={`dark:text-white  dark:hover:text-black h-full lg:w-32 grow lg:grow-0  lg:text-lg text-sm flex flex-col active:bg-opacity-30 hover:bg-opacity-60 hover:bg-white hover:font-bold hover:cursor-pointer hover:border-black hover:border-x-[1px] dark:hover:border-white transition-all duration-100 p-auto text-center justify-center`}
          onClick={() => nav("/music")}
        >
          Music
        </div>
        <div
          className={`dark:text-gray-500 text-gray-500  dark:hover:text-black h-full lg:w-32 grow lg:grow-0  lg:text-lg text-sm flex flex-col active:bg-opacity-30 hover:bg-opacity-60  hover:border-black hover:border-x-[1px] transition-all duration-100 dark:hover:border-white p-auto text-center justify-center`}
        >
          Projects
        </div>
        <div
          className={`dark:text-gray-500 text-gray-500 dark:hover:text-black h-full lg:w-32 grow lg:grow-0  lg:text-lg text-sm flex flex-col active:bg-opacity-30 hover:bg-opacity-60  hover:border-black hover:border-x-[1px] transition-all duration-100 dark:hover:border-white p-auto text-center justify-center`}
        >
          Blog
        </div>
      </div>
      <div className="  group select-none hidden h-full text-black lg:flex flex-col text-center justify-center">
        <div
          className="dark:border-white border-black border-[1px] hover:cursor-pointer h-6 w-12 rounded-full flex flex-col justify-center px-1"
          onClick={switchLightDark}
        >
          <div className="h-3 w-3 rounded-full bg-black dark:bg-white dark:translate-x-6 transition-transform duration-300"></div>
        </div>
      </div>
      <div
        className="  group select-none hidden text-4xl h-full lg:w-64 w-0 text-black lg:flex border-l-[1px] ml-6 dark:border-white flex-col text-center justify-center border-black hover:bg-black hover:font-bold hover:home-accent-text transition-all duration-100 hover:cursor-pointer"
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth", // This enables smooth scrolling
          });
        }}
      >
        <p
          className={`lg:group-active:scale-90 transition-all duration-100 group-active:text-white group-hover:text-white dark:text-white `}
        >
          {pagename}
        </p>
      </div>
    </div>
  );
};

export default AllHeader;
