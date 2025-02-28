import { Play } from "lucide-react";

const NoVideosFound = ({ isSearch = false, className }) => {
  return (
    <div className={`flex w-full items-center justify-center ${className}`}>
      <div className="w-full max-w-sm text-center">
        <p className="mb-3 w-full">
          <span className="inline-flex rounded-full bg-[#E4D3FF] p-2 text-secondary">
            <Play />
          </span>
        </p>
        <h5 className="mb-2 font-semibold">No videos available</h5>
        <p>
          There are no videos here available for .
          {isSearch
            ? "Try searching for other videos."
            : "Please check back later."}
        </p>
      </div>
    </div>
  );
};

export default NoVideosFound;
