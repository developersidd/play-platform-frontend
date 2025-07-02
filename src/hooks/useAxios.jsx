"use client";
import { TOKEN_REFRESHED } from "@/actions/user.action";
import { apiClient } from "@/api";
import axios from "axios";
import { useEffect } from "react";
import useUserContext from "./useUserContext";

const useAxios = () => {
  const {
    state: { tokens } = {},
    dispatch,
  } = useUserContext();
  const accessToken = tokens?.accessToken || (typeof window !== "undefined" && localStorage.getItem("accessToken"));
  const refreshToken = tokens?.refreshToken || (typeof window !== "undefined" && localStorage.getItem("refreshToken"));
  console.log(" refreshToken:", refreshToken)
  //console.log(" accessToken from useAxios:", accessToken);
  useEffect(() => {
    // request interceptor
    apiClient.interceptors.request.use(
      (config) => {
        if (accessToken) {
          config.headers.Authorization = `Bearer ${
            accessToken || localStorage.getItem("accessToken")
          }`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    // response interceptor
    apiClient.interceptors.response.use(undefined, async (error) => {
      console.log("error in response interceptor:", error);
      const originalRequest = error?.config;
      if (
        refreshToken &&
        error?.response?.status === 401 &&
        !originalRequest._retry
      ) {
        console.log("Refreshing access token...");
        originalRequest._retry = true;
        try {
          const response = await fetch(
            `/api/auth/refresh-token`,
            {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
              body: JSON.stringify({ refreshToken, accessToken }),
            }
          );
          const data = await response.json();
          console.log("refresh token response:", data);
          if (response.status === 200 || response.ok) {
            console.log("Access Token Refreshed");
            console.log("response.data refrehstoken", data.data);
            const newTokens = data?.data || {};
            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${newTokens?.accessToken}`;
            dispatch({ type: TOKEN_REFRESHED, payload: newTokens });
            localStorage.setItem("accessToken", newTokens?.accessToken);
            localStorage.setItem("refreshToken", newTokens?.refreshToken);
            return axios(originalRequest);
          } else {
            return Promise.reject(error);
          }
        } catch (error) {
          console.log("error in refresh token:", error);
          //console.log("error:", error);
          return Promise.reject(error);
        }
      } else {
        return Promise.reject(error);
      }
    });
  }, [refreshToken, accessToken, dispatch]);

  return { apiClient };
};

export default useAxios;
