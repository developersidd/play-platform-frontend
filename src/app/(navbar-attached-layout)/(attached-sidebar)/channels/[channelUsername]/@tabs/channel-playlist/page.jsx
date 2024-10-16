import { getUserPlaylists } from "@/api/playlist.api";
import ChannelNoPlaylist from "./_components/ChannelNoPlaylist";
import ChannelPlaylistList from "./_components/ChannelPlaylistList";

const ChannelPlaylistPage = async ({ params: { channelUsername } }) => {
  console.log("channelUsername:", channelUsername);
  const { data, error } = await getUserPlaylists(channelUsername);
  //console.log("data:", data);
  return (
    <div>
      {data?.length > 0 ? (
        <ChannelPlaylistList playlists={data} />
      ) : (
        <ChannelNoPlaylist />
      )}
    </div>
  );
};

export default ChannelPlaylistPage;
