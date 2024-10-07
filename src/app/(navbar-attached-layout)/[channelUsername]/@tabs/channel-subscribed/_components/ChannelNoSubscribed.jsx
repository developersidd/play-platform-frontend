import { Users } from "lucide-react";

const ChannelNoSubscribed = ({ search }) => {
  return (
    <div class="flex justify-center mt-12 p-2">
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
          {search
            ? `No channel found for "${search}"`
            : "This channel has yet to subscribe a new channel."}
        </p>
      </div>
    </div>
  );
};

export default ChannelNoSubscribed;
