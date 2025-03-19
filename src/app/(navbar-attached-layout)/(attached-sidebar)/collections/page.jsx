import { getUserPlaylists } from "@/api/playlist.api";
import { retrieveCurrentUser } from "@/api/user.api";
import NoPlaylist from "@/app/(navbar-attached-layout)/_components/playlist/NoPlaylist";
import PlaylistList from "@/app/(navbar-attached-layout)/_components/playlist/PlaylistList";

const CollectionsPage = async () => {
  const { data: { username = "" } = {} } = (await retrieveCurrentUser()) || {};
  const { data } = (await getUserPlaylists(username)) || {};
  return (
    <div className="p-2 md:p-3 lg:p-4">
      {data?.length > 0 ? <PlaylistList playlists={data} /> : <NoPlaylist />}
    </div>
  );
};

export default CollectionsPage;
