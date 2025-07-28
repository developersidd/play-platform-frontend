import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import { useState } from "react";
import InfiniteVideosToCreatePlaylist from "./InfiniteVideosToCreatePlaylist";

const AddVideosInPlaylistModal = ({
  setValue,
  selectedVideos,
  setSelectedVideos,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debounceSearchQuery, setDebounceSearchQuery] = useState("");
  const [showAddVideosModal, setShowAddVideosModal] = useState(false);

  const debounceHandler = useDebounce((value) => {
    setDebounceSearchQuery(value);
    console.log("debounced");
  }, 500);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    debounceHandler(value);
  };
  return (
    <div className="mt-4 w-full">
      <label>
        Add Videos <sup>*</sup>
      </label>

      <Dialog
        open={showAddVideosModal}
        onOpenChange={() => {
          setShowAddVideosModal(false);
          if (searchQuery.trim()) {
            setDebounceSearchQuery("");
          }
          setValue(
            "videos",
            selectedVideos?.map(({ video }) => video)
          );
        }}
      >
        <Button
          onClick={() => setShowAddVideosModal(true)}
          variant="outline"
          type="button"
          className="w-full mt-2"
        >
          Select Videos ({selectedVideos.length})
        </Button>

        <DialogContent className="max-h-[85vh] overflow-y-auto w-[90%] sm:max-w-[50%] lg:max-w-[30%] block ">
          <div className="space-y-4">
            {/* Search Bar */}
            <Input
              className="mt-5"
              placeholder="Search your videos..."
              onChange={handleSearch}
              value={searchQuery}
            />

            {/* Infinite Video List */}
            <InfiniteVideosToCreatePlaylist
              //key={searchQuery}
              setSelectedVideos={setSelectedVideos}
              selectedVideos={selectedVideos}
              searchQuery={debounceSearchQuery}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddVideosInPlaylistModal;
