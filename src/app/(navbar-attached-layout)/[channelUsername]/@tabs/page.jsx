//"use server";
import { retrieveCurrentUser } from "@/api/user.api";
import { getAllVideos } from "@/api/video.api";
import InfiniteVideoGrid from "../../../../components/common/InfiniteVideoGrid";
import ChannelNoVideos from "./_components/ChannelNoVideos";
//import IntersectionObserver from "@/components/common/IntersectionObserver";

const ChannelVideosPage = async ({ params: { channelUsername } }) => {
  const { data: user } = await retrieveCurrentUser();
  const { data, error } = await getAllVideos(channelUsername);
  return (
    <div className="h-[42vh] w-full grid place-items-center">
      <InfiniteVideoGrid
        initialVideos={data?.videos}
        NoVideosFound={<ChannelNoVideos />}
        limit={10}
        initialShow={10}
        query={{ username: channelUsername }}
      />
    </div>
  );
};

export default ChannelVideosPage;
