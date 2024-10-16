import NoVideosFound from "@/app/(navbar-attached-layout)/_components/NotFoundVideos";
import VideoHorizontalCard from "@/app/(navbar-attached-layout)/_components/VideoHorizontalCard";

const SearchedVideos = ({ videos = [] }) => {
  return (
    <div className="flex flex-col gap-4 p-4">
      {videos?.length > 0 ? (
        videos?.map((video) => (
          <VideoHorizontalCard key={video._id} video={video} />
        ))
      ) : (
        <NoVideosFound isSearch />
      )}
    </div>
  );
};

export default SearchedVideos;
