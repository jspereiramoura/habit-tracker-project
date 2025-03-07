import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");

  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/dashboard") && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (
    token &&
    (pathname === "/" ||
      pathname.startsWith("/entrar") ||
      pathname.startsWith("/registrar"))
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
}
