"use client";
import useAxios from "@/hooks/useAxios";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const VideoLikeDislike = ({ videoId, userId, likeData, dislikeData }) => {
  const [liked, setLiked] = useState(likeData?.isLiked);
  const [disliked, setDisliked] = useState(dislikeData?.isDisliked);
  const [likeCount, setLikeCount] = useState(likeData?.likes);
  const [dislikeCount, setDislikeCount] = useState(dislikeData?.dislikes);
  const { privateApi } = useAxios();

  // Like Api
  const likeApi = async () => {
    try {
      const res = await privateApi.post(`/api/v1/likes/toggle/v/${videoId}`);
      console.log("res:", res);
    } catch (error) {
      console.log("error:", error);
      console.error(error);
    }
  };

  // Dislike Api
  const dislikeApi = async () => {
    try {
      const res = await privateApi.post(`/api/v1/dislikes/toggle/v/${videoId}`);
      console.log("res:", res);
    } catch (error) {
      console.error(error);
    }
  };
  // Handle Like
  const handleLike = () => {
    if (!userId) return toast.info("Please login to like the video");
    if (liked) {
      setLiked(false);
      setLikeCount(likeCount - 1);
    } else {
      setLiked(true);
      setLikeCount(likeCount + 1);
    }
    if (disliked) {
      setDisliked(false);
      setDislikeCount(dislikeCount - 1);
      // Call Dislike Api
      dislikeApi();
    }
    // Call Like Api
    likeApi();
  };
  // Handle Dislike
  const handleDisLike = () => {
    if (!userId) return toast.info("Please login to dislike the video");
    if (disliked) {
      setDisliked(false);
      setDislikeCount(dislikeCount - 1);
    } else {
      setDisliked(true);
      setDislikeCount(dislikeCount + 1);
    }
    if (liked) {
      setLiked(false);
      setLikeCount(likeCount - 1);
      // Call Like Api
      likeApi();
    }
    // Call Dislike Api
    dislikeApi();
  };

  return (
    <div className="flex overflow-hidden rounded-lg border">
      <button
        onClick={handleLike}
        className="group/btn flex items-center gap-x-2 border-r border-gray-700 px-4 py-1.5 after:content-[attr(data-like)] hover:bg-white/10 focus:after:content-[attr(data-like-alt)]"
        data-like={likeCount || 0}
        data-like-alt={likeCount}
      >
        <span className={`w-5 ${liked && "text-secondary"}`}>
          <ThumbsUp size={20} />
        </span>
      </button>
      <button
        onClick={handleDisLike}
        className="group/btn flex items-center gap-x-2 px-4 py-1.5 after:content-[attr(data-like)] hover:bg-white/10 focus:after:content-[attr(data-like-alt)]"
        data-like={dislikeCount || 0}
        data-like-alt={dislikeCount}
      >
        <span className={`inline-block w-5 ${disliked && "text-secondary"}`}>
          <ThumbsDown size={20} />
        </span>
      </button>
    </div>
  );
};

export default VideoLikeDislike;
