"use client";
import Error from "@/components/common/Error";
import { getRelatedVideos } from "@/server-actions/video.action";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { Virtuoso } from "react-virtuoso";
import RelatedVideoCard from "./RelatedVideoCard";

const InfiniteRelatedVideos = ({ videoId, initialVideos }) => {
  const [relatedVideos, setRelatedVideos] = useState(initialVideos);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!hasMore) return;
        setIsLoading(true);

        const { data } = await getRelatedVideos(videoId, {
          page,
          limit: 20,
        });
        setRelatedVideos((prev) => [...prev, ...(data?.videos || [])]);
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
    <div className="w-full">
      <Virtuoso
        data={relatedVideos}
        useWindowScroll
        overscan={20}
        className="!mt-0 !mb-0 !space-y-0 !p-0"
        endReached={() => hasMore && setPage((p) => p + 1)}
        components={{
          Footer: () =>
            isLoading && (
              <div className="flex justify-center py-5">
                <Loader size={30} className="animate-spin" />
              </div>
            ),
        }}
        itemContent={(_, video) => <RelatedVideoCard video={video} />}
      />
      {error && <Error />}
    </div>
  );
};

export default InfiniteRelatedVideos;
