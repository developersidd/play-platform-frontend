"use server";
import { fetchWithAuth, publicApi } from ".";
import { getAccessToken } from "./auth.api";

const retrieveCurrentUser = async () => {
  //console.log("retrieveCurrentUser");
  try {
    const accessToken = getAccessToken();
    if (!accessToken) {
      return {
        error: "No access token found",
      };
    }
    const res = await fetchWithAuth("/users/current-user", {
      method: "GET",
    });
    return {
      data: res.data,
    };
  } catch (e) {
    return {
      error: e.message,
    };
  }
};

// Get Channel By Username
const getChannelByUsername = async (username, loggedInUserId) => {
  let url = `/users/c/${username}`;
  if (loggedInUserId) {
    url += `?loggedInUserId=${loggedInUserId}`;
  }
  try {
    const res = await publicApi.get(url);
    return {
      data: res.data?.data,
    };
  } catch (e) {
    console.log("channel:", e);
    return {
      error: e.message,
    };
  }
};

export { getChannelByUsername, retrieveCurrentUser };
