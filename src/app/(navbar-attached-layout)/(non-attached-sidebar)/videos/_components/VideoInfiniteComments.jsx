"use client";
import Error from "@/components/common/Error";
import { getVideoComments } from "@/server-actions/comment.action";
import { Loader } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Virtuoso } from "react-virtuoso";
import VideoCommentItem from "./VideoCommentItem";

const VideoInfiniteComments = ({ initialComments }) => {
  const [comments, setComments] = useState(initialComments);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const videoId = useParams()?.id;
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!hasMore) return;
        setIsLoading(true);
        const { data: { comments, hasNextPage } = {} } = await getVideoComments(
          videoId,
          {
            page,
            limit: 20,
          }
        );
        setComments((prev) => [...prev, ...(comments || [])]);
        setHasMore(hasNextPage);
      } catch (error) {
        setError(error?.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page, hasMore, videoId]);
  if (error) return <Error title="Error while getting comments" />;
  return (
    <div className="w-full h-full min-h-[75vh] space-y-4">
      <Virtuoso
        className="[&::-webkit-scrollbar]:w-[5px]"
        data={comments}
        overscan={20}
        endReached={() => hasMore && setPage((p) => p + 1)}
        components={{
          Footer: () =>
            isLoading && (
              <div className="flex justify-center py-5">
                <Loader size={30} className="animate-spin" />
              </div>
            ),
        }}
        itemContent={(_, comment) => <VideoCommentItem item={comment} />}
      />
    </div>
  );
};

export default VideoInfiniteComments;
