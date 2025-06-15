import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const jwt = request.cookies.get("jwt")?.value;

  const protectedPaths = ["/movies"];
  const isProtected = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtected && !jwt) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/movies/:path*", "/movies"],
};
