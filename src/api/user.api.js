"use server";
import { apiClient, fetchWithAuth } from ".";

// get current user
const retrieveCurrentUser = async () => {
  try {
    const res = await fetchWithAuth("/users/current-user");
    return {
      data: res.data,
    };
  } catch (e) {
    return {
      error: e.message,
    };
  }
};

// get all users
const getAllUsers = async (params) => {
  try {
    const res = await fetchWithAuth("/users/all", { params });
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
    const res = await apiClient.get(url);
    return {
      data: res.data?.data,
    };
  } catch (e) {
    return {
      error: e.message,
    };
  }
};

// get user channel stats
const getUserChannelStats = async () => {
  try {
    const res = await fetchWithAuth(`/users/profile/stats`);
    return {
      data: res?.data,
    };
  } catch (e) {
    //console.log(" e:", e);
    return {
      error: e.message,
    };
  }
};

// get user history
const getUserHistory = async (search = "") => {
  try {
    const res = await fetchWithAuth(
      `/users/history?q=${encodeURIComponent(search)}`
    );
    return {
      data: res?.data,
    };
  } catch (e) {
    return {
      error: e.message,
    };
  }
};

export {
  getAllUsers,
  getChannelByUsername,
  getUserChannelStats,
  getUserHistory,
  retrieveCurrentUser,
};
