import { getSearchedVideos } from "@/api/video.api";
import SearchedVideos from "./_components/SearchedVideos";

const SearchResultPage = async ({ searchParams }) => {
  const { data, error } = await getSearchedVideos(searchParams?.q);
  const searchVal = decodeURI(searchParams?.q);
  return (
    <section class="w-full pb-[70px] px-3 sm:ml-[70px] sm:pb-0 lg:ml-0">
      <SearchedVideos videos={data?.videos} searchVal={searchVal} />
    </section>
  );
};

export default SearchResultPage;
