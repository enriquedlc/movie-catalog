import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/movies"];

export function middleware(request: NextRequest) {
  const jwt = request.cookies.get("jwt")?.value;

  const isProtected = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isProtected && !jwt) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/movies/:path*", "/"],
};
