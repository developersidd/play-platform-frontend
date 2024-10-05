import InfiniteVideoGrid from "@/components/common/InfiniteVideoGrid";
import NoVideosFound from "./_components/NotFoundVideos";

const HomePage = async () => {
  return (
    <section className="w-full pb-[70px] px-4 flex items-center">
      <InfiniteVideoGrid
        NoVideosFound={<NoVideosFound />}
        limit={25}
        initialShow={10}
        query={{ sortBy: "createdAt", sortType: "desc" }}
      />
    </section>
  );
};

export default HomePage;
