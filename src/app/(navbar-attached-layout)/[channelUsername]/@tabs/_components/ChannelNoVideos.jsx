import { Play } from "lucide-react";

const ChannelNoVideos = () => {
  return (
    <div class="flex justify-center p-4 min-h-[42vh] items-center">
      <div class="w-full max-w-sm text-center">
        <p class="mb-3 w-full">
          <span class="inline-flex rounded-full bg-[#E4D3FF] p-2 text-[#AE7AFF]">
            <Play />
          </span>
        </p>
        <h5 class="mb-2 font-semibold">No videos uploaded</h5>
        <p>
          This page has yet to upload a video. Search another page in order to
          find more videos.
        </p>
      </div>
    </div>
  );
};

export default ChannelNoVideos;
