import { Folders } from "lucide-react";

const NoPlaylist = () => {
  return (
    <div className="flex justify-center p-4 items-center min-h-[42vh]">
      <div className="w-full max-w-sm text-center">
        <p className="mb-3 w-full">
          <span className="inline-flex rounded-full bg-[#E4D3FF] p-2 text-[#AE7AFF]">
            <span className="inline-block w-6">
              <Folders />
            </span>
          </span>
        </p>
        <h5 className="mb-2 font-semibold">No playlist created</h5>
        <p>There are no playlist created on this channel.</p>
      </div>
    </div>
  );
};

export default NoPlaylist;
