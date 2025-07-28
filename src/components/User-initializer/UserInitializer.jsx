"use client";
import { SET_USER } from "@/actions/user.action";
import { retrieveCurrentUser } from "@/api/user.api";
import useAxios from "@/hooks/useAxios";
import useUserContext from "@/hooks/useUserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const UserInitializer = () => {
  const { dispatch } = useUserContext();
  const { apiClient } = useAxios();
  const router = useRouter();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = (await retrieveCurrentUser()) || {};
        console.log("🚀 ~ data user:", data)
        dispatch({ type: SET_USER, payload: data });
      } catch (error) {
        console.log("Error fetching user:", error);
      }
    };
    if (localStorage.getItem("loggedIn")) {
      fetchUser();
    }
  }, [apiClient, dispatch, router]);
  return null;
};
export default UserInitializer;
