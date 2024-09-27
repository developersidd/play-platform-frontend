"use server";
import { fetchWithAuth } from ".";

const retrieveCurrentUser = async () => {
  //console.log("retrieveCurrentUser");
  try {
    //const accessToken = getAccessToken();
    const res = await fetchWithAuth("/api/v1/users/current-user", {
      method: "GET",
    });
    return {
      user: res.data,
    };
  } catch (e) {
    return {
      error: e.message,
    };
  }
};

export { retrieveCurrentUser };
