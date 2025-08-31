import { getUserTweets } from "@/api/tweets.api";
import { retrieveCurrentUser } from "@/api/user.api";
import ChannelTweetsWrapper from "./_components/ChannelTweetsWrapper";

const ChannelTweetsPage = async ({ params }) => {
  const { channelUsername } = await params;
  const { data: { username, _id } = {} } = await retrieveCurrentUser();
  const { data: tweets = [], error } = await getUserTweets(
    channelUsername,
    _id
  );
  if (error) {
    throw new Error(error);
  }
  ////console.log("tweets:", JSON.stringify(tweets, null, 2));
  const isOwner = channelUsername === username;

  return (
    <div className="py-4">
      <ChannelTweetsWrapper isOwner={isOwner} tweets={tweets} />
    </div>
  );
};

export default ChannelTweetsPage;
