import axios from "axios";
import {
  getAccessToken,
  refreshAccessToken,
} from "../server-actions/auth.action";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to make an API request and handle 401 errors and token refresh
export async function fetchWithAuth(url, options = {}) {
  try {
    // Add the access token to the request headers
    const accessToken = getAccessToken(); // Get access token from cookies/session
    //console.log("accessToken:", accessToken);
    if (!accessToken) {
      throw new Error("Session expired");
    }
    const response = await apiClient({
      url,
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    });
    //console.log("response:", response);
    return response.data;
  } catch (error) {
    //console.log("error in fetchwith:", error);
    if (error.response && error.response.status === 401 && !options._retry) {
      options._retry = true;
      // If we receive a 401, try refreshing the token
      try {
        const { data } = (await refreshAccessToken()) || {};
        //console.log("data:", data);
        const newAccessToken = data?.accessToken;
        // Retry the original request with the new token
        await apiClient({
          ...options,
          url,
          headers: {
            ...options.headers,
            Authorization: `Bearer ${newAccessToken}`,
          },
        });
      } catch (refreshError) {
        // Token refresh failed, handle logout or redirect to login
        throw new Error(
          "Session expired or there was error refreshing token. Please log in again."
        );
      }
    }
    throw error; // If it's another error, rethrow it
  }
}
