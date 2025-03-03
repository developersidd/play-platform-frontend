"use client";
import { getVideos } from "@/api/video.api";
import VideoCard from "@/app/(navbar-attached-layout)/_components/VideoCard";
import VideoHorizontalCard from "@/app/(navbar-attached-layout)/_components/VideoHorizontalCard";
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
        if (!hasMore) return;
        setIsLoading(true);

        const { data } = await getVideos({
          page,
          limit: limit || 20,
          sortBy: "createdAt",
          sortType: "desc",
          ...restQueries,
        });

        setVideos((prev) => [...prev, ...(data?.videos || [])]);
        setHasMore(data?.hasNextPage);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page, hasMore]);

  return (
    <div className="pt-3 pb-7 w-full">
      <layoutConfig.component
        data={videos}
        useWindowScroll
        listClassName={layoutConfig.listClass}
        endReached={() => hasMore && setPage((p) => p + 1)}
        components={{
          Footer: () =>
            isLoading && (
              <div className="flex justify-center py-5">
                <Loader size={40} className="animate-spin" />
              </div>
            ),
        }}
        itemContent={(index) => (
          <layoutConfig.itemComponent video={videos[index]} />
        )}
      />
      {error && <Error />}
    </div>
  );
};

export default InfiniteVideos;
