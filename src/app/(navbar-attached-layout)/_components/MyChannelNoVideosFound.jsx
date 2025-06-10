"use client";
import { Play, Plus } from "lucide-react";
import dynamic from "next/dynamic";
const LazyUploadVideoModal = dynamic(() =>
  import("../../../components/common/video/UploadVideoModal")
);
const MyChannelNoVideosFound = () => {
  return (
    <>
      <div className="flex w-full items-center justify-center h-[450px]">
        <div className="max-w-sm text-center ">
          <button className="mb-3 w-full">
            <span className="inline-flex rounded-full bg-[#E4D3FF] p-2 text-[#AE7AFF]">
              <Play />
            </span>
          </button>
          <h5 className="mb-2 font-semibold">No videos uploaded</h5>
          <p>
            This page has yet to upload a video. Search another page in order to
            find more videos.
          </p>
          <LazyUploadVideoModal>
            <button className="mt-4 inline-flex items-center gap-x-2 bg-[#ae7aff] px-3 py-2 font-semibold text-black">
              <Plus />
              New video
            </button>
          </LazyUploadVideoModal>
        </div>
      </div>
    </>
  );
};

export default MyChannelNoVideosFound;
