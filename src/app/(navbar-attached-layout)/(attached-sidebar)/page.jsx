import { getAllVideos } from "@/api/video.api";
import Error from "@/components/common/Error";
import NoVideosFound from "../_components/NotFoundVideos";
import VideoList from "../_components/VideoList";
import HomeVideoGrid from "./result/_components/HomeVideoGrid";

const HomePage = async () => {
  const { data, error } = await getAllVideos({
    limit: 20,
  });
  if (error) {
    return <Error title={"Error while getting videos"} />;
  }
  if (data?.videos.length === 0) {
    return <NoVideosFound classes={"mt-10"} />;
  }
  return (
    <section className="w-full pb-[70px] px-4 ">
      <VideoList videos={data?.videos} />
      {data?.videos.length > 0 && <HomeVideoGrid />}
    </section>
  );
};

export default HomePage;
