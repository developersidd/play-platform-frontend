import { getRelatedVideos } from "@/api/video.api";
import NoVideosFound from "@/app/(navbar-attached-layout)/_components/NotFoundVideos";
import Error from "@/components/common/Error";
import dynamic from "next/dynamic";
const LazyInfiniteRelatedVideos = dynamic(() =>
  import("../_components/InfiniteRelatedVideos")
);
const RelatedVideoList = async ({ videoId }) => {
  const { data, error } = await getRelatedVideos(videoId, {
    limit: 20,
  });
  // decide what to render
  let content;
  if (error) {
    content = <Error title={"Error while getting Related videos"} />;
  } else if (data?.videos?.length === 0) {
    content = (
      <NoVideosFound title="No related videos found" classes={"mt-10"} />
    );
  } else {
    content = (
      <LazyInfiniteRelatedVideos
        videoId={videoId}
        initialVideos={data?.videos}
      />
    );
  }
  return (
    <div className="col-span-12 flex justify-center items-center w-full shrink-0 flex-col gap-3 lg:w-[350px] xl:w-[400px]">
      {content}
    </div>
  );
};

export default RelatedVideoList;
