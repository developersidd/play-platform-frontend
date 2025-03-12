import { apiClient } from ".";

// get playlist by id
const getPlaylistById = async (id) => {
  try {
    const res = await apiClient.get(`/playlists/${id}`);
    return {
      data: res.data?.data,
    };
  } catch (e) {
    return {
      error: e.message,
    };
  }
};

// get user playlists
const getUserPlaylists = async (username, queries = {}) => {
  console.log(" queries:", queries)
  try {
    const res = await apiClient.get(
      `/playlists/user/${username}
      `,
      {
        params: queries,
      }
    );
    console.log("playlist:", res.data);
    return {
      data: res.data?.data,
    };
  } catch (e) {
    console.log(" e:", e)
    return {
      error: e.message,
    };
  }
};

export { getPlaylistById, getUserPlaylists };
