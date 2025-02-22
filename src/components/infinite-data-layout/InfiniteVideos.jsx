"use client";
import { getAllVideos } from "@/api/video.api";
import VideoCard from "@/app/(navbar-attached-layout)/_components/VideoCard";
import VideoHorizontalCard from "@/app/(navbar-attached-layout)/_components/VideoHorizontalCard";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { VirtuosoGrid } from "react-virtuoso";
import Error from "../common/Error";

const InfiniteVideos = ({ initialVideos, queries, layout = "grid" }) => {
  console.log(" initialVideos:", initialVideos);
  const { page: pageNum = 2, limit, ...restQueries } = queries || {};
  const [videos, setVideos] = useState(initialVideos);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(pageNum);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const layoutClass =
    layout === "grid"
      ? "grid 2xl:grid-cols-5 grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))]"
      : "flex flex-col";
  const Item = layout == "grid" ? VideoCard : VideoHorizontalCard;
  useEffect(() => {
    const queryObj = {
      page,
      limit: limit || 20,
      sortBy: "createdAt",
      sortType: "desc",
      ...restQueries,
    };

    const fetchData = async () => {
      setIsLoading(true);
      const { data, error } = await getAllVideos(queryObj);
      if (error) {
        setError(error);
      }
      const { videos, hasNextPage } = data || {};
      setVideos((prevData) => [...prevData, ...videos]);
      if (!hasNextPage) {
        setHasMore(false);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [hasMore, page]);

  return (
    <div className="py-7 w-full">
      <VirtuosoGrid
        listClassName={`${layoutClass} gap-10 p-4 w-full`}
        useWindowScroll
        endReached={() => {
          if (hasMore) {
            setPage((prevPage) => prevPage + 1);
          }
        }}
        data={videos}
        initialItemCount={20}
        itemContent={(index) => <Item video={videos[index]} />}
      />
      {isLoading && (
        <div className="flex py-8 items-center justify-center ">
          <Loader size={40} className="animate-spin" />
        </div>
      )}
      {error && !isLoading && <Error />}
    </div>
  );
};

export default InfiniteVideos;
