"use server";

import { publicApi } from ".";
const getUserTweets = async (username, loggedInUserId) => {
  if (!username) return null;
  let url = `/tweets/user/${username}`;
  if (loggedInUserId) {
    url += `?loggedInUserId=${loggedInUserId}`;
  }
  try {
    const res = await publicApi.get(url);
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
