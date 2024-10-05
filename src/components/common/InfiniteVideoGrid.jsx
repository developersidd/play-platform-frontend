"use client";
import { publicApi } from "@/api";
import VideoCard from "@/app/(navbar-attached-layout)/_components/VideoCard";
import VideoHorizontalCard from "@/app/(navbar-attached-layout)/_components/VideoHorizontalCard";
import { useEffect, useRef, useState } from "react";
import { VirtuosoGrid } from "react-virtuoso";

const InfiniteVideoGrid = ({
  NoVideosFound,
  limit,
  query,
  pageToLoad,
  initialShow,
  parentClasses,
  initialVideos,
  isHorizontal = false,
}) => {
  console.log("initialVideos:", initialVideos);
  const [videos, setVideos] = useState(initialVideos);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(pageToLoad);
  const isLoading = useRef(true);
  const [hasMore, setHasMore] = useState(true);
  const queries = new URLSearchParams({
    page,
    limit,
    ...query,
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await publicApi.get(
          `/api/v1/videos?${queries.toString()}`
        );
        const { videos, hasNextPage } = data?.data || {};
        setVideos((prevData) => [...prevData, ...videos]);
        if (!hasNextPage) {
          setHasMore(false);
        }
      } catch (error) {
        setError(error);
      } finally {
        isLoading.current = false;
      }
    };
    fetchData();
  }, [hasMore, page]);
  // decide what to render
  let content;
  if (videos?.length === 0 && error) {
    throw new Error("Not implemented");
  }
  if (videos?.length > 0) {
    content = (
      <VirtuosoGrid
        listClassName={
          parentClasses ??
          "grid 2xl:grid-cols-5 grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4 p-4 w-full"
        }
        data={videos}
        useWindowScroll
        endReached={() => {
          if (hasMore) {
            setPage((prevPage) => prevPage + 1);
          }
        }}
        initialItemCount={initialShow}
        itemContent={(index) =>
          isHorizontal ? (
            <VideoHorizontalCard video={videos[index]} />
          ) : (
            <VideoCard video={videos[index]} />
          )
        }
      />
    );
  }
  return (
    <div className="py-7 w-full">
      {content}
      {videos?.length === 0 && NoVideosFound}
    </div>
  );
};

export default InfiniteVideoGrid;
