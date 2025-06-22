import NoPlaylist from "@/components/common/playlist/NoPlaylist";
import PlaylistList from "@/components/common/playlist/PlaylistList";
import { getUserPlaylists } from "@/server-actions/playlist.action";

const ChannelPlaylistPage = async ({ params }) => {
  const { channelUsername } = await params;
  const { data } = await getUserPlaylists(channelUsername);
  return (
    <div>
      {data?.length > 0 ? <PlaylistList playlists={data} /> : <NoPlaylist />}
    </div>
  );
};

export default ChannelPlaylistPage;
