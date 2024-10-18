"use server";
import { publicApi } from ".";
const getVideoDisLikes = async (videoId, userId) => {
  try {
    let url = `/dislikes/video/${videoId}`;
    if (userId) {
      url += `?userId=${userId}`;
    }
    console.log("url:", url);
    const res = await publicApi.get(url);
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
