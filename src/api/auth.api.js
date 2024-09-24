"use server";
import { cookies } from "next/headers";
import { privateApi } from ".";
const refreshAccessToken = async () => {
  try {
    const response = await privateApi.post("/api/v1/users/refresh-token");
    const data = await response.json();
    return data;
  } catch (e) {
    console.error("Failed to refresh access token", e);
    throw e;
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

export { getAccessToken, getRefreshToken, refreshAccessToken };
