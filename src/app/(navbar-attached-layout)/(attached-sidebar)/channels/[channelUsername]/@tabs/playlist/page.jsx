import NoPlaylist from "@/app/(navbar-attached-layout)/_components/playlist/NoPlaylist";
import PlaylistList from "@/app/(navbar-attached-layout)/_components/playlist/PlaylistList";
import { getUserPlaylists } from "@/server-actions/playlist.action";

const ChannelPlaylistPage = async ({ params: { channelUsername } }) => {
  const { data } = await getUserPlaylists(channelUsername, {
    isPrivate: true
  });
  return (
    <div>
      {data?.length > 0 ? <PlaylistList playlists={data} /> : <NoPlaylist />}
    </div>
  );
};

export default ChannelPlaylistPage;
