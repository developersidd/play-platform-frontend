import { apiClient, fetchWithAuth } from "../axios";

// get playlist by id
const getPlaylistById = async (id) => {
  try {
    const res = await apiClient.get(`/playlists/${id}`);
    //console.log(" res:", JSON.stringify( res.data, null, 2));
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
  try {
    const res = await apiClient.get(
      `/playlists/user/${username}
      `,
      {
        params: queries,
      }
    );
    //console.log("playlist:", res.data);
    return {
      data: res.data?.data,
    };
  } catch (e) {
    console.log(" e:", e);
    return {
      error: e.message,
    };
  }
};
// get user collections
const getUserCollections = async (queries = {}) => {
  try {
    const res = await fetchWithAuth(`/playlists/collections`, {
      params: queries,
    });
    console.log(" collections:", JSON.stringify( res.data, null, 2));

    return {
      data: res?.data,
    };
  } catch (e) {
    console.log(" e:", e);
    return {
      error: e.message,
    };
  }
};

export { getPlaylistById, getUserCollections, getUserPlaylists };
