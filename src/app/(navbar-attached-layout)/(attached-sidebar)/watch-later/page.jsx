import Error from "@/components/common/Error";
import { getWatchLaterVideos } from "@/server-actions/watchLater.action";
import NoVideosFound from "../../_components/NotFoundVideos";
import WatchLaterSidebar from "./_components/WatchLaterSidebar";
import WatchLaterVideoList from "./_components/WatchLaterVideoList";

const WatchLaterPage = async () => {
  const { data: videos = [], error } = (await getWatchLaterVideos()) || {};
  const firstVideoThumbnailUrl = (videos || [])[0]?.video?.thumbnail?.url;

  // decide what to render
  let content;
  if (videos.length > 0) {
    content = (
      <>
        <WatchLaterSidebar thumbnailUrl={firstVideoThumbnailUrl} />
        <WatchLaterVideoList dbVideos={videos} />
      </>
    );
  } else if (videos?.length === 0) {
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
  return (
    <section className="p-4 flex flex-wrap lg:flex-nowrap gap-5 md:gap-3 xl:gap-5  w-full">
      {content}
    </section>
  );
};

export default WatchLaterPage;
