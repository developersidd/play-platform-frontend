import { Users } from "lucide-react";

const ChannelNoSubscribed = ({ search }) => {
  return (
    <div className="flex justify-center mt-12 p-2">
      <div className="w-full max-w-sm text-center">
        <p className="mb-3 w-full">
          <span className="inline-flex rounded-full bg-[#E4D3FF] p-2 text-[#AE7AFF]">
            <span className="inline-block w-6">
              <Users />
            </span>
          </span>
        </p>
        <h5 className="mb-2 font-semibold">No people subscribers</h5>
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
