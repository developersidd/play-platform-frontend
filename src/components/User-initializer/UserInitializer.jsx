"use client";
import { SET_USER } from "@/actions/user.action";
import useAxios from "@/hooks/useAxios";
import useUserContext from "@/hooks/useUserContext";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const PUBLIC_ROUTES = [
  "/about",
  "/videos",
  "/contact",
  "/login",
  "/register",
  "/forgot-password",
];

const isUnauthenticatedRoute = ["/login", "/register", "/forgot-password"];

const UserInitializer = () => {
  const { dispatch, state } = useUserContext();
  const { apiClient } = useAxios();
  const pathname = usePathname();
  const router = useRouter();
  const isLoggedIn = !!state?._id;
  const isPublicRoute =
    pathname === "/" ||
    PUBLIC_ROUTES.some((route) => pathname.startsWith(route));
  const isUnauthenticated = isUnauthenticatedRoute.some((route) =>
    pathname.startsWith(route)
  );

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await apiClient.get("/users/current-user");
        if (res.status === 200) {
          dispatch({ type: SET_USER, payload: res.data?.data });
        }
      } catch (error) {
        //return router.push("/");
      }
    };
    if (localStorage.getItem("loggedIn")) {
      fetchUser();
    }
  }, [apiClient, dispatch, router]);

  if (!isLoggedIn && !isPublicRoute) {
    // if user is not logged in and trying to access a route that requires authentication, redirect to login
    return router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
  }
  if (isUnauthenticated && isLoggedIn) {
    // if user is logged in and trying to access a route that doesn't require authentication, redirect to home
    return router.push("/");
  }
  return null;
};
export default UserInitializer;
