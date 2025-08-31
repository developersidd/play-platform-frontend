"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
} from "@/components/ui/alert-dialog";
import { TableCell } from "@/components/ui/table";
import { Pencil, ScanSearch, Trash2 } from "lucide-react";
import { lazy, useRef, useState } from "react";

import { deletePlaylist } from "@/api/playlist.api";
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

const LazyUploadPlaylistModal = lazy(() =>
  import("@/components/common/playlist/playlist-modal/PlaylistFormModal")
);
const PlaylistRowActions = ({ playlistId, name, isPrivate }) => {
  const router = useRouter();
  const editModalTriggerRef = useRef(null);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  const handleDeletePlaylist = async () => {
    try {
      setOpenDeleteAlert(false);
      await deletePlaylist(playlistId);
      router.refresh();
      toast.success("Playlist deleted successfully");
    } catch (e) {
      //console.log(" e:", e);
      toast.error("There was an error occurred");
    }
  };

  const handleDeleteAlert = () => {
    if (!isPrivate) {
      return toast.info("Playlist is public", {
        description: "You need to private the playlist before deleting it.",
      });
    } else {
      setOpenDeleteAlert(true);
    }
  };

  return (
    <TableCell className="justify-end w-[9%]">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-4 w-8 p-0">
            <span className="sr-only">Open Menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <Link target="_blank" href={`/playlists/${playlistId}`}>
            <DropdownMenuItem className="cursor-pointer">
              <ScanSearch className="h-4 w-4 mr-2" />
              View
            </DropdownMenuItem>
          </Link>

          <DropdownMenuItem
            onClick={() => {
              editModalTriggerRef?.current?.click();
              setOpenEditingModal(true);
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
      {/*{openEditingModal && (*/}
      <LazyUploadPlaylistModal playlistId={playlistId}>
        <button ref={editModalTriggerRef}></button>
      </LazyUploadPlaylistModal>
      {/*)}*/}

      {/*  Show Delete alert */}
      <AlertDialog open={openDeleteAlert} onOpenChange={setOpenDeleteAlert}>
        <AlertDialogContent className="w-[80%] sm:max-w-[30%] h-[23%]   border-0 mx-auto">
          <div className="flex flex-col h-full">
            <div className="space-y-4">
              <h4 className="text-lg">Delete Playlist</h4>
              <p>
                Are you sure you want to delete the playlist named{" "}
                <span className="text-secondary font-bold">
                  {" "}
                  &quot;
                  {name?.length > 100 ? name?.slice(0, 100) + "..." : name}
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
                onClick={handleDeletePlaylist}
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

export default PlaylistRowActions;
