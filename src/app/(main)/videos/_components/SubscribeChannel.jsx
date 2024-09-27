"use client";
import useAxios from "@/hooks/useAxios";
import { UserRoundPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const SubscribeChannel = ({ channelId, isSubscribed, userId }) => {
  const [subscribed, setSubscribed] = useState(isSubscribed);
  const { privateApi } = useAxios();
  const router = useRouter();
  const subscribe = async () => {
    if (!userId) {
      return toast.info("Please login to subscribe to the channel");
    }
    setSubscribed((prev) => !prev);
    try {
      const res = await privateApi.post(`/api/v1/subscriptions/c/${channelId}`);
      //console.log("res:", res);
      router.refresh();
    } catch (error) {
      // Revert the state if the request fails
      setSubscribed(subscribed);
      toast.error("Failed to subscribe to channel");
    }
  };

  const handleSubscribe = () => {
    subscribe();
  };

  return (
    <div className="block">
      <button
        onClick={handleSubscribe}
        className="mr-1 flex w-full items-center gap-x-2 bg-secondary px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto"
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
