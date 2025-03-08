import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import useAxios from "@/hooks/useAxios";
import useUserContext from "@/hooks/useUserContext";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

const AddVideosInPlaylist = () => {
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [userVideos, setUserVideos] = useState([]);
  const { apiClient } = useAxios();
  const {
    state: { username },
  } = useUserContext() || {};
  console.log(" username:", username);
  useEffect(() => {
    const fetchUserVideos = async () => {
      const { data: { data, success } = {} } =
        (await apiClient.get(`/videos?username=${username}`)) || {};
      if (success) {
        setUserVideos(data?.videos);
      }
    };
    fetchUserVideos();
  }, []);
  console.log(" userVideos:", userVideos);

  const filteredVideos = userVideos?.filter((video) =>
    video?.title?.toLowerCase()?.includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mt-4 w-full">
      <label className="mb-2 ">
        Add Videos <sup>*</sup>
      </label>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">
            Select Videos ({selectedVideos.length})
          </Button>
        </DialogTrigger>

        <DialogContent className="max-h-[80vh] overflow-y-auto">
          <div className="space-y-4">
            {/* Search Bar */}
            <Input
              placeholder="Search your videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* Video List */}
            <div className="space-y-2">
              {filteredVideos?.map(({ _id, title, thumbnail }) => (
                <div
                  key={_id}
                  className="flex items-center p-2 hover:bg-light-bg rounded-lg"
                >
                  <Checkbox
                    checked={selectedVideos.includes(_id)}
                    onCheckedChange={(value) => {
                      if (value) {
                        setSelectedVideos([...selectedVideos, _id]);
                      } else {
                        setSelectedVideos(
                          selectedVideos.filter((_id) => _id !== _id)
                        );
                      }
                    }}
                    className="h-4 w-4 mr-3"
                  />
                  <img
                    src={thumbnail?.url}
                    className="w-16 h-10 rounded object-cover mr-3"
                    alt={title}
                  />
                  <span className="text-sm">{title}</span>
                </div>
              ))}
            </div>
          </div>
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
              onClick={() =>
                setSelectedVideos(
                  selectedVideos.filter((_id) => _id !== videoId)
                )
              }
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

export default AddVideosInPlaylist;
