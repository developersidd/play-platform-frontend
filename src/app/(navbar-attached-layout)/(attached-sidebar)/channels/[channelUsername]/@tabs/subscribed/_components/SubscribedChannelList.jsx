import ChannelNoSubscribed from "./ChannelNoSubscribed";
import SearchSubscribedChannels from "./SearchSubscribedChannels";
import SubscribedChannelItem from "./SubscribedChannelItem";

const SubscribedChannelList = ({
  data: { subscribedChannels = [], totalSubscribedChannels } = {},
  search = "",
}) => {
  // decide what to render
  let content;
  if (subscribedChannels?.length === 0 && search === "") {
    content = <ChannelNoSubscribed />;
  } else if (subscribedChannels?.length === 0 && search !== "") {
    content = <ChannelNoSubscribed search={search} />;
  } else {
    content = (
      <div className="space-y-5 mt-6">
        {subscribedChannels?.map(
          (subscription) =>
            subscription?.channel?._id && (
              <SubscribedChannelItem
                key={subscription?._id}
                channel={subscription?.channel}
              />
            )
        )}
      </div>
    );
  }

  return (
    <div>
      {totalSubscribedChannels > 0 && <SearchSubscribedChannels />}
      {content}
    </div>
  );
};

export default SubscribedChannelList;
