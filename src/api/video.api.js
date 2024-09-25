import { publicApi } from ".";
const getAllVideos = async () => {
  try {
    const res = await publicApi.get("/api/v1/videos", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("res.data?.data:", res.data?.data);
    return res.data?.data;
  } catch (error) {
    console.log(error);
  }
};

const getVideoById = async (id) => {
  try {
    const res = await publicApi.get(`/api/v1/videos/${id}`);
    return res.data?.data;
  } catch (error) {
    console.log(error);
  }
};

export { getAllVideos, getVideoById };
