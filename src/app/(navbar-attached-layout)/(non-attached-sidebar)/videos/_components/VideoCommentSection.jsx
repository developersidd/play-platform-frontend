import { getVideoComments } from "@/actions/comment.api";
import VideoAddComment from "./VideoAddComment";
import VideoCommentList from "./VideoCommentList";

const VideoCommentSection = async ({ videoId }) => {
  const { data: { totalComments } = {} } =
    (await getVideoComments(videoId)) || {};
  return (
    <div className="min-h-full">
      <button className="peer w-full rounded-lg border p-4 text-left duration-200 hover:bg-white/5 focus:bg-white/5 sm:hidden">
        <h6 className="font-semibold">573 Comments...</h6>
      </button>
      <div className="fixed inset-x-0 top-full z-[60]  overflow-auto rounded-lg border bg-background p-4 duration-200 hover:top-[67px] peer-focus:top-[67px] sm:static min-h-auto  h-full">
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
