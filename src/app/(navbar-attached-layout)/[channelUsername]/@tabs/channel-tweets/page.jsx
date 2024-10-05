import { getUserTweets } from "@/api/tweets.api";
import ChannelNoTweets from "./_components/ChannelNoTweets";
import ChannelTweetItem from "./_components/ChannelTweetItem";

const ChannelTweetsPage = async ({ params: { channelUsername } }) => {
  const { data: tweets, error } = await getUserTweets(channelUsername);
  if (error) {
    throw new Error(error);
  }
  return (
    <div className="p-4">
      {tweets?.length > 0 ? (
        tweets.map((tweet) => (
          <ChannelTweetItem key={tweet._id} tweet={tweet} />
        ))
      ) : (
        <ChannelNoTweets />
      )}
    </div>
  );
};

export default ChannelTweetsPage;
