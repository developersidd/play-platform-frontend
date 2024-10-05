import InfiniteVideoGrid from "@/components/common/InfiniteVideoGrid";
import NoVideosFound from "../_components/NotFoundVideos";

const SearchResultPage = async ({ searchParams }) => {
  const searchVal = decodeURI(searchParams?.q);
  return (
    <section class="w-full flex items-center pb-[70px] px-3 sm:ml-[70px] sm:pb-0 lg:ml-0">
      <InfiniteVideoGrid
        NoVideosFound={<NoVideosFound isSearch />}
        limit={15}
        parentClasses={"flex flex-col h-full gap-4 p-4"}
        initialShow={10}
        isHorizontal
        query={{ q: searchVal }}
      />
    </section>
  );
};

export default SearchResultPage;
