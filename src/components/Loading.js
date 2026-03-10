import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosSkipForward, IoIosSkipBackward } from "react-icons/io";
import { IoPlaySharp, IoPauseSharp } from "react-icons/io5";
import { HiOutlineHeart, HiHeart } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { setTheme } from '../utils/storage';

const MUSIC_TIME_MIN = 180;
const MUSIC_TIME_MAX = 240;
const ANIMATION_DURATION_MIN = 1200;
const ANIMATION_DURATION_MAX = 1800;

const musictime = Math.floor(Math.random() * (MUSIC_TIME_MAX - MUSIC_TIME_MIN) + MUSIC_TIME_MIN);
const minutes = Math.floor(musictime / 60);
const seconds = ("0" + (musictime % 60)).slice(-2);

const data = [
  "Hey!",
  "This page is interactive.",
  "just a fun little tweak",
  "click play to learn more about me!",
  "Go on!",
  "?",
  "there's not much more here",
  "you can keep going but...",
  "not going to find much more",
];
const maxreplies = data.length;

const Loader = () => {
  const [isLiked, setisLiked] = useState(false);
  const [liked, setLiked] = useState(() => Array(maxreplies).fill(false));
  const [isplaying, setisplaying] = useState(false);
  const [replyindex, setReply] = useState(1);
  const [paused, setPaused] = useState(true);
  const [progressTime, setProgressTime] = useState("0:00");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [barProgress, setBarProgress] = useState(0);
  const barIntervalRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setTheme('light');
  }, []);

  useEffect(() => {
    return () => stopBar();
  }, []);

  const minreply = 0;

  const startBar = () => {
    const duration = Math.floor(
      Math.random() * (ANIMATION_DURATION_MAX - ANIMATION_DURATION_MIN) + ANIMATION_DURATION_MIN
    );
    const steps = 100;
    const stepInterval = duration / steps;
    let step = 0;
    barIntervalRef.current = setInterval(() => {
      step++;
      const progress = step / steps;
      setBarProgress(step);
      const time_seconds = Math.round(progress * musictime);
      setProgressTime(
        Math.floor(time_seconds / 60) + ':' + ('0' + (time_seconds % 60)).slice(-2)
      );
      if (step >= steps) {
        clearInterval(barIntervalRef.current);
        setIsTransitioning(true);
        setTimeout(() => navigate('/about'), 500);
      }
    }, stepInterval);
  };

  const stopBar = () => {
    if (barIntervalRef.current) {
      clearInterval(barIntervalRef.current);
      barIntervalRef.current = null;
    }
  };

  const resetBar = () => {
    stopBar();
    setBarProgress(0);
    setProgressTime('0:00');
  };

  function setlike() {
    setLiked(prev => {
      const next = [...prev];
      next[replyindex - 1] = !next[replyindex - 1];
      setisLiked(next[replyindex - 1]);
      return next;
    });
  }

  function animatelike() {
    setlike();
  }

  useEffect(() => {
    replies();
  }, [replyindex]);

  function replies() {
    setisLiked(liked[replyindex - 1]);
    resetBar();
    setPaused(true);
  }

  function playanimation() {
    if (paused === false) {
      startBar();
      setisplaying(true);
    } else {
      stopBar();
      setisplaying(false);
    }
  }

  useEffect(() => {
    playanimation();
  }, [paused]);

  return (
    <div
      className={`h-screen w-screen relative flex bg-white text-black flex-col align-middle justify-center items-center lg:px-0 px-0 py-12 transition-opacity duration-500 overflow-hidden ${
        isTransitioning ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Decorative floating blobs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-rose-100/60 blur-3xl animate-pulse pointer-events-none" style={{ animationDuration: '4s' }} />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-orange-100/60 blur-3xl animate-pulse pointer-events-none" style={{ animationDuration: '6s', animationDelay: '2s' }} />
      <div className="absolute top-1/2 right-1/3 w-32 h-32 rounded-full bg-pink-100/40 blur-2xl animate-pulse pointer-events-none" style={{ animationDuration: '5s', animationDelay: '1s' }} />
      <div
        className="flex flex-col lg:w-[30%] w-full aspect-[0.75] border-[2px] border-none rounded-3xl  transition-all duration-200"
        id="container"
      >
        <div className="h-12 border-b-[1px]  border-none overflow-hidden rounded-t-3xl flex flex-row justify-start items-center p-3 space-x-3 hidden">
          <div className="h-3 w-3 border-1 rounded-full pressable  border-black bg-green-500"></div>
          <div className="h-3 w-3 border-1 rounded-full pressable  border-black bg-yellow-500"></div>
          <div className="h-3 w-3 border-1 rounded-full pressable  border-black bg-rose-500"></div>
        </div>
        <div className="flex flex-col p-6">
          <div
            className="w-full aspect-square rounded-3xl overflow-hidden"
            id="transition"
            style={{
              background: 'linear-gradient(-45deg, #FEA4B0, #FECC96, #FFE8F0, #FFF2B8, #FEA4B0)',
              backgroundSize: '300% 300%',
              animation: 'loading-gradient 6s ease infinite',
            }}
          />
          <div className="flex flex-col">
            <div className="flex flex-row justify-between px-5 py-5  ">
              <div className="flex flex-col" id="song">
                <div className="lg:text-lg text-base font-bold song select-none overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={replyindex}
                      id="songtitle"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.15, ease: 'easeInOut' }}
                    >
                      {data[replyindex - 1]}
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div
                  className="text-sm home-accent-text select-none font-bold"
                  id="artist"
                >
                  Julien Guinot
                </div>
              </div>
              <div className="active:scale-90 transition-all duration-200">
              {isLiked ? (
                <HiHeart
                  className="pressable text-rose-500 drop-shadow-lg heart stroke-1 stroke-black"
                  size={32}
                  onClick={() => animatelike()}
                />
              ) : (
                <HiOutlineHeart
                  className="pressable text-gray-600 heart stroke-1 stroke-black"
                  size={32}
                  onClick={() => animatelike()}
                />
              )}
              </div>
            </div>

            <div className="flex flex-row h-full align-middle justify-between lg:px-5 space-x-3 lg:mb-2 mb-4">
              <div
                className="   flex flex-col justify-center   lg:text-base select-none"
                id="progresstime"
              >
                {progressTime}
              </div>

              <div className="h-2 w-full flex flex-col justify-center self-center lg:px-2 px-1">
                <div
                  className="w-full h-full rounded-full relative overflow-hidden shadow-inner bg-black/5"
                  id="bar"
                >
                  <div
                    id="progress"
                    style={{ width: `${barProgress}%` }}
                    className="h-full bg-gradient-to-r from-rose-400 via-orange-300 to-yellow-200 transition-none"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full pointer-events-none"
                    style={{
                      background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)'
                    }}
                  ></div>
                </div>
              </div>

              <div className="    lg:text-lg select-none" id="totaltime">
                {minutes}:{seconds}
              </div>
            </div>

            <div
              className="flex flex-row align-middle w-full justify-evenly"
              id="buttons"
            >
              <div className="flex flex-row justify-between w-1/3 align-middle ">
                <button
                  type="button"
                  className="flex flex-col justify-center cursor-pointer"
                  onClick={() => {
                    if (replyindex - 1 < minreply + 1) {
                      setReply(maxreplies);

                    } else {
                      setReply(replyindex - 1);
                    }
                  }}
                >
                  <IoIosSkipBackward
                    className="pressable active:home-accent-text"
                    size={20}
                  ></IoIosSkipBackward>
                </button>

                <button
                  type="button"
                  className="flex flex-col justify-center pressable rounded-full p-2 active:scale-95 active:bg-rose-100 transition-all duration-150 ease-in-out cursor-pointer"
                  onClick={() => setPaused(!paused)}
                >
                  <AnimatePresence mode="wait">
                    {isplaying ? (
                      <motion.span
                        key="pause"
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.6 }}
                        transition={{ duration: 0.1, ease: 'easeInOut' }}
                        className="flex items-center justify-center"
                      >
                        <IoPauseSharp size={32} className="text-rose-500" />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="play"
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.6 }}
                        transition={{ duration: 0.1, ease: 'easeInOut' }}
                        className="flex items-center justify-center"
                      >
                        <IoPlaySharp size={32} className="text-gray-600 hover:text-rose-500 transition-colors duration-150" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>

                <button
                  type="button"
                  className="flex flex-col justify-center active:home-accent-text cursor-pointer"
                  onClick={() => {
                    if (replyindex +1 < minreply + 1) {
                      setReply(maxreplies);
                    } else if (replyindex +1 > maxreplies) {
                      setReply(minreply + 1);
                    } else {
                      setReply(replyindex +1);
                    };
                  }}
                >
                  <IoIosSkipForward className="pressable" size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
