import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest, response: NextResponse) {
  const { url, cookies } = request;

  const refreshToken = cookies.get("refresh_token")?.value;

  const isProfilePage = url.includes("/profile");
  const isAuthPage = url.includes("/auth");

  if (isAuthPage && refreshToken) {
    return NextResponse.redirect(new URL("/books", url));
  }

  if (isAuthPage) {
    return NextResponse.next();
  }

  if (!refreshToken) {
    return NextResponse.redirect(new URL("/auth", url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/auth/:path*"],
};
