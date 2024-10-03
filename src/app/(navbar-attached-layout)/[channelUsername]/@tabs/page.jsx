import ChannelVideosNotFound from "./_components/ChannelNoVideos";

const ChannelVideosPage = ({ params: { channelUsername } }) => {
  return <ChannelVideosNotFound />;
};

export default ChannelVideosPage;
