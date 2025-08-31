"use client";
import SaveToCollectionModal from "@/app/(navbar-attached-layout)/(non-attached-sidebar)/videos/_components/SaveToCollectionModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAxios from "@/hooks/useAxios";
import useUserContext from "@/hooks/useUserContext";
import { Bookmark, Clock, EllipsisVertical } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
const RelatedVideoCardActions = ({ videoId }) => {
  const [isVideoInWatchLater, setIsVideoInWatchLater] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { apiClient } = useAxios() || {};
  const {
    state: { _id },
  } = useUserContext() || {};
  // save to watch later
  const handleVideoInWatchLater = async () => {
    setIsVideoInWatchLater((prev) => !prev);
    try {
      if (isVideoInWatchLater) {
        await apiClient.delete(`/watch-later/v/${videoId}/remove`);
        toast.success("Video removed from watch later!");
        return;
      }
       await apiClient.patch(`/watch-later/v/${videoId}/add`);
      //console.log(" res:", res);
    } catch (error) {
      toast.error(
        `Failed to ${
          isVideoInWatchLater ? "remove" : "add"
        } video in watch later!`
      );
    }
  };
  if (!_id) {
    return null;
  }
  // handle modal close
  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsDropdownOpen(false);
  };
  // handle modal open
  const handleModalOpen = () => {
    setIsModalOpen(true);
    setIsDropdownOpen(false);
  };

  return (
    <>
      <div className="absolute flex items-center top-1 right-2">
        <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <button className="outline-none">
              <EllipsisVertical className="" size={18} />
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
                <p>
                  {" "}
                  {isVideoInWatchLater
                    ? "Remove from Watch Later"
                    : "Save to Watch Later"}{" "}
                </p>
              </button>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={handleModalOpen}
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
        setIsOpen={handleModalClose}
        videoId={videoId}
      />
    </>
  );
};

export default RelatedVideoCardActions;
