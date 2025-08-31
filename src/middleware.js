import { NextResponse } from "next/server";

const PUBLIC_ROUTES = [
  "/login",
  "/register",
  "/forgot-password",
  "/about",
  "/videos",
  "/contact",
  "/channels",
];

export default async function middleware(req) {
  const { nextUrl } = req;
  const { pathname, search } = nextUrl;

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("searchParams", search);
  requestHeaders.set("x-pathname", pathname);
  const token = req.cookies.get("accessToken")?.value;
  ////console.log(" token from middleware:", token);
  const isLoggedIn = !!token;
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
  matcher: ["/((?!api/|_next/|.*\\.).*)"],
};
