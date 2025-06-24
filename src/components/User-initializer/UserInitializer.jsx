"use client";
import { SET_USER } from "@/actions/user.action";
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
        const res = await apiClient.get("/users/current-user");
        dispatch({ type: SET_USER, payload: res.data?.data });
      } catch (error) {
        return router.push("/");
        //console.log("error init:", error);
      }
    };
    if (localStorage.getItem("loggedIn")) {
      fetchUser();
    }
  }, [apiClient, dispatch, router]);
  return null;
};
export default UserInitializer;
