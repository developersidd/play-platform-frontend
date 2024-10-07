import { getUserSubscribedChannels } from "@/api/subscription.api";
import SearchSubscribedChannels from "./_components/SearchSubscribedChannels";
import SubscribedChannelList from "./_components/SubscribedChannelList";

const SubscribedChannelsPage = async ({
  params: { channelUsername },
  searchParams: { search },
}) => {
  console.log("search:", search);
  const { data: { totalSubscribedChannels, subscribedChannels } = {}, error } =
    await getUserSubscribedChannels(channelUsername, {
      search,
    });
  return (
    <div class="flex flex-col gap-y-4 py-4">
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
