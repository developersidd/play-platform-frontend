import { getChannelByUsername, retrieveCurrentUser } from "@/api/user.api";
import Image from "next/image";
import ChannelInfo from "./@tabs/_components/ChannelInfo";
import ChannelMenu from "./@tabs/_components/ChannelMenu";

const ChannelLayout = async ({ tabs, params }) => {
  const { data: user } = await retrieveCurrentUser();
  //console.log(" user:", user)
  const { channelUsername } = await params;
  const { data: channel } = await getChannelByUsername(
    channelUsername,
    user?._id
  );
  const isMyChannel = user?.username === channelUsername;
  return (
    <section className="w-full">
      <div className="relative h-[150px] sm:h-[350px] w-full pt-[16.28%]">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            width={1200}
            height={600}
            className="max-sm: object-cover w-full h-full"
            src={channel?.coverImage?.url}
            alt={channel?.username}
          />
        </div>
      </div>
      <div className="px-4 pb-4">
        <ChannelInfo
          isMyChannel={isMyChannel}
          loggedInUserId={user?._id}
          channelInfo={channel}
        />
        {/* Sidebar */}
        <ChannelMenu isMyChannel={isMyChannel} />
        {/* Tabs Content */}
        {tabs}
      </div>
    </section>
  );
};

export default ChannelLayout;
