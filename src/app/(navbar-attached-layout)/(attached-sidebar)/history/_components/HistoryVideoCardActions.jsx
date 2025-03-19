"use client";
import SaveToCollectionModal from "@/app/(navbar-attached-layout)/(non-attached-sidebar)/videos/_components/SaveToCollectionModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAxios from "@/hooks/useAxios";
import { Bookmark, Clock, EllipsisVertical, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
const HistoryVideoCardActions = ({ videoId, isInWatchLater }) => {
  const router = useRouter();
  const [isVideoInWatchLater, setIsVideoInWatchLater] =
    useState(isInWatchLater);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { apiClient } = useAxios() || {};
  // Remove video from history
  const removeVideoFromHistory = async () => {
    try {
      await apiClient.delete(`/users/history/remove/${videoId}`);
      router.refresh();
      toast.success("Video removed from history!");
    } catch (error) {
      toast.error("Failed to remove video from history!");
    }
  };

  // save to watch later
  const handleVideoInWatchLater = async () => {
    setIsVideoInWatchLater((prev) => !prev);
    try {
      if (isVideoInWatchLater) {
        await apiClient.delete(`/watch-later/v/${videoId}/remove`);
        toast.success("Video removed from watch later!");
        return;
      }
      const res = await apiClient.patch(`/watch-later/v/${videoId}/add`);
      console.log(" res:", res);
    } catch (error) {
      toast.error("Failed to add video in watch later!");
    }
  };
  return (
    <>
      <div className="absolute flex items-center top-2 right-2 space-x-4">
        <button
          onClick={removeVideoFromHistory}
          className="hover:bg-white/70 dark:hover:bg-dark-bg/40 p-2 rounded-full"
        >
          <X className="" size={28} />
        </button>

        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <button className="outline-none">
              <EllipsisVertical className="" size={22} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className=" min-w-48 max-w-max space-y-1 "
          >
            <DropdownMenuItem
              onClick={handleVideoInWatchLater}
              className="cursor-pointer"
            >
              <button className="flex items-center gap-x-2">
                <Clock />
                <p>
                  {" "}
                  {isVideoInWatchLater
                    ? "Remove from Watch Later"
                    : "Save to Watch Later"}{" "}
                </p>
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

export default HistoryVideoCardActions;
