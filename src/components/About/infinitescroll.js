import { FaPython } from "react-icons/fa";
import {
  SiPytorch,
  SiTensorflow,
  SiJupyter,
  SiLightning,
  SiKeras,
  SiPandas,
  SiCplusplus,
  SiWeightsandbiases,
  SiZotero,
  SiReact,
  SiHtml5,
  SiJenkins,
  SiDocker,
  SiNodedotjs,
  SiAdobepremierepro,
  SiAdobephotoshop,
  SiAdobeillustrator,
  SiAbletonlive,
  SiPostgresql,
} from "react-icons/si";
import { VscGithubInverted } from "react-icons/vsc";
import { BsGit } from "react-icons/bs";
import { BiLogoAws } from "react-icons/bi";

import "./InfiniteScroll.css"; // Create this CSS file

const InfiniteScroll = () => {
  const mlDataScienceSkills = [
    <div className="scrollskill">
      <SiPytorch size={32} />
      <p className="font-bold">PyTorch</p>
    </div>,
    <div className="scrollskill">
      <SiTensorflow size={32} />
      <p className="font-bold">TensorFlow</p>
    </div>,
    <div className="scrollskill">
      <SiJupyter size={32} />
      <p className="font-bold">Jupyter</p>
    </div>,
    <div className="scrollskill">
      <SiLightning size={32} />
      <p className="font-bold">Pytorch Lightning</p>
    </div>,
    <div className="scrollskill">
      <SiKeras size={32} />
      <p className="font-bold">Keras</p>
    </div>,
    <div className="scrollskill">
      <SiPandas size={32} />
      <p className="font-bold">Pandas</p>
    </div>,
    <div className="scrollskill">
      <SiCplusplus size={32} />
      <p className="font-bold">C++</p>
    </div>,
    <div className="scrollskill">
      <SiWeightsandbiases size={32} />
      <p className="font-bold">Weights & Biases</p>
    </div>,
    <div className="scrollskill">
      <SiZotero size={32} />
      <p className="font-bold">Zotero</p>
    </div>,
    <div className="scrollskill">
      <SiPostgresql size={32} />
      <p className="font-bold">PostgreSQL</p>
    </div>,
    <div className="scrollskill">
      <FaPython size={32} />
      <p className="font-bold">Python</p>
    </div>,
    <div className="scrollskill">
      <VscGithubInverted size={32} />
      <p className="font-bold">GitHub</p>
    </div>,
    <div className="scrollskill">
      <BsGit size={32} />
      <p className="font-bold">Git</p>
    </div>,
    
  ];

  // Web design technical skills
  const webDesignSkills = [
    <div className="scrollskill">
      <SiReact size={32} />
      <p className="font-bold">React</p>
    </div>,
    <div className="scrollskill">
      <SiHtml5 size={32} />
      <p className="font-bold">HTML5</p>
    </div>,
    <div className="scrollskill">
      <SiJenkins size={32} />
      <p className="font-bold">Jenkins</p>
    </div>,
    <div className="scrollskill">
      <SiDocker size={32} />
      <p className="font-bold">Docker</p>
    </div>,
    <div className="scrollskill">
      <SiNodedotjs size={32} />
      <p className="font-bold">Node.js</p>
    </div>,
    <div className="scrollskill">
      <BiLogoAws size={32} />
      <p className="font-bold">AWS</p>
    </div>,
  ];

  // Graphic design technical skills
  const graphicDesignSkills = [
    <div className="scrollskill">
      <SiAdobepremierepro size={32} />
      <p className="font-bold">Premiere Pro</p>
    </div>,
    <div className="scrollskill">
      <SiAdobephotoshop size={32} />
      <p className="font-bold">Photoshop</p>
    </div>,
    <div className="scrollskill">
      <SiAdobeillustrator size={32} />
      <p className="font-bold">Illustrator</p>
    </div>,
    <div className="scrollskill">
        <SiAbletonlive size={32}/>
      
      <p className="font-bold">Ableton Live</p>
    </div>,
  ];

  const renderSkillsDivs = (skills) => {
    return skills.map((skill, index) => (
      <div key={index} className="skill-icon">
        {skill}
      </div>
    ));
  };

  return (
    <div
      id="scrolling"
      className="border-black w-full "
    >
      <div className="row h-32 flex flex-row">
        <div className="scroll-row items-center content-center flex flex-row space-x-6 lg:space-x-16">
          {renderSkillsDivs(mlDataScienceSkills)}
          {renderSkillsDivs(webDesignSkills)}
          {renderSkillsDivs(graphicDesignSkills)}
          {renderSkillsDivs(mlDataScienceSkills)}
          {renderSkillsDivs(webDesignSkills)}
          {renderSkillsDivs(graphicDesignSkills)}
        </div>
      </div>
    </div>
  );
};

export default InfiniteScroll;
