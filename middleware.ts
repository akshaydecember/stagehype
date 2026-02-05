import { withAuth } from "next-auth/middleware";
import { NextRequest } from "next/server";

export const middleware = withAuth(
  function middleware(req: NextRequest & { nextauth: any }) {
    const token = req.nextauth.token;
    const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
    const isStudioRoute = req.nextUrl.pathname.startsWith("/studio") &&
      !req.nextUrl.pathname.match(/\/studio\/\[artistId\]/);
    const isModeratorRoute = req.nextUrl.pathname.startsWith("/moderator");

    // Check admin access
    if (isAdminRoute && token?.role !== "ADMIN" && token?.role !== "ARTIST") {
      return Response.redirect(new URL("/auth/login", req.url));
    }

    // Check moderator access
    if (
      isModeratorRoute &&
      token?.role !== "ADMIN" &&
      token?.role !== "MODERATOR"
    ) {
      return Response.redirect(new URL("/auth/login", req.url));
    }

    return null;
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/studio/dashboard/:path*", "/moderator/:path*"],
};
