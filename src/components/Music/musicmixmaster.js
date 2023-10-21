
import { IoIosMusicalNotes, IoIosMusicalNote } from "react-icons/io";
import { MdGraphicEq } from "react-icons/md";
import { FaPenNib } from "react-icons/fa";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import Commuz_Titre from "../svg/Commuz_Titre.svg";
import { useState } from "react";
import ReactPlayer from "react-player";
import { useSwipeable } from "react-swipeable";

const MusicMixMaster = () => {
  return (
    <div className=" flex lg:flex-col flex-col h-auto gap-20 w-full lg:px-10">
      <div className="flex lg:flex-row flex-col w-full h-auto lg:gap-20 gap-10">
        <div className="flex flex-col lg:w-full h-full lg:p-10">
          <div className="flex flex-col justify-start items-center font-inter">
            <span className="mb-10 z-40 lg:text-base text-sm">
              {" "}
              During my 4 years of engineering school at Ecole Centrale de Lyon,
              I participated in a student-built student-led musical theatre
              project :{" "}
            </span>
            <img
              src={Commuz_Titre}
              alt="commuz"
              className="scale-90 hover:scale-95 active:scale-90 cursor-pointer transition-all duration-200 lg:w-1/2 dark:invert"
              onClick={() => window.open("https://commuz.fr", "_blank")}
            ></img>
            <blockquote class="relative mb-20">
              <div>
                <div className="rounded-t-xl border-1 border-black bg-white h-10 w-full block-shadow flex flex-row justify-start items-center ">
                  <div className="items-center px-3 space-x-2 flex flex-row mr-10">
                    <div className="h-3 w-3 border-1 rounded-full pressable border-black bg-green-500"></div>
                    <div className="h-3 w-3 border-1 rounded-full pressable border-black bg-yellow-500"></div>
                    <div className="h-3 w-3 border-1 rounded-full pressable border-black bg-rose-500"></div>
                  </div>
                </div>
                <p class="text-sm italic p-4 font-medium leading-relaxed text-gray-900 z-40 block-shadow bg-emerald-100 rounded-b-2xl border-black border-1 border-t-0 h-full w-full">
                  Commuz' is a student-led society that creates a new musical
                  theatre piece every year. Everything is done by the students :
                  Scenario, playwriting, Arrangement, Composition, Sound
                  Engineering, Recording, Mixing, Costumes, Props,
                  Choreography... Every year 80 students come together to create
                  a high quality, high reward Broadway-style musical play.
                </p>
              </div>
            </blockquote>
            
            <div className="flex lg:flex-row flex-col">
              <div className="lg:w-1/2">
                <p class="mt-8 font-inter leading-relaxed text-gray-900 dark:text-white   text-sm z-40 mb-10 lg:w-5/6 text-justify">
                  Every year, a new play is born and I took part in each one of
                  my 4 years at ECL. I started as a sound engineer and kept
                  mixing the album every year, which is mostly where I learned
                  to mix. Discover the specifics of each play below, and my
                  featured mixes from the 2022 edition here!
                </p>
                
                <p class="mt-8 font-inter leading-relaxed text-gray-900 dark:text-white font-bold lg:text-sm   text-sm z-40 lg:mb-20 mb-10 lg:w-full">
                  My roles each year of the play were:
                </p>
              </div>
              <div className=" grow lg:w-full h-full lg:flex lg:flex-row grid grid-cols-2 justify-between gap-5 py-10 select-none">
                <div className="lg:w-1/4 aspect-square flex flex-col border-1 block-shadow border-black overflow-hidden rounded-2xl shadow-md">
                  <ReactPlayer
                    width={"100%"}
                    height={"100%"}
                    url="https://soundcloud.com/jujgui/feeling-good?si=c425658d675349398a9ad64439e49e63&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing"
                  />
                </div>

                <div className="lg:w-1/4 aspect-square flex overflow-hidden border-1 block-shadow border-black rounded-2xl shadow-md">
                  <ReactPlayer
                    width={"100%"}
                    height={"100%"}
                    url="https://soundcloud.com/jujgui/joga?si=c425658d675349398a9ad64439e49e63&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing"
                  />
                </div>
                <div className="lg:w-1/4 aspect-square flex overflow-hidden border-1 block-shadow border-black rounded-2xl shadow-md">
                  <ReactPlayer
                    width={"100%"}
                    height={"100%"}
                    url="https://soundcloud.com/jujgui/still-loving-you?si=c425658d675349398a9ad64439e49e63&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing"
                  />
                </div>
                <div className="lg:w-1/4 aspect-square flex overflow-hidden border-1 block-shadow border-black rounded-2xl shadow-md">
                  <ReactPlayer
                    width={"100%"}
                    height={"100%"}
                    url="https://soundcloud.com/jujgui/le-rituel?si=c425658d675349398a9ad64439e49e63&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing"
                  />
                </div>
              </div>
              
            </div>
            <div className="w-full p-5 lg:px-10 flex flex-col lg:flex-row justify-between lg:mb-10 lg:h-auto  h-[500px]">
              <div
                className={`aspect-square w-12 h-12 border-black text-black border-1  rounded-full bg-white items-center lg:self-center flex justify-center relative`}
              >
                <IoIosMusicalNotes size={20} />
                <p className={`commuzpinkdate`}>2022</p>
                <ul className={`commuzpinkrole`}>
                  <li>Choir lead</li>
                  <li>Mix-Master Engineer</li>
                </ul>
              </div>
              <div className="lg:h-px w-px grow  dark:bg-white lg:ml-0 ml-6 bg-black lg:self-center lg:my-0 my-3" />
              <div
                className={`aspect-square  w-12 h-12 border-black border-1 text-black bg-white  rounded-full items-center lg:self-center flex justify-center relative`}
              >
                <IoIosMusicalNote size={20} />
                <p className={`commuzpinkdate`}>2021</p>
                <ul className={`commuzpinkrole`}>
                  <li>Bass vocalist</li>
                  <li>Mix Engineer</li>
                </ul>
              </div>
              <div className="lg:h-px w-px dark:bg-white lg:ml-0 ml-6 grow bg-black  lg:self-center lg:my-0 my-3"></div>
              <div
                className={`aspect-square w-12 h-12 border-black border-1 text-black bg-white rounded-full items-center lg:self-center flex justify-center relative`}
              >
                <FaPenNib size={18} />
                <p className={`commuzpinkdate`}>2020</p>
                <ul className={`commuzpinkrole`}>
                  <li>Graphic Designer</li>
                  <li>Community manager</li>
                </ul>
              </div>
              <div className="lg:h-px w-px lg:ml-0 ml-6 dark:bg-white grow bg-black lg:self-center lg:my-0 my-3" />

              <div
                className={`aspect-square  w-12 h-12 border-black border-1 text-black bg-white rounded-full items-center lg:self-center flex justify-center relative`}
              >
                <MdGraphicEq size={20} />
                <p className={`commuzpinkdate`}>2019</p>
                <ul className={`commuzpinkrole`}>
                  <li>Sound engineer</li>
                </ul>
              </div>
            </div>

            <p class="mt-8 font-inter    text-sm z-40 lg:hidden flex">
              And my featured mixes from the 2022 play are :
            </p>

            <p class="mt-0 font-inter font-bold     text-sm z-40 lg:hidden flex">
              Feeling Good, Joga, Still Loving You, Le Rituel
            </p>
          </div>
        </div>
      </div>
      <MixMasterAlbums />
    </div>
  );
};

