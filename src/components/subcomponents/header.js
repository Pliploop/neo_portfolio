import { IoPlaySharp } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";
import { useThemeToggle } from '../../hooks/useThemeToggle';

const AllHeader = ({ pagename, hoveraccent, clickaccent }) => {
  const { toggle } = useThemeToggle();
  const nav = useNavigate();
  const { pathname } = useLocation();

  const navBtn = (label, path) => {
    const isActive = pathname === path;
    return (
      <button
        type="button"
        onClick={() => nav(path)}
        className={`dark:text-white h-full lg:w-32 grow lg:grow-0 lg:text-lg text-sm flex flex-col justify-center text-center
          transition-all duration-100 cursor-pointer
          hover:bg-white/40 dark:hover:bg-white/10 hover:font-bold
          active:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-rose-400
          ${isActive ? 'font-bold border-b-2 border-rose-400/70 dark:border-rose-400/50' : ''}`}
        aria-current={isActive ? 'page' : undefined}
      >
        {label}
      </button>
    );
  };

  return (
    <div
      className="lg:h-16 z-[100] select-none h-12 w-full sticky mb-12 lg:top-8 top-6 backdrop-filter backdrop-blur-lg lg:backdrop-blur-xl bg-white/20 dark:bg-black/20 border border-white/25 dark:border-white/15 shadow-lg flex flex-row justify-between"
      id="all_about"
    >
      <button
        type="button"
        aria-label="Go to home"
        className={`lg:flex hidden h-full aspect-square group text-black flex-row align-middle justify-center border-r border-white/20 dark:border-white/15 hover:bg-black/80 hover:text-white hover:font-bold transition-all duration-100 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-rose-400`}
        onClick={() => nav("/")}
      >
        <IoPlaySharp
          size={32}
          className={`self-center lg:scale-100 scale-50 lg:group-active:scale-90 transition-all duration-100 dark:text-white`}
        />
      </button>
      <div className="lg:w-2/3 w-full h-full flex flex-row lg:justify-center justify-around lg:space-x-8">
        {navBtn('About', '/about')}
        {navBtn('Research', '/academia')}
        {navBtn('Music', '/music')}
        <div
          title="Coming soon"
          className="dark:text-gray-500 text-gray-400 h-full lg:w-32 grow lg:grow-0 lg:text-lg text-sm flex flex-col justify-center text-center cursor-not-allowed select-none relative group"
        >
          Projects
          <span className="hidden lg:block absolute -bottom-0.5 left-1/2 -translate-x-1/2 text-[9px] tracking-widest uppercase text-gray-400 dark:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-150">soon</span>
        </div>
        <div
          title="Coming soon"
          className="dark:text-gray-500 text-gray-400 h-full lg:w-32 grow lg:grow-0 lg:text-lg text-sm flex flex-col justify-center text-center cursor-not-allowed select-none relative group"
        >
          Blog
          <span className="hidden lg:block absolute -bottom-0.5 left-1/2 -translate-x-1/2 text-[9px] tracking-widest uppercase text-gray-400 dark:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-150">soon</span>
        </div>
      </div>
      <div className="  group select-none hidden h-full text-black lg:flex flex-col text-center justify-center">
        <button
          type="button"
          aria-label="Toggle dark mode"
          className="border border-black/25 dark:border-white/25 cursor-pointer h-6 w-12 rounded-full flex flex-col justify-center px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
          onClick={toggle}
        >
          <div className="h-3 w-3 rounded-full bg-black dark:bg-white dark:translate-x-6 transition-transform duration-300"></div>
        </button>
      </div>
      <button
        type="button"
        className="  group select-none hidden text-4xl h-full lg:w-64 w-0 text-black lg:flex border-l border-white/20 dark:border-white/15 ml-6 flex-col text-center justify-center hover:bg-black/80 hover:font-bold hover:home-accent-text transition-all duration-100 cursor-pointer"
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
      >
        <p
          className={`lg:group-active:scale-90 transition-all duration-100 group-active:text-white group-hover:text-white dark:text-white `}
        >
          {pagename}
        </p>
      </button>
    </div>
  );
};

export default AllHeader;
