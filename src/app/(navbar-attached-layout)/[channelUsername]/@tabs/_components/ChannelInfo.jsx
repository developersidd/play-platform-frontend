import SubscribeChannel from "@/app/(navbar-attached-layout)/(non-attached-sidebar)/videos/_components/SubscribeChannel";
import { formatCounting } from "@/lib/utils";

const ChannelInfo = ({ channelInfo, loggedInUserId }) => {
  const {
    _id,
    username,
    subscribersCount,
    isSubscribed,
    subscribedChannelsCount,
    fullName,
    email,
    avatar,
  } = channelInfo || {};
  return (
    <div class="flex flex-wrap gap-4 pb-4 pt-6">
      <span class="relative -mt-12 inline-block h-28 w-28 shrink-0 overflow-hidden rounded-full border-2">
        <img src={avatar?.url} alt={username} class="h-full w-full" />
      </span>
      <div class="mr-auto inline-block">
        <h1 class="font-bold text-xl"> {fullName} </h1>
        <p class="text-sm text-gray-400">@ {username}</p>
        <p class="text-sm text-gray-400">
          {formatCounting(subscribersCount)} Subscribers&nbsp;·&nbsp;
          {formatCounting(subscribedChannelsCount)} Subscribed
        </p>
      </div>
      <div class="inline-block">
        <SubscribeChannel
          animation
          channelId={_id}
          isSubscribed={isSubscribed}
        />
      </div>
    </div>
  );
};

export default ChannelInfo;
