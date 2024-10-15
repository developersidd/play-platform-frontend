"use server";
import { fetchWithAuth, publicApi } from ".";
const getAllVideos = async (queries) => {
  console.log("queries:", queries);
  let url = "/api/v1/videos";
  if (Object.keys(queries).length > 0) {
    const searchParams = new URLSearchParams(queries);
    url += `?${searchParams.toString()}`;
  }
  console.log("url:", url);
  try {
    const res = await publicApi.get(url);
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

const getVideoById = async (id) => {
  try {
    const res = await publicApi.get(`/api/v1/videos/${id}`);
    //console.log("res.data?.data:", res.data?.data);
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

const getLikedVideos = async () => {
  try {
    const res = await fetchWithAuth(`/api/v1/videos/liked`, {
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
