import { getVideos } from "@/api/video.api";
import Error from "@/components/common/Error";
import dynamic from "next/dynamic";
import NoVideosFound from "../../_components/NotFoundVideos";

const LazyInfiniteVideos = dynamic(() =>
  import("@/components/infinite-data-layout/InfiniteVideos")
);
const SearchResultPage = async ({ searchParams }) => {
  const searchVal = decodeURI(searchParams?.q);
  const { data, error } = (await getVideos({ q: searchVal })) || {};
  const { videos } = data || {};
  if (error) {
    return <Error title={"Error while getting searched videos"} />;
  }
  if (videos?.length === 0) {
    return <NoVideosFound isSearch />;
  }
  return (
    <div className="px-7 py-5">
      {videos?.length > 0 && (
        <LazyInfiniteVideos
          initialVideos={data?.videos}
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
