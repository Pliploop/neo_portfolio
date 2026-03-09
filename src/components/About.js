import React, { useState, useEffect } from "react";
import { setTheme } from '../utils/storage';
import { useNavigate } from "react-router-dom";
import { MeshGradientRenderer } from '@johnn-e/react-mesh-gradient';
// TODO: migrate to framer-motion (Task 9) — anime.js removed
import { IoIosSkipForward, IoIosSkipBackward } from "react-icons/io";
import { IoPlaySharp, IoPauseSharp } from "react-icons/io5";
import { HiOutlineHeart, HiHeart } from "react-icons/hi2";

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
const Liked = Array(maxreplies).fill(false);

const Loader = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isLiked, setisLiked] = useState(false);
  const [isplaying, setisplaying] = useState(false);
  const [replyindex, setReply] = useState(1);
  const [paused, setPaused] = useState(true);
  const [progressTime, setProgressTime] = useState("0:00");
  const navigate = useNavigate();

  // TODO: migrate to framer-motion (Task 9)
  // const animate = () => { ... anime.timeline ... };

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 10);
    // animate(); // TODO: migrate to framer-motion (Task 9)
    return () => clearTimeout(timeout);
  }, []);

  // Loader logic
  useEffect(() => {
    setTheme('light');
  }, []);

  const playref = React.useRef(null);
  const barref = React.useRef(null);

  // TODO: migrate to framer-motion (Task 9) — playref anime.timeline commented out
  useEffect(() => {
    // playref.current = anime.timeline({ ... });
  }, []);

  // TODO: migrate to framer-motion (Task 9) — barref anime.timeline commented out
  useEffect(() => {
    // barref.current = anime.timeline({ ... navigate('/about') ... });
  }, [navigate]);

  const minreply = 0;

  function setlike() {
    Liked[replyindex - 1] = !Liked[replyindex - 1];
    setisLiked(Liked[replyindex - 1]);
  }

  function animatelike() {
    setlike();
  }

  useEffect(() => {
    replies();
  }, [replyindex]);

  function replies() {
    // TODO: migrate to framer-motion (Task 9) — anime.timeline song transition commented out
    // const prevnext = anime.timeline({ ... });

    // Update song title directly without animation
    const el = document.getElementById("songtitle");
    if (el) el.innerHTML = data[replyindex - 1];

    setisLiked(Liked[replyindex - 1]);
    if (playref.current) playref.current.reset();
    if (barref.current) barref.current.reset();
    setPaused(true);
  }

  function playanimation() {
    // TODO: migrate to framer-motion (Task 9) — anime ref calls guarded until migration
    if (paused == false) {
      if (playref.current) { playref.current.reset(); playref.current.play(); }
      if (barref.current) barref.current.play();
      setisplaying(true);
    } else {
      if (barref.current) barref.current.pause();
      if (playref.current) { playref.current.reverse(); playref.current.play(); }
      setisplaying(false);
    }
  }

  useEffect(() => {
    playanimation();
  }, [paused]);

  return (
    <div
      className="h-screen w-screen flex bg-white text-black flex-col align-middle justify-center items-center lg:px-0 px-0 py-12"
      isMounted={isMounted}
      isLiked={isLiked}
    >
      <div
        className="flex flex-col lg:w-[30%] w-full aspect-[0.75] border-[2px] border-none rounded-3xl transition-all duration-200"
        id="container"
      >
        <div className="h-12 border-b-[1px] border-none overflow-hidden rounded-t-3xl flex flex-row justify-start items-center p-3 space-x-3 hidden">
          <div className="h-3 w-3 border-1 rounded-full pressable border-black bg-green-500"></div>
          <div className="h-3 w-3 border-1 rounded-full pressable border-black bg-yellow-500"></div>
          <div className="h-3 w-3 border-1 rounded-full pressable border-black bg-rose-500"></div>
        </div>
        <div className="flex flex-col p-6">
          <div
            className="w-full aspect-square border-none border-2 rounded-3xl relative overflow-hidden"
            id="transition"
          >
            <MeshGradientRenderer
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                opacity: 0.2,
              }}
              colors={["#FEA4B0", "#FECC96", "#FFFFFF", "#FFE8F0", "#FFF2B8"]}
              speed={0.01}
            />
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row justify-between px-5 py-5">
              <div className="flex flex-col" id="song">
                <div
                  className="lg:text-lg text-base font-bold song select-none"
                  id="songtitle"
                >
                  {data[0]}
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
                    className="pressable home-accent-text white-block-shadow stroke-1 stroke-black heart"
                    size={32}
                    onClick={() => animatelike()}
                  />
                ) : (
                  <HiOutlineHeart
                    className="pressable active:home-accent-text heart stroke-1"
                    size={32}
                    onClick={() => animatelike()}
                  />
                )}
              </div>
            </div>

            <div className="flex flex-row h-full align-middle justify-between lg:px-5 space-x-3 lg:mb-2 mb-4">
              <div
                className="flex flex-col justify-center lg:text-base select-none"
                id="progresstime"
              >
                {progressTime}
              </div>

              <div className="h-2 w-full flex flex-col justify-center self-center lg:px-2 px-1">
                <div
                  className="w-full h-full border-[1px] border-black rounded-full"
                  id="bar"
                >
                  <div
                    className="w-[1%] h-full border-[1px] bg-black rounded-full"
                    id="progress"
                  ></div>
                </div>
              </div>

              <div className="lg:text-lg select-none" id="totaltime">
                {minutes}:{seconds}
              </div>
            </div>

            <div
              className="flex flex-row align-middle w-full justify-evenly"
              id="buttons"
            >
              <div className="flex flex-row justify-between w-1/3 align-middle">
                <div
                  className="flex flex-col justify-center"
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
                </div>

                <div
                  className="flex flex-col justify-center pressable rounded-full p-2 active:home-accent-text"
                  onClick={() => setPaused(!paused)}
                >
                  {isplaying ? (
                    <IoPauseSharp size={32} />
                  ) : (
                    <IoPlaySharp size={32} />
                  )}
                </div>

                <div
                  className="flex flex-col justify-center active:home-accent-text"
                  onClick={() => {
                    if (replyindex + 1 < minreply + 1) {
                      setReply(maxreplies);
                    } else if (replyindex + 1 > maxreplies) {
                      setReply(minreply + 1);
                    } else {
                      setReply(replyindex + 1);
                    }
                  }}
                >
                  <IoIosSkipForward className="pressable" size={20} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
