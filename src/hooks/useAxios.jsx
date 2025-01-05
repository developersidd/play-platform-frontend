"use client";
import { privateApi, publicApi } from "@/api/";
import axios from "axios";
import { useEffect } from "react";
import useUserContext from "./useUserContext";

const useAxios = () => {
  const {
    state: { refreshToken },
  } = useUserContext();
  useEffect(() => {
    privateApi.interceptors.response.use(undefined, async (error) => {
      //console.log("error:", error);
      const originalRequest = error?.config;
      if (error?.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const response = await publicApi.post("/users/refresh-token", {
            refreshToken,
          });
          //console.log("response:", response);
          if (response.status === 200) {
            //console.log("response.data.data.accessToken:", response.data);
            //console.log(response.data.data.accessToken);
            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${response.data.data.accessToken}`;
            return axios(originalRequest);
          }
        } catch (error) {
          //console.log("error:", error);
          return Promise.reject(error);
        }
      } else {
        return Promise.reject(error);
      }
    });
  }, []);

  return { privateApi };
};

export default useAxios;
