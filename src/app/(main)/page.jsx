import { getAllVideos } from "@/api/video.api";
import NoVideosFound from "./_components/NotFoundVideos";
import VideoList from "./_components/VideoList";

const HomePage = async () => {
  const data = await getAllVideos();
  //console.log("home page rendered");

  return (
    <section className="w-full pb-[70px] px-4">
      {data?.videos?.length > 0 ? (
        <VideoList videos={data?.videos} />
      ) : (
        <NoVideosFound search={true} />
      )}
    </section>
  );
};

export default HomePage;
