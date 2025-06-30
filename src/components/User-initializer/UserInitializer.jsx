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
       console.log(" res from UserInitializer:", res.data)

        dispatch({ type: SET_USER, payload: res.data?.data });
      } catch (error) {
        //return router.push("/");
      }
    };
    if (localStorage.getItem("loggedIn")) {
      fetchUser();
    }
  }, [apiClient, dispatch, router]);
  return null;
};
export default UserInitializer;
