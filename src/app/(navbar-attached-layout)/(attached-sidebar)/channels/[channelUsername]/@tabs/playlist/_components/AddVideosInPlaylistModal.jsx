import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import { X } from "lucide-react";
import { useState } from "react";
import InfiniteVideosToCreatePlaylist from "./InfiniteVideosToCreatePlaylist";

const AddVideosInPlaylistModal = ({ setValue }) => {
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [userVideos, setUserVideos] = useState([]);
  const debounceHandler = useDebounce((value) => {
    setSearchQuery(value);
  }, 500);

  return (
    <div className="mt-4 w-full">
      <label>
        Add Videos <sup>*</sup>
      </label>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full mt-2">
            Select Videos ({selectedVideos.length})
          </Button>
        </DialogTrigger>

        <DialogContent className="max-h-[85vh] overflow-y-auto [&>button:last-child]:hidden">
          <div className="space-y-4">
            {/* Search Bar */}
            <Input
              placeholder="Search your videos..."
              onChange={(e) => debounceHandler(e.target.value)}
            />

            {/* Infinite Video List */}
            <InfiniteVideosToCreatePlaylist
              //key={searchQuery}
              setters={{ setSelectedVideos, setUserVideos }}
              getters={{ selectedVideos, userVideos }}
              searchQuery={searchQuery}
            />
          </div>
          <DialogClose
            onClick={() => {
              setValue("videos", selectedVideos);
            }}
            className="p-1.5  rounded-full hover:bg-light-bg inline-block absolute top-2 right-2"
            type="button"
          >
            <X size={20} />
          </DialogClose>
        </DialogContent>
      </Dialog>

      {/* Selected Videos Preview */}
      <div className="mt-3 flex flex-wrap gap-2">
        {selectedVideos.map((videoId) => (
          <div
            key={videoId}
            className="flex items-center bg-dark-bg ps-3 pe-2 py-1 rounded-full text-sm"
          >
            {userVideos?.find((v) => v._id === videoId)?.title}
            <button
              type="button"
              onClick={() => {
                const newSelectedVideos = selectedVideos.filter(
                  (id) => id !== videoId
                );
                setSelectedVideos(newSelectedVideos);
                setValue("videos", newSelectedVideos);
              }}
              className="ml-2 text-gray-500 hover:text-red-600"
            >
              <X size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddVideosInPlaylistModal;