const MixMasterAlbums = () => {
  const [album, setalbum] = useState(1);

  const changealbum = (right) => {
    var incr = right ? 1 : -1;
    var tempalbum = album + incr;

    if (tempalbum > 4) {
      tempalbum = 4;
    }
    if (tempalbum < 1) {
      tempalbum = 1;
    }
    setalbum(tempalbum);

    console.log(album);
  };

  const handlers = useSwipeable({
    onSwipedLeft: (eventData) => changealbum(true),
    onSwipedRight: (eventData) => changealbum(false),
  });

  return (
    <div className="flex lg:flex-row flex-col w-full h-auto lg:h-[700px] gap-20">
      <div
        className="flex lg:w-1/2 lg:h-5/6 flex-row justify-center self-center w-full"
        {...handlers}
      >
        <div
          className="hidden lg:flex h-14 border-2 border-white  aspect-square z-40 rounded-full mr-5 self-center cursor-pointer hover:shadow-md shadow-gray-800 active:scale-95 active:bg-gray-200 hover:border-black group hover:scale-105 ease-linear transition-all duration-[25ms] "
          onClick={() => changealbum(false)}
        >
          <BiSkipPrevious
            size={36}
            className="m-auto text-white group-hover:text-black group-hover:scale-105"
          />
        </div>
        <div className="lg:h-full h-[400px] lg:w-1/2 w-3/4 relative">
          <AlbumEmbed
            link={
              "https://open.spotify.com/embed/album/4boTthC3VNuTVeBVcmJAED?utm_source=generator"
            }
            currentalbum={album}
            albumid={1}
          />
          <AlbumEmbed
            link={
              "https://open.spotify.com/embed/album/75UGY5R9yFlqCxhYB91CLB?utm_source=generator"
            }
            currentalbum={album}
            albumid={2}
          />
          <AlbumEmbed
            link={
              "https://open.spotify.com/embed/album/4vHXsNBT0GHheB2SSNk7u1?utm_source=generator"
            }
            currentalbum={album}
            albumid={3}
          />
          <AlbumEmbed
            link={
              "https://open.spotify.com/embed/album/6ymtsIOKfk6TsKiHoGssp5?utm_source=generator"
            }
            currentalbum={album}
            albumid={4}
          />
        </div>

        <div
          className="hidden lg:flex h-14 border-2 border-white ml-5 aspect-square rounded-full z-40 self-center cursor-pointer hover:shadow-md shadow-gray-600 active:scale-95 active:bg-gray-200 hover:border-black group hover:scale-105 ease-linear transition-all duration-[25ms] "
          onClick={() => changealbum(true)}
        >
          <BiSkipNext
            size={36}
            className="m-auto text-white group-hover:text-black group-hover:scale-105"
          />
        </div>
      </div>
      <div className="flex flex-col lg:w-1/2 h-full gap-10">
        <div className="w-full p-5 px-10 flex flex-row justify-between ">
          <AlbumDate
            date={"2022"}
            color={"bg-purple-600"}
            albumid={1}
            currentalbum={album}
          />
          <div className="h-px grow bg-black self-center mx-3 dark:bg-white" />
          <AlbumDate
            date={"2021"}
            color={"bg-red-500"}
            albumid={2}
            currentalbum={album}
          />
          <div className="h-px grow bg-black self-center mx-3 dark:bg-white" />
          <AlbumDate
            date={"2020"}
            color={"bg-blue-600"}
            albumid={3}
            currentalbum={album}
          />
          <div className="h-px grow bg-black self-center mx-3 dark:bg-white" />
          <AlbumDate
            date={"2019"}
            color={"bg-orange-600"}
            albumid={4}
            currentalbum={album}
          />
        </div>
        <AlbumDescriptionEnMem albumid={1} currentalbum={album} />
        <AlbumDescriptionNocesDo albumid={2} currentalbum={album} />
        <AlbumDescriptionContre albumid={3} currentalbum={album} />
        <AlbumDescriptionDesorien albumid={4} currentalbum={album} />
      </div>
    </div>
  );
};

