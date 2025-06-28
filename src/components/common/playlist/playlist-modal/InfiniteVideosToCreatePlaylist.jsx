import { getVideos } from "@/api/video.api";
import Error from "@/components/common/Error";
import { Checkbox } from "@/components/ui/checkbox";
import useUserContext from "@/hooks/useUserContext";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Virtuoso } from "react-virtuoso";

const InfiniteVideosToCreatePlaylist = ({
  setSelectedVideos,
  selectedVideos,
  searchQuery,
}) => {
  const {
    state: { username },
  } = useUserContext() || {};
  const [userVideos, setUserVideos] = useState([]);

  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isInfiniteLoading, setIsInfiniteLoading] = useState(true);
  const [searchedVideos, setSearchedVideos] = useState([]);

  const videosToDisplay = searchQuery.trim() ? searchedVideos : userVideos;
  useEffect(() => {
    const fetchData = async () => {
      setIsInfiniteLoading(true);
      try {
        52;
        const params = {
          page,
          limit: 20,
          username,
        };
        if (searchQuery.trim()?.length > 0) {
          params.q = decodeURI(searchQuery?.toLowerCase());
          delete params.page;
        } else {
          delete params.q;
        }
        const { data: { videos = [], hasNextPage } = {} } = await getVideos(
          params
        );
        if (searchQuery.trim()?.length > 0) {
          setSearchedVideos([...videos]);
        } else {
          setUserVideos((prev) => [...prev, ...videos]);
        }
        setHasMore(hasNextPage);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsInitialLoading(false);
        setIsInfiniteLoading(false);
      }
    };

    fetchData();
  }, [page, hasMore, searchQuery, username]);
  // decide what to render
  let content;
  if (isInitialLoading) {
    content = (
      <div className="flex justify-center py-5">
        <Loader size={30} className="animate-spin" />
      </div>
    );
  } else if (videosToDisplay?.length > 0) {
    content = (
      <Virtuoso
        className="[&::-webkit-scrollbar]:w-[5px]"
        data={videosToDisplay}
        endReached={() => hasMore && setPage((p) => p + 1)}
        components={{
          Footer: () =>
            isInfiniteLoading && (
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
              checked={!!selectedVideos.find((item) => item.video === _id)}
              onCheckedChange={(value) => {
                if (value) {
                  setSelectedVideos([
                    ...selectedVideos,
                    {
                      video: _id,
                      title,
                      thumbnail,
                    },
                  ]);
                } else {
                  setSelectedVideos(
                    selectedVideos.filter((item) => item.video !== _id)
                  );
                }
              }}
              className="h-4 w-4 mr-3"
            />
            <Image
              width={100}
              height={100}
              src={thumbnail?.url}
              className="w-16 h-10 rounded object-cover mr-3"
              alt={title}
            />
            <span className="text-sm">{title}</span>
          </div>
        )}
      />
    );
  } else if (!isInfiniteLoading && videosToDisplay?.length === 0) {
    content = (
      <div className="flex justify-center items-center h-full">
        <h3 className="text-lg">
          No videos found for{" "}
          {searchQuery ? (
            <span>
              search query{" "}
              <span className="font-bold"> &#34;{searchQuery}&#34;</span>
            </span>
          ) : (
            "this channel"
          )}
        </h3>
      </div>
    );
  } else if (error) {
    content = <Error />;
  }

  return (
    <>
      <div className="pt-2 w-full h-[70vh] overflow-y-auto ">{content}</div>
    </>
  );
};

export default InfiniteVideosToCreatePlaylist;
