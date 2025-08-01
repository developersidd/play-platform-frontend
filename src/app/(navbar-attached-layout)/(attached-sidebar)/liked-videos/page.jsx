import { getLikedVideos } from "@/api/video.api";
import LikedVideos from "./_components/LikedVideos";
import LikedVideosInfo from "./_components/LikedVideosInfo";

const LikedVideosPage = async () => {
  const { data = [] } = await getLikedVideos();
  //console.log("error:", error);
  console.log("liked videos data:", data);
  return (
    <section className="w-full pb-[70px] sm:pb-0">
      <div className="flex flex-wrap gap-x-4 gap-y-10 p-4 xl:flex-nowrap">
        {/* Playlist Details */}
        <LikedVideosInfo
          likedVideosInfo={{
            totalVideos: data?.length,
            video: (data || [])[0]?.video,
          }}
        />
        {/* Playlist Videos */}
        <LikedVideos videos={data} />
      </div>
    </section>
  );
};

export default LikedVideosPage;
