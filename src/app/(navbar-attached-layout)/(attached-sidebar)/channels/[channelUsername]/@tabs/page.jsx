//"use server";
import { retrieveCurrentUser } from "@/api/user.api";
import { getAllVideos } from "@/api/video.api";
import InfiniteVideoGrid from "../../../../../../components/common/InfiniteVideoGrid";
import VideoList from "../../../../_components/VideoList";
//import IntersectionObserver from "@/components/common/IntersectionObserver";

const ChannelVideosPage = async ({ params: { channelUsername } }) => {
  const { data: user } = await retrieveCurrentUser();
  const { data, error } = await getAllVideos({
    limit: 10,
    username: channelUsername,
  });
  const isMyChannel = user?.username === channelUsername;
  return (
    <div className="w-full">
      <VideoList videos={data?.videos} isMyChannel={isMyChannel} />
      {data?.videos?.length > 0 && (
        <InfiniteVideoGrid
          limit={10}
          initialShow={10}
          pageToLoad={2}
          query={{ username: channelUsername }}
        />
      )}
    </div>
  );
};

export default ChannelVideosPage;
