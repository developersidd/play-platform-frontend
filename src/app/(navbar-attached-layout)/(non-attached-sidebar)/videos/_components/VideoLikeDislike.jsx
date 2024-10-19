"use client";
import useAxios from "@/hooks/useAxios";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const VideoLikeDislike = ({ videoId, userId, likeData, dislikeData }) => {
  const [{ isLiked, likes }, setLikeState] = useState(likeData);
  const [{ dislikes, isDisliked }, setDislikeState] = useState(dislikeData);
  const { privateApi } = useAxios();

  // Like Api
  const likeApi = async () => {
    try {
      await privateApi.post(`/likes/toggle/v/${videoId}`);
    } catch (error) {
      toast.error("Failed to like the video");
      console.error(error);
    }
  };

  // Dislike Api
  const dislikeApi = async () => {
    try {
      await privateApi.post(`/dislikes/toggle/v/${videoId}`);
    } catch (error) {
      toast.error("Failed to dislike the video");
    }
  };
  // Handle Like
  const handleLike = () => {
    if (!userId) return toast.info("Please login to like the video");
    if (isLiked) {
      setLikeState({
        isLiked: false,
        likes: likes - 1,
      });
    } else {
      setLikeState({
        isLiked: true,
        likes: likes + 1,
      });
    }
    if (isDisliked) {
      setDislikeState({
        isDisliked: false,
        dislikes: dislikes - 1,
      });
      // Call Dislike Api
      dislikeApi();
    }
    // Call Like Api
    likeApi();
  };
  // Handle Dislike
  const handleDisLike = () => {
    if (!userId) return toast.info("Please login to dislike the video");
    if (isDisliked) {
      setDislikeState({
        isDisliked: false,
        dislikes: dislikes - 1,
      });
    } else {
      setDislikeState({
        isDisliked: true,
        dislikes: dislikes + 1,
      });
    }
    if (isLiked) {
      setLikeState({
        isLiked: false,
        likes: likes - 1,
      });
      // Call Like Api
      likeApi();
    }
    // Call Dislike Api
    dislikeApi();
  };

  return (
    <div className="flex overflow-hidden rounded-lg border">
      <button
        //disabled={!userId}
        onClick={handleLike}
        className="group/btn flex items-center gap-x-2 border-r border-gray-700 px-4 py-1.5 after:content-[attr(data-like)] hover:bg-white/10 focus:after:content-[attr(data-like-alt)]"
        data-like={likes || 0}
        data-like-alt={likes}
      >
        <span className={`w-5 ${isLiked && "text-secondary"}`}>
          <ThumbsUp size={20} />
        </span>
      </button>
      <button
        //disabled={!userId}
        onClick={handleDisLike}
        className="group/btn flex items-center gap-x-2 px-4 py-1.5 after:content-[attr(data-like)] hover:bg-white/10 focus:after:content-[attr(data-like-alt)]"
        data-like={dislikes || 0}
        data-like-alt={dislikes}
      >
        <span className={`inline-block w-5 ${isDisliked && "text-secondary"}`}>
          <ThumbsDown size={20} />
        </span>
      </button>
    </div>
  );
};

export default VideoLikeDislike;
