import { getRelatedVideos } from "@/api/video.api";
import RelatedVideoCard from "./RelatedVideoCard";

const RelatedVideoList = async ({ videoId }) => {
  const { data } = await getRelatedVideos(videoId);
  return (
    <div className="col-span-12 flex w-full shrink-0 flex-col gap-3 lg:w-[350px] xl:w-[400px]">
      {data?.length > 0 ? (
        data.map((video) => <RelatedVideoCard key={video._id} video={video} />)
      ) : (
        <p className="text-lg text-gray-400">No related videos found</p>
      )}
    </div>
  );
};

export default RelatedVideoList;
