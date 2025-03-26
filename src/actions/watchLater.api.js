"use server";
import { fetchWithAuth } from ".";

// Add video in watch later
export const addVideoInWatchLater = async (videoId) => {
  try {
    const { data } =
      fetchWithAuth(`/watch-later/v/${videoId}/add`, {
        method: "PATCH",
      }) || {};
    return {
      data,
    };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

// Remove video from watch later
export const removeVideoFromWatchLater = async (videoId) => {
  try {
    const { data } =
      fetchWithAuth(`/watch-later/v/${videoId}/remove`, {
        method: "DELETE",
      }) || {};
    return {
      data,
    };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

// get user watch later videos
export const getWatchLaterVideos = async () => {
  try {
    const { data } =
      fetchWithAuth(`/watch-later`, {
        method: "GET",
      }) || {};
    return {
      data,
    };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};
