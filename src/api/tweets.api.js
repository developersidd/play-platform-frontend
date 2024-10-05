"use server";

import { publicApi } from ".";
const getUserTweets = async (username) => {
  if (!username) return null;
  try {
    const res = await publicApi.get(`/api/v1/tweets/user/${username}`);
    return {
      data: res.data?.data,
    };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

export { getUserTweets };
