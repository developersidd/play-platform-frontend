import { Play, Plus } from "lucide-react";

const MyChannelNotFoundVideos = () => {
  return (
    <div className="w-full max-w-sm text-center flex items-center justify-center">
      <p className="mb-3 w-full">
        <span className="inline-flex rounded-full bg-[#E4D3FF] p-2 text-[#AE7AFF]">
          <Play />
        </span>
      </p>
      <h5 className="mb-2 font-semibold">No videos uploaded</h5>
      <p>
        This page has yet to upload a video. Search another page in order to
        find more videos.
      </p>
      <button className="mt-4 inline-flex items-center gap-x-2 bg-[#ae7aff] px-3 py-2 font-semibold text-black">
        <Plus />
        New video
      </button>
    </div>
  );
};

export default MyChannelNotFoundVideos;
