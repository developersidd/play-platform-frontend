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
    <div class="flex gap-3 border-b border-gray-700 py-4 last:border-b-transparent">
      <div class="h-14 w-14 shrink-0">
        <img
          src={avatar?.url}
          alt={fullName}
          class="h-full w-full rounded-full"
        />
      </div>
      <div class="w-full">
        <h4 class="mb-1 flex items-center gap-x-2">
          <span class="font-semibold">{fullName} </span>&nbsp;
          <span class="inline-block text-sm text-gray-400">
            {" "}
            {moment(createdAt).fromNow()}{" "}
          </span>
        </h4>
        <p class="mb-2">{content}</p>
        <div class="flex gap-4">
          <button
            class="group inline-flex items-center gap-x-1 outline-none after:content-[attr(data-like-count)] focus:after:content-[attr(data-like-count-alt)]"
            data-like-count={likes}
            data-like-count-alt={likes}
          >
            <ThumbsUp />
          </button>
          <button
            class="group inline-flex items-center gap-x-1 outline-none after:content-[attr(data-dislike-count)] focus:after:content-[attr(data-dislike-count-alt)]"
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
