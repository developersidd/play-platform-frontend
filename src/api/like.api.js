"use server";
import { publicApi } from ".";
const getVideoLikes = async (videoId, userId) => {
  try {
    let url = `/likes/video/${videoId}`;
    if (userId) {
      url += `?userId=${userId}`;
    }

    const res = await publicApi.get(url);
    return {
      data: res.data?.data,
    };
  } catch (e) {
    return {
      error: e,
    };
  }
};

export { getVideoLikes };
