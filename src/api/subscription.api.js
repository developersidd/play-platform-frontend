"use server";
import { fetchWithAuth, publicApi } from ".";

const getChannelSubscribers = async (channelId) => {
  try {
    const res = await publicApi.get(`/api/v1/subscriptions/u/${channelId}`);
    //console.log("res:", res);
    return {
      data: res?.data?.data,
    };
  } catch (error) {
    //console.log("error from shannel subccfsdf:", error);
    //console.error(error);
    return {
      error: error.message,
    };
  }
};

// Get user subscribed channels
const getUserSubscribedChannels = async (subscriberName, queries) => {
  let url = `/api/v1/subscriptions/c/${subscriberName}`;
  if (queries?.search) {
    url += `?search=${queries?.search}`;
  }
  console.log("url:", url);
  try {
    const res = await publicApi.get(url);
    console.log("res:", res.data?.data);
    return {
      data: res.data?.data,
    };
  } catch (error) {
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
    //console.log("res:", res);
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
