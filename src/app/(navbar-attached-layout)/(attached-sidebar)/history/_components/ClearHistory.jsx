"use client";
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import useAxios from "@/hooks/useAxios";
import useUserContext from "@/hooks/useUserContext";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const ClearHistory = () => {
  const [openClearDialog, setOpenClearDialog] = useState(false);
  const router = useRouter();
  // clear watch history
  const user = useUserContext();
  const { apiClient } = useAxios();
  // toggle pause history state
  const clearWatchHistory = async () => {
    try {
      setOpenClearDialog(false);
      await apiClient.delete("/users/history/clear");
      router.refresh();
      toast.success("Watch history cleared successfully");
    } catch (e) {
      toast.error("There was an error occurred");
    }
  };

  return (
    <>
      {/*  Clear Histroy Modal */}
      <Dialog open={openClearDialog} onOpenChange={setOpenClearDialog}>
        <DialogContent className="sm:max-w-[32%] h-[24%] block bg-dark-gray border-0">
          <div className="flex flex-col h-full">
            <div className="space-y-4">
              <h4 className="text-lg">Clear watch history?</h4>
              <p className="text-slate-300">
                AB Siddik (siddik.prgmr@gmail.com) Your YouTube
              </p>
              <p>
                watch history will be cleared from all YouTube apps on all
                devices.
              </p>
            </div>
            <div className="flex items-center gap-x-2 align-bottom mt-auto justify-end">
              <DialogClose
                className="py-1.5 px-3 rounded-full hover:bg-light-gray"
                type="button"
              >
                Cancel
              </DialogClose>

              <button
                onClick={clearWatchHistory}
                className="text-secondary font-semibold py-1.5 px-3 rounded-full hover:bg-secondary/65 hover:text-white"
              >
                Clear watch history
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <button
        onClick={() => setOpenClearDialog(true)}
        className="flex items-center gap-x-2 py-1.5 px-3 hover:bg-light-gray rounded-full"
      >
        <TrashIcon size={18} />
        <h4 className="font-bold"> Clear all watch history </h4>
      </button>
    </>
  );
};

export default ClearHistory;
