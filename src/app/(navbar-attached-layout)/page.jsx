import { getAllVideos } from "@/api/video.api";
import InfiniteVideoGrid from "@/components/common/InfiniteVideoGrid";
import VideoList from "./_components/VideoList";

const HomePage = async () => {
  const { data, error } = await getAllVideos({
    limit: 20,
  });
  return (
    <section className="w-full pb-[70px] px-4 ">
      <VideoList videos={data?.videos} />
      {data?.videos.length > 0 && (
        <InfiniteVideoGrid
          limit={20}
          pageToLoad={2}
          initialShow={10}
          query={{ sortBy: "createdAt", sortType: "desc" }}
        />
      )}
    </section>
  );
};

export default HomePage;
