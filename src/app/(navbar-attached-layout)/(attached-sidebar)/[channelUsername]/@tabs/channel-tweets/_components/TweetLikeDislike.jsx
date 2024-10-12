"use client";
import useAxios from "@/hooks/useAxios";
import useUserContext from "@/hooks/useUserContext";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const TweetLikeDislike = ({ tweetId, likeData, dislikeData }) => {
  const router = useRouter();
  const {
    state: { _id: userId },
  } = useUserContext();
  //  const [isLiked, setIsLiked] = useState(likeData?.isLikedMe);
  const [{ likes, isLiked }, setLikeState] = useState(likeData);
  //  console.log("isLiked:", isLiked);
  //  console.log("likes:", likes);
  const [{ dislikes, isDisliked }, setDislikeState] = useState(dislikeData);

  const { privateApi } = useAxios();

  // Like Api
  const likeApi = async () => {
    try {
      const res = await privateApi.post(`/api/v1/likes/toggle/t/${tweetId}`);
      //console.log("res:", res);
      console.log("res:", res);
      router.refresh();
    } catch (error) {
      //console.log("error:", error);
      console.error(error);
    }
  };

  // Dislike Api
  const dislikeApi = async () => {
    try {
      const res = await privateApi.post(`/api/v1/dislikes/toggle/t/${tweetId}`);
      router.refresh();
      console.log("res:", res);
    } catch (error) {
      console.error(error);
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
  dislikeData;
  return (
    <div className="flex gap-4">
      <button
        onClick={handleLike}
        className={`
            
          "group inline-flex items-center gap-x-1 outline-none after:content-[attr(data-like-count)] focus:after:content-[attr(data-like-count-alt)]`}
        data-like-count={likes}
        data-like-count-alt={likes}
      >
        <ThumbsUp className={`${isLiked && "text-secondary"}`} />
      </button>
      <button
        onClick={handleDisLike}
        className="group inline-flex items-center gap-x-1 outline-none after:content-[attr(data-dislike-count)] focus:after:content-[attr(data-dislike-count-alt)]"
        data-dislike-count={dislikes}
        data-dislike-count-alt={dislikes}
      >
        <ThumbsDown className={`${isDisliked && "text-secondary"}`} />
      </button>
    </div>
  );
};

export default TweetLikeDislike;
