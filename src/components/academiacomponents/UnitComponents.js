import { BsFileEarmarkPdf } from "react-icons/bs";

import { GrDown } from "react-icons/gr";
import { VscGithub } from "react-icons/vsc";

const Academiatag = ({ text }) => {
  return (
    <div className="rounded-full px-2 py-1.5 dark:border-violet-200 dark:text-violet-200 dark:bg-none border-violet-500 pressable border-[1px] items-center justify-center">
      {text}
    </div>
  );
};

const Academiatag2 = ({ text }) => {
  return (
    <div className="rounded-full text-sm px-2 py-2 dark:bg-none content-center text-center pressable bg-white border-violet-500 border-[1px] items-center justify-center">
      {text}
    </div>
  );
};

const FillerBar = ({ height = "n" }) => {
  let cn = `w-px bg-violet-700 dark:bg-violet-200 my-3 grow h-[${height}] transition-all duration-200`;
  return <div className={cn} />;
};

const Timelinedot = ({ section }) => {
  return (
    <div className="w-3 aspect-square bg-violet-700 dark:bg-violet-200 rounded-full flex justify-center my-10">
      {section}
    </div>
  );
};

const Timelinedot2 = () => {
  return (
    <div className="w-3 aspect-square bg-violet-700 dark:bg-violet-200 rounded-full flex justify-center my-2"></div>
  );
};

const Tocitem = ({ num, text, href }) => {
  return (
    <div className="flex flex-col w-full justify-evenly">
      <div className="flex flex-row w-full items-center">
        <div className="font-mono font-bold text-base text-violet-600 mr-3">
          {num}
        </div>
        <div className="font-mono text-xs text-gray-600">{text}</div>
        <div className="h-px bg-gray-200 grow mx-5"></div>
        <Pdfbutton href={href}/>
      </div>
    </div>
  );
};

const Pdfbutton = ({href}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className=" rounded-full p-2 justify-center flex flex-row gap-3 active:scale-95 select-none text-black hover:text-red-600 transition-all duration-[30ms]  items-center  cursor-pointer"
    >
      <BsFileEarmarkPdf size={14} />
    </a>
  );
};


const GithubButton = ({href}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className=" rounded-full p-2 justify-center flex flex-row gap-3 active:scale-95 active:text-purple-600 select-none text-black hover:text-purple-600 transition-all duration-[30ms] items-center shadow-gray-300 group cursor-pointer"
    >
      <VscGithub size={14} />
    </a>
  );
};

const ShowMore = ({ isdeployed, setdeployed }) => {
  return (
    <div
      className="flex flex-col items-center justify-center mt-5"
      onClick={() => {
        setdeployed(!isdeployed);
      }}
    >
      <p className="text-gray-600 dark:text-white z-40" id="readmore">
        {!isdeployed ? "read less" : "read more"}
      </p>
      <GrDown
        className={`${
          isdeployed ? "rotate-0" : "rotate-180"
        } transition-all duration-300`}
      />
    </div>
  );
};

const DeployGradient = ({ abstractdeployed }) => {
  return (
    <div
      className={`absolute  z-40 h-full w-full transition-all duration-200 ease-linear ${
        !abstractdeployed ? " opacity-0" : " opacity-100"
      }`}
    />
  );
};

export {
  Academiatag,
  Academiatag2,
  FillerBar,
  Timelinedot,
  Tocitem,
  Timelinedot2,
  ShowMore,
  DeployGradient,
  Pdfbutton,
  GithubButton
};
