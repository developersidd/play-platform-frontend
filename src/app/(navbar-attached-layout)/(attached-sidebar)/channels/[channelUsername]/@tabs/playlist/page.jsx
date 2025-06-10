import PlaylistList from "@/components/common/playlist/PlaylistList";
import NoPlaylist from "@/components/common/playlist/NoPlaylist";
import { getUserPlaylists } from "@/server-actions/playlist.action";

const ChannelPlaylistPage = async ({ params: { channelUsername } }) => {
  const { data } = await getUserPlaylists(channelUsername, {
    isPrivate: true,
  });
  return (
    <div>
      {data?.length > 0 ? <PlaylistList playlists={data} /> : <NoPlaylist />}
    </div>
  );
};

export default ChannelPlaylistPage;
