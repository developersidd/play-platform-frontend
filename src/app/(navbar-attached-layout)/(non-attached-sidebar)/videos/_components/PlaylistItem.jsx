"use client";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

const PlaylistItem = () => {
  const [isSavedInPlaylist, setIsSavedInPlaylist] = useState(true);
  const handlePlaylistSave = () => {
    setIsSavedInPlaylist((prev) => !prev);
    console.log("Save to playlist");
  };
  return (
    <DropdownMenuItem className="mt-2 py-0.5">
      <Checkbox
        checked={isSavedInPlaylist}
        onCheckedChange={handlePlaylistSave}
      />

      <DropdownMenuLabel>Status Bar</DropdownMenuLabel>
    </DropdownMenuItem>
  );
};

export default PlaylistItem;
