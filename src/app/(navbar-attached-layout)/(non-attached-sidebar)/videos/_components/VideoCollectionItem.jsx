"use client";
import { Checkbox } from "@/components/ui/checkbox";
import useAxios from "@/hooks/useAxios";
import useThrottle from "@/hooks/useThrottle";
import { useState } from "react";
import { toast } from "sonner";

const VideoCollectionItem = ({ isSaved, collection, videoId }) => {
  const [isSavedInCollection, setIsSavedInCollection] = useState(isSaved);
  const { apiClient } = useAxios();
  const { name = "", _id } = collection || {};

  // add video in collection using throttling
  const throttleAddRemoveVideoInPlaylist = useThrottle(async (value) => {
    //console.log("throttled", value);
    try {
      const res = await apiClient.patch(
        `/playlists/${_id}/v/${videoId}/toggle`,
        {
          value,
        }
      );
      //console.log(" res:", res);
    } catch (error) {
      //console.log(" error:", error)
      toast.error("Failed to save or remove video from collection");
    }
  }, 3000);

  const handlePlaylistSave = (value) => {
    setIsSavedInCollection(value);
    throttleAddRemoveVideoInPlaylist(value);
  };
  return (
    <div className="flex items-center gap-x-2 rounded  py-2 ps-3 hover:bg-dark-bg ">
      <Checkbox
        id={_id}
        checked={isSavedInCollection}
        onCheckedChange={handlePlaylistSave}
      />

      {/*<Label className="w-full">*/}
      <label className="block" htmlFor={_id}>
        {name}
      </label>
      {/*</label>*/}
    </div>
  );
};

export default VideoCollectionItem;
