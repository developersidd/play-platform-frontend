import Error from "@/components/common/Error";
import { getWatchLaterVideos } from "@/server-actions/watchLater.action";
import NoVideosFound from "../../_components/NotFoundVideos";
import WatchLaterSidebar from "./_components/WatchLaterSidebar";
import WatchLaterVideoList from "./_components/WatchLaterVideoList";

const WatchLaterPage = async () => {
  const { data = [], error } = (await getWatchLaterVideos()) || {};
  const firstVideoThumbnailUrl = (data || [])[0]?.video?.thumbnail?.url;
  // decide what to render
  let content;
  if (data?.length > 0) {
    content = (
      <>
        <WatchLaterSidebar thumbnailUrl={firstVideoThumbnailUrl} />
        <WatchLaterVideoList dbVideos={data} />
      </>
    );
  } else if (data?.length === 0) {
    content = (
      <NoVideosFound
        className={"h-[calc(100vh-120px)]"}
        description="No videos found in your watch later list."
      />
    );
  } else if (error) {
    content = (
      <Error
        title="Error fetching watch later videos"
        className="h-[calc(100vh-120px)]"
      />
    );
  }
  return <section className="p-4 flex gap-5  ">{content}</section>;
};

export default WatchLaterPage;