const AlbumDate = ({ date, color, albumid, currentalbum }) => {
  return (
    <div
      className={`aspect-square ${
        albumid === currentalbum ? color : "bg-gray-300 dark:bg-white"
      } ${
        albumid === currentalbum ? " h-3" : "h-2"
      } rounded-full self-center flex justify-center relative`}
    >
      <p
        className={`absolute text-black dark:text-white  mt-5   text-sm transition-all ${
          albumid === currentalbum ? "opacity-100" : "opacity-0"
        }`}
      >
        {date}
      </p>
    </div>
  );
};

const AlbumEmbed = ({ link, currentalbum, albumid }) => {
  var classname = "hidden";
  if (albumid === currentalbum) {
    classname =
      "w-full lg:h-4/5 h-full  absolute z-10 transition-all ease-linear duration-200 rounded-2xl block-shadow flex flex-col";
  }
  if (albumid === currentalbum - 1) {
    classname =
      " absolute lg:h-2/3 w-3/4 h-full lg:ml-[-40%] ml-[-20%] lg:mt-[25%] mt-[10%] z-0 blur-sm  transition-all ease-linear duration-200 pointer-events-none rounded-xl overflow-clip";
  }
  if (albumid === currentalbum + 1) {
    classname =
      "absolute lg:h-2/3 w-3/4  h-full z-0 blur-sm lg:mt-[25%] mt-[10%] lg:ml-[65%] ml-[45%] transition-all ease-linear duration-200 pointer-events-none rounded-xl overflow-clip";
  }

  return (
    <div className={classname}>
      
      <iframe
        src={link}
        className="h-full w-full  select-none rounded-2xl border-black bg-black border-1 block-shadow "
        allowfullscreen=""
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
        loading="lazy"
        title="album"
      ></iframe>
    </div>
  );
};

