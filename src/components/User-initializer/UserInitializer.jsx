"use client";
import { SET_USER } from "@/actions/user.acton";
import useAxios from "@/hooks/useAxios";
import useUserContext from "@/hooks/useUserContext";
import { useEffect } from "react";

const UserInitializer = () => {
  const { dispatch } = useUserContext();
  const { apiClient } = useAxios();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await apiClient.get("/users/current-user");
        dispatch({ type: SET_USER, payload: res.data?.data });
      } catch (error) {
        //console.log("error init:", error);
      }
    };
    if (localStorage.getItem("loggedIn")) {
      fetchUser();
    }
  }, [apiClient, dispatch]);
  return null;
};
export default UserInitializer;
