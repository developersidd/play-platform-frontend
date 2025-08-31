import { retrieveCurrentUser } from "@/api/user.api";
import { getVideos } from "@/api/video.api";
import MyChannelNoVideosFound from "@/app/(navbar-attached-layout)/_components/MyChannelNoVideosFound";
import NoVideosFound from "@/app/(navbar-attached-layout)/_components/NotFoundVideos";
import Error from "@/components/common/Error";
import UploadVideoModal from "@/components/common/video/VideoFormModal";
import { Button } from "@/components/ui/button";
import { Play, Plus } from "lucide-react";
import dynamic from "next/dynamic";
const LazyInfiniteVideos = dynamic(() =>
  import("@/components/infinite-data-layout/InfiniteVideos")
);
const ChannelVideosPage = async ({ params }) => {
  const { channelUsername } = await params;
  const { data: user } = await retrieveCurrentUser();
  const { data, data: { videos } = {}, error } =
    (await getVideos({
      limit: 10,
      username: channelUsername,
    })) || {};
  const isMyChannel = user?.username === channelUsername;

  // decide what to render
  let content;
  if (error) {
    throw new Error("Error while getting My videos");
  } else if (videos?.length > 0) {
    content = (
      <>
        {isMyChannel && (
          <div className="md:hidden flex items-center justify-between  pb-5 max-sm:px-2">
            <h1 className="text-xl xl:text-2xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
              <Play className="size-5 md:size-6" />
              Videos
            </h1>
            <UploadVideoModal key="upload-video">
              <Button className="rounded-full bg-secondary text-white hover:bg-secondary dark:bg-dark-bg">
                <Plus className="text-white" /> Upload
              </Button>
            </UploadVideoModal>
          </div>
        )}
        <LazyInfiniteVideos initialData={data} />
      </>
    );
  } else if (isMyChannel && videos?.length !== 0) {
    content = <MyChannelNoVideosFound />;
  } else {
    content = <NoVideosFound className="h-[450px]" />;
  }

  return <div className="w-full py-5">{content}</div>;
};

export default ChannelVideosPage;
