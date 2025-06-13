import { useState } from "react";

function useSelection(videoIds) {
  const [selectedIds, setSelectedIds] = useState([]);

  const handleCheckboxChange = (checked, mode = "single", videoId) => {
    if (mode === "all") {
      checked ? setSelectedIds(videoIds) : setSelectedIds([]);
    } else if (mode === "single") {
      checked
        ? setSelectedIds((prev) => [...prev, videoId])
        : setSelectedIds((prev) => prev.filter((id) => id !== videoId));
    } else {
      console.warn("Invalid mode specified for checkbox change");
      return;
    }
  };

  return { selectedIds, handleCheckboxChange };
}

export default useSelection;
