import { getVideoComments } from "@/api/comment.api";
import VideoCommentList from "./VideoCommentList";

const VideoCommentSection = async ({ videoId }) => {
  //console.log("videoId:", videoId);
  const { data = [] } = await getVideoComments(videoId);
  return (
    <div>
      <button className="peer w-full rounded-lg border p-4 text-left duration-200 hover:bg-white/5 focus:bg-white/5 sm:hidden">
        <h6 className="font-semibold">573 Comments...</h6>
      </button>
      <div className="fixed inset-x-0 top-full z-[60] h-[calc(100%-69px)] overflow-auto rounded-lg border bg-[#121212] p-4 duration-200 hover:top-[67px] peer-focus:top-[67px] sm:static sm:h-auto sm:max-h-[500px] lg:max-h-none">
        <div className="block">
          <h6 className="mb-4 font-semibold">573 Comments</h6>
          <input
            type="text"
            className="w-full rounded-lg border bg-transparent px-2 py-1 placeholder-white"
            placeholder="Add a Comment"
          />
        </div>
        <hr className="my-4 border-white" />
        {/* comment list */}
        <VideoCommentList commentList={data?.comments} />
      </div>
    </div>
  );
};

export default VideoCommentSection;
