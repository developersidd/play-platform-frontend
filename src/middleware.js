import { NextResponse } from "next/server";

const PUBLIC_ROUTES = {
  "/login": true,
  "/register": true,
};
export default async function middleware(req) {
  const { nextUrl } = req;
  const { pathname, search  } = nextUrl;
  
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("searchParams", search);
  const token = req?.cookies?.get("accessToken")?.value;
  const isPublicRoute =
    PUBLIC_ROUTES[pathname] ||
    nextUrl.pathname === "/" ||
    ["/videos", "/channels", "/playlists", "/result"].some((route) =>
      pathname.startsWith(route)
    );

  //console.log(isAuthenticated, pathname);
  //console.log({ isPublicRoute });

  if (!token && !isPublicRoute) {
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
