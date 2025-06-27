import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MeshGradientRenderer } from '@johnn-e/react-mesh-gradient';
import anime from "animejs";
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

  const animate = () => {
    const loader = anime.timeline({
      complete: () => null,
    });

    loader
      .add({
        targets: "#logo #circle",
        delay: 300,
        duration: 500,
        easing: "easeInOutQuart",
        strokeDashoffset: [anime.setDashoffset, 0],
      })
      .add(
        {
          targets: "#logo #play",
          delay: 0,
          duration: 500,
          easing: "easeInOutQuart",
          strokeDashoffset: [anime.setDashoffset, 0],
          opacity: 1,
          fill: "#FFFFFF",
        },
        "-=400"
      )
      .add({
        targets: "#logo #leftplay",
        delay: 100,
        duration: 100,
        easing: "easeInOutQuart",
        opacity: 1,
      })
      .add({
        targets: "#logo #rightplay",
        delay: 100,
        duration: 100,
        easing: "easeInOutQuart",
        opacity: 1,
      });
  };

  useEffect(() => {
    console.log(localStorage.theme);
    const timeout = setTimeout(() => setIsMounted(true), 10);
    animate();
    return () => clearTimeout(timeout);
  }, []);

  // Loader logic
  useEffect(() => {
    localStorage.theme = "light";
  }, []);

  const playref = React.useRef(null);
  const barref = React.useRef(null);

  useEffect(() => {
    playref.current = anime
      .timeline({
        autoplay: false,
        complete: () => null,
      })
      .add({
        targets: "#logo #play",
        delay: 0,
        duration: 100,
        easing: "easeInOutQuart",
        scale: 0.6,
        fill: "#EA5A64",
        stroke: "#EA5A64",
      })
      .add(
        {
          targets: "#logo #circle",
          delay: 0,
          duration: 100,
          easing: "easeInOutQuart",
          stroke: "#EA5A64",
          scale: 0.8,
        },
        "-=100"
      )
      .add(
        {
          targets: "#logo #rightplay",
          delay: 0,
          duration: 100,
          easing: "easeInOutQuart",
          scale: 0.6,
        },
        "-=100"
      )
      .add(
        {
          targets: "#logo #leftplay",
          delay: 0,
          duration: 100,
          easing: "easeInOutQuart",
          scale: 0.6,
        },
        "-=100"
      )
      .add(
        {
          targets: "#logo #play",
          delay: 0,
          duration: 100,
          easing: "easeInOutQuart",
          opacity: 0,
        },
        "-=100"
      )
      .add({
        targets: "#logo #leftplay",
        points: [
          {
            value: "   29.54 23.53 29.54 62.95  40.83 62.97  40.88 23.53 29.54 23.53 ",
          },
        ],
        easing: "easeOutQuad",
        delay: 0,
        scale: 1,
        duration: 100,
        stroke: "#161616",
        fill: "#161616",
      })
      .add(
        {
          targets: "#logo #rightplay",
          points: [
            {
              value: "50.12 23.53 61.46 23.53 61.4 62.97 50.12 62.95 50.12 23.53",
            },
          ],
          easing: "easeOutQuad",
          delay: 0,
          scale: 1,
          duration: 100,
          stroke: "#161616",
          fill: "#161616",
        },
        "-=100"
      )
      .add(
        {
          targets: "#logo #circle",
          easing: "easeOutQuad",
          delay: 0,
          scale: 1,
          duration: 100,
        },
        "-=100"
      )
      .add(
        {
          targets: "#logo #circle",
          easing: "easeOutQuad",
          delay: 0,
          duration: 100,
          stroke: "#FFFFFF",
          fill: "#FFFFFF",
        },
        "-=100"
      );
  }, []);

  useEffect(() => {
    barref.current = anime
      .timeline({
        autoplay: false,
        complete: () => {
          // Navigate to about page when loader finishes
          navigate('/about');
        },
      })
      .add({
        targets: "#bar #progress",
        easing: "easeOutQuad",
        delay: 0,
        duration: 50,
        opacity: 1,
      })
      .add({
        targets: "#bar #progress",
        easing: "linear",
        delay: 0,
        duration: Math.floor(Math.random() * (ANIMATION_DURATION_MAX - ANIMATION_DURATION_MIN) + ANIMATION_DURATION_MIN),
        width: "100%",
        update: function (anim) {
          var time_seconds = Math.round(0.01 * anim.progress * musictime);
          var timestring =
            Math.floor(time_seconds / 60) +
            ":" +
            ("0" + (time_seconds % 60)).slice(-2);
          setProgressTime(timestring);
        },
      })
      .add(
        {
          targets: [
            "#logo",
            "#bar",
            ".heart",
            "#skipright",
            "#skipleft",
            "#song",
            "#artist",
            "#progresstime",
            "#totaltime",
            "#buttons",
          ],
          delay: 300,
          duration: 300,
          easing: "easeInOutQuart",
          opacity: 0,
          scale: 0.1,
        },
        "-=100"
      )
      .add(
        {
          targets: ["#transition", "#container"],
          delay: 0,
          duration: 200,
          easing: "easeInQuad",
          opacity: 1,
          scale: 2,
        },
        "-=100"
      )
      .add({
        targets: ".loader",
        duration: 200,
        easing: "easeInOutQuart",
        opacity: 0,
        zIndex: -1,
      });
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
    const prevnext = anime.timeline({
      complete: () => null,
    });

    if (replyindex == 1) {
      var targ = ".right-skip";
    } else {
      var targ = ".left-skip";
    }

    prevnext
      .add(
        {
          targets: ".song",
          delay: 0,
          duration: 200,
          easing: "easeInOutQuart",
          translateX: (replyindex - 1) * -30,
          opacity: 0,
        },
        "-=100"
      )
      .add({
        targets: ".song",
        delay: 5,
        duration: 20,
        update: function () {
          document.getElementById("songtitle").innerHTML = data[replyindex - 1];
        },
        translateX: (replyindex - 1) * 60,
        opacity: 0,
      })
      .add({
        targets: ".song",
        delay: 0,
        duration: 100,
        easing: "easeInOutQuart",
        translateX: 0,
        opacity: 1,
      });

    setisLiked(Liked[replyindex - 1]);
    playref.current.reset();
    barref.current.reset();
    setPaused(true);
  }

  function playanimation() {
    if (paused == false) {
      playref.current.reset();
      playref.current.play();
      barref.current.play();
      setisplaying(true);
    } else {
      barref.current.pause();
      playref.current.reverse();
      playref.current.play();
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
