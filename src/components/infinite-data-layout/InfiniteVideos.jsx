"use client";
import { getVideos } from "@/api/video.api";
import VideoCard from "@/app/(navbar-attached-layout)/_components/VideoCard";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { Virtuoso, VirtuosoGrid } from "react-virtuoso";
import Error from "../common/Error";
import VideoHorizontalCard from "@/app/(navbar-attached-layout)/_components/VideoHorizontalCard";

const InfiniteVideos = ({ initialVideos, queries, layout = "grid" }) => {
  const { page: pageNum = 2, limit, ...restQueries } = queries || {};
  const [videos, setVideos] = useState(initialVideos);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(pageNum);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Fixed layout configuration
  const layoutConfig = {
    listClass:
      layout === "grid"
        ? "grid 2xl:grid-cols-5 grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-7"
        : "flex flex-col space-y-4",
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
  }, [page, hasMore]);

  return (
    <div className="w-full">
      <layoutConfig.component
        data={videos}
        overscan={20}
        className=""
        useWindowScroll
        listClassName="grid 2xl:grid-cols-5 grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-6"
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
