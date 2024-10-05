import { getAllVideos } from "@/api/video.api";
import InfiniteVideoGrid from "@/components/common/InfiniteVideoGrid";
import NoVideosFound from "./_components/NotFoundVideos";

const HomePage = async () => {
  const { data, error } = await getAllVideos({
    limit: 25,
  });
  return (
    <section className="w-full pb-[70px] px-4 flex items-center">
      <InfiniteVideoGrid
        initialVideos={data?.videos}
        NoVideosFound={<NoVideosFound />}
        limit={25}
        pageToLoad={2}
        initialShow={10}
        query={{ sortBy: "createdAt", sortType: "desc" }}
      />
    </section>
  );
};

export default HomePage;
