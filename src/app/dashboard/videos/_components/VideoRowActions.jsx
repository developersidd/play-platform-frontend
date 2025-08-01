"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
} from "@/components/ui/alert-dialog";
import { TableCell } from "@/components/ui/table";
import useAxios from "@/hooks/useAxios";
import { Pencil, ScanSearch, Trash2 } from "lucide-react";
import { lazy, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
const LazyUploadVideoModal = lazy(() =>
  import("@/components/common/video/UploadVideoModal")
);
const VideoRowActions = ({ videoId, title, isVideoPublished }) => {
  const { apiClient } = useAxios();
  const router = useRouter();

  const editModalTriggerRef = useRef(null);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  const handleDeleteVideo = async () => {
    try {
      setOpenDeleteAlert(false);
      await apiClient.delete(`/videos/${videoId}`);
      router.refresh();
      toast.success("Video deleted successfully");
    } catch (e) {
      console.log(" e:", e);
      toast.error("There was an error occurred");
    }
  };

  const handleDeleteAlert = () => {
    if (isVideoPublished) {
      return toast.info("Video is published", {
        description: "You need to unpublish the video before deleting it.",
      });
    } else {
      setOpenDeleteAlert(true);
    }
  };

  return (
    <TableCell>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-4 w-8 p-0">
            <span className="sr-only">Open Menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <Link target="_blank" href={`/videos/${videoId}`}>
            <DropdownMenuItem className="cursor-pointer">
              <ScanSearch className="h-4 w-4 mr-2" />
              View
            </DropdownMenuItem>
          </Link>

          <DropdownMenuItem
            onClick={() => {
              editModalTriggerRef?.current?.click();
            }}
            className="cursor-pointer"
          >
            <Pencil className="h-4 w-4 mr-2" />
            Edit
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={handleDeleteAlert}
            className="cursor-pointer"
          >
            <Trash2 className="h-4 w-4 mr-2 " />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* Edit video Modal */}

      <LazyUploadVideoModal videoId={videoId}>
        <button ref={editModalTriggerRef}></button>
      </LazyUploadVideoModal>

      {/*  Show Delete alert */}
      <AlertDialog open={openDeleteAlert} onOpenChange={setOpenDeleteAlert}>
        <AlertDialogContent className="sm:max-w-[25%] h-[24%] block  border-0">
          <div className="flex flex-col h-full">
            <div className="space-y-4">
              <h4 className="text-lg">Delete Video</h4>
              <p>
                Are you sure you want to delete the video titled{" "}
                <span className="text-secondary font-bold">
                  {" "}
                  &quot;
                  {title?.length > 100 ? title?.slice(0, 100) + "..." : title}
                  &quot;
                </span>{" "}
                ? This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center gap-x-2 align-bottom mt-auto justify-end">
              <AlertDialogCancel
                className="py-1 px-3 rounded-full hover:bg-light-bg"
                type="button"
              >
                Cancel
              </AlertDialogCancel>

              <button
                onClick={handleDeleteVideo}
                className="text-red-600 font-semibold py-1 px-3 rounded-full hover:bg-red-600 hover:text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </TableCell>
  );
};

export default VideoRowActions;
