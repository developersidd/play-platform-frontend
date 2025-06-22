import { NextResponse } from "next/server";
import { hasLoginHistory } from "./server-actions/loginHistory.action";
import { retrieveCurrentUser } from "./server-actions/user.action";

const ADMIN_ROUTES = ["/dashboard/users", "/dashboard/videos/admin"];
const PUBLIC_ROUTES = [
  "/login",
  "/register",
  "/forgot-password",
  "/about",
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
  const hasHistory = await hasLoginHistory();
  const { data: currentUser } = await retrieveCurrentUser();
  const isAdmin = currentUser?.role?.toLowerCase() === "admin";
  const isAdminRoute = ADMIN_ROUTES.some((route) => pathname.startsWith(route));
  
  const isLoggedIn = !!token && hasHistory;
  const isPublicRoute =
  nextUrl?.pathname === "/" ||
  PUBLIC_ROUTES.some((route) => pathname.startsWith(route));
  
  const isUnauthenticatedRoute = [
    "/login",
    "/register",
    "/forgot-password",
  ].some((route) => pathname.startsWith(route));
  
  if (isUnauthenticatedRoute && isLoggedIn) {
    return Response.redirect(new URL("/", nextUrl));
  }
  if (isAdminRoute && !isAdmin) {
    return Response.redirect(new URL("/dashboard", nextUrl));
  }
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
