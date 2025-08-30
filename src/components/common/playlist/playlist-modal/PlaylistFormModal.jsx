"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import PlaylistForm from "./PlaylistForm";

const PlaylistFormModal = ({ children, playlistId }) => {
  const isEditing = Boolean(playlistId);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const isDesktop = useMediaQuery({ minWidth: "768px" });
  if (isDesktop) {
    return (
      <Dialog open={showUploadModal} onOpenChange={setShowUploadModal}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent
          className="h-[80%] min-h-[90%] w-[90%] sm:max-w-[80%] lg:max-w-[70%] xl:max-w-[60%] block  overflow-y-auto max-h-[90%]  [&::-webkit-scrollbar]:w-[7px] [&::-webkit-scrollbar-track]:bg-background 
         [&::-webkit-scrollbar-thumb]:rounded-lg
        "
        >
          <PlaylistForm isEditing={isEditing} playlistId={playlistId} />
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <Drawer open={showUploadModal} onOpenChange={setShowUploadModal}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="h-[90%] px-6">
        <PlaylistForm isEditing={isEditing} playlistId={playlistId} />
      </DrawerContent>
    </Drawer>
  );
};

export default PlaylistFormModal;
