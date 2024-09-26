import { retrieveCurrentUser } from "@/api/user.api";
import { getVideoById } from "@/api/video.api";
import RelatedVideoList from "../_components/RelatedVideoList";
import VideoComments from "../_components/VideoComments";
import VideoDescription from "../_components/VideoDescription";
import VideoPlayer from "../_components/VideoPlayer";

const SingleVideoPage = async ({ params: { id } = {} }) => {
  const video = await getVideoById(id);

  const { user, error } = await retrieveCurrentUser();
  console.log("error user:", error);

  return (
    <section className="w-full pb-[70px] sm:pb-0">
      <div className="flex w-full flex-wrap gap-4 p-4 lg:flex-nowrap">
        <div className="col-span-12 w-full">
          {/* video Player */}
          <VideoPlayer video={video} />
          {/* video description */}
          <VideoDescription video={video} userId={user?._id} />
          {/* comments */}
          <VideoComments />
        </div>
        {/* Realted videos */}
        <RelatedVideoList />
      </div>
    </section>
  );
};

export default SingleVideoPage;
