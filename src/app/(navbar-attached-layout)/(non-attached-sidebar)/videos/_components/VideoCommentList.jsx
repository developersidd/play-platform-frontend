import { getVideoComments } from "@/api/comment.api";
import Error from "@/components/common/Error";
import dynamic from "next/dynamic";
import VideoCommentItem from "./VideoCommentItem";

const LazyVideoInfiniteComments = dynamic(() =>
  import("../_components/VideoInfiniteComments")
);

const VideoCommentList = async ({ videoId }) => {
  const { data: { comments, hasNextPage } = {}, error } =
    (await getVideoComments(videoId)) || {};
  // decide what to render
  let content;
  if (error) {
    content = <Error title={"Error while getting comments"} />;
  } else if (comments?.length === 0) {
    content = <p className="text-white">No comments yet</p>;
  } else if (!hasNextPage) {
    //console.log("comments nesxt page false", comments);
    content = comments.map((item) => (
      <VideoCommentItem key={item?._id} item={item} />
    ));
  } else {
    content = <LazyVideoInfiniteComments initialComments={comments} />;
  }
  return <div>{content}</div>;
};

export default VideoCommentList;
