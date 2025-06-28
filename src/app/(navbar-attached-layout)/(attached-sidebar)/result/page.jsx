import { getVideos } from "@/api/video.api";
import Error from "@/components/common/Error";
import dynamic from "next/dynamic";
import NoVideosFound from "../../_components/NotFoundVideos";

const LazyInfiniteVideos = dynamic(() =>
  import("@/components/infinite-data-layout/InfiniteVideos")
);
const SearchResultPage = async ({ searchParams }) => {
  const searchVal = decodeURI(searchParams?.q);
  const { data: { videos = [] } = {}, error } =
    (await getVideos({ q: searchVal })) || {};
  if (error) {
    return <Error title={"Error while getting searched videos"} />;
  }
  if (videos?.length === 0) {
    return <NoVideosFound className="h-full" isSearch />;
  }
  return (
    <div className="p-5">
      {videos?.length > 0 && (
        <LazyInfiniteVideos
          initialVideos={videos}
          queries={{
            q: searchVal,
          }}
          layout="flex"
        />
      )}
    </div>
  );
};

export default SearchResultPage;
