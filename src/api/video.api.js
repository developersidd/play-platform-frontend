import { publicApi } from ".";
const getAllVideos = async () => {
  try {
    const res = await publicApi.get("/api/v1/videos", {
      headers: {
        "Content-Type": "application/json",
      },
    });
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
    console.log("error on getRelatedVideos:", error);
    return {
      error: error.message,
    };
  }
};

export { getAllVideos, getRelatedVideos, getVideoById };
