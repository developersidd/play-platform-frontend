import Error from "@/components/common/Error";
import { getVideos } from "@/server-actions/video.action";
import dynamic from "next/dynamic";
import NoVideosFound from "../_components/NotFoundVideos";
const LazyInfiniteVideos = dynamic(() =>
  import("@/components/infinite-data-layout/InfiniteVideos")
);
const HomePage = async () => {
  const { data, error } = await getVideos({
    limit: 20,
    status: "published",
    sortOrder: "desc",
    sortBy: "createdAt",
  });
  if (error) {
    return <Error title={"Error while getting videos"} />;
  }
  if (data?.videos?.length === 0) {
    return <NoVideosFound classes={"mt-10"} />;
  }
  return (
    <section className="px-3.5 lg:px-5 py-5 pb-[50px]">
      <LazyInfiniteVideos initialVideos={data?.videos} />
    </section>
  );
};

export default HomePage;
