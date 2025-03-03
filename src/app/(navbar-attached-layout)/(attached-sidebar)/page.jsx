import { getVideos } from "@/api/video.api";
import Error from "@/components/common/Error";
import dynamic from "next/dynamic";
import NoVideosFound from "../_components/NotFoundVideos";
const LazyInfiniteVideos = dynamic(() =>
  import("@/components/infinite-data-layout/InfiniteVideos")
);
const HomePage = async () => {
  const { data, error } = await getVideos({
    limit: 20,
  });
  if (error) {
    return <Error title={"Error while getting videos"} />;
  }
  if (data?.videos?.length === 0) {
    return <NoVideosFound classes={"mt-10"} />;
  }
  return (
    <section className="w-full px-7 py-5">
      <LazyInfiniteVideos initialVideos={data?.videos} />
    </section>
  );
};

export default HomePage;
