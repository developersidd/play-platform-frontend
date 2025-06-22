import { getVideoComments } from "@/server-actions/comment.action";
import VideoAddComment from "./VideoAddComment";
import VideoCommentList from "./VideoCommentList";

const VideoCommentSection = async ({ videoId }) => {
  const { data: { totalComments } = {} } =
    (await getVideoComments(videoId)) || {};
  return (
    <div className="min-full">
      <div className=" rounded-lg border bg-background p-4 duration-200   h-full">
        <div className="block">
          <h6 className="mb-4 font-semibold">
            {" "}
            {totalComments} Comments
            <VideoAddComment videoId={videoId} />
          </h6>
        </div>
        {totalComments > 0 && (
          <hr className="my-4 dark:border-white border-gray-300" />
        )}
        {/* comment list */}
        <VideoCommentList videoId={videoId} />
      </div>
    </div>
  );
};

export default VideoCommentSection;
