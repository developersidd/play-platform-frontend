"use server";
import { cookies } from "next/headers";
import { fetchWithAuth } from ".";
// Function to get access token from cookies
async function getAccessToken() {
  const cookieStore = await cookies();
  return cookieStore.get("accessToken")?.value;
}

// Function to get refresh token from cookies
async function getRefreshToken() {
  const cookieStore = await cookies();
  return cookieStore.get("refreshToken")?.value;
}
const refreshAccessToken = async () => {
  try {
    const cookieStore = await cookies();
    const refreshToken = await getRefreshToken();
    //console.log(" refreshToken:", refreshToken)
    const accessToken = await getAccessToken();
    if (!refreshToken) {
      return null;
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/refresh-token`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refreshToken,
        accessToken,
      }),
    });
    
    const data = await response.json();
    const {
      accessToken:newAccessToken,
      refreshToken:newRefreshToken,
    } = data?.data || {}

    cookieStore.set('accessToken', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 24 * 60 * 60, // 24 hours
    });

    cookieStore.set('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 10 * 24 * 60 * 60, // 10 days
    });


    return { data };
  } catch (e) {
    console.error("Failed to refresh access token in auth.api", e);
    return {
      error: e.message,
    };
  }
};

// logout
async function logout() {
  try {
    const cookie = await cookies();    
    const res = await fetchWithAuth("/users/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if(!res?.success) {
      throw new Error("Failed to logout");
    }
    cookie.delete("accessToken");
    cookie.delete("refreshToken");

    return { success: true };
  } catch (error) {
    throw new Error("There was an error logging out");
  }
}

export { getAccessToken, getRefreshToken, logout, refreshAccessToken };
