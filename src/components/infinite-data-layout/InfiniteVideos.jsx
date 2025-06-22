"use client";
import VideoCard from "@/components/common/cards/VideoCard";
import VideoHorizontalCard from "@/components/common/cards/VideoHorizontalCard";
import { getVideos } from "@/server-actions/video.action";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { Virtuoso, VirtuosoGrid } from "react-virtuoso";
import Error from "../common/Error";

const InfiniteVideos = ({ initialVideos, queries, layout = "grid" }) => {
  const { page: pageNum = 2, limit, ...restQueries } = queries || {};
  const [videos, setVideos] = useState(initialVideos);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(pageNum);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Fixed layout configuration
  const layoutConfig = {
    component: layout === "grid" ? VirtuosoGrid : Virtuoso,
    itemComponent: layout === "grid" ? VideoCard : VideoHorizontalCard,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        //if (!hasMore) return;
        setIsLoading(true);

        const { data: { videos = [], hasNextPage } = {} } = await getVideos({
          page,
          limit: limit || 20,
          ...restQueries,
        });

        setVideos((prev) => [...prev, ...videos]);
        setHasMore(hasNextPage);
      } catch (error) {
        console.log(" error:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page, hasMore, limit]);

  return (
    <div className="w-full">
      <layoutConfig.component
        data={videos}
        overscan={20}
        className="m-0 space-y-0"
        useWindowScroll
        listClassName="grid  grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))] sm:grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] lg:grid-cols-[repeat(auto-fill,_minmax(330px,_1fr))] gap-3 md:gap-5 space-y-0 m-0"
        endReached={() => hasMore && setPage((p) => p + 1)}
        itemContent={(_, video) => <layoutConfig.itemComponent video={video} />}
      />
      {isLoading && hasMore && (
        <div className="flex justify-center py-10">
          <Loader size={40} className="animate-spin" />
        </div>
      )}
      {error && <Error />}
    </div>
  );
};

export default InfiniteVideos;