const AlbumDescriptionDesorien = ({ color, albumid, currentalbum }) => {
  return (
    <div
      className={`w-full grow flex flex-col p-3 ${
        currentalbum === albumid ? "flex" : "hidden"
      } ${
        currentalbum === albumid ? "opacity-100" : "opacity-0"
      } transition-all duration-150`}
    >
      <div className="w-full flex flex-row">
        <div className={`text-3xl font-inter font-bold  text-orange-500`}>
          Désorientés
        </div>
      </div>
      <div className="  text-sm">
        <p className="mt-6 font-inter mb-3">
          This was my first year in the play, and I joined as a sound engineer
          in charge of setting up recording equipment and live equipment for the
          musical and for rehearsals, as well as mixing the CD.
        </p>
        <p className="mt-5 font-inter mb-0">
          I absolutely loved the experience, and I knew I had to keep doing
          sound and mix engineering one way or the other in the following years,
          which prompted me to continue with the play and audition again the
          next year.
        </p>
      </div>
      <span className="mt-10 font-inter   text-sm mb-10">
        My mixes were very rudimentary: I barely discovered the concept of gain
        staging, EQ and stereo placement before getting the album out. I mixed
        my tracks on reaper with stock plugins. Nonetheless, I fell in love with
        mixing and audio post-production. My tracks are sloppy but I am proud as
        they were the start of my journey in mixing.
      </span>
      <ul className="flex  lg:flex-wrap lg:flex-row flex-col justify-evenly list-disc items-center text-orange-500   text-sm  ">
        <li className="font-inter font-bold">Ali Babouche</li>
        <li className="font-inter font-bold">Le bazar</li>
        <li className="font-inter font-bold">
          La fête au palais (cover of Aladin)
        </li>
      </ul>
    </div>
  );
};

const AlbumDescriptionEnMem = ({ color, albumid, currentalbum }) => {
  return (
    <div
      className={`w-full grow flex flex-col p-3 ${
        currentalbum === albumid ? "flex" : "hidden"
      } ${
        currentalbum === albumid ? "opacity-100" : "opacity-0"
      } transition-all duration-150`}
    >
      <div className="w-full flex flex-row">
        <div className={`text-3xl font-bold  text-purple-500`}>
          En memoria
        </div>
      </div>
      <div className="  text-sm">
        <p className="mt-6 font-inter mb-3">
          For this final year as a member of the musical, I was choir lead with
          the soprano from the previous year. My responisibilities included:
        </p>

        <ul className="list-disc ml-6">
          <li className="font-inter font-bold">
            Overseeing the performance of the SATB choir I was in the previous
            year
          </li>
          <li className="font-inter font-bold">
            Vocal coaching for the actors who sang on stage, including vocal
            warmups and technical sessions.
          </li>
          <li className="font-inter font-bold">
            Arrangement of vocal harmonies for the original compositions and
            orchestral covers. I really leaned into deepening my knowledge of
            music theory and solfege.
          </li>
        </ul>
        <p className="mt-10 font-inter mb-8">
          As with previous years, I helped in setting up the live performance
          sound-material wise, and with mixing the final cd for the screenplay
          and the spotify album. My mixes for this year:
        </p>
        <ul className="flex lg:flex-wrap lg:flex-row flex-col justify-evenly list-disc items-center text-purple-500 list-inside  ">
          <li className="font-inter font-bold">Treasure</li>
          <li className="font-inter font-bold">Joga</li>
          <li className="font-inter font-bold">Le rituel</li>
          <li className="font-inter font-bold">Feeling Good</li>
          <li className="font-inter font-bold">September</li>
          <li className="font-inter font-bold">La légende</li>
        </ul>
      </div>
      <span className="mt-10 font-inter">
        As per usual, I was also in charge of distributing the album on spotify
        and for the first time in charge of mastering the whole album.
      </span>
    </div>
  );
};

