"use server";
import { fetchWithAuth } from ".";
import { getAccessToken } from "./auth.api";

const retrieveCurrentUser = async () => {
  try {
    const accessToken = getAccessToken();
    if (!accessToken) {
      return {
        error: "Unauthorized",
      };
    }
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
