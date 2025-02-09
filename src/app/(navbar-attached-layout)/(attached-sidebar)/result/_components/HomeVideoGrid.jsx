"use client";
import { getAllVideos } from "@/api/video.api";
import VideoCard from "@/app/(navbar-attached-layout)/_components/VideoCard";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { VirtuosoGrid } from "react-virtuoso";

const HomeVideoGrid = () => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(2);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    const queries = {
      page,
      limit: 20,
      sortBy: "createdAt",
      sortType: "desc",
    };

    const fetchData = async () => {
      setIsLoading(true);
      const { data, error } = await getAllVideos(queries);
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
  if (videos?.length === 0 && error) {
    throw new Error("Not implemented");
  }
  if (isLoading) {
    return (
      <div className="flex py-4 items-center justify-center">
        <Loader size={40} className="animate-spin" />{" "}
      </div>
    );
  }

  return (
    <div className="py-7 w-full">
      <VirtuosoGrid
        listClassName={
          "grid 2xl:grid-cols-5 grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4 p-4 w-full"
        }
        useWindowScroll
        endReached={() => {
          if (hasMore) {
            setPage((prevPage) => prevPage + 1);
          }
        }}
        data={videos}
        overscan={10}
        initialItemCount={10}
        itemContent={(index) => <VideoCard video={videos[index]} />}
      />
    </div>
  );
};

export default HomeVideoGrid;
