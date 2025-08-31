import axios from "axios";
import { getAccessToken, getRefreshToken, refreshAccessToken } from "./auth.api";

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
    const accessToken = await getAccessToken();
    const refreshToken = await getRefreshToken()
    if (!refreshToken) {
      return null
    } 
    const response = await apiClient({
      url,
      method: "GET",
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    });
    ////console.log(" response in fethwithAU:", response.data)
    return response.data;
  } catch (error) {
    //console.log(" error in index:", error?.response?.data)
    const isJwtError = error?.response?.data?.message === "jwt expired";
    ////console.log(" isJwtError:", isJwtError)
    if (error.response && error.response.status === 401 && !options._retry && isJwtError) {
      options._retry = true;
      try {
        //console.log("Calling refreshAccessToken()")
         (await refreshAccessToken()) || {};
      } catch (refreshError) {
        //console.log(" refreshError:", refreshError)
        ////console.log(
        //  "Session expired or there was error refreshing token. Please log in again."
        //);
      }
    }
    throw error; // If it's another error, rethrow it
  }
}
