
import { albums } from '../../data/music';
import { IoIosMusicalNotes, IoIosMusicalNote } from "react-icons/io";
import { MdGraphicEq } from "react-icons/md";
import { FaPenNib } from "react-icons/fa";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import Commuz_Titre from "../svg/Commuz_Titre.svg";
import { useState } from "react";
import ReactPlayer from "react-player";
import { useSwipeable } from "react-swipeable";

const timelineItems = [
  { year: 2022, icon: <IoIosMusicalNotes size={18} />, roles: ["Choir lead", "Mix-Master Engineer"] },
  { year: 2021, icon: <IoIosMusicalNote size={18} />, roles: ["Bass vocalist", "Mix Engineer"] },
  { year: 2020, icon: <FaPenNib size={16} />, roles: ["Graphic Designer", "Community manager"] },
  { year: 2019, icon: <MdGraphicEq size={18} />, roles: ["Sound engineer"] },
];

const MusicMixMaster = () => {
  return (
    <div className="flex lg:flex-col flex-col h-auto gap-20 w-full lg:px-10">
      <div className="flex lg:flex-row flex-col w-full h-auto lg:gap-20 gap-10">
        <div className="flex flex-col lg:w-full h-full lg:p-10">
          <div className="flex flex-col justify-start items-center font-inter">

            {/* Intro text */}
            <p className="mb-10 z-40 lg:text-base text-sm text-center max-w-2xl">
              During my 4 years of engineering school at Ecole Centrale de Lyon,
              I participated in a student-built student-led musical theatre project:
            </p>

            {/* Logo */}
            <a href="https://commuz.fr" target="_blank" rel="noreferrer" aria-label="Visit Commuz website">
              <img
                src={Commuz_Titre}
                alt="Commuz logo"
                className="scale-90 hover:scale-95 active:scale-90 cursor-pointer transition-all duration-200 lg:w-1/2 dark:invert"
              />
            </a>

            {/* Description card */}
            <div className="rounded-2xl bg-white/30 dark:bg-black/20 backdrop-blur-sm shadow-lg p-6 mb-20 max-w-2xl w-full mt-6">
              <p className="text-sm italic font-medium leading-relaxed text-gray-800 dark:text-white">
                Commuz' is a student-led society that creates a new musical theatre piece every year.
                Everything is done by the students: Scenario, playwriting, Arrangement, Composition,
                Sound Engineering, Recording, Mixing, Costumes, Props, Choreography… Every year 80
                students come together to create a high quality, high reward Broadway-style musical play.
              </p>
            </div>

            <div className="flex lg:flex-row flex-col w-full">
              {/* Left text */}
              <div className="lg:w-1/2">
                <p className="mt-8 font-inter leading-relaxed text-gray-900 dark:text-white text-sm z-40 mb-10 lg:w-5/6 text-justify">
                  Every year, a new play is born and I took part in each one of my 4 years at ECL.
                  I started as a sound engineer and kept mixing the album every year, which is mostly
                  where I learned to mix. Discover the specifics of each play below, and my featured
                  mixes from the 2022 edition here!
                </p>
                <p className="mt-8 font-inter leading-relaxed text-gray-900 dark:text-white font-bold lg:text-sm text-sm z-40 lg:mb-20 mb-10 lg:w-full">
                  My roles each year of the play were:
                </p>
              </div>

              {/* SoundCloud embeds */}
              <div className="grow lg:w-full h-full lg:flex lg:flex-row grid grid-cols-2 justify-between gap-5 py-10 select-none">
                {[
                  "https://soundcloud.com/jujgui/feeling-good?si=c425658d675349398a9ad64439e49e63&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
                  "https://soundcloud.com/jujgui/joga?si=c425658d675349398a9ad64439e49e63&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
                  "https://soundcloud.com/jujgui/still-loving-you?si=c425658d675349398a9ad64439e49e63&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
                  "https://soundcloud.com/jujgui/le-rituel?si=c425658d675349398a9ad64439e49e63&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
                ].map((url, i) => (
                  <div key={i} className="lg:w-1/4 aspect-square overflow-hidden rounded-2xl shadow-md">
                    <ReactPlayer width="100%" height="100%" url={url} />
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="w-full lg:px-6 py-8 mt-4">
              <div className="relative flex justify-between items-start">
                {/* Connector line */}
                <div className="absolute top-5 left-0 right-0 h-px bg-black/15 dark:bg-white/15 z-0" />

                {timelineItems.map((item, i) => (
                  <div key={i} className="relative z-10 flex flex-col items-center gap-2 w-1/4 px-2">
                    <div className="w-10 h-10 rounded-full bg-white dark:bg-gray-900 shadow-md flex items-center justify-center text-rose-500 dark:text-orange-300">
                      {item.icon}
                    </div>
                    <span className="text-sm font-bold text-rose-600 dark:text-orange-300 mt-1">{item.year}</span>
                    <ul className="text-xs text-center text-gray-500 dark:text-gray-400 space-y-1">
                      {item.roles.map((role) => (
                        <li key={role}>{role}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile mix list */}
            <p className="mt-8 font-inter text-sm z-40 lg:hidden flex">
              And my featured mixes from the 2022 play are:
            </p>
            <p className="mt-0 font-inter font-bold text-sm z-40 lg:hidden flex">
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
    const incr = right ? 1 : -1;
    let next = album + incr;
    if (next > albums.length) next = albums.length;
    if (next < 1) next = 1;
    setalbum(next);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => changealbum(true),
    onSwipedRight: () => changealbum(false),
  });

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') changealbum(true);
    if (e.key === 'ArrowLeft') changealbum(false);
  };

  return (
    <div className="flex lg:flex-row flex-col w-full h-auto lg:h-[700px] gap-20">
      <div
        className="flex lg:w-1/2 lg:h-5/6 flex-row justify-center self-center w-full overflow-x-visible"
        {...handlers}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="region"
        aria-label="Album carousel"
      >
        <button
          type="button"
          className="hidden lg:flex h-12 w-12 backdrop-blur-md bg-white/30 dark:bg-black/30 shadow-md aspect-square z-40 rounded-full mr-5 self-center cursor-pointer hover:shadow-lg hover:scale-110 active:scale-95 group transition-all duration-200"
          onClick={() => changealbum(false)}
        >
          <BiSkipPrevious size={24} className="m-auto text-black dark:text-white group-hover:text-rose-500 transition-colors duration-200" />
        </button>

        <div className="lg:h-full h-[400px] lg:w-1/2 w-3/4 relative overflow-visible">
          {albums.map((a) => (
            <AlbumEmbed key={a.id} link={a.spotifyUrl} currentalbum={album} albumid={a.id} />
          ))}
        </div>

        <button
          type="button"
          className="hidden lg:flex h-12 w-12 backdrop-blur-md bg-white/30 dark:bg-black/30 shadow-md aspect-square rounded-full z-40 self-center cursor-pointer hover:shadow-lg hover:scale-110 active:scale-95 group transition-all duration-200 ml-5"
          onClick={() => changealbum(true)}
        >
          <BiSkipNext size={24} className="m-auto text-black dark:text-white group-hover:text-rose-500 transition-colors duration-200" />
        </button>
      </div>

      <div className="flex flex-col lg:w-1/2 h-full gap-10">
        {/* Year dots */}
        <div className="w-full px-5 flex flex-row justify-between items-center">
          {[
            { date: "2022", color: "bg-rose-500", albumid: 1 },
            { date: "2021", color: "bg-red-500",  albumid: 2 },
            { date: "2020", color: "bg-blue-500", albumid: 3 },
            { date: "2019", color: "bg-orange-500", albumid: 4 },
          ].map((item, i, arr) => (
            <>
              <AlbumDate key={item.albumid} date={item.date} color={item.color} albumid={item.albumid} currentalbum={album} />
              {i < arr.length - 1 && <div className="h-px grow bg-black/15 dark:bg-white/15 mx-3" />}
            </>
          ))}
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
  const isActive = albumid === currentalbum;
  return (
    <div className="flex flex-col items-center gap-1 relative">
      <div className={`rounded-full transition-all duration-300 ${isActive ? `${color} h-3 w-3` : "bg-gray-300 dark:bg-white/30 h-2 w-2"}`} />
      <p className={`absolute top-5 text-sm text-black dark:text-white transition-all duration-300 whitespace-nowrap ${isActive ? "opacity-100" : "opacity-0"}`}>
        {date}
      </p>
    </div>
  );
};

const AlbumEmbed = ({ link, currentalbum, albumid }) => {
  const diff = albumid - currentalbum;
  const absDiff = Math.abs(diff);

  const transform = (() => {
    if (diff === 0) return "translateX(0%) scale(1)";
    if (diff === -1) return "translateX(-30%) scale(0.85)";
    if (diff === 1) return "translateX(30%) scale(0.85)";
    return diff < 0 ? "translateX(-200%) scale(0.8)" : "translateX(200%) scale(0.8)";
  })();

  const mobileTransform = (() => {
    if (diff === 0) return "translateX(0%) scale(1)";
    if (diff === -1) return "translateX(-5%) scale(0.9)";
    if (diff === 1) return "translateX(5%) scale(0.9)";
    return diff < 0 ? "translateX(-200%) scale(0.8)" : "translateX(200%) scale(0.8)";
  })();

  const opacity = absDiff === 0 ? 1 : absDiff === 1 ? 0.4 : absDiff === 2 ? 0.05 : 0;
  const zIndex = diff === 0 ? 10 : diff === -1 ? 9 : diff === 1 ? 8 : 7 - absDiff;
  const blur = absDiff === 0 ? "blur(0px)" : absDiff === 1 ? "blur(5px)" : absDiff === 2 ? "blur(15px)" : "blur(40px)";

  return (
    <div
      className="absolute w-full lg:h-4/5 h-full transition-all duration-500 ease-out rounded-2xl overflow-clip"
      style={{
        transform: window.innerWidth >= 1024 ? transform : mobileTransform,
        opacity,
        zIndex,
        filter: blur,
        pointerEvents: albumid === currentalbum ? 'auto' : 'none',
      }}
    >
      <iframe
        src={link}
        className="h-full w-full select-none rounded-2xl shadow-lg"
        allowFullScreen=""
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
        loading="lazy"
        title="album"
      />
    </div>
  );
};

const albumDescClass = (currentalbum, albumid) =>
  `w-full grow flex flex-col p-3 transition-all duration-150 ${currentalbum === albumid ? "flex opacity-100" : "hidden opacity-0"}`;

const TrackList = ({ tracks, color }) => (
  <ul className={`flex lg:flex-wrap lg:flex-row flex-col justify-evenly list-disc list-inside items-center ${color} text-sm`}>
    {tracks.map((t) => <li key={t} className="font-inter font-bold">{t}</li>)}
  </ul>
);

const AlbumDescriptionEnMem = ({ albumid, currentalbum }) => (
  <div className={albumDescClass(currentalbum, albumid)}>
    <div className="text-3xl font-bold text-rose-500 mb-2">En memoria</div>
    <div className="text-sm space-y-3">
      <p className="font-inter">For this final year as a member of the musical, I was choir lead. My responsibilities included:</p>
      <ul className="list-disc ml-6 space-y-1">
        <li className="font-inter font-bold">Overseeing the performance of the SATB choir</li>
        <li className="font-inter font-bold">Vocal coaching for the actors who sang on stage</li>
        <li className="font-inter font-bold">Arrangement of vocal harmonies for original compositions</li>
      </ul>
      <p className="font-inter">As with previous years, I helped with sound setup and mixing the final CD. My mixes for this year:</p>
    </div>
    <TrackList tracks={["Treasure", "Joga", "Le rituel", "Feeling Good", "September", "La légende"]} color="text-rose-500" />
    <span className="mt-6 font-inter text-sm">As per usual, I was also in charge of distributing the album on Spotify and for the first time in charge of mastering the whole album.</span>
  </div>
);

const AlbumDescriptionNocesDo = ({ albumid, currentalbum }) => (
  <div className={albumDescClass(currentalbum, albumid)}>
    <div className="text-3xl font-inter font-bold text-red-500 mb-2">Noces D'opium</div>
    <div className="text-sm space-y-3">
      <p className="font-inter">The third year of the musical was set in 1800s China during the opium wars. I joined the play as only bass vocalist of the choir. This is the year I learned music theory and solfege.</p>
      <p className="font-inter">Ableton quickly became my favorite DAW while mixing with it for the album. My contributions as mix engineer:</p>
    </div>
    <TrackList tracks={["Good Morning", "Eternal Youth", "I love you", "Tango Amoroso"]} color="text-red-500" />
  </div>
);

const AlbumDescriptionContre = ({ albumid, currentalbum }) => (
  <div className={albumDescClass(currentalbum, albumid)}>
    <div className="text-3xl font-inter font-bold text-blue-500 mb-2">Contretemps</div>
    <div className="text-sm space-y-3">
      <p className="font-inter">The second year was set in Versailles at the court of Louis XIV. I was recruited as community manager and graphic designer.</p>
      <ul className="list-disc ml-6 space-y-1 text-gray-900 dark:text-emerald-200">
        <li className="font-inter font-bold">Creating social media content: official poster, trailer videos, audition media</li>
        <li className="font-inter font-bold">Defining and orienting the artistic identity of the play</li>
      </ul>
      <p className="font-inter">My contributions as mix engineer:</p>
    </div>
    <TrackList tracks={["Te Deum", "A contretemps", "La cour dérape"]} color="text-blue-500" />
  </div>
);

const AlbumDescriptionDesorien = ({ albumid, currentalbum }) => (
  <div className={albumDescClass(currentalbum, albumid)}>
    <div className="text-3xl font-inter font-bold text-orange-500 mb-2">Désorientés</div>
    <div className="text-sm space-y-3">
      <p className="font-inter">This was my first year in the play, joining as sound engineer in charge of recording/live equipment and mixing the CD.</p>
      <p className="font-inter">I absolutely loved the experience — it prompted me to continue with the play and audition again the next year.</p>
      <p className="font-inter">My mixes were rudimentary but this is where my journey in mixing began.</p>
    </div>
    <TrackList tracks={["Ali Babouche", "Le bazar", "La fête au palais"]} color="text-orange-500" />
  </div>
);

export { MusicMixMaster };
