import VideoHorizontalCard from "@/app/(navbar-attached-layout)/_components/VideoHorizontalCard";

const PlaylistVideos = ({ videos }) => {
  return (
    <div class="flex w-full flex-col gap-y-4">
      {videos?.length > 0 ? (
        videos.map((video) => (
          <div class="border" key={video?._id}>
            <VideoHorizontalCard video={video} />
          </div>
        ))
      ) : (
        <p class="text-gray-300">No videos found</p>
      )}
    </div>
  );
};

export default PlaylistVideos;
