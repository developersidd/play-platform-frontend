"use server";
import { apiClient, fetchWithAuth } from ".";
const getAllVideos = async (queries) => {
  //console.log("queries:", queries);
  let url = "/videos";
  if (Object.keys(queries).length > 0) {
    const searchParams = new URLSearchParams(queries);
    url += `?${searchParams.toString()}`;
  }
  //console.log("url:", url);
  try {
    const res = await apiClient.get(url);
    return {
      data: res.data?.data,
    };
  } catch (error) {
    return {
      error: error?.message,
    };

    //console.log(error);
  }
};

const getVideoById = async (id, userId) => {
  try {
    let url = `/videos/${id}`;
    if (userId) {
      url += `?userId=${userId}`;
    }
    const res = await apiClient.get(url);
    console.log("url", url);
    return {
      data: res.data?.data,
    };
  } catch (error) {
    return {
      error: error.message,
    };
    //console.log(error);
  }
};

const getRelatedVideos = async (videoId) => {
  try {
    const res = await apiClient.get(`/videos/related/${videoId}`);
    return {
      data: res.data?.data,
    };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

const getLikedVideos = async () => {
  try {
    const res = await fetchWithAuth(`/videos/liked`, {
      method: "GET",
    });
    console.log("data", res);
    return {
      data: res?.data,
    };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

export { getAllVideos, getLikedVideos, getRelatedVideos, getVideoById };