const AlbumDescriptionNocesDo = ({ color, albumid, currentalbum }) => {
  return (
    <div
      className={`w-full grow flex flex-col p-3 ${
        currentalbum === albumid ? "flex" : "hidden"
      } ${
        currentalbum === albumid ? "opacity-100" : "opacity-0"
      } transition-all duration-150`}
    >
      <div className="w-full flex flex-row">
        <div className={`text-3xl font-inter font-bold  text-red-500`}>
          Noces D'opium
        </div>
      </div>
      <div className="  text-sm">
        <p className="mt-6 font-inter mb-3">
          The third year of the musical was set in 1800s china during the opium
          wars. I joined the play as only bass vocalist of the choir: I
          performed for all musical pieces. If you hear a low voice in the
          album, it's probably me. This is the year I learned music theory and
          solfege.
        </p>
        <p className="mt-5 font-inter mb-0">
          As with previous years, I helped in setting up the live performance
          sound-material wise, and with mixing the final cd for the screenplay
          and the spotify album. :
        </p>

        <p className="mt-3 font-inter mb-8">
          Ableton quickly became my favorite DAW while mixing with it for the
          album. As per usual, I was also in charge of distributing the album on
          spotify. My contributions as mix engineer to the album were:
        </p>
      </div>
      <ul className="flex lg:flex-wrap lg:flex-row flex-col justify-evenly list-disc list-inside items-center text-red-500   text-sm">
        <li className="font-inter font-bold">Good Morning</li>
        <li className="font-inter font-bold">Eternal Youth</li>
        <li className="font-inter font-bold">I love you</li>
        <li className="font-inter font-bold">Tango Amoroso</li>
      </ul>
    </div>
  );
};

const AlbumDescriptionContre = ({ color, albumid, currentalbum }) => {
  return (
    <div
      className={`w-full grow flex flex-col p-3 ${
        currentalbum === albumid ? "flex" : "hidden"
      } ${
        currentalbum === albumid ? "opacity-100" : "opacity-0"
      } transition-all duration-150`}
    >
      <div className="w-full flex flex-row">
        <div className={`text-3xl font-inter font-bold  text-blue-500`}>
          Contretemps
        </div>
      </div>
      <div className="  text-sm">
        <p className="mt-6 font-inter mb-3">
          The second year of the musical was set in Versailles at the court of
          Louis XIV. I was recruited as community manager and graphic designer
          for the team. My responsibilities included:
        </p>
        <ul className="list-disc text-gray-900 dark:text-emerald-200 list-inside">
          <li className="font-inter font-bold">
            Creating social media content for the teams : the official poster,
            trailer videos, audition advertising media were all my creation
          </li>
          <li className="font-inter font-bold">
            Defining and orienting the artistic identity of the play
          </li>
        </ul>
        <p className="mt-5 font-inter mb-0">
          I helped arrange some
          original compositions, helped set up recording equipment during
          rehearsals and on the day of the play, and helped with mixing the album.
        </p>

        <p className="mt-5 font-inter mb-0">
          My mixes were still not great, but I was starting to
          understand key concepts about mixing and mastering. 
        </p>

        <p className="mt-3 font-inter mb-8">
          I was also in charge of distributing the album on spotify for the
          first time. My contributions as mix engineer to the album were:{" "}
        </p>

        <ul className="flex lg:flex-wrap lg:flex-row flex-col justify-evenly list-disc list-inside items-center text-blue-500   text-sm">
          <li className="font-inter font-bold">Te Deum</li>
          <li className="font-inter font-bold">A contretemps</li>
          <li className="font-inter font-bold">La cour dérape</li>
        </ul>
      </div>
    </div>
  );
};

export { MusicMixMaster };
