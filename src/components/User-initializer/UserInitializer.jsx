"use client";
import { SET_USER } from "@/actions/user.acton";
import useAxios from "@/hooks/useAxios";
import useUserContext from "@/hooks/useUserContext";
import { useEffect } from "react";

const UserInitializer = () => {
  const { dispatch, state } = useUserContext();
  console.log("state:", state);
  const { privateApi } = useAxios();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await privateApi.get("/api/v1/users/current-user");
        dispatch({ type: SET_USER, payload: res.data?.data });
        //hasFetchedUser.current = true;
      } catch (error) {
        console.log("error from:", error);
      }
    };
    if (localStorage.getItem("loggedIn")) {
      fetchUser();
    }
  }, [privateApi, dispatch]);
  return null;
};
export default UserInitializer;
