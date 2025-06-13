"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";

import { apiClient } from "@/axios";
const VideoPlayer = ({ video }) => {
  const { _id, thumbnail, video: { url } = {} } = video || {}; //console.log("lesson:", lesson);
  const [hasWindow, setHasWindow] = useState(false);
  const [started, setStarted] = useState(false);
  const [lastPlayed, setLastPlayed] = useState(0);
  const router = useRouter();
  const playerRef = useRef();

  const onReady = useCallback(() => {
    if (!started && playerRef.current) {
      playerRef.current.seekTo(lastPlayed, "seconds");
      setStarted(true);
    }
  }, [started]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
      const lastTime = localStorage.getItem(`lastTime-${_id}`);
      if (lastTime) {
        setLastPlayed(Number(lastTime));
      }
    }
  }, []);

  useEffect(() => {
    async function updateVideoViews() {
      const response = await apiClient.patch(`/videos/update-views/${_id}`);
      if (response.status === 200) {
        router.refresh();
        setStarted(false);
      }
    }
    started && !lastPlayed && updateVideoViews();
  }, [started]);

  function handleOnStart() {
    console.log("handleOnStart");
    setStarted(true);
  }

  function handleOnProgress(state) {
    //console.log("state:", state);
    hasWindow &&
      Number(localStorage.setItem(`lastTime-${_id}`, state.playedSeconds));
  }

  return (
    <div className="rounded-lg overflow-hidden shadow dark:shadow-white/40 dark:shadow-md h-[300px] sm:h-[400px] md:h-[550px] lg:h-[580px] xl:h-[600px] 2xl:h-[720px]">
      {hasWindow && (
        <ReactPlayer
          onReady={onReady}
          ref={playerRef}
          light={thumbnail?.url}
          url={url}
          width="100%"
          height="100%"
          playing={localStorage.getItem(`lastTime-${_id}`) ? true : false}
          controls={true}
          onPlay={handleOnStart}
          onProgress={handleOnProgress}
        />
      )}
    </div>
  );
};
export default VideoPlayer;
