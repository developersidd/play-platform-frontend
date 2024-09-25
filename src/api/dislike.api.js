"use server";
import { publicApi } from ".";
const getVideoDisLikes = async (videoId, userId) => {
  try {
    const res = await publicApi.get(
      `/api/v1/dislikes/video/${videoId}/${userId}`
    );
    return {
      data: res.data?.data,
    };
  } catch (e) {
    return {
      error: e.message,
    };
  }
};

export { getVideoDisLikes };
