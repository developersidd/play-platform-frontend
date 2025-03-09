import { getVideos } from "@/api/video.api";
import Error from "@/components/common/Error";
import { Checkbox } from "@/components/ui/checkbox";
import useUserContext from "@/hooks/useUserContext";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { Virtuoso } from "react-virtuoso";

const InfiniteVideosToCreatePlaylist = ({
  setters: { setSelectedVideos, setUserVideos },
  getters: { selectedVideos, userVideos },
  searchQuery,
}) => {
  const {
    state: { username },
  } = useUserContext() || {};
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        52;
        const params = {
          page,
          limit: 20,
          username,
        };
        if (searchQuery.trim()) {
          params.q = decodeURI(searchQuery?.toLowerCase());
        }
        const { data: { videos = [], hasNextPage } = {} } = await getVideos(
          params
        );
        console.log(" videos:", videos);
        if (searchQuery.trim()?.length > 0) {
          setUserVideos([...videos]);
        } else {
          setUserVideos((prev) => [...prev, ...videos]);
        }
        setHasMore(hasNextPage);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page, hasMore, searchQuery]);

  return (
    <>
      <div className="pt-2 w-full h-[70vh] overflow-y-auto ">
        {userVideos?.length > 0 ? (
          <Virtuoso
            className="[&::-webkit-scrollbar]:w-[5px]"
            data={userVideos}
            endReached={() => hasMore && setPage((p) => p + 1)}
            components={{
              Footer: () =>
                isLoading && (
                  <div className="flex justify-center py-5">
                    <Loader size={30} className="animate-spin" />
                  </div>
                ),
            }}
            itemContent={(_, { _id, title, thumbnail } = {}) => (
              <div
                key={_id}
                className="flex items-center p-2 hover:bg-dark-bg rounded-lg"
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
            )}
          />
        ) : (
          !isLoading && (
            <div className="flex justify-center items-center h-full">
              <h3>
                No videos found for{" "}
                {searchQuery ? `search query "${searchQuery}"` : "this channel"}
              </h3>
            </div>
          )
        )}
        {error && <Error />}
      </div>
    </>
  );
};

export default InfiniteVideosToCreatePlaylist;
