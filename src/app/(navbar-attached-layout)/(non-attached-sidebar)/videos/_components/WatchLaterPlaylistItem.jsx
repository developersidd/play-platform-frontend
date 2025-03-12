"use client";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import useAxios from "@/hooks/useAxios";
import useThrottle from "@/hooks/useThrottle";
import { useState } from "react";
import { toast } from "sonner";

const WatchLaterPlaylistItem = ({ isSaved, playlist, videoId }) => {
  const [isSavedInPlaylist, setIsSavedInPlaylist] = useState(isSaved);
  const { apiClient } = useAxios();
  const { name = "", _id } = playlist || {};

  // add video in playlist using throttling
  const throttleAddRemoveVideoInPlaylist = useThrottle(async (value) => {
    console.log("throttled", value);
    try {
      const res = await apiClient.patch(
        `/playlists/${_id}/v/${videoId}/toggle`,
        {
          value,
        }
      );
      console.log(" res:", res);
    } catch (error) {
      toast.error("Failed to save or remove video from playlist");
    }
  }, 3000);

  const handlePlaylistSave = (value) => {
    setIsSavedInPlaylist(value);
    throttleAddRemoveVideoInPlaylist(value);
  };
  return (
    <DropdownMenuItem
      onSelect={(e) => e.preventDefault()}
      className="mt-2 py-0.5"
    >
      <Checkbox
        id={_id}
        checked={isSavedInPlaylist}
        onCheckedChange={handlePlaylistSave}
      />

      <DropdownMenuLabel className="w-full">
        <label className="block" htmlFor={_id}>
          {name}
        </label>
      </DropdownMenuLabel>
    </DropdownMenuItem>
  );
};

export default WatchLaterPlaylistItem;
