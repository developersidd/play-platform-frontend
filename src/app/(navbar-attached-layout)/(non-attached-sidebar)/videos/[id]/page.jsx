import { retrieveCurrentUser } from "@/api/user.api";
import { getVideoById } from "@/api/video.api";
import RelatedVideoList from "../_components/RelatedVideoList";
import VideoCommentSection from "../_components/VideoCommentSection";
import VideoDescription from "../_components/VideoDescription";
import VideoPlayer from "../_components/VideoPlayer";

const SingleVideoPage = async ({ params: { id } = {} }) => {
  const { data: video, error: videoError } = await getVideoById(id);

  const { data: user, error: userError } = await retrieveCurrentUser();

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
