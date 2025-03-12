import { checkUserSubscription } from "@/api/subscription.api";
import moment from "moment";
import DescriptionChannelInfo from "./DescriptionChannelInfo";
import SaveToPlaylist from "./SaveToPlaylist";
import SubscribeChannel from "./SubscribeChannel";
import VideoLikeDislike from "./VideoLikeDislike";

const VideoDescription = async ({ video, userId }) => {
  const {
    title,
    description,
    views,
    createdAt,
    likes,
    dislikes,
    isLiked,
    isDisliked,
    _id,
    owner: { _id: ownerId } = {},
  } = video || {};

  const { data: { isSubscribed } = {} } =
    (userId && (await checkUserSubscription(ownerId))) || {};

  return (
    <div
      className="group mt-6 mb-4 w-full rounded-lg border p-4 duration-200 hover:bg-white/5 focus:bg-white/5"
      role="button"
      tabIndex="0"
    >
      <div className="flex flex-wrap gap-y-2">
        <div className="w-full md:w-1/2 lg:w-full xl:w-1/2">
          <h1 className="text-lg font-bold">{title}</h1>
          <p className="flex text-sm ">
            {views?.toLocaleString()} Views · {moment(createdAt).fromNow()}
          </p>
        </div>
        <div className="w-full md:w-1/2 lg:w-full xl:w-1/2">
          <div className="flex items-center justify-between gap-x-4 md:justify-end lg:justify-between xl:justify-end">
            {/* like  */}
            <VideoLikeDislike
              dislikeData={{
                dislikes,
                isDisliked,
              }}
              likeData={{
                likes,
                isLiked,
              }}
              videoId={_id}
              userId={userId}
            />
            {/* Save to playlist */}
            {userId && <SaveToPlaylist videoId={_id} />}
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <DescriptionChannelInfo videoOwner={video?.owner} />
        {/* subscribe channel */}
        <SubscribeChannel isSubscribed={isSubscribed} channelId={ownerId} />
      </div>
      <hr className="my-4 border-white" />
      <div className="h-5 overflow-hidden group-focus:h-auto">
        <p className="text-sm">{description}</p>
      </div>
    </div>
  );
};

export default VideoDescription;
