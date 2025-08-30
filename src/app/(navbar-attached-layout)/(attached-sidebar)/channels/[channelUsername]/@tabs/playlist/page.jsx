import { getUserPlaylists } from "@/api/playlist.api";
import { retrieveCurrentUser } from "@/api/user.api";
import NoPlaylist from "@/components/common/playlist/NoPlaylist";
import CreatePlaylistModal from "@/components/common/playlist/playlist-modal/PlaylistFormModal";
import PlaylistList from "@/components/common/playlist/PlaylistList";
import { Button } from "@/components/ui/button";
import { LayoutList, Plus } from "lucide-react";

const ChannelPlaylistPage = async ({ params }) => {
  const { channelUsername } = await params;
  const { data: user } = await retrieveCurrentUser();
  const isMyChannel = user?.username === channelUsername;

  const { data } = await getUserPlaylists(channelUsername);

  return (
    <div className="py-4 md:py-2">
      {isMyChannel && (
        <div className="md:hidden flex items-center justify-between  pb-4 max-sm:px-2">
          <h1 className="text-xl xl:text-2xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
            <LayoutList className="size-5 md:size-6" />
            Playlists
          </h1>
          <CreatePlaylistModal>
            <Button className="rounded-full bg-secondary text-white hover:bg-secondary dark:bg-dark-bg">
              <Plus className="text-white" /> Playlist
            </Button>
          </CreatePlaylistModal>
        </div>
      )}
      {data?.length > 0 ? <PlaylistList playlists={data} /> : <NoPlaylist />}
    </div>
  );
};

export default ChannelPlaylistPage;
