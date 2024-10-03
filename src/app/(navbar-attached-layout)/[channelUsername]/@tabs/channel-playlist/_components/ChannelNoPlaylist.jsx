import { Folders } from "lucide-react";

const ChannelNoPlaylist = () => {
  return (
    <div class="flex justify-center p-4 items-center min-h-[42vh]">
      <div class="w-full max-w-sm text-center">
        <p class="mb-3 w-full">
          <span class="inline-flex rounded-full bg-[#E4D3FF] p-2 text-[#AE7AFF]">
            <span class="inline-block w-6">
              <Folders />
            </span>
          </span>
        </p>
        <h5 class="mb-2 font-semibold">No playlist created</h5>
        <p>There are no playlist created on this channel.</p>
      </div>
    </div>
  );
};

export default ChannelNoPlaylist;
