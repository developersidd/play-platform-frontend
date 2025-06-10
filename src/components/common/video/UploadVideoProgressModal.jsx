import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { formatFileSize } from "@/lib/utils";
import { Check, Film, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";

const UploadVideoProgressModal = ({
  videoFile,
  showProgressModal,
  uploading,
  setShowProgressModal,
  onCancelRequest,
}) => {
  // disable the cancel button if the video is already uploaded
  const [disableCancel, setDisableCancel] = useState(false);

  useEffect(() => {
    let timeout;
    if (showProgressModal) {
      timeout = setTimeout(() => {
        setDisableCancel(true);
      }, 2000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [showProgressModal]);

  return (
    <Dialog
      open={showProgressModal}
      onOpenChange={setShowProgressModal}
      className=""
    >
      <DialogContent className="sm:max-w-[70%] lg:max-w-[50%] block  overflow-y-auto">
        <DialogHeader className="block w-full mt-3">
          <div className="mb-4 flex items-start justify-between">
            <h2 className="text-xl font-semibold">
              {uploading ? "Uploading Video..." : "Video Uploaded"}
              <span className="block text-sm text-gray-300">
                Track your video uploading process.
              </span>
            </h2>
          </div>
        </DialogHeader>

        {/* Progress */}
        <div className="mb-6 flex gap-x-2 border p-3">
          <div className="w-8 shrink-0">
            <span className="inline-block w-full rounded-full bg-[#E4D3FF] p-1 text-[#AE7AFF]">
              <Film />
            </span>
          </div>
          <div className="flex flex-col">
            <h6> {videoFile?.name} </h6>
            <p className="text-sm"> {formatFileSize(videoFile?.size)} </p>
            <div className="mt-2">
              {uploading ? (
                <>
                  <LoaderCircle className="inline-block animate-spin mr-2" />
                  Uploading...
                </>
              ) : (
                <>
                  <Check className="inline-block mr-2 text-green-500" />
                  Uploaded
                </>
              )}
            </div>
          </div>
        </div>

        {/*  Footer */}
        <div className="grid grid-cols-2 gap-4">
          <DialogClose asChild>
            <button
              disabled={disableCancel}
              onClick={onCancelRequest}
              className="border px-4 py-3 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>
          </DialogClose>
          <DialogClose asChild>
            <button
              disabled={uploading}
              className="bg-[#ae7aff] px-4 py-3 text-black disabled:bg-[#E4D3FF]"
            >
              Finish
            </button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadVideoProgressModal;
