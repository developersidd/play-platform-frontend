"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAxios from "@/hooks/useAxios";
import { Bookmark, Clock, EllipsisVertical, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
const HistoryVideoCardActions = ({ videoId }) => {
  const router = useRouter();
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
  return (
    <div className="absolute flex items-center top-2 right-2 space-x-4">
      <button
        onClick={removeVideoFromHistory}
        className="hover:bg-white/70 dark:hover:bg-dark-bg/40 p-2 rounded-full"
      >
        <X className="" size={28} />
      </button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="outline-none">
            <EllipsisVertical className="" size={22} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className=" w-48 space-y-1 ">
          <DropdownMenuItem
            onClick={() => alert("hell")}
            className="cursor-pointer"
          >
            <button className="flex items-center gap-x-2">
              <Clock />
              <p>Save to Watch Later</p>
            </button>
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer">
            <button className="flex items-center gap-x-2">
              <Bookmark />
              <p>Save to Playlist</p>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default HistoryVideoCardActions;
