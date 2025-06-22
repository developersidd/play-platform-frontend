import NoVideosFound from "@/app/(navbar-attached-layout)/_components/NotFoundVideos";
import Error from "@/components/common/Error";
import { getRelatedVideos } from "@/server-actions/video.action";
import dynamic from "next/dynamic";
import RelatedVideoCard from "./RelatedVideoCard";
const LazyInfiniteRelatedVideos = dynamic(() =>
  import("../_components/InfiniteRelatedVideos")
);
const RelatedVideoList = async ({ videoId }) => {
  const { data, error } = await getRelatedVideos(videoId, {
    limit: 20,
  });
  let layoutCenterClass =
    data?.videos?.length === 0 || error ? "items-center" : "";
  // decide what to render
  let content;
  if (error) {
    content = <Error title={"Error while getting Related videos"} />;
  } else if (data?.videos?.length === 0) {
    content = (
      <NoVideosFound
        title="No related videos found"
        className={"mt-10 mx-auto"}
      />
    );
  } else if (!data?.hasNextPage) {
    content = data?.videos?.map((video) => (
      <RelatedVideoCard key={video._id} video={video} />
    ));
  } else {
    content = (
      <LazyInfiniteRelatedVideos
        videoId={videoId}
        initialVideos={data?.videos}
      />
    );
  }
  return (
    <div
      className={` col-span-12 flex  ${layoutCenterClass}  w-full shrink-0 flex-col gap-3 lg:w-[400px] xl:w-[450px] items-center mx-auto`}
    >
      {content}
    </div>
  );
};

export default RelatedVideoList;
