import { getUserSubscribedChannels } from "@/api/subscription.api";
import SubscribedChannelList from "./_components/SubscribedChannelList";

const SubscribedChannelsPage = async ({ params, searchParams: { search } }) => {
  const { channelUsername } = await params;
  const { data: { totalSubscribedChannels, subscribedChannels } = {}, data } =
    (await getUserSubscribedChannels(channelUsername, {
      search,
    })) || {};
  //console.log(" data:", data);
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
