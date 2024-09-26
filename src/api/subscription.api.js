"use server";
import { fetchWithAuth, publicApi } from ".";

const getChannelSubscribers = async (channelId) => {
  try {
    const res = await publicApi.get(`/api/v1/subscriptions/u/${channelId}`);
    console.log("res:", res);
    return {
      data: res?.data?.data,
    };
  } catch (error) {
    console.log("error from shannel subccfsdf:", error);
    //console.error(error);
    return {
      error: error.message,
    };
  }
};

// Get user subscribed channels
const getUserSubscribedChannels = async (subscriberId) => {
  try {
    const res = await fetchWithAuth(`/api/v1/subscriptions/${subscriberId}`);
    console.log("check:", res);
    return {
      data: res.data,
    };
  } catch (error) {
    console.error("check", error);
    return {
      error: error.message,
    };
  }
};

// check if user is subscribed to a channel
const checkUserSubscription = async (channelId) => {
  try {
    const res = await fetchWithAuth(
      `/api/v1/subscriptions/status/c/${channelId}`
    );
    console.log("res:", res);
    return {
      data: res.data,
    };
  } catch (error) {
    console.error(error);
    return {
      error: error.message,
    };
  }
};

export {
  checkUserSubscription,
  getChannelSubscribers,
  getUserSubscribedChannels,
};
