import { getUserTweets } from "@/server-actions/tweets.action";
import { retrieveCurrentUser } from "@/server-actions/user.action";
import ChannelTweetsWrapper from "./_components/ChannelTweetsWrapper";

const ChannelTweetsPage = async ({ params: { channelUsername } }) => {
  const { data: { username, _id } = {} } = await retrieveCurrentUser();
  const { data: tweets = [], error } = await getUserTweets(
    channelUsername,
    _id
  );
  if (error) {
    throw new Error(error);
  }
  //console.log("tweets:", JSON.stringify(tweets, null, 2));
  const isOwner = channelUsername === username;

  return (
    <div className="p-4">
      <ChannelTweetsWrapper isOwner={isOwner} tweets={tweets} />
    </div>
  );
};

export default ChannelTweetsPage;
