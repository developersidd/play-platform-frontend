import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FilePlus } from "lucide-react";

const SaveToPlaylist = () => {
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

        <div className="mt-4 flex flex-col">
          <label
            htmlFor="playlist-name"
            className="mb-1 inline-block cursor-pointer"
          >
            Name
          </label>
          <input
            className="w-full rounded-lg border border-transparent bg-light-bg px-3 py-2  outline-none focus:border-secondary"
            id="playlist-name"
            placeholder="Enter playlist name"
          />
          <button className="mx-auto mt-4 rounded-lg bg-secondary px-4 text-background font-medium py-2 ">
            Create new playlist
          </button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SaveToPlaylist;
