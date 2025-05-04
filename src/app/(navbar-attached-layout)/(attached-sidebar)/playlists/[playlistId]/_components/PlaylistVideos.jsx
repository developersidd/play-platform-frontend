import VideoHorizontalCard from "@/components/common/cards/VideoHorizontalCard";

const PlaylistVideos = ({ videos, playlistId }) => {
  return (
    <div className="flex w-full flex-col gap-y-4">
      {videos?.length > 0 ? (
        videos.map((video, index) => (
          <div key={video?._id} className="border rounded">
            <VideoHorizontalCard linkQuery={{
              list: `PL_${playlistId}`,
              index: index,
            }} video={video} />
          </div>
        ))
      ) : (
        <p className="text-gray-300">No videos found</p>
      )}
    </div>
  );
};

export default PlaylistVideos;
