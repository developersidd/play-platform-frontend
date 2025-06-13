import { retrieveCurrentUser } from "@/server-actions/user.action";
import { getVideoById } from "@/server-actions/video.action";
import PlaylistBox from "../_components/PlaylistBox";
import RelatedVideoList from "../_components/RelatedVideoList";
import VideoCommentSection from "../_components/VideoCommentSection";
import VideoDescription from "../_components/VideoDescription";
import VideoPlayer from "../_components/VideoPlayer";

const SingleVideoPage = async ({
  params: { id } = {},
  searchParams: { list, index },
}) => {
  console.log(" index:", index)
  const { data: user } = (await retrieveCurrentUser()) || {};
  const { data: video, error } = (await getVideoById(id, user?._id)) || {};
  console.log(" error id:", error)

  return (
    <section className=" w-full mx-2 lg:mx-10 xl:mx-20 ">
      <div className="flex w-full flex-wrap gap-4 px-2 py-4 md:py-8 lg:flex-nowrap">
        <div className=" w-full">
          {/* video Player */}
          <VideoPlayer video={video} />
          {/* video description */}
          <VideoDescription video={video} userId={user?._id} />
          {/* comments */}
          <VideoCommentSection videoId={id} userId={user?._id} />
        </div>
        {/* Realted videos */}
        <div className="space-y-8">
          {list && index && (
            <PlaylistBox
              currentVideoIndex={parseInt(index)}
              videos={[
                { name: "Hello", _id: "1552" },
                { name: "Hello", _id: "1552" },
              ]}
              playlistId={list}
            />
          )}
          <RelatedVideoList videoId={id} />
        </div>
      </div>
    </section>
  );
};

export default SingleVideoPage;
