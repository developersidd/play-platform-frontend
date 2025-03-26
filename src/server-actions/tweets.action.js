"use server";

import { apiClient } from "../axios";
const getUserTweets = async (username, loggedInUserId) => {
  if (!username) return null;
  let url = `/tweets/user/${username}`;
  if (loggedInUserId) {
    url += `?loggedInUserId=${loggedInUserId}`;
  }
  try {
    const res = await apiClient.get(url);
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
