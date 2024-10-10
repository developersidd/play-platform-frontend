import { Users } from "lucide-react";

const ChannelNoTweets = () => {
  return (
    <div className="flex justify-center p-4 items-center min-h-[42vh]">
      <div className="w-full max-w-sm text-center">
        <p className="mb-3 w-full">
          <span className="inline-flex rounded-full bg-[#E4D3FF] p-2 text-[#AE7AFF]">
            <span className="inline-block w-6">
              <Users />
            </span>
          </span>
        </p>
        <h5 className="mb-2 font-semibold">No Tweets</h5>
        <p>
          This channel has yet to make a <strong>Tweet</strong>.
        </p>
      </div>
    </div>
  );
};

export default ChannelNoTweets;
