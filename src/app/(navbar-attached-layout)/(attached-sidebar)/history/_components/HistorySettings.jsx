"use client";
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import useAxios from "@/hooks/useAxios";
import useUserContext from "@/hooks/useUserContext";
import { PauseIcon, Play } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ClearHistory from "./ClearHistory";
import HistorySearch from "./HistorySearch";

const HistorySettings = () => {
  const [openSettingDialog, setOpenSettingDialog] = useState(false);
  const { state: { isHistoryPaused, username, email } = {} } = useUserContext();
  const [isPaused, setIsPaused] = useState(isHistoryPaused);
  const router = useRouter();
  useEffect(() => {
    setIsPaused(isHistoryPaused);
  }, [isHistoryPaused]);
  const { apiClient } = useAxios();
  // toggle pause history state
  const togglePauseHistory = async () => {
    try {
      setOpenSettingDialog(false);
      setIsPaused(!isPaused);
      const {
        data: {
          data: { isHistoryPaused },
        },
      } = await apiClient.patch("/users/history/toggle-pause");
      toast.success(
        isHistoryPaused
          ? "Watch history paused successfully"
          : "Watch history turned on successfully"
      );
      router.refresh();
    } catch (e) {
      setIsPaused(isPaused);
      toast.error("There was an error occurred");
    }
  };

  return (
    <>
      {/* Pause History Modal */}
      <Dialog open={openSettingDialog} onOpenChange={setOpenSettingDialog}>
        <DialogContent className="sm:max-w-[34%] block bg-dark-bg border-0">
          <div className="flex flex-col h-full">
            <div className="space-y-4">
              <h4 className="text-lg">
                {isPaused ? "Turn on" : "Pause"} watch history?
              </h4>
              <p className="text-slate-300 ">
                {username} ({email}) Your YouTube
              </p>
              <p>
                Pausing YouTube watch history can make it harder to find videos
                you watched, and you may see fewer recommendations for new
                videos in YouTube and other Google products.
              </p>
            </div>
            <div className="flex items-center gap-x-2 align-bottom pt-4 justify-end">
              <DialogClose
                className="py-1.5 px-3 rounded-full hover:bg-light-bg"
                type="button"
              >
                Cancel
              </DialogClose>

              <button
                onClick={togglePauseHistory}
                className="text-secondary font-semibold py-1.5 px-4 rounded-full hover:bg-secondary/65 hover:text-white"
              >
                {isPaused ? "Turn on" : "Pause"}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      {/*  settings  */}
      <div className="w-1/5 hidden lg:block">
        <HistorySearch />
        <div className="mt-6 space-y-3">
          <ClearHistory />
          <button
            onClick={() => setOpenSettingDialog(true)}
            className="flex items-center gap-x-2 py-1.5 px-3 hover:bg-light-bg rounded-full"
          >
            {isPaused ? <Play size={18} /> : <PauseIcon size={18} />}
            <h4 className="font-bold">
              {isPaused ? "Turn on" : "Pause"} watch history{" "}
            </h4>
          </button>
        </div>
      </div>
    </>
  );
};

export default HistorySettings;
