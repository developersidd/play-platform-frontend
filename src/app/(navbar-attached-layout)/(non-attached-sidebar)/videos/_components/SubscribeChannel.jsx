"use client";
import useAxios from "@/hooks/useAxios";
import useUserContext from "@/hooks/useUserContext";
import { UserRoundPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const SubscribeChannel = ({ channelId, isSubscribed, animation = false }) => {
  const [subscribed, setSubscribed] = useState(isSubscribed);
  const { apiClient } = useAxios();
  const {
    state: { _id: userId },
  } = useUserContext();
  const router = useRouter();
  const subscribe = async () => {
    if (!userId) {
      return toast.info("Please login to subscribe to the channel");
    }
    setSubscribed((prev) => !prev);
    try {
       await apiClient.post(`/subscriptions/c/${channelId}`);
      router.refresh();
    } catch (error) {
      // Revert the state if the request fails
      setSubscribed(subscribed);
      toast.error("Failed to subscribe to channel");
    }
  };

  return (
    <div className="block">
      <button
        onClick={subscribe}
        className={`mr-1 flex w-full items-center gap-x-2 bg-secondary px-3 py-2 text-center font-bold text-black sm:w-auto ${
          animation &&
          "shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]"
        } `}
      >
        <span className="inline-block w-5">
          <UserRoundPlus />
        </span>
        <span>{subscribed ? "Subscribed" : "Subscribe"}</span>
      </button>
    </div>
  );
};

export default SubscribeChannel;
