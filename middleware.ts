import { NextRequest, NextResponse } from "next/server";
// import prisma from "@/lib/prisma";

export default async function middleware(req: NextRequest) {
  // Get the pathname of the request (e.g. /, /protected)
  const path = req.nextUrl.pathname;
  process.env;
  const res = NextResponse.next();

  // If it's the root path, just render it
  if (path === "/") {
    return res;
  }

  const userToken = req.cookies.get("next-auth.session-token")?.value;

  if (!userToken && path === "/protected") {
    return NextResponse.redirect(new URL("/login", req.url));
  } else if (userToken && (path === "/login" || path === "/register")) {
    return NextResponse.redirect(new URL("/protected", req.url));
  }
  return res;
}
