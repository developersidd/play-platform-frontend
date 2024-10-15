"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";

import { publicApi } from "@/api";
const VideoPlayer = ({ video }) => {
  const { _id, title, thumbnail, video: { url } = {} } = video || {}; //console.log("lesson:", lesson);
  const [hasWindow, setHasWindow] = useState(false);
  const [started, setStarted] = useState(false);
  const [ended, setEnded] = useState(false);
  const [duration, setDuration] = useState(0);

  const router = useRouter();
  const playerRef = useRef();
  const videoSession = localStorage.getItem(`lastTime-${_id}`);
  const onReady = useCallback(() => {
    console.log("onReady");
    if (!started) {
      const timeToStart = videoSession || 0;
      playerRef.current.seekTo(timeToStart, "seconds");
      setStarted(true);
    }
  }, [started]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
  }, []);

  useEffect(() => {
    async function updateLessonWatch() {
      console.log("updateLessonWatch");
      const response = await publicApi.patch(
        `/api/v1/videos/update-views/${_id}`
      );
      if (response.status === 200) {
        console.log("result:", response.data);
        router.refresh();
        setStarted(false);
      }
    }
    started && !videoSession && updateLessonWatch();
  }, [started]);
  function handleOnStart() {
    console.log("handleOnStart");
    setStarted(true);
  }

  function handleOnDuration(duration) {
    console.log("handleOnDuration", duration);
    setDuration(duration);
  }

  function handleOnProgress(state) {
    console.log("state:", state);
    Number(localStorage.setItem(`lastTime-${_id}`, state.playedSeconds));
  }

  return (
    <>
      {hasWindow && (
        <ReactPlayer
          onReady={onReady}
          ref={playerRef}
          light={thumbnail?.url}
          playing={localStorage.getItem("lastTime") ? true : false}
          url={url}
          width="100%"
          height="470px"
          controls={true}
          onStart={handleOnStart}
          onDuration={handleOnDuration}
          onProgress={handleOnProgress}
        />
      )}
    </>
  );
};
export default VideoPlayer;
