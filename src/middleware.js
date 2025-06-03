import { NextResponse } from "next/server";
import { hasLoginHistory } from "./server-actions/loginHistory.action";

const PUBLIC_ROUTES = {
  "/login": true,
  "/register": true,
};
export default async function middleware(req) {
  const { nextUrl } = req;
  const { pathname, search } = nextUrl;

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("searchParams", search);
  const token = req?.cookies?.get("accessToken")?.value;
  const hasHistory = await hasLoginHistory(token);
  console.log(" hasHistory:", hasHistory);
  const isLoggedIn = !!token && hasHistory;
  const isPublicRoute =
    PUBLIC_ROUTES[pathname] ||
    nextUrl.pathname === "/" ||
    ["/videos", "/channels", "/playlists", "/result"].some((route) =>
      pathname.startsWith(route)
    );
  const isUnauthenticatedRoute = [
    "/login",
    "/register",
    "/forgot-password",
  ].some((route) => pathname.startsWith(route));

  if (isUnauthenticatedRoute && isLoggedIn) {
    return Response.redirect(new URL("/", nextUrl));
  }
  if (!isLoggedIn && !isPublicRoute) {
    console.log("redirecting to login");
    return Response.redirect(
      new URL(`/login?redirect=${encodeURIComponent(pathname)}`, nextUrl)
    );
  }
  return NextResponse.next({
    request: {
      // Apply new request headers
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
