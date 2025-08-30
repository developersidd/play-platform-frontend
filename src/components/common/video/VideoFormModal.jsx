"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import VideoForm from "./VideoForm";

const VideoFormModal = ({ children, videoId }) => {
  const isEditingVideo = Boolean(videoId);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const isDesktop = useMediaQuery({ minWidth: "768px" });
  if (isDesktop) {
    return (
      <Dialog open={showUploadModal} onOpenChange={setShowUploadModal}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent
          hideCloseButton
          className="h-[80%] min-h-[90%] w-[90%] sm:max-w-[80%] lg:max-w-[70%] xl:max-w-[60%] max-h-[90%] p-0 border-0 "
        >
          <VideoForm
            videoId={videoId}
            isEditingVideo={isEditingVideo}
            setShowUploadModal={setShowUploadModal}
          />
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <Drawer open={showUploadModal} onOpenChange={setShowUploadModal}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="h-[90%] px-6">
        <VideoForm
          videoId={videoId}
          isEditingVideo={isEditingVideo}
          setShowUploadModal={setShowUploadModal}
        />
      </DrawerContent>
    </Drawer>
  );
};

export default VideoFormModal;
