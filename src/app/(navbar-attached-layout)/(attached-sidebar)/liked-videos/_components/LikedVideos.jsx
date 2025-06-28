import VideoHorizontalCard from "@/components/common/cards/VideoHorizontalCard";

const LikedVideos = ({ videos }) => {
  return (
    <div className="flex w-full flex-col gap-y-4">
      {videos?.length > 0 ? (
        videos.map(({ video }, ind) => (
          <div key={video?._id + ind}>
            {video?._id ? (
              <div className="border">
                <VideoHorizontalCard video={video} />
              </div>
            ) : (
              <div className="flex items-center justify-center border h-20">
                <p className="text-gray-300">Video not found or has been removed!</p>
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-300">No videos found</p>
      )}
    </div>
  );
};

export default LikedVideos;
