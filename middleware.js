import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export const config = {
  matcher: ["/"],
};

export async function middleware(req) {
  // Token exists if user is logged in
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  const { pathname } = req.nextUrl;

  // Allow requests if true:
  // 1a) Token exists OR
  // 1b) Request is for next-auth session & provider fetching
  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }

  // Otherwise redirect to /login if they don't have a token AND are requesting a protected route
  if (!token && pathname !== "/login") {
    // return NextResponse.redirect(new URL("/login", req.url));
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
}
