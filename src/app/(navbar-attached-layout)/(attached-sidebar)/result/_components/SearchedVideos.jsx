import NoVideosFound from "../../_components/NotFoundVideos";
import VideoHorizontalCard from "../../_components/VideoHorizontalCard";

const SearchedVideos = ({ videos = [] }) => {
  return (
    <div className="flex flex-col gap-4 p-4">
      {videos?.length > 0 ? (
        videos?.map((video) => (
          <VideoHorizontalCard key={video._id} video={video} />
        ))
      ) : (
        <NoVideosFound />
      )}
    </div>
  );
};

export default SearchedVideos;
