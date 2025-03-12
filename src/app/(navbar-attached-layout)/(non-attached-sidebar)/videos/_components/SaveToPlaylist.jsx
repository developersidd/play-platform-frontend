import { getUserPlaylists } from "@/api/playlist.api";
import { retrieveCurrentUser } from "@/api/user.api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FilePlus } from "lucide-react";
import CreateWatchLaterPlaylist from "./CreateWatchLaterPlaylist";
import WatchLaterPlaylistItem from "./WatchLaterPlaylistItem";

const SaveToPlaylist = async ({ videoId }) => {
  const { data: { username } = {} } = (await retrieveCurrentUser()) || {};
  console.log(" username:", username);
  const { data: watchLaterPlaylists, error } = await getUserPlaylists(
    username,
    {
      type: "watchLater",
    }
  );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="peer flex items-center gap-x-2 rounded-lg bg-gray-800 text-white dark:bg-white px-4 py-1.5 dark:text-black">
          <span className="inline-block w-5">
            <FilePlus size={20} />
          </span>
          Save
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-72 p-3 pt-2">
        <DropdownMenuLabel className="text-center text-lg">
          Save to playlist
        </DropdownMenuLabel>

        <DropdownMenuSeparator />
        {/*  Playlist List */}
        {watchLaterPlaylists.length ? (
          watchLaterPlaylists.map((playlist) => (
            <WatchLaterPlaylistItem
              key={playlist._id}
              playlist={playlist}
              videoId={videoId}
              isSaved={playlist.videos.includes(videoId)}
            />
          ))
        ) : (
          <p className="text-center text-gray-400">No playlists found</p>
        )}
        {/* create watch later playlist */}
        <CreateWatchLaterPlaylist />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SaveToPlaylist;
