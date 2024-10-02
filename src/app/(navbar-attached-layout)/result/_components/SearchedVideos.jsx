import NoVideosFound from "../../_components/NotFoundVideos";
import VideoHorizontalCard from "../../_components/VideoHorizontalCard";

const SearchedVideos = ({ videos = [] }) => {
  return (
    <div class="flex flex-col h-full gap-4 p-4">
      {videos?.length > 0 ? (
        videos.map((video) => (
          <VideoHorizontalCard key={video._id} video={video} />
        ))
      ) : (
        <NoVideosFound isSearch />
      )}
    </div>
  );
};

export default SearchedVideos;
