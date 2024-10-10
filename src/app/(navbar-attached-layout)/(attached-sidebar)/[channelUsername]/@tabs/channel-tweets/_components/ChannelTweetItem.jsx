import { ThumbsDown, ThumbsUp } from "lucide-react";
import moment from "moment";

const ChannelTweetItem = ({ tweet }) => {
  const {
    _id,
    owner: { fullName, avatar } = {},
    content,
    createdAt,
    likes,
    dislikes,
  } = tweet || {};
  return (
    <div className="flex gap-3 border-b border-gray-700 py-4 last:border-b-transparent">
      <div className="h-14 w-14 shrink-0">
        <img
          src={avatar?.url}
          alt={fullName}
          className="h-full w-full rounded-full"
        />
      </div>
      <div className="w-full">
        <h4 className="mb-1 flex items-center gap-x-2">
          <span className="font-semibold">{fullName} </span>&nbsp;
          <span className="inline-block text-sm text-gray-400">
            {" "}
            {moment(createdAt).fromNow()}{" "}
          </span>
        </h4>
        <p className="mb-2">{content}</p>
        <div className="flex gap-4">
          <button
            className="group inline-flex items-center gap-x-1 outline-none after:content-[attr(data-like-count)] focus:after:content-[attr(data-like-count-alt)]"
            data-like-count={likes}
            data-like-count-alt={likes}
          >
            <ThumbsUp />
          </button>
          <button
            className="group inline-flex items-center gap-x-1 outline-none after:content-[attr(data-dislike-count)] focus:after:content-[attr(data-dislike-count-alt)]"
            data-dislike-count={dislikes}
            data-dislike-count-alt={dislikes}
          >
            <ThumbsDown />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChannelTweetItem;
