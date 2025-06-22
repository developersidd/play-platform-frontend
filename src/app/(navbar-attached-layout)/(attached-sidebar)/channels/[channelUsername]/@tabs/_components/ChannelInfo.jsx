import SubscribeChannel from "@/app/(navbar-attached-layout)/(non-attached-sidebar)/videos/_components/SubscribeChannel";
import { formatCounting } from "@/lib/utils";
import { Pen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ChannelInfo = ({ channelInfo, isMyChannel }) => {
  const {
    _id,
    username,
    subscribersCount,
    isSubscribed,
    subscribedChannelsCount,
    fullName,

    avatar,
  } = channelInfo || {};
  return (
    <div className="flex flex-wrap gap-4 pb-4 pt-3 md:pt-6">
      <span className="relative -mt-12 inline-block size-24 md:size-28 shrink-0 overflow-hidden rounded-full border-2">
        <Image
          width={112}
          height={112}
          src={avatar?.url}
          alt={username}
          className="h-full w-full"
        />
      </span>
      <div className="mr-auto inline-block">
        <h1 className="font-bold text-xl"> {fullName} </h1>
        <p className="text-sm text-gray-400">@ {username}</p>
        <p className="text-sm text-gray-400">
          {formatCounting(subscribersCount)} Subscribers&nbsp;·&nbsp;
          {formatCounting(subscribedChannelsCount)} Subscribed
        </p>
      </div>
      <div className="inline-block">
        {isMyChannel ? (
          <Link
            href={`/edit/channel`}
            className="group/btn mr-1 flex w-full items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto"
          >
            <span className="inline-block w-5">
              <Pen size={18} />
            </span>
            Edit
          </Link>
        ) : (
          <SubscribeChannel
            animation
            channelId={_id}
            isSubscribed={isSubscribed}
          />
        )}
      </div>
    </div>
  );
};

export default ChannelInfo;
