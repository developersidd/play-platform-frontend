"use client";
import { getVideos } from "@/api/video.api";
import VideoCard from "@/components/common/cards/VideoCard";
import VideoHorizontalCard from "@/components/common/cards/VideoHorizontalCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useMemo } from "react";
import { Virtuoso, VirtuosoGrid } from "react-virtuoso";
import Error from "../common/Error";

const InfiniteVideos = ({ queries, layout = "grid" }) => {
  const { page: pageNum = 1, limit = 20, ...restQueries } = queries || {};

  // TanStack Query infinite query
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    
  } = useInfiniteQuery({
    queryKey: ["videos", { ...restQueries, limit }],
    queryFn: ({ pageParam = pageNum }) =>
      getVideos({
        page: pageParam,
        limit,
        ...restQueries,
      }),
    getNextPageParam: (lastPage) => {
      if (lastPage?.data?.hasNextPage) {
        return (lastPage?.data?.currentPage || lastPage?.data?.page || pageNum) + 1;
      }
      return undefined;
    },
    initialPageParam: pageNum,
  });
    console.log("🚀 ~ data:", data)

  // Flatten all pages data into a single array
  const videos = useMemo(() => {
    return data?.pages?.flatMap((page) => page?.data?.videos || []) || [];
  }, [data]);

  // Fixed layout configuration
  const layoutConfig = {
    component: layout === "grid" ? VirtuosoGrid : Virtuoso,
    itemComponent: layout === "grid" ? VideoCard : VideoHorizontalCard,
  };

  const endReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  if (isError) {
    return <Error title={"Error while getting videos"} />;
  }

  return (
    <div className="w-full">
      <layoutConfig.component
        data={videos}
        overscan={20}
        className="m-0 space-y-0"
        useWindowScroll
        listClassName={
          layout === "grid"
            ? "grid grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))] sm:grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] lg:grid-cols-[repeat(auto-fill,_minmax(330px,_1fr))] gap-3 md:gap-5 space-y-0 m-0"
            : ""
        }
        endReached={endReached}
        itemContent={(_, video) => <layoutConfig.itemComponent video={video} />}
      />
      
      {(isLoading || isFetchingNextPage) && (
        <div className="flex justify-center items-center py-10">
          <Loader size={40} className="animate-spin" />
        </div>
      )}
    </div>
  );
};

export default InfiniteVideos;