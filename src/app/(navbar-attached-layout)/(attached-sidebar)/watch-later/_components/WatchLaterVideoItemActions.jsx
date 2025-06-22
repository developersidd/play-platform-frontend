"use client";
import SaveToCollectionModal from "@/app/(navbar-attached-layout)/(non-attached-sidebar)/videos/_components/SaveToCollectionModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAxios from "@/hooks/useAxios";
import { Bookmark, Clock, EllipsisVertical } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
const WatchLaterVideoItemActions = ({ videoId, setIsRemoveFromWatchLater }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { apiClient } = useAxios() || {};

  const handleVideoInWatchLater = async () => {
    setIsRemoveFromWatchLater(true);
    try {
      await apiClient.delete(`/watch-later/v/${videoId}/remove`);
      toast.success("Video removed from watch later!");
    } catch (error) {
      console.log(" error:", error);
      toast.error("Failed to remove video from watch later!");
      setIsRemoveFromWatchLater(false);
    }
  };

  return (
    <>
      <div className="absolute flex items-center top-1/2 right-2 space-x-4  -translate-y-1/2">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <button className="outline-none">
              <EllipsisVertical className="size-5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className=" min-w-48 max-w-max space-y-1 "
          >
            <DropdownMenuItem
              onClick={handleVideoInWatchLater}
              className="cursor-pointer"
            >
              <button className="flex items-center gap-x-2">
                <Clock />
                <p>Remove from Watch Later</p>
              </button>
            </DropdownMenuItem>

            <DropdownMenuItem
              onSelect={() => setIsModalOpen(true)}
              className="cursor-pointer"
            >
              <button className="flex items-center gap-x-2">
                <Bookmark />
                <p className="text-sm">Save to Collection</p>
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <SaveToCollectionModal
        open={isModalOpen}
        setIsOpen={setIsModalOpen}
        videoId={videoId}
      />
    </>
  );
};

export default WatchLaterVideoItemActions;
