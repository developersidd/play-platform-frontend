import { apiClient, fetchWithAuth } from ".";

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

// update playlist
const updatePlaylist = async (playlistId, data) => {
  try {
    const res = await apiClient.patch(`/playlists/${playlistId}`, data);
    return {
      data: res.data,
    };
  } catch (e) {
    throw new Error(e.message);
  }
};

// delete playlist
const deletePlaylist = async (playlistId) => {
  try {
    const res = await apiClient.delete(`/playlists/${playlistId}`);
    return {
      data: res.data,
    };
  } catch (e) {
    throw new Error(e.message);
  }
};

// delete many playlists
const deleteManyPlaylists = async (playlistIds) => {
  try {
    const res = await apiClient.delete(`/playlists`, {
      data: { playlistIds: playlistIds },
    });
    return {
      data: res.data,
    };
  } catch (e) {
    throw new Error(e.message);
  }
};

export {
  getPlaylistById,
  getUserCollections,
  getUserPlaylists,
  deletePlaylist,
  updatePlaylist,
  deleteManyPlaylists,
};
