"use client";
import useUserContext from "@/hooks/useUserContext";
import { usePathname, useRouter } from "next/navigation";
const PUBLIC_ROUTES = [
  "/about",
  "/videos",
  "/contact",
  "/login",
  "/register",
  "/forgot-password",
];

const isUnauthenticatedRoute = ["/login", "/register", "/forgot-password"];

const AuthWrapper = ({ children }) => {
  const { state } = useUserContext() || {};
  const isLoggedIn = !!state?.user;
  const pathname = usePathname();
  const router = useRouter();
  const isPublicRoute =
    pathname === "/" ||
    PUBLIC_ROUTES.some((route) => pathname.startsWith(route));
  const isUnauthenticated = isUnauthenticatedRoute.some((route) =>
    pathname.startsWith(route)
  );

  if (isLoggedIn && isUnauthenticated) {
    return router.push("/");
  } else if (!isLoggedIn && !isPublicRoute) {
    return router.push("/login");
  } else {
    return children;
  }
};

export default AuthWrapper;
