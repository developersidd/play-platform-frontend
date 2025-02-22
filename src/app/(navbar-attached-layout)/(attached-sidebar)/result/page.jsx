import { getAllVideos } from "@/api/video.api";
import Error from "@/components/common/Error";
import dynamic from "next/dynamic";
import NoVideosFound from "../../_components/NotFoundVideos";

const LazyInfiniteVideos = dynamic(() =>
  import("@/components/infinite-data-layout/InfiniteVideos")
);
const SearchResultPage = async ({ searchParams }) => {
  const searchVal = decodeURI(searchParams?.q);
  const { data, error } = (await getAllVideos({ q: searchVal })) || {};
  const { videos } = data || {};
  if (error) {
    return <Error title={"Error while getting searched videos"} />;
  }
  if (videos?.length === 0) {
    return <NoVideosFound isSearch />;
  }
  return (
    <section className="w-full  pb-[70px] px-3 sm:ml-[70px] sm:pb-0 lg:ml-0">
      {videos?.length > 0 && (
        <LazyInfiniteVideos
          initialVideos={data?.videos}
          queries={{
            q: searchVal,
          }}
          layout="flex"
        />
      )}
    </section>
  );
};

export default SearchResultPage;
