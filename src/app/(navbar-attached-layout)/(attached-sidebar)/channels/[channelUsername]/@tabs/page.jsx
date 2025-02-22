//"use server";
import { retrieveCurrentUser } from "@/api/user.api";
import { getAllVideos } from "@/api/video.api";
import dynamic from "next/dynamic";
const LazyInfiniteVideos = dynamic(() =>
  import("@/components/infinite-data-layout/InfiniteVideos")
);
const ChannelVideosPage = async ({ params: { channelUsername } }) => {
  const { data: user } = await retrieveCurrentUser();
  const { data: { videos } = {} } =
    (await getAllVideos({
      limit: 10,
      username: channelUsername,
    })) || {};
  const isMyChannel = user?.username === channelUsername;

  return (
    <div className="w-full">
      {" "}
      {videos?.length > 0 && (
        <LazyInfiniteVideos initialVideos={videos} queries={{}} />
      )}
    </div>
  );
};

export default ChannelVideosPage;
