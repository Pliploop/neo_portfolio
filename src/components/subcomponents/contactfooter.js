import { IoPlaySharp } from "react-icons/io5";
import {
  AiFillMail,
  AiFillGithub,
  AiFillLinkedin,
  AiOutlineMedium,
  AiOutlineTwitter,
} from "react-icons/ai";
import { SiGooglescholar } from "react-icons/si";



const ContactFooter = ({ pagename }) => {
  const openLinkInNewTab = (url) => {
    window.open(url, "_blank");
  };

  const scrollto = (id) => {
    console.log("scrolling to " + id);
    let element = document.getElementById(id);
    element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="lg:h-10 h-12 w-full flex flex-row justify-center sticky bottom-8 dark:text-white  overflow-clip">
      <div className="lg:h-10 h-12 w-full lg:w-1/3  border-black dark:border-white lg:border-[2px]  border-[1px] backdrop-filter backdrop-blur-lg flex flex-row justify-center">
        <div className="h-full w-full flex flex-row justify-evenly  items-center">
          <a
            target="_blank"
            onClick={() => {scrollto("contactform")}}
            className="lg:scale-100 scale-75 hover:bg-black dark:hover:bg-white dark:hover:text-rose-800 hover:text-rose-200  h-full flex flex-row items-center grow justify-center hover:cursor-pointer active:text-orange-200 group "
          >
            <AiFillMail
              className="group-active:text-orange-200 transition-all duration-100 group-active:scale-90"
              size={26}
            ></AiFillMail>
          </a>
          <a
            href="https://www.github.com/Pliploop"
            target="_blank"
            onClick={() => openLinkInNewTab("https://www.github.com/Pliploop")}
            className="lg:scale-100 scale-75 hover:bg-black dark:hover:bg-white dark:hover:text-rose-800 hover:text-rose-200 h-full flex flex-row items-center grow justify-center hover:cursor-pointer active:text-orange-200 group "
          >
            <AiFillGithub
              className="group-active:text-orange-200 transition-all duration-100 group-active:scale-90"
              size={26}
            ></AiFillGithub>
          </a>
          <a
            href="https://scholar.google.com/citations?user=pk3boQEAAAAJ&hl=en"
            target="_blank"
            onClick={() =>
              openLinkInNewTab(
                "https://scholar.google.com/citations?user=pk3boQEAAAAJ&hl=en"
              )
            }
            className="lg:scale-100 scale-75 hover:bg-black dark:hover:bg-white dark:hover:text-rose-800 hover:text-rose-200 h-full flex flex-row items-center grow justify-center hover:cursor-pointer active:text-orange-200 group "
          >
            <SiGooglescholar
              className="group-active:text-orange-200 transition-all duration-100 group-active:scale-90"
              size={22}
            ></SiGooglescholar>
          </a>
          <a
            href="https://www.linkedin.com/julien-guinot"
            target="_blank"
            onClick={() =>
              openLinkInNewTab("https://www.linkedin.com/in/julien-guinot/")
            }
            className="lg:scale-100 scale-75 hover:bg-black dark:hover:bg-white dark:hover:text-rose-800 hover:text-rose-200 h-full flex flex-row items-center grow justify-center hover:cursor-pointer active:text-orange-200 group "
          >
            <AiFillLinkedin
              className="group-active:text-orange-200 transition-all duration-100 group-active:scale-90"
              size={26}
            ></AiFillLinkedin>
          </a>
          <a
            href="https://twitter.com/juj_gnt"
            target="_blank"
            onClick={() => openLinkInNewTab("https://twitter.com/Juj_Guinot")}
            className="lg:scale-100 scale-75 hover:bg-black dark:hover:bg-white dark:hover:text-rose-800 hover:text-rose-200 h-full flex flex-row items-center grow justify-center hover:cursor-pointer active:text-orange-200 group "
          >
            <AiOutlineTwitter
              className="group-active:text-orange-200 transition-all duration-100 group-active:scale-90"
              size={26}
            ></AiOutlineTwitter>
          </a>
          <a
            href="https://www.medium.com/juj_gnt"
            target="_blank"
            onClick={() => openLinkInNewTab("https://medium.com/@juj_guinot")}
            className="lg:scale-100 scale-75 hover:bg-black dark:hover:bg-white dark:hover:text-rose-800 hover:text-rose-200 h-full flex flex-row items-center grow justify-center hover:cursor-pointer active:text-orange-200 group "
          >
            <AiOutlineMedium
              className="group-active:text-orange-200 transition-all duration-100 group-active:scale-90"
              size={26}
            ></AiOutlineMedium>
          </a>
          {/* google scholar */}
          
        </div>
      </div>
    </div>
  );
};

export default ContactFooter;
