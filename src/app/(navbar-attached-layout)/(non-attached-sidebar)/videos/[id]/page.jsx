import { retrieveCurrentUser } from "@/server-actions/user.action";
import { getVideoById } from "@/server-actions/video.action";
import RelatedVideoList from "../_components/RelatedVideoList";
import VideoCommentSection from "../_components/VideoCommentSection";
import VideoDescription from "../_components/VideoDescription";
import VideoPlayer from "../_components/VideoPlayer";

const SingleVideoPage = async ({ params: { id } = {} }) => {
  const { data: user } = (await retrieveCurrentUser()) || {};
  const { data: video } = (await getVideoById(id, user?._id)) || {};

  return (
    <section className="w-full mx-20 pb-[70px] sm:pb-0">
      <div className="flex w-full flex-wrap gap-4 px-2 py-8 lg:flex-nowrap">
        <div className="col-span-12 w-full">
          {/* video Player */}
          <VideoPlayer video={video} />
          {/* video description */}
          <VideoDescription video={video} userId={user?._id} />
          {/* comments */}
          <VideoCommentSection videoId={id} userId={user?._id} />
        </div>
        {/* Realted videos */}
        <RelatedVideoList videoId={id} />
      </div>
    </section>
  );
};

export default SingleVideoPage;
