import { useState } from "react";

function useVideoSelection(videoIds) {
  const [selectedVideoIds, setSelectedVideoIds] = useState([]);

  const handleCheckboxChange = (checked, mode = "single", videoId) => {
    if (mode === "all") {
      checked ? setSelectedVideoIds(videoIds) : setSelectedVideoIds([]);
    } else if (mode === "single") {
      checked
        ? setSelectedVideoIds((prev) => [...prev, videoId])
        : setSelectedVideoIds((prev) => prev.filter((id) => id !== videoId));
    } else {
      console.warn("Invalid mode specified for checkbox change");
      return;
    }
  };

  return { selectedVideoIds, handleCheckboxChange };
}

export default useVideoSelection;
