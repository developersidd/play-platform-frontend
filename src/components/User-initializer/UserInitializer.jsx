"use client";
import { SET_USER } from "@/actions/user.acton";
import useAxios from "@/hooks/useAxios";
import useUserContext from "@/hooks/useUserContext";
import { useEffect, useRef } from "react";

const UserInitializer = () => {
  const { dispatch, state } = useUserContext();
  console.log("state:", state);
  const { privateApi } = useAxios();
  const hasFetchedUser = useRef(false); // Use ref to track if the effect has run
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await privateApi.get("/api/v1/users/current-user");
        console.log("res:", res);
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
