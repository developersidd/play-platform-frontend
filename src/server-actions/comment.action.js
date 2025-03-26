import { apiClient } from "../axios";
const getVideoComments = async (videoId, queries = {}) => {
  try {
    let url = `/comments/${videoId}`;
    if (Object.keys(queries).length > 0) {
      const searchParams = new URLSearchParams(queries);
      url += `?${searchParams.toString()}`;
    }
    const response = await apiClient.get(url);
    //console.log(" response.data?.data:", response.data?.data)
    return { data: response.data?.data };
  } catch (e) {
    console.log(" e:", e);
    console.error("Failed to get video comments", e);
    return {
      error: e.message,
    };
  }
};

export { getVideoComments };
