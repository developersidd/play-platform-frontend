import { getUserSubscribedChannels } from "@/api/subscription.api";
import SubscribedChannelList from "./_components/SubscribedChannelList";

const SubscribedChannelsPage = async ({
  params: { channelUsername },
  searchParams: { search },
}) => {
  const { data: { totalSubscribedChannels, subscribedChannels } = {} } =
    await getUserSubscribedChannels(channelUsername, {
      search,
    });
  return (
    <div className="flex flex-col gap-y-4 py-4">
      <SubscribedChannelList
        search={search}
        data={{
          subscribedChannels,
          totalSubscribedChannels,
        }}
      />
    </div>
  );
};

export default SubscribedChannelsPage;
