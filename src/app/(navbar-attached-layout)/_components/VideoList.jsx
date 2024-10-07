import NoVideosFound from "./NotFoundVideos";
import VideoCard from "./VideoCard";

const VideoList = ({ videos }) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4 p-4 w-full">
      {videos?.length > 0 ? (
        videos?.map((video) => <VideoCard key={video?._id} video={video} />)
      ) : (
        <NoVideosFound classes={"mt-10"} />
      )}
    </div>
  );
};

export default VideoList;
