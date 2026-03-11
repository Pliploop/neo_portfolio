
import { albums } from '../../data/music';
import { IoIosMusicalNotes, IoIosMusicalNote } from "react-icons/io";
import { MdGraphicEq } from "react-icons/md";
import { FaPenNib } from "react-icons/fa";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import Commuz_Titre from "../svg/Commuz_Titre.svg";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    <div className="flex lg:flex-col flex-col h-auto gap-20 w-full">
      <div className="flex lg:flex-row flex-col w-full h-auto lg:gap-20 gap-10">
        <div className="flex flex-col lg:w-full h-full">
          <div className="flex flex-col justify-start items-center">

            {/* Intro text */}
            <p className="mb-10 z-40 lg:text-base text-sm text-center max-w-2xl text-black/65 dark:text-white/65">
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
              <p className="text-sm italic font-medium leading-relaxed text-black/70 dark:text-white/80">
                Commuz' is a student-led society that creates a new musical theatre piece every year.
                Everything is done by the students: Scenario, playwriting, Arrangement, Composition,
                Sound Engineering, Recording, Mixing, Costumes, Props, Choreography… Every year 80
                students come together to create a high quality, high reward Broadway-style musical play.
              </p>
            </div>

            <div className="flex lg:flex-row flex-col w-full">
              {/* Left text */}
              <div className="lg:w-1/2">
                <p className="mt-8 leading-relaxed text-black/65 dark:text-white/65 text-sm z-40 mb-10 lg:w-5/6 text-justify">
                  Every year, a new play is born and I took part in each one of my 4 years at ECL.
                  I started as a sound engineer and kept mixing the album every year, which is mostly
                  where I learned to mix. Discover the specifics of each play below, and my featured
                  mixes from the 2022 edition here!
                </p>
                <p className="mt-8 leading-relaxed text-black/80 dark:text-white font-bold lg:text-sm text-sm z-40 lg:mb-20 mb-10 lg:w-full">
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
            <p className="mt-8  text-sm z-40 lg:hidden flex">
              And my featured mixes from the 2022 play are:
            </p>
            <p className="mt-0  font-bold text-sm z-40 lg:hidden flex">
              Feeling Good, Joga, Still Loving You, Le Rituel
            </p>
          </div>
        </div>
      </div>
      <MixMasterAlbums />
    </div>
  );
};

const ALBUM_DATA = [
  {
    id: 1, year: "2022", title: "En memoria",
    roles: ["Choir lead", "Mix Engineer", "Mastering Engineer"],
    description: "My final year. Led the SATB choir, coached actors on stage, arranged vocal harmonies, and handled the full mix and master.",
    tracks: ["Treasure", "Joga", "Le rituel", "Feeling Good", "September", "La légende"],
  },
  {
    id: 2, year: "2021", title: "Noces D'opium",
    roles: ["Bass Vocalist", "Mix Engineer"],
    description: "Set in 1800s China. Joined as the only bass vocalist of the choir — also the year I learned music theory and fell in love with Ableton.",
    tracks: ["Good Morning", "Eternal Youth", "I love you", "Tango Amoroso"],
  },
  {
    id: 3, year: "2020", title: "Contretemps",
    roles: ["Graphic Designer", "Community Manager", "Mix Engineer"],
    description: "Set at Versailles under Louis XIV. Handled social media, the official poster, trailer videos, and defined the artistic identity of the play.",
    tracks: ["Te Deum", "A contretemps", "La cour dérape"],
  },
  {
    id: 4, year: "2019", title: "Désorientés",
    roles: ["Sound Engineer"],
    description: "My first year — recording, live setup, and mixing the CD. My mixes were rudimentary, but this is where the journey began.",
    tracks: ["Ali Babouche", "Le bazar", "La fête au palais"],
  },
];

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

  const active = ALBUM_DATA.find(a => a.id === album);

  return (
    <div className="flex lg:flex-row flex-col w-full gap-10 lg:gap-16">
      {/* Left: Spotify embed carousel */}
      <div
        className="flex lg:w-5/12 flex-row justify-center items-center gap-3 w-full"
        {...handlers}
        onKeyDown={e => { if (e.key === 'ArrowRight') changealbum(true); if (e.key === 'ArrowLeft') changealbum(false); }}
        tabIndex={0}
        role="region"
        aria-label="Album carousel"
      >
        <button type="button" onClick={() => changealbum(false)}
          className="hidden lg:flex h-9 w-9 rounded-full bg-white/30 dark:bg-white/8 items-center justify-center hover:bg-white/50 dark:hover:bg-white/15 transition-all duration-150 cursor-pointer flex-shrink-0">
          <BiSkipPrevious size={18} className="text-black/60 dark:text-white/60" />
        </button>

        <div className="lg:h-[380px] h-[340px] flex-1 relative overflow-visible">
          {albums.map((a) => (
            <AlbumEmbed key={a.id} link={a.spotifyUrl} currentalbum={album} albumid={a.id} />
          ))}
        </div>

        <button type="button" onClick={() => changealbum(true)}
          className="hidden lg:flex h-9 w-9 rounded-full bg-white/30 dark:bg-white/8 items-center justify-center hover:bg-white/50 dark:hover:bg-white/15 transition-all duration-150 cursor-pointer flex-shrink-0">
          <BiSkipNext size={18} className="text-black/60 dark:text-white/60" />
        </button>
      </div>

      {/* Right: year tabs + content */}
      <div className="flex flex-col lg:flex-1 gap-5">
        {/* Year tab strip */}
        <div className="flex gap-2">
          {ALBUM_DATA.map(a => (
            <button key={a.id} type="button" onClick={() => setalbum(a.id)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-150 cursor-pointer ${
                album === a.id
                  ? 'bg-rose-500 text-white shadow-sm'
                  : 'bg-black/6 dark:bg-white/8 text-black/50 dark:text-white/50 hover:bg-black/10 dark:hover:bg-white/14'
              }`}>
              {a.year}
            </button>
          ))}
        </div>

        {/* Content — animated on album change */}
        <AnimatePresence mode="wait">
          <motion.div
            key={album}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="rounded-2xl bg-white/30 dark:bg-black/20 backdrop-blur-sm p-5 flex flex-col gap-4"
          >
            {/* Title + roles */}
            <div>
              <h3 className="font-bold text-xl text-black/85 dark:text-white mb-2">{active.title}</h3>
              <div className="flex flex-wrap gap-1.5">
                {active.roles.map(r => (
                  <span key={r} className="px-2 py-0.5 rounded-full text-[11px] bg-rose-400/10 dark:bg-orange-400/8 text-rose-700 dark:text-orange-300 font-medium">{r}</span>
                ))}
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-black/60 dark:text-white/60 leading-relaxed">{active.description}</p>

            {/* Track list */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-rose-500 dark:text-orange-400 mb-2">My mixes</p>
              <div className="flex flex-wrap gap-1.5">
                {active.tracks.map(t => (
                  <span key={t} className="px-2.5 py-1 rounded-full text-xs bg-black/5 dark:bg-white/8 text-black/55 dark:text-white/55 font-medium">{t}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
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
      className="absolute w-full h-full transition-all duration-500 ease-out rounded-2xl overflow-clip"
      style={{
        transform: window.innerWidth >= 1024 ? transform : mobileTransform,
        opacity, zIndex, filter: blur,
        pointerEvents: albumid === currentalbum ? 'auto' : 'none',
      }}
    >
      <iframe
        src={link}
        className="h-full w-full select-none rounded-2xl shadow-lg"
        allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
        loading="lazy" title="album"
      />
    </div>
  );
};

export { MusicMixMaster };
