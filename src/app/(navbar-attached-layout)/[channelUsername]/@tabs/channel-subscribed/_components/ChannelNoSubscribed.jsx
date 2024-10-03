import { Users } from "lucide-react";

const ChannelNoSubscribed = () => {
  return (
    <div class="flex justify-center p-4 items-center min-h-[42vh]">
      <div class="w-full max-w-sm text-center">
        <p class="mb-3 w-full">
          <span class="inline-flex rounded-full bg-[#E4D3FF] p-2 text-[#AE7AFF]">
            <span class="inline-block w-6">
              <Users />
            </span>
          </span>
        </p>
        <h5 class="mb-2 font-semibold">No people subscribers</h5>
        <p>
          This channel has yet to <strong>subscribe</strong> a new channel.
        </p>
      </div>
    </div>
  );
};

export default ChannelNoSubscribed;
