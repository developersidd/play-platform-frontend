import PlaylistVideoCard from "./PlaylistVideoCard";

const PlaylistVideos = ({ videos, playlistId }) => {
  return (
    <div className="flex w-full flex-col gap-y-4">
      {videos?.length > 0 ? (
        videos.map(({ video }, ind) => {
          const isDeleted = !video || !video?.title;

          const link = !isDeleted
            ? `/videos/${video._id}?list=PL_${playlistId}&index=${ind + 1}`
            : null;

          return (
            !isDeleted && (
              <PlaylistVideoCard key={video._id} video={video} link={link} />
            )
          );
        })
      ) : (
        <p className="text-gray-300">No videos found</p>
      )}
    </div>
  );
};

export default PlaylistVideos;
