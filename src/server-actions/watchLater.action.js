"use server";
import { fetchWithAuth } from "../axios";

// Add video in watch later
const addVideoInWatchLater = async (videoId) => {
  try {
    const { data } =
      (await fetchWithAuth(`/watch-later/v/${videoId}/add`, {
        method: "PATCH",
      })) || {};
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
const removeVideoFromWatchLater = async (videoId) => {
  try {
    const { data } =
      (await fetchWithAuth(`/watch-later/v/${videoId}/remove`, {
        method: "DELETE",
      })) || {};
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
const getWatchLaterVideos = async () => {
  try {
    //throw new Error("Not implemented yet");
    const { data } =
      (await fetchWithAuth(`/watch-later/videos`, {
        method: "GET",
      })) || {};
    return {
      data,
    };
  } catch (error) {
    console.log(" error:", error);
    return {
      error: error.message,
    };
  }
};

// reorder watch later videos
const reorderWatchLaterVideos = async (updateData) => {
  try {
    await fetchWithAuth(`/watch-later/videos/reorder`, {
      method: "PATCH",
      data: { items: updateData },
    });

    return {
      data: "Videos reordered successfully",
    };
  } catch (error) {
    console.log(" error:", error?.response?.data);
    return {
      error: error.message,
    };
  }
};

export {
  addVideoInWatchLater,
  getWatchLaterVideos,
  removeVideoFromWatchLater,
  reorderWatchLaterVideos,
};
