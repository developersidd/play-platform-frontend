"use server";
import { publicApi } from ".";
const getVideoLikes = async (videoId, userId) => {
  console.log("videoId, userId:", videoId, userId);
  try {
    const res = await publicApi.get(`/api/v1/likes/video/${videoId}/${userId}`);
    return {
      data: res.data?.data,
    };
  } catch (e) {
    return {
      error: e.message,
    };
  }
};

export { getVideoLikes };
