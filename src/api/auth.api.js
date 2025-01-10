"use server";
import { cookies } from "next/headers";
import { apiClient } from ".";
const refreshAccessToken = async () => {
  try {
    const response = await apiClient.post("/users/refresh-token");
    const data = await response.json();
    return { data };
  } catch (e) {
    console.error("Failed to refresh access token", e);
    return {
      error: e.message,
    };
  }
};

const logout = async () => {
  try {
    const response = await apiClient.post("/users/logout");
    const data = await response.json();
    return { data };
  } catch (e) {
    return {
      error: e.message,
    };
  }
};

// Function to get access token from cookies
function getAccessToken() {
  const cookieStore = cookies();
  return cookieStore.get("accessToken")?.value;
}

// Function to get refresh token from cookies
function getRefreshToken() {
  const cookieStore = cookies();
  return cookieStore.get("refreshToken")?.value;
}

export { getAccessToken, getRefreshToken, logout, refreshAccessToken };
