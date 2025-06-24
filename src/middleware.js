import { NextResponse } from "next/server";
import { retrieveCurrentUser } from "./server-actions/user.action";

const ADMIN_ROUTES = ["/dashboard/users", "/dashboard/videos/admin"];
const PUBLIC_ROUTES = [
  "/login",
  "/register",
  "/forgot-password",
  "/about",
  "/videos",
  "/contact",
  "/terms-of-service",
  "/privacy-policy",
];
export default async function middleware(req) {
  const { nextUrl } = req;
  const { pathname, search } = nextUrl;

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("searchParams", search);
  const token = req?.cookies?.get("accessToken")?.value;
  const { data: currentUser } = await retrieveCurrentUser();
  const isAdmin = currentUser?.role?.toLowerCase() === "admin";
  const isAdminRoute = ADMIN_ROUTES.some((route) => pathname.startsWith(route));

  const isLoggedIn = !!token && currentUser?._id;
  const isPublicRoute =
    nextUrl?.pathname === "/" ||
    PUBLIC_ROUTES.some((route) => pathname.startsWith(route));

  const isUnauthenticatedRoute = [
    "/login",
    "/register",
    "/forgot-password",
  ].some((route) => pathname.startsWith(route));
  // check if the user is already logged In and trying to access a route that doesn't require authentication
  if (isUnauthenticatedRoute && isLoggedIn) {
    return Response.redirect(new URL("/", nextUrl));
  }
  // check for admin access
  if (isAdminRoute && !isAdmin) {
    return Response.redirect(new URL("/dashboard", nextUrl));
  }
  // check if the user is logged in
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(
      new URL(`/login?redirect=${encodeURIComponent(pathname)}`, nextUrl)
    );
  }
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
