"use client";
import { TOKEN_REFRESHED } from "@/actions/user.action";
import { apiClient } from "@/axios";
import axios from "axios";
import { useEffect } from "react";
import useUserContext from "./useUserContext";

const useAxios = () => {
  const {
    state: { refreshToken, accessToken },
    dispatch,
  } = useUserContext();
  useEffect(() => {
    // request interceptor
    apiClient.interceptors.request.use(
      (config) => {
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    // response interceptor
    apiClient.interceptors.response.use(undefined, async (error) => {
      //console.log("error:", error);
      const originalRequest = error?.config;
      if (
        accessToken &&
        error?.response?.status === 401 &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/users/refresh-token`,
            {
              method: "POST",
              body: JSON.stringify({ refreshToken }),
            }
          );
          console.log("response:", response);
          //console.log("response:", response);
          const data = await response.json();
          console.log("data:", data);
          if (data?.statusCode === 200 || !data?.success) {
            console.log("Access Token Refreshed");
            //console.log("response.data.data.accessToken:", response.data);
            //console.log(response.data.data.accessToken);
            const newTokens = response.data || {};
            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${newTokens?.accessToken}`;
            dispatch({ type: TOKEN_REFRESHED, payload: newTokens });
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
