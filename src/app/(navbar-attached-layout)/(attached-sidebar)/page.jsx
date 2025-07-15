import { getVideos } from "@/api/video.api";
import Error from "@/components/common/Error";
import NoVideosFound from "../_components/NotFoundVideos";
import InfiniteVideos from "@/components/infinite-data-layout/InfiniteVideos";

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
    <section className="px-3 lg:px-4 py-5 pb-[50px]">
      <InfiniteVideos initialVideos={data?.videos} />
    </section>
  );
};

export default HomePage;
