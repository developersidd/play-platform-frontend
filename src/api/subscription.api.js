"use server";
import { apiClient, fetchWithAuth } from ".";

const getChannelSubscribers = async (channelId) => {
  try {
    const res = await apiClient.get(`/subscriptions/u/${channelId}`);
    return {
      data: res?.data?.data,
    };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

// Get user subscribed channels
const getUserSubscribedChannels = async (subscriberName, queries) => {
  let url = `/subscriptions/c/${subscriberName}`;
  if (queries?.search) {
    url += `?search=${queries?.search}`;
  }
  try {
    const res = await fetchWithAuth(url);
    console.log("sss res:", res);
    return {
      data: res.data,
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
    const res = await fetchWithAuth(`/subscriptions/status/c/${channelId}`);
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
