import VideoCommentItem from "./VideoCommentItem";

const VideoCommentList = ({ commentList, userId }) => {
  return (
    <div>
      {commentList?.length > 0 ? (
        commentList.map((item) => (
          <VideoCommentItem userId={userId} key={item?._id} item={item} />
        ))
      ) : (
        <p className="text-white">No comments yet</p>
      )}
    </div>
  );
};

export default VideoCommentList;
