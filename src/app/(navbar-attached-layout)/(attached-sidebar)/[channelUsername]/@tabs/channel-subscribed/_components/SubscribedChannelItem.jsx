import SubscribeChannel from "@/app/(navbar-attached-layout)/(non-attached-sidebar)/videos/_components/SubscribeChannel";
import { formatCounting } from "@/lib/utils";
import Link from "next/link";

const SubscribedChannelItem = ({ channel }) => {
  const { fullName, username, avatar, channelSubscribers, isSubscribed } =
    channel || {};
  return (
    <div className={`flex w-full justify-between ${!fullName && "hidden"}`}>
      <div className="flex items-center gap-x-2">
        <Link href={`/${username}`}>
          <div className="h-14 w-14 shrink-0">
            <img
              src={avatar?.url}
              alt={fullName}
              className="h-full w-full rounded-full"
            />
          </div>
        </Link>
        <div className="block">
          <h6 className="font-semibold"> {fullName} </h6>
          <p className="text-sm text-gray-300">
            {" "}
            {formatCounting(channelSubscribers)} Subscribers
          </p>
        </div>
      </div>
      <SubscribeChannel channelId={channel.id} isSubscribed={isSubscribed} />
    </div>
  );
};

export default SubscribedChannelItem;
