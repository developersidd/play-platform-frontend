"use server";
import { publicApi } from ".";
const getAllVideos = async (channelId) => {
  let url = "/api/v1/videos";
  if (channelId) {
    url = `/api/v1/videos?userId=${channelId}`;
  }
  try {
    const res = await publicApi.get(url);
    return {
      data: res.data?.data,
    };
  } catch (error) {
    console.log("error:", error);
    return {
      error: error.message,
    };

    //console.log(error);
  }
};

const getVideoById = async (id) => {
  try {
    const res = await publicApi.get(`/api/v1/videos/${id}`);
    console.log("res.data?.data:", res.data?.data);
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
    const res = await publicApi.get(`/api/v1/videos/related/${videoId}`);
    return {
      data: res.data?.data,
    };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

export { getAllVideos, getRelatedVideos, getVideoById };
